import { apiContext } from "../server/api-ctx";
import { g } from "../utils/global";

export const _ = {
  url: "/_api_frm",
  async api() {
    const { req, res } = apiContext(this);

    let allowUrl = req.headers.get("origin") || req.headers.get("referer");

    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    if (allowUrl) {
      res.setHeader("Access-Control-Allow-Origin", allowUrl);
    }

    res.setHeader("content-type", "text/html");
    res.setHeader("etag", g.frm.etag);
    res.send(`<script>${g.frm.js}</script>`);
  },
};
