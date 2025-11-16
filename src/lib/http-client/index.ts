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
      if (isNeedToken) {
        authToken = LocalStorageUtil.get<string>("token");

        if (!authToken && typeof window !== "undefined") {
          window.location.href = "/login";
          throw new Error("未登录，请先登录");
        }
      }

      const fullUrl = `${BASE_URL}/${this.buildUrl(url, params)}`;

      const res = await fetch(fullUrl, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
          ...headers,
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
        cache: "no-store",
      });

      if (res.status === 401 && typeof window !== "undefined") {
        window.location.href = "/login";
        throw new Error("登录已过期，请重新登录");
      }

      const result: Response<T> = await res.json();
      if (result.code) {
        throw new Error(result.message);
      }
      return result.data as T;
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
