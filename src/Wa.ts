import { Business } from "Business";
import WaFetcher from "./WaFetcher";
import { WaConfig } from "@types";
import CloudApi from "./CloudApi";

class Wa {
  public readonly cloudApi: CloudApi;
  protected readonly fetcher!: WaFetcher;
  public readonly business: Business;

  constructor(protected config: WaConfig) {
    this.fetcher = new WaFetcher(config.token);
    this.cloudApi = new CloudApi(config)
    this.business = new Business(config)
  }
}
export default Wa;
