import { Language } from "../language.enum";

export enum TemplateCategory {
  AUTHENTICATION = "AUTHENTICATION",
  MARKETING = "MARKETING",
  UTILITY = "UTILITY",
}
export enum QualityScore {
  GREEN = "GREEN",
  YELLOW = "YELLOW",
  RED = "RED",
  UNKNOWN = "UNKNOWN",
}

export enum TemplateStatus {
  APPROVED = "APPROVED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
  IN_APPEAL = "IN_APPEAL",
  DELETION = "DELETION",
  DELETED = "DELETED",
  DISABLED = "DISABLED",
  PAUSED = "PAUSED",
  LIMIT_EXCEEDED = "LIMIT_EXCEEDED",
}

export interface CreateTemplateMessageParams {
  name: string;
  category: TemplateCategory;
  allow_category_change?: boolean;
  language: Language;
  components: (BodyComponent | HeaderComponent | ButtonComponent | FooterComponent)[];
}

type FooterComponent = {
  type: "FOOTER",
  text: string
}
type BodyComponent = {
  type: "BODY";
  /**
   * @example Shop now through {{1}} and use code {{2}} to get {{3}} off of all merchandise.
   * */
  text: string;

  /** Required if <TEXT> string contains variables
   * @example body_text: ["the end of August","25OFF","25%"]
   * */
  example?: {
    body_text: string[][]
  };
};
type HeaderComponent = {
  type: "HEADER";
} & (HeaderText | HeaderMedia | HeaderLocation);

type HeaderText = {
  format: "TEXT";

  /**
   * support 1 variable
   * @example Our {{1}} is on!
   * */
  text: string;

  /** Required if <TEXT> string contains variables
   * @example header_text: ["Sale"]
   * */
  example?: {
    header_text: [string];
  };
};
type HeaderMedia = {
  format: "IMAGE" | "VIDEO" | "DOCUMENT";
  example: {
    header_handle: [string];
  };
};
type HeaderLocation = {
  format: "LOCATION";
  example: {
    header_location: [string];
  };
};
type ButtonComponent = {
  type: "BUTTONS";
  buttons: (
    | PhoneButton
    | UrlButton
    | QuickReplyButton
    | CopyCodeButton
    | FlowsButton
  )[];
};

type PhoneButton = {
  type: "PHONE_NUMBER";
  text: string;
  phone_number: string;
};
type UrlButton = {
  type: "URL";
  text: string;
  url: string;
  example?: [string];
};
type QuickReplyButton = {
  type: "QUICK_REPLY";
  text: string;
};
type CopyCodeButton = {
  type: "COPY_CODE";
  example: string;
};
type FlowsButton = {
  type: "FLOW";
  text: string;
  flow_id: string;
  flow_action: "navigate" | "data_exchange";
  navigate_screen: string;
};

export interface GetTemplateMessageParams {
  category?: TemplateCategory[],
  content?: string;
  language?: Language[];
  name?: string;
  name_or_content?: string;
  quality_score?: QualityScore[],
  status?: TemplateStatus[]
}

export interface CreateTemplateResponse {
  id: string;
  status: string;
  category: string;
}
