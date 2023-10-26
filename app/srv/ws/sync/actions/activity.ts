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
  if (target.page_id && validate(target.page_id)) {
    if (!actstore.page[target.page_id]) {
      actstore.page[target.page_id] = {};
    }

    if (!actstore.page[target.page_id][target.item_id]) {
      actstore.page[target.page_id][target.item_id] = {};
    }

    if (!actstore.page[target.page_id][target.item_id][kind]) {
      actstore.page[target.page_id][target.item_id][kind] = {};
    }

    const obj = actstore.page[target.page_id][target.item_id][kind];
    if (obj) {
      if (act === Activity.Null) delete obj[this.client_id];
      else obj[this.client_id] = act;
    }

    broadcastActivity({ page_id: target.page_id }, [this.client_id]);
  }

  if (target.comp_id && validate(target.comp_id)) {
    if (!actstore.comp[target.comp_id]) {
      actstore.comp[target.comp_id] = {};
    }

    if (!actstore.comp[target.comp_id][target.item_id]) {
      actstore.comp[target.comp_id][target.item_id] = {};
    }

    if (!actstore.comp[target.comp_id][target.item_id][kind]) {
      actstore.comp[target.comp_id][target.item_id][kind] = {};
    }

    const obj = actstore.comp[target.comp_id][target.item_id][kind];
    if (obj) {
      if (act === Activity.Null) delete obj[this.client_id];
      else obj[this.client_id] = act;
    }

    broadcastActivity({ comp_id: target.comp_id }, [this.client_id]);
  }
};
