import { IContent } from "../../../utils/types/general";
import { IItem } from "../../../utils/types/item";
import { ISection } from "../../../utils/types/section";
import { base } from "./base";
import { decompressBlob } from "./util";

export const scanComponent = async (items: IContent[]) => {
  const comp = base.comp;

  for (const item of items) {
    if (item && item.type !== "text") {
      scanSingle(item);
    }
  }

  if (comp.pending.size > 0) {
    try {
      const raw = await (
        await fetch(base.url`_prasi/comp`, {
          method: "POST",
          body: JSON.stringify({ ids: [...comp.pending] }),
        })
      ).blob();
      const res = JSON.parse(
        await (await decompressBlob(raw)).text()
      ) as Record<string, IItem>;
      for (const [id, item] of Object.entries(res)) {
        comp.pending.delete(id);
        comp.list[id] = item;
      }
      await scanComponent(Object.values(res));
    } catch (e) {}
  }
};

const scanSingle = (item: IItem | ISection) => {
  const comp = base.comp;
  if (item.type === "item") {
    const comp_id = item.component?.id;
    if (comp_id) {
      if (!comp.list[comp_id] && !comp.pending.has(comp_id)) {
        comp.pending.add(comp_id);
      }
    }
  }

  if (item.childs) {
    for (const child of item.childs) {
      if (child && child.type !== "text") {
        scanSingle(child);
      }
    }
  }
};
