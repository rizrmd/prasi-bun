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
parcelRegister("4RKhA", function(module, exports) {

$parcel$export(module.exports, "ESide", () => $475d4bd78b640430$export$67a99baba9cd1fa0);

var $lAN3N = parcelRequire("lAN3N");

var $63SH6 = parcelRequire("63SH6");

var $4WfNn = parcelRequire("4WfNn");

var $8QizP = parcelRequire("8QizP");

var $aVHaH = parcelRequire("aVHaH");

var $eoQBx = parcelRequire("eoQBx");

var $eS1Mm = parcelRequire("eS1Mm");

var $a7GGz = parcelRequire("a7GGz");

var $8l3Wa = parcelRequire("8l3Wa");

var $bwyLh = parcelRequire("bwyLh");

var $4BXR3 = parcelRequire("4BXR3");

var $9LESc = parcelRequire("9LESc");

var $j4Xk5 = parcelRequire("j4Xk5");

var $eGTfQ = parcelRequire("eGTfQ");

var $gYVef = parcelRequire("gYVef");

var $4KU0E = parcelRequire("4KU0E");

var $bhjA3 = parcelRequire("bhjA3");

var $9ABAk = parcelRequire("9ABAk");
const $475d4bd78b640430$export$67a99baba9cd1fa0 = ()=>{
    const p = (0, $4WfNn.useGlobal)((0, $eoQBx.EditorGlobal), "EDITOR");
    const local = (0, $4WfNn.useLocal)({
        rootEditingProps: false,
        lastActive: null
    });
    p.softRender.side = local.render;
    const update = (0, $63SH6.useCallback)((key, value)=>{
        if (p.item.active) {
            const meta = p.treeMeta[p.item.active];
            if (meta) {
                let mitem = meta.comp ? meta.comp.mcomp : meta.mitem;
                mitem.doc?.transact(()=>{
                    if (p.mode === "mobile") {
                        let mobile = mitem.get("mobile");
                        if (!mobile) {
                            mitem.set("mobile", new $aVHaH.Map());
                            mobile = mitem.get("mobile");
                        }
                        mitem = mobile;
                    }
                    let prop = mitem?.get(key);
                    if (!prop) {
                        let nprop = null;
                        if (typeof value === "object") {
                            if (Array.isArray(value)) nprop = new $aVHaH.Array();
                            else nprop = new $aVHaH.Map();
                        }
                        if (mitem) {
                            mitem.set(key, nprop);
                            prop = mitem.get(key);
                        }
                    }
                    if (prop) (0, $8QizP.syncronize)(prop, value);
                });
            }
        }
    }, [
        p.item.active
    ]);
    let meta = p.item.active ? p.treeMeta[p.item.active] : null;
    if (!meta) return /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
        className: cx("side flex select-none relative overflow-x-hidden overflow-y-auto p-3 text-sm items-center justify-center text-slate-500"),
        children: "Please select an item"
    });
    const item = meta.item;
    const rootComponentID = p.comp?.id;
    let compItem = item.component;
    let isComponentRoot = false;
    if (rootComponentID && rootComponentID === compItem?.id) {
        compItem = undefined;
        isComponentRoot = true;
    }
    let mitem = meta ? meta.mitem : null;
    if (isComponentRoot && meta.comp) mitem = meta.comp.mcomp;
    if (!isComponentRoot) {
        local.rootEditingProps = false;
        local.lastActive = null;
    }
    if (compItem && !compItem.props) {
        const comp = mitem?.get("component");
        if (comp) comp.set("props", new $aVHaH.Map());
    }
    let active = item;
    return /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
        className: cx("side flex select-none relative overflow-x-hidden overflow-y-auto"),
        onPointerEnter: ()=>{
            p.item.sideHover = true;
            p.render();
        },
        onPointerLeave: ()=>{
            p.item.sideHover = false;
            p.render();
        },
        children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
            className: "absolute inset-0 flex flex-col items-stretch justify-start text-[13px]",
            children: mitem ? /*#__PURE__*/ (0, $lAN3N.jsx)((0, $lAN3N.Fragment), {
                children: compItem?.id ? /*#__PURE__*/ (0, $lAN3N.jsx)((0, $lAN3N.Fragment), {
                    children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $gYVef.CPInstance), {
                        mitem: mitem
                    })
                }) : /*#__PURE__*/ (0, $lAN3N.jsx)((0, $lAN3N.Fragment), {
                    children: rootComponentID && p.compProp.edit ? /*#__PURE__*/ (0, $lAN3N.jsx)((0, $lAN3N.Fragment), {
                        children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $4KU0E.CPMaster), {
                            mitem: mitem
                        })
                    }) : /*#__PURE__*/ (0, $lAN3N.jsxs)((0, $lAN3N.Fragment), {
                        children: [
                            /*#__PURE__*/ (0, $lAN3N.jsx)((0, $9ABAk.SideLabel), {
                                sep: "bottom",
                                children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                    className: "flex items-center justify-between",
                                    children: !rootComponentID ? /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                        children: "LAYOUT"
                                    }) : /*#__PURE__*/ (0, $lAN3N.jsx)((0, $lAN3N.Fragment), {
                                        children: /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                                            className: "flex mr-1 px-2 bg-white text-xs border rounded-sm cursor-pointer hover:bg-blue-50 hover:border-blue-500 text-blue-700 space-x-1",
                                            onClick: (e)=>{
                                                e.preventDefault();
                                                e.stopPropagation();
                                                p.compProp.edit = true;
                                                p.render();
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                                    children: "Edit Prop:"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                                    className: "text-ellipsis font-bold",
                                                    children: meta.comp?.mcomp?.get("name") || meta.parent_comp?.item.name
                                                })
                                            ]
                                        })
                                    })
                                })
                            }),
                            /*#__PURE__*/ (0, $lAN3N.jsxs)((0, $bhjA3.SideBox), {
                                children: [
                                    /*#__PURE__*/ (0, $lAN3N.jsx)((0, $a7GGz.PanelAutoLayout), {
                                        value: active,
                                        mode: p.mode,
                                        update: update
                                    }),
                                    /*#__PURE__*/ (0, $lAN3N.jsx)((0, $eGTfQ.PanelPadding), {
                                        id: p.item.active,
                                        value: active,
                                        mode: p.mode,
                                        update: update
                                    }),
                                    /*#__PURE__*/ (0, $lAN3N.jsx)((0, $4BXR3.PanelDimension), {
                                        value: active,
                                        mode: p.mode,
                                        id: p.item.active,
                                        update: update
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0, $lAN3N.jsx)((0, $9ABAk.SideLabel), {
                                children: "BACKGROUND"
                            }),
                            /*#__PURE__*/ (0, $lAN3N.jsx)((0, $bhjA3.SideBox), {
                                children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $8l3Wa.PanelBackground), {
                                    value: active,
                                    mode: p.mode,
                                    update: update
                                })
                            }),
                            /*#__PURE__*/ (0, $lAN3N.jsx)((0, $9ABAk.SideLabel), {
                                children: "FONT"
                            }),
                            /*#__PURE__*/ (0, $lAN3N.jsx)((0, $bhjA3.SideBox), {
                                children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $9LESc.PanelFont), {
                                    value: active,
                                    mode: p.mode,
                                    update: update
                                })
                            }),
                            /*#__PURE__*/ (0, $lAN3N.jsx)((0, $9ABAk.SideLabel), {
                                children: "BORDER"
                            }),
                            /*#__PURE__*/ (0, $lAN3N.jsx)((0, $bhjA3.SideBox), {
                                children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $bwyLh.PanelBorder), {
                                    value: active,
                                    mode: p.mode,
                                    update: update
                                })
                            }),
                            /*#__PURE__*/ (0, $lAN3N.jsx)((0, $9ABAk.SideLabel), {
                                children: "ADVANCED"
                            }),
                            /*#__PURE__*/ (0, $lAN3N.jsxs)((0, $bhjA3.SideBox), {
                                children: [
                                    /*#__PURE__*/ (0, $lAN3N.jsx)((0, $j4Xk5.PanelLink), {
                                        value: active,
                                        mode: p.mode,
                                        update: update
                                    }),
                                    /*#__PURE__*/ (0, $lAN3N.jsx)((0, $eS1Mm.PanelAdv), {
                                        value: active,
                                        mode: p.mode,
                                        update: update
                                    })
                                ]
                            })
                        ]
                    })
                })
            }) : /*#__PURE__*/ (0, $lAN3N.jsx)((0, $lAN3N.Fragment), {})
        })
    });
};

});
parcelRegister("eS1Mm", function(module, exports) {

$parcel$export(module.exports, "PanelAdv", () => $988c41acdccfaa16$export$4a8bb35652d5fce6);

var $lAN3N = parcelRequire("lAN3N");

var $4WfNn = parcelRequire("4WfNn");

var $eoQBx = parcelRequire("eoQBx");

var $6ai3B = parcelRequire("6ai3B");
const $988c41acdccfaa16$export$4a8bb35652d5fce6 = ({ value: value, update: update })=>{
    const p = (0, $4WfNn.useGlobal)((0, $eoQBx.EditorGlobal), "EDITOR");
    const adv = p.mpage?.get("adv")?.toJSON() || {};
    return /*#__PURE__*/ (0, $lAN3N.jsx)((0, $lAN3N.Fragment), {
        children: /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
            className: cx("flex items-stretch justify-between space-x-2", css`
            button {
              min-width: 0px;
            }
          `),
            children: [
                /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                    className: cx("bg-white p-[2px] border flex flex-1 border-gray-300", css`
              > * {
                flex: 1;
              }
            `, !!adv.css && css`
                button {
                  background: #e8ffe8;
                  border-bottom: solid green !important;
                }
              `),
                    children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $6ai3B.Button), {
                        onClick: ()=>{
                            p.script.active = true;
                            p.script.type = "css";
                            p.render();
                        },
                        appearance: "subtle",
                        children: "CSS"
                    })
                }),
                /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                    className: cx("bg-white p-[2px] border flex flex-1 border-gray-300", css`
              > * {
                flex: 1;
              }
            `, !!adv.html && [
                        css`
                button {
                  background: #e8f5ff;
                  border-bottom: 2px solid blue !important;
                }
              `
                    ]),
                    children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $6ai3B.Button), {
                        onClick: ()=>{
                            p.script.active = true;
                            p.script.type = "html";
                            p.render();
                        },
                        appearance: "subtle",
                        children: "HTML"
                    })
                }),
                /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                    className: cx("bg-white p-[2px] border flex flex-1 border-gray-300", css`
              > * {
                flex: 1;
              }
            `, !!adv.js && [
                        css`
                button {
                  background: #fff4e8;
                  border-bottom: 2px solid orange !important;
                }
              `
                    ]),
                    children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $6ai3B.Button), {
                        appearance: "subtle",
                        className: "js",
                        onClick: ()=>{
                            p.script.active = true;
                            p.script.type = "js";
                            p.render();
                        },
                        children: "JS"
                    })
                })
            ]
        })
    });
};

});
parcelRegister("6ai3B", function(module, exports) {

$parcel$export(module.exports, "Button", () => $3d101778ef5811d9$export$353f5b6fc5456de1);

var $lAN3N = parcelRequire("lAN3N");
const $3d101778ef5811d9$export$353f5b6fc5456de1 = ({ children: children, appearance: appearance, className: className, onClick: onClick })=>{
    return /*#__PURE__*/ (0, $lAN3N.jsx)("button", {
        className: cx("transition-all flex items-center justify-center border select-none outline-none prasi-btn", css`
          height: 25px;
          width: 28px;
        `, className, appearance !== "subtle" ? "bg-white border-[#d1d5db] hover:border-[#ccc] active:bg-[#d1d1d1] focus:border-[#ccc]" : "active:bg-[#d1d1d1] hover:bg-white hover:bg-opacity-50 cursor-pointer border-transparent hover:border-blue-100 focus:border-[#ccc]"),
        onClick: onClick,
        children: children
    });
};

});


parcelRegister("a7GGz", function(module, exports) {

$parcel$export(module.exports, "PanelAutoLayout", () => $3c8a82cfebb971cb$export$8f1fcd267da1c03c);

var $lAN3N = parcelRequire("lAN3N");

var $4WfNn = parcelRequire("4WfNn");

var $bTIRf = parcelRequire("bTIRf");

var $emJmR = parcelRequire("emJmR");

var $bjM6F = parcelRequire("bjM6F");

var $eClhP = parcelRequire("eClhP");

var $6ai3B = parcelRequire("6ai3B");

var $34isQ = parcelRequire("34isQ");

var $3M49X = parcelRequire("3M49X");

var $kGdHA = parcelRequire("kGdHA");

var $lvFnH = parcelRequire("lvFnH");
const $3c8a82cfebb971cb$export$8f1fcd267da1c03c = ({ value: value, update: update, mode: mode })=>{
    const local = (0, $4WfNn.useLocal)({
        lastGap: 0,
        open: false
    });
    const layout = (0, $bjM6F.responsiveVal)(value, "layout", mode, {
        dir: "col",
        align: "top-left",
        gap: 0,
        wrap: "flex-nowrap"
    });
    return /*#__PURE__*/ (0, $lAN3N.jsx)((0, $lAN3N.Fragment), {
        children: /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
            className: "flex items-stretch justify-between",
            children: [
                /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                    className: "flex flex-col items-stretch justify-around w-[125px] space-y-[5px]",
                    children: [
                        /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                            className: cx("flex flex-row space-x-1 items-center"),
                            children: [
                                /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                                    className: cx(`flex flex-row space-x-1 border ${"border-slate-300"} fg`, css`
                  padding-left: 1px;
                `),
                                    children: [
                                        /*#__PURE__*/ (0, $lAN3N.jsx)((0, $eClhP.BoxSep), {
                                            className: cx("justify-between  my-0.5", css`
                    padding: 0px;
                    & > button {
                      min-width: 0px;
                      flex: 1;
                      padding: 2px 4px;
                    }
                  `),
                                            children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $34isQ.FieldBtnRadio), {
                                                items: {
                                                    col: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $emJmR.Tooltip), {
                                                        content: "Direction: Column",
                                                        children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                                            children: /*#__PURE__*/ (0, $lAN3N.jsx)($3c8a82cfebb971cb$var$TapDown, {})
                                                        })
                                                    }),
                                                    row: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $emJmR.Tooltip), {
                                                        content: "Direction: Row",
                                                        children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                                            children: /*#__PURE__*/ (0, $lAN3N.jsx)($3c8a82cfebb971cb$var$TapRight, {})
                                                        })
                                                    })
                                                },
                                                value: layout.dir,
                                                disabled: false,
                                                update: (dir)=>{
                                                    let align = layout.align;
                                                    if (layout.gap === "auto") {
                                                        if (dir.startsWith("col") && align === "top") align = "left";
                                                        if (dir.startsWith("col") && align === "bottom") align = "right";
                                                        if (dir.startsWith("row") && align === "left") align = "top";
                                                        if (dir.startsWith("row") && align === "right") align = "bottom";
                                                    }
                                                    update("layout", {
                                                        ...layout,
                                                        align: align,
                                                        dir: dir
                                                    });
                                                    local.render();
                                                }
                                            })
                                        }),
                                        /*#__PURE__*/ (0, $lAN3N.jsx)((0, $bTIRf.Popover), {
                                            open: local.open,
                                            onOpenChange: (open)=>{
                                                local.open = open;
                                                local.render();
                                            },
                                            backdrop: false,
                                            autoFocus: false,
                                            popoverClassName: "rounded-md p-2 text-sm bg-white shadow-2xl border border-slate-300",
                                            content: /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                                                className: "flex flex-col",
                                                children: [
                                                    /*#__PURE__*/ (0, $lAN3N.jsx)("p", {
                                                        children: "Direction"
                                                    }),
                                                    /*#__PURE__*/ (0, $lAN3N.jsx)((0, $eClhP.BoxSep), {
                                                        className: cx("justify-between", css`
                          padding: 0px;
                          & > button {
                            min-width: 0px;
                            flex: 1;
                            padding: 2px 4px;
                          }
                        `),
                                                        children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $34isQ.FieldBtnRadio), {
                                                            items: {
                                                                col: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $emJmR.Tooltip), {
                                                                    content: "Direction: Column",
                                                                    children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                                                        children: /*#__PURE__*/ (0, $lAN3N.jsx)($3c8a82cfebb971cb$var$TapDown, {})
                                                                    })
                                                                }),
                                                                "col-reverse": /*#__PURE__*/ (0, $lAN3N.jsx)((0, $emJmR.Tooltip), {
                                                                    content: "Direction: Column Reverse",
                                                                    children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                                                        className: "rotate-180",
                                                                        children: /*#__PURE__*/ (0, $lAN3N.jsx)($3c8a82cfebb971cb$var$TapDown, {})
                                                                    })
                                                                }),
                                                                row: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $emJmR.Tooltip), {
                                                                    content: "Direction: Row",
                                                                    children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                                                        children: /*#__PURE__*/ (0, $lAN3N.jsx)($3c8a82cfebb971cb$var$TapRight, {})
                                                                    })
                                                                }),
                                                                "row-reverse": /*#__PURE__*/ (0, $lAN3N.jsx)((0, $emJmR.Tooltip), {
                                                                    content: "Direction: Row Reverse",
                                                                    children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                                                        className: "rotate-180",
                                                                        children: /*#__PURE__*/ (0, $lAN3N.jsx)($3c8a82cfebb971cb$var$TapRight, {})
                                                                    })
                                                                })
                                                            },
                                                            value: layout.dir,
                                                            disabled: false,
                                                            update: (dir)=>{
                                                                let align = layout.align;
                                                                if (layout.gap === "auto") {
                                                                    if (dir.startsWith("col") && align === "top") align = "left";
                                                                    if (dir.startsWith("col") && align === "bottom") align = "right";
                                                                    if (dir.startsWith("row") && align === "left") align = "top";
                                                                    if (dir.startsWith("row") && align === "right") align = "bottom";
                                                                }
                                                                update("layout", {
                                                                    ...layout,
                                                                    align: align,
                                                                    dir: dir
                                                                });
                                                                local.render();
                                                            }
                                                        })
                                                    })
                                                ]
                                            }),
                                            children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                                onClick: ()=>{
                                                    local.open = !local.open;
                                                    local.render();
                                                },
                                                className: `${false}	 h-full px-1 flex flew-row items-center justify-center border-l border-l-slate-300 hover:bg-blue-100 bg-white other cursor-pointer`,
                                                children: /*#__PURE__*/ (0, $lAN3N.jsx)($3c8a82cfebb971cb$var$Down, {})
                                            })
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0, $lAN3N.jsx)((0, $emJmR.Tooltip), {
                                    content: layout.wrap === "flex-wrap" ? "Flex Wrap" : "No Wrap",
                                    children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $6ai3B.Button), {
                                        className: cx("flex-1", css`
                    width: 28px !important;
                    min-width: 0px !important;
                    margin-left: 3px !important;
                    padding: 0px 5px !important;
                    height: 28px !important;
                  `, layout.dir.startsWith("col") && "rotate-90"),
                                        onClick: ()=>{
                                            update("layout", {
                                                ...layout,
                                                wrap: layout.wrap === "flex-wrap" ? "flex-nowrap" : "flex-wrap"
                                            });
                                        },
                                        children: layout.wrap !== "flex-wrap" ? /*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
                                            xmlns: "http://www.w3.org/2000/svg",
                                            width: "18",
                                            height: "18",
                                            fill: "none",
                                            viewBox: "0 0 436 128",
                                            children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                                                fill: "currentColor",
                                                d: "M38.4 0A38.4 38.4 0 000 38.4v51.2A38.4 38.4 0 0038.4 128h51.2A38.401 38.401 0 00128 89.6V38.4A38.402 38.402 0 0089.6 0H38.4zM25.6 38.4a12.8 12.8 0 0112.8-12.8h51.2a12.8 12.8 0 0112.8 12.8v51.2a12.802 12.802 0 01-12.8 12.8H38.4a12.802 12.802 0 01-12.8-12.8V38.4zm128 0A38.402 38.402 0 01192 0h51.2a38.4 38.4 0 0138.4 38.4v51.2a38.401 38.401 0 01-38.4 38.4H192a38.402 38.402 0 01-38.4-38.4V38.4zM192 25.6a12.8 12.8 0 00-12.8 12.8v51.2a12.802 12.802 0 0012.8 12.8h51.2A12.8 12.8 0 00256 89.6V38.4a12.802 12.802 0 00-12.8-12.8H192zm115.2 12.8A38.402 38.402 0 01345.6 0h51.2a38.402 38.402 0 0138.4 38.4v51.2a38.401 38.401 0 01-38.4 38.4h-51.2a38.403 38.403 0 01-38.4-38.4V38.4zm38.4-12.8a12.8 12.8 0 00-12.8 12.8v51.2a12.802 12.802 0 0012.8 12.8h51.2a12.8 12.8 0 0012.8-12.8V38.4a12.802 12.802 0 00-12.8-12.8h-51.2z"
                                            })
                                        }) : /*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
                                            xmlns: "http://www.w3.org/2000/svg",
                                            width: "18",
                                            height: "18",
                                            viewBox: "0 0 20 20",
                                            children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                                                fill: "currentColor",
                                                d: "M3 4a1.5 1.5 0 00-1.5 1.5v2A1.5 1.5 0 003 9h2a1.5 1.5 0 001.5-1.5v-2A1.5 1.5 0 005 4H3zm-.5 1.5A.5.5 0 013 5h2a.5.5 0 01.5.5v2A.5.5 0 015 8H3a.5.5 0 01-.5-.5v-2zM3 10a1.5 1.5 0 00-1.5 1.5v2A1.5 1.5 0 003 15h2a1.5 1.5 0 001.5-1.5v-2A1.5 1.5 0 005 10H3zm-.5 1.5A.5.5 0 013 11h2a.5.5 0 01.5.5v2a.5.5 0 01-.5.5H3a.5.5 0 01-.5-.5v-2zm5-6A1.5 1.5 0 019 4h2a1.5 1.5 0 011.5 1.5v2A1.5 1.5 0 0111 9H9a1.5 1.5 0 01-1.5-1.5v-2zM9 5a.5.5 0 00-.5.5v2A.5.5 0 009 8h2a.5.5 0 00.5-.5v-2A.5.5 0 0011 5H9zm0 5a1.5 1.5 0 00-1.5 1.5v2A1.5 1.5 0 009 15h2a1.5 1.5 0 001.5-1.5v-2A1.5 1.5 0 0011 10H9zm-.5 1.5A.5.5 0 019 11h2a.5.5 0 01.5.5v2a.5.5 0 01-.5.5H9a.5.5 0 01-.5-.5v-2zm5-6A1.5 1.5 0 0115 4h2a1.5 1.5 0 011.5 1.5v2A1.5 1.5 0 0117 9h-2a1.5 1.5 0 01-1.5-1.5v-2zM15 5a.5.5 0 00-.5.5v2a.5.5 0 00.5.5h2a.5.5 0 00.5-.5v-2A.5.5 0 0017 5h-2zm0 5a1.5 1.5 0 00-1.5 1.5v2A1.5 1.5 0 0015 15h2a1.5 1.5 0 001.5-1.5v-2A1.5 1.5 0 0017 10h-2zm-.5 1.5a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v2a.5.5 0 01-.5.5h-2a.5.5 0 01-.5-.5v-2z"
                                            })
                                        })
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                            className: "flex items-stretch justify-between",
                            children: [
                                /*#__PURE__*/ (0, $lAN3N.jsx)((0, $emJmR.Tooltip), {
                                    content: "Gap Size",
                                    children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                        className: "border border-gray-300 max-w-[56px] h-[25px]",
                                        children: layout.gap !== "auto" ? /*#__PURE__*/ (0, $lAN3N.jsx)((0, $3M49X.FieldNumUnit), {
                                            positiveOnly: true,
                                            hideUnit: true,
                                            icon: /*#__PURE__*/ (0, $lAN3N.jsx)($3c8a82cfebb971cb$var$GapIcon, {
                                                layout: layout
                                            }),
                                            value: layout.gap + "px",
                                            update: (val)=>{
                                                update("layout", {
                                                    ...layout,
                                                    gap: parseInt(val.replaceAll("px", ""))
                                                });
                                            }
                                        }) : /*#__PURE__*/ (0, $lAN3N.jsxs)((0, $eClhP.BoxSep), {
                                            className: "flex text-xs flex-1 bg-white",
                                            children: [
                                                /*#__PURE__*/ (0, $lAN3N.jsx)($3c8a82cfebb971cb$var$GapIcon, {
                                                    layout: layout
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                                    className: cx(css`
                          width: 90px;
                          flex: 1;
                          font-size: 12px;
                          color: #999;
                        `),
                                                    children: "Auto"
                                                })
                                            ]
                                        })
                                    })
                                }),
                                /*#__PURE__*/ (0, $lAN3N.jsx)((0, $emJmR.Tooltip), {
                                    content: /*#__PURE__*/ (0, $lAN3N.jsxs)((0, $lAN3N.Fragment), {
                                        children: [
                                            "Gap Mode:",
                                            /*#__PURE__*/ (0, $lAN3N.jsx)("br", {}),
                                            " Space Between / Packed"
                                        ]
                                    }),
                                    children: /*#__PURE__*/ (0, $lAN3N.jsxs)((0, $6ai3B.Button), {
                                        className: cx("flex-1", css`
                    width: 30px;
                    min-width: 0px !important;
                    margin-left: 5px !important;
                    padding: 0 5px !important;
                    background: ${layout.gap === "auto" ? "#3c82f6" : "#fff"} !important;

                    border-color: ${layout.gap === "auto" ? "#7baeff" : "#d1d1d1"} !important;
                  `),
                                        onClick: ()=>{
                                            if (layout.gap !== "auto") local.lastGap = layout.gap;
                                            const gap = layout.gap !== "auto" ? "auto" : local.lastGap;
                                            let align = layout.align;
                                            if (gap === "auto") {
                                                if (align.includes("-")) align = "center";
                                            } else if (align === "top" || align === "bottom") align = "top-left";
                                            update("layout", {
                                                ...layout,
                                                align: align,
                                                gap: gap
                                            });
                                        },
                                        children: [
                                            layout.dir.startsWith("row") && /*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
                                                width: 14,
                                                height: 6,
                                                fill: "none",
                                                xmlns: "http://www.w3.org/2000/svg",
                                                children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                                                    d: "M5.5 3a.375.375 0 0 1-.375.375H2.283l1.23 1.237a.36.36 0 0 1 0 .526.36.36 0 0 1-.526 0L1.112 3.263a.36.36 0 0 1 0-.526L2.987.863a.36.36 0 0 1 .526 0 .36.36 0 0 1 0 .524l-1.23 1.238h2.842A.375.375 0 0 1 5.5 3Zm7.387-.263L11.012.863a.36.36 0 0 0-.524 0 .359.359 0 0 0 0 .524l1.23 1.238H8.874a.375.375 0 0 0 0 .75h2.842l-1.23 1.237a.359.359 0 0 0 0 .526.36.36 0 0 0 .525 0l1.875-1.875a.359.359 0 0 0 0-.526Z",
                                                    fill: layout.gap === "auto" ? "#fff" : "#000"
                                                })
                                            }),
                                            layout.dir.startsWith("col") && /*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
                                                width: 6,
                                                height: 14,
                                                fill: "none",
                                                xmlns: "http://www.w3.org/2000/svg",
                                                children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                                                    d: "M3 8.5a.375.375 0 0 1 .375.375v2.842l1.237-1.23a.359.359 0 0 1 .526 0 .36.36 0 0 1 0 .525l-1.875 1.875a.359.359 0 0 1-.526 0L.863 11.012a.36.36 0 0 1 0-.524.359.359 0 0 1 .524 0l1.238 1.23V8.874A.375.375 0 0 1 3 8.5Zm-.263-7.387L.863 2.988a.36.36 0 0 0 0 .525.36.36 0 0 0 .524 0l1.238-1.23v2.842a.375.375 0 0 0 .75 0V2.283l1.237 1.23a.36.36 0 0 0 .526 0 .36.36 0 0 0 0-.525L3.263 1.113a.36.36 0 0 0-.526 0Z",
                                                    fill: layout.gap === "auto" ? "#fff" : "#000"
                                                })
                                            })
                                        ]
                                    })
                                }),
                                /*#__PURE__*/ (0, $lAN3N.jsx)((0, $emJmR.Tooltip), {
                                    content: /*#__PURE__*/ (0, $lAN3N.jsxs)((0, $lAN3N.Fragment), {
                                        children: [
                                            "Align Items:",
                                            /*#__PURE__*/ (0, $lAN3N.jsx)("br", {}),
                                            " Stretch / Normal"
                                        ]
                                    }),
                                    children: /*#__PURE__*/ (0, $lAN3N.jsxs)((0, $6ai3B.Button), {
                                        className: cx("flex-1", css`
                    width: 30px;
                    min-width: 0px !important;
                    margin-left: 5px !important;
                    padding: 0 5px !important;
                    background: ${layout.align === "stretch" ? "#3c82f6" : "#fff"} !important;

                    border-color: ${layout.align === "stretch" ? "#7baeff" : "#d1d1d1"} !important;

                    color: ${layout.align === "stretch" ? "white" : "black"} !important;
                  `),
                                        onClick: ()=>{
                                            let align = layout.align;
                                            if (layout.align !== "stretch") align = "stretch";
                                            else align = "center";
                                            update("layout", {
                                                ...layout,
                                                align: align
                                            });
                                        },
                                        children: [
                                            layout.align === "stretch" && /*#__PURE__*/ (0, $lAN3N.jsx)((0, $lAN3N.Fragment), {
                                                children: layout.dir.startsWith("row") ? /*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
                                                    xmlns: "http://www.w3.org/2000/svg",
                                                    width: "15",
                                                    height: "15",
                                                    fill: "none",
                                                    viewBox: "0 0 15 15",
                                                    children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                                                        fill: "currentColor",
                                                        fillRule: "evenodd",
                                                        d: "M1 .5a.5.5 0 01.5-.5h12a.5.5 0 010 1h-12A.5.5 0 011 .5zM9 14V1H6v13H1.5a.5.5 0 000 1h12a.5.5 0 000-1H9z",
                                                        clipRule: "evenodd"
                                                    })
                                                }) : /*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
                                                    xmlns: "http://www.w3.org/2000/svg",
                                                    width: "15",
                                                    height: "15",
                                                    fill: "none",
                                                    viewBox: "0 0 15 15",
                                                    children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                                                        fill: "currentColor",
                                                        fillRule: "evenodd",
                                                        d: "M14.5 1a.5.5 0 00-.5.5V6H1V1.5a.5.5 0 10-1 0v12a.5.5 0 001 0V9h13v4.5a.5.5 0 101 0v-12a.5.5 0 00-.5-.5z",
                                                        clipRule: "evenodd"
                                                    })
                                                })
                                            }),
                                            layout.align !== "stretch" && /*#__PURE__*/ (0, $lAN3N.jsx)((0, $lAN3N.Fragment), {
                                                children: layout.dir.startsWith("row") ? /*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
                                                    xmlns: "http://www.w3.org/2000/svg",
                                                    width: "15",
                                                    height: "15",
                                                    fill: "none",
                                                    viewBox: "0 0 15 15",
                                                    children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                                                        fill: "currentColor",
                                                        fillRule: "evenodd",
                                                        d: "M7 1a1 1 0 00-1 1v5H1.5a.5.5 0 000 1H6v5a1 1 0 001 1h1a1 1 0 001-1V8h4.5a.5.5 0 000-1H9V2a1 1 0 00-1-1H7z",
                                                        clipRule: "evenodd"
                                                    })
                                                }) : /*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
                                                    xmlns: "http://www.w3.org/2000/svg",
                                                    width: "15",
                                                    height: "15",
                                                    fill: "none",
                                                    viewBox: "0 0 15 15",
                                                    children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                                                        fill: "currentColor",
                                                        fillRule: "evenodd",
                                                        d: "M2 6a1 1 0 00-1 1v1a1 1 0 001 1h5v4.5a.5.5 0 001 0V9h5a1 1 0 001-1V7a1 1 0 00-1-1H8V1.5a.5.5 0 00-1 0V6H2z",
                                                        clipRule: "evenodd"
                                                    })
                                                })
                                            })
                                        ]
                                    })
                                })
                            ]
                        })
                    ]
                }),
                layout.gap === "auto" ? /*#__PURE__*/ (0, $lAN3N.jsx)((0, $lvFnH.LayoutSpaced), {
                    dir: layout.dir,
                    align: layout.align,
                    onChange: (align)=>{
                        update("layout", {
                            ...layout,
                            align: align
                        });
                    }
                }) : /*#__PURE__*/ (0, $lAN3N.jsx)((0, $kGdHA.LayoutPacked), {
                    dir: layout.dir,
                    align: layout.align,
                    onChange: (align)=>{
                        update("layout", {
                            ...layout,
                            align: align
                        });
                    }
                })
            ]
        })
    });
};
const $3c8a82cfebb971cb$var$Down = ()=>/*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "15",
        height: "15",
        viewBox: "0 0 48 48",
        children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
            fill: "none",
            stroke: "#000",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: "4",
            d: "M36 18L24 30 12 18"
        })
    });
const $3c8a82cfebb971cb$var$Wrap = ()=>/*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "15",
        height: "15",
        viewBox: "0 0 24 24",
        children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
            d: "M4 20V4h2v16H4zm14 0V4h2v16h-2zm-7.4-2.45L7.05 14l3.55-3.525 1.4 1.4L10.875 13H13q.825 0 1.413-.588T15 11q0-.825-.588-1.413T13 9H7V7h6q1.65 0 2.825 1.175T17 11q0 1.65-1.175 2.825T13 15h-2.125L12 16.125l-1.4 1.425z"
        })
    });
const $3c8a82cfebb971cb$var$TapDown = ()=>/*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "20",
        height: "20",
        fill: "none",
        viewBox: "0 0 20 20",
        children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
            d: "M14 6a4 4 0 0 1-2.5 3.7V8.6a3 3 0 1 0-3 0v1.1A4 4 0 1 1 14 6ZM9.65 17.85c.2.2.5.2.7 0l3-3a.5.5 0 0 0-.7-.7l-2.15 2.14V5.5a.5.5 0 0 0-1 0v10.8l-2.15-2.15a.5.5 0 1 0-.7.7l3 3Z",
            fill: "currentColor"
        })
    });
const $3c8a82cfebb971cb$var$TapRight = ()=>/*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "20",
        height: "20",
        fill: "none",
        viewBox: "0 0 20 20",
        children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
            d: "M6 6a4 4 0 0 1 3.7 2.5H8.6a3 3 0 1 0 0 3h1.1A4 4 0 1 1 6 6Zm8.85 7.35 3-3a.5.5 0 0 0 0-.7l-3-3a.5.5 0 1 0-.7.7l2.14 2.15H5.5a.5.5 0 0 0 0 1h10.8l-2.15 2.15a.5.5 0 0 0 .7.7Z",
            fill: "currentColor"
        })
    });
const $3c8a82cfebb971cb$var$GapIcon = ({ layout: layout })=>/*#__PURE__*/ (0, $lAN3N.jsx)("div", {
        className: cx(layout.gap !== "auto" ? "pr-2 border-r border-gray-300 mr-1" : "pr-1 pl-1"),
        children: layout.dir === "col" ? /*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
            className: "svg",
            width: 12,
            height: 13,
            xmlns: "http://www.w3.org/2000/svg",
            children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                d: "M11 13v-2H1v2H0v-3h12v3h-1zm1-10H0V0h1v2h10V0h1v3zM9 7V6H3v1h6z"
            })
        }) : /*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
            className: "svg",
            width: 13,
            height: 12,
            xmlns: "http://www.w3.org/2000/svg",
            children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                d: "M13 1h-2v10h2v1h-3V0h3v1zM3 0v12H0v-1h2V1H0V0h3zm4 3H6v6h1V3z"
            })
        })
    });

});
parcelRegister("eClhP", function(module, exports) {

$parcel$export(module.exports, "BoxSep", () => $83c54c38a8949ba8$export$f7b7e5b1ef27a6ce);

var $lAN3N = parcelRequire("lAN3N");
const $83c54c38a8949ba8$export$f7b7e5b1ef27a6ce = ({ children: children, className: className = "border-l" })=>{
    return /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
        className: `box-sep flex items-center p-[3px] space-x-[2px] ${className ? className : ""} border-slate-100`,
        children: children
    });
};

});

parcelRegister("34isQ", function(module, exports) {

$parcel$export(module.exports, "FieldBtnRadio", () => $03189ca8e4098e1b$export$2de3fa5dc6b8b57d);

var $lAN3N = parcelRequire("lAN3N");

var $6ai3B = parcelRequire("6ai3B");
const $03189ca8e4098e1b$export$2de3fa5dc6b8b57d = ({ items: items, update: update, value: value, disabled: disabled })=>{
    return /*#__PURE__*/ (0, $lAN3N.jsx)((0, $lAN3N.Fragment), {
        children: Object.entries(items).map(([name, content], idx)=>{
            return /*#__PURE__*/ (0, $lAN3N.jsx)((0, $6ai3B.Button), {
                disabled: disabled,
                className: cx("btn-hover", value === name && name.toUpperCase() === "ON" && css`
                  color: white !important;
                  font-weight: bold !important;
                  background-color: green !important;
                  border: 0px !important;
                `),
                onClick: ()=>{
                    update(name);
                },
                appearance: value === name ? "secondary" : "subtle",
                children: content
            }, idx);
        })
    });
};

});

parcelRegister("3M49X", function(module, exports) {

$parcel$export(module.exports, "FieldNumUnit", () => $559519ae6065c127$export$11bba922b6cc51e5);

var $lAN3N = parcelRequire("lAN3N");

var $63SH6 = parcelRequire("63SH6");

var $4WfNn = parcelRequire("4WfNn");
const $559519ae6065c127$export$11bba922b6cc51e5 = ({ icon: icon, value: value, label: label, update: update, unit: unit, hideUnit: hideUnit, width: width, disabled: disabled, positiveOnly: positiveOnly, enableWhenDrag: enableWhenDrag })=>{
    const local = (0, $4WfNn.useLocal)({
        val: 0,
        unit: "",
        drag: {
            clientX: 0,
            old: 0
        },
        dragging: false
    });
    const parseVal = (0, $63SH6.useCallback)(()=>{
        let val = "";
        let unt = "";
        if (value.length >= 1) {
            let fillMode = "val";
            for(let idx = 0; idx < value.length; idx++){
                const c = value[idx];
                if (idx > 0 && isNaN(parseInt(c))) fillMode = "unit";
                if (fillMode === "val") val += c;
                else unt += c || "";
            }
            if (!parseInt(val)) unt = "";
        }
        local.val = parseInt(val) || 0;
        if (positiveOnly && local.val < 0) local.val = Math.max(0, local.val);
        local.unit = unit || unt || "px";
        local.render();
    }, [
        value,
        unit
    ]);
    (0, $63SH6.useEffect)(()=>{
        parseVal();
        local.render();
    }, [
        value,
        unit
    ]);
    const [txPending, tx] = (0, $63SH6.useTransition)();
    (0, $63SH6.useEffect)(()=>{
        // Only change the value if the drag was actually started.
        const onUpdate = (event)=>{
            if (local.drag.clientX) {
                local.val = Math.round(local.drag.old + (event.clientX - local.drag.clientX));
                if (positiveOnly && local.val < 0) local.val = Math.max(0, local.val);
                local.render();
                tx(()=>{
                    update(local.val + local.unit);
                });
            }
        };
        // Stop the drag operation now.
        const onEnd = ()=>{
            local.drag.clientX = 0;
            local.dragging = false;
            local.render();
        };
        document.addEventListener("pointermove", onUpdate);
        document.addEventListener("pointerup", onEnd);
        return ()=>{
            document.removeEventListener("pointermove", onUpdate);
            document.removeEventListener("pointerup", onEnd);
        };
    }, [
        local.drag.clientX,
        local.drag.old,
        local.val
    ]);
    const onStart = (0, $63SH6.useCallback)((event)=>{
        let _disabled = disabled;
        if (enableWhenDrag && _disabled) {
            update(local.val + local.unit, (val)=>{
                local.val = val;
            });
            _disabled = false;
        }
        if (!_disabled) {
            local.dragging = true;
            local.render();
            local.drag.clientX = event.clientX;
            local.drag.old = local.val;
        }
    }, [
        local.val,
        disabled
    ]);
    return /*#__PURE__*/ (0, $lAN3N.jsxs)((0, $lAN3N.Fragment), {
        children: [
            /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                className: "field-num flex flex-row items-stretch justify-between bg-white border border-transparent btn-hover h-full",
                children: [
                    /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                        className: "flex cursor-ew-resize",
                        onPointerDown: onStart,
                        children: [
                            icon && /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                className: "flex items-center justify-center opacity-50 ml-1",
                                onPointerDown: onStart,
                                children: icon
                            }),
                            label && /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                className: "flex items-center justify-center text-[11px] opacity-50 w-[14px] ml-1",
                                children: label
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                        className: "flex justify-between flex-1 items-center flex-grow overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, $lAN3N.jsx)("input", {
                                type: "text",
                                className: cx(css`
                width: ${width ? width : "23px"};
                background: transparent;
                outline: none;
                font-size: 11px;
              `, !!disabled && "text-center text-gray-400"),
                                disabled: !!disabled,
                                value: typeof disabled === "string" ? disabled : local.val,
                                onChange: (e)=>{
                                    local.val = parseInt(e.currentTarget.value) || 0;
                                    update(local.val + local.unit);
                                }
                            }),
                            hideUnit !== true && /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                className: "text-[11px] mx-1 flex cursor-ew-resize",
                                onPointerDown: onStart,
                                children: local.unit
                            })
                        ]
                    })
                ]
            }),
            local.dragging && /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                className: "fixed z-50 inset-0 cursor-ew-resize"
            })
        ]
    });
};

});

parcelRegister("kGdHA", function(module, exports) {

$parcel$export(module.exports, "LayoutPacked", () => $672ac23ac8adf73d$export$dc9cd4a08eb2d13b);

var $lAN3N = parcelRequire("lAN3N");

var $dzRGn = parcelRequire("dzRGn");

var $emJmR = parcelRequire("emJmR");
const $672ac23ac8adf73d$export$dc9cd4a08eb2d13b = ({ dir: dir, align: align, onChange: onChange })=>{
    return /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
        className: "ml-1 w-[68px] h-[68px] p-[2px] border grid grid-cols-3 bg-white",
        children: [
            /*#__PURE__*/ (0, $lAN3N.jsx)($672ac23ac8adf73d$var$AlignItem, {
                dir: dir,
                active: align,
                onChange: onChange,
                align: "top-left"
            }),
            /*#__PURE__*/ (0, $lAN3N.jsx)($672ac23ac8adf73d$var$AlignItem, {
                dir: dir,
                active: align,
                onChange: onChange,
                align: "top-center"
            }),
            /*#__PURE__*/ (0, $lAN3N.jsx)($672ac23ac8adf73d$var$AlignItem, {
                dir: dir,
                active: align,
                onChange: onChange,
                align: "top-right"
            }),
            /*#__PURE__*/ (0, $lAN3N.jsx)($672ac23ac8adf73d$var$AlignItem, {
                dir: dir,
                active: align,
                onChange: onChange,
                align: "left"
            }),
            /*#__PURE__*/ (0, $lAN3N.jsx)($672ac23ac8adf73d$var$AlignItem, {
                dir: dir,
                active: align,
                onChange: onChange,
                align: "center"
            }),
            /*#__PURE__*/ (0, $lAN3N.jsx)($672ac23ac8adf73d$var$AlignItem, {
                dir: dir,
                active: align,
                onChange: onChange,
                align: "right"
            }),
            /*#__PURE__*/ (0, $lAN3N.jsx)($672ac23ac8adf73d$var$AlignItem, {
                dir: dir,
                active: align,
                onChange: onChange,
                align: "bottom-left"
            }),
            /*#__PURE__*/ (0, $lAN3N.jsx)($672ac23ac8adf73d$var$AlignItem, {
                dir: dir,
                active: align,
                onChange: onChange,
                align: "bottom-center"
            }),
            /*#__PURE__*/ (0, $lAN3N.jsx)($672ac23ac8adf73d$var$AlignItem, {
                dir: dir,
                active: align,
                onChange: onChange,
                align: "bottom-right"
            })
        ]
    });
};
const $672ac23ac8adf73d$var$AlignItem = ({ dir: dir, align: align, active: active, onChange: onChange })=>{
    let pos = "start";
    if (dir.startsWith("col")) {
        if (align.endsWith("left")) pos = "start";
        if (align.endsWith("center")) pos = "center";
        if (align.endsWith("right")) pos = "end";
    } else {
        if (align.startsWith("top")) pos = "start";
        else if (align.startsWith("bottom")) pos = "end";
        else pos = "center";
    }
    return /*#__PURE__*/ (0, $lAN3N.jsx)((0, $emJmR.Tooltip), {
        content: `Align: ${align}`,
        children: /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
            className: cx("w-[21px] h-[21px] flex items-center justify-center cursor-pointer", active === align && css`
              .icon {
                display: flex;
              }
              .point {
                display: none;
              }
            `, css`
            &:hover {
              .icon {
                display: flex;
                opacity: 0.5;
              }
              .point {
                display: none;
              }
            }
          `),
            onClick: ()=>{
                onChange(align);
            },
            children: [
                /*#__PURE__*/ (0, $lAN3N.jsx)((0, $dzRGn.AlignIcon), {
                    dir: dir,
                    pos: pos,
                    className: "icon hidden"
                }),
                /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                    className: "w-[2px] h-[2px] bg-slate-400 point"
                })
            ]
        })
    });
};

});
parcelRegister("dzRGn", function(module, exports) {

$parcel$export(module.exports, "AlignIcon", () => $a6ed4c061feb2755$export$70a0c2f5862937b6);

var $lAN3N = parcelRequire("lAN3N");
const $a6ed4c061feb2755$export$70a0c2f5862937b6 = ({ dir: dir, pos: pos, className: className })=>{
    return /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
        className: cx("flex w-[16px] h-[16px] justify-between", `flex-${dir}`, `items-${pos}`, className),
        children: [
            /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                className: cx("bg-blue-500", dir.startsWith("col") ? "w-[12px] h-[4px]" : "h-[12px] w-[4px]")
            }),
            /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                className: cx("bg-blue-500", dir.startsWith("col") ? "w-[18px] h-[4px]" : "h-[18px] w-[4px]")
            }),
            /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                className: cx("bg-blue-500", dir.startsWith("col") ? "w-[8px] h-[4px]" : "h-[8px] w-[4px]")
            })
        ]
    });
};

});


parcelRegister("lvFnH", function(module, exports) {

$parcel$export(module.exports, "LayoutSpaced", () => $2f500fd093253811$export$580deb3bc11d8e53);

var $lAN3N = parcelRequire("lAN3N");

var $4WfNn = parcelRequire("4WfNn");
const $2f500fd093253811$export$580deb3bc11d8e53 = ({ dir: dir, align: align, onChange: onChange })=>{
    return /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
        className: cx("w-[68px] h-[68px] border flex bg-white items-stretch p-[2px]", {
            col: "flex-row",
            row: "flex-col",
            "col-reverse": "flex-row-reverse",
            "row-reverse": "flex-col-reverse"
        }[dir]),
        children: [
            dir === "col" && /*#__PURE__*/ (0, $lAN3N.jsxs)((0, $lAN3N.Fragment), {
                children: [
                    /*#__PURE__*/ (0, $lAN3N.jsx)($2f500fd093253811$var$AlignItemCol, {
                        active: align,
                        onChange: onChange,
                        align: "left"
                    }),
                    /*#__PURE__*/ (0, $lAN3N.jsx)($2f500fd093253811$var$AlignItemCol, {
                        active: align,
                        onChange: onChange,
                        align: "center"
                    }),
                    /*#__PURE__*/ (0, $lAN3N.jsx)($2f500fd093253811$var$AlignItemCol, {
                        active: align,
                        onChange: onChange,
                        align: "right"
                    })
                ]
            }),
            dir === "col-reverse" && /*#__PURE__*/ (0, $lAN3N.jsxs)((0, $lAN3N.Fragment), {
                children: [
                    /*#__PURE__*/ (0, $lAN3N.jsx)($2f500fd093253811$var$AlignItemCol, {
                        active: align,
                        onChange: onChange,
                        align: "left"
                    }),
                    /*#__PURE__*/ (0, $lAN3N.jsx)($2f500fd093253811$var$AlignItemCol, {
                        active: align,
                        onChange: onChange,
                        align: "center",
                        reverse: true
                    }),
                    /*#__PURE__*/ (0, $lAN3N.jsx)($2f500fd093253811$var$AlignItemCol, {
                        active: align,
                        onChange: onChange,
                        align: "right"
                    })
                ]
            }),
            dir === "row" && /*#__PURE__*/ (0, $lAN3N.jsxs)((0, $lAN3N.Fragment), {
                children: [
                    /*#__PURE__*/ (0, $lAN3N.jsx)($2f500fd093253811$var$AlignItemRow, {
                        active: align,
                        onChange: onChange,
                        align: "top"
                    }),
                    /*#__PURE__*/ (0, $lAN3N.jsx)($2f500fd093253811$var$AlignItemRow, {
                        active: align,
                        onChange: onChange,
                        align: "center"
                    }),
                    /*#__PURE__*/ (0, $lAN3N.jsx)($2f500fd093253811$var$AlignItemRow, {
                        active: align,
                        onChange: onChange,
                        align: "bottom"
                    })
                ]
            }),
            dir === "row-reverse" && /*#__PURE__*/ (0, $lAN3N.jsxs)((0, $lAN3N.Fragment), {
                children: [
                    /*#__PURE__*/ (0, $lAN3N.jsx)($2f500fd093253811$var$AlignItemRow, {
                        active: align,
                        onChange: onChange,
                        align: "bottom"
                    }),
                    /*#__PURE__*/ (0, $lAN3N.jsx)($2f500fd093253811$var$AlignItemRow, {
                        active: align,
                        onChange: onChange,
                        align: "center",
                        reverse: true
                    }),
                    /*#__PURE__*/ (0, $lAN3N.jsx)($2f500fd093253811$var$AlignItemRow, {
                        active: align,
                        onChange: onChange,
                        align: "top"
                    })
                ]
            })
        ]
    });
};
const $2f500fd093253811$var$AlignItemRow = ({ align: align, active: active, onChange: onChange, reverse: reverse })=>{
    const local = (0, $4WfNn.useLocal)({
        hover: false
    });
    let justify = "justify-start";
    if (align === "center") justify = `justify-center`;
    if (align === "bottom") justify = `justify-end`;
    return /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
        className: cx("flex flex-row cursor-pointer justify-between flex-1 items-stretch", local.hover && "hover", active === align && css`
            .icon {
              display: flex;
            }
            .point {
              display: none;
            }
          `, css`
          &.hover {
            .icon {
              display: flex;
              opacity: 0.5;
            }
            .point {
              display: none;
            }
          }
        `),
        onMouseOver: ()=>{
            local.hover = true;
            local.render();
        },
        onMouseOut: ()=>{
            local.hover = false;
            local.render();
        },
        onClick: ()=>{
            onChange(align);
        },
        children: active === align || local.hover ? /*#__PURE__*/ (0, $lAN3N.jsxs)((0, $lAN3N.Fragment), {
            children: [
                /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                    className: cx("icon flex-1 flex flex-col items-center", justify),
                    children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                        className: cx("bg-blue-500", reverse ? "py-[2px] w-[4px] h-[8px]" : "py-[2px] w-[4px] h-[10px]")
                    })
                }),
                /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                    className: cx("icon flex-1 flex flex-col  items-center", justify),
                    children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                        className: cx("bg-blue-500", "py-[2px] w-[4px] h-[16px]")
                    })
                }),
                /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                    className: cx("icon flex-1 flex flex-col items-center", justify),
                    children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                        className: cx("bg-blue-500", !reverse ? "py-[2px] w-[4px] h-[8px]" : "py-[2px] w-[4px] h-[10px]")
                    })
                })
            ]
        }) : /*#__PURE__*/ (0, $lAN3N.jsxs)((0, $lAN3N.Fragment), {
            children: [
                /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                    className: "flex-1 flex items-center justify-center",
                    children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                        className: "w-[2px] h-[2px] bg-slate-400 point"
                    })
                }),
                /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                    className: "flex-1 flex items-center justify-center",
                    children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                        className: "w-[2px] h-[2px] bg-slate-400 point"
                    })
                }),
                /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                    className: "flex-1 flex items-center justify-center",
                    children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                        className: "w-[2px] h-[2px] bg-slate-400 point"
                    })
                })
            ]
        })
    });
};
const $2f500fd093253811$var$AlignItemCol = ({ align: align, active: active, onChange: onChange, reverse: reverse })=>{
    const local = (0, $4WfNn.useLocal)({
        hover: false
    });
    let justify = "justify-start";
    if (align === "center") justify = `justify-center`;
    if (align === "right") justify = `justify-end`;
    return /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
        className: cx("flex flex-col cursor-pointer justify-between flex-1 items-stretch", local.hover && "hover", active === align && css`
            .icon {
              display: flex;
            }
            .point {
              display: none;
            }
          `, css`
          &.hover {
            .icon {
              display: flex;
              opacity: 0.5;
            }
            .point {
              display: none;
            }
          }
        `),
        onMouseOver: ()=>{
            local.hover = true;
            local.render();
        },
        onMouseOut: ()=>{
            local.hover = false;
            local.render();
        },
        onClick: ()=>{
            onChange(align);
        },
        children: active === align || local.hover ? /*#__PURE__*/ (0, $lAN3N.jsxs)((0, $lAN3N.Fragment), {
            children: [
                /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                    className: cx("icon flex-1 flex items-center", justify),
                    children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                        className: cx("bg-blue-500", reverse ? "px-[2px] w-[8px] h-[4px]" : "px-[2px] w-[10px] h-[4px]")
                    })
                }),
                /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                    className: cx("icon flex-1 flex items-center", justify),
                    children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                        className: cx("bg-blue-500", "px-[2px] w-[16px] h-[4px]")
                    })
                }),
                /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                    className: cx("icon flex-1 flex items-center", justify),
                    children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                        className: cx("bg-blue-500", !reverse ? "px-[2px] w-[8px] h-[4px]" : "px-[2px] w-[10px] h-[4px]")
                    })
                })
            ]
        }) : /*#__PURE__*/ (0, $lAN3N.jsxs)((0, $lAN3N.Fragment), {
            children: [
                /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                    className: "flex-1 flex items-center justify-center",
                    children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                        className: "w-[2px] h-[2px] bg-slate-400 point"
                    })
                }),
                /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                    className: "flex-1 flex items-center justify-center",
                    children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                        className: "w-[2px] h-[2px] bg-slate-400 point"
                    })
                }),
                /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                    className: "flex-1 flex items-center justify-center",
                    children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                        className: "w-[2px] h-[2px] bg-slate-400 point"
                    })
                })
            ]
        })
    });
};

});


parcelRegister("8l3Wa", function(module, exports) {

$parcel$export(module.exports, "PanelBackground", () => $3e3a4cf107808e8f$export$dc101e1690ff9c5e);

var $lAN3N = parcelRequire("lAN3N");

var $4WfNn = parcelRequire("4WfNn");

var $769fS = parcelRequire("769fS");

var $7dWeq = parcelRequire("7dWeq");

var $bjM6F = parcelRequire("bjM6F");

var $emJmR = parcelRequire("emJmR");

var $dCav9 = parcelRequire("dCav9");
const $3e3a4cf107808e8f$export$dc101e1690ff9c5e = ({ value: value, update: update, mode: mode })=>{
    const local = (0, $4WfNn.useLocal)({
        colorOpen: false
    });
    const bg = (0, $bjM6F.responsiveVal)(value, "bg", mode, {
        size: "cover",
        pos: "center"
    });
    return /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
        className: "flex flex-col space-y-2",
        children: [
            /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                className: cx("flex items-stretch space-x-2 text-xs "),
                children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $emJmR.Tooltip), {
                    asChild: true,
                    content: "Background Color",
                    children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                        className: cx("bg-white p-[2px] border border-gray-300 flex items-stretch", css`
                .color-box {
                  height: 25px !important;
                }
              `),
                        children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $769fS.FieldColor), {
                            popupID: "bg-color",
                            value: bg.color,
                            update: (color)=>{
                                update("bg", {
                                    ...bg,
                                    color: color
                                });
                            }
                        })
                    })
                })
            }),
            /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                className: "flex items-stretch space-x-2",
                children: [
                    /*#__PURE__*/ (0, $lAN3N.jsx)((0, $emJmR.Tooltip), {
                        content: "Background Size",
                        children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $dCav9.Dropdown), {
                            ...(0, $7dWeq.dropdownProp),
                            value: bg.size,
                            items: [
                                {
                                    value: "cover",
                                    label: "Cover"
                                },
                                {
                                    value: "contain",
                                    label: "Contain"
                                },
                                {
                                    value: "full",
                                    label: "Full"
                                },
                                {
                                    value: "auto",
                                    label: "Auto"
                                }
                            ],
                            onChange: (val)=>{
                                update("bg", {
                                    ...bg,
                                    size: val
                                });
                            }
                        })
                    }),
                    /*#__PURE__*/ (0, $lAN3N.jsx)((0, $emJmR.Tooltip), {
                        content: "Background Position",
                        className: css`
            .dropdown {
              max-width: 90px;
              overflow: hidden;
            }
          `,
                        children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $dCav9.Dropdown), {
                            ...(0, $7dWeq.dropdownProp),
                            value: bg.pos,
                            items: [
                                {
                                    value: "top",
                                    label: "Top"
                                },
                                {
                                    value: "center",
                                    label: "Center"
                                },
                                {
                                    value: "bottom",
                                    label: "Bottom"
                                },
                                {
                                    value: "right",
                                    label: "Right"
                                },
                                {
                                    value: "left",
                                    label: "Left"
                                }
                            ],
                            onChange: (val)=>{
                                update("bg", {
                                    ...bg,
                                    pos: val
                                });
                            }
                        })
                    })
                ]
            })
        ]
    });
};
const $3e3a4cf107808e8f$var$getImgMeta = (url)=>{
    return new Promise((resolve, reject)=>{
        const img = new Image();
        img.onload = ()=>resolve(img);
        img.onerror = (err)=>{
            console.error(err, url);
            resolve(null);
        };
        img.src = url;
    });
};

});
parcelRegister("769fS", function(module, exports) {

$parcel$export(module.exports, "FieldColor", () => $b15ed1490ada63fa$export$ca27cf61053caa36);

var $lAN3N = parcelRequire("lAN3N");

var $63SH6 = parcelRequire("63SH6");

var $4WfNn = parcelRequire("4WfNn");

var $4diSG = parcelRequire("4diSG");

var $3i93m = parcelRequire("3i93m");
const $b15ed1490ada63fa$export$ca27cf61053caa36 = ({ value: value, update: update, showHistory: showHistory = true, popupID: popupID })=>{
    if (!(0, $3i93m.w).openedPopupID) (0, $3i93m.w).openedPopupID = {};
    const local = (0, $4WfNn.useLocal)({
        val: (0, $3i93m.w).lastColorPicked || ""
    });
    (0, $63SH6.useEffect)(()=>{
        if (value) (0, $3i93m.w).lastColorPicked = value;
        local.val = value || "";
        local.render();
    }, [
        value
    ]);
    const onOpen = ()=>{
        (0, $3i93m.w).openedPopupID[popupID] = true;
        local.render();
    };
    const onClose = ()=>{
        delete (0, $3i93m.w).openedPopupID[popupID];
        (0, $3i93m.w).lastColorPicked = "";
        local.render();
    };
    return /*#__PURE__*/ (0, $lAN3N.jsx)((0, $4diSG.FieldColorPicker), {
        value: local.val,
        update: (val)=>update(val),
        onOpen: onOpen,
        onClose: onClose,
        open: (0, $3i93m.w).openedPopupID[popupID],
        showHistory: showHistory,
        children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
            className: cx(css`
            background-image: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill-opacity=".05"><path d="M8 0h8v8H8zM0 8h8v8H0z"/></svg>');
          `, "cursor-pointer"),
            children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                className: cx(css`
              background: ${local.val};
              width: 30px;
              height: 20px;
            `, "color-box")
            })
        })
    });
};

});
parcelRegister("4diSG", function(module, exports) {

$parcel$export(module.exports, "FieldColorPicker", () => $b6e648bfde201683$export$4121e647b1063549);

var $lAN3N = parcelRequire("lAN3N");

var $63SH6 = parcelRequire("63SH6");

var $4WfNn = parcelRequire("4WfNn");

var $j4tzk = parcelRequire("j4tzk");

var $bTIRf = parcelRequire("bTIRf");
const $b6e648bfde201683$export$4121e647b1063549 = ({ children: children, value: value, update: update, open: open, onClose: onClose, onOpen: onOpen, showHistory: showHistory })=>{
    const local = (0, $4WfNn.useLocal)({
        show: open || false
    });
    (0, $63SH6.useEffect)(()=>{
        if (value) {
            local.show = open || false;
            local.render();
        }
    }, [
        value,
        open
    ]);
    const [_, tx] = (0, $63SH6.useTransition)();
    return /*#__PURE__*/ (0, $lAN3N.jsx)((0, $bTIRf.Popover), {
        open: local.show,
        onOpenChange: (open)=>{
            local.show = open;
            if (open && onOpen) onOpen();
            else if (onClose) onClose();
            local.render();
        },
        backdrop: false,
        popoverClassName: "rounded-md p-2 text-sm bg-white shadow-2xl border border-slate-300",
        content: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $j4tzk.FieldPickColor), {
            value: value,
            showHistory: showHistory,
            onClose: ()=>{
                local.show = false;
                local.render();
                if (onClose) onClose();
            },
            onChangePicker: (color)=>{
                tx(()=>{
                    if (color.indexOf("NaN") < 0) update(color);
                });
            }
        }),
        children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
            onClick: ()=>{
                local.show = true;
                local.render();
                if (onOpen) onOpen();
            },
            children: children
        })
    });
};

});
parcelRegister("j4tzk", function(module, exports) {

$parcel$export(module.exports, "FieldPickColor", () => $390543dd7791b547$export$c449c2e399ddbae5);

var $lAN3N = parcelRequire("lAN3N");

var $63SH6 = parcelRequire("63SH6");

var $3rnVg = parcelRequire("3rnVg");

var $4WfNn = parcelRequire("4WfNn");

const $390543dd7791b547$var$HexAlphaColorPicker = /*#__PURE__*/ (0, $63SH6.lazy)(async ()=>{
    return {
        default: (await (parcelRequire("i3H5K"))).HexAlphaColorPicker
    };
});
const $390543dd7791b547$export$c449c2e399ddbae5 = ({ value: value, onChangePicker: onChangePicker, onClose: onClose, showHistory: showHistory })=>{
    const meta = (0, $4WfNn.useLocal)({
        originalValue: "",
        inputValue: value,
        rgbValue: "",
        selectedEd: ""
    });
    (0, $63SH6.useEffect)(()=>{
        meta.inputValue = value || "";
        const convertColor = (0, (/*@__PURE__*/$parcel$interopDefault($3rnVg)))(meta.inputValue);
        meta.rgbValue = convertColor.toRgbString();
        meta.render();
    }, [
        value
    ]);
    const colors = [];
    const tin = (0, (/*@__PURE__*/$parcel$interopDefault($3rnVg)))(meta.inputValue);
    return /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
        className: "flex p-3 space-x-4 items-start",
        children: [
            /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                className: cx("flex flex-col items-center", css`
            .react-colorful__pointer {
              border-radius: 4px;
              width: 20px;
              height: 20px;
            }
          `),
                onClick: (e)=>{
                    e.stopPropagation();
                    e.preventDefault();
                },
                children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $63SH6.Suspense), {
                    children: /*#__PURE__*/ (0, $lAN3N.jsx)($390543dd7791b547$var$HexAlphaColorPicker, {
                        color: meta.inputValue,
                        onChange: (color)=>{
                            if (color) {
                                meta.inputValue = color;
                                onChangePicker(color);
                                const convertColor = (0, (/*@__PURE__*/$parcel$interopDefault($3rnVg)))(meta.inputValue);
                                meta.rgbValue = convertColor.toRgbString();
                            }
                        }
                    })
                })
            }),
            /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                className: cx("grid grid-cols-1 gap-y-0.5", css`
            width: 78px;
          `),
                children: [
                    /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                        className: "p-[1px] border rounded flex items-center justify-center",
                        style: {
                            marginBottom: "4px"
                        },
                        children: /*#__PURE__*/ (0, $lAN3N.jsx)("input", {
                            value: meta.inputValue || "#FFFFFFFF",
                            className: cx(`rounded cursor-text bg-[${meta.inputValue}] min-w-[0px] text-[13px] px-[8px] py-[1px] uppercase`, tin.isValid() && css`
                  color: ${!tin.isLight() ? "#FFF" : "#000"};
                  background-color: ${meta.inputValue};
                `),
                            onClick: ()=>{
                            // height: "18px",
                            // minWidth: "0px",
                            // fontSize: "13px",
                            // meta.selectedEd = -1;
                            // meta.render();
                            },
                            spellCheck: false,
                            onChange: (e)=>{
                                const color = e.currentTarget.value;
                                meta.inputValue = color;
                                // if (meta.selectedEd >= 0) {
                                //   ed.colors[meta.selectedEd] = color;
                                // }
                                onChangePicker(color);
                            }
                        })
                    }),
                    showHistory && colors.map((e, key)=>/*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                            className: cx("flex space-x-1 items-center border p-0.5 rounded", meta.selectedEd === e.id && "border-black"),
                            children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                className: cx(`w-12 h-4 rounded cursor-pointer border bg-[${e}]`, css`
                    background-color: ${e.value};
                  `),
                                style: {
                                    backgroundColor: e.value
                                },
                                onClick: ()=>{
                                    meta.inputValue = e.value;
                                    meta.selectedEd = e.id;
                                    onChangePicker(e.value);
                                    const convertColor = (0, (/*@__PURE__*/$parcel$interopDefault($3rnVg)))(meta.inputValue);
                                    meta.rgbValue = convertColor.toRgbString();
                                }
                            })
                        }, key)),
                    /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                        className: "",
                        children: [
                            meta.inputValue !== "" && /*#__PURE__*/ (0, $lAN3N.jsx)((0, $lAN3N.Fragment), {
                                children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                    className: "cursor-pointer text-center border border-gray-200 rounded hover:bg-gray-100",
                                    onClick: ()=>{
                                        meta.inputValue = "";
                                        onChangePicker("");
                                    },
                                    children: "Reset"
                                })
                            }),
                            onClose && /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                className: "cursor-pointer text-center border border-gray-200 rounded hover:bg-gray-100 mt-[4px]",
                                onClick: onClose,
                                children: "Close"
                            })
                        ]
                    })
                ]
            })
        ]
    });
};

});
parcelRegister("3rnVg", function(module, exports) {
// This file is autogenerated. It's used to publish CJS to npm.
(function(global, factory) {
    module.exports = factory();
})(module.exports, function() {
    "use strict";
    function _typeof(obj) {
        "@babel/helpers - typeof";
        return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        }, _typeof(obj);
    }
    // https://github.com/bgrins/TinyColor
    // Brian Grinstead, MIT License
    var trimLeft = /^\s+/;
    var trimRight = /\s+$/;
    function tinycolor(color, opts) {
        color = color ? color : "";
        opts = opts || {};
        // If input is already a tinycolor, return itself
        if (color instanceof tinycolor) return color;
        // If we are called as a function, call using new instead
        if (!(this instanceof tinycolor)) return new tinycolor(color, opts);
        var rgb = inputToRGB(color);
        this._originalInput = color, this._r = rgb.r, this._g = rgb.g, this._b = rgb.b, this._a = rgb.a, this._roundA = Math.round(100 * this._a) / 100, this._format = opts.format || rgb.format;
        this._gradientType = opts.gradientType;
        // Don't let the range of [0,255] come back in [0,1].
        // Potentially lose a little bit of precision here, but will fix issues where
        // .5 gets interpreted as half of the total, instead of half of 1
        // If it was supposed to be 128, this was already taken care of by `inputToRgb`
        if (this._r < 1) this._r = Math.round(this._r);
        if (this._g < 1) this._g = Math.round(this._g);
        if (this._b < 1) this._b = Math.round(this._b);
        this._ok = rgb.ok;
    }
    tinycolor.prototype = {
        isDark: function isDark() {
            return this.getBrightness() < 128;
        },
        isLight: function isLight() {
            return !this.isDark();
        },
        isValid: function isValid() {
            return this._ok;
        },
        getOriginalInput: function getOriginalInput() {
            return this._originalInput;
        },
        getFormat: function getFormat() {
            return this._format;
        },
        getAlpha: function getAlpha() {
            return this._a;
        },
        getBrightness: function getBrightness() {
            //http://www.w3.org/TR/AERT#color-contrast
            var rgb = this.toRgb();
            return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
        },
        getLuminance: function getLuminance() {
            //http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
            var rgb = this.toRgb();
            var RsRGB, GsRGB, BsRGB, R, G, B;
            RsRGB = rgb.r / 255;
            GsRGB = rgb.g / 255;
            BsRGB = rgb.b / 255;
            if (RsRGB <= 0.03928) R = RsRGB / 12.92;
            else R = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
            if (GsRGB <= 0.03928) G = GsRGB / 12.92;
            else G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
            if (BsRGB <= 0.03928) B = BsRGB / 12.92;
            else B = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
            return 0.2126 * R + 0.7152 * G + 0.0722 * B;
        },
        setAlpha: function setAlpha(value) {
            this._a = boundAlpha(value);
            this._roundA = Math.round(100 * this._a) / 100;
            return this;
        },
        toHsv: function toHsv() {
            var hsv = rgbToHsv(this._r, this._g, this._b);
            return {
                h: hsv.h * 360,
                s: hsv.s,
                v: hsv.v,
                a: this._a
            };
        },
        toHsvString: function toHsvString() {
            var hsv = rgbToHsv(this._r, this._g, this._b);
            var h = Math.round(hsv.h * 360), s = Math.round(hsv.s * 100), v = Math.round(hsv.v * 100);
            return this._a == 1 ? "hsv(" + h + ", " + s + "%, " + v + "%)" : "hsva(" + h + ", " + s + "%, " + v + "%, " + this._roundA + ")";
        },
        toHsl: function toHsl() {
            var hsl = rgbToHsl(this._r, this._g, this._b);
            return {
                h: hsl.h * 360,
                s: hsl.s,
                l: hsl.l,
                a: this._a
            };
        },
        toHslString: function toHslString() {
            var hsl = rgbToHsl(this._r, this._g, this._b);
            var h = Math.round(hsl.h * 360), s = Math.round(hsl.s * 100), l = Math.round(hsl.l * 100);
            return this._a == 1 ? "hsl(" + h + ", " + s + "%, " + l + "%)" : "hsla(" + h + ", " + s + "%, " + l + "%, " + this._roundA + ")";
        },
        toHex: function toHex(allow3Char) {
            return rgbToHex(this._r, this._g, this._b, allow3Char);
        },
        toHexString: function toHexString(allow3Char) {
            return "#" + this.toHex(allow3Char);
        },
        toHex8: function toHex8(allow4Char) {
            return rgbaToHex(this._r, this._g, this._b, this._a, allow4Char);
        },
        toHex8String: function toHex8String(allow4Char) {
            return "#" + this.toHex8(allow4Char);
        },
        toRgb: function toRgb() {
            return {
                r: Math.round(this._r),
                g: Math.round(this._g),
                b: Math.round(this._b),
                a: this._a
            };
        },
        toRgbString: function toRgbString() {
            return this._a == 1 ? "rgb(" + Math.round(this._r) + ", " + Math.round(this._g) + ", " + Math.round(this._b) + ")" : "rgba(" + Math.round(this._r) + ", " + Math.round(this._g) + ", " + Math.round(this._b) + ", " + this._roundA + ")";
        },
        toPercentageRgb: function toPercentageRgb() {
            return {
                r: Math.round(bound01(this._r, 255) * 100) + "%",
                g: Math.round(bound01(this._g, 255) * 100) + "%",
                b: Math.round(bound01(this._b, 255) * 100) + "%",
                a: this._a
            };
        },
        toPercentageRgbString: function toPercentageRgbString() {
            return this._a == 1 ? "rgb(" + Math.round(bound01(this._r, 255) * 100) + "%, " + Math.round(bound01(this._g, 255) * 100) + "%, " + Math.round(bound01(this._b, 255) * 100) + "%)" : "rgba(" + Math.round(bound01(this._r, 255) * 100) + "%, " + Math.round(bound01(this._g, 255) * 100) + "%, " + Math.round(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
        },
        toName: function toName() {
            if (this._a === 0) return "transparent";
            if (this._a < 1) return false;
            return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
        },
        toFilter: function toFilter(secondColor) {
            var hex8String = "#" + rgbaToArgbHex(this._r, this._g, this._b, this._a);
            var secondHex8String = hex8String;
            var gradientType = this._gradientType ? "GradientType = 1, " : "";
            if (secondColor) {
                var s = tinycolor(secondColor);
                secondHex8String = "#" + rgbaToArgbHex(s._r, s._g, s._b, s._a);
            }
            return "progid:DXImageTransform.Microsoft.gradient(" + gradientType + "startColorstr=" + hex8String + ",endColorstr=" + secondHex8String + ")";
        },
        toString: function toString(format) {
            var formatSet = !!format;
            format = format || this._format;
            var formattedString = false;
            var hasAlpha = this._a < 1 && this._a >= 0;
            var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "hex4" || format === "hex8" || format === "name");
            if (needsAlphaFormat) {
                // Special case for "transparent", all other non-alpha formats
                // will return rgba when there is transparency.
                if (format === "name" && this._a === 0) return this.toName();
                return this.toRgbString();
            }
            if (format === "rgb") formattedString = this.toRgbString();
            if (format === "prgb") formattedString = this.toPercentageRgbString();
            if (format === "hex" || format === "hex6") formattedString = this.toHexString();
            if (format === "hex3") formattedString = this.toHexString(true);
            if (format === "hex4") formattedString = this.toHex8String(true);
            if (format === "hex8") formattedString = this.toHex8String();
            if (format === "name") formattedString = this.toName();
            if (format === "hsl") formattedString = this.toHslString();
            if (format === "hsv") formattedString = this.toHsvString();
            return formattedString || this.toHexString();
        },
        clone: function clone() {
            return tinycolor(this.toString());
        },
        _applyModification: function _applyModification(fn, args) {
            var color = fn.apply(null, [
                this
            ].concat([].slice.call(args)));
            this._r = color._r;
            this._g = color._g;
            this._b = color._b;
            this.setAlpha(color._a);
            return this;
        },
        lighten: function lighten() {
            return this._applyModification(_lighten, arguments);
        },
        brighten: function brighten() {
            return this._applyModification(_brighten, arguments);
        },
        darken: function darken() {
            return this._applyModification(_darken, arguments);
        },
        desaturate: function desaturate() {
            return this._applyModification(_desaturate, arguments);
        },
        saturate: function saturate() {
            return this._applyModification(_saturate, arguments);
        },
        greyscale: function greyscale() {
            return this._applyModification(_greyscale, arguments);
        },
        spin: function spin() {
            return this._applyModification(_spin, arguments);
        },
        _applyCombination: function _applyCombination(fn, args) {
            return fn.apply(null, [
                this
            ].concat([].slice.call(args)));
        },
        analogous: function analogous() {
            return this._applyCombination(_analogous, arguments);
        },
        complement: function complement() {
            return this._applyCombination(_complement, arguments);
        },
        monochromatic: function monochromatic() {
            return this._applyCombination(_monochromatic, arguments);
        },
        splitcomplement: function splitcomplement() {
            return this._applyCombination(_splitcomplement, arguments);
        },
        // Disabled until https://github.com/bgrins/TinyColor/issues/254
        // polyad: function (number) {
        //   return this._applyCombination(polyad, [number]);
        // },
        triad: function triad() {
            return this._applyCombination(polyad, [
                3
            ]);
        },
        tetrad: function tetrad() {
            return this._applyCombination(polyad, [
                4
            ]);
        }
    };
    // If input is an object, force 1 into "1.0" to handle ratios properly
    // String input requires "1.0" as input, so 1 will be treated as 1
    tinycolor.fromRatio = function(color, opts) {
        if (_typeof(color) == "object") {
            var newColor = {};
            for(var i in color)if (color.hasOwnProperty(i)) {
                if (i === "a") newColor[i] = color[i];
                else newColor[i] = convertToPercentage(color[i]);
            }
            color = newColor;
        }
        return tinycolor(color, opts);
    };
    // Given a string or object, convert that input to RGB
    // Possible string inputs:
    //
    //     "red"
    //     "#f00" or "f00"
    //     "#ff0000" or "ff0000"
    //     "#ff000000" or "ff000000"
    //     "rgb 255 0 0" or "rgb (255, 0, 0)"
    //     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
    //     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
    //     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
    //     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
    //     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
    //     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
    //
    function inputToRGB(color) {
        var rgb = {
            r: 0,
            g: 0,
            b: 0
        };
        var a = 1;
        var s = null;
        var v = null;
        var l = null;
        var ok = false;
        var format = false;
        if (typeof color == "string") color = stringInputToObject(color);
        if (_typeof(color) == "object") {
            if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
                rgb = rgbToRgb(color.r, color.g, color.b);
                ok = true;
                format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
            } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
                s = convertToPercentage(color.s);
                v = convertToPercentage(color.v);
                rgb = hsvToRgb(color.h, s, v);
                ok = true;
                format = "hsv";
            } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
                s = convertToPercentage(color.s);
                l = convertToPercentage(color.l);
                rgb = hslToRgb(color.h, s, l);
                ok = true;
                format = "hsl";
            }
            if (color.hasOwnProperty("a")) a = color.a;
        }
        a = boundAlpha(a);
        return {
            ok: ok,
            format: color.format || format,
            r: Math.min(255, Math.max(rgb.r, 0)),
            g: Math.min(255, Math.max(rgb.g, 0)),
            b: Math.min(255, Math.max(rgb.b, 0)),
            a: a
        };
    }
    // Conversion Functions
    // --------------------
    // `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
    // <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>
    // `rgbToRgb`
    // Handle bounds / percentage checking to conform to CSS color spec
    // <http://www.w3.org/TR/css3-color/>
    // *Assumes:* r, g, b in [0, 255] or [0, 1]
    // *Returns:* { r, g, b } in [0, 255]
    function rgbToRgb(r, g, b) {
        return {
            r: bound01(r, 255) * 255,
            g: bound01(g, 255) * 255,
            b: bound01(b, 255) * 255
        };
    }
    // `rgbToHsl`
    // Converts an RGB color value to HSL.
    // *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
    // *Returns:* { h, s, l } in [0,1]
    function rgbToHsl(r, g, b) {
        r = bound01(r, 255);
        g = bound01(g, 255);
        b = bound01(b, 255);
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;
        if (max == min) h = s = 0; // achromatic
        else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch(max){
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        return {
            h: h,
            s: s,
            l: l
        };
    }
    // `hslToRgb`
    // Converts an HSL color value to RGB.
    // *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
    // *Returns:* { r, g, b } in the set [0, 255]
    function hslToRgb(h, s, l) {
        var r, g, b;
        h = bound01(h, 360);
        s = bound01(s, 100);
        l = bound01(l, 100);
        function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 0.5) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }
        if (s === 0) r = g = b = l; // achromatic
        else {
            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }
        return {
            r: r * 255,
            g: g * 255,
            b: b * 255
        };
    }
    // `rgbToHsv`
    // Converts an RGB color value to HSV
    // *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
    // *Returns:* { h, s, v } in [0,1]
    function rgbToHsv(r, g, b) {
        r = bound01(r, 255);
        g = bound01(g, 255);
        b = bound01(b, 255);
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, v = max;
        var d = max - min;
        s = max === 0 ? 0 : d / max;
        if (max == min) h = 0; // achromatic
        else {
            switch(max){
                case r:
                    h = (g - b) / d + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / d + 2;
                    break;
                case b:
                    h = (r - g) / d + 4;
                    break;
            }
            h /= 6;
        }
        return {
            h: h,
            s: s,
            v: v
        };
    }
    // `hsvToRgb`
    // Converts an HSV color value to RGB.
    // *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
    // *Returns:* { r, g, b } in the set [0, 255]
    function hsvToRgb(h, s, v) {
        h = bound01(h, 360) * 6;
        s = bound01(s, 100);
        v = bound01(v, 100);
        var i = Math.floor(h), f = h - i, p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s), mod = i % 6, r = [
            v,
            q,
            p,
            p,
            t,
            v
        ][mod], g = [
            t,
            v,
            v,
            q,
            p,
            p
        ][mod], b = [
            p,
            p,
            t,
            v,
            v,
            q
        ][mod];
        return {
            r: r * 255,
            g: g * 255,
            b: b * 255
        };
    }
    // `rgbToHex`
    // Converts an RGB color to hex
    // Assumes r, g, and b are contained in the set [0, 255]
    // Returns a 3 or 6 character hex
    function rgbToHex(r, g, b, allow3Char) {
        var hex = [
            pad2(Math.round(r).toString(16)),
            pad2(Math.round(g).toString(16)),
            pad2(Math.round(b).toString(16))
        ];
        // Return a 3 character hex if possible
        if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
        return hex.join("");
    }
    // `rgbaToHex`
    // Converts an RGBA color plus alpha transparency to hex
    // Assumes r, g, b are contained in the set [0, 255] and
    // a in [0, 1]. Returns a 4 or 8 character rgba hex
    function rgbaToHex(r, g, b, a, allow4Char) {
        var hex = [
            pad2(Math.round(r).toString(16)),
            pad2(Math.round(g).toString(16)),
            pad2(Math.round(b).toString(16)),
            pad2(convertDecimalToHex(a))
        ];
        // Return a 4 character hex if possible
        if (allow4Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1) && hex[3].charAt(0) == hex[3].charAt(1)) return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
        return hex.join("");
    }
    // `rgbaToArgbHex`
    // Converts an RGBA color to an ARGB Hex8 string
    // Rarely used, but required for "toFilter()"
    function rgbaToArgbHex(r, g, b, a) {
        var hex = [
            pad2(convertDecimalToHex(a)),
            pad2(Math.round(r).toString(16)),
            pad2(Math.round(g).toString(16)),
            pad2(Math.round(b).toString(16))
        ];
        return hex.join("");
    }
    // `equals`
    // Can be called with any tinycolor input
    tinycolor.equals = function(color1, color2) {
        if (!color1 || !color2) return false;
        return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
    };
    tinycolor.random = function() {
        return tinycolor.fromRatio({
            r: Math.random(),
            g: Math.random(),
            b: Math.random()
        });
    };
    // Modification Functions
    // ----------------------
    // Thanks to less.js for some of the basics here
    // <https://github.com/cloudhead/less.js/blob/master/lib/less/functions.js>
    function _desaturate(color, amount) {
        amount = amount === 0 ? 0 : amount || 10;
        var hsl = tinycolor(color).toHsl();
        hsl.s -= amount / 100;
        hsl.s = clamp01(hsl.s);
        return tinycolor(hsl);
    }
    function _saturate(color, amount) {
        amount = amount === 0 ? 0 : amount || 10;
        var hsl = tinycolor(color).toHsl();
        hsl.s += amount / 100;
        hsl.s = clamp01(hsl.s);
        return tinycolor(hsl);
    }
    function _greyscale(color) {
        return tinycolor(color).desaturate(100);
    }
    function _lighten(color, amount) {
        amount = amount === 0 ? 0 : amount || 10;
        var hsl = tinycolor(color).toHsl();
        hsl.l += amount / 100;
        hsl.l = clamp01(hsl.l);
        return tinycolor(hsl);
    }
    function _brighten(color, amount) {
        amount = amount === 0 ? 0 : amount || 10;
        var rgb = tinycolor(color).toRgb();
        rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))));
        rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))));
        rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))));
        return tinycolor(rgb);
    }
    function _darken(color, amount) {
        amount = amount === 0 ? 0 : amount || 10;
        var hsl = tinycolor(color).toHsl();
        hsl.l -= amount / 100;
        hsl.l = clamp01(hsl.l);
        return tinycolor(hsl);
    }
    // Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
    // Values outside of this range will be wrapped into this range.
    function _spin(color, amount) {
        var hsl = tinycolor(color).toHsl();
        var hue = (hsl.h + amount) % 360;
        hsl.h = hue < 0 ? 360 + hue : hue;
        return tinycolor(hsl);
    }
    // Combination Functions
    // ---------------------
    // Thanks to jQuery xColor for some of the ideas behind these
    // <https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js>
    function _complement(color) {
        var hsl = tinycolor(color).toHsl();
        hsl.h = (hsl.h + 180) % 360;
        return tinycolor(hsl);
    }
    function polyad(color, number) {
        if (isNaN(number) || number <= 0) throw new Error("Argument to polyad must be a positive number");
        var hsl = tinycolor(color).toHsl();
        var result = [
            tinycolor(color)
        ];
        var step = 360 / number;
        for(var i = 1; i < number; i++)result.push(tinycolor({
            h: (hsl.h + i * step) % 360,
            s: hsl.s,
            l: hsl.l
        }));
        return result;
    }
    function _splitcomplement(color) {
        var hsl = tinycolor(color).toHsl();
        var h = hsl.h;
        return [
            tinycolor(color),
            tinycolor({
                h: (h + 72) % 360,
                s: hsl.s,
                l: hsl.l
            }),
            tinycolor({
                h: (h + 216) % 360,
                s: hsl.s,
                l: hsl.l
            })
        ];
    }
    function _analogous(color, results, slices) {
        results = results || 6;
        slices = slices || 30;
        var hsl = tinycolor(color).toHsl();
        var part = 360 / slices;
        var ret = [
            tinycolor(color)
        ];
        for(hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results;){
            hsl.h = (hsl.h + part) % 360;
            ret.push(tinycolor(hsl));
        }
        return ret;
    }
    function _monochromatic(color, results) {
        results = results || 6;
        var hsv = tinycolor(color).toHsv();
        var h = hsv.h, s = hsv.s, v = hsv.v;
        var ret = [];
        var modification = 1 / results;
        while(results--){
            ret.push(tinycolor({
                h: h,
                s: s,
                v: v
            }));
            v = (v + modification) % 1;
        }
        return ret;
    }
    // Utility Functions
    // ---------------------
    tinycolor.mix = function(color1, color2, amount) {
        amount = amount === 0 ? 0 : amount || 50;
        var rgb1 = tinycolor(color1).toRgb();
        var rgb2 = tinycolor(color2).toRgb();
        var p = amount / 100;
        var rgba = {
            r: (rgb2.r - rgb1.r) * p + rgb1.r,
            g: (rgb2.g - rgb1.g) * p + rgb1.g,
            b: (rgb2.b - rgb1.b) * p + rgb1.b,
            a: (rgb2.a - rgb1.a) * p + rgb1.a
        };
        return tinycolor(rgba);
    };
    // Readability Functions
    // ---------------------
    // <http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef (WCAG Version 2)
    // `contrast`
    // Analyze the 2 colors and returns the color contrast defined by (WCAG Version 2)
    tinycolor.readability = function(color1, color2) {
        var c1 = tinycolor(color1);
        var c2 = tinycolor(color2);
        return (Math.max(c1.getLuminance(), c2.getLuminance()) + 0.05) / (Math.min(c1.getLuminance(), c2.getLuminance()) + 0.05);
    };
    // `isReadable`
    // Ensure that foreground and background color combinations meet WCAG2 guidelines.
    // The third argument is an optional Object.
    //      the 'level' property states 'AA' or 'AAA' - if missing or invalid, it defaults to 'AA';
    //      the 'size' property states 'large' or 'small' - if missing or invalid, it defaults to 'small'.
    // If the entire object is absent, isReadable defaults to {level:"AA",size:"small"}.
    // *Example*
    //    tinycolor.isReadable("#000", "#111") => false
    //    tinycolor.isReadable("#000", "#111",{level:"AA",size:"large"}) => false
    tinycolor.isReadable = function(color1, color2, wcag2) {
        var readability = tinycolor.readability(color1, color2);
        var wcag2Parms, out;
        out = false;
        wcag2Parms = validateWCAG2Parms(wcag2);
        switch(wcag2Parms.level + wcag2Parms.size){
            case "AAsmall":
            case "AAAlarge":
                out = readability >= 4.5;
                break;
            case "AAlarge":
                out = readability >= 3;
                break;
            case "AAAsmall":
                out = readability >= 7;
                break;
        }
        return out;
    };
    // `mostReadable`
    // Given a base color and a list of possible foreground or background
    // colors for that base, returns the most readable color.
    // Optionally returns Black or White if the most readable color is unreadable.
    // *Example*
    //    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:false}).toHexString(); // "#112255"
    //    tinycolor.mostReadable(tinycolor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:true}).toHexString();  // "#ffffff"
    //    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"large"}).toHexString(); // "#faf3f3"
    //    tinycolor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"small"}).toHexString(); // "#ffffff"
    tinycolor.mostReadable = function(baseColor, colorList, args) {
        var bestColor = null;
        var bestScore = 0;
        var readability;
        var includeFallbackColors, level, size;
        args = args || {};
        includeFallbackColors = args.includeFallbackColors;
        level = args.level;
        size = args.size;
        for(var i = 0; i < colorList.length; i++){
            readability = tinycolor.readability(baseColor, colorList[i]);
            if (readability > bestScore) {
                bestScore = readability;
                bestColor = tinycolor(colorList[i]);
            }
        }
        if (tinycolor.isReadable(baseColor, bestColor, {
            level: level,
            size: size
        }) || !includeFallbackColors) return bestColor;
        else {
            args.includeFallbackColors = false;
            return tinycolor.mostReadable(baseColor, [
                "#fff",
                "#000"
            ], args);
        }
    };
    // Big List of Colors
    // ------------------
    // <https://www.w3.org/TR/css-color-4/#named-colors>
    var names = tinycolor.names = {
        aliceblue: "f0f8ff",
        antiquewhite: "faebd7",
        aqua: "0ff",
        aquamarine: "7fffd4",
        azure: "f0ffff",
        beige: "f5f5dc",
        bisque: "ffe4c4",
        black: "000",
        blanchedalmond: "ffebcd",
        blue: "00f",
        blueviolet: "8a2be2",
        brown: "a52a2a",
        burlywood: "deb887",
        burntsienna: "ea7e5d",
        cadetblue: "5f9ea0",
        chartreuse: "7fff00",
        chocolate: "d2691e",
        coral: "ff7f50",
        cornflowerblue: "6495ed",
        cornsilk: "fff8dc",
        crimson: "dc143c",
        cyan: "0ff",
        darkblue: "00008b",
        darkcyan: "008b8b",
        darkgoldenrod: "b8860b",
        darkgray: "a9a9a9",
        darkgreen: "006400",
        darkgrey: "a9a9a9",
        darkkhaki: "bdb76b",
        darkmagenta: "8b008b",
        darkolivegreen: "556b2f",
        darkorange: "ff8c00",
        darkorchid: "9932cc",
        darkred: "8b0000",
        darksalmon: "e9967a",
        darkseagreen: "8fbc8f",
        darkslateblue: "483d8b",
        darkslategray: "2f4f4f",
        darkslategrey: "2f4f4f",
        darkturquoise: "00ced1",
        darkviolet: "9400d3",
        deeppink: "ff1493",
        deepskyblue: "00bfff",
        dimgray: "696969",
        dimgrey: "696969",
        dodgerblue: "1e90ff",
        firebrick: "b22222",
        floralwhite: "fffaf0",
        forestgreen: "228b22",
        fuchsia: "f0f",
        gainsboro: "dcdcdc",
        ghostwhite: "f8f8ff",
        gold: "ffd700",
        goldenrod: "daa520",
        gray: "808080",
        green: "008000",
        greenyellow: "adff2f",
        grey: "808080",
        honeydew: "f0fff0",
        hotpink: "ff69b4",
        indianred: "cd5c5c",
        indigo: "4b0082",
        ivory: "fffff0",
        khaki: "f0e68c",
        lavender: "e6e6fa",
        lavenderblush: "fff0f5",
        lawngreen: "7cfc00",
        lemonchiffon: "fffacd",
        lightblue: "add8e6",
        lightcoral: "f08080",
        lightcyan: "e0ffff",
        lightgoldenrodyellow: "fafad2",
        lightgray: "d3d3d3",
        lightgreen: "90ee90",
        lightgrey: "d3d3d3",
        lightpink: "ffb6c1",
        lightsalmon: "ffa07a",
        lightseagreen: "20b2aa",
        lightskyblue: "87cefa",
        lightslategray: "789",
        lightslategrey: "789",
        lightsteelblue: "b0c4de",
        lightyellow: "ffffe0",
        lime: "0f0",
        limegreen: "32cd32",
        linen: "faf0e6",
        magenta: "f0f",
        maroon: "800000",
        mediumaquamarine: "66cdaa",
        mediumblue: "0000cd",
        mediumorchid: "ba55d3",
        mediumpurple: "9370db",
        mediumseagreen: "3cb371",
        mediumslateblue: "7b68ee",
        mediumspringgreen: "00fa9a",
        mediumturquoise: "48d1cc",
        mediumvioletred: "c71585",
        midnightblue: "191970",
        mintcream: "f5fffa",
        mistyrose: "ffe4e1",
        moccasin: "ffe4b5",
        navajowhite: "ffdead",
        navy: "000080",
        oldlace: "fdf5e6",
        olive: "808000",
        olivedrab: "6b8e23",
        orange: "ffa500",
        orangered: "ff4500",
        orchid: "da70d6",
        palegoldenrod: "eee8aa",
        palegreen: "98fb98",
        paleturquoise: "afeeee",
        palevioletred: "db7093",
        papayawhip: "ffefd5",
        peachpuff: "ffdab9",
        peru: "cd853f",
        pink: "ffc0cb",
        plum: "dda0dd",
        powderblue: "b0e0e6",
        purple: "800080",
        rebeccapurple: "663399",
        red: "f00",
        rosybrown: "bc8f8f",
        royalblue: "4169e1",
        saddlebrown: "8b4513",
        salmon: "fa8072",
        sandybrown: "f4a460",
        seagreen: "2e8b57",
        seashell: "fff5ee",
        sienna: "a0522d",
        silver: "c0c0c0",
        skyblue: "87ceeb",
        slateblue: "6a5acd",
        slategray: "708090",
        slategrey: "708090",
        snow: "fffafa",
        springgreen: "00ff7f",
        steelblue: "4682b4",
        tan: "d2b48c",
        teal: "008080",
        thistle: "d8bfd8",
        tomato: "ff6347",
        turquoise: "40e0d0",
        violet: "ee82ee",
        wheat: "f5deb3",
        white: "fff",
        whitesmoke: "f5f5f5",
        yellow: "ff0",
        yellowgreen: "9acd32"
    };
    // Make it easy to access colors via `hexNames[hex]`
    var hexNames = tinycolor.hexNames = flip(names);
    // Utilities
    // ---------
    // `{ 'name1': 'val1' }` becomes `{ 'val1': 'name1' }`
    function flip(o) {
        var flipped = {};
        for(var i in o)if (o.hasOwnProperty(i)) flipped[o[i]] = i;
        return flipped;
    }
    // Return a valid alpha value [0,1] with all invalid values being set to 1
    function boundAlpha(a) {
        a = parseFloat(a);
        if (isNaN(a) || a < 0 || a > 1) a = 1;
        return a;
    }
    // Take input from [0, n] and return it as [0, 1]
    function bound01(n, max) {
        if (isOnePointZero(n)) n = "100%";
        var processPercent = isPercentage(n);
        n = Math.min(max, Math.max(0, parseFloat(n)));
        // Automatically convert percentage into number
        if (processPercent) n = parseInt(n * max, 10) / 100;
        // Handle floating point rounding errors
        if (Math.abs(n - max) < 0.000001) return 1;
        // Convert into [0, 1] range if it isn't already
        return n % max / parseFloat(max);
    }
    // Force a number between 0 and 1
    function clamp01(val) {
        return Math.min(1, Math.max(0, val));
    }
    // Parse a base-16 hex value into a base-10 integer
    function parseIntFromHex(val) {
        return parseInt(val, 16);
    }
    // Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
    // <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
    function isOnePointZero(n) {
        return typeof n == "string" && n.indexOf(".") != -1 && parseFloat(n) === 1;
    }
    // Check to see if string passed in is a percentage
    function isPercentage(n) {
        return typeof n === "string" && n.indexOf("%") != -1;
    }
    // Force a hex value to have 2 characters
    function pad2(c) {
        return c.length == 1 ? "0" + c : "" + c;
    }
    // Replace a decimal with it's percentage value
    function convertToPercentage(n) {
        if (n <= 1) n = n * 100 + "%";
        return n;
    }
    // Converts a decimal to a hex value
    function convertDecimalToHex(d) {
        return Math.round(parseFloat(d) * 255).toString(16);
    }
    // Converts a hex value to a decimal
    function convertHexToDecimal(h) {
        return parseIntFromHex(h) / 255;
    }
    var matchers = function() {
        // <http://www.w3.org/TR/css3-values/#integers>
        var CSS_INTEGER = "[-\\+]?\\d+%?";
        // <http://www.w3.org/TR/css3-values/#number-value>
        var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";
        // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
        var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";
        // Actual matching.
        // Parentheses and commas are optional, but not required.
        // Whitespace can take the place of commas or opening paren
        var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
        var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
        return {
            CSS_UNIT: new RegExp(CSS_UNIT),
            rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
            rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
            hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
            hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
            hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
            hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
            hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
            hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
            hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
            hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
        };
    }();
    // `isValidCSSUnit`
    // Take in a single string / number and check to see if it looks like a CSS unit
    // (see `matchers` above for definition).
    function isValidCSSUnit(color) {
        return !!matchers.CSS_UNIT.exec(color);
    }
    // `stringInputToObject`
    // Permissive string parsing.  Take in a number of formats, and output an object
    // based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
    function stringInputToObject(color) {
        color = color.replace(trimLeft, "").replace(trimRight, "").toLowerCase();
        var named = false;
        if (names[color]) {
            color = names[color];
            named = true;
        } else if (color == "transparent") return {
            r: 0,
            g: 0,
            b: 0,
            a: 0,
            format: "name"
        };
        // Try to match string input using regular expressions.
        // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
        // Just return an object and let the conversion functions handle that.
        // This way the result will be the same whether the tinycolor is initialized with string or object.
        var match;
        if (match = matchers.rgb.exec(color)) return {
            r: match[1],
            g: match[2],
            b: match[3]
        };
        if (match = matchers.rgba.exec(color)) return {
            r: match[1],
            g: match[2],
            b: match[3],
            a: match[4]
        };
        if (match = matchers.hsl.exec(color)) return {
            h: match[1],
            s: match[2],
            l: match[3]
        };
        if (match = matchers.hsla.exec(color)) return {
            h: match[1],
            s: match[2],
            l: match[3],
            a: match[4]
        };
        if (match = matchers.hsv.exec(color)) return {
            h: match[1],
            s: match[2],
            v: match[3]
        };
        if (match = matchers.hsva.exec(color)) return {
            h: match[1],
            s: match[2],
            v: match[3],
            a: match[4]
        };
        if (match = matchers.hex8.exec(color)) return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            a: convertHexToDecimal(match[4]),
            format: named ? "name" : "hex8"
        };
        if (match = matchers.hex6.exec(color)) return {
            r: parseIntFromHex(match[1]),
            g: parseIntFromHex(match[2]),
            b: parseIntFromHex(match[3]),
            format: named ? "name" : "hex"
        };
        if (match = matchers.hex4.exec(color)) return {
            r: parseIntFromHex(match[1] + "" + match[1]),
            g: parseIntFromHex(match[2] + "" + match[2]),
            b: parseIntFromHex(match[3] + "" + match[3]),
            a: convertHexToDecimal(match[4] + "" + match[4]),
            format: named ? "name" : "hex8"
        };
        if (match = matchers.hex3.exec(color)) return {
            r: parseIntFromHex(match[1] + "" + match[1]),
            g: parseIntFromHex(match[2] + "" + match[2]),
            b: parseIntFromHex(match[3] + "" + match[3]),
            format: named ? "name" : "hex"
        };
        return false;
    }
    function validateWCAG2Parms(parms) {
        // return valid WCAG2 parms for isReadable.
        // If input parms are invalid, return {"level":"AA", "size":"small"}
        var level, size;
        parms = parms || {
            level: "AA",
            size: "small"
        };
        level = (parms.level || "AA").toUpperCase();
        size = (parms.size || "small").toLowerCase();
        if (level !== "AA" && level !== "AAA") level = "AA";
        if (size !== "small" && size !== "large") size = "small";
        return {
            level: level,
            size: size
        };
    }
    return tinycolor;
});

});

parcelRegister("i3H5K", function(module, exports) {


module.exports = (parcelRequire("hK98B"))((parcelRequire("5XuQH")).resolve("6Ct7A")).then(()=>parcelRequire("6ZJcz"));

});




parcelRegister("7dWeq", function(module, exports) {

$parcel$export(module.exports, "dropdownProp", () => $fc5b0f46855d27ea$export$d24dfb195c42dd3d);
const $fc5b0f46855d27ea$export$d24dfb195c42dd3d = {
    className: cx("p-1 border border-gray-300 h-[28px]", css`
      input {
        max-width: none;
        width: 87px;
        flex: 1;
      }
    `),
    popover: {
        className: "border border-gray-300",
        itemClassName: cx("text-sm cursor-pointer min-w-[150px] p-1 hover:bg-blue-100", css`
        &.active {
          background: #3c82f6;
          color: white;
        }
      `)
    }
};

});


parcelRegister("bwyLh", function(module, exports) {

$parcel$export(module.exports, "PanelBorder", () => $80f3586702f68954$export$245eebb4f4e6c72b);

var $lAN3N = parcelRequire("lAN3N");

var $cfpVL = parcelRequire("cfpVL");

var $eW2Jy = parcelRequire("eW2Jy");

var $43Iq0 = parcelRequire("43Iq0");

var $4WfNn = parcelRequire("4WfNn");

var $6ai3B = parcelRequire("6ai3B");

var $769fS = parcelRequire("769fS");

var $3M49X = parcelRequire("3M49X");

var $7dWeq = parcelRequire("7dWeq");

var $bjM6F = parcelRequire("bjM6F");

var $emJmR = parcelRequire("emJmR");

var $dCav9 = parcelRequire("dCav9");
const $80f3586702f68954$export$245eebb4f4e6c72b = ({ value: value, update: update, mode: mode })=>{
    const params = (0, $bjM6F.responsiveVal)(value, "border", mode, {
        style: "solid"
    });
    const detectMixed = (round)=>{
        let rounded = round;
        let corner = [];
        (0, (/*@__PURE__*/$parcel$interopDefault($eW2Jy)))(rounded, (r, v, k)=>{
            corner.push(v);
        });
        let uniqueCorner = (0, (/*@__PURE__*/$parcel$interopDefault($43Iq0)))(corner);
        if (uniqueCorner.length > 1 && corner.length === 4) return true;
        return false;
    };
    const detectMixedCorner = (round)=>{
        let rounded = round;
        let corner = [];
        (0, (/*@__PURE__*/$parcel$interopDefault($eW2Jy)))(rounded, (r, v, k)=>{
            corner.push(v);
        });
        let uniqueCorner = (0, (/*@__PURE__*/$parcel$interopDefault($43Iq0)))(corner);
        if (uniqueCorner.length > 1 && corner.length === 4) return {
            isMix: true,
            value: "Mixed"
        };
        return {
            isMix: false,
            value: uniqueCorner[0] + ""
        };
    };
    const updateAllCorner = (props)=>{
        const { value: value } = props;
        update("border", {
            ...params,
            rounded: {
                tr: value,
                tl: value,
                bl: value,
                br: value
            }
        });
        return {
            tr: value,
            tl: value,
            bl: value,
            br: value
        };
    };
    const local = (0, $4WfNn.useLocal)({
        colorOpen: false,
        isMix: false,
        isBorderMix: false,
        open: false,
        corner: null,
        borderVal: null,
        ready: false,
        border: false
    }, ()=>{
        let isMixed = detectMixedCorner(params.rounded);
        local.isMix = isMixed.isMix;
        if (isMixed.isMix) local.open = true;
        let mixStroke = detectMixedCorner(params.stroke);
        local.isBorderMix = mixStroke.isMix;
        if (mixStroke.isMix) local.border = true;
        local.render();
    });
    return /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
        className: "flex flex-col space-y-2",
        children: [
            /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                className: cx("flex flex-row justify-between text-xs "),
                children: [
                    /*#__PURE__*/ (0, $lAN3N.jsx)((0, $emJmR.Tooltip), {
                        content: "Background Size",
                        children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                            className: cx("bg-white p-[2px] border border-gray-300 flex items-stretch", css`
                .border {
                  width: 70px !important;
                }
                input {
                  width: 100%;
                }
              `),
                            children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $dCav9.Dropdown), {
                                ...(0, $7dWeq.dropdownProp),
                                value: params.style,
                                items: [
                                    {
                                        value: "solid",
                                        label: "Solid"
                                    },
                                    {
                                        value: "dash",
                                        label: "Dash"
                                    }
                                ],
                                onChange: (val)=>{
                                    update("border", {
                                        ...params,
                                        style: val
                                    });
                                }
                            })
                        })
                    }),
                    /*#__PURE__*/ (0, $lAN3N.jsx)((0, $emJmR.Tooltip), {
                        content: "Stroke",
                        asChild: true,
                        children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                            className: cx("bg-white p-[2px] border border-gray-300 flex items-stretch", css`
                input {
                  width: 100% !important;
                }
                .field-num {
                  width: 60px !important;
                }
              `),
                            children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $3M49X.FieldNumUnit), {
                                positiveOnly: true,
                                hideUnit: true,
                                icon: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                    className: "text-lg text-gray-700",
                                    children: /*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
                                        width: "15",
                                        height: "15",
                                        viewBox: "0 0 24 24",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                                            fill: "currentColor",
                                            d: "M20 15H4c-.55 0-1 .45-1 1s.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1zm0-5H4c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-1c0-.55-.45-1-1-1zm0-6H4c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1zm.5 15h-17c-.28 0-.5.22-.5.5s.22.5.5.5h17c.28 0 .5-.22.5-.5s-.22-.5-.5-.5z"
                                        })
                                    })
                                }),
                                value: (0, (/*@__PURE__*/$parcel$interopDefault($cfpVL)))(detectMixedCorner(params.stroke), "isMix") ? "" : (0, (/*@__PURE__*/$parcel$interopDefault($cfpVL)))(detectMixedCorner(params.stroke), "value") + "",
                                disabled: (0, (/*@__PURE__*/$parcel$interopDefault($cfpVL)))(detectMixedCorner(params.stroke), "isMix") ? "Mixed" : false,
                                update: (val)=>{
                                    let value = parseInt(val.replaceAll("px", ""));
                                    let data = {
                                        t: value,
                                        b: value,
                                        l: value,
                                        r: value
                                    };
                                    update("border", {
                                        ...params,
                                        stroke: data
                                    });
                                    let mixStroke = detectMixedCorner(data);
                                    local.isBorderMix = mixStroke.isMix;
                                    local.render();
                                }
                            })
                        })
                    }),
                    /*#__PURE__*/ (0, $lAN3N.jsx)((0, $emJmR.Tooltip), {
                        asChild: true,
                        content: "Toggle Border",
                        placement: "top-end",
                        children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                            children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $6ai3B.Button), {
                                className: cx("flex-1", css`
                  width: 30px;
                  max-width: 30px;
                  height: 35px;
                  min-width: 0px !important;
                  background: ${local.border ? "#3c82f6" : "#fff"} !important;
                  border-color: ${local.border ? "#7baeff" : "#d1d1d1"} !important;
                `),
                                onClick: ()=>{
                                    local.border = !local.border;
                                    local.render();
                                },
                                children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                    className: "text-lg text-gray-700",
                                    children: /*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
                                        width: "15",
                                        height: "15",
                                        viewBox: "0 0 24 24",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                                            fill: "none",
                                            stroke: "currentColor",
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: "2",
                                            d: "M4 8v8m16 0V8M8 4h8M8 20h8"
                                        })
                                    })
                                })
                            })
                        })
                    })
                ]
            }),
            local.border ? /*#__PURE__*/ (0, $lAN3N.jsx)((0, $lAN3N.Fragment), {
                children: /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                    className: cx("flex flex-row text-xs ", css`
                .field-num {
                  height: 25px;
                  border: 1px solid #d1d1d1;
                }
              `, css`
                .field-num {
                  width: 45px !important;
                  border-right: 0px !important;
                }
              `),
                    children: [
                        /*#__PURE__*/ (0, $lAN3N.jsx)((0, $emJmR.Tooltip), {
                            asChild: true,
                            content: "Border Left",
                            children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $3M49X.FieldNumUnit), {
                                    positiveOnly: true,
                                    hideUnit: true,
                                    icon: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                        className: "text-lg text-gray-700",
                                        children: /*#__PURE__*/ (0, $lAN3N.jsxs)("svg", {
                                            width: "15",
                                            height: "15",
                                            viewBox: "0 0 24 24",
                                            xmlns: "http://www.w3.org/2000/svg",
                                            children: [
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                                                    fill: "currentColor",
                                                    d: "M3.5 21a1 1 0 0 1-1-1V4a1 1 0 0 1 2 0v16a1 1 0 0 1-1 1Z"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "7.5",
                                                    cy: "12",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "11.5",
                                                    cy: "12",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "15.5",
                                                    cy: "12",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "19.5",
                                                    cy: "12",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "7.5",
                                                    cy: "4",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "11.5",
                                                    cy: "4",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "15.5",
                                                    cy: "4",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "19.5",
                                                    cy: "4",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "19.5",
                                                    cy: "8",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "19.5",
                                                    cy: "16",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "11.5",
                                                    cy: "8",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "11.5",
                                                    cy: "16",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "7.5",
                                                    cy: "20",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "11.5",
                                                    cy: "20",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "15.5",
                                                    cy: "20",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "19.5",
                                                    cy: "20",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                })
                                            ]
                                        })
                                    }),
                                    value: (0, (/*@__PURE__*/$parcel$interopDefault($cfpVL)))(params, "stroke.l") + "px",
                                    update: (val)=>{
                                        let data = {
                                            ...params.stroke,
                                            l: parseInt(val.replaceAll("px", ""))
                                        };
                                        update("border", {
                                            ...params,
                                            stroke: data
                                        });
                                        let isMixed = detectMixedCorner(data);
                                        local.isBorderMix = isMixed.isMix;
                                        local.borderVal = isMixed.value;
                                        local.render();
                                    }
                                })
                            })
                        }),
                        /*#__PURE__*/ (0, $lAN3N.jsx)((0, $emJmR.Tooltip), {
                            asChild: true,
                            content: "Border Top",
                            children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $3M49X.FieldNumUnit), {
                                    positiveOnly: true,
                                    hideUnit: true,
                                    icon: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                        className: "text-lg text-gray-700",
                                        children: /*#__PURE__*/ (0, $lAN3N.jsxs)("svg", {
                                            width: "15",
                                            height: "15",
                                            viewBox: "0 0 24 24",
                                            xmlns: "http://www.w3.org/2000/svg",
                                            children: [
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                                                    fill: "currentColor",
                                                    d: "M20 4.5H4a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2Z"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "12",
                                                    cy: "7.5",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "12",
                                                    cy: "11.5",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "12",
                                                    cy: "15.5",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "12",
                                                    cy: "19.5",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "20",
                                                    cy: "7.5",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "20",
                                                    cy: "11.5",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "20",
                                                    cy: "15.5",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "20",
                                                    cy: "19.5",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "16",
                                                    cy: "19.5",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "8",
                                                    cy: "19.5",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "16",
                                                    cy: "11.5",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "8",
                                                    cy: "11.5",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "4",
                                                    cy: "7.5",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "4",
                                                    cy: "11.5",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "4",
                                                    cy: "15.5",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "4",
                                                    cy: "19.5",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                })
                                            ]
                                        })
                                    }),
                                    value: (0, (/*@__PURE__*/$parcel$interopDefault($cfpVL)))(params, "stroke.t") + "px",
                                    update: (val)=>{
                                        let data = {
                                            ...params.stroke,
                                            t: parseInt(val.replaceAll("px", ""))
                                        };
                                        update("border", {
                                            ...params,
                                            stroke: data
                                        });
                                        let isMixed = detectMixedCorner(data);
                                        local.isBorderMix = isMixed.isMix;
                                        local.borderVal = isMixed.value;
                                        local.render();
                                    }
                                })
                            })
                        }),
                        /*#__PURE__*/ (0, $lAN3N.jsx)((0, $emJmR.Tooltip), {
                            asChild: true,
                            content: "Border Right",
                            children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $3M49X.FieldNumUnit), {
                                    positiveOnly: true,
                                    hideUnit: true,
                                    icon: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                        className: "text-lg text-gray-700",
                                        children: /*#__PURE__*/ (0, $lAN3N.jsxs)("svg", {
                                            width: "15",
                                            height: "15",
                                            viewBox: "0 0 24 24",
                                            xmlns: "http://www.w3.org/2000/svg",
                                            children: [
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                                                    fill: "currentColor",
                                                    d: "M20.5 21a1 1 0 0 1-1-1V4a1 1 0 0 1 2 0v16a1 1 0 0 1-1 1Z"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "16.5",
                                                    cy: "12",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "12.5",
                                                    cy: "12",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "8.5",
                                                    cy: "12",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "4.5",
                                                    cy: "12",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "16.5",
                                                    cy: "20",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "12.5",
                                                    cy: "20",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "8.5",
                                                    cy: "20",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "4.5",
                                                    cy: "20",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "4.5",
                                                    cy: "16",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "4.5",
                                                    cy: "8",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "12.5",
                                                    cy: "16",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "12.5",
                                                    cy: "8",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "16.5",
                                                    cy: "4",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "12.5",
                                                    cy: "4",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "8.5",
                                                    cy: "4",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "4.5",
                                                    cy: "4",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                })
                                            ]
                                        })
                                    }),
                                    value: (0, (/*@__PURE__*/$parcel$interopDefault($cfpVL)))(params, "stroke.r") + "px",
                                    update: (val)=>{
                                        let data = {
                                            ...params.stroke,
                                            r: parseInt(val.replaceAll("px", ""))
                                        };
                                        update("border", {
                                            ...params,
                                            stroke: data
                                        });
                                        let isMixed = detectMixedCorner(data);
                                        local.isBorderMix = isMixed.isMix;
                                        local.borderVal = isMixed.value;
                                        local.render();
                                    }
                                })
                            })
                        }),
                        /*#__PURE__*/ (0, $lAN3N.jsx)((0, $emJmR.Tooltip), {
                            asChild: true,
                            content: "Border Bottom",
                            children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $3M49X.FieldNumUnit), {
                                    positiveOnly: true,
                                    hideUnit: true,
                                    icon: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                        className: "text-lg text-gray-700",
                                        children: /*#__PURE__*/ (0, $lAN3N.jsxs)("svg", {
                                            width: "15",
                                            height: "15",
                                            viewBox: "0 0 24 24",
                                            xmlns: "http://www.w3.org/2000/svg",
                                            children: [
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                                                    fill: "currentColor",
                                                    d: "M20 21.5H4a1 1 0 0 1 0-2h16a1 1 0 0 1 0 2Z"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "12",
                                                    cy: "16.5",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "12",
                                                    cy: "12.5",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "12",
                                                    cy: "8.5",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "12",
                                                    cy: "4.5",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "4",
                                                    cy: "16.5",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "4",
                                                    cy: "12.5",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "4",
                                                    cy: "8.5",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "4",
                                                    cy: "4.5",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "8",
                                                    cy: "4.5",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "16",
                                                    cy: "4.5",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "8",
                                                    cy: "12.5",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "16",
                                                    cy: "12.5",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "20",
                                                    cy: "16.5",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "20",
                                                    cy: "12.5",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "20",
                                                    cy: "8.5",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("circle", {
                                                    cx: "20",
                                                    cy: "4.5",
                                                    r: "1",
                                                    fill: "currentColor",
                                                    opacity: ".5"
                                                })
                                            ]
                                        })
                                    }),
                                    value: (0, (/*@__PURE__*/$parcel$interopDefault($cfpVL)))(params, "stroke.b") + "px",
                                    update: (val)=>{
                                        let data = {
                                            ...params.stroke,
                                            b: parseInt(val.replaceAll("px", ""))
                                        };
                                        update("border", {
                                            ...params,
                                            stroke: data
                                        });
                                        let isMixed = detectMixedCorner(data);
                                        local.isBorderMix = isMixed.isMix;
                                        local.borderVal = isMixed.value;
                                        local.render();
                                    }
                                })
                            })
                        })
                    ]
                })
            }) : /*#__PURE__*/ (0, $lAN3N.jsx)((0, $lAN3N.Fragment), {}),
            /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                className: cx("flex flex-row items-stretch justify-between text-xs ", css`
            .field-num {
              border: 1px solid #d1d1d1;
            }
          `),
                children: [
                    /*#__PURE__*/ (0, $lAN3N.jsx)((0, $emJmR.Tooltip), {
                        asChild: true,
                        content: "Border Color",
                        children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                            className: cx("bg-white p-[2px] border border-gray-300 flex items-stretch", css`
                .color-box {
                  height: 25px !important;
                  width: 50px;
                }
              `),
                            children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $769fS.FieldColor), {
                                popupID: "border-color",
                                value: params.color,
                                update: (color)=>{
                                    update("border", {
                                        ...params,
                                        color: color
                                    });
                                }
                            })
                        })
                    }),
                    /*#__PURE__*/ (0, $lAN3N.jsx)((0, $emJmR.Tooltip), {
                        content: "Corner",
                        children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                            className: cx("", css`
                .field-num {
                  width: 85px;
                  height: 30px;
                }
              `),
                            children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $3M49X.FieldNumUnit), {
                                positiveOnly: true,
                                hideUnit: true,
                                icon: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                    className: "text-lg text-gray-700",
                                    children: /*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
                                        width: "15",
                                        height: "15",
                                        viewBox: "0 0 24 24",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                                            fill: "currentColor",
                                            d: "M19 19h2v2h-2v-2zm0-2h2v-2h-2v2zM3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm0-4h2V3H3v2zm4 0h2V3H7v2zm8 16h2v-2h-2v2zm-4 0h2v-2h-2v2zm4 0h2v-2h-2v2zm-8 0h2v-2H7v2zm-4 0h2v-2H3v2zM21 8c0-2.76-2.24-5-5-5h-5v2h5c1.65 0 3 1.35 3 3v5h2V8z"
                                        })
                                    })
                                }),
                                width: "100%",
                                enableWhenDrag: true,
                                value: (0, (/*@__PURE__*/$parcel$interopDefault($cfpVL)))(detectMixedCorner(params.rounded), "isMix") ? "" : (0, (/*@__PURE__*/$parcel$interopDefault($cfpVL)))(detectMixedCorner(params.rounded), "value") + "",
                                disabled: (0, (/*@__PURE__*/$parcel$interopDefault($cfpVL)))(detectMixedCorner(params.rounded), "isMix") ? "Mixed" : false,
                                update: (val, setVal)=>{
                                    let result = updateAllCorner({
                                        value: parseInt(val.replaceAll("px", ""))
                                    });
                                    let isMixed = detectMixedCorner(result);
                                    local.isMix = isMixed.isMix;
                                    local.render();
                                }
                            })
                        })
                    }),
                    /*#__PURE__*/ (0, $lAN3N.jsx)((0, $emJmR.Tooltip), {
                        asChild: true,
                        content: "Independent Rounded Corner",
                        placement: "top-end",
                        children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                            children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $6ai3B.Button), {
                                className: cx("flex-1 flex flex-row items-center justify-center", css`
                  width: 30px;
                  max-width: 30px;
                  height: 30px;
                  background: ${local.open ? "rgb(229,231,235)" : "#fff"} !important;
                  border-color: #d1d1d1 !important;
                `),
                                onClick: ()=>{
                                    local.open = !local.open;
                                    local.render();
                                },
                                children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                    className: "text-lg text-gray-700",
                                    children: /*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
                                        width: "15",
                                        height: "15",
                                        viewBox: "0 0 24 24",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                                            fill: "none",
                                            stroke: "currentColor",
                                            strokeLinecap: "round",
                                            strokeLinejoin: "round",
                                            strokeWidth: "2",
                                            d: "M16 4h2a2 2 0 0 1 2 2v2m0 8v2a2 2 0 0 1-2 2h-2m-8 0H6a2 2 0 0 1-2-2v-2m0-8V6a2 2 0 0 1 2-2h2"
                                        })
                                    })
                                })
                            })
                        })
                    })
                ]
            }),
            local.open ? /*#__PURE__*/ (0, $lAN3N.jsx)((0, $lAN3N.Fragment), {
                children: /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                    className: cx("flex flex-row text-xs ", css`
                .field-num {
                  height: 25px;
                  border: 1px solid #d1d1d1;
                }
              `, css`
                .field-num {
                  width: 45px !important;
                  border-right: 0px !important;
                }
              `),
                    children: [
                        /*#__PURE__*/ (0, $lAN3N.jsx)((0, $emJmR.Tooltip), {
                            asChild: true,
                            content: "Corner Top Right",
                            children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $3M49X.FieldNumUnit), {
                                    positiveOnly: true,
                                    hideUnit: true,
                                    icon: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                        className: "text-lg text-gray-700",
                                        children: /*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
                                            width: "15",
                                            height: "15",
                                            viewBox: "0 0 24 24",
                                            xmlns: "http://www.w3.org/2000/svg",
                                            children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                                                fill: "none",
                                                stroke: "currentColor",
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: "1.5",
                                                d: "m20.01 16.01l-.01-.011m.01 4.011l-.01-.011m-3.99.011l-.01-.011m-3.99.011l-.01-.011m-3.99.011L8 19.999m-3.99.011L4 19.999m.01-3.989L4 15.999m.01-3.989L4 11.999m.01-3.989L4 7.999m.01-3.989L4 3.999m4.01.011L8 3.999M20.01 12V4h-8v8h8Z"
                                            })
                                        })
                                    }),
                                    value: (0, (/*@__PURE__*/$parcel$interopDefault($cfpVL)))(params, "rounded.tr") + "px",
                                    update: (val)=>{
                                        update("border", {
                                            ...params,
                                            rounded: {
                                                ...params.rounded,
                                                tr: parseInt(val.replaceAll("px", ""))
                                            }
                                        });
                                        let isMixed = detectMixedCorner({
                                            ...params.rounded,
                                            tr: parseInt(val.replaceAll("px", ""))
                                        });
                                        local.isMix = isMixed.isMix;
                                        local.render();
                                    }
                                })
                            })
                        }),
                        /*#__PURE__*/ (0, $lAN3N.jsx)((0, $emJmR.Tooltip), {
                            asChild: true,
                            content: "Corner Top Left",
                            children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $3M49X.FieldNumUnit), {
                                    positiveOnly: true,
                                    hideUnit: true,
                                    icon: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                        className: "text-lg text-gray-700",
                                        children: /*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
                                            width: "15",
                                            height: "15",
                                            viewBox: "0 0 24 24",
                                            xmlns: "http://www.w3.org/2000/svg",
                                            children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                                                fill: "none",
                                                stroke: "currentColor",
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: "1.5",
                                                d: "m4 16.01l.01-.011M4 20.01l.01-.011M8 20.01l.01-.011m3.99.011l.01-.011m3.99.011l.01-.011m3.99.011l.01-.011M20 16.01l.01-.011M20 12.01l.01-.011M20 8.01l.01-.011M20 4.01l.01-.011M16 4.01l.01-.011M4 12V4h8v8H4Z"
                                            })
                                        })
                                    }),
                                    value: (0, (/*@__PURE__*/$parcel$interopDefault($cfpVL)))(params, "rounded.tl") + "px",
                                    update: (val)=>{
                                        update("border", {
                                            ...params,
                                            rounded: {
                                                ...params.rounded,
                                                tl: parseInt(val.replaceAll("px", ""))
                                            }
                                        });
                                        let isMixed = detectMixedCorner({
                                            ...params.rounded,
                                            tl: parseInt(val.replaceAll("px", ""))
                                        });
                                        local.isMix = isMixed.isMix;
                                        local.render();
                                    }
                                })
                            })
                        }),
                        /*#__PURE__*/ (0, $lAN3N.jsx)((0, $emJmR.Tooltip), {
                            asChild: true,
                            content: "Corner Bottom Left",
                            children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $3M49X.FieldNumUnit), {
                                    positiveOnly: true,
                                    hideUnit: true,
                                    icon: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                        className: "text-lg text-gray-700",
                                        children: /*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
                                            width: "15",
                                            height: "15",
                                            viewBox: "0 0 24 24",
                                            xmlns: "http://www.w3.org/2000/svg",
                                            children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                                                fill: "none",
                                                stroke: "currentColor",
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: "1.5",
                                                d: "m4 8l.01.011M4 4l.01.011M8 4l.01.011M12 4l.01.011M16 4l.01.011M20 4l.01.011M20 8l.01.011M20 12l.01.011M20 16l.01.011M20 20l.01.011M16 20l.01.011M4 12.01v8h8v-8H4Z"
                                            })
                                        })
                                    }),
                                    value: (0, (/*@__PURE__*/$parcel$interopDefault($cfpVL)))(params, "rounded.bl") + "px",
                                    update: (val)=>{
                                        update("border", {
                                            ...params,
                                            rounded: {
                                                ...params.rounded,
                                                bl: parseInt(val.replaceAll("px", ""))
                                            }
                                        });
                                        let isMixed = detectMixedCorner({
                                            ...params.rounded,
                                            bl: parseInt(val.replaceAll("px", ""))
                                        });
                                        local.isMix = isMixed.isMix;
                                        local.render();
                                    }
                                })
                            })
                        }),
                        /*#__PURE__*/ (0, $lAN3N.jsx)((0, $emJmR.Tooltip), {
                            asChild: true,
                            content: "Corner Bottom Right",
                            children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $3M49X.FieldNumUnit), {
                                    positiveOnly: true,
                                    hideUnit: true,
                                    icon: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                        className: "text-lg text-gray-700",
                                        children: /*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
                                            width: "15",
                                            height: "15",
                                            viewBox: "0 0 24 24",
                                            xmlns: "http://www.w3.org/2000/svg",
                                            children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                                                fill: "none",
                                                stroke: "currentColor",
                                                strokeLinecap: "round",
                                                strokeLinejoin: "round",
                                                strokeWidth: "1.5",
                                                d: "m20.01 8l-.01.011M20.01 4l-.01.011M16.01 4l-.01.011M12.01 4l-.01.011M8.01 4L8 4.011M4.01 4L4 4.011M4.01 8L4 8.011M4.01 12l-.01.011M4.01 16l-.01.011M4.01 20l-.01.011M8.01 20l-.01.011m12.01-8.001v8h-8v-8h8Z"
                                            })
                                        })
                                    }),
                                    value: (0, (/*@__PURE__*/$parcel$interopDefault($cfpVL)))(params, "rounded.br") + "px",
                                    update: (val)=>{
                                        update("border", {
                                            ...params,
                                            rounded: {
                                                ...params.rounded,
                                                br: parseInt(val.replaceAll("px", ""))
                                            }
                                        });
                                        let isMixed = detectMixedCorner({
                                            ...params.rounded,
                                            br: parseInt(val.replaceAll("px", ""))
                                        });
                                        local.isMix = isMixed.isMix;
                                        local.render();
                                    }
                                })
                            })
                        })
                    ]
                })
            }) : /*#__PURE__*/ (0, $lAN3N.jsx)((0, $lAN3N.Fragment), {})
        ]
    });
};

});
parcelRegister("eW2Jy", function(module, exports) {
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */ /** Used as the size to enable large array optimizations. */ var LARGE_ARRAY_SIZE = 200;
/** Used as the `TypeError` message for "Functions" methods. */ var FUNC_ERROR_TEXT = "Expected a function";
/** Used to stand-in for `undefined` hash values. */ var HASH_UNDEFINED = "__lodash_hash_undefined__";
/** Used to compose bitmasks for comparison styles. */ var UNORDERED_COMPARE_FLAG = 1, PARTIAL_COMPARE_FLAG = 2;
/** Used as references for various `Number` constants. */ var INFINITY = 1 / 0, MAX_SAFE_INTEGER = 9007199254740991;
/** `Object#toString` result references. */ var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag = "[object Object]", promiseTag = "[object Promise]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", weakMapTag = "[object WeakMap]";
var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
/** Used to match property names within property paths. */ var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/, reLeadingDot = /^\./, rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */ var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
/** Used to match backslashes in property paths. */ var reEscapeChar = /\\(\\)?/g;
/** Used to detect host constructors (Safari). */ var reIsHostCtor = /^\[object .+?Constructor\]$/;
/** Used to detect unsigned integer values. */ var reIsUint = /^(?:0|[1-9]\d*)$/;
/** Used to identify `toStringTag` values of typed arrays. */ var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
/** Detect free variable `global` from Node.js. */ var freeGlobal = typeof $parcel$global == "object" && $parcel$global && $parcel$global.Object === Object && $parcel$global;
/** Detect free variable `self`. */ var freeSelf = typeof self == "object" && self && self.Object === Object && self;
/** Used as a reference to the global object. */ var root = freeGlobal || freeSelf || Function("return this")();
/** Detect free variable `exports`. */ var freeExports = exports && !exports.nodeType && exports;
/** Detect free variable `module`. */ var freeModule = freeExports && true && module && !module.nodeType && module;
/** Detect the popular CommonJS extension `module.exports`. */ var moduleExports = freeModule && freeModule.exports === freeExports;
/** Detect free variable `process` from Node.js. */ var freeProcess = moduleExports && freeGlobal.process;
/** Used to access faster Node.js helpers. */ var nodeUtil = function() {
    try {
        return freeProcess && freeProcess.binding("util");
    } catch (e) {}
}();
/* Node.js helper references. */ var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */ function arrayEach(array, iteratee) {
    var index = -1, length = array ? array.length : 0;
    while(++index < length){
        if (iteratee(array[index], index, array) === false) break;
    }
    return array;
}
/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */ function arraySome(array, predicate) {
    var index = -1, length = array ? array.length : 0;
    while(++index < length){
        if (predicate(array[index], index, array)) return true;
    }
    return false;
}
/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */ function baseProperty(key) {
    return function(object) {
        return object == null ? undefined : object[key];
    };
}
/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */ function baseTimes(n, iteratee) {
    var index = -1, result = Array(n);
    while(++index < n)result[index] = iteratee(index);
    return result;
}
/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */ function baseUnary(func) {
    return function(value) {
        return func(value);
    };
}
/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */ function getValue(object, key) {
    return object == null ? undefined : object[key];
}
/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */ function isHostObject(value) {
    // Many host objects are `Object` objects that can coerce to strings
    // despite having improperly defined `toString` methods.
    var result = false;
    if (value != null && typeof value.toString != "function") try {
        result = !!(value + "");
    } catch (e) {}
    return result;
}
/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */ function mapToArray(map) {
    var index = -1, result = Array(map.size);
    map.forEach(function(value, key) {
        result[++index] = [
            key,
            value
        ];
    });
    return result;
}
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */ function overArg(func, transform) {
    return function(arg) {
        return func(transform(arg));
    };
}
/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */ function setToArray(set) {
    var index = -1, result = Array(set.size);
    set.forEach(function(value) {
        result[++index] = value;
    });
    return result;
}
/** Used for built-in method references. */ var arrayProto = Array.prototype, funcProto = Function.prototype, objectProto = Object.prototype;
/** Used to detect overreaching core-js shims. */ var coreJsData = root["__core-js_shared__"];
/** Used to detect methods masquerading as native. */ var maskSrcKey = function() {
    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
    return uid ? "Symbol(src)_1." + uid : "";
}();
/** Used to resolve the decompiled source of functions. */ var funcToString = funcProto.toString;
/** Used to check objects for own properties. */ var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */ var objectToString = objectProto.toString;
/** Used to detect if a method is native. */ var reIsNative = RegExp("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
/** Built-in value references. */ var Symbol = root.Symbol, Uint8Array = root.Uint8Array, getPrototype = overArg(Object.getPrototypeOf, Object), objectCreate = Object.create, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice;
/* Built-in method references for those with the same name as other `lodash` methods. */ var nativeKeys = overArg(Object.keys, Object);
/* Built-in method references that are verified to be native. */ var DataView = getNative(root, "DataView"), Map = getNative(root, "Map"), Promise = getNative(root, "Promise"), Set = getNative(root, "Set"), WeakMap = getNative(root, "WeakMap"), nativeCreate = getNative(Object, "create");
/** Used to detect maps, sets, and weakmaps. */ var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map), promiseCtorString = toSource(Promise), setCtorString = toSource(Set), weakMapCtorString = toSource(WeakMap);
/** Used to convert symbols to primitives and strings. */ var symbolProto = Symbol ? Symbol.prototype : undefined, symbolValueOf = symbolProto ? symbolProto.valueOf : undefined, symbolToString = symbolProto ? symbolProto.toString : undefined;
/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */ function Hash(entries) {
    var index = -1, length = entries ? entries.length : 0;
    this.clear();
    while(++index < length){
        var entry = entries[index];
        this.set(entry[0], entry[1]);
    }
}
/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */ function hashClear() {
    this.__data__ = nativeCreate ? nativeCreate(null) : {};
}
/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */ function hashDelete(key) {
    return this.has(key) && delete this.__data__[key];
}
/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */ function hashGet(key) {
    var data = this.__data__;
    if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? undefined : result;
    }
    return hasOwnProperty.call(data, key) ? data[key] : undefined;
}
/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */ function hashHas(key) {
    var data = this.__data__;
    return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}
/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */ function hashSet(key, value) {
    var data = this.__data__;
    data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
    return this;
}
// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype["delete"] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */ function ListCache(entries) {
    var index = -1, length = entries ? entries.length : 0;
    this.clear();
    while(++index < length){
        var entry = entries[index];
        this.set(entry[0], entry[1]);
    }
}
/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */ function listCacheClear() {
    this.__data__ = [];
}
/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */ function listCacheDelete(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    if (index < 0) return false;
    var lastIndex = data.length - 1;
    if (index == lastIndex) data.pop();
    else splice.call(data, index, 1);
    return true;
}
/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */ function listCacheGet(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    return index < 0 ? undefined : data[index][1];
}
/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */ function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1;
}
/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */ function listCacheSet(key, value) {
    var data = this.__data__, index = assocIndexOf(data, key);
    if (index < 0) data.push([
        key,
        value
    ]);
    else data[index][1] = value;
    return this;
}
// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype["delete"] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */ function MapCache(entries) {
    var index = -1, length = entries ? entries.length : 0;
    this.clear();
    while(++index < length){
        var entry = entries[index];
        this.set(entry[0], entry[1]);
    }
}
/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */ function mapCacheClear() {
    this.__data__ = {
        "hash": new Hash,
        "map": new (Map || ListCache),
        "string": new Hash
    };
}
/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */ function mapCacheDelete(key) {
    return getMapData(this, key)["delete"](key);
}
/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */ function mapCacheGet(key) {
    return getMapData(this, key).get(key);
}
/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */ function mapCacheHas(key) {
    return getMapData(this, key).has(key);
}
/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */ function mapCacheSet(key, value) {
    getMapData(this, key).set(key, value);
    return this;
}
// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype["delete"] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */ function SetCache(values) {
    var index = -1, length = values ? values.length : 0;
    this.__data__ = new MapCache;
    while(++index < length)this.add(values[index]);
}
/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */ function setCacheAdd(value) {
    this.__data__.set(value, HASH_UNDEFINED);
    return this;
}
/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */ function setCacheHas(value) {
    return this.__data__.has(value);
}
// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;
/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */ function Stack(entries) {
    this.__data__ = new ListCache(entries);
}
/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */ function stackClear() {
    this.__data__ = new ListCache;
}
/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */ function stackDelete(key) {
    return this.__data__["delete"](key);
}
/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */ function stackGet(key) {
    return this.__data__.get(key);
}
/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */ function stackHas(key) {
    return this.__data__.has(key);
}
/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */ function stackSet(key, value) {
    var cache = this.__data__;
    if (cache instanceof ListCache) {
        var pairs = cache.__data__;
        if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
            pairs.push([
                key,
                value
            ]);
            return this;
        }
        cache = this.__data__ = new MapCache(pairs);
    }
    cache.set(key, value);
    return this;
}
// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype["delete"] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;
/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */ function arrayLikeKeys(value, inherited) {
    // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
    // Safari 9 makes `arguments.length` enumerable in strict mode.
    var result = isArray(value) || isArguments(value) ? baseTimes(value.length, String) : [];
    var length = result.length, skipIndexes = !!length;
    for(var key in value)if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == "length" || isIndex(key, length)))) result.push(key);
    return result;
}
/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */ function assocIndexOf(array, key) {
    var length = array.length;
    while(length--){
        if (eq(array[length][0], key)) return length;
    }
    return -1;
}
/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} prototype The object to inherit from.
 * @returns {Object} Returns the new object.
 */ function baseCreate(proto) {
    return isObject(proto) ? objectCreate(proto) : {};
}
/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */ var baseFor = createBaseFor();
/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */ function baseForOwn(object, iteratee) {
    return object && baseFor(object, iteratee, keys);
}
/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */ function baseGet(object, path) {
    path = isKey(path, object) ? [
        path
    ] : castPath(path);
    var index = 0, length = path.length;
    while(object != null && index < length)object = object[toKey(path[index++])];
    return index && index == length ? object : undefined;
}
/**
 * The base implementation of `getTag`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */ function baseGetTag(value) {
    return objectToString.call(value);
}
/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */ function baseHasIn(object, key) {
    return object != null && key in Object(object);
}
/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {boolean} [bitmask] The bitmask of comparison flags.
 *  The bitmask may be composed of the following flags:
 *     1 - Unordered comparison
 *     2 - Partial comparison
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */ function baseIsEqual(value, other, customizer, bitmask, stack) {
    if (value === other) return true;
    if (value == null || other == null || !isObject(value) && !isObjectLike(other)) return value !== value && other !== other;
    return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
}
/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */ function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
    var objIsArr = isArray(object), othIsArr = isArray(other), objTag = arrayTag, othTag = arrayTag;
    if (!objIsArr) {
        objTag = getTag(object);
        objTag = objTag == argsTag ? objectTag : objTag;
    }
    if (!othIsArr) {
        othTag = getTag(other);
        othTag = othTag == argsTag ? objectTag : othTag;
    }
    var objIsObj = objTag == objectTag && !isHostObject(object), othIsObj = othTag == objectTag && !isHostObject(other), isSameTag = objTag == othTag;
    if (isSameTag && !objIsObj) {
        stack || (stack = new Stack);
        return objIsArr || isTypedArray(object) ? equalArrays(object, other, equalFunc, customizer, bitmask, stack) : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
    }
    if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
        var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
        if (objIsWrapped || othIsWrapped) {
            var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
            stack || (stack = new Stack);
            return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
        }
    }
    if (!isSameTag) return false;
    stack || (stack = new Stack);
    return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
}
/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */ function baseIsMatch(object, source, matchData, customizer) {
    var index = matchData.length, length = index, noCustomizer = !customizer;
    if (object == null) return !length;
    object = Object(object);
    while(index--){
        var data = matchData[index];
        if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) return false;
    }
    while(++index < length){
        data = matchData[index];
        var key = data[0], objValue = object[key], srcValue = data[1];
        if (noCustomizer && data[2]) {
            if (objValue === undefined && !(key in object)) return false;
        } else {
            var stack = new Stack;
            if (customizer) var result = customizer(objValue, srcValue, key, object, source, stack);
            if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack) : result)) return false;
        }
    }
    return true;
}
/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */ function baseIsNative(value) {
    if (!isObject(value) || isMasked(value)) return false;
    var pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
}
/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */ function baseIsTypedArray(value) {
    return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
}
/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */ function baseIteratee(value) {
    // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
    // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
    if (typeof value == "function") return value;
    if (value == null) return identity;
    if (typeof value == "object") return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
    return property(value);
}
/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */ function baseKeys(object) {
    if (!isPrototype(object)) return nativeKeys(object);
    var result = [];
    for(var key in Object(object))if (hasOwnProperty.call(object, key) && key != "constructor") result.push(key);
    return result;
}
/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */ function baseMatches(source) {
    var matchData = getMatchData(source);
    if (matchData.length == 1 && matchData[0][2]) return matchesStrictComparable(matchData[0][0], matchData[0][1]);
    return function(object) {
        return object === source || baseIsMatch(object, source, matchData);
    };
}
/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */ function baseMatchesProperty(path, srcValue) {
    if (isKey(path) && isStrictComparable(srcValue)) return matchesStrictComparable(toKey(path), srcValue);
    return function(object) {
        var objValue = get(object, path);
        return objValue === undefined && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
    };
}
/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */ function basePropertyDeep(path) {
    return function(object) {
        return baseGet(object, path);
    };
}
/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */ function baseToString(value) {
    // Exit early for strings to avoid a performance hit in some environments.
    if (typeof value == "string") return value;
    if (isSymbol(value)) return symbolToString ? symbolToString.call(value) : "";
    var result = value + "";
    return result == "0" && 1 / value == -INFINITY ? "-0" : result;
}
/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */ function castPath(value) {
    return isArray(value) ? value : stringToPath(value);
}
/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */ function createBaseFor(fromRight) {
    return function(object, iteratee, keysFunc) {
        var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
        while(length--){
            var key = props[fromRight ? length : ++index];
            if (iteratee(iterable[key], key, iterable) === false) break;
        }
        return object;
    };
}
/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */ function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
    var isPartial = bitmask & PARTIAL_COMPARE_FLAG, arrLength = array.length, othLength = other.length;
    if (arrLength != othLength && !(isPartial && othLength > arrLength)) return false;
    // Assume cyclic values are equal.
    var stacked = stack.get(array);
    if (stacked && stack.get(other)) return stacked == other;
    var index = -1, result = true, seen = bitmask & UNORDERED_COMPARE_FLAG ? new SetCache : undefined;
    stack.set(array, other);
    stack.set(other, array);
    // Ignore non-index properties.
    while(++index < arrLength){
        var arrValue = array[index], othValue = other[index];
        if (customizer) var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
        if (compared !== undefined) {
            if (compared) continue;
            result = false;
            break;
        }
        // Recursively compare arrays (susceptible to call stack limits).
        if (seen) {
            if (!arraySome(other, function(othValue, othIndex) {
                if (!seen.has(othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) return seen.add(othIndex);
            })) {
                result = false;
                break;
            }
        } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
            result = false;
            break;
        }
    }
    stack["delete"](array);
    stack["delete"](other);
    return result;
}
/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */ function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
    switch(tag){
        case dataViewTag:
            if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) return false;
            object = object.buffer;
            other = other.buffer;
        case arrayBufferTag:
            if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) return false;
            return true;
        case boolTag:
        case dateTag:
        case numberTag:
            // Coerce booleans to `1` or `0` and dates to milliseconds.
            // Invalid dates are coerced to `NaN`.
            return eq(+object, +other);
        case errorTag:
            return object.name == other.name && object.message == other.message;
        case regexpTag:
        case stringTag:
            // Coerce regexes to strings and treat strings, primitives and objects,
            // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
            // for more details.
            return object == other + "";
        case mapTag:
            var convert = mapToArray;
        case setTag:
            var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
            convert || (convert = setToArray);
            if (object.size != other.size && !isPartial) return false;
            // Assume cyclic values are equal.
            var stacked = stack.get(object);
            if (stacked) return stacked == other;
            bitmask |= UNORDERED_COMPARE_FLAG;
            // Recursively compare objects (susceptible to call stack limits).
            stack.set(object, other);
            var result = equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);
            stack["delete"](object);
            return result;
        case symbolTag:
            if (symbolValueOf) return symbolValueOf.call(object) == symbolValueOf.call(other);
    }
    return false;
}
/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */ function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
    var isPartial = bitmask & PARTIAL_COMPARE_FLAG, objProps = keys(object), objLength = objProps.length, othProps = keys(other), othLength = othProps.length;
    if (objLength != othLength && !isPartial) return false;
    var index = objLength;
    while(index--){
        var key = objProps[index];
        if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) return false;
    }
    // Assume cyclic values are equal.
    var stacked = stack.get(object);
    if (stacked && stack.get(other)) return stacked == other;
    var result = true;
    stack.set(object, other);
    stack.set(other, object);
    var skipCtor = isPartial;
    while(++index < objLength){
        key = objProps[index];
        var objValue = object[key], othValue = other[key];
        if (customizer) var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
        // Recursively compare objects (susceptible to call stack limits).
        if (!(compared === undefined ? objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack) : compared)) {
            result = false;
            break;
        }
        skipCtor || (skipCtor = key == "constructor");
    }
    if (result && !skipCtor) {
        var objCtor = object.constructor, othCtor = other.constructor;
        // Non `Object` object instances with different constructors are not equal.
        if (objCtor != othCtor && "constructor" in object && "constructor" in other && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) result = false;
    }
    stack["delete"](object);
    stack["delete"](other);
    return result;
}
/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */ function getMapData(map, key) {
    var data = map.__data__;
    return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */ function getMatchData(object) {
    var result = keys(object), length = result.length;
    while(length--){
        var key = result[length], value = object[key];
        result[length] = [
            key,
            value,
            isStrictComparable(value)
        ];
    }
    return result;
}
/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */ function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : undefined;
}
/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */ var getTag = baseGetTag;
// Fallback for data views, maps, sets, and weak maps in IE 11,
// for data views in Edge < 14, and promises in Node.js.
if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map && getTag(new Map) != mapTag || Promise && getTag(Promise.resolve()) != promiseTag || Set && getTag(new Set) != setTag || WeakMap && getTag(new WeakMap) != weakMapTag) getTag = function(value) {
    var result = objectToString.call(value), Ctor = result == objectTag ? value.constructor : undefined, ctorString = Ctor ? toSource(Ctor) : undefined;
    if (ctorString) switch(ctorString){
        case dataViewCtorString:
            return dataViewTag;
        case mapCtorString:
            return mapTag;
        case promiseCtorString:
            return promiseTag;
        case setCtorString:
            return setTag;
        case weakMapCtorString:
            return weakMapTag;
    }
    return result;
};
/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */ function hasPath(object, path, hasFunc) {
    path = isKey(path, object) ? [
        path
    ] : castPath(path);
    var result, index = -1, length = path.length;
    while(++index < length){
        var key = toKey(path[index]);
        if (!(result = object != null && hasFunc(object, key))) break;
        object = object[key];
    }
    if (result) return result;
    var length = object ? object.length : 0;
    return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
}
/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */ function isIndex(value, length) {
    length = length == null ? MAX_SAFE_INTEGER : length;
    return !!length && (typeof value == "number" || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}
/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */ function isKey(value, object) {
    if (isArray(value)) return false;
    var type = typeof value;
    if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) return true;
    return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}
/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */ function isKeyable(value) {
    var type = typeof value;
    return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */ function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
}
/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */ function isPrototype(value) {
    var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
    return value === proto;
}
/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */ function isStrictComparable(value) {
    return value === value && !isObject(value);
}
/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */ function matchesStrictComparable(key, srcValue) {
    return function(object) {
        if (object == null) return false;
        return object[key] === srcValue && (srcValue !== undefined || key in Object(object));
    };
}
/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */ var stringToPath = memoize(function(string) {
    string = toString(string);
    var result = [];
    if (reLeadingDot.test(string)) result.push("");
    string.replace(rePropName, function(match, number, quote, string) {
        result.push(quote ? string.replace(reEscapeChar, "$1") : number || match);
    });
    return result;
});
/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */ function toKey(value) {
    if (typeof value == "string" || isSymbol(value)) return value;
    var result = value + "";
    return result == "0" && 1 / value == -INFINITY ? "-0" : result;
}
/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */ function toSource(func) {
    if (func != null) {
        try {
            return funcToString.call(func);
        } catch (e) {}
        try {
            return func + "";
        } catch (e) {}
    }
    return "";
}
/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */ function memoize(func, resolver) {
    if (typeof func != "function" || resolver && typeof resolver != "function") throw new TypeError(FUNC_ERROR_TEXT);
    var memoized = function() {
        var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
        if (cache.has(key)) return cache.get(key);
        var result = func.apply(this, args);
        memoized.cache = cache.set(key, result);
        return result;
    };
    memoized.cache = new (memoize.Cache || MapCache);
    return memoized;
}
// Assign cache to `_.memoize`.
memoize.Cache = MapCache;
/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */ function eq(value, other) {
    return value === other || value !== value && other !== other;
}
/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */ function isArguments(value) {
    // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
    return isArrayLikeObject(value) && hasOwnProperty.call(value, "callee") && (!propertyIsEnumerable.call(value, "callee") || objectToString.call(value) == argsTag);
}
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */ var isArray = Array.isArray;
/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */ function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction(value);
}
/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */ function isArrayLikeObject(value) {
    return isObjectLike(value) && isArrayLike(value);
}
/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */ function isFunction(value) {
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 8-9 which returns 'object' for typed array and other constructors.
    var tag = isObject(value) ? objectToString.call(value) : "";
    return tag == funcTag || tag == genTag;
}
/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */ function isLength(value) {
    return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */ function isObject(value) {
    var type = typeof value;
    return !!value && (type == "object" || type == "function");
}
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */ function isObjectLike(value) {
    return !!value && typeof value == "object";
}
/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */ function isSymbol(value) {
    return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
}
/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */ var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */ function toString(value) {
    return value == null ? "" : baseToString(value);
}
/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */ function get(object, path, defaultValue) {
    var result = object == null ? undefined : baseGet(object, path);
    return result === undefined ? defaultValue : result;
}
/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */ function hasIn(object, path) {
    return object != null && hasPath(object, path, baseHasIn);
}
/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */ function keys(object) {
    return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}
/**
 * An alternative to `_.reduce`; this method transforms `object` to a new
 * `accumulator` object which is the result of running each of its own
 * enumerable string keyed properties thru `iteratee`, with each invocation
 * potentially mutating the `accumulator` object. If `accumulator` is not
 * provided, a new object with the same `[[Prototype]]` will be used. The
 * iteratee is invoked with four arguments: (accumulator, value, key, object).
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @static
 * @memberOf _
 * @since 1.3.0
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @param {*} [accumulator] The custom accumulator value.
 * @returns {*} Returns the accumulated value.
 * @example
 *
 * _.transform([2, 3, 4], function(result, n) {
 *   result.push(n *= n);
 *   return n % 2 == 0;
 * }, []);
 * // => [4, 9]
 *
 * _.transform({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
 *   (result[value] || (result[value] = [])).push(key);
 * }, {});
 * // => { '1': ['a', 'c'], '2': ['b'] }
 */ function transform(object, iteratee, accumulator) {
    var isArr = isArray(object) || isTypedArray(object);
    iteratee = baseIteratee(iteratee, 4);
    if (accumulator == null) {
        if (isArr || isObject(object)) {
            var Ctor = object.constructor;
            if (isArr) accumulator = isArray(object) ? new Ctor : [];
            else accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
        } else accumulator = {};
    }
    (isArr ? arrayEach : baseForOwn)(object, function(value, index, object) {
        return iteratee(accumulator, value, index, object);
    });
    return accumulator;
}
/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */ function identity(value) {
    return value;
}
/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */ function property(path) {
    return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
}
module.exports = transform;

});

parcelRegister("43Iq0", function(module, exports) {
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */ /** Used as the size to enable large array optimizations. */ var $2f49e5d1107b818d$var$LARGE_ARRAY_SIZE = 200;
/** Used to stand-in for `undefined` hash values. */ var $2f49e5d1107b818d$var$HASH_UNDEFINED = "__lodash_hash_undefined__";
/** Used as references for various `Number` constants. */ var $2f49e5d1107b818d$var$INFINITY = 1 / 0;
/** `Object#toString` result references. */ var $2f49e5d1107b818d$var$funcTag = "[object Function]", $2f49e5d1107b818d$var$genTag = "[object GeneratorFunction]";
/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */ var $2f49e5d1107b818d$var$reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
/** Used to detect host constructors (Safari). */ var $2f49e5d1107b818d$var$reIsHostCtor = /^\[object .+?Constructor\]$/;
/** Detect free variable `global` from Node.js. */ var $2f49e5d1107b818d$var$freeGlobal = typeof $parcel$global == "object" && $parcel$global && $parcel$global.Object === Object && $parcel$global;
/** Detect free variable `self`. */ var $2f49e5d1107b818d$var$freeSelf = typeof self == "object" && self && self.Object === Object && self;
/** Used as a reference to the global object. */ var $2f49e5d1107b818d$var$root = $2f49e5d1107b818d$var$freeGlobal || $2f49e5d1107b818d$var$freeSelf || Function("return this")();
/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */ function $2f49e5d1107b818d$var$arrayIncludes(array, value) {
    var length = array ? array.length : 0;
    return !!length && $2f49e5d1107b818d$var$baseIndexOf(array, value, 0) > -1;
}
/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */ function $2f49e5d1107b818d$var$arrayIncludesWith(array, value, comparator) {
    var index = -1, length = array ? array.length : 0;
    while(++index < length){
        if (comparator(value, array[index])) return true;
    }
    return false;
}
/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */ function $2f49e5d1107b818d$var$baseFindIndex(array, predicate, fromIndex, fromRight) {
    var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
    while(fromRight ? index-- : ++index < length){
        if (predicate(array[index], index, array)) return index;
    }
    return -1;
}
/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */ function $2f49e5d1107b818d$var$baseIndexOf(array, value, fromIndex) {
    if (value !== value) return $2f49e5d1107b818d$var$baseFindIndex(array, $2f49e5d1107b818d$var$baseIsNaN, fromIndex);
    var index = fromIndex - 1, length = array.length;
    while(++index < length){
        if (array[index] === value) return index;
    }
    return -1;
}
/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */ function $2f49e5d1107b818d$var$baseIsNaN(value) {
    return value !== value;
}
/**
 * Checks if a cache value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */ function $2f49e5d1107b818d$var$cacheHas(cache, key) {
    return cache.has(key);
}
/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */ function $2f49e5d1107b818d$var$getValue(object, key) {
    return object == null ? undefined : object[key];
}
/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */ function $2f49e5d1107b818d$var$isHostObject(value) {
    // Many host objects are `Object` objects that can coerce to strings
    // despite having improperly defined `toString` methods.
    var result = false;
    if (value != null && typeof value.toString != "function") try {
        result = !!(value + "");
    } catch (e) {}
    return result;
}
/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */ function $2f49e5d1107b818d$var$setToArray(set) {
    var index = -1, result = Array(set.size);
    set.forEach(function(value) {
        result[++index] = value;
    });
    return result;
}
/** Used for built-in method references. */ var $2f49e5d1107b818d$var$arrayProto = Array.prototype, $2f49e5d1107b818d$var$funcProto = Function.prototype, $2f49e5d1107b818d$var$objectProto = Object.prototype;
/** Used to detect overreaching core-js shims. */ var $2f49e5d1107b818d$var$coreJsData = $2f49e5d1107b818d$var$root["__core-js_shared__"];
/** Used to detect methods masquerading as native. */ var $2f49e5d1107b818d$var$maskSrcKey = function() {
    var uid = /[^.]+$/.exec($2f49e5d1107b818d$var$coreJsData && $2f49e5d1107b818d$var$coreJsData.keys && $2f49e5d1107b818d$var$coreJsData.keys.IE_PROTO || "");
    return uid ? "Symbol(src)_1." + uid : "";
}();
/** Used to resolve the decompiled source of functions. */ var $2f49e5d1107b818d$var$funcToString = $2f49e5d1107b818d$var$funcProto.toString;
/** Used to check objects for own properties. */ var $2f49e5d1107b818d$var$hasOwnProperty = $2f49e5d1107b818d$var$objectProto.hasOwnProperty;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */ var $2f49e5d1107b818d$var$objectToString = $2f49e5d1107b818d$var$objectProto.toString;
/** Used to detect if a method is native. */ var $2f49e5d1107b818d$var$reIsNative = RegExp("^" + $2f49e5d1107b818d$var$funcToString.call($2f49e5d1107b818d$var$hasOwnProperty).replace($2f49e5d1107b818d$var$reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
/** Built-in value references. */ var $2f49e5d1107b818d$var$splice = $2f49e5d1107b818d$var$arrayProto.splice;
/* Built-in method references that are verified to be native. */ var $2f49e5d1107b818d$var$Map = $2f49e5d1107b818d$var$getNative($2f49e5d1107b818d$var$root, "Map"), $2f49e5d1107b818d$var$Set = $2f49e5d1107b818d$var$getNative($2f49e5d1107b818d$var$root, "Set"), $2f49e5d1107b818d$var$nativeCreate = $2f49e5d1107b818d$var$getNative(Object, "create");
/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */ function $2f49e5d1107b818d$var$Hash(entries) {
    var index = -1, length = entries ? entries.length : 0;
    this.clear();
    while(++index < length){
        var entry = entries[index];
        this.set(entry[0], entry[1]);
    }
}
/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */ function $2f49e5d1107b818d$var$hashClear() {
    this.__data__ = $2f49e5d1107b818d$var$nativeCreate ? $2f49e5d1107b818d$var$nativeCreate(null) : {};
}
/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */ function $2f49e5d1107b818d$var$hashDelete(key) {
    return this.has(key) && delete this.__data__[key];
}
/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */ function $2f49e5d1107b818d$var$hashGet(key) {
    var data = this.__data__;
    if ($2f49e5d1107b818d$var$nativeCreate) {
        var result = data[key];
        return result === $2f49e5d1107b818d$var$HASH_UNDEFINED ? undefined : result;
    }
    return $2f49e5d1107b818d$var$hasOwnProperty.call(data, key) ? data[key] : undefined;
}
/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */ function $2f49e5d1107b818d$var$hashHas(key) {
    var data = this.__data__;
    return $2f49e5d1107b818d$var$nativeCreate ? data[key] !== undefined : $2f49e5d1107b818d$var$hasOwnProperty.call(data, key);
}
/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */ function $2f49e5d1107b818d$var$hashSet(key, value) {
    var data = this.__data__;
    data[key] = $2f49e5d1107b818d$var$nativeCreate && value === undefined ? $2f49e5d1107b818d$var$HASH_UNDEFINED : value;
    return this;
}
// Add methods to `Hash`.
$2f49e5d1107b818d$var$Hash.prototype.clear = $2f49e5d1107b818d$var$hashClear;
$2f49e5d1107b818d$var$Hash.prototype["delete"] = $2f49e5d1107b818d$var$hashDelete;
$2f49e5d1107b818d$var$Hash.prototype.get = $2f49e5d1107b818d$var$hashGet;
$2f49e5d1107b818d$var$Hash.prototype.has = $2f49e5d1107b818d$var$hashHas;
$2f49e5d1107b818d$var$Hash.prototype.set = $2f49e5d1107b818d$var$hashSet;
/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */ function $2f49e5d1107b818d$var$ListCache(entries) {
    var index = -1, length = entries ? entries.length : 0;
    this.clear();
    while(++index < length){
        var entry = entries[index];
        this.set(entry[0], entry[1]);
    }
}
/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */ function $2f49e5d1107b818d$var$listCacheClear() {
    this.__data__ = [];
}
/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */ function $2f49e5d1107b818d$var$listCacheDelete(key) {
    var data = this.__data__, index = $2f49e5d1107b818d$var$assocIndexOf(data, key);
    if (index < 0) return false;
    var lastIndex = data.length - 1;
    if (index == lastIndex) data.pop();
    else $2f49e5d1107b818d$var$splice.call(data, index, 1);
    return true;
}
/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */ function $2f49e5d1107b818d$var$listCacheGet(key) {
    var data = this.__data__, index = $2f49e5d1107b818d$var$assocIndexOf(data, key);
    return index < 0 ? undefined : data[index][1];
}
/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */ function $2f49e5d1107b818d$var$listCacheHas(key) {
    return $2f49e5d1107b818d$var$assocIndexOf(this.__data__, key) > -1;
}
/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */ function $2f49e5d1107b818d$var$listCacheSet(key, value) {
    var data = this.__data__, index = $2f49e5d1107b818d$var$assocIndexOf(data, key);
    if (index < 0) data.push([
        key,
        value
    ]);
    else data[index][1] = value;
    return this;
}
// Add methods to `ListCache`.
$2f49e5d1107b818d$var$ListCache.prototype.clear = $2f49e5d1107b818d$var$listCacheClear;
$2f49e5d1107b818d$var$ListCache.prototype["delete"] = $2f49e5d1107b818d$var$listCacheDelete;
$2f49e5d1107b818d$var$ListCache.prototype.get = $2f49e5d1107b818d$var$listCacheGet;
$2f49e5d1107b818d$var$ListCache.prototype.has = $2f49e5d1107b818d$var$listCacheHas;
$2f49e5d1107b818d$var$ListCache.prototype.set = $2f49e5d1107b818d$var$listCacheSet;
/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */ function $2f49e5d1107b818d$var$MapCache(entries) {
    var index = -1, length = entries ? entries.length : 0;
    this.clear();
    while(++index < length){
        var entry = entries[index];
        this.set(entry[0], entry[1]);
    }
}
/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */ function $2f49e5d1107b818d$var$mapCacheClear() {
    this.__data__ = {
        "hash": new $2f49e5d1107b818d$var$Hash,
        "map": new ($2f49e5d1107b818d$var$Map || $2f49e5d1107b818d$var$ListCache),
        "string": new $2f49e5d1107b818d$var$Hash
    };
}
/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */ function $2f49e5d1107b818d$var$mapCacheDelete(key) {
    return $2f49e5d1107b818d$var$getMapData(this, key)["delete"](key);
}
/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */ function $2f49e5d1107b818d$var$mapCacheGet(key) {
    return $2f49e5d1107b818d$var$getMapData(this, key).get(key);
}
/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */ function $2f49e5d1107b818d$var$mapCacheHas(key) {
    return $2f49e5d1107b818d$var$getMapData(this, key).has(key);
}
/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */ function $2f49e5d1107b818d$var$mapCacheSet(key, value) {
    $2f49e5d1107b818d$var$getMapData(this, key).set(key, value);
    return this;
}
// Add methods to `MapCache`.
$2f49e5d1107b818d$var$MapCache.prototype.clear = $2f49e5d1107b818d$var$mapCacheClear;
$2f49e5d1107b818d$var$MapCache.prototype["delete"] = $2f49e5d1107b818d$var$mapCacheDelete;
$2f49e5d1107b818d$var$MapCache.prototype.get = $2f49e5d1107b818d$var$mapCacheGet;
$2f49e5d1107b818d$var$MapCache.prototype.has = $2f49e5d1107b818d$var$mapCacheHas;
$2f49e5d1107b818d$var$MapCache.prototype.set = $2f49e5d1107b818d$var$mapCacheSet;
/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */ function $2f49e5d1107b818d$var$SetCache(values) {
    var index = -1, length = values ? values.length : 0;
    this.__data__ = new $2f49e5d1107b818d$var$MapCache;
    while(++index < length)this.add(values[index]);
}
/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */ function $2f49e5d1107b818d$var$setCacheAdd(value) {
    this.__data__.set(value, $2f49e5d1107b818d$var$HASH_UNDEFINED);
    return this;
}
/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */ function $2f49e5d1107b818d$var$setCacheHas(value) {
    return this.__data__.has(value);
}
// Add methods to `SetCache`.
$2f49e5d1107b818d$var$SetCache.prototype.add = $2f49e5d1107b818d$var$SetCache.prototype.push = $2f49e5d1107b818d$var$setCacheAdd;
$2f49e5d1107b818d$var$SetCache.prototype.has = $2f49e5d1107b818d$var$setCacheHas;
/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */ function $2f49e5d1107b818d$var$assocIndexOf(array, key) {
    var length = array.length;
    while(length--){
        if ($2f49e5d1107b818d$var$eq(array[length][0], key)) return length;
    }
    return -1;
}
/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */ function $2f49e5d1107b818d$var$baseIsNative(value) {
    if (!$2f49e5d1107b818d$var$isObject(value) || $2f49e5d1107b818d$var$isMasked(value)) return false;
    var pattern = $2f49e5d1107b818d$var$isFunction(value) || $2f49e5d1107b818d$var$isHostObject(value) ? $2f49e5d1107b818d$var$reIsNative : $2f49e5d1107b818d$var$reIsHostCtor;
    return pattern.test($2f49e5d1107b818d$var$toSource(value));
}
/**
 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 */ function $2f49e5d1107b818d$var$baseUniq(array, iteratee, comparator) {
    var index = -1, includes = $2f49e5d1107b818d$var$arrayIncludes, length = array.length, isCommon = true, result = [], seen = result;
    if (comparator) {
        isCommon = false;
        includes = $2f49e5d1107b818d$var$arrayIncludesWith;
    } else if (length >= $2f49e5d1107b818d$var$LARGE_ARRAY_SIZE) {
        var set = iteratee ? null : $2f49e5d1107b818d$var$createSet(array);
        if (set) return $2f49e5d1107b818d$var$setToArray(set);
        isCommon = false;
        includes = $2f49e5d1107b818d$var$cacheHas;
        seen = new $2f49e5d1107b818d$var$SetCache;
    } else seen = iteratee ? [] : result;
    outer: while(++index < length){
        var value = array[index], computed = iteratee ? iteratee(value) : value;
        value = comparator || value !== 0 ? value : 0;
        if (isCommon && computed === computed) {
            var seenIndex = seen.length;
            while(seenIndex--){
                if (seen[seenIndex] === computed) continue outer;
            }
            if (iteratee) seen.push(computed);
            result.push(value);
        } else if (!includes(seen, computed, comparator)) {
            if (seen !== result) seen.push(computed);
            result.push(value);
        }
    }
    return result;
}
/**
 * Creates a set object of `values`.
 *
 * @private
 * @param {Array} values The values to add to the set.
 * @returns {Object} Returns the new set.
 */ var $2f49e5d1107b818d$var$createSet = !($2f49e5d1107b818d$var$Set && 1 / $2f49e5d1107b818d$var$setToArray(new $2f49e5d1107b818d$var$Set([
    ,
    -0
]))[1] == $2f49e5d1107b818d$var$INFINITY) ? $2f49e5d1107b818d$var$noop : function(values) {
    return new $2f49e5d1107b818d$var$Set(values);
};
/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */ function $2f49e5d1107b818d$var$getMapData(map, key) {
    var data = map.__data__;
    return $2f49e5d1107b818d$var$isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */ function $2f49e5d1107b818d$var$getNative(object, key) {
    var value = $2f49e5d1107b818d$var$getValue(object, key);
    return $2f49e5d1107b818d$var$baseIsNative(value) ? value : undefined;
}
/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */ function $2f49e5d1107b818d$var$isKeyable(value) {
    var type = typeof value;
    return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */ function $2f49e5d1107b818d$var$isMasked(func) {
    return !!$2f49e5d1107b818d$var$maskSrcKey && $2f49e5d1107b818d$var$maskSrcKey in func;
}
/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */ function $2f49e5d1107b818d$var$toSource(func) {
    if (func != null) {
        try {
            return $2f49e5d1107b818d$var$funcToString.call(func);
        } catch (e) {}
        try {
            return func + "";
        } catch (e) {}
    }
    return "";
}
/**
 * Creates a duplicate-free version of an array, using
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons, in which only the first occurrence of each
 * element is kept.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @returns {Array} Returns the new duplicate free array.
 * @example
 *
 * _.uniq([2, 1, 2]);
 * // => [2, 1]
 */ function $2f49e5d1107b818d$var$uniq(array) {
    return array && array.length ? $2f49e5d1107b818d$var$baseUniq(array) : [];
}
/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */ function $2f49e5d1107b818d$var$eq(value, other) {
    return value === other || value !== value && other !== other;
}
/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */ function $2f49e5d1107b818d$var$isFunction(value) {
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 8-9 which returns 'object' for typed array and other constructors.
    var tag = $2f49e5d1107b818d$var$isObject(value) ? $2f49e5d1107b818d$var$objectToString.call(value) : "";
    return tag == $2f49e5d1107b818d$var$funcTag || tag == $2f49e5d1107b818d$var$genTag;
}
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */ function $2f49e5d1107b818d$var$isObject(value) {
    var type = typeof value;
    return !!value && (type == "object" || type == "function");
}
/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */ function $2f49e5d1107b818d$var$noop() {
// No operation performed.
}
module.exports = $2f49e5d1107b818d$var$uniq;

});


parcelRegister("4BXR3", function(module, exports) {

$parcel$export(module.exports, "PanelDimension", () => $63409fe7911523b7$export$f9d0edab25b29b18);

var $lAN3N = parcelRequire("lAN3N");

var $63SH6 = parcelRequire("63SH6");

var $4WfNn = parcelRequire("4WfNn");

var $0t7p0 = parcelRequire("0t7p0");

var $emJmR = parcelRequire("emJmR");

var $bjM6F = parcelRequire("bjM6F");

var $6ai3B = parcelRequire("6ai3B");

var $3M49X = parcelRequire("3M49X");
const $63409fe7911523b7$export$f9d0edab25b29b18 = ({ value: value, update: update, mode: mode, id: id })=>{
    const local = (0, $4WfNn.useLocal)({
        menuWidth: null,
        menuHeight: null,
        toggle: true,
        activeWidth: 0,
        activeHeight: 0,
        dim: (0, $bjM6F.responsiveVal)(value, "dim", mode, {
            w: "fit",
            h: "fit",
            wUnit: "px",
            hUnit: "px"
        })
    });
    (0, $63SH6.useEffect)(()=>{
        local.dim = (0, $bjM6F.responsiveVal)(value, "dim", mode, {
            w: "fit",
            h: "fit",
            wUnit: "px",
            hUnit: "px"
        });
        local.render();
    }, [
        value
    ]);
    const dim = local.dim;
    const calculateAspectRatioFit = (props)=>{
        const { srcWidth: srcWidth, srcHeight: srcHeight, maxWidth: maxWidth, maxHeight: maxHeight } = props;
        var height = maxHeight;
        var width = maxWidth;
        if (typeof maxWidth === "number" && typeof maxHeight === "number" && typeof srcWidth === "number" && typeof srcHeight === "number") {
            height = srcHeight === maxHeight ? maxWidth * srcHeight / srcWidth : maxHeight;
            width = srcWidth === maxWidth ? maxHeight * (srcWidth / srcHeight) : maxWidth;
            width = Number(width.toFixed(2));
            height = Number(height.toFixed(2));
        }
        return {
            width: width,
            height: height
        };
    };
    return /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
        className: cx("flex items-stretch justify-between text-xs ", css`
          .field-num {
            width: 66px !important;
            border: 1px solid #d1d1d1;
          }
        `),
        children: [
            /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                className: cx("flex", css`
            .border {
              width: 70px !important;
            }
            input {
              width: 100%;
            }
            .field-num {
              width: 50px !important;
            }
          `),
                children: [
                    /*#__PURE__*/ (0, $lAN3N.jsx)((0, $emJmR.Tooltip), {
                        content: "Width",
                        children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $3M49X.FieldNumUnit), {
                            positiveOnly: true,
                            hideUnit: true,
                            icon: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                className: "text-[10px] w-[15px] pr-[2px] mr-[3px] h-[14px] flex items-center justify-center border-r",
                                children: "W"
                            }),
                            enableWhenDrag: true,
                            disabled: dim.w === "fit" || dim.w === "full" ? dim.w : false,
                            value: dim.w + (dim.wUnit || "px"),
                            unit: dim.wUnit || "px",
                            update: (val, setVal)=>{
                                let _val = val;
                                if (typeof dim.w !== "number" && setVal) {
                                    const nval = local.activeWidth || 0;
                                    _val = nval + "";
                                    setVal(nval);
                                }
                                local.dim.w = parseInt(_val);
                                update("dim", {
                                    ...dim,
                                    w: local.dim.w,
                                    h: local.dim.h
                                });
                                local.render();
                            }
                        })
                    }),
                    local.menuWidth && /*#__PURE__*/ (0, $lAN3N.jsxs)((0, $0t7p0.Menu), {
                        mouseEvent: local.menuWidth,
                        onClose: ()=>{
                            local.menuWidth = null;
                            local.render();
                        },
                        children: [
                            /*#__PURE__*/ (0, $lAN3N.jsx)((0, $0t7p0.MenuItem), {
                                label: "Fit",
                                onClick: ()=>{
                                    local.dim.w = "fit";
                                    update("dim", {
                                        ...dim,
                                        w: local.dim.w,
                                        h: local.dim.h
                                    });
                                }
                            }),
                            /*#__PURE__*/ (0, $lAN3N.jsx)((0, $0t7p0.MenuItem), {
                                label: "Full",
                                onClick: ()=>{
                                    local.dim.w = "full";
                                    update("dim", {
                                        ...dim,
                                        w: local.dim.w,
                                        h: local.dim.h
                                    });
                                }
                            }),
                            /*#__PURE__*/ (0, $lAN3N.jsx)((0, $0t7p0.MenuItem), {
                                label: "Pixel",
                                onClick: ()=>{
                                    local.dim.w = local.activeWidth || 0;
                                    local.dim.wUnit = "px";
                                    update("dim", {
                                        ...dim,
                                        w: local.dim.w,
                                        h: local.dim.h
                                    });
                                }
                            }),
                            /*#__PURE__*/ (0, $lAN3N.jsx)((0, $0t7p0.MenuItem), {
                                label: "Percent",
                                onClick: ()=>{
                                    local.dim.w = local.activeWidth || 0;
                                    local.dim.wUnit = "%";
                                    update("dim", {
                                        ...dim,
                                        w: local.dim.w,
                                        h: local.dim.h
                                    });
                                }
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0, $lAN3N.jsxs)((0, $6ai3B.Button), {
                        className: cx("flex-1", css`
              width: 24px;
              max-width: 25px;
              border-left: 0px !important;
              padding: 0px !important;
              min-width: 0px !important;
            `),
                        onClick: (e)=>{
                            local.menuWidth = e;
                            local.render();
                        },
                        children: [
                            dim.w === "full" && /*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                width: "16",
                                height: "16",
                                viewBox: "0 0 16 16",
                                children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                                    fillRule: "evenodd",
                                    d: "M3.5 7.5v-2h-1v5h1v-2h9v2h1v-5h-1v2h-9z",
                                    fill: "#000"
                                })
                            }),
                            dim.w === "fit" && /*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
                                xmlns: "http://www.w3.org/2000/svg",
                                width: "16",
                                height: "16",
                                viewBox: "0 0 16 16",
                                children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                                    d: "M3.354 4.646l-.708.708L5.293 8l-2.646 2.646.707.708L6.707 8 3.354 4.646zm10 .708L10.707 8l2.647 2.646-.708.708L9.293 8l3.354-3.354.707.708z",
                                    fill: "#000"
                                })
                            }),
                            dim.w !== "fit" && dim.w !== "full" && /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                className: "w-[16px] h-[16px] flex items-center justify-center",
                                children: dim.wUnit || "px"
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                className: cx("flex", css`
            .border {
              width: 70px !important;
            }
            input {
              width: 100%;
            }
            .field-num {
              width: 50px !important;
            }
          `),
                children: [
                    /*#__PURE__*/ (0, $lAN3N.jsx)((0, $emJmR.Tooltip), {
                        content: "Height",
                        children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $3M49X.FieldNumUnit), {
                            positiveOnly: true,
                            hideUnit: true,
                            icon: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                className: "text-[10px] w-[15px] pr-[2px] mr-[3px] h-[14px] flex items-center justify-center border-r",
                                children: "H"
                            }),
                            disabled: dim.h === "fit" || dim.h === "full" ? dim.h : false,
                            enableWhenDrag: true,
                            value: dim.h + (dim.hUnit || "px"),
                            unit: dim.hUnit || "px",
                            update: (val, setVal)=>{
                                let _val = val;
                                if (typeof dim.h !== "number" && setVal) {
                                    const nval = local.activeHeight || 0;
                                    _val = nval + "";
                                    setVal(nval);
                                }
                                local.dim.h = parseInt(_val);
                                update("dim", {
                                    ...dim,
                                    w: local.dim.w,
                                    h: local.dim.h
                                });
                                local.render();
                            }
                        })
                    }),
                    local.menuHeight && /*#__PURE__*/ (0, $lAN3N.jsxs)((0, $0t7p0.Menu), {
                        mouseEvent: local.menuHeight,
                        onClose: ()=>{
                            local.menuHeight = null;
                            local.render();
                        },
                        children: [
                            /*#__PURE__*/ (0, $lAN3N.jsx)((0, $0t7p0.MenuItem), {
                                label: "Fit",
                                onClick: ()=>{
                                    local.dim.h = "fit";
                                    update("dim", {
                                        ...dim,
                                        w: local.dim.w,
                                        h: local.dim.h
                                    });
                                }
                            }),
                            /*#__PURE__*/ (0, $lAN3N.jsx)((0, $0t7p0.MenuItem), {
                                label: "Full",
                                onClick: ()=>{
                                    local.dim.h = "full";
                                    update("dim", {
                                        ...dim,
                                        w: local.dim.w,
                                        h: local.dim.h
                                    });
                                }
                            }),
                            /*#__PURE__*/ (0, $lAN3N.jsx)((0, $0t7p0.MenuItem), {
                                label: "Pixel",
                                onClick: ()=>{
                                    local.dim.h = local.activeHeight || 0;
                                    local.dim.hUnit = "px";
                                    update("dim", {
                                        ...dim,
                                        w: local.dim.w,
                                        h: local.dim.h
                                    });
                                }
                            }),
                            /*#__PURE__*/ (0, $lAN3N.jsx)((0, $0t7p0.MenuItem), {
                                label: "Percent",
                                onClick: ()=>{
                                    local.dim.h = local.activeHeight || 0;
                                    local.dim.hUnit = "%";
                                    update("dim", {
                                        ...dim,
                                        w: local.dim.w,
                                        h: local.dim.h
                                    });
                                }
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0, $lAN3N.jsxs)((0, $6ai3B.Button), {
                        className: cx("flex-1", css`
              width: 24px;
              max-width: 25px;
              border-left: 0px !important;
              padding: 0px !important;
              min-width: 0px !important;
            `),
                        onClick: (e)=>{
                            local.menuHeight = e;
                            local.render();
                        // let val = dim.h;
                        // if (dim.h === "fit") val = "full";
                        // else if (dim.h === "full") val = activeEl?.offsetHeight || 0;
                        // else val = "fit";
                        // update("dim", {
                        //   ...dim,
                        //   h: val,
                        // });
                        },
                        children: [
                            dim.h === "full" && /*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
                                className: "w-[16px] h-[16px]",
                                xmlns: "http://www.h3.org/2000/svg",
                                width: "16",
                                height: "16",
                                viewBox: "0 0 16 16",
                                children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                                    fillRule: "evenodd",
                                    d: "M8.5 3.5h2v-1h-5v1h2v9h-2v1h5v-1h-2v-9z",
                                    fill: "#000"
                                })
                            }),
                            dim.h === "fit" && /*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
                                xmlns: "http://www.h3.org/2000/svg",
                                width: "16",
                                height: "16",
                                viewBox: "0 0 16 16",
                                children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                                    d: "M4.646 12.646l.708.708L8 10.707l2.646 2.646.708-.707L8 9.293l-3.354 3.354zm.708-10L8 5.294l2.646-2.647.708.708L8 6.707 4.646 3.354l.708-.707z",
                                    fill: "#000"
                                })
                            }),
                            dim.h !== "fit" && dim.h !== "full" && /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                className: "w-[16px] h-[16px] flex items-center justify-center",
                                children: dim.hUnit || "px"
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                className: "flex",
                children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $emJmR.Tooltip), {
                    content: local.toggle ? "Full" : "Fit",
                    children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $6ai3B.Button), {
                        className: cx("flex-1", css`
                width: 30px;
                max-width: 30px;
                min-width: 0px !important;
                padding: 0px !important;
                min-width: 0px !important;
              `),
                        onClick: (e)=>{
                            update("dim", {
                                ...dim,
                                w: !local.toggle ? "fit" : "full",
                                h: !local.toggle ? "fit" : "full"
                            });
                            local.toggle = !local.toggle;
                            local.render();
                        },
                        children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                            className: "w-[10px] h-[16px] flex items-center justify-center",
                            children: local.toggle ? /*#__PURE__*/ (0, $lAN3N.jsx)((0, $lAN3N.Fragment), {
                                children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                    className: "text-lg text-gray-700",
                                    children: /*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
                                        width: "15",
                                        height: "15",
                                        viewBox: "0 0 512 512",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                                            fill: "currentColor",
                                            d: "M208 48V16H16v192h32V70.627l160.687 160.686l22.626-22.626L70.627 48H208zm256 256v137.373L299.313 276.687l-22.626 22.626L441.373 464H304v32h192V304h-32z"
                                        })
                                    })
                                })
                            }) : /*#__PURE__*/ (0, $lAN3N.jsx)((0, $lAN3N.Fragment), {
                                children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                    className: "text-lg text-gray-700",
                                    children: /*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
                                        width: "15",
                                        height: "15",
                                        viewBox: "0 0 512 512",
                                        xmlns: "http://www.w3.org/2000/svg",
                                        children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                                            fill: "currentColor",
                                            d: "M204 181.372L38.628 16H16v22.628L181.372 204H44v32h192V44h-32v137.372zM326.628 304H464v-32H272v192h32V326.628L473.372 496H496v-22.628L326.628 304z"
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        ]
    });
};

});

parcelRegister("9LESc", function(module, exports) {

$parcel$export(module.exports, "PanelFont", () => $ac66b7df81bcd978$export$f13b6951a671eff9);

var $lAN3N = parcelRequire("lAN3N");

var $4WfNn = parcelRequire("4WfNn");

var $769fS = parcelRequire("769fS");

var $acn6z = parcelRequire("acn6z");

var $3M49X = parcelRequire("3M49X");

var $6ai3B = parcelRequire("6ai3B");

var $7dWeq = parcelRequire("7dWeq");

var $3i93m = parcelRequire("3i93m");

var $eClhP = parcelRequire("eClhP");

var $34isQ = parcelRequire("34isQ");

var $bjM6F = parcelRequire("bjM6F");

var $emJmR = parcelRequire("emJmR");

var $dCav9 = parcelRequire("dCav9");
const $ac66b7df81bcd978$var$EmptyFont = {
    name: "DEFAULT",
    weight: [
        "200",
        "300",
        "400",
        "600",
        "700",
        "900"
    ]
};
const $ac66b7df81bcd978$var$fflist = [
    $ac66b7df81bcd978$var$EmptyFont,
    ...(0, (/*@__PURE__*/$parcel$interopDefault($acn6z)))
];
const $ac66b7df81bcd978$export$f13b6951a671eff9 = ({ value: value, update: update, mode: mode })=>{
    const local = (0, $4WfNn.useLocal)({
        font: $ac66b7df81bcd978$var$EmptyFont
    });
    const font = (0, $bjM6F.responsiveVal)(value, "font", mode, {
        size: 15,
        height: "auto",
        align: "left",
        whitespace: "whitespace-normal",
        wordBreak: "break-normal"
    });
    if (font.height === 0) font.height = "auto";
    if (font.family) {
        const ffont = (0, (/*@__PURE__*/$parcel$interopDefault($acn6z))).find((f)=>f.name === font.family);
        if (ffont) local.font = ffont;
    } else local.font = $ac66b7df81bcd978$var$EmptyFont;
    return /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
        className: "flex flex-col items-stretch space-y-2",
        children: [
            /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                className: cx("flex items-stretch space-x-2 text-xs justify-between"),
                children: [
                    /*#__PURE__*/ (0, $lAN3N.jsx)((0, $emJmR.Tooltip), {
                        content: "Text Color",
                        asChild: true,
                        children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                            className: cx("bg-white p-[2px] border border-gray-300 flex items-stretch", css`
                .color-box {
                  height: 25px !important;
                }
              `),
                            children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $769fS.FieldColor), {
                                popupID: "font-color",
                                value: font.color,
                                update: (color)=>{
                                    update("font", {
                                        ...font,
                                        color: color
                                    });
                                }
                            })
                        })
                    }),
                    /*#__PURE__*/ (0, $lAN3N.jsx)((0, $emJmR.Tooltip), {
                        content: "Font Size",
                        asChild: true,
                        children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                            className: cx("bg-white p-[2px] border border-gray-300 flex items-stretch", css`
                input {
                  width: 20px !important;
                }
                .field-num {
                  width: 55px !important;
                }
              `),
                            children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $3M49X.FieldNumUnit), {
                                positiveOnly: true,
                                hideUnit: true,
                                icon: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                    className: "w-[22px] h-[14px] flex items-center justify-center pr-2 border-r border-gray-300 mr-1",
                                    children: /*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        width: "15",
                                        height: "11",
                                        fill: "none",
                                        viewBox: "0 0 15 11",
                                        children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                                            fill: "#000",
                                            fillRule: "evenodd",
                                            d: "M14.125 5.167c.387 0 .7.28.7.625v3.75c0 .345-.313.624-.7.624a.708.708 0 01-.638-.367 3.04 3.04 0 01-1.462.367c-1.546 0-2.8-1.119-2.8-2.5 0-1.38 1.254-2.5 2.8-2.5a3.04 3.04 0 011.462.368.709.709 0 01.638-.367zm-9.1-5c.513 0 .967.295 1.124.73L9.192 9.35c.118.329-.084.68-.452.787-.369.105-.763-.076-.881-.404L6.89 7.042H3.16l-.968 2.69c-.118.33-.513.51-.88.405C.942 10.03.74 9.678.858 9.35L3.902.898c.157-.436.61-.731 1.123-.731zm7 6.25c-.773 0-1.4.56-1.4 1.25s.627 1.25 1.4 1.25c.774 0 1.4-.56 1.4-1.25s-.627-1.25-1.4-1.25zm-7-4.555l-1.414 3.93h2.83l-1.416-3.93z",
                                            clipRule: "evenodd"
                                        })
                                    })
                                }),
                                value: (font.size === 0 ? 15 : font.size) + "px",
                                update: (size)=>{
                                    update("font", {
                                        ...font,
                                        size: parseInt(size.replaceAll("px", ""))
                                    });
                                }
                            })
                        })
                    }),
                    /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                        className: cx("bg-white p-[2px] border border-gray-300 flex items-stretch", css`
              input {
                width: 24px !important;
              }
              .field-num {
                width: 60px !important;
              }
            `),
                        children: [
                            /*#__PURE__*/ (0, $lAN3N.jsx)((0, $emJmR.Tooltip), {
                                content: "Font Height",
                                asChild: true,
                                children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                    className: "flex-1 flex items-center",
                                    children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $3M49X.FieldNumUnit), {
                                        positiveOnly: true,
                                        icon: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                            className: cx("w-[22px] h-[14px] flex items-center justify-center pr-2 border-r border-gray-300 mr-1"),
                                            children: /*#__PURE__*/ (0, $lAN3N.jsxs)("svg", {
                                                xmlns: "http://www.w3.org/2000/svg",
                                                width: "14",
                                                height: "14",
                                                className: "svg",
                                                viewBox: "0 0 14 14",
                                                children: [
                                                    /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                                                        d: "M14 1H0V0h14v1zm0 13H0v-1h14v1z"
                                                    }),
                                                    /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                                                        fillRule: "evenodd",
                                                        d: "M3.548 11l2.8-8h1.304l2.8 8h-.954l-.7-2H5.202l-.7 2h-.954zM7 3.862L8.448 8H5.552L7 3.862z"
                                                    })
                                                ]
                                            })
                                        }),
                                        hideUnit: true,
                                        disabled: font.height === "auto" ? "Auto" : false,
                                        value: (font.height || 100) + "%",
                                        update: (size)=>{
                                            update("font", {
                                                ...font,
                                                height: parseInt(size.replaceAll("px", ""))
                                            });
                                        }
                                    })
                                })
                            }),
                            /*#__PURE__*/ (0, $lAN3N.jsx)((0, $emJmR.Tooltip), {
                                placement: "top-end",
                                content: "Toggle: Auto font height",
                                children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $6ai3B.Button), {
                                    className: cx("flex-1", css`
                  width: 4px;
                  min-width: 0px !important;
                  margin-left: 5px !important;
                  padding: 0 3px !important;
                  background: ${font.height === "auto" ? "#70a3f4" : "#fff"} !important;
                  border: ${font.height === "auto" ? "2px solid transparent" : "2px solid #708dcb"} !important;
                `),
                                    onClick: ()=>{
                                        if (font.height !== "auto") update("font", {
                                            ...font,
                                            height: "auto"
                                        });
                                        else update("font", {
                                            ...font,
                                            height: 100
                                        });
                                    }
                                })
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0, $lAN3N.jsx)((0, $emJmR.Tooltip), {
                content: /*#__PURE__*/ (0, $lAN3N.jsxs)((0, $lAN3N.Fragment), {
                    children: [
                        "Font Family",
                        /*#__PURE__*/ (0, $lAN3N.jsx)("br", {}),
                        "Changing font family for current element."
                    ]
                }),
                children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $dCav9.Dropdown), {
                    ...(0, $7dWeq.dropdownProp),
                    value: local.font.name || "DEFAULT",
                    items: Object.entries($ac66b7df81bcd978$var$fflist).map((e, idx)=>{
                        return {
                            label: e[1].name,
                            value: e[1].name
                        };
                    }),
                    popover: {
                        ...(0, $7dWeq.dropdownProp).popover,
                        renderItem (item, idx) {
                            if (typeof item === "string") return null;
                            if (!(0, $3i93m.w).loadedFonts) (0, $3i93m.w).loadedFonts = [];
                            if ((0, $3i93m.w).loadedFonts.indexOf(item.value) < 0 && item.value !== "DEFAULT") {
                                (0, $3i93m.w).loadedFonts.push(item.value);
                                const doc = document;
                                let weight = `:wght@${[
                                    300,
                                    400,
                                    500,
                                    600
                                ].join(";")}`;
                                let fontName = item.value.replace(/ /g, "+");
                                const _href = `https://fonts.googleapis.com/css2?family=${fontName}${weight}&display=block`;
                                if (!doc.querySelector(`link[href="${_href}]`)) {
                                    const link = doc.createElement("link");
                                    link.type = "text/css";
                                    link.rel = "stylesheet";
                                    link.href = _href;
                                    doc.head.appendChild(link);
                                }
                            }
                            return /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                className: cx(item.value !== "DEFAULT" && css`
                        font-family: "${item.value}", "Inter";
                      `),
                                children: item.label
                            });
                        }
                    },
                    onChange: (val)=>{
                        if (val) {
                            if (val === $ac66b7df81bcd978$var$EmptyFont.name) update("font", {
                                ...font,
                                family: undefined
                            });
                            else update("font", {
                                ...font,
                                family: val
                            });
                        }
                    }
                })
            }),
            /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                className: cx("flex flex-row justify-between text-xs "),
                children: [
                    /*#__PURE__*/ (0, $lAN3N.jsx)((0, $eClhP.BoxSep), {
                        className: cx("justify-between", css`
              padding: 0px;
              & > button {
                min-width: 0px;
                flex: 1;
                padding: 2px 4px;
              }
            `),
                        children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $34isQ.FieldBtnRadio), {
                            items: {
                                left: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $emJmR.Tooltip), {
                                    content: "Direction: Column",
                                    children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                        className: "text-lg text-gray-700",
                                        children: /*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
                                            xmlns: "http://www.w3.org/2000/svg",
                                            width: "15",
                                            height: "15",
                                            viewBox: "0 0 24 24",
                                            children: /*#__PURE__*/ (0, $lAN3N.jsxs)("g", {
                                                fill: "none",
                                                children: [
                                                    /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                                                        d: "M24 0v24H0V0h24zM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018zm.265-.113l-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022zm-.715.002a.023.023 0 00-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01-.184-.092z"
                                                    }),
                                                    /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                                                        fill: "currentColor",
                                                        d: "M14 18a1 1 0 01.117 1.993L14 20H4a1 1 0 01-.117-1.993L4 18h10zm6-5a1 1 0 110 2H4a1 1 0 110-2h16zm-6-5a1 1 0 01.117 1.993L14 10H4a1 1 0 01-.117-1.993L4 8h10zm6-5a1 1 0 01.117 1.993L20 5H4a1 1 0 01-.117-1.993L4 3h16z"
                                                    })
                                                ]
                                            })
                                        })
                                    })
                                }),
                                center: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $emJmR.Tooltip), {
                                    content: "Direction: Column Reverse",
                                    children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                        className: "text-lg text-gray-700",
                                        children: /*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
                                            width: "15",
                                            height: "15",
                                            viewBox: "0 0 24 24",
                                            xmlns: "http://www.w3.org/2000/svg",
                                            children: /*#__PURE__*/ (0, $lAN3N.jsxs)("g", {
                                                fill: "none",
                                                children: [
                                                    /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                                                        d: "M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"
                                                    }),
                                                    /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                                                        fill: "currentColor",
                                                        d: "M17 18a1 1 0 0 1 .117 1.993L17 20H7a1 1 0 0 1-.117-1.993L7 18h10Zm3-5a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2h16Zm-3-5a1 1 0 0 1 .117 1.993L17 10H7a1 1 0 0 1-.117-1.993L7 8h10Zm3-5a1 1 0 0 1 .117 1.993L20 5H4a1 1 0 0 1-.117-1.993L4 3h16Z"
                                                    })
                                                ]
                                            })
                                        })
                                    })
                                }),
                                right: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $emJmR.Tooltip), {
                                    content: "Direction: Row",
                                    children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                        className: "text-lg text-gray-700",
                                        children: /*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
                                            width: "15",
                                            height: "15",
                                            viewBox: "0 0 24 24",
                                            xmlns: "http://www.w3.org/2000/svg",
                                            children: /*#__PURE__*/ (0, $lAN3N.jsxs)("g", {
                                                fill: "none",
                                                children: [
                                                    /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                                                        d: "M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z"
                                                    }),
                                                    /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                                                        fill: "currentColor",
                                                        d: "M20 18a1 1 0 0 1 .117 1.993L20 20H10a1 1 0 0 1-.117-1.993L10 18h10Zm0-5a1 1 0 1 1 0 2H4a1 1 0 1 1 0-2h16Zm0-5a1 1 0 0 1 .117 1.993L20 10H10a1 1 0 0 1-.117-1.993L10 8h10Zm0-5a1 1 0 0 1 .117 1.993L20 5H4a1 1 0 0 1-.117-1.993L4 3h16Z"
                                                    })
                                                ]
                                            })
                                        })
                                    })
                                })
                            },
                            value: font.align,
                            disabled: false,
                            update: (dir)=>{
                                update("font", {
                                    ...font,
                                    align: dir
                                });
                            }
                        })
                    }),
                    /*#__PURE__*/ (0, $lAN3N.jsx)((0, $eClhP.BoxSep), {
                        className: cx("justify-between", css`
              padding: 0px;
              & > button {
                min-width: 0px;
                flex: 1;
                padding: 2px 4px;
              }
            `),
                        children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $34isQ.FieldBtnRadio), {
                            items: {
                                "whitespace-normal": /*#__PURE__*/ (0, $lAN3N.jsx)((0, $emJmR.Tooltip), {
                                    content: "Whitespace Normal",
                                    children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                        className: "text-lg text-gray-700",
                                        children: /*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
                                            width: "15",
                                            height: "15",
                                            viewBox: "0 0 24 24",
                                            xmlns: "http://www.w3.org/2000/svg",
                                            children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                                                fill: "currentColor",
                                                d: "M4 20V4h2v16H4Zm14 0V4h2v16h-2Zm-7.4-2.45L7.05 14l3.55-3.525l1.4 1.4L10.875 13H13q.825 0 1.413-.588T15 11q0-.825-.588-1.413T13 9H7V7h6q1.65 0 2.825 1.175T17 11q0 1.65-1.175 2.825T13 15h-2.125L12 16.125l-1.4 1.425Z"
                                            })
                                        })
                                    })
                                }),
                                "whitespace-nowrap": /*#__PURE__*/ (0, $lAN3N.jsx)((0, $emJmR.Tooltip), {
                                    content: "Whitespace no wrap",
                                    children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                        className: "text-lg text-gray-700",
                                        children: /*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
                                            width: "15",
                                            height: "15",
                                            viewBox: "0 0 48 48",
                                            xmlns: "http://www.w3.org/2000/svg",
                                            children: /*#__PURE__*/ (0, $lAN3N.jsxs)("g", {
                                                fill: "none",
                                                stroke: "#000",
                                                strokeLinecap: "round",
                                                strokeWidth: "4",
                                                children: [
                                                    /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                                                        d: "M8 10V38"
                                                    }),
                                                    /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                                                        d: "M24 4V16"
                                                    }),
                                                    /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                                                        d: "M16 24H42"
                                                    }),
                                                    /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                                                        strokeLinejoin: "round",
                                                        d: "M37.0561 19.0113L42.0929 24.0255L37.0561 29.123"
                                                    }),
                                                    /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                                                        d: "M24 32V44"
                                                    })
                                                ]
                                            })
                                        })
                                    })
                                })
                            },
                            value: font.whitespace,
                            disabled: false,
                            update: (dir)=>{
                                update("font", {
                                    ...font,
                                    whitespace: dir
                                });
                            }
                        })
                    })
                ]
            })
        ]
    });
};

});
parcelRegister("acn6z", function(module, exports) {
module.exports = JSON.parse('[{"name":"ABeeZee","weight":["400"]},{"name":"Abel","weight":["400"]},{"name":"Abhaya Libre","weight":["400","500","600","700","800"]},{"name":"Abril Fatface","weight":["400"]},{"name":"Aclonica","weight":["400"]},{"name":"Acme","weight":["400"]},{"name":"Actor","weight":["400"]},{"name":"Adamina","weight":["400"]},{"name":"Advent Pro","weight":["100","200","300","400","500","600","700"]},{"name":"Aguafina Script","weight":["400"]},{"name":"Akaya Kanadaka","weight":["400"]},{"name":"Akaya Telivigala","weight":["400"]},{"name":"Akronim","weight":["400"]},{"name":"Aladin","weight":["400"]},{"name":"Alata","weight":["400"]},{"name":"Alatsi","weight":["400"]},{"name":"Aldrich","weight":["400"]},{"name":"Alef","weight":["400","700"]},{"name":"Alegreya","weight":["400","500","600","700","800","900"]},{"name":"Alegreya SC","weight":["400","500","700","800","900"]},{"name":"Alegreya Sans","weight":["100","300","400","500","700","800","900"]},{"name":"Alegreya Sans SC","weight":["100","300","400","500","700","800","900"]},{"name":"Aleo","weight":["300","400","700"]},{"name":"Alex Brush","weight":["400"]},{"name":"Alfa Slab One","weight":["400"]},{"name":"Alice","weight":["400"]},{"name":"Alike","weight":["400"]},{"name":"Alike Angular","weight":["400"]},{"name":"Allan","weight":["400","700"]},{"name":"Allerta","weight":["400"]},{"name":"Allerta Stencil","weight":["400"]},{"name":"Allison","weight":["400"]},{"name":"Allura","weight":["400"]},{"name":"Almarai","weight":["300","400","700","800"]},{"name":"Almendra","weight":["400","700"]},{"name":"Almendra Display","weight":["400"]},{"name":"Almendra SC","weight":["400"]},{"name":"Alumni Sans","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Amarante","weight":["400"]},{"name":"Amaranth","weight":["400","700"]},{"name":"Amatic SC","weight":["400","700"]},{"name":"Amethysta","weight":["400"]},{"name":"Amiko","weight":["400","600","700"]},{"name":"Amiri","weight":["400","700"]},{"name":"Amita","weight":["400","700"]},{"name":"Anaheim","weight":["400"]},{"name":"Andada Pro","weight":["400","500","600","700","800"]},{"name":"Andika","weight":["400"]},{"name":"Andika New Basic","weight":["400","700"]},{"name":"Angkor","weight":["400"]},{"name":"Annie Use Your Telescope","weight":["400"]},{"name":"Anonymous Pro","weight":["400","700"]},{"name":"Antic","weight":["400"]},{"name":"Antic Didone","weight":["400"]},{"name":"Antic Slab","weight":["400"]},{"name":"Anton","weight":["400"]},{"name":"Antonio","weight":["100","200","300","400","500","600","700"]},{"name":"Arapey","weight":["400"]},{"name":"Arbutus","weight":["400"]},{"name":"Arbutus Slab","weight":["400"]},{"name":"Architects Daughter","weight":["400"]},{"name":"Archivo","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Archivo Black","weight":["400"]},{"name":"Archivo Narrow","weight":["400","500","600","700"]},{"name":"Are You Serious","weight":["400"]},{"name":"Aref Ruqaa","weight":["400","700"]},{"name":"Arima Madurai","weight":["100","200","300","400","500","700","800","900"]},{"name":"Arimo","weight":["400","500","600","700"]},{"name":"Arizonia","weight":["400"]},{"name":"Armata","weight":["400"]},{"name":"Arsenal","weight":["400","700"]},{"name":"Artifika","weight":["400"]},{"name":"Arvo","weight":["400","700"]},{"name":"Arya","weight":["400","700"]},{"name":"Asap","weight":["400","500","600","700"]},{"name":"Asap Condensed","weight":["400","500","600","700"]},{"name":"Asar","weight":["400"]},{"name":"Asset","weight":["400"]},{"name":"Assistant","weight":["200","300","400","500","600","700","800"]},{"name":"Astloch","weight":["400","700"]},{"name":"Asul","weight":["400","700"]},{"name":"Athiti","weight":["200","300","400","500","600","700"]},{"name":"Atkinson Hyperlegible","weight":["400","700"]},{"name":"Atma","weight":["300","400","500","600","700"]},{"name":"Atomic Age","weight":["400"]},{"name":"Aubrey","weight":["400"]},{"name":"Audiowide","weight":["400"]},{"name":"Autour One","weight":["400"]},{"name":"Average","weight":["400"]},{"name":"Average Sans","weight":["400"]},{"name":"Averia Gruesa Libre","weight":["400"]},{"name":"Averia Libre","weight":["300","400","700"]},{"name":"Averia Sans Libre","weight":["300","400","700"]},{"name":"Averia Serif Libre","weight":["300","400","700"]},{"name":"Azeret Mono","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"B612","weight":["400","700"]},{"name":"B612 Mono","weight":["400","700"]},{"name":"Bad Script","weight":["400"]},{"name":"Bahiana","weight":["400"]},{"name":"Bahianita","weight":["400"]},{"name":"Bai Jamjuree","weight":["200","300","400","500","600","700"]},{"name":"Ballet","weight":["400"]},{"name":"Baloo 2","weight":["400","500","600","700","800"]},{"name":"Baloo Bhai 2","weight":["400","500","600","700","800"]},{"name":"Baloo Bhaina 2","weight":["400","500","600","700","800"]},{"name":"Baloo Chettan 2","weight":["400","500","600","700","800"]},{"name":"Baloo Da 2","weight":["400","500","600","700","800"]},{"name":"Baloo Paaji 2","weight":["400","500","600","700","800"]},{"name":"Baloo Tamma 2","weight":["400","500","600","700","800"]},{"name":"Baloo Tammudu 2","weight":["400","500","600","700","800"]},{"name":"Baloo Thambi 2","weight":["400","500","600","700","800"]},{"name":"Balsamiq Sans","weight":["400","700"]},{"name":"Balthazar","weight":["400"]},{"name":"Bangers","weight":["400"]},{"name":"Barlow","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Barlow Condensed","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Barlow Semi Condensed","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Barriecito","weight":["400"]},{"name":"Barrio","weight":["400"]},{"name":"Basic","weight":["400"]},{"name":"Baskervville","weight":["400"]},{"name":"Battambang","weight":["100","300","400","700","900"]},{"name":"Baumans","weight":["400"]},{"name":"Bayon","weight":["400"]},{"name":"Be Vietnam","weight":["100","300","400","500","600","700","800"]},{"name":"Be Vietnam Pro","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Bebas Neue","weight":["400"]},{"name":"Belgrano","weight":["400"]},{"name":"Bellefair","weight":["400"]},{"name":"Belleza","weight":["400"]},{"name":"Bellota","weight":["300","400","700"]},{"name":"Bellota Text","weight":["300","400","700"]},{"name":"BenchNine","weight":["300","400","700"]},{"name":"Benne","weight":["400"]},{"name":"Bentham","weight":["400"]},{"name":"Berkshire Swash","weight":["400"]},{"name":"Besley","weight":["400","500","600","700","800","900"]},{"name":"Beth Ellen","weight":["400"]},{"name":"Bevan","weight":["400"]},{"name":"Big Shoulders Display","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Big Shoulders Inline Display","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Big Shoulders Inline Text","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Big Shoulders Stencil Display","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Big Shoulders Stencil Text","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Big Shoulders Text","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Bigelow Rules","weight":["400"]},{"name":"Bigshot One","weight":["400"]},{"name":"Bilbo","weight":["400"]},{"name":"Bilbo Swash Caps","weight":["400"]},{"name":"BioRhyme","weight":["200","300","400","700","800"]},{"name":"BioRhyme Expanded","weight":["200","300","400","700","800"]},{"name":"Birthstone","weight":["400"]},{"name":"Birthstone Bounce","weight":["400","500"]},{"name":"Biryani","weight":["200","300","400","600","700","800","900"]},{"name":"Bitter","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Black And White Picture","weight":["400"]},{"name":"Black Han Sans","weight":["400"]},{"name":"Black Ops One","weight":["400"]},{"name":"Blinker","weight":["100","200","300","400","600","700","800","900"]},{"name":"Bodoni Moda","weight":["400","500","600","700","800","900"]},{"name":"Bokor","weight":["400"]},{"name":"Bona Nova","weight":["400","700"]},{"name":"Bonbon","weight":["400"]},{"name":"Bonheur Royale","weight":["400"]},{"name":"Boogaloo","weight":["400"]},{"name":"Bowlby One","weight":["400"]},{"name":"Bowlby One SC","weight":["400"]},{"name":"Brawler","weight":["400"]},{"name":"Bree Serif","weight":["400"]},{"name":"Brygada 1918","weight":["400","500","600","700"]},{"name":"Bubblegum Sans","weight":["400"]},{"name":"Bubbler One","weight":["400"]},{"name":"Buda","weight":["300"]},{"name":"Buenard","weight":["400","700"]},{"name":"Bungee","weight":["400"]},{"name":"Bungee Hairline","weight":["400"]},{"name":"Bungee Inline","weight":["400"]},{"name":"Bungee Outline","weight":["400"]},{"name":"Bungee Shade","weight":["400"]},{"name":"Butcherman","weight":["400"]},{"name":"Butterfly Kids","weight":["400"]},{"name":"Cabin","weight":["400","500","600","700"]},{"name":"Cabin Condensed","weight":["400","500","600","700"]},{"name":"Cabin Sketch","weight":["400","700"]},{"name":"Caesar Dressing","weight":["400"]},{"name":"Cagliostro","weight":["400"]},{"name":"Cairo","weight":["200","300","400","600","700","900"]},{"name":"Caladea","weight":["400","700"]},{"name":"Calistoga","weight":["400"]},{"name":"Calligraffitti","weight":["400"]},{"name":"Cambay","weight":["400","700"]},{"name":"Cambo","weight":["400"]},{"name":"Candal","weight":["400"]},{"name":"Cantarell","weight":["400","700"]},{"name":"Cantata One","weight":["400"]},{"name":"Cantora One","weight":["400"]},{"name":"Capriola","weight":["400"]},{"name":"Caramel","weight":["400"]},{"name":"Carattere","weight":["400"]},{"name":"Cardo","weight":["400","700"]},{"name":"Carme","weight":["400"]},{"name":"Carrois Gothic","weight":["400"]},{"name":"Carrois Gothic SC","weight":["400"]},{"name":"Carter One","weight":["400"]},{"name":"Castoro","weight":["400"]},{"name":"Catamaran","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Caudex","weight":["400","700"]},{"name":"Caveat","weight":["400","500","600","700"]},{"name":"Caveat Brush","weight":["400"]},{"name":"Cedarville Cursive","weight":["400"]},{"name":"Ceviche One","weight":["400"]},{"name":"Chakra Petch","weight":["300","400","500","600","700"]},{"name":"Changa","weight":["200","300","400","500","600","700","800"]},{"name":"Changa One","weight":["400"]},{"name":"Chango","weight":["400"]},{"name":"Charm","weight":["400","700"]},{"name":"Charmonman","weight":["400","700"]},{"name":"Chathura","weight":["100","300","400","700","800"]},{"name":"Chau Philomene One","weight":["400"]},{"name":"Chela One","weight":["400"]},{"name":"Chelsea Market","weight":["400"]},{"name":"Chenla","weight":["400"]},{"name":"Cherish","weight":["400"]},{"name":"Cherry Cream Soda","weight":["400"]},{"name":"Cherry Swash","weight":["400","700"]},{"name":"Chewy","weight":["400"]},{"name":"Chicle","weight":["400"]},{"name":"Chilanka","weight":["400"]},{"name":"Chivo","weight":["300","400","700","900"]},{"name":"Chonburi","weight":["400"]},{"name":"Cinzel","weight":["400","500","600","700","800","900"]},{"name":"Cinzel Decorative","weight":["400","700","900"]},{"name":"Clicker Script","weight":["400"]},{"name":"Coda","weight":["400","800"]},{"name":"Coda Caption","weight":["800"]},{"name":"Codystar","weight":["300","400"]},{"name":"Coiny","weight":["400"]},{"name":"Combo","weight":["400"]},{"name":"Comfortaa","weight":["300","400","500","600","700"]},{"name":"Comic Neue","weight":["300","400","700"]},{"name":"Coming Soon","weight":["400"]},{"name":"Commissioner","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Concert One","weight":["400"]},{"name":"Condiment","weight":["400"]},{"name":"Content","weight":["400","700"]},{"name":"Contrail One","weight":["400"]},{"name":"Convergence","weight":["400"]},{"name":"Cookie","weight":["400"]},{"name":"Copse","weight":["400"]},{"name":"Corben","weight":["400","700"]},{"name":"Cormorant","weight":["300","400","500","600","700"]},{"name":"Cormorant Garamond","weight":["300","400","500","600","700"]},{"name":"Cormorant Infant","weight":["300","400","500","600","700"]},{"name":"Cormorant SC","weight":["300","400","500","600","700"]},{"name":"Cormorant Unicase","weight":["300","400","500","600","700"]},{"name":"Cormorant Upright","weight":["300","400","500","600","700"]},{"name":"Courgette","weight":["400"]},{"name":"Courier Prime","weight":["400","700"]},{"name":"Cousine","weight":["400","700"]},{"name":"Coustard","weight":["400","900"]},{"name":"Covered By Your Grace","weight":["400"]},{"name":"Crafty Girls","weight":["400"]},{"name":"Creepster","weight":["400"]},{"name":"Crete Round","weight":["400"]},{"name":"Crimson Pro","weight":["200","300","400","500","600","700","800","900"]},{"name":"Crimson Text","weight":["400","600","700"]},{"name":"Croissant One","weight":["400"]},{"name":"Crushed","weight":["400"]},{"name":"Cuprum","weight":["400","500","600","700"]},{"name":"Cute Font","weight":["400"]},{"name":"Cutive","weight":["400"]},{"name":"Cutive Mono","weight":["400"]},{"name":"DM Mono","weight":["300","400","500"]},{"name":"DM Sans","weight":["400","500","700"]},{"name":"DM Serif Display","weight":["400"]},{"name":"DM Serif Text","weight":["400"]},{"name":"Damion","weight":["400"]},{"name":"Dancing Script","weight":["400","500","600","700"]},{"name":"Dangrek","weight":["400"]},{"name":"Darker Grotesque","weight":["300","400","500","600","700","800","900"]},{"name":"David Libre","weight":["400","500","700"]},{"name":"Dawning of a New Day","weight":["400"]},{"name":"Days One","weight":["400"]},{"name":"Dekko","weight":["400"]},{"name":"Dela Gothic One","weight":["400"]},{"name":"Delius","weight":["400"]},{"name":"Delius Swash Caps","weight":["400"]},{"name":"Delius Unicase","weight":["400","700"]},{"name":"Della Respira","weight":["400"]},{"name":"Denk One","weight":["400"]},{"name":"Devonshire","weight":["400"]},{"name":"Dhurjati","weight":["400"]},{"name":"Didact Gothic","weight":["400"]},{"name":"Diplomata","weight":["400"]},{"name":"Diplomata SC","weight":["400"]},{"name":"Do Hyeon","weight":["400"]},{"name":"Dokdo","weight":["400"]},{"name":"Domine","weight":["400","500","600","700"]},{"name":"Donegal One","weight":["400"]},{"name":"Doppio One","weight":["400"]},{"name":"Dorsa","weight":["400"]},{"name":"Dosis","weight":["200","300","400","500","600","700","800"]},{"name":"DotGothic16","weight":["400"]},{"name":"Dr Sugiyama","weight":["400"]},{"name":"Duru Sans","weight":["400"]},{"name":"Dynalight","weight":["400"]},{"name":"EB Garamond","weight":["400","500","600","700","800"]},{"name":"Eagle Lake","weight":["400"]},{"name":"East Sea Dokdo","weight":["400"]},{"name":"Eater","weight":["400"]},{"name":"Economica","weight":["400","700"]},{"name":"Eczar","weight":["400","500","600","700","800"]},{"name":"El Messiri","weight":["400","500","600","700"]},{"name":"Electrolize","weight":["400"]},{"name":"Elsie","weight":["400","900"]},{"name":"Elsie Swash Caps","weight":["400","900"]},{"name":"Emblema One","weight":["400"]},{"name":"Emilys Candy","weight":["400"]},{"name":"Encode Sans","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Encode Sans Condensed","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Encode Sans Expanded","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Encode Sans SC","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Encode Sans Semi Condensed","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Encode Sans Semi Expanded","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Engagement","weight":["400"]},{"name":"Englebert","weight":["400"]},{"name":"Enriqueta","weight":["400","500","600","700"]},{"name":"Ephesis","weight":["400"]},{"name":"Epilogue","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Erica One","weight":["400"]},{"name":"Esteban","weight":["400"]},{"name":"Euphoria Script","weight":["400"]},{"name":"Ewert","weight":["400"]},{"name":"Exo","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Exo 2","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Expletus Sans","weight":["400","500","600","700"]},{"name":"Explora","weight":["400"]},{"name":"Fahkwang","weight":["200","300","400","500","600","700"]},{"name":"Fanwood Text","weight":["400"]},{"name":"Farro","weight":["300","400","500","700"]},{"name":"Farsan","weight":["400"]},{"name":"Fascinate","weight":["400"]},{"name":"Fascinate Inline","weight":["400"]},{"name":"Faster One","weight":["400"]},{"name":"Fasthand","weight":["400"]},{"name":"Fauna One","weight":["400"]},{"name":"Faustina","weight":["400","500","600","700"]},{"name":"Federant","weight":["400"]},{"name":"Federo","weight":["400"]},{"name":"Felipa","weight":["400"]},{"name":"Fenix","weight":["400"]},{"name":"Festive","weight":["400"]},{"name":"Finger Paint","weight":["400"]},{"name":"Fira Code","weight":["300","400","500","600","700"]},{"name":"Fira Mono","weight":["400","500","700"]},{"name":"Fira Sans","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Fira Sans Condensed","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Fira Sans Extra Condensed","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Fjalla One","weight":["400"]},{"name":"Fjord One","weight":["400"]},{"name":"Flamenco","weight":["300","400"]},{"name":"Flavors","weight":["400"]},{"name":"Fleur De Leah","weight":["400"]},{"name":"Fondamento","weight":["400"]},{"name":"Fontdiner Swanky","weight":["400"]},{"name":"Forum","weight":["400"]},{"name":"Francois One","weight":["400"]},{"name":"Frank Ruhl Libre","weight":["300","400","500","700","900"]},{"name":"Fraunces","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Freckle Face","weight":["400"]},{"name":"Fredericka the Great","weight":["400"]},{"name":"Fredoka One","weight":["400"]},{"name":"Freehand","weight":["400"]},{"name":"Fresca","weight":["400"]},{"name":"Frijole","weight":["400"]},{"name":"Fruktur","weight":["400"]},{"name":"Fugaz One","weight":["400"]},{"name":"Fuggles","weight":["400"]},{"name":"GFS Didot","weight":["400"]},{"name":"GFS Neohellenic","weight":["400","700"]},{"name":"Gabriela","weight":["400"]},{"name":"Gaegu","weight":["300","400","700"]},{"name":"Gafata","weight":["400"]},{"name":"Galada","weight":["400"]},{"name":"Galdeano","weight":["400"]},{"name":"Galindo","weight":["400"]},{"name":"Gamja Flower","weight":["400"]},{"name":"Gayathri","weight":["100","400","700"]},{"name":"Gelasio","weight":["400","500","600","700"]},{"name":"Gemunu Libre","weight":["200","300","400","500","600","700","800"]},{"name":"Gentium Basic","weight":["400","700"]},{"name":"Gentium Book Basic","weight":["400","700"]},{"name":"Geo","weight":["400"]},{"name":"Georama","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Geostar","weight":["400"]},{"name":"Geostar Fill","weight":["400"]},{"name":"Germania One","weight":["400"]},{"name":"Gideon Roman","weight":["400"]},{"name":"Gidugu","weight":["400"]},{"name":"Gilda Display","weight":["400"]},{"name":"Girassol","weight":["400"]},{"name":"Give You Glory","weight":["400"]},{"name":"Glass Antiqua","weight":["400"]},{"name":"Glegoo","weight":["400","700"]},{"name":"Gloria Hallelujah","weight":["400"]},{"name":"Glory","weight":["100","200","300","400","500","600","700","800"]},{"name":"Gluten","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Goblin One","weight":["400"]},{"name":"Gochi Hand","weight":["400"]},{"name":"Goldman","weight":["400","700"]},{"name":"Gorditas","weight":["400","700"]},{"name":"Gothic A1","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Gotu","weight":["400"]},{"name":"Goudy Bookletter 1911","weight":["400"]},{"name":"Gowun Batang","weight":["400","700"]},{"name":"Gowun Dodum","weight":["400"]},{"name":"Graduate","weight":["400"]},{"name":"Grand Hotel","weight":["400"]},{"name":"Grandstander","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Gravitas One","weight":["400"]},{"name":"Great Vibes","weight":["400"]},{"name":"Grechen Fuemen","weight":["400"]},{"name":"Grenze","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Grenze Gotisch","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Grey Qo","weight":["400"]},{"name":"Griffy","weight":["400"]},{"name":"Gruppo","weight":["400"]},{"name":"Gudea","weight":["400","700"]},{"name":"Gugi","weight":["400"]},{"name":"Gupter","weight":["400","500","700"]},{"name":"Gurajada","weight":["400"]},{"name":"Habibi","weight":["400"]},{"name":"Hachi Maru Pop","weight":["400"]},{"name":"Hahmlet","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Halant","weight":["300","400","500","600","700"]},{"name":"Hammersmith One","weight":["400"]},{"name":"Hanalei","weight":["400"]},{"name":"Hanalei Fill","weight":["400"]},{"name":"Handlee","weight":["400"]},{"name":"Hanuman","weight":["100","300","400","700","900"]},{"name":"Happy Monkey","weight":["400"]},{"name":"Harmattan","weight":["400","700"]},{"name":"Headland One","weight":["400"]},{"name":"Heebo","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Henny Penny","weight":["400"]},{"name":"Hepta Slab","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Herr Von Muellerhoff","weight":["400"]},{"name":"Hi Melody","weight":["400"]},{"name":"Hina Mincho","weight":["400"]},{"name":"Hind","weight":["300","400","500","600","700"]},{"name":"Hind Guntur","weight":["300","400","500","600","700"]},{"name":"Hind Madurai","weight":["300","400","500","600","700"]},{"name":"Hind Siliguri","weight":["300","400","500","600","700"]},{"name":"Hind Vadodara","weight":["300","400","500","600","700"]},{"name":"Holtwood One SC","weight":["400"]},{"name":"Homemade Apple","weight":["400"]},{"name":"Homenaje","weight":["400"]},{"name":"IBM Plex Mono","weight":["100","200","300","400","500","600","700"]},{"name":"IBM Plex Sans","weight":["100","200","300","400","500","600","700"]},{"name":"IBM Plex Sans Arabic","weight":["100","200","300","400","500","600","700"]},{"name":"IBM Plex Sans Condensed","weight":["100","200","300","400","500","600","700"]},{"name":"IBM Plex Sans Devanagari","weight":["100","200","300","400","500","600","700"]},{"name":"IBM Plex Sans Hebrew","weight":["100","200","300","400","500","600","700"]},{"name":"IBM Plex Sans KR","weight":["100","200","300","400","500","600","700"]},{"name":"IBM Plex Sans Thai","weight":["100","200","300","400","500","600","700"]},{"name":"IBM Plex Sans Thai Looped","weight":["100","200","300","400","500","600","700"]},{"name":"IBM Plex Serif","weight":["100","200","300","400","500","600","700"]},{"name":"IM Fell DW Pica","weight":["400"]},{"name":"IM Fell DW Pica SC","weight":["400"]},{"name":"IM Fell Double Pica","weight":["400"]},{"name":"IM Fell Double Pica SC","weight":["400"]},{"name":"IM Fell English","weight":["400"]},{"name":"IM Fell English SC","weight":["400"]},{"name":"IM Fell French Canon","weight":["400"]},{"name":"IM Fell French Canon SC","weight":["400"]},{"name":"IM Fell Great Primer","weight":["400"]},{"name":"IM Fell Great Primer SC","weight":["400"]},{"name":"Ibarra Real Nova","weight":["400","500","600","700"]},{"name":"Iceberg","weight":["400"]},{"name":"Iceland","weight":["400"]},{"name":"Imbue","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Imprima","weight":["400"]},{"name":"Inconsolata","weight":["200","300","400","500","600","700","800","900"]},{"name":"Inder","weight":["400"]},{"name":"Indie Flower","weight":["400"]},{"name":"Inika","weight":["400","700"]},{"name":"Inknut Antiqua","weight":["300","400","500","600","700","800","900"]},{"name":"Inria Sans","weight":["300","400","700"]},{"name":"Inria Serif","weight":["300","400","700"]},{"name":"Inter","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Irish Grover","weight":["400"]},{"name":"Istok Web","weight":["400","700"]},{"name":"Italiana","weight":["400"]},{"name":"Italianno","weight":["400"]},{"name":"Itim","weight":["400"]},{"name":"Jacques Francois","weight":["400"]},{"name":"Jacques Francois Shadow","weight":["400"]},{"name":"Jaldi","weight":["400","700"]},{"name":"JetBrains Mono","weight":["100","200","300","400","500","600","700","800"]},{"name":"Jim Nightshade","weight":["400"]},{"name":"Jockey One","weight":["400"]},{"name":"Jolly Lodger","weight":["400"]},{"name":"Jomhuria","weight":["400"]},{"name":"Jomolhari","weight":["400"]},{"name":"Josefin Sans","weight":["100","200","300","400","500","600","700"]},{"name":"Josefin Slab","weight":["100","200","300","400","500","600","700"]},{"name":"Jost","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Joti One","weight":["400"]},{"name":"Jua","weight":["400"]},{"name":"Judson","weight":["400","700"]},{"name":"Julee","weight":["400"]},{"name":"Julius Sans One","weight":["400"]},{"name":"Junge","weight":["400"]},{"name":"Jura","weight":["300","400","500","600","700"]},{"name":"Just Another Hand","weight":["400"]},{"name":"Just Me Again Down Here","weight":["400"]},{"name":"K2D","weight":["100","200","300","400","500","600","700","800"]},{"name":"Kadwa","weight":["400","700"]},{"name":"Kaisei Decol","weight":["400","500","700"]},{"name":"Kaisei HarunoUmi","weight":["400","500","700"]},{"name":"Kaisei Opti","weight":["400","500","700"]},{"name":"Kaisei Tokumin","weight":["400","500","700","800"]},{"name":"Kalam","weight":["300","400","700"]},{"name":"Kameron","weight":["400","700"]},{"name":"Kanit","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Kantumruy","weight":["300","400","700"]},{"name":"Karantina","weight":["300","400","700"]},{"name":"Karla","weight":["200","300","400","500","600","700","800"]},{"name":"Karma","weight":["300","400","500","600","700"]},{"name":"Katibeh","weight":["400"]},{"name":"Kaushan Script","weight":["400"]},{"name":"Kavivanar","weight":["400"]},{"name":"Kavoon","weight":["400"]},{"name":"Kdam Thmor","weight":["400"]},{"name":"Keania One","weight":["400"]},{"name":"Kelly Slab","weight":["400"]},{"name":"Kenia","weight":["400"]},{"name":"Khand","weight":["300","400","500","600","700"]},{"name":"Khmer","weight":["400"]},{"name":"Khula","weight":["300","400","600","700","800"]},{"name":"Kirang Haerang","weight":["400"]},{"name":"Kite One","weight":["400"]},{"name":"Kiwi Maru","weight":["300","400","500"]},{"name":"Klee One","weight":["400","600"]},{"name":"Knewave","weight":["400"]},{"name":"KoHo","weight":["200","300","400","500","600","700"]},{"name":"Kodchasan","weight":["200","300","400","500","600","700"]},{"name":"Koh Santepheap","weight":["100","300","400","700","900"]},{"name":"Kosugi","weight":["400"]},{"name":"Kosugi Maru","weight":["400"]},{"name":"Kotta One","weight":["400"]},{"name":"Koulen","weight":["400"]},{"name":"Kranky","weight":["400"]},{"name":"Kreon","weight":["300","400","500","600","700"]},{"name":"Kristi","weight":["400"]},{"name":"Krona One","weight":["400"]},{"name":"Krub","weight":["200","300","400","500","600","700"]},{"name":"Kufam","weight":["400","500","600","700","800","900"]},{"name":"Kulim Park","weight":["200","300","400","600","700"]},{"name":"Kumar One","weight":["400"]},{"name":"Kumar One Outline","weight":["400"]},{"name":"Kumbh Sans","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Kurale","weight":["400"]},{"name":"La Belle Aurore","weight":["400"]},{"name":"Lacquer","weight":["400"]},{"name":"Laila","weight":["300","400","500","600","700"]},{"name":"Lakki Reddy","weight":["400"]},{"name":"Lalezar","weight":["400"]},{"name":"Lancelot","weight":["400"]},{"name":"Langar","weight":["400"]},{"name":"Lateef","weight":["400"]},{"name":"Lato","weight":["100","300","400","700","900"]},{"name":"League Script","weight":["400"]},{"name":"Leckerli One","weight":["400"]},{"name":"Ledger","weight":["400"]},{"name":"Lekton","weight":["400","700"]},{"name":"Lemon","weight":["400"]},{"name":"Lemonada","weight":["300","400","500","600","700"]},{"name":"Lexend","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Lexend Deca","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Lexend Exa","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Lexend Giga","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Lexend Mega","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Lexend Peta","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Lexend Tera","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Lexend Zetta","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Libre Barcode 128","weight":["400"]},{"name":"Libre Barcode 128 Text","weight":["400"]},{"name":"Libre Barcode 39","weight":["400"]},{"name":"Libre Barcode 39 Extended","weight":["400"]},{"name":"Libre Barcode 39 Extended Text","weight":["400"]},{"name":"Libre Barcode 39 Text","weight":["400"]},{"name":"Libre Barcode EAN13 Text","weight":["400"]},{"name":"Libre Baskerville","weight":["400","700"]},{"name":"Libre Caslon Display","weight":["400"]},{"name":"Libre Caslon Text","weight":["400","700"]},{"name":"Libre Franklin","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Life Savers","weight":["400","700","800"]},{"name":"Lilita One","weight":["400"]},{"name":"Lily Script One","weight":["400"]},{"name":"Limelight","weight":["400"]},{"name":"Linden Hill","weight":["400"]},{"name":"Literata","weight":["200","300","400","500","600","700","800","900"]},{"name":"Liu Jian Mao Cao","weight":["400"]},{"name":"Livvic","weight":["100","200","300","400","500","600","700","900"]},{"name":"Lobster","weight":["400"]},{"name":"Lobster Two","weight":["400","700"]},{"name":"Londrina Outline","weight":["400"]},{"name":"Londrina Shadow","weight":["400"]},{"name":"Londrina Sketch","weight":["400"]},{"name":"Londrina Solid","weight":["100","300","400","900"]},{"name":"Long Cang","weight":["400"]},{"name":"Lora","weight":["400","500","600","700"]},{"name":"Love Ya Like A Sister","weight":["400"]},{"name":"Loved by the King","weight":["400"]},{"name":"Lovers Quarrel","weight":["400"]},{"name":"Luckiest Guy","weight":["400"]},{"name":"Lusitana","weight":["400","700"]},{"name":"Lustria","weight":["400"]},{"name":"M PLUS 1p","weight":["100","300","400","500","700","800","900"]},{"name":"M PLUS Rounded 1c","weight":["100","300","400","500","700","800","900"]},{"name":"Ma Shan Zheng","weight":["400"]},{"name":"Macondo","weight":["400"]},{"name":"Macondo Swash Caps","weight":["400"]},{"name":"Mada","weight":["200","300","400","500","600","700","900"]},{"name":"Magra","weight":["400","700"]},{"name":"Maiden Orange","weight":["400"]},{"name":"Maitree","weight":["200","300","400","500","600","700"]},{"name":"Major Mono Display","weight":["400"]},{"name":"Mako","weight":["400"]},{"name":"Mali","weight":["200","300","400","500","600","700"]},{"name":"Mallanna","weight":["400"]},{"name":"Mandali","weight":["400"]},{"name":"Manjari","weight":["100","400","700"]},{"name":"Manrope","weight":["200","300","400","500","600","700","800"]},{"name":"Mansalva","weight":["400"]},{"name":"Manuale","weight":["300","400","500","600","700","800"]},{"name":"Marcellus","weight":["400"]},{"name":"Marcellus SC","weight":["400"]},{"name":"Marck Script","weight":["400"]},{"name":"Margarine","weight":["400"]},{"name":"Markazi Text","weight":["400","500","600","700"]},{"name":"Marko One","weight":["400"]},{"name":"Marmelad","weight":["400"]},{"name":"Martel","weight":["200","300","400","600","700","800","900"]},{"name":"Martel Sans","weight":["200","300","400","600","700","800","900"]},{"name":"Marvel","weight":["400","700"]},{"name":"Mate","weight":["400"]},{"name":"Mate SC","weight":["400"]},{"name":"Material Icons","weight":["400"]},{"name":"Maven Pro","weight":["400","500","600","700","800","900"]},{"name":"McLaren","weight":["400"]},{"name":"Meddon","weight":["400"]},{"name":"MedievalSharp","weight":["400"]},{"name":"Medula One","weight":["400"]},{"name":"Meera Inimai","weight":["400"]},{"name":"Megrim","weight":["400"]},{"name":"Meie Script","weight":["400"]},{"name":"Merienda","weight":["400","700"]},{"name":"Merienda One","weight":["400"]},{"name":"Merriweather","weight":["300","400","700","900"]},{"name":"Merriweather Sans","weight":["300","400","500","600","700","800"]},{"name":"Metal","weight":["400"]},{"name":"Metal Mania","weight":["400"]},{"name":"Metamorphous","weight":["400"]},{"name":"Metrophobic","weight":["400"]},{"name":"Michroma","weight":["400"]},{"name":"Milonga","weight":["400"]},{"name":"Miltonian","weight":["400"]},{"name":"Miltonian Tattoo","weight":["400"]},{"name":"Mina","weight":["400","700"]},{"name":"Miniver","weight":["400"]},{"name":"Miriam Libre","weight":["400","700"]},{"name":"Mirza","weight":["400","500","600","700"]},{"name":"Miss Fajardose","weight":["400"]},{"name":"Mitr","weight":["200","300","400","500","600","700"]},{"name":"Modak","weight":["400"]},{"name":"Modern Antiqua","weight":["400"]},{"name":"Mogra","weight":["400"]},{"name":"Molengo","weight":["400"]},{"name":"Molle","weight":["400"]},{"name":"Monda","weight":["400","700"]},{"name":"Monofett","weight":["400"]},{"name":"Monoton","weight":["400"]},{"name":"Monsieur La Doulaise","weight":["400"]},{"name":"Montaga","weight":["400"]},{"name":"MonteCarlo","weight":["400"]},{"name":"Montez","weight":["400"]},{"name":"Montserrat","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Montserrat Alternates","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Montserrat Subrayada","weight":["400","700"]},{"name":"Moul","weight":["400"]},{"name":"Moulpali","weight":["400"]},{"name":"Mountains of Christmas","weight":["400","700"]},{"name":"Mouse Memoirs","weight":["400"]},{"name":"Mr Bedfort","weight":["400"]},{"name":"Mr Dafoe","weight":["400"]},{"name":"Mr De Haviland","weight":["400"]},{"name":"Mrs Saint Delafield","weight":["400"]},{"name":"Mrs Sheppards","weight":["400"]},{"name":"Mukta","weight":["200","300","400","500","600","700","800"]},{"name":"Mukta Mahee","weight":["200","300","400","500","600","700","800"]},{"name":"Mukta Malar","weight":["200","300","400","500","600","700","800"]},{"name":"Mukta Vaani","weight":["200","300","400","500","600","700","800"]},{"name":"Mulish","weight":["200","300","400","500","600","700","800","900"]},{"name":"MuseoModerno","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Mystery Quest","weight":["400"]},{"name":"NTR","weight":["400"]},{"name":"Nanum Brush Script","weight":["400"]},{"name":"Nanum Gothic","weight":["400","700","800"]},{"name":"Nanum Gothic Coding","weight":["400","700"]},{"name":"Nanum Myeongjo","weight":["400","700","800"]},{"name":"Nanum Pen Script","weight":["400"]},{"name":"Nerko One","weight":["400"]},{"name":"Neucha","weight":["400"]},{"name":"Neuton","weight":["200","300","400","700","800"]},{"name":"New Rocker","weight":["400"]},{"name":"New Tegomin","weight":["400"]},{"name":"News Cycle","weight":["400","700"]},{"name":"Newsreader","weight":["200","300","400","500","600","700","800"]},{"name":"Niconne","weight":["400"]},{"name":"Niramit","weight":["200","300","400","500","600","700"]},{"name":"Nixie One","weight":["400"]},{"name":"Nobile","weight":["400","500","700"]},{"name":"Nokora","weight":["400","700"]},{"name":"Norican","weight":["400"]},{"name":"Nosifer","weight":["400"]},{"name":"Notable","weight":["400"]},{"name":"Nothing You Could Do","weight":["400"]},{"name":"Noticia Text","weight":["400","700"]},{"name":"Noto Kufi Arabic","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Noto Music","weight":["400"]},{"name":"Noto Naskh Arabic","weight":["400","500","600","700"]},{"name":"Noto Nastaliq Urdu","weight":["400","700"]},{"name":"Noto Rashi Hebrew","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Noto Sans","weight":["400","700"]},{"name":"Noto Sans Adlam","weight":["400","500","600","700"]},{"name":"Noto Sans Adlam Unjoined","weight":["400","500","600","700"]},{"name":"Noto Sans Anatolian Hieroglyphs","weight":["400"]},{"name":"Noto Sans Arabic","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Noto Sans Armenian","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Noto Sans Avestan","weight":["400"]},{"name":"Noto Sans Balinese","weight":["400","500","600","700"]},{"name":"Noto Sans Bamum","weight":["400","500","600","700"]},{"name":"Noto Sans Bassa Vah","weight":["400"]},{"name":"Noto Sans Batak","weight":["400"]},{"name":"Noto Sans Bengali","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Noto Sans Bhaiksuki","weight":["400"]},{"name":"Noto Sans Brahmi","weight":["400"]},{"name":"Noto Sans Buginese","weight":["400"]},{"name":"Noto Sans Buhid","weight":["400"]},{"name":"Noto Sans Canadian Aboriginal","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Noto Sans Carian","weight":["400"]},{"name":"Noto Sans Caucasian Albanian","weight":["400"]},{"name":"Noto Sans Chakma","weight":["400"]},{"name":"Noto Sans Cham","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Noto Sans Cherokee","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Noto Sans Coptic","weight":["400"]},{"name":"Noto Sans Cuneiform","weight":["400"]},{"name":"Noto Sans Cypriot","weight":["400"]},{"name":"Noto Sans Deseret","weight":["400"]},{"name":"Noto Sans Devanagari","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Noto Sans Display","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Noto Sans Duployan","weight":["400"]},{"name":"Noto Sans Egyptian Hieroglyphs","weight":["400"]},{"name":"Noto Sans Elbasan","weight":["400"]},{"name":"Noto Sans Elymaic","weight":["400"]},{"name":"Noto Sans Georgian","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Noto Sans Glagolitic","weight":["400"]},{"name":"Noto Sans Gothic","weight":["400"]},{"name":"Noto Sans Grantha","weight":["400"]},{"name":"Noto Sans Gujarati","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Noto Sans Gunjala Gondi","weight":["400"]},{"name":"Noto Sans Gurmukhi","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Noto Sans HK","weight":["100","300","400","500","700","900"]},{"name":"Noto Sans Hanifi Rohingya","weight":["400","500","600","700"]},{"name":"Noto Sans Hanunoo","weight":["400"]},{"name":"Noto Sans Hatran","weight":["400"]},{"name":"Noto Sans Hebrew","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Noto Sans Imperial Aramaic","weight":["400"]},{"name":"Noto Sans Indic Siyaq Numbers","weight":["400"]},{"name":"Noto Sans Inscriptional Pahlavi","weight":["400"]},{"name":"Noto Sans Inscriptional Parthian","weight":["400"]},{"name":"Noto Sans JP","weight":["100","300","400","500","700","900"]},{"name":"Noto Sans Javanese","weight":["400","700"]},{"name":"Noto Sans KR","weight":["100","300","400","500","700","900"]},{"name":"Noto Sans Kaithi","weight":["400"]},{"name":"Noto Sans Kannada","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Noto Sans Kayah Li","weight":["400","500","600","700"]},{"name":"Noto Sans Kharoshthi","weight":["400"]},{"name":"Noto Sans Khmer","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Noto Sans Khojki","weight":["400"]},{"name":"Noto Sans Khudawadi","weight":["400"]},{"name":"Noto Sans Lao","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Noto Sans Lepcha","weight":["400"]},{"name":"Noto Sans Limbu","weight":["400"]},{"name":"Noto Sans Linear A","weight":["400"]},{"name":"Noto Sans Linear B","weight":["400"]},{"name":"Noto Sans Lisu","weight":["400","500","600","700"]},{"name":"Noto Sans Lycian","weight":["400"]},{"name":"Noto Sans Lydian","weight":["400"]},{"name":"Noto Sans Mahajani","weight":["400"]},{"name":"Noto Sans Malayalam","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Noto Sans Mandaic","weight":["400"]},{"name":"Noto Sans Manichaean","weight":["400"]},{"name":"Noto Sans Marchen","weight":["400"]},{"name":"Noto Sans Masaram Gondi","weight":["400"]},{"name":"Noto Sans Math","weight":["400"]},{"name":"Noto Sans Mayan Numerals","weight":["400"]},{"name":"Noto Sans Medefaidrin","weight":["400","500","600","700"]},{"name":"Noto Sans Meroitic","weight":["400"]},{"name":"Noto Sans Miao","weight":["400"]},{"name":"Noto Sans Modi","weight":["400"]},{"name":"Noto Sans Mongolian","weight":["400"]},{"name":"Noto Sans Mono","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Noto Sans Mro","weight":["400"]},{"name":"Noto Sans Multani","weight":["400"]},{"name":"Noto Sans Myanmar","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Noto Sans N Ko","weight":["400"]},{"name":"Noto Sans Nabataean","weight":["400"]},{"name":"Noto Sans New Tai Lue","weight":["400"]},{"name":"Noto Sans Newa","weight":["400"]},{"name":"Noto Sans Nushu","weight":["400"]},{"name":"Noto Sans Ogham","weight":["400"]},{"name":"Noto Sans Ol Chiki","weight":["400","500","600","700"]},{"name":"Noto Sans Old Hungarian","weight":["400"]},{"name":"Noto Sans Old Italic","weight":["400"]},{"name":"Noto Sans Old North Arabian","weight":["400"]},{"name":"Noto Sans Old Permic","weight":["400"]},{"name":"Noto Sans Old Persian","weight":["400"]},{"name":"Noto Sans Old Sogdian","weight":["400"]},{"name":"Noto Sans Old South Arabian","weight":["400"]},{"name":"Noto Sans Old Turkic","weight":["400"]},{"name":"Noto Sans Oriya","weight":["100","400","700","900"]},{"name":"Noto Sans Osage","weight":["400"]},{"name":"Noto Sans Osmanya","weight":["400"]},{"name":"Noto Sans Pahawh Hmong","weight":["400"]},{"name":"Noto Sans Palmyrene","weight":["400"]},{"name":"Noto Sans Pau Cin Hau","weight":["400"]},{"name":"Noto Sans Phags Pa","weight":["400"]},{"name":"Noto Sans Phoenician","weight":["400"]},{"name":"Noto Sans Psalter Pahlavi","weight":["400"]},{"name":"Noto Sans Rejang","weight":["400"]},{"name":"Noto Sans Runic","weight":["400"]},{"name":"Noto Sans SC","weight":["100","300","400","500","700","900"]},{"name":"Noto Sans Samaritan","weight":["400"]},{"name":"Noto Sans Saurashtra","weight":["400"]},{"name":"Noto Sans Sharada","weight":["400"]},{"name":"Noto Sans Shavian","weight":["400"]},{"name":"Noto Sans Siddham","weight":["400"]},{"name":"Noto Sans Sinhala","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Noto Sans Sogdian","weight":["400"]},{"name":"Noto Sans Sora Sompeng","weight":["400","500","600","700"]},{"name":"Noto Sans Soyombo","weight":["400"]},{"name":"Noto Sans Sundanese","weight":["400","500","600","700"]},{"name":"Noto Sans Syloti Nagri","weight":["400"]},{"name":"Noto Sans Symbols","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Noto Sans Symbols 2","weight":["400"]},{"name":"Noto Sans Syriac","weight":["100","400","900"]},{"name":"Noto Sans TC","weight":["100","300","400","500","700","900"]},{"name":"Noto Sans Tagalog","weight":["400"]},{"name":"Noto Sans Tagbanwa","weight":["400"]},{"name":"Noto Sans Tai Le","weight":["400"]},{"name":"Noto Sans Tai Tham","weight":["400","500","600","700"]},{"name":"Noto Sans Tai Viet","weight":["400"]},{"name":"Noto Sans Takri","weight":["400"]},{"name":"Noto Sans Tamil","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Noto Sans Tamil Supplement","weight":["400"]},{"name":"Noto Sans Telugu","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Noto Sans Thaana","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Noto Sans Thai","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Noto Sans Thai Looped","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Noto Sans Tifinagh","weight":["400"]},{"name":"Noto Sans Tirhuta","weight":["400"]},{"name":"Noto Sans Ugaritic","weight":["400"]},{"name":"Noto Sans Vai","weight":["400"]},{"name":"Noto Sans Wancho","weight":["400"]},{"name":"Noto Sans Warang Citi","weight":["400"]},{"name":"Noto Sans Yi","weight":["400"]},{"name":"Noto Sans Zanabazar Square","weight":["400"]},{"name":"Noto Serif","weight":["400","700"]},{"name":"Noto Serif Ahom","weight":["400"]},{"name":"Noto Serif Armenian","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Noto Serif Balinese","weight":["400"]},{"name":"Noto Serif Bengali","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Noto Serif Devanagari","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Noto Serif Display","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Noto Serif Dogra","weight":["400"]},{"name":"Noto Serif Ethiopic","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Noto Serif Georgian","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Noto Serif Grantha","weight":["400"]},{"name":"Noto Serif Gujarati","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Noto Serif Gurmukhi","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Noto Serif Hebrew","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Noto Serif JP","weight":["200","300","400","500","600","700","900"]},{"name":"Noto Serif KR","weight":["200","300","400","500","600","700","900"]},{"name":"Noto Serif Kannada","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Noto Serif Khmer","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Noto Serif Lao","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Noto Serif Malayalam","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Noto Serif Myanmar","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Noto Serif Nyiakeng Puachue Hmong","weight":["400","500","600","700"]},{"name":"Noto Serif SC","weight":["200","300","400","500","600","700","900"]},{"name":"Noto Serif Sinhala","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Noto Serif TC","weight":["200","300","400","500","600","700","900"]},{"name":"Noto Serif Tamil","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Noto Serif Tangut","weight":["400"]},{"name":"Noto Serif Telugu","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Noto Serif Thai","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Noto Serif Tibetan","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Noto Serif Yezidi","weight":["400","500","600","700"]},{"name":"Noto Traditional Nushu","weight":["400"]},{"name":"Nova Cut","weight":["400"]},{"name":"Nova Flat","weight":["400"]},{"name":"Nova Mono","weight":["400"]},{"name":"Nova Oval","weight":["400"]},{"name":"Nova Round","weight":["400"]},{"name":"Nova Script","weight":["400"]},{"name":"Nova Slim","weight":["400"]},{"name":"Nova Square","weight":["400"]},{"name":"Numans","weight":["400"]},{"name":"Nunito","weight":["200","300","400","600","700","800","900"]},{"name":"Nunito Sans","weight":["200","300","400","600","700","800","900"]},{"name":"Odibee Sans","weight":["400"]},{"name":"Odor Mean Chey","weight":["400"]},{"name":"Offside","weight":["400"]},{"name":"Oi","weight":["400"]},{"name":"Old Standard TT","weight":["400","700"]},{"name":"Oldenburg","weight":["400"]},{"name":"Oleo Script","weight":["400","700"]},{"name":"Oleo Script Swash Caps","weight":["400","700"]},{"name":"Open Sans","weight":["300","400","500","600","700","800"]},{"name":"Open Sans Condensed","weight":["300","700"]},{"name":"Oranienbaum","weight":["400"]},{"name":"Orbitron","weight":["400","500","600","700","800","900"]},{"name":"Oregano","weight":["400"]},{"name":"Orelega One","weight":["400"]},{"name":"Orienta","weight":["400"]},{"name":"Original Surfer","weight":["400"]},{"name":"Oswald","weight":["200","300","400","500","600","700"]},{"name":"Otomanopee One","weight":["400"]},{"name":"Over the Rainbow","weight":["400"]},{"name":"Overlock","weight":["400","700","900"]},{"name":"Overlock SC","weight":["400"]},{"name":"Overpass","weight":["100","200","300","400","600","700","800","900"]},{"name":"Overpass Mono","weight":["300","400","600","700"]},{"name":"Ovo","weight":["400"]},{"name":"Oxanium","weight":["200","300","400","500","600","700","800"]},{"name":"Oxygen","weight":["300","400","700"]},{"name":"Oxygen Mono","weight":["400"]},{"name":"PT Mono","weight":["400"]},{"name":"PT Sans","weight":["400","700"]},{"name":"PT Sans Caption","weight":["400","700"]},{"name":"PT Sans Narrow","weight":["400","700"]},{"name":"PT Serif","weight":["400","700"]},{"name":"PT Serif Caption","weight":["400"]},{"name":"Pacifico","weight":["400"]},{"name":"Padauk","weight":["400","700"]},{"name":"Palanquin","weight":["100","200","300","400","500","600","700"]},{"name":"Palanquin Dark","weight":["400","500","600","700"]},{"name":"Palette Mosaic","weight":["400"]},{"name":"Pangolin","weight":["400"]},{"name":"Paprika","weight":["400"]},{"name":"Parisienne","weight":["400"]},{"name":"Passero One","weight":["400"]},{"name":"Passion One","weight":["400","700","900"]},{"name":"Pathway Gothic One","weight":["400"]},{"name":"Patrick Hand","weight":["400"]},{"name":"Patrick Hand SC","weight":["400"]},{"name":"Pattaya","weight":["400"]},{"name":"Patua One","weight":["400"]},{"name":"Pavanam","weight":["400"]},{"name":"Paytone One","weight":["400"]},{"name":"Peddana","weight":["400"]},{"name":"Peralta","weight":["400"]},{"name":"Permanent Marker","weight":["400"]},{"name":"Petit Formal Script","weight":["400"]},{"name":"Petrona","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Philosopher","weight":["400","700"]},{"name":"Piazzolla","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Piedra","weight":["400"]},{"name":"Pinyon Script","weight":["400"]},{"name":"Pirata One","weight":["400"]},{"name":"Plaster","weight":["400"]},{"name":"Play","weight":["400","700"]},{"name":"Playball","weight":["400"]},{"name":"Playfair Display","weight":["400","500","600","700","800","900"]},{"name":"Playfair Display SC","weight":["400","700","900"]},{"name":"Podkova","weight":["400","500","600","700","800"]},{"name":"Poiret One","weight":["400"]},{"name":"Poller One","weight":["400"]},{"name":"Poly","weight":["400"]},{"name":"Pompiere","weight":["400"]},{"name":"Pontano Sans","weight":["400"]},{"name":"Poor Story","weight":["400"]},{"name":"Poppins","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Port Lligat Sans","weight":["400"]},{"name":"Port Lligat Slab","weight":["400"]},{"name":"Potta One","weight":["400"]},{"name":"Pragati Narrow","weight":["400","700"]},{"name":"Prata","weight":["400"]},{"name":"Preahvihear","weight":["400"]},{"name":"Press Start 2P","weight":["400"]},{"name":"Pridi","weight":["200","300","400","500","600","700"]},{"name":"Princess Sofia","weight":["400"]},{"name":"Prociono","weight":["400"]},{"name":"Prompt","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Prosto One","weight":["400"]},{"name":"Proza Libre","weight":["400","500","600","700","800"]},{"name":"Public Sans","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Puritan","weight":["400","700"]},{"name":"Purple Purse","weight":["400"]},{"name":"Qahiri","weight":["400"]},{"name":"Quando","weight":["400"]},{"name":"Quantico","weight":["400","700"]},{"name":"Quattrocento","weight":["400","700"]},{"name":"Quattrocento Sans","weight":["400","700"]},{"name":"Questrial","weight":["400"]},{"name":"Quicksand","weight":["300","400","500","600","700"]},{"name":"Quintessential","weight":["400"]},{"name":"Qwigley","weight":["400"]},{"name":"Racing Sans One","weight":["400"]},{"name":"Radley","weight":["400"]},{"name":"Rajdhani","weight":["300","400","500","600","700"]},{"name":"Rakkas","weight":["400"]},{"name":"Raleway","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Raleway Dots","weight":["400"]},{"name":"Ramabhadra","weight":["400"]},{"name":"Ramaraja","weight":["400"]},{"name":"Rambla","weight":["400","700"]},{"name":"Rammetto One","weight":["400"]},{"name":"Rampart One","weight":["400"]},{"name":"Ranchers","weight":["400"]},{"name":"Rancho","weight":["400"]},{"name":"Ranga","weight":["400","700"]},{"name":"Rasa","weight":["300","400","500","600","700"]},{"name":"Rationale","weight":["400"]},{"name":"Ravi Prakash","weight":["400"]},{"name":"Recursive","weight":["300","400","500","600","700","800","900"]},{"name":"Red Hat Display","weight":["300","400","500","600","700","800","900"]},{"name":"Red Hat Text","weight":["300","400","500","600","700"]},{"name":"Red Rose","weight":["300","400","500","600","700"]},{"name":"Redressed","weight":["400"]},{"name":"Reem Kufi","weight":["400","500","600","700"]},{"name":"Reenie Beanie","weight":["400"]},{"name":"Reggae One","weight":["400"]},{"name":"Revalia","weight":["400"]},{"name":"Rhodium Libre","weight":["400"]},{"name":"Ribeye","weight":["400"]},{"name":"Ribeye Marrow","weight":["400"]},{"name":"Righteous","weight":["400"]},{"name":"Risque","weight":["400"]},{"name":"Roboto","weight":["100","300","400","500","700","900"]},{"name":"Roboto Condensed","weight":["300","400","700"]},{"name":"Roboto Mono","weight":["100","200","300","400","500","600","700"]},{"name":"Roboto Slab","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Rochester","weight":["400"]},{"name":"Rock Salt","weight":["400"]},{"name":"RocknRoll One","weight":["400"]},{"name":"Rokkitt","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Romanesco","weight":["400"]},{"name":"Ropa Sans","weight":["400"]},{"name":"Rosario","weight":["300","400","500","600","700"]},{"name":"Rosarivo","weight":["400"]},{"name":"Rouge Script","weight":["400"]},{"name":"Rowdies","weight":["300","400","700"]},{"name":"Rozha One","weight":["400"]},{"name":"Rubik","weight":["300","400","500","600","700","800","900"]},{"name":"Rubik Beastly","weight":["400"]},{"name":"Rubik Mono One","weight":["400"]},{"name":"Ruda","weight":["400","500","600","700","800","900"]},{"name":"Rufina","weight":["400","700"]},{"name":"Ruge Boogie","weight":["400"]},{"name":"Ruluko","weight":["400"]},{"name":"Rum Raisin","weight":["400"]},{"name":"Ruslan Display","weight":["400"]},{"name":"Russo One","weight":["400"]},{"name":"Ruthie","weight":["400"]},{"name":"Rye","weight":["400"]},{"name":"STIX Two Text","weight":["400","500","600","700"]},{"name":"Sacramento","weight":["400"]},{"name":"Sahitya","weight":["400","700"]},{"name":"Sail","weight":["400"]},{"name":"Saira","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Saira Condensed","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Saira Extra Condensed","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Saira Semi Condensed","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Saira Stencil One","weight":["400"]},{"name":"Salsa","weight":["400"]},{"name":"Sanchez","weight":["400"]},{"name":"Sancreek","weight":["400"]},{"name":"Sansita","weight":["400","700","800","900"]},{"name":"Sansita Swashed","weight":["300","400","500","600","700","800","900"]},{"name":"Sarabun","weight":["100","200","300","400","500","600","700","800"]},{"name":"Sarala","weight":["400","700"]},{"name":"Sarina","weight":["400"]},{"name":"Sarpanch","weight":["400","500","600","700","800","900"]},{"name":"Satisfy","weight":["400"]},{"name":"Sawarabi Gothic","weight":["400"]},{"name":"Sawarabi Mincho","weight":["400"]},{"name":"Scada","weight":["400","700"]},{"name":"Scheherazade","weight":["400","700"]},{"name":"Scheherazade New","weight":["400","700"]},{"name":"Schoolbell","weight":["400"]},{"name":"Scope One","weight":["400"]},{"name":"Seaweed Script","weight":["400"]},{"name":"Secular One","weight":["400"]},{"name":"Sedgwick Ave","weight":["400"]},{"name":"Sedgwick Ave Display","weight":["400"]},{"name":"Sen","weight":["400","700","800"]},{"name":"Sevillana","weight":["400"]},{"name":"Seymour One","weight":["400"]},{"name":"Shadows Into Light","weight":["400"]},{"name":"Shadows Into Light Two","weight":["400"]},{"name":"Shanti","weight":["400"]},{"name":"Share","weight":["400","700"]},{"name":"Share Tech","weight":["400"]},{"name":"Share Tech Mono","weight":["400"]},{"name":"Shippori Mincho","weight":["400","500","600","700","800"]},{"name":"Shippori Mincho B1","weight":["400","500","600","700","800"]},{"name":"Shojumaru","weight":["400"]},{"name":"Short Stack","weight":["400"]},{"name":"Shrikhand","weight":["400"]},{"name":"Siemreap","weight":["400"]},{"name":"Sigmar One","weight":["400"]},{"name":"Signika","weight":["300","400","500","600","700"]},{"name":"Signika Negative","weight":["300","400","600","700"]},{"name":"Simonetta","weight":["400","900"]},{"name":"Single Day","weight":["400"]},{"name":"Sintony","weight":["400","700"]},{"name":"Sirin Stencil","weight":["400"]},{"name":"Six Caps","weight":["400"]},{"name":"Skranji","weight":["400","700"]},{"name":"Slabo 13px","weight":["400"]},{"name":"Slabo 27px","weight":["400"]},{"name":"Slackey","weight":["400"]},{"name":"Smokum","weight":["400"]},{"name":"Smythe","weight":["400"]},{"name":"Sniglet","weight":["400","800"]},{"name":"Snippet","weight":["400"]},{"name":"Snowburst One","weight":["400"]},{"name":"Sofadi One","weight":["400"]},{"name":"Sofia","weight":["400"]},{"name":"Solway","weight":["300","400","500","700","800"]},{"name":"Song Myung","weight":["400"]},{"name":"Sonsie One","weight":["400"]},{"name":"Sora","weight":["100","200","300","400","500","600","700","800"]},{"name":"Sorts Mill Goudy","weight":["400"]},{"name":"Source Code Pro","weight":["200","300","400","500","600","700","900"]},{"name":"Source Sans Pro","weight":["200","300","400","600","700","900"]},{"name":"Source Serif Pro","weight":["200","300","400","600","700","900"]},{"name":"Space Grotesk","weight":["300","400","500","600","700"]},{"name":"Space Mono","weight":["400","700"]},{"name":"Spartan","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Special Elite","weight":["400"]},{"name":"Spectral","weight":["200","300","400","500","600","700","800"]},{"name":"Spectral SC","weight":["200","300","400","500","600","700","800"]},{"name":"Spicy Rice","weight":["400"]},{"name":"Spinnaker","weight":["400"]},{"name":"Spirax","weight":["400"]},{"name":"Squada One","weight":["400"]},{"name":"Sree Krushnadevaraya","weight":["400"]},{"name":"Sriracha","weight":["400"]},{"name":"Srisakdi","weight":["400","700"]},{"name":"Staatliches","weight":["400"]},{"name":"Stalemate","weight":["400"]},{"name":"Stalinist One","weight":["400"]},{"name":"Stardos Stencil","weight":["400","700"]},{"name":"Stick","weight":["400"]},{"name":"Stick No Bills","weight":["200","300","400","500","600","700","800"]},{"name":"Stint Ultra Condensed","weight":["400"]},{"name":"Stint Ultra Expanded","weight":["400"]},{"name":"Stoke","weight":["300","400"]},{"name":"Strait","weight":["400"]},{"name":"Style Script","weight":["400"]},{"name":"Stylish","weight":["400"]},{"name":"Sue Ellen Francisco","weight":["400"]},{"name":"Suez One","weight":["400"]},{"name":"Sulphur Point","weight":["300","400","700"]},{"name":"Sumana","weight":["400","700"]},{"name":"Sunflower","weight":["300","500","700"]},{"name":"Sunshiney","weight":["400"]},{"name":"Supermercado One","weight":["400"]},{"name":"Sura","weight":["400","700"]},{"name":"Suranna","weight":["400"]},{"name":"Suravaram","weight":["400"]},{"name":"Suwannaphum","weight":["100","300","400","700","900"]},{"name":"Swanky and Moo Moo","weight":["400"]},{"name":"Syncopate","weight":["400","700"]},{"name":"Syne","weight":["400","500","600","700","800"]},{"name":"Syne Mono","weight":["400"]},{"name":"Syne Tactile","weight":["400"]},{"name":"Tajawal","weight":["200","300","400","500","700","800","900"]},{"name":"Tangerine","weight":["400","700"]},{"name":"Taprom","weight":["400"]},{"name":"Tauri","weight":["400"]},{"name":"Taviraj","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Teko","weight":["300","400","500","600","700"]},{"name":"Telex","weight":["400"]},{"name":"Tenali Ramakrishna","weight":["400"]},{"name":"Tenor Sans","weight":["400"]},{"name":"Text Me One","weight":["400"]},{"name":"Texturina","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Thasadith","weight":["400","700"]},{"name":"The Girl Next Door","weight":["400"]},{"name":"Tienne","weight":["400","700","900"]},{"name":"Tillana","weight":["400","500","600","700","800"]},{"name":"Timmana","weight":["400"]},{"name":"Tinos","weight":["400","700"]},{"name":"Titan One","weight":["400"]},{"name":"Titillium Web","weight":["200","300","400","600","700","900"]},{"name":"Tomorrow","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Tourney","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Trade Winds","weight":["400"]},{"name":"Train One","weight":["400"]},{"name":"Trirong","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Trispace","weight":["100","200","300","400","500","600","700","800"]},{"name":"Trocchi","weight":["400"]},{"name":"Trochut","weight":["400","700"]},{"name":"Truculenta","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Trykker","weight":["400"]},{"name":"Tulpen One","weight":["400"]},{"name":"Turret Road","weight":["200","300","400","500","700","800"]},{"name":"Ubuntu","weight":["300","400","500","700"]},{"name":"Ubuntu Condensed","weight":["400"]},{"name":"Ubuntu Mono","weight":["400","700"]},{"name":"Uchen","weight":["400"]},{"name":"Ultra","weight":["400"]},{"name":"Uncial Antiqua","weight":["400"]},{"name":"Underdog","weight":["400"]},{"name":"Unica One","weight":["400"]},{"name":"UnifrakturCook","weight":["700"]},{"name":"UnifrakturMaguntia","weight":["400"]},{"name":"Unkempt","weight":["400","700"]},{"name":"Unlock","weight":["400"]},{"name":"Unna","weight":["400","700"]},{"name":"Urbanist","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"VT323","weight":["400"]},{"name":"Vampiro One","weight":["400"]},{"name":"Varela","weight":["400"]},{"name":"Varela Round","weight":["400"]},{"name":"Varta","weight":["300","400","500","600","700"]},{"name":"Vast Shadow","weight":["400"]},{"name":"Vesper Libre","weight":["400","500","700","900"]},{"name":"Viaoda Libre","weight":["400"]},{"name":"Vibes","weight":["400"]},{"name":"Vibur","weight":["400"]},{"name":"Vidaloka","weight":["400"]},{"name":"Viga","weight":["400"]},{"name":"Voces","weight":["400"]},{"name":"Volkhov","weight":["400","700"]},{"name":"Vollkorn","weight":["400","500","600","700","800","900"]},{"name":"Vollkorn SC","weight":["400","600","700","900"]},{"name":"Voltaire","weight":["400"]},{"name":"Waiting for the Sunrise","weight":["400"]},{"name":"Wallpoet","weight":["400"]},{"name":"Walter Turncoat","weight":["400"]},{"name":"Warnes","weight":["400"]},{"name":"Wellfleet","weight":["400"]},{"name":"Wendy One","weight":["400"]},{"name":"WindSong","weight":["400","500"]},{"name":"Wire One","weight":["400"]},{"name":"Work Sans","weight":["100","200","300","400","500","600","700","800","900"]},{"name":"Xanh Mono","weight":["400"]},{"name":"Yaldevi","weight":["200","300","400","500","600","700"]},{"name":"Yanone Kaffeesatz","weight":["200","300","400","500","600","700"]},{"name":"Yantramanav","weight":["100","300","400","500","700","900"]},{"name":"Yatra One","weight":["400"]},{"name":"Yellowtail","weight":["400"]},{"name":"Yeon Sung","weight":["400"]},{"name":"Yeseva One","weight":["400"]},{"name":"Yesteryear","weight":["400"]},{"name":"Yomogi","weight":["400"]},{"name":"Yrsa","weight":["300","400","500","600","700"]},{"name":"Yusei Magic","weight":["400"]},{"name":"ZCOOL KuaiLe","weight":["400"]},{"name":"ZCOOL QingKe HuangYou","weight":["400"]},{"name":"ZCOOL XiaoWei","weight":["400"]},{"name":"Zen Antique","weight":["400"]},{"name":"Zen Antique Soft","weight":["400"]},{"name":"Zen Dots","weight":["400"]},{"name":"Zen Kaku Gothic Antique","weight":["300","400","500","700","900"]},{"name":"Zen Kaku Gothic New","weight":["300","400","500","700","900"]},{"name":"Zen Kurenaido","weight":["400"]},{"name":"Zen Loop","weight":["400"]},{"name":"Zen Maru Gothic","weight":["300","400","500","700","900"]},{"name":"Zen Old Mincho","weight":["400","700","900"]},{"name":"Zen Tokyo Zoo","weight":["400"]},{"name":"Zeyada","weight":["400"]},{"name":"Zhi Mang Xing","weight":["400"]},{"name":"Zilla Slab","weight":["300","400","500","600","700"]},{"name":"Zilla Slab Highlight","weight":["400","700"]}]');

});


parcelRegister("eGTfQ", function(module, exports) {

$parcel$export(module.exports, "PanelPadding", () => $6843f8084917b52b$export$5c27ea9c949c9c3e);

var $lAN3N = parcelRequire("lAN3N");

var $63SH6 = parcelRequire("63SH6");

var $4WfNn = parcelRequire("4WfNn");

var $6ai3B = parcelRequire("6ai3B");

var $3M49X = parcelRequire("3M49X");

var $eW2Jy = parcelRequire("eW2Jy");

var $43Iq0 = parcelRequire("43Iq0");

var $bjM6F = parcelRequire("bjM6F");

var $emJmR = parcelRequire("emJmR");
const $6843f8084917b52b$export$5c27ea9c949c9c3e = ({ id: id, value: value, update: update, mode: mode })=>{
    const detectMixed = (v)=>{
        let data = v;
        let corner = [];
        (0, (/*@__PURE__*/$parcel$interopDefault($eW2Jy)))(data, (r, v, k)=>{
            corner.push(v);
        });
        let uniqueCorner = (0, (/*@__PURE__*/$parcel$interopDefault($43Iq0)))(corner);
        if (uniqueCorner.length > 1 && corner.length === 4) return {
            isMix: true,
            value: "Mixed"
        };
        return {
            isMix: false,
            value: uniqueCorner[0] + ""
        };
    };
    const local = (0, $4WfNn.useLocal)({
        id: id,
        all: false
    }, ()=>{
        let mix = detectMixed(padding);
        local.all = mix.isMix;
        local.render();
    });
    const padding = (0, $bjM6F.responsiveVal)(value, "padding", mode, {
        l: 0,
        b: 0,
        t: 0,
        r: 0
    });
    (0, $63SH6.useEffect)(()=>{
        if (local.id !== id) {
            local.id = id;
            if (!local.all) {
                if (padding.l !== padding.r || padding.b !== padding.t) {
                    local.all = true;
                    local.render();
                }
            } else if (local.all) {
                if (padding.l === padding.r && padding.b === padding.t) {
                    local.all = false;
                    local.render();
                }
            }
        }
    }, [
        id
    ]);
    return /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
        className: "flex flex-col space-y-2",
        children: [
            /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                className: cx("flex items-stretch justify-between text-xs ", css`
            .field-num {
              height: 25px;
              border: 1px solid #d1d1d1;
              width: 74px !important;
            }
          `),
                children: [
                    !local.all && /*#__PURE__*/ (0, $lAN3N.jsxs)((0, $lAN3N.Fragment), {
                        children: [
                            /*#__PURE__*/ (0, $lAN3N.jsx)((0, $emJmR.Tooltip), {
                                asChild: true,
                                content: "Horizontal Padding",
                                children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                    children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $3M49X.FieldNumUnit), {
                                        positiveOnly: true,
                                        hideUnit: true,
                                        icon: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                            className: "w-[22px] h-[14px] flex items-center justify-center  border-r border-gray-300 mr-1",
                                            children: /*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
                                                width: 12,
                                                height: 12,
                                                xmlns: "http://www.w3.org/2000/svg",
                                                children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                                                    d: "M0 12V0h1v12H0zm3-9h6v6H3V3zm1 1v4h4V4H4zm7 8V0h1v12h-1z",
                                                    fillRule: "evenodd",
                                                    fill: "#000"
                                                })
                                            })
                                        }),
                                        value: padding.l + "px",
                                        update: (val)=>{
                                            update("padding", {
                                                ...padding,
                                                l: parseInt(val.replaceAll("px", "")),
                                                r: parseInt(val.replaceAll("px", ""))
                                            });
                                        }
                                    })
                                })
                            }),
                            /*#__PURE__*/ (0, $lAN3N.jsx)((0, $emJmR.Tooltip), {
                                asChild: true,
                                content: "Vertical Padding",
                                children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                    children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $3M49X.FieldNumUnit), {
                                        positiveOnly: true,
                                        hideUnit: true,
                                        icon: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                            className: "w-[22px] h-[14px] flex items-center justify-center  border-r border-gray-300 mr-1",
                                            children: /*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
                                                width: 12,
                                                height: 12,
                                                xmlns: "http://www.w3.org/2000/svg",
                                                children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                                                    d: "M3 3h6v6H3V3zm1 1v4h4V4H4zm8 8H0v-1h12v1zm0-11H0V0h12v1z",
                                                    fillRule: "evenodd",
                                                    fill: "#000"
                                                })
                                            })
                                        }),
                                        value: padding.t + "px",
                                        update: (val)=>{
                                            update("padding", {
                                                ...padding,
                                                t: parseInt(val.replaceAll("px", "")),
                                                b: parseInt(val.replaceAll("px", ""))
                                            });
                                        }
                                    })
                                })
                            })
                        ]
                    }),
                    local.all && /*#__PURE__*/ (0, $lAN3N.jsxs)((0, $lAN3N.Fragment), {
                        children: [
                            /*#__PURE__*/ (0, $lAN3N.jsx)((0, $emJmR.Tooltip), {
                                asChild: true,
                                content: "Left Padding",
                                children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                    children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $3M49X.FieldNumUnit), {
                                        positiveOnly: true,
                                        hideUnit: true,
                                        icon: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                            className: "w-[22px] h-[14px] flex items-center justify-center  border-r border-gray-300 mr-1",
                                            children: /*#__PURE__*/ (0, $lAN3N.jsx)($6843f8084917b52b$var$ArrowLeft, {})
                                        }),
                                        value: padding.l + "px",
                                        update: (val)=>{
                                            update("padding", {
                                                ...padding,
                                                l: parseInt(val.replaceAll("px", ""))
                                            });
                                        }
                                    })
                                })
                            }),
                            /*#__PURE__*/ (0, $lAN3N.jsx)((0, $emJmR.Tooltip), {
                                asChild: true,
                                content: "Right Padding",
                                children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                    children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $3M49X.FieldNumUnit), {
                                        positiveOnly: true,
                                        hideUnit: true,
                                        icon: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                            className: "w-[22px] h-[14px] flex items-center justify-center  border-r border-gray-300 mr-1",
                                            children: /*#__PURE__*/ (0, $lAN3N.jsx)($6843f8084917b52b$var$ArrowRight, {})
                                        }),
                                        value: padding.r + "px",
                                        update: (val)=>{
                                            update("padding", {
                                                ...padding,
                                                r: parseInt(val.replaceAll("px", ""))
                                            });
                                        }
                                    })
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0, $lAN3N.jsx)((0, $emJmR.Tooltip), {
                        asChild: true,
                        content: "Toggle Padding",
                        placement: "top-end",
                        children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                            children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $6ai3B.Button), {
                                className: cx("flex-1", css`
                  width: 30px;
                  max-width: 30px;
                  min-width: 0px !important;
                  background: ${local.all ? "#3c82f6" : "#fff"} !important;
                  border-color: ${local.all ? "#7baeff" : "#d1d1d1"} !important;
                `),
                                onClick: ()=>{
                                    local.all = !local.all;
                                    local.render();
                                },
                                children: /*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
                                    width: 12,
                                    height: 12,
                                    xmlns: "http://www.w3.org/2000/svg",
                                    children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                                        d: "M3 0h6v1H3V0zM0 3v6h1V3H0zm11 0v6h1V3h-1zm-8 9h6v-1H3v1z",
                                        fillRule: "evenodd",
                                        fillOpacity: 0.8,
                                        fill: local.all ? "#fff" : "#000"
                                    })
                                })
                            })
                        })
                    })
                ]
            }),
            local.all && /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                className: cx("flex items-stretch justify-between text-xs ", css`
              .field-num {
                height: 25px;
                border: 1px solid #d1d1d1;
                width: 74px !important;
              }
            `),
                children: [
                    local.all && /*#__PURE__*/ (0, $lAN3N.jsxs)((0, $lAN3N.Fragment), {
                        children: [
                            /*#__PURE__*/ (0, $lAN3N.jsx)((0, $emJmR.Tooltip), {
                                asChild: true,
                                content: "Top Padding",
                                children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                    children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $3M49X.FieldNumUnit), {
                                        positiveOnly: true,
                                        hideUnit: true,
                                        icon: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                            className: "w-[22px] h-[14px] flex items-center justify-center  border-r border-gray-300 mr-1",
                                            children: /*#__PURE__*/ (0, $lAN3N.jsx)($6843f8084917b52b$var$ArrowUp, {})
                                        }),
                                        value: padding.t + "px",
                                        update: (val)=>{
                                            update("padding", {
                                                ...padding,
                                                t: parseInt(val.replaceAll("px", ""))
                                            });
                                        }
                                    })
                                })
                            }),
                            /*#__PURE__*/ (0, $lAN3N.jsx)((0, $emJmR.Tooltip), {
                                asChild: true,
                                content: "Bottom Padding",
                                children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                    children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $3M49X.FieldNumUnit), {
                                        positiveOnly: true,
                                        hideUnit: true,
                                        icon: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                            className: "w-[22px] h-[14px] flex items-center justify-center  border-r border-gray-300 mr-1",
                                            children: /*#__PURE__*/ (0, $lAN3N.jsx)($6843f8084917b52b$var$ArrowDown, {})
                                        }),
                                        value: padding.b + "px",
                                        update: (val)=>{
                                            update("padding", {
                                                ...padding,
                                                b: parseInt(val.replaceAll("px", ""))
                                            });
                                        }
                                    })
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                        className: cx("flex-1", css`
                width: 30px;
                max-width: 30px;
                min-width: 0px !important;
              `)
                    })
                ]
            })
        ]
    });
};
const $6843f8084917b52b$var$ArrowLeft = ()=>/*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "15",
        height: "15",
        fill: "none",
        viewBox: "0 0 15 15",
        children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
            fill: "currentColor",
            fillRule: "evenodd",
            d: "M6.854 3.146a.5.5 0 010 .708L3.707 7H12.5a.5.5 0 010 1H3.707l3.147 3.146a.5.5 0 01-.708.708l-4-4a.5.5 0 010-.708l4-4a.5.5 0 01.708 0z",
            clipRule: "evenodd"
        })
    });
const $6843f8084917b52b$var$ArrowRight = ()=>/*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "15",
        height: "15",
        fill: "none",
        viewBox: "0 0 15 15",
        children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
            fill: "currentColor",
            fillRule: "evenodd",
            d: "M8.146 3.146a.5.5 0 01.708 0l4 4a.5.5 0 010 .708l-4 4a.5.5 0 01-.708-.708L11.293 8H2.5a.5.5 0 010-1h8.793L8.146 3.854a.5.5 0 010-.708z",
            clipRule: "evenodd"
        })
    });
const $6843f8084917b52b$var$ArrowDown = ()=>/*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "15",
        height: "15",
        fill: "none",
        viewBox: "0 0 15 15",
        children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
            fill: "currentColor",
            fillRule: "evenodd",
            d: "M7.5 2a.5.5 0 01.5.5v8.793l3.146-3.147a.5.5 0 01.708.708l-4 4a.5.5 0 01-.708 0l-4-4a.5.5 0 11.708-.708L7 11.293V2.5a.5.5 0 01.5-.5z",
            clipRule: "evenodd"
        })
    });
const $6843f8084917b52b$var$ArrowUp = ()=>/*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "15",
        height: "15",
        fill: "none",
        viewBox: "0 0 15 15",
        children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
            fill: "currentColor",
            fillRule: "evenodd",
            d: "M7.146 2.146a.5.5 0 01.708 0l4 4a.5.5 0 01-.708.708L8 3.707V12.5a.5.5 0 01-1 0V3.707L3.854 6.854a.5.5 0 11-.708-.708l4-4z",
            clipRule: "evenodd"
        })
    });

});

parcelRegister("gYVef", function(module, exports) {

$parcel$export(module.exports, "CPInstance", () => $ca04eee3c1de61aa$export$53de1512c4728bbc);

var $lAN3N = parcelRequire("lAN3N");

var $63SH6 = parcelRequire("63SH6");

var $4WfNn = parcelRequire("4WfNn");

var $0t7p0 = parcelRequire("0t7p0");

var $1CiVi = parcelRequire("1CiVi");

var $emJmR = parcelRequire("emJmR");

var $5NYeV = parcelRequire("5NYeV");

var $eoQBx = parcelRequire("eoQBx");

var $8u89v = parcelRequire("8u89v");

var $6QgH2 = parcelRequire("6QgH2");

var $ax46r = parcelRequire("ax46r");

var $i8e1B = parcelRequire("i8e1B");

var $fy4Kd = parcelRequire("fy4Kd");

var $3KK1E = parcelRequire("3KK1E");

var $18ruq = parcelRequire("18ruq");

var $j8xVm = parcelRequire("j8xVm");
const $ca04eee3c1de61aa$export$53de1512c4728bbc = ({ mitem: mitem })=>{
    const p = (0, $4WfNn.useGlobal)((0, $eoQBx.EditorGlobal), "EDITOR");
    const local = (0, $4WfNn.useLocal)({
        status: "loading",
        mprops: null,
        props: {},
        jsx: false
    });
    const compid = mitem.get("component")?.get("id") || "";
    const comp = p.comps.doc[compid];
    (0, $63SH6.useEffect)(()=>{
        (async ()=>{
            local.status = "loading";
            local.render();
            if (comp) {
                const cprops = comp.getMap("map").get("content_tree")?.get("component")?.get("props")?.toJSON();
                const mprops = mitem.get("component")?.get("props");
                if (!mprops) {
                    local.status = "ERROR: Item not found.";
                    local.render();
                    return;
                } else if (cprops) {
                    local.mprops = mprops;
                    const props = {};
                    for (const [k, v] of Object.entries(cprops)){
                        props[k] = v;
                        const prop = mprops.get(k);
                        if (prop) {
                            props[k].value = prop.get("value");
                            props[k].valueBuilt = prop.get("valueBuilt");
                        } else mprops.set(k, (0, $6QgH2.newMap)(v));
                    }
                    local.props = props;
                    local.render();
                }
            }
            if (!(0, $ax46r.jscript).build) (0, $ax46r.jscript).init().then(()=>{
                local.status = "ready";
                local.render();
            });
            else {
                local.status = "ready";
                local.render();
            }
        })();
    }, [
        mitem
    ]);
    if (!comp) {
        (0, $5NYeV.loadComponent)(p, compid).then(local.render);
        return /*#__PURE__*/ (0, $lAN3N.jsx)((0, $1CiVi.Loading), {
            note: "cp-comp",
            backdrop: false
        });
    }
    if (local.status === "loading") return /*#__PURE__*/ (0, $lAN3N.jsx)((0, $1CiVi.Loading), {
        note: "cp-instance",
        backdrop: false
    });
    if (local.status !== "ready") /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
        className: "flex flex-col flex-1",
        children: local.status
    });
    return /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
        className: "flex flex-col flex-1",
        children: [
            /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                className: "border-b bg-white flex justify-between items-center",
                children: [
                    /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                        className: "text-[10px] select-none text-slate-400 pl-1 py-1",
                        children: "PROPS"
                    }),
                    /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                        className: "flex mr-1 px-2 bg-white text-xs border rounded-sm cursor-pointer hover:bg-blue-50 hover:border-blue-500 text-blue-700 space-x-1",
                        onClick: ()=>{
                            const meta = p.treeMeta[p.item.active];
                            if (meta) {
                                p.compProp.edit = true;
                                p.compProp.backToInstance = true;
                                (0, $5NYeV.editComp)(p, meta.item.id);
                            }
                        },
                        children: [
                            /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                children: "Edit Prop:"
                            }),
                            /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                className: "text-ellipsis font-bold",
                                children: mitem.get("name")
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                className: "flex-1 relative overflow-y-auto",
                children: /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                    className: "absolute flex-col inset-0",
                    children: [
                        Object.entries(local.props).sort((a, b)=>{
                            return a[1].idx - b[1].idx;
                        }).map(([k, v])=>{
                            let mprop = local.mprops.get(k);
                            if (mprop) {
                                if (!local.jsx && v.meta?.type === "content-element") return;
                                let visible = true;
                                const meta = p.treeMeta[p.item.active];
                                if (v.visible && meta) {
                                    const propvis = meta.comp?.propvis;
                                    if (propvis) visible = propvis[k];
                                }
                                if (visible) return /*#__PURE__*/ (0, $lAN3N.jsx)($ca04eee3c1de61aa$var$SingleProp, {
                                    name: k,
                                    prop: v,
                                    mprop: mprop,
                                    mprops: local.mprops,
                                    comp: comp,
                                    render: p.render,
                                    p: p
                                }, k);
                            }
                        }),
                        /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                            className: "p-2 flex items-center justify-center space-x-2",
                            children: /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                                className: "bg-white border rounded px-3 text-xs cursor-pointer hover:bg-blue-100 active:bg-blue-500 active:text-white",
                                onClick: ()=>{
                                    local.jsx = !local.jsx;
                                    local.render();
                                },
                                children: [
                                    local.jsx ? "Hide" : "Show",
                                    " JSX"
                                ]
                            })
                        })
                    ]
                })
            })
        ]
    });
};
const $ca04eee3c1de61aa$var$SingleProp = ({ name: name, prop: _prop, mprop: mprop, mprops: mprops, render: render, comp: comp, p: p })=>{
    const local = (0, $4WfNn.useLocal)({
        clickEvent: null,
        loading: false,
        editCode: false,
        propval: null
    });
    const type = _prop.meta?.type || "text";
    const updateValue = async (val)=>{
        if ((0, $ax46r.jscript).build) {
            const res = await (0, $ax46r.jscript).build("prop [" + name + "]    -> .tsx", `return ${val}`, undefined, true);
            let js = val;
            let jsBuilt = res.substring(6);
            mprop.doc?.transact(()=>{
                mprop.set("value", val);
                mprop.set("valueBuilt", res.substring(6));
            });
            const meta = p.treeMeta[p.item.active];
            if (meta.item.type === "item" && meta.item.component) {
                meta.item.component.props[name].value = js;
                meta.item.component.props[name].valueBuilt = jsBuilt;
            }
            (0, $8u89v.rebuildTree)(p, {
                mode: "update",
                note: "update-props"
            });
        }
    };
    const reset = ()=>{
        const propVal = comp.getMap("map").get("content_tree")?.get("component")?.get("props")?.get(name)?.toJSON();
        if (propVal) {
            mprop.doc?.transact(()=>{
                mprop.set("value", propVal.value);
                mprop.set("valueBuilt", propVal.valueBuilt);
            });
            _prop.value = propVal.value;
            _prop.valueBuilt = propVal.valueBuilt;
            local.loading = true;
            render();
            setTimeout(()=>{
                local.loading = false;
                render();
            }, 100);
        }
    };
    let prop = comp.getMap("map").get("content_tree")?.get("component")?.get("props")?.get(name)?.toJSON();
    let notExists = false;
    if (prop) {
        prop.value = mprop.get("value");
        prop.valueBuilt = mprop.get("valueBuilt");
    } else {
        prop = _prop;
        notExists = true;
    }
    const editCode = (onClose)=>{
        local.editCode = true;
        p.script.active = true;
        p.script.prop = {
            name: name,
            mode: "instance"
        };
        const DEFAULT = `\
async () => {
  return \`""\`
}`;
        if (prop.gen && prop.genBuilt && prop.gen.replace(/\W/g, "") !== DEFAULT.replace(/\W/g, "")) p.script.toolbar = /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
            className: "bg-blue-500 hover:bg-blue-300 cursor-pointer text-white rounded-sm flex items-center px-2",
            onClick: async ()=>{
                const meta = p.treeMeta[p.item.active];
                if (prop.genBuilt && meta && p.script.doEdit) try {
                    const propEval = (0, $j8xVm.treePropEval)(p, meta, Object.entries(mprops.toJSON()));
                    const scopes = (0, $18ruq.mergeScopeUpwards)(p, meta);
                    let args = {
                        ...window.exports,
                        ...scopes,
                        db: p.script.db,
                        api: p.script.api,
                        ...propEval
                    };
                    const fn = new Function(...Object.keys(args), `return ${prop.genBuilt}`);
                    const efn = fn(...Object.values(args));
                    let result = "";
                    if (typeof efn === "function") {
                        const promise = efn();
                        if (promise && promise instanceof Promise) result = await promise;
                        else result = promise;
                    }
                    if (typeof result === "string") p.script.doEdit(result, true);
                } catch (e) {
                    console.log(e);
                }
            },
            children: "Generate"
        });
        p.script.onClose = ()=>{
            p.script.prop = null;
            if (typeof onClose === "function") onClose();
            local.editCode = false;
            local.render();
        };
        p.render();
    };
    return /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
        onContextMenu: (e)=>{
            e.preventDefault();
            local.clickEvent = e;
            local.render();
        },
        className: cx("border-b bg-white hover:bg-orange-50 flex flex-col items-stretch"),
        children: [
            local.clickEvent && /*#__PURE__*/ (0, $lAN3N.jsxs)((0, $0t7p0.Menu), {
                mouseEvent: local.clickEvent,
                onClose: ()=>{
                    local.clickEvent = null;
                    local.render();
                },
                children: [
                    /*#__PURE__*/ (0, $lAN3N.jsx)((0, $0t7p0.MenuItem), {
                        label: "Reset",
                        onClick: reset
                    }),
                    /*#__PURE__*/ (0, $lAN3N.jsx)((0, $0t7p0.MenuItem), {
                        label: "Edit Code",
                        onClick: ()=>{
                            editCode();
                        }
                    })
                ]
            }),
            /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                className: "flex justify-between items-stretch relative",
                children: [
                    (()=>{
                        const label = /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                            className: cx("border-l-2 border-transparent cursor-pointer pr-3 flex items-center w-[60px] overflow-hidden relative min-h-[25px]", local.clickEvent ? "bg-orange-500 text-white" : " ", css`
                  .absolute {
                    max-width: 55px;
                    overflow: hidden;
                  }
                  &:hover {
                    overflow: visible;

                    .absolute {
                      max-width: 150px;
                      background: white;
                      border: 1px solid #f1c2a7;
                      margin: -1px;
                    }

                    &.text-white .absolute {
                      background: #f97315;
                      border: 0px;
                      margin: 0px;
                    }
                  }
                `),
                            onClick: (e)=>{
                                if (local.clickEvent) local.clickEvent = null;
                                else local.clickEvent = e;
                                local.render();
                            },
                            children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                className: "absolute px-1",
                                children: name
                            })
                        });
                        return /*#__PURE__*/ (0, $lAN3N.jsx)((0, $lAN3N.Fragment), {
                            children: local.editCode ? /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                className: "bg-orange-500 text-white px-2 flex items-center absolute inset-0",
                                children: name
                            }) : label
                        });
                    })(),
                    local.loading ? /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                        className: "flex items-stretch flex-1",
                        children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                            className: "min-h-[30px]"
                        })
                    }) : /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                        className: "flex items-stretch flex-1",
                        children: [
                            type === "content-element" && /*#__PURE__*/ (0, $lAN3N.jsx)((0, $i8e1B.CPJsx), {
                                prop: prop,
                                name: name,
                                onChange: updateValue,
                                editCode: editCode,
                                reset: reset
                            }),
                            type === "text" && /*#__PURE__*/ (0, $lAN3N.jsx)((0, $3KK1E.CPText), {
                                prop: prop,
                                name: name,
                                onChange: updateValue,
                                editCode: editCode,
                                reset: reset
                            }),
                            type === "option" && /*#__PURE__*/ (0, $lAN3N.jsx)((0, $fy4Kd.CPOption), {
                                name: name,
                                prop: prop,
                                onChange: updateValue,
                                editCode: editCode,
                                reset: reset
                            }),
                            notExists && /*#__PURE__*/ (0, $lAN3N.jsx)((0, $emJmR.Tooltip), {
                                content: "Not exist in Master Prop",
                                className: "cursor-pointer flex items-center px-1 border-l text-red-400",
                                onClick: ()=>{
                                    mprops.delete(name);
                                },
                                children: /*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    width: "15",
                                    height: "15",
                                    fill: "none",
                                    viewBox: "0 0 15 15",
                                    children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                                        fill: "currentColor",
                                        fillRule: "evenodd",
                                        d: "M5.5 1a.5.5 0 000 1h4a.5.5 0 000-1h-4zM3 3.5a.5.5 0 01.5-.5h8a.5.5 0 010 1H11v8a1 1 0 01-1 1H5a1 1 0 01-1-1V4h-.5a.5.5 0 01-.5-.5zM5 4h5v8H5V4z",
                                        clipRule: "evenodd"
                                    })
                                })
                            })
                        ]
                    })
                ]
            })
        ]
    });
};

});
parcelRegister("i8e1B", function(module, exports) {

$parcel$export(module.exports, "CPJsx", () => CPJsx);

var $lAN3N = parcelRequire("lAN3N");

var $63SH6 = parcelRequire("63SH6");

var $4WfNn = parcelRequire("4WfNn");

var $3lO1D = parcelRequire("3lO1D");
const CPJsx = ({ name, prop, onChange, editCode, reset })=>{
    const local = (0, $4WfNn.useLocal)({
        value: "",
        codeEditing: false
    });
    (0, $63SH6.useEffect)(()=>{
        if (prop.value) try {
            eval(`local.value = ${prop.valueBuilt}`);
        } catch (e) {}
        else local.value = "";
        local.render();
    }, [
        prop.value,
        prop.valueBuilt
    ]);
    return /*#__PURE__*/ (0, $lAN3N.jsx)((0, $3lO1D.CPCoded), {
        editCode: ()=>{
            local.codeEditing = true;
            local.render();
            editCode(()=>{
                local.codeEditing = false;
                local.render();
            });
        },
        reset: reset
    });
};

});
parcelRegister("3lO1D", function(module, exports) {

$parcel$export(module.exports, "CPCoded", () => $d7b3d9320d153245$export$37d835b2cb70f63);

var $lAN3N = parcelRequire("lAN3N");
const $d7b3d9320d153245$export$37d835b2cb70f63 = ({ editCode: editCode, reset: reset })=>{
    return /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
        className: "flex flex-1 items-stretch justify-end pr-2",
        children: [
            /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                className: "m-1 px-1 bg-white cursor-pointer hover:bg-blue-500 hover:text-white hover:border-blue-500 font-mono border border-slate-300 text-[11px]",
                onClick: ()=>editCode(),
                children: "EDIT CODE"
            }),
            reset && /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                className: "my-1 px-1 bg-white cursor-pointer hover:bg-blue-500 hover:text-white hover:border-blue-500 font-mono border border-slate-300 text-[11px] flex items-center",
                onClick: reset,
                dangerouslySetInnerHTML: {
                    __html: `<svg width="12" height="12" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.85355 2.14645C5.04882 2.34171 5.04882 2.65829 4.85355 2.85355L3.70711 4H9C11.4853 4 13.5 6.01472 13.5 8.5C13.5 10.9853 11.4853 13 9 13H5C4.72386 13 4.5 12.7761 4.5 12.5C4.5 12.2239 4.72386 12 5 12H9C10.933 12 12.5 10.433 12.5 8.5C12.5 6.567 10.933 5 9 5H3.70711L4.85355 6.14645C5.04882 6.34171 5.04882 6.65829 4.85355 6.85355C4.65829 7.04882 4.34171 7.04882 4.14645 6.85355L2.14645 4.85355C1.95118 4.65829 1.95118 4.34171 2.14645 4.14645L4.14645 2.14645C4.34171 1.95118 4.65829 1.95118 4.85355 2.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>`
                }
            })
        ]
    });
};

});


parcelRegister("fy4Kd", function(module, exports) {

$parcel$export(module.exports, "CPOption", () => CPOption);

var $lAN3N = parcelRequire("lAN3N");

var $63SH6 = parcelRequire("63SH6");

var $3lO1D = parcelRequire("3lO1D");

var $4WfNn = parcelRequire("4WfNn");

var $1CiVi = parcelRequire("1CiVi");

var $hVFKL = parcelRequire("hVFKL");

var $eoQBx = parcelRequire("eoQBx");
const CPOption = ({ prop, onChange, editCode, reset })=>{
    const local = (0, $4WfNn.useLocal)({
        codeEditing: false,
        loading: false,
        loaded: false,
        isOpen: false,
        val: "",
        metaFn: null
    });
    const p = (0, $4WfNn.useGlobal)((0, $eoQBx.EditorGlobal), "EDITOR");
    let metaOptions = [];
    if (prop.meta?.options || prop.meta?.optionsBuilt) {
        if (!local.loaded) try {
            const args = {
                ...window.exports,
                db: p.script.db,
                api: p.script.api
            };
            eval(`
${Object.entries(args).map((e11)=>`const ${e11[0]} = args["${e11[0]}"]`).join(";\n")}
const resOpt = ${prop.meta.optionsBuilt || prop.meta.options};
if (typeof resOpt === 'function')  local.metaFn = resOpt;
else metaOptions = resOpt;
`);
        } catch (e) {
            console.error(e);
        }
        else metaOptions = local.loaded;
        if (local.metaFn && !local.loaded && !local.loading) {
            local.loading = true;
            local.metaFn().then((e11)=>{
                local.loading = false;
                local.loaded = e11;
                local.render();
            });
        }
    }
    let evalue = null;
    try {
        eval(`evalue = ${prop.value}`);
    } catch (e) {}
    (0, $63SH6.useEffect)(()=>{
        local.val = evalue;
        local.render();
    }, [
        evalue
    ]);
    if (!local.metaFn && (local.codeEditing || !metaOptions.find((e11)=>{
        return e11.value === evalue;
    }))) return /*#__PURE__*/ (0, $lAN3N.jsx)((0, $3lO1D.CPCoded), {
        editCode: ()=>{
            local.codeEditing = true;
            local.render();
            editCode(()=>{
                local.codeEditing = false;
                local.render();
            });
        },
        reset: reset
    });
    let mode = prop.meta?.option_mode;
    if (!mode) mode = "button";
    return /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
        className: cx("flex items-center flex-wrap space-x-1 justify-end flex-1", mode === "dropdown" ? "max-h-[20px]" : "min-h-[30px]"),
        children: local.loading ? /*#__PURE__*/ (0, $lAN3N.jsx)((0, $1CiVi.Loading), {
            backdrop: false
        }) : /*#__PURE__*/ (0, $lAN3N.jsxs)((0, $lAN3N.Fragment), {
            children: [
                mode === "dropdown" && /*#__PURE__*/ (0, $lAN3N.jsx)((0, $lAN3N.Fragment), {
                    children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $hVFKL.default), {
                        inputValue: local.val,
                        isOpen: local.isOpen,
                        onOuterClick: ()=>{
                            local.isOpen = false;
                            local.render();
                        },
                        onInputValueChange: (e11)=>{
                            local.val = e11;
                            local.isOpen = true;
                            local.render();
                        },
                        onChange: (sel11)=>{
                            if (!sel11) {
                                local.val = evalue;
                                local.isOpen = false;
                                local.render();
                            } else {
                                const val11 = JSON.stringify(sel11.value);
                                local.isOpen = false;
                                onChange(val11);
                            }
                        },
                        itemToString: (item11)=>item11 ? item11.value : "",
                        children: ({ getInputProps: getInputProps11, getItemProps: getItemProps11, getLabelProps: getLabelProps11, getMenuProps: getMenuProps11, isOpen: isOpen11, inputValue: inputValue11, highlightedIndex: highlightedIndex11, selectedItem: selectedItem11, getRootProps: getRootProps11 })=>/*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                                className: "border-l self-stretch",
                                children: [
                                    /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                        style: {
                                            display: "inline-block"
                                        },
                                        ...getRootProps11({}, {
                                            suppressRefError: true
                                        }),
                                        children: /*#__PURE__*/ (0, $lAN3N.jsx)("input", {
                                            ...getInputProps11(),
                                            onFocus: ()=>{
                                                local.val = "";
                                                local.isOpen = true;
                                                local.render();
                                            },
                                            onClick: ()=>{
                                                local.isOpen = true;
                                                local.render();
                                            },
                                            type: "search",
                                            spellCheck: false,
                                            className: "flex-1 self-stretch font-mono border-2 border-transparent outline-none bg-transparent focus:bg-white focus:border-blue-500 border-slate-300 text-[11px] min-h-[25px] pl-1 "
                                        })
                                    }),
                                    /*#__PURE__*/ (0, $lAN3N.jsx)("ul", {
                                        ...getMenuProps11(),
                                        className: "absolute z-10 border right-0 bg-white max-h-[300px] overflow-y-auto overflow-x-hidden",
                                        children: isOpen11 ? metaOptions.filter((item11)=>!inputValue11 || item11.value.includes(inputValue11)).map((item11, index11)=>/*#__PURE__*/ (0, $lAN3N.jsx)("li", {
                                                ...getItemProps11({
                                                    key: item11.value,
                                                    index: index11,
                                                    item: item11
                                                }),
                                                className: cx("min-w-[180px] px-2 py-[2px] border-b", selectedItem11 === item11 && highlightedIndex11 !== index11 && `bg-blue-500 text-white`, highlightedIndex11 === index11 && `bg-blue-200`),
                                                children: item11.label || item11.value
                                            })) : null
                                    })
                                ]
                            })
                    })
                }),
                mode === "button" && /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                    className: "flex-1 pt-1 px-2 flex flex-wrap justify-end space-x-1",
                    children: Array.isArray(metaOptions) && metaOptions.map((item11, idx11)=>{
                        return /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                            className: cx("flex px-2 text-xs mb-1 border rounded-sm cursor-pointer  justify-center ", item11.value !== evalue ? "bg-white  text-blue-700 hover:bg-blue-50 hover:border-blue-500" : "bg-blue-700 text-white border-blue-700"),
                            onClick: ()=>{
                                const val11 = JSON.stringify(item11.value);
                                onChange(val11);
                            },
                            children: item11.label
                        }, idx11);
                    })
                })
            ]
        })
    });
};

});
parcelRegister("hVFKL", function(module, exports) {

$parcel$export(module.exports, "default", () => $d0d825e43d8ba478$export$2e2bcd8739ae039);

var $8WqTz = parcelRequire("8WqTz");

var $uwkDK = parcelRequire("uwkDK");

var $1Nh8o = parcelRequire("1Nh8o");

var $5VaeF = parcelRequire("5VaeF");

var $eu9I7 = parcelRequire("eu9I7");

var $63SH6 = parcelRequire("63SH6");

var $2oqnz = parcelRequire("2oqnz");

var $jybpY = parcelRequire("jybpY");

var $7Dnph = parcelRequire("7Dnph");
var $d0d825e43d8ba478$var$idCounter = 0;
/**
 * Accepts a parameter and returns it if it's a function
 * or a noop function if it's not. This allows us to
 * accept a callback, but not worry about it if it's not
 * passed.
 * @param {Function} cb the callback
 * @return {Function} a function
 */ function $d0d825e43d8ba478$var$cbToCb(cb) {
    return typeof cb === "function" ? cb : $d0d825e43d8ba478$var$noop;
}
function $d0d825e43d8ba478$var$noop() {}
/**
 * Scroll node into view if necessary
 * @param {HTMLElement} node the element that should scroll into view
 * @param {HTMLElement} menuNode the menu element of the component
 */ function $d0d825e43d8ba478$var$scrollIntoView(node, menuNode) {
    if (!node) return;
    var actions = (0, $jybpY.compute)(node, {
        boundary: menuNode,
        block: "nearest",
        scrollMode: "if-needed"
    });
    actions.forEach(function(_ref) {
        var el = _ref.el, top = _ref.top, left = _ref.left;
        el.scrollTop = top;
        el.scrollLeft = left;
    });
}
/**
 * @param {HTMLElement} parent the parent node
 * @param {HTMLElement} child the child node
 * @param {Window} environment The window context where downshift renders.
 * @return {Boolean} whether the parent is the child or the child is in the parent
 */ function $d0d825e43d8ba478$var$isOrContainsNode(parent, child, environment) {
    var result = parent === child || child instanceof environment.Node && parent.contains && parent.contains(child);
    return result;
}
/**
 * Simple debounce implementation. Will call the given
 * function once after the time given has passed since
 * it was last called.
 * @param {Function} fn the function to call after the time
 * @param {Number} time the time to wait
 * @return {Function} the debounced function
 */ function $d0d825e43d8ba478$var$debounce(fn, time) {
    var timeoutId;
    function cancel() {
        if (timeoutId) clearTimeout(timeoutId);
    }
    function wrapper() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++)args[_key] = arguments[_key];
        cancel();
        timeoutId = setTimeout(function() {
            timeoutId = null;
            fn.apply(void 0, args);
        }, time);
    }
    wrapper.cancel = cancel;
    return wrapper;
}
/**
 * This is intended to be used to compose event handlers.
 * They are executed in order until one of them sets
 * `event.preventDownshiftDefault = true`.
 * @param {...Function} fns the event handler functions
 * @return {Function} the event handler to add to an element
 */ function $d0d825e43d8ba478$var$callAllEventHandlers() {
    for(var _len2 = arguments.length, fns = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++)fns[_key2] = arguments[_key2];
    return function(event) {
        for(var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++)args[_key3 - 1] = arguments[_key3];
        return fns.some(function(fn) {
            if (fn) fn.apply(void 0, [
                event
            ].concat(args));
            return event.preventDownshiftDefault || event.hasOwnProperty("nativeEvent") && event.nativeEvent.preventDownshiftDefault;
        });
    };
}
function $d0d825e43d8ba478$var$handleRefs() {
    for(var _len4 = arguments.length, refs = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++)refs[_key4] = arguments[_key4];
    return function(node) {
        refs.forEach(function(ref) {
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
        });
    };
}
/**
 * This generates a unique ID for an instance of Downshift
 * @return {String} the unique ID
 */ function $d0d825e43d8ba478$var$generateId() {
    return String($d0d825e43d8ba478$var$idCounter++);
}
/**
 * Resets idCounter to 0. Used for SSR.
 */ function $d0d825e43d8ba478$export$4fba683129f6ab1e() {
    // istanbul ignore next
    if ("useId" in (0, (/*@__PURE__*/$parcel$interopDefault($63SH6)))) {
        console.warn("It is not necessary to call resetIdCounter when using React 18+");
        return;
    }
    $d0d825e43d8ba478$var$idCounter = 0;
}
/**
 * Default implementation for status message. Only added when menu is open.
 * Will specify if there are results in the list, and if so, how many,
 * and what keys are relevant.
 *
 * @param {Object} param the downshift state and other relevant properties
 * @return {String} the a11y status message
 */ function $d0d825e43d8ba478$var$getA11yStatusMessage$1(_ref2) {
    var isOpen = _ref2.isOpen, resultCount = _ref2.resultCount, previousResultCount = _ref2.previousResultCount;
    if (!isOpen) return "";
    if (!resultCount) return "No results are available.";
    if (resultCount !== previousResultCount) return resultCount + " result" + (resultCount === 1 ? " is" : "s are") + " available, use up and down arrow keys to navigate. Press Enter key to select.";
    return "";
}
/**
 * Takes an argument and if it's an array, returns the first item in the array
 * otherwise returns the argument
 * @param {*} arg the maybe-array
 * @param {*} defaultValue the value if arg is falsey not defined
 * @return {*} the arg or it's first item
 */ function $d0d825e43d8ba478$var$unwrapArray(arg, defaultValue) {
    arg = Array.isArray(arg) ? /* istanbul ignore next (preact) */ arg[0] : arg;
    if (!arg && defaultValue) return defaultValue;
    else return arg;
}
/**
 * @param {Object} element (P)react element
 * @return {Boolean} whether it's a DOM element
 */ function $d0d825e43d8ba478$var$isDOMElement(element) {
    // then we assume this is react
    return typeof element.type === "string";
}
/**
 * @param {Object} element (P)react element
 * @return {Object} the props
 */ function $d0d825e43d8ba478$var$getElementProps(element) {
    return element.props;
}
/**
 * Throws a helpful error message for required properties. Useful
 * to be used as a default in destructuring or object params.
 * @param {String} fnName the function name
 * @param {String} propName the prop name
 */ function $d0d825e43d8ba478$var$requiredProp(fnName, propName) {
    // eslint-disable-next-line no-console
    console.error('The property "' + propName + '" is required in "' + fnName + '"');
}
var $d0d825e43d8ba478$var$stateKeys = [
    "highlightedIndex",
    "inputValue",
    "isOpen",
    "selectedItem",
    "type"
];
/**
 * @param {Object} state the state object
 * @return {Object} state that is relevant to downshift
 */ function $d0d825e43d8ba478$var$pickState(state) {
    if (state === void 0) state = {};
    var result = {};
    $d0d825e43d8ba478$var$stateKeys.forEach(function(k) {
        if (state.hasOwnProperty(k)) result[k] = state[k];
    });
    return result;
}
/**
 * This will perform a shallow merge of the given state object
 * with the state coming from props
 * (for the controlled component scenario)
 * This is used in state updater functions so they're referencing
 * the right state regardless of where it comes from.
 *
 * @param {Object} state The state of the component/hook.
 * @param {Object} props The props that may contain controlled values.
 * @returns {Object} The merged controlled state.
 */ function $d0d825e43d8ba478$var$getState(state, props) {
    return Object.keys(state).reduce(function(prevState, key) {
        prevState[key] = $d0d825e43d8ba478$var$isControlledProp(props, key) ? props[key] : state[key];
        return prevState;
    }, {});
}
/**
 * This determines whether a prop is a "controlled prop" meaning it is
 * state which is controlled by the outside of this component rather
 * than within this component.
 *
 * @param {Object} props The props that may contain controlled values.
 * @param {String} key the key to check
 * @return {Boolean} whether it is a controlled controlled prop
 */ function $d0d825e43d8ba478$var$isControlledProp(props, key) {
    return props[key] !== undefined;
}
/**
 * Normalizes the 'key' property of a KeyboardEvent in IE/Edge
 * @param {Object} event a keyboardEvent object
 * @return {String} keyboard key
 */ function $d0d825e43d8ba478$var$normalizeArrowKey(event) {
    var key = event.key, keyCode = event.keyCode;
    /* istanbul ignore next (ie) */ if (keyCode >= 37 && keyCode <= 40 && key.indexOf("Arrow") !== 0) return "Arrow" + key;
    return key;
}
/**
 * Simple check if the value passed is object literal
 * @param {*} obj any things
 * @return {Boolean} whether it's object literal
 */ function $d0d825e43d8ba478$var$isPlainObject(obj) {
    return Object.prototype.toString.call(obj) === "[object Object]";
}
/**
 * Returns the next non-disabled highlightedIndex value.
 *
 * @param {number} start The current highlightedIndex.
 * @param {number} offset The offset from the current highlightedIndex to start searching.
 * @param {unknown[]} items The items array.
 * @param {(item: unknown, index: number) => boolean} isItemDisabled Function that tells if an item is disabled or not.
 * @param {boolean?} circular If the search reaches the end, if it can search again starting from the other end.
 * @returns {number} The next highlightedIndex.
 */ function $d0d825e43d8ba478$var$getHighlightedIndex(start, offset, items, isItemDisabled, circular) {
    if (circular === void 0) circular = false;
    var count = items.length;
    if (count === 0) return -1;
    var itemsLastIndex = count - 1;
    if (typeof start !== "number" || start < 0 || start > itemsLastIndex) start = offset > 0 ? -1 : itemsLastIndex + 1;
    var current = start + offset;
    if (current < 0) current = circular ? itemsLastIndex : 0;
    else if (current > itemsLastIndex) current = circular ? 0 : itemsLastIndex;
    var highlightedIndex = $d0d825e43d8ba478$var$getNonDisabledIndex(current, offset < 0, items, isItemDisabled, circular);
    if (highlightedIndex === -1) return start >= count ? -1 : start;
    return highlightedIndex;
}
/**
 * Returns the next non-disabled highlightedIndex value.
 *
 * @param {number} start The current highlightedIndex.
 * @param {boolean} backwards If true, it will search backwards from the start.
 * @param {unknown[]} items The items array.
 * @param {(item: unknown, index: number) => boolean} isItemDisabled Function that tells if an item is disabled or not.
 * @param {boolean} circular If the search reaches the end, if it can search again starting from the other end.
 * @returns {number} The next non-disabled index.
 */ function $d0d825e43d8ba478$var$getNonDisabledIndex(start, backwards, items, isItemDisabled, circular) {
    if (circular === void 0) circular = false;
    var count = items.length;
    if (backwards) for(var index = start; index >= 0; index--){
        if (!isItemDisabled(items[index], index)) return index;
    }
    else for(var _index = start; _index < count; _index++){
        if (!isItemDisabled(items[_index], _index)) return _index;
    }
    if (circular) return $d0d825e43d8ba478$var$getNonDisabledIndex(backwards ? count - 1 : 0, backwards, items, isItemDisabled);
    return -1;
}
/**
 * Checks if event target is within the downshift elements.
 *
 * @param {EventTarget} target Target to check.
 * @param {HTMLElement[]} downshiftElements The elements that form downshift (list, toggle button etc).
 * @param {Window} environment The window context where downshift renders.
 * @param {boolean} checkActiveElement Whether to also check activeElement.
 *
 * @returns {boolean} Whether or not the target is within downshift elements.
 */ function $d0d825e43d8ba478$var$targetWithinDownshift(target, downshiftElements, environment, checkActiveElement) {
    if (checkActiveElement === void 0) checkActiveElement = true;
    return environment && downshiftElements.some(function(contextNode) {
        return contextNode && ($d0d825e43d8ba478$var$isOrContainsNode(contextNode, target, environment) || checkActiveElement && $d0d825e43d8ba478$var$isOrContainsNode(contextNode, environment.document.activeElement, environment));
    });
}
// eslint-disable-next-line import/no-mutable-exports
var $d0d825e43d8ba478$var$validateControlledUnchanged = $d0d825e43d8ba478$var$noop;
var $d0d825e43d8ba478$var$cleanupStatus = $d0d825e43d8ba478$var$debounce(function(documentProp) {
    $d0d825e43d8ba478$var$getStatusDiv(documentProp).textContent = "";
}, 500);
/**
 * Get the status node or create it if it does not already exist.
 * @param {Object} documentProp document passed by the user.
 * @return {HTMLElement} the status node.
 */ function $d0d825e43d8ba478$var$getStatusDiv(documentProp) {
    var statusDiv = documentProp.getElementById("a11y-status-message");
    if (statusDiv) return statusDiv;
    statusDiv = documentProp.createElement("div");
    statusDiv.setAttribute("id", "a11y-status-message");
    statusDiv.setAttribute("role", "status");
    statusDiv.setAttribute("aria-live", "polite");
    statusDiv.setAttribute("aria-relevant", "additions text");
    Object.assign(statusDiv.style, {
        border: "0",
        clip: "rect(0 0 0 0)",
        height: "1px",
        margin: "-1px",
        overflow: "hidden",
        padding: "0",
        position: "absolute",
        width: "1px"
    });
    documentProp.body.appendChild(statusDiv);
    return statusDiv;
}
/**
 * @param {String} status the status message
 * @param {Object} documentProp document passed by the user.
 */ function $d0d825e43d8ba478$var$setStatus(status, documentProp) {
    if (!status || !documentProp) return;
    var div = $d0d825e43d8ba478$var$getStatusDiv(documentProp);
    div.textContent = status;
    $d0d825e43d8ba478$var$cleanupStatus(documentProp);
}
var $d0d825e43d8ba478$var$unknown = 0;
var $d0d825e43d8ba478$var$mouseUp = 1;
var $d0d825e43d8ba478$var$itemMouseEnter = 2;
var $d0d825e43d8ba478$var$keyDownArrowUp = 3;
var $d0d825e43d8ba478$var$keyDownArrowDown = 4;
var $d0d825e43d8ba478$var$keyDownEscape = 5;
var $d0d825e43d8ba478$var$keyDownEnter = 6;
var $d0d825e43d8ba478$var$keyDownHome = 7;
var $d0d825e43d8ba478$var$keyDownEnd = 8;
var $d0d825e43d8ba478$var$clickItem = 9;
var $d0d825e43d8ba478$var$blurInput = 10;
var $d0d825e43d8ba478$var$changeInput = 11;
var $d0d825e43d8ba478$var$keyDownSpaceButton = 12;
var $d0d825e43d8ba478$var$clickButton = 13;
var $d0d825e43d8ba478$var$blurButton = 14;
var $d0d825e43d8ba478$var$controlledPropUpdatedSelectedItem = 15;
var $d0d825e43d8ba478$var$touchEnd = 16;
var $d0d825e43d8ba478$var$stateChangeTypes$3 = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    unknown: $d0d825e43d8ba478$var$unknown,
    mouseUp: $d0d825e43d8ba478$var$mouseUp,
    itemMouseEnter: $d0d825e43d8ba478$var$itemMouseEnter,
    keyDownArrowUp: $d0d825e43d8ba478$var$keyDownArrowUp,
    keyDownArrowDown: $d0d825e43d8ba478$var$keyDownArrowDown,
    keyDownEscape: $d0d825e43d8ba478$var$keyDownEscape,
    keyDownEnter: $d0d825e43d8ba478$var$keyDownEnter,
    keyDownHome: $d0d825e43d8ba478$var$keyDownHome,
    keyDownEnd: $d0d825e43d8ba478$var$keyDownEnd,
    clickItem: $d0d825e43d8ba478$var$clickItem,
    blurInput: $d0d825e43d8ba478$var$blurInput,
    changeInput: $d0d825e43d8ba478$var$changeInput,
    keyDownSpaceButton: $d0d825e43d8ba478$var$keyDownSpaceButton,
    clickButton: $d0d825e43d8ba478$var$clickButton,
    blurButton: $d0d825e43d8ba478$var$blurButton,
    controlledPropUpdatedSelectedItem: $d0d825e43d8ba478$var$controlledPropUpdatedSelectedItem,
    touchEnd: $d0d825e43d8ba478$var$touchEnd
});
var $d0d825e43d8ba478$var$_excluded$4 = [
    "refKey",
    "ref"
], $d0d825e43d8ba478$var$_excluded2$3 = [
    "onClick",
    "onPress",
    "onKeyDown",
    "onKeyUp",
    "onBlur"
], $d0d825e43d8ba478$var$_excluded3$2 = [
    "onKeyDown",
    "onBlur",
    "onChange",
    "onInput",
    "onChangeText"
], $d0d825e43d8ba478$var$_excluded4$1 = [
    "refKey",
    "ref"
], $d0d825e43d8ba478$var$_excluded5 = [
    "onMouseMove",
    "onMouseDown",
    "onClick",
    "onPress",
    "index",
    "item"
];
var $d0d825e43d8ba478$var$Downshift = /*#__PURE__*/ function() {
    var Downshift = /*#__PURE__*/ function(_Component) {
        (0, $5VaeF.default)(Downshift, _Component);
        function Downshift(_props) {
            var _this;
            _this = _Component.call(this, _props) || this;
            // fancy destructuring + defaults + aliases
            // this basically says each value of state should either be set to
            // the initial value or the default value if the initial value is not provided
            _this.id = _this.props.id || "downshift-" + $d0d825e43d8ba478$var$generateId();
            _this.menuId = _this.props.menuId || _this.id + "-menu";
            _this.labelId = _this.props.labelId || _this.id + "-label";
            _this.inputId = _this.props.inputId || _this.id + "-input";
            _this.getItemId = _this.props.getItemId || function(index) {
                return _this.id + "-item-" + index;
            };
            _this.items = [];
            // itemCount can be changed asynchronously
            // from within downshift (so it can't come from a prop)
            // this is why we store it as an instance and use
            // getItemCount rather than just use items.length
            // (to support windowing + async)
            _this.itemCount = null;
            _this.previousResultCount = 0;
            _this.timeoutIds = [];
            /**
       * @param {Function} fn the function to call after the time
       * @param {Number} time the time to wait
       */ _this.internalSetTimeout = function(fn, time) {
                var id = setTimeout(function() {
                    _this.timeoutIds = _this.timeoutIds.filter(function(i) {
                        return i !== id;
                    });
                    fn();
                }, time);
                _this.timeoutIds.push(id);
            };
            _this.setItemCount = function(count) {
                _this.itemCount = count;
            };
            _this.unsetItemCount = function() {
                _this.itemCount = null;
            };
            _this.isItemDisabled = function(_item, index) {
                var currentElementNode = _this.getItemNodeFromIndex(index);
                return currentElementNode && currentElementNode.hasAttribute("disabled");
            };
            _this.setHighlightedIndex = function(highlightedIndex, otherStateToSet) {
                if (highlightedIndex === void 0) highlightedIndex = _this.props.defaultHighlightedIndex;
                if (otherStateToSet === void 0) otherStateToSet = {};
                otherStateToSet = $d0d825e43d8ba478$var$pickState(otherStateToSet);
                _this.internalSetState((0, $uwkDK.default)({
                    highlightedIndex: highlightedIndex
                }, otherStateToSet));
            };
            _this.clearSelection = function(cb) {
                _this.internalSetState({
                    selectedItem: null,
                    inputValue: "",
                    highlightedIndex: _this.props.defaultHighlightedIndex,
                    isOpen: _this.props.defaultIsOpen
                }, cb);
            };
            _this.selectItem = function(item, otherStateToSet, cb) {
                otherStateToSet = $d0d825e43d8ba478$var$pickState(otherStateToSet);
                _this.internalSetState((0, $uwkDK.default)({
                    isOpen: _this.props.defaultIsOpen,
                    highlightedIndex: _this.props.defaultHighlightedIndex,
                    selectedItem: item,
                    inputValue: _this.props.itemToString(item)
                }, otherStateToSet), cb);
            };
            _this.selectItemAtIndex = function(itemIndex, otherStateToSet, cb) {
                var item = _this.items[itemIndex];
                if (item == null) return;
                _this.selectItem(item, otherStateToSet, cb);
            };
            _this.selectHighlightedItem = function(otherStateToSet, cb) {
                return _this.selectItemAtIndex(_this.getState().highlightedIndex, otherStateToSet, cb);
            };
            // any piece of our state can live in two places:
            // 1. Uncontrolled: it's internal (this.state)
            //    We will call this.setState to update that state
            // 2. Controlled: it's external (this.props)
            //    We will call this.props.onStateChange to update that state
            //
            // In addition, we'll call this.props.onChange if the
            // selectedItem is changed.
            _this.internalSetState = function(stateToSet, cb) {
                var isItemSelected, onChangeArg;
                var onStateChangeArg = {};
                var isStateToSetFunction = typeof stateToSet === "function";
                // we want to call `onInputValueChange` before the `setState` call
                // so someone controlling the `inputValue` state gets notified of
                // the input change as soon as possible. This avoids issues with
                // preserving the cursor position.
                // See https://github.com/downshift-js/downshift/issues/217 for more info.
                if (!isStateToSetFunction && stateToSet.hasOwnProperty("inputValue")) _this.props.onInputValueChange(stateToSet.inputValue, (0, $uwkDK.default)({}, _this.getStateAndHelpers(), stateToSet));
                return _this.setState(function(state) {
                    var _newStateToSet;
                    state = _this.getState(state);
                    var newStateToSet = isStateToSetFunction ? stateToSet(state) : stateToSet;
                    // Your own function that could modify the state that will be set.
                    newStateToSet = _this.props.stateReducer(state, newStateToSet);
                    // checks if an item is selected, regardless of if it's different from
                    // what was selected before
                    // used to determine if onSelect and onChange callbacks should be called
                    isItemSelected = newStateToSet.hasOwnProperty("selectedItem");
                    // this keeps track of the object we want to call with setState
                    var nextState = {};
                    // we need to call on change if the outside world is controlling any of our state
                    // and we're trying to update that state. OR if the selection has changed and we're
                    // trying to update the selection
                    if (isItemSelected && newStateToSet.selectedItem !== state.selectedItem) onChangeArg = newStateToSet.selectedItem;
                    (_newStateToSet = newStateToSet).type || (_newStateToSet.type = $d0d825e43d8ba478$var$unknown);
                    Object.keys(newStateToSet).forEach(function(key) {
                        // onStateChangeArg should only have the state that is
                        // actually changing
                        if (state[key] !== newStateToSet[key]) onStateChangeArg[key] = newStateToSet[key];
                        // the type is useful for the onStateChangeArg
                        // but we don't actually want to set it in internal state.
                        // this is an undocumented feature for now... Not all internalSetState
                        // calls support it and I'm not certain we want them to yet.
                        // But it enables users controlling the isOpen state to know when
                        // the isOpen state changes due to mouseup events which is quite handy.
                        if (key === "type") return;
                        newStateToSet[key];
                        // if it's coming from props, then we don't care to set it internally
                        if (!$d0d825e43d8ba478$var$isControlledProp(_this.props, key)) nextState[key] = newStateToSet[key];
                    });
                    // if stateToSet is a function, then we weren't able to call onInputValueChange
                    // earlier, so we'll call it now that we know what the inputValue state will be.
                    if (isStateToSetFunction && newStateToSet.hasOwnProperty("inputValue")) _this.props.onInputValueChange(newStateToSet.inputValue, (0, $uwkDK.default)({}, _this.getStateAndHelpers(), newStateToSet));
                    return nextState;
                }, function() {
                    // call the provided callback if it's a function
                    $d0d825e43d8ba478$var$cbToCb(cb)();
                    // only call the onStateChange and onChange callbacks if
                    // we have relevant information to pass them.
                    var hasMoreStateThanType = Object.keys(onStateChangeArg).length > 1;
                    if (hasMoreStateThanType) _this.props.onStateChange(onStateChangeArg, _this.getStateAndHelpers());
                    if (isItemSelected) _this.props.onSelect(stateToSet.selectedItem, _this.getStateAndHelpers());
                    if (onChangeArg !== undefined) _this.props.onChange(onChangeArg, _this.getStateAndHelpers());
                    // this is currently undocumented and therefore subject to change
                    // We'll try to not break it, but just be warned.
                    _this.props.onUserAction(onStateChangeArg, _this.getStateAndHelpers());
                });
            };
            //////////////////////////// ROOT
            _this.rootRef = function(node) {
                return _this._rootNode = node;
            };
            _this.getRootProps = function(_temp, _temp2) {
                var _extends2;
                var _ref = _temp === void 0 ? {} : _temp, _ref$refKey = _ref.refKey, refKey = _ref$refKey === void 0 ? "ref" : _ref$refKey, ref = _ref.ref, rest = (0, $8WqTz.default)(_ref, $d0d825e43d8ba478$var$_excluded$4);
                var _ref2 = _temp2 === void 0 ? {} : _temp2, _ref2$suppressRefErro = _ref2.suppressRefError, suppressRefError = _ref2$suppressRefErro === void 0 ? false : _ref2$suppressRefErro;
                // this is used in the render to know whether the user has called getRootProps.
                // It uses that to know whether to apply the props automatically
                _this.getRootProps.called = true;
                _this.getRootProps.refKey = refKey;
                _this.getRootProps.suppressRefError = suppressRefError;
                var _this$getState = _this.getState(), isOpen = _this$getState.isOpen;
                return (0, $uwkDK.default)((_extends2 = {}, _extends2[refKey] = $d0d825e43d8ba478$var$handleRefs(ref, _this.rootRef), _extends2.role = "combobox", _extends2["aria-expanded"] = isOpen, _extends2["aria-haspopup"] = "listbox", _extends2["aria-owns"] = isOpen ? _this.menuId : undefined, _extends2["aria-labelledby"] = _this.labelId, _extends2), rest);
            };
            //\\\\\\\\\\\\\\\\\\\\\\\\\\ ROOT
            _this.keyDownHandlers = {
                ArrowDown: function ArrowDown(event) {
                    var _this2 = this;
                    event.preventDefault();
                    if (this.getState().isOpen) {
                        var amount = event.shiftKey ? 5 : 1;
                        this.moveHighlightedIndex(amount, {
                            type: $d0d825e43d8ba478$var$keyDownArrowDown
                        });
                    } else this.internalSetState({
                        isOpen: true,
                        type: $d0d825e43d8ba478$var$keyDownArrowDown
                    }, function() {
                        var itemCount = _this2.getItemCount();
                        if (itemCount > 0) {
                            var _this2$getState = _this2.getState(), highlightedIndex = _this2$getState.highlightedIndex;
                            var nextHighlightedIndex = $d0d825e43d8ba478$var$getHighlightedIndex(highlightedIndex, 1, {
                                length: itemCount
                            }, _this2.isItemDisabled, true);
                            _this2.setHighlightedIndex(nextHighlightedIndex, {
                                type: $d0d825e43d8ba478$var$keyDownArrowDown
                            });
                        }
                    });
                },
                ArrowUp: function ArrowUp(event) {
                    var _this3 = this;
                    event.preventDefault();
                    if (this.getState().isOpen) {
                        var amount = event.shiftKey ? -5 : -1;
                        this.moveHighlightedIndex(amount, {
                            type: $d0d825e43d8ba478$var$keyDownArrowUp
                        });
                    } else this.internalSetState({
                        isOpen: true,
                        type: $d0d825e43d8ba478$var$keyDownArrowUp
                    }, function() {
                        var itemCount = _this3.getItemCount();
                        if (itemCount > 0) {
                            var _this3$getState = _this3.getState(), highlightedIndex = _this3$getState.highlightedIndex;
                            var nextHighlightedIndex = $d0d825e43d8ba478$var$getHighlightedIndex(highlightedIndex, -1, {
                                length: itemCount
                            }, _this3.isItemDisabled, true);
                            _this3.setHighlightedIndex(nextHighlightedIndex, {
                                type: $d0d825e43d8ba478$var$keyDownArrowUp
                            });
                        }
                    });
                },
                Enter: function Enter(event) {
                    if (event.which === 229) return;
                    var _this$getState2 = this.getState(), isOpen = _this$getState2.isOpen, highlightedIndex = _this$getState2.highlightedIndex;
                    if (isOpen && highlightedIndex != null) {
                        event.preventDefault();
                        var item = this.items[highlightedIndex];
                        var itemNode = this.getItemNodeFromIndex(highlightedIndex);
                        if (item == null || itemNode && itemNode.hasAttribute("disabled")) return;
                        this.selectHighlightedItem({
                            type: $d0d825e43d8ba478$var$keyDownEnter
                        });
                    }
                },
                Escape: function Escape(event) {
                    event.preventDefault();
                    this.reset((0, $uwkDK.default)({
                        type: $d0d825e43d8ba478$var$keyDownEscape
                    }, !this.state.isOpen && {
                        selectedItem: null,
                        inputValue: ""
                    }));
                }
            };
            //////////////////////////// BUTTON
            _this.buttonKeyDownHandlers = (0, $uwkDK.default)({}, _this.keyDownHandlers, {
                " ": function _(event) {
                    event.preventDefault();
                    this.toggleMenu({
                        type: $d0d825e43d8ba478$var$keyDownSpaceButton
                    });
                }
            });
            _this.inputKeyDownHandlers = (0, $uwkDK.default)({}, _this.keyDownHandlers, {
                Home: function Home(event) {
                    var _this$getState3 = this.getState(), isOpen = _this$getState3.isOpen;
                    if (!isOpen) return;
                    event.preventDefault();
                    var itemCount = this.getItemCount();
                    if (itemCount <= 0 || !isOpen) return;
                    // get next non-disabled starting downwards from 0 if that's disabled.
                    var newHighlightedIndex = $d0d825e43d8ba478$var$getNonDisabledIndex(0, false, {
                        length: itemCount
                    }, this.isItemDisabled);
                    this.setHighlightedIndex(newHighlightedIndex, {
                        type: $d0d825e43d8ba478$var$keyDownHome
                    });
                },
                End: function End(event) {
                    var _this$getState4 = this.getState(), isOpen = _this$getState4.isOpen;
                    if (!isOpen) return;
                    event.preventDefault();
                    var itemCount = this.getItemCount();
                    if (itemCount <= 0 || !isOpen) return;
                    // get next non-disabled starting upwards from last index if that's disabled.
                    var newHighlightedIndex = $d0d825e43d8ba478$var$getNonDisabledIndex(itemCount - 1, true, {
                        length: itemCount
                    }, this.isItemDisabled);
                    this.setHighlightedIndex(newHighlightedIndex, {
                        type: $d0d825e43d8ba478$var$keyDownEnd
                    });
                }
            });
            _this.getToggleButtonProps = function(_temp3) {
                var _ref3 = _temp3 === void 0 ? {} : _temp3, onClick = _ref3.onClick;
                _ref3.onPress;
                var onKeyDown = _ref3.onKeyDown, onKeyUp = _ref3.onKeyUp, onBlur = _ref3.onBlur, rest = (0, $8WqTz.default)(_ref3, $d0d825e43d8ba478$var$_excluded2$3);
                var _this$getState5 = _this.getState(), isOpen = _this$getState5.isOpen;
                var enabledEventHandlers = {
                    onClick: $d0d825e43d8ba478$var$callAllEventHandlers(onClick, _this.buttonHandleClick),
                    onKeyDown: $d0d825e43d8ba478$var$callAllEventHandlers(onKeyDown, _this.buttonHandleKeyDown),
                    onKeyUp: $d0d825e43d8ba478$var$callAllEventHandlers(onKeyUp, _this.buttonHandleKeyUp),
                    onBlur: $d0d825e43d8ba478$var$callAllEventHandlers(onBlur, _this.buttonHandleBlur)
                };
                var eventHandlers = rest.disabled ? {} : enabledEventHandlers;
                return (0, $uwkDK.default)({
                    type: "button",
                    role: "button",
                    "aria-label": isOpen ? "close menu" : "open menu",
                    "aria-haspopup": true,
                    "data-toggle": true
                }, eventHandlers, rest);
            };
            _this.buttonHandleKeyUp = function(event) {
                // Prevent click event from emitting in Firefox
                event.preventDefault();
            };
            _this.buttonHandleKeyDown = function(event) {
                var key = $d0d825e43d8ba478$var$normalizeArrowKey(event);
                if (_this.buttonKeyDownHandlers[key]) _this.buttonKeyDownHandlers[key].call((0, $1Nh8o.default)(_this), event);
            };
            _this.buttonHandleClick = function(event) {
                event.preventDefault();
                // handle odd case for Safari and Firefox which
                // don't give the button the focus properly.
                /* istanbul ignore if (can't reasonably test this) */ if (_this.props.environment) {
                    var _this$props$environme = _this.props.environment.document, body = _this$props$environme.body, activeElement = _this$props$environme.activeElement;
                    if (body && body === activeElement) event.target.focus();
                }
                // Ensure that toggle of menu occurs after the potential blur event in iOS
                _this.internalSetTimeout(function() {
                    return _this.toggleMenu({
                        type: $d0d825e43d8ba478$var$clickButton
                    });
                });
            };
            _this.buttonHandleBlur = function(event) {
                var blurTarget = event.target; // Save blur target for comparison with activeElement later
                // Need setTimeout, so that when the user presses Tab, the activeElement is the next focused element, not body element
                _this.internalSetTimeout(function() {
                    if (_this.isMouseDown || !_this.props.environment) return;
                    var activeElement = _this.props.environment.document.activeElement;
                    if ((activeElement == null || activeElement.id !== _this.inputId) && activeElement !== blurTarget // Do nothing if we refocus the same element again (to solve issue in Safari on iOS)
                    ) _this.reset({
                        type: $d0d825e43d8ba478$var$blurButton
                    });
                });
            };
            //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ BUTTON
            /////////////////////////////// LABEL
            _this.getLabelProps = function(props) {
                return (0, $uwkDK.default)({
                    htmlFor: _this.inputId,
                    id: _this.labelId
                }, props);
            };
            //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ LABEL
            /////////////////////////////// INPUT
            _this.getInputProps = function(_temp4) {
                var _ref4 = _temp4 === void 0 ? {} : _temp4, onKeyDown = _ref4.onKeyDown, onBlur = _ref4.onBlur, onChange = _ref4.onChange, onInput = _ref4.onInput;
                _ref4.onChangeText;
                var rest = (0, $8WqTz.default)(_ref4, $d0d825e43d8ba478$var$_excluded3$2);
                var onChangeKey;
                var eventHandlers = {};
                onChangeKey = "onChange";
                var _this$getState6 = _this.getState(), inputValue = _this$getState6.inputValue, isOpen = _this$getState6.isOpen, highlightedIndex = _this$getState6.highlightedIndex;
                if (!rest.disabled) {
                    var _eventHandlers;
                    eventHandlers = (_eventHandlers = {}, _eventHandlers[onChangeKey] = $d0d825e43d8ba478$var$callAllEventHandlers(onChange, onInput, _this.inputHandleChange), _eventHandlers.onKeyDown = $d0d825e43d8ba478$var$callAllEventHandlers(onKeyDown, _this.inputHandleKeyDown), _eventHandlers.onBlur = $d0d825e43d8ba478$var$callAllEventHandlers(onBlur, _this.inputHandleBlur), _eventHandlers);
                }
                return (0, $uwkDK.default)({
                    "aria-autocomplete": "list",
                    "aria-activedescendant": isOpen && typeof highlightedIndex === "number" && highlightedIndex >= 0 ? _this.getItemId(highlightedIndex) : undefined,
                    "aria-controls": isOpen ? _this.menuId : undefined,
                    "aria-labelledby": rest && rest["aria-label"] ? undefined : _this.labelId,
                    // https://developer.mozilla.org/en-US/docs/Web/Security/Securing_your_site/Turning_off_form_autocompletion
                    // revert back since autocomplete="nope" is ignored on latest Chrome and Opera
                    autoComplete: "off",
                    value: inputValue,
                    id: _this.inputId
                }, eventHandlers, rest);
            };
            _this.inputHandleKeyDown = function(event) {
                var key = $d0d825e43d8ba478$var$normalizeArrowKey(event);
                if (key && _this.inputKeyDownHandlers[key]) _this.inputKeyDownHandlers[key].call((0, $1Nh8o.default)(_this), event);
            };
            _this.inputHandleChange = function(event) {
                _this.internalSetState({
                    type: $d0d825e43d8ba478$var$changeInput,
                    isOpen: true,
                    inputValue: event.target.value,
                    highlightedIndex: _this.props.defaultHighlightedIndex
                });
            };
            _this.inputHandleBlur = function() {
                // Need setTimeout, so that when the user presses Tab, the activeElement is the next focused element, not the body element
                _this.internalSetTimeout(function() {
                    var _activeElement$datase;
                    if (_this.isMouseDown || !_this.props.environment) return;
                    var activeElement = _this.props.environment.document.activeElement;
                    var downshiftButtonIsActive = (activeElement == null || (_activeElement$datase = activeElement.dataset) == null ? void 0 : _activeElement$datase.toggle) && _this._rootNode && _this._rootNode.contains(activeElement);
                    if (!downshiftButtonIsActive) _this.reset({
                        type: $d0d825e43d8ba478$var$blurInput
                    });
                });
            };
            //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ INPUT
            /////////////////////////////// MENU
            _this.menuRef = function(node) {
                _this._menuNode = node;
            };
            _this.getMenuProps = function(_temp5, _temp6) {
                var _extends3;
                var _ref5 = _temp5 === void 0 ? {} : _temp5, _ref5$refKey = _ref5.refKey, refKey = _ref5$refKey === void 0 ? "ref" : _ref5$refKey, ref = _ref5.ref, props = (0, $8WqTz.default)(_ref5, $d0d825e43d8ba478$var$_excluded4$1);
                var _ref6 = _temp6 === void 0 ? {} : _temp6, _ref6$suppressRefErro = _ref6.suppressRefError, suppressRefError = _ref6$suppressRefErro === void 0 ? false : _ref6$suppressRefErro;
                _this.getMenuProps.called = true;
                _this.getMenuProps.refKey = refKey;
                _this.getMenuProps.suppressRefError = suppressRefError;
                return (0, $uwkDK.default)((_extends3 = {}, _extends3[refKey] = $d0d825e43d8ba478$var$handleRefs(ref, _this.menuRef), _extends3.role = "listbox", _extends3["aria-labelledby"] = props && props["aria-label"] ? undefined : _this.labelId, _extends3.id = _this.menuId, _extends3), props);
            };
            //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ MENU
            /////////////////////////////// ITEM
            _this.getItemProps = function(_temp7) {
                var _enabledEventHandlers;
                var _ref7 = _temp7 === void 0 ? {} : _temp7, onMouseMove = _ref7.onMouseMove, onMouseDown = _ref7.onMouseDown, onClick = _ref7.onClick;
                _ref7.onPress;
                var index = _ref7.index, _ref7$item = _ref7.item, item = _ref7$item === void 0 ? /* istanbul ignore next */ undefined : _ref7$item, rest = (0, $8WqTz.default)(_ref7, $d0d825e43d8ba478$var$_excluded5);
                if (index === undefined) {
                    _this.items.push(item);
                    index = _this.items.indexOf(item);
                } else _this.items[index] = item;
                var onSelectKey = "onClick";
                var customClickHandler = onClick;
                var enabledEventHandlers = (_enabledEventHandlers = {
                    // onMouseMove is used over onMouseEnter here. onMouseMove
                    // is only triggered on actual mouse movement while onMouseEnter
                    // can fire on DOM changes, interrupting keyboard navigation
                    onMouseMove: $d0d825e43d8ba478$var$callAllEventHandlers(onMouseMove, function() {
                        if (index === _this.getState().highlightedIndex) return;
                        _this.setHighlightedIndex(index, {
                            type: $d0d825e43d8ba478$var$itemMouseEnter
                        });
                        // We never want to manually scroll when changing state based
                        // on `onMouseMove` because we will be moving the element out
                        // from under the user which is currently scrolling/moving the
                        // cursor
                        _this.avoidScrolling = true;
                        _this.internalSetTimeout(function() {
                            return _this.avoidScrolling = false;
                        }, 250);
                    }),
                    onMouseDown: $d0d825e43d8ba478$var$callAllEventHandlers(onMouseDown, function(event) {
                        // This prevents the activeElement from being changed
                        // to the item so it can remain with the current activeElement
                        // which is a more common use case.
                        event.preventDefault();
                    })
                }, _enabledEventHandlers[onSelectKey] = $d0d825e43d8ba478$var$callAllEventHandlers(customClickHandler, function() {
                    _this.selectItemAtIndex(index, {
                        type: $d0d825e43d8ba478$var$clickItem
                    });
                }), _enabledEventHandlers);
                // Passing down the onMouseDown handler to prevent redirect
                // of the activeElement if clicking on disabled items
                var eventHandlers = rest.disabled ? {
                    onMouseDown: enabledEventHandlers.onMouseDown
                } : enabledEventHandlers;
                return (0, $uwkDK.default)({
                    id: _this.getItemId(index),
                    role: "option",
                    "aria-selected": _this.getState().highlightedIndex === index
                }, eventHandlers, rest);
            };
            //\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ ITEM
            _this.clearItems = function() {
                _this.items = [];
            };
            _this.reset = function(otherStateToSet, cb) {
                if (otherStateToSet === void 0) otherStateToSet = {};
                otherStateToSet = $d0d825e43d8ba478$var$pickState(otherStateToSet);
                _this.internalSetState(function(_ref8) {
                    var selectedItem = _ref8.selectedItem;
                    return (0, $uwkDK.default)({
                        isOpen: _this.props.defaultIsOpen,
                        highlightedIndex: _this.props.defaultHighlightedIndex,
                        inputValue: _this.props.itemToString(selectedItem)
                    }, otherStateToSet);
                }, cb);
            };
            _this.toggleMenu = function(otherStateToSet, cb) {
                if (otherStateToSet === void 0) otherStateToSet = {};
                otherStateToSet = $d0d825e43d8ba478$var$pickState(otherStateToSet);
                _this.internalSetState(function(_ref9) {
                    var isOpen = _ref9.isOpen;
                    return (0, $uwkDK.default)({
                        isOpen: !isOpen
                    }, isOpen && {
                        highlightedIndex: _this.props.defaultHighlightedIndex
                    }, otherStateToSet);
                }, function() {
                    var _this$getState7 = _this.getState(), isOpen = _this$getState7.isOpen, highlightedIndex = _this$getState7.highlightedIndex;
                    if (isOpen) {
                        if (_this.getItemCount() > 0 && typeof highlightedIndex === "number") _this.setHighlightedIndex(highlightedIndex, otherStateToSet);
                    }
                    $d0d825e43d8ba478$var$cbToCb(cb)();
                });
            };
            _this.openMenu = function(cb) {
                _this.internalSetState({
                    isOpen: true
                }, cb);
            };
            _this.closeMenu = function(cb) {
                _this.internalSetState({
                    isOpen: false
                }, cb);
            };
            _this.updateStatus = $d0d825e43d8ba478$var$debounce(function() {
                var _this$props;
                if (!((_this$props = _this.props) != null && (_this$props = _this$props.environment) != null && _this$props.document)) return;
                var state = _this.getState();
                var item = _this.items[state.highlightedIndex];
                var resultCount = _this.getItemCount();
                var status = _this.props.getA11yStatusMessage((0, $uwkDK.default)({
                    itemToString: _this.props.itemToString,
                    previousResultCount: _this.previousResultCount,
                    resultCount: resultCount,
                    highlightedItem: item
                }, state));
                _this.previousResultCount = resultCount;
                $d0d825e43d8ba478$var$setStatus(status, _this.props.environment.document);
            }, 200);
            var _this$props2 = _this.props, defaultHighlightedIndex = _this$props2.defaultHighlightedIndex, _this$props2$initialH = _this$props2.initialHighlightedIndex, _highlightedIndex = _this$props2$initialH === void 0 ? defaultHighlightedIndex : _this$props2$initialH, defaultIsOpen = _this$props2.defaultIsOpen, _this$props2$initialI = _this$props2.initialIsOpen, _isOpen = _this$props2$initialI === void 0 ? defaultIsOpen : _this$props2$initialI, _this$props2$initialI2 = _this$props2.initialInputValue, _inputValue = _this$props2$initialI2 === void 0 ? "" : _this$props2$initialI2, _this$props2$initialS = _this$props2.initialSelectedItem, _selectedItem = _this$props2$initialS === void 0 ? null : _this$props2$initialS;
            var _state = _this.getState({
                highlightedIndex: _highlightedIndex,
                isOpen: _isOpen,
                inputValue: _inputValue,
                selectedItem: _selectedItem
            });
            if (_state.selectedItem != null && _this.props.initialInputValue === undefined) _state.inputValue = _this.props.itemToString(_state.selectedItem);
            _this.state = _state;
            return _this;
        }
        var _proto = Downshift.prototype;
        /**
     * Clear all running timeouts
     */ _proto.internalClearTimeouts = function internalClearTimeouts() {
            this.timeoutIds.forEach(function(id) {
                clearTimeout(id);
            });
            this.timeoutIds = [];
        } /**
     * Gets the state based on internal state or props
     * If a state value is passed via props, then that
     * is the value given, otherwise it's retrieved from
     * stateToMerge
     *
     * @param {Object} stateToMerge defaults to this.state
     * @return {Object} the state
     */ ;
        _proto.getState = function getState$1(stateToMerge) {
            if (stateToMerge === void 0) stateToMerge = this.state;
            return $d0d825e43d8ba478$var$getState(stateToMerge, this.props);
        };
        _proto.getItemCount = function getItemCount() {
            // things read better this way. They're in priority order:
            // 1. `this.itemCount`
            // 2. `this.props.itemCount`
            // 3. `this.items.length`
            var itemCount = this.items.length;
            if (this.itemCount != null) itemCount = this.itemCount;
            else if (this.props.itemCount !== undefined) itemCount = this.props.itemCount;
            return itemCount;
        };
        _proto.getItemNodeFromIndex = function getItemNodeFromIndex(index) {
            return this.props.environment ? this.props.environment.document.getElementById(this.getItemId(index)) : null;
        };
        _proto.scrollHighlightedItemIntoView = function scrollHighlightedItemIntoView() {
            var node = this.getItemNodeFromIndex(this.getState().highlightedIndex);
            this.props.scrollIntoView(node, this._menuNode);
        };
        _proto.moveHighlightedIndex = function moveHighlightedIndex(amount, otherStateToSet) {
            var itemCount = this.getItemCount();
            var _this$getState8 = this.getState(), highlightedIndex = _this$getState8.highlightedIndex;
            if (itemCount > 0) {
                var nextHighlightedIndex = $d0d825e43d8ba478$var$getHighlightedIndex(highlightedIndex, amount, {
                    length: itemCount
                }, this.isItemDisabled, true);
                this.setHighlightedIndex(nextHighlightedIndex, otherStateToSet);
            }
        };
        _proto.getStateAndHelpers = function getStateAndHelpers() {
            var _this$getState9 = this.getState(), highlightedIndex = _this$getState9.highlightedIndex, inputValue = _this$getState9.inputValue, selectedItem = _this$getState9.selectedItem, isOpen = _this$getState9.isOpen;
            var itemToString = this.props.itemToString;
            var id = this.id;
            var getRootProps = this.getRootProps, getToggleButtonProps = this.getToggleButtonProps, getLabelProps = this.getLabelProps, getMenuProps = this.getMenuProps, getInputProps = this.getInputProps, getItemProps = this.getItemProps, openMenu = this.openMenu, closeMenu = this.closeMenu, toggleMenu = this.toggleMenu, selectItem = this.selectItem, selectItemAtIndex = this.selectItemAtIndex, selectHighlightedItem = this.selectHighlightedItem, setHighlightedIndex = this.setHighlightedIndex, clearSelection = this.clearSelection, clearItems = this.clearItems, reset = this.reset, setItemCount = this.setItemCount, unsetItemCount = this.unsetItemCount, setState = this.internalSetState;
            return {
                // prop getters
                getRootProps: getRootProps,
                getToggleButtonProps: getToggleButtonProps,
                getLabelProps: getLabelProps,
                getMenuProps: getMenuProps,
                getInputProps: getInputProps,
                getItemProps: getItemProps,
                // actions
                reset: reset,
                openMenu: openMenu,
                closeMenu: closeMenu,
                toggleMenu: toggleMenu,
                selectItem: selectItem,
                selectItemAtIndex: selectItemAtIndex,
                selectHighlightedItem: selectHighlightedItem,
                setHighlightedIndex: setHighlightedIndex,
                clearSelection: clearSelection,
                clearItems: clearItems,
                setItemCount: setItemCount,
                unsetItemCount: unsetItemCount,
                setState: setState,
                // props
                itemToString: itemToString,
                // derived
                id: id,
                // state
                highlightedIndex: highlightedIndex,
                inputValue: inputValue,
                isOpen: isOpen,
                selectedItem: selectedItem
            };
        };
        _proto.componentDidMount = function componentDidMount() {
            var _this4 = this;
            /* istanbul ignore if (react-native or SSR) */ if (!this.props.environment) this.cleanup = function() {
                _this4.internalClearTimeouts();
            };
            else {
                // this.isMouseDown helps us track whether the mouse is currently held down.
                // This is useful when the user clicks on an item in the list, but holds the mouse
                // down long enough for the list to disappear (because the blur event fires on the input)
                // this.isMouseDown is used in the blur handler on the input to determine whether the blur event should
                // trigger hiding the menu.
                var onMouseDown = function onMouseDown() {
                    _this4.isMouseDown = true;
                };
                var onMouseUp = function onMouseUp(event) {
                    _this4.isMouseDown = false;
                    // if the target element or the activeElement is within a downshift node
                    // then we don't want to reset downshift
                    var contextWithinDownshift = $d0d825e43d8ba478$var$targetWithinDownshift(event.target, [
                        _this4._rootNode,
                        _this4._menuNode
                    ], _this4.props.environment);
                    if (!contextWithinDownshift && _this4.getState().isOpen) _this4.reset({
                        type: $d0d825e43d8ba478$var$mouseUp
                    }, function() {
                        return _this4.props.onOuterClick(_this4.getStateAndHelpers());
                    });
                };
                // Touching an element in iOS gives focus and hover states, but touching out of
                // the element will remove hover, and persist the focus state, resulting in the
                // blur event not being triggered.
                // this.isTouchMove helps us track whether the user is tapping or swiping on a touch screen.
                // If the user taps outside of Downshift, the component should be reset,
                // but not if the user is swiping
                var onTouchStart = function onTouchStart() {
                    _this4.isTouchMove = false;
                };
                var onTouchMove = function onTouchMove() {
                    _this4.isTouchMove = true;
                };
                var onTouchEnd = function onTouchEnd(event) {
                    var contextWithinDownshift = $d0d825e43d8ba478$var$targetWithinDownshift(event.target, [
                        _this4._rootNode,
                        _this4._menuNode
                    ], _this4.props.environment, false);
                    if (!_this4.isTouchMove && !contextWithinDownshift && _this4.getState().isOpen) _this4.reset({
                        type: $d0d825e43d8ba478$var$touchEnd
                    }, function() {
                        return _this4.props.onOuterClick(_this4.getStateAndHelpers());
                    });
                };
                var environment = this.props.environment;
                environment.addEventListener("mousedown", onMouseDown);
                environment.addEventListener("mouseup", onMouseUp);
                environment.addEventListener("touchstart", onTouchStart);
                environment.addEventListener("touchmove", onTouchMove);
                environment.addEventListener("touchend", onTouchEnd);
                this.cleanup = function() {
                    _this4.internalClearTimeouts();
                    _this4.updateStatus.cancel();
                    environment.removeEventListener("mousedown", onMouseDown);
                    environment.removeEventListener("mouseup", onMouseUp);
                    environment.removeEventListener("touchstart", onTouchStart);
                    environment.removeEventListener("touchmove", onTouchMove);
                    environment.removeEventListener("touchend", onTouchEnd);
                };
            }
        };
        _proto.shouldScroll = function shouldScroll(prevState, prevProps) {
            var _ref10 = this.props.highlightedIndex === undefined ? this.getState() : this.props, currentHighlightedIndex = _ref10.highlightedIndex;
            var _ref11 = prevProps.highlightedIndex === undefined ? prevState : prevProps, prevHighlightedIndex = _ref11.highlightedIndex;
            var scrollWhenOpen = currentHighlightedIndex && this.getState().isOpen && !prevState.isOpen;
            var scrollWhenNavigating = currentHighlightedIndex !== prevHighlightedIndex;
            return scrollWhenOpen || scrollWhenNavigating;
        };
        _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
            if ($d0d825e43d8ba478$var$isControlledProp(this.props, "selectedItem") && this.props.selectedItemChanged(prevProps.selectedItem, this.props.selectedItem)) this.internalSetState({
                type: $d0d825e43d8ba478$var$controlledPropUpdatedSelectedItem,
                inputValue: this.props.itemToString(this.props.selectedItem)
            });
            if (!this.avoidScrolling && this.shouldScroll(prevState, prevProps)) this.scrollHighlightedItemIntoView();
            this.updateStatus();
        };
        _proto.componentWillUnmount = function componentWillUnmount() {
            this.cleanup(); // avoids memory leak
        };
        _proto.render = function render() {
            var children = $d0d825e43d8ba478$var$unwrapArray(this.props.children, $d0d825e43d8ba478$var$noop);
            // because the items are rerendered every time we call the children
            // we clear this out each render and it will be populated again as
            // getItemProps is called.
            this.clearItems();
            // we reset this so we know whether the user calls getRootProps during
            // this render. If they do then we don't need to do anything,
            // if they don't then we need to clone the element they return and
            // apply the props for them.
            this.getRootProps.called = false;
            this.getRootProps.refKey = undefined;
            this.getRootProps.suppressRefError = undefined;
            // we do something similar for getMenuProps
            this.getMenuProps.called = false;
            this.getMenuProps.refKey = undefined;
            this.getMenuProps.suppressRefError = undefined;
            // we do something similar for getLabelProps
            this.getLabelProps.called = false;
            // and something similar for getInputProps
            this.getInputProps.called = false;
            var element = $d0d825e43d8ba478$var$unwrapArray(children(this.getStateAndHelpers()));
            if (!element) return null;
            if (this.getRootProps.called || this.props.suppressRefError) return element;
            else if ($d0d825e43d8ba478$var$isDOMElement(element)) // they didn't apply the root props, but we can clone
            // this and apply the props ourselves
            return /*#__PURE__*/ (0, $63SH6.cloneElement)(element, this.getRootProps($d0d825e43d8ba478$var$getElementProps(element)));
            /* istanbul ignore next */ return undefined;
        };
        return Downshift;
    }((0, $63SH6.Component));
    Downshift.defaultProps = {
        defaultHighlightedIndex: null,
        defaultIsOpen: false,
        getA11yStatusMessage: $d0d825e43d8ba478$var$getA11yStatusMessage$1,
        itemToString: function itemToString(i) {
            if (i == null) return "";
            return String(i);
        },
        onStateChange: $d0d825e43d8ba478$var$noop,
        onInputValueChange: $d0d825e43d8ba478$var$noop,
        onUserAction: $d0d825e43d8ba478$var$noop,
        onChange: $d0d825e43d8ba478$var$noop,
        onSelect: $d0d825e43d8ba478$var$noop,
        onOuterClick: $d0d825e43d8ba478$var$noop,
        selectedItemChanged: function selectedItemChanged(prevItem, item) {
            return prevItem !== item;
        },
        environment: /* istanbul ignore next (ssr) */ typeof window === "undefined" || false ? undefined : window,
        stateReducer: function stateReducer(state, stateToSet) {
            return stateToSet;
        },
        suppressRefError: false,
        scrollIntoView: $d0d825e43d8ba478$var$scrollIntoView
    };
    Downshift.stateChangeTypes = $d0d825e43d8ba478$var$stateChangeTypes$3;
    return Downshift;
}();
var $d0d825e43d8ba478$export$2e2bcd8739ae039 = $d0d825e43d8ba478$var$Downshift;
function $d0d825e43d8ba478$var$validateGetMenuPropsCalledCorrectly(node, _ref12) {
    var refKey = _ref12.refKey;
    if (!node) // eslint-disable-next-line no-console
    console.error('downshift: The ref prop "' + refKey + '" from getMenuProps was not applied correctly on your menu element.');
}
function $d0d825e43d8ba478$var$validateGetRootPropsCalledCorrectly(element, _ref13) {
    var refKey = _ref13.refKey;
    var refKeySpecified = refKey !== "ref";
    var isComposite = !$d0d825e43d8ba478$var$isDOMElement(element);
    if (isComposite && !refKeySpecified && !(0, $2oqnz.isForwardRef)(element)) // eslint-disable-next-line no-console
    console.error("downshift: You returned a non-DOM element. You must specify a refKey in getRootProps");
    else if (!isComposite && refKeySpecified) // eslint-disable-next-line no-console
    console.error('downshift: You returned a DOM element. You should not specify a refKey in getRootProps. You specified "' + refKey + '"');
    if (!(0, $2oqnz.isForwardRef)(element) && !$d0d825e43d8ba478$var$getElementProps(element)[refKey]) // eslint-disable-next-line no-console
    console.error('downshift: You must apply the ref prop "' + refKey + '" from getRootProps onto your root element.');
}
var $d0d825e43d8ba478$var$_excluded$3 = [
    "isInitialMount",
    "highlightedIndex",
    "items",
    "environment"
];
var $d0d825e43d8ba478$var$dropdownDefaultStateValues = {
    highlightedIndex: -1,
    isOpen: false,
    selectedItem: null,
    inputValue: ""
};
function $d0d825e43d8ba478$var$callOnChangeProps(action, state, newState) {
    var props = action.props, type = action.type;
    var changes = {};
    Object.keys(state).forEach(function(key) {
        $d0d825e43d8ba478$var$invokeOnChangeHandler(key, action, state, newState);
        if (newState[key] !== state[key]) changes[key] = newState[key];
    });
    if (props.onStateChange && Object.keys(changes).length) props.onStateChange((0, $uwkDK.default)({
        type: type
    }, changes));
}
function $d0d825e43d8ba478$var$invokeOnChangeHandler(key, action, state, newState) {
    var props = action.props, type = action.type;
    var handler = "on" + $d0d825e43d8ba478$var$capitalizeString(key) + "Change";
    if (props[handler] && newState[key] !== undefined && newState[key] !== state[key]) props[handler]((0, $uwkDK.default)({
        type: type
    }, newState));
}
/**
 * Default state reducer that returns the changes.
 *
 * @param {Object} s state.
 * @param {Object} a action with changes.
 * @returns {Object} changes.
 */ function $d0d825e43d8ba478$var$stateReducer(s, a) {
    return a.changes;
}
/**
 * Returns a message to be added to aria-live region when item is selected.
 *
 * @param {Object} selectionParameters Parameters required to build the message.
 * @returns {string} The a11y message.
 */ function $d0d825e43d8ba478$var$getA11ySelectionMessage(selectionParameters) {
    var selectedItem = selectionParameters.selectedItem, itemToStringLocal = selectionParameters.itemToString;
    return selectedItem ? itemToStringLocal(selectedItem) + " has been selected." : "";
}
/**
 * Debounced call for updating the a11y message.
 */ var $d0d825e43d8ba478$var$updateA11yStatus = $d0d825e43d8ba478$var$debounce(function(getA11yMessage, document) {
    $d0d825e43d8ba478$var$setStatus(getA11yMessage(), document);
}, 200);
// istanbul ignore next
var $d0d825e43d8ba478$var$useIsomorphicLayoutEffect = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined" ? (0, $63SH6.useLayoutEffect) : (0, $63SH6.useEffect);
// istanbul ignore next
var $d0d825e43d8ba478$var$useElementIds = "useId" in (0, (/*@__PURE__*/$parcel$interopDefault($63SH6)) // Avoid conditional useId call
) ? function useElementIds(_ref) {
    var id = _ref.id, labelId = _ref.labelId, menuId = _ref.menuId, getItemId = _ref.getItemId, toggleButtonId = _ref.toggleButtonId, inputId = _ref.inputId;
    // Avoid conditional useId call
    var reactId = "downshift-" + (0, (/*@__PURE__*/$parcel$interopDefault($63SH6))).useId();
    if (!id) id = reactId;
    var elementIdsRef = (0, $63SH6.useRef)({
        labelId: labelId || id + "-label",
        menuId: menuId || id + "-menu",
        getItemId: getItemId || function(index) {
            return id + "-item-" + index;
        },
        toggleButtonId: toggleButtonId || id + "-toggle-button",
        inputId: inputId || id + "-input"
    });
    return elementIdsRef.current;
} : function useElementIds(_ref2) {
    var _ref2$id = _ref2.id, id = _ref2$id === void 0 ? "downshift-" + $d0d825e43d8ba478$var$generateId() : _ref2$id, labelId = _ref2.labelId, menuId = _ref2.menuId, getItemId = _ref2.getItemId, toggleButtonId = _ref2.toggleButtonId, inputId = _ref2.inputId;
    var elementIdsRef = (0, $63SH6.useRef)({
        labelId: labelId || id + "-label",
        menuId: menuId || id + "-menu",
        getItemId: getItemId || function(index) {
            return id + "-item-" + index;
        },
        toggleButtonId: toggleButtonId || id + "-toggle-button",
        inputId: inputId || id + "-input"
    });
    return elementIdsRef.current;
};
function $d0d825e43d8ba478$var$getItemAndIndex(itemProp, indexProp, items, errorMessage) {
    var item, index;
    if (itemProp === undefined) {
        if (indexProp === undefined) throw new Error(errorMessage);
        item = items[indexProp];
        index = indexProp;
    } else {
        index = indexProp === undefined ? items.indexOf(itemProp) : indexProp;
        item = itemProp;
    }
    return [
        item,
        index
    ];
}
function $d0d825e43d8ba478$var$itemToString(item) {
    return item ? String(item) : "";
}
function $d0d825e43d8ba478$var$isAcceptedCharacterKey(key) {
    return /^\S{1}$/.test(key);
}
function $d0d825e43d8ba478$var$capitalizeString(string) {
    return "" + string.slice(0, 1).toUpperCase() + string.slice(1);
}
function $d0d825e43d8ba478$var$useLatestRef(val) {
    var ref = (0, $63SH6.useRef)(val);
    // technically this is not "concurrent mode safe" because we're manipulating
    // the value during render (so it's not idempotent). However, the places this
    // hook is used is to support memoizing callbacks which will be called
    // *during* render, so we need the latest values *during* render.
    // If not for this, then we'd probably want to use useLayoutEffect instead.
    ref.current = val;
    return ref;
}
/**
 * Computes the controlled state using a the previous state, props,
 * two reducers, one from downshift and an optional one from the user.
 * Also calls the onChange handlers for state values that have changed.
 *
 * @param {Function} reducer Reducer function from downshift.
 * @param {Object} initialState Initial state of the hook.
 * @param {Object} props The hook props.
 * @returns {Array} An array with the state and an action dispatcher.
 */ function $d0d825e43d8ba478$var$useEnhancedReducer(reducer, initialState, props) {
    var prevStateRef = (0, $63SH6.useRef)();
    var actionRef = (0, $63SH6.useRef)();
    var enhancedReducer = (0, $63SH6.useCallback)(function(state, action) {
        actionRef.current = action;
        state = $d0d825e43d8ba478$var$getState(state, action.props);
        var changes = reducer(state, action);
        var newState = action.props.stateReducer(state, (0, $uwkDK.default)({}, action, {
            changes: changes
        }));
        return newState;
    }, [
        reducer
    ]);
    var _useReducer = (0, $63SH6.useReducer)(enhancedReducer, initialState), state = _useReducer[0], dispatch = _useReducer[1];
    var propsRef = $d0d825e43d8ba478$var$useLatestRef(props);
    var dispatchWithProps = (0, $63SH6.useCallback)(function(action) {
        return dispatch((0, $uwkDK.default)({
            props: propsRef.current
        }, action));
    }, [
        propsRef
    ]);
    var action = actionRef.current;
    (0, $63SH6.useEffect)(function() {
        if (action && prevStateRef.current && prevStateRef.current !== state) $d0d825e43d8ba478$var$callOnChangeProps(action, $d0d825e43d8ba478$var$getState(prevStateRef.current, action.props), state);
        prevStateRef.current = state;
    }, [
        state,
        props,
        action
    ]);
    return [
        state,
        dispatchWithProps
    ];
}
/**
 * Wraps the useEnhancedReducer and applies the controlled prop values before
 * returning the new state.
 *
 * @param {Function} reducer Reducer function from downshift.
 * @param {Object} initialState Initial state of the hook.
 * @param {Object} props The hook props.
 * @returns {Array} An array with the state and an action dispatcher.
 */ function $d0d825e43d8ba478$var$useControlledReducer$1(reducer, initialState, props) {
    var _useEnhancedReducer = $d0d825e43d8ba478$var$useEnhancedReducer(reducer, initialState, props), state = _useEnhancedReducer[0], dispatch = _useEnhancedReducer[1];
    return [
        $d0d825e43d8ba478$var$getState(state, props),
        dispatch
    ];
}
var $d0d825e43d8ba478$var$defaultProps$3 = {
    itemToString: $d0d825e43d8ba478$var$itemToString,
    stateReducer: $d0d825e43d8ba478$var$stateReducer,
    getA11ySelectionMessage: $d0d825e43d8ba478$var$getA11ySelectionMessage,
    scrollIntoView: $d0d825e43d8ba478$var$scrollIntoView,
    environment: /* istanbul ignore next (ssr) */ typeof window === "undefined" || false ? undefined : window
};
function $d0d825e43d8ba478$var$getDefaultValue$1(props, propKey, defaultStateValues) {
    if (defaultStateValues === void 0) defaultStateValues = $d0d825e43d8ba478$var$dropdownDefaultStateValues;
    var defaultValue = props["default" + $d0d825e43d8ba478$var$capitalizeString(propKey)];
    if (defaultValue !== undefined) return defaultValue;
    return defaultStateValues[propKey];
}
function $d0d825e43d8ba478$var$getInitialValue$1(props, propKey, defaultStateValues) {
    if (defaultStateValues === void 0) defaultStateValues = $d0d825e43d8ba478$var$dropdownDefaultStateValues;
    var value = props[propKey];
    if (value !== undefined) return value;
    var initialValue = props["initial" + $d0d825e43d8ba478$var$capitalizeString(propKey)];
    if (initialValue !== undefined) return initialValue;
    return $d0d825e43d8ba478$var$getDefaultValue$1(props, propKey, defaultStateValues);
}
function $d0d825e43d8ba478$var$getInitialState$2(props) {
    var selectedItem = $d0d825e43d8ba478$var$getInitialValue$1(props, "selectedItem");
    var isOpen = $d0d825e43d8ba478$var$getInitialValue$1(props, "isOpen");
    var highlightedIndex = $d0d825e43d8ba478$var$getInitialValue$1(props, "highlightedIndex");
    var inputValue = $d0d825e43d8ba478$var$getInitialValue$1(props, "inputValue");
    return {
        highlightedIndex: highlightedIndex < 0 && selectedItem && isOpen ? props.items.indexOf(selectedItem) : highlightedIndex,
        isOpen: isOpen,
        selectedItem: selectedItem,
        inputValue: inputValue
    };
}
function $d0d825e43d8ba478$var$getHighlightedIndexOnOpen(props, state, offset) {
    var items = props.items, initialHighlightedIndex = props.initialHighlightedIndex, defaultHighlightedIndex = props.defaultHighlightedIndex;
    var selectedItem = state.selectedItem, highlightedIndex = state.highlightedIndex;
    if (items.length === 0) return -1;
    // initialHighlightedIndex will give value to highlightedIndex on initial state only.
    if (initialHighlightedIndex !== undefined && highlightedIndex === initialHighlightedIndex) return initialHighlightedIndex;
    if (defaultHighlightedIndex !== undefined) return defaultHighlightedIndex;
    if (selectedItem) return items.indexOf(selectedItem);
    if (offset === 0) return -1;
    return offset < 0 ? items.length - 1 : 0;
}
/**
 * Reuse the movement tracking of mouse and touch events.
 *
 * @param {boolean} isOpen Whether the dropdown is open or not.
 * @param {Array<Object>} downshiftElementRefs Downshift element refs to track movement (toggleButton, menu etc.)
 * @param {Object} environment Environment where component/hook exists.
 * @param {Function} handleBlur Handler on blur from mouse or touch.
 * @returns {Object} Ref containing whether mouseDown or touchMove event is happening
 */ function $d0d825e43d8ba478$var$useMouseAndTouchTracker(isOpen, downshiftElementRefs, environment, handleBlur) {
    var mouseAndTouchTrackersRef = (0, $63SH6.useRef)({
        isMouseDown: false,
        isTouchMove: false
    });
    (0, $63SH6.useEffect)(function() {
        if (!environment) return;
        // The same strategy for checking if a click occurred inside or outside downshift
        // as in downshift.js.
        var onMouseDown = function onMouseDown() {
            mouseAndTouchTrackersRef.current.isMouseDown = true;
        };
        var onMouseUp = function onMouseUp(event) {
            mouseAndTouchTrackersRef.current.isMouseDown = false;
            if (isOpen && !$d0d825e43d8ba478$var$targetWithinDownshift(event.target, downshiftElementRefs.map(function(ref) {
                return ref.current;
            }), environment)) handleBlur();
        };
        var onTouchStart = function onTouchStart() {
            mouseAndTouchTrackersRef.current.isTouchMove = false;
        };
        var onTouchMove = function onTouchMove() {
            mouseAndTouchTrackersRef.current.isTouchMove = true;
        };
        var onTouchEnd = function onTouchEnd(event) {
            if (isOpen && !mouseAndTouchTrackersRef.current.isTouchMove && !$d0d825e43d8ba478$var$targetWithinDownshift(event.target, downshiftElementRefs.map(function(ref) {
                return ref.current;
            }), environment, false)) handleBlur();
        };
        environment.addEventListener("mousedown", onMouseDown);
        environment.addEventListener("mouseup", onMouseUp);
        environment.addEventListener("touchstart", onTouchStart);
        environment.addEventListener("touchmove", onTouchMove);
        environment.addEventListener("touchend", onTouchEnd);
        // eslint-disable-next-line consistent-return
        return function cleanup() {
            environment.removeEventListener("mousedown", onMouseDown);
            environment.removeEventListener("mouseup", onMouseUp);
            environment.removeEventListener("touchstart", onTouchStart);
            environment.removeEventListener("touchmove", onTouchMove);
            environment.removeEventListener("touchend", onTouchEnd);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        isOpen,
        environment
    ]);
    return mouseAndTouchTrackersRef;
}
/* istanbul ignore next */ // eslint-disable-next-line import/no-mutable-exports
var $d0d825e43d8ba478$var$useGetterPropsCalledChecker = function useGetterPropsCalledChecker() {
    return $d0d825e43d8ba478$var$noop;
};
function $d0d825e43d8ba478$var$useA11yMessageSetter(getA11yMessage, dependencyArray, _ref3) {
    var isInitialMount = _ref3.isInitialMount, highlightedIndex = _ref3.highlightedIndex, items = _ref3.items, environment = _ref3.environment, rest = (0, $8WqTz.default)(_ref3, $d0d825e43d8ba478$var$_excluded$3);
    // Sets a11y status message on changes in state.
    (0, $63SH6.useEffect)(function() {
        if (isInitialMount || false || !(environment != null && environment.document)) return;
        $d0d825e43d8ba478$var$updateA11yStatus(function() {
            return getA11yMessage((0, $uwkDK.default)({
                highlightedIndex: highlightedIndex,
                highlightedItem: items[highlightedIndex],
                resultCount: items.length
            }, rest));
        }, environment.document);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencyArray);
}
function $d0d825e43d8ba478$var$useScrollIntoView(_ref4) {
    var highlightedIndex = _ref4.highlightedIndex, isOpen = _ref4.isOpen, itemRefs = _ref4.itemRefs, getItemNodeFromIndex = _ref4.getItemNodeFromIndex, menuElement = _ref4.menuElement, scrollIntoViewProp = _ref4.scrollIntoView;
    // used not to scroll on highlight by mouse.
    var shouldScrollRef = (0, $63SH6.useRef)(true);
    // Scroll on highlighted item if change comes from keyboard.
    $d0d825e43d8ba478$var$useIsomorphicLayoutEffect(function() {
        if (highlightedIndex < 0 || !isOpen || !Object.keys(itemRefs.current).length) return;
        if (shouldScrollRef.current === false) shouldScrollRef.current = true;
        else scrollIntoViewProp(getItemNodeFromIndex(highlightedIndex), menuElement);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        highlightedIndex
    ]);
    return shouldScrollRef;
}
// eslint-disable-next-line import/no-mutable-exports
var $d0d825e43d8ba478$var$useControlPropsValidator = $d0d825e43d8ba478$var$noop;
/**
 * Handles selection on Enter / Alt + ArrowUp. Closes the menu and resets the highlighted index, unless there is a highlighted.
 * In that case, selects the item and resets to defaults for open state and highlighted idex.
 * @param {Object} props The useCombobox props.
 * @param {number} highlightedIndex The index from the state.
 * @param {boolean} inputValue Also return the input value for state.
 * @returns The changes for the state.
 */ function $d0d825e43d8ba478$var$getChangesOnSelection(props, highlightedIndex, inputValue) {
    var _props$items;
    if (inputValue === void 0) inputValue = true;
    var shouldSelect = ((_props$items = props.items) == null ? void 0 : _props$items.length) && highlightedIndex >= 0;
    return (0, $uwkDK.default)({
        isOpen: false,
        highlightedIndex: -1
    }, shouldSelect && (0, $uwkDK.default)({
        selectedItem: props.items[highlightedIndex],
        isOpen: $d0d825e43d8ba478$var$getDefaultValue$1(props, "isOpen"),
        highlightedIndex: $d0d825e43d8ba478$var$getDefaultValue$1(props, "highlightedIndex")
    }, inputValue && {
        inputValue: props.itemToString(props.items[highlightedIndex])
    }));
}
// Shared between all exports.
var $d0d825e43d8ba478$var$commonPropTypes = {
    environment: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).shape({
        addEventListener: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).func.isRequired,
        removeEventListener: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).func.isRequired,
        document: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).shape({
            createElement: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).func.isRequired,
            getElementById: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).func.isRequired,
            activeElement: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).any.isRequired,
            body: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).any.isRequired
        }).isRequired,
        Node: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).func.isRequired
    }),
    itemToString: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).func,
    stateReducer: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).func
};
// Shared between useSelect, useCombobox, Downshift.
var $d0d825e43d8ba478$var$commonDropdownPropTypes = (0, $uwkDK.default)({}, $d0d825e43d8ba478$var$commonPropTypes, {
    getA11yStatusMessage: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).func,
    highlightedIndex: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).number,
    defaultHighlightedIndex: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).number,
    initialHighlightedIndex: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).number,
    isOpen: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).bool,
    defaultIsOpen: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).bool,
    initialIsOpen: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).bool,
    selectedItem: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).any,
    initialSelectedItem: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).any,
    defaultSelectedItem: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).any,
    id: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).string,
    labelId: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).string,
    menuId: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).string,
    getItemId: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).func,
    toggleButtonId: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).string,
    onSelectedItemChange: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).func,
    onHighlightedIndexChange: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).func,
    onStateChange: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).func,
    onIsOpenChange: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).func,
    scrollIntoView: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).func
});
function $d0d825e43d8ba478$var$downshiftCommonReducer(state, action, stateChangeTypes) {
    var type = action.type, props = action.props;
    var changes;
    switch(type){
        case stateChangeTypes.ItemMouseMove:
            changes = {
                highlightedIndex: action.disabled ? -1 : action.index
            };
            break;
        case stateChangeTypes.MenuMouseLeave:
            changes = {
                highlightedIndex: -1
            };
            break;
        case stateChangeTypes.ToggleButtonClick:
        case stateChangeTypes.FunctionToggleMenu:
            changes = {
                isOpen: !state.isOpen,
                highlightedIndex: state.isOpen ? -1 : $d0d825e43d8ba478$var$getHighlightedIndexOnOpen(props, state, 0)
            };
            break;
        case stateChangeTypes.FunctionOpenMenu:
            changes = {
                isOpen: true,
                highlightedIndex: $d0d825e43d8ba478$var$getHighlightedIndexOnOpen(props, state, 0)
            };
            break;
        case stateChangeTypes.FunctionCloseMenu:
            changes = {
                isOpen: false
            };
            break;
        case stateChangeTypes.FunctionSetHighlightedIndex:
            changes = {
                highlightedIndex: action.highlightedIndex
            };
            break;
        case stateChangeTypes.FunctionSetInputValue:
            changes = {
                inputValue: action.inputValue
            };
            break;
        case stateChangeTypes.FunctionReset:
            changes = {
                highlightedIndex: $d0d825e43d8ba478$var$getDefaultValue$1(props, "highlightedIndex"),
                isOpen: $d0d825e43d8ba478$var$getDefaultValue$1(props, "isOpen"),
                selectedItem: $d0d825e43d8ba478$var$getDefaultValue$1(props, "selectedItem"),
                inputValue: $d0d825e43d8ba478$var$getDefaultValue$1(props, "inputValue")
            };
            break;
        default:
            throw new Error("Reducer called without proper action type.");
    }
    return (0, $uwkDK.default)({}, state, changes);
}
/* eslint-enable complexity */ function $d0d825e43d8ba478$var$getItemIndexByCharacterKey(_a) {
    var keysSoFar = _a.keysSoFar, highlightedIndex = _a.highlightedIndex, items = _a.items, itemToString = _a.itemToString, isItemDisabled = _a.isItemDisabled;
    var lowerCasedKeysSoFar = keysSoFar.toLowerCase();
    for(var index = 0; index < items.length; index++){
        // if we already have a search query in progress, we also consider the current highlighted item.
        var offsetIndex = (index + highlightedIndex + (keysSoFar.length < 2 ? 1 : 0)) % items.length;
        var item = items[offsetIndex];
        if (item !== undefined && itemToString(item).toLowerCase().startsWith(lowerCasedKeysSoFar) && !isItemDisabled(item, offsetIndex)) return offsetIndex;
    }
    return highlightedIndex;
}
var $d0d825e43d8ba478$var$propTypes$2 = (0, $7Dnph.__assign)((0, $7Dnph.__assign)({}, $d0d825e43d8ba478$var$commonDropdownPropTypes), {
    items: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).array.isRequired,
    isItemDisabled: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).func,
    getA11ySelectionMessage: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).func
});
/**
 * Default implementation for status message. Only added when menu is open.
 * Will specift if there are results in the list, and if so, how many,
 * and what keys are relevant.
 *
 * @param {Object} param the downshift state and other relevant properties
 * @return {String} the a11y status message
 */ function $d0d825e43d8ba478$var$getA11yStatusMessage(_a) {
    var isOpen = _a.isOpen, resultCount = _a.resultCount, previousResultCount = _a.previousResultCount;
    if (!isOpen) return "";
    if (!resultCount) return "No results are available.";
    if (resultCount !== previousResultCount) return "".concat(resultCount, " result").concat(resultCount === 1 ? " is" : "s are", " available, use up and down arrow keys to navigate. Press Enter or Space Bar keys to select.");
    return "";
}
var $d0d825e43d8ba478$var$defaultProps$2 = (0, $7Dnph.__assign)((0, $7Dnph.__assign)({}, $d0d825e43d8ba478$var$defaultProps$3), {
    getA11yStatusMessage: $d0d825e43d8ba478$var$getA11yStatusMessage,
    isItemDisabled: function() {
        return false;
    }
});
// eslint-disable-next-line import/no-mutable-exports
var $d0d825e43d8ba478$var$validatePropTypes$2 = $d0d825e43d8ba478$var$noop;
var $d0d825e43d8ba478$var$ToggleButtonClick$1 = 0;
var $d0d825e43d8ba478$var$ToggleButtonKeyDownArrowDown = 1;
var $d0d825e43d8ba478$var$ToggleButtonKeyDownArrowUp = 2;
var $d0d825e43d8ba478$var$ToggleButtonKeyDownCharacter = 3;
var $d0d825e43d8ba478$var$ToggleButtonKeyDownEscape = 4;
var $d0d825e43d8ba478$var$ToggleButtonKeyDownHome = 5;
var $d0d825e43d8ba478$var$ToggleButtonKeyDownEnd = 6;
var $d0d825e43d8ba478$var$ToggleButtonKeyDownEnter = 7;
var $d0d825e43d8ba478$var$ToggleButtonKeyDownSpaceButton = 8;
var $d0d825e43d8ba478$var$ToggleButtonKeyDownPageUp = 9;
var $d0d825e43d8ba478$var$ToggleButtonKeyDownPageDown = 10;
var $d0d825e43d8ba478$var$ToggleButtonBlur = 11;
var $d0d825e43d8ba478$var$MenuMouseLeave$1 = 12;
var $d0d825e43d8ba478$var$ItemMouseMove$1 = 13;
var $d0d825e43d8ba478$var$ItemClick$1 = 14;
var $d0d825e43d8ba478$var$FunctionToggleMenu$1 = 15;
var $d0d825e43d8ba478$var$FunctionOpenMenu$1 = 16;
var $d0d825e43d8ba478$var$FunctionCloseMenu$1 = 17;
var $d0d825e43d8ba478$var$FunctionSetHighlightedIndex$1 = 18;
var $d0d825e43d8ba478$var$FunctionSelectItem$1 = 19;
var $d0d825e43d8ba478$var$FunctionSetInputValue$1 = 20;
var $d0d825e43d8ba478$var$FunctionReset$2 = 21;
var $d0d825e43d8ba478$var$stateChangeTypes$2 = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    ToggleButtonClick: $d0d825e43d8ba478$var$ToggleButtonClick$1,
    ToggleButtonKeyDownArrowDown: $d0d825e43d8ba478$var$ToggleButtonKeyDownArrowDown,
    ToggleButtonKeyDownArrowUp: $d0d825e43d8ba478$var$ToggleButtonKeyDownArrowUp,
    ToggleButtonKeyDownCharacter: $d0d825e43d8ba478$var$ToggleButtonKeyDownCharacter,
    ToggleButtonKeyDownEscape: $d0d825e43d8ba478$var$ToggleButtonKeyDownEscape,
    ToggleButtonKeyDownHome: $d0d825e43d8ba478$var$ToggleButtonKeyDownHome,
    ToggleButtonKeyDownEnd: $d0d825e43d8ba478$var$ToggleButtonKeyDownEnd,
    ToggleButtonKeyDownEnter: $d0d825e43d8ba478$var$ToggleButtonKeyDownEnter,
    ToggleButtonKeyDownSpaceButton: $d0d825e43d8ba478$var$ToggleButtonKeyDownSpaceButton,
    ToggleButtonKeyDownPageUp: $d0d825e43d8ba478$var$ToggleButtonKeyDownPageUp,
    ToggleButtonKeyDownPageDown: $d0d825e43d8ba478$var$ToggleButtonKeyDownPageDown,
    ToggleButtonBlur: $d0d825e43d8ba478$var$ToggleButtonBlur,
    MenuMouseLeave: $d0d825e43d8ba478$var$MenuMouseLeave$1,
    ItemMouseMove: $d0d825e43d8ba478$var$ItemMouseMove$1,
    ItemClick: $d0d825e43d8ba478$var$ItemClick$1,
    FunctionToggleMenu: $d0d825e43d8ba478$var$FunctionToggleMenu$1,
    FunctionOpenMenu: $d0d825e43d8ba478$var$FunctionOpenMenu$1,
    FunctionCloseMenu: $d0d825e43d8ba478$var$FunctionCloseMenu$1,
    FunctionSetHighlightedIndex: $d0d825e43d8ba478$var$FunctionSetHighlightedIndex$1,
    FunctionSelectItem: $d0d825e43d8ba478$var$FunctionSelectItem$1,
    FunctionSetInputValue: $d0d825e43d8ba478$var$FunctionSetInputValue$1,
    FunctionReset: $d0d825e43d8ba478$var$FunctionReset$2
});
/* eslint-disable complexity */ function $d0d825e43d8ba478$var$downshiftSelectReducer(state, action) {
    var _props$items;
    var type = action.type, props = action.props, altKey = action.altKey;
    var changes;
    switch(type){
        case $d0d825e43d8ba478$var$ItemClick$1:
            changes = {
                isOpen: $d0d825e43d8ba478$var$getDefaultValue$1(props, "isOpen"),
                highlightedIndex: $d0d825e43d8ba478$var$getDefaultValue$1(props, "highlightedIndex"),
                selectedItem: props.items[action.index]
            };
            break;
        case $d0d825e43d8ba478$var$ToggleButtonKeyDownCharacter:
            var lowercasedKey = action.key;
            var inputValue = "" + state.inputValue + lowercasedKey;
            var prevHighlightedIndex = !state.isOpen && state.selectedItem ? props.items.indexOf(state.selectedItem) : state.highlightedIndex;
            var highlightedIndex = $d0d825e43d8ba478$var$getItemIndexByCharacterKey({
                keysSoFar: inputValue,
                highlightedIndex: prevHighlightedIndex,
                items: props.items,
                itemToString: props.itemToString,
                isItemDisabled: props.isItemDisabled
            });
            changes = {
                inputValue: inputValue,
                highlightedIndex: highlightedIndex,
                isOpen: true
            };
            break;
        case $d0d825e43d8ba478$var$ToggleButtonKeyDownArrowDown:
            var _highlightedIndex = state.isOpen ? $d0d825e43d8ba478$var$getHighlightedIndex(state.highlightedIndex, 1, props.items, props.isItemDisabled) : altKey && state.selectedItem == null ? -1 : $d0d825e43d8ba478$var$getHighlightedIndexOnOpen(props, state, 1);
            changes = {
                highlightedIndex: _highlightedIndex,
                isOpen: true
            };
            break;
        case $d0d825e43d8ba478$var$ToggleButtonKeyDownArrowUp:
            if (state.isOpen && altKey) changes = $d0d825e43d8ba478$var$getChangesOnSelection(props, state.highlightedIndex, false);
            else {
                var _highlightedIndex2 = state.isOpen ? $d0d825e43d8ba478$var$getHighlightedIndex(state.highlightedIndex, -1, props.items, props.isItemDisabled) : $d0d825e43d8ba478$var$getHighlightedIndexOnOpen(props, state, -1);
                changes = {
                    highlightedIndex: _highlightedIndex2,
                    isOpen: true
                };
            }
            break;
        // only triggered when menu is open.
        case $d0d825e43d8ba478$var$ToggleButtonKeyDownEnter:
        case $d0d825e43d8ba478$var$ToggleButtonKeyDownSpaceButton:
            changes = $d0d825e43d8ba478$var$getChangesOnSelection(props, state.highlightedIndex, false);
            break;
        case $d0d825e43d8ba478$var$ToggleButtonKeyDownHome:
            changes = {
                highlightedIndex: $d0d825e43d8ba478$var$getNonDisabledIndex(0, false, props.items, props.isItemDisabled),
                isOpen: true
            };
            break;
        case $d0d825e43d8ba478$var$ToggleButtonKeyDownEnd:
            changes = {
                highlightedIndex: $d0d825e43d8ba478$var$getNonDisabledIndex(props.items.length - 1, true, props.items, props.isItemDisabled),
                isOpen: true
            };
            break;
        case $d0d825e43d8ba478$var$ToggleButtonKeyDownPageUp:
            changes = {
                highlightedIndex: $d0d825e43d8ba478$var$getHighlightedIndex(state.highlightedIndex, -10, props.items, props.isItemDisabled)
            };
            break;
        case $d0d825e43d8ba478$var$ToggleButtonKeyDownPageDown:
            changes = {
                highlightedIndex: $d0d825e43d8ba478$var$getHighlightedIndex(state.highlightedIndex, 10, props.items, props.isItemDisabled)
            };
            break;
        case $d0d825e43d8ba478$var$ToggleButtonKeyDownEscape:
            changes = {
                isOpen: false,
                highlightedIndex: -1
            };
            break;
        case $d0d825e43d8ba478$var$ToggleButtonBlur:
            changes = (0, $uwkDK.default)({
                isOpen: false,
                highlightedIndex: -1
            }, state.highlightedIndex >= 0 && ((_props$items = props.items) == null ? void 0 : _props$items.length) && {
                selectedItem: props.items[state.highlightedIndex]
            });
            break;
        case $d0d825e43d8ba478$var$FunctionSelectItem$1:
            changes = {
                selectedItem: action.selectedItem
            };
            break;
        default:
            return $d0d825e43d8ba478$var$downshiftCommonReducer(state, action, $d0d825e43d8ba478$var$stateChangeTypes$2);
    }
    return (0, $uwkDK.default)({}, state, changes);
}
/* eslint-enable complexity */ var $d0d825e43d8ba478$var$_excluded$2 = [
    "onMouseLeave",
    "refKey",
    "ref"
], $d0d825e43d8ba478$var$_excluded2$2 = [
    "onBlur",
    "onClick",
    "onPress",
    "onKeyDown",
    "refKey",
    "ref"
], $d0d825e43d8ba478$var$_excluded3$1 = [
    "item",
    "index",
    "onMouseMove",
    "onClick",
    "onMouseDown",
    "onPress",
    "refKey",
    "disabled",
    "ref"
];
$d0d825e43d8ba478$export$e64b2f635402ca43.stateChangeTypes = $d0d825e43d8ba478$var$stateChangeTypes$2;
function $d0d825e43d8ba478$export$e64b2f635402ca43(userProps) {
    if (userProps === void 0) userProps = {};
    $d0d825e43d8ba478$var$validatePropTypes$2(userProps, $d0d825e43d8ba478$export$e64b2f635402ca43);
    // Props defaults and destructuring.
    var props = (0, $uwkDK.default)({}, $d0d825e43d8ba478$var$defaultProps$2, userProps);
    var items = props.items, scrollIntoView = props.scrollIntoView, environment = props.environment, itemToString = props.itemToString, getA11ySelectionMessage = props.getA11ySelectionMessage, getA11yStatusMessage = props.getA11yStatusMessage;
    // Initial state depending on controlled props.
    var initialState = $d0d825e43d8ba478$var$getInitialState$2(props);
    var _useControlledReducer = $d0d825e43d8ba478$var$useControlledReducer$1($d0d825e43d8ba478$var$downshiftSelectReducer, initialState, props), state = _useControlledReducer[0], dispatch = _useControlledReducer[1];
    var isOpen = state.isOpen, highlightedIndex = state.highlightedIndex, selectedItem = state.selectedItem, inputValue = state.inputValue;
    // Element efs.
    var toggleButtonRef = (0, $63SH6.useRef)(null);
    var menuRef = (0, $63SH6.useRef)(null);
    var itemRefs = (0, $63SH6.useRef)({});
    // used to keep the inputValue clearTimeout object between renders.
    var clearTimeoutRef = (0, $63SH6.useRef)(null);
    // prevent id re-generation between renders.
    var elementIds = $d0d825e43d8ba478$var$useElementIds(props);
    // used to keep track of how many items we had on previous cycle.
    var previousResultCountRef = (0, $63SH6.useRef)();
    var isInitialMountRef = (0, $63SH6.useRef)(true);
    // utility callback to get item element.
    var latest = $d0d825e43d8ba478$var$useLatestRef({
        state: state,
        props: props
    });
    // Some utils.
    var getItemNodeFromIndex = (0, $63SH6.useCallback)(function(index) {
        return itemRefs.current[elementIds.getItemId(index)];
    }, [
        elementIds
    ]);
    // Effects.
    // Sets a11y status message on changes in state.
    $d0d825e43d8ba478$var$useA11yMessageSetter(getA11yStatusMessage, [
        isOpen,
        highlightedIndex,
        inputValue,
        items
    ], (0, $uwkDK.default)({
        isInitialMount: isInitialMountRef.current,
        previousResultCount: previousResultCountRef.current,
        items: items,
        environment: environment,
        itemToString: itemToString
    }, state));
    // Sets a11y status message on changes in selectedItem.
    $d0d825e43d8ba478$var$useA11yMessageSetter(getA11ySelectionMessage, [
        selectedItem
    ], (0, $uwkDK.default)({
        isInitialMount: isInitialMountRef.current,
        previousResultCount: previousResultCountRef.current,
        items: items,
        environment: environment,
        itemToString: itemToString
    }, state));
    // Scroll on highlighted item if change comes from keyboard.
    var shouldScrollRef = $d0d825e43d8ba478$var$useScrollIntoView({
        menuElement: menuRef.current,
        highlightedIndex: highlightedIndex,
        isOpen: isOpen,
        itemRefs: itemRefs,
        scrollIntoView: scrollIntoView,
        getItemNodeFromIndex: getItemNodeFromIndex
    });
    // Sets cleanup for the keysSoFar callback, debounded after 500ms.
    (0, $63SH6.useEffect)(function() {
        // init the clean function here as we need access to dispatch.
        clearTimeoutRef.current = $d0d825e43d8ba478$var$debounce(function(outerDispatch) {
            outerDispatch({
                type: $d0d825e43d8ba478$var$FunctionSetInputValue$1,
                inputValue: ""
            });
        }, 500);
        // Cancel any pending debounced calls on mount
        return function() {
            clearTimeoutRef.current.cancel();
        };
    }, []);
    // Invokes the keysSoFar callback set up above.
    (0, $63SH6.useEffect)(function() {
        if (!inputValue) return;
        clearTimeoutRef.current(dispatch);
    }, [
        dispatch,
        inputValue
    ]);
    $d0d825e43d8ba478$var$useControlPropsValidator({
        isInitialMount: isInitialMountRef.current,
        props: props,
        state: state
    });
    (0, $63SH6.useEffect)(function() {
        if (isInitialMountRef.current) return;
        previousResultCountRef.current = items.length;
    });
    // Focus the toggle button on first render if required.
    (0, $63SH6.useEffect)(function() {
        var focusOnOpen = $d0d825e43d8ba478$var$getInitialValue$1(props, "isOpen");
        if (focusOnOpen && toggleButtonRef.current) toggleButtonRef.current.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // Add mouse/touch events to document.
    var mouseAndTouchTrackersRef = $d0d825e43d8ba478$var$useMouseAndTouchTracker(isOpen, [
        menuRef,
        toggleButtonRef
    ], environment, function() {
        dispatch({
            type: $d0d825e43d8ba478$var$ToggleButtonBlur
        });
    });
    var setGetterPropCallInfo = $d0d825e43d8ba478$var$useGetterPropsCalledChecker("getMenuProps", "getToggleButtonProps");
    // Make initial ref false.
    (0, $63SH6.useEffect)(function() {
        isInitialMountRef.current = false;
        return function() {
            isInitialMountRef.current = true;
        };
    }, []);
    // Reset itemRefs on close.
    (0, $63SH6.useEffect)(function() {
        if (!isOpen) itemRefs.current = {};
    }, [
        isOpen
    ]);
    // Event handler functions.
    var toggleButtonKeyDownHandlers = (0, $63SH6.useMemo)(function() {
        return {
            ArrowDown: function ArrowDown(event) {
                event.preventDefault();
                dispatch({
                    type: $d0d825e43d8ba478$var$ToggleButtonKeyDownArrowDown,
                    altKey: event.altKey
                });
            },
            ArrowUp: function ArrowUp(event) {
                event.preventDefault();
                dispatch({
                    type: $d0d825e43d8ba478$var$ToggleButtonKeyDownArrowUp,
                    altKey: event.altKey
                });
            },
            Home: function Home(event) {
                event.preventDefault();
                dispatch({
                    type: $d0d825e43d8ba478$var$ToggleButtonKeyDownHome
                });
            },
            End: function End(event) {
                event.preventDefault();
                dispatch({
                    type: $d0d825e43d8ba478$var$ToggleButtonKeyDownEnd
                });
            },
            Escape: function Escape() {
                if (latest.current.state.isOpen) dispatch({
                    type: $d0d825e43d8ba478$var$ToggleButtonKeyDownEscape
                });
            },
            Enter: function Enter(event) {
                event.preventDefault();
                dispatch({
                    type: latest.current.state.isOpen ? $d0d825e43d8ba478$var$ToggleButtonKeyDownEnter : $d0d825e43d8ba478$var$ToggleButtonClick$1
                });
            },
            PageUp: function PageUp(event) {
                if (latest.current.state.isOpen) {
                    event.preventDefault();
                    dispatch({
                        type: $d0d825e43d8ba478$var$ToggleButtonKeyDownPageUp
                    });
                }
            },
            PageDown: function PageDown(event) {
                if (latest.current.state.isOpen) {
                    event.preventDefault();
                    dispatch({
                        type: $d0d825e43d8ba478$var$ToggleButtonKeyDownPageDown
                    });
                }
            },
            " ": function _(event) {
                event.preventDefault();
                var currentState = latest.current.state;
                if (!currentState.isOpen) {
                    dispatch({
                        type: $d0d825e43d8ba478$var$ToggleButtonClick$1
                    });
                    return;
                }
                if (currentState.inputValue) dispatch({
                    type: $d0d825e43d8ba478$var$ToggleButtonKeyDownCharacter,
                    key: " "
                });
                else dispatch({
                    type: $d0d825e43d8ba478$var$ToggleButtonKeyDownSpaceButton
                });
            }
        };
    }, [
        dispatch,
        latest
    ]);
    // Action functions.
    var toggleMenu = (0, $63SH6.useCallback)(function() {
        dispatch({
            type: $d0d825e43d8ba478$var$FunctionToggleMenu$1
        });
    }, [
        dispatch
    ]);
    var closeMenu = (0, $63SH6.useCallback)(function() {
        dispatch({
            type: $d0d825e43d8ba478$var$FunctionCloseMenu$1
        });
    }, [
        dispatch
    ]);
    var openMenu = (0, $63SH6.useCallback)(function() {
        dispatch({
            type: $d0d825e43d8ba478$var$FunctionOpenMenu$1
        });
    }, [
        dispatch
    ]);
    var setHighlightedIndex = (0, $63SH6.useCallback)(function(newHighlightedIndex) {
        dispatch({
            type: $d0d825e43d8ba478$var$FunctionSetHighlightedIndex$1,
            highlightedIndex: newHighlightedIndex
        });
    }, [
        dispatch
    ]);
    var selectItem = (0, $63SH6.useCallback)(function(newSelectedItem) {
        dispatch({
            type: $d0d825e43d8ba478$var$FunctionSelectItem$1,
            selectedItem: newSelectedItem
        });
    }, [
        dispatch
    ]);
    var reset = (0, $63SH6.useCallback)(function() {
        dispatch({
            type: $d0d825e43d8ba478$var$FunctionReset$2
        });
    }, [
        dispatch
    ]);
    var setInputValue = (0, $63SH6.useCallback)(function(newInputValue) {
        dispatch({
            type: $d0d825e43d8ba478$var$FunctionSetInputValue$1,
            inputValue: newInputValue
        });
    }, [
        dispatch
    ]);
    // Getter functions.
    var getLabelProps = (0, $63SH6.useCallback)(function(labelProps) {
        return (0, $uwkDK.default)({
            id: elementIds.labelId,
            htmlFor: elementIds.toggleButtonId
        }, labelProps);
    }, [
        elementIds
    ]);
    var getMenuProps = (0, $63SH6.useCallback)(function(_temp, _temp2) {
        var _extends2;
        var _ref = _temp === void 0 ? {} : _temp, onMouseLeave = _ref.onMouseLeave, _ref$refKey = _ref.refKey, refKey = _ref$refKey === void 0 ? "ref" : _ref$refKey, ref = _ref.ref, rest = (0, $8WqTz.default)(_ref, $d0d825e43d8ba478$var$_excluded$2);
        var _ref2 = _temp2 === void 0 ? {} : _temp2, _ref2$suppressRefErro = _ref2.suppressRefError, suppressRefError = _ref2$suppressRefErro === void 0 ? false : _ref2$suppressRefErro;
        var menuHandleMouseLeave = function menuHandleMouseLeave() {
            dispatch({
                type: $d0d825e43d8ba478$var$MenuMouseLeave$1
            });
        };
        setGetterPropCallInfo("getMenuProps", suppressRefError, refKey, menuRef);
        return (0, $uwkDK.default)((_extends2 = {}, _extends2[refKey] = $d0d825e43d8ba478$var$handleRefs(ref, function(menuNode) {
            menuRef.current = menuNode;
        }), _extends2.id = elementIds.menuId, _extends2.role = "listbox", _extends2["aria-labelledby"] = rest && rest["aria-label"] ? undefined : "" + elementIds.labelId, _extends2.onMouseLeave = $d0d825e43d8ba478$var$callAllEventHandlers(onMouseLeave, menuHandleMouseLeave), _extends2), rest);
    }, [
        dispatch,
        setGetterPropCallInfo,
        elementIds
    ]);
    var getToggleButtonProps = (0, $63SH6.useCallback)(function(_temp3, _temp4) {
        var _extends3;
        var _ref3 = _temp3 === void 0 ? {} : _temp3, onBlur = _ref3.onBlur, onClick = _ref3.onClick;
        _ref3.onPress;
        var onKeyDown = _ref3.onKeyDown, _ref3$refKey = _ref3.refKey, refKey = _ref3$refKey === void 0 ? "ref" : _ref3$refKey, ref = _ref3.ref, rest = (0, $8WqTz.default)(_ref3, $d0d825e43d8ba478$var$_excluded2$2);
        var _ref4 = _temp4 === void 0 ? {} : _temp4, _ref4$suppressRefErro = _ref4.suppressRefError, suppressRefError = _ref4$suppressRefErro === void 0 ? false : _ref4$suppressRefErro;
        var latestState = latest.current.state;
        var toggleButtonHandleClick = function toggleButtonHandleClick() {
            dispatch({
                type: $d0d825e43d8ba478$var$ToggleButtonClick$1
            });
        };
        var toggleButtonHandleBlur = function toggleButtonHandleBlur() {
            if (latestState.isOpen && !mouseAndTouchTrackersRef.current.isMouseDown) dispatch({
                type: $d0d825e43d8ba478$var$ToggleButtonBlur
            });
        };
        var toggleButtonHandleKeyDown = function toggleButtonHandleKeyDown(event) {
            var key = $d0d825e43d8ba478$var$normalizeArrowKey(event);
            if (key && toggleButtonKeyDownHandlers[key]) toggleButtonKeyDownHandlers[key](event);
            else if ($d0d825e43d8ba478$var$isAcceptedCharacterKey(key)) dispatch({
                type: $d0d825e43d8ba478$var$ToggleButtonKeyDownCharacter,
                key: key
            });
        };
        var toggleProps = (0, $uwkDK.default)((_extends3 = {}, _extends3[refKey] = $d0d825e43d8ba478$var$handleRefs(ref, function(toggleButtonNode) {
            toggleButtonRef.current = toggleButtonNode;
        }), _extends3["aria-activedescendant"] = latestState.isOpen && latestState.highlightedIndex > -1 ? elementIds.getItemId(latestState.highlightedIndex) : "", _extends3["aria-controls"] = elementIds.menuId, _extends3["aria-expanded"] = latest.current.state.isOpen, _extends3["aria-haspopup"] = "listbox", _extends3["aria-labelledby"] = rest && rest["aria-label"] ? undefined : "" + elementIds.labelId, _extends3.id = elementIds.toggleButtonId, _extends3.role = "combobox", _extends3.tabIndex = 0, _extends3.onBlur = $d0d825e43d8ba478$var$callAllEventHandlers(onBlur, toggleButtonHandleBlur), _extends3), rest);
        if (!rest.disabled) {
            toggleProps.onClick = $d0d825e43d8ba478$var$callAllEventHandlers(onClick, toggleButtonHandleClick);
            toggleProps.onKeyDown = $d0d825e43d8ba478$var$callAllEventHandlers(onKeyDown, toggleButtonHandleKeyDown);
        }
        setGetterPropCallInfo("getToggleButtonProps", suppressRefError, refKey, toggleButtonRef);
        return toggleProps;
    }, [
        latest,
        elementIds,
        setGetterPropCallInfo,
        dispatch,
        mouseAndTouchTrackersRef,
        toggleButtonKeyDownHandlers
    ]);
    var getItemProps = (0, $63SH6.useCallback)(function(_temp5) {
        var _extends4;
        var _ref5 = _temp5 === void 0 ? {} : _temp5, itemProp = _ref5.item, indexProp = _ref5.index, onMouseMove = _ref5.onMouseMove, onClick = _ref5.onClick, onMouseDown = _ref5.onMouseDown;
        _ref5.onPress;
        var _ref5$refKey = _ref5.refKey, refKey = _ref5$refKey === void 0 ? "ref" : _ref5$refKey, disabledProp = _ref5.disabled, ref = _ref5.ref, rest = (0, $8WqTz.default)(_ref5, $d0d825e43d8ba478$var$_excluded3$1);
        if (disabledProp !== undefined) console.warn('Passing "disabled" as an argument to getItemProps is not supported anymore. Please use the isItemDisabled prop from useSelect.');
        var _latest$current = latest.current, latestState = _latest$current.state, latestProps = _latest$current.props;
        var _getItemAndIndex = $d0d825e43d8ba478$var$getItemAndIndex(itemProp, indexProp, latestProps.items, "Pass either item or index to getItemProps!"), item = _getItemAndIndex[0], index = _getItemAndIndex[1];
        var disabled = latestProps.isItemDisabled(item, index);
        var itemHandleMouseMove = function itemHandleMouseMove() {
            if (index === latestState.highlightedIndex) return;
            shouldScrollRef.current = false;
            dispatch({
                type: $d0d825e43d8ba478$var$ItemMouseMove$1,
                index: index,
                disabled: disabled
            });
        };
        var itemHandleClick = function itemHandleClick() {
            dispatch({
                type: $d0d825e43d8ba478$var$ItemClick$1,
                index: index
            });
        };
        var itemHandleMouseDown = function itemHandleMouseDown(e) {
            return e.preventDefault();
        }; // keep focus on the toggle after item click select.
        var itemProps = (0, $uwkDK.default)((_extends4 = {}, _extends4[refKey] = $d0d825e43d8ba478$var$handleRefs(ref, function(itemNode) {
            if (itemNode) itemRefs.current[elementIds.getItemId(index)] = itemNode;
        }), _extends4["aria-disabled"] = disabled, _extends4["aria-selected"] = "" + (item === latestState.selectedItem), _extends4.id = elementIds.getItemId(index), _extends4.role = "option", _extends4), rest);
        if (!disabled) itemProps.onClick = $d0d825e43d8ba478$var$callAllEventHandlers(onClick, itemHandleClick);
        itemProps.onMouseMove = $d0d825e43d8ba478$var$callAllEventHandlers(onMouseMove, itemHandleMouseMove);
        itemProps.onMouseDown = $d0d825e43d8ba478$var$callAllEventHandlers(onMouseDown, itemHandleMouseDown);
        return itemProps;
    }, [
        latest,
        elementIds,
        shouldScrollRef,
        dispatch
    ]);
    return {
        // prop getters.
        getToggleButtonProps: getToggleButtonProps,
        getLabelProps: getLabelProps,
        getMenuProps: getMenuProps,
        getItemProps: getItemProps,
        // actions.
        toggleMenu: toggleMenu,
        openMenu: openMenu,
        closeMenu: closeMenu,
        setHighlightedIndex: setHighlightedIndex,
        selectItem: selectItem,
        reset: reset,
        setInputValue: setInputValue,
        // state.
        highlightedIndex: highlightedIndex,
        isOpen: isOpen,
        selectedItem: selectedItem,
        inputValue: inputValue
    };
}
var $d0d825e43d8ba478$var$InputKeyDownArrowDown = 0;
var $d0d825e43d8ba478$var$InputKeyDownArrowUp = 1;
var $d0d825e43d8ba478$var$InputKeyDownEscape = 2;
var $d0d825e43d8ba478$var$InputKeyDownHome = 3;
var $d0d825e43d8ba478$var$InputKeyDownEnd = 4;
var $d0d825e43d8ba478$var$InputKeyDownPageUp = 5;
var $d0d825e43d8ba478$var$InputKeyDownPageDown = 6;
var $d0d825e43d8ba478$var$InputKeyDownEnter = 7;
var $d0d825e43d8ba478$var$InputChange = 8;
var $d0d825e43d8ba478$var$InputBlur = 9;
var $d0d825e43d8ba478$var$InputClick = 10;
var $d0d825e43d8ba478$var$MenuMouseLeave = 11;
var $d0d825e43d8ba478$var$ItemMouseMove = 12;
var $d0d825e43d8ba478$var$ItemClick = 13;
var $d0d825e43d8ba478$var$ToggleButtonClick = 14;
var $d0d825e43d8ba478$var$FunctionToggleMenu = 15;
var $d0d825e43d8ba478$var$FunctionOpenMenu = 16;
var $d0d825e43d8ba478$var$FunctionCloseMenu = 17;
var $d0d825e43d8ba478$var$FunctionSetHighlightedIndex = 18;
var $d0d825e43d8ba478$var$FunctionSelectItem = 19;
var $d0d825e43d8ba478$var$FunctionSetInputValue = 20;
var $d0d825e43d8ba478$var$FunctionReset$1 = 21;
var $d0d825e43d8ba478$var$ControlledPropUpdatedSelectedItem = 22;
var $d0d825e43d8ba478$var$stateChangeTypes$1 = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    InputKeyDownArrowDown: $d0d825e43d8ba478$var$InputKeyDownArrowDown,
    InputKeyDownArrowUp: $d0d825e43d8ba478$var$InputKeyDownArrowUp,
    InputKeyDownEscape: $d0d825e43d8ba478$var$InputKeyDownEscape,
    InputKeyDownHome: $d0d825e43d8ba478$var$InputKeyDownHome,
    InputKeyDownEnd: $d0d825e43d8ba478$var$InputKeyDownEnd,
    InputKeyDownPageUp: $d0d825e43d8ba478$var$InputKeyDownPageUp,
    InputKeyDownPageDown: $d0d825e43d8ba478$var$InputKeyDownPageDown,
    InputKeyDownEnter: $d0d825e43d8ba478$var$InputKeyDownEnter,
    InputChange: $d0d825e43d8ba478$var$InputChange,
    InputBlur: $d0d825e43d8ba478$var$InputBlur,
    InputClick: $d0d825e43d8ba478$var$InputClick,
    MenuMouseLeave: $d0d825e43d8ba478$var$MenuMouseLeave,
    ItemMouseMove: $d0d825e43d8ba478$var$ItemMouseMove,
    ItemClick: $d0d825e43d8ba478$var$ItemClick,
    ToggleButtonClick: $d0d825e43d8ba478$var$ToggleButtonClick,
    FunctionToggleMenu: $d0d825e43d8ba478$var$FunctionToggleMenu,
    FunctionOpenMenu: $d0d825e43d8ba478$var$FunctionOpenMenu,
    FunctionCloseMenu: $d0d825e43d8ba478$var$FunctionCloseMenu,
    FunctionSetHighlightedIndex: $d0d825e43d8ba478$var$FunctionSetHighlightedIndex,
    FunctionSelectItem: $d0d825e43d8ba478$var$FunctionSelectItem,
    FunctionSetInputValue: $d0d825e43d8ba478$var$FunctionSetInputValue,
    FunctionReset: $d0d825e43d8ba478$var$FunctionReset$1,
    ControlledPropUpdatedSelectedItem: $d0d825e43d8ba478$var$ControlledPropUpdatedSelectedItem
});
function $d0d825e43d8ba478$var$getInitialState$1(props) {
    var initialState = $d0d825e43d8ba478$var$getInitialState$2(props);
    var selectedItem = initialState.selectedItem;
    var inputValue = initialState.inputValue;
    if (inputValue === "" && selectedItem && props.defaultInputValue === undefined && props.initialInputValue === undefined && props.inputValue === undefined) inputValue = props.itemToString(selectedItem);
    return (0, $uwkDK.default)({}, initialState, {
        inputValue: inputValue
    });
}
var $d0d825e43d8ba478$var$propTypes$1 = (0, $uwkDK.default)({}, $d0d825e43d8ba478$var$commonDropdownPropTypes, {
    items: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).array.isRequired,
    isItemDisabled: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).func,
    selectedItemChanged: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).func,
    getA11ySelectionMessage: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).func,
    inputValue: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).string,
    defaultInputValue: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).string,
    initialInputValue: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).string,
    inputId: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).string,
    onInputValueChange: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).func
});
/**
 * The useCombobox version of useControlledReducer, which also
 * checks if the controlled prop selectedItem changed between
 * renders. If so, it will also update inputValue with its
 * string equivalent. It uses the common useEnhancedReducer to
 * compute the rest of the state.
 *
 * @param {Function} reducer Reducer function from downshift.
 * @param {Object} initialState Initial state of the hook.
 * @param {Object} props The hook props.
 * @returns {Array} An array with the state and an action dispatcher.
 */ function $d0d825e43d8ba478$var$useControlledReducer(reducer, initialState, props) {
    var previousSelectedItemRef = (0, $63SH6.useRef)();
    var _useEnhancedReducer = $d0d825e43d8ba478$var$useEnhancedReducer(reducer, initialState, props), state = _useEnhancedReducer[0], dispatch = _useEnhancedReducer[1];
    // ToDo: if needed, make same approach as selectedItemChanged from Downshift.
    (0, $63SH6.useEffect)(function() {
        if (!$d0d825e43d8ba478$var$isControlledProp(props, "selectedItem")) return;
        if (props.selectedItemChanged(previousSelectedItemRef.current, props.selectedItem)) dispatch({
            type: $d0d825e43d8ba478$var$ControlledPropUpdatedSelectedItem,
            inputValue: props.itemToString(props.selectedItem)
        });
        previousSelectedItemRef.current = state.selectedItem === previousSelectedItemRef.current ? props.selectedItem : state.selectedItem;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        state.selectedItem,
        props.selectedItem
    ]);
    return [
        $d0d825e43d8ba478$var$getState(state, props),
        dispatch
    ];
}
// eslint-disable-next-line import/no-mutable-exports
var $d0d825e43d8ba478$var$validatePropTypes$1 = $d0d825e43d8ba478$var$noop;
var $d0d825e43d8ba478$var$defaultProps$1 = (0, $uwkDK.default)({}, $d0d825e43d8ba478$var$defaultProps$3, {
    selectedItemChanged: function selectedItemChanged(prevItem, item) {
        return prevItem !== item;
    },
    getA11yStatusMessage: $d0d825e43d8ba478$var$getA11yStatusMessage$1,
    isItemDisabled: function isItemDisabled() {
        return false;
    }
});
/* eslint-disable complexity */ function $d0d825e43d8ba478$var$downshiftUseComboboxReducer(state, action) {
    var _props$items;
    var type = action.type, props = action.props, altKey = action.altKey;
    var changes;
    switch(type){
        case $d0d825e43d8ba478$var$ItemClick:
            changes = {
                isOpen: $d0d825e43d8ba478$var$getDefaultValue$1(props, "isOpen"),
                highlightedIndex: $d0d825e43d8ba478$var$getDefaultValue$1(props, "highlightedIndex"),
                selectedItem: props.items[action.index],
                inputValue: props.itemToString(props.items[action.index])
            };
            break;
        case $d0d825e43d8ba478$var$InputKeyDownArrowDown:
            if (state.isOpen) changes = {
                highlightedIndex: $d0d825e43d8ba478$var$getHighlightedIndex(state.highlightedIndex, 1, props.items, props.isItemDisabled, true)
            };
            else changes = {
                highlightedIndex: altKey && state.selectedItem == null ? -1 : $d0d825e43d8ba478$var$getHighlightedIndexOnOpen(props, state, 1),
                isOpen: props.items.length >= 0
            };
            break;
        case $d0d825e43d8ba478$var$InputKeyDownArrowUp:
            if (state.isOpen) {
                if (altKey) changes = $d0d825e43d8ba478$var$getChangesOnSelection(props, state.highlightedIndex);
                else changes = {
                    highlightedIndex: $d0d825e43d8ba478$var$getHighlightedIndex(state.highlightedIndex, -1, props.items, props.isItemDisabled, true)
                };
            } else changes = {
                highlightedIndex: $d0d825e43d8ba478$var$getHighlightedIndexOnOpen(props, state, -1),
                isOpen: props.items.length >= 0
            };
            break;
        case $d0d825e43d8ba478$var$InputKeyDownEnter:
            changes = $d0d825e43d8ba478$var$getChangesOnSelection(props, state.highlightedIndex);
            break;
        case $d0d825e43d8ba478$var$InputKeyDownEscape:
            changes = (0, $uwkDK.default)({
                isOpen: false,
                highlightedIndex: -1
            }, !state.isOpen && {
                selectedItem: null,
                inputValue: ""
            });
            break;
        case $d0d825e43d8ba478$var$InputKeyDownPageUp:
            changes = {
                highlightedIndex: $d0d825e43d8ba478$var$getHighlightedIndex(state.highlightedIndex, -10, props.items, props.isItemDisabled, true)
            };
            break;
        case $d0d825e43d8ba478$var$InputKeyDownPageDown:
            changes = {
                highlightedIndex: $d0d825e43d8ba478$var$getHighlightedIndex(state.highlightedIndex, 10, props.items, props.isItemDisabled, true)
            };
            break;
        case $d0d825e43d8ba478$var$InputKeyDownHome:
            changes = {
                highlightedIndex: $d0d825e43d8ba478$var$getNonDisabledIndex(0, false, props.items, props.isItemDisabled)
            };
            break;
        case $d0d825e43d8ba478$var$InputKeyDownEnd:
            changes = {
                highlightedIndex: $d0d825e43d8ba478$var$getNonDisabledIndex(props.items.length - 1, true, props.items, props.isItemDisabled)
            };
            break;
        case $d0d825e43d8ba478$var$InputBlur:
            changes = (0, $uwkDK.default)({
                isOpen: false,
                highlightedIndex: -1
            }, state.highlightedIndex >= 0 && ((_props$items = props.items) == null ? void 0 : _props$items.length) && action.selectItem && {
                selectedItem: props.items[state.highlightedIndex],
                inputValue: props.itemToString(props.items[state.highlightedIndex])
            });
            break;
        case $d0d825e43d8ba478$var$InputChange:
            changes = {
                isOpen: true,
                highlightedIndex: $d0d825e43d8ba478$var$getDefaultValue$1(props, "highlightedIndex"),
                inputValue: action.inputValue
            };
            break;
        case $d0d825e43d8ba478$var$InputClick:
            changes = {
                isOpen: !state.isOpen,
                highlightedIndex: state.isOpen ? -1 : $d0d825e43d8ba478$var$getHighlightedIndexOnOpen(props, state, 0)
            };
            break;
        case $d0d825e43d8ba478$var$FunctionSelectItem:
            changes = {
                selectedItem: action.selectedItem,
                inputValue: props.itemToString(action.selectedItem)
            };
            break;
        case $d0d825e43d8ba478$var$ControlledPropUpdatedSelectedItem:
            changes = {
                inputValue: action.inputValue
            };
            break;
        default:
            return $d0d825e43d8ba478$var$downshiftCommonReducer(state, action, $d0d825e43d8ba478$var$stateChangeTypes$1);
    }
    return (0, $uwkDK.default)({}, state, changes);
}
/* eslint-enable complexity */ var $d0d825e43d8ba478$var$_excluded$1 = [
    "onMouseLeave",
    "refKey",
    "ref"
], $d0d825e43d8ba478$var$_excluded2$1 = [
    "item",
    "index",
    "refKey",
    "ref",
    "onMouseMove",
    "onMouseDown",
    "onClick",
    "onPress",
    "disabled"
], $d0d825e43d8ba478$var$_excluded3 = [
    "onClick",
    "onPress",
    "refKey",
    "ref"
], $d0d825e43d8ba478$var$_excluded4 = [
    "onKeyDown",
    "onChange",
    "onInput",
    "onBlur",
    "onChangeText",
    "onClick",
    "refKey",
    "ref"
];
$d0d825e43d8ba478$export$7a023a466c03eb3d.stateChangeTypes = $d0d825e43d8ba478$var$stateChangeTypes$1;
function $d0d825e43d8ba478$export$7a023a466c03eb3d(userProps) {
    if (userProps === void 0) userProps = {};
    $d0d825e43d8ba478$var$validatePropTypes$1(userProps, $d0d825e43d8ba478$export$7a023a466c03eb3d);
    // Props defaults and destructuring.
    var props = (0, $uwkDK.default)({}, $d0d825e43d8ba478$var$defaultProps$1, userProps);
    var items = props.items, scrollIntoView = props.scrollIntoView, environment = props.environment, getA11yStatusMessage = props.getA11yStatusMessage, getA11ySelectionMessage = props.getA11ySelectionMessage, itemToString = props.itemToString;
    // Initial state depending on controlled props.
    var initialState = $d0d825e43d8ba478$var$getInitialState$1(props);
    var _useControlledReducer = $d0d825e43d8ba478$var$useControlledReducer($d0d825e43d8ba478$var$downshiftUseComboboxReducer, initialState, props), state = _useControlledReducer[0], dispatch = _useControlledReducer[1];
    var isOpen = state.isOpen, highlightedIndex = state.highlightedIndex, selectedItem = state.selectedItem, inputValue = state.inputValue;
    // Element refs.
    var menuRef = (0, $63SH6.useRef)(null);
    var itemRefs = (0, $63SH6.useRef)({});
    var inputRef = (0, $63SH6.useRef)(null);
    var toggleButtonRef = (0, $63SH6.useRef)(null);
    var isInitialMountRef = (0, $63SH6.useRef)(true);
    // prevent id re-generation between renders.
    var elementIds = $d0d825e43d8ba478$var$useElementIds(props);
    // used to keep track of how many items we had on previous cycle.
    var previousResultCountRef = (0, $63SH6.useRef)();
    // utility callback to get item element.
    var latest = $d0d825e43d8ba478$var$useLatestRef({
        state: state,
        props: props
    });
    var getItemNodeFromIndex = (0, $63SH6.useCallback)(function(index) {
        return itemRefs.current[elementIds.getItemId(index)];
    }, [
        elementIds
    ]);
    // Effects.
    // Sets a11y status message on changes in state.
    $d0d825e43d8ba478$var$useA11yMessageSetter(getA11yStatusMessage, [
        isOpen,
        highlightedIndex,
        inputValue,
        items
    ], (0, $uwkDK.default)({
        isInitialMount: isInitialMountRef.current,
        previousResultCount: previousResultCountRef.current,
        items: items,
        environment: environment,
        itemToString: itemToString
    }, state));
    // Sets a11y status message on changes in selectedItem.
    $d0d825e43d8ba478$var$useA11yMessageSetter(getA11ySelectionMessage, [
        selectedItem
    ], (0, $uwkDK.default)({
        isInitialMount: isInitialMountRef.current,
        previousResultCount: previousResultCountRef.current,
        items: items,
        environment: environment,
        itemToString: itemToString
    }, state));
    // Scroll on highlighted item if change comes from keyboard.
    var shouldScrollRef = $d0d825e43d8ba478$var$useScrollIntoView({
        menuElement: menuRef.current,
        highlightedIndex: highlightedIndex,
        isOpen: isOpen,
        itemRefs: itemRefs,
        scrollIntoView: scrollIntoView,
        getItemNodeFromIndex: getItemNodeFromIndex
    });
    $d0d825e43d8ba478$var$useControlPropsValidator({
        isInitialMount: isInitialMountRef.current,
        props: props,
        state: state
    });
    // Focus the input on first render if required.
    (0, $63SH6.useEffect)(function() {
        var focusOnOpen = $d0d825e43d8ba478$var$getInitialValue$1(props, "isOpen");
        if (focusOnOpen && inputRef.current) inputRef.current.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    (0, $63SH6.useEffect)(function() {
        if (isInitialMountRef.current) return;
        previousResultCountRef.current = items.length;
    });
    // Add mouse/touch events to document.
    var mouseAndTouchTrackersRef = $d0d825e43d8ba478$var$useMouseAndTouchTracker(isOpen, [
        inputRef,
        menuRef,
        toggleButtonRef
    ], environment, function() {
        dispatch({
            type: $d0d825e43d8ba478$var$InputBlur,
            selectItem: false
        });
    });
    var setGetterPropCallInfo = $d0d825e43d8ba478$var$useGetterPropsCalledChecker("getInputProps", "getMenuProps");
    // Make initial ref false.
    (0, $63SH6.useEffect)(function() {
        isInitialMountRef.current = false;
        return function() {
            isInitialMountRef.current = true;
        };
    }, []);
    // Reset itemRefs on close.
    (0, $63SH6.useEffect)(function() {
        if (!isOpen) itemRefs.current = {};
    }, [
        isOpen
    ]);
    // Reset itemRefs on close.
    (0, $63SH6.useEffect)(function() {
        var _inputRef$current;
        if (!isOpen || !(environment != null && environment.document) || !(inputRef != null && (_inputRef$current = inputRef.current) != null && _inputRef$current.focus)) return;
        if (environment.document.activeElement !== inputRef.current) inputRef.current.focus();
    }, [
        isOpen,
        environment
    ]);
    /* Event handler functions */ var inputKeyDownHandlers = (0, $63SH6.useMemo)(function() {
        return {
            ArrowDown: function ArrowDown(event) {
                event.preventDefault();
                dispatch({
                    type: $d0d825e43d8ba478$var$InputKeyDownArrowDown,
                    altKey: event.altKey
                });
            },
            ArrowUp: function ArrowUp(event) {
                event.preventDefault();
                dispatch({
                    type: $d0d825e43d8ba478$var$InputKeyDownArrowUp,
                    altKey: event.altKey
                });
            },
            Home: function Home(event) {
                if (!latest.current.state.isOpen) return;
                event.preventDefault();
                dispatch({
                    type: $d0d825e43d8ba478$var$InputKeyDownHome
                });
            },
            End: function End(event) {
                if (!latest.current.state.isOpen) return;
                event.preventDefault();
                dispatch({
                    type: $d0d825e43d8ba478$var$InputKeyDownEnd
                });
            },
            Escape: function Escape(event) {
                var latestState = latest.current.state;
                if (latestState.isOpen || latestState.inputValue || latestState.selectedItem || latestState.highlightedIndex > -1) {
                    event.preventDefault();
                    dispatch({
                        type: $d0d825e43d8ba478$var$InputKeyDownEscape
                    });
                }
            },
            Enter: function Enter(event) {
                var latestState = latest.current.state;
                // if closed or no highlighted index, do nothing.
                if (!latestState.isOpen || event.which === 229 // if IME composing, wait for next Enter keydown event.
                ) return;
                event.preventDefault();
                dispatch({
                    type: $d0d825e43d8ba478$var$InputKeyDownEnter
                });
            },
            PageUp: function PageUp(event) {
                if (latest.current.state.isOpen) {
                    event.preventDefault();
                    dispatch({
                        type: $d0d825e43d8ba478$var$InputKeyDownPageUp
                    });
                }
            },
            PageDown: function PageDown(event) {
                if (latest.current.state.isOpen) {
                    event.preventDefault();
                    dispatch({
                        type: $d0d825e43d8ba478$var$InputKeyDownPageDown
                    });
                }
            }
        };
    }, [
        dispatch,
        latest
    ]);
    // Getter props.
    var getLabelProps = (0, $63SH6.useCallback)(function(labelProps) {
        return (0, $uwkDK.default)({
            id: elementIds.labelId,
            htmlFor: elementIds.inputId
        }, labelProps);
    }, [
        elementIds
    ]);
    var getMenuProps = (0, $63SH6.useCallback)(function(_temp, _temp2) {
        var _extends2;
        var _ref = _temp === void 0 ? {} : _temp, onMouseLeave = _ref.onMouseLeave, _ref$refKey = _ref.refKey, refKey = _ref$refKey === void 0 ? "ref" : _ref$refKey, ref = _ref.ref, rest = (0, $8WqTz.default)(_ref, $d0d825e43d8ba478$var$_excluded$1);
        var _ref2 = _temp2 === void 0 ? {} : _temp2, _ref2$suppressRefErro = _ref2.suppressRefError, suppressRefError = _ref2$suppressRefErro === void 0 ? false : _ref2$suppressRefErro;
        setGetterPropCallInfo("getMenuProps", suppressRefError, refKey, menuRef);
        return (0, $uwkDK.default)((_extends2 = {}, _extends2[refKey] = $d0d825e43d8ba478$var$handleRefs(ref, function(menuNode) {
            menuRef.current = menuNode;
        }), _extends2.id = elementIds.menuId, _extends2.role = "listbox", _extends2["aria-labelledby"] = rest && rest["aria-label"] ? undefined : "" + elementIds.labelId, _extends2.onMouseLeave = $d0d825e43d8ba478$var$callAllEventHandlers(onMouseLeave, function() {
            dispatch({
                type: $d0d825e43d8ba478$var$MenuMouseLeave
            });
        }), _extends2), rest);
    }, [
        dispatch,
        setGetterPropCallInfo,
        elementIds
    ]);
    var getItemProps = (0, $63SH6.useCallback)(function(_temp3) {
        var _extends3, _ref4;
        var _ref3 = _temp3 === void 0 ? {} : _temp3, itemProp = _ref3.item, indexProp = _ref3.index, _ref3$refKey = _ref3.refKey, refKey = _ref3$refKey === void 0 ? "ref" : _ref3$refKey, ref = _ref3.ref, onMouseMove = _ref3.onMouseMove, onMouseDown = _ref3.onMouseDown, onClick = _ref3.onClick;
        _ref3.onPress;
        var disabledProp = _ref3.disabled, rest = (0, $8WqTz.default)(_ref3, $d0d825e43d8ba478$var$_excluded2$1);
        if (disabledProp !== undefined) console.warn('Passing "disabled" as an argument to getItemProps is not supported anymore. Please use the isItemDisabled prop from useCombobox.');
        var _latest$current = latest.current, latestProps = _latest$current.props, latestState = _latest$current.state;
        var _getItemAndIndex = $d0d825e43d8ba478$var$getItemAndIndex(itemProp, indexProp, latestProps.items, "Pass either item or index to getItemProps!"), item = _getItemAndIndex[0], index = _getItemAndIndex[1];
        var disabled = latestProps.isItemDisabled(item, index);
        var onSelectKey = "onClick";
        var customClickHandler = onClick;
        var itemHandleMouseMove = function itemHandleMouseMove() {
            if (index === latestState.highlightedIndex) return;
            shouldScrollRef.current = false;
            dispatch({
                type: $d0d825e43d8ba478$var$ItemMouseMove,
                index: index,
                disabled: disabled
            });
        };
        var itemHandleClick = function itemHandleClick() {
            dispatch({
                type: $d0d825e43d8ba478$var$ItemClick,
                index: index
            });
        };
        var itemHandleMouseDown = function itemHandleMouseDown(e) {
            return e.preventDefault();
        }; // keep focus on the input after item click select.
        return (0, $uwkDK.default)((_extends3 = {}, _extends3[refKey] = $d0d825e43d8ba478$var$handleRefs(ref, function(itemNode) {
            if (itemNode) itemRefs.current[elementIds.getItemId(index)] = itemNode;
        }), _extends3["aria-disabled"] = disabled, _extends3["aria-selected"] = "" + (index === latestState.highlightedIndex), _extends3.id = elementIds.getItemId(index), _extends3.role = "option", _extends3), !disabled && (_ref4 = {}, _ref4[onSelectKey] = $d0d825e43d8ba478$var$callAllEventHandlers(customClickHandler, itemHandleClick), _ref4), {
            onMouseMove: $d0d825e43d8ba478$var$callAllEventHandlers(onMouseMove, itemHandleMouseMove),
            onMouseDown: $d0d825e43d8ba478$var$callAllEventHandlers(onMouseDown, itemHandleMouseDown)
        }, rest);
    }, [
        dispatch,
        latest,
        shouldScrollRef,
        elementIds
    ]);
    var getToggleButtonProps = (0, $63SH6.useCallback)(function(_temp4) {
        var _extends4;
        var _ref5 = _temp4 === void 0 ? {} : _temp4, onClick = _ref5.onClick;
        _ref5.onPress;
        var _ref5$refKey = _ref5.refKey, refKey = _ref5$refKey === void 0 ? "ref" : _ref5$refKey, ref = _ref5.ref, rest = (0, $8WqTz.default)(_ref5, $d0d825e43d8ba478$var$_excluded3);
        var latestState = latest.current.state;
        var toggleButtonHandleClick = function toggleButtonHandleClick() {
            dispatch({
                type: $d0d825e43d8ba478$var$ToggleButtonClick
            });
        };
        return (0, $uwkDK.default)((_extends4 = {}, _extends4[refKey] = $d0d825e43d8ba478$var$handleRefs(ref, function(toggleButtonNode) {
            toggleButtonRef.current = toggleButtonNode;
        }), _extends4["aria-controls"] = elementIds.menuId, _extends4["aria-expanded"] = latestState.isOpen, _extends4.id = elementIds.toggleButtonId, _extends4.tabIndex = -1, _extends4), !rest.disabled && (0, $uwkDK.default)({}, {
            onClick: $d0d825e43d8ba478$var$callAllEventHandlers(onClick, toggleButtonHandleClick)
        }), rest);
    }, [
        dispatch,
        latest,
        elementIds
    ]);
    var getInputProps = (0, $63SH6.useCallback)(function(_temp5, _temp6) {
        var _extends5;
        var _ref6 = _temp5 === void 0 ? {} : _temp5, onKeyDown = _ref6.onKeyDown, onChange = _ref6.onChange, onInput = _ref6.onInput, onBlur = _ref6.onBlur;
        _ref6.onChangeText;
        var onClick = _ref6.onClick, _ref6$refKey = _ref6.refKey, refKey = _ref6$refKey === void 0 ? "ref" : _ref6$refKey, ref = _ref6.ref, rest = (0, $8WqTz.default)(_ref6, $d0d825e43d8ba478$var$_excluded4);
        var _ref7 = _temp6 === void 0 ? {} : _temp6, _ref7$suppressRefErro = _ref7.suppressRefError, suppressRefError = _ref7$suppressRefErro === void 0 ? false : _ref7$suppressRefErro;
        setGetterPropCallInfo("getInputProps", suppressRefError, refKey, inputRef);
        var latestState = latest.current.state;
        var inputHandleKeyDown = function inputHandleKeyDown(event) {
            var key = $d0d825e43d8ba478$var$normalizeArrowKey(event);
            if (key && inputKeyDownHandlers[key]) inputKeyDownHandlers[key](event);
        };
        var inputHandleChange = function inputHandleChange(event) {
            dispatch({
                type: $d0d825e43d8ba478$var$InputChange,
                inputValue: event.target.value
            });
        };
        var inputHandleBlur = function inputHandleBlur(event) {
            /* istanbul ignore else */ if (environment != null && environment.document && latestState.isOpen && !mouseAndTouchTrackersRef.current.isMouseDown) {
                var isBlurByTabChange = event.relatedTarget === null && environment.document.activeElement !== environment.document.body;
                dispatch({
                    type: $d0d825e43d8ba478$var$InputBlur,
                    selectItem: !isBlurByTabChange
                });
            }
        };
        var inputHandleClick = function inputHandleClick() {
            dispatch({
                type: $d0d825e43d8ba478$var$InputClick
            });
        };
        /* istanbul ignore next (preact) */ var onChangeKey = "onChange";
        var eventHandlers = {};
        if (!rest.disabled) {
            var _eventHandlers;
            eventHandlers = (_eventHandlers = {}, _eventHandlers[onChangeKey] = $d0d825e43d8ba478$var$callAllEventHandlers(onChange, onInput, inputHandleChange), _eventHandlers.onKeyDown = $d0d825e43d8ba478$var$callAllEventHandlers(onKeyDown, inputHandleKeyDown), _eventHandlers.onBlur = $d0d825e43d8ba478$var$callAllEventHandlers(onBlur, inputHandleBlur), _eventHandlers.onClick = $d0d825e43d8ba478$var$callAllEventHandlers(onClick, inputHandleClick), _eventHandlers);
        }
        return (0, $uwkDK.default)((_extends5 = {}, _extends5[refKey] = $d0d825e43d8ba478$var$handleRefs(ref, function(inputNode) {
            inputRef.current = inputNode;
        }), _extends5["aria-activedescendant"] = latestState.isOpen && latestState.highlightedIndex > -1 ? elementIds.getItemId(latestState.highlightedIndex) : "", _extends5["aria-autocomplete"] = "list", _extends5["aria-controls"] = elementIds.menuId, _extends5["aria-expanded"] = latestState.isOpen, _extends5["aria-labelledby"] = rest && rest["aria-label"] ? undefined : elementIds.labelId, _extends5.autoComplete = "off", _extends5.id = elementIds.inputId, _extends5.role = "combobox", _extends5.value = latestState.inputValue, _extends5), eventHandlers, rest);
    }, [
        setGetterPropCallInfo,
        latest,
        elementIds,
        inputKeyDownHandlers,
        dispatch,
        mouseAndTouchTrackersRef,
        environment
    ]);
    // returns
    var toggleMenu = (0, $63SH6.useCallback)(function() {
        dispatch({
            type: $d0d825e43d8ba478$var$FunctionToggleMenu
        });
    }, [
        dispatch
    ]);
    var closeMenu = (0, $63SH6.useCallback)(function() {
        dispatch({
            type: $d0d825e43d8ba478$var$FunctionCloseMenu
        });
    }, [
        dispatch
    ]);
    var openMenu = (0, $63SH6.useCallback)(function() {
        dispatch({
            type: $d0d825e43d8ba478$var$FunctionOpenMenu
        });
    }, [
        dispatch
    ]);
    var setHighlightedIndex = (0, $63SH6.useCallback)(function(newHighlightedIndex) {
        dispatch({
            type: $d0d825e43d8ba478$var$FunctionSetHighlightedIndex,
            highlightedIndex: newHighlightedIndex
        });
    }, [
        dispatch
    ]);
    var selectItem = (0, $63SH6.useCallback)(function(newSelectedItem) {
        dispatch({
            type: $d0d825e43d8ba478$var$FunctionSelectItem,
            selectedItem: newSelectedItem
        });
    }, [
        dispatch
    ]);
    var setInputValue = (0, $63SH6.useCallback)(function(newInputValue) {
        dispatch({
            type: $d0d825e43d8ba478$var$FunctionSetInputValue,
            inputValue: newInputValue
        });
    }, [
        dispatch
    ]);
    var reset = (0, $63SH6.useCallback)(function() {
        dispatch({
            type: $d0d825e43d8ba478$var$FunctionReset$1
        });
    }, [
        dispatch
    ]);
    return {
        // prop getters.
        getItemProps: getItemProps,
        getLabelProps: getLabelProps,
        getMenuProps: getMenuProps,
        getInputProps: getInputProps,
        getToggleButtonProps: getToggleButtonProps,
        // actions.
        toggleMenu: toggleMenu,
        openMenu: openMenu,
        closeMenu: closeMenu,
        setHighlightedIndex: setHighlightedIndex,
        setInputValue: setInputValue,
        selectItem: selectItem,
        reset: reset,
        // state.
        highlightedIndex: highlightedIndex,
        isOpen: isOpen,
        selectedItem: selectedItem,
        inputValue: inputValue
    };
}
var $d0d825e43d8ba478$var$defaultStateValues = {
    activeIndex: -1,
    selectedItems: []
};
/**
 * Returns the initial value for a state key in the following order:
 * 1. controlled prop, 2. initial prop, 3. default prop, 4. default
 * value from Downshift.
 *
 * @param {Object} props Props passed to the hook.
 * @param {string} propKey Props key to generate the value for.
 * @returns {any} The initial value for that prop.
 */ function $d0d825e43d8ba478$var$getInitialValue(props, propKey) {
    return $d0d825e43d8ba478$var$getInitialValue$1(props, propKey, $d0d825e43d8ba478$var$defaultStateValues);
}
/**
 * Returns the default value for a state key in the following order:
 * 1. controlled prop, 2. default prop, 3. default value from Downshift.
 *
 * @param {Object} props Props passed to the hook.
 * @param {string} propKey Props key to generate the value for.
 * @returns {any} The initial value for that prop.
 */ function $d0d825e43d8ba478$var$getDefaultValue(props, propKey) {
    return $d0d825e43d8ba478$var$getDefaultValue$1(props, propKey, $d0d825e43d8ba478$var$defaultStateValues);
}
/**
 * Gets the initial state based on the provided props. It uses initial, default
 * and controlled props related to state in order to compute the initial value.
 *
 * @param {Object} props Props passed to the hook.
 * @returns {Object} The initial state.
 */ function $d0d825e43d8ba478$var$getInitialState(props) {
    var activeIndex = $d0d825e43d8ba478$var$getInitialValue(props, "activeIndex");
    var selectedItems = $d0d825e43d8ba478$var$getInitialValue(props, "selectedItems");
    return {
        activeIndex: activeIndex,
        selectedItems: selectedItems
    };
}
/**
 * Returns true if dropdown keydown operation is permitted. Should not be
 * allowed on keydown with modifier keys (ctrl, alt, shift, meta), on
 * input element with text content that is either highlighted or selection
 * cursor is not at the starting position.
 *
 * @param {KeyboardEvent} event The event from keydown.
 * @returns {boolean} Whether the operation is allowed.
 */ function $d0d825e43d8ba478$var$isKeyDownOperationPermitted(event) {
    if (event.shiftKey || event.metaKey || event.ctrlKey || event.altKey) return false;
    var element = event.target;
    if (element instanceof HTMLInputElement && // if element is a text input
    element.value !== "" && // and we have text in it
    // and cursor is either not at the start or is currently highlighting text.
    (element.selectionStart !== 0 || element.selectionEnd !== 0)) return false;
    return true;
}
/**
 * Returns a message to be added to aria-live region when item is removed.
 *
 * @param {Object} selectionParameters Parameters required to build the message.
 * @returns {string} The a11y message.
 */ function $d0d825e43d8ba478$var$getA11yRemovalMessage(selectionParameters) {
    var removedSelectedItem = selectionParameters.removedSelectedItem, itemToStringLocal = selectionParameters.itemToString;
    return itemToStringLocal(removedSelectedItem) + " has been removed.";
}
var $d0d825e43d8ba478$var$propTypes = (0, $uwkDK.default)({}, $d0d825e43d8ba478$var$commonPropTypes, {
    selectedItems: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).array,
    initialSelectedItems: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).array,
    defaultSelectedItems: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).array,
    getA11yRemovalMessage: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).func,
    activeIndex: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).number,
    initialActiveIndex: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).number,
    defaultActiveIndex: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).number,
    onActiveIndexChange: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).func,
    onSelectedItemsChange: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).func,
    keyNavigationNext: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).string,
    keyNavigationPrevious: (0, (/*@__PURE__*/$parcel$interopDefault($eu9I7))).string
});
var $d0d825e43d8ba478$var$defaultProps = {
    itemToString: $d0d825e43d8ba478$var$defaultProps$3.itemToString,
    stateReducer: $d0d825e43d8ba478$var$defaultProps$3.stateReducer,
    environment: $d0d825e43d8ba478$var$defaultProps$3.environment,
    getA11yRemovalMessage: $d0d825e43d8ba478$var$getA11yRemovalMessage,
    keyNavigationNext: "ArrowRight",
    keyNavigationPrevious: "ArrowLeft"
};
// eslint-disable-next-line import/no-mutable-exports
var $d0d825e43d8ba478$var$validatePropTypes = $d0d825e43d8ba478$var$noop;
var $d0d825e43d8ba478$var$SelectedItemClick = 0;
var $d0d825e43d8ba478$var$SelectedItemKeyDownDelete = 1;
var $d0d825e43d8ba478$var$SelectedItemKeyDownBackspace = 2;
var $d0d825e43d8ba478$var$SelectedItemKeyDownNavigationNext = 3;
var $d0d825e43d8ba478$var$SelectedItemKeyDownNavigationPrevious = 4;
var $d0d825e43d8ba478$var$DropdownKeyDownNavigationPrevious = 5;
var $d0d825e43d8ba478$var$DropdownKeyDownBackspace = 6;
var $d0d825e43d8ba478$var$DropdownClick = 7;
var $d0d825e43d8ba478$var$FunctionAddSelectedItem = 8;
var $d0d825e43d8ba478$var$FunctionRemoveSelectedItem = 9;
var $d0d825e43d8ba478$var$FunctionSetSelectedItems = 10;
var $d0d825e43d8ba478$var$FunctionSetActiveIndex = 11;
var $d0d825e43d8ba478$var$FunctionReset = 12;
var $d0d825e43d8ba478$var$stateChangeTypes = /*#__PURE__*/ Object.freeze({
    __proto__: null,
    SelectedItemClick: $d0d825e43d8ba478$var$SelectedItemClick,
    SelectedItemKeyDownDelete: $d0d825e43d8ba478$var$SelectedItemKeyDownDelete,
    SelectedItemKeyDownBackspace: $d0d825e43d8ba478$var$SelectedItemKeyDownBackspace,
    SelectedItemKeyDownNavigationNext: $d0d825e43d8ba478$var$SelectedItemKeyDownNavigationNext,
    SelectedItemKeyDownNavigationPrevious: $d0d825e43d8ba478$var$SelectedItemKeyDownNavigationPrevious,
    DropdownKeyDownNavigationPrevious: $d0d825e43d8ba478$var$DropdownKeyDownNavigationPrevious,
    DropdownKeyDownBackspace: $d0d825e43d8ba478$var$DropdownKeyDownBackspace,
    DropdownClick: $d0d825e43d8ba478$var$DropdownClick,
    FunctionAddSelectedItem: $d0d825e43d8ba478$var$FunctionAddSelectedItem,
    FunctionRemoveSelectedItem: $d0d825e43d8ba478$var$FunctionRemoveSelectedItem,
    FunctionSetSelectedItems: $d0d825e43d8ba478$var$FunctionSetSelectedItems,
    FunctionSetActiveIndex: $d0d825e43d8ba478$var$FunctionSetActiveIndex,
    FunctionReset: $d0d825e43d8ba478$var$FunctionReset
});
/* eslint-disable complexity */ function $d0d825e43d8ba478$var$downshiftMultipleSelectionReducer(state, action) {
    var type = action.type, index = action.index, props = action.props, selectedItem = action.selectedItem;
    var activeIndex = state.activeIndex, selectedItems = state.selectedItems;
    var changes;
    switch(type){
        case $d0d825e43d8ba478$var$SelectedItemClick:
            changes = {
                activeIndex: index
            };
            break;
        case $d0d825e43d8ba478$var$SelectedItemKeyDownNavigationPrevious:
            changes = {
                activeIndex: activeIndex - 1 < 0 ? 0 : activeIndex - 1
            };
            break;
        case $d0d825e43d8ba478$var$SelectedItemKeyDownNavigationNext:
            changes = {
                activeIndex: activeIndex + 1 >= selectedItems.length ? -1 : activeIndex + 1
            };
            break;
        case $d0d825e43d8ba478$var$SelectedItemKeyDownBackspace:
        case $d0d825e43d8ba478$var$SelectedItemKeyDownDelete:
            if (activeIndex < 0) break;
            var newActiveIndex = activeIndex;
            if (selectedItems.length === 1) newActiveIndex = -1;
            else if (activeIndex === selectedItems.length - 1) newActiveIndex = selectedItems.length - 2;
            changes = (0, $uwkDK.default)({
                selectedItems: [].concat(selectedItems.slice(0, activeIndex), selectedItems.slice(activeIndex + 1))
            }, {
                activeIndex: newActiveIndex
            });
            break;
        case $d0d825e43d8ba478$var$DropdownKeyDownNavigationPrevious:
            changes = {
                activeIndex: selectedItems.length - 1
            };
            break;
        case $d0d825e43d8ba478$var$DropdownKeyDownBackspace:
            changes = {
                selectedItems: selectedItems.slice(0, selectedItems.length - 1)
            };
            break;
        case $d0d825e43d8ba478$var$FunctionAddSelectedItem:
            changes = {
                selectedItems: [].concat(selectedItems, [
                    selectedItem
                ])
            };
            break;
        case $d0d825e43d8ba478$var$DropdownClick:
            changes = {
                activeIndex: -1
            };
            break;
        case $d0d825e43d8ba478$var$FunctionRemoveSelectedItem:
            var _newActiveIndex = activeIndex;
            var selectedItemIndex = selectedItems.indexOf(selectedItem);
            if (selectedItemIndex < 0) break;
            if (selectedItems.length === 1) _newActiveIndex = -1;
            else if (selectedItemIndex === selectedItems.length - 1) _newActiveIndex = selectedItems.length - 2;
            changes = {
                selectedItems: [].concat(selectedItems.slice(0, selectedItemIndex), selectedItems.slice(selectedItemIndex + 1)),
                activeIndex: _newActiveIndex
            };
            break;
        case $d0d825e43d8ba478$var$FunctionSetSelectedItems:
            var newSelectedItems = action.selectedItems;
            changes = {
                selectedItems: newSelectedItems
            };
            break;
        case $d0d825e43d8ba478$var$FunctionSetActiveIndex:
            var _newActiveIndex2 = action.activeIndex;
            changes = {
                activeIndex: _newActiveIndex2
            };
            break;
        case $d0d825e43d8ba478$var$FunctionReset:
            changes = {
                activeIndex: $d0d825e43d8ba478$var$getDefaultValue(props, "activeIndex"),
                selectedItems: $d0d825e43d8ba478$var$getDefaultValue(props, "selectedItems")
            };
            break;
        default:
            throw new Error("Reducer called without proper action type.");
    }
    return (0, $uwkDK.default)({}, state, changes);
}
var $d0d825e43d8ba478$var$_excluded = [
    "refKey",
    "ref",
    "onClick",
    "onKeyDown",
    "selectedItem",
    "index"
], $d0d825e43d8ba478$var$_excluded2 = [
    "refKey",
    "ref",
    "onKeyDown",
    "onClick",
    "preventKeyAction"
];
$d0d825e43d8ba478$export$134e7e7faed1473a.stateChangeTypes = $d0d825e43d8ba478$var$stateChangeTypes;
function $d0d825e43d8ba478$export$134e7e7faed1473a(userProps) {
    if (userProps === void 0) userProps = {};
    $d0d825e43d8ba478$var$validatePropTypes(userProps, $d0d825e43d8ba478$export$134e7e7faed1473a);
    // Props defaults and destructuring.
    var props = (0, $uwkDK.default)({}, $d0d825e43d8ba478$var$defaultProps, userProps);
    var getA11yRemovalMessage = props.getA11yRemovalMessage, itemToString = props.itemToString, environment = props.environment, keyNavigationNext = props.keyNavigationNext, keyNavigationPrevious = props.keyNavigationPrevious;
    // Reducer init.
    var _useControlledReducer = $d0d825e43d8ba478$var$useControlledReducer$1($d0d825e43d8ba478$var$downshiftMultipleSelectionReducer, $d0d825e43d8ba478$var$getInitialState(props), props), state = _useControlledReducer[0], dispatch = _useControlledReducer[1];
    var activeIndex = state.activeIndex, selectedItems = state.selectedItems;
    // Refs.
    var isInitialMountRef = (0, $63SH6.useRef)(true);
    var dropdownRef = (0, $63SH6.useRef)(null);
    var previousSelectedItemsRef = (0, $63SH6.useRef)(selectedItems);
    var selectedItemRefs = (0, $63SH6.useRef)();
    selectedItemRefs.current = [];
    var latest = $d0d825e43d8ba478$var$useLatestRef({
        state: state,
        props: props
    });
    // Effects.
    /* Sets a11y status message on changes in selectedItem. */ (0, $63SH6.useEffect)(function() {
        if (isInitialMountRef.current || false || !(environment != null && environment.document)) return;
        if (selectedItems.length < previousSelectedItemsRef.current.length) {
            var removedSelectedItem = previousSelectedItemsRef.current.find(function(item) {
                return selectedItems.indexOf(item) < 0;
            });
            $d0d825e43d8ba478$var$setStatus(getA11yRemovalMessage({
                itemToString: itemToString,
                resultCount: selectedItems.length,
                removedSelectedItem: removedSelectedItem,
                activeIndex: activeIndex,
                activeSelectedItem: selectedItems[activeIndex]
            }), environment.document);
        }
        previousSelectedItemsRef.current = selectedItems;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        selectedItems.length
    ]);
    // Sets focus on active item.
    (0, $63SH6.useEffect)(function() {
        if (isInitialMountRef.current) return;
        if (activeIndex === -1 && dropdownRef.current) dropdownRef.current.focus();
        else if (selectedItemRefs.current[activeIndex]) selectedItemRefs.current[activeIndex].focus();
    }, [
        activeIndex
    ]);
    $d0d825e43d8ba478$var$useControlPropsValidator({
        isInitialMount: isInitialMountRef.current,
        props: props,
        state: state
    });
    var setGetterPropCallInfo = $d0d825e43d8ba478$var$useGetterPropsCalledChecker("getDropdownProps");
    // Make initial ref false.
    (0, $63SH6.useEffect)(function() {
        isInitialMountRef.current = false;
        return function() {
            isInitialMountRef.current = true;
        };
    }, []);
    // Event handler functions.
    var selectedItemKeyDownHandlers = (0, $63SH6.useMemo)(function() {
        var _ref;
        return _ref = {}, _ref[keyNavigationPrevious] = function() {
            dispatch({
                type: $d0d825e43d8ba478$var$SelectedItemKeyDownNavigationPrevious
            });
        }, _ref[keyNavigationNext] = function() {
            dispatch({
                type: $d0d825e43d8ba478$var$SelectedItemKeyDownNavigationNext
            });
        }, _ref.Delete = function Delete() {
            dispatch({
                type: $d0d825e43d8ba478$var$SelectedItemKeyDownDelete
            });
        }, _ref.Backspace = function Backspace() {
            dispatch({
                type: $d0d825e43d8ba478$var$SelectedItemKeyDownBackspace
            });
        }, _ref;
    }, [
        dispatch,
        keyNavigationNext,
        keyNavigationPrevious
    ]);
    var dropdownKeyDownHandlers = (0, $63SH6.useMemo)(function() {
        var _ref2;
        return _ref2 = {}, _ref2[keyNavigationPrevious] = function(event) {
            if ($d0d825e43d8ba478$var$isKeyDownOperationPermitted(event)) dispatch({
                type: $d0d825e43d8ba478$var$DropdownKeyDownNavigationPrevious
            });
        }, _ref2.Backspace = function Backspace(event) {
            if ($d0d825e43d8ba478$var$isKeyDownOperationPermitted(event)) dispatch({
                type: $d0d825e43d8ba478$var$DropdownKeyDownBackspace
            });
        }, _ref2;
    }, [
        dispatch,
        keyNavigationPrevious
    ]);
    // Getter props.
    var getSelectedItemProps = (0, $63SH6.useCallback)(function(_temp) {
        var _extends2;
        var _ref3 = _temp === void 0 ? {} : _temp, _ref3$refKey = _ref3.refKey, refKey = _ref3$refKey === void 0 ? "ref" : _ref3$refKey, ref = _ref3.ref, onClick = _ref3.onClick, onKeyDown = _ref3.onKeyDown, selectedItemProp = _ref3.selectedItem, indexProp = _ref3.index, rest = (0, $8WqTz.default)(_ref3, $d0d825e43d8ba478$var$_excluded);
        var latestState = latest.current.state;
        var _getItemAndIndex = $d0d825e43d8ba478$var$getItemAndIndex(selectedItemProp, indexProp, latestState.selectedItems, "Pass either item or index to getSelectedItemProps!"), index = _getItemAndIndex[1];
        var isFocusable = index > -1 && index === latestState.activeIndex;
        var selectedItemHandleClick = function selectedItemHandleClick() {
            dispatch({
                type: $d0d825e43d8ba478$var$SelectedItemClick,
                index: index
            });
        };
        var selectedItemHandleKeyDown = function selectedItemHandleKeyDown(event) {
            var key = $d0d825e43d8ba478$var$normalizeArrowKey(event);
            if (key && selectedItemKeyDownHandlers[key]) selectedItemKeyDownHandlers[key](event);
        };
        return (0, $uwkDK.default)((_extends2 = {}, _extends2[refKey] = $d0d825e43d8ba478$var$handleRefs(ref, function(selectedItemNode) {
            if (selectedItemNode) selectedItemRefs.current.push(selectedItemNode);
        }), _extends2.tabIndex = isFocusable ? 0 : -1, _extends2.onClick = $d0d825e43d8ba478$var$callAllEventHandlers(onClick, selectedItemHandleClick), _extends2.onKeyDown = $d0d825e43d8ba478$var$callAllEventHandlers(onKeyDown, selectedItemHandleKeyDown), _extends2), rest);
    }, [
        dispatch,
        latest,
        selectedItemKeyDownHandlers
    ]);
    var getDropdownProps = (0, $63SH6.useCallback)(function(_temp2, _temp3) {
        var _extends3;
        var _ref4 = _temp2 === void 0 ? {} : _temp2, _ref4$refKey = _ref4.refKey, refKey = _ref4$refKey === void 0 ? "ref" : _ref4$refKey, ref = _ref4.ref, onKeyDown = _ref4.onKeyDown, onClick = _ref4.onClick, _ref4$preventKeyActio = _ref4.preventKeyAction, preventKeyAction = _ref4$preventKeyActio === void 0 ? false : _ref4$preventKeyActio, rest = (0, $8WqTz.default)(_ref4, $d0d825e43d8ba478$var$_excluded2);
        var _ref5 = _temp3 === void 0 ? {} : _temp3, _ref5$suppressRefErro = _ref5.suppressRefError, suppressRefError = _ref5$suppressRefErro === void 0 ? false : _ref5$suppressRefErro;
        setGetterPropCallInfo("getDropdownProps", suppressRefError, refKey, dropdownRef);
        var dropdownHandleKeyDown = function dropdownHandleKeyDown(event) {
            var key = $d0d825e43d8ba478$var$normalizeArrowKey(event);
            if (key && dropdownKeyDownHandlers[key]) dropdownKeyDownHandlers[key](event);
        };
        var dropdownHandleClick = function dropdownHandleClick() {
            dispatch({
                type: $d0d825e43d8ba478$var$DropdownClick
            });
        };
        return (0, $uwkDK.default)((_extends3 = {}, _extends3[refKey] = $d0d825e43d8ba478$var$handleRefs(ref, function(dropdownNode) {
            if (dropdownNode) dropdownRef.current = dropdownNode;
        }), _extends3), !preventKeyAction && {
            onKeyDown: $d0d825e43d8ba478$var$callAllEventHandlers(onKeyDown, dropdownHandleKeyDown),
            onClick: $d0d825e43d8ba478$var$callAllEventHandlers(onClick, dropdownHandleClick)
        }, rest);
    }, [
        dispatch,
        dropdownKeyDownHandlers,
        setGetterPropCallInfo
    ]);
    // returns
    var addSelectedItem = (0, $63SH6.useCallback)(function(selectedItem) {
        dispatch({
            type: $d0d825e43d8ba478$var$FunctionAddSelectedItem,
            selectedItem: selectedItem
        });
    }, [
        dispatch
    ]);
    var removeSelectedItem = (0, $63SH6.useCallback)(function(selectedItem) {
        dispatch({
            type: $d0d825e43d8ba478$var$FunctionRemoveSelectedItem,
            selectedItem: selectedItem
        });
    }, [
        dispatch
    ]);
    var setSelectedItems = (0, $63SH6.useCallback)(function(newSelectedItems) {
        dispatch({
            type: $d0d825e43d8ba478$var$FunctionSetSelectedItems,
            selectedItems: newSelectedItems
        });
    }, [
        dispatch
    ]);
    var setActiveIndex = (0, $63SH6.useCallback)(function(newActiveIndex) {
        dispatch({
            type: $d0d825e43d8ba478$var$FunctionSetActiveIndex,
            activeIndex: newActiveIndex
        });
    }, [
        dispatch
    ]);
    var reset = (0, $63SH6.useCallback)(function() {
        dispatch({
            type: $d0d825e43d8ba478$var$FunctionReset
        });
    }, [
        dispatch
    ]);
    return {
        getSelectedItemProps: getSelectedItemProps,
        getDropdownProps: getDropdownProps,
        addSelectedItem: addSelectedItem,
        removeSelectedItem: removeSelectedItem,
        setSelectedItems: setSelectedItems,
        setActiveIndex: setActiveIndex,
        reset: reset,
        selectedItems: selectedItems,
        activeIndex: activeIndex
    };
}

});
parcelRegister("8WqTz", function(module, exports) {

$parcel$export(module.exports, "default", () => $68289a5ce1bcd6c4$export$2e2bcd8739ae039);
function $68289a5ce1bcd6c4$export$2e2bcd8739ae039(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for(i = 0; i < sourceKeys.length; i++){
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        target[key] = source[key];
    }
    return target;
}

});

parcelRegister("uwkDK", function(module, exports) {

$parcel$export(module.exports, "default", () => $05bbe1e6311f0c0f$export$2e2bcd8739ae039);
function $05bbe1e6311f0c0f$export$2e2bcd8739ae039() {
    $05bbe1e6311f0c0f$export$2e2bcd8739ae039 = Object.assign ? Object.assign.bind() : function(target) {
        for(var i = 1; i < arguments.length; i++){
            var source = arguments[i];
            for(var key in source)if (Object.prototype.hasOwnProperty.call(source, key)) target[key] = source[key];
        }
        return target;
    };
    return $05bbe1e6311f0c0f$export$2e2bcd8739ae039.apply(this, arguments);
}

});

parcelRegister("1Nh8o", function(module, exports) {

$parcel$export(module.exports, "default", () => $14e7a899f7a6fd8c$export$2e2bcd8739ae039);
function $14e7a899f7a6fd8c$export$2e2bcd8739ae039(self) {
    if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return self;
}

});

parcelRegister("5VaeF", function(module, exports) {

$parcel$export(module.exports, "default", () => $44fa373266b5f7e3$export$2e2bcd8739ae039);

var $f3xoQ = parcelRequire("f3xoQ");
function $44fa373266b5f7e3$export$2e2bcd8739ae039(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    (0, $f3xoQ.default)(subClass, superClass);
}

});
parcelRegister("f3xoQ", function(module, exports) {

$parcel$export(module.exports, "default", () => $af610b4cb32b0a5c$export$2e2bcd8739ae039);
function $af610b4cb32b0a5c$export$2e2bcd8739ae039(o, p) {
    $af610b4cb32b0a5c$export$2e2bcd8739ae039 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
    };
    return $af610b4cb32b0a5c$export$2e2bcd8739ae039(o, p);
}

});


parcelRegister("eu9I7", function(module, exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var $a8bb6658ecfb1626$var$ReactIs, $a8bb6658ecfb1626$var$throwOnDirectAccess;

// By explicitly using `prop-types` you are opting into new production behavior.
// http://fb.me/prop-types-in-prod
module.exports = (parcelRequire("ggqhU"))();

});
parcelRegister("ggqhU", function(module, exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";

var $hmi6A = parcelRequire("hmi6A");
function $bd7288339e99f7a7$var$emptyFunction() {}
function $bd7288339e99f7a7$var$emptyFunctionWithReset() {}
$bd7288339e99f7a7$var$emptyFunctionWithReset.resetWarningCache = $bd7288339e99f7a7$var$emptyFunction;
module.exports = function() {
    function shim(props, propName, componentName, location, propFullName, secret) {
        if (secret === $hmi6A) // It is still safe when called from React.
        return;
        var err = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
        err.name = "Invariant Violation";
        throw err;
    }
    shim.isRequired = shim;
    function getShim() {
        return shim;
    }
    // Important!
    // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
    var ReactPropTypes = {
        array: shim,
        bigint: shim,
        bool: shim,
        func: shim,
        number: shim,
        object: shim,
        string: shim,
        symbol: shim,
        any: shim,
        arrayOf: getShim,
        element: shim,
        elementType: shim,
        instanceOf: getShim,
        node: shim,
        objectOf: getShim,
        oneOf: getShim,
        oneOfType: getShim,
        shape: getShim,
        exact: getShim,
        checkPropTypes: $bd7288339e99f7a7$var$emptyFunctionWithReset,
        resetWarningCache: $bd7288339e99f7a7$var$emptyFunction
    };
    ReactPropTypes.PropTypes = ReactPropTypes;
    return ReactPropTypes;
};

});
parcelRegister("hmi6A", function(module, exports) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
var $ca32891491f834e6$var$ReactPropTypesSecret = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
module.exports = $ca32891491f834e6$var$ReactPropTypesSecret;

});



parcelRegister("2oqnz", function(module, exports) {
"use strict";

module.exports = (parcelRequire("3ln06"));

});
parcelRegister("3ln06", function(module, exports) {

$parcel$export(module.exports, "ContextConsumer", () => $26f52cba0c3bfe9e$export$a7c73072b1a182ae, (v) => $26f52cba0c3bfe9e$export$a7c73072b1a182ae = v);
$parcel$export(module.exports, "ContextProvider", () => $26f52cba0c3bfe9e$export$9f27bc3417b4524d, (v) => $26f52cba0c3bfe9e$export$9f27bc3417b4524d = v);
$parcel$export(module.exports, "Element", () => $26f52cba0c3bfe9e$export$db77ccec0bb4ccac, (v) => $26f52cba0c3bfe9e$export$db77ccec0bb4ccac = v);
$parcel$export(module.exports, "ForwardRef", () => $26f52cba0c3bfe9e$export$8392c0c9d3dcbd35, (v) => $26f52cba0c3bfe9e$export$8392c0c9d3dcbd35 = v);
$parcel$export(module.exports, "Fragment", () => $26f52cba0c3bfe9e$export$ffb0004e005737fa, (v) => $26f52cba0c3bfe9e$export$ffb0004e005737fa = v);
$parcel$export(module.exports, "Lazy", () => $26f52cba0c3bfe9e$export$b624eff549462981, (v) => $26f52cba0c3bfe9e$export$b624eff549462981 = v);
$parcel$export(module.exports, "Memo", () => $26f52cba0c3bfe9e$export$7897aa7841a5380c, (v) => $26f52cba0c3bfe9e$export$7897aa7841a5380c = v);
$parcel$export(module.exports, "Portal", () => $26f52cba0c3bfe9e$export$602eac185826482c, (v) => $26f52cba0c3bfe9e$export$602eac185826482c = v);
$parcel$export(module.exports, "Profiler", () => $26f52cba0c3bfe9e$export$e2c29f18771995cb, (v) => $26f52cba0c3bfe9e$export$e2c29f18771995cb = v);
$parcel$export(module.exports, "StrictMode", () => $26f52cba0c3bfe9e$export$5f8d39834fd61797, (v) => $26f52cba0c3bfe9e$export$5f8d39834fd61797 = v);
$parcel$export(module.exports, "Suspense", () => $26f52cba0c3bfe9e$export$74bf444e3cd11ea5, (v) => $26f52cba0c3bfe9e$export$74bf444e3cd11ea5 = v);
$parcel$export(module.exports, "SuspenseList", () => $26f52cba0c3bfe9e$export$998bcd577473dd93, (v) => $26f52cba0c3bfe9e$export$998bcd577473dd93 = v);
$parcel$export(module.exports, "isAsyncMode", () => $26f52cba0c3bfe9e$export$92387174baf9b227, (v) => $26f52cba0c3bfe9e$export$92387174baf9b227 = v);
$parcel$export(module.exports, "isConcurrentMode", () => $26f52cba0c3bfe9e$export$ec112efeb987d9c6, (v) => $26f52cba0c3bfe9e$export$ec112efeb987d9c6 = v);
$parcel$export(module.exports, "isContextConsumer", () => $26f52cba0c3bfe9e$export$b706b080d889d2c9, (v) => $26f52cba0c3bfe9e$export$b706b080d889d2c9 = v);
$parcel$export(module.exports, "isContextProvider", () => $26f52cba0c3bfe9e$export$5be5a87408f70ddc, (v) => $26f52cba0c3bfe9e$export$5be5a87408f70ddc = v);
$parcel$export(module.exports, "isElement", () => $26f52cba0c3bfe9e$export$45a5e7f76e0caa8d, (v) => $26f52cba0c3bfe9e$export$45a5e7f76e0caa8d = v);
$parcel$export(module.exports, "isForwardRef", () => $26f52cba0c3bfe9e$export$455c2e768291efa6, (v) => $26f52cba0c3bfe9e$export$455c2e768291efa6 = v);
$parcel$export(module.exports, "isFragment", () => $26f52cba0c3bfe9e$export$9522e17588c12572, (v) => $26f52cba0c3bfe9e$export$9522e17588c12572 = v);
$parcel$export(module.exports, "isLazy", () => $26f52cba0c3bfe9e$export$2110ac352bb060b9, (v) => $26f52cba0c3bfe9e$export$2110ac352bb060b9 = v);
$parcel$export(module.exports, "isMemo", () => $26f52cba0c3bfe9e$export$56885ab8b9c456ab, (v) => $26f52cba0c3bfe9e$export$56885ab8b9c456ab = v);
$parcel$export(module.exports, "isPortal", () => $26f52cba0c3bfe9e$export$d927fcb6adf8f9de, (v) => $26f52cba0c3bfe9e$export$d927fcb6adf8f9de = v);
$parcel$export(module.exports, "isProfiler", () => $26f52cba0c3bfe9e$export$b82d16f27459e05a, (v) => $26f52cba0c3bfe9e$export$b82d16f27459e05a = v);
$parcel$export(module.exports, "isStrictMode", () => $26f52cba0c3bfe9e$export$522c17b4f5e123e8, (v) => $26f52cba0c3bfe9e$export$522c17b4f5e123e8 = v);
$parcel$export(module.exports, "isSuspense", () => $26f52cba0c3bfe9e$export$1aabd8a0274ecfd6, (v) => $26f52cba0c3bfe9e$export$1aabd8a0274ecfd6 = v);
$parcel$export(module.exports, "isSuspenseList", () => $26f52cba0c3bfe9e$export$3d6c20d97e46b957, (v) => $26f52cba0c3bfe9e$export$3d6c20d97e46b957 = v);
$parcel$export(module.exports, "isValidElementType", () => $26f52cba0c3bfe9e$export$9b621391a187a31a, (v) => $26f52cba0c3bfe9e$export$9b621391a187a31a = v);
$parcel$export(module.exports, "typeOf", () => $26f52cba0c3bfe9e$export$f5bbd400c2f4426f, (v) => $26f52cba0c3bfe9e$export$f5bbd400c2f4426f = v);
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var $26f52cba0c3bfe9e$export$a7c73072b1a182ae;
var $26f52cba0c3bfe9e$export$9f27bc3417b4524d;
var $26f52cba0c3bfe9e$export$db77ccec0bb4ccac;
var $26f52cba0c3bfe9e$export$8392c0c9d3dcbd35;
var $26f52cba0c3bfe9e$export$ffb0004e005737fa;
var $26f52cba0c3bfe9e$export$b624eff549462981;
var $26f52cba0c3bfe9e$export$7897aa7841a5380c;
var $26f52cba0c3bfe9e$export$602eac185826482c;
var $26f52cba0c3bfe9e$export$e2c29f18771995cb;
var $26f52cba0c3bfe9e$export$5f8d39834fd61797;
var $26f52cba0c3bfe9e$export$74bf444e3cd11ea5;
var $26f52cba0c3bfe9e$export$998bcd577473dd93;
var $26f52cba0c3bfe9e$export$92387174baf9b227;
var $26f52cba0c3bfe9e$export$ec112efeb987d9c6;
var $26f52cba0c3bfe9e$export$b706b080d889d2c9;
var $26f52cba0c3bfe9e$export$5be5a87408f70ddc;
var $26f52cba0c3bfe9e$export$45a5e7f76e0caa8d;
var $26f52cba0c3bfe9e$export$455c2e768291efa6;
var $26f52cba0c3bfe9e$export$9522e17588c12572;
var $26f52cba0c3bfe9e$export$2110ac352bb060b9;
var $26f52cba0c3bfe9e$export$56885ab8b9c456ab;
var $26f52cba0c3bfe9e$export$d927fcb6adf8f9de;
var $26f52cba0c3bfe9e$export$b82d16f27459e05a;
var $26f52cba0c3bfe9e$export$522c17b4f5e123e8;
var $26f52cba0c3bfe9e$export$1aabd8a0274ecfd6;
var $26f52cba0c3bfe9e$export$3d6c20d97e46b957;
var $26f52cba0c3bfe9e$export$9b621391a187a31a;
var $26f52cba0c3bfe9e$export$f5bbd400c2f4426f;
"use strict";
var $26f52cba0c3bfe9e$var$b = Symbol.for("react.element"), $26f52cba0c3bfe9e$var$c = Symbol.for("react.portal"), $26f52cba0c3bfe9e$var$d = Symbol.for("react.fragment"), $26f52cba0c3bfe9e$var$e = Symbol.for("react.strict_mode"), $26f52cba0c3bfe9e$var$f = Symbol.for("react.profiler"), $26f52cba0c3bfe9e$var$g = Symbol.for("react.provider"), $26f52cba0c3bfe9e$var$h = Symbol.for("react.context"), $26f52cba0c3bfe9e$var$k = Symbol.for("react.server_context"), $26f52cba0c3bfe9e$var$l = Symbol.for("react.forward_ref"), $26f52cba0c3bfe9e$var$m = Symbol.for("react.suspense"), $26f52cba0c3bfe9e$var$n = Symbol.for("react.suspense_list"), $26f52cba0c3bfe9e$var$p = Symbol.for("react.memo"), $26f52cba0c3bfe9e$var$q = Symbol.for("react.lazy"), $26f52cba0c3bfe9e$var$t = Symbol.for("react.offscreen"), $26f52cba0c3bfe9e$var$u;
$26f52cba0c3bfe9e$var$u = Symbol.for("react.module.reference");
function $26f52cba0c3bfe9e$var$v(a) {
    if ("object" === typeof a && null !== a) {
        var r = a.$$typeof;
        switch(r){
            case $26f52cba0c3bfe9e$var$b:
                switch(a = a.type, a){
                    case $26f52cba0c3bfe9e$var$d:
                    case $26f52cba0c3bfe9e$var$f:
                    case $26f52cba0c3bfe9e$var$e:
                    case $26f52cba0c3bfe9e$var$m:
                    case $26f52cba0c3bfe9e$var$n:
                        return a;
                    default:
                        switch(a = a && a.$$typeof, a){
                            case $26f52cba0c3bfe9e$var$k:
                            case $26f52cba0c3bfe9e$var$h:
                            case $26f52cba0c3bfe9e$var$l:
                            case $26f52cba0c3bfe9e$var$q:
                            case $26f52cba0c3bfe9e$var$p:
                            case $26f52cba0c3bfe9e$var$g:
                                return a;
                            default:
                                return r;
                        }
                }
            case $26f52cba0c3bfe9e$var$c:
                return r;
        }
    }
}
$26f52cba0c3bfe9e$export$a7c73072b1a182ae = $26f52cba0c3bfe9e$var$h;
$26f52cba0c3bfe9e$export$9f27bc3417b4524d = $26f52cba0c3bfe9e$var$g;
$26f52cba0c3bfe9e$export$db77ccec0bb4ccac = $26f52cba0c3bfe9e$var$b;
$26f52cba0c3bfe9e$export$8392c0c9d3dcbd35 = $26f52cba0c3bfe9e$var$l;
$26f52cba0c3bfe9e$export$ffb0004e005737fa = $26f52cba0c3bfe9e$var$d;
$26f52cba0c3bfe9e$export$b624eff549462981 = $26f52cba0c3bfe9e$var$q;
$26f52cba0c3bfe9e$export$7897aa7841a5380c = $26f52cba0c3bfe9e$var$p;
$26f52cba0c3bfe9e$export$602eac185826482c = $26f52cba0c3bfe9e$var$c;
$26f52cba0c3bfe9e$export$e2c29f18771995cb = $26f52cba0c3bfe9e$var$f;
$26f52cba0c3bfe9e$export$5f8d39834fd61797 = $26f52cba0c3bfe9e$var$e;
$26f52cba0c3bfe9e$export$74bf444e3cd11ea5 = $26f52cba0c3bfe9e$var$m;
$26f52cba0c3bfe9e$export$998bcd577473dd93 = $26f52cba0c3bfe9e$var$n;
$26f52cba0c3bfe9e$export$92387174baf9b227 = function() {
    return !1;
};
$26f52cba0c3bfe9e$export$ec112efeb987d9c6 = function() {
    return !1;
};
$26f52cba0c3bfe9e$export$b706b080d889d2c9 = function(a) {
    return $26f52cba0c3bfe9e$var$v(a) === $26f52cba0c3bfe9e$var$h;
};
$26f52cba0c3bfe9e$export$5be5a87408f70ddc = function(a) {
    return $26f52cba0c3bfe9e$var$v(a) === $26f52cba0c3bfe9e$var$g;
};
$26f52cba0c3bfe9e$export$45a5e7f76e0caa8d = function(a) {
    return "object" === typeof a && null !== a && a.$$typeof === $26f52cba0c3bfe9e$var$b;
};
$26f52cba0c3bfe9e$export$455c2e768291efa6 = function(a) {
    return $26f52cba0c3bfe9e$var$v(a) === $26f52cba0c3bfe9e$var$l;
};
$26f52cba0c3bfe9e$export$9522e17588c12572 = function(a) {
    return $26f52cba0c3bfe9e$var$v(a) === $26f52cba0c3bfe9e$var$d;
};
$26f52cba0c3bfe9e$export$2110ac352bb060b9 = function(a) {
    return $26f52cba0c3bfe9e$var$v(a) === $26f52cba0c3bfe9e$var$q;
};
$26f52cba0c3bfe9e$export$56885ab8b9c456ab = function(a) {
    return $26f52cba0c3bfe9e$var$v(a) === $26f52cba0c3bfe9e$var$p;
};
$26f52cba0c3bfe9e$export$d927fcb6adf8f9de = function(a) {
    return $26f52cba0c3bfe9e$var$v(a) === $26f52cba0c3bfe9e$var$c;
};
$26f52cba0c3bfe9e$export$b82d16f27459e05a = function(a) {
    return $26f52cba0c3bfe9e$var$v(a) === $26f52cba0c3bfe9e$var$f;
};
$26f52cba0c3bfe9e$export$522c17b4f5e123e8 = function(a) {
    return $26f52cba0c3bfe9e$var$v(a) === $26f52cba0c3bfe9e$var$e;
};
$26f52cba0c3bfe9e$export$1aabd8a0274ecfd6 = function(a) {
    return $26f52cba0c3bfe9e$var$v(a) === $26f52cba0c3bfe9e$var$m;
};
$26f52cba0c3bfe9e$export$3d6c20d97e46b957 = function(a) {
    return $26f52cba0c3bfe9e$var$v(a) === $26f52cba0c3bfe9e$var$n;
};
$26f52cba0c3bfe9e$export$9b621391a187a31a = function(a) {
    return "string" === typeof a || "function" === typeof a || a === $26f52cba0c3bfe9e$var$d || a === $26f52cba0c3bfe9e$var$f || a === $26f52cba0c3bfe9e$var$e || a === $26f52cba0c3bfe9e$var$m || a === $26f52cba0c3bfe9e$var$n || a === $26f52cba0c3bfe9e$var$t || "object" === typeof a && null !== a && (a.$$typeof === $26f52cba0c3bfe9e$var$q || a.$$typeof === $26f52cba0c3bfe9e$var$p || a.$$typeof === $26f52cba0c3bfe9e$var$g || a.$$typeof === $26f52cba0c3bfe9e$var$h || a.$$typeof === $26f52cba0c3bfe9e$var$l || a.$$typeof === $26f52cba0c3bfe9e$var$u || void 0 !== a.getModuleId) ? !0 : !1;
};
$26f52cba0c3bfe9e$export$f5bbd400c2f4426f = $26f52cba0c3bfe9e$var$v;

});


parcelRegister("jybpY", function(module, exports) {

$parcel$export(module.exports, "compute", () => $e3ba0ca71cdd5b1d$export$3b12cb22b12b954b);
const $e3ba0ca71cdd5b1d$var$t = (t)=>"object" == typeof t && null != t && 1 === t.nodeType, $e3ba0ca71cdd5b1d$var$e = (t, e)=>(!e || "hidden" !== t) && "visible" !== t && "clip" !== t, $e3ba0ca71cdd5b1d$var$n = (t, n)=>{
    if (t.clientHeight < t.scrollHeight || t.clientWidth < t.scrollWidth) {
        const o = getComputedStyle(t, null);
        return $e3ba0ca71cdd5b1d$var$e(o.overflowY, n) || $e3ba0ca71cdd5b1d$var$e(o.overflowX, n) || ((t)=>{
            const e = ((t)=>{
                if (!t.ownerDocument || !t.ownerDocument.defaultView) return null;
                try {
                    return t.ownerDocument.defaultView.frameElement;
                } catch (t) {
                    return null;
                }
            })(t);
            return !!e && (e.clientHeight < t.scrollHeight || e.clientWidth < t.scrollWidth);
        })(t);
    }
    return !1;
}, $e3ba0ca71cdd5b1d$var$o = (t, e, n, o, l, r, i, s)=>r < t && i > e || r > t && i < e ? 0 : r <= t && s <= n || i >= e && s >= n ? r - t - o : i > e && s < n || r < t && s > n ? i - e + l : 0, $e3ba0ca71cdd5b1d$var$l = (t)=>{
    const e = t.parentElement;
    return null == e ? t.getRootNode().host || null : e;
}, $e3ba0ca71cdd5b1d$export$3b12cb22b12b954b = (e, r)=>{
    var i, s, d, h;
    if ("undefined" == typeof document) return [];
    const { scrollMode: c, block: f, inline: u, boundary: a, skipOverflowHiddenElements: g } = r, p = "function" == typeof a ? a : (t)=>t !== a;
    if (!$e3ba0ca71cdd5b1d$var$t(e)) throw new TypeError("Invalid target");
    const m = document.scrollingElement || document.documentElement, w = [];
    let W = e;
    for(; $e3ba0ca71cdd5b1d$var$t(W) && p(W);){
        if (W = $e3ba0ca71cdd5b1d$var$l(W), W === m) {
            w.push(W);
            break;
        }
        null != W && W === document.body && $e3ba0ca71cdd5b1d$var$n(W) && !$e3ba0ca71cdd5b1d$var$n(document.documentElement) || null != W && $e3ba0ca71cdd5b1d$var$n(W, g) && w.push(W);
    }
    const b = null != (s = null == (i = window.visualViewport) ? void 0 : i.width) ? s : innerWidth, H = null != (h = null == (d = window.visualViewport) ? void 0 : d.height) ? h : innerHeight, { scrollX: y, scrollY: M } = window, { height: v, width: E, top: x, right: C, bottom: I, left: R } = e.getBoundingClientRect(), { top: T, right: B, bottom: F, left: V } = ((t)=>{
        const e = window.getComputedStyle(t);
        return {
            top: parseFloat(e.scrollMarginTop) || 0,
            right: parseFloat(e.scrollMarginRight) || 0,
            bottom: parseFloat(e.scrollMarginBottom) || 0,
            left: parseFloat(e.scrollMarginLeft) || 0
        };
    })(e);
    let k = "start" === f || "nearest" === f ? x - T : "end" === f ? I + F : x + v / 2 - T + F, D = "center" === u ? R + E / 2 - V + B : "end" === u ? C + B : R - V;
    const L = [];
    for(let t = 0; t < w.length; t++){
        const e = w[t], { height: n, width: l, top: r, right: i, bottom: s, left: d } = e.getBoundingClientRect();
        if ("if-needed" === c && x >= 0 && R >= 0 && I <= H && C <= b && x >= r && I <= s && R >= d && C <= i) return L;
        const h = getComputedStyle(e), a = parseInt(h.borderLeftWidth, 10), g = parseInt(h.borderTopWidth, 10), p = parseInt(h.borderRightWidth, 10), W = parseInt(h.borderBottomWidth, 10);
        let T = 0, B = 0;
        const F = "offsetWidth" in e ? e.offsetWidth - e.clientWidth - a - p : 0, V = "offsetHeight" in e ? e.offsetHeight - e.clientHeight - g - W : 0, S = "offsetWidth" in e ? 0 === e.offsetWidth ? 0 : l / e.offsetWidth : 0, X = "offsetHeight" in e ? 0 === e.offsetHeight ? 0 : n / e.offsetHeight : 0;
        if (m === e) T = "start" === f ? k : "end" === f ? k - H : "nearest" === f ? $e3ba0ca71cdd5b1d$var$o(M, M + H, H, g, W, M + k, M + k + v, v) : k - H / 2, B = "start" === u ? D : "center" === u ? D - b / 2 : "end" === u ? D - b : $e3ba0ca71cdd5b1d$var$o(y, y + b, b, a, p, y + D, y + D + E, E), T = Math.max(0, T + M), B = Math.max(0, B + y);
        else {
            T = "start" === f ? k - r - g : "end" === f ? k - s + W + V : "nearest" === f ? $e3ba0ca71cdd5b1d$var$o(r, s, n, g, W + V, k, k + v, v) : k - (r + n / 2) + V / 2, B = "start" === u ? D - d - a : "center" === u ? D - (d + l / 2) + F / 2 : "end" === u ? D - i + p + F : $e3ba0ca71cdd5b1d$var$o(d, i, l, a, p + F, D, D + E, E);
            const { scrollLeft: t, scrollTop: h } = e;
            T = 0 === X ? 0 : Math.max(0, Math.min(h + T / X, e.scrollHeight - n / X + V)), B = 0 === S ? 0 : Math.max(0, Math.min(t + B / S, e.scrollWidth - l / S + F)), k += h - T, D += t - B;
        }
        L.push({
            el: e,
            top: T,
            left: B
        });
    }
    return L;
};

});



parcelRegister("3KK1E", function(module, exports) {

$parcel$export(module.exports, "CPText", () => CPText);

var $lAN3N = parcelRequire("lAN3N");

var $63SH6 = parcelRequire("63SH6");

var $4WfNn = parcelRequire("4WfNn");

var $j4Xk5 = parcelRequire("j4Xk5");

var $3lO1D = parcelRequire("3lO1D");
const CPText = ({ name, prop, onChange, editCode, reset })=>{
    const local = (0, $4WfNn.useLocal)({
        value: "",
        codeEditing: false
    });
    (0, $63SH6.useEffect)(()=>{
        if (prop.value) try {
            eval(`local.value = ${prop.valueBuilt}`);
        } catch (e) {}
        else local.value = "";
        local.render();
    }, [
        prop.value,
        prop.valueBuilt
    ]);
    if (local.codeEditing || typeof local.value !== "string" || typeof prop.valueBuilt === "string" && !prop.valueBuilt.trim().startsWith('"')) return /*#__PURE__*/ (0, $lAN3N.jsx)((0, $3lO1D.CPCoded), {
        editCode: ()=>{
            local.codeEditing = true;
            local.render();
            editCode(()=>{
                local.codeEditing = false;
                local.render();
            });
        },
        reset: reset
    });
    return /*#__PURE__*/ (0, $lAN3N.jsxs)((0, $lAN3N.Fragment), {
        children: [
            /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                className: "border-l"
            }),
            /*#__PURE__*/ (0, $lAN3N.jsx)((0, $j4Xk5.AutoHeightTextarea), {
                value: local.value,
                onChange: async (e11)=>{
                    local.value = e11.currentTarget.value;
                    local.render();
                },
                onBlur: ()=>{
                    onChange(`"${local.value}"`);
                },
                onContextMenu: (e11)=>{
                    e11.stopPropagation();
                },
                className: "flex-1 self-stretch font-mono border-2 border-transparent outline-none bg-transparent focus:bg-white focus:border-blue-500 border-slate-300 text-[10px] min-h-[25px] pt-[3px] pl-[3px]",
                spellCheck: false
            })
        ]
    });
};

});


parcelRegister("4KU0E", function(module, exports) {

$parcel$export(module.exports, "CPMaster", () => $1fdd159866d5939e$export$4352c995dfdcef6d);

var $lAN3N = parcelRequire("lAN3N");

var $63SH6 = parcelRequire("63SH6");

var $4WfNn = parcelRequire("4WfNn");

var $bTIRf = parcelRequire("bTIRf");

var $5NYeV = parcelRequire("5NYeV");

var $eoQBx = parcelRequire("eoQBx");

var $6QgH2 = parcelRequire("6QgH2");
const $1fdd159866d5939e$var$popover = {
    name: ""
};
const $1fdd159866d5939e$export$4352c995dfdcef6d = ({ mitem: mitem })=>{
    const p = (0, $4WfNn.useGlobal)((0, $eoQBx.EditorGlobal), "EDITOR");
    const local = (0, $4WfNn.useLocal)({
        id: mitem.get("id") || "",
        ready: false
    });
    (0, $63SH6.useEffect)(()=>{
        const pitem = mitem.toJSON();
        if (pitem.type === "text") {
            if (p.comp && meta?.parent_comp) {
                const nmeta = meta.parent_comp;
                p.item.active = nmeta.item.id;
                p.item.activeOriginalId = nmeta.item.id;
                if (nmeta.item.originalId) p.item.activeOriginalId = nmeta.item.originalId;
                localStorage.setItem("prasi-item-active-oid", p.item.activeOriginalId);
                localStorage.setItem("prasi-item-active-id", p.item.active);
            }
            if (document.activeElement) document.activeElement.blur();
            local.id = p.item.active;
            p.compProp.edit = true;
            p.render();
        } else if (local.id !== mitem.get("id")) {
            p.compProp.edit = false;
            p.render();
        }
    }, [
        mitem
    ]);
    if (!p.comp) return /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
        className: "flex flex-col flex-1 p-3",
        children: "No Active Component"
    });
    const meta = p.treeMeta[p.comp.instance_id || ""];
    if (!meta) return /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
        className: "flex flex-col flex-1 p-3",
        children: "Meta Not Found"
    });
    if (!meta.comp) return /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
        className: "flex flex-col flex-1 p-3",
        children: "Meta Component Not Found"
    });
    if (!meta.comp.mcomp) return /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
        className: "flex flex-col flex-1 p-3",
        children: "MComponent Not Found"
    });
    const mprops = meta.comp.mcomp.get("component")?.get("props");
    if (!mprops) return /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
        className: "flex flex-col flex-1 p-3",
        children: "MProps Not Found"
    });
    const props = mprops.toJSON();
    return /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
        className: "flex flex-col flex-1",
        children: [
            /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                className: "border-b py-1 bg-white flex justify-between items-center",
                children: [
                    /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                        className: "flex items-center",
                        children: [
                            /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                                className: "text-[11px] cursor-pointer select-none text-slate-400 pl-1 flex items-center",
                                onClick: ()=>{
                                    if (p.compProp.backToInstance) {
                                        p.compProp.backToInstance = false;
                                        (0, $5NYeV.closeEditComp)(p);
                                    }
                                    p.compProp.edit = false;
                                    p.render();
                                },
                                children: [
                                    /*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
                                        xmlns: "http://www.w3.org/2000/svg",
                                        width: "11",
                                        height: "11",
                                        viewBox: "0 0 32 32",
                                        children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                                            fill: "currentColor",
                                            d: "M10 16L20 6l1.4 1.4-8.6 8.6 8.6 8.6L20 26z"
                                        })
                                    }),
                                    /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                        children: "Back"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                className: "flex cursor-pointer items-center border border-slate-500 bg-white rounded-sm text-[10px] px-[5px] m-1 opacity-50 hover:opacity-100",
                                onClick: ()=>{
                                    if (mprops) {
                                        let idx = "";
                                        let name = "prop";
                                        while(mprops?.get(name)){
                                            idx = idx === "" ? 1 : idx + 1;
                                            name = `prop_${idx}`;
                                        }
                                        mprops.set(name, (0, $6QgH2.newMap)({
                                            idx: Object.keys(mprops.toJSON()).length + 1,
                                            name: name,
                                            type: "string",
                                            value: '"hello"',
                                            valueBuilt: '"hello"',
                                            meta: {
                                                type: "text"
                                            }
                                        }));
                                    }
                                },
                                children: "Add"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0, $lAN3N.jsx)($1fdd159866d5939e$export$9c6393e7aa57d12b, {})
                ]
            }),
            /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                className: "flex-1 relative overflow-y-auto",
                children: /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                    className: "absolute flex-col inset-0",
                    children: [
                        Object.entries(props).sort((a, b)=>{
                            return a[1].idx - b[1].idx;
                        }).map(([name, prop])=>{
                            const mprop = mprops?.get(name);
                            if (mprop) return /*#__PURE__*/ (0, $lAN3N.jsx)($1fdd159866d5939e$var$SingleProp, {
                                p: p,
                                name: name,
                                prop: prop,
                                props: props,
                                mprop: mprop
                            }, name);
                            return /*#__PURE__*/ (0, $lAN3N.jsx)((0, $lAN3N.Fragment), {});
                        }),
                        /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                            className: "p-2 flex items-center justify-center space-x-2",
                            children: [
                                /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                    className: "bg-white border rounded px-3 text-xs cursor-pointer hover:bg-blue-100 active:bg-blue-500 active:text-white",
                                    onClick: ()=>{
                                        if (p.comp?.id) {
                                            const props = p.comps.doc[p.comp.id].getMap("map").get("content_tree")?.get("component")?.get("props")?.toJSON();
                                            const str = JSON.stringify(props) + `_prasiprop`;
                                            navigator.clipboard.writeText(str);
                                        }
                                    },
                                    children: "Copy All"
                                }),
                                /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                    className: "bg-white border rounded px-3 text-xs cursor-pointer hover:bg-blue-100 active:bg-blue-500 active:text-white",
                                    onClick: async ()=>{
                                        if (p.comp?.id) {
                                            const props = p.comps.doc[p.comp.id].getMap("map").get("content_tree")?.get("component")?.get("props");
                                            let cp = await navigator.clipboard.readText();
                                            if (cp.endsWith("_prasiprop") && props) {
                                                const cprops = JSON.parse(cp.substring(0, cp.length - `_prasiprop`.length));
                                                props.doc?.transact(()=>{
                                                    for (const [k, v] of Object.entries(cprops)){
                                                        const prop = (0, $6QgH2.newMap)({
                                                            ...v,
                                                            name: k
                                                        });
                                                        props?.set(k, prop);
                                                    }
                                                });
                                            }
                                        }
                                    },
                                    children: "Paste"
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    });
};
const $1fdd159866d5939e$export$9c6393e7aa57d12b = ()=>{
    return /*#__PURE__*/ (0, $lAN3N.jsx)((0, $lAN3N.Fragment), {});
// const p = useGlobal(EditorGlobal, "EDITOR");
// return (
//   <div
//     className="flex text-xs space-x-1 mr-1 cursor-pointer hover:text-blue-500 items-center"
//     onClick={() => {
//       p.compProp.inherit = !p.compProp.inherit;
//       p.render();
//     }}
//   >
//     <div>
//       {p.compProp.inherit ? <>Prop Inherited</> : <>No Inheritance</>}
//     </div>
//     <div>
//       {!p.compProp.inherit ? (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="20"
//           height="20"
//           viewBox="0 0 24 24"
//         >
//           <path
//             fill="currentColor"
//             d="M8 7a5 5 0 000 10h8a5 5 0 000-10H8zm0-2h8a7 7 0 110 14H8A7 7 0 118 5zm0 10a3 3 0 110-6 3 3 0 010 6z"
//           ></path>
//         </svg>
//       ) : (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="20"
//           height="20"
//           viewBox="0 0 24 24"
//         >
//           <path
//             fill="currentColor"
//             d="M8 5h8a7 7 0 110 14H8A7 7 0 118 5zm8 10a3 3 0 100-6 3 3 0 000 6z"
//           ></path>
//         </svg>
//       )}
//     </div>
//   </div>
// );
};
const $1fdd159866d5939e$var$SingleProp = ({ p: p, name: name, prop: prop, mprop: mprop, props: props })=>{
    const local = (0, $4WfNn.useLocal)({
        name: name
    });
    const type = prop.meta?.type || "text";
    return /*#__PURE__*/ (0, $lAN3N.jsx)($1fdd159866d5939e$var$SinglePopover, {
        name: name,
        p: p,
        prop: prop,
        mprop: mprop,
        local: local,
        props: props,
        children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
            className: cx("border-b bg-white cursor-pointer hover:bg-orange-50 flex flex-col items-stretch"),
            children: /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                className: "flex justify-between items-stretch flex-wrap",
                children: [
                    /*#__PURE__*/ (0, $lAN3N.jsx)("input", {
                        className: "outline-none border-r p-1 w-[30px] text-center",
                        value: prop.idx,
                        onClick: (e)=>{
                            e.stopPropagation();
                            e.currentTarget.select();
                        },
                        onFocus: (e)=>{
                            e.stopPropagation();
                            e.currentTarget.select();
                        },
                        onChange: (e)=>{
                            prop.idx = parseInt(e.currentTarget.value) || 0;
                            local.render();
                        },
                        onBlur: (e)=>{
                            mprop.set("idx", parseInt(e.currentTarget.value));
                        }
                    }),
                    /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                        className: "p-1 flex flex-1 border-r justify-between items-center",
                        onClick: ()=>{
                            $1fdd159866d5939e$var$popover.name = name;
                            local.render();
                        },
                        children: [
                            /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                children: name
                            }),
                            /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                className: "text-slate-500 text-xs",
                                children: {
                                    option: "OPT",
                                    text: "TXT",
                                    "content-element": "JSX"
                                }[type]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                        className: "flex p-1 hover:bg-red-500 hover:text-white items-center justify-center cursor-pointer",
                        onClick: (e)=>{
                            e.preventDefault();
                            e.stopPropagation();
                            if (confirm("Are you sure ?")) {
                                const parent = mprop.parent;
                                parent.forEach((m, idx)=>{
                                    if (mprop === m) parent.delete(idx);
                                });
                            }
                        },
                        children: /*#__PURE__*/ (0, $lAN3N.jsx)($1fdd159866d5939e$var$Trash, {})
                    })
                ]
            })
        })
    });
};
const $1fdd159866d5939e$var$SinglePopover = ({ p: p, name: name, prop: prop, mprop: mprop, children: children, local: local, props: props })=>{
    const type = prop.meta?.type || "text";
    const mmeta = mprop.get("meta");
    const meta = prop.meta;
    if (!mmeta || !meta) return null;
    const args = {};
    for (const [k, v] of Object.entries(props))try {
        if (v.valueBuilt || v.value) {
            const fn = new Function(`return ${v.valueBuilt || v.value}`);
            args[k] = fn();
        }
    } catch (e) {}
    const createEditScript = (mode)=>{
        return ()=>{
            p.script.active = true;
            p.script.prop = {
                mode: mode,
                name: local.name
            };
            p.script.onClose = ()=>{
                let i = 0;
                p.compProp.edit = true;
                $1fdd159866d5939e$var$popover.name = name;
                p.render();
                const ival = setInterval(()=>{
                    i++;
                    if (i > 10) clearInterval(ival);
                    p.compProp.edit = true;
                    $1fdd159866d5939e$var$popover.name = name;
                    p.render();
                }, 50);
            };
            p.render();
        };
    };
    return /*#__PURE__*/ (0, $lAN3N.jsx)((0, $bTIRf.Popover), {
        children: children,
        autoFocus: false,
        backdrop: false,
        placement: "left-start",
        open: $1fdd159866d5939e$var$popover.name === name,
        popoverClassName: "bg-white shadow-lg border border-slate-300",
        onOpenChange: (open)=>{
            if (!open) setTimeout(()=>{
                $1fdd159866d5939e$var$popover.name = "";
                local.render();
            }, 100);
            else {
                $1fdd159866d5939e$var$popover.name = name;
                local.render();
            }
        },
        content: /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
            className: cx("flex text-sm flex-col items-stretch space-y-1 py-1 w-[300px]", css`
              textarea {
                max-height: 300px;
              }
            `),
            children: [
                /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                    className: "px-2 py-1 flex space-x-1",
                    children: [
                        {
                            label: "TXT",
                            type: "text"
                        },
                        {
                            label: "OPT",
                            type: "option"
                        },
                        {
                            label: "JSX",
                            type: "content-element"
                        }
                    ].map((e)=>{
                        return /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                            className: cx(type === e.type ? "bg-blue-500 text-white" : "hover:bg-blue-100", " px-2 cursor-pointer"),
                            onClick: ()=>{
                                mmeta.set("type", e.type);
                            },
                            children: e.label
                        }, e.type);
                    })
                }),
                /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                    className: "border-t border-slate-300 px-2 pt-2 pb-1 flex flex-col items-stretch",
                    children: [
                        /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                            className: "uppercase text-xs text-slate-500",
                            children: "Name"
                        }),
                        /*#__PURE__*/ (0, $lAN3N.jsx)("input", {
                            spellCheck: false,
                            type: "text",
                            className: "p-1 outline-none border focus:border-blue-500",
                            value: local.name,
                            onChange: (e)=>{
                                local.name = e.currentTarget.value.toLowerCase().replace(/\W/gi, "_");
                                local.render();
                            },
                            onBlur: ()=>{
                                if (local.name !== name) {
                                    const keys = Object.keys(mprop.parent?.toJSON());
                                    if ([
                                        ...keys,
                                        ...$1fdd159866d5939e$var$keywords
                                    ].includes(local.name)) {
                                        alert(`Cannot use "${local.name}" as name`);
                                        local.name = name;
                                        local.render();
                                        return;
                                    }
                                    mprop.doc?.transact(()=>{
                                        const parent = mprop.parent;
                                        parent.set(local.name, parent.get(name)?.clone());
                                        parent.delete(name);
                                    });
                                    $1fdd159866d5939e$var$popover.name = local.name;
                                    local.render();
                                }
                            },
                            onKeyDown: (e)=>{
                                if (e.key === "Enter") e.currentTarget.blur();
                            }
                        })
                    ]
                }),
                type === "content-element" && /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                    className: "border-t border-slate-300 pl-2 pt-1 flex justify-between items-center",
                    children: [
                        /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                            className: "uppercase text-xs label self-stretch flex items-center",
                            children: "Visible"
                        }),
                        /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                            className: "m-1 px-1 bg-white cursor-pointer hover:bg-blue-500 hover:text-white hover:border-blue-500 font-mono border border-slate-300 text-[11px]",
                            onClick: createEditScript("master-visible"),
                            children: "EDIT CODE"
                        })
                    ]
                }),
                type !== "content-element" && /*#__PURE__*/ (0, $lAN3N.jsxs)((0, $lAN3N.Fragment), {
                    children: [
                        /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                            className: cx("border-t border-slate-300 pl-2 flex justify-between items-center", css`
                    margin-bottom: -0.25rem !important;

                    > .label {
                      padding-top: 0.75rem;
                      padding-bottom: 0.75rem;
                    }
                  `),
                            children: [
                                /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                    className: "uppercase text-xs label self-stretch flex items-center",
                                    children: "Generator"
                                }),
                                /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                    className: "m-1 px-1 bg-white cursor-pointer hover:bg-blue-500 hover:text-white hover:border-blue-500 font-mono border border-slate-300 text-[11px] flex ",
                                    onClick: createEditScript("master-gen"),
                                    children: "EDIT CODE"
                                }),
                                /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                    className: " border-l border-slate-300 mr-2 self-stretch"
                                }),
                                /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                    className: "uppercase text-xs label self-stretch flex items-center",
                                    children: "Visible"
                                }),
                                /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                    className: "m-1 px-1 bg-white cursor-pointer hover:bg-blue-500 hover:text-white hover:border-blue-500 font-mono border border-slate-300 text-[11px]",
                                    onClick: createEditScript("master-visible"),
                                    children: "EDIT CODE"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                            className: "border-t border-slate-300 pl-2 pt-1 flex justify-between items-center",
                            children: [
                                /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                    className: "uppercase text-xs",
                                    children: "VALUE"
                                }),
                                /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                    className: "m-1 px-1 bg-white cursor-pointer hover:bg-blue-500 hover:text-white hover:border-blue-500 font-mono border border-slate-300 text-[11px]",
                                    onClick: createEditScript("master-value"),
                                    children: "EDIT CODE"
                                })
                            ]
                        })
                    ]
                }),
                type === "option" && /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                    className: "border-t border-slate-300 pl-2 pt-1 flex justify-between items-center select-none",
                    children: [
                        /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                            className: "uppercase text-xs",
                            children: "MODE"
                        }),
                        /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                            className: "flex pr-1",
                            children: [
                                "button",
                                "dropdown"
                            ].map((e)=>/*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                    onClick: ()=>{
                                        const meta = mprop.get("meta");
                                        if (meta) meta.set("option_mode", e);
                                    },
                                    className: cx("m-1 px-1 capitalize text-center cursor-pointer  font-mono border border-slate-300 text-[11px]", e === prop.meta?.option_mode || e === "button" && !prop.meta?.option_mode ? "bg-blue-500 text-white" : `hover:bg-blue-500 hover:text-white bg-white hover:border-blue-500`),
                                    children: e
                                }, e))
                        })
                    ]
                }),
                type === "option" && /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                    className: "border-t border-slate-300 pl-2 pt-1 flex justify-between items-center",
                    children: [
                        /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                            className: "uppercase text-xs",
                            children: "OPTIONS"
                        }),
                        /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                            className: "m-1 px-1 bg-white cursor-pointer hover:bg-blue-500 hover:text-white hover:border-blue-500 font-mono border border-slate-300 text-[11px]",
                            onClick: createEditScript("master-option"),
                            children: "EDIT CODE"
                        })
                    ]
                })
            ]
        })
    });
};
const $1fdd159866d5939e$var$Trash = ()=>/*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: 13,
        height: 13,
        fill: "none",
        viewBox: "0 0 15 15",
        children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
            fill: "currentColor",
            fillRule: "evenodd",
            d: "M5.5 1a.5.5 0 000 1h4a.5.5 0 000-1h-4zM3 3.5a.5.5 0 01.5-.5h8a.5.5 0 010 1H11v8a1 1 0 01-1 1H5a1 1 0 01-1-1V4h-.5a.5.5 0 01-.5-.5zM5 4h5v8H5V4z",
            clipRule: "evenodd"
        })
    });
const $1fdd159866d5939e$var$keywords = [
    "await",
    "break",
    "case",
    "catch",
    "class",
    "const",
    "continue",
    "debugger",
    "default",
    "delete",
    "do",
    "else",
    "enum",
    "export",
    "extends",
    "false",
    "finally",
    "for",
    "function",
    "if",
    "implements",
    "import",
    "in",
    "instanceof",
    "interface",
    "let",
    "new",
    "null",
    "package",
    "private",
    "protected",
    "public",
    "return",
    "super",
    "switch",
    "static",
    "this",
    "throw",
    "try",
    "true",
    "typeof",
    "var",
    "void",
    "while",
    "with",
    "yield"
];

});

parcelRegister("bhjA3", function(module, exports) {

$parcel$export(module.exports, "SideBox", () => $60c778b4666a80eb$export$262f8351f69854f4);

var $lAN3N = parcelRequire("lAN3N");
const $60c778b4666a80eb$export$262f8351f69854f4 = ({ children: children })=>{
    return /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
        className: "flex flex-col pb-2 px-2 space-y-2",
        children: children
    });
};

});

parcelRegister("9ABAk", function(module, exports) {

$parcel$export(module.exports, "SideLabel", () => $9ef92df658de1c26$export$2bf247a0a1771b67);

var $lAN3N = parcelRequire("lAN3N");
const $9ef92df658de1c26$export$2bf247a0a1771b67 = ({ children: children, sep: sep })=>{
    return /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
        className: cx(sep === "bottom" ? "border-b border-b-slate-300 bg-white mb-1" : "border-t border-t-slate-300"),
        children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
            className: "text-[10px] select-none text-slate-400 pl-2 py-1",
            children: children
        })
    });
};

});


})();
//# sourceMappingURL=Side.fa071797.js.map
