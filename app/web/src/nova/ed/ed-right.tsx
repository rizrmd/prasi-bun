import { useGlobal } from "web-utils";
import { EDGlobal, active } from "./logic/ed-global";
import { getMetaById } from "./logic/tree/build";
import { EdSidePropInstance } from "./panel/side/prop-instance";
import { EdSideStyle } from "./panel/side/side-style";

export const EdRight = () => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const meta = getMetaById(p, active.item_id);

  const isComponent =
    meta?.item.type === "item" &&
    meta?.item.component?.id &&
    meta?.item.component.id !== active.comp_id;
  const showProp = isComponent && p.ui.side.prop;
  return (
    <div
      className={cx(
        css`
          width: ${p.ui.layout.right}px;
        `,
        "border-l flex flex-col"
      )}
    >
      {!meta ? (
        <div className="flex items-center justify-center text-[12px] flex-1">
          Select an item
        </div>
      ) : (
        <>
          {isComponent ? (
            <EdSidePropInstance meta={meta} />
          ) : (
            <EdSideStyle meta={meta} />
          )}
        </>
      )}
    </div>
  );
};
