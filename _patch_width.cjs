const fs = require("fs");
const p =
  "C:/Data/prasi/prasi-bun/data/code/2512068e-fd68-44f5-9700-5153ccecf6a5/site/build/chunk-E4HSU74Z.js";
let c = fs.readFileSync(p, "utf8");

const old =
  'canEdit?(0,X.jsxs)("div",{className:"c-pt-2 c-pb-1 c-border-t c-border-gray-100 c-mt-2",children:[(0,X.jsx)("div",{className:"c-text-sm c-font-medium c-text-[#002b5b] c-mb-1",children:"Catatan Verifikasi"}),(0,X.jsx)(ol,{value:String(data.verify_notes||myStatus&&myStatus.verify_notes||""),placeholder:"Tulis catatan verifikasi di sini...",spellCheck:!1,onChange:';

const neu =
  'canEdit?(0,X.jsxs)("div",{className:"c-pt-2 c-pb-1 c-border-t c-border-gray-100 c-mt-2 c-w-full",style:{width:"100%",boxSizing:"border-box"},children:[(0,X.jsx)("div",{className:"c-text-sm c-font-medium c-text-[#002b5b] c-mb-1",children:"Catatan Verifikasi"}),(0,X.jsx)("div",{style:{width:"100%",boxSizing:"border-box"},children:(0,X.jsx)(ol,{minRows:3,style:{width:"100%",maxWidth:"100%",minWidth:"100%",boxSizing:"border-box",display:"block",border:"1px solid #cecece",borderRadius:8,padding:"10px 12px",fontSize:14,lineHeight:"1.4",resize:"vertical",background:"#fff",outline:"none"},value:String(data.verify_notes||myStatus&&myStatus.verify_notes||""),placeholder:"Tulis catatan verifikasi di sini...",spellCheck:!1,onChange:';

if (!c.includes(old)) {
  console.log("OPEN FAIL");
  const j = c.indexOf("canEdit?(0,X.jsxs)");
  console.log("canEdit at", j);
  if (j >= 0) console.log(c.slice(j, j + 280));
  process.exit(1);
}
c = c.replace(old, neu);

const marker = 'minRows:3,style:{width:"100%"';
const ix = c.indexOf(marker);
if (ix < 0) {
  console.log("no minRows");
  process.exit(1);
}
const closeOld = "e.render()}})]}):null";
const j = c.indexOf(closeOld, ix);
if (j < 0) {
  console.log("CLOSE FAIL");
  console.log(c.slice(ix, ix + 400));
  process.exit(1);
}
c = c.slice(0, j) + "e.render()}})})]}):null" + c.slice(j + closeOld.length);
fs.writeFileSync(p, c);
console.log("patched ok", c.length);
