import { MessageType, SendMessageBody, WaConfig } from "@types";
import WaFetcher from "./WaFetcher";

class CloudApi {
  protected fetcher!: WaFetcher;
  protected accountId!: string;
  protected phoneNumberId!: string;
  constructor(protected config: WaConfig) {
    this.fetcher = new WaFetcher(config.token);
    this.accountId = config.accountId;
    this.phoneNumberId = config.defaultPhoneNumberId;
  }
  sendMessage<T extends MessageType>(body: SendMessageBody<T>) {
    this.fetcher.post(this.url.SEND_MESSAGE, body);
  }
  setPhoneNumberId(phoneNumber: string) {
    this.phoneNumberId = phoneNumber;
  }
  getPhoneNumberId() {
    return this.phoneNumberId;
  }
  get url() {
    return {
      SEND_MESSAGE: `https://graph.facebook.com/v18.0/${this.phoneNumberId}/messages`,
    };
  }
}
export default CloudApi;
