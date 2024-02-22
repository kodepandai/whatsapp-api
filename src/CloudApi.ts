import { readFile } from "fs/promises";
import { MessageType, SendMessageBody } from "./@types";
import Wa from "./Wa";
import WaApi from "./WaApi";
import Media from "./cloudApi/Media";
import Message from "./cloudApi/Message";

class CloudApi extends WaApi {
  public Media = new Media(this.config, this.fetcher);
  public Message = new Message(this.config, this.fetcher);
}
export default CloudApi;
