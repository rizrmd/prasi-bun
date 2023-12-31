import {
  FC,
  TextareaHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useLocal } from "web-utils";
import { IItem } from "../../../../../../utils/types/item";
import { FNLinkTag } from "../../../../../../utils/types/meta-fn";
import { ISection } from "../../../../../../utils/types/section";
import { IText } from "../../../../../../utils/types/text";
import { responsiveVal } from "../tools/responsive-val";

type LinkTagUpdate = {
  linktag: FNLinkTag;
};

export const PanelLink: FC<{
  value: ISection | IItem | IText;
  mode: "desktop" | "mobile";
  update: <T extends keyof LinkTagUpdate>(
    key: T,
    val: LinkTagUpdate[T]
  ) => void;
}> = ({ value, update, mode }) => {
  const linktag = responsiveVal<FNLinkTag>(value, "linktag", mode, {});
  const local = useLocal({ link: linktag.link });

  useEffect(() => {
    local.link = linktag.link;
    local.render();
  }, [linktag.link]);

  return (
    <>
      <AutoHeightTextarea
        spellCheck={false}
        minRows={1}
        className={cx("flex-1 border border-slate-300 p-1 h-[25px]")}
        value={local.link || ""}
        placeholder="Link Href"
        onChange={(e) => {
          local.link = e.currentTarget.value;
          local.render();
        }}
        onBlur={() => {
          update("linktag", { ...linktag, link: local.link });
        }}
      />
    </>
  );
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
