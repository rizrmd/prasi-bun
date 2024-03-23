import { deepClone } from "web-utils";
import { IContent } from "../../../../../../../utils/types/general";
import { getMetaById } from "../../../../../logic/active/get-meta";
import { PG } from "../../../../../logic/ed-global";
import { treeRebuild } from "../../../../../logic/tree/build";

export const edActionCut = async (p: PG, item: IContent) => {
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
        if (child && Object.keys(child).length === 1) {
          const meta = p.page.meta[child.id];
          if (meta) {
            const new_child = deepClone(meta.item);
            item.childs[key as any] = new_child;
            walk(new_child);
          }
        }
      }
    }
  };
  walk(new_item);

  let str = `prasi-clipboard:` + JSON.stringify(item);
  navigator.clipboard.writeText(str);

  const mitem = getMetaById(p, item.id)?.mitem;
  if (mitem) {
    mitem.parent.forEach((e, k) => {
      if (e == mitem) {
        mitem.parent.delete(k);
      }
    });
    await treeRebuild(p);
  }
};
