import { g } from "../utils/global";
import { serveAPI } from "./serve-api";
import { serveStatic } from "./serve-static";
import { serveWS } from "./serve-ws";

export const cache = {
  static: {} as Record<
    string,
    {
      type: string;
      content: ArrayBuffer;
      br?: ArrayBuffer;
    }
  >,
};

export type WSData = { url: URL };

export const createServer = async () => {
  await serveAPI.init();
  await serveStatic.init();
  const { wsHandler } = await import("../../../app/srv/ws/handler");

  g.server = Bun.serve({
    port: g.port,
    maxRequestBodySize: 1024 * 1024 * 128,
    websocket: await serveWS(wsHandler),
    async fetch(req, server) {
      const url = new URL(req.url);
      const handle = async (req: Request) => {
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

        if (serveStatic.exists(url)) {
          return serveStatic.serve(url);
        }

        const api_response = await serveAPI.serve(url, req);
        if (api_response) {
          return api_response;
        }

        return serveStatic.serve(url);
      };

      if (g.server_hook) {
        return await g.server_hook({ url, req, server, handle, wsHandler });
      } else {
        return await handle(req);
      }
    },
  });

  if (g.mode === "dev") {
    g.log.info(`http://localhost:${g.server.port}`);
  } else {
    g.log.info(`Started at port: ${g.server.port}`);
  }
};
