import { createRouter } from "radix3";
import { g } from "utils/global";
import { createResponse } from "./api/api-ctx";

export const serveAPI = {
  init: async () => {
    g.router = createRouter({ strictTrailingSlash: false });
    for (const route of Object.values(g.api)) {
      g.router.insert(route.url.replace(/\*/gi, "**"), route);
    }
  },
  serve: async (url: URL, req: Request) => {
    let found = g.router.lookup(url.pathname);
    if (!found?.url) {
      if (!url.pathname.endsWith("/")) {
        found = g.router.lookup(url.pathname + "/");
      }

      if (!found?.url) {
        found = null;
      }
    }

    if (found) {
      const params = { ...found.params };

      let args = found.args.map((e) => {
        return params[e];
      });

      if (req.method !== "GET") {
        if (
          !req.headers.get("content-type")?.startsWith("multipart/form-data")
        ) {
          try {
            const text = await req.text();
            const json = JSON.parse(text, replacer);

            if (typeof json === "object") {
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
