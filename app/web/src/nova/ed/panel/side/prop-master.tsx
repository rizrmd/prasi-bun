import {
  Tree as DNDTree,
  DndProvider,
  NodeModel,
  PlaceholderRender,
  getBackendOptions,
} from "@minoru/react-dnd-treeview";
import { FC } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useGlobal, useLocal } from "web-utils";
import { IItem } from "../../../../utils/types/item";
import { FMCompDef } from "../../../../utils/types/meta-fn";
import { EDGlobal, EdMeta } from "../../logic/ed-global";
import { EdPropCompTreeItem, PropItem } from "./prop-master/tree-item";
import { propPopover } from "./prop-master/prop-form";

const propRef = {
  el: null as any,
};

export const EdSidePropComp: FC<{ meta: EdMeta }> = ({ meta }) => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal({});
  const item = meta?.item as IItem;
  if (!item) return null;
  const TypedTree = DNDTree<PropItem>;

  let filtered = [] as NodeModel<PropItem>[];
  const mprops = meta.mitem?.get("component")?.get("props");
  if (mprops && meta.mitem) {
    mprops.forEach((m, key) => {
      filtered.push({
        id: `${item.id}-${key}`,
        parent: "root",
        text: key,
        droppable: true,
        data: {
          mitem: meta.mitem as any,
          prop: m.toJSON() as any,
          mprop: m,
          name: key,
        },
      });
    });

    filtered = filtered.sort((a, b) => {
      if (a.data && b.data) {
        return a.data.prop.idx - b.data.prop.idx;
      }
      return 0;
    });
  }

  return (
    <div className="flex flex-col text-[12px] flex-1">
      <div className="flex border-b p-1 h-[35px] items-center bg-slate-50 justify-between select-none">
        <div className="flex-1 overflow-hidden mr-2 text-ellipsis whitespace-nowrap">
          {item.name}
        </div>
        <div
          className="border px-1 cursor-pointer bg-white hover:bg-blue-100"
          onClick={() => {
            p.ui.side.prop = false;
            p.render();
          }}
        >
          Close
        </div>
      </div>
      <div className="flex flex-1 relative overflow-auto">
        <div
          className={cx("absolute inset-0")}
          ref={(ref) => (propRef.el = ref)}
        >
          <DndProvider
            backend={HTML5Backend}
            options={getBackendOptions({
              html5: {
                rootElement: propRef.el,
              },
            })}
          >
            <TypedTree
              tree={filtered}
              sort={false}
              onDrop={(tree, { dragSourceId, relativeIndex }) => {
                const doc = meta.mitem?.doc;
                doc?.transact(() => {
                  mprops?.forEach((p, key) => {
                    const idx = tree.findIndex(
                      (e) => `${item.id}-${key}` === e.id
                    );
                    if (idx >= 0) {
                      p.set("idx", idx);
                    }
                  });
                });
              }}
              render={(node, params) => (
                <EdPropCompTreeItem
                  node={node}
                  params={params}
                  render={local.render}
                />
              )}
              rootId={"root"}
              classes={treeClasses}
              dropTargetOffset={10}
              initialOpen={true}
              placeholderRender={(node, params) => (
                <Placeholder node={node} params={params} />
              )}
              dragPreviewRender={() => <></>}
            />
          </DndProvider>
          <div
            className="m-1 border border-blue-200 px-2 self-start text-[13px] hover:bg-blue-100 cursor-pointer"
            onClick={() => {
              if (mprops) {
                const indexes: (number | undefined)[] = [];
                mprops.forEach((e) => indexes.push(e.get("idx")));
                let idx: any = (indexes.sort().pop() || 0) + 1;
                const name = `prop_${idx + 1}`;
                const map = new Y.Map() as FMCompDef;
                syncronize(map, {
                  idx: idx,
                  name,
                  type: "string",
                  value: '"hello"',
                  valueBuilt: '"hello"',
                  meta: {
                    type: "text",
                  },
                });
                mprops.set(name, map);
                propPopover.name = name;
                p.render();
              }
            }}
          >
            + New Prop
          </div>
        </div>
      </div>
    </div>
  );
};

const treeClasses = {
  container: "flex flex-col flex-1",
  dropTarget: "drop-target",
  placeholder: "placeholder",
  draggingSource: css`
    background: #e4f0ff;

    cursor: not-allowed;
  `,
};

export const Placeholder: FC<{
  node: Parameters<PlaceholderRender<PropItem>>[0];
  params: Parameters<PlaceholderRender<PropItem>>[1];
}> = ({ params }) => {
  return (
    <div
      className={cx(
        "flex items-center bg-blue-50",
        css`
          height: 10px;
          z-index: 99;
          position: absolute;
          left: 0px;
          transform: translateY(-50%);
          right: 0px;
        `
      )}
    >
      <div
        className={cx(
          "flex-1",
          css`
            background-color: #1b73e8;
            height: 2px;
          `
        )}
      ></div>
    </div>
  );
};
