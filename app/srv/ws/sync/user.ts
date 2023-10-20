import { dir } from "dir";
import { RootDatabase, open } from "lmdb";
import { g } from "utils/global";

const defaultConf = {
  site_id: "",
  page_id: "",
};
export type UserConf = typeof defaultConf;

export const user = {
  conf: {
    _db: null as null | RootDatabase<UserConf>,
    get db() {
      if (!this._db) {
        this._db = open<UserConf, string>({
          name: "user-conf",
          path: dir.path(`${g.datadir}/lmdb/user-conf.lmdb`),
        });
      }
      return this._db;
    },
    getOrCreate(user_id: string) {
      let res = this.db.get(user_id);
      if (!res) {
        this.db.put(user_id, structuredClone(defaultConf));
        res = this.db.get(user_id);
      }
      return res as UserConf;
    },
    get(user_id: string) {
      return this.db.get(user_id);
    },
    set<T extends keyof UserConf>(user_id: string, key: T, value: UserConf[T]) {
      let current = this.get(user_id);
      if (!current) {
        this.db.put(user_id, structuredClone(defaultConf));
        current = this.get(user_id);
      }

      if (current) {
        this.db.put(user_id, { ...current, [key]: value });
      }
    },
  },
};
