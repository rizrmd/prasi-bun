import { FC } from "react";
import { produceCSS } from "../../../../utils/css/gen";
import { IMeta } from "../../../ed/logic/ed-global";
import { VG } from "../../logic/global";
import { ViewMetaChildren } from "./children";

export const ViewMetaRender: FC<{
  meta: IMeta;
  v: VG;
  props?: any;
  className?: string;
}> = ({ meta, v, props, className }) => {
  let _className = className;
  const item = meta.item;

  if (meta.is_layout && !v.layout.show) {
    return <ViewMetaChildren key={item.id} meta={meta} />;
  }

  if (!className) {
    _className = produceCSS(item, {
      mode: v.mode,
      hover: v.view.hover ? v.view.hover.get(meta) : undefined,
      active: v.view.active ? v.view.active.get(meta) : undefined,
    });
  }

  return (
    <div
      className={_className}
      {...props}
      onPointerOver={(e) => {
        e.stopPropagation();
        e.preventDefault();
        v.view.hover?.set(meta);
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
        v.view.active?.set(meta);
      }}
    >
      <ViewMetaChildren meta={meta} />
    </div>
  );
};
