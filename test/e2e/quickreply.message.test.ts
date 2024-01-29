import { beforeAll, describe, expect, it } from "vitest";
import { Wa } from "../../src";
import { Language } from "../../src/language.enum";
import { TemplateCategory } from "../../src/@types";

var wa: Wa;
beforeAll(() => {
  wa = new Wa({
    token: process.env.TOKEN || "",
    defaultPhoneNumberId: process.env.DEFAULT_PHONE_NUMBER_ID || "",
    accountId: process.env.ACCOUNT_ID || "",
    appId: process.env.APP_ID || "",
  });
});

describe.sequential("Quick Reply Message Template", () => {
  it.skip("can create quick reply message template", async () => {
    const res = await wa.business.Template.createTemplate({
      name: "seasonal_promotion_text_only",
      language: Language.English_US,
      category: TemplateCategory.MARKETING,
      components: [
        {
          type: "HEADER",
          format: "TEXT",
          text: "Our {{1}} is on!",
          example: {
            header_text: ["Summer Sale"],
          },
        },
        {
          type: "BODY",
          text: "Shop now through {{1}} and use code {{2}} to get {{3}} off of all merchandise.",
          example: {
            body_text: [["the end of August", "25OFF", "25%"]],
          },
        },
        {
          type: "FOOTER",
          text: "Use the buttons below to manage your marketing subscriptions",
        },
        {
          type: "BUTTONS",
          buttons: [
            {
              type: "QUICK_REPLY",
              text: "Unsubcribe from Promos",
            },
            {
              type: "QUICK_REPLY",
              text: "Unsubscribe from All",
            },
          ],
        },
      ],
    });
    expect(res).toHaveProperty("id");
    expect(res).toHaveProperty("status");
    expect(res).toHaveProperty("category");
  });

  it.skip("can send quick reply message", async () => {
    const res = await wa.cloudApi.Message.sendMessage({
      type: "template",
      name: "seasonal_promotion_text_only",
      to: process.env.TEST_TARGET_PHONE_NUMBER || "",
      language: {
        code: Language.English_US,
      },
      components: [
        {
          type: "header",
          parameters: [
            {
              type: "text",
              text: "Summer Sale",
            },
          ],
        },
        {
          type: "body",
          parameters: [
            {
              type: "text",
              text: "the end of August ",
            },
            {
              type: "text",
              text: "25OFF",
            },
            {
              type: "text",
              text: "25%"
            },
          ],
        },
      ],
    });
    console.log(res);
  });
});
