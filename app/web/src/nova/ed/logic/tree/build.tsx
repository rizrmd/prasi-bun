import { EdMeta, PG } from "../ed-global";
import {
  component,
  loadComponent,
  syncWalkLoad,
  syncWalkMap,
} from "./sync-walk";

export const compLoaded = new Set<string>();

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

    const portal = {
      in: {} as Record<string, EdMeta>,
      out: {} as Record<string, EdMeta>,
    };

    p.page.root_id = "root";
    if (p.site.layout && p.site.layout.id !== p.page.cur.id) {
      const ldoc = p.page.list[p.site.layout.id];
      if (ldoc) {
        const lroot = ldoc.doc.getMap("map").get("root");
        if (lroot) {
          const sections = lroot.get("childs");
          if (sections) {
            const loaded = new Set<string>();
            await Promise.all(
              sections.map((e) => {
                return syncWalkLoad(p, e, loaded, (id) => {
                  return loadComponent(p, id, loaded);
                });
              })
            );

            if (component.pending) await component.pending;

            sections.map((e) => {
              if (p.page.root_id === "root") {
                p.page.entry.push(e.get("id"));
              }
              syncWalkMap(
                {
                  comps: p.comp.list,
                  item_loading: p.ui.tree.item_loading,
                  meta: p.page.meta,
                },
                {
                  is_layout: true,
                  mitem: e,
                  parent_item: { id: p.page.root_id },
                  tree_root_id: p.page.root_id,
                  skip_add_tree: true,
                  portal,
                  each(meta) {
                    if (meta.item.name === "content") {
                      p.page.root_id = meta.item.id;
                    }
                  },
                }
              );
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

          // if p.page.root_id is root, it means content is not found.
          // if content is not found, do not use layout.
          if (p.page.root_id === "root") {
            p.page.entry = [];
            p.page.tree = [];
            p.page.meta = {};
          }
        }
      }
    }

    const sections = root.get("childs");
    if (sections) {
      await Promise.all(
        sections.map((e) => {
          return syncWalkLoad(p, e, compLoaded, (id) => {
            return loadComponent(p, id, compLoaded);
          });
        })
      );

      if (component.pending) await component.pending;
    }

    doc.transact(async () => {
      const sections = root.get("childs");
      if (sections) {
        sections.map((e) => {
          if (p.page.root_id === "root") {
            p.page.entry.push(e.get("id"));
          } else {
            const meta = p.page.meta[p.page.root_id];
            if (meta && meta.item.type === "item") {
              meta.item.childs.push({ id: e.get("id") } as any);
            }
          }
          syncWalkMap(
            {
              comps: p.comp.list,
              item_loading: p.ui.tree.item_loading,
              meta: p.page.meta,
              tree: p.page.tree,
            },
            {
              is_layout: false,
              mitem: e,
              parent_item: { id: p.page.root_id },
              tree_root_id: p.page.root_id,
              portal,
            }
          );
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
