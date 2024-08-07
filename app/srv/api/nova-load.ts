import { apiContext } from "../../../pkgs/core/server/api/api-ctx";
import { code } from "../ws/sync/code/code";

export const _ = {
  url: "/nova-load/:mode/:id_site/**",
  async api(mode: "site" | "ssr", id_site: string) {
    const { req, res } = apiContext(this);

    const file = Bun.file(code.path(id_site, "site", "build", req.params["*"]));

    if (await file.exists()) {
      return new Response(file as any);
    }

    return `console.error("Script not found\n", "   mode: ${mode}\\n", "   id  : ${id_site}")`;
  },
};
