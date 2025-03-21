import { createRouter, RadixRouter } from "radix3";
import { compress, decompress } from "wasm-gzip";
import { deepClone } from "web-utils";
import * as Y from "yjs";
import { registerSiteTypings } from "../../../utils/script/typings";
import { clientStartSync } from "../../../utils/sync/ws-client";
import { w } from "../../../utils/types/general";
import { Loading } from "../../../utils/ui/loading";
import { loadFrontEnd, loadTypings } from "./code-loader";
import { updateComponentMeta } from "./comp/load";
import { EmptySite, PG } from "./ed-global";
import { reloadPage } from "./ed-route";
import { loadSite } from "./ed-site";
import { treeRebuild } from "./tree/build";
import { format } from "date-fns";

const decoder = new TextDecoder();

const page = {
  list: [] as { id: string; url: string }[],
  route: null as null | RadixRouter<{ id: string; url: string }>,
};

export const loadSession = (p: PG) => {
  const session = JSON.parse(
    localStorage.getItem("prasi-session") || "null"
  ) as { data: { user: { id: string; username: string } } };
  if (!session && location.pathname.startsWith("/ed/")) {
    location.href = "/login";
    return <Loading note="logging in" />;
  }

  if (session?.data?.user) {
    p.user.id = session.data.user.id;
    p.user.username = session.data.user.username;
  } else {
    p.user.id = "ab1390f5-40d5-448e-a8c3-84b0fb600930";
    p.user.username = "anonymous";
  }
};

export const edInitSync = (p: PG) => {
  loadSession(p);

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

    if (
      !p.page.cur.id &&
      !params.page_id &&
      params.site_id &&
      location.pathname.startsWith("/ed/")
    ) {
      _db.page
        .findFirst({
          where: {
            is_deleted: false,
            is_default_layout: false,
            id_site: params.site_id,
          },
          select: { id: true },
        })
        .then((e) => {
          if (params.site_id === "_") {
            alert("asdsa");
            return;
          }
          if (e) location.href = `/ed/${params.site_id}/${e.id}`;
        });
      return false;
    }
  }
  if (!p.sync) {
    p.site = deepClone(EmptySite);
    clientStartSync({
      user_id: p.user.id,
      site_id: params.site_id,
      page_id: params.page_id,
      events: {
        opened() {
          if (w.offline) {
            console.log("reconnected!");
            w.offline = false;
            p.ui.syncing = true;
            p.render();
          } else {
            w.offline = false;
            p.render();
          }
        },
        shakehand(client_id) {
          p.user.client_id = client_id;
          console.clear();
          console.log(`🚀 Prasi Ready (client_id: ${client_id})`);
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
          if (params.site_id !== e.site_id || params.page_id !== e.page_id) {
            if (!p.page.cur.id) {
              p.site.id = e.site_id;
              p.page.cur.id = e.page_id;
              if (location.pathname.startsWith("/ed/")) {
                location.href = `/ed/${e.site_id}/${e.page_id}`;
              }
            }
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
        async code_changes({ ts, mode, status }) {
          if (mode === "frontend") {
            if (status === "ok") {
              p.ui.build.status = "ready";
              p.render();
              console.log(
                `${format(Date.now(), "HH:mm:ss")} 🚧 Code updated from vscode `
              );

              await loadFrontEnd(p, ts);
            } else if (status === "building") {
              p.ui.build.status = "loading";
              p.render();
              console.log(
                `${format(
                  Date.now(),
                  "HH:mm:ss"
                )} ⏳ Code changed from vscode, rebuilding...`
              );
            } else {
              p.ui.build.status = "error";
              p.render();
            }
          } else {
            await loadTypings(p);
            if (p.ui.monaco) {
              registerSiteTypings(p.ui.monaco, p);
            }
          }
          await treeRebuild(p);
          p.render();
        },
        async remote_svlocal(data) {
          let doc = null as any;
          if (data.type === "page" && p.page.cur.id === data.id) {
            doc = p.page.doc as Y.Doc;
          } else if (data.type === "comp" && p.comp.list[data.id]) {
            doc = p.comp.list[data.id].doc;
          }

          if (doc && p.sync) {
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
              new Uint8Array(sv),
              new Uint8Array(diff)
            );

            if (res) {
              Y.applyUpdate(doc, decompress(res.diff), "sv_remote");
              if (data.type === "page") {
                delete p.preview.meta_cache[data.id];
                await treeRebuild(p, { note: "sv_remote" });
              } else if (data.type === "comp") {
                const updated = await updateComponentMeta(p, doc, data.id);
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
  } else {
    if (
      params.page_id !== p.page.cur.id &&
      location.pathname.startsWith("/ed")
    ) {
      reloadPage(p, params.page_id, "change page");
      return false;
    }
  }
  return true;
};
