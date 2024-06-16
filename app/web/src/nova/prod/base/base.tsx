import { RadixRouter } from "radix3";
import { IItem } from "../../../utils/types/item";
import { IRoot } from "../../../utils/types/root";
import { PG } from "../../ed/logic/ed-global";
import { IMeta } from "../../vi/utils/types";

const w = window as any;

export const base = {
  root: null as unknown as URL,
  url(...arg: any[]) {
    const pathname = arg
      .map((e) => (Array.isArray(e) ? e.join("") : e))
      .join("");

    let base_url = this.root.toString();
    if (base_url.endsWith("/"))
      base_url = base_url.substring(0, base_url.length - 1);

    if (pathname.startsWith("/")) return base_url + pathname;
    else {
      return base_url + "/" + pathname;
    }
  },
  get pathname() {
    const res = location.pathname.substring(base.root.pathname.length);
    if (!res.startsWith("/")) return `/${res}`;
    return res;
  },
  site: { id: w._prasi?.site_id } as {
    id: string;
    name: string;
    responsive: PG["site"]["responsive"];
    domain: string;
    api_url: string;
    code: {
      mode: "new" | "vsc";
    };
    api: any;
    db: any;
  },
  init_local_effect: {} as any,
  mode: "" as "desktop" | "mobile",
  route: {
    status: "init" as "init" | "loading" | "ready",
    pages: [] as { id: string; url: string }[],
    router: null as null | RadixRouter<{ id: string; url: string }>,
  },
  comp: {
    list: {} as Record<string, IItem>,
    pending: {} as Record<string, IItem[]>,
  },
  layout: {
    id: "",
    root: null as null | IRoot,
    meta: null as null | Record<string, IMeta>,
  },
  cache: {
    urls: new Set<string>(),
  },
  page: {
    id: "",
    url: "",
    root: null as null | IRoot,
    meta: null as null | Record<string, IMeta>,
    cache: {} as Record<
      string,
      {
        id: string;
        url: string;
        root: IRoot;
        meta: Record<string, IMeta>;
      }
    >,
  },
};

export const initBaseConfig = () => {
  if (!base.root) {
    let url = new URL(location.href);
    if (w._prasi.basepath) {
      url.pathname = w._prasi.basepath;
    }

    base.root = new URL(`${url.protocol}//${url.host}${url.pathname}`);
    if (base.root.pathname.endsWith("/")) {
      base.root.pathname = base.root.pathname.substring(
        0,
        base.root.length - 1
      );
    }
  }
};
