import { createId } from "@paralleldrive/cuid2";
import { IItem, MItem } from "../../../../utils/types/item";
import { FNCompDef } from "../../../../utils/types/meta-fn";
import { IMeta } from "../../utils/types";
import { codeBuild } from "./code-build";

const w = window as unknown as {
  prasiEditDevItem: Record<string, Record<string, SingleChange[]>>;
};

type SingleChange =
  | { type: "set"; name: string; value: any }
  | ({ type: "prop"; name: string } & PropVal)
  | { type: "child"; childs: ((IItem & PrasiEdit) | SimpleItem)[] };

export type PropVal =
  | { mode: "string"; value: string }
  | { mode: "raw"; value: string; valueBuilt?: string }
  | { mode: "jsx"; value: null | (IItem & PrasiEdit) | SimpleItem };

type ParentArg = {
  item: IItem & PrasiEdit;
  child_type: "jsx" | "child";
  child_idx: number;
};

type SimpleItem = Partial<Omit<IItem, "component">> & {
  component?: { id: string; props: Record<string, PropVal> };
};

export type PrasiEdit = {
  edit: {
    setValue: <T extends keyof IItem>(name: T, value: IItem[T]) => void;
    setProp: (name: string, value: PropVal | string) => void;
    pending: SingleChange[];
    childs: (IItem & PrasiEdit)[];
    setChilds: (childs: ((IItem & PrasiEdit) | SimpleItem)[]) => void;
    readonly parent: null | ParentArg;
    commit: () => Promise<void>;
    readonly props?: Record<string, PropVal>;
  };
};

export const devItem = (
  metas: Record<string, IMeta>,
  mitem: MItem,
  page_id: string,
  _added?: Record<string, any>
) => {
  const added = _added || {};
  const id = mitem.get("id") || "";

  if (!w.prasiEditDevItem) {
    w.prasiEditDevItem = {};
  }
  let pedit = w.prasiEditDevItem[page_id];
  if (!pedit) {
    w.prasiEditDevItem[page_id] = {};
    pedit = w.prasiEditDevItem[page_id];
  }

  const initChanges = () => {
    const id = mitem.get("id") || "";
    let changes = pedit[id];
    if (!changes) {
      pedit[id] = [];
      changes = pedit[id];
    }
    return changes;
  };

  const item = mitem.toJSON() as IItem;

  const result = {
    ...item,
    edit: {
      get props() {
        if (item.component?.props) {
          const result: Record<string, PropVal> = {};
          for (const [k, v] of Object.entries(item.component.props)) {
            if (v.content) {
              const content = mitem
                .get("component")
                ?.get("props")
                ?.get(k)
                ?.get("content");

              if (content) {
                const id = content.get("id") || "";
                if (added[id]) {
                  result[k] = {
                    mode: "jsx",
                    value: added[id],
                  };
                } else {
                  result[k] = {
                    mode: "jsx",
                    value: devItem(metas, content, page_id, added),
                  };
                }
              } else {
                result[k] = {
                  mode: "jsx",
                  value: null as any,
                };
              }
            } else {
              let vbuilt =
                typeof v.valueBuilt === "string"
                  ? (v.valueBuilt.trim() as string)
                  : "";
              if (vbuilt.endsWith(";\n")) {
                vbuilt = vbuilt.substring(0, vbuilt.length - ";\n".length);
              }
              if (vbuilt && vbuilt === v.value.trim()) {
                const fn = new Function(`return ${v.value}`);
                result[k] = { mode: "string", value: fn() };
              } else {
                result[k] = {
                  mode: "raw",
                  value: v.value,
                  valueBuilt: v.valueBuilt,
                };
              }
            }
          }
          return result;
        }
        return undefined;
      },
      get pending() {
        return [];
      },
      async commit() {
        const result = {} as Record<string, any>;
        const compile = {} as Record<
          string,
          { value: string; valueBuilt?: string }
        >;

        if (mitem) {
          for (const [item_id, changes] of Object.entries(pedit)) {
            const meta = metas[item_id];
            if (!meta) continue;
            if (!meta.mitem) continue;

            const mitem = meta.mitem;
            const item = mitem.toJSON();
            if (item && item.component) {
              const props = item?.component?.props as Record<string, FNCompDef>;

              if (!props) {
                console.log(item, props);
                return;
              }
              const src = {} as Record<string, string>;
              for (const c of changes) {
                if (c.type === "prop" && props) {
                  if (props[c.name]) {
                    if (c.mode === "string") {
                      props[c.name].value = JSON.stringify(c.value);
                      props[c.name].valueBuilt = JSON.stringify(c.value);
                    } else if (c.mode === "raw") {
                      props[c.name].value = c.value;
                      if (c.valueBuilt) {
                        props[c.name].valueBuilt = c.valueBuilt;
                      } else {
                        src[c.name] = c.value;
                      }
                    } else if (c.mode === "jsx") {
                      if (!props[c.name]) {
                        props[c.name] = {
                          meta: { type: "content-element" },
                        } as any;
                      }
                      if (c.value) {
                        props[c.name].content = removeEditFromChilds(
                          [c.value],
                          compile
                        )[0];
                      }
                    }
                  }
                } else {
                  if (c.type === "set" && typeof c.value === "object") {
                    for (const [k, v] of Object.entries(c.value) as any) {
                      item[k] = v;
                    }
                  } else if (c.type === "child" && Array.isArray(c.childs)) {
                    if (item.component?.id) {
                      if (!item.component.props) {
                        item.component.props = {};
                      }

                      item.component.props.child = {
                        meta: { type: "content-element" },
                        content: {
                          type: "item",
                          id: createId(),
                          name: "child",
                          childs: removeEditFromChilds(
                            c.childs.filter((e) => e),
                            compile
                          ),
                        },
                      };
                    } else {
                      const childs = removeEditFromChilds(
                        c.childs.filter((e) => e),
                        compile
                      );
                      item.childs = childs;
                    }
                  }
                }
              }

              for (const [k, v] of Object.entries(compile)) {
                src[k] = v.value;
              }
              let code_result = await codeBuild(src);
              await new Promise((done) => {
                setTimeout(done);
              });

              if (props) {
                for (const [k, v] of Object.entries(code_result) as any) {
                  if (props[k]) {
                    props[k].valueBuilt = v;
                  } else if (compile[k]) {
                    compile[k].valueBuilt = v;
                  }
                }
              }

              result[item_id] = item;
            }
          }

          mitem.doc?.transact(() => {
            for (const [k, v] of Object.entries(result)) {
              const m = metas[k];

              if (m.mitem) {
                syncronize(m.mitem as any, v);
              }
            }
          });
        }
      },
      setValue(name, value) {
        const changes = initChanges();

        let _value: any = value;

        if (name === "childs") {
          throw new Error("Please modify childs via .child");
        }

        changes.push({ type: "set", name, value: _value });
      },
      setProp(name, value) {
        const changes = initChanges();
        if (typeof value === "string") {
          changes.push({
            type: "prop",
            mode: "string",
            name,
            value,
          });
        } else {
          if (value.mode === "string") {
            changes.push({
              type: "prop",
              mode: "string",
              name,
              value: value.value,
            });
          } else if (value.mode === "raw") {
            changes.push({
              type: "prop",
              mode: "raw",
              name,
              value: value.value,
              valueBuilt: value.valueBuilt,
            });
          } else if (value.mode === "jsx") {
            changes.push({
              type: "prop",
              mode: "jsx",
              name,
              value: value.value,
            });
          }
        }
      },
      setChilds(childs) {
        const changes = initChanges();
        changes.push({ type: "child", childs });
      },
      get childs() {
        if (item.component?.id) {
          const child = item.component?.props.child;
          if (child && child.content) {
            const m = mitem
              .get("component")
              ?.get("props")
              ?.get("child")
              ?.get("content");
            if (m) {
              const id = m.get("id") || "";
              if (added[id]) {
                return [added[id]];
              }
              return [devItem(metas, m, page_id, added)];
            }
          }
          return [];
        }

        if (item.childs) {
          return item.childs
            .map((e) => {
              if (e) {
                const m = metas[e.id];

                if (added[e.id]) {
                  return added[e.id];
                }
                if (m && m.mitem)
                  return devItem(metas, m.mitem, page_id, added);
              }
            })
            .filter((e) => e);
        }

        return [];
      },
      get parent() {
        if (mitem) {
          const parent = mitem.parent.toJSON();
          let parent_id = null;
          if (Array.isArray(parent)) {
            parent_id = (mitem.parent?.parent as any).get("id");
          } else {
            const parent = mitem.parent?.parent?.parent?.parent as any;
            if (
              typeof parent === "object" &&
              typeof parent.get === "function"
            ) {
              parent_id = parent.get("id");
            }
          }

          const parent_meta = metas[parent_id]?.mitem;
          if (parent_meta) {
            const item = added[parent_id]
              ? added[parent_id]
              : devItem(metas, parent_meta, page_id, added);

            if (Array.isArray(parent)) {
              return {
                item,
                child_type: "child",
                child_idx: parent.findIndex((e) => e.id === item.id),
              };
            } else {
              return { item, child_type: "prop" };
            }
          }
        }
        return null;
      },
    },
  } as IItem & PrasiEdit;

  added[id] = result;

  return result;
};

