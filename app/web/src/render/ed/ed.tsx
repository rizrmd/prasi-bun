import { useGlobal } from "web-utils";
import { Loading } from "../../utils/ui/loading";
import { EDGlobal } from "./logic/ed-global";
import { edRoute } from "./logic/ed-route";

export const Ed = () => {
  const p = useGlobal(EDGlobal, "EDITOR");

  edRoute(p);
  console.log(p.status);
  if (p.status === "loading") {
    return <Loading />;
  }
  if (p.status === "site-not-found" || p.status === "page-not-found") {
    return (
      <div className="flex fixed inset-0 items-center justify-center">
        {p.status === "site-not-found" ? "Site not found" : "Page not found"}
      </div>
    );
  }
  return <div>asfa</div>;
};
