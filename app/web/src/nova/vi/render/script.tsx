import { FC, ReactNode, useEffect } from "react";
import { useGlobal } from "web-utils";
import { IMeta } from "../../ed/logic/ed-global";
import { ErrorBox } from "../utils/error-box";
import { VG, ViGlobal } from "./global";
import { viParts } from "./parts";
import { ViRender } from "./render";
import { createViLocal } from "./script/local";
import { createViPassProp } from "./script/passprop";
import { getScopeMeta, getScopeValue } from "./script/scope-meta";
import { viEvalProps } from "./script/eval-prop";

export const ViScript: FC<{ meta: IMeta }> = ({ meta }) => {
  const vi = useGlobal(ViGlobal, "VI");

  const scope_meta = getScopeMeta(vi, meta);
  const scope = getScopeValue(scope_meta);

  if (meta.item.component?.id) {
    viEvalProps(vi, meta, scope);
  }

  viEvalScript(vi, meta, scope);

  if (meta.script) return meta.script.result;
  return null;
};

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
      Local: createViLocal(meta),
      PassProp: createViPassProp(meta),
    };
  }
  const script = meta.script;

  const exports = (window as any).exports;
  const arg = {
    useEffect,
    children,
    props: parts.props,
    isEditor: true,
    Local: script.Local,
    PassProp: script?.PassProp,
    ErrorBox: ErrorBox,
    newElement: () => {},
    render: (jsx: ReactNode) => {
      script.result = jsx;
    },
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
};
