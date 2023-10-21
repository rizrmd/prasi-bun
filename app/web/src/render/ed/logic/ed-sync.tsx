import { clientStartSync } from "../../../utils/sync/client";
import { Loading } from "../../../utils/ui/loading";
import { PG } from "./ed-global";

export const edInitSync = (p: PG) => {
  const session = JSON.parse(
    localStorage.getItem("prasi-session") || "null"
  ) as { data: { user: { id: string } } };
  if (!session) {
    navigate("/login");
    return <Loading note="logging in" />;
  }
  const paramsOK =
    !!params.site_id &&
    !!params.page_id &&
    params.site_id !== "_" &&
    params.page_id !== "_";

  if (!p.sync) {
    clientStartSync({
      user_id: session.data.user.id,
      events: {
        editor_start(e) {
          if (!paramsOK) {
            if (e.site_id && e.page_id) {
              p.site.id = e.site_id;
              p.page.id = e.page_id;
              navigate(`/ed/${e.site_id}/${e.page_id}`);
            }
          } else {
            p.site.id = params.site_id;
            p.page.id = params.page_id;
            p.render();
          }
        },
        site_loaded({ site }) {
          p.site = site;
          p.render();
        },
      },
    }).then((e) => (p.sync = e));

    return false;
  }
  return true;
};
