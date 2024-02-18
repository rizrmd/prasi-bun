import { createId } from "@paralleldrive/cuid2";
import { useGlobal, waitUntil } from "web-utils";
import { IContent, MContent } from "../../../../../utils/types/general";
import { IItem } from "../../../../../utils/types/item";
import { getActiveMeta, getMetaById } from "../../../logic/active/get-meta";
import { EDGlobal, active } from "../../../logic/ed-global";
import { fillID } from "../../../logic/tree/fill-id";
import { TopBtn } from "../top-btn";
import { prepSection } from "./prep-section";
import { treeRebuild } from "../../../logic/tree/build";

export const EdAddItem = () => {
  const p = useGlobal(EDGlobal, "EDITOR");

  return (
    <TopBtn
      style="slim"
      onClick={async () => {
        let meta = getActiveMeta(p);

        if (!meta) {
          prepSection(p);
          await waitUntil(() => {
            meta = getActiveMeta(p);
            return !!meta;
          });
        }
        if (!meta) return null;

        const json = {
          id: createId(),
          name: `new_item`,
          type: "item",
          dim: { w: "full", h: "full" },
          childs: [],
          adv: {
            css: "",
          },
        } as IItem;

        if (meta.item.component?.id && meta.item.component.props.child) {
          const child_id = meta.item.component.props.child.content?.id;
          if (child_id) {
            const child_meta = getMetaById(p, child_id);
            if (child_meta) {
              meta = child_meta;
            }
          }
        }

        let mitem = meta.mitem;
        if (mitem) {
          const item = meta.item as IContent;
          if (
            item.type === "text" ||
            (item.type === "item" && item.component?.id)
          ) {
            const parent_id = meta.parent?.id || "root";
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

              treeRebuild(p);
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
