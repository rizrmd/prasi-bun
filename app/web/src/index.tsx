import { createRoot } from "react-dom/client";
import { defineReact, defineWindow } from "web-utils";
import { Root } from "./base/root";
import "./index.css";
import { createAPI, createDB, reloadDBAPI } from "./utils/script/init-api";

const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register(
        new URL("./sworker.js", import.meta.url),
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

registerServiceWorker();

const el = document.getElementById("root");

if (el) {
  (async () => {
    defineReact();
    await defineWindow(false);
    const w = window as any;
    const base = `${location.protocol}//${location.host}`;

    await reloadDBAPI(base);
    w.api = createAPI(base);
    w.db = createDB(base);

    createRoot(el).render(<Root />);
  })();
}
