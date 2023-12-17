import { IContent } from "../../../../utils/types/general";
import { VG } from "../../../vi/render/global";
import { IMeta, PG, active } from "../../logic/ed-global";
import { treeRebuild } from "../../logic/tree/build";

type MPIVParam = Parameters<Exclude<VG["visit"], undefined>>;
export const mainPerItemVisit = (
  p: PG,
  meta: MPIVParam[0],
  parts: MPIVParam[1]
) => {
  if ((meta.item as IContent).type === "text" && !meta.item.adv?.jsBuilt) {
    parts.props.spellCheck = false;
    parts.props.contentEditable = true;
    parts.props.dangerouslySetInnerHTML = {
      __html: meta.mitem?.get("html") || "&nbsp;",
    };
    parts.props.onBlur = (e) => {
      e.stopPropagation();
      const mitem = meta.mitem;
      if (mitem) {
        mitem.set("html", e.currentTarget.innerHTML);
      }
    };
  }

  let isActive: boolean = active.item_id === meta.item.id;
  if (active.comp_id) {
    isActive = active.item_id === meta.item.originalId;
  }

  parts.props.className = cx(
    parts.props.className,
    isActive &&
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

    if (active.comp_id && !p.comp.list[active.comp_id]) {
      active.comp_id = "";
      treeRebuild(p);
      return;
    }

    const item = getOuterItem(
      {
        meta: active.comp_id ? p.comp.list[active.comp_id].meta : p.page.meta,
      },
      meta
    );
    if (active.comp_id && item.component?.id === active.comp_id) {
      if (meta.item.originalId) {
        active.item_id = meta.item.originalId;
      }
    } else {
      if (item) {
        active.item_id = item.id;
      }
    }
    active.hover.id = "";
    p.render();
  };
};

const getOuterItem = (p: { meta: Record<string, IMeta> }, meta: IMeta) => {
  let cur: undefined | IMeta = meta;

  if (cur.jsx_prop) return meta.item;

  while (cur?.parent?.instance_id) {
    cur = p.meta[cur?.parent?.instance_id];
  }

  return cur.item;
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
