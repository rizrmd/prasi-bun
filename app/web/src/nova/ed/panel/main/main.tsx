import { useGlobal, waitUntil } from "web-utils";
import { Loading } from "../../../../utils/ui/loading";
import { View } from "../../../view/view";
import { EDGlobal, active } from "../../logic/ed-global";
import { loadComponent } from "../../logic/tree/sync-walk";
import { code } from "../popup/code/code";
import { getMetaById } from "../../logic/tree/build";

export const EdMain = () => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const root = p.page.tree.find((e) => e.parent === "root");
  return (
    <div
      className={cx(
        "flex flex-1 relative overflow-auto ",
        css`
          contain: content;
        `
      )}
    >
      <div className="absolute inset-0 flex flex-col">
        {!!p.page.building && <Loading backdrop={false} />}
        {!p.page.building && code.mode !== "" && (
          <View
            mode={p.mode}
            code_mode={code.mode}
            layout={{ show: false }}
            isEditor={true}
            api_url={p.site.config.api_url}
            component={{
              async load(id_comp) {
                await loadComponent(p, id_comp);
              },
            }}
            load={{
              mode: "tree_meta",
              meta: p.page.meta,
              entry: p.page.entry,
            }}
            site_id={p.site.id}
            page_id={p.page.cur.id}
            bind={({ render }) => {
              p.page.render = render;
            }}
            hidden={(meta) => {
              if (meta.item.hidden) return true
              return false;
            }}
            hover={{
              get(meta) {
                const item = meta.item;

                if (item.originalId === active.hover_id || item.id === active.hover_id)
                  return true;

                return false
              },
              set(meta) {

                if (meta.parent_mcomp) {
                  const id = meta.parent_mcomp.mitem.get('id');

                  if (active.instance.item_id !== id) {
                    const original_id = meta.parent_mcomp.mitem.get('originalId');

                    if (active.comp_id && original_id) {
                      active.item_id = original_id;
                    } else if (id) {
                      active.item_id = id;
                    }

                    p.render();
                    p.page.render();
                    return;
                  }
                }

                if (active.comp_id) {
                  if (meta.item.originalId) {
                    active.hover_id = meta.item.originalId;
                  } else {
                    console.error('Failed to hover, original id not found');
                  }
                } else {
                  active.hover_id = meta.item.id
                }

                p.render();
                p.page.render();
              },
            }}
            active={{
              get(meta) {
                const item = meta.item;

                if (item.originalId === active.item_id || item.id === active.item_id)
                  return true;

                return false
              },
              set(meta) {

                if (meta.parent_mcomp) {
                  const id = meta.parent_mcomp.mitem.get('id');

                  if (active.instance.item_id !== id) {
                    const original_id = meta.parent_mcomp.mitem.get('originalId');

                    if (active.comp_id && original_id) {
                      active.item_id = original_id;
                    } else if (id) {
                      active.item_id = id;
                    }

                    p.render();
                    p.page.render();
                    return;
                  }
                }

                if (active.comp_id) {
                  if (meta.item.originalId) {
                    active.item_id = meta.item.originalId;
                  } else {
                    console.error('Failed to select, original id not found');
                  }
                } else {
                  active.item_id = meta.item.id
                }

                p.render();
                p.page.render();
              },
              text(meta) {
                const { item } = meta;
                if (active.text.id !== item.id) {
                  active.text.id = item.id;
                  active.text.content = item.html || "";
                }

                return <div
                  className={cx(`v-text-${item.id} outline-none`)}
                  contentEditable
                  autoFocus
                  spellCheck={false}
                  onInput={(e) => {
                    const val = e.currentTarget.innerHTML;
                    active.text.id = item.id;
                    active.text.content = val;
                  }}
                  onBlur={() => {
                    const meta = getMetaById(p, item.id);
                    if (meta && meta.mitem && active.text.id === item.id) {
                      meta.mitem.set('html', active.text.content)
                    }
                  }}
                  dangerouslySetInnerHTML={{ __html: item.html || "" }}></div>
              }
            }}
          />
        )}
      </div>
    </div>
  );
};
