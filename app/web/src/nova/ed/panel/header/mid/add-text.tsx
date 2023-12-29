import { createId } from "@paralleldrive/cuid2";
import { useGlobal, waitUntil } from "web-utils";
import { IContent, MContent } from "../../../../../utils/types/general";
import { IItem } from "../../../../../utils/types/item";
import { IText } from "../../../../../utils/types/text";
import { getActiveMeta, getMetaById } from "../../../logic/active/get-meta";
import { EDGlobal, active } from "../../../logic/ed-global";
import { fillID } from "../../../logic/tree/fill-id";
import { TopBtn } from "../top-btn";
import { prepSection } from "./prep-section";
import { treeRebuild } from "../../../logic/tree/build";

export const EdAddText = () => {
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

        meta.mitem?.doc?.transact(() => {
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

          let mitem = meta.mitem as MContent;
          if (mitem) {
            const item = meta.item as IContent;

            if (
              item.type === "text" ||
              (item.type === "item" && item.component?.id)
            ) {
              const parent_id = meta.parent?.id || "root";
              const parent = getMetaById(
                p,
                parent_id === "root" ? item.id : parent_id
              );
              if (!parent) {
                alert("Failed to add text!");
              } else {
                mitem = parent.mitem as MContent;
              }
            }

            if (mitem) {
              if (mitem.get("type") === "section") {
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
                    mitem = map;
                    p.render();
                  }
                }
              }

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
                focus();
              }
            }
          }
        });
        treeRebuild(p);
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

const focus = () => {
  setTimeout(() => {
    if (document.activeElement?.tagName === "INPUT") {
      return;
    }
    const el_active = document.querySelector(".el-active") as any;
    if (el_active) el_active.focus();
  }, 100);
};
