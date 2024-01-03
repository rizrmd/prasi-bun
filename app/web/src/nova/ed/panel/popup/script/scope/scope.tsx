import type { OnMount } from "@monaco-editor/react";
import { IContent } from "../../../../../../utils/types/general";
import { IMeta, PG, active } from "../../../../logic/ed-global";
import { addScope } from "./add-scope";
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

  map_childs(p, metas, entry, paths);

  let cur = active.comp_id ? active.comp_id : "page";
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
/** IMPORT MODULE **/
${m.item.adv.js}
`;

        addScope(p, monaco, `file:///${cur}_${m.item.id}_src_src.tsx`, content);
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
/** IMPORT MODULE **/
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

const comp_map = {} as Record<
  string,
  {
    paths: IMeta[][];
    prop_imports: Record<string, string>;
    exports: Record<string, ReturnType<typeof extractExport>>;
  }
>;

const map_childs = (
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
      if (
        meta.item.type === "item" &&
        meta.item.component?.id &&
        meta.item.component?.id !== active.comp_id
      ) {
        const comp_id = meta.item.component.id;
        let jprop = comp_map[comp_id];
        if (!jprop) {
          const comp_metas = p.comp.list[comp_id].meta;
          comp_map[meta.item.component.id] = {
            paths: [],
            prop_imports: {},
            exports: {},
          };
          const id = p.comp.list[comp_id].doc
            .getMap("map")
            .get("root")
            ?.get("id");

          if (id) {
            map_childs(
              p,
              comp_metas,
              [comp_metas[id].item],
              comp_map[meta.item.component.id].paths
            );

            jprop = comp_map[meta.item.component.id];
            for (const path of jprop.paths) {
              for (const m of path) {
                if (!jprop.exports[m.item.id]) {
                  jprop.exports[m.item.id] = extractExport(p, m);
                }
              }
            }
          }
        }
      } else {
        if (Array.isArray(meta.item.childs)) {
          map_childs(p, metas, meta.item.childs, paths, [
            ...(curpath || []),
            meta,
          ]);
        }
      }
    }
  }
};
