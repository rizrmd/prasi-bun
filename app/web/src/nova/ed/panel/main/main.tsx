import { useGlobal, useLocal } from "web-utils";
import { Vi } from "../../../vi/vi";
import { isMetaActive } from "../../logic/active/is-meta.active";
import { EDGlobal, IMeta, PG, active } from "../../logic/ed-global";
import { mainPerItemVisit } from "./main-per-item";

export const EdMain = () => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal({});
  active.hover.renderMain = local.render;

  const meta = active.comp_id
    ? p.comp.list[active.comp_id].meta[active.item_id]
    : p.page.meta[active.item_id];
  return (
    <div
      className={cx(
        "flex flex-1 relative overflow-auto",
        css`
          contain: content;
        `
      )}
    >
      <div className={mainStyle(p, meta)}>
        <Vi
          meta={p.page.meta}
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
        />
      </div>
    </div>
  );
};

const mainStyle = (p: PG, meta?: IMeta) => {
  let is_active = meta ? isMetaActive(p, meta) : false;

  return cx(
    "absolute inset-0 flex",
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
