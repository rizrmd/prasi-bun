import { getBackendOptions } from "@minoru/react-dnd-treeview";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useGlobal, useLocal } from "web-utils";
import { EDGlobal } from "./logic/ed-global";
import { EdApi } from "./panel/header/left/api";
import { EdSiteJS } from "./panel/header/left/js";
import { EdSitePicker } from "./panel/header/left/site-picker";
import { EdTreeBody } from "./panel/tree/body";
import { EdTreeSearch } from "./panel/tree/search";

export const EdLeft = () => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal({ tree: null as any });
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
            <EdApi />
          </div>
        </div>

        <EdTreeSearch />
        <div
          className="tree-body flex relative flex-1 overflow-y-auto overflow-x-hidden"
          ref={(ref) => {
            if (ref) local.tree = ref;
          }}
        >
          <div className="absolute inset-0 flex flex-col">
            {local.tree && (
              <DndProvider
                backend={HTML5Backend}
                options={getBackendOptions({
                  html5: {
                    rootElement: local.tree,
                  },
                })}
              >
                <EdTreeBody />
              </DndProvider>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
