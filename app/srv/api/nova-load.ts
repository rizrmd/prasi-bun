import { dir } from "dir";
import { apiContext } from "service-srv";
import { g } from "utils/global";

export const _ = {
  url: "/nova-load/:mode/:id/**",
  async api(mode: "site" | "page" | "code", id: string) {
    const { req, res } = apiContext(this);

    if (mode === "site") {
      const code = await db.code.findFirst({ where: { id_site: id } });
      if (code) {
        const file = Bun.file(
          dir.path(`${g.datadir}/site/build/${code.id}/${req.params["*"]}`)
        );
        if (await file.exists()) {
          return new Response(file as any);
        }
      }
    }
    if (mode === "page") {
      const code = await db.code_assign.findMany({ where: { id_page: id } });
      return code.map((e) => e.id);
    } else if (mode === "code") {
      const file = Bun.file(
        dir.path(`${g.datadir}/site/build/${id}/${req.params["*"]}`)
      );
      if (await file.exists()) {
        return new Response(file as any);
      }
    }

    return "This is nova-load.ts";
  },
};
