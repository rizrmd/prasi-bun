import { SAction } from "../actions";
import { SyncConnection } from "../type";
import { activity as a } from "../entity/activity";
export const activity: SAction["activity"] = async function (
  this: SyncConnection,
  name,
  type,
  id
) {
  if (type === "join") a.site.room(id).join({ ws: this.ws });
  if (type === "leave") a.site.room(id).leave({ ws: this.ws });
};
