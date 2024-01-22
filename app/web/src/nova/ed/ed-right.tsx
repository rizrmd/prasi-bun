import { useGlobal } from "web-utils";
import { getActiveMeta } from "./logic/active/get-meta";
import { EDGlobal, active } from "./logic/ed-global";
import { EdSidePropInstance } from "./panel/side/prop-instance";
import { EdSideStyle } from "./panel/side/side-style";

export const EdRight = () => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const meta = getActiveMeta(p);

  const isComponent =
    meta?.item.type === "item" &&
    meta?.item.component?.id &&
    meta?.item.component.id !== active.comp_id;

  return (
    <div
      className={cx(
        css`
          width: ${p.ui.layout.right}px;
        `,
        "border-l flex flex-col bg-white"
      )}
    >
      {!meta ? (
        <div className="flex py-[100px] items-center text-[12px] flex-1 flex-col">
          <img
            draggable={false}
            src="/img/empty.png"
            className={css`
              width: 50px;
            `}
          />
          <div className="mt-[20px] text-[12px]">— Select an Item —</div>
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
