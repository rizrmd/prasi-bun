import { MultiBackend, getBackendOptions } from "@minoru/react-dnd-treeview";
import { DndProvider } from "react-dnd";
import { useGlobal } from "web-utils";
import { EDGlobal } from "../../logic/ed-global";
import { EdTreeBody } from "./body";
import { EdTreeSearch } from "./search";

export const EdTree = () => {
  return (
    <div className="flex flex-col min-w-[300px] relative border-r">
      <EdTreeSearch />
      <div className="tree-body flex relative flex-1 overflow-y-auto overflow-x-hidden">
        <div className="absolute inset-0 flex">
          <DndProvider backend={MultiBackend} options={getBackendOptions()}>
            <EdTreeBody />
          </DndProvider>
        </div>
      </div>
    </div>
  );
};
