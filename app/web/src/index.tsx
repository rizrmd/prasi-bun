import { createRoot } from "react-dom/client";
import { defineReact, defineWindow } from "web-utils";
import { Root } from "./base/root";
import "./index.css";
import { createAPI, createDB, reloadDBAPI } from "./utils/script/init-api";
import { w } from "./utils/types/general";

const start = async () => {
  const sw = await registerServiceWorker();

  defineReact();
  await defineWindow(false);
  const base = `${location.protocol}//${location.host}`;
  w.serverurl = base;
  await reloadDBAPI(base);
  w.api = createAPI(base);
  w.db = createDB(base);

  navigator.serviceWorker.addEventListener("message", (e) => {
    console.log("[SW]", e.data);
    if (e.data.type === "activated") {
      if (e.data.shouldRefresh && sw) {
        sw.unregister().then(() => {
          window.location.reload();
        });
      }
    }
    if (e.data.type === "ready") {
      const sw = navigator.serviceWorker.controller;

      if (sw) {
        const routes = Object.entries(w.prasiApi[base].apiEntry).map(
          ([k, v]: any) => ({
            url: v.url,
            name: k,
          })
        );

        sw.postMessage({
          type: "add-cache",
          url: location.href,
        });
        sw.postMessage({
          type: "define-route",
          routes,
        });
      }
    }
  });

  const el = document.getElementById("root");
  if (el) {
    createRoot(el).render(<Root />);
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

start();
