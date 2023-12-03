import { useGlobal, waitUntil } from "web-utils";
import { TopBtn } from "../top-btn";
import { EDGlobal, active } from "../../../logic/ed-global";
import { getMetaById } from "../../../logic/tree/build";
import { createId } from "@paralleldrive/cuid2";
import { IText } from "../../../../../utils/types/text";
import { MContent } from "../../../../../utils/types/general";
import { fillID } from "../../../logic/tree/fill-id";
import { prepSection } from "./prep-section";

export const EdAddText = () => {
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
          name: `New Text`,
          type: "text",
          dim: { w: "full", h: "full" },
          layout: { align: "center", dir: "col", gap: 0 },
          text: "",
          html: "",
          adv: {
            css: "",
          },
        } as IText;

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
          d="M3.95 2.95V4.5a.45.45 0 01-.9 0v-2a.45.45 0 01.45-.45h8a.45.45 0 01.45.45v2a.45.45 0 11-.9 0V2.95h-3v9.1h1.204a.45.45 0 010 .9h-3.5a.45.45 0 110-.9H6.95v-9.1h-3z"
          clipRule="evenodd"
        ></path>
      </svg>
    </TopBtn>
  );
};
