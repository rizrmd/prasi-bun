import { DropOptions, NodeModel } from "@minoru/react-dnd-treeview";
import get from "lodash.get";
import { MContent } from "../../../../../utils/types/general";
import { EdMeta, PG, active } from "../../../logic/ed-global";
import { getMetaById } from "../../../logic/tree/build";

export const nodeOnDrop: (
  tree: NodeModel<EdMeta>[],
  options: DropOptions<EdMeta>
) => void = () => {};

export const canDrop = (p: PG, arg: DropOptions<EdMeta>) => {
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
      const ds = get(dragSource, "data.item");
      if (ds && ds.type === "section") {
        return true;
      }
      return false;
    } else if (dragSource?.data && dropTarget?.data) {
      const from = dragSource.data.item.type;
      const to = dropTarget.data.item.type;

      if (from === "section" || from === "item") {
        let parent: EdMeta | undefined = dropTarget.data;
        while (parent) {
          if (parent.item.id === dragSource.data.item.id) {
            return false;
          }
          parent = getMetaById(p, parent.parent_item.id);
        }
      }

      if (from === "section" || to === "text") {
        return false;
      } else if (from === "item") {
        if (to === "section" || to === "item") {
          if (
            dropTarget.data.item.type === "item" &&
            dropTarget.data.item.component?.id
          ) {
            if (p.comp) {
              if (active.comp_id === dropTarget.data.item.component?.id) {
                return true;
              }
            }
            return false;
          }
          return true;
        } else {
          return false;
        }
      } else if (from === "text") {
        if (to === "item") {
          if (
            dropTarget.data.item.type === "item" &&
            dropTarget.data.item.component?.id
          ) {
            if (p.comp) {
              if (active.comp_id === dropTarget.data.item.component.id) {
                return true;
              }
            }
            return false;
          }
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
