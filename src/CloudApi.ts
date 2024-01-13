import { MessageType, SendMessageBody, WaConfig } from "@types";
import WaFetcher from "./WaFetcher";
import WaApi from "./WaApi";

class CloudApi extends WaApi {
  sendMessage<T extends MessageType>(body: SendMessageBody<T>) {
    this.fetcher.post(this.url.SEND_MESSAGE, body);
  }
  get url() {
    return {
      SEND_MESSAGE: `https://graph.facebook.com/v18.0/${this.phoneNumberId}/messages`,
    };
  }
}
export default CloudApi;
