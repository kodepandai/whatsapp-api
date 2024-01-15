import Wa from "./Wa"
import WaApi from "./WaApi"

export default class Signal extends WaApi {
  get url() {
    return {
      GET_PHONE_NUMBERS: `https://graph.facebook.com/${Wa.apiVersion}/${this.config.accountId}/phone_numbers?access_token=${this.config.token}`,
    };
  }
}
