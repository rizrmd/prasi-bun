import { join } from "path";

export const dir = {
  path: (path: string, safe?: boolean) => {
    if (safe === false) return join(process.cwd(), path);

    if (path.startsWith(process.cwd())) {
      return path;
    }
    
    const final_path = path
      .split("/")
      .filter((e) => e !== "..")
      .join("/");
    return join(process.cwd(), final_path);
  },
};
