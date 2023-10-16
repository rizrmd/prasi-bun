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
parcelRegister("5tPYf", function(module, exports) {

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $cb53ab03e48d7e32$export$2e2bcd8739ae039);

var $lAN3N = parcelRequire("lAN3N");

var $63SH6 = parcelRequire("63SH6");

var $4WfNn = parcelRequire("4WfNn");

var $eoQBx = parcelRequire("eoQBx");

var $1CiVi = parcelRequire("1CiVi");
var $cb53ab03e48d7e32$export$2e2bcd8739ae039 = (0, $4WfNn.page)({
    url: "/editor/**",
    component: ({})=>{
        const p = (0, $4WfNn.useGlobal)((0, $eoQBx.EditorGlobal), "EDITOR");
        const local = (0, $4WfNn.useLocal)({
            loading: true,
            session: null,
            notfound: false,
            init: false
        });
        const site_id = params.site_id === "_" ? "" : params.site_id;
        const page_id = params.page_id === "_" ? "" : params.page_id;
        (0, $63SH6.useEffect)(()=>{
            if (!local.init) (async ()=>{
                let ses = null;
                try {
                    ses = JSON.parse(localStorage.getItem("prasi-session") || "");
                } catch (e) {}
                await new Promise(async (done)=>{
                    try {
                        if (!!ses) done();
                        let e = await api.session();
                        if (!e) {
                            window.redirectTo = location.pathname;
                            navigate("/login");
                            localStorage.removeItem("prasi-session");
                        } else localStorage.setItem("prasi-session", JSON.stringify(e));
                        if (!ses) {
                            ses = e;
                            done();
                        }
                    } catch (e) {
                        console.error(e);
                    }
                });
                if (ses) {
                    local.session = ses;
                    if (!site_id) {
                        const res = await db.site.findFirst({
                            where: {
                                is_deleted: false,
                                org: {
                                    org_user: {
                                        some: {
                                            id_user: ses.data.user.id
                                        }
                                    }
                                }
                            },
                            select: {
                                id: true
                            }
                        });
                        if (res) {
                            const page = await db.page.findFirst({
                                where: {
                                    id_site: res.id,
                                    is_deleted: false
                                },
                                select: {
                                    id: true
                                }
                            });
                            if (page) {
                                local.loading = false;
                                local.render();
                                navigate(`/editor/${res.id}/${page.id}`);
                                return;
                            }
                        } else {
                            local.loading = false;
                            local.render();
                            return;
                        }
                    } else if (!page_id) {
                        let res = await db.page.findFirst({
                            where: {
                                id_site: site_id,
                                is_deleted: false
                            },
                            select: {
                                id: true
                            }
                        });
                        if (!res) res = await db.page.create({
                            data: {
                                content_tree: {
                                    childs: [],
                                    id: "root",
                                    type: "root"
                                },
                                name: "home",
                                url: "/",
                                id_site: site_id
                            }
                        });
                        if (res) {
                            local.loading = false;
                            local.render();
                            navigate(`/editor/${site_id}/${res.id}`);
                            return;
                        }
                    }
                }
                navigate(`/editor/${site_id}/${page_id}`);
            })();
        }, [
            local.init
        ]);
        return /*#__PURE__*/ (0, $lAN3N.jsx)((0, $1CiVi.Loading), {
            note: "base-page"
        });
    }
});

});
parcelRegister("eoQBx", function(module, exports) {

$parcel$export(module.exports, "EditorGlobal", () => $de9a4354d7eb3ed2$export$e6753382eac59df2);

var $9hNJ9 = parcelRequire("9hNJ9");
const $de9a4354d7eb3ed2$export$e6753382eac59df2 = {
    /** ui */ mode: "",
    status: "init",
    focused: "",
    pendingRebuild: false,
    localReloading: {},
    manager: {
        page: false,
        site: false,
        comp: false,
        compActionLabel: "Pick",
        compCallback: (comp)=>{},
        compPreviewRendered: new Set()
    },
    script: {
        siteActive: false,
        siteTypes: {},
        prop: null,
        toolbar: null,
        active: false,
        type: "js",
        db: null,
        api: null,
        onClose: undefined,
        doEdit: null
    },
    item: {
        active: "",
        activeOriginalId: "",
        hover: "",
        sideHover: false,
        selectMode: "single",
        selection: [],
        copy: {
            mode: "single"
        }
    },
    preventTreeScroll: false,
    softRender: {
        tree: ()=>{},
        page: ()=>{},
        side: ()=>{},
        addEl: ()=>{},
        topR: ()=>{},
        all () {
            this.tree();
            this.page();
            this.side();
            this.addEl();
            this.topR();
        }
    },
    /**  read-only */ session: {
        id: "",
        data: {
            user: {
                id: "",
                username: ""
            }
        }
    },
    lsite: null,
    site: {
        id: "",
        api_url: "",
        api_prasi: {
            port: "",
            db: ""
        },
        responsive: "all",
        domain: "",
        name: "",
        js: "",
        js_compiled: ""
    },
    layout: {
        section: null,
        content: null
    },
    site_dts: "",
    page: null,
    /** content tree */ treeFlat: [],
    treeFlatTemp: [],
    treeMeta: {},
    /** components */ comp: null,
    comps: {
        pending: {},
        resolve: {},
        doc: {}
    },
    compProp: {
        backToInstance: false,
        edit: false,
        inherit: true
    },
    compDirectEdit: false,
    compLoading: {},
    compInstance: {},
    /** routing */ pagePreload: {},
    route: (0, $9hNJ9.createRouter)(),
    /** write-only */ mpage: null,
    mpageLoaded: null,
    /** connection */ ws: null,
    wsPing: -1,
    wsPingTs: 0,
    wsPingInterval: null,
    wsRetry: {
        fast: false,
        localIP: false,
        disabled: false,
        reconnecting: false
    },
    ui: {
        loading: null,
        preload: null,
        notfound: null,
        error: null
    }
};

});


})();
//# sourceMappingURL=ed.de27588b.js.map
