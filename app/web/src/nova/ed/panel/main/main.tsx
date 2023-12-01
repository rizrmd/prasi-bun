import { useGlobal } from "web-utils";
import { Loading } from "../../../../utils/ui/loading";
import { View } from "../../../view/view";
import { EDGlobal, active } from "../../logic/ed-global";
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
                      active.hover_id = original_id;
                    } else if (id) {
                      active.hover_id = id;
                    }

                    p.render();
                    p.page.render();
                    focus();

                    return;
                  }
                }

                if (active.comp_id) {
                  const parent = meta.parent_mcomp;
                  if (parent) {
                    const mcomp = parent.mcomp;
                    if (mcomp.get('component')?.get('id') === active.comp_id) {
                      active.hover_id = meta.item.originalId || meta.item.id;
                    }
                  } else {
                    active.hover_id = meta.item.id;
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

                    let active_id = ""
                    if (active.comp_id && original_id) {
                      active_id = original_id;
                    } else if (id) {
                      active_id = id;
                    }

                    if (active_id) {
                      if (active.item_id !== active_id) {
                        active.item_id = active_id;
                      } else {
                        const comp_id = meta.parent_mcomp.mcomp.get('component')?.get('id');
                        if (comp_id) {
                          active.instance.item_id = active_id;
                          active.instance.comp_id = active.comp_id;

                          active.comp_id = comp_id || "";
                          const root = p.comp.list[comp_id].tree.find(
                            (e) => e.parent === "root"
                          );
                          if (root && typeof root.id === "string") {
                            active.item_id = root.id || "";
                          }
                        }
                      }
                    }

                    p.render();
                    p.page.render();
                    focus();

                    return;
                  }
                }

                if (active.comp_id) {
                  const parent = meta.parent_mcomp;
                  if (parent) {
                    const mcomp = parent.mcomp;
                    if (mcomp.get('component')?.get('id') === active.comp_id) {
                      active.item_id = meta.item.originalId || meta.item.id;
                    }
                  } else {
                    active.comp_id = "";
                    active.item_id = meta.item.id;
                    active.instance.item_id = "";
                    active.instance.comp_id = "";
                  }
                } else {
                  active.item_id = meta.item.id
                }

                p.render();
                p.page.render();
                focus();

              },
              text(meta) {
                const { item } = meta;
                if (active.text.id !== item.id) {
                  active.text.id = item.id;
                  active.text.content = item.html || "";
                }

                return <div
                  className={cx(`v-text-${item.id} v-text-${item.originalId} outline-none`)}
                  ref={(ref) => {
                    if (ref !== document.activeElement && ref) {
                      const renaming = document.querySelector('.rename-item');
                      const modals = document.querySelectorAll('[data-floating-ui-portal]');
                      if (modals.length === 0 && !renaming) {
                        ref.focus();
                        setEndOfContenteditable(ref)
                      }
                    }
                  }}
                  contentEditable
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

function setEndOfContenteditable(div: any) {
  let range: any, sel: any;
  if (document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
  {
    range = document.createRange();
    range.selectNodeContents(div);
    sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }
}