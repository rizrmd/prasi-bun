import { instantiate, walkChild } from "./comp/instantiate";
import { walkProp } from "./comp/walk-prop";
import { genMeta } from "./meta";
import { simplifyItemChild } from "./simplify";
import { GenMetaArg, GenMetaP, IMeta } from "./types";

export const genComp = (p: GenMetaP, arg: GenMetaArg) => {
  const { item } = arg;
  if (item.type === "item" && item.component?.id && arg.parent?.item.id) {
    let pcomp = p.comps[item.component.id];
    if (p.on?.visit_component) {
      p.on.visit_component(item.component.id);
    }

    if (!pcomp) {
      return;
    }

    if (pcomp) {
      let smeta_instances: IMeta["instances"] = undefined;
      if (p.smeta && p.smeta[item.id]) {
        const smeta = p.smeta[item.id];
        if (smeta && smeta.comp) {
          smeta_instances = smeta.comp.instances;
        }
      }

      let instance = {};
      let instances: IMeta["instances"] = undefined;

      if (!smeta_instances) {
        const parent_instance = getParentInstance(p, arg, item.id);
        instance = parent_instance || {};
        instances = !parent_instance ? { [item.id]: instance } : undefined;
      } else {
        instance = smeta_instances[item.id];
        instances = smeta_instances;
      }

      instantiate({
        item,
        comp: pcomp.comp,
        ids: instance,
      });

      const meta: IMeta = {
        item: simplifyItemChild(item),
        parent: {
          id: arg.parent.item.id,
          comp_id: arg.parent?.comp?.id,
        },
        instances,
        scope: {},
      };

      if (item.id) {
        if (p.set_meta !== false) {
          p.meta[item.id] = meta;
        }
      }

      walkProp({
        item,
        pcomp,
        each(name, prop) {
          const comp_id = item.component?.id;
          if (
            prop.meta?.type === "content-element" &&
            prop.content &&
            comp_id
          ) {
            walkChild(prop.content, instance);

            genMeta(p, {
              item: prop.content,
              is_root: false,
              jsx_prop: {
                is_root: true,
                comp_id,
                name,
              },
              parent: {
                item,
                instance_id: item.id,
                comp: pcomp.comp,
              },
            });
          }
        },
      });

      if (p.on) {
        if (p.on.item_exists && p.meta[item.id]) {
          p.on.item_exists({ old: p.meta[item.id], new: meta });
        } else if (p.on.item_new && !p.meta[item.id]) {
          p.on.item_new({ new: meta });
        }
      }

      if (p.on?.visit) {
        p.on.visit(meta);
      }

      for (const child of Object.values(item.childs)) {
        if (child.name.startsWith('jsx:')) continue;
        genMeta(p, {
          item: child,
          is_root: false,
          parent: {
            item,
            instance_id: item.id,
            comp: pcomp.comp,
          },
        });
      }
    }
  }
};

const getParentInstance = (p: GenMetaP, arg: GenMetaArg, id: string) => {
  if (arg.parent?.instance_id && p.meta[arg.parent?.instance_id]) {
    const parent_instance = p.meta[arg.parent?.instance_id];
    if (parent_instance.instances) {
      if (!parent_instance.instances[id]) {
        parent_instance.instances[id] = {};
      }

      return parent_instance.instances[id];
    }
  }
};
