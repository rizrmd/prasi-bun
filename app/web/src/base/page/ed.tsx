import { page, useGlobal } from "web-utils";
import { EdBase } from "../../render/ed/ed-base";
import { EDGlobal } from "../../render/ed/logic/ed-global";
import { Loading } from "../../utils/ui/loading";
import { initSync } from "wasm-gzip";
import { edInitSync } from "../../render/ed/logic/ed-sync";

export default page({
  url: "/ed/:site_id/:page_id",
  component: ({}) => {
    const p = useGlobal(EDGlobal, "EDITOR");

    if (!edInitSync(p)) {
      return <Loading note="init sync" />;
    }

    return <EdBase />;
  },
});
