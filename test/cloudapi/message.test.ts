import { describe, expect, it } from "vitest";
import { Wa } from "../../src";
describe.skip("test send message", () => {
  it("can send text message", async () => {
    const wa = new Wa({
      token: process.env.TOKEN || "",
      defaultPhoneNumberId: process.env.DEFAULT_PHONE_NUMBER_ID || "",
      accountId: process.env.ACCOUNT_ID || "",
    });
    const res = await wa.cloudApi.sendMessage({
      type: "text",
      to: process.env.TEST_TARGET_PHONE_NUMBER||'',
      body: "message from vitest",
    });
    const json = await res.json();
    expect(json.messaging_product).toBe("whatsapp")
    expect(json.contacts[0]).toMatchObject({input:process.env.TEST_TARGET_PHONE_NUMBER, wa_id: process.env.TEST_TARGET_PHONE_NUMBER})
    expect(json.messages[0]).toHaveProperty("id")
  });
});
