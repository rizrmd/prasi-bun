import globalExternals from "@fal-works/esbuild-plugin-global-externals";
import style from "@hyrious/esbuild-plugin-style";
import { dir } from "dir";
import { context, formatMessages } from "esbuild";
import { cleanPlugin } from "esbuild-clean-plugin";
import { watch } from "fs";
import { existsAsync } from "fs-jetpack";
import { appendFile } from "node:fs/promises";
import { server } from "../../../editor/code/server-main";
import { conns } from "../../../entity/conn";
import { user } from "../../../entity/user";
import { sendWS } from "../../../sync-handler";
import { SyncType } from "../../../type";
import { code } from "../../code";
import { $ } from "bun";
const pending = {} as any;

export const initFrontEnd = async (
  root: string,
  id_site: string,
  force?: boolean
) => {
  let existing = code.internal.frontend[id_site];

  if (existing) {
    if (existing.npm) {
      if (pending[id_site]) return;
      pending[id_site] = true;
      await existing.npm;
      delete pending[id_site];
      delete existing.npm;
    } else {
      if (force) {
        try {
          existing.watch.close();
          await existing.ctx.dispose();
          delete code.internal.frontend[id_site];
        } catch (e) {}
      } else {
        if (existing.ctx) {
          return;
        }
      }
    }
  } else {
    if (
      !(await existsAsync(code.path(id_site, "site", "src", "node_modules")))
    ) {
      return;
    }
  }

  try {
    await isInstalling(id_site);
    const out_dir_temp = dir.data(`code/${id_site}/site/build-temp`);
    const out_dir_switch = dir.data(`code/${id_site}/site/build-switch`);
    const out_dir = dir.data(`code/${id_site}/site/build`);
    const build_ctx = await context({
      absWorkingDir: dir.data(root),
      entryPoints: ["index.tsx"],
      outdir: out_dir_temp,
      format: "esm",
      bundle: true,
      minify: true,
      treeShaking: true,
      splitting: true,
      logLevel: "silent",
      sourcemap: true,
      metafile: true,
      plugins: [
        cleanPlugin(),
        style(),
        globalExternals({
          react: {
            varName: "window.React",
            type: "cjs",
          },
          "react-dom": {
            varName: "window.ReactDOM",
            type: "cjs",
          },
        }),
        {
          name: "prasi",
          async setup(setup) {
            try {
              setup.onEnd(async (res) => {
                if (res.errors.length > 0) {
                  await codeError(
                    id_site,
                    (await formatMessages(res.errors, { kind: "error" })).join(
                      "\n\n"
                    )
                  );
                } else {
                  await codeError(id_site, "");

                  const client_ids = new Set<string>();
                  user.active.findAll({ site_id: id_site }).forEach((e) => {
                    client_ids.add(e.client_id);
                  });

                  const now = Date.now();
                  client_ids.forEach((client_id) => {
                    const ws = conns.get(client_id)?.ws;
                    if (ws)
                      sendWS(ws, {
                        type: SyncType.Event,
                        event: "code_changes",
                        data: { ts: now, mode: "frontend" },
                      });
                  });

                  await $`rm -rf ${out_dir_switch}`.quiet();
                  await $`mv ${out_dir} ${out_dir_switch}`.quiet();
                  await $`mv ${out_dir_temp} ${out_dir}`.quiet();
                }
              });
            } catch (e) {
              console.log("ERROR");
            }
          },
        },
      ],
    });
    code.internal.frontend[id_site] = {
      ctx: build_ctx,
      timeout: null,
      rebuilding: false,
      watch: watch(
        dir.data(root),
        {
          recursive: true,
        },
        async (event, filename) => {
          const fe = code.internal.frontend[id_site];
          const srv = code.internal.server[id_site];
          if (filename?.startsWith("node_modules")) return;
          if (
            filename?.endsWith(".tsx") ||
            filename?.endsWith(".ts") ||
            filename?.endsWith(".css") ||
            filename?.endsWith(".html")
          ) {
            if (typeof fe !== "undefined" && !fe.rebuilding) {
              fe.rebuilding = true;
              try {
                await fe.ctx.rebuild();
              } catch (e) {}
              fe.rebuilding = false;
            }

            if (typeof srv !== "undefined" && !srv.rebuilding && srv.ctx) {
              srv.rebuilding = true;
              try {
                await srv.ctx.rebuild();
                await server.init(id_site);
              } catch (e) {}
              srv.rebuilding = false;
            }
          }
        }
      ),
    };
    const fe = code.internal.frontend[id_site];
    fe.rebuilding = true;
    try {
      await fe.ctx.rebuild();
    } catch (e) {}
    fe.rebuilding = false;
  } catch (e: any) {
    console.error("Error building front end", id_site);
    delete code.internal.frontend[id_site];
  }
};

