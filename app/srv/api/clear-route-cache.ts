import { apiContext } from "service-srv";
import { g } from "utils/global";

export const _ = {
  url: "/clear-route-cache/:id",
  async api(id: string) {
    const { req, res } = apiContext(this);
    if (g.route_cache) delete g.route_cache[id];
    return "ok";
  },
};
