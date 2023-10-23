export const IndexedMap = {
  create: <OBJ extends Record<string, any>, KEY extends string>(id: KEY) => {
    const all = {} as Record<string, OBJ & Record<KEY, string>>;

    return {
      add(item: OBJ & Record<KEY, string>) {
        const _id = item[id];
        all[_id] = item as any;
        return _id;
      },
      find(id: KEY) {
        return all[id];
      },
      del(id: KEY) {
        delete all[id];
      },
      findAll(where: Partial<OBJ>) {
        return Object.values(all).filter((item) => {
          for (const key in where) {
            if (item[key] !== where[key]) {
              return false;
            }
          }
          return true;
        });
      },
      delAll(where: Partial<OBJ>) {
        for (const item of this.findAll(where)) {
          delete all[item[id]];
        }
      },
    };
  },
};
