import { base } from "./base";
import parseUA from "ua-parser-js";

export const detectResponsiveMode = () => {
  const p = base;
  if (p.site.id) {
    if (!p.mode && !!p.site.responsive) {
      if (
        p.site.responsive !== "mobile-only" &&
        p.site.responsive !== "desktop-only"
      ) {
        const parsed = parseUA();
        p.mode = parsed.device.type === "mobile" ? "mobile" : "desktop";
      } else if (p.site.responsive === "mobile-only") {
        p.mode = "mobile";
      } else if (p.site.responsive === "desktop-only") {
        p.mode = "desktop";
      }
    }
    if (localStorage.getItem("prasi-editor-mode")) {
      p.mode = localStorage.getItem("prasi-editor-mode") as any;
    }
  }
};
