import Analytic from "./Analytic"
import PhoneMigration from "./PhoneMigration"
import PhoneNumber from "./PhoneNumber"
import QRCode from "./QRCode"
import Signal from "./Signal"
import Template from "./Template"
import WaApi from "./WaApi"

/*
 * Business management api 
 * https://developers.facebook.com/docs/whatsapp/business-management-api/guides
 */
export class Business extends WaApi {


  public Analytics = new Analytic(this.config, this.fetcher)
  public PhoneNumber = new PhoneNumber(this.config, this.fetcher)
  public PhoneMigration = new PhoneMigration(this.config, this.fetcher)
  public QRCode = new QRCode(this.config, this.fetcher)
  public Signal = new Signal(this.config, this.fetcher)
  public Template = new Template(this.config, this.fetcher)
  //
  //   constructor() { }
  //   async createMessageTemplate() { }
  //   async retrieveMessageTemplate() { }
  //   async deleteMessageTemplate() { }
  // }
  // getPhoneNumbers() { super.fetcher.get(this.url.GET_PHONE_NUMBERS) }
}
