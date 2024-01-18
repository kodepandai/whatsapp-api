export interface UploadMediaResponse {
  id: string;
}
export interface GetMediaResponse {
  messaging_product: string;
  url: string;
  mime_type: string;
  sha256: string;
  file_size: number;
  id: string;
}
