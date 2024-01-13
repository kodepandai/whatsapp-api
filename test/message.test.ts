import {describe, expect, it} from "vitest"
import { Wa } from "../src"
describe("test send message",()=>{
  it("can send text message",()=>{
    const wa = new Wa({
      token: "token",
      defaultPhoneNumberId: "phone-number-id",
      accountId: "account-id"
    })
    // wa.sendMessage({
    //   type: "audio",
    //   recipient_type: "individual",
    //   to: "aoeu",
    //   id: ""
    // })
  })
})
