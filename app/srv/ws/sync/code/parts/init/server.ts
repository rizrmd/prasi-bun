import { dir } from "dir";
import { context } from "esbuild";
import { dirAsync, existsAsync, removeAsync, writeAsync } from "fs-jetpack";
import { code } from "../../code";
import { g } from "utils/global";
import { server } from "../../../editor/code/server-main";

export const initServer = async (
  root: string,
  id_site: string,
  force?: boolean
) => {
  const existing = code.internal.server[id_site];
  if (existing) {
    if (force) {
      await existing.dispose();
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

  code.internal.server[id_site] = await context({
    absWorkingDir: dir.data(root),
    entryPoints: ["server.ts"],
    bundle: true,
    outfile: build_file,
    platform: "node",
    treeShaking: true,
    format: "cjs",
    logLevel: "silent",
    plugins: [
      {
        name: "prasi",
        setup(build) {
          build.onEnd(() => {
            delete server.handler[id_site];
            server.init(id_site);
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
      }`,
    },
  });

  await code.internal.server[id_site].watch();
};
