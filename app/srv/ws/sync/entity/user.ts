import { dir } from "dir";
import { RootDatabase, open } from "lmdb";
import { g } from "utils/global";
import { KeyMap } from "../../../../web/src/utils/sync/keymap";

const defaultConf = {
  site_id: "",
  page_id: "",
};
export type UserConf = typeof defaultConf;

export const user = {
  active: KeyMap.create<{
    user_id: string;
    site_id: string;
    page_id: string;
  }>("user_id"),
  conf: {
    _db: null as null | RootDatabase<UserConf>,
    init() {
      this._db = open<UserConf, string>({
        name: "user-conf",
        path: dir.path(`${g.datadir}/lmdb/user-conf.lmdb`),
      });
      return this._db;
    },
    get db() {
      if (!this._db) {
        this._db = this.init();
      }
      return this._db;
    },
    async getOrCreate(user_id: string) {
      let res = this.db.get(user_id);
      if (!res) {
        await this.db.put(user_id, structuredClone(defaultConf));
        res = this.db.get(user_id);
      }
      return res as UserConf;
    },
    get(user_id: string) {
      return this.db.get(user_id);
    },
    async set<T extends keyof UserConf>(
      user_id: string,
      key: T,
      value: UserConf[T]
    ) {
      let current = this.get(user_id);
      if (!current) {
        this.db.put(user_id, structuredClone(defaultConf));
        current = this.get(user_id);
      }

      if (current) {
        await this.db.put(user_id, { ...current, [key]: value });
      }
    },
  },
};
