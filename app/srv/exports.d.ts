/// <reference types="node" />
declare module "api/auth/login" {
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
declare module "api/session" {
    export const _: {
        url: string;
        api(): Promise<any>;
    };
}
declare module "global" {
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
declare module "api/npm" {
    export const _: {
        url: string;
        api(mode: "site" | "page", id: string): Promise<void>;
    };
}
declare module "exports" {
    export const login: {
        name: string;
        url: string;
        path: string;
        args: string[];
        handler: Promise<typeof import("api/auth/login")>;
    };
    export const session: {
        name: string;
        url: string;
        path: string;
        args: any[];
        handler: Promise<typeof import("api/session")>;
    };
    export const npm: {
        name: string;
        url: string;
        path: string;
        args: string[];
        handler: Promise<typeof import("api/npm")>;
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
    export const _file: {
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
}
