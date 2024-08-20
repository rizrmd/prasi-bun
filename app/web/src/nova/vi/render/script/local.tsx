import { ReactNode, useEffect, useRef, useState } from "react";
import { IMeta } from "../../../ed/logic/ed-global";
import { VG } from "../global";
import { modifyChild } from "./passprop";
import { deepClone } from "web-utils";

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
    if (!local_cached_value[curid]) {
      local_cached_value[curid] = { mounted: true, value: arg.value };
    } else if (!local_cached_value[curid].mounted) {
      for (const [k, v] of Object.entries(local_cached_value[curid].value)) {
        delete local_cached_value[curid].value[k];
      }
      for (const [k, v] of Object.entries(deepClone(arg.value))) {
        local_cached_value[curid].value[k] = v;
      }
      local_cached_value[curid].mounted = true;
    }

    const ref = useRef<any>(local_cached_value[curid].value);

    const [_, set] = useState({});
    const local = ref.current;
    local.render = () => {
      const w = window as any;
      if (!w.isEditor && w.prasiContext.render) {
        w.prasiContext.render();
      } else {
        set({});
      }
    };

    if (arg.hook) {
      arg.hook(local);
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
            await arg.effect(local);
          }
        };

        fn();
      }

      return () => {
        local_cached_value[curid].mounted = false;
      };
    }, [...(arg.deps || []), location.pathname]);

    useEffect(() => {
      if (isEditor) {
        if (local_cached_value[id] === null) {
          const fn = async () => {
            if (arg.effect) {
              await arg.effect(local);
              if (isEditor) {
                local_cached_value[id] = local;
              }
            }
          };
          fn();
        }
      }
    }, [local_cached_value[id]]);

    const result = modifyChild(children, {
      ...meta.script?.scope,
      [arg.name]: local,
    });
    return result;
  };
};
