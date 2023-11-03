import { Server, Subprocess } from "bun";
import { Logger } from "pino";
import { RadixRouter } from "radix3";
import { PrismaClient } from "../../../app/db/db";
import type * as Y from "yjs";

type SingleRoute = { 
  url: string;
  args: string[];
  fn: (...arg: any[]) => Promise<any>;
  path: string;
};

export const g = global as unknown as {
  status: "init" | "ready";
  datadir: string;
  db: PrismaClient;
  dburl: string;
  mode: "dev" | "prod";
  server: Server;
  log: Logger;
  api: Record<string, SingleRoute>;
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
};
