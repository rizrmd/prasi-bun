import { EdMeta, PG } from "../ed-global";
import { walkLoad, walkMap } from "./load-walk";
import { loadComponent, syncWalkLoad, syncWalkMap } from "./sync-walk";

export const treeRebuild = async (p: PG, arg?: { note?: string }) => {
  const doc = p.page.doc;
  if (!doc) return;

  const root = doc.getMap("map").get("root");
  if (root) {
    p.page.building = true;
    p.render();

    p.page.entry = [];
    p.page.tree = [];
    p.page.meta = {};

    const sections = root.get("childs");
    if (sections) {
      const loaded = new Set<string>();
      await Promise.all(
        sections.map((e) => {
          return syncWalkLoad(p, e, loaded);
        })
      );
    }

    const portal = {
      in: {} as Record<string, EdMeta>,
      out: {} as Record<string, EdMeta>,
    };

    let root_id = "root";
    if (p.site.layout) {
      const loaded = new Set<string>();
      await Promise.all(
        p.site.layout.childs.map((e) =>
          walkLoad(p.comp, e, loaded, (id) => loadComponent(p, id))
        )
      );
      p.site.layout.childs.map((e) => {
        p.page.entry.push(e.id);
        walkMap(
          { meta: p.page.meta, comps: p.comp.map },
          {
            isLayout: true,
            item: e,
            parent_item: { id: "root" },
            portal,
            each(meta) {
              if (meta.item.name === "content") {
                root_id = meta.item.id;
              }
            },
          }
        );
      });

      // if root_id is root, it means content is not found.
      // if content is not found, do not use layout.
      if (root_id === "root") {
        p.page.entry = [];
        p.page.tree = [];
        p.page.meta = {};
      }
    }

    doc.transact(async () => {
      const sections = root.get("childs");
      if (sections) {
        sections.map((e) => {
          if (root_id === "root") {
            p.page.entry.push(e.get("id"));
          }
          syncWalkMap(p, {
            isLayout: false,
            mitem: e,
            parent_item: { id: root_id },
            tree_root_id: root_id,
            portal,
          });
        });

        for (const [k, portal_out] of Object.entries(portal.out)) {
          const name = k.replace(/⮕/gi, "").trim();
          const portal_in = portal.in[`⬅${name}`];
          if (portal_in) {
            for (const key of Object.keys(portal_in)) {
              delete (portal_in as any)[key];
            }
            for (const [k, v] of Object.entries(portal_out)) {
              (portal_in as any)[k] = v;
            }
          }
        }
      }
    });

    p.page.building = false;
    p.render();
    p.page.render();
  }
};
