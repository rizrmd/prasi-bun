export const auth_login = {
  url:  "/login",
  page: () => import("./page/auth/login"),
};
export const auth_logout = {
  url:  "/logout",
  page: () => import("./page/auth/logout"),
};
export const auth_register = {
  url:  "/register",
  page: () => import("./page/auth/register"),
};
export const all = {
  url:  "**",
  page: () => import("./page/all"),
};
export const editor = {
  url:  "/editor/:site_id/:page_id",
  page: () => import("./page/editor"),
};
export const live = {
  url:  "/live/:domain/**",
  page: () => import("./page/live"),
};
export const ned = {
  url:  "/ed/:site_id/:page_id",
  page: () => import("./page/ned"),
};
