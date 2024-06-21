import brotliPromise from "brotli-wasm";
import { apiContext } from "service-srv";
import { gunzipAsync, gzipAsync } from "utils/diff/diff";
import { decompress } from "@cloudpss/zstd";
const brotli = await brotliPromise;

export const _ = {
  url: "/_proxy/*",
  raw: true,
  async api() {
    const { req } = apiContext(this);

    try {
      const url = new URL(
        decodeURIComponent(decodeURIComponent(req.params["_"]))
      );
      const body = await req.arrayBuffer();
      const headers = {} as Record<string, string>;
      req.headers.forEach((v, k) => {
        if (k.startsWith("sec-")) return;
        if (k.startsWith("connection")) return;
        if (k.startsWith("dnt")) return;
        if (k.startsWith("host")) return;
        headers[k] = v;
      });

      const res = await fetch(url as any, {
        method: req.method || "POST",
        headers,
        body,
      });

      let res_body: any = null;
      const res_headers: any = {};
      res.headers.forEach((v, k) => {
        res_headers[k] = v;
      });
      res_body = await res.arrayBuffer();

      if (res_headers["content-encoding"] === "gzip") {
        delete res_headers["content-encoding"];
      } 
      // else if (res_headers["content-encoding"] === "zstd") {
      //   res_body = await decompress(res_body);
      //   delete res_headers["content-encoding"];
      // } else if (res_headers["content-encoding"] === "br") {
      //   res_body = brotli.decompress(res_body);
      //   delete res_headers["content-encoding"];
      // }

      return new Response(res_body, { headers: res_headers });
    } catch (e: any) {
      new Response(
        JSON.stringify({
          status: "failed",
          reason: e.message,
        }),
        {
          status: 403,
          headers: { "content-type": "application/json" },
        }
      );
    }
  },
};
