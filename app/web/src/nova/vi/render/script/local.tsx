import { ReactNode } from "react";
import { useGlobal } from "web-utils";
import { ViGlobal } from "../global";
import { IMeta } from "../../../ed/logic/ed-global";

export const createViLocal = (meta: IMeta) => {
  return <T extends Record<string, any>>(arg: {
    children: ReactNode;
    name: string;
    value: T;
    hook: (local: T) => void;
    effect: (local: T) => void | Promise<void>;
  }) => {
    // const vi = useGlobal(ViGlobal, "VI");
    const { children } = arg;

    if (!meta.scope.val) {
      meta.scope.val = {};
    }
    const val = meta.scope.val;

    val[arg.name] = arg.value;

    return children;
  };
};
