import {
  FC,
  ReactElement,
  ReactNode,
  Suspense,
  isValidElement,
  useEffect,
} from "react";
import { w } from "../../../../utils/types/general";
import { IMeta } from "../../../ed/logic/ed-global";
import { ErrorBox } from "../../utils/error-box";
import { VG } from "../global";
import { viParts } from "../parts";
import { viScriptArg } from "./arg";
import { updatePropScope } from "./eval-prop";
import { extractNavigate } from "./extract-nav";
import { createViLocal } from "./local";
import { createViPassProp } from "./passprop";
import { devItem } from "./item-dev";
import { prodItem } from "./item-prod";

export const viEvalScript = (
  vi: {
    page: VG["page"];
    mode: VG["mode"];
    layout: VG["layout"];
    site: { db: any; api: any };
    comp: VG["comp"];
    meta: VG["meta"];
    visit?: VG["visit"];
    script?: { init_local_effect: any };
    on_nav_loaded?: VG["on_preload"];
  },
  meta: IMeta,
  is_layout: boolean,
  passprop: any,
  depth: number,
  parent_key?: any
) => {
  const parts = viParts(vi, meta, is_layout, passprop, depth);

  if (vi.visit) vi.visit(meta, parts);
  if (!meta.script) {
    meta.script = {
      scope: passprop,
      result: null,
      Local: createViLocal(vi, is_layout, meta),
      PassProp: createViPassProp(vi, is_layout, meta, passprop, depth),
    };
  } else {
    meta.script.scope = passprop;
  }

  const script = meta.script;
  const exports = (window as any).exports;

  const arg = {
    useEffect,
    children: parts.props.children,
    props: parts.props,
    Local: script?.Local,
    db: vi.site.db,
    api: vi.site.api,
    PassProp: script?.PassProp,
    ErrorBox: ErrorBox,
    newElement: () => {},
    __props: passprop,
    _item: meta.mitem
      ? devItem(vi.meta, meta.mitem, vi.page.cur.id)
      : prodItem(vi.meta, meta.item, vi.page.cur.id),
    _meta: vi.meta,
    render: (jsx: ReactNode) => {
      let result = jsx;
      if (isValidElement(jsx) && jsx.props.children) {
        const override_children = (
          el: ReactElement<{ children: any }>
        ): {
          should_replace: boolean;
          el: ReactElement;
        } => {
          let should_replace = false;
          let new_childs = [];

          if (isValidElement(el)) {
            if (el.type === meta.script?.PassProp) {
              return {
                should_replace: true,
                el: {
                  ...el,
                  props: { ...el.props, internal_key: el.key },
                },
              };
            }

            if (el.props?.children) {
              if (!Array.isArray(el.props.children)) {
                el.props.children = [el.props.children];
              }
              if (Array.isArray(el.props.children)) {
                for (const child of el.props.children) {
                  if (Array.isArray(child)) {
                    const sub_child = [];
                    let sub_replace = false;
                    for (const c of child) {
                      let nc = override_children(c);
                      if (nc.should_replace) {
                        sub_child.push(nc.el);
                        sub_replace = true;
                      } else {
                        sub_child.push(c);
                      }
                    }
                    if (sub_replace) {
                      should_replace = true;
                      new_childs.push(sub_child);
                    } else {
                      new_childs.push(child);
                    }
                  } else if (typeof child === "object" && child) {
                    if (child.type === meta.script?.PassProp) {
                      should_replace = true;
                      new_childs.push({
                        ...child,
                        props: {
                          ...child.props,
                          internal_key: child.props.key,
                        },
                      });
                    }
                  } else {
                    new_childs.push(child);
                  }
                }
              }
            }
          }

          return {
            should_replace,
            el: { ...el, props: { ...el.props, children: new_childs } },
          };
        };
        const res = override_children(jsx as any);

        if (res.should_replace) {
          result = res.el;
        }
      }

      if (script) script.result = <Suspense>{result}</Suspense>;
    },
    params,
    ...viScriptArg(vi),
    ...exports,
    ...passprop,
  };

  if (typeof passprop === "object") {
    for (const [k, v] of Object.entries(passprop)) {
      if (typeof v === "object" && v && (v as any)._jsx) {
        const jprop = v as unknown as {
          _jsx: true;
          fn: (arg: { passprop: any; meta: IMeta }) => ReactNode;
        };
        arg[k] = (
          <JsxProp fn={jprop.fn} passprop={{ ...passprop }} meta={meta} />
        );
      }
    }
  }

  if (!w.isEditor && meta.item.adv?.js) {
    extractNavigate(vi, meta.item.adv.js);
  }

  const js = meta.item.adv?.jsBuilt || "";
  const src = replaceWithObject(js, replacement) || "";

  if (js.includes("parent_props")) {
    console.log(meta.item.name, arg);
  }

  const final_src = `\
// ${meta.item.name}: ${meta.item.id} 
try {
  ${src}
} catch (e) {
  console.error(\`\\
Error in item ${meta.item.name}: ${meta.item.id} 

$\{__js}

ERROR: $\{e.message}
\`)
}
  `;
  try {
    const fn = new Function(...Object.keys(arg), "__js", final_src);
    fn(...Object.values(arg), meta.item.adv?.js);
  } catch (e: any) {
    console.error(`\n
// Syntax Error in ${meta.item.name}: ${meta.item.id} 
// arg: ${Object.keys(arg).join(", ")}

${final_src}

${e.message}
`);
  }

  updatePropScope(vi, meta, passprop, parent_key);
};

const JsxProp: FC<{
  fn: (arg: { passprop: any; meta: IMeta }) => ReactNode;
  meta: IMeta;
  passprop: any;
}> = ({ fn, meta, passprop }) => {
  return fn({ passprop, meta });
};

export const replacement = {
  "stroke-width": "strokeWidth",
  "fill-rule": "fillRule",
  "clip-rule": "clipRule",
  "stroke-linejoin": "strokeLinejoin",
  "stroke-linecap": "strokeLinecap",
  "clip-path": "clipPath",
  "stroke-miterlimit": "strokeMiterlimit",
};

export const replaceWithObject = (tpl: string, data: any) => {
  let res = tpl;
  for (const [k, v] of Object.entries(data)) {
    res = res.replaceAll(k, v as string);
  }
  return res;
};
