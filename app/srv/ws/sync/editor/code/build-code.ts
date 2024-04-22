import globalExternals from "@fal-works/esbuild-plugin-global-externals";
import { style } from "@hyrious/esbuild-plugin-style";
import { context } from "esbuild";
import {
  dirAsync,
  existsAsync,
  removeAsync,
  writeAsync,
  moveAsync,
} from "fs-jetpack";
import { server } from "./server-main";
import { code } from "./util-code";
import { user } from "../../entity/user";
import { conns } from "../../entity/conn";
import { SyncType } from "../../type";
import { Packr } from "msgpackr";
import { ServerWebSocket } from "bun";
import { WSData } from "../../../../../../pkgs/core/server/create";
import { g } from "utils/global";

const packr = new Packr({ structuredClone: true });

const sendWS = (ws: ServerWebSocket<WSData>, msg: any) => {
  ws.sendBinary(packr.pack(msg));
};

export const codeBuild = async (id_site: any) => {
  const src_path = code.path(id_site, "site", "src");
  if (!(await existsAsync(src_path))) return;
  if (!code.esbuild[id_site]) {
    code.esbuild[id_site] = { site: null, server: null, site_ts: Date.now() };
  }

  if (!code.esbuild[id_site].server) {
    const server_main = code.path(id_site, "site", "src", "server.ts");
    if (!(await existsAsync(server_main))) {
      await writeAsync(
        server_main,
        `\
import type {} from "./typings/global";

export const server: PrasiServer = {
  async http({ req, handle, mode, url, index, server }) {
    return await handle(req);
  }
};
`
      );
      const bun_types = Bun.spawn({
        cmd: ["npm", "i", "-D", "@types/bun"],
        cwd: code.path(id_site, "site", "src"),
      });
      await bun_types.exited;
    }

    const build_path = code.path(id_site, "server", "build");
    await removeAsync(build_path);
    await dirAsync(build_path);

    const build_file = `${build_path}/index.js`;
    if (!(await existsAsync(build_file))) {
      await writeAsync(build_file, "");
    }

    code.esbuild[id_site].server = await context({
      absWorkingDir: src_path,
      entryPoints: ["server.ts"],
      bundle: true,
      outfile: build_file,
      platform: "node",
      treeShaking: true,
      format: "cjs",
      logLevel: "silent",
      banner: {
        js: `\
const _fs = require('node:fs/promises');
const console =
typeof global.server_hook === "function"
  ? { ...global.console }
  : global.console;

let db = new Proxy({}, {
  get(_, key) {
    const runtime = global.server_runtime["${id_site}"];
    if (runtime && runtime.db) {
      return runtime.db[key];
    }
  }
});
let api = {};
if (typeof global.server_hook === "function") {
  const log = global.console.log;
  console.log = function (...arg) {
    const out = "${code.path(id_site, "site", "src", "server.log")}";
    _fs.appendFile(out, arg.map((e)=>{
      const ancestors = [];
      if (typeof e === 'object') return JSON.stringify(e, function (key, val) {
        if (val) {
          if (typeof val === 'function') {
            return '[function]'; 
          }
          if (typeof val === 'object') {
            while (ancestors.length > 0 && ancestors.at(-1) !== this) {
              ancestors.pop();
            }
            if (ancestors.includes(val)) {
              return "[circular]";
            }
            ancestors.push(val);

            if (val.constructor && 
                !['Object', 'Array'].includes(val.constructor.name)) {
              if (val.constructor.name === 'Error') {
                return '[Error] ' + val.message;
              }
              return '[Class] ' + val.constructor.name;
            }
          }
        }
        return val;
      }, 2);
      return e;
    }).join(" ") + "\\n");
  }.bind(console);
} else {
  db = global.db;
  api = global.api;
}`,
      },
      plugins: [
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
          setup(setup) {
            const reinit = () => {
              setup.onEnd((res) => {
                if (res.errors.length > 0) {
                  Bun.write(
                    Bun.file(code.path(id_site, "site", "src", "server.log")),
                    JSON.stringify(res.errors, null, 2)
                  );
                }
                server.init(id_site);
              });
            };
            reinit();
          },
        },
      ],
    });

    const esbuild = code.esbuild[id_site].server;
    esbuild?.watch();
  }

  if (!code.esbuild[id_site].site) {
    const build_path = code.path(id_site, "site", "build_cache");
    await removeAsync(build_path);
    await dirAsync(build_path);
    const build_file = `${build_path}/index.js`;
    await writeAsync(build_file, "");

    const index_path = code.path(id_site, "site", "src", "index.tsx");
    if (!(await existsAsync(index_path))) {
      await writeAsync(index_path, 'export const hello = "world"');
    }

    code.esbuild[id_site].site = await context({
      absWorkingDir: src_path,
      entryPoints: ["index.tsx"],
      bundle: true,
      outdir: build_path,
      minify: true,
      treeShaking: true,
      format: "esm",
      splitting: true,
      logLevel: "silent",
      sourcemap: true,
      plugins: [
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
          setup(setup) {
            setup.onEnd(async (res) => {
              if (res.errors.length > 0) {
                await codeError(
                  id_site,
                  res.errors.map((e) => e.text).join("\n\n"),
                  "site"
                );
              } else {
                await removeAsync(code.path(id_site, "site", "build"));
                await moveAsync(
                  code.path(id_site, "site", "build_cache"),
                  code.path(id_site, "site", "build")
                );
                await removeAsync(
                  code.path(id_site, "site", "src", "index.log")
                );

                code.esbuild[id_site].site_ts = Date.now();
                const client_ids = new Set<string>();
                user.active.findAll({ site_id: id_site }).forEach((e) => {
                  client_ids.add(e.client_id);
                });

                client_ids.forEach((client_id) => {
                  const ws = conns.get(client_id)?.ws;
                  if (ws) {
                    sendWS(ws, {
                      type: SyncType.Event,
                      event: "code_changes",
                      data: { ts: code.esbuild[id_site].site_ts },
                    });
                  }
                });
              }
            });
          },
        },
      ],
    });
    const esbuild = code.esbuild[id_site].site;
    esbuild?.watch();
  }
  for (const _mode of ["site", "server"]) {
    const mode = _mode as "site" | "server";

    const esbuild = code.esbuild[id_site][mode];
    if (esbuild) {
      try {
        await esbuild.rebuild();
      } catch (e: any) {
        await codeError(id_site, e.message, mode);
      }
    }

    // const build_file = code.path(id_site, mode, "build", "index.js");
    // const out = Bun.file(build_file);
    // const src = (await out.text()).replace(
    //   "//# sourceMappingURL=index.js.map",
    //   `//# sourceMappingURL=/nova-load/code/${id_site}/${mode}/index.js.map`
    // );
    // // await Bun.write(out, src);
  }
};

// const codeApplyChanges = (path: string, doc: DCode) => {
//   const map = doc.getMap("map");

//   const files = map.get("files");

//   const dirs = readDirectoryRecursively(path);
//   doc.transact(() => {
//     files?.forEach((v, k) => {
//       if (!dirs[k]) {
//         files?.delete(k);
//       }
//     });
//     for (const [k, v] of Object.entries(dirs)) {
//       if (files) {
//         files.set(k, v);
//       }
//     }
//   });

//   return doc;
// };

const codeError = async (
  id_site: string,
  error: string,
  mode: "server" | "site"
) => {
  const path = code.path(
    id_site,
    "site",
    "src",
    mode === "server" ? "server.log" : "index.log"
  );

  await Bun.write(path, error);
};
