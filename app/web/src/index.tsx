import { createRoot } from "react-dom/client";
import "./index.css";
import { Root } from "./base/root";

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
  createRoot(el).render(<Root />);
}
