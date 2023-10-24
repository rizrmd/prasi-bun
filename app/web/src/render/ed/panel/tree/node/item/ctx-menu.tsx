import { NodeModel, RenderParams } from "@minoru/react-dnd-treeview";
import { useGlobal, useLocal } from "web-utils";
import { IItem } from "../../../../../../utils/types/item";
import { FNComponent } from "../../../../../../utils/types/meta-fn";
import { Menu, MenuItem } from "../../../../../../utils/ui/context-menu";
import { EDGlobal, EdMeta } from "../../../../logic/ed-global";
import { edActionAttach } from "./action/attach";
import { edActionClone } from "./action/clone";
import { edActionCopy } from "./action/copy";
import { edActionCut } from "./action/cut";
import { edActionDetach } from "./action/detach";
import { edActionHide } from "./action/hide";
import { edActionNewComp } from "./action/new-comp";
import { edActionPaste } from "./action/paste";
import { edActionWrap } from "./action/wrap";
import { edActionUnwrap } from "./action/unwrap";

export const EdTreeCtxMenu = ({
  node,
  prm,
  event,
  onClose,
}: {
  event: React.MouseEvent<HTMLDivElement, MouseEvent>;
  node: NodeModel<EdMeta>;
  prm: RenderParams;
  onClose: () => void;
}) => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal({ allowCopy: false, allowPaste: false }, async () => {
    const permissionStatus = await navigator.permissions.query({
      name: "clipboard-read",
      allowWithoutGesture: false,
    } as any);
    if (permissionStatus.state === "granted") {
      local.allowCopy = true;
      local.render();

      navigator.clipboard
        .readText()
        .then((e) => {
          if (e.startsWith("prasi-clipboard:")) {
            local.allowPaste = true;
            local.render();
          }
        })
        .catch(() => {});
    }
  });
  const item = node.data?.item;
  const type = item?.type;
  const comp = (item as IItem).component as FNComponent | undefined;
  const rootComp = p.comp.cur;
  const isComponent = comp?.id;
  const isActiveComponent = rootComp && rootComp.id === item?.id && rootComp.id;

  if (!item) {
    return (
      <Menu mouseEvent={event} onClose={onClose}>
        <MenuItem
          disabled
          label={<div className="text-slate-500">Unavailable</div>}
        />
      </Menu>
    );
  }

  return (
    <Menu mouseEvent={event} onClose={onClose}>
      {type === "item" && !isActiveComponent && !item.component?.id && (
        <MenuItem
          label="Attach Component"
          onClick={() => edActionAttach(p, item)}
        />
      )}
      {type === "item" && comp?.id && !isActiveComponent && (
        <MenuItem
          label="Detach Component"
          onClick={() => edActionDetach(p, item)}
        />
      )}
      {type === "item" && !comp?.id && (
        <MenuItem
          label="Create Component"
          onClick={(e) => edActionNewComp(p, item, e)}
        />
      )}
      {!item.hidden && (
        <MenuItem label="Hide" onClick={() => edActionHide(p, item)} />
      )}
      <MenuItem label="Clone" onClick={() => edActionClone(p, item)} />
      <MenuItem label="Cut" onClick={() => edActionCut(p, item)} />
      <MenuItem label="Copy" onClick={() => edActionCopy(p, item)} />
      {local.allowCopy &&
        local.allowPaste &&
        !isComponent &&
        item.type !== "text" && (
          <MenuItem label="Paste" onClick={() => edActionPaste(p, item)} />
        )}
      {["text", "item"].includes(item.type) && (
        <MenuItem label="Wrap" onClick={() => edActionWrap(p, item as IItem)} />
      )}
      {["item"].includes(item.type) && !isComponent && (
        <MenuItem
          label="Unwrap"
          onClick={() => edActionUnwrap(p, item as IItem)}
        />
      )}
    </Menu>
  );
};
