import { validate } from "uuid";
import { page, useGlobal } from "web-utils";
import { EDGlobal } from "../../nova/ed/logic/ed-global";
import { edInitSync } from "../../nova/ed/logic/ed-sync";
import { Loading } from "../../utils/ui/loading";
import { ViPreview } from "../../nova/vi/preview";

export default page({
  url: "/vi/:domain/**",
  component: ({}) => {
    const p = useGlobal(EDGlobal, "EDITOR");

    params.site_id = params.domain;
    let pathname = `/${params._ === "_" ? "" : params._}`;
    if (validate(params._)) {
      const arr = params._.split("/");
      params.page_id = arr.shift();
      pathname = `/${arr.join("/")}`;
    }
    (window as any).pathname = pathname;

    const w = window as any;
    if (!w.Y) {
      (async () => {
        (window as any).Y = await import("yjs");
        (window as any).syncronize = (await import("y-pojo")).syncronize;
        p.render();
      })();
      return <Loading note="init" />;
    }
    if (!edInitSync(p)) {
      return <Loading note="connecting-ws" />;
    }

    return <ViPreview pathname={pathname} />;
  },
});
