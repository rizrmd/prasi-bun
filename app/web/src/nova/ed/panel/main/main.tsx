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
            hidden={(item) => {
              if (item.hidden) return true;
              return false;
            }}
            hover={{
              get(item) {
                return active.hover_id === item.id;
              },
              set(id) {
                active.hover_id = id;
                p.render();
                p.page.render();
              },
            }}
            active={{
              get(item) {
                return active.item_id === item.id;
              },
              set(id) {
                active.item_id = id;


                const meta = getMetaById(p, id);
                if (meta.item.type === 'text') {
                  setTimeout(async () => {
                    await waitUntil(() => document.querySelector(`.v-text-${id}`))
                    const vtext = document.querySelector(`.v-text-${id}`) as HTMLInputElement;
                    if (vtext)
                      vtext.focus()
                  })
                }
                p.render();
                p.page.render();
              },
              text(item, className) {
                if (active.text.id !== item.id) {
                  active.text.id = item.id;
                  active.text.content = item.html;
                }


                return <div
                  className={cx(className, `v-text-${item.id} outline-none`)}
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
                  dangerouslySetInnerHTML={{ __html: item.html }}></div>
              }
            }}
          />
        )}
      </div>
    </div>
  );
};
