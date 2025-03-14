import { FC } from "react";
import { EDGlobal, active } from "./logic/ed-global";
import { EdAddItem } from "./panel/header/mid/add-item";
import { EdAddSection } from "./panel/header/mid/add-section";
import { EdAddText } from "./panel/header/mid/add-text";
import { EdCompPicker } from "./panel/header/mid/comp-picker";
import { EdPagePicker } from "./panel/header/mid/page-picker";
import { TopBtn } from "./panel/header/top-btn";
import { useGlobal } from "web-utils";
import { ResponsiveToggle } from "./panel/header/right/responsive-toggle";
import { EdCompEditable } from "./panel/header/mid/comp-editable";
import { MobileQRButton } from "./panel/side/style/tools/mobile-qr";
import { EdFileBrowser } from "./panel/file/file-browser";

export const EdMid: FC<{}> = () => {
  const p = useGlobal(EDGlobal, "EDITOR");
  return (
    <div className="flex flex-col">
      <div
        className={cx(
          "h-[35px] border-b flex p-1 items-stretch text-[12px] justify-between"
        )}
      >
        <div className="flex items-stretch flex-1">
          <EdPagePicker />
        </div>

        <div className="flex items-stretch flex-1 justify-center">
          <div className="flex items-stretch">
            <div className="border-r border-r-slate-100 text-slate-400 text-[9px] flex items-center px-1 mr-1">
              ADD
            </div>
            <EdAddSection />
            <EdAddItem />
            <EdAddText />
            <EdCompPicker />
            <EdCompEditable />
          </div>
        </div>
        <div className="flex items-stretch flex-1 justify-end">
          <EdFileBrowser />
          {p.site.responsive !== "desktop-only" && <MobileQRButton />}
          <label className=" text-slate-400 flex items-center pr-1">
            <div className=" px-1"> Zoom</div>
            <select
              value={p.ui.zoom}
              onChange={(e) => {
                p.ui.zoom = e.currentTarget.value;
                localStorage.zoom = p.ui.zoom;
                p.render();
              }}
            >
              {["50%", "60%", "70%", "80%", "90%", "100%", "120%", "150%"].map(
                (e) => {
                  return (
                    <option key={e} value={e}>
                      {e}
                    </option>
                  );
                }
              )}
            </select>
          </label>
          <div className=" text-slate-400 flex items-center pr-1 ">
            <ResponsiveToggle />
          </div>
          <a href={`/prod/${params.site_id}${p.page.cur.url}`} target="_blank">
            <TopBtn style="slim" className="font-mono text-[9px]">
              PREVIEW
            </TopBtn>
          </a>
        </div>
      </div>
    </div>
  );
};
