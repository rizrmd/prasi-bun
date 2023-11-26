import { EdMeta } from "../../../../ed/logic/ed-global";
import { VG } from "../../../logic/global";

export const mergeScopeUpwards = (
  v: VG,
  id: string,
  scopeIndex?: Record<string, any>,
  each?: (meta: EdMeta, values: Record<string, any>) => boolean
) => {
  const meta = v.meta[id];

  if (!meta.scope) {
    meta.scope = {};
  }

  let cur = meta;
  const finalScope: any = {};

  while (cur) {
    let scope = null;

    let indexedScope = null;

    if (cur.indexed_scope && scopeIndex) {
      const idx = scopeIndex[cur.item.id];

      if (typeof idx !== "undefined" && cur.indexed_scope[idx]) {
        indexedScope = cur.indexed_scope[idx];
      }
    }

    if (indexedScope || cur.scope || cur.propval) {
      scope = { ...cur.scope, ...indexedScope, ...cur.propval };
      for (const [k, v] of Object.entries(scope)) {
        if (typeof finalScope[k] === "undefined") finalScope[k] = v;
      }
      if (each) {
        if (!each(cur, scope)) {
          break;
        }
      }
    }

    cur = v.meta[cur.parent_item.id];
  }

  return finalScope;
};
