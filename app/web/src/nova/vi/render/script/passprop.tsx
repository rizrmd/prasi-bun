import get from "lodash.get";
import { ReactNode, isValidElement, useState } from "react";
import { IMeta } from "../../../ed/logic/ed-global";
import { VG } from "../global";
import { ViRender } from "../render";

export const createViPassProp = (
  vi: { meta: VG["meta"]; render?: () => void; comp: VG["comp"] },
  is_layout: boolean,
  meta: IMeta,
  passprop: any,
  depth: number
) => {
  return (
    arg: Record<string, any> & { children: ReactNode; internal_key: any }
  ) => {
    const [_, render] = useState({});
    const internal_key = arg.idx || arg.internal_key;

    if (!meta.item.script) {
      meta.item.script = {};
    }

    let script = meta.item.script;
    if (typeof internal_key !== "undefined") {
      if (!meta.item.script_keyed) {
        meta.item.script_keyed = {};
      }

      if (!meta.item.script_keyed[internal_key]) {
        meta.item.script_keyed[internal_key] = {};
      }
      script = meta.item.script_keyed[internal_key] as any;
    }

    if (!script.passprop) {
      script.passprop = {};
    }

    const filtered_args: any = {};
    let is_changed = false;
    for (const [k, v] of Object.entries(arg)) {
      if (!["children", "key"].includes(k)) {
        is_changed = true;
        filtered_args[k] = v;
      }
    }

    let _pass = { ...passprop, ...filtered_args };

    if (typeof internal_key !== "undefined") {
      if (typeof script.passprop.internal_key === "undefined") {
        script.passprop = _pass;
      } else if (internal_key === script.passprop.internal_key) {
        script.passprop = _pass;
      }

      _pass = script.passprop;
    }

    meta.editor_props = _pass;

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
            let cmeta = vi.meta[item.id];

            if (!cmeta) {
              vi.meta[item.id] = { item };
              cmeta = vi.meta[item.id];
            }

            if (cmeta) {
              if (Object.keys(cmeta.item).length <= 3) {
                if (cmeta.mitem) {
                  const citem = { ...cmeta.item };
                  const ref_item = cmeta.mitem.toJSON() as any;
                  cmeta.item = { ...ref_item, ...citem };
                }
              }

              return (
                <ViRender
                  key={item.id}
                  is_layout={is_layout}
                  meta={cmeta}
                  passprop={_pass}
                  parent_key={arg.internal_key}
                  depth={depth}
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
        let meta = vi.meta[child_id];

        if (!meta) {
          vi.meta[child_id] = { item: arg.children as any };
          meta = vi.meta[child_id];

          const comp_id = meta.item.component?.id;
          if (comp_id) {
            vi.comp.load(comp_id).then((comp) => {
              if (comp) {
                for (const [k, v] of Object.entries(comp)) {
                  const item = meta.item as any;
                  if (!item[k]) item[k] = v;
                }
                const props = meta.item.component?.props as any;
                for (const [k, v] of Object.entries(
                  comp.component?.props || {}
                )) {
                  if (!props[k]) props[k] = v;
                }
                render({});
              }
            });
          }
        }

        return (
          <ViRender
            is_layout={is_layout}
            meta={meta}
            passprop={_pass}
            parent_key={arg.internal_key}
            depth={depth}
          />
        );
      }
    }

    const result = modifyChild(
      arg,
      _pass,
      internal_key ? { parent_key: internal_key } : undefined
    );
    return result;
  };
};

export const modifyChild = (arg: any, passprop?: any, add_props?: any) => {
  let prop: any = {};
  if (Array.isArray(arg)) {
    prop.children = arg;
  } else {
    prop = arg;
  }

  if (Array.isArray(prop.children)) {
    if (prop.children.length === 1) {
      return modify(prop.children[0], prop, passprop, add_props);
    }
    const childs = [];
    for (const child of prop.children) {
      childs.push(modify(child, prop, passprop, add_props));
    }
    return childs;
  }

  return modify(prop.children, prop, passprop, add_props);
};

const modify = (
  el: ReactNode | ReactNode[],
  arg: any,
  passprop?: any,
  add_props?: any
): ReactNode | ReactNode[] => {
  if (isValidElement(el)) {
    const passarg = { ...arg };
    delete passarg.children;

    const result = {
      ...el,
      props: {
        ...el.props,
        ...add_props,
        passprop: { ...passprop, ...passarg },
      },
    };

    return result;
  } else if (Array.isArray(el)) {
    return modifyChild(el, passprop, add_props);
  }
  return el;
};
