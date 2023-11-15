import { apiContext } from "service-srv";

export const _ = {
  url: "/_font/**",
  async api() {
    const { req } = apiContext(this);
    const pathname = req.url.split("/_font").pop();

    const f = await fetch(`https://fonts.googleapis.com${pathname}`);
    const body = await f.arrayBuffer();
    const res = new Response(body);
    res.headers.set("content-type", f.headers.get("content-type") || "");
    return res;
  },
};
