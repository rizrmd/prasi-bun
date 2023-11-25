import { NodeModel, RenderParams } from "@minoru/react-dnd-treeview";
import { EDGlobal, EdMeta } from "../../../../logic/ed-global";
import { useGlobal, useLocal } from "web-utils";
import { useEffect } from "react";

export const EdTreeName = ({
  node,
  prm,
}: {
  node: NodeModel<EdMeta>;
  prm: RenderParams;
}) => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal({
    rename: "",
  });
  useEffect(() => {
    local.rename = item?.name || "";
  }, [p.ui.tree.rename_id]);

  const item = node.data?.item;
  const mitem = node.data?.mitem;

  if (!item || !mitem) return <></>;

  const isRenaming = p.ui.tree.rename_id === item.id;
  return (
    <div className="text-[14px] relative flex flex-col justify-center cursor-pointer flex-1">
      <div className="text-[10px]">{item.id}</div>

      {isRenaming ? (
        <input
          className={cx(
            "absolute inset-0 outline-none border border-blue-500 my-[2px] mr-[1px] px-1"
          )}
          autoFocus
          spellCheck={false}
          value={local.rename}
          onFocus={(e) => {
            e.currentTarget.select();
          }}
          onBlur={() => {
            item.name = local.rename;
            mitem.set("name", item.name);
            p.ui.tree.rename_id = "";
            p.render();
          }}
          onKeyDown={(e) => {
            e.stopPropagation();
            if (e.key === "Enter" || e.key === "Escape") {
              if (e.key === "Escape") {
                local.rename = item.name;
              } else {
                item.name = local.rename;
                mitem.set("name", item.name);
              }

              p.ui.tree.rename_id = "";
              p.render();
              setTimeout(() => {
                const el = document.querySelector(
                  `.tree-${item.id}`
                ) as HTMLInputElement;
                if (el) el.focus();
              });
            }
          }}
          onChange={(e) => {
            local.rename = e.target.value;
            p.render();
          }}
        />
      ) : (
        <div className="flex flex-col">
          {node.text}
          {/* <div className={"text-[11px] text-gray-500 -mt-1"}>{item.id}</div> */}
        </div>
      )}
    </div>
  );
};
