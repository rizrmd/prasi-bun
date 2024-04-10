import { createId } from "@paralleldrive/cuid2";
import { syncronize } from "y-pojo";
import { IContent, MContent } from "../../../../../../../utils/types/general";
import { IItem } from "../../../../../../../utils/types/item";
import { IText } from "../../../../../../../utils/types/text";
import { getMetaById } from "../../../../../logic/active/get-meta";
import { PG } from "../../../../../logic/ed-global";
import { treeRebuild } from "../../../../../logic/tree/build";
import { loadComponent } from "../../../../../logic/comp/load";

export const edActionWrap = (p: PG, item: IText | IItem) => {
  const mitem = getMetaById(p, item.id)?.mitem;
  if (mitem) {
    mitem.doc?.transact(() => {
      mitem.parent.forEach((e: MContent, idx) => {
        if (e.get("id") === mitem.get("id")) {
          const json: IContent = {
            id: createId(),
            name: `Wrapped`,
            type: "item",
            childs: [e.toJSON() as IItem | IText],
          };
          const map = new Y.Map() as MContent;
          if (map) {
            syncronize(map as any, json);
            mitem.parent.delete(idx);
            mitem.parent.insert(idx, [map]);
            treeRebuild(p, { note: "wrap" });
          }
        }
      });
    });
  }
};

export const edActionWrapInComp = (p: PG, item: IText | IItem) => {
  p.ui.popup.comp.open = async (comp_id) => {
    let comp_ref = p.comp.list[comp_id];
    if (!comp_ref) {
      await loadComponent(p, comp_id);
      comp_ref = p.comp.list[comp_id];
    }

    if (!comp_ref) {
      alert("Cannot load component!");
      return;
    }

    const comp = comp_ref.doc.getMap("map").get("root")?.toJSON() as IItem;
    const jsx = {} as Record<string, IItem>;
    for (const [k, v] of Object.entries(comp.component?.props || {})) {
      if (v.meta?.type === "content-element" && v.content) {
        jsx[k] = v.content;
      }
    }
    let found = jsx.child;
    if (!found) {
      for (const [k, v] of Object.entries(jsx)) {
        found = v;
      }
    }

    if (found) {
      const mitem = getMetaById(p, item.id)?.mitem;
      if (mitem) {
        mitem.doc?.transact(() => {
          mitem.parent.forEach((e: MContent, idx) => {
            if (e.get("id") === mitem.get("id")) {
              found.childs = [e.toJSON() as IItem];
              comp.id = createId();
              const map = new Y.Map() as MContent;
              if (map) {
                syncronize(map as any, comp);
                mitem.parent.delete(idx);
                mitem.parent.insert(idx, [map]);
                treeRebuild(p, { note: "wrap" });
              }
            }
          });
        });
      }
    }
  };
  p.render();
};
