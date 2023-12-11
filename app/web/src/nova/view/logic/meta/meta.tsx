import { IItem, MItem } from "../../../../utils/types/item";
import { genComp } from "./comp";
import { applyRefIds } from "./ref-ids";
import { simplifyItem } from "./simplify";
import { GenMetaArg, GenMetaP, IMeta } from "./types";

export const genMeta = (p: GenMetaP, arg: GenMetaArg) => {
  let wrapper = (fn: any) => {
    fn();
  };

  if (arg.is_root && arg.mitem) {
    const transact = arg.mitem.doc?.transact;
    if (transact) {
      wrapper = transact;
    }
  }

  wrapper(() => {
    const { parent } = arg;
    const item = arg.item as IItem;
    const mitem = arg.mitem as MItem | undefined;

    const r = applyRefIds(item, mitem, parent, p.smeta);
    if (item.type === "item" && item.component?.id) {
      genComp(p, arg, r);
      return;
    }

    const meta: IMeta = {
      item: simplifyItem(item),
      parent: {
        id: arg.parent?.item.id || "root",
        instance_id: arg.parent?.instance?.id,
        comp_id: arg.parent?.comp?.id,
      },
      scope: {},
    };

    if (p.set_mitem !== false && mitem) {
      meta.mitem = mitem;
    }

    if (p.on?.visit) {
      p.on.visit(meta);
    }

    if (p.on) {
      if (p.on.item_exists && p.meta[item.id]) {
        p.on.item_exists({ old: p.meta[item.id], new: meta });
      } else if (p.on.item_new && !p.meta[item.id]) {
        p.on.item_new({ new: meta });
      }
    }
    if (item.id) {
      if (p.set_meta !== false) {
        p.meta[item.id] = meta;
      }
    }
    if (item.childs) {
      for (const [k, v] of Object.entries(item.childs)) {
        const mchild = mitem?.get("childs")?.get(k as unknown as number);
        genMeta(p, {
          item: v,
          mitem: mchild,
          is_root: false,
          parent: {
            item,
            mitem: mitem,
            comp: arg.parent?.comp,
            mcomp: arg.parent?.mcomp,
            instance: arg.parent?.instance,
            minstance: arg.parent?.minstance,
          },
        });
      }
    }
  });
};
