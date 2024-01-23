import { validate } from "uuid";
import { ESite } from "../../../../web/src/nova/ed/logic/ed-global";
import { SAction } from "../actions";
import { prepCode } from "../editor/code/prep-code";
import { SyncConnection } from "../type";

export const site_load: SAction["site"]["load"] = async function (
  this: SyncConnection,
  site_id: string
) {
  if (validate(site_id)) {
    const site = await db.site.findFirst({ where: { id: site_id } });
    if (site) {
      if (this.conf) this.conf.site_id = site.id;

      const config =
        typeof site.config === "object" && site.config
          ? { api_url: (site.config as any).api_url || "" }
          : { api_url: "" };

      const layout = await db.page.findFirst({
        where: {
          id_site: site_id,
          is_deleted: false,
          is_default_layout: true,
        },
        select: { id: true },
      });

      await prepCode(site_id, "site");

      return {
        id: site.id,
        name: site.name,
        config: config as ESite["config"],
        domain: site.domain,
        js: site.js || "",
        responsive: site.responsive as ESite["responsive"],
        js_compiled: site.js_compiled || "",
        layout: { id: layout?.id || "", snapshot: null, meta: undefined },
        code: { snapshot: null, mode: site.code_mode as "old" | "vsc" },
      };
    }
  }
};
