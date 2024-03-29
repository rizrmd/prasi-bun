import { FC, useEffect } from "react";
import { useGlobal, waitUntil } from "web-utils";
import { w } from "../../utils/types/general";
import { Loading } from "../../utils/ui/loading";
import { EditorGlobal } from "./logic/global";
import { execSiteJS, initEditor } from "./logic/init";
import { routeEditor } from "./logic/route";
import { rebuildTree } from "./logic/tree-logic";
import { undoManager } from "./logic/undo";
import { EMainEditor } from "./panel/e-main-editor";

export const Editor: FC<{ site_id: string; page_id: string; session: any }> = ({
  session,
  site_id,
  page_id,
}) => {
  const p = useGlobal(EditorGlobal, "EDITOR");

  if (p.site.responsive === "mobile-only") {
    p.mode = "mobile";
  } else if (p.site.responsive === "desktop-only") {
    p.mode = "desktop";
  }
  p.session = session;

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
        undoManager.redo(p);
        return;
      }

      if (
        (evt.key === "Z" || evt.key === "z") &&
        (evt.ctrlKey || evt.metaKey) &&
        evt.shiftKey
      ) {
        undoManager.redo(p);
        return;
      }

      if (
        (evt.key === "Z" || evt.key === "z") &&
        (evt.ctrlKey || evt.metaKey) &&
        !evt.shiftKey
      ) {
        undoManager.undo(p);
      }

      if (
        (evt.key === "r" || evt.key === "R" || evt.key === "®") &&
        evt.altKey
      ) {
        evt.preventDefault();
        evt.stopPropagation();
        p.localReloading = {};
        p.render();
        await rebuildTree(p, { mode: "reset", note: "reload" });
      }
    };
    window.addEventListener("keydown", keyDown, true);
    return () => {
      window.removeEventListener("keydown", keyDown, true);
    };
  }, []);

  useEffect(() => {
    if (p.status !== "init" && w.prasiApi) {
      for (const [k, v] of Object.entries(EditorGlobal)) {
        if (k === "session" || k === "site" || "status") continue;
        (p as any)[k] = v;
      }

      execSiteJS(p);
      p.render();
    }
  }, [page_id]);

  if (!p.mode) {
    if (p.site.responsive === "mobile-only") {
      p.mode = "mobile";
    } else if (p.site.responsive === "desktop-only") {
      p.mode = "desktop";
    } else {
      p.mode = (localStorage.getItem("prasi-editor-mode") || "desktop") as any;
    }
  }

  if (p.status === "init") {
    if (p.ui) {
      (window as any).mok = ((window as any).mok || 0) + 1;
      p.ui.loading = <Loading note="load-page" />;
      p.ui.preload = <Loading note="preload-root" backdrop={false} />;
      p.ui.notfound = (
        <div className="flex-1 flex items-center justify-center">NOT FOUND</div>
      );
      p.ui.error = (
        <div className="flex-1 flex items-center justify-center">
          PREVIEW ERROR
        </div>
      );
      p.status = "loading";
      initEditor(p, site_id);
    }
  }

  routeEditor(p, page_id);

  if (p.status !== "ready") {
    if (p.status === "not-found") {
      return p.ui.notfound;
    }
    if (p.status === "error") {
      return p.ui.error;
    }
    if (!p.site.id) {
      waitUntil(() => p.site?.id).then(() => {
        p.render();
      });
      return <Loading note="editor-prepare" />;
    }
  }

  return <EMainEditor />;
};
