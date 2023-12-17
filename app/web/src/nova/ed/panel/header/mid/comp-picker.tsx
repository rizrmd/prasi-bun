import { createId } from "@paralleldrive/cuid2";
import { useGlobal } from "web-utils";
import { MContent } from "../../../../../utils/types/general";
import { IItem, MItem } from "../../../../../utils/types/item";
import { MRoot } from "../../../../../utils/types/root";
import { ISection, MSection } from "../../../../../utils/types/section";
import { EDGlobal, active } from "../../../logic/ed-global";
import { getMetaById } from "../../../logic/tree/build";
import { fillID } from "../../../logic/tree/fill-id";
import { TopBtn } from "../top-btn";
import { loadComponent } from "../../../logic/comp/load";

export const EdCompPicker = () => {
  const p = useGlobal(EDGlobal, "EDITOR");

  return (
    <TopBtn
      onClick={(e) => {
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

          const comp = comp_ref.doc
            .getMap("map")
            .get("root")
            ?.toJSON() as IItem;

          if (!comp) {
            alert("Failed to load component!");
            return;
          }

          let active_meta = getMetaById(p, active.item_id);
          // const root = getMRoot(p);
          // if (!active_meta) {
          //   alert("Please select an item/section to add component!");
          // } else {
          //   let item = active_meta.item;
          //   if (item.type === "item" && item.component?.id) {
          //     active_meta = getMetaById(p, active_meta.parent_item.id);

          //     if (active_meta) {
          //       item = active_meta.item;
          //     } else {
          //       alert("Failed to add component!");
          //       return;
          //     }
          //   }

          //   const mitem = active_meta.mitem;

          //   if (item && mitem) {
          //     if (item.type !== "text") {
          //       addComponent(mitem as MItem, comp);
          //     }
          //   } else {
          //     alert("Failed to add component!");
          //   }
          // }
        };
        p.render();
      }}
      style="slim"
    >
      <div
        dangerouslySetInnerHTML={{
          __html: `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" viewBox="0 0 15 15"><path fill="currentColor" fill-rule="evenodd" d="M2 1a1 1 0 00-1 1v11a1 1 0 001 1h11a1 1 0 001-1V2a1 1 0 00-1-1H2zm0 1h11v11H2V2zm2.5 2a.5.5 0 00-.5.5v6a.5.5 0 00.5.5h6a.5.5 0 00.5-.5v-6a.5.5 0 00-.5-.5h-6zm.5 6V5h5v5H5z" clip-rule="evenodd"></path></svg>`,
        }}
      ></div>
    </TopBtn>
  );
};

const addComponent = (mitem: MItem | MSection, comp: IItem) => {
  const map = new Y.Map() as MContent;
  if (map) {
    comp.originalId = comp.id;
    syncronize(map as any, fillID(comp));
    const childs = mitem.get("childs");
    if (childs) {
      childs.push([map]);
    }
    const newitem = map.toJSON();
    active.item_id = newitem.id;
  }
};

const addSection = (root: MRoot) => {
  const json = {
    id: createId(),
    name: `New Section`,
    type: "section",
    dim: { w: "full", h: "full" },
    childs: [],
    adv: {
      css: "",
    },
  } as ISection;
  const childs = root.get("childs");
  if (childs) {
    const map = new Y.Map() as MSection;
    if (map) {
      syncronize(map as any, fillID(json));
      childs.push([map]);
      return map;
    }
  }
};
