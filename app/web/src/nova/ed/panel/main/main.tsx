import { useGlobal, useLocal } from "web-utils";
import { Vi } from "../../../vi/vi";
import { isMetaActive } from "../../logic/active/is-meta.active";
import { EDGlobal, IMeta, PG, active } from "../../logic/ed-global";
import { mainPerItemVisit } from "./main-per-item";
import { w } from "../../../../utils/types/general";
import parseUA from "ua-parser-js";

export const EdMain = () => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal({
    cache: null as any,
    first_load: false,
    width: 0,
    height: 0,
  });

  w.navigateOverride = (_href) => {
    if (_href.startsWith("/ed")) return _href;
    return "";
  };

  let meta: undefined | IMeta = undefined;

  if (active.comp_id) {
    if (p.comp.list[active.comp_id]) {
      meta = p.comp.list[active.comp_id].meta[active.item_id];
    } else {
      active.comp_id = "";
    }
  } else {
    meta = p.page.meta[active.item_id];
  }

  if (p.site.id) {
    if (!p.mode && !!p.site.responsive) {
      if (
        p.site.responsive !== "mobile-only" &&
        p.site.responsive !== "desktop-only"
      ) {
        const parsed = parseUA();
        p.mode = parsed.device.type === "mobile" ? "mobile" : "desktop";
      } else if (p.site.responsive === "mobile-only") {
        p.mode = "mobile";
      } else if (p.site.responsive === "desktop-only") {
        p.mode = "desktop";
      }
    }

    if (localStorage.getItem("prasi-editor-mode")) {
      p.mode = localStorage.getItem("prasi-editor-mode") as any;
    }
  }

  if (active.should_render_main) {
    local.cache = (
      <Vi
        meta={p.page.meta}
        mode={p.mode}
        api_url={p.site.config.api_url}
        site_id={p.site.id}
        page_id={p.page.cur.id}
        entry={p.page.entry}
        api={p.script.api}
        db={p.script.db}
        script={{ init_local_effect: p.script.init_local_effect }}
        visit={(meta, parts) => {
          return mainPerItemVisit(p, meta, parts);
        }}
        on_status_changed={(status) => {
          if (status !== "ready") {
            active.should_render_main = true;
            local.render();
          } else {
            if (!local.first_load) {
              local.first_load = true;
              active.should_render_main = true;
              local.render();
            }
          }
        }}
      />
    );
    active.should_render_main = false;
  }

  return (
    <div
      className={cx(
        "flex flex-1 relative overflow-auto",
        p.mode === "mobile" ? "flex-col items-center" : ""
      )}
      ref={(el) => {
        if (el) {
          const bound = el.getBoundingClientRect();
          if (local.width !== bound.width || local.height !== bound.height) {
            local.width = bound.width;
            local.height = bound.height;
            local.render();
          }
        }
      }}
    >
      <div className={mainStyle(p, meta)}>{local.cache}</div>
    </div>
  );
};

const mainStyle = (p: PG, meta?: IMeta) => {
  let is_active = meta ? isMetaActive(p, meta) : false;

  const scale = parseInt(p.ui.zoom.replace("%", "")) / 100;

  let width = `${(1 / scale) * 100}%`;
  if (p.mode === "mobile") {
    width = `${(1 / scale) * 375}px`;
  }

  return cx(
    "absolute flex",
    css`
      contain: content;
    `,
    p.mode === "mobile"
      ? css`
          border-left: 1px solid #ccc;
          border-right: 1px solid #ccc;
          background: white;
          top: 0px;
          overflow-x: hidden;
          overflow-y: auto;
          bottom: 0px;
        `
      : "inset-0",
    p.mode === "mobile"
      ? css`
          width: ${width};
          height: ${`${(1 / scale) * 100}%`};
          transform: scale(${scale});
          transform-origin: 50% 0% 0px;
        `
      : css`
          width: ${width};
          height: ${`${(1 / scale) * 100}%`};
          transform: scale(${scale});
          transform-origin: 0% 0% 0px;
        `,
    active.hover.id &&
      css`
        .s-${active.hover.id} {
          &::after {
            content: " ";
            pointer-events: none;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            border: 2px solid #73b8ff;
          }
        }
      `,
    is_active &&
      css`
        .s-${active.item_id} {
          outline: none;

          &::after {
            content: " ";
            pointer-events: none;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            border: 2px solid #1c88f3;
          }
        }
      `
  );
};
