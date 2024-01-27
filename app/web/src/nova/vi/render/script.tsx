import { FC, ReactNode, useState } from "react";
import { useGlobal } from "web-utils";
import { IMeta } from "../../ed/logic/ed-global";
import { ViGlobal } from "./global";
import { ViChild } from "./render";
import { viEvalProps } from "./script/eval-prop";
import { viEvalScript } from "./script/eval-script";

export const ViScript: FC<{
  meta: IMeta;
  is_layout: boolean;
  passprop?: any;
}> = ({ meta, passprop, is_layout }) => {
  const vi = useGlobal(ViGlobal, "VI");
  const [_, _set] = useState({});
  meta.render = () => {
    _set({});
  };

  let _pass = passprop;
  if (meta.item.component?.id) {
    if (!_pass) _pass = {};
    viEvalProps(vi, meta, is_layout, _pass);
  }

  if (meta.item.adv?.js) {
    viEvalScript(vi, meta, is_layout, _pass);
    if (meta.script) return meta.script.result;
  }

  return <ViChild meta={meta} passprop={_pass} is_layout={is_layout}></ViChild>;
};
