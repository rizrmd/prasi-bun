import hash_sum from "hash-sum";
import pako from "pako";
import { fetchViaProxy } from "../proxy";

const schema_promise = {
  tables: {} as Record<string, any>,
  columns: {} as Record<string, any>,
  rels: {} as Record<string, any>,
};

export const dbProxy = (dburl: string) => {
  const name = "";
  return new Proxy(
    {},
    {
      get(_, table: string) {
        if (table === "_batch") {
          return {
            update: async (batch: any) => {
              return fetchSendDb(
                {
                  name,
                  action: "batch_update",
                  table: "",
                  params: { batch },
                },
                dburl
              );
            },
            upsert: async (arg: any) => {
              return fetchSendDb(
                {
                  name,
                  action: "batch_upsert",
                  table: "",
                  params: { arg },
                },
                dburl
              );
            },
          };
        }
        if (table === "_schema") {
          return {
            tables: async () => {
              if (!schema_promise.tables[dburl]) {
                schema_promise.tables[dburl] = fetchSendDb(
                  {
                    name,
                    action: "schema_tables",
                    table: "",
                    params: [],
                  },
                  dburl
                );
              }

              return await schema_promise.tables[dburl];
            },
            columns: async (table: string) => {
              if (!schema_promise.columns[dburl + "_" + table]) {
                schema_promise.columns[dburl + "_" + table] = fetchSendDb(
                  {
                    name,
                    action: "schema_columns",
                    table,
                    params: [],
                  },
                  dburl
                );
              }

              return await schema_promise.columns[dburl + "_" + table];
            },
            rels: async (table: string) => {
              if (!schema_promise.rels[dburl + "_" + table]) {
                schema_promise.rels[dburl + "_" + table] = fetchSendDb(
                  {
                    name,
                    action: "schema_rels",
                    table,
                    params: [],
                  },
                  dburl
                );
              }

              return await schema_promise.rels[dburl + "_" + table];
            },
          };
        }

        if (table.startsWith("$")) {
          return (...params: any[]) => {
            const bytes = pako.gzip(JSON.stringify(params));

            return fetchSendDb(
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
              return async (...params: any[]) => {
                if (table === "query") {
                  table = action;
                  action = "query";
                }
                return await fetchSendDb(
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

export const fetchSendDb = async (params: any, dburl: string) => {
  const base = new URL(dburl);
  base.pathname = `/_dbs`;
  if (params.table) {
    base.pathname += `/${params.table}`;
  }
  const url = base.toString();

  if (typeof localStorage !== "undefined" && localStorage.mlsid) {
    params.mlsid = localStorage.mlsid;
  }

  const hsum = hash_sum(params);
  let cached = cachedQueryResult[hsum];

  if (!cached || (cached && Date.now() - cached.timestamp > 1000)) {
    cachedQueryResult[hsum] = {
      timestamp: Date.now(),
      promise: fetchViaProxy(
        url,
        params,
        {
          "content-type": "application/json",
        },
        false
      ),
      result: null,
    };

    let result = await cachedQueryResult[hsum].promise;
    cached = cachedQueryResult[hsum];
    try {
      result = JSON.parse(result);
      cachedQueryResult[hsum].result = result;
      return result;
    } catch (e) {
      console.error("DBQuery failed:", result);
    }
  }

  if (cached.result) return cached.result;

  let result = await cached.promise;
  if (result) {
    try {
      return JSON.parse(result);
    } catch (e) {
      console.error("DBQuery failed:", result);
    }
  }
  return null;
};
