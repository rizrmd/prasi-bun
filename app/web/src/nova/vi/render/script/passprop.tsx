import { ReactNode } from "react";
import { IMeta } from "../../../ed/logic/ed-global";
import { VG } from "../global";

export const createViPassProp = (
  vi: { meta: VG["meta"] },
  meta: IMeta,
  scope: any
) => {
  return (arg: Record<string, any> & { children: ReactNode }) => {
    if (!meta.scope.val) {
      meta.scope.val = {};
    }

    for (const [k, v] of Object.entries(arg)) {
      if (k === "key" || k === "idx") continue;

      if (k !== "children") {
        delete meta.scope.val[k];
        meta.scope.val[k] = v;
      }
    }

    return arg.children;
  };
};
