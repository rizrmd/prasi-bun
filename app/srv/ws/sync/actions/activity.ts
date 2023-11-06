import { SAction } from "../actions";
import { SyncConnection } from "../type";
import { activity as a } from "../entity/activity";
export const activity: SAction["activity"] = async function (
  this: SyncConnection,
  name,
  act
) {
  const me = { ws: this.ws };
  if (act.type === "join") a.site.room(act.id).join(me);
  if (act.type === "code") {
    a.site.set(act.id, this.ws, (data) => {
      if (act.action === "open") {
        data.site_js = act.name;
      } else {
        delete data.site_js;
      }
      return data;
    });
  }
};
