import globalExternals from "@fal-works/esbuild-plugin-global-externals";
import style from "@hyrious/esbuild-plugin-style";
import { dir } from "dir";
import { context } from "esbuild";
import { removeAsync } from "fs-jetpack";
import isEqual from "lodash.isequal";
import { code } from "../../code";
import { buildTypes } from "./typings";

const npm_list = {} as Record<string, Set<string>>;

export const initFrontEnd = async (root: string, id_site: string) => {
  let existing = code.internal.frontend[id_site];

  if (existing) {
    try {
      await existing.dispose();
      delete code.internal.frontend[id_site];
    } catch (e) {}
  }

  try {
    await isInstalling(id_site);

    const build_path = dir.data(`code/${id_site}/site/build`);
    await removeAsync(build_path);
    const existing = await context({
      absWorkingDir: dir.data(root),
      entryPoints: ["index.tsx"],
      outdir: build_path,
      format: "esm",
      bundle: true,
      minify: true,
      treeShaking: true,
      splitting: true,
      logLevel: "silent",
      sourcemap: true,
      metafile: true,
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
            try {
              setup.onEnd(async (res) => {
                if (!npm_list[id_site]) npm_list[id_site] = new Set<string>();
                const imports = new Set<string>();
                if (!(await isInstalling(id_site)))
                  await codeError(id_site, "");

                if (res.errors.length > 0) {
                  for (const err of res.errors) {
                    if (
                      err.notes?.[0].text.startsWith("You can mark the path ")
                    ) {
                      let im = err.notes?.[0].text.split('"')[1];

                      if (!im.startsWith("@")) {
                        im = im.split("/").shift() || "";
                      }

                      imports.add(im);
                    }
                  }
                }

                if (res.metafile) {
                  for (const [_, file] of Object.entries(
                    res.metafile?.inputs || {}
                  )) {
                    for (const im of file.imports) {
                      if (im.kind === "import-statement" && im.external) {
                        if (
                          !im.path.startsWith(".") &&
                          !im.path.startsWith("@/")
                        )
                          imports.add(im.path);
                      }
                    }
                  }
                }

                if (!isEqual(imports, npm_list[id_site])) {
                  await codeError(
                    id_site,
                    "Installing dependencies:\n " + [...imports].join("\n ")
                  );
                  npm_list[id_site] = imports;
                  let proc = Bun.spawn(
                    [`npm`, `install`, "--silent", ...imports],
                    {
                      stdio: ["inherit", "pipe", "pipe"],
                      cwd: dir.data(root),
                    }
                  );

                  async function print(generator: any, prefix: any) {
                    for await (let value of generator) {
                      console.log(`${prefix} ${value}`);
                      await codeError(id_site, `${prefix} ${value}`);
                    }
                  }

                  print(proc.stdout, "stdout:");
                  print(proc.stderr, "stderr:");

                  await proc.exited;
                  await codeError(id_site, "");
                  try {
                    await code.internal.frontend[id_site].rebuild();
                  } catch (e) {}
                  return;
                }

                if (res.errors.length > 0) {
                  await codeError(
                    id_site,
                    res.errors.map((e) => e.text).join("\n\n")
                  );
                } else {
                  buildTypes(root, id_site);
                }
              });
            } catch (e) {
              console.log("ERROR");
            }
          },
        },
      ],
    });
    code.internal.frontend[id_site] = existing;
    await existing.watch();
  } catch (e) {
    delete code.internal.frontend[id_site];
    console.log("front end error", e);
  }
};

const codeError = async (id_site: string, error: string) => {
  const path = code.path(id_site, "site", "src", "index.log");
  await Bun.write(path, error);
};

const isInstalling = async (id_site: string) => {
  const path = code.path(id_site, "site", "src", "index.log");
  const file = Bun.file(path);
  try {
    const text = await file.text();
    if (text.startsWith("Installing dependencies")) return true;
  } catch (e) {}
  return false;
};
