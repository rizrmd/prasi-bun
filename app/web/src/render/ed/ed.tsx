import { useGlobal } from "web-utils";
import { Loading } from "../../utils/ui/loading";
import { EDGlobal } from "./logic/global";
import { edRoute } from "./logic/route";

export const Ed = () => {
  const p = useGlobal(EDGlobal, "EDITOR");

  edRoute(p);

  return <Loading />;
};
