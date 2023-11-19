import { VG } from "./global";
import { VLoad } from "./types";

export const w = window as unknown as {
  isMobile: boolean;
  isDesktop: boolean;
  isEditor: boolean;
};

export const vInit = (
  v: VG,
  arg: {
    load: VLoad;
    site_id: string;
    page_id: string;
    mode: "mobile" | "desktop";
    isEditor: boolean;
  }
) => {
  const { load, site_id, page_id, mode, isEditor } = arg;

  w.isDesktop = mode !== "mobile";
  w.isMobile = mode === "mobile";
  w.isEditor = isEditor;

  v.status = "load-code";
  v.current.site_id = site_id;
  v.current.page_id = page_id;

  if (load.mode === "tree_meta") {
    v.meta = load.meta;
    v.entry = load.entry;
  }
};
