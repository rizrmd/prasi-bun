import { parcelBuild } from "utils/parcel";
import { prepareAPITypes } from "./server/api/prep-api-ts";
import { startDevWatcher } from "./utils/dev-watcher";
import { ensureNotRunning } from "./utils/ensure";
import { g } from "./utils/global";
import { createLogger } from "./utils/logger";
import { preparePrisma } from "./utils/prisma";
import { syncActionDefinition } from "utils/sync-def";
import { user } from "../../app/srv/ws/sync/entity/user";
import { snapshot } from "../../app/srv/ws/sync/entity/snapshot";
import { initSrv } from "../../app/srv/init";
import { prepareApiRoutes } from "./server/api/api-scan";

g.status = "init";

if (!g.Y) {
  g.Y = await import("yjs");
  g.syncronize = (await import("y-pojo")).syncronize;

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
}

const db = g.db;
if (!db) {
  await preparePrisma();
  await ensureNotRunning();
  const db = g.db;
  if (db) {
    db.$connect()
      .catch((e: any) => {
        g.log.error(`[DB ERROR]\n${e.message}`);
      })
      .then(() => {
        g.log.info("Database connected");
      });
  }
}

if (!g.apiPrepared) {
  await initSrv();
  await syncActionDefinition();
  g.log.info("WS Action defined");
  await prepareApiRoutes();
  await prepareAPITypes();
  g.log.info("API Prepared");
  g.apiPrepared = true;
}

if (!g.parcel) {
  await parcelBuild();
}

const { createServer } = await import("./server/create");
await createServer();
g.status = "ready";
