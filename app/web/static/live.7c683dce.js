(() => {

function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}

      var $parcel$global = globalThis;
    var parcelRequire = $parcel$global["parcelRequire2d1f"];
var parcelRegister = parcelRequire.register;
parcelRegister("kYHMg", function(module, exports) {

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $b66a6b3e111e00b6$export$2e2bcd8739ae039);

var $lAN3N = parcelRequire("lAN3N");

var $iak4Q = parcelRequire("iak4Q");

var $4WfNn = parcelRequire("4WfNn");

var $dgaZm = parcelRequire("dgaZm");

var $ets8e = parcelRequire("ets8e");
var $b66a6b3e111e00b6$export$2e2bcd8739ae039 = (0, $4WfNn.page)({
    url: "/live/:domain/**",
    component: ({})=>{
        params.site_id = params.domain;
        if ((0, $iak4Q.default)(params._)) params.page_id = params._;
        navigator.serviceWorker.controller?.postMessage({
            type: "add-cache",
            url: location.href
        });
        return /*#__PURE__*/ (0, $lAN3N.jsx)((0, $dgaZm.Live), {
            mode: "dev",
            domain: params.domain,
            pathname: `/${params._ === "_" ? "" : params._}`,
            loader: (0, $ets8e.defaultLoader)
        });
    }
});

});
parcelRegister("iak4Q", function(module, exports) {

$parcel$export(module.exports, "default", () => $d398bc17f99f1c7d$export$2e2bcd8739ae039);

var $4IFjG = parcelRequire("4IFjG");
function $d398bc17f99f1c7d$var$validate(uuid) {
    return typeof uuid === "string" && (0, $4IFjG.default).test(uuid);
}
var $d398bc17f99f1c7d$export$2e2bcd8739ae039 = $d398bc17f99f1c7d$var$validate;

});
parcelRegister("4IFjG", function(module, exports) {

$parcel$export(module.exports, "default", () => $36fb521888a0040c$export$2e2bcd8739ae039);
var $36fb521888a0040c$export$2e2bcd8739ae039 = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

});


