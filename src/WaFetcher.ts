interface FetcherParams {
  url: string;
  params?: Record<string, any>;
  body?: BodyInit | null | Record<string, any>;
  headers?: Record<string, any>;
  method?: "GET" | "POST" | "DELETE" | "PATCH" | "PUT";
  useBearerToken?: boolean;
  isJson?: boolean;
}
class WaFetcher {
  constructor(protected token?: string) { }
  get<R = unknown>(param: Omit<FetcherParams, "method">) {
    return this.call<R>(param);
  }
  post<R = unknown>(param: Omit<FetcherParams, "method">) {
    return this.call<R>({ method: "POST", ...param });
  }
  delete<R = unknown>(param: Omit<FetcherParams, "method">) {
    return this.call<R>({ method: "DELETE", ...param });
  }
  patch<R = unknown>(param: Omit<FetcherParams, "method">) {
    return this.call<R>({ method: "PATCH", ...param });
  }
  put<R = unknown>(param: Omit<FetcherParams, "method">) {
    return this.call<R>({ method: "PUT", ...param });
  }

  private async call<R>({
    url,
    method = "GET",
    params,
    body,
    headers = {},
    useBearerToken = true,
    isJson = true,
  }: FetcherParams) {
    if (useBearerToken) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }
    if (isJson) {
      headers["Content-Type"] = "application/json";
    }
    if (params) {
      url = `${url}?${new URLSearchParams(params)}`;
    }
    if (typeof body == "object") {
      body = JSON.stringify(body)
    }
    const res = await fetch(url, {
      method,
      body,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    });
    return await res.json() as R
  }
}
export default WaFetcher;
