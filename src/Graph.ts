import Resumable from "./Resumable"
import WaApi from "./WaApi"

export default class Graph extends WaApi {
  public Resumable = new Resumable(this.config, this.fetcher)
}
