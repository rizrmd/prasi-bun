import { user } from "../entity/user";

export const loadDefaultSite = async (user_id: string) => {
  const conf = user.conf.get(user_id);
  if (conf) {
    if (!conf.site_id) {
      const site = await db.site.findFirst({
        where: {
          id_user: user_id,
          is_deleted: false,
        },
        select: { id: true },
      });
      if (site) {
        conf.site_id = site.id;
        user.conf.set(user_id, "site_id", site.id);
      }
    }

    if (conf.site_id && !conf.page_id) {
      const page = await db.page.findFirst({
        select: { id: true },
        where: {
          id_site: conf.site_id,
          is_deleted: false,
        },
      });

      if (page) {
        conf.page_id = page.id;
        user.conf.set(user_id, "page_id", page.id);
      }
    }
  }
  return conf;
};
