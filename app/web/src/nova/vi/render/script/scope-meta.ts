import { IMeta } from "../../../ed/logic/ed-global";
import { VG } from "../global";

const getScopeMeta = (vi: VG, meta: IMeta) => {
  let cur = meta;

  const scopes_meta: IMeta[] = [];
  const scope_meta: Record<
    string,
    { type: "local" | "passprop" | "jsxprop"; meta: IMeta }
  > = {};
  if (cur && cur.parent) {
    while (cur.parent) {
      scopes_meta.unshift(cur);
      if (!vi.meta[cur.parent.id]) break;
      cur = vi.meta[cur.parent.id];
    }
  }

  for (const meta of scopes_meta) {
    const def = meta.scope.def;
    if (def) {
      if (def.passprop) {
        for (const p of Object.keys(def.passprop)) {
          scope_meta[p] = { type: "passprop", meta };
        }
      }
      if (def.props) {
        for (const p of Object.keys(def.props)) {
          scope_meta[p] = { type: "jsxprop", meta };
        }
      }
      if (def.local) {
        scope_meta[def.local.name] = { type: "local", meta };
      }
    }
  }

  return scope_meta;
};

const getScopeValue = (scope_meta: ReturnType<typeof getScopeMeta>) => {
  const scope: any = {};

  for (const [varname, s] of Object.entries(scope_meta)) {
    if (s.meta.scope.val) {
      scope[varname] = s.meta.scope.val[varname];
    }
  }

  return scope;
};

export const getScope = (vi: VG, meta: IMeta) => {
  const scope_meta = getScopeMeta(vi, meta);

  return getScopeValue(scope_meta);
};
