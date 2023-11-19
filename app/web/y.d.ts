import * as ImportYJS from "yjs";
import * as YPojo from "y-pojo";
type Yjs = typeof ImportYJS;

declare global {
  const Y: Yjs;
  const syncronize: typeof YPojo.syncronize;
}
