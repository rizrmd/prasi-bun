import { apiContext } from "service-srv";

export const _ = {
  url: "/_flow",
  async api(opt: { action: "load"; page_id: string }) {
    const { req, res } = apiContext(this);
    return "This is flow.ts";
  },
};
