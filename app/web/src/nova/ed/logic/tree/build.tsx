import { waitUntil } from "web-utils";
import { EdMeta, PG, active } from "../ed-global";
import {
  loadComponent,
  loadcomp,
  syncWalkLoad,
  syncWalkMap,
} from "./sync-walk";

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
            sections.map((e) => {
              return syncWalkLoad(p, e, (id) => {
                return loadComponent(p, id);
              });
            });

            if (loadcomp.pending.size > 0) {
              await waitUntil(() => {
                return loadcomp.pending.size === 0;
              });
            }

            sections.map((e) => {
              if (p.page.root_id === "root") {
                p.page.entry.push(e.get("id"));
              }
              syncWalkMap(
                {
                  note: "tree-rebuild layout",
                  comps: p.comp.list,
                  item_loading: p.ui.tree.item_loading,
                  meta: p.page.meta,
                  scope: p.page.scope,
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
      sections.map((e) => {
        return syncWalkLoad(p, e, (id) => {
          return loadComponent(p, id);
        });
      });

      if (loadcomp.pending.size > 0) {
        await waitUntil(() => {
          return loadcomp.pending.size === 0;
        });
      }
    }

    doc.transact(() => {
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
              note: "tree-rebuild doc",
              comps: p.comp.list,
              item_loading: p.ui.tree.item_loading,
              meta: p.page.meta,
              tree: p.page.tree,
              scope: p.page.scope,
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

export const getMRoot = (p: PG) => {
  const root = p.page.doc?.getMap("map").get("root");
  if (root) {
    return p.page.root_id === "root"
      ? root
      : p.page.meta[p.page.root_id].mitem?.get("childs")?.get(0);
  }
};

export const getMetaById = (p: PG, id: string) => {
  if (active.comp_id) {
    if (p.comp.list[active.comp_id])
      return p.comp.list[active.comp_id].meta[id];
  } else {
    return p.page.meta[id];
  }
};
