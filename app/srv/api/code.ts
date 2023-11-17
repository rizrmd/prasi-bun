import { apiContext } from "service-srv";

export const _ = {
  url: "/code/:site_id/:action",
  async api(site_id: string, action: "list") {
    const { req, res } = apiContext(this);

    if (action === "list") {
      let list = await db.code.findMany({ where: { id_site: site_id } });

      if (!list.find((e) => e.name === "site")) {
        list.push(
          await db.code.create({
            data: {
              id_site: site_id,
              name: "site",
            },
          })
        );
      }

      if (!list.find((e) => e.name === "SSR")) {
        list.push(
          await db.code.create({
            data: {
              id_site: site_id,
              name: "SSR",
            },
          })
        );
      }

      return list.map((e) => ({ name: e.name, id: e.id }));
    }

    return "This is code.ts";
  },
};
