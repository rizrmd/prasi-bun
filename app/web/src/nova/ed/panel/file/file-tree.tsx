import {
  MultiBackend,
  NodeModel,
  Tree as DNDTree,
  getBackendOptions,
} from "@minoru/react-dnd-treeview";
import { DndProvider } from "react-dnd";
import { FEntry } from "./type";
import { FC } from "react";

const Tree = DNDTree<FEntry>;

export const EdFileTree: FC<{ entry: Record<string, FEntry[]> }> = ({
  entry,
}) => {
  const tree: NodeModel<FEntry>[] = [];
  for (const [path, entries] of Object.entries(entry)) {
    const arr = path.split("/");
    const name = arr.pop() || "/";
    tree.push({ id: path, text: name, parent: arr.join("/") });
    for (const e of entries) {
      if (e.type === "dir") {
        tree.push({
          id: (path === "/" ? "" : path) + "/" + e.name,
          text: e.name,
          parent: path,
        });
      }
    }
  }

  return (
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <Tree
        tree={tree}
        dragPreviewRender={() => <></>}
        rootId=""
        initialOpen={true}
        onDrop={async (newTree, opt) => {}}
        render={(node, { depth, isOpen, onToggle, hasChild }) => (
          <div
            className={cx(css`
              padding-left: ${(depth * 10) + 10}px;
            `)}
          >
            {node.text}
          </div>
        )}
      ></Tree>
    </DndProvider>
  );
};
