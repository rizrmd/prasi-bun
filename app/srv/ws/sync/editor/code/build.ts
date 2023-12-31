import { build, context } from "esbuild";
import { Code } from "./watcher";
import { g } from "utils/global";
import { dir } from "dir";
import globalExternals from "@fal-works/esbuild-plugin-global-externals";
import { style } from "@hyrious/esbuild-plugin-style";
import { DBCode } from "./prep-code";
import { activity } from "../../entity/activity";
import { sendWS } from "../../sync-handler";
import { SyncType } from "../../type";
import { gzipAsync } from "../../entity/zlib";

const encoder = new TextEncoder();
export const codeBuild = async (code: DBCode) => {
  try {
    const id_code = code.id;
    const outfile = dir.path(`${g.datadir}/site/build/${id_code}/index.js`);

    if (!Code.build.ctx[id_code]) {
      Code.build.ctx[id_code] = await context({
        absWorkingDir: dir.path(
          `${g.datadir}/site/code/${code.id_site}/${id_code}`
        ),
        entryPoints: ["index.tsx"],
        bundle: true,
        format: "cjs",
        outfile,
        minify: true,
        treeShaking: true,
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
        ],
      });
    }

    activity.site
      .room(code.id_site)
      .findAll({ site_js: code.name })
      .forEach((item, ws) => {
        sendWS(ws, {
          type: SyncType.Event,
          event: "code",
          data: {
            name: code.name,
            id: code.id,
            event: "code-loading",
          },
        });
      });
    const result = await Code.build.ctx[id_code].rebuild();
    const out = Bun.file(outfile);
    const src = (await out.text()).replace(
      "//# sourceMappingURL=index.js.map",
      `//# sourceMappingURL=/nova-load/code/${id_code}/index.js.map`
    );
    Bun.write(out, src);
    const srcgz = await gzipAsync(encoder.encode(src));

    activity.site
      .room(code.id_site)
      .findAll({ site_js: code.name })
      .forEach((item, ws) => {
        sendWS(ws, {
          type: SyncType.Event,
          event: "code",
          data: {
            name: code.name,
            id: code.id,
            event: "code-done",
            src: srcgz,
            content:
              result.errors.length > 0
                ? `${result.errors.join("\n")}`
                : `${
                    result.warnings.length > 0
                      ? result.warnings.join("\n")
                      : "OK"
                  }`,
          },
        });
      });
  } catch (e: any) {
    console.error(e);
    activity.site
      .room(code.id_site)
      .findAll({ site_js: code.name })
      .forEach((item, ws) => {
        sendWS(ws, {
          type: SyncType.Event,
          event: "code",
          data: {
            name: code.name,
            id: code.id,
            event: "code-done",
            content: `ERROR: ${e.message}`,
          },
        });
      });
  }
};
