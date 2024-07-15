import { createRoot } from "react-dom/client";
import { defineReact, defineWindow } from "web-utils";
import { initBaseConfig } from "./base/base";
import { Root, isPreview } from "./root";
import { w } from "./w";

(async () => {
  initBaseConfig();
  const div = document.getElementById("root");
  if (div) {
    await defineWindow(false);

    let react = {
      root: createRoot(div),
    };
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

    react.root.render(<Root />);
    if (document.body.classList.contains("opacity-0")) {
      document.body.classList.remove("opacity-0");
    }
  }
})();
