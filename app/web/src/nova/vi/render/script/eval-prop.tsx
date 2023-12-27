import { IMeta } from "../../../ed/logic/ed-global";
import { VG } from "../global";
import { viScriptArg } from "./arg";

export const viEvalProps = (
  vi: { meta: VG["meta"] },
  meta: IMeta,
  passprop: any
) => {
  if (meta.item.component?.id) {
    if (!meta.item.script) {
      meta.item.script = {};
    }

    const exports = (window as any).exports;
    const arg = {
      ...exports,
      ...viScriptArg(),
      ...passprop,
    };

    meta.item.script.props = {};
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

          meta.item.script.props[name] = { value: prop.valueBuilt };
          let val = fn(...Object.values(arg));

          if (typeof val === "function") {
            meta.item.script.props[name].fn = val;
            val = (...args: any[]) => {
              return meta.item.script?.props?.[name].fn(...args);
            };
          }

          arg[name] = val;

          if (passprop) {
            passprop[name] = val;
          }
        } catch (e) {
          fails.add(name);
        }
      }
    }
  }
};

export const updatePropScope = (meta: IMeta, scope: any) => {
  if (meta.item.script?.props) {
    for (const [name, prop] of Object.entries(meta.item.script.props)) {
      if (prop.fn) {
        const all_scope = scope;
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
