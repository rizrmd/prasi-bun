import { IItem, MItem } from "../../../../utils/types/item";
import { genMeta } from "../../../view/logic/meta/meta";
import { PG, active } from "../ed-global";
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
        p.comp.loaded[k] = {
          comp: icomp,
        };
      }
    }
  }

  const mroot = p.page.doc?.getMap("map").get("root");
  const mitems: MItem[] = [];
  mroot?.get("childs")?.forEach((m) => mitems.push(m));

  const meta = {};
  p.page.tree = [];
  for (const mitem of mitems) {
    const item = mitem.toJSON() as IItem;
    if (item) {
      p.page;
      genMeta(
        {
          comps: p.comp.loaded,
          meta,
          smeta: p.page.smeta,
          on: {
            async visit(m) {
              if (!is_layout) {
                pushTreeNode(p, m, meta);

                // if (meta.item.component?.props) {
                //   viEvalProps({ meta: p.page.meta, tick: 0 }, meta);
                // }

                // if (meta.item.adv?.jsBuilt) {
                //   viEvalScript({ meta: p.page.meta, tick: 0 }, meta);
                // }
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
        if (v.item.component?.id) {
          if (v.item.name === "content") {
            root_id = v.item.id;
            break;
          }
        }
      }

      p.page.root_id = root_id;

      if (p.site.layout && p.site.layout.id === p.page.cur.id) {
        p.page.meta = meta;
      } else {
        p.page.meta = { ...p.site.layout.meta, ...meta };
      }
    }
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
