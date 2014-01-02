var toSerialize = __mk_emptysequence("<unprintable>");

var unSerialized = __mk_emptysequence("<unprintable>");

var serializedBindings = __mk_emptysequence("<unprintable>");

var bindingObKind;

0;

var bindingIntKind = 1;

var bindingDoubleKind = 2;

var bindingUriKind = 3;

var bindingMultiKind = 4;

var serializeCollectInC;

fabl_false;

var preambleObCount;

fabl_false;

var forDebug;

fabl_false;

var serializeStack;

fabl_false;

var serializeDebugStack;

fabl_false;

var debugStacks;

fabl_false;

function ______amongFirstN(s, n, v) {
    var s;
    var n;
    var v;
    var i;
    for (i = 0; i < n; i++) {
        if (____um_eq(v, s[i])) return fabl_true;
    }
    return fabl_false;
}

function ____serializeCollect0(x, pg) {
    var x;
    var pg;
    var k;
    var bk;
    var ln;
    var dk;
    var i;
    var xp;
    var nmo;
    var bns;
    var cb;
    var btp;
    var cv;
    var ext;
    var tp;
    var bky;
    var pr;
    var onpage;
    var prps;
    var sq;
    var db;
    var dbv;
    var itrn;
    var isprototypefield;
    var istp;
    var sdp;
    if (serializeCollectInC) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Unexpected: should be collecting in C");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    if (!x) return;
    if (____um_eq(x, toSerialize)) return;
    if (__tempbit(x)) return;
    k = __obkind(x);
    sdp = __seqLength(serializeStack);
    ____seqobAdd(serializeStack, x);
    if (____um_eq(x, forDebug)) {
        {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "Found forDebug at ");
            ____times(uwriteBuffer, __seqLength(toSerialize));
            __tprint(uwriteBuffer);
            terpri();
        }
        serializeDebugStack = __seqCopy(serializeStack);
        ____seqobAdd(debugStacks, serializeDebugStack);
    }
    if (k === hashtable_kind) {
        if (__isHashSeq(x)) {
            {
                __reset(uwriteBuffer);
                ____times(uwriteBuffer, "Omitting a  HashSeq");
                __tprint(uwriteBuffer);
                terpri();
            }
            __pop(serializeStack);
            return;
        }
        xp = __page(x);
        onpage = xp === pg || xp < 0;
        ____set_tempbit(x, fabl_true);
        if (!______amongFirstN(toSerialize, preambleObCount, x)) ____seqobAdd(toSerialize, x);
        itrn = __interned(x);
        pr = __parent(x);
        if (pr) {
            ____seqobAdd(serializeStack, "_parent_");
            ____serializeCollect0(pr, pg);
            __pop(serializeStack);
            ____seqobAdd(serializeStack, "_name_");
            ____serializeCollect0(__name(x), pg);
            __pop(serializeStack);
        }
        tp = __iType(x);
        if (tp) {
            ____seqobAdd(serializeStack, "_type_");
            ____serializeCollect0(tp, pg);
            __pop(serializeStack);
        }
        if (!onpage && !itrn) {
            ____seqSetLength(serializeStack, sdp);
            return;
        }
        bns = __bindings(x);
        ln = __seqLength(bns);
        for (i = 0; i < ln; i++) {
            cb = bns[i];
            if (itrn || __page(cb) === pg) {
                ____seqobAdd(serializedBindings, cb);
                ____seqobAdd(serializeStack, "_binding_");
                ____seqobAdd(serializeStack, cb);
                bky = ____obsel(cb, Binding_key);
                bk = __kind(cb);
                btp = ____obsel(cb, Binding_type);
                ____seqobAdd(serializeStack, "_binding_type_");
                ____serializeCollect0(btp, pg);
                __pop(serializeStack);
                if (__obkind(bky) === string_kind) {
                    if (____um_eq(bky, "lowbit")) {
                        __reset(uwriteBuffer);
                        ____times(uwriteBuffer, bky);
                        __tprint(uwriteBuffer);
                        terpri();
                    }
                }
                ____seqobAdd(serializeStack, "_binding_key_");
                ____serializeCollect0(bky, pg);
                __pop(serializeStack);
                if (!(bk === bindingIntKind || bk === bindingDoubleKind)) {
                    ____seqobAdd(serializeStack, "_binding_value_");
                    ____serializeCollect0(__bindingValue(cb), pg);
                    __pop(serializeStack);
                }
                __pop(serializeStack);
                __pop(serializeStack);
            }
        }
        ____seqSetLength(serializeStack, sdp);
        return;
    }
    if (k === compact_kind) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "OBSOLETE: compactob");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    if (k === smallob_kind) {
        xp = __page(x);
        itrn = __interned(x);
        onpage = xp === pg;
        ____set_tempbit(x, fabl_true);
        if (!______amongFirstN(toSerialize, preambleObCount, x)) ____seqobAdd(toSerialize, x);
        pr = __parent(x);
        if (pr) {
            ____seqobAdd(serializeStack, "_parent_");
            ____serializeCollect0(pr, pg);
            __pop(serializeStack);
            ____seqobAdd(serializeStack, "_name_");
            ____serializeCollect0(__name(x), pg);
            __pop(serializeStack);
        }
        tp = __iType(x);
        if (____um_eq(tp, BitField)) {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "BitField at ");
            ____times(uwriteBuffer, __seqLength(toSerialize));
            __tprint(uwriteBuffer);
            terpri();
        }
        istp = ____um_eq(tp, Sort);
        if (tp) {
            ____seqobAdd(serializeStack, "_type_");
            ____serializeCollect0(tp, pg);
            __pop(serializeStack);
        }
        if (!onpage && !itrn) {
            ____seqSetLength(serializeStack, sdp);
            return;
        }
        ln = __compactobNumFields(x);
        for (i = 0; i < ln; i++) {
            cv = ____selectNthOb(x, i);
            isprototypefield = istp && i === 6;
            if (cv && !isprototypefield) ____serializeCollect0(cv, pg);
        }
        prps = __compactobProperties(x);
        if (!prps) {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "MISSING PROPERTIES");
            __tprint(uwriteBuffer);
            terpri();
        }
        ln = __seqLength(prps);
        for (i = 0; i < ln; i++) ____serializeCollect0(prps[i], pg);
        ____seqSetLength(serializeStack, sdp);
        return;
    }
    if (k === string_kind) {
        ____set_tempbit(x, fabl_true);
        if (!______amongFirstN(toSerialize, preambleObCount, x)) ____seqobAdd(toSerialize, x);
        ____seqSetLength(serializeStack, sdp);
        return;
    }
    if (k === seq_kind || k === values_kind) {
        itrn = __interned(x);
        xp = __page(x);
        onpage = xp === pg || xp < 0;
        ____set_tempbit(x, fabl_true);
        if (!______amongFirstN(toSerialize, preambleObCount, x)) ____seqobAdd(toSerialize, x);
        pr = __parent(x);
        if (pr) ____serializeCollect0(pr, pg);
        tp = __iType(x);
        if (tp) ____serializeCollect0(tp, pg);
        if (k === seq_kind && !onpage && !itrn) {
            ____seqSetLength(serializeStack, sdp);
            return;
        }
        dk = __seqDataKind(x);
        if (dk === seqDataOb_kind) {
            sq = x;
            ln = __seqLength(sq);
            for (i = 0; i < ln; i++) {
                ____seqobAdd(serializeStack, "_element_");
                ____seqobAdd(serializeStack, __integer_to_ob(i));
                ____serializeCollect0(sq[i], pg);
                __pop(serializeStack);
                __pop(serializeStack);
            }
        }
        ____seqSetLength(serializeStack, sdp);
        return;
    }
    if (k === dblock_kind) {
        ____seqobAdd(toSerialize, x);
        ____set_tempbit(x, fabl_true);
        db = x;
        nmo = __numobs(db);
        for (i = 0; i < nmo; i++) {
            dbv = ____selectOb(db, i);
            if (dbv) {
                ____serializeCollect0(dbv, pg);
            }
        }
        ____seqSetLength(serializeStack, sdp);
        return;
    }
    if (k === binding_kind) {
        ____seqobAdd(toSerialize, x);
        ____set_tempbit(x, fabl_true);
        ____serializeCollect0(__parent(x), pg);
        ____serializeCollect0(__bindingKey(x), pg);
        ____seqSetLength(serializeStack, sdp);
        return;
    }
    {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Not yet serializing: ");
        ____times(uwriteBuffer, k);
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
}

