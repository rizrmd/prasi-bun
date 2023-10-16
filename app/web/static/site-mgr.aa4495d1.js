(() => {

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

      var $parcel$global = globalThis;
    var parcelRequire = $parcel$global["parcelRequire2d1f"];
var parcelRegister = parcelRequire.register;
parcelRegister("4Alzp", function(module, exports) {

$parcel$export(module.exports, "SiteManager", () => $17bd6bb6f6f32008$export$abbad67522397308);

var $lAN3N = parcelRequire("lAN3N");

var $4WfNn = parcelRequire("4WfNn");

var $1CiVi = parcelRequire("1CiVi");

var $eoQBx = parcelRequire("eoQBx");

var $gtAtt = parcelRequire("gtAtt");
const $17bd6bb6f6f32008$export$abbad67522397308 = ()=>{
    const p = (0, $4WfNn.useGlobal)((0, $eoQBx.EditorGlobal), "EDITOR");
    const local = (0, $4WfNn.useLocal)({
        edit: null,
        loading: true,
        sites: [],
        orgs: {},
        active_org: ""
    });
    const reloadSites = async ()=>{
        const orgs = await db.org_user.findMany({
            where: {
                id_user: p.session.data.user.id
            },
            select: {
                org: true
            }
        });
        if (orgs) {
            orgs.push({
                org: {
                    id: "15929f4c-88ea-4094-b487-a06539e822ca",
                    name: "prasi",
                    created_at: null,
                    created_by: null,
                    updated_at: null
                }
            });
            for (const org of orgs)local.orgs[org.org.id] = org.org;
            const sites = await db.site.findMany({
                where: {
                    id_org: {
                        in: Object.keys(local.orgs)
                    },
                    is_deleted: false
                },
                select: {
                    id_org: true,
                    id: true,
                    name: true,
                    responsive: true,
                    domain: true
                }
            });
            local.sites = sites;
        }
        local.loading = false;
        local.render();
    };
    const boxClass = "flex flex-col items-start w-[200px] h-[100px] p-2 text-sm border cursor-pointer hover:bg-blue-100 ml-1 mb-1";
    const site_id = p.site.id;
    if (!local.sites || local.sites && local.sites.length === 0) reloadSites();
    return /*#__PURE__*/ (0, $lAN3N.jsxs)((0, $lAN3N.Fragment), {
        children: [
            /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                className: "fixed inset-0 bg-black bg-opacity-10 cursor-pointer",
                onClick: ()=>{
                    p.manager.site = false;
                    p.render();
                }
            }),
            /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                className: "fixed inset-[50px] bg-white shadow-2xl",
                children: [
                    local.loading ? /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                        className: "flex w-full h-full items-center justify-center",
                        children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $1CiVi.Loading), {
                            note: "site-mgr",
                            backdrop: false
                        })
                    }) : /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                        className: cx("relative w-full h-full pt-1", css`
                contain: content;
                overflow: auto;
              `),
                        children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                            className: "flex flex-col space-y-2",
                            children: Object.values(local.orgs).map((org)=>{
                                return /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                                    className: "flex flex-col",
                                    children: [
                                        /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                            className: "p-1 text-base capitalize",
                                            children: org.name
                                        }),
                                        /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                                            className: "flex items-start flex-wrap",
                                            children: [
                                                (local.sites || []).map((e)=>{
                                                    if (e.id_org !== org.id) return null;
                                                    return /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                                                        className: cx(boxClass, "justify-between transition-all", site_id === e.id && "border-4  border-blue-500", css`
                                .edit {
                                  display: none;
                                }

                                &:hover {
                                  .edit {
                                    display: flex;
                                  }
                                }
                              `),
                                                        onClick: ()=>{
                                                            localStorage.removeItem(`prasi-site-${e.id}`);
                                                            location.href = `/editor/${e.id}`;
                                                        },
                                                        children: [
                                                            /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                                                children: e.name
                                                            }),
                                                            /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                                                className: cx("edit bg-blue-200 hover:bg-blue-500 transition-all px-3 rounded-sm text-sm text-white"),
                                                                onClick: (ev)=>{
                                                                    ev.preventDefault();
                                                                    ev.stopPropagation();
                                                                    local.edit = e;
                                                                    local.render();
                                                                },
                                                                children: "Edit"
                                                            })
                                                        ]
                                                    }, e.id);
                                                }),
                                                /*#__PURE__*/ (0, $lAN3N.jsxs)("div", {
                                                    className: cx(boxClass, "flex flex-col items-center justify-center space-y-1"),
                                                    onClick: (ev)=>{
                                                        ev.preventDefault();
                                                        ev.stopPropagation();
                                                        local.active_org = org.id;
                                                        local.edit = {};
                                                        local.render();
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, $lAN3N.jsx)("svg", {
                                                            className: "text-slate-500",
                                                            xmlns: "http://www.w3.org/2000/svg",
                                                            width: "24",
                                                            height: "24",
                                                            fill: "none",
                                                            viewBox: "0 0 15 15",
                                                            children: /*#__PURE__*/ (0, $lAN3N.jsx)("path", {
                                                                fill: "currentColor",
                                                                fillRule: "evenodd",
                                                                d: "M7.5.877a6.623 6.623 0 100 13.246A6.623 6.623 0 007.5.877zM1.827 7.5a5.673 5.673 0 1111.346 0 5.673 5.673 0 01-11.346 0zM7.5 4a.5.5 0 01.5.5V7h2.5a.5.5 0 110 1H8v2.5a.5.5 0 01-1 0V8H4.5a.5.5 0 010-1H7V4.5a.5.5 0 01.5-.5z",
                                                                clipRule: "evenodd"
                                                            })
                                                        }),
                                                        /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                                                            className: "text-sm text-slate-500",
                                                            children: "Create New Site"
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                }, org.id);
                            })
                        })
                    }),
                    local.edit && /*#__PURE__*/ (0, $lAN3N.jsx)((0, $gtAtt.SiteForm), {
                        onClose: ()=>{
                            local.edit = null;
                            local.active_org = "";
                            local.render();
                        },
                        onSave: async ()=>{
                            local.edit = null;
                            local.render();
                            local.loading = true;
                            local.render();
                            await reloadSites();
                            local.loading = false;
                            local.render();
                        },
                        site: local.edit,
                        group_id: local.active_org
                    })
                ]
            })
        ]
    });
};

});
parcelRegister("gtAtt", function(module, exports) {

$parcel$export(module.exports, "SiteForm", () => $e0bbe5be6fdd18f7$export$81cbb4d9a0168a6a);

var $lAN3N = parcelRequire("lAN3N");

var $4WfNn = parcelRequire("4WfNn");

var $eoQBx = parcelRequire("eoQBx");

var $74hjU = parcelRequire("74hjU");

var $15ZgL = parcelRequire("15ZgL");
const $e0bbe5be6fdd18f7$export$81cbb4d9a0168a6a = ({ site: site, onClose: onClose, onSave: onSave, group_id: group_id })=>{
    const p = (0, $4WfNn.useGlobal)((0, $eoQBx.EditorGlobal), "EDITOR");
    const local = (0, $4WfNn.useLocal)({
        init: false,
        saving: false,
        preventClose: false
    });
    const form = (0, $4WfNn.useLocal)({});
    if (!local.init) {
        local.init = true;
        for (const [k, v] of Object.entries(site))form[k] = v;
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
                        local.saving = true;
                        local.render();
                        if (!form.id) try {
                            await db.site.create({
                                data: {
                                    name: form.name,
                                    favicon: "",
                                    domain: form.domain || "",
                                    id_user: p.session.data.user.id,
                                    id_org: group_id,
                                    responsive: form.responsive
                                }
                            });
                        } catch (e) {
                            alert(e);
                        }
                        else await db.site.update({
                            data: {
                                name: form.name,
                                domain: form.domain,
                                responsive: form.responsive
                            },
                            where: {
                                id: form.id
                            }
                        });
                        onSave();
                    }
                    local.saving = false;
                    local.render();
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
                                onBlur: ()=>{
                                    if (!form.domain) {
                                        form.domain = (form.name || "").toLowerCase().replace(/[^a-z0-9\-_\.]/g, "");
                                        form.render();
                                    }
                                }
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0, $lAN3N.jsxs)("label", {
                        children: [
                            /*#__PURE__*/ (0, $lAN3N.jsx)("span", {
                                children: "Domain"
                            }),
                            /*#__PURE__*/ (0, $lAN3N.jsx)((0, $15ZgL.Input), {
                                form: form,
                                name: "domain",
                                onChange: (text)=>{
                                    return text.replace(/[^a-z0-9\-_\.]/g, "");
                                }
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0, $lAN3N.jsxs)("label", {
                        children: [
                            /*#__PURE__*/ (0, $lAN3N.jsx)("span", {
                                children: "Responsive"
                            }),
                            /*#__PURE__*/ (0, $lAN3N.jsxs)("select", {
                                value: form.responsive,
                                onChange: (e)=>{
                                    form.responsive = e.currentTarget.value;
                                    local.render();
                                },
                                children: [
                                    /*#__PURE__*/ (0, $lAN3N.jsx)("option", {
                                        value: "all",
                                        children: "All"
                                    }),
                                    /*#__PURE__*/ (0, $lAN3N.jsx)("option", {
                                        value: "mobile-only",
                                        children: "Mobile Only"
                                    }),
                                    /*#__PURE__*/ (0, $lAN3N.jsx)("option", {
                                        value: "desktop-only",
                                        children: "Desktop Only"
                                    })
                                ]
                            })
                        ]
                    }),
                    form.id && /*#__PURE__*/ (0, $lAN3N.jsxs)("label", {
                        children: [
                            /*#__PURE__*/ (0, $lAN3N.jsx)("span", {
                                children: "Site ID:"
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
                                    if (confirm("Delete site cannot be undone. Are you sure ?")) {
                                        if (prompt("Please type 'yes' (without quote) to confirm deletion: ")?.toLowerCase() === "yes") {
                                            await db.site.update({
                                                where: {
                                                    id: site.id
                                                },
                                                data: {
                                                    is_deleted: true
                                                }
                                            });
                                            onSave();
                                        }
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
//# sourceMappingURL=site-mgr.aa4495d1.js.map
