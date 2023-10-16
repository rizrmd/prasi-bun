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
parcelRegister("yJaD0", function(module, exports) {

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $01c3f730b1f50958$export$2e2bcd8739ae039);

var $lAN3N = parcelRequire("lAN3N");

var $63SH6 = parcelRequire("63SH6");

var $4WfNn = parcelRequire("4WfNn");

var $1CiVi = parcelRequire("1CiVi");
var $01c3f730b1f50958$export$2e2bcd8739ae039 = (0, $4WfNn.page)({
    url: "**",
    component: ({})=>{
        (0, $63SH6.useEffect)(()=>{
            if (localStorage.getItem("prasi-session")) navigate("/editor/");
            else navigate("/login");
        }, []);
        return /*#__PURE__*/ (0, $lAN3N.jsx)((0, $1CiVi.Loading), {});
    }
});

});

})();
//# sourceMappingURL=all.2a032bf1.js.map
