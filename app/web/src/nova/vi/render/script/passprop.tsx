import { ReactNode, isValidElement } from "react";
import { IMeta } from "../../../ed/logic/ed-global";
import { VG } from "../global";
import { ViChild } from "../render";

export const createViPassProp = (
  vi: { meta: VG["meta"] },
  is_layout: boolean,
  meta: IMeta
) => {
  return (arg: Record<string, any> & { children: ReactNode }) => {
    if (!meta.item.script) {
      meta.item.script = {};
    }

    if (!meta.item.script.passprop) {
      meta.item.script.passprop = {};
    }

    if (meta.item.script.passprop) {
      let is_changed = false;
      for (const [k, v] of Object.entries(arg)) {
        if (!["children", "key"].includes(k)) {
          is_changed = true;
          meta.item.script.passprop[k] = { end: 0, start: 0, value: v };
        }
      }
    }

    if (
      !Array.isArray(arg.children) &&
      !isValidElement(arg.children) &&
      typeof arg.children === "object"
    ) {
      const child_id = (arg.children as any).id;
      if (child_id) {
        const meta = vi.meta[child_id];
        return <ViChild is_layout={is_layout} meta={meta} />;
      }
    } else if (Array.isArray(arg.children)) {
      let is_meta = true;
      for (const c of arg.children) {
        if (!(!isValidElement(c) && typeof c === "object")) {
          is_meta = false;
        }
      }
      return arg.children.map(({ id }) => {
        const meta = vi.meta[id];
        return <ViChild key={id} is_layout={is_layout} meta={meta} />;
      });
    }

    return modifyChild(arg, meta.script?.scope);
  };
};

export const modifyChild = (arg: any, passprop?: any) => {
  let prop: any = {};
  if (Array.isArray(arg)) {
    prop.children = arg;
  } else {
    prop = arg;
  }

  if (Array.isArray(prop.children)) {
    const childs = [];
    for (const child of prop.children) {
      childs.push(modify(child, prop, passprop));
    }
    return childs;
  }

  return modify(prop.children, prop, passprop);
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
