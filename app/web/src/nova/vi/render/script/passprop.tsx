import { ReactNode, isValidElement } from "react";
import { IMeta } from "../../../ed/logic/ed-global";
import { VG } from "../global";

export const createViPassProp = (
  vi: { meta: VG["meta"] },
  meta: IMeta,
  scope: any
) => {
  return (arg: Record<string, any> & { children: ReactNode }) => {
    return modifyChild(arg);
  };
};

export const modifyChild = (arg: any) => {
  for (const [k, v] of Object.entries(arg)) {
    if (k === "key" || k === "idx" || k === "continue") continue;
  }

  const childs = [];
  if (Array.isArray(arg.children)) {
    for (const child of arg.children) {
      childs.push(modify(child, arg));
    }
  } else {
    childs.push(modify(arg.children, arg));
  }
  return childs;
};

const modify = (el: ReactNode, arg: any) => {
  if (isValidElement(el)) {
    const passprop = { ...arg };
    delete passprop.children;
    return { ...el, props: { ...el.props, passprop } };
  }
  return el;
};
