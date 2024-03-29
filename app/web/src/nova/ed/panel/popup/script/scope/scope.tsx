import type { OnMount } from "@monaco-editor/react";
import { IContent } from "../../../../../../utils/types/general";
import { IMeta, PG, active } from "../../../../logic/ed-global";

type Monaco = Parameters<OnMount>[1];
export type MonacoEditor = Parameters<OnMount>[0];

export const declareScope = (p: PG, meta: IMeta, monaco: Monaco) => {
  const metas = active.comp_id
    ? p.comp.list[active.comp_id]?.meta
    : p.page.meta;
  const entry = active.comp_id
    ? [p.comp.loaded[active.comp_id]]
    : p.page.entry.map((e) => p.page.meta[e].item);

  const paths: IMeta[][] = [];
  map_childs(monaco, p, metas, entry, paths);

  const cur_path = [] as IMeta[];
  for (const path of paths) {
    if (path.find((e) => e.item.id === meta.item.id)) {
      for (const m of path) {
        if (m) {
          cur_path.push(m);
        }
      }
      break;
    }
  }

  const vars: Record<string, { mode: "local" | "prop" | "type"; val: string }> =
    {};
  let m_prev = null;
  for (const m of cur_path) {
    if (m.mitem?.parent && (m.mitem?.parent as any).get("meta")) {
      let prop_name = "";
      m.mitem?.parent.parent.forEach((c, key) => {
        if (c === m.mitem?.parent) {
          prop_name = key;
        }
      });

      if (prop_name && m_prev && m_prev.item.component) {
        const prop_typings = m_prev.item.component.props[prop_name].typings;
        try {
          const typings_src = prop_typings.substring(`const typings = `.length);
          const typings_fn = new Function(`return ${typings_src}`);
          const typings = typings_fn();
          if (typeof typings === "object") {
            for (const [k, v] of Object.entries(typings)) {
              if (typeof v === "string") {
                vars[k] = { mode: "type", val: v };
              }
            }
          }
        } catch (e) {}
      }
    }

    if (m.item.component?.id === active.comp_id) {
      for (const [name, prop] of Object.entries(m.item.component.props)) {
        if (prop.meta?.type === "content-element") {
          vars[name] = { mode: "prop", val: "ReactElement" };
        } else {
          vars[name] = { mode: "prop", val: prop.value };
        }
      }
    }
    if (m.item.id !== meta.item.id) {
      const script = m.item.script;
      if (script) {
        if (script.local) {
          vars[script.local.name] = { mode: "local", val: script.local.value };
        }
      }
    }
    m_prev = m;
  }

  const raw_types: string[] = [];
  for (const [k, v] of Object.entries(vars)) {
    if (v.mode === "local") {
      raw_types.push(`\
const \$\$_${k} = ${v.val};
const ${k} = null as unknown as (typeof \$\$_${k} & { render: ()=> void });
`);
    } else if (v.mode === "prop") {
      raw_types.push(`\
const \$\$_${k} = ${v.val};
const ${k} = null as unknown as typeof \$\$_${k};`);
    } else if (v.mode === "type") {
      raw_types.push(`
const ${k} = null as unknown as ${v.val};
`);
    }
  }

  return raw_types.join("\n");
};

const map_childs = (
  monaco: Monaco,
  p: PG,
  metas: Record<string, IMeta>,
  childs: IContent[],
  paths: IMeta[][],
  curpath?: IMeta[]
) => {
  for (const m of childs) {
    const meta = metas[m.id];
    if (meta) {
      paths.push([...(curpath || []), meta]);
      if (meta.item.component?.id && meta.item.component?.props) {
        for (const [name, prop] of Object.entries(meta.item.component.props)) {
          if (prop.content) {
            map_childs(monaco, p, metas, [prop.content], paths, [
              ...(curpath || []),
              meta,
            ]);
          }
        }
      }

      if (Array.isArray(meta.item.childs)) {
        map_childs(monaco, p, metas, meta.item.childs, paths, [
          ...(curpath || []),
          meta,
        ]);
      }
    }
  }
};
