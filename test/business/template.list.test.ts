import { describe, expect, it } from "vitest";
import { Wa } from "../../src";
import { Language } from "../../src/language.enum";
import { QualityScore, TemplateCategory, TemplateStatus } from "../../src/@types/template";
describe.skip("Get Message Template", () => {
  it("can get list message template without params", async () => {
    const wa = new Wa({
      token: process.env.TOKEN || "",
      defaultPhoneNumberId: process.env.DEFAULT_PHONE_NUMBER_ID || "",
      accountId: process.env.account_id || "",
      appId: process.env.APP_ID||""
    });
    const res = await wa.business.Template.getTemplates();
    const json = await res.json();
    expect(json).toHaveProperty("data")
    expect(json).toHaveProperty("paging.cursors.before")
    expect(json).toHaveProperty("paging.cursors.after")
    console.log(json)
    if(json.data.length){
      expect(json.data[0]).toHaveProperty("id")
      expect(json.data[0]).toHaveProperty("components")
      expect(json.data[0]).toHaveProperty("language")
      expect(json.data[0]).toHaveProperty("status")
      expect(json.data[0]).toHaveProperty("category")
      expect(json.data[0]).toHaveProperty("name")
    }
  });

  it("can get list message template with params", async () => {
    const wa = new Wa({
      token: process.env.TOKEN || "",
      defaultPhoneNumberId: process.env.DEFAULT_PHONE_NUMBER_ID || "",
      accountId: process.env.ACCOUNT_ID || "",
      appId: process.env.APP_ID||""
    });
    const res = await wa.business.Template.getTemplates({
      language: [Language.English_US],
      status: [TemplateStatus.APPROVED],
      quality_score: [QualityScore.UNKNOWN]
    });
    const json = await res.json();
    expect(json).toHaveProperty("data")
    expect(json).toHaveProperty("paging.cursors.before")
    expect(json).toHaveProperty("paging.cursors.after")
    if(json.data.length){
      expect(json.data[0]).toHaveProperty("id")
      expect(json.data[0]).toHaveProperty("components")
      expect(json.data[0]).toHaveProperty("language")
      expect(json.data[0]).toHaveProperty("status")
      expect(json.data[0]).toHaveProperty("category")
      expect(json.data[0]).toHaveProperty("name")
    }
  });
});
