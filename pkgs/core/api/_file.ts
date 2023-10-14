import { apiContext } from "../server/api-ctx";
import { dir } from "../utils/dir";

export const _ = {
  url: "/_file/**",
  async api() {
    const { req } = apiContext(this);
    const rpath = decodeURIComponent(req.params._);
    const path = dir(`../data/upload/${rpath}`);

    try {
      return new Response(Bun.file(path));
    } catch (e) {
      return new Response("NOT FOUND", { status: 404 });
    }
  },
}; 