const codeError = async (id_site: string, error: string, append?: boolean) => {
  const path = code.path(id_site, "site", "src", "index.log");

  if (error) console.log(error);
  if (append) {
    await appendFile(path, error);
    return;
  }
  await Bun.write(path, error);
};

const isInstalling = async (id_site: string) => {
  const path = code.path(id_site, "site", "src", "index.log");
  const file = Bun.file(path);
  try {
    const text = await file.text();
    if (typeof text === "string" && text.startsWith("Installing dependencies"))
      return true;
  } catch (e) {}

  return false;
};

// const readPackageJSON = async (id_site: string) => {
//   const file = Bun.file(code.path(id_site, "site", "src", "package.json"));
//   const deps = new Set<string>();

//   if (await file.exists()) {
//     const json = await file.json();

//     if (json.dependencies) {
//       for (const k of Object.keys(json.dependencies)) {
//         deps.add(k);
//       }
//     }

//     if (json.devDependencies) {
//       for (const k of Object.keys(json.devDependencies)) {
//         deps.add(k);
//       }
//     }
//   }
//   return deps;
// };

// const installDeps = async (
//   root: string,
//   res: BuildResult<BuildOptions>,
//   id_site: string
// ) => {
//   const pkgjson = await readPackageJSON(id_site);
//   const imports = new Set<string>();

//   if (res.errors.length > 0) {
//     for (const err of res.errors) {
//       if (err.notes?.[0].text.startsWith("You can mark the path ")) {
//         let im = err.notes?.[0].text.split('"')[1];

//         if (
//           !im.startsWith(".") &&
//           !im.startsWith("@/") &&
//           !im.startsWith("app") &&
//           !im.startsWith("lib") &&
//           !im.startsWith("server")
//         ) {
//           const parts = im.split("/");
//           if (im.startsWith("@")) {
//             im = `${parts[0]}/${parts[1]}`;
//           } else {
//             im = parts[0];
//           }
//           imports.add(im);
//         }
//       }
//     }
//   }

//   if (res.metafile) {
//     for (const [_, file] of Object.entries(res.metafile?.inputs || {})) {
//       for (const im of file.imports) {
//         if (im.kind === "import-statement" && im.external) {
//           if (
//             !im.path.startsWith(".") &&
//             !im.path.startsWith("@/") &&
//             !im.path.startsWith("app") &&
//             !im.path.startsWith("lib") &&
//             !im.path.startsWith("server")
//           ) {
//             const parts = im.path.split("/");
//             let src = im.path;
//             if (src.startsWith("@")) {
//               src = `${parts[0]}/${parts[1]}`;
//             } else {
//               src = parts[0];
//             }

//             imports.add(src);
//           }
//         }
//       }
//     }
//   }

//   if (!isEqual(imports, pkgjson)) {
//     const pkgjson = Bun.file(code.path(id_site, "site", "src", "package.json"));
//     if (!(await pkgjson.exists())) {
//       await Bun.write(
//         pkgjson,
//         JSON.stringify({
//           name: id_site,
//           scripts: {
//             startup:
//               "ulimit -c 0; tailwindcss --watch -i ./app/css/global.css -o ./app/css/build.css --minify",
//           },
//         })
//       );
//     }

//     await codeError(
//       id_site,
//       "Installing dependencies:\n " + [...imports].join("\n ")
//     );
//     let proc = Bun.spawn([`npm`, `install`, ...imports], {
//       stdio: ["inherit", "pipe", "pipe"],
//       cwd: dir.data(root),
//     });

//     async function print(generator: ReadableStream<Uint8Array>, prefix: any) {
//       for await (let value of generator) {
//         const str = decoder.decode(value);
//         await codeError(id_site, `${prefix} ${str}`, true);
//       }
//     }

//     print(proc.stdout, "stdout:");
//     print(proc.stderr, "stderr:");

//     await proc.exited;
//     // await codeError(id_site, "");
//     return true;
//   }
// };
