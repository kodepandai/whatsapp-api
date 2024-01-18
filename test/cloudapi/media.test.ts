import { describe, expect, it } from "vitest";
import { Wa } from "../../src";
import path from "path";

describe("Cloud Api Media test", () => {
  it("can upload file", async () => {
    const wa = new Wa({
      token: process.env.TOKEN || "",
      defaultPhoneNumberId: process.env.DEFAULT_PHONE_NUMBER_ID || "",
      accountId: process.env.ACCOUNT_ID || "",
      appId: process.env.APP_ID || "",
    });
    const json = (await wa.cloudApi.uploadMedia(path.join(process.cwd(), "cat.jpg"))) as any;
    expect(json).toHaveProperty("id")
  });
});
