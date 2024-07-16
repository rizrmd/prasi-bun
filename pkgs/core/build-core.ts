import { dir } from "dir";
import { context } from "esbuild";

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
  assetNames: `[name]`,
  loader: { ".woff": "file", ".ttf": "file", ".woff2": "file" },
  define: {
    "process.env.NODE_ENV": `"production"`,
  },
});

ctx.watch();
