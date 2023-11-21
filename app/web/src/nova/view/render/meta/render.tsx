import { FC } from "react";
import { produceCSS } from "../../../../utils/css/gen";
import { EdMeta } from "../../../ed/logic/ed-global";
import { VG } from "../../logic/global";
import { ViewMetaChildren } from "./children";

export const ViewMetaRender: FC<{
  meta: EdMeta;
  v: VG;
  props?: any;
  className?: string;
}> = ({ meta, v, props, className }) => {
  let _className = className;
  const item = meta.item;
  if (meta.isLayout && !v.layout.show) {
    return <ViewMetaChildren item={item} />;
  }

  if (!className) {
    _className = produceCSS(item, {
      mode: v.mode,
      hover: v.view.hover ? v.view.hover.get(item) : undefined,
      active: v.view.active ? v.view.active.get(item) : undefined,
    });
  }

  return (
    <div
      className={_className}
      {...props}
      onPointerOver={
        v.view.hover
          ? (e) => {
              e.stopPropagation();
              e.preventDefault();
              v.view.hover?.set(item.id);
            }
          : props?.onPointerOver
      }
      onClick={
        v.view.active
          ? (e) => {
              e.stopPropagation();
              e.preventDefault();
              v.view.active?.set(item.id);
            }
          : props?.onClick
      }
    >
      <ViewMetaChildren item={item} />
    </div>
  );
};
