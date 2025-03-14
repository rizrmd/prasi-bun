import { NodeModel, RenderParams } from "@minoru/react-dnd-treeview";
import { FC, useEffect } from "react";
import { useGlobal, useLocal } from "web-utils";
import { IItem, MItem } from "../../../../../../utils/types/item";
import { Tooltip } from "../../../../../../utils/ui/tooltip";
import { EDGlobal, IMeta, PG, active } from "../../../../logic/ed-global";
import { treeRebuild } from "../../../../logic/tree/build";
import { fillID } from "../../../../logic/tree/fill-id";

export const EdTreeName = ({
  node,
  prm,
}: {
  node: NodeModel<IMeta>;
  prm: RenderParams;
}) => {
  const p = useGlobal(EDGlobal, "EDITOR");
  const local = useLocal({
    rename: "",
  });
  useEffect(() => {
    local.rename = item?.name || "";
  }, [p.ui.tree.rename_id]);

  const item = node.data?.item;

  if (!item) return <></>;
  let is_jsx_prop = !!node.data?.jsx_prop?.is_root;

  const isRenaming = p.ui.tree.rename_id === item.id;
  let name = item.name;
  if (item.component?.id && p.comp.loaded[item.component.id]) {
    name = p.comp.loaded[item.component.id].name;

    if (
      item.component.props &&
      item.component.props.child &&
      node.data?.parent?.comp_id
    ) {
      is_jsx_prop = true;
    }
  }

  return (
    <div className="text-[14px] relative flex flex-col justify-center cursor-pointer flex-1">
      {/* <div className="text-[10px]">{item.id}</div> */}

      {isRenaming ? (
        <input
          className={cx(
            "rename-item absolute  inset-0 outline-none border border-blue-500 my-[2px] mr-[1px] px-1"
          )}
          autoFocus
          spellCheck={false}
          defaultValue={local.rename}
          onFocus={(e) => {
            if (node.data?.jsx_prop?.is_root) {
              p.ui.tree.rename_id = "";
              p.render();
            } else {
              e.currentTarget.select();
            }
          }}
          onBlur={() => {
            if (node.data?.jsx_prop?.is_root) {
              return;
            }
            item.name = local.rename;

            let mitem = node.data?.mitem;
            if (item.component?.id) {
              const comp = p.comp.list[item.component.id];
              mitem = comp?.doc.getMap("map").get("root");
            }

            if (mitem) {
              mitem.set("name", item.name);
            }

            if (active.comp_id === item.component?.id) {
              _db.component.update({
                where: {
                  id: active.comp_id,
                },
                data: {
                  name: item.name,
                },
              });
            }

            p.ui.tree.rename_id = "";
            treeRebuild(p);
            p.render();
          }}
          onKeyDown={(e) => {
            e.stopPropagation();
            if (e.key === "Enter" || e.key === "Escape") {
              if (item.component?.id) {
                if (!confirm("Rename component?")) {
                  p.ui.tree.rename_id = "";
                  p.render();
                  return;
                }
              }
              setTimeout(() => {
                if (e.key === "Escape") {
                  local.rename = item.name;
                } else {
                  item.name = local.rename;
                }

                p.ui.tree.rename_id = "";
                p.render();
                setTimeout(() => {
                  const el = document.querySelector(
                    `.tree-${item.id}`
                  ) as HTMLInputElement;
                  if (el) el.focus();
                });
              }, 50);
            }
          }}
          onChange={(e) => {
            local.rename = e.target.value;
            p.render();
          }}
        />
      ) : (
        <div className="flex flex-col">
          <Name
            name={name}
            is_jsx_prop={is_jsx_prop}
            meta={node.data}
            metas={p.page.meta}
            comps={p.comp.list}
          />
          {/* <div className={"text-[9px] text-gray-500 -mt-1"}>
            {node.id} - {item.originalId}
          </div> */}
        </div>
      )}
    </div>
  );
};

