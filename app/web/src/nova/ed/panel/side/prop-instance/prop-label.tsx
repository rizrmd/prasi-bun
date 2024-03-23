import { FC } from "react";
import { Tooltip } from "../../../../../utils/ui/tooltip";
import { useLocal } from "web-utils";

export const EdPropLabel: FC<{
  name: string;
  labelClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
  dragnum?: {
    value: number;
    onChange: (value: number) => void;
    onChanged: (value: number) => void;
  };
}> = ({ name, labelClick, dragnum }) => {
  const local = useLocal({ start: { x: 0, value: 0 }, dragging: false });
  const label = (
    <>
      {local.dragging && (
        <div
          className="fixed inset-0 z-10 cursor-ew-resize"
          onPointerMove={(e) => {
            if (local.dragging && dragnum) {
              const dy = local.start.x - e.clientX;
              dragnum.onChange(local.start.value - dy);
            }
          }}
          onPointerUp={(e) => {
            if (dragnum) {
              const dy = local.start.x - e.clientX;
              dragnum.onChanged(local.start.value - dy);
            }

            local.dragging = false;
            local.render();
          }}
        ></div>
      )}
      <div
        className={cx(
          "px-1 flex items-center",
          dragnum ? "cursor-ew-resize" : "cursor-pointer"
        )}
        onClick={dragnum ? undefined : labelClick}
        onContextMenu={dragnum ? labelClick : undefined}
        onPointerDown={(e) => {
          if (dragnum) {
            local.start.x = e.clientX;
            local.start.value = dragnum.value;
            local.dragging = true;
            local.render();
          }
        }}
      >
        <div className="select-none w-[70px] overflow-hidden text-ellipsis whitespace-nowrap flex items-center">
          {name}
        </div>
      </div>
    </>
  );

  return name.length > 8 ? (
    <Tooltip
      content={name}
      placement="left"
      delay={100}
      className="flex items-center"
    >
      {label}
    </Tooltip>
  ) : (
    label
  );
};
