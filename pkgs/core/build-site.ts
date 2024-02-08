import { dir } from "dir";
import { Plugin, context } from "esbuild";
import { $ } from "execa";
import { removeAsync, writeAsync } from "fs-jetpack";

await removeAsync(dir.path("app/srv/site"));
const onEndPlugin: Plugin = {
  name: "on-end",
  setup(build) {
    build.onEnd(async (result) => {
      console.log("Compressing deploy");
      await removeAsync(dir.path("app/srv/site.zip"));
      await $({ cwd: dir.path("app/srv") })`zip -r site.zip site`;
      process.exit(0);
    });
  },
};

console.log("Building deploy");
const ctx = await context({
  bundle: true,
  absWorkingDir: dir.path(""),
  entryPoints: [dir.path("app/web/src/render/site/site.tsx")],
  outdir: dir.path("app/srv/site"),
  splitting: true,
  format: "esm",
  jsx: "transform",
  minify: true,
  sourcemap: true,
  logLevel: "error",
  plugins: [onEndPlugin],
  define: {
    "process.env.NODE_ENV": `"production"`,
  },
});
await ctx.rebuild();
await writeAsync(
  dir.path("app/srv/site/index.html"),
  `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=1.0, minimum-scale=1.0, maximum-scale=1.0">
  <title></title>
  <link rel="stylesheet" href="https://prasi.app/index.css">
</head>
<body class="flex-col flex-1 w-full min-h-screen flex opacity-0">
  <div id="root"></div>
  <script src="/site.js" type="module"></script>
</body>
</html>`
);
