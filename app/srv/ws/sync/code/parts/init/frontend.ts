import globalExternals from "@fal-works/esbuild-plugin-global-externals";
import style from "@hyrious/esbuild-plugin-style";
import { dir } from "dir";
import { context } from "esbuild";
import { removeAsync } from "fs-jetpack";
import { code } from "../../code";

export const initFrontEnd = async (root: string, id_site: string) => {
  let existing = code.internal.frontend[id_site];

  if (!existing) {
    const build_path = dir.data(`code/${id_site}/site/build`);
    await removeAsync(build_path);
    existing = await context({
      absWorkingDir: root,
      entryPoints: ["index.tsx"],
      outdir: build_path,
      format: "esm",
      bundle: true,
      minify: true,
      treeShaking: true,
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
              }
            });
          },
        },
      ],
    });
    code.internal.frontend[id_site] = existing;
    existing.watch()
  }
  await code.internal.frontend[id_site].rebuild()
};

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
