import { beforeAll, describe, expect, it } from "vitest";
import { Wa } from "../../src";
import path from "path";
import fs from "fs";
import { pipeline } from "stream";

var wa: Wa;
var mediaId: string;
var mediaUrl: string;
beforeAll(() => {
  wa = new Wa({
    token: process.env.TOKEN || "",
    defaultPhoneNumberId: process.env.DEFAULT_PHONE_NUMBER_ID || "",
    accountId: process.env.ACCOUNT_ID || "",
    appId: process.env.APP_ID || "",
  });
});
describe.sequential("Cloud Api Media test", () => {
  it.skip("can upload file", async () => {
    const json = await wa.cloudApi.Media.uploadMedia(
      path.join(process.cwd(), "cat.jpg"),
    );
    expect(json).toHaveProperty("id");
    mediaId = json.id;
  });
  it.skip("can get media url", async () => {
    const json = await wa.cloudApi.Media.getMediaUrl(mediaId);
    expect(json).toHaveProperty("id");
    expect(json).toHaveProperty("url");
    expect(json).toHaveProperty("sha256");
    expect(json).toHaveProperty("file_size");
    expect(json).toHaveProperty("mime_type");
    expect(json).toHaveProperty("messaging_product");
    mediaUrl = json.url;
  });
  it.todo("can download media", async () => {
    // TODO: ini belum bisa get binarynya
    const res = await wa.cloudApi.Media.downloadMedia(mediaUrl);
    console.log(await res.blob())
  });
  it.skip("can delete media", async ()=>{
    const res = await wa.cloudApi.Media.deleteMedia(mediaId)
    expect(res.success).toBe(true)
  })
});
