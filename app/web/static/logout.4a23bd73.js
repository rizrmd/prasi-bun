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
parcelRegister("kRpY3", function(module, exports) {

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $fb00c4f37fe0b0fe$export$2e2bcd8739ae039);

var $lAN3N = parcelRequire("lAN3N");

var $4WfNn = parcelRequire("4WfNn");

var $1CiVi = parcelRequire("1CiVi");
var $fb00c4f37fe0b0fe$export$2e2bcd8739ae039 = (0, $4WfNn.page)({
    url: "/logout",
    component: ({})=>{
        api.logout().then(()=>{
            location.href = "/login";
        });
        return /*#__PURE__*/ (0, $lAN3N.jsx)((0, $1CiVi.Loading), {});
    }
});

});

})();
//# sourceMappingURL=logout.4a23bd73.js.map
