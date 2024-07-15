import {
  Tree as DNDTree,
  DndProvider,
  NodeModel,
  PlaceholderRender,
  getBackendOptions,
} from "@minoru/react-dnd-treeview";
import { FC, useState } from "react";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useGlobal, useLocal } from "web-utils";
import { IItem } from "../../../../utils/types/item";
import { FMCompDef } from "../../../../utils/types/meta-fn";
import { EDGlobal, IMeta, active } from "../../logic/ed-global";
import { treeRebuild } from "../../logic/tree/build";
import { propPopover } from "./prop-master/prop-form";
import { EdPropCompTreeItem, PropItem } from "./prop-master/tree-item";
import { Popover } from "../../../../utils/ui/popover";
import { SimpleMonaco } from "./simple-monaco";

const propRef = {
  el: null as any,
};

export const EdSidePropComp: FC<{ meta: IMeta }> = ({ meta }) => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const item = meta?.item as IItem;
  const local = useLocal({
    json: "",
    typings: "",
    openJSON: false,
    openTypings: false,
  });
  const [_, set] = useState({});
  const render = () => {
    set({});
  };
  propPopover.render = render;
  if (!item) return null;

  const TypedTree = DNDTree<PropItem>;

  let filtered = [] as NodeModel<PropItem>[];
  let mprops = meta.mitem?.get("component")?.get("props");
  const mcomp = meta.mitem?.get("component");

  if (!mprops) {
    if (mcomp) {
      mcomp.set("props", new Y.Map() as any);
      mprops = mcomp.get("props");
    }
  }

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

      if (a.data?.name.startsWith('new_prop')) return 1;
      if (b.data?.name.startsWith('new_prop')) return -1;
      if (
        a.data &&
        b.data &&
        typeof a.data.prop.idx !== "undefined" &&
        typeof b.data.prop.idx !== "undefined"
      ) {
        return a.data.prop.idx - b.data.prop.idx;
      }
      return 0;
    });
  }

  return (
    <div className="flex flex-col text-[12px] flex-1">
      <div className="flex border-b p-1 h-[28px] items-center bg-slate-50 justify-between select-none">
        <div
          className="border flex items-center cursor-pointer bg-white hover:bg-blue-100 space-x-[1px] pr-[5px]"
          onClick={() => {
            p.ui.side.prop = false;
            p.render();
          }}
        >
          <div
            className={css`
              margin-bottom: 1px;
            `}
            dangerouslySetInnerHTML={{
              __html: `
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 4L9 11L4.5 7.5L9 4Z" fill="currentColor"></path></svg>`,
            }}
          ></div>
          <div>Style</div>
        </div>

        <div
          className={cx(
            "flex items-center space-x-1 cursor-pointer",
            !!item.component?.useStyle &&
              "border border-green-600 px-1 rounded-sm text-green-700"
          )}
          onClick={() => {
            const useStyle = !!meta.mitem?.get("component")?.get("useStyle");
            meta.mitem?.get("component")?.set("useStyle", !useStyle);
            treeRebuild(p);
            p.render();
          }}
        >
          {!item.component?.useStyle ? <ToggleOff /> : <ToggleOn />}
          <div className={cx("mt-[2px]")}>Inherit Style</div>
        </div>
        <div
          className="border pl-1 cursor-pointer bg-white hover:bg-blue-100 flex items-center"
          onClick={() => {
            if (active.comp_id) {
              active.comp_id = active.instance.comp_id || "";
              active.item_id = active.instance.item_id || "";
              active.instance.comp_id = "";
              active.instance.item_id = "";
              p.render();
            }
          }}
        >
          <div>Instance</div>
          <div
            className={css`
              margin-bottom: 1px;
            `}
            dangerouslySetInnerHTML={{
              __html: `
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 11L6 4L10.5 7.5L6 11Z" fill="currentColor"></path></svg>`,
            }}
          ></div>
        </div>
      </div>
      <div className="flex flex-1 relative overflow-y-auto overflow-x-hidden">
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
                  render={render}
                  params={params}
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
          <div className="flex">
            <div
              className="m-1 border border-blue-200 px-2 self-start text-[13px] hover:bg-blue-100 cursor-pointer select-none flex-1 h-[22px]"
              onClick={() => {
                if (mprops) {
                  const indexes: (number | undefined)[] = [];
                  mprops.forEach((e) => indexes.push(e.get("idx")));
                  let idx: any = (indexes.sort().pop() || 0) + 1;
                  if (indexes.length === 0) {
                    idx = 1;
                  } else {
                    idx = parseInt(idx) + 1;
                  }

                  let name = `new_prop_${idx}`;
                  while (mprops.get(name)) {
                    idx = parseInt(idx) + 1;
                    name = `new_prop_${idx}`;
                  }

                  const map = new Y.Map() as FMCompDef;
                  syncronize(map, {
                    idx,
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
            </div>{" "}
            <Popover
              content={
                <div
                  className={cx(css`
                    width: 700px;
                    height: 500px;
                    margin: 5px 0px;
                  `)}
                >
                  <SimpleMonaco
                    onChange={(value) => {
                      local.typings = value;
                      local.render();
                    }}
                    value={local.typings}
                    lang="typescript"
                  />
                </div>
              }
              open={local.openTypings}
              onOpenChange={(open) => {
                try {
                  if (mcomp) {
                    if (!open) {
                      mcomp.set("typings", local.typings);
                      treeRebuild(p);
                      p.render();
                    } else {
                      local.typings =
                        mcomp.get("typings") ||
                        `\
const typings = {
  _raw: {
  }
}`;
                    }
                  }
                } catch (e) {
                  console.log(e);
                }
                local.openTypings = open;
                local.render();
              }}
            >
              <div className="m-1 ml-0 border border-blue-200 px-2 self-start text-[13px] hover:bg-blue-100 cursor-pointer select-none flex items-center space-x-1 text-xs h-[22px]">
                <span>Types</span>
              </div>
            </Popover>
            <Popover
              content={
                <div
                  className={cx(css`
                    width: 700px;
                    height: 500px;
                    margin: 5px 0px;
                  `)}
                >
                  <SimpleMonaco
                    onChange={(value) => {
                      local.json = value;
                      local.render();
                    }}
                    value={local.json}
                    lang="json"
                  />
                </div>
              }
              open={local.openJSON}
              onOpenChange={(open) => {
                try {
                  if (!open) {
                    syncronize(mprops as any, JSON.parse(local.json));
                    treeRebuild(p);
                    p.render();
                  } else {
                    local.json = JSON.stringify(mprops?.toJSON(), null, 2);
                  }
                } catch (e) {
                  console.log(e);
                }
                local.openJSON = open;
                local.render();
              }}
            >
              <div className="m-1 ml-0 border border-blue-200 px-2 self-start text-[13px] hover:bg-blue-100 cursor-pointer select-none flex items-center space-x-1 text-xs h-[22px]">
                <span>JSON</span>
              </div>
            </Popover>
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

const ToggleOn = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    version="1.1"
    viewBox="0 0 122.878 73.391"
    xmlSpace="preserve"
  >
    <path
      fillRule="evenodd"
      fill="currentColor"
      d="M35.691 0h51.495c19.631 0 35.691 16.513 35.691 36.695S106.815 73.39 87.186 73.39H35.691C16.062 73.391 0 56.877 0 36.695S16.061 0 35.691 0zm50.492 7.863c16.184 0 29.309 13.125 29.309 29.309S102.366 66.48 86.183 66.48 56.874 53.355 56.874 37.172 69.999 7.863 86.183 7.863z"
      clipRule="evenodd"
    ></path>
  </svg>
);

const ToggleOff = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    x="0"
    y="0"
    version="1.1"
    viewBox="0 0 122.882 73.393"
    xmlSpace="preserve"
  >
    <path
      fillRule="evenodd"
      d="M87.189 0H35.694C16.063 0 0 16.513 0 36.697c0 20.182 16.063 36.695 35.694 36.695H87.19c19.632 0 35.692-16.514 35.692-36.695C122.882 16.513 106.821 0 87.189 0zM59.367 6.057a37.56 37.56 0 014.846 4.098l.022.022.073.07a37.324 37.324 0 012.621 2.939 37.495 37.495 0 018.288 23.349c.012.068.014.141.014.213V36.834l-.002.039v.021l-.012.061a37.491 37.491 0 01-3.959 16.615 37.634 37.634 0 01-7.046 9.777l-.021.02c-.311.311-.671.652-1.05 1.008a37.606 37.606 0 01-3.637 2.957h25.974l.18-.008h.1l.032.002h.029l.029.006a28.57 28.57 0 0013.018-3.221 30.04 30.04 0 007.72-5.742l.012-.012-.003-.004.023-.023.052-.049a29.115 29.115 0 002.08-2.389l.002-.002-.002-.002a30.487 30.487 0 001.882-2.678 31.075 31.075 0 004.722-16.381l-.01-.129v-.012l.005-.033v-.021l.002-.045v-.016l.007-.045a31.218 31.218 0 00-2.343-11.718 30.9 30.9 0 00-6.427-9.785L106.57 15l-.003.002-.011-.012h-.003l-.02-.021-.01-.016a29.961 29.961 0 00-2.338-2.146 29.773 29.773 0 00-2.594-1.927c-4.57-3.02-9.999-4.791-15.791-4.818l-.139.007h-.002l-.027-.004h-.09l-.027-.007H59.367v-.001zM36.696 7.864c-16.183 0-29.308 13.124-29.308 29.308 0 16.186 13.125 29.311 29.308 29.311 16.185 0 29.311-13.125 29.311-29.311 0-16.184-13.126-29.308-29.311-29.308z"
      clipRule="evenodd"
    ></path>
  </svg>
);
