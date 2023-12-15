import type { OnMount } from "@monaco-editor/react";
import {
  EPage,
  IMeta,
  ISingleScope,
  PG,
  active,
} from "../../../logic/ed-global";
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

  for (const m of parents) {
    if (active.comp_id && m.parent?.id === "root" && active.instance) {
      const meta = p.page.meta[active.instance.item_id];
      console.log(meta.scope.val);
    }

    const def = m.scope.def;
    if (def) {
      if (def.local) {
        addScope({
          monaco,
          loc: { item_id: m.item.id, type: "item" },
          source: `\
export const {};
declare global {
  const ${def.local.name} = ${def.local.value};
}`,
        });
      }
    }
  }
};

const addScope = (arg: {
  monaco: Monaco;
  loc: { item_id: string; type: "prop" | "item" };
  source: string;
}) => {
  const { monaco, source } = arg;

  const filename = `ts:scope~${JSON.stringify(arg.loc)}.d.ts`;
  const model = monaco.editor.getModels().find((e) => {
    return e.uri.toString() === filename;
  });

  if (model) {
    model.setValue(source);
  } else {
    monaco.editor.createModel(source, "typescript", monaco.Uri.parse(filename));
  }
};
