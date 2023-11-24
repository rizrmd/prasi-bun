import { NodeModel, RenderParams } from "@minoru/react-dnd-treeview";
import { useGlobal, useLocal } from "web-utils";
import { IItem } from "../../../../../../utils/types/item";
import { FNComponent } from "../../../../../../utils/types/meta-fn";
import { Menu, MenuItem } from "../../../../../../utils/ui/context-menu";
import { EDGlobal, EdMeta, active } from "../../../../logic/ed-global";
import { edActionAttach } from "./action/attach";
import { edActionClone } from "./action/clone";
import { edActionCopy } from "./action/copy";
import { edActionCut } from "./action/cut";
import { edActionDelete } from "./action/del";
import { edActionDetach } from "./action/detach";
import { edActionHide } from "./action/hide";
import { edActionNewComp } from "./action/new-comp";
import { edActionPaste } from "./action/paste";
import { edActionRename } from "./action/rename";
import { edActionUnwrap } from "./action/unwrap";
import { edActionWrap } from "./action/wrap";

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
  const isComponent = comp?.id;
  const isActiveComponent = active.comp_id === item?.id;

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
      <MenuItem
        label={item.hidden ? "Unhide" : "Hide"}
        onClick={() => edActionHide(p, item)}
      />
      {!isComponent && (
        <MenuItem
          label="Rename"
          hotKey={"↵"}
          onClick={() => edActionRename(p, item)}
        />
      )}
      <MenuItem
        label="Cut"
        // hotKey={<HotKey shortcut={"X"} />}
        onClick={() => edActionCut(p, item)}
      />
      <MenuItem
        label="Delete"
        hotKey="⌫"
        onClick={() => edActionDelete(p, item)}
      />
      <MenuItem label="Clone" onClick={() => edActionClone(p, item)} />
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

const HotKey = (arg: { shortcut: string }) => {
  const ctrl =
    navigator.platform.toUpperCase().indexOf("MAC") >= 0 ? (
      <div>⌘</div>
    ) : (
      <div className="text-[8px]">CTRL</div>
    );
  return (
    <div className="hot-key border border-slate-400 text-[10px] rounded-[3px] px-1 -mr-[2px] flex items-center space-x-1">
      {ctrl}
      <div>+</div> <div>{arg.shortcut}</div>
    </div>
  );
};
