(() => {

function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

      var $parcel$global = globalThis;
    var parcelRequire = $parcel$global["parcelRequire2d1f"];
var parcelRegister = parcelRequire.register;
parcelRegister("dbaYx", function(module, exports) {

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "languages", () => $e220d53e1e2a4e8f$export$d0d68bb9ed2c643d);
$parcel$export(module.exports, "options", () => $e220d53e1e2a4e8f$export$41c562ebe57d11e2);
$parcel$export(module.exports, "printers", () => $e220d53e1e2a4e8f$export$263afe08c0871a1);
$parcel$export(module.exports, "default", () => $e220d53e1e2a4e8f$export$2e2bcd8739ae039);
var $e220d53e1e2a4e8f$var$ua = Object.create;
var $e220d53e1e2a4e8f$var$Tn = Object.defineProperty;
var $e220d53e1e2a4e8f$var$ia = Object.getOwnPropertyDescriptor;
var $e220d53e1e2a4e8f$var$aa = Object.getOwnPropertyNames;
var $e220d53e1e2a4e8f$var$oa = Object.getPrototypeOf, $e220d53e1e2a4e8f$var$pa = Object.prototype.hasOwnProperty;
var $e220d53e1e2a4e8f$var$ca = (e, t)=>()=>(t || e((t = {
            exports: {}
        }).exports, t), t.exports), $e220d53e1e2a4e8f$var$or = (e, t)=>{
    for(var r in t)$e220d53e1e2a4e8f$var$Tn(e, r, {
        get: t[r],
        enumerable: !0
    });
}, $e220d53e1e2a4e8f$var$la = (e, t, r, n)=>{
    if (t && typeof t == "object" || typeof t == "function") for (let s of $e220d53e1e2a4e8f$var$aa(t))!$e220d53e1e2a4e8f$var$pa.call(e, s) && s !== r && $e220d53e1e2a4e8f$var$Tn(e, s, {
        get: ()=>t[s],
        enumerable: !(n = $e220d53e1e2a4e8f$var$ia(t, s)) || n.enumerable
    });
    return e;
};
var $e220d53e1e2a4e8f$var$ma = (e, t, r)=>(r = e != null ? $e220d53e1e2a4e8f$var$ua($e220d53e1e2a4e8f$var$oa(e)) : {}, $e220d53e1e2a4e8f$var$la(t || !e || !e.__esModule ? $e220d53e1e2a4e8f$var$Tn(r, "default", {
        value: e,
        enumerable: !0
    }) : r, e));
var $e220d53e1e2a4e8f$var$Bs = (e, t, r)=>{
    if (!t.has(e)) throw TypeError("Cannot " + r);
};
var $e220d53e1e2a4e8f$var$st = (e, t, r)=>($e220d53e1e2a4e8f$var$Bs(e, t, "read from private field"), r ? r.call(e) : t.get(e)), $e220d53e1e2a4e8f$var$bs = (e, t, r)=>{
    if (t.has(e)) throw TypeError("Cannot add the same private member more than once");
    t instanceof WeakSet ? t.add(e) : t.set(e, r);
}, $e220d53e1e2a4e8f$var$Ps = (e, t, r, n)=>($e220d53e1e2a4e8f$var$Bs(e, t, "write to private field"), n ? n.call(e, r) : t.set(e, r), r);
var $e220d53e1e2a4e8f$var$Hi = $e220d53e1e2a4e8f$var$ca((ht)=>{
    "use strict";
    Object.defineProperty(ht, "__esModule", {
        value: !0
    });
    ht.extract = el;
    ht.parse = rl;
    ht.parseWithComments = Vi;
    ht.print = nl;
    ht.strip = tl;
    var Hc = /\*\/$/, Kc = /^\/\*\*?/, Xi = /^\s*(\/\*\*?(.|\r?\n)*?\*\/)/, zc = /(^|\s+)\/\/([^\r\n]*)/g, qi = /^(\r?\n)+/, Qc = /(?:^|\r?\n) *(@[^\r\n]*?) *\r?\n *(?![^@\r\n]*\/\/[^]*)([^@\r\n\s][^@\r\n]+?) *\r?\n/g, Wi = /(?:^|\r?\n) *@(\S+) *([^\r\n]*)/g, Zc = /(\r?\n|^) *\* ?/g, $i = [];
    function el(e) {
        let t = e.match(Xi);
        return t ? t[0].trimLeft() : "";
    }
    function tl(e) {
        let t = e.match(Xi);
        return t && t[0] ? e.substring(t[0].length) : e;
    }
    function rl(e) {
        return Vi(e).pragmas;
    }
    function Vi(e) {
        let t = `
`;
        e = e.replace(Kc, "").replace(Hc, "").replace(Zc, "$1");
        let r = "";
        for(; r !== e;)r = e, e = e.replace(Qc, `${t}$1 $2${t}`);
        e = e.replace(qi, "").trimRight();
        let n = Object.create(null), s = e.replace(Wi, "").replace(qi, "").trimRight(), u;
        for(; u = Wi.exec(e);){
            let i = u[2].replace(zc, "");
            typeof n[u[1]] == "string" || Array.isArray(n[u[1]]) ? n[u[1]] = $i.concat(n[u[1]], i) : n[u[1]] = i;
        }
        return {
            comments: s,
            pragmas: n
        };
    }
    function nl({ comments: e = "", pragmas: t = {} }) {
        let r = `
`, n = "/**", s = " *", u = " */", i = Object.keys(t), a = i.map((p)=>Yi(p, t[p])).reduce((p, m)=>p.concat(m), []).map((p)=>`${s} ${p}${r}`).join("");
        if (!e) {
            if (i.length === 0) return "";
            if (i.length === 1 && !Array.isArray(t[i[0]])) {
                let p = t[i[0]];
                return `${n} ${Yi(i[0], p)[0]}${u}`;
            }
        }
        let o = e.split(r).map((p)=>`${s} ${p}`).join(r) + r;
        return n + r + (e ? o : "") + (e && i.length ? s + r : "") + a + u;
    }
    function Yi(e, t) {
        return $i.concat(t).map((r)=>`@${e} ${r}`.trim());
    }
});
var $e220d53e1e2a4e8f$var$Ss = {};
$e220d53e1e2a4e8f$var$or($e220d53e1e2a4e8f$var$Ss, {
    languages: ()=>$e220d53e1e2a4e8f$export$d0d68bb9ed2c643d,
    options: ()=>$e220d53e1e2a4e8f$export$41c562ebe57d11e2,
    printers: ()=>$e220d53e1e2a4e8f$export$263afe08c0871a1
});
var $e220d53e1e2a4e8f$var$gs = {};
$e220d53e1e2a4e8f$var$or($e220d53e1e2a4e8f$var$gs, {
    canAttachComment: ()=>$e220d53e1e2a4e8f$var$Wo,
    embed: ()=>$e220d53e1e2a4e8f$var$Ni,
    experimentalFeatures: ()=>$e220d53e1e2a4e8f$var$il,
    getCommentChildNodes: ()=>$e220d53e1e2a4e8f$var$Yo,
    getVisitorKeys: ()=>$e220d53e1e2a4e8f$var$fr,
    handleComments: ()=>$e220d53e1e2a4e8f$var$Kn,
    insertPragma: ()=>$e220d53e1e2a4e8f$var$zi,
    isBlockComment: ()=>$e220d53e1e2a4e8f$var$ae,
    isGap: ()=>$e220d53e1e2a4e8f$var$Xo,
    massageAstNode: ()=>$e220d53e1e2a4e8f$var$Gi,
    print: ()=>$e220d53e1e2a4e8f$var$Ii,
    printComment: ()=>$e220d53e1e2a4e8f$var$Tu,
    willPrintOwnComments: ()=>$e220d53e1e2a4e8f$var$zn
});
function $e220d53e1e2a4e8f$var$ya(e, t) {
    let { originalText: r, [Symbol.for("comments")]: n, locStart: s, locEnd: u, [Symbol.for("printedComments")]: i } = t, { node: a } = e, o = s(a), p = u(a);
    for (let m of n)s(m) >= o && u(m) <= p && i.add(m);
    return r.slice(o, p);
}
var $e220d53e1e2a4e8f$var$ks = $e220d53e1e2a4e8f$var$ya;
var $e220d53e1e2a4e8f$var$Ke = "string", $e220d53e1e2a4e8f$var$je = "array", $e220d53e1e2a4e8f$var$ze = "cursor", $e220d53e1e2a4e8f$var$Me = "indent", $e220d53e1e2a4e8f$var$Re = "align", $e220d53e1e2a4e8f$var$Qe = "trim", $e220d53e1e2a4e8f$var$ue = "group", $e220d53e1e2a4e8f$var$ye = "fill", $e220d53e1e2a4e8f$var$Fe = "if-break", $e220d53e1e2a4e8f$var$Je = "indent-if-break", $e220d53e1e2a4e8f$var$Ne = "line-suffix", $e220d53e1e2a4e8f$var$Ue = "line-suffix-boundary", $e220d53e1e2a4e8f$var$ie = "line", $e220d53e1e2a4e8f$var$be = "label", $e220d53e1e2a4e8f$var$Pe = "break-parent", $e220d53e1e2a4e8f$var$pr = new Set([
    $e220d53e1e2a4e8f$var$ze,
    $e220d53e1e2a4e8f$var$Me,
    $e220d53e1e2a4e8f$var$Re,
    $e220d53e1e2a4e8f$var$Qe,
    $e220d53e1e2a4e8f$var$ue,
    $e220d53e1e2a4e8f$var$ye,
    $e220d53e1e2a4e8f$var$Fe,
    $e220d53e1e2a4e8f$var$Je,
    $e220d53e1e2a4e8f$var$Ne,
    $e220d53e1e2a4e8f$var$Ue,
    $e220d53e1e2a4e8f$var$ie,
    $e220d53e1e2a4e8f$var$be,
    $e220d53e1e2a4e8f$var$Pe
]);
function $e220d53e1e2a4e8f$var$Da(e) {
    if (typeof e == "string") return $e220d53e1e2a4e8f$var$Ke;
    if (Array.isArray(e)) return $e220d53e1e2a4e8f$var$je;
    if (!e) return;
    let { type: t } = e;
    if ($e220d53e1e2a4e8f$var$pr.has(t)) return t;
}
var $e220d53e1e2a4e8f$var$Ze = $e220d53e1e2a4e8f$var$Da;
var $e220d53e1e2a4e8f$var$fa = (e)=>new Intl.ListFormat("en-US", {
        type: "disjunction"
    }).format(e);
function $e220d53e1e2a4e8f$var$Ea(e) {
    let t = e === null ? "null" : typeof e;
    if (t !== "string" && t !== "object") return `Unexpected doc '${t}', 
Expected it to be 'string' or 'object'.`;
    if ($e220d53e1e2a4e8f$var$Ze(e)) throw new Error("doc is valid.");
    let r = Object.prototype.toString.call(e);
    if (r !== "[object Object]") return `Unexpected doc '${r}'.`;
    let n = $e220d53e1e2a4e8f$var$fa([
        ...$e220d53e1e2a4e8f$var$pr
    ].map((s)=>`'${s}'`));
    return `Unexpected doc.type '${e.type}'.
Expected it to be ${n}.`;
}
var $e220d53e1e2a4e8f$var$xn = class extends Error {
    name = "InvalidDocError";
    constructor(t){
        super($e220d53e1e2a4e8f$var$Ea(t)), this.doc = t;
    }
}, $e220d53e1e2a4e8f$var$lt = $e220d53e1e2a4e8f$var$xn;
var $e220d53e1e2a4e8f$var$Is = {};
function $e220d53e1e2a4e8f$var$Fa(e, t, r, n) {
    let s = [
        e
    ];
    for(; s.length > 0;){
        let u = s.pop();
        if (u === $e220d53e1e2a4e8f$var$Is) {
            r(s.pop());
            continue;
        }
        r && s.push(u, $e220d53e1e2a4e8f$var$Is);
        let i = $e220d53e1e2a4e8f$var$Ze(u);
        if (!i) throw new $e220d53e1e2a4e8f$var$lt(u);
        if ((t == null ? void 0 : t(u)) !== !1) switch(i){
            case $e220d53e1e2a4e8f$var$je:
            case $e220d53e1e2a4e8f$var$ye:
                {
                    let a = i === $e220d53e1e2a4e8f$var$je ? u : u.parts;
                    for(let o = a.length, p = o - 1; p >= 0; --p)s.push(a[p]);
                    break;
                }
            case $e220d53e1e2a4e8f$var$Fe:
                s.push(u.flatContents, u.breakContents);
                break;
            case $e220d53e1e2a4e8f$var$ue:
                if (n && u.expandedStates) for(let a = u.expandedStates.length, o = a - 1; o >= 0; --o)s.push(u.expandedStates[o]);
                else s.push(u.contents);
                break;
            case $e220d53e1e2a4e8f$var$Re:
            case $e220d53e1e2a4e8f$var$Me:
            case $e220d53e1e2a4e8f$var$Je:
            case $e220d53e1e2a4e8f$var$be:
            case $e220d53e1e2a4e8f$var$Ne:
                s.push(u.contents);
                break;
            case $e220d53e1e2a4e8f$var$Ke:
            case $e220d53e1e2a4e8f$var$ze:
            case $e220d53e1e2a4e8f$var$Qe:
            case $e220d53e1e2a4e8f$var$Ue:
            case $e220d53e1e2a4e8f$var$ie:
            case $e220d53e1e2a4e8f$var$Pe:
                break;
            default:
                throw new $e220d53e1e2a4e8f$var$lt(u);
        }
    }
}
var $e220d53e1e2a4e8f$var$gn = $e220d53e1e2a4e8f$var$Fa;
var $e220d53e1e2a4e8f$var$Ls = ()=>{}, $e220d53e1e2a4e8f$var$Ge = $e220d53e1e2a4e8f$var$Ls, $e220d53e1e2a4e8f$var$cr = $e220d53e1e2a4e8f$var$Ls;
function $e220d53e1e2a4e8f$var$E(e) {
    return $e220d53e1e2a4e8f$var$Ge(e), {
        type: $e220d53e1e2a4e8f$var$Me,
        contents: e
    };
}
function $e220d53e1e2a4e8f$var$De(e, t) {
    return $e220d53e1e2a4e8f$var$Ge(t), {
        type: $e220d53e1e2a4e8f$var$Re,
        contents: t,
        n: e
    };
}
function $e220d53e1e2a4e8f$var$y(e, t = {}) {
    return $e220d53e1e2a4e8f$var$Ge(e), $e220d53e1e2a4e8f$var$cr(t.expandedStates, !0), {
        type: $e220d53e1e2a4e8f$var$ue,
        id: t.id,
        contents: e,
        break: !!t.shouldBreak,
        expandedStates: t.expandedStates
    };
}
function $e220d53e1e2a4e8f$var$ws(e) {
    return $e220d53e1e2a4e8f$var$De(Number.NEGATIVE_INFINITY, e);
}
function $e220d53e1e2a4e8f$var$Os(e) {
    return $e220d53e1e2a4e8f$var$De(-1, e);
}
function $e220d53e1e2a4e8f$var$qe(e, t) {
    return $e220d53e1e2a4e8f$var$y(e[0], {
        ...t,
        expandedStates: e
    });
}
function $e220d53e1e2a4e8f$var$St(e) {
    return $e220d53e1e2a4e8f$var$cr(e), {
        type: $e220d53e1e2a4e8f$var$ye,
        parts: e
    };
}
function $e220d53e1e2a4e8f$var$P(e, t = "", r = {}) {
    return $e220d53e1e2a4e8f$var$Ge(e), t !== "" && $e220d53e1e2a4e8f$var$Ge(t), {
        type: $e220d53e1e2a4e8f$var$Fe,
        breakContents: e,
        flatContents: t,
        groupId: r.groupId
    };
}
function $e220d53e1e2a4e8f$var$mt(e, t) {
    return $e220d53e1e2a4e8f$var$Ge(e), {
        type: $e220d53e1e2a4e8f$var$Je,
        contents: e,
        groupId: t.groupId,
        negate: t.negate
    };
}
function $e220d53e1e2a4e8f$var$hn(e) {
    return $e220d53e1e2a4e8f$var$Ge(e), {
        type: $e220d53e1e2a4e8f$var$Ne,
        contents: e
    };
}
var $e220d53e1e2a4e8f$var$Ae = {
    type: $e220d53e1e2a4e8f$var$Ue
}, $e220d53e1e2a4e8f$var$Te = {
    type: $e220d53e1e2a4e8f$var$Pe
};
var $e220d53e1e2a4e8f$var$Sn = {
    type: $e220d53e1e2a4e8f$var$ie,
    hard: !0
}, $e220d53e1e2a4e8f$var$Ca = {
    type: $e220d53e1e2a4e8f$var$ie,
    hard: !0,
    literal: !0
}, $e220d53e1e2a4e8f$var$A = {
    type: $e220d53e1e2a4e8f$var$ie
}, $e220d53e1e2a4e8f$var$F = {
    type: $e220d53e1e2a4e8f$var$ie,
    soft: !0
}, $e220d53e1e2a4e8f$var$C = [
    $e220d53e1e2a4e8f$var$Sn,
    $e220d53e1e2a4e8f$var$Te
], $e220d53e1e2a4e8f$var$lr = [
    $e220d53e1e2a4e8f$var$Ca,
    $e220d53e1e2a4e8f$var$Te
], $e220d53e1e2a4e8f$var$Bn = {
    type: $e220d53e1e2a4e8f$var$ze
};
function $e220d53e1e2a4e8f$var$B(e, t) {
    $e220d53e1e2a4e8f$var$Ge(e), $e220d53e1e2a4e8f$var$cr(t);
    let r = [];
    for(let n = 0; n < t.length; n++)n !== 0 && r.push(e), r.push(t[n]);
    return r;
}
function $e220d53e1e2a4e8f$var$vs(e, t, r) {
    $e220d53e1e2a4e8f$var$Ge(e);
    let n = e;
    if (t > 0) {
        for(let s = 0; s < Math.floor(t / r); ++s)n = $e220d53e1e2a4e8f$var$E(n);
        n = $e220d53e1e2a4e8f$var$De(t % r, n), n = $e220d53e1e2a4e8f$var$De(Number.NEGATIVE_INFINITY, n);
    }
    return n;
}
function $e220d53e1e2a4e8f$var$et(e, t) {
    return $e220d53e1e2a4e8f$var$Ge(t), e ? {
        type: $e220d53e1e2a4e8f$var$be,
        label: e,
        contents: t
    } : t;
}
var $e220d53e1e2a4e8f$var$da = (e, t, r)=>{
    if (!(e && t == null)) return Array.isArray(t) || typeof t == "string" ? t[r < 0 ? t.length + r : r] : t.at(r);
}, $e220d53e1e2a4e8f$var$w = $e220d53e1e2a4e8f$var$da;
var $e220d53e1e2a4e8f$var$mr = (e)=>{
    if (Array.isArray(e)) return e;
    if (e.type !== $e220d53e1e2a4e8f$var$ye) throw new Error(`Expect doc to be 'array' or '${$e220d53e1e2a4e8f$var$ye}'.`);
    return e.parts;
};
function $e220d53e1e2a4e8f$var$ut(e, t) {
    if (typeof e == "string") return t(e);
    let r = new Map;
    return n(e);
    function n(u) {
        if (r.has(u)) return r.get(u);
        let i = s(u);
        return r.set(u, i), i;
    }
    function s(u) {
        switch($e220d53e1e2a4e8f$var$Ze(u)){
            case $e220d53e1e2a4e8f$var$je:
                return t(u.map(n));
            case $e220d53e1e2a4e8f$var$ye:
                return t({
                    ...u,
                    parts: u.parts.map(n)
                });
            case $e220d53e1e2a4e8f$var$Fe:
                return t({
                    ...u,
                    breakContents: n(u.breakContents),
                    flatContents: n(u.flatContents)
                });
            case $e220d53e1e2a4e8f$var$ue:
                {
                    let { expandedStates: i, contents: a } = u;
                    return i ? (i = i.map(n), a = i[0]) : a = n(a), t({
                        ...u,
                        contents: a,
                        expandedStates: i
                    });
                }
            case $e220d53e1e2a4e8f$var$Re:
            case $e220d53e1e2a4e8f$var$Me:
            case $e220d53e1e2a4e8f$var$Je:
            case $e220d53e1e2a4e8f$var$be:
            case $e220d53e1e2a4e8f$var$Ne:
                return t({
                    ...u,
                    contents: n(u.contents)
                });
            case $e220d53e1e2a4e8f$var$Ke:
            case $e220d53e1e2a4e8f$var$ze:
            case $e220d53e1e2a4e8f$var$Qe:
            case $e220d53e1e2a4e8f$var$Ue:
            case $e220d53e1e2a4e8f$var$ie:
            case $e220d53e1e2a4e8f$var$Pe:
                return t(u);
            default:
                throw new $e220d53e1e2a4e8f$var$lt(u);
        }
    }
}
function $e220d53e1e2a4e8f$var$js(e, t, r) {
    let n = r, s = !1;
    function u(i) {
        if (s) return !1;
        let a = t(i);
        a !== void 0 && (s = !0, n = a);
    }
    return $e220d53e1e2a4e8f$var$gn(e, u), n;
}
function $e220d53e1e2a4e8f$var$Aa(e) {
    if (e.type === $e220d53e1e2a4e8f$var$ue && e.break || e.type === $e220d53e1e2a4e8f$var$ie && e.hard || e.type === $e220d53e1e2a4e8f$var$Pe) return !0;
}
function $e220d53e1e2a4e8f$var$K(e) {
    return $e220d53e1e2a4e8f$var$js(e, $e220d53e1e2a4e8f$var$Aa, !1);
}
function $e220d53e1e2a4e8f$var$_s(e) {
    if (e.length > 0) {
        let t = $e220d53e1e2a4e8f$var$w(!1, e, -1);
        !t.expandedStates && !t.break && (t.break = "propagated");
    }
    return null;
}
function $e220d53e1e2a4e8f$var$Ms(e) {
    let t = new Set, r = [];
    function n(u) {
        if (u.type === $e220d53e1e2a4e8f$var$Pe && $e220d53e1e2a4e8f$var$_s(r), u.type === $e220d53e1e2a4e8f$var$ue) {
            if (r.push(u), t.has(u)) return !1;
            t.add(u);
        }
    }
    function s(u) {
        u.type === $e220d53e1e2a4e8f$var$ue && r.pop().break && $e220d53e1e2a4e8f$var$_s(r);
    }
    $e220d53e1e2a4e8f$var$gn(e, n, s, !0);
}
function $e220d53e1e2a4e8f$var$Ta(e) {
    return e.type === $e220d53e1e2a4e8f$var$ie && !e.hard ? e.soft ? "" : " " : e.type === $e220d53e1e2a4e8f$var$Fe ? e.flatContents : e;
}
function $e220d53e1e2a4e8f$var$Ut(e) {
    return $e220d53e1e2a4e8f$var$ut(e, $e220d53e1e2a4e8f$var$Ta);
}
function $e220d53e1e2a4e8f$var$xa(e) {
    switch($e220d53e1e2a4e8f$var$Ze(e)){
        case $e220d53e1e2a4e8f$var$ye:
            if (e.parts.every((t)=>t === "")) return "";
            break;
        case $e220d53e1e2a4e8f$var$ue:
            if (!e.contents && !e.id && !e.break && !e.expandedStates) return "";
            if (e.contents.type === $e220d53e1e2a4e8f$var$ue && e.contents.id === e.id && e.contents.break === e.break && e.contents.expandedStates === e.expandedStates) return e.contents;
            break;
        case $e220d53e1e2a4e8f$var$Re:
        case $e220d53e1e2a4e8f$var$Me:
        case $e220d53e1e2a4e8f$var$Je:
        case $e220d53e1e2a4e8f$var$Ne:
            if (!e.contents) return "";
            break;
        case $e220d53e1e2a4e8f$var$Fe:
            if (!e.flatContents && !e.breakContents) return "";
            break;
        case $e220d53e1e2a4e8f$var$je:
            {
                let t = [];
                for (let r of e){
                    if (!r) continue;
                    let [n, ...s] = Array.isArray(r) ? r : [
                        r
                    ];
                    typeof n == "string" && typeof $e220d53e1e2a4e8f$var$w(!1, t, -1) == "string" ? t[t.length - 1] += n : t.push(n), t.push(...s);
                }
                return t.length === 0 ? "" : t.length === 1 ? t[0] : t;
            }
        case $e220d53e1e2a4e8f$var$Ke:
        case $e220d53e1e2a4e8f$var$ze:
        case $e220d53e1e2a4e8f$var$Qe:
        case $e220d53e1e2a4e8f$var$Ue:
        case $e220d53e1e2a4e8f$var$ie:
        case $e220d53e1e2a4e8f$var$be:
        case $e220d53e1e2a4e8f$var$Pe:
            break;
        default:
            throw new $e220d53e1e2a4e8f$var$lt(e);
    }
    return e;
}
function $e220d53e1e2a4e8f$var$Bt(e) {
    return $e220d53e1e2a4e8f$var$ut(e, (t)=>$e220d53e1e2a4e8f$var$xa(t));
}
function $e220d53e1e2a4e8f$var$xe(e, t = $e220d53e1e2a4e8f$var$lr) {
    return $e220d53e1e2a4e8f$var$ut(e, (r)=>typeof r == "string" ? $e220d53e1e2a4e8f$var$B(t, r.split(`
`)) : r);
}
function $e220d53e1e2a4e8f$var$ga(e) {
    if (e.type === $e220d53e1e2a4e8f$var$ie) return !0;
}
function $e220d53e1e2a4e8f$var$Rs(e) {
    return $e220d53e1e2a4e8f$var$js(e, $e220d53e1e2a4e8f$var$ga, !1);
}
function $e220d53e1e2a4e8f$var$Gt(e, t) {
    return e.type === $e220d53e1e2a4e8f$var$be ? {
        ...e,
        contents: t(e.contents)
    } : t(e);
}
function $e220d53e1e2a4e8f$var$ha(e) {
    return Array.isArray(e) && e.length > 0;
}
var $e220d53e1e2a4e8f$var$b = $e220d53e1e2a4e8f$var$ha;
var $e220d53e1e2a4e8f$var$Sa = /^[\$A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC][\$0-9A-Z_a-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]*$/, $e220d53e1e2a4e8f$var$Ba = (e)=>$e220d53e1e2a4e8f$var$Sa.test(e), $e220d53e1e2a4e8f$var$Js = $e220d53e1e2a4e8f$var$Ba;
function $e220d53e1e2a4e8f$var$ba(e) {
    return e !== null && typeof e == "object";
}
var $e220d53e1e2a4e8f$var$Ns = $e220d53e1e2a4e8f$var$ba;
function* $e220d53e1e2a4e8f$var$Pa(e, t) {
    let { getVisitorKeys: r, filter: n = ()=>!0 } = t, s = (u)=>$e220d53e1e2a4e8f$var$Ns(u) && n(u);
    for (let u of r(e)){
        let i = e[u];
        if (Array.isArray(i)) for (let a of i)s(a) && (yield a);
        else s(i) && (yield i);
    }
}
function* $e220d53e1e2a4e8f$var$ka(e, t) {
    let r = [
        e
    ];
    for(let n = 0; n < r.length; n++){
        let s = r[n];
        for (let u of $e220d53e1e2a4e8f$var$Pa(s, t))yield u, r.push(u);
    }
}
function $e220d53e1e2a4e8f$var$Us(e, { getVisitorKeys: t, predicate: r }) {
    for (let n of $e220d53e1e2a4e8f$var$ka(e, {
        getVisitorKeys: t
    }))if (r(n)) return !0;
    return !1;
}
function $e220d53e1e2a4e8f$var$yr(e) {
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
var $e220d53e1e2a4e8f$var$Yl = $e220d53e1e2a4e8f$var$yr(/\s/), $e220d53e1e2a4e8f$var$We = $e220d53e1e2a4e8f$var$yr(" 	"), $e220d53e1e2a4e8f$var$Gs = $e220d53e1e2a4e8f$var$yr(",; 	"), $e220d53e1e2a4e8f$var$qs = $e220d53e1e2a4e8f$var$yr(/[^\n\r]/);
function $e220d53e1e2a4e8f$var$Ia(e, t, r) {
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
var $e220d53e1e2a4e8f$var$Ye = $e220d53e1e2a4e8f$var$Ia;
function $e220d53e1e2a4e8f$var$La(e, t, r = {}) {
    let n = $e220d53e1e2a4e8f$var$We(e, r.backwards ? t - 1 : t, r), s = $e220d53e1e2a4e8f$var$Ye(e, n, r);
    return n !== s;
}
var $e220d53e1e2a4e8f$var$z = $e220d53e1e2a4e8f$var$La;
function $e220d53e1e2a4e8f$var$wa(e, t) {
    if (t === !1) return !1;
    if (e.charAt(t) === "/" && e.charAt(t + 1) === "*") {
        for(let r = t + 2; r < e.length; ++r)if (e.charAt(r) === "*" && e.charAt(r + 1) === "/") return r + 2;
    }
    return t;
}
var $e220d53e1e2a4e8f$var$bt = $e220d53e1e2a4e8f$var$wa;
function $e220d53e1e2a4e8f$var$Oa(e, t) {
    return t === !1 ? !1 : e.charAt(t) === "/" && e.charAt(t + 1) === "/" ? $e220d53e1e2a4e8f$var$qs(e, t) : t;
}
var $e220d53e1e2a4e8f$var$Pt = $e220d53e1e2a4e8f$var$Oa;
function $e220d53e1e2a4e8f$var$va(e, t) {
    let r = null, n = t;
    for(; n !== r;)r = n, n = $e220d53e1e2a4e8f$var$Gs(e, n), n = $e220d53e1e2a4e8f$var$bt(e, n), n = $e220d53e1e2a4e8f$var$We(e, n);
    return n = $e220d53e1e2a4e8f$var$Pt(e, n), n = $e220d53e1e2a4e8f$var$Ye(e, n), n !== !1 && $e220d53e1e2a4e8f$var$z(e, n);
}
var $e220d53e1e2a4e8f$var$kt = $e220d53e1e2a4e8f$var$va;
var $e220d53e1e2a4e8f$var$Ws = ()=>/[#*0-9]\uFE0F?\u20E3|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26AA\u26B0\u26B1\u26BD\u26BE\u26C4\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0-\u26F5\u26F7\u26F8\u26FA\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2757\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B55\u3030\u303D\u3297\u3299]\uFE0F?|[\u261D\u270C\u270D](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?|[\u270A\u270B](?:\uD83C[\uDFFB-\uDFFF])?|[\u23E9-\u23EC\u23F0\u23F3\u25FD\u2693\u26A1\u26AB\u26C5\u26CE\u26D4\u26EA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2795-\u2797\u27B0\u27BF\u2B50]|\u26F9(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|\u2764\uFE0F?(?:\u200D(?:\uD83D\uDD25|\uD83E\uDE79))?|\uD83C(?:[\uDC04\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]\uFE0F?|[\uDF85\uDFC2\uDFC7](?:\uD83C[\uDFFB-\uDFFF])?|[\uDFC3\uDFC4\uDFCA](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDFCB\uDFCC](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uDDE6\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF]|\uDDE7\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF]|\uDDE8\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF]|\uDDE9\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF]|\uDDEA\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA]|\uDDEB\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7]|\uDDEC\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE]|\uDDED\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA]|\uDDEE\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9]|\uDDEF\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5]|\uDDF0\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF]|\uDDF1\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE]|\uDDF2\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF]|\uDDF3\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF]|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE]|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC]|\uDDF8\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF]|\uDDF9\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF]|\uDDFA\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF]|\uDDFB\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA]|\uDDFC\uD83C[\uDDEB\uDDF8]|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C[\uDDEA\uDDF9]|\uDDFF\uD83C[\uDDE6\uDDF2\uDDFC]|\uDFF3\uFE0F?(?:\u200D(?:\u26A7\uFE0F?|\uD83C\uDF08))?|\uDFF4(?:\u200D\u2620\uFE0F?|\uDB40\uDC67\uDB40\uDC62\uDB40(?:\uDC65\uDB40\uDC6E\uDB40\uDC67|\uDC73\uDB40\uDC63\uDB40\uDC74|\uDC77\uDB40\uDC6C\uDB40\uDC73)\uDB40\uDC7F)?)|\uD83D(?:[\uDC08\uDC26](?:\u200D\u2B1B)?|[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3]\uFE0F?|[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC](?:\uD83C[\uDFFB-\uDFFF])?|[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD74\uDD90](?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?|[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC25\uDC27-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEDC-\uDEDF\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uDC15(?:\u200D\uD83E\uDDBA)?|\uDC3B(?:\u200D\u2744\uFE0F?)?|\uDC41\uFE0F?(?:\u200D\uD83D\uDDE8\uFE0F?)?|\uDC68(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDC68\uDC69]\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?)|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?\uDC68\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D\uDC68\uD83C[\uDFFB-\uDFFE])))?))?|\uDC69(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:\uDC8B\u200D\uD83D)?[\uDC68\uDC69]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D(?:[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?|\uDC69\u200D\uD83D(?:\uDC66(?:\u200D\uD83D\uDC66)?|\uDC67(?:\u200D\uD83D[\uDC66\uDC67])?))|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFC-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFD-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFD\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D\uD83D(?:[\uDC68\uDC69]|\uDC8B\u200D\uD83D[\uDC68\uDC69])\uD83C[\uDFFB-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83D[\uDC68\uDC69]\uD83C[\uDFFB-\uDFFE])))?))?|\uDC6F(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDD75(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|\uDE2E(?:\u200D\uD83D\uDCA8)?|\uDE35(?:\u200D\uD83D\uDCAB)?|\uDE36(?:\u200D\uD83C\uDF2B\uFE0F?)?)|\uD83E(?:[\uDD0C\uDD0F\uDD18-\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5\uDEC3-\uDEC5\uDEF0\uDEF2-\uDEF8](?:\uD83C[\uDFFB-\uDFFF])?|[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD](?:\uD83C[\uDFFB-\uDFFF])?(?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDDDE\uDDDF](?:\u200D[\u2640\u2642]\uFE0F?)?|[\uDD0D\uDD0E\uDD10-\uDD17\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCC\uDDD0\uDDE0-\uDDFF\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC2\uDECE-\uDEDB\uDEE0-\uDEE8]|\uDD3C(?:\u200D[\u2640\u2642]\uFE0F?|\uD83C[\uDFFB-\uDFFF])?|\uDDD1(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1))|\uD83C(?:\uDFFB(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFC-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFC(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFD-\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFD(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFE(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFD\uDFFF]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?|\uDFFF(?:\u200D(?:[\u2695\u2696\u2708]\uFE0F?|\u2764\uFE0F?\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1\uD83C[\uDFFB-\uDFFE]|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E(?:[\uDDAF-\uDDB3\uDDBC\uDDBD]|\uDD1D\u200D\uD83E\uDDD1\uD83C[\uDFFB-\uDFFF])))?))?|\uDEF1(?:\uD83C(?:\uDFFB(?:\u200D\uD83E\uDEF2\uD83C[\uDFFC-\uDFFF])?|\uDFFC(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFD-\uDFFF])?|\uDFFD(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])?|\uDFFE(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFD\uDFFF])?|\uDFFF(?:\u200D\uD83E\uDEF2\uD83C[\uDFFB-\uDFFE])?))?)/g;
var $e220d53e1e2a4e8f$var$Ys = {
    eastAsianWidth (e) {
        var t = e.charCodeAt(0), r = e.length == 2 ? e.charCodeAt(1) : 0, n = t;
        return 55296 <= t && t <= 56319 && 56320 <= r && r <= 57343 && (t &= 1023, r &= 1023, n = t << 10 | r, n += 65536), n == 12288 || 65281 <= n && n <= 65376 || 65504 <= n && n <= 65510 ? "F" : 4352 <= n && n <= 4447 || 4515 <= n && n <= 4519 || 4602 <= n && n <= 4607 || 9001 <= n && n <= 9002 || 11904 <= n && n <= 11929 || 11931 <= n && n <= 12019 || 12032 <= n && n <= 12245 || 12272 <= n && n <= 12283 || 12289 <= n && n <= 12350 || 12353 <= n && n <= 12438 || 12441 <= n && n <= 12543 || 12549 <= n && n <= 12589 || 12593 <= n && n <= 12686 || 12688 <= n && n <= 12730 || 12736 <= n && n <= 12771 || 12784 <= n && n <= 12830 || 12832 <= n && n <= 12871 || 12880 <= n && n <= 13054 || 13056 <= n && n <= 19903 || 19968 <= n && n <= 42124 || 42128 <= n && n <= 42182 || 43360 <= n && n <= 43388 || 44032 <= n && n <= 55203 || 55216 <= n && n <= 55238 || 55243 <= n && n <= 55291 || 63744 <= n && n <= 64255 || 65040 <= n && n <= 65049 || 65072 <= n && n <= 65106 || 65108 <= n && n <= 65126 || 65128 <= n && n <= 65131 || 110592 <= n && n <= 110593 || 127488 <= n && n <= 127490 || 127504 <= n && n <= 127546 || 127552 <= n && n <= 127560 || 127568 <= n && n <= 127569 || 131072 <= n && n <= 194367 || 177984 <= n && n <= 196605 || 196608 <= n && n <= 262141 ? "W" : "N";
    }
};
var $e220d53e1e2a4e8f$var$_a = /[^\x20-\x7F]/;
function $e220d53e1e2a4e8f$var$ja(e) {
    if (!e) return 0;
    if (!$e220d53e1e2a4e8f$var$_a.test(e)) return e.length;
    e = e.replace($e220d53e1e2a4e8f$var$Ws(), "  ");
    let t = 0;
    for (let r of e){
        let n = r.codePointAt(0);
        if (n <= 31 || n >= 127 && n <= 159 || n >= 768 && n <= 879) continue;
        let s = $e220d53e1e2a4e8f$var$Ys.eastAsianWidth(r);
        t += s === "F" || s === "W" ? 2 : 1;
    }
    return t;
}
var $e220d53e1e2a4e8f$var$tt = $e220d53e1e2a4e8f$var$ja;
function $e220d53e1e2a4e8f$var$U(e) {
    var n;
    let t = e.range ? e.range[0] : e.start, r = ((n = e.declaration) == null ? void 0 : n.decorators) ?? e.decorators;
    return $e220d53e1e2a4e8f$var$b(r) ? Math.min($e220d53e1e2a4e8f$var$U(r[0]), t) : t;
}
function $e220d53e1e2a4e8f$var$O(e) {
    return e.range ? e.range[1] : e.end;
}
function $e220d53e1e2a4e8f$var$yt(e, t) {
    let r = $e220d53e1e2a4e8f$var$U(e);
    return Number.isInteger(r) && r === $e220d53e1e2a4e8f$var$U(t);
}
function $e220d53e1e2a4e8f$var$Ma(e, t) {
    let r = $e220d53e1e2a4e8f$var$O(e);
    return Number.isInteger(r) && r === $e220d53e1e2a4e8f$var$O(t);
}
function $e220d53e1e2a4e8f$var$Xs(e, t) {
    return $e220d53e1e2a4e8f$var$yt(e, t) && $e220d53e1e2a4e8f$var$Ma(e, t);
}
var $e220d53e1e2a4e8f$var$qt = null;
function $e220d53e1e2a4e8f$var$Wt(e) {
    if ($e220d53e1e2a4e8f$var$qt !== null && typeof $e220d53e1e2a4e8f$var$qt.property) {
        let t = $e220d53e1e2a4e8f$var$qt;
        return $e220d53e1e2a4e8f$var$qt = $e220d53e1e2a4e8f$var$Wt.prototype = null, t;
    }
    return $e220d53e1e2a4e8f$var$qt = $e220d53e1e2a4e8f$var$Wt.prototype = e ?? Object.create(null), new $e220d53e1e2a4e8f$var$Wt;
}
var $e220d53e1e2a4e8f$var$Ra = 10;
for(let e = 0; e <= $e220d53e1e2a4e8f$var$Ra; e++)$e220d53e1e2a4e8f$var$Wt();
function $e220d53e1e2a4e8f$var$bn(e) {
    return $e220d53e1e2a4e8f$var$Wt(e);
}
function $e220d53e1e2a4e8f$var$Ja(e, t = "type") {
    $e220d53e1e2a4e8f$var$bn(e);
    function r(n) {
        let s = n[t], u = e[s];
        if (!Array.isArray(u)) throw Object.assign(new Error(`Missing visitor keys for '${s}'.`), {
            node: n
        });
        return u;
    }
    return r;
}
var $e220d53e1e2a4e8f$var$Dr = $e220d53e1e2a4e8f$var$Ja;
var $e220d53e1e2a4e8f$var$$s = {
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
        "assertions",
        "exported"
    ],
    ExportDefaultDeclaration: [
        "declaration"
    ],
    ExportNamedDeclaration: [
        "declaration",
        "specifiers",
        "source",
        "attributes",
        "assertions"
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
        "attributes",
        "assertions"
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
        "argument"
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
    ImportExpression: [
        "source",
        "attributes"
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
    UnknownTypeAnnotation: []
};
var $e220d53e1e2a4e8f$var$Na = $e220d53e1e2a4e8f$var$Dr($e220d53e1e2a4e8f$var$$s), $e220d53e1e2a4e8f$var$fr = $e220d53e1e2a4e8f$var$Na;
function $e220d53e1e2a4e8f$var$Ua(e) {
    return e = new Set(e), (t)=>e.has(t == null ? void 0 : t.type);
}
var $e220d53e1e2a4e8f$var$j = $e220d53e1e2a4e8f$var$Ua;
var $e220d53e1e2a4e8f$var$Ga = $e220d53e1e2a4e8f$var$j([
    "Block",
    "CommentBlock",
    "MultiLine"
]), $e220d53e1e2a4e8f$var$ae = $e220d53e1e2a4e8f$var$Ga;
function $e220d53e1e2a4e8f$var$qa(e, t) {
    let r = t.split(".");
    for(let n = r.length - 1; n >= 0; n--){
        let s = r[n];
        if (n === 0) return e.type === "Identifier" && e.name === s;
        if (e.type !== "MemberExpression" || e.optional || e.computed || e.property.type !== "Identifier" || e.property.name !== s) return !1;
        e = e.object;
    }
}
function $e220d53e1e2a4e8f$var$Wa(e, t) {
    return t.some((r)=>$e220d53e1e2a4e8f$var$qa(e, r));
}
var $e220d53e1e2a4e8f$var$Vs = $e220d53e1e2a4e8f$var$Wa;
var $e220d53e1e2a4e8f$var$Ya = $e220d53e1e2a4e8f$var$j([
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
]), $e220d53e1e2a4e8f$var$Er = $e220d53e1e2a4e8f$var$Ya;
function $e220d53e1e2a4e8f$var$Xa({ type: e }) {
    return e.startsWith("TS") && e.endsWith("Keyword");
}
var $e220d53e1e2a4e8f$var$Fr = $e220d53e1e2a4e8f$var$Xa;
function $e220d53e1e2a4e8f$var$Xt(e, t) {
    return t(e) || $e220d53e1e2a4e8f$var$Us(e, {
        getVisitorKeys: $e220d53e1e2a4e8f$var$fr,
        predicate: t
    });
}
function $e220d53e1e2a4e8f$var$Lt(e) {
    return e.type === "AssignmentExpression" || e.type === "BinaryExpression" || e.type === "LogicalExpression" || e.type === "NGPipeExpression" || e.type === "ConditionalExpression" || $e220d53e1e2a4e8f$var$k(e) || $e220d53e1e2a4e8f$var$J(e) || e.type === "SequenceExpression" || e.type === "TaggedTemplateExpression" || e.type === "BindExpression" || e.type === "UpdateExpression" && !e.prefix || $e220d53e1e2a4e8f$var$Le(e) || e.type === "TSNonNullExpression" || e.type === "ChainExpression";
}
function $e220d53e1e2a4e8f$var$zs(e) {
    return e.expressions ? e.expressions[0] : e.left ?? e.test ?? e.callee ?? e.object ?? e.tag ?? e.argument ?? e.expression;
}
function $e220d53e1e2a4e8f$var$dr(e) {
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
var $e220d53e1e2a4e8f$var$$t = $e220d53e1e2a4e8f$var$j([
    "Line",
    "CommentLine",
    "SingleLine",
    "HashbangComment",
    "HTMLOpen",
    "HTMLClose",
    "Hashbang",
    "InterpreterDirective"
]), $e220d53e1e2a4e8f$var$Qs = $e220d53e1e2a4e8f$var$j([
    "ExportDefaultDeclaration",
    "DeclareExportDeclaration",
    "ExportNamedDeclaration",
    "ExportAllDeclaration",
    "DeclareExportAllDeclaration"
]), $e220d53e1e2a4e8f$var$G = $e220d53e1e2a4e8f$var$j([
    "ArrayExpression",
    "TupleExpression"
]), $e220d53e1e2a4e8f$var$ee = $e220d53e1e2a4e8f$var$j([
    "ObjectExpression",
    "RecordExpression"
]);
function $e220d53e1e2a4e8f$var$he(e) {
    return e.type === "NumericLiteral" || e.type === "Literal" && typeof e.value == "number";
}
function $e220d53e1e2a4e8f$var$Ar(e) {
    return e.type === "UnaryExpression" && (e.operator === "+" || e.operator === "-") && $e220d53e1e2a4e8f$var$he(e.argument);
}
function $e220d53e1e2a4e8f$var$Q(e) {
    return e.type === "StringLiteral" || e.type === "Literal" && typeof e.value == "string";
}
function $e220d53e1e2a4e8f$var$wn(e) {
    return e.type === "RegExpLiteral" || e.type === "Literal" && !!e.regex;
}
var $e220d53e1e2a4e8f$var$ke = $e220d53e1e2a4e8f$var$j([
    "ObjectTypeAnnotation",
    "TSTypeLiteral",
    "TSMappedType"
]), $e220d53e1e2a4e8f$var$It = $e220d53e1e2a4e8f$var$j([
    "FunctionExpression",
    "ArrowFunctionExpression"
]);
function $e220d53e1e2a4e8f$var$$a(e) {
    return e.type === "FunctionExpression" || e.type === "ArrowFunctionExpression" && e.body.type === "BlockStatement";
}
function $e220d53e1e2a4e8f$var$Pn(e) {
    return $e220d53e1e2a4e8f$var$k(e) && e.callee.type === "Identifier" && [
        "async",
        "inject",
        "fakeAsync",
        "waitForAsync"
    ].includes(e.callee.name);
}
var $e220d53e1e2a4e8f$var$Y = $e220d53e1e2a4e8f$var$j([
    "JSXElement",
    "JSXFragment"
]);
function $e220d53e1e2a4e8f$var$On(e) {
    return e.kind === "get" || e.kind === "set";
}
function $e220d53e1e2a4e8f$var$vn(e) {
    return $e220d53e1e2a4e8f$var$On(e) || $e220d53e1e2a4e8f$var$yt(e, e.value);
}
function $e220d53e1e2a4e8f$var$Tr(e) {
    return (e.type === "ObjectTypeProperty" || e.type === "ObjectTypeInternalSlot") && e.value.type === "FunctionTypeAnnotation" && !e.static && !$e220d53e1e2a4e8f$var$vn(e);
}
function $e220d53e1e2a4e8f$var$Zs(e) {
    return (e.type === "TypeAnnotation" || e.type === "TSTypeAnnotation") && e.typeAnnotation.type === "FunctionTypeAnnotation" && !e.static && !$e220d53e1e2a4e8f$var$yt(e, e.typeAnnotation);
}
var $e220d53e1e2a4e8f$var$ce = $e220d53e1e2a4e8f$var$j([
    "BinaryExpression",
    "LogicalExpression",
    "NGPipeExpression"
]);
function $e220d53e1e2a4e8f$var$Dt(e) {
    return $e220d53e1e2a4e8f$var$J(e) || e.type === "BindExpression" && !!e.object;
}
var $e220d53e1e2a4e8f$var$Va = $e220d53e1e2a4e8f$var$j([
    "TSThisType",
    "NullLiteralTypeAnnotation",
    "BooleanLiteralTypeAnnotation",
    "StringLiteralTypeAnnotation",
    "BigIntLiteralTypeAnnotation",
    "NumberLiteralTypeAnnotation",
    "TSLiteralType",
    "TSTemplateLiteralType"
]);
function $e220d53e1e2a4e8f$var$wt(e) {
    return $e220d53e1e2a4e8f$var$Fr(e) || $e220d53e1e2a4e8f$var$Er(e) || $e220d53e1e2a4e8f$var$Va(e) || (e.type === "GenericTypeAnnotation" || e.type === "TSTypeReference") && !e.typeParameters;
}
function $e220d53e1e2a4e8f$var$Ha(e) {
    let t = /^(?:before|after)(?:Each|All)$/;
    return e.callee.type === "Identifier" && e.arguments.length === 1 && t.test(e.callee.name);
}
var $e220d53e1e2a4e8f$var$Ka = [
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
function $e220d53e1e2a4e8f$var$za(e) {
    return $e220d53e1e2a4e8f$var$Vs(e, $e220d53e1e2a4e8f$var$Ka);
}
function $e220d53e1e2a4e8f$var$Ct(e, t) {
    if (e.type !== "CallExpression") return !1;
    if (e.arguments.length === 1) {
        if ($e220d53e1e2a4e8f$var$Pn(e) && t && $e220d53e1e2a4e8f$var$Ct(t)) return $e220d53e1e2a4e8f$var$It(e.arguments[0]);
        if ($e220d53e1e2a4e8f$var$Ha(e)) return $e220d53e1e2a4e8f$var$Pn(e.arguments[0]);
    } else if ((e.arguments.length === 2 || e.arguments.length === 3) && (e.arguments[0].type === "TemplateLiteral" || $e220d53e1e2a4e8f$var$Q(e.arguments[0])) && $e220d53e1e2a4e8f$var$za(e.callee)) return e.arguments[2] && !$e220d53e1e2a4e8f$var$he(e.arguments[2]) ? !1 : (e.arguments.length === 2 ? $e220d53e1e2a4e8f$var$It(e.arguments[1]) : $e220d53e1e2a4e8f$var$$a(e.arguments[1]) && $e220d53e1e2a4e8f$var$X(e.arguments[1]).length <= 1) || $e220d53e1e2a4e8f$var$Pn(e.arguments[1]);
    return !1;
}
var $e220d53e1e2a4e8f$var$k = $e220d53e1e2a4e8f$var$j([
    "CallExpression",
    "OptionalCallExpression"
]), $e220d53e1e2a4e8f$var$J = $e220d53e1e2a4e8f$var$j([
    "MemberExpression",
    "OptionalMemberExpression"
]);
function $e220d53e1e2a4e8f$var$eu(e) {
    let t = "expressions";
    e.type === "TSTemplateLiteralType" && (t = "types");
    let r = e[t];
    return r.length === 0 ? !1 : r.every((n)=>{
        if ($e220d53e1e2a4e8f$var$d(n)) return !1;
        if (n.type === "Identifier" || n.type === "ThisExpression") return !0;
        if (n.type === "ChainExpression" && (n = n.expression), $e220d53e1e2a4e8f$var$J(n)) {
            let s = n;
            for(; $e220d53e1e2a4e8f$var$J(s);)if (s.property.type !== "Identifier" && s.property.type !== "Literal" && s.property.type !== "StringLiteral" && s.property.type !== "NumericLiteral" || (s = s.object, $e220d53e1e2a4e8f$var$d(s))) return !1;
            return s.type === "Identifier" || s.type === "ThisExpression";
        }
        return !1;
    });
}
function $e220d53e1e2a4e8f$var$Ie(e, t) {
    return $e220d53e1e2a4e8f$var$Y(t) ? $e220d53e1e2a4e8f$var$dt(t) : $e220d53e1e2a4e8f$var$d(t, $e220d53e1e2a4e8f$var$x.Leading, (r)=>$e220d53e1e2a4e8f$var$z(e, $e220d53e1e2a4e8f$var$O(r)));
}
function $e220d53e1e2a4e8f$var$_n(e, t) {
    return t.parser !== "json" && $e220d53e1e2a4e8f$var$Q(e.key) && $e220d53e1e2a4e8f$var$oe(e.key).slice(1, -1) === e.key.value && ($e220d53e1e2a4e8f$var$Js(e.key.value) && !(t.parser === "babel-ts" && e.type === "ClassProperty" || t.parser === "typescript" && e.type === "PropertyDefinition") || $e220d53e1e2a4e8f$var$jn(e.key.value) && String(Number(e.key.value)) === e.key.value && (t.parser === "babel" || t.parser === "acorn" || t.parser === "espree" || t.parser === "meriyah" || t.parser === "__babel_estree"));
}
function $e220d53e1e2a4e8f$var$jn(e) {
    return /^(?:\d+|\d+\.\d+)$/.test(e);
}
function $e220d53e1e2a4e8f$var$Hs(e) {
    return e.quasis.some((t)=>t.value.raw.includes(`
`));
}
function $e220d53e1e2a4e8f$var$xr(e, t) {
    return (e.type === "TemplateLiteral" && $e220d53e1e2a4e8f$var$Hs(e) || e.type === "TaggedTemplateExpression" && $e220d53e1e2a4e8f$var$Hs(e.quasi)) && !$e220d53e1e2a4e8f$var$z(t, $e220d53e1e2a4e8f$var$U(e), {
        backwards: !0
    });
}
function $e220d53e1e2a4e8f$var$gr(e) {
    if (!$e220d53e1e2a4e8f$var$d(e)) return !1;
    let t = $e220d53e1e2a4e8f$var$w(!1, $e220d53e1e2a4e8f$var$Kt(e, $e220d53e1e2a4e8f$var$x.Dangling), -1);
    return t && !$e220d53e1e2a4e8f$var$ae(t);
}
function $e220d53e1e2a4e8f$var$tu(e) {
    if (e.length <= 1) return !1;
    let t = 0;
    for (let r of e)if ($e220d53e1e2a4e8f$var$It(r)) {
        if (t += 1, t > 1) return !0;
    } else if ($e220d53e1e2a4e8f$var$k(r)) {
        for (let n of r.arguments)if ($e220d53e1e2a4e8f$var$It(n)) return !0;
    }
    return !1;
}
function $e220d53e1e2a4e8f$var$hr(e) {
    let { node: t, parent: r, key: n } = e;
    return n === "callee" && $e220d53e1e2a4e8f$var$k(t) && $e220d53e1e2a4e8f$var$k(r) && r.arguments.length > 0 && t.arguments.length > r.arguments.length;
}
var $e220d53e1e2a4e8f$var$Qa = new Set([
    "!",
    "-",
    "+",
    "~"
]);
function $e220d53e1e2a4e8f$var$ge(e, t = 2) {
    if (t <= 0) return !1;
    let r = (n)=>$e220d53e1e2a4e8f$var$ge(n, t - 1);
    if ($e220d53e1e2a4e8f$var$wn(e)) return $e220d53e1e2a4e8f$var$tt(e.pattern ?? e.regex.pattern) <= 5;
    if (e.type === "Literal" || e.type === "BigIntLiteral" || e.type === "DecimalLiteral" || e.type === "BooleanLiteral" || e.type === "NullLiteral" || e.type === "NumericLiteral" || e.type === "StringLiteral" || e.type === "Identifier" || e.type === "ThisExpression" || e.type === "Super" || e.type === "PrivateName" || e.type === "PrivateIdentifier" || e.type === "ArgumentPlaceholder" || e.type === "Import") return !0;
    if (e.type === "TemplateLiteral") return e.quasis.every((n)=>!n.value.raw.includes(`
`)) && e.expressions.every(r);
    if ($e220d53e1e2a4e8f$var$ee(e)) return e.properties.every((n)=>!n.computed && (n.shorthand || n.value && r(n.value)));
    if ($e220d53e1e2a4e8f$var$G(e)) return e.elements.every((n)=>n === null || r(n));
    if ($e220d53e1e2a4e8f$var$it(e)) {
        if (e.type === "ImportExpression" || $e220d53e1e2a4e8f$var$ge(e.callee, t)) {
            let n = $e220d53e1e2a4e8f$var$Ce(e);
            return n.length <= t && n.every(r);
        }
        return !1;
    }
    return $e220d53e1e2a4e8f$var$J(e) ? $e220d53e1e2a4e8f$var$ge(e.object, t) && $e220d53e1e2a4e8f$var$ge(e.property, t) : e.type === "UnaryExpression" && $e220d53e1e2a4e8f$var$Qa.has(e.operator) || e.type === "UpdateExpression" ? $e220d53e1e2a4e8f$var$ge(e.argument, t) : e.type === "TSNonNullExpression" ? $e220d53e1e2a4e8f$var$ge(e.expression, t) : !1;
}
function $e220d53e1e2a4e8f$var$oe(e) {
    var t;
    return ((t = e.extra) == null ? void 0 : t.raw) ?? e.raw;
}
function $e220d53e1e2a4e8f$var$ru(e) {
    return e;
}
function $e220d53e1e2a4e8f$var$le(e, t = "es5") {
    return e.trailingComma === "es5" && t === "es5" || e.trailingComma === "all" && (t === "all" || t === "es5");
}
function $e220d53e1e2a4e8f$var$re(e, t) {
    switch(e.type){
        case "BinaryExpression":
        case "LogicalExpression":
        case "AssignmentExpression":
        case "NGPipeExpression":
            return $e220d53e1e2a4e8f$var$re(e.left, t);
        case "MemberExpression":
        case "OptionalMemberExpression":
            return $e220d53e1e2a4e8f$var$re(e.object, t);
        case "TaggedTemplateExpression":
            return e.tag.type === "FunctionExpression" ? !1 : $e220d53e1e2a4e8f$var$re(e.tag, t);
        case "CallExpression":
        case "OptionalCallExpression":
            return e.callee.type === "FunctionExpression" ? !1 : $e220d53e1e2a4e8f$var$re(e.callee, t);
        case "ConditionalExpression":
            return $e220d53e1e2a4e8f$var$re(e.test, t);
        case "UpdateExpression":
            return !e.prefix && $e220d53e1e2a4e8f$var$re(e.argument, t);
        case "BindExpression":
            return e.object && $e220d53e1e2a4e8f$var$re(e.object, t);
        case "SequenceExpression":
            return $e220d53e1e2a4e8f$var$re(e.expressions[0], t);
        case "ChainExpression":
        case "TSSatisfiesExpression":
        case "TSAsExpression":
        case "TSNonNullExpression":
            return $e220d53e1e2a4e8f$var$re(e.expression, t);
        default:
            return t(e);
    }
}
var $e220d53e1e2a4e8f$var$Ks = {
    "==": !0,
    "!=": !0,
    "===": !0,
    "!==": !0
}, $e220d53e1e2a4e8f$var$Cr = {
    "*": !0,
    "/": !0,
    "%": !0
}, $e220d53e1e2a4e8f$var$Ln = {
    ">>": !0,
    ">>>": !0,
    "<<": !0
};
function $e220d53e1e2a4e8f$var$Vt(e, t) {
    return !($e220d53e1e2a4e8f$var$Yt(t) !== $e220d53e1e2a4e8f$var$Yt(e) || e === "**" || $e220d53e1e2a4e8f$var$Ks[e] && $e220d53e1e2a4e8f$var$Ks[t] || t === "%" && $e220d53e1e2a4e8f$var$Cr[e] || e === "%" && $e220d53e1e2a4e8f$var$Cr[t] || t !== e && $e220d53e1e2a4e8f$var$Cr[t] && $e220d53e1e2a4e8f$var$Cr[e] || $e220d53e1e2a4e8f$var$Ln[e] && $e220d53e1e2a4e8f$var$Ln[t]);
}
var $e220d53e1e2a4e8f$var$Za = new Map([
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
function $e220d53e1e2a4e8f$var$Yt(e) {
    return $e220d53e1e2a4e8f$var$Za.get(e);
}
function $e220d53e1e2a4e8f$var$nu(e) {
    return !!$e220d53e1e2a4e8f$var$Ln[e] || e === "|" || e === "^" || e === "&";
}
function $e220d53e1e2a4e8f$var$su(e) {
    var r;
    if (e.rest) return !0;
    let t = $e220d53e1e2a4e8f$var$X(e);
    return ((r = $e220d53e1e2a4e8f$var$w(!1, t, -1)) == null ? void 0 : r.type) === "RestElement";
}
var $e220d53e1e2a4e8f$var$kn = new WeakMap;
function $e220d53e1e2a4e8f$var$X(e) {
    if ($e220d53e1e2a4e8f$var$kn.has(e)) return $e220d53e1e2a4e8f$var$kn.get(e);
    let t = [];
    return e.this && t.push(e.this), Array.isArray(e.parameters) ? t.push(...e.parameters) : Array.isArray(e.params) && t.push(...e.params), e.rest && t.push(e.rest), $e220d53e1e2a4e8f$var$kn.set(e, t), t;
}
function $e220d53e1e2a4e8f$var$uu(e, t) {
    let { node: r } = e, n = 0, s = (u)=>t(u, n++);
    r.this && e.call(s, "this"), Array.isArray(r.parameters) ? e.each(s, "parameters") : Array.isArray(r.params) && e.each(s, "params"), r.rest && e.call(s, "rest");
}
var $e220d53e1e2a4e8f$var$In = new WeakMap;
function $e220d53e1e2a4e8f$var$Ce(e) {
    if ($e220d53e1e2a4e8f$var$In.has(e)) return $e220d53e1e2a4e8f$var$In.get(e);
    let t = e.arguments;
    return e.type === "ImportExpression" && (t = [
        e.source
    ], e.attributes && t.push(e.attributes)), $e220d53e1e2a4e8f$var$In.set(e, t), t;
}
function $e220d53e1e2a4e8f$var$Sr(e, t) {
    let { node: r } = e;
    r.type === "ImportExpression" ? (e.call((n)=>t(n, 0), "source"), r.attributes && e.call((n)=>t(n, 1), "attributes")) : e.each(t, "arguments");
}
function $e220d53e1e2a4e8f$var$Mn(e, t) {
    if (e.type === "ImportExpression") {
        if (t === 0 || t === (e.attributes ? -2 : -1)) return "source";
        if (e.attributes && (t === 1 || t === -1)) return "attributes";
        throw new RangeError("Invalid argument index");
    }
    if (t < 0 && (t = e.arguments.length + t), t < 0 || t >= e.arguments.length) throw new RangeError("Invalid argument index");
    return [
        "arguments",
        t
    ];
}
function $e220d53e1e2a4e8f$var$Ht(e) {
    return e.value.trim() === "prettier-ignore" && !e.unignore;
}
function $e220d53e1e2a4e8f$var$dt(e) {
    return (e == null ? void 0 : e.prettierIgnore) || $e220d53e1e2a4e8f$var$d(e, $e220d53e1e2a4e8f$var$x.PrettierIgnore);
}
var $e220d53e1e2a4e8f$var$x = {
    Leading: 2,
    Trailing: 4,
    Dangling: 8,
    Block: 16,
    Line: 32,
    PrettierIgnore: 64,
    First: 128,
    Last: 256
}, $e220d53e1e2a4e8f$var$iu = (e, t)=>{
    if (typeof e == "function" && (t = e, e = 0), e || t) return (r, n, s)=>!(e & $e220d53e1e2a4e8f$var$x.Leading && !r.leading || e & $e220d53e1e2a4e8f$var$x.Trailing && !r.trailing || e & $e220d53e1e2a4e8f$var$x.Dangling && (r.leading || r.trailing) || e & $e220d53e1e2a4e8f$var$x.Block && !$e220d53e1e2a4e8f$var$ae(r) || e & $e220d53e1e2a4e8f$var$x.Line && !$e220d53e1e2a4e8f$var$$t(r) || e & $e220d53e1e2a4e8f$var$x.First && n !== 0 || e & $e220d53e1e2a4e8f$var$x.Last && n !== s.length - 1 || e & $e220d53e1e2a4e8f$var$x.PrettierIgnore && !$e220d53e1e2a4e8f$var$Ht(r) || t && !t(r));
};
function $e220d53e1e2a4e8f$var$d(e, t, r) {
    if (!$e220d53e1e2a4e8f$var$b(e == null ? void 0 : e.comments)) return !1;
    let n = $e220d53e1e2a4e8f$var$iu(t, r);
    return n ? e.comments.some(n) : !0;
}
function $e220d53e1e2a4e8f$var$Kt(e, t, r) {
    if (!Array.isArray(e == null ? void 0 : e.comments)) return [];
    let n = $e220d53e1e2a4e8f$var$iu(t, r);
    return n ? e.comments.filter(n) : e.comments;
}
var $e220d53e1e2a4e8f$var$me = (e, { originalText: t })=>$e220d53e1e2a4e8f$var$kt(t, $e220d53e1e2a4e8f$var$O(e));
function $e220d53e1e2a4e8f$var$it(e) {
    return $e220d53e1e2a4e8f$var$k(e) || e.type === "NewExpression" || e.type === "ImportExpression";
}
function $e220d53e1e2a4e8f$var$fe(e) {
    return e && (e.type === "ObjectProperty" || e.type === "Property" && !e.method && e.kind === "init");
}
var $e220d53e1e2a4e8f$var$zt = Symbol("ifWithoutBlockAndSameLineComment"), $e220d53e1e2a4e8f$var$Le = $e220d53e1e2a4e8f$var$j([
    "TSAsExpression",
    "TSSatisfiesExpression"
]);
function $e220d53e1e2a4e8f$var$Rn(e, t) {
    var u, i, a, o, p, m, D;
    if (e.isRoot) return !1;
    let { node: r, key: n, parent: s } = e;
    if (t.__isInHtmlInterpolation && !t.bracketSpacing && $e220d53e1e2a4e8f$var$no(r) && $e220d53e1e2a4e8f$var$Qt(e)) return !0;
    if ($e220d53e1e2a4e8f$var$eo(r)) return !1;
    if (r.type === "Identifier") {
        if ((u = r.extra) != null && u.parenthesized && /^PRETTIER_HTML_PLACEHOLDER_\d+_\d+_IN_JS$/.test(r.name) || n === "left" && (r.name === "async" && !s.await || r.name === "let") && s.type === "ForOfStatement") return !0;
        if (r.name === "let") {
            let c = (i = e.findAncestor((f)=>f.type === "ForOfStatement")) == null ? void 0 : i.left;
            if (c && $e220d53e1e2a4e8f$var$re(c, (f)=>f === r)) return !0;
        }
        if (n === "object" && r.name === "let" && s.type === "MemberExpression" && s.computed && !s.optional) {
            let c = e.findAncestor((l)=>l.type === "ExpressionStatement" || l.type === "ForStatement" || l.type === "ForInStatement"), f = c ? c.type === "ExpressionStatement" ? c.expression : c.type === "ForStatement" ? c.init : c.left : void 0;
            if (f && $e220d53e1e2a4e8f$var$re(f, (l)=>l === r)) return !0;
        }
        return !1;
    }
    if (r.type === "ObjectExpression" || r.type === "FunctionExpression" || r.type === "ClassExpression" || r.type === "DoExpression") {
        let c = (a = e.findAncestor((f)=>f.type === "ExpressionStatement")) == null ? void 0 : a.expression;
        if (c && $e220d53e1e2a4e8f$var$re(c, (f)=>f === r)) return !0;
    }
    if (r.type === "ObjectExpression") {
        let c = (o = e.findAncestor((f)=>f.type === "ArrowFunctionExpression")) == null ? void 0 : o.body;
        if (c && c.type !== "SequenceExpression" && c.type !== "AssignmentExpression" && $e220d53e1e2a4e8f$var$re(c, (f)=>f === r)) return !0;
    }
    switch(s.type){
        case "ParenthesizedExpression":
            return !1;
        case "ClassDeclaration":
        case "ClassExpression":
            if (n === "superClass" && (r.type === "ArrowFunctionExpression" || r.type === "AssignmentExpression" || r.type === "AwaitExpression" || r.type === "BinaryExpression" || r.type === "ConditionalExpression" || r.type === "LogicalExpression" || r.type === "NewExpression" || r.type === "ObjectExpression" || r.type === "SequenceExpression" || r.type === "TaggedTemplateExpression" || r.type === "UnaryExpression" || r.type === "UpdateExpression" || r.type === "YieldExpression" || r.type === "TSNonNullExpression" || r.type === "ClassExpression" && $e220d53e1e2a4e8f$var$b(r.decorators))) return !0;
            break;
        case "ExportDefaultDeclaration":
            return $e220d53e1e2a4e8f$var$au(e, t) || r.type === "SequenceExpression";
        case "Decorator":
            if (n === "expression") {
                if ($e220d53e1e2a4e8f$var$J(r) && r.computed) return !0;
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
            if (e.match(void 0, void 0, (c, f)=>f === "returnType" && c.type === "ArrowFunctionExpression") && $e220d53e1e2a4e8f$var$ro(r)) return !0;
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
            if (s.type === "UpdateExpression" || r.operator === "in" && $e220d53e1e2a4e8f$var$to(e)) return !0;
            if (r.operator === "|>" && (p = r.extra) != null && p.parenthesized) {
                let c = e.grandparent;
                if (c.type === "BinaryExpression" && c.operator === "|>") return !0;
            }
        case "TSTypeAssertion":
        case "TSAsExpression":
        case "TSSatisfiesExpression":
        case "LogicalExpression":
            switch(s.type){
                case "TSAsExpression":
                case "TSSatisfiesExpression":
                    return !$e220d53e1e2a4e8f$var$Le(r);
                case "ConditionalExpression":
                    return $e220d53e1e2a4e8f$var$Le(r);
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
                    return n === "left" && (r.type === "TSTypeAssertion" || $e220d53e1e2a4e8f$var$Le(r));
                case "LogicalExpression":
                    if (r.type === "LogicalExpression") return s.operator !== r.operator;
                case "BinaryExpression":
                    {
                        let { operator: c, type: f } = r;
                        if (!c && f !== "TSTypeAssertion") return !0;
                        let l = $e220d53e1e2a4e8f$var$Yt(c), h = s.operator, g = $e220d53e1e2a4e8f$var$Yt(h);
                        return g > l || n === "right" && g === l || g === l && !$e220d53e1e2a4e8f$var$Vt(h, c) ? !0 : g < l && c === "%" ? h === "+" || h === "-" : !!$e220d53e1e2a4e8f$var$nu(h);
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
                return c.type === "UnionTypeAnnotation" || c.type === "IntersectionTypeAnnotation" || c.type === "ArrayTypeAnnotation" || n === "objectType" && (c.type === "IndexedAccessType" || c.type === "OptionalIndexedAccessType") || n === "checkType" && s.type === "ConditionalTypeAnnotation" || n === "extendsType" && s.type === "ConditionalTypeAnnotation" && r.returnType.type === "InferTypeAnnotation" && r.returnType.typeParameter.bound || c.type === "NullableTypeAnnotation" || s.type === "FunctionTypeParam" && s.name === null && $e220d53e1e2a4e8f$var$X(r).some((f)=>{
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
                case "TSNonNullExpression":
                    return !0;
                case "NewExpression":
                case "CallExpression":
                case "OptionalCallExpression":
                    return n === "callee";
                case "ConditionalExpression":
                    return n === "test";
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
                    return s.operator !== "|>" || ((m = r.extra) == null ? void 0 : m.parenthesized);
                case "NewExpression":
                case "CallExpression":
                case "OptionalCallExpression":
                    return n === "callee";
                case "MemberExpression":
                case "OptionalMemberExpression":
                    return n === "object";
                case "TSAsExpression":
                case "TSSatisfiesExpression":
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
            if ($e220d53e1e2a4e8f$var$so(e)) return !0;
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
            return n === "callee" && (s.type === "BindExpression" || s.type === "NewExpression") || n === "object" && $e220d53e1e2a4e8f$var$J(s);
        case "NGPipeExpression":
            return !(s.type === "NGRoot" || s.type === "NGMicrosyntaxExpression" || s.type === "ObjectProperty" && !((D = r.extra) != null && D.parenthesized) || $e220d53e1e2a4e8f$var$G(s) || n === "arguments" && $e220d53e1e2a4e8f$var$k(s) || n === "right" && s.type === "NGPipeExpression" || n === "property" && s.type === "MemberExpression" || s.type === "AssignmentExpression");
        case "JSXFragment":
        case "JSXElement":
            return n === "callee" || n === "left" && s.type === "BinaryExpression" && s.operator === "<" || !$e220d53e1e2a4e8f$var$G(s) && s.type !== "ArrowFunctionExpression" && s.type !== "AssignmentExpression" && s.type !== "AssignmentPattern" && s.type !== "BinaryExpression" && s.type !== "NewExpression" && s.type !== "ConditionalExpression" && s.type !== "ExpressionStatement" && s.type !== "JsExpressionRoot" && s.type !== "JSXAttribute" && s.type !== "JSXElement" && s.type !== "JSXExpressionContainer" && s.type !== "JSXFragment" && s.type !== "LogicalExpression" && !$e220d53e1e2a4e8f$var$k(s) && !$e220d53e1e2a4e8f$var$fe(s) && s.type !== "ReturnStatement" && s.type !== "ThrowStatement" && s.type !== "TypeCastExpression" && s.type !== "VariableDeclarator" && s.type !== "YieldExpression";
        case "TSInstantiationExpression":
            return n === "object" && $e220d53e1e2a4e8f$var$J(s);
    }
    return !1;
}
var $e220d53e1e2a4e8f$var$eo = $e220d53e1e2a4e8f$var$j([
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
function $e220d53e1e2a4e8f$var$to(e) {
    let t = 0, { node: r } = e;
    for(; r;){
        let n = e.getParentNode(t++);
        if ((n == null ? void 0 : n.type) === "ForStatement" && n.init === r) return !0;
        r = n;
    }
    return !1;
}
function $e220d53e1e2a4e8f$var$ro(e) {
    return $e220d53e1e2a4e8f$var$Xt(e, (t)=>t.type === "ObjectTypeAnnotation" && $e220d53e1e2a4e8f$var$Xt(t, (r)=>r.type === "FunctionTypeAnnotation"));
}
function $e220d53e1e2a4e8f$var$no(e) {
    return $e220d53e1e2a4e8f$var$ee(e);
}
function $e220d53e1e2a4e8f$var$Qt(e) {
    let { parent: t, key: r } = e;
    switch(t.type){
        case "NGPipeExpression":
            if (r === "arguments" && e.isLast) return e.callParent($e220d53e1e2a4e8f$var$Qt);
            break;
        case "ObjectProperty":
            if (r === "value") return e.callParent(()=>e.key === "properties" && e.isLast);
            break;
        case "BinaryExpression":
        case "LogicalExpression":
            if (r === "right") return e.callParent($e220d53e1e2a4e8f$var$Qt);
            break;
        case "ConditionalExpression":
            if (r === "alternate") return e.callParent($e220d53e1e2a4e8f$var$Qt);
            break;
        case "UnaryExpression":
            if (t.prefix) return e.callParent($e220d53e1e2a4e8f$var$Qt);
            break;
    }
    return !1;
}
function $e220d53e1e2a4e8f$var$au(e, t) {
    let { node: r, parent: n } = e;
    return r.type === "FunctionExpression" || r.type === "ClassExpression" ? n.type === "ExportDefaultDeclaration" || !$e220d53e1e2a4e8f$var$Rn(e, t) : !$e220d53e1e2a4e8f$var$Lt(r) || n.type !== "ExportDefaultDeclaration" && $e220d53e1e2a4e8f$var$Rn(e, t) ? !1 : e.call(()=>$e220d53e1e2a4e8f$var$au(e, t), ...$e220d53e1e2a4e8f$var$dr(r));
}
function $e220d53e1e2a4e8f$var$so(e) {
    let { node: t, parent: r, grandparent: n, key: s } = e;
    return !!((t.type === "OptionalMemberExpression" || t.type === "OptionalCallExpression") && (s === "object" && r.type === "MemberExpression" || s === "callee" && (r.type === "CallExpression" || r.type === "NewExpression") || r.type === "TSNonNullExpression" && n.type === "MemberExpression" && n.object === r) || e.match(()=>t.type === "CallExpression" || t.type === "MemberExpression", (u, i)=>i === "expression" && u.type === "ChainExpression") && (e.match(void 0, void 0, (u, i)=>i === "callee" && (u.type === "CallExpression" && !u.optional || u.type === "NewExpression") || i === "object" && u.type === "MemberExpression" && !u.optional) || e.match(void 0, void 0, (u, i)=>i === "expression" && u.type === "TSNonNullExpression", (u, i)=>i === "object" && u.type === "MemberExpression")) || e.match(()=>t.type === "CallExpression" || t.type === "MemberExpression", (u, i)=>i === "expression" && u.type === "TSNonNullExpression", (u, i)=>i === "expression" && u.type === "ChainExpression", (u, i)=>i === "object" && u.type === "MemberExpression"));
}
var $e220d53e1e2a4e8f$var$we = $e220d53e1e2a4e8f$var$Rn;
var $e220d53e1e2a4e8f$var$uo = (e, t, r, n)=>{
    if (!(e && t == null)) return t.replaceAll ? t.replaceAll(r, n) : r.global ? t.replace(r, n) : t.split(r).join(n);
}, $e220d53e1e2a4e8f$var$H = $e220d53e1e2a4e8f$var$uo;
function $e220d53e1e2a4e8f$var$io(e, t) {
    let r = t - 1;
    r = $e220d53e1e2a4e8f$var$We(e, r, {
        backwards: !0
    }), r = $e220d53e1e2a4e8f$var$Ye(e, r, {
        backwards: !0
    }), r = $e220d53e1e2a4e8f$var$We(e, r, {
        backwards: !0
    });
    let n = $e220d53e1e2a4e8f$var$Ye(e, r, {
        backwards: !0
    });
    return r !== n;
}
var $e220d53e1e2a4e8f$var$ou = $e220d53e1e2a4e8f$var$io;
var $e220d53e1e2a4e8f$var$ao = ()=>!0;
function $e220d53e1e2a4e8f$var$Jn(e, t) {
    let r = e.node;
    return r.printed = !0, t.printer.printComment(e, t);
}
function $e220d53e1e2a4e8f$var$oo(e, t) {
    var m;
    let r = e.node, n = [
        $e220d53e1e2a4e8f$var$Jn(e, t)
    ], { printer: s, originalText: u, locStart: i, locEnd: a } = t;
    if ((m = s.isBlockComment) == null ? void 0 : m.call(s, r)) {
        let D = $e220d53e1e2a4e8f$var$z(u, a(r)) ? $e220d53e1e2a4e8f$var$z(u, i(r), {
            backwards: !0
        }) ? $e220d53e1e2a4e8f$var$C : $e220d53e1e2a4e8f$var$A : " ";
        n.push(D);
    } else n.push($e220d53e1e2a4e8f$var$C);
    let p = $e220d53e1e2a4e8f$var$Ye(u, $e220d53e1e2a4e8f$var$We(u, a(r)));
    return p !== !1 && $e220d53e1e2a4e8f$var$z(u, p) && n.push($e220d53e1e2a4e8f$var$C), n;
}
function $e220d53e1e2a4e8f$var$po(e, t, r) {
    var p;
    let n = e.node, s = $e220d53e1e2a4e8f$var$Jn(e, t), { printer: u, originalText: i, locStart: a } = t, o = (p = u.isBlockComment) == null ? void 0 : p.call(u, n);
    if (r != null && r.hasLineSuffix && !(r != null && r.isBlock) || $e220d53e1e2a4e8f$var$z(i, a(n), {
        backwards: !0
    })) {
        let m = $e220d53e1e2a4e8f$var$ou(i, a(n));
        return {
            doc: $e220d53e1e2a4e8f$var$hn([
                $e220d53e1e2a4e8f$var$C,
                m ? $e220d53e1e2a4e8f$var$C : "",
                s
            ]),
            isBlock: o,
            hasLineSuffix: !0
        };
    }
    return !o || r != null && r.hasLineSuffix ? {
        doc: [
            $e220d53e1e2a4e8f$var$hn([
                " ",
                s
            ]),
            $e220d53e1e2a4e8f$var$Te
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
function $e220d53e1e2a4e8f$var$M(e, t, r = {}) {
    let { node: n } = e;
    if (!$e220d53e1e2a4e8f$var$b(n == null ? void 0 : n.comments)) return "";
    let { indent: s = !1, marker: u, filter: i = $e220d53e1e2a4e8f$var$ao } = r, a = [];
    if (e.each(({ node: p })=>{
        p.leading || p.trailing || p.marker !== u || !i(p) || a.push($e220d53e1e2a4e8f$var$Jn(e, t));
    }, "comments"), a.length === 0) return "";
    let o = $e220d53e1e2a4e8f$var$B($e220d53e1e2a4e8f$var$C, a);
    return s ? $e220d53e1e2a4e8f$var$E([
        $e220d53e1e2a4e8f$var$C,
        o
    ]) : o;
}
function $e220d53e1e2a4e8f$var$Nn(e, t) {
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
        let { leading: p, trailing: m } = o;
        p ? u.push($e220d53e1e2a4e8f$var$oo(e, t)) : m && (a = $e220d53e1e2a4e8f$var$po(e, t, a), i.push(a.doc));
    }, "comments"), {
        leading: u,
        trailing: i
    };
}
function $e220d53e1e2a4e8f$var$pe(e, t, r) {
    let { leading: n, trailing: s } = $e220d53e1e2a4e8f$var$Nn(e, r);
    return !n && !s ? t : $e220d53e1e2a4e8f$var$Gt(t, (u)=>[
            n,
            u,
            s
        ]);
}
var $e220d53e1e2a4e8f$var$Un = class extends Error {
    name = "UnexpectedNodeError";
    constructor(t, r, n = "type"){
        super(`Unexpected ${r} node ${n}: ${JSON.stringify(t[n])}.`), this.node = t;
    }
}, $e220d53e1e2a4e8f$var$Oe = $e220d53e1e2a4e8f$var$Un;
var $e220d53e1e2a4e8f$var$Br = "'", $e220d53e1e2a4e8f$var$pu = '"';
function $e220d53e1e2a4e8f$var$co(e, t) {
    let r = t === !0 || t === $e220d53e1e2a4e8f$var$Br ? $e220d53e1e2a4e8f$var$Br : $e220d53e1e2a4e8f$var$pu, n = r === $e220d53e1e2a4e8f$var$Br ? $e220d53e1e2a4e8f$var$pu : $e220d53e1e2a4e8f$var$Br, s = 0, u = 0;
    for (let i of e)i === r ? s++ : i === n && u++;
    return s > u ? n : r;
}
var $e220d53e1e2a4e8f$var$br = $e220d53e1e2a4e8f$var$co;
function $e220d53e1e2a4e8f$var$Gn(e) {
    if (typeof e != "string") throw new TypeError("Expected a string");
    return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
var $e220d53e1e2a4e8f$var$ve, $e220d53e1e2a4e8f$var$qn = class {
    constructor(t){
        $e220d53e1e2a4e8f$var$bs(this, $e220d53e1e2a4e8f$var$ve, void 0);
        $e220d53e1e2a4e8f$var$Ps(this, $e220d53e1e2a4e8f$var$ve, new Set(t));
    }
    getLeadingWhitespaceCount(t) {
        let r = $e220d53e1e2a4e8f$var$st(this, $e220d53e1e2a4e8f$var$ve), n = 0;
        for(let s = 0; s < t.length && r.has(t.charAt(s)); s++)n++;
        return n;
    }
    getTrailingWhitespaceCount(t) {
        let r = $e220d53e1e2a4e8f$var$st(this, $e220d53e1e2a4e8f$var$ve), n = 0;
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
        return $e220d53e1e2a4e8f$var$st(this, $e220d53e1e2a4e8f$var$ve).has(t.charAt(0));
    }
    hasTrailingWhitespace(t) {
        return $e220d53e1e2a4e8f$var$st(this, $e220d53e1e2a4e8f$var$ve).has($e220d53e1e2a4e8f$var$w(!1, t, -1));
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
        let n = `[${$e220d53e1e2a4e8f$var$Gn([
            ...$e220d53e1e2a4e8f$var$st(this, $e220d53e1e2a4e8f$var$ve)
        ].join(""))}]+`, s = new RegExp(r ? `(${n})` : n);
        return t.split(s);
    }
    hasWhitespaceCharacter(t) {
        let r = $e220d53e1e2a4e8f$var$st(this, $e220d53e1e2a4e8f$var$ve);
        return Array.prototype.some.call(t, (n)=>r.has(n));
    }
    hasNonWhitespaceCharacter(t) {
        let r = $e220d53e1e2a4e8f$var$st(this, $e220d53e1e2a4e8f$var$ve);
        return Array.prototype.some.call(t, (n)=>!r.has(n));
    }
    isWhitespaceOnly(t) {
        let r = $e220d53e1e2a4e8f$var$st(this, $e220d53e1e2a4e8f$var$ve);
        return Array.prototype.every.call(t, (n)=>r.has(n));
    }
};
$e220d53e1e2a4e8f$var$ve = new WeakMap;
var $e220d53e1e2a4e8f$var$cu = $e220d53e1e2a4e8f$var$qn;
var $e220d53e1e2a4e8f$var$Kn = {};
$e220d53e1e2a4e8f$var$or($e220d53e1e2a4e8f$var$Kn, {
    endOfLine: ()=>$e220d53e1e2a4e8f$var$Fo,
    ownLine: ()=>$e220d53e1e2a4e8f$var$Eo,
    remaining: ()=>$e220d53e1e2a4e8f$var$Co
});
function $e220d53e1e2a4e8f$var$lo(e, t) {
    let r = null, n = t;
    for(; n !== r;)r = n, n = $e220d53e1e2a4e8f$var$We(e, n), n = $e220d53e1e2a4e8f$var$bt(e, n), n = $e220d53e1e2a4e8f$var$Pt(e, n), n = $e220d53e1e2a4e8f$var$Ye(e, n);
    return n;
}
var $e220d53e1e2a4e8f$var$Xe = $e220d53e1e2a4e8f$var$lo;
function $e220d53e1e2a4e8f$var$mo(e, t) {
    let r = $e220d53e1e2a4e8f$var$Xe(e, t);
    return r === !1 ? "" : e.charAt(r);
}
var $e220d53e1e2a4e8f$var$$e = $e220d53e1e2a4e8f$var$mo;
function $e220d53e1e2a4e8f$var$yo(e, t, r) {
    for(let n = t; n < r; ++n)if (e.charAt(n) === `
`) return !0;
    return !1;
}
var $e220d53e1e2a4e8f$var$rt = $e220d53e1e2a4e8f$var$yo;
function $e220d53e1e2a4e8f$var$Do(e) {
    let t = e.type || e.kind || "(unknown type)", r = String(e.name || e.id && (typeof e.id == "object" ? e.id.name : e.id) || e.key && (typeof e.key == "object" ? e.key.name : e.key) || e.value && (typeof e.value == "object" ? "" : String(e.value)) || e.operator || "");
    return r.length > 20 && (r = r.slice(0, 19) + "\u2026"), t + (r ? " " + r : "");
}
function $e220d53e1e2a4e8f$var$Wn(e, t) {
    (e.comments ?? (e.comments = [])).push(t), t.printed = !1, t.nodeDescription = $e220d53e1e2a4e8f$var$Do(e);
}
function $e220d53e1e2a4e8f$var$ne(e, t) {
    t.leading = !0, t.trailing = !1, $e220d53e1e2a4e8f$var$Wn(e, t);
}
function $e220d53e1e2a4e8f$var$_e(e, t, r) {
    t.leading = !1, t.trailing = !1, r && (t.marker = r), $e220d53e1e2a4e8f$var$Wn(e, t);
}
function $e220d53e1e2a4e8f$var$te(e, t) {
    t.leading = !1, t.trailing = !0, $e220d53e1e2a4e8f$var$Wn(e, t);
}
function $e220d53e1e2a4e8f$var$fo(e) {
    return $e220d53e1e2a4e8f$var$ae(e) && e.value[0] === "*" && /@(?:type|satisfies)\b/.test(e.value);
}
var $e220d53e1e2a4e8f$var$lu = $e220d53e1e2a4e8f$var$fo;
function $e220d53e1e2a4e8f$var$Eo(e) {
    return [
        $e220d53e1e2a4e8f$var$Cu,
        $e220d53e1e2a4e8f$var$fu,
        $e220d53e1e2a4e8f$var$To,
        $e220d53e1e2a4e8f$var$Xn,
        $e220d53e1e2a4e8f$var$$n,
        $e220d53e1e2a4e8f$var$mu,
        $e220d53e1e2a4e8f$var$yu,
        $e220d53e1e2a4e8f$var$Oo,
        $e220d53e1e2a4e8f$var$Lo,
        $e220d53e1e2a4e8f$var$Hn,
        $e220d53e1e2a4e8f$var$Fu,
        $e220d53e1e2a4e8f$var$vo,
        $e220d53e1e2a4e8f$var$Du,
        $e220d53e1e2a4e8f$var$Eu,
        $e220d53e1e2a4e8f$var$Vn
    ].some((t)=>t(e));
}
function $e220d53e1e2a4e8f$var$Fo(e) {
    return [
        $e220d53e1e2a4e8f$var$Ao,
        $e220d53e1e2a4e8f$var$fu,
        $e220d53e1e2a4e8f$var$xo,
        $e220d53e1e2a4e8f$var$Fu,
        $e220d53e1e2a4e8f$var$Xn,
        $e220d53e1e2a4e8f$var$$n,
        $e220d53e1e2a4e8f$var$mu,
        $e220d53e1e2a4e8f$var$yu,
        $e220d53e1e2a4e8f$var$Eu,
        $e220d53e1e2a4e8f$var$Io,
        $e220d53e1e2a4e8f$var$wo,
        $e220d53e1e2a4e8f$var$Hn,
        $e220d53e1e2a4e8f$var$Mo,
        $e220d53e1e2a4e8f$var$Vn,
        $e220d53e1e2a4e8f$var$No
    ].some((t)=>t(e));
}
function $e220d53e1e2a4e8f$var$Co(e) {
    return [
        $e220d53e1e2a4e8f$var$Cu,
        $e220d53e1e2a4e8f$var$Xn,
        $e220d53e1e2a4e8f$var$$n,
        $e220d53e1e2a4e8f$var$go,
        $e220d53e1e2a4e8f$var$ko,
        $e220d53e1e2a4e8f$var$Du,
        $e220d53e1e2a4e8f$var$Hn,
        $e220d53e1e2a4e8f$var$Po,
        $e220d53e1e2a4e8f$var$bo,
        $e220d53e1e2a4e8f$var$Jo,
        $e220d53e1e2a4e8f$var$Vn,
        $e220d53e1e2a4e8f$var$Ro
    ].some((t)=>t(e));
}
function $e220d53e1e2a4e8f$var$At(e, t) {
    let r = (e.body || e.properties).find(({ type: n })=>n !== "EmptyStatement");
    r ? $e220d53e1e2a4e8f$var$ne(r, t) : $e220d53e1e2a4e8f$var$_e(e, t);
}
function $e220d53e1e2a4e8f$var$Yn(e, t) {
    e.type === "BlockStatement" ? $e220d53e1e2a4e8f$var$At(e, t) : $e220d53e1e2a4e8f$var$ne(e, t);
}
function $e220d53e1e2a4e8f$var$Ao({ comment: e, followingNode: t }) {
    return t && $e220d53e1e2a4e8f$var$lu(e) ? ($e220d53e1e2a4e8f$var$ne(t, e), !0) : !1;
}
function $e220d53e1e2a4e8f$var$Xn({ comment: e, precedingNode: t, enclosingNode: r, followingNode: n, text: s }) {
    if ((r == null ? void 0 : r.type) !== "IfStatement" || !n) return !1;
    if ($e220d53e1e2a4e8f$var$$e(s, $e220d53e1e2a4e8f$var$O(e)) === ")") return $e220d53e1e2a4e8f$var$te(t, e), !0;
    if (t === r.consequent && n === r.alternate) {
        if (t.type === "BlockStatement") $e220d53e1e2a4e8f$var$te(t, e);
        else {
            let i = e.type === "SingleLine" || e.loc.start.line === e.loc.end.line, a = e.loc.start.line === t.loc.start.line;
            i && a ? $e220d53e1e2a4e8f$var$_e(t, e, t.type === "ExpressionStatement" ? $e220d53e1e2a4e8f$var$zt : void 0) : $e220d53e1e2a4e8f$var$_e(r, e);
        }
        return !0;
    }
    return n.type === "BlockStatement" ? ($e220d53e1e2a4e8f$var$At(n, e), !0) : n.type === "IfStatement" ? ($e220d53e1e2a4e8f$var$Yn(n.consequent, e), !0) : r.consequent === n ? ($e220d53e1e2a4e8f$var$ne(n, e), !0) : !1;
}
function $e220d53e1e2a4e8f$var$$n({ comment: e, precedingNode: t, enclosingNode: r, followingNode: n, text: s }) {
    return (r == null ? void 0 : r.type) !== "WhileStatement" || !n ? !1 : $e220d53e1e2a4e8f$var$$e(s, $e220d53e1e2a4e8f$var$O(e)) === ")" ? ($e220d53e1e2a4e8f$var$te(t, e), !0) : n.type === "BlockStatement" ? ($e220d53e1e2a4e8f$var$At(n, e), !0) : r.body === n ? ($e220d53e1e2a4e8f$var$ne(n, e), !0) : !1;
}
function $e220d53e1e2a4e8f$var$mu({ comment: e, precedingNode: t, enclosingNode: r, followingNode: n }) {
    return (r == null ? void 0 : r.type) !== "TryStatement" && (r == null ? void 0 : r.type) !== "CatchClause" || !n ? !1 : r.type === "CatchClause" && t ? ($e220d53e1e2a4e8f$var$te(t, e), !0) : n.type === "BlockStatement" ? ($e220d53e1e2a4e8f$var$At(n, e), !0) : n.type === "TryStatement" ? ($e220d53e1e2a4e8f$var$Yn(n.finalizer, e), !0) : n.type === "CatchClause" ? ($e220d53e1e2a4e8f$var$Yn(n.body, e), !0) : !1;
}
function $e220d53e1e2a4e8f$var$To({ comment: e, enclosingNode: t, followingNode: r }) {
    return $e220d53e1e2a4e8f$var$J(t) && (r == null ? void 0 : r.type) === "Identifier" ? ($e220d53e1e2a4e8f$var$ne(t, e), !0) : !1;
}
function $e220d53e1e2a4e8f$var$xo({ comment: e, precedingNode: t, enclosingNode: r, followingNode: n, text: s }) {
    let u = t && !$e220d53e1e2a4e8f$var$rt(s, $e220d53e1e2a4e8f$var$O(t), $e220d53e1e2a4e8f$var$U(e));
    return (!t || !u) && ((r == null ? void 0 : r.type) === "ConditionalExpression" || (r == null ? void 0 : r.type) === "TSConditionalType") && n ? ($e220d53e1e2a4e8f$var$ne(n, e), !0) : !1;
}
function $e220d53e1e2a4e8f$var$go({ comment: e, precedingNode: t, enclosingNode: r }) {
    return $e220d53e1e2a4e8f$var$fe(r) && r.shorthand && r.key === t && r.value.type === "AssignmentPattern" ? ($e220d53e1e2a4e8f$var$te(r.value.left, e), !0) : !1;
}
var $e220d53e1e2a4e8f$var$ho = new Set([
    "ClassDeclaration",
    "ClassExpression",
    "DeclareClass",
    "DeclareInterface",
    "InterfaceDeclaration",
    "TSInterfaceDeclaration"
]);
function $e220d53e1e2a4e8f$var$yu({ comment: e, precedingNode: t, enclosingNode: r, followingNode: n }) {
    if ($e220d53e1e2a4e8f$var$ho.has(r == null ? void 0 : r.type)) {
        if ($e220d53e1e2a4e8f$var$b(r.decorators) && (n == null ? void 0 : n.type) !== "Decorator") return $e220d53e1e2a4e8f$var$te($e220d53e1e2a4e8f$var$w(!1, r.decorators, -1), e), !0;
        if (r.body && n === r.body) return $e220d53e1e2a4e8f$var$At(r.body, e), !0;
        if (n) {
            if (r.superClass && n === r.superClass && t && (t === r.id || t === r.typeParameters)) return $e220d53e1e2a4e8f$var$te(t, e), !0;
            for (let s of [
                "implements",
                "extends",
                "mixins"
            ])if (r[s] && n === r[s][0]) return t && (t === r.id || t === r.typeParameters || t === r.superClass) ? $e220d53e1e2a4e8f$var$te(t, e) : $e220d53e1e2a4e8f$var$_e(r, e, s), !0;
        }
    }
    return !1;
}
var $e220d53e1e2a4e8f$var$So = new Set([
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
function $e220d53e1e2a4e8f$var$Du({ comment: e, precedingNode: t, enclosingNode: r, text: n }) {
    return r && t && $e220d53e1e2a4e8f$var$$e(n, $e220d53e1e2a4e8f$var$O(e)) === "(" && (r.type === "Property" || r.type === "TSDeclareMethod" || r.type === "TSAbstractMethodDefinition") && t.type === "Identifier" && r.key === t && $e220d53e1e2a4e8f$var$$e(n, $e220d53e1e2a4e8f$var$O(t)) !== ":" ? ($e220d53e1e2a4e8f$var$te(t, e), !0) : (t == null ? void 0 : t.type) === "Decorator" && $e220d53e1e2a4e8f$var$So.has(r == null ? void 0 : r.type) ? ($e220d53e1e2a4e8f$var$te(t, e), !0) : !1;
}
var $e220d53e1e2a4e8f$var$Bo = new Set([
    "FunctionDeclaration",
    "FunctionExpression",
    "ClassMethod",
    "MethodDefinition",
    "ObjectMethod"
]);
function $e220d53e1e2a4e8f$var$bo({ comment: e, precedingNode: t, enclosingNode: r, text: n }) {
    return $e220d53e1e2a4e8f$var$$e(n, $e220d53e1e2a4e8f$var$O(e)) !== "(" ? !1 : t && $e220d53e1e2a4e8f$var$Bo.has(r == null ? void 0 : r.type) ? ($e220d53e1e2a4e8f$var$te(t, e), !0) : !1;
}
function $e220d53e1e2a4e8f$var$Po({ comment: e, enclosingNode: t, text: r }) {
    if ((t == null ? void 0 : t.type) !== "ArrowFunctionExpression") return !1;
    let n = $e220d53e1e2a4e8f$var$Xe(r, $e220d53e1e2a4e8f$var$O(e));
    return n !== !1 && r.slice(n, n + 2) === "=>" ? ($e220d53e1e2a4e8f$var$_e(t, e), !0) : !1;
}
function $e220d53e1e2a4e8f$var$ko({ comment: e, enclosingNode: t, text: r }) {
    return $e220d53e1e2a4e8f$var$$e(r, $e220d53e1e2a4e8f$var$O(e)) !== ")" ? !1 : t && ($e220d53e1e2a4e8f$var$du(t) && $e220d53e1e2a4e8f$var$X(t).length === 0 || $e220d53e1e2a4e8f$var$it(t) && $e220d53e1e2a4e8f$var$Ce(t).length === 0) ? ($e220d53e1e2a4e8f$var$_e(t, e), !0) : ((t == null ? void 0 : t.type) === "MethodDefinition" || (t == null ? void 0 : t.type) === "TSAbstractMethodDefinition") && $e220d53e1e2a4e8f$var$X(t.value).length === 0 ? ($e220d53e1e2a4e8f$var$_e(t.value, e), !0) : !1;
}
function $e220d53e1e2a4e8f$var$fu({ comment: e, precedingNode: t, enclosingNode: r, followingNode: n, text: s }) {
    if ((t == null ? void 0 : t.type) === "FunctionTypeParam" && (r == null ? void 0 : r.type) === "FunctionTypeAnnotation" && (n == null ? void 0 : n.type) !== "FunctionTypeParam") return $e220d53e1e2a4e8f$var$te(t, e), !0;
    if (((t == null ? void 0 : t.type) === "Identifier" || (t == null ? void 0 : t.type) === "AssignmentPattern" || (t == null ? void 0 : t.type) === "ObjectPattern" || (t == null ? void 0 : t.type) === "ArrayPattern" || (t == null ? void 0 : t.type) === "RestElement") && r && $e220d53e1e2a4e8f$var$du(r) && $e220d53e1e2a4e8f$var$$e(s, $e220d53e1e2a4e8f$var$O(e)) === ")") return $e220d53e1e2a4e8f$var$te(t, e), !0;
    if ((r == null ? void 0 : r.type) === "FunctionDeclaration" && (n == null ? void 0 : n.type) === "BlockStatement") {
        let u = (()=>{
            let i = $e220d53e1e2a4e8f$var$X(r);
            if (i.length > 0) return $e220d53e1e2a4e8f$var$Xe(s, $e220d53e1e2a4e8f$var$O($e220d53e1e2a4e8f$var$w(!1, i, -1)));
            let a = $e220d53e1e2a4e8f$var$Xe(s, $e220d53e1e2a4e8f$var$O(r.id));
            return a !== !1 && $e220d53e1e2a4e8f$var$Xe(s, a + 1);
        })();
        if ($e220d53e1e2a4e8f$var$U(e) > u) return $e220d53e1e2a4e8f$var$At(n, e), !0;
    }
    return !1;
}
function $e220d53e1e2a4e8f$var$Eu({ comment: e, enclosingNode: t }) {
    return (t == null ? void 0 : t.type) === "LabeledStatement" ? ($e220d53e1e2a4e8f$var$ne(t, e), !0) : !1;
}
function $e220d53e1e2a4e8f$var$Vn({ comment: e, enclosingNode: t }) {
    return ((t == null ? void 0 : t.type) === "ContinueStatement" || (t == null ? void 0 : t.type) === "BreakStatement") && !t.label ? ($e220d53e1e2a4e8f$var$te(t, e), !0) : !1;
}
function $e220d53e1e2a4e8f$var$Io({ comment: e, precedingNode: t, enclosingNode: r }) {
    return $e220d53e1e2a4e8f$var$k(r) && t && r.callee === t && r.arguments.length > 0 ? ($e220d53e1e2a4e8f$var$ne(r.arguments[0], e), !0) : !1;
}
function $e220d53e1e2a4e8f$var$Lo({ comment: e, precedingNode: t, enclosingNode: r, followingNode: n }) {
    return (r == null ? void 0 : r.type) === "UnionTypeAnnotation" || (r == null ? void 0 : r.type) === "TSUnionType" ? ($e220d53e1e2a4e8f$var$Ht(e) && (n.prettierIgnore = !0, e.unignore = !0), t ? ($e220d53e1e2a4e8f$var$te(t, e), !0) : !1) : (((n == null ? void 0 : n.type) === "UnionTypeAnnotation" || (n == null ? void 0 : n.type) === "TSUnionType") && $e220d53e1e2a4e8f$var$Ht(e) && (n.types[0].prettierIgnore = !0, e.unignore = !0), !1);
}
function $e220d53e1e2a4e8f$var$wo({ comment: e, enclosingNode: t }) {
    return $e220d53e1e2a4e8f$var$fe(t) ? ($e220d53e1e2a4e8f$var$ne(t, e), !0) : !1;
}
function $e220d53e1e2a4e8f$var$Hn({ comment: e, enclosingNode: t, followingNode: r, ast: n, isLastComment: s }) {
    var u;
    return ((u = n == null ? void 0 : n.body) == null ? void 0 : u.length) === 0 ? (s ? $e220d53e1e2a4e8f$var$_e(n, e) : $e220d53e1e2a4e8f$var$ne(n, e), !0) : (t == null ? void 0 : t.type) === "Program" && t.body.length === 0 && !$e220d53e1e2a4e8f$var$b(t.directives) ? (s ? $e220d53e1e2a4e8f$var$_e(t, e) : $e220d53e1e2a4e8f$var$ne(t, e), !0) : (r == null ? void 0 : r.type) === "Program" && r.body.length === 0 && (t == null ? void 0 : t.type) === "ModuleExpression" ? ($e220d53e1e2a4e8f$var$_e(r, e), !0) : !1;
}
function $e220d53e1e2a4e8f$var$Oo({ comment: e, enclosingNode: t }) {
    return (t == null ? void 0 : t.type) === "ForInStatement" || (t == null ? void 0 : t.type) === "ForOfStatement" ? ($e220d53e1e2a4e8f$var$ne(t, e), !0) : !1;
}
function $e220d53e1e2a4e8f$var$Fu({ comment: e, precedingNode: t, enclosingNode: r, text: n }) {
    if ((r == null ? void 0 : r.type) === "ImportSpecifier" || (r == null ? void 0 : r.type) === "ExportSpecifier") return $e220d53e1e2a4e8f$var$ne(r, e), !0;
    let s = (t == null ? void 0 : t.type) === "ImportSpecifier" && (r == null ? void 0 : r.type) === "ImportDeclaration", u = (t == null ? void 0 : t.type) === "ExportSpecifier" && (r == null ? void 0 : r.type) === "ExportNamedDeclaration";
    return (s || u) && $e220d53e1e2a4e8f$var$z(n, $e220d53e1e2a4e8f$var$O(e)) ? ($e220d53e1e2a4e8f$var$te(t, e), !0) : !1;
}
function $e220d53e1e2a4e8f$var$vo({ comment: e, enclosingNode: t }) {
    return (t == null ? void 0 : t.type) === "AssignmentPattern" ? ($e220d53e1e2a4e8f$var$ne(t, e), !0) : !1;
}
var $e220d53e1e2a4e8f$var$_o = new Set([
    "VariableDeclarator",
    "AssignmentExpression",
    "TypeAlias",
    "TSTypeAliasDeclaration"
]), $e220d53e1e2a4e8f$var$jo = new Set([
    "ObjectExpression",
    "RecordExpression",
    "ArrayExpression",
    "TupleExpression",
    "TemplateLiteral",
    "TaggedTemplateExpression",
    "ObjectTypeAnnotation",
    "TSTypeLiteral"
]);
function $e220d53e1e2a4e8f$var$Mo({ comment: e, enclosingNode: t, followingNode: r }) {
    return $e220d53e1e2a4e8f$var$_o.has(t == null ? void 0 : t.type) && r && ($e220d53e1e2a4e8f$var$jo.has(r.type) || $e220d53e1e2a4e8f$var$ae(e)) ? ($e220d53e1e2a4e8f$var$ne(r, e), !0) : !1;
}
function $e220d53e1e2a4e8f$var$Ro({ comment: e, enclosingNode: t, followingNode: r, text: n }) {
    return !r && ((t == null ? void 0 : t.type) === "TSMethodSignature" || (t == null ? void 0 : t.type) === "TSDeclareFunction" || (t == null ? void 0 : t.type) === "TSAbstractMethodDefinition") && $e220d53e1e2a4e8f$var$$e(n, $e220d53e1e2a4e8f$var$O(e)) === ";" ? ($e220d53e1e2a4e8f$var$te(t, e), !0) : !1;
}
function $e220d53e1e2a4e8f$var$Cu({ comment: e, enclosingNode: t, followingNode: r }) {
    if ($e220d53e1e2a4e8f$var$Ht(e) && (t == null ? void 0 : t.type) === "TSMappedType" && (r == null ? void 0 : r.type) === "TSTypeParameter" && r.constraint) return t.prettierIgnore = !0, e.unignore = !0, !0;
}
function $e220d53e1e2a4e8f$var$Jo({ comment: e, precedingNode: t, enclosingNode: r, followingNode: n }) {
    return (r == null ? void 0 : r.type) !== "TSMappedType" ? !1 : (n == null ? void 0 : n.type) === "TSTypeParameter" && n.name ? ($e220d53e1e2a4e8f$var$ne(n.name, e), !0) : (t == null ? void 0 : t.type) === "TSTypeParameter" && t.constraint ? ($e220d53e1e2a4e8f$var$te(t.constraint, e), !0) : !1;
}
function $e220d53e1e2a4e8f$var$No({ comment: e, enclosingNode: t, followingNode: r }) {
    return !t || t.type !== "SwitchCase" || t.test || !r || r !== t.consequent[0] ? !1 : (r.type === "BlockStatement" && $e220d53e1e2a4e8f$var$$t(e) ? $e220d53e1e2a4e8f$var$At(r, e) : $e220d53e1e2a4e8f$var$_e(t, e), !0);
}
var $e220d53e1e2a4e8f$var$du = $e220d53e1e2a4e8f$var$j([
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
function $e220d53e1e2a4e8f$var$Uo(e) {
    let t = `*${e.value}*`.split(`
`);
    return t.length > 1 && t.every((r)=>r.trimStart()[0] === "*");
}
var $e220d53e1e2a4e8f$var$Au = $e220d53e1e2a4e8f$var$Uo;
function $e220d53e1e2a4e8f$var$Tu(e, t) {
    let r = e.node;
    if ($e220d53e1e2a4e8f$var$$t(r)) return t.originalText.slice($e220d53e1e2a4e8f$var$U(r), $e220d53e1e2a4e8f$var$O(r)).trimEnd();
    if ($e220d53e1e2a4e8f$var$ae(r)) return $e220d53e1e2a4e8f$var$Au(r) ? $e220d53e1e2a4e8f$var$Go(r) : [
        "/*",
        $e220d53e1e2a4e8f$var$xe(r.value),
        "*/"
    ];
    throw new Error("Not a comment: " + JSON.stringify(r));
}
function $e220d53e1e2a4e8f$var$Go(e) {
    let t = e.value.split(`
`);
    return [
        "/*",
        $e220d53e1e2a4e8f$var$B($e220d53e1e2a4e8f$var$C, t.map((r, n)=>n === 0 ? r.trimEnd() : " " + (n < t.length - 1 ? r.trim() : r.trimStart()))),
        "*/"
    ];
}
var $e220d53e1e2a4e8f$var$qo = new Set([
    "EmptyStatement",
    "TemplateElement",
    "Import",
    "TSEmptyBodyFunctionExpression",
    "ChainExpression"
]);
function $e220d53e1e2a4e8f$var$Wo(e) {
    return !$e220d53e1e2a4e8f$var$qo.has(e.type);
}
function $e220d53e1e2a4e8f$var$Yo(e, t) {
    var r;
    if ((t.parser === "typescript" || t.parser === "flow" || t.parser === "acorn" || t.parser === "espree" || t.parser === "meriyah" || t.parser === "__babel_estree") && e.type === "MethodDefinition" && ((r = e.value) == null ? void 0 : r.type) === "FunctionExpression" && $e220d53e1e2a4e8f$var$X(e.value).length === 0 && !e.value.returnType && !$e220d53e1e2a4e8f$var$b(e.value.typeParameters) && e.value.body) return [
        ...e.decorators || [],
        e.key,
        e.value.body
    ];
}
function $e220d53e1e2a4e8f$var$zn(e) {
    let { node: t, parent: r } = e;
    return ($e220d53e1e2a4e8f$var$Y(t) || r && (r.type === "JSXSpreadAttribute" || r.type === "JSXSpreadChild" || r.type === "UnionTypeAnnotation" || r.type === "TSUnionType" || (r.type === "ClassDeclaration" || r.type === "ClassExpression") && r.superClass === t)) && (!$e220d53e1e2a4e8f$var$dt(t) || r.type === "UnionTypeAnnotation" || r.type === "TSUnionType");
}
function $e220d53e1e2a4e8f$var$Xo(e, { parser: t }) {
    if (t === "flow" || t === "babel-flow") return e = $e220d53e1e2a4e8f$var$H(!1, e, /[\s(]/g, ""), e === "" || e === "/*" || e === "/*::";
}
var $e220d53e1e2a4e8f$var$Pr = new $e220d53e1e2a4e8f$var$cu(` 
\r	`), $e220d53e1e2a4e8f$var$Qn = (e)=>e === "" || e === $e220d53e1e2a4e8f$var$A || e === $e220d53e1e2a4e8f$var$C || e === $e220d53e1e2a4e8f$var$F;
function $e220d53e1e2a4e8f$var$$o(e, t, r) {
    var v, _, R;
    let { node: n } = e;
    if (n.type === "JSXElement" && $e220d53e1e2a4e8f$var$ap(n)) return [
        r("openingElement"),
        r("closingElement")
    ];
    let s = n.type === "JSXElement" ? r("openingElement") : r("openingFragment"), u = n.type === "JSXElement" ? r("closingElement") : r("closingFragment");
    if (n.children.length === 1 && n.children[0].type === "JSXExpressionContainer" && (n.children[0].expression.type === "TemplateLiteral" || n.children[0].expression.type === "TaggedTemplateExpression")) return [
        s,
        ...e.map(r, "children"),
        u
    ];
    n.children = n.children.map((T)=>$e220d53e1e2a4e8f$var$op(T) ? {
            type: "JSXText",
            value: " ",
            raw: " "
        } : T);
    let i = n.children.some($e220d53e1e2a4e8f$var$Y), a = n.children.filter((T)=>T.type === "JSXExpressionContainer").length > 1, o = n.type === "JSXElement" && n.openingElement.attributes.length > 1, p = $e220d53e1e2a4e8f$var$K(s) || i || o || a, m = e.parent.rootMarker === "mdx", D = t.singleQuote ? "{' '}" : '{" "}', c = m ? " " : $e220d53e1e2a4e8f$var$P([
        D,
        $e220d53e1e2a4e8f$var$F
    ], " "), f = ((_ = (v = n.openingElement) == null ? void 0 : v.name) == null ? void 0 : _.name) === "fbt", l = $e220d53e1e2a4e8f$var$Vo(e, t, r, c, f), h = n.children.some((T)=>$e220d53e1e2a4e8f$var$Zt(T));
    for(let T = l.length - 2; T >= 0; T--){
        let N = l[T] === "" && l[T + 1] === "", Se = l[T] === $e220d53e1e2a4e8f$var$C && l[T + 1] === "" && l[T + 2] === $e220d53e1e2a4e8f$var$C, V = (l[T] === $e220d53e1e2a4e8f$var$F || l[T] === $e220d53e1e2a4e8f$var$C) && l[T + 1] === "" && l[T + 2] === c, Be = l[T] === c && l[T + 1] === "" && (l[T + 2] === $e220d53e1e2a4e8f$var$F || l[T + 2] === $e220d53e1e2a4e8f$var$C), Ee = l[T] === c && l[T + 1] === "" && l[T + 2] === c, Cn = l[T] === $e220d53e1e2a4e8f$var$F && l[T + 1] === "" && l[T + 2] === $e220d53e1e2a4e8f$var$C || l[T] === $e220d53e1e2a4e8f$var$C && l[T + 1] === "" && l[T + 2] === $e220d53e1e2a4e8f$var$F;
        Se && h || N || V || Ee || Cn ? l.splice(T, 2) : Be && l.splice(T + 1, 2);
    }
    for(; l.length > 0 && $e220d53e1e2a4e8f$var$Qn($e220d53e1e2a4e8f$var$w(!1, l, -1));)l.pop();
    for(; l.length > 1 && $e220d53e1e2a4e8f$var$Qn(l[0]) && $e220d53e1e2a4e8f$var$Qn(l[1]);)l.shift(), l.shift();
    let g = [];
    for (let [T, N] of l.entries()){
        if (N === c) {
            if (T === 1 && l[T - 1] === "") {
                if (l.length === 2) {
                    g.push(D);
                    continue;
                }
                g.push([
                    D,
                    $e220d53e1e2a4e8f$var$C
                ]);
                continue;
            } else if (T === l.length - 1) {
                g.push(D);
                continue;
            } else if (l[T - 1] === "" && l[T - 2] === $e220d53e1e2a4e8f$var$C) {
                g.push(D);
                continue;
            }
        }
        g.push(N), $e220d53e1e2a4e8f$var$K(N) && (p = !0);
    }
    let S = h ? $e220d53e1e2a4e8f$var$St(g) : $e220d53e1e2a4e8f$var$y(g, {
        shouldBreak: !0
    });
    if (((R = t.cursorNode) == null ? void 0 : R.type) === "JSXText" && n.children.includes(t.cursorNode) && (S = [
        $e220d53e1e2a4e8f$var$Bn,
        S,
        $e220d53e1e2a4e8f$var$Bn
    ]), m) return S;
    let I = $e220d53e1e2a4e8f$var$y([
        s,
        $e220d53e1e2a4e8f$var$E([
            $e220d53e1e2a4e8f$var$C,
            S
        ]),
        $e220d53e1e2a4e8f$var$C,
        u
    ]);
    return p ? I : $e220d53e1e2a4e8f$var$qe([
        $e220d53e1e2a4e8f$var$y([
            s,
            ...l,
            u
        ]),
        I
    ]);
}
function $e220d53e1e2a4e8f$var$Vo(e, t, r, n, s) {
    let u = [];
    return e.each(({ node: i, next: a })=>{
        if (i.type === "JSXText") {
            let o = $e220d53e1e2a4e8f$var$oe(i);
            if ($e220d53e1e2a4e8f$var$Zt(i)) {
                let p = $e220d53e1e2a4e8f$var$Pr.split(o, !0);
                p[0] === "" && (u.push(""), p.shift(), /\n/.test(p[0]) ? u.push($e220d53e1e2a4e8f$var$gu(s, p[1], i, a)) : u.push(n), p.shift());
                let m;
                if ($e220d53e1e2a4e8f$var$w(!1, p, -1) === "" && (p.pop(), m = p.pop()), p.length === 0) return;
                for (let [D, c] of p.entries())D % 2 === 1 ? u.push($e220d53e1e2a4e8f$var$A) : u.push(c);
                m !== void 0 ? /\n/.test(m) ? u.push($e220d53e1e2a4e8f$var$gu(s, $e220d53e1e2a4e8f$var$w(!1, u, -1), i, a)) : u.push(n) : u.push($e220d53e1e2a4e8f$var$xu(s, $e220d53e1e2a4e8f$var$w(!1, u, -1), i, a));
            } else /\n/.test(o) ? o.match(/\n/g).length > 1 && u.push("", $e220d53e1e2a4e8f$var$C) : u.push("", n);
        } else {
            let o = r();
            if (u.push(o), a && $e220d53e1e2a4e8f$var$Zt(a)) {
                let m = $e220d53e1e2a4e8f$var$Pr.trim($e220d53e1e2a4e8f$var$oe(a)), [D] = $e220d53e1e2a4e8f$var$Pr.split(m);
                u.push($e220d53e1e2a4e8f$var$xu(s, D, i, a));
            } else u.push($e220d53e1e2a4e8f$var$C);
        }
    }, "children"), u;
}
function $e220d53e1e2a4e8f$var$xu(e, t, r, n) {
    return e ? "" : r.type === "JSXElement" && !r.closingElement || (n == null ? void 0 : n.type) === "JSXElement" && !n.closingElement ? t.length === 1 ? $e220d53e1e2a4e8f$var$F : $e220d53e1e2a4e8f$var$C : $e220d53e1e2a4e8f$var$F;
}
function $e220d53e1e2a4e8f$var$gu(e, t, r, n) {
    return e ? $e220d53e1e2a4e8f$var$C : t.length === 1 ? r.type === "JSXElement" && !r.closingElement || (n == null ? void 0 : n.type) === "JSXElement" && !n.closingElement ? $e220d53e1e2a4e8f$var$C : $e220d53e1e2a4e8f$var$F : $e220d53e1e2a4e8f$var$C;
}
var $e220d53e1e2a4e8f$var$Ho = new Set([
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
function $e220d53e1e2a4e8f$var$Ko(e, t, r) {
    let { parent: n } = e;
    if ($e220d53e1e2a4e8f$var$Ho.has(n.type)) return t;
    let s = e.match(void 0, (i)=>i.type === "ArrowFunctionExpression", $e220d53e1e2a4e8f$var$k, (i)=>i.type === "JSXExpressionContainer"), u = $e220d53e1e2a4e8f$var$we(e, r);
    return $e220d53e1e2a4e8f$var$y([
        u ? "" : $e220d53e1e2a4e8f$var$P("("),
        $e220d53e1e2a4e8f$var$E([
            $e220d53e1e2a4e8f$var$F,
            t
        ]),
        $e220d53e1e2a4e8f$var$F,
        u ? "" : $e220d53e1e2a4e8f$var$P(")")
    ], {
        shouldBreak: s
    });
}
function $e220d53e1e2a4e8f$var$zo(e, t, r) {
    let { node: n } = e, s = [];
    if (s.push(r("name")), n.value) {
        let u;
        if ($e220d53e1e2a4e8f$var$Q(n.value)) {
            let i = $e220d53e1e2a4e8f$var$oe(n.value), a = $e220d53e1e2a4e8f$var$H(!1, $e220d53e1e2a4e8f$var$H(!1, i.slice(1, -1), "&apos;", "'"), "&quot;", '"'), o = $e220d53e1e2a4e8f$var$br(a, t.jsxSingleQuote);
            a = o === '"' ? $e220d53e1e2a4e8f$var$H(!1, a, '"', "&quot;") : $e220d53e1e2a4e8f$var$H(!1, a, "'", "&apos;"), u = e.call(()=>$e220d53e1e2a4e8f$var$pe(e, $e220d53e1e2a4e8f$var$xe(o + a + o), t), "value");
        } else u = r("value");
        s.push("=", u);
    }
    return s;
}
function $e220d53e1e2a4e8f$var$Qo(e, t, r) {
    let { node: n } = e, s = (u, i)=>u.type === "JSXEmptyExpression" || !$e220d53e1e2a4e8f$var$d(u) && ($e220d53e1e2a4e8f$var$G(u) || $e220d53e1e2a4e8f$var$ee(u) || u.type === "ArrowFunctionExpression" || u.type === "AwaitExpression" && (s(u.argument, u) || u.argument.type === "JSXElement") || $e220d53e1e2a4e8f$var$k(u) || u.type === "ChainExpression" && $e220d53e1e2a4e8f$var$k(u.expression) || u.type === "FunctionExpression" || u.type === "TemplateLiteral" || u.type === "TaggedTemplateExpression" || u.type === "DoExpression" || $e220d53e1e2a4e8f$var$Y(i) && (u.type === "ConditionalExpression" || $e220d53e1e2a4e8f$var$ce(u)));
    return s(n.expression, e.parent) ? $e220d53e1e2a4e8f$var$y([
        "{",
        r("expression"),
        $e220d53e1e2a4e8f$var$Ae,
        "}"
    ]) : $e220d53e1e2a4e8f$var$y([
        "{",
        $e220d53e1e2a4e8f$var$E([
            $e220d53e1e2a4e8f$var$F,
            r("expression")
        ]),
        $e220d53e1e2a4e8f$var$F,
        $e220d53e1e2a4e8f$var$Ae,
        "}"
    ]);
}
function $e220d53e1e2a4e8f$var$Zo(e, t, r) {
    var a, o;
    let { node: n } = e, s = $e220d53e1e2a4e8f$var$d(n.name) || $e220d53e1e2a4e8f$var$d(n.typeParameters);
    if (n.selfClosing && n.attributes.length === 0 && !s) return [
        "<",
        r("name"),
        r("typeParameters"),
        " />"
    ];
    if (((a = n.attributes) == null ? void 0 : a.length) === 1 && n.attributes[0].value && $e220d53e1e2a4e8f$var$Q(n.attributes[0].value) && !n.attributes[0].value.value.includes(`
`) && !s && !$e220d53e1e2a4e8f$var$d(n.attributes[0])) return $e220d53e1e2a4e8f$var$y([
        "<",
        r("name"),
        r("typeParameters"),
        " ",
        ...e.map(r, "attributes"),
        n.selfClosing ? " />" : ">"
    ]);
    let u = (o = n.attributes) == null ? void 0 : o.some((p)=>p.value && $e220d53e1e2a4e8f$var$Q(p.value) && p.value.value.includes(`
`)), i = t.singleAttributePerLine && n.attributes.length > 1 ? $e220d53e1e2a4e8f$var$C : $e220d53e1e2a4e8f$var$A;
    return $e220d53e1e2a4e8f$var$y([
        "<",
        r("name"),
        r("typeParameters"),
        $e220d53e1e2a4e8f$var$E(e.map(()=>[
                i,
                r()
            ], "attributes")),
        ...$e220d53e1e2a4e8f$var$ep(n, t, s)
    ], {
        shouldBreak: u
    });
}
function $e220d53e1e2a4e8f$var$ep(e, t, r) {
    return e.selfClosing ? [
        $e220d53e1e2a4e8f$var$A,
        "/>"
    ] : $e220d53e1e2a4e8f$var$tp(e, t, r) ? [
        ">"
    ] : [
        $e220d53e1e2a4e8f$var$F,
        ">"
    ];
}
function $e220d53e1e2a4e8f$var$tp(e, t, r) {
    let n = e.attributes.length > 0 && $e220d53e1e2a4e8f$var$d($e220d53e1e2a4e8f$var$w(!1, e.attributes, -1), $e220d53e1e2a4e8f$var$x.Trailing);
    return e.attributes.length === 0 && !r || (t.bracketSameLine || t.jsxBracketSameLine) && (!r || e.attributes.length > 0) && !n;
}
function $e220d53e1e2a4e8f$var$rp(e, t, r) {
    let { node: n } = e, s = [];
    s.push("</");
    let u = r("name");
    return $e220d53e1e2a4e8f$var$d(n.name, $e220d53e1e2a4e8f$var$x.Leading | $e220d53e1e2a4e8f$var$x.Line) ? s.push($e220d53e1e2a4e8f$var$E([
        $e220d53e1e2a4e8f$var$C,
        u
    ]), $e220d53e1e2a4e8f$var$C) : $e220d53e1e2a4e8f$var$d(n.name, $e220d53e1e2a4e8f$var$x.Leading | $e220d53e1e2a4e8f$var$x.Block) ? s.push(" ", u) : s.push(u), s.push(">"), s;
}
function $e220d53e1e2a4e8f$var$np(e, t) {
    let { node: r } = e, n = $e220d53e1e2a4e8f$var$d(r), s = $e220d53e1e2a4e8f$var$d(r, $e220d53e1e2a4e8f$var$x.Line), u = r.type === "JSXOpeningFragment";
    return [
        u ? "<" : "</",
        $e220d53e1e2a4e8f$var$E([
            s ? $e220d53e1e2a4e8f$var$C : n && !u ? " " : "",
            $e220d53e1e2a4e8f$var$M(e, t)
        ]),
        s ? $e220d53e1e2a4e8f$var$C : "",
        ">"
    ];
}
function $e220d53e1e2a4e8f$var$sp(e, t, r) {
    let n = $e220d53e1e2a4e8f$var$pe(e, $e220d53e1e2a4e8f$var$$o(e, t, r), t);
    return $e220d53e1e2a4e8f$var$Ko(e, n, t);
}
function $e220d53e1e2a4e8f$var$up(e, t) {
    let { node: r } = e, n = $e220d53e1e2a4e8f$var$d(r, $e220d53e1e2a4e8f$var$x.Line);
    return [
        $e220d53e1e2a4e8f$var$M(e, t, {
            indent: n
        }),
        n ? $e220d53e1e2a4e8f$var$C : ""
    ];
}
function $e220d53e1e2a4e8f$var$ip(e, t, r) {
    let { node: n } = e;
    return [
        "{",
        e.call(({ node: s })=>{
            let u = [
                "...",
                r()
            ];
            return !$e220d53e1e2a4e8f$var$d(s) || !$e220d53e1e2a4e8f$var$zn(e) ? u : [
                $e220d53e1e2a4e8f$var$E([
                    $e220d53e1e2a4e8f$var$F,
                    $e220d53e1e2a4e8f$var$pe(e, u, t)
                ]),
                $e220d53e1e2a4e8f$var$F
            ];
        }, n.type === "JSXSpreadAttribute" ? "argument" : "expression"),
        "}"
    ];
}
function $e220d53e1e2a4e8f$var$hu(e, t, r) {
    let { node: n } = e;
    if (n.type.startsWith("JSX")) switch(n.type){
        case "JSXAttribute":
            return $e220d53e1e2a4e8f$var$zo(e, t, r);
        case "JSXIdentifier":
            return n.name;
        case "JSXNamespacedName":
            return $e220d53e1e2a4e8f$var$B(":", [
                r("namespace"),
                r("name")
            ]);
        case "JSXMemberExpression":
            return $e220d53e1e2a4e8f$var$B(".", [
                r("object"),
                r("property")
            ]);
        case "JSXSpreadAttribute":
        case "JSXSpreadChild":
            return $e220d53e1e2a4e8f$var$ip(e, t, r);
        case "JSXExpressionContainer":
            return $e220d53e1e2a4e8f$var$Qo(e, t, r);
        case "JSXFragment":
        case "JSXElement":
            return $e220d53e1e2a4e8f$var$sp(e, t, r);
        case "JSXOpeningElement":
            return $e220d53e1e2a4e8f$var$Zo(e, t, r);
        case "JSXClosingElement":
            return $e220d53e1e2a4e8f$var$rp(e, t, r);
        case "JSXOpeningFragment":
        case "JSXClosingFragment":
            return $e220d53e1e2a4e8f$var$np(e, t);
        case "JSXEmptyExpression":
            return $e220d53e1e2a4e8f$var$up(e, t);
        case "JSXText":
            throw new Error("JSXText should be handled by JSXElement");
        default:
            throw new $e220d53e1e2a4e8f$var$Oe(n, "JSX");
    }
}
function $e220d53e1e2a4e8f$var$ap(e) {
    if (e.children.length === 0) return !0;
    if (e.children.length > 1) return !1;
    let t = e.children[0];
    return t.type === "JSXText" && !$e220d53e1e2a4e8f$var$Zt(t);
}
function $e220d53e1e2a4e8f$var$Zt(e) {
    return e.type === "JSXText" && ($e220d53e1e2a4e8f$var$Pr.hasNonWhitespaceCharacter($e220d53e1e2a4e8f$var$oe(e)) || !/\n/.test($e220d53e1e2a4e8f$var$oe(e)));
}
function $e220d53e1e2a4e8f$var$op(e) {
    return e.type === "JSXExpressionContainer" && $e220d53e1e2a4e8f$var$Q(e.expression) && e.expression.value === " " && !$e220d53e1e2a4e8f$var$d(e.expression);
}
function $e220d53e1e2a4e8f$var$Su(e) {
    let { node: t, parent: r } = e;
    if (!$e220d53e1e2a4e8f$var$Y(t) || !$e220d53e1e2a4e8f$var$Y(r)) return !1;
    let { index: n, siblings: s } = e, u;
    for(let i = n; i > 0; i--){
        let a = s[i - 1];
        if (!(a.type === "JSXText" && !$e220d53e1e2a4e8f$var$Zt(a))) {
            u = a;
            break;
        }
    }
    return (u == null ? void 0 : u.type) === "JSXExpressionContainer" && u.expression.type === "JSXEmptyExpression" && $e220d53e1e2a4e8f$var$dt(u.expression);
}
function $e220d53e1e2a4e8f$var$pp(e) {
    return $e220d53e1e2a4e8f$var$dt(e.node) || $e220d53e1e2a4e8f$var$Su(e);
}
var $e220d53e1e2a4e8f$var$kr = $e220d53e1e2a4e8f$var$pp;
var $e220d53e1e2a4e8f$var$cp = 0;
function $e220d53e1e2a4e8f$var$Ir(e, t, r) {
    var _;
    let { node: n, parent: s, grandparent: u, key: i } = e, a = i !== "body" && (s.type === "IfStatement" || s.type === "WhileStatement" || s.type === "SwitchStatement" || s.type === "DoWhileStatement"), o = n.operator === "|>" && ((_ = e.root.extra) == null ? void 0 : _.__isUsingHackPipeline), p = $e220d53e1e2a4e8f$var$Zn(e, r, t, !1, a);
    if (a) return p;
    if (o) return $e220d53e1e2a4e8f$var$y(p);
    if ($e220d53e1e2a4e8f$var$k(s) && s.callee === n || s.type === "UnaryExpression" || $e220d53e1e2a4e8f$var$J(s) && !s.computed) return $e220d53e1e2a4e8f$var$y([
        $e220d53e1e2a4e8f$var$E([
            $e220d53e1e2a4e8f$var$F,
            ...p
        ]),
        $e220d53e1e2a4e8f$var$F
    ]);
    let m = s.type === "ReturnStatement" || s.type === "ThrowStatement" || s.type === "JSXExpressionContainer" && u.type === "JSXAttribute" || n.operator !== "|" && s.type === "JsExpressionRoot" || n.type !== "NGPipeExpression" && (s.type === "NGRoot" && t.parser === "__ng_binding" || s.type === "NGMicrosyntaxExpression" && u.type === "NGMicrosyntax" && u.body.length === 1) || n === s.body && s.type === "ArrowFunctionExpression" || n !== s.body && s.type === "ForStatement" || s.type === "ConditionalExpression" && u.type !== "ReturnStatement" && u.type !== "ThrowStatement" && !$e220d53e1e2a4e8f$var$k(u) || s.type === "TemplateLiteral", D = s.type === "AssignmentExpression" || s.type === "VariableDeclarator" || s.type === "ClassProperty" || s.type === "PropertyDefinition" || s.type === "TSAbstractPropertyDefinition" || s.type === "ClassPrivateProperty" || $e220d53e1e2a4e8f$var$fe(s), c = $e220d53e1e2a4e8f$var$ce(n.left) && $e220d53e1e2a4e8f$var$Vt(n.operator, n.left.operator);
    if (m || $e220d53e1e2a4e8f$var$Ot(n) && !c || !$e220d53e1e2a4e8f$var$Ot(n) && D) return $e220d53e1e2a4e8f$var$y(p);
    if (p.length === 0) return "";
    let f = $e220d53e1e2a4e8f$var$Y(n.right), l = p.findIndex((R)=>typeof R != "string" && !Array.isArray(R) && R.type === $e220d53e1e2a4e8f$var$ue), h = p.slice(0, l === -1 ? 1 : l + 1), g = p.slice(h.length, f ? -1 : void 0), S = Symbol("logicalChain-" + ++$e220d53e1e2a4e8f$var$cp), I = $e220d53e1e2a4e8f$var$y([
        ...h,
        $e220d53e1e2a4e8f$var$E(g)
    ], {
        id: S
    });
    if (!f) return I;
    let v = $e220d53e1e2a4e8f$var$w(!1, p, -1);
    return $e220d53e1e2a4e8f$var$y([
        I,
        $e220d53e1e2a4e8f$var$mt(v, {
            groupId: S
        })
    ]);
}
function $e220d53e1e2a4e8f$var$Zn(e, t, r, n, s) {
    var h;
    let { node: u } = e;
    if (!$e220d53e1e2a4e8f$var$ce(u)) return [
        $e220d53e1e2a4e8f$var$y(t())
    ];
    let i = [];
    $e220d53e1e2a4e8f$var$Vt(u.operator, u.left.operator) ? i = e.call((g)=>$e220d53e1e2a4e8f$var$Zn(g, t, r, !0, s), "left") : i.push($e220d53e1e2a4e8f$var$y(t("left")));
    let a = $e220d53e1e2a4e8f$var$Ot(u), o = (u.operator === "|>" || u.type === "NGPipeExpression" || $e220d53e1e2a4e8f$var$lp(e, r)) && !$e220d53e1e2a4e8f$var$Ie(r.originalText, u.right), p = u.type === "NGPipeExpression" ? "|" : u.operator, m = u.type === "NGPipeExpression" && u.arguments.length > 0 ? $e220d53e1e2a4e8f$var$y($e220d53e1e2a4e8f$var$E([
        $e220d53e1e2a4e8f$var$F,
        ": ",
        $e220d53e1e2a4e8f$var$B([
            $e220d53e1e2a4e8f$var$A,
            ": "
        ], e.map(()=>$e220d53e1e2a4e8f$var$De(2, $e220d53e1e2a4e8f$var$y(t())), "arguments"))
    ])) : "", D;
    if (a) D = [
        p,
        " ",
        t("right"),
        m
    ];
    else {
        let S = p === "|>" && ((h = e.root.extra) == null ? void 0 : h.__isUsingHackPipeline) ? e.call((I)=>$e220d53e1e2a4e8f$var$Zn(I, t, r, !0, s), "right") : t("right");
        D = [
            o ? $e220d53e1e2a4e8f$var$A : "",
            p,
            o ? " " : $e220d53e1e2a4e8f$var$A,
            S,
            m
        ];
    }
    let { parent: c } = e, f = $e220d53e1e2a4e8f$var$d(u.left, $e220d53e1e2a4e8f$var$x.Trailing | $e220d53e1e2a4e8f$var$x.Line), l = f || !(s && u.type === "LogicalExpression") && c.type !== u.type && u.left.type !== u.type && u.right.type !== u.type;
    if (i.push(o ? "" : " ", l ? $e220d53e1e2a4e8f$var$y(D, {
        shouldBreak: f
    }) : D), n && $e220d53e1e2a4e8f$var$d(u)) {
        let g = $e220d53e1e2a4e8f$var$Bt($e220d53e1e2a4e8f$var$pe(e, i, r));
        return Array.isArray(g) || g.type === $e220d53e1e2a4e8f$var$ye ? $e220d53e1e2a4e8f$var$mr(g) : [
            g
        ];
    }
    return i;
}
function $e220d53e1e2a4e8f$var$Ot(e) {
    return e.type !== "LogicalExpression" ? !1 : !!($e220d53e1e2a4e8f$var$ee(e.right) && e.right.properties.length > 0 || $e220d53e1e2a4e8f$var$G(e.right) && e.right.elements.length > 0 || $e220d53e1e2a4e8f$var$Y(e.right));
}
var $e220d53e1e2a4e8f$var$Bu = (e)=>e.type === "BinaryExpression" && e.operator === "|";
function $e220d53e1e2a4e8f$var$lp(e, t) {
    return (t.parser === "__vue_expression" || t.parser === "__vue_ts_expression") && $e220d53e1e2a4e8f$var$Bu(e.node) && !e.hasAncestor((r)=>!$e220d53e1e2a4e8f$var$Bu(r) && r.type !== "JsExpressionRoot");
}
var $e220d53e1e2a4e8f$var$at = class extends Error {
    name = "ArgExpansionBailout";
};
function $e220d53e1e2a4e8f$var$mp(e, t, r, n) {
    let { node: s } = e;
    return $e220d53e1e2a4e8f$var$d(s, $e220d53e1e2a4e8f$var$x.Dangling) ? $e220d53e1e2a4e8f$var$y([
        r,
        $e220d53e1e2a4e8f$var$M(e, t, {
            indent: !0
        }),
        $e220d53e1e2a4e8f$var$F,
        n
    ]) : [
        r,
        n
    ];
}
function $e220d53e1e2a4e8f$var$vt(e, t, r) {
    let { node: n } = e, s = [], u = n.type === "TupleExpression" ? "#[" : "[", i = "]", a = n.type === "TupleTypeAnnotation" && n.types ? "types" : n.type === "TSTupleType" || n.type === "TupleTypeAnnotation" ? "elementTypes" : "elements", o = n[a];
    if (o.length === 0) s.push($e220d53e1e2a4e8f$var$mp(e, t, u, i));
    else {
        let p = $e220d53e1e2a4e8f$var$w(!1, o, -1), m = (p == null ? void 0 : p.type) !== "RestElement", D = p === null, c = Symbol("array"), f = !t.__inJestEach && o.length > 1 && o.every((g, S, I)=>{
            let v = g == null ? void 0 : g.type;
            if (!$e220d53e1e2a4e8f$var$G(g) && !$e220d53e1e2a4e8f$var$ee(g)) return !1;
            let _ = I[S + 1];
            if (_ && v !== _.type) return !1;
            let R = $e220d53e1e2a4e8f$var$G(g) ? "elements" : "properties";
            return g[R] && g[R].length > 1;
        }), l = $e220d53e1e2a4e8f$var$es(n, t), h = m ? D ? "," : $e220d53e1e2a4e8f$var$le(t) ? l ? $e220d53e1e2a4e8f$var$P(",", "", {
            groupId: c
        }) : $e220d53e1e2a4e8f$var$P(",") : "" : "";
        s.push($e220d53e1e2a4e8f$var$y([
            u,
            $e220d53e1e2a4e8f$var$E([
                $e220d53e1e2a4e8f$var$F,
                l ? $e220d53e1e2a4e8f$var$Dp(e, t, r, h) : [
                    $e220d53e1e2a4e8f$var$yp(e, t, a, r),
                    h
                ],
                $e220d53e1e2a4e8f$var$M(e, t)
            ]),
            $e220d53e1e2a4e8f$var$F,
            i
        ], {
            shouldBreak: f,
            id: c
        }));
    }
    return s.push($e220d53e1e2a4e8f$var$$(e), $e220d53e1e2a4e8f$var$q(e, r)), s;
}
function $e220d53e1e2a4e8f$var$es(e, t) {
    return $e220d53e1e2a4e8f$var$G(e) && e.elements.length > 1 && e.elements.every((r)=>r && ($e220d53e1e2a4e8f$var$he(r) || $e220d53e1e2a4e8f$var$Ar(r) && !$e220d53e1e2a4e8f$var$d(r.argument)) && !$e220d53e1e2a4e8f$var$d(r, $e220d53e1e2a4e8f$var$x.Trailing | $e220d53e1e2a4e8f$var$x.Line, (n)=>!$e220d53e1e2a4e8f$var$z(t.originalText, $e220d53e1e2a4e8f$var$U(n), {
                backwards: !0
            })));
}
function $e220d53e1e2a4e8f$var$bu({ node: e }, { originalText: t }) {
    let r = (s)=>$e220d53e1e2a4e8f$var$bt(t, $e220d53e1e2a4e8f$var$Pt(t, s)), n = (s)=>t[s] === "," ? s : n(r(s + 1));
    return $e220d53e1e2a4e8f$var$kt(t, n($e220d53e1e2a4e8f$var$O(e)));
}
function $e220d53e1e2a4e8f$var$yp(e, t, r, n) {
    let s = [];
    return e.each(({ node: u, isLast: i })=>{
        s.push(u ? $e220d53e1e2a4e8f$var$y(n()) : ""), i || s.push([
            ",",
            $e220d53e1e2a4e8f$var$A,
            u && $e220d53e1e2a4e8f$var$bu(e, t) ? $e220d53e1e2a4e8f$var$F : ""
        ]);
    }, r), s;
}
function $e220d53e1e2a4e8f$var$Dp(e, t, r, n) {
    let s = [];
    return e.each(({ isLast: u, next: i })=>{
        s.push([
            r(),
            u ? n : ","
        ]), u || s.push($e220d53e1e2a4e8f$var$bu(e, t) ? [
            $e220d53e1e2a4e8f$var$C,
            $e220d53e1e2a4e8f$var$C
        ] : $e220d53e1e2a4e8f$var$d(i, $e220d53e1e2a4e8f$var$x.Leading | $e220d53e1e2a4e8f$var$x.Line) ? $e220d53e1e2a4e8f$var$C : $e220d53e1e2a4e8f$var$A);
    }, "elements"), $e220d53e1e2a4e8f$var$St(s);
}
function $e220d53e1e2a4e8f$var$fp(e, t, r) {
    let { node: n } = e, s = $e220d53e1e2a4e8f$var$Ce(n);
    if (s.length === 0) return [
        "(",
        $e220d53e1e2a4e8f$var$M(e, t),
        ")"
    ];
    if ($e220d53e1e2a4e8f$var$Cp(s)) return [
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
    $e220d53e1e2a4e8f$var$Sr(e, ({ node: c }, f)=>{
        let l = r();
        f === i || ($e220d53e1e2a4e8f$var$me(c, t) ? (u = !0, l = [
            l,
            ",",
            $e220d53e1e2a4e8f$var$C,
            $e220d53e1e2a4e8f$var$C
        ]) : l = [
            l,
            ",",
            $e220d53e1e2a4e8f$var$A
        ]), a.push(l);
    });
    let p = !(n.type === "ImportExpression" || n.callee.type === "Import") && $e220d53e1e2a4e8f$var$le(t, "all") ? "," : "";
    function m() {
        return $e220d53e1e2a4e8f$var$y([
            "(",
            $e220d53e1e2a4e8f$var$E([
                $e220d53e1e2a4e8f$var$A,
                ...a
            ]),
            p,
            $e220d53e1e2a4e8f$var$A,
            ")"
        ], {
            shouldBreak: !0
        });
    }
    if (u || e.parent.type !== "Decorator" && $e220d53e1e2a4e8f$var$tu(s)) return m();
    if ($e220d53e1e2a4e8f$var$Fp(s)) {
        let c = a.slice(1);
        if (c.some($e220d53e1e2a4e8f$var$K)) return m();
        let f;
        try {
            f = r($e220d53e1e2a4e8f$var$Mn(n, 0), {
                expandFirstArg: !0
            });
        } catch (l) {
            if (l instanceof $e220d53e1e2a4e8f$var$at) return m();
            throw l;
        }
        return $e220d53e1e2a4e8f$var$K(f) ? [
            $e220d53e1e2a4e8f$var$Te,
            $e220d53e1e2a4e8f$var$qe([
                [
                    "(",
                    $e220d53e1e2a4e8f$var$y(f, {
                        shouldBreak: !0
                    }),
                    ", ",
                    ...c,
                    ")"
                ],
                m()
            ])
        ] : $e220d53e1e2a4e8f$var$qe([
            [
                "(",
                f,
                ", ",
                ...c,
                ")"
            ],
            [
                "(",
                $e220d53e1e2a4e8f$var$y(f, {
                    shouldBreak: !0
                }),
                ", ",
                ...c,
                ")"
            ],
            m()
        ]);
    }
    if ($e220d53e1e2a4e8f$var$Ep(s, a, t)) {
        let c = a.slice(0, -1);
        if (c.some($e220d53e1e2a4e8f$var$K)) return m();
        let f;
        try {
            f = r($e220d53e1e2a4e8f$var$Mn(n, -1), {
                expandLastArg: !0
            });
        } catch (l) {
            if (l instanceof $e220d53e1e2a4e8f$var$at) return m();
            throw l;
        }
        return $e220d53e1e2a4e8f$var$K(f) ? [
            $e220d53e1e2a4e8f$var$Te,
            $e220d53e1e2a4e8f$var$qe([
                [
                    "(",
                    ...c,
                    $e220d53e1e2a4e8f$var$y(f, {
                        shouldBreak: !0
                    }),
                    ")"
                ],
                m()
            ])
        ] : $e220d53e1e2a4e8f$var$qe([
            [
                "(",
                ...c,
                f,
                ")"
            ],
            [
                "(",
                ...c,
                $e220d53e1e2a4e8f$var$y(f, {
                    shouldBreak: !0
                }),
                ")"
            ],
            m()
        ]);
    }
    let D = [
        "(",
        $e220d53e1e2a4e8f$var$E([
            $e220d53e1e2a4e8f$var$F,
            ...a
        ]),
        $e220d53e1e2a4e8f$var$P(p),
        $e220d53e1e2a4e8f$var$F,
        ")"
    ];
    return $e220d53e1e2a4e8f$var$hr(e) ? D : $e220d53e1e2a4e8f$var$y(D, {
        shouldBreak: a.some($e220d53e1e2a4e8f$var$K) || u
    });
}
function $e220d53e1e2a4e8f$var$er(e, t = !1) {
    return $e220d53e1e2a4e8f$var$ee(e) && (e.properties.length > 0 || $e220d53e1e2a4e8f$var$d(e)) || $e220d53e1e2a4e8f$var$G(e) && (e.elements.length > 0 || $e220d53e1e2a4e8f$var$d(e)) || e.type === "TSTypeAssertion" && $e220d53e1e2a4e8f$var$er(e.expression) || $e220d53e1e2a4e8f$var$Le(e) && $e220d53e1e2a4e8f$var$er(e.expression) || e.type === "FunctionExpression" || e.type === "ArrowFunctionExpression" && (!e.returnType || !e.returnType.typeAnnotation || e.returnType.typeAnnotation.type !== "TSTypeReference" || $e220d53e1e2a4e8f$var$dp(e.body)) && (e.body.type === "BlockStatement" || e.body.type === "ArrowFunctionExpression" && $e220d53e1e2a4e8f$var$er(e.body, !0) || $e220d53e1e2a4e8f$var$ee(e.body) || $e220d53e1e2a4e8f$var$G(e.body) || !t && ($e220d53e1e2a4e8f$var$k(e.body) || e.body.type === "ConditionalExpression") || $e220d53e1e2a4e8f$var$Y(e.body)) || e.type === "DoExpression" || e.type === "ModuleExpression";
}
function $e220d53e1e2a4e8f$var$Ep(e, t, r) {
    var u, i;
    let n = $e220d53e1e2a4e8f$var$w(!1, e, -1);
    if (e.length === 1) {
        let a = $e220d53e1e2a4e8f$var$w(!1, t, -1);
        if ((u = a.label) != null && u.embed && ((i = a.label) == null ? void 0 : i.hug) !== !1) return !0;
    }
    let s = $e220d53e1e2a4e8f$var$w(!1, e, -2);
    return !$e220d53e1e2a4e8f$var$d(n, $e220d53e1e2a4e8f$var$x.Leading) && !$e220d53e1e2a4e8f$var$d(n, $e220d53e1e2a4e8f$var$x.Trailing) && $e220d53e1e2a4e8f$var$er(n) && (!s || s.type !== n.type) && (e.length !== 2 || s.type !== "ArrowFunctionExpression" || !$e220d53e1e2a4e8f$var$G(n)) && !(e.length > 1 && $e220d53e1e2a4e8f$var$es(n, r));
}
function $e220d53e1e2a4e8f$var$Fp(e) {
    if (e.length !== 2) return !1;
    let [t, r] = e;
    return t.type === "ModuleExpression" && $e220d53e1e2a4e8f$var$Ap(r) ? !0 : !$e220d53e1e2a4e8f$var$d(t) && (t.type === "FunctionExpression" || t.type === "ArrowFunctionExpression" && t.body.type === "BlockStatement") && r.type !== "FunctionExpression" && r.type !== "ArrowFunctionExpression" && r.type !== "ConditionalExpression" && $e220d53e1e2a4e8f$var$Pu(r) && !$e220d53e1e2a4e8f$var$er(r);
}
function $e220d53e1e2a4e8f$var$Pu(e) {
    var t;
    if (e.type === "ParenthesizedExpression") return $e220d53e1e2a4e8f$var$Pu(e.expression);
    if ($e220d53e1e2a4e8f$var$Le(e) || e.type === "TypeCastExpression") {
        let { typeAnnotation: r } = e;
        return r.type === "TypeAnnotation" && (r = r.typeAnnotation), r.type === "TSArrayType" && (r = r.elementType, r.type === "TSArrayType" && (r = r.elementType)), (r.type === "GenericTypeAnnotation" || r.type === "TSTypeReference") && ((t = r.typeParameters) == null ? void 0 : t.params.length) === 1 && (r = r.typeParameters.params[0]), $e220d53e1e2a4e8f$var$wt(r) && $e220d53e1e2a4e8f$var$ge(e.expression, 1);
    }
    return $e220d53e1e2a4e8f$var$it(e) && $e220d53e1e2a4e8f$var$Ce(e).length > 1 ? !1 : $e220d53e1e2a4e8f$var$ce(e) ? $e220d53e1e2a4e8f$var$ge(e.left, 1) && $e220d53e1e2a4e8f$var$ge(e.right, 1) : $e220d53e1e2a4e8f$var$wn(e) || $e220d53e1e2a4e8f$var$ge(e);
}
function $e220d53e1e2a4e8f$var$Cp(e) {
    return e.length === 2 && e[0].type === "ArrowFunctionExpression" && $e220d53e1e2a4e8f$var$X(e[0]).length === 0 && e[0].body.type === "BlockStatement" && e[1].type === "ArrayExpression" && !e.some((t)=>$e220d53e1e2a4e8f$var$d(t));
}
function $e220d53e1e2a4e8f$var$dp(e) {
    return e.type === "BlockStatement" && (e.body.some((t)=>t.type !== "EmptyStatement") || $e220d53e1e2a4e8f$var$d(e, $e220d53e1e2a4e8f$var$x.Dangling));
}
function $e220d53e1e2a4e8f$var$Ap(e) {
    return e.type === "ObjectExpression" && e.properties.length === 1 && $e220d53e1e2a4e8f$var$fe(e.properties[0]) && e.properties[0].key.type === "Identifier" && e.properties[0].key.name === "type" && $e220d53e1e2a4e8f$var$Q(e.properties[0].value) && e.properties[0].value.value === "module";
}
var $e220d53e1e2a4e8f$var$tr = $e220d53e1e2a4e8f$var$fp;
function $e220d53e1e2a4e8f$var$ku(e, t, r) {
    var p;
    let n = r("object"), s = $e220d53e1e2a4e8f$var$ts(e, t, r), { node: u, parent: i } = e, a = e.findAncestor((m)=>!($e220d53e1e2a4e8f$var$J(m) || m.type === "TSNonNullExpression")), o = a && (a.type === "NewExpression" || a.type === "BindExpression" || a.type === "AssignmentExpression" && a.left.type !== "Identifier") || u.computed || u.object.type === "Identifier" && u.property.type === "Identifier" && !$e220d53e1e2a4e8f$var$J(i) || (i.type === "AssignmentExpression" || i.type === "VariableDeclarator") && ($e220d53e1e2a4e8f$var$k(u.object) && u.object.arguments.length > 0 || u.object.type === "TSNonNullExpression" && $e220d53e1e2a4e8f$var$k(u.object.expression) && u.object.expression.arguments.length > 0 || ((p = n.label) == null ? void 0 : p.memberChain));
    return $e220d53e1e2a4e8f$var$et(n.label, [
        n,
        o ? s : $e220d53e1e2a4e8f$var$y($e220d53e1e2a4e8f$var$E([
            $e220d53e1e2a4e8f$var$F,
            s
        ]))
    ]);
}
function $e220d53e1e2a4e8f$var$ts(e, t, r) {
    let n = r("property"), { node: s } = e, u = $e220d53e1e2a4e8f$var$$(e);
    return s.computed ? !s.property || $e220d53e1e2a4e8f$var$he(s.property) ? [
        u,
        "[",
        n,
        "]"
    ] : $e220d53e1e2a4e8f$var$y([
        u,
        "[",
        $e220d53e1e2a4e8f$var$E([
            $e220d53e1e2a4e8f$var$F,
            n
        ]),
        $e220d53e1e2a4e8f$var$F,
        "]"
    ]) : [
        u,
        ".",
        n
    ];
}
function $e220d53e1e2a4e8f$var$Tp(e, t, r) {
    let { parent: n } = e, s = !n || n.type === "ExpressionStatement", u = [];
    function i(L) {
        let { originalText: W } = t, se = $e220d53e1e2a4e8f$var$Xe(W, $e220d53e1e2a4e8f$var$O(L));
        return W.charAt(se) === ")" ? se !== !1 && $e220d53e1e2a4e8f$var$kt(W, se + 1) : $e220d53e1e2a4e8f$var$me(L, t);
    }
    function a(L) {
        let { node: W } = L;
        $e220d53e1e2a4e8f$var$k(W) && ($e220d53e1e2a4e8f$var$Dt(W.callee) || $e220d53e1e2a4e8f$var$k(W.callee)) ? (u.unshift({
            node: W,
            printed: [
                $e220d53e1e2a4e8f$var$pe(L, [
                    $e220d53e1e2a4e8f$var$$(L),
                    $e220d53e1e2a4e8f$var$Ve(L, t, r),
                    $e220d53e1e2a4e8f$var$tr(L, t, r)
                ], t),
                i(W) ? $e220d53e1e2a4e8f$var$C : ""
            ]
        }), L.call((se)=>a(se), "callee")) : $e220d53e1e2a4e8f$var$Dt(W) ? (u.unshift({
            node: W,
            needsParens: $e220d53e1e2a4e8f$var$we(L, t),
            printed: $e220d53e1e2a4e8f$var$pe(L, $e220d53e1e2a4e8f$var$J(W) ? $e220d53e1e2a4e8f$var$ts(L, t, r) : $e220d53e1e2a4e8f$var$Lr(L, t, r), t)
        }), L.call((se)=>a(se), "object")) : W.type === "TSNonNullExpression" ? (u.unshift({
            node: W,
            printed: $e220d53e1e2a4e8f$var$pe(L, "!", t)
        }), L.call((se)=>a(se), "expression")) : u.unshift({
            node: W,
            printed: r()
        });
    }
    let { node: o } = e;
    u.unshift({
        node: o,
        printed: [
            $e220d53e1e2a4e8f$var$$(e),
            $e220d53e1e2a4e8f$var$Ve(e, t, r),
            $e220d53e1e2a4e8f$var$tr(e, t, r)
        ]
    }), o.callee && e.call((L)=>a(L), "callee");
    let p = [], m = [
        u[0]
    ], D = 1;
    for(; D < u.length && (u[D].node.type === "TSNonNullExpression" || $e220d53e1e2a4e8f$var$k(u[D].node) || $e220d53e1e2a4e8f$var$J(u[D].node) && u[D].node.computed && $e220d53e1e2a4e8f$var$he(u[D].node.property)); ++D)m.push(u[D]);
    if (!$e220d53e1e2a4e8f$var$k(u[0].node)) for(; D + 1 < u.length && $e220d53e1e2a4e8f$var$Dt(u[D].node) && $e220d53e1e2a4e8f$var$Dt(u[D + 1].node); ++D)m.push(u[D]);
    p.push(m), m = [];
    let c = !1;
    for(; D < u.length; ++D){
        if (c && $e220d53e1e2a4e8f$var$Dt(u[D].node)) {
            if (u[D].node.computed && $e220d53e1e2a4e8f$var$he(u[D].node.property)) {
                m.push(u[D]);
                continue;
            }
            p.push(m), m = [], c = !1;
        }
        ($e220d53e1e2a4e8f$var$k(u[D].node) || u[D].node.type === "ImportExpression") && (c = !0), m.push(u[D]), $e220d53e1e2a4e8f$var$d(u[D].node, $e220d53e1e2a4e8f$var$x.Trailing) && (p.push(m), m = [], c = !1);
    }
    m.length > 0 && p.push(m);
    function f(L) {
        return /^[A-Z]|^[$_]+$/.test(L);
    }
    function l(L) {
        return L.length <= t.tabWidth;
    }
    function h(L) {
        var An;
        let W = (An = L[1][0]) == null ? void 0 : An.node.computed;
        if (L[0].length === 1) {
            let ar = L[0][0].node;
            return ar.type === "ThisExpression" || ar.type === "Identifier" && (f(ar.name) || s && l(ar.name) || W);
        }
        let se = $e220d53e1e2a4e8f$var$w(!1, L[0], -1).node;
        return $e220d53e1e2a4e8f$var$J(se) && se.property.type === "Identifier" && (f(se.property.name) || W);
    }
    let g = p.length >= 2 && !$e220d53e1e2a4e8f$var$d(p[1][0].node) && h(p);
    function S(L) {
        let W = L.map((se)=>se.printed);
        return L.length > 0 && $e220d53e1e2a4e8f$var$w(!1, L, -1).needsParens ? [
            "(",
            ...W,
            ")"
        ] : W;
    }
    function I(L) {
        return L.length === 0 ? "" : $e220d53e1e2a4e8f$var$E($e220d53e1e2a4e8f$var$y([
            $e220d53e1e2a4e8f$var$C,
            $e220d53e1e2a4e8f$var$B($e220d53e1e2a4e8f$var$C, L.map(S))
        ]));
    }
    let v = p.map(S), _ = v, R = g ? 3 : 2, T = p.flat(), N = T.slice(1, -1).some((L)=>$e220d53e1e2a4e8f$var$d(L.node, $e220d53e1e2a4e8f$var$x.Leading)) || T.slice(0, -1).some((L)=>$e220d53e1e2a4e8f$var$d(L.node, $e220d53e1e2a4e8f$var$x.Trailing)) || p[R] && $e220d53e1e2a4e8f$var$d(p[R][0].node, $e220d53e1e2a4e8f$var$x.Leading);
    if (p.length <= R && !N) return $e220d53e1e2a4e8f$var$hr(e) ? _ : $e220d53e1e2a4e8f$var$y(_);
    let Se = $e220d53e1e2a4e8f$var$w(!1, p[g ? 1 : 0], -1).node, V = !$e220d53e1e2a4e8f$var$k(Se) && i(Se), Be = [
        S(p[0]),
        g ? p.slice(1, 2).map(S) : "",
        V ? $e220d53e1e2a4e8f$var$C : "",
        I(p.slice(g ? 2 : 1))
    ], Ee = u.map(({ node: L })=>L).filter($e220d53e1e2a4e8f$var$k);
    function Cn() {
        let L = $e220d53e1e2a4e8f$var$w(!1, $e220d53e1e2a4e8f$var$w(!1, p, -1), -1).node, W = $e220d53e1e2a4e8f$var$w(!1, v, -1);
        return $e220d53e1e2a4e8f$var$k(L) && $e220d53e1e2a4e8f$var$K(W) && Ee.slice(0, -1).some((se)=>se.arguments.some($e220d53e1e2a4e8f$var$It));
    }
    let dn;
    return N || Ee.length > 2 && Ee.some((L)=>!L.arguments.every((W)=>$e220d53e1e2a4e8f$var$ge(W))) || v.slice(0, -1).some($e220d53e1e2a4e8f$var$K) || Cn() ? dn = $e220d53e1e2a4e8f$var$y(Be) : dn = [
        $e220d53e1e2a4e8f$var$K(_) || V ? $e220d53e1e2a4e8f$var$Te : "",
        $e220d53e1e2a4e8f$var$qe([
            _,
            Be
        ])
    ], $e220d53e1e2a4e8f$var$et({
        memberChain: !0
    }, dn);
}
var $e220d53e1e2a4e8f$var$Iu = $e220d53e1e2a4e8f$var$Tp;
function $e220d53e1e2a4e8f$var$wr(e, t, r) {
    var D;
    let { node: n, parent: s } = e, u = n.type === "NewExpression", i = n.type === "ImportExpression", a = $e220d53e1e2a4e8f$var$$(e), o = $e220d53e1e2a4e8f$var$Ce(n), p = o.length === 1 && $e220d53e1e2a4e8f$var$xr(o[0], t.originalText);
    if (p || o.length > 0 && !u && !i && ($e220d53e1e2a4e8f$var$xp(n, s) || $e220d53e1e2a4e8f$var$Ct(n, s))) {
        let c = [];
        if ($e220d53e1e2a4e8f$var$Sr(e, ()=>{
            c.push(r());
        }), !(p && (D = c[0].label) != null && D.embed)) return [
            u ? "new " : "",
            r("callee"),
            a,
            $e220d53e1e2a4e8f$var$Ve(e, t, r),
            "(",
            $e220d53e1e2a4e8f$var$B(", ", c),
            ")"
        ];
    }
    if (!i && !u && $e220d53e1e2a4e8f$var$Dt(n.callee) && !e.call((c)=>$e220d53e1e2a4e8f$var$we(c, t), "callee")) return $e220d53e1e2a4e8f$var$Iu(e, t, r);
    let m = [
        u ? "new " : "",
        i ? "import" : r("callee"),
        a,
        $e220d53e1e2a4e8f$var$Ve(e, t, r),
        $e220d53e1e2a4e8f$var$tr(e, t, r)
    ];
    return i || $e220d53e1e2a4e8f$var$k(n.callee) ? $e220d53e1e2a4e8f$var$y(m) : m;
}
function $e220d53e1e2a4e8f$var$xp(e, t) {
    if (e.callee.type !== "Identifier") return !1;
    if (e.callee.name === "require") {
        let r = $e220d53e1e2a4e8f$var$Ce(e);
        return r.length === 1 && $e220d53e1e2a4e8f$var$Q(r[0]) || r.length > 1;
    }
    if (e.callee.name === "define") {
        let r = $e220d53e1e2a4e8f$var$Ce(e);
        return t.type === "ExpressionStatement" && (r.length === 1 || r.length === 2 && r[0].type === "ArrayExpression" || r.length === 3 && $e220d53e1e2a4e8f$var$Q(r[0]) && r[1].type === "ArrayExpression");
    }
    return !1;
}
function $e220d53e1e2a4e8f$var$gp(e, t, r) {
    let n = t === '"' ? "'" : '"', u = $e220d53e1e2a4e8f$var$H(!1, e, /\\(.)|(["'])/gs, (i, a, o)=>a === n ? a : o === t ? "\\" + o : o || (r && /^[^\n\r"'0-7\\bfnrt-vx\u2028\u2029]$/.test(a) ? a : "\\" + a));
    return t + u + t;
}
var $e220d53e1e2a4e8f$var$Lu = $e220d53e1e2a4e8f$var$gp;
function $e220d53e1e2a4e8f$var$hp(e, t) {
    let r = e.slice(1, -1), n = t.parser === "json" || t.parser === "json5" && t.quoteProps === "preserve" && !t.singleQuote ? '"' : t.__isInHtmlAttribute ? "'" : $e220d53e1e2a4e8f$var$br(r, t.singleQuote);
    return $e220d53e1e2a4e8f$var$Lu(r, n, !(t.parser === "css" || t.parser === "less" || t.parser === "scss" || t.__embeddedInHtml));
}
var $e220d53e1e2a4e8f$var$Tt = $e220d53e1e2a4e8f$var$hp;
function $e220d53e1e2a4e8f$var$Sp(e) {
    return e.toLowerCase().replace(/^([+-]?[\d.]+e)(?:\+|(-))?0*(?=\d)/, "$1$2").replace(/^([+-]?[\d.]+)e[+-]?0+$/, "$1").replace(/^([+-])?\./, "$10.").replace(/(\.\d+?)0+(?=e|$)/, "$1").replace(/\.(?=e|$)/, "");
}
var $e220d53e1e2a4e8f$var$He = $e220d53e1e2a4e8f$var$Sp;
function $e220d53e1e2a4e8f$var$vu(e, t) {
    let { node: r } = e;
    switch(r.type){
        case "RegExpLiteral":
            return $e220d53e1e2a4e8f$var$wu(r);
        case "BigIntLiteral":
            return $e220d53e1e2a4e8f$var$Or(r.extra.raw);
        case "NumericLiteral":
            return $e220d53e1e2a4e8f$var$He(r.extra.raw);
        case "StringLiteral":
            return $e220d53e1e2a4e8f$var$xe($e220d53e1e2a4e8f$var$Tt(r.extra.raw, t));
        case "NullLiteral":
            return "null";
        case "BooleanLiteral":
            return String(r.value);
        case "DecimalLiteral":
            return $e220d53e1e2a4e8f$var$He(r.value) + "m";
        case "DirectiveLiteral":
            return $e220d53e1e2a4e8f$var$Ou(r.extra.raw, t);
        case "Literal":
            {
                if (r.regex) return $e220d53e1e2a4e8f$var$wu(r.regex);
                if (r.bigint) return $e220d53e1e2a4e8f$var$Or(r.raw);
                if (r.decimal) return $e220d53e1e2a4e8f$var$He(r.decimal) + "m";
                let { value: n } = r;
                return typeof n == "number" ? $e220d53e1e2a4e8f$var$He(r.raw) : typeof n == "string" ? $e220d53e1e2a4e8f$var$Bp(e) ? $e220d53e1e2a4e8f$var$Ou(r.raw, t) : $e220d53e1e2a4e8f$var$xe($e220d53e1e2a4e8f$var$Tt(r.raw, t)) : String(n);
            }
    }
}
function $e220d53e1e2a4e8f$var$Bp(e) {
    if (e.key !== "expression") return;
    let { parent: t } = e;
    return t.type === "ExpressionStatement" && t.directive;
}
function $e220d53e1e2a4e8f$var$Or(e) {
    return e.toLowerCase();
}
function $e220d53e1e2a4e8f$var$wu({ pattern: e, flags: t }) {
    return t = [
        ...t
    ].sort().join(""), `/${e}/${t}`;
}
function $e220d53e1e2a4e8f$var$Ou(e, t) {
    let r = e.slice(1, -1);
    if (r.includes('"') || r.includes("'")) return e;
    let n = t.singleQuote ? "'" : '"';
    return n + r + n;
}
var $e220d53e1e2a4e8f$var$vr = $e220d53e1e2a4e8f$var$j([
    "Literal",
    "BigIntLiteral",
    "BooleanLiteral",
    "DecimalLiteral",
    "DirectiveLiteral",
    "NullLiteral",
    "NumericLiteral",
    "RegExpLiteral",
    "StringLiteral"
]);
function $e220d53e1e2a4e8f$var$ft(e, t, r, n, s, u) {
    let i = $e220d53e1e2a4e8f$var$bp(e, t, r, n, u), a = u ? r(u, {
        assignmentLayout: i
    }) : "";
    switch(i){
        case "break-after-operator":
            return $e220d53e1e2a4e8f$var$y([
                $e220d53e1e2a4e8f$var$y(n),
                s,
                $e220d53e1e2a4e8f$var$y($e220d53e1e2a4e8f$var$E([
                    $e220d53e1e2a4e8f$var$A,
                    a
                ]))
            ]);
        case "never-break-after-operator":
            return $e220d53e1e2a4e8f$var$y([
                $e220d53e1e2a4e8f$var$y(n),
                s,
                " ",
                a
            ]);
        case "fluid":
            {
                let o = Symbol("assignment");
                return $e220d53e1e2a4e8f$var$y([
                    $e220d53e1e2a4e8f$var$y(n),
                    s,
                    $e220d53e1e2a4e8f$var$y($e220d53e1e2a4e8f$var$E($e220d53e1e2a4e8f$var$A), {
                        id: o
                    }),
                    $e220d53e1e2a4e8f$var$Ae,
                    $e220d53e1e2a4e8f$var$mt(a, {
                        groupId: o
                    })
                ]);
            }
        case "break-lhs":
            return $e220d53e1e2a4e8f$var$y([
                n,
                s,
                " ",
                $e220d53e1e2a4e8f$var$y(a)
            ]);
        case "chain":
            return [
                $e220d53e1e2a4e8f$var$y(n),
                s,
                $e220d53e1e2a4e8f$var$A,
                a
            ];
        case "chain-tail":
            return [
                $e220d53e1e2a4e8f$var$y(n),
                s,
                $e220d53e1e2a4e8f$var$E([
                    $e220d53e1e2a4e8f$var$A,
                    a
                ])
            ];
        case "chain-tail-arrow-chain":
            return [
                $e220d53e1e2a4e8f$var$y(n),
                s,
                a
            ];
        case "only-left":
            return n;
    }
}
function $e220d53e1e2a4e8f$var$ju(e, t, r) {
    let { node: n } = e;
    return $e220d53e1e2a4e8f$var$ft(e, t, r, r("left"), [
        " ",
        n.operator
    ], "right");
}
function $e220d53e1e2a4e8f$var$Mu(e, t, r) {
    return $e220d53e1e2a4e8f$var$ft(e, t, r, r("id"), " =", "init");
}
function $e220d53e1e2a4e8f$var$bp(e, t, r, n, s) {
    let { node: u } = e, i = u[s];
    if (!i) return "only-left";
    let a = !$e220d53e1e2a4e8f$var$_r(i);
    if (e.match($e220d53e1e2a4e8f$var$_r, $e220d53e1e2a4e8f$var$Ru, (D)=>!a || D.type !== "ExpressionStatement" && D.type !== "VariableDeclaration")) return a ? i.type === "ArrowFunctionExpression" && i.body.type === "ArrowFunctionExpression" ? "chain-tail-arrow-chain" : "chain-tail" : "chain";
    if (!a && $e220d53e1e2a4e8f$var$_r(i.right) || $e220d53e1e2a4e8f$var$Ie(t.originalText, i)) return "break-after-operator";
    if (i.type === "CallExpression" && i.callee.name === "require" || t.parser === "json5" || t.parser === "json") return "never-break-after-operator";
    if ($e220d53e1e2a4e8f$var$kp(u) || $e220d53e1e2a4e8f$var$Ip(u) || $e220d53e1e2a4e8f$var$Op(u) || $e220d53e1e2a4e8f$var$rs(u) && $e220d53e1e2a4e8f$var$Rs(n)) return "break-lhs";
    let m = $e220d53e1e2a4e8f$var$Mp(u, n, t);
    return e.call(()=>$e220d53e1e2a4e8f$var$Pp(e, t, r, m), s) ? "break-after-operator" : m || i.type === "TemplateLiteral" || i.type === "TaggedTemplateExpression" || i.type === "BooleanLiteral" || $e220d53e1e2a4e8f$var$he(i) || i.type === "ClassExpression" ? "never-break-after-operator" : "fluid";
}
function $e220d53e1e2a4e8f$var$Pp(e, t, r, n) {
    let s = e.node;
    if ($e220d53e1e2a4e8f$var$ce(s) && !$e220d53e1e2a4e8f$var$Ot(s)) return !0;
    switch(s.type){
        case "StringLiteralTypeAnnotation":
        case "SequenceExpression":
            return !0;
        case "ConditionalExpression":
            {
                let { test: a } = s;
                return $e220d53e1e2a4e8f$var$ce(a) && !$e220d53e1e2a4e8f$var$Ot(a);
            }
        case "ClassExpression":
            return $e220d53e1e2a4e8f$var$b(s.decorators);
    }
    if (n) return !1;
    let u = s, i = [];
    for(;;)if (u.type === "UnaryExpression" || u.type === "AwaitExpression" || u.type === "YieldExpression" && u.argument !== null) u = u.argument, i.push("argument");
    else if (u.type === "TSNonNullExpression") u = u.expression, i.push("expression");
    else break;
    return !!($e220d53e1e2a4e8f$var$Q(u) || e.call(()=>$e220d53e1e2a4e8f$var$Ju(e, t, r), ...i));
}
function $e220d53e1e2a4e8f$var$kp(e) {
    if ($e220d53e1e2a4e8f$var$Ru(e)) {
        let t = e.left || e.id;
        return t.type === "ObjectPattern" && t.properties.length > 2 && t.properties.some((r)=>{
            var n;
            return $e220d53e1e2a4e8f$var$fe(r) && (!r.shorthand || ((n = r.value) == null ? void 0 : n.type) === "AssignmentPattern");
        });
    }
    return !1;
}
function $e220d53e1e2a4e8f$var$_r(e) {
    return e.type === "AssignmentExpression";
}
function $e220d53e1e2a4e8f$var$Ru(e) {
    return $e220d53e1e2a4e8f$var$_r(e) || e.type === "VariableDeclarator";
}
function $e220d53e1e2a4e8f$var$Ip(e) {
    let t = $e220d53e1e2a4e8f$var$wp(e);
    if ($e220d53e1e2a4e8f$var$b(t)) {
        let r = e.type === "TSTypeAliasDeclaration" ? "constraint" : "bound";
        if (t.length > 1 && t.some((n)=>n[r] || n.default)) return !0;
    }
    return !1;
}
var $e220d53e1e2a4e8f$var$Lp = $e220d53e1e2a4e8f$var$j([
    "TSTypeAliasDeclaration",
    "TypeAlias"
]);
function $e220d53e1e2a4e8f$var$wp(e) {
    var t;
    if ($e220d53e1e2a4e8f$var$Lp(e)) return (t = e.typeParameters) == null ? void 0 : t.params;
}
function $e220d53e1e2a4e8f$var$Op(e) {
    if (e.type !== "VariableDeclarator") return !1;
    let { typeAnnotation: t } = e.id;
    if (!t || !t.typeAnnotation) return !1;
    let r = $e220d53e1e2a4e8f$var$_u(t.typeAnnotation);
    return $e220d53e1e2a4e8f$var$b(r) && r.length > 1 && r.some((n)=>$e220d53e1e2a4e8f$var$b($e220d53e1e2a4e8f$var$_u(n)) || n.type === "TSConditionalType");
}
function $e220d53e1e2a4e8f$var$rs(e) {
    var t;
    return e.type === "VariableDeclarator" && ((t = e.init) == null ? void 0 : t.type) === "ArrowFunctionExpression";
}
var $e220d53e1e2a4e8f$var$vp = $e220d53e1e2a4e8f$var$j([
    "TSTypeReference",
    "GenericTypeAnnotation"
]);
function $e220d53e1e2a4e8f$var$_u(e) {
    var t;
    if ($e220d53e1e2a4e8f$var$vp(e)) return (t = e.typeParameters) == null ? void 0 : t.params;
}
function $e220d53e1e2a4e8f$var$Ju(e, t, r, n = !1) {
    var i;
    let { node: s } = e, u = ()=>$e220d53e1e2a4e8f$var$Ju(e, t, r, !0);
    if (s.type === "ChainExpression" || s.type === "TSNonNullExpression") return e.call(u, "expression");
    if ($e220d53e1e2a4e8f$var$k(s)) {
        if ((i = $e220d53e1e2a4e8f$var$wr(e, t, r).label) != null && i.memberChain) return !1;
        let o = $e220d53e1e2a4e8f$var$Ce(s);
        return !(o.length === 0 || o.length === 1 && $e220d53e1e2a4e8f$var$jp(o[0], t)) || $e220d53e1e2a4e8f$var$Rp(s, r) ? !1 : e.call(u, "callee");
    }
    return $e220d53e1e2a4e8f$var$J(s) ? e.call(u, "object") : n && (s.type === "Identifier" || s.type === "ThisExpression");
}
var $e220d53e1e2a4e8f$var$_p = .25;
function $e220d53e1e2a4e8f$var$jp(e, { printWidth: t }) {
    if ($e220d53e1e2a4e8f$var$d(e)) return !1;
    let r = t * $e220d53e1e2a4e8f$var$_p;
    if (e.type === "ThisExpression" || e.type === "Identifier" && e.name.length <= r || $e220d53e1e2a4e8f$var$Ar(e) && !$e220d53e1e2a4e8f$var$d(e.argument)) return !0;
    let n = e.type === "Literal" && "regex" in e && e.regex.pattern || e.type === "RegExpLiteral" && e.pattern;
    return n ? n.length <= r : $e220d53e1e2a4e8f$var$Q(e) ? $e220d53e1e2a4e8f$var$oe(e).length <= r : e.type === "TemplateLiteral" ? e.expressions.length === 0 && e.quasis[0].value.raw.length <= r && !e.quasis[0].value.raw.includes(`
`) : $e220d53e1e2a4e8f$var$vr(e);
}
function $e220d53e1e2a4e8f$var$Mp(e, t, r) {
    if (!$e220d53e1e2a4e8f$var$fe(e)) return !1;
    t = $e220d53e1e2a4e8f$var$Bt(t);
    let n = 3;
    return typeof t == "string" && $e220d53e1e2a4e8f$var$tt(t) < r.tabWidth + n;
}
function $e220d53e1e2a4e8f$var$Rp(e, t) {
    let r = $e220d53e1e2a4e8f$var$Jp(e);
    if ($e220d53e1e2a4e8f$var$b(r)) {
        if (r.length > 1) return !0;
        if (r.length === 1) {
            let s = r[0];
            if (s.type === "TSUnionType" || s.type === "UnionTypeAnnotation" || s.type === "TSIntersectionType" || s.type === "IntersectionTypeAnnotation" || s.type === "TSTypeLiteral" || s.type === "ObjectTypeAnnotation") return !0;
        }
        let n = e.typeParameters ? "typeParameters" : "typeArguments";
        if ($e220d53e1e2a4e8f$var$K(t(n))) return !0;
    }
    return !1;
}
function $e220d53e1e2a4e8f$var$Jp(e) {
    var t;
    return (t = e.typeParameters ?? e.typeArguments) == null ? void 0 : t.params;
}
function $e220d53e1e2a4e8f$var$ot(e, t, r, n, s) {
    let u = e.node, i = $e220d53e1e2a4e8f$var$X(u), a = s ? $e220d53e1e2a4e8f$var$Ve(e, r, t) : "";
    if (i.length === 0) return [
        a,
        "(",
        $e220d53e1e2a4e8f$var$M(e, r, {
            filter: (l)=>$e220d53e1e2a4e8f$var$$e(r.originalText, $e220d53e1e2a4e8f$var$O(l)) === ")"
        }),
        ")"
    ];
    let { parent: o } = e, p = $e220d53e1e2a4e8f$var$Ct(o), m = $e220d53e1e2a4e8f$var$ns(u), D = [];
    if ($e220d53e1e2a4e8f$var$uu(e, (l, h)=>{
        let g = h === i.length - 1;
        g && u.rest && D.push("..."), D.push(t()), !g && (D.push(","), p || m ? D.push(" ") : $e220d53e1e2a4e8f$var$me(i[h], r) ? D.push($e220d53e1e2a4e8f$var$C, $e220d53e1e2a4e8f$var$C) : D.push($e220d53e1e2a4e8f$var$A));
    }), n && !$e220d53e1e2a4e8f$var$Up(e)) {
        if ($e220d53e1e2a4e8f$var$K(a) || $e220d53e1e2a4e8f$var$K(D)) throw new $e220d53e1e2a4e8f$var$at;
        return $e220d53e1e2a4e8f$var$y([
            $e220d53e1e2a4e8f$var$Ut(a),
            "(",
            $e220d53e1e2a4e8f$var$Ut(D),
            ")"
        ]);
    }
    let c = i.every((l)=>!$e220d53e1e2a4e8f$var$b(l.decorators));
    return m && c ? [
        a,
        "(",
        ...D,
        ")"
    ] : p ? [
        a,
        "(",
        ...D,
        ")"
    ] : ($e220d53e1e2a4e8f$var$Tr(o) || $e220d53e1e2a4e8f$var$Zs(o) || o.type === "TypeAlias" || o.type === "UnionTypeAnnotation" || o.type === "TSUnionType" || o.type === "IntersectionTypeAnnotation" || o.type === "FunctionTypeAnnotation" && o.returnType === u) && i.length === 1 && i[0].name === null && u.this !== i[0] && i[0].typeAnnotation && u.typeParameters === null && $e220d53e1e2a4e8f$var$wt(i[0].typeAnnotation) && !u.rest ? r.arrowParens === "always" ? [
        "(",
        ...D,
        ")"
    ] : D : [
        a,
        "(",
        $e220d53e1e2a4e8f$var$E([
            $e220d53e1e2a4e8f$var$F,
            ...D
        ]),
        $e220d53e1e2a4e8f$var$P(!$e220d53e1e2a4e8f$var$su(u) && $e220d53e1e2a4e8f$var$le(r, "all") ? "," : ""),
        $e220d53e1e2a4e8f$var$F,
        ")"
    ];
}
function $e220d53e1e2a4e8f$var$ns(e) {
    if (!e) return !1;
    let t = $e220d53e1e2a4e8f$var$X(e);
    if (t.length !== 1) return !1;
    let [r] = t;
    return !$e220d53e1e2a4e8f$var$d(r) && (r.type === "ObjectPattern" || r.type === "ArrayPattern" || r.type === "Identifier" && r.typeAnnotation && (r.typeAnnotation.type === "TypeAnnotation" || r.typeAnnotation.type === "TSTypeAnnotation") && $e220d53e1e2a4e8f$var$ke(r.typeAnnotation.typeAnnotation) || r.type === "FunctionTypeParam" && $e220d53e1e2a4e8f$var$ke(r.typeAnnotation) && r !== e.rest || r.type === "AssignmentPattern" && (r.left.type === "ObjectPattern" || r.left.type === "ArrayPattern") && (r.right.type === "Identifier" || $e220d53e1e2a4e8f$var$ee(r.right) && r.right.properties.length === 0 || $e220d53e1e2a4e8f$var$G(r.right) && r.right.elements.length === 0));
}
function $e220d53e1e2a4e8f$var$Np(e) {
    let t;
    return e.returnType ? (t = e.returnType, t.typeAnnotation && (t = t.typeAnnotation)) : e.typeAnnotation && (t = e.typeAnnotation), t;
}
function $e220d53e1e2a4e8f$var$xt(e, t) {
    var s;
    let r = $e220d53e1e2a4e8f$var$Np(e);
    if (!r) return !1;
    let n = (s = e.typeParameters) == null ? void 0 : s.params;
    if (n) {
        if (n.length > 1) return !1;
        if (n.length === 1) {
            let u = n[0];
            if (u.constraint || u.default) return !1;
        }
    }
    return $e220d53e1e2a4e8f$var$X(e).length === 1 && ($e220d53e1e2a4e8f$var$ke(r) || $e220d53e1e2a4e8f$var$K(t));
}
function $e220d53e1e2a4e8f$var$Up(e) {
    return e.match((t)=>t.type === "ArrowFunctionExpression" && t.body.type === "BlockStatement", (t, r)=>{
        if (t.type === "CallExpression" && r === "arguments" && t.arguments.length === 1 && t.callee.type === "CallExpression") {
            let n = t.callee.callee;
            return n.type === "Identifier" || n.type === "MemberExpression" && !n.computed && n.object.type === "Identifier" && n.property.type === "Identifier";
        }
        return !1;
    }, (t, r)=>t.type === "VariableDeclarator" && r === "init" || t.type === "ExportDefaultDeclaration" && r === "declaration" || t.type === "TSExportAssignment" && r === "expression" || t.type === "AssignmentExpression" && r === "right" && t.left.type === "MemberExpression" && t.left.object.type === "Identifier" && t.left.object.name === "module" && t.left.property.type === "Identifier" && t.left.property.name === "exports", (t)=>t.type !== "VariableDeclaration" || t.kind === "const" && t.declarations.length === 1);
}
function $e220d53e1e2a4e8f$var$Nu(e) {
    let t = $e220d53e1e2a4e8f$var$X(e);
    return t.length > 1 && t.some((r)=>r.type === "TSParameterProperty");
}
function $e220d53e1e2a4e8f$var$ss(e) {
    if ($e220d53e1e2a4e8f$var$wt(e) || $e220d53e1e2a4e8f$var$ke(e)) return !0;
    if (e.type === "UnionTypeAnnotation" || e.type === "TSUnionType") {
        let t = e.types.filter((s)=>s.type === "VoidTypeAnnotation" || s.type === "TSVoidKeyword" || s.type === "NullLiteralTypeAnnotation" || s.type === "TSNullKeyword").length, r = e.types.some((s)=>s.type === "ObjectTypeAnnotation" || s.type === "TSTypeLiteral" || s.type === "GenericTypeAnnotation" || s.type === "TSTypeReference"), n = e.types.some((s)=>$e220d53e1e2a4e8f$var$d(s));
        if (e.types.length - 1 === t && r && !n) return !0;
    }
    return !1;
}
function $e220d53e1e2a4e8f$var$Uu(e, t, r) {
    let n = t.semi ? ";" : "", { node: s } = e, u = [
        $e220d53e1e2a4e8f$var$Z(e),
        "opaque type ",
        r("id"),
        r("typeParameters")
    ];
    return s.supertype && u.push(": ", r("supertype")), s.impltype && u.push(" = ", r("impltype")), u.push(n), u;
}
function $e220d53e1e2a4e8f$var$jr(e, t, r) {
    let n = t.semi ? ";" : "", { node: s } = e, u = [
        $e220d53e1e2a4e8f$var$Z(e)
    ];
    u.push("type ", r("id"), r("typeParameters"));
    let i = s.type === "TSTypeAliasDeclaration" ? "typeAnnotation" : "right";
    return [
        $e220d53e1e2a4e8f$var$ft(e, t, r, u, " =", i),
        n
    ];
}
function $e220d53e1e2a4e8f$var$Mr(e, t, r) {
    let n = !1;
    return $e220d53e1e2a4e8f$var$y(e.map(({ isFirst: s, previous: u, node: i, index: a })=>{
        let o = r();
        if (s) return o;
        let p = $e220d53e1e2a4e8f$var$ke(i), m = $e220d53e1e2a4e8f$var$ke(u);
        return m && p ? [
            " & ",
            n ? $e220d53e1e2a4e8f$var$E(o) : o
        ] : !m && !p ? $e220d53e1e2a4e8f$var$E([
            " &",
            $e220d53e1e2a4e8f$var$A,
            o
        ]) : (a > 1 && (n = !0), [
            " & ",
            a > 1 ? $e220d53e1e2a4e8f$var$E(o) : o
        ]);
    }, "types"));
}
function $e220d53e1e2a4e8f$var$Rr(e, t, r) {
    let { node: n } = e, { parent: s } = e, u = s.type !== "TypeParameterInstantiation" && s.type !== "TSTypeParameterInstantiation" && s.type !== "GenericTypeAnnotation" && s.type !== "TSTypeReference" && s.type !== "TSTypeAssertion" && s.type !== "TupleTypeAnnotation" && s.type !== "TSTupleType" && !(s.type === "FunctionTypeParam" && !s.name && e.grandparent.this !== s) && !((s.type === "TypeAlias" || s.type === "VariableDeclarator" || s.type === "TSTypeAliasDeclaration") && $e220d53e1e2a4e8f$var$Ie(t.originalText, n)), i = $e220d53e1e2a4e8f$var$ss(n), a = e.map((m)=>{
        let D = r();
        return i || (D = $e220d53e1e2a4e8f$var$De(2, D)), $e220d53e1e2a4e8f$var$pe(m, D, t);
    }, "types");
    if (i) return $e220d53e1e2a4e8f$var$B(" | ", a);
    let o = u && !$e220d53e1e2a4e8f$var$Ie(t.originalText, n), p = [
        $e220d53e1e2a4e8f$var$P([
            o ? $e220d53e1e2a4e8f$var$A : "",
            "| "
        ]),
        $e220d53e1e2a4e8f$var$B([
            $e220d53e1e2a4e8f$var$A,
            "| "
        ], a)
    ];
    return $e220d53e1e2a4e8f$var$we(e, t) ? $e220d53e1e2a4e8f$var$y([
        $e220d53e1e2a4e8f$var$E(p),
        $e220d53e1e2a4e8f$var$F
    ]) : (s.type === "TupleTypeAnnotation" || s.type === "TSTupleType") && s[s.type === "TupleTypeAnnotation" && s.types ? "types" : "elementTypes"].length > 1 ? $e220d53e1e2a4e8f$var$y([
        $e220d53e1e2a4e8f$var$E([
            $e220d53e1e2a4e8f$var$P([
                "(",
                $e220d53e1e2a4e8f$var$F
            ]),
            p
        ]),
        $e220d53e1e2a4e8f$var$F,
        $e220d53e1e2a4e8f$var$P(")")
    ]) : $e220d53e1e2a4e8f$var$y(u ? $e220d53e1e2a4e8f$var$E(p) : p);
}
function $e220d53e1e2a4e8f$var$Gp(e) {
    var n;
    let { node: t, parent: r } = e;
    return t.type === "FunctionTypeAnnotation" && ($e220d53e1e2a4e8f$var$Tr(r) || !((r.type === "ObjectTypeProperty" || r.type === "ObjectTypeInternalSlot") && !r.variance && !r.optional && $e220d53e1e2a4e8f$var$yt(r, t) || r.type === "ObjectTypeCallProperty" || ((n = e.getParentNode(2)) == null ? void 0 : n.type) === "DeclareFunction"));
}
function $e220d53e1e2a4e8f$var$Jr(e, t, r) {
    let { node: n } = e, s = [
        $e220d53e1e2a4e8f$var$_t(e)
    ];
    (n.type === "TSConstructorType" || n.type === "TSConstructSignatureDeclaration") && s.push("new ");
    let u = $e220d53e1e2a4e8f$var$ot(e, r, t, !1, !0), i = [];
    return n.type === "FunctionTypeAnnotation" ? i.push($e220d53e1e2a4e8f$var$Gp(e) ? " => " : ": ", r("returnType")) : i.push($e220d53e1e2a4e8f$var$q(e, r, n.returnType ? "returnType" : "typeAnnotation")), $e220d53e1e2a4e8f$var$xt(n, i) && (u = $e220d53e1e2a4e8f$var$y(u)), s.push(u, i), $e220d53e1e2a4e8f$var$y(s);
}
function $e220d53e1e2a4e8f$var$Nr(e, t, r) {
    return [
        r("objectType"),
        $e220d53e1e2a4e8f$var$$(e),
        "[",
        r("indexType"),
        "]"
    ];
}
function $e220d53e1e2a4e8f$var$Ur(e, t, r) {
    return [
        "infer ",
        r("typeParameter")
    ];
}
function $e220d53e1e2a4e8f$var$us(e, t, r) {
    let { node: n } = e;
    return [
        n.postfix ? "" : r,
        $e220d53e1e2a4e8f$var$q(e, t),
        n.postfix ? r : ""
    ];
}
function $e220d53e1e2a4e8f$var$Gr(e, t, r) {
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
function $e220d53e1e2a4e8f$var$qr(e, t, r) {
    let { node: n } = e;
    return [
        n.variance ? r("variance") : "",
        r("label"),
        n.optional ? "?" : "",
        ": ",
        r("elementType")
    ];
}
var $e220d53e1e2a4e8f$var$qp = new WeakSet;
function $e220d53e1e2a4e8f$var$q(e, t, r = "typeAnnotation") {
    let { node: { [r]: n } } = e;
    if (!n) return "";
    let s = !1;
    if (n.type === "TSTypeAnnotation" || n.type === "TypeAnnotation") {
        let u = e.call($e220d53e1e2a4e8f$var$Gu, r);
        (u === "=>" || u === ":" && $e220d53e1e2a4e8f$var$d(n, $e220d53e1e2a4e8f$var$x.Leading)) && (s = !0), $e220d53e1e2a4e8f$var$qp.add(n);
    }
    return s ? [
        " ",
        t(r)
    ] : t(r);
}
var $e220d53e1e2a4e8f$var$Gu = (e)=>e.match((t)=>t.type === "TSTypeAnnotation", (t, r)=>(r === "returnType" || r === "typeAnnotation") && (t.type === "TSFunctionType" || t.type === "TSConstructorType")) ? "=>" : e.match((t)=>t.type === "TSTypeAnnotation", (t, r)=>r === "typeAnnotation" && (t.type === "TSJSDocNullableType" || t.type === "TSJSDocNonNullableType" || t.type === "TSTypePredicate")) || e.match((t)=>t.type === "TypeAnnotation", (t, r)=>r === "typeAnnotation" && t.type === "Identifier", (t, r)=>r === "id" && t.type === "DeclareFunction") || e.match((t)=>t.type === "TypeAnnotation", (t, r)=>r === "bound" && t.type === "TypeParameter" && t.usesExtendsBound) ? "" : ":";
function $e220d53e1e2a4e8f$var$Wr(e, t, r) {
    let n = $e220d53e1e2a4e8f$var$Gu(e);
    return n ? [
        n,
        " ",
        r("typeAnnotation")
    ] : r("typeAnnotation");
}
function $e220d53e1e2a4e8f$var$Yr(e) {
    return [
        e("elementType"),
        "[]"
    ];
}
function $e220d53e1e2a4e8f$var$Xr({ node: e }, t) {
    return [
        "typeof ",
        ...e.type === "TSTypeQuery" ? [
            t("exprName"),
            t("typeParameters")
        ] : [
            t("argument")
        ]
    ];
}
function $e220d53e1e2a4e8f$var$$r(e, t) {
    let { node: r } = e;
    return [
        r.asserts ? "asserts " : "",
        t("parameterName"),
        r.typeAnnotation ? [
            " is ",
            $e220d53e1e2a4e8f$var$q(e, t)
        ] : ""
    ];
}
function $e220d53e1e2a4e8f$var$$(e) {
    let { node: t } = e;
    return !t.optional || t.type === "Identifier" && t === e.parent.key ? "" : $e220d53e1e2a4e8f$var$k(t) || $e220d53e1e2a4e8f$var$J(t) && t.computed || t.type === "OptionalIndexedAccessType" ? "?." : "?";
}
function $e220d53e1e2a4e8f$var$Vr(e) {
    return e.node.definite || e.match(void 0, (t, r)=>r === "id" && t.type === "VariableDeclarator" && t.definite) ? "!" : "";
}
var $e220d53e1e2a4e8f$var$Wp = new Set([
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
function $e220d53e1e2a4e8f$var$Z(e) {
    let { node: t } = e;
    return t.declare || $e220d53e1e2a4e8f$var$Wp.has(t.type) && e.parent.type !== "DeclareExportDeclaration" ? "declare " : "";
}
var $e220d53e1e2a4e8f$var$Yp = new Set([
    "TSAbstractMethodDefinition",
    "TSAbstractPropertyDefinition",
    "TSAbstractAccessorProperty"
]);
function $e220d53e1e2a4e8f$var$_t({ node: e }) {
    return e.abstract || $e220d53e1e2a4e8f$var$Yp.has(e.type) ? "abstract " : "";
}
function $e220d53e1e2a4e8f$var$Ve(e, t, r) {
    let n = e.node;
    return n.typeArguments ? r("typeArguments") : n.typeParameters ? r("typeParameters") : "";
}
function $e220d53e1e2a4e8f$var$Lr(e, t, r) {
    return [
        "::",
        r("callee")
    ];
}
function $e220d53e1e2a4e8f$var$pt(e, t, r) {
    return e.type === "EmptyStatement" ? ";" : e.type === "BlockStatement" || r ? [
        " ",
        t
    ] : $e220d53e1e2a4e8f$var$E([
        $e220d53e1e2a4e8f$var$A,
        t
    ]);
}
function $e220d53e1e2a4e8f$var$Hr(e, t) {
    return [
        "...",
        t("argument"),
        $e220d53e1e2a4e8f$var$q(e, t)
    ];
}
function $e220d53e1e2a4e8f$var$jt(e) {
    return e.accessibility ? e.accessibility + " " : "";
}
function $e220d53e1e2a4e8f$var$is(e, t, r) {
    let { node: n } = e;
    return $e220d53e1e2a4e8f$var$y([
        $e220d53e1e2a4e8f$var$B($e220d53e1e2a4e8f$var$A, e.map(r, "decorators")),
        $e220d53e1e2a4e8f$var$Yu(n, t) ? $e220d53e1e2a4e8f$var$C : $e220d53e1e2a4e8f$var$A
    ]);
}
function $e220d53e1e2a4e8f$var$qu(e, t, r) {
    return $e220d53e1e2a4e8f$var$Xu(e.node) ? [
        $e220d53e1e2a4e8f$var$B($e220d53e1e2a4e8f$var$C, e.map(r, "declaration", "decorators")),
        $e220d53e1e2a4e8f$var$C
    ] : "";
}
function $e220d53e1e2a4e8f$var$Wu(e, t, r) {
    let { node: n, parent: s } = e, { decorators: u } = n;
    if (!$e220d53e1e2a4e8f$var$b(u) || $e220d53e1e2a4e8f$var$Xu(s) || $e220d53e1e2a4e8f$var$kr(e)) return "";
    let i = n.type === "ClassExpression" || n.type === "ClassDeclaration" || $e220d53e1e2a4e8f$var$Yu(n, t);
    return [
        e.key === "declaration" && $e220d53e1e2a4e8f$var$Qs(s) ? $e220d53e1e2a4e8f$var$C : i ? $e220d53e1e2a4e8f$var$Te : "",
        $e220d53e1e2a4e8f$var$B($e220d53e1e2a4e8f$var$A, e.map(r, "decorators")),
        $e220d53e1e2a4e8f$var$A
    ];
}
function $e220d53e1e2a4e8f$var$Yu(e, t) {
    return e.decorators.some((r)=>$e220d53e1e2a4e8f$var$z(t.originalText, $e220d53e1e2a4e8f$var$O(r)));
}
function $e220d53e1e2a4e8f$var$Xu(e) {
    var r;
    if (e.type !== "ExportDefaultDeclaration" && e.type !== "ExportNamedDeclaration" && e.type !== "DeclareExportDeclaration") return !1;
    let t = (r = e.declaration) == null ? void 0 : r.decorators;
    return $e220d53e1e2a4e8f$var$b(t) && $e220d53e1e2a4e8f$var$yt(e, t[0]);
}
function $e220d53e1e2a4e8f$var$$u(e, t, r) {
    let { node: n } = e;
    return [
        "import",
        n.module ? " module" : "",
        $e220d53e1e2a4e8f$var$os(n),
        $e220d53e1e2a4e8f$var$Ku(e, t, r),
        $e220d53e1e2a4e8f$var$Hu(e, t, r),
        $e220d53e1e2a4e8f$var$Qu(e, t, r),
        t.semi ? ";" : ""
    ];
}
var $e220d53e1e2a4e8f$var$Vu = (e)=>e.type === "ExportDefaultDeclaration" || e.type === "DeclareExportDeclaration" && e.default;
function $e220d53e1e2a4e8f$var$Kr(e, t, r) {
    let { node: n } = e, s = [
        $e220d53e1e2a4e8f$var$qu(e, t, r),
        $e220d53e1e2a4e8f$var$Z(e),
        "export",
        $e220d53e1e2a4e8f$var$Vu(n) ? " default" : ""
    ], { declaration: u, exported: i } = n;
    return $e220d53e1e2a4e8f$var$d(n, $e220d53e1e2a4e8f$var$x.Dangling) && (s.push(" ", $e220d53e1e2a4e8f$var$M(e, t)), $e220d53e1e2a4e8f$var$gr(n) && s.push($e220d53e1e2a4e8f$var$C)), u ? s.push(" ", r("declaration")) : (s.push($e220d53e1e2a4e8f$var$Vp(n)), n.type === "ExportAllDeclaration" || n.type === "DeclareExportAllDeclaration" ? (s.push(" *"), i && s.push(" as ", r("exported"))) : s.push($e220d53e1e2a4e8f$var$Ku(e, t, r)), s.push($e220d53e1e2a4e8f$var$Hu(e, t, r), $e220d53e1e2a4e8f$var$Qu(e, t, r))), s.push($e220d53e1e2a4e8f$var$$p(n, t)), s;
}
var $e220d53e1e2a4e8f$var$Xp = $e220d53e1e2a4e8f$var$j([
    "ClassDeclaration",
    "FunctionDeclaration",
    "TSInterfaceDeclaration",
    "DeclareClass",
    "DeclareFunction",
    "TSDeclareFunction",
    "EnumDeclaration"
]);
function $e220d53e1e2a4e8f$var$$p(e, t) {
    return t.semi && (!e.declaration || $e220d53e1e2a4e8f$var$Vu(e) && !$e220d53e1e2a4e8f$var$Xp(e.declaration)) ? ";" : "";
}
function $e220d53e1e2a4e8f$var$as(e, t = !0) {
    return e && e !== "value" ? `${t ? " " : ""}${e}${t ? "" : " "}` : "";
}
function $e220d53e1e2a4e8f$var$os(e, t) {
    return $e220d53e1e2a4e8f$var$as(e.importKind, t);
}
function $e220d53e1e2a4e8f$var$Vp(e) {
    return $e220d53e1e2a4e8f$var$as(e.exportKind);
}
function $e220d53e1e2a4e8f$var$Hu(e, t, r) {
    let { node: n } = e;
    if (!n.source) return "";
    let s = [];
    return $e220d53e1e2a4e8f$var$zu(n, t) || s.push(" from"), s.push(" ", r("source")), s;
}
function $e220d53e1e2a4e8f$var$Ku(e, t, r) {
    let { node: n } = e;
    if ($e220d53e1e2a4e8f$var$zu(n, t)) return "";
    let s = [
        " "
    ];
    if ($e220d53e1e2a4e8f$var$b(n.specifiers)) {
        let u = [], i = [];
        e.each(()=>{
            let a = e.node.type;
            if (a === "ExportNamespaceSpecifier" || a === "ExportDefaultSpecifier" || a === "ImportNamespaceSpecifier" || a === "ImportDefaultSpecifier") u.push(r());
            else if (a === "ExportSpecifier" || a === "ImportSpecifier") i.push(r());
            else throw new $e220d53e1e2a4e8f$var$Oe(n, "specifier");
        }, "specifiers"), s.push($e220d53e1e2a4e8f$var$B(", ", u)), i.length > 0 && (u.length > 0 && s.push(", "), i.length > 1 || u.length > 0 || n.specifiers.some((o)=>$e220d53e1e2a4e8f$var$d(o)) ? s.push($e220d53e1e2a4e8f$var$y([
            "{",
            $e220d53e1e2a4e8f$var$E([
                t.bracketSpacing ? $e220d53e1e2a4e8f$var$A : $e220d53e1e2a4e8f$var$F,
                $e220d53e1e2a4e8f$var$B([
                    ",",
                    $e220d53e1e2a4e8f$var$A
                ], i)
            ]),
            $e220d53e1e2a4e8f$var$P($e220d53e1e2a4e8f$var$le(t) ? "," : ""),
            t.bracketSpacing ? $e220d53e1e2a4e8f$var$A : $e220d53e1e2a4e8f$var$F,
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
function $e220d53e1e2a4e8f$var$zu(e, t) {
    let { type: r, importKind: n, source: s, specifiers: u } = e;
    return r !== "ImportDeclaration" || $e220d53e1e2a4e8f$var$b(u) || n === "type" ? !1 : !/{\s*}/.test(t.originalText.slice($e220d53e1e2a4e8f$var$U(e), $e220d53e1e2a4e8f$var$U(s)));
}
function $e220d53e1e2a4e8f$var$Qu(e, t, r) {
    var i;
    let { node: n } = e, s = $e220d53e1e2a4e8f$var$b(n.attributes) ? "attributes" : $e220d53e1e2a4e8f$var$b(n.assertions) ? "assertions" : void 0;
    return s ? [
        ` ${s === "assertions" || (i = n.extra) != null && i.deprecatedAssertSyntax ? "assert" : "with"} {`,
        t.bracketSpacing ? " " : "",
        $e220d53e1e2a4e8f$var$B(", ", e.map(r, s)),
        t.bracketSpacing ? " " : "",
        "}"
    ] : "";
}
function $e220d53e1e2a4e8f$var$Zu(e, t, r) {
    let { node: n } = e, { type: s } = n, u = s.startsWith("Import"), i = u ? "imported" : "local", a = u ? "local" : "exported", o = n[i], p = n[a], m = "", D = "";
    return s === "ExportNamespaceSpecifier" || s === "ImportNamespaceSpecifier" ? m = "*" : o && (m = r(i)), p && !$e220d53e1e2a4e8f$var$Hp(n) && (D = r(a)), [
        $e220d53e1e2a4e8f$var$as(s === "ImportSpecifier" ? n.importKind : n.exportKind, !1),
        m,
        m && D ? " as " : "",
        D
    ];
}
function $e220d53e1e2a4e8f$var$Hp(e) {
    if (e.type !== "ImportSpecifier" && e.type !== "ExportSpecifier") return !1;
    let { local: t, [e.type === "ImportSpecifier" ? "imported" : "exported"]: r } = e;
    if (t.type !== r.type || !$e220d53e1e2a4e8f$var$Xs(t, r)) return !1;
    if ($e220d53e1e2a4e8f$var$Q(t)) return t.value === r.value && $e220d53e1e2a4e8f$var$oe(t) === $e220d53e1e2a4e8f$var$oe(r);
    switch(t.type){
        case "Identifier":
            return t.name === r.name;
        default:
            return !1;
    }
}
function $e220d53e1e2a4e8f$var$Kp(e) {
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
            if ($e220d53e1e2a4e8f$var$Y(u)) return !0;
            u.type === "ConditionalExpression" && t.push(u);
        }
    }
    return !1;
}
function $e220d53e1e2a4e8f$var$zp(e, t, r) {
    let { node: n } = e, s = n.type === "ConditionalExpression", u = s ? "alternate" : "falseType", { parent: i } = e, a = s ? r("test") : [
        r("checkType"),
        " ",
        "extends",
        " ",
        r("extendsType")
    ];
    return i.type === n.type && i[u] === n ? $e220d53e1e2a4e8f$var$De(2, a) : a;
}
var $e220d53e1e2a4e8f$var$Qp = new Map([
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
function $e220d53e1e2a4e8f$var$Zp(e) {
    let { node: t } = e;
    if (t.type !== "ConditionalExpression") return !1;
    let r, n = t;
    for(let s = 0; !r; s++){
        let u = e.getParentNode(s);
        if (u.type === "ChainExpression" && u.expression === n || $e220d53e1e2a4e8f$var$k(u) && u.callee === n || $e220d53e1e2a4e8f$var$J(u) && u.object === n || u.type === "TSNonNullExpression" && u.expression === n) {
            n = u;
            continue;
        }
        u.type === "NewExpression" && u.callee === n || $e220d53e1e2a4e8f$var$Le(u) && u.expression === n ? (r = e.getParentNode(s + 1), n = u) : r = u;
    }
    return n === t ? !1 : r[$e220d53e1e2a4e8f$var$Qp.get(r.type)] === n;
}
function $e220d53e1e2a4e8f$var$Mt(e, t, r) {
    let { node: n } = e, s = n.type === "ConditionalExpression", u = s ? "consequent" : "trueType", i = s ? "alternate" : "falseType", a = s ? [
        "test"
    ] : [
        "checkType",
        "extendsType"
    ], o = n[u], p = n[i], m = [], D = !1, { parent: c } = e, f = c.type === n.type && a.some((V)=>c[V] === n), l = c.type === n.type && !f, h, g, S = 0;
    do g = h || n, h = e.getParentNode(S), S++;
    while (h && h.type === n.type && a.every((V)=>h[V] !== g));
    let I = h || c, v = g;
    if (s && ($e220d53e1e2a4e8f$var$Y(n[a[0]]) || $e220d53e1e2a4e8f$var$Y(o) || $e220d53e1e2a4e8f$var$Y(p) || $e220d53e1e2a4e8f$var$Kp(v))) {
        D = !0, l = !0;
        let V = (Ee)=>[
                $e220d53e1e2a4e8f$var$P("("),
                $e220d53e1e2a4e8f$var$E([
                    $e220d53e1e2a4e8f$var$F,
                    Ee
                ]),
                $e220d53e1e2a4e8f$var$F,
                $e220d53e1e2a4e8f$var$P(")")
            ], Be = (Ee)=>Ee.type === "NullLiteral" || Ee.type === "Literal" && Ee.value === null || Ee.type === "Identifier" && Ee.name === "undefined";
        m.push(" ? ", Be(o) ? r(u) : V(r(u)), " : ", p.type === n.type || Be(p) ? r(i) : V(r(i)));
    } else {
        let V = [
            $e220d53e1e2a4e8f$var$A,
            "? ",
            o.type === n.type ? $e220d53e1e2a4e8f$var$P("", "(") : "",
            $e220d53e1e2a4e8f$var$De(2, r(u)),
            o.type === n.type ? $e220d53e1e2a4e8f$var$P("", ")") : "",
            $e220d53e1e2a4e8f$var$A,
            ": ",
            p.type === n.type ? r(i) : $e220d53e1e2a4e8f$var$De(2, r(i))
        ];
        m.push(c.type !== n.type || c[i] === n || f ? V : t.useTabs ? $e220d53e1e2a4e8f$var$Os($e220d53e1e2a4e8f$var$E(V)) : $e220d53e1e2a4e8f$var$De(Math.max(0, t.tabWidth - 2), V));
    }
    let _ = [
        u,
        i,
        ...a
    ].some((V)=>$e220d53e1e2a4e8f$var$d(n[V], (Be)=>$e220d53e1e2a4e8f$var$ae(Be) && $e220d53e1e2a4e8f$var$rt(t.originalText, $e220d53e1e2a4e8f$var$U(Be), $e220d53e1e2a4e8f$var$O(Be)))), R = (V)=>c === I ? $e220d53e1e2a4e8f$var$y(V, {
            shouldBreak: _
        }) : _ ? [
            V,
            $e220d53e1e2a4e8f$var$Te
        ] : V, T = !D && ($e220d53e1e2a4e8f$var$J(c) || c.type === "NGPipeExpression" && c.left === n) && !c.computed, N = $e220d53e1e2a4e8f$var$Zp(e), Se = R([
        $e220d53e1e2a4e8f$var$zp(e, t, r),
        l ? m : $e220d53e1e2a4e8f$var$E(m),
        s && T && !N ? $e220d53e1e2a4e8f$var$F : ""
    ]);
    return f || N ? $e220d53e1e2a4e8f$var$y([
        $e220d53e1e2a4e8f$var$E([
            $e220d53e1e2a4e8f$var$F,
            Se
        ]),
        $e220d53e1e2a4e8f$var$F
    ]) : Se;
}
function $e220d53e1e2a4e8f$var$ec(e, t, r = 0) {
    let n = 0;
    for(let s = r; s < e.length; ++s)e[s] === "	" ? n = n + t - n % t : n++;
    return n;
}
var $e220d53e1e2a4e8f$var$ei = $e220d53e1e2a4e8f$var$ec;
function $e220d53e1e2a4e8f$var$tc(e, t) {
    let r = e.lastIndexOf(`
`);
    return r === -1 ? 0 : $e220d53e1e2a4e8f$var$ei(e.slice(r + 1).match(/^[\t ]*/)[0], t);
}
var $e220d53e1e2a4e8f$var$ti = $e220d53e1e2a4e8f$var$tc;
function $e220d53e1e2a4e8f$var$ri(e) {
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
var $e220d53e1e2a4e8f$var$de = Symbol("MODE_BREAK"), $e220d53e1e2a4e8f$var$nt = Symbol("MODE_FLAT"), $e220d53e1e2a4e8f$var$rr = Symbol("cursor");
function $e220d53e1e2a4e8f$var$ni() {
    return {
        value: "",
        length: 0,
        queue: []
    };
}
function $e220d53e1e2a4e8f$var$rc(e, t) {
    return $e220d53e1e2a4e8f$var$ps(e, {
        type: "indent"
    }, t);
}
function $e220d53e1e2a4e8f$var$nc(e, t, r) {
    return t === Number.NEGATIVE_INFINITY ? e.root || $e220d53e1e2a4e8f$var$ni() : t < 0 ? $e220d53e1e2a4e8f$var$ps(e, {
        type: "dedent"
    }, r) : t ? t.type === "root" ? {
        ...e,
        root: e
    } : $e220d53e1e2a4e8f$var$ps(e, {
        type: typeof t == "string" ? "stringAlign" : "numberAlign",
        n: t
    }, r) : e;
}
function $e220d53e1e2a4e8f$var$ps(e, t, r) {
    let n = t.type === "dedent" ? e.queue.slice(0, -1) : [
        ...e.queue,
        t
    ], s = "", u = 0, i = 0, a = 0;
    for (let l of n)switch(l.type){
        case "indent":
            m(), r.useTabs ? o(1) : p(r.tabWidth);
            break;
        case "stringAlign":
            m(), s += l.n, u += l.n.length;
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
    function m() {
        r.useTabs ? D() : c();
    }
    function D() {
        i > 0 && o(i), f();
    }
    function c() {
        a > 0 && p(a), f();
    }
    function f() {
        i = 0, a = 0;
    }
}
function $e220d53e1e2a4e8f$var$cs(e) {
    let t = 0, r = 0, n = e.length;
    e: for(; n--;){
        let s = e[n];
        if (s === $e220d53e1e2a4e8f$var$rr) {
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
    if (t > 0 || r > 0) for(e.length = n + 1; r-- > 0;)e.push($e220d53e1e2a4e8f$var$rr);
    return t;
}
function $e220d53e1e2a4e8f$var$zr(e, t, r, n, s, u) {
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
        let { mode: p, doc: m } = a.pop();
        switch($e220d53e1e2a4e8f$var$Ze(m)){
            case $e220d53e1e2a4e8f$var$Ke:
                o.push(m), r -= $e220d53e1e2a4e8f$var$tt(m);
                break;
            case $e220d53e1e2a4e8f$var$je:
            case $e220d53e1e2a4e8f$var$ye:
                {
                    let D = $e220d53e1e2a4e8f$var$mr(m);
                    for(let c = D.length - 1; c >= 0; c--)a.push({
                        mode: p,
                        doc: D[c]
                    });
                    break;
                }
            case $e220d53e1e2a4e8f$var$Me:
            case $e220d53e1e2a4e8f$var$Re:
            case $e220d53e1e2a4e8f$var$Je:
            case $e220d53e1e2a4e8f$var$be:
                a.push({
                    mode: p,
                    doc: m.contents
                });
                break;
            case $e220d53e1e2a4e8f$var$Qe:
                r += $e220d53e1e2a4e8f$var$cs(o);
                break;
            case $e220d53e1e2a4e8f$var$ue:
                {
                    if (u && m.break) return !1;
                    let D = m.break ? $e220d53e1e2a4e8f$var$de : p, c = m.expandedStates && D === $e220d53e1e2a4e8f$var$de ? $e220d53e1e2a4e8f$var$w(!1, m.expandedStates, -1) : m.contents;
                    a.push({
                        mode: D,
                        doc: c
                    });
                    break;
                }
            case $e220d53e1e2a4e8f$var$Fe:
                {
                    let c = (m.groupId ? s[m.groupId] || $e220d53e1e2a4e8f$var$nt : p) === $e220d53e1e2a4e8f$var$de ? m.breakContents : m.flatContents;
                    c && a.push({
                        mode: p,
                        doc: c
                    });
                    break;
                }
            case $e220d53e1e2a4e8f$var$ie:
                if (p === $e220d53e1e2a4e8f$var$de || m.hard) return !0;
                m.soft || (o.push(" "), r--);
                break;
            case $e220d53e1e2a4e8f$var$Ne:
                n = !0;
                break;
            case $e220d53e1e2a4e8f$var$Ue:
                if (n) return !1;
                break;
        }
    }
    return !1;
}
function $e220d53e1e2a4e8f$var$ls(e, t) {
    let r = {}, n = t.printWidth, s = $e220d53e1e2a4e8f$var$ri(t.endOfLine), u = 0, i = [
        {
            ind: $e220d53e1e2a4e8f$var$ni(),
            mode: $e220d53e1e2a4e8f$var$de,
            doc: e
        }
    ], a = [], o = !1, p = [], m = 0;
    for($e220d53e1e2a4e8f$var$Ms(e); i.length > 0;){
        let { ind: c, mode: f, doc: l } = i.pop();
        switch($e220d53e1e2a4e8f$var$Ze(l)){
            case $e220d53e1e2a4e8f$var$Ke:
                {
                    let h = s !== `
` ? $e220d53e1e2a4e8f$var$H(!1, l, `
`, s) : l;
                    a.push(h), i.length > 0 && (u += $e220d53e1e2a4e8f$var$tt(h));
                    break;
                }
            case $e220d53e1e2a4e8f$var$je:
                for(let h = l.length - 1; h >= 0; h--)i.push({
                    ind: c,
                    mode: f,
                    doc: l[h]
                });
                break;
            case $e220d53e1e2a4e8f$var$ze:
                if (m >= 2) throw new Error("There are too many 'cursor' in doc.");
                a.push($e220d53e1e2a4e8f$var$rr), m++;
                break;
            case $e220d53e1e2a4e8f$var$Me:
                i.push({
                    ind: $e220d53e1e2a4e8f$var$rc(c, t),
                    mode: f,
                    doc: l.contents
                });
                break;
            case $e220d53e1e2a4e8f$var$Re:
                i.push({
                    ind: $e220d53e1e2a4e8f$var$nc(c, l.n, t),
                    mode: f,
                    doc: l.contents
                });
                break;
            case $e220d53e1e2a4e8f$var$Qe:
                u -= $e220d53e1e2a4e8f$var$cs(a);
                break;
            case $e220d53e1e2a4e8f$var$ue:
                switch(f){
                    case $e220d53e1e2a4e8f$var$nt:
                        if (!o) {
                            i.push({
                                ind: c,
                                mode: l.break ? $e220d53e1e2a4e8f$var$de : $e220d53e1e2a4e8f$var$nt,
                                doc: l.contents
                            });
                            break;
                        }
                    case $e220d53e1e2a4e8f$var$de:
                        {
                            o = !1;
                            let h = {
                                ind: c,
                                mode: $e220d53e1e2a4e8f$var$nt,
                                doc: l.contents
                            }, g = n - u, S = p.length > 0;
                            if (!l.break && $e220d53e1e2a4e8f$var$zr(h, i, g, S, r)) i.push(h);
                            else if (l.expandedStates) {
                                let I = $e220d53e1e2a4e8f$var$w(!1, l.expandedStates, -1);
                                if (l.break) {
                                    i.push({
                                        ind: c,
                                        mode: $e220d53e1e2a4e8f$var$de,
                                        doc: I
                                    });
                                    break;
                                } else for(let v = 1; v < l.expandedStates.length + 1; v++)if (v >= l.expandedStates.length) {
                                    i.push({
                                        ind: c,
                                        mode: $e220d53e1e2a4e8f$var$de,
                                        doc: I
                                    });
                                    break;
                                } else {
                                    let _ = l.expandedStates[v], R = {
                                        ind: c,
                                        mode: $e220d53e1e2a4e8f$var$nt,
                                        doc: _
                                    };
                                    if ($e220d53e1e2a4e8f$var$zr(R, i, g, S, r)) {
                                        i.push(R);
                                        break;
                                    }
                                }
                            } else i.push({
                                ind: c,
                                mode: $e220d53e1e2a4e8f$var$de,
                                doc: l.contents
                            });
                            break;
                        }
                }
                l.id && (r[l.id] = $e220d53e1e2a4e8f$var$w(!1, i, -1).mode);
                break;
            case $e220d53e1e2a4e8f$var$ye:
                {
                    let h = n - u, { parts: g } = l;
                    if (g.length === 0) break;
                    let [S, I] = g, v = {
                        ind: c,
                        mode: $e220d53e1e2a4e8f$var$nt,
                        doc: S
                    }, _ = {
                        ind: c,
                        mode: $e220d53e1e2a4e8f$var$de,
                        doc: S
                    }, R = $e220d53e1e2a4e8f$var$zr(v, [], h, p.length > 0, r, !0);
                    if (g.length === 1) {
                        R ? i.push(v) : i.push(_);
                        break;
                    }
                    let T = {
                        ind: c,
                        mode: $e220d53e1e2a4e8f$var$nt,
                        doc: I
                    }, N = {
                        ind: c,
                        mode: $e220d53e1e2a4e8f$var$de,
                        doc: I
                    };
                    if (g.length === 2) {
                        R ? i.push(T, v) : i.push(N, _);
                        break;
                    }
                    g.splice(0, 2);
                    let Se = {
                        ind: c,
                        mode: f,
                        doc: $e220d53e1e2a4e8f$var$St(g)
                    }, V = g[0];
                    $e220d53e1e2a4e8f$var$zr({
                        ind: c,
                        mode: $e220d53e1e2a4e8f$var$nt,
                        doc: [
                            S,
                            I,
                            V
                        ]
                    }, [], h, p.length > 0, r, !0) ? i.push(Se, T, v) : R ? i.push(Se, N, v) : i.push(Se, N, _);
                    break;
                }
            case $e220d53e1e2a4e8f$var$Fe:
            case $e220d53e1e2a4e8f$var$Je:
                {
                    let h = l.groupId ? r[l.groupId] : f;
                    if (h === $e220d53e1e2a4e8f$var$de) {
                        let g = l.type === $e220d53e1e2a4e8f$var$Fe ? l.breakContents : l.negate ? l.contents : $e220d53e1e2a4e8f$var$E(l.contents);
                        g && i.push({
                            ind: c,
                            mode: f,
                            doc: g
                        });
                    }
                    if (h === $e220d53e1e2a4e8f$var$nt) {
                        let g = l.type === $e220d53e1e2a4e8f$var$Fe ? l.flatContents : l.negate ? $e220d53e1e2a4e8f$var$E(l.contents) : l.contents;
                        g && i.push({
                            ind: c,
                            mode: f,
                            doc: g
                        });
                    }
                    break;
                }
            case $e220d53e1e2a4e8f$var$Ne:
                p.push({
                    ind: c,
                    mode: f,
                    doc: l.contents
                });
                break;
            case $e220d53e1e2a4e8f$var$Ue:
                p.length > 0 && i.push({
                    ind: c,
                    mode: f,
                    doc: $e220d53e1e2a4e8f$var$Sn
                });
                break;
            case $e220d53e1e2a4e8f$var$ie:
                switch(f){
                    case $e220d53e1e2a4e8f$var$nt:
                        if (l.hard) o = !0;
                        else {
                            l.soft || (a.push(" "), u += 1);
                            break;
                        }
                    case $e220d53e1e2a4e8f$var$de:
                        if (p.length > 0) {
                            i.push({
                                ind: c,
                                mode: f,
                                doc: l
                            }, ...p.reverse()), p.length = 0;
                            break;
                        }
                        l.literal ? c.root ? (a.push(s, c.root.value), u = c.root.length) : (a.push(s), u = 0) : (u -= $e220d53e1e2a4e8f$var$cs(a), a.push(s + c.value), u = c.length);
                        break;
                }
                break;
            case $e220d53e1e2a4e8f$var$be:
                i.push({
                    ind: c,
                    mode: f,
                    doc: l.contents
                });
                break;
            case $e220d53e1e2a4e8f$var$Pe:
                break;
            default:
                throw new $e220d53e1e2a4e8f$var$lt(l);
        }
        i.length === 0 && p.length > 0 && (i.push(...p.reverse()), p.length = 0);
    }
    let D = a.indexOf($e220d53e1e2a4e8f$var$rr);
    if (D !== -1) {
        let c = a.indexOf($e220d53e1e2a4e8f$var$rr, D + 1), f = a.slice(0, D).join(""), l = a.slice(D + 1, c).join(""), h = a.slice(c + 1).join("");
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
function $e220d53e1e2a4e8f$var$Qr(e, t, r) {
    let { node: n } = e;
    if (n.type === "TemplateLiteral" && $e220d53e1e2a4e8f$var$ic(e)) {
        let m = $e220d53e1e2a4e8f$var$sc(e, r, t);
        if (m) return m;
    }
    let u = "expressions";
    n.type === "TSTemplateLiteralType" && (u = "types");
    let i = [], a = e.map(t, u), o = $e220d53e1e2a4e8f$var$eu(n);
    o && (a = a.map((m)=>$e220d53e1e2a4e8f$var$ls(m, {
            ...r,
            printWidth: Number.POSITIVE_INFINITY
        }).formatted)), i.push($e220d53e1e2a4e8f$var$Ae, "`");
    let p = 0;
    return e.each(({ index: m, node: D })=>{
        if (i.push(t()), D.tail) return;
        let { tabWidth: c } = r, f = D.value.raw, l = f.includes(`
`) ? $e220d53e1e2a4e8f$var$ti(f, c) : p;
        p = l;
        let h = a[m];
        if (!o) {
            let S = n[u][m];
            ($e220d53e1e2a4e8f$var$d(S) || $e220d53e1e2a4e8f$var$J(S) || S.type === "ConditionalExpression" || S.type === "SequenceExpression" || $e220d53e1e2a4e8f$var$Le(S) || $e220d53e1e2a4e8f$var$ce(S)) && (h = [
                $e220d53e1e2a4e8f$var$E([
                    $e220d53e1e2a4e8f$var$F,
                    h
                ]),
                $e220d53e1e2a4e8f$var$F
            ]);
        }
        let g = l === 0 && f.endsWith(`
`) ? $e220d53e1e2a4e8f$var$De(Number.NEGATIVE_INFINITY, h) : $e220d53e1e2a4e8f$var$vs(h, l, c);
        i.push($e220d53e1e2a4e8f$var$y([
            "${",
            g,
            $e220d53e1e2a4e8f$var$Ae,
            "}"
        ]));
    }, "quasis"), i.push("`"), i;
}
function $e220d53e1e2a4e8f$var$si(e) {
    let t = e("quasi");
    return $e220d53e1e2a4e8f$var$et(t.label && {
        tagged: !0,
        ...t.label
    }, [
        e("tag"),
        e("typeParameters"),
        $e220d53e1e2a4e8f$var$Ae,
        t
    ]);
}
function $e220d53e1e2a4e8f$var$sc(e, t, r) {
    let { node: n } = e, s = n.quasis[0].value.raw.trim().split(/\s*\|\s*/);
    if (s.length > 1 || s.some((u)=>u.length > 0)) {
        t.__inJestEach = !0;
        let u = e.map(r, "expressions");
        t.__inJestEach = !1;
        let i = [], a = u.map((c)=>"${" + $e220d53e1e2a4e8f$var$ls(c, {
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
            let f = $e220d53e1e2a4e8f$var$w(!1, o, -1), l = a[c - 1];
            f.cells.push(l), l.includes(`
`) && (f.hasLineBreak = !0), n.quasis[c].value.raw.includes(`
`) && o.push({
                hasLineBreak: !1,
                cells: []
            });
        }
        let p = Math.max(s.length, ...o.map((c)=>c.cells.length)), m = Array.from({
            length: p
        }).fill(0), D = [
            {
                cells: s
            },
            ...o.filter((c)=>c.cells.length > 0)
        ];
        for (let { cells: c } of D.filter((f)=>!f.hasLineBreak))for (let [f, l] of c.entries())m[f] = Math.max(m[f], $e220d53e1e2a4e8f$var$tt(l));
        return i.push($e220d53e1e2a4e8f$var$Ae, "`", $e220d53e1e2a4e8f$var$E([
            $e220d53e1e2a4e8f$var$C,
            $e220d53e1e2a4e8f$var$B($e220d53e1e2a4e8f$var$C, D.map((c)=>$e220d53e1e2a4e8f$var$B(" | ", c.cells.map((f, l)=>c.hasLineBreak ? f : f + " ".repeat(m[l] - $e220d53e1e2a4e8f$var$tt(f))))))
        ]), $e220d53e1e2a4e8f$var$C, "`"), i;
    }
}
function $e220d53e1e2a4e8f$var$uc(e, t) {
    let { node: r } = e, n = t();
    return $e220d53e1e2a4e8f$var$d(r) && (n = $e220d53e1e2a4e8f$var$y([
        $e220d53e1e2a4e8f$var$E([
            $e220d53e1e2a4e8f$var$F,
            n
        ]),
        $e220d53e1e2a4e8f$var$F
    ])), [
        "${",
        n,
        $e220d53e1e2a4e8f$var$Ae,
        "}"
    ];
}
function $e220d53e1e2a4e8f$var$Rt(e, t) {
    return e.map((r)=>$e220d53e1e2a4e8f$var$uc(r, t), "expressions");
}
function $e220d53e1e2a4e8f$var$Zr(e, t) {
    return $e220d53e1e2a4e8f$var$ut(e, (r)=>typeof r == "string" ? t ? $e220d53e1e2a4e8f$var$H(!1, r, /(\\*)`/g, "$1$1\\`") : $e220d53e1e2a4e8f$var$ms(r) : r);
}
function $e220d53e1e2a4e8f$var$ms(e) {
    return $e220d53e1e2a4e8f$var$H(!1, e, /([\\`]|\${)/g, "\\$1");
}
function $e220d53e1e2a4e8f$var$ic({ node: e, parent: t }) {
    let r = /^[fx]?(?:describe|it|test)$/;
    return t.type === "TaggedTemplateExpression" && t.quasi === e && t.tag.type === "MemberExpression" && t.tag.property.type === "Identifier" && t.tag.property.name === "each" && (t.tag.object.type === "Identifier" && r.test(t.tag.object.name) || t.tag.object.type === "MemberExpression" && t.tag.object.property.type === "Identifier" && (t.tag.object.property.name === "only" || t.tag.object.property.name === "skip") && t.tag.object.object.type === "Identifier" && r.test(t.tag.object.object.name));
}
function $e220d53e1e2a4e8f$var$ac(e) {
    let t = new WeakMap;
    return function(r) {
        return t.has(r) || t.set(r, Symbol(e)), t.get(r);
    };
}
var $e220d53e1e2a4e8f$var$en = $e220d53e1e2a4e8f$var$ac;
function $e220d53e1e2a4e8f$var$oc(e) {
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
function $e220d53e1e2a4e8f$var$ui(e, t, r) {
    let { node: n } = e;
    return $e220d53e1e2a4e8f$var$y([
        n.variance ? r("variance") : "",
        "[",
        $e220d53e1e2a4e8f$var$E([
            r("keyTparam"),
            " in ",
            r("sourceType")
        ]),
        "]",
        $e220d53e1e2a4e8f$var$oc(n.optional),
        ": ",
        r("propType")
    ]);
}
function $e220d53e1e2a4e8f$var$ys(e, t) {
    return e === "+" || e === "-" ? e + t : t;
}
function $e220d53e1e2a4e8f$var$ii(e, t, r) {
    let { node: n } = e, s = $e220d53e1e2a4e8f$var$rt(t.originalText, $e220d53e1e2a4e8f$var$U(n), $e220d53e1e2a4e8f$var$U(n.typeParameter));
    return $e220d53e1e2a4e8f$var$y([
        "{",
        $e220d53e1e2a4e8f$var$E([
            t.bracketSpacing ? $e220d53e1e2a4e8f$var$A : $e220d53e1e2a4e8f$var$F,
            $e220d53e1e2a4e8f$var$y([
                r("typeParameter"),
                n.optional ? $e220d53e1e2a4e8f$var$ys(n.optional, "?") : "",
                n.typeAnnotation ? ": " : "",
                r("typeAnnotation")
            ]),
            t.semi ? $e220d53e1e2a4e8f$var$P(";") : ""
        ]),
        $e220d53e1e2a4e8f$var$M(e, t),
        t.bracketSpacing ? $e220d53e1e2a4e8f$var$A : $e220d53e1e2a4e8f$var$F,
        "}"
    ], {
        shouldBreak: s
    });
}
var $e220d53e1e2a4e8f$var$nr = $e220d53e1e2a4e8f$var$en("typeParameters");
function $e220d53e1e2a4e8f$var$pc(e, t, r) {
    let { node: n } = e;
    return $e220d53e1e2a4e8f$var$X(n).length === 1 && n.type.startsWith("TS") && !n[r][0].constraint && e.parent.type === "ArrowFunctionExpression" && !(t.filepath && /\.ts$/.test(t.filepath));
}
function $e220d53e1e2a4e8f$var$gt(e, t, r, n) {
    let { node: s } = e;
    if (!s[n]) return "";
    if (!Array.isArray(s[n])) return r(n);
    let u = e.getNode(2), i = u && $e220d53e1e2a4e8f$var$Ct(u), a = e.match((m)=>!(m[n].length === 1 && $e220d53e1e2a4e8f$var$ke(m[n][0])), void 0, (m, D)=>D === "typeAnnotation", (m)=>m.type === "Identifier", $e220d53e1e2a4e8f$var$rs);
    if (s[n].length === 0 || !a && (i || s[n].length === 1 && (s[n][0].type === "NullableTypeAnnotation" || $e220d53e1e2a4e8f$var$ss(s[n][0])))) return [
        "<",
        $e220d53e1e2a4e8f$var$B(", ", e.map(r, n)),
        $e220d53e1e2a4e8f$var$cc(e, t),
        ">"
    ];
    let p = s.type === "TSTypeParameterInstantiation" ? "" : $e220d53e1e2a4e8f$var$pc(e, t, n) ? "," : $e220d53e1e2a4e8f$var$le(t) ? $e220d53e1e2a4e8f$var$P(",") : "";
    return $e220d53e1e2a4e8f$var$y([
        "<",
        $e220d53e1e2a4e8f$var$E([
            $e220d53e1e2a4e8f$var$F,
            $e220d53e1e2a4e8f$var$B([
                ",",
                $e220d53e1e2a4e8f$var$A
            ], e.map(r, n))
        ]),
        p,
        $e220d53e1e2a4e8f$var$F,
        ">"
    ], {
        id: $e220d53e1e2a4e8f$var$nr(s)
    });
}
function $e220d53e1e2a4e8f$var$cc(e, t) {
    let { node: r } = e;
    if (!$e220d53e1e2a4e8f$var$d(r, $e220d53e1e2a4e8f$var$x.Dangling)) return "";
    let n = !$e220d53e1e2a4e8f$var$d(r, $e220d53e1e2a4e8f$var$x.Line), s = $e220d53e1e2a4e8f$var$M(e, t, {
        indent: !n
    });
    return n ? s : [
        s,
        $e220d53e1e2a4e8f$var$C
    ];
}
function $e220d53e1e2a4e8f$var$tn(e, t, r) {
    let { node: n, parent: s } = e, u = [
        n.type === "TSTypeParameter" && n.const ? "const " : ""
    ], i = n.type === "TSTypeParameter" ? r("name") : n.name;
    if (s.type === "TSMappedType") return s.readonly && u.push($e220d53e1e2a4e8f$var$ys(s.readonly, "readonly"), " "), u.push("[", i), n.constraint && u.push(" in ", r("constraint")), s.nameType && u.push(" as ", e.callParent(()=>r("nameType"))), u.push("]"), u;
    if (n.variance && u.push(r("variance")), n.in && u.push("in "), n.out && u.push("out "), u.push(i), n.bound && (n.usesExtendsBound && u.push(" extends "), u.push($e220d53e1e2a4e8f$var$q(e, r, "bound"))), n.constraint) {
        let a = Symbol("constraint");
        u.push(" extends", $e220d53e1e2a4e8f$var$y($e220d53e1e2a4e8f$var$E($e220d53e1e2a4e8f$var$A), {
            id: a
        }), $e220d53e1e2a4e8f$var$Ae, $e220d53e1e2a4e8f$var$mt(r("constraint"), {
            groupId: a
        }));
    }
    return n.default && u.push(" = ", r("default")), $e220d53e1e2a4e8f$var$y(u);
}
var $e220d53e1e2a4e8f$var$ai = new Proxy(()=>{}, {
    get: ()=>$e220d53e1e2a4e8f$var$ai
}), $e220d53e1e2a4e8f$var$rn = $e220d53e1e2a4e8f$var$ai;
var $e220d53e1e2a4e8f$var$nn = new WeakMap;
function $e220d53e1e2a4e8f$var$ct(e, t, r) {
    let { node: n } = e;
    if (n.computed) return [
        "[",
        r("key"),
        "]"
    ];
    let { parent: s } = e, { key: u } = n;
    if (t.quoteProps === "consistent" && !$e220d53e1e2a4e8f$var$nn.has(s)) {
        let i = (s.properties || s.body || s.members).some((a)=>!a.computed && a.key && $e220d53e1e2a4e8f$var$Q(a.key) && !$e220d53e1e2a4e8f$var$_n(a, t));
        $e220d53e1e2a4e8f$var$nn.set(s, i);
    }
    if ((u.type === "Identifier" || $e220d53e1e2a4e8f$var$he(u) && $e220d53e1e2a4e8f$var$jn($e220d53e1e2a4e8f$var$He($e220d53e1e2a4e8f$var$oe(u))) && String(u.value) === $e220d53e1e2a4e8f$var$He($e220d53e1e2a4e8f$var$oe(u)) && !(t.parser === "typescript" || t.parser === "babel-ts")) && (t.parser === "json" || t.quoteProps === "consistent" && $e220d53e1e2a4e8f$var$nn.get(s))) {
        let i = $e220d53e1e2a4e8f$var$Tt(JSON.stringify(u.type === "Identifier" ? u.name : u.value.toString()), t);
        return e.call((a)=>$e220d53e1e2a4e8f$var$pe(a, i, t), "key");
    }
    return $e220d53e1e2a4e8f$var$_n(n, t) && (t.quoteProps === "as-needed" || t.quoteProps === "consistent" && !$e220d53e1e2a4e8f$var$nn.get(s)) ? e.call((i)=>$e220d53e1e2a4e8f$var$pe(i, /^\d/.test(u.value) ? $e220d53e1e2a4e8f$var$He(u.value) : u.value, t), "key") : r("key");
}
function $e220d53e1e2a4e8f$var$oi(e, t, r) {
    let { node: n } = e;
    return n.shorthand ? r("value") : $e220d53e1e2a4e8f$var$ft(e, t, r, $e220d53e1e2a4e8f$var$ct(e, t, r), ":", "value");
}
var $e220d53e1e2a4e8f$var$lc = (e)=>e.type === "ObjectMethod" || e.type === "ClassMethod" || e.type === "ClassPrivateMethod" || e.type === "MethodDefinition" || e.type === "TSAbstractMethodDefinition" || e.type === "TSDeclareMethod" || (e.type === "Property" || e.type === "ObjectProperty") && (e.method || e.kind === "get" || e.kind === "set"), $e220d53e1e2a4e8f$var$mc = (e)=>e.node.type === "FunctionExpression" && e.key === "value" && $e220d53e1e2a4e8f$var$lc(e.parent);
function $e220d53e1e2a4e8f$var$sn(e, t, r, n) {
    if ($e220d53e1e2a4e8f$var$mc(e)) return $e220d53e1e2a4e8f$var$un(e, r, t);
    let { node: s } = e, u = !1;
    if ((s.type === "FunctionDeclaration" || s.type === "FunctionExpression") && n != null && n.expandLastArg) {
        let { parent: m } = e;
        $e220d53e1e2a4e8f$var$k(m) && ($e220d53e1e2a4e8f$var$Ce(m).length > 1 || $e220d53e1e2a4e8f$var$X(s).every((D)=>D.type === "Identifier" && !D.typeAnnotation)) && (u = !0);
    }
    let i = [
        $e220d53e1e2a4e8f$var$Z(e),
        s.async ? "async " : "",
        `function${s.generator ? "*" : ""} `,
        s.id ? t("id") : ""
    ], a = $e220d53e1e2a4e8f$var$ot(e, t, r, u), o = $e220d53e1e2a4e8f$var$on(e, t), p = $e220d53e1e2a4e8f$var$xt(s, o);
    return i.push($e220d53e1e2a4e8f$var$Ve(e, r, t), $e220d53e1e2a4e8f$var$y([
        p ? $e220d53e1e2a4e8f$var$y(a) : a,
        o
    ]), s.body ? " " : "", t("body")), r.semi && (s.declare || !s.body) && i.push(";"), i;
}
function $e220d53e1e2a4e8f$var$sr(e, t, r) {
    let { node: n } = e, { kind: s } = n, u = n.value || n, i = [];
    return !s || s === "init" || s === "method" || s === "constructor" ? u.async && i.push("async ") : ($e220d53e1e2a4e8f$var$rn.ok(s === "get" || s === "set"), i.push(s, " ")), u.generator && i.push("*"), i.push($e220d53e1e2a4e8f$var$ct(e, t, r), n.optional || n.key.optional ? "?" : "", n === u ? $e220d53e1e2a4e8f$var$un(e, t, r) : r("value")), i;
}
function $e220d53e1e2a4e8f$var$un(e, t, r) {
    let { node: n } = e, s = $e220d53e1e2a4e8f$var$ot(e, r, t), u = $e220d53e1e2a4e8f$var$on(e, r), i = $e220d53e1e2a4e8f$var$Nu(n), a = $e220d53e1e2a4e8f$var$xt(n, u), o = [
        $e220d53e1e2a4e8f$var$Ve(e, t, r),
        $e220d53e1e2a4e8f$var$y([
            i ? $e220d53e1e2a4e8f$var$y(s, {
                shouldBreak: !0
            }) : a ? $e220d53e1e2a4e8f$var$y(s) : s,
            u
        ])
    ];
    return n.body ? o.push(" ", r("body")) : o.push(t.semi ? ";" : ""), o;
}
function $e220d53e1e2a4e8f$var$yc(e) {
    let t = $e220d53e1e2a4e8f$var$X(e);
    return t.length === 1 && !e.typeParameters && !$e220d53e1e2a4e8f$var$d(e, $e220d53e1e2a4e8f$var$x.Dangling) && t[0].type === "Identifier" && !t[0].typeAnnotation && !$e220d53e1e2a4e8f$var$d(t[0]) && !t[0].optional && !e.predicate && !e.returnType;
}
function $e220d53e1e2a4e8f$var$an(e, t) {
    if (t.arrowParens === "always") return !1;
    if (t.arrowParens === "avoid") {
        let { node: r } = e;
        return $e220d53e1e2a4e8f$var$yc(r);
    }
    return !1;
}
function $e220d53e1e2a4e8f$var$on(e, t) {
    let { node: r } = e, s = [
        $e220d53e1e2a4e8f$var$q(e, t, "returnType")
    ];
    return r.predicate && s.push(t("predicate")), s;
}
function $e220d53e1e2a4e8f$var$pi(e, t, r) {
    let { node: n } = e, s = t.semi ? ";" : "", u = [];
    if (n.argument) {
        let o = r("argument");
        $e220d53e1e2a4e8f$var$Dc(t, n.argument) ? o = [
            "(",
            $e220d53e1e2a4e8f$var$E([
                $e220d53e1e2a4e8f$var$C,
                o
            ]),
            $e220d53e1e2a4e8f$var$C,
            ")"
        ] : ($e220d53e1e2a4e8f$var$ce(n.argument) || n.argument.type === "SequenceExpression") && (o = $e220d53e1e2a4e8f$var$y([
            $e220d53e1e2a4e8f$var$P("("),
            $e220d53e1e2a4e8f$var$E([
                $e220d53e1e2a4e8f$var$F,
                o
            ]),
            $e220d53e1e2a4e8f$var$F,
            $e220d53e1e2a4e8f$var$P(")")
        ])), u.push(" ", o);
    }
    let i = $e220d53e1e2a4e8f$var$d(n, $e220d53e1e2a4e8f$var$x.Dangling), a = s && i && $e220d53e1e2a4e8f$var$d(n, $e220d53e1e2a4e8f$var$x.Last | $e220d53e1e2a4e8f$var$x.Line);
    return a && u.push(s), i && u.push(" ", $e220d53e1e2a4e8f$var$M(e, t)), a || u.push(s), u;
}
function $e220d53e1e2a4e8f$var$ci(e, t, r) {
    return [
        "return",
        $e220d53e1e2a4e8f$var$pi(e, t, r)
    ];
}
function $e220d53e1e2a4e8f$var$li(e, t, r) {
    return [
        "throw",
        $e220d53e1e2a4e8f$var$pi(e, t, r)
    ];
}
function $e220d53e1e2a4e8f$var$Dc(e, t) {
    if ($e220d53e1e2a4e8f$var$Ie(e.originalText, t) || $e220d53e1e2a4e8f$var$d(t, $e220d53e1e2a4e8f$var$x.Leading, (r)=>$e220d53e1e2a4e8f$var$rt(e.originalText, $e220d53e1e2a4e8f$var$U(r), $e220d53e1e2a4e8f$var$O(r))) && !$e220d53e1e2a4e8f$var$Y(t)) return !0;
    if ($e220d53e1e2a4e8f$var$Lt(t)) {
        let r = t, n;
        for(; n = $e220d53e1e2a4e8f$var$zs(r);)if (r = n, $e220d53e1e2a4e8f$var$Ie(e.originalText, r)) return !0;
    }
    return !1;
}
var $e220d53e1e2a4e8f$var$mi = $e220d53e1e2a4e8f$var$j([
    "ClassProperty",
    "PropertyDefinition",
    "ClassPrivateProperty",
    "ClassAccessorProperty",
    "AccessorProperty",
    "TSAbstractPropertyDefinition",
    "TSAbstractAccessorProperty"
]);
function $e220d53e1e2a4e8f$var$pn(e, t, r) {
    let { node: n } = e, s = [
        $e220d53e1e2a4e8f$var$Z(e),
        $e220d53e1e2a4e8f$var$_t(e),
        "class"
    ], u = $e220d53e1e2a4e8f$var$d(n.id, $e220d53e1e2a4e8f$var$x.Trailing) || $e220d53e1e2a4e8f$var$d(n.typeParameters, $e220d53e1e2a4e8f$var$x.Trailing) || $e220d53e1e2a4e8f$var$d(n.superClass) || $e220d53e1e2a4e8f$var$b(n.extends) || $e220d53e1e2a4e8f$var$b(n.mixins) || $e220d53e1e2a4e8f$var$b(n.implements), i = [], a = [];
    if (n.id && i.push(" ", r("id")), i.push(r("typeParameters")), n.superClass) {
        let o = [
            $e220d53e1e2a4e8f$var$Ec(e, t, r),
            r("superTypeParameters")
        ], p = e.call((m)=>[
                "extends ",
                $e220d53e1e2a4e8f$var$pe(m, o, t)
            ], "superClass");
        u ? a.push($e220d53e1e2a4e8f$var$A, $e220d53e1e2a4e8f$var$y(p)) : a.push(" ", p);
    } else a.push($e220d53e1e2a4e8f$var$Ds(e, t, r, "extends"));
    if (a.push($e220d53e1e2a4e8f$var$Ds(e, t, r, "mixins"), $e220d53e1e2a4e8f$var$Ds(e, t, r, "implements")), u) {
        let o;
        $e220d53e1e2a4e8f$var$Di(n) ? o = [
            ...i,
            $e220d53e1e2a4e8f$var$E(a)
        ] : o = $e220d53e1e2a4e8f$var$E([
            ...i,
            a
        ]), s.push($e220d53e1e2a4e8f$var$y(o, {
            id: $e220d53e1e2a4e8f$var$yi(n)
        }));
    } else s.push(...i, ...a);
    return s.push(" ", r("body")), s;
}
var $e220d53e1e2a4e8f$var$yi = $e220d53e1e2a4e8f$var$en("heritageGroup");
function $e220d53e1e2a4e8f$var$fs(e) {
    return $e220d53e1e2a4e8f$var$P($e220d53e1e2a4e8f$var$C, "", {
        groupId: $e220d53e1e2a4e8f$var$yi(e)
    });
}
function $e220d53e1e2a4e8f$var$fc(e) {
    return [
        "extends",
        "mixins",
        "implements"
    ].reduce((t, r)=>t + (Array.isArray(e[r]) ? e[r].length : 0), e.superClass ? 1 : 0) > 1;
}
function $e220d53e1e2a4e8f$var$Di(e) {
    return e.typeParameters && !$e220d53e1e2a4e8f$var$d(e.typeParameters, $e220d53e1e2a4e8f$var$x.Trailing | $e220d53e1e2a4e8f$var$x.Line) && !$e220d53e1e2a4e8f$var$fc(e);
}
function $e220d53e1e2a4e8f$var$Ds(e, t, r, n) {
    let { node: s } = e;
    if (!$e220d53e1e2a4e8f$var$b(s[n])) return "";
    let u = $e220d53e1e2a4e8f$var$M(e, t, {
        marker: n
    });
    return [
        $e220d53e1e2a4e8f$var$Di(s) ? $e220d53e1e2a4e8f$var$P(" ", $e220d53e1e2a4e8f$var$A, {
            groupId: $e220d53e1e2a4e8f$var$nr(s.typeParameters)
        }) : $e220d53e1e2a4e8f$var$A,
        u,
        u && $e220d53e1e2a4e8f$var$C,
        n,
        $e220d53e1e2a4e8f$var$y($e220d53e1e2a4e8f$var$E([
            $e220d53e1e2a4e8f$var$A,
            $e220d53e1e2a4e8f$var$B([
                ",",
                $e220d53e1e2a4e8f$var$A
            ], e.map(r, n))
        ]))
    ];
}
function $e220d53e1e2a4e8f$var$Ec(e, t, r) {
    let n = r("superClass"), { parent: s } = e;
    return s.type === "AssignmentExpression" ? $e220d53e1e2a4e8f$var$y($e220d53e1e2a4e8f$var$P([
        "(",
        $e220d53e1e2a4e8f$var$E([
            $e220d53e1e2a4e8f$var$F,
            n
        ]),
        $e220d53e1e2a4e8f$var$F,
        ")"
    ], n)) : n;
}
function $e220d53e1e2a4e8f$var$cn(e, t, r) {
    let { node: n } = e, s = [];
    return $e220d53e1e2a4e8f$var$b(n.decorators) && s.push($e220d53e1e2a4e8f$var$is(e, t, r)), s.push($e220d53e1e2a4e8f$var$jt(n)), n.static && s.push("static "), s.push($e220d53e1e2a4e8f$var$_t(e)), n.override && s.push("override "), s.push($e220d53e1e2a4e8f$var$sr(e, t, r)), s;
}
function $e220d53e1e2a4e8f$var$ln(e, t, r) {
    let { node: n } = e, s = [], u = t.semi ? ";" : "";
    $e220d53e1e2a4e8f$var$b(n.decorators) && s.push($e220d53e1e2a4e8f$var$is(e, t, r)), s.push($e220d53e1e2a4e8f$var$jt(n), $e220d53e1e2a4e8f$var$Z(e)), n.static && s.push("static "), s.push($e220d53e1e2a4e8f$var$_t(e)), n.override && s.push("override "), n.readonly && s.push("readonly "), n.variance && s.push(r("variance")), (n.type === "ClassAccessorProperty" || n.type === "AccessorProperty" || n.type === "TSAbstractAccessorProperty") && s.push("accessor "), s.push($e220d53e1e2a4e8f$var$ct(e, t, r), $e220d53e1e2a4e8f$var$$(e), $e220d53e1e2a4e8f$var$Vr(e), $e220d53e1e2a4e8f$var$q(e, r));
    let i = n.type === "TSAbstractPropertyDefinition" || n.type === "TSAbstractAccessorProperty";
    return [
        $e220d53e1e2a4e8f$var$ft(e, t, r, s, " =", i ? void 0 : "value"),
        u
    ];
}
function $e220d53e1e2a4e8f$var$fi(e, t, r) {
    let { node: n } = e, s = [];
    return e.each(({ node: u, next: i, isLast: a })=>{
        s.push(r()), !t.semi && $e220d53e1e2a4e8f$var$mi(u) && $e220d53e1e2a4e8f$var$Fc(u, i) && s.push(";"), a || (s.push($e220d53e1e2a4e8f$var$C), $e220d53e1e2a4e8f$var$me(u, t) && s.push($e220d53e1e2a4e8f$var$C));
    }, "body"), $e220d53e1e2a4e8f$var$d(n, $e220d53e1e2a4e8f$var$x.Dangling) && s.push($e220d53e1e2a4e8f$var$M(e, t)), [
        $e220d53e1e2a4e8f$var$b(n.body) ? $e220d53e1e2a4e8f$var$fs(e.parent) : "",
        "{",
        s.length > 0 ? [
            $e220d53e1e2a4e8f$var$E([
                $e220d53e1e2a4e8f$var$C,
                s
            ]),
            $e220d53e1e2a4e8f$var$C
        ] : "",
        "}"
    ];
}
function $e220d53e1e2a4e8f$var$Fc(e, t) {
    var s;
    let { type: r, name: n } = e.key;
    if (!e.computed && r === "Identifier" && (n === "static" || n === "get" || n === "set") && !e.value && !e.typeAnnotation) return !0;
    if (!t || t.static || t.accessibility) return !1;
    if (!t.computed) {
        let u = (s = t.key) == null ? void 0 : s.name;
        if (u === "in" || u === "instanceof") return !0;
    }
    if ($e220d53e1e2a4e8f$var$mi(t) && t.variance && !t.static && !t.declare) return !0;
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
function $e220d53e1e2a4e8f$var$Et(e, t, r) {
    var R;
    let n = t.semi ? ";" : "", { node: s } = e, u = s.type === "ObjectTypeAnnotation", i = s.type === "TSEnumDeclaration" || s.type === "EnumBooleanBody" || s.type === "EnumNumberBody" || s.type === "EnumStringBody" || s.type === "EnumSymbolBody", a = [
        s.type === "TSTypeLiteral" || i ? "members" : s.type === "TSInterfaceBody" ? "body" : "properties"
    ];
    u && a.push("indexers", "callProperties", "internalSlots");
    let o = a.flatMap((T)=>e.map(({ node: N })=>({
                node: N,
                printed: r(),
                loc: $e220d53e1e2a4e8f$var$U(N)
            }), T));
    a.length > 1 && o.sort((T, N)=>T.loc - N.loc);
    let { parent: p, key: m } = e, D = u && m === "body" && (p.type === "InterfaceDeclaration" || p.type === "DeclareInterface" || p.type === "DeclareClass"), c = s.type === "TSInterfaceBody" || i || D || s.type === "ObjectPattern" && p.type !== "FunctionDeclaration" && p.type !== "FunctionExpression" && p.type !== "ArrowFunctionExpression" && p.type !== "ObjectMethod" && p.type !== "ClassMethod" && p.type !== "ClassPrivateMethod" && p.type !== "AssignmentPattern" && p.type !== "CatchClause" && s.properties.some((T)=>T.value && (T.value.type === "ObjectPattern" || T.value.type === "ArrayPattern")) || s.type !== "ObjectPattern" && o.length > 0 && $e220d53e1e2a4e8f$var$rt(t.originalText, $e220d53e1e2a4e8f$var$U(s), o[0].loc), f = D ? ";" : s.type === "TSInterfaceBody" || s.type === "TSTypeLiteral" ? $e220d53e1e2a4e8f$var$P(n, ";") : ",", l = s.type === "RecordExpression" ? "#{" : s.exact ? "{|" : "{", h = s.exact ? "|}" : "}", g = [], S = o.map((T)=>{
        let N = [
            ...g,
            $e220d53e1e2a4e8f$var$y(T.printed)
        ];
        return g = [
            f,
            $e220d53e1e2a4e8f$var$A
        ], (T.node.type === "TSPropertySignature" || T.node.type === "TSMethodSignature" || T.node.type === "TSConstructSignatureDeclaration" || T.node.type === "TSCallSignatureDeclaration") && $e220d53e1e2a4e8f$var$d(T.node, $e220d53e1e2a4e8f$var$x.PrettierIgnore) && g.shift(), $e220d53e1e2a4e8f$var$me(T.node, t) && g.push($e220d53e1e2a4e8f$var$C), N;
    });
    if (s.inexact || s.hasUnknownMembers) {
        let T;
        if ($e220d53e1e2a4e8f$var$d(s, $e220d53e1e2a4e8f$var$x.Dangling)) {
            let N = $e220d53e1e2a4e8f$var$d(s, $e220d53e1e2a4e8f$var$x.Line);
            T = [
                $e220d53e1e2a4e8f$var$M(e, t),
                N || $e220d53e1e2a4e8f$var$z(t.originalText, $e220d53e1e2a4e8f$var$O($e220d53e1e2a4e8f$var$w(!1, $e220d53e1e2a4e8f$var$Kt(s), -1))) ? $e220d53e1e2a4e8f$var$C : $e220d53e1e2a4e8f$var$A,
                "..."
            ];
        } else T = [
            "..."
        ];
        S.push([
            ...g,
            ...T
        ]);
    }
    let I = (R = $e220d53e1e2a4e8f$var$w(!1, o, -1)) == null ? void 0 : R.node, v = !(s.inexact || s.hasUnknownMembers || I && (I.type === "RestElement" || (I.type === "TSPropertySignature" || I.type === "TSCallSignatureDeclaration" || I.type === "TSMethodSignature" || I.type === "TSConstructSignatureDeclaration") && $e220d53e1e2a4e8f$var$d(I, $e220d53e1e2a4e8f$var$x.PrettierIgnore))), _;
    if (S.length === 0) {
        if (!$e220d53e1e2a4e8f$var$d(s, $e220d53e1e2a4e8f$var$x.Dangling)) return [
            l,
            h,
            $e220d53e1e2a4e8f$var$q(e, r)
        ];
        _ = $e220d53e1e2a4e8f$var$y([
            l,
            $e220d53e1e2a4e8f$var$M(e, t, {
                indent: !0
            }),
            $e220d53e1e2a4e8f$var$F,
            h,
            $e220d53e1e2a4e8f$var$$(e),
            $e220d53e1e2a4e8f$var$q(e, r)
        ]);
    } else _ = [
        D && $e220d53e1e2a4e8f$var$b(s.properties) ? $e220d53e1e2a4e8f$var$fs(p) : "",
        l,
        $e220d53e1e2a4e8f$var$E([
            t.bracketSpacing ? $e220d53e1e2a4e8f$var$A : $e220d53e1e2a4e8f$var$F,
            ...S
        ]),
        $e220d53e1e2a4e8f$var$P(v && (f !== "," || $e220d53e1e2a4e8f$var$le(t)) ? f : ""),
        t.bracketSpacing ? $e220d53e1e2a4e8f$var$A : $e220d53e1e2a4e8f$var$F,
        h,
        $e220d53e1e2a4e8f$var$$(e),
        $e220d53e1e2a4e8f$var$q(e, r)
    ];
    return e.match((T)=>T.type === "ObjectPattern" && !$e220d53e1e2a4e8f$var$b(T.decorators), $e220d53e1e2a4e8f$var$Es) || $e220d53e1e2a4e8f$var$ke(s) && (e.match(void 0, (T, N)=>N === "typeAnnotation", (T, N)=>N === "typeAnnotation", $e220d53e1e2a4e8f$var$Es) || e.match(void 0, (T, N)=>T.type === "FunctionTypeParam" && N === "typeAnnotation", $e220d53e1e2a4e8f$var$Es)) || !c && e.match((T)=>T.type === "ObjectPattern", (T)=>T.type === "AssignmentExpression" || T.type === "VariableDeclarator") ? _ : $e220d53e1e2a4e8f$var$y(_, {
        shouldBreak: c
    });
}
function $e220d53e1e2a4e8f$var$Es(e, t) {
    return (t === "params" || t === "parameters" || t === "this" || t === "rest") && $e220d53e1e2a4e8f$var$ns(e);
}
var $e220d53e1e2a4e8f$var$Fs = new WeakMap;
function $e220d53e1e2a4e8f$var$Ei(e) {
    return $e220d53e1e2a4e8f$var$Fs.has(e) || $e220d53e1e2a4e8f$var$Fs.set(e, e.type === "ConditionalExpression" && !$e220d53e1e2a4e8f$var$re(e, (t)=>t.type === "ObjectExpression")), $e220d53e1e2a4e8f$var$Fs.get(e);
}
var $e220d53e1e2a4e8f$var$Fi = (e)=>e.type === "SequenceExpression";
function $e220d53e1e2a4e8f$var$Ci(e, t, r, n = {}) {
    let s = [], u, i = [], a = !1, o = !n.expandLastArg && e.node.body.type === "ArrowFunctionExpression", p;
    (function g() {
        let { node: S } = e, I = $e220d53e1e2a4e8f$var$Cc(e, t, r, n);
        if (s.length === 0) s.push(I);
        else {
            let { leading: v, trailing: _ } = $e220d53e1e2a4e8f$var$Nn(e, t);
            s.push([
                v,
                I
            ]), i.unshift(_);
        }
        o && (a || (a = S.returnType && $e220d53e1e2a4e8f$var$X(S).length > 0 || S.typeParameters || $e220d53e1e2a4e8f$var$X(S).some((v)=>v.type !== "Identifier"))), !o || S.body.type !== "ArrowFunctionExpression" ? (u = r("body", n), p = S.body) : e.call(g, "body");
    })();
    let m = !$e220d53e1e2a4e8f$var$Ie(t.originalText, p) && ($e220d53e1e2a4e8f$var$Fi(p) || $e220d53e1e2a4e8f$var$dc(p, u, t) || !a && $e220d53e1e2a4e8f$var$Ei(p)), D = e.key === "callee" && $e220d53e1e2a4e8f$var$it(e.parent), c = Symbol("arrow-chain"), f = $e220d53e1e2a4e8f$var$Ac(e, n, {
        signatureDocs: s,
        shouldBreak: a
    }), l, h = !1;
    return o && (D || n.assignmentLayout) && (h = !0, l = n.assignmentLayout === "chain-tail-arrow-chain" || D && !m), u = $e220d53e1e2a4e8f$var$Tc(e, t, n, {
        bodyDoc: u,
        bodyComments: i,
        functionBody: p,
        shouldPutBodyOnSameLine: m
    }), $e220d53e1e2a4e8f$var$y([
        $e220d53e1e2a4e8f$var$y(h ? $e220d53e1e2a4e8f$var$E([
            $e220d53e1e2a4e8f$var$F,
            f
        ]) : f, {
            shouldBreak: l,
            id: c
        }),
        " =>",
        o ? $e220d53e1e2a4e8f$var$mt(u, {
            groupId: c
        }) : $e220d53e1e2a4e8f$var$y(u),
        o && D ? $e220d53e1e2a4e8f$var$P($e220d53e1e2a4e8f$var$F, "", {
            groupId: c
        }) : ""
    ]);
}
function $e220d53e1e2a4e8f$var$Cc(e, t, r, n) {
    let { node: s } = e, u = [];
    if (s.async && u.push("async "), $e220d53e1e2a4e8f$var$an(e, t)) u.push(r([
        "params",
        0
    ]));
    else {
        let a = n.expandLastArg || n.expandFirstArg, o = $e220d53e1e2a4e8f$var$on(e, r);
        if (a) {
            if ($e220d53e1e2a4e8f$var$K(o)) throw new $e220d53e1e2a4e8f$var$at;
            o = $e220d53e1e2a4e8f$var$y($e220d53e1e2a4e8f$var$Ut(o));
        }
        u.push($e220d53e1e2a4e8f$var$y([
            $e220d53e1e2a4e8f$var$ot(e, r, t, a, !0),
            o
        ]));
    }
    let i = $e220d53e1e2a4e8f$var$M(e, t, {
        filter (a) {
            let o = $e220d53e1e2a4e8f$var$Xe(t.originalText, $e220d53e1e2a4e8f$var$O(a));
            return o !== !1 && t.originalText.slice(o, o + 2) === "=>";
        }
    });
    return i && u.push(" ", i), u;
}
function $e220d53e1e2a4e8f$var$dc(e, t, r) {
    var n, s;
    return $e220d53e1e2a4e8f$var$G(e) || $e220d53e1e2a4e8f$var$ee(e) || e.type === "ArrowFunctionExpression" || e.type === "DoExpression" || e.type === "BlockStatement" || $e220d53e1e2a4e8f$var$Y(e) || ((n = t.label) == null ? void 0 : n.hug) !== !1 && (((s = t.label) == null ? void 0 : s.embed) || $e220d53e1e2a4e8f$var$xr(e, r.originalText));
}
function $e220d53e1e2a4e8f$var$Ac(e, t, { signatureDocs: r, shouldBreak: n }) {
    if (r.length === 1) return r[0];
    let { parent: s, key: u } = e;
    return u !== "callee" && $e220d53e1e2a4e8f$var$it(s) || $e220d53e1e2a4e8f$var$ce(s) ? $e220d53e1e2a4e8f$var$y([
        r[0],
        " =>",
        $e220d53e1e2a4e8f$var$E([
            $e220d53e1e2a4e8f$var$A,
            $e220d53e1e2a4e8f$var$B([
                " =>",
                $e220d53e1e2a4e8f$var$A
            ], r.slice(1))
        ])
    ], {
        shouldBreak: n
    }) : u === "callee" && $e220d53e1e2a4e8f$var$it(s) || t.assignmentLayout ? $e220d53e1e2a4e8f$var$y($e220d53e1e2a4e8f$var$B([
        " =>",
        $e220d53e1e2a4e8f$var$A
    ], r), {
        shouldBreak: n
    }) : $e220d53e1e2a4e8f$var$y($e220d53e1e2a4e8f$var$E($e220d53e1e2a4e8f$var$B([
        " =>",
        $e220d53e1e2a4e8f$var$A
    ], r)), {
        shouldBreak: n
    });
}
function $e220d53e1e2a4e8f$var$Tc(e, t, r, { bodyDoc: n, bodyComments: s, functionBody: u, shouldPutBodyOnSameLine: i }) {
    let { node: a, parent: o } = e, p = r.expandLastArg && $e220d53e1e2a4e8f$var$le(t, "all") ? $e220d53e1e2a4e8f$var$P(",") : "", m = (r.expandLastArg || o.type === "JSXExpressionContainer") && !$e220d53e1e2a4e8f$var$d(a) ? $e220d53e1e2a4e8f$var$F : "";
    return i && $e220d53e1e2a4e8f$var$Ei(u) ? [
        " ",
        $e220d53e1e2a4e8f$var$y([
            $e220d53e1e2a4e8f$var$P("", "("),
            $e220d53e1e2a4e8f$var$E([
                $e220d53e1e2a4e8f$var$F,
                n
            ]),
            $e220d53e1e2a4e8f$var$P("", ")"),
            p,
            m
        ]),
        s
    ] : ($e220d53e1e2a4e8f$var$Fi(u) && (n = $e220d53e1e2a4e8f$var$y([
        "(",
        $e220d53e1e2a4e8f$var$E([
            $e220d53e1e2a4e8f$var$F,
            n
        ]),
        $e220d53e1e2a4e8f$var$F,
        ")"
    ])), i ? [
        " ",
        n,
        s
    ] : [
        $e220d53e1e2a4e8f$var$E([
            $e220d53e1e2a4e8f$var$A,
            n,
            s
        ]),
        p,
        m
    ]);
}
function $e220d53e1e2a4e8f$var$ur(e, t, r, n) {
    let { node: s } = e, u = [], i = $e220d53e1e2a4e8f$var$xc(s[n]);
    return e.each(({ node: a })=>{
        a.type !== "EmptyStatement" && (u.push(r()), a !== i && (u.push($e220d53e1e2a4e8f$var$C), $e220d53e1e2a4e8f$var$me(a, t) && u.push($e220d53e1e2a4e8f$var$C)));
    }, n), u;
}
function $e220d53e1e2a4e8f$var$xc(e) {
    for(let t = e.length - 1; t >= 0; t--){
        let r = e[t];
        if (r.type !== "EmptyStatement") return r;
    }
}
function $e220d53e1e2a4e8f$var$mn(e, t, r) {
    let { node: n } = e, s = [];
    n.type === "StaticBlock" && s.push("static "), s.push("{");
    let u = $e220d53e1e2a4e8f$var$Cs(e, t, r);
    if (u) s.push($e220d53e1e2a4e8f$var$E([
        $e220d53e1e2a4e8f$var$C,
        u
    ]), $e220d53e1e2a4e8f$var$C);
    else {
        let { parent: i } = e, a = e.grandparent;
        i.type === "ArrowFunctionExpression" || i.type === "FunctionExpression" || i.type === "FunctionDeclaration" || i.type === "ObjectMethod" || i.type === "ClassMethod" || i.type === "ClassPrivateMethod" || i.type === "ForStatement" || i.type === "WhileStatement" || i.type === "DoWhileStatement" || i.type === "DoExpression" || i.type === "CatchClause" && !a.finalizer || i.type === "TSModuleDeclaration" || i.type === "TSDeclareFunction" || n.type === "StaticBlock" || s.push($e220d53e1e2a4e8f$var$C);
    }
    return s.push("}"), s;
}
function $e220d53e1e2a4e8f$var$Cs(e, t, r) {
    var o;
    let { node: n } = e, s = $e220d53e1e2a4e8f$var$b(n.directives), u = n.body.some((p)=>p.type !== "EmptyStatement"), i = $e220d53e1e2a4e8f$var$d(n, $e220d53e1e2a4e8f$var$x.Dangling);
    if (!s && !u && !i) return "";
    let a = [];
    return s && (a.push($e220d53e1e2a4e8f$var$ur(e, t, r, "directives")), (u || i) && (a.push($e220d53e1e2a4e8f$var$C), $e220d53e1e2a4e8f$var$me($e220d53e1e2a4e8f$var$w(!1, n.directives, -1), t) && a.push($e220d53e1e2a4e8f$var$C))), u && a.push($e220d53e1e2a4e8f$var$ur(e, t, r, "body")), i && a.push($e220d53e1e2a4e8f$var$M(e, t)), n.type === "Program" && ((o = e.parent) == null ? void 0 : o.type) !== "ModuleExpression" && a.push($e220d53e1e2a4e8f$var$C), a;
}
function $e220d53e1e2a4e8f$var$di(e, t) {
    if (t.semi || $e220d53e1e2a4e8f$var$ds(e, t) || $e220d53e1e2a4e8f$var$Ts(e, t)) return !1;
    let { node: r, key: n, parent: s } = e;
    return !!(r.type === "ExpressionStatement" && (n === "body" && (s.type === "Program" || s.type === "BlockStatement" || s.type === "StaticBlock" || s.type === "TSModuleBlock") || n === "consequent" && s.type === "SwitchCase") && e.call(()=>$e220d53e1e2a4e8f$var$Ai(e, t), "expression"));
}
function $e220d53e1e2a4e8f$var$Ai(e, t) {
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
            if (!$e220d53e1e2a4e8f$var$an(e, t)) return !0;
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
            if ($e220d53e1e2a4e8f$var$Y(r)) return !0;
    }
    return $e220d53e1e2a4e8f$var$we(e, t) ? !0 : $e220d53e1e2a4e8f$var$Lt(r) ? e.call(()=>$e220d53e1e2a4e8f$var$Ai(e, t), ...$e220d53e1e2a4e8f$var$dr(r)) : !1;
}
function $e220d53e1e2a4e8f$var$ds({ node: e, parent: t }, r) {
    return (r.parentParser === "markdown" || r.parentParser === "mdx") && e.type === "ExpressionStatement" && $e220d53e1e2a4e8f$var$Y(e.expression) && t.type === "Program" && t.body.length === 1;
}
function $e220d53e1e2a4e8f$var$As(e) {
    switch(e.type){
        case "MemberExpression":
            switch(e.property.type){
                case "Identifier":
                case "NumericLiteral":
                case "StringLiteral":
                    return $e220d53e1e2a4e8f$var$As(e.object);
            }
            return !1;
        case "Identifier":
            return !0;
        default:
            return !1;
    }
}
function $e220d53e1e2a4e8f$var$Ts({ node: e, parent: t }, r) {
    return (r.parser === "__vue_event_binding" || r.parser === "__vue_ts_event_binding") && e.type === "ExpressionStatement" && t.type === "Program" && t.body.length === 1;
}
function $e220d53e1e2a4e8f$var$Ti(e, t, r) {
    let n = [
        r("expression")
    ];
    return $e220d53e1e2a4e8f$var$Ts(e, t) ? $e220d53e1e2a4e8f$var$As(e.node.expression) && n.push(";") : $e220d53e1e2a4e8f$var$ds(e, t) || t.semi && n.push(";"), $e220d53e1e2a4e8f$var$d(e.node, $e220d53e1e2a4e8f$var$x.Dangling, ({ marker: s })=>s === $e220d53e1e2a4e8f$var$zt) && n.push(" ", $e220d53e1e2a4e8f$var$M(e, t, {
        marker: $e220d53e1e2a4e8f$var$zt
    })), n;
}
function $e220d53e1e2a4e8f$var$xi(e, t, r) {
    if (t.__isVueBindings || t.__isVueForBindingLeft) {
        let n = e.map(r, "program", "body", 0, "params");
        if (n.length === 1) return n[0];
        let s = $e220d53e1e2a4e8f$var$B([
            ",",
            $e220d53e1e2a4e8f$var$A
        ], n);
        return t.__isVueForBindingLeft ? [
            "(",
            $e220d53e1e2a4e8f$var$E([
                $e220d53e1e2a4e8f$var$F,
                $e220d53e1e2a4e8f$var$y(s)
            ]),
            $e220d53e1e2a4e8f$var$F,
            ")"
        ] : s;
    }
    if (t.__isEmbeddedTypescriptGenericParameters) {
        let n = e.map(r, "program", "body", 0, "typeParameters", "params");
        return $e220d53e1e2a4e8f$var$B([
            ",",
            $e220d53e1e2a4e8f$var$A
        ], n);
    }
}
function $e220d53e1e2a4e8f$var$gi(e, t, r, n) {
    let { node: s } = e;
    if ($e220d53e1e2a4e8f$var$vr(s)) return $e220d53e1e2a4e8f$var$vu(e, t);
    let u = t.semi ? ";" : "", i = [];
    switch(s.type){
        case "JsExpressionRoot":
            return r("node");
        case "JsonRoot":
            return [
                r("node"),
                $e220d53e1e2a4e8f$var$C
            ];
        case "File":
            return $e220d53e1e2a4e8f$var$xi(e, t, r) ?? r("program");
        case "Program":
            return $e220d53e1e2a4e8f$var$Cs(e, t, r);
        case "EmptyStatement":
            return "";
        case "ExpressionStatement":
            return $e220d53e1e2a4e8f$var$Ti(e, t, r);
        case "ChainExpression":
            return r("expression");
        case "ParenthesizedExpression":
            return !$e220d53e1e2a4e8f$var$d(s.expression) && ($e220d53e1e2a4e8f$var$ee(s.expression) || $e220d53e1e2a4e8f$var$G(s.expression)) ? [
                "(",
                r("expression"),
                ")"
            ] : $e220d53e1e2a4e8f$var$y([
                "(",
                $e220d53e1e2a4e8f$var$E([
                    $e220d53e1e2a4e8f$var$F,
                    r("expression")
                ]),
                $e220d53e1e2a4e8f$var$F,
                ")"
            ]);
        case "AssignmentExpression":
            return $e220d53e1e2a4e8f$var$ju(e, t, r);
        case "VariableDeclarator":
            return $e220d53e1e2a4e8f$var$Mu(e, t, r);
        case "BinaryExpression":
        case "LogicalExpression":
            return $e220d53e1e2a4e8f$var$Ir(e, t, r);
        case "AssignmentPattern":
            return [
                r("left"),
                " = ",
                r("right")
            ];
        case "OptionalMemberExpression":
        case "MemberExpression":
            return $e220d53e1e2a4e8f$var$ku(e, t, r);
        case "MetaProperty":
            return [
                r("meta"),
                ".",
                r("property")
            ];
        case "BindExpression":
            return s.object && i.push(r("object")), i.push($e220d53e1e2a4e8f$var$y($e220d53e1e2a4e8f$var$E([
                $e220d53e1e2a4e8f$var$F,
                $e220d53e1e2a4e8f$var$Lr(e, t, r)
            ]))), i;
        case "Identifier":
            return [
                s.name,
                $e220d53e1e2a4e8f$var$$(e),
                $e220d53e1e2a4e8f$var$Vr(e),
                $e220d53e1e2a4e8f$var$q(e, r)
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
            return $e220d53e1e2a4e8f$var$Hr(e, r);
        case "FunctionDeclaration":
        case "FunctionExpression":
            return $e220d53e1e2a4e8f$var$sn(e, r, t, n);
        case "ArrowFunctionExpression":
            return $e220d53e1e2a4e8f$var$Ci(e, t, r, n);
        case "YieldExpression":
            return i.push("yield"), s.delegate && i.push("*"), s.argument && i.push(" ", r("argument")), i;
        case "AwaitExpression":
            if (i.push("await"), s.argument) {
                i.push(" ", r("argument"));
                let { parent: a } = e;
                if ($e220d53e1e2a4e8f$var$k(a) && a.callee === s || $e220d53e1e2a4e8f$var$J(a) && a.object === s) {
                    i = [
                        $e220d53e1e2a4e8f$var$E([
                            $e220d53e1e2a4e8f$var$F,
                            ...i
                        ]),
                        $e220d53e1e2a4e8f$var$F
                    ];
                    let o = e.findAncestor((p)=>p.type === "AwaitExpression" || p.type === "BlockStatement");
                    if ((o == null ? void 0 : o.type) !== "AwaitExpression" || !$e220d53e1e2a4e8f$var$re(o.argument, (p)=>p === s)) return $e220d53e1e2a4e8f$var$y(i);
                }
            }
            return i;
        case "ExportDefaultDeclaration":
        case "ExportNamedDeclaration":
        case "ExportAllDeclaration":
            return $e220d53e1e2a4e8f$var$Kr(e, t, r);
        case "ImportDeclaration":
            return $e220d53e1e2a4e8f$var$$u(e, t, r);
        case "ImportSpecifier":
        case "ExportSpecifier":
        case "ImportNamespaceSpecifier":
        case "ExportNamespaceSpecifier":
        case "ImportDefaultSpecifier":
        case "ExportDefaultSpecifier":
            return $e220d53e1e2a4e8f$var$Zu(e, t, r);
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
            return $e220d53e1e2a4e8f$var$mn(e, t, r);
        case "ClassBody":
            return $e220d53e1e2a4e8f$var$fi(e, t, r);
        case "ThrowStatement":
            return $e220d53e1e2a4e8f$var$li(e, t, r);
        case "ReturnStatement":
            return $e220d53e1e2a4e8f$var$ci(e, t, r);
        case "NewExpression":
        case "ImportExpression":
        case "OptionalCallExpression":
        case "CallExpression":
            return $e220d53e1e2a4e8f$var$wr(e, t, r);
        case "ObjectExpression":
        case "ObjectPattern":
        case "RecordExpression":
            return $e220d53e1e2a4e8f$var$Et(e, t, r);
        case "ObjectProperty":
        case "Property":
            return s.method || s.kind === "get" || s.kind === "set" ? $e220d53e1e2a4e8f$var$sr(e, t, r) : $e220d53e1e2a4e8f$var$oi(e, t, r);
        case "ObjectMethod":
            return $e220d53e1e2a4e8f$var$sr(e, t, r);
        case "Decorator":
            return [
                "@",
                r("expression")
            ];
        case "ArrayExpression":
        case "ArrayPattern":
        case "TupleExpression":
            return $e220d53e1e2a4e8f$var$vt(e, t, r);
        case "SequenceExpression":
            {
                let { parent: a } = e;
                if (a.type === "ExpressionStatement" || a.type === "ForStatement") {
                    let o = [];
                    return e.each(({ isFirst: p })=>{
                        p ? o.push(r()) : o.push(",", $e220d53e1e2a4e8f$var$E([
                            $e220d53e1e2a4e8f$var$A,
                            r()
                        ]));
                    }, "expressions"), $e220d53e1e2a4e8f$var$y(o);
                }
                return $e220d53e1e2a4e8f$var$y($e220d53e1e2a4e8f$var$B([
                    ",",
                    $e220d53e1e2a4e8f$var$A
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
            return i.push(s.operator), /[a-z]$/.test(s.operator) && i.push(" "), $e220d53e1e2a4e8f$var$d(s.argument) ? i.push($e220d53e1e2a4e8f$var$y([
                "(",
                $e220d53e1e2a4e8f$var$E([
                    $e220d53e1e2a4e8f$var$F,
                    r("argument")
                ]),
                $e220d53e1e2a4e8f$var$F,
                ")"
            ])) : i.push(r("argument")), i;
        case "UpdateExpression":
            return i.push(r("argument"), s.operator), s.prefix && i.reverse(), i;
        case "ConditionalExpression":
            return $e220d53e1e2a4e8f$var$Mt(e, t, r);
        case "VariableDeclaration":
            {
                let a = e.map(r, "declarations"), o = e.parent, p = o.type === "ForStatement" || o.type === "ForInStatement" || o.type === "ForOfStatement", m = s.declarations.some((c)=>c.init), D;
                return a.length === 1 && !$e220d53e1e2a4e8f$var$d(s.declarations[0]) ? D = a[0] : a.length > 0 && (D = $e220d53e1e2a4e8f$var$E(a[0])), i = [
                    $e220d53e1e2a4e8f$var$Z(e),
                    s.kind,
                    D ? [
                        " ",
                        D
                    ] : "",
                    $e220d53e1e2a4e8f$var$E(a.slice(1).map((c)=>[
                            ",",
                            m && !p ? $e220d53e1e2a4e8f$var$C : $e220d53e1e2a4e8f$var$A,
                            c
                        ]))
                ], p && o.body !== s || i.push(u), $e220d53e1e2a4e8f$var$y(i);
            }
        case "WithStatement":
            return $e220d53e1e2a4e8f$var$y([
                "with (",
                r("object"),
                ")",
                $e220d53e1e2a4e8f$var$pt(s.body, r("body"))
            ]);
        case "IfStatement":
            {
                let a = $e220d53e1e2a4e8f$var$pt(s.consequent, r("consequent")), o = $e220d53e1e2a4e8f$var$y([
                    "if (",
                    $e220d53e1e2a4e8f$var$y([
                        $e220d53e1e2a4e8f$var$E([
                            $e220d53e1e2a4e8f$var$F,
                            r("test")
                        ]),
                        $e220d53e1e2a4e8f$var$F
                    ]),
                    ")",
                    a
                ]);
                if (i.push(o), s.alternate) {
                    let p = $e220d53e1e2a4e8f$var$d(s.consequent, $e220d53e1e2a4e8f$var$x.Trailing | $e220d53e1e2a4e8f$var$x.Line) || $e220d53e1e2a4e8f$var$gr(s), m = s.consequent.type === "BlockStatement" && !p;
                    i.push(m ? " " : $e220d53e1e2a4e8f$var$C), $e220d53e1e2a4e8f$var$d(s, $e220d53e1e2a4e8f$var$x.Dangling) && i.push($e220d53e1e2a4e8f$var$M(e, t), p ? $e220d53e1e2a4e8f$var$C : " "), i.push("else", $e220d53e1e2a4e8f$var$y($e220d53e1e2a4e8f$var$pt(s.alternate, r("alternate"), s.alternate.type === "IfStatement")));
                }
                return i;
            }
        case "ForStatement":
            {
                let a = $e220d53e1e2a4e8f$var$pt(s.body, r("body")), o = $e220d53e1e2a4e8f$var$M(e, t), p = o ? [
                    o,
                    $e220d53e1e2a4e8f$var$F
                ] : "";
                return !s.init && !s.test && !s.update ? [
                    p,
                    $e220d53e1e2a4e8f$var$y([
                        "for (;;)",
                        a
                    ])
                ] : [
                    p,
                    $e220d53e1e2a4e8f$var$y([
                        "for (",
                        $e220d53e1e2a4e8f$var$y([
                            $e220d53e1e2a4e8f$var$E([
                                $e220d53e1e2a4e8f$var$F,
                                r("init"),
                                ";",
                                $e220d53e1e2a4e8f$var$A,
                                r("test"),
                                ";",
                                $e220d53e1e2a4e8f$var$A,
                                r("update")
                            ]),
                            $e220d53e1e2a4e8f$var$F
                        ]),
                        ")",
                        a
                    ])
                ];
            }
        case "WhileStatement":
            return $e220d53e1e2a4e8f$var$y([
                "while (",
                $e220d53e1e2a4e8f$var$y([
                    $e220d53e1e2a4e8f$var$E([
                        $e220d53e1e2a4e8f$var$F,
                        r("test")
                    ]),
                    $e220d53e1e2a4e8f$var$F
                ]),
                ")",
                $e220d53e1e2a4e8f$var$pt(s.body, r("body"))
            ]);
        case "ForInStatement":
            return $e220d53e1e2a4e8f$var$y([
                "for (",
                r("left"),
                " in ",
                r("right"),
                ")",
                $e220d53e1e2a4e8f$var$pt(s.body, r("body"))
            ]);
        case "ForOfStatement":
            return $e220d53e1e2a4e8f$var$y([
                "for",
                s.await ? " await" : "",
                " (",
                r("left"),
                " of ",
                r("right"),
                ")",
                $e220d53e1e2a4e8f$var$pt(s.body, r("body"))
            ]);
        case "DoWhileStatement":
            {
                let a = $e220d53e1e2a4e8f$var$pt(s.body, r("body"));
                return i = [
                    $e220d53e1e2a4e8f$var$y([
                        "do",
                        a
                    ])
                ], s.body.type === "BlockStatement" ? i.push(" ") : i.push($e220d53e1e2a4e8f$var$C), i.push("while (", $e220d53e1e2a4e8f$var$y([
                    $e220d53e1e2a4e8f$var$E([
                        $e220d53e1e2a4e8f$var$F,
                        r("test")
                    ]),
                    $e220d53e1e2a4e8f$var$F
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
                let a = $e220d53e1e2a4e8f$var$d(s.param, (p)=>!$e220d53e1e2a4e8f$var$ae(p) || p.leading && $e220d53e1e2a4e8f$var$z(t.originalText, $e220d53e1e2a4e8f$var$O(p)) || p.trailing && $e220d53e1e2a4e8f$var$z(t.originalText, $e220d53e1e2a4e8f$var$U(p), {
                        backwards: !0
                    })), o = r("param");
                return [
                    "catch ",
                    a ? [
                        "(",
                        $e220d53e1e2a4e8f$var$E([
                            $e220d53e1e2a4e8f$var$F,
                            o
                        ]),
                        $e220d53e1e2a4e8f$var$F,
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
                $e220d53e1e2a4e8f$var$y([
                    "switch (",
                    $e220d53e1e2a4e8f$var$E([
                        $e220d53e1e2a4e8f$var$F,
                        r("discriminant")
                    ]),
                    $e220d53e1e2a4e8f$var$F,
                    ")"
                ]),
                " {",
                s.cases.length > 0 ? $e220d53e1e2a4e8f$var$E([
                    $e220d53e1e2a4e8f$var$C,
                    $e220d53e1e2a4e8f$var$B($e220d53e1e2a4e8f$var$C, e.map(({ node: a, isLast: o })=>[
                            r(),
                            !o && $e220d53e1e2a4e8f$var$me(a, t) ? $e220d53e1e2a4e8f$var$C : ""
                        ], "cases"))
                ]) : "",
                $e220d53e1e2a4e8f$var$C,
                "}"
            ];
        case "SwitchCase":
            {
                s.test ? i.push("case ", r("test"), ":") : i.push("default:"), $e220d53e1e2a4e8f$var$d(s, $e220d53e1e2a4e8f$var$x.Dangling) && i.push(" ", $e220d53e1e2a4e8f$var$M(e, t));
                let a = s.consequent.filter((o)=>o.type !== "EmptyStatement");
                if (a.length > 0) {
                    let o = $e220d53e1e2a4e8f$var$ur(e, t, r, "consequent");
                    i.push(a.length === 1 && a[0].type === "BlockStatement" ? [
                        " ",
                        o
                    ] : $e220d53e1e2a4e8f$var$E([
                        $e220d53e1e2a4e8f$var$C,
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
            return $e220d53e1e2a4e8f$var$pn(e, t, r);
        case "ClassMethod":
        case "ClassPrivateMethod":
        case "MethodDefinition":
            return $e220d53e1e2a4e8f$var$cn(e, t, r);
        case "ClassProperty":
        case "PropertyDefinition":
        case "ClassPrivateProperty":
        case "ClassAccessorProperty":
        case "AccessorProperty":
            return $e220d53e1e2a4e8f$var$ln(e, t, r);
        case "TemplateElement":
            return $e220d53e1e2a4e8f$var$xe(s.value.raw);
        case "TemplateLiteral":
            return $e220d53e1e2a4e8f$var$Qr(e, r, t);
        case "TaggedTemplateExpression":
            return $e220d53e1e2a4e8f$var$si(r);
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
                return a && i.push($e220d53e1e2a4e8f$var$E([
                    $e220d53e1e2a4e8f$var$C,
                    a
                ]), $e220d53e1e2a4e8f$var$C), i.push("}"), i;
            }
        case "InterpreterDirective":
        default:
            throw new $e220d53e1e2a4e8f$var$Oe(s, "ESTree");
    }
}
function $e220d53e1e2a4e8f$var$Si(e, t, r) {
    let { node: n } = e;
    if (n.type.startsWith("NG")) switch(n.type){
        case "NGRoot":
            return [
                r("node"),
                $e220d53e1e2a4e8f$var$d(n.node) ? " //" + $e220d53e1e2a4e8f$var$Kt(n.node)[0].value.trimEnd() : ""
            ];
        case "NGPipeExpression":
            return $e220d53e1e2a4e8f$var$Ir(e, t, r);
        case "NGChainedExpression":
            return $e220d53e1e2a4e8f$var$y($e220d53e1e2a4e8f$var$B([
                ";",
                $e220d53e1e2a4e8f$var$A
            ], e.map(()=>$e220d53e1e2a4e8f$var$hc(e) ? r() : [
                    "(",
                    r(),
                    ")"
                ], "expressions")));
        case "NGEmptyExpression":
            return "";
        case "NGMicrosyntax":
            return e.map(()=>[
                    e.isFirst ? "" : $e220d53e1e2a4e8f$var$hi(e) ? " " : [
                        ";",
                        $e220d53e1e2a4e8f$var$A
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
                let { index: s, parent: u } = e, i = $e220d53e1e2a4e8f$var$hi(e) || (s === 1 && (n.key.name === "then" || n.key.name === "else") || s === 2 && n.key.name === "else" && u.body[s - 1].type === "NGMicrosyntaxKeyedExpression" && u.body[s - 1].key.name === "then") && u.body[0].type === "NGMicrosyntaxExpression";
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
            throw new $e220d53e1e2a4e8f$var$Oe(n, "Angular");
    }
}
function $e220d53e1e2a4e8f$var$hi({ node: e, index: t, parent: r }) {
    return e.type === "NGMicrosyntaxKeyedExpression" && e.key.name === "of" && t === 1 && r.body[0].type === "NGMicrosyntaxLet" && r.body[0].value === null;
}
var $e220d53e1e2a4e8f$var$gc = $e220d53e1e2a4e8f$var$j([
    "CallExpression",
    "OptionalCallExpression",
    "AssignmentExpression"
]);
function $e220d53e1e2a4e8f$var$hc({ node: e }) {
    return $e220d53e1e2a4e8f$var$Xt(e, $e220d53e1e2a4e8f$var$gc);
}
function $e220d53e1e2a4e8f$var$yn(e, t, r) {
    let { node: n } = e, s = [
        $e220d53e1e2a4e8f$var$Z(e),
        "interface"
    ], u = [], i = [];
    n.type !== "InterfaceTypeAnnotation" && u.push(" ", r("id"), r("typeParameters"));
    let a = n.typeParameters && !$e220d53e1e2a4e8f$var$d(n.typeParameters, $e220d53e1e2a4e8f$var$x.Trailing | $e220d53e1e2a4e8f$var$x.Line);
    return $e220d53e1e2a4e8f$var$b(n.extends) && i.push(a ? $e220d53e1e2a4e8f$var$P(" ", $e220d53e1e2a4e8f$var$A, {
        groupId: $e220d53e1e2a4e8f$var$nr(n.typeParameters)
    }) : $e220d53e1e2a4e8f$var$A, "extends ", (n.extends.length === 1 ? $e220d53e1e2a4e8f$var$ru : $e220d53e1e2a4e8f$var$E)($e220d53e1e2a4e8f$var$B([
        ",",
        $e220d53e1e2a4e8f$var$A
    ], e.map(r, "extends")))), $e220d53e1e2a4e8f$var$d(n.id, $e220d53e1e2a4e8f$var$x.Trailing) || $e220d53e1e2a4e8f$var$b(n.extends) ? a ? s.push($e220d53e1e2a4e8f$var$y([
        ...u,
        $e220d53e1e2a4e8f$var$E(i)
    ])) : s.push($e220d53e1e2a4e8f$var$y($e220d53e1e2a4e8f$var$E([
        ...u,
        ...i
    ]))) : s.push(...u, ...i), s.push(" ", r("body")), $e220d53e1e2a4e8f$var$y(s);
}
function $e220d53e1e2a4e8f$var$Bi(e, t, r) {
    return $e220d53e1e2a4e8f$var$Et(e, r, t);
}
function $e220d53e1e2a4e8f$var$Dn(e, t) {
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
function $e220d53e1e2a4e8f$var$bi(e, t, r) {
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
        $e220d53e1e2a4e8f$var$Bi(e, t, r)
    ];
}
function $e220d53e1e2a4e8f$var$fn(e, t, r) {
    let { node: n } = e;
    return [
        $e220d53e1e2a4e8f$var$Z(e),
        n.const ? "const " : "",
        "enum ",
        t("id"),
        " ",
        n.type === "TSEnumDeclaration" ? $e220d53e1e2a4e8f$var$Bi(e, t, r) : t("body")
    ];
}
function $e220d53e1e2a4e8f$var$Pi(e, t, r) {
    let { node: n } = e;
    if ($e220d53e1e2a4e8f$var$Er(n)) return n.type.slice(0, -14).toLowerCase();
    let s = t.semi ? ";" : "";
    switch(n.type){
        case "DeclareClass":
            return $e220d53e1e2a4e8f$var$pn(e, t, r);
        case "DeclareFunction":
            return [
                $e220d53e1e2a4e8f$var$Z(e),
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
                $e220d53e1e2a4e8f$var$q(e, r),
                s
            ];
        case "DeclareVariable":
            return [
                $e220d53e1e2a4e8f$var$Z(e),
                n.kind ?? "var",
                " ",
                r("id"),
                s
            ];
        case "DeclareExportDeclaration":
        case "DeclareExportAllDeclaration":
            return $e220d53e1e2a4e8f$var$Kr(e, t, r);
        case "DeclareOpaqueType":
        case "OpaqueType":
            return $e220d53e1e2a4e8f$var$Uu(e, t, r);
        case "DeclareTypeAlias":
        case "TypeAlias":
            return $e220d53e1e2a4e8f$var$jr(e, t, r);
        case "IntersectionTypeAnnotation":
            return $e220d53e1e2a4e8f$var$Mr(e, t, r);
        case "UnionTypeAnnotation":
            return $e220d53e1e2a4e8f$var$Rr(e, t, r);
        case "ConditionalTypeAnnotation":
            return $e220d53e1e2a4e8f$var$Mt(e, t, r);
        case "InferTypeAnnotation":
            return $e220d53e1e2a4e8f$var$Ur(e, t, r);
        case "FunctionTypeAnnotation":
            return $e220d53e1e2a4e8f$var$Jr(e, t, r);
        case "TupleTypeAnnotation":
            return $e220d53e1e2a4e8f$var$vt(e, t, r);
        case "TupleTypeLabeledElement":
            return $e220d53e1e2a4e8f$var$qr(e, t, r);
        case "TupleTypeSpreadElement":
            return $e220d53e1e2a4e8f$var$Gr(e, t, r);
        case "GenericTypeAnnotation":
            return [
                r("id"),
                $e220d53e1e2a4e8f$var$gt(e, t, r, "typeParameters")
            ];
        case "IndexedAccessType":
        case "OptionalIndexedAccessType":
            return $e220d53e1e2a4e8f$var$Nr(e, t, r);
        case "TypeAnnotation":
            return $e220d53e1e2a4e8f$var$Wr(e, t, r);
        case "TypeParameter":
            return $e220d53e1e2a4e8f$var$tn(e, t, r);
        case "TypeofTypeAnnotation":
            return $e220d53e1e2a4e8f$var$Xr(e, r);
        case "ExistsTypeAnnotation":
            return "*";
        case "ArrayTypeAnnotation":
            return $e220d53e1e2a4e8f$var$Yr(r);
        case "DeclareEnum":
        case "EnumDeclaration":
            return $e220d53e1e2a4e8f$var$fn(e, r, t);
        case "EnumBooleanBody":
        case "EnumNumberBody":
        case "EnumStringBody":
        case "EnumSymbolBody":
            return $e220d53e1e2a4e8f$var$bi(e, r, t);
        case "EnumBooleanMember":
        case "EnumNumberMember":
        case "EnumStringMember":
        case "EnumDefaultedMember":
            return $e220d53e1e2a4e8f$var$Dn(e, r);
        case "FunctionTypeParam":
            {
                let u = n.name ? r("name") : e.parent.this === n ? "this" : "";
                return [
                    u,
                    $e220d53e1e2a4e8f$var$$(e),
                    u ? ": " : "",
                    r("typeAnnotation")
                ];
            }
        case "DeclareInterface":
        case "InterfaceDeclaration":
        case "InterfaceTypeAnnotation":
            return $e220d53e1e2a4e8f$var$yn(e, t, r);
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
                return $e220d53e1e2a4e8f$var$rn.ok(u === "plus" || u === "minus"), u === "plus" ? "+" : "-";
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
            return $e220d53e1e2a4e8f$var$ui(e, t, r);
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
                    $e220d53e1e2a4e8f$var$On(n) ? n.kind + " " : "",
                    n.variance ? r("variance") : "",
                    $e220d53e1e2a4e8f$var$ct(e, t, r),
                    $e220d53e1e2a4e8f$var$$(e),
                    $e220d53e1e2a4e8f$var$vn(n) ? "" : ": ",
                    r("value")
                ];
            }
        case "ObjectTypeAnnotation":
            return $e220d53e1e2a4e8f$var$Et(e, t, r);
        case "ObjectTypeInternalSlot":
            return [
                n.static ? "static " : "",
                "[[",
                r("id"),
                "]]",
                $e220d53e1e2a4e8f$var$$(e),
                n.method ? "" : ": ",
                r("value")
            ];
        case "ObjectTypeSpreadProperty":
            return $e220d53e1e2a4e8f$var$Hr(e, r);
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
            return $e220d53e1e2a4e8f$var$xe($e220d53e1e2a4e8f$var$Tt($e220d53e1e2a4e8f$var$oe(n), t));
        case "NumberLiteralTypeAnnotation":
            return $e220d53e1e2a4e8f$var$He(n.raw ?? n.extra.raw);
        case "BigIntLiteralTypeAnnotation":
            return $e220d53e1e2a4e8f$var$Or(n.raw ?? n.extra.raw);
        case "TypeCastExpression":
            return [
                "(",
                r("expression"),
                $e220d53e1e2a4e8f$var$q(e, r),
                ")"
            ];
        case "TypePredicate":
            return $e220d53e1e2a4e8f$var$$r(e, r);
        case "TypeParameterDeclaration":
        case "TypeParameterInstantiation":
            return $e220d53e1e2a4e8f$var$gt(e, t, r, "params");
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
    }
}
function $e220d53e1e2a4e8f$var$ki(e, t, r) {
    var i;
    let { node: n } = e;
    if (!n.type.startsWith("TS")) return;
    if ($e220d53e1e2a4e8f$var$Fr(n)) return n.type.slice(2, -7).toLowerCase();
    let s = t.semi ? ";" : "", u = [];
    switch(n.type){
        case "TSThisType":
            return "this";
        case "TSTypeAssertion":
            {
                let a = !($e220d53e1e2a4e8f$var$G(n.expression) || $e220d53e1e2a4e8f$var$ee(n.expression)), o = $e220d53e1e2a4e8f$var$y([
                    "<",
                    $e220d53e1e2a4e8f$var$E([
                        $e220d53e1e2a4e8f$var$F,
                        r("typeAnnotation")
                    ]),
                    $e220d53e1e2a4e8f$var$F,
                    ">"
                ]), p = [
                    $e220d53e1e2a4e8f$var$P("("),
                    $e220d53e1e2a4e8f$var$E([
                        $e220d53e1e2a4e8f$var$F,
                        r("expression")
                    ]),
                    $e220d53e1e2a4e8f$var$F,
                    $e220d53e1e2a4e8f$var$P(")")
                ];
                return a ? $e220d53e1e2a4e8f$var$qe([
                    [
                        o,
                        r("expression")
                    ],
                    [
                        o,
                        $e220d53e1e2a4e8f$var$y(p, {
                            shouldBreak: !0
                        })
                    ],
                    [
                        o,
                        r("expression")
                    ]
                ]) : $e220d53e1e2a4e8f$var$y([
                    o,
                    r("expression")
                ]);
            }
        case "TSDeclareFunction":
            return $e220d53e1e2a4e8f$var$sn(e, r, t);
        case "TSExportAssignment":
            return [
                "export = ",
                r("expression"),
                s
            ];
        case "TSModuleBlock":
            return $e220d53e1e2a4e8f$var$mn(e, t, r);
        case "TSInterfaceBody":
        case "TSTypeLiteral":
            return $e220d53e1e2a4e8f$var$Et(e, t, r);
        case "TSTypeAliasDeclaration":
            return $e220d53e1e2a4e8f$var$jr(e, t, r);
        case "TSQualifiedName":
            return [
                r("left"),
                ".",
                r("right")
            ];
        case "TSAbstractMethodDefinition":
        case "TSDeclareMethod":
            return $e220d53e1e2a4e8f$var$cn(e, t, r);
        case "TSAbstractAccessorProperty":
        case "TSAbstractPropertyDefinition":
            return $e220d53e1e2a4e8f$var$ln(e, t, r);
        case "TSInterfaceHeritage":
        case "TSClassImplements":
        case "TSExpressionWithTypeArguments":
        case "TSInstantiationExpression":
            return [
                r("expression"),
                r("typeParameters")
            ];
        case "TSTemplateLiteralType":
            return $e220d53e1e2a4e8f$var$Qr(e, r, t);
        case "TSNamedTupleMember":
            return $e220d53e1e2a4e8f$var$qr(e, t, r);
        case "TSRestType":
            return $e220d53e1e2a4e8f$var$Gr(e, t, r);
        case "TSOptionalType":
            return [
                r("typeAnnotation"),
                "?"
            ];
        case "TSInterfaceDeclaration":
            return $e220d53e1e2a4e8f$var$yn(e, t, r);
        case "TSTypeParameterDeclaration":
        case "TSTypeParameterInstantiation":
            return $e220d53e1e2a4e8f$var$gt(e, t, r, "params");
        case "TSTypeParameter":
            return $e220d53e1e2a4e8f$var$tn(e, t, r);
        case "TSAsExpression":
        case "TSSatisfiesExpression":
            {
                let a = n.type === "TSAsExpression" ? "as" : "satisfies";
                u.push(r("expression"), ` ${a} `, r("typeAnnotation"));
                let { parent: o } = e;
                return $e220d53e1e2a4e8f$var$k(o) && o.callee === n || $e220d53e1e2a4e8f$var$J(o) && o.object === n ? $e220d53e1e2a4e8f$var$y([
                    $e220d53e1e2a4e8f$var$E([
                        $e220d53e1e2a4e8f$var$F,
                        ...u
                    ]),
                    $e220d53e1e2a4e8f$var$F
                ]) : u;
            }
        case "TSArrayType":
            return $e220d53e1e2a4e8f$var$Yr(r);
        case "TSPropertySignature":
            return [
                n.readonly ? "readonly " : "",
                $e220d53e1e2a4e8f$var$ct(e, t, r),
                $e220d53e1e2a4e8f$var$$(e),
                $e220d53e1e2a4e8f$var$q(e, r)
            ];
        case "TSParameterProperty":
            return [
                $e220d53e1e2a4e8f$var$jt(n),
                n.static ? "static " : "",
                n.override ? "override " : "",
                n.readonly ? "readonly " : "",
                r("parameter")
            ];
        case "TSTypeQuery":
            return $e220d53e1e2a4e8f$var$Xr(e, r);
        case "TSIndexSignature":
            {
                let a = n.parameters.length > 1 ? $e220d53e1e2a4e8f$var$P($e220d53e1e2a4e8f$var$le(t) ? "," : "") : "", o = $e220d53e1e2a4e8f$var$y([
                    $e220d53e1e2a4e8f$var$E([
                        $e220d53e1e2a4e8f$var$F,
                        $e220d53e1e2a4e8f$var$B([
                            ", ",
                            $e220d53e1e2a4e8f$var$F
                        ], e.map(r, "parameters"))
                    ]),
                    a,
                    $e220d53e1e2a4e8f$var$F
                ]), p = e.parent.type === "ClassBody" && e.key === "body";
                return [
                    p && n.static ? "static " : "",
                    n.readonly ? "readonly " : "",
                    "[",
                    n.parameters ? o : "",
                    "]",
                    $e220d53e1e2a4e8f$var$q(e, r),
                    p ? s : ""
                ];
            }
        case "TSTypePredicate":
            return $e220d53e1e2a4e8f$var$$r(e, r);
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
                $e220d53e1e2a4e8f$var$gt(e, t, r, n.typeArguments ? "typeArguments" : "typeParameters")
            ];
        case "TSLiteralType":
            return r("literal");
        case "TSIndexedAccessType":
            return $e220d53e1e2a4e8f$var$Nr(e, t, r);
        case "TSTypeOperator":
            return [
                n.operator,
                " ",
                r("typeAnnotation")
            ];
        case "TSMappedType":
            return $e220d53e1e2a4e8f$var$ii(e, t, r);
        case "TSMethodSignature":
            {
                let a = n.kind && n.kind !== "method" ? `${n.kind} ` : "";
                u.push($e220d53e1e2a4e8f$var$jt(n), a, n.computed ? "[" : "", r("key"), n.computed ? "]" : "", $e220d53e1e2a4e8f$var$$(e));
                let o = $e220d53e1e2a4e8f$var$ot(e, r, t, !1, !0), p = n.returnType ? "returnType" : "typeAnnotation", m = n[p], D = m ? $e220d53e1e2a4e8f$var$q(e, r, p) : "", c = $e220d53e1e2a4e8f$var$xt(n, D);
                return u.push(c ? $e220d53e1e2a4e8f$var$y(o) : o), m && u.push($e220d53e1e2a4e8f$var$y(D)), $e220d53e1e2a4e8f$var$y(u);
            }
        case "TSNamespaceExportDeclaration":
            return [
                "export as namespace ",
                r("id"),
                t.semi ? ";" : ""
            ];
        case "TSEnumDeclaration":
            return $e220d53e1e2a4e8f$var$fn(e, r, t);
        case "TSEnumMember":
            return $e220d53e1e2a4e8f$var$Dn(e, r);
        case "TSImportEqualsDeclaration":
            return [
                n.isExport ? "export " : "",
                "import ",
                $e220d53e1e2a4e8f$var$os(n, !1),
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
                else if (u.push($e220d53e1e2a4e8f$var$Z(e)), !(n.kind === "global" || n.global)) {
                    let D = n.kind ?? ($e220d53e1e2a4e8f$var$Q(n.id) || /(?:^|\s)module(?:\s|$)/.test(t.originalText.slice($e220d53e1e2a4e8f$var$U(n), $e220d53e1e2a4e8f$var$U(n.id))) ? "module" : "namespace");
                    u.push(D, " ");
                }
                return u.push(r("id")), p ? u.push(r("body")) : n.body ? u.push(" ", $e220d53e1e2a4e8f$var$y(r("body"))) : u.push(s), u;
            }
        case "TSConditionalType":
            return $e220d53e1e2a4e8f$var$Mt(e, t, r);
        case "TSInferType":
            return $e220d53e1e2a4e8f$var$Ur(e, t, r);
        case "TSIntersectionType":
            return $e220d53e1e2a4e8f$var$Mr(e, t, r);
        case "TSUnionType":
            return $e220d53e1e2a4e8f$var$Rr(e, t, r);
        case "TSFunctionType":
        case "TSCallSignatureDeclaration":
        case "TSConstructorType":
        case "TSConstructSignatureDeclaration":
            return $e220d53e1e2a4e8f$var$Jr(e, t, r);
        case "TSTupleType":
            return $e220d53e1e2a4e8f$var$vt(e, t, r);
        case "TSTypeReference":
            return [
                r("typeName"),
                $e220d53e1e2a4e8f$var$gt(e, t, r, "typeParameters")
            ];
        case "TSTypeAnnotation":
            return $e220d53e1e2a4e8f$var$Wr(e, t, r);
        case "TSEmptyBodyFunctionExpression":
            return $e220d53e1e2a4e8f$var$un(e, t, r);
        case "TSJSDocAllType":
            return "*";
        case "TSJSDocUnknownType":
            return "?";
        case "TSJSDocNullableType":
            return $e220d53e1e2a4e8f$var$us(e, r, "?");
        case "TSJSDocNonNullableType":
            return $e220d53e1e2a4e8f$var$us(e, r, "!");
        case "TSParenthesizedType":
        default:
            throw new $e220d53e1e2a4e8f$var$Oe(n, "TypeScript");
    }
}
function $e220d53e1e2a4e8f$var$Sc(e, t, r, n) {
    if ($e220d53e1e2a4e8f$var$kr(e)) return $e220d53e1e2a4e8f$var$ks(e, t);
    for (let s of [
        $e220d53e1e2a4e8f$var$Si,
        $e220d53e1e2a4e8f$var$hu,
        $e220d53e1e2a4e8f$var$Pi,
        $e220d53e1e2a4e8f$var$ki,
        $e220d53e1e2a4e8f$var$gi
    ]){
        let u = s(e, t, r, n);
        if (u !== void 0) return u;
    }
}
var $e220d53e1e2a4e8f$var$Bc = $e220d53e1e2a4e8f$var$j([
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
function $e220d53e1e2a4e8f$var$bc(e, t, r, n) {
    var D;
    e.isRoot && ((D = t.__onHtmlBindingRoot) == null || D.call(t, e.node, t));
    let s = $e220d53e1e2a4e8f$var$Sc(e, t, r, n);
    if (!s) return "";
    let { node: u } = e;
    if ($e220d53e1e2a4e8f$var$Bc(u)) return s;
    let i = $e220d53e1e2a4e8f$var$b(u.decorators), a = $e220d53e1e2a4e8f$var$Wu(e, t, r), o = u.type === "ClassExpression";
    if (i && !o) return $e220d53e1e2a4e8f$var$Gt(s, (c)=>$e220d53e1e2a4e8f$var$y([
            a,
            c
        ]));
    let p = $e220d53e1e2a4e8f$var$we(e, t), m = $e220d53e1e2a4e8f$var$di(e, t);
    return !a && !p && !m ? s : $e220d53e1e2a4e8f$var$Gt(s, (c)=>[
            m ? ";" : "",
            p ? "(" : "",
            p && o && i ? [
                $e220d53e1e2a4e8f$var$E([
                    $e220d53e1e2a4e8f$var$A,
                    a,
                    c
                ]),
                $e220d53e1e2a4e8f$var$A
            ] : [
                a,
                c
            ],
            p ? ")" : ""
        ]);
}
var $e220d53e1e2a4e8f$var$Ii = $e220d53e1e2a4e8f$var$bc;
var $e220d53e1e2a4e8f$var$Li = [
    (e, t)=>e.type === "ObjectExpression" && t === "properties",
    (e, t)=>e.type === "CallExpression" && e.callee.type === "Identifier" && e.callee.name === "Component" && t === "arguments",
    (e, t)=>e.type === "Decorator" && t === "expression"
];
function $e220d53e1e2a4e8f$var$wi(e) {
    return e.match((t)=>t.type === "TemplateLiteral", (t, r)=>$e220d53e1e2a4e8f$var$G(t) && r === "elements", (t, r)=>$e220d53e1e2a4e8f$var$fe(t) && t.key.type === "Identifier" && t.key.name === "styles" && r === "value", ...$e220d53e1e2a4e8f$var$Li);
}
function $e220d53e1e2a4e8f$var$Oi(e) {
    return e.match((t)=>t.type === "TemplateLiteral", (t, r)=>$e220d53e1e2a4e8f$var$fe(t) && t.key.type === "Identifier" && t.key.name === "template" && r === "value", ...$e220d53e1e2a4e8f$var$Li);
}
function $e220d53e1e2a4e8f$var$En(e, t) {
    return $e220d53e1e2a4e8f$var$d(e, $e220d53e1e2a4e8f$var$x.Block | $e220d53e1e2a4e8f$var$x.Leading, ({ value: r })=>r === ` ${t} `);
}
async function $e220d53e1e2a4e8f$var$Pc(e, t, r) {
    let { node: n } = r, s = n.quasis.map((m)=>m.value.raw), u = 0, i = s.reduce((m, D, c)=>c === 0 ? D : m + "@prettier-placeholder-" + u++ + "-id" + D, ""), a = await e(i, {
        parser: "scss"
    }), o = $e220d53e1e2a4e8f$var$Rt(r, t), p = $e220d53e1e2a4e8f$var$kc(a, o);
    if (!p) throw new Error("Couldn't insert all the expressions");
    return [
        "`",
        $e220d53e1e2a4e8f$var$E([
            $e220d53e1e2a4e8f$var$C,
            p
        ]),
        $e220d53e1e2a4e8f$var$F,
        "`"
    ];
}
function $e220d53e1e2a4e8f$var$kc(e, t) {
    if (!$e220d53e1e2a4e8f$var$b(t)) return e;
    let r = 0, n = $e220d53e1e2a4e8f$var$ut($e220d53e1e2a4e8f$var$Bt(e), (s)=>typeof s != "string" || !s.includes("@prettier-placeholder") ? s : s.split(/@prettier-placeholder-(\d+)-id/).map((u, i)=>i % 2 === 0 ? $e220d53e1e2a4e8f$var$xe(u) : (r++, t[u])));
    return t.length === r ? n : null;
}
function $e220d53e1e2a4e8f$var$Ic({ node: e, parent: t, grandparent: r }) {
    return r && e.quasis && t.type === "JSXExpressionContainer" && r.type === "JSXElement" && r.openingElement.name.name === "style" && r.openingElement.attributes.some((n)=>n.name.name === "jsx") || (t == null ? void 0 : t.type) === "TaggedTemplateExpression" && t.tag.type === "Identifier" && t.tag.name === "css" || (t == null ? void 0 : t.type) === "TaggedTemplateExpression" && t.tag.type === "MemberExpression" && t.tag.object.name === "css" && (t.tag.property.name === "global" || t.tag.property.name === "resolve");
}
function $e220d53e1e2a4e8f$var$Fn(e) {
    return e.type === "Identifier" && e.name === "styled";
}
function $e220d53e1e2a4e8f$var$vi(e) {
    return /^[A-Z]/.test(e.object.name) && e.property.name === "extend";
}
function $e220d53e1e2a4e8f$var$Lc({ parent: e }) {
    if (!e || e.type !== "TaggedTemplateExpression") return !1;
    let t = e.tag.type === "ParenthesizedExpression" ? e.tag.expression : e.tag;
    switch(t.type){
        case "MemberExpression":
            return $e220d53e1e2a4e8f$var$Fn(t.object) || $e220d53e1e2a4e8f$var$vi(t);
        case "CallExpression":
            return $e220d53e1e2a4e8f$var$Fn(t.callee) || t.callee.type === "MemberExpression" && (t.callee.object.type === "MemberExpression" && ($e220d53e1e2a4e8f$var$Fn(t.callee.object.object) || $e220d53e1e2a4e8f$var$vi(t.callee.object)) || t.callee.object.type === "CallExpression" && $e220d53e1e2a4e8f$var$Fn(t.callee.object.callee));
        case "Identifier":
            return t.name === "css";
        default:
            return !1;
    }
}
function $e220d53e1e2a4e8f$var$wc({ parent: e, grandparent: t }) {
    return (t == null ? void 0 : t.type) === "JSXAttribute" && e.type === "JSXExpressionContainer" && t.name.type === "JSXIdentifier" && t.name.name === "css";
}
function $e220d53e1e2a4e8f$var$Oc(e) {
    if ($e220d53e1e2a4e8f$var$Ic(e) || $e220d53e1e2a4e8f$var$Lc(e) || $e220d53e1e2a4e8f$var$wc(e) || $e220d53e1e2a4e8f$var$wi(e)) return $e220d53e1e2a4e8f$var$Pc;
}
var $e220d53e1e2a4e8f$var$_i = $e220d53e1e2a4e8f$var$Oc;
async function $e220d53e1e2a4e8f$var$vc(e, t, r) {
    let { node: n } = r, s = n.quasis.length, u = $e220d53e1e2a4e8f$var$Rt(r, t), i = [];
    for(let a = 0; a < s; a++){
        let o = n.quasis[a], p = a === 0, m = a === s - 1, D = o.value.cooked, c = D.split(`
`), f = c.length, l = u[a], h = f > 2 && c[0].trim() === "" && c[1].trim() === "", g = f > 2 && c[f - 1].trim() === "" && c[f - 2].trim() === "", S = c.every((v)=>/^\s*(?:#[^\n\r]*)?$/.test(v));
        if (!m && /#[^\n\r]*$/.test(c[f - 1])) return null;
        let I = null;
        S ? I = $e220d53e1e2a4e8f$var$_c(c) : I = await e(D, {
            parser: "graphql"
        }), I ? (I = $e220d53e1e2a4e8f$var$Zr(I, !1), !p && h && i.push(""), i.push(I), !m && g && i.push("")) : !p && !m && h && i.push(""), l && i.push(l);
    }
    return [
        "`",
        $e220d53e1e2a4e8f$var$E([
            $e220d53e1e2a4e8f$var$C,
            $e220d53e1e2a4e8f$var$B($e220d53e1e2a4e8f$var$C, i)
        ]),
        $e220d53e1e2a4e8f$var$C,
        "`"
    ];
}
function $e220d53e1e2a4e8f$var$_c(e) {
    let t = [], r = !1, n = e.map((s)=>s.trim());
    for (let [s, u] of n.entries())u !== "" && (n[s - 1] === "" && r ? t.push([
        $e220d53e1e2a4e8f$var$C,
        u
    ]) : t.push(u), r = !0);
    return t.length === 0 ? null : $e220d53e1e2a4e8f$var$B($e220d53e1e2a4e8f$var$C, t);
}
function $e220d53e1e2a4e8f$var$jc({ node: e, parent: t }) {
    return $e220d53e1e2a4e8f$var$En(e, "GraphQL") || t && (t.type === "TaggedTemplateExpression" && (t.tag.type === "MemberExpression" && t.tag.object.name === "graphql" && t.tag.property.name === "experimental" || t.tag.type === "Identifier" && (t.tag.name === "gql" || t.tag.name === "graphql")) || t.type === "CallExpression" && t.callee.type === "Identifier" && t.callee.name === "graphql");
}
function $e220d53e1e2a4e8f$var$Mc(e) {
    if ($e220d53e1e2a4e8f$var$jc(e)) return $e220d53e1e2a4e8f$var$vc;
}
var $e220d53e1e2a4e8f$var$ji = $e220d53e1e2a4e8f$var$Mc;
var $e220d53e1e2a4e8f$var$xs = 0;
async function $e220d53e1e2a4e8f$var$Mi(e, t, r, n, s) {
    let { node: u } = n, i = $e220d53e1e2a4e8f$var$xs;
    $e220d53e1e2a4e8f$var$xs = $e220d53e1e2a4e8f$var$xs + 1 >>> 0;
    let a = (S)=>`PRETTIER_HTML_PLACEHOLDER_${S}_${i}_IN_JS`, o = u.quasis.map((S, I, v)=>I === v.length - 1 ? S.value.cooked : S.value.cooked + a(I)).join(""), p = $e220d53e1e2a4e8f$var$Rt(n, r), m = new RegExp(a("(\\d+)"), "g"), D = 0, c = await t(o, {
        parser: e,
        __onHtmlRoot (S) {
            D = S.children.length;
        }
    }), f = $e220d53e1e2a4e8f$var$ut(c, (S)=>{
        if (typeof S != "string") return S;
        let I = [], v = S.split(m);
        for(let _ = 0; _ < v.length; _++){
            let R = v[_];
            if (_ % 2 === 0) {
                R && (R = $e220d53e1e2a4e8f$var$ms(R), s.__embeddedInHtml && (R = $e220d53e1e2a4e8f$var$H(!1, R, /<\/(?=script\b)/gi, "<\\/")), I.push(R));
                continue;
            }
            let T = Number(R);
            I.push(p[T]);
        }
        return I;
    }), l = /^\s/.test(o) ? " " : "", h = /\s$/.test(o) ? " " : "", g = s.htmlWhitespaceSensitivity === "ignore" ? $e220d53e1e2a4e8f$var$C : l && h ? $e220d53e1e2a4e8f$var$A : null;
    return g ? $e220d53e1e2a4e8f$var$y([
        "`",
        $e220d53e1e2a4e8f$var$E([
            g,
            $e220d53e1e2a4e8f$var$y(f)
        ]),
        g,
        "`"
    ]) : $e220d53e1e2a4e8f$var$et({
        hug: !1
    }, $e220d53e1e2a4e8f$var$y([
        "`",
        l,
        D > 1 ? $e220d53e1e2a4e8f$var$E($e220d53e1e2a4e8f$var$y(f)) : $e220d53e1e2a4e8f$var$y(f),
        h,
        "`"
    ]));
}
function $e220d53e1e2a4e8f$var$Rc(e) {
    return $e220d53e1e2a4e8f$var$En(e.node, "HTML") || e.match((t)=>t.type === "TemplateLiteral", (t, r)=>t.type === "TaggedTemplateExpression" && t.tag.type === "Identifier" && t.tag.name === "html" && r === "quasi");
}
var $e220d53e1e2a4e8f$var$Jc = $e220d53e1e2a4e8f$var$Mi.bind(void 0, "html"), $e220d53e1e2a4e8f$var$Nc = $e220d53e1e2a4e8f$var$Mi.bind(void 0, "angular");
function $e220d53e1e2a4e8f$var$Uc(e) {
    if ($e220d53e1e2a4e8f$var$Rc(e)) return $e220d53e1e2a4e8f$var$Jc;
    if ($e220d53e1e2a4e8f$var$Oi(e)) return $e220d53e1e2a4e8f$var$Nc;
}
var $e220d53e1e2a4e8f$var$Ri = $e220d53e1e2a4e8f$var$Uc;
async function $e220d53e1e2a4e8f$var$Gc(e, t, r) {
    let { node: n } = r, s = $e220d53e1e2a4e8f$var$H(!1, n.quasis[0].value.raw, /((?:\\\\)*)\\`/g, (o, p)=>"\\".repeat(p.length / 2) + "`"), u = $e220d53e1e2a4e8f$var$qc(s), i = u !== "";
    i && (s = $e220d53e1e2a4e8f$var$H(!1, s, new RegExp(`^${u}`, "gm"), ""));
    let a = $e220d53e1e2a4e8f$var$Zr(await e(s, {
        parser: "markdown",
        __inJsTemplate: !0
    }), !0);
    return [
        "`",
        i ? $e220d53e1e2a4e8f$var$E([
            $e220d53e1e2a4e8f$var$F,
            a
        ]) : [
            $e220d53e1e2a4e8f$var$lr,
            $e220d53e1e2a4e8f$var$ws(a)
        ],
        $e220d53e1e2a4e8f$var$F,
        "`"
    ];
}
function $e220d53e1e2a4e8f$var$qc(e) {
    let t = e.match(/^([^\S\n]*)\S/m);
    return t === null ? "" : t[1];
}
function $e220d53e1e2a4e8f$var$Wc(e) {
    if ($e220d53e1e2a4e8f$var$Yc(e)) return $e220d53e1e2a4e8f$var$Gc;
}
function $e220d53e1e2a4e8f$var$Yc({ node: e, parent: t }) {
    return (t == null ? void 0 : t.type) === "TaggedTemplateExpression" && e.quasis.length === 1 && t.tag.type === "Identifier" && (t.tag.name === "md" || t.tag.name === "markdown");
}
var $e220d53e1e2a4e8f$var$Ji = $e220d53e1e2a4e8f$var$Wc;
function $e220d53e1e2a4e8f$var$Xc(e) {
    let { node: t } = e;
    if (t.type !== "TemplateLiteral" || $e220d53e1e2a4e8f$var$$c(t)) return;
    let r;
    for (let n of [
        $e220d53e1e2a4e8f$var$_i,
        $e220d53e1e2a4e8f$var$ji,
        $e220d53e1e2a4e8f$var$Ri,
        $e220d53e1e2a4e8f$var$Ji
    ])if (r = n(e), !!r) return t.quasis.length === 1 && t.quasis[0].value.raw.trim() === "" ? "``" : async (...s)=>{
        let u = await r(...s);
        return u && $e220d53e1e2a4e8f$var$et({
            embed: !0,
            ...u.label
        }, u);
    };
}
function $e220d53e1e2a4e8f$var$$c({ quasis: e }) {
    return e.some(({ value: { cooked: t } })=>t === null);
}
var $e220d53e1e2a4e8f$var$Ni = $e220d53e1e2a4e8f$var$Xc;
var $e220d53e1e2a4e8f$var$Vc = new Set([
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
]), $e220d53e1e2a4e8f$var$Jt = (e)=>{
    for (let t of e.quasis)delete t.value;
};
function $e220d53e1e2a4e8f$var$Ui(e, t, r) {
    var s, u;
    if (e.type === "Program" && delete t.sourceType, (e.type === "BigIntLiteral" || e.type === "BigIntLiteralTypeAnnotation") && t.value && (t.value = t.value.toLowerCase()), (e.type === "BigIntLiteral" || e.type === "Literal") && t.bigint && (t.bigint = t.bigint.toLowerCase()), e.type === "DecimalLiteral" && (t.value = Number(t.value)), e.type === "Literal" && t.decimal && (t.decimal = Number(t.decimal)), e.type === "EmptyStatement" || e.type === "JSXText" || e.type === "JSXExpressionContainer" && (e.expression.type === "Literal" || e.expression.type === "StringLiteral") && e.expression.value === " ") return null;
    if ((e.type === "Property" || e.type === "ObjectProperty" || e.type === "MethodDefinition" || e.type === "ClassProperty" || e.type === "ClassMethod" || e.type === "PropertyDefinition" || e.type === "TSDeclareMethod" || e.type === "TSPropertySignature" || e.type === "ObjectTypeProperty") && typeof e.key == "object" && e.key && (e.key.type === "Literal" || e.key.type === "NumericLiteral" || e.key.type === "StringLiteral" || e.key.type === "Identifier") && delete t.key, e.type === "JSXElement" && e.openingElement.name.name === "style" && e.openingElement.attributes.some((i)=>i.type === "JSXAttribute" && i.name.name === "jsx")) for (let { type: i, expression: a } of t.children)i === "JSXExpressionContainer" && a.type === "TemplateLiteral" && $e220d53e1e2a4e8f$var$Jt(a);
    e.type === "JSXAttribute" && e.name.name === "css" && e.value.type === "JSXExpressionContainer" && e.value.expression.type === "TemplateLiteral" && $e220d53e1e2a4e8f$var$Jt(t.value.expression), e.type === "JSXAttribute" && ((s = e.value) == null ? void 0 : s.type) === "Literal" && /["']|&quot;|&apos;/.test(e.value.value) && (t.value.value = $e220d53e1e2a4e8f$var$H(!1, t.value.value, /["']|&quot;|&apos;/g, '"'));
    let n = e.expression || e.callee;
    if (e.type === "Decorator" && n.type === "CallExpression" && n.callee.name === "Component" && n.arguments.length === 1) {
        let i = e.expression.arguments[0].properties;
        for (let [a, o] of t.expression.arguments[0].properties.entries())switch(i[a].key.name){
            case "styles":
                $e220d53e1e2a4e8f$var$G(o.value) && $e220d53e1e2a4e8f$var$Jt(o.value.elements[0]);
                break;
            case "template":
                o.value.type === "TemplateLiteral" && $e220d53e1e2a4e8f$var$Jt(o.value);
                break;
        }
    }
    if (e.type === "TaggedTemplateExpression" && (e.tag.type === "MemberExpression" || e.tag.type === "Identifier" && (e.tag.name === "gql" || e.tag.name === "graphql" || e.tag.name === "css" || e.tag.name === "md" || e.tag.name === "markdown" || e.tag.name === "html") || e.tag.type === "CallExpression") && $e220d53e1e2a4e8f$var$Jt(t.quasi), e.type === "TemplateLiteral" && ((u = e.leadingComments) != null && u.some((a)=>$e220d53e1e2a4e8f$var$ae(a) && [
            "GraphQL",
            "HTML"
        ].some((o)=>a.value === ` ${o} `)) || r.type === "CallExpression" && r.callee.name === "graphql" || !e.leadingComments) && $e220d53e1e2a4e8f$var$Jt(t), (e.type === "TSIntersectionType" || e.type === "TSUnionType") && e.types.length === 1) return t.types[0];
    e.type === "ChainExpression" && e.expression.type === "TSNonNullExpression" && ([t.type, t.expression.type] = [
        t.expression.type,
        t.type
    ]);
}
$e220d53e1e2a4e8f$var$Ui.ignoredProperties = $e220d53e1e2a4e8f$var$Vc;
var $e220d53e1e2a4e8f$var$Gi = $e220d53e1e2a4e8f$var$Ui;
var $e220d53e1e2a4e8f$var$Ft = $e220d53e1e2a4e8f$var$ma($e220d53e1e2a4e8f$var$Hi(), 1);
function $e220d53e1e2a4e8f$var$sl(e) {
    if (!e.startsWith("#!")) return "";
    let t = e.indexOf(`
`);
    return t === -1 ? e : e.slice(0, t);
}
var $e220d53e1e2a4e8f$var$Ki = $e220d53e1e2a4e8f$var$sl;
function $e220d53e1e2a4e8f$var$ul(e) {
    let t = $e220d53e1e2a4e8f$var$Ki(e);
    t && (e = e.slice(t.length + 1));
    let r = (0, $e220d53e1e2a4e8f$var$Ft.extract)(e), { pragmas: n, comments: s } = (0, $e220d53e1e2a4e8f$var$Ft.parseWithComments)(r);
    return {
        shebang: t,
        text: e,
        pragmas: n,
        comments: s
    };
}
function $e220d53e1e2a4e8f$var$zi(e) {
    let { shebang: t, text: r, pragmas: n, comments: s } = $e220d53e1e2a4e8f$var$ul(e), u = (0, $e220d53e1e2a4e8f$var$Ft.strip)(r), i = (0, $e220d53e1e2a4e8f$var$Ft.print)({
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
var $e220d53e1e2a4e8f$var$il = {
    avoidAstMutation: !0
};
var $e220d53e1e2a4e8f$var$Qi = [
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
var $e220d53e1e2a4e8f$var$hs = {};
$e220d53e1e2a4e8f$var$or($e220d53e1e2a4e8f$var$hs, {
    getVisitorKeys: ()=>$e220d53e1e2a4e8f$var$ea,
    massageAstNode: ()=>$e220d53e1e2a4e8f$var$ra,
    print: ()=>$e220d53e1e2a4e8f$var$pl
});
var $e220d53e1e2a4e8f$var$al = {
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
}, $e220d53e1e2a4e8f$var$Zi = $e220d53e1e2a4e8f$var$al;
var $e220d53e1e2a4e8f$var$ol = $e220d53e1e2a4e8f$var$Dr($e220d53e1e2a4e8f$var$Zi), $e220d53e1e2a4e8f$var$ea = $e220d53e1e2a4e8f$var$ol;
function $e220d53e1e2a4e8f$var$pl(e, t, r) {
    let { node: n } = e;
    switch(n.type){
        case "JsonRoot":
            return [
                r("node"),
                $e220d53e1e2a4e8f$var$C
            ];
        case "ArrayExpression":
            {
                if (n.elements.length === 0) return "[]";
                let s = e.map(()=>e.node === null ? "null" : r(), "elements");
                return [
                    "[",
                    $e220d53e1e2a4e8f$var$E([
                        $e220d53e1e2a4e8f$var$C,
                        $e220d53e1e2a4e8f$var$B([
                            ",",
                            $e220d53e1e2a4e8f$var$C
                        ], s)
                    ]),
                    $e220d53e1e2a4e8f$var$C,
                    "]"
                ];
            }
        case "ObjectExpression":
            return n.properties.length === 0 ? "{}" : [
                "{",
                $e220d53e1e2a4e8f$var$E([
                    $e220d53e1e2a4e8f$var$C,
                    $e220d53e1e2a4e8f$var$B([
                        ",",
                        $e220d53e1e2a4e8f$var$C
                    ], e.map(r, "properties"))
                ]),
                $e220d53e1e2a4e8f$var$C,
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
            return $e220d53e1e2a4e8f$var$ta(e) ? JSON.stringify(String(n.value)) : JSON.stringify(n.value);
        case "Identifier":
            return $e220d53e1e2a4e8f$var$ta(e) ? JSON.stringify(n.name) : n.name;
        case "TemplateLiteral":
            return r([
                "quasis",
                0
            ]);
        case "TemplateElement":
            return JSON.stringify(n.value.cooked);
        default:
            throw new $e220d53e1e2a4e8f$var$Oe(n, "JSON");
    }
}
function $e220d53e1e2a4e8f$var$ta(e) {
    return e.key === "key" && e.parent.type === "ObjectProperty";
}
var $e220d53e1e2a4e8f$var$cl = new Set([
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
function $e220d53e1e2a4e8f$var$ra(e, t) {
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
$e220d53e1e2a4e8f$var$ra.ignoredProperties = $e220d53e1e2a4e8f$var$cl;
var $e220d53e1e2a4e8f$var$na = [
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
var $e220d53e1e2a4e8f$var$ir = {
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
var $e220d53e1e2a4e8f$var$Nt = "JavaScript", $e220d53e1e2a4e8f$var$ll = {
    arrowParens: {
        category: $e220d53e1e2a4e8f$var$Nt,
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
    bracketSameLine: $e220d53e1e2a4e8f$var$ir.bracketSameLine,
    bracketSpacing: $e220d53e1e2a4e8f$var$ir.bracketSpacing,
    jsxBracketSameLine: {
        category: $e220d53e1e2a4e8f$var$Nt,
        type: "boolean",
        description: "Put > on the last line instead of at a new line.",
        deprecated: "2.4.0"
    },
    semi: {
        category: $e220d53e1e2a4e8f$var$Nt,
        type: "boolean",
        default: !0,
        description: "Print semicolons.",
        oppositeDescription: "Do not print semicolons, except at the beginning of lines which may need them."
    },
    singleQuote: $e220d53e1e2a4e8f$var$ir.singleQuote,
    jsxSingleQuote: {
        category: $e220d53e1e2a4e8f$var$Nt,
        type: "boolean",
        default: !1,
        description: "Use single quotes in JSX."
    },
    quoteProps: {
        category: $e220d53e1e2a4e8f$var$Nt,
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
        category: $e220d53e1e2a4e8f$var$Nt,
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
    singleAttributePerLine: $e220d53e1e2a4e8f$var$ir.singleAttributePerLine
}, $e220d53e1e2a4e8f$export$41c562ebe57d11e2 = $e220d53e1e2a4e8f$var$ll;
var $e220d53e1e2a4e8f$export$263afe08c0871a1 = {
    estree: $e220d53e1e2a4e8f$var$gs,
    "estree-json": $e220d53e1e2a4e8f$var$hs
}, $e220d53e1e2a4e8f$export$d0d68bb9ed2c643d = [
    ...$e220d53e1e2a4e8f$var$Qi,
    ...$e220d53e1e2a4e8f$var$na
];
var $e220d53e1e2a4e8f$export$2e2bcd8739ae039 = $e220d53e1e2a4e8f$var$Ss;

});

})();
//# sourceMappingURL=estree.7a133e28.js.map
