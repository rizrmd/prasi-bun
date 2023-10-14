import { transform } from "@swc/core";
import { g } from "../utils/global";
import { createHash } from "crypto";

export const generateAPIFrm = async () => {
  const res = await transform(
    `
  (BigInt.prototype).toJSON = function () {
    return "BigInt::" + this.toString();
  };

  const replacer = (key, value) => {
    if (typeof value === "string" && value.startsWith('BigInt::')) {
      return BigInt(value.substr(8));
    }
    return value;
  }
 
  window.addEventListener('message', (e) => {
    const msg = e.data;
    const init = Object.assign({}, msg.init)

    let input = msg.input;
    let url = msg.input;
    if (typeof msg.input === 'string') {
      if (!input.startsWith('http')) {
        url = new URL(\`\$\{location.origin\}\$\{input\}\`)
      } else {
        url = new URL(input)
      }
    }

    if (init && init.body && typeof init.body === 'object') {
      if (Array.isArray(init.body)) {
        const body = new FormData();
        body.append("file", init.body[0]);
        init.body = body;
      }
    } 

     
    fetch(url.pathname, init) 
      .then(async (res) => {
        if (res) {
          const body = await res.text();
          if (res.ok) {
            try {
              parent.postMessage({result: JSON.parse(body, replacer), id: msg.id }, '*')
            } catch(e) {
              parent.postMessage({result: body, id: msg.id }, '*')
            }
          } else {
            try {
              parent.postMessage({error: JSON.parse(body, replacer), id: msg.id }, '*')
            } catch(e) {
              parent.postMessage({error: body, id: msg.id }, '*')
            }
          }
        }
      })
  })
  parent.postMessage('initialized', '*')`,
    { minify: true }
  );

  g.frm = {
    js: res.code,
    etag: createHash("md5").update(res.code).digest("hex"),
  };
};
