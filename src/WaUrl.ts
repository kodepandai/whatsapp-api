import { WaConfig } from "@types";

class WaUrl {
  protected phoneNumberId?: string;
  protected accountId?: string;
  constructor(protected config: WaConfig){
    this.phoneNumberId = config.defaultPhoneNumberId
    this.accountId = config.accountId;
  }

  setPhoneNumberId(phoneNumber: string){
    this.phoneNumberId = phoneNumber
  }
  getPhoneNumberId(){
    return this.phoneNumberId
  }

  get SEND_MESSAGE(){
    return `https://graph.facebook.com/v18.0/${this.phoneNumberId}/messages`
  }

  get GET_PHONE_NUMBERS(){
    return `https://graph.facebook.com/v18.0/${this.accountId}/phone-numbers?access_token=${this.config.token}`
  }
}
export default WaUrl
