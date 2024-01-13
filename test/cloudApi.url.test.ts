import {describe, expect, it} from "vitest"
import { Wa } from "../src"
describe("test wa url generator",()=>{
  it("can generate SEND_MESSAGE url",()=>{
    const wa = new Wa({
      token: "token",
      defaultPhoneNumberId: "phone-number-id",
      accountId: "account-id"
    })
    expect(wa.cloudApi.url.SEND_MESSAGE).toBe("https://graph.facebook.com/v18.0/phone-number-id/messages")
  })
  it("can change phone number", ()=>{
    const wa = new Wa({
      token: "token",
      defaultPhoneNumberId: "phone-number-id",
      accountId: "account-id"
    })
    wa.cloudApi.setPhoneNumberId("xxx")
    expect(wa.cloudApi.getPhoneNumberId()).toBe("xxx")
  })
})
