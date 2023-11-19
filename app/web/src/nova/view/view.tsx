import { FC } from "react";
import { useGlobal } from "web-utils";
import { Loading } from "../../utils/ui/loading";
import { ViewGlobal } from "./logic/global";
import { vInit } from "./logic/init";
import { vLoadCode } from "./logic/load-code";
import { VLoad } from "./logic/types";
import { VEntry } from "./render/entry";

export const View: FC<{
  load: VLoad;
  site_id: string;
  page_id: string;
  bind?: (arg: { render: () => void }) => void;
}> = ({ load, site_id, page_id, bind: onLoad }) => {
  const v = useGlobal(ViewGlobal, "VIEW");

  if (v.current.page_id !== page_id || v.current.site_id !== site_id) {
    v.mode = "init";
  }

  if (onLoad) {
    onLoad({
      render() {
        v.mode = "rebuild";
        v.render();
      },
    });
  }

  if (v.mode === "init") {
    vInit(v, { load, page_id, site_id });
    if (v.mode === "init") {
      return <Loading backdrop={false} note="init" />;
    }
  }

  if (v.mode === "load-code" || v.mode === "loading-code") {
    vLoadCode(v);
    if (v.mode === "load-code" || v.mode === "loading-code") {
      return <Loading backdrop={false} note="load" />;
    }
  }

  if (v.mode === "rebuild") {
    v.bodyCache = <VEntry />;
    v.mode = "ready";
  }

  return <div className="flex flex-1 flex-col relative">{v.bodyCache}</div>;
};
