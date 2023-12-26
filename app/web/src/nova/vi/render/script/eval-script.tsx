import { ReactNode, useEffect } from "react";
import { IMeta } from "../../../ed/logic/ed-global";
import { ErrorBox } from "../../utils/error-box";
import { VG } from "../global";
import { viParts } from "../parts";
import { viScriptArg } from "./arg";
import { updatePropScope } from "./eval-prop";
import { createViLocal } from "./local";
import { createViPassProp } from "./passprop";
import hash_sum from "hash-sum";

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

  const mhash = hash_sum(passprop);

  if (!meta.script) meta.script = {};
  if (!meta.script[mhash]) {
    meta.script[mhash] = {
      result: null,
      Local: createViLocal(
        vi.meta,
        meta,
        passprop,
        vi.script?.init_local_effect
      ),
      PassProp: createViPassProp(vi, meta, passprop),
    };
  }
  const script = meta.script[mhash];

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
      script.result = jsx;
    },
    ...viScriptArg(),
    ...exports,
    ...passprop,
  };

  const fn = new Function(
    ...Object.keys(arg),
    `// ${meta.item.name}: ${meta.item.id} 
${meta.item.adv?.jsBuilt || ""}
  `
  );
  fn(...Object.values(arg));

  updatePropScope(meta, passprop);
  return mhash;
};
