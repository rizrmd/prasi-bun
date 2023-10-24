import { validate } from "uuid";
import { user } from "../entity/user";

export const loadSitePage = async (
  user_id: string,
  site_id: string,
  page_id?: string
) => {
  if (validate(site_id)) {
    const site = await db.site.findFirst({
      where: { id: site_id },
      select: { id: true },
    });

    if (site) {
      await user.conf.set(user_id, "site_id", site_id);
    }

    let page = null;
    if (validate(page_id || "")) {
      page = await db.page.findFirst({
        where: { id: page_id, id_site: site_id, is_deleted: false },
        select: { id: true },
      });
    }
    if (!page) {
      page = await db.page.findFirst({
        where: { id_site: site_id, is_deleted: false },
        select: { id: true },
      });
    }
    if (page) {
      await user.conf.set(user_id, "page_id", page.id);
    }
  }
  return user.conf.get(user_id);
};
