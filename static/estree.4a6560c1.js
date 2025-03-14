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
})({"djYib":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "default", ()=>Td);
parcelHelpers.export(exports, "languages", ()=>Hl);
parcelHelpers.export(exports, "options", ()=>Pa);
parcelHelpers.export(exports, "printers", ()=>Kl);
var wa = Object.create;
var kn = Object.defineProperty;
var va = Object.getOwnPropertyDescriptor;
var _a = Object.getOwnPropertyNames;
var ja = Object.getPrototypeOf, Ma = Object.prototype.hasOwnProperty;
var Ra = (e, t)=>()=>(t || e((t = {
            exports: {}
        }).exports, t), t.exports), Cr = (e, t)=>{
    for(var r in t)kn(e, r, {
        get: t[r],
        enumerable: !0
    });
}, Ja = (e, t, r, n)=>{
    if (t && typeof t == "object" || typeof t == "function") for (let s of _a(t))!Ma.call(e, s) && s !== r && kn(e, s, {
        get: ()=>t[s],
        enumerable: !(n = va(t, s)) || n.enumerable
    });
    return e;
};
var qa = (e, t, r)=>(r = e != null ? wa(ja(e)) : {}, Ja(t || !e || !e.__esModule ? kn(r, "default", {
        value: e,
        enumerable: !0
    }) : r, e));
var Gs = (e, t, r)=>{
    if (!t.has(e)) throw TypeError("Cannot " + r);
};
var ut = (e, t, r)=>(Gs(e, t, "read from private field"), r ? r.call(e) : t.get(e)), Ys = (e, t, r)=>{
    if (t.has(e)) throw TypeError("Cannot add the same private member more than once");
    t instanceof WeakSet ? t.add(e) : t.set(e, r);
}, Xs = (e, t, r, n)=>(Gs(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r);
var Aa = Ra((Pt)=>{
    "use strict";
    Object.defineProperty(Pt, "__esModule", {
        value: !0
    });
    Pt.extract = Ml;
    Pt.parse = Jl;
    Pt.parseWithComments = Ca;
    Pt.print = ql;
    Pt.strip = Rl;
    var Ol = /\*\/$/, wl = /^\/\*\*?/, Ea = /^\s*(\/\*\*?(.|\r?\n)*?\*\/)/, vl = /(^|\s+)\/\/([^\r\n]*)/g, Da = /^(\r?\n)+/, _l = /(?:^|\r?\n) *(@[^\r\n]*?) *\r?\n *(?![^@\r\n]*\/\/[^]*)([^@\r\n\s][^@\r\n]+?) *\r?\n/g, ya = /(?:^|\r?\n) *@(\S+) *([^\r\n]*)/g, jl = /(\r?\n|^) *\* ?/g, Fa = [];
    function Ml(e) {
        let t = e.match(Ea);
        return t ? t[0].trimLeft() : "";
    }
    function Rl(e) {
        let t = e.match(Ea);
        return t && t[0] ? e.substring(t[0].length) : e;
    }
    function Jl(e) {
        return Ca(e).pragmas;
    }
    function Ca(e) {
        let t = `
`;
        e = e.replace(wl, "").replace(Ol, "").replace(jl, "$1");
        let r = "";
        for(; r !== e;)r = e, e = e.replace(_l, `${t}$1 $2${t}`);
        e = e.replace(Da, "").trimRight();
        let n = Object.create(null), s = e.replace(ya, "").replace(Da, "").trimRight(), u;
        for(; u = ya.exec(e);){
            let i = u[2].replace(vl, "");
            typeof n[u[1]] == "string" || Array.isArray(n[u[1]]) ? n[u[1]] = Fa.concat(n[u[1]], i) : n[u[1]] = i;
        }
        return {
            comments: s,
            pragmas: n
        };
    }
    function ql({ comments: e = "", pragmas: t = {} }) {
        let r = `
`, n = "/**", s = " *", u = " */", i = Object.keys(t), a = i.flatMap((p)=>fa(p, t[p])).map((p)=>`${s} ${p}${r}`).join("");
        if (!e) {
            if (i.length === 0) return "";
            if (i.length === 1 && !Array.isArray(t[i[0]])) {
                let p = t[i[0]];
                return `${n} ${fa(i[0], p)[0]}${u}`;
            }
        }
        let o = e.split(r).map((p)=>`${s} ${p}`).join(r) + r;
        return n + r + (e ? o : "") + (e && i.length ? s + r : "") + a + u;
    }
    function fa(e, t) {
        return Fa.concat(t).map((r)=>`@${e} ${r}`.trim());
    }
});
var Rs = {};
Cr(Rs, {
    languages: ()=>Hl,
    options: ()=>Pa,
    printers: ()=>Kl
});
var js = {};
Cr(js, {
    canAttachComment: ()=>gp,
    embed: ()=>ca,
    experimentalFeatures: ()=>Gl,
    getCommentChildNodes: ()=>hp,
    getVisitorKeys: ()=>Br,
    handleComments: ()=>as,
    insertPragma: ()=>da,
    isBlockComment: ()=>Z,
    isGap: ()=>Sp,
    massageAstNode: ()=>ma,
    print: ()=>Zi,
    printComment: ()=>Yu,
    willPrintOwnComments: ()=>os
});
function Ua(e, t) {
    let { originalText: r, [Symbol.for("comments")]: n, locStart: s, locEnd: u, [Symbol.for("printedComments")]: i } = t, { node: a } = e, o = s(a), p = u(a);
    for (let D of n)s(D) >= o && u(D) <= p && i.add(D);
    return r.slice(o, p);
}
var Ns = Ua;
var ze = "string", Re = "array", Qe = "cursor", Je = "indent", qe = "align", Ze = "trim", oe = "group", Fe = "fill", de = "if-break", Ue = "indent-if-break", We = "line-suffix", Ge = "line-suffix-boundary", pe = "line", Le = "label", Oe = "break-parent", Ar = new Set([
    Qe,
    Je,
    qe,
    Ze,
    oe,
    Fe,
    de,
    Ue,
    We,
    Ge,
    pe,
    Le,
    Oe
]);
function Wa(e) {
    if (typeof e == "string") return ze;
    if (Array.isArray(e)) return Re;
    if (!e) return;
    let { type: t } = e;
    if (Ar.has(t)) return t;
}
var et = Wa;
var Ga = (e)=>new Intl.ListFormat("en-US", {
        type: "disjunction"
    }).format(e);
function Ya(e) {
    let t = e === null ? "null" : typeof e;
    if (t !== "string" && t !== "object") return `Unexpected doc '${t}', 
Expected it to be 'string' or 'object'.`;
    if (et(e)) throw new Error("doc is valid.");
    let r = Object.prototype.toString.call(e);
    if (r !== "[object Object]") return `Unexpected doc '${r}'.`;
    let n = Ga([
        ...Ar
    ].map((s)=>`'${s}'`));
    return `Unexpected doc.type '${e.type}'.
Expected it to be ${n}.`;
}
var In = class extends Error {
    name = "InvalidDocError";
    constructor(t){
        super(Ya(t)), this.doc = t;
    }
}, ft = In;
var $s = {};
function Xa(e, t, r, n) {
    let s = [
        e
    ];
    for(; s.length > 0;){
        let u = s.pop();
        if (u === $s) {
            r(s.pop());
            continue;
        }
        r && s.push(u, $s);
        let i = et(u);
        if (!i) throw new ft(u);
        if ((t == null ? void 0 : t(u)) !== !1) switch(i){
            case Re:
            case Fe:
                {
                    let a = i === Re ? u : u.parts;
                    for(let o = a.length, p = o - 1; p >= 0; --p)s.push(a[p]);
                    break;
                }
            case de:
                s.push(u.flatContents, u.breakContents);
                break;
            case oe:
                if (n && u.expandedStates) for(let a = u.expandedStates.length, o = a - 1; o >= 0; --o)s.push(u.expandedStates[o]);
                else s.push(u.contents);
                break;
            case qe:
            case Je:
            case Ue:
            case Le:
            case We:
                s.push(u.contents);
                break;
            case ze:
            case Qe:
            case Ze:
            case Ge:
            case pe:
            case Oe:
                break;
            default:
                throw new ft(u);
        }
    }
}
var Ln = Xa;
var Vs = ()=>{}, Ye = Vs, Tr = Vs;
function E(e) {
    return Ye(e), {
        type: Je,
        contents: e
    };
}
function xe(e, t) {
    return Ye(t), {
        type: qe,
        contents: t,
        n: e
    };
}
function m(e, t = {}) {
    return Ye(e), Tr(t.expandedStates, !0), {
        type: oe,
        id: t.id,
        contents: e,
        break: !!t.shouldBreak,
        expandedStates: t.expandedStates
    };
}
function Ks(e) {
    return xe(Number.NEGATIVE_INFINITY, e);
}
function dr(e) {
    return xe(-1, e);
}
function Xe(e, t) {
    return m(e[0], {
        ...t,
        expandedStates: e
    });
}
function Lt(e) {
    return Tr(e), {
        type: Fe,
        parts: e
    };
}
function B(e, t = "", r = {}) {
    return Ye(e), t !== "" && Ye(t), {
        type: de,
        breakContents: e,
        flatContents: t,
        groupId: r.groupId
    };
}
function Et(e, t) {
    return Ye(e), {
        type: Ue,
        contents: e,
        groupId: t.groupId,
        negate: t.negate
    };
}
function On(e) {
    return Ye(e), {
        type: We,
        contents: e
    };
}
var Be = {
    type: Ge
}, le = {
    type: Oe
};
var wn = {
    type: pe,
    hard: !0
}, Na = {
    type: pe,
    hard: !0,
    literal: !0
}, T = {
    type: pe
}, F = {
    type: pe,
    soft: !0
}, C = [
    wn,
    le
], xr = [
    Na,
    le
], vn = {
    type: Qe
};
function b(e, t) {
    Ye(e), Tr(t);
    let r = [];
    for(let n = 0; n < t.length; n++)n !== 0 && r.push(e), r.push(t[n]);
    return r;
}
function Hs(e, t, r) {
    Ye(e);
    let n = e;
    if (t > 0) {
        for(let s = 0; s < Math.floor(t / r); ++s)n = E(n);
        n = xe(t % r, n), n = xe(Number.NEGATIVE_INFINITY, n);
    }
    return n;
}
function tt(e, t) {
    return Ye(t), e ? {
        type: Le,
        label: e,
        contents: t
    } : t;
}
var $a = (e, t, r)=>{
    if (!(e && t == null)) return Array.isArray(t) || typeof t == "string" ? t[r < 0 ? t.length + r : r] : t.at(r);
}, w = $a;
var gr = (e)=>{
    if (Array.isArray(e)) return e;
    if (e.type !== Fe) throw new Error(`Expect doc to be 'array' or '${Fe}'.`);
    return e.parts;
};
function it(e, t) {
    if (typeof e == "string") return t(e);
    let r = new Map;
    return n(e);
    function n(u) {
        if (r.has(u)) return r.get(u);
        let i = s(u);
        return r.set(u, i), i;
    }
    function s(u) {
        switch(et(u)){
            case Re:
                return t(u.map(n));
            case Fe:
                return t({
                    ...u,
                    parts: u.parts.map(n)
                });
            case de:
                return t({
                    ...u,
                    breakContents: n(u.breakContents),
                    flatContents: n(u.flatContents)
                });
            case oe:
                {
                    let { expandedStates: i, contents: a } = u;
                    return i ? (i = i.map(n), a = i[0]) : a = n(a), t({
                        ...u,
                        contents: a,
                        expandedStates: i
                    });
                }
            case qe:
            case Je:
            case Ue:
            case Le:
            case We:
                return t({
                    ...u,
                    contents: n(u.contents)
                });
            case ze:
            case Qe:
            case Ze:
            case Ge:
            case pe:
            case Oe:
                return t(u);
            default:
                throw new ft(u);
        }
    }
}
function Qs(e, t, r) {
    let n = r, s = !1;
    function u(i) {
        if (s) return !1;
        let a = t(i);
        a !== void 0 && (s = !0, n = a);
    }
    return Ln(e, u), n;
}
function Va(e) {
    if (e.type === oe && e.break || e.type === pe && e.hard || e.type === Oe) return !0;
}
function z(e) {
    return Qs(e, Va, !1);
}
function zs(e) {
    if (e.length > 0) {
        let t = w(!1, e, -1);
        !t.expandedStates && !t.break && (t.break = "propagated");
    }
    return null;
}
function Zs(e) {
    let t = new Set, r = [];
    function n(u) {
        if (u.type === Oe && zs(r), u.type === oe) {
            if (r.push(u), t.has(u)) return !1;
            t.add(u);
        }
    }
    function s(u) {
        u.type === oe && r.pop().break && zs(r);
    }
    Ln(e, n, s, !0);
}
function Ka(e) {
    return e.type === pe && !e.hard ? e.soft ? "" : " " : e.type === de ? e.flatContents : e;
}
function Kt(e) {
    return it(e, Ka);
}
function Ha(e) {
    switch(et(e)){
        case Fe:
            if (e.parts.every((t)=>t === "")) return "";
            break;
        case oe:
            if (!e.contents && !e.id && !e.break && !e.expandedStates) return "";
            if (e.contents.type === oe && e.contents.id === e.id && e.contents.break === e.break && e.contents.expandedStates === e.expandedStates) return e.contents;
            break;
        case qe:
        case Je:
        case Ue:
        case We:
            if (!e.contents) return "";
            break;
        case de:
            if (!e.flatContents && !e.breakContents) return "";
            break;
        case Re:
            {
                let t = [];
                for (let r of e){
                    if (!r) continue;
                    let [n, ...s] = Array.isArray(r) ? r : [
                        r
                    ];
                    typeof n == "string" && typeof w(!1, t, -1) == "string" ? t[t.length - 1] += n : t.push(n), t.push(...s);
                }
                return t.length === 0 ? "" : t.length === 1 ? t[0] : t;
            }
        case ze:
        case Qe:
        case Ze:
        case Ge:
        case pe:
        case Le:
        case Oe:
            break;
        default:
            throw new ft(e);
    }
    return e;
}
function Ot(e) {
    return it(e, (t)=>Ha(t));
}
function be(e, t = xr) {
    return it(e, (r)=>typeof r == "string" ? b(t, r.split(`
`)) : r);
}
function za(e) {
    if (e.type === pe) return !0;
}
function eu(e) {
    return Qs(e, za, !1);
}
function Ht(e, t) {
    return e.type === Le ? {
        ...e,
        contents: t(e.contents)
    } : t(e);
}
function Qa(e) {
    return Array.isArray(e) && e.length > 0;
}
var k = Qa;
var Za = /^[\$A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC][\$0-9A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]*$/, eo = (e)=>Za.test(e), tu = eo;
function to(e) {
    return e !== null && typeof e == "object";
}
var ru = to;
function* ro(e, t) {
    let { getVisitorKeys: r, filter: n = ()=>!0 } = t, s = (u)=>ru(u) && n(u);
    for (let u of r(e)){
        let i = e[u];
        if (Array.isArray(i)) for (let a of i)s(a) && (yield a);
        else s(i) && (yield i);
    }
}
function* no(e, t) {
    let r = [
        e
    ];
    for(let n = 0; n < r.length; n++){
        let s = r[n];
        for (let u of ro(s, t))yield u, r.push(u);
    }
}
function nu(e, { getVisitorKeys: t, predicate: r }) {
    for (let n of no(e, {
        getVisitorKeys: t
    }))if (r(n)) return !0;
    return !1;
}
function hr(e) {
    return (t, r, n)=>{
        let s = !!(n != null && n.backwards);
        if (r === !1) return !1;
        let { length: u } = t, i = r;
        for(; i >= 0 && i < u;){
            let a = t.charAt(i);
            if (e instanceof RegExp) {
                if (!e.test(a)) return i;
            } else if (!e.includes(a)) return i;
            s ? i-- : i++;
        }
        return i === -1 || i === u ? i : !1;
    };
}
var km = hr(/\s/), Ne = hr(" 	"), su = hr(",; 	"), uu = hr(/[^\n\r]/);
function so(e, t, r) {
    let n = !!(r != null && r.backwards);
    if (t === !1) return !1;
    let s = e.charAt(t);
    if (n) {
        if (e.charAt(t - 1) === "\r" && s === `
`) return t - 2;
        if (s === `
` || s === "\r" || s === "\u2028" || s === "\u2029") return t - 1;
    } else {
        if (s === "\r" && e.charAt(t + 1) === `
`) return t + 2;
        if (s === `
` || s === "\r" || s === "\u2028" || s === "\u2029") return t + 1;
    }
    return t;
}
var $e = so;
function uo(e, t, r = {}) {
    let n = Ne(e, r.backwards ? t - 1 : t, r), s = $e(e, n, r);
    return n !== s;
}
var Q = uo;
function io(e, t) {
    if (t === !1) return !1;
    if (e.charAt(t) === "/" && e.charAt(t + 1) === "*") {
        for(let r = t + 2; r < e.length; ++r)if (e.charAt(r) === "*" && e.charAt(r + 1) === "/") return r + 2;
    }
    return t;
}
var wt = io;
function ao(e, t) {
    return t === !1 ? !1 : e.charAt(t) === "/" && e.charAt(t + 1) === "/" ? uu(e, t) : t;
}
var vt = ao;
function oo(e, t) {
    let r = null, n = t;
    for(; n !== r;)r = n, n = su(e, n), n = wt(e, n), n = Ne(e, n);
    return n = vt(e, n), n = $e(e, n), n !== !1 && Q(e, n);
}
var _t = oo;
var iu = ()=>/[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26D3\uFE0F?(?:\u200D\uD83D\uDCA5)?|\u26F9(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF43\uDF45-\uDF4A\uDF4C-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDF44(?:\u200D\uD83D\uDFEB)?|\uDF4B(?:\u200D\uD83D\uDFE9)?|\uDFC3(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4\uDEB5](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE41\uDE43\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC08(?:\u200D\u2B1B)?|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC26(?:\u200D(?:\u2B1B|\uD83D\uDD25))?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE])))?))?|\uDC6F(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDD75(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?|\uDE42(?:\u200D[\u2194\u2195]\uFE0F?)?|\uDEB6(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC2\uDECE-\uDEDB\uDEE0-\uDEE8]|\uDD3C(?:\u200D[\u2640\u2642]\uFE0F?|\uD83C[\uDFFB-\uDFFF])?|\uDDCE(?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D(?:[\u2640\u2642]\uFE0F?(?:\u200D\u27A1\uFE0F?)?|\u27A1\uFE0F?))?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1|\uDDD1\u200D\uD83E\uDDD2(?:\u200D\uD83E\uDDD2)?|\uDDD2(?:\u200D\uD83E\uDDD2)?))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF\uDDBC\uDDBD](?:\u200D\u27A1\uFE0F?)?|[\uDDB0-\uDDB3]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g;
function au(e) {
    return e === 12288 || e >= 65281 && e <= 65376 || e >= 65504 && e <= 65510;
}
function ou(e) {
    return e >= 4352 && e <= 4447 || e === 8986 || e === 8987 || e === 9001 || e === 9002 || e >= 9193 && e <= 9196 || e === 9200 || e === 9203 || e === 9725 || e === 9726 || e === 9748 || e === 9749 || e >= 9800 && e <= 9811 || e === 9855 || e === 9875 || e === 9889 || e === 9898 || e === 9899 || e === 9917 || e === 9918 || e === 9924 || e === 9925 || e === 9934 || e === 9940 || e === 9962 || e === 9970 || e === 9971 || e === 9973 || e === 9978 || e === 9981 || e === 9989 || e === 9994 || e === 9995 || e === 10024 || e === 10060 || e === 10062 || e >= 10067 && e <= 10069 || e === 10071 || e >= 10133 && e <= 10135 || e === 10160 || e === 10175 || e === 11035 || e === 11036 || e === 11088 || e === 11093 || e >= 11904 && e <= 11929 || e >= 11931 && e <= 12019 || e >= 12032 && e <= 12245 || e >= 12272 && e <= 12287 || e >= 12289 && e <= 12350 || e >= 12353 && e <= 12438 || e >= 12441 && e <= 12543 || e >= 12549 && e <= 12591 || e >= 12593 && e <= 12686 || e >= 12688 && e <= 12771 || e >= 12783 && e <= 12830 || e >= 12832 && e <= 12871 || e >= 12880 && e <= 19903 || e >= 19968 && e <= 42124 || e >= 42128 && e <= 42182 || e >= 43360 && e <= 43388 || e >= 44032 && e <= 55203 || e >= 63744 && e <= 64255 || e >= 65040 && e <= 65049 || e >= 65072 && e <= 65106 || e >= 65108 && e <= 65126 || e >= 65128 && e <= 65131 || e >= 94176 && e <= 94180 || e === 94192 || e === 94193 || e >= 94208 && e <= 100343 || e >= 100352 && e <= 101589 || e >= 101632 && e <= 101640 || e >= 110576 && e <= 110579 || e >= 110581 && e <= 110587 || e === 110589 || e === 110590 || e >= 110592 && e <= 110882 || e === 110898 || e >= 110928 && e <= 110930 || e === 110933 || e >= 110948 && e <= 110951 || e >= 110960 && e <= 111355 || e === 126980 || e === 127183 || e === 127374 || e >= 127377 && e <= 127386 || e >= 127488 && e <= 127490 || e >= 127504 && e <= 127547 || e >= 127552 && e <= 127560 || e === 127568 || e === 127569 || e >= 127584 && e <= 127589 || e >= 127744 && e <= 127776 || e >= 127789 && e <= 127797 || e >= 127799 && e <= 127868 || e >= 127870 && e <= 127891 || e >= 127904 && e <= 127946 || e >= 127951 && e <= 127955 || e >= 127968 && e <= 127984 || e === 127988 || e >= 127992 && e <= 128062 || e === 128064 || e >= 128066 && e <= 128252 || e >= 128255 && e <= 128317 || e >= 128331 && e <= 128334 || e >= 128336 && e <= 128359 || e === 128378 || e === 128405 || e === 128406 || e === 128420 || e >= 128507 && e <= 128591 || e >= 128640 && e <= 128709 || e === 128716 || e >= 128720 && e <= 128722 || e >= 128725 && e <= 128727 || e >= 128732 && e <= 128735 || e === 128747 || e === 128748 || e >= 128756 && e <= 128764 || e >= 128992 && e <= 129003 || e === 129008 || e >= 129292 && e <= 129338 || e >= 129340 && e <= 129349 || e >= 129351 && e <= 129535 || e >= 129648 && e <= 129660 || e >= 129664 && e <= 129672 || e >= 129680 && e <= 129725 || e >= 129727 && e <= 129733 || e >= 129742 && e <= 129755 || e >= 129760 && e <= 129768 || e >= 129776 && e <= 129784 || e >= 131072 && e <= 196605 || e >= 196608 && e <= 262141;
}
var pu = (e)=>!(au(e) || ou(e));
var po = /[^\x20-\x7F]/;
function co(e) {
    if (!e) return 0;
    if (!po.test(e)) return e.length;
    e = e.replace(iu(), "  ");
    let t = 0;
    for (let r of e){
        let n = r.codePointAt(0);
        n <= 31 || n >= 127 && n <= 159 || n >= 768 && n <= 879 || (t += pu(n) ? 1 : 2);
    }
    return t;
}
var rt = co;
function J(e) {
    var n;
    let t = e.range ? e.range[0] : e.start, r = ((n = e.declaration) == null ? void 0 : n.decorators) ?? e.decorators;
    return k(r) ? Math.min(J(r[0]), t) : t;
}
function L(e) {
    return e.range ? e.range[1] : e.end;
}
function Ft(e, t) {
    let r = J(e);
    return Number.isInteger(r) && r === J(t);
}
function lo(e, t) {
    let r = L(e);
    return Number.isInteger(r) && r === L(t);
}
function cu(e, t) {
    return Ft(e, t) && lo(e, t);
}
var zt = null;
function Qt(e) {
    if (zt !== null && typeof zt.property) {
        let t = zt;
        return zt = Qt.prototype = null, t;
    }
    return zt = Qt.prototype = e ?? Object.create(null), new Qt;
}
var mo = 10;
for(let e = 0; e <= mo; e++)Qt();
function _n(e) {
    return Qt(e);
}
function Do(e, t = "type") {
    _n(e);
    function r(n) {
        let s = n[t], u = e[s];
        if (!Array.isArray(u)) throw Object.assign(new Error(`Missing visitor keys for '${s}'.`), {
            node: n
        });
        return u;
    }
    return r;
}
var Sr = Do;
var lu = {
    ArrayExpression: [
        "elements"
    ],
    AssignmentExpression: [
        "left",
        "right"
    ],
    BinaryExpression: [
        "left",
        "right"
    ],
    InterpreterDirective: [],
    Directive: [
        "value"
    ],
    DirectiveLiteral: [],
    BlockStatement: [
        "directives",
        "body"
    ],
    BreakStatement: [
        "label"
    ],
    CallExpression: [
        "callee",
        "arguments",
        "typeParameters",
        "typeArguments"
    ],
    CatchClause: [
        "param",
        "body"
    ],
    ConditionalExpression: [
        "test",
        "consequent",
        "alternate"
    ],
    ContinueStatement: [
        "label"
    ],
    DebuggerStatement: [],
    DoWhileStatement: [
        "test",
        "body"
    ],
    EmptyStatement: [],
    ExpressionStatement: [
        "expression"
    ],
    File: [
        "program"
    ],
    ForInStatement: [
        "left",
        "right",
        "body"
    ],
    ForStatement: [
        "init",
        "test",
        "update",
        "body"
    ],
    FunctionDeclaration: [
        "id",
        "params",
        "body",
        "returnType",
        "typeParameters",
        "predicate"
    ],
    FunctionExpression: [
        "id",
        "params",
        "body",
        "returnType",
        "typeParameters"
    ],
    Identifier: [
        "typeAnnotation",
        "decorators"
    ],
    IfStatement: [
        "test",
        "consequent",
        "alternate"
    ],
    LabeledStatement: [
        "label",
        "body"
    ],
    StringLiteral: [],
    NumericLiteral: [],
    NullLiteral: [],
    BooleanLiteral: [],
    RegExpLiteral: [],
    LogicalExpression: [
        "left",
        "right"
    ],
    MemberExpression: [
        "object",
        "property"
    ],
    NewExpression: [
        "callee",
        "arguments",
        "typeParameters",
        "typeArguments"
    ],
    Program: [
        "directives",
        "body"
    ],
    ObjectExpression: [
        "properties"
    ],
    ObjectMethod: [
        "key",
        "params",
        "body",
        "decorators",
        "returnType",
        "typeParameters"
    ],
    ObjectProperty: [
        "key",
        "value",
        "decorators"
    ],
    RestElement: [
        "argument",
        "typeAnnotation",
        "decorators"
    ],
    ReturnStatement: [
        "argument"
    ],
    SequenceExpression: [
        "expressions"
    ],
    ParenthesizedExpression: [
        "expression"
    ],
    SwitchCase: [
        "test",
        "consequent"
    ],
    SwitchStatement: [
        "discriminant",
        "cases"
    ],
    ThisExpression: [],
    ThrowStatement: [
        "argument"
    ],
    TryStatement: [
        "block",
        "handler",
        "finalizer"
    ],
    UnaryExpression: [
        "argument"
    ],
    UpdateExpression: [
        "argument"
    ],
    VariableDeclaration: [
        "declarations"
    ],
    VariableDeclarator: [
        "id",
        "init"
    ],
    WhileStatement: [
        "test",
        "body"
    ],
    WithStatement: [
        "object",
        "body"
    ],
    AssignmentPattern: [
        "left",
        "right",
        "decorators",
        "typeAnnotation"
    ],
    ArrayPattern: [
        "elements",
        "typeAnnotation",
        "decorators"
    ],
    ArrowFunctionExpression: [
        "params",
        "body",
        "returnType",
        "typeParameters",
        "predicate"
    ],
    ClassBody: [
        "body"
    ],
    ClassExpression: [
        "id",
        "body",
        "superClass",
        "mixins",
        "typeParameters",
        "superTypeParameters",
        "implements",
        "decorators",
        "superTypeArguments"
    ],
    ClassDeclaration: [
        "id",
        "body",
        "superClass",
        "mixins",
        "typeParameters",
        "superTypeParameters",
        "implements",
        "decorators",
        "superTypeArguments"
    ],
    ExportAllDeclaration: [
        "source",
        "attributes",
        "exported"
    ],
    ExportDefaultDeclaration: [
        "declaration"
    ],
    ExportNamedDeclaration: [
        "declaration",
        "specifiers",
        "source",
        "attributes"
    ],
    ExportSpecifier: [
        "local",
        "exported"
    ],
    ForOfStatement: [
        "left",
        "right",
        "body"
    ],
    ImportDeclaration: [
        "specifiers",
        "source",
        "attributes"
    ],
    ImportDefaultSpecifier: [
        "local"
    ],
    ImportNamespaceSpecifier: [
        "local"
    ],
    ImportSpecifier: [
        "local",
        "imported"
    ],
    ImportExpression: [
        "source",
        "options",
        "attributes"
    ],
    MetaProperty: [
        "meta",
        "property"
    ],
    ClassMethod: [
        "key",
        "params",
        "body",
        "decorators",
        "returnType",
        "typeParameters"
    ],
    ObjectPattern: [
        "properties",
        "typeAnnotation",
        "decorators"
    ],
    SpreadElement: [
        "argument"
    ],
    Super: [],
    TaggedTemplateExpression: [
        "tag",
        "quasi",
        "typeParameters",
        "typeArguments"
    ],
    TemplateElement: [],
    TemplateLiteral: [
        "quasis",
        "expressions"
    ],
    YieldExpression: [
        "argument"
    ],
    AwaitExpression: [
        "argument"
    ],
    Import: [],
    BigIntLiteral: [],
    ExportNamespaceSpecifier: [
        "exported"
    ],
    OptionalMemberExpression: [
        "object",
        "property"
    ],
    OptionalCallExpression: [
        "callee",
        "arguments",
        "typeParameters",
        "typeArguments"
    ],
    ClassProperty: [
        "key",
        "value",
        "typeAnnotation",
        "decorators",
        "variance"
    ],
    ClassAccessorProperty: [
        "key",
        "value",
        "typeAnnotation",
        "decorators"
    ],
    ClassPrivateProperty: [
        "key",
        "value",
        "decorators",
        "typeAnnotation",
        "variance"
    ],
    ClassPrivateMethod: [
        "key",
        "params",
        "body",
        "decorators",
        "returnType",
        "typeParameters"
    ],
    PrivateName: [
        "id"
    ],
    StaticBlock: [
        "body"
    ],
    AnyTypeAnnotation: [],
    ArrayTypeAnnotation: [
        "elementType"
    ],
    BooleanTypeAnnotation: [],
    BooleanLiteralTypeAnnotation: [],
    NullLiteralTypeAnnotation: [],
    ClassImplements: [
        "id",
        "typeParameters"
    ],
    DeclareClass: [
        "id",
        "typeParameters",
        "extends",
        "mixins",
        "implements",
        "body"
    ],
    DeclareFunction: [
        "id",
        "predicate"
    ],
    DeclareInterface: [
        "id",
        "typeParameters",
        "extends",
        "body"
    ],
    DeclareModule: [
        "id",
        "body"
    ],
    DeclareModuleExports: [
        "typeAnnotation"
    ],
    DeclareTypeAlias: [
        "id",
        "typeParameters",
        "right"
    ],
    DeclareOpaqueType: [
        "id",
        "typeParameters",
        "supertype"
    ],
    DeclareVariable: [
        "id"
    ],
    DeclareExportDeclaration: [
        "declaration",
        "specifiers",
        "source"
    ],
    DeclareExportAllDeclaration: [
        "source"
    ],
    DeclaredPredicate: [
        "value"
    ],
    ExistsTypeAnnotation: [],
    FunctionTypeAnnotation: [
        "typeParameters",
        "params",
        "rest",
        "returnType",
        "this"
    ],
    FunctionTypeParam: [
        "name",
        "typeAnnotation"
    ],
    GenericTypeAnnotation: [
        "id",
        "typeParameters"
    ],
    InferredPredicate: [],
    InterfaceExtends: [
        "id",
        "typeParameters"
    ],
    InterfaceDeclaration: [
        "id",
        "typeParameters",
        "extends",
        "body"
    ],
    InterfaceTypeAnnotation: [
        "extends",
        "body"
    ],
    IntersectionTypeAnnotation: [
        "types"
    ],
    MixedTypeAnnotation: [],
    EmptyTypeAnnotation: [],
    NullableTypeAnnotation: [
        "typeAnnotation"
    ],
    NumberLiteralTypeAnnotation: [],
    NumberTypeAnnotation: [],
    ObjectTypeAnnotation: [
        "properties",
        "indexers",
        "callProperties",
        "internalSlots"
    ],
    ObjectTypeInternalSlot: [
        "id",
        "value",
        "optional",
        "static",
        "method"
    ],
    ObjectTypeCallProperty: [
        "value"
    ],
    ObjectTypeIndexer: [
        "id",
        "key",
        "value",
        "variance"
    ],
    ObjectTypeProperty: [
        "key",
        "value",
        "variance"
    ],
    ObjectTypeSpreadProperty: [
        "argument"
    ],
    OpaqueType: [
        "id",
        "typeParameters",
        "supertype",
        "impltype"
    ],
    QualifiedTypeIdentifier: [
        "id",
        "qualification"
    ],
    StringLiteralTypeAnnotation: [],
    StringTypeAnnotation: [],
    SymbolTypeAnnotation: [],
    ThisTypeAnnotation: [],
    TupleTypeAnnotation: [
        "types",
        "elementTypes"
    ],
    TypeofTypeAnnotation: [
        "argument",
        "typeArguments"
    ],
    TypeAlias: [
        "id",
        "typeParameters",
        "right"
    ],
    TypeAnnotation: [
        "typeAnnotation"
    ],
    TypeCastExpression: [
        "expression",
        "typeAnnotation"
    ],
    TypeParameter: [
        "bound",
        "default",
        "variance"
    ],
    TypeParameterDeclaration: [
        "params"
    ],
    TypeParameterInstantiation: [
        "params"
    ],
    UnionTypeAnnotation: [
        "types"
    ],
    Variance: [],
    VoidTypeAnnotation: [],
    EnumDeclaration: [
        "id",
        "body"
    ],
    EnumBooleanBody: [
        "members"
    ],
    EnumNumberBody: [
        "members"
    ],
    EnumStringBody: [
        "members"
    ],
    EnumSymbolBody: [
        "members"
    ],
    EnumBooleanMember: [
        "id",
        "init"
    ],
    EnumNumberMember: [
        "id",
        "init"
    ],
    EnumStringMember: [
        "id",
        "init"
    ],
    EnumDefaultedMember: [
        "id"
    ],
    IndexedAccessType: [
        "objectType",
        "indexType"
    ],
    OptionalIndexedAccessType: [
        "objectType",
        "indexType"
    ],
    JSXAttribute: [
        "name",
        "value"
    ],
    JSXClosingElement: [
        "name"
    ],
    JSXElement: [
        "openingElement",
        "children",
        "closingElement"
    ],
    JSXEmptyExpression: [],
    JSXExpressionContainer: [
        "expression"
    ],
    JSXSpreadChild: [
        "expression"
    ],
    JSXIdentifier: [],
    JSXMemberExpression: [
        "object",
        "property"
    ],
    JSXNamespacedName: [
        "namespace",
        "name"
    ],
    JSXOpeningElement: [
        "name",
        "attributes",
        "typeArguments",
        "typeParameters"
    ],
    JSXSpreadAttribute: [
        "argument"
    ],
    JSXText: [],
    JSXFragment: [
        "openingFragment",
        "children",
        "closingFragment"
    ],
    JSXOpeningFragment: [],
    JSXClosingFragment: [],
    Noop: [],
    Placeholder: [],
    V8IntrinsicIdentifier: [],
    ArgumentPlaceholder: [],
    BindExpression: [
        "object",
        "callee"
    ],
    ImportAttribute: [
        "key",
        "value"
    ],
    Decorator: [
        "expression"
    ],
    DoExpression: [
        "body"
    ],
    ExportDefaultSpecifier: [
        "exported"
    ],
    RecordExpression: [
        "properties"
    ],
    TupleExpression: [
        "elements"
    ],
    DecimalLiteral: [],
    ModuleExpression: [
        "body"
    ],
    TopicReference: [],
    PipelineTopicExpression: [
        "expression"
    ],
    PipelineBareFunction: [
        "callee"
    ],
    PipelinePrimaryTopicReference: [],
    TSParameterProperty: [
        "parameter",
        "decorators"
    ],
    TSDeclareFunction: [
        "id",
        "typeParameters",
        "params",
        "returnType",
        "body"
    ],
    TSDeclareMethod: [
        "decorators",
        "key",
        "typeParameters",
        "params",
        "returnType"
    ],
    TSQualifiedName: [
        "left",
        "right"
    ],
    TSCallSignatureDeclaration: [
        "typeParameters",
        "parameters",
        "typeAnnotation",
        "params",
        "returnType"
    ],
    TSConstructSignatureDeclaration: [
        "typeParameters",
        "parameters",
        "typeAnnotation",
        "params",
        "returnType"
    ],
    TSPropertySignature: [
        "key",
        "typeAnnotation"
    ],
    TSMethodSignature: [
        "key",
        "typeParameters",
        "parameters",
        "typeAnnotation",
        "params",
        "returnType"
    ],
    TSIndexSignature: [
        "parameters",
        "typeAnnotation"
    ],
    TSAnyKeyword: [],
    TSBooleanKeyword: [],
    TSBigIntKeyword: [],
    TSIntrinsicKeyword: [],
    TSNeverKeyword: [],
    TSNullKeyword: [],
    TSNumberKeyword: [],
    TSObjectKeyword: [],
    TSStringKeyword: [],
    TSSymbolKeyword: [],
    TSUndefinedKeyword: [],
    TSUnknownKeyword: [],
    TSVoidKeyword: [],
    TSThisType: [],
    TSFunctionType: [
        "typeParameters",
        "parameters",
        "typeAnnotation",
        "params",
        "returnType"
    ],
    TSConstructorType: [
        "typeParameters",
        "parameters",
        "typeAnnotation",
        "params",
        "returnType"
    ],
    TSTypeReference: [
        "typeName",
        "typeParameters",
        "typeArguments"
    ],
    TSTypePredicate: [
        "parameterName",
        "typeAnnotation"
    ],
    TSTypeQuery: [
        "exprName",
        "typeParameters",
        "typeArguments"
    ],
    TSTypeLiteral: [
        "members"
    ],
    TSArrayType: [
        "elementType"
    ],
    TSTupleType: [
        "elementTypes"
    ],
    TSOptionalType: [
        "typeAnnotation"
    ],
    TSRestType: [
        "typeAnnotation"
    ],
    TSNamedTupleMember: [
        "label",
        "elementType"
    ],
    TSUnionType: [
        "types"
    ],
    TSIntersectionType: [
        "types"
    ],
    TSConditionalType: [
        "checkType",
        "extendsType",
        "trueType",
        "falseType"
    ],
    TSInferType: [
        "typeParameter"
    ],
    TSParenthesizedType: [
        "typeAnnotation"
    ],
    TSTypeOperator: [
        "typeAnnotation"
    ],
    TSIndexedAccessType: [
        "objectType",
        "indexType"
    ],
    TSMappedType: [
        "typeParameter",
        "typeAnnotation",
        "nameType"
    ],
    TSLiteralType: [
        "literal"
    ],
    TSExpressionWithTypeArguments: [
        "expression",
        "typeParameters"
    ],
    TSInterfaceDeclaration: [
        "id",
        "typeParameters",
        "extends",
        "body"
    ],
    TSInterfaceBody: [
        "body"
    ],
    TSTypeAliasDeclaration: [
        "id",
        "typeParameters",
        "typeAnnotation"
    ],
    TSInstantiationExpression: [
        "expression",
        "typeParameters",
        "typeArguments"
    ],
    TSAsExpression: [
        "expression",
        "typeAnnotation"
    ],
    TSSatisfiesExpression: [
        "expression",
        "typeAnnotation"
    ],
    TSTypeAssertion: [
        "typeAnnotation",
        "expression"
    ],
    TSEnumDeclaration: [
        "id",
        "members"
    ],
    TSEnumMember: [
        "id",
        "initializer"
    ],
    TSModuleDeclaration: [
        "id",
        "body"
    ],
    TSModuleBlock: [
        "body"
    ],
    TSImportType: [
        "argument",
        "qualifier",
        "typeParameters",
        "typeArguments"
    ],
    TSImportEqualsDeclaration: [
        "id",
        "moduleReference"
    ],
    TSExternalModuleReference: [
        "expression"
    ],
    TSNonNullExpression: [
        "expression"
    ],
    TSExportAssignment: [
        "expression"
    ],
    TSNamespaceExportDeclaration: [
        "id"
    ],
    TSTypeAnnotation: [
        "typeAnnotation"
    ],
    TSTypeParameterInstantiation: [
        "params"
    ],
    TSTypeParameterDeclaration: [
        "params"
    ],
    TSTypeParameter: [
        "constraint",
        "default",
        "name"
    ],
    ChainExpression: [
        "expression"
    ],
    ExperimentalRestProperty: [
        "argument"
    ],
    ExperimentalSpreadProperty: [
        "argument"
    ],
    Literal: [],
    MethodDefinition: [
        "decorators",
        "key",
        "value"
    ],
    PrivateIdentifier: [],
    Property: [
        "key",
        "value"
    ],
    PropertyDefinition: [
        "decorators",
        "key",
        "typeAnnotation",
        "value",
        "variance"
    ],
    AccessorProperty: [
        "decorators",
        "key",
        "typeAnnotation",
        "value"
    ],
    TSAbstractAccessorProperty: [
        "decorators",
        "key",
        "typeAnnotation"
    ],
    TSAbstractKeyword: [],
    TSAbstractMethodDefinition: [
        "key",
        "value"
    ],
    TSAbstractPropertyDefinition: [
        "decorators",
        "key",
        "typeAnnotation"
    ],
    TSAsyncKeyword: [],
    TSClassImplements: [
        "expression",
        "typeArguments",
        "typeParameters"
    ],
    TSDeclareKeyword: [],
    TSEmptyBodyFunctionExpression: [
        "id",
        "typeParameters",
        "params",
        "returnType"
    ],
    TSExportKeyword: [],
    TSInterfaceHeritage: [
        "expression",
        "typeArguments",
        "typeParameters"
    ],
    TSPrivateKeyword: [],
    TSProtectedKeyword: [],
    TSPublicKeyword: [],
    TSReadonlyKeyword: [],
    TSStaticKeyword: [],
    TSTemplateLiteralType: [
        "quasis",
        "types"
    ],
    AsExpression: [
        "expression",
        "typeAnnotation"
    ],
    BigIntLiteralTypeAnnotation: [],
    BigIntTypeAnnotation: [],
    ConditionalTypeAnnotation: [
        "checkType",
        "extendsType",
        "trueType",
        "falseType"
    ],
    DeclareEnum: [
        "id",
        "body"
    ],
    InferTypeAnnotation: [
        "typeParameter"
    ],
    KeyofTypeAnnotation: [
        "argument"
    ],
    ObjectTypeMappedTypeProperty: [
        "keyTparam",
        "propType",
        "sourceType",
        "variance"
    ],
    QualifiedTypeofIdentifier: [
        "qualification",
        "id"
    ],
    TupleTypeLabeledElement: [
        "label",
        "elementType",
        "variance"
    ],
    TupleTypeSpreadElement: [
        "label",
        "typeAnnotation"
    ],
    TypeOperator: [
        "typeAnnotation"
    ],
    TypePredicate: [
        "parameterName",
        "typeAnnotation",
        "asserts"
    ],
    NGRoot: [
        "node"
    ],
    NGPipeExpression: [
        "left",
        "right",
        "arguments"
    ],
    NGChainedExpression: [
        "expressions"
    ],
    NGEmptyExpression: [],
    NGMicrosyntax: [
        "body"
    ],
    NGMicrosyntaxKey: [],
    NGMicrosyntaxExpression: [
        "expression",
        "alias"
    ],
    NGMicrosyntaxKeyedExpression: [
        "key",
        "expression"
    ],
    NGMicrosyntaxLet: [
        "key",
        "value"
    ],
    NGMicrosyntaxAs: [
        "key",
        "alias"
    ],
    JsExpressionRoot: [
        "node"
    ],
    JsonRoot: [
        "node"
    ],
    TSJSDocAllType: [],
    TSJSDocUnknownType: [],
    TSJSDocNullableType: [
        "typeAnnotation"
    ],
    TSJSDocNonNullableType: [
        "typeAnnotation"
    ],
    NeverTypeAnnotation: [],
    UndefinedTypeAnnotation: [],
    UnknownTypeAnnotation: [],
    AsConstExpression: [
        "expression"
    ],
    SatisfiesExpression: [
        "expression",
        "typeAnnotation"
    ]
};
var yo = Sr(lu), Br = yo;
var br = "'", mu = '"';
function fo(e, t) {
    let r = t === !0 || t === br ? br : mu, n = r === br ? mu : br, s = 0, u = 0;
    for (let i of e)i === r ? s++ : i === n && u++;
    return s > u ? n : r;
}
var Pr = fo;
var Eo = (e, t, r, n)=>{
    if (!(e && t == null)) return t.replaceAll ? t.replaceAll(r, n) : r.global ? t.replace(r, n) : t.split(r).join(n);
}, K = Eo;
function Fo(e, t, r) {
    let n = t === '"' ? "'" : '"', u = K(!1, e, /\\(.)|(["'])/gs, (i, a, o)=>a === n ? a : o === t ? "\\" + o : o || (r && /^[^\n\r"'0-7\\bfnrt-vx\u2028\u2029]$/.test(a) ? a : "\\" + a));
    return t + u + t;
}
var Du = Fo;
function Co(e, t) {
    let r = e.slice(1, -1), n = t.parser === "json" || t.parser === "json5" && t.quoteProps === "preserve" && !t.singleQuote ? '"' : t.__isInHtmlAttribute ? "'" : Pr(r, t.singleQuote);
    return Du(r, n, !(t.parser === "css" || t.parser === "less" || t.parser === "scss" || t.__embeddedInHtml));
}
var at = Co;
function Ao(e) {
    return e = new Set(e), (t)=>e.has(t == null ? void 0 : t.type);
}
var q = Ao;
var To = q([
    "Block",
    "CommentBlock",
    "MultiLine"
]), Z = To;
function xo(e, t) {
    let r = t.split(".");
    for(let n = r.length - 1; n >= 0; n--){
        let s = r[n];
        if (n === 0) return e.type === "Identifier" && e.name === s;
        if (e.type !== "MemberExpression" || e.optional || e.computed || e.property.type !== "Identifier" || e.property.name !== s) return !1;
        e = e.object;
    }
}
function go(e, t) {
    return t.some((r)=>xo(e, r));
}
var yu = go;
var ho = q([
    "AnyTypeAnnotation",
    "ThisTypeAnnotation",
    "NumberTypeAnnotation",
    "VoidTypeAnnotation",
    "BooleanTypeAnnotation",
    "BigIntTypeAnnotation",
    "SymbolTypeAnnotation",
    "StringTypeAnnotation",
    "NeverTypeAnnotation",
    "UndefinedTypeAnnotation",
    "UnknownTypeAnnotation",
    "EmptyTypeAnnotation",
    "MixedTypeAnnotation"
]), kr = ho;
function So({ type: e }) {
    return e.startsWith("TS") && e.endsWith("Keyword");
}
var Ir = So;
function er(e, t) {
    return t(e) || nu(e, {
        getVisitorKeys: Br,
        predicate: t
    });
}
function Mt(e) {
    return e.type === "AssignmentExpression" || e.type === "BinaryExpression" || e.type === "LogicalExpression" || e.type === "NGPipeExpression" || e.type === "ConditionalExpression" || I(e) || R(e) || e.type === "SequenceExpression" || e.type === "TaggedTemplateExpression" || e.type === "BindExpression" || e.type === "UpdateExpression" && !e.prefix || Ae(e) || e.type === "TSNonNullExpression" || e.type === "ChainExpression";
}
function Fu(e) {
    return e.expressions ? e.expressions[0] : e.left ?? e.test ?? e.callee ?? e.object ?? e.tag ?? e.argument ?? e.expression;
}
function Or(e) {
    if (e.expressions) return [
        "expressions",
        0
    ];
    if (e.left) return [
        "left"
    ];
    if (e.test) return [
        "test"
    ];
    if (e.object) return [
        "object"
    ];
    if (e.callee) return [
        "callee"
    ];
    if (e.tag) return [
        "tag"
    ];
    if (e.argument) return [
        "argument"
    ];
    if (e.expression) return [
        "expression"
    ];
    throw new Error("Unexpected node has no left side.");
}
var tr = q([
    "Line",
    "CommentLine",
    "SingleLine",
    "HashbangComment",
    "HTMLOpen",
    "HTMLClose",
    "Hashbang",
    "InterpreterDirective"
]), Cu = q([
    "ExportDefaultDeclaration",
    "DeclareExportDeclaration",
    "ExportNamedDeclaration",
    "ExportAllDeclaration",
    "DeclareExportAllDeclaration"
]), G = q([
    "ArrayExpression",
    "TupleExpression"
]), se = q([
    "ObjectExpression",
    "RecordExpression"
]);
function ke(e) {
    return e.type === "NumericLiteral" || e.type === "Literal" && typeof e.value == "number";
}
function Un(e) {
    return e.type === "UnaryExpression" && (e.operator === "+" || e.operator === "-") && ke(e.argument);
}
function ee(e) {
    return e.type === "StringLiteral" || e.type === "Literal" && typeof e.value == "string";
}
function Wn(e) {
    return e.type === "RegExpLiteral" || e.type === "Literal" && !!e.regex;
}
var rr = q([
    "Literal",
    "BooleanLiteral",
    "BigIntLiteral",
    "DecimalLiteral",
    "DirectiveLiteral",
    "NullLiteral",
    "NumericLiteral",
    "RegExpLiteral",
    "StringLiteral"
]), Au = q([
    "Identifier",
    "ThisExpression",
    "Super",
    "PrivateName",
    "PrivateIdentifier",
    "Import"
]), we = q([
    "ObjectTypeAnnotation",
    "TSTypeLiteral",
    "TSMappedType"
]), jt = q([
    "FunctionExpression",
    "ArrowFunctionExpression"
]);
function Bo(e) {
    return e.type === "FunctionExpression" || e.type === "ArrowFunctionExpression" && e.body.type === "BlockStatement";
}
function jn(e) {
    return I(e) && e.callee.type === "Identifier" && [
        "async",
        "inject",
        "fakeAsync",
        "waitForAsync"
    ].includes(e.callee.name);
}
var Y = q([
    "JSXElement",
    "JSXFragment"
]);
function Gn(e) {
    return e.kind === "get" || e.kind === "set";
}
function Yn(e) {
    return Gn(e) || Ft(e, e.value);
}
function wr(e) {
    return (e.type === "ObjectTypeProperty" || e.type === "ObjectTypeInternalSlot") && e.value.type === "FunctionTypeAnnotation" && !e.static && !Yn(e);
}
function Tu(e) {
    return (e.type === "TypeAnnotation" || e.type === "TSTypeAnnotation") && e.typeAnnotation.type === "FunctionTypeAnnotation" && !e.static && !Ft(e, e.typeAnnotation);
}
var me = q([
    "BinaryExpression",
    "LogicalExpression",
    "NGPipeExpression"
]);
function Ct(e) {
    return R(e) || e.type === "BindExpression" && !!e.object;
}
var bo = q([
    "TSThisType",
    "NullLiteralTypeAnnotation",
    "BooleanLiteralTypeAnnotation",
    "StringLiteralTypeAnnotation",
    "BigIntLiteralTypeAnnotation",
    "NumberLiteralTypeAnnotation",
    "TSLiteralType",
    "TSTemplateLiteralType"
]);
function Rt(e) {
    return Ir(e) || kr(e) || bo(e) || (e.type === "GenericTypeAnnotation" || e.type === "TSTypeReference") && !e.typeParameters;
}
function Po(e) {
    let t = /^(?:before|after)(?:Each|All)$/;
    return e.callee.type === "Identifier" && e.arguments.length === 1 && t.test(e.callee.name);
}
var ko = [
    "it",
    "it.only",
    "it.skip",
    "describe",
    "describe.only",
    "describe.skip",
    "test",
    "test.only",
    "test.skip",
    "test.step",
    "test.describe",
    "test.describe.only",
    "test.describe.parallel",
    "test.describe.parallel.only",
    "test.describe.serial",
    "test.describe.serial.only",
    "skip",
    "xit",
    "xdescribe",
    "xtest",
    "fit",
    "fdescribe",
    "ftest"
];
function Io(e) {
    return yu(e, ko);
}
function gt(e, t) {
    if (e.type !== "CallExpression") return !1;
    if (e.arguments.length === 1) {
        if (jn(e) && t && gt(t)) return jt(e.arguments[0]);
        if (Po(e)) return jn(e.arguments[0]);
    } else if ((e.arguments.length === 2 || e.arguments.length === 3) && (e.arguments[0].type === "TemplateLiteral" || ee(e.arguments[0])) && Io(e.callee)) return e.arguments[2] && !ke(e.arguments[2]) ? !1 : (e.arguments.length === 2 ? jt(e.arguments[1]) : Bo(e.arguments[1]) && V(e.arguments[1]).length <= 1) || jn(e.arguments[1]);
    return !1;
}
var I = q([
    "CallExpression",
    "OptionalCallExpression"
]), R = q([
    "MemberExpression",
    "OptionalMemberExpression"
]);
function du(e) {
    let t = "expressions";
    e.type === "TSTemplateLiteralType" && (t = "types");
    let r = e[t];
    return r.length === 0 ? !1 : r.every((n)=>{
        if (Jn(n) || xu(n)) return !0;
    });
}
function xu(e, { maxDepth: t = Number.POSITIVE_INFINITY } = {}) {
    if (A(e)) return !1;
    if (e.type === "ChainExpression") return xu(e.expression, {
        maxDepth: t
    });
    if (!R(e)) return !1;
    let r = e, n = 0;
    for(; R(r) && n++ <= t;)if (!Jn(r.property) || (r = r.object, A(r))) return !1;
    return Jn(r);
}
function Jn(e) {
    return A(e) ? !1 : rr(e) || Au(e);
}
function Xn(e, t = 5) {
    return gu(e, t) <= t;
}
function gu(e, t) {
    let r = 0;
    for(let n in e){
        let s = e[n];
        if (s && typeof s == "object" && typeof s.type == "string" && (r++, r += gu(s, t - r)), r > t) return r;
    }
    return r;
}
var Lo = .25;
function nr(e, t) {
    let { printWidth: r } = t;
    if (A(e)) return !1;
    let n = r * Lo;
    if (e.type === "ThisExpression" || e.type === "Identifier" && e.name.length <= n || Un(e) && !A(e.argument)) return !0;
    let s = e.type === "Literal" && "regex" in e && e.regex.pattern || e.type === "RegExpLiteral" && e.pattern;
    return s ? s.length <= n : ee(e) ? at(De(e), t).length <= n : e.type === "TemplateLiteral" ? e.expressions.length === 0 && e.quasis[0].value.raw.length <= n && !e.quasis[0].value.raw.includes(`
`) : e.type === "UnaryExpression" ? nr(e.argument, {
        printWidth: r
    }) : e.type === "CallExpression" && e.arguments.length === 0 && e.callee.type === "Identifier" ? e.callee.name.length <= n - 2 : rr(e);
}
function ve(e, t) {
    return Y(t) ? ht(t) : A(t, x.Leading, (r)=>Q(e, L(r)));
}
function Nn(e, t) {
    return t.parser !== "json" && ee(e.key) && De(e.key).slice(1, -1) === e.key.value && (tu(e.key.value) && !(t.parser === "babel-ts" && e.type === "ClassProperty" || t.parser === "typescript" && e.type === "PropertyDefinition") || $n(e.key.value) && String(Number(e.key.value)) === e.key.value && (t.parser === "babel" || t.parser === "acorn" || t.parser === "espree" || t.parser === "meriyah" || t.parser === "__babel_estree"));
}
function $n(e) {
    return /^(?:\d+|\d+\.\d+)$/.test(e);
}
function fu(e) {
    return e.quasis.some((t)=>t.value.raw.includes(`
`));
}
function vr(e, t) {
    return (e.type === "TemplateLiteral" && fu(e) || e.type === "TaggedTemplateExpression" && fu(e.quasi)) && !Q(t, J(e), {
        backwards: !0
    });
}
function _r(e) {
    if (!A(e)) return !1;
    let t = w(!1, ot(e, x.Dangling), -1);
    return t && !Z(t);
}
function hu(e) {
    if (e.length <= 1) return !1;
    let t = 0;
    for (let r of e)if (jt(r)) {
        if (t += 1, t > 1) return !0;
    } else if (I(r)) {
        for (let n of r.arguments)if (jt(n)) return !0;
    }
    return !1;
}
function jr(e) {
    let { node: t, parent: r, key: n } = e;
    return n === "callee" && I(t) && I(r) && r.arguments.length > 0 && t.arguments.length > r.arguments.length;
}
var Oo = new Set([
    "!",
    "-",
    "+",
    "~"
]);
function Pe(e, t = 2) {
    if (t <= 0) return !1;
    let r = (n)=>Pe(n, t - 1);
    if (Wn(e)) return rt(e.pattern ?? e.regex.pattern) <= 5;
    if (rr(e) || Au(e) || e.type === "ArgumentPlaceholder") return !0;
    if (e.type === "TemplateLiteral") return e.quasis.every((n)=>!n.value.raw.includes(`
`)) && e.expressions.every(r);
    if (se(e)) return e.properties.every((n)=>!n.computed && (n.shorthand || n.value && r(n.value)));
    if (G(e)) return e.elements.every((n)=>n === null || r(n));
    if (pt(e)) {
        if (e.type === "ImportExpression" || Pe(e.callee, t)) {
            let n = ge(e);
            return n.length <= t && n.every(r);
        }
        return !1;
    }
    return R(e) ? Pe(e.object, t) && Pe(e.property, t) : e.type === "UnaryExpression" && Oo.has(e.operator) || e.type === "UpdateExpression" ? Pe(e.argument, t) : e.type === "TSNonNullExpression" ? Pe(e.expression, t) : !1;
}
function De(e) {
    var t;
    return ((t = e.extra) == null ? void 0 : t.raw) ?? e.raw;
}
function Su(e) {
    return e;
}
function ye(e, t = "es5") {
    return e.trailingComma === "es5" && t === "es5" || e.trailingComma === "all" && (t === "all" || t === "es5");
}
function ie(e, t) {
    switch(e.type){
        case "BinaryExpression":
        case "LogicalExpression":
        case "AssignmentExpression":
        case "NGPipeExpression":
            return ie(e.left, t);
        case "MemberExpression":
        case "OptionalMemberExpression":
            return ie(e.object, t);
        case "TaggedTemplateExpression":
            return e.tag.type === "FunctionExpression" ? !1 : ie(e.tag, t);
        case "CallExpression":
        case "OptionalCallExpression":
            return e.callee.type === "FunctionExpression" ? !1 : ie(e.callee, t);
        case "ConditionalExpression":
            return ie(e.test, t);
        case "UpdateExpression":
            return !e.prefix && ie(e.argument, t);
        case "BindExpression":
            return e.object && ie(e.object, t);
        case "SequenceExpression":
            return ie(e.expressions[0], t);
        case "ChainExpression":
        case "TSSatisfiesExpression":
        case "TSAsExpression":
        case "TSNonNullExpression":
        case "AsExpression":
        case "AsConstExpression":
        case "SatisfiesExpression":
            return ie(e.expression, t);
        default:
            return t(e);
    }
}
var Eu = {
    "==": !0,
    "!=": !0,
    "===": !0,
    "!==": !0
}, Lr = {
    "*": !0,
    "/": !0,
    "%": !0
}, qn = {
    ">>": !0,
    ">>>": !0,
    "<<": !0
};
function sr(e, t) {
    return !(Zt(t) !== Zt(e) || e === "**" || Eu[e] && Eu[t] || t === "%" && Lr[e] || e === "%" && Lr[t] || t !== e && Lr[t] && Lr[e] || qn[e] && qn[t]);
}
var wo = new Map([
    [
        "|>"
    ],
    [
        "??"
    ],
    [
        "||"
    ],
    [
        "&&"
    ],
    [
        "|"
    ],
    [
        "^"
    ],
    [
        "&"
    ],
    [
        "==",
        "===",
        "!=",
        "!=="
    ],
    [
        "<",
        ">",
        "<=",
        ">=",
        "in",
        "instanceof"
    ],
    [
        ">>",
        "<<",
        ">>>"
    ],
    [
        "+",
        "-"
    ],
    [
        "*",
        "/",
        "%"
    ],
    [
        "**"
    ]
].flatMap((e, t)=>e.map((r)=>[
            r,
            t
        ])));
function Zt(e) {
    return wo.get(e);
}
function Bu(e) {
    return !!qn[e] || e === "|" || e === "^" || e === "&";
}
function bu(e) {
    var r;
    if (e.rest) return !0;
    let t = V(e);
    return ((r = w(!1, t, -1)) == null ? void 0 : r.type) === "RestElement";
}
var Mn = new WeakMap;
function V(e) {
    if (Mn.has(e)) return Mn.get(e);
    let t = [];
    return e.this && t.push(e.this), Array.isArray(e.parameters) ? t.push(...e.parameters) : Array.isArray(e.params) && t.push(...e.params), e.rest && t.push(e.rest), Mn.set(e, t), t;
}
function Pu(e, t) {
    let { node: r } = e, n = 0, s = (u)=>t(u, n++);
    r.this && e.call(s, "this"), Array.isArray(r.parameters) ? e.each(s, "parameters") : Array.isArray(r.params) && e.each(s, "params"), r.rest && e.call(s, "rest");
}
var Rn = new WeakMap;
function ge(e) {
    if (Rn.has(e)) return Rn.get(e);
    let t = e.arguments;
    return e.type === "ImportExpression" && (t = [
        e.source
    ], e.attributes && t.push(e.attributes), e.options && t.push(e.options)), Rn.set(e, t), t;
}
function Mr(e, t) {
    let { node: r } = e;
    r.type === "ImportExpression" ? (e.call((n)=>t(n, 0), "source"), r.attributes && e.call((n)=>t(n, 1), "attributes"), r.options && e.call((n)=>t(n, 1), "options")) : e.each(t, "arguments");
}
function Vn(e, t) {
    if (e.type === "ImportExpression") {
        if (t === 0 || t === (e.attributes || e.options ? -2 : -1)) return "source";
        if (e.attributes && (t === 1 || t === -1)) return "attributes";
        if (e.options && (t === 1 || t === -1)) return "options";
        throw new RangeError("Invalid argument index");
    }
    if (t < 0 && (t = e.arguments.length + t), t < 0 || t >= e.arguments.length) throw new RangeError("Invalid argument index");
    return [
        "arguments",
        t
    ];
}
function ur(e) {
    return e.value.trim() === "prettier-ignore" && !e.unignore;
}
function ht(e) {
    return (e == null ? void 0 : e.prettierIgnore) || A(e, x.PrettierIgnore);
}
var x = {
    Leading: 2,
    Trailing: 4,
    Dangling: 8,
    Block: 16,
    Line: 32,
    PrettierIgnore: 64,
    First: 128,
    Last: 256
}, ku = (e, t)=>{
    if (typeof e == "function" && (t = e, e = 0), e || t) return (r, n, s)=>!(e & x.Leading && !r.leading || e & x.Trailing && !r.trailing || e & x.Dangling && (r.leading || r.trailing) || e & x.Block && !Z(r) || e & x.Line && !tr(r) || e & x.First && n !== 0 || e & x.Last && n !== s.length - 1 || e & x.PrettierIgnore && !ur(r) || t && !t(r));
};
function A(e, t, r) {
    if (!k(e == null ? void 0 : e.comments)) return !1;
    let n = ku(t, r);
    return n ? e.comments.some(n) : !0;
}
function ot(e, t, r) {
    if (!Array.isArray(e == null ? void 0 : e.comments)) return [];
    let n = ku(t, r);
    return n ? e.comments.filter(n) : e.comments;
}
var fe = (e, { originalText: t })=>_t(t, L(e));
function pt(e) {
    return I(e) || e.type === "NewExpression" || e.type === "ImportExpression";
}
function Ce(e) {
    return e && (e.type === "ObjectProperty" || e.type === "Property" && !e.method && e.kind === "init");
}
var ir = Symbol("ifWithoutBlockAndSameLineComment"), Ae = q([
    "TSAsExpression",
    "TSSatisfiesExpression",
    "AsExpression",
    "AsConstExpression",
    "SatisfiesExpression"
]);
function Kn(e, t) {
    var u, i, a, o, p, D, y;
    if (e.isRoot) return !1;
    let { node: r, key: n, parent: s } = e;
    if (t.__isInHtmlInterpolation && !t.bracketSpacing && Mo(r) && ar(e)) return !0;
    if (vo(r)) return !1;
    if (r.type === "Identifier") {
        if ((u = r.extra) != null && u.parenthesized && /^PRETTIER_HTML_PLACEHOLDER_\d+_\d+_IN_JS$/.test(r.name) || n === "left" && (r.name === "async" && !s.await || r.name === "let") && s.type === "ForOfStatement") return !0;
        if (r.name === "let") {
            let c = (i = e.findAncestor((f)=>f.type === "ForOfStatement")) == null ? void 0 : i.left;
            if (c && ie(c, (f)=>f === r)) return !0;
        }
        if (n === "object" && r.name === "let" && s.type === "MemberExpression" && s.computed && !s.optional) {
            let c = e.findAncestor((l)=>l.type === "ExpressionStatement" || l.type === "ForStatement" || l.type === "ForInStatement"), f = c ? c.type === "ExpressionStatement" ? c.expression : c.type === "ForStatement" ? c.init : c.left : void 0;
            if (f && ie(f, (l)=>l === r)) return !0;
        }
        if (n === "expression") switch(r.name){
            case "await":
            case "interface":
            case "module":
            case "using":
            case "yield":
            case "let":
            case "type":
                {
                    let c = e.findAncestor((f)=>!Ae(f));
                    if (c !== s && c.type === "ExpressionStatement") return !0;
                }
        }
        return !1;
    }
    if (r.type === "ObjectExpression" || r.type === "FunctionExpression" || r.type === "ClassExpression" || r.type === "DoExpression") {
        let c = (a = e.findAncestor((f)=>f.type === "ExpressionStatement")) == null ? void 0 : a.expression;
        if (c && ie(c, (f)=>f === r)) return !0;
    }
    if (r.type === "ObjectExpression") {
        let c = (o = e.findAncestor((f)=>f.type === "ArrowFunctionExpression")) == null ? void 0 : o.body;
        if (c && c.type !== "SequenceExpression" && c.type !== "AssignmentExpression" && ie(c, (f)=>f === r)) return !0;
    }
    switch(s.type){
        case "ParenthesizedExpression":
            return !1;
        case "ClassDeclaration":
        case "ClassExpression":
            if (n === "superClass" && (r.type === "ArrowFunctionExpression" || r.type === "AssignmentExpression" || r.type === "AwaitExpression" || r.type === "BinaryExpression" || r.type === "ConditionalExpression" || r.type === "LogicalExpression" || r.type === "NewExpression" || r.type === "ObjectExpression" || r.type === "SequenceExpression" || r.type === "TaggedTemplateExpression" || r.type === "UnaryExpression" || r.type === "UpdateExpression" || r.type === "YieldExpression" || r.type === "TSNonNullExpression" || r.type === "ClassExpression" && k(r.decorators))) return !0;
            break;
        case "ExportDefaultDeclaration":
            return Iu(e, t) || r.type === "SequenceExpression";
        case "Decorator":
            if (n === "expression") {
                if (R(r) && r.computed) return !0;
                let c = !1, f = !1, l = r;
                for(; l;)switch(l.type){
                    case "MemberExpression":
                        f = !0, l = l.object;
                        break;
                    case "CallExpression":
                        if (f || c) return t.parser !== "typescript";
                        c = !0, l = l.callee;
                        break;
                    case "Identifier":
                        return !1;
                    case "TaggedTemplateExpression":
                        return t.parser !== "typescript";
                    default:
                        return !0;
                }
                return !0;
            }
            break;
        case "TypeAnnotation":
            if (e.match(void 0, void 0, (c, f)=>f === "returnType" && c.type === "ArrowFunctionExpression") && jo(r)) return !0;
            break;
        case "BinaryExpression":
            if (n === "left" && (s.operator === "in" || s.operator === "instanceof") && r.type === "UnaryExpression") return !0;
            break;
    }
    switch(r.type){
        case "UpdateExpression":
            if (s.type === "UnaryExpression") return r.prefix && (r.operator === "++" && s.operator === "+" || r.operator === "--" && s.operator === "-");
        case "UnaryExpression":
            switch(s.type){
                case "UnaryExpression":
                    return r.operator === s.operator && (r.operator === "+" || r.operator === "-");
                case "BindExpression":
                    return !0;
                case "MemberExpression":
                case "OptionalMemberExpression":
                    return n === "object";
                case "TaggedTemplateExpression":
                    return !0;
                case "NewExpression":
                case "CallExpression":
                case "OptionalCallExpression":
                    return n === "callee";
                case "BinaryExpression":
                    return n === "left" && s.operator === "**";
                case "TSNonNullExpression":
                    return !0;
                default:
                    return !1;
            }
        case "BinaryExpression":
            if (s.type === "UpdateExpression" || r.operator === "in" && _o(e)) return !0;
            if (r.operator === "|>" && (p = r.extra) != null && p.parenthesized) {
                let c = e.grandparent;
                if (c.type === "BinaryExpression" && c.operator === "|>") return !0;
            }
        case "TSTypeAssertion":
        case "TSAsExpression":
        case "TSSatisfiesExpression":
        case "AsExpression":
        case "AsConstExpression":
        case "SatisfiesExpression":
        case "LogicalExpression":
            switch(s.type){
                case "TSAsExpression":
                case "TSSatisfiesExpression":
                case "AsExpression":
                case "AsConstExpression":
                case "SatisfiesExpression":
                    return !Ae(r);
                case "ConditionalExpression":
                    return Ae(r);
                case "CallExpression":
                case "NewExpression":
                case "OptionalCallExpression":
                    return n === "callee";
                case "ClassExpression":
                case "ClassDeclaration":
                    return n === "superClass";
                case "TSTypeAssertion":
                case "TaggedTemplateExpression":
                case "UnaryExpression":
                case "JSXSpreadAttribute":
                case "SpreadElement":
                case "BindExpression":
                case "AwaitExpression":
                case "TSNonNullExpression":
                case "UpdateExpression":
                    return !0;
                case "MemberExpression":
                case "OptionalMemberExpression":
                    return n === "object";
                case "AssignmentExpression":
                case "AssignmentPattern":
                    return n === "left" && (r.type === "TSTypeAssertion" || Ae(r));
                case "LogicalExpression":
                    if (r.type === "LogicalExpression") return s.operator !== r.operator;
                case "BinaryExpression":
                    {
                        let { operator: c, type: f } = r;
                        if (!c && f !== "TSTypeAssertion") return !0;
                        let l = Zt(c), h = s.operator, g = Zt(h);
                        return g > l || n === "right" && g === l || g === l && !sr(h, c) ? !0 : g < l && c === "%" ? h === "+" || h === "-" : !!Bu(h);
                    }
                default:
                    return !1;
            }
        case "SequenceExpression":
            switch(s.type){
                case "ReturnStatement":
                    return !1;
                case "ForStatement":
                    return !1;
                case "ExpressionStatement":
                    return n !== "expression";
                case "ArrowFunctionExpression":
                    return n !== "body";
                default:
                    return !0;
            }
        case "YieldExpression":
            if (s.type === "AwaitExpression") return !0;
        case "AwaitExpression":
            switch(s.type){
                case "TaggedTemplateExpression":
                case "UnaryExpression":
                case "LogicalExpression":
                case "SpreadElement":
                case "TSAsExpression":
                case "TSSatisfiesExpression":
                case "TSNonNullExpression":
                case "AsExpression":
                case "AsConstExpression":
                case "SatisfiesExpression":
                case "BindExpression":
                    return !0;
                case "MemberExpression":
                case "OptionalMemberExpression":
                    return n === "object";
                case "NewExpression":
                case "CallExpression":
                case "OptionalCallExpression":
                    return n === "callee";
                case "ConditionalExpression":
                    return n === "test";
                case "BinaryExpression":
                    return !(!r.argument && s.operator === "|>");
                default:
                    return !1;
            }
        case "TSFunctionType":
            if (e.match((c)=>c.type === "TSFunctionType", (c, f)=>f === "typeAnnotation" && c.type === "TSTypeAnnotation", (c, f)=>f === "returnType" && c.type === "ArrowFunctionExpression")) return !0;
        case "TSConditionalType":
        case "TSConstructorType":
            if (n === "extendsType" && s.type === "TSConditionalType") {
                if (r.type === "TSConditionalType") return !0;
                let { typeAnnotation: c } = r.returnType || r.typeAnnotation;
                if (c.type === "TSTypePredicate" && c.typeAnnotation && (c = c.typeAnnotation.typeAnnotation), c.type === "TSInferType" && c.typeParameter.constraint) return !0;
            }
            if (n === "checkType" && s.type === "TSConditionalType") return !0;
        case "TSUnionType":
        case "TSIntersectionType":
            if ((s.type === "TSUnionType" || s.type === "TSIntersectionType") && s.types.length > 1 && (!r.types || r.types.length > 1)) return !0;
        case "TSInferType":
            if (r.type === "TSInferType" && s.type === "TSRestType") return !1;
        case "TSTypeOperator":
            return s.type === "TSArrayType" || s.type === "TSOptionalType" || s.type === "TSRestType" || n === "objectType" && s.type === "TSIndexedAccessType" || s.type === "TSTypeOperator" || s.type === "TSTypeAnnotation" && e.grandparent.type.startsWith("TSJSDoc");
        case "TSTypeQuery":
            return n === "objectType" && s.type === "TSIndexedAccessType" || n === "elementType" && s.type === "TSArrayType";
        case "TypeofTypeAnnotation":
            return n === "objectType" && (s.type === "IndexedAccessType" || s.type === "OptionalIndexedAccessType") || n === "elementType" && s.type === "ArrayTypeAnnotation";
        case "ArrayTypeAnnotation":
            return s.type === "NullableTypeAnnotation";
        case "IntersectionTypeAnnotation":
        case "UnionTypeAnnotation":
            return s.type === "ArrayTypeAnnotation" || s.type === "NullableTypeAnnotation" || s.type === "IntersectionTypeAnnotation" || s.type === "UnionTypeAnnotation" || n === "objectType" && (s.type === "IndexedAccessType" || s.type === "OptionalIndexedAccessType");
        case "InferTypeAnnotation":
        case "NullableTypeAnnotation":
            return s.type === "ArrayTypeAnnotation" || n === "objectType" && (s.type === "IndexedAccessType" || s.type === "OptionalIndexedAccessType");
        case "FunctionTypeAnnotation":
            {
                if (e.match(void 0, (f, l)=>l === "typeAnnotation" && f.type === "TypeAnnotation", (f, l)=>l === "returnType" && f.type === "ArrowFunctionExpression") || e.match(void 0, (f, l)=>l === "typeAnnotation" && f.type === "TypePredicate", (f, l)=>l === "typeAnnotation" && f.type === "TypeAnnotation", (f, l)=>l === "returnType" && f.type === "ArrowFunctionExpression")) return !0;
                let c = s.type === "NullableTypeAnnotation" ? e.grandparent : s;
                return c.type === "UnionTypeAnnotation" || c.type === "IntersectionTypeAnnotation" || c.type === "ArrayTypeAnnotation" || n === "objectType" && (c.type === "IndexedAccessType" || c.type === "OptionalIndexedAccessType") || n === "checkType" && s.type === "ConditionalTypeAnnotation" || n === "extendsType" && s.type === "ConditionalTypeAnnotation" && r.returnType.type === "InferTypeAnnotation" && r.returnType.typeParameter.bound || c.type === "NullableTypeAnnotation" || s.type === "FunctionTypeParam" && s.name === null && V(r).some((f)=>{
                    var l;
                    return ((l = f.typeAnnotation) == null ? void 0 : l.type) === "NullableTypeAnnotation";
                });
            }
        case "ConditionalTypeAnnotation":
            if (n === "extendsType" && s.type === "ConditionalTypeAnnotation" && r.type === "ConditionalTypeAnnotation" || n === "checkType" && s.type === "ConditionalTypeAnnotation") return !0;
        case "OptionalIndexedAccessType":
            return n === "objectType" && s.type === "IndexedAccessType";
        case "StringLiteral":
        case "NumericLiteral":
        case "Literal":
            if (typeof r.value == "string" && s.type === "ExpressionStatement" && !s.directive) {
                let c = e.grandparent;
                return c.type === "Program" || c.type === "BlockStatement";
            }
            return n === "object" && s.type === "MemberExpression" && typeof r.value == "number";
        case "AssignmentExpression":
            {
                let c = e.grandparent;
                return n === "body" && s.type === "ArrowFunctionExpression" ? !0 : n === "key" && (s.type === "ClassProperty" || s.type === "PropertyDefinition") && s.computed || (n === "init" || n === "update") && s.type === "ForStatement" ? !1 : s.type === "ExpressionStatement" ? r.left.type === "ObjectPattern" : !(n === "key" && s.type === "TSPropertySignature" || s.type === "AssignmentExpression" || s.type === "SequenceExpression" && c.type === "ForStatement" && (c.init === s || c.update === s) || n === "value" && s.type === "Property" && c.type === "ObjectPattern" && c.properties.includes(s) || s.type === "NGChainedExpression");
            }
        case "ConditionalExpression":
            switch(s.type){
                case "TaggedTemplateExpression":
                case "UnaryExpression":
                case "SpreadElement":
                case "BinaryExpression":
                case "LogicalExpression":
                case "NGPipeExpression":
                case "ExportDefaultDeclaration":
                case "AwaitExpression":
                case "JSXSpreadAttribute":
                case "TSTypeAssertion":
                case "TypeCastExpression":
                case "TSAsExpression":
                case "TSSatisfiesExpression":
                case "AsExpression":
                case "AsConstExpression":
                case "SatisfiesExpression":
                case "TSNonNullExpression":
                    return !0;
                case "NewExpression":
                case "CallExpression":
                case "OptionalCallExpression":
                    return n === "callee";
                case "ConditionalExpression":
                    return t.experimentalTernaries ? !1 : n === "test";
                case "MemberExpression":
                case "OptionalMemberExpression":
                    return n === "object";
                default:
                    return !1;
            }
        case "FunctionExpression":
            switch(s.type){
                case "NewExpression":
                case "CallExpression":
                case "OptionalCallExpression":
                    return n === "callee";
                case "TaggedTemplateExpression":
                    return !0;
                default:
                    return !1;
            }
        case "ArrowFunctionExpression":
            switch(s.type){
                case "BinaryExpression":
                    return s.operator !== "|>" || ((D = r.extra) == null ? void 0 : D.parenthesized);
                case "NewExpression":
                case "CallExpression":
                case "OptionalCallExpression":
                    return n === "callee";
                case "MemberExpression":
                case "OptionalMemberExpression":
                    return n === "object";
                case "TSAsExpression":
                case "TSSatisfiesExpression":
                case "AsExpression":
                case "AsConstExpression":
                case "SatisfiesExpression":
                case "TSNonNullExpression":
                case "BindExpression":
                case "TaggedTemplateExpression":
                case "UnaryExpression":
                case "LogicalExpression":
                case "AwaitExpression":
                case "TSTypeAssertion":
                    return !0;
                case "ConditionalExpression":
                    return n === "test";
                default:
                    return !1;
            }
        case "ClassExpression":
            switch(s.type){
                case "NewExpression":
                    return n === "callee";
                default:
                    return !1;
            }
        case "OptionalMemberExpression":
        case "OptionalCallExpression":
        case "CallExpression":
        case "MemberExpression":
            if (Ro(e)) return !0;
        case "TaggedTemplateExpression":
        case "TSNonNullExpression":
            if (n === "callee" && (s.type === "BindExpression" || s.type === "NewExpression")) {
                let c = r;
                for(; c;)switch(c.type){
                    case "CallExpression":
                    case "OptionalCallExpression":
                        return !0;
                    case "MemberExpression":
                    case "OptionalMemberExpression":
                    case "BindExpression":
                        c = c.object;
                        break;
                    case "TaggedTemplateExpression":
                        c = c.tag;
                        break;
                    case "TSNonNullExpression":
                        c = c.expression;
                        break;
                    default:
                        return !1;
                }
            }
            return !1;
        case "BindExpression":
            return n === "callee" && (s.type === "BindExpression" || s.type === "NewExpression") || n === "object" && R(s);
        case "NGPipeExpression":
            return !(s.type === "NGRoot" || s.type === "NGMicrosyntaxExpression" || s.type === "ObjectProperty" && !((y = r.extra) != null && y.parenthesized) || G(s) || n === "arguments" && I(s) || n === "right" && s.type === "NGPipeExpression" || n === "property" && s.type === "MemberExpression" || s.type === "AssignmentExpression");
        case "JSXFragment":
        case "JSXElement":
            return n === "callee" || n === "left" && s.type === "BinaryExpression" && s.operator === "<" || !G(s) && s.type !== "ArrowFunctionExpression" && s.type !== "AssignmentExpression" && s.type !== "AssignmentPattern" && s.type !== "BinaryExpression" && s.type !== "NewExpression" && s.type !== "ConditionalExpression" && s.type !== "ExpressionStatement" && s.type !== "JsExpressionRoot" && s.type !== "JSXAttribute" && s.type !== "JSXElement" && s.type !== "JSXExpressionContainer" && s.type !== "JSXFragment" && s.type !== "LogicalExpression" && !I(s) && !Ce(s) && s.type !== "ReturnStatement" && s.type !== "ThrowStatement" && s.type !== "TypeCastExpression" && s.type !== "VariableDeclarator" && s.type !== "YieldExpression";
        case "TSInstantiationExpression":
            return n === "object" && R(s);
    }
    return !1;
}
var vo = q([
    "BlockStatement",
    "BreakStatement",
    "ClassBody",
    "ClassDeclaration",
    "ClassMethod",
    "ClassProperty",
    "PropertyDefinition",
    "ClassPrivateProperty",
    "ContinueStatement",
    "DebuggerStatement",
    "DeclareClass",
    "DeclareExportAllDeclaration",
    "DeclareExportDeclaration",
    "DeclareFunction",
    "DeclareInterface",
    "DeclareModule",
    "DeclareModuleExports",
    "DeclareVariable",
    "DeclareEnum",
    "DoWhileStatement",
    "EnumDeclaration",
    "ExportAllDeclaration",
    "ExportDefaultDeclaration",
    "ExportNamedDeclaration",
    "ExpressionStatement",
    "ForInStatement",
    "ForOfStatement",
    "ForStatement",
    "FunctionDeclaration",
    "IfStatement",
    "ImportDeclaration",
    "InterfaceDeclaration",
    "LabeledStatement",
    "MethodDefinition",
    "ReturnStatement",
    "SwitchStatement",
    "ThrowStatement",
    "TryStatement",
    "TSDeclareFunction",
    "TSEnumDeclaration",
    "TSImportEqualsDeclaration",
    "TSInterfaceDeclaration",
    "TSModuleDeclaration",
    "TSNamespaceExportDeclaration",
    "TypeAlias",
    "VariableDeclaration",
    "WhileStatement",
    "WithStatement"
]);
function _o(e) {
    let t = 0, { node: r } = e;
    for(; r;){
        let n = e.getParentNode(t++);
        if ((n == null ? void 0 : n.type) === "ForStatement" && n.init === r) return !0;
        r = n;
    }
    return !1;
}
function jo(e) {
    return er(e, (t)=>t.type === "ObjectTypeAnnotation" && er(t, (r)=>r.type === "FunctionTypeAnnotation"));
}
function Mo(e) {
    return se(e);
}
function ar(e) {
    let { parent: t, key: r } = e;
    switch(t.type){
        case "NGPipeExpression":
            if (r === "arguments" && e.isLast) return e.callParent(ar);
            break;
        case "ObjectProperty":
            if (r === "value") return e.callParent(()=>e.key === "properties" && e.isLast);
            break;
        case "BinaryExpression":
        case "LogicalExpression":
            if (r === "right") return e.callParent(ar);
            break;
        case "ConditionalExpression":
            if (r === "alternate") return e.callParent(ar);
            break;
        case "UnaryExpression":
            if (t.prefix) return e.callParent(ar);
            break;
    }
    return !1;
}
function Iu(e, t) {
    let { node: r, parent: n } = e;
    return r.type === "FunctionExpression" || r.type === "ClassExpression" ? n.type === "ExportDefaultDeclaration" || !Kn(e, t) : !Mt(r) || n.type !== "ExportDefaultDeclaration" && Kn(e, t) ? !1 : e.call(()=>Iu(e, t), ...Or(r));
}
function Ro(e) {
    let { node: t, parent: r, grandparent: n, key: s } = e;
    return !!((t.type === "OptionalMemberExpression" || t.type === "OptionalCallExpression") && (s === "object" && r.type === "MemberExpression" || s === "callee" && (r.type === "CallExpression" || r.type === "NewExpression") || r.type === "TSNonNullExpression" && n.type === "MemberExpression" && n.object === r) || e.match(()=>t.type === "CallExpression" || t.type === "MemberExpression", (u, i)=>i === "expression" && u.type === "ChainExpression") && (e.match(void 0, void 0, (u, i)=>i === "callee" && (u.type === "CallExpression" && !u.optional || u.type === "NewExpression") || i === "object" && u.type === "MemberExpression" && !u.optional) || e.match(void 0, void 0, (u, i)=>i === "expression" && u.type === "TSNonNullExpression", (u, i)=>i === "object" && u.type === "MemberExpression")) || e.match(()=>t.type === "CallExpression" || t.type === "MemberExpression", (u, i)=>i === "expression" && u.type === "TSNonNullExpression", (u, i)=>i === "expression" && u.type === "ChainExpression", (u, i)=>i === "object" && u.type === "MemberExpression"));
}
var he = Kn;
function Jo(e, t) {
    let r = t - 1;
    r = Ne(e, r, {
        backwards: !0
    }), r = $e(e, r, {
        backwards: !0
    }), r = Ne(e, r, {
        backwards: !0
    });
    let n = $e(e, r, {
        backwards: !0
    });
    return r !== n;
}
var Lu = Jo;
var qo = ()=>!0;
function Hn(e, t) {
    let r = e.node;
    return r.printed = !0, t.printer.printComment(e, t);
}
function Uo(e, t) {
    var D;
    let r = e.node, n = [
        Hn(e, t)
    ], { printer: s, originalText: u, locStart: i, locEnd: a } = t;
    if ((D = s.isBlockComment) == null ? void 0 : D.call(s, r)) {
        let y = Q(u, a(r)) ? Q(u, i(r), {
            backwards: !0
        }) ? C : T : " ";
        n.push(y);
    } else n.push(C);
    let p = $e(u, Ne(u, a(r)));
    return p !== !1 && Q(u, p) && n.push(C), n;
}
function Wo(e, t, r) {
    var p;
    let n = e.node, s = Hn(e, t), { printer: u, originalText: i, locStart: a } = t, o = (p = u.isBlockComment) == null ? void 0 : p.call(u, n);
    if (r != null && r.hasLineSuffix && !(r != null && r.isBlock) || Q(i, a(n), {
        backwards: !0
    })) {
        let D = Lu(i, a(n));
        return {
            doc: On([
                C,
                D ? C : "",
                s
            ]),
            isBlock: o,
            hasLineSuffix: !0
        };
    }
    return !o || r != null && r.hasLineSuffix ? {
        doc: [
            On([
                " ",
                s
            ]),
            le
        ],
        isBlock: o,
        hasLineSuffix: !0
    } : {
        doc: [
            " ",
            s
        ],
        isBlock: o,
        hasLineSuffix: !1
    };
}
function j(e, t, r = {}) {
    let { node: n } = e;
    if (!k(n == null ? void 0 : n.comments)) return "";
    let { indent: s = !1, marker: u, filter: i = qo } = r, a = [];
    if (e.each(({ node: p })=>{
        p.leading || p.trailing || p.marker !== u || !i(p) || a.push(Hn(e, t));
    }, "comments"), a.length === 0) return "";
    let o = b(C, a);
    return s ? E([
        C,
        o
    ]) : o;
}
function zn(e, t) {
    let r = e.node;
    if (!r) return {};
    let n = t[Symbol.for("printedComments")];
    if ((r.comments || []).filter((o)=>!n.has(o)).length === 0) return {
        leading: "",
        trailing: ""
    };
    let u = [], i = [], a;
    return e.each(()=>{
        let o = e.node;
        if (n != null && n.has(o)) return;
        let { leading: p, trailing: D } = o;
        p ? u.push(Uo(e, t)) : D && (a = Wo(e, t, a), i.push(a.doc));
    }, "comments"), {
        leading: u,
        trailing: i
    };
}
function ce(e, t, r) {
    let { leading: n, trailing: s } = zn(e, r);
    return !n && !s ? t : Ht(t, (u)=>[
            n,
            u,
            s
        ]);
}
var Qn = class extends Error {
    name = "UnexpectedNodeError";
    constructor(t, r, n = "type"){
        super(`Unexpected ${r} node ${n}: ${JSON.stringify(t[n])}.`), this.node = t;
    }
}, _e = Qn;
function Zn(e) {
    if (typeof e != "string") throw new TypeError("Expected a string");
    return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
var je, es = class {
    constructor(t){
        Ys(this, je, void 0);
        Xs(this, je, new Set(t));
    }
    getLeadingWhitespaceCount(t) {
        let r = ut(this, je), n = 0;
        for(let s = 0; s < t.length && r.has(t.charAt(s)); s++)n++;
        return n;
    }
    getTrailingWhitespaceCount(t) {
        let r = ut(this, je), n = 0;
        for(let s = t.length - 1; s >= 0 && r.has(t.charAt(s)); s--)n++;
        return n;
    }
    getLeadingWhitespace(t) {
        let r = this.getLeadingWhitespaceCount(t);
        return t.slice(0, r);
    }
    getTrailingWhitespace(t) {
        let r = this.getTrailingWhitespaceCount(t);
        return t.slice(t.length - r);
    }
    hasLeadingWhitespace(t) {
        return ut(this, je).has(t.charAt(0));
    }
    hasTrailingWhitespace(t) {
        return ut(this, je).has(w(!1, t, -1));
    }
    trimStart(t) {
        let r = this.getLeadingWhitespaceCount(t);
        return t.slice(r);
    }
    trimEnd(t) {
        let r = this.getTrailingWhitespaceCount(t);
        return t.slice(0, t.length - r);
    }
    trim(t) {
        return this.trimEnd(this.trimStart(t));
    }
    split(t, r = !1) {
        let n = `[${Zn([
            ...ut(this, je)
        ].join(""))}]+`, s = new RegExp(r ? `(${n})` : n);
        return t.split(s);
    }
    hasWhitespaceCharacter(t) {
        let r = ut(this, je);
        return Array.prototype.some.call(t, (n)=>r.has(n));
    }
    hasNonWhitespaceCharacter(t) {
        let r = ut(this, je);
        return Array.prototype.some.call(t, (n)=>!r.has(n));
    }
    isWhitespaceOnly(t) {
        let r = ut(this, je);
        return Array.prototype.every.call(t, (n)=>r.has(n));
    }
};
je = new WeakMap;
var Ou = es;
var as = {};
Cr(as, {
    endOfLine: ()=>Ko,
    ownLine: ()=>Vo,
    remaining: ()=>Ho
});
function Go(e, t) {
    let r = null, n = t;
    for(; n !== r;)r = n, n = Ne(e, n), n = wt(e, n), n = vt(e, n), n = $e(e, n);
    return n;
}
var ct = Go;
function Yo(e, t) {
    let r = ct(e, t);
    return r === !1 ? "" : e.charAt(r);
}
var Ve = Yo;
function Xo(e, t, r) {
    for(let n = t; n < r; ++n)if (e.charAt(n) === `
`) return !0;
    return !1;
}
var Ie = Xo;
function No(e) {
    let t = e.type || e.kind || "(unknown type)", r = String(e.name || e.id && (typeof e.id == "object" ? e.id.name : e.id) || e.key && (typeof e.key == "object" ? e.key.name : e.key) || e.value && (typeof e.value == "object" ? "" : String(e.value)) || e.operator || "");
    return r.length > 20 && (r = r.slice(0, 19) + "\u2026"), t + (r ? " " + r : "");
}
function ts(e, t) {
    (e.comments ?? (e.comments = [])).push(t), t.printed = !1, t.nodeDescription = No(e);
}
function ae(e, t) {
    t.leading = !0, t.trailing = !1, ts(e, t);
}
function Te(e, t, r) {
    t.leading = !1, t.trailing = !1, r && (t.marker = r), ts(e, t);
}
function te(e, t) {
    t.leading = !1, t.trailing = !0, ts(e, t);
}
function $o(e) {
    return Z(e) && e.value[0] === "*" && /@(?:type|satisfies)\b/.test(e.value);
}
var wu = $o;
function Vo(e) {
    return [
        Uu,
        _u,
        Ru,
        Qo,
        ns,
        ss,
        vu,
        ju,
        cp,
        op,
        is,
        qu,
        lp,
        Mu,
        Ju,
        us,
        Zo,
        Ap
    ].some((t)=>t(e));
}
function Ko(e) {
    return [
        zo,
        Ru,
        _u,
        qu,
        ns,
        ss,
        vu,
        ju,
        Ju,
        ap,
        pp,
        is,
        yp,
        us,
        Fp,
        Cp
    ].some((t)=>t(e));
}
function Ho(e) {
    return [
        Uu,
        ns,
        ss,
        ep,
        ip,
        Mu,
        is,
        up,
        sp,
        Ep,
        us,
        fp
    ].some((t)=>t(e));
}
function St(e, t) {
    let r = (e.body || e.properties).find(({ type: n })=>n !== "EmptyStatement");
    r ? ae(r, t) : Te(e, t);
}
function rs(e, t) {
    e.type === "BlockStatement" ? St(e, t) : ae(e, t);
}
function zo({ comment: e, followingNode: t }) {
    return t && wu(e) ? (ae(t, e), !0) : !1;
}
function ns({ comment: e, precedingNode: t, enclosingNode: r, followingNode: n, text: s }) {
    if ((r == null ? void 0 : r.type) !== "IfStatement" || !n) return !1;
    if (Ve(s, L(e)) === ")") return te(t, e), !0;
    if (t === r.consequent && n === r.alternate) {
        if (t.type === "BlockStatement") te(t, e);
        else {
            let i = e.type === "SingleLine" || e.loc.start.line === e.loc.end.line, a = e.loc.start.line === t.loc.start.line;
            i && a ? Te(t, e, t.type === "ExpressionStatement" ? ir : void 0) : Te(r, e);
        }
        return !0;
    }
    return n.type === "BlockStatement" ? (St(n, e), !0) : n.type === "IfStatement" ? (rs(n.consequent, e), !0) : r.consequent === n ? (ae(n, e), !0) : !1;
}
function ss({ comment: e, precedingNode: t, enclosingNode: r, followingNode: n, text: s }) {
    return (r == null ? void 0 : r.type) !== "WhileStatement" || !n ? !1 : Ve(s, L(e)) === ")" ? (te(t, e), !0) : n.type === "BlockStatement" ? (St(n, e), !0) : r.body === n ? (ae(n, e), !0) : !1;
}
function vu({ comment: e, precedingNode: t, enclosingNode: r, followingNode: n }) {
    return (r == null ? void 0 : r.type) !== "TryStatement" && (r == null ? void 0 : r.type) !== "CatchClause" || !n ? !1 : r.type === "CatchClause" && t ? (te(t, e), !0) : n.type === "BlockStatement" ? (St(n, e), !0) : n.type === "TryStatement" ? (rs(n.finalizer, e), !0) : n.type === "CatchClause" ? (rs(n.body, e), !0) : !1;
}
function Qo({ comment: e, enclosingNode: t, followingNode: r }) {
    return R(t) && (r == null ? void 0 : r.type) === "Identifier" ? (ae(t, e), !0) : !1;
}
function Zo({ comment: e, enclosingNode: t, followingNode: r, options: n }) {
    return !n.experimentalTernaries || !((t == null ? void 0 : t.type) === "ConditionalExpression" || (t == null ? void 0 : t.type) === "ConditionalTypeAnnotation" || (t == null ? void 0 : t.type) === "TSConditionalType") ? !1 : (r == null ? void 0 : r.type) === "ConditionalExpression" || (r == null ? void 0 : r.type) === "ConditionalTypeAnnotation" || (r == null ? void 0 : r.type) === "TSConditionalType" ? (Te(t, e), !0) : !1;
}
function _u({ comment: e, precedingNode: t, enclosingNode: r, followingNode: n, text: s, options: u }) {
    let i = t && !Ie(s, L(t), J(e));
    return (!t || !i) && ((r == null ? void 0 : r.type) === "ConditionalExpression" || (r == null ? void 0 : r.type) === "ConditionalTypeAnnotation" || (r == null ? void 0 : r.type) === "TSConditionalType") && n ? u.experimentalTernaries && r.alternate === n && !(Z(e) && !Ie(u.originalText, J(e), L(e))) ? (Te(r, e), !0) : (ae(n, e), !0) : !1;
}
function ep({ comment: e, precedingNode: t, enclosingNode: r }) {
    return Ce(r) && r.shorthand && r.key === t && r.value.type === "AssignmentPattern" ? (te(r.value.left, e), !0) : !1;
}
var tp = new Set([
    "ClassDeclaration",
    "ClassExpression",
    "DeclareClass",
    "DeclareInterface",
    "InterfaceDeclaration",
    "TSInterfaceDeclaration"
]);
function ju({ comment: e, precedingNode: t, enclosingNode: r, followingNode: n }) {
    if (tp.has(r == null ? void 0 : r.type)) {
        if (k(r.decorators) && (n == null ? void 0 : n.type) !== "Decorator") return te(w(!1, r.decorators, -1), e), !0;
        if (r.body && n === r.body) return St(r.body, e), !0;
        if (n) {
            if (r.superClass && n === r.superClass && t && (t === r.id || t === r.typeParameters)) return te(t, e), !0;
            for (let s of [
                "implements",
                "extends",
                "mixins"
            ])if (r[s] && n === r[s][0]) return t && (t === r.id || t === r.typeParameters || t === r.superClass) ? te(t, e) : Te(r, e, s), !0;
        }
    }
    return !1;
}
var rp = new Set([
    "ClassMethod",
    "ClassProperty",
    "PropertyDefinition",
    "TSAbstractPropertyDefinition",
    "TSAbstractMethodDefinition",
    "TSDeclareMethod",
    "MethodDefinition",
    "ClassAccessorProperty",
    "AccessorProperty",
    "TSAbstractAccessorProperty"
]);
function Mu({ comment: e, precedingNode: t, enclosingNode: r, text: n }) {
    return r && t && Ve(n, L(e)) === "(" && (r.type === "Property" || r.type === "TSDeclareMethod" || r.type === "TSAbstractMethodDefinition") && t.type === "Identifier" && r.key === t && Ve(n, L(t)) !== ":" ? (te(t, e), !0) : (t == null ? void 0 : t.type) === "Decorator" && rp.has(r == null ? void 0 : r.type) ? (te(t, e), !0) : !1;
}
var np = new Set([
    "FunctionDeclaration",
    "FunctionExpression",
    "ClassMethod",
    "MethodDefinition",
    "ObjectMethod"
]);
function sp({ comment: e, precedingNode: t, enclosingNode: r, text: n }) {
    return Ve(n, L(e)) !== "(" ? !1 : t && np.has(r == null ? void 0 : r.type) ? (te(t, e), !0) : !1;
}
function up({ comment: e, enclosingNode: t, text: r }) {
    if ((t == null ? void 0 : t.type) !== "ArrowFunctionExpression") return !1;
    let n = ct(r, L(e));
    return n !== !1 && r.slice(n, n + 2) === "=>" ? (Te(t, e), !0) : !1;
}
function ip({ comment: e, enclosingNode: t, text: r }) {
    return Ve(r, L(e)) !== ")" ? !1 : t && (Wu(t) && V(t).length === 0 || pt(t) && ge(t).length === 0) ? (Te(t, e), !0) : ((t == null ? void 0 : t.type) === "MethodDefinition" || (t == null ? void 0 : t.type) === "TSAbstractMethodDefinition") && V(t.value).length === 0 ? (Te(t.value, e), !0) : !1;
}
function Ru({ comment: e, precedingNode: t, enclosingNode: r, followingNode: n, text: s }) {
    return (t == null ? void 0 : t.type) === "FunctionTypeParam" && (r == null ? void 0 : r.type) === "FunctionTypeAnnotation" && (n == null ? void 0 : n.type) !== "FunctionTypeParam" ? (te(t, e), !0) : ((t == null ? void 0 : t.type) === "Identifier" || (t == null ? void 0 : t.type) === "AssignmentPattern" || (t == null ? void 0 : t.type) === "ObjectPattern" || (t == null ? void 0 : t.type) === "ArrayPattern" || (t == null ? void 0 : t.type) === "RestElement" || (t == null ? void 0 : t.type) === "TSParameterProperty") && Wu(r) && Ve(s, L(e)) === ")" ? (te(t, e), !0) : !Z(e) && ((r == null ? void 0 : r.type) === "FunctionDeclaration" || (r == null ? void 0 : r.type) === "FunctionExpression" || (r == null ? void 0 : r.type) === "ObjectMethod") && (n == null ? void 0 : n.type) === "BlockStatement" && r.body === n && ct(s, L(e)) === J(n) ? (St(n, e), !0) : !1;
}
function Ju({ comment: e, enclosingNode: t }) {
    return (t == null ? void 0 : t.type) === "LabeledStatement" ? (ae(t, e), !0) : !1;
}
function us({ comment: e, enclosingNode: t }) {
    return ((t == null ? void 0 : t.type) === "ContinueStatement" || (t == null ? void 0 : t.type) === "BreakStatement") && !t.label ? (te(t, e), !0) : !1;
}
function ap({ comment: e, precedingNode: t, enclosingNode: r }) {
    return I(r) && t && r.callee === t && r.arguments.length > 0 ? (ae(r.arguments[0], e), !0) : !1;
}
function op({ comment: e, precedingNode: t, enclosingNode: r, followingNode: n }) {
    return (r == null ? void 0 : r.type) === "UnionTypeAnnotation" || (r == null ? void 0 : r.type) === "TSUnionType" ? (ur(e) && (n.prettierIgnore = !0, e.unignore = !0), t ? (te(t, e), !0) : !1) : (((n == null ? void 0 : n.type) === "UnionTypeAnnotation" || (n == null ? void 0 : n.type) === "TSUnionType") && ur(e) && (n.types[0].prettierIgnore = !0, e.unignore = !0), !1);
}
function pp({ comment: e, enclosingNode: t }) {
    return Ce(t) ? (ae(t, e), !0) : !1;
}
function is({ comment: e, enclosingNode: t, followingNode: r, ast: n, isLastComment: s }) {
    var u;
    return ((u = n == null ? void 0 : n.body) == null ? void 0 : u.length) === 0 ? (s ? Te(n, e) : ae(n, e), !0) : (t == null ? void 0 : t.type) === "Program" && t.body.length === 0 && !k(t.directives) ? (s ? Te(t, e) : ae(t, e), !0) : (r == null ? void 0 : r.type) === "Program" && r.body.length === 0 && (t == null ? void 0 : t.type) === "ModuleExpression" ? (Te(r, e), !0) : !1;
}
function cp({ comment: e, enclosingNode: t }) {
    return (t == null ? void 0 : t.type) === "ForInStatement" || (t == null ? void 0 : t.type) === "ForOfStatement" ? (ae(t, e), !0) : !1;
}
function qu({ comment: e, precedingNode: t, enclosingNode: r, text: n }) {
    if ((r == null ? void 0 : r.type) === "ImportSpecifier" || (r == null ? void 0 : r.type) === "ExportSpecifier") return ae(r, e), !0;
    let s = (t == null ? void 0 : t.type) === "ImportSpecifier" && (r == null ? void 0 : r.type) === "ImportDeclaration", u = (t == null ? void 0 : t.type) === "ExportSpecifier" && (r == null ? void 0 : r.type) === "ExportNamedDeclaration";
    return (s || u) && Q(n, L(e)) ? (te(t, e), !0) : !1;
}
function lp({ comment: e, enclosingNode: t }) {
    return (t == null ? void 0 : t.type) === "AssignmentPattern" ? (ae(t, e), !0) : !1;
}
var mp = new Set([
    "VariableDeclarator",
    "AssignmentExpression",
    "TypeAlias",
    "TSTypeAliasDeclaration"
]), Dp = new Set([
    "ObjectExpression",
    "RecordExpression",
    "ArrayExpression",
    "TupleExpression",
    "TemplateLiteral",
    "TaggedTemplateExpression",
    "ObjectTypeAnnotation",
    "TSTypeLiteral"
]);
function yp({ comment: e, enclosingNode: t, followingNode: r }) {
    return mp.has(t == null ? void 0 : t.type) && r && (Dp.has(r.type) || Z(e)) ? (ae(r, e), !0) : !1;
}
function fp({ comment: e, enclosingNode: t, followingNode: r, text: n }) {
    return !r && ((t == null ? void 0 : t.type) === "TSMethodSignature" || (t == null ? void 0 : t.type) === "TSDeclareFunction" || (t == null ? void 0 : t.type) === "TSAbstractMethodDefinition") && Ve(n, L(e)) === ";" ? (te(t, e), !0) : !1;
}
function Uu({ comment: e, enclosingNode: t, followingNode: r }) {
    if (ur(e) && (t == null ? void 0 : t.type) === "TSMappedType" && (r == null ? void 0 : r.type) === "TSTypeParameter" && r.constraint) return t.prettierIgnore = !0, e.unignore = !0, !0;
}
function Ep({ comment: e, precedingNode: t, enclosingNode: r, followingNode: n }) {
    return (r == null ? void 0 : r.type) !== "TSMappedType" ? !1 : (n == null ? void 0 : n.type) === "TSTypeParameter" && n.name ? (ae(n.name, e), !0) : (t == null ? void 0 : t.type) === "TSTypeParameter" && t.constraint ? (te(t.constraint, e), !0) : !1;
}
function Fp({ comment: e, enclosingNode: t, followingNode: r }) {
    return !t || t.type !== "SwitchCase" || t.test || !r || r !== t.consequent[0] ? !1 : (r.type === "BlockStatement" && tr(e) ? St(r, e) : Te(t, e), !0);
}
function Cp({ comment: e, precedingNode: t, enclosingNode: r, followingNode: n }) {
    return t && (t.type === "TSUnionType" || t.type === "UnionTypeAnnotation") && ((r.type === "TSArrayType" || r.type === "ArrayTypeAnnotation") && n === void 0 || r.type === "TSIntersectionType" || r.type === "IntersectionTypeAnnotation") ? (te(w(!1, t.types, -1), e), !0) : !1;
}
function Ap({ comment: e, enclosingNode: t, precedingNode: r, followingNode: n }) {
    if (((t == null ? void 0 : t.type) === "ObjectPattern" || (t == null ? void 0 : t.type) === "ArrayPattern") && (n == null ? void 0 : n.type) === "TSTypeAnnotation") return r ? te(r, e) : Te(t, e), !0;
}
var Wu = q([
    "ArrowFunctionExpression",
    "FunctionExpression",
    "FunctionDeclaration",
    "ObjectMethod",
    "ClassMethod",
    "TSDeclareFunction",
    "TSCallSignatureDeclaration",
    "TSConstructSignatureDeclaration",
    "TSMethodSignature",
    "TSConstructorType",
    "TSFunctionType",
    "TSDeclareMethod"
]);
function Tp(e) {
    let t = `*${e.value}*`.split(`
`);
    return t.length > 1 && t.every((r)=>r.trimStart()[0] === "*");
}
var Gu = Tp;
function Yu(e, t) {
    let r = e.node;
    if (tr(r)) return t.originalText.slice(J(r), L(r)).trimEnd();
    if (Z(r)) return Gu(r) ? dp(r) : [
        "/*",
        be(r.value),
        "*/"
    ];
    throw new Error("Not a comment: " + JSON.stringify(r));
}
function dp(e) {
    let t = e.value.split(`
`);
    return [
        "/*",
        b(C, t.map((r, n)=>n === 0 ? r.trimEnd() : " " + (n < t.length - 1 ? r.trim() : r.trimStart()))),
        "*/"
    ];
}
var xp = new Set([
    "EmptyStatement",
    "TemplateElement",
    "Import",
    "TSEmptyBodyFunctionExpression",
    "ChainExpression"
]);
function gp(e) {
    return !xp.has(e.type);
}
function hp(e, t) {
    var r;
    if ((t.parser === "typescript" || t.parser === "flow" || t.parser === "acorn" || t.parser === "espree" || t.parser === "meriyah" || t.parser === "__babel_estree") && e.type === "MethodDefinition" && ((r = e.value) == null ? void 0 : r.type) === "FunctionExpression" && V(e.value).length === 0 && !e.value.returnType && !k(e.value.typeParameters) && e.value.body) return [
        ...e.decorators || [],
        e.key,
        e.value.body
    ];
}
function os(e) {
    let { node: t, parent: r } = e;
    return (Y(t) || r && (r.type === "JSXSpreadAttribute" || r.type === "JSXSpreadChild" || r.type === "UnionTypeAnnotation" || r.type === "TSUnionType" || (r.type === "ClassDeclaration" || r.type === "ClassExpression") && r.superClass === t)) && (!ht(t) || r.type === "UnionTypeAnnotation" || r.type === "TSUnionType");
}
function Sp(e, { parser: t }) {
    if (t === "flow" || t === "babel-flow") return e = K(!1, e, /[\s(]/g, ""), e === "" || e === "/*" || e === "/*::";
}
var Rr = new Ou(` 
\r	`), ps = (e)=>e === "" || e === T || e === C || e === F;
function Bp(e, t, r) {
    var v, M, _;
    let { node: n } = e;
    if (n.type === "JSXElement" && qp(n)) return [
        r("openingElement"),
        r("closingElement")
    ];
    let s = n.type === "JSXElement" ? r("openingElement") : r("openingFragment"), u = n.type === "JSXElement" ? r("closingElement") : r("closingFragment");
    if (n.children.length === 1 && n.children[0].type === "JSXExpressionContainer" && (n.children[0].expression.type === "TemplateLiteral" || n.children[0].expression.type === "TaggedTemplateExpression")) return [
        s,
        ...e.map(r, "children"),
        u
    ];
    n.children = n.children.map((d)=>Up(d) ? {
            type: "JSXText",
            value: " ",
            raw: " "
        } : d);
    let i = n.children.some(Y), a = n.children.filter((d)=>d.type === "JSXExpressionContainer").length > 1, o = n.type === "JSXElement" && n.openingElement.attributes.length > 1, p = z(s) || i || o || a, D = e.parent.rootMarker === "mdx", y = t.singleQuote ? "{' '}" : '{" "}', c = D ? " " : B([
        y,
        F
    ], " "), f = ((M = (v = n.openingElement) == null ? void 0 : v.name) == null ? void 0 : M.name) === "fbt", l = bp(e, t, r, c, f), h = n.children.some((d)=>or(d));
    for(let d = l.length - 2; d >= 0; d--){
        let U = l[d] === "" && l[d + 1] === "", Ee = l[d] === C && l[d + 1] === "" && l[d + 2] === C, N = (l[d] === F || l[d] === C) && l[d + 1] === "" && l[d + 2] === c, ue = l[d] === c && l[d + 1] === "" && (l[d + 2] === F || l[d + 2] === C), H = l[d] === c && l[d + 1] === "" && l[d + 2] === c, It = l[d] === F && l[d + 1] === "" && l[d + 2] === C || l[d] === C && l[d + 1] === "" && l[d + 2] === F;
        Ee && h || U || N || H || It ? l.splice(d, 2) : ue && l.splice(d + 1, 2);
    }
    for(; l.length > 0 && ps(w(!1, l, -1));)l.pop();
    for(; l.length > 1 && ps(l[0]) && ps(l[1]);)l.shift(), l.shift();
    let g = [];
    for (let [d, U] of l.entries()){
        if (U === c) {
            if (d === 1 && l[d - 1] === "") {
                if (l.length === 2) {
                    g.push(y);
                    continue;
                }
                g.push([
                    y,
                    C
                ]);
                continue;
            } else if (d === l.length - 1) {
                g.push(y);
                continue;
            } else if (l[d - 1] === "" && l[d - 2] === C) {
                g.push(y);
                continue;
            }
        }
        g.push(U), z(U) && (p = !0);
    }
    let S = h ? Lt(g) : m(g, {
        shouldBreak: !0
    });
    if (((_ = t.cursorNode) == null ? void 0 : _.type) === "JSXText" && n.children.includes(t.cursorNode) && (S = [
        vn,
        S,
        vn
    ]), D) return S;
    let P = m([
        s,
        E([
            C,
            S
        ]),
        C,
        u
    ]);
    return p ? P : Xe([
        m([
            s,
            ...l,
            u
        ]),
        P
    ]);
}
function bp(e, t, r, n, s) {
    let u = [];
    return e.each(({ node: i, next: a })=>{
        if (i.type === "JSXText") {
            let o = De(i);
            if (or(i)) {
                let p = Rr.split(o, !0);
                p[0] === "" && (u.push(""), p.shift(), /\n/.test(p[0]) ? u.push(Nu(s, p[1], i, a)) : u.push(n), p.shift());
                let D;
                if (w(!1, p, -1) === "" && (p.pop(), D = p.pop()), p.length === 0) return;
                for (let [y, c] of p.entries())y % 2 === 1 ? u.push(T) : u.push(c);
                D !== void 0 ? /\n/.test(D) ? u.push(Nu(s, w(!1, u, -1), i, a)) : u.push(n) : u.push(Xu(s, w(!1, u, -1), i, a));
            } else /\n/.test(o) ? o.match(/\n/g).length > 1 && u.push("", C) : u.push("", n);
        } else {
            let o = r();
            if (u.push(o), a && or(a)) {
                let D = Rr.trim(De(a)), [y] = Rr.split(D);
                u.push(Xu(s, y, i, a));
            } else u.push(C);
        }
    }, "children"), u;
}
function Xu(e, t, r, n) {
    return e ? "" : r.type === "JSXElement" && !r.closingElement || (n == null ? void 0 : n.type) === "JSXElement" && !n.closingElement ? t.length === 1 ? F : C : F;
}
function Nu(e, t, r, n) {
    return e ? C : t.length === 1 ? r.type === "JSXElement" && !r.closingElement || (n == null ? void 0 : n.type) === "JSXElement" && !n.closingElement ? C : F : C;
}
var Pp = new Set([
    "ArrayExpression",
    "TupleExpression",
    "JSXAttribute",
    "JSXElement",
    "JSXExpressionContainer",
    "JSXFragment",
    "ExpressionStatement",
    "CallExpression",
    "OptionalCallExpression",
    "ConditionalExpression",
    "JsExpressionRoot"
]);
function kp(e, t, r) {
    let { parent: n } = e;
    if (Pp.has(n.type)) return t;
    let s = e.match(void 0, (i)=>i.type === "ArrowFunctionExpression", I, (i)=>i.type === "JSXExpressionContainer"), u = he(e, r);
    return m([
        u ? "" : B("("),
        E([
            F,
            t
        ]),
        F,
        u ? "" : B(")")
    ], {
        shouldBreak: s
    });
}
function Ip(e, t, r) {
    let { node: n } = e, s = [];
    if (s.push(r("name")), n.value) {
        let u;
        if (ee(n.value)) {
            let i = De(n.value), a = K(!1, K(!1, i.slice(1, -1), "&apos;", "'"), "&quot;", '"'), o = Pr(a, t.jsxSingleQuote);
            a = o === '"' ? K(!1, a, '"', "&quot;") : K(!1, a, "'", "&apos;"), u = e.call(()=>ce(e, be(o + a + o), t), "value");
        } else u = r("value");
        s.push("=", u);
    }
    return s;
}
function Lp(e, t, r) {
    let { node: n } = e, s = (u, i)=>u.type === "JSXEmptyExpression" || !A(u) && (G(u) || se(u) || u.type === "ArrowFunctionExpression" || u.type === "AwaitExpression" && (s(u.argument, u) || u.argument.type === "JSXElement") || I(u) || u.type === "ChainExpression" && I(u.expression) || u.type === "FunctionExpression" || u.type === "TemplateLiteral" || u.type === "TaggedTemplateExpression" || u.type === "DoExpression" || Y(i) && (u.type === "ConditionalExpression" || me(u)));
    return s(n.expression, e.parent) ? m([
        "{",
        r("expression"),
        Be,
        "}"
    ]) : m([
        "{",
        E([
            F,
            r("expression")
        ]),
        F,
        Be,
        "}"
    ]);
}
function Op(e, t, r) {
    var a, o;
    let { node: n } = e, s = A(n.name) || A(n.typeParameters) || A(n.typeArguments);
    if (n.selfClosing && n.attributes.length === 0 && !s) return [
        "<",
        r("name"),
        n.typeArguments ? r("typeArguments") : r("typeParameters"),
        " />"
    ];
    if (((a = n.attributes) == null ? void 0 : a.length) === 1 && n.attributes[0].value && ee(n.attributes[0].value) && !n.attributes[0].value.value.includes(`
`) && !s && !A(n.attributes[0])) return m([
        "<",
        r("name"),
        n.typeArguments ? r("typeArguments") : r("typeParameters"),
        " ",
        ...e.map(r, "attributes"),
        n.selfClosing ? " />" : ">"
    ]);
    let u = (o = n.attributes) == null ? void 0 : o.some((p)=>p.value && ee(p.value) && p.value.value.includes(`
`)), i = t.singleAttributePerLine && n.attributes.length > 1 ? C : T;
    return m([
        "<",
        r("name"),
        n.typeArguments ? r("typeArguments") : r("typeParameters"),
        E(e.map(()=>[
                i,
                r()
            ], "attributes")),
        ...wp(n, t, s)
    ], {
        shouldBreak: u
    });
}
function wp(e, t, r) {
    return e.selfClosing ? [
        T,
        "/>"
    ] : vp(e, t, r) ? [
        ">"
    ] : [
        F,
        ">"
    ];
}
function vp(e, t, r) {
    let n = e.attributes.length > 0 && A(w(!1, e.attributes, -1), x.Trailing);
    return e.attributes.length === 0 && !r || (t.bracketSameLine || t.jsxBracketSameLine) && (!r || e.attributes.length > 0) && !n;
}
function _p(e, t, r) {
    let { node: n } = e, s = [];
    s.push("</");
    let u = r("name");
    return A(n.name, x.Leading | x.Line) ? s.push(E([
        C,
        u
    ]), C) : A(n.name, x.Leading | x.Block) ? s.push(" ", u) : s.push(u), s.push(">"), s;
}
function jp(e, t) {
    let { node: r } = e, n = A(r), s = A(r, x.Line), u = r.type === "JSXOpeningFragment";
    return [
        u ? "<" : "</",
        E([
            s ? C : n && !u ? " " : "",
            j(e, t)
        ]),
        s ? C : "",
        ">"
    ];
}
function Mp(e, t, r) {
    let n = ce(e, Bp(e, t, r), t);
    return kp(e, n, t);
}
function Rp(e, t) {
    let { node: r } = e, n = A(r, x.Line);
    return [
        j(e, t, {
            indent: n
        }),
        n ? C : ""
    ];
}
function Jp(e, t, r) {
    let { node: n } = e;
    return [
        "{",
        e.call(({ node: s })=>{
            let u = [
                "...",
                r()
            ];
            return !A(s) || !os(e) ? u : [
                E([
                    F,
                    ce(e, u, t)
                ]),
                F
            ];
        }, n.type === "JSXSpreadAttribute" ? "argument" : "expression"),
        "}"
    ];
}
function $u(e, t, r) {
    let { node: n } = e;
    if (n.type.startsWith("JSX")) switch(n.type){
        case "JSXAttribute":
            return Ip(e, t, r);
        case "JSXIdentifier":
            return n.name;
        case "JSXNamespacedName":
            return b(":", [
                r("namespace"),
                r("name")
            ]);
        case "JSXMemberExpression":
            return b(".", [
                r("object"),
                r("property")
            ]);
        case "JSXSpreadAttribute":
        case "JSXSpreadChild":
            return Jp(e, t, r);
        case "JSXExpressionContainer":
            return Lp(e, t, r);
        case "JSXFragment":
        case "JSXElement":
            return Mp(e, t, r);
        case "JSXOpeningElement":
            return Op(e, t, r);
        case "JSXClosingElement":
            return _p(e, t, r);
        case "JSXOpeningFragment":
        case "JSXClosingFragment":
            return jp(e, t);
        case "JSXEmptyExpression":
            return Rp(e, t);
        case "JSXText":
            throw new Error("JSXText should be handled by JSXElement");
        default:
            throw new _e(n, "JSX");
    }
}
function qp(e) {
    if (e.children.length === 0) return !0;
    if (e.children.length > 1) return !1;
    let t = e.children[0];
    return t.type === "JSXText" && !or(t);
}
function or(e) {
    return e.type === "JSXText" && (Rr.hasNonWhitespaceCharacter(De(e)) || !/\n/.test(De(e)));
}
function Up(e) {
    return e.type === "JSXExpressionContainer" && ee(e.expression) && e.expression.value === " " && !A(e.expression);
}
function Vu(e) {
    let { node: t, parent: r } = e;
    if (!Y(t) || !Y(r)) return !1;
    let { index: n, siblings: s } = e, u;
    for(let i = n; i > 0; i--){
        let a = s[i - 1];
        if (!(a.type === "JSXText" && !or(a))) {
            u = a;
            break;
        }
    }
    return (u == null ? void 0 : u.type) === "JSXExpressionContainer" && u.expression.type === "JSXEmptyExpression" && ht(u.expression);
}
function Wp(e) {
    return ht(e.node) || Vu(e);
}
var Jr = Wp;
var Gp = 0;
function qr(e, t, r) {
    var M;
    let { node: n, parent: s, grandparent: u, key: i } = e, a = i !== "body" && (s.type === "IfStatement" || s.type === "WhileStatement" || s.type === "SwitchStatement" || s.type === "DoWhileStatement"), o = n.operator === "|>" && ((M = e.root.extra) == null ? void 0 : M.__isUsingHackPipeline), p = cs(e, r, t, !1, a);
    if (a) return p;
    if (o) return m(p);
    if (I(s) && s.callee === n || s.type === "UnaryExpression" || R(s) && !s.computed) return m([
        E([
            F,
            ...p
        ]),
        F
    ]);
    let D = s.type === "ReturnStatement" || s.type === "ThrowStatement" || s.type === "JSXExpressionContainer" && u.type === "JSXAttribute" || n.operator !== "|" && s.type === "JsExpressionRoot" || n.type !== "NGPipeExpression" && (s.type === "NGRoot" && t.parser === "__ng_binding" || s.type === "NGMicrosyntaxExpression" && u.type === "NGMicrosyntax" && u.body.length === 1) || n === s.body && s.type === "ArrowFunctionExpression" || n !== s.body && s.type === "ForStatement" || s.type === "ConditionalExpression" && u.type !== "ReturnStatement" && u.type !== "ThrowStatement" && !I(u) || s.type === "TemplateLiteral", y = s.type === "AssignmentExpression" || s.type === "VariableDeclarator" || s.type === "ClassProperty" || s.type === "PropertyDefinition" || s.type === "TSAbstractPropertyDefinition" || s.type === "ClassPrivateProperty" || Ce(s), c = me(n.left) && sr(n.operator, n.left.operator);
    if (D || Jt(n) && !c || !Jt(n) && y) return m(p);
    if (p.length === 0) return "";
    let f = Y(n.right), l = p.findIndex((_)=>typeof _ != "string" && !Array.isArray(_) && _.type === oe), h = p.slice(0, l === -1 ? 1 : l + 1), g = p.slice(h.length, f ? -1 : void 0), S = Symbol("logicalChain-" + ++Gp), P = m([
        ...h,
        E(g)
    ], {
        id: S
    });
    if (!f) return P;
    let v = w(!1, p, -1);
    return m([
        P,
        Et(v, {
            groupId: S
        })
    ]);
}
function cs(e, t, r, n, s) {
    var h;
    let { node: u } = e;
    if (!me(u)) return [
        m(t())
    ];
    let i = [];
    sr(u.operator, u.left.operator) ? i = e.call((g)=>cs(g, t, r, !0, s), "left") : i.push(m(t("left")));
    let a = Jt(u), o = (u.operator === "|>" || u.type === "NGPipeExpression" || Yp(e, r)) && !ve(r.originalText, u.right), p = u.type === "NGPipeExpression" ? "|" : u.operator, D = u.type === "NGPipeExpression" && u.arguments.length > 0 ? m(E([
        F,
        ": ",
        b([
            T,
            ": "
        ], e.map(()=>xe(2, m(t())), "arguments"))
    ])) : "", y;
    if (a) y = [
        p,
        " ",
        t("right"),
        D
    ];
    else {
        let S = p === "|>" && ((h = e.root.extra) == null ? void 0 : h.__isUsingHackPipeline) ? e.call((P)=>cs(P, t, r, !0, s), "right") : t("right");
        y = [
            o ? T : "",
            p,
            o ? " " : T,
            S,
            D
        ];
    }
    let { parent: c } = e, f = A(u.left, x.Trailing | x.Line), l = f || !(s && u.type === "LogicalExpression") && c.type !== u.type && u.left.type !== u.type && u.right.type !== u.type;
    if (i.push(o ? "" : " ", l ? m(y, {
        shouldBreak: f
    }) : y), n && A(u)) {
        let g = Ot(ce(e, i, r));
        return Array.isArray(g) || g.type === Fe ? gr(g) : [
            g
        ];
    }
    return i;
}
function Jt(e) {
    return e.type !== "LogicalExpression" ? !1 : !!(se(e.right) && e.right.properties.length > 0 || G(e.right) && e.right.elements.length > 0 || Y(e.right));
}
var Ku = (e)=>e.type === "BinaryExpression" && e.operator === "|";
function Yp(e, t) {
    return (t.parser === "__vue_expression" || t.parser === "__vue_ts_expression") && Ku(e.node) && !e.hasAncestor((r)=>!Ku(r) && r.type !== "JsExpressionRoot");
}
var lt = class extends Error {
    name = "ArgExpansionBailout";
};
function Xp(e, t, r, n) {
    let { node: s } = e;
    return A(s, x.Dangling) ? m([
        r,
        j(e, t, {
            indent: !0
        }),
        F,
        n
    ]) : [
        r,
        n
    ];
}
function qt(e, t, r) {
    let { node: n } = e, s = [], u = n.type === "TupleExpression" ? "#[" : "[", i = "]", a = n.type === "TupleTypeAnnotation" && n.types ? "types" : n.type === "TSTupleType" || n.type === "TupleTypeAnnotation" ? "elementTypes" : "elements", o = n[a];
    if (o.length === 0) s.push(Xp(e, t, u, i));
    else {
        let p = w(!1, o, -1), D = (p == null ? void 0 : p.type) !== "RestElement", y = p === null, c = Symbol("array"), f = !t.__inJestEach && o.length > 1 && o.every((g, S, P)=>{
            let v = g == null ? void 0 : g.type;
            if (!G(g) && !se(g)) return !1;
            let M = P[S + 1];
            if (M && v !== M.type) return !1;
            let _ = G(g) ? "elements" : "properties";
            return g[_] && g[_].length > 1;
        }), l = ls(n, t), h = D ? y ? "," : ye(t) ? l ? B(",", "", {
            groupId: c
        }) : B(",") : "" : "";
        s.push(m([
            u,
            E([
                F,
                l ? $p(e, t, r, h) : [
                    Np(e, t, a, r),
                    h
                ],
                j(e, t)
            ]),
            F,
            i
        ], {
            shouldBreak: f,
            id: c
        }));
    }
    return s.push($(e), X(e, r)), s;
}
function ls(e, t) {
    return G(e) && e.elements.length > 1 && e.elements.every((r)=>r && (ke(r) || Un(r) && !A(r.argument)) && !A(r, x.Trailing | x.Line, (n)=>!Q(t.originalText, J(n), {
                backwards: !0
            })));
}
function Hu({ node: e }, { originalText: t }) {
    let r = (s)=>wt(t, vt(t, s)), n = (s)=>t[s] === "," ? s : n(r(s + 1));
    return _t(t, n(L(e)));
}
function Np(e, t, r, n) {
    let s = [];
    return e.each(({ node: u, isLast: i })=>{
        s.push(u ? m(n()) : ""), i || s.push([
            ",",
            T,
            u && Hu(e, t) ? F : ""
        ]);
    }, r), s;
}
function $p(e, t, r, n) {
    let s = [];
    return e.each(({ isLast: u, next: i })=>{
        s.push([
            r(),
            u ? n : ","
        ]), u || s.push(Hu(e, t) ? [
            C,
            C
        ] : A(i, x.Leading | x.Line) ? C : T);
    }, "elements"), Lt(s);
}
function Vp(e, t, r) {
    let { node: n } = e, s = ge(n);
    if (s.length === 0) return [
        "(",
        j(e, t),
        ")"
    ];
    if (zp(s)) return [
        "(",
        r([
            "arguments",
            0
        ]),
        ", ",
        r([
            "arguments",
            1
        ]),
        ")"
    ];
    let u = !1, i = s.length - 1, a = [];
    Mr(e, ({ node: c }, f)=>{
        let l = r();
        f === i || (fe(c, t) ? (u = !0, l = [
            l,
            ",",
            C,
            C
        ]) : l = [
            l,
            ",",
            T
        ]), a.push(l);
    });
    let p = !(n.type === "ImportExpression" || n.callee.type === "Import") && ye(t, "all") ? "," : "";
    function D() {
        return m([
            "(",
            E([
                T,
                ...a
            ]),
            p,
            T,
            ")"
        ], {
            shouldBreak: !0
        });
    }
    if (u || e.parent.type !== "Decorator" && hu(s)) return D();
    if (Hp(s)) {
        let c = a.slice(1);
        if (c.some(z)) return D();
        let f;
        try {
            f = r(Vn(n, 0), {
                expandFirstArg: !0
            });
        } catch (l) {
            if (l instanceof lt) return D();
            throw l;
        }
        return z(f) ? [
            le,
            Xe([
                [
                    "(",
                    m(f, {
                        shouldBreak: !0
                    }),
                    ", ",
                    ...c,
                    ")"
                ],
                D()
            ])
        ] : Xe([
            [
                "(",
                f,
                ", ",
                ...c,
                ")"
            ],
            [
                "(",
                m(f, {
                    shouldBreak: !0
                }),
                ", ",
                ...c,
                ")"
            ],
            D()
        ]);
    }
    if (Kp(s, a, t)) {
        let c = a.slice(0, -1);
        if (c.some(z)) return D();
        let f;
        try {
            f = r(Vn(n, -1), {
                expandLastArg: !0
            });
        } catch (l) {
            if (l instanceof lt) return D();
            throw l;
        }
        return z(f) ? [
            le,
            Xe([
                [
                    "(",
                    ...c,
                    m(f, {
                        shouldBreak: !0
                    }),
                    ")"
                ],
                D()
            ])
        ] : Xe([
            [
                "(",
                ...c,
                f,
                ")"
            ],
            [
                "(",
                ...c,
                m(f, {
                    shouldBreak: !0
                }),
                ")"
            ],
            D()
        ]);
    }
    let y = [
        "(",
        E([
            F,
            ...a
        ]),
        B(p),
        F,
        ")"
    ];
    return jr(e) ? y : m(y, {
        shouldBreak: a.some(z) || u
    });
}
function pr(e, t = !1) {
    return se(e) && (e.properties.length > 0 || A(e)) || G(e) && (e.elements.length > 0 || A(e)) || e.type === "TSTypeAssertion" && pr(e.expression) || Ae(e) && pr(e.expression) || e.type === "FunctionExpression" || e.type === "ArrowFunctionExpression" && (!e.returnType || !e.returnType.typeAnnotation || e.returnType.typeAnnotation.type !== "TSTypeReference" || Qp(e.body)) && (e.body.type === "BlockStatement" || e.body.type === "ArrowFunctionExpression" && pr(e.body, !0) || se(e.body) || G(e.body) || !t && (I(e.body) || e.body.type === "ConditionalExpression") || Y(e.body)) || e.type === "DoExpression" || e.type === "ModuleExpression";
}
function Kp(e, t, r) {
    var u, i;
    let n = w(!1, e, -1);
    if (e.length === 1) {
        let a = w(!1, t, -1);
        if ((u = a.label) != null && u.embed && ((i = a.label) == null ? void 0 : i.hug) !== !1) return !0;
    }
    let s = w(!1, e, -2);
    return !A(n, x.Leading) && !A(n, x.Trailing) && pr(n) && (!s || s.type !== n.type) && (e.length !== 2 || s.type !== "ArrowFunctionExpression" || !G(n)) && !(e.length > 1 && ls(n, r));
}
function Hp(e) {
    if (e.length !== 2) return !1;
    let [t, r] = e;
    return t.type === "ModuleExpression" && Zp(r) ? !0 : !A(t) && (t.type === "FunctionExpression" || t.type === "ArrowFunctionExpression" && t.body.type === "BlockStatement") && r.type !== "FunctionExpression" && r.type !== "ArrowFunctionExpression" && r.type !== "ConditionalExpression" && zu(r) && !pr(r);
}
function zu(e) {
    var t;
    if (e.type === "ParenthesizedExpression") return zu(e.expression);
    if (Ae(e) || e.type === "TypeCastExpression") {
        let { typeAnnotation: r } = e;
        return r.type === "TypeAnnotation" && (r = r.typeAnnotation), r.type === "TSArrayType" && (r = r.elementType, r.type === "TSArrayType" && (r = r.elementType)), (r.type === "GenericTypeAnnotation" || r.type === "TSTypeReference") && ((t = r.typeParameters) == null ? void 0 : t.params.length) === 1 && (r = r.typeParameters.params[0]), Rt(r) && Pe(e.expression, 1);
    }
    return pt(e) && ge(e).length > 1 ? !1 : me(e) ? Pe(e.left, 1) && Pe(e.right, 1) : Wn(e) || Pe(e);
}
function zp(e) {
    return e.length === 2 && e[0].type === "ArrowFunctionExpression" && V(e[0]).length === 0 && e[0].body.type === "BlockStatement" && e[1].type === "ArrayExpression" && !e.some((t)=>A(t));
}
function Qp(e) {
    return e.type === "BlockStatement" && (e.body.some((t)=>t.type !== "EmptyStatement") || A(e, x.Dangling));
}
function Zp(e) {
    return e.type === "ObjectExpression" && e.properties.length === 1 && Ce(e.properties[0]) && e.properties[0].key.type === "Identifier" && e.properties[0].key.name === "type" && ee(e.properties[0].value) && e.properties[0].value.value === "module";
}
var cr = Vp;
function Qu(e, t, r) {
    var p;
    let n = r("object"), s = ms(e, t, r), { node: u, parent: i } = e, a = e.findAncestor((D)=>!(R(D) || D.type === "TSNonNullExpression")), o = a && (a.type === "NewExpression" || a.type === "BindExpression" || a.type === "AssignmentExpression" && a.left.type !== "Identifier") || u.computed || u.object.type === "Identifier" && u.property.type === "Identifier" && !R(i) || (i.type === "AssignmentExpression" || i.type === "VariableDeclarator") && (I(u.object) && u.object.arguments.length > 0 || u.object.type === "TSNonNullExpression" && I(u.object.expression) && u.object.expression.arguments.length > 0 || ((p = n.label) == null ? void 0 : p.memberChain));
    return tt(n.label, [
        n,
        o ? s : m(E([
            F,
            s
        ]))
    ]);
}
function ms(e, t, r) {
    let n = r("property"), { node: s } = e, u = $(e);
    return s.computed ? !s.property || ke(s.property) ? [
        u,
        "[",
        n,
        "]"
    ] : m([
        u,
        "[",
        E([
            F,
            n
        ]),
        F,
        "]"
    ]) : [
        u,
        ".",
        n
    ];
}
function ec(e, t, r) {
    let { parent: n } = e, s = !n || n.type === "ExpressionStatement", u = [];
    function i(O) {
        let { originalText: W } = t, ne = ct(W, L(O));
        return W.charAt(ne) === ")" ? ne !== !1 && _t(W, ne + 1) : fe(O, t);
    }
    function a(O) {
        let { node: W } = O;
        I(W) && (Ct(W.callee) || I(W.callee)) ? (u.unshift({
            node: W,
            printed: [
                ce(O, [
                    $(O),
                    Ke(O, t, r),
                    cr(O, t, r)
                ], t),
                i(W) ? C : ""
            ]
        }), O.call((ne)=>a(ne), "callee")) : Ct(W) ? (u.unshift({
            node: W,
            needsParens: he(O, t),
            printed: ce(O, R(W) ? ms(O, t, r) : Ur(O, t, r), t)
        }), O.call((ne)=>a(ne), "object")) : W.type === "TSNonNullExpression" ? (u.unshift({
            node: W,
            printed: ce(O, "!", t)
        }), O.call((ne)=>a(ne), "expression")) : u.unshift({
            node: W,
            printed: r()
        });
    }
    let { node: o } = e;
    u.unshift({
        node: o,
        printed: [
            $(e),
            Ke(e, t, r),
            cr(e, t, r)
        ]
    }), o.callee && e.call((O)=>a(O), "callee");
    let p = [], D = [
        u[0]
    ], y = 1;
    for(; y < u.length && (u[y].node.type === "TSNonNullExpression" || I(u[y].node) || R(u[y].node) && u[y].node.computed && ke(u[y].node.property)); ++y)D.push(u[y]);
    if (!I(u[0].node)) for(; y + 1 < u.length && Ct(u[y].node) && Ct(u[y + 1].node); ++y)D.push(u[y]);
    p.push(D), D = [];
    let c = !1;
    for(; y < u.length; ++y){
        if (c && Ct(u[y].node)) {
            if (u[y].node.computed && ke(u[y].node.property)) {
                D.push(u[y]);
                continue;
            }
            p.push(D), D = [], c = !1;
        }
        (I(u[y].node) || u[y].node.type === "ImportExpression") && (c = !0), D.push(u[y]), A(u[y].node, x.Trailing) && (p.push(D), D = [], c = !1);
    }
    D.length > 0 && p.push(D);
    function f(O) {
        return /^[A-Z]|^[$_]+$/.test(O);
    }
    function l(O) {
        return O.length <= t.tabWidth;
    }
    function h(O) {
        var st;
        let W = (st = O[1][0]) == null ? void 0 : st.node.computed;
        if (O[0].length === 1) {
            let xt = O[0][0].node;
            return xt.type === "ThisExpression" || xt.type === "Identifier" && (f(xt.name) || s && l(xt.name) || W);
        }
        let ne = w(!1, O[0], -1).node;
        return R(ne) && ne.property.type === "Identifier" && (f(ne.property.name) || W);
    }
    let g = p.length >= 2 && !A(p[1][0].node) && h(p);
    function S(O) {
        let W = O.map((ne)=>ne.printed);
        return O.length > 0 && w(!1, O, -1).needsParens ? [
            "(",
            ...W,
            ")"
        ] : W;
    }
    function P(O) {
        return O.length === 0 ? "" : E(m([
            C,
            b(C, O.map(S))
        ]));
    }
    let v = p.map(S), M = v, _ = g ? 3 : 2, d = p.flat(), U = d.slice(1, -1).some((O)=>A(O.node, x.Leading)) || d.slice(0, -1).some((O)=>A(O.node, x.Trailing)) || p[_] && A(p[_][0].node, x.Leading);
    if (p.length <= _ && !U) return jr(e) ? M : m(M);
    let Ee = w(!1, p[g ? 1 : 0], -1).node, N = !I(Ee) && i(Ee), ue = [
        S(p[0]),
        g ? p.slice(1, 2).map(S) : "",
        N ? C : "",
        P(p.slice(g ? 2 : 1))
    ], H = u.map(({ node: O })=>O).filter(I);
    function It() {
        let O = w(!1, w(!1, p, -1), -1).node, W = w(!1, v, -1);
        return I(O) && z(W) && H.slice(0, -1).some((ne)=>ne.arguments.some(jt));
    }
    let Nt;
    return U || H.length > 2 && H.some((O)=>!O.arguments.every((W)=>Pe(W))) || v.slice(0, -1).some(z) || It() ? Nt = m(ue) : Nt = [
        z(M) || N ? le : "",
        Xe([
            M,
            ue
        ])
    ], tt({
        memberChain: !0
    }, Nt);
}
var Zu = ec;
function Wr(e, t, r) {
    var y;
    let { node: n, parent: s } = e, u = n.type === "NewExpression", i = n.type === "ImportExpression", a = $(e), o = ge(n), p = o.length === 1 && vr(o[0], t.originalText);
    if (p || o.length > 0 && !u && !i && (rc(n, s) || gt(n, s))) {
        let c = [];
        if (Mr(e, ()=>{
            c.push(r());
        }), !(p && (y = c[0].label) != null && y.embed)) return [
            u ? "new " : "",
            r("callee"),
            a,
            Ke(e, t, r),
            "(",
            b(", ", c),
            ")"
        ];
    }
    if (!i && !u && Ct(n.callee) && !e.call((c)=>he(c, t), "callee")) return Zu(e, t, r);
    let D = [
        u ? "new " : "",
        i ? tc(n) : r("callee"),
        a,
        Ke(e, t, r),
        cr(e, t, r)
    ];
    return i || I(n.callee) ? m(D) : D;
}
function tc(e) {
    return e.phase ? `import.${e.phase}` : "import";
}
function rc(e, t) {
    if (e.callee.type !== "Identifier") return !1;
    if (e.callee.name === "require") {
        let r = ge(e);
        return r.length === 1 && ee(r[0]) || r.length > 1;
    }
    if (e.callee.name === "define") {
        let r = ge(e);
        return t.type === "ExpressionStatement" && (r.length === 1 || r.length === 2 && r[0].type === "ArrayExpression" || r.length === 3 && ee(r[0]) && r[1].type === "ArrayExpression");
    }
    return !1;
}
function At(e, t, r, n, s, u) {
    let i = nc(e, t, r, n, u), a = u ? r(u, {
        assignmentLayout: i
    }) : "";
    switch(i){
        case "break-after-operator":
            return m([
                m(n),
                s,
                m(E([
                    T,
                    a
                ]))
            ]);
        case "never-break-after-operator":
            return m([
                m(n),
                s,
                " ",
                a
            ]);
        case "fluid":
            {
                let o = Symbol("assignment");
                return m([
                    m(n),
                    s,
                    m(E(T), {
                        id: o
                    }),
                    Be,
                    Et(a, {
                        groupId: o
                    })
                ]);
            }
        case "break-lhs":
            return m([
                n,
                s,
                " ",
                m(a)
            ]);
        case "chain":
            return [
                m(n),
                s,
                T,
                a
            ];
        case "chain-tail":
            return [
                m(n),
                s,
                E([
                    T,
                    a
                ])
            ];
        case "chain-tail-arrow-chain":
            return [
                m(n),
                s,
                a
            ];
        case "only-left":
            return n;
    }
}
function ti(e, t, r) {
    let { node: n } = e;
    return At(e, t, r, r("left"), [
        " ",
        n.operator
    ], "right");
}
function ri(e, t, r) {
    return At(e, t, r, r("id"), " =", "init");
}
function nc(e, t, r, n, s) {
    let { node: u } = e, i = u[s];
    if (!i) return "only-left";
    let a = !Gr(i);
    if (e.match(Gr, ni, (c)=>!a || c.type !== "ExpressionStatement" && c.type !== "VariableDeclaration")) return a ? i.type === "ArrowFunctionExpression" && i.body.type === "ArrowFunctionExpression" ? "chain-tail-arrow-chain" : "chain-tail" : "chain";
    if (!a && Gr(i.right) || ve(t.originalText, i)) return "break-after-operator";
    if (i.type === "CallExpression" && i.callee.name === "require" || t.parser === "json5" || t.parser === "json") return "never-break-after-operator";
    let D = eu(n);
    if (uc(u) || ic(u) || pc(u) || Ds(u) && D) return "break-lhs";
    let y = lc(u, n, t);
    return e.call(()=>sc(e, t, r, y), s) ? "break-after-operator" : !D && (y || i.type === "TemplateLiteral" || i.type === "TaggedTemplateExpression" || i.type === "BooleanLiteral" || ke(i) || i.type === "ClassExpression") ? "never-break-after-operator" : "fluid";
}
function sc(e, t, r, n) {
    let s = e.node;
    if (me(s) && !Jt(s)) return !0;
    switch(s.type){
        case "StringLiteralTypeAnnotation":
        case "SequenceExpression":
            return !0;
        case "TSConditionalType":
        case "ConditionalTypeAnnotation":
            if (!t.experimentalTernaries) break;
            return !0;
        case "ConditionalExpression":
            {
                if (!t.experimentalTernaries) {
                    let { test: p } = s;
                    return me(p) && !Jt(p);
                }
                let { consequent: a, alternate: o } = s;
                return a.type === "ConditionalExpression" || o.type === "ConditionalExpression";
            }
        case "ClassExpression":
            return k(s.decorators);
    }
    if (n) return !1;
    let u = s, i = [];
    for(;;)if (u.type === "UnaryExpression" || u.type === "AwaitExpression" || u.type === "YieldExpression" && u.argument !== null) u = u.argument, i.push("argument");
    else if (u.type === "TSNonNullExpression") u = u.expression, i.push("expression");
    else break;
    return !!(ee(u) || e.call(()=>si(e, t, r), ...i));
}
function uc(e) {
    if (ni(e)) {
        let t = e.left || e.id;
        return t.type === "ObjectPattern" && t.properties.length > 2 && t.properties.some((r)=>{
            var n;
            return Ce(r) && (!r.shorthand || ((n = r.value) == null ? void 0 : n.type) === "AssignmentPattern");
        });
    }
    return !1;
}
function Gr(e) {
    return e.type === "AssignmentExpression";
}
function ni(e) {
    return Gr(e) || e.type === "VariableDeclarator";
}
function ic(e) {
    let t = oc(e);
    if (k(t)) {
        let r = e.type === "TSTypeAliasDeclaration" ? "constraint" : "bound";
        if (t.length > 1 && t.some((n)=>n[r] || n.default)) return !0;
    }
    return !1;
}
var ac = q([
    "TSTypeAliasDeclaration",
    "TypeAlias"
]);
function oc(e) {
    var t;
    if (ac(e)) return (t = e.typeParameters) == null ? void 0 : t.params;
}
function pc(e) {
    if (e.type !== "VariableDeclarator") return !1;
    let { typeAnnotation: t } = e.id;
    if (!t || !t.typeAnnotation) return !1;
    let r = ei(t.typeAnnotation);
    return k(r) && r.length > 1 && r.some((n)=>k(ei(n)) || n.type === "TSConditionalType");
}
function Ds(e) {
    var t;
    return e.type === "VariableDeclarator" && ((t = e.init) == null ? void 0 : t.type) === "ArrowFunctionExpression";
}
var cc = q([
    "TSTypeReference",
    "GenericTypeAnnotation"
]);
function ei(e) {
    var t;
    if (cc(e)) return (t = e.typeParameters) == null ? void 0 : t.params;
}
function si(e, t, r, n = !1) {
    var i;
    let { node: s } = e, u = ()=>si(e, t, r, !0);
    if (s.type === "ChainExpression" || s.type === "TSNonNullExpression") return e.call(u, "expression");
    if (I(s)) {
        if ((i = Wr(e, t, r).label) != null && i.memberChain) return !1;
        let o = ge(s);
        return !(o.length === 0 || o.length === 1 && nr(o[0], t)) || mc(s, r) ? !1 : e.call(u, "callee");
    }
    return R(s) ? e.call(u, "object") : n && (s.type === "Identifier" || s.type === "ThisExpression");
}
function lc(e, t, r) {
    if (!Ce(e)) return !1;
    t = Ot(t);
    let n = 3;
    return typeof t == "string" && rt(t) < r.tabWidth + n;
}
function mc(e, t) {
    let r = Dc(e);
    if (k(r)) {
        if (r.length > 1) return !0;
        if (r.length === 1) {
            let s = r[0];
            if (s.type === "TSUnionType" || s.type === "UnionTypeAnnotation" || s.type === "TSIntersectionType" || s.type === "IntersectionTypeAnnotation" || s.type === "TSTypeLiteral" || s.type === "ObjectTypeAnnotation") return !0;
        }
        let n = e.typeParameters ? "typeParameters" : "typeArguments";
        if (z(t(n))) return !0;
    }
    return !1;
}
function Dc(e) {
    var t;
    return (t = e.typeParameters ?? e.typeArguments) == null ? void 0 : t.params;
}
function mt(e, t, r, n, s) {
    let u = e.node, i = V(u), a = s ? Ke(e, r, t) : "";
    if (i.length === 0) return [
        a,
        "(",
        j(e, r, {
            filter: (l)=>Ve(r.originalText, L(l)) === ")"
        }),
        ")"
    ];
    let { parent: o } = e, p = gt(o), D = ys(u), y = [];
    if (Pu(e, (l, h)=>{
        let g = h === i.length - 1;
        g && u.rest && y.push("..."), y.push(t()), !g && (y.push(","), p || D ? y.push(" ") : fe(i[h], r) ? y.push(C, C) : y.push(T));
    }), n && !fc(e)) {
        if (z(a) || z(y)) throw new lt;
        return m([
            Kt(a),
            "(",
            Kt(y),
            ")"
        ]);
    }
    let c = i.every((l)=>!k(l.decorators));
    return D && c ? [
        a,
        "(",
        ...y,
        ")"
    ] : p ? [
        a,
        "(",
        ...y,
        ")"
    ] : (wr(o) || Tu(o) || o.type === "TypeAlias" || o.type === "UnionTypeAnnotation" || o.type === "TSUnionType" || o.type === "IntersectionTypeAnnotation" || o.type === "FunctionTypeAnnotation" && o.returnType === u) && i.length === 1 && i[0].name === null && u.this !== i[0] && i[0].typeAnnotation && u.typeParameters === null && Rt(i[0].typeAnnotation) && !u.rest ? r.arrowParens === "always" ? [
        "(",
        ...y,
        ")"
    ] : y : [
        a,
        "(",
        E([
            F,
            ...y
        ]),
        B(!bu(u) && ye(r, "all") ? "," : ""),
        F,
        ")"
    ];
}
function ys(e) {
    if (!e) return !1;
    let t = V(e);
    if (t.length !== 1) return !1;
    let [r] = t;
    return !A(r) && (r.type === "ObjectPattern" || r.type === "ArrayPattern" || r.type === "Identifier" && r.typeAnnotation && (r.typeAnnotation.type === "TypeAnnotation" || r.typeAnnotation.type === "TSTypeAnnotation") && we(r.typeAnnotation.typeAnnotation) || r.type === "FunctionTypeParam" && we(r.typeAnnotation) && r !== e.rest || r.type === "AssignmentPattern" && (r.left.type === "ObjectPattern" || r.left.type === "ArrayPattern") && (r.right.type === "Identifier" || se(r.right) && r.right.properties.length === 0 || G(r.right) && r.right.elements.length === 0));
}
function yc(e) {
    let t;
    return e.returnType ? (t = e.returnType, t.typeAnnotation && (t = t.typeAnnotation)) : e.typeAnnotation && (t = e.typeAnnotation), t;
}
function Bt(e, t) {
    var s;
    let r = yc(e);
    if (!r) return !1;
    let n = (s = e.typeParameters) == null ? void 0 : s.params;
    if (n) {
        if (n.length > 1) return !1;
        if (n.length === 1) {
            let u = n[0];
            if (u.constraint || u.default) return !1;
        }
    }
    return V(e).length === 1 && (we(r) || z(t));
}
function fc(e) {
    return e.match((t)=>t.type === "ArrowFunctionExpression" && t.body.type === "BlockStatement", (t, r)=>{
        if (t.type === "CallExpression" && r === "arguments" && t.arguments.length === 1 && t.callee.type === "CallExpression") {
            let n = t.callee.callee;
            return n.type === "Identifier" || n.type === "MemberExpression" && !n.computed && n.object.type === "Identifier" && n.property.type === "Identifier";
        }
        return !1;
    }, (t, r)=>t.type === "VariableDeclarator" && r === "init" || t.type === "ExportDefaultDeclaration" && r === "declaration" || t.type === "TSExportAssignment" && r === "expression" || t.type === "AssignmentExpression" && r === "right" && t.left.type === "MemberExpression" && t.left.object.type === "Identifier" && t.left.object.name === "module" && t.left.property.type === "Identifier" && t.left.property.name === "exports", (t)=>t.type !== "VariableDeclaration" || t.kind === "const" && t.declarations.length === 1);
}
function ui(e) {
    let t = V(e);
    return t.length > 1 && t.some((r)=>r.type === "TSParameterProperty");
}
function fs(e) {
    if (Rt(e) || we(e)) return !0;
    if (e.type === "UnionTypeAnnotation" || e.type === "TSUnionType") {
        let t = e.types.filter((s)=>s.type === "VoidTypeAnnotation" || s.type === "TSVoidKeyword" || s.type === "NullLiteralTypeAnnotation" || s.type === "TSNullKeyword").length, r = e.types.some((s)=>s.type === "ObjectTypeAnnotation" || s.type === "TSTypeLiteral" || s.type === "GenericTypeAnnotation" || s.type === "TSTypeReference"), n = e.types.some((s)=>A(s));
        if (e.types.length - 1 === t && r && !n) return !0;
    }
    return !1;
}
function ii(e, t, r) {
    let n = t.semi ? ";" : "", { node: s } = e, u = [
        re(e),
        "opaque type ",
        r("id"),
        r("typeParameters")
    ];
    return s.supertype && u.push(": ", r("supertype")), s.impltype && u.push(" = ", r("impltype")), u.push(n), u;
}
function Yr(e, t, r) {
    let n = t.semi ? ";" : "", { node: s } = e, u = [
        re(e)
    ];
    u.push("type ", r("id"), r("typeParameters"));
    let i = s.type === "TSTypeAliasDeclaration" ? "typeAnnotation" : "right";
    return [
        At(e, t, r, u, " =", i),
        n
    ];
}
function Xr(e, t, r) {
    let n = !1;
    return m(e.map(({ isFirst: s, previous: u, node: i, index: a })=>{
        let o = r();
        if (s) return o;
        let p = we(i), D = we(u);
        return D && p ? [
            " & ",
            n ? E(o) : o
        ] : !D && !p ? E([
            " &",
            T,
            o
        ]) : (a > 1 && (n = !0), [
            " & ",
            a > 1 ? E(o) : o
        ]);
    }, "types"));
}
function Nr(e, t, r) {
    let { node: n } = e, { parent: s } = e, u = s.type !== "TypeParameterInstantiation" && (s.type !== "TSConditionalType" || !t.experimentalTernaries) && (s.type !== "ConditionalTypeAnnotation" || !t.experimentalTernaries) && s.type !== "TSTypeParameterInstantiation" && s.type !== "GenericTypeAnnotation" && s.type !== "TSTypeReference" && s.type !== "TSTypeAssertion" && s.type !== "TupleTypeAnnotation" && s.type !== "TSTupleType" && !(s.type === "FunctionTypeParam" && !s.name && e.grandparent.this !== s) && !((s.type === "TypeAlias" || s.type === "VariableDeclarator" || s.type === "TSTypeAliasDeclaration") && ve(t.originalText, n)), i = fs(n), a = e.map((D)=>{
        let y = r();
        return i || (y = xe(2, y)), ce(D, y, t);
    }, "types");
    if (i) return b(" | ", a);
    let o = u && !ve(t.originalText, n), p = [
        B([
            o ? T : "",
            "| "
        ]),
        b([
            T,
            "| "
        ], a)
    ];
    return he(e, t) ? m([
        E(p),
        F
    ]) : (s.type === "TupleTypeAnnotation" || s.type === "TSTupleType") && s[s.type === "TupleTypeAnnotation" && s.types ? "types" : "elementTypes"].length > 1 ? m([
        E([
            B([
                "(",
                F
            ]),
            p
        ]),
        F,
        B(")")
    ]) : m(u ? E(p) : p);
}
function Ec(e) {
    var n;
    let { node: t, parent: r } = e;
    return t.type === "FunctionTypeAnnotation" && (wr(r) || !((r.type === "ObjectTypeProperty" || r.type === "ObjectTypeInternalSlot") && !r.variance && !r.optional && Ft(r, t) || r.type === "ObjectTypeCallProperty" || ((n = e.getParentNode(2)) == null ? void 0 : n.type) === "DeclareFunction"));
}
function $r(e, t, r) {
    let { node: n } = e, s = [
        Ut(e)
    ];
    (n.type === "TSConstructorType" || n.type === "TSConstructSignatureDeclaration") && s.push("new ");
    let u = mt(e, r, t, !1, !0), i = [];
    return n.type === "FunctionTypeAnnotation" ? i.push(Ec(e) ? " => " : ": ", r("returnType")) : i.push(X(e, r, n.returnType ? "returnType" : "typeAnnotation")), Bt(n, i) && (u = m(u)), s.push(u, i), m(s);
}
function Vr(e, t, r) {
    return [
        r("objectType"),
        $(e),
        "[",
        r("indexType"),
        "]"
    ];
}
function Kr(e, t, r) {
    return [
        "infer ",
        r("typeParameter")
    ];
}
function Es(e, t, r) {
    let { node: n } = e;
    return [
        n.postfix ? "" : r,
        X(e, t),
        n.postfix ? r : ""
    ];
}
function Hr(e, t, r) {
    let { node: n } = e;
    return [
        "...",
        ...n.type === "TupleTypeSpreadElement" && n.label ? [
            r("label"),
            ": "
        ] : [],
        r("typeAnnotation")
    ];
}
function zr(e, t, r) {
    let { node: n } = e;
    return [
        n.variance ? r("variance") : "",
        r("label"),
        n.optional ? "?" : "",
        ": ",
        r("elementType")
    ];
}
var Fc = new WeakSet;
function X(e, t, r = "typeAnnotation") {
    let { node: { [r]: n } } = e;
    if (!n) return "";
    let s = !1;
    if (n.type === "TSTypeAnnotation" || n.type === "TypeAnnotation") {
        let u = e.call(ai, r);
        (u === "=>" || u === ":" && A(n, x.Leading)) && (s = !0), Fc.add(n);
    }
    return s ? [
        " ",
        t(r)
    ] : t(r);
}
var ai = (e)=>e.match((t)=>t.type === "TSTypeAnnotation", (t, r)=>(r === "returnType" || r === "typeAnnotation") && (t.type === "TSFunctionType" || t.type === "TSConstructorType")) ? "=>" : e.match((t)=>t.type === "TSTypeAnnotation", (t, r)=>r === "typeAnnotation" && (t.type === "TSJSDocNullableType" || t.type === "TSJSDocNonNullableType" || t.type === "TSTypePredicate")) || e.match((t)=>t.type === "TypeAnnotation", (t, r)=>r === "typeAnnotation" && t.type === "Identifier", (t, r)=>r === "id" && t.type === "DeclareFunction") || e.match((t)=>t.type === "TypeAnnotation", (t, r)=>r === "bound" && t.type === "TypeParameter" && t.usesExtendsBound) ? "" : ":";
function Qr(e, t, r) {
    let n = ai(e);
    return n ? [
        n,
        " ",
        r("typeAnnotation")
    ] : r("typeAnnotation");
}
function Zr(e) {
    return [
        e("elementType"),
        "[]"
    ];
}
function en({ node: e }, t) {
    let r = e.type === "TSTypeQuery" ? "exprName" : "argument", n = e.type === "TSTypeQuery" ? "typeParameters" : "typeArguments";
    return [
        "typeof ",
        t(r),
        t(n)
    ];
}
function tn(e, t) {
    let { node: r } = e;
    return [
        r.asserts ? "asserts " : "",
        t("parameterName"),
        r.typeAnnotation ? [
            " is ",
            X(e, t)
        ] : ""
    ];
}
function $(e) {
    let { node: t } = e;
    return !t.optional || t.type === "Identifier" && t === e.parent.key ? "" : I(t) || R(t) && t.computed || t.type === "OptionalIndexedAccessType" ? "?." : "?";
}
function rn(e) {
    return e.node.definite || e.match(void 0, (t, r)=>r === "id" && t.type === "VariableDeclarator" && t.definite) ? "!" : "";
}
var Cc = new Set([
    "DeclareClass",
    "DeclareFunction",
    "DeclareVariable",
    "DeclareExportDeclaration",
    "DeclareExportAllDeclaration",
    "DeclareOpaqueType",
    "DeclareTypeAlias",
    "DeclareEnum",
    "DeclareInterface"
]);
function re(e) {
    let { node: t } = e;
    return t.declare || Cc.has(t.type) && e.parent.type !== "DeclareExportDeclaration" ? "declare " : "";
}
var Ac = new Set([
    "TSAbstractMethodDefinition",
    "TSAbstractPropertyDefinition",
    "TSAbstractAccessorProperty"
]);
function Ut({ node: e }) {
    return e.abstract || Ac.has(e.type) ? "abstract " : "";
}
function Ke(e, t, r) {
    let n = e.node;
    return n.typeArguments ? r("typeArguments") : n.typeParameters ? r("typeParameters") : "";
}
function Ur(e, t, r) {
    return [
        "::",
        r("callee")
    ];
}
function Dt(e, t, r) {
    return e.type === "EmptyStatement" ? ";" : e.type === "BlockStatement" || r ? [
        " ",
        t
    ] : E([
        T,
        t
    ]);
}
function nn(e, t) {
    return [
        "...",
        t("argument"),
        X(e, t)
    ];
}
function Wt(e) {
    return e.accessibility ? e.accessibility + " " : "";
}
var oi = new Proxy(()=>{}, {
    get: ()=>oi
}), sn = oi;
function Fs(e, t, r) {
    let { node: n } = e;
    return m([
        b(T, e.map(r, "decorators")),
        li(n, t) ? C : T
    ]);
}
function pi(e, t, r) {
    return mi(e.node) ? [
        b(C, e.map(r, "declaration", "decorators")),
        C
    ] : "";
}
function ci(e, t, r) {
    let { node: n, parent: s } = e, { decorators: u } = n;
    if (!k(u) || mi(s) || Jr(e)) return "";
    let i = n.type === "ClassExpression" || n.type === "ClassDeclaration" || li(n, t);
    return [
        e.key === "declaration" && Cu(s) ? C : i ? le : "",
        b(T, e.map(r, "decorators")),
        T
    ];
}
function li(e, t) {
    return e.decorators.some((r)=>Q(t.originalText, L(r)));
}
function mi(e) {
    var r;
    if (e.type !== "ExportDefaultDeclaration" && e.type !== "ExportNamedDeclaration" && e.type !== "DeclareExportDeclaration") return !1;
    let t = (r = e.declaration) == null ? void 0 : r.decorators;
    return k(t) && Ft(e, t[0]);
}
function Di(e, t, r) {
    let { node: n } = e;
    return [
        "import",
        n.module ? " module" : "",
        n.phase ? ` ${n.phase}` : "",
        As(n),
        Ei(e, t, r),
        fi(e, t, r),
        Ci(e, t, r),
        t.semi ? ";" : ""
    ];
}
var yi = (e)=>e.type === "ExportDefaultDeclaration" || e.type === "DeclareExportDeclaration" && e.default;
function un(e, t, r) {
    let { node: n } = e, s = [
        pi(e, t, r),
        re(e),
        "export",
        yi(n) ? " default" : ""
    ], { declaration: u, exported: i } = n;
    return A(n, x.Dangling) && (s.push(" ", j(e, t)), _r(n) && s.push(C)), u ? s.push(" ", r("declaration")) : (s.push(xc(n)), n.type === "ExportAllDeclaration" || n.type === "DeclareExportAllDeclaration" ? (s.push(" *"), i && s.push(" as ", r("exported"))) : s.push(Ei(e, t, r)), s.push(fi(e, t, r), Ci(e, t, r))), s.push(dc(n, t)), s;
}
var Tc = q([
    "ClassDeclaration",
    "FunctionDeclaration",
    "TSInterfaceDeclaration",
    "DeclareClass",
    "DeclareFunction",
    "TSDeclareFunction",
    "EnumDeclaration"
]);
function dc(e, t) {
    return t.semi && (!e.declaration || yi(e) && !Tc(e.declaration)) ? ";" : "";
}
function Cs(e, t = !0) {
    return e && e !== "value" ? `${t ? " " : ""}${e}${t ? "" : " "}` : "";
}
function As(e, t) {
    return Cs(e.importKind, t);
}
function xc(e) {
    return Cs(e.exportKind);
}
function fi(e, t, r) {
    let { node: n } = e;
    if (!n.source) return "";
    let s = [];
    return Fi(n, t) && s.push(" from"), s.push(" ", r("source")), s;
}
function Ei(e, t, r) {
    let { node: n } = e;
    if (!Fi(n, t)) return "";
    let s = [
        " "
    ];
    if (k(n.specifiers)) {
        let u = [], i = [];
        e.each(()=>{
            let a = e.node.type;
            if (a === "ExportNamespaceSpecifier" || a === "ExportDefaultSpecifier" || a === "ImportNamespaceSpecifier" || a === "ImportDefaultSpecifier") u.push(r());
            else if (a === "ExportSpecifier" || a === "ImportSpecifier") i.push(r());
            else throw new _e(n, "specifier");
        }, "specifiers"), s.push(b(", ", u)), i.length > 0 && (u.length > 0 && s.push(", "), i.length > 1 || u.length > 0 || n.specifiers.some((o)=>A(o)) ? s.push(m([
            "{",
            E([
                t.bracketSpacing ? T : F,
                b([
                    ",",
                    T
                ], i)
            ]),
            B(ye(t) ? "," : ""),
            t.bracketSpacing ? T : F,
            "}"
        ])) : s.push([
            "{",
            t.bracketSpacing ? " " : "",
            ...i,
            t.bracketSpacing ? " " : "",
            "}"
        ]));
    } else s.push("{}");
    return s;
}
function Fi(e, t) {
    return e.type !== "ImportDeclaration" || k(e.specifiers) || e.importKind === "type" ? !0 : Ts(t, J(e), J(e.source)).trimEnd().endsWith("from");
}
function gc(e, t) {
    if (!e.source) return !1;
    if (k(e.attributes)) return !0;
    let r = Ts(t, L(e.source), L(e)).trimStart();
    return r.startsWith("with") || r.startsWith("assert");
}
function Ts(e, t, r) {
    let n = e.originalText.slice(t, r);
    for (let s of e[Symbol.for("comments")]){
        let u = J(s);
        if (u > r) break;
        let i = L(s);
        if (i < t) continue;
        let a = i - u;
        n = n.slice(0, u - t) + " ".repeat(a) + n.slice(i - t);
    }
    return n;
}
function hc(e, t) {
    var n, s;
    return (n = e.extra) != null && n.deprecatedAssertSyntax || Ts(t, L(e.source), (s = e.attributes) != null && s[0] ? J(e.attributes[0]) : L(e)).trimStart().startsWith("assert") ? "assert" : "with";
}
function Ci(e, t, r) {
    let { node: n } = e;
    if (!gc(n, t)) return "";
    let u = [
        ` ${hc(n, t)} {`
    ];
    return k(n.attributes) && (t.bracketSpacing && u.push(" "), u.push(b(", ", e.map(r, "attributes"))), t.bracketSpacing && u.push(" ")), u.push("}"), u;
}
function Ai(e, t, r) {
    let { node: n } = e, { type: s } = n, u = s.startsWith("Import"), i = u ? "imported" : "local", a = u ? "local" : "exported", o = n[i], p = n[a], D = "", y = "";
    return s === "ExportNamespaceSpecifier" || s === "ImportNamespaceSpecifier" ? D = "*" : o && (D = r(i)), p && !Sc(n) && (y = r(a)), [
        Cs(s === "ImportSpecifier" ? n.importKind : n.exportKind, !1),
        D,
        D && y ? " as " : "",
        y
    ];
}
function Sc(e) {
    if (e.type !== "ImportSpecifier" && e.type !== "ExportSpecifier") return !1;
    let { local: t, [e.type === "ImportSpecifier" ? "imported" : "exported"]: r } = e;
    if (t.type !== r.type || !cu(t, r)) return !1;
    if (ee(t)) return t.value === r.value && De(t) === De(r);
    switch(t.type){
        case "Identifier":
            return t.name === r.name;
        default:
            return !1;
    }
}
function Bc(e) {
    let t = [
        e
    ];
    for(let r = 0; r < t.length; r++){
        let n = t[r];
        for (let s of [
            "test",
            "consequent",
            "alternate"
        ]){
            let u = n[s];
            if (Y(u)) return !0;
            u.type === "ConditionalExpression" && t.push(u);
        }
    }
    return !1;
}
function bc(e, t, r) {
    let { node: n } = e, s = n.type === "ConditionalExpression", u = s ? "alternate" : "falseType", { parent: i } = e, a = s ? r("test") : [
        r("checkType"),
        " ",
        "extends",
        " ",
        r("extendsType")
    ];
    return i.type === n.type && i[u] === n ? xe(2, a) : a;
}
var Pc = new Map([
    [
        "AssignmentExpression",
        "right"
    ],
    [
        "VariableDeclarator",
        "init"
    ],
    [
        "ReturnStatement",
        "argument"
    ],
    [
        "ThrowStatement",
        "argument"
    ],
    [
        "UnaryExpression",
        "argument"
    ],
    [
        "YieldExpression",
        "argument"
    ]
]);
function kc(e) {
    let { node: t } = e;
    if (t.type !== "ConditionalExpression") return !1;
    let r, n = t;
    for(let s = 0; !r; s++){
        let u = e.getParentNode(s);
        if (u.type === "ChainExpression" && u.expression === n || I(u) && u.callee === n || R(u) && u.object === n || u.type === "TSNonNullExpression" && u.expression === n) {
            n = u;
            continue;
        }
        u.type === "NewExpression" && u.callee === n || Ae(u) && u.expression === n ? (r = e.getParentNode(s + 1), n = u) : r = u;
    }
    return n === t ? !1 : r[Pc.get(r.type)] === n;
}
function Ti(e, t, r) {
    let { node: n } = e, s = n.type === "ConditionalExpression", u = s ? "consequent" : "trueType", i = s ? "alternate" : "falseType", a = s ? [
        "test"
    ] : [
        "checkType",
        "extendsType"
    ], o = n[u], p = n[i], D = [], y = !1, { parent: c } = e, f = c.type === n.type && a.some((N)=>c[N] === n), l = c.type === n.type && !f, h, g, S = 0;
    do g = h || n, h = e.getParentNode(S), S++;
    while (h && h.type === n.type && a.every((N)=>h[N] !== g));
    let P = h || c, v = g;
    if (s && (Y(n[a[0]]) || Y(o) || Y(p) || Bc(v))) {
        y = !0, l = !0;
        let N = (H)=>[
                B("("),
                E([
                    F,
                    H
                ]),
                F,
                B(")")
            ], ue = (H)=>H.type === "NullLiteral" || H.type === "Literal" && H.value === null || H.type === "Identifier" && H.name === "undefined";
        D.push(" ? ", ue(o) ? r(u) : N(r(u)), " : ", p.type === n.type || ue(p) ? r(i) : N(r(i)));
    } else {
        let N = (H)=>t.useTabs ? E(r(H)) : xe(2, r(H)), ue = [
            T,
            "? ",
            o.type === n.type ? B("", "(") : "",
            N(u),
            o.type === n.type ? B("", ")") : "",
            T,
            ": ",
            N(i)
        ];
        D.push(c.type !== n.type || c[i] === n || f ? ue : t.useTabs ? dr(E(ue)) : xe(Math.max(0, t.tabWidth - 2), ue));
    }
    let M = [
        u,
        i,
        ...a
    ].some((N)=>A(n[N], (ue)=>Z(ue) && Ie(t.originalText, J(ue), L(ue)))), _ = (N)=>c === P ? m(N, {
            shouldBreak: M
        }) : M ? [
            N,
            le
        ] : N, d = !y && (R(c) || c.type === "NGPipeExpression" && c.left === n) && !c.computed, U = kc(e), Ee = _([
        bc(e, t, r),
        l ? D : E(D),
        s && d && !U ? F : ""
    ]);
    return f || U ? m([
        E([
            F,
            Ee
        ]),
        F
    ]) : Ee;
}
function Ic(e, t) {
    return (R(t) || t.type === "NGPipeExpression" && t.left === e) && !t.computed;
}
function Lc(e, t, r, n) {
    return [
        ...e.map((u)=>ot(u)),
        ot(t),
        ot(r)
    ].flat().some((u)=>Z(u) && Ie(n.originalText, J(u), L(u)));
}
var Oc = new Map([
    [
        "AssignmentExpression",
        "right"
    ],
    [
        "VariableDeclarator",
        "init"
    ],
    [
        "ReturnStatement",
        "argument"
    ],
    [
        "ThrowStatement",
        "argument"
    ],
    [
        "UnaryExpression",
        "argument"
    ],
    [
        "YieldExpression",
        "argument"
    ]
]);
function wc(e) {
    let { node: t } = e;
    if (t.type !== "ConditionalExpression") return !1;
    let r, n = t;
    for(let s = 0; !r; s++){
        let u = e.getParentNode(s);
        if (u.type === "ChainExpression" && u.expression === n || I(u) && u.callee === n || R(u) && u.object === n || u.type === "TSNonNullExpression" && u.expression === n) {
            n = u;
            continue;
        }
        u.type === "NewExpression" && u.callee === n || Ae(u) && u.expression === n ? (r = e.getParentNode(s + 1), n = u) : r = u;
    }
    return n === t ? !1 : r[Oc.get(r.type)] === n;
}
var ds = (e)=>[
        B("("),
        E([
            F,
            e
        ]),
        F,
        B(")")
    ];
function Gt(e, t, r, n) {
    if (!t.experimentalTernaries) return Ti(e, t, r);
    let { node: s } = e, u = s.type === "ConditionalExpression", i = s.type === "TSConditionalType" || s.type === "ConditionalTypeAnnotation", a = u ? "consequent" : "trueType", o = u ? "alternate" : "falseType", p = u ? [
        "test"
    ] : [
        "checkType",
        "extendsType"
    ], D = s[a], y = s[o], c = p.map((Me)=>s[Me]), { parent: f } = e, l = f.type === s.type, h = l && p.some((Me)=>f[Me] === s), g = l && f[o] === s, S = D.type === s.type, P = y.type === s.type, v = P || g, M = t.tabWidth > 2 || t.useTabs, _, d, U = 0;
    do d = _ || s, _ = e.getParentNode(U), U++;
    while (_ && _.type === s.type && p.every((Me)=>_[Me] !== d));
    let Ee = _ || f, N = n && n.assignmentLayout && n.assignmentLayout !== "break-after-operator" && (f.type === "AssignmentExpression" || f.type === "VariableDeclarator" || f.type === "ClassProperty" || f.type === "PropertyDefinition" || f.type === "ClassPrivateProperty" || f.type === "ObjectProperty" || f.type === "Property"), ue = (f.type === "ReturnStatement" || f.type === "ThrowStatement") && !(S || P), H = u && Ee.type === "JSXExpressionContainer" && e.grandparent.type !== "JSXAttribute", It = wc(e), Nt = Ic(s, f), O = i && he(e, t), W = M ? t.useTabs ? "	" : " ".repeat(t.tabWidth - 1) : "", ne = Lc(c, D, y, t) || S || P, st = !v && !l && !i && (H ? D.type === "NullLiteral" || D.type === "Literal" && D.value === null : nr(D, t) && Xn(s.test, 3)), xt = v || g || i && !l || l && u && Xn(s.test, 1) || st, Js = [];
    !S && A(D, x.Dangling) && e.call((Me)=>{
        Js.push(j(Me, t), C);
    }, "consequent");
    let $t = [];
    A(s.test, x.Dangling) && e.call((Me)=>{
        $t.push(j(Me, t));
    }, "test"), !P && A(y, x.Dangling) && e.call((Me)=>{
        $t.push(j(Me, t));
    }, "alternate"), A(s, x.Dangling) && $t.push(j(e, t));
    let qs = Symbol("test"), ka = Symbol("consequent"), Er = Symbol("test-and-consequent"), Ia = u ? [
        ds(r("test")),
        s.test.type === "ConditionalExpression" ? le : ""
    ] : [
        r("checkType"),
        " ",
        "extends",
        " ",
        s.extendsType.type === "TSConditionalType" || s.extendsType.type === "ConditionalTypeAnnotation" || s.extendsType.type === "TSMappedType" ? r("extendsType") : m(ds(r("extendsType")))
    ], Us = m([
        Ia,
        " ?"
    ], {
        id: qs
    }), La = r(a), Fr = E([
        S || H && (Y(D) || l || v) ? C : T,
        Js,
        La
    ]), Oa = xt ? m([
        Us,
        v ? Fr : B(Fr, m(Fr, {
            id: ka
        }), {
            groupId: qs
        })
    ], {
        id: Er
    }) : [
        Us,
        Fr
    ], Pn = r(o), Ws = st ? B(Pn, dr(ds(Pn)), {
        groupId: Er
    }) : Pn, Vt = [
        Oa,
        $t.length > 0 ? [
            E([
                C,
                $t
            ]),
            C
        ] : P ? C : st ? B(T, " ", {
            groupId: Er
        }) : T,
        ":",
        P ? " " : M ? xt ? B(W, B(v || st ? " " : W, " "), {
            groupId: Er
        }) : B(W, " ") : " ",
        P ? Ws : m([
            E(Ws),
            H && !st ? F : ""
        ]),
        Nt && !It ? F : "",
        ne ? le : ""
    ];
    return N && !ne ? m(E([
        F,
        m(Vt)
    ])) : N || ue ? m(E(Vt)) : It || i && h ? m([
        E([
            F,
            Vt
        ]),
        O ? F : ""
    ]) : f === Ee ? m(Vt) : Vt;
}
function vc(e, t, r = 0) {
    let n = 0;
    for(let s = r; s < e.length; ++s)e[s] === "	" ? n = n + t - n % t : n++;
    return n;
}
var di = vc;
function _c(e, t) {
    let r = e.lastIndexOf(`
`);
    return r === -1 ? 0 : di(e.slice(r + 1).match(/^[\t ]*/)[0], t);
}
var xi = _c;
function gi(e) {
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
var Se = Symbol("MODE_BREAK"), nt = Symbol("MODE_FLAT"), lr = Symbol("cursor");
function hi() {
    return {
        value: "",
        length: 0,
        queue: []
    };
}
function jc(e, t) {
    return xs(e, {
        type: "indent"
    }, t);
}
function Mc(e, t, r) {
    return t === Number.NEGATIVE_INFINITY ? e.root || hi() : t < 0 ? xs(e, {
        type: "dedent"
    }, r) : t ? t.type === "root" ? {
        ...e,
        root: e
    } : xs(e, {
        type: typeof t == "string" ? "stringAlign" : "numberAlign",
        n: t
    }, r) : e;
}
function xs(e, t, r) {
    let n = t.type === "dedent" ? e.queue.slice(0, -1) : [
        ...e.queue,
        t
    ], s = "", u = 0, i = 0, a = 0;
    for (let l of n)switch(l.type){
        case "indent":
            D(), r.useTabs ? o(1) : p(r.tabWidth);
            break;
        case "stringAlign":
            D(), s += l.n, u += l.n.length;
            break;
        case "numberAlign":
            i += 1, a += l.n;
            break;
        default:
            throw new Error(`Unexpected type '${l.type}'`);
    }
    return c(), {
        ...e,
        value: s,
        length: u,
        queue: n
    };
    function o(l) {
        s += "	".repeat(l), u += r.tabWidth * l;
    }
    function p(l) {
        s += " ".repeat(l), u += l;
    }
    function D() {
        r.useTabs ? y() : c();
    }
    function y() {
        i > 0 && o(i), f();
    }
    function c() {
        a > 0 && p(a), f();
    }
    function f() {
        i = 0, a = 0;
    }
}
function gs(e) {
    let t = 0, r = 0, n = e.length;
    e: for(; n--;){
        let s = e[n];
        if (s === lr) {
            r++;
            continue;
        }
        for(let u = s.length - 1; u >= 0; u--){
            let i = s[u];
            if (i === " " || i === "	") t++;
            else {
                e[n] = s.slice(0, u + 1);
                break e;
            }
        }
    }
    if (t > 0 || r > 0) for(e.length = n + 1; r-- > 0;)e.push(lr);
    return t;
}
function an(e, t, r, n, s, u) {
    if (r === Number.POSITIVE_INFINITY) return !0;
    let i = t.length, a = [
        e
    ], o = [];
    for(; r >= 0;){
        if (a.length === 0) {
            if (i === 0) return !0;
            a.push(t[--i]);
            continue;
        }
        let { mode: p, doc: D } = a.pop();
        switch(et(D)){
            case ze:
                o.push(D), r -= rt(D);
                break;
            case Re:
            case Fe:
                {
                    let y = gr(D);
                    for(let c = y.length - 1; c >= 0; c--)a.push({
                        mode: p,
                        doc: y[c]
                    });
                    break;
                }
            case Je:
            case qe:
            case Ue:
            case Le:
                a.push({
                    mode: p,
                    doc: D.contents
                });
                break;
            case Ze:
                r += gs(o);
                break;
            case oe:
                {
                    if (u && D.break) return !1;
                    let y = D.break ? Se : p, c = D.expandedStates && y === Se ? w(!1, D.expandedStates, -1) : D.contents;
                    a.push({
                        mode: y,
                        doc: c
                    });
                    break;
                }
            case de:
                {
                    let c = (D.groupId ? s[D.groupId] || nt : p) === Se ? D.breakContents : D.flatContents;
                    c && a.push({
                        mode: p,
                        doc: c
                    });
                    break;
                }
            case pe:
                if (p === Se || D.hard) return !0;
                D.soft || (o.push(" "), r--);
                break;
            case We:
                n = !0;
                break;
            case Ge:
                if (n) return !1;
                break;
        }
    }
    return !1;
}
function hs(e, t) {
    let r = {}, n = t.printWidth, s = gi(t.endOfLine), u = 0, i = [
        {
            ind: hi(),
            mode: Se,
            doc: e
        }
    ], a = [], o = !1, p = [], D = 0;
    for(Zs(e); i.length > 0;){
        let { ind: c, mode: f, doc: l } = i.pop();
        switch(et(l)){
            case ze:
                {
                    let h = s !== `
` ? K(!1, l, `
`, s) : l;
                    a.push(h), i.length > 0 && (u += rt(h));
                    break;
                }
            case Re:
                for(let h = l.length - 1; h >= 0; h--)i.push({
                    ind: c,
                    mode: f,
                    doc: l[h]
                });
                break;
            case Qe:
                if (D >= 2) throw new Error("There are too many 'cursor' in doc.");
                a.push(lr), D++;
                break;
            case Je:
                i.push({
                    ind: jc(c, t),
                    mode: f,
                    doc: l.contents
                });
                break;
            case qe:
                i.push({
                    ind: Mc(c, l.n, t),
                    mode: f,
                    doc: l.contents
                });
                break;
            case Ze:
                u -= gs(a);
                break;
            case oe:
                switch(f){
                    case nt:
                        if (!o) {
                            i.push({
                                ind: c,
                                mode: l.break ? Se : nt,
                                doc: l.contents
                            });
                            break;
                        }
                    case Se:
                        {
                            o = !1;
                            let h = {
                                ind: c,
                                mode: nt,
                                doc: l.contents
                            }, g = n - u, S = p.length > 0;
                            if (!l.break && an(h, i, g, S, r)) i.push(h);
                            else if (l.expandedStates) {
                                let P = w(!1, l.expandedStates, -1);
                                if (l.break) {
                                    i.push({
                                        ind: c,
                                        mode: Se,
                                        doc: P
                                    });
                                    break;
                                } else for(let v = 1; v < l.expandedStates.length + 1; v++)if (v >= l.expandedStates.length) {
                                    i.push({
                                        ind: c,
                                        mode: Se,
                                        doc: P
                                    });
                                    break;
                                } else {
                                    let M = l.expandedStates[v], _ = {
                                        ind: c,
                                        mode: nt,
                                        doc: M
                                    };
                                    if (an(_, i, g, S, r)) {
                                        i.push(_);
                                        break;
                                    }
                                }
                            } else i.push({
                                ind: c,
                                mode: Se,
                                doc: l.contents
                            });
                            break;
                        }
                }
                l.id && (r[l.id] = w(!1, i, -1).mode);
                break;
            case Fe:
                {
                    let h = n - u, { parts: g } = l;
                    if (g.length === 0) break;
                    let [S, P] = g, v = {
                        ind: c,
                        mode: nt,
                        doc: S
                    }, M = {
                        ind: c,
                        mode: Se,
                        doc: S
                    }, _ = an(v, [], h, p.length > 0, r, !0);
                    if (g.length === 1) {
                        _ ? i.push(v) : i.push(M);
                        break;
                    }
                    let d = {
                        ind: c,
                        mode: nt,
                        doc: P
                    }, U = {
                        ind: c,
                        mode: Se,
                        doc: P
                    };
                    if (g.length === 2) {
                        _ ? i.push(d, v) : i.push(U, M);
                        break;
                    }
                    g.splice(0, 2);
                    let Ee = {
                        ind: c,
                        mode: f,
                        doc: Lt(g)
                    }, N = g[0];
                    an({
                        ind: c,
                        mode: nt,
                        doc: [
                            S,
                            P,
                            N
                        ]
                    }, [], h, p.length > 0, r, !0) ? i.push(Ee, d, v) : _ ? i.push(Ee, U, v) : i.push(Ee, U, M);
                    break;
                }
            case de:
            case Ue:
                {
                    let h = l.groupId ? r[l.groupId] : f;
                    if (h === Se) {
                        let g = l.type === de ? l.breakContents : l.negate ? l.contents : E(l.contents);
                        g && i.push({
                            ind: c,
                            mode: f,
                            doc: g
                        });
                    }
                    if (h === nt) {
                        let g = l.type === de ? l.flatContents : l.negate ? E(l.contents) : l.contents;
                        g && i.push({
                            ind: c,
                            mode: f,
                            doc: g
                        });
                    }
                    break;
                }
            case We:
                p.push({
                    ind: c,
                    mode: f,
                    doc: l.contents
                });
                break;
            case Ge:
                p.length > 0 && i.push({
                    ind: c,
                    mode: f,
                    doc: wn
                });
                break;
            case pe:
                switch(f){
                    case nt:
                        if (l.hard) o = !0;
                        else {
                            l.soft || (a.push(" "), u += 1);
                            break;
                        }
                    case Se:
                        if (p.length > 0) {
                            i.push({
                                ind: c,
                                mode: f,
                                doc: l
                            }, ...p.reverse()), p.length = 0;
                            break;
                        }
                        l.literal ? c.root ? (a.push(s, c.root.value), u = c.root.length) : (a.push(s), u = 0) : (u -= gs(a), a.push(s + c.value), u = c.length);
                        break;
                }
                break;
            case Le:
                i.push({
                    ind: c,
                    mode: f,
                    doc: l.contents
                });
                break;
            case Oe:
                break;
            default:
                throw new ft(l);
        }
        i.length === 0 && p.length > 0 && (i.push(...p.reverse()), p.length = 0);
    }
    let y = a.indexOf(lr);
    if (y !== -1) {
        let c = a.indexOf(lr, y + 1), f = a.slice(0, y).join(""), l = a.slice(y + 1, c).join(""), h = a.slice(c + 1).join("");
        return {
            formatted: f + l + h,
            cursorNodeStart: f.length,
            cursorNodeText: l
        };
    }
    return {
        formatted: a.join("")
    };
}
function on(e, t, r) {
    let { node: n } = e;
    if (n.type === "TemplateLiteral" && qc(e)) {
        let D = Rc(e, r, t);
        if (D) return D;
    }
    let u = "expressions";
    n.type === "TSTemplateLiteralType" && (u = "types");
    let i = [], a = e.map(t, u), o = du(n);
    o && (a = a.map((D)=>hs(D, {
            ...r,
            printWidth: Number.POSITIVE_INFINITY
        }).formatted)), i.push(Be, "`");
    let p = 0;
    return e.each(({ index: D, node: y })=>{
        if (i.push(t()), y.tail) return;
        let { tabWidth: c } = r, f = y.value.raw, l = f.includes(`
`) ? xi(f, c) : p;
        p = l;
        let h = a[D];
        if (!o) {
            let S = n[u][D];
            (A(S) || R(S) || S.type === "ConditionalExpression" || S.type === "SequenceExpression" || Ae(S) || me(S)) && (h = [
                E([
                    F,
                    h
                ]),
                F
            ]);
        }
        let g = l === 0 && f.endsWith(`
`) ? xe(Number.NEGATIVE_INFINITY, h) : Hs(h, l, c);
        i.push(m([
            "${",
            g,
            Be,
            "}"
        ]));
    }, "quasis"), i.push("`"), i;
}
function Si(e) {
    let t = e("quasi");
    return tt(t.label && {
        tagged: !0,
        ...t.label
    }, [
        e("tag"),
        e("typeParameters"),
        Be,
        t
    ]);
}
function Rc(e, t, r) {
    let { node: n } = e, s = n.quasis[0].value.raw.trim().split(/\s*\|\s*/);
    if (s.length > 1 || s.some((u)=>u.length > 0)) {
        t.__inJestEach = !0;
        let u = e.map(r, "expressions");
        t.__inJestEach = !1;
        let i = [], a = u.map((c)=>"${" + hs(c, {
                ...t,
                printWidth: Number.POSITIVE_INFINITY,
                endOfLine: "lf"
            }).formatted + "}"), o = [
            {
                hasLineBreak: !1,
                cells: []
            }
        ];
        for(let c = 1; c < n.quasis.length; c++){
            let f = w(!1, o, -1), l = a[c - 1];
            f.cells.push(l), l.includes(`
`) && (f.hasLineBreak = !0), n.quasis[c].value.raw.includes(`
`) && o.push({
                hasLineBreak: !1,
                cells: []
            });
        }
        let p = Math.max(s.length, ...o.map((c)=>c.cells.length)), D = Array.from({
            length: p
        }).fill(0), y = [
            {
                cells: s
            },
            ...o.filter((c)=>c.cells.length > 0)
        ];
        for (let { cells: c } of y.filter((f)=>!f.hasLineBreak))for (let [f, l] of c.entries())D[f] = Math.max(D[f], rt(l));
        return i.push(Be, "`", E([
            C,
            b(C, y.map((c)=>b(" | ", c.cells.map((f, l)=>c.hasLineBreak ? f : f + " ".repeat(D[l] - rt(f))))))
        ]), C, "`"), i;
    }
}
function Jc(e, t) {
    let { node: r } = e, n = t();
    return A(r) && (n = m([
        E([
            F,
            n
        ]),
        F
    ])), [
        "${",
        n,
        Be,
        "}"
    ];
}
function Yt(e, t) {
    return e.map((r)=>Jc(r, t), "expressions");
}
function pn(e, t) {
    return it(e, (r)=>typeof r == "string" ? t ? K(!1, r, /(\\*)`/g, "$1$1\\`") : Ss(r) : r);
}
function Ss(e) {
    return K(!1, e, /([\\`]|\${)/g, "\\$1");
}
function qc({ node: e, parent: t }) {
    let r = /^[fx]?(?:describe|it|test)$/;
    return t.type === "TaggedTemplateExpression" && t.quasi === e && t.tag.type === "MemberExpression" && t.tag.property.type === "Identifier" && t.tag.property.name === "each" && (t.tag.object.type === "Identifier" && r.test(t.tag.object.name) || t.tag.object.type === "MemberExpression" && t.tag.object.property.type === "Identifier" && (t.tag.object.property.name === "only" || t.tag.object.property.name === "skip") && t.tag.object.object.type === "Identifier" && r.test(t.tag.object.object.name));
}
function Uc(e) {
    let t = new WeakMap;
    return function(r) {
        return t.has(r) || t.set(r, Symbol(e)), t.get(r);
    };
}
var cn = Uc;
function Wc(e) {
    switch(e){
        case null:
            return "";
        case "PlusOptional":
            return "+?";
        case "MinusOptional":
            return "-?";
        case "Optional":
            return "?";
    }
}
function Bi(e, t, r) {
    let { node: n } = e;
    return m([
        n.variance ? r("variance") : "",
        "[",
        E([
            r("keyTparam"),
            " in ",
            r("sourceType")
        ]),
        "]",
        Wc(n.optional),
        ": ",
        r("propType")
    ]);
}
function Bs(e, t) {
    return e === "+" || e === "-" ? e + t : t;
}
function bi(e, t, r) {
    let { node: n } = e, s = Ie(t.originalText, J(n), J(n.typeParameter));
    return m([
        "{",
        E([
            t.bracketSpacing ? T : F,
            m([
                r("typeParameter"),
                n.optional ? Bs(n.optional, "?") : "",
                n.typeAnnotation ? ": " : "",
                r("typeAnnotation")
            ]),
            t.semi ? B(";") : ""
        ]),
        j(e, t),
        t.bracketSpacing ? T : F,
        "}"
    ], {
        shouldBreak: s
    });
}
var mr = cn("typeParameters");
function Gc(e, t, r) {
    let { node: n } = e;
    return V(n).length === 1 && n.type.startsWith("TS") && !n[r][0].constraint && e.parent.type === "ArrowFunctionExpression" && !(t.filepath && /\.ts$/.test(t.filepath));
}
function bt(e, t, r, n) {
    let { node: s } = e;
    if (!s[n]) return "";
    if (!Array.isArray(s[n])) return r(n);
    let u = e.getNode(2), i = u && gt(u), a = e.match((D)=>!(D[n].length === 1 && we(D[n][0])), void 0, (D, y)=>y === "typeAnnotation", (D)=>D.type === "Identifier", Ds);
    if (s[n].length === 0 || !a && (i || s[n].length === 1 && (s[n][0].type === "NullableTypeAnnotation" || fs(s[n][0])))) return [
        "<",
        b(", ", e.map(r, n)),
        Yc(e, t),
        ">"
    ];
    let p = s.type === "TSTypeParameterInstantiation" ? "" : Gc(e, t, n) ? "," : ye(t) ? B(",") : "";
    return m([
        "<",
        E([
            F,
            b([
                ",",
                T
            ], e.map(r, n))
        ]),
        p,
        F,
        ">"
    ], {
        id: mr(s)
    });
}
function Yc(e, t) {
    let { node: r } = e;
    if (!A(r, x.Dangling)) return "";
    let n = !A(r, x.Line), s = j(e, t, {
        indent: !n
    });
    return n ? s : [
        s,
        C
    ];
}
function ln(e, t, r) {
    let { node: n, parent: s } = e, u = [
        n.type === "TSTypeParameter" && n.const ? "const " : ""
    ], i = n.type === "TSTypeParameter" ? r("name") : n.name;
    if (s.type === "TSMappedType") return s.readonly && u.push(Bs(s.readonly, "readonly"), " "), u.push("[", i), n.constraint && u.push(" in ", r("constraint")), s.nameType && u.push(" as ", e.callParent(()=>r("nameType"))), u.push("]"), u;
    if (n.variance && u.push(r("variance")), n.in && u.push("in "), n.out && u.push("out "), u.push(i), n.bound && (n.usesExtendsBound && u.push(" extends "), u.push(X(e, r, "bound"))), n.constraint) {
        let a = Symbol("constraint");
        u.push(" extends", m(E(T), {
            id: a
        }), Be, Et(r("constraint"), {
            groupId: a
        }));
    }
    return n.default && u.push(" = ", r("default")), m(u);
}
function Xc(e) {
    return e.toLowerCase().replace(/^([+-]?[\d.]+e)(?:\+|(-))?0*(?=\d)/, "$1$2").replace(/^([+-]?[\d.]+)e[+-]?0+$/, "$1").replace(/^([+-])?\./, "$10.").replace(/(\.\d+?)0+(?=e|$)/, "$1").replace(/\.(?=e|$)/, "");
}
var He = Xc;
var mn = new WeakMap;
function yt(e, t, r) {
    let { node: n } = e;
    if (n.computed) return [
        "[",
        r("key"),
        "]"
    ];
    let { parent: s } = e, { key: u } = n;
    if (t.quoteProps === "consistent" && !mn.has(s)) {
        let i = (s.properties || s.body || s.members).some((a)=>!a.computed && a.key && ee(a.key) && !Nn(a, t));
        mn.set(s, i);
    }
    if ((u.type === "Identifier" || ke(u) && $n(He(De(u))) && String(u.value) === He(De(u)) && !(t.parser === "typescript" || t.parser === "babel-ts")) && (t.parser === "json" || t.quoteProps === "consistent" && mn.get(s))) {
        let i = at(JSON.stringify(u.type === "Identifier" ? u.name : u.value.toString()), t);
        return e.call((a)=>ce(a, i, t), "key");
    }
    return Nn(n, t) && (t.quoteProps === "as-needed" || t.quoteProps === "consistent" && !mn.get(s)) ? e.call((i)=>ce(i, /^\d/.test(u.value) ? He(u.value) : u.value, t), "key") : r("key");
}
function Pi(e, t, r) {
    let { node: n } = e;
    return n.shorthand ? r("value") : At(e, t, r, yt(e, t, r), ":", "value");
}
var Nc = (e)=>e.type === "ObjectMethod" || e.type === "ClassMethod" || e.type === "ClassPrivateMethod" || e.type === "MethodDefinition" || e.type === "TSAbstractMethodDefinition" || e.type === "TSDeclareMethod" || (e.type === "Property" || e.type === "ObjectProperty") && (e.method || e.kind === "get" || e.kind === "set"), $c = (e)=>e.node.type === "FunctionExpression" && e.key === "value" && Nc(e.parent);
function Dn(e, t, r, n) {
    if ($c(e)) return yn(e, r, t);
    let { node: s } = e, u = !1;
    if ((s.type === "FunctionDeclaration" || s.type === "FunctionExpression") && n != null && n.expandLastArg) {
        let { parent: D } = e;
        I(D) && (ge(D).length > 1 || V(s).every((y)=>y.type === "Identifier" && !y.typeAnnotation)) && (u = !0);
    }
    let i = [
        re(e),
        s.async ? "async " : "",
        `function${s.generator ? "*" : ""} `,
        s.id ? t("id") : ""
    ], a = mt(e, t, r, u), o = En(e, t), p = Bt(s, o);
    return i.push(Ke(e, r, t), m([
        p ? m(a) : a,
        o
    ]), s.body ? " " : "", t("body")), r.semi && (s.declare || !s.body) && i.push(";"), i;
}
function Dr(e, t, r) {
    let { node: n } = e, { kind: s } = n, u = n.value || n, i = [];
    return !s || s === "init" || s === "method" || s === "constructor" ? u.async && i.push("async ") : (sn.ok(s === "get" || s === "set"), i.push(s, " ")), u.generator && i.push("*"), i.push(yt(e, t, r), n.optional || n.key.optional ? "?" : "", n === u ? yn(e, t, r) : r("value")), i;
}
function yn(e, t, r) {
    let { node: n } = e, s = mt(e, r, t), u = En(e, r), i = ui(n), a = Bt(n, u), o = [
        Ke(e, t, r),
        m([
            i ? m(s, {
                shouldBreak: !0
            }) : a ? m(s) : s,
            u
        ])
    ];
    return n.body ? o.push(" ", r("body")) : o.push(t.semi ? ";" : ""), o;
}
function Vc(e) {
    let t = V(e);
    return t.length === 1 && !e.typeParameters && !A(e, x.Dangling) && t[0].type === "Identifier" && !t[0].typeAnnotation && !A(t[0]) && !t[0].optional && !e.predicate && !e.returnType;
}
function fn(e, t) {
    if (t.arrowParens === "always") return !1;
    if (t.arrowParens === "avoid") {
        let { node: r } = e;
        return Vc(r);
    }
    return !1;
}
function En(e, t) {
    let { node: r } = e, s = [
        X(e, t, "returnType")
    ];
    return r.predicate && s.push(t("predicate")), s;
}
function ki(e, t, r) {
    let { node: n } = e, s = t.semi ? ";" : "", u = [];
    if (n.argument) {
        let o = r("argument");
        Kc(t, n.argument) ? o = [
            "(",
            E([
                C,
                o
            ]),
            C,
            ")"
        ] : (me(n.argument) || n.argument.type === "SequenceExpression" || t.experimentalTernaries && n.argument.type === "ConditionalExpression" && (n.argument.consequent.type === "ConditionalExpression" || n.argument.alternate.type === "ConditionalExpression")) && (o = m([
            B("("),
            E([
                F,
                o
            ]),
            F,
            B(")")
        ])), u.push(" ", o);
    }
    let i = A(n, x.Dangling), a = s && i && A(n, x.Last | x.Line);
    return a && u.push(s), i && u.push(" ", j(e, t)), a || u.push(s), u;
}
function Ii(e, t, r) {
    return [
        "return",
        ki(e, t, r)
    ];
}
function Li(e, t, r) {
    return [
        "throw",
        ki(e, t, r)
    ];
}
function Kc(e, t) {
    if (ve(e.originalText, t) || A(t, x.Leading, (r)=>Ie(e.originalText, J(r), L(r))) && !Y(t)) return !0;
    if (Mt(t)) {
        let r = t, n;
        for(; n = Fu(r);)if (r = n, ve(e.originalText, r)) return !0;
    }
    return !1;
}
var Oi = q([
    "ClassProperty",
    "PropertyDefinition",
    "ClassPrivateProperty",
    "ClassAccessorProperty",
    "AccessorProperty",
    "TSAbstractPropertyDefinition",
    "TSAbstractAccessorProperty"
]);
function Fn(e, t, r) {
    let { node: n } = e, s = [
        re(e),
        Ut(e),
        "class"
    ], u = A(n.id, x.Trailing) || A(n.typeParameters, x.Trailing) || A(n.superClass) || k(n.extends) || k(n.mixins) || k(n.implements), i = [], a = [];
    if (n.id && i.push(" ", r("id")), i.push(r("typeParameters")), n.superClass) {
        let o = [
            zc(e, t, r),
            r("superTypeParameters")
        ], p = e.call((D)=>[
                "extends ",
                ce(D, o, t)
            ], "superClass");
        u ? a.push(T, m(p)) : a.push(" ", p);
    } else a.push(bs(e, t, r, "extends"));
    if (a.push(bs(e, t, r, "mixins"), bs(e, t, r, "implements")), u) {
        let o;
        vi(n) ? o = [
            ...i,
            E(a)
        ] : o = E([
            ...i,
            a
        ]), s.push(m(o, {
            id: wi(n)
        }));
    } else s.push(...i, ...a);
    return s.push(" ", r("body")), s;
}
var wi = cn("heritageGroup");
function Ps(e) {
    return B(C, "", {
        groupId: wi(e)
    });
}
function Hc(e) {
    return [
        "extends",
        "mixins",
        "implements"
    ].reduce((t, r)=>t + (Array.isArray(e[r]) ? e[r].length : 0), e.superClass ? 1 : 0) > 1;
}
function vi(e) {
    return e.typeParameters && !A(e.typeParameters, x.Trailing | x.Line) && !Hc(e);
}
function bs(e, t, r, n) {
    let { node: s } = e;
    if (!k(s[n])) return "";
    let u = j(e, t, {
        marker: n
    });
    return [
        vi(s) ? B(" ", T, {
            groupId: mr(s.typeParameters)
        }) : T,
        u,
        u && C,
        n,
        m(E([
            T,
            b([
                ",",
                T
            ], e.map(r, n))
        ]))
    ];
}
function zc(e, t, r) {
    let n = r("superClass"), { parent: s } = e;
    return s.type === "AssignmentExpression" ? m(B([
        "(",
        E([
            F,
            n
        ]),
        F,
        ")"
    ], n)) : n;
}
function Cn(e, t, r) {
    let { node: n } = e, s = [];
    return k(n.decorators) && s.push(Fs(e, t, r)), s.push(Wt(n)), n.static && s.push("static "), s.push(Ut(e)), n.override && s.push("override "), s.push(Dr(e, t, r)), s;
}
function An(e, t, r) {
    let { node: n } = e, s = [], u = t.semi ? ";" : "";
    k(n.decorators) && s.push(Fs(e, t, r)), s.push(Wt(n), re(e)), n.static && s.push("static "), s.push(Ut(e)), n.override && s.push("override "), n.readonly && s.push("readonly "), n.variance && s.push(r("variance")), (n.type === "ClassAccessorProperty" || n.type === "AccessorProperty" || n.type === "TSAbstractAccessorProperty") && s.push("accessor "), s.push(yt(e, t, r), $(e), rn(e), X(e, r));
    let i = n.type === "TSAbstractPropertyDefinition" || n.type === "TSAbstractAccessorProperty";
    return [
        At(e, t, r, s, " =", i ? void 0 : "value"),
        u
    ];
}
function _i(e, t, r) {
    let { node: n } = e, s = [];
    return e.each(({ node: u, next: i, isLast: a })=>{
        s.push(r()), !t.semi && Oi(u) && Qc(u, i) && s.push(";"), a || (s.push(C), fe(u, t) && s.push(C));
    }, "body"), A(n, x.Dangling) && s.push(j(e, t)), [
        k(n.body) ? Ps(e.parent) : "",
        "{",
        s.length > 0 ? [
            E([
                C,
                s
            ]),
            C
        ] : "",
        "}"
    ];
}
function Qc(e, t) {
    var s;
    let { type: r, name: n } = e.key;
    if (!e.computed && r === "Identifier" && (n === "static" || n === "get" || n === "set") && !e.value && !e.typeAnnotation) return !0;
    if (!t || t.static || t.accessibility) return !1;
    if (!t.computed) {
        let u = (s = t.key) == null ? void 0 : s.name;
        if (u === "in" || u === "instanceof") return !0;
    }
    if (Oi(t) && t.variance && !t.static && !t.declare) return !0;
    switch(t.type){
        case "ClassProperty":
        case "PropertyDefinition":
        case "TSAbstractPropertyDefinition":
            return t.computed;
        case "MethodDefinition":
        case "TSAbstractMethodDefinition":
        case "ClassMethod":
        case "ClassPrivateMethod":
            {
                if ((t.value ? t.value.async : t.async) || t.kind === "get" || t.kind === "set") return !1;
                let i = t.value ? t.value.generator : t.generator;
                return !!(t.computed || i);
            }
        case "TSIndexSignature":
            return !0;
    }
    return !1;
}
function Tt(e, t, r) {
    var _;
    let n = t.semi ? ";" : "", { node: s } = e, u = s.type === "ObjectTypeAnnotation", i = s.type === "TSEnumDeclaration" || s.type === "EnumBooleanBody" || s.type === "EnumNumberBody" || s.type === "EnumStringBody" || s.type === "EnumSymbolBody", a = [
        s.type === "TSTypeLiteral" || i ? "members" : s.type === "TSInterfaceBody" ? "body" : "properties"
    ];
    u && a.push("indexers", "callProperties", "internalSlots");
    let o = a.flatMap((d)=>e.map(({ node: U })=>({
                node: U,
                printed: r(),
                loc: J(U)
            }), d));
    a.length > 1 && o.sort((d, U)=>d.loc - U.loc);
    let { parent: p, key: D } = e, y = u && D === "body" && (p.type === "InterfaceDeclaration" || p.type === "DeclareInterface" || p.type === "DeclareClass"), c = s.type === "TSInterfaceBody" || i || y || s.type === "ObjectPattern" && p.type !== "FunctionDeclaration" && p.type !== "FunctionExpression" && p.type !== "ArrowFunctionExpression" && p.type !== "ObjectMethod" && p.type !== "ClassMethod" && p.type !== "ClassPrivateMethod" && p.type !== "AssignmentPattern" && p.type !== "CatchClause" && s.properties.some((d)=>d.value && (d.value.type === "ObjectPattern" || d.value.type === "ArrayPattern")) || s.type !== "ObjectPattern" && o.length > 0 && Ie(t.originalText, J(s), o[0].loc), f = y ? ";" : s.type === "TSInterfaceBody" || s.type === "TSTypeLiteral" ? B(n, ";") : ",", l = s.type === "RecordExpression" ? "#{" : s.exact ? "{|" : "{", h = s.exact ? "|}" : "}", g = [], S = o.map((d)=>{
        let U = [
            ...g,
            m(d.printed)
        ];
        return g = [
            f,
            T
        ], (d.node.type === "TSPropertySignature" || d.node.type === "TSMethodSignature" || d.node.type === "TSConstructSignatureDeclaration" || d.node.type === "TSCallSignatureDeclaration") && A(d.node, x.PrettierIgnore) && g.shift(), fe(d.node, t) && g.push(C), U;
    });
    if (s.inexact || s.hasUnknownMembers) {
        let d;
        if (A(s, x.Dangling)) {
            let U = A(s, x.Line);
            d = [
                j(e, t),
                U || Q(t.originalText, L(w(!1, ot(s), -1))) ? C : T,
                "..."
            ];
        } else d = [
            "..."
        ];
        S.push([
            ...g,
            ...d
        ]);
    }
    let P = (_ = w(!1, o, -1)) == null ? void 0 : _.node, v = !(s.inexact || s.hasUnknownMembers || P && (P.type === "RestElement" || (P.type === "TSPropertySignature" || P.type === "TSCallSignatureDeclaration" || P.type === "TSMethodSignature" || P.type === "TSConstructSignatureDeclaration") && A(P, x.PrettierIgnore))), M;
    if (S.length === 0) {
        if (!A(s, x.Dangling)) return [
            l,
            h,
            X(e, r)
        ];
        M = m([
            l,
            j(e, t, {
                indent: !0
            }),
            F,
            h,
            $(e),
            X(e, r)
        ]);
    } else M = [
        y && k(s.properties) ? Ps(p) : "",
        l,
        E([
            t.bracketSpacing ? T : F,
            ...S
        ]),
        B(v && (f !== "," || ye(t)) ? f : ""),
        t.bracketSpacing ? T : F,
        h,
        $(e),
        X(e, r)
    ];
    return e.match((d)=>d.type === "ObjectPattern" && !k(d.decorators), ks) || we(s) && (e.match(void 0, (d, U)=>U === "typeAnnotation", (d, U)=>U === "typeAnnotation", ks) || e.match(void 0, (d, U)=>d.type === "FunctionTypeParam" && U === "typeAnnotation", ks)) || !c && e.match((d)=>d.type === "ObjectPattern", (d)=>d.type === "AssignmentExpression" || d.type === "VariableDeclarator") ? M : m(M, {
        shouldBreak: c
    });
}
function ks(e, t) {
    return (t === "params" || t === "parameters" || t === "this" || t === "rest") && ys(e);
}
var Is = new WeakMap;
function ji(e) {
    return Is.has(e) || Is.set(e, e.type === "ConditionalExpression" && !ie(e, (t)=>t.type === "ObjectExpression")), Is.get(e);
}
var Mi = (e)=>e.type === "SequenceExpression";
function Ri(e, t, r, n = {}) {
    let s = [], u, i = [], a = !1, o = !n.expandLastArg && e.node.body.type === "ArrowFunctionExpression", p;
    (function g() {
        let { node: S } = e, P = Zc(e, t, r, n);
        if (s.length === 0) s.push(P);
        else {
            let { leading: v, trailing: M } = zn(e, t);
            s.push([
                v,
                P
            ]), i.unshift(M);
        }
        o && (a || (a = S.returnType && V(S).length > 0 || S.typeParameters || V(S).some((v)=>v.type !== "Identifier"))), !o || S.body.type !== "ArrowFunctionExpression" ? (u = r("body", n), p = S.body) : e.call(g, "body");
    })();
    let D = !ve(t.originalText, p) && (Mi(p) || el(p, u, t) || !a && ji(p)), y = e.key === "callee" && pt(e.parent), c = Symbol("arrow-chain"), f = tl(e, n, {
        signatureDocs: s,
        shouldBreak: a
    }), l, h = !1;
    return o && (y || n.assignmentLayout) && (h = !0, l = n.assignmentLayout === "chain-tail-arrow-chain" || y && !D), u = rl(e, t, n, {
        bodyDoc: u,
        bodyComments: i,
        functionBody: p,
        shouldPutBodyOnSameLine: D
    }), m([
        m(h ? E([
            F,
            f
        ]) : f, {
            shouldBreak: l,
            id: c
        }),
        " =>",
        o ? Et(u, {
            groupId: c
        }) : m(u),
        o && y ? B(F, "", {
            groupId: c
        }) : ""
    ]);
}
function Zc(e, t, r, n) {
    let { node: s } = e, u = [];
    if (s.async && u.push("async "), fn(e, t)) u.push(r([
        "params",
        0
    ]));
    else {
        let a = n.expandLastArg || n.expandFirstArg, o = En(e, r);
        if (a) {
            if (z(o)) throw new lt;
            o = m(Kt(o));
        }
        u.push(m([
            mt(e, r, t, a, !0),
            o
        ]));
    }
    let i = j(e, t, {
        filter (a) {
            let o = ct(t.originalText, L(a));
            return o !== !1 && t.originalText.slice(o, o + 2) === "=>";
        }
    });
    return i && u.push(" ", i), u;
}
function el(e, t, r) {
    var n, s;
    return G(e) || se(e) || e.type === "ArrowFunctionExpression" || e.type === "DoExpression" || e.type === "BlockStatement" || Y(e) || ((n = t.label) == null ? void 0 : n.hug) !== !1 && (((s = t.label) == null ? void 0 : s.embed) || vr(e, r.originalText));
}
function tl(e, t, { signatureDocs: r, shouldBreak: n }) {
    if (r.length === 1) return r[0];
    let { parent: s, key: u } = e;
    return u !== "callee" && pt(s) || me(s) ? m([
        r[0],
        " =>",
        E([
            T,
            b([
                " =>",
                T
            ], r.slice(1))
        ])
    ], {
        shouldBreak: n
    }) : u === "callee" && pt(s) || t.assignmentLayout ? m(b([
        " =>",
        T
    ], r), {
        shouldBreak: n
    }) : m(E(b([
        " =>",
        T
    ], r)), {
        shouldBreak: n
    });
}
function rl(e, t, r, { bodyDoc: n, bodyComments: s, functionBody: u, shouldPutBodyOnSameLine: i }) {
    let { node: a, parent: o } = e, p = r.expandLastArg && ye(t, "all") ? B(",") : "", D = (r.expandLastArg || o.type === "JSXExpressionContainer") && !A(a) ? F : "";
    return i && ji(u) ? [
        " ",
        m([
            B("", "("),
            E([
                F,
                n
            ]),
            B("", ")"),
            p,
            D
        ]),
        s
    ] : (Mi(u) && (n = m([
        "(",
        E([
            F,
            n
        ]),
        F,
        ")"
    ])), i ? [
        " ",
        n,
        s
    ] : [
        E([
            T,
            n,
            s
        ]),
        p,
        D
    ]);
}
function yr(e, t, r, n) {
    let { node: s } = e, u = [], i = nl(s[n]);
    return e.each(({ node: a })=>{
        a.type !== "EmptyStatement" && (u.push(r()), a !== i && (u.push(C), fe(a, t) && u.push(C)));
    }, n), u;
}
function nl(e) {
    for(let t = e.length - 1; t >= 0; t--){
        let r = e[t];
        if (r.type !== "EmptyStatement") return r;
    }
}
function Tn(e, t, r) {
    let { node: n } = e, s = [];
    n.type === "StaticBlock" && s.push("static "), s.push("{");
    let u = Ls(e, t, r);
    if (u) s.push(E([
        C,
        u
    ]), C);
    else {
        let { parent: i } = e, a = e.grandparent;
        i.type === "ArrowFunctionExpression" || i.type === "FunctionExpression" || i.type === "FunctionDeclaration" || i.type === "ObjectMethod" || i.type === "ClassMethod" || i.type === "ClassPrivateMethod" || i.type === "ForStatement" || i.type === "WhileStatement" || i.type === "DoWhileStatement" || i.type === "DoExpression" || i.type === "CatchClause" && !a.finalizer || i.type === "TSModuleDeclaration" || i.type === "TSDeclareFunction" || n.type === "StaticBlock" || s.push(C);
    }
    return s.push("}"), s;
}
function Ls(e, t, r) {
    var o;
    let { node: n } = e, s = k(n.directives), u = n.body.some((p)=>p.type !== "EmptyStatement"), i = A(n, x.Dangling);
    if (!s && !u && !i) return "";
    let a = [];
    return s && (a.push(yr(e, t, r, "directives")), (u || i) && (a.push(C), fe(w(!1, n.directives, -1), t) && a.push(C))), u && a.push(yr(e, t, r, "body")), i && a.push(j(e, t)), n.type === "Program" && ((o = e.parent) == null ? void 0 : o.type) !== "ModuleExpression" && a.push(C), a;
}
function Ui(e, t) {
    let { node: r } = e;
    switch(r.type){
        case "RegExpLiteral":
            return Ji(r);
        case "BigIntLiteral":
            return dn(r.extra.raw);
        case "NumericLiteral":
            return He(r.extra.raw);
        case "StringLiteral":
            return be(at(r.extra.raw, t));
        case "NullLiteral":
            return "null";
        case "BooleanLiteral":
            return String(r.value);
        case "DecimalLiteral":
            return He(r.value) + "m";
        case "DirectiveLiteral":
            return qi(r.extra.raw, t);
        case "Literal":
            {
                if (r.regex) return Ji(r.regex);
                if (r.bigint) return dn(r.raw);
                if (r.decimal) return He(r.decimal) + "m";
                let { value: n } = r;
                return typeof n == "number" ? He(r.raw) : typeof n == "string" ? sl(e) ? qi(r.raw, t) : be(at(r.raw, t)) : String(n);
            }
    }
}
function sl(e) {
    if (e.key !== "expression") return;
    let { parent: t } = e;
    return t.type === "ExpressionStatement" && t.directive;
}
function dn(e) {
    return e.toLowerCase();
}
function Ji({ pattern: e, flags: t }) {
    return t = [
        ...t
    ].sort().join(""), `/${e}/${t}`;
}
function qi(e, t) {
    let r = e.slice(1, -1);
    if (r.includes('"') || r.includes("'")) return e;
    let n = t.singleQuote ? "'" : '"';
    return n + r + n;
}
function Wi(e, t) {
    if (t.semi || Os(e, t) || vs(e, t)) return !1;
    let { node: r, key: n, parent: s } = e;
    return !!(r.type === "ExpressionStatement" && (n === "body" && (s.type === "Program" || s.type === "BlockStatement" || s.type === "StaticBlock" || s.type === "TSModuleBlock") || n === "consequent" && s.type === "SwitchCase") && e.call(()=>Gi(e, t), "expression"));
}
function Gi(e, t) {
    let { node: r } = e;
    switch(r.type){
        case "ParenthesizedExpression":
        case "TypeCastExpression":
        case "ArrayExpression":
        case "ArrayPattern":
        case "TemplateLiteral":
        case "TemplateElement":
        case "RegExpLiteral":
            return !0;
        case "ArrowFunctionExpression":
            if (!fn(e, t)) return !0;
            break;
        case "UnaryExpression":
            {
                let { prefix: n, operator: s } = r;
                if (n && (s === "+" || s === "-")) return !0;
                break;
            }
        case "BindExpression":
            if (!r.object) return !0;
            break;
        case "Literal":
            if (r.regex) return !0;
            break;
        default:
            if (Y(r)) return !0;
    }
    return he(e, t) ? !0 : Mt(r) ? e.call(()=>Gi(e, t), ...Or(r)) : !1;
}
function Os({ node: e, parent: t }, r) {
    return (r.parentParser === "markdown" || r.parentParser === "mdx") && e.type === "ExpressionStatement" && Y(e.expression) && t.type === "Program" && t.body.length === 1;
}
function ws(e) {
    switch(e.type){
        case "MemberExpression":
            switch(e.property.type){
                case "Identifier":
                case "NumericLiteral":
                case "StringLiteral":
                    return ws(e.object);
            }
            return !1;
        case "Identifier":
            return !0;
        default:
            return !1;
    }
}
function vs({ node: e, parent: t }, r) {
    return (r.parser === "__vue_event_binding" || r.parser === "__vue_ts_event_binding") && e.type === "ExpressionStatement" && t.type === "Program" && t.body.length === 1;
}
function Yi(e, t, r) {
    let n = [
        r("expression")
    ];
    return vs(e, t) ? ws(e.node.expression) && n.push(";") : Os(e, t) || t.semi && n.push(";"), A(e.node, x.Dangling, ({ marker: s })=>s === ir) && n.push(" ", j(e, t, {
        marker: ir
    })), n;
}
function Xi(e, t, r) {
    if (t.__isVueBindings || t.__isVueForBindingLeft) {
        let n = e.map(r, "program", "body", 0, "params");
        if (n.length === 1) return n[0];
        let s = b([
            ",",
            T
        ], n);
        return t.__isVueForBindingLeft ? [
            "(",
            E([
                F,
                m(s)
            ]),
            F,
            ")"
        ] : s;
    }
    if (t.__isEmbeddedTypescriptGenericParameters) {
        let n = e.map(r, "program", "body", 0, "typeParameters", "params");
        return b([
            ",",
            T
        ], n);
    }
}
function Ni(e, t, r, n) {
    let { node: s } = e;
    if (rr(s)) return Ui(e, t);
    let u = t.semi ? ";" : "", i = [];
    switch(s.type){
        case "JsExpressionRoot":
            return r("node");
        case "JsonRoot":
            return [
                r("node"),
                C
            ];
        case "File":
            return Xi(e, t, r) ?? r("program");
        case "Program":
            return Ls(e, t, r);
        case "EmptyStatement":
            return "";
        case "ExpressionStatement":
            return Yi(e, t, r);
        case "ChainExpression":
            return r("expression");
        case "ParenthesizedExpression":
            return !A(s.expression) && (se(s.expression) || G(s.expression)) ? [
                "(",
                r("expression"),
                ")"
            ] : m([
                "(",
                E([
                    F,
                    r("expression")
                ]),
                F,
                ")"
            ]);
        case "AssignmentExpression":
            return ti(e, t, r);
        case "VariableDeclarator":
            return ri(e, t, r);
        case "BinaryExpression":
        case "LogicalExpression":
            return qr(e, t, r);
        case "AssignmentPattern":
            return [
                r("left"),
                " = ",
                r("right")
            ];
        case "OptionalMemberExpression":
        case "MemberExpression":
            return Qu(e, t, r);
        case "MetaProperty":
            return [
                r("meta"),
                ".",
                r("property")
            ];
        case "BindExpression":
            return s.object && i.push(r("object")), i.push(m(E([
                F,
                Ur(e, t, r)
            ]))), i;
        case "Identifier":
            return [
                s.name,
                $(e),
                rn(e),
                X(e, r)
            ];
        case "V8IntrinsicIdentifier":
            return [
                "%",
                s.name
            ];
        case "SpreadElement":
        case "SpreadElementPattern":
        case "SpreadPropertyPattern":
        case "RestElement":
            return nn(e, r);
        case "FunctionDeclaration":
        case "FunctionExpression":
            return Dn(e, r, t, n);
        case "ArrowFunctionExpression":
            return Ri(e, t, r, n);
        case "YieldExpression":
            return i.push("yield"), s.delegate && i.push("*"), s.argument && i.push(" ", r("argument")), i;
        case "AwaitExpression":
            if (i.push("await"), s.argument) {
                i.push(" ", r("argument"));
                let { parent: a } = e;
                if (I(a) && a.callee === s || R(a) && a.object === s) {
                    i = [
                        E([
                            F,
                            ...i
                        ]),
                        F
                    ];
                    let o = e.findAncestor((p)=>p.type === "AwaitExpression" || p.type === "BlockStatement");
                    if ((o == null ? void 0 : o.type) !== "AwaitExpression" || !ie(o.argument, (p)=>p === s)) return m(i);
                }
            }
            return i;
        case "ExportDefaultDeclaration":
        case "ExportNamedDeclaration":
        case "ExportAllDeclaration":
            return un(e, t, r);
        case "ImportDeclaration":
            return Di(e, t, r);
        case "ImportSpecifier":
        case "ExportSpecifier":
        case "ImportNamespaceSpecifier":
        case "ExportNamespaceSpecifier":
        case "ImportDefaultSpecifier":
        case "ExportDefaultSpecifier":
            return Ai(e, t, r);
        case "ImportAttribute":
            return [
                r("key"),
                ": ",
                r("value")
            ];
        case "Import":
            return "import";
        case "BlockStatement":
        case "StaticBlock":
            return Tn(e, t, r);
        case "ClassBody":
            return _i(e, t, r);
        case "ThrowStatement":
            return Li(e, t, r);
        case "ReturnStatement":
            return Ii(e, t, r);
        case "NewExpression":
        case "ImportExpression":
        case "OptionalCallExpression":
        case "CallExpression":
            return Wr(e, t, r);
        case "ObjectExpression":
        case "ObjectPattern":
        case "RecordExpression":
            return Tt(e, t, r);
        case "ObjectProperty":
        case "Property":
            return s.method || s.kind === "get" || s.kind === "set" ? Dr(e, t, r) : Pi(e, t, r);
        case "ObjectMethod":
            return Dr(e, t, r);
        case "Decorator":
            return [
                "@",
                r("expression")
            ];
        case "ArrayExpression":
        case "ArrayPattern":
        case "TupleExpression":
            return qt(e, t, r);
        case "SequenceExpression":
            {
                let { parent: a } = e;
                if (a.type === "ExpressionStatement" || a.type === "ForStatement") {
                    let o = [];
                    return e.each(({ isFirst: p })=>{
                        p ? o.push(r()) : o.push(",", E([
                            T,
                            r()
                        ]));
                    }, "expressions"), m(o);
                }
                return m(b([
                    ",",
                    T
                ], e.map(r, "expressions")));
            }
        case "ThisExpression":
            return "this";
        case "Super":
            return "super";
        case "Directive":
            return [
                r("value"),
                u
            ];
        case "UnaryExpression":
            return i.push(s.operator), /[a-z]$/.test(s.operator) && i.push(" "), A(s.argument) ? i.push(m([
                "(",
                E([
                    F,
                    r("argument")
                ]),
                F,
                ")"
            ])) : i.push(r("argument")), i;
        case "UpdateExpression":
            return i.push(r("argument"), s.operator), s.prefix && i.reverse(), i;
        case "ConditionalExpression":
            return Gt(e, t, r, n);
        case "VariableDeclaration":
            {
                let a = e.map(r, "declarations"), o = e.parent, p = o.type === "ForStatement" || o.type === "ForInStatement" || o.type === "ForOfStatement", D = s.declarations.some((c)=>c.init), y;
                return a.length === 1 && !A(s.declarations[0]) ? y = a[0] : a.length > 0 && (y = E(a[0])), i = [
                    re(e),
                    s.kind,
                    y ? [
                        " ",
                        y
                    ] : "",
                    E(a.slice(1).map((c)=>[
                            ",",
                            D && !p ? C : T,
                            c
                        ]))
                ], p && o.body !== s || i.push(u), m(i);
            }
        case "WithStatement":
            return m([
                "with (",
                r("object"),
                ")",
                Dt(s.body, r("body"))
            ]);
        case "IfStatement":
            {
                let a = Dt(s.consequent, r("consequent")), o = m([
                    "if (",
                    m([
                        E([
                            F,
                            r("test")
                        ]),
                        F
                    ]),
                    ")",
                    a
                ]);
                if (i.push(o), s.alternate) {
                    let p = A(s.consequent, x.Trailing | x.Line) || _r(s), D = s.consequent.type === "BlockStatement" && !p;
                    i.push(D ? " " : C), A(s, x.Dangling) && i.push(j(e, t), p ? C : " "), i.push("else", m(Dt(s.alternate, r("alternate"), s.alternate.type === "IfStatement")));
                }
                return i;
            }
        case "ForStatement":
            {
                let a = Dt(s.body, r("body")), o = j(e, t), p = o ? [
                    o,
                    F
                ] : "";
                return !s.init && !s.test && !s.update ? [
                    p,
                    m([
                        "for (;;)",
                        a
                    ])
                ] : [
                    p,
                    m([
                        "for (",
                        m([
                            E([
                                F,
                                r("init"),
                                ";",
                                T,
                                r("test"),
                                ";",
                                T,
                                r("update")
                            ]),
                            F
                        ]),
                        ")",
                        a
                    ])
                ];
            }
        case "WhileStatement":
            return m([
                "while (",
                m([
                    E([
                        F,
                        r("test")
                    ]),
                    F
                ]),
                ")",
                Dt(s.body, r("body"))
            ]);
        case "ForInStatement":
            return m([
                "for (",
                r("left"),
                " in ",
                r("right"),
                ")",
                Dt(s.body, r("body"))
            ]);
        case "ForOfStatement":
            return m([
                "for",
                s.await ? " await" : "",
                " (",
                r("left"),
                " of ",
                r("right"),
                ")",
                Dt(s.body, r("body"))
            ]);
        case "DoWhileStatement":
            {
                let a = Dt(s.body, r("body"));
                return i = [
                    m([
                        "do",
                        a
                    ])
                ], s.body.type === "BlockStatement" ? i.push(" ") : i.push(C), i.push("while (", m([
                    E([
                        F,
                        r("test")
                    ]),
                    F
                ]), ")", u), i;
            }
        case "DoExpression":
            return [
                s.async ? "async " : "",
                "do ",
                r("body")
            ];
        case "BreakStatement":
        case "ContinueStatement":
            return i.push(s.type === "BreakStatement" ? "break" : "continue"), s.label && i.push(" ", r("label")), i.push(u), i;
        case "LabeledStatement":
            return s.body.type === "EmptyStatement" ? [
                r("label"),
                ":;"
            ] : [
                r("label"),
                ": ",
                r("body")
            ];
        case "TryStatement":
            return [
                "try ",
                r("block"),
                s.handler ? [
                    " ",
                    r("handler")
                ] : "",
                s.finalizer ? [
                    " finally ",
                    r("finalizer")
                ] : ""
            ];
        case "CatchClause":
            if (s.param) {
                let a = A(s.param, (p)=>!Z(p) || p.leading && Q(t.originalText, L(p)) || p.trailing && Q(t.originalText, J(p), {
                        backwards: !0
                    })), o = r("param");
                return [
                    "catch ",
                    a ? [
                        "(",
                        E([
                            F,
                            o
                        ]),
                        F,
                        ") "
                    ] : [
                        "(",
                        o,
                        ") "
                    ],
                    r("body")
                ];
            }
            return [
                "catch ",
                r("body")
            ];
        case "SwitchStatement":
            return [
                m([
                    "switch (",
                    E([
                        F,
                        r("discriminant")
                    ]),
                    F,
                    ")"
                ]),
                " {",
                s.cases.length > 0 ? E([
                    C,
                    b(C, e.map(({ node: a, isLast: o })=>[
                            r(),
                            !o && fe(a, t) ? C : ""
                        ], "cases"))
                ]) : "",
                C,
                "}"
            ];
        case "SwitchCase":
            {
                s.test ? i.push("case ", r("test"), ":") : i.push("default:"), A(s, x.Dangling) && i.push(" ", j(e, t));
                let a = s.consequent.filter((o)=>o.type !== "EmptyStatement");
                if (a.length > 0) {
                    let o = yr(e, t, r, "consequent");
                    i.push(a.length === 1 && a[0].type === "BlockStatement" ? [
                        " ",
                        o
                    ] : E([
                        C,
                        o
                    ]));
                }
                return i;
            }
        case "DebuggerStatement":
            return [
                "debugger",
                u
            ];
        case "ClassDeclaration":
        case "ClassExpression":
            return Fn(e, t, r);
        case "ClassMethod":
        case "ClassPrivateMethod":
        case "MethodDefinition":
            return Cn(e, t, r);
        case "ClassProperty":
        case "PropertyDefinition":
        case "ClassPrivateProperty":
        case "ClassAccessorProperty":
        case "AccessorProperty":
            return An(e, t, r);
        case "TemplateElement":
            return be(s.value.raw);
        case "TemplateLiteral":
            return on(e, r, t);
        case "TaggedTemplateExpression":
            return Si(r);
        case "PrivateIdentifier":
            return [
                "#",
                s.name
            ];
        case "PrivateName":
            return [
                "#",
                r("id")
            ];
        case "TopicReference":
            return "%";
        case "ArgumentPlaceholder":
            return "?";
        case "ModuleExpression":
            {
                i.push("module {");
                let a = r("body");
                return a && i.push(E([
                    C,
                    a
                ]), C), i.push("}"), i;
            }
        case "InterpreterDirective":
        default:
            throw new _e(s, "ESTree");
    }
}
function Vi(e, t, r) {
    let { node: n } = e;
    if (n.type.startsWith("NG")) switch(n.type){
        case "NGRoot":
            return [
                r("node"),
                A(n.node) ? " //" + ot(n.node)[0].value.trimEnd() : ""
            ];
        case "NGPipeExpression":
            return qr(e, t, r);
        case "NGChainedExpression":
            return m(b([
                ";",
                T
            ], e.map(()=>il(e) ? r() : [
                    "(",
                    r(),
                    ")"
                ], "expressions")));
        case "NGEmptyExpression":
            return "";
        case "NGMicrosyntax":
            return e.map(()=>[
                    e.isFirst ? "" : $i(e) ? " " : [
                        ";",
                        T
                    ],
                    r()
                ], "body");
        case "NGMicrosyntaxKey":
            return /^[$_a-z][\w$]*(?:-[$_a-z][\w$])*$/i.test(n.name) ? n.name : JSON.stringify(n.name);
        case "NGMicrosyntaxExpression":
            return [
                r("expression"),
                n.alias === null ? "" : [
                    " as ",
                    r("alias")
                ]
            ];
        case "NGMicrosyntaxKeyedExpression":
            {
                let { index: s, parent: u } = e, i = $i(e) || (s === 1 && (n.key.name === "then" || n.key.name === "else" || n.key.name === "as") || s === 2 && (n.key.name === "else" && u.body[s - 1].type === "NGMicrosyntaxKeyedExpression" && u.body[s - 1].key.name === "then" || n.key.name === "track")) && u.body[0].type === "NGMicrosyntaxExpression";
                return [
                    r("key"),
                    i ? " " : ": ",
                    r("expression")
                ];
            }
        case "NGMicrosyntaxLet":
            return [
                "let ",
                r("key"),
                n.value === null ? "" : [
                    " = ",
                    r("value")
                ]
            ];
        case "NGMicrosyntaxAs":
            return [
                r("key"),
                " as ",
                r("alias")
            ];
        default:
            throw new _e(n, "Angular");
    }
}
function $i({ node: e, index: t }) {
    return e.type === "NGMicrosyntaxKeyedExpression" && e.key.name === "of" && t === 1;
}
var ul = q([
    "CallExpression",
    "OptionalCallExpression",
    "AssignmentExpression"
]);
function il({ node: e }) {
    return er(e, ul);
}
function xn(e, t, r) {
    let { parent: n, node: s } = e, u = [];
    switch(s.type){
        case "AsConstExpression":
            u = [
                r("expression"),
                " as const"
            ];
            break;
        case "AsExpression":
        case "TSAsExpression":
            u = [
                r("expression"),
                " ",
                "as",
                " ",
                r("typeAnnotation")
            ];
            break;
        case "SatisfiesExpression":
        case "TSSatisfiesExpression":
            u = [
                r("expression"),
                " ",
                "satisfies",
                " ",
                r("typeAnnotation")
            ];
            break;
    }
    return I(n) && n.callee === s || R(n) && n.object === s ? m([
        E([
            F,
            ...u
        ]),
        F
    ]) : u;
}
function gn(e, t, r) {
    let { node: n } = e, s = [
        re(e),
        "interface"
    ], u = [], i = [];
    n.type !== "InterfaceTypeAnnotation" && u.push(" ", r("id"), r("typeParameters"));
    let a = n.typeParameters && !A(n.typeParameters, x.Trailing | x.Line);
    return k(n.extends) && i.push(a ? B(" ", T, {
        groupId: mr(n.typeParameters)
    }) : T, "extends ", (n.extends.length === 1 ? Su : E)(b([
        ",",
        T
    ], e.map(r, "extends")))), A(n.id, x.Trailing) || k(n.extends) ? a ? s.push(m([
        ...u,
        E(i)
    ])) : s.push(m(E([
        ...u,
        ...i
    ]))) : s.push(...u, ...i), s.push(" ", r("body")), m(s);
}
function Ki(e, t, r) {
    return Tt(e, r, t);
}
function hn(e, t) {
    let { node: r } = e, n = t("id");
    r.computed && (n = [
        "[",
        n,
        "]"
    ]);
    let s = "";
    return r.initializer && (s = t("initializer")), r.init && (s = t("init")), s ? [
        n,
        " = ",
        s
    ] : n;
}
function Hi(e, t, r) {
    let { node: n } = e, s;
    if (n.type === "EnumSymbolBody" || n.explicitType) switch(n.type){
        case "EnumBooleanBody":
            s = "boolean";
            break;
        case "EnumNumberBody":
            s = "number";
            break;
        case "EnumStringBody":
            s = "string";
            break;
        case "EnumSymbolBody":
            s = "symbol";
            break;
    }
    return [
        s ? `of ${s} ` : "",
        Ki(e, t, r)
    ];
}
function Sn(e, t, r) {
    let { node: n } = e;
    return [
        re(e),
        n.const ? "const " : "",
        "enum ",
        t("id"),
        " ",
        n.type === "TSEnumDeclaration" ? Ki(e, t, r) : t("body")
    ];
}
function zi(e, t, r) {
    let { node: n } = e;
    if (kr(n)) return n.type.slice(0, -14).toLowerCase();
    let s = t.semi ? ";" : "";
    switch(n.type){
        case "DeclareClass":
            return Fn(e, t, r);
        case "DeclareFunction":
            return [
                re(e),
                "function ",
                r("id"),
                r("predicate"),
                s
            ];
        case "DeclareModule":
            return [
                "declare module ",
                r("id"),
                " ",
                r("body")
            ];
        case "DeclareModuleExports":
            return [
                "declare module.exports",
                X(e, r),
                s
            ];
        case "DeclareVariable":
            return [
                re(e),
                n.kind ?? "var",
                " ",
                r("id"),
                s
            ];
        case "DeclareExportDeclaration":
        case "DeclareExportAllDeclaration":
            return un(e, t, r);
        case "DeclareOpaqueType":
        case "OpaqueType":
            return ii(e, t, r);
        case "DeclareTypeAlias":
        case "TypeAlias":
            return Yr(e, t, r);
        case "IntersectionTypeAnnotation":
            return Xr(e, t, r);
        case "UnionTypeAnnotation":
            return Nr(e, t, r);
        case "ConditionalTypeAnnotation":
            return Gt(e, t, r);
        case "InferTypeAnnotation":
            return Kr(e, t, r);
        case "FunctionTypeAnnotation":
            return $r(e, t, r);
        case "TupleTypeAnnotation":
            return qt(e, t, r);
        case "TupleTypeLabeledElement":
            return zr(e, t, r);
        case "TupleTypeSpreadElement":
            return Hr(e, t, r);
        case "GenericTypeAnnotation":
            return [
                r("id"),
                bt(e, t, r, "typeParameters")
            ];
        case "IndexedAccessType":
        case "OptionalIndexedAccessType":
            return Vr(e, t, r);
        case "TypeAnnotation":
            return Qr(e, t, r);
        case "TypeParameter":
            return ln(e, t, r);
        case "TypeofTypeAnnotation":
            return en(e, r);
        case "ExistsTypeAnnotation":
            return "*";
        case "ArrayTypeAnnotation":
            return Zr(r);
        case "DeclareEnum":
        case "EnumDeclaration":
            return Sn(e, r, t);
        case "EnumBooleanBody":
        case "EnumNumberBody":
        case "EnumStringBody":
        case "EnumSymbolBody":
            return Hi(e, r, t);
        case "EnumBooleanMember":
        case "EnumNumberMember":
        case "EnumStringMember":
        case "EnumDefaultedMember":
            return hn(e, r);
        case "FunctionTypeParam":
            {
                let u = n.name ? r("name") : e.parent.this === n ? "this" : "";
                return [
                    u,
                    $(e),
                    u ? ": " : "",
                    r("typeAnnotation")
                ];
            }
        case "DeclareInterface":
        case "InterfaceDeclaration":
        case "InterfaceTypeAnnotation":
            return gn(e, t, r);
        case "ClassImplements":
        case "InterfaceExtends":
            return [
                r("id"),
                r("typeParameters")
            ];
        case "NullableTypeAnnotation":
            return [
                "?",
                r("typeAnnotation")
            ];
        case "Variance":
            {
                let { kind: u } = n;
                return sn.ok(u === "plus" || u === "minus"), u === "plus" ? "+" : "-";
            }
        case "KeyofTypeAnnotation":
            return [
                "keyof ",
                r("argument")
            ];
        case "ObjectTypeCallProperty":
            return [
                n.static ? "static " : "",
                r("value")
            ];
        case "ObjectTypeMappedTypeProperty":
            return Bi(e, t, r);
        case "ObjectTypeIndexer":
            return [
                n.static ? "static " : "",
                n.variance ? r("variance") : "",
                "[",
                r("id"),
                n.id ? ": " : "",
                r("key"),
                "]: ",
                r("value")
            ];
        case "ObjectTypeProperty":
            {
                let u = "";
                return n.proto ? u = "proto " : n.static && (u = "static "), [
                    u,
                    Gn(n) ? n.kind + " " : "",
                    n.variance ? r("variance") : "",
                    yt(e, t, r),
                    $(e),
                    Yn(n) ? "" : ": ",
                    r("value")
                ];
            }
        case "ObjectTypeAnnotation":
            return Tt(e, t, r);
        case "ObjectTypeInternalSlot":
            return [
                n.static ? "static " : "",
                "[[",
                r("id"),
                "]]",
                $(e),
                n.method ? "" : ": ",
                r("value")
            ];
        case "ObjectTypeSpreadProperty":
            return nn(e, r);
        case "QualifiedTypeofIdentifier":
        case "QualifiedTypeIdentifier":
            return [
                r("qualification"),
                ".",
                r("id")
            ];
        case "NullLiteralTypeAnnotation":
            return "null";
        case "BooleanLiteralTypeAnnotation":
            return String(n.value);
        case "StringLiteralTypeAnnotation":
            return be(at(De(n), t));
        case "NumberLiteralTypeAnnotation":
            return He(n.raw ?? n.extra.raw);
        case "BigIntLiteralTypeAnnotation":
            return dn(n.raw ?? n.extra.raw);
        case "TypeCastExpression":
            return [
                "(",
                r("expression"),
                X(e, r),
                ")"
            ];
        case "TypePredicate":
            return tn(e, r);
        case "TypeParameterDeclaration":
        case "TypeParameterInstantiation":
            return bt(e, t, r, "params");
        case "InferredPredicate":
        case "DeclaredPredicate":
            return [
                e.key === "predicate" && e.parent.type !== "DeclareFunction" && !e.parent.returnType ? ": " : " ",
                "%checks",
                ...n.type === "DeclaredPredicate" ? [
                    "(",
                    r("value"),
                    ")"
                ] : []
            ];
        case "AsExpression":
        case "AsConstExpression":
        case "SatisfiesExpression":
            return xn(e, t, r);
    }
}
function Qi(e, t, r) {
    var i;
    let { node: n } = e;
    if (!n.type.startsWith("TS")) return;
    if (Ir(n)) return n.type.slice(2, -7).toLowerCase();
    let s = t.semi ? ";" : "", u = [];
    switch(n.type){
        case "TSThisType":
            return "this";
        case "TSTypeAssertion":
            {
                let a = !(G(n.expression) || se(n.expression)), o = m([
                    "<",
                    E([
                        F,
                        r("typeAnnotation")
                    ]),
                    F,
                    ">"
                ]), p = [
                    B("("),
                    E([
                        F,
                        r("expression")
                    ]),
                    F,
                    B(")")
                ];
                return a ? Xe([
                    [
                        o,
                        r("expression")
                    ],
                    [
                        o,
                        m(p, {
                            shouldBreak: !0
                        })
                    ],
                    [
                        o,
                        r("expression")
                    ]
                ]) : m([
                    o,
                    r("expression")
                ]);
            }
        case "TSDeclareFunction":
            return Dn(e, r, t);
        case "TSExportAssignment":
            return [
                "export = ",
                r("expression"),
                s
            ];
        case "TSModuleBlock":
            return Tn(e, t, r);
        case "TSInterfaceBody":
        case "TSTypeLiteral":
            return Tt(e, t, r);
        case "TSTypeAliasDeclaration":
            return Yr(e, t, r);
        case "TSQualifiedName":
            return [
                r("left"),
                ".",
                r("right")
            ];
        case "TSAbstractMethodDefinition":
        case "TSDeclareMethod":
            return Cn(e, t, r);
        case "TSAbstractAccessorProperty":
        case "TSAbstractPropertyDefinition":
            return An(e, t, r);
        case "TSInterfaceHeritage":
        case "TSClassImplements":
        case "TSExpressionWithTypeArguments":
        case "TSInstantiationExpression":
            return [
                r("expression"),
                r("typeParameters")
            ];
        case "TSTemplateLiteralType":
            return on(e, r, t);
        case "TSNamedTupleMember":
            return zr(e, t, r);
        case "TSRestType":
            return Hr(e, t, r);
        case "TSOptionalType":
            return [
                r("typeAnnotation"),
                "?"
            ];
        case "TSInterfaceDeclaration":
            return gn(e, t, r);
        case "TSTypeParameterDeclaration":
        case "TSTypeParameterInstantiation":
            return bt(e, t, r, "params");
        case "TSTypeParameter":
            return ln(e, t, r);
        case "TSAsExpression":
        case "TSSatisfiesExpression":
            return xn(e, t, r);
        case "TSArrayType":
            return Zr(r);
        case "TSPropertySignature":
            return [
                n.readonly ? "readonly " : "",
                yt(e, t, r),
                $(e),
                X(e, r)
            ];
        case "TSParameterProperty":
            return [
                Wt(n),
                n.static ? "static " : "",
                n.override ? "override " : "",
                n.readonly ? "readonly " : "",
                r("parameter")
            ];
        case "TSTypeQuery":
            return en(e, r);
        case "TSIndexSignature":
            {
                let a = n.parameters.length > 1 ? B(ye(t) ? "," : "") : "", o = m([
                    E([
                        F,
                        b([
                            ", ",
                            F
                        ], e.map(r, "parameters"))
                    ]),
                    a,
                    F
                ]), p = e.parent.type === "ClassBody" && e.key === "body";
                return [
                    p && n.static ? "static " : "",
                    n.readonly ? "readonly " : "",
                    "[",
                    n.parameters ? o : "",
                    "]",
                    X(e, r),
                    p ? s : ""
                ];
            }
        case "TSTypePredicate":
            return tn(e, r);
        case "TSNonNullExpression":
            return [
                r("expression"),
                "!"
            ];
        case "TSImportType":
            return [
                n.isTypeOf ? "typeof " : "",
                "import(",
                r("argument"),
                ")",
                n.qualifier ? [
                    ".",
                    r("qualifier")
                ] : "",
                bt(e, t, r, n.typeArguments ? "typeArguments" : "typeParameters")
            ];
        case "TSLiteralType":
            return r("literal");
        case "TSIndexedAccessType":
            return Vr(e, t, r);
        case "TSTypeOperator":
            return [
                n.operator,
                " ",
                r("typeAnnotation")
            ];
        case "TSMappedType":
            return bi(e, t, r);
        case "TSMethodSignature":
            {
                let a = n.kind && n.kind !== "method" ? `${n.kind} ` : "";
                u.push(Wt(n), a, n.computed ? "[" : "", r("key"), n.computed ? "]" : "", $(e));
                let o = mt(e, r, t, !1, !0), p = n.returnType ? "returnType" : "typeAnnotation", D = n[p], y = D ? X(e, r, p) : "", c = Bt(n, y);
                return u.push(c ? m(o) : o), D && u.push(m(y)), m(u);
            }
        case "TSNamespaceExportDeclaration":
            return [
                "export as namespace ",
                r("id"),
                t.semi ? ";" : ""
            ];
        case "TSEnumDeclaration":
            return Sn(e, r, t);
        case "TSEnumMember":
            return hn(e, r);
        case "TSImportEqualsDeclaration":
            return [
                n.isExport ? "export " : "",
                "import ",
                As(n, !1),
                r("id"),
                " = ",
                r("moduleReference"),
                t.semi ? ";" : ""
            ];
        case "TSExternalModuleReference":
            return [
                "require(",
                r("expression"),
                ")"
            ];
        case "TSModuleDeclaration":
            {
                let { parent: a } = e, o = a.type === "TSModuleDeclaration", p = ((i = n.body) == null ? void 0 : i.type) === "TSModuleDeclaration";
                if (o) u.push(".");
                else if (u.push(re(e)), !(n.kind === "global" || n.global)) {
                    let y = n.kind ?? (ee(n.id) || /(?:^|\s)module(?:\s|$)/.test(t.originalText.slice(J(n), J(n.id))) ? "module" : "namespace");
                    u.push(y, " ");
                }
                return u.push(r("id")), p ? u.push(r("body")) : n.body ? u.push(" ", m(r("body"))) : u.push(s), u;
            }
        case "TSConditionalType":
            return Gt(e, t, r);
        case "TSInferType":
            return Kr(e, t, r);
        case "TSIntersectionType":
            return Xr(e, t, r);
        case "TSUnionType":
            return Nr(e, t, r);
        case "TSFunctionType":
        case "TSCallSignatureDeclaration":
        case "TSConstructorType":
        case "TSConstructSignatureDeclaration":
            return $r(e, t, r);
        case "TSTupleType":
            return qt(e, t, r);
        case "TSTypeReference":
            return [
                r("typeName"),
                bt(e, t, r, "typeParameters")
            ];
        case "TSTypeAnnotation":
            return Qr(e, t, r);
        case "TSEmptyBodyFunctionExpression":
            return yn(e, t, r);
        case "TSJSDocAllType":
            return "*";
        case "TSJSDocUnknownType":
            return "?";
        case "TSJSDocNullableType":
            return Es(e, r, "?");
        case "TSJSDocNonNullableType":
            return Es(e, r, "!");
        case "TSParenthesizedType":
        default:
            throw new _e(n, "TypeScript");
    }
}
function al(e, t, r, n) {
    if (Jr(e)) return Ns(e, t);
    for (let s of [
        Vi,
        $u,
        zi,
        Qi,
        Ni
    ]){
        let u = s(e, t, r, n);
        if (u !== void 0) return u;
    }
}
var ol = q([
    "ClassMethod",
    "ClassPrivateMethod",
    "ClassProperty",
    "ClassAccessorProperty",
    "AccessorProperty",
    "TSAbstractAccessorProperty",
    "PropertyDefinition",
    "TSAbstractPropertyDefinition",
    "ClassPrivateProperty",
    "MethodDefinition",
    "TSAbstractMethodDefinition",
    "TSDeclareMethod"
]);
function pl(e, t, r, n) {
    var y;
    e.isRoot && ((y = t.__onHtmlBindingRoot) == null || y.call(t, e.node, t));
    let s = al(e, t, r, n);
    if (!s) return "";
    let { node: u } = e;
    if (ol(u)) return s;
    let i = k(u.decorators), a = ci(e, t, r), o = u.type === "ClassExpression";
    if (i && !o) return Ht(s, (c)=>m([
            a,
            c
        ]));
    let p = he(e, t), D = Wi(e, t);
    return !a && !p && !D ? s : Ht(s, (c)=>[
            D ? ";" : "",
            p ? "(" : "",
            p && o && i ? [
                E([
                    T,
                    a,
                    c
                ]),
                T
            ] : [
                a,
                c
            ],
            p ? ")" : ""
        ]);
}
var Zi = pl;
var ta = [
    (e, t)=>e.type === "ObjectExpression" && t === "properties",
    (e, t)=>e.type === "CallExpression" && e.callee.type === "Identifier" && e.callee.name === "Component" && t === "arguments",
    (e, t)=>e.type === "Decorator" && t === "expression"
];
function ra(e) {
    return e.match((t)=>t.type === "TemplateLiteral", (t, r)=>G(t) && r === "elements", (t, r)=>Ce(t) && t.key.type === "Identifier" && t.key.name === "styles" && r === "value", ...ta);
}
function na(e) {
    return e.match((t)=>t.type === "TemplateLiteral", (t, r)=>Ce(t) && t.key.type === "Identifier" && t.key.name === "template" && r === "value", ...ta);
}
function ea(e, t) {
    return A(e, x.Block | x.Leading, ({ value: r })=>r === ` ${t} `);
}
function Bn({ node: e, parent: t }, r) {
    return ea(e, r) || cl(t) && ea(t, r);
}
function cl(e) {
    return e.type === "AsConstExpression" || e.type === "TSAsExpression" && e.typeAnnotation.type === "TSTypeReference" && e.typeAnnotation.typeName.type === "Identifier" && e.typeAnnotation.typeName.name === "const";
}
async function ll(e, t, r) {
    let { node: n } = r, s = n.quasis.map((D)=>D.value.raw), u = 0, i = s.reduce((D, y, c)=>c === 0 ? y : D + "@prettier-placeholder-" + u++ + "-id" + y, ""), a = await e(i, {
        parser: "scss"
    }), o = Yt(r, t), p = ml(a, o);
    if (!p) throw new Error("Couldn't insert all the expressions");
    return [
        "`",
        E([
            C,
            p
        ]),
        F,
        "`"
    ];
}
function ml(e, t) {
    if (!k(t)) return e;
    let r = 0, n = it(Ot(e), (s)=>typeof s != "string" || !s.includes("@prettier-placeholder") ? s : s.split(/@prettier-placeholder-(\d+)-id/).map((u, i)=>i % 2 === 0 ? be(u) : (r++, t[u])));
    return t.length === r ? n : null;
}
function Dl({ node: e, parent: t, grandparent: r }) {
    return r && e.quasis && t.type === "JSXExpressionContainer" && r.type === "JSXElement" && r.openingElement.name.name === "style" && r.openingElement.attributes.some((n)=>n.name.name === "jsx") || (t == null ? void 0 : t.type) === "TaggedTemplateExpression" && t.tag.type === "Identifier" && t.tag.name === "css" || (t == null ? void 0 : t.type) === "TaggedTemplateExpression" && t.tag.type === "MemberExpression" && t.tag.object.name === "css" && (t.tag.property.name === "global" || t.tag.property.name === "resolve");
}
function bn(e) {
    return e.type === "Identifier" && e.name === "styled";
}
function sa(e) {
    return /^[A-Z]/.test(e.object.name) && e.property.name === "extend";
}
function yl({ parent: e }) {
    if (!e || e.type !== "TaggedTemplateExpression") return !1;
    let t = e.tag.type === "ParenthesizedExpression" ? e.tag.expression : e.tag;
    switch(t.type){
        case "MemberExpression":
            return bn(t.object) || sa(t);
        case "CallExpression":
            return bn(t.callee) || t.callee.type === "MemberExpression" && (t.callee.object.type === "MemberExpression" && (bn(t.callee.object.object) || sa(t.callee.object)) || t.callee.object.type === "CallExpression" && bn(t.callee.object.callee));
        case "Identifier":
            return t.name === "css";
        default:
            return !1;
    }
}
function fl({ parent: e, grandparent: t }) {
    return (t == null ? void 0 : t.type) === "JSXAttribute" && e.type === "JSXExpressionContainer" && t.name.type === "JSXIdentifier" && t.name.name === "css";
}
function El(e) {
    if (Dl(e) || yl(e) || fl(e) || ra(e)) return ll;
}
var ua = El;
async function Fl(e, t, r) {
    let { node: n } = r, s = n.quasis.length, u = Yt(r, t), i = [];
    for(let a = 0; a < s; a++){
        let o = n.quasis[a], p = a === 0, D = a === s - 1, y = o.value.cooked, c = y.split(`
`), f = c.length, l = u[a], h = f > 2 && c[0].trim() === "" && c[1].trim() === "", g = f > 2 && c[f - 1].trim() === "" && c[f - 2].trim() === "", S = c.every((v)=>/^\s*(?:#[^\n\r]*)?$/.test(v));
        if (!D && /#[^\n\r]*$/.test(c[f - 1])) return null;
        let P = null;
        S ? P = Cl(c) : P = await e(y, {
            parser: "graphql"
        }), P ? (P = pn(P, !1), !p && h && i.push(""), i.push(P), !D && g && i.push("")) : !p && !D && h && i.push(""), l && i.push(l);
    }
    return [
        "`",
        E([
            C,
            b(C, i)
        ]),
        C,
        "`"
    ];
}
function Cl(e) {
    let t = [], r = !1, n = e.map((s)=>s.trim());
    for (let [s, u] of n.entries())u !== "" && (n[s - 1] === "" && r ? t.push([
        C,
        u
    ]) : t.push(u), r = !0);
    return t.length === 0 ? null : b(C, t);
}
function Al({ node: e, parent: t }) {
    return Bn({
        node: e,
        parent: t
    }, "GraphQL") || t && (t.type === "TaggedTemplateExpression" && (t.tag.type === "MemberExpression" && t.tag.object.name === "graphql" && t.tag.property.name === "experimental" || t.tag.type === "Identifier" && (t.tag.name === "gql" || t.tag.name === "graphql")) || t.type === "CallExpression" && t.callee.type === "Identifier" && t.callee.name === "graphql");
}
function Tl(e) {
    if (Al(e)) return Fl;
}
var ia = Tl;
var _s = 0;
async function aa(e, t, r, n, s) {
    let { node: u } = n, i = _s;
    _s = _s + 1 >>> 0;
    let a = (S)=>`PRETTIER_HTML_PLACEHOLDER_${S}_${i}_IN_JS`, o = u.quasis.map((S, P, v)=>P === v.length - 1 ? S.value.cooked : S.value.cooked + a(P)).join(""), p = Yt(n, r), D = new RegExp(a("(\\d+)"), "g"), y = 0, c = await t(o, {
        parser: e,
        __onHtmlRoot (S) {
            y = S.children.length;
        }
    }), f = it(c, (S)=>{
        if (typeof S != "string") return S;
        let P = [], v = S.split(D);
        for(let M = 0; M < v.length; M++){
            let _ = v[M];
            if (M % 2 === 0) {
                _ && (_ = Ss(_), s.__embeddedInHtml && (_ = K(!1, _, /<\/(?=script\b)/gi, "<\\/")), P.push(_));
                continue;
            }
            let d = Number(_);
            P.push(p[d]);
        }
        return P;
    }), l = /^\s/.test(o) ? " " : "", h = /\s$/.test(o) ? " " : "", g = s.htmlWhitespaceSensitivity === "ignore" ? C : l && h ? T : null;
    return g ? m([
        "`",
        E([
            g,
            m(f)
        ]),
        g,
        "`"
    ]) : tt({
        hug: !1
    }, m([
        "`",
        l,
        y > 1 ? E(m(f)) : m(f),
        h,
        "`"
    ]));
}
function dl(e) {
    return Bn(e, "HTML") || e.match((t)=>t.type === "TemplateLiteral", (t, r)=>t.type === "TaggedTemplateExpression" && t.tag.type === "Identifier" && t.tag.name === "html" && r === "quasi");
}
var xl = aa.bind(void 0, "html"), gl = aa.bind(void 0, "angular");
function hl(e) {
    if (dl(e)) return xl;
    if (na(e)) return gl;
}
var oa = hl;
async function Sl(e, t, r) {
    let { node: n } = r, s = K(!1, n.quasis[0].value.raw, /((?:\\\\)*)\\`/g, (o, p)=>"\\".repeat(p.length / 2) + "`"), u = Bl(s), i = u !== "";
    i && (s = K(!1, s, new RegExp(`^${u}`, "gm"), ""));
    let a = pn(await e(s, {
        parser: "markdown",
        __inJsTemplate: !0
    }), !0);
    return [
        "`",
        i ? E([
            F,
            a
        ]) : [
            xr,
            Ks(a)
        ],
        F,
        "`"
    ];
}
function Bl(e) {
    let t = e.match(/^([^\S\n]*)\S/m);
    return t === null ? "" : t[1];
}
function bl(e) {
    if (Pl(e)) return Sl;
}
function Pl({ node: e, parent: t }) {
    return (t == null ? void 0 : t.type) === "TaggedTemplateExpression" && e.quasis.length === 1 && t.tag.type === "Identifier" && (t.tag.name === "md" || t.tag.name === "markdown");
}
var pa = bl;
function kl(e) {
    let { node: t } = e;
    if (t.type !== "TemplateLiteral" || Il(t)) return;
    let r;
    for (let n of [
        ua,
        ia,
        oa,
        pa
    ])if (r = n(e), !!r) return t.quasis.length === 1 && t.quasis[0].value.raw.trim() === "" ? "``" : async (...s)=>{
        let u = await r(...s);
        return u && tt({
            embed: !0,
            ...u.label
        }, u);
    };
}
function Il({ quasis: e }) {
    return e.some(({ value: { cooked: t } })=>t === null);
}
var ca = kl;
var Ll = new Set([
    "range",
    "raw",
    "comments",
    "leadingComments",
    "trailingComments",
    "innerComments",
    "extra",
    "start",
    "end",
    "loc",
    "flags",
    "errors",
    "tokens"
]), Xt = (e)=>{
    for (let t of e.quasis)delete t.value;
};
function la(e, t, r) {
    var s, u;
    if (e.type === "Program" && delete t.sourceType, (e.type === "BigIntLiteral" || e.type === "BigIntLiteralTypeAnnotation") && t.value && (t.value = t.value.toLowerCase()), (e.type === "BigIntLiteral" || e.type === "Literal") && t.bigint && (t.bigint = t.bigint.toLowerCase()), e.type === "DecimalLiteral" && (t.value = Number(t.value)), e.type === "Literal" && t.decimal && (t.decimal = Number(t.decimal)), e.type === "EmptyStatement" || e.type === "JSXText" || e.type === "JSXExpressionContainer" && (e.expression.type === "Literal" || e.expression.type === "StringLiteral") && e.expression.value === " ") return null;
    if ((e.type === "Property" || e.type === "ObjectProperty" || e.type === "MethodDefinition" || e.type === "ClassProperty" || e.type === "ClassMethod" || e.type === "PropertyDefinition" || e.type === "TSDeclareMethod" || e.type === "TSPropertySignature" || e.type === "ObjectTypeProperty") && typeof e.key == "object" && e.key && (e.key.type === "Literal" || e.key.type === "NumericLiteral" || e.key.type === "StringLiteral" || e.key.type === "Identifier") && delete t.key, e.type === "JSXElement" && e.openingElement.name.name === "style" && e.openingElement.attributes.some((i)=>i.type === "JSXAttribute" && i.name.name === "jsx")) for (let { type: i, expression: a } of t.children)i === "JSXExpressionContainer" && a.type === "TemplateLiteral" && Xt(a);
    e.type === "JSXAttribute" && e.name.name === "css" && e.value.type === "JSXExpressionContainer" && e.value.expression.type === "TemplateLiteral" && Xt(t.value.expression), e.type === "JSXAttribute" && ((s = e.value) == null ? void 0 : s.type) === "Literal" && /["']|&quot;|&apos;/.test(e.value.value) && (t.value.value = K(!1, t.value.value, /["']|&quot;|&apos;/g, '"'));
    let n = e.expression || e.callee;
    if (e.type === "Decorator" && n.type === "CallExpression" && n.callee.name === "Component" && n.arguments.length === 1) {
        let i = e.expression.arguments[0].properties;
        for (let [a, o] of t.expression.arguments[0].properties.entries())switch(i[a].key.name){
            case "styles":
                G(o.value) && Xt(o.value.elements[0]);
                break;
            case "template":
                o.value.type === "TemplateLiteral" && Xt(o.value);
                break;
        }
    }
    if (e.type === "TaggedTemplateExpression" && (e.tag.type === "MemberExpression" || e.tag.type === "Identifier" && (e.tag.name === "gql" || e.tag.name === "graphql" || e.tag.name === "css" || e.tag.name === "md" || e.tag.name === "markdown" || e.tag.name === "html") || e.tag.type === "CallExpression") && Xt(t.quasi), e.type === "TemplateLiteral" && ((u = e.leadingComments) != null && u.some((a)=>Z(a) && [
            "GraphQL",
            "HTML"
        ].some((o)=>a.value === ` ${o} `)) || r.type === "CallExpression" && r.callee.name === "graphql" || !e.leadingComments) && Xt(t), (e.type === "TSIntersectionType" || e.type === "TSUnionType") && e.types.length === 1) return t.types[0];
    e.type === "ChainExpression" && e.expression.type === "TSNonNullExpression" && ([t.type, t.expression.type] = [
        t.expression.type,
        t.type
    ]);
}
la.ignoredProperties = Ll;
var ma = la;
var dt = qa(Aa(), 1);
function Ul(e) {
    if (!e.startsWith("#!")) return "";
    let t = e.indexOf(`
`);
    return t === -1 ? e : e.slice(0, t);
}
var Ta = Ul;
function Wl(e) {
    let t = Ta(e);
    t && (e = e.slice(t.length + 1));
    let r = (0, dt.extract)(e), { pragmas: n, comments: s } = (0, dt.parseWithComments)(r);
    return {
        shebang: t,
        text: e,
        pragmas: n,
        comments: s
    };
}
function da(e) {
    let { shebang: t, text: r, pragmas: n, comments: s } = Wl(e), u = (0, dt.strip)(r), i = (0, dt.print)({
        pragmas: {
            format: "",
            ...n
        },
        comments: s.trimStart()
    });
    return (t ? `${t}
` : "") + i + (u.startsWith(`
`) ? `
` : `

`) + u;
}
var Gl = {
    avoidAstMutation: !0
};
var xa = [
    {
        linguistLanguageId: 183,
        name: "JavaScript",
        type: "programming",
        tmScope: "source.js",
        aceMode: "javascript",
        codemirrorMode: "javascript",
        codemirrorMimeType: "text/javascript",
        color: "#f1e05a",
        aliases: [
            "js",
            "node"
        ],
        extensions: [
            ".js",
            "._js",
            ".bones",
            ".cjs",
            ".es",
            ".es6",
            ".frag",
            ".gs",
            ".jake",
            ".javascript",
            ".jsb",
            ".jscad",
            ".jsfl",
            ".jslib",
            ".jsm",
            ".jspre",
            ".jss",
            ".mjs",
            ".njs",
            ".pac",
            ".sjs",
            ".ssjs",
            ".xsjs",
            ".xsjslib",
            ".wxs"
        ],
        filenames: [
            "Jakefile"
        ],
        interpreters: [
            "chakra",
            "d8",
            "gjs",
            "js",
            "node",
            "nodejs",
            "qjs",
            "rhino",
            "v8",
            "v8-shell",
            "zx"
        ],
        parsers: [
            "babel",
            "acorn",
            "espree",
            "meriyah",
            "babel-flow",
            "babel-ts",
            "flow",
            "typescript"
        ],
        vscodeLanguageIds: [
            "javascript",
            "mongo"
        ]
    },
    {
        linguistLanguageId: 183,
        name: "Flow",
        type: "programming",
        tmScope: "source.js",
        aceMode: "javascript",
        codemirrorMode: "javascript",
        codemirrorMimeType: "text/javascript",
        color: "#f1e05a",
        aliases: [],
        extensions: [
            ".js.flow"
        ],
        filenames: [],
        interpreters: [
            "chakra",
            "d8",
            "gjs",
            "js",
            "node",
            "nodejs",
            "qjs",
            "rhino",
            "v8",
            "v8-shell"
        ],
        parsers: [
            "flow",
            "babel-flow"
        ],
        vscodeLanguageIds: [
            "javascript"
        ]
    },
    {
        linguistLanguageId: 183,
        name: "JSX",
        type: "programming",
        tmScope: "source.js.jsx",
        aceMode: "javascript",
        codemirrorMode: "jsx",
        codemirrorMimeType: "text/jsx",
        color: void 0,
        aliases: void 0,
        extensions: [
            ".jsx"
        ],
        filenames: void 0,
        interpreters: void 0,
        parsers: [
            "babel",
            "babel-flow",
            "babel-ts",
            "flow",
            "typescript",
            "espree",
            "meriyah"
        ],
        vscodeLanguageIds: [
            "javascriptreact"
        ],
        group: "JavaScript"
    },
    {
        linguistLanguageId: 378,
        name: "TypeScript",
        type: "programming",
        color: "#3178c6",
        aliases: [
            "ts"
        ],
        interpreters: [
            "deno",
            "ts-node"
        ],
        extensions: [
            ".ts",
            ".cts",
            ".mts"
        ],
        tmScope: "source.ts",
        aceMode: "typescript",
        codemirrorMode: "javascript",
        codemirrorMimeType: "application/typescript",
        parsers: [
            "typescript",
            "babel-ts"
        ],
        vscodeLanguageIds: [
            "typescript"
        ]
    },
    {
        linguistLanguageId: 94901924,
        name: "TSX",
        type: "programming",
        color: "#3178c6",
        group: "TypeScript",
        extensions: [
            ".tsx"
        ],
        tmScope: "source.tsx",
        aceMode: "javascript",
        codemirrorMode: "jsx",
        codemirrorMimeType: "text/jsx",
        parsers: [
            "typescript",
            "babel-ts"
        ],
        vscodeLanguageIds: [
            "typescriptreact"
        ]
    }
];
var Ms = {};
Cr(Ms, {
    getVisitorKeys: ()=>ha,
    massageAstNode: ()=>Ba,
    print: ()=>Nl
});
var Yl = {
    JsonRoot: [
        "node"
    ],
    ArrayExpression: [
        "elements"
    ],
    ObjectExpression: [
        "properties"
    ],
    ObjectProperty: [
        "key",
        "value"
    ],
    UnaryExpression: [
        "argument"
    ],
    NullLiteral: [],
    BooleanLiteral: [],
    StringLiteral: [],
    NumericLiteral: [],
    Identifier: [],
    TemplateLiteral: [
        "quasis"
    ],
    TemplateElement: []
}, ga = Yl;
var Xl = Sr(ga), ha = Xl;
function Nl(e, t, r) {
    let { node: n } = e;
    switch(n.type){
        case "JsonRoot":
            return [
                r("node"),
                C
            ];
        case "ArrayExpression":
            {
                if (n.elements.length === 0) return "[]";
                let s = e.map(()=>e.node === null ? "null" : r(), "elements");
                return [
                    "[",
                    E([
                        C,
                        b([
                            ",",
                            C
                        ], s)
                    ]),
                    C,
                    "]"
                ];
            }
        case "ObjectExpression":
            return n.properties.length === 0 ? "{}" : [
                "{",
                E([
                    C,
                    b([
                        ",",
                        C
                    ], e.map(r, "properties"))
                ]),
                C,
                "}"
            ];
        case "ObjectProperty":
            return [
                r("key"),
                ": ",
                r("value")
            ];
        case "UnaryExpression":
            return [
                n.operator === "+" ? "" : n.operator,
                r("argument")
            ];
        case "NullLiteral":
            return "null";
        case "BooleanLiteral":
            return n.value ? "true" : "false";
        case "StringLiteral":
            return JSON.stringify(n.value);
        case "NumericLiteral":
            return Sa(e) ? JSON.stringify(String(n.value)) : JSON.stringify(n.value);
        case "Identifier":
            return Sa(e) ? JSON.stringify(n.name) : n.name;
        case "TemplateLiteral":
            return r([
                "quasis",
                0
            ]);
        case "TemplateElement":
            return JSON.stringify(n.value.cooked);
        default:
            throw new _e(n, "JSON");
    }
}
function Sa(e) {
    return e.key === "key" && e.parent.type === "ObjectProperty";
}
var $l = new Set([
    "start",
    "end",
    "extra",
    "loc",
    "comments",
    "leadingComments",
    "trailingComments",
    "innerComments",
    "errors",
    "range",
    "tokens"
]);
function Ba(e, t) {
    let { type: r } = e;
    if (r === "ObjectProperty") {
        let { key: n } = e;
        n.type === "Identifier" ? t.key = {
            type: "StringLiteral",
            value: n.name
        } : n.type === "NumericLiteral" && (t.key = {
            type: "StringLiteral",
            value: String(n.value)
        });
        return;
    }
    if (r === "UnaryExpression" && e.operator === "+") return t.argument;
    if (r === "ArrayExpression") {
        for (let [n, s] of e.elements.entries())s === null && t.elements.splice(n, 0, {
            type: "NullLiteral"
        });
        return;
    }
    if (r === "TemplateLiteral") return {
        type: "StringLiteral",
        value: e.quasis[0].value.cooked
    };
}
Ba.ignoredProperties = $l;
var ba = [
    {
        linguistLanguageId: 174,
        name: "JSON.stringify",
        type: "data",
        color: "#292929",
        tmScope: "source.json",
        aceMode: "json",
        codemirrorMode: "javascript",
        codemirrorMimeType: "application/json",
        aliases: [
            "geojson",
            "jsonl",
            "topojson"
        ],
        extensions: [
            ".importmap"
        ],
        filenames: [
            "package.json",
            "package-lock.json",
            "composer.json"
        ],
        parsers: [
            "json-stringify"
        ],
        vscodeLanguageIds: [
            "json"
        ]
    },
    {
        linguistLanguageId: 174,
        name: "JSON",
        type: "data",
        color: "#292929",
        tmScope: "source.json",
        aceMode: "json",
        codemirrorMode: "javascript",
        codemirrorMimeType: "application/json",
        aliases: [
            "geojson",
            "jsonl",
            "topojson"
        ],
        extensions: [
            ".json",
            ".4DForm",
            ".4DProject",
            ".avsc",
            ".geojson",
            ".gltf",
            ".har",
            ".ice",
            ".JSON-tmLanguage",
            ".mcmeta",
            ".tfstate",
            ".tfstate.backup",
            ".topojson",
            ".webapp",
            ".webmanifest",
            ".yy",
            ".yyp"
        ],
        filenames: [
            ".all-contributorsrc",
            ".arcconfig",
            ".auto-changelog",
            ".c8rc",
            ".htmlhintrc",
            ".imgbotconfig",
            ".nycrc",
            ".tern-config",
            ".tern-project",
            ".watchmanconfig",
            "Pipfile.lock",
            "composer.lock",
            "flake.lock",
            "mcmod.info"
        ],
        parsers: [
            "json"
        ],
        vscodeLanguageIds: [
            "json"
        ]
    },
    {
        linguistLanguageId: 423,
        name: "JSON with Comments",
        type: "data",
        color: "#292929",
        group: "JSON",
        tmScope: "source.js",
        aceMode: "javascript",
        codemirrorMode: "javascript",
        codemirrorMimeType: "text/javascript",
        aliases: [
            "jsonc"
        ],
        extensions: [
            ".jsonc",
            ".code-snippets",
            ".code-workspace",
            ".sublime-build",
            ".sublime-commands",
            ".sublime-completions",
            ".sublime-keymap",
            ".sublime-macro",
            ".sublime-menu",
            ".sublime-mousemap",
            ".sublime-project",
            ".sublime-settings",
            ".sublime-theme",
            ".sublime-workspace",
            ".sublime_metrics",
            ".sublime_session"
        ],
        filenames: [
            ".babelrc",
            ".devcontainer.json",
            ".eslintrc.json",
            ".jscsrc",
            ".jshintrc",
            ".jslintrc",
            ".swcrc",
            "api-extractor.json",
            "devcontainer.json",
            "jsconfig.json",
            "language-configuration.json",
            "tsconfig.json",
            "tslint.json",
            ".eslintrc"
        ],
        parsers: [
            "json"
        ],
        vscodeLanguageIds: [
            "jsonc"
        ]
    },
    {
        linguistLanguageId: 175,
        name: "JSON5",
        type: "data",
        color: "#267CB9",
        extensions: [
            ".json5"
        ],
        tmScope: "source.js",
        aceMode: "javascript",
        codemirrorMode: "javascript",
        codemirrorMimeType: "application/json",
        parsers: [
            "json5"
        ],
        vscodeLanguageIds: [
            "json5"
        ]
    }
];
var fr = {
    bracketSpacing: {
        category: "Common",
        type: "boolean",
        default: !0,
        description: "Print spaces between brackets.",
        oppositeDescription: "Do not print spaces between brackets."
    },
    singleQuote: {
        category: "Common",
        type: "boolean",
        default: !1,
        description: "Use single quotes instead of double quotes."
    },
    proseWrap: {
        category: "Common",
        type: "choice",
        default: "preserve",
        description: "How to wrap prose.",
        choices: [
            {
                value: "always",
                description: "Wrap prose if it exceeds the print width."
            },
            {
                value: "never",
                description: "Do not wrap prose."
            },
            {
                value: "preserve",
                description: "Wrap prose as-is."
            }
        ]
    },
    bracketSameLine: {
        category: "Common",
        type: "boolean",
        default: !1,
        description: "Put > of opening tags on the last line instead of on a new line."
    },
    singleAttributePerLine: {
        category: "Common",
        type: "boolean",
        default: !1,
        description: "Enforce single attribute per line in HTML, Vue and JSX."
    }
};
var kt = "JavaScript", Vl = {
    arrowParens: {
        category: kt,
        type: "choice",
        default: "always",
        description: "Include parentheses around a sole arrow function parameter.",
        choices: [
            {
                value: "always",
                description: "Always include parens. Example: `(x) => x`"
            },
            {
                value: "avoid",
                description: "Omit parens when possible. Example: `x => x`"
            }
        ]
    },
    bracketSameLine: fr.bracketSameLine,
    bracketSpacing: fr.bracketSpacing,
    jsxBracketSameLine: {
        category: kt,
        type: "boolean",
        description: "Put > on the last line instead of at a new line.",
        deprecated: "2.4.0"
    },
    semi: {
        category: kt,
        type: "boolean",
        default: !0,
        description: "Print semicolons.",
        oppositeDescription: "Do not print semicolons, except at the beginning of lines which may need them."
    },
    experimentalTernaries: {
        category: kt,
        type: "boolean",
        default: !1,
        description: "Use curious ternaries, with the question mark after the condition.",
        oppositeDescription: "Default behavior of ternaries; keep question marks on the same line as the consequent."
    },
    singleQuote: fr.singleQuote,
    jsxSingleQuote: {
        category: kt,
        type: "boolean",
        default: !1,
        description: "Use single quotes in JSX."
    },
    quoteProps: {
        category: kt,
        type: "choice",
        default: "as-needed",
        description: "Change when properties in objects are quoted.",
        choices: [
            {
                value: "as-needed",
                description: "Only add quotes around object properties where required."
            },
            {
                value: "consistent",
                description: "If at least one property in an object requires quotes, quote all properties."
            },
            {
                value: "preserve",
                description: "Respect the input use of quotes in object properties."
            }
        ]
    },
    trailingComma: {
        category: kt,
        type: "choice",
        default: "all",
        description: "Print trailing commas wherever possible when multi-line.",
        choices: [
            {
                value: "all",
                description: "Trailing commas wherever possible (including function arguments)."
            },
            {
                value: "es5",
                description: "Trailing commas where valid in ES5 (objects, arrays, etc.)"
            },
            {
                value: "none",
                description: "No trailing commas."
            }
        ]
    },
    singleAttributePerLine: fr.singleAttributePerLine
}, Pa = Vl;
var Kl = {
    estree: js,
    "estree-json": Ms
}, Hl = [
    ...xa,
    ...ba
];
var Td = Rs;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"lwmMb"}]},[], null, "parcelRequire2d1f")

//# sourceMappingURL=estree.4a6560c1.js.map
