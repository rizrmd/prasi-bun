import { apiContext } from "service-srv";
import { gzipAsync } from "../../../app/srv/ws/sync/entity/zlib";
import { CORS_HEADERS } from "../server/serve-api";
import brotliPromise from "brotli-wasm";

const brotli = await brotliPromise;

export const _ = {
  url: "/_proxy/*",
  raw: true,
  async api() {
    const { req } = apiContext(this);

    try {
      const url = new URL(decodeURIComponent(req.params["_"]));
      const body = await req.arrayBuffer();
      return await fetch(url, {
        method: req.method || "POST",
        headers: req.headers,
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
