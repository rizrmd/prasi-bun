(() => {

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

      var $parcel$global = globalThis;
    var parcelRequire = $parcel$global["parcelRequire2d1f"];
var parcelRegister = parcelRequire.register;
parcelRegister("217yT", function(module, exports) {

$parcel$export(module.exports, "CompManager", () => $9b3c4866e94c1896$export$37754299ffc77cc9);
$parcel$export(module.exports, "ChevronRight", () => $9b3c4866e94c1896$export$6172d85aadfc9b96);
$parcel$export(module.exports, "ChevronDown", () => $9b3c4866e94c1896$export$4e3778eb35f54199);
$parcel$export(module.exports, "ChevronLeft", () => $9b3c4866e94c1896$export$29ab0a58e0457c56);

var $lAN3N = parcelRequire("lAN3N");

var $63SH6 = parcelRequire("63SH6");

var $4WfNn = parcelRequire("4WfNn");

var $dCav9 = parcelRequire("dCav9");

var $1CiVi = parcelRequire("1CiVi");

var $5NYeV = parcelRequire("5NYeV");

var $eoQBx = parcelRequire("eoQBx");

var $ldEjl = parcelRequire("ldEjl");
const $9b3c4866e94c1896$var$w = window;
const $9b3c4866e94c1896$export$37754299ffc77cc9 = ()=>{
    const p = (0, $4WfNn.useGlobal)((0, $eoQBx.EditorGlobal), "EDITOR");
    if (!$9b3c4866e94c1896$var$w.compGroup) $9b3c4866e94c1896$var$w.compGroup = {};
    const local = (0, $4WfNn.useLocal)({
        loading: true,
        group: $9b3c4866e94c1896$var$w.compGroup,
        init: false,
        edit_id: "",
        selected_id: "",
        renaming: {
            id: "",
            text: ""
        },
        site_use: [],
        searchRef: null,
        trash_id: "",
        collapsed: new Set(),
        sharedPopup: false,
        checked: new Set(),
        site_use_loading: false
    });
    (0, $63SH6.useEffect)(()=>{
        const f = (e)=>{
            if (e.key === "Escape" && document.activeElement?.tagName.toLowerCase() === "input") {
                $9b3c4866e94c1896$var$w.compManagerSearch = "";
                local.render();
            }
            if (local.searchRef && document.activeElement?.tagName.toLowerCase() !== "input") {
                local.searchRef.value = "";
                local.searchRef.focus();
            }
        };
        window.addEventListener("keydown", f);
        return ()=>{
            window.removeEventListener("keydown", f);
        };
    }, []);
    const toggleCollapse = (id)=>{
        if (!local.collapsed.has(id)) local.collapsed.add(id);
        else local.collapsed.delete(id);
        local.render();
    };
    const reloadComps = async ()=>{
        if (Object.keys($9b3c4866e94c1896$var$w.compGroup).length > 0) {
            local.loading = false;
            local.group = $9b3c4866e94c1896$var$w.compGroup;
            for (const g of Object.values(local.group))if (g.info.name === "__TRASH__") {
                local.trash_id = g.info.id;
                local.collapsed.add(g.info.id);
            }
            local.render();
            return;
        }
        if (p.site.id) {
            local.loading = true;
            local.site_use = (await db.site_use_comp.findMany({
                where: {
                    id_site: p.site.id
                },
                select: {
                    use_id_site: true
                }
            })).map((e)=>e.use_id_site);
            const group = await db.component_group.findMany({
                where: {
                    component_site: {
                        some: {
                            OR: [
                                {
                                    id_site: p.site.id
                                },
                                ...local.site_use.map((e)=>({
                                        id_site: e,
                                        component_group: {
                                            name: {
                                                not: "__TRASH__"
                                            }
                                        }
                                    }))
                            ]
                        }
                    }
                },
                select: {
                    name: true,
                    id: true,
                    shared: true,
                    component_site: {
                        select: {
                            is_owner: true
                        },
                        where: {
                            id_site: p.site.id
                        }
                    }
                }
            });
            if (group) {
                local.group = {};
                for (const g of group){
                    if (g.name === "__TRASH__") {
                        local.trash_id = g.id;
                        local.collapsed.add(g.id);
                    }
                    local.group[g.id] = {
                        info: g,
                        shared: g.shared,
                        isOwner: !!g.component_site[0]?.is_owner,
                        comps: []
                    };
                }
            }
            const group_ids = Object.keys(local.group);
            if (group_ids.length > 0) {
                const comps = await db.component.findMany({
                    where: {
                        id_component_group: {
                            in: group_ids
                        }
                    },
                    select: {
                        id: true,
                        id_component_group: true,
                        name: true
                    }
                });
                for (const comp of comps){
                    const gid = comp.id_component_group;
                    if (gid && local.group[gid]) local.group[gid].comps.push(comp);
                }
            }
            local.loading = false;
            $9b3c4866e94c1896$var$w.compGroup = local.group;
            local.render();
        }
    };
    if (!local.init) {
        local.init = true;
        reloadComps();
    }
    const boxClass = "flex flex-col items-start w-[192px] p-2 text-sm border cursor-pointer hover:bg-blue-100 ml-1 mb-1";
    let groups = Object.values(local.group).sort((a, b)=>{
        const aname = a.info.name === "__TRASH__" ? "zzzTRASHzzz" : a.info.name;
        const bname = b.info.name === "__TRASH__" ? "zzzTRASHzzz" : b.info.name;
        return aname.localeCompare(bname);
    });
    if ($9b3c4866e94c1896$var$w.compManagerSearch) groups = [
        ...groups
    ].filter((g)=>{
        let count = 0;
        g.comps.forEach((e)=>{
            const name = e.name.toLowerCase();
            const id = e.id.toLowerCase();
            if (name.includes($9b3c4866e94c1896$var$w.compManagerSearch.toLowerCase()) || id.includes($9b3c4866e94c1896$var$w.compManagerSearch.toLowerCase())) {
                count++;
                return true;
            }
            return false;
        });
        return count > 0;
    });
    return /*#__PURE__*/ (0, $lAN3N.jsxs)((0, $lAN3N.Fragment), {
        children: [
            /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                className: "fixed inset-0 bg-black bg-opacity-10 cursor-pointer",
                onClick: ()=>{
                    p.manager.comp = false;
                    p.manager.compCallback = ()=>{};
                    p.render();
                }
            }),
            /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                className: "fixed inset-[50px] bg-white shadow-2xl flex",
                onClick: (e)=>{
                    e.stopPropagation();
                    e.preventDefault();
                },
                children: [
                    local.loading ? /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                        className: "flex w-full h-full items-center justify-center",
                        children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $1CiVi.Loading), {
                            note: "comp-mgr",
                            backdrop: false
                        })
                    }) : /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                        className: cx("relative flex-1 flex", css`
                contain: content;
                overflow: auto;

                .complist {
                  contain: content;
                  overflow: auto;
                }
              `),
                        children: [
                            /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                                className: "fixed top-0 right-[20px] bg-white z-10 m-[8px] flex",
                                children: [
                                    local.checked.size > 0 && /*#__PURE__*/ (0, $lAN3N.jsxs)((0, $lAN3N.Fragment), {
                                        children: [
                                            /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                                className: "border text-xs flex items-center px-2 cursor-pointer mr-1",
                                                onClick: ()=>{
                                                    local.checked.clear();
                                                    p.render();
                                                },
                                                children: "Unselect"
                                            }),
                                            /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                                                className: "bg-red-500 text-white text-xs flex items-center px-2 cursor-pointer mr-1",
                                                onClick: async ()=>{
                                                    if (confirm("Delete component cannot be undone. Are you sure? ")) {
                                                        const totrash = [];
                                                        local.checked.forEach((e)=>{
                                                            const [id, gid] = e.split("|");
                                                            const idx = local.group[gid].comps.findIndex((e)=>e.id === id);
                                                            const comp = local.group[gid].comps[idx];
                                                            if (idx >= 0) {
                                                                if (comp.id_component_group !== local.trash_id) totrash.push(comp.id);
                                                            }
                                                        });
                                                        if (totrash.length > 0) {
                                                            if (!local.trash_id) {
                                                                const res = await db.component_group.create({
                                                                    data: {
                                                                        name: "__TRASH__",
                                                                        component_site: {
                                                                            create: {
                                                                                id_site: p.site?.id || ""
                                                                            }
                                                                        }
                                                                    }
                                                                });
                                                                local.trash_id = res.id;
                                                            }
                                                            if (local.trash_id) {
                                                                await db.component.updateMany({
                                                                    where: {
                                                                        id: {
                                                                            in: totrash
                                                                        }
                                                                    },
                                                                    data: {
                                                                        id_component_group: local.trash_id
                                                                    }
                                                                });
                                                                $9b3c4866e94c1896$var$w.compGroup = {};
                                                                local.checked.clear();
                                                                await reloadComps();
                                                            }
                                                        }
                                                    }
                                                },
                                                children: [
                                                    "Delete ",
                                                    local.checked.size,
                                                    " selected"
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0, $lAN3N.jsx)("input", {
                                        type: "search",
                                        value: $9b3c4866e94c1896$var$w.compManagerSearch || "",
                                        ref: (e)=>{
                                            local.searchRef = e;
                                        },
                                        onChange: (e)=>{
                                            $9b3c4866e94c1896$var$w.compManagerSearch = e.currentTarget.value;
                                            local.render();
                                        },
                                        placeholder: "Search",
                                        className: "border  px-2 text-sm h-[26px] outline-none w-[150px] focus:border-blue-500 focus:w-[350px] transition-all"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                                className: "comp-list flex-1 overflow-auto flex h-full flex-col space-y-2 select-none",
                                children: [
                                    !local.site_use.includes("9e34f31f-4ebd-4630-b61d-597045171ebb") && /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                        className: "flex flex-col self-stretch mx-4 mt-3",
                                        children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                            className: " flex",
                                            children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                                className: "border border-blue-400 text-sm px-3 cursor-pointer hover:bg-blue-200",
                                                onClick: async ()=>{
                                                    local.site_use_loading = true;
                                                    local.render();
                                                    await db.site_use_comp.create({
                                                        data: {
                                                            id_site: p.site.id,
                                                            use_id_site: "9e34f31f-4ebd-4630-b61d-597045171ebb"
                                                        }
                                                    });
                                                    $9b3c4866e94c1896$var$w.compGroup = {};
                                                    await reloadComps();
                                                    local.site_use_loading = false;
                                                    local.render();
                                                },
                                                children: local.site_use_loading ? "Loading..." : "Attach Prasi UI"
                                            })
                                        })
                                    }),
                                    local.site_use.includes("9e34f31f-4ebd-4630-b61d-597045171ebb") && /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                        className: "flex flex-col self-stretch mx-4 mt-3",
                                        children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                            className: " flex",
                                            children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                                className: "border border-slate-400 text-sm px-3 cursor-pointer hover:bg-blue-200",
                                                onClick: async ()=>{
                                                    if (p.site.id) {
                                                        local.site_use_loading = true;
                                                        local.render();
                                                        await db.site_use_comp.delete({
                                                            where: {
                                                                id_site_use_id_site: {
                                                                    id_site: p.site.id,
                                                                    use_id_site: "9e34f31f-4ebd-4630-b61d-597045171ebb"
                                                                }
                                                            }
                                                        });
                                                        $9b3c4866e94c1896$var$w.compGroup = {};
                                                        await reloadComps();
                                                        local.site_use_loading = false;
                                                        local.render();
                                                    }
                                                },
                                                children: local.site_use_loading ? "Loading..." : "Detach Prasi UI"
                                            })
                                        })
                                    }),
                                    groups.map((g)=>{
                                        return /*#__PURE__*/ (0, $lAN3N.jsxs)((0, $63SH6.Fragment), {
                                            children: [
                                                g.info.name === "__TRASH__" && /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                                    className: "flex-1"
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                                                    className: "flex flex-col border-b pt-1 pb-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                                            className: cx("p-1 text-base flex items-center space-x-1", css`
                            .act {
                              display: none;
                            }
                            &:hover {
                              .act {
                                display: flex;
                              }
                            }
                          `, g.info.name === "__TRASH__" && css`
                              .act {
                                display: none !important;
                              }
                            `),
                                                            children: local.renaming.id === g.info.id ? /*#__PURE__*/ (0, $lAN3N.jsx)("input", {
                                                                value: local.renaming.text,
                                                                onChange: (ev)=>{
                                                                    local.renaming.text = ev.currentTarget.value;
                                                                    local.render();
                                                                },
                                                                className: "border px-1 text-sm",
                                                                autoFocus: true,
                                                                spellCheck: false,
                                                                onKeyDown: (e)=>{
                                                                    if (e.key === "Enter") e.currentTarget.blur();
                                                                },
                                                                onFocus: (e)=>{
                                                                    e.currentTarget.select();
                                                                },
                                                                onBlur: (e)=>{
                                                                    g.info.name = e.currentTarget.value;
                                                                    local.renaming.id = "";
                                                                    local.render();
                                                                    db.component_group.update({
                                                                        where: {
                                                                            id: g.info.id
                                                                        },
                                                                        data: {
                                                                            name: g.info.name
                                                                        }
                                                                    });
                                                                }
                                                            }) : /*#__PURE__*/ (0, $lAN3N.jsxs)((0, $lAN3N.Fragment), {
                                                                children: [
                                                                    /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                                                        className: "cursor-pointer",
                                                                        onClick: ()=>toggleCollapse(g.info.id),
                                                                        children: local.collapsed.has(g.info.id) ? /*#__PURE__*/ (0, $lAN3N.jsx)($9b3c4866e94c1896$export$6172d85aadfc9b96, {}) : /*#__PURE__*/ (0, $lAN3N.jsx)($9b3c4866e94c1896$export$4e3778eb35f54199, {})
                                                                    }),
                                                                    /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                                                        className: "cursor-pointer",
                                                                        onClick: ()=>toggleCollapse(g.info.id),
                                                                        children: g.info.name === "__TRASH__" ? /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                                                            className: "text-slate-400 text-xs",
                                                                            children: "Deleted Component"
                                                                        }) : g.info.name
                                                                    }),
                                                                    g.shared && g.isOwner && /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                                                        className: "cursor-pointer border ml-1 border-transparent bg-blue-500 text-white text-xs px-1 hover:bg-blue-100 hover:border-blue-500 hover:text-blue-600 flex items-center h-[20px]",
                                                                        onClick: async ()=>{
                                                                            g.shared = false;
                                                                            db.component_group.update({
                                                                                where: {
                                                                                    id: g.info.id
                                                                                },
                                                                                data: {
                                                                                    shared: g.shared
                                                                                }
                                                                            });
                                                                            local.render();
                                                                        },
                                                                        children: "Public"
                                                                    }),
                                                                    !g.shared && g.isOwner && /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                                                        className: "act cursor-pointer ml-1 border text-xs px-1 hover:bg-blue-100 hover:border-blue-500 hover:text-blue-600 flex items-center h-[20px]",
                                                                        onClick: async ()=>{
                                                                            g.shared = true;
                                                                            db.component_group.update({
                                                                                where: {
                                                                                    id: g.info.id
                                                                                },
                                                                                data: {
                                                                                    shared: g.shared
                                                                                }
                                                                            });
                                                                            local.render();
                                                                        },
                                                                        children: "Share"
                                                                    }),
                                                                    g.isOwner && /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                                                        className: "act cursor-pointer border flex items-center hover:bg-blue-100 hover:border-blue-500 hover:text-blue-600 px-1 h-[20px]",
                                                                        onClick: ()=>{
                                                                            local.renaming.id = g.info.id;
                                                                            local.renaming.text = g.info.name;
                                                                            local.render();
                                                                        },
                                                                        children: /*#__PURE__*/ (0, $lAN3N.jsx)($9b3c4866e94c1896$var$Rename, {})
                                                                    }),
                                                                    /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                                                        className: "act cursor-pointer border text-xs px-1 hover:bg-blue-100 hover:border-blue-500 hover:text-blue-600 flex items-center h-[20px]",
                                                                        onClick: async ()=>{
                                                                            const name = prompt(`New Group Name:`);
                                                                            if (name) {
                                                                                const res = await db.component_group.create({
                                                                                    data: {
                                                                                        component_site: {
                                                                                            create: {
                                                                                                id_site: p.site?.id || ""
                                                                                            }
                                                                                        },
                                                                                        name: name
                                                                                    }
                                                                                });
                                                                                if (res) {
                                                                                    local.group[res.id] = {
                                                                                        comps: [],
                                                                                        shared: false,
                                                                                        isOwner: true,
                                                                                        info: res
                                                                                    };
                                                                                    local.render();
                                                                                }
                                                                            }
                                                                        },
                                                                        children: "New"
                                                                    }),
                                                                    g.comps.length === 0 && /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                                                        className: "act cursor-pointer border text-xs px-1 hover:bg-red-100 hover:border-red-500 hover:text-red-600 flex items-center h-[20px]",
                                                                        onClick: async ()=>{
                                                                            if (confirm("Are you sure ?")) {
                                                                                delete local.group[g.info.id];
                                                                                local.render();
                                                                                await db.component_site.delete({
                                                                                    where: {
                                                                                        id_component_group_id_site: {
                                                                                            id_component_group: g.info.id,
                                                                                            id_site: p.site?.id || ""
                                                                                        }
                                                                                    }
                                                                                });
                                                                            }
                                                                        },
                                                                        children: "Del"
                                                                    })
                                                                ]
                                                            })
                                                        }),
                                                        /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                                            className: cx("flex items-start flex-wrap pl-[10px]", local.collapsed.has(g.info.id) && "hidden"),
                                                            children: g.comps.map((e, idx)=>{
                                                                const name = e.name.toLowerCase();
                                                                const id = e.id.toLowerCase();
                                                                if ($9b3c4866e94c1896$var$w.compManagerSearch && !name.includes($9b3c4866e94c1896$var$w.compManagerSearch.toLowerCase()) && !id.includes($9b3c4866e94c1896$var$w.compManagerSearch.toLowerCase())) return null;
                                                                return /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                                                                    className: cx(boxClass, "justify-between transition-all relative", local.selected_id === e.id ? "border-blue-500 bg-blue-100" : "hover:border-blue-500", css`
                                  .edit {
                                    display: none;
                                  }

                                  &:hover {
                                    .edit {
                                      display: flex;
                                    }
                                    .pick {
                                      opacity: 1;
                                    }
                                  }
                                `),
                                                                    onClick: ()=>{
                                                                        local.selected_id = e.id;
                                                                        local.render();
                                                                    },
                                                                    children: [
                                                                        /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                                                            className: cx("absolute top-0 right-0 flex items-center justify-center w-[20px] h-[20px] border border-r-0 border-t-0", local.checked.has(`${e.id}|${g.info.id}`) ? "bg-blue-500 text-white border-blue-500" : "bg-white hover:border-blue-500"),
                                                                            onClick: (ev)=>{
                                                                                ev.stopPropagation();
                                                                                ev.preventDefault();
                                                                                if (local.checked.has(`${e.id}|${g.info.id}`)) local.checked.delete(`${e.id}|${g.info.id}`);
                                                                                else local.checked.add(`${e.id}|${g.info.id}`);
                                                                                p.render();
                                                                            },
                                                                            children: local.checked.has(`${e.id}|${g.info.id}`) && /*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
                                                                                xmlns: "http://www.w3.org/2000/svg",
                                                                                width: "15",
                                                                                height: "15",
                                                                                fill: "none",
                                                                                viewBox: "0 0 15 15",
                                                                                children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                                                                                    fill: "currentColor",
                                                                                    fillRule: "evenodd",
                                                                                    d: "M11.467 3.727c.289.189.37.576.181.865l-4.25 6.5a.625.625 0 01-.944.12l-2.75-2.5a.625.625 0 01.841-.925l2.208 2.007 3.849-5.886a.625.625 0 01.865-.181z",
                                                                                    clipRule: "evenodd"
                                                                                })
                                                                            })
                                                                        }),
                                                                        /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                                                                            className: "flex flex-col",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                                                                    children: e.name
                                                                                }),
                                                                                /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                                                                    className: "text-slate-400 text-[10px]",
                                                                                    children: e.id
                                                                                })
                                                                            ]
                                                                        }),
                                                                        /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                                                                            className: "flex mt-1 justify-between self-stretch",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                                                                    className: "flex flex-1 justify-between space-x-1 mr-1",
                                                                                    children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                                                                        className: "pick opacity-10 transition-all bg-blue-500 text-white px-2",
                                                                                        onClick: ()=>{
                                                                                            p.manager.comp = false;
                                                                                            if (typeof p.manager.compCallback === "function") {
                                                                                                p.manager.compCallback(e);
                                                                                                p.manager.compCallback = ()=>{};
                                                                                                p.render();
                                                                                            }
                                                                                        },
                                                                                        children: p.manager.compActionLabel
                                                                                    })
                                                                                }),
                                                                                /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                                                                    onClick: (ev)=>{
                                                                                        ev.preventDefault();
                                                                                        ev.stopPropagation();
                                                                                    },
                                                                                    children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $dCav9.Dropdown), {
                                                                                        value: g.info.id,
                                                                                        items: groups.filter((e)=>e.info.name !== "__TRASH__").map((e)=>{
                                                                                            return {
                                                                                                label: e.info.name,
                                                                                                value: e.info.id
                                                                                            };
                                                                                        }),
                                                                                        onChange: (v)=>{
                                                                                            local.group[v].comps.push(e);
                                                                                            g.comps.splice(idx, 1);
                                                                                            local.render();
                                                                                            db.component.update({
                                                                                                where: {
                                                                                                    id: e.id
                                                                                                },
                                                                                                data: {
                                                                                                    id_component_group: v
                                                                                                },
                                                                                                select: {
                                                                                                    id: true
                                                                                                }
                                                                                            });
                                                                                        },
                                                                                        className: "max-w-[30px] overflow-hidden border",
                                                                                        popover: {
                                                                                            className: "text-sm"
                                                                                        }
                                                                                    })
                                                                                })
                                                                            ]
                                                                        })
                                                                    ]
                                                                }, e.id);
                                                            })
                                                        })
                                                    ]
                                                })
                                            ]
                                        }, g.info.id);
                                    })
                                ]
                            })
                        ]
                    }),
                    local.selected_id && /*#__PURE__*/ (0, $lAN3N.jsx)($9b3c4866e94c1896$var$CompPreview, {
                        comp_id: local.selected_id,
                        onClose: ()=>{
                            local.selected_id = "";
                            local.render();
                        },
                        opt: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $lAN3N.Fragment), {
                            children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                className: cx("edit bg-red-200 hover:bg-red-500 transition-all px-3 rounded-sm text-sm text-white cursor-pointer"),
                                onClick: async (ev)=>{
                                    if (confirm("Are you sure ?")) {
                                        if (!local.trash_id) {
                                            const res = await db.component_group.create({
                                                data: {
                                                    name: "__TRASH__",
                                                    component_site: {
                                                        create: {
                                                            id_site: p.site?.id || ""
                                                        }
                                                    }
                                                }
                                            });
                                            local.trash_id = res.id;
                                        }
                                        if (local.trash_id) {
                                            await db.component.update({
                                                where: {
                                                    id: local.selected_id
                                                },
                                                data: {
                                                    id_component_group: local.trash_id
                                                },
                                                select: {
                                                    id: true
                                                }
                                            });
                                            $9b3c4866e94c1896$var$w.compGroup = {};
                                            await reloadComps();
                                        }
                                    }
                                },
                                children: "Delete"
                            })
                        })
                    })
                ]
            })
        ]
    });
};
const $9b3c4866e94c1896$var$CompPreview = ({ comp_id: comp_id, onClose: onClose, opt: opt })=>{
    const local = (0, $4WfNn.useLocal)({
        name: "",
        comp: null
    });
    const p = (0, $4WfNn.useGlobal)((0, $eoQBx.EditorGlobal), "EDITOR");
    const comp = p.comps.doc[comp_id];
    p.manager.compPreviewRendered = new Set();
    if (comp) {
        local.comp = comp.getMap("map").get("content_tree")?.toJSON();
        if (local.comp) local.name = local.comp.name;
    } else (0, $5NYeV.loadComponent)(p, comp_id).then(()=>{
        local.render();
    });
    return /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
        className: "border-l w-[35%] transition-all flex flex-col",
        children: [
            /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                className: "border-b p-2 flex justify-between items-center",
                children: [
                    /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                        className: "flex items-center cursor-pointer",
                        onClick: onClose,
                        children: [
                            /*#__PURE__*/ (0, $lAN3N.jsx)($9b3c4866e94c1896$export$29ab0a58e0457c56, {}),
                            local.name || "Component"
                        ]
                    }),
                    /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                        children: opt
                    })
                ]
            }),
            /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                className: cx("flex flex-1 flex-col relative overflow-auto"),
                children: [
                    !local.comp && /*#__PURE__*/ (0, $lAN3N.jsx)((0, $1CiVi.Loading), {
                        note: "comp-mgr-2",
                        backdrop: false
                    }),
                    /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                        className: cx(css`
              contain: content;
              padding: 20px;
              overflow: auto;
            `, "flex items-center justify-center flex-1 flex-col "),
                        children: local.comp && /*#__PURE__*/ (0, $lAN3N.jsx)((0, $ldEjl.CItem), {
                            item: local.comp,
                            comp_id: local.comp.component?.id || ""
                        })
                    })
                ]
            })
        ]
    });
};
const $9b3c4866e94c1896$var$Rename = ()=>/*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
        width: 12,
        height: 12,
        viewBox: "0 0 15 15",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
            d: "M6.5 1C6.22386 1 6 1.22386 6 1.5C6 1.77614 6.22386 2 6.5 2C7.12671 2 7.45718 2.20028 7.65563 2.47812C7.8781 2.78957 8 3.28837 8 4V11C8 11.7116 7.8781 12.2104 7.65563 12.5219C7.45718 12.7997 7.12671 13 6.5 13C6.22386 13 6 13.2239 6 13.5C6 13.7761 6.22386 14 6.5 14C7.37329 14 8.04282 13.7003 8.46937 13.1031C8.47976 13.0886 8.48997 13.0739 8.5 13.0591C8.51003 13.0739 8.52024 13.0886 8.53063 13.1031C8.95718 13.7003 9.62671 14 10.5 14C10.7761 14 11 13.7761 11 13.5C11 13.2239 10.7761 13 10.5 13C9.87329 13 9.54282 12.7997 9.34437 12.5219C9.1219 12.2104 9 11.7116 9 11V4C9 3.28837 9.1219 2.78957 9.34437 2.47812C9.54282 2.20028 9.87329 2 10.5 2C10.7761 2 11 1.77614 11 1.5C11 1.22386 10.7761 1 10.5 1C9.62671 1 8.95718 1.29972 8.53063 1.89688C8.52024 1.91143 8.51003 1.92611 8.5 1.9409C8.48997 1.92611 8.47976 1.91143 8.46937 1.89688C8.04282 1.29972 7.37329 1 6.5 1ZM14 5H11V4H14C14.5523 4 15 4.44772 15 5V10C15 10.5523 14.5523 11 14 11H11V10H14V5ZM6 4V5H1L1 10H6V11H1C0.447715 11 0 10.5523 0 10V5C0 4.44772 0.447715 4 1 4H6Z",
            fill: "currentColor",
            fillRule: "evenodd",
            clipRule: "evenodd"
        })
    });
const $9b3c4866e94c1896$var$chevronSize = 12;
const $9b3c4866e94c1896$export$6172d85aadfc9b96 = ()=>/*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: $9b3c4866e94c1896$var$chevronSize,
        height: $9b3c4866e94c1896$var$chevronSize,
        fill: "none",
        viewBox: "0 0 15 15",
        children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
            fill: "currentColor",
            fillRule: "evenodd",
            d: "M6.158 3.135a.5.5 0 01.707.023l3.75 4a.5.5 0 010 .684l-3.75 4a.5.5 0 11-.73-.684L9.566 7.5l-3.43-3.658a.5.5 0 01.023-.707z",
            clipRule: "evenodd"
        })
    });
const $9b3c4866e94c1896$export$4e3778eb35f54199 = ()=>/*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: $9b3c4866e94c1896$var$chevronSize,
        height: $9b3c4866e94c1896$var$chevronSize,
        fill: "none",
        viewBox: "0 0 15 15",
        children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
            fill: "currentColor",
            fillRule: "evenodd",
            d: "M3.135 6.158a.5.5 0 01.707-.023L7.5 9.565l3.658-3.43a.5.5 0 01.684.73l-4 3.75a.5.5 0 01-.684 0l-4-3.75a.5.5 0 01-.023-.707z",
            clipRule: "evenodd"
        })
    });
const $9b3c4866e94c1896$export$29ab0a58e0457c56 = ()=>/*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "22",
        height: "22",
        viewBox: "0 0 24 24",
        children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
            fill: "currentColor",
            fillRule: "evenodd",
            d: "M14 18l-6-6 6-6 1.4 1.4-4.6 4.6 4.6 4.6L14 18z"
        })
    });

});
parcelRegister("ldEjl", function(module, exports) {

$parcel$export(module.exports, "CItem", () => $2208644e19f2843b$export$ad589f8a3bb81db9);

var $lAN3N = parcelRequire("lAN3N");

var $4WfNn = parcelRequire("4WfNn");

var $cc0Z8 = parcelRequire("cc0Z8");

var $eoQBx = parcelRequire("eoQBx");

var $1CiVi = parcelRequire("1CiVi");

var $5NYeV = parcelRequire("5NYeV");
const $2208644e19f2843b$export$ad589f8a3bb81db9 = ({ item: item, comp_id: comp_id })=>{
    const p = (0, $4WfNn.useGlobal)((0, $eoQBx.EditorGlobal), "EDITOR");
    const className = (0, $cc0Z8.produceCSS)(item, {
        mode: p.mode
    });
    const local = (0, $4WfNn.useLocal)({});
    if (p.manager.compPreviewRendered.has(item.id)) return null;
    p.manager.compPreviewRendered.add(item.id);
    if (item.component && item.component.id && item.component.id !== comp_id) {
        if (!p.comps.doc[item.component.id] || !!p.comps.pending[item.component.id]) {
            (0, $5NYeV.loadComponent)(p, item.component.id).then(()=>{
                local.render();
            });
            return /*#__PURE__*/ (0, $lAN3N.jsx)((0, $1CiVi.Loading), {
                backdrop: false
            });
        }
        if (p.comps.doc[item.component.id]) {
            const citem = p.comps.doc[item.component.id].getMap("map").get("content_tree")?.toJSON();
            if (citem) return /*#__PURE__*/ (0, $lAN3N.jsx)($2208644e19f2843b$export$ad589f8a3bb81db9, {
                item: citem,
                comp_id: comp_id
            });
        }
    }
    return /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
        className: className,
        children: item.childs.map((e)=>{
            if (e.type === "item") return /*#__PURE__*/ (0, $lAN3N.jsx)($2208644e19f2843b$export$ad589f8a3bb81db9, {
                item: e,
                comp_id: comp_id
            }, e.id);
            const className = (0, $cc0Z8.produceCSS)(e, {
                mode: p.mode
            });
            return /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                className: className,
                dangerouslySetInnerHTML: {
                    __html: e.html
                }
            }, e.id);
        })
    });
};

});


})();
//# sourceMappingURL=comp-mgr.27b10bdd.js.map
