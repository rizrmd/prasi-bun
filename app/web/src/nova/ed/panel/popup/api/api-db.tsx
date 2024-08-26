import { useGlobal, useLocal } from "web-utils";
import { AutoHeightTextarea } from "../../../../../utils/ui/auto-textarea";
import { EDGlobal } from "../../../logic/ed-global";
import { apiRef, apiUrl, server } from "./api-utils";
import { useEffect } from "react";

export const EdApiDB = ({
  db,
  render,
  update,
  api_url,
}: {
  db: { url: string };
  api_url: string;
  render: () => void;
  update: () => void;
}) => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal({ url: db.url, has_prisma: false });
  const api = apiRef[api_url];

  let is_main = true;
  if (apiUrl(p) !== api_url) {
    is_main = false;
  }

  useEffect(() => {
    _api.local_prisma("check", p.site.id).then((res: any) => {
      if (typeof res === "boolean") {
        local.has_prisma = res;
        local.render();
      }
    });
  }, []);

  return (
    <div className="flex border-b py-2 px-2 border-slate-300 boxed flex-col items-stretch">
      <AutoHeightTextarea
        value={local.url}
        className="text-[13px] border p-2 mb-2 "
        onChange={async (e) => {
          local.url = e.currentTarget.value.replace(/\s/, "");
          db.url = local.url;

          await api._deploy({
            type: "db-update",
            id_site: p.site.id,
            url: db.url,
          });
          local.render();
        }}
        onBlur={async () => {
          update();
        }}
        spellCheck={false}
      />
      <div className="flex flex-col items-stretch justify-center h-[20px]">
        {server.status === "saving" ||
        server.status === "pulling" ||
        server.status === "syncing" ||
        server.status === "deploying" ||
        server.status === "restarting" ? (
          <div className="flex justify-between">
            <div className="px-2 text-[12px] text-blue-500 capitalize">
              {server.status}...
            </div>
          </div>
        ) : (
          <div className="flex justify-between select-none">
            <div className="flex space-x-1">
              {local.has_prisma ? (
                <>
                  <div
                    className="border rounded-sm px-2 text-[12px] hover:bg-blue-100 cursor-pointer"
                    onClick={async () => {
                      server.status = "syncing";
                      render();

                      await api._deploy({
                        type: "db-sync",
                        id_site: p.site.id,
                        url: `${location.protocol}//${location.host}/local-prisma/src/${p.site.id}`,
                      });

                      await api._deploy({
                        type: "db-gen",
                        id_site: p.site.id,
                      });
                      server.status = "ready";
                      render();
                      alert("DB GENERATE: OK\nRESTART: OK");

                      if (is_main) {
                        localStorage.removeItem(`schema-md-${p.site.id}`);
                        _api.clear_route_cache(p.site.id);
                        _api.type_rebuild(p.site.id);

                        location.reload();
                      }
                    }}
                  >
                    Sync & Generate prisma.schema
                  </div>
                </>
              ) : (
                <div
                  className="border rounded-sm px-2 text-[12px] hover:bg-blue-100 cursor-pointer"
                  onClick={async () => {
                    server.status = "pulling";
                    render();
                    await api._deploy({
                      type: "db-pull",
                      id_site: p.site.id,
                    });
                    server.status = "ready";
                    render();
                    alert("DB PULL & GENERATE: OK\nRESTART: OK");

                    if (is_main) {
                      localStorage.removeItem(`schema-md-${p.site.id}`);
                      _api.clear_route_cache(p.site.id);
                      _api.type_rebuild(p.site.id);
                      location.reload();
                    }
                  }}
                >
                  DB Pull
                </div>
              )}
            </div>
            <div
              className="border rounded-sm px-2 text-[12px] hover:bg-blue-100 cursor-pointer"
              onClick={async () => {
                server.status = "restarting";
                render();

                await api._deploy({
                  type: "restart",
                  id_site: p.site.id,
                });
                server.status = "ready";
                render();
                alert("RESTART: OK");

                if (is_main) {
                  _api.clear_route_cache(p.site.id);
                  location.reload();
                }
              }}
            >
              Restart Server
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
