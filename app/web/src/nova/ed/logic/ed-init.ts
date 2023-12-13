import init from "wasm-gzip";
import { PG } from "./ed-global";
import { jscript } from "../../../utils/script/jscript";
import { viLoadLegacy } from "../../vi/load/load-legacy";
import { treeRebuild } from "./tree/build";

export const edInit = async (p: PG) => {
  p.status = "ready";

  await init();
  jscript.init(p.render);

  await viLoadLegacy({
    site: {
      api_url: p.site.config.api_url,
      id: p.site.id,
      api: {
        get() {
          return p.script.api;
        },
        set(val) {
          p.script.api = val;
        },
      },
      db: {
        get() {
          return p.script.db;
        },
        set(val) {
          p.script.db = val;
        },
      },
    },
    render: p.render,
  });

  p.script.loaded = true;

  treeRebuild(p);
  p.render();
};
