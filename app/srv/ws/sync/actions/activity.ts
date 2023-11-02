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
    a.site.room(act.id).set(me, (ws, data) => {
      if (act.action === "open") {
        data.code = { name: act.name };
      } else {
        delete data.code;
      }
      return data;
    });
  }
};
