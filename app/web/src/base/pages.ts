export const all = {
  url: "**",
  page: () => import("./page/all"),
};
export const login = {
  url: "/login",
  page: () => import("./page/auth/login"),
};

export const editor = {
  url: "/editor/:site_id/:page_id",
  page: () => import("./page/editor"),
};
