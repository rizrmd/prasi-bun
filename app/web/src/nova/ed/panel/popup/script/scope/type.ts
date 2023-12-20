import type { OnMount } from "@monaco-editor/react";

export type CodeLoc = {
  item_id: string;
  type: "prop" | "item";
  comp_id?: string;
  prop_name?: string;
};

export type Monaco = Parameters<OnMount>[1];
export type MonacoEditor = Parameters<OnMount>[0];