function ______setPageOfGlobals(cn, names, pg) {
    var cn;
    var names;
    var pg;
    var ln;
    var i;
    var gl;
    ln = __seqLength(names);
    for (i = 0; i < ln; i++) {
        gl = ____selectGlobalBinding(cn, names[i]);
        if (gl) ____set_page(gl, pg);
    }
}

var fimpExiles = [ "path", "fimp" ];

var restoreTheTempBits = fabl_true;

function restoreTempBits() {
    var i;
    var ln;
    var cs;
    if (restoreTheTempBits) {
        ln = __seqLength(toSerialize);
        for (i = 0; i < ln; i++) {
            cs = toSerialize[i];
            ____set_tempbit(cs, fabl_false);
        }
        ln = __seqLength(serializedBindings);
        for (i = 0; i < ln; i++) {
            cs = serializedBindings[i];
            ____set_tempbit2(cs, fabl_false);
        }
    }
}

function __addSerializeOb(x) {
    var x;
    if (serializeCollectInC) __addObToSerialize(x); else ____seqobAdd(toSerialize, x);
}

function ____serializeCollectOb(x, pg) {
    var x;
    var pg;
    if (serializeCollectInC) ____cserializeCollect0(x, pg); else ____serializeCollect0(x, pg);
}

function ________serializeCollect(xs, y, pg, forFimp) {
    var xs;
    var y;
    var pg;
    var forFimp;
    var ln;
    var i;
    var lno;
    var lnxs;
    var cs;
    var uro;
    var rgp;
    var urObs;
    var cb;
    var x;
    var tb;
    serializeStack = __mk_emptysequence("<unprintable>");
    debugStacks = __mk_emptysequence("<unprintable>");
    if (forFimp) {
        x = xs[0];
        ______set(x, __regarding("fimp"), null);
        ______set(x, __regarding("path"), null);
    }
    if (serializeCollectInC) resetToSerialize(); else __seqReset(toSerialize);
    urObs = [ root, typeP, Sort, Regarding, Function, Pcode, Restriction, BitField ];
    lno = __seqLength(urObs);
    for (i = 0; i < lno; i++) __addSerializeOb(urObs[i]);
    if (y) __addSerializeOb(y);
    if (serializeCollectInC) setPreambleObCount(); else preambleObCount = __seqLength(toSerialize);
    lnxs = __seqLength(xs);
    tb = null;
    if (!forFimp && ____fget(thisFileR, topicP)) {
        tb = ____selectBinding(thisFileR, topicP);
        ____set_page(tb, pg);
        ____set_page(thisFileR, pg);
    }
    for (i = 0; i < lnxs; i++) ____serializeCollectOb(xs[i], pg);
    if (tb) ____serializeCollectOb(thisFileR, pg);
    for (i = 0; i < lno; i++) {
        uro = urObs[i];
        if (!__tempbit(uro)) ____serializeCollectOb(uro, pg);
    }
    if (serializeCollectInC) setSerializedBindingBits(); else {
        ln = __seqLength(serializedBindings);
        for (i = 0; i < ln; i++) {
            cb = serializedBindings[i];
            ____set_tempbit2(cb, fabl_true);
        }
    }
}

