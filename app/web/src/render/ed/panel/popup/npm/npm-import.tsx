import { useEffect } from "react";
import Select from "react-select";
import { useGlobal, useLocal } from "web-utils";
import { EDGlobal } from "../../../logic/ed-global";
import { npm_page, npm_site } from "../../../../../../../db/db";
import { EdNpmItems } from "./npm-items";
import { AlgoliaResult, searchPackage } from "./npm-algolia";
import { Popover } from "../../../../../utils/ui/popover";

export const EdNpmImport = ({ mode }: { mode: "page" | "site" }) => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal({
    bundling: false,
    search: {
      text: "",
      timeout: null as any,
      loading: false,
      result: [] as AlgoliaResult[],
      options: [] as { label: string; value: string }[],
      el: null as null | HTMLInputElement,
    },
    bundleError: "",
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
    <div className={cx("flex flex-1 flex-col items-stretch text-[14px]", mode)}>
      <div className="border-b h-[30px] relative">
        <div className="absolute inset-0 z-10 flex justify-between flex  items-stretch">
          <div className="uppercase px-2 flex items-center font-mono text-[11px]">
            {mode}
          </div>
          <Select
            noOptionsMessage={() =>
              local.search.loading ? "Loading..." : "No packages found..."
            }
            className={selectStyle}
            unstyled
            classNamePrefix={"sel"}
            placeholder="Search Packages"
            value={null}
            inputValue={local.search.text}
            openMenuOnClick={false}
            openMenuOnFocus={false}
            onInputChange={async (text) => {
              local.search.text = text;
              local.search.loading = true;
              local.render();
              clearTimeout(local.search.timeout);
              local.search.timeout = setTimeout(async () => {
                local.search.result = await searchPackage(text);
                local.search.options = [];
                for (const r of local.search.result) {
                  local.search.options.push({
                    label: `${r.name} (${r.version})`,
                    value: `${r.name}-><-${r.version}`,
                  });
                }
                local.search.loading = false;
                local.render();
              }, 500);
            }}
            onKeyDown={async (e) => {
              if (e.key === "Enter" && local.search.options.length === 0) {
                e.preventDefault();
                e.stopPropagation();

                const name = local.search.text;
                local.search.text = "";
                local.render();

                if (mode === "page") {
                  await db.npm_page.create({
                    data: {
                      id_page: p.page.cur.id,
                      module: name,
                      version: "1.0.0",
                    },
                  });
                } else {
                  await db.npm_site.create({
                    data: {
                      id_site: p.site.id,
                      module: name,
                      version: "1.0.0",
                    },
                  });
                }

                reload();
              }
            }}
            options={local.search.options}
            onChange={async (e) => {
              local.search.text = "";
              local.render();

              if (e) {
                const [name, version] = e.value.split("-><-");

                if (mode === "page") {
                  await db.npm_page.create({
                    data: { id_page: p.page.cur.id, module: name, version },
                  });
                } else {
                  await db.npm_site.create({
                    data: { id_site: p.site.id, module: name, version },
                  });
                }
                reload();
              }

              setTimeout(() => {
                const el = document.querySelector(
                  `.${mode} .sel__input`
                ) as HTMLInputElement;
                if (el) {
                  el.focus();
                  el.select();
                }
              });
            }}
          />
          <div className="w-[100px] flex items-center justify-center">
            {local.status === "init" && <>Loading...</>}
            {local.status === "ready" && (
              <Popover
                autoFocus={false}
                backdrop={false}
                content={
                  <pre className="font-mono select-text relative w-[800px] h-[300px] overflow-auto whitespace-pre-wrap text-red-500 relative">
                    <div
                      className="absolute bg-red-500 top-0 right-0 z-10 text-white px-2 cursor-pointer"
                      onClick={() => {
                        local.bundleError = "";
                        local.render();
                      }}
                    >
                      Close
                    </div>
                    <div className="absolute inset-0">
                      ERROR:
                      <hr className=" border-red-500 my-1" />
                      {local.bundleError}
                    </div>
                  </pre>
                }
                open={!!local.bundleError}
                className={cx(
                  " cursor-pointer m-1 flex items-center text-white justify-center flex-1",
                  local.bundling
                    ? "bg-slate-500"
                    : "bg-green-800 hover:bg-green-600"
                )}
              >
                <div
                  onClick={async () => {
                    if (local.bundling) return;
                    local.bundling = true;
                    local.render();

                    const res = (await api.npm_bundle(
                      mode,
                      mode === "site"
                        ? p.site.id || ""
                        : p.page
                        ? p.page.cur.id
                        : ""
                    )) as any;

                    local.bundleError = "";
                    if (typeof res === "object") {
                      if (res && res.errors && Array.isArray(res.errors)) {
                        const errors: string[] = [];
                        res.errors.forEach((e: any) => {
                          errors.push(
                            `${e.text}\n${e.location?.lineText || ""}`
                          );
                        });
                        local.bundleError = errors.join("\n\n");
                      }
                    } else {
                      local.size = parseInt(res) || 0;
                    }

                    local.bundling = false;
                    local.render();
                  }}
                >
                  {local.bundling ? "Bundling..." : "Bundle"}
                </div>
              </Popover>
            )}
          </div>
          <div className="px-2 flex items-center font-mono border-l text-[10px]">
            {formatBytes(local.size)}
          </div>
        </div>
      </div>
      {local.list.length > 0 && (
        <EdNpmItems
          bundled={local.size > 0}
          list={local.list}
          mode={mode}
          update={(list) => {
            local.list = list;
            local.render();
          }}
        />
      )}
      {local.list.length === 0 && (
        <div className="flex items-center justify-center flex-1 flex-col space-y-2">
          <div
            className="w-[50px]"
            dangerouslySetInnerHTML={{
              __html: `<?xml version="1.0" encoding="utf-8"?><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 117.85" style="enable-background:new 0 0 122.88 117.85" xml:space="preserve"><g><path d="M60.05,68.41L18.02,46.33L6.2,60.47c14.91,7.88,29.82,15.76,44.74,23.65L60.05,68.41L60.05,68.41z M63.3,23.47L21.12,44.39 L62.24,66l41.2-21.65L79.81,31.99L63.3,23.47L63.3,23.47z M15.89,43.95L0.39,29.27c-0.57-0.65-0.51-1.65,0.15-2.23 c0.09-0.08,0.2-0.15,0.3-0.21L47.95,0.18c0.75-0.4,1.68-0.12,2.1,0.61l13.23,18.22L72.1,2.49c0.41-0.77,1.36-1.07,2.13-0.66 l47.8,25.27c0.14,0.08,0.27,0.17,0.39,0.29c0.61,0.62,0.6,1.62-0.02,2.23l-14.16,13.91l13.71,16.41c0.56,0.67,0.47,1.67-0.2,2.22 c-0.1,0.08-0.21,0.15-0.32,0.21l-12.31,6.51v24.4c0,0.66-0.4,1.22-0.98,1.46l-44.51,22.59c-0.29,0.32-0.71,0.52-1.17,0.52 c-0.62,0-1.15-0.35-1.41-0.87l-44.59-22.3c-0.55-0.28-0.87-0.83-0.87-1.41L15.59,69L3.05,62.37c-0.11-0.06-0.22-0.13-0.32-0.21 c-0.67-0.56-0.76-1.56-0.2-2.22L15.89,43.95L15.89,43.95z M60.84,21.06L48.11,3.67L4.07,28.7L18.46,42.1L60.84,21.06L60.84,21.06z M65.75,21.08l14.75,7.72l25.08,12.93l13.07-12.84L74.15,5.35L65.75,21.08L65.75,21.08z M106.47,46.33L64.44,68.41l9.11,15.7 l44.74-23.65L106.47,46.33L106.47,46.33z"/></g></svg>`,
            }}
          ></div>
          <div>
            No package for {mode === "site" ? "whole site" : "current page"}
          </div>
        </div>
      )}
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
    border-bottom: 1px solid blue;
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
  }
  .sel__option--is-selected,
  .sel__option--is-focused {
    background: #e0e9fa;
  }
  .sel__indicator {
    width: 15px;
    opacity: 0.7;
  }
  .sel__placeholder {
    color: #ccc;
  }
`;
