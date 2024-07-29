import { format, formatDistance } from "date-fns";
import { useGlobal } from "web-utils";
import { EDGlobal } from "../../../logic/ed-global";
import { apiRef, apiUrl, server } from "./api-utils";

export const EdApiDeploy = ({
  deploy,
}: {
  deploy: {
    current: number;
    now: number;
    deploys: number[];
  };
}) => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const api = apiRef[apiUrl(p)];
  const local = deploy;
  const deploys = local.deploys;

  return (
    <div className="flex border-slate-200 boxed  flex flex-col items-stretch">
      <div className="flex justify-between py-2 px-2 ">
        <div>History:</div>
        <div
          className={cx(
            "px-1 border border-blue-500 text-blue-500 cursor-pointer hover:bg-blue-500 hover:text-white",
            server.status === "deploying" && "opacity-50"
          )}
          onClick={async () => {
            if (server.status !== "deploying") {
              server.status = "deploying";
              p.render();

              const res = await api._deploy({
                type: "deploy",
                id_site: p.site.id,
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
                  onClick={async () => {
                    if (local.current === e) return;
                    if (
                      server.status !== "deploying" &&
                      server.status !== "saving"
                    ) {
                      server.status = "deploying";
                      p.render();

                      const res = await api._deploy({
                        type: "redeploy",
                        id_site: p.site.id,
                        ts: e,
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
                  <div className="">
                    {date} · {ago}
                  </div>
                  {local.current !== e && (
                    <div className="text-slate-400 hidden deploy">Redeploy</div>
                  )}
                  {local.current === e ? (
                    <div className="text-green-800">
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
                  ) : (
                    <div
                      className="text-red-700 hidden deploy px-3 rounded-md hover:bg-red-100 -my-1 py-1 -mr-3 "
                      onClick={async (evt) => {
                        evt.stopPropagation();
                        evt.preventDefault();
                        if (!confirm("Delete this deploy ?")) return;
                        server.status = "deploying";
                        p.render();

                        const res = await api._deploy({
                          type: "deploy-del",
                          id_site: p.site.id,
                          ts: e,
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
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="13"
                        fill="none"
                        viewBox="0 0 15 15"
                      >
                        <path
                          fill="currentColor"
                          fillRule="evenodd"
                          d="M5.5 1a.5.5 0 000 1h4a.5.5 0 000-1h-4zM3 3.5a.5.5 0 01.5-.5h8a.5.5 0 010 1H11v8a1 1 0 01-1 1H5a1 1 0 01-1-1V4h-.5a.5.5 0 01-.5-.5zM5 4h5v8H5V4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
