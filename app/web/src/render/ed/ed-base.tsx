import { useGlobal } from "web-utils";
import { Loading } from "../../utils/ui/loading";
import { EDGlobal } from "./logic/ed-global";
import { edInit } from "./logic/ed-init";
import { edRoute } from "./logic/ed-route";
import { EdMain } from "./panel/main/main";
import { EdLeft } from "./ed-left";
import { edUndoManager } from "./logic/ed-undo";
import { EdPopCompGroup } from "./panel/popup/comp-group";
import { EdPaneResize } from "./panel/main/pane-resize";

export const EdBase = () => {
  const p = useGlobal(EDGlobal, "EDITOR");

  edUndoManager(p);

  if (p.status === "init") {
    edInit(p);
  }

  edRoute(p);

  if (p.status === "loading" || p.status === "init") {
    return <Loading note={`${p.status}-page`} />;
  }
  if (p.status === "site-not-found" || p.status === "page-not-found") {
    return (
      <div className="flex fixed inset-0 items-center justify-center">
        {p.status === "site-not-found" ? "Site not found" : "Page not found"}
      </div>
    );
  }
  return (
    <div className="flex flex-col flex-1">
      <div className="flex justify-between"></div>
      <div className="flex flex-1 items-stretch">
        <EdLeft />
        <EdPaneResize
          minSize={200}
          size={p.ui.layout.left}
          onResize={(size) => {
            p.ui.layout.left = size;
            p.render();
          }}
          onDone={(size) => {
            localStorage.setItem("prasi-layout-left", size.toString());
          }}
        />
        <EdMain />
      </div>

      <>
        <EdPopCompGroup />
      </>
    </div>
  );
};
