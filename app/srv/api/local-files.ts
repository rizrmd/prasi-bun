import { apiContext } from "service-srv";

export const _ = {
  url: "/local-files",
  async api() {
    const { req, res } = apiContext(this);
    return "This is local-files.ts";
  }
}