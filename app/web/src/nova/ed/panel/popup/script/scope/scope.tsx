import type { OnMount } from "@monaco-editor/react";
import { IMeta, PG, active } from "../../../../logic/ed-global";
import { addScope } from "./add-scope";
import { defineScopeParent } from "./scope-parent";
type Monaco = Parameters<OnMount>[1];
export type MonacoEditor = Parameters<OnMount>[0];

export const declareScope = async (
  p: PG,
  meta: IMeta,
  editor: MonacoEditor,
  monaco: Monaco
) => {
  defineScopeParent(p, meta, monaco);
};
