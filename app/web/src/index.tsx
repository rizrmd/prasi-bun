import { Root as ReactRoot, createRoot } from "react-dom/client";
import { defineReact, defineWindow } from "web-utils";
import { Root } from "./base/root";
import "./index.css";
import { registerMobile } from "./render/live/logic/mobile";
import { reloadDBAPI } from "./utils/script/init-api";
import { w } from "./utils/types/general";
import { sworkerAddCache, sworkerRegister } from "./sworker-boot";
import { dbClient } from "./base/load/db/client-db";

const start = async () => {
  const base = `${location.protocol}//${location.host}`;
  let react = {
    root: null as null | ReactRoot,
  };
  w.mobile = registerMobile();
  w.db = dbClient("prasi", location.origin);
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
