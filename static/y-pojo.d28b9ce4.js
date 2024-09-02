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
})({"4YkP0":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "deepEquals", ()=>deepEquals);
parcelHelpers.export(exports, "syncronize", ()=>syncronize);
var _yjs = require("yjs");
function deepEquals(managed, target) {
    const managedType = detectManagedType(managed);
    try {
        var targetType = target.constructor.name;
    } catch (e) {
        targetType = "undefined";
    }
    if (managedType == "YArray" && targetType == "Array") {
        const targetArray = target;
        const managedArray = managed;
        const result = managedArray.length == targetArray.length && targetArray.every((t, i)=>deepEquals(managedArray.get(i), targetArray[i]));
        return result;
    } else if (managedType == "YMap" && targetType == "Object") {
        const targetMap = target;
        const managedMap = managed;
        let targetKeyCount = 0;
        for(let targetKey in targetMap){
            targetKeyCount++;
            if (!deepEquals(managedMap.get(targetKey), targetMap[targetKey])) return false;
        }
        return targetKeyCount == Array.from(managedMap.keys()).length;
    } else return target === managed;
}
function syncronize(managedObj, targetObj) {
    let changed = false;
    const managedType = detectManagedType(managedObj);
    switch(managedType){
        case "YArray":
            if (!Array.isArray(targetObj)) throw new Error(`Sync failed, ${targetObj} was not array`);
            const managedArray = managedObj;
            const targetArray = targetObj;
            const outOfRange = Symbol();
            let cursor = 0;
            for(let i = 0; i < targetArray.length; i++){
                let match = false;
                const targetValue = targetArray[i];
                const len = managedArray.length > targetArray.length ? managedArray.length : targetArray.length;
                for(let j = cursor; !match && j < len; j++){
                    const managedValue = j < managedArray.length ? managedArray.get(j) : outOfRange;
                    const targetValue = i < targetArray.length ? targetArray[i] : outOfRange;
                    if (deepEquals(managedValue, targetValue)) {
                        for(let x = j - 1; x >= cursor; x--){
                            changed = true;
                            managedArray.delete(x);
                        }
                        const deletedCount = j - cursor;
                        cursor = j + 1 - deletedCount;
                        match = true;
                    }
                }
                if (!match) {
                    try {
                        var childType = targetValue.constructor.name;
                    } catch (e) {
                        childType = "undefined";
                    }
                    const managedChild = cursor < managedArray.length ? managedArray.get(cursor) : "undefined";
                    const managedType = detectManagedType(managedChild);
                    // but if they're compatible types we should go deeper
                    // there was no exact match in the list, so assume the immediately next object should be the match
                    if (managedType == "YMap" && childType == "Object" || managedType == "YArray" && childType == "Array") syncronize(managedChild, targetValue);
                    else managedArray.insert(cursor, [
                        syncChild(targetValue)
                    ]);
                    cursor++;
                    changed = true;
                }
            }
            while(managedArray.length > targetArray.length){
                changed = true;
                managedArray.delete(targetArray.length);
            }
            break;
        case "YMap":
            if (targetObj.constructor.name !== "Object") throw new Error(`Sync failed, ${targetObj} was not object`);
            const managedMap = managedObj;
            const targetMap = targetObj;
            for (const key of managedMap.keys()){
                if (!(key in targetObj)) {
                    // item's been removed from target
                    managedMap.delete(key);
                    changed = true;
                    continue;
                }
                const managedChild = managedMap.get(key);
                const targetChild = targetMap[key];
                const managedType = detectManagedType(managedChild);
                try {
                    var childType = targetChild.constructor.name;
                } catch (e) {
                    childType = "undefined";
                }
                if (managedType == "YMap" && childType !== "Object" || managedType == "YArray" && childType !== "Array" || ![
                    "YMap",
                    "YArray"
                ].includes(managedType) && managedType !== childType) {
                    // this item has fundamentally changed, delete the existing record and recreate it in second pass
                    managedMap.delete(key);
                    changed = true;
                } else if (managedType == "YMap" || managedType == "YArray") {
                    // they match in types, so go deeper
                    const childChanged = syncronize(managedChild, targetChild);
                    changed || (changed = childChanged);
                } else // they are not complex types so just assign it into the map
                if (managedChild !== targetChild) {
                    managedMap.set(key, targetChild);
                    changed = true;
                }
            }
            for(const key in targetMap)if (!managedMap.has(key)) {
                const child = syncChild(targetMap[key]);
                managedMap.set(key, child);
                changed = true;
            }
            break;
        default:
            throw new Error(`can only iterate over Y.Map and Y.Array, got ${managedObj}`);
    }
    return changed;
}
function syncChild(child) {
    try {
        var childType = child.constructor.name;
    } catch (e) {
        childType = "undefined";
    }
    if (childType == "Array") {
        const arr = new _yjs.Array();
        syncronize(arr, child);
        return arr;
    } else if (childType == "Object") {
        const map = new _yjs.Map();
        syncronize(map, child);
        return map;
    } else return child;
}
function detectManagedType(managed) {
    try {
        if (managed.length !== undefined && managed.get !== undefined) return "YArray";
        else if (managed.keys !== undefined && managed.get !== undefined) return "YMap";
        else return managed.constructor.name;
    } catch (e) {
        return "undefined";
    }
}

},{"yjs":"85Wzk","@parcel/transformer-js/src/esmodule-helpers.js":"lwmMb"}]},[], null, "parcelRequire2d1f")

//# sourceMappingURL=y-pojo.d28b9ce4.js.map
