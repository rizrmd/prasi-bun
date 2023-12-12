import { IItem } from "../../../../utils/types/item";
import { genComp } from "./comp";
import { simplifyItemChild } from "./simplify";
import { GenMetaArg, GenMetaP, IMeta } from "./types";

export const genMeta = (p: GenMetaP, arg: GenMetaArg) => {
  let wrapper = (fn: any) => {
    fn();
  };

  wrapper(() => {
    const item = arg.item as IItem;

    if (item.type === "item" && item.component?.id) {
      genComp(p, arg);
      return;
    }

    let scope: IMeta["scope"] = {};
    if (p.smeta) {
      if (p.smeta[item.id] && p.smeta[item.id].scope) {
        scope.def = p.smeta[item.id].scope;
      }
    }

    const meta: IMeta = {
      item: simplifyItemChild(item),
      jsx_prop: arg.jsx_prop,
      parent: {
        id: arg.parent?.item.id || "root",
        instance_id: arg.parent?.instance_id,
        comp_id: arg.parent?.comp?.id,
      },
      scope,
    };

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
      for (const [_, v] of Object.entries(item.childs)) {
        genMeta(p, {
          item: v,
          is_root: false,
          parent: {
            item,
            instance_id: arg.parent?.instance_id,
            comp: arg.parent?.comp,
          },
        });
      }
    }
  });
};
