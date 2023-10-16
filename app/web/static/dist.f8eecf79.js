(() => {

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

      var $parcel$global = globalThis;
    var parcelRequire = $parcel$global["parcelRequire2d1f"];
var parcelRegister = parcelRequire.register;
parcelRegister("iE6Ol", function(module, exports) {

$parcel$export(module.exports, "Editor", () => $eaec3a37b34baecc$export$7cda8d932e2f33c0);
$parcel$export(module.exports, "loader", () => (parcelRequire("id3Cn")).default);
parcelRequire("kNIee");
var $id3Cn = parcelRequire("id3Cn");

var $63SH6 = parcelRequire("63SH6");
var $eaec3a37b34baecc$var$le = {
    wrapper: {
        display: "flex",
        position: "relative",
        textAlign: "initial"
    },
    fullWidth: {
        width: "100%"
    },
    hide: {
        display: "none"
    }
}, $eaec3a37b34baecc$var$v = $eaec3a37b34baecc$var$le;
var $eaec3a37b34baecc$var$ae = {
    container: {
        display: "flex",
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    }
}, $eaec3a37b34baecc$var$Y = $eaec3a37b34baecc$var$ae;
function $eaec3a37b34baecc$var$Me({ children: e }) {
    return (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement("div", {
        style: $eaec3a37b34baecc$var$Y.container
    }, e);
}
var $eaec3a37b34baecc$var$Z = $eaec3a37b34baecc$var$Me;
var $eaec3a37b34baecc$var$$ = $eaec3a37b34baecc$var$Z;
function $eaec3a37b34baecc$var$Ee({ width: e, height: r, isEditorReady: n, loading: t, _ref: a, className: m, wrapperProps: E }) {
    return (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement("section", {
        style: {
            ...$eaec3a37b34baecc$var$v.wrapper,
            width: e,
            height: r
        },
        ...E
    }, !n && (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement($eaec3a37b34baecc$var$$, null, t), (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement("div", {
        ref: a,
        style: {
            ...$eaec3a37b34baecc$var$v.fullWidth,
            ...!n && $eaec3a37b34baecc$var$v.hide
        },
        className: m
    }));
}
var $eaec3a37b34baecc$var$ee = $eaec3a37b34baecc$var$Ee;
var $eaec3a37b34baecc$var$H = (0, $63SH6.memo)($eaec3a37b34baecc$var$ee);
function $eaec3a37b34baecc$var$Ce(e) {
    (0, $63SH6.useEffect)(e, []);
}
var $eaec3a37b34baecc$var$k = $eaec3a37b34baecc$var$Ce;
function $eaec3a37b34baecc$var$he(e, r, n = !0) {
    let t = (0, $63SH6.useRef)(!0);
    (0, $63SH6.useEffect)(t.current || !n ? ()=>{
        t.current = !1;
    } : e, r);
}
var $eaec3a37b34baecc$var$l = $eaec3a37b34baecc$var$he;
function $eaec3a37b34baecc$var$D() {}
function $eaec3a37b34baecc$var$h(e, r, n, t) {
    return $eaec3a37b34baecc$var$De(e, t) || $eaec3a37b34baecc$var$be(e, r, n, t);
}
function $eaec3a37b34baecc$var$De(e, r) {
    return e.editor.getModel($eaec3a37b34baecc$var$te(e, r));
}
function $eaec3a37b34baecc$var$be(e, r, n, t) {
    return e.editor.createModel(r, n, t ? $eaec3a37b34baecc$var$te(e, t) : void 0);
}
function $eaec3a37b34baecc$var$te(e, r) {
    return e.Uri.parse(r);
}
function $eaec3a37b34baecc$var$Oe({ original: e, modified: r, language: n, originalLanguage: t, modifiedLanguage: a, originalModelPath: m, modifiedModelPath: E, keepCurrentOriginalModel: g = !1, keepCurrentModifiedModel: N = !1, theme: x = "light", loading: P = "Loading...", options: y = {}, height: V = "100%", width: z = "100%", className: F, wrapperProps: j = {}, beforeMount: A = $eaec3a37b34baecc$var$D, onMount: q = $eaec3a37b34baecc$var$D }) {
    let [M, O] = (0, $63SH6.useState)(!1), [T, s] = (0, $63SH6.useState)(!0), u = (0, $63SH6.useRef)(null), c = (0, $63SH6.useRef)(null), w = (0, $63SH6.useRef)(null), d = (0, $63SH6.useRef)(q), o = (0, $63SH6.useRef)(A), b = (0, $63SH6.useRef)(!1);
    $eaec3a37b34baecc$var$k(()=>{
        let i = (0, $id3Cn.default).init();
        return i.then((f)=>(c.current = f) && s(!1)).catch((f)=>f?.type !== "cancelation" && console.error("Monaco initialization: error:", f)), ()=>u.current ? I() : i.cancel();
    }), $eaec3a37b34baecc$var$l(()=>{
        if (u.current && c.current) {
            let i = u.current.getOriginalEditor(), f = $eaec3a37b34baecc$var$h(c.current, e || "", t || n || "text", m || "");
            f !== i.getModel() && i.setModel(f);
        }
    }, [
        m
    ], M), $eaec3a37b34baecc$var$l(()=>{
        if (u.current && c.current) {
            let i = u.current.getModifiedEditor(), f = $eaec3a37b34baecc$var$h(c.current, r || "", a || n || "text", E || "");
            f !== i.getModel() && i.setModel(f);
        }
    }, [
        E
    ], M), $eaec3a37b34baecc$var$l(()=>{
        let i = u.current.getModifiedEditor();
        i.getOption(c.current.editor.EditorOption.readOnly) ? i.setValue(r || "") : r !== i.getValue() && (i.executeEdits("", [
            {
                range: i.getModel().getFullModelRange(),
                text: r || "",
                forceMoveMarkers: !0
            }
        ]), i.pushUndoStop());
    }, [
        r
    ], M), $eaec3a37b34baecc$var$l(()=>{
        u.current?.getModel()?.original.setValue(e || "");
    }, [
        e
    ], M), $eaec3a37b34baecc$var$l(()=>{
        let { original: i, modified: f } = u.current.getModel();
        c.current.editor.setModelLanguage(i, t || n || "text"), c.current.editor.setModelLanguage(f, a || n || "text");
    }, [
        n,
        t,
        a
    ], M), $eaec3a37b34baecc$var$l(()=>{
        c.current?.editor.setTheme(x);
    }, [
        x
    ], M), $eaec3a37b34baecc$var$l(()=>{
        u.current?.updateOptions(y);
    }, [
        y
    ], M);
    let L = (0, $63SH6.useCallback)(()=>{
        if (!c.current) return;
        o.current(c.current);
        let i = $eaec3a37b34baecc$var$h(c.current, e || "", t || n || "text", m || ""), f = $eaec3a37b34baecc$var$h(c.current, r || "", a || n || "text", E || "");
        u.current?.setModel({
            original: i,
            modified: f
        });
    }, [
        n,
        r,
        a,
        e,
        t,
        m,
        E
    ]), U = (0, $63SH6.useCallback)(()=>{
        !b.current && w.current && (u.current = c.current.editor.createDiffEditor(w.current, {
            automaticLayout: !0,
            ...y
        }), L(), c.current?.editor.setTheme(x), O(!0), b.current = !0);
    }, [
        y,
        x,
        L
    ]);
    (0, $63SH6.useEffect)(()=>{
        M && d.current(u.current, c.current);
    }, [
        M
    ]), (0, $63SH6.useEffect)(()=>{
        !T && !M && U();
    }, [
        T,
        M,
        U
    ]);
    function I() {
        let i = u.current?.getModel();
        g || i?.original?.dispose(), N || i?.modified?.dispose(), u.current?.dispose();
    }
    return (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement($eaec3a37b34baecc$var$H, {
        width: z,
        height: V,
        isEditorReady: M,
        loading: P,
        _ref: w,
        className: F,
        wrapperProps: j
    });
}
var $eaec3a37b34baecc$var$ie = $eaec3a37b34baecc$var$Oe;
var $eaec3a37b34baecc$export$f95cfa31b5a0bc91 = (0, $63SH6.memo)($eaec3a37b34baecc$var$ie);
function $eaec3a37b34baecc$var$Pe() {
    let [e, r] = (0, $63SH6.useState)((0, $id3Cn.default).__getMonacoInstance());
    return $eaec3a37b34baecc$var$k(()=>{
        let n;
        return e || (n = (0, $id3Cn.default).init(), n.then((t)=>{
            r(t);
        })), ()=>n?.cancel();
    }), e;
}
var $eaec3a37b34baecc$export$7c29dcfb1e21cfdd = $eaec3a37b34baecc$var$Pe;
function $eaec3a37b34baecc$var$He(e) {
    let r = (0, $63SH6.useRef)();
    return (0, $63SH6.useEffect)(()=>{
        r.current = e;
    }, [
        e
    ]), r.current;
}
var $eaec3a37b34baecc$var$se = $eaec3a37b34baecc$var$He;
var $eaec3a37b34baecc$var$_ = new Map;
function $eaec3a37b34baecc$var$Ve({ defaultValue: e, defaultLanguage: r, defaultPath: n, value: t, language: a, path: m, theme: E = "light", line: g, loading: N = "Loading...", options: x = {}, overrideServices: P = {}, saveViewState: y = !0, keepCurrentModel: V = !1, width: z = "100%", height: F = "100%", className: j, wrapperProps: A = {}, beforeMount: q = $eaec3a37b34baecc$var$D, onMount: M = $eaec3a37b34baecc$var$D, onChange: O, onValidate: T = $eaec3a37b34baecc$var$D }) {
    let [s, u] = (0, $63SH6.useState)(!1), [c, w] = (0, $63SH6.useState)(!0), d = (0, $63SH6.useRef)(null), o = (0, $63SH6.useRef)(null), b = (0, $63SH6.useRef)(null), L = (0, $63SH6.useRef)(M), U = (0, $63SH6.useRef)(q), I = (0, $63SH6.useRef)(), i = (0, $63SH6.useRef)(t), f = $eaec3a37b34baecc$var$se(m), Q = (0, $63SH6.useRef)(!1), B = (0, $63SH6.useRef)(!1);
    $eaec3a37b34baecc$var$k(()=>{
        let p = (0, $id3Cn.default).init();
        return p.then((R)=>(d.current = R) && w(!1)).catch((R)=>R?.type !== "cancelation" && console.error("Monaco initialization: error:", R)), ()=>o.current ? pe() : p.cancel();
    }), $eaec3a37b34baecc$var$l(()=>{
        let p = $eaec3a37b34baecc$var$h(d.current, e || t || "", r || a || "", m || n || "");
        p !== o.current?.getModel() && (y && $eaec3a37b34baecc$var$_.set(f, o.current?.saveViewState()), o.current?.setModel(p), y && o.current?.restoreViewState($eaec3a37b34baecc$var$_.get(m)));
    }, [
        m
    ], s), $eaec3a37b34baecc$var$l(()=>{
        o.current?.updateOptions(x);
    }, [
        x
    ], s), $eaec3a37b34baecc$var$l(()=>{
        !o.current || t === void 0 || (o.current.getOption(d.current.editor.EditorOption.readOnly) ? o.current.setValue(t) : t !== o.current.getValue() && (B.current = !0, o.current.executeEdits("", [
            {
                range: o.current.getModel().getFullModelRange(),
                text: t,
                forceMoveMarkers: !0
            }
        ]), o.current.pushUndoStop(), B.current = !1));
    }, [
        t
    ], s), $eaec3a37b34baecc$var$l(()=>{
        let p = o.current?.getModel();
        p && a && d.current?.editor.setModelLanguage(p, a);
    }, [
        a
    ], s), $eaec3a37b34baecc$var$l(()=>{
        g !== void 0 && o.current?.revealLine(g);
    }, [
        g
    ], s), $eaec3a37b34baecc$var$l(()=>{
        d.current?.editor.setTheme(E);
    }, [
        E
    ], s);
    let X = (0, $63SH6.useCallback)(()=>{
        if (!(!b.current || !d.current) && !Q.current) {
            U.current(d.current);
            let p = m || n, R = $eaec3a37b34baecc$var$h(d.current, t || e || "", r || a || "", p || "");
            o.current = d.current?.editor.create(b.current, {
                model: R,
                automaticLayout: !0,
                ...x
            }, P), y && o.current.restoreViewState($eaec3a37b34baecc$var$_.get(p)), d.current.editor.setTheme(E), g !== void 0 && o.current.revealLine(g), u(!0), Q.current = !0;
        }
    }, [
        e,
        r,
        n,
        t,
        a,
        m,
        x,
        P,
        y,
        E,
        g
    ]);
    (0, $63SH6.useEffect)(()=>{
        s && L.current(o.current, d.current);
    }, [
        s
    ]), (0, $63SH6.useEffect)(()=>{
        !c && !s && X();
    }, [
        c,
        s,
        X
    ]), i.current = t, (0, $63SH6.useEffect)(()=>{
        s && O && (I.current?.dispose(), I.current = o.current?.onDidChangeModelContent((p)=>{
            B.current || O(o.current.getValue(), p);
        }));
    }, [
        s,
        O
    ]), (0, $63SH6.useEffect)(()=>{
        if (s) {
            let p = d.current.editor.onDidChangeMarkers((R)=>{
                let G = o.current.getModel()?.uri;
                if (G && R.find((J)=>J.path === G.path)) {
                    let J = d.current.editor.getModelMarkers({
                        resource: G
                    });
                    T?.(J);
                }
            });
            return ()=>{
                p?.dispose();
            };
        }
        return ()=>{};
    }, [
        s,
        T
    ]);
    function pe() {
        I.current?.dispose(), V ? y && $eaec3a37b34baecc$var$_.set(m, o.current.saveViewState()) : o.current.getModel()?.dispose(), o.current.dispose();
    }
    return (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement($eaec3a37b34baecc$var$H, {
        width: z,
        height: F,
        isEditorReady: s,
        loading: N,
        _ref: b,
        className: j,
        wrapperProps: A
    });
}
var $eaec3a37b34baecc$var$fe = $eaec3a37b34baecc$var$Ve;
var $eaec3a37b34baecc$export$7cda8d932e2f33c0 = (0, $63SH6.memo)($eaec3a37b34baecc$var$fe);
var $eaec3a37b34baecc$export$2e2bcd8739ae039 = $eaec3a37b34baecc$export$7cda8d932e2f33c0;

});
parcelRegister("kNIee", function(module, exports) {

$parcel$export(module.exports, "default", () => (parcelRequire("id3Cn")).default);

var $id3Cn = parcelRequire("id3Cn");

});
parcelRegister("id3Cn", function(module, exports) {

$parcel$export(module.exports, "default", () => $d41c3f5279aed058$export$2e2bcd8739ae039);

var $3EaYc = parcelRequire("3EaYc");

var $dxZFf = parcelRequire("dxZFf");

var $bJBBE = parcelRequire("bJBBE");

var $2Nb9B = parcelRequire("2Nb9B");

var $rWuFh = parcelRequire("rWuFh");

var $936KQ = parcelRequire("936KQ");

var $8QzCV = parcelRequire("8QzCV");
/** the local state of the module */ var $d41c3f5279aed058$var$_state$create = (0, $dxZFf.default).create({
    config: (0, $bJBBE.default),
    isInitialized: false,
    resolve: null,
    reject: null,
    monaco: null
}), $d41c3f5279aed058$var$_state$create2 = (0, $3EaYc.slicedToArray)($d41c3f5279aed058$var$_state$create, 2), $d41c3f5279aed058$var$getState = $d41c3f5279aed058$var$_state$create2[0], $d41c3f5279aed058$var$setState = $d41c3f5279aed058$var$_state$create2[1];
/**
 * set the loader configuration
 * @param {Object} config - the configuration object
 */ function $d41c3f5279aed058$var$config(globalConfig) {
    var _validators$config = (0, $2Nb9B.default).config(globalConfig), monaco = _validators$config.monaco, config = (0, $3EaYc.objectWithoutProperties)(_validators$config, [
        "monaco"
    ]);
    $d41c3f5279aed058$var$setState(function(state) {
        return {
            config: (0, $936KQ.default)(state.config, config),
            monaco: monaco
        };
    });
}
/**
 * handles the initialization of the monaco-editor
 * @return {Promise} - returns an instance of monaco (with a cancelable promise)
 */ function $d41c3f5279aed058$var$init() {
    var state = $d41c3f5279aed058$var$getState(function(_ref) {
        var monaco = _ref.monaco, isInitialized = _ref.isInitialized, resolve = _ref.resolve;
        return {
            monaco: monaco,
            isInitialized: isInitialized,
            resolve: resolve
        };
    });
    if (!state.isInitialized) {
        $d41c3f5279aed058$var$setState({
            isInitialized: true
        });
        if (state.monaco) {
            state.resolve(state.monaco);
            return (0, $8QzCV.default)($d41c3f5279aed058$var$wrapperPromise);
        }
        if (window.monaco && window.monaco.editor) {
            $d41c3f5279aed058$var$storeMonacoInstance(window.monaco);
            state.resolve(window.monaco);
            return (0, $8QzCV.default)($d41c3f5279aed058$var$wrapperPromise);
        }
        (0, $rWuFh.default)($d41c3f5279aed058$var$injectScripts, $d41c3f5279aed058$var$getMonacoLoaderScript)($d41c3f5279aed058$var$configureLoader);
    }
    return (0, $8QzCV.default)($d41c3f5279aed058$var$wrapperPromise);
}
/**
 * injects provided scripts into the document.body
 * @param {Object} script - an HTML script element
 * @return {Object} - the injected HTML script element
 */ function $d41c3f5279aed058$var$injectScripts(script) {
    return document.body.appendChild(script);
}
/**
 * creates an HTML script element with/without provided src
 * @param {string} [src] - the source path of the script
 * @return {Object} - the created HTML script element
 */ function $d41c3f5279aed058$var$createScript(src) {
    var script = document.createElement("script");
    return src && (script.src = src), script;
}
/**
 * creates an HTML script element with the monaco loader src
 * @return {Object} - the created HTML script element
 */ function $d41c3f5279aed058$var$getMonacoLoaderScript(configureLoader) {
    var state = $d41c3f5279aed058$var$getState(function(_ref2) {
        var config = _ref2.config, reject = _ref2.reject;
        return {
            config: config,
            reject: reject
        };
    });
    var loaderScript = $d41c3f5279aed058$var$createScript("".concat(state.config.paths.vs, "/loader.js"));
    loaderScript.onload = function() {
        return configureLoader();
    };
    loaderScript.onerror = state.reject;
    return loaderScript;
}
/**
 * configures the monaco loader
 */ function $d41c3f5279aed058$var$configureLoader() {
    var state = $d41c3f5279aed058$var$getState(function(_ref3) {
        var config = _ref3.config, resolve = _ref3.resolve, reject = _ref3.reject;
        return {
            config: config,
            resolve: resolve,
            reject: reject
        };
    });
    var require = window.require;
    require.config(state.config);
    require([
        "vs/editor/editor.main"
    ], function(monaco) {
        $d41c3f5279aed058$var$storeMonacoInstance(monaco);
        state.resolve(monaco);
    }, function(error) {
        state.reject(error);
    });
}
/**
 * store monaco instance in local state
 */ function $d41c3f5279aed058$var$storeMonacoInstance(monaco) {
    if (!$d41c3f5279aed058$var$getState().monaco) $d41c3f5279aed058$var$setState({
        monaco: monaco
    });
}
/**
 * internal helper function
 * extracts stored monaco instance
 * @return {Object|null} - the monaco instance
 */ function $d41c3f5279aed058$var$__getMonacoInstance() {
    return $d41c3f5279aed058$var$getState(function(_ref4) {
        var monaco = _ref4.monaco;
        return monaco;
    });
}
var $d41c3f5279aed058$var$wrapperPromise = new Promise(function(resolve, reject) {
    return $d41c3f5279aed058$var$setState({
        resolve: resolve,
        reject: reject
    });
});
var $d41c3f5279aed058$var$loader = {
    config: $d41c3f5279aed058$var$config,
    init: $d41c3f5279aed058$var$init,
    __getMonacoInstance: $d41c3f5279aed058$var$__getMonacoInstance
};
var $d41c3f5279aed058$export$2e2bcd8739ae039 = $d41c3f5279aed058$var$loader;

});
parcelRegister("3EaYc", function(module, exports) {

$parcel$export(module.exports, "objectSpread2", () => $2a7d9de7b661058c$export$df72099fd95ee399);
$parcel$export(module.exports, "objectWithoutProperties", () => $2a7d9de7b661058c$export$d8a2083381e8fcb);
$parcel$export(module.exports, "slicedToArray", () => $2a7d9de7b661058c$export$12b6a547ec390b98);
function $2a7d9de7b661058c$export$fdab3c20aae16ddf(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}
function $2a7d9de7b661058c$var$ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function $2a7d9de7b661058c$export$df72099fd95ee399(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) $2a7d9de7b661058c$var$ownKeys(Object(source), true).forEach(function(key) {
            $2a7d9de7b661058c$export$fdab3c20aae16ddf(target, key, source[key]);
        });
        else if (Object.getOwnPropertyDescriptors) Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        else $2a7d9de7b661058c$var$ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function $2a7d9de7b661058c$export$81942a8f34b531c4(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}
function $2a7d9de7b661058c$export$d8a2083381e8fcb(source, excluded) {
    if (source == null) return {};
    var target = $2a7d9de7b661058c$export$81942a8f34b531c4(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for(i = 0; i < sourceSymbolKeys.length; i++){
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) continue;
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
            target[key] = source[key];
        }
    }
    return target;
}
function $2a7d9de7b661058c$export$12b6a547ec390b98(arr, i) {
    return $2a7d9de7b661058c$export$993bf82df8051d40(arr) || $2a7d9de7b661058c$export$861af887bcb88094(arr, i) || $2a7d9de7b661058c$export$b471fbbbe6d7806(arr, i) || $2a7d9de7b661058c$export$37ce4bd7a39fe25f();
}
function $2a7d9de7b661058c$export$993bf82df8051d40(arr) {
    if (Array.isArray(arr)) return arr;
}
function $2a7d9de7b661058c$export$861af887bcb88094(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
        for(var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true){
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally{
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally{
            if (_d) throw _e;
        }
    }
    return _arr;
}
function $2a7d9de7b661058c$export$b471fbbbe6d7806(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return $2a7d9de7b661058c$export$93cc12bcce4c2e3c(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return $2a7d9de7b661058c$export$93cc12bcce4c2e3c(o, minLen);
}
function $2a7d9de7b661058c$export$93cc12bcce4c2e3c(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];
    return arr2;
}
function $2a7d9de7b661058c$export$37ce4bd7a39fe25f() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

});

parcelRegister("dxZFf", function(module, exports) {

$parcel$export(module.exports, "default", () => $9dce30ade1c91099$export$2e2bcd8739ae039);
function $9dce30ade1c91099$var$_defineProperty(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}
function $9dce30ade1c91099$var$ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function $9dce30ade1c91099$var$_objectSpread2(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) $9dce30ade1c91099$var$ownKeys(Object(source), true).forEach(function(key) {
            $9dce30ade1c91099$var$_defineProperty(target, key, source[key]);
        });
        else if (Object.getOwnPropertyDescriptors) Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        else $9dce30ade1c91099$var$ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function $9dce30ade1c91099$var$compose() {
    for(var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++)fns[_key] = arguments[_key];
    return function(x) {
        return fns.reduceRight(function(y, f) {
            return f(y);
        }, x);
    };
}
function $9dce30ade1c91099$var$curry(fn) {
    return function curried() {
        var _this = this;
        for(var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++)args[_key2] = arguments[_key2];
        return args.length >= fn.length ? fn.apply(this, args) : function() {
            for(var _len3 = arguments.length, nextArgs = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++)nextArgs[_key3] = arguments[_key3];
            return curried.apply(_this, [].concat(args, nextArgs));
        };
    };
}
function $9dce30ade1c91099$var$isObject(value) {
    return ({}).toString.call(value).includes("Object");
}
function $9dce30ade1c91099$var$isEmpty(obj) {
    return !Object.keys(obj).length;
}
function $9dce30ade1c91099$var$isFunction(value) {
    return typeof value === "function";
}
function $9dce30ade1c91099$var$hasOwnProperty(object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
}
function $9dce30ade1c91099$var$validateChanges(initial, changes) {
    if (!$9dce30ade1c91099$var$isObject(changes)) $9dce30ade1c91099$var$errorHandler("changeType");
    if (Object.keys(changes).some(function(field) {
        return !$9dce30ade1c91099$var$hasOwnProperty(initial, field);
    })) $9dce30ade1c91099$var$errorHandler("changeField");
    return changes;
}
function $9dce30ade1c91099$var$validateSelector(selector) {
    if (!$9dce30ade1c91099$var$isFunction(selector)) $9dce30ade1c91099$var$errorHandler("selectorType");
}
function $9dce30ade1c91099$var$validateHandler(handler) {
    if (!($9dce30ade1c91099$var$isFunction(handler) || $9dce30ade1c91099$var$isObject(handler))) $9dce30ade1c91099$var$errorHandler("handlerType");
    if ($9dce30ade1c91099$var$isObject(handler) && Object.values(handler).some(function(_handler) {
        return !$9dce30ade1c91099$var$isFunction(_handler);
    })) $9dce30ade1c91099$var$errorHandler("handlersType");
}
function $9dce30ade1c91099$var$validateInitial(initial) {
    if (!initial) $9dce30ade1c91099$var$errorHandler("initialIsRequired");
    if (!$9dce30ade1c91099$var$isObject(initial)) $9dce30ade1c91099$var$errorHandler("initialType");
    if ($9dce30ade1c91099$var$isEmpty(initial)) $9dce30ade1c91099$var$errorHandler("initialContent");
}
function $9dce30ade1c91099$var$throwError(errorMessages, type) {
    throw new Error(errorMessages[type] || errorMessages["default"]);
}
var $9dce30ade1c91099$var$errorMessages = {
    initialIsRequired: "initial state is required",
    initialType: "initial state should be an object",
    initialContent: "initial state shouldn't be an empty object",
    handlerType: "handler should be an object or a function",
    handlersType: "all handlers should be a functions",
    selectorType: "selector should be a function",
    changeType: "provided value of changes should be an object",
    changeField: 'it seams you want to change a field in the state which is not specified in the "initial" state',
    "default": "an unknown error accured in `state-local` package"
};
var $9dce30ade1c91099$var$errorHandler = $9dce30ade1c91099$var$curry($9dce30ade1c91099$var$throwError)($9dce30ade1c91099$var$errorMessages);
var $9dce30ade1c91099$var$validators = {
    changes: $9dce30ade1c91099$var$validateChanges,
    selector: $9dce30ade1c91099$var$validateSelector,
    handler: $9dce30ade1c91099$var$validateHandler,
    initial: $9dce30ade1c91099$var$validateInitial
};
function $9dce30ade1c91099$var$create(initial) {
    var handler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    $9dce30ade1c91099$var$validators.initial(initial);
    $9dce30ade1c91099$var$validators.handler(handler);
    var state = {
        current: initial
    };
    var didUpdate = $9dce30ade1c91099$var$curry($9dce30ade1c91099$var$didStateUpdate)(state, handler);
    var update = $9dce30ade1c91099$var$curry($9dce30ade1c91099$var$updateState)(state);
    var validate = $9dce30ade1c91099$var$curry($9dce30ade1c91099$var$validators.changes)(initial);
    var getChanges = $9dce30ade1c91099$var$curry($9dce30ade1c91099$var$extractChanges)(state);
    function getState() {
        var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function(state) {
            return state;
        };
        $9dce30ade1c91099$var$validators.selector(selector);
        return selector(state.current);
    }
    function setState(causedChanges) {
        $9dce30ade1c91099$var$compose(didUpdate, update, validate, getChanges)(causedChanges);
    }
    return [
        getState,
        setState
    ];
}
function $9dce30ade1c91099$var$extractChanges(state, causedChanges) {
    return $9dce30ade1c91099$var$isFunction(causedChanges) ? causedChanges(state.current) : causedChanges;
}
function $9dce30ade1c91099$var$updateState(state, changes) {
    state.current = $9dce30ade1c91099$var$_objectSpread2($9dce30ade1c91099$var$_objectSpread2({}, state.current), changes);
    return changes;
}
function $9dce30ade1c91099$var$didStateUpdate(state, handler, changes) {
    $9dce30ade1c91099$var$isFunction(handler) ? handler(state.current) : Object.keys(changes).forEach(function(field) {
        var _handler$field;
        return (_handler$field = handler[field]) === null || _handler$field === void 0 ? void 0 : _handler$field.call(handler, state.current[field]);
    });
    return changes;
}
var $9dce30ade1c91099$var$index = {
    create: $9dce30ade1c91099$var$create
};
var $9dce30ade1c91099$export$2e2bcd8739ae039 = $9dce30ade1c91099$var$index;

});

parcelRegister("bJBBE", function(module, exports) {

$parcel$export(module.exports, "default", () => $88b111812c659f63$export$2e2bcd8739ae039);
var $88b111812c659f63$var$config = {
    paths: {
        vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs"
    }
};
var $88b111812c659f63$export$2e2bcd8739ae039 = $88b111812c659f63$var$config;

});

parcelRegister("2Nb9B", function(module, exports) {

$parcel$export(module.exports, "default", () => $2088cf488e832168$export$2e2bcd8739ae039);

var $a6ywS = parcelRequire("a6ywS");

var $lkyZ4 = parcelRequire("lkyZ4");
/**
 * validates the configuration object and informs about deprecation
 * @param {Object} config - the configuration object 
 * @return {Object} config - the validated configuration object
 */ function $2088cf488e832168$var$validateConfig(config) {
    if (!config) $2088cf488e832168$export$cc3fdd528b56c4a9("configIsRequired");
    if (!(0, $lkyZ4.default)(config)) $2088cf488e832168$export$cc3fdd528b56c4a9("configType");
    if (config.urls) {
        $2088cf488e832168$var$informAboutDeprecation();
        return {
            paths: {
                vs: config.urls.monacoBase
            }
        };
    }
    return config;
}
/**
 * logs deprecation message
 */ function $2088cf488e832168$var$informAboutDeprecation() {
    console.warn($2088cf488e832168$export$d8bd0967cb58683.deprecation);
}
function $2088cf488e832168$var$throwError(errorMessages, type) {
    throw new Error(errorMessages[type] || errorMessages["default"]);
}
var $2088cf488e832168$export$d8bd0967cb58683 = {
    configIsRequired: "the configuration object is required",
    configType: "the configuration object should be an object",
    "default": "an unknown error accured in `@monaco-editor/loader` package",
    deprecation: "Deprecation warning!\n    You are using deprecated way of configuration.\n\n    Instead of using\n      monaco.config({ urls: { monacoBase: '...' } })\n    use\n      monaco.config({ paths: { vs: '...' } })\n\n    For more please check the link https://github.com/suren-atoyan/monaco-loader#config\n  "
};
var $2088cf488e832168$export$cc3fdd528b56c4a9 = (0, $a6ywS.default)($2088cf488e832168$var$throwError)($2088cf488e832168$export$d8bd0967cb58683);
var $2088cf488e832168$var$validators = {
    config: $2088cf488e832168$var$validateConfig
};
var $2088cf488e832168$export$2e2bcd8739ae039 = $2088cf488e832168$var$validators;

});
parcelRegister("a6ywS", function(module, exports) {

$parcel$export(module.exports, "default", () => $75b53fbbfbeb4a2a$export$2e2bcd8739ae039);
function $75b53fbbfbeb4a2a$var$curry(fn) {
    return function curried() {
        var _this = this;
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++)args[_key] = arguments[_key];
        return args.length >= fn.length ? fn.apply(this, args) : function() {
            for(var _len2 = arguments.length, nextArgs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++)nextArgs[_key2] = arguments[_key2];
            return curried.apply(_this, [].concat(args, nextArgs));
        };
    };
}
var $75b53fbbfbeb4a2a$export$2e2bcd8739ae039 = $75b53fbbfbeb4a2a$var$curry;

});

parcelRegister("lkyZ4", function(module, exports) {

$parcel$export(module.exports, "default", () => $f8769a554cf7be44$export$2e2bcd8739ae039);
function $f8769a554cf7be44$var$isObject(value) {
    return ({}).toString.call(value).includes("Object");
}
var $f8769a554cf7be44$export$2e2bcd8739ae039 = $f8769a554cf7be44$var$isObject;

});


parcelRegister("rWuFh", function(module, exports) {

$parcel$export(module.exports, "default", () => $053fe5571d660a8d$export$2e2bcd8739ae039);
var $053fe5571d660a8d$var$compose = function compose() {
    for(var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++)fns[_key] = arguments[_key];
    return function(x) {
        return fns.reduceRight(function(y, f) {
            return f(y);
        }, x);
    };
};
var $053fe5571d660a8d$export$2e2bcd8739ae039 = $053fe5571d660a8d$var$compose;

});

parcelRegister("936KQ", function(module, exports) {

$parcel$export(module.exports, "default", () => $6969a230ee7af900$export$2e2bcd8739ae039);

var $3EaYc = parcelRequire("3EaYc");
function $6969a230ee7af900$var$merge(target, source) {
    Object.keys(source).forEach(function(key) {
        if (source[key] instanceof Object) {
            if (target[key]) Object.assign(source[key], $6969a230ee7af900$var$merge(target[key], source[key]));
        }
    });
    return (0, $3EaYc.objectSpread2)((0, $3EaYc.objectSpread2)({}, target), source);
}
var $6969a230ee7af900$export$2e2bcd8739ae039 = $6969a230ee7af900$var$merge;

});

parcelRegister("8QzCV", function(module, exports) {

$parcel$export(module.exports, "default", () => $670ed0d374c95f74$export$2e2bcd8739ae039);
// The source (has been changed) is https://github.com/facebook/react/issues/5465#issuecomment-157888325
var $670ed0d374c95f74$export$ef4ebf120f9f6749 = {
    type: "cancelation",
    msg: "operation is manually canceled"
};
function $670ed0d374c95f74$var$makeCancelable(promise) {
    var hasCanceled_ = false;
    var wrappedPromise = new Promise(function(resolve, reject) {
        promise.then(function(val) {
            return hasCanceled_ ? reject($670ed0d374c95f74$export$ef4ebf120f9f6749) : resolve(val);
        });
        promise["catch"](reject);
    });
    return wrappedPromise.cancel = function() {
        return hasCanceled_ = true;
    }, wrappedPromise;
}
var $670ed0d374c95f74$export$2e2bcd8739ae039 = $670ed0d374c95f74$var$makeCancelable;

});




})();
//# sourceMappingURL=dist.f8eecf79.js.map
