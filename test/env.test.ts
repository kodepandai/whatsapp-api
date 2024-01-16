import {describe, expect, it} from "vitest"
import { Wa } from "../src"
describe("test reading environment variable",()=>{
  it("can read environment variable",()=>{
    expect(process.env.TOKEN).toBeDefined()
    expect(process.env.DEFAULT_PHONE_NUMBER_ID).toBeDefined();
    expect(process.env.ACCOUNT_ID).toBeDefined();
    expect(process.env.APP_ID).toBeDefined();
    // const wa = new Wa({
    //   token: "token",
    //   defaultPhoneNumberId: "phone-number-id",
    //   accountId: "account-id"
    // })
    // expect(wa.cloudApi.url.SEND_MESSAGE).toBe("https://graph.facebook.com/v18.0/phone-number-id/messages")
  })
})
