import { IMeta, PG, active } from "../../../../logic/ed-global";
import { extractExportImport } from "./extract-exim";
import { Monaco } from "./type";

export const defineScopeParent = (p: PG, meta: IMeta, monaco: Monaco) => {
  const metas = active.comp_id
    ? p.comp.list[active.comp_id]?.meta
    : p.page.meta;

  const parents: IMeta[] = [];
  let cur = meta;
  if (cur && cur.parent) {
    while (cur && cur.parent && cur.parent.id) {
      if (cur.mitem) {
        parents.unshift(cur);
      }
      cur = metas[cur.parent.id];
    }
  }

  let i = 0;
  let next_parent = parents[i + 1];
  const imports = {} as Record<string, any>;
  for (const m of parents) {
    next_parent = parents[i + 1];

    if (active.comp_id && m.parent?.id === "root" && active.instance) {
      const meta = p.page.meta[active.instance.item_id];
      if (meta) {
        if (!m.scope.def) m.scope.def = {};
        m.scope.def.props = meta.scope?.def?.props;
      }
    }

    const def = m.scope.def;
    if (def) {
      if (!imports[m.item.id]) imports[m.item.id] = [];
      const res = extractExportImport(p, m, imports[m.item.id]);
      if (next_parent) {
        imports[next_parent.item.id] = res.imports;
      }
    }
    i++;
  }
};
