const defaultConf = {
  site_id: "",
  page_id: "",
};
export type UserConf = typeof defaultConf;

export type TUser = {
  select?: "" | "comp" | "item" | "section" | "text";
  client_id: string;
  user_id: string;
  site_id: string;
  page_id: string;
  comp_id: string | string[];
};

const g = global as unknown as { _active_user: any; _conf_user: any };

if (!g._conf_user) {
  g._conf_user = {};
}
if (!g._active_user) {
  g._active_user = [];
}

export const user = {
  conf: {
    db: g._conf_user as Record<string, UserConf>,
    init() {},
    async getOrCreate(user_id: string) {
      if (!this.db[user_id]) this.db[user_id] = { ...defaultConf };
      return this.db[user_id];
    },

    async set(user_id: string, key: keyof UserConf, value: any) {
      const conf = await this.getOrCreate(user_id);
      conf[key] = value;
    },
    get(user_id: string) {
      if (!this.db[user_id]) this.db[user_id] = { ...defaultConf };
      return this.db[user_id];
    },
  },
  active: {
    db: g._active_user as TUser[],
    comps: {} as Record<string, Set<string>>,
    findAll(where: Partial<TUser>) {
      return this.db.filter((e: any) => {
        for (const [k, v] of Object.entries(where)) {
          if (k === "comp_id" && where.client_id) {
            if (!this.comps[where.client_id].has(v as any)) return false;
          } else if (e[k] !== v) return false;
        }
        return true;
      });
    },
    delAll(where: Partial<TUser>) {
      const res = this.findAll(where);
      this.db = this.db.filter((e) => !res.includes(e));
    },
    add(user: Partial<TUser>) {
      let found = null;
      if (user.client_id) {
        found = this.db.find((e: any) => {
          return e.client_id === user.client_id;
        });
      }

      if (found) {
        for (const [k, v] of Object.entries(user)) {
          (found as any)[k] = v;
        }
      } else {
        this.db.push(user as any);
        found = user;
      }

      if (typeof found.comp_id === "string") {
        let cid = found.client_id || "";
        if (cid && !this.comps[cid]) {
          this.comps[cid] = new Set();
        }
        this.comps[cid].add(found.comp_id);
      }
    },
  },
};
