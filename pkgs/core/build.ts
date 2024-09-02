import { createId } from "@paralleldrive/cuid2";
import brotliPromise from "brotli-wasm";
import { spawn } from "bun";
import { dir } from "dir";
import { build } from "esbuild";
import { polyfillNode } from "esbuild-plugin-polyfill-node";
import { fdir } from "fdir";
import { statSync } from "fs";
import { listAsync, removeAsync, writeAsync } from "fs-jetpack";
import { platform } from "os";
import { $ } from "bun";
import { g } from "utils/global";

g.mode = "prod";
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
  sourcemap: true,
  logLevel: "error",
  assetNames: `[name]`,
  loader: { ".woff": "file", ".ttf": "file", ".woff2": "file" },
  define: {
    "process.env.NODE_ENV": `"production"`,
  },
  plugins: [
    polyfillNode({
      polyfills: {
        buffer: true,
        _stream_duplex: false,
        _stream_passthrough: false,
        _stream_readable: false,
        _stream_transform: false,
        _stream_writable: false,
        assert: false,
        async_hooks: false,
        child_process: false,
        cluster: false,
        console: false,
        constants: false,
        crypto: false,
        dgram: false,
        diagnostics_channel: false,
        dns: false,
        domain: false,
        events: false,
        fs: false,
        http: false,
        http2: false,
        https: false,
        module: false,
        net: false,
        os: false,
        path: false,
        perf_hooks: false,
        process: false,
        punycode: false,
        querystring: false,
        readline: false,
        repl: false,
        stream: false,
        string_decoder: false,
        sys: false,
        timers: false,
        tls: false,
        tty: false,
        url: false,
        util: false,
        v8: false,
        vm: false,
        wasi: false,
        worker_threads: false,
        zlib: false,
        "assert/strict": false,
        "fs/promises": false,
        "timers/promises": false,
      },
    }),
  ],
});

const build_all =
  process.argv[process.argv.length - 1] === "main" ? false : true;
if (build_all) {
  await removeAsync(dir.path("app/web/.parcel-cache"));
  await removeAsync(dir.data("static-temp"));

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
    "./src/index.html",
    // "--no-optimize",
    "--no-scope-hoist",
    "--dist-dir",
    dir.data(`static-temp`),
  ];

  console.log(args);

  let build_static =
    process.argv[process.argv.length - 1] === "public" ? false : true;

  if (!build_static) {
    const public_br = dir.path("app/web/public-br");
    await removeAsync(public_br);
  }

  const api = new fdir().withRelativePaths().crawl(dir.path("app/web/public"));
  const public_files = api.sync();
  if (public_files) {
    await Promise.all(
      public_files.map(async (file) => {
        const brfile = Bun.file(dir.path(`app/web/public-br/${file}`));
        if (!(await brfile.exists())) {
          const bfile = Bun.file(dir.path(`app/web/public/${file}`));
          const br = brotli.compress(
            new Uint8Array(await bfile.arrayBuffer()),
            {
              quality: 11,
            }
          );
          if (br) {
            console.log(`Compressing [public] ${file}`);
            await Bun.write(
              dir.path(`app/web/public-br/${file}`),
              Buffer.from(br)
            );
          }
        }
      })
    );
    await Bun.write(
      dir.path("app/web/public_files.ts"),
      `export const files = ${JSON.stringify(public_files, null, 2)}`
    );
  }

  if (build_static) {
    const parcel = spawn({
      cmd: args,
      cwd: dir.path("app/web"),
      stdio: ["ignore", "inherit", "inherit"],
    });
    await parcel.exited;

    const static_br = dir.data("static-br-temp");
    await removeAsync(static_br);
    const static_files = await listAsync(dir.data("static-temp"));
    if (static_files) {
      await Promise.all(
        static_files
          .filter((file) => statSync(dir.data(`static-temp/${file}`)).isFile())
          .map(async (file) => {
            if (
              !(await Bun.file(dir.data(`static-br-temp/${file}`)).exists())
            ) {
              const br = brotli.compress(
                new Uint8Array(
                  await Bun.file(dir.data(`static-temp/${file}`)).arrayBuffer()
                ),
                { quality: 11 }
              );
              if (br) {
                console.log(`Compressing [static] ${file}`);
                await writeAsync(
                  dir.data(`static-br-temp/${file}`),
                  Buffer.from(br)
                );
              }
            }
          })
      );
    }

    $`rm -rf ${dir.data(`static-br`)}`.nothrow();
    $`rm -rf ${dir.data(`static`)}`.nothrow();
    $`mv ${dir.data(`static-br-temp`)} ${dir.data(`static-br`)}`.nothrow();
    $`mv ${dir.data(`static-temp`)} ${dir.data(`static`)}`.nothrow();
  }
}
