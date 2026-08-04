import { spawn } from "bun";
import { dirAsync } from "fs-jetpack";
import { dir } from "./dir";
import { g } from "./global";

const decoder = new TextDecoder();
export const parcelBuild = async () => {
  await dirAsync(dir.path(`static`));

  // Always invoke parcel via node + package entry (Windows .bin/*.exe shims break under node)
  const args = [
    "node",
    dir.path("node_modules/parcel/lib/bin.js"),
    g.mode === "dev" ? "watch" : "build",
    "./src/index.html",
    g.mode === "dev" ? "--no-hmr" : "",
    "--dist-dir",
    dir.path(`static`),
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
      const markReady = (text: string) => {
        // Parcel prints ✨ on Unix; on Windows often "Built" / "√ Built"
        if (
          !decoded &&
          (text.includes("✨") ||
            text.includes("Built in") ||
            text.includes("√ Built") ||
            text.includes("√"))
        ) {
          resolve();
          decoded = true;
        }
      };
      (async () => {
        if (parcel.stdout) {
          for await (const chunk of parcel.stdout as any) {
            const text = decoder.decode(chunk);
            markReady(text);
            if (output) process.stdout.write(chunk);
          }
        }
      })();

      (async () => {
        if (parcel.stderr) {
          for await (const chunk of parcel.stderr as any) {
            const text = decoder.decode(chunk);
            markReady(text);
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
