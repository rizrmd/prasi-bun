import { forwardRef } from "react";
import { useGlobal, useLocal } from "web-utils";
import { EDGlobal, PG } from "../../../logic/ed-global";
import { checkAPI, dev } from "./api-utils";

export const EdApiServer = forwardRef<HTMLDivElement>((arg, ref) => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal(
    {
      api_url: p.site.config.api_url,
      status: "offline" as "online" | "offline" | "checking",
      deployable: false,
      hasDB: false,
    },
    () => {
      try {
        if (dev) {
          const vdev = JSON.parse(localStorage.getItem("prasi-dev") || "{}");
          if (vdev) {
            dev.url = vdev.url;
            dev.enabled = vdev.enabled;
          }
        }
      } catch (e) {}
      check();
    }
  );

  const check = () => {
    local.status = "checking";
    local.render();
    const res = checkAPI(p);
    if (res) {
      local.hasDB = res.hasDB;
      local.status = "online";
      local.deployable = res.deployable;
      local.render();
    } else {
      local.hasDB = false;
      local.status = "offline";
      local.deployable = false;
      local.render();
    }
  };
  return (
    <div
      ref={ref}
      className="flex flex-col w-[400px] items-stretch bg-white -mx-[8px] -my-[3px] text-[14px]"
    >
      <div className="flex justify-between items-center pr-1">
        <div className="p-1">Server URL:</div>
        <div className="text-[12px]">
          {local.status === "online" && (
            <div className="bg-green-700 px-2 text-white">ONLINE</div>
          )}
          {local.status === "offline" && (
            <div className="text-white px-2 bg-slate-500">OFFLINE</div>
          )}
          {local.status === "checking" && (
            <div className="text-blue-500">Checking...</div>
          )}
        </div>
      </div>
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
            className={cx(
              "outline-none focus:border-blue-500 flex-1",
              dev.enabled && "line-through opacity-30"
            )}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.currentTarget.blur();
              }
            }}
            onBlur={check}
            placeholder="https://..."
          />
        </div>
      </div>
      <div
        className={cx(
          "flex items-stretch h-[30px] border border-t-0",
          dev.enabled ? " bg-green-50" : ""
        )}
      >
        <div
          className={cx(
            "border cursor-pointer m-1 flex items-center px-2 space-x-1 w-[70px] justify-center",
            !dev.enabled
              ? "hover:bg-green-50 hover:border-green-700 hover:text-green-700 text-slate-500 "
              : "bg-green-700 text-white border-green-700"
          )}
          onClick={async () => {
            dev.enabled = !dev.enabled;
            localStorage.setItem("prasi-dev", JSON.stringify(dev));
            local.render();
          }}
        >
          <span>DEV</span>{" "}
          {dev.enabled && <span className="text-white">ON</span>}
          {!dev.enabled && <span className="text-slate-300">OFF</span>}
        </div>

        <input
          type="text"
          className={cx(
            "px-1 m-1 border flex-1 font-mono text-[11px] outline-none focus:border-blue-500",
            dev.enabled && "border-green-700"
          )}
          value={dev.url}
          onChange={(e) => {
            dev.url = e.currentTarget.value;
            localStorage.setItem("prasi-dev", JSON.stringify(dev));
            local.render();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.currentTarget.blur();
            }
          }}
          onBlur={check}
        />
      </div>
      {local.status === "online" && (
        <>
          {!local.deployable && !local.hasDB && (
            <div className="h-[50px] flex items-center justify-center text-slate-400 text-center">
              This server is not deployable <br />
              and do not have DB
            </div>
          )}
        </>
      )}
    </div>
  );
});
