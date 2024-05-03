import Parcel from "@parcel/core";
import { Subprocess } from "bun";
import type { BuildContext } from "esbuild";

const g = global as unknown as {
  prasi_code: any;
};
type SITE_ID = string;

export const codeInternal = {
  get server() {
    if (!g.prasi_code) g.prasi_code = {};
    if (!g.prasi_code.server) g.prasi_code.server = {};
    return g.prasi_code.server as Record<SITE_ID, BuildContext>;
  },
  get frontend() {
    if (!g.prasi_code) g.prasi_code = {};
    if (!g.prasi_code.frontend) g.prasi_code.frontend = {};
    return g.prasi_code.frontend as Record<SITE_ID, BuildContext>;
  },
  get typings() {
    if (!g.prasi_code) g.prasi_code = {};
    if (!g.prasi_code.typings) g.prasi_code.typings = {};
    return g.prasi_code.typings as Record<SITE_ID, Subprocess>;
  },
};
