import { createRouter } from "radix3";
import { dir } from "../utils/dir";
import { g } from "../utils/global";
import { serveAPI } from "./serve-api";

const cache = { static: {} as Record<string, any> };
export const createServer = async () => {
  g.api = {};
  g.router = createRouter({ strictTrailingSlash: true });
  g.server = Bun.serve({
    port: g.port,
    async fetch(req) {
      if (g.status === "init") return new Response("initializing...");
      const url = new URL(req.url);

      try {
        const api = await serveAPI(url, req);
        if (api) {
          return api;
        }
      } catch (e) {
        g.log.error(e);
      }

      try {
        if (cache.static[url.pathname]) {
          return new Response(cache.static[url.pathname]);
        }

        const file = Bun.file(dir.path(`app/static${url.pathname}`));
        if ((await file.exists()) && file.type !== "application/octet-stream") {
          cache.static[url.pathname] = file;
          return new Response(file as any);
        }
      } catch (e) {
        g.log.error(e);
      }

      try {
        return new Response(Bun.file(dir.path(`app/static/index.html`)) as any);
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
