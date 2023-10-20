import { page, useGlobal } from "web-utils";
import { EditorGlobal } from "../../render/editor/logic/global";
import { Loading } from "../../utils/ui/loading";
import { clientStartSync } from "../../utils/sync/client";

export default page({
  url: "/ned/:site_id/:page_id",
  component: ({}) => {
    const p = useGlobal(EditorGlobal, "EDITOR");

    const session = JSON.parse(
      localStorage.getItem("prasi-session") || "null"
    ) as { data: { user: { id: string } } };
    if (!session) {
      navigate("/login");
      return <Loading />;
    }

    if (!p.sync) {
      // p.sync = clientStartSync({
      //   user_id: session.data.user.id,
      // });

      return <Loading />;
    }

    return <div></div>;
  },
});
