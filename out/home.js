var stdPath = __mk_emptysequence("<unprintable>");

function resetPath() {
    if (!path) path = __mk_emptysequence("<unprintable>"); else __seqReset(path);
    if (!cPath) cPath = __mk_emptysequence("<unprintable>"); else __seqReset(cPath);
    ____seqobAdd(path, fabl);
    ____seqobAdd(path, fimp);
    ____seqobAppend(path, stdPath);
    ____copyInto(cPath, path);
}

function initPath() {
    if (!path) path = __mk_emptysequence("<unprintable>"); else __seqReset(path);
    if (!cPath) cPath = __mk_emptysequence("<unprintable>"); else __seqReset(cPath);
    ____seqobAdd(path, fabl);
    ____seqobAdd(path, fimp);
    ____copyInto(cPath, path);
}

function __initHome(x) {
    var x;
    if (!____get(x, regardingPath)) ________set(x, regardingPath, [ fabl, fimp, x ], SeqOfOb);
}

var theLastHome;

{
    if (!____get(x, regardingPath)) ________set(x, regardingPath, [ fabl, fimp, x ], SeqOfOb);
}

function __setHome(x) {
    var x;
    theLastHome = home;
    __initHome(x);
    home = x;
    __collectSubject(x);
}

function lastHome() {
    if (theLastHome) {
        home = theLastHome;
        theLastHome = null;
    }
}

function __global(x) {
    var x;
    return __regarding(x);
}

function ____selectUri(x, pth) {
    var x;
    var pth;
    var ln;
    var i;
    var cx;
    ln = __seqLength(pth);
    cx = x;
    for (i = 0; i < ln; i++) {
        cx = ____selectUri(cx, pth[i]);
        if (!cx) return cx;
    }
    return cx;
}

var fablInitialized;

fabl_false;

function initFabl() {
    if (!fablInitialized) {
        initPrimops();
        initParse();
        init_flat();
        asmInit();
        fablInitialized = fabl_true;
    }
}