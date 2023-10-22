import { MultiBackend, getBackendOptions } from "@minoru/react-dnd-treeview";
import { DndProvider } from "react-dnd";
import { useGlobal } from "web-utils";
import { EDGlobal } from "../../logic/ed-global";
import { EdTreeBody } from "./body";

export const EdTree = () => {
  const p = useGlobal(EDGlobal, "EDITOR");
  return (
    <div className="flex flex-col min-w-[300px] relative border-r">
      <div className=""></div>
      <div className="flex flex-1 overflow-y-auto overflow-x-hidden">
        <div className="absolute inset-0">
          <DndProvider backend={MultiBackend} options={getBackendOptions()}>
            <EdTreeBody />
          </DndProvider>
        </div>
      </div>
    </div>
  );
};
