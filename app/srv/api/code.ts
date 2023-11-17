import { apiContext } from "service-srv";

export const _ = {
  url: "/code/:site_id/:action",
  async api(site_id: string, action: "list") {
    const { req, res } = apiContext(this);

    if (action === "list") {
      return (await db.code.findMany({ where: { id_site: site_id } })).map(
        (e) => ({ name: e.name, id: e.id })
      );
    }
    
    return "This is code.ts";
  },
};
