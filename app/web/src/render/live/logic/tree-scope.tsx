import { FC, ReactNode, Suspense, useEffect } from "react";
import { deepClone } from "web-utils";
import { createAPI, createDB } from "../../../utils/script/init-api";
import { ErrorBox } from "../../editor/elements/e-error";
import { ItemMeta, PG } from "./global";
import { extractNavigate, preload } from "./route";

export const JS_DEBUG = false;

export const treeScopeEval = (
  p: PG,
  id: string,
  children: ReactNode,
  js: string,
  _scopeIndex?: Record<string, any>
) => {
  const meta = p.treeMeta[id];
  const className = meta.className;

  let item = meta.item;

  const adv = item.adv;
  let args = {};
  try {
    if (!meta.memoize) {
      meta.memoize = {
        Local: createLocal(p, id),
        PassProp: createPassProp(p, id, _scopeIndex),
      };
    }

    if (typeof adv?.js === "string") {
      const navs = extractNavigate(adv.js || "");
      if (navs.length > 0) {
        navs.map((nav) => preload(p, nav));
      }
    }

    // prepare args
    if (p.site.api_url) {
      if (!p.script.db) p.script.db = createDB(p.site.api_url);
      if (!p.script.api) p.script.api = createAPI(p.site.api_url);
    }
    const w = window as any;

    const finalScope = mergeScopeUpwards(p, id, { _scopeIndex });

    for (const [k, v] of Object.entries(finalScope)) {
      if (v && typeof v === "object") {
        const t: {
          _jsx: true;
          Comp: FC<{ parent_id: string; _scopeIndex?: Record<string, any> }>;
        } = v as any;
        if (t._jsx && t.Comp) {
          finalScope[k] = (
            <t.Comp parent_id={meta.item.id} _scopeIndex={_scopeIndex} />
          );
        }
      }
    }

    if (
      meta.item.name === "label" &&
      p.treeMeta[meta.parent_id].item.name === "tree_lv_2" &&
      !finalScope.lv2_item
    ) {
      const parent = p.treeMeta[meta.parent_id];
      console.log("final_scope", meta, p.treeMeta[parent.parent_id]);
    }

    const output = { jsx: null as any };
    args = {
      ...w.exports,
      ...finalScope,
      ...meta.memoize,
      db: p.script.db,
      api: p.script.api,
      children,
      props: { className },
      useEffect: useEffect,
      render: (jsx: ReactNode) => {
        output.jsx = (
          <ErrorBox>
            <Suspense>{jsx}</Suspense>
          </ErrorBox>
        );
      },
    };

    // execute
    const fn = new Function(...Object.keys(args), js);
    const res = fn(...Object.values(args));
    if (res instanceof Promise) {
      res.catch((e: any) => {
        console.warn(e);
        console.warn(
          (
            `ERROR in ${item.type} [${item.name}]:\n ` +
            ((adv?.js || "") as any)
          ).trim()
        );
        console.warn(`Available var:`, args, `\n\n`);
      });
    }
    return output.jsx;
  } catch (e) {
    console.warn(e);
    console.warn(
      (
        `ERROR in ${item.type} [${item.name}]:\n ` + ((adv?.js || "") as any)
      ).trim()
    );
    console.warn(`Available var:`, args, `\n\n`);
  }
};

export const mergeScopeUpwards = (
  p: PG,
  id: string,
  opt?: {
    _scopeIndex?: Record<string, any>;
    debug?: boolean;
    each?: (meta: ItemMeta, values: Record<string, any>) => boolean;
  }
) => {
  const meta = p.treeMeta[id];

  if (!meta.scope) {
    meta.scope = {};
  }

  let cur = meta;

  const finalScope: any = {};

  while (cur) {
    let scope = null;

    let indexedScope = null;
    if (cur.indexedScope && opt?._scopeIndex) {
      const idx = opt._scopeIndex[cur.item.id];
      if (typeof idx !== "undefined" && cur.indexedScope[idx]) {
        indexedScope = cur.indexedScope[idx];
      }
    }

    if (indexedScope || cur.scope || cur.comp?.propval) {
      scope = { ...cur.scope, ...indexedScope, ...cur.comp?.propval };

      for (const [k, v] of Object.entries(scope)) {
        finalScope[k] = v;
      }
      if (opt?.each) {
        if (!opt.each(cur, scope)) {
          break;
        }
      }
    }

    cur = p.treeMeta[cur.parent_id];
  }

  return finalScope;
};

