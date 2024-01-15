import { CreateQRCodeParams, CreateQRCodeResponse, GetQRCodeResponse } from "./@types";
import Wa from "./Wa"
import WaApi from "./WaApi"

export default class QRCode extends WaApi {
  createQRCode(phoneNumberId: string, body: CreateQRCodeParams): Promise<CreateQRCodeResponse> {
    return this.fetcher.post(this.url.CREATE_QR_CODE(phoneNumberId), body) as unknown as any
  }
  getQRCode(phoneNumberId: string, qrCodeId?: string): Promise<GetQRCodeResponse> {
    return this.fetcher.get(this.url.GET_QR_CODE(phoneNumberId, qrCodeId)) as unknown as any
  }
  updateQRCode() {

  }
  deleteQRCode() {

  }

  get url() {
    return {
      CREATE_QR_CODE: (phoneNumberId: string) => `https://graph.facebook.com/${Wa.apiVersion}/${phoneNumberId}/message_qrdls`,
      GET_QR_CODE: (phoneNumberId: string, qrCodeId?: string) => `https://graph.facebook.com/${Wa.apiVersion}/${phoneNumberId}/message_qrdls/${qrCodeId}`
    };
  }

}
