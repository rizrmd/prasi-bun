!function(e,t,r,n,i){var s="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},l="function"==typeof s[n]&&s[n],o=l.cache||{},a="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function u(t,r){if(!o[t]){if(!e[t]){var i="function"==typeof s[n]&&s[n];if(!r&&i)return i(t,!0);if(l)return l(t,!0);if(a&&"string"==typeof t)return a(t);var d=Error("Cannot find module '"+t+"'");throw d.code="MODULE_NOT_FOUND",d}f.resolve=function(r){var n=e[t][1][r];return null!=n?n:r},f.cache={};var c=o[t]=new u.Module(t);e[t][0].call(c.exports,f,c,c.exports,this)}return o[t].exports;function f(e){var t=f.resolve(e);return!1===t?{}:u(t)}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=o,u.parent=l,u.register=function(t,r){e[t]=[function(e,t){t.exports=r},{}]},Object.defineProperty(u,"root",{get:function(){return s[n]}}),s[n]=u;for(var d=0;d<t.length;d++)u(t[d])}({cXyXr:[function(e,t,r){e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(r);var n=e("react/jsx-runtime"),i=e("web-utils"),s=e("../../../utils/ui/loading"),l=e("../../../utils/ui/form.style"),o=e("../../../utils/ui/form/input");r.default=(0,i.page)({url:"/login",component:({})=>{let e=(0,i.useLocal)({username:"",password:"",submitting:!1,init:!1},async()=>{let t=await _api.session();if(t&&t.id){let e=window.redirectTo;e?navigate(e):(localStorage.setItem("prasi-session",JSON.stringify(t)),navigate("/ed/"))}else e.init=!0,e.render()});return e.init?(0,n.jsx)("div",{className:"flex flex-1 flex-col items-center justify-center",children:(0,n.jsxs)("form",{onSubmit:async t=>{t.preventDefault(),e.submitting=!0,e.render();let r=await _api.login(e.username,e.password);if("failed"===r.status)e.submitting=!1,e.render(),alert(r.reason);else{let e=window.redirectTo;e?(location.href.includes("localhost")&&e.includes("/editor")&&(e=e.replace("/editor","/ed")),navigate(e)):(location.href.includes("localhost"),navigate("/ed"))}},className:cx("border-[3px] border-black",l.formStyle),children:[(0,n.jsx)("div",{className:"title",children:"Login"}),(0,n.jsxs)("label",{className:"mt-3",children:[(0,n.jsx)("span",{children:"Username"}),(0,n.jsx)(o.Input,{form:e,name:"username"})]}),(0,n.jsxs)("label",{children:[(0,n.jsx)("span",{children:"Password"}),(0,n.jsx)(o.Input,{form:e,name:"password",type:"password"})]}),(0,n.jsx)("button",{type:"submit",disabled:e.submitting,children:e.submitting?"Loading...":"Submit"}),(0,n.jsx)("div",{className:"pt-2",children:(0,n.jsx)("a",{href:"/register",className:"cursor-pointer underline",children:"Register"})})]})}):(0,n.jsx)(s.Loading,{})}})},{"react/jsx-runtime":"QoA3A","web-utils":"1hi6H","../../../utils/ui/loading":"loFlS","../../../utils/ui/form.style":"jUQFK","../../../utils/ui/form/input":"1FhYR","@parcel/transformer-js/src/esmodule-helpers.js":"41Cak"}],jUQFK:[function(e,t,r){var n=e("@parcel/transformer-js/src/esmodule-helpers.js");n.defineInteropFlag(r),n.export(r,"formStyle",()=>i);let i=css`
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
`},{"@parcel/transformer-js/src/esmodule-helpers.js":"41Cak"}],"1FhYR":[function(e,t,r){var n=e("@parcel/transformer-js/src/esmodule-helpers.js");n.defineInteropFlag(r),n.export(r,"Input",()=>s);var i=e("react/jsx-runtime");let s=e=>{let t={...e},{form:r,name:n}=e;delete t.form,delete t.name;let s=null;t.onChange&&(s=t.onChange,delete t.onChange);let l=r[n];return l instanceof URL&&(l=l.toString()),(0,i.jsx)("input",{value:l||"",spellCheck:!1,onInput:e=>{if(r[n]=e.currentTarget.value,s){let t=s(e.currentTarget.value);void 0!==t&&(r[n]=t)}r.render()},...t})}},{"react/jsx-runtime":"QoA3A","@parcel/transformer-js/src/esmodule-helpers.js":"41Cak"}]},[],0,"parcelRequire2d1f");
//# sourceMappingURL=login.050e8010.js.map
