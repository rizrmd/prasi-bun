export const w = window as unknown as {
  prasiContext: {
    global: any;
    render: () => void;
  };
  params: any;
  navigateOverride: (href: string) => void;
};
