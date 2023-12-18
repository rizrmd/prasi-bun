import { IContent } from "../../../../utils/types/general";
import {
  getSelectionOffset,
  setSelectionOffset,
} from "../../../../utils/ui/selection";
import { VG } from "../../../vi/render/global";
import { activateMeta } from "../../logic/active/activate-meta";
import { isMetaActive } from "../../logic/active/is-meta.active";
import { PG, active } from "../../logic/ed-global";
import { treeRebuild } from "../../logic/tree/build";
import { edActionDeleteById } from "../tree/node/item/action/del";

type MPIVParam = Parameters<Exclude<VG["visit"], undefined>>;

export const text_edit = {
  timeout: null as any,
  caret: null as any,
  prevent_select_all: false,
  id: null as any,
  del_key_id: false as false | string,
};

export const mainPerItemVisit = (
  p: PG,
  meta: MPIVParam[0],
  parts: MPIVParam[1]
) => {
  if ((meta.item as IContent).type === "text" && !meta.item.adv?.js) {
    parts.props.spellCheck = false;
    parts.props.contentEditable = true;
    if (meta.parent?.comp_id) {
      if (meta.parent.comp_id !== active.comp_id) {
        parts.props.contentEditable = false;
      }
    }

    parts.props.onBlur = (e) => {
      text_edit.prevent_select_all = false;
      const sel = window.getSelection();
      if (sel) sel.removeAllRanges();
    };

    parts.props.ref = (el) => {
      if (el && text_edit.caret) {
        if (text_edit.id === meta.item.id) {
          setCaret(el, text_edit.caret);
          text_edit.caret = null;
        }
      }
    };

    parts.props.onKeyDown = (e) => {
      if (typeof text_edit.del_key_id === "string") {
        if (e.key === "Backspace" || e.key === "Delete") {
          e.currentTarget.blur();
          edActionDeleteById(p, text_edit.del_key_id);
          p.render();
        } else {
          text_edit.del_key_id = false;
        }
      }
    };

    parts.props.onInput = (e) => {
      e.stopPropagation();
      e.preventDefault();
      const val = e.currentTarget.innerHTML;
      const el = e.currentTarget;

      clearTimeout(text_edit.timeout);
      text_edit.timeout = setTimeout(() => {
        text_edit.id = meta.item.id;
        text_edit.caret = getCaret(el);

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
      }, 500);
    };
  }

  let is_active = isMetaActive(p, meta);

  let is_component = false;
  if (
    !is_active &&
    active.comp_id &&
    meta.item.component?.id === active.comp_id
  ) {
    is_component = true;
  }

  parts.props.className = cx(
    parts.props.className,
    is_active && "el-active",
    is_active &&
      css`
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
      `,
    is_component &&
      css`
        &::after {
          content: " ";
          pointer-events: none;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          border: 2px solid #641cf3;
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

    if ((meta.item as IContent).type === "text") {
      text_edit.prevent_select_all = true;
    }

    if (active.comp_id && !p.comp.list[active.comp_id]) {
      active.comp_id = "";
      treeRebuild(p);
      return;
    }

    activateMeta(p, meta);
    active.hover.id = "";
    p.render();
  };
};

function getCaret(el: any) {
  return getSelectionOffset(el);
}

function setCaret(el: any, offset: any) {
  setSelectionOffset(el, offset[0], offset[1]);
}
