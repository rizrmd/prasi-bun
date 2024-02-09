import { Server } from "bun";
import { site, user } from "dbgen";
import { ExecaChildProcess } from "execa";
import { g } from "utils/global";

declare global {
  //@ts-ignore
  const Y: typeof Y;
  //@ts-ignore
  const syncronize: typeof Y.syncronize;
}

export const glb = global as unknown as {
  lastUpdate: Record<string, number>;
  prasiSrv: {
    status: Record<
      string,
      | "unavailable"
      | "installing"
      | "starting"
      | "started"
      | "stopped"
      | "destroying"
    >;
    running: Record<string, ExecaChildProcess>;
  };
  server_hook?: typeof g.server_hook;
  ws_hook?: typeof g.ws_hook;
  npm: {
    page: Record<string, null | { file: Buffer; etag: string }>;
    site: Record<string, null | { file: Buffer; etag: string }>;
  };
};

export type Session = {
  user: user & { site: site[] };
};
