import { join } from "path";

export const dir = {
  path: (path: string) => {
    return join(process.cwd(), path);
  },
};
