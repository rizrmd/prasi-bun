import { g } from "utils/global";

export const _ = {
  url: "/_proxy/*",
  async api(arg: {
    url: string;
    method: "POST" | "GET";
    headers: any;
    body: any;
  }) {
    const res = await fetch(arg.url, {
      method: arg.method,
      headers: arg.headers,
      body: arg.body,
    });
    return res as any;
  },
};
