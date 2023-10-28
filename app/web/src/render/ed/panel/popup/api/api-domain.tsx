import trim from "lodash.trim";
import { useGlobal } from "web-utils";
import { EDGlobal } from "../../../logic/ed-global";
import { apiRef, apiUrl, server } from "./api-utils";

export const EdApiDomain = ({ domains }: { domains: string[] }) => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const api = apiRef[apiUrl(p)];

  return (
    <div className="flex border-b py-2 px-2 border-slate-300 boxed  flex items-center space-x-1">
      <div>Domains:</div>
      {domains.map((e) => {
        return (
          <div className="border flex items-stretch" key={e}>
            <a
              className="border-r flex items-center px-1 hover:underline hover:text-blue-500"
              href={e}
              target="_blank"
            >
              {e}
            </a>
            <div
              className="flex items-center px-1 cursor-pointer hover:bg-red-500 hover:text-white text-red-500"
              onClick={async () => {
                if (confirm("Remove this domain ?")) {
                  server.status = "saving";
                  p.render();

                  await api._deploy({
                    type: "domain-del",
                    id_site: p.site.id,
                    domain: e,
                  });
                  const idx = domains.indexOf(e);
                  domains.splice(idx, 1);
                  server.status = "ready";
                  p.render();
                }
              }}
            >
              &times;
            </div>
          </div>
        );
      })}
      <div
        className="px-1 border cursor-pointer hover:bg-blue-100"
        onClick={async () => {
          const name = trim(
            prompt("New Domain (include https://)", `https://`) || "",
            "/ "
          );
          if (name) {
            server.status = "saving";
            p.render();

            await api._deploy({
              type: "domain-add",
              id_site: p.site.id,
              domain: name,
            });
            domains.push(name);
            server.status = "ready";
            p.render();
          }
        }}
      >
        + New
      </div>
    </div>
  );
};
