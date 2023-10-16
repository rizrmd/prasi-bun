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
parcelRegister("6Bq5g", function(module, exports) {

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $646b9f4f397e5eb0$export$2e2bcd8739ae039);

var $lAN3N = parcelRequire("lAN3N");

var $4WfNn = parcelRequire("4WfNn");

var $1CiVi = parcelRequire("1CiVi");

var $74hjU = parcelRequire("74hjU");

var $15ZgL = parcelRequire("15ZgL");
var $646b9f4f397e5eb0$export$2e2bcd8739ae039 = (0, $4WfNn.page)({
    url: "/register",
    component: ({})=>{
        const form = (0, $4WfNn.useLocal)({
            username: "",
            password: "",
            email: "",
            submitting: false,
            init: false
        }, async ()=>{
            const s = await api.session();
            if (s && s.id) navigate("/editor");
            else {
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
                    const s = await api.register({
                        username: form.username,
                        password: form.password,
                        email: form.email
                    });
                    if (s.status === "failed") {
                        form.submitting = false;
                        form.render();
                        alert(s.reason);
                    } else navigate("/editor");
                },
                className: cx("border-[3px] border-black", (0, $74hjU.formStyle)),
                children: [
                    /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
                        className: "title",
                        children: "Register"
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
                    /*#__PURE__*/ (0, $lAN3N.jsxs)("label", {
                        children: [
                            /*#__PURE__*/ (0, $lAN3N.jsx)("span", {
                                children: "Email"
                            }),
                            /*#__PURE__*/ (0, $lAN3N.jsx)((0, $15ZgL.Input), {
                                form: form,
                                name: "email"
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
                            href: "/login",
                            className: "cursor-pointer underline",
                            children: "Login"
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
//# sourceMappingURL=register.6da13020.js.map
