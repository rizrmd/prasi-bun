import { NodeModel, NodeRender } from "@minoru/react-dnd-treeview";
import { useGlobal, useLocal } from "web-utils";
import { EDGlobal } from "../../../logic/ed-global";
import { FC } from "react";
import { pagePicker, reloadPagePicker } from "./page-reload";

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
  const local = useLocal({ renaming: node.id === "", rename_to: "" });
  const item = node.data;
  if (!item) return <></>;

  return (
    <div
      className={cx(
        "flex border-b py-[2px] items-center hover:bg-blue-50 cursor-pointer relative",
        css`
          .btn {
            opacity: 0;
          }
          &:hover .btn {
            opacity: 1;
          }
        `,
        item.id === p.page.cur.id && `bg-blue-50`
      )}
      onClick={() => {
        if (item.type === "folder") {
          onToggle();
        } else if (p.ui.popup.page.open) {
          p.ui.popup.page.open(item.id);
        }
      }}
    >
      <div className="flex w-[40%] items-center relative ">
        {item.id === p.page.cur.id && (
          <div className="absolute left-0 top-0 bottom-0 bg-blue-500 w-1"></div>
        )}
        <div
          className={cx(
            "h-[13px] pl-1",
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
        <div className="flex flex-1 pl-1">
          {local.renaming ? (
            <input
              value={local.rename_to}
              autoFocus
              onBlur={async () => {
                local.renaming = false;
                item.name = local.rename_to;
                if (item.id === "") {
                  if (item.name) {
                    db.page_folder.create({
                      data: { name: local.rename_to, id_site: p.site.id },
                    });
                  }
                  await reloadPagePicker(p);
                } else {
                  db.page_folder.update({
                    where: { id: item.id },
                    data: { name: local.rename_to },
                  });
                }
                local.render();
              }}
              className="border px-1 bg-white flex-1 outline-none mr-1 border-blue-500 "
              onChange={(e) => {
                local.rename_to = e.currentTarget.value;
                local.render();
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") e.currentTarget.blur();
                if (e.key === "Escape") {
                  local.rename_to = item.name;
                  local.render();
                  e.currentTarget.blur();
                }
              }}
            />
          ) : (
            <Name name={item.name} />
          )}
        </div>

        {!local.renaming && (
          <div className="flex pr-2 items-stretch h-[18px] space-x-[2px] text-[10px]">
            {item.type === "folder" && (
              <>
                <div
                  className="btn transition-all bg-white flex items-center border px-1 hover:border-blue-300 hover:bg-blue-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    pagePicker.tree.push({
                      id: "",
                      parent: item.id,
                      text: "",
                      data: {
                        id: "",
                        name: "",
                        type: "folder",
                      },
                    });
                    p.render();
                  }}
                >
                  + Folder
                </div>
                <div
                  className="btn transition-all bg-white flex items-center border px-1 hover:border-blue-300 hover:bg-blue-100"
                  onClick={(e) => {
                    e.stopPropagation();

                    p.ui.popup.page.form = {
                      id_site: p.site.id,
                      id_folder: item.id === "root" ? null : item.id,
                    };
                    p.render();
                  }}
                >
                  + Page
                </div>
              </>
            )}
            {item.id !== "root" && (
              <>
                <div
                  className="btn transition-all bg-white flex items-center border px-1 hover:border-blue-300 hover:bg-blue-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (item.type === "folder") {
                      local.rename_to = item.name;
                      local.renaming = true;
                      local.render();
                    } else {
                      p.ui.popup.page.form = item;
                      p.render();
                    }
                  }}
                >
                  <EditIcon />
                </div>
                <div
                  className="btn transition-all bg-white flex items-center border px-1 hover:border-red-300 hover:bg-red-100"
                  onClick={async (e) => {
                    e.stopPropagation();
                    if (confirm("Deletting cannot be undone. Are you sure ?")) {
                      if (item.type === "folder") {
                        await db.page.updateMany({
                          where: { id_folder: node.id as string },
                          data: {
                            id_folder:
                              node.parent === "root"
                                ? null
                                : (node.parent as string),
                          },
                        });
                        await db.page_folder.update({
                          where: { id: node.id as string },
                          data: {
                            is_deleted: true,
                          },
                        });
                      } else {
                        await db.page.update({
                          where: { id: node.id as string },
                          data: {
                            is_deleted: true,
                          },
                        });
                      }

                      await reloadPagePicker(p);
                    }
                  }}
                >
                  <DeleteIcon />
                </div>
              </>
            )}
          </div>
        )}
      </div>
      <div className="pl-1 flex-1">{item.url}</div>
    </div>
  );
};

const Name: FC<{ name: string }> = ({ name }) => {
  if (name.startsWith("layout:")) {
    return (
      <div className="flex items-center">
        <div className="border border-green-600 text-green-600 mr-1 font-mono text-[8px] px-1 bg-white ">
          LAYOUT
        </div>
        <div>{name.substring("layout:".length)}</div>
      </div>
    );
  }

  return <div>{name}</div>;
};

const DeleteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    fill="none"
    viewBox="0 0 15 15"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M5.5 1a.5.5 0 000 1h4a.5.5 0 000-1h-4zM3 3.5a.5.5 0 01.5-.5h8a.5.5 0 010 1H11v8a1 1 0 01-1 1H5a1 1 0 01-1-1V4h-.5a.5.5 0 01-.5-.5zM5 4h5v8H5V4z"
      clipRule="evenodd"
    ></path>
  </svg>
);
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

const EditIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    ></path>
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
