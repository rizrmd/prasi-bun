import { MItem } from "../../../../utils/types/item";
import { evalPropVis } from "./comp/eval-prop-vis";
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
  const mitem = arg.mitem as MItem | undefined;
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
      let mref_ids = r?.mref_ids || mitem?.get("component")?.get("ref_ids");

      if (!mref_ids && mitem) {
        mitem.get("component")?.set("ref_ids", new Y.Map() as any);
        mref_ids = mitem.get("component")?.get("ref_ids");
      }

      instantiate(item, pcomp.comp, ref_ids, mref_ids);

      const meta: IMeta = {
        item: simplifyItemChild(item),
        mitem,
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
              type: {
                "": "text",
                "content-element": "jsx",
                option: "opt",
                text: "text",
              }[prop.meta?.type || ""] as any,
              visible: false,
            };
          }
          props[name] = { value: prop.valueBuilt, visible: prop.visible };
          const comp_id = item.component?.id;
          if (
            prop.meta?.type === "content-element" &&
            prop.content &&
            comp_id
          ) {
            genMeta(p, {
              item: prop.content,
              mitem: mprop?.get("content"),
              is_root: false,
              jsx_prop: {
                is_root: true,
                comp_id,
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
            meta.scope.def.props[k].visible = v === false;
          }
        }
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

      if (p.on?.visit) {
        p.on.visit(meta);
      }

      for (const [k, v] of Object.entries(item.childs)) {
        const mchild = mitem?.get("childs")?.get(k as unknown as number);
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
