import { NodeModel, RenderParams } from "@minoru/react-dnd-treeview";
import { EDGlobal, EdMeta } from "../../../../logic/ed-global";
import { useGlobal } from "web-utils";

export const EdTreeAction = ({
  node,
  prm,
}: {
  node: NodeModel<EdMeta>;
  prm: RenderParams;
}) => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const item = node.data?.item;
  if (!item) return null;
  return (
    <div className="flex items-center pr-2">
      <div
        className={cx(
          "border rounded-sm text-[9px] flex w-[20px] h-[15px] items-center cursor-pointer justify-center uppercase",
          item.adv?.js || item.adv?.css || item.adv?.html
            ? `opacity-100`
            : cx(
                `opacity-0 action-script transition-all`,
                css`
                  &:hover {
                    opacity: 1 !important;
                  }
                `
              ),
          !(item.adv?.js || item.adv?.css || item.adv?.html) &&
            `bg-orange-100  border-orange-200 hover:border-orange-500 hover:text-orange-900 hover:bg-orange-300`,
          item.adv?.js &&
            `bg-orange-100  border-orange-200 hover:border-orange-500 hover:text-orange-900 hover:bg-orange-300`,
          item.adv?.css &&
            `bg-green-100  border-green-200 hover:border-green-500 hover:text-green-900 hover:bg-green-300`,
          item.adv?.html &&
            `bg-blue-100  border-blue-200 hover:border-blue-500 hover:text-blue-900 hover:bg-blue-300`
        )}
        onClick={() => {
          p.ui.popup.script.open = true;
          p.render();
        }}
      >
        {"</>"}
      </div>
    </div>
  );
};
