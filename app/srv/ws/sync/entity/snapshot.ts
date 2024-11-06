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

export const snapshot = {
  _db: {} as any,
  init() {
    return this._db;
  },
  async getOrCreate(data: DocSnapshot) {
    const id = `${data.type}-${data.id}`;

    let res = this._db[id];

    if (!res || !res.id) {
      this._db[id] = structuredClone(data);
      res = this._db[id];
    }
    return res as DocSnapshot;
  },

  async del<K extends DocSnapshot["type"]>(type: K, id: string) {
    delete this._db[`${type}-${id}`];
  },

  get<K extends DocSnapshot["type"]>(type: K, id: string) {
    return this._db[`${type}-${id}`] as DocSnapshotMap[K] | null;
  },

  async update(data: DocSnapshot) {
    const id = `${data.type}-${data.id}`;
    this._db[id] = data;
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
