//@ts-nocheck
import f1 from "bundle-text:@fontsource/jetbrains-mono/index.css";
import f2 from "bundle-text:@fontsource/source-sans-3/index.css";

let style = document.createElement("style");
style.textContent = f1.replaceAll(`url("`, `url("/`) + f2.replaceAll(`url("`, `url("/`);
style.id = "font";
document.head.appendChild(style);
