import { deepClone } from "web-utils";
import { createAPI, createDB } from "../../../../../utils/script/init-api";
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
) => {
  let props = {} as Record<string, FNCompDef>;
  let cprops = {} as [string, FNCompDef][];
  const item = meta.item;
  if (item.type === "item" && item.component?.id) {
    const icomp = item.component;
    if (icomp) {
      props = deepClone(v.component.map[icomp.id]?.item.component?.props || {});
      cprops = Object.entries(props);

      if (v.script.api_url) {
        if (!v.script.db) v.script.db = createDB(v.script.api_url);
        if (!v.script.api) v.script.api = createAPI(v.script.api_url);

        const props = icomp.props;

        const w = window as any;
        const finalScope = mergeScopeUpwards;
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
          }

          if (prop.meta?.type === "content-element") {
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
                      if (meta) {
                        if (!meta.parent_item)
                          meta.parent_item = { id: parent_id };
                        else meta.parent_item.id = parent_id;

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
      }
    }
  }
};