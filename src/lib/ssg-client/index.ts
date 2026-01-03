import { HttpMethod, Response } from "@/src/type/common";

interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean>;
  body?: unknown;
  revalidate?: number | false;
}

const getBaseUrl = () => {
  if (typeof window === "undefined") {
    const apiUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:8080"
        : process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!apiUrl) {
      throw new Error(
        "NEXT_PUBLIC_API_BASE_URL environment variable is not set"
      );
    }
    return `${apiUrl}/ssg`;
  }
  return "/api/ssg";
};

const DEFAULT_ERROR_MESSAGE = "服务暂时不可用，请稍后再试";

class SSGClient {
  private static buildUrl(
    url: string,
    params?: Record<string, string | number | boolean>
  ) {
    if (!params) return url;
    const query = new URLSearchParams(
      Object.entries(params).map(([k, v]) => [k, String(v)])
    ).toString();
    return `${url}?${query}`;
  }

  private static async request<T>(
    method: HttpMethod,
    url: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { headers = {}, params, body, revalidate } = options;

    const cleanBase = getBaseUrl().replace(/\/+$/, "");
    const cleanUrl = url.replace(/^\/+/, "");
    const fullUrl = `${cleanBase}/${this.buildUrl(cleanUrl, params)}`;

    let res: Response<T> | undefined;

    try {
      const fetchRes = await fetch(fullUrl, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
        ...(revalidate !== undefined ? { next: { revalidate } } : {}),
      });

      try {
        res = await fetchRes.json();
      } catch {
        throw new Error(DEFAULT_ERROR_MESSAGE);
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(DEFAULT_ERROR_MESSAGE);
    }

    if (!res || typeof res !== "object") {
      throw new Error(DEFAULT_ERROR_MESSAGE);
    }

    if (res.code) {
      throw new Error(res.message || DEFAULT_ERROR_MESSAGE);
    }

    return res.data as T;
  }

  static get<T>(url: string, options?: RequestOptions) {
    return this.request<T>("GET", url, options);
  }

  static post<T>(url: string, body?: unknown, options?: RequestOptions) {
    return this.request<T>("POST", url, { ...options, body });
  }

  static put<T>(url: string, body?: unknown, options?: RequestOptions) {
    return this.request<T>("PUT", url, { ...options, body });
  }

  static delete<T>(url: string, options?: RequestOptions) {
    return this.request<T>("DELETE", url, options);
  }
}

export default SSGClient;
