var mk_emptyseq1_fun;

var copyStringConst_fun = ______getVariant(home, "copyStringConst", [ fabl_string ]);

var unprintable_fun = ______getVariant(home, "unprintable", [ fabl_string ]);

var map_void_ob_ob = ____mkFunctionType(fabl_void, [ ob, ob ]);

var map_void_ob_int = ____mkFunctionType(fabl_void, [ ob, fabl_int ]);

var map_void_ob_double = ____mkFunctionType(fabl_void, [ ob, fabl_double ]);

var propNS;

____mkFunctionType(fabl_void, [ ob, fabl_double ]);

var genName_buf = "";

function __stripStringCopy(x) {
    var x;
    var fn;
    var args;
    if (____hasType(x, Xapply)) {
        fn = ____obsel(x, Xapply_functionOf);
        if (____um_eq(fn, copyStringConst_fun)) {
            args = ____obsel(x, Xapply_arguments);
            return args[0];
        }
    }
    return x;
}

function __analyzeTypen(x) {
    var x;
    var srt;
    var b;
    var rs;
    var ssrt;
    var resulttype;
    var cx;
    var k;
    var ln;
    var sbs;
    var cs;
    var a0s;
    var a1s;
    var vl;
    var rm;
    var xs;
    var qv;
    k = __obkind(x);
    if (k === string_kind) {
        xs = x;
        srt = ____lookupBinding(homePath(), xs);
        if (!srt || !____um_eq(____obsel(srt, Binding_type), Sort)) return null;
        return __bindingValue(srt);
    }
    if (__isList(x)) {
        ln = __listLength(x);
        if (ln === 2) {
            if (____um_eq(__car(x), "SeqOf")) {
                ssrt = __analyzeTypen(__cadr(x));
                if (!ssrt) return null;
                return __SeqOf(ssrt);
            }
            if (____um_eq(__car(x), "BagOf")) {
                ssrt = __analyzeTypen(__cadr(x));
                if (!ssrt) return null;
                return __BagOf(ssrt);
            }
            if (____um_eq(__car(x), "AltOf")) {
                ssrt = __analyzeTypen(__cadr(x));
                if (!ssrt) return null;
                return __AltOf(ssrt);
            }
        }
        if (ln >= 2 && ____um_eq(__car(x), "_colon_")) {
            qv = __evalQname(x);
            if (____hasType(qv, Sort)) return qv;
            return null;
        }
        if (ln >= 2 && ____um_eq(__car(x), "Function")) {
            sbs = __mk_emptysequence("<unprintable>");
            cx = __cdr(x);
            resulttype = __analyzeTypen(__car(cx));
            cx = __cdr(cx);
            while (__isList(cx)) {
                cs = __analyzeTypen(__car(cx));
                if (!cs) return null;
                ____seqobAdd(sbs, cs);
                cx = __cdr(cx);
            }
            return ____mkFunctionType(resulttype, sbs);
        }
    }
    return null;
}

function __analyzeType(x) {
    var x;
    var rs;
    rs = __analyzeTypen(x);
    if (!rs) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Non-type: ");
        ____times(uwriteBuffer, x);
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    return rs;
}

function ______bindPif(cn, nm, s) {
    var cn;
    var nm;
    var s;
    if (__inputTypes(s)) return ______internFunction(cn, nm, s); else return ______bindGlobal(cn, nm, s);
}

function __typeOfBindingOrFunction(x) {
    var x;
    if (__isBinding(x)) return ____obsel(x, Binding_type); else return ____obsel(x, Function_type);
}

function ______analyzeTypedVar(fr, x, local) {
    var fr;
    var x;
    var local;
    var nm;
    var nms;
    var prp;
    var iss;
    var srt;
    nm = __caddr(x);
    iss = __isId(nm);
    if (iss) nms = nm;
    srt = __analyzeType(__cadr(x));
    if (local) {
        if (!iss) {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "Expected id: ");
            ____times(uwriteBuffer, nm);
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
        ______bindLocal(fr, nms, srt);
        return srt;
    }
    if (!classBeingDefined) {
        if (!iss) {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "NOT YET");
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
        return __typeOfBindingOrFunction(______bindPif(fr, nms, srt));
    }
    if (iss) {
        ______addField(classBeingDefined, nms, srt);
        return srt;
    }
    if (__isQname(nm)) {
        prp = __toProperty(nm);
        ______addPropertyRestriction(classBeingDefined, prp, srt);
        return srt;
    }
    {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Incorrect form for variable in var statement: ");
        ____times(uwriteBuffer, nm);
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
}

function ______analyzeTypedVars(nwe, x, local) {
    var nwe;
    var x;
    var local;
    var cx;
    var ce;
    var lsts;
    cx = x;
    lsts = null;
    while (__isList(cx)) {
        ce = __car(cx);
        if (__obkind(ce) === string_kind) {
            if (!lsts) {
                beforeError();
                __reset(uwriteBuffer);
                ____times(uwriteBuffer, "Sort needed for variable ");
                ____times(uwriteBuffer, ce);
                __tprint(uwriteBuffer);
                terpri();
                afterError();
            }
            if (local) ______bindLocal(nwe, ce, lsts); else ______bindPif(nwe, ce, lsts);
        } else lsts = ______analyzeTypedVar(nwe, ce, local);
        cx = __cdr(cx);
    }
}

function ____analyzeLocalVars(nwe, x) {
    var nwe;
    var x;
    ______analyzeTypedVars(nwe, x, fabl_true);
}

function ____analyzeTypedVars(nwe, x) {
    var nwe;
    var x;
    ______analyzeTypedVars(nwe, x, fabl_false);
}

function ____times(s, fn) {
    var s;
    var fn;
    var nm;
    var tp;
    var itps;
    var rtp;
    var ln;
    var lnm1;
    var i;
    nm = ____obsel(fn, Function_name);
    tp = ____obsel(fn, Function_type);
    rtp = __resultType(tp);
    itps = __inputTypes(tp);
    {
        ____times(s, nm);
        ____times(s, "(");
    }
    ln = __seqLength(itps);
    lnm1 = ln - 1;
    for (i = 0; i < ln; i++) {
        ____times(s, itps[i]);
        if (i < lnm1) ____times(s, ",");
    }
    {
        ____times(s, ") => ");
        ____times(s, rtp);
    }
}

function ____times(s, fn) {
    var s;
    var fn;
    var ky;
    var tp0;
    var tp;
    var rg;
    ____times(s, "[");
    ky = ____obsel(fn, Binding_key);
    if (__obkind(ky) === string_kind) ____times(s, ky); else {
        tp0 = __type0(ky);
        if (tp0 === Regarding) {
            rg = ____obsel(ky, Regarding_value);
            if (__obkind(rg) === string_kind) ____times(s, rg); else ____times(s, "<unprintable>");
        } else ____times(s, __name(ky));
    }
    ____times(s, " of type ");
    tp = __type(fn);
    if (!tp) ____times(s, "Resource"); else ____times(s, __type(fn));
    ____times(s, "]");
}

function __help1(x) {
    var x;
    var i;
    var ln;
    var j;
    var iln;
    var ce;
    var b;
    var vrs;
    var pfx;
    var pth;
    pth = homePath();
    ln = __seqLength(pth);
    for (i = ln - 1; i >= 0; i--) {
        ce = pth[i];
        {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, i);
            ____times(uwriteBuffer, " ");
            __tprint(uwriteBuffer);
            terpri();
        }
        b = ____selectGlobalBinding(ce, x);
        if (b) {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "  ");
            ____times(uwriteBuffer, b);
            __tprint(uwriteBuffer);
            terpri();
        }
        vrs = ____variants(ce, x);
        if (vrs) {
            iln = __seqLength(vrs);
            for (j = 0; j < iln; j++) {
                __reset(uwriteBuffer);
                ____times(uwriteBuffer, "  ");
                ____times(uwriteBuffer, vrs[j]);
                __tprint(uwriteBuffer);
                terpri();
            }
        }
    }
}

