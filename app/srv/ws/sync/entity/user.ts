import { dir } from "dir";
import { IndexedMap } from "../../../../web/src/utils/sync/idx-map";

const defaultConf = {
  site_id: "",
  page_id: "",
};
export type UserConf = typeof defaultConf;

export const user = {
  active: IndexedMap.create<
    {
      user_id: string;
      site_id: string;
      page_id: string;
      comp_id?: string;
      client_id: string;
    },
    "client_id"
  >("client_id"),
  conf: {
    _db: {} as any,
    init() {
      return this._db;
    },
    async getOrCreate(id: string) {
      let res = this._db[id];

      if (!res || !res.id) {
        this._db[id] = structuredClone(defaultConf);
        res = this._db[id];
      }
      return res as UserConf;
    },
    get(user_id: string) {
      return this._db[user_id];
    },
    async set<T extends keyof UserConf>(
      user_id: string,
      key: T,
      value: UserConf[T]
    ) {
      let current = this.get(user_id);
      if (!current) {
        this._db[user_id] = structuredClone(defaultConf)
        current = this.get(user_id);
      }

      if (current) {
        this._db[user_id] = { ...current, [key]: value }
      }
    },
  },
};
