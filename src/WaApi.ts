import { WaConfig } from "@types";
import type WaFetcher from "./WaFetcher";

abstract class WaApi {
  protected accountId!: string;
  protected phoneNumberId?: string;
  constructor(protected config: WaConfig, protected fetcher: WaFetcher) {
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
