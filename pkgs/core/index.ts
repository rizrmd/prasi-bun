import { startDevWatcher } from "./utils/dev-watcher";
import { ensureNotRunning } from "./utils/ensure";
import { preparePrisma } from "./utils/prisma";
import { generateAPIFrm } from "./server/api-frm";
import { createServer } from "./server/create";
import { prepareAPITypes } from "./server/prep-api-ts";
import { config } from "./utils/config";
import { g } from "./utils/global";
import { createLogger } from "./utils/logger";
import { parcelBuild } from "utils/parcel";
import { prepareApiRoutes } from "./server/api-scan";

g.status = "init";

await createLogger();
g.port = parseInt(process.env.PORT || "4550");
g.mode = process.argv.includes("dev") ? "dev" : "prod";
g.log.info(g.mode === "dev" ? "DEVELOPMENT" : "PRODUCTION");
if (g.mode === "dev") {
  await startDevWatcher();
}

await preparePrisma();
await ensureNotRunning();
await config.init();

if (g.db) {
  g.db.$connect().catch((e: any) => {
    g.log.error(`[DB ERROR]\n${e.message}`);
  });
}

await createServer();
await parcelBuild();
await generateAPIFrm();
await prepareApiRoutes();
await prepareAPITypes();
g.status = "ready";
