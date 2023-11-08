import brotliPromise from "brotli-wasm";
import { spawn } from "bun";
import { dir } from "dir";
import { fdir } from "fdir";
import { statSync } from "fs";
import {
  copyAsync,
  existsAsync,
  listAsync,
  removeAsync,
  writeAsync,
} from "fs-jetpack";
const brotli = await brotliPromise;

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

const public_br = dir.path("app/web/public-br");
if (!(await existsAsync(public_br))) {
  const api = new fdir().withRelativePaths().crawl(dir.path("app/web/public"));
  const files = api.sync();
  if (files) {
    await Promise.all(
      files.map(async (file) => {
        const br = brotli.compress(
          new Uint8Array(
            await Bun.file(dir.path(`app/web/public/${file}`)).arrayBuffer()
          ),
          { quality: 11 }
        );
        if (br) {
          console.log(`Compressing ${file}`);
          await writeAsync(
            dir.path(`app/web/public-br/${file}`),
            Buffer.from(br)
          );
        }
      })
    );
  }
}

const static_br = dir.path("app/static-br");
await removeAsync(static_br);
const files = await listAsync(dir.path("app/static"));
if (files) {
  await Promise.all(
    files
      .filter((file) => statSync(dir.path(`app/static/${file}`)).isFile())
      .map(async (file) => {
        if (!(await Bun.file(dir.path(`app/static-br/${file}`)).exists())) {
          const br = brotli.compress(
            new Uint8Array(
              await Bun.file(dir.path(`app/static/${file}`)).arrayBuffer()
            ),
            { quality: 11 }
          );
          if (br) {
            console.log(`Compressing ${file}`);
            await writeAsync(
              dir.path(`app/static-br/${file}`),
              Buffer.from(br)
            );
          }
        }
      })
  );

  const pub = await listAsync(dir.path("app/web/public-br"));
  if (pub) {
    await Promise.all(
      pub.map((file) =>
        copyAsync(
          dir.path(`app/web/public-br/${file}`),
          dir.path(`app/static-br/${file}`),
          { overwrite: true }
        )
      )
    );
  }
}

await import("./build-site");
