import { apiContext } from "service-srv";

export const _ = {
  url: "/site-dts",
  async api() {
    const { req, res } = apiContext(this);
    return "This is site-dts.ts";
  }
}