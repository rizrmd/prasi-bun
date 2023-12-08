import { FC } from "react";
import { Tooltip } from "../../../../../utils/ui/tooltip";

export const EdPropLabel: FC<{ name: string }> = ({ name }) => {
  const label = (
    <div className="pl-1 min-w-[70px] overflow-hidden text-ellipsis whitespace-nowrap flex items-center">
      {name}
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
