import { beforeAll, describe, expect, it } from "vitest";
import { Wa } from "../../src";
import { Language } from "../../src/language.enum";
import { TemplateCategory } from "../../src/@types";
import path from "path";

var wa: Wa;
var mediaHandle: string;
beforeAll(() => {
  wa = new Wa({
    token: process.env.TOKEN || "",
    defaultPhoneNumberId: process.env.DEFAULT_PHONE_NUMBER_ID || "",
    accountId: process.env.ACCOUNT_ID || "",
    appId: process.env.APP_ID || "",
  });
});
describe.sequential("Dynamic Message Template", () => {
  it.skip("can upload using resumable api", async () => {
    // create upload resumable upload session
    const imagePath = path.join(process.cwd(), "example", "cat.jpg");
    const session = await wa.graph.Resumable.createUploadSession(imagePath);
    // upload media using resumable api
    const media = await wa.graph.Resumable.upload({
      path: imagePath,
      sessionId: session.id,
    });
    expect(media).toHaveProperty("h");
    mediaHandle = media.h
  });
  it.skip("can create dynamic message template", async()=>{
    const res = await wa.business.Template.createTemplate({
      name: "pesanan_baru",
      language: Language.Indonesian,
      category: TemplateCategory.UTILITY,
      components: [
        {
          type: "HEADER",
          format: "IMAGE",
          example: {
            header_handle: [mediaHandle],
          },
        },
        {
          type: "BODY",
          text: "Terima kasih {{1}}, Pesanan anda sedang kami proses, berikut invoice anda. Selesaikan pembayaran sebelum {{2}}. Terima kasih.",
          example: {
            body_text: [["Akhmad", "14 Desember 2022"]],
          },
        },
        {
          type: "BUTTONS",
          buttons: [
            {
              type: "URL",
              text: "Konfirmasi Pembayaran",
              url: "https://laparaga.com/confirm/{{1}}",
              example: ["123456789"],
            },
          ],
        },
      ],
    });
    expect(res).toHaveProperty("id")
    expect(res).toHaveProperty("status")
    expect(res).toHaveProperty("category")
  })

  it.skip("can send message template using dynamic media", async ()=>{
    const media = await wa.cloudApi.Media.uploadMedia(path.join(process.cwd(), "example", "cat.jpg"));
    const recipientData = {
      name: "Akhmad",
      expiredAt: "14 Desember 2022",
    }
    const res = await wa.cloudApi.Message.sendMessage({
      type: "template",
      name: "pesanan_baru",
      to: process.env.TEST_TARGET_PHONE_NUMBER || "",
      language: {
        code: Language.Indonesian,
      },
      components: [
        {
          type: "header",
          parameters: [{
            type: "image",
            image: {
              id: media.id
            }
          }]
        },
        {
          type:"body",
          parameters: [
            {
              type:"text",
              text: recipientData.name,
            },
            {
              type: "date_time",
              date_time: {
                fallback_value: recipientData.expiredAt
              }
            }
          ]
        },
        {
          type:"button",
          sub_type:"url",
          index:"0",
          parameters: [
            {
              type:"TEXT",
              text: "120"
            }
          ]
        }
      ]
    })
    console.log(res)
  })
});
