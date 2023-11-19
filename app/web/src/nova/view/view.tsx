import { FC } from "react";
import { useGlobal } from "web-utils";
import { IContent } from "../../utils/types/general";
import { Loading } from "../../utils/ui/loading";
import { ViewGlobal } from "./logic/global";
import { vInit } from "./logic/init";
import { vLoadCode } from "./logic/load-code";
import { VLoad, VLoadComponent } from "./logic/types";
import { VEntry } from "./render/entry";

export const View: FC<{
  load: VLoad;
  component: VLoadComponent;
  site_id: string;
  page_id: string;
  mode: "desktop" | "mobile";
  bind?: (arg: { render: () => void }) => void;
  hidden?: (item: IContent) => boolean;
  hover?: { get: (item: IContent) => boolean; set: (id: string) => void };
  active?: { get: (item: IContent) => boolean; set: (id: string) => void };
}> = ({ load, site_id, page_id, bind, hover, active, hidden, component }) => {
  const v = useGlobal(ViewGlobal, "VIEW");

  if (hidden) v.view.hidden = hidden;
  if (hover) v.view.hover = hover;
  if (active) v.view.active = active;
  if (v.current.page_id !== page_id || v.current.site_id !== site_id) {
    v.status = "init";
  }
  v.component.map = component.map;
  v.component.load = component.load;

  if (bind) {
    bind({
      render() {
        v.status = "rebuild";
        v.render();
      },
    });
  }

  if (v.status === "init") {
    vInit(v, { load, page_id, site_id });
    if (v.status === "init") {
      return <Loading backdrop={false} note="init" />;
    }
  }

  if (v.status === "load-code" || v.status === "loading-code") {
    vLoadCode(v);
    if (v.status === "load-code" || v.status === "loading-code") {
      return <Loading backdrop={false} note="rendering-view" />;
    }
  }

  if (v.status === "rebuild") {
    if (load.mode === "tree_meta") {
      v.meta = load.meta;
      v.entry = load.entry;
    }
    v.bodyCache = <VEntry />;
    v.status = "ready";
  }

  return <div className="flex flex-1 flex-col relative">{v.bodyCache}</div>;
};
