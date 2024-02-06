import { SyncConnection } from "../type";

export const site_group = async function (this: SyncConnection) {
  const res = _db.org.findMany({
    where: {
      org_user: { some: { id_user: this.user_id } },
    },
    select: {
      id: true,
      org_user: { select: { user: { select: { id: true, username: true } } } },
      name: true,
      site: {
        select: {
          id: true,
          name: true,
          domain: true,
          responsive: true,
        },
        where: {
          is_deleted: false,
        },
      },
    },
  });

  return res;
};
