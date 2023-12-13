import { IMeta } from "../../../ed/logic/ed-global";
import { invalidKeyword } from "../../../ed/panel/side/prop-master/prop-form";
import { VG } from "../global";
import { getScopeMeta, getScopeValue } from "./scope-meta";

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
      isEditor: true,
    };

    meta.scope.def.props = {};
    let fails = new Set<string>();
    for (const [name, prop] of Object.entries(meta.item.component.props)) {
      try {
        const fn = new Function(
          ...Object.keys(arg),
          `// [${meta.item.name}] ${name}: ${meta.item.id} 
  return ${prop.valueBuilt || ""}
    `
        );
        meta.scope.def.props[name] = prop.value;
        meta.scope.val[name] = fn(...Object.values(arg));
        scope[name] = meta.scope.val[name];
        arg[name] = scope[name];
      } catch (e) {
        fails.add(name);
      }
    }

    if (fails.size > 0) {
      for (const [name, prop] of Object.entries(meta.item.component.props)) {
        if (fails.has(name) && !invalidKeyword.includes(name)) {
          const fn = new Function(
            ...Object.keys(arg),
            `// [${meta.item.name}] ${name}: ${meta.item.id} 
  return ${prop.valueBuilt || ""}
    `
          );
          meta.scope.def.props[name] = prop.value;
          meta.scope.val[name] = fn(...Object.values(arg));
          scope[name] = meta.scope.val[name];
          arg[name] = scope[name];
        }
      }
    }
  }
};
