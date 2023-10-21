import { page, useGlobal } from "web-utils";
import { Ed, bootEd } from "../../render/ed/ed";
import { EDGlobal } from "../../render/ed/logic/ed-global";
import { Loading } from "../../utils/ui/loading";

export default page({
  url: "/ed/:site_id/:page_id",
  component: ({}) => {
    const p = useGlobal(EDGlobal, "EDITOR");

    if (!bootEd(p)) {
      return <Loading note="booting editor" />;
    }

    return <Ed />;
  },
});
