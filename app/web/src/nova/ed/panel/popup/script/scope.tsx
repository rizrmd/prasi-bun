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

  if (active.comp_id && p.comp.list[active.comp_id]) {
    s = deepClone(p.comp.list[active.comp_id].scope[active.item_id]);
  }

  if (!s) return;
  s.p.push(active_id);

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

  // for (const id of s.p) {
  //   const meta = p.page.meta[id];
  //   const ss = p.page.scope[id];
  //   if (meta) {
  //     let sc = null as any;
  //     if (meta.parent_mcomp) {
  //       const comp_id = meta.parent_mcomp.mitem.get('component')?.get('id');
  //       if (comp_id && p.comp.list[comp_id]) {
  //         sc = p.comp.list[comp_id].scope
  //       }
  //     }

  //     console.log(meta.item.name, meta.item.originalId, ss, sc);
  //   }
  // }

  spreadScope(p, s, (arg) => {
    let { prev } = arg;
    if (arg.type !== "local") {
      addScope(
        monaco,
        `${arg.comp_id || ""}~${prev?.comp_id || ""}~${prev?.item_id || ""}__${arg.type
        }~${arg.name}~${arg.id}`,
        `\
export const {};
declare global {
  const ${arg.name} = ${arg.value};
}`
      );
    } else {
      addScope(
        monaco,
        `${arg.comp_id || ""}~${prev?.comp_id || ""}~${prev?.item_id || ""}__${arg.type
        }~${arg.id}`,
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
  is_prop?: boolean;
  comp_id?: string;
  prev?: { comp_id: string; item_id: string };
};
const spreadScope = (
  p: PG,
  s: ISingleScope | undefined,
  each: (arg: IEachArgScope) => void
) => {
  if (!s) return;
  const parents = [...s.p];
  const layout_id = p.site.layout.id;
  let layout = null as null | EPage;
  if (layout_id && p.page.list[layout_id]) {
    layout = p.page.list[layout_id].page;
    if (!layout_scope[layout_id]) {
      if (layout) {
        const scopes = Object.values(layout.scope).filter((e) => {
          return e.n === "content";
        });
        const scope = scopes.shift();
        if (scope) {
          layout_scope[layout_id] = scope;
        }
      }
    }

    const scope = layout_scope[layout_id];
    if (scope) {
      parents.shift();
      scope.p.forEach((e) => parents.push(e));
    }
  }

  const mergeScopes = (
    parents: string[],
    each: (arg: IEachArgScope) => void,
    arg: { prev?: { comp_id: string; item_id: string } }
  ) => {
    let { prev } = arg;
    for (const parent_id of parents) {
      if (parent_id === "root") continue;
      let item = null as null | ISingleScope;
      const meta = p.page.meta[parent_id];

      if (layout && layout_scope[layout_id]) {
        const scope = layout_scope[layout_id];
        if (scope.p.includes(parent_id)) {
          item = layout.scope[parent_id];
        }
      }

      let comp_id = "";
      if (!item) {
        if (meta) {
          if (meta.parent_mcomp) {
            comp_id = meta.parent_mcomp.mitem.get("component")?.get("id") || "";
            if (comp_id) {
              const scope = p.comp.list[comp_id].scope;
              item = scope[meta.item.originalId || meta.item.id];
            }
          }

          if (!item) {
            item = p.page.scope[parent_id];
          }
        }
      }

      if (item) {
        const scope = item.s;
        if (scope) {
          if (scope.local)
            each({
              s,
              comp_id,
              type: "local",
              id: parent_id,
              name: scope.local.name,
              value: scope.local?.value,
              index: scope.local?.index,
              prev,
            });

          if (scope.passprop) {
            for (const [k, v] of Object.entries(scope.passprop)) {
              each({
                s,
                comp_id,
                type: "passprop",
                id: parent_id,
                name: k,
                value: v.value,
                index: v.index,
                prev,
              });
            }
          }

          if (scope.props) {
            for (const [k, v] of Object.entries(scope.props)) {
              each({
                s,
                comp_id,
                type: "prop",
                id: parent_id,
                name: k,
                value: v.value,
                is_prop: true,
                prev,
              });
            }
          }
        }
      }
    }
  };

  console.clear();
  mergeScopes(parents, each, {});
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
