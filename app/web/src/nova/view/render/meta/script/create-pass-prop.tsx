import { ReactNode } from "react";
import { VG } from "../../../logic/global";
import { modifyChildScopeIndex } from "./mod-scope-index";

export const createPassProp = (
  v: VG,
  id: string,
  existingScopeIndex?: Record<string, any>
) => {
  return (arg: Record<string, any> & { children: ReactNode; idx?: any }) => {
    const meta = v.meta[id];

    if (typeof arg.idx !== "undefined" && meta && meta.item && meta.item.id) {
      meta.indexed_scope[arg.idx] = {};

      for (const [k, v] of Object.entries(arg)) {
        if (k === "children") continue;
        meta.indexed_scope[arg.idx][k] = v;
      }

      const scopeIndex = { ...existingScopeIndex, [meta.item.id]: arg.idx };

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
