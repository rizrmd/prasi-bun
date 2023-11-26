import { useGlobal } from "web-utils";
import { Loading } from "../../../../utils/ui/loading";
import { View } from "../../../view/view";
import { EDGlobal, active } from "../../logic/ed-global";
import { compLoaded } from "../../logic/tree/build";
import { loadComponent } from "../../logic/tree/sync-walk";
import { code } from "../popup/code/code";

export const EdMain = () => {
  const p = useGlobal(EDGlobal, "EDITOR");
  return (
    <div
      className={cx(
        "flex flex-1 relative",
        css`
          contain: content;
        `
      )}
    >
      <div className="absolute overflow-auto inset-0">
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
                await loadComponent(p, id_comp, compLoaded);
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
                p.render();
                p.page.render();
              },
            }}
          />
        )}
      </div>
    </div>
  );
};
