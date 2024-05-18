import { useEffect } from "react";
import { PG, active } from "./ed-global";
import { treeRebuild } from "./tree/build";

export const edUndoManager = async (p: PG) => {
  useEffect(() => {
    const keyDown = async (evt: KeyboardEvent) => {
      if (
        (evt.key === "s" || evt.key === "s") &&
        (evt.ctrlKey || evt.metaKey)
      ) {
        evt.preventDefault();
        evt.stopPropagation();
      }

      let preventUndo = false;

      if (
        document.activeElement?.tagName === "TEXTAREA" ||
        document.activeElement?.tagName === "INPUT"
      ) {
        preventUndo = true;
      }

      if (!preventUndo) {
        if (
          (evt.key === "Y" || evt.key === "y") &&
          (evt.ctrlKey || evt.metaKey) &&
          !evt.shiftKey
        ) {
          if (active.comp_id) {
            p.sync?.yjs.um("comp", "redo", active.comp_id);
          } else {
            p.sync?.yjs.um("page", "redo", p.page.cur.id);
          }
          return;
        }

        if (
          (evt.key === "Z" || evt.key === "z") &&
          (evt.ctrlKey || evt.metaKey) &&
          evt.shiftKey
        ) {
          if (active.comp_id) {
            p.sync?.yjs.um("comp", "redo", active.comp_id);
          } else {
            p.sync?.yjs.um("page", "redo", p.page.cur.id);
          }
          return;
        }

        if (
          (evt.key === "Z" || evt.key === "z") &&
          (evt.ctrlKey || evt.metaKey) &&
          !evt.shiftKey
        ) {
          if (active.comp_id) {
            p.sync?.yjs.um("comp", "undo", active.comp_id);
          } else {
            p.sync?.yjs.um("page", "undo", p.page.cur.id);
          }
        }
      }

      if (
        (evt.key === "r" || evt.key === "R" || evt.key === "®") &&
        evt.altKey
      ) {
        evt.preventDefault();
        evt.stopPropagation();
        await treeRebuild(p, { note: "reload" });
      }
    };
    window.addEventListener("keydown", keyDown, true);
    return () => {
      window.removeEventListener("keydown", keyDown, true);
    };
  }, []);
};
