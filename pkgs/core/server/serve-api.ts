import { createResponse } from "./api-ctx";
import { g } from "../utils/global";

const replacer = (key: string, value: string) => {
  if (typeof value === "string" && value.startsWith("BigInt::")) {
    return BigInt(value.substring(8));
  }
  return value;
};

export const serveAPI = async (url: URL, req: Request) => {
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
      if (!req.headers.get("content-type")?.startsWith("multipart/form-data")) {
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
        } catch (e) {}
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

    return current.res;
  }
};
