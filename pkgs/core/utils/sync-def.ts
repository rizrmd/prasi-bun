import { dir } from "dir";
import { SyncActions } from "../../../app/srv/ws/sync/actions";
import { writeAsync } from "fs-jetpack";

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

  await writeAsync(
    dir.path("app/srv/ws/sync/actions-def.ts"),
    `\
export const SyncActionDefinition = ${JSON.stringify(def, null, 2)};
export const SyncActionPaths = ${JSON.stringify(paths, null, 2)};    `
  );
};
