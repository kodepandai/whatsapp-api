import { Country } from "country.enum"

export enum AnalyticFields {
  analytics = 'analytics',
  conversation_analytics = 'conversation_analytics',
  template_analytics = 'template_analytics'
}

export enum MessagingGranularity {
  HALF_HOUR = 'HALF_HOUR',
  DAY = 'DAY',
  MONTH = 'MONTH'
}

export enum ConversationGranularity {
  HALF_HOUR = 'HALF_HOUR',
  DAY = 'DAY',
  MONTH = 'MONTH'
}

export enum TemplateGranularity {
  DAILY = 'DAILY'
}

export enum ConversationMetricTypes {
  COST = 'COST',
  CONVERSATION = 'CONVERSATION'
}
export enum TemplateMetricTypes {
  CLICKED = 'CLICKED',
  DELIVERED = 'DELIVERED',
  READ = 'READ',
  SENT = 'SENT',
}
export enum ConversationCategories {
  AUTHENTICATION = 'AUTHENTICATION',
  MARKETING = 'MARKETING',
  SERVICE = 'SERVICE',
  UTILITY = 'UTILITY'
}
export enum ConversationTypes {

  // Conversations originating from a free entry point.
  FREE_ENTRY = 'FREE_ENTRY',

  // Conversations within the monthly free tier.
  FREE_TIER = 'FREE_TIER',

  // Any conversations that did not originate from a free entry point or are above the monthly free tier allotment.
  REGULAR = 'REGULAR'
}

export enum ConversationDirections {

  // Conversations initiated by the business.
  BUSINESS_INITIATED = 'BUSINESS_INITIATED',

  // Conversations initiated by an end user/customer.
  USER_INITIATED = 'USER_INITIATED',
}

export enum ConversationDimensions {
  CONVERSATION_CATEGORY = 'CONVERSATION_CATEGORY',
  CONVERSATION_DIRECTION = 'CONVERSATION_DIRECTION',
  CONVERSATION_TYPE = 'CONVERSATION_TYPE',
  COUNTRY = 'COUNTRY',
  PHONE = 'PHONE',
}

export interface MessagingAnalyticParams {
  start: Date // Convert to Unix timestamp
  end: Date // Convert to Unix timestamp
  granularity: MessagingGranularity // string options
  phone_numbers?: string[] // validate phone
  product_types?: string[]
  country_codes: Country[] // need to switch do dictionary enums
}

export interface ConversationAnalyticParams {
  start: Date
  end: Date
  granularity: ConversationGranularity,
  phone_numbers?: string[] // validate phone
  metric_types?: ConversationMetricTypes
  conversation_categories?: ConversationCategories
  conversation_directions?: ConversationDirections
  dimensions?: ConversationDimensions
}

export interface MessagingAnalyticDataPoint {
  start: number,
  end: number,
  sent: number,
  delivered: number
}

export interface ConversationAnalyticDataPoint {
  start: number,
  end: number,
  conversation: number,
  phone_number: string,
  country: Country,
  conversation_type: ConversationTypes,
  conversation_direction: ConversationDirections,
  conversation_category: ConversationCategories,
  cost: number
}

export interface MessagingAnalyticResponse {
  analytics: {
    phone_numbers: number[],
    country_codes: Country[],
    granularity: MessagingGranularity,
    data_points: MessagingAnalyticDataPoint[]
  },
  id: string
}

export interface ConversationAnalyticResponse {
  conversation_analytics: {
    data: [
      { data_points: ConversationAnalyticDataPoint[] }
    ]
  },
  id: string,
}

export interface ButtonClickAnalytic {
  type: string
  button_content: string,
  count: number
}
export interface TemplateAnalyticDataPoint {
  template_id: string
  start: number,
  end: number,
  sent: number,
  delivered: number,
  read: number,
  clicked: ButtonClickAnalytic[]
}

export interface TemplateAnalyticResponse {
  data: [
    {
      granularity: TemplateGranularity
      data_points: TemplateAnalyticDataPoint[]
    }
  ],
  paging: {
    cursors: {
      before: string
      after: string
    }
  }
}


export type ConfirmTemplateAnalyticResponse = { id: number }
export type DisableButtonAnalyticResponse = { success: true }
export type GetAnalyticResponse = MessagingAnalyticResponse | ConversationAnalyticResponse | TemplateAnalyticResponse
