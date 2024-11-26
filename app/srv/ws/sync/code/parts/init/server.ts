import { dir } from "dir";
import { context } from "esbuild";
import { dirAsync, existsAsync, removeAsync, writeAsync } from "fs-jetpack";
import { server } from "../../../editor/code/server-main";
import { code } from "../../code";

export const initServer = async (
  root: string,
  id_site: string,
  force?: boolean
) => {
  const existing = code.internal.server[id_site];
  if (existing) {
    if (force) {
      existing.rebuilding = false;
      await existing.ctx.cancel();
      await existing.ctx.dispose();
    } else {
      return;
    }
  }

  const build_path = code.path(id_site, "server", "build");
  await removeAsync(build_path);
  await dirAsync(build_path);

  const build_file = `${build_path}/index.js`;
  if (!(await existsAsync(build_file))) {
    await writeAsync(build_file, "");
  }

  code.internal.server[id_site] = {
    inputs: new Set(),
    rebuilding: true,
    ts: 0,
    ctx: await context({
      absWorkingDir: dir.data(root),
      entryPoints: ["server.ts"],
      bundle: true,
      outfile: build_file,
      platform: "node",
      metafile: true,
      treeShaking: true,
      format: "cjs",
      logLevel: "silent",
      external: ["bun:sqlite", "bun"],
      plugins: [
        {
          name: "prasi",
          setup(build) {
            build.onEnd((e) => {
              code.internal.server[id_site].rebuilding = false;
              if (e.errors.length === 0) {
                code.internal.server[id_site].inputs = new Set(
                  Object.keys(e.metafile?.inputs || {})
                );
                server.init(id_site);
              }
            });
          },
        },
      ],
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
}
  `,
      },
    }),
  };
  await code.internal.server[id_site].ctx.rebuild();
};
