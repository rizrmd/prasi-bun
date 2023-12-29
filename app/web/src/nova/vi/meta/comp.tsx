import { GenMetaArg, GenMetaP, IMeta } from "../utils/types";
import { instantiate } from "./comp/instantiate";
import { walkProp } from "./comp/walk-prop";
import { genMeta } from "./meta";
import { simplifyItemChild } from "./simplify";

export const genComp = (p: GenMetaP, arg: GenMetaArg) => {
  const { item } = arg;
  if (item.type === "item" && item.component?.id && arg.parent?.item.id) {
    let item_comp = p.comps[item.component.id];
    if (p.on?.visit_component) {
      p.on.visit_component(item);
    }

    if (!item_comp) {
      return;
    }

    if (item_comp) {
      let instances: undefined | typeof item.component.instances = undefined;
      if (p.mode === "page") {
        instances = item.component.instances;
      } else {
        instances = arg.parent?.root_instances;
      }

      if (instances) {
        let instance = instances[item.id];

        if (!instances[item.id]) {
          instances[item.id] = {};
          instance = instances[item.id];
        }

        instantiate({
          item,
          item_comp: item_comp,
          ids: instance,
        });
      }

      const meta: IMeta = {
        item: simplifyItemChild(item),
        parent: {
          id: arg.parent.item.id,
          comp_id: arg.parent?.comp?.component?.id,
          instance_id: arg.parent?.instance_id,
        },
      };

      if (item.id) {
        if (p.set_meta !== false) {
          p.meta[item.id] = meta;
        }
      }

      if (p.on?.visit) {
        p.on.visit(meta, item);
      }

      for (const child of Object.values(item.childs)) {
        if (child.name.startsWith("jsx:")) continue;

        genMeta(
          { ...p, mode: "comp" },
          {
            item: child,
            is_root: false,
            parent: {
              item,
              instance_id: item.id,
              root_instances: instances,
              comp: item_comp,
            },
          }
        );
      } 

      walkProp({
        item,
        item_comp: item_comp,
        instance: instances ? instances[item.id] : {},
        each(name, prop) {
          const comp_id = item.component?.id;

          if (prop.meta?.type === "content-element" && comp_id) {
            if (prop.content) {
              genMeta(
                { ...p },
                {
                  item: prop.content,
                  is_root: false,
                  jsx_prop: {
                    is_root: true,
                    comp_id,
                    name,
                  },
                  parent: {
                    item: meta.item,
                    instance_id: item.id,
                    comp: item_comp,
                    root_instances: instances,
                  },
                }
              );
            }
          }
        },
      });
    }
  }
};
