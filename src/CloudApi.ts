import { MessageType, SendMessageBody } from "./@types";
import Wa from "./Wa";
import WaApi from "./WaApi";

class CloudApi extends WaApi {
  sendMessage<T extends MessageType>({
    type,
    to,
    recipient_type,
    ...data
  }: SendMessageBody<T>) {
    return this.fetcher.post({
      url: this.url.SEND_MESSAGE,
      body: {
        messaging_product: "whatsapp",
        [type]: data,
        to,
        recipient_type,
        type,
      },
    });
  }
  get url() {
    return {
      SEND_MESSAGE: `https://graph.facebook.com/${Wa.apiVersion}/${this.phoneNumberId}/messages`,
    };
  }
}
export default CloudApi;
