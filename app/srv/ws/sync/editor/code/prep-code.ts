import { dir } from "dir";
import { existsAsync } from "fs-jetpack";
import { g } from "utils/global";
import { Doc } from "yjs";
import { DCode } from "../../../../../web/src/utils/types/root";
import { readDirectoryRecursively } from "../../../../api/site-export";
import { docs } from "../../entity/docs";
import { snapshot } from "../../entity/snapshot";
import { CodeMode, code } from "./util";

export const prepCode = async (id_site: string, mode: CodeMode) => {
  await code
    .prep(id_site, mode)
    .new_file("index.ts", "export const sample = 'hello_world'")
    .new_file(
      "package.json",
      JSON.stringify({ name: `${mode}-${id_site}`, dependencies: {} }, null, 2)
    )
    .await();
};

export const prepDCode = async (id_site: string) => {
  let exists = false;
  if (!docs.code[id_site]) {
    const path = {
      src: dir.path(`${g.datadir}/site/code/${id_site}-site`),
      build: dir.path(`${g.datadir}/site/build/${id_site}-site`),
    };

    if ((await existsAsync(path.src)) && (await existsAsync(path.build))) {
      docs.code[id_site] = {
        id: id_site,
        build: loadFolderAsDCode(id_site, path.build),
      };
      exists = true;
    }
  }

  if (exists) {
    const chmod = Bun.spawn({
      cmd: ["chmod", "-R", "777", "."],
      cwd: dir.path(`${g.datadir}/site`),
    });

    await chmod.exited;

    const build_bin = Y.encodeStateAsUpdate(docs.code[id_site].build as Doc);

    let snap = await snapshot.getOrCreate({
      type: "site",
      id: id_site,
      name: "",
      build: {
        bin: build_bin,
        id_doc: docs.code[id_site].build.clientID,
      },
    });

    if (snap && snap.type === "site") {
      return {
        bin: {
          build: snap.build.bin,
        },
      };
    }
  }
};

const loadFolderAsDCode = (id: string, path: string) => {
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
