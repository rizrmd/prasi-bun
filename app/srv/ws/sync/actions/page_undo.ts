import { docs } from "../entity/docs";
import { SyncConnection } from "../type";

export const page_undo = async function (this: SyncConnection, id: string) {
  if (!docs.page[id]) {
    return;
  }

  const um = docs.page[id].um;
  if (um.canUndo()) {
    console.log("undoing");

    um.undo();
  }
};
