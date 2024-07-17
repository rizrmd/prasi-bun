import type { OnMount } from "@monaco-editor/react";
import { IContent } from "../../../../../../utils/types/general";
import { IMeta, PG, active } from "../../../../logic/ed-global";
import { TypedArray } from "yjs-types";
import { register } from "../../../../../../utils/script/typings";
import { ReactElement } from "react";
import get from "lodash.get";

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
  map_childs(monaco, p, metas, entry, paths);

  const cur_path = [] as IMeta[];
  for (const path of paths) {
    if (path.find((e) => e.item.id === meta.item.id)) {
      for (const m of path) {
        if (m) {
          cur_path.push(m);
        }
      }
      break;
    }
  }

  const vars: Record<
    string,
    {
      mode: "local" | "prop" | "type";
      val: string;
    }
  > = {};
  let m_prev = null;

  const comp_types = {} as Record<string, string>;

  for (const m of cur_path) {
    if (
      !m.item.component?.id &&
      m.item.adv?.js?.includes("<Local") &&
      m.item.adv.jsBuilt
    ) {
      try {
        const local = new Function(
          "render",
          "props",
          "children",
          "Local",
          m.item.adv.jsBuilt
        );
        local(
          (el: ReactElement) => {
            const name = get(el, "props.children.props.name");
            const value = get(el, "props.children.props.value");
            vars[name] = { mode: "local", val: value };
          },
          {},
          null,
          (prop: { name: string; value: any; children: any }) => prop.children
        );
      } catch (e) {
        console.log(e);
      }
    }

    if (m.item.component?.props) {
      for (const [name, prop] of Object.entries(m.item.component.props)) {
        if (prop.meta?.type === "content-element") {
          vars[name] = { mode: "prop", val: "ReactElement" };
        } else {
          vars[name] = { mode: "prop", val: typeof prop.value };
        }
      }
    }
    if (m.editor_props) {
      for (const [k, v] of Object.entries(m.editor_props) as any) {
        vars[k] = { mode: "prop", val: typeof v === "object" ? v : typeof v };
      }
    }

    if (m.mitem?.parent && (m.mitem?.parent as any).get("meta")) {
      let prop_name = "";
      const parent = m.mitem?.parent.parent as unknown as TypedArray<any>;

      parent.forEach((c, key) => {
        if (c === m.mitem?.parent) {
          prop_name = typeof key === "string" ? key : key.toString();
        }
      });

      if (prop_name && m_prev && m_prev.item.component) {
        const prop_typings = m_prev.item.component.props[prop_name].typings;
        try {
          const typings_src = prop_typings?.substring(
            `const typings = `.length
          );
          const typings_fn = new Function(`return ${typings_src}`);
          const typings = typings_fn();
          if (typeof typings === "object") {
            for (const [k, v] of Object.entries(typings)) {
              if (typeof v === "string") {
                vars[k] = { mode: "type", val: v };
              }
            }
          }
        } catch (e) {}
      }
    }

    if (m.item.component?.id === active.comp_id) {
      for (const [name, prop] of Object.entries(m.item.component.props)) {
        if (prop.meta?.type === "content-element") {
          vars[name] = { mode: "prop", val: "ReactElement" };
        } else {
          vars[name] = { mode: "prop", val: prop.value };
        }
      }
    }
    if (m.item.id !== meta.item.id) {
      const script = m.item.script;
      if (script) {
        if (script.local) {
          vars[script.local.name] = { mode: "local", val: script.local.value };
        }
      }
    }

    const comp = m.item.component;

    const evalTypings = (typings: string) => {
      try {
        const passprop: any = {};
        const props: any = {};
        for (const [k, v] of Object.entries(m.item.script?.passprop || {})) {
          passprop[k] = v.value;
        }

        for (const [k, v] of Object.entries(m.item.script?.props || {})) {
          props[k] = v.fn || v.value;
        }

        const arg = {
          ...exports,
          ...passprop,
          ...props,
          active: active,
          _meta: metas,
          _item: m.item,
          _syncm: typeof syncronize !== "undefined" ? syncronize : undefined,
        };

        const fn = new Function(
          ...Object.keys(arg),
          `\
${typings}; 
return typings;
`
        );
        const result = fn(...Object.values(arg));
        if (typeof result === "object" && typeof result._raw === "object") {
          for (const [k, v] of Object.entries(result._raw) as any) {
            comp_types[k] = v;
          }
        }
      } catch (e) {}
    };

    if (comp && comp.typings) {
      evalTypings(comp.typings);
    }

    if (m.item.typings) {
      evalTypings(m.item.typings);
    }

    m_prev = m;
  }

  const tree_types: string[] = [];
  const tree_usage: { import: string; usage: string }[] = [];
  let i = 0;
  for (const [k, v] of Object.entries(vars)) {
    i++;
    if (v.mode === "local") {
      const im = tree_types.length;
      tree_types.push(`\
declare module "item-${im}" {
  export const \$\$_${k} = ${v.val};
}
`);
      tree_usage.push({
        import: `import { \$\$_${k} } from "item-${im}";`,
        usage: `const ${k} = null as unknown as (typeof \$\$_${k} & { render: ()=> void });  `,
      });
    } else if (v.mode === "prop") {
      const im = tree_types.length;
      tree_types.push(`\

declare module "item-${im}" {
  export const \$\$_${k} = ${v.val};
}
`);
      tree_usage.push({
        import: `import { \$\$_${k} } from "item-${im}";`,
        usage: `const ${k} = \$\$_${k};`,
      });
    } else if (v.mode === "type") {
      tree_types.push(`
export const ${k} = null as unknown as ${v.val};
`);
    }
  }

  register(monaco, tree_types.join("\n"), "ts:tree_types.d.ts");
  register(
    monaco,
    `\
${tree_usage.map((e) => e.import).join("\n")}

declare global { 
${tree_usage.map((e) => e.usage).join("\n")} 
}`,
    "ts:tree_usage.ts"
  );
  register(monaco, Object.values(comp_types).join("\n"), "ts:comp_types.d.ts");
};

const map_childs = (
  monaco: Monaco,
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
      if (meta.item.component?.id && meta.item.component?.props) {
        for (const [name, prop] of Object.entries(meta.item.component.props)) {
          if (prop.content) {
            map_childs(monaco, p, metas, [prop.content], paths, [
              ...(curpath || []),
              meta,
            ]);
          }
        }
      }

      if (Array.isArray(meta.item.childs)) {
        map_childs(monaco, p, metas, meta.item.childs, paths, [
          ...(curpath || []),
          meta,
        ]);
      }
    }
  }
};
