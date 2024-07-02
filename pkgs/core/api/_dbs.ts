import { g } from "utils/global";
import { apiContext } from "../server/api/api-ctx";
import { DBArg, execQuery } from "../utils/query";

export const _ = {
  url: "/_dbs/:action",
  async api(action?: string) {
    const { req, res } = apiContext(this);

    try {
      const params = req.params as DBArg;

      if (
        params.table === "page" &&
        ["create", "update", "delete"].includes(params.action)
      ) {
        g.route_cache = {};
      }

      const result = await execQuery(params, g._db);
      res.send(result);
    } catch (e: any) {
      res.sendStatus(500);
      res.send(e.message);
      console.error(e);
    }
  },
};
