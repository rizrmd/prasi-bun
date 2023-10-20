import { spawn } from "bun";
import { dir } from "dir";
import { Plugin, context } from "esbuild";
import { $ } from "execa";
import { listAsync, removeAsync, writeAsync } from "fs-jetpack";

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

// listAsync(dir.path("app/static")).then(async (files) => {
//   if (files) {
//     await removeAsync(dir.path("app/static-br"));
//     await Promise.all(
//       files
//         .filter((e) => statSync(dir.path(`app/static/${e}`)).isFile())
//         .map(async (file) => {
//           const br = brotli.compress(
//             new Uint8Array(
//               await Bun.file(dir.path(`app/static/${file}`)).arrayBuffer()
//             )
//           );
//           if (br) {
//             console.log(`Compressing ${file}`);
//             await writeAsync(
//               dir.path(`app/static-br/${file}`),
//               Buffer.from(br)
//             );
//           }
//         })
//     );
//   }
// });

const buildSite = async () => {
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
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title></title>
  <link rel="stylesheet" href="https://prasi.app/index.css">
</head>
<body class="flex-col flex-1 w-full min-h-screen flex opacity-0">
  <div id="root"></div>
  <script src="/site.js" type="module"></script>
</body>
</html>`
  );
};
await buildSite();
