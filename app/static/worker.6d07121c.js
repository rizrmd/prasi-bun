!function(e,t,r,n,l){var s="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},f="function"==typeof s[n]&&s[n],a=f.cache||{},i="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function o(t,r){if(!a[t]){if(!e[t]){var l="function"==typeof s[n]&&s[n];if(!r&&l)return l(t,!0);if(f)return f(t,!0);if(i&&"string"==typeof t)return i(t);var u=Error("Cannot find module '"+t+"'");throw u.code="MODULE_NOT_FOUND",u}h.resolve=function(r){var n=e[t][1][r];return null!=n?n:r},h.cache={};var c=a[t]=new o.Module(t);e[t][0].call(c.exports,h,c,c.exports,this)}return a[t].exports;function h(e){var t=h.resolve(e);return!1===t?{}:o(t)}}o.isParcelRequire=!0,o.Module=function(e){this.id=e,this.bundle=o,this.exports={}},o.modules=e,o.cache=a,o.parent=f,o.register=function(t,r){e[t]=[function(e,t){t.exports=r},{}]},Object.defineProperty(o,"root",{get:function(){return s[n]}}),s[n]=o;for(var u=0;u<t.length;u++)o(t[u]);if(r){var c=o(r);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd&&define(function(){return c})}}({"4IJ4y":[function(e,t,r){var n=e("./fs"),l=e("polywasm/index.min.js");1!==polywasm&&(globalThis.WebAssembly||0===polywasm)||(globalThis.WebAssembly=l.WebAssembly,postMessage({status_:"slow"}));let s=async([e,t])=>{let[r,n,l]=e.split(".").map(e=>+e),s={wasmURL:URL.createObjectURL(new Blob([t],{type:"application/wasm"}))};return(0===r&&(5===n&&l>=20||n>=6&&n<=7||8===n&&l<=34)||(s.worker=!1),esbuild.startService)?await esbuild.startService(s):(await esbuild.initialize(s),esbuild)},f=(e,t,r)=>{if(e.formatMessages)return e.formatMessages(t,r);let n=(e,t,r)=>{let n="note"===e?"   ":"\x1b[1m > ";if(r&&(n+=`${r.file}:${r.line}:${r.column}: `),n+=("error"===e?"\x1b[31merror:\x1b[1m ":"warning"===e?"\x1b[35mwarning:\x1b[1m ":"\x1b[1mnote:\x1b[0m ")+t+"\x1b[0m\n",r){let{line:e,column:t,length:l,lineText:s}=r,f=e.toString().padStart(5);n+=`\x1b[37m${f} \u{2502} ${s.slice(0,t)}\x1b[32m${s.slice(t,t+l)}\x1b[37m${s.slice(t+l)}
${" ".repeat(f.length)} \u{2575} \x1b[32m${" ".repeat(t)}${l>1?"~".repeat(l):"^"}\x1b[0m
`}return n};return Promise.resolve(t.map(e=>{let t=n(r.kind,e.text,e.location);for(let r of e.notes||[])t+=n("note",r.text,r.location);return t+"\n"}))};onmessage=e=>{s(e.data).then(e=>{onmessage=t=>{let r=(t,r)=>{let n=r&&r.errors,l=r&&r.warnings;n||l||(n=[{text:r+""}]),Promise.all([n?f(e,n,{kind:"error",color:o}):[],l?f(e,l,{kind:"warning",color:o}):[]]).then(([e,r])=>{t({stderr_:[...e,...r].join("")})})},l=(e,t)=>{for(let r of e){let e=t.replace(r,"");if(e!==t)t=e;else{let e=r.replace(/\x1B\[[^m]*m/g,"");e!==r&&(t=t.replace(e,""))}}return e.join("")+t},s=(t,r)=>{t.length?f(e,t,{kind:"warning",color:o}).then(e=>r(l(e,n.stderrSinceReset))):r(n.stderrSinceReset)},a=t.data,i=postMessage,o=!0;try{"transform"===a.command_?(!1===a.options_.color&&(o=!1),(0,n.resetFileSystem)({}),e.transform(a.input_,a.options_).then(({code:e,map:t,js:r,jsSourceMap:n,warnings:l,mangleCache:f,legalComments:a})=>s(l,l=>i({code_:e??r,map_:t??n,mangleCache_:f,legalComments_:a,stderr_:l})),e=>r(i,e))):"build"===a.command_&&(!1===a.options_.color&&(o=!1),(0,n.resetFileSystem)(a.input_),e.build(a.options_).then(({warnings:e,outputFiles:t,metafile:r,mangleCache:n})=>s(e,e=>{t&&i({outputFiles_:t.map(({path:e,text:t})=>({path:e,text:t})),metafile_:JSON.stringify(r),mangleCache_:n,stderr_:e})}),e=>r(i,e)))}catch(e){r(i,e)}},postMessage({status_:"success"})}).catch(e=>{console.error(e),postMessage({status_:"failure",error_:e+""})})}},{"./fs":"5YU3o","polywasm/index.min.js":"lqi3O"}],"5YU3o":[function(e,t,r){let n,l;var s=e("@parcel/transformer-js/src/esmodule-helpers.js");s.defineInteropFlag(r),s.export(r,"stderrSinceReset",()=>y),s.export(r,"resetFileSystem",()=>w);class f{constructor(e){let t=0===e.kind_?e.content_.length:0,r=e.mtime_.getTime(),n=e.ctime_.getTime();this.dev=1,this.ino=e.inode_,this.mode=0===e.kind_?32768:16384,this.nlink=1,this.uid=1,this.gid=1,this.rdev=0,this.size=t,this.blksize=4096,this.blocks=t+4095&4095,this.atimeMs=r,this.mtimeMs=r,this.ctimeMs=n,this.birthtimeMs=n,this.atime=e.mtime_,this.mtime=e.mtime_,this.ctime=e.ctime_,this.birthtime=e.ctime_}isDirectory(){return 16384===this.mode}isFile(){return 32768===this.mode}}let a=I("EBADF"),i=I("EINVAL"),o=I("EISDIR"),u=I("ENOENT"),c=I("ENOTDIR"),h=new Map,$=new TextEncoder,F=new TextDecoder,p=3,g=1,y="",d=P();function m(e,t,r,l,s){if(e<=2)2===e?M(t,r,l):n(e,t,r,l,s);else throw i}function x(e,t,r,n,s,f){if(e<=2)l(e,t,r,n,s,f);else{let l=h.get(e);if(l){if(1===l.entry_.kind_)f(o,0,t);else{let e=l.entry_.content_;if(null!==s&&-1!==s){let l=e.slice(s,s+n);t.set(l,r),f(null,l.length,t)}else{let s=e.slice(l.offset_,l.offset_+n);l.offset_+=s.length,t.set(s,r),f(null,s.length,t)}}}else f(a,0,t)}}function b(e){throw Error(JSON.stringify(e)+" cannot be both a file and a directory")}function w(e){for(let t in d.children_.clear(),y="",e){let r=z(_(t)),n=d;for(let e=0;e+1<r.length;e++){let t=r[e],l=n.children_.get(t);l?1!==l.kind_&&b(t):(l=P(),n.children_.set(t,l)),n=l}let l=r[r.length-1];n.children_.has(l)&&b(l),n.children_.set(l,function(e){let t=new Date;return{kind_:0,inode_:g++,ctime_:t,mtime_:t,content_:e}}($.encode(e[t])))}}function P(){let e=new Date;return{kind_:1,inode_:g++,ctime_:e,mtime_:e,children_:new Map}}function _(e){"/"!==e[0]&&(e="/"+e);let t=e.split("/");t.shift();let r=0;for(let e=0;e<t.length;e++){let n=t[e];".."===n?r&&r--:"."!==n&&""!==n&&(t[r++]=n)}return t.length=r,"/"+t.join("/")}function z(e){if("/"===(e=_(e)))return[];let t=e.split("/");return t.shift(),t}function Q(e){let t=z(e),r=d;for(let e=0,n=t.length;e<n;e++){let l=r.children_.get(t[e]);if(!l)throw u;if(0===l.kind_){if(e+1===n)return l;throw c}r=l}return r}function I(e){let t=Error(e);return t.code=e,t}function M(e,t,r){y+=F.decode(0===t&&r===e.length?e:e.slice(t,t+r))}globalThis.fs={get writeSync(){return m},set writeSync(value){n=value},get read(){return x},set read(value){l=value},constants:{O_WRONLY:-1,O_RDWR:-1,O_CREAT:-1,O_TRUNC:-1,O_APPEND:-1,O_EXCL:-1},open(e,t,r,n){try{let t=Q(e),r=p++;h.set(r,{entry_:t,offset_:0}),n(null,r)}catch(e){n(e,null)}},close(e,t){t(h.delete(e)?null:a)},write(e,t,r,l,s,f){e<=2?(2===e?M(t,r,l):n(e,t,r,l,s),f(null,l,t)):f(i,0,t)},readdir(e,t){try{let r=Q(e);if(1!==r.kind_)throw c;t(null,[...r.children_.keys()])}catch(e){t(e,null)}},stat(e,t){try{let r=Q(e);t(null,new f(r))}catch(e){t(e,null)}},lstat(e,t){try{let r=Q(e);t(null,new f(r))}catch(e){t(e,null)}},fstat(e,t){let r=h.get(e);r?t(null,new f(r.entry_)):t(a,null)}}},{"@parcel/transformer-js/src/esmodule-helpers.js":"4uUBn"}],"4uUBn":[function(e,t,r){r.interopDefault=function(e){return e&&e.__esModule?e:{default:e}},r.defineInteropFlag=function(e){Object.defineProperty(e,"__esModule",{value:!0})},r.exportAll=function(e,t){return Object.keys(e).forEach(function(r){"default"===r||"__esModule"===r||Object.prototype.hasOwnProperty.call(t,r)||Object.defineProperty(t,r,{enumerable:!0,get:function(){return e[r]}})}),t},r.export=function(e,t,r){Object.defineProperty(e,t,{enumerable:!0,get:r})}},{}],lqi3O:[function(e,t,r){var n=e("@parcel/transformer-js/src/esmodule-helpers.js");n.defineInteropFlag(r),n.export(r,"WebAssembly",()=>_);var l=[{e:[["$",40,41,42,43,44,45,46,47,48,49,50,51,52,53],[106,"x",[65,"Q"]],"P"],t:["$","x",[-2,"P","Q"]]},{e:[["$",54,55,56,57,58,59,60,61,62],[106,"x",[65,"Q"]],"y","P"],t:["$","x","y",[-2,"P","Q"]]},{e:[60,"x","y","P"],i:{y:[{e:[66,"Q"],t:[58,"x",[65,[-1,"Q"]],"P"]},{e:[["$",48,49,50,51,52,53,41],"z","Q"],t:[58,"x",[45,"z","Q"],"P"]},{e:[["@",172,173],"z"],t:[58,"x","z","P"]}]}},{e:[61,"x","y","P"],i:{y:[{e:[66,"Q"],t:[59,"x",[65,[-1,"Q"]],"P"]},{e:[48,"z","Q"],t:[59,"x",[44,"z","Q"],"P"]},{e:[49,"z","Q"],t:[59,"x",[45,"z","Q"],"P"]},{e:[["$",50,51,52,53,41],"z","Q"],t:[59,"x",[47,"z","Q"],"P"]},{e:[["@",172,173],"z"],t:[59,"x","z","P"]}]}},{e:[62,"x","y","P"],i:{y:[{e:[66,"Q"],t:[54,"x",[65,[-1,"Q"]],"P"]},{e:[48,"z","Q"],t:[54,"x",[44,"z","Q"],"P"]},{e:[49,"z","Q"],t:[54,"x",[45,"z","Q"],"P"]},{e:[50,"z","Q"],t:[54,"x",[46,"z","Q"],"P"]},{e:[51,"z","Q"],t:[54,"x",[47,"z","Q"],"P"]},{e:[["$",52,53,41],"z","Q"],t:[54,"x",[40,"z","Q"],"P"]},{e:[["@",172,173],"z"],t:[54,"x","z","P"]}]}},{e:[80,"x"],i:{x:[{e:[["$",48,49],"y","P"],t:[69,[45,"y","P"]]},{e:[["$",50,51],"y","P"],t:[69,[47,"y","P"]]},{e:[["$",52,53],"y","P"],t:[69,[40,"y","P"]]},{e:[["@",172,173],"y"],t:[69,"y"]}]}},{e:[81,[49,"x","P"],[66,"Q"]],t:[70,[45,"x","P"],[65,[-1,"Q"]]],n:["Q","<=",255n]},{e:[82,[49,"x","P"],[66,"Q"]],t:[71,[45,"x","P"],[65,[-1,"Q"]]],n:["Q","<=",255n]},{e:[81,[51,"x","P"],[66,"Q"]],t:[70,[47,"x","P"],[65,[-1,"Q"]]],n:["Q","<=",65535n]},{e:[82,[51,"x","P"],[66,"Q"]],t:[71,[47,"x","P"],[65,[-1,"Q"]]],n:["Q","<=",65535n]},{e:[81,[53,"x","P"],[66,"Q"]],t:[70,[40,"x","P"],[65,[-1,"Q"]]],n:["Q","<=",4294967295n]},{e:[82,[53,"x","P"],[66,"Q"]],t:[71,[40,"x","P"],[65,[-1,"Q"]]],n:["Q","<=",4294967295n]},{e:[240,"x"],i:{x:[{e:[242,"y"],t:[240,"y"]},{e:[["@",69,80],"x"],t:[241,"y"]}]}},{e:[241,"x"],i:{x:[{e:[242,"y"],t:[241,"y"]},{e:[["@",69,80],"y"],t:[240,"y"]},{e:[70,"y","z"],t:[240,[71,"y","z"]]},{e:[71,"y","z"],t:[240,[70,"y","z"]]},{e:[72,"y","z"],t:[240,[78,"y","z"]]},{e:[73,"y","z"],t:[240,[79,"y","z"]]},{e:[74,"y","z"],t:[240,[76,"y","z"]]},{e:[75,"y","z"],t:[240,[77,"y","z"]]},{e:[76,"y","z"],t:[240,[74,"y","z"]]},{e:[77,"y","z"],t:[240,[75,"y","z"]]},{e:[78,"y","z"],t:[240,[72,"y","z"]]},{e:[79,"y","z"],t:[240,[73,"y","z"]]},{e:[81,"y","z"],t:[240,[82,"y","z"]]},{e:[82,"y","z"],t:[240,[81,"y","z"]]},{e:[83,"y","z"],t:[240,[89,"y","z"]]},{e:[84,"y","z"],t:[240,[90,"y","z"]]},{e:[85,"y","z"],t:[240,[87,"y","z"]]},{e:[86,"y","z"],t:[240,[88,"y","z"]]},{e:[87,"y","z"],t:[240,[85,"y","z"]]},{e:[88,"y","z"],t:[240,[86,"y","z"]]},{e:[89,"y","z"],t:[240,[83,"y","z"]]},{e:[90,"y","z"],t:[240,[84,"y","z"]]}]}},{e:[243,"x"],i:{x:[{e:[40,"y","P"],t:[245,"y","P"]}]}},{e:[244,"x"],i:{x:[{e:[41,"y","P"],t:[246,"y","P"]},{e:[66,"P"],t:[66,"P"],n:["P","<=",0x7fffffffffffffffn]},{e:[["$",49,51,53],"y","P"],t:["$","y","P"]}]}},{e:[167,"x"],i:{x:[{e:[66,"P"],t:[65,[-1,"P"]]},{e:[48,"y","P"],t:[44,"y","P"]},{e:[49,"y","P"],t:[45,"y","P"]},{e:[50,"y","P"],t:[46,"y","P"]},{e:[51,"y","P"],t:[47,"y","P"]},{e:[["$",52,53,41],"y","P"],t:[40,"y","P"]},{e:[["@",172,173],"y"],t:"y"},{e:[124,[["@",172,173],"y"],[66,"P"]],t:[106,"y",[65,[-1,"P"]]]}]}},{e:[131,"x",[66,"P"]],i:{x:[{e:[66,"Q"],t:[66,[-3,"P","Q"]]},{e:[131,"y",[66,"Q"]],t:[131,"y",[66,[-3,"P","Q"]]]},{e:[49,"y","Q"],t:[49,"y","Q"],n:[["P","&",255n],"===",255n]},{e:[48,"y","Q"],t:[49,"y","Q"],n:["P","===",255n]},{e:[51,"y","Q"],t:[51,"y","Q"],n:[["P","&",65535n],"===",65535n]},{e:[50,"y","Q"],t:[51,"y","Q"],n:["P","===",65535n]},{e:[53,"y","Q"],t:[53,"y","Q"],n:[["P","&",4294967295n],"===",4294967295n]},{e:[52,"y","Q"],t:[53,"y","Q"],n:["P","===",4294967295n]}]}}],s=e=>{let t=new DataView(e.buffer),r=()=>{let t=0,r=0,n;do t|=(127&(n=e[z++]))<<r,r+=7;while(128&n)return t>>>0},n=()=>{let t=0,r=0,n;do t|=(127&(n=e[z++]))<<r,r+=7;while(128&n)return r<32&&64&n?t|-1<<r:t},l=()=>{let t=0n,r=0n,n;do t|=BigInt(127&(n=e[z++]))<<r,r+=7n;while(128&n)return r<64&&64&n?t|~0n<<r:t},s=()=>{let e=t.getFloat32(z,!0);return z+=4,e},f=()=>{let e=t.getFloat64(z,!0);return z+=8,e},a=(t=r())=>[...e.slice(z,z+=t)],i=(t=r())=>new TextDecoder().decode(e.slice(z,z+=t)),o=(t=e[z++])=>[r(),0===t?1/0:r()],u=()=>{let t=e[z++],n;if(65===t)n=r();else throw Error("Unsupported constant instruction: 0x"+t.toString(16));if(11!==e[z++])throw Error("Expected end after constant");return n},c=()=>{let t=e[z++],a;if(65===t){let e=n();a=()=>e}else if(66===t){let e=l();a=()=>e}else if(67===t){let e=s();a=()=>e}else if(68===t){let e=f();a=()=>e}else if(35===t){let e=r();a=t=>t[e]}else throw Error("Unsupported constant instruction: 0x"+t.toString(16));if(11!==e[z++])throw Error("Expected end after constant");return a},h=[],$=[],F=[],p=[],g=[],y=[],d=[],m=[],x=[],b=new Map,w=[],P=[],_=-1,z=8;if("0,97,115,109,1,0,0,0"!==e.slice(0,8).join(","))throw Error("Invalid file header");for(;z+5<e.length;){let t=e[z++],l=r(),s=z+l;if(0===t){let t=i();if($.push([t,e.slice(z,s)]),"name"===t){let t=e[z++],l=z+r();if(1===t)for(let e=0,t=n();e<t&&z<l;e++)b.set(r(),i())}}else if(1===t)for(let t=0,n=r();t<n;t++){if(96!==e[z++])throw Error("Invalid function type");P.push([a(),a()])}else if(2===t)for(let t=0,n=r();t<n;t++){let t=i(),n=i(),l=e[z++];if(0===l)m.push([t,n,l,r()]);else if(1===l)m.push([t,n,l,e[z++],...o()]);else if(2===l)m.push([t,n,l,...o()]);else if(3===l)m.push([t,n,l,e[z++],e[z++]]);else throw Error("Unsupported import type: "+l)}else if(3===t){let e=r();for(let t=0;t<e;t++)y.push(r())}else if(4===t)for(let t=0,n=r();t<n;t++)w.push([e[z++],...o()]);else if(5===t)for(let e=0,t=r();e<t;e++)x.push(o());else if(6===t)for(let t=0,n=r();t<n;t++){let t=e[z++],r=e[z++],n=c();d.push([t,r,n])}else if(7===t)for(let t=0,n=r();t<n;t++){let t=i(),n=e[z++],l=r();g.push([t,n,l])}else if(8===t)_=r();else if(9===t)for(let t=0,n=r();t<n;t++){let t=e[z++];if(0===t){let e=u(),t=[];for(let e=0,n=r();e<n;e++)t.push(r());p.push([e,t])}else throw Error("Unsupported element kind: "+t)}else if(10===t)for(let t=0,n=r();t<n;t++){let t=r()+z,n=r(),l=[];for(let t=0;t<n;t++)l.push([r(),e[z++]]);h.push([l,z,t]),z=t}else if(11===t)for(let t=0,n=r();t<n;t++){let t=e[z++],n=2&t?r():0,l=1&t?0:u(),s=r();F.push([n,l,e.slice(z,z+=s)])}else if(12!==t)throw Error("Unsupported section type "+t);z=s}return{b:e,S:t,d:h,Z:$,O:F,I:p,B:g,f:y,T:d,w:m,C:x,A:b,z:_,E:w,m:P}},f=new Map,a=class{constructor(e){f.set(this,s(e instanceof Uint8Array?e:new Uint8Array(e instanceof ArrayBuffer?e:e.buffer)))}},i=(e,t)=>{if(125===t||124===t)return+e;if(127===t)return 0|e;if(126===t)return 0xffffffffffffffffn&BigInt(e);throw Error("Unsupported cast to type "+t)},o=(e,t)=>{if(125===t||124===t)return"+"+e;if(127===t)return e+"|0";if(126===t)return`BigInt(${e})&0xFFFFFFFFFFFFFFFFn`;throw Error("Unsupported cast to type "+t)},u=(e,t)=>{if(124===t||127===t)return e;if(125===t)return`Math.fround(${e})`;if(126===t)return`l.c(${e})`;throw Error("Unsupported cast to type "+t)},c=new Uint16Array(256);c[1]=520,c[26]=521,c[32]=28,c[33]=25,c[34]=29,c[35]=28,c[36]=25,c[40]=61,c[41]=61,c[42]=61,c[43]=61,c[44]=61,c[45]=61,c[46]=61,c[47]=61,c[48]=61,c[49]=61,c[50]=61,c[51]=61,c[52]=61,c[53]=61,c[54]=58,c[55]=58,c[56]=58,c[57]=58,c[58]=58,c[59]=58,c[60]=58,c[61]=58,c[62]=58,c[63]=28,c[64]=29,c[69]=13,c[70]=78,c[71]=78,c[72]=78,c[73]=206,c[74]=78,c[75]=206,c[76]=78,c[77]=206,c[78]=78,c[79]=206,c[80]=13,c[81]=78,c[82]=78,c[83]=334,c[84]=78,c[85]=334,c[86]=78,c[87]=334,c[88]=78,c[89]=334,c[90]=78,c[91]=78,c[92]=78,c[93]=78,c[94]=78,c[95]=78,c[96]=78,c[97]=78,c[98]=78,c[99]=78,c[100]=78,c[101]=78,c[102]=78,c[103]=13,c[104]=13,c[105]=13,c[106]=14,c[107]=14,c[108]=14,c[109]=14,c[110]=142,c[111]=14,c[112]=142,c[113]=14,c[114]=14,c[115]=14,c[116]=14,c[117]=14,c[118]=14,c[119]=14,c[120]=14,c[121]=13,c[122]=13,c[123]=13,c[124]=14,c[125]=14,c[126]=14,c[127]=270,c[128]=14,c[129]=270,c[130]=14,c[131]=14,c[132]=14,c[133]=14,c[134]=1038,c[135]=1038,c[136]=1038,c[137]=1038,c[138]=1038,c[139]=13,c[140]=13,c[141]=13,c[142]=13,c[143]=13,c[144]=13,c[145]=13,c[146]=14,c[147]=14,c[148]=14,c[149]=14,c[150]=14,c[151]=14,c[152]=14,c[153]=13,c[154]=13,c[155]=13,c[156]=13,c[157]=13,c[158]=13,c[159]=13,c[160]=14,c[161]=14,c[162]=14,c[163]=14,c[164]=14,c[165]=14,c[166]=14,c[167]=13,c[168]=13,c[169]=13,c[170]=13,c[171]=13,c[172]=13,c[173]=13,c[174]=13,c[175]=13,c[176]=13,c[177]=13,c[178]=525,c[179]=653,c[180]=269,c[181]=13,c[182]=525,c[183]=525,c[184]=653,c[185]=269,c[186]=13,c[187]=525,c[188]=13,c[189]=13,c[190]=13,c[191]=13,c[192]=13,c[193]=13,c[194]=13,c[195]=13,c[196]=13;var h=new Int32Array(65536),$=(()=>{let e=0,t=()=>"v"+e++,r=(e,l,s,f,a)=>{if(l<s.length){let i=s[l];if("string"==typeof i)o[i]=`${c}[${e}+${l+1}]`,r(e,l+1,s,f,a);else{let o=t(),u=t();y+=`var ${o}=${c}[${e}+${l+1}],${u}=${c}[${o}]&255;`,n(o,u,i,f,t=>{r(e,l+1,s,t,a)})}}else a(f)},n=(e,t,[n,...l],s,f)=>{let a=[];if("number"==typeof n)a.push(`${t}===${n}`);else{let[r,...l]=n;l.sort((e,t)=>e-t),u[r]={u:e,$:t,P:l.some(e=>g.has(e))};for(let e=0;e<l.length;e++){let r=1;for(;e+r<l.length&&l[e+r-1]+1===l[e+r];)r++;a.push(r>2?`${t}>=${l[e]}&&${t}<=${l[e+=r-1]}`:`${t}===${l[e]}`)}}s=s.concat({u:e,F:l.map(e=>"string"==typeof e?e:null)}),y+=`if(${a.join("||")}){`,r(e,0,l,s,f),y+="}"},s=(e,r,l,o,h,$)=>{for(let{e:o,i:p,t:d,n:m}of l)n(e,r,o,h,e=>{let r=Object.create($);f(m,r,()=>{if(p){for(let e in p)a(e,r);for(let n in p){let l=r[n],f=t();y+=`var ${f}=${c}[${l}]&255;`,s(l,f,p[n],null,e,r)}}if(d){let t=i(d,r,e.slice(),`|${c}[${F}]&-16777216`);"string"!=typeof d&&("string"==typeof d[0]?u[d[0]].P:g.has(d[0]))?(F!==t&&(y+=`${F}=${t};`),y+="continue"):y+="return "+t}})})},f=(e,t,r)=>{if(e){let n=e=>"string"==typeof e?`${h}[${t[e]||o[e]}]&0xFFFFFFFFFFFFFFFFn`:"bigint"==typeof e?e+"n":`(${n(e[0])})${e[1]}(${n(e[2])})`;y+=`if(${n(e)}){`,r(),y+="}"}else r()},a=(e,r)=>{if(!(e in r)){let n=t();y+=`var ${n}=${o[e]};`,r[e]=n}},i=(e,r,n,l="")=>{if("string"==typeof e)return r[e]||o[e];if(-1===e[0]){let t=i(e[1],r,n);return`Number(${h}[${t}]&0xFFFFFFFFn)`}if(-2===e[0]){let t=i(e[1],r,n),l=i(e[2],r,n);return`${t}+${l}`}if(-3===e[0]){let t=e[1];"string"==typeof t&&a(t,r);let l=i(t,r,n),s=i(e[2],r,n);return y+=`${h}[${l}]&=${h}[${s}];`,l}let[s,...f]=e,F=f[f.length-1],p=(("string"==typeof F?"P"===F||"Q"===F:"string"!=typeof F[0]&&F[0]<0)?f.length-1:f.length)<<8,g=-1,d,m,x;for(let e=0;e<n.length;e++){let t=n[e];if(t.F.length===f.length){let r=0;for(let e=0;e<f.length;e++)f[e]===t.F[e]&&r++;r>g&&(g=r,d=e,m=t.u,x=t.F)}}if(!("string"==typeof s&&u[s].u===m)){let r=("string"==typeof s?`${u[s].$}|${p}`:`${s|p}`)+l;m?(n.splice(d,1),y+=`${c}[${m}]=${r};`):(m=t(),y+=`var ${m}=${$}(${r},${e.length});`)}for(let e=0;e<f.length;e++)if(x&&f[e]!==x[e]){let t=i(f[e],r,n);y+=`${c}[${m}+${e+1}]=${t};`}return m},o={},u={},c=(t(),t()),h=t(),$=t(),F=t(),p=t(),g=new Set;for(let{e:[e]}of l)if("number"==typeof e)g.add(e);else{let[,...t]=e;for(let e of t)g.add(e)}let y=`for(;;){var ${p}=${c}[${F}]&255;`;return s(F,p,l,null,[],{}),y+=`return ${F}}`,Function(c,h,$,F,y)})(),F=(e,t,r,n,l,s,f,a,i)=>{let o=()=>{let e=0,t=0,r;do e|=(127&(r=k[Y++]))<<t,t+=7;while(128&r)return e>>>0},u=()=>{let e=0,t=0,r;do e|=(127&(r=k[Y++]))<<t,t+=7;while(128&r)return t<32&&64&r?e|-1<<t:e},F=()=>{let e=0n,t=0n,r;do e|=BigInt(127&(r=k[Y++]))<<t,t+=7n;while(128&r)return t<64&&64&r?e|~0n<<t:e},p=()=>{let e=k[Y];if(64===e)return Y++,[0,0];if(64&e)return Y++,[0,1];let[t,r]=j[o()];return[t.length,r.length]},g=[],y=0,d=[],m=0,x=e=>{for(;m<e;)C.push("s"+ ++m);return"s"+e},b=(e,t,r)=>`c.${e}[${z(t)}${r?"+"+r:""}]`,w=(e,t,r,n)=>`c.${e}[${z(t)}${r?"+"+r:""}]=${n}`,P=(e,t,r)=>`c.dv.get${e}(${z(t)}${r?"+"+r:""},1)`,_=(e,t,r,n)=>`c.dv.set${e}(${z(t)}${r?"+"+r:""},${n},1)`,z=e=>e<0?x(-e):`(${Q(e)})`,Q=e=>{let r=h[e];switch(255&r){case 0:case 2:return`l.h(${z(h[e+1])})`;case 1:case 3:return`l.M(${z(h[e+1])})`;case 4:case 6:return`l.x(${z(h[e+1])})`;case 5:case 7:return`l.p(${z(h[e+1])})`;case 10:return`c.u8.copyWithin(${z(h[e+1])},T=${z(h[e+2])},T+${z(h[e+3])})`;case 11:return`c.u8.fill(${z(h[e+1])},T=${z(h[e+2])},T+${z(h[e+3])})`;case 16:{let n=r>>8&65535,l=h[e+n+1],[s,f]=t[l],a=[];for(let t=1;t<=n;t++)a.push(z(h[e+t]));let i=`f[${l}](${a})`;if(f.length<2)return i;let o=h[e+n+2],u=[];for(let e=0;e<f.length;e++)u.push(x(o+e));return`[${u}]=${i}`}case 17:{let t=r>>8&65535,[n,l]=j[h[e+t+2]],s=[],f=z(h[e+1]);for(let r=1;r<=t;r++)s.push(z(h[e+r+1]));let a=`t[${f}](${s})`;if(l.length<2)return a;let i=h[e+t+3],o=[];for(let e=0;e<l.length;e++)o.push(x(i+e));return`[${o}]=${a}`}case 27:return`${z(h[e+1])}?${z(h[e+2])}:${z(h[e+3])}`;case 32:return R[h[e+1]];case 33:case 34:return`${R[h[e+2]]}=${z(h[e+1])}`;case 35:return`g[${h[e+1]}]`;case 36:return`g[${h[e+2]}]=${z(h[e+1])}`;case 40:return P("Int32",h[e+1],h[e+2]);case 245:return P("Uint32",h[e+1],h[e+2]);case 41:return P("BigUint64",h[e+1],h[e+2]);case 246:return P("BigInt64",h[e+1],h[e+2]);case 42:return P("Float32",h[e+1],h[e+2]);case 43:return P("Float64",h[e+1],h[e+2]);case 44:return b("i8",h[e+1],h[e+2]);case 45:return b("u8",h[e+1],h[e+2]);case 46:return P("Int16",h[e+1],h[e+2]);case 47:return P("Uint16",h[e+1],h[e+2]);case 48:return`BigInt(${b("i8",h[e+1],h[e+2])})&0xFFFFFFFFFFFFFFFFn`;case 49:return`BigInt(${b("u8",h[e+1],h[e+2])})`;case 50:return`BigInt(${P("Int16",h[e+1],h[e+2])})&0xFFFFFFFFFFFFFFFFn`;case 51:return`BigInt(${P("Uint16",h[e+1],h[e+2])})`;case 52:return`BigInt(${P("Int32",h[e+1],h[e+2])})&0xFFFFFFFFFFFFFFFFn`;case 53:return`BigInt(${P("Uint32",h[e+1],h[e+2])})`;case 54:return _("Int32",h[e+1],h[e+3],z(h[e+2]));case 55:return _("BigUint64",h[e+1],h[e+3],z(h[e+2]));case 56:return _("Float32",h[e+1],h[e+3],z(h[e+2]));case 57:return _("Float64",h[e+1],h[e+3],z(h[e+2]));case 58:return w("u8",h[e+1],h[e+3],z(h[e+2]));case 59:return _("Int16",h[e+1],h[e+3],z(h[e+2]));case 60:return w("u8",h[e+1],h[e+3],`Number(${z(h[e+2])}&255n)`);case 61:return _("Int16",h[e+1],h[e+3],`Number(${z(h[e+2])}&65535n)`);case 62:return _("Int32",h[e+1],h[e+3],`Number(${z(h[e+2])}&0xFFFFFFFFn)`);case 63:if(h[e+1])throw Error("Unsupported non-zero memory index");return"c.pc";case 64:if(h[e+2])throw Error("Unsupported non-zero memory index");return`c.pg(${z(h[e+1])})`;case 65:return h[e+1]+"";case 66:return(0xffffffffffffffffn&d[h[e+1]])+"n";case 67:return U.getFloat32(h[e+1],!0)+"";case 68:return U.getFloat64(h[e+1],!0)+"";case 240:return z(h[e+1]);case 241:return`!${z(h[e+1])}`;case 242:return`${z(h[e+1])}?1:0`;case 243:return`${z(h[e+1])}>>>0`;case 244:return`l.c(${z(h[e+1])})`;case 69:case 80:return`${z(h[e+1])}?0:1`;case 70:case 81:case 91:case 97:return`${z(h[e+1])}===${z(h[e+2])}`;case 71:case 82:case 92:case 98:return`${z(h[e+1])}!==${z(h[e+2])}`;case 72:case 73:case 83:case 84:case 93:case 99:return`${z(h[e+1])}<${z(h[e+2])}`;case 74:case 75:case 85:case 86:case 94:case 100:return`${z(h[e+1])}>${z(h[e+2])}`;case 76:case 77:case 87:case 88:case 95:case 101:return`${z(h[e+1])}<=${z(h[e+2])}`;case 78:case 79:case 89:case 90:case 96:case 102:return`${z(h[e+1])}>=${z(h[e+2])}`;case 103:return`Math.clz32(${z(h[e+1])})`;case 104:return`l.k(${z(h[e+1])})`;case 105:return`l.v(${z(h[e+1])})`;case 106:return`${z(h[e+1])}+${z(h[e+2])}|0`;case 107:return`${z(h[e+1])}-${z(h[e+2])}|0`;case 108:return`Math.imul(${z(h[e+1])},${z(h[e+2])})`;case 110:case 109:return`${z(h[e+1])}/${z(h[e+2])}|0`;case 112:case 111:return`${z(h[e+1])}%${z(h[e+2])}|0`;case 113:case 131:return`${z(h[e+1])}&${z(h[e+2])}`;case 114:case 132:return`${z(h[e+1])}|${z(h[e+2])}`;case 115:case 133:return`${z(h[e+1])}^${z(h[e+2])}`;case 116:return`${z(h[e+1])}<<${z(h[e+2])}`;case 117:case 136:return`${z(h[e+1])}>>${z(h[e+2])}`;case 118:return`${z(h[e+1])}>>>${z(h[e+2])}|0`;case 119:return`l.L(${z(h[e+1])},${z(h[e+2])})`;case 120:return`l.U(${z(h[e+1])},${z(h[e+2])})`;case 121:return`l.Q(${z(h[e+1])})`;case 122:return`l.H(${z(h[e+1])})`;case 123:return`l.q(${z(h[e+1])})`;case 124:return`(${z(h[e+1])}+${z(h[e+2])})&0xFFFFFFFFFFFFFFFFn`;case 125:return`(${z(h[e+1])}-${z(h[e+2])})&0xFFFFFFFFFFFFFFFFn`;case 126:return`(${z(h[e+1])}*${z(h[e+2])})&0xFFFFFFFFFFFFFFFFn`;case 127:return`${z(h[e+1])}/${z(h[e+2])}&0xFFFFFFFFFFFFFFFFn`;case 128:case 149:case 163:return`${z(h[e+1])}/${z(h[e+2])}`;case 129:return`${z(h[e+1])}%${z(h[e+2])}&0xFFFFFFFFFFFFFFFFn`;case 130:return`${z(h[e+1])}%${z(h[e+2])}`;case 134:return`${z(h[e+1])}<<${z(h[e+2])}&0xFFFFFFFFFFFFFFFFn`;case 135:return`l.c(${z(h[e+1])})>>${z(h[e+2])}&0xFFFFFFFFFFFFFFFFn`;case 137:return`l.D(${z(h[e+1])},${z(h[e+2])})`;case 138:return`l.N(${z(h[e+1])},${z(h[e+2])})`;case 139:case 153:return`Math.abs(${z(h[e+1])})`;case 140:case 154:return`-${z(h[e+1])}`;case 141:case 155:return`Math.ceil(${z(h[e+1])})`;case 142:case 156:return`Math.floor(${z(h[e+1])})`;case 143:case 157:return`Math.trunc(${z(h[e+1])})`;case 144:case 158:return`Math.round(${z(h[e+1])})`;case 145:case 159:return`Math.sqrt(${z(h[e+1])})`;case 146:case 160:return`${z(h[e+1])}+${z(h[e+2])}`;case 147:case 161:return`${z(h[e+1])}-${z(h[e+2])}`;case 148:case 162:return`${z(h[e+1])}*${z(h[e+2])}`;case 150:case 164:return`Math.min(${z(h[e+1])},${z(h[e+2])})`;case 151:case 165:return`Math.max(${z(h[e+1])},${z(h[e+2])})`;case 152:case 166:return`l.R(${z(h[e+1])},${z(h[e+2])})`;case 167:return`Number(${z(h[e+1])}&0xFFFFFFFFn)|0`;case 168:case 169:case 170:case 171:return`Math.trunc(${z(h[e+1])})|0`;case 172:return`BigInt(${z(h[e+1])})`;case 173:return`BigInt(${z(h[e+1])}>>>0)`;case 174:case 175:case 176:case 177:return`BigInt(Math.trunc(${z(h[e+1])}))&0xFFFFFFFFFFFFFFFFn`;case 180:case 181:case 186:case 185:return`Number(${z(h[e+1])})`;case 188:return`l.W(${z(h[e+1])})`;case 189:return`l.j(${z(h[e+1])})`;case 190:return`l.V(${z(h[e+1])})`;case 191:return`l.G(${z(h[e+1])})`;case 192:return`${z(h[e+1])}<<24>>24`;case 193:return`${z(h[e+1])}<<16>>16`;case 194:return`l.J(${z(h[e+1])})`;case 195:return`l.K(${z(h[e+1])})`;case 196:return`l.X(${z(h[e+1])})`;default:throw"Internal error"}},I=(e,t)=>{let r=y;return h[r]=e,y+=t,r},M=(e,t=V)=>{g.push(y),h[y++]=256|e|t<<24,h[y++]=-t},E=(e=!1)=>{let t,r=[],n=g.length-1,l=e=>{let t=h[e],r=255&t,s=r>=40&&r<=62||10===r||11===r;for(let r=(t>>8&65535)-1;n>=0&&r>=0;r--){let t=-h[e+r+1],f=!1;for(let a=n;a>=0;a--){let i=g[a];if(null===i)continue;let o=h[i],u=255&o;if(s&&(u<65||u>66)&&32!=u)break;if(o>>>24===t){g[a]=null,f||(n=a-1),h[e+r+1]=l(i);break}if(243!==u&&244!==u)break;f=!0}}return $(h,d,I,e)},s;for(;n>=0;){let e=n--;null!==(s=g[e])&&(g[e]=l(s))}for(n=g.length-1,e&&(n>=0&&null!==(s=g[n])&&h[s]>>>24===V?(t=Q(s),n--):t="s"+V,V--);n>=0;)if(null!==(s=g[n--])){let e=h[s]>>>24;r.push(`${e?x(e)+"=":""}${Q(s)};`)}return X+=r.reverse().join(""),d.length=0,g.length=0,y=0,t},{b:k,S:U,d:v,f:B,A:O,m:j}=f,[A,S]=j[B[a]],[N,T,D]=v[a],R=[],L=A.length;for(let e=0;e<L;e++)R.push("a"+e);let C=["L","T"];for(let[e,t]of N)for(let r=0;r<e;r++){let e="t"+C.length;R.push(e),C.push(e+(126===t?"=0n":"=0"))}let q=e=>{let t=J.length<256;t?X+=`b${J.length}:`:256===J.length&&(X+=`L=1;b${J.length}:for(;;){switch(L){case 1:`,G=2);let r=t?-1:G++,n=t?-1:0!==e?G++:0,[l,s]=p();return J.push({r:l,a:!1,_:e,g:r,s:n,o:V-l,l:s}),n},W=(e=J.length-o()-1)=>{if(J[J.length-1].a)return;let t=J[e];if(e){if(1===t._){if(V>t.o+t.r)for(let e=1;e<=t.r;e++)X+=`s${t.o+e}=s${V-t.r+e};`;X+=e<256?`continue b${e};`:`L=${t.s};continue;`}else{if(V>t.o+t.l)for(let e=1;e<=t.l;e++)X+=`s${t.o+e}=s${V-t.l+e};`;X+=e<=256?`break b${e};`:`L=${t.g};continue;`}}else if(1===t.l)X+=`return s${V};`;else if(t.l>1){let e=[];for(let r=t.l-1;r>=0;r--)e.push("s"+(V-r));X+=`return[${e}];`}else X+="return;"},J=[{r:0,a:!1,_:0,g:-1,s:-1,o:0,l:S.length}],V=0,Y=T,G=0,X="b0:{";for(;Y<D;){let e=k[Y++],r=c[e];if(8&r){if(J[J.length-1].a)32&r&&Y++,16&r&&o();else{let t=3&r;if(1024&r&&(g.push(y),h[y++]=66|V+1<<24,h[y++]=d.length,d.push(63n),g.push(y),h[y++]=643|V<<24,h[y++]=-V,h[y++]=-(V+1)),V-=t,384&r)for(let e=0;e<t;e++)M(128&r?243:244,V+e+1);if(!(512&r)){32&r&&Y++,g.push(y),4&r&&(e|=V+1<<24),h[y++]=e|t<<8;for(let e=1;e<=t;e++)h[y++]=-(V+e);16&r&&(h[y++]=o())}4&r&&V++,64&r&&M(242)}}else switch(e){case 0:{let e=J[J.length-1];E(),e.a||(X+='"unreachable"();',e.a=!0);break}case 2:E(),0>q(0)&&(X+="{");break;case 3:{E();let e=q(1);X+=e<0?"for(;;){":`case ${e}:`;break}case 4:{J[J.length-1].a||M(J.length<256?240:241);let e=E(!0),t=q(2);X+=t<0?`if(${e}){`:`if(${e}){L=${t};continue}`;break}case 5:{E();let e=J.length-1,t=J[e];W(e),X+=e<256?"}else{":`case ${t.s}:`,t._=0,V=t.o+t.r,t.a=!1;break}case 11:{E();let e=J.length-1,t=J[e];2!==t._&&(t.s=0),t._=0,W(e),e<256?X+="}":(t.s&&(X+=`case ${t.s}:`),X+=`case ${t.g}:`,256==e&&(X+="}break}")),V=t.o+t.l,J.pop();break}case 12:E(),W(),J[J.length-1].a=!0;break;case 13:{J[J.length-1].a||M(240);let e=E(!0);X+=`if(${e}){`,W(),X+="}";break}case 14:{let e=E(!0);X+=`switch(${e}){`;for(let e=0,t=o();e<t;e++)X+=`case ${e}:`,W();X+="default:",W(),X+="}",J[J.length-1].a=!0;break}case 15:E(),W(0),J[J.length-1].a=!0;break;case 16:{let r=o();if(!J[J.length-1].a){let[n,l]=t[r];V-=n.length,g.push(y),1===l.length&&(e|=V+1<<24),h[y++]=e|n.length<<8;for(let e=1;e<=n.length;e++)h[y++]=-(V+e);h[y++]=r,l.length>1&&(h[y++]=V+1),V+=l.length}break}case 17:{let t=o(),r=o();if(0!==r)throw Error("Unsupported table index: "+r);if(!J[J.length-1].a){let[r,n]=j[t];V-=r.length+1,g.push(y),1===n.length&&(e|=V+1<<24),h[y++]=e|r.length<<8,h[y++]=-(V+r.length+1);for(let e=1;e<=r.length;e++)h[y++]=-(V+e);h[y++]=t,n.length>1&&(h[y++]=V+1),V+=n.length}break}case 27:J[J.length-1].a||(M(240),V-=2,g.push(y),h[y++]=768|e|V<<24,h[y++]=-(V+2),h[y++]=-V,h[y++]=-(V+1));break;case 65:J[J.length-1].a?u():(g.push(y),h[y++]=e|++V<<24,h[y++]=u());break;case 66:J[J.length-1].a?F():(g.push(y),h[y++]=e|++V<<24,h[y++]=d.length,d.push(F()));break;case 67:J[J.length-1].a||(g.push(y),h[y++]=e|++V<<24,h[y++]=Y),Y+=4;break;case 68:J[J.length-1].a||(g.push(y),h[y++]=e|++V<<24,h[y++]=Y),Y+=8;break;case 252:if((e=k[Y++])<=7)J[J.length-1].a||M(e);else if(10===e){if(k[Y++]||k[Y++])throw Error("Unsupported non-zero memory index");J[J.length-1].a||(V-=2,g.push(y),h[y++]=768|e|V<<24,h[y++]=-V,h[y++]=-(V+1),h[y++]=-(V+2))}else if(11===e){if(k[Y++])throw Error("Unsupported non-zero memory index");J[J.length-1].a||(V-=2,g.push(y),h[y++]=768|e|V<<24,h[y++]=-(V+1),h[y++]=-V,h[y++]=-(V+2))}else throw Error("Unsupported instruction: 0xFC"+e.toString(16).padStart(2,"0"));break;default:throw Error("Unsupported instruction: 0x"+e.toString(16).padStart(2,"0"))}}if(m>255)throw Error("Deep stacks are not supported");let H=JSON.stringify("wasm:"+(O.get(i)||`function[${a}]`));return Function("f","c","t","g","l",`return{${H}(${R.slice(0,L)}){var ${C};${X}}}[${H}]`)(e,s,r,n,l)},p=()=>{let e=new ArrayBuffer(8),t=new Float32Array(e),r=new Float64Array(e),n=new Int32Array(e),l=new BigInt64Array(e),s=new BigUint64Array(e);return{R:(e,t)=>(e<0||0===e&&Object.is(e,-0))!==(t<0||0===t&&Object.is(t,-0))?-e:e,c:e=>(s[0]=e,l[0]),W:e=>(t[0]=e,n[0]),V:e=>(n[0]=e,t[0]),j:e=>(r[0]=e,s[0]),G:e=>(s[0]=e,r[0]),L:(e,t)=>e<<t|e>>>32-t,U:(e,t)=>e>>>t|e<<32-t,D:(e,t)=>(e<<t|e>>64n-t)&0xffffffffffffffffn,N:(e,t)=>(e>>t|e<<64n-t)&0xffffffffffffffffn,k:e=>e?31^Math.clz32(e&-e):32,v(e){let t=0;for(;e;)t++,e&=e-1;return t},Q(e){let t=Math.clz32(Number(e>>32n&4294967295n));return 32===t&&(t+=Math.clz32(Number(4294967295n&e))),BigInt(t)},H(e){let t=Number(4294967295n&e);return t?BigInt(31^Math.clz32(t&-t)):(t=Number(e>>32n&4294967295n))?BigInt(32+Math.clz32(t&-t)^31):64n},q(e){let t=0n;for(;e;)t++,e&=e-1n;return t},h:e=>(e=Math.trunc(e))>=2147483647?2147483647:e<=-2147483648?-2147483648:0|e,M:e=>(e=Math.trunc(e))>=4294967295?-1:e<=0?0:0|e,x:e=>(e=Math.trunc(e))>=0x7fffffffffffffff?0x7fffffffffffffffn:e<=-0x8000000000000000?0x8000000000000000n:e==e?0xffffffffffffffffn&BigInt(e):0n,p:e=>(e=Math.trunc(e))>=18446744073709552e3?0xffffffffffffffffn:e>0?BigInt(e):0n,J:e=>128n&e?0xffffffffffffff00n|e:255n&e,K:e=>32768n&e?0xffffffffffff0000n|e:65535n&e,X:e=>2147483648n&e?0xffffffff00000000n|e:4294967295n&e}},g=class{},y=class{},d=class{},m=class{},x=(e,t,r=new Uint8Array(t))=>{e.i8=new Int8Array(t),e.u8=r,e.dv=new DataView(t)},b=(e,t)=>{let r=e.pc;if(r+(t>>>=0)>e.y)return -1;if(t){let r=e.Y.buffer=new ArrayBuffer((e.pc+=t)<<16),n=e.u8,l=new Uint8Array(r);l.set(n),x(e,r,l);try{structuredClone(n.buffer,{transfer:[n.buffer]})}catch{}}return r},w=class{constructor(e,t){let r=f.get(e),{d:n,O:l,I:s,B:a,f:c,T:h,w:$,C:w,z:P,E:_,m:z}=r,Q=this.exports={},I=[],M=[],E=[],k=[],U=[],v=p(),B=new m,O=B.Y=new y;if(w.length>1)throw Error(`Unsupported memory count: ${w.length}`);if(w.length>0){let[e,t]=w[0];B.y=Math.min(t,65535),B.pc=e}else B.y=0,B.pc=0;let j=B.pg=e=>b(B,e);for(let[e,t,r]of(O.grow=e=>{let t=j(e);if(t<0)throw RangeError("Cannot grow past limit");return t},x(B,O.buffer=new ArrayBuffer(B.pc<<16)),l)){if(0!==e)throw Error(`Invalid memory index: ${e}`);B.u8.set(r,t)}for(let e of $){let[r,n,l,s]=e,f=t[r][n];if(0===l){let e=z[s],[t,r]=e,n=[],l=[];for(let e=0;e<t.length;e++)n.push("a"+e),l.push(u("a"+e,t[e]));let a=`f(${l})`;if(1===r.length)a="return "+o(a,r[0]);else if(r.length>1){a=`let r=${a};`;for(let e=0;e<r.length;e++)a+=`r[${e}]=${o(`r[${e}]`,r[e])};`;a+="return r"}I.push(Function("f","l",`return(${n})=>{${a}}`)(f,v)),M.push(e)}else if(3===l)E.push(i(f,s)),k.push(s);else throw Error(`Unsupported import type ${l} for "${r}"."${n}"`)}for(let[e,t,r]of h)E.push(r(E)),k.push(e);for(let e=0;e<n.length;e++){let t=I.length;M.push(z[c[e]]),I.push((...n)=>(I[t]=F(I,M,U[0],E,v,B,r,e,t))(...n))}for(let[e,t,r]of _){let e=[];for(let r=0;r<t;r++)e.push(null);U.push(e)}for(let[e,t]of s){if(1!==U.length)throw Error("Multiple tables are unsupported");let r=U[0];for(let n of t){let t=e++;r[t]=(...e)=>{let l=I[n](...e);return r[t]=I[n],l}}}let A=e=>{let[t,r]=M[e],n=[],l=[];for(let e=0;e<t.length;e++)n.push("a"+e),l.push(o("a"+e,t[e]));let s=`f[i](${l})`;if(1===r.length)s="return "+u(s,r[0]);else if(r.length>1){s=`let r=${s};`;for(let e=0;e<r.length;e++)s+=`r[${e}]=${u(`r[${e}]`,r[e])};`;s+="return r"}return Function("f","i","l",`return(${n})=>{${s}}`)(I,e,v)};for(let[e,t,r]of a)if(0===t)Q[e]=A(r);else if(1===t){let t=[];for(let[e,r]of s)for(let n of r)t[e++]=A(n);let n=new d;Object.defineProperty(n,"length",{get:()=>t.length}),n.get=e=>t[e],n.grow=()=>{throw Error(`Unsupported operation "grow" on table ${r}`)},n.set=()=>{throw Error(`Unsupported operation "set" on table ${r}`)},Q[e]=n}else if(2===t)Q[e]=O;else if(3===t){let t=new g,n=k[r];Object.defineProperty(t,"value",{get:()=>E[r],set:e=>{E[r]=i(e,n)}}),Q[e]=t}else throw Error(`Unsupported export type ${t} for "${e}"`);P>=0&&I[P]()}},P=async(e,t)=>{if(e instanceof a)return new w(e,t);let r=new a(e);return{module:r,instance:new w(r,t)}},_={Global:g,Instance:w,instantiate:P,Memory:y,Module:a,Table:d}},{"@parcel/transformer-js/src/esmodule-helpers.js":"4uUBn"}]},["4IJ4y"],"4IJ4y","parcelRequire2d1f");
//# sourceMappingURL=worker.6d07121c.js.map