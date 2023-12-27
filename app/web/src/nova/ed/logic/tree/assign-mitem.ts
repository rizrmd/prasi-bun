import { IItem, MItem } from "../../../../utils/types/item";
import { IMeta, PG } from "../ed-global";

export const assignMitem = (arg: {
  p: PG;
  m: IMeta;
  item: IItem;
  mitem: MItem;
  meta: Record<string, IMeta>;
}) => {
  const { p, m, item, mitem, meta } = arg;

  if (m.parent) {
    if (m.parent.id === "root") {
      if (m.item.id === item.id) {
        m.mitem = mitem;
      }
    } else {
      const parent = meta[m.parent.id];
      if (parent.mitem) {
        parent.mitem.get("childs")?.forEach((child) => {
          if (child.get("id") === m.item.id) {
            m.mitem = child;

            if (m.item.component?.props) {
              for (const [prop_name, v] of Object.entries(
                m.item.component.props
              )) {
                const mprop = m.mitem
                  ?.get("component")
                  ?.get("props")
                  ?.get(prop_name);
                if (v.content && mprop) {
                  const pmeta = meta[v.content.id];
                  if (pmeta) {
                    pmeta.mitem = mprop.get("content");
                  }
                }
              }
            }
          }
        });
      }
    }
  }

  if (m.jsx_prop && m.parent?.instance_id) {
    const parent = meta[m.parent?.instance_id];
    if (parent) {
      const prop = parent.item.component?.props[m.jsx_prop.name];
      if (prop) {
        prop.content = m.item;
      }
    }
  }

  if (m.parent?.instance_id && m.parent?.instance_id === m.parent?.id) {
    const parent = meta[m.parent?.instance_id];
    if (parent.item.component?.id) {
      const lcomp = p.comp.list[parent.item.component.id];
      if (lcomp) {
        const mcomp = lcomp.doc.getMap("map").get("root");
        if (mcomp) {
          mcomp.get("childs")?.forEach((e) => {
            if (e.get("id") === m.item.originalId) {
              m.mitem = e;
            }
          });
        }
      }
    }
  }
};
