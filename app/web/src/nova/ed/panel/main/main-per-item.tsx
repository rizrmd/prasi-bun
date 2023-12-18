import { IContent } from "../../../../utils/types/general";
import { VG } from "../../../vi/render/global";
import { getCompMeta } from "../../logic/comp/comp-meta";
import { PG, active } from "../../logic/ed-global";
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
    if (meta.parent?.comp_id === active.comp_id) {
      const active_meta = getCompMeta(p, active.item_id, "is_active");
      if (active_meta) {
        if (active_meta.item.originalId === meta.item.originalId) {
          is_active = true;
        } else if (active_meta.item.id === meta.item.originalId) {
          is_active = true;
        }
      }
    } else {
      is_active = active.item_id === meta.item.originalId;
    }
  }

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

    if (active.comp_id && !p.comp.list[active.comp_id]) {
      active.comp_id = "";
      treeRebuild(p);
      return;
    }

    if (meta.parent?.comp_id) {
      if (active.comp_id) {
        if (active.comp_id === meta.parent?.comp_id) {
          if (meta.item.originalId) {
            if (
              meta.item.component?.id &&
              meta.parent.comp_id === active.comp_id
            ) {
              const cmeta = p.comp.list[active.comp_id].meta;
              for (const val of Object.values(cmeta)) {
                if (
                  val.item.originalId &&
                  val.item.originalId === meta.item.originalId
                ) {
                  if (active.item_id !== val.item.id) {
                    active.item_id = val.item.id;
                  } else {
                    active.instance.comp_id = active.comp_id;
                    active.instance.item_id = active.item_id;
                    active.comp_id = meta.item.component.id;
                    active.item_id = val.item.originalId;
                  }
                }
              }
            } else if (meta.item.originalId !== active.item_id) {
              active.item_id = meta.item.originalId;
            }
          }
        } else {
          if (
            meta.item.component?.id === active.comp_id &&
            meta.item.originalId
          ) {
            active.item_id = meta.item.originalId;
          } else if (meta.parent.instance_id) {
            const pmeta = p.page.meta[meta.parent.instance_id];

            if (pmeta.parent?.comp_id === active.comp_id) {
              const cmeta = p.comp.list[active.comp_id].meta;

              for (const val of Object.values(cmeta)) {
                if (
                  val.item.originalId &&
                  val.item.originalId === pmeta.item.originalId
                ) {
                  if (active.item_id !== val.item.id) {
                    active.item_id = val.item.id;
                  } else if (pmeta.item.component) {
                    active.instance.comp_id = active.comp_id;
                    active.instance.item_id = active.item_id;
                    active.comp_id = pmeta.item.component?.id;
                    active.item_id = val.item.originalId;
                  }
                }
              }
            } else {
              active.comp_id = meta.parent.comp_id;
              active.item_id = meta.parent.id;
            }
          }
        }
      } else {
        if (meta.parent.instance_id) {
          let parent = meta.parent;

          if (
            parent.comp_id &&
            parent.instance_id &&
            p.page.meta[parent.instance_id] &&
            !p.page.meta[parent.instance_id].mitem
          ) {
            while (parent.comp_id && parent.instance_id) {
              const par = p.page.meta[parent.instance_id];
              if (par) {
                if (par.mitem) {
                  if (active.item_id !== par.item.id) {
                    active.item_id = par.item.id;
                  } else {
                    active.instance.comp_id = active.comp_id;
                    active.instance.item_id = active.item_id;
                    active.comp_id = parent.comp_id;
                    const root_id = p.comp.list[parent.comp_id]?.tree.find(
                      (e) => e.parent === "root"
                    )?.id as string;
                    if (root_id) {
                      active.item_id = root_id;
                    }
                  }
                  break;
                }
                parent = par.parent as any;
              } else break;
            }
          } else {
            if (active.item_id !== meta.parent.instance_id) {
              active.item_id = meta.parent.instance_id;
            } else if (parent.comp_id && meta.item.originalId) {
              active.instance.comp_id = active.comp_id;
              active.instance.item_id = active.item_id;
              active.comp_id = parent.comp_id;
              active.item_id = meta.item.originalId;
            }
          }
        }
      }
    } else {
      if (active.comp_id) {
        if (!meta.parent?.comp_id) {
          active.comp_id = "";
        } else if (meta.item.originalId) {
          active.item_id = meta.item.originalId;
        }
      } else {
        active.item_id = meta.item.id;
      }
    }
    active.hover.id = "";
    p.render();
  };
};
