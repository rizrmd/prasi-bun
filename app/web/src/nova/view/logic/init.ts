import { useGlobal } from "web-utils";
import { VG, ViewGlobal } from "./global";
import { VLoad } from "./types";

export const VInit = (v: VG, load: VLoad) => {
  v.mode = "ready";

  if (load.mode === "tree_meta") {
    v.meta = load.meta;
    v.entry = load.entry;
  }
};
