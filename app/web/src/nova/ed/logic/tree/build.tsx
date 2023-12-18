import { IItem, MItem } from "../../../../utils/types/item";
import { genMeta } from "../../../vi/meta/meta";
import { IMeta, PG, active } from "../ed-global";
import { pushTreeNode } from "./build/push-tree";

export const treeRebuild = async (p: PG, arg?: { note?: string }) => {
  if (p.page.prevent_rebuild) return;

  const is_layout =
    p.site.layout &&
    p.site.layout.id === p.page.cur.id &&
    arg?.note === "load-layout page-init";

  for (const [k, v] of Object.entries(p.comp.list)) {
    if (!p.comp.loaded[k]) {
      const mcomp = v.doc.getMap("map").get("root");
      const icomp = mcomp?.toJSON() as IItem | undefined;
      if (icomp) {
        p.comp.loaded[k] = {
          comp: icomp,
        };
      }
    }
  }

  const mroot = p.page.doc?.getMap("map").get("root");
  const mitems: MItem[] = [];
  mroot?.get("childs")?.forEach((m) => mitems.push(m));

  const meta: Record<string, IMeta> = {};
  p.page.tree = [];

  for (const mitem of mitems) {
    const item = mitem.toJSON() as IItem;
    if (item) {
      genMeta(
        {
          note: "tree-rebuild",
          comps: p.comp.loaded,
          meta,
          smeta: p.page.smeta,
          on: {
            async visit(m) {
              if (!is_layout) {
                pushTreeNode(p, m, meta, p.page.tree);

                if (m.parent) {
                  if (m.parent.id === "root") {
                    if (m.item.id === item.id) {
                      m.mitem = mitem;
                    }
                  } else {
                    const parent = meta[m.parent.id];

                    if (parent.mitem) {
                      parent.mitem.get("childs")?.forEach((child) => {
                        if (child.get("id") === m.item.id) {
                          m.mitem = child;
                        }
                      });
                    }
                  }
                }
              }
            },
          },
        },
        { item }
      );
    }
  }

  if (is_layout) {
    p.site.layout.meta = meta;
  } else {
    let root_id = "root";
    if (p.site.layout && p.site.layout.meta) {
      for (const [_, v] of Object.entries(p.site.layout.meta)) {
        if (v.item.name === "content") {
          root_id = v.item.id;
          break;
        }
      }

      p.page.root_id = root_id;
    }

    if (p.site.layout && p.site.layout.id === p.page.cur.id) {
      p.page.meta = meta;
    } else {
      if (root_id !== "root") {
        for (const m of Object.values(meta)) {
          if (m.parent?.id === "root") {
            m.parent.id = root_id;
          }
        }
        p.page.meta = { ...p.site.layout.meta, ...meta };
      } else {
        p.page.meta = meta;
      }
    }
  }
};

