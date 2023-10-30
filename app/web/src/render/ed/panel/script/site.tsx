import { compress } from "wasm-gzip";
import { useGlobal, useLocal } from "web-utils";
import { Activity } from "../../../../../../srv/ws/sync/type";
import { jscript } from "../../../../utils/script/jscript";
import { EDGlobal } from "../../logic/ed-global";
import { EdUserConn } from "../activity/user-conn";
import { EdMonaco } from "./monaco/monaco";

export const EdScriptSite = () => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal({ timeout: null as any });
  const userOpened = Object.keys(p.activity.page.site?.js || {});

  // if (!p.ui.script.site) {
  //   return null;
  // }

  return (
    <EdMonaco
      id="script-site"
      type="js"
      filename="site.tsx"
      header={
        userOpened.length > 1 ? (
          <div className="border-b px-2 min-h-[35px] flex items-center text-sm bg-orange-600 text-white">
            WARNING:
            <EdUserConn
              client_ids={userOpened.filter((e) => e !== p.user.client_id)}
            />
            also open this script. Editing may cause conflicts.
          </div>
        ) : undefined
      }
      monaco={{
        value: p.site.js,
        onChange: async (v) => {
          if (jscript.build) {
            const src = v || "";
            const built = await jscript.build("site.tsx", src);

            p.site.js = src;
            p.site.js_compiled = built;

            clearTimeout(local.timeout);
            local.timeout = setTimeout(async () => {
              await p.sync.site.update(p.site.id, {
                js: Buffer.from(compress(src)),
                js_compiled: Buffer.from(compress(built)),
              });
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
        // p.ui.script.site = false;
        // p.sync.activity(
        //   { page_id: p.page.cur.id, item_id: "site" },
        //   "js",
        //   Activity.Null
        // );
        // p.render();
      }}
    />
  );
};
