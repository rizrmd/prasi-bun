// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"jj91m":[function(require,module,exports) {
var _serviceWorker = require("@parcel/service-worker");
const manifest = [
    "/index.html",
    "/index.308ecf63.css",
    "/index.50269ee5.css",
    "/jetbrains-mono-cyrillic-ext-400-normal.01f99d06.woff2",
    "/jetbrains-mono-cyrillic-ext-400-normal.b19dae56.woff",
    "/jetbrains-mono-cyrillic-400-normal.c27eb9dd.woff2",
    "/jetbrains-mono-cyrillic-400-normal.12e183dd.woff",
    "/jetbrains-mono-greek-400-normal.fab63212.woff2",
    "/jetbrains-mono-greek-400-normal.69c2db8b.woff",
    "/jetbrains-mono-vietnamese-400-normal.72fde104.woff2",
    "/jetbrains-mono-vietnamese-400-normal.cde33dd0.woff",
    "/jetbrains-mono-latin-ext-400-normal.510ef9e7.woff2",
    "/jetbrains-mono-latin-ext-400-normal.8522e56b.woff",
    "/jetbrains-mono-latin-400-normal.785c446b.woff2",
    "/jetbrains-mono-latin-400-normal.f1e9154a.woff",
    "/index.0ef5fe45.css",
    "/source-sans-3-cyrillic-ext-400-normal.092a473c.woff2",
    "/source-sans-3-cyrillic-ext-400-normal.ff53f249.woff",
    "/source-sans-3-cyrillic-400-normal.f971b9ad.woff2",
    "/source-sans-3-cyrillic-400-normal.d31f6c55.woff",
    "/source-sans-3-greek-ext-400-normal.2f1e4560.woff2",
    "/source-sans-3-greek-ext-400-normal.e253957a.woff",
    "/source-sans-3-greek-400-normal.30e09ac6.woff2",
    "/source-sans-3-greek-400-normal.a9365509.woff",
    "/source-sans-3-vietnamese-400-normal.8175b15f.woff2",
    "/source-sans-3-vietnamese-400-normal.a0f67db9.woff",
    "/source-sans-3-latin-ext-400-normal.8180fdee.woff2",
    "/source-sans-3-latin-ext-400-normal.0483ba2f.woff",
    "/source-sans-3-latin-400-normal.43f5aafe.woff2",
    "/source-sans-3-latin-400-normal.6f62a854.woff",
    "/index.f92db23a.js",
    "/login.dff13ed3.js",
    "/logout.920e94f5.js",
    "/register.5db9c712.js",
    "/all.8b54f3b4.js",
    "/ed.8954f98a.js",
    "/wasm_gzip.922c2de1.wasm",
    "/standalone.0aea92ae.js",
    "/estree.4a6560c1.js",
    "/typescript.9d343126.js",
    "/dist.1f9430ff.js",
    "/esm.87f94ee9.js",
    "/index.module.7282dc17.js",
    "/ed.400f6bfd.css"
];
const version = "fd0bc66b";
(0, _serviceWorker._register)(manifest, version);

},{"@parcel/service-worker":"et5Hi"}],"et5Hi":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "manifest", ()=>manifest);
parcelHelpers.export(exports, "version", ()=>version);
// Called by the runtime.
parcelHelpers.export(exports, "_register", ()=>_register);
let manifest = [];
let version = "";
function _register(m, v) {
    manifest = m;
    version = v;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jpDjm"}],"jpDjm":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"aLfyY":[function(require,module,exports) {
var _serviceWorker = require("@parcel/service-worker");
var _radix3 = require("radix3");
var _timestamp = require("../timestamp");
var _publicFiles = require("../public_files");
const g = {
    router: null,
    offline: false,
    broadcast (msg) {
        // @ts-ignore
        const c = self.clients;
        c.matchAll({
            includeUncontrolled: true
        }).then((clients)=>{
            clients.forEach((client)=>{
                client.postMessage(msg);
            });
        });
    }
};
async function install() {
    const cache = await caches.open((0, _timestamp.version));
    const entries = [
        ...(0, _serviceWorker.manifest),
        ...(0, _publicFiles.files)
    ];
    if (entries.length > 0) {
        await cache.addAll(entries);
        g.broadcast({
            type: "installed"
        });
    }
}
addEventListener("install", (e)=>e.waitUntil(install()));
async function activate() {
    let shouldRefresh = false;
    if (!g.offline) {
        const keys = await caches.keys();
        await Promise.all(keys.map(async (key)=>{
            if (key !== (0, _timestamp.version)) {
                await caches.delete(key);
                shouldRefresh = true;
            }
        }));
        g.broadcast({
            type: "activated",
            shouldRefresh,
            version: (0, _timestamp.version)
        });
    }
}
addEventListener("activate", (e)=>e.waitUntil(activate()));
addEventListener("fetch", async (evt)=>{
    const e = evt;
    const url = new URL(e.request.url);
    if (url.pathname.startsWith("_proxy")) return;
    if (g.router) {
        const found = g.router.lookup(url.pathname);
        if (found) return;
    }
    e.respondWith((async ()=>{
        const r = await caches.match(e.request);
        if (r) return r;
        try {
            g.offline = false;
            return await fetch(e.request);
        } catch (e) {
            g.offline = true;
            g.broadcast({
                type: "offline"
            });
            return new Response();
        }
    })());
});
addEventListener("message", async (e)=>{
    const type = e.data.type;
    const cache = await caches.open((0, _timestamp.version));
    switch(type){
        case "add-cache":
            {
                const cached = await cache.match(e.data.url);
                if (!cached) await cache.add(e.data.url);
            }
            break;
        case "define-route":
            g.router = (0, _radix3.createRouter)({
                strictTrailingSlash: false
            });
            for (const route of e.data.routes)g.router.insert(route.url, route);
            await activate();
            break;
        case "force-update":
            {
                const keys = await caches.keys();
                await Promise.all(keys.map(async (key)=>{
                    if (key !== (0, _timestamp.version)) await caches.delete(key);
                }));
                await install();
            }
            break;
    }
});

},{"@parcel/service-worker":"et5Hi","radix3":"80B3m","../timestamp":"1koxN","../public_files":"lXNsG"}],"80B3m":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "NODE_TYPES", ()=>NODE_TYPES);
parcelHelpers.export(exports, "createMatcherFromExport", ()=>createMatcherFromExport);
parcelHelpers.export(exports, "createRouter", ()=>createRouter);
parcelHelpers.export(exports, "exportMatcher", ()=>exportMatcher);
parcelHelpers.export(exports, "toRouteMatcher", ()=>toRouteMatcher);
const NODE_TYPES = {
    NORMAL: 0,
    WILDCARD: 1,
    PLACEHOLDER: 2
};
function createRouter(options = {}) {
    const ctx = {
        options,
        rootNode: createRadixNode(),
        staticRoutesMap: {}
    };
    const normalizeTrailingSlash = (p)=>options.strictTrailingSlash ? p : p.replace(/\/$/, "") || "/";
    if (options.routes) for(const path in options.routes)insert(ctx, normalizeTrailingSlash(path), options.routes[path]);
    return {
        ctx,
        lookup: (path)=>lookup(ctx, normalizeTrailingSlash(path)),
        insert: (path, data)=>insert(ctx, normalizeTrailingSlash(path), data),
        remove: (path)=>remove(ctx, normalizeTrailingSlash(path))
    };
}
function lookup(ctx, path) {
    const staticPathNode = ctx.staticRoutesMap[path];
    if (staticPathNode) return staticPathNode.data;
    const sections = path.split("/");
    const params = {};
    let paramsFound = false;
    let wildcardNode = null;
    let node = ctx.rootNode;
    let wildCardParam = null;
    for(let i = 0; i < sections.length; i++){
        const section = sections[i];
        if (node.wildcardChildNode !== null) {
            wildcardNode = node.wildcardChildNode;
            wildCardParam = sections.slice(i).join("/");
        }
        const nextNode = node.children.get(section);
        if (nextNode === void 0) {
            if (node && node.placeholderChildren.length > 1) {
                const remaining = sections.length - i;
                node = node.placeholderChildren.find((c)=>c.maxDepth === remaining) || null;
            } else node = node.placeholderChildren[0] || null;
            if (!node) break;
            if (node.paramName) params[node.paramName] = section;
            paramsFound = true;
        } else node = nextNode;
    }
    if ((node === null || node.data === null) && wildcardNode !== null) {
        node = wildcardNode;
        params[node.paramName || "_"] = wildCardParam;
        paramsFound = true;
    }
    if (!node) return null;
    if (paramsFound) return {
        ...node.data,
        params: paramsFound ? params : void 0
    };
    return node.data;
}
function insert(ctx, path, data) {
    let isStaticRoute = true;
    const sections = path.split("/");
    let node = ctx.rootNode;
    let _unnamedPlaceholderCtr = 0;
    const matchedNodes = [
        node
    ];
    for (const section of sections){
        let childNode;
        if (childNode = node.children.get(section)) node = childNode;
        else {
            const type = getNodeType(section);
            childNode = createRadixNode({
                type,
                parent: node
            });
            node.children.set(section, childNode);
            if (type === NODE_TYPES.PLACEHOLDER) {
                childNode.paramName = section === "*" ? `_${_unnamedPlaceholderCtr++}` : section.slice(1);
                node.placeholderChildren.push(childNode);
                isStaticRoute = false;
            } else if (type === NODE_TYPES.WILDCARD) {
                node.wildcardChildNode = childNode;
                childNode.paramName = section.slice(3) || "_";
                isStaticRoute = false;
            }
            matchedNodes.push(childNode);
            node = childNode;
        }
    }
    for (const [depth, node2] of matchedNodes.entries())node2.maxDepth = Math.max(matchedNodes.length - depth, node2.maxDepth || 0);
    node.data = data;
    if (isStaticRoute === true) ctx.staticRoutesMap[path] = node;
    return node;
}
function remove(ctx, path) {
    let success = false;
    const sections = path.split("/");
    let node = ctx.rootNode;
    for (const section of sections){
        node = node.children.get(section);
        if (!node) return success;
    }
    if (node.data) {
        const lastSection = sections.at(-1) || "";
        node.data = null;
        if (Object.keys(node.children).length === 0 && node.parent) {
            node.parent.children.delete(lastSection);
            node.parent.wildcardChildNode = null;
            node.parent.placeholderChildren = [];
        }
        success = true;
    }
    return success;
}
function createRadixNode(options = {}) {
    return {
        type: options.type || NODE_TYPES.NORMAL,
        maxDepth: 0,
        parent: options.parent || null,
        children: /* @__PURE__ */ new Map(),
        data: options.data || null,
        paramName: options.paramName || null,
        wildcardChildNode: null,
        placeholderChildren: []
    };
}
function getNodeType(str) {
    if (str.startsWith("**")) return NODE_TYPES.WILDCARD;
    if (str[0] === ":" || str === "*") return NODE_TYPES.PLACEHOLDER;
    return NODE_TYPES.NORMAL;
}
function toRouteMatcher(router) {
    const table = _routerNodeToTable("", router.ctx.rootNode);
    return _createMatcher(table, router.ctx.options.strictTrailingSlash);
}
function _createMatcher(table, strictTrailingSlash) {
    return {
        ctx: {
            table
        },
        matchAll: (path)=>_matchRoutes(path, table, strictTrailingSlash)
    };
}
function _createRouteTable() {
    return {
        static: /* @__PURE__ */ new Map(),
        wildcard: /* @__PURE__ */ new Map(),
        dynamic: /* @__PURE__ */ new Map()
    };
}
function _exportMatcherFromTable(table) {
    const obj = /* @__PURE__ */ Object.create(null);
    for(const property in table)obj[property] = property === "dynamic" ? Object.fromEntries([
        ...table[property].entries()
    ].map(([key, value])=>[
            key,
            _exportMatcherFromTable(value)
        ])) : Object.fromEntries(table[property].entries());
    return obj;
}
function exportMatcher(matcher) {
    return _exportMatcherFromTable(matcher.ctx.table);
}
function _createTableFromExport(matcherExport) {
    const table = {};
    for(const property in matcherExport)table[property] = property === "dynamic" ? new Map(Object.entries(matcherExport[property]).map(([key, value])=>[
            key,
            _createTableFromExport(value)
        ])) : new Map(Object.entries(matcherExport[property]));
    return table;
}
function createMatcherFromExport(matcherExport) {
    return _createMatcher(_createTableFromExport(matcherExport));
}
function _matchRoutes(path, table, strictTrailingSlash) {
    if (strictTrailingSlash !== true && path.endsWith("/")) path = path.slice(0, -1) || "/";
    const matches = [];
    for (const [key, value] of _sortRoutesMap(table.wildcard))if (path === key || path.startsWith(key + "/")) matches.push(value);
    for (const [key, value] of _sortRoutesMap(table.dynamic))if (path.startsWith(key + "/")) {
        const subPath = "/" + path.slice(key.length).split("/").splice(2).join("/");
        matches.push(..._matchRoutes(subPath, value));
    }
    const staticMatch = table.static.get(path);
    if (staticMatch) matches.push(staticMatch);
    return matches.filter(Boolean);
}
function _sortRoutesMap(m) {
    return [
        ...m.entries()
    ].sort((a, b)=>a[0].length - b[0].length);
}
function _routerNodeToTable(initialPath, initialNode) {
    const table = _createRouteTable();
    function _addNode(path, node) {
        if (path) {
            if (node.type === NODE_TYPES.NORMAL && !(path.includes("*") || path.includes(":"))) {
                if (node.data) table.static.set(path, node.data);
            } else if (node.type === NODE_TYPES.WILDCARD) table.wildcard.set(path.replace("/**", ""), node.data);
            else if (node.type === NODE_TYPES.PLACEHOLDER) {
                const subTable = _routerNodeToTable("", node);
                if (node.data) subTable.static.set("/", node.data);
                table.dynamic.set(path.replace(/\/\*|\/:\w+/, ""), subTable);
                return;
            }
        }
        for (const [childPath, child] of node.children.entries())_addNode(`${path}/${childPath}`.replace("//", "/"), child);
    }
    _addNode(initialPath, initialNode);
    return table;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jpDjm"}],"1koxN":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "version", ()=>version);
const version = "u8d90gt";

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jpDjm"}],"lXNsG":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "files", ()=>files);
const files = [
    "favicon.ico",
    "img/empty.png",
    "monaco/min/vs/basic-languages/postiats/postiats.js",
    "monaco/min/vs/basic-languages/scheme/scheme.js",
    "monaco/min/vs/basic-languages/sb/sb.js",
    "monaco/min/vs/basic-languages/mdx/mdx.js",
    "monaco/min/vs/basic-languages/pascal/pascal.js",
    "monaco/min/vs/basic-languages/cameligo/cameligo.js",
    "monaco/min/vs/basic-languages/razor/razor.js",
    "monaco/min/vs/basic-languages/typespec/typespec.js",
    "monaco/min/vs/basic-languages/powerquery/powerquery.js",
    "monaco/min/vs/basic-languages/apex/apex.js",
    "monaco/min/vs/basic-languages/go/go.js",
    "monaco/min/vs/basic-languages/systemverilog/systemverilog.js",
    "monaco/min/vs/basic-languages/sparql/sparql.js",
    "monaco/min/vs/basic-languages/azcli/azcli.js",
    "monaco/min/vs/basic-languages/python/python.js",
    "monaco/min/vs/basic-languages/css/css.js",
    "monaco/min/vs/basic-languages/clojure/clojure.js",
    "monaco/min/vs/basic-languages/less/less.js",
    "monaco/min/vs/basic-languages/elixir/elixir.js",
    "monaco/min/vs/basic-languages/redis/redis.js",
    "monaco/min/vs/basic-languages/lexon/lexon.js",
    "monaco/min/vs/basic-languages/dockerfile/dockerfile.js",
    "monaco/min/vs/basic-languages/dart/dart.js",
    "monaco/min/vs/basic-languages/shell/shell.js",
    "monaco/min/vs/basic-languages/markdown/markdown.js",
    "monaco/min/vs/basic-languages/scss/scss.js",
    "monaco/min/vs/basic-languages/sophia/sophia.js",
    "monaco/min/vs/basic-languages/perl/perl.js",
    "monaco/min/vs/basic-languages/typescript/typescript.js",
    "monaco/min/vs/basic-languages/rust/rust.js",
    "monaco/min/vs/basic-languages/pug/pug.js",
    "monaco/min/vs/basic-languages/fsharp/fsharp.js",
    "monaco/min/vs/basic-languages/r/r.js",
    "monaco/min/vs/basic-languages/freemarker2/freemarker2.js",
    "monaco/min/vs/basic-languages/liquid/liquid.js",
    "monaco/min/vs/basic-languages/java/java.js",
    "monaco/min/vs/basic-languages/html/html.js",
    "monaco/min/vs/basic-languages/abap/abap.js",
    "monaco/min/vs/basic-languages/kotlin/kotlin.js",
    "monaco/min/vs/basic-languages/cypher/cypher.js",
    "monaco/min/vs/basic-languages/php/php.js",
    "monaco/min/vs/basic-languages/lua/lua.js",
    "monaco/min/vs/basic-languages/xml/xml.js",
    "monaco/min/vs/basic-languages/pascaligo/pascaligo.js",
    "monaco/min/vs/basic-languages/solidity/solidity.js",
    "monaco/min/vs/basic-languages/st/st.js",
    "monaco/min/vs/basic-languages/redshift/redshift.js",
    "monaco/min/vs/basic-languages/vb/vb.js",
    "monaco/min/vs/basic-languages/powershell/powershell.js",
    "monaco/min/vs/basic-languages/mips/mips.js",
    "monaco/min/vs/basic-languages/pla/pla.js",
    "monaco/min/vs/basic-languages/tcl/tcl.js",
    "monaco/min/vs/basic-languages/ini/ini.js",
    "monaco/min/vs/basic-languages/handlebars/handlebars.js",
    "monaco/min/vs/basic-languages/scala/scala.js",
    "monaco/min/vs/basic-languages/hcl/hcl.js",
    "monaco/min/vs/basic-languages/cpp/cpp.js",
    "monaco/min/vs/basic-languages/swift/swift.js",
    "monaco/min/vs/basic-languages/graphql/graphql.js",
    "monaco/min/vs/basic-languages/qsharp/qsharp.js",
    "monaco/min/vs/basic-languages/mysql/mysql.js",
    "monaco/min/vs/basic-languages/coffee/coffee.js",
    "monaco/min/vs/basic-languages/csp/csp.js",
    "monaco/min/vs/basic-languages/pgsql/pgsql.js",
    "monaco/min/vs/basic-languages/m3/m3.js",
    "monaco/min/vs/basic-languages/yaml/yaml.js",
    "monaco/min/vs/basic-languages/csharp/csharp.js",
    "monaco/min/vs/basic-languages/julia/julia.js",
    "monaco/min/vs/basic-languages/bat/bat.js",
    "monaco/min/vs/basic-languages/javascript/javascript.js",
    "monaco/min/vs/basic-languages/bicep/bicep.js",
    "monaco/min/vs/basic-languages/twig/twig.js",
    "monaco/min/vs/basic-languages/msdax/msdax.js",
    "monaco/min/vs/basic-languages/wgsl/wgsl.js",
    "monaco/min/vs/basic-languages/restructuredtext/restructuredtext.js",
    "monaco/min/vs/basic-languages/objective-c/objective-c.js",
    "monaco/min/vs/basic-languages/protobuf/protobuf.js",
    "monaco/min/vs/basic-languages/ecl/ecl.js",
    "monaco/min/vs/basic-languages/ruby/ruby.js",
    "monaco/min/vs/basic-languages/flow9/flow9.js",
    "monaco/min/vs/basic-languages/sql/sql.js",
    "monaco/min/vs/language/css/cssMode.js",
    "monaco/min/vs/language/css/cssWorker.js",
    "monaco/min/vs/language/typescript/tsWorker.js",
    "monaco/min/vs/language/typescript/tsMode.js",
    "monaco/min/vs/language/html/htmlMode.js",
    "monaco/min/vs/language/html/htmlWorker.js",
    "monaco/min/vs/language/json/jsonWorker.js",
    "monaco/min/vs/language/json/jsonMode.js",
    "monaco/min/vs/base/browser/ui/codicons/codicon/codicon.ttf",
    "monaco/min/vs/base/common/worker/simpleWorker.nls.it.js",
    "monaco/min/vs/base/common/worker/simpleWorker.nls.es.js",
    "monaco/min/vs/base/common/worker/simpleWorker.nls.fr.js",
    "monaco/min/vs/base/common/worker/simpleWorker.nls.de.js",
    "monaco/min/vs/base/common/worker/simpleWorker.nls.js",
    "monaco/min/vs/base/common/worker/simpleWorker.nls.ja.js",
    "monaco/min/vs/base/common/worker/simpleWorker.nls.ru.js",
    "monaco/min/vs/base/common/worker/simpleWorker.nls.zh-cn.js",
    "monaco/min/vs/base/common/worker/simpleWorker.nls.zh-tw.js",
    "monaco/min/vs/base/common/worker/simpleWorker.nls.ko.js",
    "monaco/min/vs/base/worker/workerMain.js",
    "monaco/min/vs/editor/editor.main.nls.ru.js",
    "monaco/min/vs/editor/editor.main.css",
    "monaco/min/vs/editor/editor.main.nls.ko.js",
    "monaco/min/vs/editor/editor.main.nls.zh-cn.js",
    "monaco/min/vs/editor/editor.main.js",
    "monaco/min/vs/editor/editor.main.nls.ja.js",
    "monaco/min/vs/editor/editor.main.nls.zh-tw.js",
    "monaco/min/vs/editor/editor.main.nls.de.js",
    "monaco/min/vs/editor/editor.main.nls.it.js",
    "monaco/min/vs/editor/editor.main.nls.es.js",
    "monaco/min/vs/editor/editor.main.nls.js",
    "monaco/min/vs/editor/editor.main.nls.fr.js",
    "monaco/min/vs/loader.js"
];

},{"@parcel/transformer-js/src/esmodule-helpers.js":"jpDjm"}]},["jj91m","aLfyY"], "aLfyY", "parcelRequire2d1f")

//# sourceMappingURL=sworker.js.map
