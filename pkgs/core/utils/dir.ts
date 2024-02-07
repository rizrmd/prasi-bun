import { join } from "path";
import { g } from "./global";

export const dir = {
  data: (path: string) => {
    const final_path = path
      .split("/")
      .filter((e) => e !== "..")
      .join("/");
    if (g.mode === "prod") return join(process.cwd(), "..", "data", final_path);
    else return join(process.cwd(), "data", final_path);
  },
  path: (path: string) => {
    const final_path = path
      .split("/")
      .filter((e) => e !== "..")
      .join("/");
    return join(process.cwd(), final_path);
  },
};