const Name: FC<{
  name: string;
  is_jsx_prop: boolean;
  meta?: IMeta;
  metas: Record<string, IMeta>;
  comps: Record<string, { meta: Record<string, IMeta> }>;
}> = ({ name, is_jsx_prop, meta, comps }) => {
  let comp_label = "";
  if (meta?.item.component?.id) {
    for (const prop of Object.values(meta?.item.component?.props || {})) {
      if (prop.is_name) {
        try {
          eval(`comp_label = ${prop.valueBuilt}`);
        } catch (e) {}
        if (typeof comp_label !== "string" && typeof comp_label !== "number") {
          comp_label = "";
        }
      }
    }
  }

  if (is_jsx_prop) {
    let gen_jsx = false;
    const comp_id = meta?.item.component?.id;
    let comp = null as null | IMeta;
    if (comp_id && comps[comp_id] && comps[comp_id].meta) {
      const key = Object.keys(comps[comp_id].meta).shift();
      if (key) {
        comp = comps[comp_id].meta[key];
      }
    }

    if (
      comp &&
      (comp.item.component?.props[name] || comp.item.component?.props.child)
    ) {
      for (const child of comp.item.childs) {
        if (child.name.startsWith("jsx:")) {
          if ([name, "child"].includes(child.name.substring(4).trim())) {
            gen_jsx = true;
          }
        }
      }
    }
    if (!comp_id) gen_jsx = true;

    return (
      <div className={cx("flex items-center space-x-1 pr-1")}>
        <Tooltip
          content={`Type: JSX Prop`}
          className="flex text-purple-500 border border-purple-400 items-center justify-center font-mono text-[6px] px-[2px]"
        >
          P
        </Tooltip>
        <div className="flex-1 relative self-stretch">
          <div className="absolute inset-0 flex items-center">
            <div className="truncate text-ellipsis">
              {name + (comp_label ? `: ${comp_label}` : "")}
            </div>
          </div>
        </div>
        {gen_jsx && meta && meta.mitem && active.comp_id !== comp_id && (
          <GenerateJSX meta={meta} />
        )}
        {meta && !meta.mitem && (
          <Tooltip
            delay={0}
            content={
              <div className="font-mono whitespace-pre-wrap">{`\
JSX: ${name} is not called anywhere.
Please put {${name}} somewhere inside component JS.`}</div>
            }
          >
            <div
              className="action-script px-1 py-[2px] text-red-500 cursor-default font-bold"
              dangerouslySetInnerHTML={{
                __html: `<svg width="12" height="12" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.4449 0.608765C8.0183 -0.107015 6.9817 -0.107015 6.55509 0.608766L0.161178 11.3368C-0.275824 12.07 0.252503 13 1.10608 13H13.8939C14.7475 13 15.2758 12.07 14.8388 11.3368L8.4449 0.608765ZM7.4141 1.12073C7.45288 1.05566 7.54712 1.05566 7.5859 1.12073L13.9798 11.8488C14.0196 11.9154 13.9715 12 13.8939 12H1.10608C1.02849 12 0.980454 11.9154 1.02018 11.8488L7.4141 1.12073ZM6.8269 4.48611C6.81221 4.10423 7.11783 3.78663 7.5 3.78663C7.88217 3.78663 8.18778 4.10423 8.1731 4.48612L8.01921 8.48701C8.00848 8.766 7.7792 8.98664 7.5 8.98664C7.2208 8.98664 6.99151 8.766 6.98078 8.48701L6.8269 4.48611ZM8.24989 10.476C8.24989 10.8902 7.9141 11.226 7.49989 11.226C7.08567 11.226 6.74989 10.8902 6.74989 10.476C6.74989 10.0618 7.08567 9.72599 7.49989 9.72599C7.9141 9.72599 8.24989 10.0618 8.24989 10.476Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`,
              }}
            ></div>
          </Tooltip>
        )}
      </div>
    );
  }

  if (typeof name === "string" && name.startsWith("jsx:")) {
    return (
      <div className="flex items-center space-x-1">
        <div className="flex text-purple-500 space-x-[2px] border-r pr-1 items-center justify-center">
          <div
            dangerouslySetInnerHTML={{
              __html: `<svg width="9px" height="9px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.69667 0.0403541C8.90859 0.131038 9.03106 0.354857 8.99316 0.582235L8.0902 6.00001H12.5C12.6893 6.00001 12.8625 6.10701 12.9472 6.27641C13.0319 6.4458 13.0136 6.6485 12.8999 6.80001L6.89997 14.8C6.76167 14.9844 6.51521 15.0503 6.30328 14.9597C6.09135 14.869 5.96888 14.6452 6.00678 14.4178L6.90974 9H2.49999C2.31061 9 2.13748 8.893 2.05278 8.72361C1.96809 8.55422 1.98636 8.35151 2.09999 8.2L8.09997 0.200038C8.23828 0.0156255 8.48474 -0.0503301 8.69667 0.0403541ZM3.49999 8.00001H7.49997C7.64695 8.00001 7.78648 8.06467 7.88148 8.17682C7.97648 8.28896 8.01733 8.43723 7.99317 8.5822L7.33027 12.5596L11.5 7.00001H7.49997C7.353 7.00001 7.21347 6.93534 7.11846 6.8232C7.02346 6.71105 6.98261 6.56279 7.00678 6.41781L7.66968 2.44042L3.49999 8.00001Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`,
            }}
          ></div>
          <div className="font-mono text-[8px]">JSX</div>
        </div>
        <div>{name.substring(4)}</div>
      </div>
    );
  }

  return (
    <div>
      {name}
      {comp_label && `: ${comp_label}`}
    </div>
  );
};

