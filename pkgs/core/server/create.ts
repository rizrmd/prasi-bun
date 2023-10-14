import { createRouter } from "radix3";
import { dir } from "../utils/dir";
import { g } from "../utils/global";
import { serveAPI } from "./serve-api";

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
        const file = Bun.file(dir(`app/static${url.pathname}`));
        if (file.type !== "application/octet-stream") {
          return new Response(file as any);
        }
      } catch (e) {
        g.log.error(e);
      }
      try {
        return new Response(Bun.file(dir(`app/static/index.html`)) as any);
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
