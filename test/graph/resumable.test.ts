import { describe, expect, it } from "vitest";
import { Wa } from "../../src";
import _path from "path";
// TODO: belum bisa di test, harus ada permission
describe.skip("Resumable Api test", () => {
  it("can create upload session", async () => {
    const wa = new Wa({
      token: process.env.TOKEN || "",
      defaultPhoneNumberId: process.env.DEFAULT_PHONE_NUMBER_ID || "",
      accountId: process.env.ACCOUNT_ID || "",
      appId: process.env.APP_ID || "",
    });
    const path = _path.join(process.cwd(), ".env.example");
    const json = (await wa.graph.Resumable.createUploadSession(path)) as any;
    expect(json).toHaveProperty("id");

    // const accessToken = await wa.generateAccessToken()
    const json2 = await wa.graph.Resumable.upload({
      sessionId: json.id,
      path,
    });
    console.log(json2);
  });
});
