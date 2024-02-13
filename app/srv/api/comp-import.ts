import { apiContext } from "service-srv";

export const _ = {
  url: "/comp-import",
  async api(arg: { site_id: string; comp_ids: string[] }) {
    const { req, res } = apiContext(this);
    return "This is comp-import.ts";
  },
};
