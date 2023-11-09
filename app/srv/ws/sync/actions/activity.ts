import { SAction } from "../actions";
import { SyncConnection } from "../type";
import { activity as a } from "../entity/activity";
import { prepCode } from "../editor/code/prep-code";
import { Code, startCodeWatcher, stopCodeWatcher } from "../editor/code/watcher";
export const activity: SAction["activity"] = async function (
  this: SyncConnection,
  name,
  act
) {
  const me = { ws: this.ws };
  if (act.type === "join") a.site.room(act.id).join(me);
  if (act.type === "code") {
    const code = await prepCode(act.id, act.name);
    a.site.set(act.id, this.ws, async (data) => {
      if (act.action === "open") {
        data.site_js = act.name;
      } else {
        delete data.site_js;
      }
      return data;
    });

    if (act.action === "open") {
      await startCodeWatcher(code);
    } else {
      const userCoding = a.site
        .room(act.id)
        .findAll({ site_js: act.name }).size;

      if (userCoding === 0) {
        stopCodeWatcher(code.id);
      }
    }
  }
};
