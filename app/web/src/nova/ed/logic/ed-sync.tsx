import { compress, decompress } from "wasm-gzip";
import { deepClone } from "web-utils";
import * as Y from "yjs";
import { clientStartSync } from "../../../utils/sync/ws-client";
import { w } from "../../../utils/types/general";
import { Loading } from "../../../utils/ui/loading";
import { EmptySite, PG } from "./ed-global";
import { treeRebuild } from "./tree/build";
import { reloadPage } from "./ed-route";
import { loadSite } from "./ed-site";
import { updateComponentMeta } from "./comp/load";

const decoder = new TextDecoder();

export const edInitSync = (p: PG) => {
  const session = JSON.parse(
    localStorage.getItem("prasi-session") || "null"
  ) as { data: { user: { id: string; username: string } } };
  if (!session) {
    navigate("/login");
    return <Loading note="logging in" />;
  }
  p.user.id = session.data.user.id;
  p.user.username = session.data.user.username;

  if (p.sync) {
    if (p.site.id === "--loading--") return false;
    if (params.site_id !== p.site.id) {
      p.site = deepClone(EmptySite);
      p.site.id = "--loading--";
      p.ui.popup.code.init = false;
      p.sync.site.load(params.site_id).then(async (site) => {
        if (site) {
          await loadSite(p, site, "from-sync");
          p.render();
        } else {
          alert("Site not found. redirecting...");
          location.href = `/ed/`;
        }
        return;
      });
      return false;
    }

    if (!params.page_id && params.site_id) {
      db.page
        .findFirst({
          where: {
            is_deleted: false,
            is_default_layout: false,
            id_site: params.site_id,
          },
          select: { id: true },
        })
        .then((e) => {
          if (e) navigate(`/ed/${params.site_id}/${e.id}`);
        });
      return false;
    }
  }
  if (!p.sync) {
    clientStartSync({
      user_id: session.data.user.id,
      site_id: params.site_id,
      page_id: params.page_id,
      events: {
        code(arg) {
          p.ui.popup.code.error = false;

          if (arg.event === "code-loading") {
            p.ui.popup.code.log = "";
            p.ui.popup.code.loading = true;
            p.render();
          } else if (arg.event === "code-done") {
            if (typeof arg.content === "string") {
              if (arg.content !== "OK") {
                p.ui.popup.code.error = true;
              }

              p.ui.popup.code.log += arg.content;
            }
            p.ui.popup.code.loading = false;

            if (arg.src) {
              const w = window as any;
              const module = evalCJS(decoder.decode(decompress(arg.src)));
              if (typeof module === "object") {
                for (const [k, v] of Object.entries(module)) {
                  w[k] = v;
                }
              }
            }
            p.render();
          } else {
            if (typeof arg.content === "string")
              p.ui.popup.code.log += arg.content;
            p.render();
          }
        },
        activity(arg) {},
        opened() {
          if (w.offline) {
            console.log("reconnected!");
            w.offline = false;
            p.ui.syncing = true;
            p.sync.activity("site", { type: "join", id: params.site_id });
            p.render();
          } else {
            w.offline = false;
            p.render();
          }
        },
        shakehand(client_id) {
          p.user.client_id = client_id;
        },
        disconnected() {
          console.log("offline, reconnecting...");
          w.offline = true;
          p.render();
          return {
            reconnect: true,
          };
        },
        async editor_start(e) {
          if (p.ui.syncing) {
            await reloadPage(p, params.page_id, "editor-start");
            if (p.page.doc) {
              p.page.doc.transact(() => {
                p.page.doc?.getMap("map").set("ts", Date.now());
              }, `sync`);
            }
          }

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
        site_updated(site) {
          for (const [k, v] of Object.entries(site)) {
            if (k === "js" || k === "js_compiled") {
              p.site[k] = decoder.decode(decompress(v as any));
            } else {
              (p.site as any)[k] = v;
            }
          }
          p.render();
        },
        async remote_svlocal(data) {
          let doc = null as any;
          if (data.type === "page" && p.page.cur.id === data.id) {
            doc = p.page.doc as Y.Doc;
          } else if (data.type === "comp" && p.comp.list[data.id]) {
            doc = p.comp.list[data.id].doc;
          }

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
              if (data.type === "page") {
                await treeRebuild(p, { note: "sv_remote" });
              } else {
                const updated = await updateComponentMeta(
                  p,
                  doc,
                  data.id,
                  p.comp.list[data.id].comp.meta
                );
                if (updated) {
                  p.comp.list[data.id].meta = updated.meta;
                  p.comp.list[data.id].tree = updated.tree;
                }

                await treeRebuild(p, { note: "sv_remote" });
              }
              p.render();
            }
          }
        },
      },
    }).then((e) => {
      p.sync = e;
    });

    return false;
  }
  return true;
};

export const evalCJS = (src: string) => {
  if (src) {
    const module = { exports: { __esModule: true as true | undefined } };
    eval(`try {
        ${src}
      } catch(e) {
        console.error(e);
      }`);
    const result = { ...module.exports };
    if (result.__esModule) {
      delete result.__esModule;
    }
    return result;
  }
  return {};
};
