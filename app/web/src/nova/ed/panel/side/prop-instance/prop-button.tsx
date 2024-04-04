import { FC, useEffect } from "react";
import { useGlobal, useLocal } from "web-utils";
import { TypedMap } from "yjs-types";
import { FMCompDef, FNCompDef } from "../../../../../utils/types/meta-fn";
import { EDGlobal, IMeta, active } from "../../../logic/ed-global";
import { treeRebuild } from "../../../logic/tree/build";
import { EdPropLabel } from "./prop-label";

export const w = window as any;

export const EdPropInstanceButton: FC<{
  name: string;
  label?: string;
  mprop: FMCompDef;
  cprop: FNCompDef;
  meta: IMeta;
  labelClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}> = ({ label, name, cprop, mprop, meta }) => {
  const p = useGlobal(EDGlobal, "EDITOR");

  const local = useLocal({
    value: [] as {
      label: string;
      onClick: (modify: (props: any) => void, props: any) => void;
    }[],
    codeEditing: false,
    timeout: null as any,
  });

  try {
    const arg: any = { ...active.scope };
    if (meta.item.script?.props) {
      for (const [k, v] of Object.entries(meta.item.script?.props)) {
        if (v.value) {
          eval(
            `try { arg.${k} = ${v.value} } catch(e) { console.error("arg", e); }`
          );
        }
      }
    } else if (meta.item.component) {
      for (const [k, v] of Object.entries(meta.item.component.props)) {
        if (v.valueBuilt) {
          eval(
            `try { arg.${k} = ${v.valueBuilt} } catch(e) { console.error("arg", e); }`
          );
        }
      }
    }

    const btn_fn = new Function(
      ...Object.keys(arg),
      `return ${cprop.valueBuilt}`
    );

    local.value = btn_fn(...Object.values(arg));
  } catch (e) {
    console.error(e);
  }

  const props = mprop.parent?.toJSON();

  return (
    <div className="flex items-stretch min-h-[28px]">
      <EdPropLabel name={label || name} />
      <div className={cx("flex-1 flex items-stretch  p-[3px]")}>
        {local.value.map((e, idx) => {
          return (
            <div
              key={idx}
              className="flex flex-1 items-stretch bg-white border hover:border-blue-500 hover:bg-blue-50 rounded-sm select-none cursor-pointer"
              onClick={() => {
                e.onClick(async (arg: Record<string, FNCompDef>) => {
                  const src = {} as Record<string, string>;
                  Object.entries(arg).map(([k, v]) => {
                    src[k] = v.value;
                  });
                  const result = await _api.code_build(src);
                  for (const [k, v] of Object.entries(result)) {
                    arg[k].valueBuilt = v;
                  }
                  const parent = mprop.parent as TypedMap<
                    Record<string, FMCompDef>
                  >;
                  mprop.doc?.transact(() => {
                    for (const [k, v] of Object.entries(arg)) {
                      const map = new Y.Map();
                      syncronize(map, v);
                      parent.set(k, map as any);
                    }
                  });
                  await treeRebuild(p);
                  p.render();
                }, props);
              }}
            >
              <div className="flex items-center">
                <div className="px-1">{e.label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const parseval = (text: string) => {
  const val = text.substring(`siteurl('/_file`.length);

  return val.substring(0, val.length - '")'.length);
};

const unquote = (text: any) => {
  if (typeof text === "string") {
    const str = text.trim();
    const first = str[0];

    if (['"', "'", "`"].includes(first)) {
      if (first === str[str.length - 1]) {
        return str.slice(1, -1);
      }
    }
    return str;
  }
  return "";
};
