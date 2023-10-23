import { IContent } from "../../../../../../../utils/types/general";
import { PG } from "../../../../../logic/ed-global";
import { treeRebuild } from "../../../../../logic/tree/build";

export const edActionCut = async (p: PG, item: IContent) => {
  const perm = await navigator.permissions.query({
    name: "clipboard-read",
    allowWithoutGesture: false,
  } as any);
  if (perm.state !== "granted") {
    await navigator.clipboard.read();
  }
  let str = `prasi-clipboard:` + JSON.stringify(item);
  navigator.clipboard.writeText(str);

  const mitem = p.page.meta[item.id].mitem;
  if (mitem) {
    mitem.parent.forEach((e, k) => {
      if (e == mitem) {
        mitem.parent.delete(k);
      }
    });
    await treeRebuild(p);
  }
};
