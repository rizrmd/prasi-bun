import { $ } from "execa";
import { g } from "./global";

export const restartServer = () => {
  if (g.mode === "dev") {
    $`bun ${g.mode}`;
  }
  
  process.exit(0);
};
