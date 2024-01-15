import { Language } from "language.enum";

export enum TemplateCategory {
  AUTHENTICATION = 'AUTHENTICATION',
  MARKETING = 'MARKETING',
  UTILITY = 'UTILITY'
}

interface CreateTemplateMessageParams {
  "name": string,
  "category": TemplateCategory,
  "allow_category_change": boolean,
  "language": Language,
  "components": [<COMPONENTS>]
}
