(() => {

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

      var $parcel$global = globalThis;
    var parcelRequire = $parcel$global["parcelRequire2d1f"];
var parcelRegister = parcelRequire.register;
parcelRegister("aEVUc", function(module, exports) {

$parcel$export(module.exports, "PageManager", () => $b3e177ed79272c22$export$b47b1e333f1bf2a6);

var $lAN3N = parcelRequire("lAN3N");

var $9qryY = parcelRequire("9qryY");

var $63SH6 = parcelRequire("63SH6");

var $4WfNn = parcelRequire("4WfNn");

var $1CiVi = parcelRequire("1CiVi");

var $eoQBx = parcelRequire("eoQBx");

var $9YAmW = parcelRequire("9YAmW");
const $b3e177ed79272c22$var$data = {
    all: [],
    folder: {},
    pages: []
};
const $b3e177ed79272c22$var$w = window;
const $b3e177ed79272c22$export$b47b1e333f1bf2a6 = ()=>{
    const p = (0, $4WfNn.useGlobal)((0, $eoQBx.EditorGlobal), "EDITOR");
    const local = (0, $4WfNn.useLocal)({
        page: {
            folder_id: "",
            data: null
        },
        editPageID: "",
        editFolderID: "",
        loading: false,
        newFolder: {
            parentID: "",
            name: ""
        },
        searchRef: null,
        init: false,
        scrollRef: null,
        initScrolled: false
    });
    (0, $63SH6.useEffect)(()=>{
        const f = (e)=>{
            if (e.key === "Escape" && document.activeElement?.tagName.toLowerCase() === "input") {
                $b3e177ed79272c22$var$w.pageManagerSearch = "";
                local.render();
            }
            if (local.searchRef && !local.page.data && document.activeElement?.tagName.toLowerCase() !== "input") {
                $b3e177ed79272c22$var$w.pageManagerSearch = "";
                local.render();
                local.searchRef.focus();
            }
        };
        window.addEventListener("keydown", f);
        return ()=>{
            window.removeEventListener("keydown", f);
        };
    }, []);
    const reloadPages = async ()=>{
        if (local.loading) return true;
        local.loading = true;
        local.render();
        const folders = await db.page_folder.findMany({
            where: {
                id_site: p.site.id,
                is_deleted: false
            }
        });
        if (folders) {
            $b3e177ed79272c22$var$data.folder = {};
            for (const f of folders)$b3e177ed79272c22$var$data.folder[f.id] = {
                ...f
            };
            $b3e177ed79272c22$var$data.all = await db.page.findMany({
                where: {
                    id_site: p.site.id,
                    is_deleted: false
                },
                select: {
                    id: true,
                    name: true,
                    url: true,
                    id_site: true,
                    is_default_layout: true,
                    id_folder: true
                }
            });
        }
        local.loading = false;
        local.render();
    };
    if (!Array.isArray($b3e177ed79272c22$var$data.all)) $b3e177ed79272c22$var$data.all = [];
    if ($b3e177ed79272c22$var$data.all.length === 0) reloadPages();
    if (!local.init && !local.loading) {
        $b3e177ed79272c22$var$data.pages = [
            {
                id: "ROOT",
                parent: "",
                text: "Pages",
                droppable: true
            }
        ];
        const folders = new Set();
        for (const page of $b3e177ed79272c22$var$data.all){
            const fid = page.id_folder || "-";
            const folder = $b3e177ed79272c22$var$data.folder[fid];
            if ($b3e177ed79272c22$var$w.pageManagerSearch && !(page.name + page.url).toLowerCase().includes($b3e177ed79272c22$var$w.pageManagerSearch.toLowerCase())) continue;
            let parent = folder?.id || "ROOT";
            if ($b3e177ed79272c22$var$w.pageManagerSearch) parent = "ROOT";
            $b3e177ed79272c22$var$data.pages.push({
                id: page.id,
                parent: parent,
                text: page.name,
                data: {
                    content: {},
                    ...page
                },
                droppable: false
            });
        }
        if (!$b3e177ed79272c22$var$w.pageManagerSearch) {
            for (const folder of Object.values($b3e177ed79272c22$var$data.folder))if (!folders.has(folder.id)) {
                folders.add(folder.id);
                $b3e177ed79272c22$var$data.pages.push({
                    id: folder.id,
                    parent: folder.parent_id || "ROOT",
                    text: folder.name || "",
                    data: {
                        content: {}
                    },
                    droppable: true
                });
            }
        }
        if (local.newFolder.parentID) $b3e177ed79272c22$var$data.pages.push({
            id: "F-NEW-FOLDER",
            parent: local.newFolder.parentID,
            text: "",
            droppable: true
        });
    }
    const rawexpanded = localStorage.getItem("prasi-page-expand");
    let expanded = [
        "ROOT"
    ];
    if (rawexpanded) expanded = JSON.parse(rawexpanded);
    return /*#__PURE__*/ (0, $lAN3N.jsxs)((0, $lAN3N.Fragment), {
        children: [
            /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                className: "fixed  inset-0 bg-black bg-opacity-10 cursor-pointer",
                onClick: ()=>{
                    p.manager.page = false;
                    p.render();
                }
            }),
            /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                className: "fixed inset-[50px] bg-white shadow-2xl",
                children: [
                    local.loading ? /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                        className: "flex w-full h-full items-center justify-center",
                        children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $1CiVi.Loading), {
                            note: "page-mgr",
                            backdrop: false
                        })
                    }) : /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                        ref: (el)=>{
                            local.scrollRef = el;
                        },
                        className: cx("relative w-full h-full flex items-stretch", css`
                contain: content;
                overflow: auto;

                > ul {
                  width: 100%;
                  contain: content;
                  overflow: auto;
                }

                .row {
                  display: flex;
                  flex-direction: column;
                  align-items: stretch;
                }

                .dropping {
                  background: #efefff;
                }
              `),
                        children: [
                            /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                className: "fixed top-0 right-[20px] bg-white z-10 m-[8px]",
                                children: /*#__PURE__*/ (0, $lAN3N.jsx)("input", {
                                    type: "search",
                                    value: $b3e177ed79272c22$var$w.pageManagerSearch || "",
                                    onChange: (e)=>{
                                        $b3e177ed79272c22$var$w.pageManagerSearch = e.currentTarget.value;
                                        local.render();
                                    },
                                    ref: (el)=>{
                                        local.searchRef = el;
                                    },
                                    placeholder: "Search",
                                    className: "border  px-2 text-sm h-[26px] outline-none w-[150px] focus:border-blue-500 focus:w-[350px] transition-all"
                                })
                            }),
                            /*#__PURE__*/ (0, $lAN3N.jsx)((0, $9qryY.DndProvider), {
                                backend: (0, $9qryY.MultiBackend),
                                options: (0, $9qryY.getBackendOptions)(),
                                children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $9qryY.Tree), {
                                    tree: $b3e177ed79272c22$var$data.pages,
                                    dragPreviewRender: ()=>/*#__PURE__*/ (0, $lAN3N.jsx)((0, $lAN3N.Fragment), {}),
                                    rootId: "",
                                    onDrop: async (newTree, opt)=>{
                                        local.init = true;
                                        $b3e177ed79272c22$var$data.pages = newTree;
                                        local.render();
                                        if (!opt.dragSource?.droppable) await db.page.update({
                                            where: {
                                                id: opt.dragSourceId
                                            },
                                            data: {
                                                id_folder: opt.dropTargetId === "ROOT" || !opt.dropTargetId ? null : opt.dropTargetId
                                            },
                                            select: {
                                                id: true
                                            }
                                        });
                                        else await db.page_folder.update({
                                            where: {
                                                id: opt.dragSourceId
                                            },
                                            data: {
                                                parent_id: opt.dropTargetId === "ROOT" || !opt.dropTargetId ? null : opt.dropTargetId
                                            },
                                            select: {
                                                id: true
                                            }
                                        });
                                        reloadPages();
                                    },
                                    initialOpen: expanded,
                                    classes: {
                                        listItem: "row",
                                        dropTarget: "dropping"
                                    },
                                    onChangeOpen: (ids)=>{
                                        localStorage.setItem("prasi-page-expand", JSON.stringify(ids));
                                    },
                                    render: (node, { depth: depth, isOpen: isOpen, onToggle: onToggle, hasChild: hasChild })=>/*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                                            ref: (el)=>{
                                                if (el && !local.initScrolled && params.page_id === node.data?.id) {
                                                    local.initScrolled = true;
                                                    el.scrollIntoView({
                                                        behavior: "instant",
                                                        block: "center"
                                                    });
                                                }
                                            },
                                            className: cx("flex items-center text-[14px] h-[30px] border-b border-l", "hover:bg-blue-50 cursor-pointer transition-all", params.page_id === node.data?.id && " active border-l-4 border-l-blue-600 bg-blue-100", css`
                        .btn {
                          display: none;
                        }

                        &:hover .btn {
                          display: flex;
                        }
                      `),
                                            style: {
                                                marginInlineStart: depth * 10
                                            },
                                            onClick: ()=>{
                                                if (node.droppable) onToggle();
                                                else {
                                                    const page = node.data;
                                                    if (page && page.id) {
                                                        p.manager.page = false;
                                                        navigate(`/editor/${page.id_site}/${page.id}`);
                                                    }
                                                }
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                                                    className: "w-[20px] flex items-center justify-center",
                                                    children: [
                                                        node.droppable && /*#__PURE__*/ (0, $lAN3N.jsxs)((0, $lAN3N.Fragment), {
                                                            children: [
                                                                isOpen && /*#__PURE__*/ (0, $lAN3N.jsx)($b3e177ed79272c22$var$FolderOpen, {}),
                                                                !isOpen && /*#__PURE__*/ (0, $lAN3N.jsx)($b3e177ed79272c22$var$FolderClose, {})
                                                            ]
                                                        }),
                                                        !node.droppable && /*#__PURE__*/ (0, $lAN3N.jsx)($b3e177ed79272c22$var$Elbow, {})
                                                    ]
                                                }),
                                                local.editFolderID === node.id ? /*#__PURE__*/ (0, $lAN3N.jsx)("input", {
                                                    type: "text",
                                                    value: local.newFolder.name || "",
                                                    autoFocus: true,
                                                    onClick: (e)=>{
                                                        e.stopPropagation();
                                                    },
                                                    className: "text-sm flex-1 self-stretch my-[3px] px-2",
                                                    onBlur: async ()=>{
                                                        local.editFolderID = "";
                                                        if (local.newFolder.parentID) {
                                                            if (local.newFolder.name) {
                                                                const firstPage = $b3e177ed79272c22$var$data.all[0];
                                                                local.loading = true;
                                                                local.render();
                                                                await db.page_folder.create({
                                                                    data: {
                                                                        id_site: firstPage.id_site,
                                                                        name: local.newFolder.name,
                                                                        parent_id: local.newFolder.parentID === "ROOT" || !local.newFolder.parentID ? null : local.newFolder.parentID
                                                                    }
                                                                });
                                                                local.loading = false;
                                                                await reloadPages();
                                                                local.loading = false;
                                                                local.init = false;
                                                                local.render();
                                                            }
                                                        } else {
                                                            node.text = local.newFolder.name;
                                                            local.loading = true;
                                                            local.render();
                                                            await db.page_folder.update({
                                                                data: {
                                                                    name: local.newFolder.name
                                                                },
                                                                where: {
                                                                    id: node.id
                                                                },
                                                                select: {
                                                                    id: true
                                                                }
                                                            });
                                                            local.loading = false;
                                                            await reloadPages();
                                                            local.init = false;
                                                            local.render();
                                                        }
                                                        local.newFolder.name = "";
                                                        local.newFolder.parentID = "";
                                                        local.render();
                                                    },
                                                    onFocus: (e)=>{
                                                        e.currentTarget.select();
                                                    },
                                                    onKeyDown: (e)=>{
                                                        if (e.key === "Enter") e.currentTarget.blur();
                                                    },
                                                    onChange: (e)=>{
                                                        local.newFolder.name = e.currentTarget.value;
                                                        local.render();
                                                    }
                                                }) : /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                                                    className: "flex-1 flex items-stretch",
                                                    children: [
                                                        /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                                            className: "pr-5 flex items-center",
                                                            children: node.text.startsWith("layout:") ? /*#__PURE__*/ (0, $lAN3N.jsxs)((0, $lAN3N.Fragment), {
                                                                children: [
                                                                    /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                                                        className: "bg-green-700 text-white text-[10px] px-2 mr-1",
                                                                        children: "LAYOUT"
                                                                    }),
                                                                    /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                                                        children: node.text.substring(7)
                                                                    })
                                                                ]
                                                            }) : node.text
                                                        }),
                                                        /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                                                            className: cx("flex flex-1 items-stretch space-x-1 pr-[20px] justify-end"),
                                                            children: [
                                                                node.id !== "ROOT" && /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                                                    onClick: (e)=>{
                                                                        e.stopPropagation();
                                                                        if (node.droppable) {
                                                                            local.init = false;
                                                                            local.editFolderID = node.id;
                                                                            local.render();
                                                                        } else {
                                                                            local.page.data = node.data;
                                                                            local.render();
                                                                        }
                                                                    },
                                                                    className: "btn w-[25px] border rounded-sm flex justify-center items-center text-slate-500 hover:text-blue-700 hover:border-blue-600 bg-white",
                                                                    children: /*#__PURE__*/ (0, $lAN3N.jsx)($b3e177ed79272c22$var$EditIcon, {})
                                                                }),
                                                                node.droppable && /*#__PURE__*/ (0, $lAN3N.jsxs)((0, $lAN3N.Fragment), {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                                                            onClick: (e)=>{
                                                                                e.stopPropagation();
                                                                                if (!isOpen) onToggle();
                                                                                local.init = false;
                                                                                local.editFolderID = "F-NEW-FOLDER";
                                                                                local.newFolder.parentID = node.id;
                                                                                local.render();
                                                                            },
                                                                            className: "btn px-2 text-xs border rounded-sm flex justify-center items-center text-slate-500 hover:text-blue-700 hover:border-blue-600 bg-white",
                                                                            children: /*#__PURE__*/ (0, $lAN3N.jsx)("span", {
                                                                                children: " + Folder"
                                                                            })
                                                                        }),
                                                                        /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                                                            onClick: (e)=>{
                                                                                e.stopPropagation();
                                                                                if (!isOpen) onToggle();
                                                                                local.init = false;
                                                                                local.page.data = {
                                                                                    id_site: p.site.id,
                                                                                    id_folder: node.id
                                                                                };
                                                                                local.page.folder_id = node.id;
                                                                                local.render();
                                                                            },
                                                                            className: "btn px-2 text-xs border rounded-sm flex justify-center items-center text-slate-500 hover:text-blue-700 hover:border-blue-600 bg-white",
                                                                            children: /*#__PURE__*/ (0, $lAN3N.jsx)("span", {
                                                                                children: " + Page"
                                                                            })
                                                                        })
                                                                    ]
                                                                }),
                                                                !node.droppable && /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                                                    onClick: async (e)=>{
                                                                        e.stopPropagation();
                                                                        if (confirm("Clone page ?")) {
                                                                            local.loading = true;
                                                                            local.render();
                                                                            const page = await db.page.findFirst({
                                                                                where: {
                                                                                    id: node.id
                                                                                }
                                                                            });
                                                                            delete page.id;
                                                                            page.name = `${page.name} [Cloned]`;
                                                                            page.url = `${page.url}-cloned`;
                                                                            await db.page.create({
                                                                                data: page
                                                                            });
                                                                            local.page.data = null;
                                                                            $b3e177ed79272c22$var$data.all = [];
                                                                            local.loading = false;
                                                                            await reloadPages();
                                                                            local.init = false;
                                                                            local.render();
                                                                        }
                                                                    },
                                                                    className: "btn w-[25px] text-xs border rounded-sm flex justify-center items-center text-slate-500 hover:text-blue-700 hover:border-blue-600 bg-white",
                                                                    children: /*#__PURE__*/ (0, $lAN3N.jsx)($b3e177ed79272c22$var$CopyIcon, {})
                                                                }),
                                                                (node.droppable && !hasChild || !node.droppable && $b3e177ed79272c22$var$data.all.length > 1) && /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                                                    onClick: async (e)=>{
                                                                        e.stopPropagation();
                                                                        if (confirm("Deletting cannot be undone. Are you sure ?")) {
                                                                            if (node.droppable) {
                                                                                local.init = false;
                                                                                delete $b3e177ed79272c22$var$data.folder[node.id];
                                                                                local.render();
                                                                                db.page_folder.update({
                                                                                    where: {
                                                                                        id: node.id
                                                                                    },
                                                                                    data: {
                                                                                        is_deleted: true
                                                                                    }
                                                                                });
                                                                            } else {
                                                                                local.loading = true;
                                                                                local.render();
                                                                                await db.page.update({
                                                                                    where: {
                                                                                        id: node.id
                                                                                    },
                                                                                    data: {
                                                                                        is_deleted: true
                                                                                    }
                                                                                });
                                                                                local.page.data = null;
                                                                                $b3e177ed79272c22$var$data.all = [];
                                                                                local.loading = false;
                                                                                await reloadPages();
                                                                                local.init = false;
                                                                                local.render();
                                                                            }
                                                                        }
                                                                    },
                                                                    className: "btn w-[25px] text-xs border rounded-sm flex justify-center items-center text-slate-500 hover:text-blue-700 hover:border-blue-600 bg-white",
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
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                                    className: "flex-1",
                                                    children: node.data?.url
                                                })
                                            ]
                                        })
                                })
                            })
                        ]
                    }),
                    local.page.data && /*#__PURE__*/ (0, $lAN3N.jsx)((0, $9YAmW.PageForm), {
                        onClose: ()=>{
                            local.page.data = null;
                            local.render();
                        },
                        onSave: async (res, isNew)=>{
                            if (isNew) {
                                p.manager.page = false;
                                location.href = `/editor/${p.site.id}/${res.id}`;
                            } else {
                                local.page.data = null;
                                $b3e177ed79272c22$var$data.all = [];
                                local.loading = false;
                                await reloadPages();
                                local.init = false;
                                local.render();
                            }
                        },
                        page: local.page.data
                    })
                ]
            })
        ]
    });
};
const $b3e177ed79272c22$var$EditIcon = ()=>/*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: "12",
        height: "12",
        fill: "none",
        viewBox: "0 0 15 15",
        children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
            fill: "currentColor",
            fillRule: "evenodd",
            d: "M12.146 1.146a.5.5 0 01.707 0l2 2a.5.5 0 010 .708l-3.942 3.942a1 1 0 01-.26.188L6.724 9.947a.5.5 0 01-.671-.67l1.963-3.928a1 1 0 01.188-.26l3.942-3.943zm.354 1.061l-3.59 3.59-1.037 2.076.254.254 2.077-1.038L13.793 3.5 12.5 2.207zM10 2L9 3H4.9c-.428 0-.72 0-.944.019-.22.018-.332.05-.41.09a1 1 0 00-.437.437c-.04.078-.072.19-.09.41C3 4.18 3 4.472 3 4.9v6.2c0 .428 0 .72.019.944.018.22.05.332.09.41a1 1 0 00.437.437c.078.04.19.072.41.09.225.019.516.019.944.019h6.2c.428 0 .72 0 .944-.019.22-.018.332-.05.41-.09a1 1 0 00.437-.437c.04-.078.072-.19.09-.41.019-.225.019-.516.019-.944V7l1-1V11.12c0 .403 0 .735-.022 1.006-.023.281-.072.54-.196.782a2 2 0 01-.874.874c-.243.124-.501.173-.782.196-.27.022-.603.022-1.005.022H4.88c-.403 0-.735 0-1.006-.022-.281-.023-.54-.072-.782-.196a2 2 0 01-.874-.874c-.124-.243-.173-.501-.196-.782C2 11.856 2 11.523 2 11.12V4.88c0-.403 0-.735.022-1.006.023-.281.072-.54.196-.782a2 2 0 01.874-.874c.243-.124.501-.173.782-.196C4.144 2 4.477 2 4.88 2H10z",
            clipRule: "evenodd"
        })
    });
const $b3e177ed79272c22$var$Elbow = ()=>/*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: 10,
        height: 10,
        className: cx(css`
        opacity: 0.3;
      `),
        fill: "none",
        viewBox: "0 0 15 15",
        children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
            fill: "currentColor",
            fillRule: "evenodd",
            d: "M9.877 12H11.5a.5.5 0 000-1H9.9c-1.128 0-1.945 0-2.586-.053-.637-.052-1.057-.152-1.403-.329a3.5 3.5 0 01-1.53-1.529c-.176-.346-.276-.766-.328-1.403C4 7.045 4 6.228 4 5.1V3.5a.5.5 0 00-1 0v1.623c0 1.1 0 1.958.056 2.645.057.698.175 1.265.434 1.775a4.5 4.5 0 001.967 1.966c.51.26 1.077.378 1.775.435C7.92 12 8.776 12 9.877 12z",
            clipRule: "evenodd"
        })
    });
const $b3e177ed79272c22$var$FolderClose = ()=>/*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
        fill: "currentColor",
        viewBox: "0 0 20 20",
        strokeWidth: 1,
        width: 13,
        height: 13,
        xmlns: "http://www.w3.org/2000/svg",
        "aria-hidden": "true",
        children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
            d: "M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
        })
    });
const $b3e177ed79272c22$var$FolderOpen = ()=>/*#__PURE__*/ (0, $lAN3N.jsxs)("svg", {
        fill: "currentColor",
        strokeWidth: 1,
        width: 13,
        height: 13,
        viewBox: "0 0 20 20",
        xmlns: "http://www.w3.org/2000/svg",
        "aria-hidden": "true",
        children: [
            /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                clipRule: "evenodd",
                fillRule: "evenodd",
                d: "M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
            }),
            /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                d: "M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z"
            })
        ]
    });
