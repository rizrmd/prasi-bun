import { IContent, MContent } from "../../../../../../../utils/types/general";
import { IItem, MItem } from "../../../../../../../utils/types/item";
import { MSection } from "../../../../../../../utils/types/section";
import {
  getActiveMeta,
  getMetaById,
} from "../../../../../logic/active/get-meta";
import { loadComponent } from "../../../../../logic/comp/load";
import { PG, active } from "../../../../../logic/ed-global";
import { fillID } from "../../../../../logic/tree/fill-id";

export const edActionAttach = (p: PG, item: IItem) => {
  const pick = () => {
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

      if (!comp) {
        alert("Failed to load component!");
        return;
      }

      let active_meta = getActiveMeta(p);
      if (!active_meta) {
        alert("Please select an item/section to add component!");
      } else {
        let item = active_meta.item as IContent;
        if (
          item.type === "item" &&
          item.component?.id &&
          active_meta.parent?.id &&
          item.component?.id !== active.comp_id
        ) {
          active_meta = getMetaById(p, active_meta.parent.id);

          if (active_meta) {
            item = active_meta.item;
          } else {
            alert("Warning: Please edit component first before adding. ");
            return;
          }
        }

        const mitem = active_meta.mitem;

        if (item && mitem) {
          if (item.type !== "text") {
            addComponent(mitem as MItem, comp);
          }
        } else {
          alert("Failed to add component!");
        }
      }
    };
    p.render();
  };
  pick();
};

const addComponent = (mitem: MItem | MSection, comp: IItem) => {
  const map = new Y.Map() as MContent;
  if (map) {
    comp.originalId = comp.id;

    if (comp.component && !comp.component?.instances) {
      comp.component.instances = {};
    }

    syncronize(map as any, fillID(comp));
    const childs = mitem.get("childs");
    if (childs) {
      childs.push([map]);
    }
    const newitem = map.toJSON();
    active.item_id = newitem.id;
  }
};
