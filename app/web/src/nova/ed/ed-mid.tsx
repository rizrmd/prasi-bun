import { FC } from "react";
import { EdCompPicker } from "./panel/header/mid/comp-picker";
import { EdPagePicker } from "./panel/header/mid/page-picker";
import { EdMain } from "./panel/main/main";

export const EdMid: FC<{}> = () => {
  return (
    <div className="flex flex-col flex-1">
      <div
        className={cx(
          "h-[35px] border-b flex p-1 items-stretch text-[12px] justify-between"
        )}
      >
        <div className="flex items-stretch">
          <EdPagePicker />
        </div>

        <div className="flex items-center">
          <EdCompPicker />
        </div>
        <div className="flex items-stretch justify-end"></div>
      </div>
      <EdMain />
    </div>
  );
};
