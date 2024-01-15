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

  async getSinglePhoneNumber(phoneNumberId: string): Promise<GetPhoneNumberResponse> {
    return this.fetcher.get(this.url.Get_SINGLE_PHONE_NUMBER(phoneNumberId)) as unknown as GetPhoneNumberResponse
  }

  async getPhoneNumbers(): Promise<GetAllPhoneNumbersResponse> {
    return this.fetcher.get(this.url.GET_PHONE_NUMBERS) as unknown as GetAllPhoneNumbersResponse
  }
  get url() {
    return {
      GET_PHONE_NUMBERS: `https://graph.facebook.com/${Wa.apiVersion}/${this.config.accountId}/phone_numbers?access_token=${this.config.token}`,
      Get_SINGLE_PHONE_NUMBER: (phoneNumberId: string) => `https://graph.facebook.com/${Wa.apiVersion}/${phoneNumberId}`
    };
  }
}
