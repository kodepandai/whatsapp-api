export interface CreateQRCodeResponse {
  code: string,
  prefilled_message: string,
  deep_link_url: string,
  qr_image_url: string
}


export interface CreateQRCodeParams {
  prefilled_message: string,
  generate_qr_image: string
}

export interface QRCodeItem {
  code: string,
  prefilled_message: string,
  deep_link_url: string
}

export interface UpdateQRCodeParams {
  code: string
  prefilled_message?: string,
  generate_qr_image?: string
}

export interface GetQRCodeResponse {
  data: QRCodeItem[]
}

export interface DeleteQRCodeResponse {
  success: true
}

export type UpdateQRCodeResponse = QRCodeItem
