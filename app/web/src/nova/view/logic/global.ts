import { ReactElement } from "react";
import { IContent } from "../../../utils/types/general";
import { IItem } from "../../../utils/types/item";
import { ISection } from "../../../utils/types/section";
import { IText } from "../../../utils/types/text";
import { EdMeta } from "../../ed/logic/ed-global";

export const ViewGlobal = {
  mode: "" as "desktop" | "mobile",
  status: "init" as "init" | "load-code" | "loading-code" | "ready" | "rebuild",
  current: { site_id: "", page_id: "" },
  meta: {} as Record<string, EdMeta>,
  entry: [] as string[],
  bodyCache: null as null | ReactElement,
  view: {
    hidden: undefined as undefined | ((item: IContent) => boolean),
    active: undefined as
      | undefined
      | { get: (item: IContent) => boolean; set: (id: string) => void },
    hover: undefined as
      | undefined
      | { get: (item: IContent) => boolean; set: (id: string) => void },
  },
};

export type VG = typeof ViewGlobal & { render: () => void };
