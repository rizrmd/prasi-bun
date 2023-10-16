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

g.status = "init";


await createLogger();
g.api = {};
g.mode = process.argv.includes("dev") ? "dev" : "prod";
g.datadir = g.mode == "prod" ? "../data" : ".data";
g.port = parseInt(process.env.PORT || "4550");
g.log.info(g.mode === "dev" ? "DEVELOPMENT" : "PRODUCTION");
if (g.mode === "dev") {
  await startDevWatcher();
}

await preparePrisma();
await ensureNotRunning();

if (g.db) {
  g.db.$connect().catch((e: any) => {
    g.log.error(`[DB ERROR]\n${e.message}`);
  });
}

createServer();
await parcelBuild();
await generateAPIFrm();
await prepareApiRoutes();
await prepareAPITypes();
g.status = "ready";
