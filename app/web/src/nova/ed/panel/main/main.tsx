import { useGlobal, useLocal } from "web-utils";
import { Vi } from "../../../vi/vi";
import { EDGlobal, active } from "../../logic/ed-global";
import { mainPerItemVisit } from "./main-per-item";

export const EdMain = () => {
  // return <div className="flex flex-1 flex-col relative"></div>;
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal({});
  active.hover.renderMain = local.render;

  return (
    <div
      className={cx(
        "flex flex-1 relative overflow-auto",
        css`
          contain: content;
        `
      )}
    >
      <div className={mainStyle()}>
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

const mainStyle = () => {
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
      `
  );
};
