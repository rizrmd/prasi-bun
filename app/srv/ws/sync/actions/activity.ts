import { validate } from "uuid";
import { SAction } from "../actions";
import { actstore, broadcastActivity } from "../entity/actstore";
import { Activity, SyncConnection } from "../type";

export const activity: SAction["activity"] = async function (
  this: SyncConnection,
  target,
  kind,
  act
) {
  const key = (target.page_id ? "page_id" : "comp_id") as "page_id" | "comp_id";
  const type = (target.page_id ? "page" : "comp") as "page" | "comp";
  const tkey = target[key];
  if (!tkey) return;
  if (validate(tkey)) {
    if (!actstore[type][tkey]) actstore[type][tkey] = {};

    if (!actstore[type][tkey][target.item_id])
      actstore[type][tkey][target.item_id] = {};

    if (!actstore[type][tkey][target.item_id][kind])
      actstore[type][tkey][target.item_id][kind] = {};

    const obj = actstore[type][tkey][target.item_id][kind];
    if (obj) {
      if (act === Activity.Null) {
        delete obj[this.client_id];
        if (Object.keys(obj).length === 0) {
          delete actstore[type][tkey][target.item_id][kind];

          if (Object.keys(actstore[type][tkey][target.item_id]).length === 0) {
            delete actstore[type][tkey][target.item_id];
          }
        }
      } else obj[this.client_id] = act;
    }

    broadcastActivity({ [key]: tkey });
  }
};
