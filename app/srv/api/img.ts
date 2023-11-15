import { apiContext } from "service-srv";
import { g } from "utils/global";

export const _ = {
  url: "/_img/**",
  async api() {
    const { req, res } = apiContext(this);
    const file = Bun.file(`${g.datadir}/upload/${req.params["*"]}`);
    if (await file.exists()) {
      return new Response(file as any);
    }
    return new Response("NOT FOUND", { status: 404 });
  },
};
