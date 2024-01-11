import { WaConfig } from "./types";

class WaUrl {
  constructor(protected config: WaConfig){}

  get SEND_MESSAGE(){
    return `https://graph.facebook.com/v17.0/${this.config.phoneNumberId}/messages`
  }
}
export default WaUrl
