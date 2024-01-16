import { IMeta } from "../../../ed/logic/ed-global";
import { VG } from "../global";
import { ViRender } from "../render";
import { viScriptArg } from "./arg";
import { replaceWithObject, replacement } from "./eval-script";

export const viEvalProps = (
  vi: { meta: VG["meta"]; site: { db: any; api: any } },
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
      db: vi.site.db,
      api: vi.site.api,
      ...viScriptArg(vi),
      ...passprop,
    };

    meta.item.script.props = {};
    let fails = new Set<string>();
    if (!!meta.item.component.props) {
      for (const [name, prop] of Object.entries(meta.item.component.props)) {
        try {
          if (prop.meta?.type === "content-element") {
            let val = {
              _jsx: true,
              fn: (arg: { passprop: any; meta: IMeta }) => {
                const id = prop.content?.id;
                if (id) {
                  const m = vi.meta[id];

                  const instances = meta.instances;
                  if (!arg.meta.item.originalId || !instances) {
                    return null;
                  }

                  const instance = instances[meta.item.id];
                  if (!instance) return null;
                  const original_id = arg.meta.item.originalId;
                  if (
                    m.mitem &&
                    ((prop.jsxCalledBy &&
                      (!prop.jsxCalledBy.includes(original_id) ||
                        prop.jsxCalledBy.length !== 2)) ||
                      !prop.jsxCalledBy)
                  ) {
                    const mprop = meta.mitem
                      ?.get("component")
                      ?.get("props")
                      ?.get(name);
                    if (mprop) {
                      let mjby = mprop.get("jsxCalledBy");
                      if (!mjby || typeof mjby !== "object") {
                        mprop.set("jsxCalledBy", [meta.item.id, original_id]);
                      } else {
                        if (
                          !mjby.includes(original_id) ||
                          mjby.length !== 2 ||
                          mjby[0] !== meta.item.id ||
                          mjby[1] !== original_id
                        ) {
                          mprop.set("jsxCalledBy", [meta.item.id, original_id]);
                        }
                      }
                    }
                  }
                  return <ViRender meta={m} passprop={arg.passprop} />;
                }
                return null;
              },
            };

            arg[name] = val;

            if (passprop) {
              passprop[name] = val;
            }
            continue;
          }

          const js = prop.valueBuilt || "";
          const src = replaceWithObject(js, replacement) || "";
          const fn = new Function(
            ...Object.keys(arg),
            `// [${meta.item.name}] ${name}: ${meta.item.id} 
  return ${src}
    `
          );

          meta.item.script.props[name] = { value: src };
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

export const updatePropScope = (
  vi: { site: { db: any; api: any } },
  meta: IMeta,
  scope: any
) => {
  if (meta.item.script?.props) {
    const scopes = { ...scope, api: vi.site.api, db: vi.site.db };
    for (const [name, prop] of Object.entries(meta.item.script.props)) {
      if (prop.fn) {
        const fn = new Function(
          ...Object.keys(scopes),
          `// [${meta.item.name}] ${name}: ${meta.item.id} 
  return ${prop.value || ""}
    `
        );
        prop.fn = fn(...Object.values(scopes));
      }
    }
  }
};
