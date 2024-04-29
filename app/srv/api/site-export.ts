import { apiContext } from "service-srv";

export const _ = {
  url: "/site-export",
  async api() {
    const { req, res } = apiContext(this);
    return "This is site-export.ts";
  }
}