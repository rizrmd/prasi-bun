import { get, set } from "idb-keyval";
import { IContent } from "../../../utils/types/general";
import { IItem } from "../../../utils/types/item";
import { ISection } from "../../../utils/types/section";
import { base } from "./base";
import { decompressBlob } from "./util";
import { prodCache } from "./cache";

export const scanComponent = async (items: IContent[]) => {
  const comp = base.comp;

  for (const item of items) {
    if (item && item.type !== "text") {
      scanSingle(item);
    }
  }

  console.log(comp.pending);

  if (comp.pending.size > 0) {
    let all_found = true;
    const founds: any = [];
    for (const id of [...comp.pending]) {
      const item = await get(`comp-${id}`, prodCache);
      if (!item) {
        all_found = false;
      }
      comp.list[id] = item;
      founds.push(item);
    }

    if (all_found) {
      for (const id of [...comp.pending]) {
        comp.pending.delete(id);
      }
      await scanComponent(founds);
      return;
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

        await set(`comp-${id}`, item, prodCache);
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

      for (const prop of Object.values(item.component?.props || {})) {
        if (prop.content && prop.meta?.type === "content-element") {
          scanSingle(prop.content);
        }
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
