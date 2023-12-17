import { IContent } from "../../../../utils/types/general";
import { VG } from "../../../vi/render/global";
import { IMeta, PG, active } from "../../logic/ed-global";
import { treeRebuild } from "../../logic/tree/build";

type MPIVParam = Parameters<Exclude<VG["visit"], undefined>>;

const text_edit = { timeout: null as any };

export const mainPerItemVisit = (
  p: PG,
  meta: MPIVParam[0],
  parts: MPIVParam[1]
) => {
  if ((meta.item as IContent).type === "text" && !meta.item.adv?.jsBuilt) {
    parts.props.spellCheck = false;
    parts.props.contentEditable = true;
    parts.props.onFocus = (e) => {
      p.page.prevent_rebuild = true;
      p.render();
      const is_active = ![meta.item.originalId, meta.item.id].includes(
        active.item_id
      );
      if (is_active) {
        e.currentTarget.blur();
      }
    };

    parts.props.onBlur = (e) => {
      p.page.prevent_rebuild = false;
      p.render();
    };

    parts.props.onInput = (e) => {
      e.stopPropagation();
      e.preventDefault();
      const val = e.currentTarget.innerHTML;
      clearTimeout(text_edit.timeout);
      text_edit.timeout = setTimeout(() => {
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

  let is_active: boolean = active.item_id === meta.item.id;
  if (active.comp_id) {
    is_active = active.item_id === meta.item.originalId;
  }

  parts.props.className = cx(
    parts.props.className,
    is_active && "el-active",
    is_active &&
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

    if (active.comp_id) {
      if (meta.parent?.comp_id === active.comp_id && meta.item.originalId) {
        active.hover.id = meta.item.originalId;
      } else {
        active.hover.id = meta.item.id;
      }
    } else {
      active.hover.id = meta.item.id;
    }
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
    let found = false;
    if (m) {
      if (m.item.component?.id && active.comp_id !== m.item.component.id) {
        if (active.item_id === m.item.id) {
          active.comp_id = m.item.component.id;
          found = true;
        } else {
        }
      } else {
        if (active.comp_id && m && m.parent?.instance_id) {
          const meta = p.page.meta[m.parent.instance_id];
          const comp_id = meta.item.component?.id;
          if (meta.item.originalId && comp_id) {
            if (active.item_id === meta.item.originalId) {
              if (comp_id) {
                active.instance.item_id = meta.item.originalId;
                active.instance.comp_id = active.comp_id;

                active.comp_id = comp_id || "";
                const root = p.comp.list[comp_id].tree.find(
                  (e) => e.parent === "root"
                );
                if (root && typeof root.id === "string") {
                  active.item_id = root.id || "";
                }

                p.render();
              }
            } else {
              active.item_id = meta.item.originalId;
              found = true;
            }
          }
        }
      }
    }

    if (!found) {
      if (active.comp_id) {
        if (meta.item.component?.id === active.comp_id) {
          active.item_id = meta.item.id;
        } else if (m && m.parent?.comp_id === active.comp_id) {
          if (m.item.originalId) {
            active.item_id = m.item.originalId;
          }
        } else if (meta.parent?.comp_id === active.comp_id) {
          active.item_id = meta.item.originalId || meta.item.id;
        } else if (m) {
          if (m.mitem) {
            active.comp_id = "";
          } else if (m.parent?.comp_id && m.parent?.instance_id) {
            const pmeta = p.page.meta[m.parent.instance_id];
            if (pmeta.item.originalId) {
              active.item_id = pmeta.item.originalId;
            }
          }
        }
      } else {
        if (m) {
          active.item_id = m.item.id;
        }
      }
    }
    active.hover.id = "";
    p.render();
  };
};

const getOuterMeta = (p: { meta: Record<string, IMeta> }, meta: IMeta) => {
  let cur: undefined | IMeta = meta;

  if (cur.jsx_prop) return meta;

  while (cur?.parent?.instance_id && p.meta[cur?.parent?.instance_id]) {
    cur = p.meta[cur?.parent?.instance_id];
  }

  if (cur) return cur;
};