const $b3e177ed79272c22$var$CopyIcon = ()=>/*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
        width: 15,
        height: 15,
        viewBox: "0 0 15 15",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
            d: "M1 9.50006C1 10.3285 1.67157 11.0001 2.5 11.0001H4L4 10.0001H2.5C2.22386 10.0001 2 9.7762 2 9.50006L2 2.50006C2 2.22392 2.22386 2.00006 2.5 2.00006L9.5 2.00006C9.77614 2.00006 10 2.22392 10 2.50006V4.00002H5.5C4.67158 4.00002 4 4.67159 4 5.50002V12.5C4 13.3284 4.67158 14 5.5 14H12.5C13.3284 14 14 13.3284 14 12.5V5.50002C14 4.67159 13.3284 4.00002 12.5 4.00002H11V2.50006C11 1.67163 10.3284 1.00006 9.5 1.00006H2.5C1.67157 1.00006 1 1.67163 1 2.50006V9.50006ZM5 5.50002C5 5.22388 5.22386 5.00002 5.5 5.00002H12.5C12.7761 5.00002 13 5.22388 13 5.50002V12.5C13 12.7762 12.7761 13 12.5 13H5.5C5.22386 13 5 12.7762 5 12.5V5.50002Z",
            fill: "currentColor",
            fillRule: "evenodd",
            clipRule: "evenodd"
        })
    });

});
parcelRegister("9YAmW", function(module, exports) {

$parcel$export(module.exports, "PageForm", () => $7d93764d655759cc$export$3f7302d050ef7e9d);

var $lAN3N = parcelRequire("lAN3N");

var $4WfNn = parcelRequire("4WfNn");

var $eoQBx = parcelRequire("eoQBx");

var $74hjU = parcelRequire("74hjU");

var $15ZgL = parcelRequire("15ZgL");
const $7d93764d655759cc$export$3f7302d050ef7e9d = ({ page: page, onClose: onClose, onSave: onSave })=>{
    const p = (0, $4WfNn.useGlobal)((0, $eoQBx.EditorGlobal), "EDITOR");
    const local = (0, $4WfNn.useLocal)({
        init: false,
        saving: false,
        fillUrl: false,
        preventClose: false
    });
    const form = (0, $4WfNn.useLocal)({});
    if (!local.init) {
        local.init = true;
        for (const [k, v] of Object.entries(page))form[k] = v;
    }
    return /*#__PURE__*/ (0, $lAN3N.jsx)((0, $lAN3N.Fragment), {
        children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
            className: "absolute cursor-pointer inset-0 flex items-center justify-center backdrop-blur cursor-pointer hover:backdrop-blur-sm transition-all",
            onPointerUp: ()=>{
                if (!local.preventClose) onClose();
                local.preventClose = false;
                local.render();
            },
            children: /*#__PURE__*/ (0, $lAN3N.jsxs)("form", {
                onPointerDown: (e)=>{
                    e.stopPropagation();
                    local.preventClose = true;
                    local.render();
                },
                onPointerUp: (e)=>{
                    e.stopPropagation();
                    local.preventClose = false;
                    local.render();
                },
                onSubmit: async (e)=>{
                    e.preventDefault();
                    if (form.name && p.session) {
                        if (!form.name.startsWith("layout:")) form.is_default_layout = false;
                        local.saving = true;
                        local.render();
                        let id_folder = form.id_folder;
                        if (!id_folder || id_folder === "ROOT") id_folder = null;
                        if (!form.id) {
                            const res = await db.page.create({
                                data: {
                                    content_tree: {
                                        childs: [],
                                        id: "root",
                                        type: "root"
                                    },
                                    name: form.name,
                                    url: form.url || "",
                                    id_site: form.id_site || "",
                                    id_folder: id_folder
                                }
                            });
                            onSave(res, true);
                        } else {
                            const res = await db.page.update({
                                data: {
                                    name: form.name,
                                    url: form.url || "",
                                    is_default_layout: form.is_default_layout
                                },
                                where: {
                                    id: form.id
                                }
                            });
                            if (p.mpage && p.page && p.page.id === form.id) p.mpage.transact(()=>{
                                if (p.mpage) {
                                    const page = p.mpage.getMap("map");
                                    if (page) {
                                        page.set("name", form.name);
                                        page.set("url", form.url);
                                    }
                                    onSave(page.toJSON(), false);
                                }
                            });
                            else onSave(res, false);
                        }
                        local.saving = false;
                        local.render();
                    }
                },
                onClick: (e)=>{
                    e.stopPropagation();
                },
                className: cx((0, $74hjU.formStyle), "bg-white shadow-2xl border"),
                children: [
                    /*#__PURE__*/ (0, $lAN3N.jsxs)("label", {
                        children: [
                            /*#__PURE__*/ (0, $lAN3N.jsx)("span", {
                                children: "Name"
                            }),
                            /*#__PURE__*/ (0, $lAN3N.jsx)((0, $15ZgL.Input), {
                                form: form,
                                autoFocus: true,
                                name: "name",
                                onFocus: ()=>{
                                    if (!form.url) {
                                        local.fillUrl = true;
                                        local.render();
                                    }
                                },
                                onChange: (e)=>{
                                    if (local.fillUrl) form.url = `/${e.replace(/\W/g, "/").replace(/\/\/+/g, "/")}`;
                                    form.render();
                                },
                                onBlur: ()=>{
                                    local.fillUrl = false;
                                    local.render();
                                }
                            })
                        ]
                    }),
                    form.name?.startsWith("layout:") ? /*#__PURE__*/ (0, $lAN3N.jsxs)("label", {
                        children: [
                            /*#__PURE__*/ (0, $lAN3N.jsx)("span", {
                                children: "Default Layout"
                            }),
                            /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                                className: "flex space-x-2",
                                children: [
                                    /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                        className: cx("border-[3px] px-4 cursor-pointer select-none border-black", form.is_default_layout && "bg-black text-white "),
                                        onClick: ()=>{
                                            form.is_default_layout = true;
                                            form.render();
                                        },
                                        children: "YES"
                                    }),
                                    /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                        className: cx("border-[3px] px-2 cursor-pointer select-none border-black", !form.is_default_layout && "bg-black text-white"),
                                        onClick: ()=>{
                                            form.is_default_layout = false;
                                            form.render();
                                        },
                                        children: "NO"
                                    })
                                ]
                            })
                        ]
                    }) : /*#__PURE__*/ (0, $lAN3N.jsxs)("label", {
                        children: [
                            /*#__PURE__*/ (0, $lAN3N.jsx)("span", {
                                children: "url"
                            }),
                            /*#__PURE__*/ (0, $lAN3N.jsx)((0, $15ZgL.Input), {
                                form: form,
                                name: "url"
                            })
                        ]
                    }),
                    form.id && /*#__PURE__*/ (0, $lAN3N.jsxs)("label", {
                        children: [
                            /*#__PURE__*/ (0, $lAN3N.jsx)("span", {
                                children: "Page ID:"
                            }),
                            /*#__PURE__*/ (0, $lAN3N.jsx)((0, $15ZgL.Input), {
                                form: form,
                                name: "id",
                                disabled: true
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                        className: "flex",
                        children: [
                            /*#__PURE__*/ (0, $lAN3N.jsx)("button", {
                                type: "submit",
                                disabled: local.saving,
                                className: "flex-1",
                                children: local.saving ? "Saving..." : "Save"
                            }),
                            form.id && /*#__PURE__*/ (0, $lAN3N.jsx)("button", {
                                className: "bg-red-600 w-[40px] flex justify-center items-center",
                                onClick: async ()=>{
                                    if (confirm("Are you sure ?")) {
                                        const res = await db.page.update({
                                            where: {
                                                id: page.id
                                            },
                                            data: {
                                                is_deleted: true
                                            }
                                        });
                                        onSave(res, false);
                                    }
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
        })
    });
};
const $7d93764d655759cc$var$slugify = (...args)=>{
    const value = args.join(" ");
    return value.normalize("NFD") // split an accented letter in the base letter and the acent
    .replace(/[\u0300-\u036f]/g, "") // remove all previously split accents
    .toLowerCase().trim().replace(/[^a-z0-9 ]/g, "") // remove all chars not letters, numbers and spaces (to be replaced)
    .replace(/\s+/g, "/"); // separator
};

});
parcelRegister("74hjU", function(module, exports) {

$parcel$export(module.exports, "formStyle", () => $0dae47b79a3dfc48$export$55e3a752d0357364);
const $0dae47b79a3dfc48$export$55e3a752d0357364 = css`
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

});

parcelRegister("15ZgL", function(module, exports) {

$parcel$export(module.exports, "Input", () => $d2162008c05e10bb$export$f5b8910cec6cf069);

var $lAN3N = parcelRequire("lAN3N");
const $d2162008c05e10bb$export$f5b8910cec6cf069 = (arg)=>{
    const prop = {
        ...arg
    };
    const { form: form, name: name } = arg;
    delete prop.form;
    delete prop.name;
    let onChange = null;
    if (prop.onChange) {
        onChange = prop.onChange;
        delete prop.onChange;
    }
    return /*#__PURE__*/ (0, $lAN3N.jsx)("input", {
        value: form[name] || "",
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
    });
};

});



})();
//# sourceMappingURL=page-mgr.6c081154.js.map
