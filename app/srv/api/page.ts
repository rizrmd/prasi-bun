import { apiContext } from "service-srv";

export const _ = {
  url: "/_web/page/:id",
  async api(id: string) {
    const { req, res } = apiContext(this);
    return await db.page.findFirst({ where: { id } });
  },
};
