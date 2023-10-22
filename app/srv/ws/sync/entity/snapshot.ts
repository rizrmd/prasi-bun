import { dir } from "dir";
import { RootDatabase, open } from "lmdb";
import { g } from "utils/global";

const emptySnapshot = {
  type: "" as "" | "comp" | "page",
  id: "",
  bin: new Uint8Array(),
  url: "",
  name: "",
  ts: Date.now(),
};
export type DocSnapshot = typeof emptySnapshot;

export const snapshot = {
  _db: null as null | RootDatabase<DocSnapshot>,
  init() {
    this._db = open<DocSnapshot, string>({
      name: "user-conf",
      path: dir.path(`${g.datadir}/lmdb/doc-snapshot.lmdb`),
      compression: true,
    });
    return this._db;
  },
  get db() {
    if (!this._db) {
      this._db = this.init();
    }
    return this._db;
  },
  async getOrCreate(data: DocSnapshot) {
    const id = `${data.type}-${data.id}`;
    let res = this.db.get(id);
    if (!res) {
      await this.db.put(id, structuredClone(emptySnapshot));
      res = this.db.get(id);
    }
    return res as DocSnapshot;
  },
  get(type: string, id: string) {
    return this.db.get(`${type}-${id}`);
  },
  async update(data: DocSnapshot) {
    const id = `${data.type}-${data.id}`;
    await this.db.put(id, data);
    return true;
  },
  async set<T extends keyof DocSnapshot>(
    type: string,
    id: string,
    key: T,
    value: DocSnapshot[T]
  ) {
    const item = this.get(type, id);
    if (item) {
      item[key] = value;
      await this.update(item);
      return true;
    }
    return false;
  },
};
