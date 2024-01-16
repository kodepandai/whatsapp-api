import { describe, expect, it } from "vitest";
import { Wa } from "../../src";
import { Language } from "../../src/language.enum";
import { TemplateCategory } from "../../src/@types/template";
describe("Manage Message Template", () => {
  it.skip("can create new message template", async () => {
    const wa = new Wa({
      token: process.env.TOKEN || "",
      defaultPhoneNumberId: process.env.DEFAULT_PHONE_NUMBER_ID || "",
      accountId: process.env.ACCOUNT_ID || "",
      appId: process.env.APP_ID || "",
    });
    const res = await wa.business.Template.createTemplate({
      name: "open_liveshop",
      language: Language.Indonesian,
      category: TemplateCategory.MARKETING,
      components: [
        {
          type: "BODY",
          text: "Pesan sekarang dan gunakan code ANAKBARU untuk mendapatkan merchandise.",
        },
        {
          type: "HEADER",
          format: "TEXT",
          text: "Jangan lewatkan, {{1}} telah dibuka!",
          example: {
            header_text: ["LiveShop kita"],
          },
        },
      ],
    });
    const json = await res.json();
    if (json.error) {
      expect(json).toHaveProperty("error.message");
      expect(json).toHaveProperty("error.type");
      expect(json).toHaveProperty("error.error_user_title");
      expect(json).toHaveProperty("error.error_user_msg");
    } else {
      expect(json).toHaveProperty("id");
      expect(json).toHaveProperty("status");
      expect(json).toHaveProperty("category");
    }
  });
});
