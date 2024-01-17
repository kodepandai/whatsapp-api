import { Business } from "./Business"
import WaFetcher from "./WaFetcher";
import { WaConfig } from "./@types";
import CloudApi from "./CloudApi";
import Graph from "./Graph";

class Wa {
  protected readonly fetcher!: WaFetcher;
  public static readonly apiVersion: string = "v18.0"

  public readonly cloudApi: CloudApi;
  public readonly business: Business;
  public readonly graph: Graph;

  constructor(protected config: WaConfig) {
    this.fetcher = new WaFetcher(config.token);
    this.cloudApi = new CloudApi(config, this.fetcher)
    this.business = new Business(config, this.fetcher)
    this.graph = new Graph(config, this.fetcher)
  }
  generateAccessToken(){
    return this.fetcher.get({
    url: `https://graph.facebook.com/oauth/access_token`, params: {
        client_id: this.config.appId,
        client_secret: "cc1cf1d71d0c64b0e8e0bd1870c147e2",
        grant_type: "client_credentials"
      }})
  }
}
export default Wa;
