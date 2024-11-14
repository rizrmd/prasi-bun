import { format, formatDistance } from "date-fns";
import { useGlobal, useLocal } from "web-utils";
import { EDGlobal } from "../../../logic/ed-global";
import { apiRef, apiUrl, server } from "./api-utils";
import { ChevronDown } from "../../tree/node/item/indent";
import { Menu, MenuItem } from "../../../../../utils/ui/context-menu";
import { apiProxy } from "../../../../../base/load/api/api-proxy";

export const EdApiDeploy = ({
  deploy,
  api_url,
}: {
  api_url: string;
  deploy: {
    current: number;
    now: number;
    deploys: number[];
  };
}) => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const api = apiRef[api_url];
  const local = deploy;
  const deploys = local.deploys;
  const internal = useLocal({
    open: null as any,
    redeploy: false,
    delete: false,
    deploy_to: null as any,
    ts: -1,
  });

  return (
    <div className="flex border-slate-200 boxed  flex-col items-stretch">
      <div className="flex justify-between py-2 px-2 ">
        <div>History:</div>
        <div className="flex items-center space-x-1">
          <div
            className={cx(
              "px-1 border select-none border-blue-500 text-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white",
              server.status === "deploying" && "opacity-50"
            )}
            onClick={async () => {
              if (server.status !== "deploying") {
                server.status = "deploying";
                p.render();

                const res = await api._deploy({
                  type: "deploy",
                  id_site: p.site.id,
                  dlurl: `${serverurl}/site-export/${p.site.id}`,
                });

                server.status = "ready";
                p.render();
                if (res && res.current && Array.isArray(res.deploys)) {
                  local.current = res.current;
                  local.deploys = res.deploys;
                  alert("DEPLOY: OK");
                } else {
                  alert("DEPLOY: FAILED");
                }
              }
            }}
          >
            {server.status === "deploying" ? "Deploying..." : "Deploy"}
          </div>
          {server.status !== "deploying" && (
            <div
              className={cx(
                "px-1 flex items-center border border-blue-500 text-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white space-x-1 select-none"
              )}
              onClick={(e) => {
                internal.deploy_to = e;
                internal.render();
              }}
            >
              <div>To</div>
              <ChevronDown />
            </div>
          )}
        </div>
      </div>
      {deploys.length === 0 && (
        <div className="flex items-center justify-center pb-4">
          No Deployment
        </div>
      )}
      <div className="overflow-auto h-[200px] relative border-t">
        <div className="absolute inset-0">
          {deploys
            .sort()
            .reverse()
            .map((e) => {
              let ago = "";
              let date = "";
              try {
                date = format(e, "yyyy-MM-dd HH:mm:ss");
                ago = formatDistance(e, local.now, { addSuffix: true });
              } catch (e) {}
              return (
                <div
                  key={e}
                  className={cx(
                    "pr-4 pl-1 py-1 hover:bg-blue-50 border-b flex justify-between items-center h-[30px] font-mono text-[10px]",
                    local.current === e
                      ? "bg-green-50 border-l-4 border-l-green-700"
                      : "border-l-4 border-l-transparent",
                    server.status !== "deploying" &&
                      server.status !== "saving" &&
                      local.current !== e
                      ? "cursor-pointer"
                      : "",
                    css`
                      &:hover {
                        .deploy {
                          display: flex;
                        }
                      }
                    `
                  )}
                >
                  <div className="flex-1">
                    {date} · {ago}
                  </div>
                  {local.current === e && (
                    <div className="text-green-800 mr-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        fill="none"
                        viewBox="0 0 15 15"
                      >
                        <path
                          fill="currentColor"
                          fillRule="evenodd"
                          d="M11.467 3.727c.289.189.37.576.181.865l-4.25 6.5a.625.625 0 01-.944.12l-2.75-2.5a.625.625 0 01.841-.925l2.208 2.007 3.849-5.886a.625.625 0 01.865-.181z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  )}

                  {local.current !== e && (
                    <div
                      className="border flex space-x-1 px-1 bg-white cursor-pointer"
                      onClick={(evt) => {
                        internal.open = evt;
                        internal.redeploy = local.current !== e;
                        internal.delete = local.current !== e;
                        internal.ts = e;
                        internal.render();
                      }}
                    >
                      <div>Action</div> <ChevronDown />
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
      {internal.deploy_to && (
        <Menu
          mouseEvent={internal.deploy_to}
          onClose={() => {
            internal.deploy_to = null;
            internal.render();
          }}
        >
          {p.ui.deploy.target.map((target) => {
            const cur = p.ui.deploy.target[p.ui.deploy.active];
            if (cur === target) return null;
            return (
              <MenuItem
                key={target.name}
                label={target.name}
                onClick={async () => {
                  server.status = "deploying";
                  p.render();

                  let target_api = apiRef[target.api_url];
                  if (!target_api) {
                    apiRef[target.api_url] = apiProxy(target.api_url);
                    target_api = apiRef[target.api_url];
                  }

                  await target_api._deploy({
                    type: "deploy",
                    id_site: p.site.id,
                    load_from: `${
                      cur.api_url || p.site.config.api_url
                    }/_deploy?export`,
                  });

                  server.status = "ready";
                  p.render();
                }}
              />
            );
          })}
        </Menu>
      )}
      {internal.open && (
        <Menu
          mouseEvent={internal.open}
          onClose={() => {
            internal.open = null;
            internal.render();
          }}
        >
          {internal.redeploy && (
            <MenuItem
              label="Re-Deploy"
              onClick={async () => {
                internal.open = null;
                internal.render();

                if (local.current === internal.ts) return;
                if (
                  server.status !== "deploying" &&
                  server.status !== "saving"
                ) {
                  server.status = "deploying";
                  p.render();

                  const res = await api._deploy({
                    type: "redeploy",
                    id_site: p.site.id,
                    ts: internal.ts,
                  });

                  server.status = "ready";
                  p.render();
                  if (res && res.current && Array.isArray(res.deploys)) {
                    local.current = res.current;
                    local.deploys = res.deploys;
                  } else {
                    alert("DEPLOY: FAILED");
                  }
                }
              }}
            />
          )}
          {internal.delete && (
            <MenuItem
              label="Delete Build"
              onClick={async (evt) => {
                internal.open = null;
                internal.render();
                evt.stopPropagation();
                evt.preventDefault();
                if (!confirm("Delete this deploy ?")) return;
                server.status = "deploying";
                p.render();

                const res = await api._deploy({
                  type: "deploy-del",
                  id_site: p.site.id,
                  ts: internal.ts,
                });

                server.status = "ready";
                p.render();
                if (res && res.current && Array.isArray(res.deploys)) {
                  local.current = res.current;
                  local.deploys = res.deploys;
                } else {
                  alert("DELETE: FAILED");
                }
              }}
            />
          )}
        </Menu>
      )}
    </div>
  );
};
