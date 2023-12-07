import hash_sum from "hash-sum";
import { FC, ReactNode, useEffect } from "react";
import { useLocal } from "web-utils";
import { produceCSS } from "../../../../utils/css/gen";
import { createAPI, createDB } from "../../../../utils/script/init-api";
import { IItem } from "../../../../utils/types/item";
import { ISection } from "../../../../utils/types/section";
import { IText } from "../../../../utils/types/text";
import { VG } from "../../logic/global";
import { extractNavigate, preload } from "../../logic/router";
import { ViewMetaChildren } from "./children";
import { createLocal } from "./script/create-local";
import { createPassProp } from "./script/create-pass-prop";
import { ErrorBox } from "./script/error-box";
import { mergeScopeUpwards } from "./script/merge-upward";

const renderLimitConfig = {
  maxCount: 30,
  maxTime: 10,
};
const renderLimit = {} as Record<
  string,
  Record<string, { ts: number; count: number; cache: ReactNode }>
>;

export const ViewBoundedScript: FC<{
  v: VG;
  item: IItem | IText | ISection;
  scopeIndex?: Record<string, any>;
  js: string;
}> = ({ item, v, scopeIndex, js }) => {
  const local = useLocal({ js: "" });

  useEffect(() => {
    if (local.js !== js) {
      local.js = js;
      local.render();
    }
  }, [js]);

  if (local.js !== js) {
    return null;
  }

  return (
    <ErrorBox silent={true}>
      <ViewMetaScript v={v} item={item} scopeIndex={scopeIndex} />
    </ErrorBox>
  );
};

export const ViewMetaScript: FC<{
  v: VG;
  item: IItem | IText | ISection;
  scopeIndex?: Record<string, any>;
}> = ({ item, v, scopeIndex }) => {
  const js = item.adv?.jsBuilt;
  const meta = v.meta[item.id];
  const w = window as any;
  const className = produceCSS(item, {
    mode: v.mode,
    hover: v.view.hover ? v.view.hover.get(meta) : undefined,
    active: v.view.active ? v.view.active.get(meta) : undefined,
  });

  if (!renderLimit[v.current.page_id]) {
    renderLimit[v.current.page_id] = {};
  }

  if (!renderLimit[v.current.page_id][item.id]) {
    renderLimit[v.current.page_id][item.id] = {
      ts: Date.now(),
      count: 1,
      cache: null,
    };
  }

  if (
    Math.abs(renderLimit[v.current.page_id][item.id].ts - Date.now()) <
    renderLimitConfig.maxTime
  ) {
    renderLimit[v.current.page_id][item.id].count++;

    if (
      renderLimit[v.current.page_id][item.id].count > renderLimitConfig.maxCount
    ) {
      let js = "";
      if (typeof item.adv?.js === "string") {
        js = item.adv.js;
      }
      console.warn(
        `Maximum render limit (${renderLimitConfig.maxCount} render in ${
          renderLimitConfig.maxTime
        }ms) reached in item [${item.name}]:\n${
          js.length > 30 ? js.substring(0, 30) + "..." : js
        }`
      );
      return renderLimit[v.current.page_id][item.id].cache;
    }
  } else {
    renderLimit[v.current.page_id][item.id].ts = Date.now();
    renderLimit[v.current.page_id][item.id].count = 1;
  }

  const children = <ViewMetaChildren key={item.id} meta={meta} />;
  let args = {};

  if (js && meta) {
    if (!meta.memoize) {
      meta.memoize = {};
    }
    const memoizeKey = hash_sum(scopeIndex) || "default";
    if (!meta.memoize[memoizeKey]) {
      meta.memoize[memoizeKey] = {
        Local: createLocal(v, item.id, scopeIndex),
        PassProp: createPassProp(v, item.id, scopeIndex),
      };
    }

    const _js = item.adv?.js;
    if (typeof _js === "string") {
      const navs = extractNavigate(_js || "");
      if (navs.length > 0) {
        navs.map((nav) => preload(v, nav));
      }
    }

    if (v.script.api_url) {
      if (!v.script.db) v.script.db = createDB(v.script.api_url);
      if (!v.script.api) v.script.api = createAPI(v.script.api_url);
    }

    const finalScope = mergeScopeUpwards(v, item.id, scopeIndex);
    for (const [k, v] of Object.entries(finalScope)) {
      if (v && typeof v === "object") {
        const t: {
          _jsx: true;
          Comp: FC<{ parent_id: string; scopeIndex?: Record<string, any> }>;
        } = v as any;
        if (t._jsx && t.Comp) {
          finalScope[k] = (
            <>
              <t.Comp parent_id={meta.item.id} scopeIndex={scopeIndex} />
            </>
          );
        }
      }
    }
    const output = { jsx: null as any };

    args = {
      ...w.exports,
      ...finalScope,
      ...meta.memoize[memoizeKey],
      db: v.script.db,
      api: v.script.api,
      children,
      props: {
        className,
        onPointerOver: (e: any) => {
          e.stopPropagation();
          e.preventDefault();
          v.view.hover?.set(meta);
        },
        onPointerDown: (e: any) => {
          e.stopPropagation();
          e.preventDefault();
          v.view.active?.set(meta);
        },
      },
      useEffect: useEffect,
      render: (jsx: ReactNode) => {
        output.jsx = jsx;
        renderLimit[v.current.page_id][item.id].cache = output.jsx;
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
            ((item.adv?.js || "") as any)
          ).trim()
        );
        console.warn(`Available var:`, args, `\n\n`);
      });
    }
    return output.jsx;
  }
};
