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

  const jsxprop_import_map: Record<string, string> = {};
  map_childs(
    monaco,
    p,
    metas,
    entry,
    paths,
    active.comp_id ? [active.comp_id] : [],
    jsxprop_import_map
  );

  let cur = active.comp_id ? active.comp_id : "page";
  const { import_map, parent_id } = extract_import_map(
    cur,
    paths,
    meta,
    p,
    monaco
  );

  const merged_import_map = {
    ...import_map,
    ...jsxprop_import_map,
  };

  gen_content(cur, p, paths, merged_import_map, monaco);
  return merged_import_map[parent_id];
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
      if (!added.has(m.item.id) && m.item.adv?.js) {
        added.add(m.item.id);

        const content = last_import
          ? `\
${last_import}
/** IMPORT MODULE **/
${m.item.adv.js}`
          : m.item.adv.js;

        addScope(p, monaco, `file:///${cur}_${m.item.id}_src_src.tsx`, content);
      }

      if (!import_map[m.item.id]) {
        if (idx === 0) {
          break;
        }
      } else {
        last_import = import_map[m.item.id];
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
  monaco?: Monaco
) => {
  const added = new Set<string>();
  let parent_id = "";
  const import_map = {} as Record<string, string>;
  for (const path of paths) {
    const imports = new Set<string>();
    if (path.map((e) => e.item.id).includes(meta.item.id)) {
      let i = 0;

      let prev_m = null as any;
      for (const m of path) {
        if (m.item.id === meta.item.id) {
          if (prev_m) parent_id = prev_m.item.id;
        }
        prev_m = m;
        if (!added.has(m.item.id)) {
          added.add(m.item.id);

          const ex = extractExport(p, m);
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
            if (src && monaco) {
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

          import_map[m.item.id] = [...imports].join("\n");
        }
        i++;
      }
    }
  }
  return { import_map, parent_id };
};

const comp_map = {} as Record<
  string,
  {
    paths: IMeta[][];
    exports: Record<string, ReturnType<typeof extractExport>>;
  }
>;

const map_childs = (
  monaco: Monaco,
  p: PG,
  metas: Record<string, IMeta>,
  childs: IContent[],
  paths: IMeta[][],
  skip_comp_id: string[],
  jsxprop_import_map: Record<string, string> = {},
  curpath?: IMeta[]
) => {
  for (const m of childs) {
    const meta = metas[m.id];
    if (meta) {
      paths.push([...(curpath || []), meta]);
      if (
        meta.item.type === "item" &&
        meta.item.component?.id &&
        !skip_comp_id.includes(meta.item.component?.id)
      ) {
        const comp_id = meta.item.component.id;
        let jprop = comp_map[comp_id];
        if (!jprop) {
          const comp_metas = p.comp.list[comp_id].meta;
          comp_map[meta.item.component.id] = {
            paths: [],
            exports: {},
          };
          const id = p.comp.list[comp_id].doc
            .getMap("map")
            .get("root")
            ?.get("id");

          if (id) {
            map_childs(
              monaco,
              p,
              comp_metas,
              [comp_metas[id].item],
              comp_map[meta.item.component.id].paths,
              [...skip_comp_id, comp_id]
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

        if (jprop) {
          for (const [name, prop] of Object.entries(
            meta.item.component.props
          )) {
            if (
              prop.meta?.type === "content-element" &&
              prop.content &&
              prop.jsxCalledBy
            ) {
              const mjsx = p.comp.list[comp_id].meta[prop.jsxCalledBy];
              const { import_map, parent_id } = extract_import_map(
                meta.item.component.id,
                jprop.paths,
                mjsx,
                p,
                monaco
              );

              gen_content(
                meta.item.component.id,
                p,
                jprop.paths,
                import_map,
                monaco
              );

              jsxprop_import_map[prop.content.id] = import_map[parent_id];
              const prop_meta = metas[prop.content.id];
              map_childs(
                monaco,
                p,
                metas,
                prop.content.childs,
                paths,
                [...skip_comp_id, comp_id],
                jsxprop_import_map,
                [...(curpath || []), prop_meta]
              );
            }
          }
        }
      } else {
        if (Array.isArray(meta.item.childs)) {
          map_childs(
            monaco,
            p,
            metas,
            meta.item.childs,
            paths,
            [...skip_comp_id],
            jsxprop_import_map,
            [...(curpath || []), meta]
          );
        }
      }
    }
  }
};
