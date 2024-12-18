import { createRoot } from "react-dom/client";
import { defineReact, defineWindow } from "web-utils";
import { initBaseConfig } from "./base/base";
import { Root, isPreview } from "./root";
import { w } from "./w";

(async () => {
  import("./font");
  initBaseConfig();
  const div = document.getElementById("root");
  if (div) {
    await defineWindow(false);

    let react = {
      root: createRoot(div),
    };
    defineReact();

    let internal_url = "/_prasi/code/internal.js";
    if (location.pathname.startsWith("/prod/")) {
      const patharr = location.pathname.split("/");
      internal_url = `/prod/${patharr[2]}${internal_url}`;
    }

    const prasi_internal = await import(internal_url);
    if (typeof prasi_internal === "object") {
      const w = window as any;
      if (prasi_internal.Loading) w.ContentLoading = prasi_internal.Loading;
      if (prasi_internal.NotFound) w.ContentNotFound = prasi_internal.NotFound;
    }

    w.navigateOverride = (_href: string) => {
      if (_href && _href.startsWith("/")) {
        if (isPreview()) {
          if (
            location.pathname.startsWith("/prod/") &&
            !_href.startsWith("/prod/")
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
