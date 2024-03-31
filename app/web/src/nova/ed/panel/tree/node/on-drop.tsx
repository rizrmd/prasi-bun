import { DropOptions, NodeModel } from "@minoru/react-dnd-treeview";
import get from "lodash.get";
import { IContent, MContent } from "../../../../../utils/types/general";
import { getMetaById } from "../../../logic/active/get-meta";
import { IMeta, PG, active } from "../../../logic/ed-global";
import { fillID } from "../../../logic/tree/fill-id";
import { treeRebuild } from "../../../logic/tree/build";

export const nodeOnDrop: (
  p: PG,
  tree: NodeModel<IMeta>[],
  options: DropOptions<IMeta>
) => void = (p, tree, options) => {
  const { dragSource, dropTarget, relativeIndex, dragSourceId, dropTargetId } =
    options;

  if (
    dragSource?.data &&
    dropTarget &&
    typeof dragSourceId === "string" &&
    typeof dropTargetId === "string"
  ) {
    let fromMeta = getMetaById(p, dragSourceId);
    let toMeta = getMetaById(p, dropTargetId);
    if (fromMeta && toMeta) {
      const pmeta = active.comp_id
        ? p.comp.list[active.comp_id].meta
        : p.page.meta;
      let to = toMeta.parent?.instance_id
        ? pmeta[toMeta.parent.instance_id].mitem
        : toMeta.mitem;
      let from = fromMeta.mitem;

      if (to) {
        if (to.get("component")?.get("id")) {
          if (!toMeta.item.component?.id) {
            to.doc?.transact(() => {
              if (toMeta?.mitem && from && typeof relativeIndex === "number") {
                const toChilds = toMeta.mitem.get("childs");
                if (toChilds) {
                  const map = new Y.Map();
                  syncronize(map, fillID(from.toJSON() as any));
                  toChilds.insert(relativeIndex, [map]);
                }

                if (!fromMeta?.jsx_prop?.is_root) {
                  from.parent.forEach((e, idx) => {
                    if (
                      from &&
                      !!e &&
                      !!e.get &&
                      e.get("id") === from.get("id")
                    ) {
                      from.parent.delete(idx);
                    }
                  });
                }
              }
            });

            treeRebuild(p);
            p.render();
          } else {
            const child_id = toMeta.item.component?.props?.child?.content?.id;
            if (child_id) {
              const child_meta = getMetaById(p, child_id);
              if (child_meta) {
                to.doc?.transact(() => {
                  if (
                    child_meta.mitem &&
                    from &&
                    typeof relativeIndex === "number"
                  ) {
                    const toChilds = child_meta.mitem.get("childs");
                    if (toChilds) {
                      const map = new Y.Map();
                      syncronize(map, fillID(from.toJSON() as any));
                      toChilds.insert(relativeIndex, [map]);
                    }

                    if (!fromMeta?.jsx_prop?.is_root) {
                      from.parent.forEach((e, idx) => {
                        if (
                          from &&
                          !!e &&
                          !!e.get &&
                          e.get("id") === from.get("id")
                        ) {
                          from.parent.delete(idx);
                        }
                      });
                    }
                  }
                });

                treeRebuild(p);
                p.render();
              }
            }
          }

          return null;
        }

        to.doc?.transact(() => {
          if (to && from && typeof relativeIndex === "number") {
            const toChilds = to.get("childs");
            if (toChilds) {
              const map = new Y.Map();
              syncronize(map, fillID(from.toJSON() as any));
              toChilds.insert(relativeIndex, [map]);
            }

            if (!fromMeta?.jsx_prop?.is_root) {
              from.parent.forEach((e, idx) => {
                if (from && !!e && !!e.get && e.get("id") === from.get("id")) {
                  from.parent.delete(idx);
                }
              });
            }
          }
        });
        treeRebuild(p);
        p.render();
      }
    }
  }
};

export const canDrop = (p: PG, arg: DropOptions<IMeta>) => {
  const { dragSource, dragSourceId, dropTargetId, dropTarget } = arg;
  try {
    const parentSource: MContent | undefined = get(
      dragSource,
      "data.item.parent.parent"
    ) as any;
    if (parentSource && parentSource.get && parentSource.get("id") === "root") {
      return false;
    }

    if (dropTargetId === "root") {
      const ds = get(dragSource, "data.item") as IContent;
      if (ds && ds.type === "section") {
        return true;
      }
      return false;
    } else if (dragSource?.data && dropTarget?.data) {
      const from = (dragSource.data.item as IContent).type;
      const to = (dropTarget.data.item as IContent).type;

      if (from === "section" || from === "item") {
        let parentMeta: IMeta | undefined = dropTarget.data;
        while (parentMeta) {
          if (parentMeta.item.id === dragSource.data.item.id) {
            return false;
          }
          if (parentMeta.parent?.id) {
            parentMeta = getMetaById(p, parentMeta.parent.id);
          } else {
            break;
          }
        }
      }

      if (from === "section" || to === "text") {
        return false;
      } else if (from === "item") {
        if (to === "section" || to === "item") {
          return true;
        } else {
          return false;
        }
      } else if (from === "text") {
        if (to === "item" || to === "section") {
          return true;
        }
      }

      return false;
    }
  } catch (e) {
    console.log(e);
    return false;
  }
};
