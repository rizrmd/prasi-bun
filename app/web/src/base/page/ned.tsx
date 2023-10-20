import { page, useGlobal } from "web-utils";
import { EditorGlobal } from "../../render/editor/logic/global";
import { Loading } from "../../utils/ui/loading";
import { clientStartSync } from "../../utils/sync/client";
import { EDGlobal } from "../../render/ed/logic/global";

export default page({
  url: "/ed/:site_id/:page_id",
  component: ({}) => {
    const p = useGlobal(EDGlobal, "EDITOR");

    const session = JSON.parse(
      localStorage.getItem("prasi-session") || "null"
    ) as { data: { user: { id: string } } };
    if (!session) {
      navigate("/login");
      return <Loading />;
    }

    if (!p.sync) {
      p.sync = clientStartSync({
        user_id: session.data.user.id,
        events: { editor_start() {} },
      });

      return <Loading />;
    }

    return <div></div>;
  },
});
