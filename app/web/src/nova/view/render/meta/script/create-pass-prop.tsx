import { ReactNode } from "react";
import { VG } from "../../../logic/global";
import { modifyChildScopeIndex } from "./mod-scope-index";
import hash_sum from "hash-sum";

export const createPassProp = (
  v: VG,
  id: string,
  existingScopeIndex?: Record<string, any>
) => {
  return (arg: Record<string, any> & { children: ReactNode; idx?: any }) => {
    const meta = v.meta[id];

    if (arg.idx &&meta && meta.item && meta.item.id) {
      let idx = arg.idx;
      if (!idx) {
        const narg: any = {};
        for (const [k, v] of Object.entries(arg)) {
          if (typeof v !== "object" && typeof v !== "function") {
            narg[k] = v;
          }
        }
        idx = hash_sum(narg);
        arg.idx = idx;
      }
      meta.indexed_scope[idx] = {};

      for (const [k, v] of Object.entries(arg)) {
        if (k === "children") continue;
        meta.indexed_scope[idx][k] = v;
      }

      const scopeIndex = { ...existingScopeIndex, [meta.item.id]: idx };

      if (!meta.scope) {
        meta.scope = {};
      }
      for (const [k, v] of Object.entries(arg)) {
        if (k === "children") continue;
        meta.scope[k] = v;
      }

      return modifyChildScopeIndex(arg.children, scopeIndex);
    }

    if (!meta.scope) {
      meta.scope = {};
    }
    for (const [k, v] of Object.entries(arg)) {
      if (k === "children") continue;
      meta.scope[k] = v;
    }

    return arg.children;
  };
};
