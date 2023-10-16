import { createRouter } from "radix3";
import { wsHandler } from "../../../app/srv/ws/handler";
import { dir } from "../utils/dir";
import { g } from "../utils/global";
import { serveAPI } from "./serve-api";
import { WebSocketHandler } from "bun";
import { waitUntil } from "web-utils/src/wait-until";

const cache = {
  static: {} as Record<
    string,
    { type: string; content: ReadableStream<Uint8Array> }
  >,
};

export type WSData = { url: URL };

export const createServer = async () => {
  g.router = createRouter({ strictTrailingSlash: false });

  for (const route of Object.values(g.api)) {
    g.router.insert(route.url.replace(/\*/gi, "**"), route);
  }

  g.server = Bun.serve({
    port: g.port,
    websocket: {
      maxPayloadLength: 9999999,
      close(ws, code, reason) {
        const pathname = ws.data.url.pathname;
        if (wsHandler[pathname]) {
          const close = wsHandler[pathname].close;
          if (close) {
            close(ws, code, reason);
          }
        }
      },
      message(ws, message) {
        const pathname = ws.data.url.pathname;
        if (wsHandler[pathname]) {
          const msg = wsHandler[pathname].message;
          if (msg) {
            msg(ws, message);
          }
        }
      },
      open(ws) {
        const pathname = ws.data.url.pathname;
        if (wsHandler[pathname]) {
          const open = wsHandler[pathname].open;
          if (open) {
            open(ws);
          }
        }
      },
    } as WebSocketHandler<WSData>,
    async fetch(req, server) {
      const url = new URL(req.url);

      if (wsHandler[url.pathname]) {
        if (
          server.upgrade(req, {
            data: {
              url: new URL(req.url),
            },
          })
        ) {
          return;
        }
        return new Response("Upgrade failed :(", { status: 500 });
      }

      try {
        const api = await serveAPI(url, req);
        if (api) {
          return api;
        }
      } catch (e) {
        g.log.error(e);
      }

      const webPath = "app/static";
      try {
        const found = cache.static[url.pathname];
        if (found && g.mode === "prod") {
          const res = new Response(found.content);
          res.headers.set("Content-Type", found.type);
        }

        const file = Bun.file(dir.path(`${webPath}${url.pathname}`));
        if ((await file.exists()) && file.type !== "application/octet-stream") {
          cache.static[url.pathname] = {
            type: file.type,
            content: file.stream(),
          };
          const found = cache.static[url.pathname];
          return new Response(found.content);
        }
      } catch (e) {
        g.log.error(e);
      }

      try {
        return new Response(Bun.file(dir.path(`${webPath}/index.html`)) as any);
      } catch (e) {
        g.log.error(e);
        return new Response("Loading...");
      }
    },
  });

  if (g.mode === "dev") {
    g.log.info(`http://localhost:${g.server.port}`);
  } else {
    g.log.info(`Started at port: ${g.server.port}`);
  }
};
