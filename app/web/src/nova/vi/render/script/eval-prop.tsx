import { IMeta } from "../../../ed/logic/ed-global";
import { VG } from "../global";
import { viScriptArg } from "./arg";

export const viEvalProps = (
  vi: { meta: VG["meta"] },
  meta: IMeta,
  scope: any
) => {
  if (meta.item.component?.id) {
    if (!meta.scope.def) {
      meta.scope.def = {};
    }

    if (!meta.scope.val) {
      meta.scope.val = {};
    }

    const exports = (window as any).exports;
    const arg = {
      ...exports,
      ...scope,
      ...viScriptArg(),
    };

    meta.scope.def.props = {};
    let fails = new Set<string>();
    if (!!meta.item.component.props) {
      for (const [name, prop] of Object.entries(meta.item.component.props)) {
        try {
          const fn = new Function(
            ...Object.keys(arg),
            `// [${meta.item.name}] ${name}: ${meta.item.id} 
  return ${prop.valueBuilt || ""}
    `
          );

          meta.scope.def.props[name] = { value: prop.valueBuilt };
          let val = fn(...Object.values(arg));

          if (typeof val === "function") {
            meta.scope.def.props[name].fn = val;
            val = (...args: any[]) => {
              return meta.scope.def?.props?.[name].fn(...args);
            };
          }

          meta.scope.val[name] = val;
          scope[name] = val;
          arg[name] = val;
        } catch (e) {
          fails.add(name);
        }
      }
    }
  }
};

export const updatePropScope = (meta: IMeta, scope: any) => {
  if (meta.scope.def?.props) {
    for (const [name, prop] of Object.entries(meta.scope.def.props)) {
      if (prop.fn) {
        const all_scope = {
          ...scope,
          ...meta.scope.val,
        };
        const fn = new Function(
          ...Object.keys(all_scope),
          `// [${meta.item.name}] ${name}: ${meta.item.id} 
  return ${prop.value || ""}
    `
        );
        prop.fn = fn(...Object.values(all_scope));
      }
    }
  }
};
