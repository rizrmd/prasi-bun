import { forwardRef } from "react";
import { useGlobal, useLocal } from "web-utils";
import { EDGlobal } from "../../../logic/ed-global";

export const EdApiServer = forwardRef<HTMLDivElement>((arg, ref) => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal({ api_url: p.site.config.api_url });

  return (
    <div
      ref={ref}
      className="flex flex-col w-[400px] items-stretch bg-white min-h-[200px] -mx-[8px] -my-[3px] text-[14px]"
    >
      <div className="p-1">Server URL:</div>
      <div className="flex border-y">
        <div className="flex flex-1 p-1 ">
          <input
            value={local.api_url}
            onChange={(e) => {
              local.api_url = e.currentTarget.value;
              local.render();
            }}
            onFocus={(e) => {
              if (!e.currentTarget.value) {
                local.api_url = `https://`;
                local.render();
              }
            }}
            type="text"
            className="outline-none focus:border-blue-500 flex-1"
            placeholder="https://..."
          />
        </div>
        {local.api_url !== p.site.config.api_url && (
          <div className="p-1 flex w-[80px] border-l">
            <div className="bg-blue-500 hover:bg-blue-300 cursor-pointer flex-1 flex items-center justify-center text-white">
              Check
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
