import { page as dbpage } from "dbgen";
import { TypedDoc, TypedMap } from "yjs-types";
import { IItem, MItem } from "./item";
import { IRoot, MRoot } from "./root";
import { ISection, MSection } from "./section";
import { IText, MText } from "./text";
export type PageProps = {
  pathname: string;
  domain: string;
  params: any;
};

export type PrasiAPI = {
  apiEntry: any;
  prismaTypes?: {
    "prisma.d.ts": string;
    "runtime/library.d.ts": string;
    "runtime/index.d.ts": string;
  };
  apiTypes?: string;
};

export const w = (typeof window === "undefined" ? {} : window) as unknown as {
  isEditor: boolean;
  isMobile: boolean;
  basehost?: string;
  basepath: string;
  navigateOverride: (s: string) => string;
  isDesktop: boolean;
  prasiApi: Record<string, PrasiAPI>;
  prasiContext: {
    render: () => void;
    renderEditor?: () => void;
    afterEditorRender?: () => void;
  };
  loadedFonts: string[];
  prasiApiDbPull: boolean;
  mobile?: any;
  params: any;
  editorGlbDefault: string;
  ts: number;
  serverurl: string;
  apiurl: string;
  _api: any;
  _db: any;
  offline: boolean;
  sync_too_long: boolean;
  editorRender?: () => void;
  debug: {
    on: any;
    off: any;
  };
  pointer_active: boolean;
};

export type Page = {
  id: string;
  content_tree: IRoot;
  js: string | null;
  js_compiled: string | null;
};
export type MPage = TypedDoc<{
  map: TypedMap<
    Omit<dbpage, "content_tree" | "updated_at"> & {
      content_tree: MRoot;
      updated_at: string;
    }
  >;
}>;

export type IContent = ISection | IItem | IText;
export type MContent = MItem;

export type RenderContentProp = Partial<{
  active: IContent | null;
  hover: IContent | null;
  update: (updateID: string, name: string, newState: IRoot) => void;
  onHover: (e: React.MouseEvent, item: IContent) => Promise<void>;
  onOut: (e: React.MouseEvent, item: IContent) => Promise<void>;
  onClick: (e: React.MouseEvent, item: IContent) => Promise<void>;
  isEditor: boolean;
  setContent: (item: IContent) => Promise<void>;
  _onlyChildren?: true;
}>;

export type ERenderProp<ITEM> = {
  item: ITEM;
};
