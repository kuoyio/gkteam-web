import { HttpMethod, Response } from "@/src/type/common";
import { store } from "@/src/store";
import {
  incrementLoading,
  decrementLoading,
} from "@/src/store/slices/loadingSlice";
import { REQUIRE_RELOGIN_CODES } from "@/src/lib/constants/auth";

type RequestParams = Record<string, unknown>;

const BASE_URL = "/api";
const DEFAULT_ERROR = "服务暂时不可用，请稍后再试";

class HttpClient {
  private static buildUrl(url: string, params?: RequestParams): string {
    if (!params) return url;
    const query = new URLSearchParams(
      Object.entries(params).reduce(
        (acc, [key, value]) => {
          if (value != null) acc[key] = String(value);
          return acc;
        },
        {} as Record<string, string>,
      ),
    ).toString();
    return query ? `${url}?${query}` : url;
  }

  private static redirectToLogin(): void {
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      window.location.href = `/login?redirect=${encodeURIComponent(currentPath)}`;
    }
  }

  private static async request<T>(
    method: HttpMethod,
    url: string,
    body?: unknown,
    params?: RequestParams,
  ): Promise<T> {
    store.dispatch(incrementLoading());

    try {
      const fullUrl = `${BASE_URL}/${this.buildUrl(url.replace(/^\/+/, ""), params)}`;
      const res = await fetch(fullUrl, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body ? JSON.stringify(body) : undefined,
        credentials: "include",
      });

      const data: Response<T> = await res.json();

      if (data.code && REQUIRE_RELOGIN_CODES.includes(data.code)) {
        this.redirectToLogin();
        throw new Error("登录已过期，请重新登录");
      }

      if (data.code) {
        throw new Error(data.message || DEFAULT_ERROR);
      }

      return data.data as T;
    } catch (e) {
      if (e instanceof Error && e.message !== DEFAULT_ERROR) throw e;
      throw new Error(DEFAULT_ERROR);
    } finally {
      store.dispatch(decrementLoading());
    }
  }

  static get<T>(url: string, params?: RequestParams) {
    return this.request<T>("GET", url, undefined, params);
  }

  static post<T>(url: string, body?: unknown, params?: RequestParams) {
    return this.request<T>("POST", url, body, params);
  }

  static put<T>(url: string, body?: unknown, params?: RequestParams) {
    return this.request<T>("PUT", url, body, params);
  }

  static delete<T>(url: string, params?: RequestParams) {
    return this.request<T>("DELETE", url, undefined, params);
  }
}

export default HttpClient;
