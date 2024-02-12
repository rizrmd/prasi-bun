import { useGlobal, useLocal } from "web-utils";
import { EDGlobal } from "../../logic/ed-global";
import { FC, useEffect } from "react";
import { decompress } from "wasm-gzip";
import { Vi } from "../../../vi/vi";
import { genMeta } from "../../../vi/meta/meta";
import { IRoot } from "../../../../utils/types/root";
import { IContent } from "../../../../utils/types/general";
import { initLoadComp } from "../../../vi/meta/comp/init-comp-load";
import { loadCompSnapshot } from "../../logic/comp/load";
import { IItem } from "../../../../utils/types/item";
import { mainStyle } from "./main";
import { Loading } from "../../../../utils/ui/loading";
import { treeRebuild } from "../../logic/tree/build";

const decoder = new TextDecoder();
export const EdPageHistoryMain: FC<{}> = ({}) => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal({
    loading: true,
    root: null as any,
    meta: {} as any,
    entry: [] as any,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    local.loading = true;
    local.render();
    _db.page_history
      .findFirst({
        where: { id: p.page.history.id },
        select: {
          content_tree: true,
        },
      })
      .then(async (e) => {
        if (e) {
          const zip = new Uint8Array((e.content_tree as any).data);
          const root = JSON.parse(decoder.decode(decompress(zip))) as IRoot;
          local.root = root;
          await initLoadComp(
            {
              comps: p.comp.loaded,
              meta: local.meta,
              mode: "page",
            },
            root as unknown as IItem,
            {
              async load(comp_ids) {
                if (!p.sync) return;

                const ids = comp_ids.filter((id) => !p.comp.loaded[id]);
                const comps = await p.sync.comp.load(ids, true);
                let result = Object.entries(comps);

                for (const [id_comp, comp] of result) {
                  if (comp && comp.snapshot && !p.comp.list[id_comp]) {
                    if (!p.comp.loaded[id_comp]) {
                      await loadCompSnapshot(p, id_comp, comp.snapshot);
                    }
                  }
                }
              },
            }
          );

          local.meta = {};
          local.entry = [];
          for (const item of root.childs) {
            local.entry.push(item.id);
            genMeta(
              {
                note: "cache-rebuild",
                comps: p.comp.loaded,
                meta: local.meta,
                mode: "page",
              },
              { item: item as IContent }
            );
          }

          local.loading = false;
          local.render();
          p.render();
        }
      });
  }, [p.page.history.id]);

  return (
    <div className="flex flex-1 flex-col items-stretch">
      <div className="border-b p-1 text-sm flex">
        <div
          className="border px-2 cursor-pointer hover:bg-blue-200 border border-blue-700 hover:bg-blue-700 hover:text-white transition-all "
          onClick={async () => {
            if (confirm("Are you sure ?")) {
              p.page.history.id = "";
              p.page.history.show = false;

              p.page.doc?.transact(() => {
                const root = p.page.doc?.getMap("map").get("root");

                if (root) {
                  syncronize(root as any, local.root);
                }
              });

              p.render();
            }
          }}
        >
          Revert to this version
        </div>
      </div>
      <div
        className={cx(
          "flex flex-1 relative overflow-auto",
          p.mode === "mobile" ? "flex-col items-center" : ""
        )}
        ref={(el) => {
          if (el) {
            const bound = el.getBoundingClientRect();
            if (local.width !== bound.width || local.height !== bound.height) {
              local.width = bound.width;
              local.height = bound.height;
              local.render();
            }
          }
        }}
      >
        {local.loading ? (
          <Loading backdrop={true} />
        ) : (
          <div className={mainStyle(p, local.meta)}>
            <Vi
              meta={local.meta}
              mode={p.mode}
              api_url={p.site.config.api_url}
              site_id={p.site.id}
              page_id={p.page.cur.id}
              entry={local.entry}
              api={p.script.api}
              db={p.script.db}
              script={{ init_local_effect: p.script.init_local_effect }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
