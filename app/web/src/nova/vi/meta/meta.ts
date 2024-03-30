import { IItem } from "../../../utils/types/item";
import { GenMetaArg, GenMetaP, IMeta } from "../utils/types";
import { genComp } from "./comp";
import { simplifyItemChild } from "./simplify";

export const genMeta = (p: GenMetaP, arg: GenMetaArg) => {
  const item = arg.item as IItem;

  if (item.type === "item" && item.component?.id) {
    if (arg.ignore_first_component !== true) {
      genComp(p, arg);
      return;
    }
  }

  const meta: IMeta = {
    item: simplifyItemChild(item),
    parent: {
      id: arg.parent?.item.id || "root",
      instance_id: arg.parent?.instance_id,
      comp_id: arg.parent?.comp?.component?.id,
    },
  };

  if (arg.jsx_prop) {
    meta.jsx_prop = arg.jsx_prop;
  }

  if (p.on?.visit) {
    p.on.visit(meta, item, arg.root || arg.item);
  }

  if (item.id) {
    if (p.set_meta !== false) {
      p.meta[meta.item.id] = meta;
    }
  }

  if (item.childs) {
    for (const [_, v] of Object.entries(item.childs)) {
      if (v.id) {
        const carg: GenMetaArg = {
          item: v,
          is_root: false,
          root: arg.root || arg.item,
          parent: {
            item: meta.item,
            instance_id: arg.parent?.instance_id,
            comp: arg.parent?.comp,
            root_instances: arg.parent?.root_instances,
          },
        };
        if (arg.jsx_prop) {
          carg.jsx_prop = {
            ...arg.jsx_prop,
            is_root: false,
          };
        }
        genMeta(p, carg);
      }
    }
  }
};
