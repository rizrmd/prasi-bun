import { createId } from "@paralleldrive/cuid2";
import { useGlobal } from "web-utils";
import { MContent } from "../../../../../utils/types/general";
import { ISection } from "../../../../../utils/types/section";
import { EDGlobal, active } from "../../../logic/ed-global";
import { getMetaById } from "../../../logic/tree/build";
import { fillID } from "../../../logic/tree/fill-id";
import { TopBtn } from "../top-btn";

export const EdAddSection = () => {
  const p = useGlobal(EDGlobal, "EDITOR");

  return (
    <TopBtn
      style="slim"
      onClick={() => {
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

        const root = p.page.doc?.getMap("map").get("root");

        if (root) {
          const childs = root.get("childs");
          if (childs) {
            const map = new Y.Map() as MContent;
            syncronize(map as any, fillID(json));
            childs.push([map]);
            active.item_id = json.id;
            p.render();
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
          d="M2 1.5a.5.5 0 11-1 0 .5.5 0 011 0zM2 5v5h11V5H2zm0-1a1 1 0 00-1 1v5a1 1 0 001 1h11a1 1 0 001-1V5a1 1 0 00-1-1H2zm-.5 10a.5.5 0 100-1 .5.5 0 000 1zM4 1.5a.5.5 0 11-1 0 .5.5 0 011 0zM3.5 14a.5.5 0 100-1 .5.5 0 000 1zM6 1.5a.5.5 0 11-1 0 .5.5 0 011 0zM5.5 14a.5.5 0 100-1 .5.5 0 000 1zM8 1.5a.5.5 0 11-1 0 .5.5 0 011 0zM7.5 14a.5.5 0 100-1 .5.5 0 000 1zM10 1.5a.5.5 0 11-1 0 .5.5 0 011 0zM9.5 14a.5.5 0 100-1 .5.5 0 000 1zM12 1.5a.5.5 0 11-1 0 .5.5 0 011 0zM11.5 14a.5.5 0 100-1 .5.5 0 000 1zM14 1.5a.5.5 0 11-1 0 .5.5 0 011 0zM13.5 14a.5.5 0 100-1 .5.5 0 000 1z"
          clipRule="evenodd"
        ></path>
      </svg>
    </TopBtn>
  );
};
