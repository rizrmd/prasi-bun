import { SAction } from "../actions";
import { SyncConnection } from "../type";

export const comp_group: SAction["comp"]["group"] = async function (
  this: SyncConnection,
  id_site
) {
  const result: Awaited<ReturnType<SAction["comp"]["group"]>> = {};
  const groups = await db.component_group.findMany({
    where: {
      component_site: {
        some: {
          id_site,
        },
      },
    },
    select: {
      name: true,
      id: true,
    },
  });

  for (const g of groups) {
    result[g.id] = {
      id: g.id,
      name: g.name,
      comps: [],
    };
  }
  return result;
};
