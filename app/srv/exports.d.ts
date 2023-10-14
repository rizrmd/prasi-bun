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
    export const _web: {
        name: string;
        url: string;
        path: string;
        args: string[];
        handler: Promise<any>;
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
