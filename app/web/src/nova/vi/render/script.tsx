import { FC, ReactNode } from "react";
import { useGlobal, useLocal } from "web-utils";
import { IMeta } from "../../ed/logic/ed-global";
import { ViGlobal } from "./global";
import { ViChild } from "./render";
import { viEvalProps } from "./script/eval-prop";
import { viEvalScript } from "./script/eval-script";

export const ViScript: FC<{
  meta: IMeta;
  children: ReactNode;
  passprop?: any;
}> = ({ meta, children, passprop }) => {
  const vi = useGlobal(ViGlobal, "VI");
  const local = useLocal({});
  meta.render = local.render;

  if (meta.item.component?.id) {
    viEvalProps(vi, meta, passprop);
  }

  if (meta.item.adv?.js) {
    viEvalScript(vi, meta, passprop);
    if (meta.script) return meta.script.result;
  }

  return (
    <ViChild meta={meta} passprop={passprop}>
      {children}
    </ViChild>
  );
};
