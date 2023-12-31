import { NodeModel } from "@minoru/react-dnd-treeview";
import { createId } from "@paralleldrive/cuid2";
import get from "lodash.get";
import { FC } from "react";
import { useGlobal, useLocal } from "web-utils";
import { syncronize } from "y-pojo";
import * as Y from "yjs";
import { IContent, MContent } from "../../../../../utils/types/general";
import { IItem, MItem } from "../../../../../utils/types/item";
import { FNComponent } from "../../../../../utils/types/meta-fn";
import { IText } from "../../../../../utils/types/text";
import { Menu, MenuItem } from "../../../../../utils/ui/context-menu";
import { loadComponent } from "../../../logic/comp";
import { EditorGlobal, NodeMeta } from "../../../logic/global";
import { fillID } from "../../../tools/fill-id";
import { flatTree } from "../../../tools/flat-tree";
import { newMap } from "../../../tools/yjs-tools";
import { detachComp } from "./action/detach";
import { rebuildTree } from "../../../logic/tree-logic";
import { jscript } from "../../../../../utils/script/jscript";

export const ETreeRightClick: FC<{
  node: NodeModel<NodeMeta>;
  event: React.MouseEvent<HTMLDivElement, MouseEvent>;
  onClose: () => void;
}> = ({ node, event, onClose }) => {
  const p = useGlobal(EditorGlobal, "EDITOR");
  const local = useLocal({
    clipboardAllowed: false,
    compGroups: {
      list: [] as { id: string; name: string }[],
      choose: null as null | ((id: string) => void),
    },
  });
  const item = node.data?.meta.item;
  const type = item?.type;
  const comp = (item as IItem).component as FNComponent | undefined;
  const rootComp = p.comp;
  const isActiveComponent = rootComp && rootComp.id === item?.id && rootComp.id;

  if (local.compGroups.list && local.compGroups.list.length === 0) {
    db.component_group
      .findMany({
        where: { component_site: { some: { id_site: p.site.id } } },
      })
      .then(async (comps) => {
        if (comps && comps.length === 0) {
          const res = await db.component_group.create({
            data: {
              component_site: {
                create: {
                  id_site: p.site?.id || "",
                },
              },
              name: "All",
            },
          });
          local.compGroups.list = [res];
          local.render();
        } else {
          local.compGroups.list = comps;
          local.render();
        }
      });
  }

  if (local.compGroups.choose) {
    return (
      <Menu mouseEvent={event} onClose={onClose}>
        {local.compGroups.list
          .sort((a, b) => {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          })
          .map((e) => {
            if (e.name === "__TRASH__") return null;
            return (
              <MenuItem
                key={e.id}
                label={e.name}
                onClick={() => {
                  if (local.compGroups.choose) {
                    local.compGroups.choose(e.id);
                  }
                  local.compGroups.choose = null;
                  local.render();
                }}
              />
            );
          })}
      </Menu>
    );
  }

  if (!item) {
    return (
      <Menu mouseEvent={event} onClose={onClose}>
        <MenuItem label={<div className="text-gray-400">Unavailable</div>} />
      </Menu>
    );
  }

  const mitem = p.treeMeta[item.id].mitem;
  const mcomp = mitem ? mitem.get("component") : null;

  if (!mitem) {
    return (
      <Menu mouseEvent={event} onClose={onClose}>
        <MenuItem label={<div className="text-gray-400">Unavailable</div>} />
      </Menu>
    );
  }

  let canDelete = true;
  let isPropContent = false;
  if (mitem && (mitem.parent as any).get("content")) {
    isPropContent = true;
  }

  if (isPropContent || rootComp?.id === item.id) {
    canDelete = false;
  }

  navigator.clipboard
    .readText()
    .then((e) => {
      local.clipboardAllowed = e.includes("prasi") ? true : false;
    })
    .catch(() => {});

  const paste = (
    <MenuItem
      label={
        local.clipboardAllowed && (type === "item" || type === "section") ? (
          "Paste"
        ) : (
          <div className="text-gray-400">Paste</div>
        )
      }
      onClick={() => {
        if (mitem && (type === "item" || type === "section")) {
          let _mitem = mitem;
          if (comp?.id && rootComp && comp.id === rootComp.id) {
            _mitem = p.comps.doc[comp.id]
              .getMap("map")
              .get("content_tree") as any;
          }

          if (_mitem)
            if (_mitem.get("childs")) {
              let paste = "";
              try {
                navigator.clipboard.readText().then((e) => {
                  paste = e;
                  let desc = paste.replaceAll("_prasi", "");
                  let obj = {} as IContent;
                  let jso = JSON.parse(desc) as IContent;
                  const childs = get(jso, "data") as any;
                  if (childs) {
                    p.item.selection = [];
                    let select = [] as Array<string>;

                    _mitem.doc?.transact(() => {
                      childs.map((e: any) => {
                        const nmap = fillID(e);
                        const map = new Y.Map() as MContent;
                        syncronize(map as any, nmap);
                        if (map) {
                          const childs = _mitem.get("childs");
                          if (childs) {
                            // console.log("push", map);
                            childs.push([map]);
                          }
                          const item = map.toJSON();
                          select.push(item.id);
                          p.render();
                        }
                      });
                    });

                    p.item.active = "";
                    p.item.selection = select;
                  } else {
                    _mitem.doc?.transact(() => {
                      if (jso.type === "section") {
                        const newItem = {
                          id: createId(),
                          name: jso.name,
                          type: "item",
                          dim: { w: "fit", h: "fit" },
                          childs: jso.childs,
                          component: get(jso, "component"),
                          adv: jso.adv,
                        } as IItem;
                        obj = newItem;
                      } else {
                        obj = jso;
                      }
                      let walkId: any = [];
                      const nmap = fillID(obj);
                      const map = new Y.Map() as MContent;
                      syncronize(map as any, nmap);
                      if (map) {
                        const childs = _mitem.get("childs");
                        if (childs) {
                          // console.log("push", map);
                          childs.push([map]);
                        }
                        const item = map.toJSON();
                        walkId.push(item.id);
                        p.render();
                      }
                      p.item.active = "";
                      p.item.selection = walkId;
                    });
                  }

                  rebuildTree(p, { mode: "update", note: "paste" });
                });
              } catch (error) {}
            }
        }
      }}
    />
  );

  if (comp?.id && rootComp && comp.id === rootComp.id) {
    return (
      <Menu mouseEvent={event} onClose={onClose}>
        {paste}
      </Menu>
    );
  }

  return (
    <Menu mouseEvent={event} onClose={onClose}>
      {type === "item" && !isActiveComponent && !item.component?.id && (
        <MenuItem
          label="Attach Component"
          onClick={() => {
            const ccid = rootComp?.id;
            p.item.active = item.id;

            const pick = () => {
              p.manager.comp = true;
              p.manager.compActionLabel = "Attach";
              p.manager.compCallback = async (comp) => {
                if (ccid && comp?.id === ccid) {
                  alert(
                    "WARNING: Failed to add self, preventing recursive component!"
                  );
                  setTimeout(() => {
                    pick();
                  }, 100);
                  return;
                }

                if (mitem.doc) {
                  let compitem = p.comps.doc[comp.id];
                  p.compLoading[item.id] = true;
                  p.render();
                  if (!compitem) {
                    await loadComponent(p, comp.id);
                    compitem = p.comps.doc[comp.id];
                  }
                  mitem.doc.transact(() => {
                    const citem = fillID(
                      compitem
                        .getMap("map")
                        .get("content_tree")
                        ?.toJSON() as IItem
                    ) as IItem;
                    if (citem) {
                      syncronize(mitem as any, {
                        id: citem.id,
                        name: citem.name,
                        childs: [],
                        component: {
                          ...citem.component,
                          id: citem.component?.id,
                        },
                        type: "item",
                      });
                    }

                    delete p.compLoading[item.id];
                    p.render();
                  });
                }
              };
              p.render();
            };
            pick();
          }}
        />
      )}
      {comp?.id && !isActiveComponent && (
        <MenuItem
          label="Detach"
          onClick={async () => {
            if (!jscript.build) {
              await jscript.init(p.render);
            }
            if (jscript.build && p.treeMeta[item.id]) {
              detachComp(
                p,
                item.id,
                p.treeMeta[item.id].mitem as MItem,
                jscript.build
              );
            }
          }}
        />
      )}

      {!comp?.id && (
        <MenuItem
          label={
            type === "item" && !isActiveComponent ? (
              "Create Component"
            ) : (
              <div className="text-gray-400">Create Component</div>
            )
          }
          onClick={(e) => {
            if (type === "item") {
              if (item.id) {
                if (!isActiveComponent) {
                  e.stopPropagation();
                  e.preventDefault();
                  local.compGroups.choose = (group_id) => {
                    p.compLoading[item.id] = true;
                    p.render();
                    api
                      .comp_create({
                        item_id: item.originalId || item.id,
                        site_id: p.site.id || "",
                        page_id: rootComp ? undefined : p.page?.id,
                        comp_id: rootComp ? rootComp.id : undefined,
                        group_id,
                      })
                      .then(async (e: any) => {
                        if (e) {
                          await loadComponent(p, e.id);
                          delete p.compLoading[item.id];
                          p.softRender.all();
                        }
                      });
                  };
                  local.render();
                } else {
                  alert(`This item is already a component!`);
                }
              }
            } else {
              alert(
                `Component type must be an ITEM, not ${item.type?.toUpperCase()}.`
              );
            }
          }}
        />
      )}

      {!item.hidden && (
        <MenuItem
          label="Hide"
          onClick={() => {
            let listItem = p.item.selection;
            if (listItem.length) {
              // hidden multiple
              const listContent: any = listItem.map((e) => {
                let meta = p.treeMeta[e];
                if (meta && meta.mitem) {
                  return meta.mitem.toJSON();
                }
              });
              let res = flatTree(listContent);
              res.map((e: IContent) => {
                const meta = p.treeMeta[e.id];
                if (meta && meta.mitem) {
                  meta.mitem.set("hidden", "only-editor");
                  p.render();
                }
              });
            } else {
              mitem.set("hidden", "only-editor");
              p.render();
            }
          }}
        />
      )}
      {item.hidden && (
        <MenuItem
          label="Show"
          onClick={() => {
            let listItem = p.item.selection;
            if (listItem.length) {
              // hidden multiple
              const listContent: any = listItem.map((e) => {
                let meta = p.treeMeta[e];
                if (meta && meta.mitem) {
                  return meta.mitem.toJSON();
                }
              });
              let res = flatTree(listContent);
              res.map((e: IContent) => {
                const meta = p.treeMeta[e.id];
                if (meta && meta.mitem) {
                  meta.mitem.set("hidden", false);
                }
              });
              p.item.selectMode = "single";
              p.item.selection = [];
              p.render();
            } else {
              mitem.set("hidden", false);
              p.render();
            }
          }}
        />
      )}

      <MenuItem
        label="Clone"
        onClick={() => {
          let listItem = p.item.selection;
          if (listItem.length) {
            const listContent: any = listItem.map((e) => {
              let meta = p.treeMeta[e];
              if (meta && meta.mitem) {
                return meta.mitem.toJSON();
              }
            });
            let res = flatTree(listContent);
            res.forEach((e: any) => {
              let meta = p.treeMeta[e.id];
              if (meta && meta.mitem) {
                const mitem = meta.mitem;
                mitem.parent.forEach((e: MContent, idx) => {
                  if (e.get("id") === mitem.get("id")) {
                    const json = e.toJSON() as IContent;
                    const map = newMap(fillID(json)) as MContent;
                    mitem.parent.insert(idx, [map]);
                  }
                });
              }
            });
            p.item.selectMode = "single";
            p.item.selection = [];
            p.render();
          } else {
            mitem.doc?.transact(() => {
              mitem.parent.forEach((e: MContent, idx) => {
                if (e.get("id") === mitem.get("id")) {
                  const json = e.toJSON() as IContent;
                  const map = newMap(fillID(json)) as MContent;
                  mitem.parent.insert(idx, [map]);
                }
              });
            });
          }
        }}
      />
      {canDelete && (
        <MenuItem
          label="Cut"
          onClick={() => {
            let clipboardText = "";
            if (p.item.selection.length) {
              let data = p.item.selection.map((id) => {
                const meta = p.treeMeta[id];
                if (meta && meta.mitem) {
                  let jso = meta.mitem.toJSON();
                  if (jso.type === "section") {
                    const newItem = {
                      id: jso.id,
                      name: jso.name,
                      type: "item",
                      dim: { w: "fit", h: "fit" },
                      childs: jso.childs,
                      component: get(jso, "component"),
                      adv: jso.adv,
                    } as IItem;
                    return newItem;
                  }
                  return jso;
                }
              });
              data = data.filter((x) => typeof x !== "string");
              let rootContent = JSON.parse(JSON.stringify({ data }));
              let flat = rootContent.data as Array<IContent>;
              let res = flatTree(flat);
              clipboardText = JSON.stringify({ data: res });
            } else {
              clipboardText = JSON.stringify(item);
            }
            let str = clipboardText + "_prasi";
            navigator.clipboard.writeText(str);

            mitem.parent.forEach((e: MContent, idx) => {
              if (e.get("id") === mitem.get("id")) {
                mitem.parent.delete(idx);
              }
            });
            p.item.selectMode = "single";
            p.item.selection = [];
            rebuildTree(p, { mode: "update", note: "cut" });
          }}
        />
      )}
      <MenuItem
        label="Copy"
        onClick={() => {
          let clipboardText = "";
          if (p.item.selection.length) {
            let data = p.item.selection.map((id) => {
              const meta = p.treeMeta[id];
              if (meta && meta.mitem) {
                let jso = meta.mitem.toJSON();
                if (jso.type === "section") {
                  const newItem = {
                    id: jso.id,
                    name: jso.name,
                    type: "item",
                    dim: { w: "fit", h: "fit" },
                    childs: jso.childs,
                    component: get(jso, "component"),
                    adv: jso.adv,
                  } as IItem;
                  return newItem;
                }
                return jso;
              }
            });
            data = data.filter((x) => typeof x !== "string");
            let rootContent = JSON.parse(JSON.stringify({ data }));
            let flat = rootContent.data as Array<IContent>;
            let res = flatTree(flat);
            clipboardText = JSON.stringify({ data: res });
            p.item.selectMode = "single";
            p.item.selection = [];
            p.render();
          } else {
            clipboardText = JSON.stringify(item);
          }
          let str = clipboardText + "_prasi";
          navigator.clipboard.writeText(str);
        }}
      />
      {paste}

      {(type === "text" || type === "item") && (
        <MenuItem
          label={`Wrap`}
          onClick={() => {
            mitem.doc?.transact(() => {
              let listItem = p.item.selection;
              if (listItem.length) {
                const listContent: any = listItem.map((e) => {
                  let meta = p.treeMeta[e];
                  if (meta && meta.mitem) {
                    if (meta.mitem.get("type") === "section") {
                      const json = meta.mitem.toJSON();
                      const newItem = {
                        id: json.id,
                        name: json.name,
                        type: "item",
                        dim: { w: "fit", h: "fit" },
                        adv: json.adv,
                        childs: json.childs || [],
                        component: json.component,
                      } as IItem;
                      return newItem;
                    }
                    return meta.mitem.toJSON();
                  }
                });

                let targetIdx = -1;
                listItem.map((e) => {
                  let meta = p.treeMeta[e];
                  if (meta && meta.mitem) {
                    const jso = meta.mitem;
                    jso.parent.forEach((e, idx) => {
                      if (e === jso) {
                        targetIdx = idx;
                        jso.parent.delete(idx);
                      }
                    });
                  }
                });

                let to = p.treeMeta[node.parent];
                if (to && to.mitem) {
                  const titem = to.mitem;
                  const childs = titem.get("childs");
                  let res = flatTree(listContent);
                  const json: IContent = {
                    id: createId(),
                    name: `Wrapped`,
                    type: "item",
                    childs: res,
                  };
                  const map = new Y.Map() as MContent;
                  if (map) {
                    syncronize(map as any, fillID(json));
                    childs?.insert(targetIdx, [map]);
                  }
                }
              } else {
                mitem.parent.forEach((e: MContent, idx) => {
                  if (e.get("id") === mitem.get("id")) {
                    const json: IContent = {
                      id: createId(),
                      name: `Wrapped`,
                      type: "item",
                      childs: [e.toJSON() as IItem | IText],
                    };
                    const map = new Y.Map() as MContent;
                    if (map) {
                      syncronize(map as any, fillID(json));
                      mitem.parent.delete(idx);
                      mitem.parent.insert(idx, [map]);
                    }
                  }
                });
              }
            });
            p.item.selectMode = "single";
            p.item.selection = [];
            p.render();
          }}
        />
      )}
      {type === "item" && !mcomp?.get("id") && canDelete && (
        <MenuItem
          label={`Unwrap`}
          onClick={() => {
            mitem.doc?.transact(() => {
              let listItem = p.item.selection;
              if (listItem.length) {
                const listContent: any = listItem.map((e) => {
                  let meta = p.treeMeta[e];
                  if (meta && meta.mitem) {
                    return meta.mitem.toJSON();
                  }
                });
                let res = flatTree(listContent);
                res.forEach((e: any) => {
                  let meta = p.treeMeta[e.id];
                  if (meta && meta.mitem) {
                    const mitem = meta.mitem;
                    mitem.parent.forEach((e: MContent, idx) => {
                      if (e.get("id") === mitem.get("id")) {
                        const json = e.toJSON() as IContent;
                        if (json.type === "item") {
                          mitem.parent.delete(idx);
                          mitem.parent.insert(
                            idx,
                            json.childs.map((e) => {
                              return newMap(fillID(e));
                            })
                          );
                        }
                      }
                    });
                  }
                });
              } else {
                mitem.parent.forEach((e: MContent, idx) => {
                  if (e.get("id") === mitem.get("id")) {
                    const json = e.toJSON() as IContent;
                    if (json.type === "item") {
                      mitem.parent.delete(idx);
                      mitem.parent.insert(
                        idx,
                        json.childs.map((e) => {
                          const map = new Y.Map() as MContent;
                          syncronize(map as any, fillID(e));
                          return map;
                        })
                      );
                    }
                  }
                });
              }
            });
            p.item.selectMode = "single";
            p.item.selection = [];
            p.render();
          }}
        />
      )}

      {canDelete && (
        <MenuItem
          label={"Delete"}
          onClick={() => {
            mitem.doc?.transact(() => {
              if (p.item.selection.length) {
                // let tree: NodeModel<NodeMeta>[] = [];
                // const comp: any = p.comps.doc[p.comp?.id || ""];
                // if (comp) {
                //   tree = flattenTree(p, comp.getMap("map").get("content_tree"));
                // } else if (p.mpage) {
                //   tree = flattenTree(
                //     p,
                //     p.mpage.getMap("map").get("content_tree")
                //   );
                // }
                // filterFlatTree(p.item.selection, tree, p);
              } else {
                mitem.parent.forEach((e, idx) => {
                  if (e.get("id") === item.id) {
                    mitem.parent.delete(idx);
                  }
                });
              }
            });
            p.item.selectMode = "single";
            p.item.selection = [];
            p.render();
          }}
        />
      )}
    </Menu>
  );
};

const walkContent = (item: MContent, result?: Array<MContent>) => {
  const _result = result || [];
  _result.push(item);
  item.get("childs")?.forEach((e) => {
    walkContent(e, _result);
  });
  return _result;
};
const walk = (item: MContent, result?: string[]) => {
  const _result = result || [];
  _result.push(item.get("id") || "");
  item.get("childs")?.forEach((e) => {
    walk(e, _result);
  });
  return _result;
};
