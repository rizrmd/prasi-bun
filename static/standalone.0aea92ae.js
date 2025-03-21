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
})({"bTqN5":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "__debug", ()=>ri);
parcelHelpers.export(exports, "check", ()=>ei);
parcelHelpers.export(exports, "default", ()=>qc);
parcelHelpers.export(exports, "doc", ()=>er);
parcelHelpers.export(exports, "format", ()=>cu);
parcelHelpers.export(exports, "formatWithCursor", ()=>au);
parcelHelpers.export(exports, "getSupportInfo", ()=>ti);
parcelHelpers.export(exports, "util", ()=>Qt);
parcelHelpers.export(exports, "version", ()=>Du);
var lu = Object.create;
var $e = Object.defineProperty;
var fu = Object.getOwnPropertyDescriptor;
var Fu = Object.getOwnPropertyNames;
var pu = Object.getPrototypeOf, du = Object.prototype.hasOwnProperty;
var mu = (e, t)=>()=>(e && (t = e(e = 0)), t);
var Me = (e, t)=>()=>(t || e((t = {
            exports: {}
        }).exports, t), t.exports), We = (e, t)=>{
    for(var r in t)$e(e, r, {
        get: t[r],
        enumerable: !0
    });
}, nr = (e, t, r, n)=>{
    if (t && typeof t == "object" || typeof t == "function") for (let o of Fu(t))!du.call(e, o) && o !== r && $e(e, o, {
        get: ()=>t[o],
        enumerable: !(n = fu(t, o)) || n.enumerable
    });
    return e;
};
var he = (e, t, r)=>(r = e != null ? lu(pu(e)) : {}, nr(t || !e || !e.__esModule ? $e(r, "default", {
        value: e,
        enumerable: !0
    }) : r, e)), Eu = (e)=>nr($e({}, "__esModule", {
        value: !0
    }), e);
var Cu = (e, t, r)=>{
    if (!t.has(e)) throw TypeError("Cannot " + r);
};
var ht = (e, t, r)=>{
    if (t.has(e)) throw TypeError("Cannot add the same private member more than once");
    t instanceof WeakSet ? t.add(e) : t.set(e, r);
};
var ce = (e, t, r)=>(Cu(e, t, "access private method"), r);
var or = Me((gt)=>{
    "use strict";
    Object.defineProperty(gt, "__esModule", {
        value: !0
    });
    gt.default = ur;
    function ur() {}
    ur.prototype = {
        diff: function(t, r) {
            var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, o = n.callback;
            typeof n == "function" && (o = n, n = {}), this.options = n;
            var u = this;
            function i(F) {
                return o ? (setTimeout(function() {
                    o(void 0, F);
                }, 0), !0) : F;
            }
            t = this.castInput(t), r = this.castInput(r), t = this.removeEmpty(this.tokenize(t)), r = this.removeEmpty(this.tokenize(r));
            var s = r.length, D = t.length, a = 1, c = s + D;
            n.maxEditLength && (c = Math.min(c, n.maxEditLength));
            var d = [
                {
                    newPos: -1,
                    components: []
                }
            ], f = this.extractCommon(d[0], r, t, 0);
            if (d[0].newPos + 1 >= s && f + 1 >= D) return i([
                {
                    value: this.join(r),
                    count: r.length
                }
            ]);
            function p() {
                for(var F = -1 * a; F <= a; F += 2){
                    var m = void 0, E = d[F - 1], C = d[F + 1], g = (C ? C.newPos : 0) - F;
                    E && (d[F - 1] = void 0);
                    var h = E && E.newPos + 1 < s, B = C && 0 <= g && g < D;
                    if (!h && !B) {
                        d[F] = void 0;
                        continue;
                    }
                    if (!h || B && E.newPos < C.newPos ? (m = yu(C), u.pushComponent(m.components, void 0, !0)) : (m = E, m.newPos++, u.pushComponent(m.components, !0, void 0)), g = u.extractCommon(m, r, t, F), m.newPos + 1 >= s && g + 1 >= D) return i(gu(u, m.components, r, t, u.useLongestToken));
                    d[F] = m;
                }
                a++;
            }
            if (o) (function F() {
                setTimeout(function() {
                    if (a > c) return o();
                    p() || F();
                }, 0);
            })();
            else for(; a <= c;){
                var l = p();
                if (l) return l;
            }
        },
        pushComponent: function(t, r, n) {
            var o = t[t.length - 1];
            o && o.added === r && o.removed === n ? t[t.length - 1] = {
                count: o.count + 1,
                added: r,
                removed: n
            } : t.push({
                count: 1,
                added: r,
                removed: n
            });
        },
        extractCommon: function(t, r, n, o) {
            for(var u = r.length, i = n.length, s = t.newPos, D = s - o, a = 0; s + 1 < u && D + 1 < i && this.equals(r[s + 1], n[D + 1]);)s++, D++, a++;
            return a && t.components.push({
                count: a
            }), t.newPos = s, D;
        },
        equals: function(t, r) {
            return this.options.comparator ? this.options.comparator(t, r) : t === r || this.options.ignoreCase && t.toLowerCase() === r.toLowerCase();
        },
        removeEmpty: function(t) {
            for(var r = [], n = 0; n < t.length; n++)t[n] && r.push(t[n]);
            return r;
        },
        castInput: function(t) {
            return t;
        },
        tokenize: function(t) {
            return t.split("");
        },
        join: function(t) {
            return t.join("");
        }
    };
    function gu(e, t, r, n, o) {
        for(var u = 0, i = t.length, s = 0, D = 0; u < i; u++){
            var a = t[u];
            if (a.removed) {
                if (a.value = e.join(n.slice(D, D + a.count)), D += a.count, u && t[u - 1].added) {
                    var d = t[u - 1];
                    t[u - 1] = t[u], t[u] = d;
                }
            } else {
                if (!a.added && o) {
                    var c = r.slice(s, s + a.count);
                    c = c.map(function(p, l) {
                        var F = n[D + l];
                        return F.length > p.length ? F : p;
                    }), a.value = e.join(c);
                } else a.value = e.join(r.slice(s, s + a.count));
                s += a.count, a.added || (D += a.count);
            }
        }
        var f = t[i - 1];
        return i > 1 && typeof f.value == "string" && (f.added || f.removed) && e.equals("", f.value) && (t[i - 2].value += f.value, t.pop()), t;
    }
    function yu(e) {
        return {
            newPos: e.newPos,
            components: e.components.slice(0)
        };
    }
});
var ir = Me((ye)=>{
    "use strict";
    Object.defineProperty(ye, "__esModule", {
        value: !0
    });
    ye.diffArrays = _u;
    ye.arrayDiff = void 0;
    var Au = Bu(or());
    function Bu(e) {
        return e && e.__esModule ? e : {
            default: e
        };
    }
    var ge = new Au.default;
    ye.arrayDiff = ge;
    ge.tokenize = function(e) {
        return e.slice();
    };
    ge.join = ge.removeEmpty = function(e) {
        return e;
    };
    function _u(e, t, r) {
        return ge.diff(e, t, r);
    }
});
var Pe = Me((ps, jr)=>{
    "use strict";
    var Yr = new Proxy(String, {
        get: ()=>Yr
    });
    jr.exports = Yr;
});
var Fn = {};
We(Fn, {
    default: ()=>uo,
    shouldHighlight: ()=>no
});
var no, uo, pn = mu(()=>{
    no = ()=>!1, uo = String;
});
var yn = Me((Ft)=>{
    "use strict";
    Object.defineProperty(Ft, "__esModule", {
        value: !0
    });
    Ft.codeFrameColumns = gn;
    Ft.default = ao;
    var dn = (pn(), Eu(Fn)), mn = oo(Pe(), !0);
    function hn(e) {
        if (typeof WeakMap != "function") return null;
        var t = new WeakMap, r = new WeakMap;
        return (hn = function(n) {
            return n ? r : t;
        })(e);
    }
    function oo(e, t) {
        if (!t && e && e.__esModule) return e;
        if (e === null || typeof e != "object" && typeof e != "function") return {
            default: e
        };
        var r = hn(t);
        if (r && r.has(e)) return r.get(e);
        var n = {
            __proto__: null
        }, o = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for(var u in e)if (u !== "default" && Object.prototype.hasOwnProperty.call(e, u)) {
            var i = o ? Object.getOwnPropertyDescriptor(e, u) : null;
            i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
        }
        return n.default = e, r && r.set(e, n), n;
    }
    var jt;
    function io(e) {
        if (e) {
            var t;
            return (t = jt) != null || (jt = new mn.default.constructor({
                enabled: !0,
                level: 1
            })), jt;
        }
        return mn.default;
    }
    var En = !1;
    function so(e) {
        return {
            gutter: e.grey,
            marker: e.red.bold,
            message: e.red.bold
        };
    }
    var Cn = /\r\n|[\n\r\u2028\u2029]/;
    function Do(e, t, r) {
        let n = Object.assign({
            column: 0,
            line: -1
        }, e.start), o = Object.assign({}, n, e.end), { linesAbove: u = 2, linesBelow: i = 3 } = r || {}, s = n.line, D = n.column, a = o.line, c = o.column, d = Math.max(s - (u + 1), 0), f = Math.min(t.length, a + i);
        s === -1 && (d = 0), a === -1 && (f = t.length);
        let p = a - s, l = {};
        if (p) for(let F = 0; F <= p; F++){
            let m = F + s;
            if (!D) l[m] = !0;
            else if (F === 0) {
                let E = t[m - 1].length;
                l[m] = [
                    D,
                    E - D + 1
                ];
            } else if (F === p) l[m] = [
                0,
                c
            ];
            else {
                let E = t[m - F].length;
                l[m] = [
                    0,
                    E
                ];
            }
        }
        else D === c ? D ? l[s] = [
            D,
            0
        ] : l[s] = !0 : l[s] = [
            D,
            c - D
        ];
        return {
            start: d,
            end: f,
            markerLines: l
        };
    }
    function gn(e, t, r = {}) {
        let n = (r.highlightCode || r.forceColor) && (0, dn.shouldHighlight)(r), o = io(r.forceColor), u = so(o), i = (F, m)=>n ? F(m) : m, s = e.split(Cn), { start: D, end: a, markerLines: c } = Do(t, s, r), d = t.start && typeof t.start.column == "number", f = String(a).length, l = (n ? (0, dn.default)(e, r) : e).split(Cn, a).slice(D, a).map((F, m)=>{
            let E = D + 1 + m, g = ` ${` ${E}`.slice(-f)} |`, h = c[E], B = !c[E + 1];
            if (h) {
                let Z = "";
                if (Array.isArray(h)) {
                    let $ = F.slice(0, Math.max(h[0] - 1, 0)).replace(/[^\t]/g, " "), Q = h[1] || 1;
                    Z = [
                        `
 `,
                        i(u.gutter, g.replace(/\d/g, " ")),
                        " ",
                        $,
                        i(u.marker, "^").repeat(Q)
                    ].join(""), B && r.message && (Z += " " + i(u.message, r.message));
                }
                return [
                    i(u.marker, ">"),
                    i(u.gutter, g),
                    F.length > 0 ? ` ${F}` : "",
                    Z
                ].join("");
            } else return ` ${i(u.gutter, g)}${F.length > 0 ? ` ${F}` : ""}`;
        }).join(`
`);
        return r.message && !d && (l = `${" ".repeat(f + 1)}${r.message}
${l}`), n ? o.reset(l) : l;
    }
    function ao(e, t, r, n = {}) {
        if (!En) {
            En = !0;
            let u = "Passing lineNumber and colNumber is deprecated to @babel/code-frame. Please use `codeFrameColumns`.";
            {
                let i = new Error(u);
                i.name = "DeprecationWarning", console.warn(new Error(u));
            }
        }
        return r = Math.max(r, 0), gn(e, {
            start: {
                column: r,
                line: t
            }
        }, n);
    }
});
var tr = {};
We(tr, {
    __debug: ()=>ri,
    check: ()=>ei,
    doc: ()=>er,
    format: ()=>cu,
    formatWithCursor: ()=>au,
    getSupportInfo: ()=>ti,
    util: ()=>Qt,
    version: ()=>Du
});
var hu = (e, t, r, n)=>{
    if (!(e && t == null)) return t.replaceAll ? t.replaceAll(r, n) : r.global ? t.replace(r, n) : t.split(r).join(n);
}, ee = hu;
var Kn = he(ir(), 1);
var M = "string", j = "array", W = "cursor", T = "indent", S = "align", v = "trim", _ = "group", k = "fill", x = "if-break", P = "indent-if-break", L = "line-suffix", I = "line-suffix-boundary", A = "line", O = "label", b = "break-parent", Ue = new Set([
    W,
    T,
    S,
    v,
    _,
    k,
    x,
    P,
    L,
    I,
    A,
    O,
    b
]);
function xu(e) {
    if (typeof e == "string") return M;
    if (Array.isArray(e)) return j;
    if (!e) return;
    let { type: t } = e;
    if (Ue.has(t)) return t;
}
var U = xu;
var ku = (e)=>new Intl.ListFormat("en-US", {
        type: "disjunction"
    }).format(e);
function bu(e) {
    let t = e === null ? "null" : typeof e;
    if (t !== "string" && t !== "object") return `Unexpected doc '${t}', 
Expected it to be 'string' or 'object'.`;
    if (U(e)) throw new Error("doc is valid.");
    let r = Object.prototype.toString.call(e);
    if (r !== "[object Object]") return `Unexpected doc '${r}'.`;
    let n = ku([
        ...Ue
    ].map((o)=>`'${o}'`));
    return `Unexpected doc.type '${e.type}'.
Expected it to be ${n}.`;
}
var yt = class extends Error {
    name = "InvalidDocError";
    constructor(t){
        super(bu(t)), this.doc = t;
    }
}, q = yt;
var sr = {};
function wu(e, t, r, n) {
    let o = [
        e
    ];
    for(; o.length > 0;){
        let u = o.pop();
        if (u === sr) {
            r(o.pop());
            continue;
        }
        r && o.push(u, sr);
        let i = U(u);
        if (!i) throw new q(u);
        if ((t == null ? void 0 : t(u)) !== !1) switch(i){
            case j:
            case k:
                {
                    let s = i === j ? u : u.parts;
                    for(let D = s.length, a = D - 1; a >= 0; --a)o.push(s[a]);
                    break;
                }
            case x:
                o.push(u.flatContents, u.breakContents);
                break;
            case _:
                if (n && u.expandedStates) for(let s = u.expandedStates.length, D = s - 1; D >= 0; --D)o.push(u.expandedStates[D]);
                else o.push(u.contents);
                break;
            case S:
            case T:
            case P:
            case O:
            case L:
                o.push(u.contents);
                break;
            case M:
            case W:
            case v:
            case I:
            case A:
            case b:
                break;
            default:
                throw new q(u);
        }
    }
}
var Ae = wu;
var Dr = ()=>{}, z = Dr, ze = Dr;
function ie(e) {
    return z(e), {
        type: T,
        contents: e
    };
}
function oe(e, t) {
    return z(t), {
        type: S,
        contents: t,
        n: e
    };
}
function At(e, t = {}) {
    return z(e), ze(t.expandedStates, !0), {
        type: _,
        id: t.id,
        contents: e,
        break: !!t.shouldBreak,
        expandedStates: t.expandedStates
    };
}
function ar(e) {
    return oe(Number.NEGATIVE_INFINITY, e);
}
function cr(e) {
    return oe({
        type: "root"
    }, e);
}
function lr(e) {
    return oe(-1, e);
}
function fr(e, t) {
    return At(e[0], {
        ...t,
        expandedStates: e
    });
}
function Ge(e) {
    return ze(e), {
        type: k,
        parts: e
    };
}
function Fr(e, t = "", r = {}) {
    return z(e), t !== "" && z(t), {
        type: x,
        breakContents: e,
        flatContents: t,
        groupId: r.groupId
    };
}
function pr(e, t) {
    return z(e), {
        type: P,
        contents: e,
        groupId: t.groupId,
        negate: t.negate
    };
}
function Be(e) {
    return z(e), {
        type: L,
        contents: e
    };
}
var dr = {
    type: I
}, le = {
    type: b
}, mr = {
    type: v
}, _e = {
    type: A,
    hard: !0
}, Bt = {
    type: A,
    hard: !0,
    literal: !0
}, Ke = {
    type: A
}, Er = {
    type: A,
    soft: !0
}, G = [
    _e,
    le
], He = [
    Bt,
    le
], xe = {
    type: W
};
function ke(e, t) {
    z(e), ze(t);
    let r = [];
    for(let n = 0; n < t.length; n++)n !== 0 && r.push(e), r.push(t[n]);
    return r;
}
function qe(e, t, r) {
    z(e);
    let n = e;
    if (t > 0) {
        for(let o = 0; o < Math.floor(t / r); ++o)n = ie(n);
        n = oe(t % r, n), n = oe(Number.NEGATIVE_INFINITY, n);
    }
    return n;
}
function Cr(e, t) {
    return z(t), e ? {
        type: O,
        label: e,
        contents: t
    } : t;
}
var Ou = (e, t, r)=>{
    if (!(e && t == null)) return Array.isArray(t) || typeof t == "string" ? t[r < 0 ? t.length + r : r] : t.at(r);
}, y = Ou;
function hr(e) {
    let t = e.indexOf("\r");
    return t >= 0 ? e.charAt(t + 1) === `
` ? "crlf" : "cr" : "lf";
}
function be(e) {
    switch(e){
        case "cr":
            return "\r";
        case "crlf":
            return `\r
`;
        default:
            return `
`;
    }
}
function _t(e, t) {
    let r;
    switch(t){
        case `
`:
            r = /\n/g;
            break;
        case "\r":
            r = /\r/g;
            break;
        case `\r
`:
            r = /\r\n/g;
            break;
        default:
            throw new Error(`Unexpected "eol" ${JSON.stringify(t)}.`);
    }
    let n = e.match(r);
    return n ? n.length : 0;
}
function gr(e) {
    return ee(!1, e, /\r\n?/g, `
`);
}
var yr = ()=>/[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26D3\uFE0F?(?:\u200D\uD83D\uDCA5)?|\u26F9(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF43\uDF45-\uDF4A\uDF4C-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDF44(?:\u200D\uD83D\uDFEB)?|\uDF4B(?:\u200D\uD83D\uDFE9)?|\uDFC3(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4\uDEB5](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE41\uDE43\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC08(?:\u200D\u2B1B)?|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC26(?:\u200D(?:\u2B1B|\uD83D\uDD25))?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE])))?))?|\uDC6F(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDD75(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?|\uDE42(?:\u200D[\u2194\u2195]\uFE0F?)?|\uDEB6(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC2\uDECE-\uDEDB\uDEE0-\uDEE8]|\uDD3C(?:\u200D[\u2640\u2642]\uFE0F?|\uD83C[\uDFFB-\uDFFF])?|\uDDCE(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1|\uDDD1\u200D\uD83E\uDDD2(?:\u200D\uD83E\uDDD2)?|\uDDD2(?:\u200D\uD83E\uDDD2)?))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g;
function Ar(e) {
    return e === 12288 || e >= 65281 && e <= 65376 || e >= 65504 && e <= 65510;
}
function Br(e) {
    return e >= 4352 && e <= 4447 || e === 8986 || e === 8987 || e === 9001 || e === 9002 || e >= 9193 && e <= 9196 || e === 9200 || e === 9203 || e === 9725 || e === 9726 || e === 9748 || e === 9749 || e >= 9800 && e <= 9811 || e === 9855 || e === 9875 || e === 9889 || e === 9898 || e === 9899 || e === 9917 || e === 9918 || e === 9924 || e === 9925 || e === 9934 || e === 9940 || e === 9962 || e === 9970 || e === 9971 || e === 9973 || e === 9978 || e === 9981 || e === 9989 || e === 9994 || e === 9995 || e === 10024 || e === 10060 || e === 10062 || e >= 10067 && e <= 10069 || e === 10071 || e >= 10133 && e <= 10135 || e === 10160 || e === 10175 || e === 11035 || e === 11036 || e === 11088 || e === 11093 || e >= 11904 && e <= 11929 || e >= 11931 && e <= 12019 || e >= 12032 && e <= 12245 || e >= 12272 && e <= 12287 || e >= 12289 && e <= 12350 || e >= 12353 && e <= 12438 || e >= 12441 && e <= 12543 || e >= 12549 && e <= 12591 || e >= 12593 && e <= 12686 || e >= 12688 && e <= 12771 || e >= 12783 && e <= 12830 || e >= 12832 && e <= 12871 || e >= 12880 && e <= 19903 || e >= 19968 && e <= 42124 || e >= 42128 && e <= 42182 || e >= 43360 && e <= 43388 || e >= 44032 && e <= 55203 || e >= 63744 && e <= 64255 || e >= 65040 && e <= 65049 || e >= 65072 && e <= 65106 || e >= 65108 && e <= 65126 || e >= 65128 && e <= 65131 || e >= 94176 && e <= 94180 || e === 94192 || e === 94193 || e >= 94208 && e <= 100343 || e >= 100352 && e <= 101589 || e >= 101632 && e <= 101640 || e >= 110576 && e <= 110579 || e >= 110581 && e <= 110587 || e === 110589 || e === 110590 || e >= 110592 && e <= 110882 || e === 110898 || e >= 110928 && e <= 110930 || e === 110933 || e >= 110948 && e <= 110951 || e >= 110960 && e <= 111355 || e === 126980 || e === 127183 || e === 127374 || e >= 127377 && e <= 127386 || e >= 127488 && e <= 127490 || e >= 127504 && e <= 127547 || e >= 127552 && e <= 127560 || e === 127568 || e === 127569 || e >= 127584 && e <= 127589 || e >= 127744 && e <= 127776 || e >= 127789 && e <= 127797 || e >= 127799 && e <= 127868 || e >= 127870 && e <= 127891 || e >= 127904 && e <= 127946 || e >= 127951 && e <= 127955 || e >= 127968 && e <= 127984 || e === 127988 || e >= 127992 && e <= 128062 || e === 128064 || e >= 128066 && e <= 128252 || e >= 128255 && e <= 128317 || e >= 128331 && e <= 128334 || e >= 128336 && e <= 128359 || e === 128378 || e === 128405 || e === 128406 || e === 128420 || e >= 128507 && e <= 128591 || e >= 128640 && e <= 128709 || e === 128716 || e >= 128720 && e <= 128722 || e >= 128725 && e <= 128727 || e >= 128732 && e <= 128735 || e === 128747 || e === 128748 || e >= 128756 && e <= 128764 || e >= 128992 && e <= 129003 || e === 129008 || e >= 129292 && e <= 129338 || e >= 129340 && e <= 129349 || e >= 129351 && e <= 129535 || e >= 129648 && e <= 129660 || e >= 129664 && e <= 129672 || e >= 129680 && e <= 129725 || e >= 129727 && e <= 129733 || e >= 129742 && e <= 129755 || e >= 129760 && e <= 129768 || e >= 129776 && e <= 129784 || e >= 131072 && e <= 196605 || e >= 196608 && e <= 262141;
}
var _r = (e)=>!(Ar(e) || Br(e));
var Nu = /[^\x20-\x7F]/;
function Tu(e) {
    if (!e) return 0;
    if (!Nu.test(e)) return e.length;
    e = e.replace(yr(), "  ");
    let t = 0;
    for (let r of e){
        let n = r.codePointAt(0);
        n <= 31 || n >= 127 && n <= 159 || n >= 768 && n <= 879 || (t += _r(n) ? 1 : 2);
    }
    return t;
}
var we = Tu;
var br = (e)=>{
    if (Array.isArray(e)) return e;
    if (e.type !== k) throw new Error(`Expect doc to be 'array' or '${k}'.`);
    return e.parts;
};
function Ne(e, t) {
    if (typeof e == "string") return t(e);
    let r = new Map;
    return n(e);
    function n(u) {
        if (r.has(u)) return r.get(u);
        let i = o(u);
        return r.set(u, i), i;
    }
    function o(u) {
        switch(U(u)){
            case j:
                return t(u.map(n));
            case k:
                return t({
                    ...u,
                    parts: u.parts.map(n)
                });
            case x:
                return t({
                    ...u,
                    breakContents: n(u.breakContents),
                    flatContents: n(u.flatContents)
                });
            case _:
                {
                    let { expandedStates: i, contents: s } = u;
                    return i ? (i = i.map(n), s = i[0]) : s = n(s), t({
                        ...u,
                        contents: s,
                        expandedStates: i
                    });
                }
            case S:
            case T:
            case P:
            case O:
            case L:
                return t({
                    ...u,
                    contents: n(u.contents)
                });
            case M:
            case W:
            case v:
            case I:
            case A:
            case b:
                return t(u);
            default:
                throw new q(u);
        }
    }
}
function Je(e, t, r) {
    let n = r, o = !1;
    function u(i) {
        if (o) return !1;
        let s = t(i);
        s !== void 0 && (o = !0, n = s);
    }
    return Ae(e, u), n;
}
function Su(e) {
    if (e.type === _ && e.break || e.type === A && e.hard || e.type === b) return !0;
}
function wr(e) {
    return Je(e, Su, !1);
}
function xr(e) {
    if (e.length > 0) {
        let t = y(!1, e, -1);
        !t.expandedStates && !t.break && (t.break = "propagated");
    }
    return null;
}
function Or(e) {
    let t = new Set, r = [];
    function n(u) {
        if (u.type === b && xr(r), u.type === _) {
            if (r.push(u), t.has(u)) return !1;
            t.add(u);
        }
    }
    function o(u) {
        u.type === _ && r.pop().break && xr(r);
    }
    Ae(e, n, o, !0);
}
function vu(e) {
    return e.type === A && !e.hard ? e.soft ? "" : " " : e.type === x ? e.flatContents : e;
}
function Nr(e) {
    return Ne(e, vu);
}
function kr(e) {
    for(e = [
        ...e
    ]; e.length >= 2 && y(!1, e, -2).type === A && y(!1, e, -1).type === b;)e.length -= 2;
    if (e.length > 0) {
        let t = Oe(y(!1, e, -1));
        e[e.length - 1] = t;
    }
    return e;
}
function Oe(e) {
    switch(U(e)){
        case S:
        case T:
        case P:
        case _:
        case L:
        case O:
            {
                let t = Oe(e.contents);
                return {
                    ...e,
                    contents: t
                };
            }
        case x:
            return {
                ...e,
                breakContents: Oe(e.breakContents),
                flatContents: Oe(e.flatContents)
            };
        case k:
            return {
                ...e,
                parts: kr(e.parts)
            };
        case j:
            return kr(e);
        case M:
            return e.replace(/[\n\r]*$/, "");
        case W:
        case v:
        case I:
        case A:
        case b:
            break;
        default:
            throw new q(e);
    }
    return e;
}
function Xe(e) {
    return Oe(Lu(e));
}
function Pu(e) {
    switch(U(e)){
        case k:
            if (e.parts.every((t)=>t === "")) return "";
            break;
        case _:
            if (!e.contents && !e.id && !e.break && !e.expandedStates) return "";
            if (e.contents.type === _ && e.contents.id === e.id && e.contents.break === e.break && e.contents.expandedStates === e.expandedStates) return e.contents;
            break;
        case S:
        case T:
        case P:
        case L:
            if (!e.contents) return "";
            break;
        case x:
            if (!e.flatContents && !e.breakContents) return "";
            break;
        case j:
            {
                let t = [];
                for (let r of e){
                    if (!r) continue;
                    let [n, ...o] = Array.isArray(r) ? r : [
                        r
                    ];
                    typeof n == "string" && typeof y(!1, t, -1) == "string" ? t[t.length - 1] += n : t.push(n), t.push(...o);
                }
                return t.length === 0 ? "" : t.length === 1 ? t[0] : t;
            }
        case M:
        case W:
        case v:
        case I:
        case A:
        case O:
        case b:
            break;
        default:
            throw new q(e);
    }
    return e;
}
function Lu(e) {
    return Ne(e, (t)=>Pu(t));
}
function Tr(e, t = He) {
    return Ne(e, (r)=>typeof r == "string" ? ke(t, r.split(`
`)) : r);
}
function Iu(e) {
    if (e.type === A) return !0;
}
function Sr(e) {
    return Je(e, Iu, !1);
}
function Ze(e, t) {
    return e.type === O ? {
        ...e,
        contents: t(e.contents)
    } : t(e);
}
var R = Symbol("MODE_BREAK"), K = Symbol("MODE_FLAT"), Te = Symbol("cursor");
function vr() {
    return {
        value: "",
        length: 0,
        queue: []
    };
}
function Ru(e, t) {
    return xt(e, {
        type: "indent"
    }, t);
}
function Yu(e, t, r) {
    return t === Number.NEGATIVE_INFINITY ? e.root || vr() : t < 0 ? xt(e, {
        type: "dedent"
    }, r) : t ? t.type === "root" ? {
        ...e,
        root: e
    } : xt(e, {
        type: typeof t == "string" ? "stringAlign" : "numberAlign",
        n: t
    }, r) : e;
}
function xt(e, t, r) {
    let n = t.type === "dedent" ? e.queue.slice(0, -1) : [
        ...e.queue,
        t
    ], o = "", u = 0, i = 0, s = 0;
    for (let l of n)switch(l.type){
        case "indent":
            c(), r.useTabs ? D(1) : a(r.tabWidth);
            break;
        case "stringAlign":
            c(), o += l.n, u += l.n.length;
            break;
        case "numberAlign":
            i += 1, s += l.n;
            break;
        default:
            throw new Error(`Unexpected type '${l.type}'`);
    }
    return f(), {
        ...e,
        value: o,
        length: u,
        queue: n
    };
    function D(l) {
        o += "	".repeat(l), u += r.tabWidth * l;
    }
    function a(l) {
        o += " ".repeat(l), u += l;
    }
    function c() {
        r.useTabs ? d() : f();
    }
    function d() {
        i > 0 && D(i), p();
    }
    function f() {
        s > 0 && a(s), p();
    }
    function p() {
        i = 0, s = 0;
    }
}
function kt(e) {
    let t = 0, r = 0, n = e.length;
    e: for(; n--;){
        let o = e[n];
        if (o === Te) {
            r++;
            continue;
        }
        for(let u = o.length - 1; u >= 0; u--){
            let i = o[u];
            if (i === " " || i === "	") t++;
            else {
                e[n] = o.slice(0, u + 1);
                break e;
            }
        }
    }
    if (t > 0 || r > 0) for(e.length = n + 1; r-- > 0;)e.push(Te);
    return t;
}
function Qe(e, t, r, n, o, u) {
    if (r === Number.POSITIVE_INFINITY) return !0;
    let i = t.length, s = [
        e
    ], D = [];
    for(; r >= 0;){
        if (s.length === 0) {
            if (i === 0) return !0;
            s.push(t[--i]);
            continue;
        }
        let { mode: a, doc: c } = s.pop();
        switch(U(c)){
            case M:
                D.push(c), r -= we(c);
                break;
            case j:
            case k:
                {
                    let d = br(c);
                    for(let f = d.length - 1; f >= 0; f--)s.push({
                        mode: a,
                        doc: d[f]
                    });
                    break;
                }
            case T:
            case S:
            case P:
            case O:
                s.push({
                    mode: a,
                    doc: c.contents
                });
                break;
            case v:
                r += kt(D);
                break;
            case _:
                {
                    if (u && c.break) return !1;
                    let d = c.break ? R : a, f = c.expandedStates && d === R ? y(!1, c.expandedStates, -1) : c.contents;
                    s.push({
                        mode: d,
                        doc: f
                    });
                    break;
                }
            case x:
                {
                    let f = (c.groupId ? o[c.groupId] || K : a) === R ? c.breakContents : c.flatContents;
                    f && s.push({
                        mode: a,
                        doc: f
                    });
                    break;
                }
            case A:
                if (a === R || c.hard) return !0;
                c.soft || (D.push(" "), r--);
                break;
            case L:
                n = !0;
                break;
            case I:
                if (n) return !1;
                break;
        }
    }
    return !1;
}
function fe(e, t) {
    let r = {}, n = t.printWidth, o = be(t.endOfLine), u = 0, i = [
        {
            ind: vr(),
            mode: R,
            doc: e
        }
    ], s = [], D = !1, a = [], c = 0;
    for(Or(e); i.length > 0;){
        let { ind: f, mode: p, doc: l } = i.pop();
        switch(U(l)){
            case M:
                {
                    let F = o !== `
` ? ee(!1, l, `
`, o) : l;
                    s.push(F), i.length > 0 && (u += we(F));
                    break;
                }
            case j:
                for(let F = l.length - 1; F >= 0; F--)i.push({
                    ind: f,
                    mode: p,
                    doc: l[F]
                });
                break;
            case W:
                if (c >= 2) throw new Error("There are too many 'cursor' in doc.");
                s.push(Te), c++;
                break;
            case T:
                i.push({
                    ind: Ru(f, t),
                    mode: p,
                    doc: l.contents
                });
                break;
            case S:
                i.push({
                    ind: Yu(f, l.n, t),
                    mode: p,
                    doc: l.contents
                });
                break;
            case v:
                u -= kt(s);
                break;
            case _:
                switch(p){
                    case K:
                        if (!D) {
                            i.push({
                                ind: f,
                                mode: l.break ? R : K,
                                doc: l.contents
                            });
                            break;
                        }
                    case R:
                        {
                            D = !1;
                            let F = {
                                ind: f,
                                mode: K,
                                doc: l.contents
                            }, m = n - u, E = a.length > 0;
                            if (!l.break && Qe(F, i, m, E, r)) i.push(F);
                            else if (l.expandedStates) {
                                let C = y(!1, l.expandedStates, -1);
                                if (l.break) {
                                    i.push({
                                        ind: f,
                                        mode: R,
                                        doc: C
                                    });
                                    break;
                                } else for(let g = 1; g < l.expandedStates.length + 1; g++)if (g >= l.expandedStates.length) {
                                    i.push({
                                        ind: f,
                                        mode: R,
                                        doc: C
                                    });
                                    break;
                                } else {
                                    let h = l.expandedStates[g], B = {
                                        ind: f,
                                        mode: K,
                                        doc: h
                                    };
                                    if (Qe(B, i, m, E, r)) {
                                        i.push(B);
                                        break;
                                    }
                                }
                            } else i.push({
                                ind: f,
                                mode: R,
                                doc: l.contents
                            });
                            break;
                        }
                }
                l.id && (r[l.id] = y(!1, i, -1).mode);
                break;
            case k:
                {
                    let F = n - u, { parts: m } = l;
                    if (m.length === 0) break;
                    let [E, C] = m, g = {
                        ind: f,
                        mode: K,
                        doc: E
                    }, h = {
                        ind: f,
                        mode: R,
                        doc: E
                    }, B = Qe(g, [], F, a.length > 0, r, !0);
                    if (m.length === 1) {
                        B ? i.push(g) : i.push(h);
                        break;
                    }
                    let Z = {
                        ind: f,
                        mode: K,
                        doc: C
                    }, $ = {
                        ind: f,
                        mode: R,
                        doc: C
                    };
                    if (m.length === 2) {
                        B ? i.push(Z, g) : i.push($, h);
                        break;
                    }
                    m.splice(0, 2);
                    let Q = {
                        ind: f,
                        mode: p,
                        doc: Ge(m)
                    }, rr = m[0];
                    Qe({
                        ind: f,
                        mode: K,
                        doc: [
                            E,
                            C,
                            rr
                        ]
                    }, [], F, a.length > 0, r, !0) ? i.push(Q, Z, g) : B ? i.push(Q, $, g) : i.push(Q, $, h);
                    break;
                }
            case x:
            case P:
                {
                    let F = l.groupId ? r[l.groupId] : p;
                    if (F === R) {
                        let m = l.type === x ? l.breakContents : l.negate ? l.contents : ie(l.contents);
                        m && i.push({
                            ind: f,
                            mode: p,
                            doc: m
                        });
                    }
                    if (F === K) {
                        let m = l.type === x ? l.flatContents : l.negate ? ie(l.contents) : l.contents;
                        m && i.push({
                            ind: f,
                            mode: p,
                            doc: m
                        });
                    }
                    break;
                }
            case L:
                a.push({
                    ind: f,
                    mode: p,
                    doc: l.contents
                });
                break;
            case I:
                a.length > 0 && i.push({
                    ind: f,
                    mode: p,
                    doc: _e
                });
                break;
            case A:
                switch(p){
                    case K:
                        if (l.hard) D = !0;
                        else {
                            l.soft || (s.push(" "), u += 1);
                            break;
                        }
                    case R:
                        if (a.length > 0) {
                            i.push({
                                ind: f,
                                mode: p,
                                doc: l
                            }, ...a.reverse()), a.length = 0;
                            break;
                        }
                        l.literal ? f.root ? (s.push(o, f.root.value), u = f.root.length) : (s.push(o), u = 0) : (u -= kt(s), s.push(o + f.value), u = f.length);
                        break;
                }
                break;
            case O:
                i.push({
                    ind: f,
                    mode: p,
                    doc: l.contents
                });
                break;
            case b:
                break;
            default:
                throw new q(l);
        }
        i.length === 0 && a.length > 0 && (i.push(...a.reverse()), a.length = 0);
    }
    let d = s.indexOf(Te);
    if (d !== -1) {
        let f = s.indexOf(Te, d + 1), p = s.slice(0, d).join(""), l = s.slice(d + 1, f).join(""), F = s.slice(f + 1).join("");
        return {
            formatted: p + l + F,
            cursorNodeStart: p.length,
            cursorNodeText: l
        };
    }
    return {
        formatted: s.join("")
    };
}
function J(e) {
    var t;
    if (!e) return "";
    if (Array.isArray(e)) {
        let r = [];
        for (let n of e)if (Array.isArray(n)) r.push(...J(n));
        else {
            let o = J(n);
            o !== "" && r.push(o);
        }
        return r;
    }
    return e.type === x ? {
        ...e,
        breakContents: J(e.breakContents),
        flatContents: J(e.flatContents)
    } : e.type === _ ? {
        ...e,
        contents: J(e.contents),
        expandedStates: (t = e.expandedStates) == null ? void 0 : t.map(J)
    } : e.type === k ? {
        type: "fill",
        parts: e.parts.map(J)
    } : e.contents ? {
        ...e,
        contents: J(e.contents)
    } : e;
}
function Pr(e) {
    let t = Object.create(null), r = new Set;
    return n(J(e));
    function n(u, i, s) {
        var D, a;
        if (typeof u == "string") return JSON.stringify(u);
        if (Array.isArray(u)) {
            let c = u.map(n).filter(Boolean);
            return c.length === 1 ? c[0] : `[${c.join(", ")}]`;
        }
        if (u.type === A) {
            let c = ((D = s == null ? void 0 : s[i + 1]) == null ? void 0 : D.type) === b;
            return u.literal ? c ? "literalline" : "literallineWithoutBreakParent" : u.hard ? c ? "hardline" : "hardlineWithoutBreakParent" : u.soft ? "softline" : "line";
        }
        if (u.type === b) return ((a = s == null ? void 0 : s[i - 1]) == null ? void 0 : a.type) === A && s[i - 1].hard ? void 0 : "breakParent";
        if (u.type === v) return "trim";
        if (u.type === T) return "indent(" + n(u.contents) + ")";
        if (u.type === S) return u.n === Number.NEGATIVE_INFINITY ? "dedentToRoot(" + n(u.contents) + ")" : u.n < 0 ? "dedent(" + n(u.contents) + ")" : u.n.type === "root" ? "markAsRoot(" + n(u.contents) + ")" : "align(" + JSON.stringify(u.n) + ", " + n(u.contents) + ")";
        if (u.type === x) return "ifBreak(" + n(u.breakContents) + (u.flatContents ? ", " + n(u.flatContents) : "") + (u.groupId ? (u.flatContents ? "" : ', ""') + `, { groupId: ${o(u.groupId)} }` : "") + ")";
        if (u.type === P) {
            let c = [];
            u.negate && c.push("negate: true"), u.groupId && c.push(`groupId: ${o(u.groupId)}`);
            let d = c.length > 0 ? `, { ${c.join(", ")} }` : "";
            return `indentIfBreak(${n(u.contents)}${d})`;
        }
        if (u.type === _) {
            let c = [];
            u.break && u.break !== "propagated" && c.push("shouldBreak: true"), u.id && c.push(`id: ${o(u.id)}`);
            let d = c.length > 0 ? `, { ${c.join(", ")} }` : "";
            return u.expandedStates ? `conditionalGroup([${u.expandedStates.map((f)=>n(f)).join(",")}]${d})` : `group(${n(u.contents)}${d})`;
        }
        if (u.type === k) return `fill([${u.parts.map((c)=>n(c)).join(", ")}])`;
        if (u.type === L) return "lineSuffix(" + n(u.contents) + ")";
        if (u.type === I) return "lineSuffixBoundary";
        if (u.type === O) return `label(${JSON.stringify(u.label)}, ${n(u.contents)})`;
        throw new Error("Unknown doc type " + u.type);
    }
    function o(u) {
        if (typeof u != "symbol") return JSON.stringify(String(u));
        if (u in t) return t[u];
        let i = u.description || "symbol";
        for(let s = 0;; s++){
            let D = i + (s > 0 ? ` #${s}` : "");
            if (!r.has(D)) return r.add(D), t[u] = `Symbol.for(${JSON.stringify(D)})`;
        }
    }
}
function ju(e, t, r = 0) {
    let n = 0;
    for(let o = r; o < e.length; ++o)e[o] === "	" ? n = n + t - n % t : n++;
    return n;
}
var Fe = ju;
var Se = class extends Error {
    name = "ConfigError";
}, ve = class extends Error {
    name = "UndefinedParserError";
};
var Lr = {
    cursorOffset: {
        category: "Special",
        type: "int",
        default: -1,
        range: {
            start: -1,
            end: 1 / 0,
            step: 1
        },
        description: "Print (to stderr) where a cursor at the given position would move to after formatting.",
        cliCategory: "Editor"
    },
    endOfLine: {
        category: "Global",
        type: "choice",
        default: "lf",
        description: "Which end of line characters to apply.",
        choices: [
            {
                value: "lf",
                description: "Line Feed only (\\n), common on Linux and macOS as well as inside git repos"
            },
            {
                value: "crlf",
                description: "Carriage Return + Line Feed characters (\\r\\n), common on Windows"
            },
            {
                value: "cr",
                description: "Carriage Return character only (\\r), used very rarely"
            },
            {
                value: "auto",
                description: `Maintain existing
(mixed values within one file are normalised by looking at what's used after the first line)`
            }
        ]
    },
    filepath: {
        category: "Special",
        type: "path",
        description: "Specify the input filepath. This will be used to do parser inference.",
        cliName: "stdin-filepath",
        cliCategory: "Other",
        cliDescription: "Path to the file to pretend that stdin comes from."
    },
    insertPragma: {
        category: "Special",
        type: "boolean",
        default: !1,
        description: "Insert @format pragma into file's first docblock comment.",
        cliCategory: "Other"
    },
    parser: {
        category: "Global",
        type: "choice",
        default: void 0,
        description: "Which parser to use.",
        exception: (e)=>typeof e == "string" || typeof e == "function",
        choices: [
            {
                value: "flow",
                description: "Flow"
            },
            {
                value: "babel",
                description: "JavaScript"
            },
            {
                value: "babel-flow",
                description: "Flow"
            },
            {
                value: "babel-ts",
                description: "TypeScript"
            },
            {
                value: "typescript",
                description: "TypeScript"
            },
            {
                value: "acorn",
                description: "JavaScript"
            },
            {
                value: "espree",
                description: "JavaScript"
            },
            {
                value: "meriyah",
                description: "JavaScript"
            },
            {
                value: "css",
                description: "CSS"
            },
            {
                value: "less",
                description: "Less"
            },
            {
                value: "scss",
                description: "SCSS"
            },
            {
                value: "json",
                description: "JSON"
            },
            {
                value: "json5",
                description: "JSON5"
            },
            {
                value: "json-stringify",
                description: "JSON.stringify"
            },
            {
                value: "graphql",
                description: "GraphQL"
            },
            {
                value: "markdown",
                description: "Markdown"
            },
            {
                value: "mdx",
                description: "MDX"
            },
            {
                value: "vue",
                description: "Vue"
            },
            {
                value: "yaml",
                description: "YAML"
            },
            {
                value: "glimmer",
                description: "Ember / Handlebars"
            },
            {
                value: "html",
                description: "HTML"
            },
            {
                value: "angular",
                description: "Angular"
            },
            {
                value: "lwc",
                description: "Lightning Web Components"
            }
        ]
    },
    plugins: {
        type: "path",
        array: !0,
        default: [
            {
                value: []
            }
        ],
        category: "Global",
        description: "Add a plugin. Multiple plugins can be passed as separate `--plugin`s.",
        exception: (e)=>typeof e == "string" || typeof e == "object",
        cliName: "plugin",
        cliCategory: "Config"
    },
    printWidth: {
        category: "Global",
        type: "int",
        default: 80,
        description: "The line length where Prettier will try wrap.",
        range: {
            start: 0,
            end: 1 / 0,
            step: 1
        }
    },
    rangeEnd: {
        category: "Special",
        type: "int",
        default: 1 / 0,
        range: {
            start: 0,
            end: 1 / 0,
            step: 1
        },
        description: `Format code ending at a given character offset (exclusive).
The range will extend forwards to the end of the selected statement.`,
        cliCategory: "Editor"
    },
    rangeStart: {
        category: "Special",
        type: "int",
        default: 0,
        range: {
            start: 0,
            end: 1 / 0,
            step: 1
        },
        description: `Format code starting at a given character offset.
The range will extend backwards to the start of the first line containing the selected statement.`,
        cliCategory: "Editor"
    },
    requirePragma: {
        category: "Special",
        type: "boolean",
        default: !1,
        description: `Require either '@prettier' or '@format' to be present in the file's first docblock comment
in order for it to be formatted.`,
        cliCategory: "Other"
    },
    tabWidth: {
        type: "int",
        category: "Global",
        default: 2,
        description: "Number of spaces per indentation level.",
        range: {
            start: 0,
            end: 1 / 0,
            step: 1
        }
    },
    useTabs: {
        category: "Global",
        type: "boolean",
        default: !1,
        description: "Indent with tabs instead of spaces."
    },
    embeddedLanguageFormatting: {
        category: "Global",
        type: "choice",
        default: "auto",
        description: "Control how Prettier formats quoted code embedded in the file.",
        choices: [
            {
                value: "auto",
                description: "Format embedded code if Prettier can automatically identify it."
            },
            {
                value: "off",
                description: "Never automatically format embedded code."
            }
        ]
    }
};
function et({ plugins: e = [], showDeprecated: t = !1 } = {}) {
    let r = e.flatMap((o)=>o.languages ?? []), n = [];
    for (let o of $u(Object.assign({}, ...e.map(({ options: u })=>u), Lr)))!t && o.deprecated || (Array.isArray(o.choices) && (t || (o.choices = o.choices.filter((u)=>!u.deprecated)), o.name === "parser" && (o.choices = [
        ...o.choices,
        ...Vu(o.choices, r, e)
    ])), o.pluginDefaults = Object.fromEntries(e.filter((u)=>{
        var i;
        return ((i = u.defaultOptions) == null ? void 0 : i[o.name]) !== void 0;
    }).map((u)=>[
            u.name,
            u.defaultOptions[o.name]
        ])), n.push(o));
    return {
        languages: r,
        options: n
    };
}
function* Vu(e, t, r) {
    let n = new Set(e.map((o)=>o.value));
    for (let o of t)if (o.parsers) {
        for (let u of o.parsers)if (!n.has(u)) {
            n.add(u);
            let i = r.find((D)=>D.parsers && Object.prototype.hasOwnProperty.call(D.parsers, u)), s = o.name;
            i != null && i.name && (s += ` (plugin: ${i.name})`), yield {
                value: u,
                description: s
            };
        }
    }
}
function $u(e) {
    let t = [];
    for (let [r, n] of Object.entries(e)){
        let o = {
            name: r,
            ...n
        };
        Array.isArray(o.default) && (o.default = y(!1, o.default, -1).value), t.push(o);
    }
    return t;
}
var Mu = (e)=>String(e).split(/[/\\]/).pop();
function Ir(e, t) {
    if (!t) return;
    let r = Mu(t).toLowerCase();
    return e.find((n)=>{
        var o, u;
        return ((o = n.extensions) == null ? void 0 : o.some((i)=>r.endsWith(i))) || ((u = n.filenames) == null ? void 0 : u.some((i)=>i.toLowerCase() === r));
    });
}
function Wu(e, t) {
    if (t) return e.find(({ name: r })=>r.toLowerCase() === t) ?? e.find(({ aliases: r })=>r == null ? void 0 : r.includes(t)) ?? e.find(({ extensions: r })=>r == null ? void 0 : r.includes(`.${t}`));
}
function Uu(e, t) {
    let r = e.plugins.flatMap((o)=>o.languages ?? []), n = Wu(r, t.language) ?? Ir(r, t.physicalFile) ?? Ir(r, t.file) ?? (t.physicalFile, void 0);
    return n == null ? void 0 : n.parsers[0];
}
var Rr = Uu;
var te = {
    key: (e)=>/^[$_a-zA-Z][$_a-zA-Z0-9]*$/.test(e) ? e : JSON.stringify(e),
    value (e) {
        if (e === null || typeof e != "object") return JSON.stringify(e);
        if (Array.isArray(e)) return `[${e.map((r)=>te.value(r)).join(", ")}]`;
        let t = Object.keys(e);
        return t.length === 0 ? "{}" : `{ ${t.map((r)=>`${te.key(r)}: ${te.value(e[r])}`).join(", ")} }`;
    },
    pair: ({ key: e, value: t })=>te.value({
            [e]: t
        })
};
var bt = he(Pe(), 1), Vr = (e, t, { descriptor: r })=>{
    let n = [
        `${bt.default.yellow(typeof e == "string" ? r.key(e) : r.pair(e))} is deprecated`
    ];
    return t && n.push(`we now treat it as ${bt.default.blue(typeof t == "string" ? r.key(t) : r.pair(t))}`), n.join("; ") + ".";
};
var se = he(Pe(), 1);
var tt = Symbol.for("vnopts.VALUE_NOT_EXIST"), pe = Symbol.for("vnopts.VALUE_UNCHANGED");
var $r = " ".repeat(2), Wr = (e, t, r)=>{
    let { text: n, list: o } = r.normalizeExpectedResult(r.schemas[e].expected(r)), u = [];
    return n && u.push(Mr(e, t, n, r.descriptor)), o && u.push([
        Mr(e, t, o.title, r.descriptor)
    ].concat(o.values.map((i)=>Ur(i, r.loggerPrintWidth))).join(`
`)), zr(u, r.loggerPrintWidth);
};
function Mr(e, t, r, n) {
    return [
        `Invalid ${se.default.red(n.key(e))} value.`,
        `Expected ${se.default.blue(r)},`,
        `but received ${t === tt ? se.default.gray("nothing") : se.default.red(n.value(t))}.`
    ].join(" ");
}
function Ur({ text: e, list: t }, r) {
    let n = [];
    return e && n.push(`- ${se.default.blue(e)}`), t && n.push([
        `- ${se.default.blue(t.title)}:`
    ].concat(t.values.map((o)=>Ur(o, r - $r.length).replace(/^|\n/g, `$&${$r}`))).join(`
`)), zr(n, r);
}
function zr(e, t) {
    if (e.length === 1) return e[0];
    let [r, n] = e, [o, u] = e.map((i)=>i.split(`
`, 1)[0].length);
    return o > t && o > u ? n : r;
}
var Nt = he(Pe(), 1);
var wt = [], Gr = [];
function Ot(e, t) {
    if (e === t) return 0;
    let r = e;
    e.length > t.length && (e = t, t = r);
    let n = e.length, o = t.length;
    for(; n > 0 && e.charCodeAt(~-n) === t.charCodeAt(~-o);)n--, o--;
    let u = 0;
    for(; u < n && e.charCodeAt(u) === t.charCodeAt(u);)u++;
    if (n -= u, o -= u, n === 0) return o;
    let i, s, D, a, c = 0, d = 0;
    for(; c < n;)Gr[c] = e.charCodeAt(u + c), wt[c] = ++c;
    for(; d < o;)for(i = t.charCodeAt(u + d), D = d++, s = d, c = 0; c < n; c++)a = i === Gr[c] ? D : D + 1, D = wt[c], s = wt[c] = D > s ? a > s ? s + 1 : a : a > D ? D + 1 : a;
    return s;
}
var rt = (e, t, { descriptor: r, logger: n, schemas: o })=>{
    let u = [
        `Ignored unknown option ${Nt.default.yellow(r.pair({
            key: e,
            value: t
        }))}.`
    ], i = Object.keys(o).sort().find((s)=>Ot(e, s) < 3);
    i && u.push(`Did you mean ${Nt.default.blue(r.key(i))}?`), n.warn(u.join(" "));
};
var zu = [
    "default",
    "expected",
    "validate",
    "deprecated",
    "forward",
    "redirect",
    "overlap",
    "preprocess",
    "postprocess"
];
function Gu(e, t) {
    let r = new e(t), n = Object.create(r);
    for (let o of zu)o in t && (n[o] = Ku(t[o], r, w.prototype[o].length));
    return n;
}
var w = class {
    static create(t) {
        return Gu(this, t);
    }
    constructor(t){
        this.name = t.name;
    }
    default(t) {}
    expected(t) {
        return "nothing";
    }
    validate(t, r) {
        return !1;
    }
    deprecated(t, r) {
        return !1;
    }
    forward(t, r) {}
    redirect(t, r) {}
    overlap(t, r, n) {
        return t;
    }
    preprocess(t, r) {
        return t;
    }
    postprocess(t, r) {
        return pe;
    }
};
function Ku(e, t, r) {
    return typeof e == "function" ? (...n)=>e(...n.slice(0, r - 1), t, ...n.slice(r - 1)) : ()=>e;
}
var nt = class extends w {
    constructor(t){
        super(t), this._sourceName = t.sourceName;
    }
    expected(t) {
        return t.schemas[this._sourceName].expected(t);
    }
    validate(t, r) {
        return r.schemas[this._sourceName].validate(t, r);
    }
    redirect(t, r) {
        return this._sourceName;
    }
};
var ut = class extends w {
    expected() {
        return "anything";
    }
    validate() {
        return !0;
    }
};
var ot = class extends w {
    constructor({ valueSchema: t, name: r = t.name, ...n }){
        super({
            ...n,
            name: r
        }), this._valueSchema = t;
    }
    expected(t) {
        let { text: r, list: n } = t.normalizeExpectedResult(this._valueSchema.expected(t));
        return {
            text: r && `an array of ${r}`,
            list: n && {
                title: "an array of the following values",
                values: [
                    {
                        list: n
                    }
                ]
            }
        };
    }
    validate(t, r) {
        if (!Array.isArray(t)) return !1;
        let n = [];
        for (let o of t){
            let u = r.normalizeValidateResult(this._valueSchema.validate(o, r), o);
            u !== !0 && n.push(u.value);
        }
        return n.length === 0 ? !0 : {
            value: n
        };
    }
    deprecated(t, r) {
        let n = [];
        for (let o of t){
            let u = r.normalizeDeprecatedResult(this._valueSchema.deprecated(o, r), o);
            u !== !1 && n.push(...u.map(({ value: i })=>({
                    value: [
                        i
                    ]
                })));
        }
        return n;
    }
    forward(t, r) {
        let n = [];
        for (let o of t){
            let u = r.normalizeForwardResult(this._valueSchema.forward(o, r), o);
            n.push(...u.map(Kr));
        }
        return n;
    }
    redirect(t, r) {
        let n = [], o = [];
        for (let u of t){
            let i = r.normalizeRedirectResult(this._valueSchema.redirect(u, r), u);
            "remain" in i && n.push(i.remain), o.push(...i.redirect.map(Kr));
        }
        return n.length === 0 ? {
            redirect: o
        } : {
            redirect: o,
            remain: n
        };
    }
    overlap(t, r) {
        return t.concat(r);
    }
};
function Kr({ from: e, to: t }) {
    return {
        from: [
            e
        ],
        to: t
    };
}
var it = class extends w {
    expected() {
        return "true or false";
    }
    validate(t) {
        return typeof t == "boolean";
    }
};
function qr(e, t) {
    let r = Object.create(null);
    for (let n of e){
        let o = n[t];
        if (r[o]) throw new Error(`Duplicate ${t} ${JSON.stringify(o)}`);
        r[o] = n;
    }
    return r;
}
function Jr(e, t) {
    let r = new Map;
    for (let n of e){
        let o = n[t];
        if (r.has(o)) throw new Error(`Duplicate ${t} ${JSON.stringify(o)}`);
        r.set(o, n);
    }
    return r;
}
function Xr() {
    let e = Object.create(null);
    return (t)=>{
        let r = JSON.stringify(t);
        return e[r] ? !0 : (e[r] = !0, !1);
    };
}
function Zr(e, t) {
    let r = [], n = [];
    for (let o of e)t(o) ? r.push(o) : n.push(o);
    return [
        r,
        n
    ];
}
function Qr(e) {
    return e === Math.floor(e);
}
function en(e, t) {
    if (e === t) return 0;
    let r = typeof e, n = typeof t, o = [
        "undefined",
        "object",
        "boolean",
        "number",
        "string"
    ];
    return r !== n ? o.indexOf(r) - o.indexOf(n) : r !== "string" ? Number(e) - Number(t) : e.localeCompare(t);
}
function tn(e) {
    return (...t)=>{
        let r = e(...t);
        return typeof r == "string" ? new Error(r) : r;
    };
}
function Tt(e) {
    return e === void 0 ? {} : e;
}
function St(e) {
    if (typeof e == "string") return {
        text: e
    };
    let { text: t, list: r } = e;
    return Hu((t || r) !== void 0, "Unexpected `expected` result, there should be at least one field."), r ? {
        text: t,
        list: {
            title: r.title,
            values: r.values.map(St)
        }
    } : {
        text: t
    };
}
function vt(e, t) {
    return e === !0 ? !0 : e === !1 ? {
        value: t
    } : e;
}
function Pt(e, t, r = !1) {
    return e === !1 ? !1 : e === !0 ? r ? !0 : [
        {
            value: t
        }
    ] : "value" in e ? [
        e
    ] : e.length === 0 ? !1 : e;
}
function Hr(e, t) {
    return typeof e == "string" || "key" in e ? {
        from: t,
        to: e
    } : "from" in e ? {
        from: e.from,
        to: e.to
    } : {
        from: t,
        to: e.to
    };
}
function st(e, t) {
    return e === void 0 ? [] : Array.isArray(e) ? e.map((r)=>Hr(r, t)) : [
        Hr(e, t)
    ];
}
function Lt(e, t) {
    let r = st(typeof e == "object" && "redirect" in e ? e.redirect : e, t);
    return r.length === 0 ? {
        remain: t,
        redirect: r
    } : typeof e == "object" && "remain" in e ? {
        remain: e.remain,
        redirect: r
    } : {
        redirect: r
    };
}
function Hu(e, t) {
    if (!e) throw new Error(t);
}
var Dt = class extends w {
    constructor(t){
        super(t), this._choices = Jr(t.choices.map((r)=>r && typeof r == "object" ? r : {
                value: r
            }), "value");
    }
    expected({ descriptor: t }) {
        let r = Array.from(this._choices.keys()).map((i)=>this._choices.get(i)).filter(({ hidden: i })=>!i).map((i)=>i.value).sort(en).map(t.value), n = r.slice(0, -2), o = r.slice(-2);
        return {
            text: n.concat(o.join(" or ")).join(", "),
            list: {
                title: "one of the following values",
                values: r
            }
        };
    }
    validate(t) {
        return this._choices.has(t);
    }
    deprecated(t) {
        let r = this._choices.get(t);
        return r && r.deprecated ? {
            value: t
        } : !1;
    }
    forward(t) {
        let r = this._choices.get(t);
        return r ? r.forward : void 0;
    }
    redirect(t) {
        let r = this._choices.get(t);
        return r ? r.redirect : void 0;
    }
};
var at = class extends w {
    expected() {
        return "a number";
    }
    validate(t, r) {
        return typeof t == "number";
    }
};
var ct = class extends at {
    expected() {
        return "an integer";
    }
    validate(t, r) {
        return r.normalizeValidateResult(super.validate(t, r), t) === !0 && Qr(t);
    }
};
var Le = class extends w {
    expected() {
        return "a string";
    }
    validate(t) {
        return typeof t == "string";
    }
};
var rn = te, nn = rt, un = Wr, on = Vr;
var lt = class {
    constructor(t, r){
        let { logger: n = console, loggerPrintWidth: o = 80, descriptor: u = rn, unknown: i = nn, invalid: s = un, deprecated: D = on, missing: a = ()=>!1, required: c = ()=>!1, preprocess: d = (p)=>p, postprocess: f = ()=>pe } = r || {};
        this._utils = {
            descriptor: u,
            logger: n || {
                warn: ()=>{}
            },
            loggerPrintWidth: o,
            schemas: qr(t, "name"),
            normalizeDefaultResult: Tt,
            normalizeExpectedResult: St,
            normalizeDeprecatedResult: Pt,
            normalizeForwardResult: st,
            normalizeRedirectResult: Lt,
            normalizeValidateResult: vt
        }, this._unknownHandler = i, this._invalidHandler = tn(s), this._deprecatedHandler = D, this._identifyMissing = (p, l)=>!(p in l) || a(p, l), this._identifyRequired = c, this._preprocess = d, this._postprocess = f, this.cleanHistory();
    }
    cleanHistory() {
        this._hasDeprecationWarned = Xr();
    }
    normalize(t) {
        let r = {}, o = [
            this._preprocess(t, this._utils)
        ], u = ()=>{
            for(; o.length !== 0;){
                let i = o.shift(), s = this._applyNormalization(i, r);
                o.push(...s);
            }
        };
        u();
        for (let i of Object.keys(this._utils.schemas)){
            let s = this._utils.schemas[i];
            if (!(i in r)) {
                let D = Tt(s.default(this._utils));
                "value" in D && o.push({
                    [i]: D.value
                });
            }
        }
        u();
        for (let i of Object.keys(this._utils.schemas)){
            if (!(i in r)) continue;
            let s = this._utils.schemas[i], D = r[i], a = s.postprocess(D, this._utils);
            a !== pe && (this._applyValidation(a, i, s), r[i] = a);
        }
        return this._applyPostprocess(r), this._applyRequiredCheck(r), r;
    }
    _applyNormalization(t, r) {
        let n = [], { knownKeys: o, unknownKeys: u } = this._partitionOptionKeys(t);
        for (let i of o){
            let s = this._utils.schemas[i], D = s.preprocess(t[i], this._utils);
            this._applyValidation(D, i, s);
            let a = ({ from: p, to: l })=>{
                n.push(typeof l == "string" ? {
                    [l]: p
                } : {
                    [l.key]: l.value
                });
            }, c = ({ value: p, redirectTo: l })=>{
                let F = Pt(s.deprecated(p, this._utils), D, !0);
                if (F !== !1) {
                    if (F === !0) this._hasDeprecationWarned(i) || this._utils.logger.warn(this._deprecatedHandler(i, l, this._utils));
                    else for (let { value: m } of F){
                        let E = {
                            key: i,
                            value: m
                        };
                        if (!this._hasDeprecationWarned(E)) {
                            let C = typeof l == "string" ? {
                                key: l,
                                value: m
                            } : l;
                            this._utils.logger.warn(this._deprecatedHandler(E, C, this._utils));
                        }
                    }
                }
            };
            st(s.forward(D, this._utils), D).forEach(a);
            let f = Lt(s.redirect(D, this._utils), D);
            if (f.redirect.forEach(a), "remain" in f) {
                let p = f.remain;
                r[i] = i in r ? s.overlap(r[i], p, this._utils) : p, c({
                    value: p
                });
            }
            for (let { from: p, to: l } of f.redirect)c({
                value: p,
                redirectTo: l
            });
        }
        for (let i of u){
            let s = t[i];
            this._applyUnknownHandler(i, s, r, (D, a)=>{
                n.push({
                    [D]: a
                });
            });
        }
        return n;
    }
    _applyRequiredCheck(t) {
        for (let r of Object.keys(this._utils.schemas))if (this._identifyMissing(r, t) && this._identifyRequired(r)) throw this._invalidHandler(r, tt, this._utils);
    }
    _partitionOptionKeys(t) {
        let [r, n] = Zr(Object.keys(t).filter((o)=>!this._identifyMissing(o, t)), (o)=>o in this._utils.schemas);
        return {
            knownKeys: r,
            unknownKeys: n
        };
    }
    _applyValidation(t, r, n) {
        let o = vt(n.validate(t, this._utils), t);
        if (o !== !0) throw this._invalidHandler(r, o.value, this._utils);
    }
    _applyUnknownHandler(t, r, n, o) {
        let u = this._unknownHandler(t, r, this._utils);
        if (u) for (let i of Object.keys(u)){
            if (this._identifyMissing(i, u)) continue;
            let s = u[i];
            i in this._utils.schemas ? o(i, s) : n[i] = s;
        }
    }
    _applyPostprocess(t) {
        let r = this._postprocess(t, this._utils);
        if (r !== pe) {
            if (r.delete) for (let n of r.delete)delete t[n];
            if (r.override) {
                let { knownKeys: n, unknownKeys: o } = this._partitionOptionKeys(r.override);
                for (let u of n){
                    let i = r.override[u];
                    this._applyValidation(i, u, this._utils.schemas[u]), t[u] = i;
                }
                for (let u of o){
                    let i = r.override[u];
                    this._applyUnknownHandler(u, i, t, (s, D)=>{
                        let a = this._utils.schemas[s];
                        this._applyValidation(D, s, a), t[s] = D;
                    });
                }
            }
        }
    }
};
var It;
function Ju(e, t, { logger: r = !1, isCLI: n = !1, passThrough: o = !1, FlagSchema: u, descriptor: i } = {}) {
    if (n) {
        if (!u) throw new Error("'FlagSchema' option is required.");
        if (!i) throw new Error("'descriptor' option is required.");
    } else i = te;
    let s = o ? Array.isArray(o) ? (f, p)=>o.includes(f) ? {
            [f]: p
        } : void 0 : (f, p)=>({
            [f]: p
        }) : (f, p, l)=>{
        let { _: F, ...m } = l.schemas;
        return rt(f, p, {
            ...l,
            schemas: m
        });
    }, D = Xu(t, {
        isCLI: n,
        FlagSchema: u
    }), a = new lt(D, {
        logger: r,
        unknown: s,
        descriptor: i
    }), c = r !== !1;
    c && It && (a._hasDeprecationWarned = It);
    let d = a.normalize(e);
    return c && (It = a._hasDeprecationWarned), d;
}
function Xu(e, { isCLI: t, FlagSchema: r }) {
    let n = [];
    t && n.push(ut.create({
        name: "_"
    }));
    for (let o of e)n.push(Zu(o, {
        isCLI: t,
        optionInfos: e,
        FlagSchema: r
    })), o.alias && t && n.push(nt.create({
        name: o.alias,
        sourceName: o.name
    }));
    return n;
}
function Zu(e, { isCLI: t, optionInfos: r, FlagSchema: n }) {
    let { name: o } = e, u = {
        name: o
    }, i, s = {};
    switch(e.type){
        case "int":
            i = ct, t && (u.preprocess = Number);
            break;
        case "string":
            i = Le;
            break;
        case "choice":
            i = Dt, u.choices = e.choices.map((D)=>D != null && D.redirect ? {
                    ...D,
                    redirect: {
                        to: {
                            key: e.name,
                            value: D.redirect
                        }
                    }
                } : D);
            break;
        case "boolean":
            i = it;
            break;
        case "flag":
            i = n, u.flags = r.flatMap((D)=>[
                    D.alias,
                    D.description && D.name,
                    D.oppositeDescription && `no-${D.name}`
                ].filter(Boolean));
            break;
        case "path":
            i = Le;
            break;
        default:
            throw new Error(`Unexpected type ${e.type}`);
    }
    if (e.exception ? u.validate = (D, a, c)=>e.exception(D) || a.validate(D, c) : u.validate = (D, a, c)=>D === void 0 || a.validate(D, c), e.redirect && (s.redirect = (D)=>D ? {
            to: {
                key: e.redirect.option,
                value: e.redirect.value
            }
        } : void 0), e.deprecated && (s.deprecated = !0), t && !e.array) {
        let D = u.preprocess || ((a)=>a);
        u.preprocess = (a, c, d)=>c.preprocess(D(Array.isArray(a) ? y(!1, a, -1) : a), d);
    }
    return e.array ? ot.create({
        ...t ? {
            preprocess: (D)=>Array.isArray(D) ? D : [
                    D
                ]
        } : {},
        ...s,
        valueSchema: i.create(u)
    }) : i.create({
        ...u,
        ...s
    });
}
var sn = Ju;
function Rt(e, t) {
    if (!t) throw new Error("parserName is required.");
    for(let n = e.length - 1; n >= 0; n--){
        let o = e[n];
        if (o.parsers && Object.prototype.hasOwnProperty.call(o.parsers, t)) return o;
    }
    let r = `Couldn't resolve parser "${t}".`;
    throw r += " Plugins must be explicitly added to the standalone bundle.", new Se(r);
}
function Dn(e, t) {
    if (!t) throw new Error("astFormat is required.");
    for(let n = e.length - 1; n >= 0; n--){
        let o = e[n];
        if (o.printers && Object.prototype.hasOwnProperty.call(o.printers, t)) return o;
    }
    let r = `Couldn't find plugin for AST format "${t}".`;
    throw r += " Plugins must be explicitly added to the standalone bundle.", new Se(r);
}
function ft({ plugins: e, parser: t }) {
    let r = Rt(e, t);
    return Yt(r, t);
}
function Yt(e, t) {
    let r = e.parsers[t];
    return typeof r == "function" ? r() : r;
}
function an(e, t) {
    let r = e.printers[t];
    return typeof r == "function" ? r() : r;
}
var cn = {
    astFormat: "estree",
    printer: {},
    originalText: void 0,
    locStart: null,
    locEnd: null
};
async function Qu(e, t = {}) {
    var d;
    let r = {
        ...e
    };
    if (!r.parser) {
        if (r.filepath) {
            if (r.parser = Rr(r, {
                physicalFile: r.filepath
            }), !r.parser) throw new ve(`No parser could be inferred for file "${r.filepath}".`);
        } else throw new ve("No parser and no file path given, couldn't infer a parser.");
    }
    let n = et({
        plugins: e.plugins,
        showDeprecated: !0
    }).options, o = {
        ...cn,
        ...Object.fromEntries(n.filter((f)=>f.default !== void 0).map((f)=>[
                f.name,
                f.default
            ]))
    }, u = Rt(r.plugins, r.parser), i = await Yt(u, r.parser);
    r.astFormat = i.astFormat, r.locEnd = i.locEnd, r.locStart = i.locStart;
    let s = (d = u.printers) != null && d[i.astFormat] ? u : Dn(r.plugins, i.astFormat), D = await an(s, i.astFormat);
    r.printer = D;
    let a = s.defaultOptions ? Object.fromEntries(Object.entries(s.defaultOptions).filter(([, f])=>f !== void 0)) : {}, c = {
        ...o,
        ...a
    };
    for (let [f, p] of Object.entries(c))(r[f] === null || r[f] === void 0) && (r[f] = p);
    return r.parser === "json" && (r.trailingComma = "none"), sn(r, n, {
        passThrough: Object.keys(cn),
        ...t
    });
}
var re = Qu;
var ln = new Set([
    "tokens",
    "comments",
    "parent",
    "enclosingNode",
    "precedingNode",
    "followingNode"
]), eo = (e)=>Object.keys(e).filter((t)=>!ln.has(t));
function to(e) {
    return e ? (t)=>e(t, ln) : eo;
}
var H = to;
function ro(e, t) {
    let { printer: { massageAstNode: r, getVisitorKeys: n } } = t;
    if (!r) return e;
    let o = H(n), u = r.ignoredProperties ?? new Set;
    return i(e);
    function i(s, D) {
        if (!(s !== null && typeof s == "object")) return s;
        if (Array.isArray(s)) return s.map((f)=>i(f, D)).filter(Boolean);
        let a = {}, c = new Set(o(s));
        for(let f in s)!Object.prototype.hasOwnProperty.call(s, f) || u.has(f) || (c.has(f) ? a[f] = i(s[f], s) : a[f] = s[f]);
        let d = r(s, a, D);
        if (d !== null) return d ?? a;
    }
}
var fn = ro;
var An = he(yn(), 1);
async function co(e, t) {
    let r = await ft(t), n = r.preprocess ? r.preprocess(e, t) : e;
    t.originalText = n;
    let o;
    try {
        o = await r.parse(n, t, t);
    } catch (u) {
        lo(u, e);
    }
    return {
        text: n,
        ast: o
    };
}
function lo(e, t) {
    let { loc: r } = e;
    if (r) {
        let n = (0, An.codeFrameColumns)(t, r, {
            highlightCode: !0
        });
        throw e.message += `
` + n, e.codeFrame = n, e;
    }
    throw e;
}
var De = co;
var Ie, $t, de, pt, Vt = class {
    constructor(t){
        ht(this, Ie);
        ht(this, de);
        this.stack = [
            t
        ];
    }
    get key() {
        let { stack: t, siblings: r } = this;
        return y(!1, t, r === null ? -2 : -4) ?? null;
    }
    get index() {
        return this.siblings === null ? null : y(!1, this.stack, -2);
    }
    get node() {
        return y(!1, this.stack, -1);
    }
    get parent() {
        return this.getNode(1);
    }
    get grandparent() {
        return this.getNode(2);
    }
    get isInArray() {
        return this.siblings !== null;
    }
    get siblings() {
        let { stack: t } = this, r = y(!1, t, -3);
        return Array.isArray(r) ? r : null;
    }
    get next() {
        let { siblings: t } = this;
        return t === null ? null : t[this.index + 1];
    }
    get previous() {
        let { siblings: t } = this;
        return t === null ? null : t[this.index - 1];
    }
    get isFirst() {
        return this.index === 0;
    }
    get isLast() {
        let { siblings: t, index: r } = this;
        return t !== null && r === t.length - 1;
    }
    get isRoot() {
        return this.stack.length === 1;
    }
    get root() {
        return this.stack[0];
    }
    get ancestors() {
        return [
            ...ce(this, de, pt).call(this)
        ];
    }
    getName() {
        let { stack: t } = this, { length: r } = t;
        return r > 1 ? y(!1, t, -2) : null;
    }
    getValue() {
        return y(!1, this.stack, -1);
    }
    getNode(t = 0) {
        let r = ce(this, Ie, $t).call(this, t);
        return r === -1 ? null : this.stack[r];
    }
    getParentNode(t = 0) {
        return this.getNode(t + 1);
    }
    call(t, ...r) {
        let { stack: n } = this, { length: o } = n, u = y(!1, n, -1);
        for (let i of r)u = u[i], n.push(i, u);
        try {
            return t(this);
        } finally{
            n.length = o;
        }
    }
    callParent(t, r = 0) {
        let n = ce(this, Ie, $t).call(this, r + 1), o = this.stack.splice(n + 1);
        try {
            return t(this);
        } finally{
            this.stack.push(...o);
        }
    }
    each(t, ...r) {
        let { stack: n } = this, { length: o } = n, u = y(!1, n, -1);
        for (let i of r)u = u[i], n.push(i, u);
        try {
            for(let i = 0; i < u.length; ++i)n.push(i, u[i]), t(this, i, u), n.length -= 2;
        } finally{
            n.length = o;
        }
    }
    map(t, ...r) {
        let n = [];
        return this.each((o, u, i)=>{
            n[u] = t(o, u, i);
        }, ...r), n;
    }
    match(...t) {
        let r = this.stack.length - 1, n = null, o = this.stack[r--];
        for (let u of t){
            if (o === void 0) return !1;
            let i = null;
            if (typeof n == "number" && (i = n, n = this.stack[r--], o = this.stack[r--]), u && !u(o, n, i)) return !1;
            n = this.stack[r--], o = this.stack[r--];
        }
        return !0;
    }
    findAncestor(t) {
        for (let r of ce(this, de, pt).call(this))if (t(r)) return r;
    }
    hasAncestor(t) {
        for (let r of ce(this, de, pt).call(this))if (t(r)) return !0;
        return !1;
    }
};
Ie = new WeakSet, $t = function(t) {
    let { stack: r } = this;
    for(let n = r.length - 1; n >= 0; n -= 2)if (!Array.isArray(r[n]) && --t < 0) return n;
    return -1;
}, de = new WeakSet, pt = function*() {
    let { stack: t } = this;
    for(let r = t.length - 3; r >= 0; r -= 2){
        let n = t[r];
        Array.isArray(n) || (yield n);
    }
};
var Bn = Vt;
var _n = new Proxy(()=>{}, {
    get: ()=>_n
}), Re = _n;
function me(e) {
    return (t, r, n)=>{
        let o = !!(n != null && n.backwards);
        if (r === !1) return !1;
        let { length: u } = t, i = r;
        for(; i >= 0 && i < u;){
            let s = t.charAt(i);
            if (e instanceof RegExp) {
                if (!e.test(s)) return i;
            } else if (!e.includes(s)) return i;
            o ? i-- : i++;
        }
        return i === -1 || i === u ? i : !1;
    };
}
var xn = me(/\s/), N = me(" 	"), dt = me(",; 	"), mt = me(/[^\n\r]/);
function fo(e, t, r) {
    let n = !!(r != null && r.backwards);
    if (t === !1) return !1;
    let o = e.charAt(t);
    if (n) {
        if (e.charAt(t - 1) === "\r" && o === `
`) return t - 2;
        if (o === `
` || o === "\r" || o === "\u2028" || o === "\u2029") return t - 1;
    } else {
        if (o === "\r" && e.charAt(t + 1) === `
`) return t + 2;
        if (o === `
` || o === "\r" || o === "\u2028" || o === "\u2029") return t + 1;
    }
    return t;
}
var Y = fo;
function Fo(e, t, r = {}) {
    let n = N(e, r.backwards ? t - 1 : t, r), o = Y(e, n, r);
    return n !== o;
}
var V = Fo;
function po(e) {
    return Array.isArray(e) && e.length > 0;
}
var Mt = po;
function mo(e) {
    return e !== null && typeof e == "object";
}
var kn = mo;
function* Wt(e, t) {
    let { getVisitorKeys: r, filter: n = ()=>!0 } = t, o = (u)=>kn(u) && n(u);
    for (let u of r(e)){
        let i = e[u];
        if (Array.isArray(i)) for (let s of i)o(s) && (yield s);
        else o(i) && (yield i);
    }
}
function* bn(e, t) {
    let r = [
        e
    ];
    for(let n = 0; n < r.length; n++){
        let o = r[n];
        for (let u of Wt(o, t))yield u, r.push(u);
    }
}
function Eo(e) {
    let t = e.type || e.kind || "(unknown type)", r = String(e.name || e.id && (typeof e.id == "object" ? e.id.name : e.id) || e.key && (typeof e.key == "object" ? e.key.name : e.key) || e.value && (typeof e.value == "object" ? "" : String(e.value)) || e.operator || "");
    return r.length > 20 && (r = r.slice(0, 19) + "\u2026"), t + (r ? " " + r : "");
}
function Ut(e, t) {
    (e.comments ?? (e.comments = [])).push(t), t.printed = !1, t.nodeDescription = Eo(e);
}
function ne(e, t) {
    t.leading = !0, t.trailing = !1, Ut(e, t);
}
function X(e, t, r) {
    t.leading = !1, t.trailing = !1, r && (t.marker = r), Ut(e, t);
}
function ue(e, t) {
    t.leading = !1, t.trailing = !0, Ut(e, t);
}
var zt = new WeakMap;
function Et(e, t) {
    if (zt.has(e)) return zt.get(e);
    let { printer: { getCommentChildNodes: r, canAttachComment: n, getVisitorKeys: o }, locStart: u, locEnd: i } = t;
    if (!n) return [];
    let s = ((r == null ? void 0 : r(e, t)) ?? [
        ...Wt(e, {
            getVisitorKeys: H(o)
        })
    ]).flatMap((D)=>n(D) ? [
            D
        ] : Et(D, t));
    return s.sort((D, a)=>u(D) - u(a) || i(D) - i(a)), zt.set(e, s), s;
}
function On(e, t, r, n) {
    let { locStart: o, locEnd: u } = r, i = o(t), s = u(t), D = Et(e, r), a, c, d = 0, f = D.length;
    for(; d < f;){
        let p = d + f >> 1, l = D[p], F = o(l), m = u(l);
        if (F <= i && s <= m) return On(l, t, r, l);
        if (m <= i) {
            a = l, d = p + 1;
            continue;
        }
        if (s <= F) {
            c = l, f = p;
            continue;
        }
        throw new Error("Comment location overlaps with node location");
    }
    if ((n == null ? void 0 : n.type) === "TemplateLiteral") {
        let { quasis: p } = n, l = Kt(p, t, r);
        a && Kt(p, a, r) !== l && (a = null), c && Kt(p, c, r) !== l && (c = null);
    }
    return {
        enclosingNode: n,
        precedingNode: a,
        followingNode: c
    };
}
var Gt = ()=>!1;
function Nn(e, t) {
    let { comments: r } = e;
    if (delete e.comments, !Mt(r) || !t.printer.canAttachComment) return;
    let n = [], { locStart: o, locEnd: u, printer: { experimentalFeatures: { avoidAstMutation: i = !1 } = {}, handleComments: s = {} }, originalText: D } = t, { ownLine: a = Gt, endOfLine: c = Gt, remaining: d = Gt } = s, f = r.map((p, l)=>({
            ...On(e, p, t),
            comment: p,
            text: D,
            options: t,
            ast: e,
            isLastComment: r.length - 1 === l
        }));
    for (let [p, l] of f.entries()){
        let { comment: F, precedingNode: m, enclosingNode: E, followingNode: C, text: g, options: h, ast: B, isLastComment: Z } = l;
        if (h.parser === "json" || h.parser === "json5" || h.parser === "__js_expression" || h.parser === "__ts_expression" || h.parser === "__vue_expression" || h.parser === "__vue_ts_expression") {
            if (o(F) - o(B) <= 0) {
                ne(B, F);
                continue;
            }
            if (u(F) - u(B) >= 0) {
                ue(B, F);
                continue;
            }
        }
        let $;
        if (i ? $ = [
            l
        ] : (F.enclosingNode = E, F.precedingNode = m, F.followingNode = C, $ = [
            F,
            g,
            h,
            B,
            Z
        ]), Co(g, h, f, p)) F.placement = "ownLine", a(...$) || (C ? ne(C, F) : m ? ue(m, F) : E ? X(E, F) : X(B, F));
        else if (ho(g, h, f, p)) F.placement = "endOfLine", c(...$) || (m ? ue(m, F) : C ? ne(C, F) : E ? X(E, F) : X(B, F));
        else if (F.placement = "remaining", !d(...$)) {
            if (m && C) {
                let Q = n.length;
                Q > 0 && n[Q - 1].followingNode !== C && wn(n, h), n.push(l);
            } else m ? ue(m, F) : C ? ne(C, F) : E ? X(E, F) : X(B, F);
        }
    }
    if (wn(n, t), !i) for (let p of r)delete p.precedingNode, delete p.enclosingNode, delete p.followingNode;
}
var Tn = (e)=>!/[\S\n\u2028\u2029]/.test(e);
function Co(e, t, r, n) {
    let { comment: o, precedingNode: u } = r[n], { locStart: i, locEnd: s } = t, D = i(o);
    if (u) for(let a = n - 1; a >= 0; a--){
        let { comment: c, precedingNode: d } = r[a];
        if (d !== u || !Tn(e.slice(s(c), D))) break;
        D = i(c);
    }
    return V(e, D, {
        backwards: !0
    });
}
function ho(e, t, r, n) {
    let { comment: o, followingNode: u } = r[n], { locStart: i, locEnd: s } = t, D = s(o);
    if (u) for(let a = n + 1; a < r.length; a++){
        let { comment: c, followingNode: d } = r[a];
        if (d !== u || !Tn(e.slice(D, i(c)))) break;
        D = s(c);
    }
    return V(e, D);
}
function wn(e, t) {
    var s, D;
    let r = e.length;
    if (r === 0) return;
    let { precedingNode: n, followingNode: o } = e[0], u = t.locStart(o), i;
    for(i = r; i > 0; --i){
        let { comment: a, precedingNode: c, followingNode: d } = e[i - 1];
        Re.strictEqual(c, n), Re.strictEqual(d, o);
        let f = t.originalText.slice(t.locEnd(a), u);
        if (((D = (s = t.printer).isGap) == null ? void 0 : D.call(s, f, t)) ?? /^[\s(]*$/.test(f)) u = t.locStart(a);
        else break;
    }
    for (let [a, { comment: c }] of e.entries())a < i ? ue(n, c) : ne(o, c);
    for (let a of [
        n,
        o
    ])a.comments && a.comments.length > 1 && a.comments.sort((c, d)=>t.locStart(c) - t.locStart(d));
    e.length = 0;
}
function Kt(e, t, r) {
    let n = r.locStart(t) - 1;
    for(let o = 1; o < e.length; ++o)if (n < r.locStart(e[o])) return o - 1;
    return 0;
}
function go(e, t) {
    let r = t - 1;
    r = N(e, r, {
        backwards: !0
    }), r = Y(e, r, {
        backwards: !0
    }), r = N(e, r, {
        backwards: !0
    });
    let n = Y(e, r, {
        backwards: !0
    });
    return r !== n;
}
var Ye = go;
function Sn(e, t) {
    let r = e.node;
    return r.printed = !0, t.printer.printComment(e, t);
}
function yo(e, t) {
    var c;
    let r = e.node, n = [
        Sn(e, t)
    ], { printer: o, originalText: u, locStart: i, locEnd: s } = t;
    if ((c = o.isBlockComment) == null ? void 0 : c.call(o, r)) {
        let d = V(u, s(r)) ? V(u, i(r), {
            backwards: !0
        }) ? G : Ke : " ";
        n.push(d);
    } else n.push(G);
    let a = Y(u, N(u, s(r)));
    return a !== !1 && V(u, a) && n.push(G), n;
}
function Ao(e, t, r) {
    var a;
    let n = e.node, o = Sn(e, t), { printer: u, originalText: i, locStart: s } = t, D = (a = u.isBlockComment) == null ? void 0 : a.call(u, n);
    if (r != null && r.hasLineSuffix && !(r != null && r.isBlock) || V(i, s(n), {
        backwards: !0
    })) {
        let c = Ye(i, s(n));
        return {
            doc: Be([
                G,
                c ? G : "",
                o
            ]),
            isBlock: D,
            hasLineSuffix: !0
        };
    }
    return !D || r != null && r.hasLineSuffix ? {
        doc: [
            Be([
                " ",
                o
            ]),
            le
        ],
        isBlock: D,
        hasLineSuffix: !0
    } : {
        doc: [
            " ",
            o
        ],
        isBlock: D,
        hasLineSuffix: !1
    };
}
function Bo(e, t) {
    let r = e.node;
    if (!r) return {};
    let n = t[Symbol.for("printedComments")];
    if ((r.comments || []).filter((D)=>!n.has(D)).length === 0) return {
        leading: "",
        trailing: ""
    };
    let u = [], i = [], s;
    return e.each(()=>{
        let D = e.node;
        if (n != null && n.has(D)) return;
        let { leading: a, trailing: c } = D;
        a ? u.push(yo(e, t)) : c && (s = Ao(e, t, s), i.push(s.doc));
    }, "comments"), {
        leading: u,
        trailing: i
    };
}
function vn(e, t, r) {
    let { leading: n, trailing: o } = Bo(e, r);
    return !n && !o ? t : Ze(t, (u)=>[
            n,
            u,
            o
        ]);
}
function Pn(e) {
    let { [Symbol.for("comments")]: t, [Symbol.for("printedComments")]: r } = e;
    for (let n of t){
        if (!n.printed && !r.has(n)) throw new Error('Comment "' + n.value.trim() + '" was not printed. Please report this error!');
        delete n.printed;
    }
}
async function Ln(e, t, r, n, o) {
    let { embeddedLanguageFormatting: u, printer: { embed: i, hasPrettierIgnore: s = ()=>!1, getVisitorKeys: D } } = r;
    if (!i || u !== "auto") return;
    if (i.length > 2) throw new Error("printer.embed has too many parameters. The API changed in Prettier v3. Please update your plugin. See https://prettier.io/docs/en/plugins.html#optional-embed");
    let a = H(i.getVisitorKeys ?? D), c = [];
    p();
    let d = e.stack;
    for (let { print: l, node: F, pathStack: m } of c)try {
        e.stack = m;
        let E = await l(f, t, e, r);
        E && o.set(F, E);
    } catch (E) {
        if (globalThis.PRETTIER_DEBUG) throw E;
    }
    e.stack = d;
    function f(l, F) {
        return _o(l, F, r, n);
    }
    function p() {
        let { node: l } = e;
        if (l === null || typeof l != "object" || s(e)) return;
        for (let m of a(l))Array.isArray(l[m]) ? e.each(p, m) : e.call(p, m);
        let F = i(e, r);
        if (F) {
            if (typeof F == "function") {
                c.push({
                    print: F,
                    node: l,
                    pathStack: [
                        ...e.stack
                    ]
                });
                return;
            }
            o.set(l, F);
        }
    }
}
async function _o(e, t, r, n) {
    let o = await re({
        ...r,
        ...t,
        parentParser: r.parser,
        originalText: e
    }, {
        passThrough: !0
    }), { ast: u } = await De(e, o), i = await n(u, o);
    return Xe(i);
}
function xo(e) {
    return ()=>{};
}
var In = xo;
function ko(e, t) {
    let { originalText: r, [Symbol.for("comments")]: n, locStart: o, locEnd: u, [Symbol.for("printedComments")]: i } = t, { node: s } = e, D = o(s), a = u(s);
    for (let c of n)o(c) >= D && u(c) <= a && i.add(c);
    return r.slice(D, a);
}
var Rn = ko;
async function je(e, t) {
    ({ ast: e } = await Ht(e, t));
    let r = new Map, n = new Bn(e), o = In(t), u = new Map;
    await Ln(n, s, t, je, u);
    let i = await Yn(n, t, s, void 0, u);
    return Pn(t), i;
    function s(a, c) {
        return a === void 0 || a === n ? D(c) : Array.isArray(a) ? n.call(()=>D(c), ...a) : n.call(()=>D(c), a);
    }
    function D(a) {
        o(n);
        let c = n.node;
        if (c == null) return "";
        let d = c && typeof c == "object" && a === void 0;
        if (d && r.has(c)) return r.get(c);
        let f = Yn(n, t, s, a, u);
        return d && r.set(c, f), f;
    }
}
function Yn(e, t, r, n, o) {
    var D;
    let { node: u } = e, { printer: i } = t, s;
    return (D = i.hasPrettierIgnore) != null && D.call(i, e) ? s = Rn(e, t) : o.has(u) ? s = o.get(u) : s = i.print(e, t, r, n), u === t.cursorNode && (s = Ze(s, (a)=>[
            xe,
            a,
            xe
        ])), i.printComment && (!i.willPrintOwnComments || !i.willPrintOwnComments(e, t)) && (s = vn(e, s, t)), s;
}
async function Ht(e, t) {
    let r = e.comments ?? [];
    t[Symbol.for("comments")] = r, t[Symbol.for("tokens")] = e.tokens ?? [], t[Symbol.for("printedComments")] = new Set, Nn(e, t);
    let { printer: { preprocess: n } } = t;
    return e = n ? await n(e, t) : e, {
        ast: e,
        comments: r
    };
}
var bo = ({ parser: e })=>e === "json" || e === "json5" || e === "json-stringify";
function wo(e, t) {
    let r = [
        e.node,
        ...e.parentNodes
    ], n = new Set([
        t.node,
        ...t.parentNodes
    ]);
    return r.find((o)=>$n.has(o.type) && n.has(o));
}
function jn(e) {
    let t = e.length - 1;
    for(;;){
        let r = e[t];
        if ((r == null ? void 0 : r.type) === "Program" || (r == null ? void 0 : r.type) === "File") t--;
        else break;
    }
    return e.slice(0, t + 1);
}
function Oo(e, t, { locStart: r, locEnd: n }) {
    let o = e.node, u = t.node;
    if (o === u) return {
        startNode: o,
        endNode: u
    };
    let i = r(e.node);
    for (let D of jn(t.parentNodes))if (r(D) >= i) u = D;
    else break;
    let s = n(t.node);
    for (let D of jn(e.parentNodes)){
        if (n(D) <= s) o = D;
        else break;
        if (o === u) break;
    }
    return {
        startNode: o,
        endNode: u
    };
}
function qt(e, t, r, n, o = [], u) {
    let { locStart: i, locEnd: s } = r, D = i(e), a = s(e);
    if (!(t > a || t < D || u === "rangeEnd" && t === D || u === "rangeStart" && t === a)) {
        for (let c of Et(e, r)){
            let d = qt(c, t, r, n, [
                e,
                ...o
            ], u);
            if (d) return d;
        }
        if (!n || n(e, o[0])) return {
            node: e,
            parentNodes: o
        };
    }
}
function No(e, t) {
    return t !== "DeclareExportDeclaration" && e !== "TypeParameterDeclaration" && (e === "Directive" || e === "TypeAlias" || e === "TSExportAssignment" || e.startsWith("Declare") || e.startsWith("TSDeclare") || e.endsWith("Statement") || e.endsWith("Declaration"));
}
var $n = new Set([
    "JsonRoot",
    "ObjectExpression",
    "ArrayExpression",
    "StringLiteral",
    "NumericLiteral",
    "BooleanLiteral",
    "NullLiteral",
    "UnaryExpression",
    "TemplateLiteral"
]), To = new Set([
    "OperationDefinition",
    "FragmentDefinition",
    "VariableDefinition",
    "TypeExtensionDefinition",
    "ObjectTypeDefinition",
    "FieldDefinition",
    "DirectiveDefinition",
    "EnumTypeDefinition",
    "EnumValueDefinition",
    "InputValueDefinition",
    "InputObjectTypeDefinition",
    "SchemaDefinition",
    "OperationTypeDefinition",
    "InterfaceTypeDefinition",
    "UnionTypeDefinition",
    "ScalarTypeDefinition"
]);
function Vn(e, t, r) {
    if (!t) return !1;
    switch(e.parser){
        case "flow":
        case "babel":
        case "babel-flow":
        case "babel-ts":
        case "typescript":
        case "acorn":
        case "espree":
        case "meriyah":
        case "__babel_estree":
            return No(t.type, r == null ? void 0 : r.type);
        case "json":
        case "json5":
        case "json-stringify":
            return $n.has(t.type);
        case "graphql":
            return To.has(t.kind);
        case "vue":
            return t.tag !== "root";
    }
    return !1;
}
function Mn(e, t, r) {
    let { rangeStart: n, rangeEnd: o, locStart: u, locEnd: i } = t;
    Re.ok(o > n);
    let s = e.slice(n, o).search(/\S/), D = s === -1;
    if (!D) for(n += s; o > n && !/\S/.test(e[o - 1]); --o);
    let a = qt(r, n, t, (p, l)=>Vn(t, p, l), [], "rangeStart"), c = D ? a : qt(r, o, t, (p)=>Vn(t, p), [], "rangeEnd");
    if (!a || !c) return {
        rangeStart: 0,
        rangeEnd: 0
    };
    let d, f;
    if (bo(t)) {
        let p = wo(a, c);
        d = p, f = p;
    } else ({ startNode: d, endNode: f } = Oo(a, c, t));
    return {
        rangeStart: Math.min(u(d), u(f)),
        rangeEnd: Math.max(i(d), i(f))
    };
}
function So(e, t) {
    let { cursorOffset: r, locStart: n, locEnd: o } = t, u = H(t.printer.getVisitorKeys), i = (D)=>n(D) <= r && o(D) >= r, s = e;
    for (let D of bn(e, {
        getVisitorKeys: u,
        filter: i
    }))s = D;
    return s;
}
var Wn = So;
var Hn = "\uFEFF", Un = Symbol("cursor");
async function qn(e, t, r = 0) {
    if (!e || e.trim().length === 0) return {
        formatted: "",
        cursorOffset: -1,
        comments: []
    };
    let { ast: n, text: o } = await De(e, t);
    t.cursorOffset >= 0 && (t.cursorNode = Wn(n, t));
    let u = await je(n, t, r);
    r > 0 && (u = qe([
        G,
        u
    ], r, t.tabWidth));
    let i = fe(u, t);
    if (r > 0) {
        let D = i.formatted.trim();
        i.cursorNodeStart !== void 0 && (i.cursorNodeStart -= i.formatted.indexOf(D)), i.formatted = D + be(t.endOfLine);
    }
    let s = t[Symbol.for("comments")];
    if (t.cursorOffset >= 0) {
        let D, a, c, d, f;
        if (t.cursorNode && i.cursorNodeText ? (D = t.locStart(t.cursorNode), a = o.slice(D, t.locEnd(t.cursorNode)), c = t.cursorOffset - D, d = i.cursorNodeStart, f = i.cursorNodeText) : (D = 0, a = o, c = t.cursorOffset, d = 0, f = i.formatted), a === f) return {
            formatted: i.formatted,
            cursorOffset: d + c,
            comments: s
        };
        let p = a.split("");
        p.splice(c, 0, Un);
        let l = f.split(""), F = (0, Kn.diffArrays)(p, l), m = d;
        for (let E of F)if (E.removed) {
            if (E.value.includes(Un)) break;
        } else m += E.count;
        return {
            formatted: i.formatted,
            cursorOffset: m,
            comments: s
        };
    }
    return {
        formatted: i.formatted,
        cursorOffset: -1,
        comments: s
    };
}
async function vo(e, t) {
    let { ast: r, text: n } = await De(e, t), { rangeStart: o, rangeEnd: u } = Mn(n, t, r), i = n.slice(o, u), s = Math.min(o, n.lastIndexOf(`
`, o) + 1), D = n.slice(s, o).match(/^\s*/)[0], a = Fe(D, t.tabWidth), c = await qn(i, {
        ...t,
        rangeStart: 0,
        rangeEnd: Number.POSITIVE_INFINITY,
        cursorOffset: t.cursorOffset > o && t.cursorOffset <= u ? t.cursorOffset - o : -1,
        endOfLine: "lf"
    }, a), d = c.formatted.trimEnd(), { cursorOffset: f } = t;
    f > u ? f += d.length - i.length : c.cursorOffset >= 0 && (f = c.cursorOffset + o);
    let p = n.slice(0, o) + d + n.slice(u);
    if (t.endOfLine !== "lf") {
        let l = be(t.endOfLine);
        f >= 0 && l === `\r
` && (f += _t(p.slice(0, f), `
`)), p = ee(!1, p, `
`, l);
    }
    return {
        formatted: p,
        cursorOffset: f,
        comments: c.comments
    };
}
function Jt(e, t, r) {
    return typeof t != "number" || Number.isNaN(t) || t < 0 || t > e.length ? r : t;
}
function zn(e, t) {
    let { cursorOffset: r, rangeStart: n, rangeEnd: o } = t;
    return r = Jt(e, r, -1), n = Jt(e, n, 0), o = Jt(e, o, e.length), {
        ...t,
        cursorOffset: r,
        rangeStart: n,
        rangeEnd: o
    };
}
function Jn(e, t) {
    let { cursorOffset: r, rangeStart: n, rangeEnd: o, endOfLine: u } = zn(e, t), i = e.charAt(0) === Hn;
    if (i && (e = e.slice(1), r--, n--, o--), u === "auto" && (u = hr(e)), e.includes("\r")) {
        let s = (D)=>_t(e.slice(0, Math.max(D, 0)), `\r
`);
        r -= s(r), n -= s(n), o -= s(o), e = gr(e);
    }
    return {
        hasBOM: i,
        text: e,
        options: zn(e, {
            ...t,
            cursorOffset: r,
            rangeStart: n,
            rangeEnd: o,
            endOfLine: u
        })
    };
}
async function Gn(e, t) {
    let r = await ft(t);
    return !r.hasPragma || r.hasPragma(e);
}
async function Xt(e, t) {
    let { hasBOM: r, text: n, options: o } = Jn(e, await re(t));
    if (o.rangeStart >= o.rangeEnd && n !== "" || o.requirePragma && !await Gn(n, o)) return {
        formatted: e,
        cursorOffset: t.cursorOffset,
        comments: []
    };
    let u;
    return o.rangeStart > 0 || o.rangeEnd < n.length ? u = await vo(n, o) : (!o.requirePragma && o.insertPragma && o.printer.insertPragma && !await Gn(n, o) && (n = o.printer.insertPragma(n)), u = await qn(n, o)), r && (u.formatted = Hn + u.formatted, u.cursorOffset >= 0 && u.cursorOffset++), u;
}
async function Xn(e, t, r) {
    let { text: n, options: o } = Jn(e, await re(t)), u = await De(n, o);
    return r && (r.preprocessForPrint && (u.ast = await Ht(u.ast, o)), r.massage && (u.ast = fn(u.ast, o))), u;
}
async function Zn(e, t) {
    t = await re(t);
    let r = await je(e, t);
    return fe(r, t);
}
async function Qn(e, t) {
    let r = Pr(e), { formatted: n } = await Xt(r, {
        ...t,
        parser: "__js_expression"
    });
    return n;
}
async function eu(e, t) {
    t = await re(t);
    let { ast: r } = await De(e, t);
    return je(r, t);
}
async function tu(e, t) {
    return fe(e, await re(t));
}
var Qt = {};
We(Qt, {
    addDanglingComment: ()=>X,
    addLeadingComment: ()=>ne,
    addTrailingComment: ()=>ue,
    getAlignmentSize: ()=>Fe,
    getIndentSize: ()=>nu,
    getMaxContinuousCount: ()=>ru,
    getNextNonSpaceNonCommentCharacter: ()=>iu,
    getNextNonSpaceNonCommentCharacterIndex: ()=>Go,
    getStringWidth: ()=>we,
    hasNewline: ()=>V,
    hasNewlineInRange: ()=>uu,
    hasSpaces: ()=>ou,
    isNextLineEmpty: ()=>Jo,
    isNextLineEmptyAfterIndex: ()=>Ct,
    isPreviousLineEmpty: ()=>Ho,
    makeString: ()=>su,
    skip: ()=>me,
    skipEverythingButNewLine: ()=>mt,
    skipInlineComment: ()=>Ee,
    skipNewline: ()=>Y,
    skipSpaces: ()=>N,
    skipToLineEnd: ()=>dt,
    skipTrailingComment: ()=>Ce,
    skipWhitespace: ()=>xn
});
function Lo(e, t) {
    if (t === !1) return !1;
    if (e.charAt(t) === "/" && e.charAt(t + 1) === "*") {
        for(let r = t + 2; r < e.length; ++r)if (e.charAt(r) === "*" && e.charAt(r + 1) === "/") return r + 2;
    }
    return t;
}
var Ee = Lo;
function Io(e, t) {
    return t === !1 ? !1 : e.charAt(t) === "/" && e.charAt(t + 1) === "/" ? mt(e, t) : t;
}
var Ce = Io;
function Ro(e, t) {
    let r = null, n = t;
    for(; n !== r;)r = n, n = N(e, n), n = Ee(e, n), n = Ce(e, n), n = Y(e, n);
    return n;
}
var Ve = Ro;
function Yo(e, t) {
    let r = null, n = t;
    for(; n !== r;)r = n, n = dt(e, n), n = Ee(e, n), n = N(e, n);
    return n = Ce(e, n), n = Y(e, n), n !== !1 && V(e, n);
}
var Ct = Yo;
function Zt(e) {
    if (typeof e != "string") throw new TypeError("Expected a string");
    return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function jo(e, t) {
    let r = e.match(new RegExp(`(${Zt(t)})+`, "g"));
    return r === null ? 0 : r.reduce((n, o)=>Math.max(n, o.length / t.length), 0);
}
var ru = jo;
function Vo(e, t) {
    let r = e.lastIndexOf(`
`);
    return r === -1 ? 0 : Fe(e.slice(r + 1).match(/^[\t ]*/)[0], t);
}
var nu = Vo;
function $o(e, t, r) {
    for(let n = t; n < r; ++n)if (e.charAt(n) === `
`) return !0;
    return !1;
}
var uu = $o;
function Mo(e, t, r = {}) {
    return N(e, r.backwards ? t - 1 : t, r) !== t;
}
var ou = Mo;
function Wo(e, t) {
    let r = Ve(e, t);
    return r === !1 ? "" : e.charAt(r);
}
var iu = Wo;
function Uo(e, t, r) {
    let n = t === '"' ? "'" : '"', u = ee(!1, e, /\\(.)|(["'])/gs, (i, s, D)=>s === n ? s : D === t ? "\\" + D : D || (r && /^[^\n\r"'0-7\\bfnrt-vx\u2028\u2029]$/.test(s) ? s : "\\" + s));
    return t + u + t;
}
var su = Uo;
function zo(e, t, r) {
    return Ve(e, r(t));
}
function Go(e, t) {
    return arguments.length === 2 || typeof t == "number" ? Ve(e, t) : zo(...arguments);
}
function Ko(e, t, r) {
    return Ye(e, r(t));
}
function Ho(e, t) {
    return arguments.length === 2 || typeof t == "number" ? Ye(e, t) : Ko(...arguments);
}
function qo(e, t, r) {
    return Ct(e, r(t));
}
function Jo(e, t) {
    return arguments.length === 2 || typeof t == "number" ? Ct(e, t) : qo(...arguments);
}
var er = {};
We(er, {
    builders: ()=>Xo,
    printer: ()=>Zo,
    utils: ()=>Qo
});
var Xo = {
    join: ke,
    line: Ke,
    softline: Er,
    hardline: G,
    literalline: He,
    group: At,
    conditionalGroup: fr,
    fill: Ge,
    lineSuffix: Be,
    lineSuffixBoundary: dr,
    cursor: xe,
    breakParent: le,
    ifBreak: Fr,
    trim: mr,
    indent: ie,
    indentIfBreak: pr,
    align: oe,
    addAlignmentToDoc: qe,
    markAsRoot: cr,
    dedentToRoot: ar,
    dedent: lr,
    hardlineWithoutBreakParent: _e,
    literallineWithoutBreakParent: Bt,
    label: Cr,
    concat: (e)=>e
}, Zo = {
    printDocToString: fe
}, Qo = {
    willBreak: wr,
    traverseDoc: Ae,
    findInDoc: Je,
    mapDoc: Ne,
    removeLines: Nr,
    stripTrailingHardline: Xe,
    replaceEndOfLine: Tr,
    canBreak: Sr
};
var Du = "3.1.1";
function ae(e, t = 1) {
    return async (...r)=>{
        let n = r[t] ?? {}, o = n.plugins ?? [];
        return r[t] = {
            ...n,
            plugins: Array.isArray(o) ? o : Object.values(o)
        }, e(...r);
    };
}
var au = ae(Xt);
async function cu(e, t) {
    let { formatted: r } = await au(e, {
        ...t,
        cursorOffset: -1
    });
    return r;
}
async function ei(e, t) {
    return await cu(e, t) === e;
}
var ti = ae(et, 0), ri = {
    parse: ae(Xn),
    formatAST: ae(Zn),
    formatDoc: ae(Qn),
    printToDoc: ae(eu),
    printDocToString: ae(tu)
};
var qc = tr;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"lwmMb"}]},[], null, "parcelRequire2d1f")

//# sourceMappingURL=standalone.0aea92ae.js.map
