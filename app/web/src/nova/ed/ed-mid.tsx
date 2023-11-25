import { FC } from "react";
import { EdMain } from "./panel/main/main";
import { EdPagePicker } from "./panel/header/mid/page-picker";

export const EdMid: FC<{}> = () => {
  return (
    <div className="flex flex-col flex-1">
      <div
        className={cx(
          "h-[35px] border-b flex p-1 items-stretch text-[12px] justify-between"
        )}
      >
        <EdPagePicker />
      </div>
      <EdMain />
    </div>
  );
};
