import {
  CreateTemplateMessageParams,
  CreateTemplateResponse,
  GetTemplateMessageParams,
} from "./@types/template";
import Wa from "./Wa";
import WaApi from "./WaApi";

export default class Template extends WaApi {
  public createTemplate(body: CreateTemplateMessageParams) {
    if (body.components.findIndex((c) => c.type == "BODY") == -1) {
      throw new Error("component of type BODY is required");
    }
    return this.fetcher.post<CreateTemplateResponse>({ url: this.url.CREATE_TEMPLATE, body });
  }

  public getTemplates(params?: GetTemplateMessageParams) {
    return this.fetcher.get({ url: this.url.CREATE_TEMPLATE, params });
  }
  get url() {
    return {
      CREATE_TEMPLATE: `https://graph.facebook.com/${Wa.apiVersion}/${this.accountId}/message_templates`,
      GET_TEMPLATE: `https://graph.facebook.com/${Wa.apiVersion}/${this.accountId}/message_templates`,
    };
  }
}
