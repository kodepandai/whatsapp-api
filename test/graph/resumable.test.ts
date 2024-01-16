import {describe, expect, it} from "vitest"
import { Wa } from "../../src"
import path from "path"
describe("Resumable Api test",()=>{
  it.skip("can create upload session",async ()=>{
    const wa = new Wa({
      token: process.env.TOKEN || "",
      defaultPhoneNumberId: process.env.DEFAULT_PHONE_NUMBER_ID || "",
      accountId: process.env.ACCOUNT_ID || "",
      appId: process.env.APP_ID || ""
    })
    const res = await wa.graph.Resumable.createUploadSession(path.join(process.cwd(),".env.example"))
    const json = await res.json();
    expect(json).toHaveProperty("id")
  })
})
