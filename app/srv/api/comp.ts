import { apiContext } from "../../../pkgs/core/server/api/api-ctx";

export const _ = {
  url: "/_web/comp/:id",
  async api(id: string) {
    const { req, res } = apiContext(this);
    return await _db.component.findFirst({ where: { id } });
  },
};
