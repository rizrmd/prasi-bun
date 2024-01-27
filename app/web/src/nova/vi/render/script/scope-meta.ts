import { IMeta } from "../../../ed/logic/ed-global";
import { VG } from "../global";

export const getScopeMeta = (
  vi: { meta: VG["meta"]; layout: VG["layout"] },
  meta: IMeta,
  is_layout: boolean,
  debug?: boolean
) => {
  let cur = meta;

  const scopes_meta: IMeta[] = [];
  const scope_meta: Record<
    string,
    { type: "local" | "passprop" | "jsxprop"; meta: IMeta }
  > = {};
  if (cur && cur.parent) {
    const metas = is_layout ? vi.layout?.meta : vi.meta;
    if (metas) {
      while (cur.parent) {
        scopes_meta.unshift(cur);
        if (!metas[cur.parent.id]) break;
        cur = metas[cur.parent.id];
      }
    }
  }

  for (const m of scopes_meta) {
    const def = m.item.script;
    if (def) {
      if (def.passprop) {
        for (const p of Object.keys(def.passprop)) {
          scope_meta[p] = { type: "passprop", meta: m };
        }
      }
      if (def.props) {
        for (const p of Object.keys(def.props)) {
          scope_meta[p] = { type: "jsxprop", meta: m };
        }
      }
      if (def.local) {
        scope_meta[def.local.name] = { type: "local", meta: m };
      }
    }
  }

  return scope_meta;
};
