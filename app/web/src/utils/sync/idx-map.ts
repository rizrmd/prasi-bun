import hash_sum from "hash-sum";

const match = (item: any, where: any) => {
  for (const [k, v] of Object.entries(where)) {
    if (item[k] !== v) return false;
  }

  return true;
};

export const IndexedMap = {
  create: <OBJ extends Record<string, any>, KEY extends string>(id: KEY) => {
    const all = {} as Record<KEY, Record<string, OBJ>>;

    return {
      add(item: OBJ & Record<KEY, any>) {
        const pk = item[id] as KEY;

        if (!all[pk]) {
          all[pk] = {};
        }
        const _id = hash_sum(item) as any;
 
        const items = all[pk] as Record<string, OBJ>;
        items[_id] = item;

        return pk;
      },
      findAll(where: Partial<OBJ & Record<KEY, string>>, withId?: boolean) {
        const founds = [];
        if (where[id]) {
          const _id = where[id] as KEY;

          if (all[_id]) {
            for (const [k, item] of Object.entries(all[_id])) {
              if (match(item, where)) {
                if (withId) {
                  founds.push({ ...item, _id: k });
                } else {
                  founds.push(item);
                }
              }
            }
          }
        } else {
          for (const _items of Object.values(all)) {
            const items = _items as Record<string, OBJ>;

            for (const [k, item] of Object.entries(items)) {
              if (match(item, where)) {
                if (withId) {
                  founds.push({ ...item, _id: k });
                } else {
                  founds.push(item);
                }
              }
            }
          }
        }

        return founds;
      },
      delAll(where: Partial<OBJ & Record<KEY, string>>) {
        for (const item of this.findAll(where, true)) {
          delete all[item[id]][item._id];
        }
      },
    };
  },
};
