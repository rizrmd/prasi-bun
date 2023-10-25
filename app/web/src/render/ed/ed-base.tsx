import { useGlobal } from "web-utils";
import { Loading } from "../../utils/ui/loading";
import { EdLeft } from "./ed-left";
import { EDGlobal } from "./logic/ed-global";
import { edInit } from "./logic/ed-init";
import { edRoute } from "./logic/ed-route";
import { edUndoManager } from "./logic/ed-undo";
import { EdMain } from "./panel/main/main";
import { EdPane } from "./panel/main/pane-resize";
import { EdPopCompGroup } from "./panel/popup/comp-group";
import { EdPopSite } from "./panel/popup/site";
import { jscript } from "../editor/panel/script/script-element";

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

  const Editor = jscript.editor;
  return (
    <div className="flex flex-col flex-1">
      <div className="flex justify-between"></div>
      <div className="flex flex-1 items-stretch">
        <EdLeft />
        <EdPane type="left" />
        <EdMain />
      </div>

      <>
        <EdPopSite />
        <EdPopCompGroup />
        {Editor && !jscript.ready && (
          <div className="hidden">
            <Editor
              onMount={() => {
                jscript.ready = true;
                p.render();
              }}
            />
          </div>
        )}
      </>
    </div>
  );
};
