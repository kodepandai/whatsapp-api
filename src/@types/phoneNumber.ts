export interface PhoneNumber {
  verified_name: string,
  display_phone_number: string,
  id: string,
  quality_rating: string // might be green and NA and unknown
}
export interface GetAllPhoneNumbersResponse {
  data: PhoneNumber[]
}

export type PhoneNumberQualityRating = "GREEN" | "NA" | "UNKNOWN"
// export type CodeVerificationStatus = "VERIFIED"

export interface PhoneNumberDetail {
  // code_verification_status: CodeVerificationStatus,
  display_phone_number: string,
  id: string,
  quality_rating: PhoneNumberQualityRating,
  verified_name: string
}

export type GetPhoneNumberResponse = PhoneNumberQualityRating

/*
 * this filtering optino is currently in beta mode
 */
export interface PhoneFilterParameters {
  field?: ''
}
