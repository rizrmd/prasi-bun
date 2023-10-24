import { compress, decompress } from "wasm-gzip";
import { clientStartSync } from "../../../utils/sync/ws-client";
import { Loading } from "../../../utils/ui/loading";
import { PG } from "./ed-global";
import { Y } from "../../../../../srv/ws/sync/entity/docs";
import { treeRebuild } from "./tree/build";
import { w } from "../../../utils/types/general";

export const edInitSync = (p: PG) => {
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
      site_id: params.site_id,
      page_id: params.page_id,
      events: {
        connected() {
          if (w.offline) {
            console.log("reconnected, syncing...");
          }
          w.offline = false;
          p.render();
        },
        disconnected() {
          console.log("offline, reconnecting...");
          w.offline = true;
          p.render();
          return {
            reconnect: true,
          };
        },
        editor_start(e) {
          if (params.site_id !== e.site_id || params.page_id !== e.page_id) {
            p.site.id = e.site_id;
            p.page.cur.id = e.page_id;
            navigate(`/ed/${e.site_id}/${e.page_id}`);
          } else {
            p.site.id = e.site_id;
            p.page.cur.id = e.page_id;
            p.render();
          }
        },
        site_loaded({ site }) {
          p.site = site;
          p.render();
        },
        async remote_svlocal(data) {
          if (p[data.type].cur.id === data.id) {
            const doc = p[data.type].doc as Y.Doc;

            if (doc) {
              const diff_remote = Y.encodeStateAsUpdate(
                doc,
                decompress(data.sv_local)
              );
              const sv_remote = Y.encodeStateVector(doc);

              const sv = Buffer.from(compress(sv_remote));
              const diff = Buffer.from(compress(diff_remote));
              const res = await p.sync.yjs.sv_remote(
                data.type,
                data.id,
                sv,
                diff
              );
              if (res) {
                Y.applyUpdate(doc, decompress(res.diff), "sv_remote");
                await treeRebuild(p, { note: "sv_remote" });
              }
            }
          }
        },
      },
    }).then((e) => (p.sync = e));

    return false;
  }
  return true;
};
