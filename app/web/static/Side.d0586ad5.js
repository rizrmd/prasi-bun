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
parcelRegister("dCav9", function(module, exports) {

$parcel$export(module.exports, "Dropdown", () => $f45dd14ce0054273$export$931cbfb6bfb85fc);

var $lAN3N = parcelRequire("lAN3N");

var $63SH6 = parcelRequire("63SH6");

var $6j6Xp = parcelRequire("6j6Xp");

var $4WfNn = parcelRequire("4WfNn");

var $bTIRf = parcelRequire("bTIRf");
const $f45dd14ce0054273$export$931cbfb6bfb85fc = (prop)=>{
    const local = (0, $4WfNn.useLocal)({
        open: false,
        search: "",
        searchChanged: false,
        status: "init",
        itemsCache: prop.items,
        activeIdx: -1,
        listEl: null,
        listElTimeout: null,
        scrolled: false
    });
    (0, $63SH6.useEffect)(()=>{
        if (!local.open) {
            local.scrolled = false;
            local.render();
        }
    }, [
        local.open
    ]);
    const resetInputValue = ()=>{
        if (prop.items) {
            const val = prop.value || "";
            let idx = 0;
            for (const item of prop.items){
                if (typeof item === "string" && item === val) {
                    local.search = item;
                    local.activeIdx = idx;
                } else if (typeof item === "object" && item.value === val) {
                    local.search = item.label;
                    local.activeIdx = idx;
                }
                local.searchChanged = false;
                idx++;
            }
        }
    };
    if (local.status === "init" || prop.items !== local.itemsCache) {
        local.status = "ready";
        local.itemsCache = prop.items;
        resetInputValue();
    }
    const elProp = {
        ...prop
    };
    delete elProp["value"];
    delete elProp["items"];
    delete elProp["onChange"];
    delete elProp["popover"];
    let items = prop.items || [];
    if (local.searchChanged) {
        local.searchChanged = false;
        const search = local.search.toLowerCase().replace(/\W/, "");
        if (search) {
            items = [];
            for (const item of prop.items || []){
                if (typeof item === "string" && item.toLowerCase().replace(/\W/, "").includes(search)) items.push(item);
                else if (typeof item === "object" && (item.label.toLowerCase().replace(/\W/, "").includes(search) || item.value.toLowerCase().replace(/\W/, "").includes(search))) items.push(item);
            }
        }
    }
    return /*#__PURE__*/ (0, $lAN3N.jsx)((0, $bTIRf.Popover), {
        open: local.open,
        onOpenChange: (open)=>{
            local.open = open;
            local.render();
        },
        autoFocus: false,
        placement: "bottom-start",
        backdrop: false,
        arrow: false,
        offset: 0,
        popoverClassName: cx("bg-white border", prop.popover?.className),
        content: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $lAN3N.Fragment), {
            children: items.length > 0 ? /*#__PURE__*/ (0, $lAN3N.jsx)((0, $6j6Xp.Virtuoso), {
                className: `${items.length > 3 ? "min-h-[140px] max-h-[350px]" : items.length === 3 ? "min-h-[85px]" : items.length === 1 ? "min-h-[30px]" : "min-h-[57px]"} min-w-[200px] flex-1 w-full`,
                data: items,
                ref: (el)=>{
                    if (el && !local.scrolled) {
                        clearTimeout(local.listElTimeout);
                        local.listElTimeout = setTimeout(()=>{
                            local.scrolled = true;
                            local.listEl = el;
                            el.scrollToIndex(local.activeIdx - 2);
                        }, 50);
                    }
                },
                itemContent: (idx, e)=>{
                    return /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                        className: cx("cursor-pointer", prop.value === (typeof e === "string" ? e : e.value) && "active", prop.popover?.itemClassName ? prop.popover?.itemClassName : "hover:bg-blue-100 border-b px-2 whitespace-nowrap select-none"),
                        onClick: ()=>{
                            local.open = false;
                            local.status;
                            if (prop.onChange) prop.onChange(typeof e === "string" ? e : e.value, idx, e);
                            local.render();
                        },
                        children: prop.popover?.renderItem ? prop.popover.renderItem(e, idx) : typeof e === "string" ? e : e.label
                    }, typeof e === "string" ? e : e.value);
                }
            }) : /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                className: "min-h-[100px] min-w-[250px] flex-1 w-full"
            })
        }),
        ...elProp,
        className: cx("dropdown bg-white px-2 relative flex items-stretch", elProp.className),
        children: /*#__PURE__*/ (0, $lAN3N.jsxs)((0, $lAN3N.Fragment), {
            children: [
                /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                    className: "pointer-events-none absolute right-0 bottom-0 top-0 bg-white flex items-center justify-center w-[30px] ",
                    children: /*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        width: "15",
                        height: "15",
                        fill: "none",
                        viewBox: "0 0 15 15",
                        children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                            fill: "currentColor",
                            fillRule: "evenodd",
                            d: "M3.135 6.158a.5.5 0 01.707-.023L7.5 9.565l3.658-3.43a.5.5 0 01.684.73l-4 3.75a.5.5 0 01-.684 0l-4-3.75a.5.5 0 01-.023-.707z",
                            clipRule: "evenodd"
                        })
                    })
                }),
                /*#__PURE__*/ (0, $lAN3N.jsx)("input", {
                    className: cx("cursor-pointer outline-none input flex-1"),
                    type: "string",
                    placeholder: elProp.placeholder,
                    spellCheck: false,
                    value: local.search,
                    onChange: (e)=>{
                        local.search = e.currentTarget.value;
                        local.searchChanged = true;
                        local.render();
                    },
                    onFocus: ()=>{
                        local.open = true;
                        local.render();
                    }
                })
            ]
        })
    });
};

});
parcelRegister("6j6Xp", function(module, exports) {

$parcel$export(module.exports, "Virtuoso", () => $ed43cc03b55b9961$export$ea50ab61e1198ee3);

var $63SH6 = parcelRequire("63SH6");

var $grDIR = parcelRequire("grDIR");
const $ed43cc03b55b9961$var$PUBLISH = 0;
const $ed43cc03b55b9961$var$SUBSCRIBE = 1;
const $ed43cc03b55b9961$var$RESET = 2;
const $ed43cc03b55b9961$var$VALUE = 4;
function $ed43cc03b55b9961$var$compose(a, b) {
    return (arg)=>a(b(arg));
}
function $ed43cc03b55b9961$var$thrush(arg, proc) {
    return proc(arg);
}
function $ed43cc03b55b9961$var$curry2to1(proc, arg1) {
    return (arg2)=>proc(arg1, arg2);
}
function $ed43cc03b55b9961$var$curry1to0(proc, arg) {
    return ()=>proc(arg);
}
function $ed43cc03b55b9961$var$tap(arg, proc) {
    proc(arg);
    return arg;
}
function $ed43cc03b55b9961$var$tup(...args) {
    return args;
}
function $ed43cc03b55b9961$var$call(proc) {
    proc();
}
function $ed43cc03b55b9961$var$always(value) {
    return ()=>value;
}
function $ed43cc03b55b9961$var$joinProc(...procs) {
    return ()=>{
        procs.map($ed43cc03b55b9961$var$call);
    };
}
function $ed43cc03b55b9961$var$isDefined(arg) {
    return arg !== void 0;
}
function $ed43cc03b55b9961$var$noop() {}
function $ed43cc03b55b9961$var$subscribe(emitter, subscription) {
    return emitter($ed43cc03b55b9961$var$SUBSCRIBE, subscription);
}
function $ed43cc03b55b9961$var$publish(publisher, value) {
    publisher($ed43cc03b55b9961$var$PUBLISH, value);
}
function $ed43cc03b55b9961$var$reset(emitter) {
    emitter($ed43cc03b55b9961$var$RESET);
}
function $ed43cc03b55b9961$var$getValue(depot) {
    return depot($ed43cc03b55b9961$var$VALUE);
}
function $ed43cc03b55b9961$var$connect(emitter, publisher) {
    return $ed43cc03b55b9961$var$subscribe(emitter, $ed43cc03b55b9961$var$curry2to1(publisher, $ed43cc03b55b9961$var$PUBLISH));
}
function $ed43cc03b55b9961$var$handleNext(emitter, subscription) {
    const unsub = emitter($ed43cc03b55b9961$var$SUBSCRIBE, (value)=>{
        unsub();
        subscription(value);
    });
    return unsub;
}
function $ed43cc03b55b9961$var$stream() {
    const subscriptions = [];
    return (action, arg)=>{
        switch(action){
            case $ed43cc03b55b9961$var$RESET:
                subscriptions.splice(0, subscriptions.length);
                return;
            case $ed43cc03b55b9961$var$SUBSCRIBE:
                subscriptions.push(arg);
                return ()=>{
                    const indexOf = subscriptions.indexOf(arg);
                    if (indexOf > -1) subscriptions.splice(indexOf, 1);
                };
            case $ed43cc03b55b9961$var$PUBLISH:
                subscriptions.slice().forEach((subscription)=>{
                    subscription(arg);
                });
                return;
            default:
                throw new Error(`unrecognized action ${action}`);
        }
    };
}
function $ed43cc03b55b9961$var$statefulStream(initial) {
    let value = initial;
    const innerSubject = $ed43cc03b55b9961$var$stream();
    return (action, arg)=>{
        switch(action){
            case $ed43cc03b55b9961$var$SUBSCRIBE:
                const subscription = arg;
                subscription(value);
                break;
            case $ed43cc03b55b9961$var$PUBLISH:
                value = arg;
                break;
            case $ed43cc03b55b9961$var$VALUE:
                return value;
        }
        return innerSubject(action, arg);
    };
}
function $ed43cc03b55b9961$var$eventHandler(emitter) {
    let unsub;
    let currentSubscription;
    const cleanup = ()=>unsub && unsub();
    return function(action, subscription) {
        switch(action){
            case $ed43cc03b55b9961$var$SUBSCRIBE:
                if (subscription) {
                    if (currentSubscription === subscription) return;
                    cleanup();
                    currentSubscription = subscription;
                    unsub = $ed43cc03b55b9961$var$subscribe(emitter, subscription);
                    return unsub;
                } else {
                    cleanup();
                    return $ed43cc03b55b9961$var$noop;
                }
            case $ed43cc03b55b9961$var$RESET:
                cleanup();
                currentSubscription = null;
                return;
            default:
                throw new Error(`unrecognized action ${action}`);
        }
    };
}
function $ed43cc03b55b9961$var$streamFromEmitter(emitter) {
    return $ed43cc03b55b9961$var$tap($ed43cc03b55b9961$var$stream(), (stream2)=>$ed43cc03b55b9961$var$connect(emitter, stream2));
}
function $ed43cc03b55b9961$var$statefulStreamFromEmitter(emitter, initial) {
    return $ed43cc03b55b9961$var$tap($ed43cc03b55b9961$var$statefulStream(initial), (stream2)=>$ed43cc03b55b9961$var$connect(emitter, stream2));
}
function $ed43cc03b55b9961$var$combineOperators(...operators) {
    return (subscriber)=>{
        return operators.reduceRight($ed43cc03b55b9961$var$thrush, subscriber);
    };
}
function $ed43cc03b55b9961$var$pipe(source, ...operators) {
    const project = $ed43cc03b55b9961$var$combineOperators(...operators);
    return (action, subscription)=>{
        switch(action){
            case $ed43cc03b55b9961$var$SUBSCRIBE:
                return $ed43cc03b55b9961$var$subscribe(source, project(subscription));
            case $ed43cc03b55b9961$var$RESET:
                $ed43cc03b55b9961$var$reset(source);
                return;
        }
    };
}
function $ed43cc03b55b9961$var$defaultComparator(previous, next) {
    return previous === next;
}
function $ed43cc03b55b9961$var$distinctUntilChanged(comparator = $ed43cc03b55b9961$var$defaultComparator) {
    let current;
    return (done)=>(next)=>{
            if (!comparator(current, next)) {
                current = next;
                done(next);
            }
        };
}
function $ed43cc03b55b9961$var$filter(predicate) {
    return (done)=>(value)=>{
            predicate(value) && done(value);
        };
}
function $ed43cc03b55b9961$var$map(project) {
    return (done)=>$ed43cc03b55b9961$var$compose(done, project);
}
function $ed43cc03b55b9961$var$mapTo(value) {
    return (done)=>()=>done(value);
}
function $ed43cc03b55b9961$var$scan(scanner, initial) {
    return (done)=>(value)=>done(initial = scanner(initial, value));
}
function $ed43cc03b55b9961$var$skip(times) {
    return (done)=>(value)=>{
            times > 0 ? times-- : done(value);
        };
}
function $ed43cc03b55b9961$var$throttleTime(interval) {
    let currentValue = null;
    let timeout;
    return (done)=>(value)=>{
            currentValue = value;
            if (timeout) return;
            timeout = setTimeout(()=>{
                timeout = void 0;
                done(currentValue);
            }, interval);
        };
}
function $ed43cc03b55b9961$var$debounceTime(interval) {
    let currentValue;
    let timeout;
    return (done)=>(value)=>{
            currentValue = value;
            if (timeout) clearTimeout(timeout);
            timeout = setTimeout(()=>{
                done(currentValue);
            }, interval);
        };
}
function $ed43cc03b55b9961$var$withLatestFrom(...sources) {
    const values = new Array(sources.length);
    let called = 0;
    let pendingCall = null;
    const allCalled = Math.pow(2, sources.length) - 1;
    sources.forEach((source, index)=>{
        const bit = Math.pow(2, index);
        $ed43cc03b55b9961$var$subscribe(source, (value)=>{
            const prevCalled = called;
            called = called | bit;
            values[index] = value;
            if (prevCalled !== allCalled && called === allCalled && pendingCall) {
                pendingCall();
                pendingCall = null;
            }
        });
    });
    return (done)=>(value)=>{
            const call2 = ()=>done([
                    value
                ].concat(values));
            if (called === allCalled) call2();
            else pendingCall = call2;
        };
}
function $ed43cc03b55b9961$var$merge(...sources) {
    return function(action, subscription) {
        switch(action){
            case $ed43cc03b55b9961$var$SUBSCRIBE:
                return $ed43cc03b55b9961$var$joinProc(...sources.map((source)=>$ed43cc03b55b9961$var$subscribe(source, subscription)));
            case $ed43cc03b55b9961$var$RESET:
                return;
            default:
                throw new Error(`unrecognized action ${action}`);
        }
    };
}
function $ed43cc03b55b9961$var$duc(source, comparator = $ed43cc03b55b9961$var$defaultComparator) {
    return $ed43cc03b55b9961$var$pipe(source, $ed43cc03b55b9961$var$distinctUntilChanged(comparator));
}
function $ed43cc03b55b9961$var$combineLatest(...emitters) {
    const innerSubject = $ed43cc03b55b9961$var$stream();
    const values = new Array(emitters.length);
    let called = 0;
    const allCalled = Math.pow(2, emitters.length) - 1;
    emitters.forEach((source, index)=>{
        const bit = Math.pow(2, index);
        $ed43cc03b55b9961$var$subscribe(source, (value)=>{
            values[index] = value;
            called = called | bit;
            if (called === allCalled) $ed43cc03b55b9961$var$publish(innerSubject, values);
        });
    });
    return function(action, subscription) {
        switch(action){
            case $ed43cc03b55b9961$var$SUBSCRIBE:
                if (called === allCalled) subscription(values);
                return $ed43cc03b55b9961$var$subscribe(innerSubject, subscription);
            case $ed43cc03b55b9961$var$RESET:
                return $ed43cc03b55b9961$var$reset(innerSubject);
            default:
                throw new Error(`unrecognized action ${action}`);
        }
    };
}
function $ed43cc03b55b9961$var$system(constructor, dependencies = [], { singleton: singleton } = {
    singleton: true
}) {
    return {
        id: $ed43cc03b55b9961$var$id(),
        constructor: constructor,
        dependencies: dependencies,
        singleton: singleton
    };
}
const $ed43cc03b55b9961$var$id = ()=>Symbol();
function $ed43cc03b55b9961$var$init(systemSpec) {
    const singletons = /* @__PURE__ */ new Map();
    const _init = ({ id: id2, constructor: constructor, dependencies: dependencies, singleton: singleton })=>{
        if (singleton && singletons.has(id2)) return singletons.get(id2);
        const system2 = constructor(dependencies.map((e)=>_init(e)));
        if (singleton) singletons.set(id2, system2);
        return system2;
    };
    return _init(systemSpec);
}
function $ed43cc03b55b9961$var$omit(keys, obj) {
    const result = {};
    const index = {};
    let idx = 0;
    const len = keys.length;
    while(idx < len){
        index[keys[idx]] = 1;
        idx += 1;
    }
    for(const prop in obj)if (!index.hasOwnProperty(prop)) result[prop] = obj[prop];
    return result;
}
const $ed43cc03b55b9961$var$useIsomorphicLayoutEffect$2 = typeof document !== "undefined" ? (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).useLayoutEffect : (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).useEffect;
function $ed43cc03b55b9961$var$systemToComponent(systemSpec, map2, Root) {
    const requiredPropNames = Object.keys(map2.required || {});
    const optionalPropNames = Object.keys(map2.optional || {});
    const methodNames = Object.keys(map2.methods || {});
    const eventNames = Object.keys(map2.events || {});
    const Context = (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createContext({});
    function applyPropsToSystem(system2, props) {
        if (system2["propsReady"]) $ed43cc03b55b9961$var$publish(system2["propsReady"], false);
        for (const requiredPropName of requiredPropNames){
            const stream2 = system2[map2.required[requiredPropName]];
            $ed43cc03b55b9961$var$publish(stream2, props[requiredPropName]);
        }
        for (const optionalPropName of optionalPropNames)if (optionalPropName in props) {
            const stream2 = system2[map2.optional[optionalPropName]];
            $ed43cc03b55b9961$var$publish(stream2, props[optionalPropName]);
        }
        if (system2["propsReady"]) $ed43cc03b55b9961$var$publish(system2["propsReady"], true);
    }
    function buildMethods(system2) {
        return methodNames.reduce((acc, methodName)=>{
            acc[methodName] = (value)=>{
                const stream2 = system2[map2.methods[methodName]];
                $ed43cc03b55b9961$var$publish(stream2, value);
            };
            return acc;
        }, {});
    }
    function buildEventHandlers(system2) {
        return eventNames.reduce((handlers, eventName)=>{
            handlers[eventName] = $ed43cc03b55b9961$var$eventHandler(system2[map2.events[eventName]]);
            return handlers;
        }, {});
    }
    const Component = (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).forwardRef((propsWithChildren, ref)=>{
        const { children: children, ...props } = propsWithChildren;
        const [system2] = (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).useState(()=>{
            return $ed43cc03b55b9961$var$tap($ed43cc03b55b9961$var$init(systemSpec), (system22)=>applyPropsToSystem(system22, props));
        });
        const [handlers] = (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).useState($ed43cc03b55b9961$var$curry1to0(buildEventHandlers, system2));
        $ed43cc03b55b9961$var$useIsomorphicLayoutEffect$2(()=>{
            for (const eventName of eventNames)if (eventName in props) $ed43cc03b55b9961$var$subscribe(handlers[eventName], props[eventName]);
            return ()=>{
                Object.values(handlers).map($ed43cc03b55b9961$var$reset);
            };
        }, [
            props,
            handlers,
            system2
        ]);
        $ed43cc03b55b9961$var$useIsomorphicLayoutEffect$2(()=>{
            applyPropsToSystem(system2, props);
        });
        (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).useImperativeHandle(ref, $ed43cc03b55b9961$var$always(buildMethods(system2)));
        return (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement(Context.Provider, {
            value: system2
        }, Root ? (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement(Root, $ed43cc03b55b9961$var$omit([
            ...requiredPropNames,
            ...optionalPropNames,
            ...eventNames
        ], props), children) : children);
    });
    const usePublisher2 = (key)=>{
        return (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).useCallback($ed43cc03b55b9961$var$curry2to1($ed43cc03b55b9961$var$publish, (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).useContext(Context)[key]), [
            key
        ]);
    };
    const useEmitterValue2 = (key)=>{
        const system2 = (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).useContext(Context);
        const source = system2[key];
        const [value, setValue] = (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).useState($ed43cc03b55b9961$var$curry1to0($ed43cc03b55b9961$var$getValue, source));
        $ed43cc03b55b9961$var$useIsomorphicLayoutEffect$2(()=>$ed43cc03b55b9961$var$subscribe(source, (next)=>{
                if (next !== value) setValue($ed43cc03b55b9961$var$always(next));
            }), [
            source,
            value
        ]);
        return value;
    };
    const useEmitter2 = (key, callback)=>{
        const context = (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).useContext(Context);
        const source = context[key];
        $ed43cc03b55b9961$var$useIsomorphicLayoutEffect$2(()=>$ed43cc03b55b9961$var$subscribe(source, callback), [
            callback,
            source
        ]);
    };
    return {
        Component: Component,
        usePublisher: usePublisher2,
        useEmitterValue: useEmitterValue2,
        useEmitter: useEmitter2
    };
}
const $ed43cc03b55b9961$var$useIsomorphicLayoutEffect = typeof document !== "undefined" ? (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).useLayoutEffect : (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).useEffect;
const $ed43cc03b55b9961$var$useIsomorphicLayoutEffect$1 = $ed43cc03b55b9961$var$useIsomorphicLayoutEffect;
var $ed43cc03b55b9961$export$243e62d78d3b544d = /* @__PURE__ */ ((LogLevel2)=>{
    LogLevel2[LogLevel2["DEBUG"] = 0] = "DEBUG";
    LogLevel2[LogLevel2["INFO"] = 1] = "INFO";
    LogLevel2[LogLevel2["WARN"] = 2] = "WARN";
    LogLevel2[LogLevel2["ERROR"] = 3] = "ERROR";
    return LogLevel2;
})($ed43cc03b55b9961$export$243e62d78d3b544d || {});
const $ed43cc03b55b9961$var$CONSOLE_METHOD_MAP = {
    [0]: "debug",
    [1]: "log",
    [2]: "warn",
    [3]: "error"
};
const $ed43cc03b55b9961$var$getGlobalThis = ()=>typeof globalThis === "undefined" ? window : globalThis;
const $ed43cc03b55b9961$var$loggerSystem = $ed43cc03b55b9961$var$system(()=>{
    const logLevel = $ed43cc03b55b9961$var$statefulStream(3);
    const log = $ed43cc03b55b9961$var$statefulStream((label, message, level = 1)=>{
        var _a;
        const currentLevel = (_a = $ed43cc03b55b9961$var$getGlobalThis()["VIRTUOSO_LOG_LEVEL"]) != null ? _a : $ed43cc03b55b9961$var$getValue(logLevel);
        if (level >= currentLevel) console[$ed43cc03b55b9961$var$CONSOLE_METHOD_MAP[level]]("%creact-virtuoso: %c%s %o", "color: #0253b3; font-weight: bold", "color: initial", label, message);
    });
    return {
        log: log,
        logLevel: logLevel
    };
}, [], {
    singleton: true
});
function $ed43cc03b55b9961$var$useSizeWithElRef(callback, enabled = true) {
    const ref = (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).useRef(null);
    let callbackRef = (_el)=>{};
    if (typeof ResizeObserver !== "undefined") {
        const observer = (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).useMemo(()=>{
            return new ResizeObserver((entries)=>{
                const element = entries[0].target;
                if (element.offsetParent !== null) callback(element);
            });
        }, [
            callback
        ]);
        callbackRef = (elRef)=>{
            if (elRef && enabled) {
                observer.observe(elRef);
                ref.current = elRef;
            } else {
                if (ref.current) observer.unobserve(ref.current);
                ref.current = null;
            }
        };
    }
    return {
        ref: ref,
        callbackRef: callbackRef
    };
}
function $ed43cc03b55b9961$var$useSize(callback, enabled = true) {
    return $ed43cc03b55b9961$var$useSizeWithElRef(callback, enabled).callbackRef;
}
function $ed43cc03b55b9961$var$useChangedListContentsSizes(callback, itemSize, enabled, scrollContainerStateCallback, log, gap, customScrollParent) {
    const memoedCallback = (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).useCallback((el)=>{
        const ranges = $ed43cc03b55b9961$var$getChangedChildSizes(el.children, itemSize, "offsetHeight", log);
        let scrollableElement = el.parentElement;
        while(!scrollableElement.dataset["virtuosoScroller"])scrollableElement = scrollableElement.parentElement;
        const windowScrolling = scrollableElement.lastElementChild.dataset["viewportType"] === "window";
        const scrollTop = customScrollParent ? customScrollParent.scrollTop : windowScrolling ? window.pageYOffset || document.documentElement.scrollTop : scrollableElement.scrollTop;
        const scrollHeight = customScrollParent ? customScrollParent.scrollHeight : windowScrolling ? document.documentElement.scrollHeight : scrollableElement.scrollHeight;
        const viewportHeight = customScrollParent ? customScrollParent.offsetHeight : windowScrolling ? window.innerHeight : scrollableElement.offsetHeight;
        scrollContainerStateCallback({
            scrollTop: Math.max(scrollTop, 0),
            scrollHeight: scrollHeight,
            viewportHeight: viewportHeight
        });
        gap == null || gap($ed43cc03b55b9961$var$resolveGapValue$1("row-gap", getComputedStyle(el).rowGap, log));
        if (ranges !== null) callback(ranges);
    }, [
        callback,
        itemSize,
        log,
        gap,
        customScrollParent,
        scrollContainerStateCallback
    ]);
    return $ed43cc03b55b9961$var$useSizeWithElRef(memoedCallback, enabled);
}
function $ed43cc03b55b9961$var$getChangedChildSizes(children, itemSize, field, log) {
    const length = children.length;
    if (length === 0) return null;
    const results = [];
    for(let i = 0; i < length; i++){
        const child = children.item(i);
        if (!child || child.dataset.index === void 0) continue;
        const index = parseInt(child.dataset.index);
        const knownSize = parseFloat(child.dataset.knownSize);
        const size = itemSize(child, field);
        if (size === 0) log("Zero-sized element, this should not happen", {
            child: child
        }, $ed43cc03b55b9961$export$243e62d78d3b544d.ERROR);
        if (size === knownSize) continue;
        const lastResult = results[results.length - 1];
        if (results.length === 0 || lastResult.size !== size || lastResult.endIndex !== index - 1) results.push({
            startIndex: index,
            endIndex: index,
            size: size
        });
        else results[results.length - 1].endIndex++;
    }
    return results;
}
function $ed43cc03b55b9961$var$resolveGapValue$1(property, value, log) {
    if (value !== "normal" && !(value == null ? void 0 : value.endsWith("px"))) log(`${property} was not resolved to pixel value correctly`, value, $ed43cc03b55b9961$export$243e62d78d3b544d.WARN);
    if (value === "normal") return 0;
    return parseInt(value != null ? value : "0", 10);
}
function $ed43cc03b55b9961$var$correctItemSize(el, dimension) {
    return Math.round(el.getBoundingClientRect()[dimension]);
}
function $ed43cc03b55b9961$var$approximatelyEqual(num1, num2) {
    return Math.abs(num1 - num2) < 1.01;
}
function $ed43cc03b55b9961$var$useScrollTop(scrollContainerStateCallback, smoothScrollTargetReached, scrollerElement, scrollerRefCallback = $ed43cc03b55b9961$var$noop, customScrollParent) {
    const scrollerRef = (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).useRef(null);
    const scrollTopTarget = (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).useRef(null);
    const timeoutRef = (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).useRef(null);
    const handler = (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).useCallback((ev)=>{
        const el = ev.target;
        const windowScroll = el === window || el === document;
        const scrollTop = windowScroll ? window.pageYOffset || document.documentElement.scrollTop : el.scrollTop;
        const scrollHeight = windowScroll ? document.documentElement.scrollHeight : el.scrollHeight;
        const viewportHeight = windowScroll ? window.innerHeight : el.offsetHeight;
        const call2 = ()=>{
            scrollContainerStateCallback({
                scrollTop: Math.max(scrollTop, 0),
                scrollHeight: scrollHeight,
                viewportHeight: viewportHeight
            });
        };
        if (ev.suppressFlushSync) call2();
        else (0, (/*@__PURE__*/$parcel$interopDefault($grDIR))).flushSync(call2);
        if (scrollTopTarget.current !== null) {
            if (scrollTop === scrollTopTarget.current || scrollTop <= 0 || scrollTop === scrollHeight - viewportHeight) {
                scrollTopTarget.current = null;
                smoothScrollTargetReached(true);
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                    timeoutRef.current = null;
                }
            }
        }
    }, [
        scrollContainerStateCallback,
        smoothScrollTargetReached
    ]);
    (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).useEffect(()=>{
        const localRef = customScrollParent ? customScrollParent : scrollerRef.current;
        scrollerRefCallback(customScrollParent ? customScrollParent : scrollerRef.current);
        handler({
            target: localRef,
            suppressFlushSync: true
        });
        localRef.addEventListener("scroll", handler, {
            passive: true
        });
        return ()=>{
            scrollerRefCallback(null);
            localRef.removeEventListener("scroll", handler);
        };
    }, [
        scrollerRef,
        handler,
        scrollerElement,
        scrollerRefCallback,
        customScrollParent
    ]);
    function scrollToCallback(location) {
        const scrollerElement2 = scrollerRef.current;
        if (!scrollerElement2 || "offsetHeight" in scrollerElement2 && scrollerElement2.offsetHeight === 0) return;
        const isSmooth = location.behavior === "smooth";
        let offsetHeight;
        let scrollHeight;
        let scrollTop;
        if (scrollerElement2 === window) {
            scrollHeight = Math.max($ed43cc03b55b9961$var$correctItemSize(document.documentElement, "height"), document.documentElement.scrollHeight);
            offsetHeight = window.innerHeight;
            scrollTop = document.documentElement.scrollTop;
        } else {
            scrollHeight = scrollerElement2.scrollHeight;
            offsetHeight = $ed43cc03b55b9961$var$correctItemSize(scrollerElement2, "height");
            scrollTop = scrollerElement2.scrollTop;
        }
        const maxScrollTop = scrollHeight - offsetHeight;
        location.top = Math.ceil(Math.max(Math.min(maxScrollTop, location.top), 0));
        if ($ed43cc03b55b9961$var$approximatelyEqual(offsetHeight, scrollHeight) || location.top === scrollTop) {
            scrollContainerStateCallback({
                scrollTop: scrollTop,
                scrollHeight: scrollHeight,
                viewportHeight: offsetHeight
            });
            if (isSmooth) smoothScrollTargetReached(true);
            return;
        }
        if (isSmooth) {
            scrollTopTarget.current = location.top;
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(()=>{
                timeoutRef.current = null;
                scrollTopTarget.current = null;
                smoothScrollTargetReached(true);
            }, 1e3);
        } else scrollTopTarget.current = null;
        scrollerElement2.scrollTo(location);
    }
    function scrollByCallback(location) {
        scrollerRef.current.scrollBy(location);
    }
    return {
        scrollerRef: scrollerRef,
        scrollByCallback: scrollByCallback,
        scrollToCallback: scrollToCallback
    };
}
const $ed43cc03b55b9961$var$domIOSystem = $ed43cc03b55b9961$var$system(()=>{
    const scrollContainerState = $ed43cc03b55b9961$var$stream();
    const scrollTop = $ed43cc03b55b9961$var$stream();
    const deviation = $ed43cc03b55b9961$var$statefulStream(0);
    const smoothScrollTargetReached = $ed43cc03b55b9961$var$stream();
    const statefulScrollTop = $ed43cc03b55b9961$var$statefulStream(0);
    const viewportHeight = $ed43cc03b55b9961$var$stream();
    const scrollHeight = $ed43cc03b55b9961$var$stream();
    const headerHeight = $ed43cc03b55b9961$var$statefulStream(0);
    const fixedHeaderHeight = $ed43cc03b55b9961$var$statefulStream(0);
    const fixedFooterHeight = $ed43cc03b55b9961$var$statefulStream(0);
    const footerHeight = $ed43cc03b55b9961$var$statefulStream(0);
    const scrollTo = $ed43cc03b55b9961$var$stream();
    const scrollBy = $ed43cc03b55b9961$var$stream();
    const scrollingInProgress = $ed43cc03b55b9961$var$statefulStream(false);
    $ed43cc03b55b9961$var$connect($ed43cc03b55b9961$var$pipe(scrollContainerState, $ed43cc03b55b9961$var$map(({ scrollTop: scrollTop2 })=>scrollTop2)), scrollTop);
    $ed43cc03b55b9961$var$connect($ed43cc03b55b9961$var$pipe(scrollContainerState, $ed43cc03b55b9961$var$map(({ scrollHeight: scrollHeight2 })=>scrollHeight2)), scrollHeight);
    $ed43cc03b55b9961$var$connect(scrollTop, statefulScrollTop);
    return {
        scrollContainerState: // input
        scrollContainerState,
        scrollTop: scrollTop,
        viewportHeight: viewportHeight,
        headerHeight: headerHeight,
        fixedHeaderHeight: fixedHeaderHeight,
        fixedFooterHeight: fixedFooterHeight,
        footerHeight: footerHeight,
        scrollHeight: scrollHeight,
        smoothScrollTargetReached: smoothScrollTargetReached,
        scrollTo: // signals
        scrollTo,
        scrollBy: scrollBy,
        statefulScrollTop: // state
        statefulScrollTop,
        deviation: deviation,
        scrollingInProgress: scrollingInProgress
    };
}, [], {
    singleton: true
});
const $ed43cc03b55b9961$var$NIL_NODE = {
    lvl: 0
};
function $ed43cc03b55b9961$var$newAANode(k, v, lvl, l = $ed43cc03b55b9961$var$NIL_NODE, r = $ed43cc03b55b9961$var$NIL_NODE) {
    return {
        k: k,
        v: v,
        lvl: lvl,
        l: l,
        r: r
    };
}
function $ed43cc03b55b9961$var$empty(node) {
    return node === $ed43cc03b55b9961$var$NIL_NODE;
}
function $ed43cc03b55b9961$var$newTree() {
    return $ed43cc03b55b9961$var$NIL_NODE;
}
function $ed43cc03b55b9961$var$remove(node, key) {
    if ($ed43cc03b55b9961$var$empty(node)) return $ed43cc03b55b9961$var$NIL_NODE;
    const { k: k, l: l, r: r } = node;
    if (key === k) {
        if ($ed43cc03b55b9961$var$empty(l)) return r;
        else if ($ed43cc03b55b9961$var$empty(r)) return l;
        else {
            const [lastKey, lastValue] = $ed43cc03b55b9961$var$last(l);
            return $ed43cc03b55b9961$var$adjust($ed43cc03b55b9961$var$clone(node, {
                k: lastKey,
                v: lastValue,
                l: $ed43cc03b55b9961$var$deleteLast(l)
            }));
        }
    } else if (key < k) return $ed43cc03b55b9961$var$adjust($ed43cc03b55b9961$var$clone(node, {
        l: $ed43cc03b55b9961$var$remove(l, key)
    }));
    else return $ed43cc03b55b9961$var$adjust($ed43cc03b55b9961$var$clone(node, {
        r: $ed43cc03b55b9961$var$remove(r, key)
    }));
}
function $ed43cc03b55b9961$var$find(node, key) {
    if ($ed43cc03b55b9961$var$empty(node)) return;
    if (key === node.k) return node.v;
    else if (key < node.k) return $ed43cc03b55b9961$var$find(node.l, key);
    else return $ed43cc03b55b9961$var$find(node.r, key);
}
function $ed43cc03b55b9961$var$findMaxKeyValue(node, value, field = "k") {
    if ($ed43cc03b55b9961$var$empty(node)) return [
        -Infinity,
        void 0
    ];
    if (Number(node[field]) === value) return [
        node.k,
        node.v
    ];
    if (Number(node[field]) < value) {
        const r = $ed43cc03b55b9961$var$findMaxKeyValue(node.r, value, field);
        if (r[0] === -Infinity) return [
            node.k,
            node.v
        ];
        else return r;
    }
    return $ed43cc03b55b9961$var$findMaxKeyValue(node.l, value, field);
}
function $ed43cc03b55b9961$var$insert(node, k, v) {
    if ($ed43cc03b55b9961$var$empty(node)) return $ed43cc03b55b9961$var$newAANode(k, v, 1);
    if (k === node.k) return $ed43cc03b55b9961$var$clone(node, {
        k: k,
        v: v
    });
    else if (k < node.k) return $ed43cc03b55b9961$var$rebalance($ed43cc03b55b9961$var$clone(node, {
        l: $ed43cc03b55b9961$var$insert(node.l, k, v)
    }));
    else return $ed43cc03b55b9961$var$rebalance($ed43cc03b55b9961$var$clone(node, {
        r: $ed43cc03b55b9961$var$insert(node.r, k, v)
    }));
}
function $ed43cc03b55b9961$var$walkWithin(node, start, end) {
    if ($ed43cc03b55b9961$var$empty(node)) return [];
    const { k: k, v: v, l: l, r: r } = node;
    let result = [];
    if (k > start) result = result.concat($ed43cc03b55b9961$var$walkWithin(l, start, end));
    if (k >= start && k <= end) result.push({
        k: k,
        v: v
    });
    if (k <= end) result = result.concat($ed43cc03b55b9961$var$walkWithin(r, start, end));
    return result;
}
function $ed43cc03b55b9961$var$walk(node) {
    if ($ed43cc03b55b9961$var$empty(node)) return [];
    return [
        ...$ed43cc03b55b9961$var$walk(node.l),
        {
            k: node.k,
            v: node.v
        },
        ...$ed43cc03b55b9961$var$walk(node.r)
    ];
}
function $ed43cc03b55b9961$var$last(node) {
    return $ed43cc03b55b9961$var$empty(node.r) ? [
        node.k,
        node.v
    ] : $ed43cc03b55b9961$var$last(node.r);
}
function $ed43cc03b55b9961$var$deleteLast(node) {
    return $ed43cc03b55b9961$var$empty(node.r) ? node.l : $ed43cc03b55b9961$var$adjust($ed43cc03b55b9961$var$clone(node, {
        r: $ed43cc03b55b9961$var$deleteLast(node.r)
    }));
}
function $ed43cc03b55b9961$var$clone(node, args) {
    return $ed43cc03b55b9961$var$newAANode(args.k !== void 0 ? args.k : node.k, args.v !== void 0 ? args.v : node.v, args.lvl !== void 0 ? args.lvl : node.lvl, args.l !== void 0 ? args.l : node.l, args.r !== void 0 ? args.r : node.r);
}
function $ed43cc03b55b9961$var$isSingle(node) {
    return $ed43cc03b55b9961$var$empty(node) || node.lvl > node.r.lvl;
}
function $ed43cc03b55b9961$var$rebalance(node) {
    return $ed43cc03b55b9961$var$split($ed43cc03b55b9961$var$skew(node));
}
function $ed43cc03b55b9961$var$adjust(node) {
    const { l: l, r: r, lvl: lvl } = node;
    if (r.lvl >= lvl - 1 && l.lvl >= lvl - 1) return node;
    else if (lvl > r.lvl + 1) {
        if ($ed43cc03b55b9961$var$isSingle(l)) return $ed43cc03b55b9961$var$skew($ed43cc03b55b9961$var$clone(node, {
            lvl: lvl - 1
        }));
        else {
            if (!$ed43cc03b55b9961$var$empty(l) && !$ed43cc03b55b9961$var$empty(l.r)) return $ed43cc03b55b9961$var$clone(l.r, {
                l: $ed43cc03b55b9961$var$clone(l, {
                    r: l.r.l
                }),
                r: $ed43cc03b55b9961$var$clone(node, {
                    l: l.r.r,
                    lvl: lvl - 1
                }),
                lvl: lvl
            });
            else throw new Error("Unexpected empty nodes");
        }
    } else {
        if ($ed43cc03b55b9961$var$isSingle(node)) return $ed43cc03b55b9961$var$split($ed43cc03b55b9961$var$clone(node, {
            lvl: lvl - 1
        }));
        else {
            if (!$ed43cc03b55b9961$var$empty(r) && !$ed43cc03b55b9961$var$empty(r.l)) {
                const rl = r.l;
                const rlvl = $ed43cc03b55b9961$var$isSingle(rl) ? r.lvl - 1 : r.lvl;
                return $ed43cc03b55b9961$var$clone(rl, {
                    l: $ed43cc03b55b9961$var$clone(node, {
                        r: rl.l,
                        lvl: lvl - 1
                    }),
                    r: $ed43cc03b55b9961$var$split($ed43cc03b55b9961$var$clone(r, {
                        l: rl.r,
                        lvl: rlvl
                    })),
                    lvl: rl.lvl + 1
                });
            } else throw new Error("Unexpected empty nodes");
        }
    }
}
function $ed43cc03b55b9961$var$rangesWithin(node, startIndex, endIndex) {
    if ($ed43cc03b55b9961$var$empty(node)) return [];
    const adjustedStart = $ed43cc03b55b9961$var$findMaxKeyValue(node, startIndex)[0];
    return $ed43cc03b55b9961$var$toRanges($ed43cc03b55b9961$var$walkWithin(node, adjustedStart, endIndex));
}
function $ed43cc03b55b9961$var$arrayToRanges(items, parser) {
    const length = items.length;
    if (length === 0) return [];
    let { index: start, value: value } = parser(items[0]);
    const result = [];
    for(let i = 1; i < length; i++){
        const { index: nextIndex, value: nextValue } = parser(items[i]);
        result.push({
            start: start,
            end: nextIndex - 1,
            value: value
        });
        start = nextIndex;
        value = nextValue;
    }
    result.push({
        start: start,
        end: Infinity,
        value: value
    });
    return result;
}
function $ed43cc03b55b9961$var$toRanges(nodes) {
    return $ed43cc03b55b9961$var$arrayToRanges(nodes, ({ k: index, v: value })=>({
            index: index,
            value: value
        }));
}
function $ed43cc03b55b9961$var$split(node) {
    const { r: r, lvl: lvl } = node;
    return !$ed43cc03b55b9961$var$empty(r) && !$ed43cc03b55b9961$var$empty(r.r) && r.lvl === lvl && r.r.lvl === lvl ? $ed43cc03b55b9961$var$clone(r, {
        l: $ed43cc03b55b9961$var$clone(node, {
            r: r.l
        }),
        lvl: lvl + 1
    }) : node;
}
function $ed43cc03b55b9961$var$skew(node) {
    const { l: l } = node;
    return !$ed43cc03b55b9961$var$empty(l) && l.lvl === node.lvl ? $ed43cc03b55b9961$var$clone(l, {
        r: $ed43cc03b55b9961$var$clone(node, {
            l: l.r
        })
    }) : node;
}
function $ed43cc03b55b9961$var$findIndexOfClosestSmallerOrEqual(items, value, comparator, start = 0) {
    let end = items.length - 1;
    while(start <= end){
        const index = Math.floor((start + end) / 2);
        const item = items[index];
        const match = comparator(item, value);
        if (match === 0) return index;
        if (match === -1) {
            if (end - start < 2) return index - 1;
            end = index - 1;
        } else {
            if (end === start) return index;
            start = index + 1;
        }
    }
    throw new Error(`Failed binary finding record in array - ${items.join(",")}, searched for ${value}`);
}
function $ed43cc03b55b9961$var$findClosestSmallerOrEqual(items, value, comparator) {
    return items[$ed43cc03b55b9961$var$findIndexOfClosestSmallerOrEqual(items, value, comparator)];
}
function $ed43cc03b55b9961$var$findRange(items, startValue, endValue, comparator) {
    const startIndex = $ed43cc03b55b9961$var$findIndexOfClosestSmallerOrEqual(items, startValue, comparator);
    const endIndex = $ed43cc03b55b9961$var$findIndexOfClosestSmallerOrEqual(items, endValue, comparator, startIndex);
    return items.slice(startIndex, endIndex + 1);
}
const $ed43cc03b55b9961$var$recalcSystem = $ed43cc03b55b9961$var$system(()=>{
    const recalcInProgress = $ed43cc03b55b9961$var$statefulStream(false);
    return {
        recalcInProgress: recalcInProgress
    };
}, [], {
    singleton: true
});
function $ed43cc03b55b9961$var$rangeIncludes(refRange) {
    const { size: size, startIndex: startIndex, endIndex: endIndex } = refRange;
    return (range)=>{
        return range.start === startIndex && (range.end === endIndex || range.end === Infinity) && range.value === size;
    };
}
function $ed43cc03b55b9961$var$affectedGroupCount(offset, groupIndices) {
    let recognizedOffsetItems = 0;
    let groupIndex = 0;
    while(recognizedOffsetItems < offset){
        recognizedOffsetItems += groupIndices[groupIndex + 1] - groupIndices[groupIndex] - 1;
        groupIndex++;
    }
    const offsetIsExact = recognizedOffsetItems === offset;
    return groupIndex - (offsetIsExact ? 0 : 1);
}
function $ed43cc03b55b9961$var$insertRanges(sizeTree, ranges) {
    let syncStart = $ed43cc03b55b9961$var$empty(sizeTree) ? 0 : Infinity;
    for (const range of ranges){
        const { size: size, startIndex: startIndex, endIndex: endIndex } = range;
        syncStart = Math.min(syncStart, startIndex);
        if ($ed43cc03b55b9961$var$empty(sizeTree)) {
            sizeTree = $ed43cc03b55b9961$var$insert(sizeTree, 0, size);
            continue;
        }
        const overlappingRanges = $ed43cc03b55b9961$var$rangesWithin(sizeTree, startIndex - 1, endIndex + 1);
        if (overlappingRanges.some($ed43cc03b55b9961$var$rangeIncludes(range))) continue;
        let firstPassDone = false;
        let shouldInsert = false;
        for (const { start: rangeStart, end: rangeEnd, value: rangeValue } of overlappingRanges){
            if (!firstPassDone) {
                shouldInsert = rangeValue !== size;
                firstPassDone = true;
            } else if (endIndex >= rangeStart || size === rangeValue) sizeTree = $ed43cc03b55b9961$var$remove(sizeTree, rangeStart);
            if (rangeEnd > endIndex && endIndex >= rangeStart) {
                if (rangeValue !== size) sizeTree = $ed43cc03b55b9961$var$insert(sizeTree, endIndex + 1, rangeValue);
            }
        }
        if (shouldInsert) sizeTree = $ed43cc03b55b9961$var$insert(sizeTree, startIndex, size);
    }
    return [
        sizeTree,
        syncStart
    ];
}
function $ed43cc03b55b9961$var$initialSizeState() {
    return {
        offsetTree: [],
        sizeTree: $ed43cc03b55b9961$var$newTree(),
        groupOffsetTree: $ed43cc03b55b9961$var$newTree(),
        lastIndex: 0,
        lastOffset: 0,
        lastSize: 0,
        groupIndices: []
    };
}
function $ed43cc03b55b9961$var$indexComparator({ index: itemIndex }, index) {
    return index === itemIndex ? 0 : index < itemIndex ? -1 : 1;
}
function $ed43cc03b55b9961$var$offsetComparator({ offset: itemOffset }, offset) {
    return offset === itemOffset ? 0 : offset < itemOffset ? -1 : 1;
}
function $ed43cc03b55b9961$var$offsetPointParser(point) {
    return {
        index: point.index,
        value: point
    };
}
function $ed43cc03b55b9961$var$rangesWithinOffsets(tree, startOffset, endOffset, minStartIndex = 0) {
    if (minStartIndex > 0) startOffset = Math.max(startOffset, $ed43cc03b55b9961$var$findClosestSmallerOrEqual(tree, minStartIndex, $ed43cc03b55b9961$var$indexComparator).offset);
    return $ed43cc03b55b9961$var$arrayToRanges($ed43cc03b55b9961$var$findRange(tree, startOffset, endOffset, $ed43cc03b55b9961$var$offsetComparator), $ed43cc03b55b9961$var$offsetPointParser);
}
function $ed43cc03b55b9961$var$createOffsetTree(prevOffsetTree, syncStart, sizeTree, gap) {
    let offsetTree = prevOffsetTree;
    let prevIndex = 0;
    let prevSize = 0;
    let prevOffset = 0;
    let startIndex = 0;
    if (syncStart !== 0) {
        startIndex = $ed43cc03b55b9961$var$findIndexOfClosestSmallerOrEqual(offsetTree, syncStart - 1, $ed43cc03b55b9961$var$indexComparator);
        const offsetInfo = offsetTree[startIndex];
        prevOffset = offsetInfo.offset;
        const kv = $ed43cc03b55b9961$var$findMaxKeyValue(sizeTree, syncStart - 1);
        prevIndex = kv[0];
        prevSize = kv[1];
        if (offsetTree.length && offsetTree[startIndex].size === $ed43cc03b55b9961$var$findMaxKeyValue(sizeTree, syncStart)[1]) startIndex -= 1;
        offsetTree = offsetTree.slice(0, startIndex + 1);
    } else offsetTree = [];
    for (const { start: startIndex2, value: value } of $ed43cc03b55b9961$var$rangesWithin(sizeTree, syncStart, Infinity)){
        const indexOffset = startIndex2 - prevIndex;
        const aOffset = indexOffset * prevSize + prevOffset + indexOffset * gap;
        offsetTree.push({
            offset: aOffset,
            size: value,
            index: startIndex2
        });
        prevIndex = startIndex2;
        prevOffset = aOffset;
        prevSize = value;
    }
    return {
        offsetTree: offsetTree,
        lastIndex: prevIndex,
        lastOffset: prevOffset,
        lastSize: prevSize
    };
}
function $ed43cc03b55b9961$var$sizeStateReducer(state, [ranges, groupIndices, log, gap]) {
    if (ranges.length > 0) log("received item sizes", ranges, $ed43cc03b55b9961$export$243e62d78d3b544d.DEBUG);
    const sizeTree = state.sizeTree;
    let newSizeTree = sizeTree;
    let syncStart = 0;
    if (groupIndices.length > 0 && $ed43cc03b55b9961$var$empty(sizeTree) && ranges.length === 2) {
        const groupSize = ranges[0].size;
        const itemSize = ranges[1].size;
        newSizeTree = groupIndices.reduce((tree, groupIndex)=>{
            return $ed43cc03b55b9961$var$insert($ed43cc03b55b9961$var$insert(tree, groupIndex, groupSize), groupIndex + 1, itemSize);
        }, newSizeTree);
    } else [newSizeTree, syncStart] = $ed43cc03b55b9961$var$insertRanges(newSizeTree, ranges);
    if (newSizeTree === sizeTree) return state;
    const { offsetTree: newOffsetTree, lastIndex: lastIndex, lastSize: lastSize, lastOffset: lastOffset } = $ed43cc03b55b9961$var$createOffsetTree(state.offsetTree, syncStart, newSizeTree, gap);
    return {
        sizeTree: newSizeTree,
        offsetTree: newOffsetTree,
        lastIndex: lastIndex,
        lastOffset: lastOffset,
        lastSize: lastSize,
        groupOffsetTree: groupIndices.reduce((tree, index)=>{
            return $ed43cc03b55b9961$var$insert(tree, index, $ed43cc03b55b9961$var$offsetOf(index, newOffsetTree, gap));
        }, $ed43cc03b55b9961$var$newTree()),
        groupIndices: groupIndices
    };
}
function $ed43cc03b55b9961$var$offsetOf(index, tree, gap) {
    if (tree.length === 0) return 0;
    const { offset: offset, index: startIndex, size: size } = $ed43cc03b55b9961$var$findClosestSmallerOrEqual(tree, index, $ed43cc03b55b9961$var$indexComparator);
    const itemCount = index - startIndex;
    const top = size * itemCount + (itemCount - 1) * gap + offset;
    return top > 0 ? top + gap : top;
}
function $ed43cc03b55b9961$var$isGroupLocation(location) {
    return typeof location.groupIndex !== "undefined";
}
function $ed43cc03b55b9961$var$originalIndexFromLocation(location, sizes, lastIndex) {
    if ($ed43cc03b55b9961$var$isGroupLocation(location)) return sizes.groupIndices[location.groupIndex] + 1;
    else {
        const numericIndex = location.index === "LAST" ? lastIndex : location.index;
        let result = $ed43cc03b55b9961$var$originalIndexFromItemIndex(numericIndex, sizes);
        result = Math.max(0, result, Math.min(lastIndex, result));
        return result;
    }
}
function $ed43cc03b55b9961$var$originalIndexFromItemIndex(itemIndex, sizes) {
    if (!$ed43cc03b55b9961$var$hasGroups(sizes)) return itemIndex;
    let groupOffset = 0;
    while(sizes.groupIndices[groupOffset] <= itemIndex + groupOffset)groupOffset++;
    return itemIndex + groupOffset;
}
function $ed43cc03b55b9961$var$hasGroups(sizes) {
    return !$ed43cc03b55b9961$var$empty(sizes.groupOffsetTree);
}
function $ed43cc03b55b9961$var$sizeTreeToRanges(sizeTree) {
    return $ed43cc03b55b9961$var$walk(sizeTree).map(({ k: startIndex, v: size }, index, sizeArray)=>{
        const nextSize = sizeArray[index + 1];
        const endIndex = nextSize ? nextSize.k - 1 : Infinity;
        return {
            startIndex: startIndex,
            endIndex: endIndex,
            size: size
        };
    });
}
const $ed43cc03b55b9961$var$SIZE_MAP = {
    offsetHeight: "height",
    offsetWidth: "width"
};
const $ed43cc03b55b9961$var$sizeSystem = $ed43cc03b55b9961$var$system(([{ log: log }, { recalcInProgress: recalcInProgress }])=>{
    const sizeRanges = $ed43cc03b55b9961$var$stream();
    const totalCount = $ed43cc03b55b9961$var$stream();
    const statefulTotalCount = $ed43cc03b55b9961$var$statefulStreamFromEmitter(totalCount, 0);
    const unshiftWith = $ed43cc03b55b9961$var$stream();
    const shiftWith = $ed43cc03b55b9961$var$stream();
    const firstItemIndex = $ed43cc03b55b9961$var$statefulStream(0);
    const groupIndices = $ed43cc03b55b9961$var$statefulStream([]);
    const fixedItemSize = $ed43cc03b55b9961$var$statefulStream(void 0);
    const defaultItemSize = $ed43cc03b55b9961$var$statefulStream(void 0);
    const itemSize = $ed43cc03b55b9961$var$statefulStream((el, field)=>$ed43cc03b55b9961$var$correctItemSize(el, $ed43cc03b55b9961$var$SIZE_MAP[field]));
    const data = $ed43cc03b55b9961$var$statefulStream(void 0);
    const gap = $ed43cc03b55b9961$var$statefulStream(0);
    const initial = $ed43cc03b55b9961$var$initialSizeState();
    const sizes = $ed43cc03b55b9961$var$statefulStreamFromEmitter($ed43cc03b55b9961$var$pipe(sizeRanges, $ed43cc03b55b9961$var$withLatestFrom(groupIndices, log, gap), $ed43cc03b55b9961$var$scan($ed43cc03b55b9961$var$sizeStateReducer, initial), $ed43cc03b55b9961$var$distinctUntilChanged()), initial);
    const prevGroupIndices = $ed43cc03b55b9961$var$statefulStreamFromEmitter($ed43cc03b55b9961$var$pipe(groupIndices, $ed43cc03b55b9961$var$distinctUntilChanged(), $ed43cc03b55b9961$var$scan((prev, curr)=>({
            prev: prev.current,
            current: curr
        }), {
        prev: [],
        current: []
    }), $ed43cc03b55b9961$var$map(({ prev: prev })=>prev)), []);
    $ed43cc03b55b9961$var$connect($ed43cc03b55b9961$var$pipe(groupIndices, $ed43cc03b55b9961$var$filter((indexes)=>indexes.length > 0), $ed43cc03b55b9961$var$withLatestFrom(sizes, gap), $ed43cc03b55b9961$var$map(([groupIndices2, sizes2, gap2])=>{
        const groupOffsetTree = groupIndices2.reduce((tree, index, idx)=>{
            return $ed43cc03b55b9961$var$insert(tree, index, $ed43cc03b55b9961$var$offsetOf(index, sizes2.offsetTree, gap2) || idx);
        }, $ed43cc03b55b9961$var$newTree());
        return {
            ...sizes2,
            groupIndices: groupIndices2,
            groupOffsetTree: groupOffsetTree
        };
    })), sizes);
    $ed43cc03b55b9961$var$connect($ed43cc03b55b9961$var$pipe(totalCount, $ed43cc03b55b9961$var$withLatestFrom(sizes), $ed43cc03b55b9961$var$filter(([totalCount2, { lastIndex: lastIndex }])=>{
        return totalCount2 < lastIndex;
    }), $ed43cc03b55b9961$var$map(([totalCount2, { lastIndex: lastIndex, lastSize: lastSize }])=>{
        return [
            {
                startIndex: totalCount2,
                endIndex: lastIndex,
                size: lastSize
            }
        ];
    })), sizeRanges);
    $ed43cc03b55b9961$var$connect(fixedItemSize, defaultItemSize);
    const trackItemSizes = $ed43cc03b55b9961$var$statefulStreamFromEmitter($ed43cc03b55b9961$var$pipe(fixedItemSize, $ed43cc03b55b9961$var$map((size)=>size === void 0)), true);
    $ed43cc03b55b9961$var$connect($ed43cc03b55b9961$var$pipe(defaultItemSize, $ed43cc03b55b9961$var$filter((value)=>{
        return value !== void 0 && $ed43cc03b55b9961$var$empty($ed43cc03b55b9961$var$getValue(sizes).sizeTree);
    }), $ed43cc03b55b9961$var$map((size)=>[
            {
                startIndex: 0,
                endIndex: 0,
                size: size
            }
        ])), sizeRanges);
    const listRefresh = $ed43cc03b55b9961$var$streamFromEmitter($ed43cc03b55b9961$var$pipe(sizeRanges, $ed43cc03b55b9961$var$withLatestFrom(sizes), $ed43cc03b55b9961$var$scan(({ sizes: oldSizes }, [_, newSizes])=>{
        return {
            changed: newSizes !== oldSizes,
            sizes: newSizes
        };
    }, {
        changed: false,
        sizes: initial
    }), $ed43cc03b55b9961$var$map((value)=>value.changed)));
    $ed43cc03b55b9961$var$subscribe($ed43cc03b55b9961$var$pipe(firstItemIndex, $ed43cc03b55b9961$var$scan((prev, next)=>{
        return {
            diff: prev.prev - next,
            prev: next
        };
    }, {
        diff: 0,
        prev: 0
    }), $ed43cc03b55b9961$var$map((val)=>val.diff)), (offset)=>{
        const { groupIndices: groupIndices2 } = $ed43cc03b55b9961$var$getValue(sizes);
        if (offset > 0) {
            $ed43cc03b55b9961$var$publish(recalcInProgress, true);
            $ed43cc03b55b9961$var$publish(unshiftWith, offset + $ed43cc03b55b9961$var$affectedGroupCount(offset, groupIndices2));
        } else if (offset < 0) {
            const prevGroupIndicesValue = $ed43cc03b55b9961$var$getValue(prevGroupIndices);
            if (prevGroupIndicesValue.length > 0) offset -= $ed43cc03b55b9961$var$affectedGroupCount(-offset, prevGroupIndicesValue);
            $ed43cc03b55b9961$var$publish(shiftWith, offset);
        }
    });
    $ed43cc03b55b9961$var$subscribe($ed43cc03b55b9961$var$pipe(firstItemIndex, $ed43cc03b55b9961$var$withLatestFrom(log)), ([index, log2])=>{
        if (index < 0) log2("`firstItemIndex` prop should not be set to less than zero. If you don't know the total count, just use a very high value", {
            firstItemIndex: firstItemIndex
        }, $ed43cc03b55b9961$export$243e62d78d3b544d.ERROR);
    });
    const beforeUnshiftWith = $ed43cc03b55b9961$var$streamFromEmitter(unshiftWith);
    $ed43cc03b55b9961$var$connect($ed43cc03b55b9961$var$pipe(unshiftWith, $ed43cc03b55b9961$var$withLatestFrom(sizes), $ed43cc03b55b9961$var$map(([unshiftWith2, sizes2])=>{
        const groupedMode = sizes2.groupIndices.length > 0;
        const initialRanges = [];
        const defaultSize = sizes2.lastSize;
        if (groupedMode) {
            const firstGroupSize = $ed43cc03b55b9961$var$find(sizes2.sizeTree, 0);
            let prependedGroupItemsCount = 0;
            let groupIndex = 0;
            while(prependedGroupItemsCount < unshiftWith2){
                const theGroupIndex = sizes2.groupIndices[groupIndex];
                const groupItemCount = sizes2.groupIndices.length === groupIndex + 1 ? Infinity : sizes2.groupIndices[groupIndex + 1] - theGroupIndex - 1;
                initialRanges.push({
                    startIndex: theGroupIndex,
                    endIndex: theGroupIndex,
                    size: firstGroupSize
                });
                initialRanges.push({
                    startIndex: theGroupIndex + 1,
                    endIndex: theGroupIndex + 1 + groupItemCount - 1,
                    size: defaultSize
                });
                groupIndex++;
                prependedGroupItemsCount += groupItemCount + 1;
            }
            const sizeTreeKV = $ed43cc03b55b9961$var$walk(sizes2.sizeTree);
            const firstGroupIsExpanded = prependedGroupItemsCount !== unshiftWith2;
            if (firstGroupIsExpanded) sizeTreeKV.shift();
            return sizeTreeKV.reduce((acc, { k: index, v: size })=>{
                let ranges = acc.ranges;
                if (acc.prevSize !== 0) ranges = [
                    ...acc.ranges,
                    {
                        startIndex: acc.prevIndex,
                        endIndex: index + unshiftWith2 - 1,
                        size: acc.prevSize
                    }
                ];
                return {
                    ranges: ranges,
                    prevIndex: index + unshiftWith2,
                    prevSize: size
                };
            }, {
                ranges: initialRanges,
                prevIndex: unshiftWith2,
                prevSize: 0
            }).ranges;
        }
        return $ed43cc03b55b9961$var$walk(sizes2.sizeTree).reduce((acc, { k: index, v: size })=>{
            return {
                ranges: [
                    ...acc.ranges,
                    {
                        startIndex: acc.prevIndex,
                        endIndex: index + unshiftWith2 - 1,
                        size: acc.prevSize
                    }
                ],
                prevIndex: index + unshiftWith2,
                prevSize: size
            };
        }, {
            ranges: [],
            prevIndex: 0,
            prevSize: defaultSize
        }).ranges;
    })), sizeRanges);
    const shiftWithOffset = $ed43cc03b55b9961$var$streamFromEmitter($ed43cc03b55b9961$var$pipe(shiftWith, $ed43cc03b55b9961$var$withLatestFrom(sizes, gap), $ed43cc03b55b9961$var$map(([shiftWith2, { offsetTree: offsetTree }, gap2])=>{
        const newFirstItemIndex = -shiftWith2;
        return $ed43cc03b55b9961$var$offsetOf(newFirstItemIndex, offsetTree, gap2);
    })));
    $ed43cc03b55b9961$var$connect($ed43cc03b55b9961$var$pipe(shiftWith, $ed43cc03b55b9961$var$withLatestFrom(sizes, gap), $ed43cc03b55b9961$var$map(([shiftWith2, sizes2, gap2])=>{
        const groupedMode = sizes2.groupIndices.length > 0;
        if (groupedMode) {
            if ($ed43cc03b55b9961$var$empty(sizes2.sizeTree)) return sizes2;
            let newSizeTree = $ed43cc03b55b9961$var$newTree();
            const prevGroupIndicesValue = $ed43cc03b55b9961$var$getValue(prevGroupIndices);
            let removedItemsCount = 0;
            let groupIndex = 0;
            let groupOffset = 0;
            while(removedItemsCount < -shiftWith2){
                groupOffset = prevGroupIndicesValue[groupIndex];
                const groupItemCount = prevGroupIndicesValue[groupIndex + 1] - groupOffset - 1;
                groupIndex++;
                removedItemsCount += groupItemCount + 1;
            }
            newSizeTree = $ed43cc03b55b9961$var$walk(sizes2.sizeTree).reduce((acc, { k: k, v: v })=>{
                return $ed43cc03b55b9961$var$insert(acc, Math.max(0, k + shiftWith2), v);
            }, newSizeTree);
            const aGroupIsShrunk = removedItemsCount !== -shiftWith2;
            if (aGroupIsShrunk) {
                const firstGroupSize = $ed43cc03b55b9961$var$find(sizes2.sizeTree, groupOffset);
                newSizeTree = $ed43cc03b55b9961$var$insert(newSizeTree, 0, firstGroupSize);
                const nextItemSize = $ed43cc03b55b9961$var$findMaxKeyValue(sizes2.sizeTree, -shiftWith2 + 1)[1];
                newSizeTree = $ed43cc03b55b9961$var$insert(newSizeTree, 1, nextItemSize);
            }
            return {
                ...sizes2,
                sizeTree: newSizeTree,
                ...$ed43cc03b55b9961$var$createOffsetTree(sizes2.offsetTree, 0, newSizeTree, gap2)
            };
        } else {
            const newSizeTree = $ed43cc03b55b9961$var$walk(sizes2.sizeTree).reduce((acc, { k: k, v: v })=>{
                return $ed43cc03b55b9961$var$insert(acc, Math.max(0, k + shiftWith2), v);
            }, $ed43cc03b55b9961$var$newTree());
            return {
                ...sizes2,
                sizeTree: newSizeTree,
                ...$ed43cc03b55b9961$var$createOffsetTree(sizes2.offsetTree, 0, newSizeTree, gap2)
            };
        }
    })), sizes);
    return {
        data: // input
        data,
        totalCount: totalCount,
        sizeRanges: sizeRanges,
        groupIndices: groupIndices,
        defaultItemSize: defaultItemSize,
        fixedItemSize: fixedItemSize,
        unshiftWith: unshiftWith,
        shiftWith: shiftWith,
        shiftWithOffset: shiftWithOffset,
        beforeUnshiftWith: beforeUnshiftWith,
        firstItemIndex: firstItemIndex,
        gap: gap,
        sizes: // output
        sizes,
        listRefresh: listRefresh,
        statefulTotalCount: statefulTotalCount,
        trackItemSizes: trackItemSizes,
        itemSize: itemSize
    };
}, $ed43cc03b55b9961$var$tup($ed43cc03b55b9961$var$loggerSystem, $ed43cc03b55b9961$var$recalcSystem), {
    singleton: true
});
const $ed43cc03b55b9961$var$SUPPORTS_SCROLL_TO_OPTIONS = typeof document !== "undefined" && "scrollBehavior" in document.documentElement.style;
function $ed43cc03b55b9961$var$normalizeIndexLocation(location) {
    const result = typeof location === "number" ? {
        index: location
    } : location;
    if (!result.align) result.align = "start";
    if (!result.behavior || !$ed43cc03b55b9961$var$SUPPORTS_SCROLL_TO_OPTIONS) result.behavior = "auto";
    if (!result.offset) result.offset = 0;
    return result;
}
const $ed43cc03b55b9961$var$scrollToIndexSystem = $ed43cc03b55b9961$var$system(([{ sizes: sizes, totalCount: totalCount, listRefresh: listRefresh, gap: gap }, { scrollingInProgress: scrollingInProgress, viewportHeight: viewportHeight, scrollTo: scrollTo, smoothScrollTargetReached: smoothScrollTargetReached, headerHeight: headerHeight, footerHeight: footerHeight, fixedHeaderHeight: fixedHeaderHeight, fixedFooterHeight: fixedFooterHeight }, { log: log }])=>{
    const scrollToIndex = $ed43cc03b55b9961$var$stream();
    const topListHeight = $ed43cc03b55b9961$var$statefulStream(0);
    let unsubscribeNextListRefresh = null;
    let cleartTimeoutRef = null;
    let unsubscribeListRefresh = null;
    function cleanup() {
        if (unsubscribeNextListRefresh) {
            unsubscribeNextListRefresh();
            unsubscribeNextListRefresh = null;
        }
        if (unsubscribeListRefresh) {
            unsubscribeListRefresh();
            unsubscribeListRefresh = null;
        }
        if (cleartTimeoutRef) {
            clearTimeout(cleartTimeoutRef);
            cleartTimeoutRef = null;
        }
        $ed43cc03b55b9961$var$publish(scrollingInProgress, false);
    }
    $ed43cc03b55b9961$var$connect($ed43cc03b55b9961$var$pipe(scrollToIndex, $ed43cc03b55b9961$var$withLatestFrom(sizes, viewportHeight, totalCount, topListHeight, headerHeight, footerHeight, log), $ed43cc03b55b9961$var$withLatestFrom(gap, fixedHeaderHeight, fixedFooterHeight), $ed43cc03b55b9961$var$map(([[location, sizes2, viewportHeight2, totalCount2, topListHeight2, headerHeight2, footerHeight2, log2], gap2, fixedHeaderHeight2, fixedFooterHeight2])=>{
        const normalLocation = $ed43cc03b55b9961$var$normalizeIndexLocation(location);
        const { align: align, behavior: behavior, offset: offset } = normalLocation;
        const lastIndex = totalCount2 - 1;
        const index = $ed43cc03b55b9961$var$originalIndexFromLocation(normalLocation, sizes2, lastIndex);
        let top = $ed43cc03b55b9961$var$offsetOf(index, sizes2.offsetTree, gap2) + headerHeight2;
        if (align === "end") {
            top += fixedHeaderHeight2 + $ed43cc03b55b9961$var$findMaxKeyValue(sizes2.sizeTree, index)[1] - viewportHeight2 + fixedFooterHeight2;
            if (index === lastIndex) top += footerHeight2;
        } else if (align === "center") top += (fixedHeaderHeight2 + $ed43cc03b55b9961$var$findMaxKeyValue(sizes2.sizeTree, index)[1] - viewportHeight2 + fixedFooterHeight2) / 2;
        else top -= topListHeight2;
        if (offset) top += offset;
        const retry = (listChanged)=>{
            cleanup();
            if (listChanged) {
                log2("retrying to scroll to", {
                    location: location
                }, $ed43cc03b55b9961$export$243e62d78d3b544d.DEBUG);
                $ed43cc03b55b9961$var$publish(scrollToIndex, location);
            } else log2("list did not change, scroll successful", {}, $ed43cc03b55b9961$export$243e62d78d3b544d.DEBUG);
        };
        cleanup();
        if (behavior === "smooth") {
            let listChanged = false;
            unsubscribeListRefresh = $ed43cc03b55b9961$var$subscribe(listRefresh, (changed)=>{
                listChanged = listChanged || changed;
            });
            unsubscribeNextListRefresh = $ed43cc03b55b9961$var$handleNext(smoothScrollTargetReached, ()=>{
                retry(listChanged);
            });
        } else unsubscribeNextListRefresh = $ed43cc03b55b9961$var$handleNext($ed43cc03b55b9961$var$pipe(listRefresh, $ed43cc03b55b9961$var$watchChangesFor(150)), retry);
        cleartTimeoutRef = setTimeout(()=>{
            cleanup();
        }, 1200);
        $ed43cc03b55b9961$var$publish(scrollingInProgress, true);
        log2("scrolling from index to", {
            index: index,
            top: top,
            behavior: behavior
        }, $ed43cc03b55b9961$export$243e62d78d3b544d.DEBUG);
        return {
            top: top,
            behavior: behavior
        };
    })), scrollTo);
    return {
        scrollToIndex: scrollToIndex,
        topListHeight: topListHeight
    };
}, $ed43cc03b55b9961$var$tup($ed43cc03b55b9961$var$sizeSystem, $ed43cc03b55b9961$var$domIOSystem, $ed43cc03b55b9961$var$loggerSystem), {
    singleton: true
});
function $ed43cc03b55b9961$var$watchChangesFor(limit) {
    return (done)=>{
        const timeoutRef = setTimeout(()=>{
            done(false);
        }, limit);
        return (value)=>{
            if (value) {
                done(true);
                clearTimeout(timeoutRef);
            }
        };
    };
}
const $ed43cc03b55b9961$var$UP = "up";
const $ed43cc03b55b9961$var$DOWN = "down";
const $ed43cc03b55b9961$var$NONE$1 = "none";
const $ed43cc03b55b9961$var$INITIAL_BOTTOM_STATE = {
    atBottom: false,
    notAtBottomBecause: "NOT_SHOWING_LAST_ITEM",
    state: {
        offsetBottom: 0,
        scrollTop: 0,
        viewportHeight: 0,
        scrollHeight: 0
    }
};
const $ed43cc03b55b9961$var$DEFAULT_AT_TOP_THRESHOLD = 0;
const $ed43cc03b55b9961$var$stateFlagsSystem = $ed43cc03b55b9961$var$system(([{ scrollContainerState: scrollContainerState, scrollTop: scrollTop, viewportHeight: viewportHeight, headerHeight: headerHeight, footerHeight: footerHeight, scrollBy: scrollBy }])=>{
    const isAtBottom = $ed43cc03b55b9961$var$statefulStream(false);
    const isAtTop = $ed43cc03b55b9961$var$statefulStream(true);
    const atBottomStateChange = $ed43cc03b55b9961$var$stream();
    const atTopStateChange = $ed43cc03b55b9961$var$stream();
    const atBottomThreshold = $ed43cc03b55b9961$var$statefulStream(4);
    const atTopThreshold = $ed43cc03b55b9961$var$statefulStream($ed43cc03b55b9961$var$DEFAULT_AT_TOP_THRESHOLD);
    const isScrolling = $ed43cc03b55b9961$var$statefulStreamFromEmitter($ed43cc03b55b9961$var$pipe($ed43cc03b55b9961$var$merge($ed43cc03b55b9961$var$pipe($ed43cc03b55b9961$var$duc(scrollTop), $ed43cc03b55b9961$var$skip(1), $ed43cc03b55b9961$var$mapTo(true)), $ed43cc03b55b9961$var$pipe($ed43cc03b55b9961$var$duc(scrollTop), $ed43cc03b55b9961$var$skip(1), $ed43cc03b55b9961$var$mapTo(false), $ed43cc03b55b9961$var$debounceTime(100))), $ed43cc03b55b9961$var$distinctUntilChanged()), false);
    const isScrollingBy = $ed43cc03b55b9961$var$statefulStreamFromEmitter($ed43cc03b55b9961$var$pipe($ed43cc03b55b9961$var$merge($ed43cc03b55b9961$var$pipe(scrollBy, $ed43cc03b55b9961$var$mapTo(true)), $ed43cc03b55b9961$var$pipe(scrollBy, $ed43cc03b55b9961$var$mapTo(false), $ed43cc03b55b9961$var$debounceTime(200))), $ed43cc03b55b9961$var$distinctUntilChanged()), false);
    $ed43cc03b55b9961$var$connect($ed43cc03b55b9961$var$pipe($ed43cc03b55b9961$var$combineLatest($ed43cc03b55b9961$var$duc(scrollTop), $ed43cc03b55b9961$var$duc(atTopThreshold)), $ed43cc03b55b9961$var$map(([top, atTopThreshold2])=>top <= atTopThreshold2), $ed43cc03b55b9961$var$distinctUntilChanged()), isAtTop);
    $ed43cc03b55b9961$var$connect($ed43cc03b55b9961$var$pipe(isAtTop, $ed43cc03b55b9961$var$throttleTime(50)), atTopStateChange);
    const atBottomState = $ed43cc03b55b9961$var$streamFromEmitter($ed43cc03b55b9961$var$pipe($ed43cc03b55b9961$var$combineLatest(scrollContainerState, $ed43cc03b55b9961$var$duc(viewportHeight), $ed43cc03b55b9961$var$duc(headerHeight), $ed43cc03b55b9961$var$duc(footerHeight), $ed43cc03b55b9961$var$duc(atBottomThreshold)), $ed43cc03b55b9961$var$scan((current, [{ scrollTop: scrollTop2, scrollHeight: scrollHeight }, viewportHeight2, _headerHeight, _footerHeight, atBottomThreshold2])=>{
        const isAtBottom2 = scrollTop2 + viewportHeight2 - scrollHeight > -atBottomThreshold2;
        const state = {
            viewportHeight: viewportHeight2,
            scrollTop: scrollTop2,
            scrollHeight: scrollHeight
        };
        if (isAtBottom2) {
            let atBottomBecause;
            let scrollTopDelta;
            if (scrollTop2 > current.state.scrollTop) {
                atBottomBecause = "SCROLLED_DOWN";
                scrollTopDelta = current.state.scrollTop - scrollTop2;
            } else {
                atBottomBecause = "SIZE_DECREASED";
                scrollTopDelta = current.state.scrollTop - scrollTop2 || current.scrollTopDelta;
            }
            return {
                atBottom: true,
                state: state,
                atBottomBecause: atBottomBecause,
                scrollTopDelta: scrollTopDelta
            };
        }
        let notAtBottomBecause;
        if (state.scrollHeight > current.state.scrollHeight) notAtBottomBecause = "SIZE_INCREASED";
        else if (viewportHeight2 < current.state.viewportHeight) notAtBottomBecause = "VIEWPORT_HEIGHT_DECREASING";
        else if (scrollTop2 < current.state.scrollTop) notAtBottomBecause = "SCROLLING_UPWARDS";
        else notAtBottomBecause = "NOT_FULLY_SCROLLED_TO_LAST_ITEM_BOTTOM";
        return {
            atBottom: false,
            notAtBottomBecause: notAtBottomBecause,
            state: state
        };
    }, $ed43cc03b55b9961$var$INITIAL_BOTTOM_STATE), $ed43cc03b55b9961$var$distinctUntilChanged((prev, next)=>{
        return prev && prev.atBottom === next.atBottom;
    })));
    const lastJumpDueToItemResize = $ed43cc03b55b9961$var$statefulStreamFromEmitter($ed43cc03b55b9961$var$pipe(scrollContainerState, $ed43cc03b55b9961$var$scan((current, { scrollTop: scrollTop2, scrollHeight: scrollHeight, viewportHeight: viewportHeight2 })=>{
        if (!$ed43cc03b55b9961$var$approximatelyEqual(current.scrollHeight, scrollHeight)) {
            const atBottom = scrollHeight - (scrollTop2 + viewportHeight2) < 1;
            if (current.scrollTop !== scrollTop2 && atBottom) return {
                scrollHeight: scrollHeight,
                scrollTop: scrollTop2,
                jump: current.scrollTop - scrollTop2,
                changed: true
            };
            else return {
                scrollHeight: scrollHeight,
                scrollTop: scrollTop2,
                jump: 0,
                changed: true
            };
        } else return {
            scrollTop: scrollTop2,
            scrollHeight: scrollHeight,
            jump: 0,
            changed: false
        };
    }, {
        scrollHeight: 0,
        jump: 0,
        scrollTop: 0,
        changed: false
    }), $ed43cc03b55b9961$var$filter((value)=>value.changed), $ed43cc03b55b9961$var$map((value)=>value.jump)), 0);
    $ed43cc03b55b9961$var$connect($ed43cc03b55b9961$var$pipe(atBottomState, $ed43cc03b55b9961$var$map((state)=>state.atBottom)), isAtBottom);
    $ed43cc03b55b9961$var$connect($ed43cc03b55b9961$var$pipe(isAtBottom, $ed43cc03b55b9961$var$throttleTime(50)), atBottomStateChange);
    const scrollDirection = $ed43cc03b55b9961$var$statefulStream($ed43cc03b55b9961$var$DOWN);
    $ed43cc03b55b9961$var$connect($ed43cc03b55b9961$var$pipe(scrollContainerState, $ed43cc03b55b9961$var$map(({ scrollTop: scrollTop2 })=>scrollTop2), $ed43cc03b55b9961$var$distinctUntilChanged(), $ed43cc03b55b9961$var$scan((acc, scrollTop2)=>{
        if ($ed43cc03b55b9961$var$getValue(isScrollingBy)) return {
            direction: acc.direction,
            prevScrollTop: scrollTop2
        };
        return {
            direction: scrollTop2 < acc.prevScrollTop ? $ed43cc03b55b9961$var$UP : $ed43cc03b55b9961$var$DOWN,
            prevScrollTop: scrollTop2
        };
    }, {
        direction: $ed43cc03b55b9961$var$DOWN,
        prevScrollTop: 0
    }), $ed43cc03b55b9961$var$map((value)=>value.direction)), scrollDirection);
    $ed43cc03b55b9961$var$connect($ed43cc03b55b9961$var$pipe(scrollContainerState, $ed43cc03b55b9961$var$throttleTime(50), $ed43cc03b55b9961$var$mapTo($ed43cc03b55b9961$var$NONE$1)), scrollDirection);
    const scrollVelocity = $ed43cc03b55b9961$var$statefulStream(0);
    $ed43cc03b55b9961$var$connect($ed43cc03b55b9961$var$pipe(isScrolling, $ed43cc03b55b9961$var$filter((value)=>!value), // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    $ed43cc03b55b9961$var$mapTo(0)), scrollVelocity);
    $ed43cc03b55b9961$var$connect($ed43cc03b55b9961$var$pipe(scrollTop, $ed43cc03b55b9961$var$throttleTime(100), $ed43cc03b55b9961$var$withLatestFrom(isScrolling), $ed43cc03b55b9961$var$filter(([_, isScrolling2])=>!!isScrolling2), $ed43cc03b55b9961$var$scan(([_, prev], [next])=>[
            prev,
            next
        ], [
        0,
        0
    ]), $ed43cc03b55b9961$var$map(([prev, next])=>next - prev)), scrollVelocity);
    return {
        isScrolling: isScrolling,
        isAtTop: isAtTop,
        isAtBottom: isAtBottom,
        atBottomState: atBottomState,
        atTopStateChange: atTopStateChange,
        atBottomStateChange: atBottomStateChange,
        scrollDirection: scrollDirection,
        atBottomThreshold: atBottomThreshold,
        atTopThreshold: atTopThreshold,
        scrollVelocity: scrollVelocity,
        lastJumpDueToItemResize: lastJumpDueToItemResize
    };
}, $ed43cc03b55b9961$var$tup($ed43cc03b55b9961$var$domIOSystem));
const $ed43cc03b55b9961$var$propsReadySystem = $ed43cc03b55b9961$var$system(([{ log: log }])=>{
    const propsReady = $ed43cc03b55b9961$var$statefulStream(false);
    const didMount = $ed43cc03b55b9961$var$streamFromEmitter($ed43cc03b55b9961$var$pipe(propsReady, $ed43cc03b55b9961$var$filter((ready)=>ready), $ed43cc03b55b9961$var$distinctUntilChanged()));
    $ed43cc03b55b9961$var$subscribe(propsReady, (value)=>{
        value && $ed43cc03b55b9961$var$getValue(log)("props updated", {}, $ed43cc03b55b9961$export$243e62d78d3b544d.DEBUG);
    });
    return {
        propsReady: propsReady,
        didMount: didMount
    };
}, $ed43cc03b55b9961$var$tup($ed43cc03b55b9961$var$loggerSystem), {
    singleton: true
});
function $ed43cc03b55b9961$var$skipFrames(frameCount, callback) {
    if (frameCount == 0) callback();
    else requestAnimationFrame(()=>$ed43cc03b55b9961$var$skipFrames(frameCount - 1, callback));
}
function $ed43cc03b55b9961$var$getInitialTopMostItemIndexNumber(location, totalCount) {
    const lastIndex = totalCount - 1;
    const index = typeof location === "number" ? location : location.index === "LAST" ? lastIndex : location.index;
    return index;
}
const $ed43cc03b55b9961$var$initialTopMostItemIndexSystem = $ed43cc03b55b9961$var$system(([{ sizes: sizes, listRefresh: listRefresh, defaultItemSize: defaultItemSize }, { scrollTop: scrollTop }, { scrollToIndex: scrollToIndex }, { didMount: didMount }])=>{
    const scrolledToInitialItem = $ed43cc03b55b9961$var$statefulStream(true);
    const initialTopMostItemIndex = $ed43cc03b55b9961$var$statefulStream(0);
    const scrollScheduled = $ed43cc03b55b9961$var$statefulStream(false);
    $ed43cc03b55b9961$var$connect($ed43cc03b55b9961$var$pipe(didMount, $ed43cc03b55b9961$var$withLatestFrom(initialTopMostItemIndex), $ed43cc03b55b9961$var$filter(([_, location])=>!!location), $ed43cc03b55b9961$var$mapTo(false)), scrolledToInitialItem);
    $ed43cc03b55b9961$var$subscribe($ed43cc03b55b9961$var$pipe($ed43cc03b55b9961$var$combineLatest(listRefresh, didMount), $ed43cc03b55b9961$var$withLatestFrom(scrolledToInitialItem, sizes, defaultItemSize, scrollScheduled), $ed43cc03b55b9961$var$filter(([[, didMount2], scrolledToInitialItem2, { sizeTree: sizeTree }, defaultItemSize2, scrollScheduled2])=>{
        return didMount2 && (!$ed43cc03b55b9961$var$empty(sizeTree) || $ed43cc03b55b9961$var$isDefined(defaultItemSize2)) && !scrolledToInitialItem2 && !scrollScheduled2;
    }), $ed43cc03b55b9961$var$withLatestFrom(initialTopMostItemIndex)), ([, initialTopMostItemIndex2])=>{
        $ed43cc03b55b9961$var$publish(scrollScheduled, true);
        $ed43cc03b55b9961$var$skipFrames(3, ()=>{
            $ed43cc03b55b9961$var$handleNext(scrollTop, ()=>$ed43cc03b55b9961$var$publish(scrolledToInitialItem, true));
            $ed43cc03b55b9961$var$publish(scrollToIndex, initialTopMostItemIndex2);
        });
    });
    return {
        scrolledToInitialItem: scrolledToInitialItem,
        initialTopMostItemIndex: initialTopMostItemIndex
    };
}, $ed43cc03b55b9961$var$tup($ed43cc03b55b9961$var$sizeSystem, $ed43cc03b55b9961$var$domIOSystem, $ed43cc03b55b9961$var$scrollToIndexSystem, $ed43cc03b55b9961$var$propsReadySystem), {
    singleton: true
});
function $ed43cc03b55b9961$var$normalizeFollowOutput(follow) {
    if (!follow) return false;
    return follow === "smooth" ? "smooth" : "auto";
}
const $ed43cc03b55b9961$var$behaviorFromFollowOutput = (follow, isAtBottom)=>{
    if (typeof follow === "function") return $ed43cc03b55b9961$var$normalizeFollowOutput(follow(isAtBottom));
    return isAtBottom && $ed43cc03b55b9961$var$normalizeFollowOutput(follow);
};
const $ed43cc03b55b9961$var$followOutputSystem = $ed43cc03b55b9961$var$system(([{ totalCount: totalCount, listRefresh: listRefresh }, { isAtBottom: isAtBottom, atBottomState: atBottomState }, { scrollToIndex: scrollToIndex }, { scrolledToInitialItem: scrolledToInitialItem }, { propsReady: propsReady, didMount: didMount }, { log: log }, { scrollingInProgress: scrollingInProgress }])=>{
    const followOutput = $ed43cc03b55b9961$var$statefulStream(false);
    const autoscrollToBottom = $ed43cc03b55b9961$var$stream();
    let pendingScrollHandle = null;
    function scrollToBottom(followOutputBehavior) {
        $ed43cc03b55b9961$var$publish(scrollToIndex, {
            index: "LAST",
            align: "end",
            behavior: followOutputBehavior
        });
    }
    $ed43cc03b55b9961$var$subscribe($ed43cc03b55b9961$var$pipe($ed43cc03b55b9961$var$combineLatest($ed43cc03b55b9961$var$pipe($ed43cc03b55b9961$var$duc(totalCount), $ed43cc03b55b9961$var$skip(1)), didMount), $ed43cc03b55b9961$var$withLatestFrom($ed43cc03b55b9961$var$duc(followOutput), isAtBottom, scrolledToInitialItem, scrollingInProgress), $ed43cc03b55b9961$var$map(([[totalCount2, didMount2], followOutput2, isAtBottom2, scrolledToInitialItem2, scrollingInProgress2])=>{
        let shouldFollow = didMount2 && scrolledToInitialItem2;
        let followOutputBehavior = "auto";
        if (shouldFollow) {
            followOutputBehavior = $ed43cc03b55b9961$var$behaviorFromFollowOutput(followOutput2, isAtBottom2 || scrollingInProgress2);
            shouldFollow = shouldFollow && !!followOutputBehavior;
        }
        return {
            totalCount: totalCount2,
            shouldFollow: shouldFollow,
            followOutputBehavior: followOutputBehavior
        };
    }), $ed43cc03b55b9961$var$filter(({ shouldFollow: shouldFollow })=>shouldFollow)), ({ totalCount: totalCount2, followOutputBehavior: followOutputBehavior })=>{
        if (pendingScrollHandle) {
            pendingScrollHandle();
            pendingScrollHandle = null;
        }
        pendingScrollHandle = $ed43cc03b55b9961$var$handleNext(listRefresh, ()=>{
            $ed43cc03b55b9961$var$getValue(log)("following output to ", {
                totalCount: totalCount2
            }, $ed43cc03b55b9961$export$243e62d78d3b544d.DEBUG);
            scrollToBottom(followOutputBehavior);
            pendingScrollHandle = null;
        });
    });
    function trapNextSizeIncrease(followOutput2) {
        const cancel = $ed43cc03b55b9961$var$handleNext(atBottomState, (state)=>{
            if (followOutput2 && !state.atBottom && state.notAtBottomBecause === "SIZE_INCREASED" && !pendingScrollHandle) {
                $ed43cc03b55b9961$var$getValue(log)("scrolling to bottom due to increased size", {}, $ed43cc03b55b9961$export$243e62d78d3b544d.DEBUG);
                scrollToBottom("auto");
            }
        });
        setTimeout(cancel, 100);
    }
    $ed43cc03b55b9961$var$subscribe($ed43cc03b55b9961$var$pipe($ed43cc03b55b9961$var$combineLatest($ed43cc03b55b9961$var$duc(followOutput), totalCount, propsReady), $ed43cc03b55b9961$var$filter(([follow, , ready])=>follow && ready), $ed43cc03b55b9961$var$scan(({ value: value }, [, next])=>{
        return {
            refreshed: value === next,
            value: next
        };
    }, {
        refreshed: false,
        value: 0
    }), $ed43cc03b55b9961$var$filter(({ refreshed: refreshed })=>refreshed), $ed43cc03b55b9961$var$withLatestFrom(followOutput, totalCount)), ([, followOutput2])=>{
        trapNextSizeIncrease(followOutput2 !== false);
    });
    $ed43cc03b55b9961$var$subscribe(autoscrollToBottom, ()=>{
        trapNextSizeIncrease($ed43cc03b55b9961$var$getValue(followOutput) !== false);
    });
    $ed43cc03b55b9961$var$subscribe($ed43cc03b55b9961$var$combineLatest($ed43cc03b55b9961$var$duc(followOutput), atBottomState), ([followOutput2, state])=>{
        if (followOutput2 && !state.atBottom && state.notAtBottomBecause === "VIEWPORT_HEIGHT_DECREASING") scrollToBottom("auto");
    });
    return {
        followOutput: followOutput,
        autoscrollToBottom: autoscrollToBottom
    };
}, $ed43cc03b55b9961$var$tup($ed43cc03b55b9961$var$sizeSystem, $ed43cc03b55b9961$var$stateFlagsSystem, $ed43cc03b55b9961$var$scrollToIndexSystem, $ed43cc03b55b9961$var$initialTopMostItemIndexSystem, $ed43cc03b55b9961$var$propsReadySystem, $ed43cc03b55b9961$var$loggerSystem, $ed43cc03b55b9961$var$domIOSystem));
function $ed43cc03b55b9961$var$groupCountsToIndicesAndCount(counts) {
    return counts.reduce((acc, groupCount)=>{
        acc.groupIndices.push(acc.totalCount);
        acc.totalCount += groupCount + 1;
        return acc;
    }, {
        totalCount: 0,
        groupIndices: []
    });
}
const $ed43cc03b55b9961$var$groupedListSystem = $ed43cc03b55b9961$var$system(([{ totalCount: totalCount, groupIndices: groupIndices, sizes: sizes }, { scrollTop: scrollTop, headerHeight: headerHeight }])=>{
    const groupCounts = $ed43cc03b55b9961$var$stream();
    const topItemsIndexes = $ed43cc03b55b9961$var$stream();
    const groupIndicesAndCount = $ed43cc03b55b9961$var$streamFromEmitter($ed43cc03b55b9961$var$pipe(groupCounts, $ed43cc03b55b9961$var$map($ed43cc03b55b9961$var$groupCountsToIndicesAndCount)));
    $ed43cc03b55b9961$var$connect($ed43cc03b55b9961$var$pipe(groupIndicesAndCount, $ed43cc03b55b9961$var$map((value)=>value.totalCount)), totalCount);
    $ed43cc03b55b9961$var$connect($ed43cc03b55b9961$var$pipe(groupIndicesAndCount, $ed43cc03b55b9961$var$map((value)=>value.groupIndices)), groupIndices);
    $ed43cc03b55b9961$var$connect($ed43cc03b55b9961$var$pipe($ed43cc03b55b9961$var$combineLatest(scrollTop, sizes, headerHeight), $ed43cc03b55b9961$var$filter(([_, sizes2])=>$ed43cc03b55b9961$var$hasGroups(sizes2)), $ed43cc03b55b9961$var$map(([scrollTop2, state, headerHeight2])=>$ed43cc03b55b9961$var$findMaxKeyValue(state.groupOffsetTree, Math.max(scrollTop2 - headerHeight2, 0), "v")[0]), $ed43cc03b55b9961$var$distinctUntilChanged(), $ed43cc03b55b9961$var$map((index)=>[
            index
        ])), topItemsIndexes);
    return {
        groupCounts: groupCounts,
        topItemsIndexes: topItemsIndexes
    };
}, $ed43cc03b55b9961$var$tup($ed43cc03b55b9961$var$sizeSystem, $ed43cc03b55b9961$var$domIOSystem));
function $ed43cc03b55b9961$var$tupleComparator(prev, current) {
    return !!(prev && prev[0] === current[0] && prev[1] === current[1]);
}
function $ed43cc03b55b9961$var$rangeComparator(prev, next) {
    return !!(prev && prev.startIndex === next.startIndex && prev.endIndex === next.endIndex);
}
const $ed43cc03b55b9961$var$TOP = "top";
const $ed43cc03b55b9961$var$BOTTOM = "bottom";
const $ed43cc03b55b9961$var$NONE = "none";
function $ed43cc03b55b9961$var$getOverscan(overscan, end, direction) {
    if (typeof overscan === "number") return direction === $ed43cc03b55b9961$var$UP && end === $ed43cc03b55b9961$var$TOP || direction === $ed43cc03b55b9961$var$DOWN && end === $ed43cc03b55b9961$var$BOTTOM ? overscan : 0;
    else {
        if (direction === $ed43cc03b55b9961$var$UP) return end === $ed43cc03b55b9961$var$TOP ? overscan.main : overscan.reverse;
        else return end === $ed43cc03b55b9961$var$BOTTOM ? overscan.main : overscan.reverse;
    }
}
function $ed43cc03b55b9961$var$getViewportIncrease(value, end) {
    return typeof value === "number" ? value : value[end] || 0;
}
const $ed43cc03b55b9961$var$sizeRangeSystem = $ed43cc03b55b9961$var$system(([{ scrollTop: scrollTop, viewportHeight: viewportHeight, deviation: deviation, headerHeight: headerHeight, fixedHeaderHeight: fixedHeaderHeight }])=>{
    const listBoundary = $ed43cc03b55b9961$var$stream();
    const topListHeight = $ed43cc03b55b9961$var$statefulStream(0);
    const increaseViewportBy = $ed43cc03b55b9961$var$statefulStream(0);
    const overscan = $ed43cc03b55b9961$var$statefulStream(0);
    const visibleRange = $ed43cc03b55b9961$var$statefulStreamFromEmitter($ed43cc03b55b9961$var$pipe($ed43cc03b55b9961$var$combineLatest($ed43cc03b55b9961$var$duc(scrollTop), $ed43cc03b55b9961$var$duc(viewportHeight), $ed43cc03b55b9961$var$duc(headerHeight), $ed43cc03b55b9961$var$duc(listBoundary, $ed43cc03b55b9961$var$tupleComparator), $ed43cc03b55b9961$var$duc(overscan), $ed43cc03b55b9961$var$duc(topListHeight), $ed43cc03b55b9961$var$duc(fixedHeaderHeight), $ed43cc03b55b9961$var$duc(deviation), $ed43cc03b55b9961$var$duc(increaseViewportBy)), $ed43cc03b55b9961$var$map(([scrollTop2, viewportHeight2, headerHeight2, [listTop, listBottom], overscan2, topListHeight2, fixedHeaderHeight2, deviation2, increaseViewportBy2])=>{
        const top = scrollTop2 - deviation2;
        const stickyHeaderHeight = topListHeight2 + fixedHeaderHeight2;
        const headerVisible = Math.max(headerHeight2 - top, 0);
        let direction = $ed43cc03b55b9961$var$NONE;
        const topViewportAddition = $ed43cc03b55b9961$var$getViewportIncrease(increaseViewportBy2, $ed43cc03b55b9961$var$TOP);
        const bottomViewportAddition = $ed43cc03b55b9961$var$getViewportIncrease(increaseViewportBy2, $ed43cc03b55b9961$var$BOTTOM);
        listTop -= deviation2;
        listTop += headerHeight2 + fixedHeaderHeight2;
        listBottom += headerHeight2 + fixedHeaderHeight2;
        listBottom -= deviation2;
        if (listTop > scrollTop2 + stickyHeaderHeight - topViewportAddition) direction = $ed43cc03b55b9961$var$UP;
        if (listBottom < scrollTop2 - headerVisible + viewportHeight2 + bottomViewportAddition) direction = $ed43cc03b55b9961$var$DOWN;
        if (direction !== $ed43cc03b55b9961$var$NONE) return [
            Math.max(top - headerHeight2 - $ed43cc03b55b9961$var$getOverscan(overscan2, $ed43cc03b55b9961$var$TOP, direction) - topViewportAddition, 0),
            top - headerVisible - fixedHeaderHeight2 + viewportHeight2 + $ed43cc03b55b9961$var$getOverscan(overscan2, $ed43cc03b55b9961$var$BOTTOM, direction) + bottomViewportAddition
        ];
        return null;
    }), $ed43cc03b55b9961$var$filter((value)=>value != null), $ed43cc03b55b9961$var$distinctUntilChanged($ed43cc03b55b9961$var$tupleComparator)), [
        0,
        0
    ]);
    return {
        listBoundary: // input
        listBoundary,
        overscan: overscan,
        topListHeight: topListHeight,
        increaseViewportBy: increaseViewportBy,
        visibleRange: // output
        visibleRange
    };
}, $ed43cc03b55b9961$var$tup($ed43cc03b55b9961$var$domIOSystem), {
    singleton: true
});
function $ed43cc03b55b9961$var$probeItemSet(index, sizes, data) {
    if ($ed43cc03b55b9961$var$hasGroups(sizes)) {
        const itemIndex = $ed43cc03b55b9961$var$originalIndexFromItemIndex(index, sizes);
        const groupIndex = $ed43cc03b55b9961$var$findMaxKeyValue(sizes.groupOffsetTree, itemIndex)[0];
        return [
            {
                index: groupIndex,
                size: 0,
                offset: 0
            },
            {
                index: itemIndex,
                size: 0,
                offset: 0,
                data: data && data[0]
            }
        ];
    }
    return [
        {
            index: index,
            size: 0,
            offset: 0,
            data: data && data[0]
        }
    ];
}
const $ed43cc03b55b9961$var$EMPTY_LIST_STATE = {
    items: [],
    topItems: [],
    offsetTop: 0,
    offsetBottom: 0,
    top: 0,
    bottom: 0,
    topListHeight: 0,
    totalCount: 0,
    firstItemIndex: 0
};
function $ed43cc03b55b9961$var$transposeItems(items, sizes, firstItemIndex) {
    if (items.length === 0) return [];
    if (!$ed43cc03b55b9961$var$hasGroups(sizes)) return items.map((item)=>({
            ...item,
            index: item.index + firstItemIndex,
            originalIndex: item.index
        }));
    const startIndex = items[0].index;
    const endIndex = items[items.length - 1].index;
    const transposedItems = [];
    const groupRanges = $ed43cc03b55b9961$var$rangesWithin(sizes.groupOffsetTree, startIndex, endIndex);
    let currentRange = void 0;
    let currentGroupIndex = 0;
    for (const item of items){
        if (!currentRange || currentRange.end < item.index) {
            currentRange = groupRanges.shift();
            currentGroupIndex = sizes.groupIndices.indexOf(currentRange.start);
        }
        let transposedItem;
        if (item.index === currentRange.start) transposedItem = {
            type: "group",
            index: currentGroupIndex
        };
        else transposedItem = {
            index: item.index - (currentGroupIndex + 1) + firstItemIndex,
            groupIndex: currentGroupIndex
        };
        transposedItems.push({
            ...transposedItem,
            size: item.size,
            offset: item.offset,
            originalIndex: item.index,
            data: item.data
        });
    }
    return transposedItems;
}
function $ed43cc03b55b9961$var$buildListState(items, topItems, totalCount, gap, sizes, firstItemIndex) {
    const { lastSize: lastSize, lastOffset: lastOffset, lastIndex: lastIndex } = sizes;
    let offsetTop = 0;
    let bottom = 0;
    if (items.length > 0) {
        offsetTop = items[0].offset;
        const lastItem = items[items.length - 1];
        bottom = lastItem.offset + lastItem.size;
    }
    const itemCount = totalCount - lastIndex;
    const total = lastOffset + itemCount * lastSize + (itemCount - 1) * gap;
    const top = offsetTop;
    const offsetBottom = total - bottom;
    return {
        items: $ed43cc03b55b9961$var$transposeItems(items, sizes, firstItemIndex),
        topItems: $ed43cc03b55b9961$var$transposeItems(topItems, sizes, firstItemIndex),
        topListHeight: topItems.reduce((height, item)=>item.size + height, 0),
        offsetTop: offsetTop,
        offsetBottom: offsetBottom,
        top: top,
        bottom: bottom,
        totalCount: totalCount,
        firstItemIndex: firstItemIndex
    };
}
function $ed43cc03b55b9961$var$buildListStateFromItemCount(itemCount, initialTopMostItemIndex, sizes, firstItemIndex, gap, data) {
    let includedGroupsCount = 0;
    if (sizes.groupIndices.length > 0) for (const index of sizes.groupIndices){
        if (index - includedGroupsCount >= itemCount) break;
        includedGroupsCount++;
    }
    const adjustedCount = itemCount + includedGroupsCount;
    const initialTopMostItemIndexNumber = $ed43cc03b55b9961$var$getInitialTopMostItemIndexNumber(initialTopMostItemIndex, adjustedCount);
    const items = Array.from({
        length: adjustedCount
    }).map((_, index)=>({
            index: index + initialTopMostItemIndexNumber,
            size: 0,
            offset: 0,
            data: data[index + initialTopMostItemIndexNumber]
        }));
    return $ed43cc03b55b9961$var$buildListState(items, [], adjustedCount, gap, sizes, firstItemIndex);
}
const $ed43cc03b55b9961$var$listStateSystem = $ed43cc03b55b9961$var$system(([{ sizes: sizes, totalCount: totalCount, data: data, firstItemIndex: firstItemIndex, gap: gap }, groupedListSystem2, { visibleRange: visibleRange, listBoundary: listBoundary, topListHeight: rangeTopListHeight }, { scrolledToInitialItem: scrolledToInitialItem, initialTopMostItemIndex: initialTopMostItemIndex }, { topListHeight: topListHeight }, stateFlags, { didMount: didMount }, { recalcInProgress: recalcInProgress }])=>{
    const topItemsIndexes = $ed43cc03b55b9961$var$statefulStream([]);
    const initialItemCount = $ed43cc03b55b9961$var$statefulStream(0);
    const itemsRendered = $ed43cc03b55b9961$var$stream();
    $ed43cc03b55b9961$var$connect(groupedListSystem2.topItemsIndexes, topItemsIndexes);
    const listState = $ed43cc03b55b9961$var$statefulStreamFromEmitter($ed43cc03b55b9961$var$pipe($ed43cc03b55b9961$var$combineLatest(didMount, recalcInProgress, $ed43cc03b55b9961$var$duc(visibleRange, $ed43cc03b55b9961$var$tupleComparator), $ed43cc03b55b9961$var$duc(totalCount), $ed43cc03b55b9961$var$duc(sizes), $ed43cc03b55b9961$var$duc(initialTopMostItemIndex), scrolledToInitialItem, $ed43cc03b55b9961$var$duc(topItemsIndexes), $ed43cc03b55b9961$var$duc(firstItemIndex), $ed43cc03b55b9961$var$duc(gap), data), $ed43cc03b55b9961$var$filter(([mount, recalcInProgress2, , totalCount2, , , , , , , data2])=>{
        const dataChangeInProgress = data2 && data2.length !== totalCount2;
        return mount && !recalcInProgress2 && !dataChangeInProgress;
    }), $ed43cc03b55b9961$var$map(([, , [startOffset, endOffset], totalCount2, sizes2, initialTopMostItemIndex2, scrolledToInitialItem2, topItemsIndexes2, firstItemIndex2, gap2, data2])=>{
        const sizesValue = sizes2;
        const { sizeTree: sizeTree, offsetTree: offsetTree } = sizesValue;
        const initialItemCountValue = $ed43cc03b55b9961$var$getValue(initialItemCount);
        if (totalCount2 === 0) return {
            ...$ed43cc03b55b9961$var$EMPTY_LIST_STATE,
            totalCount: totalCount2
        };
        if (startOffset === 0 && endOffset === 0) {
            if (initialItemCountValue === 0) return {
                ...$ed43cc03b55b9961$var$EMPTY_LIST_STATE,
                totalCount: totalCount2
            };
            else return $ed43cc03b55b9961$var$buildListStateFromItemCount(initialItemCountValue, initialTopMostItemIndex2, sizes2, firstItemIndex2, gap2, data2 || []);
        }
        if ($ed43cc03b55b9961$var$empty(sizeTree)) {
            if (initialItemCountValue > 0) return null;
            const state = $ed43cc03b55b9961$var$buildListState($ed43cc03b55b9961$var$probeItemSet($ed43cc03b55b9961$var$getInitialTopMostItemIndexNumber(initialTopMostItemIndex2, totalCount2), sizesValue, data2), [], totalCount2, gap2, sizesValue, firstItemIndex2);
            return state;
        }
        const topItems = [];
        if (topItemsIndexes2.length > 0) {
            const startIndex = topItemsIndexes2[0];
            const endIndex = topItemsIndexes2[topItemsIndexes2.length - 1];
            let offset = 0;
            for (const range of $ed43cc03b55b9961$var$rangesWithin(sizeTree, startIndex, endIndex)){
                const size = range.value;
                const rangeStartIndex = Math.max(range.start, startIndex);
                const rangeEndIndex = Math.min(range.end, endIndex);
                for(let i = rangeStartIndex; i <= rangeEndIndex; i++){
                    topItems.push({
                        index: i,
                        size: size,
                        offset: offset,
                        data: data2 && data2[i]
                    });
                    offset += size;
                }
            }
        }
        if (!scrolledToInitialItem2) return $ed43cc03b55b9961$var$buildListState([], topItems, totalCount2, gap2, sizesValue, firstItemIndex2);
        const minStartIndex = topItemsIndexes2.length > 0 ? topItemsIndexes2[topItemsIndexes2.length - 1] + 1 : 0;
        const offsetPointRanges = $ed43cc03b55b9961$var$rangesWithinOffsets(offsetTree, startOffset, endOffset, minStartIndex);
        if (offsetPointRanges.length === 0) return null;
        const maxIndex = totalCount2 - 1;
        const items = $ed43cc03b55b9961$var$tap([], (result)=>{
            for (const range of offsetPointRanges){
                const point = range.value;
                let offset = point.offset;
                let rangeStartIndex = range.start;
                const size = point.size;
                if (point.offset < startOffset) {
                    rangeStartIndex += Math.floor((startOffset - point.offset + gap2) / (size + gap2));
                    const itemCount = rangeStartIndex - range.start;
                    offset += itemCount * size + itemCount * gap2;
                }
                if (rangeStartIndex < minStartIndex) {
                    offset += (minStartIndex - rangeStartIndex) * size;
                    rangeStartIndex = minStartIndex;
                }
                const endIndex = Math.min(range.end, maxIndex);
                for(let i = rangeStartIndex; i <= endIndex; i++){
                    if (offset >= endOffset) break;
                    result.push({
                        index: i,
                        size: size,
                        offset: offset,
                        data: data2 && data2[i]
                    });
                    offset += size + gap2;
                }
            }
        });
        return $ed43cc03b55b9961$var$buildListState(items, topItems, totalCount2, gap2, sizesValue, firstItemIndex2);
    }), //@ts-expect-error filter needs to be fixed
    $ed43cc03b55b9961$var$filter((value)=>value !== null), $ed43cc03b55b9961$var$distinctUntilChanged()), $ed43cc03b55b9961$var$EMPTY_LIST_STATE);
    $ed43cc03b55b9961$var$connect($ed43cc03b55b9961$var$pipe(data, $ed43cc03b55b9961$var$filter($ed43cc03b55b9961$var$isDefined), $ed43cc03b55b9961$var$map((data2)=>data2 == null ? void 0 : data2.length)), totalCount);
    $ed43cc03b55b9961$var$connect($ed43cc03b55b9961$var$pipe(listState, $ed43cc03b55b9961$var$map((value)=>value.topListHeight)), topListHeight);
    $ed43cc03b55b9961$var$connect(topListHeight, rangeTopListHeight);
    $ed43cc03b55b9961$var$connect($ed43cc03b55b9961$var$pipe(listState, $ed43cc03b55b9961$var$map((state)=>[
            state.top,
            state.bottom
        ])), listBoundary);
    $ed43cc03b55b9961$var$connect($ed43cc03b55b9961$var$pipe(listState, $ed43cc03b55b9961$var$map((state)=>state.items)), itemsRendered);
    const endReached = $ed43cc03b55b9961$var$streamFromEmitter($ed43cc03b55b9961$var$pipe(listState, $ed43cc03b55b9961$var$filter(({ items: items })=>items.length > 0), $ed43cc03b55b9961$var$withLatestFrom(totalCount, data), $ed43cc03b55b9961$var$filter(([{ items: items }, totalCount2])=>items[items.length - 1].originalIndex === totalCount2 - 1), $ed43cc03b55b9961$var$map(([, totalCount2, data2])=>[
            totalCount2 - 1,
            data2
        ]), $ed43cc03b55b9961$var$distinctUntilChanged($ed43cc03b55b9961$var$tupleComparator), $ed43cc03b55b9961$var$map(([count])=>count)));
    const startReached = $ed43cc03b55b9961$var$streamFromEmitter($ed43cc03b55b9961$var$pipe(listState, $ed43cc03b55b9961$var$throttleTime(200), $ed43cc03b55b9961$var$filter(({ items: items, topItems: topItems })=>{
        return items.length > 0 && items[0].originalIndex === topItems.length;
    }), $ed43cc03b55b9961$var$map(({ items: items })=>items[0].index), $ed43cc03b55b9961$var$distinctUntilChanged()));
    const rangeChanged = $ed43cc03b55b9961$var$streamFromEmitter($ed43cc03b55b9961$var$pipe(listState, $ed43cc03b55b9961$var$filter(({ items: items })=>items.length > 0), $ed43cc03b55b9961$var$map(({ items: items })=>{
        let startIndex = 0;
        let endIndex = items.length - 1;
        while(items[startIndex].type === "group" && startIndex < endIndex)startIndex++;
        while(items[endIndex].type === "group" && endIndex > startIndex)endIndex--;
        return {
            startIndex: items[startIndex].index,
            endIndex: items[endIndex].index
        };
    }), $ed43cc03b55b9961$var$distinctUntilChanged($ed43cc03b55b9961$var$rangeComparator)));
    return {
        listState: listState,
        topItemsIndexes: topItemsIndexes,
        endReached: endReached,
        startReached: startReached,
        rangeChanged: rangeChanged,
        itemsRendered: itemsRendered,
        initialItemCount: initialItemCount,
        ...stateFlags
    };
}, $ed43cc03b55b9961$var$tup($ed43cc03b55b9961$var$sizeSystem, $ed43cc03b55b9961$var$groupedListSystem, $ed43cc03b55b9961$var$sizeRangeSystem, $ed43cc03b55b9961$var$initialTopMostItemIndexSystem, $ed43cc03b55b9961$var$scrollToIndexSystem, $ed43cc03b55b9961$var$stateFlagsSystem, $ed43cc03b55b9961$var$propsReadySystem, $ed43cc03b55b9961$var$recalcSystem), {
    singleton: true
});
const $ed43cc03b55b9961$var$initialItemCountSystem = $ed43cc03b55b9961$var$system(([{ sizes: sizes, firstItemIndex: firstItemIndex, data: data, gap: gap }, { initialTopMostItemIndex: initialTopMostItemIndex }, { initialItemCount: initialItemCount, listState: listState }, { didMount: didMount }])=>{
    $ed43cc03b55b9961$var$connect($ed43cc03b55b9961$var$pipe(didMount, $ed43cc03b55b9961$var$withLatestFrom(initialItemCount), $ed43cc03b55b9961$var$filter(([, count])=>count !== 0), $ed43cc03b55b9961$var$withLatestFrom(initialTopMostItemIndex, sizes, firstItemIndex, gap, data), $ed43cc03b55b9961$var$map(([[, count], initialTopMostItemIndexValue, sizes2, firstItemIndex2, gap2, data2 = []])=>{
        return $ed43cc03b55b9961$var$buildListStateFromItemCount(count, initialTopMostItemIndexValue, sizes2, firstItemIndex2, gap2, data2);
    })), listState);
    return {};
}, $ed43cc03b55b9961$var$tup($ed43cc03b55b9961$var$sizeSystem, $ed43cc03b55b9961$var$initialTopMostItemIndexSystem, $ed43cc03b55b9961$var$listStateSystem, $ed43cc03b55b9961$var$propsReadySystem), {
    singleton: true
});
const $ed43cc03b55b9961$var$scrollSeekSystem = $ed43cc03b55b9961$var$system(([{ scrollVelocity: scrollVelocity }])=>{
    const isSeeking = $ed43cc03b55b9961$var$statefulStream(false);
    const rangeChanged = $ed43cc03b55b9961$var$stream();
    const scrollSeekConfiguration = $ed43cc03b55b9961$var$statefulStream(false);
    $ed43cc03b55b9961$var$connect($ed43cc03b55b9961$var$pipe(scrollVelocity, $ed43cc03b55b9961$var$withLatestFrom(scrollSeekConfiguration, isSeeking, rangeChanged), $ed43cc03b55b9961$var$filter(([_, config])=>!!config), $ed43cc03b55b9961$var$map(([speed, config, isSeeking2, range])=>{
        const { exit: exit, enter: enter } = config;
        if (isSeeking2) {
            if (exit(speed, range)) return false;
        } else {
            if (enter(speed, range)) return true;
        }
        return isSeeking2;
    }), $ed43cc03b55b9961$var$distinctUntilChanged()), isSeeking);
    $ed43cc03b55b9961$var$subscribe($ed43cc03b55b9961$var$pipe($ed43cc03b55b9961$var$combineLatest(isSeeking, scrollVelocity, rangeChanged), $ed43cc03b55b9961$var$withLatestFrom(scrollSeekConfiguration)), ([[isSeeking2, velocity, range], config])=>isSeeking2 && config && config.change && config.change(velocity, range));
    return {
        isSeeking: isSeeking,
        scrollSeekConfiguration: scrollSeekConfiguration,
        scrollVelocity: scrollVelocity,
        scrollSeekRangeChanged: rangeChanged
    };
}, $ed43cc03b55b9961$var$tup($ed43cc03b55b9961$var$stateFlagsSystem), {
    singleton: true
});
const $ed43cc03b55b9961$var$topItemCountSystem = $ed43cc03b55b9961$var$system(([{ topItemsIndexes: topItemsIndexes }])=>{
    const topItemCount = $ed43cc03b55b9961$var$statefulStream(0);
    $ed43cc03b55b9961$var$connect($ed43cc03b55b9961$var$pipe(topItemCount, $ed43cc03b55b9961$var$filter((length)=>length > 0), $ed43cc03b55b9961$var$map((length)=>Array.from({
            length: length
        }).map((_, index)=>index))), topItemsIndexes);
    return {
        topItemCount: topItemCount
    };
}, $ed43cc03b55b9961$var$tup($ed43cc03b55b9961$var$listStateSystem));
const $ed43cc03b55b9961$var$totalListHeightSystem = $ed43cc03b55b9961$var$system(([{ footerHeight: footerHeight, headerHeight: headerHeight, fixedHeaderHeight: fixedHeaderHeight, fixedFooterHeight: fixedFooterHeight }, { listState: listState }])=>{
    const totalListHeightChanged = $ed43cc03b55b9961$var$stream();
    const totalListHeight = $ed43cc03b55b9961$var$statefulStreamFromEmitter($ed43cc03b55b9961$var$pipe($ed43cc03b55b9961$var$combineLatest(footerHeight, fixedFooterHeight, headerHeight, fixedHeaderHeight, listState), $ed43cc03b55b9961$var$map(([footerHeight2, fixedFooterHeight2, headerHeight2, fixedHeaderHeight2, listState2])=>{
        return footerHeight2 + fixedFooterHeight2 + headerHeight2 + fixedHeaderHeight2 + listState2.offsetBottom + listState2.bottom;
    })), 0);
    $ed43cc03b55b9961$var$connect($ed43cc03b55b9961$var$duc(totalListHeight), totalListHeightChanged);
    return {
        totalListHeight: totalListHeight,
        totalListHeightChanged: totalListHeightChanged
    };
}, $ed43cc03b55b9961$var$tup($ed43cc03b55b9961$var$domIOSystem, $ed43cc03b55b9961$var$listStateSystem), {
    singleton: true
});
function $ed43cc03b55b9961$var$simpleMemoize(func) {
    let called = false;
    let result;
    return ()=>{
        if (!called) {
            called = true;
            result = func();
        }
        return result;
    };
}
const $ed43cc03b55b9961$var$isMobileSafari = $ed43cc03b55b9961$var$simpleMemoize(()=>{
    return /iP(ad|od|hone)/i.test(navigator.userAgent) && /WebKit/i.test(navigator.userAgent);
});
const $ed43cc03b55b9961$var$upwardScrollFixSystem = $ed43cc03b55b9961$var$system(([{ scrollBy: scrollBy, scrollTop: scrollTop, deviation: deviation, scrollingInProgress: scrollingInProgress }, { isScrolling: isScrolling, isAtBottom: isAtBottom, scrollDirection: scrollDirection, lastJumpDueToItemResize: lastJumpDueToItemResize }, { listState: listState }, { beforeUnshiftWith: beforeUnshiftWith, shiftWithOffset: shiftWithOffset, sizes: sizes, gap: gap }, { log: log }, { recalcInProgress: recalcInProgress }])=>{
    const deviationOffset = $ed43cc03b55b9961$var$streamFromEmitter($ed43cc03b55b9961$var$pipe(listState, $ed43cc03b55b9961$var$withLatestFrom(lastJumpDueToItemResize), $ed43cc03b55b9961$var$scan(([, prevItems, prevTotalCount, prevTotalHeight], [{ items: items, totalCount: totalCount, bottom: bottom, offsetBottom: offsetBottom }, lastJumpDueToItemResize2])=>{
        const totalHeight = bottom + offsetBottom;
        let newDev = 0;
        if (prevTotalCount === totalCount) {
            if (prevItems.length > 0 && items.length > 0) {
                const atStart = items[0].originalIndex === 0 && prevItems[0].originalIndex === 0;
                if (!atStart) {
                    newDev = totalHeight - prevTotalHeight;
                    if (newDev !== 0) newDev += lastJumpDueToItemResize2;
                }
            }
        }
        return [
            newDev,
            items,
            totalCount,
            totalHeight
        ];
    }, [
        0,
        [],
        0,
        0
    ]), $ed43cc03b55b9961$var$filter(([amount])=>amount !== 0), $ed43cc03b55b9961$var$withLatestFrom(scrollTop, scrollDirection, scrollingInProgress, isAtBottom, log, recalcInProgress), $ed43cc03b55b9961$var$filter(([, scrollTop2, scrollDirection2, scrollingInProgress2, , , recalcInProgress2])=>{
        return !recalcInProgress2 && !scrollingInProgress2 && scrollTop2 !== 0 && scrollDirection2 === $ed43cc03b55b9961$var$UP;
    }), $ed43cc03b55b9961$var$map(([[amount], , , , , log2])=>{
        log2("Upward scrolling compensation", {
            amount: amount
        }, $ed43cc03b55b9961$export$243e62d78d3b544d.DEBUG);
        return amount;
    })));
    function scrollByWith(offset) {
        if (offset > 0) {
            $ed43cc03b55b9961$var$publish(scrollBy, {
                top: -offset,
                behavior: "auto"
            });
            $ed43cc03b55b9961$var$publish(deviation, 0);
        } else {
            $ed43cc03b55b9961$var$publish(deviation, 0);
            $ed43cc03b55b9961$var$publish(scrollBy, {
                top: -offset,
                behavior: "auto"
            });
        }
    }
    $ed43cc03b55b9961$var$subscribe($ed43cc03b55b9961$var$pipe(deviationOffset, $ed43cc03b55b9961$var$withLatestFrom(deviation, isScrolling)), ([offset, deviationAmount, isScrolling2])=>{
        if (isScrolling2 && $ed43cc03b55b9961$var$isMobileSafari()) $ed43cc03b55b9961$var$publish(deviation, deviationAmount - offset);
        else scrollByWith(-offset);
    });
    $ed43cc03b55b9961$var$subscribe($ed43cc03b55b9961$var$pipe($ed43cc03b55b9961$var$combineLatest($ed43cc03b55b9961$var$statefulStreamFromEmitter(isScrolling, false), deviation, recalcInProgress), $ed43cc03b55b9961$var$filter(([is, deviation2, recalc])=>!is && !recalc && deviation2 !== 0), $ed43cc03b55b9961$var$map(([_, deviation2])=>deviation2), $ed43cc03b55b9961$var$throttleTime(1)), scrollByWith);
    $ed43cc03b55b9961$var$connect($ed43cc03b55b9961$var$pipe(shiftWithOffset, $ed43cc03b55b9961$var$map((offset)=>{
        return {
            top: -offset
        };
    })), scrollBy);
    $ed43cc03b55b9961$var$subscribe($ed43cc03b55b9961$var$pipe(beforeUnshiftWith, $ed43cc03b55b9961$var$withLatestFrom(sizes, gap), $ed43cc03b55b9961$var$map(([offset, { lastSize: defaultItemSize, groupIndices: groupIndices, sizeTree: sizeTree }, gap2])=>{
        function getItemOffset(itemCount) {
            return itemCount * (defaultItemSize + gap2);
        }
        if (groupIndices.length === 0) return getItemOffset(offset);
        else {
            let amount = 0;
            const defaultGroupSize = $ed43cc03b55b9961$var$find(sizeTree, 0);
            let recognizedOffsetItems = 0;
            let groupIndex = 0;
            while(recognizedOffsetItems < offset){
                recognizedOffsetItems++;
                amount += defaultGroupSize;
                let groupItemCount = groupIndices.length === groupIndex + 1 ? Infinity : groupIndices[groupIndex + 1] - groupIndices[groupIndex] - 1;
                if (recognizedOffsetItems + groupItemCount > offset) {
                    amount -= defaultGroupSize;
                    groupItemCount = offset - recognizedOffsetItems + 1;
                }
                recognizedOffsetItems += groupItemCount;
                amount += getItemOffset(groupItemCount);
                groupIndex++;
            }
            return amount;
        }
    })), (offset)=>{
        $ed43cc03b55b9961$var$publish(deviation, offset);
        requestAnimationFrame(()=>{
            $ed43cc03b55b9961$var$publish(scrollBy, {
                top: offset
            });
            requestAnimationFrame(()=>{
                $ed43cc03b55b9961$var$publish(deviation, 0);
                $ed43cc03b55b9961$var$publish(recalcInProgress, false);
            });
        });
    });
    return {
        deviation: deviation
    };
}, $ed43cc03b55b9961$var$tup($ed43cc03b55b9961$var$domIOSystem, $ed43cc03b55b9961$var$stateFlagsSystem, $ed43cc03b55b9961$var$listStateSystem, $ed43cc03b55b9961$var$sizeSystem, $ed43cc03b55b9961$var$loggerSystem, $ed43cc03b55b9961$var$recalcSystem));
const $ed43cc03b55b9961$var$initialScrollTopSystem = $ed43cc03b55b9961$var$system(([{ didMount: didMount }, { scrollTo: scrollTo }, { listState: listState }])=>{
    const initialScrollTop = $ed43cc03b55b9961$var$statefulStream(0);
    $ed43cc03b55b9961$var$subscribe($ed43cc03b55b9961$var$pipe(didMount, $ed43cc03b55b9961$var$withLatestFrom(initialScrollTop), $ed43cc03b55b9961$var$filter(([, offset])=>offset !== 0), $ed43cc03b55b9961$var$map(([, offset])=>({
            top: offset
        }))), (location)=>{
        $ed43cc03b55b9961$var$handleNext($ed43cc03b55b9961$var$pipe(listState, $ed43cc03b55b9961$var$skip(1), $ed43cc03b55b9961$var$filter((state)=>state.items.length > 1)), ()=>{
            requestAnimationFrame(()=>{
                $ed43cc03b55b9961$var$publish(scrollTo, location);
            });
        });
    });
    return {
        initialScrollTop: initialScrollTop
    };
}, $ed43cc03b55b9961$var$tup($ed43cc03b55b9961$var$propsReadySystem, $ed43cc03b55b9961$var$domIOSystem, $ed43cc03b55b9961$var$listStateSystem), {
    singleton: true
});
const $ed43cc03b55b9961$var$alignToBottomSystem = $ed43cc03b55b9961$var$system(([{ viewportHeight: viewportHeight }, { totalListHeight: totalListHeight }])=>{
    const alignToBottom = $ed43cc03b55b9961$var$statefulStream(false);
    const paddingTopAddition = $ed43cc03b55b9961$var$statefulStreamFromEmitter($ed43cc03b55b9961$var$pipe($ed43cc03b55b9961$var$combineLatest(alignToBottom, viewportHeight, totalListHeight), $ed43cc03b55b9961$var$filter(([enabled])=>enabled), $ed43cc03b55b9961$var$map(([, viewportHeight2, totalListHeight2])=>{
        return Math.max(0, viewportHeight2 - totalListHeight2);
    }), $ed43cc03b55b9961$var$throttleTime(0), $ed43cc03b55b9961$var$distinctUntilChanged()), 0);
    return {
        alignToBottom: alignToBottom,
        paddingTopAddition: paddingTopAddition
    };
}, $ed43cc03b55b9961$var$tup($ed43cc03b55b9961$var$domIOSystem, $ed43cc03b55b9961$var$totalListHeightSystem), {
    singleton: true
});
const $ed43cc03b55b9961$var$windowScrollerSystem = $ed43cc03b55b9961$var$system(([{ scrollTo: scrollTo, scrollContainerState: scrollContainerState }])=>{
    const windowScrollContainerState = $ed43cc03b55b9961$var$stream();
    const windowViewportRect = $ed43cc03b55b9961$var$stream();
    const windowScrollTo = $ed43cc03b55b9961$var$stream();
    const useWindowScroll = $ed43cc03b55b9961$var$statefulStream(false);
    const customScrollParent = $ed43cc03b55b9961$var$statefulStream(void 0);
    $ed43cc03b55b9961$var$connect($ed43cc03b55b9961$var$pipe($ed43cc03b55b9961$var$combineLatest(windowScrollContainerState, windowViewportRect), $ed43cc03b55b9961$var$map(([{ viewportHeight: viewportHeight, scrollTop: windowScrollTop, scrollHeight: scrollHeight }, { offsetTop: offsetTop }])=>{
        return {
            scrollTop: Math.max(0, windowScrollTop - offsetTop),
            scrollHeight: scrollHeight,
            viewportHeight: viewportHeight
        };
    })), scrollContainerState);
    $ed43cc03b55b9961$var$connect($ed43cc03b55b9961$var$pipe(scrollTo, $ed43cc03b55b9961$var$withLatestFrom(windowViewportRect), $ed43cc03b55b9961$var$map(([scrollTo2, { offsetTop: offsetTop }])=>{
        return {
            ...scrollTo2,
            top: scrollTo2.top + offsetTop
        };
    })), windowScrollTo);
    return {
        useWindowScroll: // config
        useWindowScroll,
        customScrollParent: customScrollParent,
        windowScrollContainerState: // input
        windowScrollContainerState,
        windowViewportRect: windowViewportRect,
        windowScrollTo: // signals
        windowScrollTo
    };
}, $ed43cc03b55b9961$var$tup($ed43cc03b55b9961$var$domIOSystem));
const $ed43cc03b55b9961$var$defaultCalculateViewLocation = ({ itemTop: itemTop2, itemBottom: itemBottom, viewportTop: viewportTop, viewportBottom: viewportBottom, locationParams: { behavior: behavior, align: align, ...rest } })=>{
    if (itemTop2 < viewportTop) return {
        ...rest,
        behavior: behavior,
        align: align != null ? align : "start"
    };
    if (itemBottom > viewportBottom) return {
        ...rest,
        behavior: behavior,
        align: align != null ? align : "end"
    };
    return null;
};
const $ed43cc03b55b9961$var$scrollIntoViewSystem = $ed43cc03b55b9961$var$system(([{ sizes: sizes, totalCount: totalCount, gap: gap }, { scrollTop: scrollTop, viewportHeight: viewportHeight, headerHeight: headerHeight, fixedHeaderHeight: fixedHeaderHeight, fixedFooterHeight: fixedFooterHeight, scrollingInProgress: scrollingInProgress }, { scrollToIndex: scrollToIndex }])=>{
    const scrollIntoView = $ed43cc03b55b9961$var$stream();
    $ed43cc03b55b9961$var$connect($ed43cc03b55b9961$var$pipe(scrollIntoView, $ed43cc03b55b9961$var$withLatestFrom(sizes, viewportHeight, totalCount, headerHeight, fixedHeaderHeight, fixedFooterHeight, scrollTop), $ed43cc03b55b9961$var$withLatestFrom(gap), $ed43cc03b55b9961$var$map(([[viewLocation, sizes2, viewportHeight2, totalCount2, headerHeight2, fixedHeaderHeight2, fixedFooterHeight2, scrollTop2], gap2])=>{
        const { done: done, behavior: behavior, align: align, calculateViewLocation: calculateViewLocation = $ed43cc03b55b9961$var$defaultCalculateViewLocation, ...rest } = viewLocation;
        const actualIndex = $ed43cc03b55b9961$var$originalIndexFromLocation(viewLocation, sizes2, totalCount2 - 1);
        const itemTop2 = $ed43cc03b55b9961$var$offsetOf(actualIndex, sizes2.offsetTree, gap2) + headerHeight2 + fixedHeaderHeight2;
        const itemBottom = itemTop2 + $ed43cc03b55b9961$var$findMaxKeyValue(sizes2.sizeTree, actualIndex)[1];
        const viewportTop = scrollTop2 + fixedHeaderHeight2;
        const viewportBottom = scrollTop2 + viewportHeight2 - fixedFooterHeight2;
        const location = calculateViewLocation({
            itemTop: itemTop2,
            itemBottom: itemBottom,
            viewportTop: viewportTop,
            viewportBottom: viewportBottom,
            locationParams: {
                behavior: behavior,
                align: align,
                ...rest
            }
        });
        if (location) done && $ed43cc03b55b9961$var$handleNext($ed43cc03b55b9961$var$pipe(scrollingInProgress, $ed43cc03b55b9961$var$filter((value)=>value === false), // skips the initial publish of false, and the cleanup call.
        // but if scrollingInProgress is true, we skip the initial publish.
        $ed43cc03b55b9961$var$skip($ed43cc03b55b9961$var$getValue(scrollingInProgress) ? 1 : 2)), done);
        else done && done();
        return location;
    }), $ed43cc03b55b9961$var$filter((value)=>value !== null)), scrollToIndex);
    return {
        scrollIntoView: scrollIntoView
    };
}, $ed43cc03b55b9961$var$tup($ed43cc03b55b9961$var$sizeSystem, $ed43cc03b55b9961$var$domIOSystem, $ed43cc03b55b9961$var$scrollToIndexSystem, $ed43cc03b55b9961$var$listStateSystem, $ed43cc03b55b9961$var$loggerSystem), {
    singleton: true
});
const $ed43cc03b55b9961$var$stateLoadSystem = $ed43cc03b55b9961$var$system(([{ sizes: sizes, sizeRanges: sizeRanges }, { scrollTop: scrollTop }, { initialTopMostItemIndex: initialTopMostItemIndex }, { didMount: didMount }, { useWindowScroll: useWindowScroll, windowScrollContainerState: windowScrollContainerState, windowViewportRect: windowViewportRect }])=>{
    const getState = $ed43cc03b55b9961$var$stream();
    const restoreStateFrom = $ed43cc03b55b9961$var$statefulStream(void 0);
    const statefulWindowScrollContainerState = $ed43cc03b55b9961$var$statefulStream(null);
    const statefulWindowViewportRect = $ed43cc03b55b9961$var$statefulStream(null);
    $ed43cc03b55b9961$var$connect(windowScrollContainerState, statefulWindowScrollContainerState);
    $ed43cc03b55b9961$var$connect(windowViewportRect, statefulWindowViewportRect);
    $ed43cc03b55b9961$var$subscribe($ed43cc03b55b9961$var$pipe(getState, $ed43cc03b55b9961$var$withLatestFrom(sizes, scrollTop, useWindowScroll, statefulWindowScrollContainerState, statefulWindowViewportRect)), ([callback, sizes2, scrollTop2, useWindowScroll2, windowScrollContainerState2, windowViewportRect2])=>{
        const ranges = $ed43cc03b55b9961$var$sizeTreeToRanges(sizes2.sizeTree);
        if (useWindowScroll2 && windowScrollContainerState2 !== null && windowViewportRect2 !== null) scrollTop2 = windowScrollContainerState2.scrollTop - windowViewportRect2.offsetTop;
        callback({
            ranges: ranges,
            scrollTop: scrollTop2
        });
    });
    $ed43cc03b55b9961$var$connect($ed43cc03b55b9961$var$pipe(restoreStateFrom, $ed43cc03b55b9961$var$filter($ed43cc03b55b9961$var$isDefined), $ed43cc03b55b9961$var$map($ed43cc03b55b9961$var$locationFromSnapshot)), initialTopMostItemIndex);
    $ed43cc03b55b9961$var$connect($ed43cc03b55b9961$var$pipe(didMount, $ed43cc03b55b9961$var$withLatestFrom(restoreStateFrom), $ed43cc03b55b9961$var$filter(([, state])=>state !== void 0), $ed43cc03b55b9961$var$distinctUntilChanged(), $ed43cc03b55b9961$var$map(([, snapshot])=>{
        return snapshot.ranges;
    })), sizeRanges);
    return {
        getState: getState,
        restoreStateFrom: restoreStateFrom
    };
}, $ed43cc03b55b9961$var$tup($ed43cc03b55b9961$var$sizeSystem, $ed43cc03b55b9961$var$domIOSystem, $ed43cc03b55b9961$var$initialTopMostItemIndexSystem, $ed43cc03b55b9961$var$propsReadySystem, $ed43cc03b55b9961$var$windowScrollerSystem));
function $ed43cc03b55b9961$var$locationFromSnapshot(snapshot) {
    return {
        offset: snapshot.scrollTop,
        index: 0,
        align: "start"
    };
}
const $ed43cc03b55b9961$var$featureGroup1System = $ed43cc03b55b9961$var$system(([sizeRange, initialItemCount, propsReady, scrollSeek, totalListHeight, initialScrollTopSystem2, alignToBottom, windowScroller, scrollIntoView, logger])=>{
    return {
        ...sizeRange,
        ...initialItemCount,
        ...propsReady,
        ...scrollSeek,
        ...totalListHeight,
        ...initialScrollTopSystem2,
        ...alignToBottom,
        ...windowScroller,
        ...scrollIntoView,
        ...logger
    };
}, $ed43cc03b55b9961$var$tup($ed43cc03b55b9961$var$sizeRangeSystem, $ed43cc03b55b9961$var$initialItemCountSystem, $ed43cc03b55b9961$var$propsReadySystem, $ed43cc03b55b9961$var$scrollSeekSystem, $ed43cc03b55b9961$var$totalListHeightSystem, $ed43cc03b55b9961$var$initialScrollTopSystem, $ed43cc03b55b9961$var$alignToBottomSystem, $ed43cc03b55b9961$var$windowScrollerSystem, $ed43cc03b55b9961$var$scrollIntoViewSystem, $ed43cc03b55b9961$var$loggerSystem));
const $ed43cc03b55b9961$var$listSystem = $ed43cc03b55b9961$var$system(([{ totalCount: totalCount, sizeRanges: sizeRanges, fixedItemSize: fixedItemSize, defaultItemSize: defaultItemSize, trackItemSizes: trackItemSizes, itemSize: itemSize, data: data, firstItemIndex: firstItemIndex, groupIndices: groupIndices, statefulTotalCount: statefulTotalCount, gap: gap, sizes: sizes }, { initialTopMostItemIndex: initialTopMostItemIndex, scrolledToInitialItem: scrolledToInitialItem }, domIO, stateLoad, followOutput, { listState: listState, topItemsIndexes: topItemsIndexes, ...flags }, { scrollToIndex: scrollToIndex }, _, { topItemCount: topItemCount }, { groupCounts: groupCounts }, featureGroup1])=>{
    $ed43cc03b55b9961$var$connect(flags.rangeChanged, featureGroup1.scrollSeekRangeChanged);
    $ed43cc03b55b9961$var$connect($ed43cc03b55b9961$var$pipe(featureGroup1.windowViewportRect, $ed43cc03b55b9961$var$map((value)=>value.visibleHeight)), domIO.viewportHeight);
    return {
        totalCount: // input
        totalCount,
        data: data,
        firstItemIndex: firstItemIndex,
        sizeRanges: sizeRanges,
        initialTopMostItemIndex: initialTopMostItemIndex,
        scrolledToInitialItem: scrolledToInitialItem,
        topItemsIndexes: topItemsIndexes,
        topItemCount: topItemCount,
        groupCounts: groupCounts,
        fixedItemHeight: fixedItemSize,
        defaultItemHeight: defaultItemSize,
        gap: gap,
        ...followOutput,
        statefulTotalCount: // output
        statefulTotalCount,
        listState: listState,
        scrollToIndex: scrollToIndex,
        trackItemSizes: trackItemSizes,
        itemSize: itemSize,
        groupIndices: groupIndices,
        // exported from stateFlagsSystem
        ...flags,
        // the bag of IO from featureGroup1System
        ...featureGroup1,
        ...domIO,
        sizes: sizes,
        ...stateLoad
    };
}, $ed43cc03b55b9961$var$tup($ed43cc03b55b9961$var$sizeSystem, $ed43cc03b55b9961$var$initialTopMostItemIndexSystem, $ed43cc03b55b9961$var$domIOSystem, $ed43cc03b55b9961$var$stateLoadSystem, $ed43cc03b55b9961$var$followOutputSystem, $ed43cc03b55b9961$var$listStateSystem, $ed43cc03b55b9961$var$scrollToIndexSystem, $ed43cc03b55b9961$var$upwardScrollFixSystem, $ed43cc03b55b9961$var$topItemCountSystem, $ed43cc03b55b9961$var$groupedListSystem, $ed43cc03b55b9961$var$featureGroup1System));
const $ed43cc03b55b9961$var$WEBKIT_STICKY = "-webkit-sticky";
const $ed43cc03b55b9961$var$STICKY = "sticky";
const $ed43cc03b55b9961$var$positionStickyCssValue = $ed43cc03b55b9961$var$simpleMemoize(()=>{
    if (typeof document === "undefined") return $ed43cc03b55b9961$var$STICKY;
    const node = document.createElement("div");
    node.style.position = $ed43cc03b55b9961$var$WEBKIT_STICKY;
    return node.style.position === $ed43cc03b55b9961$var$WEBKIT_STICKY ? $ed43cc03b55b9961$var$WEBKIT_STICKY : $ed43cc03b55b9961$var$STICKY;
});
function $ed43cc03b55b9961$var$useWindowViewportRectRef(callback, customScrollParent) {
    const viewportInfo = (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).useRef(null);
    const calculateInfo = (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).useCallback((element)=>{
        if (element === null || !element.offsetParent) return;
        const rect = element.getBoundingClientRect();
        const visibleWidth = rect.width;
        let visibleHeight, offsetTop;
        if (customScrollParent) {
            const customScrollParentRect = customScrollParent.getBoundingClientRect();
            const deltaTop = rect.top - customScrollParentRect.top;
            visibleHeight = customScrollParentRect.height - Math.max(0, deltaTop);
            offsetTop = deltaTop + customScrollParent.scrollTop;
        } else {
            visibleHeight = window.innerHeight - Math.max(0, rect.top);
            offsetTop = rect.top + window.pageYOffset;
        }
        viewportInfo.current = {
            offsetTop: offsetTop,
            visibleHeight: visibleHeight,
            visibleWidth: visibleWidth
        };
        callback(viewportInfo.current);
    }, [
        callback,
        customScrollParent
    ]);
    const { callbackRef: callbackRef, ref: ref } = $ed43cc03b55b9961$var$useSizeWithElRef(calculateInfo);
    const scrollAndResizeEventHandler = (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).useCallback(()=>{
        calculateInfo(ref.current);
    }, [
        calculateInfo,
        ref
    ]);
    (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).useEffect(()=>{
        if (customScrollParent) {
            customScrollParent.addEventListener("scroll", scrollAndResizeEventHandler);
            const observer = new ResizeObserver(scrollAndResizeEventHandler);
            observer.observe(customScrollParent);
            return ()=>{
                customScrollParent.removeEventListener("scroll", scrollAndResizeEventHandler);
                observer.unobserve(customScrollParent);
            };
        } else {
            window.addEventListener("scroll", scrollAndResizeEventHandler);
            window.addEventListener("resize", scrollAndResizeEventHandler);
            return ()=>{
                window.removeEventListener("scroll", scrollAndResizeEventHandler);
                window.removeEventListener("resize", scrollAndResizeEventHandler);
            };
        }
    }, [
        scrollAndResizeEventHandler,
        customScrollParent
    ]);
    return callbackRef;
}
const $ed43cc03b55b9961$export$99e9d54e386aea7b = (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createContext(void 0);
const $ed43cc03b55b9961$export$81e3217b4b7a890f = (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createContext(void 0);
function $ed43cc03b55b9961$var$identity(value) {
    return value;
}
const $ed43cc03b55b9961$var$listComponentPropsSystem = /* @__PURE__ */ $ed43cc03b55b9961$var$system(()=>{
    const itemContent = $ed43cc03b55b9961$var$statefulStream((index)=>`Item ${index}`);
    const context = $ed43cc03b55b9961$var$statefulStream(null);
    const groupContent = $ed43cc03b55b9961$var$statefulStream((index)=>`Group ${index}`);
    const components = $ed43cc03b55b9961$var$statefulStream({});
    const computeItemKey = $ed43cc03b55b9961$var$statefulStream($ed43cc03b55b9961$var$identity);
    const headerFooterTag = $ed43cc03b55b9961$var$statefulStream("div");
    const scrollerRef = $ed43cc03b55b9961$var$statefulStream($ed43cc03b55b9961$var$noop);
    const distinctProp = (propName, defaultValue = null)=>{
        return $ed43cc03b55b9961$var$statefulStreamFromEmitter($ed43cc03b55b9961$var$pipe(components, $ed43cc03b55b9961$var$map((components2)=>components2[propName]), $ed43cc03b55b9961$var$distinctUntilChanged()), defaultValue);
    };
    return {
        context: context,
        itemContent: itemContent,
        groupContent: groupContent,
        components: components,
        computeItemKey: computeItemKey,
        headerFooterTag: headerFooterTag,
        scrollerRef: scrollerRef,
        FooterComponent: distinctProp("Footer"),
        HeaderComponent: distinctProp("Header"),
        TopItemListComponent: distinctProp("TopItemList"),
        ListComponent: distinctProp("List", "div"),
        ItemComponent: distinctProp("Item", "div"),
        GroupComponent: distinctProp("Group", "div"),
        ScrollerComponent: distinctProp("Scroller", "div"),
        EmptyPlaceholder: distinctProp("EmptyPlaceholder"),
        ScrollSeekPlaceholder: distinctProp("ScrollSeekPlaceholder")
    };
});
const $ed43cc03b55b9961$var$combinedSystem$2 = /* @__PURE__ */ $ed43cc03b55b9961$var$system(([listSystem2, propsSystem])=>{
    return {
        ...listSystem2,
        ...propsSystem
    };
}, $ed43cc03b55b9961$var$tup($ed43cc03b55b9961$var$listSystem, $ed43cc03b55b9961$var$listComponentPropsSystem));
const $ed43cc03b55b9961$var$DefaultScrollSeekPlaceholder$1 = ({ height: height })=>/* @__PURE__ */ (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement("div", {
        style: {
            height: height
        }
    });
const $ed43cc03b55b9961$var$GROUP_STYLE = {
    position: $ed43cc03b55b9961$var$positionStickyCssValue(),
    zIndex: 1,
    overflowAnchor: "none"
};
const $ed43cc03b55b9961$var$ITEM_STYLE$1 = {
    overflowAnchor: "none"
};
const $ed43cc03b55b9961$var$Items$1 = /* @__PURE__ */ (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).memo(function VirtuosoItems({ showTopList: showTopList = false }) {
    const listState = $ed43cc03b55b9961$var$useEmitterValue$2("listState");
    const sizeRanges = $ed43cc03b55b9961$var$usePublisher$2("sizeRanges");
    const useWindowScroll = $ed43cc03b55b9961$var$useEmitterValue$2("useWindowScroll");
    const customScrollParent = $ed43cc03b55b9961$var$useEmitterValue$2("customScrollParent");
    const windowScrollContainerStateCallback = $ed43cc03b55b9961$var$usePublisher$2("windowScrollContainerState");
    const _scrollContainerStateCallback = $ed43cc03b55b9961$var$usePublisher$2("scrollContainerState");
    const scrollContainerStateCallback = customScrollParent || useWindowScroll ? windowScrollContainerStateCallback : _scrollContainerStateCallback;
    const itemContent = $ed43cc03b55b9961$var$useEmitterValue$2("itemContent");
    const context = $ed43cc03b55b9961$var$useEmitterValue$2("context");
    const groupContent = $ed43cc03b55b9961$var$useEmitterValue$2("groupContent");
    const trackItemSizes = $ed43cc03b55b9961$var$useEmitterValue$2("trackItemSizes");
    const itemSize = $ed43cc03b55b9961$var$useEmitterValue$2("itemSize");
    const log = $ed43cc03b55b9961$var$useEmitterValue$2("log");
    const listGap = $ed43cc03b55b9961$var$usePublisher$2("gap");
    const { callbackRef: callbackRef } = $ed43cc03b55b9961$var$useChangedListContentsSizes(sizeRanges, itemSize, trackItemSizes, showTopList ? $ed43cc03b55b9961$var$noop : scrollContainerStateCallback, log, listGap, customScrollParent);
    const [deviation, setDeviation] = (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).useState(0);
    $ed43cc03b55b9961$var$useEmitter$2("deviation", (value)=>{
        if (deviation !== value) setDeviation(value);
    });
    const EmptyPlaceholder = $ed43cc03b55b9961$var$useEmitterValue$2("EmptyPlaceholder");
    const ScrollSeekPlaceholder = $ed43cc03b55b9961$var$useEmitterValue$2("ScrollSeekPlaceholder") || $ed43cc03b55b9961$var$DefaultScrollSeekPlaceholder$1;
    const ListComponent = $ed43cc03b55b9961$var$useEmitterValue$2("ListComponent");
    const ItemComponent = $ed43cc03b55b9961$var$useEmitterValue$2("ItemComponent");
    const GroupComponent = $ed43cc03b55b9961$var$useEmitterValue$2("GroupComponent");
    const computeItemKey = $ed43cc03b55b9961$var$useEmitterValue$2("computeItemKey");
    const isSeeking = $ed43cc03b55b9961$var$useEmitterValue$2("isSeeking");
    const hasGroups2 = $ed43cc03b55b9961$var$useEmitterValue$2("groupIndices").length > 0;
    const paddingTopAddition = $ed43cc03b55b9961$var$useEmitterValue$2("paddingTopAddition");
    const scrolledToInitialItem = $ed43cc03b55b9961$var$useEmitterValue$2("scrolledToInitialItem");
    const containerStyle = showTopList ? {} : {
        boxSizing: "border-box",
        paddingTop: listState.offsetTop + paddingTopAddition,
        paddingBottom: listState.offsetBottom,
        marginTop: deviation,
        ...scrolledToInitialItem ? {} : {
            visibility: "hidden"
        }
    };
    if (!showTopList && listState.totalCount === 0 && EmptyPlaceholder) return (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement(EmptyPlaceholder, $ed43cc03b55b9961$var$contextPropIfNotDomElement(EmptyPlaceholder, context));
    return (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement(ListComponent, {
        ...$ed43cc03b55b9961$var$contextPropIfNotDomElement(ListComponent, context),
        ref: callbackRef,
        style: containerStyle,
        "data-test-id": showTopList ? "virtuoso-top-item-list" : "virtuoso-item-list"
    }, (showTopList ? listState.topItems : listState.items).map((item)=>{
        const index = item.originalIndex;
        const key = computeItemKey(index + listState.firstItemIndex, item.data, context);
        if (isSeeking) return (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement(ScrollSeekPlaceholder, {
            ...$ed43cc03b55b9961$var$contextPropIfNotDomElement(ScrollSeekPlaceholder, context),
            key: key,
            index: item.index,
            height: item.size,
            type: item.type || "item",
            ...item.type === "group" ? {} : {
                groupIndex: item.groupIndex
            }
        });
        if (item.type === "group") return (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement(GroupComponent, {
            ...$ed43cc03b55b9961$var$contextPropIfNotDomElement(GroupComponent, context),
            key: key,
            "data-index": index,
            "data-known-size": item.size,
            "data-item-index": item.index,
            style: $ed43cc03b55b9961$var$GROUP_STYLE
        }, groupContent(item.index, context));
        else return (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement(ItemComponent, {
            ...$ed43cc03b55b9961$var$contextPropIfNotDomElement(ItemComponent, context),
            ...$ed43cc03b55b9961$var$itemPropIfNotDomElement(ItemComponent, item.data),
            key: key,
            "data-index": index,
            "data-known-size": item.size,
            "data-item-index": item.index,
            "data-item-group-index": item.groupIndex,
            style: $ed43cc03b55b9961$var$ITEM_STYLE$1
        }, hasGroups2 ? itemContent(item.index, item.groupIndex, item.data, context) : itemContent(item.index, item.data, context));
    }));
});
const $ed43cc03b55b9961$var$scrollerStyle = {
    height: "100%",
    outline: "none",
    overflowY: "auto",
    position: "relative",
    WebkitOverflowScrolling: "touch"
};
const $ed43cc03b55b9961$var$viewportStyle = {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0
};
const $ed43cc03b55b9961$var$topItemListStyle = {
    width: "100%",
    position: $ed43cc03b55b9961$var$positionStickyCssValue(),
    top: 0,
    zIndex: 1
};
function $ed43cc03b55b9961$var$contextPropIfNotDomElement(element, context) {
    if (typeof element === "string") return void 0;
    return {
        context: context
    };
}
function $ed43cc03b55b9961$var$itemPropIfNotDomElement(element, item) {
    return {
        item: typeof element === "string" ? void 0 : item
    };
}
const $ed43cc03b55b9961$var$Header$1 = /* @__PURE__ */ (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).memo(function VirtuosoHeader() {
    const Header2 = $ed43cc03b55b9961$var$useEmitterValue$2("HeaderComponent");
    const headerHeight = $ed43cc03b55b9961$var$usePublisher$2("headerHeight");
    const headerFooterTag = $ed43cc03b55b9961$var$useEmitterValue$2("headerFooterTag");
    const ref = $ed43cc03b55b9961$var$useSize((el)=>headerHeight($ed43cc03b55b9961$var$correctItemSize(el, "height")));
    const context = $ed43cc03b55b9961$var$useEmitterValue$2("context");
    return Header2 ? (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement(headerFooterTag, {
        ref: ref
    }, (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement(Header2, $ed43cc03b55b9961$var$contextPropIfNotDomElement(Header2, context))) : null;
});
const $ed43cc03b55b9961$var$Footer$1 = /* @__PURE__ */ (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).memo(function VirtuosoFooter() {
    const Footer2 = $ed43cc03b55b9961$var$useEmitterValue$2("FooterComponent");
    const footerHeight = $ed43cc03b55b9961$var$usePublisher$2("footerHeight");
    const headerFooterTag = $ed43cc03b55b9961$var$useEmitterValue$2("headerFooterTag");
    const ref = $ed43cc03b55b9961$var$useSize((el)=>footerHeight($ed43cc03b55b9961$var$correctItemSize(el, "height")));
    const context = $ed43cc03b55b9961$var$useEmitterValue$2("context");
    return Footer2 ? (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement(headerFooterTag, {
        ref: ref
    }, (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement(Footer2, $ed43cc03b55b9961$var$contextPropIfNotDomElement(Footer2, context))) : null;
});
function $ed43cc03b55b9961$var$buildScroller({ usePublisher: usePublisher2, useEmitter: useEmitter2, useEmitterValue: useEmitterValue2 }) {
    const Scroller2 = (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).memo(function VirtuosoScroller({ style: style, children: children, ...props }) {
        const scrollContainerStateCallback = usePublisher2("scrollContainerState");
        const ScrollerComponent = useEmitterValue2("ScrollerComponent");
        const smoothScrollTargetReached = usePublisher2("smoothScrollTargetReached");
        const scrollerRefCallback = useEmitterValue2("scrollerRef");
        const context = useEmitterValue2("context");
        const { scrollerRef: scrollerRef, scrollByCallback: scrollByCallback, scrollToCallback: scrollToCallback } = $ed43cc03b55b9961$var$useScrollTop(scrollContainerStateCallback, smoothScrollTargetReached, ScrollerComponent, scrollerRefCallback);
        useEmitter2("scrollTo", scrollToCallback);
        useEmitter2("scrollBy", scrollByCallback);
        return (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement(ScrollerComponent, {
            ref: scrollerRef,
            style: {
                ...$ed43cc03b55b9961$var$scrollerStyle,
                ...style
            },
            "data-test-id": "virtuoso-scroller",
            "data-virtuoso-scroller": true,
            tabIndex: 0,
            ...props,
            ...$ed43cc03b55b9961$var$contextPropIfNotDomElement(ScrollerComponent, context)
        }, children);
    });
    return Scroller2;
}
function $ed43cc03b55b9961$var$buildWindowScroller({ usePublisher: usePublisher2, useEmitter: useEmitter2, useEmitterValue: useEmitterValue2 }) {
    const Scroller2 = (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).memo(function VirtuosoWindowScroller({ style: style, children: children, ...props }) {
        const scrollContainerStateCallback = usePublisher2("windowScrollContainerState");
        const ScrollerComponent = useEmitterValue2("ScrollerComponent");
        const smoothScrollTargetReached = usePublisher2("smoothScrollTargetReached");
        const totalListHeight = useEmitterValue2("totalListHeight");
        const deviation = useEmitterValue2("deviation");
        const customScrollParent = useEmitterValue2("customScrollParent");
        const context = useEmitterValue2("context");
        const { scrollerRef: scrollerRef, scrollByCallback: scrollByCallback, scrollToCallback: scrollToCallback } = $ed43cc03b55b9961$var$useScrollTop(scrollContainerStateCallback, smoothScrollTargetReached, ScrollerComponent, $ed43cc03b55b9961$var$noop, customScrollParent);
        $ed43cc03b55b9961$var$useIsomorphicLayoutEffect$1(()=>{
            scrollerRef.current = customScrollParent ? customScrollParent : window;
            return ()=>{
                scrollerRef.current = null;
            };
        }, [
            scrollerRef,
            customScrollParent
        ]);
        useEmitter2("windowScrollTo", scrollToCallback);
        useEmitter2("scrollBy", scrollByCallback);
        return (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement(ScrollerComponent, {
            style: {
                position: "relative",
                ...style,
                ...totalListHeight !== 0 ? {
                    height: totalListHeight + deviation
                } : {}
            },
            "data-virtuoso-scroller": true,
            ...props,
            ...$ed43cc03b55b9961$var$contextPropIfNotDomElement(ScrollerComponent, context)
        }, children);
    });
    return Scroller2;
}
const $ed43cc03b55b9961$var$Viewport$2 = ({ children: children })=>{
    const ctx = (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).useContext($ed43cc03b55b9961$export$99e9d54e386aea7b);
    const viewportHeight = $ed43cc03b55b9961$var$usePublisher$2("viewportHeight");
    const fixedItemHeight = $ed43cc03b55b9961$var$usePublisher$2("fixedItemHeight");
    const viewportRef = $ed43cc03b55b9961$var$useSize($ed43cc03b55b9961$var$compose(viewportHeight, (el)=>$ed43cc03b55b9961$var$correctItemSize(el, "height")));
    (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).useEffect(()=>{
        if (ctx) {
            viewportHeight(ctx.viewportHeight);
            fixedItemHeight(ctx.itemHeight);
        }
    }, [
        ctx,
        viewportHeight,
        fixedItemHeight
    ]);
    return /* @__PURE__ */ (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement("div", {
        style: $ed43cc03b55b9961$var$viewportStyle,
        ref: viewportRef,
        "data-viewport-type": "element"
    }, children);
};
const $ed43cc03b55b9961$var$WindowViewport$2 = ({ children: children })=>{
    const ctx = (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).useContext($ed43cc03b55b9961$export$99e9d54e386aea7b);
    const windowViewportRect = $ed43cc03b55b9961$var$usePublisher$2("windowViewportRect");
    const fixedItemHeight = $ed43cc03b55b9961$var$usePublisher$2("fixedItemHeight");
    const customScrollParent = $ed43cc03b55b9961$var$useEmitterValue$2("customScrollParent");
    const viewportRef = $ed43cc03b55b9961$var$useWindowViewportRectRef(windowViewportRect, customScrollParent);
    (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).useEffect(()=>{
        if (ctx) {
            fixedItemHeight(ctx.itemHeight);
            windowViewportRect({
                offsetTop: 0,
                visibleHeight: ctx.viewportHeight,
                visibleWidth: 100
            });
        }
    }, [
        ctx,
        windowViewportRect,
        fixedItemHeight
    ]);
    return /* @__PURE__ */ (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement("div", {
        ref: viewportRef,
        style: $ed43cc03b55b9961$var$viewportStyle,
        "data-viewport-type": "window"
    }, children);
};
const $ed43cc03b55b9961$var$TopItemListContainer = ({ children: children })=>{
    const TopItemList = $ed43cc03b55b9961$var$useEmitterValue$2("TopItemListComponent");
    const headerHeight = $ed43cc03b55b9961$var$useEmitterValue$2("headerHeight");
    const style = {
        ...$ed43cc03b55b9961$var$topItemListStyle,
        marginTop: `${headerHeight}px`
    };
    const context = $ed43cc03b55b9961$var$useEmitterValue$2("context");
    return (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement(TopItemList || "div", {
        style: style,
        context: context
    }, children);
};
const $ed43cc03b55b9961$var$ListRoot = /* @__PURE__ */ (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).memo(function VirtuosoRoot(props) {
    const useWindowScroll = $ed43cc03b55b9961$var$useEmitterValue$2("useWindowScroll");
    const showTopList = $ed43cc03b55b9961$var$useEmitterValue$2("topItemsIndexes").length > 0;
    const customScrollParent = $ed43cc03b55b9961$var$useEmitterValue$2("customScrollParent");
    const TheScroller = customScrollParent || useWindowScroll ? $ed43cc03b55b9961$var$WindowScroller$2 : $ed43cc03b55b9961$var$Scroller$2;
    const TheViewport = customScrollParent || useWindowScroll ? $ed43cc03b55b9961$var$WindowViewport$2 : $ed43cc03b55b9961$var$Viewport$2;
    return /* @__PURE__ */ (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement(TheScroller, {
        ...props
    }, showTopList && /* @__PURE__ */ (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement($ed43cc03b55b9961$var$TopItemListContainer, null, /* @__PURE__ */ (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement($ed43cc03b55b9961$var$Items$1, {
        showTopList: true
    })), /* @__PURE__ */ (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement(TheViewport, null, /* @__PURE__ */ (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement($ed43cc03b55b9961$var$Header$1, null), /* @__PURE__ */ (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement($ed43cc03b55b9961$var$Items$1, null), /* @__PURE__ */ (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement($ed43cc03b55b9961$var$Footer$1, null)));
});
const { Component: $ed43cc03b55b9961$var$List, usePublisher: $ed43cc03b55b9961$var$usePublisher$2, useEmitterValue: $ed43cc03b55b9961$var$useEmitterValue$2, useEmitter: $ed43cc03b55b9961$var$useEmitter$2 } = /* @__PURE__ */ $ed43cc03b55b9961$var$systemToComponent($ed43cc03b55b9961$var$combinedSystem$2, {
    required: {},
    optional: {
        restoreStateFrom: "restoreStateFrom",
        context: "context",
        followOutput: "followOutput",
        itemContent: "itemContent",
        groupContent: "groupContent",
        overscan: "overscan",
        increaseViewportBy: "increaseViewportBy",
        totalCount: "totalCount",
        groupCounts: "groupCounts",
        topItemCount: "topItemCount",
        firstItemIndex: "firstItemIndex",
        initialTopMostItemIndex: "initialTopMostItemIndex",
        components: "components",
        atBottomThreshold: "atBottomThreshold",
        atTopThreshold: "atTopThreshold",
        computeItemKey: "computeItemKey",
        defaultItemHeight: "defaultItemHeight",
        fixedItemHeight: "fixedItemHeight",
        itemSize: "itemSize",
        scrollSeekConfiguration: "scrollSeekConfiguration",
        headerFooterTag: "headerFooterTag",
        data: "data",
        initialItemCount: "initialItemCount",
        initialScrollTop: "initialScrollTop",
        alignToBottom: "alignToBottom",
        useWindowScroll: "useWindowScroll",
        customScrollParent: "customScrollParent",
        scrollerRef: "scrollerRef",
        logLevel: "logLevel"
    },
    methods: {
        scrollToIndex: "scrollToIndex",
        scrollIntoView: "scrollIntoView",
        scrollTo: "scrollTo",
        scrollBy: "scrollBy",
        autoscrollToBottom: "autoscrollToBottom",
        getState: "getState"
    },
    events: {
        isScrolling: "isScrolling",
        endReached: "endReached",
        startReached: "startReached",
        rangeChanged: "rangeChanged",
        atBottomStateChange: "atBottomStateChange",
        atTopStateChange: "atTopStateChange",
        totalListHeightChanged: "totalListHeightChanged",
        itemsRendered: "itemsRendered",
        groupIndices: "groupIndices"
    }
}, $ed43cc03b55b9961$var$ListRoot);
const $ed43cc03b55b9961$var$Scroller$2 = /* @__PURE__ */ $ed43cc03b55b9961$var$buildScroller({
    usePublisher: $ed43cc03b55b9961$var$usePublisher$2,
    useEmitterValue: $ed43cc03b55b9961$var$useEmitterValue$2,
    useEmitter: $ed43cc03b55b9961$var$useEmitter$2
});
const $ed43cc03b55b9961$var$WindowScroller$2 = /* @__PURE__ */ $ed43cc03b55b9961$var$buildWindowScroller({
    usePublisher: $ed43cc03b55b9961$var$usePublisher$2,
    useEmitterValue: $ed43cc03b55b9961$var$useEmitterValue$2,
    useEmitter: $ed43cc03b55b9961$var$useEmitter$2
});
const $ed43cc03b55b9961$export$ea50ab61e1198ee3 = $ed43cc03b55b9961$var$List;
const $ed43cc03b55b9961$export$41737384f976dee3 = $ed43cc03b55b9961$var$List;
const $ed43cc03b55b9961$var$INITIAL_GRID_STATE = {
    items: [],
    offsetBottom: 0,
    offsetTop: 0,
    top: 0,
    bottom: 0,
    itemHeight: 0,
    itemWidth: 0
};
const $ed43cc03b55b9961$var$PROBE_GRID_STATE = {
    items: [
        {
            index: 0
        }
    ],
    offsetBottom: 0,
    offsetTop: 0,
    top: 0,
    bottom: 0,
    itemHeight: 0,
    itemWidth: 0
};
const { round: $ed43cc03b55b9961$var$round, ceil: $ed43cc03b55b9961$var$ceil, floor: $ed43cc03b55b9961$var$floor, min: $ed43cc03b55b9961$var$min, max: $ed43cc03b55b9961$var$max } = Math;
function $ed43cc03b55b9961$var$buildProbeGridState(items) {
    return {
        ...$ed43cc03b55b9961$var$PROBE_GRID_STATE,
        items: items
    };
}
function $ed43cc03b55b9961$var$buildItems(startIndex, endIndex, data) {
    return Array.from({
        length: endIndex - startIndex + 1
    }).map((_, i)=>{
        const dataItem = data === null ? null : data[i + startIndex];
        return {
            index: i + startIndex,
            data: dataItem
        };
    });
}
function $ed43cc03b55b9961$var$gapComparator(prev, next) {
    return prev && prev.column === next.column && prev.row === next.row;
}
function $ed43cc03b55b9961$var$dimensionComparator(prev, next) {
    return prev && prev.width === next.width && prev.height === next.height;
}
const $ed43cc03b55b9961$var$gridSystem = /* @__PURE__ */ $ed43cc03b55b9961$var$system(([{ overscan: overscan, visibleRange: visibleRange, listBoundary: listBoundary }, { scrollTop: scrollTop, viewportHeight: viewportHeight, scrollBy: scrollBy, scrollTo: scrollTo, smoothScrollTargetReached: smoothScrollTargetReached, scrollContainerState: scrollContainerState, footerHeight: footerHeight, headerHeight: headerHeight }, stateFlags, scrollSeek, { propsReady: propsReady, didMount: didMount }, { windowViewportRect: windowViewportRect, useWindowScroll: useWindowScroll, customScrollParent: customScrollParent, windowScrollContainerState: windowScrollContainerState, windowScrollTo: windowScrollTo }, log])=>{
    const totalCount = $ed43cc03b55b9961$var$statefulStream(0);
    const initialItemCount = $ed43cc03b55b9961$var$statefulStream(0);
    const gridState = $ed43cc03b55b9961$var$statefulStream($ed43cc03b55b9961$var$INITIAL_GRID_STATE);
    const viewportDimensions = $ed43cc03b55b9961$var$statefulStream({
        height: 0,
        width: 0
    });
    const itemDimensions = $ed43cc03b55b9961$var$statefulStream({
        height: 0,
        width: 0
    });
    const scrollToIndex = $ed43cc03b55b9961$var$stream();
    const scrollHeight = $ed43cc03b55b9961$var$stream();
    const deviation = $ed43cc03b55b9961$var$statefulStream(0);
    const data = $ed43cc03b55b9961$var$statefulStream(null);
    const gap = $ed43cc03b55b9961$var$statefulStream({
        row: 0,
        column: 0
    });
    const stateChanged = $ed43cc03b55b9961$var$stream();
    const restoreStateFrom = $ed43cc03b55b9961$var$stream();
    const stateRestoreInProgress = $ed43cc03b55b9961$var$statefulStream(false);
    const initialTopMostItemIndex = $ed43cc03b55b9961$var$statefulStream(0);
    const scrolledToInitialItem = $ed43cc03b55b9961$var$statefulStream(true);
    const scrollScheduled = $ed43cc03b55b9961$var$statefulStream(false);
    $ed43cc03b55b9961$var$subscribe($ed43cc03b55b9961$var$pipe(didMount, $ed43cc03b55b9961$var$withLatestFrom(initialTopMostItemIndex), $ed43cc03b55b9961$var$filter(([_, location])=>!!location)), ()=>{
        $ed43cc03b55b9961$var$publish(scrolledToInitialItem, false);
        $ed43cc03b55b9961$var$publish(initialItemCount, 0);
    });
    $ed43cc03b55b9961$var$subscribe($ed43cc03b55b9961$var$pipe($ed43cc03b55b9961$var$combineLatest(didMount, scrolledToInitialItem, itemDimensions, viewportDimensions, initialTopMostItemIndex, scrollScheduled), $ed43cc03b55b9961$var$filter(([didMount2, scrolledToInitialItem2, itemDimensions2, viewportDimensions2, , scrollScheduled2])=>{
        return didMount2 && !scrolledToInitialItem2 && itemDimensions2.height !== 0 && viewportDimensions2.height !== 0 && !scrollScheduled2;
    })), ([, , , , initialTopMostItemIndex2])=>{
        $ed43cc03b55b9961$var$publish(scrollScheduled, true);
        $ed43cc03b55b9961$var$skipFrames(1, ()=>{
            $ed43cc03b55b9961$var$publish(scrollToIndex, initialTopMostItemIndex2);
        });
        $ed43cc03b55b9961$var$handleNext($ed43cc03b55b9961$var$pipe(scrollTop), ()=>{
            $ed43cc03b55b9961$var$publish(listBoundary, [
                0,
                0
            ]);
            $ed43cc03b55b9961$var$publish(scrolledToInitialItem, true);
        });
    });
    $ed43cc03b55b9961$var$connect($ed43cc03b55b9961$var$pipe(restoreStateFrom, $ed43cc03b55b9961$var$filter((value)=>value !== void 0 && value !== null && value.scrollTop > 0), $ed43cc03b55b9961$var$mapTo(0)), initialItemCount);
    $ed43cc03b55b9961$var$subscribe($ed43cc03b55b9961$var$pipe(didMount, $ed43cc03b55b9961$var$withLatestFrom(restoreStateFrom), $ed43cc03b55b9961$var$filter(([, snapshot])=>snapshot !== void 0 && snapshot !== null)), ([, snapshot])=>{
        if (!snapshot) return;
        $ed43cc03b55b9961$var$publish(viewportDimensions, snapshot.viewport), $ed43cc03b55b9961$var$publish(itemDimensions, snapshot == null ? void 0 : snapshot.item);
        $ed43cc03b55b9961$var$publish(gap, snapshot.gap);
        if (snapshot.scrollTop > 0) {
            $ed43cc03b55b9961$var$publish(stateRestoreInProgress, true);
            $ed43cc03b55b9961$var$handleNext($ed43cc03b55b9961$var$pipe(scrollTop, $ed43cc03b55b9961$var$skip(1)), (_value)=>{
                $ed43cc03b55b9961$var$publish(stateRestoreInProgress, false);
            });
            $ed43cc03b55b9961$var$publish(scrollTo, {
                top: snapshot.scrollTop
            });
        }
    });
    $ed43cc03b55b9961$var$connect($ed43cc03b55b9961$var$pipe(viewportDimensions, $ed43cc03b55b9961$var$map(({ height: height })=>height)), viewportHeight);
    $ed43cc03b55b9961$var$connect($ed43cc03b55b9961$var$pipe($ed43cc03b55b9961$var$combineLatest($ed43cc03b55b9961$var$duc(viewportDimensions, $ed43cc03b55b9961$var$dimensionComparator), $ed43cc03b55b9961$var$duc(itemDimensions, $ed43cc03b55b9961$var$dimensionComparator), $ed43cc03b55b9961$var$duc(gap, (prev, next)=>prev && prev.column === next.column && prev.row === next.row), $ed43cc03b55b9961$var$duc(scrollTop)), $ed43cc03b55b9961$var$map(([viewport, item, gap2, scrollTop2])=>({
            viewport: viewport,
            item: item,
            gap: gap2,
            scrollTop: scrollTop2
        }))), stateChanged);
    $ed43cc03b55b9961$var$connect($ed43cc03b55b9961$var$pipe($ed43cc03b55b9961$var$combineLatest($ed43cc03b55b9961$var$duc(totalCount), visibleRange, $ed43cc03b55b9961$var$duc(gap, $ed43cc03b55b9961$var$gapComparator), $ed43cc03b55b9961$var$duc(itemDimensions, $ed43cc03b55b9961$var$dimensionComparator), $ed43cc03b55b9961$var$duc(viewportDimensions, $ed43cc03b55b9961$var$dimensionComparator), $ed43cc03b55b9961$var$duc(data), $ed43cc03b55b9961$var$duc(initialItemCount), $ed43cc03b55b9961$var$duc(stateRestoreInProgress), $ed43cc03b55b9961$var$duc(scrolledToInitialItem), $ed43cc03b55b9961$var$duc(initialTopMostItemIndex)), $ed43cc03b55b9961$var$filter(([, , , , , , , stateRestoreInProgress2])=>{
        return !stateRestoreInProgress2;
    }), $ed43cc03b55b9961$var$map(([totalCount2, [startOffset, endOffset], gap2, item, viewport, data2, initialItemCount2, , scrolledToInitialItem2, initialTopMostItemIndex2])=>{
        const { row: rowGap, column: columnGap } = gap2;
        const { height: itemHeight, width: itemWidth } = item;
        const { width: viewportWidth } = viewport;
        if (initialItemCount2 === 0 && (totalCount2 === 0 || viewportWidth === 0)) return $ed43cc03b55b9961$var$INITIAL_GRID_STATE;
        if (itemWidth === 0) {
            const startIndex2 = $ed43cc03b55b9961$var$getInitialTopMostItemIndexNumber(initialTopMostItemIndex2, totalCount2);
            const endIndex2 = startIndex2 === 0 ? Math.max(initialItemCount2 - 1, 0) : startIndex2;
            return $ed43cc03b55b9961$var$buildProbeGridState($ed43cc03b55b9961$var$buildItems(startIndex2, endIndex2, data2));
        }
        const perRow = $ed43cc03b55b9961$var$itemsPerRow(viewportWidth, itemWidth, columnGap);
        let startIndex;
        let endIndex;
        if (!scrolledToInitialItem2) {
            startIndex = 0;
            endIndex = -1;
        } else if (startOffset === 0 && endOffset === 0 && initialItemCount2 > 0) {
            startIndex = 0;
            endIndex = initialItemCount2 - 1;
        } else {
            startIndex = perRow * $ed43cc03b55b9961$var$floor((startOffset + rowGap) / (itemHeight + rowGap));
            endIndex = perRow * $ed43cc03b55b9961$var$ceil((endOffset + rowGap) / (itemHeight + rowGap)) - 1;
            endIndex = $ed43cc03b55b9961$var$min(totalCount2 - 1, $ed43cc03b55b9961$var$max(endIndex, perRow - 1));
            startIndex = $ed43cc03b55b9961$var$min(endIndex, $ed43cc03b55b9961$var$max(0, startIndex));
        }
        const items = $ed43cc03b55b9961$var$buildItems(startIndex, endIndex, data2);
        const { top: top, bottom: bottom } = $ed43cc03b55b9961$var$gridLayout(viewport, gap2, item, items);
        const rowCount = $ed43cc03b55b9961$var$ceil(totalCount2 / perRow);
        const totalHeight = rowCount * itemHeight + (rowCount - 1) * rowGap;
        const offsetBottom = totalHeight - bottom;
        return {
            items: items,
            offsetTop: top,
            offsetBottom: offsetBottom,
            top: top,
            bottom: bottom,
            itemHeight: itemHeight,
            itemWidth: itemWidth
        };
    })), gridState);
    $ed43cc03b55b9961$var$connect($ed43cc03b55b9961$var$pipe(data, $ed43cc03b55b9961$var$filter((data2)=>data2 !== null), $ed43cc03b55b9961$var$map((data2)=>data2.length)), totalCount);
    $ed43cc03b55b9961$var$connect($ed43cc03b55b9961$var$pipe($ed43cc03b55b9961$var$combineLatest(viewportDimensions, itemDimensions, gridState, gap), $ed43cc03b55b9961$var$filter(([viewportDimensions2, itemDimensions2, { items: items }])=>{
        return items.length > 0 && itemDimensions2.height !== 0 && viewportDimensions2.height !== 0;
    }), $ed43cc03b55b9961$var$map(([viewportDimensions2, itemDimensions2, { items: items }, gap2])=>{
        const { top: top, bottom: bottom } = $ed43cc03b55b9961$var$gridLayout(viewportDimensions2, gap2, itemDimensions2, items);
        return [
            top,
            bottom
        ];
    }), $ed43cc03b55b9961$var$distinctUntilChanged($ed43cc03b55b9961$var$tupleComparator)), listBoundary);
    const hasScrolled = $ed43cc03b55b9961$var$statefulStream(false);
    $ed43cc03b55b9961$var$connect($ed43cc03b55b9961$var$pipe(scrollTop, $ed43cc03b55b9961$var$withLatestFrom(hasScrolled), $ed43cc03b55b9961$var$map(([scrollTop2, hasScrolled2])=>{
        return hasScrolled2 || scrollTop2 !== 0;
    })), hasScrolled);
    const endReached = $ed43cc03b55b9961$var$streamFromEmitter($ed43cc03b55b9961$var$pipe($ed43cc03b55b9961$var$duc(gridState), $ed43cc03b55b9961$var$filter(({ items: items })=>items.length > 0), $ed43cc03b55b9961$var$withLatestFrom(totalCount, hasScrolled), $ed43cc03b55b9961$var$filter(([{ items: items }, totalCount2, hasScrolled2])=>hasScrolled2 && items[items.length - 1].index === totalCount2 - 1), $ed43cc03b55b9961$var$map(([, totalCount2])=>totalCount2 - 1), $ed43cc03b55b9961$var$distinctUntilChanged()));
    const startReached = $ed43cc03b55b9961$var$streamFromEmitter($ed43cc03b55b9961$var$pipe($ed43cc03b55b9961$var$duc(gridState), $ed43cc03b55b9961$var$filter(({ items: items })=>{
        return items.length > 0 && items[0].index === 0;
    }), // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    $ed43cc03b55b9961$var$mapTo(0), $ed43cc03b55b9961$var$distinctUntilChanged()));
    const rangeChanged = $ed43cc03b55b9961$var$streamFromEmitter($ed43cc03b55b9961$var$pipe($ed43cc03b55b9961$var$duc(gridState), $ed43cc03b55b9961$var$withLatestFrom(stateRestoreInProgress), $ed43cc03b55b9961$var$filter(([{ items: items }, stateRestoreInProgress2])=>items.length > 0 && !stateRestoreInProgress2), $ed43cc03b55b9961$var$map(([{ items: items }])=>{
        return {
            startIndex: items[0].index,
            endIndex: items[items.length - 1].index
        };
    }), $ed43cc03b55b9961$var$distinctUntilChanged($ed43cc03b55b9961$var$rangeComparator), $ed43cc03b55b9961$var$throttleTime(0)));
    $ed43cc03b55b9961$var$connect(rangeChanged, scrollSeek.scrollSeekRangeChanged);
    $ed43cc03b55b9961$var$connect($ed43cc03b55b9961$var$pipe(scrollToIndex, $ed43cc03b55b9961$var$withLatestFrom(viewportDimensions, itemDimensions, totalCount, gap), $ed43cc03b55b9961$var$map(([location, viewportDimensions2, itemDimensions2, totalCount2, gap2])=>{
        const normalLocation = $ed43cc03b55b9961$var$normalizeIndexLocation(location);
        const { align: align, behavior: behavior, offset: offset } = normalLocation;
        let index = normalLocation.index;
        if (index === "LAST") index = totalCount2 - 1;
        index = $ed43cc03b55b9961$var$max(0, index, $ed43cc03b55b9961$var$min(totalCount2 - 1, index));
        let top = $ed43cc03b55b9961$var$itemTop(viewportDimensions2, gap2, itemDimensions2, index);
        if (align === "end") top = $ed43cc03b55b9961$var$round(top - viewportDimensions2.height + itemDimensions2.height);
        else if (align === "center") top = $ed43cc03b55b9961$var$round(top - viewportDimensions2.height / 2 + itemDimensions2.height / 2);
        if (offset) top += offset;
        return {
            top: top,
            behavior: behavior
        };
    })), scrollTo);
    const totalListHeight = $ed43cc03b55b9961$var$statefulStreamFromEmitter($ed43cc03b55b9961$var$pipe(gridState, $ed43cc03b55b9961$var$map((gridState2)=>{
        return gridState2.offsetBottom + gridState2.bottom;
    })), 0);
    $ed43cc03b55b9961$var$connect($ed43cc03b55b9961$var$pipe(windowViewportRect, $ed43cc03b55b9961$var$map((viewportInfo)=>({
            width: viewportInfo.visibleWidth,
            height: viewportInfo.visibleHeight
        }))), viewportDimensions);
    return {
        data: // input
        data,
        totalCount: totalCount,
        viewportDimensions: viewportDimensions,
        itemDimensions: itemDimensions,
        scrollTop: scrollTop,
        scrollHeight: scrollHeight,
        overscan: overscan,
        scrollBy: scrollBy,
        scrollTo: scrollTo,
        scrollToIndex: scrollToIndex,
        smoothScrollTargetReached: smoothScrollTargetReached,
        windowViewportRect: windowViewportRect,
        windowScrollTo: windowScrollTo,
        useWindowScroll: useWindowScroll,
        customScrollParent: customScrollParent,
        windowScrollContainerState: windowScrollContainerState,
        deviation: deviation,
        scrollContainerState: scrollContainerState,
        footerHeight: footerHeight,
        headerHeight: headerHeight,
        initialItemCount: initialItemCount,
        gap: gap,
        restoreStateFrom: restoreStateFrom,
        ...scrollSeek,
        initialTopMostItemIndex: initialTopMostItemIndex,
        gridState: // output
        gridState,
        totalListHeight: totalListHeight,
        ...stateFlags,
        startReached: startReached,
        endReached: endReached,
        rangeChanged: rangeChanged,
        stateChanged: stateChanged,
        propsReady: propsReady,
        stateRestoreInProgress: stateRestoreInProgress,
        ...log
    };
}, $ed43cc03b55b9961$var$tup($ed43cc03b55b9961$var$sizeRangeSystem, $ed43cc03b55b9961$var$domIOSystem, $ed43cc03b55b9961$var$stateFlagsSystem, $ed43cc03b55b9961$var$scrollSeekSystem, $ed43cc03b55b9961$var$propsReadySystem, $ed43cc03b55b9961$var$windowScrollerSystem, $ed43cc03b55b9961$var$loggerSystem));
function $ed43cc03b55b9961$var$gridLayout(viewport, gap, item, items) {
    const { height: itemHeight } = item;
    if (itemHeight === void 0 || items.length === 0) return {
        top: 0,
        bottom: 0
    };
    const top = $ed43cc03b55b9961$var$itemTop(viewport, gap, item, items[0].index);
    const bottom = $ed43cc03b55b9961$var$itemTop(viewport, gap, item, items[items.length - 1].index) + itemHeight;
    return {
        top: top,
        bottom: bottom
    };
}
function $ed43cc03b55b9961$var$itemTop(viewport, gap, item, index) {
    const perRow = $ed43cc03b55b9961$var$itemsPerRow(viewport.width, item.width, gap.column);
    const rowCount = $ed43cc03b55b9961$var$floor(index / perRow);
    const top = rowCount * item.height + $ed43cc03b55b9961$var$max(0, rowCount - 1) * gap.row;
    return top > 0 ? top + gap.row : top;
}
function $ed43cc03b55b9961$var$itemsPerRow(viewportWidth, itemWidth, gap) {
    return $ed43cc03b55b9961$var$max(1, $ed43cc03b55b9961$var$floor((viewportWidth + gap) / ($ed43cc03b55b9961$var$floor(itemWidth) + gap)));
}
const $ed43cc03b55b9961$var$gridComponentPropsSystem = /* @__PURE__ */ $ed43cc03b55b9961$var$system(()=>{
    const itemContent = $ed43cc03b55b9961$var$statefulStream((index)=>`Item ${index}`);
    const components = $ed43cc03b55b9961$var$statefulStream({});
    const context = $ed43cc03b55b9961$var$statefulStream(null);
    const itemClassName = $ed43cc03b55b9961$var$statefulStream("virtuoso-grid-item");
    const listClassName = $ed43cc03b55b9961$var$statefulStream("virtuoso-grid-list");
    const computeItemKey = $ed43cc03b55b9961$var$statefulStream($ed43cc03b55b9961$var$identity);
    const headerFooterTag = $ed43cc03b55b9961$var$statefulStream("div");
    const scrollerRef = $ed43cc03b55b9961$var$statefulStream($ed43cc03b55b9961$var$noop);
    const distinctProp = (propName, defaultValue = null)=>{
        return $ed43cc03b55b9961$var$statefulStreamFromEmitter($ed43cc03b55b9961$var$pipe(components, $ed43cc03b55b9961$var$map((components2)=>components2[propName]), $ed43cc03b55b9961$var$distinctUntilChanged()), defaultValue);
    };
    return {
        context: context,
        itemContent: itemContent,
        components: components,
        computeItemKey: computeItemKey,
        itemClassName: itemClassName,
        listClassName: listClassName,
        headerFooterTag: headerFooterTag,
        scrollerRef: scrollerRef,
        FooterComponent: distinctProp("Footer"),
        HeaderComponent: distinctProp("Header"),
        ListComponent: distinctProp("List", "div"),
        ItemComponent: distinctProp("Item", "div"),
        ScrollerComponent: distinctProp("Scroller", "div"),
        ScrollSeekPlaceholder: distinctProp("ScrollSeekPlaceholder", "div")
    };
});
const $ed43cc03b55b9961$var$combinedSystem$1 = /* @__PURE__ */ $ed43cc03b55b9961$var$system(([gridSystem2, gridComponentPropsSystem2])=>{
    return {
        ...gridSystem2,
        ...gridComponentPropsSystem2
    };
}, $ed43cc03b55b9961$var$tup($ed43cc03b55b9961$var$gridSystem, $ed43cc03b55b9961$var$gridComponentPropsSystem));
const $ed43cc03b55b9961$var$GridItems = /* @__PURE__ */ (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).memo(function GridItems2() {
    const gridState = $ed43cc03b55b9961$var$useEmitterValue$1("gridState");
    const listClassName = $ed43cc03b55b9961$var$useEmitterValue$1("listClassName");
    const itemClassName = $ed43cc03b55b9961$var$useEmitterValue$1("itemClassName");
    const itemContent = $ed43cc03b55b9961$var$useEmitterValue$1("itemContent");
    const computeItemKey = $ed43cc03b55b9961$var$useEmitterValue$1("computeItemKey");
    const isSeeking = $ed43cc03b55b9961$var$useEmitterValue$1("isSeeking");
    const scrollHeightCallback = $ed43cc03b55b9961$var$usePublisher$1("scrollHeight");
    const ItemComponent = $ed43cc03b55b9961$var$useEmitterValue$1("ItemComponent");
    const ListComponent = $ed43cc03b55b9961$var$useEmitterValue$1("ListComponent");
    const ScrollSeekPlaceholder = $ed43cc03b55b9961$var$useEmitterValue$1("ScrollSeekPlaceholder");
    const context = $ed43cc03b55b9961$var$useEmitterValue$1("context");
    const itemDimensions = $ed43cc03b55b9961$var$usePublisher$1("itemDimensions");
    const gridGap = $ed43cc03b55b9961$var$usePublisher$1("gap");
    const log = $ed43cc03b55b9961$var$useEmitterValue$1("log");
    const stateRestoreInProgress = $ed43cc03b55b9961$var$useEmitterValue$1("stateRestoreInProgress");
    const listRef = $ed43cc03b55b9961$var$useSize((el)=>{
        const scrollHeight = el.parentElement.parentElement.scrollHeight;
        scrollHeightCallback(scrollHeight);
        const firstItem = el.firstChild;
        if (firstItem) {
            const { width: width, height: height } = firstItem.getBoundingClientRect();
            itemDimensions({
                width: width,
                height: height
            });
        }
        gridGap({
            row: $ed43cc03b55b9961$var$resolveGapValue("row-gap", getComputedStyle(el).rowGap, log),
            column: $ed43cc03b55b9961$var$resolveGapValue("column-gap", getComputedStyle(el).columnGap, log)
        });
    });
    if (stateRestoreInProgress) return null;
    return (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement(ListComponent, {
        ref: listRef,
        className: listClassName,
        ...$ed43cc03b55b9961$var$contextPropIfNotDomElement(ListComponent, context),
        style: {
            paddingTop: gridState.offsetTop,
            paddingBottom: gridState.offsetBottom
        },
        "data-test-id": "virtuoso-item-list"
    }, gridState.items.map((item)=>{
        const key = computeItemKey(item.index, item.data, context);
        return isSeeking ? (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement(ScrollSeekPlaceholder, {
            key: key,
            ...$ed43cc03b55b9961$var$contextPropIfNotDomElement(ScrollSeekPlaceholder, context),
            index: item.index,
            height: gridState.itemHeight,
            width: gridState.itemWidth
        }) : (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement(ItemComponent, {
            ...$ed43cc03b55b9961$var$contextPropIfNotDomElement(ItemComponent, context),
            className: itemClassName,
            "data-index": item.index,
            key: key
        }, itemContent(item.index, item.data, context));
    }));
});
const $ed43cc03b55b9961$var$Header = (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).memo(function VirtuosoHeader2() {
    const Header2 = $ed43cc03b55b9961$var$useEmitterValue$1("HeaderComponent");
    const headerHeight = $ed43cc03b55b9961$var$usePublisher$1("headerHeight");
    const headerFooterTag = $ed43cc03b55b9961$var$useEmitterValue$1("headerFooterTag");
    const ref = $ed43cc03b55b9961$var$useSize((el)=>headerHeight($ed43cc03b55b9961$var$correctItemSize(el, "height")));
    const context = $ed43cc03b55b9961$var$useEmitterValue$1("context");
    return Header2 ? (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement(headerFooterTag, {
        ref: ref
    }, (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement(Header2, $ed43cc03b55b9961$var$contextPropIfNotDomElement(Header2, context))) : null;
});
const $ed43cc03b55b9961$var$Footer = (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).memo(function VirtuosoGridFooter() {
    const Footer2 = $ed43cc03b55b9961$var$useEmitterValue$1("FooterComponent");
    const footerHeight = $ed43cc03b55b9961$var$usePublisher$1("footerHeight");
    const headerFooterTag = $ed43cc03b55b9961$var$useEmitterValue$1("headerFooterTag");
    const ref = $ed43cc03b55b9961$var$useSize((el)=>footerHeight($ed43cc03b55b9961$var$correctItemSize(el, "height")));
    const context = $ed43cc03b55b9961$var$useEmitterValue$1("context");
    return Footer2 ? (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement(headerFooterTag, {
        ref: ref
    }, (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement(Footer2, $ed43cc03b55b9961$var$contextPropIfNotDomElement(Footer2, context))) : null;
});
const $ed43cc03b55b9961$var$Viewport$1 = ({ children: children })=>{
    const ctx = (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).useContext($ed43cc03b55b9961$export$81e3217b4b7a890f);
    const itemDimensions = $ed43cc03b55b9961$var$usePublisher$1("itemDimensions");
    const viewportDimensions = $ed43cc03b55b9961$var$usePublisher$1("viewportDimensions");
    const viewportRef = $ed43cc03b55b9961$var$useSize((el)=>{
        viewportDimensions(el.getBoundingClientRect());
    });
    (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).useEffect(()=>{
        if (ctx) {
            viewportDimensions({
                height: ctx.viewportHeight,
                width: ctx.viewportWidth
            });
            itemDimensions({
                height: ctx.itemHeight,
                width: ctx.itemWidth
            });
        }
    }, [
        ctx,
        viewportDimensions,
        itemDimensions
    ]);
    return /* @__PURE__ */ (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement("div", {
        style: $ed43cc03b55b9961$var$viewportStyle,
        ref: viewportRef
    }, children);
};
const $ed43cc03b55b9961$var$WindowViewport$1 = ({ children: children })=>{
    const ctx = (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).useContext($ed43cc03b55b9961$export$81e3217b4b7a890f);
    const windowViewportRect = $ed43cc03b55b9961$var$usePublisher$1("windowViewportRect");
    const itemDimensions = $ed43cc03b55b9961$var$usePublisher$1("itemDimensions");
    const customScrollParent = $ed43cc03b55b9961$var$useEmitterValue$1("customScrollParent");
    const viewportRef = $ed43cc03b55b9961$var$useWindowViewportRectRef(windowViewportRect, customScrollParent);
    (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).useEffect(()=>{
        if (ctx) {
            itemDimensions({
                height: ctx.itemHeight,
                width: ctx.itemWidth
            });
            windowViewportRect({
                offsetTop: 0,
                visibleHeight: ctx.viewportHeight,
                visibleWidth: ctx.viewportWidth
            });
        }
    }, [
        ctx,
        windowViewportRect,
        itemDimensions
    ]);
    return /* @__PURE__ */ (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement("div", {
        ref: viewportRef,
        style: $ed43cc03b55b9961$var$viewportStyle
    }, children);
};
const $ed43cc03b55b9961$var$GridRoot = /* @__PURE__ */ (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).memo(function GridRoot2({ ...props }) {
    const useWindowScroll = $ed43cc03b55b9961$var$useEmitterValue$1("useWindowScroll");
    const customScrollParent = $ed43cc03b55b9961$var$useEmitterValue$1("customScrollParent");
    const TheScroller = customScrollParent || useWindowScroll ? $ed43cc03b55b9961$var$WindowScroller$1 : $ed43cc03b55b9961$var$Scroller$1;
    const TheViewport = customScrollParent || useWindowScroll ? $ed43cc03b55b9961$var$WindowViewport$1 : $ed43cc03b55b9961$var$Viewport$1;
    return /* @__PURE__ */ (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement(TheScroller, {
        ...props
    }, /* @__PURE__ */ (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement(TheViewport, null, /* @__PURE__ */ (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement($ed43cc03b55b9961$var$Header, null), /* @__PURE__ */ (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement($ed43cc03b55b9961$var$GridItems, null), /* @__PURE__ */ (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement($ed43cc03b55b9961$var$Footer, null)));
});
const { Component: $ed43cc03b55b9961$var$Grid, usePublisher: $ed43cc03b55b9961$var$usePublisher$1, useEmitterValue: $ed43cc03b55b9961$var$useEmitterValue$1, useEmitter: $ed43cc03b55b9961$var$useEmitter$1 } = /* @__PURE__ */ $ed43cc03b55b9961$var$systemToComponent($ed43cc03b55b9961$var$combinedSystem$1, {
    optional: {
        context: "context",
        totalCount: "totalCount",
        overscan: "overscan",
        itemContent: "itemContent",
        components: "components",
        computeItemKey: "computeItemKey",
        data: "data",
        initialItemCount: "initialItemCount",
        scrollSeekConfiguration: "scrollSeekConfiguration",
        headerFooterTag: "headerFooterTag",
        listClassName: "listClassName",
        itemClassName: "itemClassName",
        useWindowScroll: "useWindowScroll",
        customScrollParent: "customScrollParent",
        scrollerRef: "scrollerRef",
        logLevel: "logLevel",
        restoreStateFrom: "restoreStateFrom",
        initialTopMostItemIndex: "initialTopMostItemIndex"
    },
    methods: {
        scrollTo: "scrollTo",
        scrollBy: "scrollBy",
        scrollToIndex: "scrollToIndex"
    },
    events: {
        isScrolling: "isScrolling",
        endReached: "endReached",
        startReached: "startReached",
        rangeChanged: "rangeChanged",
        atBottomStateChange: "atBottomStateChange",
        atTopStateChange: "atTopStateChange",
        stateChanged: "stateChanged"
    }
}, $ed43cc03b55b9961$var$GridRoot);
const $ed43cc03b55b9961$var$Scroller$1 = /* @__PURE__ */ $ed43cc03b55b9961$var$buildScroller({
    usePublisher: $ed43cc03b55b9961$var$usePublisher$1,
    useEmitterValue: $ed43cc03b55b9961$var$useEmitterValue$1,
    useEmitter: $ed43cc03b55b9961$var$useEmitter$1
});
const $ed43cc03b55b9961$var$WindowScroller$1 = /* @__PURE__ */ $ed43cc03b55b9961$var$buildWindowScroller({
    usePublisher: $ed43cc03b55b9961$var$usePublisher$1,
    useEmitterValue: $ed43cc03b55b9961$var$useEmitterValue$1,
    useEmitter: $ed43cc03b55b9961$var$useEmitter$1
});
function $ed43cc03b55b9961$var$resolveGapValue(property, value, log) {
    if (value !== "normal" && !(value == null ? void 0 : value.endsWith("px"))) log(`${property} was not resolved to pixel value correctly`, value, $ed43cc03b55b9961$export$243e62d78d3b544d.WARN);
    if (value === "normal") return 0;
    return parseInt(value != null ? value : "0", 10);
}
const $ed43cc03b55b9961$export$eef3fd285144b65e = $ed43cc03b55b9961$var$Grid;
const $ed43cc03b55b9961$var$tableComponentPropsSystem = /* @__PURE__ */ $ed43cc03b55b9961$var$system(()=>{
    const itemContent = $ed43cc03b55b9961$var$statefulStream((index)=>/* @__PURE__ */ (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement("td", null, "Item $", index));
    const context = $ed43cc03b55b9961$var$statefulStream(null);
    const fixedHeaderContent = $ed43cc03b55b9961$var$statefulStream(null);
    const fixedFooterContent = $ed43cc03b55b9961$var$statefulStream(null);
    const components = $ed43cc03b55b9961$var$statefulStream({});
    const computeItemKey = $ed43cc03b55b9961$var$statefulStream($ed43cc03b55b9961$var$identity);
    const scrollerRef = $ed43cc03b55b9961$var$statefulStream($ed43cc03b55b9961$var$noop);
    const distinctProp = (propName, defaultValue = null)=>{
        return $ed43cc03b55b9961$var$statefulStreamFromEmitter($ed43cc03b55b9961$var$pipe(components, $ed43cc03b55b9961$var$map((components2)=>components2[propName]), $ed43cc03b55b9961$var$distinctUntilChanged()), defaultValue);
    };
    return {
        context: context,
        itemContent: itemContent,
        fixedHeaderContent: fixedHeaderContent,
        fixedFooterContent: fixedFooterContent,
        components: components,
        computeItemKey: computeItemKey,
        scrollerRef: scrollerRef,
        TableComponent: distinctProp("Table", "table"),
        TableHeadComponent: distinctProp("TableHead", "thead"),
        TableFooterComponent: distinctProp("TableFoot", "tfoot"),
        TableBodyComponent: distinctProp("TableBody", "tbody"),
        TableRowComponent: distinctProp("TableRow", "tr"),
        ScrollerComponent: distinctProp("Scroller", "div"),
        EmptyPlaceholder: distinctProp("EmptyPlaceholder"),
        ScrollSeekPlaceholder: distinctProp("ScrollSeekPlaceholder"),
        FillerRow: distinctProp("FillerRow")
    };
});
const $ed43cc03b55b9961$var$combinedSystem = /* @__PURE__ */ $ed43cc03b55b9961$var$system(([listSystem2, propsSystem])=>{
    return {
        ...listSystem2,
        ...propsSystem
    };
}, $ed43cc03b55b9961$var$tup($ed43cc03b55b9961$var$listSystem, $ed43cc03b55b9961$var$tableComponentPropsSystem));
const $ed43cc03b55b9961$var$DefaultScrollSeekPlaceholder = ({ height: height })=>/* @__PURE__ */ (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement("tr", null, /* @__PURE__ */ (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement("td", {
        style: {
            height: height
        }
    }));
const $ed43cc03b55b9961$var$DefaultFillerRow = ({ height: height })=>/* @__PURE__ */ (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement("tr", null, /* @__PURE__ */ (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement("td", {
        style: {
            height: height,
            padding: 0,
            border: 0
        }
    }));
const $ed43cc03b55b9961$var$ITEM_STYLE = {
    overflowAnchor: "none"
};
const $ed43cc03b55b9961$var$Items = /* @__PURE__ */ (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).memo(function VirtuosoItems2() {
    const listState = $ed43cc03b55b9961$var$useEmitterValue("listState");
    const sizeRanges = $ed43cc03b55b9961$var$usePublisher("sizeRanges");
    const useWindowScroll = $ed43cc03b55b9961$var$useEmitterValue("useWindowScroll");
    const customScrollParent = $ed43cc03b55b9961$var$useEmitterValue("customScrollParent");
    const windowScrollContainerStateCallback = $ed43cc03b55b9961$var$usePublisher("windowScrollContainerState");
    const _scrollContainerStateCallback = $ed43cc03b55b9961$var$usePublisher("scrollContainerState");
    const scrollContainerStateCallback = customScrollParent || useWindowScroll ? windowScrollContainerStateCallback : _scrollContainerStateCallback;
    const itemContent = $ed43cc03b55b9961$var$useEmitterValue("itemContent");
    const trackItemSizes = $ed43cc03b55b9961$var$useEmitterValue("trackItemSizes");
    const itemSize = $ed43cc03b55b9961$var$useEmitterValue("itemSize");
    const log = $ed43cc03b55b9961$var$useEmitterValue("log");
    const { callbackRef: callbackRef, ref: ref } = $ed43cc03b55b9961$var$useChangedListContentsSizes(sizeRanges, itemSize, trackItemSizes, scrollContainerStateCallback, log, void 0, customScrollParent);
    const [deviation, setDeviation] = (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).useState(0);
    $ed43cc03b55b9961$var$useEmitter("deviation", (value)=>{
        if (deviation !== value) {
            ref.current.style.marginTop = `${value}px`;
            setDeviation(value);
        }
    });
    const EmptyPlaceholder = $ed43cc03b55b9961$var$useEmitterValue("EmptyPlaceholder");
    const ScrollSeekPlaceholder = $ed43cc03b55b9961$var$useEmitterValue("ScrollSeekPlaceholder") || $ed43cc03b55b9961$var$DefaultScrollSeekPlaceholder;
    const FillerRow = $ed43cc03b55b9961$var$useEmitterValue("FillerRow") || $ed43cc03b55b9961$var$DefaultFillerRow;
    const TableBodyComponent = $ed43cc03b55b9961$var$useEmitterValue("TableBodyComponent");
    const TableRowComponent = $ed43cc03b55b9961$var$useEmitterValue("TableRowComponent");
    const computeItemKey = $ed43cc03b55b9961$var$useEmitterValue("computeItemKey");
    const isSeeking = $ed43cc03b55b9961$var$useEmitterValue("isSeeking");
    const paddingTopAddition = $ed43cc03b55b9961$var$useEmitterValue("paddingTopAddition");
    const firstItemIndex = $ed43cc03b55b9961$var$useEmitterValue("firstItemIndex");
    const statefulTotalCount = $ed43cc03b55b9961$var$useEmitterValue("statefulTotalCount");
    const context = $ed43cc03b55b9961$var$useEmitterValue("context");
    if (statefulTotalCount === 0 && EmptyPlaceholder) return (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement(EmptyPlaceholder, $ed43cc03b55b9961$var$contextPropIfNotDomElement(EmptyPlaceholder, context));
    const paddingTop = listState.offsetTop + paddingTopAddition + deviation;
    const paddingBottom = listState.offsetBottom;
    const paddingTopEl = paddingTop > 0 ? /* @__PURE__ */ (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement(FillerRow, {
        height: paddingTop,
        key: "padding-top",
        context: context
    }) : null;
    const paddingBottomEl = paddingBottom > 0 ? /* @__PURE__ */ (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement(FillerRow, {
        height: paddingBottom,
        key: "padding-bottom",
        context: context
    }) : null;
    const items = listState.items.map((item)=>{
        const index = item.originalIndex;
        const key = computeItemKey(index + firstItemIndex, item.data, context);
        if (isSeeking) return (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement(ScrollSeekPlaceholder, {
            ...$ed43cc03b55b9961$var$contextPropIfNotDomElement(ScrollSeekPlaceholder, context),
            key: key,
            index: item.index,
            height: item.size,
            type: item.type || "item"
        });
        return (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement(TableRowComponent, {
            ...$ed43cc03b55b9961$var$contextPropIfNotDomElement(TableRowComponent, context),
            ...$ed43cc03b55b9961$var$itemPropIfNotDomElement(TableRowComponent, item.data),
            key: key,
            "data-index": index,
            "data-known-size": item.size,
            "data-item-index": item.index,
            style: $ed43cc03b55b9961$var$ITEM_STYLE
        }, itemContent(item.index, item.data, context));
    });
    return (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement(TableBodyComponent, {
        ref: callbackRef,
        "data-test-id": "virtuoso-item-list",
        ...$ed43cc03b55b9961$var$contextPropIfNotDomElement(TableBodyComponent, context)
    }, [
        paddingTopEl,
        ...items,
        paddingBottomEl
    ]);
});
const $ed43cc03b55b9961$var$Viewport = ({ children: children })=>{
    const ctx = (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).useContext($ed43cc03b55b9961$export$99e9d54e386aea7b);
    const viewportHeight = $ed43cc03b55b9961$var$usePublisher("viewportHeight");
    const fixedItemHeight = $ed43cc03b55b9961$var$usePublisher("fixedItemHeight");
    const viewportRef = $ed43cc03b55b9961$var$useSize($ed43cc03b55b9961$var$compose(viewportHeight, (el)=>$ed43cc03b55b9961$var$correctItemSize(el, "height")));
    (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).useEffect(()=>{
        if (ctx) {
            viewportHeight(ctx.viewportHeight);
            fixedItemHeight(ctx.itemHeight);
        }
    }, [
        ctx,
        viewportHeight,
        fixedItemHeight
    ]);
    return /* @__PURE__ */ (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement("div", {
        style: $ed43cc03b55b9961$var$viewportStyle,
        ref: viewportRef,
        "data-viewport-type": "element"
    }, children);
};
const $ed43cc03b55b9961$var$WindowViewport = ({ children: children })=>{
    const ctx = (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).useContext($ed43cc03b55b9961$export$99e9d54e386aea7b);
    const windowViewportRect = $ed43cc03b55b9961$var$usePublisher("windowViewportRect");
    const fixedItemHeight = $ed43cc03b55b9961$var$usePublisher("fixedItemHeight");
    const customScrollParent = $ed43cc03b55b9961$var$useEmitterValue("customScrollParent");
    const viewportRef = $ed43cc03b55b9961$var$useWindowViewportRectRef(windowViewportRect, customScrollParent);
    (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).useEffect(()=>{
        if (ctx) {
            fixedItemHeight(ctx.itemHeight);
            windowViewportRect({
                offsetTop: 0,
                visibleHeight: ctx.viewportHeight,
                visibleWidth: 100
            });
        }
    }, [
        ctx,
        windowViewportRect,
        fixedItemHeight
    ]);
    return /* @__PURE__ */ (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement("div", {
        ref: viewportRef,
        style: $ed43cc03b55b9961$var$viewportStyle,
        "data-viewport-type": "window"
    }, children);
};
const $ed43cc03b55b9961$var$TableRoot = /* @__PURE__ */ (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).memo(function TableVirtuosoRoot(props) {
    const useWindowScroll = $ed43cc03b55b9961$var$useEmitterValue("useWindowScroll");
    const customScrollParent = $ed43cc03b55b9961$var$useEmitterValue("customScrollParent");
    const fixedHeaderHeight = $ed43cc03b55b9961$var$usePublisher("fixedHeaderHeight");
    const fixedFooterHeight = $ed43cc03b55b9961$var$usePublisher("fixedFooterHeight");
    const fixedHeaderContent = $ed43cc03b55b9961$var$useEmitterValue("fixedHeaderContent");
    const fixedFooterContent = $ed43cc03b55b9961$var$useEmitterValue("fixedFooterContent");
    const context = $ed43cc03b55b9961$var$useEmitterValue("context");
    const theadRef = $ed43cc03b55b9961$var$useSize($ed43cc03b55b9961$var$compose(fixedHeaderHeight, (el)=>$ed43cc03b55b9961$var$correctItemSize(el, "height")));
    const tfootRef = $ed43cc03b55b9961$var$useSize($ed43cc03b55b9961$var$compose(fixedFooterHeight, (el)=>$ed43cc03b55b9961$var$correctItemSize(el, "height")));
    const TheScroller = customScrollParent || useWindowScroll ? $ed43cc03b55b9961$var$WindowScroller : $ed43cc03b55b9961$var$Scroller;
    const TheViewport = customScrollParent || useWindowScroll ? $ed43cc03b55b9961$var$WindowViewport : $ed43cc03b55b9961$var$Viewport;
    const TheTable = $ed43cc03b55b9961$var$useEmitterValue("TableComponent");
    const TheTHead = $ed43cc03b55b9961$var$useEmitterValue("TableHeadComponent");
    const TheTFoot = $ed43cc03b55b9961$var$useEmitterValue("TableFooterComponent");
    const theHead = fixedHeaderContent ? (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement(TheTHead, {
        key: "TableHead",
        style: {
            zIndex: 2,
            position: "sticky",
            top: 0
        },
        ref: theadRef,
        ...$ed43cc03b55b9961$var$contextPropIfNotDomElement(TheTHead, context)
    }, fixedHeaderContent()) : null;
    const theFoot = fixedFooterContent ? (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement(TheTFoot, {
        key: "TableFoot",
        style: {
            zIndex: 1,
            position: "sticky",
            bottom: 0
        },
        ref: tfootRef,
        ...$ed43cc03b55b9961$var$contextPropIfNotDomElement(TheTFoot, context)
    }, fixedFooterContent()) : null;
    return /* @__PURE__ */ (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement(TheScroller, {
        ...props
    }, /* @__PURE__ */ (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement(TheViewport, null, (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement(TheTable, {
        style: {
            borderSpacing: 0,
            overflowAnchor: "none"
        },
        ...$ed43cc03b55b9961$var$contextPropIfNotDomElement(TheTable, context)
    }, [
        theHead,
        /* @__PURE__ */ (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).createElement($ed43cc03b55b9961$var$Items, {
            key: "TableBody"
        }),
        theFoot
    ])));
});
const { Component: $ed43cc03b55b9961$var$Table, usePublisher: $ed43cc03b55b9961$var$usePublisher, useEmitterValue: $ed43cc03b55b9961$var$useEmitterValue, useEmitter: $ed43cc03b55b9961$var$useEmitter } = /* @__PURE__ */ $ed43cc03b55b9961$var$systemToComponent($ed43cc03b55b9961$var$combinedSystem, {
    required: {},
    optional: {
        restoreStateFrom: "restoreStateFrom",
        context: "context",
        followOutput: "followOutput",
        firstItemIndex: "firstItemIndex",
        itemContent: "itemContent",
        fixedHeaderContent: "fixedHeaderContent",
        fixedFooterContent: "fixedFooterContent",
        overscan: "overscan",
        increaseViewportBy: "increaseViewportBy",
        totalCount: "totalCount",
        topItemCount: "topItemCount",
        initialTopMostItemIndex: "initialTopMostItemIndex",
        components: "components",
        groupCounts: "groupCounts",
        atBottomThreshold: "atBottomThreshold",
        atTopThreshold: "atTopThreshold",
        computeItemKey: "computeItemKey",
        defaultItemHeight: "defaultItemHeight",
        fixedItemHeight: "fixedItemHeight",
        itemSize: "itemSize",
        scrollSeekConfiguration: "scrollSeekConfiguration",
        data: "data",
        initialItemCount: "initialItemCount",
        initialScrollTop: "initialScrollTop",
        alignToBottom: "alignToBottom",
        useWindowScroll: "useWindowScroll",
        customScrollParent: "customScrollParent",
        scrollerRef: "scrollerRef",
        logLevel: "logLevel"
    },
    methods: {
        scrollToIndex: "scrollToIndex",
        scrollIntoView: "scrollIntoView",
        scrollTo: "scrollTo",
        scrollBy: "scrollBy",
        getState: "getState"
    },
    events: {
        isScrolling: "isScrolling",
        endReached: "endReached",
        startReached: "startReached",
        rangeChanged: "rangeChanged",
        atBottomStateChange: "atBottomStateChange",
        atTopStateChange: "atTopStateChange",
        totalListHeightChanged: "totalListHeightChanged",
        itemsRendered: "itemsRendered",
        groupIndices: "groupIndices"
    }
}, $ed43cc03b55b9961$var$TableRoot);
const $ed43cc03b55b9961$var$Scroller = /* @__PURE__ */ $ed43cc03b55b9961$var$buildScroller({
    usePublisher: $ed43cc03b55b9961$var$usePublisher,
    useEmitterValue: $ed43cc03b55b9961$var$useEmitterValue,
    useEmitter: $ed43cc03b55b9961$var$useEmitter
});
const $ed43cc03b55b9961$var$WindowScroller = /* @__PURE__ */ $ed43cc03b55b9961$var$buildWindowScroller({
    usePublisher: $ed43cc03b55b9961$var$usePublisher,
    useEmitterValue: $ed43cc03b55b9961$var$useEmitterValue,
    useEmitter: $ed43cc03b55b9961$var$useEmitter
});
const $ed43cc03b55b9961$export$3631598018434e6e = $ed43cc03b55b9961$var$Table;

});


})();
//# sourceMappingURL=Side.d0586ad5.js.map
