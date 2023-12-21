import { g } from "utils/global";

export const _ = {
  url: "/_proxy/*",
  async api(arg: {
    url: string;
    method: "POST" | "GET";
    headers: any;
    body: any;
  }) {
    const res = await fetch(
      arg.url,
      arg.body
        ? {
            method: arg.method || "POST",
            headers: arg.headers,
            body: arg.body,
          }
        : {
            headers: arg.headers,
          }
    );
    return res as any;
  },
};
