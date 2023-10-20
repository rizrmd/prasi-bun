import { page, useGlobal } from "web-utils";
import { EDGlobal } from "../../render/ed/logic/ed-global";
import { clientStartSync } from "../../utils/sync/client";
import { Loading } from "../../utils/ui/loading";
import { Ed } from "../../render/ed/ed";

export default page({
  url: "/ed/:site_id/:page_id",
  component: ({}) => {
    const p = useGlobal(EDGlobal, "EDITOR");

    const session = JSON.parse(
      localStorage.getItem("prasi-session") || "null"
    ) as { data: { user: { id: string } } };
    if (!session) {
      navigate("/login");
      return <Loading note="logging in" />;
    }

    if (!p.sync) {
      clientStartSync({
        user_id: session.data.user.id,
        events: {
          editor_start(e) {
            if (
              !!params.site_id &&
              !!params.page_id &&
              params.site_id !== "_" &&
              params.page_id !== "_"
            ) {
              p.site.id = params.site_id;
              p.page.id = params.page_id;
              p.render();
            } else {
              if (e.site_id && e.page_id) {
                navigate(`/ed/${e.site_id}/${e.page_id}`);
              }
            }
          },
          site_loaded({ site }) {
            p.site = site;
            p.render();
          },
        },
      }).then((e) => (p.sync = e));
      return <Loading note="editor start" />;
    }

    if (!p.site.id && p.page.id) return <Loading note="waiting page" />;

    return <Ed />;
  },
});
