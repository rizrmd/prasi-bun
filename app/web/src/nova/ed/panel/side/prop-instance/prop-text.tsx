import {
  FC,
  TextareaHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useLocal } from "web-utils";
import { FMCompDef } from "../../../../../utils/types/meta-fn";
import { EdPropLabel } from "./prop-label";

export const EdPropInstanceText: FC<{
  name: string;
  mprop: FMCompDef;
  labelClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}> = ({ name, mprop, labelClick }) => {
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

  return (
    <div className="flex items-center min-h-[28px]">
      <EdPropLabel name={name} labelClick={labelClick} />
      <AutoHeightTextarea
        className="flex-1 outline-none border-l p-1 overflow-hidden focus:bg-blue-50"
        value={local.value || ""}
        spellCheck={false}
        onChange={(e) => {
          local.value = e.currentTarget.value;
          local.render();
          clearTimeout(local.timeout);
          local.timeout = setTimeout(() => {
            mprop.doc?.transact(() => {
              mprop.set("value", `\`${local.value}\``);
              mprop.set("valueBuilt", `\`${local.value}\``);
            });
          }, 1000);
        }}
      />
    </div>
  );
};

const unquote = (text: string) => {
  const str = text.trim();
  const first = str[0];

  if (['"', "'", "`"].includes(first)) {
    if (first === str[str.length - 1]) {
      return str.slice(1, -1);
    }
  }
  return str;
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
