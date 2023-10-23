import { docs } from "../entity/docs";
import { ActionCtx } from "../type";

export const page_undo = async function (this: ActionCtx, id: string) {
  if (!docs.page[id]) {
    return;
  }

  const um = docs.page[id].um;
  if (um.canUndo()) {
    um.undo();
  }
};
