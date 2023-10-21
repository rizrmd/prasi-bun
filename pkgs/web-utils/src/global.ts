import goober from "goober";
import type { PrismaClient } from "../../../app/db/db";
import * as Yjs from "yjs";
declare global {
  const navigate: (path: string) => void;
  const params: any;
  const css: typeof goober.css;
  const cx: (...arg: any[]) => string;
  const api: any;
  const db: PrismaClient;
  const prasiContext: any;
  const serverurl: string;
  const Y: typeof Yjs;
}
export {};
