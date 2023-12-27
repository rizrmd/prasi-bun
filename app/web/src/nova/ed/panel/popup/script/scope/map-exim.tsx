import { IMeta, PG, active } from "../../../../logic/ed-global";
import { extractExportImport } from "./extract-exim";

export const scopeMapExportImport = (p: PG, meta: IMeta, parents: IMeta[]) => {
  let i = 0;
  let next_parent = parents[i + 1];
  const imports = {} as Record<string, string>;
  const exports = {} as Record<string, Record<string, string>>;

  for (const m of parents) {
    next_parent = parents[i + 1];

    let def = m.item.script;

    if (active.comp_id && m.parent?.id === "root" && active.instance) {
      const meta = p.page.meta[active.instance.item_id];
      if (meta) {
        if (!m.item.script) m.item.script = {};
        def = m.item.script;
        def.props = { ...m.item.script.props, ...meta.item.script?.props };
      }
    }

    console.log(def);

    if (def) {
      const ex = extractExportImport(p, m, imports);
      if (next_parent) {
        for (const e of Object.values(ex)) {
          for (const [filename, v] of Object.entries(e)) {
            if (!exports[m.item.id]) exports[m.item.id] = {};
            exports[m.item.id][filename] = v.src;
            for (const n of v.names) {
              imports[n] = filename;
            }
          }
        }
      }
    }
    i++;
  }

  return { imports, exports };
};
