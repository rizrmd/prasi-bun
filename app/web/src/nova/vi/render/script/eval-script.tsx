import { FC, ReactNode, Suspense, lazy, useEffect } from "react";
import { IMeta } from "../../../ed/logic/ed-global";
import { ErrorBox } from "../../utils/error-box";
import { VG } from "../global";
import { viParts } from "../parts";
import { viScriptArg } from "./arg";
import { updatePropScope } from "./eval-prop";
import { createViLocal } from "./local";
import { createViPassProp } from "./passprop";
import hash_sum from "hash-sum";
import { flatten } from "safe-flat";
import { useLocal } from "web-utils";

export const viEvalScript = (
  vi: {
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
    PassProp: script?.PassProp,
    ErrorBox: ErrorBox,
    newElement: () => {},
    render: (jsx: ReactNode) => {
      script.result = <Suspense>{jsx}</Suspense>;
    },
    ...viScriptArg(),
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

  const fn = new Function(
    ...Object.keys(arg),
    `// ${meta.item.name}: ${meta.item.id} 
${meta.item.adv?.jsBuilt || ""}
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
