import { FC, useEffect } from "react";
import { useGlobal, useLocal } from "web-utils";
import { FMCompDef, FNCompDef } from "../../../../../utils/types/meta-fn";
import { EDGlobal } from "../../../logic/ed-global";
import { treeRebuild } from "../../../logic/tree/build";
import { isImage } from "../../file/file-list";
import { EdPropLabel } from "./prop-label";
import { TypedMap } from "yjs-types";

export const EdPropInstanceButton: FC<{
  name: string;
  label?: string;
  mprop: FMCompDef;
  cprop: FNCompDef;
  labelClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}> = ({ label, name, cprop, mprop, labelClick }) => {
  const p = useGlobal(EDGlobal, "EDITOR");

  const val = cprop?.value;

  const local = useLocal({
    value: [] as {
      label: string;
      onClick: (modify: (props: any) => void, props: any) => void;
    }[],
    codeEditing: false,
    timeout: null as any,
  });

  useEffect(() => {
    try {
      eval(`local.value = ${val}`);

      if (!Array.isArray(local.value)) {
        local.value = [];
      }
    } catch (e) {}
    local.render();
  }, [val]);

  const filename = parseval(val);

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
                  p.render()
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

const Preview: FC<{ filename: string }> = ({ filename }) => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const ext = filename.split(".").pop() || "";
  const is_image = isImage(ext);
  return (
    <div className="flex items-center ">
      {is_image && (
        <img
          draggable={false}
          src={p.script.api._url("/_file" + filename + "?w=20")}
          alt={" thumbnail (20px)"}
          className={cx("w-[20px] h-[20px] border mr-1")}
        />
      )}
      {!is_image && (
        <div className="uppercase font-bold text-sm text-slate-300 mx-1">
          {ext}
        </div>
      )}
      Browse File
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
