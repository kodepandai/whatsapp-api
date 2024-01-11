import WaUrl from "./WaUrl";
import { WaConfig } from "./types";

class Wa {
  public readonly url!: WaUrl
  constructor(protected config: WaConfig){
    this.url = new WaUrl(config)
  }

  sendMessage(){
    console.log(this.url.SEND_MESSAGE)
  }
}
export default Wa
