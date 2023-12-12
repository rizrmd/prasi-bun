import { ReactNode } from "react";

export const ViLocal = <T extends Record<string, any>>(arg: {
  children: ReactNode;
  name: string;
  value: T;
  hook: (local: T) => void;
  effect: (local: T) => void | Promise<void>;
}) => {
  const { children } = arg;

  return children;
};
