const w = window as unknown as {
  prasi_ext: Record<string, PrasiExt>;
};
if (!w.prasi_ext) {
  w.prasi_ext = {};
}

export type PrasiExt = {
  status: "init" | "loading" | "ready";
  notif?: {
    token: string;
  };
};
export const prasi_ext = w.prasi_ext;
