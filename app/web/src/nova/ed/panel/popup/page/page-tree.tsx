import { NodeModel, NodeRender } from "@minoru/react-dnd-treeview";
import { useGlobal } from "web-utils";
import { EDGlobal } from "../../../logic/ed-global";

export type PageItem = {
  id: string;
  name: string;
  url?: string;
  type: "page" | "folder";
};
export const edPageTreeRender: NodeRender<PageItem> = (
  node: NodeModel<PageItem>,
  { depth, isOpen, onToggle }
) => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const item = node.data;
  if (!item) return <></>;
  return (
    <div
      className="px-1 pl-2 flex border-b py-[2px] items-center hover:bg-blue-50 cursor-pointer relative"
      onClick={() => {
        if (item.type === "folder") {
          onToggle();
        } else if (p.ui.popup.page.open) {
          p.ui.popup.page.open(item.id);
        }
      }}
    >
      {item.id === p.page.cur.id && (
        <div className="absolute left-0 top-0 bottom-0 bg-blue-500 w-1"></div>
      )}
      <div
        className={cx(
          "h-[13px] ",
          css`
            width: ${depth * 13}px;
          `
        )}
      ></div>
      {item.type === "folder" && (
        <>
          {isOpen && <FolderOpen />}
          {!isOpen && <FolderClose />}
        </>
      )}
      <div className="pl-1 flex-1">{item.name}</div>
      <div className="pl-1 flex-1">{item.url}</div>
    </div>
  );
};

const FolderClose = () => (
  <svg
    fill="currentColor"
    viewBox="0 0 20 20"
    strokeWidth={1}
    width={13}
    height={13}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
  </svg>
);

const FolderOpen = () => (
  <svg
    fill="currentColor"
    strokeWidth={1}
    width={13}
    height={13}
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      clipRule="evenodd"
      fillRule="evenodd"
      d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
    />
    <path d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
  </svg>
);