function ______serializeCollect(xs, y, pg) {
    var xs;
    var y;
    var pg;
    ________serializeCollect(xs, y, pg, fabl_false);
}

function ________serializeCollect(x, y, pg, forFimp) {
    var x;
    var y;
    var pg;
    var forFimp;
    ________serializeCollect([ x ], y, pg, forFimp);
}

function ______serializeCollect(x, y, pg) {
    var x;
    var y;
    var pg;
    ________serializeCollect(x, y, pg, fabl_false);
}

function ____serializeCollect(x, pg) {
    var x;
    var pg;
    ________serializeCollect(x, x, pg, fabl_false);
}

function ____fimpCollect(x, pg) {
    var x;
    var pg;
    ________serializeCollect(x, null, pg, fabl_true);
}

function __bindingName(b) {
    var b;
    var k;
    var kk;
    k = ____obsel(b, Binding_key);
    kk = __obkind(k);
    if (kk === string_kind) return k;
    return null;
}

function ____traverse(x, dp) {
    var x;
    var dp;
    var k;
    var cb;
    var ln;
    var i;
    var j;
    var b;
    var cbn;
    k = __obkind(x);
    if (k === hashtable_kind) {
        b = __bindings(x);
        ln = __seqLength(b);
        for (i = 0; i < ln; i++) {
            cb = b[i];
            cbn = __bindingName(cb);
            if (cbn) {
                for (j = 0; j < dp; j++) {
                    __reset(uwriteBuffer);
                    ____times(uwriteBuffer, "  ");
                    __tprint(uwriteBuffer);
                }
                {
                    __reset(uwriteBuffer);
                    ____times(uwriteBuffer, cbn);
                    __tprint(uwriteBuffer);
                    terpri();
                }
                ____traverse(__bindingValue(cb), dp + 1);
            }
        }
    }
}

