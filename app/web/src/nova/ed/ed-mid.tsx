import { FC } from "react";
import { EdAddItem } from "./panel/header/mid/add-item";
import { EdAddSection } from "./panel/header/mid/add-section";
import { EdAddText } from "./panel/header/mid/add-text";
import { EdCompPicker } from "./panel/header/mid/comp-picker";
import { EdPagePicker } from "./panel/header/mid/page-picker";
import { TopBtn } from "./panel/header/top-btn";
import { EdMain } from "./panel/main/main";

export const EdMid: FC<{}> = () => {
  return (
    <div className="flex flex-col flex-1">
      <div
        className={cx(
          "h-[35px] border-b flex p-1 items-stretch text-[12px] justify-between"
        )}
      >
        <div className="flex items-stretch flex-1 ">
          <EdPagePicker />
        </div>

        <div className="flex items-stretch flex-1 justify-center  ">
          <div className="flex items-stretch ">
            <div className="border-r border-r-slate-100 text-slate-400 text-[9px] flex items-center px-1 mr-1">ADD</div>
            <EdAddSection />
            <EdAddItem />
            <EdAddText />
            <EdCompPicker />
          </div>
        </div>
        <div className="flex items-center flex-1 justify-end">
          <TopBtn style="slim" className="font-mono text-[9px]">
            PREVIEW
          </TopBtn>
        </div>
      </div>
      <EdMain />
    </div>
  );
};
