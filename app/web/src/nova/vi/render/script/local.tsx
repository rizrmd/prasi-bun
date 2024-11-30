import { ReactNode, useEffect, useRef, useState } from "react";
import { deepClone } from "web-utils";
import { IMeta } from "../../../ed/logic/ed-global";
import { VG } from "../global";
import { w } from "./eval-prop";
import { modifyChild } from "./passprop";

export const local_cached_value = {} as Record<
  string,
  { mounted: string; value: any }
>;

export const createViLocal = (
  vi: {
    page: { cur: { id: string } };
    layout: VG["layout"];
    site: { db: any; api: any };
    meta: Record<string, IMeta>;
    script?: {
      init_local_effect: any;
    };
  },
  is_layout: boolean,
  meta: IMeta
) => {
  return <T extends Record<string, any>>(arg: {
    children: ReactNode;
    name: string;
    value: T;
    hook?: (local: T) => void;
    effect?: (local: T) => void | Promise<void>;
    parent_key?: any;
    deps?: any[];
  }) => {
    const isEditor =
      (["prasi.avolut.com"].includes(location.hostname) ||
        location.host === "localhost:4550") &&
      location.pathname.startsWith("/ed/");
    let id = meta.item.id;

    const { children, parent_key } = arg;
    const metas = is_layout ? vi.layout?.meta : vi.meta;
    const curid = vi.page.cur.id + "~" + id;

    const resetLocal = (from: string) => {
      for (const [k, v] of Object.entries(local_cached_value[curid].value)) {
        delete local_cached_value[curid].value[k];
      }
      for (const [k, v] of Object.entries(deepClone(arg.value))) {
        local_cached_value[curid].value[k] = v;
      }
      local_cached_value[curid].value.render = () => {
        const w = window as any;
        if (!w.isEditor && w.prasiContext.render) {
          w.prasiContext.render();
        } else {
          set({});
        }
      };
    };

    if (!local_cached_value[curid]) {
      local_cached_value[curid] = { value: {}, mounted: "" };
      resetLocal("init");
    } else if (local_cached_value[curid].mounted !== location.pathname) {
      if (!w.isEditor) {
        resetLocal("init-not-mounted");
      }
    }

    const [_, set] = useState({});

    if (arg.hook) {
      arg.hook(local_cached_value[curid].value);
    }

    useEffect(() => {
      if (meta.parent?.instance_id && metas) {
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

      local_cached_value[curid].mounted = location.pathname;
      const fn = async () => {
        if (arg.effect) {
          await arg.effect(local_cached_value[curid].value);
        }
      };
      fn();

      return () => {};
    }, [location.pathname]);

    useEffect(() => {
      if ((arg.deps || []).length > 0) {
        if (!local_cached_value[curid].mounted) {
          return;
        }

        resetLocal("deps");
        if (arg.effect) {
          arg.effect(local_cached_value[curid].value);
        }
      }
    }, [...(arg.deps || [])]);

    useEffect(() => {
      if (isEditor) {
        if (local_cached_value[id] === null) {
          const fn = async () => {
            if (arg.effect) {
              await arg.effect(local_cached_value[curid].value);
              if (isEditor) {
                local_cached_value[id] = local_cached_value[curid].value;
              }
            }
          };
          fn();
        }
      }
    }, [local_cached_value[id]]);

    const result = modifyChild(children, {
      ...meta.script?.scope,
      [arg.name]: local_cached_value[curid].value,
    });
    return result;
  };
};
