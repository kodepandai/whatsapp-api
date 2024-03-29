import { describe, expect, it } from "vitest";
import { Wa } from "../../src";
import _path from "path";
describe("Resumable Api test", () => {
  it.skip("can create upload session", async () => {
    const wa = new Wa({
      token: process.env.TOKEN || "",
      defaultPhoneNumberId: process.env.DEFAULT_PHONE_NUMBER_ID || "",
      accountId: process.env.ACCOUNT_ID || "",
      appId: process.env.APP_ID || "",
    });
    const path = _path.join(process.cwd(), "example", "cat.jpg");
    const json = (await wa.graph.Resumable.createUploadSession(path)) as any;
    expect(json).toHaveProperty("id");

    const res = await wa.graph.Resumable.upload({
      sessionId: json.id,
      path,
    });
    expect(res).toHaveProperty("h")
  });
});
