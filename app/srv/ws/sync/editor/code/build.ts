import { build, context } from "esbuild";
import { Code } from "./watcher";
import { g } from "utils/global";
import { dir } from "dir";
import globalExternals from "@fal-works/esbuild-plugin-global-externals";
import { style } from "@hyrious/esbuild-plugin-style";
import { sendWS } from "../../sync-handler";
import { SyncType } from "../../type";
import { gzipAsync } from "../../entity/zlib";
import { ServerWebSocket } from "bun";
import { WSData } from "../../../../../../pkgs/core/server/create";
import { user } from "../../entity/user";
import { conns } from "../../entity/conn";

const encoder = new TextEncoder();
export const codeBuild = async (id_site: any, mode: string) => {
  // try {
  //   const id_code = code.id;
  //   const outfile = dir.path(`${g.datadir}/site/build/${id_code}/index.js`);
  //   if (!Code.build.ctx[id_code]) {
  //     Code.build.ctx[id_code] = await context({
  //       absWorkingDir: dir.path(
  //         `${g.datadir}/site/code/${code.id_site}/${id_code}`
  //       ),
  //       entryPoints: ["index.tsx"],
  //       bundle: true,
  //       format: "cjs",
  //       outfile,
  //       minify: true,
  //       treeShaking: true,
  //       sourcemap: true,
  //       plugins: [
  //         style(),
  //         globalExternals({
  //           react: {
  //             varName: "window.React",
  //             type: "cjs",
  //           },
  //           "react-dom": {
  //             varName: "window.ReactDOM",
  //             type: "cjs",
  //           },
  //         }),
  //       ],
  //     });
  //   }
  //   activity.site
  //     .room(code.id_site)
  //     .findAll({ site_js: code.name })
  //     .forEach((item, ws) => {
  //       sendWS(ws, {
  //         type: SyncType.Event,
  //         event: "code",
  //         data: {
  //           name: code.name,
  //           id: code.id,
  //           event: "code-loading",
  //         },
  //       });
  //     });
  //   const out = Bun.file(outfile);
  //   const src = (await out.text()).replace(
  //     "//# sourceMappingURL=index.js.map",
  //     `//# sourceMappingURL=/nova-load/code/${id_code}/index.js.map`
  //   );
  //   Bun.write(out, src);
  //   const srcgz = await gzipAsync(encoder.encode(src));
  //   user.active.findAll({ site_id: code.id_site }).map((e) => {
  //     const ws = conns.get(e.client_id)?.ws;
  //     if (ws) {
  //       sendWS(ws, {
  //         type: SyncType.Event,
  //         event: "code",
  //         data: {
  //           name: "site",
  //           id: id_code,
  //           event: "code-done",
  //           src: srcgz,
  //           content: "OK",
  //         },
  //       });
  //     }
  //   });
  // } catch (e: any) {
  //   console.error(e);
  //   activity.site
  //     .room(code.id_site)
  //     .findAll({ site_js: code.name })
  //     .forEach((item, ws) => {
  //       sendWS(ws, {
  //         type: SyncType.Event,
  //         event: "code",
  //         data: {
  //           name: code.name,
  //           id: code.id,
  //           event: "code-done",
  //           content: `ERROR: ${e.message}`,
  //         },
  //       });
  //     });
  // }
};

// export const broadcastCode = async (
//   id_site: string,
//   mode: string,
//   ws?: ServerWebSocket<WSData>
// ) => {
//   const outfile = dir.path(
//     `${g.datadir}/site/build/${id_site}-${mode}/index.js`
//   );
//   const out = Bun.file(outfile);
//   if (out) {
//     const src = await out.text();
//     const srcgz = await gzipAsync(encoder.encode(src));

//     if (ws) {
//       sendWS(ws, {
//         type: SyncType.Event,
//         event: "code",
//         data: {
//           name: "site",
//           event: "code-done",
//           src: srcgz,
//           content: "OK",
//         },
//       });
//     } else {
//       user.active.findAll({ site_id: id_site }).map((e) => {
//         const ws = conns.get(e.client_id)?.ws;

//         if (ws) {
//           sendWS(ws, {
//             type: SyncType.Event,
//             event: "code",
//             data: {
//               name: "site",
//               event: "code-done",
//               src: srcgz,
//               content: "OK",
//             },
//           });
//         }
//       });
//     }
//   }
// };
