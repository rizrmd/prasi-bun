import { ReactNode, useEffect, useState } from "react";
import { deepClone } from "web-utils";
import { EdMeta } from "../../../../ed/logic/ed-global";
import { VG } from "../../../logic/global";
import { modifyChildScopeIndex } from "./mod-scope-index";

const cachedLocal = {} as Record<string, Record<string, any>>;
const cachedPath = {} as Record<string, Record<string, any>>;
const cachedLayout = {} as Record<string, true>;
export const createLocal = (
  v: VG,
  id: string,
  existingScopeIndex?: Record<string, any>
) => {
  return ({
    name,
    idx: local_id,
    value,
    effect,
    children,
    hook,
    deps,
    cache,
  }: {
    name: string;
    value: any;
    idx?: string;
    effect?: (value: any) => void | Promise<void>;
    children: ReactNode;
    hook?: (value: any) => void;
    deps?: any[];
    cache?: boolean;
  }) => {
    const meta = v.meta[id] as EdMeta;
    const [_, set] = useState({});

    let scope = null as any;
    if (!local_id) {
      if (!meta.scope) {
        meta.scope = {};
      }
      scope = meta.scope;
    } else {
      if (!meta.indexed_scope) {
        meta.indexed_scope = {};
      }
      if (!meta.indexed_scope[local_id]) meta.indexed_scope[local_id] = {};
      scope = meta.indexed_scope[local_id];
    }

    const render = () => {
      if (!local_id) {
        if (meta.render) meta.render();
        else v.render();
      } else {
        set({});
      }
    };

    const genScope = () => {
      try {
        const nval = deepClone(value);

        if (!scope[name]) {
          scope[name] = {
            ...nval,
            render,
          };
        } else {
          for (const [k, v] of Object.entries(nval)) {
            scope[name][k] = v;
          }
          scope[name].render = render;
        }
      } catch (e) {
        console.warn(e);
      }
    };

    let page_id = v.current.page_id || "";
    const itemid = meta.item.id + (local_id ? `_${local_id}` : "");

    if (meta.is_layout) {
      page_id = "layout";
      if (cachedLayout[meta.item.id]) {
        scope[name] = cachedLocal[page_id][itemid];
        scope[name].render = render;
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
            cachedLocal[page_id][itemid] = scope[name];
          } else {
            scope[name] = cachedLocal[page_id][itemid];
            scope[name].render = render;
          }
        } else {
          scope[name] = cachedLocal[page_id][itemid];
          scope[name].render = render;
        }
      } else {
        genScope();
        cachedLocal[page_id][itemid] = scope[name];
        cachedPath[page_id][itemid] = location.href;
      }
    }

    if (typeof hook === "function") {
      try {
        hook(scope[name]);
      } catch (e) {
        console.warn(e);
      }
    }

    useEffect(() => {
      if (effect) {
        if (meta.is_layout) {
          if (cachedLayout[meta.item.id]) {
            return;
          }
          cachedLayout[meta.item.id] = true;
        }
        try {
          effect(scope[name]);
        } catch (e) {
          console.warn(e);
        }
      }
    }, [...(deps || []), location.href]);

    if (local_id) {
      const scopeIndex = { ...existingScopeIndex, [meta.item.id]: local_id };
      return modifyChildScopeIndex(children, scopeIndex);
    }

    return children;
  };
};