parcelRegister("dgaZm", function(module, exports) {

$parcel$export(module.exports, "Live", () => $4b5b64b83be1f4ac$export$db78b3d0b2aa666a);

var $lAN3N = parcelRequire("lAN3N");

var $63SH6 = parcelRequire("63SH6");

var $ia1G1 = parcelRequire("ia1G1");

var $4WfNn = parcelRequire("4WfNn");

var $jYHT1 = parcelRequire("jYHT1");

var $hZ1Kn = parcelRequire("hZ1Kn");

var $f0R6p = parcelRequire("f0R6p");

var $gte4T = parcelRequire("gte4T");
const $4b5b64b83be1f4ac$export$db78b3d0b2aa666a = ({ domain: domain, pathname: pathname, loader: loader, mode: mode = "dev" })=>{
    const p = (0, $4WfNn.useGlobal)((0, $hZ1Kn.LiveGlobal), "LIVE");
    p.loader = loader;
    (0, $f0R6p.w).preload = (url)=>{
        (0, $gte4T.preload)(p, url);
    };
    if (mode === "prod") p.prod = true;
    if (p.site.id) {
        if (!p.mode && !!p.site.responsive) {
            if (p.site.responsive === "all") {
                const parsed = (0, (/*@__PURE__*/$parcel$interopDefault($ia1G1)))();
                p.mode = parsed.device.type === "mobile" ? "mobile" : "desktop";
                if (localStorage.getItem("prasi-editor-mode")) p.mode = localStorage.getItem("prasi-editor-mode");
            } else if (p.site.responsive === "mobile-only") p.mode = "mobile";
            else if (p.site.responsive === "desktop-only") p.mode = "desktop";
        }
    }
    const onResize = (0, $63SH6.useCallback)(()=>{
        let newmode = p.mode;
        if (window.innerWidth < 600) newmode = "mobile";
        else newmode = "desktop";
        if (newmode !== p.mode) {
            p.mode = newmode;
            p.render();
        }
    }, [
        p
    ]);
    (0, $63SH6.useEffect)(()=>{
        if (p.site.id) {
            window.removeEventListener("resize", onResize);
            if (p.site.responsive === "all") window.addEventListener("resize", onResize);
        }
    }, [
        p.site.responsive
    ]);
    if (p.status === "init") (0, $f0R6p.initLive)(p, domain);
    if (p.site.id) (0, $gte4T.routeLive)(p, pathname);
    return /*#__PURE__*/ (0, $lAN3N.jsx)((0, $jYHT1.LPage), {});
};

});
parcelRegister("ia1G1", function(module, exports) {
/////////////////////////////////////////////////////////////////////////////////
/* UAParser.js v1.0.36
   Copyright © 2012-2021 Faisal Salman <f@faisalman.com>
   MIT License */ /*
   Detect Browser, Engine, OS, CPU, and Device type/model from User-Agent data.
   Supports browser & node.js environment. 
   Demo   : https://faisalman.github.io/ua-parser-js
   Source : https://github.com/faisalman/ua-parser-js */ /////////////////////////////////////////////////////////////////////////////////
(function(window1, undefined) {
    "use strict";
    //////////////
    // Constants
    /////////////
    var LIBVERSION = "1.0.36", EMPTY = "", UNKNOWN = "?", FUNC_TYPE = "function", UNDEF_TYPE = "undefined", OBJ_TYPE = "object", STR_TYPE = "string", MAJOR = "major", MODEL = "model", NAME = "name", TYPE = "type", VENDOR = "vendor", VERSION = "version", ARCHITECTURE = "architecture", CONSOLE = "console", MOBILE = "mobile", TABLET = "tablet", SMARTTV = "smarttv", WEARABLE = "wearable", EMBEDDED = "embedded", UA_MAX_LENGTH = 350;
    var AMAZON = "Amazon", APPLE = "Apple", ASUS = "ASUS", BLACKBERRY = "BlackBerry", BROWSER = "Browser", CHROME = "Chrome", EDGE = "Edge", FIREFOX = "Firefox", GOOGLE = "Google", HUAWEI = "Huawei", LG = "LG", MICROSOFT = "Microsoft", MOTOROLA = "Motorola", OPERA = "Opera", SAMSUNG = "Samsung", SHARP = "Sharp", SONY = "Sony", VIERA = "Viera", XIAOMI = "Xiaomi", ZEBRA = "Zebra", FACEBOOK = "Facebook", CHROMIUM_OS = "Chromium OS", MAC_OS = "Mac OS";
    ///////////
    // Helper
    //////////
    var extend = function(regexes, extensions) {
        var mergedRegexes = {};
        for(var i in regexes)if (extensions[i] && extensions[i].length % 2 === 0) mergedRegexes[i] = extensions[i].concat(regexes[i]);
        else mergedRegexes[i] = regexes[i];
        return mergedRegexes;
    }, enumerize = function(arr) {
        var enums = {};
        for(var i = 0; i < arr.length; i++)enums[arr[i].toUpperCase()] = arr[i];
        return enums;
    }, has = function(str1, str2) {
        return typeof str1 === STR_TYPE ? lowerize(str2).indexOf(lowerize(str1)) !== -1 : false;
    }, lowerize = function(str) {
        return str.toLowerCase();
    }, majorize = function(version) {
        return typeof version === STR_TYPE ? version.replace(/[^\d\.]/g, EMPTY).split(".")[0] : undefined;
    }, trim = function(str, len) {
        if (typeof str === STR_TYPE) {
            str = str.replace(/^\s\s*/, EMPTY);
            return typeof len === UNDEF_TYPE ? str : str.substring(0, UA_MAX_LENGTH);
        }
    };
    ///////////////
    // Map helper
    //////////////
    var rgxMapper = function(ua, arrays) {
        var i = 0, j, k, p, q, matches, match;
        // loop through all regexes maps
        while(i < arrays.length && !matches){
            var regex = arrays[i], props = arrays[i + 1]; // odd sequence (1,3,5,..)
            j = k = 0;
            // try matching uastring with regexes
            while(j < regex.length && !matches){
                if (!regex[j]) break;
                matches = regex[j++].exec(ua);
                if (!!matches) for(p = 0; p < props.length; p++){
                    match = matches[++k];
                    q = props[p];
                    // check if given property is actually array
                    if (typeof q === OBJ_TYPE && q.length > 0) {
                        if (q.length === 2) {
                            if (typeof q[1] == FUNC_TYPE) // assign modified match
                            this[q[0]] = q[1].call(this, match);
                            else // assign given value, ignore regex match
                            this[q[0]] = q[1];
                        } else if (q.length === 3) {
                            // check whether function or regex
                            if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) // call function (usually string mapper)
                            this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined;
                            else // sanitize match using given regex
                            this[q[0]] = match ? match.replace(q[1], q[2]) : undefined;
                        } else if (q.length === 4) this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined;
                    } else this[q] = match ? match : undefined;
                }
            }
            i += 2;
        }
    }, strMapper = function(str, map) {
        for(var i in map){
            // check if current value is array
            if (typeof map[i] === OBJ_TYPE && map[i].length > 0) for(var j = 0; j < map[i].length; j++){
                if (has(map[i][j], str)) return i === UNKNOWN ? undefined : i;
            }
            else if (has(map[i], str)) return i === UNKNOWN ? undefined : i;
        }
        return str;
    };
    ///////////////
    // String map
    //////////////
    // Safari < 3.0
    var oldSafariMap = {
        "1.0": "/8",
        "1.2": "/1",
        "1.3": "/3",
        "2.0": "/412",
        "2.0.2": "/416",
        "2.0.3": "/417",
        "2.0.4": "/419",
        "?": "/"
    }, windowsVersionMap = {
        "ME": "4.90",
        "NT 3.11": "NT3.51",
        "NT 4.0": "NT4.0",
        "2000": "NT 5.0",
        "XP": [
            "NT 5.1",
            "NT 5.2"
        ],
        "Vista": "NT 6.0",
        "7": "NT 6.1",
        "8": "NT 6.2",
        "8.1": "NT 6.3",
        "10": [
            "NT 6.4",
            "NT 10.0"
        ],
        "RT": "ARM"
    };
    //////////////
    // Regex map
    /////////////
    var regexes = {
        browser: [
            [
                /\b(?:crmo|crios)\/([\w\.]+)/i // Chrome for Android/iOS
            ],
            [
                VERSION,
                [
                    NAME,
                    "Chrome"
                ]
            ],
            [
                /edg(?:e|ios|a)?\/([\w\.]+)/i // Microsoft Edge
            ],
            [
                VERSION,
                [
                    NAME,
                    "Edge"
                ]
            ],
            [
                // Presto based
                /(opera mini)\/([-\w\.]+)/i,
                /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,
                /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i // Opera
            ],
            [
                NAME,
                VERSION
            ],
            [
                /opios[\/ ]+([\w\.]+)/i // Opera mini on iphone >= 8.0
            ],
            [
                VERSION,
                [
                    NAME,
                    OPERA + " Mini"
                ]
            ],
            [
                /\bopr\/([\w\.]+)/i // Opera Webkit
            ],
            [
                VERSION,
                [
                    NAME,
                    OPERA
                ]
            ],
            [
                // Mixed
                /(kindle)\/([\w\.]+)/i,
                /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,
                // Trident based
                /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i,
                /(ba?idubrowser)[\/ ]?([\w\.]+)/i,
                /(?:ms|\()(ie) ([\w\.]+)/i,
                // Webkit/KHTML based                                               // Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser/QupZilla/Falkon
                /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,
                // Rekonq/Puffin/Brave/Whale/QQBrowserLite/QQ, aka ShouQ
                /(heytap|ovi)browser\/([\d\.]+)/i,
                /(weibo)__([\d\.]+)/i // Weibo
            ],
            [
                NAME,
                VERSION
            ],
            [
                /(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i // UCBrowser
            ],
            [
                VERSION,
                [
                    NAME,
                    "UC" + BROWSER
                ]
            ],
            [
                /microm.+\bqbcore\/([\w\.]+)/i,
                /\bqbcore\/([\w\.]+).+microm/i
            ],
            [
                VERSION,
                [
                    NAME,
                    "WeChat(Win) Desktop"
                ]
            ],
            [
                /micromessenger\/([\w\.]+)/i // WeChat
            ],
            [
                VERSION,
                [
                    NAME,
                    "WeChat"
                ]
            ],
            [
                /konqueror\/([\w\.]+)/i // Konqueror
            ],
            [
                VERSION,
                [
                    NAME,
                    "Konqueror"
                ]
            ],
            [
                /trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i // IE11
            ],
            [
                VERSION,
                [
                    NAME,
                    "IE"
                ]
            ],
            [
                /ya(?:search)?browser\/([\w\.]+)/i // Yandex
            ],
            [
                VERSION,
                [
                    NAME,
                    "Yandex"
                ]
            ],
            [
                /(avast|avg)\/([\w\.]+)/i // Avast/AVG Secure Browser
            ],
            [
                [
                    NAME,
                    /(.+)/,
                    "$1 Secure " + BROWSER
                ],
                VERSION
            ],
            [
                /\bfocus\/([\w\.]+)/i // Firefox Focus
            ],
            [
                VERSION,
                [
                    NAME,
                    FIREFOX + " Focus"
                ]
            ],
            [
                /\bopt\/([\w\.]+)/i // Opera Touch
            ],
            [
                VERSION,
                [
                    NAME,
                    OPERA + " Touch"
                ]
            ],
            [
                /coc_coc\w+\/([\w\.]+)/i // Coc Coc Browser
            ],
            [
                VERSION,
                [
                    NAME,
                    "Coc Coc"
                ]
            ],
            [
                /dolfin\/([\w\.]+)/i // Dolphin
            ],
            [
                VERSION,
                [
                    NAME,
                    "Dolphin"
                ]
            ],
            [
                /coast\/([\w\.]+)/i // Opera Coast
            ],
            [
                VERSION,
                [
                    NAME,
                    OPERA + " Coast"
                ]
            ],
            [
                /miuibrowser\/([\w\.]+)/i // MIUI Browser
            ],
            [
                VERSION,
                [
                    NAME,
                    "MIUI " + BROWSER
                ]
            ],
            [
                /fxios\/([-\w\.]+)/i // Firefox for iOS
            ],
            [
                VERSION,
                [
                    NAME,
                    FIREFOX
                ]
            ],
            [
                /\bqihu|(qi?ho?o?|360)browser/i // 360
            ],
            [
                [
                    NAME,
                    "360 " + BROWSER
                ]
            ],
            [
                /(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i
            ],
            [
                [
                    NAME,
                    /(.+)/,
                    "$1 " + BROWSER
                ],
                VERSION
            ],
            [
                /(comodo_dragon)\/([\w\.]+)/i // Comodo Dragon
            ],
            [
                [
                    NAME,
                    /_/g,
                    " "
                ],
                VERSION
            ],
            [
                /(electron)\/([\w\.]+) safari/i,
                /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,
                /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i // QQBrowser/Baidu App/2345 Browser
            ],
            [
                NAME,
                VERSION
            ],
            [
                /(metasr)[\/ ]?([\w\.]+)/i,
                /(lbbrowser)/i,
                /\[(linkedin)app\]/i // LinkedIn App for iOS & Android
            ],
            [
                NAME
            ],
            [
                // WebView
                /((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i // Facebook App for iOS & Android
            ],
            [
                [
                    NAME,
                    FACEBOOK
                ],
                VERSION
            ],
            [
                /(kakao(?:talk|story))[\/ ]([\w\.]+)/i,
                /(naver)\(.*?(\d+\.[\w\.]+).*\)/i,
                /safari (line)\/([\w\.]+)/i,
                /\b(line)\/([\w\.]+)\/iab/i,
                /(chromium|instagram|snapchat)[\/ ]([-\w\.]+)/i // Chromium/Instagram/Snapchat
            ],
            [
                NAME,
                VERSION
            ],
            [
                /\bgsa\/([\w\.]+) .*safari\//i // Google Search Appliance on iOS
            ],
            [
                VERSION,
                [
                    NAME,
                    "GSA"
                ]
            ],
            [
                /musical_ly(?:.+app_?version\/|_)([\w\.]+)/i // TikTok
            ],
            [
                VERSION,
                [
                    NAME,
                    "TikTok"
                ]
            ],
            [
                /headlesschrome(?:\/([\w\.]+)| )/i // Chrome Headless
            ],
            [
                VERSION,
                [
                    NAME,
                    CHROME + " Headless"
                ]
            ],
            [
                / wv\).+(chrome)\/([\w\.]+)/i // Chrome WebView
            ],
            [
                [
                    NAME,
                    CHROME + " WebView"
                ],
                VERSION
            ],
            [
                /droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i // Android Browser
            ],
            [
                VERSION,
                [
                    NAME,
                    "Android " + BROWSER
                ]
            ],
            [
                /(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i // Chrome/OmniWeb/Arora/Tizen/Nokia
            ],
            [
                NAME,
                VERSION
            ],
            [
                /version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i // Mobile Safari
            ],
            [
                VERSION,
                [
                    NAME,
                    "Mobile Safari"
                ]
            ],
            [
                /version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i // Safari & Safari Mobile
            ],
            [
                VERSION,
                NAME
            ],
            [
                /webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i // Safari < 3.0
            ],
            [
                NAME,
                [
                    VERSION,
                    strMapper,
                    oldSafariMap
                ]
            ],
            [
                /(webkit|khtml)\/([\w\.]+)/i
            ],
            [
                NAME,
                VERSION
            ],
            [
                // Gecko based
                /(navigator|netscape\d?)\/([-\w\.]+)/i // Netscape
            ],
            [
                [
                    NAME,
                    "Netscape"
                ],
                VERSION
            ],
            [
                /mobile vr; rv:([\w\.]+)\).+firefox/i // Firefox Reality
            ],
            [
                VERSION,
                [
                    NAME,
                    FIREFOX + " Reality"
                ]
            ],
            [
                /ekiohf.+(flow)\/([\w\.]+)/i,
                /(swiftfox)/i,
                /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,
                // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror/Klar
                /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
                // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
                /(firefox)\/([\w\.]+)/i,
                /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,
                // Other
                /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
                // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Sleipnir/Obigo/Mosaic/Go/ICE/UP.Browser
                /(links) \(([\w\.]+)/i,
                /panasonic;(viera)/i // Panasonic Viera
            ],
            [
                NAME,
                VERSION
            ],
            [
                /(cobalt)\/([\w\.]+)/i // Cobalt
            ],
            [
                NAME,
                [
                    VERSION,
                    /master.|lts./,
                    ""
                ]
            ]
        ],
        cpu: [
            [
                /(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i // AMD64 (x64)
            ],
            [
                [
                    ARCHITECTURE,
                    "amd64"
                ]
            ],
            [
                /(ia32(?=;))/i // IA32 (quicktime)
            ],
            [
                [
                    ARCHITECTURE,
                    lowerize
                ]
            ],
            [
                /((?:i[346]|x)86)[;\)]/i // IA32 (x86)
            ],
            [
                [
                    ARCHITECTURE,
                    "ia32"
                ]
            ],
            [
                /\b(aarch64|arm(v?8e?l?|_?64))\b/i // ARM64
            ],
            [
                [
                    ARCHITECTURE,
                    "arm64"
                ]
            ],
            [
                /\b(arm(?:v[67])?ht?n?[fl]p?)\b/i // ARMHF
            ],
            [
                [
                    ARCHITECTURE,
                    "armhf"
                ]
            ],
            [
                // PocketPC mistakenly identified as PowerPC
                /windows (ce|mobile); ppc;/i
            ],
            [
                [
                    ARCHITECTURE,
                    "arm"
                ]
            ],
            [
                /((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i // PowerPC
            ],
            [
                [
                    ARCHITECTURE,
                    /ower/,
                    EMPTY,
                    lowerize
                ]
            ],
            [
                /(sun4\w)[;\)]/i // SPARC
            ],
            [
                [
                    ARCHITECTURE,
                    "sparc"
                ]
            ],
            [
                /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i
            ],
            [
                [
                    ARCHITECTURE,
                    lowerize
                ]
            ]
        ],
        device: [
            [
                //////////////////////////
                // MOBILES & TABLETS
                /////////////////////////
                // Samsung
                /\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i
            ],
            [
                MODEL,
                [
                    VENDOR,
                    SAMSUNG
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,
                /samsung[- ]([-\w]+)/i,
                /sec-(sgh\w+)/i
            ],
            [
                MODEL,
                [
                    VENDOR,
                    SAMSUNG
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                // Apple
                /(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i // iPod/iPhone
            ],
            [
                MODEL,
                [
                    VENDOR,
                    APPLE
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                /\((ipad);[-\w\),; ]+apple/i,
                /applecoremedia\/[\w\.]+ \((ipad)/i,
                /\b(ipad)\d\d?,\d\d?[;\]].+ios/i
            ],
            [
                MODEL,
                [
                    VENDOR,
                    APPLE
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /(macintosh);/i
            ],
            [
                MODEL,
                [
                    VENDOR,
                    APPLE
                ]
            ],
            [
                // Sharp
                /\b(sh-?[altvz]?\d\d[a-ekm]?)/i
            ],
            [
                MODEL,
                [
                    VENDOR,
                    SHARP
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                // Huawei
                /\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i
            ],
            [
                MODEL,
                [
                    VENDOR,
                    HUAWEI
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /(?:huawei|honor)([-\w ]+)[;\)]/i,
                /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i
            ],
            [
                MODEL,
                [
                    VENDOR,
                    HUAWEI
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                // Xiaomi
                /\b(poco[\w ]+|m2\d{3}j\d\d[a-z]{2})(?: bui|\))/i,
                /\b; (\w+) build\/hm\1/i,
                /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,
                /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,
                /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i // Xiaomi Mi
            ],
            [
                [
                    MODEL,
                    /_/g,
                    " "
                ],
                [
                    VENDOR,
                    XIAOMI
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                /\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i // Mi Pad tablets
            ],
            [
                [
                    MODEL,
                    /_/g,
                    " "
                ],
                [
                    VENDOR,
                    XIAOMI
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                // OPPO
                /; (\w+) bui.+ oppo/i,
                /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "OPPO"
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                // Vivo
                /vivo (\w+)(?: bui|\))/i,
                /\b(v[12]\d{3}\w?[at])(?: bui|;)/i
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "Vivo"
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                // Realme
                /\b(rmx[12]\d{3})(?: bui|;|\))/i
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "Realme"
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                // Motorola
                /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
                /\bmot(?:orola)?[- ](\w*)/i,
                /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i
            ],
            [
                MODEL,
                [
                    VENDOR,
                    MOTOROLA
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                /\b(mz60\d|xoom[2 ]{0,2}) build\//i
            ],
            [
                MODEL,
                [
                    VENDOR,
                    MOTOROLA
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                // LG
                /((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i
            ],
            [
                MODEL,
                [
                    VENDOR,
                    LG
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
                /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,
                /\blg-?([\d\w]+) bui/i
            ],
            [
                MODEL,
                [
                    VENDOR,
                    LG
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                // Lenovo
                /(ideatab[-\w ]+)/i,
                /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "Lenovo"
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                // Nokia
                /(?:maemo|nokia).*(n900|lumia \d+)/i,
                /nokia[-_ ]?([-\w\.]*)/i
            ],
            [
                [
                    MODEL,
                    /_/g,
                    " "
                ],
                [
                    VENDOR,
                    "Nokia"
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                // Google
                /(pixel c)\b/i // Google Pixel C
            ],
            [
                MODEL,
                [
                    VENDOR,
                    GOOGLE
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i // Google Pixel
            ],
            [
                MODEL,
                [
                    VENDOR,
                    GOOGLE
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                // Sony
                /droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i
            ],
            [
                MODEL,
                [
                    VENDOR,
                    SONY
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                /sony tablet [ps]/i,
                /\b(?:sony)?sgp\w+(?: bui|\))/i
            ],
            [
                [
                    MODEL,
                    "Xperia Tablet"
                ],
                [
                    VENDOR,
                    SONY
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                // OnePlus
                / (kb2005|in20[12]5|be20[12][59])\b/i,
                /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "OnePlus"
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                // Amazon
                /(alexa)webm/i,
                /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i,
                /(kf[a-z]+)( bui|\)).+silk\//i // Kindle Fire HD
            ],
            [
                MODEL,
                [
                    VENDOR,
                    AMAZON
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i // Fire Phone
            ],
            [
                [
                    MODEL,
                    /(.+)/g,
                    "Fire Phone $1"
                ],
                [
                    VENDOR,
                    AMAZON
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                // BlackBerry
                /(playbook);[-\w\),; ]+(rim)/i // BlackBerry PlayBook
            ],
            [
                MODEL,
                VENDOR,
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /\b((?:bb[a-f]|st[hv])100-\d)/i,
                /\(bb10; (\w+)/i // BlackBerry 10
            ],
            [
                MODEL,
                [
                    VENDOR,
                    BLACKBERRY
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                // Asus
                /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i
            ],
            [
                MODEL,
                [
                    VENDOR,
                    ASUS
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                / (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i
            ],
            [
                MODEL,
                [
                    VENDOR,
                    ASUS
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                // HTC
                /(nexus 9)/i // HTC Nexus 9
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "HTC"
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,
                // ZTE
                /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
                /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i // Alcatel/GeeksPhone/Nexian/Panasonic/Sony
            ],
            [
                VENDOR,
                [
                    MODEL,
                    /_/g,
                    " "
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                // Acer
                /droid.+; ([ab][1-7]-?[0178a]\d\d?)/i
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "Acer"
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                // Meizu
                /droid.+; (m[1-5] note) bui/i,
                /\bmz-([-\w]{2,})/i
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "Meizu"
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                // MIXED
                /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron|infinix|tecno)[-_ ]?([-\w]*)/i,
                // BlackBerry/BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Meizu/Motorola/Polytron
                /(hp) ([\w ]+\w)/i,
                /(asus)-?(\w+)/i,
                /(microsoft); (lumia[\w ]+)/i,
                /(lenovo)[-_ ]?([-\w]+)/i,
                /(jolla)/i,
                /(oppo) ?([\w ]+) bui/i // OPPO
            ],
            [
                VENDOR,
                MODEL,
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                /(kobo)\s(ereader|touch)/i,
                /(archos) (gamepad2?)/i,
                /(hp).+(touchpad(?!.+tablet)|tablet)/i,
                /(kindle)\/([\w\.]+)/i,
                /(nook)[\w ]+build\/(\w+)/i,
                /(dell) (strea[kpr\d ]*[\dko])/i,
                /(le[- ]+pan)[- ]+(\w{1,9}) bui/i,
                /(trinity)[- ]*(t\d{3}) bui/i,
                /(gigaset)[- ]+(q\w{1,9}) bui/i,
                /(vodafone) ([\w ]+)(?:\)| bui)/i // Vodafone
            ],
            [
                VENDOR,
                MODEL,
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /(surface duo)/i // Surface Duo
            ],
            [
                MODEL,
                [
                    VENDOR,
                    MICROSOFT
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /droid [\d\.]+; (fp\du?)(?: b|\))/i // Fairphone
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "Fairphone"
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                /(u304aa)/i // AT&T
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "AT&T"
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                /\bsie-(\w*)/i // Siemens
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "Siemens"
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                /\b(rct\w+) b/i // RCA Tablets
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "RCA"
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /\b(venue[\d ]{2,7}) b/i // Dell Venue Tablets
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "Dell"
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /\b(q(?:mv|ta)\w+) b/i // Verizon Tablet
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "Verizon"
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i // Barnes & Noble Tablet
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "Barnes & Noble"
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /\b(tm\d{3}\w+) b/i
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "NuVision"
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /\b(k88) b/i // ZTE K Series Tablet
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "ZTE"
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /\b(nx\d{3}j) b/i // ZTE Nubia
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "ZTE"
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                /\b(gen\d{3}) b.+49h/i // Swiss GEN Mobile
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "Swiss"
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                /\b(zur\d{3}) b/i // Swiss ZUR Tablet
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "Swiss"
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /\b((zeki)?tb.*\b) b/i // Zeki Tablets
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "Zeki"
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /\b([yr]\d{2}) b/i,
                /\b(dragon[- ]+touch |dt)(\w{5}) b/i // Dragon Touch Tablet
            ],
            [
                [
                    VENDOR,
                    "Dragon Touch"
                ],
                MODEL,
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /\b(ns-?\w{0,9}) b/i // Insignia Tablets
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "Insignia"
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /\b((nxa|next)-?\w{0,9}) b/i // NextBook Tablets
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "NextBook"
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i // Voice Xtreme Phones
            ],
            [
                [
                    VENDOR,
                    "Voice"
                ],
                MODEL,
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                /\b(lvtel\-)?(v1[12]) b/i // LvTel Phones
            ],
            [
                [
                    VENDOR,
                    "LvTel"
                ],
                MODEL,
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                /\b(ph-1) /i // Essential PH-1
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "Essential"
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                /\b(v(100md|700na|7011|917g).*\b) b/i // Envizen Tablets
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "Envizen"
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /\b(trio[-\w\. ]+) b/i // MachSpeed Tablets
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "MachSpeed"
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /\btu_(1491) b/i // Rotor Tablets
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "Rotor"
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /(shield[\w ]+) b/i // Nvidia Shield Tablets
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "Nvidia"
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /(sprint) (\w+)/i // Sprint Phones
            ],
            [
                VENDOR,
                MODEL,
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                /(kin\.[onetw]{3})/i // Microsoft Kin
            ],
            [
                [
                    MODEL,
                    /\./g,
                    " "
                ],
                [
                    VENDOR,
                    MICROSOFT
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                /droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i // Zebra
            ],
            [
                MODEL,
                [
                    VENDOR,
                    ZEBRA
                ],
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i
            ],
            [
                MODEL,
                [
                    VENDOR,
                    ZEBRA
                ],
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                ///////////////////
                // SMARTTVS
                ///////////////////
                /smart-tv.+(samsung)/i // Samsung
            ],
            [
                VENDOR,
                [
                    TYPE,
                    SMARTTV
                ]
            ],
            [
                /hbbtv.+maple;(\d+)/i
            ],
            [
                [
                    MODEL,
                    /^/,
                    "SmartTV"
                ],
                [
                    VENDOR,
                    SAMSUNG
                ],
                [
                    TYPE,
                    SMARTTV
                ]
            ],
            [
                /(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i // LG SmartTV
            ],
            [
                [
                    VENDOR,
                    LG
                ],
                [
                    TYPE,
                    SMARTTV
                ]
            ],
            [
                /(apple) ?tv/i // Apple TV
            ],
            [
                VENDOR,
                [
                    MODEL,
                    APPLE + " TV"
                ],
                [
                    TYPE,
                    SMARTTV
                ]
            ],
            [
                /crkey/i // Google Chromecast
            ],
            [
                [
                    MODEL,
                    CHROME + "cast"
                ],
                [
                    VENDOR,
                    GOOGLE
                ],
                [
                    TYPE,
                    SMARTTV
                ]
            ],
            [
                /droid.+aft(\w+)( bui|\))/i // Fire TV
            ],
            [
                MODEL,
                [
                    VENDOR,
                    AMAZON
                ],
                [
                    TYPE,
                    SMARTTV
                ]
            ],
            [
                /\(dtv[\);].+(aquos)/i,
                /(aquos-tv[\w ]+)\)/i // Sharp
            ],
            [
                MODEL,
                [
                    VENDOR,
                    SHARP
                ],
                [
                    TYPE,
                    SMARTTV
                ]
            ],
            [
                /(bravia[\w ]+)( bui|\))/i // Sony
            ],
            [
                MODEL,
                [
                    VENDOR,
                    SONY
                ],
                [
                    TYPE,
                    SMARTTV
                ]
            ],
            [
                /(mitv-\w{5}) bui/i // Xiaomi
            ],
            [
                MODEL,
                [
                    VENDOR,
                    XIAOMI
                ],
                [
                    TYPE,
                    SMARTTV
                ]
            ],
            [
                /Hbbtv.*(technisat) (.*);/i // TechniSAT
            ],
            [
                VENDOR,
                MODEL,
                [
                    TYPE,
                    SMARTTV
                ]
            ],
            [
                /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,
                /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i // HbbTV devices
            ],
            [
                [
                    VENDOR,
                    trim
                ],
                [
                    MODEL,
                    trim
                ],
                [
                    TYPE,
                    SMARTTV
                ]
            ],
            [
                /\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i // SmartTV from Unidentified Vendors
            ],
            [
                [
                    TYPE,
                    SMARTTV
                ]
            ],
            [
                ///////////////////
                // CONSOLES
                ///////////////////
                /(ouya)/i,
                /(nintendo) ([wids3utch]+)/i // Nintendo
            ],
            [
                VENDOR,
                MODEL,
                [
                    TYPE,
                    CONSOLE
                ]
            ],
            [
                /droid.+; (shield) bui/i // Nvidia
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "Nvidia"
                ],
                [
                    TYPE,
                    CONSOLE
                ]
            ],
            [
                /(playstation [345portablevi]+)/i // Playstation
            ],
            [
                MODEL,
                [
                    VENDOR,
                    SONY
                ],
                [
                    TYPE,
                    CONSOLE
                ]
            ],
            [
                /\b(xbox(?: one)?(?!; xbox))[\); ]/i // Microsoft Xbox
            ],
            [
                MODEL,
                [
                    VENDOR,
                    MICROSOFT
                ],
                [
                    TYPE,
                    CONSOLE
                ]
            ],
            [
                ///////////////////
                // WEARABLES
                ///////////////////
                /((pebble))app/i // Pebble
            ],
            [
                VENDOR,
                MODEL,
                [
                    TYPE,
                    WEARABLE
                ]
            ],
            [
                /(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i // Apple Watch
            ],
            [
                MODEL,
                [
                    VENDOR,
                    APPLE
                ],
                [
                    TYPE,
                    WEARABLE
                ]
            ],
            [
                /droid.+; (glass) \d/i // Google Glass
            ],
            [
                MODEL,
                [
                    VENDOR,
                    GOOGLE
                ],
                [
                    TYPE,
                    WEARABLE
                ]
            ],
            [
                /droid.+; (wt63?0{2,3})\)/i
            ],
            [
                MODEL,
                [
                    VENDOR,
                    ZEBRA
                ],
                [
                    TYPE,
                    WEARABLE
                ]
            ],
            [
                /(quest( 2| pro)?)/i // Oculus Quest
            ],
            [
                MODEL,
                [
                    VENDOR,
                    FACEBOOK
                ],
                [
                    TYPE,
                    WEARABLE
                ]
            ],
            [
                ///////////////////
                // EMBEDDED
                ///////////////////
                /(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i // Tesla
            ],
            [
                VENDOR,
                [
                    TYPE,
                    EMBEDDED
                ]
            ],
            [
                /(aeobc)\b/i // Echo Dot
            ],
            [
                MODEL,
                [
                    VENDOR,
                    AMAZON
                ],
                [
                    TYPE,
                    EMBEDDED
                ]
            ],
            [
                ////////////////////
                // MIXED (GENERIC)
                ///////////////////
                /droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i // Android Phones from Unidentified Vendors
            ],
            [
                MODEL,
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                /droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i // Android Tablets from Unidentified Vendors
            ],
            [
                MODEL,
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i // Unidentifiable Tablet
            ],
            [
                [
                    TYPE,
                    TABLET
                ]
            ],
            [
                /(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i // Unidentifiable Mobile
            ],
            [
                [
                    TYPE,
                    MOBILE
                ]
            ],
            [
                /(android[-\w\. ]{0,9});.+buil/i // Generic Android Device
            ],
            [
                MODEL,
                [
                    VENDOR,
                    "Generic"
                ]
            ]
        ],
        engine: [
            [
                /windows.+ edge\/([\w\.]+)/i // EdgeHTML
            ],
            [
                VERSION,
                [
                    NAME,
                    EDGE + "HTML"
                ]
            ],
            [
                /webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i // Blink
            ],
            [
                VERSION,
                [
                    NAME,
                    "Blink"
                ]
            ],
            [
                /(presto)\/([\w\.]+)/i,
                /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,
                /ekioh(flow)\/([\w\.]+)/i,
                /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,
                /(icab)[\/ ]([23]\.[\d\.]+)/i,
                /\b(libweb)/i
            ],
            [
                NAME,
                VERSION
            ],
            [
                /rv\:([\w\.]{1,9})\b.+(gecko)/i // Gecko
            ],
            [
                VERSION,
                NAME
            ]
        ],
        os: [
            [
                // Windows
                /microsoft (windows) (vista|xp)/i // Windows (iTunes)
            ],
            [
                NAME,
                VERSION
            ],
            [
                /(windows) nt 6\.2; (arm)/i,
                /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i,
                /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i
            ],
            [
                NAME,
                [
                    VERSION,
                    strMapper,
                    windowsVersionMap
                ]
            ],
            [
                /(win(?=3|9|n)|win 9x )([nt\d\.]+)/i
            ],
            [
                [
                    NAME,
                    "Windows"
                ],
                [
                    VERSION,
                    strMapper,
                    windowsVersionMap
                ]
            ],
            [
                // iOS/macOS
                /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,
                /(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i,
                /cfnetwork\/.+darwin/i
            ],
            [
                [
                    VERSION,
                    /_/g,
                    "."
                ],
                [
                    NAME,
                    "iOS"
                ]
            ],
            [
                /(mac os x) ?([\w\. ]*)/i,
                /(macintosh|mac_powerpc\b)(?!.+haiku)/i // Mac OS
            ],
            [
                [
                    NAME,
                    MAC_OS
                ],
                [
                    VERSION,
                    /_/g,
                    "."
                ]
            ],
            [
                // Mobile OSes
                /droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i // Android-x86/HarmonyOS
            ],
            [
                VERSION,
                NAME
            ],
            [
                /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,
                /(blackberry)\w*\/([\w\.]*)/i,
                /(tizen|kaios)[\/ ]([\w\.]+)/i,
                /\((series40);/i // Series 40
            ],
            [
                NAME,
                VERSION
            ],
            [
                /\(bb(10);/i // BlackBerry 10
            ],
            [
                VERSION,
                [
                    NAME,
                    BLACKBERRY
                ]
            ],
            [
                /(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i // Symbian
            ],
            [
                VERSION,
                [
                    NAME,
                    "Symbian"
                ]
            ],
            [
                /mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i // Firefox OS
            ],
            [
                VERSION,
                [
                    NAME,
                    FIREFOX + " OS"
                ]
            ],
            [
                /web0s;.+rt(tv)/i,
                /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i // WebOS
            ],
            [
                VERSION,
                [
                    NAME,
                    "webOS"
                ]
            ],
            [
                /watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i // watchOS
            ],
            [
                VERSION,
                [
                    NAME,
                    "watchOS"
                ]
            ],
            [
                // Google Chromecast
                /crkey\/([\d\.]+)/i // Google Chromecast
            ],
            [
                VERSION,
                [
                    NAME,
                    CHROME + "cast"
                ]
            ],
            [
                /(cros) [\w]+(?:\)| ([\w\.]+)\b)/i // Chromium OS
            ],
            [
                [
                    NAME,
                    CHROMIUM_OS
                ],
                VERSION
            ],
            [
                // Smart TVs
                /panasonic;(viera)/i,
                /(netrange)mmh/i,
                /(nettv)\/(\d+\.[\w\.]+)/i,
                // Console
                /(nintendo|playstation) ([wids345portablevuch]+)/i,
                /(xbox); +xbox ([^\);]+)/i,
                // Other
                /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,
                /(mint)[\/\(\) ]?(\w*)/i,
                /(mageia|vectorlinux)[; ]/i,
                /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
                // Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware/Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus/Raspbian/Plan9/Minix/RISCOS/Contiki/Deepin/Manjaro/elementary/Sabayon/Linspire
                /(hurd|linux) ?([\w\.]*)/i,
                /(gnu) ?([\w\.]*)/i,
                /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,
                /(haiku) (\w+)/i // Haiku
            ],
            [
                NAME,
                VERSION
            ],
            [
                /(sunos) ?([\w\.\d]*)/i // Solaris
            ],
            [
                [
                    NAME,
                    "Solaris"
                ],
                VERSION
            ],
            [
                /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,
                /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,
                /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,
                /(unix) ?([\w\.]*)/i // UNIX
            ],
            [
                NAME,
                VERSION
            ]
        ]
    };
    /////////////////
    // Constructor
    ////////////////
    var UAParser = function(ua, extensions) {
        if (typeof ua === OBJ_TYPE) {
            extensions = ua;
            ua = undefined;
        }
        if (!(this instanceof UAParser)) return new UAParser(ua, extensions).getResult();
        var _navigator = typeof window1 !== UNDEF_TYPE && window1.navigator ? window1.navigator : undefined;
        var _ua = ua || (_navigator && _navigator.userAgent ? _navigator.userAgent : EMPTY);
        var _uach = _navigator && _navigator.userAgentData ? _navigator.userAgentData : undefined;
        var _rgxmap = extensions ? extend(regexes, extensions) : regexes;
        var _isSelfNav = _navigator && _navigator.userAgent == _ua;
        this.getBrowser = function() {
            var _browser = {};
            _browser[NAME] = undefined;
            _browser[VERSION] = undefined;
            rgxMapper.call(_browser, _ua, _rgxmap.browser);
            _browser[MAJOR] = majorize(_browser[VERSION]);
            // Brave-specific detection
            if (_isSelfNav && _navigator && _navigator.brave && typeof _navigator.brave.isBrave == FUNC_TYPE) _browser[NAME] = "Brave";
            return _browser;
        };
        this.getCPU = function() {
            var _cpu = {};
            _cpu[ARCHITECTURE] = undefined;
            rgxMapper.call(_cpu, _ua, _rgxmap.cpu);
            return _cpu;
        };
        this.getDevice = function() {
            var _device = {};
            _device[VENDOR] = undefined;
            _device[MODEL] = undefined;
            _device[TYPE] = undefined;
            rgxMapper.call(_device, _ua, _rgxmap.device);
            if (_isSelfNav && !_device[TYPE] && _uach && _uach.mobile) _device[TYPE] = MOBILE;
            // iPadOS-specific detection: identified as Mac, but has some iOS-only properties
            if (_isSelfNav && _device[MODEL] == "Macintosh" && _navigator && typeof _navigator.standalone !== UNDEF_TYPE && _navigator.maxTouchPoints && _navigator.maxTouchPoints > 2) {
                _device[MODEL] = "iPad";
                _device[TYPE] = TABLET;
            }
            return _device;
        };
        this.getEngine = function() {
            var _engine = {};
            _engine[NAME] = undefined;
            _engine[VERSION] = undefined;
            rgxMapper.call(_engine, _ua, _rgxmap.engine);
            return _engine;
        };
        this.getOS = function() {
            var _os = {};
            _os[NAME] = undefined;
            _os[VERSION] = undefined;
            rgxMapper.call(_os, _ua, _rgxmap.os);
            if (_isSelfNav && !_os[NAME] && _uach && _uach.platform != "Unknown") _os[NAME] = _uach.platform.replace(/chrome os/i, CHROMIUM_OS).replace(/macos/i, MAC_OS); // backward compatibility
            return _os;
        };
        this.getResult = function() {
            return {
                ua: this.getUA(),
                browser: this.getBrowser(),
                engine: this.getEngine(),
                os: this.getOS(),
                device: this.getDevice(),
                cpu: this.getCPU()
            };
        };
        this.getUA = function() {
            return _ua;
        };
        this.setUA = function(ua) {
            _ua = typeof ua === STR_TYPE && ua.length > UA_MAX_LENGTH ? trim(ua, UA_MAX_LENGTH) : ua;
            return this;
        };
        this.setUA(_ua);
        return this;
    };
    UAParser.VERSION = LIBVERSION;
    UAParser.BROWSER = enumerize([
        NAME,
        VERSION,
        MAJOR
    ]);
    UAParser.CPU = enumerize([
        ARCHITECTURE
    ]);
    UAParser.DEVICE = enumerize([
        MODEL,
        VENDOR,
        TYPE,
        CONSOLE,
        MOBILE,
        SMARTTV,
        TABLET,
        WEARABLE,
        EMBEDDED
    ]);
    UAParser.ENGINE = UAParser.OS = enumerize([
        NAME,
        VERSION
    ]);
    ///////////
    // Export
    //////////
    // check js environment
    if (typeof exports !== UNDEF_TYPE) {
        // nodejs env
        if ("object" !== UNDEF_TYPE && module.exports) exports = module.exports = UAParser;
        exports.UAParser = UAParser;
    } else {
        // requirejs env (optional)
        if (typeof define === FUNC_TYPE && define.amd) define(function() {
            return UAParser;
        });
        else if (typeof window1 !== UNDEF_TYPE) // browser env
        window1.UAParser = UAParser;
    }
    // jQuery/Zepto specific (optional)
    // Note:
    //   In AMD env the global scope should be kept clean, but jQuery is an exception.
    //   jQuery always exports to global scope, unless jQuery.noConflict(true) is used,
    //   and we should catch that.
    var $ = typeof window1 !== UNDEF_TYPE && (window1.jQuery || window1.Zepto);
    if ($ && !$.ua) {
        var parser = new UAParser();
        $.ua = parser.getResult();
        $.ua.get = function() {
            return parser.getUA();
        };
        $.ua.set = function(ua) {
            parser.setUA(ua);
            var result = parser.getResult();
            for(var prop in result)$.ua[prop] = result[prop];
        };
    }
})(typeof window === "object" ? window : this);

});

parcelRegister("jYHT1", function(module, exports) {

$parcel$export(module.exports, "LPage", () => $2cc455737e593565$export$1c5d2c5bc45d4fb8);

var $lAN3N = parcelRequire("lAN3N");

var $4WfNn = parcelRequire("4WfNn");

var $hZ1Kn = parcelRequire("hZ1Kn");

var $7uA4J = parcelRequire("7uA4J");

var $1CiVi = parcelRequire("1CiVi");
const $2cc455737e593565$export$1c5d2c5bc45d4fb8 = ()=>{
    const p = (0, $4WfNn.useGlobal)((0, $hZ1Kn.LiveGlobal), "LIVE");
    const mode = p.mode;
    let childs = Object.values(p.page?.content_tree.childs || []);
    if (p.layout.section && p.layout.content) childs = [
        p.layout.section
    ];
    const rootChilds = Object.values(childs).map((e)=>e.id);
    return /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
        className: cx("relative flex flex-1 items-center justify-center"),
        children: /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
            className: cx("absolute flex flex-col items-stretch flex-1 bg-white ", mode === "mobile" ? css`
                @media (min-width: 768px) {
                  border-left: 1px solid #ccc;
                  border-right: 1px solid #ccc;
                  width: 375px;
                  top: 0px;
                  overflow-x: hidden;
                  overflow-y: auto;
                  bottom: 0px;
                }
                @media (max-width: 767px) {
                  left: 0px;
                  right: 0px;
                  top: 0px;
                  bottom: 0px;
                  overflow-y: auto;
                }
              ` : "inset-0 overflow-auto", css`
            contain: content;
          `),
            children: p.status === "ready" || p.status === "tree-rebuild" ? rootChilds?.map((id)=>/*#__PURE__*/ (0, $lAN3N.jsx)((0, $7uA4J.LSection), {
                    id: id
                }, id)) : /*#__PURE__*/ (0, $lAN3N.jsx)((0, $1CiVi.Loading), {})
        })
    });
};
const $2cc455737e593565$export$cf7f6ce8f07b1290 = css`
  background-color: white;
  background-image: linear-gradient(45deg, #fafafa 25%, transparent 25%),
    linear-gradient(-45deg, #fafafa 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #fafafa 75%),
    linear-gradient(-45deg, transparent 75%, #fafafa 75%);

  background-size: 20px 20px;
  background-position:
    0 0,
    0 10px,
    10px -10px,
    -10px 0px;
`;

});
parcelRegister("hZ1Kn", function(module, exports) {

$parcel$export(module.exports, "LiveGlobal", () => $0568cc25f9d19f41$export$7cc954038552be12);

var $9hNJ9 = parcelRequire("9hNJ9");
const $0568cc25f9d19f41$export$7cc954038552be12 = {
    prod: false,
    loader: undefined,
    mode: "",
    layout: {
        section: null,
        content: null
    },
    status: "init",
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
    page: null,
    mpage: null,
    mpageLoaded: null,
    pagePreload: {},
    pages: {},
    route: (0, $9hNJ9.createRouter)(),
    treeMeta: {},
    comps: {
        pending: {},
        resolve: {},
        doc: {},
        all: {}
    },
    script: {
        db: null,
        api: null
    },
    compInstance: {},
    ws: null,
    wsRetry: {
        fast: false,
        localIP: false,
        disabled: false,
        reconnecting: false
    }
};

});

parcelRegister("7uA4J", function(module, exports) {

$parcel$export(module.exports, "LSection", () => $5e3dfedcbd5bbe3d$export$9352667e0ea203fb);

var $lAN3N = parcelRequire("lAN3N");

var $SAzoy = parcelRequire("SAzoy");

var $aYpbT = parcelRequire("aYpbT");
const $5e3dfedcbd5bbe3d$export$9352667e0ea203fb = ({ id: id })=>{
    return /*#__PURE__*/ (0, $lAN3N.jsx)((0, $aYpbT.LRender), {
        id: id,
        children: (childs)=>childs.map((e)=>{
                return /*#__PURE__*/ (0, $lAN3N.jsx)((0, $SAzoy.LItem), {
                    id: e.id
                }, e.id);
            })
    });
};

});
parcelRegister("SAzoy", function(module, exports) {

$parcel$export(module.exports, "LItem", () => $149b0b9b2f0a4560$export$f22e5fe30800c78b);

var $lAN3N = parcelRequire("lAN3N");

var $aYpbT = parcelRequire("aYpbT");

var $kasFf = parcelRequire("kasFf");
const $149b0b9b2f0a4560$export$f22e5fe30800c78b = ({ id: id, fromProp: fromProp })=>{
    return /*#__PURE__*/ (0, $lAN3N.jsx)((0, $aYpbT.LRender), {
        id: id,
        fromProp: fromProp,
        children: (childs)=>{
            return childs.map((e)=>{
                if (e.type === "item") return /*#__PURE__*/ (0, $lAN3N.jsx)($149b0b9b2f0a4560$export$f22e5fe30800c78b, {
                    id: e.id,
                    fromProp: fromProp
                }, e.id);
                else return /*#__PURE__*/ (0, $lAN3N.jsx)((0, $kasFf.LText), {
                    id: e.id,
                    fromProp: fromProp
                }, e.id);
            });
        }
    });
};

});
parcelRegister("aYpbT", function(module, exports) {

$parcel$export(module.exports, "LRender", () => $2e7d5055e6eefe34$export$3edef45c162644af);

var $lAN3N = parcelRequire("lAN3N");

var $63SH6 = parcelRequire("63SH6");

var $4WfNn = parcelRequire("4WfNn");

var $cc0Z8 = parcelRequire("cc0Z8");

var $bjM6F = parcelRequire("bjM6F");

var $hZ1Kn = parcelRequire("hZ1Kn");

var $gte4T = parcelRequire("gte4T");

var $59J0C = parcelRequire("59J0C");

var $a3EMm = parcelRequire("a3EMm");

var $kasFf = parcelRequire("kasFf");
const $2e7d5055e6eefe34$export$3edef45c162644af = ({ id: id, children: children })=>{
    const [_, render] = (0, $63SH6.useState)({});
    const p = (0, $4WfNn.useGlobal)((0, $hZ1Kn.LiveGlobal), "LIVE");
    const meta = p.treeMeta[id];
    if (!meta) return null;
    meta.render = ()=>{
        render({});
    };
    let item = meta.item;
    if (item.hidden) return null;
    if (meta.comp?.id) {
        const comp = meta.comp;
        let props = {};
        let cprops = {};
        if (meta.comp.mcomp) {
            props = meta.comp.mcomp.get("component")?.get("props")?.toJSON();
            cprops = Object.entries(props).sort((a, b)=>{
                return a[1].idx - b[1].idx;
            });
        } else {
            props = structuredClone(p.comps.all[meta.comp.id]?.content_tree.component?.props || {});
            cprops = Object.entries(props);
        }
        comp.propval = (0, $59J0C.treePropEval)(p, meta, cprops);
    }
    let _children = null;
    if (children) {
        if (item.type === "text") _children = children([]);
        else _children = children(item.childs || []);
    }
    meta.className = (0, $cc0Z8.produceCSS)(item, {
        mode: p.mode
    });
    const className = meta.className;
    const adv = item.adv;
    if (!(adv?.jsBuilt && adv?.js) && (meta.scopeAttached || meta.comp)) return (0, $a3EMm.treeScopeEval)(p, meta, _children, `render(React.createElement("div",{...props},children));`);
    if (adv) {
        if (adv.html) {
            const html = $2e7d5055e6eefe34$export$1a32bf6229c258c0(className, adv);
            if (html) return html;
        } else if (adv.jsBuilt && adv.js) {
            const el = (0, $a3EMm.treeScopeEval)(p, meta, _children, adv.jsBuilt);
            return el;
        }
    }
    const linktag = (0, $bjM6F.responsiveVal)(item, "linktag", p.mode, {});
    const isComponent = item.type === "item" && item.component?.id;
    if (linktag && linktag.link && !isComponent) {
        let href = linktag.link || "";
        if (href.startsWith("/")) {
            (0, $gte4T.preload)(p, href);
            if ((location.pathname.startsWith("/preview/") || location.pathname.startsWith("/site/")) && [
                "localhost",
                "127.0.0.1",
                "prasi.app"
            ].includes(location.hostname)) {
                const parts = location.pathname.split("/");
                if (parts.length >= 3) href = `/${parts[1]}/${parts[2]}${href}`;
            }
        }
        const props = {
            className: className,
            href: href,
            onClick: (e)=>{
                e.preventDefault();
                if (href.startsWith("/")) navigate(href);
                else location.href = href;
            }
        };
        if (item.type === "text") return /*#__PURE__*/ (0, $lAN3N.jsx)("a", {
            ...props,
            dangerouslySetInnerHTML: {
                __html: item.html || item.text
            }
        });
        return /*#__PURE__*/ (0, $lAN3N.jsx)("a", {
            ...props,
            children: _children
        });
    }
    if (item.type === "text") return /*#__PURE__*/ (0, $lAN3N.jsx)((0, $kasFf.LTextInternal), {
        className: className,
        item: item,
        p: p,
        _children: item.html || item.text
    }, item.id);
    return /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
        className: className,
        children: _children
    });
};
const $2e7d5055e6eefe34$export$1a32bf6229c258c0 = (className, adv)=>{
    if (adv.html) return /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
        className: className,
        dangerouslySetInnerHTML: {
            __html: adv.html
        }
    });
    return null;
};

});
parcelRegister("gte4T", function(module, exports) {

$parcel$export(module.exports, "routeLive", () => $5d4e4b422ff4eed5$export$eb2e48875d156f73);
$parcel$export(module.exports, "preload", () => $5d4e4b422ff4eed5$export$513ccb98c53b8039);
$parcel$export(module.exports, "extractNavigate", () => $5d4e4b422ff4eed5$export$e9c3f19080375575);

var $iak4Q = parcelRequire("iak4Q");

var $3i93m = parcelRequire("3i93m");

var $iEVTn = parcelRequire("iEVTn");

var $bxUNj = parcelRequire("bxUNj");

var $hDTLn = parcelRequire("hDTLn");

var $fcu5c = parcelRequire("fcu5c");
const $5d4e4b422ff4eed5$var$cacheMeta = {};
const $5d4e4b422ff4eed5$export$eb2e48875d156f73 = (p, pathname)=>{
    if (p.status !== "loading") {
        let page_id = "";
        if ((0, $iak4Q.default)(pathname.substring(1))) page_id = pathname.substring(1);
        else {
            const found = p.route.lookup(pathname);
            if (!found) p.status = "not-found";
            else {
                if (!(0, $3i93m.w).params) (0, $3i93m.w).params = {};
                if (found.params) for (const [k, v] of Object.entries(found.params))(0, $3i93m.w).params[k] = v;
                page_id = found.id;
            }
        }
        if (page_id) {
            window.prasiPageID = page_id;
            const promises = [];
            let hasCache = false;
            if (page_id !== p.page?.id) {
                if (p.page) $5d4e4b422ff4eed5$var$cacheMeta[p.page.id] = p.treeMeta;
                p.page = p.pages[page_id];
                if (p.page && $5d4e4b422ff4eed5$var$cacheMeta[p.page.id]) {
                    p.treeMeta = $5d4e4b422ff4eed5$var$cacheMeta[p.page.id];
                    hasCache = true;
                } else p.treeMeta = {};
            }
            if (!p.page || !p.page.content_tree) {
                promises.push($5d4e4b422ff4eed5$var$loadNpmPage(p, page_id));
                p.status = "loading";
                if (!p.prod) promises.push($5d4e4b422ff4eed5$var$streamPage(p, page_id));
                else promises.push($5d4e4b422ff4eed5$var$loadPage(p, page_id));
            } else if (!p.prod) $5d4e4b422ff4eed5$var$streamPage(p, page_id);
            if (promises.length > 0) Promise.all(promises).then(async ()=>{
                await $5d4e4b422ff4eed5$var$pageLoaded(p);
                p.status = "ready";
                p.render();
            });
            else {
                if (p.prod && !hasCache && !$5d4e4b422ff4eed5$var$firstRender[page_id]) {
                    $5d4e4b422ff4eed5$var$firstRender[page_id] = true;
                    $5d4e4b422ff4eed5$var$pageLoaded(p).then(p.render);
                } else if (!p.prod) $5d4e4b422ff4eed5$var$pageLoaded(p).then(()=>{
                    if ($5d4e4b422ff4eed5$var$stream.page_id !== page_id) {
                        $5d4e4b422ff4eed5$var$stream.page_id = page_id;
                        p.render();
                    }
                });
                else $5d4e4b422ff4eed5$var$pageLoaded(p);
            }
        }
    }
};
const $5d4e4b422ff4eed5$var$firstRender = {};
const $5d4e4b422ff4eed5$var$pageLoaded = async (p)=>{
    if (p.page) {
        await (0, $fcu5c.rebuildTree)(p, {
            render: false,
            note: "render",
            reset: false
        });
        p.status = "ready";
    } else p.status = "not-found";
};
const $5d4e4b422ff4eed5$export$513ccb98c53b8039 = async (p, pathname)=>{
    const found = p.route.lookup(pathname);
    if (found) {
        if (!p.pages[found.id] && !p.pagePreload[found.id]) {
            p.pagePreload[found.id] = true;
            const dbpage = await p.loader.page(p, found.id);
            if (dbpage) {
                p.pages[dbpage.id] = dbpage;
                const page = p.pages[dbpage.id];
                if (page && page.content_tree) await (0, $bxUNj.loadComponent)(p, page.content_tree);
                delete p.pagePreload[found.id];
                await $5d4e4b422ff4eed5$var$loadNpmPage(p, dbpage.id);
            }
        }
    }
};
const $5d4e4b422ff4eed5$var$npmPageLoaded = {};
const $5d4e4b422ff4eed5$var$loadNpmPage = async (p, id)=>{
    try {
        if (!$5d4e4b422ff4eed5$var$npmPageLoaded[id]) {
            $5d4e4b422ff4eed5$var$npmPageLoaded[id] = true;
            if (typeof window.exports === "undefined") window.exports = {};
            await (0, $iEVTn.default)(p.loader.npm(p, "page", id));
        }
    } catch (e) {
        console.error(e);
    }
};
const $5d4e4b422ff4eed5$var$loading = {};
const $5d4e4b422ff4eed5$var$loadPage = async (p, id)=>{
    if (!$5d4e4b422ff4eed5$var$loading[id]) $5d4e4b422ff4eed5$var$loading[id] = p.loader.page(p, id);
    const page = await $5d4e4b422ff4eed5$var$loading[id];
    if (page) {
        p.pages[page.id] = {
            id: page.id,
            url: page.url,
            name: page.name,
            content_tree: page.content_tree,
            js: page.js_compiled
        };
        const cur = p.pages[page.id];
        if (cur && cur.content_tree) await (0, $bxUNj.loadComponent)(p, cur.content_tree);
    }
};
const $5d4e4b422ff4eed5$var$stream = {
    page_id: ""
};
const $5d4e4b422ff4eed5$var$streamPage = (p, id)=>{
    return new Promise(async (resolve)=>{
        await (0, $hDTLn.liveWS)(p);
        p.mpageLoaded = async (mpage)=>{
            const dbpage = mpage.getMap("map").toJSON();
            p.pages[dbpage.id] = {
                id: dbpage.id,
                url: dbpage.url,
                name: dbpage.name,
                content_tree: dbpage.content_tree,
                js: dbpage.js_compiled
            };
            const page = p.pages[dbpage.id];
            if (page && page.content_tree) await (0, $bxUNj.loadComponent)(p, page.content_tree);
            resolve();
        };
        (0, $hDTLn.wsend)(p, JSON.stringify({
            type: "get_page",
            page_id: id
        }));
    });
};
const $5d4e4b422ff4eed5$export$e9c3f19080375575 = (str)=>{
    let i = 0;
    const nstr = "navigate(";
    const founds = [];
    let lasti = 0;
    while(true){
        const start = str.indexOf(nstr, i);
        lasti = i;
        if (start >= 0) {
            const char = str[start + nstr.length];
            if (char === '"' || char === "'" || char === "`") {
                const end = str.indexOf(`${char})`, start + nstr.length + 1);
                const text = str.substring(start + nstr.length + 1, end);
                i = end + 3;
                founds.push(text);
            }
        }
        if (lasti === i) break;
    }
    return founds;
};

});

parcelRegister("59J0C", function(module, exports) {

$parcel$export(module.exports, "treePropEval", () => $5b42ff23e42c32d5$export$2f4fe33b8bea4711);

var $lAN3N = parcelRequire("lAN3N");

var $isbAn = parcelRequire("isbAn");

var $a3EMm = parcelRequire("a3EMm");

var $SAzoy = parcelRequire("SAzoy");

var $gte4T = parcelRequire("gte4T");
const $5b42ff23e42c32d5$var$jsxProps = {};
const $5b42ff23e42c32d5$export$2f4fe33b8bea4711 = (p, meta, cprops)=>{
    if (meta.item.type === "item" && meta.item.component) {
        if (p.site.api_url) {
            if (!p.script.db) p.script.db = (0, $isbAn.createDB)(p.site.api_url);
            if (!p.script.api) p.script.api = (0, $isbAn.createAPI)(p.site.api_url);
        }
        const props = meta.item.component.props;
        const w = window;
        const finalScope = (0, $a3EMm.mergeScopeUpwards)(p, meta);
        const args = {
            ...w.exports,
            ...finalScope,
            db: p.script.db,
            api: p.script.api
        };
        const result = {};
        for (const [name, _prop] of cprops){
            const prop = props[name] || _prop;
            let value = null;
            if (prop.valueBuilt) {
                const fn = new Function(...Object.keys(args), `return ${prop.valueBuilt}`);
                try {
                    value = fn(...Object.values(args)) || null;
                    const navs = (0, $gte4T.extractNavigate)(prop.valueBuilt || "");
                    if (navs.length > 0) navs.map((nav)=>(0, $gte4T.preload)(p, nav));
                } catch (e) {
                    const cname = meta.item.name;
                    console.warn(e);
                    console.warn(`ERROR in Component [${cname}], in prop [${name}]:\n ` + prop.value);
                }
            }
            if (prop.meta?.type === "content-element") {
                if (!(typeof value === "object" && !!value && value._jsx)) {
                    const id = `${meta.item.id}-${name}`;
                    if (!$5b42ff23e42c32d5$var$jsxProps[id]) $5b42ff23e42c32d5$var$jsxProps[id] = {
                        _jsx: true,
                        Comp: ({ parent_id: parent_id })=>{
                            if (prop.content) {
                                const meta = p.treeMeta[parent_id];
                                const scopes = [];
                                (0, $a3EMm.mergeScopeUpwards)(p, meta, {
                                    each: (m, val)=>{
                                        scopes.push({
                                            meta: m,
                                            value: val
                                        });
                                        return true;
                                    }
                                });
                                if (p.treeMeta[prop.content.id]) p.treeMeta[prop.content.id].scopeAttached = scopes;
                                return /*#__PURE__*/ (0, $lAN3N.jsx)((0, $SAzoy.LItem), {
                                    id: prop.content.id,
                                    fromProp: true
                                });
                            }
                            return /*#__PURE__*/ (0, $lAN3N.jsx)((0, $lAN3N.Fragment), {});
                        }
                    };
                    value = $5b42ff23e42c32d5$var$jsxProps[id];
                }
            }
            result[name] = value;
        }
        return result;
    }
};

});
parcelRegister("a3EMm", function(module, exports) {

$parcel$export(module.exports, "treeScopeEval", () => $0eb3d53d15044918$export$4d9c1e8573de8067);
$parcel$export(module.exports, "mergeScopeUpwards", () => $0eb3d53d15044918$export$f4fa9221fd311771);

var $lAN3N = parcelRequire("lAN3N");

var $63SH6 = parcelRequire("63SH6");

var $4WfNn = parcelRequire("4WfNn");

var $isbAn = parcelRequire("isbAn");

var $KfUSb = parcelRequire("KfUSb");

var $gte4T = parcelRequire("gte4T");
const $0eb3d53d15044918$export$bc6cda806d54f983 = false;
const $0eb3d53d15044918$export$4d9c1e8573de8067 = (p, meta, children, js)=>{
    const className = meta.className;
    let item = meta.item;
    const adv = item.adv;
    let args = {};
    try {
        if (!meta.memoize) meta.memoize = {
            Local: $0eb3d53d15044918$var$createLocal(p, meta),
            PassProp: $0eb3d53d15044918$var$createPassProp(p, meta)
        };
        if (typeof adv?.js === "string") {
            const navs = (0, $gte4T.extractNavigate)(adv.js || "");
            if (navs.length > 0) navs.map((nav)=>(0, $gte4T.preload)(p, nav));
        }
        // prepare args
        if (p.site.api_url) {
            if (!p.script.db) p.script.db = (0, $isbAn.createDB)(p.site.api_url);
            if (!p.script.api) p.script.api = (0, $isbAn.createAPI)(p.site.api_url);
        }
        const w = window;
        const finalScope = $0eb3d53d15044918$export$f4fa9221fd311771(p, meta);
        for (const [k, v] of Object.entries(finalScope))if (v && typeof v === "object") {
            const t = v;
            if (t._jsx && t.Comp) finalScope[k] = /*#__PURE__*/ (0, $lAN3N.jsx)(t.Comp, {
                parent_id: meta.item.id
            });
        }
        const output = {
            jsx: null
        };
        args = {
            ...w.exports,
            ...finalScope,
            ...meta.memoize,
            db: p.script.db,
            api: p.script.api,
            children: children,
            props: {
                className: className
            },
            useEffect: (0, $63SH6.useEffect),
            render: (jsx)=>{
                output.jsx = /*#__PURE__*/ (0, $lAN3N.jsx)((0, $KfUSb.ErrorBox), {
                    children: /*#__PURE__*/ (0, $lAN3N.jsx)((0, $63SH6.Suspense), {
                        children: jsx
                    })
                });
            }
        };
        try {
            // execute
            const fn = new Function(...Object.keys(args), js);
            const res = fn(...Object.values(args));
            if (res instanceof Promise) res.catch((e)=>{
                console.warn(e);
                console.warn((`ERROR in ${item.type} [${item.name}]:\n ` + (adv?.js || "")).trim());
                console.warn(`Available var:`, args, `\n\n`);
            });
        } catch (e) {
            console.error(e);
        }
        return output.jsx;
    } catch (e) {
        console.warn(e);
        console.warn((`ERROR in ${item.type} [${item.name}]:\n ` + (adv?.js || "")).trim());
        console.warn(`Available var:`, args, `\n\n`);
    }
};
const $0eb3d53d15044918$export$f4fa9221fd311771 = (p, meta, opt)=>{
    if (!meta.scope) meta.scope = {};
    let cur = meta;
    const finalScope = {};
    while(cur){
        let scope = null;
        if (cur.scopeAttached) {
            for (const s of cur.scopeAttached)if (s.value) {
                for (const [k, v] of Object.entries(s.value))if (typeof finalScope[k] === "undefined") finalScope[k] = v;
                if (opt?.each) {
                    if (!opt.each(s.meta, s.value)) break;
                }
            }
        }
        if (cur.scope || cur.comp?.propval) {
            scope = {
                ...cur.scope,
                ...cur.comp?.propval
            };
            for (const [k, v] of Object.entries(scope))if (typeof finalScope[k] === "undefined") finalScope[k] = v;
            if (opt?.each) {
                if (!opt.each(cur, scope)) break;
            }
        }
        cur = p.treeMeta[cur.parent_id];
    }
    return finalScope;
};
const $0eb3d53d15044918$var$createPassProp = (p, meta)=>{
    return (arg)=>{
        if (!meta.scope) meta.scope = {};
        for (const [k, v] of Object.entries(arg)){
            if (k === "children") continue;
            meta.scope[k] = v;
        }
        return arg.children;
    };
};
const $0eb3d53d15044918$var$cachedLocal = {};
const $0eb3d53d15044918$var$cachedPath = {};
const $0eb3d53d15044918$var$createLocal = (p, meta)=>{
    const Local = ({ name: name, value: value, effect: effect, children: children, hook: hook, deps: deps, cache: cache })=>{
        if (!meta.scope) meta.scope = {};
        const genScope = ()=>{
            try {
                const nval = (0, $4WfNn.deepClone)(value);
                const render = ()=>{
                    if (meta.render) meta.render();
                    else p.render();
                };
                if (!meta.scope[name]) meta.scope[name] = {
                    ...nval,
                    render: render
                };
                else {
                    for (const [k, v] of Object.entries(nval))meta.scope[name][k] = v;
                    meta.scope[name].render = render;
                }
            } catch (e) {
                console.warn(e);
            }
        };
        const page_id = p.page?.id;
        if (page_id) {
            if (!$0eb3d53d15044918$var$cachedLocal[page_id]) $0eb3d53d15044918$var$cachedLocal[page_id] = {};
            if (!$0eb3d53d15044918$var$cachedPath[page_id]) $0eb3d53d15044918$var$cachedPath[page_id] = {};
            const itemid = meta.item.id;
            if ($0eb3d53d15044918$var$cachedLocal[page_id][itemid]) {
                if (cache === false && $0eb3d53d15044918$var$cachedPath[page_id][itemid] !== location.href) {
                    $0eb3d53d15044918$var$cachedPath[page_id][itemid] = location.href;
                    genScope();
                    $0eb3d53d15044918$var$cachedLocal[page_id][itemid] = meta.scope[name];
                } else {
                    meta.scope[name] = $0eb3d53d15044918$var$cachedLocal[page_id][itemid];
                    meta.scope[name].render = ()=>{
                        if (meta.render) meta.render();
                        else p.render();
                    };
                }
            } else {
                genScope();
                $0eb3d53d15044918$var$cachedLocal[page_id][itemid] = meta.scope[name];
                $0eb3d53d15044918$var$cachedPath[page_id][itemid] = location.href;
            }
        }
        if (typeof hook === "function") try {
            hook(meta.scope[name]);
        } catch (e) {
            console.warn(e);
        }
        (0, $63SH6.useEffect)(()=>{
            if (effect) try {
                effect(meta.scope[name]);
            } catch (e) {
                console.warn(e);
            }
        }, [
            ...deps || [],
            location.href
        ]);
        return children;
    };
    return Local;
};

});


parcelRegister("kasFf", function(module, exports) {

$parcel$export(module.exports, "LText", () => $a13cf3590ad8b60e$export$aa9c8020e8b48b53);
$parcel$export(module.exports, "LTextInternal", () => $a13cf3590ad8b60e$export$7e13a1e6dbf428a1);

var $lAN3N = parcelRequire("lAN3N");

var $aYpbT = parcelRequire("aYpbT");
const $a13cf3590ad8b60e$export$aa9c8020e8b48b53 = ({ id: id, fromProp: fromProp })=>{
    return /*#__PURE__*/ (0, $lAN3N.jsx)((0, $aYpbT.LRender), {
        id: id,
        fromProp: fromProp
    });
};
const $a13cf3590ad8b60e$export$7e13a1e6dbf428a1 = ({ className: className, item: item, _children: _children })=>{
    return /*#__PURE__*/ (0, $lAN3N.jsx)("div", {
        id: `text-${item.id}`,
        className: cx(className, css`
          outline: none;
          min-width: 3px !important;
          min-height: 10px !important;
        `),
        dangerouslySetInnerHTML: {
            __html: _children || ""
        }
    });
};

});





parcelRegister("f0R6p", function(module, exports) {

$parcel$export(module.exports, "w", () => $08fb05f657003617$export$efccba1c4a2ef57b);
$parcel$export(module.exports, "initLive", () => $08fb05f657003617$export$4a15957407c8a574);

var $9hNJ9 = parcelRequire("9hNJ9");

var $iak4Q = parcelRequire("iak4Q");

var $isbAn = parcelRequire("isbAn");

var $iEVTn = parcelRequire("iEVTn");

var $aC85W = parcelRequire("aC85W");
const $08fb05f657003617$export$efccba1c4a2ef57b = window;
const $08fb05f657003617$export$4a15957407c8a574 = async (p, domain)=>{
    if (p.status === "init") {
        p.status = "loading";
        $08fb05f657003617$export$efccba1c4a2ef57b.isEditor = false;
        $08fb05f657003617$export$efccba1c4a2ef57b.isLayout = true;
        $08fb05f657003617$export$efccba1c4a2ef57b.isMobile = p.mode === "mobile";
        $08fb05f657003617$export$efccba1c4a2ef57b.isDesktop = p.mode === "desktop";
        $08fb05f657003617$export$efccba1c4a2ef57b.apiHeaders = {};
        $08fb05f657003617$export$efccba1c4a2ef57b.navigateOverride = (_href)=>{
            if (_href.startsWith("/")) {
                if ($08fb05f657003617$export$efccba1c4a2ef57b.basepath.length > 1) _href = `${$08fb05f657003617$export$efccba1c4a2ef57b.basepath}${_href}`;
                if (location.hostname === "prasi.app" || location.hostname === "localhost" || location.hostname === "127.0.0.1" || location.hostname === "10.0.2.2" // android localhost
                ) {
                    if (location.pathname.startsWith("/live") && !_href.startsWith("/live")) {
                        const patharr = location.pathname.split("/");
                        _href = `/live/${patharr[2]}${_href}`;
                    }
                }
            }
            return _href;
        };
        /** load site */ let site = null;
        if (!p.prod) {
            try {
                site = JSON.parse(localStorage.getItem(`prasi-site-${domain}`) || "");
            } catch (e) {}
            if (!site) {
                site = await p.loader.site(p, (0, $iak4Q.default)(domain) ? {
                    id: domain
                } : {
                    domain: domain
                });
                localStorage.setItem(`prasi-site-${domain}`, JSON.stringify(site));
            } else p.loader.site(p, (0, $iak4Q.default)(domain) ? {
                id: domain
            } : {
                domain: domain
            }).then((site)=>{
                localStorage.setItem(`prasi-site-${domain}`, JSON.stringify(site));
            });
        } else site = await p.loader.site(p, (0, $iak4Q.default)(domain) ? {
            id: domain
        } : {
            domain: domain
        });
        if (site) {
            /** import site module */ $08fb05f657003617$export$efccba1c4a2ef57b.exports = {};
            if (site.cgroup_ids) for (const id of site.cgroup_ids)await (0, $iEVTn.default)(p.loader.npm(p, "site", id));
            await (0, $iEVTn.default)(p.loader.npm(p, "site", site.id));
            p.site.id = site.id;
            p.site.layout = site.layout;
            p.site.js = site.js_compiled || "";
            p.site.responsive = site.responsive;
            await (0, $aC85W.validateLayout)(p);
            if (p.prod) p.site.api_url = await (0, $isbAn.initApi)(site.config, "prod");
            else {
                $08fb05f657003617$export$efccba1c4a2ef57b.externalAPI = {
                    mode: localStorage.getItem(`prasi-ext-api-mode-${p.site.id}`) || "prod",
                    devUrl: localStorage.getItem(`prasi-ext-dev-url-${p.site.id}`) || "",
                    prodUrl: localStorage.getItem(`prasi-ext-prod-url-${p.site.id}`) || ""
                };
                p.site.api_url = await (0, $isbAn.initApi)(site.config);
                if ($08fb05f657003617$export$efccba1c4a2ef57b.externalAPI.prodUrl !== p.site.api_url) {
                    $08fb05f657003617$export$efccba1c4a2ef57b.externalAPI.prodUrl = p.site.api_url;
                    localStorage.setItem(`prasi-ext-prod-url-${p.site.id}`, p.site.api_url);
                }
                if ($08fb05f657003617$export$efccba1c4a2ef57b.externalAPI.mode === "dev" && $08fb05f657003617$export$efccba1c4a2ef57b.externalAPI.devUrl) {
                    p.site.api_url = $08fb05f657003617$export$efccba1c4a2ef57b.externalAPI.devUrl;
                    await (0, $isbAn.reloadDBAPI)($08fb05f657003617$export$efccba1c4a2ef57b.externalAPI.devUrl, "dev");
                }
            }
            $08fb05f657003617$export$efccba1c4a2ef57b.apiurl = p.site.api_url;
            let pages = [];
            if (!p.prod) {
                /** load pages */ const pagesLocal = localStorage.getItem(`prasi-pages-[${domain}]`);
                if (pagesLocal) try {
                    pages = JSON.parse(pagesLocal);
                } catch (e) {}
                if (pages.length === 0) {
                    pages = await p.loader.pages(p, site.id);
                    localStorage.setItem(`prasi-pages-[${domain}]`, JSON.stringify(pages));
                } else p.loader.pages(p, site.id).then((pages)=>{
                    localStorage.setItem(`prasi-pages-[${domain}]`, JSON.stringify(pages));
                });
            } else pages = await p.loader.pages(p, site.id);
            /** execute site module */ const exec = (fn, scopes)=>{
                if (p) {
                    scopes["api"] = (0, $isbAn.createAPI)(p.site.api_url);
                    scopes["db"] = (0, $isbAn.createDB)(p.site.api_url);
                    scopes.params = $08fb05f657003617$export$efccba1c4a2ef57b.params;
                    scopes.module = {};
                    const f = new Function(...Object.keys(scopes), fn);
                    const res = f(...Object.values(scopes));
                    return res;
                }
                return null;
            };
            const scope = {
                types: {},
                exports: $08fb05f657003617$export$efccba1c4a2ef57b.exports,
                load: (0, $iEVTn.default),
                render: p.render,
                module: {
                    exports: {}
                }
            };
            exec(p.site.js, scope);
            if (scope.module.exports) for (const [k, v] of Object.entries(scope.module.exports))$08fb05f657003617$export$efccba1c4a2ef57b.exports[k] = v;
            /** create router */ p.route = (0, $9hNJ9.createRouter)({
                strictTrailingSlash: false
            });
            if (pages && pages.length > 0) for (const page of pages)p.route.insert(page.url, page);
            p.status = "ready";
            p.render();
        } else {
            p.status = "not-found";
            p.render();
        }
    }
};

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
//# sourceMappingURL=live.7c683dce.js.map
