export type MessageType =
  | "text"
  | "image"
  | "audio"
  | "video"
  | "document"
  | "sticker"
  | "template"
  | "reaction"
  | "interactive"
  | "hsm";

export type SendMessageBody<T extends MessageType> = {
  type: T;
  /** ID whatsapp phone number */
  to: string;

  recipient_type?: "individual";
} & MessageObject<T>;

type MediaObject =
  | {
    /** media ObjectID*/
    id: string;
  }
  | {
    link: string;
  };
type Caption = { caption?: string };
interface AllMessageObject {
  text: {
    body: string;
    /** set to true to render a link preview of any URL in the body text*/
    preview_url?: boolean;
  };
  image: MediaObject & Caption;
  audio: MediaObject;
  video: MediaObject & Caption;
  document: MediaObject &
  Caption & {
    /** The extension of the filename will specify what format the document is displayed as in WhatsApp.*/
    filename?: string;
  };
  sticker: MediaObject;
  template: {
    namespace?: string;
    name: string;
    language: {
      code: string;
    };
    components: any[];
  };
  reaction: {
    message_id: string;
    /** emoji supported by android and IOS
     * @example "\uD83D\uDE00"
     * */
    emoji: string;
  };
  interactive: {
    interactive_type:
    | "button"
    | "list"
    | "catalog_message"
    | "product"
    | "product_list"
    | "flow";
    action: {
      /** required for list message */
      button?: string;
      /** required for reply buttons, upto 3 buttons */
      buttons?: {
        type: "reply";
        reply: {
          title: string;
          id: string;
        };
      }[];
      catalog_id?: string;
      product_retailer_id?: string;
      /** required for list message and product message */
      sections?: {
        product_items?: {
          product_retailer_id: string;
        }[];
        rows?: {
          id: string;
          title: string;
          description?: string;
        }[];
        /** required if message has more than 1 section */
        title?: string;
      }[];
      /** optional for flows */
      mode?: "draft" | "published";
      flow_message_version?: string;
      flow_token?: string;
      flow_id?: string;
      flow_cta?: string;
      flow_action?: string;
      flow_action_payload?: string;
    };
    body?: {
      text: string;
    };
    footer?: {
      text: string;
    };
    header?: {
      type: "text" | "video" | "image" | "document";
      document?: MediaObject;
      image?: MediaObject;
      video?: MediaObject;
      text?: string;
    };
  };
  hsm: {}; // TODO: belum ketemu dokumentasinya
}

type MessageObject<T extends MessageType> = T extends keyof AllMessageObject
  ? AllMessageObject[T]
  : {};

export interface SendMessageResponse {
  messaging_product: string;
  contacts: { input: string; wa_id: string }[];
  messages: { id: string }[];
}