const GenerateJSX: FC<{ meta: IMeta }> = ({ meta }) => {
  const p = useGlobal(EDGlobal, "EDITOR");
  return (
    <Tooltip
      content="Generate JSX"
      onClick={() => {
        let mitem = undefined as undefined | MItem;
        let is_child = false;
        if (meta.item.component?.id) {
          mitem = meta.mitem
            ?.get("component")
            ?.get("props")
            ?.get("child")
            ?.get("content");
          is_child = true;
        } else {
          mitem = meta.mitem;
        }

        if (mitem) {
          const genJSX = findDefaultJSX(p, mitem);
          const ijson = mitem.toJSON() as IItem;

          mitem.doc?.transact(() => {
            syncronize(mitem as any, {
              type: "item",
              dim: { w: "full", h: "full" },
              childs: [],
              ...(genJSX as any),
              name: ijson.name,
              id: ijson.id,
              hidden: false,
              originalId: ijson.originalId,
            });
          });
          treeRebuild(p);
          p.render();
        }
      }}
    >
      <div
        className="action-script px-1 py-[2px] rounded-sm text-purple-500 bg-white border border-purple-400 opacity-0 transition-all hover:bg-purple-700 hover:text-white hover:border-purple-700"
        dangerouslySetInnerHTML={{
          __html: `<svg width="9px" height="9px" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.69667 0.0403541C8.90859 0.131038 9.03106 0.354857 8.99316 0.582235L8.0902 6.00001H12.5C12.6893 6.00001 12.8625 6.10701 12.9472 6.27641C13.0319 6.4458 13.0136 6.6485 12.8999 6.80001L6.89997 14.8C6.76167 14.9844 6.51521 15.0503 6.30328 14.9597C6.09135 14.869 5.96888 14.6452 6.00678 14.4178L6.90974 9H2.49999C2.31061 9 2.13748 8.893 2.05278 8.72361C1.96809 8.55422 1.98636 8.35151 2.09999 8.2L8.09997 0.200038C8.23828 0.0156255 8.48474 -0.0503301 8.69667 0.0403541ZM3.49999 8.00001H7.49997C7.64695 8.00001 7.78648 8.06467 7.88148 8.17682C7.97648 8.28896 8.01733 8.43723 7.99317 8.5822L7.33027 12.5596L11.5 7.00001H7.49997C7.353 7.00001 7.21347 6.93534 7.11846 6.8232C7.02346 6.71105 6.98261 6.56279 7.00678 6.41781L7.66968 2.44042L3.49999 8.00001Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`,
        }}
      ></div>
    </Tooltip>
  );
};

export const findDefaultJSX = (p: PG, mitem: MItem): IItem => {
  let resetJSXProp: any = false;
  if (mitem && mitem.parent && (mitem.parent as any).get("content")) {
    let name = "";
    (mitem as any).parent.parent.forEach((e: any, k: any) => {
      if (e === mitem.parent) {
        name = k;
      }
    });

    if (name) {
      try {
        const cid = (mitem as any).parent.parent.parent.get("id");
        const comp = p.comp.list[cid].doc;
        if (comp) {
          const mchilds = comp
            .getMap("map")
            .get("root")
            ?.get("childs")
            ?.toJSON() as IItem[];
          for (const c of mchilds) {
            if (
              c &&
              c.name &&
              c.name.startsWith("jsx:") &&
              c.name.substring(4).trim() === name
            ) {
              c.hidden = false;
              c.name = name;
              c.id = mitem.get("id") || "";
              c.originalId = mitem.get("originalId") || "";
              resetJSXProp = c;
            }
          }
        }
      } catch (e) {}
    }
  }

  return fillID(resetJSXProp) as any;
};
