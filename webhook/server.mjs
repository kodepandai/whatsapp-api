import polka from 'polka'
import {json} from "@polka/parse"
const server = polka({
  onError: (err, _, res) => {
    res.end("Error: " + err.message);
  },
});
server.use(json())
server.get("/webhooks", (req, res) => {
  console.log(req.query)
  res.end(req.query["hub.challenge"]);
});
server.post("/webhooks", (req, res) => {
  console.log(JSON.stringify(req.body,null,2))
});
server.listen(3000);
