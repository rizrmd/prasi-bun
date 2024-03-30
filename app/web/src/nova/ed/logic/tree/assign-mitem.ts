import { createId } from "@paralleldrive/cuid2";
import { TypedMap } from "yjs-types";
import { IItem, MItem } from "../../../../utils/types/item";
import { FMCompDef, FNCompDef } from "../../../../utils/types/meta-fn";
import { IMeta } from "../ed-global";

export const assignMitem = (arg: {
  m: IMeta;
  root: IItem;
  mitem: MItem;
  meta: Record<string, IMeta>;
  new_prop_jsx: (
    meta: IMeta,
    mprop: TypedMap<Record<string, FMCompDef>>,
    prop_name: string,
    prop_val: FNCompDef
  ) => void;
}) => {
  const { m, root, mitem, meta } = arg;

  if (m.jsx_prop && m.parent?.instance_id) {
    const instance_meta = meta[m.parent?.instance_id];
    if (instance_meta) {
      if (m.jsx_prop.is_root) {
        const prop = instance_meta.item.component?.props[m.jsx_prop.name];
        if (prop) {
          prop.content = m.item;
        }
      }
    }
  }

  if (m.parent) {
    if (m.parent.id === "root") {
      if (m.item.id === root.id) {
        m.mitem = mitem;
      }
    } else {
      let parent = meta[m.parent.id];

      if (!parent.mitem && m.parent.instance_id && meta[m.parent.instance_id]) {
        parent = meta[m.parent.instance_id];
      }

      if (parent.mitem) {
        if (m.jsx_prop?.is_root === true) {
          const mprops = parent.mitem.get("component")?.get("props");
          if (mprops) {
            const mprop = mprops.get(m.jsx_prop.name);
            if (mprop) {
              const mcontent = mprop.get("content");

              if (!mcontent) {
                const map = new Y.Map();
                syncronize(map, {
                  id: createId(),
                  name: m.jsx_prop.name,
                  type: "item",
                  dim: { w: "full", h: "full" },
                  childs: [],
                  adv: {
                    css: "",
                  },
                });
                mprop.set("content", map as any);
              }

              if (mcontent) {
                m.mitem = mcontent;
              }
            }
          }
        } else {
          parent.mitem.get("childs")?.forEach((child) => {
            const id = child && child.get && child.get("id");
            if (typeof id === "string" && id === m.item.id) {
              m.mitem = child;
            } 
          });
        }
      }

      if (m.item.component?.props) {
        for (const [prop_name, v] of Object.entries(m.item.component.props)) {
          let mprop = m.mitem?.get("component")?.get("props")?.get(prop_name);
          if (!mprop) {
            const mprops = m.mitem?.get("component")?.get("props");
            if (mprops) {
              arg.new_prop_jsx(m, mprops, prop_name, v);
            }
          }

          if (v.content) {
            if (mprop) {
              const pmeta = meta[v.content.id];

              if (pmeta) {
                pmeta.mitem = mprop.get("content");
              }
            } else {
              const mprops = m.mitem?.get("component")?.get("props");
              if (mprops) {
                arg.new_prop_jsx(m, mprops, prop_name, v);
              }
            }
          }
        }
      }
    }
  }
};
