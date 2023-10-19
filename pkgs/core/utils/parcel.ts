import { spawn } from "bun";
import { dirAsync } from "fs-jetpack";
import { dir } from "./dir";
import { g } from "./global";


const decoder = new TextDecoder();
export const parcelBuild = async () => {
  await dirAsync("app/static");
  const args = [
    "node",
    dir.path("node_modules/.bin/parcel"),
    g.mode === "dev" ? "watch" : "build",
    "./src/index.tsx",
    g.mode === "dev" ? "--no-hmr" : "--no-optimize",
    "--dist-dir",
    dir.path(`app/static`),
  ];

  if (g.mode === "dev") {
    g.log.info(`Building web with parcel`);

    await new Promise<void>((resolve) => {
      const parcel = spawn({
        cmd: args,
        cwd: dir.path("app/web"),
        stdio: ["ignore", "pipe", "pipe"],
      });

      g.parcel = parcel;

      let output = true;
      let decoded = false;
      (async () => {
        if (parcel.stdout) {
          for await (const chunk of parcel.stdout) {
            if (!decoded && decoder.decode(chunk).includes("✨")) {
              resolve();
              decoded = true;
            }
            if (output) process.stdout.write(chunk);
          }
        }
      })();

      (async () => {
        if (parcel.stderr) {
          for await (const chunk of parcel.stderr) {
            if (output) process.stderr.write(chunk);
          }
        }
      })();

      const cleanup = async () => {
        output = false;
      };

      process.on("SIGINT", async () => {
        await cleanup();
        process.exit();
      });

      process.on("SIGTERM", async () => {
        await cleanup();
        process.exit();
      });

      process.on("beforeExit", async () => {
        await cleanup();
      });
    });
  }
};
