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
    if (path.includes(meta)) {
      for (const m of path) {
        if (m) {
          if (m.instances) {
            cur_path.length = 0;
          }
          cur_path.push(m);
        }
      }
      break;
    }
  }

  const vars: Record<string, { mode: "local"; val: string }> = {};
  for (const m of cur_path) {
    if (m !== meta) {
      const script = m.item.script;
      if (script) {
        if (script.local) {
          vars[script.local.name] = { mode: "local", val: script.local.value };
        }
      }
    }
  }

  const raw_types: string[] = [];
  for (const [k, v] of Object.entries(vars)) {
    if (v.mode === "local") {
      raw_types.push(`\
const \$\$_${k} = ${v.val};
const ${k} = null as unknown as (typeof \$\$_${k} & { render: ()=> void });
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
          if (
            prop.meta?.type === "content-element" &&
            prop.content &&
            prop.jsxCalledBy
          ) {
            const m = metas[prop.jsxCalledBy[0]];
            if (m && m.instances) {
              const instances = m.instances[prop.jsxCalledBy[0]];
              if (instances) {
                const instance_id = instances[prop.jsxCalledBy[1]];
                if (instance_id) {
                  const meta_parent = metas[instance_id];
                  map_childs(monaco, p, metas, [prop.content], paths, [
                    ...(curpath || []),
                    meta,
                    meta_parent,
                  ]);
                }
              }
            }
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
