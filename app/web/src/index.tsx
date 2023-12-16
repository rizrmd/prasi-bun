import { Root as ReactRoot, createRoot } from "react-dom/client";
import { defineReact, defineWindow } from "web-utils";
import { Root } from "./base/root";
import "./index.css";
import { registerMobile } from "./render/live/logic/mobile";
import { reloadDBAPI } from "./utils/script/init-api";
import { w } from "./utils/types/general";
import { sworkerAddCache, sworkerRegister } from "./sworker-boot";

const start = async () => {
  const base = `${location.protocol}//${location.host}`;
  let react = {
    root: null as null | ReactRoot,
  };
  w.mobile = registerMobile();

  // sworkerRegister(react);
  defineReact();
  await defineWindow(false);
  // await reloadDBAPI(base, "prod");
  // sworkerAddCache(base);

  const el = document.getElementById("root");

  if (el) {
    react.root = createRoot(el);
    react.root.render(<Root />);
  }
};

start();
