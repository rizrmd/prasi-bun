import init from "wasm-gzip";
import { PG } from "./ed-global";
import { jscript } from "../../../utils/script/jscript";

export const edInit = async (p: PG) => {
  await init();
  jscript.init(p.render);
  p.status = "ready";
  p.render();
};
