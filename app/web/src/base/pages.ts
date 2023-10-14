export const all = {
  url: "**",
  page: () => import("./page/all"),
};
export const login = {
  url: "/login",
  page: () => import("./page/auth/login"),
};
