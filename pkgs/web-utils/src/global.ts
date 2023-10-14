import goober from "goober";

declare global {
  const navigate: (path: string) => void;
  const params: any;
  const css: typeof goober.css;
  const cx: (...arg: string[]) => string;
  const api: any;
  const db: any;
  const prasiContext: any;
}
export {};
