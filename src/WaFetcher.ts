interface FetcherParams<J extends boolean> {
  url: string;
  params?: Record<string, any>;
  body?: BodyInit | null | Record<string, any>;
  headers?: Record<string, any>;
  method?: "GET" | "POST" | "DELETE" | "PATCH" | "PUT";
  useBearerToken?: boolean;
  isJson?: boolean;
  returnJson?: J;
  forceFormData?: boolean;
}
class WaFetcher {
  constructor(protected token?: string) { }
  get<R = unknown, J extends boolean = true>(
    param: Omit<FetcherParams<J>, "method">,
  ) {
    return this.call<R, J>(param);
  }
  post<R = unknown, J extends boolean = true>(
    param: Omit<FetcherParams<J>, "method">,
  ) {
    return this.call<R, J>({ method: "POST", ...param });
  }
  delete<R = unknown, J extends boolean = true>(
    param: Omit<FetcherParams<J>, "method">,
  ) {
    return this.call<R, J>({ method: "DELETE", ...param });
  }
  patch<R = unknown, J extends boolean = true>(
    param: Omit<FetcherParams<J>, "method">,
  ) {
    return this.call<R, J>({ method: "PATCH", ...param });
  }
  put<R = unknown, J extends boolean = true>(
    param: Omit<FetcherParams<J>, "method">,
  ) {
    return this.call<R, J>({ method: "PUT", ...param });
  }

  private async call<R, J extends boolean>(
    config: FetcherParams<J>,
  ): Promise<J extends false ? Response : R> {
    let {
      url,
      method = "GET",
      params,
      body,
      headers = {},
      useBearerToken = true,
      isJson = true,
      returnJson = true,
      forceFormData = false,
    } = config;
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
      return await res.json();
    }
    return res as any;
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
