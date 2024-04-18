import hash_sum from "hash-sum";
import { fetchViaProxy } from "../proxy";
import pako from "pako";

export const dbClient = (name: string, dburl: string) => {
  return new Proxy(
    {},
    {
      get(_, table: string) {
        if (table === "_tables") {
          return () => {
            return fetchSendDb(
              name,
              {
                name,
                action: "definition",
                table: "*",
              },
              dburl
            );
          };
        }

        if (table === "_definition") {
          return (table: string) => {
            return fetchSendDb(
              name,
              {
                name,
                action: "definition",
                table,
              },
              dburl
            );
          };
        }

        if (table.startsWith("$")) {
          return (...params: any[]) => {
            const bytes = pako.gzip(JSON.stringify(params));

            return fetchSendDb(
              name,
              {
                name,
                action: "query",
                table,
                params: btoa(
                  bytes.reduce(
                    (acc, current) => acc + String.fromCharCode(current),
                    ""
                  )
                ),
              },
              dburl
            );
          };
        }

        return new Proxy(
          {},
          {
            get(_, action: string) {
              return (...params: any[]) => {
                if (table === "query") {
                  table = action;
                  action = "query";
                }
                return fetchSendDb(
                  name,
                  {
                    name,
                    action,
                    table,
                    params,
                  },
                  dburl
                );
              };
            },
          }
        );
      },
    }
  );
};

const cachedQueryResult: Record<
  string,
  { timestamp: number; result: any; promise: Promise<any> }
> = {};

export const fetchSendDb = async (name: string, params: any, dburl: string) => {
  const base = new URL(dburl);
  base.pathname = `/_dbs/${name}`;
  if (params.table) {
    base.pathname += `/${params.table}`;
  }
  const url = base.toString();

  const hsum = hash_sum(params);
  const cached = cachedQueryResult[hsum];

  if (!cached || (cached && Date.now() - cached.timestamp > 1000)) {
    cachedQueryResult[hsum] = {
      timestamp: Date.now(),
      promise: fetchViaProxy(url, params, {
        "content-type": "application/json",
      }),
      result: null,
    };

    const result = await cachedQueryResult[hsum].promise;
    cachedQueryResult[hsum].result = result;
    return result;
  }

  return await cached.promise;
};
