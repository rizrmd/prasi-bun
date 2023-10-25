import { MultiBackend, getBackendOptions } from "@minoru/react-dnd-treeview";
import { DndProvider } from "react-dnd";
import { EdTreeBody } from "./body";
import { EdTreeSearch } from "./search";
import { useGlobal } from "web-utils";
import { EDGlobal } from "../../logic/ed-global";

export const EdTree = () => {
  const p = useGlobal(EDGlobal, "EDITOR");
  return (
    <div
      className={cx(
        "flex flex-col relative border-r",
        css`
          min-width: ${p.ui.layout.left}px;
        `
      )}
    >
      <div className="absolute inset-0 flex flex-col overflow-hidden">
        <EdTreeSearch />
        <div className="tree-body flex relative flex-1 overflow-y-auto overflow-x-hidden">
          <div className="absolute inset-0 flex">
            <DndProvider backend={MultiBackend} options={getBackendOptions()}>
              <EdTreeBody />
            </DndProvider>
          </div>
        </div>
      </div>
    </div>
  );
};