var help1_fun = ______getVariant(home, "help1", [ fabl_id ]);

function __help_tf(x) {
    var x;
    var cx;
    if (__listLength(x) === 2) {
        cx = __cadr(x);
        if (__obkind(cx) === string_kind) return ____metaApplyn(help1_fun, __meta(cx));
    } else {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Format: help(name)");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
}

function __Xblock_tf(x) {
    var x;
    var st;
    var cs;
    var cel;
    var rs;
    var e;
    var isvr;
    e = null;
    st = __cadr(x);
    cel = __seqLength(cPath);
    rs = __mk_emptysequence("<unprintable>");
    while (__isList(st)) {
        cs = __car(st);
        if (__isList(cs)) isvr = ____um_eq(__car(cs), "var"); else isvr = fabl_false;
        if (isvr) {
            if (____um_eq(__car(cs), "var")) {
                if (!e) {
                    e = mkResource();
                    ____seqobAdd(cPath, e);
                }
                ____analyzeLocalVars(e, __cdr(cs));
            }
        } else ____seqobAdd(rs, __analyze(cs));
        st = __cdr(st);
    }
    ____seqSetLength(cPath, cel);
    return ____mkXblock(e, rs);
}

function ____Xsequence_tf(x, ck) {
    var x;
    var ck;
    var st;
    var csrt;
    var esrt;
    var args;
    var cs;
    st = __cdr(x);
    if (!st) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "collections introduced with bag(...) or seq(...) must have at least one element");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    args = __mk_emptysequence("<unprintable>");
    esrt = null;
    while (__isList(st)) {
        cs = __analyze(__car(st));
        csrt = __type(cs);
        if (!esrt) esrt = csrt; else {
            if (!(esrt === csrt)) {
                beforeError();
                __reset(uwriteBuffer);
                ____times(uwriteBuffer, "Elements in sequence must have the same type");
                __tprint(uwriteBuffer);
                terpri();
                afterError();
            }
        }
        ____seqobAdd(args, cs);
        st = __cdr(st);
    }
    return ________metaSequencen(null, esrt, args, ck);
}

function __Xsequence_tf(x) {
    var x;
    return ____Xsequence_tf(x, "seq");
}

function __Xbag_tf(x) {
    var x;
    return ____Xsequence_tf(x, "bag");
}

function __Xalt_tf(x) {
    var x;
    return ____Xsequence_tf(x, "alt");
}

function __Function_tf(x) {
    var x;
    var rs;
    rs = __analyzeTypen(x);
    if (!rs) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Argument to Function is not a sort");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    return __meta(rs);
}

