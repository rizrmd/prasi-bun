(() => {

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

      var $parcel$global = globalThis;
    var parcelRequire = $parcel$global["parcelRequire2d1f"];
var parcelRegister = parcelRequire.register;
parcelRegister("KfUSb", function(module, exports) {

$parcel$export(module.exports, "ErrorBox", () => $6f57cf00b9107dc2$export$f04a3ea04edc0e04);

var $lAN3N = parcelRequire("lAN3N");

var $6YscK = parcelRequire("6YscK");

var $4WfNn = parcelRequire("4WfNn");

var $eoQBx = parcelRequire("eoQBx");
const $6f57cf00b9107dc2$export$f04a3ea04edc0e04 = (0, $6YscK.withErrorBoundary)(({ children: children, meta: meta, id: id })=>{
    const local = (0, $4WfNn.useLocal)({
        retrying: false
    });
    const [error, resetError] = (0, $6YscK.useErrorBoundary)((error, errorInfo)=>{
        console.warn(error);
    });
    let _meta = meta;
    if (id) {
        const p = (0, $4WfNn.useGlobal)((0, $eoQBx.EditorGlobal), "EDITOR");
        _meta = p.treeMeta[id];
    }
    if (error) return /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
        className: "bg-red-100 border border-red-300 rounded-sm text-xs flex flex-col items-center",
        children: [
            /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                className: "text-[10px] font-bold text-red-900 self-stretch px-1",
                children: [
                    "ERROR ",
                    _meta?.item.name ? "[" + _meta.item.name + "]:" : ""
                ]
            }),
            /*#__PURE__*/ (0, $lAN3N.jsx)("p", {
                className: "border-b border-red-300 px-1 pb-1 min-w-[100px]",
                children: !local.retrying ? /*#__PURE__*/ (0, $lAN3N.jsx)((0, $lAN3N.Fragment), {
                    children: error.message
                }) : /*#__PURE__*/ (0, $lAN3N.jsx)((0, $lAN3N.Fragment), {
                    children: "Retrying..."
                })
            }),
            /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                className: "p-1",
                children: /*#__PURE__*/ (0, $lAN3N.jsx)("button", {
                    onClick: ()=>{
                        local.retrying = true;
                        local.render();
                        setTimeout(()=>{
                            local.retrying = false;
                            local.render();
                            resetError();
                        }, 100);
                    },
                    className: "bg-white border border-white hover:border-red-400 hover:bg-red-50 rounded px-2",
                    children: "Try again"
                })
            })
        ]
    });
    return children;
});

});
parcelRegister("6YscK", function(module, exports) {

$parcel$export(module.exports, "withErrorBoundary", () => $513e398b8d7c384a$export$f0c7a449e0cfaec7);
$parcel$export(module.exports, "useErrorBoundary", () => $513e398b8d7c384a$export$c052f6604b7d51fe);

var $63SH6 = parcelRequire("63SH6");
class $513e398b8d7c384a$var$ErrorBoundary extends (0, $63SH6.Component) {
    displayName = "ReactUseErrorBoundary";
    componentDidCatch(...args) {
        this.setState({});
        this.props.onError(...args);
    }
    render() {
        return this.props.children;
    }
}
const $513e398b8d7c384a$var$noop = ()=>false;
const $513e398b8d7c384a$var$errorBoundaryContext = (0, $63SH6.createContext)({
    componentDidCatch: {
        current: undefined
    },
    error: undefined,
    setError: $513e398b8d7c384a$var$noop
});
function $513e398b8d7c384a$export$b16d9fb1a22de840({ children: children }) {
    const [error, setError] = (0, $63SH6.useState)();
    const componentDidCatch = (0, $63SH6.useRef)();
    const ctx = (0, $63SH6.useMemo)(()=>({
            componentDidCatch: componentDidCatch,
            error: error,
            setError: setError
        }), [
        error
    ]);
    return (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement($513e398b8d7c384a$var$errorBoundaryContext.Provider, {
        value: ctx
    }, (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement($513e398b8d7c384a$var$ErrorBoundary, {
        error: error,
        onError: (error, errorInfo)=>{
            setError(error);
            componentDidCatch.current?.(error, errorInfo);
        }
    }, children));
}
$513e398b8d7c384a$export$b16d9fb1a22de840.displayName = "ReactUseErrorBoundaryContext";
function $513e398b8d7c384a$export$f0c7a449e0cfaec7(WrappedComponent) {
    function WithErrorBoundary(props) {
        return (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement($513e398b8d7c384a$export$b16d9fb1a22de840, null, (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement(WrappedComponent, {
            key: "WrappedComponent",
            ...props
        }));
    }
    WithErrorBoundary.displayName = `WithErrorBoundary(${WrappedComponent.displayName ?? WrappedComponent.name ?? "Component"})`;
    return WithErrorBoundary;
}
function $513e398b8d7c384a$export$c052f6604b7d51fe(componentDidCatch) {
    const ctx = (0, $63SH6.useContext)($513e398b8d7c384a$var$errorBoundaryContext);
    ctx.componentDidCatch.current = componentDidCatch;
    const resetError = (0, $63SH6.useCallback)(()=>{
        ctx.setError(undefined);
    }, []);
    return [
        ctx.error,
        resetError
    ];
}

});


parcelRegister("cc0Z8", function(module, exports) {

$parcel$export(module.exports, "produceCSS", () => $a5136eecc56dd26b$export$9aa016b1e696fa5);

var $97sHp = parcelRequire("97sHp");

var $6h4bB = parcelRequire("6h4bB");

var $4DQaz = parcelRequire("4DQaz");

var $5OYrM = parcelRequire("5OYrM");

var $hP8yR = parcelRequire("hP8yR");

var $7aIlQ = parcelRequire("7aIlQ");

var $8DV5m = parcelRequire("8DV5m");

var $kXTha = parcelRequire("kXTha");
const $a5136eecc56dd26b$export$9aa016b1e696fa5 = (item, arg)=>{
    try {
        return cx([
            css`
        display: flex;
        position: relative;
        user-select: none;
        ${(0, $8DV5m.cssLayout)(item, arg.mode)}
        ${(0, $kXTha.cssPadding)(item, arg.mode)}
        ${(0, $5OYrM.cssDimension)(item, arg.mode, arg?.editor)}
        ${(0, $4DQaz.cssBorder)(item, arg.mode)}
        ${(0, $6h4bB.cssBackground)(item, arg.mode)}
        ${(0, $7aIlQ.cssFont)(item, arg.mode)}
      `,
            (arg?.hover || arg?.active) && (0, $hP8yR.cssEditor)({
                item: item,
                hover: arg?.hover,
                active: arg?.active
            }),
            (0, $97sHp.cssAdv)(item, arg.mode)
        ]);
    } catch (e) {
        console.log(e);
    }
    return cx([]);
};

});
parcelRegister("97sHp", function(module, exports) {

$parcel$export(module.exports, "cssAdv", () => $3be87ae1f3b1a139$export$e31c5a57cedf6cc4);

var $bjM6F = parcelRequire("bjM6F");
const $3be87ae1f3b1a139$export$e31c5a57cedf6cc4 = (cur, mode)=>{
    const adv = (0, $bjM6F.responsiveVal)(cur, "adv", mode, {});
    if (typeof adv.css === "string") {
        const hasCSS = adv.css.trim();
        if (hasCSS) return cx(css`
          ${adv.css}
        `, "cel", mode);
    }
    return "";
};

});
parcelRegister("bjM6F", function(module, exports) {

$parcel$export(module.exports, "responsiveVal", () => $6e7c56e8133f20c8$export$95f6a25db452441e);
const $6e7c56e8133f20c8$export$95f6a25db452441e = (item, key, mode, defaultVal)=>{
    let value = item[key];
    if (mode === "desktop" || !mode) {
        if (!value && item.mobile && item.mobile[key]) value = item.mobile[key];
    } else if (item.mobile && item.mobile[key]) value = item.mobile[key];
    if (!value) value = defaultVal;
    return value;
};

});


parcelRegister("6h4bB", function(module, exports) {

$parcel$export(module.exports, "cssBackground", () => $d7ca42aaee6dc748$export$84db22eb9d90f957);

var $bjM6F = parcelRequire("bjM6F");
const $d7ca42aaee6dc748$export$84db22eb9d90f957 = (cur, mode)=>{
    const bg = (0, $bjM6F.responsiveVal)(cur, "bg", mode, {
        size: "contain",
        pos: "center"
    });
    let bgurl = `${serverurl}${bg.url}`;
    if (bg && bg.url && bg.url.startsWith("http")) bgurl = bg.url;
    return cx(`
      background-repeat: no-repeat;
    `, bg.color && `
        background-color: ${bg.color};
      `, bg.url && typeof siteApiUrl === "string" && `
        background-image: url("${bgurl}");
      `, bg.size && `
        background-size: ${bg.size};
      `, bg.pos && `
        background-position: ${bg.pos};
      `);
};

});

parcelRegister("4DQaz", function(module, exports) {

$parcel$export(module.exports, "cssBorder", () => $08be68fb51c3d33e$export$ff51516858af6918);

var $cfpVL = parcelRequire("cfpVL");

var $bjM6F = parcelRequire("bjM6F");
const $08be68fb51c3d33e$export$ff51516858af6918 = (cur, mode)=>{
    const border = (0, $bjM6F.responsiveVal)(cur, "border", mode, {
        style: "solid",
        stroke: {},
        rounded: {
            tr: 0,
            tl: 0,
            bl: 0,
            br: 0
        },
        color: "transparent"
    });
    return cx($08be68fb51c3d33e$var$pick(border, "stroke.l", "border-left-width"), $08be68fb51c3d33e$var$pick(border, "stroke.r", "border-right-width"), $08be68fb51c3d33e$var$pick(border, "stroke.b", "border-bottom-width"), $08be68fb51c3d33e$var$pick(border, "stroke.t", "border-top-width"), $08be68fb51c3d33e$var$pick(border, "color", "border-color", "transparent"), $08be68fb51c3d33e$var$pick(border, "style", "border-style", "dashed"), $08be68fb51c3d33e$var$pick(border, "rounded.tl", "border-top-left-radius"), $08be68fb51c3d33e$var$pick(border, "rounded.tr", "border-top-right-radius"), $08be68fb51c3d33e$var$pick(border, "rounded.bl", "border-bottom-left-radius"), $08be68fb51c3d33e$var$pick(border, "rounded.br", "border-bottom-right-radius"));
};
const $08be68fb51c3d33e$var$pick = (obj, key, attr, notpx)=>{
    const val = (0, (/*@__PURE__*/$parcel$interopDefault($cfpVL)))(obj, key);
    if (notpx) {
        if (val) return `${attr}: ${val};`;
        else return `${attr}: ${notpx};`;
    } else if (val) return `${attr}: ${val}px;`;
};

});
parcelRegister("cfpVL", function(module, exports) {
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */ /** Used as the `TypeError` message for "Functions" methods. */ var $024d14a53d6ce9fd$var$FUNC_ERROR_TEXT = "Expected a function";
/** Used to stand-in for `undefined` hash values. */ var $024d14a53d6ce9fd$var$HASH_UNDEFINED = "__lodash_hash_undefined__";
/** Used as references for various `Number` constants. */ var $024d14a53d6ce9fd$var$INFINITY = 1 / 0;
/** `Object#toString` result references. */ var $024d14a53d6ce9fd$var$funcTag = "[object Function]", $024d14a53d6ce9fd$var$genTag = "[object GeneratorFunction]", $024d14a53d6ce9fd$var$symbolTag = "[object Symbol]";
/** Used to match property names within property paths. */ var $024d14a53d6ce9fd$var$reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, $024d14a53d6ce9fd$var$reIsPlainProp = /^\w*$/, $024d14a53d6ce9fd$var$reLeadingDot = /^\./, $024d14a53d6ce9fd$var$rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */ var $024d14a53d6ce9fd$var$reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
/** Used to match backslashes in property paths. */ var $024d14a53d6ce9fd$var$reEscapeChar = /\\(\\)?/g;
/** Used to detect host constructors (Safari). */ var $024d14a53d6ce9fd$var$reIsHostCtor = /^\[object .+?Constructor\]$/;
/** Detect free variable `global` from Node.js. */ var $024d14a53d6ce9fd$var$freeGlobal = typeof $parcel$global == "object" && $parcel$global && $parcel$global.Object === Object && $parcel$global;
/** Detect free variable `self`. */ var $024d14a53d6ce9fd$var$freeSelf = typeof self == "object" && self && self.Object === Object && self;
/** Used as a reference to the global object. */ var $024d14a53d6ce9fd$var$root = $024d14a53d6ce9fd$var$freeGlobal || $024d14a53d6ce9fd$var$freeSelf || Function("return this")();
/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */ function $024d14a53d6ce9fd$var$getValue(object, key) {
    return object == null ? undefined : object[key];
}
/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */ function $024d14a53d6ce9fd$var$isHostObject(value) {
    // Many host objects are `Object` objects that can coerce to strings
    // despite having improperly defined `toString` methods.
    var result = false;
    if (value != null && typeof value.toString != "function") try {
        result = !!(value + "");
    } catch (e) {}
    return result;
}
/** Used for built-in method references. */ var $024d14a53d6ce9fd$var$arrayProto = Array.prototype, $024d14a53d6ce9fd$var$funcProto = Function.prototype, $024d14a53d6ce9fd$var$objectProto = Object.prototype;
/** Used to detect overreaching core-js shims. */ var $024d14a53d6ce9fd$var$coreJsData = $024d14a53d6ce9fd$var$root["__core-js_shared__"];
/** Used to detect methods masquerading as native. */ var $024d14a53d6ce9fd$var$maskSrcKey = function() {
    var uid = /[^.]+$/.exec($024d14a53d6ce9fd$var$coreJsData && $024d14a53d6ce9fd$var$coreJsData.keys && $024d14a53d6ce9fd$var$coreJsData.keys.IE_PROTO || "");
    return uid ? "Symbol(src)_1." + uid : "";
}();
/** Used to resolve the decompiled source of functions. */ var $024d14a53d6ce9fd$var$funcToString = $024d14a53d6ce9fd$var$funcProto.toString;
/** Used to check objects for own properties. */ var $024d14a53d6ce9fd$var$hasOwnProperty = $024d14a53d6ce9fd$var$objectProto.hasOwnProperty;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */ var $024d14a53d6ce9fd$var$objectToString = $024d14a53d6ce9fd$var$objectProto.toString;
/** Used to detect if a method is native. */ var $024d14a53d6ce9fd$var$reIsNative = RegExp("^" + $024d14a53d6ce9fd$var$funcToString.call($024d14a53d6ce9fd$var$hasOwnProperty).replace($024d14a53d6ce9fd$var$reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
/** Built-in value references. */ var $024d14a53d6ce9fd$var$Symbol = $024d14a53d6ce9fd$var$root.Symbol, $024d14a53d6ce9fd$var$splice = $024d14a53d6ce9fd$var$arrayProto.splice;
/* Built-in method references that are verified to be native. */ var $024d14a53d6ce9fd$var$Map = $024d14a53d6ce9fd$var$getNative($024d14a53d6ce9fd$var$root, "Map"), $024d14a53d6ce9fd$var$nativeCreate = $024d14a53d6ce9fd$var$getNative(Object, "create");
/** Used to convert symbols to primitives and strings. */ var $024d14a53d6ce9fd$var$symbolProto = $024d14a53d6ce9fd$var$Symbol ? $024d14a53d6ce9fd$var$Symbol.prototype : undefined, $024d14a53d6ce9fd$var$symbolToString = $024d14a53d6ce9fd$var$symbolProto ? $024d14a53d6ce9fd$var$symbolProto.toString : undefined;
/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */ function $024d14a53d6ce9fd$var$Hash(entries) {
    var index = -1, length = entries ? entries.length : 0;
    this.clear();
    while(++index < length){
        var entry = entries[index];
        this.set(entry[0], entry[1]);
    }
}
/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */ function $024d14a53d6ce9fd$var$hashClear() {
    this.__data__ = $024d14a53d6ce9fd$var$nativeCreate ? $024d14a53d6ce9fd$var$nativeCreate(null) : {};
}
/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */ function $024d14a53d6ce9fd$var$hashDelete(key) {
    return this.has(key) && delete this.__data__[key];
}
/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */ function $024d14a53d6ce9fd$var$hashGet(key) {
    var data = this.__data__;
    if ($024d14a53d6ce9fd$var$nativeCreate) {
        var result = data[key];
        return result === $024d14a53d6ce9fd$var$HASH_UNDEFINED ? undefined : result;
    }
    return $024d14a53d6ce9fd$var$hasOwnProperty.call(data, key) ? data[key] : undefined;
}
/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */ function $024d14a53d6ce9fd$var$hashHas(key) {
    var data = this.__data__;
    return $024d14a53d6ce9fd$var$nativeCreate ? data[key] !== undefined : $024d14a53d6ce9fd$var$hasOwnProperty.call(data, key);
}
/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */ function $024d14a53d6ce9fd$var$hashSet(key, value) {
    var data = this.__data__;
    data[key] = $024d14a53d6ce9fd$var$nativeCreate && value === undefined ? $024d14a53d6ce9fd$var$HASH_UNDEFINED : value;
    return this;
}
// Add methods to `Hash`.
$024d14a53d6ce9fd$var$Hash.prototype.clear = $024d14a53d6ce9fd$var$hashClear;
$024d14a53d6ce9fd$var$Hash.prototype["delete"] = $024d14a53d6ce9fd$var$hashDelete;
$024d14a53d6ce9fd$var$Hash.prototype.get = $024d14a53d6ce9fd$var$hashGet;
$024d14a53d6ce9fd$var$Hash.prototype.has = $024d14a53d6ce9fd$var$hashHas;
$024d14a53d6ce9fd$var$Hash.prototype.set = $024d14a53d6ce9fd$var$hashSet;
/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */ function $024d14a53d6ce9fd$var$ListCache(entries) {
    var index = -1, length = entries ? entries.length : 0;
    this.clear();
    while(++index < length){
        var entry = entries[index];
        this.set(entry[0], entry[1]);
    }
}
/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */ function $024d14a53d6ce9fd$var$listCacheClear() {
    this.__data__ = [];
}
/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */ function $024d14a53d6ce9fd$var$listCacheDelete(key) {
    var data = this.__data__, index = $024d14a53d6ce9fd$var$assocIndexOf(data, key);
    if (index < 0) return false;
    var lastIndex = data.length - 1;
    if (index == lastIndex) data.pop();
    else $024d14a53d6ce9fd$var$splice.call(data, index, 1);
    return true;
}
/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */ function $024d14a53d6ce9fd$var$listCacheGet(key) {
    var data = this.__data__, index = $024d14a53d6ce9fd$var$assocIndexOf(data, key);
    return index < 0 ? undefined : data[index][1];
}
/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */ function $024d14a53d6ce9fd$var$listCacheHas(key) {
    return $024d14a53d6ce9fd$var$assocIndexOf(this.__data__, key) > -1;
}
/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */ function $024d14a53d6ce9fd$var$listCacheSet(key, value) {
    var data = this.__data__, index = $024d14a53d6ce9fd$var$assocIndexOf(data, key);
    if (index < 0) data.push([
        key,
        value
    ]);
    else data[index][1] = value;
    return this;
}
// Add methods to `ListCache`.
$024d14a53d6ce9fd$var$ListCache.prototype.clear = $024d14a53d6ce9fd$var$listCacheClear;
$024d14a53d6ce9fd$var$ListCache.prototype["delete"] = $024d14a53d6ce9fd$var$listCacheDelete;
$024d14a53d6ce9fd$var$ListCache.prototype.get = $024d14a53d6ce9fd$var$listCacheGet;
$024d14a53d6ce9fd$var$ListCache.prototype.has = $024d14a53d6ce9fd$var$listCacheHas;
$024d14a53d6ce9fd$var$ListCache.prototype.set = $024d14a53d6ce9fd$var$listCacheSet;
/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */ function $024d14a53d6ce9fd$var$MapCache(entries) {
    var index = -1, length = entries ? entries.length : 0;
    this.clear();
    while(++index < length){
        var entry = entries[index];
        this.set(entry[0], entry[1]);
    }
}
/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */ function $024d14a53d6ce9fd$var$mapCacheClear() {
    this.__data__ = {
        "hash": new $024d14a53d6ce9fd$var$Hash,
        "map": new ($024d14a53d6ce9fd$var$Map || $024d14a53d6ce9fd$var$ListCache),
        "string": new $024d14a53d6ce9fd$var$Hash
    };
}
/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */ function $024d14a53d6ce9fd$var$mapCacheDelete(key) {
    return $024d14a53d6ce9fd$var$getMapData(this, key)["delete"](key);
}
/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */ function $024d14a53d6ce9fd$var$mapCacheGet(key) {
    return $024d14a53d6ce9fd$var$getMapData(this, key).get(key);
}
/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */ function $024d14a53d6ce9fd$var$mapCacheHas(key) {
    return $024d14a53d6ce9fd$var$getMapData(this, key).has(key);
}
/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */ function $024d14a53d6ce9fd$var$mapCacheSet(key, value) {
    $024d14a53d6ce9fd$var$getMapData(this, key).set(key, value);
    return this;
}
// Add methods to `MapCache`.
$024d14a53d6ce9fd$var$MapCache.prototype.clear = $024d14a53d6ce9fd$var$mapCacheClear;
$024d14a53d6ce9fd$var$MapCache.prototype["delete"] = $024d14a53d6ce9fd$var$mapCacheDelete;
$024d14a53d6ce9fd$var$MapCache.prototype.get = $024d14a53d6ce9fd$var$mapCacheGet;
$024d14a53d6ce9fd$var$MapCache.prototype.has = $024d14a53d6ce9fd$var$mapCacheHas;
$024d14a53d6ce9fd$var$MapCache.prototype.set = $024d14a53d6ce9fd$var$mapCacheSet;
/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */ function $024d14a53d6ce9fd$var$assocIndexOf(array, key) {
    var length = array.length;
    while(length--){
        if ($024d14a53d6ce9fd$var$eq(array[length][0], key)) return length;
    }
    return -1;
}
/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */ function $024d14a53d6ce9fd$var$baseGet(object, path) {
    path = $024d14a53d6ce9fd$var$isKey(path, object) ? [
        path
    ] : $024d14a53d6ce9fd$var$castPath(path);
    var index = 0, length = path.length;
    while(object != null && index < length)object = object[$024d14a53d6ce9fd$var$toKey(path[index++])];
    return index && index == length ? object : undefined;
}
/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */ function $024d14a53d6ce9fd$var$baseIsNative(value) {
    if (!$024d14a53d6ce9fd$var$isObject(value) || $024d14a53d6ce9fd$var$isMasked(value)) return false;
    var pattern = $024d14a53d6ce9fd$var$isFunction(value) || $024d14a53d6ce9fd$var$isHostObject(value) ? $024d14a53d6ce9fd$var$reIsNative : $024d14a53d6ce9fd$var$reIsHostCtor;
    return pattern.test($024d14a53d6ce9fd$var$toSource(value));
}
/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */ function $024d14a53d6ce9fd$var$baseToString(value) {
    // Exit early for strings to avoid a performance hit in some environments.
    if (typeof value == "string") return value;
    if ($024d14a53d6ce9fd$var$isSymbol(value)) return $024d14a53d6ce9fd$var$symbolToString ? $024d14a53d6ce9fd$var$symbolToString.call(value) : "";
    var result = value + "";
    return result == "0" && 1 / value == -$024d14a53d6ce9fd$var$INFINITY ? "-0" : result;
}
/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */ function $024d14a53d6ce9fd$var$castPath(value) {
    return $024d14a53d6ce9fd$var$isArray(value) ? value : $024d14a53d6ce9fd$var$stringToPath(value);
}
/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */ function $024d14a53d6ce9fd$var$getMapData(map, key) {
    var data = map.__data__;
    return $024d14a53d6ce9fd$var$isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */ function $024d14a53d6ce9fd$var$getNative(object, key) {
    var value = $024d14a53d6ce9fd$var$getValue(object, key);
    return $024d14a53d6ce9fd$var$baseIsNative(value) ? value : undefined;
}
/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */ function $024d14a53d6ce9fd$var$isKey(value, object) {
    if ($024d14a53d6ce9fd$var$isArray(value)) return false;
    var type = typeof value;
    if (type == "number" || type == "symbol" || type == "boolean" || value == null || $024d14a53d6ce9fd$var$isSymbol(value)) return true;
    return $024d14a53d6ce9fd$var$reIsPlainProp.test(value) || !$024d14a53d6ce9fd$var$reIsDeepProp.test(value) || object != null && value in Object(object);
}
/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */ function $024d14a53d6ce9fd$var$isKeyable(value) {
    var type = typeof value;
    return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */ function $024d14a53d6ce9fd$var$isMasked(func) {
    return !!$024d14a53d6ce9fd$var$maskSrcKey && $024d14a53d6ce9fd$var$maskSrcKey in func;
}
/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */ var $024d14a53d6ce9fd$var$stringToPath = $024d14a53d6ce9fd$var$memoize(function(string) {
    string = $024d14a53d6ce9fd$var$toString(string);
    var result = [];
    if ($024d14a53d6ce9fd$var$reLeadingDot.test(string)) result.push("");
    string.replace($024d14a53d6ce9fd$var$rePropName, function(match, number, quote, string) {
        result.push(quote ? string.replace($024d14a53d6ce9fd$var$reEscapeChar, "$1") : number || match);
    });
    return result;
});
/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */ function $024d14a53d6ce9fd$var$toKey(value) {
    if (typeof value == "string" || $024d14a53d6ce9fd$var$isSymbol(value)) return value;
    var result = value + "";
    return result == "0" && 1 / value == -$024d14a53d6ce9fd$var$INFINITY ? "-0" : result;
}
/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */ function $024d14a53d6ce9fd$var$toSource(func) {
    if (func != null) {
        try {
            return $024d14a53d6ce9fd$var$funcToString.call(func);
        } catch (e) {}
        try {
            return func + "";
        } catch (e) {}
    }
    return "";
}
/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */ function $024d14a53d6ce9fd$var$memoize(func, resolver) {
    if (typeof func != "function" || resolver && typeof resolver != "function") throw new TypeError($024d14a53d6ce9fd$var$FUNC_ERROR_TEXT);
    var memoized = function() {
        var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
        if (cache.has(key)) return cache.get(key);
        var result = func.apply(this, args);
        memoized.cache = cache.set(key, result);
        return result;
    };
    memoized.cache = new ($024d14a53d6ce9fd$var$memoize.Cache || $024d14a53d6ce9fd$var$MapCache);
    return memoized;
}
// Assign cache to `_.memoize`.
$024d14a53d6ce9fd$var$memoize.Cache = $024d14a53d6ce9fd$var$MapCache;
/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */ function $024d14a53d6ce9fd$var$eq(value, other) {
    return value === other || value !== value && other !== other;
}
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */ var $024d14a53d6ce9fd$var$isArray = Array.isArray;
/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */ function $024d14a53d6ce9fd$var$isFunction(value) {
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 8-9 which returns 'object' for typed array and other constructors.
    var tag = $024d14a53d6ce9fd$var$isObject(value) ? $024d14a53d6ce9fd$var$objectToString.call(value) : "";
    return tag == $024d14a53d6ce9fd$var$funcTag || tag == $024d14a53d6ce9fd$var$genTag;
}
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */ function $024d14a53d6ce9fd$var$isObject(value) {
    var type = typeof value;
    return !!value && (type == "object" || type == "function");
}
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */ function $024d14a53d6ce9fd$var$isObjectLike(value) {
    return !!value && typeof value == "object";
}
/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */ function $024d14a53d6ce9fd$var$isSymbol(value) {
    return typeof value == "symbol" || $024d14a53d6ce9fd$var$isObjectLike(value) && $024d14a53d6ce9fd$var$objectToString.call(value) == $024d14a53d6ce9fd$var$symbolTag;
}
/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */ function $024d14a53d6ce9fd$var$toString(value) {
    return value == null ? "" : $024d14a53d6ce9fd$var$baseToString(value);
}
/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */ function $024d14a53d6ce9fd$var$get(object, path, defaultValue) {
    var result = object == null ? undefined : $024d14a53d6ce9fd$var$baseGet(object, path);
    return result === undefined ? defaultValue : result;
}
module.exports = $024d14a53d6ce9fd$var$get;

});


parcelRegister("5OYrM", function(module, exports) {

$parcel$export(module.exports, "cssDimension", () => $e97d39c9eeea8f30$export$8332787d62a8b259);

var $bjM6F = parcelRequire("bjM6F");
const $e97d39c9eeea8f30$export$8332787d62a8b259 = (cur, mode, editor)=>{
    const dim = (0, $bjM6F.responsiveVal)(cur, "dim", mode, {
        h: "fit",
        w: "fit"
    });
    if (dim.w === "full" && dim.h === "full") return `
      width:100%;
      height:100%;
      flex:1;
    `;
    return cx(dim.w === "fit" && `
        & > .txt-box > * {
          white-space: nowrap !important;
        }
      `, dim.w === "full" && `
        width: 100%;
      `, dim.w && typeof dim.w === "number" && dim.w >= 0 && `
        width: ${dim.w}${dim.wUnit || "px"};
        overflow-x: clip;
      `, dim.h === "full" && `
        height: ${editor ? "100%" : "100" + (cur.type === "section" ? mode === "mobile" ? "vh" : "vh" : "%")};
        margin-bottom: auto;
      `, dim.h && typeof dim.h === "number" && dim.h >= 0 && `
        height: ${dim.h}${dim.hUnit || "px"};
        overflow-y: clip;
      `);
};

});

parcelRegister("hP8yR", function(module, exports) {

$parcel$export(module.exports, "cssEditor", () => $030198a0121d3861$export$e95d45482966d82e);
const $030198a0121d3861$export$e95d45482966d82e = ({ item: item, hover: hover, active: active })=>{
    return cx(hover && css`
        & {
          box-shadow: inset 0 0 0px 3px #bae3fd;
          > img {
            opacity: 0.6;
          }
        }
      `, active && css`
        box-shadow: inset 0 0 0px 2px #009cff !important;
        > img {
          opacity: 0.6;
        }
      `);
};

});

parcelRegister("7aIlQ", function(module, exports) {

$parcel$export(module.exports, "cssFont", () => $fcd82c898ee5312d$export$d123feaf05ec1c83);

var $bjM6F = parcelRequire("bjM6F");
const $fcd82c898ee5312d$export$47010e6cb2852826 = window;
const $fcd82c898ee5312d$export$d123feaf05ec1c83 = (cur, mode)=>{
    const font = (0, $bjM6F.responsiveVal)(cur, "font", mode, {});
    if (font.family) {
        if (!$fcd82c898ee5312d$export$47010e6cb2852826.loadedFonts) $fcd82c898ee5312d$export$47010e6cb2852826.loadedFonts = [];
        const weight = `:wght@${[
            300,
            400,
            500,
            600
        ].join(";")}`;
        const fontName = font.family.replace(/ /g, "+");
        if ($fcd82c898ee5312d$export$47010e6cb2852826.loadedFonts.indexOf(font.family) < 0) {
            $fcd82c898ee5312d$export$47010e6cb2852826.loadedFonts.push(font.family);
            const doc = document;
            const _href = `https://fonts.googleapis.com/css2?family=${fontName}${weight}&display=block`;
            if (!doc.querySelector(`link[href="${_href}]`)) {
                const link = doc.createElement("link");
                link.type = "text/css";
                link.rel = "stylesheet";
                link.href = _href;
                doc.head.appendChild(link);
            }
        }
    }
    if (!font.family && $fcd82c898ee5312d$export$47010e6cb2852826.defaultFont) font.family = $fcd82c898ee5312d$export$47010e6cb2852826.defaultFont;
    return cx(font.color && `
        color: ${font.color};
      `, `
      word-break: ${font.whitespace === "whitespace-normal" ? "break-word" : "normal"};
    `, font.color && `
        color: ${font.color};
      `, `
      text-align: ${font.align ? font.align : "left"};
    `, font.size && `
        font-size: ${font.size || 15}px;
      `, font.height && `
        line-height: ${font.height === "auto" ? "normal" : `${font.height}%`};
      `, font.family && `
        font-family: ${font.family};
      `);
};

});

parcelRegister("8DV5m", function(module, exports) {

$parcel$export(module.exports, "cssLayout", () => $d5c91ba13c38aefc$export$5c677b0cb632cad);

var $bjM6F = parcelRequire("bjM6F");
const $d5c91ba13c38aefc$export$5c677b0cb632cad = (cur, mode)=>{
    const result = [];
    let layout = (0, $bjM6F.responsiveVal)(cur, "layout", mode, {
        dir: "col",
        align: "top-left",
        gap: 0,
        wrap: undefined
    });
    if (layout) {
        if (layout.wrap) result.push(layout.wrap === "flex-wrap" ? "flex-wrap: wrap;" : "flex-wrap: nowrap;");
        if (layout.dir.startsWith("col")) {
            if (layout.dir === "col") result.push("flex-direction: column;");
            else if (layout.dir === "col-reverse") result.push("flex-direction: column-reverse;");
            if (layout.gap === "auto") {
                if (layout.align === "left") result.push("align-items:start; justify-content: space-between;");
                if (layout.align === "center") result.push("align-items:center; justify-content: space-between;");
                if (layout.align === "right") result.push("align-items:end; justify-content: space-between;");
            } else {
                result.push(`gap: ${layout.gap}px;`);
                if (layout.align === "top-left") result.push("align-items:start; justify-content: start;");
                if (layout.align === "top-center") result.push("align-items:center; justify-content: start;");
                if (layout.align === "top-right") result.push("align-items:end; justify-content: start;");
                if (layout.align === "left") result.push("align-items:start; justify-content: center;");
                if (layout.align === "center") result.push("align-items:center; justify-content: center;");
                if (layout.align === "right") result.push("align-items:end; justify-content: center;");
                if (layout.align === "bottom-left") result.push("align-items:start; justify-content: end;");
                if (layout.align === "bottom-center") result.push("align-items:center; justify-content: end;");
                if (layout.align === "bottom-right") result.push("align-items:end; justify-content: end;");
            }
        } else {
            if (layout.dir === "row") result.push("flex-direction: row;");
            else if (layout.dir === "row-reverse") result.push("flex-direction: row-reverse;");
            if (layout.gap === "auto") {
                if (layout.align === "top") result.push("align-items:start; justify-content: space-between;");
                if (layout.align === "center") result.push("align-items:center; justify-content: space-between;");
                if (layout.align === "bottom") result.push("align-items:end; justify-content: space-between;");
            } else {
                result.push(`
            gap: ${layout.gap}px;
          `);
                if (layout.align === "top-left") result.push("align-items:start; justify-content: start;");
                if (layout.align === "top-center") result.push("align-items:start; justify-content: center;");
                if (layout.align === "top-right") result.push("align-items:start; justify-content: end;");
                if (layout.align === "left") result.push("align-items:center; justify-content: start;");
                if (layout.align === "center") result.push("align-items:center; justify-content: center;");
                if (layout.align === "right") result.push("align-items:center; justify-content: end;");
                if (layout.align === "bottom-left") result.push("align-items:end; justify-content: start;");
                if (layout.align === "bottom-center") result.push("align-items:end; justify-content: center;");
                if (layout.align === "bottom-right") result.push("align-items:end; justify-content: end;");
            }
        }
    } else return "flex-direction:column; align-items:start; justify-content: start;";
    return result.join("\n	").trim();
};

});

parcelRegister("kXTha", function(module, exports) {

$parcel$export(module.exports, "cssPadding", () => $ed2a90866c5a1750$export$e9df5348ba4716b1);

var $bjM6F = parcelRequire("bjM6F");
const $ed2a90866c5a1750$export$e9df5348ba4716b1 = (cur, mode)=>{
    const padding = (0, $bjM6F.responsiveVal)(cur, "padding", mode, {
        l: 0,
        b: 0,
        t: 0,
        r: 0
    });
    return cx(padding.l !== undefined && `
        padding-left: ${padding.l}px;
      `, padding.r !== undefined && `
        padding-right: ${padding.r}px;
      `, padding.b !== undefined && `
        padding-bottom: ${padding.b}px;
      `, padding.t !== undefined && `
        padding-top: ${padding.t}px; 
      `);
};

});


parcelRegister("aVHaH", function(module, exports) {

$parcel$export(module.exports, "Doc", () => $52a83e33f2b9e935$export$bceacc74c2212615);
$parcel$export(module.exports, "Array", () => $52a83e33f2b9e935$export$c4be6576ca6fe4aa);
$parcel$export(module.exports, "Text", () => $52a83e33f2b9e935$export$5f1af8db9871e1d6);
$parcel$export(module.exports, "Map", () => $52a83e33f2b9e935$export$a5c7b93649eaf8f8);
$parcel$export(module.exports, "applyUpdate", () => $52a83e33f2b9e935$export$c271737a9c02e925);
$parcel$export(module.exports, "encodeStateAsUpdate", () => $52a83e33f2b9e935$export$e5848df80e65bd53);
$parcel$export(module.exports, "encodeStateVector", () => $52a83e33f2b9e935$export$3e2f5393f32e71f);

var $9XqiC = parcelRequire("9XqiC");

var $7sfdv = parcelRequire("7sfdv");

var $kuitL = parcelRequire("kuitL");

var $e6DQe = parcelRequire("e6DQe");

var $1p1sv = parcelRequire("1p1sv");

var $f5RS8 = parcelRequire("f5RS8");

var $TGOcE = parcelRequire("TGOcE");

var $jKNqA = parcelRequire("jKNqA");

var $lB8LX = parcelRequire("lB8LX");

var $akmFO = parcelRequire("akmFO");

var $1GdQd = parcelRequire("1GdQd");

var $kXTKb = parcelRequire("kXTKb");

var $gB6ZU = parcelRequire("gB6ZU");

var $dcfNU = parcelRequire("dcfNU");
var $7i7Pw = parcelRequire("7i7Pw");

var $1oyOX = parcelRequire("1oyOX");

var $6rcMi = parcelRequire("6rcMi");

var $aP2RX = parcelRequire("aP2RX");

var $97qUn = parcelRequire("97qUn");
/**
 * This is an abstract interface that all Connectors should implement to keep them interchangeable.
 *
 * @note This interface is experimental and it is not advised to actually inherit this class.
 *       It just serves as typing information.
 *
 * @extends {Observable<any>}
 */ class $52a83e33f2b9e935$export$c3faceeb92aa39dd extends (0, $9XqiC.Observable) {
    /**
   * @param {Doc} ydoc
   * @param {any} awareness
   */ constructor(ydoc, awareness){
        super();
        this.doc = ydoc;
        this.awareness = awareness;
    }
}
class $52a83e33f2b9e935$var$DeleteItem {
    /**
   * @param {number} clock
   * @param {number} len
   */ constructor(clock, len){
        /**
     * @type {number}
     */ this.clock = clock;
        /**
     * @type {number}
     */ this.len = len;
    }
}
/**
 * We no longer maintain a DeleteStore. DeleteSet is a temporary object that is created when needed.
 * - When created in a transaction, it must only be accessed after sorting, and merging
 *   - This DeleteSet is send to other clients
 * - We do not create a DeleteSet when we send a sync message. The DeleteSet message is created directly from StructStore
 * - We read a DeleteSet as part of a sync/update message. In this case the DeleteSet is already sorted and merged.
 */ class $52a83e33f2b9e935$var$DeleteSet {
    constructor(){
        /**
     * @type {Map<number,Array<DeleteItem>>}
     */ this.clients = new Map();
    }
}
/**
 * Iterate over all structs that the DeleteSet gc's.
 *
 * @param {Transaction} transaction
 * @param {DeleteSet} ds
 * @param {function(GC|Item):void} f
 *
 * @function
 */ const $52a83e33f2b9e935$export$8afefebbaf4e4c78 = (transaction, ds, f)=>ds.clients.forEach((deletes, clientid)=>{
        const structs = /** @type {Array<GC|Item>} */ transaction.doc.store.clients.get(clientid);
        for(let i = 0; i < deletes.length; i++){
            const del = deletes[i];
            $52a83e33f2b9e935$var$iterateStructs(transaction, structs, del.clock, del.len, f);
        }
    });
/**
 * @param {Array<DeleteItem>} dis
 * @param {number} clock
 * @return {number|null}
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$findIndexDS = (dis, clock)=>{
    let left = 0;
    let right = dis.length - 1;
    while(left <= right){
        const midindex = $kuitL.floor((left + right) / 2);
        const mid = dis[midindex];
        const midclock = mid.clock;
        if (midclock <= clock) {
            if (clock < midclock + mid.len) return midindex;
            left = midindex + 1;
        } else right = midindex - 1;
    }
    return null;
};
/**
 * @param {DeleteSet} ds
 * @param {ID} id
 * @return {boolean}
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$export$dcb04af092e44fde = (ds, id)=>{
    const dis = ds.clients.get(id.client);
    return dis !== undefined && $52a83e33f2b9e935$var$findIndexDS(dis, id.clock) !== null;
};
/**
 * @param {DeleteSet} ds
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$sortAndMergeDeleteSet = (ds)=>{
    ds.clients.forEach((dels)=>{
        dels.sort((a, b)=>a.clock - b.clock);
        // merge items without filtering or splicing the array
        // i is the current pointer
        // j refers to the current insert position for the pointed item
        // try to merge dels[i] into dels[j-1] or set dels[j]=dels[i]
        let i, j;
        for(i = 1, j = 1; i < dels.length; i++){
            const left = dels[j - 1];
            const right = dels[i];
            if (left.clock + left.len >= right.clock) left.len = $kuitL.max(left.len, right.clock + right.len - left.clock);
            else {
                if (j < i) dels[j] = right;
                j++;
            }
        }
        dels.length = j;
    });
};
/**
 * @param {Array<DeleteSet>} dss
 * @return {DeleteSet} A fresh DeleteSet
 */ const $52a83e33f2b9e935$var$mergeDeleteSets = (dss)=>{
    const merged = new $52a83e33f2b9e935$var$DeleteSet();
    for(let dssI = 0; dssI < dss.length; dssI++)dss[dssI].clients.forEach((delsLeft, client)=>{
        if (!merged.clients.has(client)) {
            // Write all missing keys from current ds and all following.
            // If merged already contains `client` current ds has already been added.
            /**
         * @type {Array<DeleteItem>}
         */ const dels = delsLeft.slice();
            for(let i = dssI + 1; i < dss.length; i++)$7sfdv.appendTo(dels, dss[i].clients.get(client) || []);
            merged.clients.set(client, dels);
        }
    });
    $52a83e33f2b9e935$var$sortAndMergeDeleteSet(merged);
    return merged;
};
/**
 * @param {DeleteSet} ds
 * @param {number} client
 * @param {number} clock
 * @param {number} length
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$addToDeleteSet = (ds, client, clock, length)=>{
    $e6DQe.setIfUndefined(ds.clients, client, ()=>/** @type {Array<DeleteItem>} */ []).push(new $52a83e33f2b9e935$var$DeleteItem(clock, length));
};
const $52a83e33f2b9e935$export$8cbac0d946238699 = ()=>new $52a83e33f2b9e935$var$DeleteSet();
/**
 * @param {StructStore} ss
 * @return {DeleteSet} Merged and sorted DeleteSet
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$export$8450d668bec558e2 = (ss)=>{
    const ds = $52a83e33f2b9e935$export$8cbac0d946238699();
    ss.clients.forEach((structs, client)=>{
        /**
     * @type {Array<DeleteItem>}
     */ const dsitems = [];
        for(let i = 0; i < structs.length; i++){
            const struct = structs[i];
            if (struct.deleted) {
                const clock = struct.id.clock;
                let len = struct.length;
                if (i + 1 < structs.length) for(let next = structs[i + 1]; i + 1 < structs.length && next.deleted; next = structs[++i + 1])len += next.length;
                dsitems.push(new $52a83e33f2b9e935$var$DeleteItem(clock, len));
            }
        }
        if (dsitems.length > 0) ds.clients.set(client, dsitems);
    });
    return ds;
};
/**
 * @param {DSEncoderV1 | DSEncoderV2} encoder
 * @param {DeleteSet} ds
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$writeDeleteSet = (encoder, ds)=>{
    $1p1sv.writeVarUint(encoder.restEncoder, ds.clients.size);
    // Ensure that the delete set is written in a deterministic order
    $7sfdv.from(ds.clients.entries()).sort((a, b)=>b[0] - a[0]).forEach(([client, dsitems])=>{
        encoder.resetDsCurVal();
        $1p1sv.writeVarUint(encoder.restEncoder, client);
        const len = dsitems.length;
        $1p1sv.writeVarUint(encoder.restEncoder, len);
        for(let i = 0; i < len; i++){
            const item = dsitems[i];
            encoder.writeDsClock(item.clock);
            encoder.writeDsLen(item.len);
        }
    });
};
/**
 * @param {DSDecoderV1 | DSDecoderV2} decoder
 * @return {DeleteSet}
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$readDeleteSet = (decoder)=>{
    const ds = new $52a83e33f2b9e935$var$DeleteSet();
    const numClients = $f5RS8.readVarUint(decoder.restDecoder);
    for(let i = 0; i < numClients; i++){
        decoder.resetDsCurVal();
        const client = $f5RS8.readVarUint(decoder.restDecoder);
        const numberOfDeletes = $f5RS8.readVarUint(decoder.restDecoder);
        if (numberOfDeletes > 0) {
            const dsField = $e6DQe.setIfUndefined(ds.clients, client, ()=>/** @type {Array<DeleteItem>} */ []);
            for(let i = 0; i < numberOfDeletes; i++)dsField.push(new $52a83e33f2b9e935$var$DeleteItem(decoder.readDsClock(), decoder.readDsLen()));
        }
    }
    return ds;
};
/**
 * @todo YDecoder also contains references to String and other Decoders. Would make sense to exchange YDecoder.toUint8Array for YDecoder.DsToUint8Array()..
 */ /**
 * @param {DSDecoderV1 | DSDecoderV2} decoder
 * @param {Transaction} transaction
 * @param {StructStore} store
 * @return {Uint8Array|null} Returns a v2 update containing all deletes that couldn't be applied yet; or null if all deletes were applied successfully.
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$readAndApplyDeleteSet = (decoder, transaction, store)=>{
    const unappliedDS = new $52a83e33f2b9e935$var$DeleteSet();
    const numClients = $f5RS8.readVarUint(decoder.restDecoder);
    for(let i = 0; i < numClients; i++){
        decoder.resetDsCurVal();
        const client = $f5RS8.readVarUint(decoder.restDecoder);
        const numberOfDeletes = $f5RS8.readVarUint(decoder.restDecoder);
        const structs = store.clients.get(client) || [];
        const state = $52a83e33f2b9e935$export$50fdfeece43146fd(store, client);
        for(let i = 0; i < numberOfDeletes; i++){
            const clock = decoder.readDsClock();
            const clockEnd = clock + decoder.readDsLen();
            if (clock < state) {
                if (state < clockEnd) $52a83e33f2b9e935$var$addToDeleteSet(unappliedDS, client, state, clockEnd - state);
                let index = $52a83e33f2b9e935$export$5f8f02523cf47b58(structs, clock);
                /**
         * We can ignore the case of GC and Delete structs, because we are going to skip them
         * @type {Item}
         */ // @ts-ignore
                let struct = structs[index];
                // split the first item if necessary
                if (!struct.deleted && struct.id.clock < clock) {
                    structs.splice(index + 1, 0, $52a83e33f2b9e935$var$splitItem(transaction, struct, clock - struct.id.clock));
                    index++; // increase we now want to use the next struct
                }
                while(index < structs.length){
                    // @ts-ignore
                    struct = structs[index++];
                    if (struct.id.clock < clockEnd) {
                        if (!struct.deleted) {
                            if (clockEnd < struct.id.clock + struct.length) structs.splice(index, 0, $52a83e33f2b9e935$var$splitItem(transaction, struct, clockEnd - struct.id.clock));
                            struct.delete(transaction);
                        }
                    } else break;
                }
            } else $52a83e33f2b9e935$var$addToDeleteSet(unappliedDS, client, clock, clockEnd - clock);
        }
    }
    if (unappliedDS.clients.size > 0) {
        const ds = new $52a83e33f2b9e935$var$UpdateEncoderV2();
        $1p1sv.writeVarUint(ds.restEncoder, 0); // encode 0 structs
        $52a83e33f2b9e935$var$writeDeleteSet(ds, unappliedDS);
        return ds.toUint8Array();
    }
    return null;
};
/**
 * @param {DeleteSet} ds1
 * @param {DeleteSet} ds2
 */ const $52a83e33f2b9e935$export$9697b72c46fd3a5d = (ds1, ds2)=>{
    if (ds1.clients.size !== ds2.clients.size) return false;
    for (const [client, deleteItems1] of ds1.clients.entries()){
        const deleteItems2 = /** @type {Array<import('../internals.js').DeleteItem>} */ ds2.clients.get(client);
        if (deleteItems2 === undefined || deleteItems1.length !== deleteItems2.length) return false;
        for(let i = 0; i < deleteItems1.length; i++){
            const di1 = deleteItems1[i];
            const di2 = deleteItems2[i];
            if (di1.clock !== di2.clock || di1.len !== di2.len) return false;
        }
    }
    return true;
};
/**
 * @module Y
 */ const $52a83e33f2b9e935$var$generateNewClientId = $TGOcE.uint32;
/**
 * @typedef {Object} DocOpts
 * @property {boolean} [DocOpts.gc=true] Disable garbage collection (default: gc=true)
 * @property {function(Item):boolean} [DocOpts.gcFilter] Will be called before an Item is garbage collected. Return false to keep the Item.
 * @property {string} [DocOpts.guid] Define a globally unique identifier for this document
 * @property {string | null} [DocOpts.collectionid] Associate this document with a collection. This only plays a role if your provider has a concept of collection.
 * @property {any} [DocOpts.meta] Any kind of meta information you want to associate with this document. If this is a subdocument, remote peers will store the meta information as well.
 * @property {boolean} [DocOpts.autoLoad] If a subdocument, automatically load document. If this is a subdocument, remote peers will load the document as well automatically.
 * @property {boolean} [DocOpts.shouldLoad] Whether the document should be synced by the provider now. This is toggled to true when you call ydoc.load()
 */ /**
 * A Yjs instance handles the state of shared data.
 * @extends Observable<string>
 */ class $52a83e33f2b9e935$export$bceacc74c2212615 extends (0, $9XqiC.Observable) {
    /**
   * @param {DocOpts} opts configuration
   */ constructor({ guid: guid = $TGOcE.uuidv4(), collectionid: collectionid = null, gc: gc = true, gcFilter: gcFilter = ()=>true, meta: meta = null, autoLoad: autoLoad = false, shouldLoad: shouldLoad = true } = {}){
        super();
        this.gc = gc;
        this.gcFilter = gcFilter;
        this.clientID = $52a83e33f2b9e935$var$generateNewClientId();
        this.guid = guid;
        this.collectionid = collectionid;
        /**
     * @type {Map<string, AbstractType<YEvent<any>>>}
     */ this.share = new Map();
        this.store = new $52a83e33f2b9e935$var$StructStore();
        /**
     * @type {Transaction | null}
     */ this._transaction = null;
        /**
     * @type {Array<Transaction>}
     */ this._transactionCleanups = [];
        /**
     * @type {Set<Doc>}
     */ this.subdocs = new Set();
        /**
     * If this document is a subdocument - a document integrated into another document - then _item is defined.
     * @type {Item?}
     */ this._item = null;
        this.shouldLoad = shouldLoad;
        this.autoLoad = autoLoad;
        this.meta = meta;
        /**
     * This is set to true when the persistence provider loaded the document from the database or when the `sync` event fires.
     * Note that not all providers implement this feature. Provider authors are encouraged to fire the `load` event when the doc content is loaded from the database.
     *
     * @type {boolean}
     */ this.isLoaded = false;
        /**
     * This is set to true when the connection provider has successfully synced with a backend.
     * Note that when using peer-to-peer providers this event may not provide very useful.
     * Also note that not all providers implement this feature. Provider authors are encouraged to fire
     * the `sync` event when the doc has been synced (with `true` as a parameter) or if connection is
     * lost (with false as a parameter).
     */ this.isSynced = false;
        /**
     * Promise that resolves once the document has been loaded from a presistence provider.
     */ this.whenLoaded = $jKNqA.create((resolve)=>{
            this.on("load", ()=>{
                this.isLoaded = true;
                resolve(this);
            });
        });
        const provideSyncedPromise = ()=>$jKNqA.create((resolve)=>{
                /**
       * @param {boolean} isSynced
       */ const eventHandler = (isSynced)=>{
                    if (isSynced === undefined || isSynced === true) {
                        this.off("sync", eventHandler);
                        resolve();
                    }
                };
                this.on("sync", eventHandler);
            });
        this.on("sync", (isSynced)=>{
            if (isSynced === false && this.isSynced) this.whenSynced = provideSyncedPromise();
            this.isSynced = isSynced === undefined || isSynced === true;
            if (!this.isLoaded) this.emit("load", []);
        });
        /**
     * Promise that resolves once the document has been synced with a backend.
     * This promise is recreated when the connection is lost.
     * Note the documentation about the `isSynced` property.
     */ this.whenSynced = provideSyncedPromise();
    }
    /**
   * Notify the parent document that you request to load data into this subdocument (if it is a subdocument).
   *
   * `load()` might be used in the future to request any provider to load the most current data.
   *
   * It is safe to call `load()` multiple times.
   */ load() {
        const item = this._item;
        if (item !== null && !this.shouldLoad) $52a83e33f2b9e935$export$dac1bad6146b2469(/** @type {any} */ item.parent.doc, (transaction)=>{
            transaction.subdocsLoaded.add(this);
        }, null, true);
        this.shouldLoad = true;
    }
    getSubdocs() {
        return this.subdocs;
    }
    getSubdocGuids() {
        return new Set($7sfdv.from(this.subdocs).map((doc)=>doc.guid));
    }
    /**
   * Changes that happen inside of a transaction are bundled. This means that
   * the observer fires _after_ the transaction is finished and that all changes
   * that happened inside of the transaction are sent as one message to the
   * other peers.
   *
   * @template T
   * @param {function(Transaction):T} f The function that should be executed as a transaction
   * @param {any} [origin] Origin of who started the transaction. Will be stored on transaction.origin
   * @return T
   *
   * @public
   */ transact(f, origin = null) {
        return $52a83e33f2b9e935$export$dac1bad6146b2469(this, f, origin);
    }
    /**
   * Define a shared data type.
   *
   * Multiple calls of `y.get(name, TypeConstructor)` yield the same result
   * and do not overwrite each other. I.e.
   * `y.define(name, Y.Array) === y.define(name, Y.Array)`
   *
   * After this method is called, the type is also available on `y.share.get(name)`.
   *
   * *Best Practices:*
   * Define all types right after the Yjs instance is created and store them in a separate object.
   * Also use the typed methods `getText(name)`, `getArray(name)`, ..
   *
   * @example
   *   const y = new Y(..)
   *   const appState = {
   *     document: y.getText('document')
   *     comments: y.getArray('comments')
   *   }
   *
   * @param {string} name
   * @param {Function} TypeConstructor The constructor of the type definition. E.g. Y.Text, Y.Array, Y.Map, ...
   * @return {AbstractType<any>} The created type. Constructed with TypeConstructor
   *
   * @public
   */ get(name, TypeConstructor = $52a83e33f2b9e935$export$c265dc8338484497) {
        const type = $e6DQe.setIfUndefined(this.share, name, ()=>{
            // @ts-ignore
            const t = new TypeConstructor();
            t._integrate(this, null);
            return t;
        });
        const Constr = type.constructor;
        if (TypeConstructor !== $52a83e33f2b9e935$export$c265dc8338484497 && Constr !== TypeConstructor) {
            if (Constr === $52a83e33f2b9e935$export$c265dc8338484497) {
                // @ts-ignore
                const t = new TypeConstructor();
                t._map = type._map;
                type._map.forEach(/** @param {Item?} n */ (n)=>{
                    for(; n !== null; n = n.left)// @ts-ignore
                    n.parent = t;
                });
                t._start = type._start;
                for(let n = t._start; n !== null; n = n.right)n.parent = t;
                t._length = type._length;
                this.share.set(name, t);
                t._integrate(this, null);
                return t;
            } else throw new Error(`Type with the name ${name} has already been defined with a different constructor`);
        }
        return type;
    }
    /**
   * @template T
   * @param {string} [name]
   * @return {YArray<T>}
   *
   * @public
   */ getArray(name = "") {
        // @ts-ignore
        return this.get(name, $52a83e33f2b9e935$export$c4be6576ca6fe4aa);
    }
    /**
   * @param {string} [name]
   * @return {YText}
   *
   * @public
   */ getText(name = "") {
        // @ts-ignore
        return this.get(name, $52a83e33f2b9e935$export$5f1af8db9871e1d6);
    }
    /**
   * @template T
   * @param {string} [name]
   * @return {YMap<T>}
   *
   * @public
   */ getMap(name = "") {
        // @ts-ignore
        return this.get(name, $52a83e33f2b9e935$export$a5c7b93649eaf8f8);
    }
    /**
   * @param {string} [name]
   * @return {YXmlFragment}
   *
   * @public
   */ getXmlFragment(name = "") {
        // @ts-ignore
        return this.get(name, $52a83e33f2b9e935$export$d5ce8c3e1731f1a7);
    }
    /**
   * Converts the entire document into a js object, recursively traversing each yjs type
   * Doesn't log types that have not been defined (using ydoc.getType(..)).
   *
   * @deprecated Do not use this method and rather call toJSON directly on the shared types.
   *
   * @return {Object<string, any>}
   */ toJSON() {
        /**
     * @type {Object<string, any>}
     */ const doc = {};
        this.share.forEach((value, key)=>{
            doc[key] = value.toJSON();
        });
        return doc;
    }
    /**
   * Emit `destroy` event and unregister all event handlers.
   */ destroy() {
        $7sfdv.from(this.subdocs).forEach((subdoc)=>subdoc.destroy());
        const item = this._item;
        if (item !== null) {
            this._item = null;
            const content = /** @type {ContentDoc} */ item.content;
            content.doc = new $52a83e33f2b9e935$export$bceacc74c2212615({
                guid: this.guid,
                ...content.opts,
                shouldLoad: false
            });
            content.doc._item = item;
            $52a83e33f2b9e935$export$dac1bad6146b2469(/** @type {any} */ item.parent.doc, (transaction)=>{
                const doc = content.doc;
                if (!item.deleted) transaction.subdocsAdded.add(doc);
                transaction.subdocsRemoved.add(this);
            }, null, true);
        }
        this.emit("destroyed", [
            true
        ]);
        this.emit("destroy", [
            this
        ]);
        super.destroy();
    }
    /**
   * @param {string} eventName
   * @param {function(...any):any} f
   */ on(eventName, f) {
        super.on(eventName, f);
    }
    /**
   * @param {string} eventName
   * @param {function} f
   */ off(eventName, f) {
        super.off(eventName, f);
    }
}
class $52a83e33f2b9e935$var$DSDecoderV1 {
    /**
   * @param {decoding.Decoder} decoder
   */ constructor(decoder){
        this.restDecoder = decoder;
    }
    resetDsCurVal() {
    // nop
    }
    /**
   * @return {number}
   */ readDsClock() {
        return $f5RS8.readVarUint(this.restDecoder);
    }
    /**
   * @return {number}
   */ readDsLen() {
        return $f5RS8.readVarUint(this.restDecoder);
    }
}
class $52a83e33f2b9e935$var$UpdateDecoderV1 extends $52a83e33f2b9e935$var$DSDecoderV1 {
    /**
   * @return {ID}
   */ readLeftID() {
        return $52a83e33f2b9e935$export$6c7d4e6171d008d0($f5RS8.readVarUint(this.restDecoder), $f5RS8.readVarUint(this.restDecoder));
    }
    /**
   * @return {ID}
   */ readRightID() {
        return $52a83e33f2b9e935$export$6c7d4e6171d008d0($f5RS8.readVarUint(this.restDecoder), $f5RS8.readVarUint(this.restDecoder));
    }
    /**
   * Read the next client id.
   * Use this in favor of readID whenever possible to reduce the number of objects created.
   */ readClient() {
        return $f5RS8.readVarUint(this.restDecoder);
    }
    /**
   * @return {number} info An unsigned 8-bit integer
   */ readInfo() {
        return $f5RS8.readUint8(this.restDecoder);
    }
    /**
   * @return {string}
   */ readString() {
        return $f5RS8.readVarString(this.restDecoder);
    }
    /**
   * @return {boolean} isKey
   */ readParentInfo() {
        return $f5RS8.readVarUint(this.restDecoder) === 1;
    }
    /**
   * @return {number} info An unsigned 8-bit integer
   */ readTypeRef() {
        return $f5RS8.readVarUint(this.restDecoder);
    }
    /**
   * Write len of a struct - well suited for Opt RLE encoder.
   *
   * @return {number} len
   */ readLen() {
        return $f5RS8.readVarUint(this.restDecoder);
    }
    /**
   * @return {any}
   */ readAny() {
        return $f5RS8.readAny(this.restDecoder);
    }
    /**
   * @return {Uint8Array}
   */ readBuf() {
        return $lB8LX.copyUint8Array($f5RS8.readVarUint8Array(this.restDecoder));
    }
    /**
   * Legacy implementation uses JSON parse. We use any-decoding in v2.
   *
   * @return {any}
   */ readJSON() {
        return JSON.parse($f5RS8.readVarString(this.restDecoder));
    }
    /**
   * @return {string}
   */ readKey() {
        return $f5RS8.readVarString(this.restDecoder);
    }
}
class $52a83e33f2b9e935$var$DSDecoderV2 {
    /**
   * @param {decoding.Decoder} decoder
   */ constructor(decoder){
        /**
     * @private
     */ this.dsCurrVal = 0;
        this.restDecoder = decoder;
    }
    resetDsCurVal() {
        this.dsCurrVal = 0;
    }
    /**
   * @return {number}
   */ readDsClock() {
        this.dsCurrVal += $f5RS8.readVarUint(this.restDecoder);
        return this.dsCurrVal;
    }
    /**
   * @return {number}
   */ readDsLen() {
        const diff = $f5RS8.readVarUint(this.restDecoder) + 1;
        this.dsCurrVal += diff;
        return diff;
    }
}
class $52a83e33f2b9e935$var$UpdateDecoderV2 extends $52a83e33f2b9e935$var$DSDecoderV2 {
    /**
   * @param {decoding.Decoder} decoder
   */ constructor(decoder){
        super(decoder);
        /**
     * List of cached keys. If the keys[id] does not exist, we read a new key
     * from stringEncoder and push it to keys.
     *
     * @type {Array<string>}
     */ this.keys = [];
        $f5RS8.readVarUint(decoder); // read feature flag - currently unused
        this.keyClockDecoder = new $f5RS8.IntDiffOptRleDecoder($f5RS8.readVarUint8Array(decoder));
        this.clientDecoder = new $f5RS8.UintOptRleDecoder($f5RS8.readVarUint8Array(decoder));
        this.leftClockDecoder = new $f5RS8.IntDiffOptRleDecoder($f5RS8.readVarUint8Array(decoder));
        this.rightClockDecoder = new $f5RS8.IntDiffOptRleDecoder($f5RS8.readVarUint8Array(decoder));
        this.infoDecoder = new $f5RS8.RleDecoder($f5RS8.readVarUint8Array(decoder), $f5RS8.readUint8);
        this.stringDecoder = new $f5RS8.StringDecoder($f5RS8.readVarUint8Array(decoder));
        this.parentInfoDecoder = new $f5RS8.RleDecoder($f5RS8.readVarUint8Array(decoder), $f5RS8.readUint8);
        this.typeRefDecoder = new $f5RS8.UintOptRleDecoder($f5RS8.readVarUint8Array(decoder));
        this.lenDecoder = new $f5RS8.UintOptRleDecoder($f5RS8.readVarUint8Array(decoder));
    }
    /**
   * @return {ID}
   */ readLeftID() {
        return new $52a83e33f2b9e935$export$8be180ec26319f9f(this.clientDecoder.read(), this.leftClockDecoder.read());
    }
    /**
   * @return {ID}
   */ readRightID() {
        return new $52a83e33f2b9e935$export$8be180ec26319f9f(this.clientDecoder.read(), this.rightClockDecoder.read());
    }
    /**
   * Read the next client id.
   * Use this in favor of readID whenever possible to reduce the number of objects created.
   */ readClient() {
        return this.clientDecoder.read();
    }
    /**
   * @return {number} info An unsigned 8-bit integer
   */ readInfo() {
        return /** @type {number} */ this.infoDecoder.read();
    }
    /**
   * @return {string}
   */ readString() {
        return this.stringDecoder.read();
    }
    /**
   * @return {boolean}
   */ readParentInfo() {
        return this.parentInfoDecoder.read() === 1;
    }
    /**
   * @return {number} An unsigned 8-bit integer
   */ readTypeRef() {
        return this.typeRefDecoder.read();
    }
    /**
   * Write len of a struct - well suited for Opt RLE encoder.
   *
   * @return {number}
   */ readLen() {
        return this.lenDecoder.read();
    }
    /**
   * @return {any}
   */ readAny() {
        return $f5RS8.readAny(this.restDecoder);
    }
    /**
   * @return {Uint8Array}
   */ readBuf() {
        return $f5RS8.readVarUint8Array(this.restDecoder);
    }
    /**
   * This is mainly here for legacy purposes.
   *
   * Initial we incoded objects using JSON. Now we use the much faster lib0/any-encoder. This method mainly exists for legacy purposes for the v1 encoder.
   *
   * @return {any}
   */ readJSON() {
        return $f5RS8.readAny(this.restDecoder);
    }
    /**
   * @return {string}
   */ readKey() {
        const keyClock = this.keyClockDecoder.read();
        if (keyClock < this.keys.length) return this.keys[keyClock];
        else {
            const key = this.stringDecoder.read();
            this.keys.push(key);
            return key;
        }
    }
}
class $52a83e33f2b9e935$var$DSEncoderV1 {
    constructor(){
        this.restEncoder = $1p1sv.createEncoder();
    }
    toUint8Array() {
        return $1p1sv.toUint8Array(this.restEncoder);
    }
    resetDsCurVal() {
    // nop
    }
    /**
   * @param {number} clock
   */ writeDsClock(clock) {
        $1p1sv.writeVarUint(this.restEncoder, clock);
    }
    /**
   * @param {number} len
   */ writeDsLen(len) {
        $1p1sv.writeVarUint(this.restEncoder, len);
    }
}
class $52a83e33f2b9e935$export$99171b804d9c5b54 extends $52a83e33f2b9e935$var$DSEncoderV1 {
    /**
   * @param {ID} id
   */ writeLeftID(id) {
        $1p1sv.writeVarUint(this.restEncoder, id.client);
        $1p1sv.writeVarUint(this.restEncoder, id.clock);
    }
    /**
   * @param {ID} id
   */ writeRightID(id) {
        $1p1sv.writeVarUint(this.restEncoder, id.client);
        $1p1sv.writeVarUint(this.restEncoder, id.clock);
    }
    /**
   * Use writeClient and writeClock instead of writeID if possible.
   * @param {number} client
   */ writeClient(client) {
        $1p1sv.writeVarUint(this.restEncoder, client);
    }
    /**
   * @param {number} info An unsigned 8-bit integer
   */ writeInfo(info) {
        $1p1sv.writeUint8(this.restEncoder, info);
    }
    /**
   * @param {string} s
   */ writeString(s) {
        $1p1sv.writeVarString(this.restEncoder, s);
    }
    /**
   * @param {boolean} isYKey
   */ writeParentInfo(isYKey) {
        $1p1sv.writeVarUint(this.restEncoder, isYKey ? 1 : 0);
    }
    /**
   * @param {number} info An unsigned 8-bit integer
   */ writeTypeRef(info) {
        $1p1sv.writeVarUint(this.restEncoder, info);
    }
    /**
   * Write len of a struct - well suited for Opt RLE encoder.
   *
   * @param {number} len
   */ writeLen(len) {
        $1p1sv.writeVarUint(this.restEncoder, len);
    }
    /**
   * @param {any} any
   */ writeAny(any) {
        $1p1sv.writeAny(this.restEncoder, any);
    }
    /**
   * @param {Uint8Array} buf
   */ writeBuf(buf) {
        $1p1sv.writeVarUint8Array(this.restEncoder, buf);
    }
    /**
   * @param {any} embed
   */ writeJSON(embed) {
        $1p1sv.writeVarString(this.restEncoder, JSON.stringify(embed));
    }
    /**
   * @param {string} key
   */ writeKey(key) {
        $1p1sv.writeVarString(this.restEncoder, key);
    }
}
class $52a83e33f2b9e935$var$DSEncoderV2 {
    constructor(){
        this.restEncoder = $1p1sv.createEncoder(); // encodes all the rest / non-optimized
        this.dsCurrVal = 0;
    }
    toUint8Array() {
        return $1p1sv.toUint8Array(this.restEncoder);
    }
    resetDsCurVal() {
        this.dsCurrVal = 0;
    }
    /**
   * @param {number} clock
   */ writeDsClock(clock) {
        const diff = clock - this.dsCurrVal;
        this.dsCurrVal = clock;
        $1p1sv.writeVarUint(this.restEncoder, diff);
    }
    /**
   * @param {number} len
   */ writeDsLen(len) {
        if (len === 0) $akmFO.unexpectedCase();
        $1p1sv.writeVarUint(this.restEncoder, len - 1);
        this.dsCurrVal += len;
    }
}
class $52a83e33f2b9e935$var$UpdateEncoderV2 extends $52a83e33f2b9e935$var$DSEncoderV2 {
    constructor(){
        super();
        /**
     * @type {Map<string,number>}
     */ this.keyMap = new Map();
        /**
     * Refers to the next uniqe key-identifier to me used.
     * See writeKey method for more information.
     *
     * @type {number}
     */ this.keyClock = 0;
        this.keyClockEncoder = new $1p1sv.IntDiffOptRleEncoder();
        this.clientEncoder = new $1p1sv.UintOptRleEncoder();
        this.leftClockEncoder = new $1p1sv.IntDiffOptRleEncoder();
        this.rightClockEncoder = new $1p1sv.IntDiffOptRleEncoder();
        this.infoEncoder = new $1p1sv.RleEncoder($1p1sv.writeUint8);
        this.stringEncoder = new $1p1sv.StringEncoder();
        this.parentInfoEncoder = new $1p1sv.RleEncoder($1p1sv.writeUint8);
        this.typeRefEncoder = new $1p1sv.UintOptRleEncoder();
        this.lenEncoder = new $1p1sv.UintOptRleEncoder();
    }
    toUint8Array() {
        const encoder = $1p1sv.createEncoder();
        $1p1sv.writeVarUint(encoder, 0); // this is a feature flag that we might use in the future
        $1p1sv.writeVarUint8Array(encoder, this.keyClockEncoder.toUint8Array());
        $1p1sv.writeVarUint8Array(encoder, this.clientEncoder.toUint8Array());
        $1p1sv.writeVarUint8Array(encoder, this.leftClockEncoder.toUint8Array());
        $1p1sv.writeVarUint8Array(encoder, this.rightClockEncoder.toUint8Array());
        $1p1sv.writeVarUint8Array(encoder, $1p1sv.toUint8Array(this.infoEncoder));
        $1p1sv.writeVarUint8Array(encoder, this.stringEncoder.toUint8Array());
        $1p1sv.writeVarUint8Array(encoder, $1p1sv.toUint8Array(this.parentInfoEncoder));
        $1p1sv.writeVarUint8Array(encoder, this.typeRefEncoder.toUint8Array());
        $1p1sv.writeVarUint8Array(encoder, this.lenEncoder.toUint8Array());
        // @note The rest encoder is appended! (note the missing var)
        $1p1sv.writeUint8Array(encoder, $1p1sv.toUint8Array(this.restEncoder));
        return $1p1sv.toUint8Array(encoder);
    }
    /**
   * @param {ID} id
   */ writeLeftID(id) {
        this.clientEncoder.write(id.client);
        this.leftClockEncoder.write(id.clock);
    }
    /**
   * @param {ID} id
   */ writeRightID(id) {
        this.clientEncoder.write(id.client);
        this.rightClockEncoder.write(id.clock);
    }
    /**
   * @param {number} client
   */ writeClient(client) {
        this.clientEncoder.write(client);
    }
    /**
   * @param {number} info An unsigned 8-bit integer
   */ writeInfo(info) {
        this.infoEncoder.write(info);
    }
    /**
   * @param {string} s
   */ writeString(s) {
        this.stringEncoder.write(s);
    }
    /**
   * @param {boolean} isYKey
   */ writeParentInfo(isYKey) {
        this.parentInfoEncoder.write(isYKey ? 1 : 0);
    }
    /**
   * @param {number} info An unsigned 8-bit integer
   */ writeTypeRef(info) {
        this.typeRefEncoder.write(info);
    }
    /**
   * Write len of a struct - well suited for Opt RLE encoder.
   *
   * @param {number} len
   */ writeLen(len) {
        this.lenEncoder.write(len);
    }
    /**
   * @param {any} any
   */ writeAny(any) {
        $1p1sv.writeAny(this.restEncoder, any);
    }
    /**
   * @param {Uint8Array} buf
   */ writeBuf(buf) {
        $1p1sv.writeVarUint8Array(this.restEncoder, buf);
    }
    /**
   * This is mainly here for legacy purposes.
   *
   * Initial we incoded objects using JSON. Now we use the much faster lib0/any-encoder. This method mainly exists for legacy purposes for the v1 encoder.
   *
   * @param {any} embed
   */ writeJSON(embed) {
        $1p1sv.writeAny(this.restEncoder, embed);
    }
    /**
   * Property keys are often reused. For example, in y-prosemirror the key `bold` might
   * occur very often. For a 3d application, the key `position` might occur very often.
   *
   * We cache these keys in a Map and refer to them via a unique number.
   *
   * @param {string} key
   */ writeKey(key) {
        const clock = this.keyMap.get(key);
        if (clock === undefined) {
            /**
       * @todo uncomment to introduce this feature finally
       *
       * Background. The ContentFormat object was always encoded using writeKey, but the decoder used to use readString.
       * Furthermore, I forgot to set the keyclock. So everything was working fine.
       *
       * However, this feature here is basically useless as it is not being used (it actually only consumes extra memory).
       *
       * I don't know yet how to reintroduce this feature..
       *
       * Older clients won't be able to read updates when we reintroduce this feature. So this should probably be done using a flag.
       *
       */ // this.keyMap.set(key, this.keyClock)
            this.keyClockEncoder.write(this.keyClock++);
            this.stringEncoder.write(key);
        } else this.keyClockEncoder.write(clock);
    }
}
/**
 * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
 * @param {Array<GC|Item>} structs All structs by `client`
 * @param {number} client
 * @param {number} clock write structs starting with `ID(client,clock)`
 *
 * @function
 */ const $52a83e33f2b9e935$var$writeStructs = (encoder, structs, client, clock)=>{
    // write first id
    clock = $kuitL.max(clock, structs[0].id.clock); // make sure the first id exists
    const startNewStructs = $52a83e33f2b9e935$export$5f8f02523cf47b58(structs, clock);
    // write # encoded structs
    $1p1sv.writeVarUint(encoder.restEncoder, structs.length - startNewStructs);
    encoder.writeClient(client);
    $1p1sv.writeVarUint(encoder.restEncoder, clock);
    const firstStruct = structs[startNewStructs];
    // write first struct with an offset
    firstStruct.write(encoder, clock - firstStruct.id.clock);
    for(let i = startNewStructs + 1; i < structs.length; i++)structs[i].write(encoder, 0);
};
/**
 * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
 * @param {StructStore} store
 * @param {Map<number,number>} _sm
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$writeClientsStructs = (encoder, store, _sm)=>{
    // we filter all valid _sm entries into sm
    const sm = new Map();
    _sm.forEach((clock, client)=>{
        // only write if new structs are available
        if ($52a83e33f2b9e935$export$50fdfeece43146fd(store, client) > clock) sm.set(client, clock);
    });
    $52a83e33f2b9e935$var$getStateVector(store).forEach((_clock, client)=>{
        if (!_sm.has(client)) sm.set(client, 0);
    });
    // write # states that were updated
    $1p1sv.writeVarUint(encoder.restEncoder, sm.size);
    // Write items with higher client ids first
    // This heavily improves the conflict algorithm.
    $7sfdv.from(sm.entries()).sort((a, b)=>b[0] - a[0]).forEach(([client, clock])=>{
        $52a83e33f2b9e935$var$writeStructs(encoder, /** @type {Array<GC|Item>} */ store.clients.get(client), client, clock);
    });
};
/**
 * @param {UpdateDecoderV1 | UpdateDecoderV2} decoder The decoder object to read data from.
 * @param {Doc} doc
 * @return {Map<number, { i: number, refs: Array<Item | GC> }>}
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$readClientsStructRefs = (decoder, doc)=>{
    /**
   * @type {Map<number, { i: number, refs: Array<Item | GC> }>}
   */ const clientRefs = $e6DQe.create();
    const numOfStateUpdates = $f5RS8.readVarUint(decoder.restDecoder);
    for(let i = 0; i < numOfStateUpdates; i++){
        const numberOfStructs = $f5RS8.readVarUint(decoder.restDecoder);
        /**
     * @type {Array<GC|Item>}
     */ const refs = new Array(numberOfStructs);
        const client = decoder.readClient();
        let clock = $f5RS8.readVarUint(decoder.restDecoder);
        // const start = performance.now()
        clientRefs.set(client, {
            i: 0,
            refs: refs
        });
        for(let i = 0; i < numberOfStructs; i++){
            const info = decoder.readInfo();
            switch($1GdQd.BITS5 & info){
                case 0:
                    {
                        const len = decoder.readLen();
                        refs[i] = new $52a83e33f2b9e935$export$12d259ff017e6b58($52a83e33f2b9e935$export$6c7d4e6171d008d0(client, clock), len);
                        clock += len;
                        break;
                    }
                case 10:
                    {
                        // @todo we could reduce the amount of checks by adding Skip struct to clientRefs so we know that something is missing.
                        const len = $f5RS8.readVarUint(decoder.restDecoder);
                        refs[i] = new $52a83e33f2b9e935$var$Skip($52a83e33f2b9e935$export$6c7d4e6171d008d0(client, clock), len);
                        clock += len;
                        break;
                    }
                default:
                    {
                        /**
           * The optimized implementation doesn't use any variables because inlining variables is faster.
           * Below a non-optimized version is shown that implements the basic algorithm with
           * a few comments
           */ const cantCopyParentInfo = (info & ($1GdQd.BIT7 | $1GdQd.BIT8)) === 0;
                        // If parent = null and neither left nor right are defined, then we know that `parent` is child of `y`
                        // and we read the next string as parentYKey.
                        // It indicates how we store/retrieve parent from `y.share`
                        // @type {string|null}
                        const struct = new $52a83e33f2b9e935$export$6d08773d2e66f8f2($52a83e33f2b9e935$export$6c7d4e6171d008d0(client, clock), null, (info & $1GdQd.BIT8) === $1GdQd.BIT8 ? decoder.readLeftID() : null, null, (info & $1GdQd.BIT7) === $1GdQd.BIT7 ? decoder.readRightID() : null, cantCopyParentInfo ? decoder.readParentInfo() ? doc.get(decoder.readString()) : decoder.readLeftID() : null, cantCopyParentInfo && (info & $1GdQd.BIT6) === $1GdQd.BIT6 ? decoder.readString() : null, $52a83e33f2b9e935$var$readItemContent(decoder, info) // item content
                        );
                        /* A non-optimized implementation of the above algorithm:

          // The item that was originally to the left of this item.
          const origin = (info & binary.BIT8) === binary.BIT8 ? decoder.readLeftID() : null
          // The item that was originally to the right of this item.
          const rightOrigin = (info & binary.BIT7) === binary.BIT7 ? decoder.readRightID() : null
          const cantCopyParentInfo = (info & (binary.BIT7 | binary.BIT8)) === 0
          const hasParentYKey = cantCopyParentInfo ? decoder.readParentInfo() : false
          // If parent = null and neither left nor right are defined, then we know that `parent` is child of `y`
          // and we read the next string as parentYKey.
          // It indicates how we store/retrieve parent from `y.share`
          // @type {string|null}
          const parentYKey = cantCopyParentInfo && hasParentYKey ? decoder.readString() : null

          const struct = new Item(
            createID(client, clock),
            null, // leftd
            origin, // origin
            null, // right
            rightOrigin, // right origin
            cantCopyParentInfo && !hasParentYKey ? decoder.readLeftID() : (parentYKey !== null ? doc.get(parentYKey) : null), // parent
            cantCopyParentInfo && (info & binary.BIT6) === binary.BIT6 ? decoder.readString() : null, // parentSub
            readItemContent(decoder, info) // item content
          )
          */ refs[i] = struct;
                        clock += struct.length;
                    }
            }
        }
    // console.log('time to read: ', performance.now() - start) // @todo remove
    }
    return clientRefs;
};
/**
 * Resume computing structs generated by struct readers.
 *
 * While there is something to do, we integrate structs in this order
 * 1. top element on stack, if stack is not empty
 * 2. next element from current struct reader (if empty, use next struct reader)
 *
 * If struct causally depends on another struct (ref.missing), we put next reader of
 * `ref.id.client` on top of stack.
 *
 * At some point we find a struct that has no causal dependencies,
 * then we start emptying the stack.
 *
 * It is not possible to have circles: i.e. struct1 (from client1) depends on struct2 (from client2)
 * depends on struct3 (from client1). Therefore the max stack size is eqaul to `structReaders.length`.
 *
 * This method is implemented in a way so that we can resume computation if this update
 * causally depends on another update.
 *
 * @param {Transaction} transaction
 * @param {StructStore} store
 * @param {Map<number, { i: number, refs: (GC | Item)[] }>} clientsStructRefs
 * @return { null | { update: Uint8Array, missing: Map<number,number> } }
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$integrateStructs = (transaction, store, clientsStructRefs)=>{
    /**
   * @type {Array<Item | GC>}
   */ const stack = [];
    // sort them so that we take the higher id first, in case of conflicts the lower id will probably not conflict with the id from the higher user.
    let clientsStructRefsIds = $7sfdv.from(clientsStructRefs.keys()).sort((a, b)=>a - b);
    if (clientsStructRefsIds.length === 0) return null;
    const getNextStructTarget = ()=>{
        if (clientsStructRefsIds.length === 0) return null;
        let nextStructsTarget = /** @type {{i:number,refs:Array<GC|Item>}} */ clientsStructRefs.get(clientsStructRefsIds[clientsStructRefsIds.length - 1]);
        while(nextStructsTarget.refs.length === nextStructsTarget.i){
            clientsStructRefsIds.pop();
            if (clientsStructRefsIds.length > 0) nextStructsTarget = /** @type {{i:number,refs:Array<GC|Item>}} */ clientsStructRefs.get(clientsStructRefsIds[clientsStructRefsIds.length - 1]);
            else return null;
        }
        return nextStructsTarget;
    };
    let curStructsTarget = getNextStructTarget();
    if (curStructsTarget === null && stack.length === 0) return null;
    /**
   * @type {StructStore}
   */ const restStructs = new $52a83e33f2b9e935$var$StructStore();
    const missingSV = new Map();
    /**
   * @param {number} client
   * @param {number} clock
   */ const updateMissingSv = (client, clock)=>{
        const mclock = missingSV.get(client);
        if (mclock == null || mclock > clock) missingSV.set(client, clock);
    };
    /**
   * @type {GC|Item}
   */ let stackHead = /** @type {any} */ curStructsTarget.refs[/** @type {any} */ curStructsTarget.i++];
    // caching the state because it is used very often
    const state = new Map();
    const addStackToRestSS = ()=>{
        for (const item of stack){
            const client = item.id.client;
            const unapplicableItems = clientsStructRefs.get(client);
            if (unapplicableItems) {
                // decrement because we weren't able to apply previous operation
                unapplicableItems.i--;
                restStructs.clients.set(client, unapplicableItems.refs.slice(unapplicableItems.i));
                clientsStructRefs.delete(client);
                unapplicableItems.i = 0;
                unapplicableItems.refs = [];
            } else // item was the last item on clientsStructRefs and the field was already cleared. Add item to restStructs and continue
            restStructs.clients.set(client, [
                item
            ]);
            // remove client from clientsStructRefsIds to prevent users from applying the same update again
            clientsStructRefsIds = clientsStructRefsIds.filter((c)=>c !== client);
        }
        stack.length = 0;
    };
    // iterate over all struct readers until we are done
    while(true){
        if (stackHead.constructor !== $52a83e33f2b9e935$var$Skip) {
            const localClock = $e6DQe.setIfUndefined(state, stackHead.id.client, ()=>$52a83e33f2b9e935$export$50fdfeece43146fd(store, stackHead.id.client));
            const offset = localClock - stackHead.id.clock;
            if (offset < 0) {
                // update from the same client is missing
                stack.push(stackHead);
                updateMissingSv(stackHead.id.client, stackHead.id.clock - 1);
                // hid a dead wall, add all items from stack to restSS
                addStackToRestSS();
            } else {
                const missing = stackHead.getMissing(transaction, store);
                if (missing !== null) {
                    stack.push(stackHead);
                    // get the struct reader that has the missing struct
                    /**
           * @type {{ refs: Array<GC|Item>, i: number }}
           */ const structRefs = clientsStructRefs.get(/** @type {number} */ missing) || {
                        refs: [],
                        i: 0
                    };
                    if (structRefs.refs.length === structRefs.i) {
                        // This update message causally depends on another update message that doesn't exist yet
                        updateMissingSv(/** @type {number} */ missing, $52a83e33f2b9e935$export$50fdfeece43146fd(store, missing));
                        addStackToRestSS();
                    } else {
                        stackHead = structRefs.refs[structRefs.i++];
                        continue;
                    }
                } else if (offset === 0 || offset < stackHead.length) {
                    // all fine, apply the stackhead
                    stackHead.integrate(transaction, offset);
                    state.set(stackHead.id.client, stackHead.id.clock + stackHead.length);
                }
            }
        }
        // iterate to next stackHead
        if (stack.length > 0) stackHead = /** @type {GC|Item} */ stack.pop();
        else if (curStructsTarget !== null && curStructsTarget.i < curStructsTarget.refs.length) stackHead = /** @type {GC|Item} */ curStructsTarget.refs[curStructsTarget.i++];
        else {
            curStructsTarget = getNextStructTarget();
            if (curStructsTarget === null) break;
            else stackHead = /** @type {GC|Item} */ curStructsTarget.refs[curStructsTarget.i++];
        }
    }
    if (restStructs.clients.size > 0) {
        const encoder = new $52a83e33f2b9e935$var$UpdateEncoderV2();
        $52a83e33f2b9e935$var$writeClientsStructs(encoder, restStructs, new Map());
        // write empty deleteset
        // writeDeleteSet(encoder, new DeleteSet())
        $1p1sv.writeVarUint(encoder.restEncoder, 0); // => no need for an extra function call, just write 0 deletes
        return {
            missing: missingSV,
            update: encoder.toUint8Array()
        };
    }
    return null;
};
/**
 * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
 * @param {Transaction} transaction
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$writeStructsFromTransaction = (encoder, transaction)=>$52a83e33f2b9e935$var$writeClientsStructs(encoder, transaction.doc.store, transaction.beforeState);
/**
 * Read and apply a document update.
 *
 * This function has the same effect as `applyUpdate` but accepts an decoder.
 *
 * @param {decoding.Decoder} decoder
 * @param {Doc} ydoc
 * @param {any} [transactionOrigin] This will be stored on `transaction.origin` and `.on('update', (update, origin))`
 * @param {UpdateDecoderV1 | UpdateDecoderV2} [structDecoder]
 *
 * @function
 */ const $52a83e33f2b9e935$export$7abe492a0b891b4d = (decoder, ydoc, transactionOrigin, structDecoder = new $52a83e33f2b9e935$var$UpdateDecoderV2(decoder))=>$52a83e33f2b9e935$export$dac1bad6146b2469(ydoc, (transaction)=>{
        // force that transaction.local is set to non-local
        transaction.local = false;
        let retry = false;
        const doc = transaction.doc;
        const store = doc.store;
        // let start = performance.now()
        const ss = $52a83e33f2b9e935$var$readClientsStructRefs(structDecoder, doc);
        // console.log('time to read structs: ', performance.now() - start) // @todo remove
        // start = performance.now()
        // console.log('time to merge: ', performance.now() - start) // @todo remove
        // start = performance.now()
        const restStructs = $52a83e33f2b9e935$var$integrateStructs(transaction, store, ss);
        const pending = store.pendingStructs;
        if (pending) {
            // check if we can apply something
            for (const [client, clock] of pending.missing)if (clock < $52a83e33f2b9e935$export$50fdfeece43146fd(store, client)) {
                retry = true;
                break;
            }
            if (restStructs) {
                // merge restStructs into store.pending
                for (const [client, clock] of restStructs.missing){
                    const mclock = pending.missing.get(client);
                    if (mclock == null || mclock > clock) pending.missing.set(client, clock);
                }
                pending.update = $52a83e33f2b9e935$export$ce273d78de0331d1([
                    pending.update,
                    restStructs.update
                ]);
            }
        } else store.pendingStructs = restStructs;
        // console.log('time to integrate: ', performance.now() - start) // @todo remove
        // start = performance.now()
        const dsRest = $52a83e33f2b9e935$var$readAndApplyDeleteSet(structDecoder, transaction, store);
        if (store.pendingDs) {
            // @todo we could make a lower-bound state-vector check as we do above
            const pendingDSUpdate = new $52a83e33f2b9e935$var$UpdateDecoderV2($f5RS8.createDecoder(store.pendingDs));
            $f5RS8.readVarUint(pendingDSUpdate.restDecoder); // read 0 structs, because we only encode deletes in pendingdsupdate
            const dsRest2 = $52a83e33f2b9e935$var$readAndApplyDeleteSet(pendingDSUpdate, transaction, store);
            if (dsRest && dsRest2) // case 1: ds1 != null && ds2 != null
            store.pendingDs = $52a83e33f2b9e935$export$ce273d78de0331d1([
                dsRest,
                dsRest2
            ]);
            else // case 2: ds1 != null
            // case 3: ds2 != null
            // case 4: ds1 == null && ds2 == null
            store.pendingDs = dsRest || dsRest2;
        } else // Either dsRest == null && pendingDs == null OR dsRest != null
        store.pendingDs = dsRest;
        // console.log('time to cleanup: ', performance.now() - start) // @todo remove
        // start = performance.now()
        // console.log('time to resume delete readers: ', performance.now() - start) // @todo remove
        // start = performance.now()
        if (retry) {
            const update = /** @type {{update: Uint8Array}} */ store.pendingStructs.update;
            store.pendingStructs = null;
            $52a83e33f2b9e935$export$acc3b0324aabf1b6(transaction.doc, update);
        }
    }, transactionOrigin, false);
/**
 * Read and apply a document update.
 *
 * This function has the same effect as `applyUpdate` but accepts an decoder.
 *
 * @param {decoding.Decoder} decoder
 * @param {Doc} ydoc
 * @param {any} [transactionOrigin] This will be stored on `transaction.origin` and `.on('update', (update, origin))`
 *
 * @function
 */ const $52a83e33f2b9e935$export$d67ac8d73b7d336c = (decoder, ydoc, transactionOrigin)=>$52a83e33f2b9e935$export$7abe492a0b891b4d(decoder, ydoc, transactionOrigin, new $52a83e33f2b9e935$var$UpdateDecoderV1(decoder));
/**
 * Apply a document update created by, for example, `y.on('update', update => ..)` or `update = encodeStateAsUpdate()`.
 *
 * This function has the same effect as `readUpdate` but accepts an Uint8Array instead of a Decoder.
 *
 * @param {Doc} ydoc
 * @param {Uint8Array} update
 * @param {any} [transactionOrigin] This will be stored on `transaction.origin` and `.on('update', (update, origin))`
 * @param {typeof UpdateDecoderV1 | typeof UpdateDecoderV2} [YDecoder]
 *
 * @function
 */ const $52a83e33f2b9e935$export$acc3b0324aabf1b6 = (ydoc, update, transactionOrigin, YDecoder = $52a83e33f2b9e935$var$UpdateDecoderV2)=>{
    const decoder = $f5RS8.createDecoder(update);
    $52a83e33f2b9e935$export$7abe492a0b891b4d(decoder, ydoc, transactionOrigin, new YDecoder(decoder));
};
/**
 * Apply a document update created by, for example, `y.on('update', update => ..)` or `update = encodeStateAsUpdate()`.
 *
 * This function has the same effect as `readUpdate` but accepts an Uint8Array instead of a Decoder.
 *
 * @param {Doc} ydoc
 * @param {Uint8Array} update
 * @param {any} [transactionOrigin] This will be stored on `transaction.origin` and `.on('update', (update, origin))`
 *
 * @function
 */ const $52a83e33f2b9e935$export$c271737a9c02e925 = (ydoc, update, transactionOrigin)=>$52a83e33f2b9e935$export$acc3b0324aabf1b6(ydoc, update, transactionOrigin, $52a83e33f2b9e935$var$UpdateDecoderV1);
/**
 * Write all the document as a single update message. If you specify the state of the remote client (`targetStateVector`) it will
 * only write the operations that are missing.
 *
 * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
 * @param {Doc} doc
 * @param {Map<number,number>} [targetStateVector] The state of the target that receives the update. Leave empty to write all known structs
 *
 * @function
 */ const $52a83e33f2b9e935$var$writeStateAsUpdate = (encoder, doc, targetStateVector = new Map())=>{
    $52a83e33f2b9e935$var$writeClientsStructs(encoder, doc.store, targetStateVector);
    $52a83e33f2b9e935$var$writeDeleteSet(encoder, $52a83e33f2b9e935$export$8450d668bec558e2(doc.store));
};
/**
 * Write all the document as a single update message that can be applied on the remote document. If you specify the state of the remote client (`targetState`) it will
 * only write the operations that are missing.
 *
 * Use `writeStateAsUpdate` instead if you are working with lib0/encoding.js#Encoder
 *
 * @param {Doc} doc
 * @param {Uint8Array} [encodedTargetStateVector] The state of the target that receives the update. Leave empty to write all known structs
 * @param {UpdateEncoderV1 | UpdateEncoderV2} [encoder]
 * @return {Uint8Array}
 *
 * @function
 */ const $52a83e33f2b9e935$export$90338e0798f6f64f = (doc, encodedTargetStateVector = new Uint8Array([
    0
]), encoder = new $52a83e33f2b9e935$var$UpdateEncoderV2())=>{
    const targetStateVector = $52a83e33f2b9e935$export$324ac6fb20a844e3(encodedTargetStateVector);
    $52a83e33f2b9e935$var$writeStateAsUpdate(encoder, doc, targetStateVector);
    const updates = [
        encoder.toUint8Array()
    ];
    // also add the pending updates (if there are any)
    if (doc.store.pendingDs) updates.push(doc.store.pendingDs);
    if (doc.store.pendingStructs) updates.push($52a83e33f2b9e935$export$a8143edf39d2ad8e(doc.store.pendingStructs.update, encodedTargetStateVector));
    if (updates.length > 1) {
        if (encoder.constructor === $52a83e33f2b9e935$export$99171b804d9c5b54) return $52a83e33f2b9e935$export$6319871659fd2460(updates.map((update, i)=>i === 0 ? update : $52a83e33f2b9e935$export$afffbdeed14adbd(update)));
        else if (encoder.constructor === $52a83e33f2b9e935$var$UpdateEncoderV2) return $52a83e33f2b9e935$export$ce273d78de0331d1(updates);
    }
    return updates[0];
};
/**
 * Write all the document as a single update message that can be applied on the remote document. If you specify the state of the remote client (`targetState`) it will
 * only write the operations that are missing.
 *
 * Use `writeStateAsUpdate` instead if you are working with lib0/encoding.js#Encoder
 *
 * @param {Doc} doc
 * @param {Uint8Array} [encodedTargetStateVector] The state of the target that receives the update. Leave empty to write all known structs
 * @return {Uint8Array}
 *
 * @function
 */ const $52a83e33f2b9e935$export$e5848df80e65bd53 = (doc, encodedTargetStateVector)=>$52a83e33f2b9e935$export$90338e0798f6f64f(doc, encodedTargetStateVector, new $52a83e33f2b9e935$export$99171b804d9c5b54());
/**
 * Read state vector from Decoder and return as Map
 *
 * @param {DSDecoderV1 | DSDecoderV2} decoder
 * @return {Map<number,number>} Maps `client` to the number next expected `clock` from that client.
 *
 * @function
 */ const $52a83e33f2b9e935$var$readStateVector = (decoder)=>{
    const ss = new Map();
    const ssLength = $f5RS8.readVarUint(decoder.restDecoder);
    for(let i = 0; i < ssLength; i++){
        const client = $f5RS8.readVarUint(decoder.restDecoder);
        const clock = $f5RS8.readVarUint(decoder.restDecoder);
        ss.set(client, clock);
    }
    return ss;
};
/**
 * Read decodedState and return State as Map.
 *
 * @param {Uint8Array} decodedState
 * @return {Map<number,number>} Maps `client` to the number next expected `clock` from that client.
 *
 * @function
 */ // export const decodeStateVectorV2 = decodedState => readStateVector(new DSDecoderV2(decoding.createDecoder(decodedState)))
/**
 * Read decodedState and return State as Map.
 *
 * @param {Uint8Array} decodedState
 * @return {Map<number,number>} Maps `client` to the number next expected `clock` from that client.
 *
 * @function
 */ const $52a83e33f2b9e935$export$324ac6fb20a844e3 = (decodedState)=>$52a83e33f2b9e935$var$readStateVector(new $52a83e33f2b9e935$var$DSDecoderV1($f5RS8.createDecoder(decodedState)));
/**
 * @param {DSEncoderV1 | DSEncoderV2} encoder
 * @param {Map<number,number>} sv
 * @function
 */ const $52a83e33f2b9e935$var$writeStateVector = (encoder, sv)=>{
    $1p1sv.writeVarUint(encoder.restEncoder, sv.size);
    $7sfdv.from(sv.entries()).sort((a, b)=>b[0] - a[0]).forEach(([client, clock])=>{
        $1p1sv.writeVarUint(encoder.restEncoder, client); // @todo use a special client decoder that is based on mapping
        $1p1sv.writeVarUint(encoder.restEncoder, clock);
    });
    return encoder;
};
/**
 * @param {DSEncoderV1 | DSEncoderV2} encoder
 * @param {Doc} doc
 *
 * @function
 */ const $52a83e33f2b9e935$var$writeDocumentStateVector = (encoder, doc)=>$52a83e33f2b9e935$var$writeStateVector(encoder, $52a83e33f2b9e935$var$getStateVector(doc.store));
/**
 * Encode State as Uint8Array.
 *
 * @param {Doc|Map<number,number>} doc
 * @param {DSEncoderV1 | DSEncoderV2} [encoder]
 * @return {Uint8Array}
 *
 * @function
 */ const $52a83e33f2b9e935$var$encodeStateVectorV2 = (doc, encoder = new $52a83e33f2b9e935$var$DSEncoderV2())=>{
    if (doc instanceof Map) $52a83e33f2b9e935$var$writeStateVector(encoder, doc);
    else $52a83e33f2b9e935$var$writeDocumentStateVector(encoder, doc);
    return encoder.toUint8Array();
};
/**
 * Encode State as Uint8Array.
 *
 * @param {Doc|Map<number,number>} doc
 * @return {Uint8Array}
 *
 * @function
 */ const $52a83e33f2b9e935$export$3e2f5393f32e71f = (doc)=>$52a83e33f2b9e935$var$encodeStateVectorV2(doc, new $52a83e33f2b9e935$var$DSEncoderV1());
/**
 * General event handler implementation.
 *
 * @template ARG0, ARG1
 *
 * @private
 */ class $52a83e33f2b9e935$var$EventHandler {
    constructor(){
        /**
     * @type {Array<function(ARG0, ARG1):void>}
     */ this.l = [];
    }
}
/**
 * @template ARG0,ARG1
 * @returns {EventHandler<ARG0,ARG1>}
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$createEventHandler = ()=>new $52a83e33f2b9e935$var$EventHandler();
/**
 * Adds an event listener that is called when
 * {@link EventHandler#callEventListeners} is called.
 *
 * @template ARG0,ARG1
 * @param {EventHandler<ARG0,ARG1>} eventHandler
 * @param {function(ARG0,ARG1):void} f The event handler.
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$addEventHandlerListener = (eventHandler, f)=>eventHandler.l.push(f);
/**
 * Removes an event listener.
 *
 * @template ARG0,ARG1
 * @param {EventHandler<ARG0,ARG1>} eventHandler
 * @param {function(ARG0,ARG1):void} f The event handler that was added with
 *                     {@link EventHandler#addEventListener}
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$removeEventHandlerListener = (eventHandler, f)=>{
    const l = eventHandler.l;
    const len = l.length;
    eventHandler.l = l.filter((g)=>f !== g);
    if (len === eventHandler.l.length) console.error("[yjs] Tried to remove event handler that doesn't exist.");
};
/**
 * Call all event listeners that were added via
 * {@link EventHandler#addEventListener}.
 *
 * @template ARG0,ARG1
 * @param {EventHandler<ARG0,ARG1>} eventHandler
 * @param {ARG0} arg0
 * @param {ARG1} arg1
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$callEventHandlerListeners = (eventHandler, arg0, arg1)=>$kXTKb.callAll(eventHandler.l, [
        arg0,
        arg1
    ]);
class $52a83e33f2b9e935$export$8be180ec26319f9f {
    /**
   * @param {number} client client id
   * @param {number} clock unique per client id, continuous number
   */ constructor(client, clock){
        /**
     * Client id
     * @type {number}
     */ this.client = client;
        /**
     * unique per client id, continuous number
     * @type {number}
     */ this.clock = clock;
    }
}
/**
 * @param {ID | null} a
 * @param {ID | null} b
 * @return {boolean}
 *
 * @function
 */ const $52a83e33f2b9e935$export$c0af976e7e459c02 = (a, b)=>a === b || a !== null && b !== null && a.client === b.client && a.clock === b.clock;
/**
 * @param {number} client
 * @param {number} clock
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$export$6c7d4e6171d008d0 = (client, clock)=>new $52a83e33f2b9e935$export$8be180ec26319f9f(client, clock);
/**
 * @param {encoding.Encoder} encoder
 * @param {ID} id
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$writeID = (encoder, id)=>{
    $1p1sv.writeVarUint(encoder, id.client);
    $1p1sv.writeVarUint(encoder, id.clock);
};
/**
 * Read ID.
 * * If first varUint read is 0xFFFFFF a RootID is returned.
 * * Otherwise an ID is returned
 *
 * @param {decoding.Decoder} decoder
 * @return {ID}
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$readID = (decoder)=>$52a83e33f2b9e935$export$6c7d4e6171d008d0($f5RS8.readVarUint(decoder), $f5RS8.readVarUint(decoder));
/**
 * The top types are mapped from y.share.get(keyname) => type.
 * `type` does not store any information about the `keyname`.
 * This function finds the correct `keyname` for `type` and throws otherwise.
 *
 * @param {AbstractType<any>} type
 * @return {string}
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$export$e726a40920d54663 = (type)=>{
    // @ts-ignore _y must be defined, otherwise unexpected case
    for (const [key, value] of type.doc.share.entries()){
        if (value === type) return key;
    }
    throw $akmFO.unexpectedCase();
};
/**
 * Check if `parent` is a parent of `child`.
 *
 * @param {AbstractType<any>} parent
 * @param {Item|null} child
 * @return {Boolean} Whether `parent` is a parent of `child`.
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$export$3c81af374b054d6a = (parent, child)=>{
    while(child !== null){
        if (child.parent === parent) return true;
        child = /** @type {AbstractType<any>} */ child.parent._item;
    }
    return false;
};
/**
 * Convenient helper to log type information.
 *
 * Do not use in productive systems as the output can be immense!
 *
 * @param {AbstractType<any>} type
 */ const $52a83e33f2b9e935$export$e9068ad704ba2f79 = (type)=>{
    const res = [];
    let n = type._start;
    while(n){
        res.push(n);
        n = n.right;
    }
    console.log("Children: ", res);
    console.log("Children content: ", res.filter((m)=>!m.deleted).map((m)=>m.content));
};
class $52a83e33f2b9e935$export$b9e8b5fa1162ca4e {
    /**
   * @param {Doc} doc
   * @param {YMap<any>} [storeType]
   */ constructor(doc, storeType = doc.getMap("users")){
        /**
     * @type {Map<string,DeleteSet>}
     */ const dss = new Map();
        this.yusers = storeType;
        this.doc = doc;
        /**
     * Maps from clientid to userDescription
     *
     * @type {Map<number,string>}
     */ this.clients = new Map();
        this.dss = dss;
        /**
     * @param {YMap<any>} user
     * @param {string} userDescription
     */ const initUser = (user, userDescription)=>{
            /**
       * @type {YArray<Uint8Array>}
       */ const ds = user.get("ds");
            const ids = user.get("ids");
            const addClientId = /** @param {number} clientid */ (clientid)=>this.clients.set(clientid, userDescription);
            ds.observe(/** @param {YArrayEvent<any>} event */ (event)=>{
                event.changes.added.forEach((item)=>{
                    item.content.getContent().forEach((encodedDs)=>{
                        if (encodedDs instanceof Uint8Array) this.dss.set(userDescription, $52a83e33f2b9e935$var$mergeDeleteSets([
                            this.dss.get(userDescription) || $52a83e33f2b9e935$export$8cbac0d946238699(),
                            $52a83e33f2b9e935$var$readDeleteSet(new $52a83e33f2b9e935$var$DSDecoderV1($f5RS8.createDecoder(encodedDs)))
                        ]));
                    });
                });
            });
            this.dss.set(userDescription, $52a83e33f2b9e935$var$mergeDeleteSets(ds.map((encodedDs)=>$52a83e33f2b9e935$var$readDeleteSet(new $52a83e33f2b9e935$var$DSDecoderV1($f5RS8.createDecoder(encodedDs))))));
            ids.observe(/** @param {YArrayEvent<any>} event */ (event)=>event.changes.added.forEach((item)=>item.content.getContent().forEach(addClientId)));
            ids.forEach(addClientId);
        };
        // observe users
        storeType.observe((event)=>{
            event.keysChanged.forEach((userDescription)=>initUser(storeType.get(userDescription), userDescription));
        });
        // add intial data
        storeType.forEach(initUser);
    }
    /**
   * @param {Doc} doc
   * @param {number} clientid
   * @param {string} userDescription
   * @param {Object} conf
   * @param {function(Transaction, DeleteSet):boolean} [conf.filter]
   */ setUserMapping(doc, clientid, userDescription, { filter: filter = ()=>true } = {}) {
        const users = this.yusers;
        let user = users.get(userDescription);
        if (!user) {
            user = new $52a83e33f2b9e935$export$a5c7b93649eaf8f8();
            user.set("ids", new $52a83e33f2b9e935$export$c4be6576ca6fe4aa());
            user.set("ds", new $52a83e33f2b9e935$export$c4be6576ca6fe4aa());
            users.set(userDescription, user);
        }
        user.get("ids").push([
            clientid
        ]);
        users.observe((_event)=>{
            setTimeout(()=>{
                const userOverwrite = users.get(userDescription);
                if (userOverwrite !== user) {
                    // user was overwritten, port all data over to the next user object
                    // @todo Experiment with Y.Sets here
                    user = userOverwrite;
                    // @todo iterate over old type
                    this.clients.forEach((_userDescription, clientid)=>{
                        if (userDescription === _userDescription) user.get("ids").push([
                            clientid
                        ]);
                    });
                    const encoder = new $52a83e33f2b9e935$var$DSEncoderV1();
                    const ds = this.dss.get(userDescription);
                    if (ds) {
                        $52a83e33f2b9e935$var$writeDeleteSet(encoder, ds);
                        user.get("ds").push([
                            encoder.toUint8Array()
                        ]);
                    }
                }
            }, 0);
        });
        doc.on("afterTransaction", /** @param {Transaction} transaction */ (transaction)=>{
            setTimeout(()=>{
                const yds = user.get("ds");
                const ds = transaction.deleteSet;
                if (transaction.local && ds.clients.size > 0 && filter(transaction, ds)) {
                    const encoder = new $52a83e33f2b9e935$var$DSEncoderV1();
                    $52a83e33f2b9e935$var$writeDeleteSet(encoder, ds);
                    yds.push([
                        encoder.toUint8Array()
                    ]);
                }
            });
        });
    }
    /**
   * @param {number} clientid
   * @return {any}
   */ getUserByClientId(clientid) {
        return this.clients.get(clientid) || null;
    }
    /**
   * @param {ID} id
   * @return {string | null}
   */ getUserByDeletedId(id) {
        for (const [userDescription, ds] of this.dss.entries()){
            if ($52a83e33f2b9e935$export$dcb04af092e44fde(ds, id)) return userDescription;
        }
        return null;
    }
}
/**
 * A relative position is based on the Yjs model and is not affected by document changes.
 * E.g. If you place a relative position before a certain character, it will always point to this character.
 * If you place a relative position at the end of a type, it will always point to the end of the type.
 *
 * A numeric position is often unsuited for user selections, because it does not change when content is inserted
 * before or after.
 *
 * ```Insert(0, 'x')('a|bc') = 'xa|bc'``` Where | is the relative position.
 *
 * One of the properties must be defined.
 *
 * @example
 *   // Current cursor position is at position 10
 *   const relativePosition = createRelativePositionFromIndex(yText, 10)
 *   // modify yText
 *   yText.insert(0, 'abc')
 *   yText.delete(3, 10)
 *   // Compute the cursor position
 *   const absolutePosition = createAbsolutePositionFromRelativePosition(y, relativePosition)
 *   absolutePosition.type === yText // => true
 *   console.log('cursor location is ' + absolutePosition.index) // => cursor location is 3
 *
 */ class $52a83e33f2b9e935$export$da21a415c5907662 {
    /**
   * @param {ID|null} type
   * @param {string|null} tname
   * @param {ID|null} item
   * @param {number} assoc
   */ constructor(type, tname, item, assoc = 0){
        /**
     * @type {ID|null}
     */ this.type = type;
        /**
     * @type {string|null}
     */ this.tname = tname;
        /**
     * @type {ID | null}
     */ this.item = item;
        /**
     * A relative position is associated to a specific character. By default
     * assoc >= 0, the relative position is associated to the character
     * after the meant position.
     * I.e. position 1 in 'ab' is associated to character 'b'.
     *
     * If assoc < 0, then the relative position is associated to the caharacter
     * before the meant position.
     *
     * @type {number}
     */ this.assoc = assoc;
    }
}
/**
 * @param {RelativePosition} rpos
 * @return {any}
 */ const $52a83e33f2b9e935$export$a783b081767a452e = (rpos)=>{
    const json = {};
    if (rpos.type) json.type = rpos.type;
    if (rpos.tname) json.tname = rpos.tname;
    if (rpos.item) json.item = rpos.item;
    if (rpos.assoc != null) json.assoc = rpos.assoc;
    return json;
};
/**
 * @param {any} json
 * @return {RelativePosition}
 *
 * @function
 */ const $52a83e33f2b9e935$export$ddad8a1b8f7475d8 = (json)=>new $52a83e33f2b9e935$export$da21a415c5907662(json.type == null ? null : $52a83e33f2b9e935$export$6c7d4e6171d008d0(json.type.client, json.type.clock), json.tname || null, json.item == null ? null : $52a83e33f2b9e935$export$6c7d4e6171d008d0(json.item.client, json.item.clock), json.assoc == null ? 0 : json.assoc);
class $52a83e33f2b9e935$export$64c95a3fb7344864 {
    /**
   * @param {AbstractType<any>} type
   * @param {number} index
   * @param {number} [assoc]
   */ constructor(type, index, assoc = 0){
        /**
     * @type {AbstractType<any>}
     */ this.type = type;
        /**
     * @type {number}
     */ this.index = index;
        this.assoc = assoc;
    }
}
/**
 * @param {AbstractType<any>} type
 * @param {number} index
 * @param {number} [assoc]
 *
 * @function
 */ const $52a83e33f2b9e935$var$createAbsolutePosition = (type, index, assoc = 0)=>new $52a83e33f2b9e935$export$64c95a3fb7344864(type, index, assoc);
/**
 * @param {AbstractType<any>} type
 * @param {ID|null} item
 * @param {number} [assoc]
 *
 * @function
 */ const $52a83e33f2b9e935$var$createRelativePosition = (type, item, assoc)=>{
    let typeid = null;
    let tname = null;
    if (type._item === null) tname = $52a83e33f2b9e935$export$e726a40920d54663(type);
    else typeid = $52a83e33f2b9e935$export$6c7d4e6171d008d0(type._item.id.client, type._item.id.clock);
    return new $52a83e33f2b9e935$export$da21a415c5907662(typeid, tname, item, assoc);
};
/**
 * Create a relativePosition based on a absolute position.
 *
 * @param {AbstractType<any>} type The base type (e.g. YText or YArray).
 * @param {number} index The absolute position.
 * @param {number} [assoc]
 * @return {RelativePosition}
 *
 * @function
 */ const $52a83e33f2b9e935$export$197e7d99e3857e88 = (type, index, assoc = 0)=>{
    let t = type._start;
    if (assoc < 0) {
        // associated to the left character or the beginning of a type, increment index if possible.
        if (index === 0) return $52a83e33f2b9e935$var$createRelativePosition(type, null, assoc);
        index--;
    }
    while(t !== null){
        if (!t.deleted && t.countable) {
            if (t.length > index) // case 1: found position somewhere in the linked list
            return $52a83e33f2b9e935$var$createRelativePosition(type, $52a83e33f2b9e935$export$6c7d4e6171d008d0(t.id.client, t.id.clock + index), assoc);
            index -= t.length;
        }
        if (t.right === null && assoc < 0) // left-associated position, return last available id
        return $52a83e33f2b9e935$var$createRelativePosition(type, t.lastId, assoc);
        t = t.right;
    }
    return $52a83e33f2b9e935$var$createRelativePosition(type, null, assoc);
};
/**
 * @param {encoding.Encoder} encoder
 * @param {RelativePosition} rpos
 *
 * @function
 */ const $52a83e33f2b9e935$var$writeRelativePosition = (encoder, rpos)=>{
    const { type: type, tname: tname, item: item, assoc: assoc } = rpos;
    if (item !== null) {
        $1p1sv.writeVarUint(encoder, 0);
        $52a83e33f2b9e935$var$writeID(encoder, item);
    } else if (tname !== null) {
        // case 2: found position at the end of the list and type is stored in y.share
        $1p1sv.writeUint8(encoder, 1);
        $1p1sv.writeVarString(encoder, tname);
    } else if (type !== null) {
        // case 3: found position at the end of the list and type is attached to an item
        $1p1sv.writeUint8(encoder, 2);
        $52a83e33f2b9e935$var$writeID(encoder, type);
    } else throw $akmFO.unexpectedCase();
    $1p1sv.writeVarInt(encoder, assoc);
    return encoder;
};
/**
 * @param {RelativePosition} rpos
 * @return {Uint8Array}
 */ const $52a83e33f2b9e935$export$c5c95ef724203575 = (rpos)=>{
    const encoder = $1p1sv.createEncoder();
    $52a83e33f2b9e935$var$writeRelativePosition(encoder, rpos);
    return $1p1sv.toUint8Array(encoder);
};
/**
 * @param {decoding.Decoder} decoder
 * @return {RelativePosition}
 *
 * @function
 */ const $52a83e33f2b9e935$var$readRelativePosition = (decoder)=>{
    let type = null;
    let tname = null;
    let itemID = null;
    switch($f5RS8.readVarUint(decoder)){
        case 0:
            // case 1: found position somewhere in the linked list
            itemID = $52a83e33f2b9e935$var$readID(decoder);
            break;
        case 1:
            // case 2: found position at the end of the list and type is stored in y.share
            tname = $f5RS8.readVarString(decoder);
            break;
        case 2:
            // case 3: found position at the end of the list and type is attached to an item
            type = $52a83e33f2b9e935$var$readID(decoder);
    }
    const assoc = $f5RS8.hasContent(decoder) ? $f5RS8.readVarInt(decoder) : 0;
    return new $52a83e33f2b9e935$export$da21a415c5907662(type, tname, itemID, assoc);
};
/**
 * @param {Uint8Array} uint8Array
 * @return {RelativePosition}
 */ const $52a83e33f2b9e935$export$58a46cebc90e7851 = (uint8Array)=>$52a83e33f2b9e935$var$readRelativePosition($f5RS8.createDecoder(uint8Array));
/**
 * @param {RelativePosition} rpos
 * @param {Doc} doc
 * @return {AbsolutePosition|null}
 *
 * @function
 */ const $52a83e33f2b9e935$export$8fc3152f62fb7ed1 = (rpos, doc)=>{
    const store = doc.store;
    const rightID = rpos.item;
    const typeID = rpos.type;
    const tname = rpos.tname;
    const assoc = rpos.assoc;
    let type = null;
    let index = 0;
    if (rightID !== null) {
        if ($52a83e33f2b9e935$export$50fdfeece43146fd(store, rightID.client) <= rightID.clock) return null;
        const res = $52a83e33f2b9e935$var$followRedone(store, rightID);
        const right = res.item;
        if (!(right instanceof $52a83e33f2b9e935$export$6d08773d2e66f8f2)) return null;
        type = /** @type {AbstractType<any>} */ right.parent;
        if (type._item === null || !type._item.deleted) {
            index = right.deleted || !right.countable ? 0 : res.diff + (assoc >= 0 ? 0 : 1); // adjust position based on left association if necessary
            let n = right.left;
            while(n !== null){
                if (!n.deleted && n.countable) index += n.length;
                n = n.left;
            }
        }
    } else {
        if (tname !== null) type = doc.get(tname);
        else if (typeID !== null) {
            if ($52a83e33f2b9e935$export$50fdfeece43146fd(store, typeID.client) <= typeID.clock) // type does not exist yet
            return null;
            const { item: item } = $52a83e33f2b9e935$var$followRedone(store, typeID);
            if (item instanceof $52a83e33f2b9e935$export$6d08773d2e66f8f2 && item.content instanceof $52a83e33f2b9e935$export$e2e108cbe2e4f865) type = item.content.type;
            else // struct is garbage collected
            return null;
        } else throw $akmFO.unexpectedCase();
        if (assoc >= 0) index = type._length;
        else index = 0;
    }
    return $52a83e33f2b9e935$var$createAbsolutePosition(type, index, rpos.assoc);
};
/**
 * @param {RelativePosition|null} a
 * @param {RelativePosition|null} b
 * @return {boolean}
 *
 * @function
 */ const $52a83e33f2b9e935$export$fc8bd253c948b475 = (a, b)=>a === b || a !== null && b !== null && a.tname === b.tname && $52a83e33f2b9e935$export$c0af976e7e459c02(a.item, b.item) && $52a83e33f2b9e935$export$c0af976e7e459c02(a.type, b.type) && a.assoc === b.assoc;
class $52a83e33f2b9e935$export$c963130a5525248f {
    /**
   * @param {DeleteSet} ds
   * @param {Map<number,number>} sv state map
   */ constructor(ds, sv){
        /**
     * @type {DeleteSet}
     */ this.ds = ds;
        /**
     * State Map
     * @type {Map<number,number>}
     */ this.sv = sv;
    }
}
/**
 * @param {Snapshot} snap1
 * @param {Snapshot} snap2
 * @return {boolean}
 */ const $52a83e33f2b9e935$export$742742a0f55b273d = (snap1, snap2)=>{
    const ds1 = snap1.ds.clients;
    const ds2 = snap2.ds.clients;
    const sv1 = snap1.sv;
    const sv2 = snap2.sv;
    if (sv1.size !== sv2.size || ds1.size !== ds2.size) return false;
    for (const [key, value] of sv1.entries()){
        if (sv2.get(key) !== value) return false;
    }
    for (const [client, dsitems1] of ds1.entries()){
        const dsitems2 = ds2.get(client) || [];
        if (dsitems1.length !== dsitems2.length) return false;
        for(let i = 0; i < dsitems1.length; i++){
            const dsitem1 = dsitems1[i];
            const dsitem2 = dsitems2[i];
            if (dsitem1.clock !== dsitem2.clock || dsitem1.len !== dsitem2.len) return false;
        }
    }
    return true;
};
/**
 * @param {Snapshot} snapshot
 * @param {DSEncoderV1 | DSEncoderV2} [encoder]
 * @return {Uint8Array}
 */ const $52a83e33f2b9e935$export$b946cadc55f8e512 = (snapshot, encoder = new $52a83e33f2b9e935$var$DSEncoderV2())=>{
    $52a83e33f2b9e935$var$writeDeleteSet(encoder, snapshot.ds);
    $52a83e33f2b9e935$var$writeStateVector(encoder, snapshot.sv);
    return encoder.toUint8Array();
};
/**
 * @param {Snapshot} snapshot
 * @return {Uint8Array}
 */ const $52a83e33f2b9e935$export$a6d29989648e995 = (snapshot)=>$52a83e33f2b9e935$export$b946cadc55f8e512(snapshot, new $52a83e33f2b9e935$var$DSEncoderV1());
/**
 * @param {Uint8Array} buf
 * @param {DSDecoderV1 | DSDecoderV2} [decoder]
 * @return {Snapshot}
 */ const $52a83e33f2b9e935$export$b0049fa299f4f58e = (buf, decoder = new $52a83e33f2b9e935$var$DSDecoderV2($f5RS8.createDecoder(buf)))=>{
    return new $52a83e33f2b9e935$export$c963130a5525248f($52a83e33f2b9e935$var$readDeleteSet(decoder), $52a83e33f2b9e935$var$readStateVector(decoder));
};
/**
 * @param {Uint8Array} buf
 * @return {Snapshot}
 */ const $52a83e33f2b9e935$export$5c696daccf32bd2e = (buf)=>$52a83e33f2b9e935$export$b0049fa299f4f58e(buf, new $52a83e33f2b9e935$var$DSDecoderV1($f5RS8.createDecoder(buf)));
/**
 * @param {DeleteSet} ds
 * @param {Map<number,number>} sm
 * @return {Snapshot}
 */ const $52a83e33f2b9e935$export$548fae0445f878fd = (ds, sm)=>new $52a83e33f2b9e935$export$c963130a5525248f(ds, sm);
const $52a83e33f2b9e935$export$d4568a81dd107a34 = $52a83e33f2b9e935$export$548fae0445f878fd($52a83e33f2b9e935$export$8cbac0d946238699(), new Map());
/**
 * @param {Doc} doc
 * @return {Snapshot}
 */ const $52a83e33f2b9e935$export$b8801ea43165ed7d = (doc)=>$52a83e33f2b9e935$export$548fae0445f878fd($52a83e33f2b9e935$export$8450d668bec558e2(doc.store), $52a83e33f2b9e935$var$getStateVector(doc.store));
/**
 * @param {Item} item
 * @param {Snapshot|undefined} snapshot
 *
 * @protected
 * @function
 */ const $52a83e33f2b9e935$var$isVisible = (item, snapshot)=>snapshot === undefined ? !item.deleted : snapshot.sv.has(item.id.client) && (snapshot.sv.get(item.id.client) || 0) > item.id.clock && !$52a83e33f2b9e935$export$dcb04af092e44fde(snapshot.ds, item.id);
/**
 * @param {Transaction} transaction
 * @param {Snapshot} snapshot
 */ const $52a83e33f2b9e935$var$splitSnapshotAffectedStructs = (transaction, snapshot)=>{
    const meta = $e6DQe.setIfUndefined(transaction.meta, $52a83e33f2b9e935$var$splitSnapshotAffectedStructs, $gB6ZU.create);
    const store = transaction.doc.store;
    // check if we already split for this snapshot
    if (!meta.has(snapshot)) {
        snapshot.sv.forEach((clock, client)=>{
            if (clock < $52a83e33f2b9e935$export$50fdfeece43146fd(store, client)) $52a83e33f2b9e935$var$getItemCleanStart(transaction, $52a83e33f2b9e935$export$6c7d4e6171d008d0(client, clock));
        });
        $52a83e33f2b9e935$export$8afefebbaf4e4c78(transaction, snapshot.ds, (_item)=>{});
        meta.add(snapshot);
    }
};
/**
 * @example
 *  const ydoc = new Y.Doc({ gc: false })
 *  ydoc.getText().insert(0, 'world!')
 *  const snapshot = Y.snapshot(ydoc)
 *  ydoc.getText().insert(0, 'hello ')
 *  const restored = Y.createDocFromSnapshot(ydoc, snapshot)
 *  assert(restored.getText().toString() === 'world!')
 *
 * @param {Doc} originDoc
 * @param {Snapshot} snapshot
 * @param {Doc} [newDoc] Optionally, you may define the Yjs document that receives the data from originDoc
 * @return {Doc}
 */ const $52a83e33f2b9e935$export$5be4ae1e1e56a014 = (originDoc, snapshot, newDoc = new $52a83e33f2b9e935$export$bceacc74c2212615())=>{
    if (originDoc.gc) // we should not try to restore a GC-ed document, because some of the restored items might have their content deleted
    throw new Error("Garbage-collection must be disabled in `originDoc`!");
    const { sv: sv, ds: ds } = snapshot;
    const encoder = new $52a83e33f2b9e935$var$UpdateEncoderV2();
    originDoc.transact((transaction)=>{
        let size = 0;
        sv.forEach((clock)=>{
            if (clock > 0) size++;
        });
        $1p1sv.writeVarUint(encoder.restEncoder, size);
        // splitting the structs before writing them to the encoder
        for (const [client, clock] of sv){
            if (clock === 0) continue;
            if (clock < $52a83e33f2b9e935$export$50fdfeece43146fd(originDoc.store, client)) $52a83e33f2b9e935$var$getItemCleanStart(transaction, $52a83e33f2b9e935$export$6c7d4e6171d008d0(client, clock));
            const structs = originDoc.store.clients.get(client) || [];
            const lastStructIndex = $52a83e33f2b9e935$export$5f8f02523cf47b58(structs, clock - 1);
            // write # encoded structs
            $1p1sv.writeVarUint(encoder.restEncoder, lastStructIndex + 1);
            encoder.writeClient(client);
            // first clock written is 0
            $1p1sv.writeVarUint(encoder.restEncoder, 0);
            for(let i = 0; i <= lastStructIndex; i++)structs[i].write(encoder, 0);
        }
        $52a83e33f2b9e935$var$writeDeleteSet(encoder, ds);
    });
    $52a83e33f2b9e935$export$acc3b0324aabf1b6(newDoc, encoder.toUint8Array(), "snapshot");
    return newDoc;
};
/**
 * @param {Snapshot} snapshot
 * @param {Uint8Array} update
 * @param {typeof UpdateDecoderV2 | typeof UpdateDecoderV1} [YDecoder]
 */ const $52a83e33f2b9e935$var$snapshotContainsUpdateV2 = (snapshot, update, YDecoder = $52a83e33f2b9e935$var$UpdateDecoderV2)=>{
    const updateDecoder = new YDecoder($f5RS8.createDecoder(update));
    const lazyDecoder = new $52a83e33f2b9e935$var$LazyStructReader(updateDecoder, false);
    for(let curr = lazyDecoder.curr; curr !== null; curr = lazyDecoder.next()){
        if ((snapshot.sv.get(curr.id.client) || 0) < curr.id.clock + curr.length) return false;
    }
    const mergedDS = $52a83e33f2b9e935$var$mergeDeleteSets([
        snapshot.ds,
        $52a83e33f2b9e935$var$readDeleteSet(updateDecoder)
    ]);
    return $52a83e33f2b9e935$export$9697b72c46fd3a5d(snapshot.ds, mergedDS);
};
/**
 * @param {Snapshot} snapshot
 * @param {Uint8Array} update
 */ const $52a83e33f2b9e935$export$f938135bed5d8db7 = (snapshot, update)=>$52a83e33f2b9e935$var$snapshotContainsUpdateV2(snapshot, update, $52a83e33f2b9e935$var$UpdateDecoderV1);
class $52a83e33f2b9e935$var$StructStore {
    constructor(){
        /**
     * @type {Map<number,Array<GC|Item>>}
     */ this.clients = new Map();
        /**
     * @type {null | { missing: Map<number, number>, update: Uint8Array }}
     */ this.pendingStructs = null;
        /**
     * @type {null | Uint8Array}
     */ this.pendingDs = null;
    }
}
/**
 * Return the states as a Map<client,clock>.
 * Note that clock refers to the next expected clock id.
 *
 * @param {StructStore} store
 * @return {Map<number,number>}
 *
 * @public
 * @function
 */ const $52a83e33f2b9e935$var$getStateVector = (store)=>{
    const sm = new Map();
    store.clients.forEach((structs, client)=>{
        const struct = structs[structs.length - 1];
        sm.set(client, struct.id.clock + struct.length);
    });
    return sm;
};
/**
 * @param {StructStore} store
 * @param {number} client
 * @return {number}
 *
 * @public
 * @function
 */ const $52a83e33f2b9e935$export$50fdfeece43146fd = (store, client)=>{
    const structs = store.clients.get(client);
    if (structs === undefined) return 0;
    const lastStruct = structs[structs.length - 1];
    return lastStruct.id.clock + lastStruct.length;
};
/**
 * @param {StructStore} store
 * @param {GC|Item} struct
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$addStruct = (store, struct)=>{
    let structs = store.clients.get(struct.id.client);
    if (structs === undefined) {
        structs = [];
        store.clients.set(struct.id.client, structs);
    } else {
        const lastStruct = structs[structs.length - 1];
        if (lastStruct.id.clock + lastStruct.length !== struct.id.clock) throw $akmFO.unexpectedCase();
    }
    structs.push(struct);
};
/**
 * Perform a binary search on a sorted array
 * @param {Array<Item|GC>} structs
 * @param {number} clock
 * @return {number}
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$export$5f8f02523cf47b58 = (structs, clock)=>{
    let left = 0;
    let right = structs.length - 1;
    let mid = structs[right];
    let midclock = mid.id.clock;
    if (midclock === clock) return right;
    // @todo does it even make sense to pivot the search?
    // If a good split misses, it might actually increase the time to find the correct item.
    // Currently, the only advantage is that search with pivoting might find the item on the first try.
    let midindex = $kuitL.floor(clock / (midclock + mid.length - 1) * right); // pivoting the search
    while(left <= right){
        mid = structs[midindex];
        midclock = mid.id.clock;
        if (midclock <= clock) {
            if (clock < midclock + mid.length) return midindex;
            left = midindex + 1;
        } else right = midindex - 1;
        midindex = $kuitL.floor((left + right) / 2);
    }
    // Always check state before looking for a struct in StructStore
    // Therefore the case of not finding a struct is unexpected
    throw $akmFO.unexpectedCase();
};
/**
 * Expects that id is actually in store. This function throws or is an infinite loop otherwise.
 *
 * @param {StructStore} store
 * @param {ID} id
 * @return {GC|Item}
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$find = (store, id)=>{
    /**
   * @type {Array<GC|Item>}
   */ // @ts-ignore
    const structs = store.clients.get(id.client);
    return structs[$52a83e33f2b9e935$export$5f8f02523cf47b58(structs, id.clock)];
};
/**
 * Expects that id is actually in store. This function throws or is an infinite loop otherwise.
 * @private
 * @function
 */ const $52a83e33f2b9e935$export$f92dfeb71e9bb569 = /** @type {function(StructStore,ID):Item} */ $52a83e33f2b9e935$var$find;
/**
 * @param {Transaction} transaction
 * @param {Array<Item|GC>} structs
 * @param {number} clock
 */ const $52a83e33f2b9e935$var$findIndexCleanStart = (transaction, structs, clock)=>{
    const index = $52a83e33f2b9e935$export$5f8f02523cf47b58(structs, clock);
    const struct = structs[index];
    if (struct.id.clock < clock && struct instanceof $52a83e33f2b9e935$export$6d08773d2e66f8f2) {
        structs.splice(index + 1, 0, $52a83e33f2b9e935$var$splitItem(transaction, struct, clock - struct.id.clock));
        return index + 1;
    }
    return index;
};
/**
 * Expects that id is actually in store. This function throws or is an infinite loop otherwise.
 *
 * @param {Transaction} transaction
 * @param {ID} id
 * @return {Item}
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$getItemCleanStart = (transaction, id)=>{
    const structs = /** @type {Array<Item>} */ transaction.doc.store.clients.get(id.client);
    return structs[$52a83e33f2b9e935$var$findIndexCleanStart(transaction, structs, id.clock)];
};
/**
 * Expects that id is actually in store. This function throws or is an infinite loop otherwise.
 *
 * @param {Transaction} transaction
 * @param {StructStore} store
 * @param {ID} id
 * @return {Item}
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$getItemCleanEnd = (transaction, store, id)=>{
    /**
   * @type {Array<Item>}
   */ // @ts-ignore
    const structs = store.clients.get(id.client);
    const index = $52a83e33f2b9e935$export$5f8f02523cf47b58(structs, id.clock);
    const struct = structs[index];
    if (id.clock !== struct.id.clock + struct.length - 1 && struct.constructor !== $52a83e33f2b9e935$export$12d259ff017e6b58) structs.splice(index + 1, 0, $52a83e33f2b9e935$var$splitItem(transaction, struct, id.clock - struct.id.clock + 1));
    return struct;
};
/**
 * Replace `item` with `newitem` in store
 * @param {StructStore} store
 * @param {GC|Item} struct
 * @param {GC|Item} newStruct
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$replaceStruct = (store, struct, newStruct)=>{
    const structs = /** @type {Array<GC|Item>} */ store.clients.get(struct.id.client);
    structs[$52a83e33f2b9e935$export$5f8f02523cf47b58(structs, struct.id.clock)] = newStruct;
};
/**
 * Iterate over a range of structs
 *
 * @param {Transaction} transaction
 * @param {Array<Item|GC>} structs
 * @param {number} clockStart Inclusive start
 * @param {number} len
 * @param {function(GC|Item):void} f
 *
 * @function
 */ const $52a83e33f2b9e935$var$iterateStructs = (transaction, structs, clockStart, len, f)=>{
    if (len === 0) return;
    const clockEnd = clockStart + len;
    let index = $52a83e33f2b9e935$var$findIndexCleanStart(transaction, structs, clockStart);
    let struct;
    do {
        struct = structs[index++];
        if (clockEnd < struct.id.clock + struct.length) $52a83e33f2b9e935$var$findIndexCleanStart(transaction, structs, clockEnd);
        f(struct);
    }while (index < structs.length && structs[index].id.clock < clockEnd);
};
/**
 * A transaction is created for every change on the Yjs model. It is possible
 * to bundle changes on the Yjs model in a single transaction to
 * minimize the number on messages sent and the number of observer calls.
 * If possible the user of this library should bundle as many changes as
 * possible. Here is an example to illustrate the advantages of bundling:
 *
 * @example
 * const map = y.define('map', YMap)
 * // Log content when change is triggered
 * map.observe(() => {
 *   console.log('change triggered')
 * })
 * // Each change on the map type triggers a log message:
 * map.set('a', 0) // => "change triggered"
 * map.set('b', 0) // => "change triggered"
 * // When put in a transaction, it will trigger the log after the transaction:
 * y.transact(() => {
 *   map.set('a', 1)
 *   map.set('b', 1)
 * }) // => "change triggered"
 *
 * @public
 */ class $52a83e33f2b9e935$export$febc5573c75cefb0 {
    /**
   * @param {Doc} doc
   * @param {any} origin
   * @param {boolean} local
   */ constructor(doc, origin, local){
        /**
     * The Yjs instance.
     * @type {Doc}
     */ this.doc = doc;
        /**
     * Describes the set of deleted items by ids
     * @type {DeleteSet}
     */ this.deleteSet = new $52a83e33f2b9e935$var$DeleteSet();
        /**
     * Holds the state before the transaction started.
     * @type {Map<Number,Number>}
     */ this.beforeState = $52a83e33f2b9e935$var$getStateVector(doc.store);
        /**
     * Holds the state after the transaction.
     * @type {Map<Number,Number>}
     */ this.afterState = new Map();
        /**
     * All types that were directly modified (property added or child
     * inserted/deleted). New types are not included in this Set.
     * Maps from type to parentSubs (`item.parentSub = null` for YArray)
     * @type {Map<AbstractType<YEvent<any>>,Set<String|null>>}
     */ this.changed = new Map();
        /**
     * Stores the events for the types that observe also child elements.
     * It is mainly used by `observeDeep`.
     * @type {Map<AbstractType<YEvent<any>>,Array<YEvent<any>>>}
     */ this.changedParentTypes = new Map();
        /**
     * @type {Array<AbstractStruct>}
     */ this._mergeStructs = [];
        /**
     * @type {any}
     */ this.origin = origin;
        /**
     * Stores meta information on the transaction
     * @type {Map<any,any>}
     */ this.meta = new Map();
        /**
     * Whether this change originates from this doc.
     * @type {boolean}
     */ this.local = local;
        /**
     * @type {Set<Doc>}
     */ this.subdocsAdded = new Set();
        /**
     * @type {Set<Doc>}
     */ this.subdocsRemoved = new Set();
        /**
     * @type {Set<Doc>}
     */ this.subdocsLoaded = new Set();
        /**
     * @type {boolean}
     */ this._needFormattingCleanup = false;
    }
}
/**
 * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
 * @param {Transaction} transaction
 * @return {boolean} Whether data was written.
 */ const $52a83e33f2b9e935$var$writeUpdateMessageFromTransaction = (encoder, transaction)=>{
    if (transaction.deleteSet.clients.size === 0 && !$e6DQe.any(transaction.afterState, (clock, client)=>transaction.beforeState.get(client) !== clock)) return false;
    $52a83e33f2b9e935$var$sortAndMergeDeleteSet(transaction.deleteSet);
    $52a83e33f2b9e935$var$writeStructsFromTransaction(encoder, transaction);
    $52a83e33f2b9e935$var$writeDeleteSet(encoder, transaction.deleteSet);
    return true;
};
/**
 * If `type.parent` was added in current transaction, `type` technically
 * did not change, it was just added and we should not fire events for `type`.
 *
 * @param {Transaction} transaction
 * @param {AbstractType<YEvent<any>>} type
 * @param {string|null} parentSub
 */ const $52a83e33f2b9e935$var$addChangedTypeToTransaction = (transaction, type, parentSub)=>{
    const item = type._item;
    if (item === null || item.id.clock < (transaction.beforeState.get(item.id.client) || 0) && !item.deleted) $e6DQe.setIfUndefined(transaction.changed, type, $gB6ZU.create).add(parentSub);
};
/**
 * @param {Array<AbstractStruct>} structs
 * @param {number} pos
 * @return {number} # of merged structs
 */ const $52a83e33f2b9e935$var$tryToMergeWithLefts = (structs, pos)=>{
    let right = structs[pos];
    let left = structs[pos - 1];
    let i = pos;
    for(; i > 0; right = left, left = structs[--i - 1]){
        if (left.deleted === right.deleted && left.constructor === right.constructor) {
            if (left.mergeWith(right)) {
                if (right instanceof $52a83e33f2b9e935$export$6d08773d2e66f8f2 && right.parentSub !== null && /** @type {AbstractType<any>} */ right.parent._map.get(right.parentSub) === right) /** @type {AbstractType<any>} */ right.parent._map.set(right.parentSub, /** @type {Item} */ left);
                continue;
            }
        }
        break;
    }
    const merged = pos - i;
    if (merged) // remove all merged structs from the array
    structs.splice(pos + 1 - merged, merged);
    return merged;
};
/**
 * @param {DeleteSet} ds
 * @param {StructStore} store
 * @param {function(Item):boolean} gcFilter
 */ const $52a83e33f2b9e935$var$tryGcDeleteSet = (ds, store, gcFilter)=>{
    for (const [client, deleteItems] of ds.clients.entries()){
        const structs = /** @type {Array<GC|Item>} */ store.clients.get(client);
        for(let di = deleteItems.length - 1; di >= 0; di--){
            const deleteItem = deleteItems[di];
            const endDeleteItemClock = deleteItem.clock + deleteItem.len;
            for(let si = $52a83e33f2b9e935$export$5f8f02523cf47b58(structs, deleteItem.clock), struct = structs[si]; si < structs.length && struct.id.clock < endDeleteItemClock; struct = structs[++si]){
                const struct = structs[si];
                if (deleteItem.clock + deleteItem.len <= struct.id.clock) break;
                if (struct instanceof $52a83e33f2b9e935$export$6d08773d2e66f8f2 && struct.deleted && !struct.keep && gcFilter(struct)) struct.gc(store, false);
            }
        }
    }
};
/**
 * @param {DeleteSet} ds
 * @param {StructStore} store
 */ const $52a83e33f2b9e935$var$tryMergeDeleteSet = (ds, store)=>{
    // try to merge deleted / gc'd items
    // merge from right to left for better efficiecy and so we don't miss any merge targets
    ds.clients.forEach((deleteItems, client)=>{
        const structs = /** @type {Array<GC|Item>} */ store.clients.get(client);
        for(let di = deleteItems.length - 1; di >= 0; di--){
            const deleteItem = deleteItems[di];
            // start with merging the item next to the last deleted item
            const mostRightIndexToCheck = $kuitL.min(structs.length - 1, 1 + $52a83e33f2b9e935$export$5f8f02523cf47b58(structs, deleteItem.clock + deleteItem.len - 1));
            for(let si = mostRightIndexToCheck, struct = structs[si]; si > 0 && struct.id.clock >= deleteItem.clock; struct = structs[si])si -= 1 + $52a83e33f2b9e935$var$tryToMergeWithLefts(structs, si);
        }
    });
};
/**
 * @param {DeleteSet} ds
 * @param {StructStore} store
 * @param {function(Item):boolean} gcFilter
 */ const $52a83e33f2b9e935$export$c2e5de00fc43f658 = (ds, store, gcFilter)=>{
    $52a83e33f2b9e935$var$tryGcDeleteSet(ds, store, gcFilter);
    $52a83e33f2b9e935$var$tryMergeDeleteSet(ds, store);
};
/**
 * @param {Array<Transaction>} transactionCleanups
 * @param {number} i
 */ const $52a83e33f2b9e935$var$cleanupTransactions = (transactionCleanups, i)=>{
    if (i < transactionCleanups.length) {
        const transaction = transactionCleanups[i];
        const doc = transaction.doc;
        const store = doc.store;
        const ds = transaction.deleteSet;
        const mergeStructs = transaction._mergeStructs;
        try {
            $52a83e33f2b9e935$var$sortAndMergeDeleteSet(ds);
            transaction.afterState = $52a83e33f2b9e935$var$getStateVector(transaction.doc.store);
            doc.emit("beforeObserverCalls", [
                transaction,
                doc
            ]);
            /**
       * An array of event callbacks.
       *
       * Each callback is called even if the other ones throw errors.
       *
       * @type {Array<function():void>}
       */ const fs = [];
            // observe events on changed types
            transaction.changed.forEach((subs, itemtype)=>fs.push(()=>{
                    if (itemtype._item === null || !itemtype._item.deleted) itemtype._callObserver(transaction, subs);
                }));
            fs.push(()=>{
                // deep observe events
                transaction.changedParentTypes.forEach((events, type)=>{
                    // We need to think about the possibility that the user transforms the
                    // Y.Doc in the event.
                    if (type._dEH.l.length > 0 && (type._item === null || !type._item.deleted)) {
                        events = events.filter((event)=>event.target._item === null || !event.target._item.deleted);
                        events.forEach((event)=>{
                            event.currentTarget = type;
                            // path is relative to the current target
                            event._path = null;
                        });
                        // sort events by path length so that top-level events are fired first.
                        events.sort((event1, event2)=>event1.path.length - event2.path.length);
                        // We don't need to check for events.length
                        // because we know it has at least one element
                        $52a83e33f2b9e935$var$callEventHandlerListeners(type._dEH, events, transaction);
                    }
                });
            });
            fs.push(()=>doc.emit("afterTransaction", [
                    transaction,
                    doc
                ]));
            (0, $kXTKb.callAll)(fs, []);
            if (transaction._needFormattingCleanup) $52a83e33f2b9e935$var$cleanupYTextAfterTransaction(transaction);
        } finally{
            // Replace deleted items with ItemDeleted / GC.
            // This is where content is actually remove from the Yjs Doc.
            if (doc.gc) $52a83e33f2b9e935$var$tryGcDeleteSet(ds, store, doc.gcFilter);
            $52a83e33f2b9e935$var$tryMergeDeleteSet(ds, store);
            // on all affected store.clients props, try to merge
            transaction.afterState.forEach((clock, client)=>{
                const beforeClock = transaction.beforeState.get(client) || 0;
                if (beforeClock !== clock) {
                    const structs = /** @type {Array<GC|Item>} */ store.clients.get(client);
                    // we iterate from right to left so we can safely remove entries
                    const firstChangePos = $kuitL.max($52a83e33f2b9e935$export$5f8f02523cf47b58(structs, beforeClock), 1);
                    for(let i = structs.length - 1; i >= firstChangePos;)i -= 1 + $52a83e33f2b9e935$var$tryToMergeWithLefts(structs, i);
                }
            });
            // try to merge mergeStructs
            // @todo: it makes more sense to transform mergeStructs to a DS, sort it, and merge from right to left
            //        but at the moment DS does not handle duplicates
            for(let i = mergeStructs.length - 1; i >= 0; i--){
                const { client: client, clock: clock } = mergeStructs[i].id;
                const structs = /** @type {Array<GC|Item>} */ store.clients.get(client);
                const replacedStructPos = $52a83e33f2b9e935$export$5f8f02523cf47b58(structs, clock);
                if (replacedStructPos + 1 < structs.length) {
                    if ($52a83e33f2b9e935$var$tryToMergeWithLefts(structs, replacedStructPos + 1) > 1) continue; // no need to perform next check, both are already merged
                }
                if (replacedStructPos > 0) $52a83e33f2b9e935$var$tryToMergeWithLefts(structs, replacedStructPos);
            }
            if (!transaction.local && transaction.afterState.get(doc.clientID) !== transaction.beforeState.get(doc.clientID)) {
                $dcfNU.print($7i7Pw.ORANGE, $7i7Pw.BOLD, "[yjs] ", $7i7Pw.UNBOLD, $7i7Pw.RED, "Changed the client-id because another client seems to be using it.");
                doc.clientID = $52a83e33f2b9e935$var$generateNewClientId();
            }
            // @todo Merge all the transactions into one and provide send the data as a single update message
            doc.emit("afterTransactionCleanup", [
                transaction,
                doc
            ]);
            if (doc._observers.has("update")) {
                const encoder = new $52a83e33f2b9e935$export$99171b804d9c5b54();
                const hasContent = $52a83e33f2b9e935$var$writeUpdateMessageFromTransaction(encoder, transaction);
                if (hasContent) doc.emit("update", [
                    encoder.toUint8Array(),
                    transaction.origin,
                    doc,
                    transaction
                ]);
            }
            if (doc._observers.has("updateV2")) {
                const encoder = new $52a83e33f2b9e935$var$UpdateEncoderV2();
                const hasContent = $52a83e33f2b9e935$var$writeUpdateMessageFromTransaction(encoder, transaction);
                if (hasContent) doc.emit("updateV2", [
                    encoder.toUint8Array(),
                    transaction.origin,
                    doc,
                    transaction
                ]);
            }
            const { subdocsAdded: subdocsAdded, subdocsLoaded: subdocsLoaded, subdocsRemoved: subdocsRemoved } = transaction;
            if (subdocsAdded.size > 0 || subdocsRemoved.size > 0 || subdocsLoaded.size > 0) {
                subdocsAdded.forEach((subdoc)=>{
                    subdoc.clientID = doc.clientID;
                    if (subdoc.collectionid == null) subdoc.collectionid = doc.collectionid;
                    doc.subdocs.add(subdoc);
                });
                subdocsRemoved.forEach((subdoc)=>doc.subdocs.delete(subdoc));
                doc.emit("subdocs", [
                    {
                        loaded: subdocsLoaded,
                        added: subdocsAdded,
                        removed: subdocsRemoved
                    },
                    doc,
                    transaction
                ]);
                subdocsRemoved.forEach((subdoc)=>subdoc.destroy());
            }
            if (transactionCleanups.length <= i + 1) {
                doc._transactionCleanups = [];
                doc.emit("afterAllTransactions", [
                    doc,
                    transactionCleanups
                ]);
            } else $52a83e33f2b9e935$var$cleanupTransactions(transactionCleanups, i + 1);
        }
    }
};
/**
 * Implements the functionality of `y.transact(()=>{..})`
 *
 * @template T
 * @param {Doc} doc
 * @param {function(Transaction):T} f
 * @param {any} [origin=true]
 * @return {T}
 *
 * @function
 */ const $52a83e33f2b9e935$export$dac1bad6146b2469 = (doc, f, origin = null, local = true)=>{
    const transactionCleanups = doc._transactionCleanups;
    let initialCall = false;
    /**
   * @type {any}
   */ let result = null;
    if (doc._transaction === null) {
        initialCall = true;
        doc._transaction = new $52a83e33f2b9e935$export$febc5573c75cefb0(doc, origin, local);
        transactionCleanups.push(doc._transaction);
        if (transactionCleanups.length === 1) doc.emit("beforeAllTransactions", [
            doc
        ]);
        doc.emit("beforeTransaction", [
            doc._transaction,
            doc
        ]);
    }
    try {
        result = f(doc._transaction);
    } finally{
        if (initialCall) {
            const finishCleanup = doc._transaction === transactionCleanups[0];
            doc._transaction = null;
            if (finishCleanup) // The first transaction ended, now process observer calls.
            // Observer call may create new transactions for which we need to call the observers and do cleanup.
            // We don't want to nest these calls, so we execute these calls one after
            // another.
            // Also we need to ensure that all cleanups are called, even if the
            // observes throw errors.
            // This file is full of hacky try {} finally {} blocks to ensure that an
            // event can throw errors and also that the cleanup is called.
            $52a83e33f2b9e935$var$cleanupTransactions(transactionCleanups, 0);
        }
    }
    return result;
};
class $52a83e33f2b9e935$var$StackItem {
    /**
   * @param {DeleteSet} deletions
   * @param {DeleteSet} insertions
   */ constructor(deletions, insertions){
        this.insertions = insertions;
        this.deletions = deletions;
        /**
     * Use this to save and restore metadata like selection range
     */ this.meta = new Map();
    }
}
/**
 * @param {Transaction} tr
 * @param {UndoManager} um
 * @param {StackItem} stackItem
 */ const $52a83e33f2b9e935$var$clearUndoManagerStackItem = (tr, um, stackItem)=>{
    $52a83e33f2b9e935$export$8afefebbaf4e4c78(tr, stackItem.deletions, (item)=>{
        if (item instanceof $52a83e33f2b9e935$export$6d08773d2e66f8f2 && um.scope.some((type)=>$52a83e33f2b9e935$export$3c81af374b054d6a(type, item))) $52a83e33f2b9e935$var$keepItem(item, false);
    });
};
/**
 * @param {UndoManager} undoManager
 * @param {Array<StackItem>} stack
 * @param {string} eventType
 * @return {StackItem?}
 */ const $52a83e33f2b9e935$var$popStackItem = (undoManager, stack, eventType)=>{
    /**
   * Whether a change happened
   * @type {StackItem?}
   */ let result = null;
    /**
   * Keep a reference to the transaction so we can fire the event with the changedParentTypes
   * @type {any}
   */ let _tr = null;
    const doc = undoManager.doc;
    const scope = undoManager.scope;
    $52a83e33f2b9e935$export$dac1bad6146b2469(doc, (transaction)=>{
        while(stack.length > 0 && result === null){
            const store = doc.store;
            const stackItem = /** @type {StackItem} */ stack.pop();
            /**
       * @type {Set<Item>}
       */ const itemsToRedo = new Set();
            /**
       * @type {Array<Item>}
       */ const itemsToDelete = [];
            let performedChange = false;
            $52a83e33f2b9e935$export$8afefebbaf4e4c78(transaction, stackItem.insertions, (struct)=>{
                if (struct instanceof $52a83e33f2b9e935$export$6d08773d2e66f8f2) {
                    if (struct.redone !== null) {
                        let { item: item, diff: diff } = $52a83e33f2b9e935$var$followRedone(store, struct.id);
                        if (diff > 0) item = $52a83e33f2b9e935$var$getItemCleanStart(transaction, $52a83e33f2b9e935$export$6c7d4e6171d008d0(item.id.client, item.id.clock + diff));
                        struct = item;
                    }
                    if (!struct.deleted && scope.some((type)=>$52a83e33f2b9e935$export$3c81af374b054d6a(type, /** @type {Item} */ struct))) itemsToDelete.push(struct);
                }
            });
            $52a83e33f2b9e935$export$8afefebbaf4e4c78(transaction, stackItem.deletions, (struct)=>{
                if (struct instanceof $52a83e33f2b9e935$export$6d08773d2e66f8f2 && scope.some((type)=>$52a83e33f2b9e935$export$3c81af374b054d6a(type, struct)) && // Never redo structs in stackItem.insertions because they were created and deleted in the same capture interval.
                !$52a83e33f2b9e935$export$dcb04af092e44fde(stackItem.insertions, struct.id)) itemsToRedo.add(struct);
            });
            itemsToRedo.forEach((struct)=>{
                performedChange = $52a83e33f2b9e935$var$redoItem(transaction, struct, itemsToRedo, stackItem.insertions, undoManager.ignoreRemoteMapChanges, undoManager) !== null || performedChange;
            });
            // We want to delete in reverse order so that children are deleted before
            // parents, so we have more information available when items are filtered.
            for(let i = itemsToDelete.length - 1; i >= 0; i--){
                const item = itemsToDelete[i];
                if (undoManager.deleteFilter(item)) {
                    item.delete(transaction);
                    performedChange = true;
                }
            }
            result = performedChange ? stackItem : null;
        }
        transaction.changed.forEach((subProps, type)=>{
            // destroy search marker if necessary
            if (subProps.has(null) && type._searchMarker) type._searchMarker.length = 0;
        });
        _tr = transaction;
    }, undoManager);
    if (result != null) {
        const changedParentTypes = _tr.changedParentTypes;
        undoManager.emit("stack-item-popped", [
            {
                stackItem: result,
                type: eventType,
                changedParentTypes: changedParentTypes
            },
            undoManager
        ]);
    }
    return result;
};
/**
 * @typedef {Object} UndoManagerOptions
 * @property {number} [UndoManagerOptions.captureTimeout=500]
 * @property {function(Transaction):boolean} [UndoManagerOptions.captureTransaction] Do not capture changes of a Transaction if result false.
 * @property {function(Item):boolean} [UndoManagerOptions.deleteFilter=()=>true] Sometimes
 * it is necessary to filter what an Undo/Redo operation can delete. If this
 * filter returns false, the type/item won't be deleted even it is in the
 * undo/redo scope.
 * @property {Set<any>} [UndoManagerOptions.trackedOrigins=new Set([null])]
 * @property {boolean} [ignoreRemoteMapChanges] Experimental. By default, the UndoManager will never overwrite remote changes. Enable this property to enable overwriting remote changes on key-value changes (Y.Map, properties on Y.Xml, etc..).
 * @property {Doc} [doc] The document that this UndoManager operates on. Only needed if typeScope is empty.
 */ /**
 * Fires 'stack-item-added' event when a stack item was added to either the undo- or
 * the redo-stack. You may store additional stack information via the
 * metadata property on `event.stackItem.meta` (it is a `Map` of metadata properties).
 * Fires 'stack-item-popped' event when a stack item was popped from either the
 * undo- or the redo-stack. You may restore the saved stack information from `event.stackItem.meta`.
 *
 * @extends {Observable<'stack-item-added'|'stack-item-popped'|'stack-cleared'|'stack-item-updated'>}
 */ class $52a83e33f2b9e935$export$932a3f9a7e88971c extends (0, $9XqiC.Observable) {
    /**
   * @param {AbstractType<any>|Array<AbstractType<any>>} typeScope Accepts either a single type, or an array of types
   * @param {UndoManagerOptions} options
   */ constructor(typeScope, { captureTimeout: captureTimeout = 500, captureTransaction: captureTransaction = (_tr)=>true, deleteFilter: deleteFilter = ()=>true, trackedOrigins: trackedOrigins = new Set([
        null
    ]), ignoreRemoteMapChanges: ignoreRemoteMapChanges = false, doc: doc = /** @type {Doc} */ $7sfdv.isArray(typeScope) ? typeScope[0].doc : typeScope.doc } = {}){
        super();
        /**
     * @type {Array<AbstractType<any>>}
     */ this.scope = [];
        this.doc = doc;
        this.addToScope(typeScope);
        this.deleteFilter = deleteFilter;
        trackedOrigins.add(this);
        this.trackedOrigins = trackedOrigins;
        this.captureTransaction = captureTransaction;
        /**
     * @type {Array<StackItem>}
     */ this.undoStack = [];
        /**
     * @type {Array<StackItem>}
     */ this.redoStack = [];
        /**
     * Whether the client is currently undoing (calling UndoManager.undo)
     *
     * @type {boolean}
     */ this.undoing = false;
        this.redoing = false;
        this.lastChange = 0;
        this.ignoreRemoteMapChanges = ignoreRemoteMapChanges;
        this.captureTimeout = captureTimeout;
        /**
     * @param {Transaction} transaction
     */ this.afterTransactionHandler = (transaction)=>{
            // Only track certain transactions
            if (!this.captureTransaction(transaction) || !this.scope.some((type)=>transaction.changedParentTypes.has(type)) || !this.trackedOrigins.has(transaction.origin) && (!transaction.origin || !this.trackedOrigins.has(transaction.origin.constructor))) return;
            const undoing = this.undoing;
            const redoing = this.redoing;
            const stack = undoing ? this.redoStack : this.undoStack;
            if (undoing) this.stopCapturing(); // next undo should not be appended to last stack item
            else if (!redoing) // neither undoing nor redoing: delete redoStack
            this.clear(false, true);
            const insertions = new $52a83e33f2b9e935$var$DeleteSet();
            transaction.afterState.forEach((endClock, client)=>{
                const startClock = transaction.beforeState.get(client) || 0;
                const len = endClock - startClock;
                if (len > 0) $52a83e33f2b9e935$var$addToDeleteSet(insertions, client, startClock, len);
            });
            const now = $1oyOX.getUnixTime();
            let didAdd = false;
            if (this.lastChange > 0 && now - this.lastChange < this.captureTimeout && stack.length > 0 && !undoing && !redoing) {
                // append change to last stack op
                const lastOp = stack[stack.length - 1];
                lastOp.deletions = $52a83e33f2b9e935$var$mergeDeleteSets([
                    lastOp.deletions,
                    transaction.deleteSet
                ]);
                lastOp.insertions = $52a83e33f2b9e935$var$mergeDeleteSets([
                    lastOp.insertions,
                    insertions
                ]);
            } else {
                // create a new stack op
                stack.push(new $52a83e33f2b9e935$var$StackItem(transaction.deleteSet, insertions));
                didAdd = true;
            }
            if (!undoing && !redoing) this.lastChange = now;
            // make sure that deleted structs are not gc'd
            $52a83e33f2b9e935$export$8afefebbaf4e4c78(transaction, transaction.deleteSet, /** @param {Item|GC} item */ (item)=>{
                if (item instanceof $52a83e33f2b9e935$export$6d08773d2e66f8f2 && this.scope.some((type)=>$52a83e33f2b9e935$export$3c81af374b054d6a(type, item))) $52a83e33f2b9e935$var$keepItem(item, true);
            });
            const changeEvent = [
                {
                    stackItem: stack[stack.length - 1],
                    origin: transaction.origin,
                    type: undoing ? "redo" : "undo",
                    changedParentTypes: transaction.changedParentTypes
                },
                this
            ];
            if (didAdd) this.emit("stack-item-added", changeEvent);
            else this.emit("stack-item-updated", changeEvent);
        };
        this.doc.on("afterTransaction", this.afterTransactionHandler);
        this.doc.on("destroy", ()=>{
            this.destroy();
        });
    }
    /**
   * @param {Array<AbstractType<any>> | AbstractType<any>} ytypes
   */ addToScope(ytypes) {
        ytypes = $7sfdv.isArray(ytypes) ? ytypes : [
            ytypes
        ];
        ytypes.forEach((ytype)=>{
            if (this.scope.every((yt)=>yt !== ytype)) {
                if (ytype.doc !== this.doc) $dcfNU.warn("[yjs#509] Not same Y.Doc"); // use MultiDocUndoManager instead. also see https://github.com/yjs/yjs/issues/509
                this.scope.push(ytype);
            }
        });
    }
    /**
   * @param {any} origin
   */ addTrackedOrigin(origin) {
        this.trackedOrigins.add(origin);
    }
    /**
   * @param {any} origin
   */ removeTrackedOrigin(origin) {
        this.trackedOrigins.delete(origin);
    }
    clear(clearUndoStack = true, clearRedoStack = true) {
        if (clearUndoStack && this.canUndo() || clearRedoStack && this.canRedo()) this.doc.transact((tr)=>{
            if (clearUndoStack) {
                this.undoStack.forEach((item)=>$52a83e33f2b9e935$var$clearUndoManagerStackItem(tr, this, item));
                this.undoStack = [];
            }
            if (clearRedoStack) {
                this.redoStack.forEach((item)=>$52a83e33f2b9e935$var$clearUndoManagerStackItem(tr, this, item));
                this.redoStack = [];
            }
            this.emit("stack-cleared", [
                {
                    undoStackCleared: clearUndoStack,
                    redoStackCleared: clearRedoStack
                }
            ]);
        });
    }
    /**
   * UndoManager merges Undo-StackItem if they are created within time-gap
   * smaller than `options.captureTimeout`. Call `um.stopCapturing()` so that the next
   * StackItem won't be merged.
   *
   *
   * @example
   *     // without stopCapturing
   *     ytext.insert(0, 'a')
   *     ytext.insert(1, 'b')
   *     um.undo()
   *     ytext.toString() // => '' (note that 'ab' was removed)
   *     // with stopCapturing
   *     ytext.insert(0, 'a')
   *     um.stopCapturing()
   *     ytext.insert(0, 'b')
   *     um.undo()
   *     ytext.toString() // => 'a' (note that only 'b' was removed)
   *
   */ stopCapturing() {
        this.lastChange = 0;
    }
    /**
   * Undo last changes on type.
   *
   * @return {StackItem?} Returns StackItem if a change was applied
   */ undo() {
        this.undoing = true;
        let res;
        try {
            res = $52a83e33f2b9e935$var$popStackItem(this, this.undoStack, "undo");
        } finally{
            this.undoing = false;
        }
        return res;
    }
    /**
   * Redo last undo operation.
   *
   * @return {StackItem?} Returns StackItem if a change was applied
   */ redo() {
        this.redoing = true;
        let res;
        try {
            res = $52a83e33f2b9e935$var$popStackItem(this, this.redoStack, "redo");
        } finally{
            this.redoing = false;
        }
        return res;
    }
    /**
   * Are undo steps available?
   *
   * @return {boolean} `true` if undo is possible
   */ canUndo() {
        return this.undoStack.length > 0;
    }
    /**
   * Are redo steps available?
   *
   * @return {boolean} `true` if redo is possible
   */ canRedo() {
        return this.redoStack.length > 0;
    }
    destroy() {
        this.trackedOrigins.delete(this);
        this.doc.off("afterTransaction", this.afterTransactionHandler);
        super.destroy();
    }
}
/**
 * @param {UpdateDecoderV1 | UpdateDecoderV2} decoder
 */ function* $52a83e33f2b9e935$var$lazyStructReaderGenerator(decoder) {
    const numOfStateUpdates = $f5RS8.readVarUint(decoder.restDecoder);
    for(let i = 0; i < numOfStateUpdates; i++){
        const numberOfStructs = $f5RS8.readVarUint(decoder.restDecoder);
        const client = decoder.readClient();
        let clock = $f5RS8.readVarUint(decoder.restDecoder);
        for(let i = 0; i < numberOfStructs; i++){
            const info = decoder.readInfo();
            // @todo use switch instead of ifs
            if (info === 10) {
                const len = $f5RS8.readVarUint(decoder.restDecoder);
                yield new $52a83e33f2b9e935$var$Skip($52a83e33f2b9e935$export$6c7d4e6171d008d0(client, clock), len);
                clock += len;
            } else if (($1GdQd.BITS5 & info) !== 0) {
                const cantCopyParentInfo = (info & ($1GdQd.BIT7 | $1GdQd.BIT8)) === 0;
                // If parent = null and neither left nor right are defined, then we know that `parent` is child of `y`
                // and we read the next string as parentYKey.
                // It indicates how we store/retrieve parent from `y.share`
                // @type {string|null}
                const struct = new $52a83e33f2b9e935$export$6d08773d2e66f8f2($52a83e33f2b9e935$export$6c7d4e6171d008d0(client, clock), null, (info & $1GdQd.BIT8) === $1GdQd.BIT8 ? decoder.readLeftID() : null, null, (info & $1GdQd.BIT7) === $1GdQd.BIT7 ? decoder.readRightID() : null, // @ts-ignore Force writing a string here.
                cantCopyParentInfo ? decoder.readParentInfo() ? decoder.readString() : decoder.readLeftID() : null, cantCopyParentInfo && (info & $1GdQd.BIT6) === $1GdQd.BIT6 ? decoder.readString() : null, $52a83e33f2b9e935$var$readItemContent(decoder, info) // item content
                );
                yield struct;
                clock += struct.length;
            } else {
                const len = decoder.readLen();
                yield new $52a83e33f2b9e935$export$12d259ff017e6b58($52a83e33f2b9e935$export$6c7d4e6171d008d0(client, clock), len);
                clock += len;
            }
        }
    }
}
class $52a83e33f2b9e935$var$LazyStructReader {
    /**
   * @param {UpdateDecoderV1 | UpdateDecoderV2} decoder
   * @param {boolean} filterSkips
   */ constructor(decoder, filterSkips){
        this.gen = $52a83e33f2b9e935$var$lazyStructReaderGenerator(decoder);
        /**
     * @type {null | Item | Skip | GC}
     */ this.curr = null;
        this.done = false;
        this.filterSkips = filterSkips;
        this.next();
    }
    /**
   * @return {Item | GC | Skip |null}
   */ next() {
        // ignore "Skip" structs
        do this.curr = this.gen.next().value || null;
        while (this.filterSkips && this.curr !== null && this.curr.constructor === $52a83e33f2b9e935$var$Skip);
        return this.curr;
    }
}
/**
 * @param {Uint8Array} update
 *
 */ const $52a83e33f2b9e935$export$d6235ced6e55ace9 = (update)=>$52a83e33f2b9e935$export$624b3f0248c2dc40(update, $52a83e33f2b9e935$var$UpdateDecoderV1);
/**
 * @param {Uint8Array} update
 * @param {typeof UpdateDecoderV2 | typeof UpdateDecoderV1} [YDecoder]
 *
 */ const $52a83e33f2b9e935$export$624b3f0248c2dc40 = (update, YDecoder = $52a83e33f2b9e935$var$UpdateDecoderV2)=>{
    const structs = [];
    const updateDecoder = new YDecoder($f5RS8.createDecoder(update));
    const lazyDecoder = new $52a83e33f2b9e935$var$LazyStructReader(updateDecoder, false);
    for(let curr = lazyDecoder.curr; curr !== null; curr = lazyDecoder.next())structs.push(curr);
    $dcfNU.print("Structs: ", structs);
    const ds = $52a83e33f2b9e935$var$readDeleteSet(updateDecoder);
    $dcfNU.print("DeleteSet: ", ds);
};
/**
 * @param {Uint8Array} update
 *
 */ const $52a83e33f2b9e935$export$aa45cba8121663dc = (update)=>$52a83e33f2b9e935$export$2fed33908eb23d71(update, $52a83e33f2b9e935$var$UpdateDecoderV1);
/**
 * @param {Uint8Array} update
 * @param {typeof UpdateDecoderV2 | typeof UpdateDecoderV1} [YDecoder]
 *
 */ const $52a83e33f2b9e935$export$2fed33908eb23d71 = (update, YDecoder = $52a83e33f2b9e935$var$UpdateDecoderV2)=>{
    const structs = [];
    const updateDecoder = new YDecoder($f5RS8.createDecoder(update));
    const lazyDecoder = new $52a83e33f2b9e935$var$LazyStructReader(updateDecoder, false);
    for(let curr = lazyDecoder.curr; curr !== null; curr = lazyDecoder.next())structs.push(curr);
    return {
        structs: structs,
        ds: $52a83e33f2b9e935$var$readDeleteSet(updateDecoder)
    };
};
class $52a83e33f2b9e935$var$LazyStructWriter {
    /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   */ constructor(encoder){
        this.currClient = 0;
        this.startClock = 0;
        this.written = 0;
        this.encoder = encoder;
        /**
     * We want to write operations lazily, but also we need to know beforehand how many operations we want to write for each client.
     *
     * This kind of meta-information (#clients, #structs-per-client-written) is written to the restEncoder.
     *
     * We fragment the restEncoder and store a slice of it per-client until we know how many clients there are.
     * When we flush (toUint8Array) we write the restEncoder using the fragments and the meta-information.
     *
     * @type {Array<{ written: number, restEncoder: Uint8Array }>}
     */ this.clientStructs = [];
    }
}
/**
 * @param {Array<Uint8Array>} updates
 * @return {Uint8Array}
 */ const $52a83e33f2b9e935$export$6319871659fd2460 = (updates)=>$52a83e33f2b9e935$export$ce273d78de0331d1(updates, $52a83e33f2b9e935$var$UpdateDecoderV1, $52a83e33f2b9e935$export$99171b804d9c5b54);
/**
 * @param {Uint8Array} update
 * @param {typeof DSEncoderV1 | typeof DSEncoderV2} YEncoder
 * @param {typeof UpdateDecoderV1 | typeof UpdateDecoderV2} YDecoder
 * @return {Uint8Array}
 */ const $52a83e33f2b9e935$export$ed51750cf3ab2381 = (update, YEncoder = $52a83e33f2b9e935$var$DSEncoderV2, YDecoder = $52a83e33f2b9e935$var$UpdateDecoderV2)=>{
    const encoder = new YEncoder();
    const updateDecoder = new $52a83e33f2b9e935$var$LazyStructReader(new YDecoder($f5RS8.createDecoder(update)), false);
    let curr = updateDecoder.curr;
    if (curr !== null) {
        let size = 0;
        let currClient = curr.id.client;
        let stopCounting = curr.id.clock !== 0; // must start at 0
        let currClock = stopCounting ? 0 : curr.id.clock + curr.length;
        for(; curr !== null; curr = updateDecoder.next()){
            if (currClient !== curr.id.client) {
                if (currClock !== 0) {
                    size++;
                    // We found a new client
                    // write what we have to the encoder
                    $1p1sv.writeVarUint(encoder.restEncoder, currClient);
                    $1p1sv.writeVarUint(encoder.restEncoder, currClock);
                }
                currClient = curr.id.client;
                currClock = 0;
                stopCounting = curr.id.clock !== 0;
            }
            // we ignore skips
            if (curr.constructor === $52a83e33f2b9e935$var$Skip) stopCounting = true;
            if (!stopCounting) currClock = curr.id.clock + curr.length;
        }
        // write what we have
        if (currClock !== 0) {
            size++;
            $1p1sv.writeVarUint(encoder.restEncoder, currClient);
            $1p1sv.writeVarUint(encoder.restEncoder, currClock);
        }
        // prepend the size of the state vector
        const enc = $1p1sv.createEncoder();
        $1p1sv.writeVarUint(enc, size);
        $1p1sv.writeBinaryEncoder(enc, encoder.restEncoder);
        encoder.restEncoder = enc;
        return encoder.toUint8Array();
    } else {
        $1p1sv.writeVarUint(encoder.restEncoder, 0);
        return encoder.toUint8Array();
    }
};
/**
 * @param {Uint8Array} update
 * @return {Uint8Array}
 */ const $52a83e33f2b9e935$export$5c451fd8502b011f = (update)=>$52a83e33f2b9e935$export$ed51750cf3ab2381(update, $52a83e33f2b9e935$var$DSEncoderV1, $52a83e33f2b9e935$var$UpdateDecoderV1);
/**
 * @param {Uint8Array} update
 * @param {typeof UpdateDecoderV1 | typeof UpdateDecoderV2} YDecoder
 * @return {{ from: Map<number,number>, to: Map<number,number> }}
 */ const $52a83e33f2b9e935$export$8212a58b2178fdcf = (update, YDecoder = $52a83e33f2b9e935$var$UpdateDecoderV2)=>{
    /**
   * @type {Map<number, number>}
   */ const from = new Map();
    /**
   * @type {Map<number, number>}
   */ const to = new Map();
    const updateDecoder = new $52a83e33f2b9e935$var$LazyStructReader(new YDecoder($f5RS8.createDecoder(update)), false);
    let curr = updateDecoder.curr;
    if (curr !== null) {
        let currClient = curr.id.client;
        let currClock = curr.id.clock;
        // write the beginning to `from`
        from.set(currClient, currClock);
        for(; curr !== null; curr = updateDecoder.next()){
            if (currClient !== curr.id.client) {
                // We found a new client
                // write the end to `to`
                to.set(currClient, currClock);
                // write the beginning to `from`
                from.set(curr.id.client, curr.id.clock);
                // update currClient
                currClient = curr.id.client;
            }
            currClock = curr.id.clock + curr.length;
        }
        // write the end to `to`
        to.set(currClient, currClock);
    }
    return {
        from: from,
        to: to
    };
};
/**
 * @param {Uint8Array} update
 * @return {{ from: Map<number,number>, to: Map<number,number> }}
 */ const $52a83e33f2b9e935$export$e212b06fd4bf78fd = (update)=>$52a83e33f2b9e935$export$8212a58b2178fdcf(update, $52a83e33f2b9e935$var$UpdateDecoderV1);
/**
 * This method is intended to slice any kind of struct and retrieve the right part.
 * It does not handle side-effects, so it should only be used by the lazy-encoder.
 *
 * @param {Item | GC | Skip} left
 * @param {number} diff
 * @return {Item | GC}
 */ const $52a83e33f2b9e935$var$sliceStruct = (left, diff)=>{
    if (left.constructor === $52a83e33f2b9e935$export$12d259ff017e6b58) {
        const { client: client, clock: clock } = left.id;
        return new $52a83e33f2b9e935$export$12d259ff017e6b58($52a83e33f2b9e935$export$6c7d4e6171d008d0(client, clock + diff), left.length - diff);
    } else if (left.constructor === $52a83e33f2b9e935$var$Skip) {
        const { client: client, clock: clock } = left.id;
        return new $52a83e33f2b9e935$var$Skip($52a83e33f2b9e935$export$6c7d4e6171d008d0(client, clock + diff), left.length - diff);
    } else {
        const leftItem = /** @type {Item} */ left;
        const { client: client, clock: clock } = leftItem.id;
        return new $52a83e33f2b9e935$export$6d08773d2e66f8f2($52a83e33f2b9e935$export$6c7d4e6171d008d0(client, clock + diff), null, $52a83e33f2b9e935$export$6c7d4e6171d008d0(client, clock + diff - 1), null, leftItem.rightOrigin, leftItem.parent, leftItem.parentSub, leftItem.content.splice(diff));
    }
};
/**
 *
 * This function works similarly to `readUpdateV2`.
 *
 * @param {Array<Uint8Array>} updates
 * @param {typeof UpdateDecoderV1 | typeof UpdateDecoderV2} [YDecoder]
 * @param {typeof UpdateEncoderV1 | typeof UpdateEncoderV2} [YEncoder]
 * @return {Uint8Array}
 */ const $52a83e33f2b9e935$export$ce273d78de0331d1 = (updates, YDecoder = $52a83e33f2b9e935$var$UpdateDecoderV2, YEncoder = $52a83e33f2b9e935$var$UpdateEncoderV2)=>{
    if (updates.length === 1) return updates[0];
    const updateDecoders = updates.map((update)=>new YDecoder($f5RS8.createDecoder(update)));
    let lazyStructDecoders = updateDecoders.map((decoder)=>new $52a83e33f2b9e935$var$LazyStructReader(decoder, true));
    /**
   * @todo we don't need offset because we always slice before
   * @type {null | { struct: Item | GC | Skip, offset: number }}
   */ let currWrite = null;
    const updateEncoder = new YEncoder();
    // write structs lazily
    const lazyStructEncoder = new $52a83e33f2b9e935$var$LazyStructWriter(updateEncoder);
    // Note: We need to ensure that all lazyStructDecoders are fully consumed
    // Note: Should merge document updates whenever possible - even from different updates
    // Note: Should handle that some operations cannot be applied yet ()
    while(true){
        // Write higher clients first ⇒ sort by clientID & clock and remove decoders without content
        lazyStructDecoders = lazyStructDecoders.filter((dec)=>dec.curr !== null);
        lazyStructDecoders.sort(/** @type {function(any,any):number} */ (dec1, dec2)=>{
            if (dec1.curr.id.client === dec2.curr.id.client) {
                const clockDiff = dec1.curr.id.clock - dec2.curr.id.clock;
                if (clockDiff === 0) // @todo remove references to skip since the structDecoders must filter Skips.
                return dec1.curr.constructor === dec2.curr.constructor ? 0 : dec1.curr.constructor === $52a83e33f2b9e935$var$Skip ? 1 : -1 // we are filtering skips anyway.
                ;
                else return clockDiff;
            } else return dec2.curr.id.client - dec1.curr.id.client;
        });
        if (lazyStructDecoders.length === 0) break;
        const currDecoder = lazyStructDecoders[0];
        // write from currDecoder until the next operation is from another client or if filler-struct
        // then we need to reorder the decoders and find the next operation to write
        const firstClient = /** @type {Item | GC} */ currDecoder.curr.id.client;
        if (currWrite !== null) {
            let curr = /** @type {Item | GC | null} */ currDecoder.curr;
            let iterated = false;
            // iterate until we find something that we haven't written already
            // remember: first the high client-ids are written
            while(curr !== null && curr.id.clock + curr.length <= currWrite.struct.id.clock + currWrite.struct.length && curr.id.client >= currWrite.struct.id.client){
                curr = currDecoder.next();
                iterated = true;
            }
            if (curr === null || // current decoder is empty
            curr.id.client !== firstClient || // check whether there is another decoder that has has updates from `firstClient`
            iterated && curr.id.clock > currWrite.struct.id.clock + currWrite.struct.length // the above while loop was used and we are potentially missing updates
            ) continue;
            if (firstClient !== currWrite.struct.id.client) {
                $52a83e33f2b9e935$var$writeStructToLazyStructWriter(lazyStructEncoder, currWrite.struct, currWrite.offset);
                currWrite = {
                    struct: curr,
                    offset: 0
                };
                currDecoder.next();
            } else if (currWrite.struct.id.clock + currWrite.struct.length < curr.id.clock) {
                // @todo write currStruct & set currStruct = Skip(clock = currStruct.id.clock + currStruct.length, length = curr.id.clock - self.clock)
                if (currWrite.struct.constructor === $52a83e33f2b9e935$var$Skip) // extend existing skip
                currWrite.struct.length = curr.id.clock + curr.length - currWrite.struct.id.clock;
                else {
                    $52a83e33f2b9e935$var$writeStructToLazyStructWriter(lazyStructEncoder, currWrite.struct, currWrite.offset);
                    const diff = curr.id.clock - currWrite.struct.id.clock - currWrite.struct.length;
                    /**
             * @type {Skip}
             */ const struct = new $52a83e33f2b9e935$var$Skip($52a83e33f2b9e935$export$6c7d4e6171d008d0(firstClient, currWrite.struct.id.clock + currWrite.struct.length), diff);
                    currWrite = {
                        struct: struct,
                        offset: 0
                    };
                }
            } else {
                const diff = currWrite.struct.id.clock + currWrite.struct.length - curr.id.clock;
                if (diff > 0) {
                    if (currWrite.struct.constructor === $52a83e33f2b9e935$var$Skip) // prefer to slice Skip because the other struct might contain more information
                    currWrite.struct.length -= diff;
                    else curr = $52a83e33f2b9e935$var$sliceStruct(curr, diff);
                }
                if (!currWrite.struct.mergeWith(/** @type {any} */ curr)) {
                    $52a83e33f2b9e935$var$writeStructToLazyStructWriter(lazyStructEncoder, currWrite.struct, currWrite.offset);
                    currWrite = {
                        struct: curr,
                        offset: 0
                    };
                    currDecoder.next();
                }
            }
        } else {
            currWrite = {
                struct: /** @type {Item | GC} */ currDecoder.curr,
                offset: 0
            };
            currDecoder.next();
        }
        for(let next = currDecoder.curr; next !== null && next.id.client === firstClient && next.id.clock === currWrite.struct.id.clock + currWrite.struct.length && next.constructor !== $52a83e33f2b9e935$var$Skip; next = currDecoder.next()){
            $52a83e33f2b9e935$var$writeStructToLazyStructWriter(lazyStructEncoder, currWrite.struct, currWrite.offset);
            currWrite = {
                struct: next,
                offset: 0
            };
        }
    }
    if (currWrite !== null) {
        $52a83e33f2b9e935$var$writeStructToLazyStructWriter(lazyStructEncoder, currWrite.struct, currWrite.offset);
        currWrite = null;
    }
    $52a83e33f2b9e935$var$finishLazyStructWriting(lazyStructEncoder);
    const dss = updateDecoders.map((decoder)=>$52a83e33f2b9e935$var$readDeleteSet(decoder));
    const ds = $52a83e33f2b9e935$var$mergeDeleteSets(dss);
    $52a83e33f2b9e935$var$writeDeleteSet(updateEncoder, ds);
    return updateEncoder.toUint8Array();
};
/**
 * @param {Uint8Array} update
 * @param {Uint8Array} sv
 * @param {typeof UpdateDecoderV1 | typeof UpdateDecoderV2} [YDecoder]
 * @param {typeof UpdateEncoderV1 | typeof UpdateEncoderV2} [YEncoder]
 */ const $52a83e33f2b9e935$export$a8143edf39d2ad8e = (update, sv, YDecoder = $52a83e33f2b9e935$var$UpdateDecoderV2, YEncoder = $52a83e33f2b9e935$var$UpdateEncoderV2)=>{
    const state = $52a83e33f2b9e935$export$324ac6fb20a844e3(sv);
    const encoder = new YEncoder();
    const lazyStructWriter = new $52a83e33f2b9e935$var$LazyStructWriter(encoder);
    const decoder = new YDecoder($f5RS8.createDecoder(update));
    const reader = new $52a83e33f2b9e935$var$LazyStructReader(decoder, false);
    while(reader.curr){
        const curr = reader.curr;
        const currClient = curr.id.client;
        const svClock = state.get(currClient) || 0;
        if (reader.curr.constructor === $52a83e33f2b9e935$var$Skip) {
            // the first written struct shouldn't be a skip
            reader.next();
            continue;
        }
        if (curr.id.clock + curr.length > svClock) {
            $52a83e33f2b9e935$var$writeStructToLazyStructWriter(lazyStructWriter, curr, $kuitL.max(svClock - curr.id.clock, 0));
            reader.next();
            while(reader.curr && reader.curr.id.client === currClient){
                $52a83e33f2b9e935$var$writeStructToLazyStructWriter(lazyStructWriter, reader.curr, 0);
                reader.next();
            }
        } else // read until something new comes up
        while(reader.curr && reader.curr.id.client === currClient && reader.curr.id.clock + reader.curr.length <= svClock)reader.next();
    }
    $52a83e33f2b9e935$var$finishLazyStructWriting(lazyStructWriter);
    // write ds
    const ds = $52a83e33f2b9e935$var$readDeleteSet(decoder);
    $52a83e33f2b9e935$var$writeDeleteSet(encoder, ds);
    return encoder.toUint8Array();
};
/**
 * @param {Uint8Array} update
 * @param {Uint8Array} sv
 */ const $52a83e33f2b9e935$export$bf60b51d6c283426 = (update, sv)=>$52a83e33f2b9e935$export$a8143edf39d2ad8e(update, sv, $52a83e33f2b9e935$var$UpdateDecoderV1, $52a83e33f2b9e935$export$99171b804d9c5b54);
/**
 * @param {LazyStructWriter} lazyWriter
 */ const $52a83e33f2b9e935$var$flushLazyStructWriter = (lazyWriter)=>{
    if (lazyWriter.written > 0) {
        lazyWriter.clientStructs.push({
            written: lazyWriter.written,
            restEncoder: $1p1sv.toUint8Array(lazyWriter.encoder.restEncoder)
        });
        lazyWriter.encoder.restEncoder = $1p1sv.createEncoder();
        lazyWriter.written = 0;
    }
};
/**
 * @param {LazyStructWriter} lazyWriter
 * @param {Item | GC} struct
 * @param {number} offset
 */ const $52a83e33f2b9e935$var$writeStructToLazyStructWriter = (lazyWriter, struct, offset)=>{
    // flush curr if we start another client
    if (lazyWriter.written > 0 && lazyWriter.currClient !== struct.id.client) $52a83e33f2b9e935$var$flushLazyStructWriter(lazyWriter);
    if (lazyWriter.written === 0) {
        lazyWriter.currClient = struct.id.client;
        // write next client
        lazyWriter.encoder.writeClient(struct.id.client);
        // write startClock
        $1p1sv.writeVarUint(lazyWriter.encoder.restEncoder, struct.id.clock + offset);
    }
    struct.write(lazyWriter.encoder, offset);
    lazyWriter.written++;
};
/**
 * Call this function when we collected all parts and want to
 * put all the parts together. After calling this method,
 * you can continue using the UpdateEncoder.
 *
 * @param {LazyStructWriter} lazyWriter
 */ const $52a83e33f2b9e935$var$finishLazyStructWriting = (lazyWriter)=>{
    $52a83e33f2b9e935$var$flushLazyStructWriter(lazyWriter);
    // this is a fresh encoder because we called flushCurr
    const restEncoder = lazyWriter.encoder.restEncoder;
    /**
   * Now we put all the fragments together.
   * This works similarly to `writeClientsStructs`
   */ // write # states that were updated - i.e. the clients
    $1p1sv.writeVarUint(restEncoder, lazyWriter.clientStructs.length);
    for(let i = 0; i < lazyWriter.clientStructs.length; i++){
        const partStructs = lazyWriter.clientStructs[i];
        /**
     * Works similarly to `writeStructs`
     */ // write # encoded structs
        $1p1sv.writeVarUint(restEncoder, partStructs.written);
        // write the rest of the fragment
        $1p1sv.writeUint8Array(restEncoder, partStructs.restEncoder);
    }
};
/**
 * @param {Uint8Array} update
 * @param {function(Item|GC|Skip):Item|GC|Skip} blockTransformer
 * @param {typeof UpdateDecoderV2 | typeof UpdateDecoderV1} YDecoder
 * @param {typeof UpdateEncoderV2 | typeof UpdateEncoderV1 } YEncoder
 */ const $52a83e33f2b9e935$var$convertUpdateFormat = (update, blockTransformer, YDecoder, YEncoder)=>{
    const updateDecoder = new YDecoder($f5RS8.createDecoder(update));
    const lazyDecoder = new $52a83e33f2b9e935$var$LazyStructReader(updateDecoder, false);
    const updateEncoder = new YEncoder();
    const lazyWriter = new $52a83e33f2b9e935$var$LazyStructWriter(updateEncoder);
    for(let curr = lazyDecoder.curr; curr !== null; curr = lazyDecoder.next())$52a83e33f2b9e935$var$writeStructToLazyStructWriter(lazyWriter, blockTransformer(curr), 0);
    $52a83e33f2b9e935$var$finishLazyStructWriting(lazyWriter);
    const ds = $52a83e33f2b9e935$var$readDeleteSet(updateDecoder);
    $52a83e33f2b9e935$var$writeDeleteSet(updateEncoder, ds);
    return updateEncoder.toUint8Array();
};
/**
 * @typedef {Object} ObfuscatorOptions
 * @property {boolean} [ObfuscatorOptions.formatting=true]
 * @property {boolean} [ObfuscatorOptions.subdocs=true]
 * @property {boolean} [ObfuscatorOptions.yxml=true] Whether to obfuscate nodeName / hookName
 */ /**
 * @param {ObfuscatorOptions} obfuscator
 */ const $52a83e33f2b9e935$var$createObfuscator = ({ formatting: formatting = true, subdocs: subdocs = true, yxml: yxml = true } = {})=>{
    let i = 0;
    const mapKeyCache = $e6DQe.create();
    const nodeNameCache = $e6DQe.create();
    const formattingKeyCache = $e6DQe.create();
    const formattingValueCache = $e6DQe.create();
    formattingValueCache.set(null, null); // end of a formatting range should always be the end of a formatting range
    /**
   * @param {Item|GC|Skip} block
   * @return {Item|GC|Skip}
   */ return (block)=>{
        switch(block.constructor){
            case $52a83e33f2b9e935$export$12d259ff017e6b58:
            case $52a83e33f2b9e935$var$Skip:
                return block;
            case $52a83e33f2b9e935$export$6d08773d2e66f8f2:
                {
                    const item = /** @type {Item} */ block;
                    const content = item.content;
                    switch(content.constructor){
                        case $52a83e33f2b9e935$export$3b06e0b3a2ece602:
                            break;
                        case $52a83e33f2b9e935$export$e2e108cbe2e4f865:
                            if (yxml) {
                                const type = /** @type {ContentType} */ content.type;
                                if (type instanceof $52a83e33f2b9e935$export$4db87581d3ca170d) type.nodeName = $e6DQe.setIfUndefined(nodeNameCache, type.nodeName, ()=>"node-" + i);
                                if (type instanceof $52a83e33f2b9e935$export$ec64c1dd5e7a264) type.hookName = $e6DQe.setIfUndefined(nodeNameCache, type.hookName, ()=>"hook-" + i);
                            }
                            break;
                        case $52a83e33f2b9e935$export$1d788b93bbb631a0:
                            {
                                const c = /** @type {ContentAny} */ content;
                                c.arr = c.arr.map(()=>i);
                                break;
                            }
                        case $52a83e33f2b9e935$export$e8d530cdf62d1cbd:
                            {
                                const c = /** @type {ContentBinary} */ content;
                                c.content = new Uint8Array([
                                    i
                                ]);
                                break;
                            }
                        case $52a83e33f2b9e935$var$ContentDoc:
                            {
                                const c = /** @type {ContentDoc} */ content;
                                if (subdocs) {
                                    c.opts = {};
                                    c.doc.guid = i + "";
                                }
                                break;
                            }
                        case $52a83e33f2b9e935$export$c3787ba7f6086664:
                            {
                                const c = /** @type {ContentEmbed} */ content;
                                c.embed = {};
                                break;
                            }
                        case $52a83e33f2b9e935$export$3194899188fb5a88:
                            {
                                const c = /** @type {ContentFormat} */ content;
                                if (formatting) {
                                    c.key = $e6DQe.setIfUndefined(formattingKeyCache, c.key, ()=>i + "");
                                    c.value = $e6DQe.setIfUndefined(formattingValueCache, c.value, ()=>({
                                            i: i
                                        }));
                                }
                                break;
                            }
                        case $52a83e33f2b9e935$export$6a907ea8f733ecf3:
                            {
                                const c = /** @type {ContentJSON} */ content;
                                c.arr = c.arr.map(()=>i);
                                break;
                            }
                        case $52a83e33f2b9e935$export$ee670b2cf091bbb6:
                            {
                                const c = /** @type {ContentString} */ content;
                                c.str = $6rcMi.repeat(i % 10 + "", c.str.length);
                                break;
                            }
                        default:
                            // unknown content type
                            $akmFO.unexpectedCase();
                    }
                    if (item.parentSub) item.parentSub = $e6DQe.setIfUndefined(mapKeyCache, item.parentSub, ()=>i + "");
                    i++;
                    return block;
                }
            default:
                // unknown block-type
                $akmFO.unexpectedCase();
        }
    };
};
/**
 * This function obfuscates the content of a Yjs update. This is useful to share
 * buggy Yjs documents while significantly limiting the possibility that a
 * developer can on the user. Note that it might still be possible to deduce
 * some information by analyzing the "structure" of the document or by analyzing
 * the typing behavior using the CRDT-related metadata that is still kept fully
 * intact.
 *
 * @param {Uint8Array} update
 * @param {ObfuscatorOptions} [opts]
 */ const $52a83e33f2b9e935$export$2dc24d59ec48a24e = (update, opts)=>$52a83e33f2b9e935$var$convertUpdateFormat(update, $52a83e33f2b9e935$var$createObfuscator(opts), $52a83e33f2b9e935$var$UpdateDecoderV1, $52a83e33f2b9e935$export$99171b804d9c5b54);
/**
 * @param {Uint8Array} update
 * @param {ObfuscatorOptions} [opts]
 */ const $52a83e33f2b9e935$export$90648fb14f8c31aa = (update, opts)=>$52a83e33f2b9e935$var$convertUpdateFormat(update, $52a83e33f2b9e935$var$createObfuscator(opts), $52a83e33f2b9e935$var$UpdateDecoderV2, $52a83e33f2b9e935$var$UpdateEncoderV2);
/**
 * @param {Uint8Array} update
 */ const $52a83e33f2b9e935$export$162408325d5832c = (update)=>$52a83e33f2b9e935$var$convertUpdateFormat(update, $kXTKb.id, $52a83e33f2b9e935$var$UpdateDecoderV1, $52a83e33f2b9e935$var$UpdateEncoderV2);
/**
 * @param {Uint8Array} update
 */ const $52a83e33f2b9e935$export$afffbdeed14adbd = (update)=>$52a83e33f2b9e935$var$convertUpdateFormat(update, $kXTKb.id, $52a83e33f2b9e935$var$UpdateDecoderV2, $52a83e33f2b9e935$export$99171b804d9c5b54);
const $52a83e33f2b9e935$var$errorComputeChanges = "You must not compute changes after the event-handler fired.";
/**
 * @template {AbstractType<any>} T
 * YEvent describes the changes on a YType.
 */ class $52a83e33f2b9e935$export$80fac438977fb51c {
    /**
   * @param {T} target The changed type.
   * @param {Transaction} transaction
   */ constructor(target, transaction){
        /**
     * The type on which this event was created on.
     * @type {T}
     */ this.target = target;
        /**
     * The current target on which the observe callback is called.
     * @type {AbstractType<any>}
     */ this.currentTarget = target;
        /**
     * The transaction that triggered this event.
     * @type {Transaction}
     */ this.transaction = transaction;
        /**
     * @type {Object|null}
     */ this._changes = null;
        /**
     * @type {null | Map<string, { action: 'add' | 'update' | 'delete', oldValue: any, newValue: any }>}
     */ this._keys = null;
        /**
     * @type {null | Array<{ insert?: string | Array<any> | object | AbstractType<any>, retain?: number, delete?: number, attributes?: Object<string, any> }>}
     */ this._delta = null;
        /**
     * @type {Array<string|number>|null}
     */ this._path = null;
    }
    /**
   * Computes the path from `y` to the changed type.
   *
   * @todo v14 should standardize on path: Array<{parent, index}> because that is easier to work with.
   *
   * The following property holds:
   * @example
   *   let type = y
   *   event.path.forEach(dir => {
   *     type = type.get(dir)
   *   })
   *   type === event.target // => true
   */ get path() {
        return this._path || (this._path = $52a83e33f2b9e935$var$getPathTo(this.currentTarget, this.target));
    }
    /**
   * Check if a struct is deleted by this event.
   *
   * In contrast to change.deleted, this method also returns true if the struct was added and then deleted.
   *
   * @param {AbstractStruct} struct
   * @return {boolean}
   */ deletes(struct) {
        return $52a83e33f2b9e935$export$dcb04af092e44fde(this.transaction.deleteSet, struct.id);
    }
    /**
   * @type {Map<string, { action: 'add' | 'update' | 'delete', oldValue: any, newValue: any }>}
   */ get keys() {
        if (this._keys === null) {
            if (this.transaction.doc._transactionCleanups.length === 0) throw $akmFO.create($52a83e33f2b9e935$var$errorComputeChanges);
            const keys = new Map();
            const target = this.target;
            const changed = /** @type Set<string|null> */ this.transaction.changed.get(target);
            changed.forEach((key)=>{
                if (key !== null) {
                    const item = /** @type {Item} */ target._map.get(key);
                    /**
           * @type {'delete' | 'add' | 'update'}
           */ let action;
                    let oldValue;
                    if (this.adds(item)) {
                        let prev = item.left;
                        while(prev !== null && this.adds(prev))prev = prev.left;
                        if (this.deletes(item)) {
                            if (prev !== null && this.deletes(prev)) {
                                action = "delete";
                                oldValue = $7sfdv.last(prev.content.getContent());
                            } else return;
                        } else if (prev !== null && this.deletes(prev)) {
                            action = "update";
                            oldValue = $7sfdv.last(prev.content.getContent());
                        } else {
                            action = "add";
                            oldValue = undefined;
                        }
                    } else {
                        if (this.deletes(item)) {
                            action = "delete";
                            oldValue = $7sfdv.last(/** @type {Item} */ item.content.getContent());
                        } else return; // nop
                    }
                    keys.set(key, {
                        action: action,
                        oldValue: oldValue
                    });
                }
            });
            this._keys = keys;
        }
        return this._keys;
    }
    /**
   * This is a computed property. Note that this can only be safely computed during the
   * event call. Computing this property after other changes happened might result in
   * unexpected behavior (incorrect computation of deltas). A safe way to collect changes
   * is to store the `changes` or the `delta` object. Avoid storing the `transaction` object.
   *
   * @type {Array<{insert?: string | Array<any> | object | AbstractType<any>, retain?: number, delete?: number, attributes?: Object<string, any>}>}
   */ get delta() {
        return this.changes.delta;
    }
    /**
   * Check if a struct is added by this event.
   *
   * In contrast to change.deleted, this method also returns true if the struct was added and then deleted.
   *
   * @param {AbstractStruct} struct
   * @return {boolean}
   */ adds(struct) {
        return struct.id.clock >= (this.transaction.beforeState.get(struct.id.client) || 0);
    }
    /**
   * This is a computed property. Note that this can only be safely computed during the
   * event call. Computing this property after other changes happened might result in
   * unexpected behavior (incorrect computation of deltas). A safe way to collect changes
   * is to store the `changes` or the `delta` object. Avoid storing the `transaction` object.
   *
   * @type {{added:Set<Item>,deleted:Set<Item>,keys:Map<string,{action:'add'|'update'|'delete',oldValue:any}>,delta:Array<{insert?:Array<any>|string, delete?:number, retain?:number}>}}
   */ get changes() {
        let changes = this._changes;
        if (changes === null) {
            if (this.transaction.doc._transactionCleanups.length === 0) throw $akmFO.create($52a83e33f2b9e935$var$errorComputeChanges);
            const target = this.target;
            const added = $gB6ZU.create();
            const deleted = $gB6ZU.create();
            /**
       * @type {Array<{insert:Array<any>}|{delete:number}|{retain:number}>}
       */ const delta = [];
            changes = {
                added: added,
                deleted: deleted,
                delta: delta,
                keys: this.keys
            };
            const changed = /** @type Set<string|null> */ this.transaction.changed.get(target);
            if (changed.has(null)) {
                /**
         * @type {any}
         */ let lastOp = null;
                const packOp = ()=>{
                    if (lastOp) delta.push(lastOp);
                };
                for(let item = target._start; item !== null; item = item.right){
                    if (item.deleted) {
                        if (this.deletes(item) && !this.adds(item)) {
                            if (lastOp === null || lastOp.delete === undefined) {
                                packOp();
                                lastOp = {
                                    delete: 0
                                };
                            }
                            lastOp.delete += item.length;
                            deleted.add(item);
                        } // else nop
                    } else if (this.adds(item)) {
                        if (lastOp === null || lastOp.insert === undefined) {
                            packOp();
                            lastOp = {
                                insert: []
                            };
                        }
                        lastOp.insert = lastOp.insert.concat(item.content.getContent());
                        added.add(item);
                    } else {
                        if (lastOp === null || lastOp.retain === undefined) {
                            packOp();
                            lastOp = {
                                retain: 0
                            };
                        }
                        lastOp.retain += item.length;
                    }
                }
                if (lastOp !== null && lastOp.retain === undefined) packOp();
            }
            this._changes = changes;
        }
        return /** @type {any} */ changes;
    }
}
/**
 * Compute the path from this type to the specified target.
 *
 * @example
 *   // `child` should be accessible via `type.get(path[0]).get(path[1])..`
 *   const path = type.getPathTo(child)
 *   // assuming `type instanceof YArray`
 *   console.log(path) // might look like => [2, 'key1']
 *   child === type.get(path[0]).get(path[1])
 *
 * @param {AbstractType<any>} parent
 * @param {AbstractType<any>} child target
 * @return {Array<string|number>} Path to the target
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$getPathTo = (parent, child)=>{
    const path = [];
    while(child._item !== null && child !== parent){
        if (child._item.parentSub !== null) // parent is map-ish
        path.unshift(child._item.parentSub);
        else {
            // parent is array-ish
            let i = 0;
            let c = /** @type {AbstractType<any>} */ child._item.parent._start;
            while(c !== child._item && c !== null){
                if (!c.deleted) i++;
                c = c.right;
            }
            path.unshift(i);
        }
        child = /** @type {AbstractType<any>} */ child._item.parent;
    }
    return path;
};
const $52a83e33f2b9e935$var$maxSearchMarker = 80;
/**
 * A unique timestamp that identifies each marker.
 *
 * Time is relative,.. this is more like an ever-increasing clock.
 *
 * @type {number}
 */ let $52a83e33f2b9e935$var$globalSearchMarkerTimestamp = 0;
class $52a83e33f2b9e935$var$ArraySearchMarker {
    /**
   * @param {Item} p
   * @param {number} index
   */ constructor(p, index){
        p.marker = true;
        this.p = p;
        this.index = index;
        this.timestamp = $52a83e33f2b9e935$var$globalSearchMarkerTimestamp++;
    }
}
/**
 * @param {ArraySearchMarker} marker
 */ const $52a83e33f2b9e935$var$refreshMarkerTimestamp = (marker)=>{
    marker.timestamp = $52a83e33f2b9e935$var$globalSearchMarkerTimestamp++;
};
/**
 * This is rather complex so this function is the only thing that should overwrite a marker
 *
 * @param {ArraySearchMarker} marker
 * @param {Item} p
 * @param {number} index
 */ const $52a83e33f2b9e935$var$overwriteMarker = (marker, p, index)=>{
    marker.p.marker = false;
    marker.p = p;
    p.marker = true;
    marker.index = index;
    marker.timestamp = $52a83e33f2b9e935$var$globalSearchMarkerTimestamp++;
};
/**
 * @param {Array<ArraySearchMarker>} searchMarker
 * @param {Item} p
 * @param {number} index
 */ const $52a83e33f2b9e935$var$markPosition = (searchMarker, p, index)=>{
    if (searchMarker.length >= $52a83e33f2b9e935$var$maxSearchMarker) {
        // override oldest marker (we don't want to create more objects)
        const marker = searchMarker.reduce((a, b)=>a.timestamp < b.timestamp ? a : b);
        $52a83e33f2b9e935$var$overwriteMarker(marker, p, index);
        return marker;
    } else {
        // create new marker
        const pm = new $52a83e33f2b9e935$var$ArraySearchMarker(p, index);
        searchMarker.push(pm);
        return pm;
    }
};
/**
 * Search marker help us to find positions in the associative array faster.
 *
 * They speed up the process of finding a position without much bookkeeping.
 *
 * A maximum of `maxSearchMarker` objects are created.
 *
 * This function always returns a refreshed marker (updated timestamp)
 *
 * @param {AbstractType<any>} yarray
 * @param {number} index
 */ const $52a83e33f2b9e935$var$findMarker = (yarray, index)=>{
    if (yarray._start === null || index === 0 || yarray._searchMarker === null) return null;
    const marker = yarray._searchMarker.length === 0 ? null : yarray._searchMarker.reduce((a, b)=>$kuitL.abs(index - a.index) < $kuitL.abs(index - b.index) ? a : b);
    let p = yarray._start;
    let pindex = 0;
    if (marker !== null) {
        p = marker.p;
        pindex = marker.index;
        $52a83e33f2b9e935$var$refreshMarkerTimestamp(marker); // we used it, we might need to use it again
    }
    // iterate to right if possible
    while(p.right !== null && pindex < index){
        if (!p.deleted && p.countable) {
            if (index < pindex + p.length) break;
            pindex += p.length;
        }
        p = p.right;
    }
    // iterate to left if necessary (might be that pindex > index)
    while(p.left !== null && pindex > index){
        p = p.left;
        if (!p.deleted && p.countable) pindex -= p.length;
    }
    // we want to make sure that p can't be merged with left, because that would screw up everything
    // in that cas just return what we have (it is most likely the best marker anyway)
    // iterate to left until p can't be merged with left
    while(p.left !== null && p.left.id.client === p.id.client && p.left.id.clock + p.left.length === p.id.clock){
        p = p.left;
        if (!p.deleted && p.countable) pindex -= p.length;
    }
    // @todo remove!
    // assure position
    // {
    //   let start = yarray._start
    //   let pos = 0
    //   while (start !== p) {
    //     if (!start.deleted && start.countable) {
    //       pos += start.length
    //     }
    //     start = /** @type {Item} */ (start.right)
    //   }
    //   if (pos !== pindex) {
    //     debugger
    //     throw new Error('Gotcha position fail!')
    //   }
    // }
    // if (marker) {
    //   if (window.lengthes == null) {
    //     window.lengthes = []
    //     window.getLengthes = () => window.lengthes.sort((a, b) => a - b)
    //   }
    //   window.lengthes.push(marker.index - pindex)
    //   console.log('distance', marker.index - pindex, 'len', p && p.parent.length)
    // }
    if (marker !== null && $kuitL.abs(marker.index - pindex) < /** @type {YText|YArray<any>} */ p.parent.length / $52a83e33f2b9e935$var$maxSearchMarker) {
        // adjust existing marker
        $52a83e33f2b9e935$var$overwriteMarker(marker, p, pindex);
        return marker;
    } else // create new marker
    return $52a83e33f2b9e935$var$markPosition(yarray._searchMarker, p, pindex);
};
/**
 * Update markers when a change happened.
 *
 * This should be called before doing a deletion!
 *
 * @param {Array<ArraySearchMarker>} searchMarker
 * @param {number} index
 * @param {number} len If insertion, len is positive. If deletion, len is negative.
 */ const $52a83e33f2b9e935$var$updateMarkerChanges = (searchMarker, index, len)=>{
    for(let i = searchMarker.length - 1; i >= 0; i--){
        const m = searchMarker[i];
        if (len > 0) {
            /**
       * @type {Item|null}
       */ let p = m.p;
            p.marker = false;
            // Ideally we just want to do a simple position comparison, but this will only work if
            // search markers don't point to deleted items for formats.
            // Iterate marker to prev undeleted countable position so we know what to do when updating a position
            while(p && (p.deleted || !p.countable)){
                p = p.left;
                if (p && !p.deleted && p.countable) // adjust position. the loop should break now
                m.index -= p.length;
            }
            if (p === null || p.marker === true) {
                // remove search marker if updated position is null or if position is already marked
                searchMarker.splice(i, 1);
                continue;
            }
            m.p = p;
            p.marker = true;
        }
        if (index < m.index || len > 0 && index === m.index) m.index = $kuitL.max(index, m.index + len);
    }
};
/**
 * Accumulate all (list) children of a type and return them as an Array.
 *
 * @param {AbstractType<any>} t
 * @return {Array<Item>}
 */ const $52a83e33f2b9e935$export$5418d693f13991b3 = (t)=>{
    let s = t._start;
    const arr = [];
    while(s){
        arr.push(s);
        s = s.right;
    }
    return arr;
};
/**
 * Call event listeners with an event. This will also add an event to all
 * parents (for `.observeDeep` handlers).
 *
 * @template EventType
 * @param {AbstractType<EventType>} type
 * @param {Transaction} transaction
 * @param {EventType} event
 */ const $52a83e33f2b9e935$var$callTypeObservers = (type, transaction, event)=>{
    const changedType = type;
    const changedParentTypes = transaction.changedParentTypes;
    while(true){
        // @ts-ignore
        $e6DQe.setIfUndefined(changedParentTypes, type, ()=>[]).push(event);
        if (type._item === null) break;
        type = /** @type {AbstractType<any>} */ type._item.parent;
    }
    $52a83e33f2b9e935$var$callEventHandlerListeners(changedType._eH, event, transaction);
};
/**
 * @template EventType
 * Abstract Yjs Type class
 */ class $52a83e33f2b9e935$export$c265dc8338484497 {
    constructor(){
        /**
     * @type {Item|null}
     */ this._item = null;
        /**
     * @type {Map<string,Item>}
     */ this._map = new Map();
        /**
     * @type {Item|null}
     */ this._start = null;
        /**
     * @type {Doc|null}
     */ this.doc = null;
        this._length = 0;
        /**
     * Event handlers
     * @type {EventHandler<EventType,Transaction>}
     */ this._eH = $52a83e33f2b9e935$var$createEventHandler();
        /**
     * Deep event handlers
     * @type {EventHandler<Array<YEvent<any>>,Transaction>}
     */ this._dEH = $52a83e33f2b9e935$var$createEventHandler();
        /**
     * @type {null | Array<ArraySearchMarker>}
     */ this._searchMarker = null;
    }
    /**
   * @return {AbstractType<any>|null}
   */ get parent() {
        return this._item ? /** @type {AbstractType<any>} */ this._item.parent : null;
    }
    /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item|null} item
   */ _integrate(y, item) {
        this.doc = y;
        this._item = item;
    }
    /**
   * @return {AbstractType<EventType>}
   */ _copy() {
        throw $akmFO.methodUnimplemented();
    }
    /**
   * @return {AbstractType<EventType>}
   */ clone() {
        throw $akmFO.methodUnimplemented();
    }
    /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} _encoder
   */ _write(_encoder) {}
    /**
   * The first non-deleted item
   */ get _first() {
        let n = this._start;
        while(n !== null && n.deleted)n = n.right;
        return n;
    }
    /**
   * Creates YEvent and calls all type observers.
   * Must be implemented by each type.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} _parentSubs Keys changed on this type. `null` if list was modified.
   */ _callObserver(transaction, _parentSubs) {
        if (!transaction.local && this._searchMarker) this._searchMarker.length = 0;
    }
    /**
   * Observe all events that are created on this type.
   *
   * @param {function(EventType, Transaction):void} f Observer function
   */ observe(f) {
        $52a83e33f2b9e935$var$addEventHandlerListener(this._eH, f);
    }
    /**
   * Observe all events that are created by this type and its children.
   *
   * @param {function(Array<YEvent<any>>,Transaction):void} f Observer function
   */ observeDeep(f) {
        $52a83e33f2b9e935$var$addEventHandlerListener(this._dEH, f);
    }
    /**
   * Unregister an observer function.
   *
   * @param {function(EventType,Transaction):void} f Observer function
   */ unobserve(f) {
        $52a83e33f2b9e935$var$removeEventHandlerListener(this._eH, f);
    }
    /**
   * Unregister an observer function.
   *
   * @param {function(Array<YEvent<any>>,Transaction):void} f Observer function
   */ unobserveDeep(f) {
        $52a83e33f2b9e935$var$removeEventHandlerListener(this._dEH, f);
    }
    /**
   * @abstract
   * @return {any}
   */ toJSON() {}
}
/**
 * @param {AbstractType<any>} type
 * @param {number} start
 * @param {number} end
 * @return {Array<any>}
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$typeListSlice = (type, start, end)=>{
    if (start < 0) start = type._length + start;
    if (end < 0) end = type._length + end;
    let len = end - start;
    const cs = [];
    let n = type._start;
    while(n !== null && len > 0){
        if (n.countable && !n.deleted) {
            const c = n.content.getContent();
            if (c.length <= start) start -= c.length;
            else {
                for(let i = start; i < c.length && len > 0; i++){
                    cs.push(c[i]);
                    len--;
                }
                start = 0;
            }
        }
        n = n.right;
    }
    return cs;
};
/**
 * @param {AbstractType<any>} type
 * @return {Array<any>}
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$typeListToArray = (type)=>{
    const cs = [];
    let n = type._start;
    while(n !== null){
        if (n.countable && !n.deleted) {
            const c = n.content.getContent();
            for(let i = 0; i < c.length; i++)cs.push(c[i]);
        }
        n = n.right;
    }
    return cs;
};
/**
 * @param {AbstractType<any>} type
 * @param {Snapshot} snapshot
 * @return {Array<any>}
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$export$9de42b6dda4c7e48 = (type, snapshot)=>{
    const cs = [];
    let n = type._start;
    while(n !== null){
        if (n.countable && $52a83e33f2b9e935$var$isVisible(n, snapshot)) {
            const c = n.content.getContent();
            for(let i = 0; i < c.length; i++)cs.push(c[i]);
        }
        n = n.right;
    }
    return cs;
};
/**
 * Executes a provided function on once on overy element of this YArray.
 *
 * @param {AbstractType<any>} type
 * @param {function(any,number,any):void} f A function to execute on every element of this YArray.
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$typeListForEach = (type, f)=>{
    let index = 0;
    let n = type._start;
    while(n !== null){
        if (n.countable && !n.deleted) {
            const c = n.content.getContent();
            for(let i = 0; i < c.length; i++)f(c[i], index++, type);
        }
        n = n.right;
    }
};
/**
 * @template C,R
 * @param {AbstractType<any>} type
 * @param {function(C,number,AbstractType<any>):R} f
 * @return {Array<R>}
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$typeListMap = (type, f)=>{
    /**
   * @type {Array<any>}
   */ const result = [];
    $52a83e33f2b9e935$var$typeListForEach(type, (c, i)=>{
        result.push(f(c, i, type));
    });
    return result;
};
/**
 * @param {AbstractType<any>} type
 * @return {IterableIterator<any>}
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$typeListCreateIterator = (type)=>{
    let n = type._start;
    /**
   * @type {Array<any>|null}
   */ let currentContent = null;
    let currentContentIndex = 0;
    return {
        [Symbol.iterator] () {
            return this;
        },
        next: ()=>{
            // find some content
            if (currentContent === null) {
                while(n !== null && n.deleted)n = n.right;
                // check if we reached the end, no need to check currentContent, because it does not exist
                if (n === null) return {
                    done: true,
                    value: undefined
                };
                // we found n, so we can set currentContent
                currentContent = n.content.getContent();
                currentContentIndex = 0;
                n = n.right; // we used the content of n, now iterate to next
            }
            const value = currentContent[currentContentIndex++];
            // check if we need to empty currentContent
            if (currentContent.length <= currentContentIndex) currentContent = null;
            return {
                done: false,
                value: value
            };
        }
    };
};
/**
 * @param {AbstractType<any>} type
 * @param {number} index
 * @return {any}
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$typeListGet = (type, index)=>{
    const marker = $52a83e33f2b9e935$var$findMarker(type, index);
    let n = type._start;
    if (marker !== null) {
        n = marker.p;
        index -= marker.index;
    }
    for(; n !== null; n = n.right)if (!n.deleted && n.countable) {
        if (index < n.length) return n.content.getContent()[index];
        index -= n.length;
    }
};
/**
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {Item?} referenceItem
 * @param {Array<Object<string,any>|Array<any>|boolean|number|null|string|Uint8Array>} content
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$typeListInsertGenericsAfter = (transaction, parent, referenceItem, content)=>{
    let left = referenceItem;
    const doc = transaction.doc;
    const ownClientId = doc.clientID;
    const store = doc.store;
    const right = referenceItem === null ? parent._start : referenceItem.right;
    /**
   * @type {Array<Object|Array<any>|number|null>}
   */ let jsonContent = [];
    const packJsonContent = ()=>{
        if (jsonContent.length > 0) {
            left = new $52a83e33f2b9e935$export$6d08773d2e66f8f2($52a83e33f2b9e935$export$6c7d4e6171d008d0(ownClientId, $52a83e33f2b9e935$export$50fdfeece43146fd(store, ownClientId)), left, left && left.lastId, right, right && right.id, parent, null, new $52a83e33f2b9e935$export$1d788b93bbb631a0(jsonContent));
            left.integrate(transaction, 0);
            jsonContent = [];
        }
    };
    content.forEach((c)=>{
        if (c === null) jsonContent.push(c);
        else switch(c.constructor){
            case Number:
            case Object:
            case Boolean:
            case Array:
            case String:
                jsonContent.push(c);
                break;
            default:
                packJsonContent();
                switch(c.constructor){
                    case Uint8Array:
                    case ArrayBuffer:
                        left = new $52a83e33f2b9e935$export$6d08773d2e66f8f2($52a83e33f2b9e935$export$6c7d4e6171d008d0(ownClientId, $52a83e33f2b9e935$export$50fdfeece43146fd(store, ownClientId)), left, left && left.lastId, right, right && right.id, parent, null, new $52a83e33f2b9e935$export$e8d530cdf62d1cbd(new Uint8Array(/** @type {Uint8Array} */ c)));
                        left.integrate(transaction, 0);
                        break;
                    case $52a83e33f2b9e935$export$bceacc74c2212615:
                        left = new $52a83e33f2b9e935$export$6d08773d2e66f8f2($52a83e33f2b9e935$export$6c7d4e6171d008d0(ownClientId, $52a83e33f2b9e935$export$50fdfeece43146fd(store, ownClientId)), left, left && left.lastId, right, right && right.id, parent, null, new $52a83e33f2b9e935$var$ContentDoc(/** @type {Doc} */ c));
                        left.integrate(transaction, 0);
                        break;
                    default:
                        if (c instanceof $52a83e33f2b9e935$export$c265dc8338484497) {
                            left = new $52a83e33f2b9e935$export$6d08773d2e66f8f2($52a83e33f2b9e935$export$6c7d4e6171d008d0(ownClientId, $52a83e33f2b9e935$export$50fdfeece43146fd(store, ownClientId)), left, left && left.lastId, right, right && right.id, parent, null, new $52a83e33f2b9e935$export$e2e108cbe2e4f865(c));
                            left.integrate(transaction, 0);
                        } else throw new Error("Unexpected content type in insert operation");
                }
        }
    });
    packJsonContent();
};
const $52a83e33f2b9e935$var$lengthExceeded = ()=>$akmFO.create("Length exceeded!");
/**
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {number} index
 * @param {Array<Object<string,any>|Array<any>|number|null|string|Uint8Array>} content
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$typeListInsertGenerics = (transaction, parent, index, content)=>{
    if (index > parent._length) throw $52a83e33f2b9e935$var$lengthExceeded();
    if (index === 0) {
        if (parent._searchMarker) $52a83e33f2b9e935$var$updateMarkerChanges(parent._searchMarker, index, content.length);
        return $52a83e33f2b9e935$var$typeListInsertGenericsAfter(transaction, parent, null, content);
    }
    const startIndex = index;
    const marker = $52a83e33f2b9e935$var$findMarker(parent, index);
    let n = parent._start;
    if (marker !== null) {
        n = marker.p;
        index -= marker.index;
        // we need to iterate one to the left so that the algorithm works
        if (index === 0) {
            // @todo refactor this as it actually doesn't consider formats
            n = n.prev; // important! get the left undeleted item so that we can actually decrease index
            index += n && n.countable && !n.deleted ? n.length : 0;
        }
    }
    for(; n !== null; n = n.right)if (!n.deleted && n.countable) {
        if (index <= n.length) {
            if (index < n.length) // insert in-between
            $52a83e33f2b9e935$var$getItemCleanStart(transaction, $52a83e33f2b9e935$export$6c7d4e6171d008d0(n.id.client, n.id.clock + index));
            break;
        }
        index -= n.length;
    }
    if (parent._searchMarker) $52a83e33f2b9e935$var$updateMarkerChanges(parent._searchMarker, startIndex, content.length);
    return $52a83e33f2b9e935$var$typeListInsertGenericsAfter(transaction, parent, n, content);
};
/**
 * Pushing content is special as we generally want to push after the last item. So we don't have to update
 * the serach marker.
 *
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {Array<Object<string,any>|Array<any>|number|null|string|Uint8Array>} content
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$typeListPushGenerics = (transaction, parent, content)=>{
    // Use the marker with the highest index and iterate to the right.
    const marker = (parent._searchMarker || []).reduce((maxMarker, currMarker)=>currMarker.index > maxMarker.index ? currMarker : maxMarker, {
        index: 0,
        p: parent._start
    });
    let n = marker.p;
    if (n) while(n.right)n = n.right;
    return $52a83e33f2b9e935$var$typeListInsertGenericsAfter(transaction, parent, n, content);
};
/**
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {number} index
 * @param {number} length
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$typeListDelete = (transaction, parent, index, length)=>{
    if (length === 0) return;
    const startIndex = index;
    const startLength = length;
    const marker = $52a83e33f2b9e935$var$findMarker(parent, index);
    let n = parent._start;
    if (marker !== null) {
        n = marker.p;
        index -= marker.index;
    }
    // compute the first item to be deleted
    for(; n !== null && index > 0; n = n.right)if (!n.deleted && n.countable) {
        if (index < n.length) $52a83e33f2b9e935$var$getItemCleanStart(transaction, $52a83e33f2b9e935$export$6c7d4e6171d008d0(n.id.client, n.id.clock + index));
        index -= n.length;
    }
    // delete all items until done
    while(length > 0 && n !== null){
        if (!n.deleted) {
            if (length < n.length) $52a83e33f2b9e935$var$getItemCleanStart(transaction, $52a83e33f2b9e935$export$6c7d4e6171d008d0(n.id.client, n.id.clock + length));
            n.delete(transaction);
            length -= n.length;
        }
        n = n.right;
    }
    if (length > 0) throw $52a83e33f2b9e935$var$lengthExceeded();
    if (parent._searchMarker) $52a83e33f2b9e935$var$updateMarkerChanges(parent._searchMarker, startIndex, -startLength + length /* in case we remove the above exception */ );
};
/**
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {string} key
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$typeMapDelete = (transaction, parent, key)=>{
    const c = parent._map.get(key);
    if (c !== undefined) c.delete(transaction);
};
/**
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {string} key
 * @param {Object|number|null|Array<any>|string|Uint8Array|AbstractType<any>} value
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$typeMapSet = (transaction, parent, key, value)=>{
    const left = parent._map.get(key) || null;
    const doc = transaction.doc;
    const ownClientId = doc.clientID;
    let content;
    if (value == null) content = new $52a83e33f2b9e935$export$1d788b93bbb631a0([
        value
    ]);
    else switch(value.constructor){
        case Number:
        case Object:
        case Boolean:
        case Array:
        case String:
            content = new $52a83e33f2b9e935$export$1d788b93bbb631a0([
                value
            ]);
            break;
        case Uint8Array:
            content = new $52a83e33f2b9e935$export$e8d530cdf62d1cbd(/** @type {Uint8Array} */ value);
            break;
        case $52a83e33f2b9e935$export$bceacc74c2212615:
            content = new $52a83e33f2b9e935$var$ContentDoc(/** @type {Doc} */ value);
            break;
        default:
            if (value instanceof $52a83e33f2b9e935$export$c265dc8338484497) content = new $52a83e33f2b9e935$export$e2e108cbe2e4f865(value);
            else throw new Error("Unexpected content type");
    }
    new $52a83e33f2b9e935$export$6d08773d2e66f8f2($52a83e33f2b9e935$export$6c7d4e6171d008d0(ownClientId, $52a83e33f2b9e935$export$50fdfeece43146fd(doc.store, ownClientId)), left, left && left.lastId, null, null, parent, key, content).integrate(transaction, 0);
};
/**
 * @param {AbstractType<any>} parent
 * @param {string} key
 * @return {Object<string,any>|number|null|Array<any>|string|Uint8Array|AbstractType<any>|undefined}
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$typeMapGet = (parent, key)=>{
    const val = parent._map.get(key);
    return val !== undefined && !val.deleted ? val.content.getContent()[val.length - 1] : undefined;
};
/**
 * @param {AbstractType<any>} parent
 * @return {Object<string,Object<string,any>|number|null|Array<any>|string|Uint8Array|AbstractType<any>|undefined>}
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$typeMapGetAll = (parent)=>{
    /**
   * @type {Object<string,any>}
   */ const res = {};
    parent._map.forEach((value, key)=>{
        if (!value.deleted) res[key] = value.content.getContent()[value.length - 1];
    });
    return res;
};
/**
 * @param {AbstractType<any>} parent
 * @param {string} key
 * @return {boolean}
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$typeMapHas = (parent, key)=>{
    const val = parent._map.get(key);
    return val !== undefined && !val.deleted;
};
/**
 * @param {AbstractType<any>} parent
 * @param {string} key
 * @param {Snapshot} snapshot
 * @return {Object<string,any>|number|null|Array<any>|string|Uint8Array|AbstractType<any>|undefined}
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$export$a7c089bf6c22a1db = (parent, key, snapshot)=>{
    let v = parent._map.get(key) || null;
    while(v !== null && (!snapshot.sv.has(v.id.client) || v.id.clock >= (snapshot.sv.get(v.id.client) || 0)))v = v.left;
    return v !== null && $52a83e33f2b9e935$var$isVisible(v, snapshot) ? v.content.getContent()[v.length - 1] : undefined;
};
/**
 * @param {Map<string,Item>} map
 * @return {IterableIterator<Array<any>>}
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$createMapIterator = (map)=>$aP2RX.iteratorFilter(map.entries(), /** @param {any} entry */ (entry)=>!entry[1].deleted);
/**
 * @module YArray
 */ /**
 * Event that describes the changes on a YArray
 * @template T
 * @extends YEvent<YArray<T>>
 */ class $52a83e33f2b9e935$export$a095f7fee639264a extends $52a83e33f2b9e935$export$80fac438977fb51c {
    /**
   * @param {YArray<T>} yarray The changed type
   * @param {Transaction} transaction The transaction object
   */ constructor(yarray, transaction){
        super(yarray, transaction);
        this._transaction = transaction;
    }
}
/**
 * A shared Array implementation.
 * @template T
 * @extends AbstractType<YArrayEvent<T>>
 * @implements {Iterable<T>}
 */ class $52a83e33f2b9e935$export$c4be6576ca6fe4aa extends $52a83e33f2b9e935$export$c265dc8338484497 {
    constructor(){
        super();
        /**
     * @type {Array<any>?}
     * @private
     */ this._prelimContent = [];
        /**
     * @type {Array<ArraySearchMarker>}
     */ this._searchMarker = [];
    }
    /**
   * Construct a new YArray containing the specified items.
   * @template {Object<string,any>|Array<any>|number|null|string|Uint8Array} T
   * @param {Array<T>} items
   * @return {YArray<T>}
   */ static from(items) {
        /**
     * @type {YArray<T>}
     */ const a = new $52a83e33f2b9e935$export$c4be6576ca6fe4aa();
        a.push(items);
        return a;
    }
    /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item} item
   */ _integrate(y, item) {
        super._integrate(y, item);
        this.insert(0, /** @type {Array<any>} */ this._prelimContent);
        this._prelimContent = null;
    }
    /**
   * @return {YArray<T>}
   */ _copy() {
        return new $52a83e33f2b9e935$export$c4be6576ca6fe4aa();
    }
    /**
   * @return {YArray<T>}
   */ clone() {
        /**
     * @type {YArray<T>}
     */ const arr = new $52a83e33f2b9e935$export$c4be6576ca6fe4aa();
        arr.insert(0, this.toArray().map((el)=>el instanceof $52a83e33f2b9e935$export$c265dc8338484497 ? /** @type {typeof el} */ el.clone() : el));
        return arr;
    }
    get length() {
        return this._prelimContent === null ? this._length : this._prelimContent.length;
    }
    /**
   * Creates YArrayEvent and calls observers.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
   */ _callObserver(transaction, parentSubs) {
        super._callObserver(transaction, parentSubs);
        $52a83e33f2b9e935$var$callTypeObservers(this, transaction, new $52a83e33f2b9e935$export$a095f7fee639264a(this, transaction));
    }
    /**
   * Inserts new content at an index.
   *
   * Important: This function expects an array of content. Not just a content
   * object. The reason for this "weirdness" is that inserting several elements
   * is very efficient when it is done as a single operation.
   *
   * @example
   *  // Insert character 'a' at position 0
   *  yarray.insert(0, ['a'])
   *  // Insert numbers 1, 2 at position 1
   *  yarray.insert(1, [1, 2])
   *
   * @param {number} index The index to insert content at.
   * @param {Array<T>} content The array of content
   */ insert(index, content) {
        if (this.doc !== null) $52a83e33f2b9e935$export$dac1bad6146b2469(this.doc, (transaction)=>{
            $52a83e33f2b9e935$var$typeListInsertGenerics(transaction, this, index, /** @type {any} */ content);
        });
        else /** @type {Array<any>} */ this._prelimContent.splice(index, 0, ...content);
    }
    /**
   * Appends content to this YArray.
   *
   * @param {Array<T>} content Array of content to append.
   *
   * @todo Use the following implementation in all types.
   */ push(content) {
        if (this.doc !== null) $52a83e33f2b9e935$export$dac1bad6146b2469(this.doc, (transaction)=>{
            $52a83e33f2b9e935$var$typeListPushGenerics(transaction, this, /** @type {any} */ content);
        });
        else /** @type {Array<any>} */ this._prelimContent.push(...content);
    }
    /**
   * Preppends content to this YArray.
   *
   * @param {Array<T>} content Array of content to preppend.
   */ unshift(content) {
        this.insert(0, content);
    }
    /**
   * Deletes elements starting from an index.
   *
   * @param {number} index Index at which to start deleting elements
   * @param {number} length The number of elements to remove. Defaults to 1.
   */ delete(index, length = 1) {
        if (this.doc !== null) $52a83e33f2b9e935$export$dac1bad6146b2469(this.doc, (transaction)=>{
            $52a83e33f2b9e935$var$typeListDelete(transaction, this, index, length);
        });
        else /** @type {Array<any>} */ this._prelimContent.splice(index, length);
    }
    /**
   * Returns the i-th element from a YArray.
   *
   * @param {number} index The index of the element to return from the YArray
   * @return {T}
   */ get(index) {
        return $52a83e33f2b9e935$var$typeListGet(this, index);
    }
    /**
   * Transforms this YArray to a JavaScript Array.
   *
   * @return {Array<T>}
   */ toArray() {
        return $52a83e33f2b9e935$var$typeListToArray(this);
    }
    /**
   * Transforms this YArray to a JavaScript Array.
   *
   * @param {number} [start]
   * @param {number} [end]
   * @return {Array<T>}
   */ slice(start = 0, end = this.length) {
        return $52a83e33f2b9e935$var$typeListSlice(this, start, end);
    }
    /**
   * Transforms this Shared Type to a JSON object.
   *
   * @return {Array<any>}
   */ toJSON() {
        return this.map((c)=>c instanceof $52a83e33f2b9e935$export$c265dc8338484497 ? c.toJSON() : c);
    }
    /**
   * Returns an Array with the result of calling a provided function on every
   * element of this YArray.
   *
   * @template M
   * @param {function(T,number,YArray<T>):M} f Function that produces an element of the new Array
   * @return {Array<M>} A new array with each element being the result of the
   *                 callback function
   */ map(f) {
        return $52a83e33f2b9e935$var$typeListMap(this, /** @type {any} */ f);
    }
    /**
   * Executes a provided function once on overy element of this YArray.
   *
   * @param {function(T,number,YArray<T>):void} f A function to execute on every element of this YArray.
   */ forEach(f) {
        $52a83e33f2b9e935$var$typeListForEach(this, f);
    }
    /**
   * @return {IterableIterator<T>}
   */ [Symbol.iterator]() {
        return $52a83e33f2b9e935$var$typeListCreateIterator(this);
    }
    /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   */ _write(encoder) {
        encoder.writeTypeRef($52a83e33f2b9e935$var$YArrayRefID);
    }
}
/**
 * @param {UpdateDecoderV1 | UpdateDecoderV2} _decoder
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$readYArray = (_decoder)=>new $52a83e33f2b9e935$export$c4be6576ca6fe4aa();
/**
 * @template T
 * @extends YEvent<YMap<T>>
 * Event that describes the changes on a YMap.
 */ class $52a83e33f2b9e935$export$33aab1b1a47c1cc3 extends $52a83e33f2b9e935$export$80fac438977fb51c {
    /**
   * @param {YMap<T>} ymap The YArray that changed.
   * @param {Transaction} transaction
   * @param {Set<any>} subs The keys that changed.
   */ constructor(ymap, transaction, subs){
        super(ymap, transaction);
        this.keysChanged = subs;
    }
}
/**
 * @template MapType
 * A shared Map implementation.
 *
 * @extends AbstractType<YMapEvent<MapType>>
 * @implements {Iterable<MapType>}
 */ class $52a83e33f2b9e935$export$a5c7b93649eaf8f8 extends $52a83e33f2b9e935$export$c265dc8338484497 {
    /**
   *
   * @param {Iterable<readonly [string, any]>=} entries - an optional iterable to initialize the YMap
   */ constructor(entries){
        super();
        /**
     * @type {Map<string,any>?}
     * @private
     */ this._prelimContent = null;
        if (entries === undefined) this._prelimContent = new Map();
        else this._prelimContent = new Map(entries);
    }
    /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item} item
   */ _integrate(y, item) {
        super._integrate(y, item); /** @type {Map<string, any>} */ 
        this._prelimContent.forEach((value, key)=>{
            this.set(key, value);
        });
        this._prelimContent = null;
    }
    /**
   * @return {YMap<MapType>}
   */ _copy() {
        return new $52a83e33f2b9e935$export$a5c7b93649eaf8f8();
    }
    /**
   * @return {YMap<MapType>}
   */ clone() {
        /**
     * @type {YMap<MapType>}
     */ const map = new $52a83e33f2b9e935$export$a5c7b93649eaf8f8();
        this.forEach((value, key)=>{
            map.set(key, value instanceof $52a83e33f2b9e935$export$c265dc8338484497 ? /** @type {typeof value} */ value.clone() : value);
        });
        return map;
    }
    /**
   * Creates YMapEvent and calls observers.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
   */ _callObserver(transaction, parentSubs) {
        $52a83e33f2b9e935$var$callTypeObservers(this, transaction, new $52a83e33f2b9e935$export$33aab1b1a47c1cc3(this, transaction, parentSubs));
    }
    /**
   * Transforms this Shared Type to a JSON object.
   *
   * @return {Object<string,any>}
   */ toJSON() {
        /**
     * @type {Object<string,MapType>}
     */ const map = {};
        this._map.forEach((item, key)=>{
            if (!item.deleted) {
                const v = item.content.getContent()[item.length - 1];
                map[key] = v instanceof $52a83e33f2b9e935$export$c265dc8338484497 ? v.toJSON() : v;
            }
        });
        return map;
    }
    /**
   * Returns the size of the YMap (count of key/value pairs)
   *
   * @return {number}
   */ get size() {
        return [
            ...$52a83e33f2b9e935$var$createMapIterator(this._map)
        ].length;
    }
    /**
   * Returns the keys for each element in the YMap Type.
   *
   * @return {IterableIterator<string>}
   */ keys() {
        return $aP2RX.iteratorMap($52a83e33f2b9e935$var$createMapIterator(this._map), /** @param {any} v */ (v)=>v[0]);
    }
    /**
   * Returns the values for each element in the YMap Type.
   *
   * @return {IterableIterator<any>}
   */ values() {
        return $aP2RX.iteratorMap($52a83e33f2b9e935$var$createMapIterator(this._map), /** @param {any} v */ (v)=>v[1].content.getContent()[v[1].length - 1]);
    }
    /**
   * Returns an Iterator of [key, value] pairs
   *
   * @return {IterableIterator<any>}
   */ entries() {
        return $aP2RX.iteratorMap($52a83e33f2b9e935$var$createMapIterator(this._map), /** @param {any} v */ (v)=>[
                v[0],
                v[1].content.getContent()[v[1].length - 1]
            ]);
    }
    /**
   * Executes a provided function on once on every key-value pair.
   *
   * @param {function(MapType,string,YMap<MapType>):void} f A function to execute on every element of this YArray.
   */ forEach(f) {
        this._map.forEach((item, key)=>{
            if (!item.deleted) f(item.content.getContent()[item.length - 1], key, this);
        });
    }
    /**
   * Returns an Iterator of [key, value] pairs
   *
   * @return {IterableIterator<any>}
   */ [Symbol.iterator]() {
        return this.entries();
    }
    /**
   * Remove a specified element from this YMap.
   *
   * @param {string} key The key of the element to remove.
   */ delete(key) {
        if (this.doc !== null) $52a83e33f2b9e935$export$dac1bad6146b2469(this.doc, (transaction)=>{
            $52a83e33f2b9e935$var$typeMapDelete(transaction, this, key);
        });
        else /** @type {Map<string, any>} */ this._prelimContent.delete(key);
    }
    /**
   * Adds or updates an element with a specified key and value.
   * @template {MapType} VAL
   *
   * @param {string} key The key of the element to add to this YMap
   * @param {VAL} value The value of the element to add
   * @return {VAL}
   */ set(key, value) {
        if (this.doc !== null) $52a83e33f2b9e935$export$dac1bad6146b2469(this.doc, (transaction)=>{
            $52a83e33f2b9e935$var$typeMapSet(transaction, this, key, /** @type {any} */ value);
        });
        else /** @type {Map<string, any>} */ this._prelimContent.set(key, value);
        return value;
    }
    /**
   * Returns a specified element from this YMap.
   *
   * @param {string} key
   * @return {MapType|undefined}
   */ get(key) {
        return /** @type {any} */ $52a83e33f2b9e935$var$typeMapGet(this, key);
    }
    /**
   * Returns a boolean indicating whether the specified key exists or not.
   *
   * @param {string} key The key to test.
   * @return {boolean}
   */ has(key) {
        return $52a83e33f2b9e935$var$typeMapHas(this, key);
    }
    /**
   * Removes all elements from this YMap.
   */ clear() {
        if (this.doc !== null) $52a83e33f2b9e935$export$dac1bad6146b2469(this.doc, (transaction)=>{
            this.forEach(function(_value, key, map) {
                $52a83e33f2b9e935$var$typeMapDelete(transaction, map, key);
            });
        });
        else /** @type {Map<string, any>} */ this._prelimContent.clear();
    }
    /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   */ _write(encoder) {
        encoder.writeTypeRef($52a83e33f2b9e935$var$YMapRefID);
    }
}
/**
 * @param {UpdateDecoderV1 | UpdateDecoderV2} _decoder
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$readYMap = (_decoder)=>new $52a83e33f2b9e935$export$a5c7b93649eaf8f8();
/**
 * @param {any} a
 * @param {any} b
 * @return {boolean}
 */ const $52a83e33f2b9e935$var$equalAttrs = (a, b)=>a === b || typeof a === "object" && typeof b === "object" && a && b && $97qUn.equalFlat(a, b);
class $52a83e33f2b9e935$var$ItemTextListPosition {
    /**
   * @param {Item|null} left
   * @param {Item|null} right
   * @param {number} index
   * @param {Map<string,any>} currentAttributes
   */ constructor(left, right, index, currentAttributes){
        this.left = left;
        this.right = right;
        this.index = index;
        this.currentAttributes = currentAttributes;
    }
    /**
   * Only call this if you know that this.right is defined
   */ forward() {
        if (this.right === null) $akmFO.unexpectedCase();
        switch(this.right.content.constructor){
            case $52a83e33f2b9e935$export$3194899188fb5a88:
                if (!this.right.deleted) $52a83e33f2b9e935$var$updateCurrentAttributes(this.currentAttributes, /** @type {ContentFormat} */ this.right.content);
                break;
            default:
                if (!this.right.deleted) this.index += this.right.length;
                break;
        }
        this.left = this.right;
        this.right = this.right.right;
    }
}
/**
 * @param {Transaction} transaction
 * @param {ItemTextListPosition} pos
 * @param {number} count steps to move forward
 * @return {ItemTextListPosition}
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$findNextPosition = (transaction, pos, count)=>{
    while(pos.right !== null && count > 0){
        switch(pos.right.content.constructor){
            case $52a83e33f2b9e935$export$3194899188fb5a88:
                if (!pos.right.deleted) $52a83e33f2b9e935$var$updateCurrentAttributes(pos.currentAttributes, /** @type {ContentFormat} */ pos.right.content);
                break;
            default:
                if (!pos.right.deleted) {
                    if (count < pos.right.length) // split right
                    $52a83e33f2b9e935$var$getItemCleanStart(transaction, $52a83e33f2b9e935$export$6c7d4e6171d008d0(pos.right.id.client, pos.right.id.clock + count));
                    pos.index += pos.right.length;
                    count -= pos.right.length;
                }
                break;
        }
        pos.left = pos.right;
        pos.right = pos.right.right;
    // pos.forward() - we don't forward because that would halve the performance because we already do the checks above
    }
    return pos;
};
/**
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {number} index
 * @return {ItemTextListPosition}
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$findPosition = (transaction, parent, index)=>{
    const currentAttributes = new Map();
    const marker = $52a83e33f2b9e935$var$findMarker(parent, index);
    if (marker) {
        const pos = new $52a83e33f2b9e935$var$ItemTextListPosition(marker.p.left, marker.p, marker.index, currentAttributes);
        return $52a83e33f2b9e935$var$findNextPosition(transaction, pos, index - marker.index);
    } else {
        const pos = new $52a83e33f2b9e935$var$ItemTextListPosition(null, parent._start, 0, currentAttributes);
        return $52a83e33f2b9e935$var$findNextPosition(transaction, pos, index);
    }
};
/**
 * Negate applied formats
 *
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {ItemTextListPosition} currPos
 * @param {Map<string,any>} negatedAttributes
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$insertNegatedAttributes = (transaction, parent, currPos, negatedAttributes)=>{
    // check if we really need to remove attributes
    while(currPos.right !== null && (currPos.right.deleted === true || currPos.right.content.constructor === $52a83e33f2b9e935$export$3194899188fb5a88 && $52a83e33f2b9e935$var$equalAttrs(negatedAttributes.get(/** @type {ContentFormat} */ currPos.right.content.key), /** @type {ContentFormat} */ currPos.right.content.value))){
        if (!currPos.right.deleted) negatedAttributes.delete(/** @type {ContentFormat} */ currPos.right.content.key);
        currPos.forward();
    }
    const doc = transaction.doc;
    const ownClientId = doc.clientID;
    negatedAttributes.forEach((val, key)=>{
        const left = currPos.left;
        const right = currPos.right;
        const nextFormat = new $52a83e33f2b9e935$export$6d08773d2e66f8f2($52a83e33f2b9e935$export$6c7d4e6171d008d0(ownClientId, $52a83e33f2b9e935$export$50fdfeece43146fd(doc.store, ownClientId)), left, left && left.lastId, right, right && right.id, parent, null, new $52a83e33f2b9e935$export$3194899188fb5a88(key, val));
        nextFormat.integrate(transaction, 0);
        currPos.right = nextFormat;
        currPos.forward();
    });
};
/**
 * @param {Map<string,any>} currentAttributes
 * @param {ContentFormat} format
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$updateCurrentAttributes = (currentAttributes, format)=>{
    const { key: key, value: value } = format;
    if (value === null) currentAttributes.delete(key);
    else currentAttributes.set(key, value);
};
/**
 * @param {ItemTextListPosition} currPos
 * @param {Object<string,any>} attributes
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$minimizeAttributeChanges = (currPos, attributes)=>{
    // go right while attributes[right.key] === right.value (or right is deleted)
    while(true){
        if (currPos.right === null) break;
        else if (currPos.right.deleted || currPos.right.content.constructor === $52a83e33f2b9e935$export$3194899188fb5a88 && $52a83e33f2b9e935$var$equalAttrs(attributes[/** @type {ContentFormat} */ currPos.right.content.key] || null, /** @type {ContentFormat} */ currPos.right.content.value)) ;
        else break;
        currPos.forward();
    }
};
/**
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {ItemTextListPosition} currPos
 * @param {Object<string,any>} attributes
 * @return {Map<string,any>}
 *
 * @private
 * @function
 **/ const $52a83e33f2b9e935$var$insertAttributes = (transaction, parent, currPos, attributes)=>{
    const doc = transaction.doc;
    const ownClientId = doc.clientID;
    const negatedAttributes = new Map();
    // insert format-start items
    for(const key in attributes){
        const val = attributes[key];
        const currentVal = currPos.currentAttributes.get(key) || null;
        if (!$52a83e33f2b9e935$var$equalAttrs(currentVal, val)) {
            // save negated attribute (set null if currentVal undefined)
            negatedAttributes.set(key, currentVal);
            const { left: left, right: right } = currPos;
            currPos.right = new $52a83e33f2b9e935$export$6d08773d2e66f8f2($52a83e33f2b9e935$export$6c7d4e6171d008d0(ownClientId, $52a83e33f2b9e935$export$50fdfeece43146fd(doc.store, ownClientId)), left, left && left.lastId, right, right && right.id, parent, null, new $52a83e33f2b9e935$export$3194899188fb5a88(key, val));
            currPos.right.integrate(transaction, 0);
            currPos.forward();
        }
    }
    return negatedAttributes;
};
/**
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {ItemTextListPosition} currPos
 * @param {string|object|AbstractType<any>} text
 * @param {Object<string,any>} attributes
 *
 * @private
 * @function
 **/ const $52a83e33f2b9e935$var$insertText = (transaction, parent, currPos, text, attributes)=>{
    currPos.currentAttributes.forEach((_val, key)=>{
        if (attributes[key] === undefined) attributes[key] = null;
    });
    const doc = transaction.doc;
    const ownClientId = doc.clientID;
    $52a83e33f2b9e935$var$minimizeAttributeChanges(currPos, attributes);
    const negatedAttributes = $52a83e33f2b9e935$var$insertAttributes(transaction, parent, currPos, attributes);
    // insert content
    const content = text.constructor === String ? new $52a83e33f2b9e935$export$ee670b2cf091bbb6(/** @type {string} */ text) : text instanceof $52a83e33f2b9e935$export$c265dc8338484497 ? new $52a83e33f2b9e935$export$e2e108cbe2e4f865(text) : new $52a83e33f2b9e935$export$c3787ba7f6086664(text);
    let { left: left, right: right, index: index } = currPos;
    if (parent._searchMarker) $52a83e33f2b9e935$var$updateMarkerChanges(parent._searchMarker, currPos.index, content.getLength());
    right = new $52a83e33f2b9e935$export$6d08773d2e66f8f2($52a83e33f2b9e935$export$6c7d4e6171d008d0(ownClientId, $52a83e33f2b9e935$export$50fdfeece43146fd(doc.store, ownClientId)), left, left && left.lastId, right, right && right.id, parent, null, content);
    right.integrate(transaction, 0);
    currPos.right = right;
    currPos.index = index;
    currPos.forward();
    $52a83e33f2b9e935$var$insertNegatedAttributes(transaction, parent, currPos, negatedAttributes);
};
/**
 * @param {Transaction} transaction
 * @param {AbstractType<any>} parent
 * @param {ItemTextListPosition} currPos
 * @param {number} length
 * @param {Object<string,any>} attributes
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$formatText = (transaction, parent, currPos, length, attributes)=>{
    const doc = transaction.doc;
    const ownClientId = doc.clientID;
    $52a83e33f2b9e935$var$minimizeAttributeChanges(currPos, attributes);
    const negatedAttributes = $52a83e33f2b9e935$var$insertAttributes(transaction, parent, currPos, attributes);
    // iterate until first non-format or null is found
    // delete all formats with attributes[format.key] != null
    // also check the attributes after the first non-format as we do not want to insert redundant negated attributes there
    // eslint-disable-next-line no-labels
    iterationLoop: while(currPos.right !== null && (length > 0 || negatedAttributes.size > 0 && (currPos.right.deleted || currPos.right.content.constructor === $52a83e33f2b9e935$export$3194899188fb5a88))){
        if (!currPos.right.deleted) switch(currPos.right.content.constructor){
            case $52a83e33f2b9e935$export$3194899188fb5a88:
                {
                    const { key: key, value: value } = /** @type {ContentFormat} */ currPos.right.content;
                    const attr = attributes[key];
                    if (attr !== undefined) {
                        if ($52a83e33f2b9e935$var$equalAttrs(attr, value)) negatedAttributes.delete(key);
                        else {
                            if (length === 0) break iterationLoop;
                            negatedAttributes.set(key, value);
                        }
                        currPos.right.delete(transaction);
                    } else currPos.currentAttributes.set(key, value);
                    break;
                }
            default:
                if (length < currPos.right.length) $52a83e33f2b9e935$var$getItemCleanStart(transaction, $52a83e33f2b9e935$export$6c7d4e6171d008d0(currPos.right.id.client, currPos.right.id.clock + length));
                length -= currPos.right.length;
                break;
        }
        currPos.forward();
    }
    // Quill just assumes that the editor starts with a newline and that it always
    // ends with a newline. We only insert that newline when a new newline is
    // inserted - i.e when length is bigger than type.length
    if (length > 0) {
        let newlines = "";
        for(; length > 0; length--)newlines += "\n";
        currPos.right = new $52a83e33f2b9e935$export$6d08773d2e66f8f2($52a83e33f2b9e935$export$6c7d4e6171d008d0(ownClientId, $52a83e33f2b9e935$export$50fdfeece43146fd(doc.store, ownClientId)), currPos.left, currPos.left && currPos.left.lastId, currPos.right, currPos.right && currPos.right.id, parent, null, new $52a83e33f2b9e935$export$ee670b2cf091bbb6(newlines));
        currPos.right.integrate(transaction, 0);
        currPos.forward();
    }
    $52a83e33f2b9e935$var$insertNegatedAttributes(transaction, parent, currPos, negatedAttributes);
};
/**
 * Call this function after string content has been deleted in order to
 * clean up formatting Items.
 *
 * @param {Transaction} transaction
 * @param {Item} start
 * @param {Item|null} curr exclusive end, automatically iterates to the next Content Item
 * @param {Map<string,any>} startAttributes
 * @param {Map<string,any>} currAttributes
 * @return {number} The amount of formatting Items deleted.
 *
 * @function
 */ const $52a83e33f2b9e935$var$cleanupFormattingGap = (transaction, start, curr, startAttributes, currAttributes)=>{
    /**
   * @type {Item|null}
   */ let end = start;
    /**
   * @type {Map<string,ContentFormat>}
   */ const endFormats = $e6DQe.create();
    while(end && (!end.countable || end.deleted)){
        if (!end.deleted && end.content.constructor === $52a83e33f2b9e935$export$3194899188fb5a88) {
            const cf = /** @type {ContentFormat} */ end.content;
            endFormats.set(cf.key, cf);
        }
        end = end.right;
    }
    let cleanups = 0;
    let reachedCurr = false;
    while(start !== end){
        if (curr === start) reachedCurr = true;
        if (!start.deleted) {
            const content = start.content;
            switch(content.constructor){
                case $52a83e33f2b9e935$export$3194899188fb5a88:
                    {
                        const { key: key, value: value } = /** @type {ContentFormat} */ content;
                        const startAttrValue = startAttributes.get(key) || null;
                        if (endFormats.get(key) !== content || startAttrValue === value) {
                            // Either this format is overwritten or it is not necessary because the attribute already existed.
                            start.delete(transaction);
                            cleanups++;
                            if (!reachedCurr && (currAttributes.get(key) || null) === value && startAttrValue !== value) {
                                if (startAttrValue === null) currAttributes.delete(key);
                                else currAttributes.set(key, startAttrValue);
                            }
                        }
                        if (!reachedCurr && !start.deleted) $52a83e33f2b9e935$var$updateCurrentAttributes(currAttributes, /** @type {ContentFormat} */ content);
                        break;
                    }
            }
        }
        start = /** @type {Item} */ start.right;
    }
    return cleanups;
};
/**
 * @param {Transaction} transaction
 * @param {Item | null} item
 */ const $52a83e33f2b9e935$var$cleanupContextlessFormattingGap = (transaction, item)=>{
    // iterate until item.right is null or content
    while(item && item.right && (item.right.deleted || !item.right.countable))item = item.right;
    const attrs = new Set();
    // iterate back until a content item is found
    while(item && (item.deleted || !item.countable)){
        if (!item.deleted && item.content.constructor === $52a83e33f2b9e935$export$3194899188fb5a88) {
            const key = /** @type {ContentFormat} */ item.content.key;
            if (attrs.has(key)) item.delete(transaction);
            else attrs.add(key);
        }
        item = item.left;
    }
};
/**
 * This function is experimental and subject to change / be removed.
 *
 * Ideally, we don't need this function at all. Formatting attributes should be cleaned up
 * automatically after each change. This function iterates twice over the complete YText type
 * and removes unnecessary formatting attributes. This is also helpful for testing.
 *
 * This function won't be exported anymore as soon as there is confidence that the YText type works as intended.
 *
 * @param {YText} type
 * @return {number} How many formatting attributes have been cleaned up.
 */ const $52a83e33f2b9e935$export$5d9f53c13ebffb65 = (type)=>{
    let res = 0;
    $52a83e33f2b9e935$export$dac1bad6146b2469(/** @type {Doc} */ type.doc, (transaction)=>{
        let start = /** @type {Item} */ type._start;
        let end = type._start;
        let startAttributes = $e6DQe.create();
        const currentAttributes = $e6DQe.copy(startAttributes);
        while(end){
            if (end.deleted === false) switch(end.content.constructor){
                case $52a83e33f2b9e935$export$3194899188fb5a88:
                    $52a83e33f2b9e935$var$updateCurrentAttributes(currentAttributes, /** @type {ContentFormat} */ end.content);
                    break;
                default:
                    res += $52a83e33f2b9e935$var$cleanupFormattingGap(transaction, start, end, startAttributes, currentAttributes);
                    startAttributes = $e6DQe.copy(currentAttributes);
                    start = end;
                    break;
            }
            end = end.right;
        }
    });
    return res;
};
/**
 * This will be called by the transction once the event handlers are called to potentially cleanup
 * formatting attributes.
 *
 * @param {Transaction} transaction
 */ const $52a83e33f2b9e935$var$cleanupYTextAfterTransaction = (transaction)=>{
    /**
   * @type {Set<YText>}
   */ const needFullCleanup = new Set();
    // check if another formatting item was inserted
    const doc = transaction.doc;
    for (const [client, afterClock] of transaction.afterState.entries()){
        const clock = transaction.beforeState.get(client) || 0;
        if (afterClock === clock) continue;
        $52a83e33f2b9e935$var$iterateStructs(transaction, /** @type {Array<Item|GC>} */ doc.store.clients.get(client), clock, afterClock, (item)=>{
            if (!item.deleted && /** @type {Item} */ item.content.constructor === $52a83e33f2b9e935$export$3194899188fb5a88 && item.constructor !== $52a83e33f2b9e935$export$12d259ff017e6b58) needFullCleanup.add(/** @type {any} */ item.parent);
        });
    }
    // cleanup in a new transaction
    $52a83e33f2b9e935$export$dac1bad6146b2469(doc, (t)=>{
        $52a83e33f2b9e935$export$8afefebbaf4e4c78(transaction, transaction.deleteSet, (item)=>{
            if (item instanceof $52a83e33f2b9e935$export$12d259ff017e6b58 || !/** @type {YText} */ item.parent._hasFormatting || needFullCleanup.has(/** @type {YText} */ item.parent)) return;
            const parent = /** @type {YText} */ item.parent;
            if (item.content.constructor === $52a83e33f2b9e935$export$3194899188fb5a88) needFullCleanup.add(parent);
            else // If no formatting attribute was inserted or deleted, we can make due with contextless
            // formatting cleanups.
            // Contextless: it is not necessary to compute currentAttributes for the affected position.
            $52a83e33f2b9e935$var$cleanupContextlessFormattingGap(t, item);
        });
        // If a formatting item was inserted, we simply clean the whole type.
        // We need to compute currentAttributes for the current position anyway.
        for (const yText of needFullCleanup)$52a83e33f2b9e935$export$5d9f53c13ebffb65(yText);
    });
};
/**
 * @param {Transaction} transaction
 * @param {ItemTextListPosition} currPos
 * @param {number} length
 * @return {ItemTextListPosition}
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$deleteText = (transaction, currPos, length)=>{
    const startLength = length;
    const startAttrs = $e6DQe.copy(currPos.currentAttributes);
    const start = currPos.right;
    while(length > 0 && currPos.right !== null){
        if (currPos.right.deleted === false) switch(currPos.right.content.constructor){
            case $52a83e33f2b9e935$export$e2e108cbe2e4f865:
            case $52a83e33f2b9e935$export$c3787ba7f6086664:
            case $52a83e33f2b9e935$export$ee670b2cf091bbb6:
                if (length < currPos.right.length) $52a83e33f2b9e935$var$getItemCleanStart(transaction, $52a83e33f2b9e935$export$6c7d4e6171d008d0(currPos.right.id.client, currPos.right.id.clock + length));
                length -= currPos.right.length;
                currPos.right.delete(transaction);
                break;
        }
        currPos.forward();
    }
    if (start) $52a83e33f2b9e935$var$cleanupFormattingGap(transaction, start, currPos.right, startAttrs, currPos.currentAttributes);
    const parent = /** @type {AbstractType<any>} */ /** @type {Item} */ (currPos.left || currPos.right).parent;
    if (parent._searchMarker) $52a83e33f2b9e935$var$updateMarkerChanges(parent._searchMarker, currPos.index, -startLength + length);
    return currPos;
};
/**
 * The Quill Delta format represents changes on a text document with
 * formatting information. For mor information visit {@link https://quilljs.com/docs/delta/|Quill Delta}
 *
 * @example
 *   {
 *     ops: [
 *       { insert: 'Gandalf', attributes: { bold: true } },
 *       { insert: ' the ' },
 *       { insert: 'Grey', attributes: { color: '#cccccc' } }
 *     ]
 *   }
 *
 */ /**
  * Attributes that can be assigned to a selection of text.
  *
  * @example
  *   {
  *     bold: true,
  *     font-size: '40px'
  *   }
  *
  * @typedef {Object} TextAttributes
  */ /**
 * @extends YEvent<YText>
 * Event that describes the changes on a YText type.
 */ class $52a83e33f2b9e935$export$51155b8ebb74188a extends $52a83e33f2b9e935$export$80fac438977fb51c {
    /**
   * @param {YText} ytext
   * @param {Transaction} transaction
   * @param {Set<any>} subs The keys that changed
   */ constructor(ytext, transaction, subs){
        super(ytext, transaction);
        /**
     * Whether the children changed.
     * @type {Boolean}
     * @private
     */ this.childListChanged = false;
        /**
     * Set of all changed attributes.
     * @type {Set<string>}
     */ this.keysChanged = new Set();
        subs.forEach((sub)=>{
            if (sub === null) this.childListChanged = true;
            else this.keysChanged.add(sub);
        });
    }
    /**
   * @type {{added:Set<Item>,deleted:Set<Item>,keys:Map<string,{action:'add'|'update'|'delete',oldValue:any}>,delta:Array<{insert?:Array<any>|string, delete?:number, retain?:number}>}}
   */ get changes() {
        if (this._changes === null) {
            /**
       * @type {{added:Set<Item>,deleted:Set<Item>,keys:Map<string,{action:'add'|'update'|'delete',oldValue:any}>,delta:Array<{insert?:Array<any>|string|AbstractType<any>|object, delete?:number, retain?:number}>}}
       */ const changes = {
                keys: this.keys,
                delta: this.delta,
                added: new Set(),
                deleted: new Set()
            };
            this._changes = changes;
        }
        return /** @type {any} */ this._changes;
    }
    /**
   * Compute the changes in the delta format.
   * A {@link https://quilljs.com/docs/delta/|Quill Delta}) that represents the changes on the document.
   *
   * @type {Array<{insert?:string|object|AbstractType<any>, delete?:number, retain?:number, attributes?: Object<string,any>}>}
   *
   * @public
   */ get delta() {
        if (this._delta === null) {
            const y = /** @type {Doc} */ this.target.doc;
            /**
       * @type {Array<{insert?:string|object|AbstractType<any>, delete?:number, retain?:number, attributes?: Object<string,any>}>}
       */ const delta = [];
            $52a83e33f2b9e935$export$dac1bad6146b2469(y, (transaction)=>{
                const currentAttributes = new Map(); // saves all current attributes for insert
                const oldAttributes = new Map();
                let item = this.target._start;
                /**
         * @type {string?}
         */ let action = null;
                /**
         * @type {Object<string,any>}
         */ const attributes = {}; // counts added or removed new attributes for retain
                /**
         * @type {string|object}
         */ let insert = "";
                let retain = 0;
                let deleteLen = 0;
                const addOp = ()=>{
                    if (action !== null) {
                        /**
             * @type {any}
             */ let op = null;
                        switch(action){
                            case "delete":
                                if (deleteLen > 0) op = {
                                    delete: deleteLen
                                };
                                deleteLen = 0;
                                break;
                            case "insert":
                                if (typeof insert === "object" || insert.length > 0) {
                                    op = {
                                        insert: insert
                                    };
                                    if (currentAttributes.size > 0) {
                                        op.attributes = {};
                                        currentAttributes.forEach((value, key)=>{
                                            if (value !== null) op.attributes[key] = value;
                                        });
                                    }
                                }
                                insert = "";
                                break;
                            case "retain":
                                if (retain > 0) {
                                    op = {
                                        retain: retain
                                    };
                                    if (!$97qUn.isEmpty(attributes)) op.attributes = $97qUn.assign({}, attributes);
                                }
                                retain = 0;
                                break;
                        }
                        if (op) delta.push(op);
                        action = null;
                    }
                };
                while(item !== null){
                    switch(item.content.constructor){
                        case $52a83e33f2b9e935$export$e2e108cbe2e4f865:
                        case $52a83e33f2b9e935$export$c3787ba7f6086664:
                            if (this.adds(item)) {
                                if (!this.deletes(item)) {
                                    addOp();
                                    action = "insert";
                                    insert = item.content.getContent()[0];
                                    addOp();
                                }
                            } else if (this.deletes(item)) {
                                if (action !== "delete") {
                                    addOp();
                                    action = "delete";
                                }
                                deleteLen += 1;
                            } else if (!item.deleted) {
                                if (action !== "retain") {
                                    addOp();
                                    action = "retain";
                                }
                                retain += 1;
                            }
                            break;
                        case $52a83e33f2b9e935$export$ee670b2cf091bbb6:
                            if (this.adds(item)) {
                                if (!this.deletes(item)) {
                                    if (action !== "insert") {
                                        addOp();
                                        action = "insert";
                                    }
                                    insert += /** @type {ContentString} */ item.content.str;
                                }
                            } else if (this.deletes(item)) {
                                if (action !== "delete") {
                                    addOp();
                                    action = "delete";
                                }
                                deleteLen += item.length;
                            } else if (!item.deleted) {
                                if (action !== "retain") {
                                    addOp();
                                    action = "retain";
                                }
                                retain += item.length;
                            }
                            break;
                        case $52a83e33f2b9e935$export$3194899188fb5a88:
                            {
                                const { key: key, value: value } = /** @type {ContentFormat} */ item.content;
                                if (this.adds(item)) {
                                    if (!this.deletes(item)) {
                                        const curVal = currentAttributes.get(key) || null;
                                        if (!$52a83e33f2b9e935$var$equalAttrs(curVal, value)) {
                                            if (action === "retain") addOp();
                                            if ($52a83e33f2b9e935$var$equalAttrs(value, oldAttributes.get(key) || null)) delete attributes[key];
                                            else attributes[key] = value;
                                        } else if (value !== null) item.delete(transaction);
                                    }
                                } else if (this.deletes(item)) {
                                    oldAttributes.set(key, value);
                                    const curVal = currentAttributes.get(key) || null;
                                    if (!$52a83e33f2b9e935$var$equalAttrs(curVal, value)) {
                                        if (action === "retain") addOp();
                                        attributes[key] = curVal;
                                    }
                                } else if (!item.deleted) {
                                    oldAttributes.set(key, value);
                                    const attr = attributes[key];
                                    if (attr !== undefined) {
                                        if (!$52a83e33f2b9e935$var$equalAttrs(attr, value)) {
                                            if (action === "retain") addOp();
                                            if (value === null) delete attributes[key];
                                            else attributes[key] = value;
                                        } else if (attr !== null) item.delete(transaction);
                                    }
                                }
                                if (!item.deleted) {
                                    if (action === "insert") addOp();
                                    $52a83e33f2b9e935$var$updateCurrentAttributes(currentAttributes, /** @type {ContentFormat} */ item.content);
                                }
                                break;
                            }
                    }
                    item = item.right;
                }
                addOp();
                while(delta.length > 0){
                    const lastOp = delta[delta.length - 1];
                    if (lastOp.retain !== undefined && lastOp.attributes === undefined) // retain delta's if they don't assign attributes
                    delta.pop();
                    else break;
                }
            });
            this._delta = delta;
        }
        return /** @type {any} */ this._delta;
    }
}
/**
 * Type that represents text with formatting information.
 *
 * This type replaces y-richtext as this implementation is able to handle
 * block formats (format information on a paragraph), embeds (complex elements
 * like pictures and videos), and text formats (**bold**, *italic*).
 *
 * @extends AbstractType<YTextEvent>
 */ class $52a83e33f2b9e935$export$5f1af8db9871e1d6 extends $52a83e33f2b9e935$export$c265dc8338484497 {
    /**
   * @param {String} [string] The initial value of the YText.
   */ constructor(string){
        super();
        /**
     * Array of pending operations on this type
     * @type {Array<function():void>?}
     */ this._pending = string !== undefined ? [
            ()=>this.insert(0, string)
        ] : [];
        /**
     * @type {Array<ArraySearchMarker>|null}
     */ this._searchMarker = [];
        /**
     * Whether this YText contains formatting attributes.
     * This flag is updated when a formatting item is integrated (see ContentFormat.integrate)
     */ this._hasFormatting = false;
    }
    /**
   * Number of characters of this text type.
   *
   * @type {number}
   */ get length() {
        return this._length;
    }
    /**
   * @param {Doc} y
   * @param {Item} item
   */ _integrate(y, item) {
        super._integrate(y, item);
        try {
            /** @type {Array<function>} */ this._pending.forEach((f)=>f());
        } catch (e) {
            console.error(e);
        }
        this._pending = null;
    }
    _copy() {
        return new $52a83e33f2b9e935$export$5f1af8db9871e1d6();
    }
    /**
   * @return {YText}
   */ clone() {
        const text = new $52a83e33f2b9e935$export$5f1af8db9871e1d6();
        text.applyDelta(this.toDelta());
        return text;
    }
    /**
   * Creates YTextEvent and calls observers.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
   */ _callObserver(transaction, parentSubs) {
        super._callObserver(transaction, parentSubs);
        const event = new $52a83e33f2b9e935$export$51155b8ebb74188a(this, transaction, parentSubs);
        $52a83e33f2b9e935$var$callTypeObservers(this, transaction, event);
        // If a remote change happened, we try to cleanup potential formatting duplicates.
        if (!transaction.local && this._hasFormatting) transaction._needFormattingCleanup = true;
    }
    /**
   * Returns the unformatted string representation of this YText type.
   *
   * @public
   */ toString() {
        let str = "";
        /**
     * @type {Item|null}
     */ let n = this._start;
        while(n !== null){
            if (!n.deleted && n.countable && n.content.constructor === $52a83e33f2b9e935$export$ee670b2cf091bbb6) str += /** @type {ContentString} */ n.content.str;
            n = n.right;
        }
        return str;
    }
    /**
   * Returns the unformatted string representation of this YText type.
   *
   * @return {string}
   * @public
   */ toJSON() {
        return this.toString();
    }
    /**
   * Apply a {@link Delta} on this shared YText type.
   *
   * @param {any} delta The changes to apply on this element.
   * @param {object}  opts
   * @param {boolean} [opts.sanitize] Sanitize input delta. Removes ending newlines if set to true.
   *
   *
   * @public
   */ applyDelta(delta, { sanitize: sanitize = true } = {}) {
        if (this.doc !== null) $52a83e33f2b9e935$export$dac1bad6146b2469(this.doc, (transaction)=>{
            const currPos = new $52a83e33f2b9e935$var$ItemTextListPosition(null, this._start, 0, new Map());
            for(let i = 0; i < delta.length; i++){
                const op = delta[i];
                if (op.insert !== undefined) {
                    // Quill assumes that the content starts with an empty paragraph.
                    // Yjs/Y.Text assumes that it starts empty. We always hide that
                    // there is a newline at the end of the content.
                    // If we omit this step, clients will see a different number of
                    // paragraphs, but nothing bad will happen.
                    const ins = !sanitize && typeof op.insert === "string" && i === delta.length - 1 && currPos.right === null && op.insert.slice(-1) === "\n" ? op.insert.slice(0, -1) : op.insert;
                    if (typeof ins !== "string" || ins.length > 0) $52a83e33f2b9e935$var$insertText(transaction, this, currPos, ins, op.attributes || {});
                } else if (op.retain !== undefined) $52a83e33f2b9e935$var$formatText(transaction, this, currPos, op.retain, op.attributes || {});
                else if (op.delete !== undefined) $52a83e33f2b9e935$var$deleteText(transaction, currPos, op.delete);
            }
        });
        else /** @type {Array<function>} */ this._pending.push(()=>this.applyDelta(delta));
    }
    /**
   * Returns the Delta representation of this YText type.
   *
   * @param {Snapshot} [snapshot]
   * @param {Snapshot} [prevSnapshot]
   * @param {function('removed' | 'added', ID):any} [computeYChange]
   * @return {any} The Delta representation of this type.
   *
   * @public
   */ toDelta(snapshot, prevSnapshot, computeYChange) {
        /**
     * @type{Array<any>}
     */ const ops = [];
        const currentAttributes = new Map();
        const doc = /** @type {Doc} */ this.doc;
        let str = "";
        let n = this._start;
        function packStr() {
            if (str.length > 0) {
                // pack str with attributes to ops
                /**
         * @type {Object<string,any>}
         */ const attributes = {};
                let addAttributes = false;
                currentAttributes.forEach((value, key)=>{
                    addAttributes = true;
                    attributes[key] = value;
                });
                /**
         * @type {Object<string,any>}
         */ const op = {
                    insert: str
                };
                if (addAttributes) op.attributes = attributes;
                ops.push(op);
                str = "";
            }
        }
        const computeDelta = ()=>{
            while(n !== null){
                if ($52a83e33f2b9e935$var$isVisible(n, snapshot) || prevSnapshot !== undefined && $52a83e33f2b9e935$var$isVisible(n, prevSnapshot)) switch(n.content.constructor){
                    case $52a83e33f2b9e935$export$ee670b2cf091bbb6:
                        {
                            const cur = currentAttributes.get("ychange");
                            if (snapshot !== undefined && !$52a83e33f2b9e935$var$isVisible(n, snapshot)) {
                                if (cur === undefined || cur.user !== n.id.client || cur.type !== "removed") {
                                    packStr();
                                    currentAttributes.set("ychange", computeYChange ? computeYChange("removed", n.id) : {
                                        type: "removed"
                                    });
                                }
                            } else if (prevSnapshot !== undefined && !$52a83e33f2b9e935$var$isVisible(n, prevSnapshot)) {
                                if (cur === undefined || cur.user !== n.id.client || cur.type !== "added") {
                                    packStr();
                                    currentAttributes.set("ychange", computeYChange ? computeYChange("added", n.id) : {
                                        type: "added"
                                    });
                                }
                            } else if (cur !== undefined) {
                                packStr();
                                currentAttributes.delete("ychange");
                            }
                            str += /** @type {ContentString} */ n.content.str;
                            break;
                        }
                    case $52a83e33f2b9e935$export$e2e108cbe2e4f865:
                    case $52a83e33f2b9e935$export$c3787ba7f6086664:
                        {
                            packStr();
                            /**
               * @type {Object<string,any>}
               */ const op = {
                                insert: n.content.getContent()[0]
                            };
                            if (currentAttributes.size > 0) {
                                const attrs = /** @type {Object<string,any>} */ {};
                                op.attributes = attrs;
                                currentAttributes.forEach((value, key)=>{
                                    attrs[key] = value;
                                });
                            }
                            ops.push(op);
                            break;
                        }
                    case $52a83e33f2b9e935$export$3194899188fb5a88:
                        if ($52a83e33f2b9e935$var$isVisible(n, snapshot)) {
                            packStr();
                            $52a83e33f2b9e935$var$updateCurrentAttributes(currentAttributes, /** @type {ContentFormat} */ n.content);
                        }
                        break;
                }
                n = n.right;
            }
            packStr();
        };
        if (snapshot || prevSnapshot) // snapshots are merged again after the transaction, so we need to keep the
        // transaction alive until we are done
        $52a83e33f2b9e935$export$dac1bad6146b2469(doc, (transaction)=>{
            if (snapshot) $52a83e33f2b9e935$var$splitSnapshotAffectedStructs(transaction, snapshot);
            if (prevSnapshot) $52a83e33f2b9e935$var$splitSnapshotAffectedStructs(transaction, prevSnapshot);
            computeDelta();
        }, "cleanup");
        else computeDelta();
        return ops;
    }
    /**
   * Insert text at a given index.
   *
   * @param {number} index The index at which to start inserting.
   * @param {String} text The text to insert at the specified position.
   * @param {TextAttributes} [attributes] Optionally define some formatting
   *                                    information to apply on the inserted
   *                                    Text.
   * @public
   */ insert(index, text, attributes) {
        if (text.length <= 0) return;
        const y = this.doc;
        if (y !== null) $52a83e33f2b9e935$export$dac1bad6146b2469(y, (transaction)=>{
            const pos = $52a83e33f2b9e935$var$findPosition(transaction, this, index);
            if (!attributes) {
                attributes = {};
                // @ts-ignore
                pos.currentAttributes.forEach((v, k)=>{
                    attributes[k] = v;
                });
            }
            $52a83e33f2b9e935$var$insertText(transaction, this, pos, text, attributes);
        });
        else /** @type {Array<function>} */ this._pending.push(()=>this.insert(index, text, attributes));
    }
    /**
   * Inserts an embed at a index.
   *
   * @param {number} index The index to insert the embed at.
   * @param {Object | AbstractType<any>} embed The Object that represents the embed.
   * @param {TextAttributes} attributes Attribute information to apply on the
   *                                    embed
   *
   * @public
   */ insertEmbed(index, embed, attributes = {}) {
        const y = this.doc;
        if (y !== null) $52a83e33f2b9e935$export$dac1bad6146b2469(y, (transaction)=>{
            const pos = $52a83e33f2b9e935$var$findPosition(transaction, this, index);
            $52a83e33f2b9e935$var$insertText(transaction, this, pos, embed, attributes);
        });
        else /** @type {Array<function>} */ this._pending.push(()=>this.insertEmbed(index, embed, attributes));
    }
    /**
   * Deletes text starting from an index.
   *
   * @param {number} index Index at which to start deleting.
   * @param {number} length The number of characters to remove. Defaults to 1.
   *
   * @public
   */ delete(index, length) {
        if (length === 0) return;
        const y = this.doc;
        if (y !== null) $52a83e33f2b9e935$export$dac1bad6146b2469(y, (transaction)=>{
            $52a83e33f2b9e935$var$deleteText(transaction, $52a83e33f2b9e935$var$findPosition(transaction, this, index), length);
        });
        else /** @type {Array<function>} */ this._pending.push(()=>this.delete(index, length));
    }
    /**
   * Assigns properties to a range of text.
   *
   * @param {number} index The position where to start formatting.
   * @param {number} length The amount of characters to assign properties to.
   * @param {TextAttributes} attributes Attribute information to apply on the
   *                                    text.
   *
   * @public
   */ format(index, length, attributes) {
        if (length === 0) return;
        const y = this.doc;
        if (y !== null) $52a83e33f2b9e935$export$dac1bad6146b2469(y, (transaction)=>{
            const pos = $52a83e33f2b9e935$var$findPosition(transaction, this, index);
            if (pos.right === null) return;
            $52a83e33f2b9e935$var$formatText(transaction, this, pos, length, attributes);
        });
        else /** @type {Array<function>} */ this._pending.push(()=>this.format(index, length, attributes));
    }
    /**
   * Removes an attribute.
   *
   * @note Xml-Text nodes don't have attributes. You can use this feature to assign properties to complete text-blocks.
   *
   * @param {String} attributeName The attribute name that is to be removed.
   *
   * @public
   */ removeAttribute(attributeName) {
        if (this.doc !== null) $52a83e33f2b9e935$export$dac1bad6146b2469(this.doc, (transaction)=>{
            $52a83e33f2b9e935$var$typeMapDelete(transaction, this, attributeName);
        });
        else /** @type {Array<function>} */ this._pending.push(()=>this.removeAttribute(attributeName));
    }
    /**
   * Sets or updates an attribute.
   *
   * @note Xml-Text nodes don't have attributes. You can use this feature to assign properties to complete text-blocks.
   *
   * @param {String} attributeName The attribute name that is to be set.
   * @param {any} attributeValue The attribute value that is to be set.
   *
   * @public
   */ setAttribute(attributeName, attributeValue) {
        if (this.doc !== null) $52a83e33f2b9e935$export$dac1bad6146b2469(this.doc, (transaction)=>{
            $52a83e33f2b9e935$var$typeMapSet(transaction, this, attributeName, attributeValue);
        });
        else /** @type {Array<function>} */ this._pending.push(()=>this.setAttribute(attributeName, attributeValue));
    }
    /**
   * Returns an attribute value that belongs to the attribute name.
   *
   * @note Xml-Text nodes don't have attributes. You can use this feature to assign properties to complete text-blocks.
   *
   * @param {String} attributeName The attribute name that identifies the
   *                               queried value.
   * @return {any} The queried attribute value.
   *
   * @public
   */ getAttribute(attributeName) {
        return /** @type {any} */ $52a83e33f2b9e935$var$typeMapGet(this, attributeName);
    }
    /**
   * Returns all attribute name/value pairs in a JSON Object.
   *
   * @note Xml-Text nodes don't have attributes. You can use this feature to assign properties to complete text-blocks.
   *
   * @return {Object<string, any>} A JSON Object that describes the attributes.
   *
   * @public
   */ getAttributes() {
        return $52a83e33f2b9e935$var$typeMapGetAll(this);
    }
    /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   */ _write(encoder) {
        encoder.writeTypeRef($52a83e33f2b9e935$var$YTextRefID);
    }
}
/**
 * @param {UpdateDecoderV1 | UpdateDecoderV2} _decoder
 * @return {YText}
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$readYText = (_decoder)=>new $52a83e33f2b9e935$export$5f1af8db9871e1d6();
/**
 * @module YXml
 */ /**
 * Define the elements to which a set of CSS queries apply.
 * {@link https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors|CSS_Selectors}
 *
 * @example
 *   query = '.classSelector'
 *   query = 'nodeSelector'
 *   query = '#idSelector'
 *
 * @typedef {string} CSS_Selector
 */ /**
 * Dom filter function.
 *
 * @callback domFilter
 * @param {string} nodeName The nodeName of the element
 * @param {Map} attributes The map of attributes.
 * @return {boolean} Whether to include the Dom node in the YXmlElement.
 */ /**
 * Represents a subset of the nodes of a YXmlElement / YXmlFragment and a
 * position within them.
 *
 * Can be created with {@link YXmlFragment#createTreeWalker}
 *
 * @public
 * @implements {Iterable<YXmlElement|YXmlText|YXmlElement|YXmlHook>}
 */ class $52a83e33f2b9e935$var$YXmlTreeWalker {
    /**
   * @param {YXmlFragment | YXmlElement} root
   * @param {function(AbstractType<any>):boolean} [f]
   */ constructor(root, f = ()=>true){
        this._filter = f;
        this._root = root;
        /**
     * @type {Item}
     */ this._currentNode = /** @type {Item} */ root._start;
        this._firstCall = true;
    }
    [Symbol.iterator]() {
        return this;
    }
    /**
   * Get the next node.
   *
   * @return {IteratorResult<YXmlElement|YXmlText|YXmlHook>} The next node.
   *
   * @public
   */ next() {
        /**
     * @type {Item|null}
     */ let n = this._currentNode;
        let type = n && n.content && /** @type {any} */ n.content.type;
        if (n !== null && (!this._firstCall || n.deleted || !this._filter(type))) do {
            type = /** @type {any} */ n.content.type;
            if (!n.deleted && (type.constructor === $52a83e33f2b9e935$export$4db87581d3ca170d || type.constructor === $52a83e33f2b9e935$export$d5ce8c3e1731f1a7) && type._start !== null) // walk down in the tree
            n = type._start;
            else // walk right or up in the tree
            while(n !== null){
                if (n.right !== null) {
                    n = n.right;
                    break;
                } else if (n.parent === this._root) n = null;
                else n = /** @type {AbstractType<any>} */ n.parent._item;
            }
        }while (n !== null && (n.deleted || !this._filter(/** @type {ContentType} */ n.content.type)));
        this._firstCall = false;
        if (n === null) // @ts-ignore
        return {
            value: undefined,
            done: true
        };
        this._currentNode = n;
        return {
            value: /** @type {any} */ n.content.type,
            done: false
        };
    }
}
/**
 * Represents a list of {@link YXmlElement}.and {@link YXmlText} types.
 * A YxmlFragment is similar to a {@link YXmlElement}, but it does not have a
 * nodeName and it does not have attributes. Though it can be bound to a DOM
 * element - in this case the attributes and the nodeName are not shared.
 *
 * @public
 * @extends AbstractType<YXmlEvent>
 */ class $52a83e33f2b9e935$export$d5ce8c3e1731f1a7 extends $52a83e33f2b9e935$export$c265dc8338484497 {
    constructor(){
        super();
        /**
     * @type {Array<any>|null}
     */ this._prelimContent = [];
    }
    /**
   * @type {YXmlElement|YXmlText|null}
   */ get firstChild() {
        const first = this._first;
        return first ? first.content.getContent()[0] : null;
    }
    /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item} item
   */ _integrate(y, item) {
        super._integrate(y, item);
        this.insert(0, /** @type {Array<any>} */ this._prelimContent);
        this._prelimContent = null;
    }
    _copy() {
        return new $52a83e33f2b9e935$export$d5ce8c3e1731f1a7();
    }
    /**
   * @return {YXmlFragment}
   */ clone() {
        const el = new $52a83e33f2b9e935$export$d5ce8c3e1731f1a7();
        // @ts-ignore
        el.insert(0, this.toArray().map((item)=>item instanceof $52a83e33f2b9e935$export$c265dc8338484497 ? item.clone() : item));
        return el;
    }
    get length() {
        return this._prelimContent === null ? this._length : this._prelimContent.length;
    }
    /**
   * Create a subtree of childNodes.
   *
   * @example
   * const walker = elem.createTreeWalker(dom => dom.nodeName === 'div')
   * for (let node in walker) {
   *   // `node` is a div node
   *   nop(node)
   * }
   *
   * @param {function(AbstractType<any>):boolean} filter Function that is called on each child element and
   *                          returns a Boolean indicating whether the child
   *                          is to be included in the subtree.
   * @return {YXmlTreeWalker} A subtree and a position within it.
   *
   * @public
   */ createTreeWalker(filter) {
        return new $52a83e33f2b9e935$var$YXmlTreeWalker(this, filter);
    }
    /**
   * Returns the first YXmlElement that matches the query.
   * Similar to DOM's {@link querySelector}.
   *
   * Query support:
   *   - tagname
   * TODO:
   *   - id
   *   - attribute
   *
   * @param {CSS_Selector} query The query on the children.
   * @return {YXmlElement|YXmlText|YXmlHook|null} The first element that matches the query or null.
   *
   * @public
   */ querySelector(query) {
        query = query.toUpperCase();
        // @ts-ignore
        const iterator = new $52a83e33f2b9e935$var$YXmlTreeWalker(this, (element)=>element.nodeName && element.nodeName.toUpperCase() === query);
        const next = iterator.next();
        if (next.done) return null;
        else return next.value;
    }
    /**
   * Returns all YXmlElements that match the query.
   * Similar to Dom's {@link querySelectorAll}.
   *
   * @todo Does not yet support all queries. Currently only query by tagName.
   *
   * @param {CSS_Selector} query The query on the children
   * @return {Array<YXmlElement|YXmlText|YXmlHook|null>} The elements that match this query.
   *
   * @public
   */ querySelectorAll(query) {
        query = query.toUpperCase();
        // @ts-ignore
        return $7sfdv.from(new $52a83e33f2b9e935$var$YXmlTreeWalker(this, (element)=>element.nodeName && element.nodeName.toUpperCase() === query));
    }
    /**
   * Creates YXmlEvent and calls observers.
   *
   * @param {Transaction} transaction
   * @param {Set<null|string>} parentSubs Keys changed on this type. `null` if list was modified.
   */ _callObserver(transaction, parentSubs) {
        $52a83e33f2b9e935$var$callTypeObservers(this, transaction, new $52a83e33f2b9e935$export$88c9145a0c3b556c(this, parentSubs, transaction));
    }
    /**
   * Get the string representation of all the children of this YXmlFragment.
   *
   * @return {string} The string representation of all children.
   */ toString() {
        return $52a83e33f2b9e935$var$typeListMap(this, (xml)=>xml.toString()).join("");
    }
    /**
   * @return {string}
   */ toJSON() {
        return this.toString();
    }
    /**
   * Creates a Dom Element that mirrors this YXmlElement.
   *
   * @param {Document} [_document=document] The document object (you must define
   *                                        this when calling this method in
   *                                        nodejs)
   * @param {Object<string, any>} [hooks={}] Optional property to customize how hooks
   *                                             are presented in the DOM
   * @param {any} [binding] You should not set this property. This is
   *                               used if DomBinding wants to create a
   *                               association to the created DOM type.
   * @return {Node} The {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}
   *
   * @public
   */ toDOM(_document = document, hooks = {}, binding) {
        const fragment = _document.createDocumentFragment();
        if (binding !== undefined) binding._createAssociation(fragment, this);
        $52a83e33f2b9e935$var$typeListForEach(this, (xmlType)=>{
            fragment.insertBefore(xmlType.toDOM(_document, hooks, binding), null);
        });
        return fragment;
    }
    /**
   * Inserts new content at an index.
   *
   * @example
   *  // Insert character 'a' at position 0
   *  xml.insert(0, [new Y.XmlText('text')])
   *
   * @param {number} index The index to insert content at
   * @param {Array<YXmlElement|YXmlText>} content The array of content
   */ insert(index, content) {
        if (this.doc !== null) $52a83e33f2b9e935$export$dac1bad6146b2469(this.doc, (transaction)=>{
            $52a83e33f2b9e935$var$typeListInsertGenerics(transaction, this, index, content);
        });
        else // @ts-ignore _prelimContent is defined because this is not yet integrated
        this._prelimContent.splice(index, 0, ...content);
    }
    /**
   * Inserts new content at an index.
   *
   * @example
   *  // Insert character 'a' at position 0
   *  xml.insert(0, [new Y.XmlText('text')])
   *
   * @param {null|Item|YXmlElement|YXmlText} ref The index to insert content at
   * @param {Array<YXmlElement|YXmlText>} content The array of content
   */ insertAfter(ref, content) {
        if (this.doc !== null) $52a83e33f2b9e935$export$dac1bad6146b2469(this.doc, (transaction)=>{
            const refItem = ref && ref instanceof $52a83e33f2b9e935$export$c265dc8338484497 ? ref._item : ref;
            $52a83e33f2b9e935$var$typeListInsertGenericsAfter(transaction, this, refItem, content);
        });
        else {
            const pc = /** @type {Array<any>} */ this._prelimContent;
            const index = ref === null ? 0 : pc.findIndex((el)=>el === ref) + 1;
            if (index === 0 && ref !== null) throw $akmFO.create("Reference item not found");
            pc.splice(index, 0, ...content);
        }
    }
    /**
   * Deletes elements starting from an index.
   *
   * @param {number} index Index at which to start deleting elements
   * @param {number} [length=1] The number of elements to remove. Defaults to 1.
   */ delete(index, length = 1) {
        if (this.doc !== null) $52a83e33f2b9e935$export$dac1bad6146b2469(this.doc, (transaction)=>{
            $52a83e33f2b9e935$var$typeListDelete(transaction, this, index, length);
        });
        else // @ts-ignore _prelimContent is defined because this is not yet integrated
        this._prelimContent.splice(index, length);
    }
    /**
   * Transforms this YArray to a JavaScript Array.
   *
   * @return {Array<YXmlElement|YXmlText|YXmlHook>}
   */ toArray() {
        return $52a83e33f2b9e935$var$typeListToArray(this);
    }
    /**
   * Appends content to this YArray.
   *
   * @param {Array<YXmlElement|YXmlText>} content Array of content to append.
   */ push(content) {
        this.insert(this.length, content);
    }
    /**
   * Preppends content to this YArray.
   *
   * @param {Array<YXmlElement|YXmlText>} content Array of content to preppend.
   */ unshift(content) {
        this.insert(0, content);
    }
    /**
   * Returns the i-th element from a YArray.
   *
   * @param {number} index The index of the element to return from the YArray
   * @return {YXmlElement|YXmlText}
   */ get(index) {
        return $52a83e33f2b9e935$var$typeListGet(this, index);
    }
    /**
   * Transforms this YArray to a JavaScript Array.
   *
   * @param {number} [start]
   * @param {number} [end]
   * @return {Array<YXmlElement|YXmlText>}
   */ slice(start = 0, end = this.length) {
        return $52a83e33f2b9e935$var$typeListSlice(this, start, end);
    }
    /**
   * Executes a provided function on once on overy child element.
   *
   * @param {function(YXmlElement|YXmlText,number, typeof self):void} f A function to execute on every element of this YArray.
   */ forEach(f) {
        $52a83e33f2b9e935$var$typeListForEach(this, f);
    }
    /**
   * Transform the properties of this type to binary and write it to an
   * BinaryEncoder.
   *
   * This is called when this Item is sent to a remote peer.
   *
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder The encoder to write data to.
   */ _write(encoder) {
        encoder.writeTypeRef($52a83e33f2b9e935$var$YXmlFragmentRefID);
    }
}
/**
 * @param {UpdateDecoderV1 | UpdateDecoderV2} _decoder
 * @return {YXmlFragment}
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$readYXmlFragment = (_decoder)=>new $52a83e33f2b9e935$export$d5ce8c3e1731f1a7();
/**
 * @typedef {Object|number|null|Array<any>|string|Uint8Array|AbstractType<any>} ValueTypes
 */ /**
 * An YXmlElement imitates the behavior of a
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}.
 *
 * * An YXmlElement has attributes (key value pairs)
 * * An YXmlElement has childElements that must inherit from YXmlElement
 *
 * @template {{ [key: string]: ValueTypes }} [KV={ [key: string]: string }]
 */ class $52a83e33f2b9e935$export$4db87581d3ca170d extends $52a83e33f2b9e935$export$d5ce8c3e1731f1a7 {
    constructor(nodeName = "UNDEFINED"){
        super();
        this.nodeName = nodeName;
        /**
     * @type {Map<string, any>|null}
     */ this._prelimAttrs = new Map();
    }
    /**
   * @type {YXmlElement|YXmlText|null}
   */ get nextSibling() {
        const n = this._item ? this._item.next : null;
        return n ? /** @type {YXmlElement|YXmlText} */ /** @type {ContentType} */ n.content.type : null;
    }
    /**
   * @type {YXmlElement|YXmlText|null}
   */ get prevSibling() {
        const n = this._item ? this._item.prev : null;
        return n ? /** @type {YXmlElement|YXmlText} */ /** @type {ContentType} */ n.content.type : null;
    }
    /**
   * Integrate this type into the Yjs instance.
   *
   * * Save this struct in the os
   * * This type is sent to other client
   * * Observer functions are fired
   *
   * @param {Doc} y The Yjs instance
   * @param {Item} item
   */ _integrate(y, item) {
        super._integrate(y, item);
        /** @type {Map<string, any>} */ this._prelimAttrs.forEach((value, key)=>{
            this.setAttribute(key, value);
        });
        this._prelimAttrs = null;
    }
    /**
   * Creates an Item with the same effect as this Item (without position effect)
   *
   * @return {YXmlElement}
   */ _copy() {
        return new $52a83e33f2b9e935$export$4db87581d3ca170d(this.nodeName);
    }
    /**
   * @return {YXmlElement<KV>}
   */ clone() {
        /**
     * @type {YXmlElement<KV>}
     */ const el = new $52a83e33f2b9e935$export$4db87581d3ca170d(this.nodeName);
        const attrs = this.getAttributes();
        $97qUn.forEach(attrs, (value, key)=>{
            if (typeof value === "string") el.setAttribute(key, value);
        });
        // @ts-ignore
        el.insert(0, this.toArray().map((item)=>item instanceof $52a83e33f2b9e935$export$c265dc8338484497 ? item.clone() : item));
        return el;
    }
    /**
   * Returns the XML serialization of this YXmlElement.
   * The attributes are ordered by attribute-name, so you can easily use this
   * method to compare YXmlElements
   *
   * @return {string} The string representation of this type.
   *
   * @public
   */ toString() {
        const attrs = this.getAttributes();
        const stringBuilder = [];
        const keys = [];
        for(const key in attrs)keys.push(key);
        keys.sort();
        const keysLen = keys.length;
        for(let i = 0; i < keysLen; i++){
            const key = keys[i];
            stringBuilder.push(key + '="' + attrs[key] + '"');
        }
        const nodeName = this.nodeName.toLocaleLowerCase();
        const attrsString = stringBuilder.length > 0 ? " " + stringBuilder.join(" ") : "";
        return `<${nodeName}${attrsString}>${super.toString()}</${nodeName}>`;
    }
    /**
   * Removes an attribute from this YXmlElement.
   *
   * @param {string} attributeName The attribute name that is to be removed.
   *
   * @public
   */ removeAttribute(attributeName) {
        if (this.doc !== null) $52a83e33f2b9e935$export$dac1bad6146b2469(this.doc, (transaction)=>{
            $52a83e33f2b9e935$var$typeMapDelete(transaction, this, attributeName);
        });
        else /** @type {Map<string,any>} */ this._prelimAttrs.delete(attributeName);
    }
    /**
   * Sets or updates an attribute.
   *
   * @template {keyof KV & string} KEY
   *
   * @param {KEY} attributeName The attribute name that is to be set.
   * @param {KV[KEY]} attributeValue The attribute value that is to be set.
   *
   * @public
   */ setAttribute(attributeName, attributeValue) {
        if (this.doc !== null) $52a83e33f2b9e935$export$dac1bad6146b2469(this.doc, (transaction)=>{
            $52a83e33f2b9e935$var$typeMapSet(transaction, this, attributeName, attributeValue);
        });
        else /** @type {Map<string, any>} */ this._prelimAttrs.set(attributeName, attributeValue);
    }
    /**
   * Returns an attribute value that belongs to the attribute name.
   *
   * @template {keyof KV & string} KEY
   *
   * @param {KEY} attributeName The attribute name that identifies the
   *                               queried value.
   * @return {KV[KEY]|undefined} The queried attribute value.
   *
   * @public
   */ getAttribute(attributeName) {
        return /** @type {any} */ $52a83e33f2b9e935$var$typeMapGet(this, attributeName);
    }
    /**
   * Returns whether an attribute exists
   *
   * @param {string} attributeName The attribute name to check for existence.
   * @return {boolean} whether the attribute exists.
   *
   * @public
   */ hasAttribute(attributeName) {
        return /** @type {any} */ $52a83e33f2b9e935$var$typeMapHas(this, attributeName);
    }
    /**
   * Returns all attribute name/value pairs in a JSON Object.
   *
   * @return {{ [Key in Extract<keyof KV,string>]?: KV[Key]}} A JSON Object that describes the attributes.
   *
   * @public
   */ getAttributes() {
        return /** @type {any} */ $52a83e33f2b9e935$var$typeMapGetAll(this);
    }
    /**
   * Creates a Dom Element that mirrors this YXmlElement.
   *
   * @param {Document} [_document=document] The document object (you must define
   *                                        this when calling this method in
   *                                        nodejs)
   * @param {Object<string, any>} [hooks={}] Optional property to customize how hooks
   *                                             are presented in the DOM
   * @param {any} [binding] You should not set this property. This is
   *                               used if DomBinding wants to create a
   *                               association to the created DOM type.
   * @return {Node} The {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}
   *
   * @public
   */ toDOM(_document = document, hooks = {}, binding) {
        const dom = _document.createElement(this.nodeName);
        const attrs = this.getAttributes();
        for(const key in attrs){
            const value = attrs[key];
            if (typeof value === "string") dom.setAttribute(key, value);
        }
        $52a83e33f2b9e935$var$typeListForEach(this, (yxml)=>{
            dom.appendChild(yxml.toDOM(_document, hooks, binding));
        });
        if (binding !== undefined) binding._createAssociation(dom, this);
        return dom;
    }
    /**
   * Transform the properties of this type to binary and write it to an
   * BinaryEncoder.
   *
   * This is called when this Item is sent to a remote peer.
   *
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder The encoder to write data to.
   */ _write(encoder) {
        encoder.writeTypeRef($52a83e33f2b9e935$var$YXmlElementRefID);
        encoder.writeKey(this.nodeName);
    }
}
/**
 * @param {UpdateDecoderV1 | UpdateDecoderV2} decoder
 * @return {YXmlElement}
 *
 * @function
 */ const $52a83e33f2b9e935$var$readYXmlElement = (decoder)=>new $52a83e33f2b9e935$export$4db87581d3ca170d(decoder.readKey());
/**
 * @extends YEvent<YXmlElement|YXmlText|YXmlFragment>
 * An Event that describes changes on a YXml Element or Yxml Fragment
 */ class $52a83e33f2b9e935$export$88c9145a0c3b556c extends $52a83e33f2b9e935$export$80fac438977fb51c {
    /**
   * @param {YXmlElement|YXmlText|YXmlFragment} target The target on which the event is created.
   * @param {Set<string|null>} subs The set of changed attributes. `null` is included if the
   *                   child list changed.
   * @param {Transaction} transaction The transaction instance with wich the
   *                                  change was created.
   */ constructor(target, subs, transaction){
        super(target, transaction);
        /**
     * Whether the children changed.
     * @type {Boolean}
     * @private
     */ this.childListChanged = false;
        /**
     * Set of all changed attributes.
     * @type {Set<string>}
     */ this.attributesChanged = new Set();
        subs.forEach((sub)=>{
            if (sub === null) this.childListChanged = true;
            else this.attributesChanged.add(sub);
        });
    }
}
/**
 * You can manage binding to a custom type with YXmlHook.
 *
 * @extends {YMap<any>}
 */ class $52a83e33f2b9e935$export$ec64c1dd5e7a264 extends $52a83e33f2b9e935$export$a5c7b93649eaf8f8 {
    /**
   * @param {string} hookName nodeName of the Dom Node.
   */ constructor(hookName){
        super();
        /**
     * @type {string}
     */ this.hookName = hookName;
    }
    /**
   * Creates an Item with the same effect as this Item (without position effect)
   */ _copy() {
        return new $52a83e33f2b9e935$export$ec64c1dd5e7a264(this.hookName);
    }
    /**
   * @return {YXmlHook}
   */ clone() {
        const el = new $52a83e33f2b9e935$export$ec64c1dd5e7a264(this.hookName);
        this.forEach((value, key)=>{
            el.set(key, value);
        });
        return el;
    }
    /**
   * Creates a Dom Element that mirrors this YXmlElement.
   *
   * @param {Document} [_document=document] The document object (you must define
   *                                        this when calling this method in
   *                                        nodejs)
   * @param {Object.<string, any>} [hooks] Optional property to customize how hooks
   *                                             are presented in the DOM
   * @param {any} [binding] You should not set this property. This is
   *                               used if DomBinding wants to create a
   *                               association to the created DOM type
   * @return {Element} The {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}
   *
   * @public
   */ toDOM(_document = document, hooks = {}, binding) {
        const hook = hooks[this.hookName];
        let dom;
        if (hook !== undefined) dom = hook.createDom(this);
        else dom = document.createElement(this.hookName);
        dom.setAttribute("data-yjs-hook", this.hookName);
        if (binding !== undefined) binding._createAssociation(dom, this);
        return dom;
    }
    /**
   * Transform the properties of this type to binary and write it to an
   * BinaryEncoder.
   *
   * This is called when this Item is sent to a remote peer.
   *
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder The encoder to write data to.
   */ _write(encoder) {
        encoder.writeTypeRef($52a83e33f2b9e935$var$YXmlHookRefID);
        encoder.writeKey(this.hookName);
    }
}
/**
 * @param {UpdateDecoderV1 | UpdateDecoderV2} decoder
 * @return {YXmlHook}
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$readYXmlHook = (decoder)=>new $52a83e33f2b9e935$export$ec64c1dd5e7a264(decoder.readKey());
/**
 * Represents text in a Dom Element. In the future this type will also handle
 * simple formatting information like bold and italic.
 */ class $52a83e33f2b9e935$export$b35b8f45887823df extends $52a83e33f2b9e935$export$5f1af8db9871e1d6 {
    /**
   * @type {YXmlElement|YXmlText|null}
   */ get nextSibling() {
        const n = this._item ? this._item.next : null;
        return n ? /** @type {YXmlElement|YXmlText} */ /** @type {ContentType} */ n.content.type : null;
    }
    /**
   * @type {YXmlElement|YXmlText|null}
   */ get prevSibling() {
        const n = this._item ? this._item.prev : null;
        return n ? /** @type {YXmlElement|YXmlText} */ /** @type {ContentType} */ n.content.type : null;
    }
    _copy() {
        return new $52a83e33f2b9e935$export$b35b8f45887823df();
    }
    /**
   * @return {YXmlText}
   */ clone() {
        const text = new $52a83e33f2b9e935$export$b35b8f45887823df();
        text.applyDelta(this.toDelta());
        return text;
    }
    /**
   * Creates a Dom Element that mirrors this YXmlText.
   *
   * @param {Document} [_document=document] The document object (you must define
   *                                        this when calling this method in
   *                                        nodejs)
   * @param {Object<string, any>} [hooks] Optional property to customize how hooks
   *                                             are presented in the DOM
   * @param {any} [binding] You should not set this property. This is
   *                               used if DomBinding wants to create a
   *                               association to the created DOM type.
   * @return {Text} The {@link https://developer.mozilla.org/en-US/docs/Web/API/Element|Dom Element}
   *
   * @public
   */ toDOM(_document = document, hooks, binding) {
        const dom = _document.createTextNode(this.toString());
        if (binding !== undefined) binding._createAssociation(dom, this);
        return dom;
    }
    toString() {
        // @ts-ignore
        return this.toDelta().map((delta)=>{
            const nestedNodes = [];
            for(const nodeName in delta.attributes){
                const attrs = [];
                for(const key in delta.attributes[nodeName])attrs.push({
                    key: key,
                    value: delta.attributes[nodeName][key]
                });
                // sort attributes to get a unique order
                attrs.sort((a, b)=>a.key < b.key ? -1 : 1);
                nestedNodes.push({
                    nodeName: nodeName,
                    attrs: attrs
                });
            }
            // sort node order to get a unique order
            nestedNodes.sort((a, b)=>a.nodeName < b.nodeName ? -1 : 1);
            // now convert to dom string
            let str = "";
            for(let i = 0; i < nestedNodes.length; i++){
                const node = nestedNodes[i];
                str += `<${node.nodeName}`;
                for(let j = 0; j < node.attrs.length; j++){
                    const attr = node.attrs[j];
                    str += ` ${attr.key}="${attr.value}"`;
                }
                str += ">";
            }
            str += delta.insert;
            for(let i = nestedNodes.length - 1; i >= 0; i--)str += `</${nestedNodes[i].nodeName}>`;
            return str;
        }).join("");
    }
    /**
   * @return {string}
   */ toJSON() {
        return this.toString();
    }
    /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   */ _write(encoder) {
        encoder.writeTypeRef($52a83e33f2b9e935$var$YXmlTextRefID);
    }
}
/**
 * @param {UpdateDecoderV1 | UpdateDecoderV2} decoder
 * @return {YXmlText}
 *
 * @private
 * @function
 */ const $52a83e33f2b9e935$var$readYXmlText = (decoder)=>new $52a83e33f2b9e935$export$b35b8f45887823df();
class $52a83e33f2b9e935$export$3cf6f9765c5c3196 {
    /**
   * @param {ID} id
   * @param {number} length
   */ constructor(id, length){
        this.id = id;
        this.length = length;
    }
    /**
   * @type {boolean}
   */ get deleted() {
        throw $akmFO.methodUnimplemented();
    }
    /**
   * Merge this struct with the item to the right.
   * This method is already assuming that `this.id.clock + this.length === this.id.clock`.
   * Also this method does *not* remove right from StructStore!
   * @param {AbstractStruct} right
   * @return {boolean} wether this merged with right
   */ mergeWith(right) {
        return false;
    }
    /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder The encoder to write data to.
   * @param {number} offset
   * @param {number} encodingRef
   */ write(encoder, offset, encodingRef) {
        throw $akmFO.methodUnimplemented();
    }
    /**
   * @param {Transaction} transaction
   * @param {number} offset
   */ integrate(transaction, offset) {
        throw $akmFO.methodUnimplemented();
    }
}
const $52a83e33f2b9e935$var$structGCRefNumber = 0;
/**
 * @private
 */ class $52a83e33f2b9e935$export$12d259ff017e6b58 extends $52a83e33f2b9e935$export$3cf6f9765c5c3196 {
    get deleted() {
        return true;
    }
    delete() {}
    /**
   * @param {GC} right
   * @return {boolean}
   */ mergeWith(right) {
        if (this.constructor !== right.constructor) return false;
        this.length += right.length;
        return true;
    }
    /**
   * @param {Transaction} transaction
   * @param {number} offset
   */ integrate(transaction, offset) {
        if (offset > 0) {
            this.id.clock += offset;
            this.length -= offset;
        }
        $52a83e33f2b9e935$var$addStruct(transaction.doc.store, this);
    }
    /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */ write(encoder, offset) {
        encoder.writeInfo($52a83e33f2b9e935$var$structGCRefNumber);
        encoder.writeLen(this.length - offset);
    }
    /**
   * @param {Transaction} transaction
   * @param {StructStore} store
   * @return {null | number}
   */ getMissing(transaction, store) {
        return null;
    }
}
class $52a83e33f2b9e935$export$e8d530cdf62d1cbd {
    /**
   * @param {Uint8Array} content
   */ constructor(content){
        this.content = content;
    }
    /**
   * @return {number}
   */ getLength() {
        return 1;
    }
    /**
   * @return {Array<any>}
   */ getContent() {
        return [
            this.content
        ];
    }
    /**
   * @return {boolean}
   */ isCountable() {
        return true;
    }
    /**
   * @return {ContentBinary}
   */ copy() {
        return new $52a83e33f2b9e935$export$e8d530cdf62d1cbd(this.content);
    }
    /**
   * @param {number} offset
   * @return {ContentBinary}
   */ splice(offset) {
        throw $akmFO.methodUnimplemented();
    }
    /**
   * @param {ContentBinary} right
   * @return {boolean}
   */ mergeWith(right) {
        return false;
    }
    /**
   * @param {Transaction} transaction
   * @param {Item} item
   */ integrate(transaction, item) {}
    /**
   * @param {Transaction} transaction
   */ delete(transaction) {}
    /**
   * @param {StructStore} store
   */ gc(store) {}
    /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */ write(encoder, offset) {
        encoder.writeBuf(this.content);
    }
    /**
   * @return {number}
   */ getRef() {
        return 3;
    }
}
/**
 * @param {UpdateDecoderV1 | UpdateDecoderV2 } decoder
 * @return {ContentBinary}
 */ const $52a83e33f2b9e935$var$readContentBinary = (decoder)=>new $52a83e33f2b9e935$export$e8d530cdf62d1cbd(decoder.readBuf());
class $52a83e33f2b9e935$export$3b06e0b3a2ece602 {
    /**
   * @param {number} len
   */ constructor(len){
        this.len = len;
    }
    /**
   * @return {number}
   */ getLength() {
        return this.len;
    }
    /**
   * @return {Array<any>}
   */ getContent() {
        return [];
    }
    /**
   * @return {boolean}
   */ isCountable() {
        return false;
    }
    /**
   * @return {ContentDeleted}
   */ copy() {
        return new $52a83e33f2b9e935$export$3b06e0b3a2ece602(this.len);
    }
    /**
   * @param {number} offset
   * @return {ContentDeleted}
   */ splice(offset) {
        const right = new $52a83e33f2b9e935$export$3b06e0b3a2ece602(this.len - offset);
        this.len = offset;
        return right;
    }
    /**
   * @param {ContentDeleted} right
   * @return {boolean}
   */ mergeWith(right) {
        this.len += right.len;
        return true;
    }
    /**
   * @param {Transaction} transaction
   * @param {Item} item
   */ integrate(transaction, item) {
        $52a83e33f2b9e935$var$addToDeleteSet(transaction.deleteSet, item.id.client, item.id.clock, this.len);
        item.markDeleted();
    }
    /**
   * @param {Transaction} transaction
   */ delete(transaction) {}
    /**
   * @param {StructStore} store
   */ gc(store) {}
    /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */ write(encoder, offset) {
        encoder.writeLen(this.len - offset);
    }
    /**
   * @return {number}
   */ getRef() {
        return 1;
    }
}
/**
 * @private
 *
 * @param {UpdateDecoderV1 | UpdateDecoderV2 } decoder
 * @return {ContentDeleted}
 */ const $52a83e33f2b9e935$var$readContentDeleted = (decoder)=>new $52a83e33f2b9e935$export$3b06e0b3a2ece602(decoder.readLen());
/**
 * @param {string} guid
 * @param {Object<string, any>} opts
 */ const $52a83e33f2b9e935$var$createDocFromOpts = (guid, opts)=>new $52a83e33f2b9e935$export$bceacc74c2212615({
        guid: guid,
        ...opts,
        shouldLoad: opts.shouldLoad || opts.autoLoad || false
    });
/**
 * @private
 */ class $52a83e33f2b9e935$var$ContentDoc {
    /**
   * @param {Doc} doc
   */ constructor(doc){
        if (doc._item) console.error("This document was already integrated as a sub-document. You should create a second instance instead with the same guid.");
        /**
     * @type {Doc}
     */ this.doc = doc;
        /**
     * @type {any}
     */ const opts = {};
        this.opts = opts;
        if (!doc.gc) opts.gc = false;
        if (doc.autoLoad) opts.autoLoad = true;
        if (doc.meta !== null) opts.meta = doc.meta;
    }
    /**
   * @return {number}
   */ getLength() {
        return 1;
    }
    /**
   * @return {Array<any>}
   */ getContent() {
        return [
            this.doc
        ];
    }
    /**
   * @return {boolean}
   */ isCountable() {
        return true;
    }
    /**
   * @return {ContentDoc}
   */ copy() {
        return new $52a83e33f2b9e935$var$ContentDoc($52a83e33f2b9e935$var$createDocFromOpts(this.doc.guid, this.opts));
    }
    /**
   * @param {number} offset
   * @return {ContentDoc}
   */ splice(offset) {
        throw $akmFO.methodUnimplemented();
    }
    /**
   * @param {ContentDoc} right
   * @return {boolean}
   */ mergeWith(right) {
        return false;
    }
    /**
   * @param {Transaction} transaction
   * @param {Item} item
   */ integrate(transaction, item) {
        // this needs to be reflected in doc.destroy as well
        this.doc._item = item;
        transaction.subdocsAdded.add(this.doc);
        if (this.doc.shouldLoad) transaction.subdocsLoaded.add(this.doc);
    }
    /**
   * @param {Transaction} transaction
   */ delete(transaction) {
        if (transaction.subdocsAdded.has(this.doc)) transaction.subdocsAdded.delete(this.doc);
        else transaction.subdocsRemoved.add(this.doc);
    }
    /**
   * @param {StructStore} store
   */ gc(store) {}
    /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */ write(encoder, offset) {
        encoder.writeString(this.doc.guid);
        encoder.writeAny(this.opts);
    }
    /**
   * @return {number}
   */ getRef() {
        return 9;
    }
}
/**
 * @private
 *
 * @param {UpdateDecoderV1 | UpdateDecoderV2} decoder
 * @return {ContentDoc}
 */ const $52a83e33f2b9e935$var$readContentDoc = (decoder)=>new $52a83e33f2b9e935$var$ContentDoc($52a83e33f2b9e935$var$createDocFromOpts(decoder.readString(), decoder.readAny()));
/**
 * @private
 */ class $52a83e33f2b9e935$export$c3787ba7f6086664 {
    /**
   * @param {Object} embed
   */ constructor(embed){
        this.embed = embed;
    }
    /**
   * @return {number}
   */ getLength() {
        return 1;
    }
    /**
   * @return {Array<any>}
   */ getContent() {
        return [
            this.embed
        ];
    }
    /**
   * @return {boolean}
   */ isCountable() {
        return true;
    }
    /**
   * @return {ContentEmbed}
   */ copy() {
        return new $52a83e33f2b9e935$export$c3787ba7f6086664(this.embed);
    }
    /**
   * @param {number} offset
   * @return {ContentEmbed}
   */ splice(offset) {
        throw $akmFO.methodUnimplemented();
    }
    /**
   * @param {ContentEmbed} right
   * @return {boolean}
   */ mergeWith(right) {
        return false;
    }
    /**
   * @param {Transaction} transaction
   * @param {Item} item
   */ integrate(transaction, item) {}
    /**
   * @param {Transaction} transaction
   */ delete(transaction) {}
    /**
   * @param {StructStore} store
   */ gc(store) {}
    /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */ write(encoder, offset) {
        encoder.writeJSON(this.embed);
    }
    /**
   * @return {number}
   */ getRef() {
        return 5;
    }
}
/**
 * @private
 *
 * @param {UpdateDecoderV1 | UpdateDecoderV2} decoder
 * @return {ContentEmbed}
 */ const $52a83e33f2b9e935$var$readContentEmbed = (decoder)=>new $52a83e33f2b9e935$export$c3787ba7f6086664(decoder.readJSON());
/**
 * @private
 */ class $52a83e33f2b9e935$export$3194899188fb5a88 {
    /**
   * @param {string} key
   * @param {Object} value
   */ constructor(key, value){
        this.key = key;
        this.value = value;
    }
    /**
   * @return {number}
   */ getLength() {
        return 1;
    }
    /**
   * @return {Array<any>}
   */ getContent() {
        return [];
    }
    /**
   * @return {boolean}
   */ isCountable() {
        return false;
    }
    /**
   * @return {ContentFormat}
   */ copy() {
        return new $52a83e33f2b9e935$export$3194899188fb5a88(this.key, this.value);
    }
    /**
   * @param {number} _offset
   * @return {ContentFormat}
   */ splice(_offset) {
        throw $akmFO.methodUnimplemented();
    }
    /**
   * @param {ContentFormat} _right
   * @return {boolean}
   */ mergeWith(_right) {
        return false;
    }
    /**
   * @param {Transaction} _transaction
   * @param {Item} item
   */ integrate(_transaction, item) {
        // @todo searchmarker are currently unsupported for rich text documents
        const p = /** @type {YText} */ item.parent;
        p._searchMarker = null;
        p._hasFormatting = true;
    }
    /**
   * @param {Transaction} transaction
   */ delete(transaction) {}
    /**
   * @param {StructStore} store
   */ gc(store) {}
    /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */ write(encoder, offset) {
        encoder.writeKey(this.key);
        encoder.writeJSON(this.value);
    }
    /**
   * @return {number}
   */ getRef() {
        return 6;
    }
}
/**
 * @param {UpdateDecoderV1 | UpdateDecoderV2} decoder
 * @return {ContentFormat}
 */ const $52a83e33f2b9e935$var$readContentFormat = (decoder)=>new $52a83e33f2b9e935$export$3194899188fb5a88(decoder.readKey(), decoder.readJSON());
/**
 * @private
 */ class $52a83e33f2b9e935$export$6a907ea8f733ecf3 {
    /**
   * @param {Array<any>} arr
   */ constructor(arr){
        /**
     * @type {Array<any>}
     */ this.arr = arr;
    }
    /**
   * @return {number}
   */ getLength() {
        return this.arr.length;
    }
    /**
   * @return {Array<any>}
   */ getContent() {
        return this.arr;
    }
    /**
   * @return {boolean}
   */ isCountable() {
        return true;
    }
    /**
   * @return {ContentJSON}
   */ copy() {
        return new $52a83e33f2b9e935$export$6a907ea8f733ecf3(this.arr);
    }
    /**
   * @param {number} offset
   * @return {ContentJSON}
   */ splice(offset) {
        const right = new $52a83e33f2b9e935$export$6a907ea8f733ecf3(this.arr.slice(offset));
        this.arr = this.arr.slice(0, offset);
        return right;
    }
    /**
   * @param {ContentJSON} right
   * @return {boolean}
   */ mergeWith(right) {
        this.arr = this.arr.concat(right.arr);
        return true;
    }
    /**
   * @param {Transaction} transaction
   * @param {Item} item
   */ integrate(transaction, item) {}
    /**
   * @param {Transaction} transaction
   */ delete(transaction) {}
    /**
   * @param {StructStore} store
   */ gc(store) {}
    /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */ write(encoder, offset) {
        const len = this.arr.length;
        encoder.writeLen(len - offset);
        for(let i = offset; i < len; i++){
            const c = this.arr[i];
            encoder.writeString(c === undefined ? "undefined" : JSON.stringify(c));
        }
    }
    /**
   * @return {number}
   */ getRef() {
        return 2;
    }
}
/**
 * @private
 *
 * @param {UpdateDecoderV1 | UpdateDecoderV2} decoder
 * @return {ContentJSON}
 */ const $52a83e33f2b9e935$var$readContentJSON = (decoder)=>{
    const len = decoder.readLen();
    const cs = [];
    for(let i = 0; i < len; i++){
        const c = decoder.readString();
        if (c === "undefined") cs.push(undefined);
        else cs.push(JSON.parse(c));
    }
    return new $52a83e33f2b9e935$export$6a907ea8f733ecf3(cs);
};
class $52a83e33f2b9e935$export$1d788b93bbb631a0 {
    /**
   * @param {Array<any>} arr
   */ constructor(arr){
        /**
     * @type {Array<any>}
     */ this.arr = arr;
    }
    /**
   * @return {number}
   */ getLength() {
        return this.arr.length;
    }
    /**
   * @return {Array<any>}
   */ getContent() {
        return this.arr;
    }
    /**
   * @return {boolean}
   */ isCountable() {
        return true;
    }
    /**
   * @return {ContentAny}
   */ copy() {
        return new $52a83e33f2b9e935$export$1d788b93bbb631a0(this.arr);
    }
    /**
   * @param {number} offset
   * @return {ContentAny}
   */ splice(offset) {
        const right = new $52a83e33f2b9e935$export$1d788b93bbb631a0(this.arr.slice(offset));
        this.arr = this.arr.slice(0, offset);
        return right;
    }
    /**
   * @param {ContentAny} right
   * @return {boolean}
   */ mergeWith(right) {
        this.arr = this.arr.concat(right.arr);
        return true;
    }
    /**
   * @param {Transaction} transaction
   * @param {Item} item
   */ integrate(transaction, item) {}
    /**
   * @param {Transaction} transaction
   */ delete(transaction) {}
    /**
   * @param {StructStore} store
   */ gc(store) {}
    /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */ write(encoder, offset) {
        const len = this.arr.length;
        encoder.writeLen(len - offset);
        for(let i = offset; i < len; i++){
            const c = this.arr[i];
            encoder.writeAny(c);
        }
    }
    /**
   * @return {number}
   */ getRef() {
        return 8;
    }
}
/**
 * @param {UpdateDecoderV1 | UpdateDecoderV2} decoder
 * @return {ContentAny}
 */ const $52a83e33f2b9e935$var$readContentAny = (decoder)=>{
    const len = decoder.readLen();
    const cs = [];
    for(let i = 0; i < len; i++)cs.push(decoder.readAny());
    return new $52a83e33f2b9e935$export$1d788b93bbb631a0(cs);
};
/**
 * @private
 */ class $52a83e33f2b9e935$export$ee670b2cf091bbb6 {
    /**
   * @param {string} str
   */ constructor(str){
        /**
     * @type {string}
     */ this.str = str;
    }
    /**
   * @return {number}
   */ getLength() {
        return this.str.length;
    }
    /**
   * @return {Array<any>}
   */ getContent() {
        return this.str.split("");
    }
    /**
   * @return {boolean}
   */ isCountable() {
        return true;
    }
    /**
   * @return {ContentString}
   */ copy() {
        return new $52a83e33f2b9e935$export$ee670b2cf091bbb6(this.str);
    }
    /**
   * @param {number} offset
   * @return {ContentString}
   */ splice(offset) {
        const right = new $52a83e33f2b9e935$export$ee670b2cf091bbb6(this.str.slice(offset));
        this.str = this.str.slice(0, offset);
        // Prevent encoding invalid documents because of splitting of surrogate pairs: https://github.com/yjs/yjs/issues/248
        const firstCharCode = this.str.charCodeAt(offset - 1);
        if (firstCharCode >= 0xD800 && firstCharCode <= 0xDBFF) {
            // Last character of the left split is the start of a surrogate utf16/ucs2 pair.
            // We don't support splitting of surrogate pairs because this may lead to invalid documents.
            // Replace the invalid character with a unicode replacement character (� / U+FFFD)
            this.str = this.str.slice(0, offset - 1) + "\uFFFD";
            // replace right as well
            right.str = "\uFFFD" + right.str.slice(1);
        }
        return right;
    }
    /**
   * @param {ContentString} right
   * @return {boolean}
   */ mergeWith(right) {
        this.str += right.str;
        return true;
    }
    /**
   * @param {Transaction} transaction
   * @param {Item} item
   */ integrate(transaction, item) {}
    /**
   * @param {Transaction} transaction
   */ delete(transaction) {}
    /**
   * @param {StructStore} store
   */ gc(store) {}
    /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */ write(encoder, offset) {
        encoder.writeString(offset === 0 ? this.str : this.str.slice(offset));
    }
    /**
   * @return {number}
   */ getRef() {
        return 4;
    }
}
/**
 * @private
 *
 * @param {UpdateDecoderV1 | UpdateDecoderV2} decoder
 * @return {ContentString}
 */ const $52a83e33f2b9e935$var$readContentString = (decoder)=>new $52a83e33f2b9e935$export$ee670b2cf091bbb6(decoder.readString());
/**
 * @type {Array<function(UpdateDecoderV1 | UpdateDecoderV2):AbstractType<any>>}
 * @private
 */ const $52a83e33f2b9e935$var$typeRefs = [
    $52a83e33f2b9e935$var$readYArray,
    $52a83e33f2b9e935$var$readYMap,
    $52a83e33f2b9e935$var$readYText,
    $52a83e33f2b9e935$var$readYXmlElement,
    $52a83e33f2b9e935$var$readYXmlFragment,
    $52a83e33f2b9e935$var$readYXmlHook,
    $52a83e33f2b9e935$var$readYXmlText
];
const $52a83e33f2b9e935$var$YArrayRefID = 0;
const $52a83e33f2b9e935$var$YMapRefID = 1;
const $52a83e33f2b9e935$var$YTextRefID = 2;
const $52a83e33f2b9e935$var$YXmlElementRefID = 3;
const $52a83e33f2b9e935$var$YXmlFragmentRefID = 4;
const $52a83e33f2b9e935$var$YXmlHookRefID = 5;
const $52a83e33f2b9e935$var$YXmlTextRefID = 6;
/**
 * @private
 */ class $52a83e33f2b9e935$export$e2e108cbe2e4f865 {
    /**
   * @param {AbstractType<any>} type
   */ constructor(type){
        /**
     * @type {AbstractType<any>}
     */ this.type = type;
    }
    /**
   * @return {number}
   */ getLength() {
        return 1;
    }
    /**
   * @return {Array<any>}
   */ getContent() {
        return [
            this.type
        ];
    }
    /**
   * @return {boolean}
   */ isCountable() {
        return true;
    }
    /**
   * @return {ContentType}
   */ copy() {
        return new $52a83e33f2b9e935$export$e2e108cbe2e4f865(this.type._copy());
    }
    /**
   * @param {number} offset
   * @return {ContentType}
   */ splice(offset) {
        throw $akmFO.methodUnimplemented();
    }
    /**
   * @param {ContentType} right
   * @return {boolean}
   */ mergeWith(right) {
        return false;
    }
    /**
   * @param {Transaction} transaction
   * @param {Item} item
   */ integrate(transaction, item) {
        this.type._integrate(transaction.doc, item);
    }
    /**
   * @param {Transaction} transaction
   */ delete(transaction) {
        let item = this.type._start;
        while(item !== null){
            if (!item.deleted) item.delete(transaction);
            else if (item.id.clock < (transaction.beforeState.get(item.id.client) || 0)) // This will be gc'd later and we want to merge it if possible
            // We try to merge all deleted items after each transaction,
            // but we have no knowledge about that this needs to be merged
            // since it is not in transaction.ds. Hence we add it to transaction._mergeStructs
            transaction._mergeStructs.push(item);
            item = item.right;
        }
        this.type._map.forEach((item)=>{
            if (!item.deleted) item.delete(transaction);
            else if (item.id.clock < (transaction.beforeState.get(item.id.client) || 0)) // same as above
            transaction._mergeStructs.push(item);
        });
        transaction.changed.delete(this.type);
    }
    /**
   * @param {StructStore} store
   */ gc(store) {
        let item = this.type._start;
        while(item !== null){
            item.gc(store, true);
            item = item.right;
        }
        this.type._start = null;
        this.type._map.forEach(/** @param {Item | null} item */ (item)=>{
            while(item !== null){
                item.gc(store, true);
                item = item.left;
            }
        });
        this.type._map = new Map();
    }
    /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */ write(encoder, offset) {
        this.type._write(encoder);
    }
    /**
   * @return {number}
   */ getRef() {
        return 7;
    }
}
/**
 * @private
 *
 * @param {UpdateDecoderV1 | UpdateDecoderV2} decoder
 * @return {ContentType}
 */ const $52a83e33f2b9e935$var$readContentType = (decoder)=>new $52a83e33f2b9e935$export$e2e108cbe2e4f865($52a83e33f2b9e935$var$typeRefs[decoder.readTypeRef()](decoder));
/**
 * @todo This should return several items
 *
 * @param {StructStore} store
 * @param {ID} id
 * @return {{item:Item, diff:number}}
 */ const $52a83e33f2b9e935$var$followRedone = (store, id)=>{
    /**
   * @type {ID|null}
   */ let nextID = id;
    let diff = 0;
    let item;
    do {
        if (diff > 0) nextID = $52a83e33f2b9e935$export$6c7d4e6171d008d0(nextID.client, nextID.clock + diff);
        item = $52a83e33f2b9e935$export$f92dfeb71e9bb569(store, nextID);
        diff = nextID.clock - item.id.clock;
        nextID = item.redone;
    }while (nextID !== null && item instanceof $52a83e33f2b9e935$export$6d08773d2e66f8f2);
    return {
        item: item,
        diff: diff
    };
};
/**
 * Make sure that neither item nor any of its parents is ever deleted.
 *
 * This property does not persist when storing it into a database or when
 * sending it to other peers
 *
 * @param {Item|null} item
 * @param {boolean} keep
 */ const $52a83e33f2b9e935$var$keepItem = (item, keep)=>{
    while(item !== null && item.keep !== keep){
        item.keep = keep;
        item = /** @type {AbstractType<any>} */ item.parent._item;
    }
};
/**
 * Split leftItem into two items
 * @param {Transaction} transaction
 * @param {Item} leftItem
 * @param {number} diff
 * @return {Item}
 *
 * @function
 * @private
 */ const $52a83e33f2b9e935$var$splitItem = (transaction, leftItem, diff)=>{
    // create rightItem
    const { client: client, clock: clock } = leftItem.id;
    const rightItem = new $52a83e33f2b9e935$export$6d08773d2e66f8f2($52a83e33f2b9e935$export$6c7d4e6171d008d0(client, clock + diff), leftItem, $52a83e33f2b9e935$export$6c7d4e6171d008d0(client, clock + diff - 1), leftItem.right, leftItem.rightOrigin, leftItem.parent, leftItem.parentSub, leftItem.content.splice(diff));
    if (leftItem.deleted) rightItem.markDeleted();
    if (leftItem.keep) rightItem.keep = true;
    if (leftItem.redone !== null) rightItem.redone = $52a83e33f2b9e935$export$6c7d4e6171d008d0(leftItem.redone.client, leftItem.redone.clock + diff);
    // update left (do not set leftItem.rightOrigin as it will lead to problems when syncing)
    leftItem.right = rightItem;
    // update right
    if (rightItem.right !== null) rightItem.right.left = rightItem;
    // right is more specific.
    transaction._mergeStructs.push(rightItem);
    // update parent._map
    if (rightItem.parentSub !== null && rightItem.right === null) /** @type {AbstractType<any>} */ rightItem.parent._map.set(rightItem.parentSub, rightItem);
    leftItem.length = diff;
    return rightItem;
};
/**
 * @param {Array<StackItem>} stack
 * @param {ID} id
 */ const $52a83e33f2b9e935$var$isDeletedByUndoStack = (stack, id)=>$7sfdv.some(stack, /** @param {StackItem} s */ (s)=>$52a83e33f2b9e935$export$dcb04af092e44fde(s.deletions, id));
/**
 * Redoes the effect of this operation.
 *
 * @param {Transaction} transaction The Yjs instance.
 * @param {Item} item
 * @param {Set<Item>} redoitems
 * @param {DeleteSet} itemsToDelete
 * @param {boolean} ignoreRemoteMapChanges
 * @param {import('../utils/UndoManager.js').UndoManager} um
 *
 * @return {Item|null}
 *
 * @private
 */ const $52a83e33f2b9e935$var$redoItem = (transaction, item, redoitems, itemsToDelete, ignoreRemoteMapChanges, um)=>{
    const doc = transaction.doc;
    const store = doc.store;
    const ownClientID = doc.clientID;
    const redone = item.redone;
    if (redone !== null) return $52a83e33f2b9e935$var$getItemCleanStart(transaction, redone);
    let parentItem = /** @type {AbstractType<any>} */ item.parent._item;
    /**
   * @type {Item|null}
   */ let left = null;
    /**
   * @type {Item|null}
   */ let right;
    // make sure that parent is redone
    if (parentItem !== null && parentItem.deleted === true) {
        // try to undo parent if it will be undone anyway
        if (parentItem.redone === null && (!redoitems.has(parentItem) || $52a83e33f2b9e935$var$redoItem(transaction, parentItem, redoitems, itemsToDelete, ignoreRemoteMapChanges, um) === null)) return null;
        while(parentItem.redone !== null)parentItem = $52a83e33f2b9e935$var$getItemCleanStart(transaction, parentItem.redone);
    }
    const parentType = parentItem === null ? /** @type {AbstractType<any>} */ item.parent : /** @type {ContentType} */ parentItem.content.type;
    if (item.parentSub === null) {
        // Is an array item. Insert at the old position
        left = item.left;
        right = item;
        // find next cloned_redo items
        while(left !== null){
            /**
       * @type {Item|null}
       */ let leftTrace = left;
            // trace redone until parent matches
            while(leftTrace !== null && /** @type {AbstractType<any>} */ leftTrace.parent._item !== parentItem)leftTrace = leftTrace.redone === null ? null : $52a83e33f2b9e935$var$getItemCleanStart(transaction, leftTrace.redone);
            if (leftTrace !== null && /** @type {AbstractType<any>} */ leftTrace.parent._item === parentItem) {
                left = leftTrace;
                break;
            }
            left = left.left;
        }
        while(right !== null){
            /**
       * @type {Item|null}
       */ let rightTrace = right;
            // trace redone until parent matches
            while(rightTrace !== null && /** @type {AbstractType<any>} */ rightTrace.parent._item !== parentItem)rightTrace = rightTrace.redone === null ? null : $52a83e33f2b9e935$var$getItemCleanStart(transaction, rightTrace.redone);
            if (rightTrace !== null && /** @type {AbstractType<any>} */ rightTrace.parent._item === parentItem) {
                right = rightTrace;
                break;
            }
            right = right.right;
        }
    } else {
        right = null;
        if (item.right && !ignoreRemoteMapChanges) {
            left = item;
            // Iterate right while right is in itemsToDelete
            // If it is intended to delete right while item is redone, we can expect that item should replace right.
            while(left !== null && left.right !== null && (left.right.redone || $52a83e33f2b9e935$export$dcb04af092e44fde(itemsToDelete, left.right.id) || $52a83e33f2b9e935$var$isDeletedByUndoStack(um.undoStack, left.right.id) || $52a83e33f2b9e935$var$isDeletedByUndoStack(um.redoStack, left.right.id))){
                left = left.right;
                // follow redone
                while(left.redone)left = $52a83e33f2b9e935$var$getItemCleanStart(transaction, left.redone);
            }
            if (left && left.right !== null) // It is not possible to redo this item because it conflicts with a
            // change from another client
            return null;
        } else left = parentType._map.get(item.parentSub) || null;
    }
    const nextClock = $52a83e33f2b9e935$export$50fdfeece43146fd(store, ownClientID);
    const nextId = $52a83e33f2b9e935$export$6c7d4e6171d008d0(ownClientID, nextClock);
    const redoneItem = new $52a83e33f2b9e935$export$6d08773d2e66f8f2(nextId, left, left && left.lastId, right, right && right.id, parentType, item.parentSub, item.content.copy());
    item.redone = nextId;
    $52a83e33f2b9e935$var$keepItem(redoneItem, true);
    redoneItem.integrate(transaction, 0);
    return redoneItem;
};
/**
 * Abstract class that represents any content.
 */ class $52a83e33f2b9e935$export$6d08773d2e66f8f2 extends $52a83e33f2b9e935$export$3cf6f9765c5c3196 {
    /**
   * @param {ID} id
   * @param {Item | null} left
   * @param {ID | null} origin
   * @param {Item | null} right
   * @param {ID | null} rightOrigin
   * @param {AbstractType<any>|ID|null} parent Is a type if integrated, is null if it is possible to copy parent from left or right, is ID before integration to search for it.
   * @param {string | null} parentSub
   * @param {AbstractContent} content
   */ constructor(id, left, origin, right, rightOrigin, parent, parentSub, content){
        super(id, content.getLength());
        /**
     * The item that was originally to the left of this item.
     * @type {ID | null}
     */ this.origin = origin;
        /**
     * The item that is currently to the left of this item.
     * @type {Item | null}
     */ this.left = left;
        /**
     * The item that is currently to the right of this item.
     * @type {Item | null}
     */ this.right = right;
        /**
     * The item that was originally to the right of this item.
     * @type {ID | null}
     */ this.rightOrigin = rightOrigin;
        /**
     * @type {AbstractType<any>|ID|null}
     */ this.parent = parent;
        /**
     * If the parent refers to this item with some kind of key (e.g. YMap, the
     * key is specified here. The key is then used to refer to the list in which
     * to insert this item. If `parentSub = null` type._start is the list in
     * which to insert to. Otherwise it is `parent._map`.
     * @type {String | null}
     */ this.parentSub = parentSub;
        /**
     * If this type's effect is redone this type refers to the type that undid
     * this operation.
     * @type {ID | null}
     */ this.redone = null;
        /**
     * @type {AbstractContent}
     */ this.content = content;
        /**
     * bit1: keep
     * bit2: countable
     * bit3: deleted
     * bit4: mark - mark node as fast-search-marker
     * @type {number} byte
     */ this.info = this.content.isCountable() ? $1GdQd.BIT2 : 0;
    }
    /**
   * This is used to mark the item as an indexed fast-search marker
   *
   * @type {boolean}
   */ set marker(isMarked) {
        if ((this.info & $1GdQd.BIT4) > 0 !== isMarked) this.info ^= $1GdQd.BIT4;
    }
    get marker() {
        return (this.info & $1GdQd.BIT4) > 0;
    }
    /**
   * If true, do not garbage collect this Item.
   */ get keep() {
        return (this.info & $1GdQd.BIT1) > 0;
    }
    set keep(doKeep) {
        if (this.keep !== doKeep) this.info ^= $1GdQd.BIT1;
    }
    get countable() {
        return (this.info & $1GdQd.BIT2) > 0;
    }
    /**
   * Whether this item was deleted or not.
   * @type {Boolean}
   */ get deleted() {
        return (this.info & $1GdQd.BIT3) > 0;
    }
    set deleted(doDelete) {
        if (this.deleted !== doDelete) this.info ^= $1GdQd.BIT3;
    }
    markDeleted() {
        this.info |= $1GdQd.BIT3;
    }
    /**
   * Return the creator clientID of the missing op or define missing items and return null.
   *
   * @param {Transaction} transaction
   * @param {StructStore} store
   * @return {null | number}
   */ getMissing(transaction, store) {
        if (this.origin && this.origin.client !== this.id.client && this.origin.clock >= $52a83e33f2b9e935$export$50fdfeece43146fd(store, this.origin.client)) return this.origin.client;
        if (this.rightOrigin && this.rightOrigin.client !== this.id.client && this.rightOrigin.clock >= $52a83e33f2b9e935$export$50fdfeece43146fd(store, this.rightOrigin.client)) return this.rightOrigin.client;
        if (this.parent && this.parent.constructor === $52a83e33f2b9e935$export$8be180ec26319f9f && this.id.client !== this.parent.client && this.parent.clock >= $52a83e33f2b9e935$export$50fdfeece43146fd(store, this.parent.client)) return this.parent.client;
        // We have all missing ids, now find the items
        if (this.origin) {
            this.left = $52a83e33f2b9e935$var$getItemCleanEnd(transaction, store, this.origin);
            this.origin = this.left.lastId;
        }
        if (this.rightOrigin) {
            this.right = $52a83e33f2b9e935$var$getItemCleanStart(transaction, this.rightOrigin);
            this.rightOrigin = this.right.id;
        }
        if (this.left && this.left.constructor === $52a83e33f2b9e935$export$12d259ff017e6b58 || this.right && this.right.constructor === $52a83e33f2b9e935$export$12d259ff017e6b58) this.parent = null;
        else if (!this.parent) {
            // only set parent if this shouldn't be garbage collected
            if (this.left && this.left.constructor === $52a83e33f2b9e935$export$6d08773d2e66f8f2) {
                this.parent = this.left.parent;
                this.parentSub = this.left.parentSub;
            }
            if (this.right && this.right.constructor === $52a83e33f2b9e935$export$6d08773d2e66f8f2) {
                this.parent = this.right.parent;
                this.parentSub = this.right.parentSub;
            }
        } else if (this.parent.constructor === $52a83e33f2b9e935$export$8be180ec26319f9f) {
            const parentItem = $52a83e33f2b9e935$export$f92dfeb71e9bb569(store, this.parent);
            if (parentItem.constructor === $52a83e33f2b9e935$export$12d259ff017e6b58) this.parent = null;
            else this.parent = /** @type {ContentType} */ parentItem.content.type;
        }
        return null;
    }
    /**
   * @param {Transaction} transaction
   * @param {number} offset
   */ integrate(transaction, offset) {
        if (offset > 0) {
            this.id.clock += offset;
            this.left = $52a83e33f2b9e935$var$getItemCleanEnd(transaction, transaction.doc.store, $52a83e33f2b9e935$export$6c7d4e6171d008d0(this.id.client, this.id.clock - 1));
            this.origin = this.left.lastId;
            this.content = this.content.splice(offset);
            this.length -= offset;
        }
        if (this.parent) {
            if (!this.left && (!this.right || this.right.left !== null) || this.left && this.left.right !== this.right) {
                /**
         * @type {Item|null}
         */ let left = this.left;
                /**
         * @type {Item|null}
         */ let o;
                // set o to the first conflicting item
                if (left !== null) o = left.right;
                else if (this.parentSub !== null) {
                    o = /** @type {AbstractType<any>} */ this.parent._map.get(this.parentSub) || null;
                    while(o !== null && o.left !== null)o = o.left;
                } else o = /** @type {AbstractType<any>} */ this.parent._start;
                // TODO: use something like DeleteSet here (a tree implementation would be best)
                // @todo use global set definitions
                /**
         * @type {Set<Item>}
         */ const conflictingItems = new Set();
                /**
         * @type {Set<Item>}
         */ const itemsBeforeOrigin = new Set();
                // Let c in conflictingItems, b in itemsBeforeOrigin
                // ***{origin}bbbb{this}{c,b}{c,b}{o}***
                // Note that conflictingItems is a subset of itemsBeforeOrigin
                while(o !== null && o !== this.right){
                    itemsBeforeOrigin.add(o);
                    conflictingItems.add(o);
                    if ($52a83e33f2b9e935$export$c0af976e7e459c02(this.origin, o.origin)) {
                        // case 1
                        if (o.id.client < this.id.client) {
                            left = o;
                            conflictingItems.clear();
                        } else if ($52a83e33f2b9e935$export$c0af976e7e459c02(this.rightOrigin, o.rightOrigin)) break;
                         // else, o might be integrated before an item that this conflicts with. If so, we will find it in the next iterations
                    } else if (o.origin !== null && itemsBeforeOrigin.has($52a83e33f2b9e935$export$f92dfeb71e9bb569(transaction.doc.store, o.origin))) // case 2
                    {
                        if (!conflictingItems.has($52a83e33f2b9e935$export$f92dfeb71e9bb569(transaction.doc.store, o.origin))) {
                            left = o;
                            conflictingItems.clear();
                        }
                    } else break;
                    o = o.right;
                }
                this.left = left;
            }
            // reconnect left/right + update parent map/start if necessary
            if (this.left !== null) {
                const right = this.left.right;
                this.right = right;
                this.left.right = this;
            } else {
                let r;
                if (this.parentSub !== null) {
                    r = /** @type {AbstractType<any>} */ this.parent._map.get(this.parentSub) || null;
                    while(r !== null && r.left !== null)r = r.left;
                } else {
                    r = /** @type {AbstractType<any>} */ this.parent._start; /** @type {AbstractType<any>} */ 
                    this.parent._start = this;
                }
                this.right = r;
            }
            if (this.right !== null) this.right.left = this;
            else if (this.parentSub !== null) {
                // set as current parent value if right === null and this is parentSub
                /** @type {AbstractType<any>} */ this.parent._map.set(this.parentSub, this);
                if (this.left !== null) // this is the current attribute value of parent. delete right
                this.left.delete(transaction);
            }
            // adjust length of parent
            if (this.parentSub === null && this.countable && !this.deleted) /** @type {AbstractType<any>} */ this.parent._length += this.length;
            $52a83e33f2b9e935$var$addStruct(transaction.doc.store, this);
            this.content.integrate(transaction, this);
            // add parent to transaction.changed
            $52a83e33f2b9e935$var$addChangedTypeToTransaction(transaction, /** @type {AbstractType<any>} */ this.parent, this.parentSub);
            if (/** @type {AbstractType<any>} */ this.parent._item !== null && /** @type {AbstractType<any>} */ this.parent._item.deleted || this.parentSub !== null && this.right !== null) // delete if parent is deleted or if this is not the current attribute value of parent
            this.delete(transaction);
        } else // parent is not defined. Integrate GC struct instead
        new $52a83e33f2b9e935$export$12d259ff017e6b58(this.id, this.length).integrate(transaction, 0);
    }
    /**
   * Returns the next non-deleted item
   */ get next() {
        let n = this.right;
        while(n !== null && n.deleted)n = n.right;
        return n;
    }
    /**
   * Returns the previous non-deleted item
   */ get prev() {
        let n = this.left;
        while(n !== null && n.deleted)n = n.left;
        return n;
    }
    /**
   * Computes the last content address of this Item.
   */ get lastId() {
        // allocating ids is pretty costly because of the amount of ids created, so we try to reuse whenever possible
        return this.length === 1 ? this.id : $52a83e33f2b9e935$export$6c7d4e6171d008d0(this.id.client, this.id.clock + this.length - 1);
    }
    /**
   * Try to merge two items
   *
   * @param {Item} right
   * @return {boolean}
   */ mergeWith(right) {
        if (this.constructor === right.constructor && $52a83e33f2b9e935$export$c0af976e7e459c02(right.origin, this.lastId) && this.right === right && $52a83e33f2b9e935$export$c0af976e7e459c02(this.rightOrigin, right.rightOrigin) && this.id.client === right.id.client && this.id.clock + this.length === right.id.clock && this.deleted === right.deleted && this.redone === null && right.redone === null && this.content.constructor === right.content.constructor && this.content.mergeWith(right.content)) {
            const searchMarker = /** @type {AbstractType<any>} */ this.parent._searchMarker;
            if (searchMarker) searchMarker.forEach((marker)=>{
                if (marker.p === right) {
                    // right is going to be "forgotten" so we need to update the marker
                    marker.p = this;
                    // adjust marker index
                    if (!this.deleted && this.countable) marker.index -= this.length;
                }
            });
            if (right.keep) this.keep = true;
            this.right = right.right;
            if (this.right !== null) this.right.left = this;
            this.length += right.length;
            return true;
        }
        return false;
    }
    /**
   * Mark this Item as deleted.
   *
   * @param {Transaction} transaction
   */ delete(transaction) {
        if (!this.deleted) {
            const parent = /** @type {AbstractType<any>} */ this.parent;
            // adjust the length of parent
            if (this.countable && this.parentSub === null) parent._length -= this.length;
            this.markDeleted();
            $52a83e33f2b9e935$var$addToDeleteSet(transaction.deleteSet, this.id.client, this.id.clock, this.length);
            $52a83e33f2b9e935$var$addChangedTypeToTransaction(transaction, parent, this.parentSub);
            this.content.delete(transaction);
        }
    }
    /**
   * @param {StructStore} store
   * @param {boolean} parentGCd
   */ gc(store, parentGCd) {
        if (!this.deleted) throw $akmFO.unexpectedCase();
        this.content.gc(store);
        if (parentGCd) $52a83e33f2b9e935$var$replaceStruct(store, this, new $52a83e33f2b9e935$export$12d259ff017e6b58(this.id, this.length));
        else this.content = new $52a83e33f2b9e935$export$3b06e0b3a2ece602(this.length);
    }
    /**
   * Transform the properties of this type to binary and write it to an
   * BinaryEncoder.
   *
   * This is called when this Item is sent to a remote peer.
   *
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder The encoder to write data to.
   * @param {number} offset
   */ write(encoder, offset) {
        const origin = offset > 0 ? $52a83e33f2b9e935$export$6c7d4e6171d008d0(this.id.client, this.id.clock + offset - 1) : this.origin;
        const rightOrigin = this.rightOrigin;
        const parentSub = this.parentSub;
        const info = this.content.getRef() & $1GdQd.BITS5 | (origin === null ? 0 : $1GdQd.BIT8) | // origin is defined
        (rightOrigin === null ? 0 : $1GdQd.BIT7) | // right origin is defined
        (parentSub === null ? 0 : $1GdQd.BIT6); // parentSub is non-null
        encoder.writeInfo(info);
        if (origin !== null) encoder.writeLeftID(origin);
        if (rightOrigin !== null) encoder.writeRightID(rightOrigin);
        if (origin === null && rightOrigin === null) {
            const parent = /** @type {AbstractType<any>} */ this.parent;
            if (parent._item !== undefined) {
                const parentItem = parent._item;
                if (parentItem === null) {
                    // parent type on y._map
                    // find the correct key
                    const ykey = $52a83e33f2b9e935$export$e726a40920d54663(parent);
                    encoder.writeParentInfo(true); // write parentYKey
                    encoder.writeString(ykey);
                } else {
                    encoder.writeParentInfo(false); // write parent id
                    encoder.writeLeftID(parentItem.id);
                }
            } else if (parent.constructor === String) {
                encoder.writeParentInfo(true); // write parentYKey
                encoder.writeString(parent);
            } else if (parent.constructor === $52a83e33f2b9e935$export$8be180ec26319f9f) {
                encoder.writeParentInfo(false); // write parent id
                encoder.writeLeftID(parent);
            } else $akmFO.unexpectedCase();
            if (parentSub !== null) encoder.writeString(parentSub);
        }
        this.content.write(encoder, offset);
    }
}
/**
 * @param {UpdateDecoderV1 | UpdateDecoderV2} decoder
 * @param {number} info
 */ const $52a83e33f2b9e935$var$readItemContent = (decoder, info)=>$52a83e33f2b9e935$var$contentRefs[info & $1GdQd.BITS5](decoder);
/**
 * A lookup map for reading Item content.
 *
 * @type {Array<function(UpdateDecoderV1 | UpdateDecoderV2):AbstractContent>}
 */ const $52a83e33f2b9e935$var$contentRefs = [
    ()=>{
        $akmFO.unexpectedCase();
    },
    $52a83e33f2b9e935$var$readContentDeleted,
    $52a83e33f2b9e935$var$readContentJSON,
    $52a83e33f2b9e935$var$readContentBinary,
    $52a83e33f2b9e935$var$readContentString,
    $52a83e33f2b9e935$var$readContentEmbed,
    $52a83e33f2b9e935$var$readContentFormat,
    $52a83e33f2b9e935$var$readContentType,
    $52a83e33f2b9e935$var$readContentAny,
    $52a83e33f2b9e935$var$readContentDoc,
    ()=>{
        $akmFO.unexpectedCase();
    } // 10 - Skip is not ItemContent
];
const $52a83e33f2b9e935$var$structSkipRefNumber = 10;
/**
 * @private
 */ class $52a83e33f2b9e935$var$Skip extends $52a83e33f2b9e935$export$3cf6f9765c5c3196 {
    get deleted() {
        return true;
    }
    delete() {}
    /**
   * @param {Skip} right
   * @return {boolean}
   */ mergeWith(right) {
        if (this.constructor !== right.constructor) return false;
        this.length += right.length;
        return true;
    }
    /**
   * @param {Transaction} transaction
   * @param {number} offset
   */ integrate(transaction, offset) {
        // skip structs cannot be integrated
        $akmFO.unexpectedCase();
    }
    /**
   * @param {UpdateEncoderV1 | UpdateEncoderV2} encoder
   * @param {number} offset
   */ write(encoder, offset) {
        encoder.writeInfo($52a83e33f2b9e935$var$structSkipRefNumber);
        // write as VarUint because Skips can't make use of predictable length-encoding
        $1p1sv.writeVarUint(encoder.restEncoder, this.length - offset);
    }
    /**
   * @param {Transaction} transaction
   * @param {StructStore} store
   * @return {null | number}
   */ getMissing(transaction, store) {
        return null;
    }
}
/** eslint-env browser */ const $52a83e33f2b9e935$var$glo = /** @type {any} */ typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof $parcel$global !== "undefined" ? $parcel$global : {};
const $52a83e33f2b9e935$var$importIdentifier = "__ $YJS$ __";
if ($52a83e33f2b9e935$var$glo[$52a83e33f2b9e935$var$importIdentifier] === true) /**
   * Dear reader of this message. Please take this seriously.
   *
   * If you see this message, make sure that you only import one version of Yjs. In many cases,
   * your package manager installs two versions of Yjs that are used by different packages within your project.
   * Another reason for this message is that some parts of your project use the commonjs version of Yjs
   * and others use the EcmaScript version of Yjs.
   *
   * This often leads to issues that are hard to debug. We often need to perform constructor checks,
   * e.g. `struct instanceof GC`. If you imported different versions of Yjs, it is impossible for us to
   * do the constructor checks anymore - which might break the CRDT algorithm.
   *
   * https://github.com/yjs/yjs/issues/438
   */ console.error("Yjs was already imported. This breaks constructor checks and will lead to issues! - https://github.com/yjs/yjs/issues/438");
$52a83e33f2b9e935$var$glo[$52a83e33f2b9e935$var$importIdentifier] = true;

});
parcelRegister("9XqiC", function(module, exports) {

$parcel$export(module.exports, "Observable", () => $73fe063e3b9cb445$export$77cea355fa80b5f4);
/**
 * Observable class prototype.
 *
 * @module observable
 */ 
var $e6DQe = parcelRequire("e6DQe");

var $gB6ZU = parcelRequire("gB6ZU");

var $7sfdv = parcelRequire("7sfdv");
class $73fe063e3b9cb445$export$e23d3436ce401adc {
    constructor(){
        /**
     * Some desc.
     * @type {Map<string, Set<any>>}
     */ this._observers = $e6DQe.create();
    }
    /**
   * @template {keyof EVENTS & string} NAME
   * @param {NAME} name
   * @param {EVENTS[NAME]} f
   */ on(name, f) {
        $e6DQe.setIfUndefined(this._observers, /** @type {string} */ name, $gB6ZU.create).add(f);
        return f;
    }
    /**
   * @template {keyof EVENTS & string} NAME
   * @param {NAME} name
   * @param {EVENTS[NAME]} f
   */ once(name, f) {
        /**
     * @param  {...any} args
     */ const _f = (...args)=>{
            this.off(name, /** @type {any} */ _f);
            f(...args);
        };
        this.on(name, /** @type {any} */ _f);
    }
    /**
   * @template {keyof EVENTS & string} NAME
   * @param {NAME} name
   * @param {EVENTS[NAME]} f
   */ off(name, f) {
        const observers = this._observers.get(name);
        if (observers !== undefined) {
            observers.delete(f);
            if (observers.size === 0) this._observers.delete(name);
        }
    }
    /**
   * Emit a named event. All registered event listeners that listen to the
   * specified name will receive the event.
   *
   * @todo This should catch exceptions
   *
   * @template {keyof EVENTS & string} NAME
   * @param {NAME} name The event name.
   * @param {Parameters<EVENTS[NAME]>} args The arguments that are applied to the event listener.
   */ emit(name, args) {
        // copy all listeners to an array first to make sure that no event is emitted to listeners that are subscribed while the event handler is called.
        return $7sfdv.from((this._observers.get(name) || $e6DQe.create()).values()).forEach((f)=>f(...args));
    }
    destroy() {
        this._observers = $e6DQe.create();
    }
}
class $73fe063e3b9cb445$export$77cea355fa80b5f4 {
    constructor(){
        /**
     * Some desc.
     * @type {Map<N, any>}
     */ this._observers = $e6DQe.create();
    }
    /**
   * @param {N} name
   * @param {function} f
   */ on(name, f) {
        $e6DQe.setIfUndefined(this._observers, name, $gB6ZU.create).add(f);
    }
    /**
   * @param {N} name
   * @param {function} f
   */ once(name, f) {
        /**
     * @param  {...any} args
     */ const _f = (...args)=>{
            this.off(name, _f);
            f(...args);
        };
        this.on(name, _f);
    }
    /**
   * @param {N} name
   * @param {function} f
   */ off(name, f) {
        const observers = this._observers.get(name);
        if (observers !== undefined) {
            observers.delete(f);
            if (observers.size === 0) this._observers.delete(name);
        }
    }
    /**
   * Emit a named event. All registered event listeners that listen to the
   * specified name will receive the event.
   *
   * @todo This should catch exceptions
   *
   * @param {N} name The event name.
   * @param {Array<any>} args The arguments that are applied to the event listener.
   */ emit(name, args) {
        // copy all listeners to an array first to make sure that no event is emitted to listeners that are subscribed while the event handler is called.
        return $7sfdv.from((this._observers.get(name) || $e6DQe.create()).values()).forEach((f)=>f(...args));
    }
    destroy() {
        this._observers = $e6DQe.create();
    }
} /* c8 ignore end */ 

});
parcelRegister("e6DQe", function(module, exports) {

$parcel$export(module.exports, "create", () => $a45087e340a975ce$export$185802fd694ee1f5);
$parcel$export(module.exports, "copy", () => $a45087e340a975ce$export$784d13d8ee351f07);
$parcel$export(module.exports, "setIfUndefined", () => $a45087e340a975ce$export$dccd489362a8619);
$parcel$export(module.exports, "map", () => $a45087e340a975ce$export$871de8747c9eaa88);
$parcel$export(module.exports, "any", () => $a45087e340a975ce$export$4154a199d7d90455);
/**
 * Utility module to work with key-value stores.
 *
 * @module map
 */ /**
 * Creates a new Map instance.
 *
 * @function
 * @return {Map<any, any>}
 *
 * @function
 */ const $a45087e340a975ce$export$185802fd694ee1f5 = ()=>new Map();
const $a45087e340a975ce$export$784d13d8ee351f07 = (m)=>{
    const r = $a45087e340a975ce$export$185802fd694ee1f5();
    m.forEach((v, k)=>{
        r.set(k, v);
    });
    return r;
};
const $a45087e340a975ce$export$dccd489362a8619 = (map, key, createT)=>{
    let set = map.get(key);
    if (set === undefined) map.set(key, set = createT());
    return set;
};
const $a45087e340a975ce$export$871de8747c9eaa88 = (m, f)=>{
    const res = [];
    for (const [key, value] of m)res.push(f(value, key));
    return res;
};
const $a45087e340a975ce$export$4154a199d7d90455 = (m, f)=>{
    for (const [key, value] of m){
        if (f(value, key)) return true;
    }
    return false;
};
const $a45087e340a975ce$export$84bf76cd7afc7469 = (m, f)=>{
    for (const [key, value] of m){
        if (!f(value, key)) return false;
    }
    return true;
};

});

parcelRegister("gB6ZU", function(module, exports) {

$parcel$export(module.exports, "create", () => $c155879a2bf0140e$export$185802fd694ee1f5);
$parcel$export(module.exports, "from", () => $c155879a2bf0140e$export$6788812c4e6611e6);
/**
 * Utility module to work with sets.
 *
 * @module set
 */ const $c155879a2bf0140e$export$185802fd694ee1f5 = ()=>new Set();
const $c155879a2bf0140e$export$45b10814cc054894 = (set)=>Array.from(set);
const $c155879a2bf0140e$export$43128fadae87b74a = (set)=>set.values().next().value || undefined;
const $c155879a2bf0140e$export$6788812c4e6611e6 = (entries)=>new Set(entries);

});

parcelRegister("7sfdv", function(module, exports) {

$parcel$export(module.exports, "last", () => $56d6f3a7874e0613$export$4c7897fafd92b108);
$parcel$export(module.exports, "appendTo", () => $56d6f3a7874e0613$export$9ceefe31f12a3778);
$parcel$export(module.exports, "from", () => $56d6f3a7874e0613$export$6788812c4e6611e6);
$parcel$export(module.exports, "some", () => $56d6f3a7874e0613$export$ad14ef4001db2bcd);
$parcel$export(module.exports, "equalFlat", () => $56d6f3a7874e0613$export$4f1c34abb2bb4c8);
$parcel$export(module.exports, "unfold", () => $56d6f3a7874e0613$export$c48e357c1a89b78d);
$parcel$export(module.exports, "isArray", () => $56d6f3a7874e0613$export$43bee75e5e14138e);
$parcel$export(module.exports, "map", () => $56d6f3a7874e0613$export$871de8747c9eaa88);
/**
 * Utility module to work with Arrays.
 *
 * @module array
 */ 
var $gB6ZU = parcelRequire("gB6ZU");
const $56d6f3a7874e0613$export$4c7897fafd92b108 = (arr)=>arr[arr.length - 1];
const $56d6f3a7874e0613$export$185802fd694ee1f5 = ()=>/** @type {Array<C>} */ [];
const $56d6f3a7874e0613$export$784d13d8ee351f07 = (a)=>/** @type {Array<D>} */ a.slice();
const $56d6f3a7874e0613$export$9ceefe31f12a3778 = (dest, src)=>{
    for(let i = 0; i < src.length; i++)dest.push(src[i]);
};
const $56d6f3a7874e0613$export$6788812c4e6611e6 = Array.from;
const $56d6f3a7874e0613$export$7ecc1a3b11b57dab = (arr, f)=>{
    for(let i = 0; i < arr.length; i++){
        if (!f(arr[i], i, arr)) return false;
    }
    return true;
};
const $56d6f3a7874e0613$export$ad14ef4001db2bcd = (arr, f)=>{
    for(let i = 0; i < arr.length; i++){
        if (f(arr[i], i, arr)) return true;
    }
    return false;
};
const $56d6f3a7874e0613$export$4f1c34abb2bb4c8 = (a, b)=>a.length === b.length && $56d6f3a7874e0613$export$7ecc1a3b11b57dab(a, (item, index)=>item === b[index]);
const $56d6f3a7874e0613$export$bffa455ba8c619a6 = (arr)=>$56d6f3a7874e0613$export$93e2b83da34ff82a(arr, /** @type {Array<ELEM>} */ [], (acc, val)=>acc.concat(val));
const $56d6f3a7874e0613$export$c48e357c1a89b78d = (len, f)=>{
    const array = new Array(len);
    for(let i = 0; i < len; i++)array[i] = f(i, array);
    return array;
};
const $56d6f3a7874e0613$export$93e2b83da34ff82a = (arr, seed, folder)=>arr.reduce(folder, seed);
const $56d6f3a7874e0613$export$43bee75e5e14138e = Array.isArray;
const $56d6f3a7874e0613$export$7a5d5c156e7dc406 = (arr)=>$56d6f3a7874e0613$export$6788812c4e6611e6($gB6ZU.from(arr));
const $56d6f3a7874e0613$export$abf0e2545164275f = (arr, mapper)=>{
    /**
   * @type {Set<M>}
   */ const happened = $gB6ZU.create();
    /**
   * @type {Array<T>}
   */ const result = [];
    for(let i = 0; i < arr.length; i++){
        const el = arr[i];
        const mapped = mapper(el);
        if (!happened.has(mapped)) {
            happened.add(mapped);
            result.push(el);
        }
    }
    return result;
};
const $56d6f3a7874e0613$export$871de8747c9eaa88 = (arr, mapper)=>{
    /**
   * @type {Array<any>}
   */ const res = Array(arr.length);
    for(let i = 0; i < arr.length; i++)res[i] = mapper(/** @type {any} */ arr[i], i, /** @type {any} */ arr);
    return /** @type {any} */ res;
};

});


parcelRegister("kuitL", function(module, exports) {

$parcel$export(module.exports, "floor", () => $eea4f1919f013529$export$a3fe094919f356fd);
$parcel$export(module.exports, "ceil", () => $eea4f1919f013529$export$803ce6b71a0a94b2);
$parcel$export(module.exports, "abs", () => $eea4f1919f013529$export$2335f513bbd82c6d);
$parcel$export(module.exports, "round", () => $eea4f1919f013529$export$2077e0241d6afd3c);
$parcel$export(module.exports, "log10", () => $eea4f1919f013529$export$75e08744a3ff8516);
$parcel$export(module.exports, "min", () => $eea4f1919f013529$export$96ec731ed4dcb222);
$parcel$export(module.exports, "max", () => $eea4f1919f013529$export$8960430cfd85939f);
$parcel$export(module.exports, "exp10", () => $eea4f1919f013529$export$1bb2a14208c790f7);
$parcel$export(module.exports, "isNegativeZero", () => $eea4f1919f013529$export$dc0a61f4a9121f92);
/**
 * Common Math expressions.
 *
 * @module math
 */ const $eea4f1919f013529$export$a3fe094919f356fd = Math.floor;
const $eea4f1919f013529$export$803ce6b71a0a94b2 = Math.ceil;
const $eea4f1919f013529$export$2335f513bbd82c6d = Math.abs;
const $eea4f1919f013529$export$46de3d998ca9a030 = Math.imul;
const $eea4f1919f013529$export$2077e0241d6afd3c = Math.round;
const $eea4f1919f013529$export$75e08744a3ff8516 = Math.log10;
const $eea4f1919f013529$export$b9fae0bba9d9094d = Math.log2;
const $eea4f1919f013529$export$bef1f36f5486a6a3 = Math.log;
const $eea4f1919f013529$export$eba8049fb5020b81 = Math.sqrt;
const $eea4f1919f013529$export$e16d8520af44a096 = (a, b)=>a + b;
const $eea4f1919f013529$export$96ec731ed4dcb222 = (a, b)=>a < b ? a : b;
const $eea4f1919f013529$export$8960430cfd85939f = (a, b)=>a > b ? a : b;
const $eea4f1919f013529$export$c9f5652083b8129d = Number.isNaN;
const $eea4f1919f013529$export$9c297f60e22e3389 = Math.pow;
const $eea4f1919f013529$export$1bb2a14208c790f7 = (exp)=>Math.pow(10, exp);
const $eea4f1919f013529$export$c5552dfdbc7cec71 = Math.sign;
const $eea4f1919f013529$export$dc0a61f4a9121f92 = (n)=>n !== 0 ? n < 0 : 1 / n < 0;

});

parcelRegister("1p1sv", function(module, exports) {

$parcel$export(module.exports, "createEncoder", () => $105941e7c65ec3d1$export$4e76eeb6df88c889);
$parcel$export(module.exports, "encode", () => $105941e7c65ec3d1$export$c564cdbbe6da493);
$parcel$export(module.exports, "toUint8Array", () => $105941e7c65ec3d1$export$73470fd2221e6aef);
$parcel$export(module.exports, "write", () => $105941e7c65ec3d1$export$68d8715fc104d294);
$parcel$export(module.exports, "writeUint8", () => $105941e7c65ec3d1$export$826a1a6619653272);
$parcel$export(module.exports, "writeVarUint", () => $105941e7c65ec3d1$export$872f48c75febcd2b);
$parcel$export(module.exports, "writeVarInt", () => $105941e7c65ec3d1$export$ff90f819e16cc9bb);
$parcel$export(module.exports, "writeVarUint8Array", () => $105941e7c65ec3d1$export$f7d11515275e88a2);
$parcel$export(module.exports, "writeVarString", () => $105941e7c65ec3d1$export$dde49cb52d5f1650);
$parcel$export(module.exports, "writeBinaryEncoder", () => $105941e7c65ec3d1$export$c029b62321ea3da);
$parcel$export(module.exports, "writeUint8Array", () => $105941e7c65ec3d1$export$73b5e63e27d2b4c7);
$parcel$export(module.exports, "writeAny", () => $105941e7c65ec3d1$export$264b1e8551468ea);
$parcel$export(module.exports, "RleEncoder", () => $105941e7c65ec3d1$export$8fa72bb4fa9409ff);
$parcel$export(module.exports, "UintOptRleEncoder", () => $105941e7c65ec3d1$export$785ebd3312c38061);
$parcel$export(module.exports, "IntDiffOptRleEncoder", () => $105941e7c65ec3d1$export$7542c66a59375c6f);
$parcel$export(module.exports, "StringEncoder", () => $105941e7c65ec3d1$export$7dcdc5c32f31c550);
/**
 * Efficient schema-less binary encoding with support for variable length encoding.
 *
 * Use [lib0/encoding] with [lib0/decoding]. Every encoding function has a corresponding decoding function.
 *
 * Encodes numbers in little-endian order (least to most significant byte order)
 * and is compatible with Golang's binary encoding (https://golang.org/pkg/encoding/binary/)
 * which is also used in Protocol Buffers.
 *
 * ```js
 * // encoding step
 * const encoder = encoding.createEncoder()
 * encoding.writeVarUint(encoder, 256)
 * encoding.writeVarString(encoder, 'Hello world!')
 * const buf = encoding.toUint8Array(encoder)
 * ```
 *
 * ```js
 * // decoding step
 * const decoder = decoding.createDecoder(buf)
 * decoding.readVarUint(decoder) // => 256
 * decoding.readVarString(decoder) // => 'Hello world!'
 * decoding.hasContent(decoder) // => false - all data is read
 * ```
 *
 * @module encoding
 */ 
var $kuitL = parcelRequire("kuitL");

var $bYXiv = parcelRequire("bYXiv");

var $1GdQd = parcelRequire("1GdQd");

var $6rcMi = parcelRequire("6rcMi");

var $7sfdv = parcelRequire("7sfdv");
class $105941e7c65ec3d1$export$a50aceb0e02a00aa {
    constructor(){
        this.cpos = 0;
        this.cbuf = new Uint8Array(100);
        /**
     * @type {Array<Uint8Array>}
     */ this.bufs = [];
    }
}
const $105941e7c65ec3d1$export$4e76eeb6df88c889 = ()=>new $105941e7c65ec3d1$export$a50aceb0e02a00aa();
const $105941e7c65ec3d1$export$c564cdbbe6da493 = (f)=>{
    const encoder = $105941e7c65ec3d1$export$4e76eeb6df88c889();
    f(encoder);
    return $105941e7c65ec3d1$export$73470fd2221e6aef(encoder);
};
const $105941e7c65ec3d1$export$f24224f1c91d8156 = (encoder)=>{
    let len = encoder.cpos;
    for(let i = 0; i < encoder.bufs.length; i++)len += encoder.bufs[i].length;
    return len;
};
const $105941e7c65ec3d1$export$7ad75c69830b76d7 = (encoder)=>encoder.cpos > 0 || encoder.bufs.length > 0;
const $105941e7c65ec3d1$export$73470fd2221e6aef = (encoder)=>{
    const uint8arr = new Uint8Array($105941e7c65ec3d1$export$f24224f1c91d8156(encoder));
    let curPos = 0;
    for(let i = 0; i < encoder.bufs.length; i++){
        const d = encoder.bufs[i];
        uint8arr.set(d, curPos);
        curPos += d.length;
    }
    uint8arr.set(new Uint8Array(encoder.cbuf.buffer, 0, encoder.cpos), curPos);
    return uint8arr;
};
const $105941e7c65ec3d1$export$39fb588b9aff60c5 = (encoder, len)=>{
    const bufferLen = encoder.cbuf.length;
    if (bufferLen - encoder.cpos < len) {
        encoder.bufs.push(new Uint8Array(encoder.cbuf.buffer, 0, encoder.cpos));
        encoder.cbuf = new Uint8Array($kuitL.max(bufferLen, len) * 2);
        encoder.cpos = 0;
    }
};
const $105941e7c65ec3d1$export$68d8715fc104d294 = (encoder, num)=>{
    const bufferLen = encoder.cbuf.length;
    if (encoder.cpos === bufferLen) {
        encoder.bufs.push(encoder.cbuf);
        encoder.cbuf = new Uint8Array(bufferLen * 2);
        encoder.cpos = 0;
    }
    encoder.cbuf[encoder.cpos++] = num;
};
const $105941e7c65ec3d1$export$adaa4cf7ef1b65be = (encoder, pos, num)=>{
    let buffer = null;
    // iterate all buffers and adjust position
    for(let i = 0; i < encoder.bufs.length && buffer === null; i++){
        const b = encoder.bufs[i];
        if (pos < b.length) buffer = b // found buffer
        ;
        else pos -= b.length;
    }
    if (buffer === null) // use current buffer
    buffer = encoder.cbuf;
    buffer[pos] = num;
};
const $105941e7c65ec3d1$export$826a1a6619653272 = $105941e7c65ec3d1$export$68d8715fc104d294;
const $105941e7c65ec3d1$export$83964ea8501fbf8 = $105941e7c65ec3d1$export$adaa4cf7ef1b65be;
const $105941e7c65ec3d1$export$ba6b74b6f3145a00 = (encoder, num)=>{
    $105941e7c65ec3d1$export$68d8715fc104d294(encoder, num & $1GdQd.BITS8);
    $105941e7c65ec3d1$export$68d8715fc104d294(encoder, num >>> 8 & $1GdQd.BITS8);
};
const $105941e7c65ec3d1$export$f86e1edc3d839287 = (encoder, pos, num)=>{
    $105941e7c65ec3d1$export$adaa4cf7ef1b65be(encoder, pos, num & $1GdQd.BITS8);
    $105941e7c65ec3d1$export$adaa4cf7ef1b65be(encoder, pos + 1, num >>> 8 & $1GdQd.BITS8);
};
const $105941e7c65ec3d1$export$835343b0f7799f5b = (encoder, num)=>{
    for(let i = 0; i < 4; i++){
        $105941e7c65ec3d1$export$68d8715fc104d294(encoder, num & $1GdQd.BITS8);
        num >>>= 8;
    }
};
const $105941e7c65ec3d1$export$efed0d8c16230d13 = (encoder, num)=>{
    for(let i = 3; i >= 0; i--)$105941e7c65ec3d1$export$68d8715fc104d294(encoder, num >>> 8 * i & $1GdQd.BITS8);
};
const $105941e7c65ec3d1$export$5517b6394fc440fb = (encoder, pos, num)=>{
    for(let i = 0; i < 4; i++){
        $105941e7c65ec3d1$export$adaa4cf7ef1b65be(encoder, pos + i, num & $1GdQd.BITS8);
        num >>>= 8;
    }
};
const $105941e7c65ec3d1$export$872f48c75febcd2b = (encoder, num)=>{
    while(num > $1GdQd.BITS7){
        $105941e7c65ec3d1$export$68d8715fc104d294(encoder, $1GdQd.BIT8 | $1GdQd.BITS7 & num);
        num = $kuitL.floor(num / 128) // shift >>> 7
        ;
    }
    $105941e7c65ec3d1$export$68d8715fc104d294(encoder, $1GdQd.BITS7 & num);
};
const $105941e7c65ec3d1$export$ff90f819e16cc9bb = (encoder, num)=>{
    const isNegative = $kuitL.isNegativeZero(num);
    if (isNegative) num = -num;
    //             |- whether to continue reading         |- whether is negative     |- number
    $105941e7c65ec3d1$export$68d8715fc104d294(encoder, (num > $1GdQd.BITS6 ? $1GdQd.BIT8 : 0) | (isNegative ? $1GdQd.BIT7 : 0) | $1GdQd.BITS6 & num);
    num = $kuitL.floor(num / 64) // shift >>> 6
    ;
    // We don't need to consider the case of num === 0 so we can use a different
    // pattern here than above.
    while(num > 0){
        $105941e7c65ec3d1$export$68d8715fc104d294(encoder, (num > $1GdQd.BITS7 ? $1GdQd.BIT8 : 0) | $1GdQd.BITS7 & num);
        num = $kuitL.floor(num / 128) // shift >>> 7
        ;
    }
};
/**
 * A cache to store strings temporarily
 */ const $105941e7c65ec3d1$var$_strBuffer = new Uint8Array(30000);
const $105941e7c65ec3d1$var$_maxStrBSize = $105941e7c65ec3d1$var$_strBuffer.length / 3;
const $105941e7c65ec3d1$export$dff327976627e12b = (encoder, str)=>{
    if (str.length < $105941e7c65ec3d1$var$_maxStrBSize) {
        // We can encode the string into the existing buffer
        /* c8 ignore next */ const written = $6rcMi.utf8TextEncoder.encodeInto(str, $105941e7c65ec3d1$var$_strBuffer).written || 0;
        $105941e7c65ec3d1$export$872f48c75febcd2b(encoder, written);
        for(let i = 0; i < written; i++)$105941e7c65ec3d1$export$68d8715fc104d294(encoder, $105941e7c65ec3d1$var$_strBuffer[i]);
    } else $105941e7c65ec3d1$export$f7d11515275e88a2(encoder, $6rcMi.encodeUtf8(str));
};
const $105941e7c65ec3d1$export$94cf4193edfe959a = (encoder, str)=>{
    const encodedString = unescape(encodeURIComponent(str));
    const len = encodedString.length;
    $105941e7c65ec3d1$export$872f48c75febcd2b(encoder, len);
    for(let i = 0; i < len; i++)$105941e7c65ec3d1$export$68d8715fc104d294(encoder, /** @type {number} */ encodedString.codePointAt(i));
};
const $105941e7c65ec3d1$export$dde49cb52d5f1650 = $6rcMi.utf8TextEncoder && /** @type {any} */ $6rcMi.utf8TextEncoder.encodeInto ? $105941e7c65ec3d1$export$dff327976627e12b : $105941e7c65ec3d1$export$94cf4193edfe959a;
const $105941e7c65ec3d1$export$be5604ffb9fbbd0c = (encoder, str)=>$105941e7c65ec3d1$export$6c17d6eec4abdaa6(encoder, $6rcMi.encodeUtf8(str));
const $105941e7c65ec3d1$export$6c17d6eec4abdaa6 = (encoder, buf)=>{
    for(let i = 0; i < buf.length; i++){
        const b = buf[i];
        if (b === 0 || b === 1) $105941e7c65ec3d1$export$68d8715fc104d294(encoder, 1);
        $105941e7c65ec3d1$export$68d8715fc104d294(encoder, buf[i]);
    }
    $105941e7c65ec3d1$export$68d8715fc104d294(encoder, 0);
};
const $105941e7c65ec3d1$export$c029b62321ea3da = (encoder, append)=>$105941e7c65ec3d1$export$73b5e63e27d2b4c7(encoder, $105941e7c65ec3d1$export$73470fd2221e6aef(append));
const $105941e7c65ec3d1$export$73b5e63e27d2b4c7 = (encoder, uint8Array)=>{
    const bufferLen = encoder.cbuf.length;
    const cpos = encoder.cpos;
    const leftCopyLen = $kuitL.min(bufferLen - cpos, uint8Array.length);
    const rightCopyLen = uint8Array.length - leftCopyLen;
    encoder.cbuf.set(uint8Array.subarray(0, leftCopyLen), cpos);
    encoder.cpos += leftCopyLen;
    if (rightCopyLen > 0) {
        // Still something to write, write right half..
        // Append new buffer
        encoder.bufs.push(encoder.cbuf);
        // must have at least size of remaining buffer
        encoder.cbuf = new Uint8Array($kuitL.max(bufferLen * 2, rightCopyLen));
        // copy array
        encoder.cbuf.set(uint8Array.subarray(leftCopyLen));
        encoder.cpos = rightCopyLen;
    }
};
const $105941e7c65ec3d1$export$f7d11515275e88a2 = (encoder, uint8Array)=>{
    $105941e7c65ec3d1$export$872f48c75febcd2b(encoder, uint8Array.byteLength);
    $105941e7c65ec3d1$export$73b5e63e27d2b4c7(encoder, uint8Array);
};
const $105941e7c65ec3d1$export$1f031ae9c71bd530 = (encoder, len)=>{
    $105941e7c65ec3d1$export$39fb588b9aff60c5(encoder, len);
    const dview = new DataView(encoder.cbuf.buffer, encoder.cpos, len);
    encoder.cpos += len;
    return dview;
};
const $105941e7c65ec3d1$export$a33455db0a9638a6 = (encoder, num)=>$105941e7c65ec3d1$export$1f031ae9c71bd530(encoder, 4).setFloat32(0, num, false);
const $105941e7c65ec3d1$export$231a04cea676c54c = (encoder, num)=>$105941e7c65ec3d1$export$1f031ae9c71bd530(encoder, 8).setFloat64(0, num, false);
const $105941e7c65ec3d1$export$4fbfa93dd6e14543 = (encoder, num)=>/** @type {any} */ $105941e7c65ec3d1$export$1f031ae9c71bd530(encoder, 8).setBigInt64(0, num, false);
const $105941e7c65ec3d1$export$663ca46034903888 = (encoder, num)=>/** @type {any} */ $105941e7c65ec3d1$export$1f031ae9c71bd530(encoder, 8).setBigUint64(0, num, false);
const $105941e7c65ec3d1$var$floatTestBed = new DataView(new ArrayBuffer(4));
/**
 * Check if a number can be encoded as a 32 bit float.
 *
 * @param {number} num
 * @return {boolean}
 */ const $105941e7c65ec3d1$var$isFloat32 = (num)=>{
    $105941e7c65ec3d1$var$floatTestBed.setFloat32(0, num);
    return $105941e7c65ec3d1$var$floatTestBed.getFloat32(0) === num;
};
const $105941e7c65ec3d1$export$264b1e8551468ea = (encoder, data)=>{
    switch(typeof data){
        case "string":
            // TYPE 119: STRING
            $105941e7c65ec3d1$export$68d8715fc104d294(encoder, 119);
            $105941e7c65ec3d1$export$dde49cb52d5f1650(encoder, data);
            break;
        case "number":
            if ($bYXiv.isInteger(data) && $kuitL.abs(data) <= $1GdQd.BITS31) {
                // TYPE 125: INTEGER
                $105941e7c65ec3d1$export$68d8715fc104d294(encoder, 125);
                $105941e7c65ec3d1$export$ff90f819e16cc9bb(encoder, data);
            } else if ($105941e7c65ec3d1$var$isFloat32(data)) {
                // TYPE 124: FLOAT32
                $105941e7c65ec3d1$export$68d8715fc104d294(encoder, 124);
                $105941e7c65ec3d1$export$a33455db0a9638a6(encoder, data);
            } else {
                // TYPE 123: FLOAT64
                $105941e7c65ec3d1$export$68d8715fc104d294(encoder, 123);
                $105941e7c65ec3d1$export$231a04cea676c54c(encoder, data);
            }
            break;
        case "bigint":
            // TYPE 122: BigInt
            $105941e7c65ec3d1$export$68d8715fc104d294(encoder, 122);
            $105941e7c65ec3d1$export$4fbfa93dd6e14543(encoder, data);
            break;
        case "object":
            if (data === null) // TYPE 126: null
            $105941e7c65ec3d1$export$68d8715fc104d294(encoder, 126);
            else if ($7sfdv.isArray(data)) {
                // TYPE 117: Array
                $105941e7c65ec3d1$export$68d8715fc104d294(encoder, 117);
                $105941e7c65ec3d1$export$872f48c75febcd2b(encoder, data.length);
                for(let i = 0; i < data.length; i++)$105941e7c65ec3d1$export$264b1e8551468ea(encoder, data[i]);
            } else if (data instanceof Uint8Array) {
                // TYPE 116: ArrayBuffer
                $105941e7c65ec3d1$export$68d8715fc104d294(encoder, 116);
                $105941e7c65ec3d1$export$f7d11515275e88a2(encoder, data);
            } else {
                // TYPE 118: Object
                $105941e7c65ec3d1$export$68d8715fc104d294(encoder, 118);
                const keys = Object.keys(data);
                $105941e7c65ec3d1$export$872f48c75febcd2b(encoder, keys.length);
                for(let i = 0; i < keys.length; i++){
                    const key = keys[i];
                    $105941e7c65ec3d1$export$dde49cb52d5f1650(encoder, key);
                    $105941e7c65ec3d1$export$264b1e8551468ea(encoder, data[key]);
                }
            }
            break;
        case "boolean":
            // TYPE 120/121: boolean (true/false)
            $105941e7c65ec3d1$export$68d8715fc104d294(encoder, data ? 120 : 121);
            break;
        default:
            // TYPE 127: undefined
            $105941e7c65ec3d1$export$68d8715fc104d294(encoder, 127);
    }
};
class $105941e7c65ec3d1$export$8fa72bb4fa9409ff extends $105941e7c65ec3d1$export$a50aceb0e02a00aa {
    /**
   * @param {function(Encoder, T):void} writer
   */ constructor(writer){
        super();
        /**
     * The writer
     */ this.w = writer;
        /**
     * Current state
     * @type {T|null}
     */ this.s = null;
        this.count = 0;
    }
    /**
   * @param {T} v
   */ write(v) {
        if (this.s === v) this.count++;
        else {
            if (this.count > 0) // flush counter, unless this is the first value (count = 0)
            $105941e7c65ec3d1$export$872f48c75febcd2b(this, this.count - 1) // since count is always > 0, we can decrement by one. non-standard encoding ftw
            ;
            this.count = 1;
            // write first value
            this.w(this, v);
            this.s = v;
        }
    }
}
class $105941e7c65ec3d1$export$c636f3fa46f2752c extends $105941e7c65ec3d1$export$a50aceb0e02a00aa {
    /**
   * @param {number} start
   */ constructor(start){
        super();
        /**
     * Current state
     * @type {number}
     */ this.s = start;
    }
    /**
   * @param {number} v
   */ write(v) {
        $105941e7c65ec3d1$export$ff90f819e16cc9bb(this, v - this.s);
        this.s = v;
    }
}
class $105941e7c65ec3d1$export$29917ece4cb403fb extends $105941e7c65ec3d1$export$a50aceb0e02a00aa {
    /**
   * @param {number} start
   */ constructor(start){
        super();
        /**
     * Current state
     * @type {number}
     */ this.s = start;
        this.count = 0;
    }
    /**
   * @param {number} v
   */ write(v) {
        if (this.s === v && this.count > 0) this.count++;
        else {
            if (this.count > 0) // flush counter, unless this is the first value (count = 0)
            $105941e7c65ec3d1$export$872f48c75febcd2b(this, this.count - 1) // since count is always > 0, we can decrement by one. non-standard encoding ftw
            ;
            this.count = 1;
            // write first value
            $105941e7c65ec3d1$export$ff90f819e16cc9bb(this, v - this.s);
            this.s = v;
        }
    }
}
/**
 * @param {UintOptRleEncoder} encoder
 */ const $105941e7c65ec3d1$var$flushUintOptRleEncoder = (encoder)=>{
    if (encoder.count > 0) {
        // flush counter, unless this is the first value (count = 0)
        // case 1: just a single value. set sign to positive
        // case 2: write several values. set sign to negative to indicate that there is a length coming
        $105941e7c65ec3d1$export$ff90f819e16cc9bb(encoder.encoder, encoder.count === 1 ? encoder.s : -encoder.s);
        if (encoder.count > 1) $105941e7c65ec3d1$export$872f48c75febcd2b(encoder.encoder, encoder.count - 2) // since count is always > 1, we can decrement by one. non-standard encoding ftw
        ;
    }
};
class $105941e7c65ec3d1$export$785ebd3312c38061 {
    constructor(){
        this.encoder = new $105941e7c65ec3d1$export$a50aceb0e02a00aa();
        /**
     * @type {number}
     */ this.s = 0;
        this.count = 0;
    }
    /**
   * @param {number} v
   */ write(v) {
        if (this.s === v) this.count++;
        else {
            $105941e7c65ec3d1$var$flushUintOptRleEncoder(this);
            this.count = 1;
            this.s = v;
        }
    }
    toUint8Array() {
        $105941e7c65ec3d1$var$flushUintOptRleEncoder(this);
        return $105941e7c65ec3d1$export$73470fd2221e6aef(this.encoder);
    }
}
class $105941e7c65ec3d1$export$f460a01fb0702193 {
    constructor(){
        this.encoder = new $105941e7c65ec3d1$export$a50aceb0e02a00aa();
        /**
     * @type {number}
     */ this.s = 0;
        this.count = 0;
    }
    /**
   * @param {number} v
   */ write(v) {
        if (this.s + this.count === v) this.count++;
        else {
            $105941e7c65ec3d1$var$flushUintOptRleEncoder(this);
            this.count = 1;
            this.s = v;
        }
    }
    toUint8Array() {
        $105941e7c65ec3d1$var$flushUintOptRleEncoder(this);
        return $105941e7c65ec3d1$export$73470fd2221e6aef(this.encoder);
    }
}
/**
 * @param {IntDiffOptRleEncoder} encoder
 */ const $105941e7c65ec3d1$var$flushIntDiffOptRleEncoder = (encoder)=>{
    if (encoder.count > 0) {
        //          31 bit making up the diff | wether to write the counter
        // const encodedDiff = encoder.diff << 1 | (encoder.count === 1 ? 0 : 1)
        const encodedDiff = encoder.diff * 2 + (encoder.count === 1 ? 0 : 1);
        // flush counter, unless this is the first value (count = 0)
        // case 1: just a single value. set first bit to positive
        // case 2: write several values. set first bit to negative to indicate that there is a length coming
        $105941e7c65ec3d1$export$ff90f819e16cc9bb(encoder.encoder, encodedDiff);
        if (encoder.count > 1) $105941e7c65ec3d1$export$872f48c75febcd2b(encoder.encoder, encoder.count - 2) // since count is always > 1, we can decrement by one. non-standard encoding ftw
        ;
    }
};
class $105941e7c65ec3d1$export$7542c66a59375c6f {
    constructor(){
        this.encoder = new $105941e7c65ec3d1$export$a50aceb0e02a00aa();
        /**
     * @type {number}
     */ this.s = 0;
        this.count = 0;
        this.diff = 0;
    }
    /**
   * @param {number} v
   */ write(v) {
        if (this.diff === v - this.s) {
            this.s = v;
            this.count++;
        } else {
            $105941e7c65ec3d1$var$flushIntDiffOptRleEncoder(this);
            this.count = 1;
            this.diff = v - this.s;
            this.s = v;
        }
    }
    toUint8Array() {
        $105941e7c65ec3d1$var$flushIntDiffOptRleEncoder(this);
        return $105941e7c65ec3d1$export$73470fd2221e6aef(this.encoder);
    }
}
class $105941e7c65ec3d1$export$7dcdc5c32f31c550 {
    constructor(){
        /**
     * @type {Array<string>}
     */ this.sarr = [];
        this.s = "";
        this.lensE = new $105941e7c65ec3d1$export$785ebd3312c38061();
    }
    /**
   * @param {string} string
   */ write(string) {
        this.s += string;
        if (this.s.length > 19) {
            this.sarr.push(this.s);
            this.s = "";
        }
        this.lensE.write(string.length);
    }
    toUint8Array() {
        const encoder = new $105941e7c65ec3d1$export$a50aceb0e02a00aa();
        this.sarr.push(this.s);
        this.s = "";
        $105941e7c65ec3d1$export$dde49cb52d5f1650(encoder, this.sarr.join(""));
        $105941e7c65ec3d1$export$73b5e63e27d2b4c7(encoder, this.lensE.toUint8Array());
        return $105941e7c65ec3d1$export$73470fd2221e6aef(encoder);
    }
}

});
parcelRegister("bYXiv", function(module, exports) {

$parcel$export(module.exports, "MAX_SAFE_INTEGER", () => $8b934b8c5a4975f3$export$18510406f204a1b9);
$parcel$export(module.exports, "isInteger", () => $8b934b8c5a4975f3$export$a287f47fed4544b8);
/**
 * Utility helpers for working with numbers.
 *
 * @module number
 */ 
var $kuitL = parcelRequire("kuitL");

var $1GdQd = parcelRequire("1GdQd");
const $8b934b8c5a4975f3$export$18510406f204a1b9 = Number.MAX_SAFE_INTEGER;
const $8b934b8c5a4975f3$export$91ddad910c1af487 = Number.MIN_SAFE_INTEGER;
const $8b934b8c5a4975f3$export$7accc3db8e859605 = -2147483648;
const $8b934b8c5a4975f3$export$a5f353c3c14c00d0 = $1GdQd.BITS31;
const $8b934b8c5a4975f3$export$f055c566d4c0f541 = $1GdQd.BITS32;
const $8b934b8c5a4975f3$export$a287f47fed4544b8 = Number.isInteger || ((num)=>typeof num === "number" && isFinite(num) && $kuitL.floor(num) === num);
const $8b934b8c5a4975f3$export$c9f5652083b8129d = Number.isNaN;
const $8b934b8c5a4975f3$export$5f87784a266e50a4 = Number.parseInt;
const $8b934b8c5a4975f3$export$33de6ea056a4cdbb = (n)=>{
    n &= $1GdQd.BITS32;
    let count = 0;
    while(n){
        n &= n - 1;
        count++;
    }
    return count;
};

});
parcelRegister("1GdQd", function(module, exports) {

$parcel$export(module.exports, "BIT1", () => $139473425cd25dd4$export$ee2c6657cb286da4);
$parcel$export(module.exports, "BIT2", () => $139473425cd25dd4$export$1f117f3b0edc2676);
$parcel$export(module.exports, "BIT3", () => $139473425cd25dd4$export$e5294f8c78cf7711);
$parcel$export(module.exports, "BIT4", () => $139473425cd25dd4$export$873ae8db4cef5125);
$parcel$export(module.exports, "BIT6", () => $139473425cd25dd4$export$daf23f774967089);
$parcel$export(module.exports, "BIT7", () => $139473425cd25dd4$export$eb5a8e0006ab4bb5);
$parcel$export(module.exports, "BIT8", () => $139473425cd25dd4$export$e25597372303a045);
$parcel$export(module.exports, "BITS5", () => $139473425cd25dd4$export$bc2aba63e4099c09);
$parcel$export(module.exports, "BITS6", () => $139473425cd25dd4$export$f39f4e074e983a34);
$parcel$export(module.exports, "BITS7", () => $139473425cd25dd4$export$f84d6bebff154ceb);
$parcel$export(module.exports, "BITS8", () => $139473425cd25dd4$export$c880072ee0e87648);
$parcel$export(module.exports, "BITS21", () => $139473425cd25dd4$export$b5ffbef7f0f6f536);
$parcel$export(module.exports, "BITS31", () => $139473425cd25dd4$export$87ec42487f19c66c);
$parcel$export(module.exports, "BITS32", () => $139473425cd25dd4$export$3ea07c5174cba08a);
/* eslint-env browser */ /**
 * Binary data constants.
 *
 * @module binary
 */ /**
 * n-th bit activated.
 *
 * @type {number}
 */ const $139473425cd25dd4$export$ee2c6657cb286da4 = 1;
const $139473425cd25dd4$export$1f117f3b0edc2676 = 2;
const $139473425cd25dd4$export$e5294f8c78cf7711 = 4;
const $139473425cd25dd4$export$873ae8db4cef5125 = 8;
const $139473425cd25dd4$export$b6e6496517dfbd31 = 16;
const $139473425cd25dd4$export$daf23f774967089 = 32;
const $139473425cd25dd4$export$eb5a8e0006ab4bb5 = 64;
const $139473425cd25dd4$export$e25597372303a045 = 128;
const $139473425cd25dd4$export$f15587807021fe79 = 256;
const $139473425cd25dd4$export$70939d57ba836c5 = 512;
const $139473425cd25dd4$export$9ec47920d80e8c85 = 1024;
const $139473425cd25dd4$export$bc5dd16b35d4584b = 2048;
const $139473425cd25dd4$export$76a85e893e6d6ecc = 4096;
const $139473425cd25dd4$export$fb6ca64a3ffa3aa9 = 8192;
const $139473425cd25dd4$export$e7adc86ee9ea4b00 = 16384;
const $139473425cd25dd4$export$6aa68b9346d558bb = 32768;
const $139473425cd25dd4$export$5d7aab37466c79ea = 65536;
const $139473425cd25dd4$export$3aa401309ff3940 = 131072;
const $139473425cd25dd4$export$1fd8467d3320465f = 262144;
const $139473425cd25dd4$export$d1dceb84a396f684 = 524288;
const $139473425cd25dd4$export$ef62e7729d79baec = 1048576;
const $139473425cd25dd4$export$40651ae3846a7710 = 2097152;
const $139473425cd25dd4$export$e03976987cb0b818 = 4194304;
const $139473425cd25dd4$export$dd5dceb22223d8ef = 8388608;
const $139473425cd25dd4$export$aecaefba6ae044e4 = 16777216;
const $139473425cd25dd4$export$6e47d6f6c411c0e1 = 33554432;
const $139473425cd25dd4$export$321a8fda0150a18 = 67108864;
const $139473425cd25dd4$export$d7843230fff08622 = 134217728;
const $139473425cd25dd4$export$9fe7219cb72d1ed8 = 268435456;
const $139473425cd25dd4$export$c85121a54e1cc97f = 536870912;
const $139473425cd25dd4$export$76075a64dc7c21ef = 1073741824;
const $139473425cd25dd4$export$49d5cdcf29800e09 = -2147483648;
const $139473425cd25dd4$export$853d99058378c102 = 0;
const $139473425cd25dd4$export$b859c32a415b3ec1 = 1;
const $139473425cd25dd4$export$decefe6957191373 = 3;
const $139473425cd25dd4$export$d1defff3cbd2c6f4 = 7;
const $139473425cd25dd4$export$8d2b432c8c02ae65 = 15;
const $139473425cd25dd4$export$bc2aba63e4099c09 = 31;
const $139473425cd25dd4$export$f39f4e074e983a34 = 63;
const $139473425cd25dd4$export$f84d6bebff154ceb = 127;
const $139473425cd25dd4$export$c880072ee0e87648 = 255;
const $139473425cd25dd4$export$cbbfa5d3c076ad8c = 511;
const $139473425cd25dd4$export$e365aa75b5fa7293 = 1023;
const $139473425cd25dd4$export$51bfc23c1b7b60c3 = 2047;
const $139473425cd25dd4$export$3b0a099b88523ac = 4095;
const $139473425cd25dd4$export$8345c1c06d3e5fc1 = 8191;
const $139473425cd25dd4$export$e20cffba663a7688 = 16383;
const $139473425cd25dd4$export$cd0970fd37b207c6 = 32767;
const $139473425cd25dd4$export$250487b182389b6a = 65535;
const $139473425cd25dd4$export$9d6e01d73abdaadb = $139473425cd25dd4$export$3aa401309ff3940 - 1;
const $139473425cd25dd4$export$eedeab0ac4009664 = $139473425cd25dd4$export$1fd8467d3320465f - 1;
const $139473425cd25dd4$export$e1840c3c33a76ffc = $139473425cd25dd4$export$d1dceb84a396f684 - 1;
const $139473425cd25dd4$export$f0ae3ba8312e92e3 = $139473425cd25dd4$export$ef62e7729d79baec - 1;
const $139473425cd25dd4$export$b5ffbef7f0f6f536 = $139473425cd25dd4$export$40651ae3846a7710 - 1;
const $139473425cd25dd4$export$33ae34bc8e747862 = $139473425cd25dd4$export$e03976987cb0b818 - 1;
const $139473425cd25dd4$export$3629272792e6a9a0 = $139473425cd25dd4$export$dd5dceb22223d8ef - 1;
const $139473425cd25dd4$export$a07300a4cc2ba23c = $139473425cd25dd4$export$aecaefba6ae044e4 - 1;
const $139473425cd25dd4$export$9137f2824b26e02b = $139473425cd25dd4$export$6e47d6f6c411c0e1 - 1;
const $139473425cd25dd4$export$94d4c3aa7cfbb8dd = $139473425cd25dd4$export$321a8fda0150a18 - 1;
const $139473425cd25dd4$export$8af89455097efce0 = $139473425cd25dd4$export$d7843230fff08622 - 1;
const $139473425cd25dd4$export$dee9196bb8567fe9 = $139473425cd25dd4$export$9fe7219cb72d1ed8 - 1;
const $139473425cd25dd4$export$bd0b5ef1d89e90f = $139473425cd25dd4$export$c85121a54e1cc97f - 1;
const $139473425cd25dd4$export$e5560e011efa8766 = $139473425cd25dd4$export$76075a64dc7c21ef - 1;
const $139473425cd25dd4$export$87ec42487f19c66c = 0x7FFFFFFF;
const $139473425cd25dd4$export$3ea07c5174cba08a = 0xFFFFFFFF;

});


parcelRegister("6rcMi", function(module, exports) {

$parcel$export(module.exports, "fromCharCode", () => $4aff2d1be394f54f$export$30216c0101da0ee0);
$parcel$export(module.exports, "fromCamelCase", () => $4aff2d1be394f54f$export$87429743646c3257);
$parcel$export(module.exports, "utf8TextEncoder", () => $4aff2d1be394f54f$export$f3ce4806f2484eb);
$parcel$export(module.exports, "encodeUtf8", () => $4aff2d1be394f54f$export$8f647c2204da8484);
$parcel$export(module.exports, "utf8TextDecoder", () => $4aff2d1be394f54f$export$f477633695bbbcd);
$parcel$export(module.exports, "decodeUtf8", () => $4aff2d1be394f54f$export$72118b85b055afd);
$parcel$export(module.exports, "repeat", () => $4aff2d1be394f54f$export$76d90c956114f2c2);

var $7sfdv = parcelRequire("7sfdv");
const $4aff2d1be394f54f$export$30216c0101da0ee0 = String.fromCharCode;
const $4aff2d1be394f54f$export$73bfc63873071f74 = String.fromCodePoint;
const $4aff2d1be394f54f$export$e3a9a653b2a11ac1 = $4aff2d1be394f54f$export$30216c0101da0ee0(65535);
/**
 * @param {string} s
 * @return {string}
 */ const $4aff2d1be394f54f$var$toLowerCase = (s)=>s.toLowerCase();
const $4aff2d1be394f54f$var$trimLeftRegex = /^\s*/g;
const $4aff2d1be394f54f$export$c5557f40488c48ec = (s)=>s.replace($4aff2d1be394f54f$var$trimLeftRegex, "");
const $4aff2d1be394f54f$var$fromCamelCaseRegex = /([A-Z])/g;
const $4aff2d1be394f54f$export$87429743646c3257 = (s, separator)=>$4aff2d1be394f54f$export$c5557f40488c48ec(s.replace($4aff2d1be394f54f$var$fromCamelCaseRegex, (match)=>`${separator}${$4aff2d1be394f54f$var$toLowerCase(match)}`));
const $4aff2d1be394f54f$export$ba35f6b806a3dbd4 = (str)=>unescape(encodeURIComponent(str)).length;
const $4aff2d1be394f54f$export$83d8cea287b4dfcd = (str)=>{
    const encodedString = unescape(encodeURIComponent(str));
    const len = encodedString.length;
    const buf = new Uint8Array(len);
    for(let i = 0; i < len; i++)buf[i] = /** @type {number} */ encodedString.codePointAt(i);
    return buf;
};
const $4aff2d1be394f54f$export$f3ce4806f2484eb = /** @type {TextEncoder} */ typeof TextEncoder !== "undefined" ? new TextEncoder() : null;
const $4aff2d1be394f54f$export$9a0a70804ee285dd = (str)=>$4aff2d1be394f54f$export$f3ce4806f2484eb.encode(str);
const $4aff2d1be394f54f$export$8f647c2204da8484 = $4aff2d1be394f54f$export$f3ce4806f2484eb ? $4aff2d1be394f54f$export$9a0a70804ee285dd : $4aff2d1be394f54f$export$83d8cea287b4dfcd;
const $4aff2d1be394f54f$export$154b750182ae32cf = (buf)=>{
    let remainingLen = buf.length;
    let encodedString = "";
    let bufPos = 0;
    while(remainingLen > 0){
        const nextLen = remainingLen < 10000 ? remainingLen : 10000;
        const bytes = buf.subarray(bufPos, bufPos + nextLen);
        bufPos += nextLen;
        // Starting with ES5.1 we can supply a generic array-like object as arguments
        encodedString += String.fromCodePoint.apply(null, /** @type {any} */ bytes);
        remainingLen -= nextLen;
    }
    return decodeURIComponent(escape(encodedString));
};
let $4aff2d1be394f54f$export$f477633695bbbcd = typeof TextDecoder === "undefined" ? null : new TextDecoder("utf-8", {
    fatal: true,
    ignoreBOM: true
});
/* c8 ignore start */ if ($4aff2d1be394f54f$export$f477633695bbbcd && $4aff2d1be394f54f$export$f477633695bbbcd.decode(new Uint8Array()).length === 1) // Safari doesn't handle BOM correctly.
// This fixes a bug in Safari 13.0.5 where it produces a BOM the first time it is called.
// utf8TextDecoder.decode(new Uint8Array()).length === 1 on the first call and
// utf8TextDecoder.decode(new Uint8Array()).length === 1 on the second call
// Another issue is that from then on no BOM chars are recognized anymore
/* c8 ignore next */ $4aff2d1be394f54f$export$f477633695bbbcd = null;
const $4aff2d1be394f54f$export$23d5f1ce72f56168 = (buf)=>/** @type {TextDecoder} */ $4aff2d1be394f54f$export$f477633695bbbcd.decode(buf);
const $4aff2d1be394f54f$export$72118b85b055afd = $4aff2d1be394f54f$export$f477633695bbbcd ? $4aff2d1be394f54f$export$23d5f1ce72f56168 : $4aff2d1be394f54f$export$154b750182ae32cf;
const $4aff2d1be394f54f$export$869882364835d202 = (str, index, remove, insert = "")=>str.slice(0, index) + insert + str.slice(index + remove);
const $4aff2d1be394f54f$export$76d90c956114f2c2 = (source, n)=>$7sfdv.unfold(n, ()=>source).join("");

});


parcelRegister("f5RS8", function(module, exports) {

$parcel$export(module.exports, "createDecoder", () => $afd11c8aa623a051$export$f8c898e83b60faaa);
$parcel$export(module.exports, "hasContent", () => $afd11c8aa623a051$export$7ad75c69830b76d7);
$parcel$export(module.exports, "readVarUint8Array", () => $afd11c8aa623a051$export$7418bbc18dee40f3);
$parcel$export(module.exports, "readVarUint", () => $afd11c8aa623a051$export$5a476e4dbe7923d5);
$parcel$export(module.exports, "readUint8", () => $afd11c8aa623a051$export$d5778a2beba4ceef);
$parcel$export(module.exports, "readVarInt", () => $afd11c8aa623a051$export$1dd5b9ddf6575ae8);
$parcel$export(module.exports, "readVarString", () => $afd11c8aa623a051$export$3b64b4d753b81ec2);
$parcel$export(module.exports, "readAny", () => $afd11c8aa623a051$export$82863139061f472f);
$parcel$export(module.exports, "RleDecoder", () => $afd11c8aa623a051$export$f1f1200492b832af);
$parcel$export(module.exports, "UintOptRleDecoder", () => $afd11c8aa623a051$export$2dc62fb2f864b82e);
$parcel$export(module.exports, "IntDiffOptRleDecoder", () => $afd11c8aa623a051$export$d502ab0bf048a596);
$parcel$export(module.exports, "StringDecoder", () => $afd11c8aa623a051$export$63a7aa211a91ed69);
/**
 * Efficient schema-less binary decoding with support for variable length encoding.
 *
 * Use [lib0/decoding] with [lib0/encoding]. Every encoding function has a corresponding decoding function.
 *
 * Encodes numbers in little-endian order (least to most significant byte order)
 * and is compatible with Golang's binary encoding (https://golang.org/pkg/encoding/binary/)
 * which is also used in Protocol Buffers.
 *
 * ```js
 * // encoding step
 * const encoder = encoding.createEncoder()
 * encoding.writeVarUint(encoder, 256)
 * encoding.writeVarString(encoder, 'Hello world!')
 * const buf = encoding.toUint8Array(encoder)
 * ```
 *
 * ```js
 * // decoding step
 * const decoder = decoding.createDecoder(buf)
 * decoding.readVarUint(decoder) // => 256
 * decoding.readVarString(decoder) // => 'Hello world!'
 * decoding.hasContent(decoder) // => false - all data is read
 * ```
 *
 * @module decoding
 */ 
var $1GdQd = parcelRequire("1GdQd");

var $kuitL = parcelRequire("kuitL");

var $bYXiv = parcelRequire("bYXiv");

var $6rcMi = parcelRequire("6rcMi");

var $akmFO = parcelRequire("akmFO");

var $1p1sv = parcelRequire("1p1sv");
const $afd11c8aa623a051$var$errorUnexpectedEndOfArray = $akmFO.create("Unexpected end of array");
const $afd11c8aa623a051$var$errorIntegerOutOfRange = $akmFO.create("Integer out of Range");
class $afd11c8aa623a051$export$f9de6ca0bc043724 {
    /**
   * @param {Uint8Array} uint8Array Binary data to decode
   */ constructor(uint8Array){
        /**
     * Decoding target.
     *
     * @type {Uint8Array}
     */ this.arr = uint8Array;
        /**
     * Current decoding position.
     *
     * @type {number}
     */ this.pos = 0;
    }
}
const $afd11c8aa623a051$export$f8c898e83b60faaa = (uint8Array)=>new $afd11c8aa623a051$export$f9de6ca0bc043724(uint8Array);
const $afd11c8aa623a051$export$7ad75c69830b76d7 = (decoder)=>decoder.pos !== decoder.arr.length;
const $afd11c8aa623a051$export$9cd59f9826255e47 = (decoder, newPos = decoder.pos)=>{
    const _decoder = $afd11c8aa623a051$export$f8c898e83b60faaa(decoder.arr);
    _decoder.pos = newPos;
    return _decoder;
};
const $afd11c8aa623a051$export$e21b2fe168d56a89 = (decoder, len)=>{
    const view = new Uint8Array(decoder.arr.buffer, decoder.pos + decoder.arr.byteOffset, len);
    decoder.pos += len;
    return view;
};
const $afd11c8aa623a051$export$7418bbc18dee40f3 = (decoder)=>$afd11c8aa623a051$export$e21b2fe168d56a89(decoder, $afd11c8aa623a051$export$5a476e4dbe7923d5(decoder));
const $afd11c8aa623a051$export$8c9f57cb3e3e2d3b = (decoder)=>$afd11c8aa623a051$export$e21b2fe168d56a89(decoder, decoder.arr.length - decoder.pos);
const $afd11c8aa623a051$export$228a9507fbdfcdb6 = (decoder)=>decoder.pos++;
const $afd11c8aa623a051$export$d5778a2beba4ceef = (decoder)=>decoder.arr[decoder.pos++];
const $afd11c8aa623a051$export$ef14636f4cf20706 = (decoder)=>{
    const uint = decoder.arr[decoder.pos] + (decoder.arr[decoder.pos + 1] << 8);
    decoder.pos += 2;
    return uint;
};
const $afd11c8aa623a051$export$967c96218130b9ba = (decoder)=>{
    const uint = decoder.arr[decoder.pos] + (decoder.arr[decoder.pos + 1] << 8) + (decoder.arr[decoder.pos + 2] << 16) + (decoder.arr[decoder.pos + 3] << 24) >>> 0;
    decoder.pos += 4;
    return uint;
};
const $afd11c8aa623a051$export$adb88b5d4ab91f4e = (decoder)=>{
    const uint = decoder.arr[decoder.pos + 3] + (decoder.arr[decoder.pos + 2] << 8) + (decoder.arr[decoder.pos + 1] << 16) + (decoder.arr[decoder.pos] << 24) >>> 0;
    decoder.pos += 4;
    return uint;
};
const $afd11c8aa623a051$export$c6eca102d0b41ca0 = (decoder)=>decoder.arr[decoder.pos];
const $afd11c8aa623a051$export$e5eb1e52afa13f8d = (decoder)=>decoder.arr[decoder.pos] + (decoder.arr[decoder.pos + 1] << 8);
const $afd11c8aa623a051$export$67e54e775d28f9ae = (decoder)=>decoder.arr[decoder.pos] + (decoder.arr[decoder.pos + 1] << 8) + (decoder.arr[decoder.pos + 2] << 16) + (decoder.arr[decoder.pos + 3] << 24) >>> 0;
const $afd11c8aa623a051$export$5a476e4dbe7923d5 = (decoder)=>{
    let num = 0;
    let mult = 1;
    const len = decoder.arr.length;
    while(decoder.pos < len){
        const r = decoder.arr[decoder.pos++];
        // num = num | ((r & binary.BITS7) << len)
        num = num + (r & $1GdQd.BITS7) * mult // shift $r << (7*#iterations) and add it to num
        ;
        mult *= 128 // next iteration, shift 7 "more" to the left
        ;
        if (r < $1GdQd.BIT8) return num;
        /* c8 ignore start */ if (num > $bYXiv.MAX_SAFE_INTEGER) throw $afd11c8aa623a051$var$errorIntegerOutOfRange;
    /* c8 ignore stop */ }
    throw $afd11c8aa623a051$var$errorUnexpectedEndOfArray;
};
const $afd11c8aa623a051$export$1dd5b9ddf6575ae8 = (decoder)=>{
    let r = decoder.arr[decoder.pos++];
    let num = r & $1GdQd.BITS6;
    let mult = 64;
    const sign = (r & $1GdQd.BIT7) > 0 ? -1 : 1;
    if ((r & $1GdQd.BIT8) === 0) // don't continue reading
    return sign * num;
    const len = decoder.arr.length;
    while(decoder.pos < len){
        r = decoder.arr[decoder.pos++];
        // num = num | ((r & binary.BITS7) << len)
        num = num + (r & $1GdQd.BITS7) * mult;
        mult *= 128;
        if (r < $1GdQd.BIT8) return sign * num;
        /* c8 ignore start */ if (num > $bYXiv.MAX_SAFE_INTEGER) throw $afd11c8aa623a051$var$errorIntegerOutOfRange;
    /* c8 ignore stop */ }
    throw $afd11c8aa623a051$var$errorUnexpectedEndOfArray;
};
const $afd11c8aa623a051$export$dc86e1eb544aa5ab = (decoder)=>{
    const pos = decoder.pos;
    const s = $afd11c8aa623a051$export$5a476e4dbe7923d5(decoder);
    decoder.pos = pos;
    return s;
};
const $afd11c8aa623a051$export$47c43df02cd47fca = (decoder)=>{
    const pos = decoder.pos;
    const s = $afd11c8aa623a051$export$1dd5b9ddf6575ae8(decoder);
    decoder.pos = pos;
    return s;
};
const $afd11c8aa623a051$export$e73299e6158668bb = (decoder)=>{
    let remainingLen = $afd11c8aa623a051$export$5a476e4dbe7923d5(decoder);
    if (remainingLen === 0) return "";
    else {
        let encodedString = String.fromCodePoint($afd11c8aa623a051$export$d5778a2beba4ceef(decoder)) // remember to decrease remainingLen
        ;
        if (--remainingLen < 100) while(remainingLen--)encodedString += String.fromCodePoint($afd11c8aa623a051$export$d5778a2beba4ceef(decoder));
        else while(remainingLen > 0){
            const nextLen = remainingLen < 10000 ? remainingLen : 10000;
            // this is dangerous, we create a fresh array view from the existing buffer
            const bytes = decoder.arr.subarray(decoder.pos, decoder.pos + nextLen);
            decoder.pos += nextLen;
            // Starting with ES5.1 we can supply a generic array-like object as arguments
            encodedString += String.fromCodePoint.apply(null, /** @type {any} */ bytes);
            remainingLen -= nextLen;
        }
        return decodeURIComponent(escape(encodedString));
    }
};
const $afd11c8aa623a051$export$7247eefae50fb91a = (decoder)=>/** @type any */ $6rcMi.utf8TextDecoder.decode($afd11c8aa623a051$export$7418bbc18dee40f3(decoder));
const $afd11c8aa623a051$export$3b64b4d753b81ec2 = $6rcMi.utf8TextDecoder ? $afd11c8aa623a051$export$7247eefae50fb91a : $afd11c8aa623a051$export$e73299e6158668bb;
const $afd11c8aa623a051$export$23764cfecad9ae2f = (decoder)=>{
    const encoder = $1p1sv.createEncoder();
    let b;
    while(true){
        b = $afd11c8aa623a051$export$d5778a2beba4ceef(decoder);
        if (b === 0) return $1p1sv.toUint8Array(encoder);
        if (b === 1) b = $afd11c8aa623a051$export$d5778a2beba4ceef(decoder);
        $1p1sv.write(encoder, b);
    }
};
const $afd11c8aa623a051$export$d38ec182b293d566 = (decoder)=>$6rcMi.decodeUtf8($afd11c8aa623a051$export$23764cfecad9ae2f(decoder));
const $afd11c8aa623a051$export$91c1f3f0dd9bd2f5 = (decoder)=>{
    const pos = decoder.pos;
    const s = $afd11c8aa623a051$export$3b64b4d753b81ec2(decoder);
    decoder.pos = pos;
    return s;
};
const $afd11c8aa623a051$export$d7dd05f632129fe5 = (decoder, len)=>{
    const dv = new DataView(decoder.arr.buffer, decoder.arr.byteOffset + decoder.pos, len);
    decoder.pos += len;
    return dv;
};
const $afd11c8aa623a051$export$dbc4aa781d9afe3b = (decoder)=>$afd11c8aa623a051$export$d7dd05f632129fe5(decoder, 4).getFloat32(0, false);
const $afd11c8aa623a051$export$d89a471990a89a7f = (decoder)=>$afd11c8aa623a051$export$d7dd05f632129fe5(decoder, 8).getFloat64(0, false);
const $afd11c8aa623a051$export$99e633bd4f295d85 = (decoder)=>/** @type {any} */ $afd11c8aa623a051$export$d7dd05f632129fe5(decoder, 8).getBigInt64(0, false);
const $afd11c8aa623a051$export$21575c47d1f9b652 = (decoder)=>/** @type {any} */ $afd11c8aa623a051$export$d7dd05f632129fe5(decoder, 8).getBigUint64(0, false);
/**
 * @type {Array<function(Decoder):any>}
 */ const $afd11c8aa623a051$var$readAnyLookupTable = [
    (decoder)=>undefined,
    (decoder)=>null,
    $afd11c8aa623a051$export$1dd5b9ddf6575ae8,
    $afd11c8aa623a051$export$dbc4aa781d9afe3b,
    $afd11c8aa623a051$export$d89a471990a89a7f,
    $afd11c8aa623a051$export$99e633bd4f295d85,
    (decoder)=>false,
    (decoder)=>true,
    $afd11c8aa623a051$export$3b64b4d753b81ec2,
    (decoder)=>{
        const len = $afd11c8aa623a051$export$5a476e4dbe7923d5(decoder);
        /**
     * @type {Object<string,any>}
     */ const obj = {};
        for(let i = 0; i < len; i++){
            const key = $afd11c8aa623a051$export$3b64b4d753b81ec2(decoder);
            obj[key] = $afd11c8aa623a051$export$82863139061f472f(decoder);
        }
        return obj;
    },
    (decoder)=>{
        const len = $afd11c8aa623a051$export$5a476e4dbe7923d5(decoder);
        const arr = [];
        for(let i = 0; i < len; i++)arr.push($afd11c8aa623a051$export$82863139061f472f(decoder));
        return arr;
    },
    $afd11c8aa623a051$export$7418bbc18dee40f3 // CASE 116: Uint8Array
];
const $afd11c8aa623a051$export$82863139061f472f = (decoder)=>$afd11c8aa623a051$var$readAnyLookupTable[127 - $afd11c8aa623a051$export$d5778a2beba4ceef(decoder)](decoder);
class $afd11c8aa623a051$export$f1f1200492b832af extends $afd11c8aa623a051$export$f9de6ca0bc043724 {
    /**
   * @param {Uint8Array} uint8Array
   * @param {function(Decoder):T} reader
   */ constructor(uint8Array, reader){
        super(uint8Array);
        /**
     * The reader
     */ this.reader = reader;
        /**
     * Current state
     * @type {T|null}
     */ this.s = null;
        this.count = 0;
    }
    read() {
        if (this.count === 0) {
            this.s = this.reader(this);
            if ($afd11c8aa623a051$export$7ad75c69830b76d7(this)) this.count = $afd11c8aa623a051$export$5a476e4dbe7923d5(this) + 1 // see encoder implementation for the reason why this is incremented
            ;
            else this.count = -1 // read the current value forever
            ;
        }
        this.count--;
        return /** @type {T} */ this.s;
    }
}
class $afd11c8aa623a051$export$938378143fffe1b4 extends $afd11c8aa623a051$export$f9de6ca0bc043724 {
    /**
   * @param {Uint8Array} uint8Array
   * @param {number} start
   */ constructor(uint8Array, start){
        super(uint8Array);
        /**
     * Current state
     * @type {number}
     */ this.s = start;
    }
    /**
   * @return {number}
   */ read() {
        this.s += $afd11c8aa623a051$export$1dd5b9ddf6575ae8(this);
        return this.s;
    }
}
class $afd11c8aa623a051$export$595b36f1b42934c6 extends $afd11c8aa623a051$export$f9de6ca0bc043724 {
    /**
   * @param {Uint8Array} uint8Array
   * @param {number} start
   */ constructor(uint8Array, start){
        super(uint8Array);
        /**
     * Current state
     * @type {number}
     */ this.s = start;
        this.count = 0;
    }
    /**
   * @return {number}
   */ read() {
        if (this.count === 0) {
            this.s += $afd11c8aa623a051$export$1dd5b9ddf6575ae8(this);
            if ($afd11c8aa623a051$export$7ad75c69830b76d7(this)) this.count = $afd11c8aa623a051$export$5a476e4dbe7923d5(this) + 1 // see encoder implementation for the reason why this is incremented
            ;
            else this.count = -1 // read the current value forever
            ;
        }
        this.count--;
        return /** @type {number} */ this.s;
    }
}
class $afd11c8aa623a051$export$2dc62fb2f864b82e extends $afd11c8aa623a051$export$f9de6ca0bc043724 {
    /**
   * @param {Uint8Array} uint8Array
   */ constructor(uint8Array){
        super(uint8Array);
        /**
     * @type {number}
     */ this.s = 0;
        this.count = 0;
    }
    read() {
        if (this.count === 0) {
            this.s = $afd11c8aa623a051$export$1dd5b9ddf6575ae8(this);
            // if the sign is negative, we read the count too, otherwise count is 1
            const isNegative = $kuitL.isNegativeZero(this.s);
            this.count = 1;
            if (isNegative) {
                this.s = -this.s;
                this.count = $afd11c8aa623a051$export$5a476e4dbe7923d5(this) + 2;
            }
        }
        this.count--;
        return /** @type {number} */ this.s;
    }
}
class $afd11c8aa623a051$export$727389af14dfe417 extends $afd11c8aa623a051$export$f9de6ca0bc043724 {
    /**
   * @param {Uint8Array} uint8Array
   */ constructor(uint8Array){
        super(uint8Array);
        /**
     * @type {number}
     */ this.s = 0;
        this.count = 0;
    }
    read() {
        if (this.count === 0) {
            this.s = $afd11c8aa623a051$export$1dd5b9ddf6575ae8(this);
            // if the sign is negative, we read the count too, otherwise count is 1
            const isNegative = $kuitL.isNegativeZero(this.s);
            this.count = 1;
            if (isNegative) {
                this.s = -this.s;
                this.count = $afd11c8aa623a051$export$5a476e4dbe7923d5(this) + 2;
            }
        }
        this.count--;
        return /** @type {number} */ this.s++;
    }
}
class $afd11c8aa623a051$export$d502ab0bf048a596 extends $afd11c8aa623a051$export$f9de6ca0bc043724 {
    /**
   * @param {Uint8Array} uint8Array
   */ constructor(uint8Array){
        super(uint8Array);
        /**
     * @type {number}
     */ this.s = 0;
        this.count = 0;
        this.diff = 0;
    }
    /**
   * @return {number}
   */ read() {
        if (this.count === 0) {
            const diff = $afd11c8aa623a051$export$1dd5b9ddf6575ae8(this);
            // if the first bit is set, we read more data
            const hasCount = diff & 1;
            this.diff = $kuitL.floor(diff / 2) // shift >> 1
            ;
            this.count = 1;
            if (hasCount) this.count = $afd11c8aa623a051$export$5a476e4dbe7923d5(this) + 2;
        }
        this.s += this.diff;
        this.count--;
        return this.s;
    }
}
class $afd11c8aa623a051$export$63a7aa211a91ed69 {
    /**
   * @param {Uint8Array} uint8Array
   */ constructor(uint8Array){
        this.decoder = new $afd11c8aa623a051$export$2dc62fb2f864b82e(uint8Array);
        this.str = $afd11c8aa623a051$export$3b64b4d753b81ec2(this.decoder);
        /**
     * @type {number}
     */ this.spos = 0;
    }
    /**
   * @return {string}
   */ read() {
        const end = this.spos + this.decoder.read();
        const res = this.str.slice(this.spos, end);
        this.spos = end;
        return res;
    }
}

});
parcelRegister("akmFO", function(module, exports) {

$parcel$export(module.exports, "create", () => $784d5c1a525ee932$export$185802fd694ee1f5);
$parcel$export(module.exports, "methodUnimplemented", () => $784d5c1a525ee932$export$73ced5c7e10d6d0f);
$parcel$export(module.exports, "unexpectedCase", () => $784d5c1a525ee932$export$965b6bccecbd9673);
/**
 * Error helpers.
 *
 * @module error
 */ /**
 * @param {string} s
 * @return {Error}
 */ /* c8 ignore next */ const $784d5c1a525ee932$export$185802fd694ee1f5 = (s)=>new Error(s);
const $784d5c1a525ee932$export$73ced5c7e10d6d0f = ()=>{
    throw $784d5c1a525ee932$export$185802fd694ee1f5("Method unimplemented");
};
const $784d5c1a525ee932$export$965b6bccecbd9673 = ()=>{
    throw $784d5c1a525ee932$export$185802fd694ee1f5("Unexpected case");
};

});


parcelRegister("TGOcE", function(module, exports) {

$parcel$export(module.exports, "uint32", () => $0a7658170cf34a20$export$de9ffb9418dd7d0d);
$parcel$export(module.exports, "uuidv4", () => $0a7658170cf34a20$export$abe4376e1bf796d6);
/**
 * Isomorphic module for true random numbers / buffers / uuids.
 *
 * Attention: falls back to Math.random if the browser does not support crypto.
 *
 * @module random
 */ 
var $kuitL = parcelRequire("kuitL");

var $1GdQd = parcelRequire("1GdQd");

var $i1aUa = parcelRequire("i1aUa");
const $0a7658170cf34a20$export$bb0a9c36cf454ea0 = Math.random;
const $0a7658170cf34a20$export$de9ffb9418dd7d0d = ()=>(0, $i1aUa.getRandomValues)(new Uint32Array(1))[0];
const $0a7658170cf34a20$export$6bf94e3d82617e4e = ()=>{
    const arr = (0, $i1aUa.getRandomValues)(new Uint32Array(8));
    return (arr[0] & $1GdQd.BITS21) * ($1GdQd.BITS32 + 1) + (arr[1] >>> 0);
};
const $0a7658170cf34a20$export$a9a18ae5ba42aeab = (arr)=>arr[$kuitL.floor($0a7658170cf34a20$export$bb0a9c36cf454ea0() * arr.length)];
// @ts-ignore
const $0a7658170cf34a20$var$uuidv4Template = "10000000-1000-4000-8000-100000000000";
const $0a7658170cf34a20$export$abe4376e1bf796d6 = ()=>$0a7658170cf34a20$var$uuidv4Template.replace(/[018]/g, /** @param {number} c */ (c)=>(c ^ $0a7658170cf34a20$export$de9ffb9418dd7d0d() & 15 >> c / 4).toString(16));

});
parcelRegister("i1aUa", function(module, exports) {

$parcel$export(module.exports, "getRandomValues", () => $d1e0c77bcd3cbd93$export$960b9ff25e7d4257);
/* eslint-env browser */ const $d1e0c77bcd3cbd93$export$f45422fd2e8042d4 = crypto.subtle;
const $d1e0c77bcd3cbd93$export$960b9ff25e7d4257 = crypto.getRandomValues.bind(crypto);

});


parcelRegister("jKNqA", function(module, exports) {

$parcel$export(module.exports, "create", () => $e618a78226168247$export$185802fd694ee1f5);
/**
 * Utility helpers to work with promises.
 *
 * @module promise
 */ 
var $1oyOX = parcelRequire("1oyOX");
const $e618a78226168247$export$185802fd694ee1f5 = (f)=>/** @type {Promise<T>} */ new Promise(f);
const $e618a78226168247$export$fe201bb3bbe031e9 = (f)=>new Promise(f);
const $e618a78226168247$export$84bf76cd7afc7469 = Promise.all.bind(Promise);
const $e618a78226168247$export$2800f3ceda99eb84 = (reason)=>Promise.reject(reason);
const $e618a78226168247$export$f7ad0328861e2f03 = (res)=>Promise.resolve(res);
const $e618a78226168247$export$65eff93aa071dbbd = (res)=>Promise.resolve(res);
const $e618a78226168247$export$a40009bd2c363351 = (timeout, check, intervalResolution = 10)=>$e618a78226168247$export$185802fd694ee1f5((resolve, reject)=>{
        const startTime = $1oyOX.getUnixTime();
        const hasTimeout = timeout > 0;
        const untilInterval = ()=>{
            if (check()) {
                clearInterval(intervalHandle);
                resolve();
            } else if (hasTimeout) /* c8 ignore else */ {
                if ($1oyOX.getUnixTime() - startTime > timeout) {
                    clearInterval(intervalHandle);
                    reject(new Error("Timeout"));
                }
            }
        };
        const intervalHandle = setInterval(untilInterval, intervalResolution);
    });
const $e618a78226168247$export$5c069c93d2b7493f = (timeout)=>$e618a78226168247$export$185802fd694ee1f5((resolve, reject)=>setTimeout(resolve, timeout));
const $e618a78226168247$export$4369c812aac99591 = (p)=>p instanceof Promise || p && p.then && p.catch && p.finally;

});
parcelRegister("1oyOX", function(module, exports) {

$parcel$export(module.exports, "getUnixTime", () => $10430b098835f3e5$export$1f77c0008d16313);
/**
 * Utility module to work with time.
 *
 * @module time
 */ 
var $fdJ4E = parcelRequire("fdJ4E");

var $kuitL = parcelRequire("kuitL");
const $10430b098835f3e5$export$aa350b96d91cd94 = ()=>new Date();
const $10430b098835f3e5$export$1f77c0008d16313 = Date.now;
const $10430b098835f3e5$export$70cb903099cabea3 = (d)=>{
    if (d < 60000) {
        const p = $fdJ4E.prefix(d, -1);
        return $kuitL.round(p.n * 100) / 100 + p.prefix + "s";
    }
    d = $kuitL.floor(d / 1000);
    const seconds = d % 60;
    const minutes = $kuitL.floor(d / 60) % 60;
    const hours = $kuitL.floor(d / 3600) % 24;
    const days = $kuitL.floor(d / 86400);
    if (days > 0) return days + "d" + (hours > 0 || minutes > 30 ? " " + (minutes > 30 ? hours + 1 : hours) + "h" : "");
    if (hours > 0) /* c8 ignore next */ return hours + "h" + (minutes > 0 || seconds > 30 ? " " + (seconds > 30 ? minutes + 1 : minutes) + "min" : "");
    return minutes + "min" + (seconds > 0 ? " " + seconds + "s" : "");
};

});
parcelRegister("fdJ4E", function(module, exports) {

$parcel$export(module.exports, "prefix", () => $b14b08a77e201216$export$82e9f45cca5ba907);
/**
 * Utility module to convert metric values.
 *
 * @module metric
 */ 
var $kuitL = parcelRequire("kuitL");
const $b14b08a77e201216$export$3c3f39195836e927 = 1e24;
const $b14b08a77e201216$export$bc1fc8bc8e1895cf = 1e21;
const $b14b08a77e201216$export$91377b751fc464a0 = 1e18;
const $b14b08a77e201216$export$fc10d2598c9417a5 = 1e15;
const $b14b08a77e201216$export$ce366dc9d5abf7ac = 1e12;
const $b14b08a77e201216$export$197e40aa3a484017 = 1e9;
const $b14b08a77e201216$export$580f1e8cf64f2815 = 1e6;
const $b14b08a77e201216$export$a3ed9693cfbf67fa = 1e3;
const $b14b08a77e201216$export$6ec17edd70114a88 = 1e2;
const $b14b08a77e201216$export$6ffbaf3528ca9f3f = 10;
const $b14b08a77e201216$export$ec5800edbd9f0b69 = 0.1;
const $b14b08a77e201216$export$9faf718fe58aaa35 = 0.01;
const $b14b08a77e201216$export$fab274f99578ceb6 = 1e-3;
const $b14b08a77e201216$export$77bd0ce503b87b26 = 1e-6;
const $b14b08a77e201216$export$ddef5c050164e23e = 1e-9;
const $b14b08a77e201216$export$e10c52a2ab594201 = 1e-12;
const $b14b08a77e201216$export$c49f04803481822 = 1e-15;
const $b14b08a77e201216$export$5510a0bcf77f39 = 1e-18;
const $b14b08a77e201216$export$2b85cc24af20b7fe = 1e-21;
const $b14b08a77e201216$export$a2878e23774b59ce = 1e-24;
const $b14b08a77e201216$var$prefixUp = [
    "",
    "k",
    "M",
    "G",
    "T",
    "P",
    "E",
    "Z",
    "Y"
];
const $b14b08a77e201216$var$prefixDown = [
    "",
    "m",
    "\u03BC",
    "n",
    "p",
    "f",
    "a",
    "z",
    "y"
];
const $b14b08a77e201216$export$82e9f45cca5ba907 = (n, baseMultiplier = 0)=>{
    const nPow = n === 0 ? 0 : $kuitL.log10(n);
    let mult = 0;
    while(nPow < mult * 3 && baseMultiplier > -8){
        baseMultiplier--;
        mult--;
    }
    while(nPow >= 3 + mult * 3 && baseMultiplier < 8){
        baseMultiplier++;
        mult++;
    }
    const prefix = baseMultiplier < 0 ? $b14b08a77e201216$var$prefixDown[-baseMultiplier] : $b14b08a77e201216$var$prefixUp[baseMultiplier];
    return {
        n: $kuitL.round((mult > 0 ? n / $kuitL.exp10(mult * 3) : n * $kuitL.exp10(mult * -3)) * 1e12) / 1e12,
        prefix: prefix
    };
};

});



parcelRegister("lB8LX", function(module, exports) {

$parcel$export(module.exports, "copyUint8Array", () => $fb93dbba73c73ad7$export$fe6f60023cd5ffaf);
/**
 * Utility functions to work with buffers (Uint8Array).
 *
 * @module buffer
 */ 
var $6rcMi = parcelRequire("6rcMi");

var $4ptg7 = parcelRequire("4ptg7");

var $7sfdv = parcelRequire("7sfdv");

var $kuitL = parcelRequire("kuitL");

var $1p1sv = parcelRequire("1p1sv");

var $f5RS8 = parcelRequire("f5RS8");

var $9gCdk = parcelRequire("9gCdk");
var $fb93dbba73c73ad7$require$Buffer = $9gCdk.Buffer;
const $fb93dbba73c73ad7$export$79a0c4c40eecffbb = (len)=>new Uint8Array(len);
const $fb93dbba73c73ad7$export$f3c8b5f6d250ec43 = (buffer, byteOffset, length)=>new Uint8Array(buffer, byteOffset, length);
const $fb93dbba73c73ad7$export$1b999ddd54e5bed1 = (buffer)=>new Uint8Array(buffer);
/* c8 ignore start */ /**
 * @param {Uint8Array} bytes
 * @return {string}
 */ const $fb93dbba73c73ad7$var$toBase64Browser = (bytes)=>{
    let s = "";
    for(let i = 0; i < bytes.byteLength; i++)s += $6rcMi.fromCharCode(bytes[i]);
    // eslint-disable-next-line no-undef
    return btoa(s);
};
/* c8 ignore stop */ /**
 * @param {Uint8Array} bytes
 * @return {string}
 */ const $fb93dbba73c73ad7$var$toBase64Node = (bytes)=>$fb93dbba73c73ad7$require$Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength).toString("base64");
/* c8 ignore start */ /**
 * @param {string} s
 * @return {Uint8Array}
 */ const $fb93dbba73c73ad7$var$fromBase64Browser = (s)=>{
    // eslint-disable-next-line no-undef
    const a = atob(s);
    const bytes = $fb93dbba73c73ad7$export$79a0c4c40eecffbb(a.length);
    for(let i = 0; i < a.length; i++)bytes[i] = a.charCodeAt(i);
    return bytes;
};
/* c8 ignore stop */ /**
 * @param {string} s
 */ const $fb93dbba73c73ad7$var$fromBase64Node = (s)=>{
    const buf = $fb93dbba73c73ad7$require$Buffer.from(s, "base64");
    return $fb93dbba73c73ad7$export$f3c8b5f6d250ec43(buf.buffer, buf.byteOffset, buf.byteLength);
};
const $fb93dbba73c73ad7$export$37cc283d8fbd3462 = $4ptg7.isBrowser ? $fb93dbba73c73ad7$var$toBase64Browser : $fb93dbba73c73ad7$var$toBase64Node;
const $fb93dbba73c73ad7$export$c537b38001c583b7 = $4ptg7.isBrowser ? $fb93dbba73c73ad7$var$fromBase64Browser : $fb93dbba73c73ad7$var$fromBase64Node;
const $fb93dbba73c73ad7$export$31f478961f22a29 = (buf)=>$fb93dbba73c73ad7$export$37cc283d8fbd3462(buf).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
const $fb93dbba73c73ad7$export$2fcb175ca881fa06 = (base64)=>$fb93dbba73c73ad7$export$c537b38001c583b7(base64.replaceAll("-", "+").replaceAll("_", "/"));
const $fb93dbba73c73ad7$export$f4915efbb94d4d01 = (buf)=>$7sfdv.map(buf, (b)=>b.toString(16).padStart(2, "0")).join("");
const $fb93dbba73c73ad7$export$99a70112ceb8327b = (hex)=>{
    const hlen = hex.length;
    const buf = new Uint8Array($kuitL.ceil(hlen / 2));
    for(let i = 0; i < hlen; i += 2)buf[buf.length - i / 2 - 1] = Number.parseInt(hex.slice(hlen - i - 2, hlen - i), 16);
    return buf;
};
const $fb93dbba73c73ad7$export$fe6f60023cd5ffaf = (uint8Array)=>{
    const newBuf = $fb93dbba73c73ad7$export$79a0c4c40eecffbb(uint8Array.byteLength);
    newBuf.set(uint8Array);
    return newBuf;
};
const $fb93dbba73c73ad7$export$355ad3726be07997 = (data)=>$1p1sv.encode((encoder)=>$1p1sv.writeAny(encoder, data));
const $fb93dbba73c73ad7$export$929c279cfec29a23 = (buf)=>$f5RS8.readAny($f5RS8.createDecoder(buf));
const $fb93dbba73c73ad7$export$e87773390ebfdab4 = (bs, N)=>{
    if (N === 0) return bs;
    bs = new Uint8Array(bs);
    bs[0] <<= N;
    for(let i = 1; i < bs.length; i++){
        bs[i - 1] |= bs[i] >>> 8 - N;
        bs[i] <<= N;
    }
    return bs;
};

});
parcelRegister("4ptg7", function(module, exports) {

$parcel$export(module.exports, "isBrowser", () => $33603178ec112d65$export$4e09c449d6c407f7);
$parcel$export(module.exports, "getVariable", () => $33603178ec112d65$export$39fb32ac18db3f88);
$parcel$export(module.exports, "supportsColor", () => $33603178ec112d65$export$fcbe44f5d6fcebd);
/**
 * Isomorphic module to work access the environment (query params, env variables).
 *
 * @module map
 */ 
var $e6DQe = parcelRequire("e6DQe");

var $6rcMi = parcelRequire("6rcMi");

var $3Kxao = parcelRequire("3Kxao");

var $c9Ssm = parcelRequire("c9Ssm");

var $kXTKb = parcelRequire("kXTKb");

var $1JpMU = parcelRequire("1JpMU");
const $33603178ec112d65$export$8ee0fc9ee280b4ee = typeof $1JpMU !== "undefined" && $1JpMU.release && /node|io\.js/.test($1JpMU.release.name) && Object.prototype.toString.call(typeof $1JpMU !== "undefined" ? $1JpMU : 0) === "[object process]";
const $33603178ec112d65$export$4e09c449d6c407f7 = typeof window !== "undefined" && typeof document !== "undefined" && !$33603178ec112d65$export$8ee0fc9ee280b4ee;
const $33603178ec112d65$export$9ac100e40613ea10 = typeof navigator !== "undefined" ? /Mac/.test(navigator.platform) : false;
/**
 * @type {Map<string,string>}
 */ let $33603178ec112d65$var$params;
const $33603178ec112d65$var$args = [];
/* c8 ignore start */ const $33603178ec112d65$var$computeParams = ()=>{
    if ($33603178ec112d65$var$params === undefined) {
        if ($33603178ec112d65$export$8ee0fc9ee280b4ee) {
            $33603178ec112d65$var$params = $e6DQe.create();
            const pargs = $1JpMU.argv;
            let currParamName = null;
            for(let i = 0; i < pargs.length; i++){
                const parg = pargs[i];
                if (parg[0] === "-") {
                    if (currParamName !== null) $33603178ec112d65$var$params.set(currParamName, "");
                    currParamName = parg;
                } else if (currParamName !== null) {
                    $33603178ec112d65$var$params.set(currParamName, parg);
                    currParamName = null;
                } else $33603178ec112d65$var$args.push(parg);
            }
            if (currParamName !== null) $33603178ec112d65$var$params.set(currParamName, "");
        // in ReactNative for example this would not be true (unless connected to the Remote Debugger)
        } else if (typeof location === "object") {
            $33603178ec112d65$var$params = $e6DQe.create(); // eslint-disable-next-line no-undef
            (location.search || "?").slice(1).split("&").forEach((kv)=>{
                if (kv.length !== 0) {
                    const [key, value] = kv.split("=");
                    $33603178ec112d65$var$params.set(`--${$6rcMi.fromCamelCase(key, "-")}`, value);
                    $33603178ec112d65$var$params.set(`-${$6rcMi.fromCamelCase(key, "-")}`, value);
                }
            });
        } else $33603178ec112d65$var$params = $e6DQe.create();
    }
    return $33603178ec112d65$var$params;
};
const $33603178ec112d65$export$3ad523d4e4ddff75 = (name)=>$33603178ec112d65$var$computeParams().has(name);
const $33603178ec112d65$export$ecf541e09a511845 = (name, defaultVal)=>$33603178ec112d65$var$computeParams().get(name) || defaultVal;
const $33603178ec112d65$export$39fb32ac18db3f88 = (name)=>$33603178ec112d65$export$8ee0fc9ee280b4ee ? $3Kxao.undefinedToNull($1JpMU.env[name.toUpperCase()]) : $3Kxao.undefinedToNull($c9Ssm.varStorage.getItem(name));
const $33603178ec112d65$export$137940a4fd07b923 = (name)=>$33603178ec112d65$var$computeParams().get("--" + name) || $33603178ec112d65$export$39fb32ac18db3f88(name);
const $33603178ec112d65$export$41f29dc169f5b0eb = (name)=>$33603178ec112d65$export$3ad523d4e4ddff75("--" + name) || $33603178ec112d65$export$39fb32ac18db3f88(name) !== null;
const $33603178ec112d65$export$d71d1489bc353e92 = $33603178ec112d65$export$41f29dc169f5b0eb("production");
/* c8 ignore next 2 */ const $33603178ec112d65$var$forceColor = $33603178ec112d65$export$8ee0fc9ee280b4ee && $kXTKb.isOneOf(undefined, [
    "true",
    "1",
    "2"
]);
const $33603178ec112d65$export$fcbe44f5d6fcebd = !$33603178ec112d65$export$3ad523d4e4ddff75("no-colors") && (!$33603178ec112d65$export$8ee0fc9ee280b4ee || $1JpMU.stdout.isTTY || $33603178ec112d65$var$forceColor) && (!$33603178ec112d65$export$8ee0fc9ee280b4ee || $33603178ec112d65$export$3ad523d4e4ddff75("color") || $33603178ec112d65$var$forceColor || $33603178ec112d65$export$39fb32ac18db3f88("COLORTERM") !== null || ($33603178ec112d65$export$39fb32ac18db3f88("TERM") || "").includes("color") /* c8 ignore stop */ );

});
parcelRegister("3Kxao", function(module, exports) {

$parcel$export(module.exports, "undefinedToNull", () => $2baf6529470073ea$export$43874719a1af321f);
/**
 * Often used conditions.
 *
 * @module conditions
 */ /**
 * @template T
 * @param {T|null|undefined} v
 * @return {T|null}
 */ /* c8 ignore next */ const $2baf6529470073ea$export$43874719a1af321f = (v)=>v === undefined ? null : v;

});

parcelRegister("c9Ssm", function(module, exports) {

$parcel$export(module.exports, "varStorage", () => $8da09136d3570e06$export$86b84a8d42aa2c65);
/* eslint-env browser */ /**
 * Isomorphic variable storage.
 *
 * Uses LocalStorage in the browser and falls back to in-memory storage.
 *
 * @module storage
 */ /* c8 ignore start */ class $8da09136d3570e06$var$VarStoragePolyfill {
    constructor(){
        this.map = new Map();
    }
    /**
   * @param {string} key
   * @param {any} newValue
   */ setItem(key, newValue) {
        this.map.set(key, newValue);
    }
    /**
   * @param {string} key
   */ getItem(key) {
        return this.map.get(key);
    }
}
/* c8 ignore stop */ /**
 * @type {any}
 */ let $8da09136d3570e06$var$_localStorage = new $8da09136d3570e06$var$VarStoragePolyfill();
let $8da09136d3570e06$var$usePolyfill = true;
/* c8 ignore start */ try {
    // if the same-origin rule is violated, accessing localStorage might thrown an error
    if (typeof localStorage !== "undefined" && localStorage) {
        $8da09136d3570e06$var$_localStorage = localStorage;
        $8da09136d3570e06$var$usePolyfill = false;
    }
} catch (e) {}
const $8da09136d3570e06$export$86b84a8d42aa2c65 = $8da09136d3570e06$var$_localStorage;
const $8da09136d3570e06$export$bd913411069e59d3 = (eventHandler)=>$8da09136d3570e06$var$usePolyfill || addEventListener("storage", /** @type {any} */ eventHandler);
const $8da09136d3570e06$export$ff6a13ad336aa064 = (eventHandler)=>$8da09136d3570e06$var$usePolyfill || removeEventListener("storage", /** @type {any} */ eventHandler);

});

parcelRegister("kXTKb", function(module, exports) {

$parcel$export(module.exports, "callAll", () => $f4348eee9f127866$export$9dd9a52f2dd5b9ce);
$parcel$export(module.exports, "nop", () => $f4348eee9f127866$export$b5f1cfe7b08e6ed5);
$parcel$export(module.exports, "id", () => $f4348eee9f127866$export$d560c7e4a29451c2);
$parcel$export(module.exports, "isOneOf", () => $f4348eee9f127866$export$532a90c0e5e8e48c);
/**
 * Common functions and function call helpers.
 *
 * @module function
 */ 
var $7sfdv = parcelRequire("7sfdv");

var $97qUn = parcelRequire("97qUn");
const $f4348eee9f127866$export$9dd9a52f2dd5b9ce = (fs, args, i = 0)=>{
    try {
        for(; i < fs.length; i++)fs[i](...args);
    } finally{
        if (i < fs.length) $f4348eee9f127866$export$9dd9a52f2dd5b9ce(fs, args, i + 1);
    }
};
const $f4348eee9f127866$export$b5f1cfe7b08e6ed5 = ()=>{};
const $f4348eee9f127866$export$5635d7ef4b8fee1c = (f)=>f();
const $f4348eee9f127866$export$d560c7e4a29451c2 = (a)=>a;
const $f4348eee9f127866$export$bbb1dcf8c6c6bac1 = (a, b)=>a === b;
const $f4348eee9f127866$export$6ca82605a98f2278 = (a, b)=>a === b || a != null && b != null && a.constructor === b.constructor && ($7sfdv.isArray(a) && $7sfdv.equalFlat(a, /** @type {Array<T>} */ b) || typeof a === "object" && $97qUn.equalFlat(a, b));
const $f4348eee9f127866$export$2ca9a723affd5d11 = (a, b)=>{
    if (a == null || b == null) return $f4348eee9f127866$export$bbb1dcf8c6c6bac1(a, b);
    if (a.constructor !== b.constructor) return false;
    if (a === b) return true;
    switch(a.constructor){
        case ArrayBuffer:
            a = new Uint8Array(a);
            b = new Uint8Array(b);
        // eslint-disable-next-line no-fallthrough
        case Uint8Array:
            if (a.byteLength !== b.byteLength) return false;
            for(let i = 0; i < a.length; i++){
                if (a[i] !== b[i]) return false;
            }
            break;
        case Set:
            if (a.size !== b.size) return false;
            for (const value of a){
                if (!b.has(value)) return false;
            }
            break;
        case Map:
            if (a.size !== b.size) return false;
            for (const key of a.keys()){
                if (!b.has(key) || !$f4348eee9f127866$export$2ca9a723affd5d11(a.get(key), b.get(key))) return false;
            }
            break;
        case Object:
            if ($97qUn.length(a) !== $97qUn.length(b)) return false;
            for(const key in a){
                if (!$97qUn.hasProperty(a, key) || !$f4348eee9f127866$export$2ca9a723affd5d11(a[key], b[key])) return false;
            }
            break;
        case Array:
            if (a.length !== b.length) return false;
            for(let i = 0; i < a.length; i++){
                if (!$f4348eee9f127866$export$2ca9a723affd5d11(a[i], b[i])) return false;
            }
            break;
        default:
            return false;
    }
    return true;
};
const $f4348eee9f127866$export$532a90c0e5e8e48c = (value, options)=>options.includes(value);
const $f4348eee9f127866$export$43bee75e5e14138e = $7sfdv.isArray;
const $f4348eee9f127866$export$844ec244b1367d54 = (s)=>s && s.constructor === String;
const $f4348eee9f127866$export$7e4aa119212bc614 = (n)=>n != null && n.constructor === Number;
const $f4348eee9f127866$export$226b3eccf92c9ed9 = (n, T)=>n && n.constructor === T;
const $f4348eee9f127866$export$6306e0d85c68df69 = (T)=>/**
   * @param {any} n
   * @return {n is InstanceType<TYPE>}
   **/ (n)=>n && n.constructor === T;

});
parcelRegister("97qUn", function(module, exports) {

$parcel$export(module.exports, "assign", () => $6a39a3edb45f063a$export$e6e34fd1f2686227);
$parcel$export(module.exports, "forEach", () => $6a39a3edb45f063a$export$4b80e395e36b5a56);
$parcel$export(module.exports, "length", () => $6a39a3edb45f063a$export$f24224f1c91d8156);
$parcel$export(module.exports, "isEmpty", () => $6a39a3edb45f063a$export$dd1bc94b04021eeb);
$parcel$export(module.exports, "hasProperty", () => $6a39a3edb45f063a$export$bf9617eaf5d2451);
$parcel$export(module.exports, "equalFlat", () => $6a39a3edb45f063a$export$4f1c34abb2bb4c8);
/**
 * Utility functions for working with EcmaScript objects.
 *
 * @module object
 */ /**
 * @return {Object<string,any>} obj
 */ const $6a39a3edb45f063a$export$185802fd694ee1f5 = ()=>Object.create(null);
const $6a39a3edb45f063a$export$e6e34fd1f2686227 = Object.assign;
const $6a39a3edb45f063a$export$ed97f33186d4b816 = Object.keys;
const $6a39a3edb45f063a$export$4b80e395e36b5a56 = (obj, f)=>{
    for(const key in obj)f(obj[key], key);
};
const $6a39a3edb45f063a$export$871de8747c9eaa88 = (obj, f)=>{
    const results = [];
    for(const key in obj)results.push(f(obj[key], key));
    return results;
};
const $6a39a3edb45f063a$export$f24224f1c91d8156 = (obj)=>$6a39a3edb45f063a$export$ed97f33186d4b816(obj).length;
const $6a39a3edb45f063a$export$ad14ef4001db2bcd = (obj, f)=>{
    for(const key in obj){
        if (f(obj[key], key)) return true;
    }
    return false;
};
const $6a39a3edb45f063a$export$dd1bc94b04021eeb = (obj)=>{
    // eslint-disable-next-line
    for(const _k in obj)return false;
    return true;
};
const $6a39a3edb45f063a$export$7ecc1a3b11b57dab = (obj, f)=>{
    for(const key in obj){
        if (!f(obj[key], key)) return false;
    }
    return true;
};
const $6a39a3edb45f063a$export$bf9617eaf5d2451 = (obj, key)=>Object.prototype.hasOwnProperty.call(obj, key);
const $6a39a3edb45f063a$export$4f1c34abb2bb4c8 = (a, b)=>a === b || $6a39a3edb45f063a$export$f24224f1c91d8156(a) === $6a39a3edb45f063a$export$f24224f1c91d8156(b) && $6a39a3edb45f063a$export$7ecc1a3b11b57dab(a, (val, key)=>(val !== undefined || $6a39a3edb45f063a$export$bf9617eaf5d2451(b, key)) && b[key] === val);

});


parcelRegister("1JpMU", function(module, exports) {
// shim for using process in browser
var $142dff520ad2eddd$var$process = module.exports = {};
// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.
var $142dff520ad2eddd$var$cachedSetTimeout;
var $142dff520ad2eddd$var$cachedClearTimeout;
function $142dff520ad2eddd$var$defaultSetTimout() {
    throw new Error("setTimeout has not been defined");
}
function $142dff520ad2eddd$var$defaultClearTimeout() {
    throw new Error("clearTimeout has not been defined");
}
(function() {
    try {
        if (typeof setTimeout === "function") $142dff520ad2eddd$var$cachedSetTimeout = setTimeout;
        else $142dff520ad2eddd$var$cachedSetTimeout = $142dff520ad2eddd$var$defaultSetTimout;
    } catch (e) {
        $142dff520ad2eddd$var$cachedSetTimeout = $142dff520ad2eddd$var$defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === "function") $142dff520ad2eddd$var$cachedClearTimeout = clearTimeout;
        else $142dff520ad2eddd$var$cachedClearTimeout = $142dff520ad2eddd$var$defaultClearTimeout;
    } catch (e) {
        $142dff520ad2eddd$var$cachedClearTimeout = $142dff520ad2eddd$var$defaultClearTimeout;
    }
})();
function $142dff520ad2eddd$var$runTimeout(fun) {
    if ($142dff520ad2eddd$var$cachedSetTimeout === setTimeout) //normal enviroments in sane situations
    return setTimeout(fun, 0);
    // if setTimeout wasn't available but was latter defined
    if (($142dff520ad2eddd$var$cachedSetTimeout === $142dff520ad2eddd$var$defaultSetTimout || !$142dff520ad2eddd$var$cachedSetTimeout) && setTimeout) {
        $142dff520ad2eddd$var$cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return $142dff520ad2eddd$var$cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return $142dff520ad2eddd$var$cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return $142dff520ad2eddd$var$cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function $142dff520ad2eddd$var$runClearTimeout(marker) {
    if ($142dff520ad2eddd$var$cachedClearTimeout === clearTimeout) //normal enviroments in sane situations
    return clearTimeout(marker);
    // if clearTimeout wasn't available but was latter defined
    if (($142dff520ad2eddd$var$cachedClearTimeout === $142dff520ad2eddd$var$defaultClearTimeout || !$142dff520ad2eddd$var$cachedClearTimeout) && clearTimeout) {
        $142dff520ad2eddd$var$cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return $142dff520ad2eddd$var$cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return $142dff520ad2eddd$var$cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return $142dff520ad2eddd$var$cachedClearTimeout.call(this, marker);
        }
    }
}
var $142dff520ad2eddd$var$queue = [];
var $142dff520ad2eddd$var$draining = false;
var $142dff520ad2eddd$var$currentQueue;
var $142dff520ad2eddd$var$queueIndex = -1;
function $142dff520ad2eddd$var$cleanUpNextTick() {
    if (!$142dff520ad2eddd$var$draining || !$142dff520ad2eddd$var$currentQueue) return;
    $142dff520ad2eddd$var$draining = false;
    if ($142dff520ad2eddd$var$currentQueue.length) $142dff520ad2eddd$var$queue = $142dff520ad2eddd$var$currentQueue.concat($142dff520ad2eddd$var$queue);
    else $142dff520ad2eddd$var$queueIndex = -1;
    if ($142dff520ad2eddd$var$queue.length) $142dff520ad2eddd$var$drainQueue();
}
function $142dff520ad2eddd$var$drainQueue() {
    if ($142dff520ad2eddd$var$draining) return;
    var timeout = $142dff520ad2eddd$var$runTimeout($142dff520ad2eddd$var$cleanUpNextTick);
    $142dff520ad2eddd$var$draining = true;
    var len = $142dff520ad2eddd$var$queue.length;
    while(len){
        $142dff520ad2eddd$var$currentQueue = $142dff520ad2eddd$var$queue;
        $142dff520ad2eddd$var$queue = [];
        while(++$142dff520ad2eddd$var$queueIndex < len)if ($142dff520ad2eddd$var$currentQueue) $142dff520ad2eddd$var$currentQueue[$142dff520ad2eddd$var$queueIndex].run();
        $142dff520ad2eddd$var$queueIndex = -1;
        len = $142dff520ad2eddd$var$queue.length;
    }
    $142dff520ad2eddd$var$currentQueue = null;
    $142dff520ad2eddd$var$draining = false;
    $142dff520ad2eddd$var$runClearTimeout(timeout);
}
$142dff520ad2eddd$var$process.nextTick = function(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) for(var i = 1; i < arguments.length; i++)args[i - 1] = arguments[i];
    $142dff520ad2eddd$var$queue.push(new $142dff520ad2eddd$var$Item(fun, args));
    if ($142dff520ad2eddd$var$queue.length === 1 && !$142dff520ad2eddd$var$draining) $142dff520ad2eddd$var$runTimeout($142dff520ad2eddd$var$drainQueue);
};
// v8 likes predictible objects
function $142dff520ad2eddd$var$Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
$142dff520ad2eddd$var$Item.prototype.run = function() {
    this.fun.apply(null, this.array);
};
$142dff520ad2eddd$var$process.title = "browser";
$142dff520ad2eddd$var$process.browser = true;
$142dff520ad2eddd$var$process.env = {};
$142dff520ad2eddd$var$process.argv = [];
$142dff520ad2eddd$var$process.version = ""; // empty string to avoid regexp issues
$142dff520ad2eddd$var$process.versions = {};
function $142dff520ad2eddd$var$noop() {}
$142dff520ad2eddd$var$process.on = $142dff520ad2eddd$var$noop;
$142dff520ad2eddd$var$process.addListener = $142dff520ad2eddd$var$noop;
$142dff520ad2eddd$var$process.once = $142dff520ad2eddd$var$noop;
$142dff520ad2eddd$var$process.off = $142dff520ad2eddd$var$noop;
$142dff520ad2eddd$var$process.removeListener = $142dff520ad2eddd$var$noop;
$142dff520ad2eddd$var$process.removeAllListeners = $142dff520ad2eddd$var$noop;
$142dff520ad2eddd$var$process.emit = $142dff520ad2eddd$var$noop;
$142dff520ad2eddd$var$process.prependListener = $142dff520ad2eddd$var$noop;
$142dff520ad2eddd$var$process.prependOnceListener = $142dff520ad2eddd$var$noop;
$142dff520ad2eddd$var$process.listeners = function(name) {
    return [];
};
$142dff520ad2eddd$var$process.binding = function(name) {
    throw new Error("process.binding is not supported");
};
$142dff520ad2eddd$var$process.cwd = function() {
    return "/";
};
$142dff520ad2eddd$var$process.chdir = function(dir) {
    throw new Error("process.chdir is not supported");
};
$142dff520ad2eddd$var$process.umask = function() {
    return 0;
};

});


parcelRegister("9gCdk", function(module, exports) {

$parcel$export(module.exports, "Buffer", () => $6bf340299440ff4e$export$a143d493d941bafc, (v) => $6bf340299440ff4e$export$a143d493d941bafc = v);
$parcel$export(module.exports, "INSPECT_MAX_BYTES", () => $6bf340299440ff4e$export$f99ded8fe4b79145, (v) => $6bf340299440ff4e$export$f99ded8fe4b79145 = v);
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */ /* eslint-disable no-proto */ var $6bf340299440ff4e$export$a143d493d941bafc;
var $6bf340299440ff4e$export$e4cf37d7f6fb9e0a;
var $6bf340299440ff4e$export$f99ded8fe4b79145;
var $6bf340299440ff4e$export$599f31c3813fae4d;
"use strict";

var $8J35Z = parcelRequire("8J35Z");

var $iApRP = parcelRequire("iApRP");
const $6bf340299440ff4e$var$customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" // eslint-disable-line dot-notation
 ? Symbol["for"]("nodejs.util.inspect.custom") // eslint-disable-line dot-notation
 : null;
$6bf340299440ff4e$export$a143d493d941bafc = $6bf340299440ff4e$var$Buffer;
$6bf340299440ff4e$export$e4cf37d7f6fb9e0a = $6bf340299440ff4e$var$SlowBuffer;
$6bf340299440ff4e$export$f99ded8fe4b79145 = 50;
const $6bf340299440ff4e$var$K_MAX_LENGTH = 0x7fffffff;
$6bf340299440ff4e$export$599f31c3813fae4d = $6bf340299440ff4e$var$K_MAX_LENGTH;
/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */ $6bf340299440ff4e$var$Buffer.TYPED_ARRAY_SUPPORT = $6bf340299440ff4e$var$typedArraySupport();
if (!$6bf340299440ff4e$var$Buffer.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
function $6bf340299440ff4e$var$typedArraySupport() {
    // Can typed array instances can be augmented?
    try {
        const arr = new Uint8Array(1);
        const proto = {
            foo: function() {
                return 42;
            }
        };
        Object.setPrototypeOf(proto, Uint8Array.prototype);
        Object.setPrototypeOf(arr, proto);
        return arr.foo() === 42;
    } catch (e) {
        return false;
    }
}
Object.defineProperty($6bf340299440ff4e$var$Buffer.prototype, "parent", {
    enumerable: true,
    get: function() {
        if (!$6bf340299440ff4e$var$Buffer.isBuffer(this)) return undefined;
        return this.buffer;
    }
});
Object.defineProperty($6bf340299440ff4e$var$Buffer.prototype, "offset", {
    enumerable: true,
    get: function() {
        if (!$6bf340299440ff4e$var$Buffer.isBuffer(this)) return undefined;
        return this.byteOffset;
    }
});
function $6bf340299440ff4e$var$createBuffer(length) {
    if (length > $6bf340299440ff4e$var$K_MAX_LENGTH) throw new RangeError('The value "' + length + '" is invalid for option "size"');
    // Return an augmented `Uint8Array` instance
    const buf = new Uint8Array(length);
    Object.setPrototypeOf(buf, $6bf340299440ff4e$var$Buffer.prototype);
    return buf;
}
/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */ function $6bf340299440ff4e$var$Buffer(arg, encodingOrOffset, length) {
    // Common case.
    if (typeof arg === "number") {
        if (typeof encodingOrOffset === "string") throw new TypeError('The "string" argument must be of type string. Received type number');
        return $6bf340299440ff4e$var$allocUnsafe(arg);
    }
    return $6bf340299440ff4e$var$from(arg, encodingOrOffset, length);
}
$6bf340299440ff4e$var$Buffer.poolSize = 8192 // not used by this implementation
;
function $6bf340299440ff4e$var$from(value, encodingOrOffset, length) {
    if (typeof value === "string") return $6bf340299440ff4e$var$fromString(value, encodingOrOffset);
    if (ArrayBuffer.isView(value)) return $6bf340299440ff4e$var$fromArrayView(value);
    if (value == null) throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
    if ($6bf340299440ff4e$var$isInstance(value, ArrayBuffer) || value && $6bf340299440ff4e$var$isInstance(value.buffer, ArrayBuffer)) return $6bf340299440ff4e$var$fromArrayBuffer(value, encodingOrOffset, length);
    if (typeof SharedArrayBuffer !== "undefined" && ($6bf340299440ff4e$var$isInstance(value, SharedArrayBuffer) || value && $6bf340299440ff4e$var$isInstance(value.buffer, SharedArrayBuffer))) return $6bf340299440ff4e$var$fromArrayBuffer(value, encodingOrOffset, length);
    if (typeof value === "number") throw new TypeError('The "value" argument must not be of type number. Received type number');
    const valueOf = value.valueOf && value.valueOf();
    if (valueOf != null && valueOf !== value) return $6bf340299440ff4e$var$Buffer.from(valueOf, encodingOrOffset, length);
    const b = $6bf340299440ff4e$var$fromObject(value);
    if (b) return b;
    if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") return $6bf340299440ff4e$var$Buffer.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
    throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
}
/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/ $6bf340299440ff4e$var$Buffer.from = function(value, encodingOrOffset, length) {
    return $6bf340299440ff4e$var$from(value, encodingOrOffset, length);
};
// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Object.setPrototypeOf($6bf340299440ff4e$var$Buffer.prototype, Uint8Array.prototype);
Object.setPrototypeOf($6bf340299440ff4e$var$Buffer, Uint8Array);
function $6bf340299440ff4e$var$assertSize(size) {
    if (typeof size !== "number") throw new TypeError('"size" argument must be of type number');
    else if (size < 0) throw new RangeError('The value "' + size + '" is invalid for option "size"');
}
function $6bf340299440ff4e$var$alloc(size, fill, encoding) {
    $6bf340299440ff4e$var$assertSize(size);
    if (size <= 0) return $6bf340299440ff4e$var$createBuffer(size);
    if (fill !== undefined) // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpreted as a start offset.
    return typeof encoding === "string" ? $6bf340299440ff4e$var$createBuffer(size).fill(fill, encoding) : $6bf340299440ff4e$var$createBuffer(size).fill(fill);
    return $6bf340299440ff4e$var$createBuffer(size);
}
/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/ $6bf340299440ff4e$var$Buffer.alloc = function(size, fill, encoding) {
    return $6bf340299440ff4e$var$alloc(size, fill, encoding);
};
function $6bf340299440ff4e$var$allocUnsafe(size) {
    $6bf340299440ff4e$var$assertSize(size);
    return $6bf340299440ff4e$var$createBuffer(size < 0 ? 0 : $6bf340299440ff4e$var$checked(size) | 0);
}
/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */ $6bf340299440ff4e$var$Buffer.allocUnsafe = function(size) {
    return $6bf340299440ff4e$var$allocUnsafe(size);
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */ $6bf340299440ff4e$var$Buffer.allocUnsafeSlow = function(size) {
    return $6bf340299440ff4e$var$allocUnsafe(size);
};
function $6bf340299440ff4e$var$fromString(string, encoding) {
    if (typeof encoding !== "string" || encoding === "") encoding = "utf8";
    if (!$6bf340299440ff4e$var$Buffer.isEncoding(encoding)) throw new TypeError("Unknown encoding: " + encoding);
    const length = $6bf340299440ff4e$var$byteLength(string, encoding) | 0;
    let buf = $6bf340299440ff4e$var$createBuffer(length);
    const actual = buf.write(string, encoding);
    if (actual !== length) // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual);
    return buf;
}
function $6bf340299440ff4e$var$fromArrayLike(array) {
    const length = array.length < 0 ? 0 : $6bf340299440ff4e$var$checked(array.length) | 0;
    const buf = $6bf340299440ff4e$var$createBuffer(length);
    for(let i = 0; i < length; i += 1)buf[i] = array[i] & 255;
    return buf;
}
function $6bf340299440ff4e$var$fromArrayView(arrayView) {
    if ($6bf340299440ff4e$var$isInstance(arrayView, Uint8Array)) {
        const copy = new Uint8Array(arrayView);
        return $6bf340299440ff4e$var$fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
    }
    return $6bf340299440ff4e$var$fromArrayLike(arrayView);
}
function $6bf340299440ff4e$var$fromArrayBuffer(array, byteOffset, length) {
    if (byteOffset < 0 || array.byteLength < byteOffset) throw new RangeError('"offset" is outside of buffer bounds');
    if (array.byteLength < byteOffset + (length || 0)) throw new RangeError('"length" is outside of buffer bounds');
    let buf;
    if (byteOffset === undefined && length === undefined) buf = new Uint8Array(array);
    else if (length === undefined) buf = new Uint8Array(array, byteOffset);
    else buf = new Uint8Array(array, byteOffset, length);
    // Return an augmented `Uint8Array` instance
    Object.setPrototypeOf(buf, $6bf340299440ff4e$var$Buffer.prototype);
    return buf;
}
function $6bf340299440ff4e$var$fromObject(obj) {
    if ($6bf340299440ff4e$var$Buffer.isBuffer(obj)) {
        const len = $6bf340299440ff4e$var$checked(obj.length) | 0;
        const buf = $6bf340299440ff4e$var$createBuffer(len);
        if (buf.length === 0) return buf;
        obj.copy(buf, 0, 0, len);
        return buf;
    }
    if (obj.length !== undefined) {
        if (typeof obj.length !== "number" || $6bf340299440ff4e$var$numberIsNaN(obj.length)) return $6bf340299440ff4e$var$createBuffer(0);
        return $6bf340299440ff4e$var$fromArrayLike(obj);
    }
    if (obj.type === "Buffer" && Array.isArray(obj.data)) return $6bf340299440ff4e$var$fromArrayLike(obj.data);
}
function $6bf340299440ff4e$var$checked(length) {
    // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
    // length is NaN (which is otherwise coerced to zero.)
    if (length >= $6bf340299440ff4e$var$K_MAX_LENGTH) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + $6bf340299440ff4e$var$K_MAX_LENGTH.toString(16) + " bytes");
    return length | 0;
}
function $6bf340299440ff4e$var$SlowBuffer(length) {
    if (+length != length) length = 0;
    return $6bf340299440ff4e$var$Buffer.alloc(+length);
}
$6bf340299440ff4e$var$Buffer.isBuffer = function isBuffer(b) {
    return b != null && b._isBuffer === true && b !== $6bf340299440ff4e$var$Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
    ;
};
$6bf340299440ff4e$var$Buffer.compare = function compare(a, b) {
    if ($6bf340299440ff4e$var$isInstance(a, Uint8Array)) a = $6bf340299440ff4e$var$Buffer.from(a, a.offset, a.byteLength);
    if ($6bf340299440ff4e$var$isInstance(b, Uint8Array)) b = $6bf340299440ff4e$var$Buffer.from(b, b.offset, b.byteLength);
    if (!$6bf340299440ff4e$var$Buffer.isBuffer(a) || !$6bf340299440ff4e$var$Buffer.isBuffer(b)) throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
    if (a === b) return 0;
    let x = a.length;
    let y = b.length;
    for(let i = 0, len = Math.min(x, y); i < len; ++i)if (a[i] !== b[i]) {
        x = a[i];
        y = b[i];
        break;
    }
    if (x < y) return -1;
    if (y < x) return 1;
    return 0;
};
$6bf340299440ff4e$var$Buffer.isEncoding = function isEncoding(encoding) {
    switch(String(encoding).toLowerCase()){
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
            return true;
        default:
            return false;
    }
};
$6bf340299440ff4e$var$Buffer.concat = function concat(list, length) {
    if (!Array.isArray(list)) throw new TypeError('"list" argument must be an Array of Buffers');
    if (list.length === 0) return $6bf340299440ff4e$var$Buffer.alloc(0);
    let i;
    if (length === undefined) {
        length = 0;
        for(i = 0; i < list.length; ++i)length += list[i].length;
    }
    const buffer = $6bf340299440ff4e$var$Buffer.allocUnsafe(length);
    let pos = 0;
    for(i = 0; i < list.length; ++i){
        let buf = list[i];
        if ($6bf340299440ff4e$var$isInstance(buf, Uint8Array)) {
            if (pos + buf.length > buffer.length) {
                if (!$6bf340299440ff4e$var$Buffer.isBuffer(buf)) buf = $6bf340299440ff4e$var$Buffer.from(buf);
                buf.copy(buffer, pos);
            } else Uint8Array.prototype.set.call(buffer, buf, pos);
        } else if (!$6bf340299440ff4e$var$Buffer.isBuffer(buf)) throw new TypeError('"list" argument must be an Array of Buffers');
        else buf.copy(buffer, pos);
        pos += buf.length;
    }
    return buffer;
};
function $6bf340299440ff4e$var$byteLength(string, encoding) {
    if ($6bf340299440ff4e$var$Buffer.isBuffer(string)) return string.length;
    if (ArrayBuffer.isView(string) || $6bf340299440ff4e$var$isInstance(string, ArrayBuffer)) return string.byteLength;
    if (typeof string !== "string") throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string);
    const len = string.length;
    const mustMatch = arguments.length > 2 && arguments[2] === true;
    if (!mustMatch && len === 0) return 0;
    // Use a for loop to avoid recursion
    let loweredCase = false;
    for(;;)switch(encoding){
        case "ascii":
        case "latin1":
        case "binary":
            return len;
        case "utf8":
        case "utf-8":
            return $6bf340299440ff4e$var$utf8ToBytes(string).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
            return len * 2;
        case "hex":
            return len >>> 1;
        case "base64":
            return $6bf340299440ff4e$var$base64ToBytes(string).length;
        default:
            if (loweredCase) return mustMatch ? -1 : $6bf340299440ff4e$var$utf8ToBytes(string).length // assume utf8
            ;
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
    }
}
$6bf340299440ff4e$var$Buffer.byteLength = $6bf340299440ff4e$var$byteLength;
function $6bf340299440ff4e$var$slowToString(encoding, start, end) {
    let loweredCase = false;
    // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
    // property of a typed array.
    // This behaves neither like String nor Uint8Array in that we set start/end
    // to their upper/lower bounds if the value passed is out of range.
    // undefined is handled specially as per ECMA-262 6th Edition,
    // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
    if (start === undefined || start < 0) start = 0;
    // Return early if start > this.length. Done here to prevent potential uint32
    // coercion fail below.
    if (start > this.length) return "";
    if (end === undefined || end > this.length) end = this.length;
    if (end <= 0) return "";
    // Force coercion to uint32. This will also coerce falsey/NaN values to 0.
    end >>>= 0;
    start >>>= 0;
    if (end <= start) return "";
    if (!encoding) encoding = "utf8";
    while(true)switch(encoding){
        case "hex":
            return $6bf340299440ff4e$var$hexSlice(this, start, end);
        case "utf8":
        case "utf-8":
            return $6bf340299440ff4e$var$utf8Slice(this, start, end);
        case "ascii":
            return $6bf340299440ff4e$var$asciiSlice(this, start, end);
        case "latin1":
        case "binary":
            return $6bf340299440ff4e$var$latin1Slice(this, start, end);
        case "base64":
            return $6bf340299440ff4e$var$base64Slice(this, start, end);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
            return $6bf340299440ff4e$var$utf16leSlice(this, start, end);
        default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = (encoding + "").toLowerCase();
            loweredCase = true;
    }
}
// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
$6bf340299440ff4e$var$Buffer.prototype._isBuffer = true;
function $6bf340299440ff4e$var$swap(b, n, m) {
    const i = b[n];
    b[n] = b[m];
    b[m] = i;
}
$6bf340299440ff4e$var$Buffer.prototype.swap16 = function swap16() {
    const len = this.length;
    if (len % 2 !== 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
    for(let i = 0; i < len; i += 2)$6bf340299440ff4e$var$swap(this, i, i + 1);
    return this;
};
$6bf340299440ff4e$var$Buffer.prototype.swap32 = function swap32() {
    const len = this.length;
    if (len % 4 !== 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
    for(let i = 0; i < len; i += 4){
        $6bf340299440ff4e$var$swap(this, i, i + 3);
        $6bf340299440ff4e$var$swap(this, i + 1, i + 2);
    }
    return this;
};
$6bf340299440ff4e$var$Buffer.prototype.swap64 = function swap64() {
    const len = this.length;
    if (len % 8 !== 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
    for(let i = 0; i < len; i += 8){
        $6bf340299440ff4e$var$swap(this, i, i + 7);
        $6bf340299440ff4e$var$swap(this, i + 1, i + 6);
        $6bf340299440ff4e$var$swap(this, i + 2, i + 5);
        $6bf340299440ff4e$var$swap(this, i + 3, i + 4);
    }
    return this;
};
$6bf340299440ff4e$var$Buffer.prototype.toString = function toString() {
    const length = this.length;
    if (length === 0) return "";
    if (arguments.length === 0) return $6bf340299440ff4e$var$utf8Slice(this, 0, length);
    return $6bf340299440ff4e$var$slowToString.apply(this, arguments);
};
$6bf340299440ff4e$var$Buffer.prototype.toLocaleString = $6bf340299440ff4e$var$Buffer.prototype.toString;
$6bf340299440ff4e$var$Buffer.prototype.equals = function equals(b) {
    if (!$6bf340299440ff4e$var$Buffer.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
    if (this === b) return true;
    return $6bf340299440ff4e$var$Buffer.compare(this, b) === 0;
};
$6bf340299440ff4e$var$Buffer.prototype.inspect = function inspect() {
    let str = "";
    const max = $6bf340299440ff4e$export$f99ded8fe4b79145;
    str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
    if (this.length > max) str += " ... ";
    return "<Buffer " + str + ">";
};
if ($6bf340299440ff4e$var$customInspectSymbol) $6bf340299440ff4e$var$Buffer.prototype[$6bf340299440ff4e$var$customInspectSymbol] = $6bf340299440ff4e$var$Buffer.prototype.inspect;
$6bf340299440ff4e$var$Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
    if ($6bf340299440ff4e$var$isInstance(target, Uint8Array)) target = $6bf340299440ff4e$var$Buffer.from(target, target.offset, target.byteLength);
    if (!$6bf340299440ff4e$var$Buffer.isBuffer(target)) throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target);
    if (start === undefined) start = 0;
    if (end === undefined) end = target ? target.length : 0;
    if (thisStart === undefined) thisStart = 0;
    if (thisEnd === undefined) thisEnd = this.length;
    if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) throw new RangeError("out of range index");
    if (thisStart >= thisEnd && start >= end) return 0;
    if (thisStart >= thisEnd) return -1;
    if (start >= end) return 1;
    start >>>= 0;
    end >>>= 0;
    thisStart >>>= 0;
    thisEnd >>>= 0;
    if (this === target) return 0;
    let x = thisEnd - thisStart;
    let y = end - start;
    const len = Math.min(x, y);
    const thisCopy = this.slice(thisStart, thisEnd);
    const targetCopy = target.slice(start, end);
    for(let i = 0; i < len; ++i)if (thisCopy[i] !== targetCopy[i]) {
        x = thisCopy[i];
        y = targetCopy[i];
        break;
    }
    if (x < y) return -1;
    if (y < x) return 1;
    return 0;
};
// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function $6bf340299440ff4e$var$bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
    // Empty buffer means no match
    if (buffer.length === 0) return -1;
    // Normalize byteOffset
    if (typeof byteOffset === "string") {
        encoding = byteOffset;
        byteOffset = 0;
    } else if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff;
    else if (byteOffset < -2147483648) byteOffset = -2147483648;
    byteOffset = +byteOffset // Coerce to Number.
    ;
    if ($6bf340299440ff4e$var$numberIsNaN(byteOffset)) // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : buffer.length - 1;
    // Normalize byteOffset: negative offsets start from the end of the buffer
    if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
    if (byteOffset >= buffer.length) {
        if (dir) return -1;
        else byteOffset = buffer.length - 1;
    } else if (byteOffset < 0) {
        if (dir) byteOffset = 0;
        else return -1;
    }
    // Normalize val
    if (typeof val === "string") val = $6bf340299440ff4e$var$Buffer.from(val, encoding);
    // Finally, search either indexOf (if dir is true) or lastIndexOf
    if ($6bf340299440ff4e$var$Buffer.isBuffer(val)) {
        // Special case: looking for empty string/buffer always fails
        if (val.length === 0) return -1;
        return $6bf340299440ff4e$var$arrayIndexOf(buffer, val, byteOffset, encoding, dir);
    } else if (typeof val === "number") {
        val = val & 0xFF // Search for a byte value [0-255]
        ;
        if (typeof Uint8Array.prototype.indexOf === "function") {
            if (dir) return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
            else return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
        }
        return $6bf340299440ff4e$var$arrayIndexOf(buffer, [
            val
        ], byteOffset, encoding, dir);
    }
    throw new TypeError("val must be string, number or Buffer");
}
function $6bf340299440ff4e$var$arrayIndexOf(arr, val, byteOffset, encoding, dir) {
    let indexSize = 1;
    let arrLength = arr.length;
    let valLength = val.length;
    if (encoding !== undefined) {
        encoding = String(encoding).toLowerCase();
        if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
            if (arr.length < 2 || val.length < 2) return -1;
            indexSize = 2;
            arrLength /= 2;
            valLength /= 2;
            byteOffset /= 2;
        }
    }
    function read(buf, i) {
        if (indexSize === 1) return buf[i];
        else return buf.readUInt16BE(i * indexSize);
    }
    let i;
    if (dir) {
        let foundIndex = -1;
        for(i = byteOffset; i < arrLength; i++)if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
            if (foundIndex === -1) foundIndex = i;
            if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
        } else {
            if (foundIndex !== -1) i -= i - foundIndex;
            foundIndex = -1;
        }
    } else {
        if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
        for(i = byteOffset; i >= 0; i--){
            let found = true;
            for(let j = 0; j < valLength; j++)if (read(arr, i + j) !== read(val, j)) {
                found = false;
                break;
            }
            if (found) return i;
        }
    }
    return -1;
}
$6bf340299440ff4e$var$Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
    return this.indexOf(val, byteOffset, encoding) !== -1;
};
$6bf340299440ff4e$var$Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
    return $6bf340299440ff4e$var$bidirectionalIndexOf(this, val, byteOffset, encoding, true);
};
$6bf340299440ff4e$var$Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
    return $6bf340299440ff4e$var$bidirectionalIndexOf(this, val, byteOffset, encoding, false);
};
function $6bf340299440ff4e$var$hexWrite(buf, string, offset, length) {
    offset = Number(offset) || 0;
    const remaining = buf.length - offset;
    if (!length) length = remaining;
    else {
        length = Number(length);
        if (length > remaining) length = remaining;
    }
    const strLen = string.length;
    if (length > strLen / 2) length = strLen / 2;
    let i;
    for(i = 0; i < length; ++i){
        const parsed = parseInt(string.substr(i * 2, 2), 16);
        if ($6bf340299440ff4e$var$numberIsNaN(parsed)) return i;
        buf[offset + i] = parsed;
    }
    return i;
}
function $6bf340299440ff4e$var$utf8Write(buf, string, offset, length) {
    return $6bf340299440ff4e$var$blitBuffer($6bf340299440ff4e$var$utf8ToBytes(string, buf.length - offset), buf, offset, length);
}
function $6bf340299440ff4e$var$asciiWrite(buf, string, offset, length) {
    return $6bf340299440ff4e$var$blitBuffer($6bf340299440ff4e$var$asciiToBytes(string), buf, offset, length);
}
function $6bf340299440ff4e$var$base64Write(buf, string, offset, length) {
    return $6bf340299440ff4e$var$blitBuffer($6bf340299440ff4e$var$base64ToBytes(string), buf, offset, length);
}
function $6bf340299440ff4e$var$ucs2Write(buf, string, offset, length) {
    return $6bf340299440ff4e$var$blitBuffer($6bf340299440ff4e$var$utf16leToBytes(string, buf.length - offset), buf, offset, length);
}
$6bf340299440ff4e$var$Buffer.prototype.write = function write(string, offset, length, encoding) {
    // Buffer#write(string)
    if (offset === undefined) {
        encoding = "utf8";
        length = this.length;
        offset = 0;
    // Buffer#write(string, encoding)
    } else if (length === undefined && typeof offset === "string") {
        encoding = offset;
        length = this.length;
        offset = 0;
    // Buffer#write(string, offset[, length][, encoding])
    } else if (isFinite(offset)) {
        offset = offset >>> 0;
        if (isFinite(length)) {
            length = length >>> 0;
            if (encoding === undefined) encoding = "utf8";
        } else {
            encoding = length;
            length = undefined;
        }
    } else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
    const remaining = this.length - offset;
    if (length === undefined || length > remaining) length = remaining;
    if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) throw new RangeError("Attempt to write outside buffer bounds");
    if (!encoding) encoding = "utf8";
    let loweredCase = false;
    for(;;)switch(encoding){
        case "hex":
            return $6bf340299440ff4e$var$hexWrite(this, string, offset, length);
        case "utf8":
        case "utf-8":
            return $6bf340299440ff4e$var$utf8Write(this, string, offset, length);
        case "ascii":
        case "latin1":
        case "binary":
            return $6bf340299440ff4e$var$asciiWrite(this, string, offset, length);
        case "base64":
            // Warning: maxLength not taken into account in base64Write
            return $6bf340299440ff4e$var$base64Write(this, string, offset, length);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
            return $6bf340299440ff4e$var$ucs2Write(this, string, offset, length);
        default:
            if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
    }
};
$6bf340299440ff4e$var$Buffer.prototype.toJSON = function toJSON() {
    return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
    };
};
function $6bf340299440ff4e$var$base64Slice(buf, start, end) {
    if (start === 0 && end === buf.length) return $8J35Z.fromByteArray(buf);
    else return $8J35Z.fromByteArray(buf.slice(start, end));
}
function $6bf340299440ff4e$var$utf8Slice(buf, start, end) {
    end = Math.min(buf.length, end);
    const res = [];
    let i = start;
    while(i < end){
        const firstByte = buf[i];
        let codePoint = null;
        let bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;
        if (i + bytesPerSequence <= end) {
            let secondByte, thirdByte, fourthByte, tempCodePoint;
            switch(bytesPerSequence){
                case 1:
                    if (firstByte < 0x80) codePoint = firstByte;
                    break;
                case 2:
                    secondByte = buf[i + 1];
                    if ((secondByte & 0xC0) === 0x80) {
                        tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;
                        if (tempCodePoint > 0x7F) codePoint = tempCodePoint;
                    }
                    break;
                case 3:
                    secondByte = buf[i + 1];
                    thirdByte = buf[i + 2];
                    if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
                        tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;
                        if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) codePoint = tempCodePoint;
                    }
                    break;
                case 4:
                    secondByte = buf[i + 1];
                    thirdByte = buf[i + 2];
                    fourthByte = buf[i + 3];
                    if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
                        tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;
                        if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) codePoint = tempCodePoint;
                    }
            }
        }
        if (codePoint === null) {
            // we did not generate a valid codePoint so insert a
            // replacement char (U+FFFD) and advance only 1 byte
            codePoint = 0xFFFD;
            bytesPerSequence = 1;
        } else if (codePoint > 0xFFFF) {
            // encode to utf16 (surrogate pair dance)
            codePoint -= 0x10000;
            res.push(codePoint >>> 10 & 0x3FF | 0xD800);
            codePoint = 0xDC00 | codePoint & 0x3FF;
        }
        res.push(codePoint);
        i += bytesPerSequence;
    }
    return $6bf340299440ff4e$var$decodeCodePointsArray(res);
}
// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
const $6bf340299440ff4e$var$MAX_ARGUMENTS_LENGTH = 0x1000;
function $6bf340299440ff4e$var$decodeCodePointsArray(codePoints) {
    const len = codePoints.length;
    if (len <= $6bf340299440ff4e$var$MAX_ARGUMENTS_LENGTH) return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
    ;
    // Decode in chunks to avoid "call stack size exceeded".
    let res = "";
    let i = 0;
    while(i < len)res += String.fromCharCode.apply(String, codePoints.slice(i, i += $6bf340299440ff4e$var$MAX_ARGUMENTS_LENGTH));
    return res;
}
function $6bf340299440ff4e$var$asciiSlice(buf, start, end) {
    let ret = "";
    end = Math.min(buf.length, end);
    for(let i = start; i < end; ++i)ret += String.fromCharCode(buf[i] & 0x7F);
    return ret;
}
function $6bf340299440ff4e$var$latin1Slice(buf, start, end) {
    let ret = "";
    end = Math.min(buf.length, end);
    for(let i = start; i < end; ++i)ret += String.fromCharCode(buf[i]);
    return ret;
}
function $6bf340299440ff4e$var$hexSlice(buf, start, end) {
    const len = buf.length;
    if (!start || start < 0) start = 0;
    if (!end || end < 0 || end > len) end = len;
    let out = "";
    for(let i = start; i < end; ++i)out += $6bf340299440ff4e$var$hexSliceLookupTable[buf[i]];
    return out;
}
function $6bf340299440ff4e$var$utf16leSlice(buf, start, end) {
    const bytes = buf.slice(start, end);
    let res = "";
    // If bytes.length is odd, the last 8 bits must be ignored (same as node.js)
    for(let i = 0; i < bytes.length - 1; i += 2)res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
    return res;
}
$6bf340299440ff4e$var$Buffer.prototype.slice = function slice(start, end) {
    const len = this.length;
    start = ~~start;
    end = end === undefined ? len : ~~end;
    if (start < 0) {
        start += len;
        if (start < 0) start = 0;
    } else if (start > len) start = len;
    if (end < 0) {
        end += len;
        if (end < 0) end = 0;
    } else if (end > len) end = len;
    if (end < start) end = start;
    const newBuf = this.subarray(start, end);
    // Return an augmented `Uint8Array` instance
    Object.setPrototypeOf(newBuf, $6bf340299440ff4e$var$Buffer.prototype);
    return newBuf;
};
/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */ function $6bf340299440ff4e$var$checkOffset(offset, ext, length) {
    if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
    if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
}
$6bf340299440ff4e$var$Buffer.prototype.readUintLE = $6bf340299440ff4e$var$Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) $6bf340299440ff4e$var$checkOffset(offset, byteLength, this.length);
    let val = this[offset];
    let mul = 1;
    let i = 0;
    while(++i < byteLength && (mul *= 0x100))val += this[offset + i] * mul;
    return val;
};
$6bf340299440ff4e$var$Buffer.prototype.readUintBE = $6bf340299440ff4e$var$Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) $6bf340299440ff4e$var$checkOffset(offset, byteLength, this.length);
    let val = this[offset + --byteLength];
    let mul = 1;
    while(byteLength > 0 && (mul *= 0x100))val += this[offset + --byteLength] * mul;
    return val;
};
$6bf340299440ff4e$var$Buffer.prototype.readUint8 = $6bf340299440ff4e$var$Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) $6bf340299440ff4e$var$checkOffset(offset, 1, this.length);
    return this[offset];
};
$6bf340299440ff4e$var$Buffer.prototype.readUint16LE = $6bf340299440ff4e$var$Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) $6bf340299440ff4e$var$checkOffset(offset, 2, this.length);
    return this[offset] | this[offset + 1] << 8;
};
$6bf340299440ff4e$var$Buffer.prototype.readUint16BE = $6bf340299440ff4e$var$Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) $6bf340299440ff4e$var$checkOffset(offset, 2, this.length);
    return this[offset] << 8 | this[offset + 1];
};
$6bf340299440ff4e$var$Buffer.prototype.readUint32LE = $6bf340299440ff4e$var$Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) $6bf340299440ff4e$var$checkOffset(offset, 4, this.length);
    return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
};
$6bf340299440ff4e$var$Buffer.prototype.readUint32BE = $6bf340299440ff4e$var$Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) $6bf340299440ff4e$var$checkOffset(offset, 4, this.length);
    return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
};
$6bf340299440ff4e$var$Buffer.prototype.readBigUInt64LE = $6bf340299440ff4e$var$defineBigIntMethod(function readBigUInt64LE(offset) {
    offset = offset >>> 0;
    $6bf340299440ff4e$var$validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === undefined || last === undefined) $6bf340299440ff4e$var$boundsError(offset, this.length - 8);
    const lo = first + this[++offset] * 256 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
    const hi = this[++offset] + this[++offset] * 256 + this[++offset] * 2 ** 16 + last * 2 ** 24;
    return BigInt(lo) + (BigInt(hi) << BigInt(32));
});
$6bf340299440ff4e$var$Buffer.prototype.readBigUInt64BE = $6bf340299440ff4e$var$defineBigIntMethod(function readBigUInt64BE(offset) {
    offset = offset >>> 0;
    $6bf340299440ff4e$var$validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === undefined || last === undefined) $6bf340299440ff4e$var$boundsError(offset, this.length - 8);
    const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 256 + this[++offset];
    const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 256 + last;
    return (BigInt(hi) << BigInt(32)) + BigInt(lo);
});
$6bf340299440ff4e$var$Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) $6bf340299440ff4e$var$checkOffset(offset, byteLength, this.length);
    let val = this[offset];
    let mul = 1;
    let i = 0;
    while(++i < byteLength && (mul *= 0x100))val += this[offset + i] * mul;
    mul *= 0x80;
    if (val >= mul) val -= Math.pow(2, 8 * byteLength);
    return val;
};
$6bf340299440ff4e$var$Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) $6bf340299440ff4e$var$checkOffset(offset, byteLength, this.length);
    let i = byteLength;
    let mul = 1;
    let val = this[offset + --i];
    while(i > 0 && (mul *= 0x100))val += this[offset + --i] * mul;
    mul *= 0x80;
    if (val >= mul) val -= Math.pow(2, 8 * byteLength);
    return val;
};
$6bf340299440ff4e$var$Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) $6bf340299440ff4e$var$checkOffset(offset, 1, this.length);
    if (!(this[offset] & 0x80)) return this[offset];
    return (0xff - this[offset] + 1) * -1;
};
$6bf340299440ff4e$var$Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) $6bf340299440ff4e$var$checkOffset(offset, 2, this.length);
    const val = this[offset] | this[offset + 1] << 8;
    return val & 0x8000 ? val | 0xFFFF0000 : val;
};
$6bf340299440ff4e$var$Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) $6bf340299440ff4e$var$checkOffset(offset, 2, this.length);
    const val = this[offset + 1] | this[offset] << 8;
    return val & 0x8000 ? val | 0xFFFF0000 : val;
};
$6bf340299440ff4e$var$Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) $6bf340299440ff4e$var$checkOffset(offset, 4, this.length);
    return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
};
$6bf340299440ff4e$var$Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) $6bf340299440ff4e$var$checkOffset(offset, 4, this.length);
    return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
};
$6bf340299440ff4e$var$Buffer.prototype.readBigInt64LE = $6bf340299440ff4e$var$defineBigIntMethod(function readBigInt64LE(offset) {
    offset = offset >>> 0;
    $6bf340299440ff4e$var$validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === undefined || last === undefined) $6bf340299440ff4e$var$boundsError(offset, this.length - 8);
    const val = this[offset + 4] + this[offset + 5] * 256 + this[offset + 6] * 2 ** 16 + (last << 24 // Overflow
    );
    return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 256 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
});
$6bf340299440ff4e$var$Buffer.prototype.readBigInt64BE = $6bf340299440ff4e$var$defineBigIntMethod(function readBigInt64BE(offset) {
    offset = offset >>> 0;
    $6bf340299440ff4e$var$validateNumber(offset, "offset");
    const first = this[offset];
    const last = this[offset + 7];
    if (first === undefined || last === undefined) $6bf340299440ff4e$var$boundsError(offset, this.length - 8);
    const val = (first << 24) + // Overflow
    this[++offset] * 2 ** 16 + this[++offset] * 256 + this[++offset];
    return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 256 + last);
});
$6bf340299440ff4e$var$Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) $6bf340299440ff4e$var$checkOffset(offset, 4, this.length);
    return $iApRP.read(this, offset, true, 23, 4);
};
$6bf340299440ff4e$var$Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) $6bf340299440ff4e$var$checkOffset(offset, 4, this.length);
    return $iApRP.read(this, offset, false, 23, 4);
};
$6bf340299440ff4e$var$Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) $6bf340299440ff4e$var$checkOffset(offset, 8, this.length);
    return $iApRP.read(this, offset, true, 52, 8);
};
$6bf340299440ff4e$var$Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) $6bf340299440ff4e$var$checkOffset(offset, 8, this.length);
    return $iApRP.read(this, offset, false, 52, 8);
};
function $6bf340299440ff4e$var$checkInt(buf, value, offset, ext, max, min) {
    if (!$6bf340299440ff4e$var$Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
    if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
    if (offset + ext > buf.length) throw new RangeError("Index out of range");
}
$6bf340299440ff4e$var$Buffer.prototype.writeUintLE = $6bf340299440ff4e$var$Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength) - 1;
        $6bf340299440ff4e$var$checkInt(this, value, offset, byteLength, maxBytes, 0);
    }
    let mul = 1;
    let i = 0;
    this[offset] = value & 0xFF;
    while(++i < byteLength && (mul *= 0x100))this[offset + i] = value / mul & 0xFF;
    return offset + byteLength;
};
$6bf340299440ff4e$var$Buffer.prototype.writeUintBE = $6bf340299440ff4e$var$Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength) - 1;
        $6bf340299440ff4e$var$checkInt(this, value, offset, byteLength, maxBytes, 0);
    }
    let i = byteLength - 1;
    let mul = 1;
    this[offset + i] = value & 0xFF;
    while(--i >= 0 && (mul *= 0x100))this[offset + i] = value / mul & 0xFF;
    return offset + byteLength;
};
$6bf340299440ff4e$var$Buffer.prototype.writeUint8 = $6bf340299440ff4e$var$Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) $6bf340299440ff4e$var$checkInt(this, value, offset, 1, 0xff, 0);
    this[offset] = value & 0xff;
    return offset + 1;
};
$6bf340299440ff4e$var$Buffer.prototype.writeUint16LE = $6bf340299440ff4e$var$Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) $6bf340299440ff4e$var$checkInt(this, value, offset, 2, 0xffff, 0);
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
    return offset + 2;
};
$6bf340299440ff4e$var$Buffer.prototype.writeUint16BE = $6bf340299440ff4e$var$Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) $6bf340299440ff4e$var$checkInt(this, value, offset, 2, 0xffff, 0);
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
    return offset + 2;
};
$6bf340299440ff4e$var$Buffer.prototype.writeUint32LE = $6bf340299440ff4e$var$Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) $6bf340299440ff4e$var$checkInt(this, value, offset, 4, 0xffffffff, 0);
    this[offset + 3] = value >>> 24;
    this[offset + 2] = value >>> 16;
    this[offset + 1] = value >>> 8;
    this[offset] = value & 0xff;
    return offset + 4;
};
$6bf340299440ff4e$var$Buffer.prototype.writeUint32BE = $6bf340299440ff4e$var$Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) $6bf340299440ff4e$var$checkInt(this, value, offset, 4, 0xffffffff, 0);
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
    return offset + 4;
};
function $6bf340299440ff4e$var$wrtBigUInt64LE(buf, value, offset, min, max) {
    $6bf340299440ff4e$var$checkIntBI(value, min, max, buf, offset, 7);
    let lo = Number(value & BigInt(0xffffffff));
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    lo = lo >> 8;
    buf[offset++] = lo;
    let hi = Number(value >> BigInt(32) & BigInt(0xffffffff));
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    hi = hi >> 8;
    buf[offset++] = hi;
    return offset;
}
function $6bf340299440ff4e$var$wrtBigUInt64BE(buf, value, offset, min, max) {
    $6bf340299440ff4e$var$checkIntBI(value, min, max, buf, offset, 7);
    let lo = Number(value & BigInt(0xffffffff));
    buf[offset + 7] = lo;
    lo = lo >> 8;
    buf[offset + 6] = lo;
    lo = lo >> 8;
    buf[offset + 5] = lo;
    lo = lo >> 8;
    buf[offset + 4] = lo;
    let hi = Number(value >> BigInt(32) & BigInt(0xffffffff));
    buf[offset + 3] = hi;
    hi = hi >> 8;
    buf[offset + 2] = hi;
    hi = hi >> 8;
    buf[offset + 1] = hi;
    hi = hi >> 8;
    buf[offset] = hi;
    return offset + 8;
}
$6bf340299440ff4e$var$Buffer.prototype.writeBigUInt64LE = $6bf340299440ff4e$var$defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
    return $6bf340299440ff4e$var$wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
});
$6bf340299440ff4e$var$Buffer.prototype.writeBigUInt64BE = $6bf340299440ff4e$var$defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
    return $6bf340299440ff4e$var$wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
});
$6bf340299440ff4e$var$Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength - 1);
        $6bf340299440ff4e$var$checkInt(this, value, offset, byteLength, limit - 1, -limit);
    }
    let i = 0;
    let mul = 1;
    let sub = 0;
    this[offset] = value & 0xFF;
    while(++i < byteLength && (mul *= 0x100)){
        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) sub = 1;
        this[offset + i] = (value / mul >> 0) - sub & 0xFF;
    }
    return offset + byteLength;
};
$6bf340299440ff4e$var$Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength - 1);
        $6bf340299440ff4e$var$checkInt(this, value, offset, byteLength, limit - 1, -limit);
    }
    let i = byteLength - 1;
    let mul = 1;
    let sub = 0;
    this[offset + i] = value & 0xFF;
    while(--i >= 0 && (mul *= 0x100)){
        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) sub = 1;
        this[offset + i] = (value / mul >> 0) - sub & 0xFF;
    }
    return offset + byteLength;
};
$6bf340299440ff4e$var$Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) $6bf340299440ff4e$var$checkInt(this, value, offset, 1, 0x7f, -128);
    if (value < 0) value = 0xff + value + 1;
    this[offset] = value & 0xff;
    return offset + 1;
};
$6bf340299440ff4e$var$Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) $6bf340299440ff4e$var$checkInt(this, value, offset, 2, 0x7fff, -32768);
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
    return offset + 2;
};
$6bf340299440ff4e$var$Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) $6bf340299440ff4e$var$checkInt(this, value, offset, 2, 0x7fff, -32768);
    this[offset] = value >>> 8;
    this[offset + 1] = value & 0xff;
    return offset + 2;
};
$6bf340299440ff4e$var$Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) $6bf340299440ff4e$var$checkInt(this, value, offset, 4, 0x7fffffff, -2147483648);
    this[offset] = value & 0xff;
    this[offset + 1] = value >>> 8;
    this[offset + 2] = value >>> 16;
    this[offset + 3] = value >>> 24;
    return offset + 4;
};
$6bf340299440ff4e$var$Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) $6bf340299440ff4e$var$checkInt(this, value, offset, 4, 0x7fffffff, -2147483648);
    if (value < 0) value = 0xffffffff + value + 1;
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 0xff;
    return offset + 4;
};
$6bf340299440ff4e$var$Buffer.prototype.writeBigInt64LE = $6bf340299440ff4e$var$defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
    return $6bf340299440ff4e$var$wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
});
$6bf340299440ff4e$var$Buffer.prototype.writeBigInt64BE = $6bf340299440ff4e$var$defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
    return $6bf340299440ff4e$var$wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
});
function $6bf340299440ff4e$var$checkIEEE754(buf, value, offset, ext, max, min) {
    if (offset + ext > buf.length) throw new RangeError("Index out of range");
    if (offset < 0) throw new RangeError("Index out of range");
}
function $6bf340299440ff4e$var$writeFloat(buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) $6bf340299440ff4e$var$checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -340282346638528860000000000000000000000);
    $iApRP.write(buf, value, offset, littleEndian, 23, 4);
    return offset + 4;
}
$6bf340299440ff4e$var$Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
    return $6bf340299440ff4e$var$writeFloat(this, value, offset, true, noAssert);
};
$6bf340299440ff4e$var$Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
    return $6bf340299440ff4e$var$writeFloat(this, value, offset, false, noAssert);
};
function $6bf340299440ff4e$var$writeDouble(buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) $6bf340299440ff4e$var$checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -179769313486231570000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000);
    $iApRP.write(buf, value, offset, littleEndian, 52, 8);
    return offset + 8;
}
$6bf340299440ff4e$var$Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
    return $6bf340299440ff4e$var$writeDouble(this, value, offset, true, noAssert);
};
$6bf340299440ff4e$var$Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
    return $6bf340299440ff4e$var$writeDouble(this, value, offset, false, noAssert);
};
// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
$6bf340299440ff4e$var$Buffer.prototype.copy = function copy(target, targetStart, start, end) {
    if (!$6bf340299440ff4e$var$Buffer.isBuffer(target)) throw new TypeError("argument should be a Buffer");
    if (!start) start = 0;
    if (!end && end !== 0) end = this.length;
    if (targetStart >= target.length) targetStart = target.length;
    if (!targetStart) targetStart = 0;
    if (end > 0 && end < start) end = start;
    // Copy 0 bytes; we're done
    if (end === start) return 0;
    if (target.length === 0 || this.length === 0) return 0;
    // Fatal error conditions
    if (targetStart < 0) throw new RangeError("targetStart out of bounds");
    if (start < 0 || start >= this.length) throw new RangeError("Index out of range");
    if (end < 0) throw new RangeError("sourceEnd out of bounds");
    // Are we oob?
    if (end > this.length) end = this.length;
    if (target.length - targetStart < end - start) end = target.length - targetStart + start;
    const len = end - start;
    if (this === target && typeof Uint8Array.prototype.copyWithin === "function") // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end);
    else Uint8Array.prototype.set.call(target, this.subarray(start, end), targetStart);
    return len;
};
// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
$6bf340299440ff4e$var$Buffer.prototype.fill = function fill(val, start, end, encoding) {
    // Handle string cases:
    if (typeof val === "string") {
        if (typeof start === "string") {
            encoding = start;
            start = 0;
            end = this.length;
        } else if (typeof end === "string") {
            encoding = end;
            end = this.length;
        }
        if (encoding !== undefined && typeof encoding !== "string") throw new TypeError("encoding must be a string");
        if (typeof encoding === "string" && !$6bf340299440ff4e$var$Buffer.isEncoding(encoding)) throw new TypeError("Unknown encoding: " + encoding);
        if (val.length === 1) {
            const code = val.charCodeAt(0);
            if (encoding === "utf8" && code < 128 || encoding === "latin1") // Fast path: If `val` fits into a single byte, use that numeric value.
            val = code;
        }
    } else if (typeof val === "number") val = val & 255;
    else if (typeof val === "boolean") val = Number(val);
    // Invalid ranges are not set to a default, so can range check early.
    if (start < 0 || this.length < start || this.length < end) throw new RangeError("Out of range index");
    if (end <= start) return this;
    start = start >>> 0;
    end = end === undefined ? this.length : end >>> 0;
    if (!val) val = 0;
    let i;
    if (typeof val === "number") for(i = start; i < end; ++i)this[i] = val;
    else {
        const bytes = $6bf340299440ff4e$var$Buffer.isBuffer(val) ? val : $6bf340299440ff4e$var$Buffer.from(val, encoding);
        const len = bytes.length;
        if (len === 0) throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        for(i = 0; i < end - start; ++i)this[i + start] = bytes[i % len];
    }
    return this;
};
// CUSTOM ERRORS
// =============
// Simplified versions from Node, changed for Buffer-only usage
const $6bf340299440ff4e$var$errors = {};
function $6bf340299440ff4e$var$E(sym, getMessage, Base) {
    $6bf340299440ff4e$var$errors[sym] = class NodeError extends Base {
        constructor(){
            super();
            Object.defineProperty(this, "message", {
                value: getMessage.apply(this, arguments),
                writable: true,
                configurable: true
            });
            // Add the error code to the name to include it in the stack trace.
            this.name = `${this.name} [${sym}]`;
            // Access the stack to generate the error message including the error code
            // from the name.
            this.stack // eslint-disable-line no-unused-expressions
            ;
            // Reset the name to the actual name.
            delete this.name;
        }
        get code() {
            return sym;
        }
        set code(value) {
            Object.defineProperty(this, "code", {
                configurable: true,
                enumerable: true,
                value: value,
                writable: true
            });
        }
        toString() {
            return `${this.name} [${sym}]: ${this.message}`;
        }
    };
}
$6bf340299440ff4e$var$E("ERR_BUFFER_OUT_OF_BOUNDS", function(name) {
    if (name) return `${name} is outside of buffer bounds`;
    return "Attempt to access memory outside buffer bounds";
}, RangeError);
$6bf340299440ff4e$var$E("ERR_INVALID_ARG_TYPE", function(name, actual) {
    return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
}, TypeError);
$6bf340299440ff4e$var$E("ERR_OUT_OF_RANGE", function(str, range, input) {
    let msg = `The value of "${str}" is out of range.`;
    let received = input;
    if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) received = $6bf340299440ff4e$var$addNumericalSeparator(String(input));
    else if (typeof input === "bigint") {
        received = String(input);
        if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) received = $6bf340299440ff4e$var$addNumericalSeparator(received);
        received += "n";
    }
    msg += ` It must be ${range}. Received ${received}`;
    return msg;
}, RangeError);
function $6bf340299440ff4e$var$addNumericalSeparator(val) {
    let res = "";
    let i = val.length;
    const start = val[0] === "-" ? 1 : 0;
    for(; i >= start + 4; i -= 3)res = `_${val.slice(i - 3, i)}${res}`;
    return `${val.slice(0, i)}${res}`;
}
// CHECK FUNCTIONS
// ===============
function $6bf340299440ff4e$var$checkBounds(buf, offset, byteLength) {
    $6bf340299440ff4e$var$validateNumber(offset, "offset");
    if (buf[offset] === undefined || buf[offset + byteLength] === undefined) $6bf340299440ff4e$var$boundsError(offset, buf.length - (byteLength + 1));
}
function $6bf340299440ff4e$var$checkIntBI(value, min, max, buf, offset, byteLength) {
    if (value > max || value < min) {
        const n = typeof min === "bigint" ? "n" : "";
        let range;
        if (byteLength > 3) {
            if (min === 0 || min === BigInt(0)) range = `>= 0${n} and < 2${n} ** ${(byteLength + 1) * 8}${n}`;
            else range = `>= -(2${n} ** ${(byteLength + 1) * 8 - 1}${n}) and < 2 ** ` + `${(byteLength + 1) * 8 - 1}${n}`;
        } else range = `>= ${min}${n} and <= ${max}${n}`;
        throw new $6bf340299440ff4e$var$errors.ERR_OUT_OF_RANGE("value", range, value);
    }
    $6bf340299440ff4e$var$checkBounds(buf, offset, byteLength);
}
function $6bf340299440ff4e$var$validateNumber(value, name) {
    if (typeof value !== "number") throw new $6bf340299440ff4e$var$errors.ERR_INVALID_ARG_TYPE(name, "number", value);
}
function $6bf340299440ff4e$var$boundsError(value, length, type) {
    if (Math.floor(value) !== value) {
        $6bf340299440ff4e$var$validateNumber(value, type);
        throw new $6bf340299440ff4e$var$errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
    }
    if (length < 0) throw new $6bf340299440ff4e$var$errors.ERR_BUFFER_OUT_OF_BOUNDS();
    throw new $6bf340299440ff4e$var$errors.ERR_OUT_OF_RANGE(type || "offset", `>= ${type ? 1 : 0} and <= ${length}`, value);
}
// HELPER FUNCTIONS
// ================
const $6bf340299440ff4e$var$INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
function $6bf340299440ff4e$var$base64clean(str) {
    // Node takes equal signs as end of the Base64 encoding
    str = str.split("=")[0];
    // Node strips out invalid characters like \n and \t from the string, base64-js does not
    str = str.trim().replace($6bf340299440ff4e$var$INVALID_BASE64_RE, "");
    // Node converts strings with length < 2 to ''
    if (str.length < 2) return "";
    // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
    while(str.length % 4 !== 0)str = str + "=";
    return str;
}
function $6bf340299440ff4e$var$utf8ToBytes(string, units) {
    units = units || Infinity;
    let codePoint;
    const length = string.length;
    let leadSurrogate = null;
    const bytes = [];
    for(let i = 0; i < length; ++i){
        codePoint = string.charCodeAt(i);
        // is surrogate component
        if (codePoint > 0xD7FF && codePoint < 0xE000) {
            // last char was a lead
            if (!leadSurrogate) {
                // no lead yet
                if (codePoint > 0xDBFF) {
                    // unexpected trail
                    if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                    continue;
                } else if (i + 1 === length) {
                    // unpaired lead
                    if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                    continue;
                }
                // valid lead
                leadSurrogate = codePoint;
                continue;
            }
            // 2 leads in a row
            if (codePoint < 0xDC00) {
                if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                leadSurrogate = codePoint;
                continue;
            }
            // valid surrogate pair
            codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
        } else if (leadSurrogate) // valid bmp char, but last char was a lead
        {
            if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        }
        leadSurrogate = null;
        // encode utf8
        if (codePoint < 0x80) {
            if ((units -= 1) < 0) break;
            bytes.push(codePoint);
        } else if (codePoint < 0x800) {
            if ((units -= 2) < 0) break;
            bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
        } else if (codePoint < 0x10000) {
            if ((units -= 3) < 0) break;
            bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
        } else if (codePoint < 0x110000) {
            if ((units -= 4) < 0) break;
            bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
        } else throw new Error("Invalid code point");
    }
    return bytes;
}
function $6bf340299440ff4e$var$asciiToBytes(str) {
    const byteArray = [];
    for(let i = 0; i < str.length; ++i)// Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF);
    return byteArray;
}
function $6bf340299440ff4e$var$utf16leToBytes(str, units) {
    let c, hi, lo;
    const byteArray = [];
    for(let i = 0; i < str.length; ++i){
        if ((units -= 2) < 0) break;
        c = str.charCodeAt(i);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
    }
    return byteArray;
}
function $6bf340299440ff4e$var$base64ToBytes(str) {
    return $8J35Z.toByteArray($6bf340299440ff4e$var$base64clean(str));
}
function $6bf340299440ff4e$var$blitBuffer(src, dst, offset, length) {
    let i;
    for(i = 0; i < length; ++i){
        if (i + offset >= dst.length || i >= src.length) break;
        dst[i + offset] = src[i];
    }
    return i;
}
// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function $6bf340299440ff4e$var$isInstance(obj, type) {
    return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
}
function $6bf340299440ff4e$var$numberIsNaN(obj) {
    // For IE11 support
    return obj !== obj // eslint-disable-line no-self-compare
    ;
}
// Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219
const $6bf340299440ff4e$var$hexSliceLookupTable = function() {
    const alphabet = "0123456789abcdef";
    const table = new Array(256);
    for(let i = 0; i < 16; ++i){
        const i16 = i * 16;
        for(let j = 0; j < 16; ++j)table[i16 + j] = alphabet[i] + alphabet[j];
    }
    return table;
}();
// Return not function with Error if BigInt not supported
function $6bf340299440ff4e$var$defineBigIntMethod(fn) {
    return typeof BigInt === "undefined" ? $6bf340299440ff4e$var$BufferBigIntNotDefined : fn;
}
function $6bf340299440ff4e$var$BufferBigIntNotDefined() {
    throw new Error("BigInt not supported");
}

});
parcelRegister("8J35Z", function(module, exports) {

$parcel$export(module.exports, "toByteArray", () => $65a4ed6ea8f0c6c9$export$d622b2ad8d90c771, (v) => $65a4ed6ea8f0c6c9$export$d622b2ad8d90c771 = v);
$parcel$export(module.exports, "fromByteArray", () => $65a4ed6ea8f0c6c9$export$6100ba28696e12de, (v) => $65a4ed6ea8f0c6c9$export$6100ba28696e12de = v);
var $65a4ed6ea8f0c6c9$export$a48f0734ac7c2329;
var $65a4ed6ea8f0c6c9$export$d622b2ad8d90c771;
var $65a4ed6ea8f0c6c9$export$6100ba28696e12de;
"use strict";
$65a4ed6ea8f0c6c9$export$a48f0734ac7c2329 = $65a4ed6ea8f0c6c9$var$byteLength;
$65a4ed6ea8f0c6c9$export$d622b2ad8d90c771 = $65a4ed6ea8f0c6c9$var$toByteArray;
$65a4ed6ea8f0c6c9$export$6100ba28696e12de = $65a4ed6ea8f0c6c9$var$fromByteArray;
var $65a4ed6ea8f0c6c9$var$lookup = [];
var $65a4ed6ea8f0c6c9$var$revLookup = [];
var $65a4ed6ea8f0c6c9$var$Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
var $65a4ed6ea8f0c6c9$var$code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for(var $65a4ed6ea8f0c6c9$var$i = 0, $65a4ed6ea8f0c6c9$var$len = $65a4ed6ea8f0c6c9$var$code.length; $65a4ed6ea8f0c6c9$var$i < $65a4ed6ea8f0c6c9$var$len; ++$65a4ed6ea8f0c6c9$var$i){
    $65a4ed6ea8f0c6c9$var$lookup[$65a4ed6ea8f0c6c9$var$i] = $65a4ed6ea8f0c6c9$var$code[$65a4ed6ea8f0c6c9$var$i];
    $65a4ed6ea8f0c6c9$var$revLookup[$65a4ed6ea8f0c6c9$var$code.charCodeAt($65a4ed6ea8f0c6c9$var$i)] = $65a4ed6ea8f0c6c9$var$i;
}
// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
$65a4ed6ea8f0c6c9$var$revLookup["-".charCodeAt(0)] = 62;
$65a4ed6ea8f0c6c9$var$revLookup["_".charCodeAt(0)] = 63;
function $65a4ed6ea8f0c6c9$var$getLens(b64) {
    var len = b64.length;
    if (len % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
    // Trim off extra bytes after placeholder bytes are found
    // See: https://github.com/beatgammit/base64-js/issues/42
    var validLen = b64.indexOf("=");
    if (validLen === -1) validLen = len;
    var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
    return [
        validLen,
        placeHoldersLen
    ];
}
// base64 is 4/3 + up to two characters of the original data
function $65a4ed6ea8f0c6c9$var$byteLength(b64) {
    var lens = $65a4ed6ea8f0c6c9$var$getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function $65a4ed6ea8f0c6c9$var$_byteLength(b64, validLen, placeHoldersLen) {
    return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function $65a4ed6ea8f0c6c9$var$toByteArray(b64) {
    var tmp;
    var lens = $65a4ed6ea8f0c6c9$var$getLens(b64);
    var validLen = lens[0];
    var placeHoldersLen = lens[1];
    var arr = new $65a4ed6ea8f0c6c9$var$Arr($65a4ed6ea8f0c6c9$var$_byteLength(b64, validLen, placeHoldersLen));
    var curByte = 0;
    // if there are placeholders, only get up to the last complete 4 chars
    var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
    var i;
    for(i = 0; i < len; i += 4){
        tmp = $65a4ed6ea8f0c6c9$var$revLookup[b64.charCodeAt(i)] << 18 | $65a4ed6ea8f0c6c9$var$revLookup[b64.charCodeAt(i + 1)] << 12 | $65a4ed6ea8f0c6c9$var$revLookup[b64.charCodeAt(i + 2)] << 6 | $65a4ed6ea8f0c6c9$var$revLookup[b64.charCodeAt(i + 3)];
        arr[curByte++] = tmp >> 16 & 0xFF;
        arr[curByte++] = tmp >> 8 & 0xFF;
        arr[curByte++] = tmp & 0xFF;
    }
    if (placeHoldersLen === 2) {
        tmp = $65a4ed6ea8f0c6c9$var$revLookup[b64.charCodeAt(i)] << 2 | $65a4ed6ea8f0c6c9$var$revLookup[b64.charCodeAt(i + 1)] >> 4;
        arr[curByte++] = tmp & 0xFF;
    }
    if (placeHoldersLen === 1) {
        tmp = $65a4ed6ea8f0c6c9$var$revLookup[b64.charCodeAt(i)] << 10 | $65a4ed6ea8f0c6c9$var$revLookup[b64.charCodeAt(i + 1)] << 4 | $65a4ed6ea8f0c6c9$var$revLookup[b64.charCodeAt(i + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 0xFF;
        arr[curByte++] = tmp & 0xFF;
    }
    return arr;
}
function $65a4ed6ea8f0c6c9$var$tripletToBase64(num) {
    return $65a4ed6ea8f0c6c9$var$lookup[num >> 18 & 0x3F] + $65a4ed6ea8f0c6c9$var$lookup[num >> 12 & 0x3F] + $65a4ed6ea8f0c6c9$var$lookup[num >> 6 & 0x3F] + $65a4ed6ea8f0c6c9$var$lookup[num & 0x3F];
}
function $65a4ed6ea8f0c6c9$var$encodeChunk(uint8, start, end) {
    var tmp;
    var output = [];
    for(var i = start; i < end; i += 3){
        tmp = (uint8[i] << 16 & 0xFF0000) + (uint8[i + 1] << 8 & 0xFF00) + (uint8[i + 2] & 0xFF);
        output.push($65a4ed6ea8f0c6c9$var$tripletToBase64(tmp));
    }
    return output.join("");
}
function $65a4ed6ea8f0c6c9$var$fromByteArray(uint8) {
    var tmp;
    var len = uint8.length;
    var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
    ;
    var parts = [];
    var maxChunkLength = 16383 // must be multiple of 3
    ;
    // go through the array every three bytes, we'll deal with trailing stuff later
    for(var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength)parts.push($65a4ed6ea8f0c6c9$var$encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
    // pad the end with zeros, but make sure to not forget the extra bytes
    if (extraBytes === 1) {
        tmp = uint8[len - 1];
        parts.push($65a4ed6ea8f0c6c9$var$lookup[tmp >> 2] + $65a4ed6ea8f0c6c9$var$lookup[tmp << 4 & 0x3F] + "==");
    } else if (extraBytes === 2) {
        tmp = (uint8[len - 2] << 8) + uint8[len - 1];
        parts.push($65a4ed6ea8f0c6c9$var$lookup[tmp >> 10] + $65a4ed6ea8f0c6c9$var$lookup[tmp >> 4 & 0x3F] + $65a4ed6ea8f0c6c9$var$lookup[tmp << 2 & 0x3F] + "=");
    }
    return parts.join("");
}

});

parcelRegister("iApRP", function(module, exports) {

$parcel$export(module.exports, "read", () => $d87fa77fd361462f$export$aafa59e2e03f2942, (v) => $d87fa77fd361462f$export$aafa59e2e03f2942 = v);
$parcel$export(module.exports, "write", () => $d87fa77fd361462f$export$68d8715fc104d294, (v) => $d87fa77fd361462f$export$68d8715fc104d294 = v);
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */ var $d87fa77fd361462f$export$aafa59e2e03f2942;
var $d87fa77fd361462f$export$68d8715fc104d294;
$d87fa77fd361462f$export$aafa59e2e03f2942 = function(buffer, offset, isLE, mLen, nBytes) {
    var e, m;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var nBits = -7;
    var i = isLE ? nBytes - 1 : 0;
    var d = isLE ? -1 : 1;
    var s = buffer[offset + i];
    i += d;
    e = s & (1 << -nBits) - 1;
    s >>= -nBits;
    nBits += eLen;
    for(; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8);
    m = e & (1 << -nBits) - 1;
    e >>= -nBits;
    nBits += mLen;
    for(; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8);
    if (e === 0) e = 1 - eBias;
    else if (e === eMax) return m ? NaN : (s ? -1 : 1) * Infinity;
    else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
    }
    return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};
$d87fa77fd361462f$export$68d8715fc104d294 = function(buffer, value, offset, isLE, mLen, nBytes) {
    var e, m, c;
    var eLen = nBytes * 8 - mLen - 1;
    var eMax = (1 << eLen) - 1;
    var eBias = eMax >> 1;
    var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
    var i = isLE ? 0 : nBytes - 1;
    var d = isLE ? 1 : -1;
    var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
    value = Math.abs(value);
    if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
    } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
        }
        if (e + eBias >= 1) value += rt / c;
        else value += rt * Math.pow(2, 1 - eBias);
        if (value * c >= 2) {
            e++;
            c /= 2;
        }
        if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
        } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
        } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
        }
    }
    for(; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8);
    e = e << mLen | m;
    eLen += mLen;
    for(; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8);
    buffer[offset + i - d] |= s * 128;
};

});



parcelRegister("dcfNU", function(module, exports) {

$parcel$export(module.exports, "print", () => $99b8a7ac762e3234$export$c2d084dc44961371);
$parcel$export(module.exports, "warn", () => $99b8a7ac762e3234$export$c106dd0671a0fc2d);
$parcel$export(module.exports, "BOLD", () => (parcelRequire("7i7Pw")).BOLD);
$parcel$export(module.exports, "UNBOLD", () => (parcelRequire("7i7Pw")).UNBOLD);
$parcel$export(module.exports, "RED", () => (parcelRequire("7i7Pw")).RED);
$parcel$export(module.exports, "ORANGE", () => (parcelRequire("7i7Pw")).ORANGE);
/**
 * Isomorphic logging module with support for colors!
 *
 * @module logging
 */ 
var $4ptg7 = parcelRequire("4ptg7");

var $gB6ZU = parcelRequire("gB6ZU");

var $fCD9F = parcelRequire("fCD9F");

var $aUKTs = parcelRequire("aUKTs");

var $gdBi2 = parcelRequire("gdBi2");

var $e6DQe = parcelRequire("e6DQe");

var $4bORL = parcelRequire("4bORL");

var $kuitL = parcelRequire("kuitL");

var $7i7Pw = parcelRequire("7i7Pw");
/**
 * @type {Object<Symbol,pair.Pair<string,string>>}
 */ const $99b8a7ac762e3234$var$_browserStyleMap = {
    [$7i7Pw.BOLD]: $fCD9F.create("font-weight", "bold"),
    [$7i7Pw.UNBOLD]: $fCD9F.create("font-weight", "normal"),
    [$7i7Pw.BLUE]: $fCD9F.create("color", "blue"),
    [$7i7Pw.GREEN]: $fCD9F.create("color", "green"),
    [$7i7Pw.GREY]: $fCD9F.create("color", "grey"),
    [$7i7Pw.RED]: $fCD9F.create("color", "red"),
    [$7i7Pw.PURPLE]: $fCD9F.create("color", "purple"),
    [$7i7Pw.ORANGE]: $fCD9F.create("color", "orange"),
    [$7i7Pw.UNCOLOR]: $fCD9F.create("color", "black")
};
/**
 * @param {Array<string|Symbol|Object|number>} args
 * @return {Array<string|object|number>}
 */ /* c8 ignore start */ const $99b8a7ac762e3234$var$computeBrowserLoggingArgs = (args)=>{
    const strBuilder = [];
    const styles = [];
    const currentStyle = $e6DQe.create();
    /**
   * @type {Array<string|Object|number>}
   */ let logArgs = [];
    // try with formatting until we find something unsupported
    let i = 0;
    for(; i < args.length; i++){
        const arg = args[i];
        // @ts-ignore
        const style = $99b8a7ac762e3234$var$_browserStyleMap[arg];
        if (style !== undefined) currentStyle.set(style.left, style.right);
        else {
            if (arg.constructor === String || arg.constructor === Number) {
                const style = $aUKTs.mapToStyleString(currentStyle);
                if (i > 0 || style.length > 0) {
                    strBuilder.push("%c" + arg);
                    styles.push(style);
                } else strBuilder.push(arg);
            } else break;
        }
    }
    if (i > 0) {
        // create logArgs with what we have so far
        logArgs = styles;
        logArgs.unshift(strBuilder.join(""));
    }
    // append the rest
    for(; i < args.length; i++){
        const arg = args[i];
        if (!(arg instanceof Symbol)) logArgs.push(arg);
    }
    return logArgs;
};
/* c8 ignore stop */ /* c8 ignore start */ const $99b8a7ac762e3234$var$computeLoggingArgs = $4ptg7.supportsColor ? $99b8a7ac762e3234$var$computeBrowserLoggingArgs : $7i7Pw.computeNoColorLoggingArgs;
const $99b8a7ac762e3234$export$c2d084dc44961371 = (...args)=>{
    console.log(...$99b8a7ac762e3234$var$computeLoggingArgs(args));
    /* c8 ignore next */ $99b8a7ac762e3234$export$6f0283bff34730a1.forEach((vc)=>vc.print(args));
};
const $99b8a7ac762e3234$export$c106dd0671a0fc2d = (...args)=>{
    console.warn(...$99b8a7ac762e3234$var$computeLoggingArgs(args));
    args.unshift($7i7Pw.ORANGE);
    $99b8a7ac762e3234$export$6f0283bff34730a1.forEach((vc)=>vc.print(args));
};
const $99b8a7ac762e3234$export$55ee1551a3f962e6 = (err)=>{
    console.error(err);
    $99b8a7ac762e3234$export$6f0283bff34730a1.forEach((vc)=>vc.printError(err));
};
const $99b8a7ac762e3234$export$85acd411250ab137 = (url, height)=>{
    if ($4ptg7.isBrowser) console.log("%c                      ", `font-size: ${height}px; background-size: contain; background-repeat: no-repeat; background-image: url(${url})`);
    $99b8a7ac762e3234$export$6f0283bff34730a1.forEach((vc)=>vc.printImg(url, height));
};
const $99b8a7ac762e3234$export$fcd48d8a033dbfbf = (base64, height)=>$99b8a7ac762e3234$export$85acd411250ab137(`data:image/gif;base64,${base64}`, height);
const $99b8a7ac762e3234$export$e5e25fbcc1f7affe = (...args)=>{
    console.group(...$99b8a7ac762e3234$var$computeLoggingArgs(args));
    /* c8 ignore next */ $99b8a7ac762e3234$export$6f0283bff34730a1.forEach((vc)=>vc.group(args));
};
const $99b8a7ac762e3234$export$488ef8fb3416a29f = (...args)=>{
    console.groupCollapsed(...$99b8a7ac762e3234$var$computeLoggingArgs(args));
    /* c8 ignore next */ $99b8a7ac762e3234$export$6f0283bff34730a1.forEach((vc)=>vc.groupCollapsed(args));
};
const $99b8a7ac762e3234$export$a57f3dfe595273e6 = ()=>{
    console.groupEnd();
    /* c8 ignore next */ $99b8a7ac762e3234$export$6f0283bff34730a1.forEach((vc)=>vc.groupEnd());
};
const $99b8a7ac762e3234$export$76dff282388623b3 = (createNode)=>$99b8a7ac762e3234$export$6f0283bff34730a1.forEach((vc)=>vc.printDom(createNode()));
const $99b8a7ac762e3234$export$98f2e847362d891 = (canvas, height)=>$99b8a7ac762e3234$export$85acd411250ab137(canvas.toDataURL(), height);
const $99b8a7ac762e3234$export$6f0283bff34730a1 = $gB6ZU.create();
/**
 * @param {Array<string|Symbol|Object|number>} args
 * @return {Array<Element>}
 */ /* c8 ignore start */ const $99b8a7ac762e3234$var$_computeLineSpans = (args)=>{
    const spans = [];
    const currentStyle = new Map();
    // try with formatting until we find something unsupported
    let i = 0;
    for(; i < args.length; i++){
        const arg = args[i];
        // @ts-ignore
        const style = $99b8a7ac762e3234$var$_browserStyleMap[arg];
        if (style !== undefined) currentStyle.set(style.left, style.right);
        else {
            if (arg.constructor === String || arg.constructor === Number) {
                // @ts-ignore
                const span = $aUKTs.element("span", [
                    $fCD9F.create("style", $aUKTs.mapToStyleString(currentStyle))
                ], [
                    $aUKTs.text(arg.toString())
                ]);
                if (span.innerHTML === "") span.innerHTML = "&nbsp;";
                spans.push(span);
            } else break;
        }
    }
    // append the rest
    for(; i < args.length; i++){
        let content = args[i];
        if (!(content instanceof Symbol)) {
            if (content.constructor !== String && content.constructor !== Number) content = " " + $gdBi2.stringify(content) + " ";
            spans.push($aUKTs.element("span", [], [
                $aUKTs.text(/** @type {string} */ content)
            ]));
        }
    }
    return spans;
};
/* c8 ignore stop */ const $99b8a7ac762e3234$var$lineStyle = "font-family:monospace;border-bottom:1px solid #e2e2e2;padding:2px;";
class $99b8a7ac762e3234$export$79dd518d42f6d7a1 {
    /**
   * @param {Element} dom
   */ constructor(dom){
        this.dom = dom;
        /**
     * @type {Element}
     */ this.ccontainer = this.dom;
        this.depth = 0;
        $99b8a7ac762e3234$export$6f0283bff34730a1.add(this);
    }
    /**
   * @param {Array<string|Symbol|Object|number>} args
   * @param {boolean} collapsed
   */ group(args, collapsed = false) {
        $4bORL.enqueue(()=>{
            const triangleDown = $aUKTs.element("span", [
                $fCD9F.create("hidden", collapsed),
                $fCD9F.create("style", "color:grey;font-size:120%;")
            ], [
                $aUKTs.text("\u25BC")
            ]);
            const triangleRight = $aUKTs.element("span", [
                $fCD9F.create("hidden", !collapsed),
                $fCD9F.create("style", "color:grey;font-size:125%;")
            ], [
                $aUKTs.text("\u25B6")
            ]);
            const content = $aUKTs.element("div", [
                $fCD9F.create("style", `${$99b8a7ac762e3234$var$lineStyle};padding-left:${this.depth * 10}px`)
            ], [
                triangleDown,
                triangleRight,
                $aUKTs.text(" ")
            ].concat($99b8a7ac762e3234$var$_computeLineSpans(args)));
            const nextContainer = $aUKTs.element("div", [
                $fCD9F.create("hidden", collapsed)
            ]);
            const nextLine = $aUKTs.element("div", [], [
                content,
                nextContainer
            ]);
            $aUKTs.append(this.ccontainer, [
                nextLine
            ]);
            this.ccontainer = nextContainer;
            this.depth++;
            // when header is clicked, collapse/uncollapse container
            $aUKTs.addEventListener(content, "click", (_event)=>{
                nextContainer.toggleAttribute("hidden");
                triangleDown.toggleAttribute("hidden");
                triangleRight.toggleAttribute("hidden");
            });
        });
    }
    /**
   * @param {Array<string|Symbol|Object|number>} args
   */ groupCollapsed(args) {
        this.group(args, true);
    }
    groupEnd() {
        $4bORL.enqueue(()=>{
            if (this.depth > 0) {
                this.depth--;
                // @ts-ignore
                this.ccontainer = this.ccontainer.parentElement.parentElement;
            }
        });
    }
    /**
   * @param {Array<string|Symbol|Object|number>} args
   */ print(args) {
        $4bORL.enqueue(()=>{
            $aUKTs.append(this.ccontainer, [
                $aUKTs.element("div", [
                    $fCD9F.create("style", `${$99b8a7ac762e3234$var$lineStyle};padding-left:${this.depth * 10}px`)
                ], $99b8a7ac762e3234$var$_computeLineSpans(args))
            ]);
        });
    }
    /**
   * @param {Error} err
   */ printError(err) {
        this.print([
            $7i7Pw.RED,
            $7i7Pw.BOLD,
            err.toString()
        ]);
    }
    /**
   * @param {string} url
   * @param {number} height
   */ printImg(url, height) {
        $4bORL.enqueue(()=>{
            $aUKTs.append(this.ccontainer, [
                $aUKTs.element("img", [
                    $fCD9F.create("src", url),
                    $fCD9F.create("height", `${$kuitL.round(height * 1.5)}px`)
                ])
            ]);
        });
    }
    /**
   * @param {Node} node
   */ printDom(node) {
        $4bORL.enqueue(()=>{
            $aUKTs.append(this.ccontainer, [
                node
            ]);
        });
    }
    destroy() {
        $4bORL.enqueue(()=>{
            $99b8a7ac762e3234$export$6f0283bff34730a1.delete(this);
        });
    }
}
const $99b8a7ac762e3234$export$3b589da4ab12cf23 = (dom)=>new $99b8a7ac762e3234$export$79dd518d42f6d7a1(dom);
const $99b8a7ac762e3234$export$c2977e725d59a2fd = (moduleName)=>$7i7Pw.createModuleLogger($99b8a7ac762e3234$export$c2d084dc44961371, moduleName);

});
parcelRegister("fCD9F", function(module, exports) {

$parcel$export(module.exports, "create", () => $b5f8c6f9c2cd0d18$export$185802fd694ee1f5);
$parcel$export(module.exports, "forEach", () => $b5f8c6f9c2cd0d18$export$4b80e395e36b5a56);
/**
 * Working with value pairs.
 *
 * @module pair
 */ /**
 * @template L,R
 */ class $b5f8c6f9c2cd0d18$export$d63d7cff08fe4dc9 {
    /**
   * @param {L} left
   * @param {R} right
   */ constructor(left, right){
        this.left = left;
        this.right = right;
    }
}
const $b5f8c6f9c2cd0d18$export$185802fd694ee1f5 = (left, right)=>new $b5f8c6f9c2cd0d18$export$d63d7cff08fe4dc9(left, right);
const $b5f8c6f9c2cd0d18$export$ca0ea131672c5a9b = (right, left)=>new $b5f8c6f9c2cd0d18$export$d63d7cff08fe4dc9(left, right);
const $b5f8c6f9c2cd0d18$export$4b80e395e36b5a56 = (arr, f)=>arr.forEach((p)=>f(p.left, p.right));
const $b5f8c6f9c2cd0d18$export$871de8747c9eaa88 = (arr, f)=>arr.map((p)=>f(p.left, p.right));

});

parcelRegister("aUKTs", function(module, exports) {

$parcel$export(module.exports, "append", () => $7f23826a7ef70c48$export$10d8903dec122b9d);
$parcel$export(module.exports, "addEventListener", () => $7f23826a7ef70c48$export$3f65cefe8380dbea);
$parcel$export(module.exports, "element", () => $7f23826a7ef70c48$export$8454457683f90105);
$parcel$export(module.exports, "text", () => $7f23826a7ef70c48$export$6f093cfa640b7166);
$parcel$export(module.exports, "mapToStyleString", () => $7f23826a7ef70c48$export$7d9cafe158c3b49);
/* eslint-env browser */ /**
 * Utility module to work with the DOM.
 *
 * @module dom
 */ 
var $fCD9F = parcelRequire("fCD9F");

var $e6DQe = parcelRequire("e6DQe");
const $7f23826a7ef70c48$export$2a111da947c407d2 = /** @type {Document} */ typeof document !== "undefined" ? document : {};
const $7f23826a7ef70c48$export$c8a8987d4410bf2d = (name)=>$7f23826a7ef70c48$export$2a111da947c407d2.createElement(name);
const $7f23826a7ef70c48$export$fb51152cd5328759 = ()=>$7f23826a7ef70c48$export$2a111da947c407d2.createDocumentFragment();
const $7f23826a7ef70c48$export$b2ce9ad90858ed7a = (text)=>$7f23826a7ef70c48$export$2a111da947c407d2.createTextNode(text);
const $7f23826a7ef70c48$export$fb621bb527230cda = /** @type {DOMParser} */ typeof DOMParser !== "undefined" ? new DOMParser() : null;
const $7f23826a7ef70c48$export$77c9ee5a14f9d7cf = (el, name, opts)=>el.dispatchEvent(new CustomEvent(name, opts));
const $7f23826a7ef70c48$export$74da2cba014bdc09 = (el, attrs)=>{
    $fCD9F.forEach(attrs, (key, value)=>{
        if (value === false) el.removeAttribute(key);
        else if (value === true) el.setAttribute(key, "");
        else // @ts-ignore
        el.setAttribute(key, value);
    });
    return el;
};
const $7f23826a7ef70c48$export$ba744f7d152abea1 = (el, attrs)=>{
    attrs.forEach((value, key)=>{
        el.setAttribute(key, value);
    });
    return el;
};
const $7f23826a7ef70c48$export$f00aeb236b6f05af = (children)=>{
    const fragment = $7f23826a7ef70c48$export$fb51152cd5328759();
    for(let i = 0; i < children.length; i++)$7f23826a7ef70c48$export$1b8e57c9ea42f1d2(fragment, children[i]);
    return fragment;
};
const $7f23826a7ef70c48$export$10d8903dec122b9d = (parent, nodes)=>{
    $7f23826a7ef70c48$export$1b8e57c9ea42f1d2(parent, $7f23826a7ef70c48$export$f00aeb236b6f05af(nodes));
    return parent;
};
const $7f23826a7ef70c48$export$cd7f480d6b8286c3 = (el)=>el.remove();
const $7f23826a7ef70c48$export$3f65cefe8380dbea = (el, name, f)=>el.addEventListener(name, f);
const $7f23826a7ef70c48$export$8ff9f68337b520c0 = (el, name, f)=>el.removeEventListener(name, f);
const $7f23826a7ef70c48$export$40a4ed63e5cb7043 = (node, listeners)=>{
    $fCD9F.forEach(listeners, (name, f)=>$7f23826a7ef70c48$export$3f65cefe8380dbea(node, name, f));
    return node;
};
const $7f23826a7ef70c48$export$8c7b13b21690651d = (node, listeners)=>{
    $fCD9F.forEach(listeners, (name, f)=>$7f23826a7ef70c48$export$8ff9f68337b520c0(node, name, f));
    return node;
};
const $7f23826a7ef70c48$export$8454457683f90105 = (name, attrs = [], children = [])=>$7f23826a7ef70c48$export$10d8903dec122b9d($7f23826a7ef70c48$export$74da2cba014bdc09($7f23826a7ef70c48$export$c8a8987d4410bf2d(name), attrs), children);
const $7f23826a7ef70c48$export$67ea982130081db = (width, height)=>{
    const c = /** @type {HTMLCanvasElement} */ $7f23826a7ef70c48$export$c8a8987d4410bf2d("canvas");
    c.height = height;
    c.width = width;
    return c;
};
const $7f23826a7ef70c48$export$6f093cfa640b7166 = $7f23826a7ef70c48$export$b2ce9ad90858ed7a;
const $7f23826a7ef70c48$export$7f60f118cd3e6292 = (pair)=>`${pair.left}:${pair.right};`;
const $7f23826a7ef70c48$export$3d24a00500154f45 = (pairs)=>pairs.map($7f23826a7ef70c48$export$7f60f118cd3e6292).join("");
const $7f23826a7ef70c48$export$7d9cafe158c3b49 = (m)=>$e6DQe.map(m, (value, key)=>`${key}:${value};`).join("");
const $7f23826a7ef70c48$export$78fb49a702cc1f2 = (el, query)=>el.querySelector(query);
const $7f23826a7ef70c48$export$2e83b5c43fb7af7b = (el, query)=>el.querySelectorAll(query);
const $7f23826a7ef70c48$export$83595b84fc78b9b4 = (id)=>/** @type {HTMLElement} */ $7f23826a7ef70c48$export$2a111da947c407d2.getElementById(id);
/**
 * @param {string} html
 * @return {HTMLElement}
 */ const $7f23826a7ef70c48$var$_parse = (html)=>$7f23826a7ef70c48$export$fb621bb527230cda.parseFromString(`<html><body>${html}</body></html>`, "text/html").body;
const $7f23826a7ef70c48$export$e1152f5efcc82ad = (html)=>$7f23826a7ef70c48$export$f00aeb236b6f05af(/** @type {any} */ $7f23826a7ef70c48$var$_parse(html).childNodes);
const $7f23826a7ef70c48$export$b23064c2dcaf2b63 = (html)=>/** @type HTMLElement */ $7f23826a7ef70c48$var$_parse(html).firstElementChild;
const $7f23826a7ef70c48$export$e6a6680780233a77 = (oldEl, newEl)=>oldEl.replaceWith(newEl);
const $7f23826a7ef70c48$export$86b68c7dbeb53c22 = (parent, el, ref)=>parent.insertBefore(el, ref);
const $7f23826a7ef70c48$export$1b8e57c9ea42f1d2 = (parent, child)=>parent.appendChild(child);
const $7f23826a7ef70c48$export$51c8a276ee4b8f51 = $7f23826a7ef70c48$export$2a111da947c407d2.ELEMENT_NODE;
const $7f23826a7ef70c48$export$5bcc40203615fc2e = $7f23826a7ef70c48$export$2a111da947c407d2.TEXT_NODE;
const $7f23826a7ef70c48$export$e5fc6332c1c8eb8e = $7f23826a7ef70c48$export$2a111da947c407d2.CDATA_SECTION_NODE;
const $7f23826a7ef70c48$export$3d597a6ef0f08b0a = $7f23826a7ef70c48$export$2a111da947c407d2.COMMENT_NODE;
const $7f23826a7ef70c48$export$4139dcda4f7f83db = $7f23826a7ef70c48$export$2a111da947c407d2.DOCUMENT_NODE;
const $7f23826a7ef70c48$export$e9e7ddfdb004b848 = $7f23826a7ef70c48$export$2a111da947c407d2.DOCUMENT_TYPE_NODE;
const $7f23826a7ef70c48$export$b86725031ae151ee = $7f23826a7ef70c48$export$2a111da947c407d2.DOCUMENT_FRAGMENT_NODE;
const $7f23826a7ef70c48$export$1aa65d86db59b879 = (node, type)=>node.nodeType === type;
const $7f23826a7ef70c48$export$3c81af374b054d6a = (parent, child)=>{
    let p = child.parentNode;
    while(p && p !== parent)p = p.parentNode;
    return p === parent;
} /* c8 ignore stop */ ;

});

parcelRegister("gdBi2", function(module, exports) {

$parcel$export(module.exports, "stringify", () => $bceac9403eb090ff$export$fac44ee5b035f737);
/**
 * JSON utility functions.
 *
 * @module json
 */ /**
 * Transform JavaScript object to JSON.
 *
 * @param {any} object
 * @return {string}
 */ const $bceac9403eb090ff$export$fac44ee5b035f737 = JSON.stringify;
const $bceac9403eb090ff$export$98e6a39c04603d36 = JSON.parse;

});

parcelRegister("4bORL", function(module, exports) {

$parcel$export(module.exports, "enqueue", () => $30cfa57d44c60abe$export$513072ba72100d9c);
/* global requestIdleCallback, requestAnimationFrame, cancelIdleCallback, cancelAnimationFrame */ /**
 * Utility module to work with EcmaScript's event loop.
 *
 * @module eventloop
 */ /**
 * @type {Array<function>}
 */ let $30cfa57d44c60abe$var$queue = [];
const $30cfa57d44c60abe$var$_runQueue = ()=>{
    for(let i = 0; i < $30cfa57d44c60abe$var$queue.length; i++)$30cfa57d44c60abe$var$queue[i]();
    $30cfa57d44c60abe$var$queue = [];
};
const $30cfa57d44c60abe$export$513072ba72100d9c = (f)=>{
    $30cfa57d44c60abe$var$queue.push(f);
    if ($30cfa57d44c60abe$var$queue.length === 1) setTimeout($30cfa57d44c60abe$var$_runQueue, 0);
};
/**
 * @typedef {Object} TimeoutObject
 * @property {function} TimeoutObject.destroy
 */ /**
 * @param {function(number):void} clearFunction
 */ const $30cfa57d44c60abe$var$createTimeoutClass = (clearFunction)=>class TT {
        /**
   * @param {number} timeoutId
   */ constructor(timeoutId){
            this._ = timeoutId;
        }
        destroy() {
            clearFunction(this._);
        }
    };
const $30cfa57d44c60abe$var$Timeout = $30cfa57d44c60abe$var$createTimeoutClass(clearTimeout);
const $30cfa57d44c60abe$export$83e74882c5df8fe1 = (timeout, callback)=>new $30cfa57d44c60abe$var$Timeout(setTimeout(callback, timeout));
const $30cfa57d44c60abe$var$Interval = $30cfa57d44c60abe$var$createTimeoutClass(clearInterval);
const $30cfa57d44c60abe$export$3174cdbf0a0cbc84 = (timeout, callback)=>new $30cfa57d44c60abe$var$Interval(setInterval(callback, timeout));
const $30cfa57d44c60abe$export$c35d437ae5945fcd = $30cfa57d44c60abe$var$createTimeoutClass((arg)=>typeof requestAnimationFrame !== "undefined" && cancelAnimationFrame(arg));
const $30cfa57d44c60abe$export$1402cba6a733f33a = (cb)=>typeof requestAnimationFrame === "undefined" ? $30cfa57d44c60abe$export$83e74882c5df8fe1(0, cb) : new $30cfa57d44c60abe$export$c35d437ae5945fcd(requestAnimationFrame(cb));
/* c8 ignore next */ // @ts-ignore
const $30cfa57d44c60abe$var$Idle = $30cfa57d44c60abe$var$createTimeoutClass((arg)=>typeof cancelIdleCallback !== "undefined" && cancelIdleCallback(arg));
const $30cfa57d44c60abe$export$9f62c65f1b707875 = (cb)=>typeof requestIdleCallback !== "undefined" ? new $30cfa57d44c60abe$var$Idle(requestIdleCallback(cb)) : $30cfa57d44c60abe$export$83e74882c5df8fe1(1000, cb);
const $30cfa57d44c60abe$export$21cd608c50c2ba31 = (timeout)=>{
    let timer = -1;
    return (f)=>{
        clearTimeout(timer);
        if (f) timer = /** @type {any} */ setTimeout(f, timeout);
    };
};

});

parcelRegister("7i7Pw", function(module, exports) {

$parcel$export(module.exports, "BOLD", () => $54f049bbb3754796$export$c1286c4c2a7c066);
$parcel$export(module.exports, "UNBOLD", () => $54f049bbb3754796$export$f0ce1666bb40789b);
$parcel$export(module.exports, "BLUE", () => $54f049bbb3754796$export$738c3b9a44c87ecc);
$parcel$export(module.exports, "GREY", () => $54f049bbb3754796$export$7d278ca694634874);
$parcel$export(module.exports, "GREEN", () => $54f049bbb3754796$export$48d4b2cd5bc0e88b);
$parcel$export(module.exports, "RED", () => $54f049bbb3754796$export$aa201224bb439d47);
$parcel$export(module.exports, "PURPLE", () => $54f049bbb3754796$export$7ffdeca4b2f927a2);
$parcel$export(module.exports, "ORANGE", () => $54f049bbb3754796$export$3de5e29ed1757f9b);
$parcel$export(module.exports, "UNCOLOR", () => $54f049bbb3754796$export$b586f81201748dd0);
$parcel$export(module.exports, "computeNoColorLoggingArgs", () => $54f049bbb3754796$export$3454091cc3c6c473);
$parcel$export(module.exports, "createModuleLogger", () => $54f049bbb3754796$export$c2977e725d59a2fd);

var $jPJFl = parcelRequire("jPJFl");

var $1oyOX = parcelRequire("1oyOX");

var $4ptg7 = parcelRequire("4ptg7");

var $kXTKb = parcelRequire("kXTKb");
const $54f049bbb3754796$export$c1286c4c2a7c066 = $jPJFl.create();
const $54f049bbb3754796$export$f0ce1666bb40789b = $jPJFl.create();
const $54f049bbb3754796$export$738c3b9a44c87ecc = $jPJFl.create();
const $54f049bbb3754796$export$7d278ca694634874 = $jPJFl.create();
const $54f049bbb3754796$export$48d4b2cd5bc0e88b = $jPJFl.create();
const $54f049bbb3754796$export$aa201224bb439d47 = $jPJFl.create();
const $54f049bbb3754796$export$7ffdeca4b2f927a2 = $jPJFl.create();
const $54f049bbb3754796$export$3de5e29ed1757f9b = $jPJFl.create();
const $54f049bbb3754796$export$b586f81201748dd0 = $jPJFl.create();
const $54f049bbb3754796$export$3454091cc3c6c473 = (args)=>{
    const strBuilder = [];
    const logArgs = [];
    // try with formatting until we find something unsupported
    let i = 0;
    for(; i < args.length; i++){
        const arg = args[i];
        if (arg.constructor === String || arg.constructor === Number) strBuilder.push(arg);
        else if (arg.constructor === Object) logArgs.push(JSON.stringify(arg));
    }
    return logArgs;
};
/* c8 ignore stop */ const $54f049bbb3754796$var$loggingColors = [
    $54f049bbb3754796$export$48d4b2cd5bc0e88b,
    $54f049bbb3754796$export$7ffdeca4b2f927a2,
    $54f049bbb3754796$export$3de5e29ed1757f9b,
    $54f049bbb3754796$export$738c3b9a44c87ecc
];
let $54f049bbb3754796$var$nextColor = 0;
let $54f049bbb3754796$var$lastLoggingTime = $1oyOX.getUnixTime();
const $54f049bbb3754796$export$c2977e725d59a2fd = (_print, moduleName)=>{
    const color = $54f049bbb3754796$var$loggingColors[$54f049bbb3754796$var$nextColor];
    const debugRegexVar = $4ptg7.getVariable("log");
    const doLogging = debugRegexVar !== null && (debugRegexVar === "*" || debugRegexVar === "true" || new RegExp(debugRegexVar, "gi").test(moduleName));
    $54f049bbb3754796$var$nextColor = ($54f049bbb3754796$var$nextColor + 1) % $54f049bbb3754796$var$loggingColors.length;
    moduleName += ": ";
    return !doLogging ? $kXTKb.nop : (...args)=>{
        const timeNow = $1oyOX.getUnixTime();
        const timeDiff = timeNow - $54f049bbb3754796$var$lastLoggingTime;
        $54f049bbb3754796$var$lastLoggingTime = timeNow;
        _print(color, moduleName, $54f049bbb3754796$export$b586f81201748dd0, ...args.map((arg)=>typeof arg === "string" || typeof arg === "symbol" ? arg : JSON.stringify(arg)), color, " +" + timeDiff + "ms");
    };
} /* c8 ignore stop */ ;

});
parcelRegister("jPJFl", function(module, exports) {

$parcel$export(module.exports, "create", () => $e7063406c7e815ce$export$185802fd694ee1f5);
/**
 * Utility module to work with EcmaScript Symbols.
 *
 * @module symbol
 */ /**
 * Return fresh symbol.
 *
 * @return {Symbol}
 */ const $e7063406c7e815ce$export$185802fd694ee1f5 = Symbol;
const $e7063406c7e815ce$export$a244864fd9645c7f = (s)=>typeof s === "symbol";

});



parcelRegister("aP2RX", function(module, exports) {

$parcel$export(module.exports, "iteratorFilter", () => $7e10e4909b63678f$export$88f0b2eef157f31a);
$parcel$export(module.exports, "iteratorMap", () => $7e10e4909b63678f$export$1570d514f543056a);
/**
 * Utility module to create and manipulate Iterators.
 *
 * @module iterator
 */ /**
 * @template T,R
 * @param {Iterator<T>} iterator
 * @param {function(T):R} f
 * @return {IterableIterator<R>}
 */ const $7e10e4909b63678f$export$68b1bda190f54159 = (iterator, f)=>({
        [Symbol.iterator] () {
            return this;
        },
        // @ts-ignore
        next () {
            const r = iterator.next();
            return {
                value: r.done ? undefined : f(r.value),
                done: r.done
            };
        }
    });
const $7e10e4909b63678f$export$7342c78d7e13e778 = (next)=>({
        /**
   * @return {IterableIterator<T>}
   */ [Symbol.iterator] () {
            return this;
        },
        next: // @ts-ignore
        next
    });
const $7e10e4909b63678f$export$88f0b2eef157f31a = (iterator, filter)=>$7e10e4909b63678f$export$7342c78d7e13e778(()=>{
        let res;
        do res = iterator.next();
        while (!res.done && !filter(res.value));
        return res;
    });
const $7e10e4909b63678f$export$1570d514f543056a = (iterator, fmap)=>$7e10e4909b63678f$export$7342c78d7e13e778(()=>{
        const { done: done, value: value } = iterator.next();
        return {
            done: done,
            value: done ? undefined : fmap(value)
        };
    });

});


parcelRegister("521T4", function(module, exports) {

$parcel$export(module.exports, "createId", () => $3a9e9a6a9f15cde8$export$7149c6ffc9994c32, (v) => $3a9e9a6a9f15cde8$export$7149c6ffc9994c32 = v);
var $3a9e9a6a9f15cde8$export$7149c6ffc9994c32;
var $3a9e9a6a9f15cde8$export$2cd8252107eb640b;
var $3a9e9a6a9f15cde8$export$27d7c37b6c928f6c;
var $3a9e9a6a9f15cde8$export$7c0d3461e37d4802;

var $lY118 = parcelRequire("lY118");
var $3a9e9a6a9f15cde8$require$createId = $lY118.createId;
var $3a9e9a6a9f15cde8$require$init = $lY118.init;
var $3a9e9a6a9f15cde8$require$getConstants = $lY118.getConstants;
var $3a9e9a6a9f15cde8$require$isCuid = $lY118.isCuid;
$3a9e9a6a9f15cde8$export$7149c6ffc9994c32 = $3a9e9a6a9f15cde8$require$createId;
$3a9e9a6a9f15cde8$export$2cd8252107eb640b = $3a9e9a6a9f15cde8$require$init;
$3a9e9a6a9f15cde8$export$27d7c37b6c928f6c = $3a9e9a6a9f15cde8$require$getConstants;
$3a9e9a6a9f15cde8$export$7c0d3461e37d4802 = $3a9e9a6a9f15cde8$require$isCuid;

});
parcelRegister("lY118", function(module, exports) {

$parcel$export(module.exports, "getConstants", () => $ffdffd93948a24a1$export$27d7c37b6c928f6c, (v) => $ffdffd93948a24a1$export$27d7c37b6c928f6c = v);
$parcel$export(module.exports, "init", () => $ffdffd93948a24a1$export$2cd8252107eb640b, (v) => $ffdffd93948a24a1$export$2cd8252107eb640b = v);
$parcel$export(module.exports, "createId", () => $ffdffd93948a24a1$export$7149c6ffc9994c32, (v) => $ffdffd93948a24a1$export$7149c6ffc9994c32 = v);
$parcel$export(module.exports, "isCuid", () => $ffdffd93948a24a1$export$7c0d3461e37d4802, (v) => $ffdffd93948a24a1$export$7c0d3461e37d4802 = v);
/* global global, window, module */ var $ffdffd93948a24a1$export$27d7c37b6c928f6c;
var $ffdffd93948a24a1$export$2cd8252107eb640b;
var $ffdffd93948a24a1$export$7149c6ffc9994c32;
var $ffdffd93948a24a1$export$ac46b70a1486f0ff;
var $ffdffd93948a24a1$export$75a8329092cf39d3;
var $ffdffd93948a24a1$export$6786084088a78b79;
var $ffdffd93948a24a1$export$7c0d3461e37d4802;

var $2r0RY = parcelRequire("2r0RY");
var $ffdffd93948a24a1$require$sha3 = $2r0RY.sha3_512;
const $ffdffd93948a24a1$var$defaultLength = 24;
const $ffdffd93948a24a1$var$bigLength = 32;
const $ffdffd93948a24a1$var$createEntropy = (length = 4, random = Math.random)=>{
    let entropy = "";
    while(entropy.length < length)entropy = entropy + Math.floor(random() * 36).toString(36);
    return entropy;
};
/*
 * Adapted from https://github.com/juanelas/bigint-conversion
 * MIT License Copyright (c) 2018 Juan Hernández Serrano
 */ function $ffdffd93948a24a1$var$bufToBigInt(buf) {
    let bits = 8n;
    let value = 0n;
    for (const i of buf.values()){
        const bi = BigInt(i);
        value = (value << bits) + bi;
    }
    return value;
}
const $ffdffd93948a24a1$var$hash = (input = "")=>{
    // Drop the first character because it will bias the histogram
    // to the left.
    return $ffdffd93948a24a1$var$bufToBigInt($ffdffd93948a24a1$require$sha3(input)).toString(36).slice(1);
};
const $ffdffd93948a24a1$var$alphabet = Array.from({
    length: 26
}, (x, i)=>String.fromCharCode(i + 97));
const $ffdffd93948a24a1$var$randomLetter = (random)=>$ffdffd93948a24a1$var$alphabet[Math.floor(random() * $ffdffd93948a24a1$var$alphabet.length)];
/*
This is a fingerprint of the host environment. It is used to help
prevent collisions when generating ids in a distributed system.
If no global object is available, you can pass in your own, or fall back
on a random string.
*/ const $ffdffd93948a24a1$var$createFingerprint = ({ globalObj: globalObj = typeof $parcel$global !== "undefined" ? $parcel$global : typeof window !== "undefined" ? window : {}, random: random = Math.random } = {})=>{
    const globals = Object.keys(globalObj).toString();
    const sourceString = globals.length ? globals + $ffdffd93948a24a1$var$createEntropy($ffdffd93948a24a1$var$bigLength, random) : $ffdffd93948a24a1$var$createEntropy($ffdffd93948a24a1$var$bigLength, random);
    return $ffdffd93948a24a1$var$hash(sourceString).substring(0, $ffdffd93948a24a1$var$bigLength);
};
const $ffdffd93948a24a1$var$createCounter = (count)=>()=>{
        return count++;
    };
// ~22k hosts before 50% chance of initial counter collision
// with a remaining counter range of 9.0e+15 in JavaScript.
const $ffdffd93948a24a1$var$initialCountMax = 476782367;
const $ffdffd93948a24a1$var$init = ({ random: // Fallback if the user does not pass in a CSPRNG. This should be OK
// because we don't rely solely on the random number generator for entropy.
// We also use the host fingerprint, current time, and a session counter.
random = Math.random, counter: counter = $ffdffd93948a24a1$var$createCounter(Math.floor(random() * $ffdffd93948a24a1$var$initialCountMax)), length: length = $ffdffd93948a24a1$var$defaultLength, fingerprint: fingerprint = $ffdffd93948a24a1$var$createFingerprint({
    random: random
}) } = {})=>{
    return function cuid2() {
        const firstLetter = $ffdffd93948a24a1$var$randomLetter(random);
        // If we're lucky, the `.toString(36)` calls may reduce hashing rounds
        // by shortening the input to the hash function a little.
        const time = Date.now().toString(36);
        const count = counter().toString(36);
        // The salt should be long enough to be globally unique across the full
        // length of the hash. For simplicity, we use the same length as the
        // intended id output.
        const salt = $ffdffd93948a24a1$var$createEntropy(length, random);
        const hashInput = `${time + salt + count + fingerprint}`;
        return `${firstLetter + $ffdffd93948a24a1$var$hash(hashInput).substring(1, length)}`;
    };
};
const $ffdffd93948a24a1$var$createId = $ffdffd93948a24a1$var$init();
const $ffdffd93948a24a1$var$isCuid = (id, { minLength: minLength = 2, maxLength: maxLength = $ffdffd93948a24a1$var$bigLength } = {})=>{
    const length = id.length;
    const regex = /^[0-9a-z]+$/;
    if (typeof id === "string" && length >= minLength && length <= maxLength && regex.test(id)) return true;
    return false;
};
$ffdffd93948a24a1$export$27d7c37b6c928f6c = ()=>({
        defaultLength: $ffdffd93948a24a1$var$defaultLength,
        bigLength: $ffdffd93948a24a1$var$bigLength
    });
$ffdffd93948a24a1$export$2cd8252107eb640b = $ffdffd93948a24a1$var$init;
$ffdffd93948a24a1$export$7149c6ffc9994c32 = $ffdffd93948a24a1$var$createId;
$ffdffd93948a24a1$export$ac46b70a1486f0ff = $ffdffd93948a24a1$var$bufToBigInt;
$ffdffd93948a24a1$export$75a8329092cf39d3 = $ffdffd93948a24a1$var$createCounter;
$ffdffd93948a24a1$export$6786084088a78b79 = $ffdffd93948a24a1$var$createFingerprint;
$ffdffd93948a24a1$export$7c0d3461e37d4802 = $ffdffd93948a24a1$var$isCuid;

});


parcelRegister("dJKat", function(module, exports) {

$parcel$export(module.exports, "fillID", () => $863b504e647e5125$export$93aad268b4d4f562);

var $521T4 = parcelRequire("521T4");
const $863b504e647e5125$export$93aad268b4d4f562 = (object, modify, currentDepth)=>{
    const _depth = (currentDepth || 0) + 1;
    if (modify) {
        if (modify(object)) object.id = (0, $521T4.createId)();
    } else object.id = (0, $521T4.createId)();
    if (object.type === "item" && object.component && object.component.id && object.component.props) {
        for (const p of Object.values(object.component.props))if (p.meta?.type === "content-element" && p.content) $863b504e647e5125$export$93aad268b4d4f562(p.content, modify, _depth);
    }
    if (object.type !== "text") {
        if (object.childs && Array.isArray(object.childs)) for (const child of object.childs)$863b504e647e5125$export$93aad268b4d4f562(child, modify, _depth);
    }
    return object;
};

});

parcelRegister("hcv18", function(module, exports) {
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */ /** Used as the `TypeError` message for "Functions" methods. */ var $c85b9e112892561d$var$FUNC_ERROR_TEXT = "Expected a function";
/** Used as references for various `Number` constants. */ var $c85b9e112892561d$var$NAN = 0 / 0;
/** `Object#toString` result references. */ var $c85b9e112892561d$var$symbolTag = "[object Symbol]";
/** Used to match leading and trailing whitespace. */ var $c85b9e112892561d$var$reTrim = /^\s+|\s+$/g;
/** Used to detect bad signed hexadecimal string values. */ var $c85b9e112892561d$var$reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
/** Used to detect binary string values. */ var $c85b9e112892561d$var$reIsBinary = /^0b[01]+$/i;
/** Used to detect octal string values. */ var $c85b9e112892561d$var$reIsOctal = /^0o[0-7]+$/i;
/** Built-in method references without a dependency on `root`. */ var $c85b9e112892561d$var$freeParseInt = parseInt;
/** Detect free variable `global` from Node.js. */ var $c85b9e112892561d$var$freeGlobal = typeof $parcel$global == "object" && $parcel$global && $parcel$global.Object === Object && $parcel$global;
/** Detect free variable `self`. */ var $c85b9e112892561d$var$freeSelf = typeof self == "object" && self && self.Object === Object && self;
/** Used as a reference to the global object. */ var $c85b9e112892561d$var$root = $c85b9e112892561d$var$freeGlobal || $c85b9e112892561d$var$freeSelf || Function("return this")();
/** Used for built-in method references. */ var $c85b9e112892561d$var$objectProto = Object.prototype;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */ var $c85b9e112892561d$var$objectToString = $c85b9e112892561d$var$objectProto.toString;
/* Built-in method references for those with the same name as other `lodash` methods. */ var $c85b9e112892561d$var$nativeMax = Math.max, $c85b9e112892561d$var$nativeMin = Math.min;
/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */ var $c85b9e112892561d$var$now = function() {
    return $c85b9e112892561d$var$root.Date.now();
};
/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */ function $c85b9e112892561d$var$debounce(func, wait, options) {
    var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
    if (typeof func != "function") throw new TypeError($c85b9e112892561d$var$FUNC_ERROR_TEXT);
    wait = $c85b9e112892561d$var$toNumber(wait) || 0;
    if ($c85b9e112892561d$var$isObject(options)) {
        leading = !!options.leading;
        maxing = "maxWait" in options;
        maxWait = maxing ? $c85b9e112892561d$var$nativeMax($c85b9e112892561d$var$toNumber(options.maxWait) || 0, wait) : maxWait;
        trailing = "trailing" in options ? !!options.trailing : trailing;
    }
    function invokeFunc(time) {
        var args = lastArgs, thisArg = lastThis;
        lastArgs = lastThis = undefined;
        lastInvokeTime = time;
        result = func.apply(thisArg, args);
        return result;
    }
    function leadingEdge(time) {
        // Reset any `maxWait` timer.
        lastInvokeTime = time;
        // Start the timer for the trailing edge.
        timerId = setTimeout(timerExpired, wait);
        // Invoke the leading edge.
        return leading ? invokeFunc(time) : result;
    }
    function remainingWait(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, result = wait - timeSinceLastCall;
        return maxing ? $c85b9e112892561d$var$nativeMin(result, maxWait - timeSinceLastInvoke) : result;
    }
    function shouldInvoke(time) {
        var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
        // Either this is the first call, activity has stopped and we're at the
        // trailing edge, the system time has gone backwards and we're treating
        // it as the trailing edge, or we've hit the `maxWait` limit.
        return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
    }
    function timerExpired() {
        var time = $c85b9e112892561d$var$now();
        if (shouldInvoke(time)) return trailingEdge(time);
        // Restart the timer.
        timerId = setTimeout(timerExpired, remainingWait(time));
    }
    function trailingEdge(time) {
        timerId = undefined;
        // Only invoke if we have `lastArgs` which means `func` has been
        // debounced at least once.
        if (trailing && lastArgs) return invokeFunc(time);
        lastArgs = lastThis = undefined;
        return result;
    }
    function cancel() {
        if (timerId !== undefined) clearTimeout(timerId);
        lastInvokeTime = 0;
        lastArgs = lastCallTime = lastThis = timerId = undefined;
    }
    function flush() {
        return timerId === undefined ? result : trailingEdge($c85b9e112892561d$var$now());
    }
    function debounced() {
        var time = $c85b9e112892561d$var$now(), isInvoking = shouldInvoke(time);
        lastArgs = arguments;
        lastThis = this;
        lastCallTime = time;
        if (isInvoking) {
            if (timerId === undefined) return leadingEdge(lastCallTime);
            if (maxing) {
                // Handle invocations in a tight loop.
                timerId = setTimeout(timerExpired, wait);
                return invokeFunc(lastCallTime);
            }
        }
        if (timerId === undefined) timerId = setTimeout(timerExpired, wait);
        return result;
    }
    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
}
/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */ function $c85b9e112892561d$var$throttle(func, wait, options) {
    var leading = true, trailing = true;
    if (typeof func != "function") throw new TypeError($c85b9e112892561d$var$FUNC_ERROR_TEXT);
    if ($c85b9e112892561d$var$isObject(options)) {
        leading = "leading" in options ? !!options.leading : leading;
        trailing = "trailing" in options ? !!options.trailing : trailing;
    }
    return $c85b9e112892561d$var$debounce(func, wait, {
        "leading": leading,
        "maxWait": wait,
        "trailing": trailing
    });
}
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */ function $c85b9e112892561d$var$isObject(value) {
    var type = typeof value;
    return !!value && (type == "object" || type == "function");
}
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */ function $c85b9e112892561d$var$isObjectLike(value) {
    return !!value && typeof value == "object";
}
/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */ function $c85b9e112892561d$var$isSymbol(value) {
    return typeof value == "symbol" || $c85b9e112892561d$var$isObjectLike(value) && $c85b9e112892561d$var$objectToString.call(value) == $c85b9e112892561d$var$symbolTag;
}
/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */ function $c85b9e112892561d$var$toNumber(value) {
    if (typeof value == "number") return value;
    if ($c85b9e112892561d$var$isSymbol(value)) return $c85b9e112892561d$var$NAN;
    if ($c85b9e112892561d$var$isObject(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = $c85b9e112892561d$var$isObject(other) ? other + "" : other;
    }
    if (typeof value != "string") return value === 0 ? value : +value;
    value = value.replace($c85b9e112892561d$var$reTrim, "");
    var isBinary = $c85b9e112892561d$var$reIsBinary.test(value);
    return isBinary || $c85b9e112892561d$var$reIsOctal.test(value) ? $c85b9e112892561d$var$freeParseInt(value.slice(2), isBinary ? 2 : 8) : $c85b9e112892561d$var$reIsBadHex.test(value) ? $c85b9e112892561d$var$NAN : +value;
}
module.exports = $c85b9e112892561d$var$throttle;

});

parcelRegister("2dQRB", function(module, exports) {
// Copyright (c) 2013 Pieroxy <pieroxy@pieroxy.net>
// This work is free. You can redistribute it and/or modify it
// under the terms of the WTFPL, Version 2
// For more information see LICENSE.txt or http://www.wtfpl.net/
//
// For more information, the home page:
// http://pieroxy.net/blog/pages/lz-string/testing.html
//
// LZ-based compression algorithm, version 1.4.5
var LZString = function() {
    // private property
    var f = String.fromCharCode;
    var keyStrBase64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
    var baseReverseDic = {};
    function getBaseValue(alphabet, character) {
        if (!baseReverseDic[alphabet]) {
            baseReverseDic[alphabet] = {};
            for(var i = 0; i < alphabet.length; i++)baseReverseDic[alphabet][alphabet.charAt(i)] = i;
        }
        return baseReverseDic[alphabet][character];
    }
    var LZString = {
        compressToBase64: function(input) {
            if (input == null) return "";
            var res = LZString._compress(input, 6, function(a) {
                return keyStrBase64.charAt(a);
            });
            switch(res.length % 4){
                default:
                case 0:
                    return res;
                case 1:
                    return res + "===";
                case 2:
                    return res + "==";
                case 3:
                    return res + "=";
            }
        },
        decompressFromBase64: function(input) {
            if (input == null) return "";
            if (input == "") return null;
            return LZString._decompress(input.length, 32, function(index) {
                return getBaseValue(keyStrBase64, input.charAt(index));
            });
        },
        compressToUTF16: function(input) {
            if (input == null) return "";
            return LZString._compress(input, 15, function(a) {
                return f(a + 32);
            }) + " ";
        },
        decompressFromUTF16: function(compressed) {
            if (compressed == null) return "";
            if (compressed == "") return null;
            return LZString._decompress(compressed.length, 16384, function(index) {
                return compressed.charCodeAt(index) - 32;
            });
        },
        //compress into uint8array (UCS-2 big endian format)
        compressToUint8Array: function(uncompressed) {
            var compressed = LZString.compress(uncompressed);
            var buf = new Uint8Array(compressed.length * 2); // 2 bytes per character
            for(var i = 0, TotalLen = compressed.length; i < TotalLen; i++){
                var current_value = compressed.charCodeAt(i);
                buf[i * 2] = current_value >>> 8;
                buf[i * 2 + 1] = current_value % 256;
            }
            return buf;
        },
        //decompress from uint8array (UCS-2 big endian format)
        decompressFromUint8Array: function(compressed) {
            if (compressed === null || compressed === undefined) return LZString.decompress(compressed);
            else {
                var buf = new Array(compressed.length / 2); // 2 bytes per character
                for(var i = 0, TotalLen = buf.length; i < TotalLen; i++)buf[i] = compressed[i * 2] * 256 + compressed[i * 2 + 1];
                var result = [];
                buf.forEach(function(c) {
                    result.push(f(c));
                });
                return LZString.decompress(result.join(""));
            }
        },
        //compress into a string that is already URI encoded
        compressToEncodedURIComponent: function(input) {
            if (input == null) return "";
            return LZString._compress(input, 6, function(a) {
                return keyStrUriSafe.charAt(a);
            });
        },
        //decompress from an output of compressToEncodedURIComponent
        decompressFromEncodedURIComponent: function(input) {
            if (input == null) return "";
            if (input == "") return null;
            input = input.replace(/ /g, "+");
            return LZString._decompress(input.length, 32, function(index) {
                return getBaseValue(keyStrUriSafe, input.charAt(index));
            });
        },
        compress: function(uncompressed) {
            return LZString._compress(uncompressed, 16, function(a) {
                return f(a);
            });
        },
        _compress: function(uncompressed, bitsPerChar, getCharFromInt) {
            if (uncompressed == null) return "";
            var i, value, context_dictionary = {}, context_dictionaryToCreate = {}, context_c = "", context_wc = "", context_w = "", context_enlargeIn = 2, context_dictSize = 3, context_numBits = 2, context_data = [], context_data_val = 0, context_data_position = 0, ii;
            for(ii = 0; ii < uncompressed.length; ii += 1){
                context_c = uncompressed.charAt(ii);
                if (!Object.prototype.hasOwnProperty.call(context_dictionary, context_c)) {
                    context_dictionary[context_c] = context_dictSize++;
                    context_dictionaryToCreate[context_c] = true;
                }
                context_wc = context_w + context_c;
                if (Object.prototype.hasOwnProperty.call(context_dictionary, context_wc)) context_w = context_wc;
                else {
                    if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
                        if (context_w.charCodeAt(0) < 256) {
                            for(i = 0; i < context_numBits; i++){
                                context_data_val = context_data_val << 1;
                                if (context_data_position == bitsPerChar - 1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else context_data_position++;
                            }
                            value = context_w.charCodeAt(0);
                            for(i = 0; i < 8; i++){
                                context_data_val = context_data_val << 1 | value & 1;
                                if (context_data_position == bitsPerChar - 1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else context_data_position++;
                                value = value >> 1;
                            }
                        } else {
                            value = 1;
                            for(i = 0; i < context_numBits; i++){
                                context_data_val = context_data_val << 1 | value;
                                if (context_data_position == bitsPerChar - 1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else context_data_position++;
                                value = 0;
                            }
                            value = context_w.charCodeAt(0);
                            for(i = 0; i < 16; i++){
                                context_data_val = context_data_val << 1 | value & 1;
                                if (context_data_position == bitsPerChar - 1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else context_data_position++;
                                value = value >> 1;
                            }
                        }
                        context_enlargeIn--;
                        if (context_enlargeIn == 0) {
                            context_enlargeIn = Math.pow(2, context_numBits);
                            context_numBits++;
                        }
                        delete context_dictionaryToCreate[context_w];
                    } else {
                        value = context_dictionary[context_w];
                        for(i = 0; i < context_numBits; i++){
                            context_data_val = context_data_val << 1 | value & 1;
                            if (context_data_position == bitsPerChar - 1) {
                                context_data_position = 0;
                                context_data.push(getCharFromInt(context_data_val));
                                context_data_val = 0;
                            } else context_data_position++;
                            value = value >> 1;
                        }
                    }
                    context_enlargeIn--;
                    if (context_enlargeIn == 0) {
                        context_enlargeIn = Math.pow(2, context_numBits);
                        context_numBits++;
                    }
                    // Add wc to the dictionary.
                    context_dictionary[context_wc] = context_dictSize++;
                    context_w = String(context_c);
                }
            }
            // Output the code for w.
            if (context_w !== "") {
                if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate, context_w)) {
                    if (context_w.charCodeAt(0) < 256) {
                        for(i = 0; i < context_numBits; i++){
                            context_data_val = context_data_val << 1;
                            if (context_data_position == bitsPerChar - 1) {
                                context_data_position = 0;
                                context_data.push(getCharFromInt(context_data_val));
                                context_data_val = 0;
                            } else context_data_position++;
                        }
                        value = context_w.charCodeAt(0);
                        for(i = 0; i < 8; i++){
                            context_data_val = context_data_val << 1 | value & 1;
                            if (context_data_position == bitsPerChar - 1) {
                                context_data_position = 0;
                                context_data.push(getCharFromInt(context_data_val));
                                context_data_val = 0;
                            } else context_data_position++;
                            value = value >> 1;
                        }
                    } else {
                        value = 1;
                        for(i = 0; i < context_numBits; i++){
                            context_data_val = context_data_val << 1 | value;
                            if (context_data_position == bitsPerChar - 1) {
                                context_data_position = 0;
                                context_data.push(getCharFromInt(context_data_val));
                                context_data_val = 0;
                            } else context_data_position++;
                            value = 0;
                        }
                        value = context_w.charCodeAt(0);
                        for(i = 0; i < 16; i++){
                            context_data_val = context_data_val << 1 | value & 1;
                            if (context_data_position == bitsPerChar - 1) {
                                context_data_position = 0;
                                context_data.push(getCharFromInt(context_data_val));
                                context_data_val = 0;
                            } else context_data_position++;
                            value = value >> 1;
                        }
                    }
                    context_enlargeIn--;
                    if (context_enlargeIn == 0) {
                        context_enlargeIn = Math.pow(2, context_numBits);
                        context_numBits++;
                    }
                    delete context_dictionaryToCreate[context_w];
                } else {
                    value = context_dictionary[context_w];
                    for(i = 0; i < context_numBits; i++){
                        context_data_val = context_data_val << 1 | value & 1;
                        if (context_data_position == bitsPerChar - 1) {
                            context_data_position = 0;
                            context_data.push(getCharFromInt(context_data_val));
                            context_data_val = 0;
                        } else context_data_position++;
                        value = value >> 1;
                    }
                }
                context_enlargeIn--;
                if (context_enlargeIn == 0) {
                    context_enlargeIn = Math.pow(2, context_numBits);
                    context_numBits++;
                }
            }
            // Mark the end of the stream
            value = 2;
            for(i = 0; i < context_numBits; i++){
                context_data_val = context_data_val << 1 | value & 1;
                if (context_data_position == bitsPerChar - 1) {
                    context_data_position = 0;
                    context_data.push(getCharFromInt(context_data_val));
                    context_data_val = 0;
                } else context_data_position++;
                value = value >> 1;
            }
            // Flush the last char
            while(true){
                context_data_val = context_data_val << 1;
                if (context_data_position == bitsPerChar - 1) {
                    context_data.push(getCharFromInt(context_data_val));
                    break;
                } else context_data_position++;
            }
            return context_data.join("");
        },
        decompress: function(compressed) {
            if (compressed == null) return "";
            if (compressed == "") return null;
            return LZString._decompress(compressed.length, 32768, function(index) {
                return compressed.charCodeAt(index);
            });
        },
        _decompress: function(length, resetValue, getNextValue) {
            var dictionary = [], next, enlargeIn = 4, dictSize = 4, numBits = 3, entry = "", result = [], i, w, bits, resb, maxpower, power, c, data = {
                val: getNextValue(0),
                position: resetValue,
                index: 1
            };
            for(i = 0; i < 3; i += 1)dictionary[i] = i;
            bits = 0;
            maxpower = Math.pow(2, 2);
            power = 1;
            while(power != maxpower){
                resb = data.val & data.position;
                data.position >>= 1;
                if (data.position == 0) {
                    data.position = resetValue;
                    data.val = getNextValue(data.index++);
                }
                bits |= (resb > 0 ? 1 : 0) * power;
                power <<= 1;
            }
            switch(next = bits){
                case 0:
                    bits = 0;
                    maxpower = Math.pow(2, 8);
                    power = 1;
                    while(power != maxpower){
                        resb = data.val & data.position;
                        data.position >>= 1;
                        if (data.position == 0) {
                            data.position = resetValue;
                            data.val = getNextValue(data.index++);
                        }
                        bits |= (resb > 0 ? 1 : 0) * power;
                        power <<= 1;
                    }
                    c = f(bits);
                    break;
                case 1:
                    bits = 0;
                    maxpower = Math.pow(2, 16);
                    power = 1;
                    while(power != maxpower){
                        resb = data.val & data.position;
                        data.position >>= 1;
                        if (data.position == 0) {
                            data.position = resetValue;
                            data.val = getNextValue(data.index++);
                        }
                        bits |= (resb > 0 ? 1 : 0) * power;
                        power <<= 1;
                    }
                    c = f(bits);
                    break;
                case 2:
                    return "";
            }
            dictionary[3] = c;
            w = c;
            result.push(c);
            while(true){
                if (data.index > length) return "";
                bits = 0;
                maxpower = Math.pow(2, numBits);
                power = 1;
                while(power != maxpower){
                    resb = data.val & data.position;
                    data.position >>= 1;
                    if (data.position == 0) {
                        data.position = resetValue;
                        data.val = getNextValue(data.index++);
                    }
                    bits |= (resb > 0 ? 1 : 0) * power;
                    power <<= 1;
                }
                switch(c = bits){
                    case 0:
                        bits = 0;
                        maxpower = Math.pow(2, 8);
                        power = 1;
                        while(power != maxpower){
                            resb = data.val & data.position;
                            data.position >>= 1;
                            if (data.position == 0) {
                                data.position = resetValue;
                                data.val = getNextValue(data.index++);
                            }
                            bits |= (resb > 0 ? 1 : 0) * power;
                            power <<= 1;
                        }
                        dictionary[dictSize++] = f(bits);
                        c = dictSize - 1;
                        enlargeIn--;
                        break;
                    case 1:
                        bits = 0;
                        maxpower = Math.pow(2, 16);
                        power = 1;
                        while(power != maxpower){
                            resb = data.val & data.position;
                            data.position >>= 1;
                            if (data.position == 0) {
                                data.position = resetValue;
                                data.val = getNextValue(data.index++);
                            }
                            bits |= (resb > 0 ? 1 : 0) * power;
                            power <<= 1;
                        }
                        dictionary[dictSize++] = f(bits);
                        c = dictSize - 1;
                        enlargeIn--;
                        break;
                    case 2:
                        return result.join("");
                }
                if (enlargeIn == 0) {
                    enlargeIn = Math.pow(2, numBits);
                    numBits++;
                }
                if (dictionary[c]) entry = dictionary[c];
                else {
                    if (c === dictSize) entry = w + w.charAt(0);
                    else return null;
                }
                result.push(entry);
                // Add w+entry[0] to the dictionary.
                dictionary[dictSize++] = w + entry.charAt(0);
                enlargeIn--;
                w = entry;
                if (enlargeIn == 0) {
                    enlargeIn = Math.pow(2, numBits);
                    numBits++;
                }
            }
        }
    };
    return LZString;
}();
if (typeof define === "function" && define.amd) define(function() {
    return LZString;
});
else if (module != null) module.exports = LZString;
else if (typeof angular !== "undefined" && angular != null) angular.module("LZString", []).factory("LZString", function() {
    return LZString;
});

});

parcelRegister("ets8e", function(module, exports) {

$parcel$export(module.exports, "defaultLoader", () => $44ee704156da3167$export$68251d7daaae34cc);

var $hDTLn = parcelRequire("hDTLn");
const $44ee704156da3167$export$68251d7daaae34cc = {
    async site (_, where) {
        const site = await db.site.findFirst({
            where: where,
            select: {
                id: true,
                config: true,
                domain: true,
                name: true,
                js: true,
                responsive: true,
                js_compiled: true
            }
        });
        if (!site) return null;
        const cgroups = await db.site_use_comp.findMany({
            where: {
                id_site: site.id
            },
            select: {
                use_id_site: true
            }
        });
        if (cgroups) {
            site.cgroup_ids = [];
            for (const id of cgroups.map((c)=>c.use_id_site))site.cgroup_ids.push(id);
        }
        const layout = await db.page.findFirst({
            where: {
                id_site: site.id,
                name: {
                    startsWith: "layout:"
                },
                is_default_layout: true,
                is_deleted: false
            },
            select: {
                content_tree: true,
                id: true
            }
        });
        if (layout) {
            const childs = layout.content_tree.childs;
            if (childs && childs.length > 0) {
                site.layout = childs[0];
                site.layout_id = layout.id;
            }
        }
        return site;
    },
    async comp (p, comp_id) {
        p.comps.pending[comp_id] = new Promise(async (resolve)=>{
            p.comps.resolve[comp_id] = async (comp)=>{
                resolve(comp);
            };
            await (0, $hDTLn.wsend)(p, JSON.stringify({
                type: "get_comp",
                comp_id: comp_id
            }));
        });
        return p.comps.pending[comp_id];
    },
    npm (p, type, id) {
        if (type === "site") return `${serverurl}/npm/site/${id}/site.js`;
        else if (type === "page") return `${serverurl}/npm/page/${id}/page.js`;
        return null;
    },
    async page (p, id) {
        const res = await db.page.findFirst({
            where: {
                id: id,
                name: {
                    not: {
                        startsWith: "layout:"
                    }
                }
            },
            select: {
                id: true,
                url: true,
                name: true,
                content_tree: true,
                js_compiled: true
            }
        });
        let page;
        if (res) {
            page = {
                id: res.id,
                content_tree: res.content_tree,
                js: res.js_compiled,
                name: res.name,
                url: res.url
            };
            return page;
        }
        return null;
    },
    async pages (p, site_id) {
        return await db.page.findMany({
            where: {
                id_site: site_id,
                name: {
                    not: {
                        startsWith: "layout:"
                    }
                },
                is_deleted: false
            },
            select: {
                id: true,
                url: true
            }
        });
    }
};

});
parcelRegister("hDTLn", function(module, exports) {

$parcel$export(module.exports, "liveWS", () => $88c6618719289c98$export$cb4989c53149ada1);
$parcel$export(module.exports, "wsend", () => $88c6618719289c98$export$1c628460797788d0);

var $hcv18 = parcelRequire("hcv18");

var $2dQRB = parcelRequire("2dQRB");

var $aVHaH = parcelRequire("aVHaH");

var $fcu5c = parcelRequire("fcu5c");

var $bxUNj = parcelRequire("bxUNj");
const $88c6618719289c98$export$cb4989c53149ada1 = async (p)=>{
    return new Promise(async (resolve)=>{
        const wsurl = new URL(serverurl);
        wsurl.protocol = wsurl.protocol.startsWith("http:") ? "ws:" : "wss:";
        if (p.wsRetry.localIP && [
            "localhost",
            "127.0.0.1"
        ].includes(wsurl.hostname)) {
            const ips = await api.local_ip();
            wsurl.hostname = ips[0];
        }
        wsurl.pathname = "/edit";
        if (p.ws && p.ws.readyState === p.ws.OPEN) {
            resolve();
            return;
        }
        p.ws = new WebSocket(wsurl);
        const ws = p.ws;
        if (ws) {
            const retry = (e)=>{
                if (p.wsRetry.disabled) return;
                p.wsRetry.reconnecting = true;
                p.wsRetry.localIP = true;
                if (p.wsRetry.fast) $88c6618719289c98$export$cb4989c53149ada1(p);
                else setTimeout(()=>{
                    console.log("Reconnecting...");
                    $88c6618719289c98$export$cb4989c53149ada1(p);
                }, 2000);
            };
            ws.addEventListener("error", retry);
            ws.addEventListener("close", retry);
            ws.addEventListener("open", ()=>{
                if (p.wsRetry.reconnecting) {
                    p.wsRetry.reconnecting = false;
                    console.log("Connected");
                }
                resolve();
            });
            ws.addEventListener("message", async (e)=>{
                const msg = JSON.parse(e.data);
                switch(msg.type){
                    case "get_page":
                        break;
                    case "set_page":
                        if (p.mpage) p.mpage.destroy();
                        p.mpage = await $88c6618719289c98$var$setPage(msg);
                        p.mpage.on("update", (0, (/*@__PURE__*/$parcel$interopDefault($hcv18)))((e, origin)=>{
                            if (p.mpage) {
                                p.page = p.mpage.getMap("map").toJSON();
                                console.clear();
                                console.log(`\u{1F525} Page updated: ${p.page?.url} ${new Date().toLocaleString()}`);
                            }
                        }));
                        p.page = p.mpage.getMap("map").toJSON();
                        if (p.mpageLoaded) {
                            p.mpageLoaded(p.mpage);
                            p.mpageLoaded = null;
                        }
                        break;
                    case "sv_local":
                        $88c6618719289c98$var$svLocal({
                            p: p,
                            bin: $88c6618719289c98$var$extract(msg.sv_local),
                            msg: msg
                        });
                        break;
                    case "svd_remote":
                        $88c6618719289c98$var$svdRemote({
                            p: p,
                            bin: $88c6618719289c98$var$extract(msg.diff_remote),
                            msg: msg
                        });
                        p.treeMeta = {};
                        (0, $fcu5c.rebuildTree)(p, {
                            note: "page-changed"
                        });
                        break;
                    case "diff_local":
                        if (msg.mode === "page") $aVHaH.applyUpdate(p.mpage, $88c6618719289c98$var$extract(msg.diff_local), "remote");
                        if (msg.mode === "comp") $aVHaH.applyUpdate(p.comps.doc[msg.id], $88c6618719289c98$var$extract(msg.diff_local), "remote");
                        break;
                    case "set_comp":
                        {
                            const callback = p.comps.resolve[msg.comp_id];
                            if (callback) {
                                p.comps.doc[msg.comp_id] = new $aVHaH.Doc();
                                $aVHaH.applyUpdate(p.comps.doc[msg.comp_id], $88c6618719289c98$var$extract(msg.changes), "remote");
                                setTimeout(()=>{
                                    p.comps.doc[msg.comp_id].on("update", (0, (/*@__PURE__*/$parcel$interopDefault($hcv18)))((e, origin)=>{
                                        if (origin === "remote") return;
                                        const doc = p.comps.doc[msg.comp_id];
                                        if (doc) {
                                            if (!origin && origin !== "updated_at") {
                                                const id = doc.getMap("map").get("id");
                                                if (id) {
                                                    doc.transact(()=>{
                                                        doc.getMap("map").set("updated_at", new Date().toISOString());
                                                    }, "updated_at");
                                                    const sendmsg = {
                                                        type: "sv_local",
                                                        mode: "comp",
                                                        id: id,
                                                        sv_local: (0, $2dQRB.compress)($aVHaH.encodeStateVector(doc).toString())
                                                    };
                                                    $88c6618719289c98$export$1c628460797788d0(p, JSON.stringify(sendmsg));
                                                }
                                            }
                                        }
                                    }, 200));
                                }, 500);
                                const comp = p.comps.doc[msg.comp_id].getMap("map").get("content_tree")?.toJSON();
                                const ids = new Set();
                                (0, $bxUNj.scanComponent)(comp, ids);
                                callback(p.comps.doc[msg.comp_id].getMap("map").toJSON());
                                delete p.comps.pending[msg.comp_id];
                                delete p.comps.resolve[msg.comp_id];
                            }
                        }
                        break;
                    case "undo":
                    case "redo":
                    case "new_comp":
                    case "get_comp":
                }
            });
            ws.addEventListener("open", ()=>{
                p.wsRetry.disabled = false;
            });
        }
    });
};
const $88c6618719289c98$var$extract = (str)=>{
    return Uint8Array.from((0, $2dQRB.decompress)(str).split(",").map((x)=>parseInt(x, 10)));
};
const $88c6618719289c98$var$svLocal = async (arg)=>{
    const { bin: bin, msg: msg, p: p } = arg;
    const { id: id, mode: mode, type: type } = msg;
    let doc = null;
    if (mode === "page") doc = p.mpage;
    if (mode === "comp") doc = p.comps.doc[id];
    if (!doc) return;
    const diff_remote = $aVHaH.encodeStateAsUpdate(doc, bin);
    const sv_remote = $aVHaH.encodeStateVector(doc);
    const sendmsg = {
        diff_remote: (0, $2dQRB.compress)(diff_remote.toString()),
        sv_remote: (0, $2dQRB.compress)(sv_remote.toString()),
        id: id,
        mode: mode,
        type: type
    };
    await $88c6618719289c98$export$1c628460797788d0(p, JSON.stringify(sendmsg));
};
const $88c6618719289c98$var$svdRemote = async (arg)=>{
    const { bin: bin, msg: msg, p: p } = arg;
    const { id: id, mode: mode, type: type } = msg;
    const sv_remote = Uint8Array.from((0, $2dQRB.decompress)(msg.sv_remote).split(",").map((x)=>parseInt(x, 10)));
    const diff_remote = Uint8Array.from((0, $2dQRB.decompress)(msg.diff_remote).split(",").map((x)=>parseInt(x, 10)));
    const sendDoc = async (doc)=>{
        const diff_local = $aVHaH.encodeStateAsUpdate(doc, sv_remote);
        $aVHaH.applyUpdate(doc, diff_remote, "local");
        const sendmsg = {
            type: "diff_local",
            mode: msg.mode,
            id: msg.id,
            diff_local: (0, $2dQRB.compress)(diff_local.toString())
        };
        await $88c6618719289c98$export$1c628460797788d0(p, JSON.stringify(sendmsg));
    };
    let doc = null;
    if (mode === "page") doc = p.mpage;
    if (mode === "comp") doc = p.comps.doc[id];
    if (!doc) return;
    sendDoc(doc);
};
const $88c6618719289c98$export$1c628460797788d0 = async (local, payload)=>{
    const ws = local.ws;
    if (ws) {
        if (ws.readyState !== ws.OPEN) await new Promise((resolve)=>{
            const ival = setInterval(()=>{
                if (ws.readyState === ws.OPEN) {
                    clearInterval(ival);
                    resolve();
                }
            }, 50);
        });
        ws.send(payload);
    }
};
const $88c6618719289c98$var$setPage = async (msg)=>{
    const page = Uint8Array.from((0, $2dQRB.decompress)(msg.changes).split(",").map((x)=>parseInt(x, 10)));
    const doc = new $aVHaH.Doc();
    $aVHaH.applyUpdate(doc, page, "remote");
    return doc;
};

});
parcelRegister("fcu5c", function(module, exports) {

$parcel$export(module.exports, "rebuildTree", () => $feb1a0b7ed736546$export$3df45f41acd9f45f);

var $cc0Z8 = parcelRequire("cc0Z8");

var $bxUNj = parcelRequire("bxUNj");
const $feb1a0b7ed736546$export$3df45f41acd9f45f = async (p, _)=>{
    const treeMeta = p.treeMeta;
    if (p.page) {
        let childs = Object.values(p.page.content_tree.childs || []);
        if (p.layout.section && p.layout.content && !p.page?.name.startsWith("layout:")) {
            childs = [
                p.layout.section
            ];
            p.layout.content.type = "item";
            if (p.layout.content.type === "item") p.layout.content.childs = p.page.content_tree.childs.map((e)=>({
                    ...e,
                    type: "item"
                }));
        }
        await Promise.all(childs.map(async (item, idx)=>{
            await $feb1a0b7ed736546$var$walk(p, {
                treeMeta: treeMeta,
                item: item,
                parent_id: "root",
                idx: idx
            });
        }) || []);
    }
    if (_.render !== false) {
        console.log("rendering");
        p.render();
    }
};
const $feb1a0b7ed736546$var$walk = async (p, val)=>{
    const treeMeta = val.treeMeta;
    let item = val.item;
    if (val.parent_comp) {
        const pchild_ids = val.parent_comp.comp?.child_ids;
        if (pchild_ids && item.originalId) {
            if (pchild_ids[item.originalId]) item.id = pchild_ids[item.originalId];
        }
    }
    if (item) {
        let comp = undefined;
        if (item.type === "item" && item.component?.id) comp = {
            id: item.component.id,
            child_ids: {},
            mcomp: p.prod ? undefined : p.comps.doc[item.component.id]?.getMap("map").get("content_tree")
        };
        const meta = {
            item: item,
            parent_id: val.parent_id,
            parent_comp: val.parent_comp,
            className: (0, $cc0Z8.produceCSS)(item, {
                mode: p.mode
            }),
            comp: comp
        };
        treeMeta[meta.item.id] = meta;
        if (item.type === "item" && item.component?.id) {
            const cid = item.component.id;
            if (p.prod) {
                let comp = p.comps.all[cid];
                if (!comp) {
                    await (0, $bxUNj.loadComponent)(p, cid);
                    comp = p.comps.all[cid];
                }
                if (comp) {
                    if (!p.compInstance[item.id]) p.compInstance[item.id] = {};
                    const child_ids = p.compInstance[item.id];
                    const itemnew = (0, $bxUNj.instantiateComp)(p, item, {
                        type: "i",
                        item: comp
                    }, child_ids);
                    for (const [k, v] of Object.entries(itemnew))if (k !== "id") item[k] = v;
                    const cprops = comp.content_tree.component?.props;
                    const iprops = item.component.props;
                    if (cprops && iprops) for (const [name, mprop] of Object.entries(cprops)){
                        const jsx_prop = iprops[name];
                        if (jsx_prop) {
                            if (mprop.meta?.type === "content-element") {
                                let icontent = jsx_prop.content;
                                if (icontent) await $feb1a0b7ed736546$var$walk(p, {
                                    treeMeta: treeMeta,
                                    item: icontent,
                                    parent_id: item.id,
                                    parent_comp: val.parent_comp,
                                    idx: mprop.idx
                                });
                            }
                        }
                    }
                }
            } else {
                let doc = p.comps.doc[cid];
                if (!doc) {
                    await (0, $bxUNj.loadComponent)(p, cid);
                    doc = p.comps.doc[cid];
                }
                if (doc) {
                    const mcomp = doc.getMap("map").get("content_tree");
                    if (mcomp) {
                        if (!p.compInstance[item.id]) p.compInstance[item.id] = {};
                        const child_ids = p.compInstance[item.id];
                        const itemnew = (0, $bxUNj.instantiateComp)(p, item, {
                            type: "m",
                            item: mcomp
                        }, child_ids);
                        for (const [k, v] of Object.entries(itemnew))if (k !== "id") item[k] = v;
                        meta.comp = {
                            id: cid,
                            mcomp: mcomp,
                            child_ids: child_ids
                        };
                    }
                    let cprops = Object.entries(item.component?.props || {}).sort((a, b)=>{
                        return a[1].idx - b[1].idx;
                    });
                    if (mcomp) {
                        const mprops = mcomp.get("component")?.get("props");
                        const iprops = item.component.props;
                        if (mprops && iprops) for (const [name, cprop] of cprops){
                            let mp = mprops.get(name);
                            if (mp) {
                                const mprop = mp?.toJSON();
                                const jsx_prop = iprops[name];
                                if (jsx_prop) {
                                    if (mprop.meta?.type === "content-element") {
                                        let icontent = jsx_prop.content;
                                        if (icontent) await $feb1a0b7ed736546$var$walk(p, {
                                            treeMeta: treeMeta,
                                            item: cprop.content,
                                            parent_id: item.id,
                                            parent_comp: val.parent_comp,
                                            idx: mprop.idx
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            }
            await Promise.all(item.childs.map(async (child, idx)=>{
                return await $feb1a0b7ed736546$var$walk(p, {
                    treeMeta: treeMeta,
                    item: child,
                    parent_comp: meta,
                    parent_id: item.id,
                    idx: idx
                });
            }));
        } else if (item.type !== "text" && Array.isArray(item.childs)) await Promise.all(item.childs.map(async (child, idx)=>{
            return await $feb1a0b7ed736546$var$walk(p, {
                treeMeta: treeMeta,
                idx: idx,
                item: child,
                parent_comp: val.parent_comp,
                parent_id: item.id || ""
            });
        }));
    }
};

});
parcelRegister("bxUNj", function(module, exports) {

$parcel$export(module.exports, "scanComponent", () => $51cfbb93b1a596e2$export$3f5ec03c1e584396);
$parcel$export(module.exports, "loadComponent", () => $51cfbb93b1a596e2$export$7c05c44a44181e30);
$parcel$export(module.exports, "instantiateComp", () => $51cfbb93b1a596e2$export$34057d1d02512bdf);

var $521T4 = parcelRequire("521T4");

var $aVHaH = parcelRequire("aVHaH");

var $dJKat = parcelRequire("dJKat");
const $51cfbb93b1a596e2$export$3f5ec03c1e584396 = (item, componentIDS)=>{
    const ids = componentIDS || new Set();
    if (!item) return ids;
    if (item.type === "item" && item.component?.id) {
        ids.add(item.component.id);
        if (item.component.props) {
            for (const p of Object.values(item.component.props))if (p.meta?.type === "content-element" && p.content) $51cfbb93b1a596e2$export$3f5ec03c1e584396(p.content, ids);
        }
    }
    if (item.type !== "text" && item.childs) for (const c of item.childs)$51cfbb93b1a596e2$export$3f5ec03c1e584396(c, ids);
    return ids;
};
const $51cfbb93b1a596e2$export$7c05c44a44181e30 = async (p, itemOrID)=>{
    const compIds = new Set();
    let tree = null;
    if (typeof itemOrID !== "string") tree = itemOrID;
    else if (!!p.comps.pending[itemOrID]) await p.comps.pending[itemOrID];
    else {
        $51cfbb93b1a596e2$var$loadSingleComponent(p, itemOrID);
        const res = await p.comps.pending[itemOrID];
        tree = res.content_tree;
    }
    $51cfbb93b1a596e2$export$3f5ec03c1e584396(tree, compIds);
    const promises = [
        ...compIds
    ].filter((id)=>{
        if (p.prod) {
            if (!p.comps.all[id] && !p.comps.pending[id]) return true;
        } else {
            if (!p.comps.doc[id] && !p.comps.pending[id]) return true;
        }
        return false;
    }).map(async (id)=>{
        const res = await $51cfbb93b1a596e2$var$loadSingleComponent(p, id);
        await $51cfbb93b1a596e2$export$7c05c44a44181e30(p, res.content_tree);
        return res;
    });
    if (promises.length > 0) await Promise.all(promises);
};
const $51cfbb93b1a596e2$var$loadSingleComponent = (p, comp_id)=>{
    return p.loader.comp(p, comp_id);
};
const $51cfbb93b1a596e2$export$34057d1d02512bdf = (p, item, mcomp, child_ids)=>{
    const comp = item.component;
    let target = null;
    let mprops = {};
    if (mcomp.type === "m") {
        const mitem = mcomp.item;
        mprops = mitem.get("component")?.get("props")?.toJSON();
        if (!mprops) {
            mitem.get("component")?.set("props", new $aVHaH.Map());
            mprops = mitem.get("component")?.get("props")?.toJSON();
        }
        target = mitem.toJSON();
    } else {
        target = structuredClone(mcomp.item.content_tree);
        mprops = target.component.props || {};
    }
    let nitem = {};
    nitem = (0, $dJKat.fillID)(target, (i)=>{
        if (!i.originalId) i.originalId = i.id;
        let newid = i.id;
        if (child_ids[i.originalId]) newid = child_ids[i.originalId];
        else newid = (0, $521T4.createId)();
        i.id = newid;
        child_ids[i.originalId] = newid;
        return false;
    });
    const props = {};
    for (const [k, v] of Object.entries(mprops)){
        props[k] = v;
        if (comp.props[k]) {
            props[k].value = comp.props[k].value;
            props[k].valueBuilt = comp.props[k].valueBuilt;
            props[k].content = comp.props[k].content;
        }
    }
    return {
        ...nitem,
        id: item.id,
        originalId: item.originalId || nitem.originalId,
        component: {
            ...comp,
            props: props
        }
    };
};

});




parcelRegister("aC85W", function(module, exports) {

$parcel$export(module.exports, "validateLayout", () => $229784607591bf31$export$6d09253aeb4e9a95);
const $229784607591bf31$export$6d09253aeb4e9a95 = async (p)=>{
    if (p.site.layout) {
        p.layout.section = p.site.layout;
        for (const child of p.layout.section.childs){
            const found = await $229784607591bf31$var$walk(child);
            if (found) {
                p.layout.content = found;
                break;
            }
        }
    }
};
const $229784607591bf31$var$walk = async (item)=>{
    if (item.name === "content") return item;
    if (item.type === "item" && !item.component?.id) for (const c of item.childs){
        const found = await $229784607591bf31$var$walk(c);
        if (found) return found;
    }
};

});

parcelRegister("iEVTn", function(module, exports) {

$parcel$export(module.exports, "default", () => $bdb4811a6ba27837$export$2e2bcd8739ae039);
function $bdb4811a6ba27837$var$toAbsoluteURL(url) {
    const a = document.createElement("a");
    a.setAttribute("href", url); // <a href="hoge.html">
    return a.cloneNode(false).href; // -> "http://example.com/hoge.html"
}
function $bdb4811a6ba27837$export$a3c2b6ac6b617c0e(url) {
    if (!url) return "";
    return new Promise((resolve, reject)=>{
        const vector = "$importModule$" + Math.random().toString(32).slice(2);
        const script = document.createElement("script");
        const destructor = ()=>{
            delete window[vector];
            script.onerror = null;
            script.onload = null;
            script.remove();
            URL.revokeObjectURL(script.src);
            script.src = "";
        };
        script.defer = true;
        script.type = "module";
        script.onerror = ()=>{
            reject(new Error(`Failed to import: ${url}`));
            destructor();
        };
        script.onload = ()=>{
            resolve(window[vector]);
            destructor();
        };
        const absURL = $bdb4811a6ba27837$var$toAbsoluteURL(url);
        const loader = `import * as m from "${absURL}"; window.${vector} = m;`; // export Module
        const blob = new Blob([
            loader
        ], {
            type: "text/javascript"
        });
        script.src = URL.createObjectURL(blob);
        document.head.appendChild(script);
    });
}
var $bdb4811a6ba27837$export$2e2bcd8739ae039 = $bdb4811a6ba27837$export$a3c2b6ac6b617c0e;

});

})();
//# sourceMappingURL=editor.ed238427.js.map
