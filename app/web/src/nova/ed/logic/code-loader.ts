export const loadCode = async (id_site: string, ts?: number) => {
  const url = `/prod/${id_site}/_prasi/code/index.js?ts=${ts}`;
  const fn = new Function(
    "callback",
    `
import("${url}")
  .catch((e) => console.error("Failed to load site code\\n\\n", e))
  .then(callback)`
  );
  try {
    return await new Promise<any>((resolve) => {
      try {
        fn((exports: any) => {
          resolve(exports);
        });
      } catch (e) {
        console.log("Failed to load site code", e);
      }
    });
  } catch (e) {
    console.log("Failed to load site code", e);
  }
  return {};
};
