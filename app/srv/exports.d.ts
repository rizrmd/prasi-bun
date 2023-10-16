/// <reference types="node" />
/// <reference types="react" />
declare module "app/srv/api/npm-size" {
    export const _: {
        url: string;
        api(mode: "site" | "page", id: string): Promise<string>;
    };
}
declare module "app/srv/api/auth/session" {
    export const _: {
        url: string;
        api(): Promise<any>;
    };
}
declare module "app/srv/api/site-dts" {
    export const _: {
        url: string;
        api(site_id: string): Promise<string>;
    };
}
declare module "app/srv/global" {
    import { site, user } from "dbgen";
    import { ExecaChildProcess } from "execa";
    export const glb: {
        lastUpdate: Record<string, number>;
        prasiSrv: {
            status: Record<string, "unavailable" | "installing" | "starting" | "started" | "stopped" | "destroying">;
            running: Record<string, ExecaChildProcess>;
        };
        npm: {
            page: Record<string, null | {
                file: Buffer;
                etag: string;
            }>;
            site: Record<string, null | {
                file: Buffer;
                etag: string;
            }>;
        };
    };
    export type Session = {
        user: user & {
            site: site[];
        };
    };
}
declare module "app/web/src/utils/types/ws" {
    export type WS_MSG = WS_MSG_GET_COMP | WS_MSG_SET_COMP | WS_MSG_GET_PAGE | WS_MSG_SET_PAGE | WS_MSG_SV_LOCAL | WS_MSG_SVDIFF_REMOTE | WS_MSG_DIFF_LOCAL | WS_MSG_UNDO | WS_MSG_REDO | WS_MSG_NEW_COMP | WS_SITE_JS | {
        type: "ping";
    } | {
        type: "pong";
    };
    export type WS_SITE_JS = {
        type: "site-js";
        id_site: string;
        src: string;
    };
    export type WS_MSG_GET_COMP = {
        type: "get_comp";
        comp_id: string;
    };
    export type WS_MSG_SET_COMP = {
        type: "set_comp";
        comp_id: string;
        changes: string;
    };
    export type WS_MSG_GET_PAGE = {
        type: "get_page";
        page_id: string;
    };
    export type WS_MSG_SET_PAGE = {
        type: "set_page";
        changes: string;
    };
    export type WS_MSG_NEW_COMP = {
        type: "new_comp";
        id: string;
        doc: string;
    };
    export type WS_MSG_UNDO = {
        type: "undo";
        mode: "page" | "site" | "comp";
        id: string;
    };
    export type WS_MSG_REDO = {
        type: "redo";
        mode: "page" | "site" | "comp";
        id: string;
    };
    export type WS_MSG_SV_LOCAL = {
        type: "sv_local";
        mode: "page" | "site" | "comp";
        id: string;
        sv_local: string;
    };
    export type WS_MSG_SVDIFF_REMOTE = {
        type: "svd_remote";
        mode: "page" | "site" | "comp";
        id: string;
        sv_remote: string;
        diff_remote: string;
    };
    export type WS_MSG_DIFF_LOCAL = {
        type: "diff_local";
        mode: "page" | "site" | "comp";
        id: string;
        diff_local: string;
    };
}
declare module "app/web/src/utils/types/meta-fn" {
    import { TypedMap } from "yjs-types";
    import { IItem, MItem } from "app/web/src/utils/types/item";
    import * as Y from "yjs";
    export type FNLayout = {
        dir: "row" | "col" | "row-reverse" | "col-reverse";
        align: FNAlign;
        gap: number | "auto";
        wrap: undefined | "flex-wrap" | "flex-nowrap";
    };
    export type FMLayout = TypedMap<FNLayout>;
    export type FNAdv = {
        js?: Y.Text | string;
        jsBuilt?: string;
        css?: Y.Text | string;
        html?: Y.Text | string;
    };
    export type FMAdv = TypedMap<FNAdv>;
    export type FNComponent = {
        id: string;
        name: string;
        updated_at?: number;
        props: Record<string, FNCompDef>;
    };
    export type FNCompDef = {
        idx: number;
        type: string;
        value: any;
        valueBuilt: any;
        gen?: string;
        genBuilt?: string;
        content?: IItem;
        visible?: string;
        meta?: FNCompMeta;
    };
    type FNCompMeta = {
        type: "text" | "option" | "content-element";
        options?: string;
        optionsBuilt?: string;
        option_mode?: "dropdown" | "button";
    };
    export type FMCompDef = TypedMap<Omit<FNCompDef, "meta" | "content"> & {
        content: MItem;
        meta: TypedMap<FNCompMeta>;
    }>;
    export type FMComponent = TypedMap<Omit<FNComponent, "group" | "props"> & {
        props: TypedMap<Record<string, FMCompDef>>;
    }>;
    export type FNAlign = "top-left" | "top-center" | "top-right" | "top" | "left" | "center" | "right" | "bottom" | "bottom-left" | "bottom-center" | "bottom-right" | "stretch";
    export type FNPadding = {
        t?: number;
        b?: number;
        l?: number;
        r?: number;
    };
    export type FMPadding = TypedMap<FNPadding>;
    export type FNDimension = {
        w?: number | "fit" | "full";
        h?: number | "fit" | "full";
        wUnit?: "px" | "%";
        hUnit?: "px" | "%";
        proportion?: boolean;
    };
    export type FMDimension = TypedMap<FNDimension>;
    export type FNBackground = {
        color?: string;
        url?: string;
        size?: "cover" | "contain" | "full" | "auto" | "%" | "px";
        repeat?: "repeat" | "repeat-x" | "repeat-y" | "space" | "round" | "no-repeat";
        pos?: "top" | "left" | "center" | "bottom" | "right";
    };
    export type FMBackground = TypedMap<FNBackground>;
    export type FNBorder = {
        style?: "solid" | "dash";
        stroke?: FNBorderCorner;
        rounded?: FNRounded;
        color?: string;
    };
    export type FNBorderCorner = {
        t?: number;
        b?: number;
        l?: number;
        r?: number;
    };
    export type FNRounded = {
        tr?: number;
        tl?: number;
        bl?: number;
        br?: number;
    };
    export type FMBorder = TypedMap<FNBorder>;
    export type FNFont = {
        color?: string;
        size?: number;
        family?: string;
        height?: number | "auto";
        align?: "center" | "left" | "right";
        whitespace?: "whitespace-normal" | "whitespace-nowrap" | "whitespace-pre" | "whitespace-pre-line" | "whitespace-pre-wrap" | "whitespace-break-spaces";
        wordBreak?: "break-normal" | "break-words" | "break-all" | "break-keep";
    };
    export type FMFont = TypedMap<FNFont>;
    export type FNLinkTag = {
        tag?: string;
        link?: string;
        class?: string;
    };
    export type FMLinkTag = TypedMap<FNLinkTag>;
}
declare module "app/web/src/utils/types/meta" {
    import { FMAdv, FMBackground, FMBorder, FMComponent, FMDimension, FMFont, FMLayout, FMLinkTag, FMPadding, FNBackground, FNBorder, FNDimension, FNFont, FNPadding } from "app/web/src/utils/types/meta-fn";
    export type MetaItem = {
        id: string;
        originalId?: string;
        type: "text" | "section" | "item";
        name: string;
        field?: string;
        html?: string;
        text?: string;
        hidden?: "only-editor" | "all" | false;
    };
    export type BasicItem = {
        padding?: FNPadding;
        bg?: FNBackground;
        font?: FNFont;
        dim?: FNDimension;
        border?: FNBorder;
    };
    export type MBasicItem = {
        padding?: FMPadding;
        bg?: FMBackground;
        font?: FMFont;
        component?: FMComponent;
        dim?: FMDimension;
        layout?: FMLayout;
        linktag?: FMLinkTag;
        adv?: FMAdv;
        border?: FMBorder;
    };
}
declare module "app/web/src/utils/types/root" {
    import { TypedArray, TypedMap } from "yjs-types";
    import { ISection } from "app/web/src/utils/types/section";
    export type IRoot = {
        id: "root";
        type: "root";
        id_page: string;
        childs: ISection[];
    };
    export type MRoot = TypedMap<{
        id: "root";
        type: "root";
        childs: TypedArray<ISection>;
    }>;
}
declare module "app/web/src/utils/types/section" {
    import { TypedArray, TypedMap } from "yjs-types";
    import { IItem, MItem } from "app/web/src/utils/types/item";
    import { BasicItem, MBasicItem, MetaItem } from "app/web/src/utils/types/meta";
    import { FNAdv, FNLayout, FNLinkTag } from "app/web/src/utils/types/meta-fn";
    import { MRoot } from "app/web/src/utils/types/root";
    export type ISection = {
        layout?: FNLayout;
        mobile?: ISection;
        linktag?: FNLinkTag;
        adv?: FNAdv;
        type: "section";
        childs: IItem[];
    } & MetaItem & BasicItem;
    export type MSection = TypedMap<{
        mobile?: MSection;
        type: "section";
        childs?: TypedArray<MItem>;
    } & MBasicItem & MetaItem> & {
        parent: TypedArray<MSection> & {
            parent: MRoot;
        };
    };
}
declare module "app/web/src/utils/types/text" {
    import { TypedArray, TypedMap } from "yjs-types";
    import { BasicItem, MBasicItem, MetaItem } from "app/web/src/utils/types/meta";
    import { FNAdv, FNLayout, FNLinkTag } from "app/web/src/utils/types/meta-fn";
    import { MItem } from "app/web/src/utils/types/item";
    export type IText = {
        mobile?: IText;
        type: "text";
        layout?: FNLayout;
        linktag?: FNLinkTag;
        text: string;
        html: string;
        adv?: FNAdv;
    } & BasicItem & MetaItem;
    export type MText = TypedMap<{
        type: "text";
        mobile?: MText;
        childs?: TypedArray<void>;
    } & MBasicItem & MetaItem> & {
        parent: TypedArray<MItem> & {
            parent: MItem;
        };
    };
}
declare module "app/web/src/utils/types/item" {
    import { TypedArray, TypedMap } from "yjs-types";
    import { BasicItem, MBasicItem, MetaItem } from "app/web/src/utils/types/meta";
    import { FNAdv, FNComponent, FNLayout, FNLinkTag } from "app/web/src/utils/types/meta-fn";
    import { MSection } from "app/web/src/utils/types/section";
    import { IText, MText } from "app/web/src/utils/types/text";
    export type IItem = {
        layout?: FNLayout;
        linktag?: FNLinkTag;
        mobile?: IItem;
        adv?: FNAdv;
        type: "item";
        component?: FNComponent;
        childs: (IItem | IText)[];
    } & MetaItem & BasicItem;
    export type MItem = TypedMap<{
        type: "item";
        mobile?: MItem;
        childs?: TypedArray<MItem | MText>;
    } & MBasicItem & MetaItem> & {
        parent: TypedArray<MSection | MItem> & {
            parent: MSection | MItem;
        };
    };
}
declare module "app/web/src/utils/types/general" {
    import { page as dbpage } from "dbgen";
    import { TypedDoc, TypedMap } from "yjs-types";
    import { IItem, MItem } from "app/web/src/utils/types/item";
    import { IRoot, MRoot } from "app/web/src/utils/types/root";
    import { ISection, MSection } from "app/web/src/utils/types/section";
    import { IText, MText } from "app/web/src/utils/types/text";
    export type PageProps = {
        pathname: string;
        domain: string;
        params: any;
    };
    export type PrasiAPI = {
        apiEntry: any;
        prismaTypes: {
            "prisma.d.ts": string;
            "runtime/library.d.ts": string;
            "runtime/index.d.ts": string;
        };
        apiTypes: string;
    };
    export const w: {
        isEditor: boolean;
        isMobile: boolean;
        isDesktop: boolean;
        prasiApi: Record<string, PrasiAPI>;
        loadedFonts: string[];
        prasiApiDbPull: boolean;
        params: any;
        editorGlbDefault: string;
        ts: number;
        serverurl: string;
        api: any;
        db: any;
    };
    export type Page = {
        id: string;
        content_tree: IRoot;
        js: string | null;
        js_compiled: string | null;
    };
    export type MPage = TypedDoc<{
        map: TypedMap<Omit<dbpage, "content_tree" | "updated_at"> & {
            content_tree: MRoot;
            updated_at: string;
        }>;
    }>;
    export type IContent = ISection | IItem | IText;
    export type MContent = MSection | MItem | MText;
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
}
declare module "app/srv/ws/edit/tools/load-page" {
    import { Page } from "app/web/src/utils/types/general";
    export const loadPage: (page_id: string) => Promise<Page>;
}
declare module "app/srv/ws/edit/action/get-page" {
    import { WSData } from "pkgs/core/server/create";
    import { WS_MSG_GET_PAGE } from "app/web/src/utils/types/ws";
    export const getPage: (ws: ServerWebSocket<WSData>, msg: WS_MSG_GET_PAGE) => Promise<void>;
}
declare module "app/srv/ws/edit/action/get-comp" {
    import { WSData } from "pkgs/core/server/create";
    import { WS_MSG_GET_COMP } from "app/web/src/utils/types/ws";
    export const getComp: (ws: ServerWebSocket<WSData>, msg: WS_MSG_GET_COMP) => Promise<void>;
}
declare module "app/srv/ws/edit/action/sv-local" {
    export const svLocal: (ws: Websocket, msg: WS_MSG_SV_LOCAL) => Promise<void>;
}
declare module "app/srv/ws/edit/action/diff-local" {
    export const diffLocal: (ws: Websocket, msg: any) => Promise<void>;
}
declare module "app/srv/ws/edit/action/svdiff-remote" {
    export const svdiffRemote: (ws: Websocket, msg: WS_MSG_SVDIFF_REMOTE) => Promise<void>;
}
declare module "app/srv/ws/edit/action/undo-redo" {
    export const undo: (ws: Websocket, msg: WS_MSG_UNDO) => void;
    export const redo: (ws: Websocket, msg: WS_MSG_REDO) => void;
}
declare module "app/srv/ws/handler" {
    import { WebSocketHandler } from "bun";
    import { WSData } from "pkgs/core/server/create";
    export const wsHandler: Record<string, WebSocketHandler<WSData>>;
}
declare module "pkgs/core/utils/dir" {
    export const dir: {
        path: (path: string) => string;
    };
}
declare module "app/db/db" {
    
}
declare module "pkgs/core/utils/global" {
    import { Logger } from "pino";
    import { RadixRouter } from "radix3";
    
