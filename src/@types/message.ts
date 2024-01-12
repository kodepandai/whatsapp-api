export type MessageType =
  | "text"
  | "image"
  | "audio"
  | "video"
  | "document"
  | "sticker"
  | "template"
  | "reaction"
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
  document: MediaObject & Caption & {
    /** The extension of the filename will specify what format the document is displayed as in WhatsApp.*/
    filename?: string;
  };
  sticker: MediaObject;
  template: {
    namespace: string;
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
  hsm: {}; // TODO: belum ketemu dokumentasinya
}

type MessageObject<T extends MessageType> = T extends keyof AllMessageObject
  ? AllMessageObject[T]
  : {};
