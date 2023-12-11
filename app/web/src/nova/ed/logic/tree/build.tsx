import { deepClone } from "web-utils";
import { IItem, MItem } from "../../../../utils/types/item";
import { genMeta } from "../../../view/logic/meta/meta";
import { PG, active } from "../ed-global";

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
          mcomp,
        };
      }
    }
  }

  const mroot = p.page.doc?.getMap("map").get("root");
  const mitems: MItem[] = [];
  mroot?.get("childs")?.forEach((m) => mitems.push(m));

  const meta = {};
  for (const mitem of mitems) {
    const item = mitem.toJSON() as IItem;
    if (item) {
      genMeta(
        {
          comps: p.comp.loaded,
          meta,
          on: !is_layout
            ? {
                visit(meta) {
                },
              }
            : undefined,
        },
        { item, mitem }
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
