import { $ } from "bun";
import { dir } from "dir";
import { context } from "esbuild";
import { removeAsync } from "fs-jetpack";
import { polyfillNode } from "esbuild-plugin-polyfill-node";

await removeAsync(dir.path("/app/srv/core"));
await $`bun tailwindcss -i  src/nova/prod/tailwind.css -o ../srv/core/index.css`
  .cwd(dir.path(`/app/web`))
  .quiet();

const ctx = await context({
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
  metafile: true,
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

ctx.rebuild().then((e) => {
  Bun.write(dir.data("metafile.json"), JSON.stringify(e.metafile));
});
ctx.watch();
