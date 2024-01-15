import { WaConfig } from "@types";
import WaFetcher from "./WaFetcher";
import Wa from "Wa";

abstract class WaApi {
  protected fetcher!: WaFetcher;
  protected accountId!: string;
  protected phoneNumberId?: string;
  constructor(protected config: WaConfig) {
    this.fetcher = new WaFetcher(config.token);
    this.accountId = config.accountId;
    this.phoneNumberId = config.defaultPhoneNumberId;
  }
  setPhoneNumberId(phoneNumber: string) {
    this.phoneNumberId = phoneNumber;
  }
  getPhoneNumberId() {
    return this.phoneNumberId;
  }
  get url(): Record<string, string | Function> {
    return {};
  }
}
export default WaApi;
