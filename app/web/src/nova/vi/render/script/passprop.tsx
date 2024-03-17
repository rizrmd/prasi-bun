import get from "lodash.get";
import { ReactNode, isValidElement } from "react";
import { IMeta } from "../../../ed/logic/ed-global";
import { VG } from "../global";
import { ViRender } from "../render";

export const createViPassProp = (
  vi: { meta: VG["meta"] },
  is_layout: boolean,
  meta: IMeta,
  passprop: any
) => {
  return (arg: Record<string, any> & { children: ReactNode }) => {
    if (!meta.item.script) {
      meta.item.script = {};
    }

    if (!meta.item.script.passprop) {
      meta.item.script.passprop = {};
    }

    const script_pass: any = {};
    if (meta.item.script.passprop) {
      let is_changed = false;
      for (const [k, v] of Object.entries(arg)) {
        if (!["children", "key"].includes(k)) {
          is_changed = true;
          script_pass[k] = v;
          meta.item.script.passprop[k] = { end: 0, start: 0, value: v };
        }
      }
    }

    const _pass = { ...passprop, ...script_pass };

    if (
      !Array.isArray(arg.children) &&
      isValidElement(arg.children) &&
      typeof arg.children === "object"
    ) {
      const children = get(
        arg.children,
        "props.meta.item.component.props.child.content.childs"
      ) as unknown as any[];

      if (Array.isArray(children)) {
        let is_meta = true;
        for (const c of children) {
          if (!(!isValidElement(c) && typeof c === "object")) {
            is_meta = false;
          }
        }
        if (is_meta) {
          return children.map((item) => {
            const cmeta = vi.meta[item.id];

            if (cmeta) {
              return (
                <ViRender
                  key={item.id}
                  is_layout={is_layout}
                  meta={cmeta}
                  passprop={_pass}
                />
              );
            }
            return null;
          });
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
        return <ViRender is_layout={is_layout} meta={meta} passprop={_pass} />;
      }
    }

    return modifyChild(arg, { ...meta.script?.scope, ...passprop });
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
