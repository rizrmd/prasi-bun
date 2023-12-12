import { FC, ReactNode } from "react";
import { IMeta } from "../../../ed/logic/ed-global";

export const createViPassProp = (meta: IMeta) => {
  return (arg: { children: ReactNode }) => {
    return arg.children;
  };
};
