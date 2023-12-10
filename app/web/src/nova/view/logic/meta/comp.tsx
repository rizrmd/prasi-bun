import { MItem } from "../../../../utils/types/item";
import { evalPropVis } from "./comp/eval-prop-vis";
import { instantiate } from "./comp/instantiate";
import { walkProp } from "./comp/walk-prop";
import { genMeta } from "./meta";
import { applyRefIds } from "./ref-ids";
import { simplify } from "./simplify";
import { GenMetaArg, GenMetaP, IMeta } from "./types";

export const genComp = (
  p: GenMetaP,
  arg: GenMetaArg,
  r: ReturnType<typeof applyRefIds>
) => {
  const { item } = arg;
  const mitem = arg.mitem as MItem;
  if (item.type === "item" && item.component?.id && arg.parent?.item.id) {
    let pcomp = p.comps[item.component.id];
    if (!pcomp && p.on.load_component) {
      p.on.load_component(item.component.id);
      return;
    }
    if (pcomp) {
      const ref_ids = r?.ref_ids || item.component?.ref_ids || {};
      let mref_ids = r?.mref_ids || mitem.get("component")?.get("ref_ids");

      if (!mref_ids && mitem) {
        mitem.get("component")?.set("ref_ids", new Y.Map() as any);
        mref_ids = mitem.get("component")?.get("ref_ids");
      }

      instantiate(item, pcomp.comp, ref_ids, mref_ids);

      const meta: IMeta = {
        item: simplify(item),
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

      const props = {} as Record<string, { value: any; visible?: string }>;

      walkProp({
        item,
        mitem: mitem,
        pcomp,
        each(name, prop, mprop) {
          if (meta.scope.def?.props) {
            meta.scope.def.props[name] = {
              value: prop.valueBuilt,
              visible: true,
            };
          }
          props[name] = { value: prop.valueBuilt, visible: prop.visible };
          if (prop.meta?.type === "content-element" && prop.content) {
            genMeta(p, {
              item: prop.content,
              mitem: mprop?.get("content"),
              is_root: false,
              jsx_prop: {
                is_root: true,
                name,
              },
              parent: {
                item,
                mitem: mitem,
                comp: pcomp.comp,
                mcomp: pcomp.mcomp,
                instance: arg.parent?.instance || item,
                minstance: arg.parent?.minstance || mitem,
              },
            });
          }
        },
      });

      const vis = evalPropVis(props);
      if (vis && meta.scope.def?.props) {
        for (const [k, v] of Object.entries(vis)) {
          if (meta.scope.def.props[k]) {
            meta.scope.def.props[k].visible = !!v;
          }
        }
      }

      p.meta[item.id] = meta;

      if (p.on.visit) {
        p.on.visit(meta);
      }

      for (const [k, v] of Object.entries(item.childs)) {
        const mchild = mitem.get("childs")?.get(k as unknown as number);
        genMeta(p, {
          item: v,
          mitem: mchild,
          is_root: false,
          parent: {
            item,
            mitem: mitem,
            comp: pcomp.comp,
            mcomp: pcomp.mcomp,
            instance: arg.parent?.instance || item,
            minstance: arg.parent?.minstance || mitem,
          },
        });
      }
    }
  }
};
