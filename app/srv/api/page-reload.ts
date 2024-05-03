import { apiContext } from "service-srv";

export const _ = {
  url: "/page-reload",
  async api() {
    const { req, res } = apiContext(this);
    return "This is page-reload.ts";
  }
}