function ____Xemptyseq_tf(x, ck) {
    var x;
    var ck;
    var st;
    var srt;
    var ssrt;
    var ln;
    var cp;
    st = __cdr(x);
    ln = __listLength(st);
    if (ln === 0 || ln > 2) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Format: emptysequence(sort) or emptysequence(sort,capacity)");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    srt = __analyzeType(__car(st));
    if (ck === "seq") ssrt = __SeqOf(srt); else {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Unknown collection kind: ");
        ____times(uwriteBuffer, ck);
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    if (ln === 2) {
        cp = __analyze(__cadr(st));
        if (!(__type(cp) === fabl_int)) {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "int expected for capacity in emptyseq(type,capacity)");
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
        return ____metaCast1(______metaApplyn(__homeFimpFun("mk_emptyseq1_fun"), __meta(ssrt), cp), ssrt);
    }
    return ____metaCast1(____metaApplyn(__homeFimpFun("mk_emptyseq_fun"), __meta(ssrt)), ssrt);
}

function __Xemptybag_tf(x) {
    var x;
    return ____Xemptyseq_tf(x, "bag");
}

function __Xemptyseq_tf(x) {
    var x;
    return ____Xemptyseq_tf(x, "seq");
}

var stringbufReset_fun = ______getVariant(home, "reset", [ fabl_string ]);

var setBit_fun = ______getVariant(home, "setBit", [ fabl_int, fabl_int, fabl_boolean ]);

var getBit_fun = ______getVariant(home, "getBit", [ fabl_int, fabl_int ]);

var SeqOfInt = __SeqOf(fabl_int);

var SeqOfByte = __SeqOf(fabl_byte);

var SeqOfDouble = __SeqOf(fabl_double);

var SeqOfBoolean = __SeqOf(fabl_boolean);

function __collectionKind(s) {
    var s;
    var cn;
    cn = ____obsel(s, Sort_constructor);
    if (!cn) return null;
    if (cn === "SeqOf" || cn === "BagOf" || cn === "AltOf") return cn;
    return null;
}

function __collectionSubtype(s) {
    var s;
    if (s === Seq || s === Bag || s === Alt) return ob;
    return ____obsel(s, Sort_param);
}

function __isCollectionType(s) {
    var s;
    return s === Seq || s === Bag || s === Alt || ____obsel(s, Sort_param);
}

function ____seq_elt_tf(nm, a) {
    var nm;
    var a;
    var sq;
    var rs;
    var el;
    var elc;
    var fn;
    var sqs;
    var sqsi;
    var sqss;
    var args;
    var r;
    var st;
    if (!(__seqLength(a) === 2)) return null;
    sq = a[0];
    el = a[1];
    sqsi = __type(sq);
    if (sqsi === Seq) {
        sqs = SeqOfOb;
        sqss = ob;
    } else if (sqsi === Bag) {
        sqs = BagOfOb;
        sqss = ob;
    } else if (sqsi === Alt) {
        sqs = AltOfOb;
        sqss = ob;
    } else {
        sqs = sqsi;
        sqss = ____obsel(sqs, Sort_param);
    }
    if (!sqss) return null;
    st = __storage(sqss);
    elc = ____metaCoerce(el, sqss);
    if (!elc) return null;
    args = [ sq, elc ];
    if (nm === "push") {
        if (sqs === SeqOfByte) fn = __homeFimpFun("seqbyteAdd_fun"); else if (st === storage_int) fn = __homeFimpFun("seqintAdd_fun"); else if (st === storage_double) fn = __homeFimpFun("seqdoubleAdd_fun"); else fn = __homeFimpFun("seqobAdd_fun");
    } else if (nm === "contains") {
        if (sqs === SeqOfByte) fn = __homeFimpFun("seqbyteContains_fun"); else if (st === storage_int) fn = __homeFimpFun("seqintContains_fun"); else if (st === storage_double) fn = __homeFimpFun("seqdoubleContains_fun"); else fn = __homeFimpFun("seqobContains_fun");
    }
    rs = ____metaApplyn(fn, args);
    if (nm === "push") return ____metaCast1(rs, sqsi);
    return rs;
}

function ____seqobConcat(x, y) {
    var x;
    var y;
    var rs;
    rs = __mk_emptysequence("<unprintable>");
    ____seqobAppend(rs, x);
    ____seqobAppend(rs, y);
    return rs;
}

var seqobConcat_fun = ______getVariant(home, "seqobConcat", [ ob, ob ]);

function ____seqintConcat(x, y) {
    var x;
    var y;
    var rs;
    rs = __mk_emptysequence("<unprintable>");
    ____seqintAppend(rs, x);
    ____seqintAppend(rs, y);
    return rs;
}

var seqintConcat_fun = ______getVariant(home, "seqintConcat", [ ob, ob ]);

function ____seqdoubleConcat(x, y) {
    var x;
    var y;
    var rs;
    rs = __mk_emptysequence("<unprintable>");
    ____seqdoubleAppend(rs, x);
    ____seqdoubleAppend(rs, y);
    return rs;
}

var seqdoubleConcat_fun = ______getVariant(home, "seqdoubleConcat", [ ob, ob ]);

function ____seq_seq_tf(nm, a) {
    var nm;
    var a;
    var sq0;
    var sq1;
    var fn;
    var sq0s;
    var sq1s;
    var sq0si;
    var sq1si;
    if (!(__seqLength(a) === 2)) return null;
    sq0 = a[0];
    sq1 = a[1];
    sq0si = __type(sq0);
    sq1si = __type(sq1);
    if (sq0si === Seq) sq0s = SeqOfOb; else if (sq0si === Bag) sq0s = BagOfOb; else if (sq0si === Alt) sq0s = AltOfOb; else sq0s = sq0si;
    if (sq1si === Seq) sq1s = SeqOfOb; else if (sq1si === Bag) sq1s = BagOfOb; else if (sq1si === Alt) sq1s = AltOfOb; else sq1s = sq1si;
    if (!(sq0s === sq1s)) return null;
    if (!__isCollectionType(sq0s)) return null;
    if (nm === "times") {
        if (sq0s === SeqOfInt || sq0s === SeqOfBoolean || sq0s === BagOfInt || sq0s === AltOfInt) fn = __homeFimpFun("seqintAppend_fun"); else if (sq0s === SeqOfByte) fn = __homeFimpFun("seqbyteAppend_fun"); else if (sq0s === SeqOfDouble || sq0s === BagOfDouble || sq0s === AltOfDouble) fn = __homeFimpFun("seqdoubleAppend_fun"); else fn = __homeFimpFun("seqobAppend_fun");
    }
    if (nm === "plus") {
        if (sq0s === SeqOfInt || sq0s === SeqOfBoolean || sq0s === BagOfInt || sq0s === AltOfInt) fn = __homeFimpFun("seqintConcat_fun"); else if (sq0s === SeqOfDouble || sq0s === BagOfDouble || sq0s === AltOfDouble) fn = __homeFimpFun("seqdoubleConcat_fun"); else fn = __homeFimpFun("seqobConcat_fun");
    }
    return ____metaCast1(____metaApplyn(fn, a), sq0si);
}

function ____seq_int_tf(nm, a) {
    var nm;
    var a;
    var sq;
    var el;
    var fn;
    var sqsi;
    var sqs;
    if (!(__seqLength(a) === 2)) return null;
    sq = a[0];
    el = a[1];
    if (!(__type(el) === fabl_int)) return null;
    sqsi = __type(sq);
    if (sqsi === Seq) sqs = SeqOfOb; else if (sqsi === Bag) sqs = BagOfOb; else if (sqsi === Alt) sqs = AltOfOb; else sqs = sqsi;
    if (!__isCollectionType(sqs)) return null;
    if (nm === "set_length") fn = __homeFimpFun("seqSetLength_fun");
    return ____metaApplyn(fn, a);
}

function ____seq_tf(nm, a) {
    var nm;
    var a;
    var sq;
    var el;
    var fn;
    var sqs;
    if (!(__seqLength(a) === 1)) return null;
    sq = a[0];
    sqs = __type(sq);
    if (!__isCollectionType(sqs)) return null;
    if (nm === "length") fn = __homeFimpFun("seqLength_fun"); else if (nm === "reset") fn = __homeFimpFun("seqReset_fun");
    return ____metaApplyn(fn, a);
}

function ____seq_to_seq_tf(nm, a) {
    var nm;
    var a;
    var sq;
    var el;
    var fn;
    var sqs;
    var sqsi;
    var r;
    if (!(__seqLength(a) === 1)) return null;
    sq = a[0];
    sqsi = __type(sq);
    if (sqsi === Seq) sqs = SeqOfOb; else if (sqsi === Bag) sqs = BagOfOb; else if (sqsi === Alt) sqs = AltOfOb; else sqs = sqsi;
    if (!__isCollectionType(sqs)) return null;
    if (nm === "copy") fn = __homeFimpFun("seqCopy_fun"); else return null;
    return ____metaCast1(____metaApplyn(fn, a), sqsi);
}

function ____eq_tf(nm, a) {
    var nm;
    var a;
    var a0;
    var a1;
    var sa0;
    var sa1;
    if (!(__seqLength(a) === 2)) return null;
    a0 = a[0];
    sa0 = __type(a0);
    a1 = a[1];
    sa1 = __type(a1);
    if (__storage(sa0) === storage_ob && __storage(sa1) === storage_ob) return ____metaApplyn(__homeFimpFun("obEq_fun"), a);
    return null;
}

var intIntEqual_fun = ______getVariant(home, "equal", [ fabl_int, fabl_int ]);

function ____intIntEqual_tf(nm, a) {
    var nm;
    var a;
    var a0;
    var a1;
    var sa0;
    var sa1;
    if (!(__seqLength(a) === 2)) return null;
    a0 = a[0];
    sa0 = __type(a0);
    a1 = a[1];
    sa1 = __type(a1);
    if (sa0 === fabl_byte) {
        if (sa1 === fabl_byte) return ______metaApplyn(__homeFimpFun("intIntEqual_fun"), ____metaCast(a0, fabl_int), ____metaCast(a1, fabl_int));
        if (sa1 === fabl_int) return ______metaApplyn(__homeFimpFun("intIntEqual_fun"), ____metaCast(a0, fabl_int), a1);
        return null;
    }
    if (sa1 === fabl_byte) {
        if (sa0 === fabl_int) return ______metaApplyn(__homeFimpFun("intIntEqual_fun"), a0, ____metaCast(a1, fabl_int));
        return null;
    }
    return null;
}

function __nameToString(x) {
    var x;
    var k;
    var pr;
    var lc;
    k = __obkind(x);
    if (k === nstring_kind || k === wstring_kind) return __mkString(x); else if (__isQname(x)) {
        pr = __cadr(x);
        lc = __caddr(x);
        return "{pr~id}:{lc~id}";
    }
    {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Expected name");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
}

function __functionname_tf(x) {
    var x;
    var ln;
    var i;
    var nmok;
    var nmo;
    var ns;
    var nmisid;
    var fnm;
    var pr;
    var itps;
    var vr;
    ln = __listLength(x);
    nmo = __cadr(x);
    nmok = __obkind(nmo);
    if (nmok === nstring_kind || nmok === wstring_kind) {
        nmisid = fabl_true;
        ns = home;
        fnm = nmo;
    } else if (__isQname(nmo)) {
        nmisid = fabl_false;
        pr = __cadr(nmo);
        fnm = __caddr(nmo);
        ns = __namespace(pr);
    } else {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Function name must be an id or qualified name");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    itps = __mk_emptysequence("<unprintable>");
    for (i = 2; i < ln; i++) ____seqobAdd(itps, __analyzeType(____listSelect(x, i)));
    if (nmisid) vr = ______getVariant(homePath(), fnm, itps); else vr = ______getVariant(ns, fnm, itps);
    if (!vr) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "No such function: ");
        ____times(uwriteBuffer, fnm);
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    return ____meta(vr, vr["[unnamed Property]"]);
}

function __dotMethod_tf(x) {
    var x;
    {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Not yet");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
}

function ____idSelect(x, nm) {
    var x;
    var nm;
    return ____fget(x, __regarding(nm));
}

var idSelect_fun = ______getVariant(home, "idSelect", [ ob, fabl_id ]);

function __arrayRef_tf(x) {
    var x;
    var ar;
    var sl;
    var ars;
    var arss;
    var ln;
    var cn;
    var cd;
    var a0;
    var a1;
    var vr;
    ln = __listLength(x);
    if (!(ln === 3)) {
        if (__isList(__cadr(x))) return __dotMethod_tf(x); else return __functionname_tf(x);
    }
    cd = __cdr(x);
    a0 = __car(cd);
    cd = __cdr(cd);
    a1 = __car(cd);
    sl = __analyze(a1);
    if (__type(sl) === fabl_id) return ______metaApplyn(__homeFimpFun("idSelect_fun"), ____metaCast(__analyze(a0), ob), sl);
    if (!(__type(sl) === fabl_int)) {
        return __functionname_tf(x);
    }
    ar = __analyze(a0);
    ars = __type(ar);
    if (__isCollectionType(ars) || ars === fabl_string || ars === hexBinary) return ____metaSelectIndexn(ar, sl);
    vr = ______getVariant(homePath(), "select", [ ars, fabl_int ]);
    if (!vr) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "No variant of selection X[Y] found");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    return ______metaApplyn(vr, ar, sl);
}

function __call_tf(x) {
    var x;
    {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "call_tf not needed");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    return __analyze(____cons(__cadr(x), __caddr(x)));
}

function __getMember_tf(x) {
    var x;
    return __analyze(____cons(__caddr(x), ____cons(__cadr(x), "rdf:nil")));
}

function ____return_tf(nm, x) {
    var nm;
    var x;
    var dt;
    var ln;
    var rv;
    var rc;
    var srt;
    ln = __seqLength(x);
    if (ln === 1) {
        rv = x[0];
        srt = __type(rv);
        if (funReturnType === fabl_void) {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "No value should be returned from a function of sort void");
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
        rc = ____metaCoerce(rv, funReturnType);
        if (!rc) {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "Wrong sort for returned value; expected ");
            ____times(uwriteBuffer, funReturnType);
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
        return __metaReturn(rc);
    } else if (ln === 0) {
        if (!(funReturnType === fabl_void)) {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "No return value");
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
        return metaReturnVoid();
    }
}

function __unprintable(s) {
    var s;
    ____times(s, "<unprintable>");
}

function ______gAppend_seq(s, x, elsort) {
    var s;
    var x;
    var elsort;
    var ln;
    var i;
    ____times(s, "[");
    ln = __seqLength(x);
    for (i = 0; i < ln; i++) {
        ______gAppend(s, x[i], elsort);
        if (i < ln - 1) ____times(s, ",");
    }
    ____times(s, "]");
}

function ______gAppend_seq(s, x, elsort) {
    var s;
    var x;
    var elsort;
    var ln;
    var i;
    ____times(s, "[");
    ln = __seqLength(x);
    for (i = 0; i < ln; i++) {
        ____times(s, x[i]);
        if (i < ln - 1) ____times(s, ",");
    }
    ____times(s, "]");
}

function ______gAppend_seq(s, x, elsort) {
    var s;
    var x;
    var elsort;
    var ln;
    var i;
    ____times(s, "[");
    ln = __seqLength(x);
    for (i = 0; i < ln; i++) {
        ____times(s, x[i]);
        if (i < ln - 1) ____times(s, ",");
    }
    ____times(s, "]");
}

function __isFunctionType(x) {
    var x;
    var scn;
    scn = ____get(x, Sort_constructor);
    return scn === "Function";
}

var gAppend_fun = ______getVariant(home, "gAppend", [ fabl_string, ob, Sort ]);

function ____listPrint(s, x) {
    var s;
    var x;
    var cx;
    var carx;
    var cdrx;
    var done;
    if (!x) {
        ____times(s, "nil");
        return;
    }
    ____times(s, "(");
    cx = x;
    done = fabl_false;
    while (!done) {
        carx = __car(cx);
        cdrx = __cdr(cx);
        ____times(s, carx);
        if (__isList(cdrx)) {
            ____times(s, ",");
            cx = cdrx;
        } else {
            done = fabl_true;
            if (!cdrx || ____um_eq(cdrx, "rdf:nil")) ____times(s, ")"); else {
                ____times(s, " . ");
                ____times(s, cdrx);
                ____times(s, ")");
            }
        }
    }
}

function ____times0(s, x) {
    var s;
    var x;
    var k;
    var ui;
    if (!x) {
        ____times(s, "nil");
        return fabl_true;
    }
    k = __obkind(x);
    if (k === string_kind) ____times(s, x); else if (k === int_kind) ____times(s, __ob_to_integer(x)); else if (k === double_kind) ____times(s, __toDouble(x)); else if (k === seq_kind && __seqDataKind(x) === seqDataByte_kind) ____times(s, x); else if (__isList(x)) ____listPrint(s, x); else if (____qualifiedName(s, x)) return fabl_true; else {
        ui = __uri(x);
        if (!ui) return fabl_false;
        ____times(s, "<");
        ____times(s, ui);
        ____times(s, ">");
    }
    return fabl_true;
}

function ____times(s, x) {
    var s;
    var x;
    if (!____times0(s, x)) ____times(s, "<unprintable>");
}

function __uwrite(x) {
    var x;
    __reset(uwriteBuffer);
    ____times(uwriteBuffer, x);
    __tprint(uwriteBuffer);
}

function ____uwrite(x, sx) {
    var x;
    var sx;
    __reset(uwriteBuffer);
    ______gAppend(uwriteBuffer, x, sx);
    __tprint(uwriteBuffer);
}

function ____uwriteln(x, sx) {
    var x;
    var sx;
    ____uwrite(x, sx);
    terpri();
}

function __uwriteln(x) {
    var x;
    __uwrite(x);
    terpri();
}

function beforeError() {
    if (cgiMode) {
        __silent(fabl_false);
        htmlHeader();
    }
}

var uwriteBufferBinding = ____selectGlobalBinding(home, "uwriteBuffer");

function ____write_tf(nm, x) {
    var nm;
    var x;
    var ln;
    var i;
    var cx;
    var px;
    var vr;
    var sq;
    if (buildingFimp) uwriteBufferBinding = ____selectGlobalBinding(home, "uwriteBuffer"); else uwriteBufferBinding = ____selectGlobalBinding(fimp, "uwriteBuffer");
    ln = __seqLength(x);
    sq = __mk_emptysequence("<unprintable>");
    if (nm === "error") ____seqobAdd(sq, ____metaApplyn(__homeFimpFun("beforeError_fun"), __mk_emptysequence("<unprintable>")));
    ____seqobAdd(sq, ____metaApplyn(__homeFimpFun("stringbufReset_fun"), uwriteBufferBinding));
    for (i = 0; i < ln; i++) {
        cx = x[i];
        cx = __stripStringCopy(cx);
        vr = ______getVariant(homePath(), "times", [ fabl_string, __type(cx) ]);
        if (!vr) px = ________metaApplyn(__homeFimpFun("gAppend_fun"), uwriteBufferBinding, cx, __meta(__type(cx))); else px = ______metaApplyn(vr, uwriteBufferBinding, cx);
        ____seqobAdd(sq, px);
    }
    ____seqobAdd(sq, ____metaApplyn(__homeFimpFun("stringBuf_tprint_fun"), uwriteBufferBinding));
    if (nm === "write") return __mkXblock(sq); else if (nm === "writeln") {
        ____seqobAdd(sq, ____metaApplyn(__homeFimpFun("terpri_fun"), __mk_emptysequence("<unprintable>")));
        return __mkXblock(sq);
    } else if (nm === "error") {
        ____seqobAdd(sq, ____metaApplyn(__homeFimpFun("terpri_fun"), __mk_emptysequence("<unprintable>")));
        ____seqobAdd(sq, ____metaApplyn(__homeFimpFun("afterError_fun"), __mk_emptysequence("<unprintable>")));
        return __mkXblock(sq);
    }
    return null;
}

var lf = 10;

function ____writeToBuffer_tf(nm, x) {
    var nm;
    var x;
    var ln;
    var i;
    var cx;
    var px;
    var a0;
    var vr;
    var sq;
    ln = __seqLength(x);
    if (ln < 2) return null;
    a0 = x[0];
    if (!(__type(a0) === fabl_string)) return null;
    sq = __mk_emptysequence("<unprintable>");
    for (i = 1; i < ln; i++) {
        cx = x[i];
        cx = __stripStringCopy(cx);
        vr = ______getVariant(homePath(), "times", [ fabl_string, __type(cx) ]);
        if (!vr) px = ________metaApplyn(__homeFimpFun("gAppend_fun"), a0, cx, __meta(__type(cx))); else px = ______metaApplyn(vr, a0, cx);
        ____seqobAdd(sq, px);
    }
    return __mkXblock(sq);
}

function ____toStringBuf_tf(nm, x) {
    var nm;
    var x;
    var ln;
    var i;
    var cx;
    var px;
    var rsx;
    var vr;
    var sq;
    var e;
    e = mkObject();
    rsx = ______bindLocal(e, "toStringResult", fabl_string);
    sq = __mk_emptysequence("<unprintable>");
    ____seqobAdd(sq, ____metaAssignn(rsx, ____metaApplyn(__homeFimpFun("mkStringBuf_function"), __meta(""))));
    ln = __seqLength(x);
    for (i = 0; i < ln; i++) {
        cx = x[i];
        vr = ______getVariant(homePath(), "times", [ fabl_string, __type(cx) ]);
        if (!vr) px = ________metaApplyn(__homeFimpFun("gAppend_fun"), rsx, cx, __meta(__type(cx))); else px = ______metaApplyn(vr, rsx, cx);
        ____seqobAdd(sq, px);
    }
    blockReturnType = fabl_string;
    ____seqobAdd(sq, ____metaBlockReturn(rsx, null));
    blockReturnType = null;
    return ______mkValueReturningXblock(fabl_string, e, sq);
}

function ____nul_tf(nm, x) {
    var nm;
    var x;
    var ln;
    var a;
    var srt;
    var fn;
    ln = __seqLength(x);
    if (ln === 1) {
        a = x[0];
        srt = __type(a);
        if (__storage(srt) === storage_ob) return ____metaApplyn(__homeFimpFun("nul_fun"), x);
    }
    return null;
}

function ____nnul_tf(nm, x) {
    var nm;
    var x;
    var ln;
    var a;
    var srt;
    var fn;
    ln = __seqLength(x);
    if (ln === 1) {
        a = x[0];
        srt = __type(a);
        if (__storage(srt) === storage_ob) return ____metaApplyn(__homeFimpFun("nnul_fun"), x);
    }
    return null;
}

function __isClass(s) {
    var s;
    if (s === fabl_id) return fabl_false;
    if (__storage(s) === storage_ob) return fabl_true;
    return fabl_false;
}

var splice_fun = ______getVariant(home, "splice1", [ ob, ob ]);

function ____splice_tf(nm, x) {
    var nm;
    var x;
    var ln;
    var a0;
    var a1;
    var srt0;
    var srt1;
    var k0;
    var k1;
    ln = __seqLength(x);
    if (ln === 2) {
        a0 = x[0];
        srt0 = __type(a0);
        a1 = x[1];
        srt1 = __type(a1);
        if (__isClass(srt0) && __isClass(srt1)) {
            return ____metaApplyn(__homeFimpFun("splice_fun"), x);
        }
    }
    return null;
}

var get_fun = ______getVariant(home, "get", [ ob, Property ]);

var fget_fun = ______getVariant(home, "fget", [ ob, Property ]);

var mget_fun = ______getVariant(home, "mget", [ ob, Property ]);

function ______restrictionsOn(rs, tp, prp) {
    var rs;
    var tp;
    var prp;
}

var restrictionsBuf = __mk_emptysequence("<unprintable>");

function __cardinalityIsOne(rs) {
    var rs;
    var ln;
    var i;
    var c;
    ln = __seqLength(rs);
    for (i = 0; i < ln; i++) {
        c = ____intsel(rs[i], "owl:cardinality");
        if (c === 1) return fabl_true;
    }
    return fabl_false;
}

function ____allValuesFroms(rs, rst) {
    var rs;
    var rst;
    var ln;
    var i;
    var c;
    var cls;
    ln = __seqLength(rst);
    for (i = 0; i < ln; i++) {
        cls = ____obsel(rst[i], "owl:allValuesFrom");
        if (cls) ____seqobAdd(rs, cls);
    }
}

function __not_equal_tf(x) {
    var x;
    return __analyze(____cons("not", ____cons(____cons("equal", __cdr(x)), null)));
}

function __findPropertyInPath(p) {
    var p;
    var ln;
    var i;
    var cp;
    var pv;
    var pth;
    pth = homePath();
    ln = __seqLength(pth);
    for (i = 0; i < ln; i++) {
        cp = pth[i];
        pv = ____selectUri(cp, p);
        if (pv && ____hasType(pv, Property)) return pv;
    }
    return null;
}

function ___dot_tf(x) {
    var x;
    var sl;
    var qn;
    var a0;
    var srt0;
    var srt1;
    var rst;
    var prp;
    var btf;
    var fnc;
    var pvc;
    var fld;
    var ln;
    a0 = __analyze(__cadr(x));
    sl = __caddr(x);
    srt0 = __type(a0);
    if (__isQname(sl)) {
        qn = __evalQname(sl);
        if (!____hasType(qn, Property)) {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "Expected property: ");
            ____times(uwriteBuffer, sl);
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
        prp = qn;
    } else if (__obkind(sl) === string_kind) {
        fld = ____selectUri(srt0, sl);
        if (fld && ____hasType(fld, Property)) prp = fld; else prp = __findPropertyInPath(sl);
        if (!prp) {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "No such field: ");
            ____times(uwriteBuffer, sl);
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
    } else {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Expected id or qualified name in ");
        ____times(uwriteBuffer, sl);
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    pvc = ____propertyValueConstraints(srt0, prp);
    rst = __car(pvc);
    btf = ____propertyBitField(srt0, prp);
    if (!btf) return ________metaSelectProperty(a0, prp, rst, fabl_true); else return ____metaSelectBitField(a0, btf);
}

function ___dotdot_tf(x) {
    var x;
    var sl;
    var qn;
    var a0;
    var srt0;
    var srt1;
    var rst;
    var prp;
    var btf;
    var fnc;
    var pvc;
    var fld;
    var ln;
    a0 = __analyze(__cadr(x));
    sl = __caddr(x);
    srt0 = __type(a0);
    if (__isQname(sl)) {
        qn = __evalQname(sl);
        if (!____hasType(qn, Property)) {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "Expected property: ");
            ____times(uwriteBuffer, sl);
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
        prp = qn;
    } else if (__obkind(sl) === string_kind) {
        fld = ____selectUri(srt0, sl);
        if (fld && ____hasType(fld, Property)) prp = fld; else prp = __findPropertyInPath(sl);
        if (!prp) {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "No such field: ");
            ____times(uwriteBuffer, sl);
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
    } else {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Expected id or qualified name in ");
        ____times(uwriteBuffer, sl);
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    pvc = ____propertyValueConstraints(srt0, prp);
    rst = __SeqOf(__car(pvc));
    btf = ____propertyBitField(srt0, prp);
    if (btf) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Bitfields do not have multiple values");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    return ________metaSelectProperty(a0, prp, rst, fabl_false);
}

var set_fun = ______getVariant(home, "set", [ ob, Property, ob ]);

function ____plus_StringBuf_sequence_tf(nm, x) {
    var nm;
    var x;
    var ln;
    var a0;
    var a1;
    var srt1;
    var ssb;
    ln = __seqLength(x);
    if (ln === 2) {
        a0 = x[0];
        if (!(__type(a0) === fabl_string)) return null;
        a1 = x[1];
        srt1 = __type(a1);
        ssb = __collectionSubtype(srt1);
        if (ssb) return ________metaApplyn(__homeFimpFun("gAppend_fun"), a0, a1, __meta(srt1));
    }
    return null;
}

function __if_tf(x) {
    var x;
    var cnd;
    var ift;
    cnd = __analyze(__cadr(x));
    if (!(__type(cnd) === fabl_boolean)) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Test in IF must return a boolean");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    ift = __analyze(__caddr(x));
    return ____mkXif(cnd, ift);
}

function __ifElse_tf(x) {
    var x;
    var cnd;
    var ift;
    var iff;
    cnd = __analyze(__cadr(x));
    if (!(__type(cnd) === fabl_boolean)) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Test in IF must return a boolean");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    ift = __analyze(__caddr(x));
    iff = __analyze(__cadddr(x));
    return ______mkXif(cnd, ift, iff);
}

function __for_tf(x) {
    var x;
    var init;
    var cnd;
    var xo;
    xo = x;
    init = __analyze(__cadr(xo));
    cnd = __analyze(__caddr(xo));
    if (!(__type(cnd) === fabl_boolean)) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Test in FOR must return a boolean");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    return ________metaFor(init, cnd, __analyze(____listSelect(xo, 3)), __analyze(____listSelect(xo, 4)));
}

function __twiddle_tf(x) {
    var x;
    var a;
    var s;
    a = __analyze(__cadr(x));
    s = __analyzeType(__caddr(x));
    return ____metaCast(a, s);
}

function newSeq() {
    var rs;
    rs = __mk_emptysequence("<unprintable>");
    rs["rdf:type"] = Seq;
    return rs;
}

var newSeq_fun = ______getVariant(home, "newSeq", __mk_emptysequence("<unprintable>"));

function newBag() {
    var rs;
    rs = __mk_emptysequence("<unprintable>");
    rs["rdf:type"] = Bag;
    return rs;
}

var newBag_fun = ______getVariant(home, "newBag", __mk_emptysequence("<unprintable>"));

function newAlt() {
    var rs;
    rs = __mk_emptysequence("<unprintable>");
    rs["rdf:type"] = Alt;
    return rs;
}

var newAlt_fun = ______getVariant(home, "newAlt", __mk_emptysequence("<unprintable>"));

function __new_tf(x) {
    var x;
    var s;
    if (!(__listLength(x) === 2)) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "format new(<sort>)");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    s = __analyzeType(__cadr(x));
    if (s === Seq) return ____metaApplyn(__homeFimpFun("newSeq_fun"), __mk_emptysequence("<unprintable>"));
    if (s === Bag) return ____metaApplyn(__homeFimpFun("newBag_fun"), __mk_emptysequence("<unprintable>"));
    if (s === Alt) return ____metaApplyn(__homeFimpFun("newAlt_fun"), __mk_emptysequence("<unprintable>"));
    return ____metaCast(____metaApplyn(__homeFimpFun("new_fun"), __meta(s)), s);
}

var install_fun;

null;

function ____install_tf(nm, ins) {
    var nm;
    var ins;
    var s;
    var a;
    if (__seqLength(ins) === 2) {
        a = ins[0];
        s = ins[1];
        if (__type(s) === Sort) return ______metaApplyn(__homeFimpFun("install_fun"), ____metaCast(a, ob), s);
    }
    return null;
}

function __while_tf(x) {
    var x;
    var cnd;
    var xo;
    xo = x;
    cnd = __analyze(__cadr(xo));
    if (!(__type(cnd) === fabl_boolean)) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Test in WHILE must return an int");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    return ____metaWhile(cnd, __analyze(__caddr(xo)));
}

function __mkAlreadyAnalyzed(x) {
    var x;
    return ____cons("alreadyAnalyzed", ____cons(x, null));
}

function __alreadyAnalyzed_tf(x) {
    var x;
    var rs;
    rs = __cadr(x);
    return rs;
}

function __________metaAssignn(dst, prp, src, addValue, try_set) {
    var dst;
    var prp;
    var src;
    var addValue;
    var try_set;
    var rng;
    var dtp;
    var csrc;
    var xsel;
    var btf;
    dtp = ____propertyValueType(__type(dst), prp);
    if (!(dtp === ob)) {
        csrc = ____metaCoerce(src, dtp);
        if (!csrc) {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "Could not coerce ");
            ____times(uwriteBuffer, src);
            ____times(uwriteBuffer, " to ");
            ____times(uwriteBuffer, dtp);
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
    } else csrc = ____metaCast(src, ob);
    btf = ____propertyBitField(__type(dst), prp);
    if (!btf) xsel = ______metaSelectProperty(dst, prp, dtp); else xsel = ____metaSelectBitField(dst, btf);
    return ________metaAssignn(xsel, csrc, addValue, fabl_false);
}

function ____set_tf(nm, x) {
    var nm;
    var x;
    var src;
    var dstcn;
    var aprp;
    var prp;
    dstcn = x[0];
    aprp = x[1];
    src = x[2];
    if (!(__type(aprp) === Property)) return null;
    if (__isConstant(aprp)) {
        prp = __constantValue(aprp);
        return __________metaAssignn(dstcn, prp, src, fabl_false, fabl_true);
    }
    return ________metaApplyn(__homeFimpFun("set_fun"), ____metaCast(dstcn, ob), aprp, ____metaCast(src, ob));
}

function __assign_tf(ix) {
    var ix;
    var dst;
    var sl;
    var fld;
    var qn;
    var src;
    var dstcn;
    var aprp;
    var rs;
    var prp;
    var addValue;
    dst = __cadr(ix);
    src = __analyze(__caddr(ix));
    if (__isList(dst) && (____um_eq(__car(dst), "_dot_") || ____um_eq(__car(dst), "_dotdot_"))) {
        addValue = ____um_eq(__car(dst), "_dotdot_");
        dstcn = __analyze(__cadr(dst));
        sl = __caddr(dst);
        if (__isQname(sl)) {
            qn = __evalQname(sl);
            if (!____hasType(qn, Property)) {
                beforeError();
                __reset(uwriteBuffer);
                ____times(uwriteBuffer, "Expected property: ");
                ____times(uwriteBuffer, sl);
                __tprint(uwriteBuffer);
                terpri();
                afterError();
            }
            prp = qn;
        } else if (__obkind(sl) === string_kind) {
            fld = ____selectUri(__type(dstcn), sl);
            if (fld && ____hasType(fld, Property)) prp = fld; else prp = __findPropertyInPath(sl);
            if (!prp) {
                beforeError();
                __reset(uwriteBuffer);
                ____times(uwriteBuffer, "No such field: ");
                ____times(uwriteBuffer, sl);
                __tprint(uwriteBuffer);
                terpri();
                afterError();
            }
        } else {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "Expected id or qualified name in ");
            ____times(uwriteBuffer, sl);
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
        return __________metaAssignn(dstcn, prp, src, addValue, fabl_true);
    }
    return ____metaAssignnCheck(__analyze(dst), src);
}

function ____genName(seed, count) {
    var seed;
    var count;
    __reset(genName_buf);
    ____times(genName_buf, seed);
    ____times(genName_buf, count);
    return __toString(genName_buf);
}

function allocAnalysisTemp() {
    analysisTempCount++;
    return ____genName("analysistemp_", analysisTempCount);
}

function ____plus_tf(nm, x) {
    var nm;
    var x;
    var rsx;
    var a0;
    var a1;
    var vr0;
    var vr1;
    var e;
    var sq;
    var ln;
    var tp0;
    ln = __seqLength(x);
    if (!(ln === 2)) return null;
    a0 = x[0];
    a1 = x[1];
    tp0 = __type(a0);
    if (tp0 === fabl_int || tp0 === fabl_double) return null;
    vr0 = ______getVariant(homePath(), "times", [ fabl_string, __type(a0) ]);
    if (!vr0) return null;
    vr1 = ______getVariant(homePath(), "times", [ fabl_string, __type(a1) ]);
    if (!vr1) return null;
    e = mkObject();
    rsx = ______bindLocal(e, allocAnalysisTemp(), fabl_string);
    sq = __mk_emptysequence("<unprintable>");
    ____seqobAdd(sq, ____metaAssignn(rsx, ____metaApplyn(__homeFimpFun("mkStringBuf_function"), __meta(""))));
    ____seqobAdd(sq, ______metaApplyn(vr0, rsx, a0));
    ____seqobAdd(sq, ______metaApplyn(vr1, rsx, a1));
    blockReturnType = fabl_string;
    ____seqobAdd(sq, ____metaBlockReturn(rsx, null));
    blockReturnType = null;
    return ______mkValueReturningXblock(fabl_string, e, sq);
}

function ____universalize0_ob_tf(nm, x) {
    var nm;
    var x;
    var a0;
    var tp0;
    var vr;
    var hm;
    if (__seqLength(x) === 1) {
        a0 = x[0];
        tp0 = __type(a0);
        if (tp0 === ob) return null;
        if (buildingFimp && analyzingFunction) hm = home; else hm = fimp;
        vr = ______getVariant(hm, nm, [ ob ]);
        if (vr) return ____metaApplyn(vr, ____metaCast(a0, ob));
    }
    return null;
}

function ____supplyObArgument(f, v) {
    var f;
    var v;
    var k;
    k = __obkind(f);
    if (k === seq_kind) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Not yet: iterated supplyArgument");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    return [ f, null, v ];
}

var supplyObArgument_fun = ______getVariant(home, "supplyObArgument", [ Function, ob ]);

function ____supplyIntArgument(f, v) {
    var f;
    var v;
    var k;
    k = __obkind(f);
    if (k === seq_kind) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Not yet: iterated supplyArgument");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    return [ f, null, __integer_to_ob(v) ];
}

var supplyIntArgument_fun = ______getVariant(home, "supplyIntArgument", [ Function, fabl_int ]);

function ____supplyDoubleArgument(f, v) {
    var f;
    var v;
    var k;
    k = __obkind(f);
    if (k === seq_kind) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Not yet: iterated supplyArgument");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    return [ f, null, __toOb(v) ];
}

var supplyDoubleArgument_fun = ______getVariant(home, "supplyDoubleArgument", [ Function, fabl_double ]);

function ____supplyArgument_tf(nm, x) {
    var nm;
    var x;
    var ln;
    var lni;
    var i;
    var st;
    var a0;
    var a1;
    var t0;
    var t1;
    var sat;
    var rst;
    var itps;
    var nitps;
    ln = __seqLength(x);
    if (ln === 2) {
        a0 = x[0];
        t0 = __type(a0);
        a1 = x[1];
        t1 = __type(a1);
        itps = __inputTypes(t0);
        if (!itps) return null;
        if (!(itps[0] === t1)) return null;
        nitps = __iNew("<unprintable>");
        ln = __seqLength(itps);
        for (i = 1; i < ln; i++) ____seqobAdd(nitps, itps[i]);
        rst = __resultType(t0);
        sat = ____mkFunctionType(rst, nitps);
        st = __storage(t1);
        if (st === storage_ob) return ____metaCast1(______metaApplyn(__homeFimpFun("supplyObArgument_fun"), a0, a1), sat);
        if (st === storage_int) return ____metaCast1(______metaApplyn(__homeFimpFun("supplyIntArgument_fun"), a0, a1), sat);
        if (st === storage_double) return ____metaCast1(______metaApplyn(__homeFimpFun("supplyDoubleArgument_fun"), a0, a1), sat);
    }
}

function initMacros() {
    ______constructor(home, "help", "help_tf");
    ______constructor(home, "block", "Xblock_tf");
    ______constructor(home, "if", "if_tf");
    ______constructor(home, "seq", "Xsequence_tf");
    ______constructor(home, "sequence", "Xsequence_tf");
    ______constructor(home, "bag", "Xbag_tf");
    ______constructor(home, "alt", "Xalt_tf");
    ______constructor(home, "Function", "Function_tf");
    ______constructor(home, "emptysequence", "Xemptyseq_tf");
    ______constructor(home, "emptybag", "Xemptybag_tf");
    ______constructor(home, "if_else", "ifElse_tf");
    ______constructor(home, "call", "call_tf");
    ______constructor(home, "not_equal", "not_equal_tf");
    ______constructor(home, "get_member", "getMember_tf");
    ______constructor(home, "assign", "assign_tf");
    ______constructor(home, "for", "for_tf");
    ______constructor(home, "while", "while_tf");
    ______constructor(home, "twiddle", "twiddle_tf");
    ______constructor(home, "new", "new_tf");
    ______constructor(home, "already_analyzed", "alreadyAnalyzed_tf");
    ______constructor(home, "array_ref", "arrayRef_tf");
    ______constructor(home, "_dot_", "_dot_tf");
    ______constructor(home, "_dotdot_", "_dotdot_tf");
    ______constructor(home, "restrict", "restrict_tf");
    ______macro(home, "freturn", "return_tf");
    ______macro(home, "nul", "nul_tf");
    ______macro(home, "nnul", "nnul_tf");
    ______macro(home, "plus", "seq_seq_tf");
    ______macro(home, "plus", "plus_tf");
    ______macro(home, "push", "seq_elt_tf");
    ______macro(home, "times", "seq_seq_tf");
    ______macro(home, "contains", "seq_elt_tf");
    ______macro(home, "length", "seq_tf");
    ______macro(home, "set_length", "seq_int_tf");
    ______macro(home, "reset", "seq_tf");
    ______macro(home, "copy", "seq_to_seq_tf");
    ______macro(home, "eq", "eq_tf");
    ______macro(home, "write", "write_tf");
    ______macro(home, "writeln", "write_tf");
    ______macro(home, "error", "write_tf");
    ______macro(home, "write_to_buffer", "writeToBuffer_tf");
    ______macro(home, "writeTo", "writeToBuffer_tf");
    ______macro(home, "toStringBuf", "toStringBuf_tf");
    ______macro(home, "SB", "toStringBuf_tf");
    ______macro(home, "splice", "splice_tf");
    ______macro(home, "times", "plus_StringBuf_sequence_tf");
    ______macro(home, "equal", "intIntEqual_tf");
    ______macro(home, "uri", "universalize0_ob_tf");
    ______macro(home, "set", "set_tf");
    ______macro(home, "supplyArgument", "supplyArgument_tf");
}