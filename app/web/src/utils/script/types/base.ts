export const baseTypings = `
  type FC<T> = React.FC<T>;
  const Fragment: typeof React.Fragment;
  const ReactNode: typeo React.ReactNode;
  const useCallback: typeof React.useCallback;
  const useMemo: typeof React.useMemo;
  const ReactElement: typeof React.ReactElement;
  const isValidElement: typeof React.isValidElement;
  const useEffect: typeof React.useEffect;
  const useState: typeof React.useState;

  const prasi_internal: {
    page: { id: string };
  };

  const pathname: string;
  const isEditor: boolean;
  const isLayout: boolean;
  const isMobile: boolean;
  const isDesktop: boolean;
  const __props: any;
  const siteurl: (path:string) => string;
  const preloaded: (url:string) => boolean;
  const preload: (urls: string | string[], opt?: {
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
    ) => void;}) => ReactNode;
  const navigate: (url: string,
    params?: {
      name?: string;
      where?: any;
      create?: any;
      update?: any;
      breads?: { label: string; url?: string }[];
    }
  ) => void;
  const params: any;
  const cx: (...classNames: any[]) => string;
  const css: (
    tag: TemplateStringsArray | string,
    ...props: Array<string | number | boolean | undefined | null>
  ) => string;

  const props: {
    className: string;
    onPointerDown?: () => void;
    onPointerMove?: () => void;
    onPointerLeave?: () => void;
    inherit?: {
      style: any,
      className: string
    }
  };
  const children: ReactElement;

  type IItem = {
    id: string;
    name: string;
    type: "item" | "text";
    adv?: {
      js?: string;
      jsBuilt?: string;
      css?: string;
      html?: string;
    };
    text?: string;
    html?: string;
    component?: {
      id: string;
      props: Record<
        string,
        { type: "string" | "raw"; value: string; valueBuilt?: string }
      >;
    };
    childs: IItem[];
  };

  type SingleChange =
    | { type: "set"; name: string; value: any }
    | ({ type: "prop"; name: string } & PropVal)
    | { type: "child"; childs: SimpleItem[] };

  export type PropVal =
    | { mode: "string"; value: string }
    | { mode: "raw"; value: string; valueBuilt?: string }
    | { mode: "jsx"; value: null | (IItem & PrasiEdit) | SimpleItem };

  type ParentArg = {
    item: IItem & PrasiEdit;
    child_type: "jsx" | "child";
    child_idx: number;
  };

  type SimpleItem = Partial<Omit<IItem, "component">> & {
    component?: { id: string; props: Record<string, PropVal> };
  };

  type PrasiEdit = {
    edit: {
      setValue: <T extends keyof IItem>(name: T, value: IItem[T]) => void;
      setProp: (name: string, value: PropVal | string) => void;
      pending: SingleChange[];
      childs: (IItem & PrasiEdit)[];
      setChilds: (childs: ((IItem & PrasiEdit) | SimpleItem)[]) => void;
      readonly parent: null | ParentArg;
      commit: () => Promise<void>;
      readonly props?: Record<string, PropVal>;
    };
  };

  type PrasiItem = IItem & PrasiEdit;
  const _item: PrasiItem;
  const _metas: Record<string, any>;
  const _meta: {
    item: any;
    mitem?: any;
    parent?: {
      id: string;
      instance_id?: string;
      comp_id?: string;
    };
    instances?: Record<string, Record<string, string>>;
    jsx_prop?: {
      name: string;
      comp_id: string;
      is_root: boolean;
      child?: {
        prop_id: string;
        comp_id: string;
      };
    };
    editor_props?: any;
    script?: {
      scope?: any;
      result: any;
      Local: any;
      PassProp: any;
    };
    render?: () => void;
  };

  const PassProp: (arg:Record<string, any> & { children: ReactNode }>) => ReactElement;
  const mobile: {
    notif: {
      register: (user_id: string) => void;
      send: (data: {
        user_id: string;
        title: string;
        body: string;
        data: any;
      }) => void;
      onTap: (
        data: null | {
          user_id: string;
          title: string;
          body: string;
          data: any;
        }
      ) => void | Promise<void>;
      onReceive: (data: {
        user_id: string;
        title: string;
        body: string;
        data: any;
      }) => void | Promise<void>;
    };
  };
  const Local: <T extends Record<string, any>>(arg: {
    name: string;
    idx?: any;
    value: T;
    children?: any;
    deps?: any[];
    effect?: (
      local: T & { render: () => void }
    ) => void | (() => void) | Promise<void | (() => void)>;
    hook?: (
      local: T & { render: () => void }
    ) => void | (() => void) | Promise<void | (() => void)>;
    cache?: boolean;
  }) => ReactElement
`;
