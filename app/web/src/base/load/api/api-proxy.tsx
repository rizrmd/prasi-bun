import { w } from "../../../utils/types/general";
import { fetchViaProxy } from "../proxy";
import { loadApiProxyDef } from "./api-proxy-def";

export type ApiProxy<T extends Record<string, any> = {}> = any;

const apiProxyPending: Record<string, Promise<void>> = {};

export const apiProxy = (api_url: string) => {
  if (!w.prasiApi) {
    w.prasiApi = {};
  }

  const base = new URL(api_url);
  const base_url = `${base.protocol}//${base.host}`;
  if (!w.prasiApi[base_url]) {
    if (!apiProxyPending[base_url]) {
      apiProxyPending[base_url] = loadApiProxyDef(base_url, false);
    }
  }

  return new Proxy(
    {},
    {
      get: (_, actionName: string) => {
        const createFn = (actionName: string) => {
          return function (
            this: { api_url: string } | undefined,
            ...rest: any
          ) {
            return new Promise<any>(async (resolve, reject) => {
              try {
                let api_def = w.prasiApi[base_url];

                if (!api_def) {
                  await apiProxyPending[base_url];
                }

                if (api_def) {
                  if (!api_def.apiEntry) api_def.apiEntry = {};
                  if (api_def.apiEntry && !api_def.apiEntry[actionName]) {
                    reject(
                      `API ${actionName.toString()} not found, existing API: \n   - ${Object.keys(
                        api_def || {}
                      ).join("\n   - ")}`
                    );
                    return;
                  }
                }

                let actionUrl = api_def.apiEntry[actionName].url;
                const actionParams = api_def.apiEntry[actionName].args;
                if (actionUrl && actionParams) {
                  if (rest.length > 0 && actionParams.length > 0) {
                    for (const [idx, p] of Object.entries(rest)) {
                      const paramName = actionParams[parseInt(idx)];
                      if (actionParams && actionParams.includes(paramName)) {
                        if (
                          !!p &&
                          typeof p !== "string" &&
                          typeof p !== "number"
                        ) {
                          continue;
                        }
                      }
                      actionUrl = actionUrl.replace(`:${paramName}?`, p + "");
                      actionUrl = actionUrl.replace(`:${paramName}`, p + "");
                    }
                  }

                  const url = `${base_url}${actionUrl}`;

                  const result = await fetchSendApi(url, rest);
                  resolve(result);
                } else {
                  console.error(`API Not Found: ${actionName.toString()}`);
                }
              } catch (e) {
                reject(e);
              }
            });
          };
        };
        if (actionName === "then") {
          return new Proxy(
            {},
            {
              get: (_, actionName: string) => {
                return createFn(actionName);
              },
            }
          );
        }

        return createFn(actionName);
      },
    }
  );
};

const fetchSendApi = async (url: string, params: any) => {
  return await fetchViaProxy(url, params, {
    "content-type": "application/json",
  });
};
