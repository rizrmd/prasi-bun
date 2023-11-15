import { FC, useState } from "react";
import { createRoot } from "react-dom/client";
import { GlobalContext, defineReact, defineWindow } from "web-utils";
import { siteLoader } from "./site-loader";
import { registerMobile } from "../live/logic/mobile";

const w = window as unknown as {
  prasiContext: any;
  rootRender: any;
  mobile: any;
};

if (!w.mobile) {
  w.mobile = registerMobile();
}

w.prasiContext = {
  global: {},
  render() {},
};

const Root: FC<{ url: URL; Live: any }> = ({ url, Live }) => {
  const [_, render] = useState({});
  w.prasiContext.render = () => {
    render({});
  };

  console.log(siteLoader)
  const Provider = GlobalContext.Provider as FC<{ value: any; children: any }>;
  return (
    <Provider value={w.prasiContext}>
      <Live
        domain={url.host}
        pathname={location.pathname}
        loader={siteLoader}
      />
    </Provider>
  );
};

(async () => {
  const div = document.getElementById("root");
  if (div) {
    const root = createRoot(div);
    const url = new URL(location.href);
    await defineWindow(false);
    defineReact();
    const { Live } = await import("../live/live");
    root.render(<Root url={url} Live={Live} />);
    if (document.body.classList.contains("opacity-0")) {
      document.body.classList.remove("opacity-0");
    }
  }
})();
