import Wa from "./Wa";
import WaApi from "./WaApi";

export default class Template extends WaApi {

  public createTemplate(){
    this.fetcher.post(this.url.CREATE_TEMPLATE)
  }
  get url(){
    return {
      CREATE_TEMPLATE: `https://graph.facebook.com/${Wa.apiVersion}/me/message_templates`
    }
  }
}
