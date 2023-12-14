import { useGlobal, useLocal } from "web-utils";
import { Vi } from "../../../vi/vi";
import { EDGlobal, active } from "../../logic/ed-global";

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
      <div
        className={cx(
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
            parts.props.className = cx(
              parts.props.className,
              active.item_id === meta.item.id &&
                css`
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
                `
            );
            parts.props.onPointerOver = (e) => {
              e.stopPropagation();
              active.hover.id = meta.item.id;
              active.hover.renderMain();
              active.hover.renderTree();
            };
            parts.props.onPointerLeave = (e) => {
              e.stopPropagation();
              active.hover.id = "";
              active.hover.renderMain();
              active.hover.renderTree();
            };
            parts.props.onPointerDown = (e) => {
              e.stopPropagation();
              active.item_id = meta.item.id;
              active.hover.id = "";
              p.render();
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
