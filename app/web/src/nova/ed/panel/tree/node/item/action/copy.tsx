import { deepClone } from "web-utils";
import { IContent } from "../../../../../../../utils/types/general";
import { PG } from "../../../../../logic/ed-global";
import { getMetaById } from "../../../../../logic/active/get-meta";

export const edActionCopy = async (p: PG, item: IContent) => {
  const perm = await navigator.permissions.query({
    name: "clipboard-read",
    allowWithoutGesture: false,
  } as any);

  const new_item = deepClone(item);
  const walk = (_item: IContent) => {
    let item = _item;


    if (item.type !== "text") {
      if (item.type === "item" && item.component?.props) {
        for (const [k, v] of Object.entries(item.component.props)) {
          if (v.content) {
            walk(v.content);
          }
        }
      }

      for (const [key, child] of Object.entries(item.childs)) {
        if (child && Object.keys(child).length <= 2) {
          const meta = p.page.meta[child.id];
          if (meta) {
            console.log(meta.item);
            const new_child = deepClone(meta.item);
            item.childs[key as any] = new_child;
            walk(new_child);
          }
        }
      }
    }
  };

  walk(new_item);

  if (perm.state !== "granted") {
    await navigator.clipboard.read();
  }
  let str = `prasi-clipboard:` + JSON.stringify(new_item);
  navigator.clipboard.writeText(str);
};
