import { createId } from "@paralleldrive/cuid2";
import { IItem, MItem } from "../../../../utils/types/item";
import { FMCompDef, FNCompDef } from "../../../../utils/types/meta-fn";
import { genMeta } from "../../../vi/meta/meta";
import { IMeta, PG } from "../ed-global";
import { assignMitem } from "./assign-mitem";
import { pushTreeNode } from "./build/push-tree";

export const treeRebuild = async (p: PG, arg?: { note?: string }) => {
  const is_layout =
    p.site.layout &&
    p.site.layout.id === p.page.cur.id &&
    arg?.note === "load-layout page-init";

  for (const [k, v] of Object.entries(p.comp.list)) {
    if (!p.comp.loaded[k]) {
      const mcomp = v.doc.getMap("map").get("root");
      const icomp = mcomp?.toJSON() as IItem | undefined;
      if (icomp) {
        p.comp.loaded[k] = icomp;
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
          mode: "page",
          on: {
            async visit(m) {
              if (!is_layout) {
                if (m.parent?.instance_id !== m.parent?.id || m.jsx_prop) {
                  pushTreeNode(p, m, meta, p.page.tree);
                } else {
                }

                assignMitem({
                  p,
                  m,
                  root: item,
                  mitem,
                  meta,
                  new_prop_jsx(meta, mprops, prop_name, prop_val) {
                    transact.list.push(() => {
                      const map = new Y.Map();

                      if (prop_val.content) prop_val.content.id = createId();

                      syncronize(map, prop_val);
                      mprops.set(prop_name, map as any);
                    });
                  },
                });
              }
            },
          },
        },
        { item }
      );

      if (transact.list.length > 0) {
        p.page.doc?.transact(() => {
          for (const fn of transact.list) {
            fn();
          }
        });
      }
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

const transact = {
  list: [] as (() => void)[],
};
