import {
  CreateQRCodeParams,
  CreateQRCodeResponse,
  DeleteQRCodeResponse,
  GetQRCodeResponse,
  UpdateQRCodeParams,
  UpdateQRCodeResponse,
} from "./@types";
import Wa from "./Wa";
import WaApi from "./WaApi";

export default class QRCode extends WaApi {
  createQRCode(phoneNumberId: string, body: CreateQRCodeParams) {
    return this.fetcher.post<CreateQRCodeResponse>({
      url: this.url.CREATE_QR_CODE(phoneNumberId),
      body,
    });
  }
  getQRCode(phoneNumberId: string, qrCodeId?: string) {
    return this.fetcher.get<GetQRCodeResponse>({
      url: this.url.GET_QR_CODE(phoneNumberId, qrCodeId),
    });
  }
  updateQRCode(phoneNumberId: string, body: UpdateQRCodeParams) {
    return this.fetcher.post<UpdateQRCodeResponse>({
      url: this.url.EDIT_QR_CODE(phoneNumberId),
      body,
    });
  }
  deleteQRCode(phoneNumberId: string, qrCodeId: string) {
    return this.fetcher.delete<DeleteQRCodeResponse>({
      url: this.url.DELETE_QR_CODE(phoneNumberId, qrCodeId),
    });
  }

  get url() {
    return {
      CREATE_QR_CODE: (phoneNumberId: string) =>
        `https://graph.facebook.com/${Wa.apiVersion}/${phoneNumberId}/message_qrdls`,
      GET_QR_CODE: (phoneNumberId: string, qrCodeId?: string) =>
        `https://graph.facebook.com/${Wa.apiVersion}/${phoneNumberId}/message_qrdls/${qrCodeId}`,
      EDIT_QR_CODE: (phoneNumberId: string) =>
        `https://graph.facebook.com/${Wa.apiVersion}/${phoneNumberId}/message_qrdls/`,
      DELETE_QR_CODE: (phoneNumberId: string, qrCodeId?: string) =>
        `https://graph.facebook.com/${Wa.apiVersion}/${phoneNumberId}/message_qrdls/${qrCodeId}`,
    };
  }
}
