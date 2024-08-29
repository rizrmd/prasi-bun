import hash_sum from "hash-sum";
import pako, { gzip } from "pako";
import { fetchViaProxy, getProxyUrl } from "../proxy";
import { del, get, set } from "idb-keyval";
import { pack } from "msgpackr";

const schema_promise = {
  tables: {} as Record<string, any>,
  columns: {} as Record<string, any>,
  rels: {} as Record<string, any>,
};

const db_mode = {} as Record<string, "msgpack" | "json">;

export const dbProxy = (dburl: string) => {
  const name = "";

  if (!db_mode[dburl]) {
    fetchSendDb(
      {
        table: "check",
        action: "check",
      },
      dburl
    ).then((res) => {
      if (res && res.mode === "encrypted") {
        db_mode[dburl] = "msgpack";
      } else {
        db_mode[dburl] = "json";
      }
    });
  }

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

const editorQueryLoaded: Record<string, true> = {};

export const fetchSendDb = async (
  _params: Record<string, any>,
  dburl: string
) => {
  const base = new URL(dburl);
  base.pathname = `/_dbs`;
  const params = _params || {};

  if (params.table) {
    base.pathname += `/${params.table}`;
  }
  const url = base.toString();

  if (typeof localStorage !== "undefined" && localStorage.mlsid) {
    params.mlsid = localStorage.mlsid;
  }

  const hsum = hash_sum({ ...params, dburl });

  let isEditor = false;
  if (
    typeof location !== "undefined" &&
    base.hostname !== location.hostname &&
    (window as any).isEditor &&
    ["prasi.avolut.com", "localhost:4550", "127.0.0.1:4550"].includes(
      location.host
    )
  )
    isEditor = true;

  const load = async () => {
    let body: any = params;
    let result = null;
    if (db_mode[dburl] === "msgpack") {
      body = gzip(pack(params), {});
      const res = await fetch(getProxyUrl(url), { method: "POST", body });
      result = await res.json();
    } else {
      result = await fetchViaProxy(
        url,
        body,
        {
          "content-type": "application/json",
        },
        false
      );
    }

    try {
      if (typeof result === "string") return JSON.parse(result);
    } catch (e) {}
    return result;
  };

  if (isEditor) {
    let result = await get(`editor-db-cache-${hsum}`);
    if (!result) {
      result = await load();
      editorQueryLoaded[hsum] = true;
      set(`editor-db-cache-${hsum}`, result);
    } else {
      if (!editorQueryLoaded[hsum]) {
        load().then((result) => {
          set(`editor-db-cache-${hsum}`, result);
        });
        editorQueryLoaded[hsum] = true;
      }
    }

    return result;
  }

  return await load();
};
