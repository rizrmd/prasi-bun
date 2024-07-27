import { Root as ReactRoot } from "react-dom/client";
import { Root } from "./base/root";
import { w } from "./utils/types/general";
import { isLocalhost } from "./utils/ui/is-localhost";

export const sworkerRegister = async (react: { root: null | ReactRoot }) => {
  if (navigator.serviceWorker) {
    if (!isLocalhost()) {
      const sw = await registerServiceWorker();
      const cacheCurrentPage = () => {
        const swController = navigator.serviceWorker.controller;
        if (swController) {
          [location.href, "", "/", "/ed", "/ed/_/_", "/login"].forEach(
            (url) => {
              swController.postMessage({
                type: "add-cache",
                url: url,
              });
            }
          );
        }
      };
      cacheCurrentPage();

      navigator.serviceWorker.addEventListener("message", (e) => {
        cacheCurrentPage();
        if (react.root) {
          if (e.data.type === "offline") {
            w.offline = true;
            const click = () => {
              if (react.root) react.root.render(<Root />);
            };
            setTimeout(click, 5000);
            react.root.render(
              <>
                <Root />
                <div
                  className={cx(
                    css`
                      position: fixed;
                      bottom: 20px;
                      left: 0px;
                      right: 0px;
                      z-index: 999;
                    `,
                    "flex justify-center cursor-pointer"
                  )}
                >
                  <div
                    className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm"
                    onClick={click}
                  >
                    Network Failed
                  </div>
                </div>
              </>
            );
          }

          if (e.data.type === "activated") {
            if (e.data.shouldRefresh && sw) {
              react.root.render(
                <>
                  <Root />
                  <div
                    className={cx(
                      css`
                        position: fixed;
                        bottom: 20px;
                        left: 0px;
                        right: 0px;
                        z-index: 999;
                      `,
                      "flex justify-center"
                    )}
                  >
                    <div className="bg-blue-400 text-white px-4 py-2 rounded-full text-sm">
                      Updating App...
                    </div>
                  </div>
                </>
              );

              sw.unregister().then(() => {
                window.location.reload();
              });
            } else {
              const localVersion = localStorage.getItem("prasi-version");
              if (localVersion !== e.data.version) {
                localStorage.setItem("prasi-version", e.data.version);
                const click = () => {
                  if (react.root) react.root.render(<Root />);
                };
                setTimeout(click, 5000);
                react.root.render(
                  <>
                    <Root />
                    <div
                      className={cx(
                        css`
                          position: fixed;
                          bottom: 20px;
                          left: 0px;
                          right: 0px;
                          z-index: 999;
                        `,
                        "flex justify-center cursor-pointer"
                      )}
                    >
                      <div
                        className="bg-green-600 text-white px-4 py-2 rounded-full text-sm"
                        onClick={click}
                      >
                        Prasi Updated{" "}
                        <span className="opacity-50">{e.data.version}</span>
                      </div>
                    </div>
                  </>
                );
              }
            }
          }
        }
      });
    } else {
      navigator.serviceWorker.getRegistrations().then(function (registrations) {
        for (let registration of registrations) {
          registration.unregister();
        }
      });
    }
  }
};

const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      return await navigator.serviceWorker.register(
        new URL("./sworker.ts", import.meta.url),
        {
          type: "module",
          scope: "/",
        }
      );
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};

export const sworkerAddCache = (base: string) => {
  if (navigator.serviceWorker) {
    if (!isLocalhost()) {
      const swc = navigator.serviceWorker.controller;
      if (swc) {
        [location.href, "", "/", "/ed", "/ed/_/_", "/login"].forEach((url) => {
          swc.postMessage({
            type: "add-cache",
            url: url,
          });
        });
        if (w.prasiApi && w.prasiApi[base] && w.prasiApi[base].apiEntry) {
          const routes = Object.entries(w.prasiApi[base].apiEntry).map(
            ([k, v]: any) => ({
              url: v.url,
              name: k,
            })
          );

          swc.postMessage({
            type: "define-route",
            routes,
          });
        }
      }
    }
  }
};
