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
  const preload: (urls: string[]) => ReactNode;
  const apiHeaders: Record<string, any>;
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
  };
  const children: RNode;

  const PassProp: FC<Record<string, any> & { children: React.ReactNode }>;
  const Preload: FC<{ url: string[] }>;
  const apiurl: string;
  const pageid: string;
  type ITEM = {
    id: string;
    name: string;
    type: "item" | "text";
    adv?: {
      js?: string;
      jsBuilt?: string;
      css?: string;
      html?: string;
    };
    text: string;
    html: string;
    component?: {
      id: string;
      props: Record<
        string,
        {
          value: string;
          valueBuilt: string;
          meta: { type: string };
        }
      >;
    };
    childs: ITEM[];
  };
  const newElement: (gen?: (item: ITEM) => ITEM | ITEM[]) => React.ReactNode;
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
  }) => RNode
`;
