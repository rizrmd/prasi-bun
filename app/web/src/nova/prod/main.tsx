import { createRoot } from "react-dom/client";
import { defineReact, defineWindow } from "web-utils";
import { Root, isPreview } from "./root";
import { initBaseConfig } from "./base/base";
import { w } from "./w";

(async () => {
  initBaseConfig();
  const div = document.getElementById("root");
  if (div) {
    const root = createRoot(div);
    await defineWindow(false);
    defineReact();

    w.navigateOverride = (_href: string) => {
      if (_href && _href.startsWith("/")) {
        if (isPreview()) {
          if (
            location.pathname.startsWith("/prod") &&
            !_href.startsWith("/prod")
          ) {
            const patharr = location.pathname.split("/");
            _href = `/prod/${patharr[2]}${_href}`;
          }
        }
      }
      return _href;
    };

    root.render(<Root />);
    if (document.body.classList.contains("opacity-0")) {
      document.body.classList.remove("opacity-0");
    }
  }
})();
