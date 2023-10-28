import { useGlobal } from "web-utils";
import { AutoHeightTextarea } from "../../../../../utils/ui/auto-textarea";
import { EDGlobal } from "../../../logic/ed-global";
import { apiRef, apiUrl, server } from "./api-utils";

export const EdApiDB = ({
  db,
  render,
  update,
}: {
  db: { url: string };
  render: () => void;
  update: () => void;
}) => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const api = apiRef[apiUrl(p)];
  return (
    <div className="flex border-b py-2 px-2 border-slate-300 boxed  flex flex-col items-stretch">
      <AutoHeightTextarea
        value={db.url}
        className="text-[12px] border p-2 mb-2 "
        onChange={(e) => {
          db.url = e.currentTarget.value;
          p.render();
        }}
        onBlur={async () => {
          update();
        }}
      />
      <div className="flex flex-col items-stretch justify-center h-[20px]">
        {server.status === "saving" ||
        server.status === "pulling" ||
        server.status === "deploying" ||
        server.status === "restarting" ? (
          <div className="flex justify-between">
            <div className="px-2 text-[12px] text-blue-500 capitalize">
              {server.status}...
            </div>
          </div>
        ) : (
          <div className="flex justify-between">
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
              }}
            >
              DB Pull
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
