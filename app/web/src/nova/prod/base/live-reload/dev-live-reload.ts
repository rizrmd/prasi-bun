import { format } from "date-fns";
import { get } from "idb-keyval";
import { Packr } from "msgpackr";
import { SyncType } from "../../../../../../srv/ws/sync/type";
import { w } from "../../../../utils/types/general";
import { base } from "../base";
import { scanComponent } from "../component";
import { rebuildMeta } from "../route";
const packr = new Packr({ structuredClone: true });

/** CONSTANT */
const WS_CONFIG = {
  debug: !!localStorage.getItem("prasi-ws-debug"),
  reconnectTimeout: 1000,
  id_client: "",
  id_site: "",
  ws: null as any,
};

export const initDevLiveReload = () => {
  if (
    location.host === "localhost:4550" ||
    location.host === "prasi.avolut.com"
  ) {
    const patharr = location.pathname.split("/");
    const id_site = patharr[2];
    const retry = () => {
      const url = new URL(w.basehost || location.href);
      url.pathname = "/sync";
      url.protocol = url.protocol === "http:" ? "ws:" : "wss:";

      const ws = new WebSocket(`${url.protocol}//${url.host}${url.pathname}`);

      let timeout = setTimeout(() => {
        clearTimeout(timeout);
        ws.close();
        retry();
      }, 2000);

      WS_CONFIG.ws = ws;
      WS_CONFIG.id_site = id_site;
      ws.onopen = () => {
        clearTimeout(timeout);
        w.offline = false;
        w.editorRender?.();
      };
      ws.onmessage = async (e) => {
        const raw = e.data as Blob;
        const msg = packr.unpack(Buffer.from(await raw.arrayBuffer()));

        if (WS_CONFIG.debug)
          console.log(`%c⬇`, `color:red`, formatBytes(raw.size, 0), msg);

        if (msg.type === SyncType.ClientID) {
          WS_CONFIG.id_client = msg.client_id;
          send(ws, {
            type: "preview",
            mode: "init",
            data: {
              site_id: id_site,
              client_id: msg.client_id,
            },
          });
        } else if (msg.type === SyncType.Event) {
          if (w.pointer_active) return;
          console.clear()
          if (msg.event === "page_changed") {
            const id = msg.data.map.id;
            const page = base.page.cache[id];
            const root = msg.data.map.root;
            page.root = root;
            const p = {
              id: page.id,
              url: page.url,
              root,
              meta: {},
            };
            await scanComponent(root.childs, true);
            rebuildMeta(p.meta, root);
            base.page.cache[p.id] = p;

            console.log(
              `${format(Date.now(), "HH:mm:ss")} 🚧 Page [${page.id}] updated `
            );
            w.prasiContext.render();
          } else if (msg.event === "comp_changed") {
            const id = msg.data.map.id;
            base.comp.list[id] = msg.data.map.root;
            const p = base.page.cache[base.page.id];
            await scanComponent([base.comp.list[id]]);
            rebuildMeta(p.meta, p.root);

            console.log(
              `${format(Date.now(), "HH:mm:ss")} 🚧 Component [${msg.data.map.root.name}] updated `
            );
            w.prasiContext.render();
          } else if (msg.event === "code_changes") {
            const { mode, ts, status } = msg.data;
            if (mode === "frontend") {
              if (status === "ok") {
                console.clear();
                console.log(
                  `${format(
                    Date.now(),
                    "HH:mm:ss"
                  )} 🚧 Code updated from vscode `
                );

                const url = `/prod/${id_site}/_prasi/code/index.js?ts=${ts}`;
                const fn = new Function(
                  "callback",
                  `
              import("${url}")
                .catch((e) => console.error("Failed to load site code\\n\\n", e))
                .then(callback)`
                );

                try {
                  await new Promise<any>((resolve) => {
                    try {
                      fn((exports: any) => {
                        const w = window as any;
                        for (const [k, v] of Object.entries(exports)) {
                          w[k] = v;
                        }
                        resolve(exports);
                        w.prasiContext.render();
                      });
                    } catch (e) {
                      console.log("Failed to load site code", e);
                    }
                  });
                } catch (e) {}
              } else if (status === "building") {
                console.log(
                  `${format(
                    Date.now(),
                    "HH:mm:ss"
                  )} ⏳ Code changed from vscode, rebuilding...`
                );
              }
            }
          }
        }
      };
    };

    retry();
  }
};

export const listenChanges = (
  arg: { type: "page"; id: string } | { type: "comp"; ids: string[] }
) => {
  if (WS_CONFIG.ws) {
    send(WS_CONFIG.ws, {
      type: "preview",
      mode: "listen",
      data: {
        ...arg,
        client_id: WS_CONFIG.id_client,
      },
    });
  }
};

const send = (ws: WebSocket, msg: any) => {
  const raw = packr.pack(msg);
  if (WS_CONFIG.debug)
    console.log(`%c⬆`, "color:blue", formatBytes(raw.length, 0), msg);
  ws.send(raw);
};

function formatBytes(bytes: number, decimals: number) {
  if (bytes == 0) return "0 Bytes";
  var k = 1024,
    dm = decimals || 2,
    sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
