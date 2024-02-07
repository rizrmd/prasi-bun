import { FC } from "react";
import { treeRebuild } from "../../nova/ed/logic/tree/build";
import { useGlobal } from "web-utils";

export const DeadEnd: FC<{ children: any; back?: () => void }> = ({
  children,
  back,
}) => {
  return (
    <div className="flex items-center justify-center w-full h-full fixed inset-0 flex-col">
      <div>{children}</div>
      <div
        className="border mt-2 rounded-md p-2 cursor-pointer"
        onClick={
          back
            ? back
            : () => {
                history.back();
              }
        }
      >
        {" "}
        Go Back
      </div>
    </div>
  );
};
