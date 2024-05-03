import { syncronize } from "y-pojo";
import { IContent } from "../../../../../../../utils/types/general";
import { IItem, MItem } from "../../../../../../../utils/types/item";
import { MSection } from "../../../../../../../utils/types/section";
import { getMetaById } from "../../../../../logic/active/get-meta";
import { PG, active } from "../../../../../logic/ed-global";
import { treeRebuild } from "../../../../../logic/tree/build";
import { TypedArray } from "yjs-types";
import { loadComponent } from "../../../../../logic/comp/load";
import { fillID } from "../../../../../logic/tree/fill-id";

export const edActionPaste = async (p: PG, item: IContent) => {
  let mitem = getMetaById(p, item.id)?.mitem;

  if ((item as IItem).component?.props["child"]) {
    const content_id = (item as IItem).component?.props["child"]?.content?.id;
    if (content_id) mitem = getMetaById(p, content_id)?.mitem;
  }

  if (mitem) {
    const res = await navigator.clipboard.readText();
    if (typeof res === "string" && res.startsWith("prasi-clipboard:")) {
      const clip = JSON.parse(
        res.substring("prasi-clipboard:".length)
      ) as IItem;

      const load_comp_ids = new Set<string>();
      const walk = (item: IItem) => {
        if (item.component?.id && !p.comp.list[item.component.id]) {
          load_comp_ids.add(item.component.id);
        }

        if (item.component?.props) {
          for (const [k, v] of Object.entries(item.component.props)) {
            if (v.meta?.type === "content-element" && v.content) {
              walk(v.content);
            }
          }
        }
        if (item.childs) {
          for (const child of item.childs) {
            if (child.type === "item") walk(child);
          }
        }
      };
      walk(clip);
      if (load_comp_ids.size > 0) {
        for (const id of load_comp_ids) {
          await loadComponent(p, id);
        }
      }

      let mchilds = mitem.get("childs") as
        | TypedArray<MItem | MSection>
        | undefined;

      if ((clip as any).type === "section") {
        const mroot = p.page.doc?.getMap("map").get("root");
        if (mroot) {
          mchilds = mroot.get("childs") as any;
        }
      }

      mitem.doc?.transact(() => {
        if (mchilds) {
          let child: any = { ...clip };

          if (item.type === "text") {
            (mitem as MItem).set("type", "item");
            item.type = "item" as any;
          }
          const map = new Y.Map();
          const newchild = fillID(child);
          syncronize(map, newchild);
          mchilds.push([map]);
          active.item_id = newchild.id;
        }
      });
    }
    treeRebuild(p, { note: "paste" });
  }
};
