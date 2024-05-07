import { createId } from "@paralleldrive/cuid2";
import { dir } from "dir";
import { writeAsync } from "fs-jetpack";
import { parcelBuild } from "utils/parcel";
import { syncActionDefinition } from "utils/sync-def";
import { snapshot } from "../../app/srv/ws/sync/entity/snapshot";
import { user } from "../../app/srv/ws/sync/entity/user";
import { prepareApiRoutes } from "./server/api/api-scan";
import { watchApiRoutes } from "./server/api/api-watch";
import { prepareAPITypes } from "./server/api/prep-api-ts";
import { startDevWatcher } from "./utils/dev-watcher";
import { ensureNotRunning } from "./utils/ensure";
import { g } from "./utils/global";
import { createLogger } from "./utils/logger";
import { preparePrisma } from "./utils/prisma";

g.status = "init";

await writeAsync(
  dir.path("app/web/timestamp.ts"),
  `export const version = "${createId().substring(0, 7)}";`
);

if (!g.Y) {
  g.Y = await import("yjs");
  g.syncronize = (await import("y-pojo")).syncronize;

  await createLogger();
  g._api = {};
  g.mode = process.argv.includes("dev") ? "dev" : "prod";
  g.port = parseInt(process.env.PORT || "4550");

  g.log.info(g.mode === "dev" ? "DEVELOPMENT" : "PRODUCTION");
  if (g.mode === "dev") {
    await startDevWatcher();
  }

  /** init lmdb */
  user.conf.init();
  snapshot.init();
}

const db = g._db;
if (!db) {
  await preparePrisma();
  await ensureNotRunning();
  const db = g._db;
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
await import("../../app/srv/init");
await prepareApiRoutes();

if (!g.apiPrepared) {
  await syncActionDefinition();
  g.log.info("WS Action defined");
  await prepareAPITypes();
  g.log.info("API Prepared");
  g.apiPrepared = true;

  if (g.mode === "dev") {
    watchApiRoutes();
  }
}

if (g.mode === "dev") await import("./build-core");

if (!g.parcel && g.mode === "dev") {
  await parcelBuild();
}

const { createServer } = await import("./server/create");
await createServer();
g.status = "ready";
