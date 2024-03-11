import {
  FC,
  TextareaHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useGlobal, useLocal } from "web-utils";
import { FMCompDef } from "../../../../../utils/types/meta-fn";
import { EdPropLabel } from "./prop-label";
import { treeRebuild } from "../../../logic/tree/build";
import { EDGlobal } from "../../../logic/ed-global";

export const EdPropInstanceFile: FC<{
  name: string;
  label?: string;
  mprop: FMCompDef;
  labelClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}> = ({ label, name, mprop, labelClick }) => {
  const p = useGlobal(EDGlobal, "EDITOR");
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

  const is_file = local.value.startsWith("siteurl(");

  return (
    <div className="flex items-stretch min-h-[28px]">
      <EdPropLabel name={label || name} labelClick={labelClick} />
      <div className={cx("border-l flex-1")}></div>
    </div>
  );
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

export function AutoHeightTextarea({
  minRows = 1,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & { minRows?: number }) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const calculateAndSetHeight = useCallback(() => {
    if (!ref.current) {
      return;
    }
    const {
      borderBottomWidth,
      borderTopWidth,
      boxSizing,
      lineHeight,
      paddingBottom,
      paddingTop,
    } = window.getComputedStyle(ref.current);
    ref.current.style.height = lineHeight; // set height temporarily to a single row to obtain scrollHeight, disregarding empty space after text (otherwise, scrollHeight would be equal to the height of the element) - this solves auto-shrinking of the textarea (it's not needed for auto-growing it)
    const { scrollHeight } = ref.current; // scrollHeight = content height + padding top + padding bottom

    if (boxSizing === "border-box") {
      const minHeight =
        parseFloat(lineHeight) * minRows +
        parseFloat(paddingTop) +
        parseFloat(paddingBottom) +
        parseFloat(borderTopWidth) +
        parseFloat(borderBottomWidth);
      const allTextHeight =
        scrollHeight +
        parseFloat(borderTopWidth) +
        parseFloat(borderBottomWidth);
      ref.current.style.height = `${Math.max(minHeight, allTextHeight)}px`;
    } else if (boxSizing === "content-box") {
      const minHeight = parseFloat(lineHeight) * minRows;
      const allTextHeight =
        scrollHeight - parseFloat(paddingTop) - parseFloat(paddingBottom);
      ref.current.style.height = `${Math.max(minHeight, allTextHeight)}px`;
    } else {
      console.error("Unknown box-sizing value.");
    }
  }, [minRows]);

  useEffect(() => {
    calculateAndSetHeight();
  }, [calculateAndSetHeight]);

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    calculateAndSetHeight();
    if (props.onChange) {
      props.onChange(e);
    }
  };
  calculateAndSetHeight();

  return <textarea {...props} onChange={handleChange} ref={ref} />;
}
