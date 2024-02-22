import brotliPromise from "brotli-wasm";
import { apiContext } from "service-srv";

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

      return await fetch(url, {
        method: req.method || "POST",
        headers,
        body,
      });
    } catch (e: any) {
      console.error(e);
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
