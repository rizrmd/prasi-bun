import { validate } from "uuid";
import { ActionCtx } from "../type";
import { ESite } from "../../../../web/src/render/ed/logic/ed-global";
import { SAction } from "../actions";

export const site_load: SAction["site"]["load"] = async function (
  this: ActionCtx, 
  id: string 
) {
  if (validate(id)) { 
    const site = await db.site.findFirst({ where: { id } });
    if (site) {
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
