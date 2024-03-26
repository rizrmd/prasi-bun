import { createId } from "@paralleldrive/cuid2";
import { FMCompDef } from "../../../../utils/types/meta-fn";
import { IMeta } from "../../../ed/logic/ed-global";
import { VG } from "../global";
import { ViRender } from "../render";
import { viScriptArg } from "./arg";
import { replaceWithObject, replacement } from "./eval-script";
import { extractNavigate } from "./extract-nav";
import type { Doc } from "yjs";

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
      params,
    };

    meta.item.script.props = {};
    let fails = new Set<string>();
    if (!!meta.item.component.props) {
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

                  return (
                    <ViRender
                      meta={m}
                      passprop={arg.passprop}
                      is_layout={is_layout}
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
    const result = await _api.code_build(conf.src);

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
