import Analytic from "Analytic"
import PhoneMigration from "PhoneMigration"
import PhoneNumber from "PhoneNumber"
import QRCode from "QRCode"
import Signal from "Signal"
import WaApi from "WaApi"

/*
 * Business management api 
 * https://developers.facebook.com/docs/whatsapp/business-management-api/guides
 */
export class Business extends WaApi {


  public Analytics = new Analytic(this.config)
  public PhoneNumber = new PhoneNumber(this.config)
  public PhoneMigration = new PhoneMigration(this.config)
  public QRCode = new QRCode(this.config)
  public Signal = new Signal(this.config)
  // public Template = class {
  //
  //   constructor() { }
  //   async createMessageTemplate() { }
  //   async retrieveMessageTemplate() { }
  //   async deleteMessageTemplate() { }
  // }
  // getPhoneNumbers() { super.fetcher.get(this.url.GET_PHONE_NUMBERS) }
}
