import { readFile } from "fs/promises";
import { UploadParams, UploadResponse, UploadSessionResponse } from "./@types";
import Wa from "./Wa";
import WaApi from "./WaApi";
import { statSync } from "fs";
import mime from "mime-types";

export default class Resumable extends WaApi {
  createUploadSession(path: string) {
    const { size: file_length } = statSync(path);
    const file_type = mime.lookup(path);
    return this.fetcher.post<UploadSessionResponse>({
      url: this.url.CREATE_UPLOAD_SESSION,
      params: {
        file_length,
        file_type,
        access_token: this.config.token,
      },
    });
  }

  async upload({ sessionId, path, offset = 0 }: UploadParams) {
    const buffer = await readFile(path);
    const body = new Blob([buffer], {
      type: mime.lookup(path) || "text/plain",
    });
    return this.fetcher.post<UploadResponse>({
      url: this.url.UPLOAD(sessionId),
      body,
      useBearerToken: false,
      isJson: false,
      headers: {
        Authorization: `OAuth ${this.config.token}`,
        file_offset: offset,
      },
    });
  }

  get url() {
    return {
      CREATE_UPLOAD_SESSION: `https://graph.facebook.com/${Wa.apiVersion}/${this.config.appId}/uploads`,
      UPLOAD: (uploadSessionId: string) =>
        `https://graph.facebook.com/${Wa.apiVersion}/${uploadSessionId}`,
    };
  }
}
