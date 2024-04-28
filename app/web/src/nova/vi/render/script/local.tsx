import { ReactNode, useEffect, useRef, useState } from "react";
import { IMeta } from "../../../ed/logic/ed-global";
import { updatePropScope } from "./eval-prop";
import { modifyChild } from "./passprop";
import { VG } from "../global";

export const editorLocalValue = {} as Record<string, any>;

export const createViLocal = (
  vi: {
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
      ["localhost", "prasi.avolut.com"].includes(location.hostname) &&
      location.pathname.startsWith("/ed/");
    let id = meta.item.id;

    const { children, parent_key } = arg;
    const init_local_effect = vi.script?.init_local_effect;
    const metas = is_layout ? vi.layout?.meta : vi.meta;
    const ref = useRef<any>(
      editorLocalValue[id] ? editorLocalValue[id] : arg.value
    );
    const [_, set] = useState({});
    const local = ref.current;
    local.render = () => {
      if ((window as any).prasiContext?.render) {
        (window as any).prasiContext?.render();
      } else {
        set({});
      }
    };

    updatePropScope(vi, meta, meta.script?.scope, parent_key);

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
            if (isEditor) {
              editorLocalValue[id] = local;
            }
          }
        };

        fn();
      }

      return () => {};
    }, [...(arg.deps || []), location.pathname]);

    useEffect(() => {
      if (isEditor) {
        if (editorLocalValue[id] === null) {
          const fn = async () => {
            if (arg.effect) {
              await arg.effect(local);
              if (isEditor) {
                editorLocalValue[id] = local;
              }
            }
          };
          fn();
        }
      }
    }, [editorLocalValue[id]]);

    return modifyChild(children, {
      ...meta.script?.scope,
      [arg.name]: local,
    });
  };
};
