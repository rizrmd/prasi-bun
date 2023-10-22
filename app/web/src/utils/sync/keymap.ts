export const KeyMap = {
  create: <K extends Record<string, string>>(main: keyof K) => {
    const childs = {} as Record<string, ReturnType<typeof createChild>>;

    const all = {} as Record<string, Record<string, string>>;

    const createChild = (key: string) => {
      return {
        remove(id: string) {
          if (all[id]) {
            map.delete(all[key][id]);
          }
        },
      };
    };

    const map = new EventedMap({
      onSet({ key, value }) {
        for (const [k, v] of Object.entries(value)) {
          if (!childs[k]) {
            childs[k] = createChild(k);
            all[k] = {};
          }
          all[k][v] = key;
        }
      },
      onDelete(key) {
        const val = map.get(key);
        for (const [k, v] of Object.entries(val)) {
          delete all[k][v as string];
        }
        return true;
      },
    });
    return new Proxy(
      {},
      {
        get(_, key: string, receiver) {
          if (key === "get") {
            return map.get;
          }
          if (key === "set") {
            return (val: K) => {
              const key = val[main];
              map.set(key, val);
            };
          }

          if (!childs[key]) {
            childs[key] = createChild(key);
          }
          return childs[key];
        },
      }
    ) as { get: (key: typeof main) => K; set: (val: K) => void } & Record<
      keyof K,
      EventedMap
    >;
  },
};

type MapEvents = Partial<{
  onSet: (arg: { key: string; value: Record<string, string> }) => void;
  onDelete: (key: string) => boolean;
}>;

class EventedMap extends Map {
  _events: MapEvents;

  constructor(events: MapEvents) {
    super();
    this._events = events;
  }
  set(key: string, value: Record<string, any>): this {
    super.set(key, value);
    this._events.onSet?.({ key, value });
    return this;
  }
  delete(key: string): boolean {
    const value = this.get(key);
    if (value) {
      this._events.onDelete?.(key);
    }
    return super.delete(key);
  }
}
