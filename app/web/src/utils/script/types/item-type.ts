type PrasiItemSingle = {
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
  childs: PrasiItemSingle[];
};

export type PrasiItem = PrasiItemSingle & {
  update: (fn: () => Promise<void> | void) => void;
};
