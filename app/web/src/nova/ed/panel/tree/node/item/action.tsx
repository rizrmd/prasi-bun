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
    <div className="flex items-center pr-1">
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
        <div
          dangerouslySetInnerHTML={{
            __html: `<svg width="12px" height="12px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.96424 2.68571C10.0668 2.42931 9.94209 2.13833 9.6857 2.03577C9.4293 1.93322 9.13832 2.05792 9.03576 2.31432L5.03576 12.3143C4.9332 12.5707 5.05791 12.8617 5.3143 12.9642C5.5707 13.0668 5.86168 12.9421 5.96424 12.6857L9.96424 2.68571ZM3.85355 5.14646C4.04882 5.34172 4.04882 5.6583 3.85355 5.85356L2.20711 7.50001L3.85355 9.14646C4.04882 9.34172 4.04882 9.6583 3.85355 9.85356C3.65829 10.0488 3.34171 10.0488 3.14645 9.85356L1.14645 7.85356C0.951184 7.6583 0.951184 7.34172 1.14645 7.14646L3.14645 5.14646C3.34171 4.9512 3.65829 4.9512 3.85355 5.14646ZM11.1464 5.14646C11.3417 4.9512 11.6583 4.9512 11.8536 5.14646L13.8536 7.14646C14.0488 7.34172 14.0488 7.6583 13.8536 7.85356L11.8536 9.85356C11.6583 10.0488 11.3417 10.0488 11.1464 9.85356C10.9512 9.6583 10.9512 9.34172 11.1464 9.14646L12.7929 7.50001L11.1464 5.85356C10.9512 5.6583 10.9512 5.34172 11.1464 5.14646Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`,
          }}
        ></div>
      </div>
    </div>
  );
};