import goober from "goober";
import type { PrismaClient } from "../../../app/db/db";

declare global {
  const navigate: (path: string) => void;
  const params: any;
  const css: typeof goober.css;
  const cx: (...arg: any[]) => string;
  const _api: any;
  const _db: PrismaClient;
  const prasiContext: any;
  const serverurl: string;
}
export {};
