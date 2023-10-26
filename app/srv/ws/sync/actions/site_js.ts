import { validate } from "uuid";
import { SAction } from "../actions";
import { SyncConnection, SyncType } from "../type";
import { gunzipAsync } from "../entity/zlib";
import { user } from "../entity/user";
import { conns } from "../entity/conn";
import { sendWS } from "../sync-handler";

const decoder = new TextDecoder();
export const site_js: SAction["site"]["js"] = async function (
  this: SyncConnection,
  id: string,
  js_compressed,
  built_compressed
) {
  if (validate(id)) {
    const js = decoder.decode(await gunzipAsync(js_compressed));
    const js_compiled = decoder.decode(await gunzipAsync(built_compressed));
    await db.site.update({
      where: { id },
      data: {
        js,
        js_compiled,
      },
    });

    user.active.findAll({ site_id: id }).map((e) => {
      if (e.client_id !== this.client_id) {
        const ws = conns.get(e.client_id)?.ws;
        if (ws)
          sendWS(ws, {
            type: SyncType.Event,
            event: "site_js_updated",
            data: { js: js_compressed, jsc: built_compressed },
          });
      }
    });
  }
};
