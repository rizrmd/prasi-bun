import { FC } from "react";

import { useState } from "react";
import { GlobalContext } from "web-utils";

const w = window as unknown as {
  prasiContext: any;
  rootRender: any;
};

w.prasiContext = {
  global: {},
  render() {},
};

export const Root: FC<{}> = ({}) => {
  const [_, render] = useState({});
  w.prasiContext.render = () => {
    render({});
  };
  w.rootRender = w.prasiContext.render;

  const Provider = GlobalContext.Provider as FC<{ value: any; children: any }>;
  return <Provider value={w.prasiContext}>Hello mantapun alamuko</Provider>;
};
