import { set } from "idb-keyval";
import { IContent } from "../../../utils/types/general";
import { IItem } from "../../../utils/types/item";
import { ISection } from "../../../utils/types/section";
import { base } from "./base";
import { listenChanges } from "./live-reload/dev-live-reload";

export const scanComponent = async (items: IContent[], from_root?: boolean) => {
  const comp = base.comp;

  for (const item of items) {
    if (item && item.type !== "text") {
      scanSingle(item, from_root);
    }
  }

  const pending = Object.keys(comp.pending);
  if (pending.length > 0) {
    listenChanges({ type: "comp", ids: pending });
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
        console.error(
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

const scanSingle = (item: IItem | ISection, from_root?: boolean) => {
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
                scanSingle(prop.content, from_root);
              }
            }
          }
          delete comp.pending[comp_id];
        }
      }
      if (item.component?.props) {
        for (const prop of Object.values(item.component?.props || {})) {
          if (prop.content) {
            scanSingle(prop.content, from_root);
          }
        }
      }
    }
  }

  if (item.childs) {
    for (const child of item.childs) {
      let c = child;
      if (c && c.type !== "text") {
        scanSingle(c, from_root);
      }
    }
  }
};
