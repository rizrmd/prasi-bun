import { Doc } from "yjs";
import { DCode } from "../../../../../web/src/utils/types/root";
import { readDirectoryRecursively } from "../../../../api/site-export";
import { docs } from "../../entity/docs";
import { snapshot } from "../../entity/snapshot";
import { gzipAsync } from "../../entity/zlib";
import { codeBuild } from "./build-code";
import { CodeMode, code } from "./util-code";
import { user } from "../../entity/user";
import { SyncType } from "../../type";
import { sendWS } from "../../sync-handler";
import { conns } from "../../entity/conn";

export const prepCodeSnapshot = async (id_site: string, mode: CodeMode) => {
  await code
    .prep(id_site, mode)
    .new_file("index.tsx", "export const sample = 'hello_world'")
    .new_file(
      "package.json",
      JSON.stringify({ name: `${mode}-${id_site}`, dependencies: {} }, null, 2)
    )
    .await();

  let dcode = docs.code[id_site];
  if (!docs.code[id_site]) {
    docs.code[id_site] = {
      id: id_site,
      build: {},
    };
    dcode = docs.code[id_site];
  }

  if (dcode) {
    if (!dcode.build[mode]) {
      const build_dir = code.path(id_site, mode, "build");
      await codeBuild(id_site, mode);
      dcode.build[mode] = codeLoad(id_site, build_dir);
      const doc = dcode.build[mode] as Doc;
      if (doc) {
        doc.on("update", async (e, origin) => {
          const bin = Y.encodeStateAsUpdate(doc);

          if (typeof snap !== "undefined" && snap.type === "code") {
            snap.build[mode].bin = bin;
            snapshot.update({
              id: id_site,
              type: "code",
              build: snap.build,
            });
          }
          const build_dir = code.path(id_site, mode, "build");

          const sv_local = await gzipAsync(bin);
          user.active.findAll({ site_id: id_site }).map((e) => {
            const ws = conns.get(e.client_id)?.ws;
            if (ws) {
              sendWS(ws, {
                type: SyncType.Event,
                event: "remote_svlocal",
                data: { type: "code", sv_local, id: id_site },
              });
            }
          });
        });
      }
    }

    const build: Record<
      string,
      {
        id_doc: number;
        bin: Uint8Array;
      }
    > = {};

    for (const [k, v] of Object.entries(dcode.build)) {
      const bin = Y.encodeStateAsUpdate(v as Doc);
      build[k] = { bin: bin, id_doc: v.clientID };
    }

    let snap = await snapshot.getOrCreate({
      type: "code",
      id: id_site,
      build,
    });

    if (snap.type === "code") {
      snapshot.update({
        id: id_site,
        type: "code",
        build,
      });
      return snap;
    }
  }
};

const codeLoad = (id: string, path: string) => {
  const doc = new Y.Doc() as DCode;
  const map = doc.getMap("map");

  const files = new Y.Map();

  const dirs = readDirectoryRecursively(path);
  for (const [k, v] of Object.entries(dirs)) {
    files.set(k, v);
  }

  doc.transact(() => {
    map.set("files", files as any);
    map.set("id", id);
  });

  return doc;
};
