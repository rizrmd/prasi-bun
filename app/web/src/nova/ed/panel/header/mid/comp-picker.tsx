import { useGlobal } from "web-utils";
import { EDGlobal, active } from "../../../logic/ed-global";
import { TopBtn } from "../top-btn";
import { loadComponent } from "../../../logic/tree/sync-walk";
import { MContent } from "../../../../../utils/types/general";
import { fillID } from "../../../logic/tree/fill-id";
import { IItem } from "../../../../../utils/types/item";

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

          if (!active.item_id) {
            const first_id = p.page.entry[0];
            if (first_id) {
              const first = p.page.meta[first_id];
              console.log(first);
            }
          } else {
            const active_meta = p.page.meta[active.item_id];
            if (active_meta) {
              const item = active_meta.item;
              const mitem = active_meta.mitem;
              if (item && mitem) {
                if (item.type !== "text") {
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
                }
              } else {
                alert("Failed to add component!");
              }
            }
          }
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
