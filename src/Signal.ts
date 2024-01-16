<<<<<<< HEAD
import Wa from "Wa"
import WaApi from "WaApi"
=======
import Wa from "./Wa"
import WaApi from "./WaApi"
>>>>>>> b8b43194ecca8a594ad0287ffc476943f41e7c38

export default class Signal extends WaApi {
  get url() {
    return {
      GET_PHONE_NUMBERS: `https://graph.facebook.com/${Wa.apiVersion}/${this.config.accountId}/phone_numbers?access_token=${this.config.token}`,
    };
  }
}