function __vwrite(x) {
    var x;
    var k;
    k = __obkind(x);
    if (k === 3) {
        {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, x);
            __tprint(uwriteBuffer);
        }
        return;
    }
    if (k === 1) {
        {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, __ob_to_integer(x));
            __tprint(uwriteBuffer);
        }
        return;
    }
    if (__isFunction(x)) {
        {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, x);
            __tprint(uwriteBuffer);
        }
        return;
    }
    if (__isBinding(x)) {
        {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, x);
            __tprint(uwriteBuffer);
        }
        return;
    }
    if (____hasType(x, Sort)) {
        {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, x);
            __tprint(uwriteBuffer);
        }
        return;
    }
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "[Any]");
        __tprint(uwriteBuffer);
    }
}

function __vwrite(s) {
    var s;
    var i;
    var ln;
    ln = __seqLength(s);
    for (i = 0; i < ln; i++) {
        {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, i);
            ____times(uwriteBuffer, " ");
            __tprint(uwriteBuffer);
        }
        __vwrite(s[i]);
        {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, lf);
            __tprint(uwriteBuffer);
        }
    }
}

function restoreTheTempBits() {
    if (serializeCollectInC) crestoreTempBits(); else restoreTempBits();
}

function ______serializeToFile(fln, v, pg) {
    var fln;
    var v;
    var pg;
    ____serializeCollect(v, pg);
    serializeReset();
    if (serializeCollectInC) ______serializeToFile(fln, null, pg); else ______serializeToFile(fln, toSerialize, pg);
    restoreTheTempBits();
}

function ______serializeSeqToFile(fln, v, pg) {
    var fln;
    var v;
    var pg;
    ______serializeCollect(v, null, pg);
    serializeReset();
    if (serializeCollectInC) ______serializeToFile(fln, null, pg); else ______serializeToFile(fln, toSerialize, pg);
    restoreTheTempBits();
}

function ______serializeToBuffer(bf, v, pg) {
    var bf;
    var v;
    var pg;
    ____serializeCollect(v, pg);
    serializeReset();
    if (serializeCollectInC) ______serializeToBuffer(bf, null, pg); else ______serializeToBuffer(bf, toSerialize, pg);
    restoreTheTempBits();
}

function __printUris(s) {
    var s;
    var ln;
    var i;
    var u;
    ln = __seqLength(s);
    for (i = 0; i < ln; i++) {
        if (__parent(s[i])) {
            u = __uri(s[i]);
            if (u) {
                __reset(uwriteBuffer);
                ____times(uwriteBuffer, i);
                ____times(uwriteBuffer, " ");
                ____times(uwriteBuffer, u);
                __tprint(uwriteBuffer);
                terpri();
            }
        }
    }
}