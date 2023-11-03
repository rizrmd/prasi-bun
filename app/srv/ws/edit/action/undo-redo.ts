import { eg } from "../edit-global";

export const undo = (ws: any, msg: any) => {
  const um = getUndoManager(msg);
  if (um && um.canUndo()) {
    um.undo();
  }
};

export const redo = (ws: any, msg: any) => {
  const um = getUndoManager(msg);
  if (um && um.canRedo()) {
    um.redo();
  }
};

const getUndoManager = (msg: any | any) => {
  let undoManager = null as null | Y.UndoManager;
  if (msg.mode === "page") {
    if (eg.edit.page[msg.id]) {
      undoManager = eg.edit.page[msg.id].undoManager;
    }
  } else if (msg.mode === "site") {
    if (eg.edit.site[msg.id]) {
      undoManager = eg.edit.site[msg.id].undoManager;
    }
  } else if (msg.mode === "comp") {
    if (eg.edit.comp[msg.id]) {
      undoManager = eg.edit.comp[msg.id].undoManager;
    }
  }

  return undoManager;
};