    type SingleRoute = {
        url: string;
        args: string[];
        fn: (...arg: any[]) => Promise<any>;
        path: string;
    };
    export const g: {
        status: "init" | "ready";
        datadir: string;
        
        dburl: string;
        mode: "dev" | "prod";
        
        log: Logger;
        api: Record<string, SingleRoute>;
        domains: null | Record<string, string>;
        router: RadixRouter<SingleRoute>;
        port: number;
        frm: {
            js: string;
            etag: string;
        };
        parcel: Subprocess;
    };
}
declare module "pkgs/core/server/api-ctx" {
    export const apiContext: (ctx: any) => {
        mode: any;
        req: Request & {
            params: any;
            query_parameters: any;
        };
        res: Response & {
            send: (body?: string | object) => void;
            setHeader: (key: string, value: string) => void;
            sendStatus: (code: number) => void;
        };
    };
    export const createResponse: (existingRes: any, body: any) => Response;
}
declare module "pkgs/core/server/serve-api" {
    export const serveAPI: (url: URL, req: Request) => Promise<Response>;
}
declare module "pkgs/core/server/create" {
    export type WSData = {
        url: URL;
    };
    export const createServer: () => Promise<void>;
}
declare module "app/srv/ws/edit/tools/load-site" {
    export type SiteConfig = {
        api_url?: string;
        prasi?: {
            port: number;
            dburl: string;
        };
    };
    export type Site = Exclude<Awaited<ReturnType<typeof loadSite>>, null>;
    export const loadSite: (idOrDomain: string) => Promise<Omit<site, "config"> & {
        config?: SiteConfig;
        page: {
            id: string;
            url: string;
            updated_at: Date | null;
            name: string;
        }[];
    }>;
}
declare module "app/srv/ws/edit/edit-global" {
    import { ServerWebSocket } from "bun";
    import { component } from "dbgen";
    import { UndoManager } from "yjs";
    import { TypedArray, TypedDoc, TypedMap } from "yjs-types";
    import type { WSData } from "pkgs/core/server/create";
    import { IItem } from "app/web/src/utils/types/item";
    import { IRoot } from "app/web/src/utils/types/root";
    import { Site } from "app/srv/ws/edit/tools/load-site";
    import { MPage } from "app/web/src/utils/types/general";
    import type { RadixRouter } from "radix3";
    type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never;
    export type SingleComp = {
        id: string;
        doc: TypedDoc<{
            map: TypedMap<component & {
                content_tree: TypedMap<IItem>;
            }>;
        }>;
        undoManager: UndoManager;
        saveTimeout?: ReturnType<typeof setTimeout>;
        ws: Set<ServerWebSocket<WSData>>;
    };
    export const eg: {
        cache: Record<string, Record<string, {
            id: string;
            js: string | null;
            url: string;
            js_compiled: string | null;
            content_tree: IRoot;
            lastRefresh: number;
        }>>;
        router: Record<string, RadixRouter<{
            id: string;
            url: string;
        }>>;
        edit: {
            site: Record<string, {
                id: string;
                doc: TypedDoc<{
                    site: TypedMap<Site & {
                        page: TypedArray<ArrayElement<Site["page"]>>;
                    }>;
                }>;
                undoManager: UndoManager;
                saveTimeout?: ReturnType<typeof setTimeout>;
                ws: Set<ServerWebSocket<WSData>>;
            }>;
            comp: Record<string, SingleComp>;
            page: Record<string, {
                id: string;
                doc: MPage;
                undoManager: UndoManager;
                saveTimeout?: ReturnType<typeof setTimeout>;
                ws: Set<ServerWebSocket<WSData>>;
            }>;
            ws: WeakMap<ServerWebSocket<WSData>, {
                clientID: string;
            }>;
        };
    };
}
declare module "app/srv/api/npm-bundle" {
    export type NPMImportAs = {
        main: {
            mode: "default" | "*";
            name: string;
        };
        names: string[];
        custom?: string;
    };
    export const _: {
        url: string;
        api(mode: "site" | "page", id: string): Promise<any>;
    };
}
declare module "app/srv/api/npm" {
    export const _: {
        url: string;
        api(mode: "site" | "page", id: string): Promise<void>;
    };
}
declare module "app/srv/api/auth/login" {
    export const _: {
        url: string;
        api(username: string, password: string): Promise<{
            status: string;
            session: any;
            reason?: undefined;
        } | {
            status: string;
            reason: string;
            session?: undefined;
        }>;
    };
}
declare module "app/srv/api/local-ip" {
    export const _: {
        url: string;
        api(): Promise<string[]>;
    };
}
declare module "app/srv/exports" {
    export const npm_size: {
        name: string;
        url: string;
        path: string;
        args: string[];
        handler: Promise<typeof import("app/srv/api/npm-size")>;
    };
    export const session: {
        name: string;
        url: string;
        path: string;
        args: any[];
        handler: Promise<typeof import("app/srv/api/auth/session")>;
    };
    export const site_dts: {
        name: string;
        url: string;
        path: string;
        args: string[];
        handler: Promise<typeof import("app/srv/api/site-dts")>;
    };
    export const npm_bundle: {
        name: string;
        url: string;
        path: string;
        args: string[];
        handler: Promise<typeof import("app/srv/api/npm-bundle")>;
    };
    export const npm: {
        name: string;
        url: string;
        path: string;
        args: string[];
        handler: Promise<typeof import("app/srv/api/npm")>;
    };
    export const login: {
        name: string;
        url: string;
        path: string;
        args: string[];
        handler: Promise<typeof import("app/srv/api/auth/login")>;
    };
    export const local_ip: {
        name: string;
        url: string;
        path: string;
        args: any[];
        handler: Promise<typeof import("app/srv/api/local-ip")>;
    };
    export const _upload: {
        name: string;
        url: string;
        path: string;
        args: string[];
        handler: Promise<any>;
    };
    export const _prasi: {
        name: string;
        url: string;
        path: string;
        args: any[];
        handler: Promise<any>;
    };
    export const _api_frm: {
        name: string;
        url: string;
        path: string;
        args: any[];
        handler: Promise<any>;
    };
    export const _dbs: {
        name: string;
        url: string;
        path: string;
        args: string[];
        handler: Promise<any>;
    };
    export const _file: {
        name: string;
        url: string;
        path: string;
        args: any[];
        handler: Promise<any>;
    };
}
