import { Response } from "@/src/type/common";
import LocalStorageUtil from "@/src/lib/util/localstorage-util";
import { store } from "@/src/store";
import {
  incrementLoading,
  decrementLoading,
} from "@/src/store/slices/loadingSlice";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, any>;
  body?: any;
  isNeedToken?: boolean;
}

const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "/api/external"
    : process.env.NEXT_PUBLIC_API_BASE_URL;

const DEFAULT_ERROR_MESSAGE = "服务暂时不可用，请稍后再试";

class HttpClient {
  private static buildUrl(url: string, params?: Record<string, any>) {
    if (!params) return url;
    const query = new URLSearchParams(params).toString();
    return `${url}?${query}`;
  }

  private static async request<T>(
    method: HttpMethod,
    url: string,
    options: RequestOptions = {},
  ): Promise<T> {
    const { headers = {}, params, body, isNeedToken = true } = options;

    store.dispatch(incrementLoading());

    try {
      let authToken: string | null = null;
      if (isNeedToken && typeof window !== "undefined") {
        authToken = LocalStorageUtil.get("token");
        if (!authToken) {
          window.location.href = "/login";
          throw new Error("未登录，请先登录");
        }
      }

      const cleanBase = BASE_URL?.replace(/\/+$/, "") ?? "";
      const cleanUrl = url.replace(/^\/+/, "");
      const fullUrl = `${cleanBase}/${this.buildUrl(cleanUrl, params)}`;

      let res: Response<T> | undefined;

      try {
        const fetchRes = await fetch(fullUrl, {
          method,
          headers: {
            "Content-Type": "application/json",
            ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
            ...headers,
          },
          ...(body ? { body: JSON.stringify(body) } : {}),
          cache: "no-store",
        });

        if (fetchRes.status === 401 && typeof window !== "undefined") {
          window.location.href = "/login";
          throw new Error("登录已过期，请重新登录");
        }

        try {
          res = await fetchRes.json();
        } catch {
          throw new Error(DEFAULT_ERROR_MESSAGE);
        }
      } catch {
        throw new Error(DEFAULT_ERROR_MESSAGE);
      }

      if (!res || typeof res !== "object") {
        throw new Error(DEFAULT_ERROR_MESSAGE);
      }

      if (res.code) {
        throw new Error(res.message || DEFAULT_ERROR_MESSAGE);
      }

      return res.data as T;
    } finally {
      store.dispatch(decrementLoading());
    }
  }

  static get<T>(url: string, options?: RequestOptions) {
    return this.request<T>("GET", url, options);
  }

  static post<T>(url: string, body?: any, options?: RequestOptions) {
    return this.request<T>("POST", url, { ...options, body });
  }

  static put<T>(url: string, body?: any, options?: RequestOptions) {
    return this.request<T>("PUT", url, { ...options, body });
  }

  static delete<T>(url: string, options?: RequestOptions) {
    return this.request<T>("DELETE", url, options);
  }
}

export default HttpClient;
