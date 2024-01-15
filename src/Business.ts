import Analytic from "Analytic"
import WaApi from "WaApi"

/*
 * Business management api 
 * https://developers.facebook.com/docs/whatsapp/business-management-api/guides
 */
export class Business extends WaApi {

  public Analytics = new Analytic()
  // public Template = class {
  //   constructor() { }
  //   async createMessageTemplate() { }
  //   async retrieveMessageTemplate() { }
  //   async deleteMessageTemplate() { }
  // }
  // getPhoneNumbers() { super.fetcher.get(this.url.GET_PHONE_NUMBERS) }
}
