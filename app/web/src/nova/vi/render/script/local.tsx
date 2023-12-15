import { ReactNode, useEffect, useRef, useState } from "react";
import { IMeta } from "../../../ed/logic/ed-global";
import { updatePropScope } from "./eval-prop";

export const createViLocal = (
  meta: IMeta,
  scope: any,
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

    if (!meta.scope.val) {
      meta.scope.val = {};
    }
    const val = meta.scope.val;
    val[arg.name] = local;

    updatePropScope(meta, scope);

    if (arg.hook) {
      arg.hook(local);
    }

    useEffect(() => {
      let should_run = !init_local_effect[meta.item.id];
      if (should_run) {
        if (typeof init_local_effect === "object") {
          init_local_effect[meta.item.id] = true;
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

    return children;
  };
};
