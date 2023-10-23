import { validate } from "uuid";
import { ESite } from "../../../../web/src/render/ed/logic/ed-global";
import { SAction } from "../actions";
import { SyncConnection } from "../type";

export const site_load: SAction["site"]["load"] = async function (
  this: SyncConnection,
  id: string
) {
  if (validate(id)) {
    const site = await db.site.findFirst({ where: { id } });
    if (site) {
      if (this.conf) this.conf.site_id = site.id;

      return {
        id: site.id,
        config: site.config as ESite["config"],
        domain: site.domain,
        js: site.js || "",
        js_compiled: site.js_compiled || "",
        name: site.name,
      };
    }
  }
};
