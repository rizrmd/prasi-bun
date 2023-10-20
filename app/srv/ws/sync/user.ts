import { dir } from "dir";
import { open } from "lmdb";
import { g } from "utils/global";

const defaultConf = {
  site_id: "",
  page_id: "",
};
type UserConf = typeof defaultConf;

const db = open<UserConf, string>({
  name: "user-conf",
  path: dir.path(`${g.datadir}/lmdb/user-conf.lmdb`),
});

export const user = {
  conf: {
    get(user_id: string) {
      return db.get(user_id);
    },
    set<T extends keyof UserConf>(user_id: string, key: T, value: UserConf[T]) {
      let current = this.get(user_id);
      if (!current) {
        db.put(user_id, structuredClone(defaultConf));
        current = this.get(user_id);
      }

      if (current) {
        db.put(user_id, { ...current, [key]: value });
      }
    },
  },
};
