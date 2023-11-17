import { apiContext } from "service-srv";

export const _ = {
  url: "/code/:site_id/:action",
  async api(site_id: string, action: "list") {
    const { req, res } = apiContext(this);
    return "This is code.ts";
  },
};
