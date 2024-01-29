import { MessageType, SendMessageBody, SendMessageResponse } from "../@types";
import Wa from "../Wa";
import WaApi from "../WaApi";

export default class Message extends WaApi {
  sendMessage<T extends MessageType>({
    type,
    to,
    recipient_type,
    ...data
  }: SendMessageBody<T>) {
    if(type == "interactive"){
    const {interactive_type, ...rest} = data as unknown as SendMessageBody<"interactive">
      data = {
        ...rest,
        type: interactive_type
      } as any
    }
    return this.fetcher.post<SendMessageResponse>({
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
  get url(){
    return {
      SEND_MESSAGE: `https://graph.facebook.com/${Wa.apiVersion}/${this.phoneNumberId}/messages`,
    }
  }
}
