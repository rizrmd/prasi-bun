import { useGlobal, useLocal } from "web-utils";
import { EdMonaco } from "./monaco/monaco";
import { EDGlobal, active } from "../../logic/ed-global";
import { compress } from "wasm-gzip";
import { jscript } from "../../../../utils/script/jscript";
import { Activity } from "../../../../../../srv/ws/sync/type";

export const EdScriptSite = () => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal({ timeout: null as any });
  if (!p.ui.script.site) {
    return null;
  }

  return (
    <EdMonaco
      id="script-site"
      type="js"
      filename="site.tsx"
      monaco={{
        value: p.site.js,
        onChange: async (v) => {
          if (jscript.build) {
            const src = v || "";
            const built = await jscript.build("site.tsx", src);

            p.site.js = src;
            p.site.js_compiled = built;
            // todo: re-run site js

            clearTimeout(local.timeout);
            local.timeout = setTimeout(async () => {
              await p.sync.site.js(
                p.site.id,
                Buffer.from(compress(src)),
                Buffer.from(compress(built))
              );
            }, 1000);
          }
        },
      }}
      prop={{
        types: {
          exports: "any",
          types: "any",
          render: "()=>void",
        },
      }}
      onClose={() => {
        p.ui.script.site = false;
        p.sync.activity(
          { page_id: p.page.cur.id, item_id: "site" },
          "js",
          Activity.Null
        );
        p.render();
      }}
    />
  );
};
