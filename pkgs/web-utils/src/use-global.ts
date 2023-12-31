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
  effectOrID?:
    | (() => Promise<void | (() => void)> | void | (() => void))
    | string,
  id?: string 
): T & { render: (reset?: boolean) => void } => {
  const w = window as unknown as {
    globalValueID: WeakMap<any, string>;
  };

  if (!w.globalValueID) w.globalValueID = new WeakMap();

  let _id = (typeof effectOrID === "string" ? effectOrID : id) as string;
  if (!_id) {
    if (!w.globalValueID.has(defaultValue)) {
      w.globalValueID.set(defaultValue, createId());
    }
    _id = w.globalValueID.get(defaultValue) || "";
  }
  if (!_id) {
    _id = "GLOBAL_DEFAULT";
  }
  const ctx = useContext(GlobalContext);
  const { global, render } = ctx;

  if (!global[_id]) {
    global[_id] = defaultValue;
  }

  useEffect(() => {
    let res: any = null;
    if (typeof effectOrID === "function") {
      try {
        res = effectOrID();
      } catch (e) {
        console.log(e);
      }
    }
    return () => {
      if (typeof res === "function") res();
      else if (res instanceof Promise) {
        res.then((e) => {
          if (typeof e === "function") e();
        });
      }
    };
  }, []);

  const res = global[_id];

  if (res) {
    res.render = (reset?: boolean) => {
      if (reset) {
        global[_id] = undefined;
      }
      startTransition(render);
    };
  } else {
    console.log(defaultValue, _id);
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
