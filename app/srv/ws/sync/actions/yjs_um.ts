import { SAction } from "../actions";
import { docs } from "../entity/docs";
import { SyncConnection } from "../type";

export const yjs_um: SAction["yjs"]["um"] = async function (
  this: SyncConnection,
  mode,
  action,
  id
) {
  if (!docs[mode][id]) {
    return;
  }

  const um = docs[mode][id].um;
  if (action === "redo") {
    if (um.canRedo()) {
      um.redo();
    }
  } else {
    if (um.undoStack.length > 1) {
      if (um.canUndo()) {
        um.undo();
      }
    }
  }
};
