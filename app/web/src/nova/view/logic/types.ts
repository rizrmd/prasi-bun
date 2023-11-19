import { EdMeta } from "../../ed/logic/ed-global";

export type VLoad =
  | { mode: "page"; page_id: string }
  | { mode: "pathname"; pathname: string }
  | {
      mode: "tree_meta";
      entry: string[];
      meta: Record<string, EdMeta>;
    };
