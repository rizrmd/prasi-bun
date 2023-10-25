import { ReactNode } from "react";

export const TopBtn = ({
  children,
  className,
  disabled,
  underlight,
}: {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  underlight?: string;
}) => {
  return (
    <div
      className={cx(
        "px-2 flex items-center cursor-pointer space-x-1 select-none relative",
        !disabled &&
          "border border-slate-300 hover:bg-blue-500 hover:border-blue-500 hover:text-white transition-all duration-200 rounded-[2px]",
        disabled && "text-slate-400 border border-slate-100",
        underlight &&
          css`
            border-bottom-color: ${underlight};
          `,
        className
      )}
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
};
