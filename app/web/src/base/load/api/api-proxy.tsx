import { w } from "../../../utils/types/general";
import { fetchViaProxy } from "../proxy";
import { loadApiProxyDef } from "./api-proxy-def";

export type ApiProxy<T extends Record<string, any> = {}> = any;

const apiProxyLoaded: Record<string, Promise<void>> = {};

export const apiProxy = (api_url: string) => {
  if (!w.prasiApi) {
    w.prasiApi = {};
  }

  try {
    const base = new URL(api_url);
    let base_url = `${base.protocol}//${base.host}`;
    if (!w.prasiApi[base_url]) {
      if (!apiProxyLoaded[base_url]) {
        apiProxyLoaded[base_url] = loadApiProxyDef(
          base_url,
          location.hostname.includes("prasi")
        );
      }
    }

    return new Proxy(
      {},
      {
        get: (_, actionName: string) => {
          if (actionName === "_url") {
            return (pathname: string, proxy?: boolean) => {
              const to_url = new URL(base_url);
              to_url.pathname = pathname
                .split("/")
                .filter((e) => e)
                .join("/");

              const cur_url = new URL(location.href);
              let final_url = "";

              if (to_url.host === cur_url.host || proxy === false) {
                final_url = to_url.toString();
              } else {
                final_url = `${cur_url.protocol}//${
                  cur_url.host
                }/_proxy/${encodeURIComponent(to_url.toString())}`;
              }
              return final_url;
            };
          }

          const createFn = (actionName: string) => {
            return function (
              this: { api_url: string } | undefined,
              ...rest: any
            ) {
              return new Promise<any>(async (resolve, reject) => {
                try {
                  let api_ref = w.prasiApi[base_url];

                  if (
                    !api_ref &&
                    apiProxyLoaded &&
                    typeof apiProxyLoaded[base_url] === "object"
                  ) {
                    await apiProxyLoaded[base_url];
                    api_ref = w.prasiApi[base_url];
                  }

                  if (api_ref) {
                    if (actionName === "_raw") {
                      const pathname = rest[0];
                      const url = `${base_url}${pathname}`;

                      const result = await fetchSendApi(url, rest.slice(1));
                      resolve(result);
                      return;
                    }

                    if (!api_ref.apiEntry) api_ref.apiEntry = {};
                    if (api_ref.apiEntry && !api_ref.apiEntry[actionName]) {
                      reject(
                        `API ${actionName.toString()} not found, existing API: \n   - ${Object.keys(
                          api_ref.apiEntry || {}
                        ).join("\n   - ")}`
                      );
                      return;
                    }

                    let actionUrl = api_ref.apiEntry[actionName].url;
                    const actionParams = api_ref.apiEntry[actionName].args;
                    if (actionUrl && actionParams) {
                      if (rest.length > 0 && actionParams.length > 0) {
                        for (const [idx, p] of Object.entries(rest)) {
                          const paramName = actionParams[parseInt(idx)];
                          if (
                            actionParams &&
                            actionParams.includes(paramName)
                          ) {
                            if (
                              !!p &&
                              typeof p !== "string" &&
                              typeof p !== "number"
                            ) {
                              continue;
                            }
                          }
                          actionUrl = actionUrl.replace(
                            `:${paramName}?`,
                            p + ""
                          );
                          actionUrl = actionUrl.replace(
                            `:${paramName}`,
                            p + ""
                          );
                        }
                      }

                      const url = `${base_url}${actionUrl}`;

                      const result = await fetchSendApi(url, rest);
                      resolve(result);
                    } else {
                      console.error(`API Not Found: ${actionName.toString()}`);
                    }
                  } else {

                    reject("Failed to load API [Proxy]: " + base_url);
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
  } catch (e) {
    return null;
  }
};

const fetchSendApi = async (url: string, params: any) => {
  return await fetchViaProxy(url, params, {
    "content-type": "application/json",
  });
};
