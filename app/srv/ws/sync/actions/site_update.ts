import { validate } from "uuid";
import { SAction } from "../actions";
import { SyncConnection, SyncType } from "../type";
import { gunzipAsync } from "../entity/zlib";
import { user } from "../entity/user";
import { conns } from "../entity/conn";
import { sendWS } from "../sync-handler";

const decoder = new TextDecoder();
export const site_update: SAction["site"]["update"] = async function (
  this: SyncConnection,
  id: string,
  site
) {
  if (validate(id)) {
    const updated = {} as any;
    for (const [key, value] of Object.entries(site)) {
      if (key === "js" || key === "js_compiled") {
        updated[key] = decoder.decode(await gunzipAsync(value as any));
      } else {
        updated[key] = value;
      }
    }

    await _db.site.update({
      where: { id },
      data: updated,
    });

    user.active.findAll({ site_id: id }).map((e) => {
      if (e.client_id !== this.client_id) {
        const ws = conns.get(e.client_id)?.ws;
        if (ws)
          sendWS(ws, {
            type: SyncType.Event,
            event: "site_updated",
            data: site,
          });
      }
    });
  }
};
