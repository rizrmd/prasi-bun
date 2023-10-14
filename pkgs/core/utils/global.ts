import { Server } from "bun";
import { Logger } from "pino";
import { RadixRouter } from "radix3";
import { PrismaClient } from "../../../app/db/db";

type SingleRoute = {
  url: string;
  args: string[];
  fn: (...arg: any[]) => Promise<any>;
  path: string;
};

export const g = global as unknown as {
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
};
