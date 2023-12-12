import { FC, ReactNode } from "react";
import { useGlobal } from "web-utils";
import { IMeta } from "../../ed/logic/ed-global";
import { ErrorBox } from "../utils/error-box";
import { VG, ViGlobal } from "./global";
import { viParts } from "./parts";
import { ViRender } from "./render";
import { createViLocal } from "./script/local";
import { createViPassProp } from "./script/passprop";
import { getScope } from "./script/scope-meta";

export const ViScript: FC<{ meta: IMeta }> = ({ meta }) => {
  const vi = useGlobal(ViGlobal, "VI");

  viEvalScript(vi, meta);

  if (meta.script) return meta.script.result;
  return null;
};

export const viEvalScript = (vi: VG, meta: IMeta) => {
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

  const scope = getScope(vi, meta);
  if (!meta.script) {
    meta.script = {
      result: null,
      Local: createViLocal(meta),
      PassProp: createViPassProp(meta),
    };
  }
  const script = meta.script;

  const arg = {
    ...scope,
    children,
    props: parts.props,
    Local: script.Local,
    PassProp: script?.PassProp,
    ErrorBox: ErrorBox,
    newElement: () => {},
    render: (jsx: ReactNode) => {
      script.result = jsx;
    },
  };

  const fn = new Function(
    ...Object.keys(arg),
    `// [${meta.item.type}] ${meta.item.name}: ${meta.item.id} 
${meta.item.adv?.jsBuilt || ""}
  `
  );
  fn(...Object.values(arg));
};
