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
                if (m.parent?.instance_id !== m.parent?.id) {
                  pushTreeNode(p, m, meta, p.page.tree);
                }

                assignMitem({ m, item, mitem, meta });
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
  propContentFromItem: (
    meta: IMeta,
    mitem: MItem,
    name: string,
    prop: FNCompDef
  ) => {
    transact.list.push(() => {
      const mprops = mitem?.get("component")?.get("props");

      if (mprops) {
        const map = new Y.Map();
        syncronize(map, prop);
        mprops.set(name, map as any);
        console.log(mprops.get(name));
        const mcontent = mprops.get(name)?.get("content");
        console.log(mcontent);
      }
    });
  },
  jsxContentFromItem(meta: IMeta, content: IItem, mprop: FMCompDef) {
    transact.list.push(() => {
      const map = new Y.Map();
      syncronize(map, content);
      mprop.set("content", map as any);
      meta.mitem = mprop.get("content");
    });
  },
};
