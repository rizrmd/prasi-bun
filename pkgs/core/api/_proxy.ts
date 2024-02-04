import { gzipAsync } from "../../../app/srv/ws/sync/entity/zlib";
import { CORS_HEADERS } from "../server/serve-api";
import brotliPromise from "brotli-wasm";

const brotli = await brotliPromise;

export const _ = {
  url: "/_proxy/*",
  async api(arg: {
    url: string;
    method: "POST" | "GET";
    headers: any;
    body: any;
  }) {
    if (!arg.url) return new Response(null, { status: 403 });

    const res = await fetch(
      arg.url,
      arg.body
        ? {
            method: arg.method || "POST",
            headers: arg.headers,
            body: arg.body,
          }
        : {
            headers: arg.headers,
          }
    );

    let body: any = null;
    const headers: any = {};
    res.headers.forEach((v, k) => {
      headers[k] = v;
    });

    body = await res.arrayBuffer();

    if (headers["content-encoding"] === "gzip") {
      body = await gzipAsync(new Uint8Array(body));
    } else if (headers["content-encoding"] === "br") {
      body = brotli.decompress(new Uint8Array(body));
      delete headers["content-encoding"];
    } else {
      delete headers["content-encoding"];
    }

    return new Response(body, { headers: { ...headers, ...CORS_HEADERS } });
  },
};
