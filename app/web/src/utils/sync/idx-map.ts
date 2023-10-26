export const IndexedMap = {
  create: <OBJ extends Record<string, any>, KEY extends string>(id: KEY) => {
    const all = {} as Record<string, OBJ & Record<KEY, string>>;

    return {
      add(item: OBJ & Record<KEY, string>) {
        const _id = item[id];
        all[_id] = item as any;
        return _id;
      },
      find(id: string) {
        return all[id];
      },
      del(id: string) {
        delete all[id];
      },
      findAll(where: Partial<OBJ & Record<KEY, string>>) {
        return Object.entries(all)
          .filter(([k, item]) => {
            for (const f in where) {
              if (f === id) {
                if (k !== where[f]) {
                  return false;
                }
              } else if (item[f] !== where[f]) {
                return false;
              }
            }
            return true;
          })
          .map(([_, item]) => item);
      },
      delAll(where: Partial<OBJ & Record<KEY, string>>) {
        for (const item of this.findAll(where)) {
          delete all[item[id]];
        }
      },
    };
  },
};
