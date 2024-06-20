import { apiContext } from "service-srv";
import { code } from "../ws/sync/code/code";

export const _ = {
  url: "/local-prisma/:mode/:id_site",
  async api(mode: "check" | "src", id_site: string) {
    const file = Bun.file(code.path(id_site, "site", "src", "prisma/schema.prisma"));
    if (mode === 'check') return JSON.stringify(await file.exists());
    return await file.text();
  }
}