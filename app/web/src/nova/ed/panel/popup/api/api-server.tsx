import { forwardRef } from "react";
import { deepClone, useGlobal, useLocal } from "web-utils";
import { EDGlobal } from "../../../logic/ed-global";
import { EdApiDB } from "./api-db";
import { EdApiDeploy } from "./api-deploy";
import { EdApiDomain } from "./api-domain";
import { apiRef, apiUrl, checkAPI, dev, server } from "./api-utils";
import { Modal } from "../../../../../utils/ui/modal";

export const EdPopApi = () => {
  const p = useGlobal(EDGlobal, "EDITOR");

  return (
    <Modal
      open={p.ui.popup.api.open}
      onOpenChange={(open) => {
        p.ui.popup.api.open = open;
        p.render();
      }}
    >
      <EdApiServer
        popover={{
          onClose() {
            p.ui.popup.api.open = false;
            p.render();
          },
        }}
      />
    </Modal>
  );
};

export const EdApiServer = forwardRef<
  HTMLDivElement,
  {
    popover: { onClose: () => void };
  }
>(({ popover }, ref) => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal(
    {
      api_url: p.site.config.api_url,
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
          if (vdev) {
            dev.url = vdev.url;
            dev.enabled = vdev.enabled;
          }
        }
      } catch (e) {}
      check();
    }
  );

  const url = apiUrl(p);

  const check = async () => {
    local.render();
    const res = await checkAPI(p);
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
    if (local.api_url !== p.site.config.api_url) {
      server.status = "saving";
      p.render();
      p.site.config.api_url = local.api_url;
      await p.sync.site.update(p.site.id, {
        config: { api_url: local.api_url },
      });
    }

    if (local.hasDB && local.oldDB.url !== local.db.url) {
      server.status = "saving";
      p.render();

      await apiRef[apiUrl(p)]._deploy({
        type: "db-update",
        id_site: p.site.id,
        url: local.db.url,
      });
      local.oldDB.url = local.db.url;
      p.render();
    }

    if (server.status === "saving") {
      await check();
      server.status = "ready";
      p.render();
    }
  };
  popover.onClose = update;

  return (
    <div
      ref={ref}
      className="flex flex-col w-[400px] items-stretch bg-white -mx-[8px] -my-[3px] text-[14px]"
    >
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
      <div
        className={cx(
          "flex items-stretch h-[30px] border border-t-0",
          dev.enabled ? " bg-green-50" : ""
        )}
      >
        <div
          className={cx(
            "border cursor-pointer m-1 mr-0 flex items-center px-2 space-x-1 w-[70px] justify-center",
            !dev.enabled
              ? "hover:bg-green-50 hover:border-green-700 hover:text-green-700 text-slate-500 "
              : "bg-green-700 text-white border-green-700"
          )}
          onClick={async () => {
            dev.enabled = !dev.enabled;
            localStorage.setItem("prasi-dev", JSON.stringify(dev));
            local.render();
            check();
          }}
        >
          <span>DEV</span>{" "}
          {dev.enabled && <span className="text-white">ON</span>}
          {!dev.enabled && <span className="text-slate-300">OFF</span>}
        </div>

        <input
          type="text"
          spellCheck={false}
          className={cx(
            "px-1 m-1 border flex-1 font-mono text-[11px] outline-none focus:border-blue-500",
            dev.enabled && "border-green-700"
          )}
          placeholder="http://local-dev-server"
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
          <EdApiDomain domains={local.domains} />
          <EdApiDeploy deploy={local.deploy} />
        </>
      )}
    </div>
  );
});
