import type { OnMount } from "@monaco-editor/react";
import { IContent } from "../../../../../../utils/types/general";
import { IMeta, PG, active } from "../../../../logic/ed-global";
import { addScope } from "./add-scope";
import { scopeMapExportImport } from "./map-exim";
import hash_sum from "hash-sum";

type Monaco = Parameters<OnMount>[1];
export type MonacoEditor = Parameters<OnMount>[0];

export const declareScope = async (
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
    monaco.editor.getModels().forEach((model) => {
      if (model.uri.toString().startsWith("ts:scope~")) {
        model.dispose();
      }
    });
  }

  const metas = active.comp_id
    ? p.comp.list[active.comp_id]?.meta
    : p.page.meta;
  const entry = active.comp_id
    ? [p.comp.loaded[active.comp_id].comp]
    : p.page.entry.map((e) => p.page.meta[e].item);

  const paths: IMeta[][] = [];
  map_childs(metas, entry, paths);
  const added = new Set<string>();
  for (const path of paths) {
    const exim = scopeMapExportImport(p, meta, path);

    for (const [k, v] of Object.entries(exim.exports)) {
      for (const [filename, src] of Object.entries(v)) {
        if (!added.has(filename)) {
          added.add(filename);

          addScope(p, monaco, filename, src);
        }
      }
    }
  }
};

const map_childs = (
  metas: Record<string, IMeta>,
  childs: IContent[],
  paths: IMeta[][],
  curpath?: IMeta[],
  parent?: IMeta
) => {
  for (const m of childs) {
    const meta = metas[m.id];
    if (meta) {
      if (
        meta.item.type === "item" &&
        meta.item.component?.id &&
        meta.item.component?.id !== active.comp_id
      ) {
        continue;
      }

      let cur: null | IMeta[] = null;
      for (const path of paths) {
        if (path[path.length - 1] === parent) {
          cur = path;
          cur.push(meta);
          break;
        }
      }

      if (!cur) {
        paths.push([...(curpath || []), meta]);
        cur = paths[paths.length - 1];
      }

      if (cur) {
        if (Array.isArray(meta.item.childs)) {
          map_childs(metas, meta.item.childs, paths, cur, meta);
        }
      }
    }
  }
};
