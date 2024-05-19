import { IItem, MItem } from "../../../../utils/types/item";
import { FNCompDef } from "../../../../utils/types/meta-fn";
import { IMeta } from "../../utils/types";

const w = window as unknown as {
  prasiEdit: Record<string, Record<string, SingleChange[]>>;
};

type SingleChange =
  | { type: "set"; name: string; value: any }
  | ({ type: "prop"; name: string } & PropVal);

type PropVal =
  | { mode: "string"; value: string }
  | { mode: "raw"; value: string; valueBuilt?: string }
  | { mode: "jsx"; value: null | (IItem & PrasiEdit) };

type ParentArg = {
  item: IItem & PrasiEdit;
  child_type: "jsx" | "child";
  child_idx: number;
};

type PrasiEdit = {
  edit: {
    setValue: <T extends keyof IItem>(name: T, value: IItem[T]) => void;
    setProp: (name: string, value: PropVal | string) => void;
    pending: SingleChange[];
    readonly childs: (IItem & PrasiEdit)[];
    readonly parent: null | ParentArg;
    commit: () => Promise<void>;
    readonly props?: Record<string, PropVal>;
  };
};

export const devItem = (
  metas: Record<string, IMeta>,
  mitem: MItem,
  page_id: string
) => {
  if (!w.prasiEdit) {
    w.prasiEdit = {};
  }
  let pedit = w.prasiEdit[page_id];
  if (!pedit) {
    w.prasiEdit[page_id] = {};
    pedit = w.prasiEdit[page_id];
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

  return {
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
                result[k] = {
                  mode: "jsx",
                  value: devItem(metas, content, page_id),
                };
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
                result[k] = { mode: "string", value: JSON.parse(v.value) };
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
        for (const [item_id, changes] of Object.entries(pedit)) {
          if (mitem) {
            const item = mitem.toJSON();
            const props = item?.component?.props as Record<string, FNCompDef>;
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
                      props[c.name].content = formatChilds([c.value])[0];
                    }
                  }
                }
              } else {
                if (c.type === "set" && typeof c.value === "object") {
                  for (const [k, v] of Object.entries(c.value) as any) {
                    item[k] = v;
                  }
                }
              }
            }

            const result = await _api.code_build(src);
            for (const [k, v] of Object.entries(result)) {
              props[k].valueBuilt = v;
            }
            result[item_id] = item;
          }
        }

        if (mitem) {
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
          _value = formatChilds(value as any);
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
      get childs() {
        const item = mitem?.toJSON() as IItem;

        if (item.childs) {
          return item.childs.map((e) => {
            if (e) {
              const mitem = metas[e.id]?.mitem;
              if (mitem) return devItem(metas, mitem, page_id);
            }
          });
        }

        return [];
      },
      get parent() {
        if (mitem) {
          const parent = mitem.parent.toJSON();
          if (Array.isArray(parent)) {
            const parent_id = (mitem.parent?.parent as any).get("id");
            const parent_meta = metas[parent_id].mitem;
            if (parent_meta) {
              return {
                item: devItem(metas, parent_meta, page_id),
                child_type: "child",
                child_idx: parent.findIndex((e) => e.id === item.id),
              };
            }
          }
        }
        return null;
      },
    },
  } as IItem & PrasiEdit;
};

const formatChilds = (childs: (IItem & PrasiEdit)[]) => {
  const result = childs.map((e) => {
    const item: any = { ...e };
    delete item.edit;

    if (item.component?.props) {
      for (const [k, v] of Object.entries(item.component.props) as any) {
        if (v.content) {
          v.content = formatChilds([v.content]);
        }
      }
    }

    if (item.childs) {
      item.childs = formatChilds(item.childs);
    }

    return item;
  });
  return result;
};
