import { SAction } from "../actions";
import { SyncConnection } from "../type";
import { activity as a } from "../entity/activity";
import { prepCode } from "../editor/code/prep-code";
import { startCodeWatcher } from "../editor/code/dev";
export const activity: SAction["activity"] = async function (
  this: SyncConnection,
  name,
  act
) {
  const me = { ws: this.ws };
  if (act.type === "join") a.site.room(act.id).join(me);
  if (act.type === "code") {
    a.site.set(act.id, this.ws, async (data) => {
      if (act.action === "open") {
        data.site_js = act.name;
        const code = await prepCode(act.id, act.name);
        if (code) {
          await startCodeWatcher(code);
        }
      } else {
        delete data.site_js;
      } 
      return data;
    });
  }
};
