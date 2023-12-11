import { instantiate } from "./comp/instantiate";
import { walkProp } from "./comp/walk-prop";
import { genMeta } from "./meta";
import { applyRefIds } from "./ref-ids";
import { simplifyItemChild } from "./simplify";
import { GenMetaArg, GenMetaP, IMeta } from "./types";

export const genComp = (
  p: GenMetaP,
  arg: GenMetaArg,
  r: ReturnType<typeof applyRefIds>
) => {
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
      const ref_ids = r?.ref_ids || item.component?.ref_ids || {};

      instantiate(item, pcomp.comp, ref_ids);

      const meta: IMeta = {
        item: simplifyItemChild(item),
        parent: {
          id: arg.parent.item.id,
          instance_id: arg.parent?.instance?.id,
          comp_id: arg.parent?.comp?.id,
        },
        scope: {
          def: {
            props: {},
          },
        },
      };

      walkProp({
        item,
        pcomp,
        each(name, prop) {
          if (meta.scope.def?.props) {
            meta.scope.def.props[name] = {
              value: prop.valueBuilt,
              visible: false,
            };
          }
          const comp_id = item.component?.id;
          if (
            prop.meta?.type === "content-element" &&
            prop.content &&
            comp_id
          ) {
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
                comp: pcomp.comp,
                instance: arg.parent?.instance || item,
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

      if (item.id) {
        if (p.set_meta !== false) {
          p.meta[item.id] = meta;
        }
      }

      if (p.on?.visit) {
        p.on.visit(meta);
      }

      for (const [k, v] of Object.entries(item.childs)) {
        genMeta(p, {
          item: v,
          is_root: false,
          parent: {
            item,
            comp: pcomp.comp,
            instance: arg.parent?.instance || item,
          },
        });
      }
    }
  }
};
