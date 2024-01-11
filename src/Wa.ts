import WaFetcher from "./WaFetcher";
import WaUrl from "./WaUrl";
import { WaConfig } from "./types";

class Wa {
  public readonly url!: WaUrl
  protected readonly fetcher!: WaFetcher
  constructor(protected config: WaConfig){
    this.url = new WaUrl(config)
    this.fetcher = new WaFetcher(config.token)
  }

  sendMessage(){
    this.fetcher.post(this.url.SEND_MESSAGE)
  }

  getPhoneNumbers(){
    this.fetcher.get(this.url.GET_PHONE_NUMBERS)
  }
}
export default Wa
