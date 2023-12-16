import { createRouter } from "radix3";
import { g } from "../utils/global";
import { serveWS } from "./serve-ws";
import { serveStatic } from "./serve-static";
import { serveAPI } from "./serve-api";

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

  g.server = Bun.serve({
    port: g.port,
    maxRequestBodySize: 9999999,
    development: true,
    websocket: await serveWS(),
    async fetch(req, server) {
      const url = new URL(req.url);

      if (serveStatic.exists(url)) {
        return serveStatic.serve(url);
      }

      await serveAPI.serve(url, req);

      return serveStatic.serve(url);
    },
  });

  if (g.mode === "dev") {
    g.log.info(`http://localhost:${g.server.port}`);
  } else {
    g.log.info(`Started at port: ${g.server.port}`);
  }
};
