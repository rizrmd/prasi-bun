import { createId } from "@paralleldrive/cuid2";
import { useGlobal } from "web-utils";
import { IContent, MContent } from "../../../../../utils/types/general";
import { IItem, MItem } from "../../../../../utils/types/item";
import { MRoot } from "../../../../../utils/types/root";
import { ISection, MSection } from "../../../../../utils/types/section";
import { getActiveMeta, getMetaById } from "../../../logic/active/get-meta";
import { loadComponent } from "../../../logic/comp/load";
import { EDGlobal, active } from "../../../logic/ed-global";
import { fillID } from "../../../logic/tree/fill-id";
import { TopBtn } from "../top-btn";
import { useEffect } from "react";

export const EdCompPicker = () => {
  const p = useGlobal(EDGlobal, "EDITOR");

  const activatePopup = () => {
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
      console.log(active_meta);
      if (!active_meta) {
        alert("Please select an item/section to add component!");
      }

      if (active_meta) {
        let item = active_meta.item as IContent;
        if (item.type === "item" && item.component?.id) {
          if (
            item.component.props.child &&
            item.component.props.child.content
          ) {
            const cmeta = getMetaById(p, item.component.props.child.content.id);
            if (cmeta) {
              active_meta = cmeta;
              item = active_meta.item;
            }
          } else {
            if (
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

  // useEffect(() => {
  //   activatePopup();
  // }, []);

  return (
    <TopBtn
      onClick={(e) => {
        activatePopup();
      }}
      style="slim"
    >
      <div
        dangerouslySetInnerHTML={{
          __html: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-plus-2"><path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M3 15h6"/><path d="M6 12v6"/></svg>`,
        }}
      ></div>
    </TopBtn>
  );
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

const addSection = (root: MRoot) => {
  const json = {
    id: createId(),
    name: `new_section`,
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
