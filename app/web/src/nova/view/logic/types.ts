import { IMeta, IScope, PG } from "../../ed/logic/ed-global";

export type VLoad =
  | { mode: "page"; page_id: string }
  | { mode: "pathname"; pathname: string }
  | {
      mode: "tree_meta";
      entry: string[];
      scope?: IScope;
      meta: Record<string, IMeta>;
    };

export type VLoadComponent = {
  load: (id_comp: string) => Promise<void>;
};
