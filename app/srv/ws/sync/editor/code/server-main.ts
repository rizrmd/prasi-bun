import type { Server, WebSocketHandler, ServerWebSocket } from "bun";
import { existsAsync } from "fs-jetpack";
import _fs from "node:fs/promises";
import { g } from "utils/global";
import { waitUntil } from "web-utils";
import { code } from "./util-code";
import { WSData } from "../../../../../../pkgs/core/server/create";
import { codeBuild } from "./build-code";
import { prodIndex } from "../../../../util/prod-index";

const serverMain = () => ({
  handler: {} as Record<string, PrasiServer>,
  init_timeout: null as any,
  ws(action: keyof WebSocketHandler<WSData>, ...arg: any[]) {
    const id = arg[0].data.site_id;
    if (this.handler[id]) {
      const handler = this.handler[id].ws;

      if (handler) {
        const fn = handler[action] as any;

        if (typeof fn === "function") {
          return fn(...arg);
        }
      }
    }
  },
  init(site_id: string) {
    clearTimeout(this.init_timeout);
    this.init_timeout = setTimeout(() => {
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
    }, 100);
  },
  async http(
    site_id: string,
    arg: Parameters<Exclude<(typeof g)["server_hook"], undefined>>[0]
  ) {
    if (!code.esbuild[site_id]) {
      await codeBuild(site_id);
    }
    if (typeof this.handler[site_id] === "undefined") {
      if (
        await existsAsync(code.path(site_id, "server", "build", "index.js"))
      ) {
        this.init(site_id);
        await waitUntil(200);
      }
    }
    const handler = this.handler[site_id];
    if (handler) {
      try {
        if (
          handler.ws &&
          arg.req.headers.get("connection")?.toLowerCase() === "upgrade" &&
          !arg.wsHandler[arg.url.pathname]
        ) {
          if (
            arg.server.upgrade(arg.req, {
              data: {
                url: new URL(arg.req.url),
                site_id,
              },
            })
          ) {
            return;
          }
          return new Response("Upgrade failed :(", { status: 500 });
        }

        return await handler.http({
          ...arg,
          mode: "dev",
          index: prodIndex(site_id),
        });
      } catch (e: any) {
        _fs.appendFile(
          code.path(site_id, "site", "src", "server.log"),
          e.message + "\n"
        );
      }
    }
  },
});

type PrasiServer = {
  ws?: WebSocketHandler<{ url: string }>;
  http: (arg: {
    url: URL;
    req: Request;
    server: Server;
    handle: (req: Request) => Promise<undefined | Response>;
    mode: "dev" | "prod";
    index: { head: string[]; body: string[]; render: () => string };
  }) => Promise<Response>;
};

const glb = global as unknown as {
  _server: ReturnType<typeof serverMain>;
};
if (!glb._server) {
  glb._server = serverMain();
}
export const server = glb._server;
