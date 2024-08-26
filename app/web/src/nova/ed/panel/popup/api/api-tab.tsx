import trim from "lodash.trim";
import { FC } from "react";
import { deepClone, useLocal } from "web-utils";
import { EdApiDB } from "./api-db";
import { EdApiDeploy } from "./api-deploy";
import { apiRef, checkAPI, dev, server } from "./api-utils";

export const EdApiTab: FC<{
  onRender: (fn: () => void) => void;
  api_url: string;
  id_site: string;
  onUpdate: (arg: { api_url: string }) => {};
}> = ({ onRender, api_url, id_site, onUpdate }) => {
  const local = useLocal(
    {
      api_url,
      status: "checking" as "online" | "error" | "offline" | "checking",
      deployable: false,
      db: { url: "" },
      oldDB: { url: "" },
      domains: [] as string[],
      hasDB: false,
      deploy: {
        now: 0,
        current: 0,
        deploys: [] as number[],
      },
    },
    () => {
      try {
        if (dev) {
          const vdev = JSON.parse(localStorage.getItem("prasi-dev") || "{}");

          if (vdev && Object.keys(vdev).length > 0) {
            dev.url = vdev.url;
            dev.enabled = vdev.enabled;
          }
        }
      } catch (e) {}
      check();
    }
  );

  const url = api_url;

  const check = async () => {
    local.render();
    const res = await checkAPI(api_url, id_site);
    if (typeof res === "object") {
      local.db = res.db;
      local.domains = res.domains;
      local.oldDB = deepClone(res.db);
      local.hasDB = res.hasDB;
      local.status = "online";
      if (res.deploy) {
        local.deploy = res.deploy;
      }
      local.deployable = res.deployable;
      local.render();
    } else {
      local.db = { url: "" };
      local.oldDB = { url: "" };
      local.domains = [];
      local.hasDB = false;
      local.status = res;
      local.deployable = false;
      local.deploy = {
        now: 0,
        current: 0,
        deploys: [],
      };
      local.render();
    }
  };
  const update = async () => {
    if (local.api_url !== api_url) {
      server.status = "saving";
      onUpdate({ api_url: local.api_url });
    }
  };

  onRender(update);

  return (
    <>
      <div className="flex justify-between items-center pr-1">
        <div className="p-1">Server URL:</div>
        {url && (
          <div className="text-[12px]">
            {local.status === "online" && (
              <div className="bg-green-700 px-2 text-white">ONLINE</div>
            )}
            {local.status === "offline" && (
              <div className="text-white px-2 bg-slate-500">OFFLINE</div>
            )}
            {local.status === "error" && (
              <div className="text-white px-2 bg-red-500">SERVER ERROR</div>
            )}
            {local.status === "checking" && (
              <div className="text-blue-500">Checking...</div>
            )}
          </div>
        )}
        {!url && (
          <div className="text-[12px] text-slate-500">INVALID SERVER</div>
        )}
      </div>
      <div className="flex border-y">
        <div className="flex flex-1 p-1 ">
          <input
            spellCheck={false}
            value={local.api_url}
            onChange={(e) => {
              local.api_url = e.currentTarget.value;
              if (
                local.api_url.startsWith("http://") ||
                local.api_url.startsWith("https://")
              ) {
                if (local.api_url.length > 8) {
                  local.api_url = trim(local.api_url, "/");
                }
              }
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
            onBlur={update}
            placeholder="https://..."
          />
        </div>
      </div>

      {local.status === "online" && (
        <>
          {!local.deployable && !local.db && (
            <div className="h-[50px] flex items-center justify-center text-slate-400 text-center">
              This server is not deployable <br />
              and do not have DB
            </div>
          )}
        </>
      )}
      {local.hasDB && (
        <EdApiDB db={local.db} render={local.render} update={update} />
      )}
      {local.deployable && (
        <>
          <EdApiDeploy deploy={local.deploy} />
        </>
      )}
    </>
  );
};
