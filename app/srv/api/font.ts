import { apiContext } from "../../../pkgs/core/server/api/api-ctx";

const g = global as unknown as {
  _font_cache: Record<string, { body: any; headers: any }>;
};

if (!g._font_cache) {
  g._font_cache = {};
}

export const _ = {
  url: "/_font/**",
  async api() {
    const { req } = apiContext(this);
    const pathname = req.url.split("/_font").pop() || "";
    const cache = g._font_cache[pathname];
    if (cache) {
      if (req.headers.get("accept-encoding")?.includes("gzip")) {
        return new Response(Bun.gzipSync(cache.body), {
          headers: {
            "content-type": cache.headers["content-type"],
            "content-encoding": "gzip",
          },
        });
      } else {
        return new Response(cache.body, {
          headers: {
            "content-type": cache.headers["content-type"],
          },
        });
      }
    }
    let f: Response = null as any;
    if (pathname?.startsWith("/s/")) {
      f = await fetch(`https://fonts.gstatic.com${pathname}`);
    } else {
      f = await fetch(`https://fonts.googleapis.com${pathname}`);
    }
    if (f) {
      const body = await f.text();
      g._font_cache[pathname] = { body, headers: {} };
      f.headers.forEach((v, k) => {
        g._font_cache[pathname].headers[k] = v;
      });

      const res = new Response(
        body.replaceAll("https://fonts.gstatic.com", "/_font")
      );

      res.headers.set("content-type", f.headers.get("content-type") || "");
      return res;
    }
  },
};
