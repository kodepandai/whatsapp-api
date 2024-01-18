import { AnalyticFields, ConfirmTemplateAnalyticResponse, ConversationAnalyticParams, DisableButtonAnalyticResponse, GetAnalyticResponse, MessagingAnalyticParams, TemplateAnalyticResponse, TemplateGranularity, TemplateMetricTypes } from "./@types"
import { GetAllPhoneNumbersResponse, GetPhoneNumberResponse } from "./@types"
import Wa from "./Wa"
import WaApi from "./WaApi"

export interface TemplateAnalyticParams {
  start: Date
  end: Date
  granularity: TemplateGranularity,
  template_ids: string[]
  metric_types: TemplateMetricTypes
}

export default class PhoneNumber extends WaApi {

  async getSinglePhoneNumber(phoneNumberId: string) {
    return this.fetcher.get<GetPhoneNumberResponse>({
      url: this.url.Get_SINGLE_PHONE_NUMBER(phoneNumberId)
    });
  }

  async getPhoneNumbers() {
    return this.fetcher.get<GetAllPhoneNumbersResponse>({
      url: this.url.GET_PHONE_NUMBERS
    });
  }
  get url() {
    return {
      GET_PHONE_NUMBERS: `https://graph.facebook.com/${Wa.apiVersion}/${this.config.accountId}/phone_numbers?access_token=${this.config.token}`,
      Get_SINGLE_PHONE_NUMBER: (phoneNumberId: string) => `https://graph.facebook.com/${Wa.apiVersion}/${phoneNumberId}`
    };
  }
}
