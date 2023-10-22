import { PG } from "./ed-global";
import init, { decompress } from "wasm-gzip";

export const edInit = async (p: PG) => {
  await init();
  p.status = "ready";
  p.render();
};
