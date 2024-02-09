import { Server, Subprocess, WebSocketHandler } from "bun";
import { Logger } from "pino";
import { RadixRouter } from "radix3";
import { syncronize } from "y-pojo";
import type * as Y from "yjs";
import { PrismaClient } from "../../../app/db/db";
import { WSData } from "../server/create";

type SingleRoute = {
  url: string;
  args: string[];
  fn: (...arg: any[]) => Promise<any>;
  path: string;
};

export const g = global as unknown as {
  status: "init" | "ready";
  server_hook?: (arg: {
    url: URL;
    req: Request;
    server: Server;
    handle: (req: Request) => Promise<Response | undefined>;
  }) => Promise<Response | undefined>;
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
};
