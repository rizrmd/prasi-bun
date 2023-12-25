import type { OnMount } from "@monaco-editor/react";
import { IMeta, PG, active } from "../../../../logic/ed-global";
import { addScope } from "./add-scope";
import { scopeMapExportImport } from "./map-exim";
import { IItem } from "../../../../../../utils/types/item";
import { IContent } from "../../../../../../utils/types/general";

type Monaco = Parameters<OnMount>[1];
export type MonacoEditor = Parameters<OnMount>[0];

export const declareScope = async (
  p: PG,
  meta: IMeta,
  editor: MonacoEditor,
  monaco: Monaco
) => {
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

  const last_parent = parents[parents.length - 1];
  if (
    last_parent &&
    Array.isArray(last_parent.item.childs) &&
    last_parent.item.childs.length > 0
  ) {
    const paths: IMeta[][] = [];
    const childs = last_parent.item.childs;

    const map_childs = (
      childs: IContent[],
      paths: IMeta[][],
      parent?: IMeta
    ) => {
      for (const m of childs) {
        const meta = metas[m.id];
        if (meta) {
          let cur: null | IMeta[] = null;
          for (const path of paths) {
            if (path[path.length - 1] === parent) {
              cur = path;
              cur.push(meta);
              break;
            }
          }

          if (!cur) {
            paths.push([meta]);
            cur = paths[paths.length - 1];
          }

          if (cur) {
            if (Array.isArray(meta.item.childs)) {
              map_childs(meta.item.childs, paths, meta);
            }
          }
        }
      }
    };
    map_childs(childs, paths);
  } else {
    const exim = scopeMapExportImport(p, meta, parents);

    for (const [k, v] of Object.entries(exim.exports)) {
      if (k !== meta.item.id) {
        for (const [i, j] of Object.entries(v)) {
          addScope(p, monaco, i, j);
        }
      }
    }
  }
};
