import { dirAsync } from "fs-jetpack";
import { dir } from "./dir";
import { g } from "./global";
import { spawn } from "bun";

export const parcelBuild = async () => {
  await dirAsync("app/static");
  const args = [
    "node",
    dir("node_modules/.bin/parcel"),
    g.mode === "dev" ? "watch" : "build",
    "./src/index.tsx",
    g.mode === "dev" ? "--no-hmr" : "--no-optimize",
    "--dist-dir",
    dir(`app/static`),
  ];

  g.log.info(`Building web with parcel`);
  if (g.mode !== "dev") {
    const parcel = spawn({
      cmd: args,
      cwd: dir("app/web"),
      stdio: ["ignore", "inherit", "inherit"],
    });
    await parcel.exited;
  } else {
    const parcel = spawn({
      cmd: args,
      cwd: dir("app/web"),
      stdio: ["ignore", "pipe", "pipe"],
    });

    let output = true;
    (async () => {
      if (parcel.stdout) {
        for await (const chunk of parcel.stdout) {
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
  }
};
