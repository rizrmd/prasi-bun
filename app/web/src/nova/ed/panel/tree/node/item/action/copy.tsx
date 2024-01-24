import { deepClone } from "web-utils";
import { IContent } from "../../../../../../../utils/types/general";
import { PG } from "../../../../../logic/ed-global";

export const edActionCopy = async (p: PG, item: IContent) => {
  const perm = await navigator.permissions.query({
    name: "clipboard-read",
    allowWithoutGesture: false,
  } as any);

  const new_item = deepClone(item);

  const walk = (item: IContent) => {
    if (item.type !== "text") {
      for (const [key, child] of Object.entries(item.childs)) {
        if (child && Object.keys(child).length === 1) {
          const meta = p.page.meta[child.id];
          if (meta) {
            const new_child = deepClone(meta.item);
            item.childs[key as any] = new_child;
            walk(new_child);

            if (new_child.component?.props) {
              for (const [k, v] of Object.entries(new_child.component.props)) {
                if (v.meta?.type === "content-element" && v.content) {
                  walk(v.content);
                }
              }
            }
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
