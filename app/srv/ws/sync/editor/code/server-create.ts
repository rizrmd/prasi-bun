import { g } from "utils/global";
import { dbProxy } from "../../../../../web/src/base/load/db/db-proxy";

if (!g.createServer) {
  g.server_runtime = {};
  g.createServer = (arg) => {
    return async (site_id: string) => {
      if (!g.server_runtime[site_id]) {
        const site = await _db.site.findFirst({
          where: {
            id: site_id,
          },
          select: {
            config: true,
          },
        });
        if (site?.config && (site.config as any).api_url) {
          try {
            new URL((site.config as any).api_url);
            g.server_runtime[site_id] = {
              db: dbProxy((site.config as any).api_url),
              api: null as any,
            };
          } catch (e) {}
        }
      }

      const runtime = g.server_runtime[site_id];
      if (runtime) {
        const db = runtime.db as any;
        if (
          !!db._ &&
          typeof db._._ === "function" &&
          !!arg.db &&
          typeof arg.db.___site_id === "function"
        ) {
          arg.db.___site_id(site_id);
        }
      }

      return arg;
    };
  };
}
