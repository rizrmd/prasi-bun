import { useEffect } from "react";
import Select from "react-select";
import { useGlobal, useLocal } from "web-utils";
import { EDGlobal } from "../../../logic/ed-global";
import { npm_page, npm_site } from "../../../../../../../db/db";
import { EdNpmItems } from "./npm-items";

export const EdNpmImport = ({ mode }: { mode: "page" | "site" }) => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal({
    search: "",
    status: "init" as "init" | "ready",
    size: 0,
    list: [] as (npm_page | npm_site)[],
  });

  const reload = async () => {
    if (mode === "page") {
      local.list = await db.npm_page.findMany({
        where: { id_page: p.page.cur.id },
      });
    } else if (mode === "site") {
      local.list = await db.npm_site.findMany({
        where: { id_site: p.site.id },
      });
    }

    const size = await api.npm_size(
      mode,
      mode === "site" ? p.site.id || "" : p.page.cur.id
    );
    local.size = parseInt(size) || 0;
    local.status = "ready";
    local.render();
  };
  useEffect(() => {
    reload();
  }, [mode === "page" ? p.page.cur.id : p.site.id]);

  return (
    <div className="flex flex-1 flex-col items-stretch text-[14px]">
      <div className="border-b h-[30px] relative">
        <div className="absolute inset-0 z-10 flex justify-between flex  items-stretch">
          <div className="uppercase px-2 flex items-center font-mono text-[11px]">
            {mode}
          </div>
          <Select
            noOptionsMessage={() => "No packages found"}
            className={selectStyle}
            unstyled
            classNamePrefix={"sel"}
            placeholder="Search Packages"
            inputValue={local.search}
            openMenuOnClick={false}
            openMenuOnFocus={false}
            onInputChange={(text) => {
              local.search = text;
              local.render();
            }}
            onChange={() => {}}
          />
          <div className="w-[100px] flex items-center justify-center">
            {local.status === "init" && <>Loading...</>}
            {local.status === "ready" && (
              <div className="bg-green-800 cursor-pointer hover:bg-green-600 m-1 flex items-center text-white justify-center flex-1">
                Bundle
              </div>
            )}
          </div>
          <div className="px-2 flex items-center font-mono border-l text-[10px]">
            {formatBytes(local.size)}
          </div>
        </div>
      </div>
      <EdNpmItems
        bundled={local.size > 0}
        list={local.list}
        mode={mode}
        update={(list) => {
          local.list = list;
          local.render();
        }}
      />
    </div>
  );
};

function formatBytes(bytes: number, decimals?: number) {
  if (bytes == 0) return "0 B";
  var k = 1024,
    dm = decimals || 2,
    sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

const selectStyle = css`
  flex: 1;

  .sel__control {
    border: 0px;
    border-radius: 0px;
    outline: none;
    min-height: 29px;
    border-left: 1px solid #ececeb;
    border-right: 1px solid #ececeb;
  }
  .sel__control--is-focused {
    box-shadow: none !important;
  }
  .sel__menu {
    border-radius: 0px;
    background: white;
    border: 1px solid #ececeb;
  }
  .sel__value-container {
    padding-left: 5px;
  }
  .sel__option {
    padding: 2px 5px;
    border-bottom: 1px solid #ececeb;
    &:hover {
      background: #e0e9fa;
    }
  }
  .sel__indicator {
    width: 15px;
    opacity: 0.7;
  }
  .sel__placeholder {
    color: #ccc;
  }
`;
