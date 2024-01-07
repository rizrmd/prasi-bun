import { useCallback } from "react";
import { useGlobal } from "web-utils";
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

export const EdStyleAll = () => {
  const p = useGlobal(EDGlobal, "EDITOR");

  const meta = active.comp_id
    ? p.comp.list[active.comp_id].meta[active.item_id]
    : p.page.meta[active.item_id];

  const item = meta.item;

  const update = useCallback(
    (key: any, value: any) => {
      if (meta) {
        let mitem = meta.mitem;

        if (mitem) {
          p.ui.should_render = true;
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
          setTimeout(p.render);
        }
      }
    },
    [meta]
  );

  if (!meta) {
    return null;
  }

  return (
    <div className="flex flex-1 items-center flex-col p-[3px]">
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
    </div>
  );
};
