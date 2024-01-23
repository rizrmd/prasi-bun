import { dir } from "dir";
import { RootDatabase, open } from "lmdb";
import { g } from "utils/global";

type EmptySnapshot = {
  type: "";
  id: string;
  bin: Uint8Array;
  id_doc: number;
  name: string;
  ts: number;
};
export type CompSnapshot = {
  type: "comp";
  id: string;
  bin: Uint8Array;
  id_doc: number;
  name: string;
  ts: number;
};
type PageSnapshot = {
  type: "page";
  id: string;
  bin: Uint8Array;
  id_doc: number;
  name: string;
  ts: number;
  url: string;
  id_site: string;
};

type SiteSnapshot = {
  type: "site";
  id: string;
  name: string;
};

type CodeSnapshot = {
  type: "code";
  id: string;
  build: Record<string, { id_doc: number; bin: Uint8Array }>;
};

type DocSnapshotMap = {
  page: PageSnapshot;
  comp: CompSnapshot;
  site: SiteSnapshot;
  code: CodeSnapshot;
  "": EmptySnapshot;
};
export type DocSnapshot =
  | PageSnapshot
  | SiteSnapshot
  | CompSnapshot
  | CodeSnapshot
  | EmptySnapshot;

const emptySnapshot: DocSnapshot = {
  type: "",
  id: "",
  bin: new Uint8Array(),
  id_doc: 0,
  name: "",
  ts: Date.now(),
};

export const snapshot = {
  _db: null as null | RootDatabase<DocSnapshot>,
  init() {
    this._db = open<DocSnapshot, string>({
      name: "doc-snapshot",
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

    if (!res || !res.id) {
      await this.db.put(id, structuredClone(data as DocSnapshot));
      res = this.db.get(id);
    }
    return res as DocSnapshot;
  },

  async del<K extends DocSnapshot["type"]>(type: K, id: string) {
    await this.db.remove(`${type}-${id}`);
  },

  get<K extends DocSnapshot["type"]>(type: K, id: string) {
    return this.db.get(`${type}-${id}`) as DocSnapshotMap[K] | null;
  },

  async update(data: DocSnapshot) {
    const id = `${data.type}-${data.id}`;
    await this.db.put(id, data);
    return true;
  },

  async set<K extends keyof DocSnapshotMap, T extends keyof DocSnapshotMap[K]>(
    type: K,
    id: string,
    key: T,
    value: DocSnapshotMap[K][T]
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
