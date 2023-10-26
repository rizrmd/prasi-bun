import { ReactElement, ReactNode } from "react";
import { Popover } from "../../../../utils/ui/popover";

export const TopBtn = ({
  children,
  className,
  disabled,
  underlight,
  onClick,
  style = "normal",
  popover,
}: {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  underlight?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  style?: "slim" | "normal";
  popover?: ReactElement;
}) => {
  const result = (
    <div
      className={cx(
        "flex items-center cursor-pointer space-x-1 select-none relative transition-all duration-200 ",
        style === "normal"
          ? [
              "px-2 ",
              !disabled &&
                "border border-slate-300 hover:bg-blue-500 hover:border-blue-500 hover:text-white rounded-[2px]",
              disabled && "text-slate-400 border border-slate-100",
            ]
          : "px-1 rounded-[3px] hover:bg-blue-500 hover:text-white",
        underlight &&
          css`
            border-bottom-color: ${underlight};
          `,
        className
      )}
      onClick={onClick}
    >
      {underlight && (
        <div
          className={cx(
            "absolute bottom-0 left-[-1px] right-[-1px] h-[3px]",
            css`
              background: ${underlight};
            `
          )}
        ></div>
      )}
      {children}
    </div>
  );

  if (popover) {
    return (
      <Popover autoFocus={false} content={popover} placement="bottom">
        {result}
      </Popover>
    );
  }

  return result;
};
