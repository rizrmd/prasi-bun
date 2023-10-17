import { FC, ReactNode, Suspense, useEffect } from "react";
import { deepClone } from "web-utils";
import { createAPI, createDB } from "../../../utils/script/init-api";
import { ErrorBox } from "../elements/e-error";
import { ItemMeta, PG } from "./global";

export const JS_DEBUG = false;

export const treeScopeEval = (
  p: PG,
  id: string,
  children: ReactNode,
  js: string,
  _scopeIndex?: Record<string, string>
) => {
  const meta = p.treeMeta[id];
  const className = meta.className;
  const elprop = meta.elprop;

  let item = meta.item;

  const adv = item.adv;
  let args = {};
  if (!meta.memoize) {
    meta.memoize = {
      Local: createLocal(p, id),
      PassProp: createPassProp(p, id),
    };
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

  if (JS_DEBUG) {
    const args = [
      (".".repeat(meta.depth || 0) + meta.item.name).padEnd(30, "_") +
        " " +
        meta.item.id,
    ].join(" ");

    if (meta.comp) {
      console.log("%c" + args, "color:red", finalScope);
    } else {
      console.log(args, finalScope);
    }
  }

  const output = { jsx: null as any };
  args = {
    ...w.exports,
    ...finalScope,
    ...meta.memoize,
    db: p.script.db,
    api: p.script.api,
    children,
    props: { ...elprop, className },
    newElement: (opt: any) => children,
    useEffect: useEffect,
    render: (jsx: ReactNode) => {
      output.jsx = (
        <ErrorBox meta={meta}>
          <Suspense
            fallback={
              <div className="flex flex-1 items-center justify-center w-full h-full relative">
                {p.ui.loading}
              </div>
            }
          >
            {/* <pre className={"text-[9px] font-mono text-black"}>
                  {item.id}-{item.name}
                </pre> */}
            {jsx}
          </Suspense>
        </ErrorBox>
      );
    },
  };

  try {
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
  } catch (e) {}

  return output.jsx;
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
        if (typeof finalScope[k] === "undefined") finalScope[k] = v;
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
  return (arg: Record<string, any> & { children: ReactNode }) => {
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

const createLocal = (p: PG, id: string) => {
  const Local = ({
    name,
    value,
    effect,
    children,
    hook,
    deps,
  }: {
    name: string;
    value: any;
    effect?: (value: any) => void | Promise<void>;
    children: ReactNode;
    hook?: (value: any) => void;
    deps?: any[];
  }) => {
    const meta = p.treeMeta[id];

    if (!meta.scope) {
      meta.scope = {};
    }

    const immediateExecute = meta.item.id === p.item.active && p.script.active;

    if (!meta.scope[name]) {
      try {
        meta.scope[name] = {
          ...deepClone(value),
          render: () => {
            if (!p.focused) {
              p.render();
            }
          },
        };
      } catch (e) {}
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
        if (immediateExecute) {
          if (!p.localReloading[p.item.active]) {
            p.localReloading[p.item.active] = true;
          } else {
            return;
          }
        }

        try {
          effect(meta.scope[name]);
        } catch (e) {}
      }
    }, []);
    return children;
  };

  return Local;
};
