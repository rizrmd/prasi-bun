import { FC } from "react";

export const DeadEnd: FC<{ children: any }> = ({ children }) => {
  return (
    <div className="flex items-center justify-center w-full h-full fixed inset-0">
      {children}
    </div>
  );
};
