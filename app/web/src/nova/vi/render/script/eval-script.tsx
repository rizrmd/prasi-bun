import { FC, ReactNode, Suspense, useEffect } from "react";
import { useLocal } from "web-utils";
import { IMeta } from "../../../ed/logic/ed-global";
import { ErrorBox } from "../../utils/error-box";
import { VG } from "../global";
import { viParts } from "../parts";
import { viScriptArg } from "./arg";
import { updatePropScope } from "./eval-prop";
import { createViLocal } from "./local";
import { createViPassProp } from "./passprop";

export const viEvalScript = (
  vi: {
    site: { db: any; api: any };
    meta: VG["meta"];
    visit?: VG["visit"];
    script?: { init_local_effect: any };
  },
  meta: IMeta,
  passprop: any
) => {
  const parts = viParts(vi, meta, passprop);

  if (vi.visit) vi.visit(meta, parts);

  if (!meta.script) {
    meta.script = {
      passprop,
      result: null,
      Local: createViLocal(vi.meta, meta, vi.script?.init_local_effect),
      PassProp: createViPassProp(vi, meta),
    };
  } else {
    meta.script.passprop = passprop;
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
    ...viScriptArg(vi),
    ...exports,
    ...passprop,
  };

  if (typeof passprop === "object") {
    for (const [k, v] of Object.entries(passprop)) {
      if (typeof v === "object" && (v as any)._jsx) {
        const jprop = v as unknown as {
          _jsx: true;
          fn: (arg: { passprop: any; meta: IMeta }) => ReactNode;
        };
        arg[k] = <JsxProp fn={jprop.fn} passprop={passprop} meta={meta} />;
      }
    }
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

  updatePropScope(meta, passprop);
};

const JsxProp: FC<{
  fn: (arg: { passprop: any; meta: IMeta }) => ReactNode;
  meta: IMeta;
  passprop: any;
}> = ({ fn, meta, passprop }) => {
  const local = useLocal({ init: false, result: null as any });

  if (!local.init) {
    local.init = true;
    local.result = fn({ passprop, meta });
  }
  return local.result;
};

export const replacement = {
  "stroke-width": "strokeWidth",
  "fill-rule": "fillRule",
  "clip-rule": "clipRule",
};

export const replaceWithObject = (tpl: string, data: any) => {
  let res = tpl;
  for (const [k, v] of Object.entries(data)) {
    res = res.replaceAll(k, v as string);
  }
  return res;
};
