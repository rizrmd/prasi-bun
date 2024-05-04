import type { Server, WebSocketHandler } from "bun";
import { existsAsync } from "fs-jetpack";
import _fs from "node:fs/promises";
import { g } from "utils/global";
import { waitUntil } from "web-utils";
import { WSData } from "../../../../../../pkgs/core/server/create";
import { prodIndex } from "../../../../util/prod-index";

import { code } from "../../code/code";
import "./server-runtime";

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
    this.init_timeout = setTimeout(async () => {
      try {
        const server_src_path = code.path(
          site_id,
          "server",
          "build",
          "index.js"
        );
        delete require.cache[server_src_path];
        const svr = require(server_src_path);

        if (svr && typeof svr.server === "object") {
          this.handler[site_id] = svr.server;
          this.handler[site_id].site_id = site_id;

          if (typeof svr.server.init === "function") {
            svr.server.init({});
          }

          Bun.write(
            Bun.file(code.path(site_id, "site", "src", "server.log")),
            ""
          );
        } else {
          const file = await Bun.file(server_src_path).text();
          const log_path = code.path(site_id, "site", "src", "server.log");

          if (file.length === 0) {
            await Bun.write(Bun.file(log_path), "server.ts is empty");
          } else {
            await Bun.write(
              Bun.file(log_path),
              "server.ts does not return server object"
            );
          }
        }
      } catch (e: any) {
        const log_path = code.path(site_id, "site", "src", "server.log");
        await Bun.write(Bun.file(log_path), e.message);
        console.log(`Failed to init server ${site_id}\n`, log_path);
      }
    }, 10);
  },
  async http(
    site_id: string,
    arg: Parameters<Exclude<(typeof g)["server_hook"], undefined>>[0]
  ) {
    if (arg.url.pathname.endsWith("main.js")) {
      code.init(site_id, "init http");
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
      if (!handler.site_id) handler.site_id = site_id;

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

        const pathname = `/${arg.url.pathname.split("/").slice(3).join("/")}`;

        return await handler.http({
          ...arg,
          url: {
            pathname,
            raw: arg.url,
          },
          mode: "dev",
          index: prodIndex(site_id, arg.prasi),
        });
      } catch (e: any) {
        if (g.mode === "dev") {
          console.error(e);
        }
        _fs.appendFile(
          code.path(site_id, "site", "src", "server.log"),
          e.message + "\n"
        );
      }
    }
  },
});

type PrasiServer = {
  site_id?: string;
  ws?: WebSocketHandler<{ url: string }>;
  http: (arg: {
    url: { raw: URL; pathname: string };
    req: Request;
    server: Server;
    handle: (req: Request) => Promise<undefined | Response>;
    mode: "dev" | "prod";
    index: { head: string[]; body: string[]; render: () => string };
    prasi: { page_id?: string; params?: Record<string, any> };
  }) => Promise<Response>;
  init?: (arg: { port?: number }) => Promise<void>;
};

const glb = global as unknown as {
  _server: ReturnType<typeof serverMain>;
};
glb._server = serverMain();
export const server = glb._server;
