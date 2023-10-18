import { FC, useCallback, useEffect } from "react";
import parseUA from "ua-parser-js";
import { useGlobal } from "web-utils";
import { LPage } from "./elements/l-page";
import { LiveGlobal, Loader } from "./logic/global";
import { initLive, w } from "./logic/init";
import { preload, routeLive } from "./logic/route";

export const Live: FC<{
  domain_or_siteid: string;
  pathname: string;
  loader: Loader;
}> = ({ domain_or_siteid, pathname, loader }) => {
  const p = useGlobal(LiveGlobal, "LIVE");
  p.loader = loader;

  w.preload = (url: string) => {
    preload(p, url);
  };

  if (p.site.id) {
    if (!p.mode && !!p.site.responsive) {
      if (p.site.responsive === "all") {
        const parsed = parseUA();
        p.mode = parsed.device.type === "mobile" ? "mobile" : "desktop";
        if (localStorage.getItem("prasi-editor-mode")) {
          p.mode = localStorage.getItem("prasi-editor-mode") as any;
        }
      } else if (p.site.responsive === "mobile-only") {
        p.mode = "mobile";
      } else if (p.site.responsive === "desktop-only") {
        p.mode = "desktop";
      }
    }
  }
  const onResize = useCallback(() => {
    let newmode = p.mode;
    if (window.innerWidth < 600) newmode = "mobile";
    else newmode = "desktop";

    if (newmode !== p.mode) {
      p.mode = newmode;
      p.render();
    }
  }, [p]);

  useEffect(() => {
    if (p.site.id) {
      window.removeEventListener("resize", onResize);

      if (p.site.responsive === "all") {
        window.addEventListener("resize", onResize);
      }
    }
  }, [p.site.responsive]);

  if (p.status === "init") {
    initLive(p, domain_or_siteid);
  }

  if (p.site.id) {
    routeLive(p, pathname);
  }

  if (p.status === "not-found")
    return (
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <div className="text-[40px]">404</div>
        <div>NOT FOUND</div>
      </div>
    );

  return <LPage />;
};
