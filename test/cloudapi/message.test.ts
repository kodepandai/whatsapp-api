import { beforeAll, describe, expect, it } from "vitest";
import { Wa } from "../../src";
import path from "path";

var wa: Wa;
beforeAll(() => {
  wa = new Wa({
    token: process.env.TOKEN || "",
    defaultPhoneNumberId: process.env.DEFAULT_PHONE_NUMBER_ID || "",
    accountId: process.env.ACCOUNT_ID || "",
    appId: process.env.APP_ID || "",
  });
});
describe("test send message", () => {
  it.skip("can send text message", async () => {
    const json = await wa.cloudApi.Message.sendMessage({
      type: "text",
      to: process.env.TEST_TARGET_PHONE_NUMBER || "",
      body: "message from vitest",
    });
    expect(json.messaging_product).toBe("whatsapp");
    expect(json.contacts[0]).toMatchObject({
      input: process.env.TEST_TARGET_PHONE_NUMBER,
      wa_id: process.env.TEST_TARGET_PHONE_NUMBER,
    });
    expect(json.messages[0]).toHaveProperty("id");
  });
  it.skip("can send image message", async () => {
    // upload image first using media api
    const uploaded = await wa.cloudApi.Media.uploadMedia(
      path.join(process.cwd(), "example", "cat.jpg"),
    );
    const res = await wa.cloudApi.Message.sendMessage({
      type: "image",
      to: process.env.TEST_TARGET_PHONE_NUMBER || "",
      id: uploaded.id,
    });
    expect(res.messaging_product).toBe("whatsapp");
    expect(res.contacts[0]).toMatchObject({
      input: process.env.TEST_TARGET_PHONE_NUMBER,
      wa_id: process.env.TEST_TARGET_PHONE_NUMBER,
    });
    expect(res.messages[0]).toHaveProperty("id");
  });
  it.skip("can send interactive message", async () => {
    const res = await wa.cloudApi.Message.sendMessage({
      type: "interactive",
      to: process.env.TEST_TARGET_PHONE_NUMBER || "",
      interactive_type: "button",
      header: {
        type: "text",
        text: "Header",
      },
      body: {
        text: "Body",
      },
      footer: {
        text: "Footer",
      },
      action: {
        buttons: [
          {
            type: "reply",
            reply: {
              title: "Click Me",
              id: "btn1",
            },
          },
        ],
      },
    });
    console.log(res);
  });
});
