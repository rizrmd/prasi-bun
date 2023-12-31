import { ReactNode, useEffect, useRef } from "react";
import { IMeta } from "../../../ed/logic/ed-global";
import { updatePropScope } from "./eval-prop";
import { modifyChild } from "./passprop";

export const createViLocal = (
  metas: Record<string, IMeta>,
  meta: IMeta,
  init_local_effect: any
) => {
  return <T extends Record<string, any>>(arg: {
    children: ReactNode;
    name: string;
    value: T;
    hook?: (local: T) => void;
    effect?: (local: T) => void | Promise<void>;
  }) => {
    const { children } = arg;
    const ref = useRef<any>(arg.value);
    const local = ref.current;
    local.render = meta.render;

    updatePropScope(meta, meta.script?.passprop);

    if (arg.hook) {
      arg.hook(local);
    }

    useEffect(() => {
      let id = meta.item.id;
      if (meta.parent?.instance_id) {
        const parent_meta = metas[meta.parent?.instance_id];
        if (parent_meta && parent_meta.instances) {
          for (const [k, v] of Object.entries(
            parent_meta.instances[meta.parent.instance_id]
          )) {
            if (v === meta.item.id) {
              id = k;
              break;
            }
          }
        }
      }
      let should_run = !init_local_effect[id];
      if (should_run) {
        if (typeof init_local_effect === "object") {
          init_local_effect[id] = true;
        }
        const fn = async () => {
          if (arg.effect) {
            await arg.effect(local);
          }
        };

        fn();
      }

      return () => {};
    }, []);

    return modifyChild(children, {
      ...meta.script?.passprop,
      [arg.name]: local,
    });
  };
};
