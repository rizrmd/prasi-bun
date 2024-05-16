!function(e,r,t,n,s){var i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},l="function"==typeof i[n]&&i[n],a=l.cache||{},o="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function u(r,t){if(!a[r]){if(!e[r]){var s="function"==typeof i[n]&&i[n];if(!t&&s)return s(r,!0);if(l)return l(r,!0);if(o&&"string"==typeof r)return o(r);var d=Error("Cannot find module '"+r+"'");throw d.code="MODULE_NOT_FOUND",d}p.resolve=function(t){var n=e[r][1][t];return null!=n?n:t},p.cache={};var c=a[r]=new u.Module(r);e[r][0].call(c.exports,p,c,c.exports,this)}return a[r].exports;function p(e){var r=p.resolve(e);return!1===r?{}:u(r)}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=a,u.parent=l,u.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]},Object.defineProperty(u,"root",{get:function(){return i[n]}}),i[n]=u;for(var d=0;d<r.length;d++)u(r[d])}({Pi9M3:[function(e,r,t){e("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(t);var n=e("react/jsx-runtime"),s=e("web-utils"),i=e("../../../utils/ui/loading"),l=e("../../../utils/ui/form.style"),a=e("../../../utils/ui/form/input");t.default=(0,s.page)({url:"/register",component:({})=>{let e=(0,s.useLocal)({username:"",password:"",email:"",submitting:!1,init:!1},async()=>{let r=await _api.session();r&&r.id?navigate("/ed"):(e.init=!0,e.render())});return e.init?(0,n.jsx)("div",{className:"flex flex-1 flex-col items-center justify-center",children:(0,n.jsxs)("form",{onSubmit:async r=>{r.preventDefault(),e.submitting=!0,e.render();let t=await _api.register({username:e.username,password:e.password,email:e.email});"failed"===t.status?(e.submitting=!1,e.render(),alert(t.reason)):(await _api.login(e.username,e.password),alert("Registration success!"),navigate("/ed"))},className:cx("border-[3px] border-black",l.formStyle),children:[(0,n.jsx)("div",{className:"title",children:"Register"}),(0,n.jsxs)("label",{className:"mt-3",children:[(0,n.jsx)("span",{children:"Username"}),(0,n.jsx)(a.Input,{form:e,name:"username"})]}),(0,n.jsxs)("label",{children:[(0,n.jsx)("span",{children:"Password"}),(0,n.jsx)(a.Input,{form:e,name:"password",type:"password"})]}),(0,n.jsxs)("label",{children:[(0,n.jsx)("span",{children:"Email"}),(0,n.jsx)(a.Input,{form:e,name:"email"})]}),(0,n.jsx)("button",{type:"submit",disabled:e.submitting,children:e.submitting?"Loading...":"Submit"}),(0,n.jsx)("div",{className:"pt-2",children:(0,n.jsx)("a",{href:"/login",className:"cursor-pointer underline",children:"Login"})})]})}):(0,n.jsx)(i.Loading,{})}})},{"react/jsx-runtime":"QoA3A","web-utils":"1hi6H","../../../utils/ui/loading":"loFlS","../../../utils/ui/form.style":"jUQFK","../../../utils/ui/form/input":"1FhYR","@parcel/transformer-js/src/esmodule-helpers.js":"41Cak"}],jUQFK:[function(e,r,t){var n=e("@parcel/transformer-js/src/esmodule-helpers.js");n.defineInteropFlag(t),n.export(t,"formStyle",()=>s);let s=css`
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
`},{"@parcel/transformer-js/src/esmodule-helpers.js":"41Cak"}],"1FhYR":[function(e,r,t){var n=e("@parcel/transformer-js/src/esmodule-helpers.js");n.defineInteropFlag(t),n.export(t,"Input",()=>i);var s=e("react/jsx-runtime");let i=e=>{let r={...e},{form:t,name:n}=e;delete r.form,delete r.name;let i=null;r.onChange&&(i=r.onChange,delete r.onChange);let l=t[n];return l instanceof URL&&(l=l.toString()),(0,s.jsx)("input",{value:l||"",spellCheck:!1,onInput:e=>{if(t[n]=e.currentTarget.value,i){let r=i(e.currentTarget.value);void 0!==r&&(t[n]=r)}t.render()},...r})}},{"react/jsx-runtime":"QoA3A","@parcel/transformer-js/src/esmodule-helpers.js":"41Cak"}]},[],0,"parcelRequire2d1f");
//# sourceMappingURL=register.6174d758.js.map
