import { IItem } from "../../../../utils/types/item";
import { IMeta } from "../../utils/types";
import { PrasiEdit, PropVal } from "./item-dev";

export const prodItem = (
  metas: Record<string, IMeta>,
  item: IItem,
  page_id: string
) => {
  return {
    ...item,
    edit: {
      setChilds(childs) {},
      get childs() {
        if (item.component?.id) {
          const child = item.component?.props.child;
          if (child.content) {
            return [prodItem(metas, child.content, page_id)];
          }
          return [];
        }

        if (item.childs) {
          return item.childs
            .map((e) => {
              if (e) {
                const m = metas[e.id];
                if (m && m.item) return prodItem(metas, m.item, page_id);
              }
            })
            .filter((e) => e);
        }

        return [];
      },
      get props() {
        if (item.component?.props) {
          const result: Record<string, PropVal> = {};
          for (const [k, v] of Object.entries(item.component.props)) {
            if (v.content) {
              const content = item.component?.props?.[k]?.content;

              if (content) {
                result[k] = {
                  mode: "jsx",
                  value: prodItem(metas, content, page_id),
                };
              } else {
                result[k] = {
                  mode: "jsx",
                  value: null as any,
                };
              }
            } else {
              let vbuilt =
                typeof v.valueBuilt === "string"
                  ? (v.valueBuilt.trim() as string)
                  : "";
              if (vbuilt.endsWith(";\n")) {
                vbuilt = vbuilt.substring(0, vbuilt.length - ";\n".length);
              }
              if (vbuilt && vbuilt === v.value.trim()) {
                const fn = new Function(`return ${v.value}`);
                result[k] = { mode: "string", value: fn() };
              } else {
                result[k] = {
                  mode: "raw",
                  value: v.value,
                  valueBuilt: v.valueBuilt,
                };
              }
            }
          }
          return result;
        }
        return undefined;
      },
      async commit() {},
      get parent() {
        const meta = metas[item.id];
        if (meta && meta.parent?.id) {
          const parent = metas[meta.parent.id];
          return prodItem(metas, parent.item, page_id);
        }
        return null as any;
      },
      pending: [],
      setProp(name, value) {},
      setValue(name, value) {},
    } as PrasiEdit["edit"],
  };
};
