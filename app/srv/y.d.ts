import type * as YJS from "yjs";
import { syncronize } from "y-pojo";

export import Doc = YJS.Doc;
export import UndoManager = YJS.UndoManager;
export import applyUpdate = YJS.applyUpdate;
export import encodeStateVector = YJS.encodeStateVector;
export import encodeStateAsUpdate = YJS.encodeStateAsUpdate;
export import Text = YJS.Text;
export import Map = YJS.Map;
export import Array = YJS.Array;
export import syncronize = syncronize;

export as namespace YJS;

declare global {
  const Y: typeof Y;
  const syncronize: typeof syncronize;
}
