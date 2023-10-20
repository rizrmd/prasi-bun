import { page, useGlobal } from "web-utils";
import { EDGlobal } from "../../render/ed/logic/global";
import { clientStartSync } from "../../utils/sync/client";
import { Loading } from "../../utils/ui/loading";

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
        events: {
          editor_start(e) {
            if (params.site_id !== "_" && params.page_id !== "_") {
              p.render();
            } else {
              if (e.site_id && e.page_id) {
                navigate(`/ed/${e.site_id}/${e.page_id}`);
              }
            }
          },
        },
      });
      return <Loading />;
    }

    return <div></div>;
  },
});
