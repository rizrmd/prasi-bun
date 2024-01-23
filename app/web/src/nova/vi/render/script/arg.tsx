export const viScriptArg = (vi: {
  mode: "mobile" | "desktop";
  site: { db: any; api: any };
}) => ({
  isMobile: vi.mode === "mobile",
  isDesktop: vi.mode === "desktop",
  isEditor: location.pathname.startsWith("/ed/"),
});
