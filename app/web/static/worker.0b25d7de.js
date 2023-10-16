(() => {
var $80e65edb9ba286a5$exports = {};
// This file is the entry point for the child web worker
// This file contains a hack to get the "esbuild-wasm" package to run in the
// browser with file system support. Although there is no API for this, it
// can be made to work anyway by pretending that node's "fs" API is present.
var $652fbed5655e6982$var$Kind;
var $652fbed5655e6982$var$StatsMode;
class $652fbed5655e6982$var$Stats {
    constructor(entry){
        const blksize = 4096;
        const size = entry.kind_ === 0 ? entry.content_.length : 0;
        const mtimeMs = entry.mtime_.getTime();
        const ctimeMs = entry.ctime_.getTime();
        this.dev = 1;
        this.ino = entry.inode_;
        this.mode = entry.kind_ === 0 ? 32768 : 16384;
        this.nlink = 1;
        this.uid = 1;
        this.gid = 1;
        this.rdev = 0;
        this.size = size;
        this.blksize = blksize;
        this.blocks = size + (blksize - 1) & blksize - 1;
        this.atimeMs = mtimeMs;
        this.mtimeMs = mtimeMs;
        this.ctimeMs = ctimeMs;
        this.birthtimeMs = ctimeMs;
        this.atime = entry.mtime_;
        this.mtime = entry.mtime_;
        this.ctime = entry.ctime_;
        this.birthtime = entry.ctime_;
    }
    isDirectory() {
        return this.mode === 16384;
    }
    isFile() {
        return this.mode === 32768;
    }
}
const $652fbed5655e6982$var$EBADF = $652fbed5655e6982$var$errorWithCode("EBADF");
const $652fbed5655e6982$var$EINVAL = $652fbed5655e6982$var$errorWithCode("EINVAL");
const $652fbed5655e6982$var$EISDIR = $652fbed5655e6982$var$errorWithCode("EISDIR");
const $652fbed5655e6982$var$ENOENT = $652fbed5655e6982$var$errorWithCode("ENOENT");
const $652fbed5655e6982$var$ENOTDIR = $652fbed5655e6982$var$errorWithCode("ENOTDIR");
const $652fbed5655e6982$var$handles = new Map();
const $652fbed5655e6982$var$encoder = new TextEncoder();
const $652fbed5655e6982$var$decoder = new TextDecoder();
let $652fbed5655e6982$var$nextFD = 3;
let $652fbed5655e6982$var$nextInode = 1;
let $652fbed5655e6982$export$31240d4da7892092 = "";
let $652fbed5655e6982$var$root = $652fbed5655e6982$var$createDirectory();
// The "esbuild-wasm" package overwrites "fs.writeSync" with this value
let $652fbed5655e6982$var$esbuildWriteSync;
// The "esbuild-wasm" package overwrites "fs.read" with this value
let $652fbed5655e6982$var$esbuildRead;
function $652fbed5655e6982$var$writeSync(fd, buffer, offset, length, position) {
    if (fd <= 2) {
        if (fd === 2) $652fbed5655e6982$var$writeToStderr(buffer, offset, length);
        else $652fbed5655e6982$var$esbuildWriteSync(fd, buffer, offset, length, position);
    } else throw $652fbed5655e6982$var$EINVAL;
}
function $652fbed5655e6982$var$read(fd, buffer, offset, length, position, callback) {
    if (fd <= 2) $652fbed5655e6982$var$esbuildRead(fd, buffer, offset, length, position, callback);
    else {
        const handle = $652fbed5655e6982$var$handles.get(fd);
        if (!handle) callback($652fbed5655e6982$var$EBADF, 0, buffer);
        else if (handle.entry_.kind_ === 1) callback($652fbed5655e6982$var$EISDIR, 0, buffer);
        else {
            const content = handle.entry_.content_;
            if (position !== null && position !== -1) {
                const slice = content.slice(position, position + length);
                buffer.set(slice, offset);
                callback(null, slice.length, buffer);
            } else {
                const slice = content.slice(handle.offset_, handle.offset_ + length);
                handle.offset_ += slice.length;
                buffer.set(slice, offset);
                callback(null, slice.length, buffer);
            }
        }
    }
}
function $652fbed5655e6982$var$rejectConflict(part) {
    throw new Error(JSON.stringify(part) + " cannot be both a file and a directory");
}
function $652fbed5655e6982$export$30e373716e984a62(files) {
    $652fbed5655e6982$var$root.children_.clear();
    $652fbed5655e6982$export$31240d4da7892092 = "";
    for(const path in files){
        const parts = $652fbed5655e6982$var$splitPath($652fbed5655e6982$var$absoluteNormalizedPath(path));
        let dir = $652fbed5655e6982$var$root;
        for(let i = 0; i + 1 < parts.length; i++){
            const part = parts[i];
            let child = dir.children_.get(part);
            if (!child) {
                child = $652fbed5655e6982$var$createDirectory();
                dir.children_.set(part, child);
            } else if (child.kind_ !== 1) $652fbed5655e6982$var$rejectConflict(part);
            dir = child;
        }
        const part = parts[parts.length - 1];
        if (dir.children_.has(part)) $652fbed5655e6982$var$rejectConflict(part);
        dir.children_.set(part, $652fbed5655e6982$var$createFile($652fbed5655e6982$var$encoder.encode(files[path])));
    }
}
globalThis.fs = {
    get writeSync () {
        return $652fbed5655e6982$var$writeSync;
    },
    set writeSync (value){
        $652fbed5655e6982$var$esbuildWriteSync = value;
    },
    get read () {
        return $652fbed5655e6982$var$read;
    },
    set read (value){
        $652fbed5655e6982$var$esbuildRead = value;
    },
    constants: {
        O_WRONLY: -1,
        O_RDWR: -1,
        O_CREAT: -1,
        O_TRUNC: -1,
        O_APPEND: -1,
        O_EXCL: -1
    },
    open (path, flags, mode, callback) {
        try {
            const entry = $652fbed5655e6982$var$getEntryFromPath(path);
            const fd = $652fbed5655e6982$var$nextFD++;
            $652fbed5655e6982$var$handles.set(fd, {
                entry_: entry,
                offset_: 0
            });
            callback(null, fd);
        } catch (err) {
            callback(err, null);
        }
    },
    close (fd, callback) {
        callback($652fbed5655e6982$var$handles.delete(fd) ? null : $652fbed5655e6982$var$EBADF);
    },
    write (fd, buffer, offset, length, position, callback) {
        if (fd <= 2) {
            if (fd === 2) $652fbed5655e6982$var$writeToStderr(buffer, offset, length);
            else $652fbed5655e6982$var$esbuildWriteSync(fd, buffer, offset, length, position);
            callback(null, length, buffer);
        } else callback($652fbed5655e6982$var$EINVAL, 0, buffer);
    },
    readdir (path, callback) {
        try {
            const entry = $652fbed5655e6982$var$getEntryFromPath(path);
            if (entry.kind_ !== 1) throw $652fbed5655e6982$var$ENOTDIR;
            callback(null, [
                ...entry.children_.keys()
            ]);
        } catch (err) {
            callback(err, null);
        }
    },
    stat (path, callback) {
        try {
            const entry = $652fbed5655e6982$var$getEntryFromPath(path);
            callback(null, new $652fbed5655e6982$var$Stats(entry));
        } catch (err) {
            callback(err, null);
        }
    },
    lstat (path, callback) {
        try {
            const entry = $652fbed5655e6982$var$getEntryFromPath(path);
            callback(null, new $652fbed5655e6982$var$Stats(entry));
        } catch (err) {
            callback(err, null);
        }
    },
    fstat (fd, callback) {
        const handle = $652fbed5655e6982$var$handles.get(fd);
        if (handle) callback(null, new $652fbed5655e6982$var$Stats(handle.entry_));
        else callback($652fbed5655e6982$var$EBADF, null);
    }
};
function $652fbed5655e6982$var$createFile(content) {
    const now = new Date();
    return {
        kind_: 0,
        inode_: $652fbed5655e6982$var$nextInode++,
        ctime_: now,
        mtime_: now,
        content_: content
    };
}
function $652fbed5655e6982$var$createDirectory() {
    const now = new Date();
    return {
        kind_: 1,
        inode_: $652fbed5655e6982$var$nextInode++,
        ctime_: now,
        mtime_: now,
        children_: new Map()
    };
}
function $652fbed5655e6982$var$absoluteNormalizedPath(path) {
    if (path[0] !== "/") path = "/" + path;
    const parts = path.split("/");
    parts.shift();
    let end = 0;
    for(let i = 0; i < parts.length; i++){
        const part = parts[i];
        if (part === "..") {
            if (end) end--;
        } else if (part !== "." && part !== "") parts[end++] = part;
    }
    parts.length = end;
    return "/" + parts.join("/");
}
function $652fbed5655e6982$var$splitPath(path) {
    path = $652fbed5655e6982$var$absoluteNormalizedPath(path);
    if (path === "/") return [];
    const parts = path.split("/");
    parts.shift();
    return parts;
}
function $652fbed5655e6982$var$getEntryFromPath(path) {
    const parts = $652fbed5655e6982$var$splitPath(path);
    let dir = $652fbed5655e6982$var$root;
    for(let i = 0, n = parts.length; i < n; i++){
        const child = dir.children_.get(parts[i]);
        if (!child) throw $652fbed5655e6982$var$ENOENT;
        if (child.kind_ === 0) {
            if (i + 1 === n) return child;
            throw $652fbed5655e6982$var$ENOTDIR;
        }
        dir = child;
    }
    return dir;
}
function $652fbed5655e6982$var$errorWithCode(code) {
    const err = new Error(code);
    err.code = code;
    return err;
}
function $652fbed5655e6982$var$writeToStderr(buffer, offset, length) {
    $652fbed5655e6982$export$31240d4da7892092 += $652fbed5655e6982$var$decoder.decode(offset === 0 && length === buffer.length ? buffer : buffer.slice(offset, offset + length));
}


var $096bda2aad5b9f56$var$Se = [
    {
        e: [
            [
                "$",
                40,
                41,
                42,
                43,
                44,
                45,
                46,
                47,
                48,
                49,
                50,
                51,
                52,
                53
            ],
            [
                106,
                "x",
                [
                    65,
                    "Q"
                ]
            ],
            "P"
        ],
        t: [
            "$",
            "x",
            [
                -2,
                "P",
                "Q"
            ]
        ]
    },
    {
        e: [
            [
                "$",
                54,
                55,
                56,
                57,
                58,
                59,
                60,
                61,
                62
            ],
            [
                106,
                "x",
                [
                    65,
                    "Q"
                ]
            ],
            "y",
            "P"
        ],
        t: [
            "$",
            "x",
            "y",
            [
                -2,
                "P",
                "Q"
            ]
        ]
    },
    {
        e: [
            60,
            "x",
            "y",
            "P"
        ],
        i: {
            y: [
                {
                    e: [
                        66,
                        "Q"
                    ],
                    t: [
                        58,
                        "x",
                        [
                            65,
                            [
                                -1,
                                "Q"
                            ]
                        ],
                        "P"
                    ]
                },
                {
                    e: [
                        [
                            "$",
                            48,
                            49,
                            50,
                            51,
                            52,
                            53,
                            41
                        ],
                        "z",
                        "Q"
                    ],
                    t: [
                        58,
                        "x",
                        [
                            45,
                            "z",
                            "Q"
                        ],
                        "P"
                    ]
                },
                {
                    e: [
                        [
                            "@",
                            172,
                            173
                        ],
                        "z"
                    ],
                    t: [
                        58,
                        "x",
                        "z",
                        "P"
                    ]
                }
            ]
        }
    },
    {
        e: [
            61,
            "x",
            "y",
            "P"
        ],
        i: {
            y: [
                {
                    e: [
                        66,
                        "Q"
                    ],
                    t: [
                        59,
                        "x",
                        [
                            65,
                            [
                                -1,
                                "Q"
                            ]
                        ],
                        "P"
                    ]
                },
                {
                    e: [
                        48,
                        "z",
                        "Q"
                    ],
                    t: [
                        59,
                        "x",
                        [
                            44,
                            "z",
                            "Q"
                        ],
                        "P"
                    ]
                },
                {
                    e: [
                        49,
                        "z",
                        "Q"
                    ],
                    t: [
                        59,
                        "x",
                        [
                            45,
                            "z",
                            "Q"
                        ],
                        "P"
                    ]
                },
                {
                    e: [
                        [
                            "$",
                            50,
                            51,
                            52,
                            53,
                            41
                        ],
                        "z",
                        "Q"
                    ],
                    t: [
                        59,
                        "x",
                        [
                            47,
                            "z",
                            "Q"
                        ],
                        "P"
                    ]
                },
                {
                    e: [
                        [
                            "@",
                            172,
                            173
                        ],
                        "z"
                    ],
                    t: [
                        59,
                        "x",
                        "z",
                        "P"
                    ]
                }
            ]
        }
    },
    {
        e: [
            62,
            "x",
            "y",
            "P"
        ],
        i: {
            y: [
                {
                    e: [
                        66,
                        "Q"
                    ],
                    t: [
                        54,
                        "x",
                        [
                            65,
                            [
                                -1,
                                "Q"
                            ]
                        ],
                        "P"
                    ]
                },
                {
                    e: [
                        48,
                        "z",
                        "Q"
                    ],
                    t: [
                        54,
                        "x",
                        [
                            44,
                            "z",
                            "Q"
                        ],
                        "P"
                    ]
                },
                {
                    e: [
                        49,
                        "z",
                        "Q"
                    ],
                    t: [
                        54,
                        "x",
                        [
                            45,
                            "z",
                            "Q"
                        ],
                        "P"
                    ]
                },
                {
                    e: [
                        50,
                        "z",
                        "Q"
                    ],
                    t: [
                        54,
                        "x",
                        [
                            46,
                            "z",
                            "Q"
                        ],
                        "P"
                    ]
                },
                {
                    e: [
                        51,
                        "z",
                        "Q"
                    ],
                    t: [
                        54,
                        "x",
                        [
                            47,
                            "z",
                            "Q"
                        ],
                        "P"
                    ]
                },
                {
                    e: [
                        [
                            "$",
                            52,
                            53,
                            41
                        ],
                        "z",
                        "Q"
                    ],
                    t: [
                        54,
                        "x",
                        [
                            40,
                            "z",
                            "Q"
                        ],
                        "P"
                    ]
                },
                {
                    e: [
                        [
                            "@",
                            172,
                            173
                        ],
                        "z"
                    ],
                    t: [
                        54,
                        "x",
                        "z",
                        "P"
                    ]
                }
            ]
        }
    },
    {
        e: [
            80,
            "x"
        ],
        i: {
            x: [
                {
                    e: [
                        [
                            "$",
                            48,
                            49
                        ],
                        "y",
                        "P"
                    ],
                    t: [
                        69,
                        [
                            45,
                            "y",
                            "P"
                        ]
                    ]
                },
                {
                    e: [
                        [
                            "$",
                            50,
                            51
                        ],
                        "y",
                        "P"
                    ],
                    t: [
                        69,
                        [
                            47,
                            "y",
                            "P"
                        ]
                    ]
                },
                {
                    e: [
                        [
                            "$",
                            52,
                            53
                        ],
                        "y",
                        "P"
                    ],
                    t: [
                        69,
                        [
                            40,
                            "y",
                            "P"
                        ]
                    ]
                },
                {
                    e: [
                        [
                            "@",
                            172,
                            173
                        ],
                        "y"
                    ],
                    t: [
                        69,
                        "y"
                    ]
                }
            ]
        }
    },
    {
        e: [
            81,
            [
                49,
                "x",
                "P"
            ],
            [
                66,
                "Q"
            ]
        ],
        t: [
            70,
            [
                45,
                "x",
                "P"
            ],
            [
                65,
                [
                    -1,
                    "Q"
                ]
            ]
        ],
        n: [
            "Q",
            "<=",
            0xFFn
        ]
    },
    {
        e: [
            82,
            [
                49,
                "x",
                "P"
            ],
            [
                66,
                "Q"
            ]
        ],
        t: [
            71,
            [
                45,
                "x",
                "P"
            ],
            [
                65,
                [
                    -1,
                    "Q"
                ]
            ]
        ],
        n: [
            "Q",
            "<=",
            0xFFn
        ]
    },
    {
        e: [
            81,
            [
                51,
                "x",
                "P"
            ],
            [
                66,
                "Q"
            ]
        ],
        t: [
            70,
            [
                47,
                "x",
                "P"
            ],
            [
                65,
                [
                    -1,
                    "Q"
                ]
            ]
        ],
        n: [
            "Q",
            "<=",
            0xFFFFn
        ]
    },
    {
        e: [
            82,
            [
                51,
                "x",
                "P"
            ],
            [
                66,
                "Q"
            ]
        ],
        t: [
            71,
            [
                47,
                "x",
                "P"
            ],
            [
                65,
                [
                    -1,
                    "Q"
                ]
            ]
        ],
        n: [
            "Q",
            "<=",
            0xFFFFn
        ]
    },
    {
        e: [
            81,
            [
                53,
                "x",
                "P"
            ],
            [
                66,
                "Q"
            ]
        ],
        t: [
            70,
            [
                40,
                "x",
                "P"
            ],
            [
                65,
                [
                    -1,
                    "Q"
                ]
            ]
        ],
        n: [
            "Q",
            "<=",
            0xFFFFFFFFn
        ]
    },
    {
        e: [
            82,
            [
                53,
                "x",
                "P"
            ],
            [
                66,
                "Q"
            ]
        ],
        t: [
            71,
            [
                40,
                "x",
                "P"
            ],
            [
                65,
                [
                    -1,
                    "Q"
                ]
            ]
        ],
        n: [
            "Q",
            "<=",
            0xFFFFFFFFn
        ]
    },
    {
        e: [
            240,
            "x"
        ],
        i: {
            x: [
                {
                    e: [
                        242,
                        "y"
                    ],
                    t: [
                        240,
                        "y"
                    ]
                },
                {
                    e: [
                        [
                            "@",
                            69,
                            80
                        ],
                        "x"
                    ],
                    t: [
                        241,
                        "y"
                    ]
                }
            ]
        }
    },
    {
        e: [
            241,
            "x"
        ],
        i: {
            x: [
                {
                    e: [
                        242,
                        "y"
                    ],
                    t: [
                        241,
                        "y"
                    ]
                },
                {
                    e: [
                        [
                            "@",
                            69,
                            80
                        ],
                        "y"
                    ],
                    t: [
                        240,
                        "y"
                    ]
                },
                {
                    e: [
                        70,
                        "y",
                        "z"
                    ],
                    t: [
                        240,
                        [
                            71,
                            "y",
                            "z"
                        ]
                    ]
                },
                {
                    e: [
                        71,
                        "y",
                        "z"
                    ],
                    t: [
                        240,
                        [
                            70,
                            "y",
                            "z"
                        ]
                    ]
                },
                {
                    e: [
                        72,
                        "y",
                        "z"
                    ],
                    t: [
                        240,
                        [
                            78,
                            "y",
                            "z"
                        ]
                    ]
                },
                {
                    e: [
                        73,
                        "y",
                        "z"
                    ],
                    t: [
                        240,
                        [
                            79,
                            "y",
                            "z"
                        ]
                    ]
                },
                {
                    e: [
                        74,
                        "y",
                        "z"
                    ],
                    t: [
                        240,
                        [
                            76,
                            "y",
                            "z"
                        ]
                    ]
                },
                {
                    e: [
                        75,
                        "y",
                        "z"
                    ],
                    t: [
                        240,
                        [
                            77,
                            "y",
                            "z"
                        ]
                    ]
                },
                {
                    e: [
                        76,
                        "y",
                        "z"
                    ],
                    t: [
                        240,
                        [
                            74,
                            "y",
                            "z"
                        ]
                    ]
                },
                {
                    e: [
                        77,
                        "y",
                        "z"
                    ],
                    t: [
                        240,
                        [
                            75,
                            "y",
                            "z"
                        ]
                    ]
                },
                {
                    e: [
                        78,
                        "y",
                        "z"
                    ],
                    t: [
                        240,
                        [
                            72,
                            "y",
                            "z"
                        ]
                    ]
                },
                {
                    e: [
                        79,
                        "y",
                        "z"
                    ],
                    t: [
                        240,
                        [
                            73,
                            "y",
                            "z"
                        ]
                    ]
                },
                {
                    e: [
                        81,
                        "y",
                        "z"
                    ],
                    t: [
                        240,
                        [
                            82,
                            "y",
                            "z"
                        ]
                    ]
                },
                {
                    e: [
                        82,
                        "y",
                        "z"
                    ],
                    t: [
                        240,
                        [
                            81,
                            "y",
                            "z"
                        ]
                    ]
                },
                {
                    e: [
                        83,
                        "y",
                        "z"
                    ],
                    t: [
                        240,
                        [
                            89,
                            "y",
                            "z"
                        ]
                    ]
                },
                {
                    e: [
                        84,
                        "y",
                        "z"
                    ],
                    t: [
                        240,
                        [
                            90,
                            "y",
                            "z"
                        ]
                    ]
                },
                {
                    e: [
                        85,
                        "y",
                        "z"
                    ],
                    t: [
                        240,
                        [
                            87,
                            "y",
                            "z"
                        ]
                    ]
                },
                {
                    e: [
                        86,
                        "y",
                        "z"
                    ],
                    t: [
                        240,
                        [
                            88,
                            "y",
                            "z"
                        ]
                    ]
                },
                {
                    e: [
                        87,
                        "y",
                        "z"
                    ],
                    t: [
                        240,
                        [
                            85,
                            "y",
                            "z"
                        ]
                    ]
                },
                {
                    e: [
                        88,
                        "y",
                        "z"
                    ],
                    t: [
                        240,
                        [
                            86,
                            "y",
                            "z"
                        ]
                    ]
                },
                {
                    e: [
                        89,
                        "y",
                        "z"
                    ],
                    t: [
                        240,
                        [
                            83,
                            "y",
                            "z"
                        ]
                    ]
                },
                {
                    e: [
                        90,
                        "y",
                        "z"
                    ],
                    t: [
                        240,
                        [
                            84,
                            "y",
                            "z"
                        ]
                    ]
                }
            ]
        }
    },
    {
        e: [
            243,
            "x"
        ],
        i: {
            x: [
                {
                    e: [
                        40,
                        "y",
                        "P"
                    ],
                    t: [
                        245,
                        "y",
                        "P"
                    ]
                }
            ]
        }
    },
    {
        e: [
            244,
            "x"
        ],
        i: {
            x: [
                {
                    e: [
                        41,
                        "y",
                        "P"
                    ],
                    t: [
                        246,
                        "y",
                        "P"
                    ]
                },
                {
                    e: [
                        66,
                        "P"
                    ],
                    t: [
                        66,
                        "P"
                    ],
                    n: [
                        "P",
                        "<=",
                        0x7FFFFFFFFFFFFFFFn
                    ]
                },
                {
                    e: [
                        [
                            "$",
                            49,
                            51,
                            53
                        ],
                        "y",
                        "P"
                    ],
                    t: [
                        "$",
                        "y",
                        "P"
                    ]
                }
            ]
        }
    },
    {
        e: [
            167,
            "x"
        ],
        i: {
            x: [
                {
                    e: [
                        66,
                        "P"
                    ],
                    t: [
                        65,
                        [
                            -1,
                            "P"
                        ]
                    ]
                },
                {
                    e: [
                        48,
                        "y",
                        "P"
                    ],
                    t: [
                        44,
                        "y",
                        "P"
                    ]
                },
                {
                    e: [
                        49,
                        "y",
                        "P"
                    ],
                    t: [
                        45,
                        "y",
                        "P"
                    ]
                },
                {
                    e: [
                        50,
                        "y",
                        "P"
                    ],
                    t: [
                        46,
                        "y",
                        "P"
                    ]
                },
                {
                    e: [
                        51,
                        "y",
                        "P"
                    ],
                    t: [
                        47,
                        "y",
                        "P"
                    ]
                },
                {
                    e: [
                        [
                            "$",
                            52,
                            53,
                            41
                        ],
                        "y",
                        "P"
                    ],
                    t: [
                        40,
                        "y",
                        "P"
                    ]
                },
                {
                    e: [
                        [
                            "@",
                            172,
                            173
                        ],
                        "y"
                    ],
                    t: "y"
                },
                {
                    e: [
                        124,
                        [
                            [
                                "@",
                                172,
                                173
                            ],
                            "y"
                        ],
                        [
                            66,
                            "P"
                        ]
                    ],
                    t: [
                        106,
                        "y",
                        [
                            65,
                            [
                                -1,
                                "P"
                            ]
                        ]
                    ]
                }
            ]
        }
    },
    {
        e: [
            131,
            "x",
            [
                66,
                "P"
            ]
        ],
        i: {
            x: [
                {
                    e: [
                        66,
                        "Q"
                    ],
                    t: [
                        66,
                        [
                            -3,
                            "P",
                            "Q"
                        ]
                    ]
                },
                {
                    e: [
                        131,
                        "y",
                        [
                            66,
                            "Q"
                        ]
                    ],
                    t: [
                        131,
                        "y",
                        [
                            66,
                            [
                                -3,
                                "P",
                                "Q"
                            ]
                        ]
                    ]
                },
                {
                    e: [
                        49,
                        "y",
                        "Q"
                    ],
                    t: [
                        49,
                        "y",
                        "Q"
                    ],
                    n: [
                        [
                            "P",
                            "&",
                            0xFFn
                        ],
                        "===",
                        0xFFn
                    ]
                },
                {
                    e: [
                        48,
                        "y",
                        "Q"
                    ],
                    t: [
                        49,
                        "y",
                        "Q"
                    ],
                    n: [
                        "P",
                        "===",
                        0xFFn
                    ]
                },
                {
                    e: [
                        51,
                        "y",
                        "Q"
                    ],
                    t: [
                        51,
                        "y",
                        "Q"
                    ],
                    n: [
                        [
                            "P",
                            "&",
                            0xFFFFn
                        ],
                        "===",
                        0xFFFFn
                    ]
                },
                {
                    e: [
                        50,
                        "y",
                        "Q"
                    ],
                    t: [
                        51,
                        "y",
                        "Q"
                    ],
                    n: [
                        "P",
                        "===",
                        0xFFFFn
                    ]
                },
                {
                    e: [
                        53,
                        "y",
                        "Q"
                    ],
                    t: [
                        53,
                        "y",
                        "Q"
                    ],
                    n: [
                        [
                            "P",
                            "&",
                            0xFFFFFFFFn
                        ],
                        "===",
                        0xFFFFFFFFn
                    ]
                },
                {
                    e: [
                        52,
                        "y",
                        "Q"
                    ],
                    t: [
                        53,
                        "y",
                        "Q"
                    ],
                    n: [
                        "P",
                        "===",
                        0xFFFFFFFFn
                    ]
                }
            ]
        }
    }
], $096bda2aad5b9f56$var$Oe = ()=>{
    let _ = 0, m = ()=>"v" + _++, $ = (y, S, I, T, b)=>{
        if (S < I.length) {
            let a = I[S];
            if (typeof a == "string") R[a] = `${U}[${y}+${S + 1}]`, $(y, S + 1, I, T, b);
            else {
                let z = m(), d = m();
                w += `var ${z}=${U}[${y}+${S + 1}],${d}=${U}[${z}]&${255};`, q(z, d, a, T, (i)=>{
                    $(y, S + 1, I, i, b);
                });
            }
        } else b(T);
    }, q = (y, S, [I, ...T], b, a)=>{
        let z = [];
        if (typeof I == "number") z.push(`${S}===${I}`);
        else {
            let [d, ...i] = I;
            i.sort((s, r)=>s - r), k[d] = {
                u: y,
                $: S,
                P: i.some((s)=>A.has(s))
            };
            for(let s = 0; s < i.length; s++){
                let r = 1;
                for(; s + r < i.length && i[s + r - 1] + 1 === i[s + r];)r++;
                z.push(r > 2 ? `${S}>=${i[s]}&&${S}<=${i[s += r - 1]}` : `${S}===${i[s]}`);
            }
        }
        b = b.concat({
            u: y,
            F: T.map((d)=>typeof d == "string" ? d : null)
        }), w += `if(${z.join("||")}){`, $(y, 0, T, b, a), w += "}";
    }, D = (y, S, I, T, b, a)=>{
        for (let { e: z, i: d, t: i, n: s } of I)q(y, S, z, b, (r)=>{
            let u = Object.create(a);
            N(s, u, ()=>{
                if (d) {
                    for(let h in d)o(h, u);
                    for(let h in d){
                        let c = u[h], M = m();
                        w += `var ${M}=${U}[${c}]&${255};`, D(c, M, d[h], null, r, u);
                    }
                }
                if (i) {
                    let h = p(i, u, r.slice(), `|${U}[${B}]&${-16777216}`);
                    typeof i != "string" && (typeof i[0] == "string" ? k[i[0]].P : A.has(i[0])) ? (B !== h && (w += `${B}=${h};`), w += "continue") : w += "return " + h;
                }
            });
        });
    }, N = (y, S, I)=>{
        if (y) {
            let T = (b)=>typeof b == "string" ? `${W}[${S[b] || R[b]}]&0xFFFFFFFFFFFFFFFFn` : typeof b == "bigint" ? b + "n" : `(${T(b[0])})${b[1]}(${T(b[2])})`;
            w += `if(${T(y)}){`, I(), w += "}";
        } else I();
    }, o = (y, S)=>{
        if (!(y in S)) {
            let I = m();
            w += `var ${I}=${R[y]};`, S[y] = I;
        }
    }, p = (y, S, I, T = "")=>{
        if (typeof y == "string") return S[y] || R[y];
        if (y[0] === -1) {
            let c = p(y[1], S, I);
            return `Number(${W}[${c}]&0xFFFFFFFFn)`;
        }
        if (y[0] === -2) {
            let c = p(y[1], S, I), M = p(y[2], S, I);
            return `${c}+${M}`;
        }
        if (y[0] === -3) {
            let c = y[1];
            typeof c == "string" && o(c, S);
            let M = p(c, S, I), O = p(y[2], S, I);
            return w += `${W}[${M}]&=${W}[${O}];`, M;
        }
        let [b, ...a] = y, z = a[a.length - 1], i = ((typeof z == "string" ? z === "P" || z === "Q" : typeof z[0] != "string" && z[0] < 0) ? a.length - 1 : a.length) << 8, s = -1, r, u, h;
        for(let c = 0; c < I.length; c++){
            let M = I[c];
            if (M.F.length === a.length) {
                let O = 0;
                for(let v = 0; v < a.length; v++)a[v] === M.F[v] && O++;
                O > s && (s = O, r = c, u = M.u, h = M.F);
            }
        }
        if (!(typeof b == "string" && k[b].u === u)) {
            let c = (typeof b == "string" ? `${k[b].$}|${i}` : `${b | i}`) + T;
            u ? (I.splice(r, 1), w += `${U}[${u}]=${c};`) : (u = m(), w += `var ${u}=${t}(${c},${y.length});`);
        }
        for(let c = 0; c < a.length; c++)if (h && a[c] !== h[c]) {
            let M = p(a[c], S, I);
            w += `${U}[${u}+${c + 1}]=${M};`;
        }
        return u;
    }, R = {}, k = {}, X = m(), U = m(), W = m(), t = m(), B = m(), g = m(), A = new Set;
    for (let { e: [y] } of $096bda2aad5b9f56$var$Se)if (typeof y == "number") A.add(y);
    else {
        let [, ...S] = y;
        for (let I of S)A.add(I);
    }
    let w = `for(;;){var ${g}=${U}[${B}]&${255};`;
    return D(B, g, $096bda2aad5b9f56$var$Se, null, [], {}), w += `return ${B}}`, new Function(U, W, t, B, w);
};
var $096bda2aad5b9f56$var$ze = (_)=>{
    let m = new DataView(_.buffer), $ = ()=>{
        let i = 0, s = 0, r;
        do r = _[d++], i |= (r & 127) << s, s += 7;
        while (r & 128);
        return i >>> 0;
    }, q = ()=>{
        let i = 0, s = 0, r;
        do r = _[d++], i |= (r & 127) << s, s += 7;
        while (r & 128);
        return s < 32 && r & 64 ? i | -1 << s : i;
    }, D = ()=>{
        let i = 0n, s = 0n, r;
        do r = _[d++], i |= BigInt(r & 127) << s, s += 7n;
        while (r & 128);
        return s < 64 && r & 64 ? i | ~0n << s : i;
    }, N = ()=>{
        let i = m.getFloat32(d, !0);
        return d += 4, i;
    }, o = ()=>{
        let i = m.getFloat64(d, !0);
        return d += 8, i;
    }, p = (i = $())=>[
            ..._.slice(d, d += i)
        ], R = (i = $())=>new TextDecoder().decode(_.slice(d, d += i)), k = (i = _[d++])=>[
            $(),
            i === 0 ? 1 / 0 : $()
        ], X = ()=>{
        let i = _[d++], s;
        if (i === 65) s = $();
        else throw new Error("Unsupported constant instruction: 0x" + i.toString(16));
        if (_[d++] !== 11) throw new Error("Expected end after constant");
        return s;
    }, U = ()=>{
        let i = _[d++], s;
        if (i === 65) {
            let r = q();
            s = ()=>r;
        } else if (i === 66) {
            let r = D();
            s = ()=>r;
        } else if (i === 67) {
            let r = N();
            s = ()=>r;
        } else if (i === 68) {
            let r = o();
            s = ()=>r;
        } else if (i === 35) {
            let r = $();
            s = (u)=>u[r];
        } else throw new Error("Unsupported constant instruction: 0x" + i.toString(16));
        if (_[d++] !== 11) throw new Error("Expected end after constant");
        return s;
    }, W = [], t = [], B = [], g = [], A = [], w = [], y = [], S = [], I = [], T = new Map, b = [], a = [], z = -1, d = 8;
    if (_.slice(0, 8).join(",") !== "0,97,115,109,1,0,0,0") throw new Error("Invalid file header");
    for(; d + 5 < _.length;){
        let i = _[d++], s = $(), r = d + s;
        if (i === 0) {
            let u = R();
            if (t.push([
                u,
                _.slice(d, r)
            ]), u === "name") {
                let h = _[d++], c = d + $();
                if (h === 1) for(let M = 0, O = q(); M < O && d < c; M++)T.set($(), R());
            }
        } else if (i === 1) for(let u = 0, h = $(); u < h; u++){
            if (_[d++] !== 96) throw new Error("Invalid function type");
            a.push([
                p(),
                p()
            ]);
        }
        else if (i === 2) for(let u = 0, h = $(); u < h; u++){
            let c = R(), M = R(), O = _[d++];
            if (O === 0) S.push([
                c,
                M,
                O,
                $()
            ]);
            else if (O === 1) S.push([
                c,
                M,
                O,
                _[d++],
                ...k()
            ]);
            else if (O === 2) S.push([
                c,
                M,
                O,
                ...k()
            ]);
            else if (O === 3) S.push([
                c,
                M,
                O,
                _[d++],
                _[d++]
            ]);
            else throw new Error("Unsupported import type: " + O);
        }
        else if (i === 3) {
            let u = $();
            for(let h = 0; h < u; h++)w.push($());
        } else if (i === 4) for(let u = 0, h = $(); u < h; u++)b.push([
            _[d++],
            ...k()
        ]);
        else if (i === 5) for(let u = 0, h = $(); u < h; u++)I.push(k());
        else if (i === 6) for(let u = 0, h = $(); u < h; u++){
            let c = _[d++], M = _[d++], O = U();
            y.push([
                c,
                M,
                O
            ]);
        }
        else if (i === 7) for(let u = 0, h = $(); u < h; u++){
            let c = R(), M = _[d++], O = $();
            A.push([
                c,
                M,
                O
            ]);
        }
        else if (i === 8) z = $();
        else if (i === 9) for(let u = 0, h = $(); u < h; u++){
            let c = _[d++];
            if (c === 0) {
                let M = X(), O = [];
                for(let v = 0, te = $(); v < te; v++)O.push($());
                g.push([
                    M,
                    O
                ]);
            } else throw new Error("Unsupported element kind: " + c);
        }
        else if (i === 10) for(let u = 0, h = $(); u < h; u++){
            let c = $() + d, M = $(), O = [];
            for(let v = 0; v < M; v++)O.push([
                $(),
                _[d++]
            ]);
            W.push([
                O,
                d,
                c
            ]), d = c;
        }
        else if (i === 11) for(let u = 0, h = $(); u < h; u++){
            let c = _[d++], M = c & 2 ? $() : 0, O = c & 1 ? 0 : X(), v = $();
            B.push([
                M,
                O,
                _.slice(d, d += v)
            ]);
        }
        else if (i !== 12) throw new Error("Unsupported section type " + i);
        d = r;
    }
    return {
        b: _,
        S: m,
        d: W,
        Z: t,
        O: B,
        I: g,
        B: A,
        f: w,
        T: y,
        w: S,
        C: I,
        A: T,
        z: z,
        E: b,
        m: a
    };
}, $096bda2aad5b9f56$var$Me = new Map, $096bda2aad5b9f56$var$ne = class {
    constructor(m){
        $096bda2aad5b9f56$var$Me.set(this, $096bda2aad5b9f56$var$ze(m instanceof Uint8Array ? m : new Uint8Array(m instanceof ArrayBuffer ? m : m.buffer)));
    }
};
var $096bda2aad5b9f56$var$xe = (_, m)=>{
    if (m === 125 || m === 124) return +_;
    if (m === 127) return _ | 0;
    if (m === 126) return BigInt(_) & 0xFFFFFFFFFFFFFFFFn;
    throw new Error("Unsupported cast to type " + m);
}, $096bda2aad5b9f56$var$ge = (_, m)=>{
    if (m === 125 || m === 124) return "+" + _;
    if (m === 127) return _ + "|0";
    if (m === 126) return `BigInt(${_})&0xFFFFFFFFFFFFFFFFn`;
    throw new Error("Unsupported cast to type " + m);
}, $096bda2aad5b9f56$var$de = (_, m)=>{
    if (m === 124 || m === 127) return _;
    if (m === 125) return `Math.fround(${_})`;
    if (m === 126) return `l.c(${_})`;
    throw new Error("Unsupported cast to type " + m);
};
var $096bda2aad5b9f56$var$n = new Uint16Array(256);
$096bda2aad5b9f56$var$n[1] = 520;
$096bda2aad5b9f56$var$n[26] = 521;
$096bda2aad5b9f56$var$n[32] = 28;
$096bda2aad5b9f56$var$n[33] = 25;
$096bda2aad5b9f56$var$n[34] = 29;
$096bda2aad5b9f56$var$n[35] = 28;
$096bda2aad5b9f56$var$n[36] = 25;
$096bda2aad5b9f56$var$n[40] = 61;
$096bda2aad5b9f56$var$n[41] = 61;
$096bda2aad5b9f56$var$n[42] = 61;
$096bda2aad5b9f56$var$n[43] = 61;
$096bda2aad5b9f56$var$n[44] = 61;
$096bda2aad5b9f56$var$n[45] = 61;
$096bda2aad5b9f56$var$n[46] = 61;
$096bda2aad5b9f56$var$n[47] = 61;
$096bda2aad5b9f56$var$n[48] = 61;
$096bda2aad5b9f56$var$n[49] = 61;
$096bda2aad5b9f56$var$n[50] = 61;
$096bda2aad5b9f56$var$n[51] = 61;
$096bda2aad5b9f56$var$n[52] = 61;
$096bda2aad5b9f56$var$n[53] = 61;
$096bda2aad5b9f56$var$n[54] = 58;
$096bda2aad5b9f56$var$n[55] = 58;
$096bda2aad5b9f56$var$n[56] = 58;
$096bda2aad5b9f56$var$n[57] = 58;
$096bda2aad5b9f56$var$n[58] = 58;
$096bda2aad5b9f56$var$n[59] = 58;
$096bda2aad5b9f56$var$n[60] = 58;
$096bda2aad5b9f56$var$n[61] = 58;
$096bda2aad5b9f56$var$n[62] = 58;
$096bda2aad5b9f56$var$n[63] = 28;
$096bda2aad5b9f56$var$n[64] = 29;
$096bda2aad5b9f56$var$n[69] = 13;
$096bda2aad5b9f56$var$n[70] = 78;
$096bda2aad5b9f56$var$n[71] = 78;
$096bda2aad5b9f56$var$n[72] = 78;
$096bda2aad5b9f56$var$n[73] = 206;
$096bda2aad5b9f56$var$n[74] = 78;
$096bda2aad5b9f56$var$n[75] = 206;
$096bda2aad5b9f56$var$n[76] = 78;
$096bda2aad5b9f56$var$n[77] = 206;
$096bda2aad5b9f56$var$n[78] = 78;
$096bda2aad5b9f56$var$n[79] = 206;
$096bda2aad5b9f56$var$n[80] = 13;
$096bda2aad5b9f56$var$n[81] = 78;
$096bda2aad5b9f56$var$n[82] = 78;
$096bda2aad5b9f56$var$n[83] = 334;
$096bda2aad5b9f56$var$n[84] = 78;
$096bda2aad5b9f56$var$n[85] = 334;
$096bda2aad5b9f56$var$n[86] = 78;
$096bda2aad5b9f56$var$n[87] = 334;
$096bda2aad5b9f56$var$n[88] = 78;
$096bda2aad5b9f56$var$n[89] = 334;
$096bda2aad5b9f56$var$n[90] = 78;
$096bda2aad5b9f56$var$n[91] = 78;
$096bda2aad5b9f56$var$n[92] = 78;
$096bda2aad5b9f56$var$n[93] = 78;
$096bda2aad5b9f56$var$n[94] = 78;
$096bda2aad5b9f56$var$n[95] = 78;
$096bda2aad5b9f56$var$n[96] = 78;
$096bda2aad5b9f56$var$n[97] = 78;
$096bda2aad5b9f56$var$n[98] = 78;
$096bda2aad5b9f56$var$n[99] = 78;
$096bda2aad5b9f56$var$n[100] = 78;
$096bda2aad5b9f56$var$n[101] = 78;
$096bda2aad5b9f56$var$n[102] = 78;
$096bda2aad5b9f56$var$n[103] = 13;
$096bda2aad5b9f56$var$n[104] = 13;
$096bda2aad5b9f56$var$n[105] = 13;
$096bda2aad5b9f56$var$n[106] = 14;
$096bda2aad5b9f56$var$n[107] = 14;
$096bda2aad5b9f56$var$n[108] = 14;
$096bda2aad5b9f56$var$n[109] = 14;
$096bda2aad5b9f56$var$n[110] = 142;
$096bda2aad5b9f56$var$n[111] = 14;
$096bda2aad5b9f56$var$n[112] = 142;
$096bda2aad5b9f56$var$n[113] = 14;
$096bda2aad5b9f56$var$n[114] = 14;
$096bda2aad5b9f56$var$n[115] = 14;
$096bda2aad5b9f56$var$n[116] = 14;
$096bda2aad5b9f56$var$n[117] = 14;
$096bda2aad5b9f56$var$n[118] = 14;
$096bda2aad5b9f56$var$n[119] = 14;
$096bda2aad5b9f56$var$n[120] = 14;
$096bda2aad5b9f56$var$n[121] = 13;
$096bda2aad5b9f56$var$n[122] = 13;
$096bda2aad5b9f56$var$n[123] = 13;
$096bda2aad5b9f56$var$n[124] = 14;
$096bda2aad5b9f56$var$n[125] = 14;
$096bda2aad5b9f56$var$n[126] = 14;
$096bda2aad5b9f56$var$n[127] = 270;
$096bda2aad5b9f56$var$n[128] = 14;
$096bda2aad5b9f56$var$n[129] = 270;
$096bda2aad5b9f56$var$n[130] = 14;
$096bda2aad5b9f56$var$n[131] = 14;
$096bda2aad5b9f56$var$n[132] = 14;
$096bda2aad5b9f56$var$n[133] = 14;
$096bda2aad5b9f56$var$n[134] = 1038;
$096bda2aad5b9f56$var$n[135] = 1038;
$096bda2aad5b9f56$var$n[136] = 1038;
$096bda2aad5b9f56$var$n[137] = 1038;
$096bda2aad5b9f56$var$n[138] = 1038;
$096bda2aad5b9f56$var$n[139] = 13;
$096bda2aad5b9f56$var$n[140] = 13;
$096bda2aad5b9f56$var$n[141] = 13;
$096bda2aad5b9f56$var$n[142] = 13;
$096bda2aad5b9f56$var$n[143] = 13;
$096bda2aad5b9f56$var$n[144] = 13;
$096bda2aad5b9f56$var$n[145] = 13;
$096bda2aad5b9f56$var$n[146] = 14;
$096bda2aad5b9f56$var$n[147] = 14;
$096bda2aad5b9f56$var$n[148] = 14;
$096bda2aad5b9f56$var$n[149] = 14;
$096bda2aad5b9f56$var$n[150] = 14;
$096bda2aad5b9f56$var$n[151] = 14;
$096bda2aad5b9f56$var$n[152] = 14;
$096bda2aad5b9f56$var$n[153] = 13;
$096bda2aad5b9f56$var$n[154] = 13;
$096bda2aad5b9f56$var$n[155] = 13;
$096bda2aad5b9f56$var$n[156] = 13;
$096bda2aad5b9f56$var$n[157] = 13;
$096bda2aad5b9f56$var$n[158] = 13;
$096bda2aad5b9f56$var$n[159] = 13;
$096bda2aad5b9f56$var$n[160] = 14;
$096bda2aad5b9f56$var$n[161] = 14;
$096bda2aad5b9f56$var$n[162] = 14;
$096bda2aad5b9f56$var$n[163] = 14;
$096bda2aad5b9f56$var$n[164] = 14;
$096bda2aad5b9f56$var$n[165] = 14;
$096bda2aad5b9f56$var$n[166] = 14;
$096bda2aad5b9f56$var$n[167] = 13;
$096bda2aad5b9f56$var$n[168] = 13;
$096bda2aad5b9f56$var$n[169] = 13;
$096bda2aad5b9f56$var$n[170] = 13;
$096bda2aad5b9f56$var$n[171] = 13;
$096bda2aad5b9f56$var$n[172] = 13;
$096bda2aad5b9f56$var$n[173] = 13;
$096bda2aad5b9f56$var$n[174] = 13;
$096bda2aad5b9f56$var$n[175] = 13;
$096bda2aad5b9f56$var$n[176] = 13;
$096bda2aad5b9f56$var$n[177] = 13;
$096bda2aad5b9f56$var$n[178] = 525;
$096bda2aad5b9f56$var$n[179] = 653;
$096bda2aad5b9f56$var$n[180] = 269;
$096bda2aad5b9f56$var$n[181] = 13;
$096bda2aad5b9f56$var$n[182] = 525;
$096bda2aad5b9f56$var$n[183] = 525;
$096bda2aad5b9f56$var$n[184] = 653;
$096bda2aad5b9f56$var$n[185] = 269;
$096bda2aad5b9f56$var$n[186] = 13;
$096bda2aad5b9f56$var$n[187] = 525;
$096bda2aad5b9f56$var$n[188] = 13;
$096bda2aad5b9f56$var$n[189] = 13;
$096bda2aad5b9f56$var$n[190] = 13;
$096bda2aad5b9f56$var$n[191] = 13;
$096bda2aad5b9f56$var$n[192] = 13;
$096bda2aad5b9f56$var$n[193] = 13;
$096bda2aad5b9f56$var$n[194] = 13;
$096bda2aad5b9f56$var$n[195] = 13;
$096bda2aad5b9f56$var$n[196] = 13;
var $096bda2aad5b9f56$var$Ee = new Int32Array(65536), $096bda2aad5b9f56$var$ke = $096bda2aad5b9f56$var$Oe(), $096bda2aad5b9f56$var$Ie = (_, m, $, q, D, N, o, p, R)=>{
    let k = ()=>{
        let e = 0, F = 0, l;
        do l = r[H++], e |= (l & 127) << F, F += 7;
        while (l & 128);
        return e >>> 0;
    }, X = ()=>{
        let e = 0, F = 0, l;
        do l = r[H++], e |= (l & 127) << F, F += 7;
        while (l & 128);
        return F < 32 && l & 64 ? e | -1 << F : e;
    }, U = ()=>{
        let e = 0n, F = 0n, l;
        do l = r[H++], e |= BigInt(l & 127) << F, F += 7n;
        while (l & 128);
        return F < 64 && l & 64 ? e | ~0n << F : e;
    }, W = ()=>{
        let e = r[H];
        if (e === 64) return H++, [
            0,
            0
        ];
        if (e & 64) return H++, [
            0,
            1
        ];
        let F = k(), [l, f] = O[F];
        return [
            l.length,
            f.length
        ];
    }, t = $096bda2aad5b9f56$var$Ee, B = [], g = 0, A = [], w = 0, y = (e)=>{
        for(; w < e;)ce.push("s" + ++w);
        return "s" + e;
    }, S = (e, F, l)=>`c.${e}[${a(F)}${l ? "+" + l : ""}]`, I = (e, F, l, f)=>`c.${e}[${a(F)}${l ? "+" + l : ""}]=${f}`, T = (e, F, l)=>`c.${"dv"}.get${e}(${a(F)}${l ? "+" + l : ""},1)`, b = (e, F, l, f)=>`c.${"dv"}.set${e}(${a(F)}${l ? "+" + l : ""},${f},1)`, a = (e)=>e < 0 ? y(-e) : `(${z(e)})`, z = (e)=>{
        let F = t[e];
        switch(F & 255){
            case 0:
                return `l.h(${a(t[e + 1])})`;
            case 1:
                return `l.M(${a(t[e + 1])})`;
            case 2:
                return `l.h(${a(t[e + 1])})`;
            case 3:
                return `l.M(${a(t[e + 1])})`;
            case 4:
                return `l.x(${a(t[e + 1])})`;
            case 5:
                return `l.p(${a(t[e + 1])})`;
            case 6:
                return `l.x(${a(t[e + 1])})`;
            case 7:
                return `l.p(${a(t[e + 1])})`;
            case 10:
                return `c.${"u8"}.copyWithin(${a(t[e + 1])},T=${a(t[e + 2])},T+${a(t[e + 3])})`;
            case 11:
                return `c.${"u8"}.fill(${a(t[e + 1])},T=${a(t[e + 2])},T+${a(t[e + 3])})`;
            case 16:
                {
                    let l = F >> 8 & 65535, f = t[e + l + 1], [E, Q] = m[f], L = [];
                    for(let V = 1; V <= l; V++)L.push(a(t[e + V]));
                    let ee = `f[${f}](${L})`;
                    if (Q.length < 2) return ee;
                    let K = t[e + l + 2], ae = [];
                    for(let V = 0; V < Q.length; V++)ae.push(y(K + V));
                    return `[${ae}]=${ee}`;
                }
            case 17:
                {
                    let l = F >> 8 & 65535, f = t[e + l + 2], [E, Q] = O[f], L = [], ee = a(t[e + 1]);
                    for(let G = 1; G <= l; G++)L.push(a(t[e + G + 1]));
                    let K = `t[${ee}](${L})`;
                    if (Q.length < 2) return K;
                    let ae = t[e + l + 3], V = [];
                    for(let G = 0; G < Q.length; G++)V.push(y(ae + G));
                    return `[${V}]=${K}`;
                }
            case 27:
                return `${a(t[e + 1])}?${a(t[e + 2])}:${a(t[e + 3])}`;
            case 32:
                return le[t[e + 1]];
            case 33:
            case 34:
                return `${le[t[e + 2]]}=${a(t[e + 1])}`;
            case 35:
                return `g[${t[e + 1]}]`;
            case 36:
                return `g[${t[e + 2]}]=${a(t[e + 1])}`;
            case 40:
                return T("Int32", t[e + 1], t[e + 2]);
            case 245:
                return T("Uint32", t[e + 1], t[e + 2]);
            case 41:
                return T("BigUint64", t[e + 1], t[e + 2]);
            case 246:
                return T("BigInt64", t[e + 1], t[e + 2]);
            case 42:
                return T("Float32", t[e + 1], t[e + 2]);
            case 43:
                return T("Float64", t[e + 1], t[e + 2]);
            case 44:
                return S("i8", t[e + 1], t[e + 2]);
            case 45:
                return S("u8", t[e + 1], t[e + 2]);
            case 46:
                return T("Int16", t[e + 1], t[e + 2]);
            case 47:
                return T("Uint16", t[e + 1], t[e + 2]);
            case 48:
                return `BigInt(${S("i8", t[e + 1], t[e + 2])})&0xFFFFFFFFFFFFFFFFn`;
            case 49:
                return `BigInt(${S("u8", t[e + 1], t[e + 2])})`;
            case 50:
                return `BigInt(${T("Int16", t[e + 1], t[e + 2])})&0xFFFFFFFFFFFFFFFFn`;
            case 51:
                return `BigInt(${T("Uint16", t[e + 1], t[e + 2])})`;
            case 52:
                return `BigInt(${T("Int32", t[e + 1], t[e + 2])})&0xFFFFFFFFFFFFFFFFn`;
            case 53:
                return `BigInt(${T("Uint32", t[e + 1], t[e + 2])})`;
            case 54:
                return b("Int32", t[e + 1], t[e + 3], a(t[e + 2]));
            case 55:
                return b("BigUint64", t[e + 1], t[e + 3], a(t[e + 2]));
            case 56:
                return b("Float32", t[e + 1], t[e + 3], a(t[e + 2]));
            case 57:
                return b("Float64", t[e + 1], t[e + 3], a(t[e + 2]));
            case 58:
                return I("u8", t[e + 1], t[e + 3], a(t[e + 2]));
            case 59:
                return b("Int16", t[e + 1], t[e + 3], a(t[e + 2]));
            case 60:
                return I("u8", t[e + 1], t[e + 3], `Number(${a(t[e + 2])}&255n)`);
            case 61:
                return b("Int16", t[e + 1], t[e + 3], `Number(${a(t[e + 2])}&65535n)`);
            case 62:
                return b("Int32", t[e + 1], t[e + 3], `Number(${a(t[e + 2])}&0xFFFFFFFFn)`);
            case 63:
                if (t[e + 1]) throw new Error("Unsupported non-zero memory index");
                return `c.${"pc"}`;
            case 64:
                if (t[e + 2]) throw new Error("Unsupported non-zero memory index");
                return `c.${"pg"}(${a(t[e + 1])})`;
            case 65:
                return t[e + 1] + "";
            case 66:
                return (A[t[e + 1]] & 0xFFFFFFFFFFFFFFFFn) + "n";
            case 67:
                return u.getFloat32(t[e + 1], !0) + "";
            case 68:
                return u.getFloat64(t[e + 1], !0) + "";
            case 240:
                return a(t[e + 1]);
            case 241:
                return `!${a(t[e + 1])}`;
            case 242:
                return `${a(t[e + 1])}?1:0`;
            case 243:
                return `${a(t[e + 1])}>>>0`;
            case 244:
                return `l.c(${a(t[e + 1])})`;
            case 69:
            case 80:
                return `${a(t[e + 1])}?0:1`;
            case 70:
            case 81:
            case 91:
            case 97:
                return `${a(t[e + 1])}===${a(t[e + 2])}`;
            case 71:
            case 82:
            case 92:
            case 98:
                return `${a(t[e + 1])}!==${a(t[e + 2])}`;
            case 72:
            case 73:
            case 83:
            case 84:
            case 93:
            case 99:
                return `${a(t[e + 1])}<${a(t[e + 2])}`;
            case 74:
            case 75:
            case 85:
            case 86:
            case 94:
            case 100:
                return `${a(t[e + 1])}>${a(t[e + 2])}`;
            case 76:
            case 77:
            case 87:
            case 88:
            case 95:
            case 101:
                return `${a(t[e + 1])}<=${a(t[e + 2])}`;
            case 78:
            case 79:
            case 89:
            case 90:
            case 96:
            case 102:
                return `${a(t[e + 1])}>=${a(t[e + 2])}`;
            case 103:
                return `Math.clz32(${a(t[e + 1])})`;
            case 104:
                return `l.k(${a(t[e + 1])})`;
            case 105:
                return `l.v(${a(t[e + 1])})`;
            case 106:
                return `${a(t[e + 1])}+${a(t[e + 2])}|0`;
            case 107:
                return `${a(t[e + 1])}-${a(t[e + 2])}|0`;
            case 108:
                return `Math.imul(${a(t[e + 1])},${a(t[e + 2])})`;
            case 110:
            case 109:
                return `${a(t[e + 1])}/${a(t[e + 2])}|0`;
            case 112:
            case 111:
                return `${a(t[e + 1])}%${a(t[e + 2])}|0`;
            case 113:
                return `${a(t[e + 1])}&${a(t[e + 2])}`;
            case 114:
                return `${a(t[e + 1])}|${a(t[e + 2])}`;
            case 115:
                return `${a(t[e + 1])}^${a(t[e + 2])}`;
            case 116:
                return `${a(t[e + 1])}<<${a(t[e + 2])}`;
            case 117:
                return `${a(t[e + 1])}>>${a(t[e + 2])}`;
            case 118:
                return `${a(t[e + 1])}>>>${a(t[e + 2])}|0`;
            case 119:
                return `l.L(${a(t[e + 1])},${a(t[e + 2])})`;
            case 120:
                return `l.U(${a(t[e + 1])},${a(t[e + 2])})`;
            case 121:
                return `l.Q(${a(t[e + 1])})`;
            case 122:
                return `l.H(${a(t[e + 1])})`;
            case 123:
                return `l.q(${a(t[e + 1])})`;
            case 124:
                return `(${a(t[e + 1])}+${a(t[e + 2])})&0xFFFFFFFFFFFFFFFFn`;
            case 125:
                return `(${a(t[e + 1])}-${a(t[e + 2])})&0xFFFFFFFFFFFFFFFFn`;
            case 126:
                return `(${a(t[e + 1])}*${a(t[e + 2])})&0xFFFFFFFFFFFFFFFFn`;
            case 127:
                return `${a(t[e + 1])}/${a(t[e + 2])}&0xFFFFFFFFFFFFFFFFn`;
            case 128:
                return `${a(t[e + 1])}/${a(t[e + 2])}`;
            case 129:
                return `${a(t[e + 1])}%${a(t[e + 2])}&0xFFFFFFFFFFFFFFFFn`;
            case 130:
                return `${a(t[e + 1])}%${a(t[e + 2])}`;
            case 131:
                return `${a(t[e + 1])}&${a(t[e + 2])}`;
            case 132:
                return `${a(t[e + 1])}|${a(t[e + 2])}`;
            case 133:
                return `${a(t[e + 1])}^${a(t[e + 2])}`;
            case 134:
                return `${a(t[e + 1])}<<${a(t[e + 2])}&0xFFFFFFFFFFFFFFFFn`;
            case 135:
                return `l.c(${a(t[e + 1])})>>${a(t[e + 2])}&0xFFFFFFFFFFFFFFFFn`;
            case 136:
                return `${a(t[e + 1])}>>${a(t[e + 2])}`;
            case 137:
                return `l.D(${a(t[e + 1])},${a(t[e + 2])})`;
            case 138:
                return `l.N(${a(t[e + 1])},${a(t[e + 2])})`;
            case 139:
            case 153:
                return `Math.abs(${a(t[e + 1])})`;
            case 140:
            case 154:
                return `-${a(t[e + 1])}`;
            case 141:
            case 155:
                return `Math.ceil(${a(t[e + 1])})`;
            case 142:
            case 156:
                return `Math.floor(${a(t[e + 1])})`;
            case 143:
            case 157:
                return `Math.trunc(${a(t[e + 1])})`;
            case 144:
            case 158:
                return `Math.round(${a(t[e + 1])})`;
            case 145:
            case 159:
                return `Math.sqrt(${a(t[e + 1])})`;
            case 146:
            case 160:
                return `${a(t[e + 1])}+${a(t[e + 2])}`;
            case 147:
            case 161:
                return `${a(t[e + 1])}-${a(t[e + 2])}`;
            case 148:
            case 162:
                return `${a(t[e + 1])}*${a(t[e + 2])}`;
            case 149:
            case 163:
                return `${a(t[e + 1])}/${a(t[e + 2])}`;
            case 150:
            case 164:
                return `Math.min(${a(t[e + 1])},${a(t[e + 2])})`;
            case 151:
            case 165:
                return `Math.max(${a(t[e + 1])},${a(t[e + 2])})`;
            case 152:
            case 166:
                return `l.R(${a(t[e + 1])},${a(t[e + 2])})`;
            case 167:
                return `Number(${a(t[e + 1])}&0xFFFFFFFFn)|0`;
            case 168:
            case 169:
            case 170:
            case 171:
                return `Math.trunc(${a(t[e + 1])})|0`;
            case 172:
                return `BigInt(${a(t[e + 1])})`;
            case 173:
                return `BigInt(${a(t[e + 1])}>>>0)`;
            case 174:
            case 175:
            case 176:
            case 177:
                return `BigInt(Math.trunc(${a(t[e + 1])}))&0xFFFFFFFFFFFFFFFFn`;
            case 180:
            case 181:
            case 186:
            case 185:
                return `Number(${a(t[e + 1])})`;
            case 188:
                return `l.W(${a(t[e + 1])})`;
            case 189:
                return `l.j(${a(t[e + 1])})`;
            case 190:
                return `l.V(${a(t[e + 1])})`;
            case 191:
                return `l.G(${a(t[e + 1])})`;
            case 192:
                return `${a(t[e + 1])}<<24>>24`;
            case 193:
                return `${a(t[e + 1])}<<16>>16`;
            case 194:
                return `l.J(${a(t[e + 1])})`;
            case 195:
                return `l.K(${a(t[e + 1])})`;
            case 196:
                return `l.X(${a(t[e + 1])})`;
            default:
                throw "Internal error";
        }
    }, d = (e, F)=>{
        let l = g;
        return t[l] = e, g += F, l;
    }, i = (e, F = x)=>{
        B.push(g), t[g++] = e | 256 | F << 24, t[g++] = -F;
    }, s = (e = !1)=>{
        let F = [], l = B.length - 1, f = (L)=>{
            let ee = t[L], K = ee & 255, ae = ee >> 8 & 65535, V = K >= 40 && K <= 62 || K === 10 || K === 11;
            for(let G = ae - 1; l >= 0 && G >= 0; G--){
                let Ce = -t[L + G + 1], Pe = !1;
                for(let oe = l; oe >= 0; oe--){
                    let he = B[oe];
                    if (he === null) continue;
                    let be = t[he], se = be & 255;
                    if (V && (se < 65 || se > 66) && se != 32) break;
                    if (be >>> 24 === Ce) {
                        B[oe] = null, Pe || (l = oe - 1), t[L + G + 1] = f(he);
                        break;
                    }
                    if (se !== 243 && se !== 244) break;
                    Pe = !0;
                }
            }
            return $096bda2aad5b9f56$var$ke(t, A, d, L);
        }, E;
        for(; l >= 0;){
            let L = l--;
            (E = B[L]) !== null && (B[L] = f(E));
        }
        let Q;
        for(l = B.length - 1, e && (l >= 0 && (E = B[l]) !== null && t[E] >>> 24 === x ? (Q = z(E), l--) : Q = "s" + x, x--); l >= 0;)if ((E = B[l--]) !== null) {
            let L = t[E] >>> 24;
            F.push(`${L ? y(L) + "=" : ""}${z(E)};`);
        }
        return C += F.reverse().join(""), A.length = 0, B.length = 0, g = 0, Q;
    }, { b: r, S: u, d: h, f: c, A: M, m: O } = o, [v, te] = O[c[p]], [Fe, J, j] = h[p], le = [], ye = v.length;
    for(let e = 0; e < ye; e++)le.push("a" + e);
    let ce = [
        "L",
        "T"
    ];
    for (let [e, F] of Fe)for(let l = 0; l < e; l++){
        let f = "t" + ce.length;
        le.push(f), ce.push(f + (F === 126 ? "=0n" : "=0"));
    }
    let Y = 256, fe = (e)=>{
        let F = P.length < Y;
        F ? C += `b${P.length}:` : P.length === Y && (C += `L=1;b${P.length}:for(;;){switch(L){case 1:`, me = 2);
        let l = F ? -1 : me++, f = F ? -1 : e !== 0 ? me++ : 0, [E, Q] = W();
        return P.push({
            r: E,
            a: !1,
            _: e,
            g: l,
            s: f,
            o: x - E,
            l: Q
        }), f;
    }, Z = (e = P.length - k() - 1)=>{
        if (P[P.length - 1].a) return;
        let F = P[e];
        if (e) {
            if (F._ === 1) {
                if (x > F.o + F.r) for(let l = 1; l <= F.r; l++)C += `s${F.o + l}=s${x - F.r + l};`;
                C += e < Y ? `continue b${e};` : `L=${F.s};continue;`;
            } else {
                if (x > F.o + F.l) for(let l = 1; l <= F.l; l++)C += `s${F.o + l}=s${x - F.l + l};`;
                C += e <= Y ? `break b${e};` : `L=${F.g};continue;`;
            }
        } else if (F.l === 1) C += `return s${x};`;
        else if (F.l > 1) {
            let l = [];
            for(let f = F.l - 1; f >= 0; f--)l.push("s" + (x - f));
            C += `return[${l}];`;
        } else C += "return;";
    }, P = [
        {
            r: 0,
            a: !1,
            _: 0,
            g: -1,
            s: -1,
            o: 0,
            l: te.length
        }
    ], x = 0, H = J, me = 0, C = "b0:{";
    for(; H < j;){
        let e = r[H++], F = $096bda2aad5b9f56$var$n[e];
        if (F & 8) {
            if (P[P.length - 1].a) F & 32 && H++, F & 16 && k();
            else {
                let l = F & 3;
                if (F & 1024 && (B.push(g), t[g++] = 66 | x + 1 << 24, t[g++] = A.length, A.push(63n), B.push(g), t[g++] = 643 | x << 24, t[g++] = -x, t[g++] = -(x + 1)), x -= l, F & 384) for(let f = 0; f < l; f++)i(F & 128 ? 243 : 244, x + f + 1);
                if (!(F & 512)) {
                    F & 32 && H++, B.push(g), F & 4 && (e |= x + 1 << 24), t[g++] = e | l << 8;
                    for(let f = 1; f <= l; f++)t[g++] = -(x + f);
                    F & 16 && (t[g++] = k());
                }
                F & 4 && x++, F & 64 && i(242);
            }
        } else switch(e){
            case 0:
                {
                    let l = P[P.length - 1];
                    s(), l.a || (C += '"unreachable"();', l.a = !0);
                    break;
                }
            case 2:
                s(), fe(0) < 0 && (C += "{");
                break;
            case 3:
                {
                    s();
                    let l = fe(1);
                    C += l < 0 ? "for(;;){" : `case ${l}:`;
                    break;
                }
            case 4:
                {
                    P[P.length - 1].a || i(P.length < Y ? 240 : 241);
                    let l = s(!0), f = fe(2);
                    C += f < 0 ? `if(${l}){` : `if(${l}){L=${f};continue}`;
                    break;
                }
            case 5:
                {
                    s();
                    let l = P.length - 1, f = P[l];
                    Z(l), C += l < Y ? "}else{" : `case ${f.s}:`, f._ = 0, x = f.o + f.r, f.a = !1;
                    break;
                }
            case 11:
                {
                    s();
                    let l = P.length - 1, f = P[l];
                    f._ !== 2 && (f.s = 0), f._ = 0, Z(l), l < Y ? C += "}" : (f.s && (C += `case ${f.s}:`), C += `case ${f.g}:`, l == Y && (C += "}break}")), x = f.o + f.l, P.pop();
                    break;
                }
            case 12:
                s(), Z(), P[P.length - 1].a = !0;
                break;
            case 13:
                {
                    P[P.length - 1].a || i(240);
                    let l = s(!0);
                    C += `if(${l}){`, Z(), C += "}";
                    break;
                }
            case 14:
                {
                    let l = s(!0);
                    C += `switch(${l}){`;
                    for(let f = 0, E = k(); f < E; f++)C += `case ${f}:`, Z();
                    C += "default:", Z(), C += "}", P[P.length - 1].a = !0;
                    break;
                }
            case 15:
                s(), Z(0), P[P.length - 1].a = !0;
                break;
            case 16:
                {
                    let l = k();
                    if (!P[P.length - 1].a) {
                        let [f, E] = m[l];
                        x -= f.length, B.push(g), E.length === 1 && (e |= x + 1 << 24), t[g++] = e | f.length << 8;
                        for(let Q = 1; Q <= f.length; Q++)t[g++] = -(x + Q);
                        t[g++] = l, E.length > 1 && (t[g++] = x + 1), x += E.length;
                    }
                    break;
                }
            case 17:
                {
                    let l = k(), f = k();
                    if (f !== 0) throw new Error("Unsupported table index: " + f);
                    if (!P[P.length - 1].a) {
                        let [E, Q] = O[l];
                        x -= E.length + 1, B.push(g), Q.length === 1 && (e |= x + 1 << 24), t[g++] = e | E.length << 8, t[g++] = -(x + E.length + 1);
                        for(let L = 1; L <= E.length; L++)t[g++] = -(x + L);
                        t[g++] = l, Q.length > 1 && (t[g++] = x + 1), x += Q.length;
                    }
                    break;
                }
            case 27:
                P[P.length - 1].a || (i(240), x -= 2, B.push(g), t[g++] = e | 768 | x << 24, t[g++] = -(x + 2), t[g++] = -x, t[g++] = -(x + 1));
                break;
            case 65:
                P[P.length - 1].a ? X() : (B.push(g), t[g++] = e | ++x << 24, t[g++] = X());
                break;
            case 66:
                P[P.length - 1].a ? U() : (B.push(g), t[g++] = e | ++x << 24, t[g++] = A.length, A.push(U()));
                break;
            case 67:
                P[P.length - 1].a || (B.push(g), t[g++] = e | ++x << 24, t[g++] = H), H += 4;
                break;
            case 68:
                P[P.length - 1].a || (B.push(g), t[g++] = e | ++x << 24, t[g++] = H), H += 8;
                break;
            case 252:
                if (e = r[H++], e <= 7) P[P.length - 1].a || i(e);
                else if (e === 10) {
                    if (r[H++] || r[H++]) throw new Error("Unsupported non-zero memory index");
                    P[P.length - 1].a || (x -= 2, B.push(g), t[g++] = e | 768 | x << 24, t[g++] = -x, t[g++] = -(x + 1), t[g++] = -(x + 2));
                } else if (e === 11) {
                    if (r[H++]) throw new Error("Unsupported non-zero memory index");
                    P[P.length - 1].a || (x -= 2, B.push(g), t[g++] = e | 768 | x << 24, t[g++] = -(x + 1), t[g++] = -x, t[g++] = -(x + 2));
                } else throw new Error("Unsupported instruction: 0xFC" + e.toString(16).padStart(2, "0"));
                break;
            default:
                throw new Error("Unsupported instruction: 0x" + e.toString(16).padStart(2, "0"));
        }
    }
    if (w > 255) throw new Error("Deep stacks are not supported");
    let $e = JSON.stringify("wasm:" + (M.get(R) || `function[${p}]`)), we = `return{${$e}(${le.slice(0, ye)}){var ${ce};${C}}}[${$e}]`;
    return new Function("f", "c", "t", "g", "l", we)(_, N, $, q, D);
};
var $096bda2aad5b9f56$var$Be = ()=>{
    let _ = new ArrayBuffer(8), m = new Float32Array(_), $ = new Float64Array(_), q = new Int32Array(_), D = new BigInt64Array(_), N = new BigUint64Array(_);
    return {
        R (o, p) {
            return (o < 0 || o === 0 && Object.is(o, -0)) !== (p < 0 || p === 0 && Object.is(p, -0)) ? -o : o;
        },
        c (o) {
            return N[0] = o, D[0];
        },
        W (o) {
            return m[0] = o, q[0];
        },
        V (o) {
            return q[0] = o, m[0];
        },
        j (o) {
            return $[0] = o, N[0];
        },
        G (o) {
            return N[0] = o, $[0];
        },
        L (o, p) {
            return o << p | o >>> 32 - p;
        },
        U (o, p) {
            return o >>> p | o << 32 - p;
        },
        D (o, p) {
            return (o << p | o >> 64n - p) & 0xFFFFFFFFFFFFFFFFn;
        },
        N (o, p) {
            return (o >> p | o << 64n - p) & 0xFFFFFFFFFFFFFFFFn;
        },
        k (o) {
            return o ? Math.clz32(o & -o) ^ 31 : 32;
        },
        v (o) {
            let p = 0;
            for(; o;)p++, o &= o - 1;
            return p;
        },
        Q (o) {
            let p = Math.clz32(Number(o >> 32n & 0xFFFFFFFFn));
            return p === 32 && (p += Math.clz32(Number(o & 0xFFFFFFFFn))), BigInt(p);
        },
        H (o) {
            let p = Number(o & 0xFFFFFFFFn);
            return p ? BigInt(Math.clz32(p & -p) ^ 31) : (p = Number(o >> 32n & 0xFFFFFFFFn), p ? BigInt(32 + Math.clz32(p & -p) ^ 31) : 64n);
        },
        q (o) {
            let p = 0n;
            for(; o;)p++, o &= o - 1n;
            return p;
        },
        h (o) {
            return o = Math.trunc(o), o >= 2147483647 ? 2147483647 : o <= -2147483648 ? -2147483648 : o | 0;
        },
        M (o) {
            return o = Math.trunc(o), o >= 4294967295 ? -1 : o <= 0 ? 0 : o | 0;
        },
        x (o) {
            return o = Math.trunc(o), o >= 9223372036854776e3 ? 0x7FFFFFFFFFFFFFFFn : o <= -9223372036854776000 ? 0x8000000000000000n : o === o ? BigInt(o) & 0xFFFFFFFFFFFFFFFFn : 0n;
        },
        p (o) {
            return o = Math.trunc(o), o >= 18446744073709552e3 ? 0xFFFFFFFFFFFFFFFFn : o > 0 ? BigInt(o) : 0n;
        },
        J (o) {
            return o & 0x80n ? o | 0xFFFFFFFFFFFFFF00n : o & 0xFFn;
        },
        K (o) {
            return o & 0x8000n ? o | 0xFFFFFFFFFFFF0000n : o & 0xFFFFn;
        },
        X (o) {
            return o & 0x80000000n ? o | 0xFFFFFFFF00000000n : o & 0xFFFFFFFFn;
        }
    };
};
var $096bda2aad5b9f56$var$re = class {
}, $096bda2aad5b9f56$var$_e = class {
}, $096bda2aad5b9f56$var$ue = class {
};
var $096bda2aad5b9f56$var$pe = class {
}, $096bda2aad5b9f56$var$Te = (_, m, $ = new Uint8Array(m))=>{
    _["i8"] = new Int8Array(m), _["u8"] = $, _["dv"] = new DataView(m);
}, $096bda2aad5b9f56$var$ve = (_, m)=>{
    let $ = _["pc"];
    if (m >>>= 0, $ + m > _.y) return -1;
    if (m) {
        let q = _.Y.buffer = new ArrayBuffer((_["pc"] += m) << 16), D = _["u8"], N = new Uint8Array(q);
        N.set(D), $096bda2aad5b9f56$var$Te(_, q, N);
        try {
            structuredClone(D.buffer, {
                transfer: [
                    D.buffer
                ]
            });
        } catch  {}
    }
    return $;
}, $096bda2aad5b9f56$var$ie = class {
    constructor(m, $){
        let q = $096bda2aad5b9f56$var$Me.get(m), { d: D, O: N, I: o, B: p, f: R, T: k, w: X, C: U, z: W, E: t, m: B } = q, g = this.exports = {}, A = [], w = [], y = [], S = [], I = [], T = $096bda2aad5b9f56$var$Be(), b = new $096bda2aad5b9f56$var$pe, a = b.Y = new $096bda2aad5b9f56$var$_e;
        if (U.length > 1) throw new Error(`Unsupported memory count: ${U.length}`);
        if (U.length > 0) {
            let [i, s] = U[0];
            b.y = Math.min(s, 65535), b["pc"] = i;
        } else b.y = 0, b["pc"] = 0;
        let z = b["pg"] = (i)=>$096bda2aad5b9f56$var$ve(b, i);
        a.grow = (i)=>{
            let s = z(i);
            if (s < 0) throw new RangeError("Cannot grow past limit");
            return s;
        }, $096bda2aad5b9f56$var$Te(b, a.buffer = new ArrayBuffer(b["pc"] << 16));
        for (let [i, s, r] of N){
            if (i !== 0) throw new Error(`Invalid memory index: ${i}`);
            b["u8"].set(r, s);
        }
        for (let i of X){
            let [s, r, u, h] = i, c = $[s][r];
            if (u === 0) {
                let M = B[h], [O, v] = M, te = [], Fe = [];
                for(let j = 0; j < O.length; j++)te.push("a" + j), Fe.push($096bda2aad5b9f56$var$de("a" + j, O[j]));
                let J = `f(${Fe})`;
                if (v.length === 1) J = "return " + $096bda2aad5b9f56$var$ge(J, v[0]);
                else if (v.length > 1) {
                    J = `let r=${J};`;
                    for(let j = 0; j < v.length; j++)J += `r[${j}]=${$096bda2aad5b9f56$var$ge(`r[${j}]`, v[j])};`;
                    J += "return r";
                }
                A.push(new Function("f", "l", `return(${te})=>{${J}}`)(c, T)), w.push(M);
            } else if (u === 3) y.push($096bda2aad5b9f56$var$xe(c, h)), S.push(h);
            else throw new Error(`Unsupported import type ${u} for "${s}"."${r}"`);
        }
        for (let [i, s, r] of k)y.push(r(y)), S.push(i);
        for(let i = 0; i < D.length; i++){
            let s = A.length;
            w.push(B[R[i]]), A.push((...r)=>(A[s] = $096bda2aad5b9f56$var$Ie(A, w, I[0], y, T, b, q, i, s))(...r));
        }
        for (let [i, s, r] of t){
            let u = [];
            for(let h = 0; h < s; h++)u.push(null);
            I.push(u);
        }
        for (let [i, s] of o){
            if (I.length !== 1) throw new Error("Multiple tables are unsupported");
            let r = I[0];
            for (let u of s){
                let h = i++;
                r[h] = (...c)=>{
                    let M = A[u](...c);
                    return r[h] = A[u], M;
                };
            }
        }
        let d = (i)=>{
            let [s, r] = w[i], u = [], h = [];
            for(let M = 0; M < s.length; M++)u.push("a" + M), h.push($096bda2aad5b9f56$var$ge("a" + M, s[M]));
            let c = `f[i](${h})`;
            if (r.length === 1) c = "return " + $096bda2aad5b9f56$var$de(c, r[0]);
            else if (r.length > 1) {
                c = `let r=${c};`;
                for(let M = 0; M < r.length; M++)c += `r[${M}]=${$096bda2aad5b9f56$var$de(`r[${M}]`, r[M])};`;
                c += "return r";
            }
            return new Function("f", "i", "l", `return(${u})=>{${c}}`)(A, i, T);
        };
        for (let [i, s, r] of p)if (s === 0) g[i] = d(r);
        else if (s === 1) {
            let u = [];
            for (let [c, M] of o)for (let O of M)u[c++] = d(O);
            let h = new $096bda2aad5b9f56$var$ue;
            Object.defineProperty(h, "length", {
                get: ()=>u.length
            }), h.get = (c)=>u[c], h.grow = ()=>{
                throw new Error(`Unsupported operation "grow" on table ${r}`);
            }, h.set = ()=>{
                throw new Error(`Unsupported operation "set" on table ${r}`);
            }, g[i] = h;
        } else if (s === 2) g[i] = a;
        else if (s === 3) {
            let u = new $096bda2aad5b9f56$var$re, h = S[r];
            Object.defineProperty(u, "value", {
                get: ()=>y[r],
                set: (c)=>{
                    y[r] = $096bda2aad5b9f56$var$xe(c, h);
                }
            }), g[i] = u;
        } else throw new Error(`Unsupported export type ${s} for "${i}"`);
        W >= 0 && A[W]();
    }
};
var $096bda2aad5b9f56$var$Le = async (_, m)=>{
    if (_ instanceof $096bda2aad5b9f56$var$ne) return new $096bda2aad5b9f56$var$ie(_, m);
    let $ = new $096bda2aad5b9f56$var$ne(_);
    return {
        module: $,
        instance: new $096bda2aad5b9f56$var$ie($, m)
    };
}, $096bda2aad5b9f56$export$c68cf39b93e8c7f5 = {
    Global: $096bda2aad5b9f56$var$re,
    Instance: $096bda2aad5b9f56$var$ie,
    instantiate: $096bda2aad5b9f56$var$Le,
    Memory: $096bda2aad5b9f56$var$_e,
    Module: $096bda2aad5b9f56$var$ne,
    Table: $096bda2aad5b9f56$var$ue
};


if (polywasm === 1 || !globalThis.WebAssembly && polywasm !== 0) {
    globalThis.WebAssembly = (0, $096bda2aad5b9f56$export$c68cf39b93e8c7f5);
    postMessage({
        status_: "slow"
    });
}
// Do the setup in an async function to capture errors thrown (e.g. "WebAssembly" doesn't exist)
const $80e65edb9ba286a5$var$setup = async ([version, wasm])=>{
    const [major, minor, patch] = version.split(".").map((x)=>+x);
    // Versions 0.5.20 to 0.8.34 have a bug where "worker" doesn't work. This
    // means that the "build" API is broken (because we can't inject our file
    // system shim) but the "transform" API still works, so we still allow
    // these buggy versions.
    const hasBugWithWorker = major === 0 && (minor === 5 && patch >= 20 || minor >= 6 && minor <= 7 || minor === 8 && patch <= 34);
    const options = {
        // This uses "wasmURL" instead of "wasmModule" because "wasmModule" was added in version 0.14.32
        wasmURL: URL.createObjectURL(new Blob([
            wasm
        ], {
            type: "application/wasm"
        }))
    };
    // Avoid triggering an esbuild bug that causes all output to be empty
    if (!hasBugWithWorker) options.worker = false;
    // Use the "startService" API before version 0.9.0
    if (esbuild.startService) return await esbuild.startService(options);
    // Otherwise use the "initialize" API
    await esbuild.initialize(options);
    return esbuild;
};
const $80e65edb9ba286a5$var$formatMessages = (api, messages, options)=>{
    if (api.formatMessages) return api.formatMessages(messages, options);
    // Do something reasonable for version 0.10.0 and earlier
    const format = (kind, text, location)=>{
        let result = kind === "note" ? "   " : "\x1b[1m > ";
        if (location) result += `${location.file}:${location.line}:${location.column}: `;
        result += kind === "error" ? "\x1b[31merror:\x1b[1m " : kind === "warning" ? "\x1b[35mwarning:\x1b[1m " : "\x1b[1mnote:\x1b[0m ";
        result += text + "\x1b[0m\n";
        if (location) {
            const { line: line, column: column, length: length, lineText: lineText } = location;
            const prefix = line.toString().padStart(5);
            result += `\x1B[37m${prefix} \u{2502} ${lineText.slice(0, column)}` + `\x1B[32m${lineText.slice(column, column + length)}` + `\x1B[37m${lineText.slice(column + length)}\n` + `${" ".repeat(prefix.length)} \u{2575} \x1b[32m${" ".repeat(column)}${length > 1 ? "~".repeat(length) : "^"}\x1B[0m\n`;
        }
        return result;
    };
    return Promise.resolve(messages.map((msg)=>{
        let result = format(options.kind, msg.text, msg.location);
        for (const note of msg.notes || [])result += format("note", note.text, note.location);
        return result + "\n";
    }));
};
onmessage = (e)=>{
    $80e65edb9ba286a5$var$setup(e.data).then((api)=>{
        onmessage = (e)=>{
            const respondWithError = (respond, err)=>{
                let errors = err && err.errors;
                let warnings = err && err.warnings;
                if (!errors && !warnings) errors = [
                    {
                        text: err + ""
                    }
                ];
                Promise.all([
                    errors ? $80e65edb9ba286a5$var$formatMessages(api, errors, {
                        kind: "error",
                        color: color
                    }) : [],
                    warnings ? $80e65edb9ba286a5$var$formatMessages(api, warnings, {
                        kind: "warning",
                        color: color
                    }) : []
                ]).then(([errors, warnings])=>{
                    respond({
                        stderr_: [
                            ...errors,
                            ...warnings
                        ].join("")
                    });
                });
            };
            // There are two sources of log information: the log messages returned through
            // the API and the stderr stream from WebAssembly. The returned log messages
            // are likely colored while the stderr stream from WebAssembly likely isn't, so
            // we prefer the messages from the API. However, don't want to omit unique
            // information from WebAssembly such as verbose log messages. Remove duplicate
            // log information so each message is only shown once.
            const mergeStderrStreams = (formatted, stderr)=>{
                for (const text of formatted){
                    const replaced = stderr.replace(text, "");
                    if (replaced !== stderr) // Try with escape codes
                    stderr = replaced;
                    else {
                        // Try without escape codes
                        const replaced = text.replace(/\x1B\[[^m]*m/g, "");
                        if (replaced !== text) stderr = stderr.replace(replaced, "");
                    }
                }
                return formatted.join("") + stderr;
            };
            const finish = (warnings, done)=>{
                if (warnings.length) $80e65edb9ba286a5$var$formatMessages(api, warnings, {
                    kind: "warning",
                    color: color
                }).then((formatted)=>done(mergeStderrStreams(formatted, (0, $652fbed5655e6982$export$31240d4da7892092))));
                else done((0, $652fbed5655e6982$export$31240d4da7892092));
            };
            const request = e.data;
            const respond = postMessage;
            let color = true;
            try {
                // Transform API
                if (request.command_ === "transform") {
                    if (request.options_.color === false) color = false;
                    (0, $652fbed5655e6982$export$30e373716e984a62)({});
                    api.transform(request.input_, request.options_).then(({ code: code, map: map, js: js, jsSourceMap: jsSourceMap, warnings: warnings, mangleCache: mangleCache, legalComments: legalComments })=>finish(warnings, (stderr)=>respond({
                                // "code" and "map" were "js" and "jsSourceMap" before version 0.8.0
                                code_: code ?? js,
                                map_: map ?? jsSourceMap,
                                mangleCache_: mangleCache,
                                legalComments_: legalComments,
                                stderr_: stderr
                            })), (err)=>respondWithError(respond, err));
                } else if (request.command_ === "build") {
                    if (request.options_.color === false) color = false;
                    (0, $652fbed5655e6982$export$30e373716e984a62)(request.input_);
                    api.build(request.options_).then(({ warnings: warnings, outputFiles: outputFiles, metafile: metafile, mangleCache: mangleCache })=>finish(warnings, (stderr)=>{
                            if (outputFiles) respond({
                                outputFiles_: outputFiles.map(({ path: path, text: text })=>({
                                        path: path,
                                        text: text
                                    })),
                                metafile_: JSON.stringify(metafile),
                                mangleCache_: mangleCache,
                                stderr_: stderr
                            });
                        }), (err)=>respondWithError(respond, err));
                }
            } catch (err) {
                respondWithError(respond, err);
            }
        };
        postMessage({
            status_: "success"
        });
    }).catch((err)=>{
        console.error(err);
        postMessage({
            status_: "failure",
            error_: err + ""
        });
    });
};

})();
//# sourceMappingURL=worker.0b25d7de.js.map
