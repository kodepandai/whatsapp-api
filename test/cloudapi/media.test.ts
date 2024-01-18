import { beforeAll, describe, expect, it } from "vitest";
import { Wa } from "../../src";
import path from "path";

var wa: Wa
beforeAll(()=>{
    wa = new Wa({
      token: process.env.TOKEN || "",
      defaultPhoneNumberId: process.env.DEFAULT_PHONE_NUMBER_ID || "",
      accountId: process.env.ACCOUNT_ID || "",
      appId: process.env.APP_ID || "",
    });
})
describe("Cloud Api Media test", () => {
  it.skip("can upload file", async () => {
    const json = (await wa.cloudApi.Media.uploadMedia(path.join(process.cwd(), "cat.jpg")));
    expect(json).toHaveProperty("id")
  });
  it.skip("can get media url", async ()=>{
    const mediaId = "337301312604254"; // Change with your own media id
    const json = await wa.cloudApi.Media.getMediaUrl(mediaId)
    expect(json).toHaveProperty("id")
    expect(json).toHaveProperty("url")
    expect(json).toHaveProperty("sha256")
    expect(json).toHaveProperty("file_size")
    expect(json).toHaveProperty("mime_type")
    expect(json).toHaveProperty("messaging_product")
  })
});
