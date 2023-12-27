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

  let prop: any = {};
  if (Array.isArray(arg)) {
    prop.children = arg;
  } else {
    prop = arg;
  }

  const childs = [];
  if (Array.isArray(prop.children)) {
    for (const child of prop.children) {
      childs.push(modify(child, prop, passprop));
    }
  } else {
    childs.push(modify(prop.children, prop, passprop));
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
