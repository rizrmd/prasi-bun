import { VG } from "./global";
import { VLoad } from "./types";

export const vInit = (
  v: VG,
  arg: { load: VLoad; site_id: string; page_id: string }
) => {
  const { load, site_id, page_id } = arg;

  v.mode = "load-code";
  v.current.site_id = site_id;
  v.current.page_id = page_id;

  if (load.mode === "tree_meta") {
    v.meta = load.meta;
    v.entry = load.entry;
  }
};
