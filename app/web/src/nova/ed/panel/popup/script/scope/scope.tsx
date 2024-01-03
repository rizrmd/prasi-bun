import type { OnMount } from "@monaco-editor/react";
import hash_sum from "hash-sum";
import { IContent } from "../../../../../../utils/types/general";
import { IMeta, PG, active } from "../../../../logic/ed-global";
import { extractExport } from "./extract-export";
import { addScope } from "./add-scope";

type Monaco = Parameters<OnMount>[1];
export type MonacoEditor = Parameters<OnMount>[0];

export const declareScope = (
  p: PG,
  meta: IMeta,
  editor: MonacoEditor,
  monaco: Monaco
) => {
  const e = editor as any;
  const sum_id = hash_sum({
    page_id: p.page.cur.id,
    comp_id: active.comp_id,
  });
  if (e.scope_id === sum_id) {
    return;
  } else {
    e.scope_id = sum_id;
  }

  const metas = active.comp_id
    ? p.comp.list[active.comp_id]?.meta
    : p.page.meta;
  const entry = active.comp_id
    ? [p.comp.loaded[active.comp_id]]
    : p.page.entry.map((e) => p.page.meta[e].item);

  const paths: IMeta[][] = [];

  map_childs(metas, entry, paths);

  let cur = "page";
  const import_map = extract_import_map(cur, paths, meta, p, monaco);
  gen_content(cur, p, paths, import_map, monaco);
  return import_map[active.item_id];
};

const gen_content = (
  cur: string,
  p: PG,
  paths: IMeta[][],
  import_map: Record<string, string>,
  monaco: Monaco
) => {
  const added = new Set<string>();
  for (const path of paths) {
    let idx = 0;
    let last_import = "";
    for (const m of path) {
      if (!import_map[m.item.id]) {
        if (idx === 0) {
          break;
        }
      } else {
        last_import = import_map[m.item.id];
      }

      if (!added.has(m.item.id) && m.item.adv?.js) {
        added.add(m.item.id);
        const content = `\
${last_import}
/** IMPORT BOUNDARY **/
${m.item.adv.js}
`;

        addScope(
          p,
          monaco,
          `file:///${cur}_${m.item.id}_src_src.tsx`,
          content
        );
      }
      idx++;
    }
  }
};

const extract_import_map = (
  cur: string,
  paths: IMeta[][],
  meta: IMeta,
  p: PG,
  monaco: Monaco
) => {
  const added = new Set<string>();

  const import_map = {} as Record<string, string>;
  for (const path of paths) {
    const imports = new Set<string>();
    if (path.map((e) => e.item.id).includes(meta.item.id)) {
      let i = 0;

      for (const meta of path) {
        if (!added.has(meta.item.id)) {
          added.add(meta.item.id);

          const ex = extractExport(p, meta);

          for (const [k, v] of Object.entries(ex)) {
            let src = "";
            if (v.type === "local") {
              src = `\
const _local = ${v.val};
export const ${k}: typeof _local & { render: ()=>void } = _local;
`;
            } else {
              src = `export const ${k} = ${v.val}`;
            }
            if (src) {
              addScope(
                p,
                monaco,
                `file:///${cur}_${v.id}_${v.type}_${k}.tsx`,
                `\
${[...imports].join("\n")}
/** IMPORT BOUNDARY **/
${src}`
              );
            }
          }

          for (const [k, v] of Object.entries(ex)) {
            imports.add(
              `import { ${k} } from './${cur}_${v.id}_${v.type}_${k}';`
            );
          }

          import_map[meta.item.id] = [...imports].join("\n");
        }
        i++;
      }
    }
  }
  return import_map;
};

const map_childs = (
  metas: Record<string, IMeta>,
  childs: IContent[],
  paths: IMeta[][],
  curpath?: IMeta[]
) => {
  for (const m of childs) {
    const meta = metas[m.id];
    if (meta) {
      paths.push([...(curpath || []), meta]);
      if (
        meta.item.type === "item" &&
        meta.item.component?.id &&
        meta.item.component?.id !== active.comp_id
      ) {
        if (meta.item.component?.props) {
          for (const [_, p] of Object.entries(meta.item.component.props)) {
            if (p.meta?.type === "content-element" && p.content) {
              // map_childs(metas, [p.content], paths, [...(curpath || []), meta]);
            }
          }
        }
      } else {
        if (Array.isArray(meta.item.childs)) {
          map_childs(metas, meta.item.childs, paths, [
            ...(curpath || []),
            meta,
          ]);
        }
      }
    }
  }
};
