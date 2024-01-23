import { existsAsync } from "fs-jetpack";
import { Doc } from "yjs";
import { DCode } from "../../../../../web/src/utils/types/root";
import { readDirectoryRecursively } from "../../../../api/site-export";
import { docs } from "../../entity/docs";
import { snapshot } from "../../entity/snapshot";
import { codeBuild } from "./build-code";
import { CodeMode, code } from "./util";

export const prepCodeSnapshot = async (id_site: string, mode: CodeMode) => {
  await code
    .prep(id_site, mode)
    .new_file("index.tsx", "export const sample = 'hello_world'")
    .new_file(
      "package.json",
      JSON.stringify({ name: `${mode}-${id_site}`, dependencies: {} }, null, 2)
    )
    .await();

  let doc = docs.code[id_site];
  if (!docs.code[id_site]) {
    docs.code[id_site] = {
      id: id_site,
      build: {},
    };
    doc = docs.code[id_site];
  }

  if (doc) {
    if (!doc.build[mode]) {
      const build_dir = code.path(id_site, mode, "build");

      if (!(await existsAsync(build_dir))) {
        await codeBuild(id_site, mode);
      }
      doc.build[mode] = codeLoad(id_site, build_dir);
    }

    const build: Record<
      string,
      {
        id_doc: number;
        bin: Uint8Array;
      }
    > = {};
    for (const [k, v] of Object.entries(doc.build)) {
      const bin = Y.encodeStateAsUpdate(v as Doc);
      build[k] = { bin, id_doc: v.clientID };
    }

    let snap = await snapshot.getOrCreate({
      type: "code",
      id: id_site,
      build,
    });

    return snap;
  }
};

const codeLoad = (id: string, path: string) => {
  const doc = new Y.Doc() as DCode;
  const map = doc.getMap("map");

  const files = new Y.Map();

  const dirs = readDirectoryRecursively(path);
  for (const [k, v] of Object.entries(dirs)) {
    files.set(k, new Y.Text(v));
  }

  doc.transact(() => {
    map.set("files", files as any);
    map.set("id", id);
  });

  return doc;
};
