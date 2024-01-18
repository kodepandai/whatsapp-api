import { readFile } from "fs/promises";
import WaApi from "../WaApi";
import Wa from "../Wa";
import mime from "mime";

export default class Media extends WaApi {
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
      UPLOAD_MEDIA: `https://graph.facebook.com/${Wa.apiVersion}/${this.phoneNumberId}/media`,
    };
  }
}
