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
      __html: meta.item.html || "&nbsp;",
    };
    parts.props.onFocus = (e) => {
      if (![meta.item.originalId, meta.item.id].includes(active.item_id)) {
        e.currentTarget.blur();
      }
    };

    parts.props.onBlur = (e) => {
      e.stopPropagation();
      const val = e.currentTarget.innerHTML;
      if (active.comp_id && meta.parent?.comp_id === active.comp_id) {
        const comp = p.comp.list[active.comp_id];
        const m = comp.meta[meta.item.originalId || meta.item.id];
        if (m && m.mitem) {
          m.item.html = val;
          m.mitem.set("html", val);
        }
        return;
      }

      let mitem = meta.mitem;
      if (mitem) {
        meta.item.html = val;
        mitem.set("html", val);
      }
    };
  }

  let isActive: boolean = active.item_id === meta.item.id;
  if (active.comp_id) {
    isActive = active.item_id === meta.item.originalId;
  }

  parts.props.className = cx(
    parts.props.className,
    isActive && "el-active",
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

    const m = getOuterMeta(
      {
        meta: active.comp_id ? p.comp.list[active.comp_id].meta : p.page.meta,
      },
      meta
    );

    if (active.comp_id) {
      if (m && m.parent?.comp_id === active.comp_id) {
        if (m.item.originalId) {
          active.item_id = m.item.originalId;
        }
      } else if (meta.parent?.comp_id === active.comp_id) {
        active.item_id = meta.item.originalId || meta.item.id;
      } else {
        active.comp_id = "";
      }
    } else {
      if (m) {
        active.item_id = m.item.id;
      }
    }
    active.hover.id = "";
    p.render();
  };
};

const getOuterMeta = (p: { meta: Record<string, IMeta> }, meta: IMeta) => {
  let cur: undefined | IMeta = meta;

  if (cur.jsx_prop) return meta;

  while (cur?.parent?.instance_id) {
    cur = p.meta[cur?.parent?.instance_id];
  }

  if (cur) return cur;
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
