import {
  FC,
  TextareaHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useGlobal, useLocal } from "web-utils";
import { FMCompDef } from "../../../../../utils/types/meta-fn";
import { EDGlobal } from "../../../logic/ed-global";
import { EdPropLabel } from "./prop-label";
import { treeRebuild } from "../../../logic/tree/build";
import { isImage } from "../../file/file-list";

export const EdPropInstanceFile: FC<{
  name: string;
  label?: string;
  mprop: FMCompDef;
  labelClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}> = ({ label, name, mprop, labelClick }) => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const f = p.ui.popup.file;

  const val = mprop.get("value");

  const local = useLocal({
    value: unquote(val),
    codeEditing: false,
    timeout: null as any,
  });

  useEffect(() => {
    local.value = unquote(val);
    local.render();
  }, [val]);

  const filename = parseval(val);

  return (
    <div className="flex items-stretch min-h-[28px]">
      <EdPropLabel name={label || name} labelClick={labelClick} />
      <div className={cx("border-l flex-1 flex items-stretch  p-[2px]")}>
        <div
          className="flex flex-1 items-stretch bg-white border hover:border-blue-500 hover:bg-blue-50 rounded-sm select-none cursor-pointer"
          onClick={() => {
            f.open = true;
            f.picker.multi = false;
            f.picker.value = parseval(val);
            f.picker.on_pick = (file) => {
              const val = `siteurl(\`${file}\`)`;
              mprop.doc?.transact(() => {
                mprop.set("value", val);
                mprop.set("valueBuilt", val);
              });
              treeRebuild(p);
              p.render();
            };
            p.render();
          }}
        >
          {local.value ? <></> : <></>}
          <div className="flex items-center">
            {filename ? (
              <Preview filename={filename} />
            ) : (
              <div className="px-1">Browse File</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Preview: FC<{ filename: string }> = ({ filename }) => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const is_image = isImage(filename.split(".").pop() || "");
  return (
    <div className="flex ">
      {is_image && (
        <img
          draggable={false}
          src={p.script.api._url("/_file" + filename + "?w=20")}
          alt={" thumbnail (20px)"}
          className={cx("w-[20px] h-[20px] border mr-1")}
        />
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
