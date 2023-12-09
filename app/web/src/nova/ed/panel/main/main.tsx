import { useEffect } from "react";
import { useGlobal } from "web-utils";
import { Loading } from "../../../../utils/ui/loading";
import { View } from "../../../view/view";
import { EDGlobal, EdMeta, active } from "../../logic/ed-global";
import { getMetaById } from "../../logic/tree/build";
import { loadComponent } from "../../logic/tree/sync-walk";
import { code } from "../popup/code/code";

export const EdMain = () => {
  const p = useGlobal(EDGlobal, "EDITOR");
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
              scope: p.page.scope,
            }}
            site_id={p.site.id}
            page_id={p.page.cur.id}
            bind={({ render }) => {
              p.page.render = render;
            }}
            hidden={(meta) => {
              if (meta.item.hidden) return true;
              return false;
            }}
            hover={{
              get(meta) {
                return active.hover_id === meta.item.id;
              },
              set(meta) {
                const outer = getOuterItem(meta);
                if (outer) {
                  active.hover_id = outer.id;
                }

                p.render();
                p.page.render();
              },
            }}
            active={{
              get(meta) {
                return active.item_id === meta.item.id;
              },
              set(meta) {
                const outer = getOuterItem(meta);
                if (outer) {
                  active.item_id = outer.id;
                }

                p.render();
                p.page.render();
                focus();
              },
              text({ meta }) {
                const { item } = meta;

                useEffect(() => {
                  return () => {
                    active.text.id = "";
                    p.render();
                  };
                }, []);

                const updateWithTimeout = (timeout: number) => {
                  return new Promise<void>((resolve) => {
                    const saving = {
                      id: active.text.id,
                      content: active.text.content,
                    };

                    clearTimeout(active.text.timeout);
                    active.text.timeout = setTimeout(() => {
                      const meta = getMetaById(p, saving.id);
                      if (meta && meta.mitem) {
                        meta.mitem.set("html", saving.content);
                      }
                      resolve();
                    }, timeout);
                  });
                };

                if (active.text.id !== item.id) {
                  clearTimeout(active.text.timeout);
                  active.text.id = item.id;
                  active.text.content = item.html || "";
                  active.text.el = (
                    <div
                      className={cx(
                        `v-text-${item.id} v-text-${item.originalId} outline-none`
                      )}
                      ref={(ref) => {
                        if (ref !== document.activeElement && ref) {
                          const renaming =
                            document.querySelector(".rename-item");
                          const modals = document.querySelectorAll(
                            "[data-floating-ui-portal]"
                          );
                          if (modals.length === 0 && !renaming) {
                            ref.focus();
                            setEndOfContenteditable(ref);
                          }
                        }
                      }}
                      onPointerDownCapture={(e) => {
                        e.stopPropagation();
                      }}
                      contentEditable
                      spellCheck={false}
                      onInput={(e) => {
                        const val = e.currentTarget.innerHTML;
                        item.html = val;
                        active.text.id = item.id;
                        active.text.content = val;
                        updateWithTimeout(100);
                      }}
                      dangerouslySetInnerHTML={{ __html: item.html || "" }}
                    ></div>
                  );
                }

                return active.text.el;
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

const getOuterItem = (meta: EdMeta) => {
  let cur: undefined | EdMeta = meta;
  while (cur.parent_mcomp) {
    cur = cur.parent_mcomp.meta;
  }

  return cur.item;
};

function setEndOfContenteditable(div: any) {
  let range: any, sel: any;
  if (document.createRange) {
    //Firefox, Chrome, Opera, Safari, IE 9+
    range = document.createRange();
    range.selectNodeContents(div);
    sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }
}
