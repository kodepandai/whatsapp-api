import { readFile } from "fs/promises";
import WaApi from "../WaApi";
import Wa from "../Wa";
import mime from "mime";
import { DeleteMediaResponse, GetMediaResponse, UploadMediaResponse } from "../@types";

export default class Media extends WaApi {
  async uploadMedia(path: string) {
    const file = await readFile(path);
    return this.fetcher.post<UploadMediaResponse>({
      url: this.url.UPLOAD_MEDIA,
      body: {
        messaging_product: "whatsapp",
        file: new Blob([file], { type: mime.getType(path) || "text/plain" }),
      },
      forceFormData: true,
    });
  }

  getMediaUrl(mediaId: string) {
    return this.fetcher.get<GetMediaResponse>({
      url: this.url.GET_MEDIA_URL(mediaId),
      params: {
        phone_number_id: this.phoneNumberId,
      },
    });
  }
  downloadMedia(mediaUrl: string){
    return this.fetcher.get({
      returnJson: false,
      isJson: false,
      url: mediaUrl
    })
  }
  deleteMedia(mediaId: string){
    return this.fetcher.delete<DeleteMediaResponse>({
      url: this.url.DELETE_MEDIA(mediaId),
      params: {
        phone_number_id: this.phoneNumberId,
      }
    })
  }

  get url() {
    return {
      UPLOAD_MEDIA: `https://graph.facebook.com/${Wa.apiVersion}/${this.phoneNumberId}/media`,
      GET_MEDIA_URL: (mediaId: string) =>
        `https://graph.facebook.com/${Wa.apiVersion}/${mediaId}`,
      DELETE_MEDIA: (mediaId: string) =>
        `https://graph.facebook.com/${Wa.apiVersion}/${mediaId}`,
    };
  }
}
