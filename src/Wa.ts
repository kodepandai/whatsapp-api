import { Business } from "./Business";
import WaFetcher from "./WaFetcher";
import { WaConfig } from "./@types";
import CloudApi from "./CloudApi";

class Wa {
  protected readonly fetcher!: WaFetcher;
  public static readonly apiVersion: string = "v18.0"

  public readonly cloudApi: CloudApi;
  public readonly business: Business;

  constructor(protected config: WaConfig) {
    this.fetcher = new WaFetcher(config.token);
    this.cloudApi = new CloudApi(config, this.fetcher)
    this.business = new Business(config, this.fetcher)
  }
}
export default Wa;
