import { g } from "utils/global";
import { dbProxy } from "../../../../../web/src/base/load/db/db-proxy";

if (!g.createServerRuntime) {
  g.server_runtime = {};
  g.createServerRuntime = async (site_id: string) => {
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
        } catch (e) { }
      }
    }
  };
}
