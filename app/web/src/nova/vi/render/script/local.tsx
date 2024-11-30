import { ReactNode, useEffect, useRef, useState } from "react";
import { deepClone } from "web-utils";
import { IMeta } from "../../../ed/logic/ed-global";
import { VG } from "../global";
import { w } from "./eval-prop";
import { modifyChild } from "./passprop";

export const local_cached_value = {} as Record<
  string,
  { mounted: boolean; value: any }
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
    const init_local_effect = vi.script?.init_local_effect;
    const metas = is_layout ? vi.layout?.meta : vi.meta;
    const curid = vi.page.cur.id + "~" + id;

    const resetLocal = () => {
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
      local_cached_value[curid].mounted = true;
    };

    if (!local_cached_value[curid]) {
      local_cached_value[curid] = { value: {}, mounted: false } as any;
      resetLocal();
    } else if (!local_cached_value[curid].mounted) {
      if (!w.isEditor) {
        resetLocal();
      }
    }

    const mounted = local_cached_value[curid].mounted;
    const ref = useRef<any>(local_cached_value[curid].value);

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

      let should_run = !init_local_effect[id];
      if (should_run) {
        if (typeof init_local_effect === "object") {
          init_local_effect[id] = true;
        }

        const fn = async () => {
          if (arg.effect) {
            await arg.effect(local_cached_value[curid].value);
          }
        };

        fn();
      }

      return () => {
        local_cached_value[curid].mounted = false;
      };
    }, [location.pathname]);

    useEffect(() => {
      if ((arg.deps || []).length > 0) {
        if (!mounted) {
          return;
        }

        resetLocal();
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
