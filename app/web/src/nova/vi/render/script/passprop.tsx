import { ReactNode, isValidElement } from "react";
import { IMeta } from "../../../ed/logic/ed-global";
import { VG } from "../global";

export const createViPassProp = (
  vi: { meta: VG["meta"] },
  meta: IMeta,
  passprop?: any
) => {
  return (arg: Record<string, any> & { children: ReactNode }) => {
    return modifyChild(arg, passprop);
  };
};

export const modifyChild = (arg: any, passprop?: any) => {
  for (const [k, v] of Object.entries(arg)) {
    if (k === "key" || k === "idx" || k === "continue") continue;
  }

  const childs = [];
  if (Array.isArray(arg.children)) {
    for (const child of arg.children) {
      childs.push(modify(child, arg, passprop));
    }
  } else {
    childs.push(modify(arg.children, arg, passprop));
  }
  return childs;
};

const modify = (el: ReactNode, arg: any, passprop?: any) => {
  if (isValidElement(el)) {
    const passarg = { ...arg };
    delete passarg.children;

    return {
      ...el,
      props: { ...el.props, passprop: { ...passprop, ...passarg } },
    };
  }
  return el;
};
