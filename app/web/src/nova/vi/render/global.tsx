import { IContent } from "../../../utils/types/general";
import { IItem } from "../../../utils/types/item";
import { IRoot } from "../../../utils/types/root";
import { IMeta } from "../../ed/logic/ed-global";
import { viParts } from "./parts";

type ViStatus = "init" | "loading" | "ready";
export const ViGlobal = {
  ts: 0,
  status: "init" as ViStatus,
  meta: {} as Record<string, IMeta>,
  entry: [] as string[],
  tick: 0,
  mode: "desktop" as "mobile" | "desktop",
  site: {
    id: "",
    api_url: "",
    api: null as any,
    db: null as any,
  },
  site_url: null as unknown as URL,
  script: {
    init_local_effect: undefined as undefined | Record<string, boolean>,
  },
  visit: undefined as
    | undefined
    | ((meta: IMeta, parts: ReturnType<typeof viParts>) => void),
  on_status_changes: undefined as void | ((status: ViStatus) => void),
  layout: undefined as
    | {
        id: string;
        meta: Record<string, IMeta>;
        entry: string[];
      }
    | undefined,
  page: {
    cur: { id: "" },
    navs: {} as Record<string, Set<string>>,
    preload: [] as (() => void)[],
  },
  comp: {
    load: (async () => {
      return null as any;
    }) as (comp_id: string) => Promise<null | IItem>,
  },
  on_preload: undefined as
    | undefined
    | ((arg: {
        urls: string[];
        opt?: {
          on_load?: (
            pages: {
              id: string;
              url: string;
              root: IRoot;
            }[],
            walk: (
              root: { root: IRoot }[],
              visit: (item: IContent) => void | Promise<void>
            ) => void
          ) => void;
        };
      }) => Promise<void>),
};

export type VG = typeof ViGlobal & { render: () => void };
