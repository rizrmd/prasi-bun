import { dir } from "dir";
import { RootDatabase, open } from "lmdb";
import { g } from "utils/global";

const emptySnapshot = {
  type: "" as "" | "comp" | "page",
  id: "",
  bin: new Uint8Array(),
  url: "",
  name: "",
  ts: Date.now()
};
export type DocSnapshot = typeof emptySnapshot;

export const snapshot = {
  _db: null as null | RootDatabase<DocSnapshot>,
  init() {
    this._db = open<DocSnapshot, string>({
      name: "user-conf",
      path: dir.path(`${g.datadir}/lmdb/doc-snapshot.lmdb`),
    });
    return this._db;
  },
  get db() {
    if (!this._db) {
      this._db = this.init();
    }
    return this._db;
  },
  getOrCreate(data: DocSnapshot) {
    const id = `${data.type}-${data.id}`;
    let res = this.db.get(id);
    if (!res) {
      this.db.put(id, structuredClone(emptySnapshot));
      res = this.db.get(id);
    }
    return res as DocSnapshot;
  },
  get(type: string, id: string) {
    return this.db.get(`${type}-${id}`);
  },
  set(data: DocSnapshot) {
    const id = `${data.type}-${data.id}`;
    this.db.put(id, data);
  },
};
