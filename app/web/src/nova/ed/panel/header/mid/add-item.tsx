import { createId } from "@paralleldrive/cuid2";
import { useGlobal, waitUntil } from "web-utils";
import { MContent } from "../../../../../utils/types/general";
import { IItem } from "../../../../../utils/types/item";
import { EDGlobal, active } from "../../../logic/ed-global";
import { getMetaById } from "../../../logic/tree/build";
import { fillID } from "../../../logic/tree/fill-id";
import { TopBtn } from "../top-btn";
import { prepSection } from "./prep-section";

export const EdAddItem = () => {
  const p = useGlobal(EDGlobal, "EDITOR");

  return (
    <TopBtn
      style="slim"
      onClick={async () => {
        let meta = getMetaById(p, active.item_id);

        if (!meta) {
          prepSection(p);
          await waitUntil(() => getMetaById(p, active.item_id));
          meta = getMetaById(p, active.item_id);
        }
        if (!meta) return null;

        const json = {
          id: createId(),
          name: `New Item`,
          type: "item",
          dim: { w: "full", h: "full" },
          childs: [],
          adv: {
            css: "",
          },
        } as IItem;

        let mitem = meta.mitem;
        if (mitem) {
          if (
            meta.item.type === "text" ||
            (meta.item.type === "item" && meta.item.component?.id)
          ) {
            const parent_id = meta.parent_item.id;
            const parent = getMetaById(
              p,
              parent_id === "root" ? meta.item.id : parent_id
            );
            if (!parent) {
              alert("Failed to add text!");
            } else {
              mitem = parent.mitem;
            }
          }

          if (mitem) {
            const childs = mitem.get("childs");
            if (childs) {
              const map = new Y.Map() as MContent;
              syncronize(map as any, fillID(json));
              const childs = mitem.get("childs");
              if (childs) {
                childs.push([map]);
              }

              active.item_id = map.get("id") || "";
              p.render();
            }
          }
        }
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        fill="none"
        viewBox="0 0 15 15"
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M1.5 2a.5.5 0 100-1 .5.5 0 000 1zm3 0a.5.5 0 100-1 .5.5 0 000 1zM8 1.5a.5.5 0 11-1 0 .5.5 0 011 0zm2.5.5a.5.5 0 100-1 .5.5 0 000 1zm3.5-.5a.5.5 0 11-1 0 .5.5 0 011 0zM1.5 14a.5.5 0 100-1 .5.5 0 000 1zm.5-3.5a.5.5 0 11-1 0 .5.5 0 011 0zM1.5 8a.5.5 0 100-1 .5.5 0 000 1zM2 4.5a.5.5 0 11-1 0 .5.5 0 011 0zM13.5 11a.5.5 0 100-1 .5.5 0 000 1zm.5-3.5a.5.5 0 11-1 0 .5.5 0 011 0zM13.5 5a.5.5 0 100-1 .5.5 0 000 1zM5 13.5a.5.5 0 11-1 0 .5.5 0 011 0zm2.5.5a.5.5 0 100-1 .5.5 0 000 1zm3.5-.5a.5.5 0 11-1 0 .5.5 0 011 0zm2.5.5a.5.5 0 100-1 .5.5 0 000 1zM4 5a1 1 0 011-1h5a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm1 0h5v5H5V5z"
          clipRule="evenodd"
        ></path>
      </svg>
    </TopBtn>
  );
};
