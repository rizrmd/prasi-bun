import { createId } from "@paralleldrive/cuid2";
import type { Doc } from "yjs";
import { FMCompDef } from "../../../../utils/types/meta-fn";
import { IMeta, active } from "../../../ed/logic/ed-global";
import { VG } from "../global";
import { ViRender } from "../render";
import { viScriptArg } from "./arg";
import { codeBuild } from "./code-build";
import { replaceWithObject, replacement } from "./eval-script";
import { extractNavigate } from "./extract-nav";

export const w = window as any;

export const viEvalProps = (
  vi: {
    layout: VG["layout"];
    mode: VG["mode"];
    meta: VG["meta"];
    site: { db: any; api: any };
    page: VG["page"];
    on_nav_loaded?: VG["on_preload"];
  },
  meta: IMeta,
  is_layout: boolean,
  passprop: any,
  depth: number,
  parent_key?: any
) => {
  if (meta.item.component?.id) {
    let script = meta.item.script;

    if (parent_key) {
      if (!meta.item.script_keyed) meta.item.script_keyed = {};
      if (!meta.item.script_keyed[parent_key])
        meta.item.script_keyed[parent_key] = {};
      script = meta.item.script_keyed[parent_key];
    } else {
      if (!meta.item.script) {
        meta.item.script = {};
      }
      script = meta.item.script;
    }

    if (!script) return;

    const exports = (window as any).exports;
    const arg = {
      ...exports,
      db: vi.site.db,
      api: vi.site.api,
      ...viScriptArg(vi),
      ...passprop,
      params,
    };

    script.props = {};
    let fails = new Set<string>();
    if (!!meta.item.component.props) {
      const _props: any = {};
      for (const [name, prop] of Object.entries(meta.item.component.props)) {
        try {
          if (prop.meta?.type === "content-element") {
            let val = {
              _jsx: true,
              fn: (arg: { passprop: any; meta: IMeta; prop_name: string }) => {
                const id = prop.content?.id;
                if (id) {
                  const m = is_layout ? vi.layout?.meta[id] : vi.meta[id];

                  if (!m) return null;

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
                          Array.isArray(mjby) &&
                          (!mjby.includes(original_id) ||
                            mjby.length !== 2 ||
                            mjby[0] !== meta.item.id ||
                            mjby[1] !== original_id)
                        ) {
                          mprop.set("jsxCalledBy", [meta.item.id, original_id]);
                        }
                      }
                    }
                  }

                  return (
                    <ViRender
                      meta={m}
                      passprop={arg.passprop}
                      is_layout={is_layout}
                      depth={depth + 1}
                    />
                  );
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

          if (prop.value) {
            extractNavigate(vi, prop.value);
          }

          if (!prop.valueBuilt && prop.value && meta.mitem) {
            const mprop = meta.mitem?.get("component")?.get("props")?.get(name);
            if (mprop) {
              updatePropValueBuilt(mprop, prop.value);
              return;
            }
          }

          let js = prop.valueBuilt || "";

          if (js.startsWith(`const _jsxFileName = "";`)) {
            js = `(() => { ${js.replace(
              `const _jsxFileName = "";`,
              `const _jsxFileName = ""; return `
            )} })()`;
          }

          const src = replaceWithObject(js, replacement) || "";

          const fn = new Function(
            ...Object.keys(arg),
            `// [${meta.item.name}] ${name}: ${meta.item.id} 
  return ${src}
    `
          );

          script.props[name] = { value: src, valueBuilt: src };
          let val = fn(...Object.values(arg));

          if (typeof val === "function") {
            val = (...args: any[]) => {
              const definer = new Function(
                ...Object.keys(arg),
                `// [${meta.item.name}] ${name}: ${meta.item.id} 
return ${src.trim()}
`
              );

              const fn = definer(...Object.values(arg));
              return fn(...args);
            };
          }

          arg[name] = val;
          _props[name] = val;

          if (passprop) {
            passprop[name] = val;
          }
        } catch (e) {
          fails.add(name);
        }
      }

      if (location.pathname.startsWith("/ed/") && active.item_id) {
        if (meta.item.id === active.item_id) {
          active.scope = {};
          for (const [k, v] of Object.entries(passprop)) {
            active.scope[k] = v;
          }

          active.scope.self_props = _props;
        }
      }
    }
  }
};

const conf = {
  timeout: null as any,
  set: new WeakSet<FMCompDef>(),
  map: {} as Record<string, { mprop: FMCompDef }>,
  src: {} as Record<string, string>,
};
const updatePropValueBuilt = (mprop: FMCompDef, src: string) => {
  if (!conf.set.has(mprop)) {
    conf.set.add(mprop);
    const id = createId();
    conf.map[id] = { mprop };
    conf.src[id] = src;
  }
  clearTimeout(conf.timeout);
  conf.timeout = setTimeout(async () => {
    const result = await codeBuild(conf.src);

    let doc = null as unknown as Doc;
    for (const [k, v] of Object.entries(result)) {
      const mprop = conf.map[k].mprop;
      if (!doc && mprop.doc) {
        doc = mprop.doc;
        break;
      }
    }
    if (doc) {
      doc.transact(() => {
        for (const [k, v] of Object.entries(result)) {
          const mprop = conf.map[k].mprop;
          mprop.set("valueBuilt", v);
        }
      });

      conf.set = new WeakSet();
      conf.map = {};
      conf.src = {};
    }
  }, 300);
};

export const updatePropScope = (
  vi: { site: { db: any; api: any } },
  meta: IMeta,
  scope: any,
  parent_key?: any
) => {
  const script = parent_key
    ? meta.item.script_keyed?.[parent_key]
    : meta.item.script;

  if (!script) return;

  if (script.props) {
    const scopes = { ...scope, api: vi.site.api, db: vi.site.db };
    for (const [name, prop] of Object.entries(script.props)) {
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
