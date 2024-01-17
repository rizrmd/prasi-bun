import type { OnMount } from "@monaco-editor/react";
import { IContent } from "../../../../../../utils/types/general";
import { IMeta, PG, active } from "../../../../logic/ed-global";
import { extractExport } from "./extract-export";

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

  const exports = {} as Record<string, string>;
  const extract_exports = {} as Record<
    string,
    ReturnType<typeof extractExport>
  >;
  const imports = {} as Record<
    string,
    Record<
      string,
      { id: string; type: "prop" | "passprop" | "local" | "scope" }
    >
  >;

  const cur_path = [] as IMeta[];
  for (const path of paths) {
    if (path.includes(meta)) {
      for (const m of path) {
        if (m.instances) {
          cur_path.length = 0;
        }
        cur_path.push(m);
      }
      break;
    }
  }

  let prev_m = null as null | IMeta;
  for (const m of cur_path) {
    if (!exports[m.item.id]) {
      const export_types = {
        local: [] as string[],
        prop: [] as string[],
        passprop: [] as string[],
        scope: [] as string[],
      };
      extract_exports[m.item.id] = extractExport(p, m);

      for (const [k, v] of Object.entries(extract_exports[m.item.id])) {
        if (v.type !== "local") {
          export_types[v.type].push(`export const ${k} = ${v.val};`);
        } else {
          export_types[v.type].push(`\
    const ${k}__local = ${v.val};
    export const ${k}: typeof ${k}__local & { render: ()=>void } = ${k}__local as any;`);
        }
      }
      for (const [k, v] of Object.entries(export_types)) {
        if (v.length > 0) {
          exports[`${m.item.id}_${k}.tsx`] = v.join("\n");
        }
      }
    }
    if (prev_m && extract_exports[prev_m.item.id]) {
      imports[m.item.id] = {};
      if (imports[prev_m.item.id]) {
        for (const [k, v] of Object.entries(imports[prev_m.item.id])) {
          imports[m.item.id][k] = v;
        }
      }

      for (const [k, v] of Object.entries(extract_exports[prev_m.item.id])) {
        imports[m.item.id][k] = { id: v.id, type: v.type };
      }
    }
    prev_m = m;
  }

  return { exports, imports };
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
