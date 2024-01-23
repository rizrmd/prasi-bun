import { SAction } from "../actions";
import { SyncConnection } from "../type";

export const comp_group: SAction["comp"]["group"] = async function (
  this: SyncConnection,
  id_site
) {
  const result: Awaited<ReturnType<SAction["comp"]["group"]>> = {};
  let groups = await db.component_group.findMany({
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

  if (groups.length === 0) {
    await db.component_group.create({
      data: {
        name: "All",
        component_site: {
          create: {
            id_site,
            is_owner: true,
          },
        },
      },
    });

    await db.component_group.create({
      data: {
        name: "__TRASH__",
        component_site: {
          create: {
            id_site,
            is_owner: true,
          },
        },
      },
    });
    
    groups = await db.component_group.findMany({
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
  }

  for (const g of groups) {
    result[g.id] = {
      id: g.id,
      name: g.name,
      comps: [],
    };
  }
  return result;
};
