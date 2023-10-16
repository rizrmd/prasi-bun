(() => {

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

      var $parcel$global = globalThis;
    var parcelRequire = $parcel$global["parcelRequire2d1f"];
var parcelRegister = parcelRequire.register;
parcelRegister("3xnmI", function(module, exports) {

$parcel$export(module.exports, "setReloadWorkerCallback", () => $0f88d07a17faf60e$export$e0570af606038ab);
$parcel$export(module.exports, "tryToSetCurrentVersion", () => $0f88d07a17faf60e$export$8234b8080966e9f5);
// This file manages the UI for the version picker in the top right corner
const $0f88d07a17faf60e$var$versionsPromise = $0f88d07a17faf60e$var$tryToFetchVersions();
let $0f88d07a17faf60e$var$reloadWorker;
function $0f88d07a17faf60e$export$e0570af606038ab(callback) {
    $0f88d07a17faf60e$var$reloadWorker = callback;
}
async function $0f88d07a17faf60e$export$8234b8080966e9f5(version) {
    const versions = await $0f88d07a17faf60e$var$versionsPromise;
    const index = version === "latest" && versions.length ? 0 : versions.indexOf(version);
    if (index >= 0) await $0f88d07a17faf60e$var$reloadWorker(versions[index]);
}
async function $0f88d07a17faf60e$var$tryToFetchVersions() {
    const controller = new AbortController();
    const timeout = setTimeout(()=>controller.abort("Timeout"), 5000);
    // This is probably faster than the registry because it returns less data
    try {
        const url = "https://data.jsdelivr.com/v1/package/npm/esbuild-wasm";
        const response = await fetch(url, {
            signal: controller.signal
        });
        if (response && response.ok) {
            clearTimeout(timeout);
            const versions = (await response.json()).versions;
            if (versions && versions.length) return versions;
        }
    } catch (err) {
        console.error(err);
    }
    // Fall back to the npm registry if that service is down
    try {
        const url = "https://registry.npmjs.org/esbuild-wasm";
        let versions = (await fetch(url).then((r)=>r.json())).versions;
        if (versions) {
            versions = Object.keys(versions).reverse();
            if (versions.length) return versions;
        }
    } catch (err) {
        console.error(err);
    }
    throw new Error();
}

});

})();
//# sourceMappingURL=versions.752026f5.js.map
