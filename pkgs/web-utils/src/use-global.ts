import { createId } from "@paralleldrive/cuid2";
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
export const deepClone = <T extends object>(object: T): T => {
  if (null == object || typeof object != "object") return object;
  // Handle Date
  if (object instanceof Date) {
    var copy = new Date();
    copy.setTime(object.getTime());
    return copy as T;
  }
  if (object instanceof Array) {
    return object.map((item) => deepClone(item)) as T;
  }

  var newObject: any = {};
  for (var key in object) {
    if (typeof object[key] === "object") {
      newObject[key] = deepClone((object as any)[key]);
    } else {
      newObject[key] = object[key];
    }
  }
  return newObject as any;
};
