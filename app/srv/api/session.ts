import { apiContext } from "service-srv";

export const _ = {
  url: "/session)}",
  async api() {
    const { req, res } = apiContext(this);
    return "This is session.ts";
  }
}