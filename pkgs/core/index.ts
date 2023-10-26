import { parcelBuild } from "utils/parcel";
import { generateAPIFrm } from "./server/api-frm";
import { prepareApiRoutes } from "./server/api-scan";
import { createServer } from "./server/create";
import { prepareAPITypes } from "./server/prep-api-ts";
import { startDevWatcher } from "./utils/dev-watcher";
import { ensureNotRunning } from "./utils/ensure";
import { g } from "./utils/global";
import { createLogger } from "./utils/logger";
import { preparePrisma } from "./utils/prisma";
import { syncActionDefinition } from "utils/sync-def";
import { user } from "../../app/srv/ws/sync/entity/user";
import { snapshot } from "../../app/srv/ws/sync/entity/snapshot";
import { initSrv } from "../../app/srv/init";

g.status = "init";

await createLogger();
g.api = {};
g.mode = process.argv.includes("dev") ? "dev" : "prod";
g.datadir = g.mode == "prod" ? "../data" : "data";
g.port = parseInt(process.env.PORT || "4550");

g.log.info(g.mode === "dev" ? "DEVELOPMENT" : "PRODUCTION");
if (g.mode === "dev") {
  await startDevWatcher();
}

/** init lmdb */
user.conf.init();
snapshot.init();

await preparePrisma();
await ensureNotRunning();

if (g.db) {
  g.db.$connect().catch((e: any) => {
    g.log.error(`[DB ERROR]\n${e.message}`);
  });
}

await initSrv();
await syncActionDefinition();
await generateAPIFrm();
await prepareApiRoutes();
await prepareAPITypes();
await parcelBuild();
await createServer();

g.status = "ready";
