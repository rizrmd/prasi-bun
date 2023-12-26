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

  let _pass = passprop;
  if (meta.item.component?.id) {
    if (!_pass) _pass = {};
    viEvalProps(vi, meta, _pass);
  }

  if (meta.item.adv?.js) {
    const mhash = viEvalScript(vi, meta, _pass);
    if (meta.script && meta.script[mhash]) return meta.script[mhash].result;
  }

  return (
    <ViChild meta={meta} passprop={_pass}>
      {children}
    </ViChild>
  );
};
