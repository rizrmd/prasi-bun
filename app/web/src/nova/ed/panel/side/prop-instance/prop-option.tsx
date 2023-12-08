import { FC } from "react";
import { useGlobal, useLocal } from "web-utils";
import { createAPI, createDB } from "../../../../../utils/script/init-api";
import { FMCompDef, FNCompDef } from "../../../../../utils/types/meta-fn";
import { EDGlobal } from "../../../logic/ed-global";
import { EdPropLabel } from "./prop-label";

export const EdPropInstanceOptions: FC<{
  name: string;
  mprop: FMCompDef;
}> = ({ name, mprop }) => {
  const prop = mprop.toJSON() as FNCompDef;
  const local = useLocal({
    codeEditing: false,
    loading: false,
    loaded: false as any,
    isOpen: false,
    val: "",
    metaFn: null as null | (() => Promise<{ label: string; value: any }[]>),
  });
  const p = useGlobal(EDGlobal, "EDITOR");

  let metaOptions: { label: string; value: any }[] = [];

  if (prop.meta?.options || prop.meta?.optionsBuilt) {
    if (!local.loaded) {
      try {
        if (p.site.config.api_url) {
          if (!p.script.db) p.script.db = createDB(p.site.config.api_url);
          if (!p.script.api) p.script.api = createAPI(p.site.config.api_url);
        }

        const args = {
          ...window.exports,
          db: p.script.db,
          api: p.script.api,
        };
        eval(`
${Object.entries(args)
  .map((e) => `const ${e[0]} = args["${e[0]}"]`)
  .join(";\n")}
const resOpt = ${prop.meta.optionsBuilt || prop.meta.options};
if (typeof resOpt === 'function')  local.metaFn = resOpt;
else metaOptions = resOpt;
`);
      } catch (e) {
        console.error(e);
      }
    } else {
      metaOptions = local.loaded;
    }

    if (local.metaFn && !local.loaded && !local.loading) {
      local.loading = true;
      local.metaFn().then((e) => {
        local.loading = false;
        local.loaded = e;
        local.render();
      });
    }
  }

  let evalue: any = null;
  try {
    eval(`evalue = ${prop.value}`);
  } catch (e) {}

  let mode = prop.meta?.option_mode;
  if (!mode) mode = "button";
  return (
    <div className="flex items-center min-h-[28px]">
      <EdPropLabel name={name} />
      <div className="flex flex-1 justify-end">
        {mode === "button" && (
          <div className="flex-1 pt-1 px-2 flex flex-wrap justify-end space-x-1">
            {Array.isArray(metaOptions) &&
              metaOptions.map((item, idx) => {
                return (
                  <div
                    key={idx}
                    className={cx(
                      "flex px-2 text-xs mb-1 border rounded-sm cursor-pointer  justify-center ",
                      item.value !== evalue
                        ? "bg-white  text-blue-700 hover:bg-blue-50 hover:border-blue-500"
                        : "bg-blue-700 text-white border-blue-700"
                    )}
                    onClick={() => {}}
                  >
                    {item.label}
                  </div>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
};
