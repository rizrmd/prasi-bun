export const baseTypings = `
  type FC<T> = ReactFC<T>;
  const Fragment: typeof React.Fragment;
  const ReactNode: RNode;
  const useCallback: typeof React.useCallback;
  const useMemo: typeof React.useMemo;
  const ReactElement: RElement;
  const isValidElement: typeof React.isValidElement;
  const useEffect: typeof React.useEffect;
  const useState: typeof React.useState;

  const pathname: string;
  const isEditor: boolean;
  const isLayout: boolean;
  const isMobile: boolean;
  const isDesktop: boolean;
  const siteurl: (path:string) => string;
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
  const navigate: (url: string) => void;
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
  const children: RElement;

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
  

  type SingleChange = { type: "set" | "prop"; name: string; value: any };
  type PropVal = string | { type: "raw"; value: string; valueBuilt?: string };
  type ChildArg = {
    name: string;
  } & (
    | {
        type?: "text";
        item?: Partial<IItem>;
      }
    | ItemArg
  );

  type ItemArg = {
    type?: "item";
    component?: { id: string; prop?: Record<string, PropVal> };
    item?: Partial<IItem>;
    childs?: ChildArg[];
  };
  type ParentArg = ItemArg & { parent?: ItemArg & PrasiEdit } & PrasiEdit;
  type PrasiEdit = {
    edit: {
      setValue: <T extends keyof IItem>(name: T, value: IItem[T]) => void;
      setProp: (name: string, value: PropVal) => void;
      pending: SingleChange[];
      childs: ChildArg[];
      parent: ParentArg;
      commit: () => Promise<void>;
    };
  };


  type PrasiItem = IItem & PrasiEdit;

  const _item: undefined | PrasiItem;
  
  const PassProp: (arg:Record<string, any> & { children: RNode }>) => RElement;
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
    children: ReactNode;
    deps?: any[];
    effect?: (
      local: T & { render: () => void }
    ) => void | (() => void) | Promise<void | (() => void)>;
    hook?: (
      local: T & { render: () => void }
    ) => void | (() => void) | Promise<void | (() => void)>;
    cache?: boolean;
  }) => RElement
`;
