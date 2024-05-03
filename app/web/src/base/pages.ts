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
export const ed = {
  url:  "/ed/:site_id/:page_id",
  page: () => import("./page/ed"),
};
export const vi = {
  url:  "/vi/:domain/**",
  page: () => import("./page/vi"),
};
