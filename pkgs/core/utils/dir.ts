import { join } from "path";

export const dir = {
  path: (path: string) => {
    const final_path = path.split("/").filter((e) => e !== "..").join('/');
    return join(process.cwd(), final_path);
  },
};
