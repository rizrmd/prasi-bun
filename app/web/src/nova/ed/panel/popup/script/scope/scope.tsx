import type { OnMount } from "@monaco-editor/react";
import { IMeta, PG } from "../../../../logic/ed-global";
import { addScope } from "./add-scope";
import { defineScopeChildren } from "./scope-children";
import { defineScopeParent } from "./scope-parent";

type Monaco = Parameters<OnMount>[1];
export type MonacoEditor = Parameters<OnMount>[0];

export const declareScope = async (
  p: PG,
  meta: IMeta,
  editor: MonacoEditor,
  monaco: Monaco
) => {
  const parent = defineScopeParent(p, meta);

  for (const [k, v] of Object.entries(parent.exports)) {
    if (k !== meta.item.id) {
      for (const [i, j] of Object.entries(v)) {
        addScope(p, monaco, i, j);
      }
    }
  }
};
