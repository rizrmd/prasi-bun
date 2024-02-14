import { apiContext } from "service-srv";

export const _ = {
  url: "/comp-import",
  async api(arg: { site_id: string; comps: string[] }) {
    const { req, res } = apiContext(this);

    if (arg.comps.length === 0) {
      return {
        status: "failed",
      };
    }

    const comps = await _db.component.findMany({
      where: {
        id: { in: arg.comps },
      },
      select: {
        name: true,
        content_tree: true,
        component_group: {
          select: { name: true },
        },
      },
    });

    const comp_groups = {} as Record<string, string>;
    for (const comp of comps) {
      if (comp.component_group?.name)
        comp_groups[comp.component_group?.name] = "-";
    }

    (
      await _db.component_site.findMany({
        where: { id_site: arg.site_id },
        select: {
          component_group: { select: { id: true, name: true } },
        },
      })
    )?.forEach((v) => {
      if (v.component_group) {
        if (comp_groups[v.component_group.name] === "-") {
          comp_groups[v.component_group.name] = v.component_group.id;
        }
      }
    });

    for (const [k, v] of Object.entries(comp_groups)) {
      if (v === "-") {
        const new_cg = await _db.component_group.create({
          data: {
            name: v,
            component_site: { create: { id_site: arg.site_id } },
          },
        });
        if (new_cg) {
          comp_groups[k] = new_cg.id;
        }
      }
    }

    for (const comp of comps) {
      if (comp.component_group && comp_groups[comp.component_group.name]) {
        await _db.component.create({
          data: {
            name: comp.name,
            content_tree: comp.content_tree as any,
            component_group: {
              connect: { id: comp_groups[comp.component_group.name] },
            },
          },
        });
      }
    }

    return { status: "ok" };
  },
};
