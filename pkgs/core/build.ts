import { spawn } from "bun";
import { dir } from "dir";
import { statSync } from "fs";
import { listAsync, removeAsync, writeAsync } from "fs-jetpack";
import brotliPromise from "brotli-wasm";
const brotli = await brotliPromise;

await removeAsync(dir.path("app/static"));
await removeAsync(dir.path("app/web/.parcel-cache"));
await removeAsync(dir.path("app/static"));

const args = [
  "node",
  dir.path("node_modules/.bin/parcel"),
  "build",
  "./src/index.tsx",
  // "--no-optimize",
  "--no-scope-hoist",
  "--dist-dir",
  dir.path(`app/static`),
];

const parcel = spawn({
  cmd: args,
  cwd: dir.path("app/web"),
  stdio: ["ignore", "inherit", "inherit"],
});
await parcel.exited;

listAsync(dir.path("app/static")).then(async (files) => {
  if (files) {
    await removeAsync(dir.path("app/static-br"));
    await Promise.all(
      files
        .filter((e) => statSync(dir.path(`app/static/${e}`)).isFile())
        .map(async (file) => {
          const br = brotli.compress(
            new Uint8Array(
              await Bun.file(dir.path(`app/static/${file}`)).arrayBuffer()
            )
          );
          if (br) {
            console.log(`Compressing ${file}`);
            await writeAsync(
              dir.path(`app/static-br/${file}`),
              Buffer.from(br)
            );
          }
        })
    );
  }
});
