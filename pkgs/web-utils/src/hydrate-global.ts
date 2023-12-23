const w = (typeof window !== "undefined" ? window : {}) as unknown as {
  globalValueID?: WeakMap<any, string>;
};

export const hydrateGlobal = (
  global_ref: any,
  key: string,
  initial_data: any
) => {};
