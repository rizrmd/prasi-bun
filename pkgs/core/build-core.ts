import { $ } from "bun";
import { dir } from "dir";
import { context } from "esbuild";
import { removeAsync } from "fs-jetpack";

await removeAsync(dir.path('/app/srv/core'))
await $`bun tailwindcss -i  src/nova/prod/tailwind.css -m -o ../srv/core/index.css`
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
  sourcemap: false,
  logLevel: "error",
  assetNames: `[name]`,
  loader: { ".woff": "file", ".ttf": "file", ".woff2": "file" },
  define: {
    "process.env.NODE_ENV": `"production"`,
  },
});

ctx.watch();
