import { FC, ReactNode } from "react";
import { useGlobal, useLocal } from "web-utils";
import { IMeta } from "../../ed/logic/ed-global";
import { ViGlobal } from "./global";
import { viEvalProps } from "./script/eval-prop";
import { viEvalScript } from "./script/eval-script";
import { getScopeMeta, getScopeValue } from "./script/scope-meta";
import { ViChild } from "./render";

export const ViScript: FC<{ meta: IMeta; children: ReactNode }> = ({
  meta,
  children,
}) => {
  const vi = useGlobal(ViGlobal, "VI");
  const local = useLocal({});
  meta.render = local.render;

  const scope_meta = getScopeMeta({ meta: vi.meta }, meta);
  const scope = getScopeValue(scope_meta);

  if (meta.item.component?.id) {
    viEvalProps(vi, meta, scope);
  }

  if (meta.item.adv?.js) {
    viEvalScript(vi, meta, scope);

    if (meta.script) return meta.script.result;
  }
  return <ViChild meta={meta}>{children}</ViChild>;
};
