!function(e,o,r,n,t){var i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},l="function"==typeof i[n]&&i[n],u=l.cache||{},f="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function a(o,r){if(!u[o]){if(!e[o]){var t="function"==typeof i[n]&&i[n];if(!r&&t)return t(o,!0);if(l)return l(o,!0);if(f&&"string"==typeof o)return f(o);var s=Error("Cannot find module '"+o+"'");throw s.code="MODULE_NOT_FOUND",s}c.resolve=function(r){var n=e[o][1][r];return null!=n?n:r},c.cache={};var d=u[o]=new a.Module(o);e[o][0].call(d.exports,c,d,d.exports,this)}return u[o].exports;function c(e){var o=c.resolve(e);return!1===o?{}:a(o)}}a.isParcelRequire=!0,a.Module=function(e){this.id=e,this.bundle=a,this.exports={}},a.modules=e,a.cache=u,a.parent=l,a.register=function(o,r){e[o]=[function(e,o){o.exports=r},{}]},Object.defineProperty(a,"root",{get:function(){return i[n]}}),i[n]=a;for(var s=0;s<o.length;s++)a(o[s])}({"1NKJn":[function(e,o,r){e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(r);var n=e("react/jsx-runtime"),t=e("web-utils"),i=e("../../../utils/ui/loading");r.default=(0,t.page)({url:"/logout",component:({})=>(localStorage.clear(),_api.logout().then(()=>{location.href="/login"}),(0,n.jsx)(i.Loading,{}))})},{"react/jsx-runtime":"QoA3A","web-utils":"1hi6H","../../../utils/ui/loading":"loFlS","@parcel/transformer-js/src/esmodule-helpers.js":"41Cak"}]},[],0,"parcelRequire2d1f");
//# sourceMappingURL=logout.1ecca93f.js.map