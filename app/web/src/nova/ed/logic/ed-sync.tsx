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
import { createRouter, RadixRouter } from "radix3";

const decoder = new TextDecoder();

const page = {
  list: [] as { id: string; url: string }[],
  route: null as null | RadixRouter<{ id: string; url: string }>,
};

export const edInitSync = (p: PG) => {
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

  if (location.pathname.startsWith("/vi/")) {
    if (page.list.length === 0) {
      _db.page
        .findMany({
          where: {
            id_site: params.site_id,
            is_deleted: false,
            is_default_layout: false,
          },
          select: {
            id: true,
            url: true,
          },
        })
        .then((list) => {
          page.list = list;
          edInitSync(p);
        });

      return;
    }
    if (!page.route) {
      page.route = createRouter();
      for (const e of page.list) {
        page.route.insert(e.url, e);
      }
    }

    const arrpath = location.pathname.split("/");
    const pathname = "/" + arrpath.slice(3).join("/");

    if (!params.page_id) {
      const res = page.route.lookup(pathname);
      if (res) {
        params.page_id = res.id;
        if (res.params) {
          for (const [k, v] of Object.entries(res.params)) {
            if (!["site_id", "page_id"].includes(k)) {
              params[k] = v;
            }
          }
        }
      }
    }
  }

  if (!params.page_id) {
    if (location.pathname.startsWith("/ed")) {
      if (!params.site_id) {
        _db.page
          .findFirst({
            where: {
              is_deleted: false,
              is_default_layout: false,
              site: {
                id_user: p.user.id,
              },
            },
            select: { id: true, id_site: true },
          })
          .then((e) => {
            if (e) location.href = `/ed/${e.id_site}/${e.id}`;
          });
      } else {
        _db.page
          .findFirst({
            where: {
              is_deleted: false,
              is_default_layout: false,
              id_site: params.site_id,
            },
            select: { id: true, id_site: true },
          })
          .then(async (e) => {
            if (e) location.href = `/ed/${params.site_id}/${e.id}`;
            else {
              const res = await _db.page.create({
                data: {
                  content_tree: {
                    childs: [],
                    id: "root",
                    type: "root",
                  },
                  name: "home",
                  url: "/",
                  site: { connect: { id: params.site_id } },
                },
              });
              if (res) location.href = `/ed/${params.site_id}/${res.id}`;
            }
          });
      }
      return false;
    }
  }

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
          if (e) location.href = `/ed/${params.site_id}/${e.id}`;
        });
      return false;
    }
  }
  if (!p.sync && !p.sync_assigned) {
    p.sync_assigned = true;
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
        async remote_svlocal(data) {
          let doc = null as any;
          if (data.type === "page" && p.page.cur.id === data.id) {
            doc = p.page.doc as Y.Doc;
          } else if (data.type === "comp" && p.comp.list[data.id]) {
            doc = p.comp.list[data.id].doc;
          } else if (data.type === "code") {
            doc = p.code.site.doc;
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
              sv,
              diff
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
