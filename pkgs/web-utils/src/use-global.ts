import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useState,
} from "react";
export const GlobalContext = createContext({
  global: {},
  render: () => {},
} as {
  global: Record<string, any>;
  render: (reset?: boolean) => void;
});
import decircular from "decircular";

export const uState = useState;
export const useGlobal = <T extends object>(
  defaultValue: T,
  id: string
): T & { render: (reset?: boolean) => void } => {
  const ctx = useContext(GlobalContext);
  const { global, render } = ctx;

  if (!global[id]) {
    global[id] = defaultValue;
  }

  useEffect(() => {
    let res: any = null;
    return () => {
      if (typeof res === "function") res();
      else if (res instanceof Promise) {
        res.then((e) => {
          if (typeof e === "function") e();
        });
      }
    };
  }, []);

  const res = global[id];

  if (res) {
    res.render = (reset?: boolean) => {
      if (reset) {
        global[id] = undefined;
      }
      startTransition(render);
    };
  }

  return res as any;
};

export const deepClone = decircular;
