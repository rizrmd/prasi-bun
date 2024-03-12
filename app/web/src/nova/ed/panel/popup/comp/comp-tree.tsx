import { NodeModel, NodeRender } from "@minoru/react-dnd-treeview";
import { FC, ReactNode } from "react";
import { useGlobal, useLocal } from "web-utils";
import { EDGlobal, active } from "../../../logic/ed-global";
import { compPicker, reloadCompPicker } from "./comp-reload";
import { treeRebuild } from "../../../logic/tree/build";
import tc from "tinycolor2";
export type CompItem = {
  id: string;
  name: string;
  type: "component" | "folder";
};
export const edPageTreeRender: NodeRender<CompItem> = (
  node: NodeModel<CompItem>,
  { depth, isOpen, onToggle }
) => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal({ renaming: node.id === "", rename_to: "" });
  const item = node.data;
  if (!item) return <></>;

  const isTrashed = !!compPicker.trash.find((e) => e.id === item.id);

  const addComponent = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (isTrashed) {
      p.ui.popup.comp.preview_id = item.id;
      p.ui.popup.comp_group = {
        mouse_event: e,
        async on_pick(group_id) {
          await _db.component.update({
            where: { id: item.id },
            data: { id_component_group: group_id },
          });
          await reloadCompPicker(p);
          treeRebuild(p);
          p.render();
        },
      };
      p.render();
    } else {
      if (p.ui.popup.comp.open) {
        p.ui.popup.comp.open(item.id);
      }
      p.ui.popup.comp.open = null;
      active.item_id = compPicker.active_id;
      compPicker.active_id = "";
      treeRebuild(p);
      p.render();
    }
  };

  const delComponent = async (comp_id: string) => {
    if (isTrashed) {
      if (confirm("Permanently delete this component?")) {
        await _db.component.delete({
          where: { id: comp_id },
        });
        await reloadCompPicker(p);
        p.render();
      }
    } else {
      if (confirm("Move component to trash?")) {
        await _db.component.update({
          where: { id: comp_id },
          data: { id_component_group: compPicker.trash_id },
        });
        await reloadCompPicker(p);
        p.render();
      }
    }
  };

  return (
    <div
      className={cx(
        "flex flex-col hover:bg-blue-50 cursor-pointer",
        css`
          .btn {
            opacity: 0;
          }
          &:hover .btn {
            opacity: 1;
          }
        `,
        item.id === p.page.cur.id && `bg-blue-50`,
        item.type === "component" && "ml-1 mr-2 mb-3 border flex-1",
        item.type === "component" &&
          css`
            min-width: 190px;
          `,
        item.type === "folder" && "border-t py-[2px] ",
        item.id === p.ui.popup.comp.preview_id &&
          css`
            border: 1px solid blue !important;
          `
      )}
      onClick={(e) => {
        if (item.type === "folder") {
          onToggle();
        } else {
          addComponent(e);
        }
      }}
    >
      {item.type === "component" && <Pic name={item.name} />}
      <div
        className={cx(
          "flex",
          item.type === "component" && "items-stretch",
          item.type === "folder" && "items-center"
        )}
      >
        {item.id === p.page.cur.id && (
          <div className="absolute left-0 top-0 bottom-0 bg-blue-500 w-1"></div>
        )}
        <div
          className={cx(
            "h-[13px]",
            item.type === "folder" && "pl-1",
            item.type === "component" && "hidden"
          )}
        ></div>
        {item.type === "folder" && (
          <>
            {isOpen && <FolderOpen />}
            {!isOpen && <FolderClose />}
          </>
        )}
        <div
          className={cx(
            "flex flex-1 px-1 items-center",
            item.type === "component" && "border-r"
          )}
        >
          {local.renaming ? (
            <input
              value={local.rename_to}
              autoFocus
              spellCheck={false}
              onBlur={async () => {
                local.renaming = false;
                if (local.rename_to) {
                  item.name = local.rename_to;
                  local.render();
                  if (item.id === "") {
                    if (item.name) {
                    }
                  } else {
                    item.name = local.rename_to;
                    await _db.component_group.update({
                      where: { id: item.id },
                      data: { name: local.rename_to },
                    });
                  }
                  await reloadCompPicker(p);
                }
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
            <Name name={node.text} />
          )}
          {item.type === "folder" && (
            <div
              className="ml-1 p-1 border border-transparent hover:border-slate-400 bg-white rounded-sm"
              onClick={(e) => {
                e.stopPropagation();
                local.rename_to = item.name;
                local.renaming = true;
                local.render();
              }}
              dangerouslySetInnerHTML={{
                __html: `<svg width="11" height="11" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.5 1C6.22386 1 6 1.22386 6 1.5C6 1.77614 6.22386 2 6.5 2C7.12671 2 7.45718 2.20028 7.65563 2.47812C7.8781 2.78957 8 3.28837 8 4V11C8 11.7116 7.8781 12.2104 7.65563 12.5219C7.45718 12.7997 7.12671 13 6.5 13C6.22386 13 6 13.2239 6 13.5C6 13.7761 6.22386 14 6.5 14C7.37329 14 8.04282 13.7003 8.46937 13.1031C8.47976 13.0886 8.48997 13.0739 8.5 13.0591C8.51003 13.0739 8.52024 13.0886 8.53063 13.1031C8.95718 13.7003 9.62671 14 10.5 14C10.7761 14 11 13.7761 11 13.5C11 13.2239 10.7761 13 10.5 13C9.87329 13 9.54282 12.7997 9.34437 12.5219C9.1219 12.2104 9 11.7116 9 11V4C9 3.28837 9.1219 2.78957 9.34437 2.47812C9.54282 2.20028 9.87329 2 10.5 2C10.7761 2 11 1.77614 11 1.5C11 1.22386 10.7761 1 10.5 1C9.62671 1 8.95718 1.29972 8.53063 1.89688C8.52024 1.91143 8.51003 1.92611 8.5 1.9409C8.48997 1.92611 8.47976 1.91143 8.46937 1.89688C8.04282 1.29972 7.37329 1 6.5 1ZM14 5H11V4H14C14.5523 4 15 4.44772 15 5V10C15 10.5523 14.5523 11 14 11H11V10H14V5ZM6 4V5H1L1 10H6V11H1C0.447715 11 0 10.5523 0 10V5C0 4.44772 0.447715 4 1 4H6Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`,
              }}
            ></div>
          )}
        </div>

        {item.type === "component" && (
          <div
            className={cx(
              "transition-all bg-white flex items-center px-1 hover:border-blue-300 hover:bg-blue-100 opacity-20 hover:opacity-100",
              css`
                &:hover {
                  .normal {
                    display: none;
                  }
                  .over {
                    display: block;
                  }
                }
              `
            )}
            onClick={async (e) => {
              e.stopPropagation();
              delComponent(item.id);
            }}
          >
            <div className="normal">
              <DeleteIcon />
            </div>
            <div className="over hidden text-red-600">
              <DeleteIcon />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const colorize = (str: string) => {
  let hash = 0;
  if (str.length === 0) return "";
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  var color = "#";
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 255;
    color += ("00" + value.toString(16)).substr(-2);
  }
  return color;
};

const Name: FC<{ name: ReactNode }> = ({ name }) => {
  if (typeof name !== "string") return name;
  if (name === "__TRASH__") return "Trash";

  if (name.startsWith("layout::")) {
    return (
      <div className="flex items-center">
        <div className="border border-green-600 text-green-600 mr-1 font-mono text-[10px] px-1 bg-white ">
          LAYOUT
        </div>
        <div>{name.substring("layout::".length)}</div>
      </div>
    );
  }

  return <div>{name}</div>;
};

const Pic: FC<{ name: string }> = ({ name }) => {
  const bg = colorize(name);
  const fg = tc(bg);
  return (
    <div
      className={cx(
        "capitalize text-center flex items-center justify-center font-black",
        css`
          height: 50px;
          background-color: ${bg};
          opacity: 0.8;
          color: ${fg.isDark() ? "white" : "black"};
        `
      )}
    >
      {name.split("_").join(" ")}
    </div>
  );
};

const CheckIcon = () => (
  <div
    dangerouslySetInnerHTML={{
      __html: `<svg width="12" height="12" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.49991 0.877045C3.84222 0.877045 0.877075 3.84219 0.877075 7.49988C0.877075 11.1575 3.84222 14.1227 7.49991 14.1227C11.1576 14.1227 14.1227 11.1575 14.1227 7.49988C14.1227 3.84219 11.1576 0.877045 7.49991 0.877045ZM1.82708 7.49988C1.82708 4.36686 4.36689 1.82704 7.49991 1.82704C10.6329 1.82704 13.1727 4.36686 13.1727 7.49988C13.1727 10.6329 10.6329 13.1727 7.49991 13.1727C4.36689 13.1727 1.82708 10.6329 1.82708 7.49988ZM10.1589 5.53774C10.3178 5.31191 10.2636 5.00001 10.0378 4.84109C9.81194 4.68217 9.50004 4.73642 9.34112 4.96225L6.51977 8.97154L5.35681 7.78706C5.16334 7.59002 4.84677 7.58711 4.64973 7.78058C4.45268 7.97404 4.44978 8.29061 4.64325 8.48765L6.22658 10.1003C6.33054 10.2062 6.47617 10.2604 6.62407 10.2483C6.77197 10.2363 6.90686 10.1591 6.99226 10.0377L10.1589 5.53774Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`,
    }}
  ></div>
);

const ResetIcon = () => (
  <div
    dangerouslySetInnerHTML={{
      __html: `<svg width="12" height="12" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.85355 2.14645C5.04882 2.34171 5.04882 2.65829 4.85355 2.85355L3.70711 4H9C11.4853 4 13.5 6.01472 13.5 8.5C13.5 10.9853 11.4853 13 9 13H5C4.72386 13 4.5 12.7761 4.5 12.5C4.5 12.2239 4.72386 12 5 12H9C10.933 12 12.5 10.433 12.5 8.5C12.5 6.567 10.933 5 9 5H3.70711L4.85355 6.14645C5.04882 6.34171 5.04882 6.65829 4.85355 6.85355C4.65829 7.04882 4.34171 7.04882 4.14645 6.85355L2.14645 4.85355C1.95118 4.65829 1.95118 4.34171 2.14645 4.14645L4.14645 2.14645C4.34171 1.95118 4.65829 1.95118 4.85355 2.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`,
    }}
  ></div>
);

const PlayIcon = () => (
  <div
    dangerouslySetInnerHTML={{
      __html: `<svg width="12" height="12" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.24182 2.32181C3.3919 2.23132 3.5784 2.22601 3.73338 2.30781L12.7334 7.05781C12.8974 7.14436 13 7.31457 13 7.5C13 7.68543 12.8974 7.85564 12.7334 7.94219L3.73338 12.6922C3.5784 12.774 3.3919 12.7687 3.24182 12.6782C3.09175 12.5877 3 12.4252 3 12.25V2.75C3 2.57476 3.09175 2.4123 3.24182 2.32181ZM4 3.57925V11.4207L11.4288 7.5L4 3.57925Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`,
    }}
  ></div>
);

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
