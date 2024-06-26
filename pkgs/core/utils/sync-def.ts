import { dir } from "dir";
import { readAsync, writeAsync } from "fs-jetpack";
import { SyncActions } from "../../../app/srv/ws/sync/actions";

export const syncActionDefinition = async () => {
  const def: any = {};
  let idx = 0;

  const paths = {} as Record<string, string>;
  const walk = (act: any, d: any, parentPaths: string[]) => {
    for (const [k, v] of Object.entries(act)) {
      d[k] = typeof v === "function" ? idx++ + "" : {};

      if (typeof d[k] === "string") {
        paths[d[k]] = [...parentPaths, k].join(".");
      }

      if (typeof d[k] === "object") {
        walk(v, d[k], [...parentPaths, k]);
      }
    }
  };
  walk(SyncActions, def, []);

  const index_js = [];
  for (const [k, v] of Object.entries(paths)) {
    const arr = v.split(".");
    const name = arr.join("_");
    const path = dir.path(`app/srv/ws/sync/actions/${name}.ts`);
    const saction = arr.map((e) => `["${e}"]`).join("");

    const file = Bun.file(path);
    if (!(await file.exists())) {
      const code = `
import { SAction } from "../actions"; 
import { SyncConnection } from "../type";
export const ${name}: SAction${saction} = async function (
  this: SyncConnection,
) {
  let result = null as unknown as Awaited<
    ReturnType<SAction${saction}>
  >;
  return result;
}`;
      await writeAsync(path, code);
    }
    index_js.push(`export * from "./${name}";`);
  }

  const existing = await Bun.file(
    dir.path(`app/srv/ws/sync/actions/index.ts`)
  ).text();

  if (existing !== index_js.join("\n")) {
    await writeAsync(
      dir.path(`app/srv/ws/sync/actions/index.ts`),
      index_js.join("\n")
    );

    const content = `\
export const SyncActionDefinition = ${JSON.stringify(def, null, 2)};
export const SyncActionPaths = ${JSON.stringify(paths, null, 2)};
`;

    const path = dir.path("app/srv/ws/sync/actions-def.ts");
    if ((await readAsync(path)) !== content) {
      await writeAsync(path, content);
    }
  }
};
