import { AnalyticFields, ConfirmTemplateAnalyticResponse, ConversationAnalyticParams, DisableButtonAnalyticResponse, GetAnalyticResponse, MessagingAnalyticParams, TemplateAnalyticResponse, TemplateGranularity, TemplateMetricTypes } from "./@types"
import WaApi from "./WaApi"

export interface TemplateAnalyticParams {
  start: Date
  end: Date
  granularity: TemplateGranularity,
  template_ids: string[]
  metric_types: TemplateMetricTypes
}

export default class Analytic extends WaApi {

  confirmTemplateAnalytics(): ConfirmTemplateAnalyticResponse {

    return {} as any
  }
  disableButtonClickAnalytics(): DisableButtonAnalyticResponse {

    return {} as any
  }
  getAnalytics(fields: AnalyticFields, filteringParameters: MessagingAnalyticParams | ConversationAnalyticParams): GetAnalyticResponse {
    console.log('get analytics')
    return {} as any
  }
}
