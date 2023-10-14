import { join } from "path";

export const dir = (path: string) => {
  return join(process.cwd(), path);
};
