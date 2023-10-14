import { createRoot } from "react-dom/client";
import { defineReact, defineWindow } from "web-utils";
import { Root } from "./base/root";
import "./index.css";
import { createAPI, createDB, reloadDBAPI } from "./utils/script/init-api";
import { w } from "./utils/types/general";

const start = async () => {
  registerServiceWorker();
  defineReact();
  await defineWindow(false);
  const base = `${location.protocol}//${location.host}`;
  w.serverurl = base;
  await reloadDBAPI(base);
  w.api = createAPI(base);
  w.db = createDB(base);

  const el = document.getElementById("root");
  if (el) {
    createRoot(el).render(<Root />);
  }
};

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

start();
