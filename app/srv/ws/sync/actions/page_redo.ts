import { docs } from "../entity/docs";
import { SyncConnection } from "../type";

export const page_redo = async function (this: SyncConnection, id: string) {
  if (!docs.page[id]) {
    return;
  }

  const um = docs.page[id].um;
  if (um.canRedo()) {
    console.log("redoing");
    um.redo();
  }
};
