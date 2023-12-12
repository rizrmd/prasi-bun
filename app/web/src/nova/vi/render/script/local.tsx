import { ReactNode, useEffect, useRef, useState } from "react";
import { IMeta } from "../../../ed/logic/ed-global";

export const createViLocal = (meta: IMeta) => {
  return <T extends Record<string, any>>(arg: {
    children: ReactNode;
    name: string;
    value: T;
    hook?: (local: T) => void;
    effect?: (local: T) => void | Promise<void>;
  }) => {
    const { children } = arg;
    const ref = useRef<any>(arg.value);
    const [_, set] = useState({});
    const render = () => {
      set({});
    };
    const local = ref.current;
    local.render = render;

    if (!meta.scope.val) {
      meta.scope.val = {};
    }
    const val = meta.scope.val;
    val[arg.name] = local;

    if (arg.hook) {
      arg.hook(local);
    }

    useEffect(() => {
      const fn = async () => {
        if (arg.effect) {
          await arg.effect(local);
        }
      };

      fn();
      return () => {};
    }, []);

    return children;
  };
};
