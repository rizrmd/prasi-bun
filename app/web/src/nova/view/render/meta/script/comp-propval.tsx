import { createAPI, createDB } from "../../../../../utils/script/init-api";
import { IItem } from "../../../../../utils/types/item";
import { FNCompDef } from "../../../../../utils/types/meta-fn";
import { EdMeta } from "../../../../ed/logic/ed-global";
import { VG } from "../../../logic/global";
import { extractNavigate, preload } from "../../../logic/router";
import { ViewMeta } from "../meta";
import { mergeScopeUpwards } from "./merge-upward";

const jsxProps = {} as Record<string, any>;
export const compPropVal = (
  v: VG,
  meta: EdMeta,
  scopeIndex?: Record<string, any>
) => {
  let props = {} as Record<string, FNCompDef>;
  let cprops = [] as [string, FNCompDef][];
  const item = meta.item;
  if (item.type === "item" && item.component?.id) {
    const icomp = item.component;
    if (icomp) {
      props = icomp.props;
      cprops = Object.entries({ ...icomp.props });

      if (!v.script.db) v.script.db = createDB(v.script.api_url);
      if (!v.script.api) v.script.api = createAPI(v.script.api_url);

      const w = window as any;
      const finalScope = mergeScopeUpwards(v, item.id, scopeIndex);
      const args = {
        ...w.exports,
        ...finalScope,
        db: v.script.db,
        api: v.script.api,
      };

      const result: any = {};
      for (const [name, _prop] of cprops) {
        const prop = props[name] || _prop;

        let value: any = null;

        if (prop.valueBuilt) {
          const fn = new Function(
            ...Object.keys(args),
            `return ${prop.valueBuilt}`
          );

          try {
            value = fn(...Object.values(args)) || null;

            const navs = extractNavigate(prop.valueBuilt || "");
            if (navs.length > 0) {
              navs.map((nav) => preload(v, nav));
            }
          } catch (e) {
            const cname = meta.item.name;
            console.warn(e);
            console.warn(
              `ERROR in Component [${cname}], in prop [${name}]:\n ` +
                prop.value
            );
          }
        } else if (prop.meta?.type === "content-element") {
          if (!(typeof value === "object" && !!value && value._jsx)) {
            const id = `${meta.item.id}-${name}`;
            if (!jsxProps[id]) {
              jsxProps[id] = {
                _jsx: true,
                Comp: ({
                  parent_id,
                  scopeIndex,
                }: {
                  parent_id: string;
                  scopeIndex?: Record<string, any>;
                }) => {
                  if (prop.content) {
                    const meta = v.meta[prop.content.id] as EdMeta;
                    let parent = v.meta[parent_id];

                    if (meta && parent) {
                      if (v.scope) {
                        while (parent) {
                          if (v.scope[parent.item.id]) {
                            v.scope[prop.content.id] = v.scope[parent.item.id];
                          }
                          parent = v.meta[parent.parent_item.id];
                        }
                      }

                      return (
                        <ViewMeta
                          id={prop.content.id}
                          scopeIndex={scopeIndex}
                        />
                      );
                    }
                  }
                  return <></>;
                },
              };
            }
            value = jsxProps[id];
          }
        }

        result[name] = value;
      }
      meta.propval = result;

      const propvis: any = {};
      for (const [name, _prop] of cprops) {
        const prop = props[name] || _prop;
        if (prop.visible) {
          const finalArgs = { ...args, ...result };
          try {
            const fn = new Function(
              ...Object.keys(finalArgs),
              `return ${_prop.visible}`
            );
            propvis[name] = fn(...Object.values(finalArgs));
          } catch (e) {
            const cname = meta.item.name;
            console.warn(e);
            console.warn(
              `ERROR in Component [${cname}], in prop [${name}]:\n ` +
                prop.visible
            );
          }
        }
      }
      meta.propvis = propvis;
    }
  }
};
