import Wa from "./Wa";
import WaApi from "./WaApi";
import { statSync } from "fs";
import mime from "mime";

export default class Resumable extends WaApi {
  createUploadSession(path: string) {
    const { size } = statSync(path);
    const mimeType = mime.getType(path);
    return this.fetcher.post(
      `${this.url.CREATE_UPLOAD_SESSION}?${new URLSearchParams({
        file_length: size.toString(),
        file_type: mimeType || "",
        access_token: this.config.token,
      })}`,
    );
  }

  get url() {
    return {
      CREATE_UPLOAD_SESSION: `https://graph.facebook.com/${Wa.apiVersion}/${this.config.appId}/uploads`,
    };
  }
}
