import { NodeModel, NodeRender } from "@minoru/react-dnd-treeview";
import { FC, ReactNode } from "react";
import { useGlobal, useLocal } from "web-utils";
import { EDGlobal, active } from "../../../logic/ed-global";
import { compPicker, reloadCompPicker } from "./comp-reload";
import { treeRebuild } from "../../../logic/tree/build";

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

  return (
    <div
      className={cx(
        "flex hover:bg-blue-50 cursor-pointer",
        css`
          .btn {
            opacity: 0;
          }
          &:hover .btn {
            opacity: 1;
          }
        `,
        item.id === p.page.cur.id && `bg-blue-50`,
        item.type === "component" && "m-1 border flex-1",
        item.type === "folder" && "border-t py-[2px] items-center",
        item.id === p.ui.popup.comp.preview_id &&
          css`
            border: 1px solid blue !important;
          `
      )}
      onClick={() => {
        if (item.type === "folder") {
          onToggle();
        } else {
          if (p.ui.popup.comp.preview_id !== item.id) {
            p.ui.popup.comp.preview_id = item.id;
          } else {
            p.ui.popup.comp.preview_id = "";
          }
          p.render();
        }
      }}
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
          "flex flex-1 px-1",
          item.type === "component" && "border-r"
        )}
      >
        {local.renaming ? (
          <input
            value={local.rename_to}
            autoFocus
            onBlur={async () => {
              local.renaming = false;
              item.name = local.rename_to;
              if (item.id === "") {
                if (item.name) {
                  _db.page_folder.create({
                    data: { name: local.rename_to, id_site: p.site.id },
                  });
                }
                await reloadCompPicker(p);
              } else {
                _db.page_folder.update({
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
          <Name name={node.text} />
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
          }}
        >
          <div className="normal">
            <PlayIcon />
          </div>
          <div className="over hidden">
            {isTrashed ? <ResetIcon /> : <CheckIcon />}
          </div>
        </div>
      )}
    </div>
  );
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
