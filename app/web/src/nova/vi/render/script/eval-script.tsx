import { ReactNode, useEffect } from "react";
import { IMeta } from "../../../ed/logic/ed-global";
import { ErrorBox } from "../../utils/error-box";
import { VG } from "../global";
import { viParts } from "../parts";
import { ViRender } from "../render";
import { viScriptArg } from "./arg";
import { updatePropScope } from "./eval-prop";
import { createViLocal } from "./local";
import { createViPassProp } from "./passprop";

export const viEvalScript = (
  vi: { meta: VG["meta"] },
  meta: IMeta,
  scope: any
) => {
  const childs = meta.item.childs;
  const parts = viParts(meta);

  let children = undefined;
  if (parts.shouldRenderChild) {
    children =
      Array.isArray(childs) &&
      childs.map(({ id }) => {
        return <ViRender key={id} meta={vi.meta[id]} />;
      });
  }

  if (!meta.script) {
    meta.script = {
      result: null,
      Local: createViLocal(meta, scope),
      PassProp: createViPassProp(vi, meta, scope),
    };
  }
  const script = meta.script;

  const exports = (window as any).exports;
  const arg = {
    useEffect,
    children,
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
    ...scope,
  };

  const fn = new Function(
    ...Object.keys(arg),
    `// ${meta.item.name}: ${meta.item.id} 
${meta.item.adv?.jsBuilt || ""}
  `
  );
  fn(...Object.values(arg));

  updatePropScope(meta, scope);
};