const modifyChildIndex = (
  child: ReactNode | ReactNode[],
  _scopeIndex: Record<string, any>
) => {
  if (Array.isArray(child)) {
    const childs: any[] = [];
    for (const c of child) {
      childs.push(modifyChildIndex(c, _scopeIndex));
    }
    return childs;
  }
  if (typeof child === "object" && child) {
    return { ...child, props: { ...(child as any).props, _scopeIndex } };
  }
  return child;
};

const createPassProp = (
  p: PG,
  id: string,
  _existingScopeIndex?: Record<string, any>
) => {
  return function (
    arg: Record<string, any> & { children: ReactNode; idx?: any }
  ) {
    const meta = p.treeMeta[id];

    if (typeof arg.idx !== "undefined" && meta && meta.item && meta.item.id) {
      meta.indexedScope[arg.idx] = {};

      for (const [k, v] of Object.entries(arg)) {
        if (k === "children") continue;
        meta.indexedScope[arg.idx][k] = v;
      }

      const scopeIndex = { ..._existingScopeIndex, [meta.item.id]: arg.idx };

      return modifyChildIndex(arg.children, scopeIndex);
    }

    if (!meta.scope) {
      meta.scope = {};
    }
    for (const [k, v] of Object.entries(arg)) {
      if (k === "children") continue;
      meta.scope[k] = v;
    }
    return arg.children;
  };
};

const cachedLocal = {} as Record<string, Record<string, any>>;
const cachedPath = {} as Record<string, Record<string, any>>;
const cachedLayout = {} as Record<string, true>;
const createLocal = (p: PG, id: string) => {
  const Local = ({
    name,
    value,
    effect,
    children,
    hook,
    deps,
    cache,
  }: {
    name: string;
    value: any;
    effect?: (value: any) => void | Promise<void>;
    children: ReactNode;
    hook?: (value: any) => void;
    deps?: any[];
    cache?: boolean;
  }) => {
    const meta = p.treeMeta[id];

    if (!meta.scope) {
      meta.scope = {};
    }
    const genScope = () => {
      try {
        const nval = deepClone(value);
        const render = () => {
          if (meta.render) meta.render();
          else p.render();
        };
        if (!meta.scope[name]) {
          meta.scope[name] = {
            ...nval,
            render,
          };
        } else {
          for (const [k, v] of Object.entries(nval)) {
            meta.scope[name][k] = v;
          }
          meta.scope[name].render = render;
        }
      } catch (e) {
        console.warn(e);
      }
    };

    let page_id = p.page?.id || "";
    const itemid = meta.item.id;

    if (meta.isLayout) {
      page_id = "layout";
      if (cachedLayout[meta.item.id]) {
        meta.scope[name] = cachedLocal[page_id][itemid];
        meta.scope[name].render = () => {
          if (meta.render) meta.render();
          else p.render();
        };
      }
    }

    if (
      page_id !== "layout" ||
      (page_id === "layout" && !cachedLayout[meta.item.id])
    ) {
      if (!cachedLocal[page_id]) {
        cachedLocal[page_id] = {};
      }
      if (!cachedPath[page_id]) {
        cachedPath[page_id] = {};
      }
      if (cachedLocal[page_id][itemid]) {
        if (cache === false) {
          if (cachedPath[page_id][itemid] !== location.href) {
            cachedPath[page_id][itemid] = location.href;
            genScope();
            cachedLocal[page_id][itemid] = meta.scope[name];
          } else {
            meta.scope[name] = cachedLocal[page_id][itemid];
            meta.scope[name].render = () => {
              if (meta.render) meta.render();
              else p.render();
            };
          }
        } else {
          meta.scope[name] = cachedLocal[page_id][itemid];
          meta.scope[name].render = () => {
            if (meta.render) meta.render();
            else p.render();
          };
        }
      } else {
        genScope();
        cachedLocal[page_id][itemid] = meta.scope[name];
        cachedPath[page_id][itemid] = location.href;
      }
    }

    if (typeof hook === "function") {
      try {
        hook(meta.scope[name]);
      } catch (e) {
        console.warn(e);
      }
    }

    useEffect(() => {
      if (effect) {
        if (meta.isLayout) {
          if (cachedLayout[meta.item.id]) {
            return;
          }
          cachedLayout[meta.item.id] = true;
        }
        try {
          effect(meta.scope[name]);
        } catch (e) {
          console.warn(e);
        }
      }
    }, [...(deps || []), location.href]);

    return children;
  };

  return Local;
};
