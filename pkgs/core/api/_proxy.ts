import { g } from "utils/global";
import { gzipAsync } from "../../../app/srv/ws/sync/entity/zlib";

export const _ = {
  url: "/_proxy/*",
  async api(arg: {
    url: string;
    method: "POST" | "GET";
    headers: any;
    body: any;
  }) {
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
    } else {
      delete headers["content-encoding"];
    }

    return new Response(body, { headers });
  },
};
