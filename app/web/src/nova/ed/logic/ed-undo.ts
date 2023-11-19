import { useEffect } from "react";
import { PG } from "./ed-global";
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

      if (
        (evt.key === "Y" || evt.key === "y") &&
        (evt.ctrlKey || evt.metaKey) &&
        !evt.shiftKey
      ) {
        if (p.comp.cur.id) {
          p.sync.yjs.um("comp", "redo", p.comp.cur.id);
        } else {
          p.sync.yjs.um("page", "redo", p.page.cur.id);
        }
        return;
      }

      if (
        (evt.key === "Z" || evt.key === "z") &&
        (evt.ctrlKey || evt.metaKey) &&
        evt.shiftKey
      ) {
        if (p.comp.cur.id) {
          p.sync.yjs.um("comp", "redo", p.comp.cur.id);
        } else {
          p.sync.yjs.um("page", "redo", p.page.cur.id);
        }
        return;
      }

      if (
        (evt.key === "Z" || evt.key === "z") &&
        (evt.ctrlKey || evt.metaKey) &&
        !evt.shiftKey
      ) {
        if (p.comp.cur.id) {
          p.sync.yjs.um("comp", "undo", p.comp.cur.id);
        } else {
          p.sync.yjs.um("page", "undo", p.page.cur.id);
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