const complexifyProps = (
  props: Record<string, PropVal>,
  compileValueBuilt: Record<string, { value: string; valueBuilt?: string }>
) => {
  const result: Record<string, FNCompDef> = {};
  for (const [k, v] of Object.entries(props)) {
    if (v.mode) {
      if (v.mode === "string") {
        result[k] = {
          value: JSON.stringify(v.value),
          valueBuilt: JSON.stringify(v.value),
          meta: { type: "text" },
        };
      } else if (v.mode === "jsx" && v.value) {
        result[k] = {
          value: "",
          valueBuilt: "",
          content: removeEditFromChilds([v.value], compileValueBuilt)[0],
          meta: { type: "content-element" },
        };
      } else if (v.mode === "raw") {
        result[k] = {
          value: v.value,
          valueBuilt: v.valueBuilt,
          meta: { type: "text" },
        };
      }
    } else {
      result[k] = v;
    }
  }
  return result;
};

const removeEditFromChilds = (
  childs: (SimpleItem | (IItem & PrasiEdit))[],
  compileValueBuilt: Record<string, { value: string; valueBuilt?: string }>
) => {
  let compile = compileValueBuilt || {};
  const result = childs.map((e) => {
    const item: any = { ...e };
    delete item.edit;

    if (!item.id) {
      item.id = createId();
    }

    if (item.component) {
      if (!item.component.instances) {
        item.component.instances = {};
      }
      if (!item.component.ref_ids) {
        item.component.ref_ids = {};
      }

      if (item.component?.props) {
        item.component.props = complexifyProps(item.component.props, compile);

        for (const [k, v] of Object.entries(item.component.props) as any) {
          if (!v.valueBuilt && v.value) {
            compile[item.id + "|||" + k] = v;
          }

          if (v.content) {
            v.content = removeEditFromChilds([v.content], compile)[0];
          }
        }
      }
    }

    if (item.childs) {
      item.childs = removeEditFromChilds(item.childs, compile);
    } else {
      item.childs = [];
    }

    return item;
  });
  return result;
};
