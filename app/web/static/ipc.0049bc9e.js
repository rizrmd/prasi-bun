(() => {

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

      var $parcel$global = globalThis;
    var parcelRequire = $parcel$global["parcelRequire2d1f"];
var parcelRegister = parcelRequire.register;
parcelRegister("2UmCA", function(module, exports) {

$parcel$export(module.exports, "sendIPC", () => $63e3495cc7f475e0$export$a08b4aa8b15dc7cf);
// This file is responsible for spawning and terminating child worker threads.
// The worker thread is recreated every time the current API version changes.

var $laZKa = parcelRequire("laZKa");

var $3xnmI = parcelRequire("3xnmI");

const $63e3495cc7f475e0$var$workerText = fetch(new URL((parcelRequire("7fMjo")))).then((r)=>r.text());
let $63e3495cc7f475e0$var$activeTask = null;
let $63e3495cc7f475e0$var$pendingTask = null;
let $63e3495cc7f475e0$var$workerPromise = new Promise((resolve, reject)=>{
    (0, $3xnmI.setReloadWorkerCallback)((version)=>{
        const reloadPromise = $63e3495cc7f475e0$var$reloadWorker(version);
        reloadPromise.then(resolve, reject);
        (0, $3xnmI.setReloadWorkerCallback)((version)=>{
            $63e3495cc7f475e0$var$workerPromise.then((worker)=>worker.terminate());
            $63e3495cc7f475e0$var$workerPromise = $63e3495cc7f475e0$var$reloadWorker(version);
            return $63e3495cc7f475e0$var$workerPromise;
        });
        return reloadPromise;
    });
});
async function $63e3495cc7f475e0$var$packageFetch(subpath) {
    const controller = new AbortController();
    const timeout = setTimeout(()=>controller.abort("Timeout"), 5000);
    // Try to fetch from one CDN, but fall back to another CDN if that fails
    try {
        const response = await fetch(`https://cdn.jsdelivr.net/npm/${subpath}`, {
            signal: controller.signal
        });
        if (response.ok) {
            clearTimeout(timeout);
            return response;
        }
    } catch (err) {
        console.error(err);
    }
    return fetch(`https://unpkg.com/${subpath}`);
}
async function $63e3495cc7f475e0$var$reloadWorker(version) {
    let loadingFailure;
    (0, $laZKa.showLoadingMessage)(version);
    try {
        if ($63e3495cc7f475e0$var$activeTask) $63e3495cc7f475e0$var$activeTask.abort_();
        if ($63e3495cc7f475e0$var$pendingTask) $63e3495cc7f475e0$var$pendingTask.abort_();
        $63e3495cc7f475e0$var$activeTask = null;
        $63e3495cc7f475e0$var$pendingTask = null;
        // "browser.min.js" was added in version 0.8.33
        const [major, minor, patch] = version.split(".").map((x)=>+x);
        const min = major === 0 && (minor < 8 || minor === 8 && patch < 33) ? "" : ".min";
        const polywasm = /^\?polywasm=([01])$/.exec(location.search)?.[1];
        const [workerJS, esbuildJS, esbuildWASM] = await Promise.all([
            $63e3495cc7f475e0$var$workerText,
            $63e3495cc7f475e0$var$packageFetch(`esbuild-wasm@${version}/lib/browser${min}.js`).then((r)=>r.text()),
            $63e3495cc7f475e0$var$packageFetch(`esbuild-wasm@${version}/esbuild.wasm`).then((r)=>r.arrayBuffer())
        ]);
        const parts = [
            esbuildJS,
            `\nvar polywasm=${polywasm};`,
            workerJS
        ];
        const url = URL.createObjectURL(new Blob(parts, {
            type: "application/javascript"
        }));
        return await new Promise((resolve, reject)=>{
            const worker = new Worker(url);
            worker.onmessage = (e)=>{
                if (e.data.status_ === "slow") {
                    const slowEl = document.getElementById("slowWarning");
                    slowEl.innerHTML = "<span>\u26A0\uFE0F Processing is slow because </span><span>WebAssembly is disabled \u26A0\uFE0F</span>";
                    slowEl.style.display = "flex";
                    return;
                }
                worker.onmessage = null;
                if (e.data.status_ === "success") resolve(worker);
                else {
                    reject(new Error("Failed to create worker"));
                    loadingFailure = e.data.error_;
                }
                URL.revokeObjectURL(url);
            };
            worker.postMessage([
                version,
                esbuildWASM
            ], [
                esbuildWASM
            ]);
        });
    } catch (err) {
        (0, $laZKa.showLoadingFailure)(loadingFailure || err + "");
        throw err;
    }
}
function $63e3495cc7f475e0$export$a08b4aa8b15dc7cf(message) {
    function activateTask(worker, task) {
        if ($63e3495cc7f475e0$var$activeTask) {
            if ($63e3495cc7f475e0$var$pendingTask) $63e3495cc7f475e0$var$pendingTask.abort_();
            $63e3495cc7f475e0$var$pendingTask = task;
        } else {
            $63e3495cc7f475e0$var$activeTask = task;
            worker.onmessage = (e)=>{
                worker.onmessage = null;
                task.resolve_(e.data);
                $63e3495cc7f475e0$var$activeTask = null;
                if ($63e3495cc7f475e0$var$pendingTask) {
                    activateTask(worker, $63e3495cc7f475e0$var$pendingTask);
                    $63e3495cc7f475e0$var$pendingTask = null;
                }
            };
            worker.postMessage(task.message_);
        }
    }
    return new Promise((resolve, reject)=>{
        $63e3495cc7f475e0$var$workerPromise.then((worker)=>activateTask(worker, {
                message_: message,
                resolve_: resolve,
                abort_: ()=>reject(new Error("Task aborted"))
            }), reject);
    });
}

});
parcelRegister("laZKa", function(module, exports) {

$parcel$export(module.exports, "showLoadingMessage", () => $cf18fc761ff5c76f$export$f6240deaca91b2a3);
$parcel$export(module.exports, "showLoadingFailure", () => $cf18fc761ff5c76f$export$a2139092079a8e45);
// This file implements the UI for the output panel (the right half of the UI)
function $cf18fc761ff5c76f$export$98ba02ed50a1c31a(err) {
    let text = `\x1b[31m\u{2718} \x1b[41;31m[\x1b[41;97mERROR\x1b[41;31m]\x1b[0m \x1b[1m${err && err.message || err}\x1B[0m`;
    const location = err && err.location_;
    const notes = err && err.notes_;
    if (location) text += $cf18fc761ff5c76f$var$prettyPrintLocationAsStderr(location);
    if (notes) for (const note of notes){
        text += `\n  ${note.text_}`;
        if (note.location_) text += $cf18fc761ff5c76f$var$prettyPrintLocationAsStderr(note.location_);
    }
    return text;
}
function $cf18fc761ff5c76f$var$prettyPrintLocationAsStderr({ file_: file_, line_: line_, column_: column_, length_: length_, lineText_: lineText_, suggestion_: suggestion_ }) {
    let last = length_ < 2 ? "^" : "~".repeat(length_);
    let result = `\n\n    ${file_}:${line_}:${column_}:\n`;
    result += `\x1B[37m${line_.toString().padStart(7)} \u{2502} ${lineText_.slice(0, column_)}` + `\x1B[32m${lineText_.slice(column_, column_ + length_)}` + `\x1B[37m${lineText_.slice(column_ + length_)}\n`;
    if (suggestion_) {
        result += `        \u{2502} ${" ".repeat(column_)}\x1B[32m${last}\x1B[37m\n`;
        last = suggestion_;
    }
    result += `        \u{2575} ${" ".repeat(column_)}\x1B[32m${last}\x1B[0m\n`;
    return result;
}
function $cf18fc761ff5c76f$export$1995fff76b26818c({ code_: code_, map_: map_, mangleCache_: mangleCache_, legalComments_: legalComments_, stderr_: stderr_ }) {}
function $cf18fc761ff5c76f$export$c34e08d30c3b6cd2({ outputFiles_: outputFiles_, metafile_: metafile_, mangleCache_: mangleCache_, stderr_: stderr_ }, entryPointCount) {}
function $cf18fc761ff5c76f$export$f6240deaca91b2a3(version) {}
function $cf18fc761ff5c76f$export$a2139092079a8e45(error) {}
function $cf18fc761ff5c76f$export$42ba9ebce89f4277(text) {
    return "<span>" + text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\033\[([^m]*)m/g, (_, escape)=>{
        switch(escape){
            case "1":
                return '</span><span class="color-bold">';
            case "31":
                return '</span><span class="color-red">';
            case "32":
                return '</span><span class="color-green">';
            case "33":
                return '</span><span class="color-yellow">';
            case "35":
                return '</span><span class="color-magenta">'; // This is generated by warnings in version 0.14.0 and earlier
            case "37":
                return '</span><span class="color-dim">';
            case "41;31":
                return '</span><span class="bg-red color-red">';
            case "41;97":
                return '</span><span class="bg-red color-white">';
            case "43;33":
                return '</span><span class="bg-yellow color-yellow">';
            case "43;30":
                return '</span><span class="bg-yellow color-black">';
            case "0":
                return "</span><span>";
        }
        throw new Error(`Unknown escape sequence: ${escape}`);
    }) + "</span>";
}

});

parcelRegister("7fMjo", function(module, exports) {

module.exports = (parcelRequire("eBiiF")).getBundleURL("cb3VD") + "worker.0b25d7de.js";

});


})();
//# sourceMappingURL=ipc.0049bc9e.js.map
