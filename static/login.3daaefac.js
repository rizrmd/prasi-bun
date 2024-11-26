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
})({"bmkTk":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _jsxDevRuntime = require("react/jsx-dev-runtime");
var _webUtils = require("web-utils");
var _loading = require("../../../utils/ui/loading");
var _formStyle = require("../../../utils/ui/form.style");
var _input = require("../../../utils/ui/form/input");
exports.default = (0, _webUtils.page)({
    url: "/login",
    component: ({})=>{
        const form = (0, _webUtils.useLocal)({
            username: "",
            password: "",
            submitting: false,
            init: false
        }, async ()=>{
            const s = await _api.session();
            if (s && s.id) {
                const rto = window.redirectTo;
                if (rto) navigate(rto);
                else {
                    localStorage.setItem("prasi-session", JSON.stringify(s));
                    navigate("/ed/");
                }
            } else {
                form.init = true;
                form.render();
            }
        });
        if (!form.init) return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _loading.Loading), {}, void 0, false, {
            fileName: "src/base/page/auth/login.tsx",
            lineNumber: 34,
            columnNumber: 28
        }, undefined);
        return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
            className: "flex flex-1 flex-col items-center justify-center",
            children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("form", {
                onSubmit: async (e)=>{
                    e.preventDefault();
                    form.submitting = true;
                    form.render();
                    const s = await _api.login(form.username, form.password);
                    if (s.status === "failed") {
                        form.submitting = false;
                        form.render();
                    } else {
                        let rto = window.redirectTo;
                        if (rto) {
                            if (location.href.includes("localhost") && rto.includes("/editor")) rto = rto.replace("/editor", "/ed");
                            navigate(rto);
                        } else if (location.href.includes("localhost")) navigate("/ed");
                        else navigate("/ed");
                    }
                },
                className: cx("border-[3px] border-black", (0, _formStyle.formStyle)),
                children: [
                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                        className: "title",
                        children: "Login"
                    }, void 0, false, {
                        fileName: "src/base/page/auth/login.tsx",
                        lineNumber: 69,
                        columnNumber: 11
                    }, undefined),
                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                        className: "mt-3",
                        children: [
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                children: "Username"
                            }, void 0, false, {
                                fileName: "src/base/page/auth/login.tsx",
                                lineNumber: 71,
                                columnNumber: 13
                            }, undefined),
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _input.Input), {
                                form: form,
                                name: "username"
                            }, void 0, false, {
                                fileName: "src/base/page/auth/login.tsx",
                                lineNumber: 72,
                                columnNumber: 13
                            }, undefined)
                        ]
                    }, void 0, true, {
                        fileName: "src/base/page/auth/login.tsx",
                        lineNumber: 70,
                        columnNumber: 11
                    }, undefined),
                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("label", {
                        children: [
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("span", {
                                children: "Password"
                            }, void 0, false, {
                                fileName: "src/base/page/auth/login.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, undefined),
                            /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _input.Input), {
                                form: form,
                                name: "password",
                                type: "password"
                            }, void 0, false, {
                                fileName: "src/base/page/auth/login.tsx",
                                lineNumber: 76,
                                columnNumber: 13
                            }, undefined)
                        ]
                    }, void 0, true, {
                        fileName: "src/base/page/auth/login.tsx",
                        lineNumber: 74,
                        columnNumber: 11
                    }, undefined),
                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("button", {
                        type: "submit",
                        disabled: form.submitting,
                        children: form.submitting ? "Loading..." : "Submit"
                    }, void 0, false, {
                        fileName: "src/base/page/auth/login.tsx",
                        lineNumber: 78,
                        columnNumber: 11
                    }, undefined),
                    /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("div", {
                        className: "pt-2",
                        children: /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("a", {
                            href: "/register",
                            className: "cursor-pointer underline",
                            children: "Register"
                        }, void 0, false, {
                            fileName: "src/base/page/auth/login.tsx",
                            lineNumber: 83,
                            columnNumber: 13
                        }, undefined)
                    }, void 0, false, {
                        fileName: "src/base/page/auth/login.tsx",
                        lineNumber: 82,
                        columnNumber: 11
                    }, undefined)
                ]
            }, void 0, true, {
                fileName: "src/base/page/auth/login.tsx",
                lineNumber: 38,
                columnNumber: 9
            }, undefined)
        }, void 0, false, {
            fileName: "src/base/page/auth/login.tsx",
            lineNumber: 37,
            columnNumber: 7
        }, undefined);
    }
});

},{"react/jsx-dev-runtime":"j0wtd","web-utils":"aOKw0","../../../utils/ui/loading":"jJynm","../../../utils/ui/form.style":"6tdFV","../../../utils/ui/form/input":"dXO3I","@parcel/transformer-js/src/esmodule-helpers.js":"lwmMb"}],"6tdFV":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "formStyle", ()=>formStyle);
const formStyle = css`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  .title {
    font-size: 18px;
    display: flex;
    flex-direction: column;
  }

  label {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    margin-bottom: 10px;

    > span {
      font-size: 14px;
      margin-bottom: 2px;
    }
  }
  
  input,
  select {
    border: 3px solid black;
    padding: 3px;
    width: 300px;
    font-size: 15px;

    &:disabled {
      color: #999;
    }
  }

  button {
    color: white;
    padding: 5px;
  }
  button[type="submit"] {
    background: black;

    &:disabled {
      background: #999;
    }
  }
`;

},{"@parcel/transformer-js/src/esmodule-helpers.js":"lwmMb"}],"dXO3I":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Input", ()=>Input);
var _jsxDevRuntime = require("react/jsx-dev-runtime");
const Input = (arg)=>{
    const prop = {
        ...arg
    };
    const { form, name } = arg;
    delete prop.form;
    delete prop.name;
    let onChange = null;
    if (prop.onChange) {
        onChange = prop.onChange;
        delete prop.onChange;
    }
    let value = form[name];
    if (value instanceof URL) value = value.toString();
    return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)("input", {
        value: value || "",
        spellCheck: false,
        onInput: (e)=>{
            form[name] = e.currentTarget.value;
            if (onChange) {
                const result = onChange(e.currentTarget.value);
                if (typeof result !== "undefined") form[name] = result;
            }
            form.render();
        },
        ...prop
    }, void 0, false, {
        fileName: "src/utils/ui/form/input.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, undefined);
};

},{"react/jsx-dev-runtime":"j0wtd","@parcel/transformer-js/src/esmodule-helpers.js":"lwmMb"}]},[], null, "parcelRequire2d1f")

//# sourceMappingURL=login.3daaefac.js.map
