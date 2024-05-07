!function(e,r,t,n,i){var s="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},l="function"==typeof s[n]&&s[n],o=l.cache||{},a="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function u(r,t){if(!o[r]){if(!e[r]){var i="function"==typeof s[n]&&s[n];if(!t&&i)return i(r,!0);if(l)return l(r,!0);if(a&&"string"==typeof r)return a(r);var d=Error("Cannot find module '"+r+"'");throw d.code="MODULE_NOT_FOUND",d}f.resolve=function(t){var n=e[r][1][t];return null!=n?n:t},f.cache={};var c=o[r]=new u.Module(r);e[r][0].call(c.exports,f,c,c.exports,this)}return o[r].exports;function f(e){var r=f.resolve(e);return!1===r?{}:u(r)}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=o,u.parent=l,u.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]},Object.defineProperty(u,"root",{get:function(){return s[n]}}),s[n]=u;for(var d=0;d<r.length;d++)u(r[d])}({cXyXr:[function(e,r,t){e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(t);var n=e("react/jsx-runtime"),i=e("web-utils"),s=e("../../../utils/ui/loading"),l=e("../../../utils/ui/form.style"),o=e("../../../utils/ui/form/input");t.default=(0,i.page)({url:"/login",component:({})=>{let e=(0,i.useLocal)({username:"",password:"",submitting:!1,init:!1},async()=>{let r=await _api.session();if(r&&r.id){let e=window.redirectTo;e?navigate(e):(localStorage.setItem("prasi-session",JSON.stringify(r)),navigate("/ed/"))}else e.init=!0,e.render()});return e.init?(0,n.jsx)("div",{className:"flex flex-1 flex-col items-center justify-center",children:(0,n.jsxs)("form",{onSubmit:async r=>{r.preventDefault(),e.submitting=!0,e.render();let t=await _api.login(e.username,e.password);if("failed"===t.status)e.submitting=!1,e.render(),alert(t.reason);else{let e=window.redirectTo;e?(location.href.includes("localhost")&&e.includes("/editor")&&(e=e.replace("/editor","/ed")),navigate(e)):(location.href.includes("localhost"),navigate("/ed"))}},className:cx("border-[3px] border-black",l.formStyle),children:[(0,n.jsx)("div",{className:"title",children:"Login"}),(0,n.jsxs)("label",{className:"mt-3",children:[(0,n.jsx)("span",{children:"Username"}),(0,n.jsx)(o.Input,{form:e,name:"username"})]}),(0,n.jsxs)("label",{children:[(0,n.jsx)("span",{children:"Password"}),(0,n.jsx)(o.Input,{form:e,name:"password",type:"password"})]}),(0,n.jsx)("button",{type:"submit",disabled:e.submitting,children:e.submitting?"Loading...":"Submit"}),(0,n.jsx)("div",{className:"pt-2",children:(0,n.jsx)("a",{href:"/register",className:"cursor-pointer underline",children:"Register"})})]})}):(0,n.jsx)(s.Loading,{})}})},{"react/jsx-runtime":"16Crh","web-utils":"8vvzC","../../../utils/ui/loading":"loFlS","../../../utils/ui/form.style":"jUQFK","../../../utils/ui/form/input":"1FhYR","@parcel/transformer-js/src/esmodule-helpers.js":"4uUBn"}],jUQFK:[function(e,r,t){var n=e("@parcel/transformer-js/src/esmodule-helpers.js");n.defineInteropFlag(t),n.export(t,"formStyle",()=>i);let i=css`
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
`},{"@parcel/transformer-js/src/esmodule-helpers.js":"4uUBn"}],"1FhYR":[function(e,r,t){var n=e("@parcel/transformer-js/src/esmodule-helpers.js");n.defineInteropFlag(t),n.export(t,"Input",()=>s);var i=e("react/jsx-runtime");let s=e=>{let r={...e},{form:t,name:n}=e;delete r.form,delete r.name;let s=null;r.onChange&&(s=r.onChange,delete r.onChange);let l=t[n];return l instanceof URL&&(l=l.toString()),(0,i.jsx)("input",{value:l||"",spellCheck:!1,onInput:e=>{if(t[n]=e.currentTarget.value,s){let r=s(e.currentTarget.value);void 0!==r&&(t[n]=r)}t.render()},...r})}},{"react/jsx-runtime":"16Crh","@parcel/transformer-js/src/esmodule-helpers.js":"4uUBn"}]},[],0,"parcelRequire2d1f");
//# sourceMappingURL=login.ea2a0c7a.js.map
