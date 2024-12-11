import { Server, Subprocess, WebSocketHandler } from "bun";
import { Logger } from "pino";
import { RadixRouter } from "radix3";
import { syncronize } from "y-pojo";
import type * as Y from "yjs";
//@ts-ignore
import { PrismaClient } from "../../../app/db/db";
import { WSData } from "../server/create";
import {
  ApiProxy,
  apiProxy,
} from "../../../app/web/src/base/load/api/api-proxy";
import { dbProxy } from "../../../app/web/src/base/load/db/db-proxy";
import { BrotliWasmType } from "brotli-wasm";

type SingleRoute = {
  url: string;
  args: string[];
  fn: (...arg: any[]) => Promise<any>;
  path: string;
  raw: any;
};

export const g = global as unknown as {
  status: "init" | "ready";
  server_main_handler: any;
  server_handle_timeout: Record<string, any>;
  server_hook?: (arg: {
    url: URL;
    req: Request;
    server: Server;
    handle: (
      req: Request,
      opt?: {
        rewrite?: (arg: {
          body: Bun.BodyInit;
          headers: Headers | any;
        }) => Bun.BodyInit;
      }
    ) => Promise<Response>;
    wsHandler: Record<string, WebSocketHandler<WSData>>;
    serveStatic?: any;
    serveAPI?: any;
    prasi: { page_id?: string };
  }) => Promise<Response | undefined>;
  server_runtime: Record<
    string,
    null | {
      api: ReturnType<typeof apiProxy>;
      db: ReturnType<typeof dbProxy>;
    }
  >;
  createServerRuntime: (site_id: string) => Promise<void>;
  ws_hook?: WebSocketHandler<WSData>;
  _db: PrismaClient;
  dburl: string;
  mode: "dev" | "prod";
  server: Server;
  log: Logger;
  _api: Record<string, SingleRoute>;
  domains: null | Record<string, string>;
  router: RadixRouter<SingleRoute>;
  port: number;
  frm: {
    js: string;
    etag: string;
  };
  parcel: Subprocess;
  apiPrepared: boolean;
  Y: typeof Y;
  syncronize: typeof syncronize;
  static_cache: any;
  route_cache_compressing: Set<string>;
  route_cache: Record<string, { br?: any; gzip?: any }>;
  main_cache: Record<string, { content: any; type: string }>;
  br: BrotliWasmType;
  preview_page_timeout: Record<string, Timer>;
  preview_comp_timeout: Record<string, Timer>;
};
