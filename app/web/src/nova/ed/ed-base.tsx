import { useGlobal } from "web-utils";
import { Loading } from "../../utils/ui/loading";
import { EdLeft } from "./ed-left";
import { EdMid } from "./ed-mid";
import { EdRight } from "./ed-right";
import { EDGlobal } from "./logic/ed-global";
import { edInit } from "./logic/ed-init";
import { edRoute } from "./logic/ed-route";
import { edUndoManager } from "./logic/ed-undo";
import { EdMain } from "./panel/main/main";
import { EdPane } from "./panel/main/pane-resize";
import { EdPopApi } from "./panel/popup/api/api-server";
import { EdPopCode } from "./panel/popup/code/code";
import { EdPopCompGroup } from "./panel/popup/comp/comp-group";
import { EdPopComp } from "./panel/popup/comp/comp-popup";
import { EdPopPage } from "./panel/popup/page/page-popup";
import { EdPopScript } from "./panel/popup/script/pop-script";
import { EdPopSite } from "./panel/popup/site/site-popup";

export const EdBase = () => {
  const p = useGlobal(EDGlobal, "EDITOR");

  edUndoManager(p);

  if (p.status === "init") {
    edInit(p);
  }

  edRoute(p);

  if (p.status === "loading") {
    return <Loading note={`page-${p.status}`} />;
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
        <EdPane type="left" min_size={200} />
        <div className="flex flex-1 flex-col items-stretch">
          <EdMid />
          <div className="flex flex-1 items-stretch">
            <EdMain />
            <EdPane type="right" min_size={240} />
            <EdRight />
          </div>
        </div>
      </div>
      <>
        <EdPopCode />
        <EdPopScript />
        <EdPopSite />
        <EdPopApi />
        <EdPopPage />
        <EdPopCompGroup />
        <EdPopComp />
      </>
    </div>
  );
};
