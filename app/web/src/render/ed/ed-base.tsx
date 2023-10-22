import { useGlobal } from "web-utils";
import { Loading } from "../../utils/ui/loading";
import { EDGlobal } from "./logic/ed-global";
import { edRoute } from "./logic/ed-route";
import { EdTree } from "./panel/tree/tree";
import { EdMain } from "./panel/main/main";

export const EdBase = () => {
  const p = useGlobal(EDGlobal, "EDITOR");

  if (p.status === "init") {
    p.status = "ready";
  }

  edRoute(p);

  if (p.status === "loading") {
    return <Loading note="loading-page" />;
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
        <EdTree />
        <EdMain />
      </div>
    </div>
  );
};
