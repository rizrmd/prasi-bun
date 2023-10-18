import { apiContext } from "service-srv";

export const _ = {
  url: "/_web/comp/:id",
  async api(id: string) {
    const { req, res } = apiContext(this);
    return await db.component.findFirst({ where: { id } });
  },
};
