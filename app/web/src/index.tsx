import "./index.css";

const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      await navigator.serviceWorker.register(
        new URL("./sw.js", import.meta.url),
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
