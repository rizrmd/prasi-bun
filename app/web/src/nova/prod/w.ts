export const w = window as unknown as {
  prasiContext: {
    global: any;
    render: () => void;
  };
  params: any;
  navigateOverride: (href: string) => void;
  pointerActive: boolean
  _prasi: {
    basepath: string;
    page_id?: string;
    params?: any;
    routed?: {
      page_id?: string;
      params?: any;
    };
  };
};
