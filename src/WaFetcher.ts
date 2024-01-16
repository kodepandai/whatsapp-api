class WaFetcher {
  constructor(protected token?: string) { }
  get(url: string, params?: Record<string, any>) {
    return fetch(`${url}?${new URLSearchParams(params)}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`
      }
    })
  }
  post(url: string, body?: Record<string, any>) {
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`
      },
      body: JSON.stringify(body)
    })
  }
  delete(url: string, body?: Record<string, any>) {
    return fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`
      },
      body: JSON.stringify(body)
    })
  }
}
export default WaFetcher
