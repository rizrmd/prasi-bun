import { FC } from "react";
import { IContent } from "../../../../utils/types/general";
import { VG } from "../../logic/global";
import { ViewMetaChildren } from "./children";
import { produceCSS } from "../../../../utils/css/gen";

export const ViewMetaRender: FC<{ item: IContent; v: VG; props?: any }> = ({
  item,
  v,
  props,
}) => {
  const className = produceCSS(item, {
    mode: v.mode,
    hover: v.view.hover ? v.view.hover.get(item) : undefined,
    active: v.view.active ? v.view.active.get(item) : undefined,
  });

  return (
    <div
      className={className}
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
