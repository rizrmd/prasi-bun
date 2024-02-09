import type { Server, WebSocketHandler } from "bun";
import _fs from "node:fs/promises";
import { g } from "utils/global";
import { code } from "./util-code";

type PrasiServer = {
  ws?: WebSocketHandler<{ url: string }>;
  http: (arg: {
    url: URL;
    req: Request;
    server: Server;
    handle: (req: Request) => Promise<undefined | Response>;
  }) => Promise<Response>;
};

if (!g._server) {
  g._server = {
    handler: {} as Record<string, PrasiServer>,
    init_timeout: null as any,
    init(site_id: string) {
      clearTimeout(this.init_timeout);
      this.init_timeout = setTimeout(() => {
        console.log("server init", site_id);
        try {
          const server_src_path = code.path(
            site_id,
            "server",
            "build",
            "index.js"
          );
          delete require.cache[server_src_path];
          const svr = require(server_src_path);
          if (svr && svr.server) {
            this.handler[site_id] = svr.server;
          }

          Bun.write(
            Bun.file(code.path(site_id, "site", "src", "server.log")),
            ""
          );
        } catch (e) {
          console.log(`Failed to init server ${site_id}`);
        }
      }, 300);
    },
    async serve(
      site_id: string,
      arg: Parameters<Exclude<(typeof g)["server_hook"], undefined>>[0]
    ) {
      const handler = this.handler[site_id];
      console.log(this.handler);

      if (handler) {
        try {
          return await handler.http(arg);
        } catch (e: any) {
          _fs.appendFile(
            code.path(site_id, "site", "src", "server.log"),
            e.message + "\n"
          );
        }
      }
    },
  };
}
export const server = g._server;
