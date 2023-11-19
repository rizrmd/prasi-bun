import { component } from "../../../../../db/db";
import { IItem } from "../../../utils/types/item";
import { FNComponent } from "../../../utils/types/meta-fn";
import { EdMeta, PG } from "../../ed/logic/ed-global";

export type VLoad =
  | { mode: "page"; page_id: string }
  | { mode: "pathname"; pathname: string }
  | {
      mode: "tree_meta";
      entry: string[];
      meta: Record<string, EdMeta>;
    };

export type VLoadComponent = {
  map: PG["comp"]["map"];
  load: (id_comp: string) => Promise<void>;
};
