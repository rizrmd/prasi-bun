import { createRouter } from "radix3";
import { g } from "utils/global";
import { createResponse } from "./api/api-ctx";

export const CORS_HEADERS = {
  "access-control-allow-origin": "*",
  "access-control-allow-headers": "content-type",
};

export const serveAPI = {
  init: async () => {
    g.router = createRouter({ strictTrailingSlash: false });
    for (const route of Object.values(g._api)) {
      g.router.insert(route.url.replace(/\*/gi, "**"), route);
    }
  },
  serve: async (url: URL, req: Request) => {
    let found = g.router.lookup(url.pathname);
    let found_not_match = false;
    if (!found?.url) {
      let pathname = url.pathname;
      if (!pathname.endsWith("/")) {
        pathname = pathname + "/";
        found = g.router.lookup(pathname);
        found_not_match = true;
      }
      if (!pathname.endsWith("_")) {
        found = g.router.lookup(pathname + "_");
        found_not_match = true;
      }

      if (!found?.url) {
        found = null;
      }
    }

    if (found) {
      const params = { ...found.params };

      let args = found_not_match
        ? []
        : found.args.map((e) => {
            return params[e];
          });

      if (req.method !== "GET" && !found.raw) {
        if (req.method === "OPTIONS") {
          return new Response("OK", {
            headers: CORS_HEADERS,
          });
        }

        if (
          !req.headers.get("content-type")?.startsWith("multipart/form-data")
        ) {
          try {
            const text = await req.text();
            const json = JSON.parse(text, replacer);

            if (typeof json === "object" && !!json) {
              if (Array.isArray(json)) {
                args = json;
                for (let i = 0; i < json.length; i++) {
                  const val = json[i];
                  if (found.args[i]) {
                    params[found.args[i]] = val;
                  }
                }
              } else {
                for (const [k, v] of Object.entries(json)) {
                  params[k] = v;
                }
                for (const [k, v] of Object.entries(params)) {
                  const idx = found.args.findIndex((arg) => arg === k);
                  if (idx >= 0) {
                    args[idx] = v;
                  }
                }
              }
            }
          } catch (e) {
            throw e;
          }
        }
      }

      const current = {
        req,
        res: new Response(),
        ...found,
        params,
      };

      const finalResponse = await current.fn(...args);

      if (finalResponse instanceof Response) {
        for (const [k, v] of Object.entries(CORS_HEADERS)) {
          finalResponse.headers.set(k, v);
        }

        return finalResponse;
      }

      if (finalResponse) {
        return createResponse(current.res, finalResponse);
      }

      if (
        (current.res as any)._status &&
        (current.res as any)._status !== current.res.status
      ) {
        const res = new Response(current.res.body, {
          status: (current.res as any)._status,
        });

        current.res.headers.forEach((v, k) => {
          res.headers.set(k, v);
        });

        for (const [k, v] of Object.entries(CORS_HEADERS)) {
          res.headers.set(k, v);
        }

        return res;
      }

      return current.res;
    }
  },
};

const replacer = (key: string, value: string) => {
  if (typeof value === "string" && value.startsWith("BigInt::")) {
    return BigInt(value.substring(8));
  }
  return value;
};
