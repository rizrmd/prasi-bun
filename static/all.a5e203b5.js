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
})({"400ql":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
var _jsxDevRuntime = require("react/jsx-dev-runtime");
var _react = require("react");
var _webUtils = require("web-utils");
var _edGlobal = require("../../nova/ed/logic/ed-global");
var _isLocalhost = require("../../utils/ui/is-localhost");
var _loading = require("../../utils/ui/loading");
exports.default = (0, _webUtils.page)({
    url: "**",
    component: ({})=>{
        const p = (0, _webUtils.useGlobal)((0, _edGlobal.EDGlobal), "EDITOR");
        (0, _react.useEffect)(()=>{
            if (localStorage.getItem("prasi-session")) {
                if (location.pathname === "/ed" || location.pathname.startsWith("/ed/")) {
                    if (params.site_id) navigate(`/ed/${params.site_id}/_`);
                    else navigate("/ed/_/_");
                } else if (location.pathname.startsWith("/editor")) {
                    const arr = location.pathname.split("/");
                    if (arr.length <= 2) navigate("/ed/_/_");
                    else if (arr.length === 3) navigate(location.pathname + "/");
                } else if ((0, _isLocalhost.isLocalhost)()) navigate("/ed");
                else navigate("/ed/_/_");
            } else navigate("/login");
        });
        return /*#__PURE__*/ (0, _jsxDevRuntime.jsxDEV)((0, _loading.Loading), {}, void 0, false, {
            fileName: "src/base/page/all.tsx",
            lineNumber: 41,
            columnNumber: 12
        }, undefined);
    }
});

},{"react/jsx-dev-runtime":"j0wtd","react":"ftK02","web-utils":"aOKw0","../../nova/ed/logic/ed-global":"5VTke","../../utils/ui/is-localhost":"4bQjJ","../../utils/ui/loading":"jJynm","@parcel/transformer-js/src/esmodule-helpers.js":"lwmMb"}],"5VTke":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "EmptySite", ()=>EmptySite);
parcelHelpers.export(exports, "EmptyPage", ()=>EmptyPage);
parcelHelpers.export(exports, "active", ()=>active);
parcelHelpers.export(exports, "EDGlobal", ()=>EDGlobal);
var _webUtils = require("web-utils");
var _radix3 = require("radix3");
const EmptySite = {
    id: "",
    name: "",
    domain: "",
    config: {
        api_url: ""
    },
    deploy_name: "",
    js: "",
    js_compiled: "",
    responsive: "",
    layout: {
        id: "--",
        meta: undefined,
        entry: []
    }
};
const EmptyPage = {
    id: "",
    name: "",
    url: "",
    snapshot: null,
    comps: {}
};
const EmptyComp = {
    id: "",
    snapshot: null
};
const target = {
    active_id: false,
    comp_id: false,
    instance_comp_id: false,
    instance_item_id: false
};
const active = {
    should_render_main: true,
    hover: {
        id: "",
        tree: false
    },
    scope: {},
    script_nav: {
        list: [],
        idx: -1
    },
    text: {
        id: "",
        content: "",
        timeout: null,
        el: null
    },
    get item_id () {
        if (target.active_id === false) target.active_id = localStorage.getItem("prasi-active-id") || "";
        return target.active_id || "";
    },
    set item_id (val){
        localStorage.setItem("prasi-active-id", val || "");
        target.active_id = val || "";
    },
    get comp_id () {
        if (target.comp_id === false) target.comp_id = localStorage.getItem("prasi-comp-id") || "";
        return target.comp_id || "";
    },
    set comp_id (val){
        localStorage.setItem("prasi-comp-id", val || "");
        target.comp_id = val || "";
    },
    instance: {
        get comp_id () {
            if (target.instance_comp_id === false) target.instance_comp_id = localStorage.getItem("prasi-instance-comp-id") || "";
            return target.instance_comp_id || "";
        },
        set comp_id (val){
            localStorage.setItem("prasi-instance-comp-id", val || "");
            target.instance_comp_id = val || "";
        },
        get item_id () {
            if (target.instance_item_id === false) target.instance_item_id = localStorage.getItem("prasi-instance-item-id") || "";
            return target.instance_item_id || "";
        },
        set item_id (val){
            localStorage.setItem("prasi-instance-item-id", val || "");
            target.instance_item_id = val || "";
        }
    }
};
const EDGlobal = {
    mode: "",
    user: {
        id: "",
        username: "",
        client_id: ""
    },
    clients: {},
    status: "init",
    preview: {
        url_cache: new Set(),
        route_cache: (0, _radix3.createRouter)(),
        page_cache: {},
        meta_cache: {}
    },
    sync: undefined,
    site: (0, _webUtils.deepClone)(EmptySite),
    site_tstamp: Date.now(),
    site_exports: {},
    site_dts: "",
    site_dts_entry: {},
    prisma_ext: "",
    script: {
        site_types: {},
        loaded: false,
        do_edit: async (newval, all)=>{},
        db: null,
        api: null,
        init_local_effect: {}
    },
    page: {
        history: {
            id: "",
            show: false
        },
        root_id: "root",
        cur: EmptyPage,
        doc: null,
        list: {},
        building: false,
        meta: {},
        entry: [],
        tree: [],
        render: ()=>{}
    },
    comp: {
        doc: null,
        item: null,
        loaded: {},
        list: {},
        group: {}
    },
    code: {},
    global_prop: [],
    ui: {
        deploy: {
            target: []
        },
        build: {
            status: "ready"
        },
        monaco: null,
        comp_editable: localStorage.getItem("prasi-comp-editable") === "yes",
        zoom: localStorage.zoom || "100%",
        side: {
            prop: true
        },
        layout: {
            left: parseInt(localStorage.getItem("prasi-layout-left") || "250"),
            right: parseInt(localStorage.getItem("prasi-layout-right") || "250")
        },
        prevent_indent_hook: false,
        syncing: false,
        tree: {
            item_loading: [],
            search: "",
            search_ref: null,
            search_mode: {
                Name: true,
                JS: false,
                HTML: false,
                CSS: false
            },
            rename_id: "",
            open_all: false,
            open: {}
        },
        popup: {
            file: {
                enabled: false,
                open: false,
                picker: {
                    value: "",
                    on_pick: false,
                    multi: false
                },
                path: "/",
                expanded: JSON.parse(localStorage.getItem("panel-file-expanded") || "{}"),
                entry: {},
                selected: new Set(),
                action: null,
                file_renaming: "",
                file_ctx_menu_event: null,
                tree: [],
                tree_renaming: "",
                tree_ctx_path: "",
                tree_ctx_menu_event: null,
                preview: true,
                upload: {
                    started: false,
                    progress: {}
                }
            },
            code: {
                init: false,
                open: false,
                name: "site",
                log: "",
                loading: false,
                rebuilding: false,
                startup_status: "init",
                error: false,
                show_log: false,
                list: {}
            },
            page: {
                open: null,
                form: null
            },
            script: {
                open: false,
                mode: "js",
                lastMode: "js",
                type: "item",
                prop_kind: "",
                prop_name: "",
                on_close: ()=>{},
                typings: {
                    status: "ok",
                    err_msg: ""
                },
                wb_render: ()=>{}
            },
            site: null,
            site_form: null,
            comp: {
                preview_id: "",
                open: null,
                import: false
            },
            comp_group: null,
            api: {
                open: false
            }
        }
    }
};

},{"web-utils":"aOKw0","radix3":"9PPrn","@parcel/transformer-js/src/esmodule-helpers.js":"lwmMb"}]},[], null, "parcelRequire2d1f")

//# sourceMappingURL=all.a5e203b5.js.map
