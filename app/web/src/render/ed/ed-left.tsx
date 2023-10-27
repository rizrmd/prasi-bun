import { MultiBackend, getBackendOptions } from "@minoru/react-dnd-treeview";
import { DndProvider } from "react-dnd";
import { useGlobal } from "web-utils";
import { EDGlobal } from "./logic/ed-global";
import { EdTreeBody } from "./panel/tree/body";
import { EdTreeSearch } from "./panel/tree/search";
import { EdSitePicker } from "./panel/header/left/site";
import { EdApi } from "./panel/header/left/api";
import { EdExport } from "./panel/header/left/export";
import { EdNpm } from "./panel/header/left/npm";
import { EdSiteJS } from "./panel/header/left/js";

export const EdLeft = () => {
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
        <div
          className={cx(
            "h-[35px] border-b flex p-1 items-stretch text-[12px] justify-between"
          )}
        >
          <EdSitePicker />
          <div className="flex items-stretch space-x-1 pl-2">
            <EdSiteJS />
            <EdNpm />
            <EdApi />
            <EdExport />
          </div>
        </div>

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
