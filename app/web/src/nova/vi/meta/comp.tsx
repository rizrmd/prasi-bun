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
      p.on.visit_component(item, arg.root || arg.item);
    }

    if (!item_comp) {
      return;
    }

    if (item_comp) {
      let instances: undefined | typeof item.component.instances = undefined;

      if (p.mode === "page") {
        if (!item.component.instances) {
          item.component.instances = {};
        }
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
        jsx_prop: arg.jsx_prop,
        parent: {
          id: arg.parent.item.id,
          comp_id: arg.parent?.comp?.component?.id,
          instance_id: arg.parent?.instance_id,
        },
        instances,
      };

      if (p.on?.visit) {
        p.on.visit(meta, item, arg.root || arg.item);
      }

      if (item.id) {
        if (p.set_meta !== false) {
          p.meta[item.id] = meta;
        }
      }

      walkProp({
        item,
        item_comp: item_comp,
        instance: instances ? instances[item.id] : {},
        each(name, prop) {
          const comp_id = item.component?.id;

          if (prop.meta?.type === "content-element" && comp_id) {
            if (prop.content) {
              prop.content.name = name;

              genMeta(
                { ...p },
                {
                  item: prop.content,
                  root: arg.root || prop.content,
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

      if (item.childs) {
        for (const child of Object.values(item.childs)) {
          if (child?.name?.startsWith("jsx:")) continue;

          if (child && Object.keys(child).length > 3) {
            genMeta(
              { ...p, mode: "comp" },
              {
                item: child,
                is_root: false,
                root: arg.root || arg.item,
                parent: {
                  item,
                  instance_id: item.id,
                  root_instances: instances,
                  comp: item_comp,
                },
              }
            );
          }
        }
      }
    }
  }
};
