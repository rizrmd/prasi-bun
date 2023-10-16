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
parcelRegister("2vHcf", function(module, exports) {

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $e7b12273825edc8d$export$2e2bcd8739ae039);

var $lAN3N = parcelRequire("lAN3N");

var $4WfNn = parcelRequire("4WfNn");

var $1CiVi = parcelRequire("1CiVi");

var $74hjU = parcelRequire("74hjU");

var $15ZgL = parcelRequire("15ZgL");
var $e7b12273825edc8d$export$2e2bcd8739ae039 = (0, $4WfNn.page)({
    url: "/login",
    component: ({})=>{
        const form = (0, $4WfNn.useLocal)({
            username: "",
            password: "",
            submitting: false,
            init: false
        }, async ()=>{
            const s = await api.session();
            if (s && s.id) {
                const rto = window.redirectTo;
                if (rto) navigate(rto);
                else {
                    console.log("navigate to");
                    localStorage.setItem("prasi-session", JSON.stringify(s));
                    navigate("/editor/");
                }
            } else {
                form.init = true;
                form.render();
            }
        });
        if (!form.init) return /*#__PURE__*/ (0, $lAN3N.jsx)((0, $1CiVi.Loading), {});
        return /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
            className: "flex flex-1 flex-col items-center justify-center",
            children: /*#__PURE__*/ (0, $lAN3N.jsxs)("form", {
                onSubmit: async (e)=>{
                    e.preventDefault();
                    form.submitting = true;
                    form.render();
                    const s = await api.login(form.username, form.password);
                    if (s.status === "failed") {
                        form.submitting = false;
                        form.render();
                        alert(s.reason);
                    } else {
                        const rto = window.redirectTo;
                        if (rto) navigate(rto);
                        else navigate("/editor");
                    }
                },
                className: cx("border-[3px] border-black", (0, $74hjU.formStyle)),
                children: [
                    /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                        className: "title",
                        children: "Login"
                    }),
                    /*#__PURE__*/ (0, $lAN3N.jsxs)("label", {
                        className: "mt-3",
                        children: [
                            /*#__PURE__*/ (0, $lAN3N.jsx)("span", {
                                children: "Username"
                            }),
                            /*#__PURE__*/ (0, $lAN3N.jsx)((0, $15ZgL.Input), {
                                form: form,
                                name: "username"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0, $lAN3N.jsxs)("label", {
                        children: [
                            /*#__PURE__*/ (0, $lAN3N.jsx)("span", {
                                children: "Password"
                            }),
                            /*#__PURE__*/ (0, $lAN3N.jsx)((0, $15ZgL.Input), {
                                form: form,
                                name: "password",
                                type: "password"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0, $lAN3N.jsx)("button", {
                        type: "submit",
                        disabled: form.submitting,
                        children: form.submitting ? "Loading..." : "Submit"
                    }),
                    /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                        className: "pt-2",
                        children: /*#__PURE__*/ (0, $lAN3N.jsx)("a", {
                            href: "/register",
                            className: "cursor-pointer underline",
                            children: "Register"
                        })
                    })
                ]
            })
        });
    }
});

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
//# sourceMappingURL=login.116f51a6.js.map
