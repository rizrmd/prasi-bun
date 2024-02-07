import { createRoot } from "react-dom/client";
import { defineReact, defineWindow } from "web-utils";
import { Root } from "./root";
import { initBaseConfig } from "./base/base";

(async () => {
  initBaseConfig();
  const div = document.getElementById("root");
  if (div) {
    const root = createRoot(div);
    await defineWindow(false);
    defineReact();
    root.render(<Root />);
    if (document.body.classList.contains("opacity-0")) {
      document.body.classList.remove("opacity-0");
    }
  }
})();
