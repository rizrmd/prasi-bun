export const npm_size = {
  name: "npm_size",
  url: "/npm-size/:mode/:id",
  path: "app/srv/api/npm-size.ts",
  args: ["mode","id"],
  handler: import("./api/npm-size")
}
export const login = {
  name: "login",
  url: "/_login",
  path: "app/srv/api/auth/login.ts",
  args: ["username","password"],
  handler: import("./api/auth/login")
}
export const session = {
  name: "session",
  url: "/session",
  path: "app/srv/api/session.ts",
  args: [],
  handler: import("./api/session")
}
export const npm = {
  name: "npm",
  url: "/npm/:mode/:id/*",
  path: "app/srv/api/npm.ts",
  args: ["mode","id"],
  handler: import("./api/npm")
}
export const npm_bundle = {
  name: "npm_bundle",
  url: "/npm-bundle/:mode/:id",
  path: "app/srv/api/npm-bundle.ts",
  args: ["mode","id"],
  handler: import("./api/npm-bundle")
}
export const site_dts = {
  name: "site_dts",
  url: "/site-dts/:site_id",
  path: "app/srv/api/site-dts.ts",
  args: ["site_id"],
  handler: import("./api/site-dts")
}
export const _upload = {
  name: "_upload",
  url: "/_upload",
  path: "app/srv/api/_upload.ts",
  args: ["body"],
  handler: import("./api/_upload")
}
export const _prasi = {
  name: "_prasi",
  url: "/_prasi/*",
  path: "app/srv/api/_prasi.ts",
  args: [],
  handler: import("./api/_prasi")
}
export const _file = {
  name: "_file",
  url: "/_file/*",
  path: "app/srv/api/_file.ts",
  args: [],
  handler: import("./api/_file")
}
export const _api_frm = {
  name: "_api_frm",
  url: "/_api_frm",
  path: "app/srv/api/_api_frm.ts",
  args: [],
  handler: import("./api/_api_frm")
}
export const _dbs = {
  name: "_dbs",
  url: "/_dbs/:dbName/:action",
  path: "app/srv/api/_dbs.ts",
  args: ["dbName","action"],
  handler: import("./api/_dbs")
}