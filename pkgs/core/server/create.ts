import { createRouter } from "radix3";
import { dir } from "../utils/dir";
import { g } from "../utils/global";
import { scanApi } from "./api-scan";
import { serveAPI } from "./serve-api";

export const createServer = async () => {
  g.router = createRouter({ strictTrailingSlash: true });
  await scanApi();

  g.server = Bun.serve({
    port: g.port,
    async fetch(req) {
      const url = new URL(req.url);

      const api = await serveAPI(url, req);
      if (api) {
        return api;
      }

      try {
        const file = Bun.file(dir(`app/static${url.pathname}`));
        if (file.type !== "application/octet-stream") {
          return new Response(file as any);
        }
      } catch (e) {}
      return new Response(Bun.file(dir(`app/static/index.html`)) as any);
    },
  });

  if (g.mode === "dev") {
    g.log.info(`http://localhost:${g.server.port}`);
  } else {
    g.log.info(`Started at port: ${g.server.port}`);
  }
};
