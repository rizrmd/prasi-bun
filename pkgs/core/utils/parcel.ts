import { spawn } from "bun";
import {
  dirAsync,
  inspectTreeAsync,
  writeAsync
} from "fs-jetpack";
import { InspectTreeResult } from "fs-jetpack/types";
import { cache } from "../server/create";
import { dir } from "./dir";
import { g } from "./global";

import brotliPromise from "brotli-wasm";
const brotli = await brotliPromise;

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
  if (g.mode === "prod") {
    setTimeout(() => {
      inspectTreeAsync(dir.path("app/static")).then((tree) => {
        if (tree) {
          const walk = async (item: InspectTreeResult, parent: string[]) => {
            if (item.type === "file") {
              let path = `${parent.slice(1).join("/")}/${item.name}`;
              if (!path.startsWith("/")) path = `/${path}`;

              if (!cache.static[path]) {
                const file = Bun.file(dir.path(`/app/static${path}`));
                cache.static[path] = {
                  type: item.type,
                  content: await file.arrayBuffer(),
                };
              }
              const found = cache.static[path];

              const staticBr = Bun.file(dir.path(`app/static-br${path}`));
              if (await staticBr.exists()) {
                found.br = new Uint8Array(await staticBr.arrayBuffer());
              } else {
                const pubFile = Bun.file(dir.path(`/app/web/public${path}`));
                const pubBr = Bun.file(dir.path(`/app/web/public-br${path}`));
                if (await pubFile.exists()) {
                  if (await pubBr.exists()) {
                    found.br = new Uint8Array(await pubBr.arrayBuffer());
                  } else {
                    found.br = brotli.compress(
                      new Uint8Array(cache.static[path].content)
                    );
                    if (found.br) {
                      await writeAsync(
                        dir.path(`/app/web/public-br${path}`),
                        Buffer.from(found.br)
                      );
                    }
                  }
                } else {
                  found.br = brotli.compress(
                    new Uint8Array(cache.static[path].content)
                  );
                }
              }
            } else if (item.type === "dir") {
              for (const child of item.children) {
                await walk(child, [...parent, item.name]);
              }
            }
          };
          walk(tree, []);
        }
      });
    }, 1000);
  }

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
