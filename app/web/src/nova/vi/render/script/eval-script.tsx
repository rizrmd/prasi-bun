import { FC, ReactNode, Suspense, useEffect } from "react";
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
export const viEvalScript = (
  vi: {
    page: VG["page"];
    mode: VG["mode"];
    layout: VG["layout"];
    site: { db: any; api: any };
    meta: VG["meta"];
    visit?: VG["visit"];
    script?: { init_local_effect: any };
    on_nav_loaded?: VG["on_preload"];
  },
  meta: IMeta,
  is_layout: boolean,
  passprop: any
) => {
  const parts = viParts(vi, meta, is_layout, passprop);

  if (vi.visit) vi.visit(meta, parts);

  if (!meta.script) {
    meta.script = {
      scope: passprop,
      result: null,
      Local: createViLocal(vi, is_layout, meta),
      PassProp: createViPassProp(vi, is_layout, meta, passprop),
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
    Local: script.Local,
    db: vi.site.db,
    api: vi.site.api,
    PassProp: script?.PassProp,
    ErrorBox: ErrorBox,
    newElement: () => {},
    render: (jsx: ReactNode) => {
      script.result = <Suspense>{jsx}</Suspense>;
    },
    params,
    ...viScriptArg(vi),
    ...exports,
    ...passprop,
    _meta: vi.meta,
  };

  if (typeof passprop === "object") {
    for (const [k, v] of Object.entries(passprop)) {
      if (typeof v === "object" && v && (v as any)._jsx) {
        const jprop = v as unknown as {
          _jsx: true;
          fn: (arg: { passprop: any; meta: IMeta }) => ReactNode;
        };
        arg[k] = <JsxProp fn={jprop.fn} passprop={passprop} meta={meta} />;
      }
    }
  }

  if (!w.isEditor && meta.item.adv?.js) {
    extractNavigate(vi, meta.item.adv.js);
  }

  const js = meta.item.adv?.jsBuilt || "";
  const src = replaceWithObject(js, replacement) || "";
  const fn = new Function(
    ...Object.keys(arg),
    `// ${meta.item.name}: ${meta.item.id} 
${src}
  `
  );
  fn(...Object.values(arg));

  updatePropScope(vi, meta, passprop);
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
};

export const replaceWithObject = (tpl: string, data: any) => {
  let res = tpl;
  for (const [k, v] of Object.entries(data)) {
    res = res.replaceAll(k, v as string);
  }
  return res;
};
