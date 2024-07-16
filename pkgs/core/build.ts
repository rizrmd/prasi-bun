import { createId } from "@paralleldrive/cuid2";
import brotliPromise from "brotli-wasm";
import { Glob, spawn } from "bun";
import { dir } from "dir";
import { build } from "esbuild";
import { fdir } from "fdir";
import { statSync } from "fs";
import { platform } from "os";
import {
  copyAsync,
  existsAsync,
  listAsync,
  removeAsync,
  writeAsync,
} from "fs-jetpack";
const brotli = await brotliPromise;

await build({
  bundle: true,
  absWorkingDir: dir.path(""),
  entryPoints: [dir.path("app/web/src/nova/prod/main.tsx")],
  outdir: dir.path(`/app/srv/core`),
  splitting: true,
  format: "esm",
  jsx: "transform",
  minify: true,
  external: ["*.png", "*.woff", "*.woff2", "*.ttf", "*.jpeg", "*.jpg", "*.svg"],
  sourcemap: true,
  logLevel: "error",
  define: {
    "process.env.NODE_ENV": `"production"`,
  },
});

const build_all =
  process.argv[process.argv.length - 1] === "main" ? false : true;
if (build_all) {
  const glob = new Glob("**");
  const public_files = [] as string[];
  for await (const file of glob.scan(dir.path("app/web/public"))) {
    public_files.push(file);
  }
  await Bun.write(
    dir.path("app/web/public_files.ts"),
    `export const files = ${JSON.stringify(public_files, null, 2)}`
  );

  await removeAsync(dir.path("app/web/.parcel-cache"));
  await removeAsync(dir.path("app/static"));

  await writeAsync(
    dir.path("app/web/timestamp.ts"),
    `export const version = "${createId().substring(0, 7)}";`
  );

  const args = [
    "node",
    dir.path(
      platform() === "win32"
        ? "node_modules/.bin/parcel.exe"
        : "node_modules/.bin/parcel"
    ),
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
    const api = new fdir()
      .withRelativePaths()
      .crawl(dir.path("app/web/public"));
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
            console.log(`Compressing [public] ${file}`);
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
              console.log(`Compressing [static] ${file}`);
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
        pub.map(async (file) => {
          if (await existsAsync(`app/static-br/${file}`)) {
            await removeAsync(`app/static-br/${file}`);
          }
          await copyAsync(
            dir.path(`app/web/public-br/${file}`),
            dir.path(`app/static-br/${file}`)
          );
        })
      );
    }
  }
}
