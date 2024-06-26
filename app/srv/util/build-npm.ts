import globalExternals from "@fal-works/esbuild-plugin-global-externals";
import { style } from "@hyrious/esbuild-plugin-style";
import { npm_page, npm_site } from "dbgen";
import { dir } from "dir";
import { build } from "esbuild";
import { $ } from "execa";
import { dirAsync, writeAsync } from "fs-jetpack";
import { stat } from "fs/promises";
import { g } from "utils/global";
import { validate } from "uuid";
import { glb } from "../global";
import { eg } from "../ws/sync/editor/edit-global";

export type NPMImportAs = {
  main: { mode: "default" | "*"; name: string };
  names: string[];
  custom?: string;
};

export const buildNpm = async ({
  id,
  mode,
  _items,
}: {
  id: string;
  mode: "site" | "page";
  _items?: npm_page[] | npm_site[];
}) => {
  if (!validate(id)) return "-";

  let items = _items;
  if (!items) {
    if (mode === "site") {
      items = await _db.npm_site.findMany({ where: { id_site: id } });
    } else {
      items = await _db.npm_page.findMany({ where: { id_page: id } });
    }
  }
  const packages: Record<string, string> = {};

  const imports = items
    .map((e) => {
      const import_as = e.import_as as NPMImportAs;

      packages[e.module] = e.version;
      if (import_as.main.name || import_as.names.length > 0) {
        let main = "";
        let names = import_as.names.map((e) => `${e} as __${e}`);

        if (import_as.main.name) {
          main =
            import_as.main.mode === "default"
              ? `__${import_as.main.name}`
              : `* as __${import_as.main.name}`;
        }

        const imports = [
          main.trim(),
          (names.length > 0 ? `{ ${names.join(",")} }` : "").trim(),
        ].filter((e) => e);

        let final = "";
        if (imports.length > 0) {
          final = `import ${imports.join(",")} from "${e.module}";`;
        }

        if (import_as.custom) {
          final = final + "\n" + import_as.custom;
        }
        return final;
      }
      return "";
    })
    .filter((e) => !!e)
    .join("\n");

  const exports = items
    .map((e) => {
      const import_as = e.import_as as NPMImportAs;
      const res: string[] = [];

      if (import_as.main.name || import_as.names.length > 0) {
        let main = "";
        let names = import_as.names;

        if (import_as.main.name) {
          main = import_as.main.name;
        }

        if (main) {
          res.push(`window.exports.${main} = __${main};`);
        }

        if (names.length > 0) {
          names.forEach((e) => {
            res.push(`window.exports.${e} = __${e};`);
          });
        }
      }

      return res.join("\n").trim();
    })
    .filter((e) => !!e)
    .join("\n");

  const src = `\
${imports}
${exports}
`.trim();
  await dirAsync(dir.data(`/npm/${mode}/${id}`));
  await writeAsync(dir.data(`/npm/${mode}/${id}/input.js`), src);
  packages["react"] = "18.2.0";
  packages["react-dom"] = "18.2.0";
  await writeAsync(dir.data(`/npm/${mode}/${id}/package.json`), {
    dependencies: packages,
  });
  await writeAsync(
    dir.data(`/npm/${mode}/${id}/pnpm-workspace.yaml`),
    `\
packages:
- ./*`
  );
  try {
    await $({
      cwd: dir.data(`/npm/${mode}/${id}`),
    })`pnpm i`;

    await build({
      absWorkingDir: dir.data(`/npm/${mode}/${id}`),
      entryPoints: ["input.js"],
      bundle: true,
      outfile: "index.js",
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
      logLevel: "silent",
    });
  } catch (e) {
    return e;
  }

  try {
    const s = await stat(dir.data(`/npm/${mode}/${id}/index.js`));

    if (mode === "page") {
      delete glb.npm.page[id];
      await _db.npm_page.updateMany({
        where: {
          id_page: id,
        },
        data: { bundled: true },
      });
      const p = eg.edit.page[id];
      if (p) {
        await _db.page.update({
          where: {
            id,
          },
          data: {
            updated_at: new Date(),
          },
        });
        p.doc.getMap("map").set("updated_at", new Date().toISOString());
      }
    } else if (mode === "site") {
      delete glb.npm.site[id];

      await _db.npm_site.updateMany({
        where: {
          id_site: id,
        },
        data: { bundled: true },
      });
    }

    return s.size.toString();
  } catch (e) {
    console.error(e);
    return "-";
  }
};
