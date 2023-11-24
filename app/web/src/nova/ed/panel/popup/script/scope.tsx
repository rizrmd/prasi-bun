import type { OnMount } from "@monaco-editor/react";
import { deepClone } from "web-utils";
import { EPage, ISingleScope, PG, active } from "../../../logic/ed-global";
type Monaco = Parameters<OnMount>[1];
export type MonacoEditor = Parameters<OnMount>[0];

export const declareScope = async (
  p: PG,
  editor: MonacoEditor,
  monaco: Monaco
) => {
  let active_id = active.item_id;
  let s = deepClone(p.page.scope[active_id]);

  if (active.comp_id) {
    s = deepClone(p.comp.list[active.comp_id].scope[active.item_id]);
  }

  monaco.editor.getModels().forEach((model) => {
    if (model.uri.toString().startsWith("ts:scope~")) {
      model.dispose();
    }
  });

  const existing: Record<string, IEachArgScope> = {};
  spreadScope(p, s, (arg) => {
    const { name } = arg;
    const e = existing[name];
    if (e && e.s.s) {
      if (e.type === "local") {
        delete e.s.s.local;
      }
      if (e.type === "passprop" && e.s.s.passprop) {
        delete e.s.s.passprop[e.name];
      }
      if (e.type === "prop" && e.s.s.props) {
        delete e.s.s.props[e.name];
      }
    }
    existing[name] = arg;
  });

  spreadScope(p, s, (arg) => {
    if (arg.type !== "local") {
      addScope(
        monaco,
        `${arg.type}~${arg.name}`,
        `\
export const {};
declare global {
  const ${arg.name} = ${arg.value};
}`
      );
    } else {
      addScope(
        monaco,
        `${arg.type}~${arg.id}`,
        `\
export const {};
const __val = ${arg.value};
declare global {
  const ${arg.name}: typeof __val & { render: ()=>void };
}`
      );
    }
  });
};

const layout_scope = {} as Record<string, ISingleScope>;

type IEachArgScope = {
  s: ISingleScope;
  name: string;
  value: string;
  id: string;
  type: "local" | "prop" | "passprop";
  index?: number;
  isProp?: boolean;
};
const spreadScope = (
  p: PG,
  s: ISingleScope,
  each: (arg: IEachArgScope) => void
) => {
  const parents = [...s.p];
  const layout_id = p.site.layout.id;
  let layout = null as null | EPage;
  if (layout_id && p.page.list[layout_id]) {
    layout = p.page.list[layout_id].page;
    if (!layout_scope[layout_id]) {
      if (layout) {
        const scope = Object.values(layout.scope).find((e) => {
          return e.n === "content";
        });
        if (scope) {
          layout_scope[layout_id] = scope;
        }
      }
    }

    const scope = layout_scope[layout_id];
    if (scope) {
      parents.shift();
      scope.p.forEach((e) => parents.unshift(e));
    }
  }

  for (const parent_id of parents) {
    let item = null as null | ISingleScope;
    if (layout && layout_scope[layout_id]) {
      const scope = layout_scope[layout_id];
      if (scope.p.includes(parent_id)) {
        item = layout.scope[parent_id];
      }
    }
    if (!item) {
      if (active.comp_id) {
        item = p.comp.list[active.comp_id].scope[parent_id];
      } else {
        item = p.page.scope[parent_id];
      }
    }

    if (item) {
      const scope = item.s;
      if (scope) {
        if (scope.local)
          each({
            s,
            type: "local",
            id: parent_id,
            name: scope.local.name,
            value: scope.local?.value,
            index: scope.local?.index,
          });

        if (scope.passprop) {
          for (const [k, v] of Object.entries(scope.passprop)) {
            each({
              s,
              type: "passprop",
              id: parent_id,
              name: k,
              value: v.value,
              index: v.index,
            });
          }
        }

        if (scope.props) {
          for (const [k, v] of Object.entries(scope.props)) {
            each({
              s,
              type: "prop",
              id: parent_id,
              name: k,
              value: v.value,
              isProp: true,
            });
          }
        }
      }
    }
  }
};

const addScope = (monaco: Monaco, id: string, source: string) => {
  const model = monaco.editor.getModels().find((e) => {
    return e.uri.toString() === `ts:scope~${id}.d.ts`;
  });

  if (model) {
    model.setValue(source);
  } else {
    monaco.editor.createModel(
      source,
      "typescript",
      monaco.Uri.parse(`ts:scope~${id}.d.ts`)
    );
  }
};
