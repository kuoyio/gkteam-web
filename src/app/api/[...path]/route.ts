import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : process.env.NEXT_PUBLIC_API_BASE_URL;

const TIMEOUT_MS = 15000;

interface ApiResponse {
  code?: number;
  message?: string;
  data?: unknown;
}

async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeout: number,
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

async function handleProxyRequest(
  request: NextRequest,
  params: Promise<{ path: string[] }>,
): Promise<NextResponse> {
  const { path } = await params;

  if (!API_BASE_URL) {
    console.error("[API Proxy] NEXT_PUBLIC_API_BASE_URL is not configured");
    return NextResponse.json(
      { code: 500, message: "服务配置错误" },
      { status: 500 },
    );
  }

  const pathString = path.join("/");
  const url = new URL(request.url);
  const queryString = url.search;
  const targetUrl = `${API_BASE_URL}/${pathString}${queryString}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const authorization = request.headers.get("Authorization");
  if (authorization) {
    headers["Authorization"] = authorization;
  }

  const forwardedFor = request.headers.get("X-Forwarded-For");
  const clientIp =
    request.headers.get("X-Real-IP") || forwardedFor?.split(",")[0];
  if (clientIp) {
    headers["X-Forwarded-For"] = clientIp;
  }

  try {
    let body: string | undefined;
    if (request.method !== "GET" && request.method !== "HEAD") {
      try {
        const text = await request.text();
        if (text) {
          body = text;
        }
      } catch {
        // ignore
      }
    }

    const response = await fetchWithTimeout(
      targetUrl,
      {
        method: request.method,
        headers,
        body,
        cache: "no-store",
      },
      TIMEOUT_MS,
    );

    if (!response.ok) {
      try {
        const errorData: ApiResponse = await response.json();
        return NextResponse.json(errorData, { status: response.status });
      } catch {
        return NextResponse.json(
          {
            code: response.status,
            message: `请求失败: ${response.statusText}`,
          },
          { status: response.status },
        );
      }
    }

    const data: ApiResponse = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      console.error(`[API Proxy] Request timeout: ${targetUrl}`);
      return NextResponse.json(
        { code: 504, message: "请求超时，请稍后重试" },
        { status: 504 },
      );
    }

    console.error(`[API Proxy] Request failed: ${targetUrl}`, error);
    return NextResponse.json(
      { code: 502, message: "服务暂时不可用，请稍后再试" },
      { status: 502 },
    );
  }
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  return handleProxyRequest(request, context.params);
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  return handleProxyRequest(request, context.params);
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  return handleProxyRequest(request, context.params);
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  return handleProxyRequest(request, context.params);
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  return handleProxyRequest(request, context.params);
}
