import { FC, useEffect } from "react";
import { useGlobal } from "web-utils";
import { produceCSS } from "../../../../../utils/css/gen";
import { IItem } from "../../../../../utils/types/item";
import { IText } from "../../../../../utils/types/text";
import { loadComponent } from "../../../logic/comp/load";
import { EDGlobal, PG, active } from "../../../logic/ed-global";
import { EdCompPreviewTree } from "./comp-preview-tree";
import { compPicker, reloadCompPicker } from "./comp-reload";

export const EdCompPreview = () => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const comp_id = p.ui.popup.comp.preview_id;
  const ref = p.comp.list[comp_id];

  const item = ref?.doc?.getMap("map").get("root")?.toJSON() as
    | IItem
    | undefined;

  useEffect(() => {
    if (!p.comp.list[comp_id] && !!comp_id) {
      loadComponent(p, comp_id, false).then(() => {
        p.render();
      });
    }

    let found = compPicker.tree.find((e) => e.id === comp_id);
    if (!found) {
      found = compPicker.trash.find((e) => e.id === comp_id);
    }
    if (found && ref) {
      const root = ref.tree.find((e) => e.parent === "root");
      if (root) {
        if (root.text !== found.text) {
          found.text = root.text;
          _db.component.update({
            where: { id: comp_id },
            data: { name: found.text },
          });
        }
      }
    }
  }, [comp_id]);

  const isTrashed = !!compPicker.trash.find((e) => e.id === comp_id);

  if (!p.ui.popup.comp.preview_id) return null;

  return (
    <div className="flex flex-1 flex-col items-stretch overflow-auto border-l">
      {comp_id && item && (
        <div className="flex px-1 py-1 border-b h-[30px]">
          <div className="flex flex-1 items-center">
            <div>Preview</div>
            <div className="text-[8px] font-mono text-slate-500 mx-1">
              {comp_id}
            </div>
          </div>
          <div className="flex flex-1 justify-end">
            <div
              className={cx(
                "cursor-pointer transition-all  flex items-center border px-1  text-white hover:opacity-50 mr-1",
                !isTrashed
                  ? "border-green-700 bg-green-700"
                  : "border-purple-700 bg-purple-700"
              )}
              onClick={async (e) => {
                e.stopPropagation();

                if (isTrashed) {
                  p.ui.popup.comp_group = {
                    mouse_event: e,
                    async on_pick(group_id) {
                      await _db.component.update({
                        where: { id: comp_id },
                        data: { id_component_group: group_id },
                      });
                      await reloadCompPicker(p);
                      p.render();
                    },
                  };
                } else {
                  if (p.ui.popup.comp.open) {
                    p.ui.popup.comp.open(item.id);
                  }
                  p.ui.popup.comp.open = null;

                  active.item_id = compPicker.active_id;
                  compPicker.active_id = "";
                }

                p.render();
              }}
            >
              {isTrashed ? "Restore Component" : "Select Component"}
            </div>
            <div
              className="cursor-pointer transition-all bg-white flex items-center border px-1 hover:border-red-300 hover:bg-red-100"
              onClick={async (e) => {
                e.stopPropagation();
                if (isTrashed) {
                  if (confirm("Permanently delete this component?")) {
                    await _db.component.delete({
                      where: { id: p.ui.popup.comp.preview_id },
                    });
                    const idx =
                      compPicker.tree.findIndex((e) => e.id === comp_id) + 1;

                    if (idx >= 0 && compPicker.tree[idx])
                      p.ui.popup.comp.preview_id = compPicker.tree[idx]
                        .id as any;

                    compPicker.tree = compPicker.tree.filter(
                      (e) => e.id !== comp_id
                    );
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
              }}
            >
              <DeleteIcon />
            </div>
          </div>
        </div>
      )}
      <div className="relative flex flex-1">
        <div className="absolute inset-0 flex items-center justify-center">
          {comp_id ? (
            <>
              {item && ref ? (
                <div className="flex-1 flex relative w-full h-full">
                  <EdCompPreviewTree tree={ref.tree} />
                  <div
                    className={cx(
                      "flex-1 flex flex-col relative",
                      css`
                        content: contain;
                      `
                    )}
                  >
                    <CItem p={p} item={item} />
                  </div>
                </div>
              ) : (
                <div>Loading...</div>
              )}
            </>
          ) : (
            <>
              Select component
              <br /> to preview
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const CItem: FC<{ item: IItem | IText; p: PG }> = ({ item, p }) => {
  const className = produceCSS(item, {
    mode: p.mode,
  });

  if (item.type === "item") {
    <div className={className}>
      {item.type === "item" &&
        item.childs.map((e) => {
          return <CItem key={e.id} item={e} p={p} />;
        })}
    </div>;
  }

  return (
    <div
      className={className}
      dangerouslySetInnerHTML={
        item.type === "text" ? { __html: item.html } : undefined
      }
    />
  );
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
