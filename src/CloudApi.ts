import { MessageType, SendMessageBody } from "./@types";
import WaApi from "./WaApi";

class CloudApi extends WaApi {
  sendMessage<T extends MessageType>({
    type,
    to,
    recipient_type,
    ...data
  }: SendMessageBody<T>) {
    return this.fetcher.post(this.url.SEND_MESSAGE, {
      messaging_product: "whatsapp",
      [type]: data,
      to,
      recipient_type,
      type,
    });
  }
  get url() {
    return {
      SEND_MESSAGE: `https://graph.facebook.com/v18.0/${this.phoneNumberId}/messages`,
    };
  }
}
export default CloudApi;
