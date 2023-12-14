import { useGlobal, useLocal } from "web-utils";
import { Vi } from "../../../vi/vi";
import { EDGlobal } from "../../logic/ed-global";

export const EdMain = () => {
  const local = useLocal({
    hover_id: "",
  });
  // return <div className="flex flex-1 flex-col relative"></div>;
  const p = useGlobal(EDGlobal, "EDITOR");
  return (
    <div className="flex flex-1 relative overflow-auto">
      <div
        className={cx(
          "absolute inset-0 flex",
          local.hover_id &&
            css`
              .s-${local.hover_id} {
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
        )}
      >
        <Vi
          meta={p.page.meta}
          api_url={p.site.config.api_url}
          site_id={p.site.id}
          entry={p.page.entry}
          api={p.script.api}
          db={p.script.db}
          visit={(meta, parts) => {
            parts.props.onPointerOver = (e) => {
              e.stopPropagation();
              local.hover_id = meta.item.id;
              local.render();
            };
            parts.props.onPointerLeave = (e) => {
              local.hover_id = "";
              local.render();
            };
          }}
        />
      </div>
    </div>
  );
};

function setEndOfContenteditable(div: any) {
  let range: any, sel: any;
  if (document.createRange) {
    //Firefox, Chrome, Opera, Safari, IE 9+
    range = document.createRange();
    range.selectNodeContents(div);
    sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }
}
