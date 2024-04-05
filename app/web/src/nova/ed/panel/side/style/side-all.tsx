import { FC, useCallback } from "react";
import { useGlobal } from "web-utils";
import { IItem } from "../../../../../utils/types/item";
import { EDGlobal, active } from "../../../logic/ed-global";
import { PanelAdv } from "./panel/advanced";
import { PanelAutoLayout } from "./panel/auto-layout";
import { PanelBackground } from "./panel/background";
import { PanelBorder } from "./panel/border";
import { PanelDimension } from "./panel/dimension";
import { PanelFont } from "./panel/font";
import { PanelLink } from "./panel/link";
import { PanelPadding } from "./panel/padding";
import { SideBox } from "./ui/SideBox";
import { SideLabel } from "./ui/SideLabel";

export const EdStyleAll: FC<{ as_child?: boolean }> = ({ as_child }) => {
  const p = useGlobal(EDGlobal, "EDITOR");

  let meta = active.comp_id
    ? p.comp.list[active.comp_id].meta[active.item_id]
    : p.page.meta[active.item_id];

  if (
    meta?.item?.component?.props?.child &&
    meta?.item?.component?.props?.child?.content?.id &&
    meta?.item?.component?.useStyle
  ) {
    meta = p.page.meta[meta.item.component.props.child.content.id];
  }

  let item = meta?.item;
  let is_inherit = false;
  if (item?.component?.id) {
    const comp = p.comp.list[item.component.id].doc
      .getMap("map")
      .get("root")
      ?.toJSON() as IItem;

    if (comp.component?.useStyle) {
      is_inherit = true;

      if (meta.item.component) {
        if (!meta.item.component.style) {
          meta.item.component.style = {} as any;
        }

        if (meta.item.component.style) {
          item = meta.item.component.style;
        }
      }
    }
  }

  const update = useCallback(
    async (key: any, value: any) => {
      if (meta) {
        let mitem = meta.mitem;

        if (is_inherit) {
          if (!meta.mitem?.get("component")?.get("style")) {
            meta.mitem?.get("component")?.set("style", new Y.Map() as any);
          }

          mitem = meta.mitem?.get("component")?.get("style") as any;
        }

        if (mitem) {
          active.should_render_main = true;
          mitem.doc?.transact(() => {
            if (mitem) {
              if (p.mode === "mobile") {
                let mobile = mitem.get("mobile");
                if (!mobile) {
                  mitem.set("mobile", new Y.Map() as any);
                  mobile = mitem.get("mobile");
                }
                mitem = mobile as any;
              }
              let prop = mitem?.get(key);

              if (!prop) {
                let nprop = null;
                if (typeof value === "object") {
                  if (Array.isArray(value)) {
                    nprop = new Y.Array();
                  } else {
                    nprop = new Y.Map();
                  }
                }
                if (mitem) {
                  mitem.set(key, nprop);
                  prop = mitem.get(key);
                }
              }

              if (prop) {
                syncronize(prop, value);
              }
            }
          });

          const json = mitem.toJSON() as IItem;
          if (is_inherit) {
            if (meta.item.component) {
              meta.item.component.style = json;
            }
          } else {
            meta.item = json;
          }
          p.render();
        }
      }
    },
    [meta, is_inherit]
  );

  if (!meta) {
    return null;
  }

  const childs = (
    <>
      <SideBox>
        <PanelAutoLayout mode={p.mode} value={item} update={update} />
        <PanelPadding
          id={active.item_id}
          value={item}
          mode={p.mode}
          update={update}
        />
        <PanelDimension
          value={item}
          mode={p.mode}
          id={active.item_id}
          update={update}
        />
      </SideBox>
      <SideLabel>BACKGROUND</SideLabel>
      <SideBox>
        <PanelBackground value={item} mode={p.mode} update={update} />
      </SideBox>
      <SideLabel>FONT</SideLabel>
      <SideBox>
        <PanelFont value={item} mode={p.mode} update={update} />
      </SideBox>
      <SideLabel>BORDER</SideLabel>
      <SideBox>
        <PanelBorder value={item} mode={p.mode} update={update} />
      </SideBox>
      <SideLabel>ADVANCED</SideLabel>
      <SideBox>
        <PanelLink value={item} mode={p.mode} update={update} />
        <PanelAdv value={item} mode={p.mode} update={update} />
      </SideBox>
    </>
  );

  if (!is_inherit && !as_child)
    return (
      <div className="flex h-full flex-1 relative overflow-auto">
        <div className="absolute inset-0 flex items-stretch flex-col pt-1">
          {childs}
        </div>
      </div>
    );

  return childs;
};
