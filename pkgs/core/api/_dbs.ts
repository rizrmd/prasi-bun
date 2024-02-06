import { g } from "utils/global";
import { apiContext } from "../server/api/api-ctx";
import { execQuery } from "../utils/query";

export const _ = {
  url: "/_dbs/:action",
  async api(action?: string) {
    const { req, res } = apiContext(this);

    try {
      const result = await execQuery(req.params, g._db);
      res.send(result);
    } catch (e: any) {
      res.sendStatus(500);
      res.send(e.message);
      console.error(e);
    }
  },
};
