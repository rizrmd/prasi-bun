import { get, set } from "idb-keyval";
import { IContent } from "../../../utils/types/general";
import { IItem } from "../../../utils/types/item";
import { ISection } from "../../../utils/types/section";
import { base } from "./base";

export const scanComponent = async (items: IContent[]) => {
  const comp = base.comp;

  for (const item of items) {
    if (item && item.type !== "text") {
      scanSingle(item);
    }
  }

  const pending = Object.keys(comp.pending);
  if (pending.length > 0) {
    try {
      const res = (await (
        await fetch(base.url`_prasi/comp`, {
          method: "POST",
          body: JSON.stringify({ ids: [...pending] }),
        })
      ).json()) as Record<string, IItem>;
      for (const [id, item] of Object.entries(res)) {
        delete comp.pending[id];
        comp.list[id] = item;
        await set(`comp-${id}`, item);
      }
      if (Object.keys(comp.pending).length > 0) {
        console.warn(
          `Warning: component not found: ${Object.keys(comp.pending)}`
        );
        return;
      }

      await scanComponent(Object.values(res));
    } catch (e) {
      console.error(e);
    }
  }
};

const scanSingle = (item: IItem | ISection) => {
  const comp = base.comp;
  if (item.type === "item") {
    const comp_id = item.component?.id;

    if (comp_id) {
      if (!comp.list[comp_id] && !comp.pending[comp_id]) {
        comp.pending[comp_id] = [];
      }
      if (comp.pending[comp_id]) {
        if (!comp.pending[comp_id].find((e) => e.id === item.id)) {
          comp.pending[comp_id].push(item);
        }
      }

      if (comp.pending[comp_id]) {
        if (comp.list[comp_id]) {
          for (const item of comp.pending[comp_id]) {
            for (const prop of Object.values(item.component?.props || {})) {
              if (prop.content) {
                scanSingle(prop.content);
              }
            }
          }
          delete comp.pending[comp_id];
        } else if (item.component?.props) {
          for (const prop of Object.values(item.component?.props || {})) {
            if (prop.content) {
              scanSingle(prop.content);
            }
          }
        }
      }
    }
  }

  if (item.childs) {
    for (const child of item.childs) {
      let c = child;
      if (c && c.type !== "text") {
        scanSingle(c);
      }
    }
  }
};
