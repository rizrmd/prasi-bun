import { FC } from "react";
import { Tooltip } from "../../../../../utils/ui/tooltip";

export const EdPropLabel: FC<{
  name: string;
  labelClick?: React.MouseEventHandler<HTMLDivElement> | undefined;
}> = ({ name, labelClick }) => {
  const label = (
    <div className="px-1 flex items-center" onClick={labelClick}>
      <div className="select-none w-[70px] overflow-hidden text-ellipsis whitespace-nowrap flex items-center">
        {name}
      </div>
    </div>
  );

  return name.length > 8 ? (
    <Tooltip content={name} placement="left" delay={100}>
      {label}
    </Tooltip>
  ) : (
    label
  );
};
