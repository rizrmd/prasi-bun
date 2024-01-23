import { dir } from "dir";
import { apiContext } from "../../../pkgs/core/server/api/api-ctx";
import { g } from "utils/global";
import { code } from "../ws/sync/editor/code/util-code";

export const _ = {
  url: "/nova-load/:mode/:id/**",
  async api(mode: "site" | "ssr", id_site: string) {
    const { req, res } = apiContext(this);

    const file = Bun.file(code.path(id_site, mode, "build", req.params["*"]));
    if (await file.exists()) {
      return new Response(file as any);
    }

    return `console.warn("Script not found\n", "   mode: ${mode}\\n", "   id  : ${id_site}")`;
  },
};
