(() => {
var $cd4a95857635bfaa$exports = {};
let $380808cee8d382df$export$e538f94cc8cf4db8 = [];
let $380808cee8d382df$export$83d89fbfd8236492 = "";
function $380808cee8d382df$export$c208e1278d7beb2(m, v) {
    $380808cee8d382df$export$e538f94cc8cf4db8 = m;
    $380808cee8d382df$export$83d89fbfd8236492 = v;
}


const $cd4a95857635bfaa$var$manifest = [
    "/index.js",
    "/pages.297d11c9.js",
    "/login.116f51a6.js",
    "/logout.4a23bd73.js",
    "/register.6da13020.js",
    "/all.2a032bf1.js",
    "/ed.de27588b.js",
    "/editor.b81cc496.js",
    "/editor.73d38fbd.js",
    "/standalone.f3e74186.js",
    "/typescript.dbf03dd2.js",
    "/estree.7a133e28.js",
    "/versions.752026f5.js",
    "/ipc.0049bc9e.js",
    "/worker.0b25d7de.js",
    "/dist.f8eecf79.js",
    "/Side.fa071797.js",
    "/index.module.15cb72f1.js",
    "/Side.d0586ad5.js",
    "/page-mgr.6c081154.js",
    "/site-mgr.aa4495d1.js",
    "/comp-mgr.27b10bdd.js",
    "/editor.9f6769c5.css",
    "/editor.ed238427.js",
    "/live.7c683dce.js",
    "/index.css"
];
const $cd4a95857635bfaa$var$version = "d5d7c01e";
(0, $380808cee8d382df$export$c208e1278d7beb2)($cd4a95857635bfaa$var$manifest, $cd4a95857635bfaa$var$version);

var $190678cd3e3b2e48$exports = {};

const $caa875404acd0305$export$a473c43a4db1086c = {
    NORMAL: 0,
    WILDCARD: 1,
    PLACEHOLDER: 2
};
function $caa875404acd0305$export$baddd0131ee8c05b(options = {}) {
    const ctx = {
        options: options,
        rootNode: $caa875404acd0305$var$createRadixNode(),
        staticRoutesMap: {}
    };
    const normalizeTrailingSlash = (p)=>options.strictTrailingSlash ? p : p.replace(/\/$/, "") || "/";
    if (options.routes) for(const path in options.routes)$caa875404acd0305$var$insert(ctx, normalizeTrailingSlash(path), options.routes[path]);
    return {
        ctx: ctx,
        // @ts-ignore
        lookup: (path)=>$caa875404acd0305$var$lookup(ctx, normalizeTrailingSlash(path)),
        insert: (path, data)=>$caa875404acd0305$var$insert(ctx, normalizeTrailingSlash(path), data),
        remove: (path)=>$caa875404acd0305$var$remove(ctx, normalizeTrailingSlash(path))
    };
}
function $caa875404acd0305$var$lookup(ctx, path) {
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
        if (nextNode !== void 0) node = nextNode;
        else {
            node = node.placeholderChildNode;
            if (node !== null) {
                params[node.paramName] = section;
                paramsFound = true;
            } else break;
        }
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
function $caa875404acd0305$var$insert(ctx, path, data) {
    let isStaticRoute = true;
    const sections = path.split("/");
    let node = ctx.rootNode;
    let _unnamedPlaceholderCtr = 0;
    for (const section of sections){
        let childNode;
        if (childNode = node.children.get(section)) node = childNode;
        else {
            const type = $caa875404acd0305$var$getNodeType(section);
            childNode = $caa875404acd0305$var$createRadixNode({
                type: type,
                parent: node
            });
            node.children.set(section, childNode);
            if (type === $caa875404acd0305$export$a473c43a4db1086c.PLACEHOLDER) {
                childNode.paramName = section === "*" ? `_${_unnamedPlaceholderCtr++}` : section.slice(1);
                node.placeholderChildNode = childNode;
                isStaticRoute = false;
            } else if (type === $caa875404acd0305$export$a473c43a4db1086c.WILDCARD) {
                node.wildcardChildNode = childNode;
                childNode.paramName = section.slice(3) || "_";
                isStaticRoute = false;
            }
            node = childNode;
        }
    }
    node.data = data;
    if (isStaticRoute === true) ctx.staticRoutesMap[path] = node;
    return node;
}
function $caa875404acd0305$var$remove(ctx, path) {
    let success = false;
    const sections = path.split("/");
    let node = ctx.rootNode;
    for (const section of sections){
        node = node.children.get(section);
        if (!node) return success;
    }
    if (node.data) {
        const lastSection = sections[sections.length - 1];
        node.data = null;
        if (Object.keys(node.children).length === 0) {
            const parentNode = node.parent;
            parentNode.children.delete(lastSection);
            parentNode.wildcardChildNode = null;
            parentNode.placeholderChildNode = null;
        }
        success = true;
    }
    return success;
}
function $caa875404acd0305$var$createRadixNode(options = {}) {
    return {
        type: options.type || $caa875404acd0305$export$a473c43a4db1086c.NORMAL,
        parent: options.parent || null,
        children: /* @__PURE__ */ new Map(),
        data: options.data || null,
        paramName: options.paramName || null,
        wildcardChildNode: null,
        placeholderChildNode: null
    };
}
function $caa875404acd0305$var$getNodeType(str) {
    if (str.startsWith("**")) return $caa875404acd0305$export$a473c43a4db1086c.WILDCARD;
    if (str[0] === ":" || str === "*") return $caa875404acd0305$export$a473c43a4db1086c.PLACEHOLDER;
    return $caa875404acd0305$export$a473c43a4db1086c.NORMAL;
}
function $caa875404acd0305$export$f4530fb594435f7b(router) {
    const table = $caa875404acd0305$var$_routerNodeToTable("", router.ctx.rootNode);
    return $caa875404acd0305$var$_createMatcher(table);
}
function $caa875404acd0305$var$_createMatcher(table) {
    return {
        ctx: {
            table: table
        },
        matchAll: (path)=>$caa875404acd0305$var$_matchRoutes(path, table)
    };
}
function $caa875404acd0305$var$_createRouteTable() {
    return {
        static: /* @__PURE__ */ new Map(),
        wildcard: /* @__PURE__ */ new Map(),
        dynamic: /* @__PURE__ */ new Map()
    };
}
function $caa875404acd0305$var$_exportMatcherFromTable(table) {
    const obj = /* @__PURE__ */ Object.create(null);
    for(const property in table)obj[property] = property === "dynamic" ? Object.fromEntries([
        ...table[property].entries()
    ].map(([key, value])=>[
            key,
            $caa875404acd0305$var$_exportMatcherFromTable(value)
        ])) : Object.fromEntries(table[property].entries());
    return obj;
}
function $caa875404acd0305$export$884aefa7eed33b48(matcher) {
    return $caa875404acd0305$var$_exportMatcherFromTable(matcher.ctx.table);
}
function $caa875404acd0305$var$_createTableFromExport(matcherExport) {
    const table = {};
    for(const property in matcherExport)table[property] = property === "dynamic" ? new Map(Object.entries(matcherExport[property]).map(([key, value])=>[
            key,
            $caa875404acd0305$var$_createTableFromExport(value)
        ])) : new Map(Object.entries(matcherExport[property]));
    return table;
}
function $caa875404acd0305$export$9d4662868df9f718(matcherExport) {
    return $caa875404acd0305$var$_createMatcher($caa875404acd0305$var$_createTableFromExport(matcherExport));
}
function $caa875404acd0305$var$_matchRoutes(path, table) {
    const matches = [];
    for (const [key, value] of $caa875404acd0305$var$_sortRoutesMap(table.wildcard))if (path.startsWith(key)) matches.push(value);
    for (const [key, value] of $caa875404acd0305$var$_sortRoutesMap(table.dynamic))if (path.startsWith(key + "/")) {
        const subPath = "/" + path.slice(key.length).split("/").splice(2).join("/");
        matches.push(...$caa875404acd0305$var$_matchRoutes(subPath, value));
    }
    const staticMatch = table.static.get(path);
    if (staticMatch) matches.push(staticMatch);
    return matches.filter(Boolean);
}
function $caa875404acd0305$var$_sortRoutesMap(m) {
    return [
        ...m.entries()
    ].sort((a, b)=>a[0].length - b[0].length);
}
function $caa875404acd0305$var$_routerNodeToTable(initialPath, initialNode) {
    const table = $caa875404acd0305$var$_createRouteTable();
    function _addNode(path, node) {
        if (path) {
            if (node.type === $caa875404acd0305$export$a473c43a4db1086c.NORMAL && !(path.includes("*") || path.includes(":"))) table.static.set(path, node.data);
            else if (node.type === $caa875404acd0305$export$a473c43a4db1086c.WILDCARD) table.wildcard.set(path.replace("/**", ""), node.data);
            else if (node.type === $caa875404acd0305$export$a473c43a4db1086c.PLACEHOLDER) {
                const subTable = $caa875404acd0305$var$_routerNodeToTable("", node);
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


const $190678cd3e3b2e48$var$g = {
    router: null,
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
async function $190678cd3e3b2e48$var$install() {
    const cache = await caches.open((0, $380808cee8d382df$export$83d89fbfd8236492));
    await cache.addAll((0, $380808cee8d382df$export$e538f94cc8cf4db8));
    $190678cd3e3b2e48$var$g.broadcast({
        type: "installed"
    });
}
addEventListener("install", (e)=>e.waitUntil($190678cd3e3b2e48$var$install()));
async function $190678cd3e3b2e48$var$activate() {
    let shouldRefresh = false;
    const keys = await caches.keys();
    await Promise.all(keys.map(async (key)=>{
        if (key !== (0, $380808cee8d382df$export$83d89fbfd8236492)) {
            await caches.delete(key);
            shouldRefresh = true;
        }
    }));
    $190678cd3e3b2e48$var$g.broadcast({
        type: "activated",
        shouldRefresh: shouldRefresh
    });
}
addEventListener("activate", (e)=>e.waitUntil($190678cd3e3b2e48$var$activate()));
addEventListener("fetch", async (evt)=>{
    const e = evt;
    const url = new URL(e.request.url);
    if ($190678cd3e3b2e48$var$g.router) {
        const found = $190678cd3e3b2e48$var$g.router.lookup(url.pathname);
        if (found) return;
    }
    e.respondWith((async ()=>{
        const r = await caches.match(e.request);
        if (r) return r;
        return fetch(e.request);
    })());
});
$190678cd3e3b2e48$var$g.broadcast({
    type: "ready"
});
addEventListener("message", async (e)=>{
    const type = e.data.type;
    const cache = await caches.open((0, $380808cee8d382df$export$83d89fbfd8236492));
    switch(type){
        case "add-cache":
            if (!await cache.match(e.data.url)) await cache.add(e.data.url);
            break;
        case "define-route":
            console.log("defining route", e.data.routes);
            $190678cd3e3b2e48$var$g.router = (0, $caa875404acd0305$export$baddd0131ee8c05b)({
                strictTrailingSlash: false
            });
            for (const route of e.data.routes)$190678cd3e3b2e48$var$g.router.insert(route.url, route);
            await $190678cd3e3b2e48$var$activate();
            break;
    }
});

})();
//# sourceMappingURL=sworker.js.map
