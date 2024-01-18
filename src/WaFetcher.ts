interface FetcherParams {
  url: string;
  params?: Record<string, any>;
  body?: BodyInit | null | Record<string, any>;
  headers?: Record<string, any>;
  method?: "GET" | "POST" | "DELETE" | "PATCH" | "PUT";
  useBearerToken?: boolean;
  isJson?: boolean;
  returnJson?: boolean;
  forceFormData?: boolean;
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
    returnJson = true,
    forceFormData = false,
  }: FetcherParams) {
    if (useBearerToken) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }
    if (isJson && !forceFormData) {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(body);
    }
    if (params) {
      url = `${url}?${new URLSearchParams(params)}`;
    }
    if (forceFormData && typeof body == "object") {
      body = this.generateFormData(body as Record<string, any>);
    }
    const res = await fetch(url, {
      method,
      body: body as BodyInit,
      headers,
    });
    if (returnJson) {
      return (await res.json()) as R;
    }
    return res as R;
  }

  private generateFormData<T extends Record<string, any>>(payload: T) {
    let fd = new FormData();
    Object.entries(payload).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => {
          if (typeof v === "object") {
            Object.keys(v).forEach((k: string) => {
              fd.append(key + `[][${k}]`, this.parseValue(v[k]));
            });
          } else {
            fd.append(key + "[]", this.parseValue(v));
          }
        });
      } else {
        fd.append(key, this.parseValue(value));
      }
    });
    return fd;
  }
  private parseValue(value: any) {
    if (typeof value === "boolean") {
      return value ? 1 : 0;
    }
    return value;
  }
}
export default WaFetcher;
