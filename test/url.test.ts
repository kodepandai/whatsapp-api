import {describe, expect, it} from "vitest"
import { Wa } from "../src"
describe("test wa url generator",()=>{
  it("can generate SEND_MESSAGE url",()=>{
    const wa = new Wa({
      token: "token",
      phoneNumberId: "phone-number-id"
    })
    expect(wa.url.SEND_MESSAGE).toBe("https://graph.facebook.com/v17.0/phone-number-id/messages")
  })
})
