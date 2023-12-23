import { Root as ReactRoot, createRoot } from "react-dom/client";
import { defineReact, defineWindow } from "web-utils";
import { apiProxy } from "./base/load/api/api-proxy";
import { loadApiProxyDef } from "./base/load/api/api-proxy-def";
import { dbProxy } from "./base/load/db/db-proxy";
import { Root } from "./base/root";
import "./index.css";
import { registerMobile } from "./render/live/logic/mobile";
import { sworkerAddCache, sworkerRegister } from "./sworker-boot";
import { w } from "./utils/types/general";

const start = async () => {
  const base = `${location.protocol}//${location.host}`;
  let react = {
    root: null as null | ReactRoot,
  };
  w.mobile = registerMobile();

  const cur = new URL(location.href);
  const base_url = `${cur.protocol}//${cur.host}`;
  w.db = dbProxy(base_url);

  try {
    await loadApiProxyDef(base_url, false);
    w.api = apiProxy(base_url);
  } catch (e) {
    console.warn("Failed to load API:", base_url);
  }

  w.serverurl = base;

  sworkerRegister(react);
  defineReact();
  await defineWindow(false);
  sworkerAddCache(base);

  const el = document.getElementById("root");

  if (el) {
    react.root = createRoot(el);
    react.root.render(<Root />);
  }
};

start();
