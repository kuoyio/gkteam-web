import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { TokenResponse } from "@/src/type/auth";

const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : process.env.NEXT_PUBLIC_API_BASE_URL;

const COOKIE_BASE = {
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

const ACCESS_TOKEN_MAX_AGE = 30 * 60;
const REFRESH_TOKEN_MAX_AGE = 30 * 24 * 60 * 60;
const TIMEOUT_MS = 15000;
const TOKEN_EXPIRED_CODE = "A0101";
const REFRESH_TOKEN_EXPIRED_CODE = "A0201";

interface ApiResponse<T = unknown> {
  code?: string | null;
  message?: string | null;
  data?: T | null;
}

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeout: number
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
}

async function refreshTokens(refreshToken: string): Promise<TokenResponse | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken, device: "WEB" }),
    });
    const result: ApiResponse<TokenResponse> = await response.json();
    return result.data?.accessToken && result.data?.refreshToken ? result.data : null;
  } catch {
    return null;
  }
}

function setTokenCookies(res: NextResponse, tokens: TokenResponse) {
  res.cookies.set("accessToken", tokens.accessToken, {
    ...COOKIE_BASE,
    httpOnly: false,
    maxAge: ACCESS_TOKEN_MAX_AGE,
  });
  res.cookies.set("refreshToken", tokens.refreshToken, {
    ...COOKIE_BASE,
    httpOnly: true,
    maxAge: REFRESH_TOKEN_MAX_AGE,
  });
}

function clearTokenCookies(res: NextResponse) {
  res.cookies.set("accessToken", "", { ...COOKIE_BASE, httpOnly: false, maxAge: 0 });
  res.cookies.set("refreshToken", "", { ...COOKIE_BASE, httpOnly: true, maxAge: 0 });
}

async function handleLogin(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, device: "WEB" }),
    });

    const result: ApiResponse<TokenResponse> = await response.json();

    if (!result.data?.accessToken || !result.data?.refreshToken) {
      return NextResponse.json(result);
    }

    const res = NextResponse.json({
      code: result.code,
      message: result.message,
      data: null,
    });
    setTokenCookies(res, result.data);
    return res;
  } catch {
    return NextResponse.json(
      { code: "500", message: "服务暂时不可用，请稍后再试" },
      { status: 500 }
    );
  }
}

async function handleLogout(request: NextRequest): Promise<NextResponse> {
  const accessToken = request.cookies.get("accessToken")?.value;

  if (accessToken) {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch {}
  }

  const res = NextResponse.json({ code: null, message: null, data: null });
  clearTokenCookies(res);
  return res;
}

async function handleApiProxy(request: NextRequest): Promise<NextResponse> {
  const { pathname, search } = request.nextUrl;
  const targetUrl = `${API_BASE_URL}${pathname.replace(/^\/api/, "")}${search}`;

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;

  const clientIp =
    request.headers.get("X-Real-IP") ||
    request.headers.get("X-Forwarded-For")?.split(",")[0];
  if (clientIp) headers["X-Forwarded-For"] = clientIp;

  let body: string | undefined;
  if (request.method !== "GET" && request.method !== "HEAD") {
    try {
      body = await request.text();
    } catch {}
  }

  try {
    let response = await fetchWithTimeout(
      targetUrl,
      { method: request.method, headers, body, cache: "no-store" },
      TIMEOUT_MS
    );
    let data: ApiResponse = await response.json();

    if (data.code === TOKEN_EXPIRED_CODE && refreshToken) {
      const newTokens = await refreshTokens(refreshToken);

      if (newTokens) {
        headers["Authorization"] = `Bearer ${newTokens.accessToken}`;
        response = await fetchWithTimeout(
          targetUrl,
          { method: request.method, headers, body, cache: "no-store" },
          TIMEOUT_MS
        );
        data = await response.json();

        const res = NextResponse.json(data);
        setTokenCookies(res, newTokens);
        return res;
      }

      const res = NextResponse.json({
        code: REFRESH_TOKEN_EXPIRED_CODE,
        message: "登录已过期，请重新登录",
        data: null,
      });
      clearTokenCookies(res);
      return res;
    }

    if (data.code === REFRESH_TOKEN_EXPIRED_CODE) {
      const res = NextResponse.json(data);
      clearTokenCookies(res);
      return res;
    }

    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return NextResponse.json(
        { code: "504", message: "请求超时，请稍后重试" },
        { status: 504 }
      );
    }
    return NextResponse.json(
      { code: "502", message: "服务暂时不可用，请稍后再试" },
      { status: 502 }
    );
  }
}

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  if (!API_BASE_URL) {
    return NextResponse.json(
      { code: "500", message: "服务配置错误" },
      { status: 500 }
    );
  }

  if (pathname === "/api/auth/login" && request.method === "POST") {
    return handleLogin(request);
  }

  if (pathname === "/api/auth/logout" && request.method === "POST") {
    return handleLogout(request);
  }

  return handleApiProxy(request);
}

export const config = {
  matcher: "/api/:path*",
};

export default proxy;
