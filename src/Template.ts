import { CreateTemplateMessageParams } from "./@types/template";
import Wa from "./Wa";
import WaApi from "./WaApi";

export default class Template extends WaApi {

  public createTemplate(param: CreateTemplateMessageParams){
    if(param.components.findIndex(c=>c.type == "BODY") == -1){
      throw new Error("component of type BODY is required");
    }
    return this.fetcher.post(this.url.CREATE_TEMPLATE, param)
  }
  get url(){
    return {
      CREATE_TEMPLATE: `https://graph.facebook.com/${Wa.apiVersion}/${this.accountId}/message_templates`
    }
  }
}
