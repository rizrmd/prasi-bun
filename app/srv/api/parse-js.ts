import { apiContext } from "service-srv";

export const _ = {
  url: "/parse-js",
  async api() {
    const { req, res } = apiContext(this);
    return "This is parse-js.ts";
  }
}