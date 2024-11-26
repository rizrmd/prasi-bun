import { useGlobal } from "web-utils";
import { w } from "../../../../../utils/types/general";
import { ToolbarBox } from "../../../../../utils/ui/box";
import { applyEnv } from "../../../../vi/load/load-snapshot";
import { EDGlobal } from "../../../logic/ed-global";
import { treeRebuild } from "../../../logic/tree/build";

export const ResponsiveToggle = () => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const mode = p.mode;
  let activeModeClassName = "border-b-2 border-blue-500";

  const render = () => {
    const code = p.code["site"]?.doc;
    if (code) {
      applyEnv(p);
    }

    treeRebuild(p);
    p.render();
  };

  const mroot = p.page.doc?.getMap("map")?.get("root");
  const responsive = mroot?.get("responsive");
  if (responsive && responsive !== p.mode) {
    p.mode = responsive;
    w.isMobile = responsive === "mobile";
    w.isDesktop = responsive === "desktop";
    localStorage.setItem("prasi-editor-mode", responsive);
  }

  if (responsive) {
    activeModeClassName = "border-b-2 border-green-500 bg-green-100";
  }

  const box = {
    mobile: {
      onClick() {
        if (p.mode === "mobile") {
          if (mroot?.get("responsive")) {
            mroot?.set("responsive", undefined);
            localStorage.setItem("prasi-editor-mode", "");
            render();
            return;
          }
        }

        p.mode = "mobile";
        w.isMobile = true;
        w.isDesktop = false;
        localStorage.setItem("prasi-editor-mode", "mobile");
        mroot?.set("responsive", "desktop");
        render();
      },
      className: cx(mode === "mobile" && activeModeClassName),
      content: (
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
            d="M4 2.5a.5.5 0 01.5-.5h6a.5.5 0 01.5.5v10a.5.5 0 01-.5.5h-6a.5.5 0 01-.5-.5v-10zM4.5 1A1.5 1.5 0 003 2.5v10A1.5 1.5 0 004.5 14h6a1.5 1.5 0 001.5-1.5v-10A1.5 1.5 0 0010.5 1h-6zM6 11.65a.35.35 0 100 .7h3a.35.35 0 100-.7H6z"
            clipRule="evenodd"
          ></path>
        </svg>
      ),
    },
    desktop: {
      onClick() {
        if (p.mode === "desktop") {
          if (mroot?.get("responsive")) {
            mroot?.set("responsive", undefined);
            localStorage.setItem("prasi-editor-mode", "");
            render();
            return;
          }
        }

        p.mode = "desktop";
        w.isMobile = false;
        w.isDesktop = true;
        localStorage.setItem("prasi-editor-mode", "desktop");

        mroot?.set("responsive", "desktop");
        render();
      },
      className: cx(mode === "desktop" && activeModeClassName),
      content: (
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
            d="M1 3.25A.25.25 0 011.25 3h12.5a.25.25 0 01.25.25v7.5a.25.25 0 01-.25.25H1.25a.25.25 0 01-.25-.25v-7.5zM1.25 2C.56 2 0 2.56 0 3.25v7.5C0 11.44.56 12 1.25 12h3.823l-.243 1.299a.55.55 0 00.54.651h4.26a.55.55 0 00.54-.651L9.927 12h3.823c.69 0 1.25-.56 1.25-1.25v-7.5C15 2.56 14.44 2 13.75 2H1.25zm7.76 10H5.99l-.198 1.05h3.416L9.01 12z"
            clipRule="evenodd"
          ></path>
        </svg>
      ),
    },
  };
  const items: any[] = [];
  if (p.site.responsive === "mobile-only") {
    items.push(box.mobile);
  } else if (p.site.responsive === "desktop-only") {
    items.push(box.desktop);
  } else {
    items.push(box.mobile);
    items.push(box.desktop);
  }

  return <ToolbarBox className="flex" items={items} />;
};
