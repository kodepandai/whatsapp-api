import { readFile } from "fs/promises";
import { MessageType, SendMessageBody } from "./@types";
import Wa from "./Wa";
import WaApi from "./WaApi";
import mime from "mime";

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

  async uploadMedia(path: string) {
    const file = await readFile(path);
    return this.fetcher.post({
      url: this.url.UPLOAD_MEDIA,
      body: {
        messaging_product: "whatsapp",
        file: new Blob([file], { type: mime.getType(path) || "text/plain" }),
      },
      forceFormData: true,
    });
  }
  get url() {
    return {
      SEND_MESSAGE: `https://graph.facebook.com/${Wa.apiVersion}/${this.phoneNumberId}/messages`,
      UPLOAD_MEDIA: `https://graph.facebook.com/${Wa.apiVersion}/${this.phoneNumberId}/media`,
    };
  }
}
export default CloudApi;
