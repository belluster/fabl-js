var analyzeVerbose;

fabl_false;

var analysisTempCount;

0;

var analyzerActive = fabl_true;

var macroInputs = [ fabl_id, SeqOfXob ];

var constructorInputs = [ Any ];

var classBeingDefined;

[ Any ];

var inClassContext;

[ Any ];

var thisXob;

[ Any ];

function __________associateFunction(fr, bnm, nm, fnm, inputs) {
    var fr;
    var bnm;
    var nm;
    var fnm;
    var inputs;
    var fn;
    var vrs;
    var vrsq;
    fn = ______getVariant(fr, fnm, inputs);
    if (!fn) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "No function of the right type named ");
        ____times(uwriteBuffer, fnm);
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    vrs = ____get(fr, bnm);
    if (!vrs) {
        vrs = mkObject();
        ________set(fr, bnm, vrs, Any);
    }
    vrsq = ____get(vrs, __regarding(nm));
    if (!vrsq) {
        vrsq = [ fn ];
        ________set(vrs, __regarding(nm), vrsq, SeqOfFunction);
    } else ____seqobAdd(vrsq, fn);
}

var macrosP = ____selectUri(fabl, "macros");

function ______macro(fr, nm, fnm) {
    var fr;
    var nm;
    var fnm;
    __________associateFunction(fr, macrosP, nm, fnm, macroInputs);
}

var constructorsP = ____selectUri(fabl, "constructors");

function ______constructor(fr, nm, fnm) {
    var fr;
    var nm;
    var fnm;
    __________associateFunction(fr, constructorsP, nm, fnm, constructorInputs);
}

function ____lookupBinding(env, nm) {
    var env;
    var nm;
    var ln;
    var i;
    var cf;
    var bn;
    ln = __seqLength(env);
    for (i = ln - 1; i >= 0; i--) {
        cf = env[i];
        bn = ____selectGlobalBinding(cf, nm);
        if (bn) return bn;
    }
    return null;
}

function ____lookup(env, nm) {
    var env;
    var nm;
    var b;
    b = ____lookupBinding(env, nm);
    if (!b) return null;
    return ____obsel(b, Binding_value);
}

function ______lkupAssociatedFunctions(env, bnm, nm) {
    var env;
    var bnm;
    var nm;
    var ln;
    var i;
    var cf;
    var sbn;
    var bn;
    ln = __seqLength(env);
    for (i = ln - 1; i >= 0; i--) {
        cf = env[i];
        bn = ____get(cf, bnm);
        if (bn) {
            sbn = ____get(bn, __regarding(nm));
            if (sbn) return sbn;
        }
    }
    return null;
}

function __lkupConstructors(nm) {
    var nm;
    return ______lkupAssociatedFunctions(homePath(), constructorsP, nm);
}

function __lkupMacros(nm) {
    var nm;
    return ______lkupAssociatedFunctions(homePath(), macrosP, nm);
}

function __analyze(nm) {
    var nm;
    var b;
    var rs;
    if (!nm) return nulXob;
    if (nm === "home") return ____selectGlobalBinding(fabl, "home");
    if (nm === "nil") return nulXob;
    b = ____lookupBinding(cPath, nm);
    if (!b) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Unknown symbol: ");
        ____times(uwriteBuffer, nm);
        ____times(uwriteBuffer, " in a PATH of length ");
        ____times(uwriteBuffer, __seqLength(cPath));
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    return b;
}

function __analyzeList(x) {
    var x;
    var dt;
    var cx;
    dt = __mk_emptysequence("<unprintable>");
    cx = x;
    while (__isList(cx)) {
        ____seqobAdd(dt, __analyze(__car(cx)));
        cx = __cdr(cx);
    }
    return dt;
}

function ____coercesTo(src, dest) {
    var src;
    var dest;
    if (____um_eq(src, dest)) return fabl_true;
    if (dest === ob) return coerceToOb;
    if (coerceToLiteral && dest === Literal) return src === fabl_int || src === fabl_double || src === fabl_boolean || src === fabl_string;
    if (coerceToSuperClasses && ____isSubClassOf(src, dest)) return fabl_true;
    return ____um_eq(src, fabl_int) && ____um_eq(dest, fabl_double) || ____um_eq(src, fabl_id) && ____um_eq(dest, fabl_string);
}

function ____matchInputs(fntp, inputs) {
    var fntp;
    var inputs;
    var dtf;
    var ln;
    var i;
    var rs;
    rs = 0;
    dtf = __inputTypes(fntp);
    ln = __seqLength(inputs);
    if (!(__seqLength(dtf) === ln)) return -1;
    for (i = 0; i < ln; i++) {
        if (!____um_eq(inputs[i], dtf[i])) {
            if (____coercesTo(inputs[i], dtf[i])) rs++; else return -1;
        }
    }
    return rs;
}

var inputTypesBuf = __mk_emptysequence("<unprintable>");

function ______findVariant0(vrs, nm, inputs) {
    var vrs;
    var nm;
    var inputs;
    var dt;
    var ln;
    var i;
    var cost;
    var mincost;
    var cf;
    var rs;
    var fsrt;
    ln = __seqLength(vrs);
    rs = null;
    for (i = 0; i < ln; i++) {
        cf = vrs[i];
        fsrt = ____obsel(cf, Function_type);
        cost = ____matchInputs(fsrt, inputs);
        if (cost >= 0) {
            if (!rs || cost < mincost) {
                rs = cf;
                mincost = cost;
            }
        }
    }
    return rs;
}

function ______findVariant(fr, nm, inputs) {
    var fr;
    var nm;
    var inputs;
    var vrs;
    var vr;
    vr = ______getVariant(fr, nm, inputs);
    if (vr) return vr;
    vrs = ____variants(fr, nm);
    if (analyzeVerbose) {
        if (!vrs) {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "Nul vrs");
            __tprint(uwriteBuffer);
            terpri();
        } else {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "NNul vrs");
            __tprint(uwriteBuffer);
            terpri();
        }
    }
    if (!vrs) return null; else return ______findVariant0(vrs, nm, inputs);
}

function ______findVariant(env, nm, inputs) {
    var env;
    var nm;
    var inputs;
    var ln;
    var i;
    var rs;
    ln = __seqLength(env);
    for (i = ln - 1; i >= 0; i--) {
        rs = ______findVariant(env[i], nm, inputs);
        if (rs) return rs;
    }
}

function ______getVariant(env, nm, inputs) {
    var env;
    var nm;
    var inputs;
    var ln;
    var i;
    var rs;
    ln = __seqLength(env);
    for (i = ln - 1; i >= 0; i--) {
        rs = ______getVariant(env[i], nm, inputs);
        if (rs) return rs;
    }
}

function ____metaCoerce(x, s) {
    var x;
    var s;
    var rsq;
    var dtx;
    var ln;
    var i;
    var mt;
    rsq = __mk_emptysequence("<unprintable>");
    ln = __seqLength(s);
    for (i = 0; i < ln; i++) {
        mt = ____metaCoerce(x[i], s[i]);
        if (!mt) return null;
        ____seqobAdd(rsq, mt);
    }
    return rsq;
}

var select_buffer = 0;

function ______selectString(s, lb, ub) {
    var s;
    var lb;
    var ub;
    __reset(select_buffer);
    ________select(select_buffer, s, lb, ub);
    return __toString(select_buffer);
}

function __stripSet(s) {
    var s;
    var ln;
    ln = __length(s);
    if (ln < 5) return null;
    if (____select(s, 0) === 115 && ____select(s, 1) === 101 && ____select(s, 2) === 116 && ____select(s, 3) === 95) return ______selectString(s, 4, ln - 1);
}

var methodArgsBuf = __mk_emptysequence("<unprintable>");

function consoleStackDepth() {
    return 0;
}

function __analyzeVerboseReturn(x) {
    var x;
    if (analyzeVerbose) {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, consoleStackDepth() - 1);
        ____times(uwriteBuffer, " Analysis returned ");
        ____times(uwriteBuffer, x);
        __tprint(uwriteBuffer);
        terpri();
    }
    return x;
}

function ____metaApplynNonPrim(fn, xbs) {
    var fn;
    var xbs;
    var brt;
    var ftp;
    var rstp;
    var sq;
    var e;
    var rsx;
    ftp = __type(fn);
    e = mkObject();
    rsx = ______bindLocal(e, "_nonPrimFun_", ftp);
    sq = __mk_emptysequence("<unprintable>");
    ____seqobAdd(sq, ____metaAssignn(rsx, fn));
    brt = blockReturnType;
    rstp = __resultType(ftp);
    blockReturnType = rstp;
    ____seqobAdd(sq, ____metaBlockReturn(____metaApplyn(rsx, xbs), null));
    blockReturnType = brt;
    return ______mkValueReturningXblock(rstp, e, sq);
}

function ____analyzen(x, try_strip_set) {
    var x;
    var try_strip_set;
    var op;
    var setop;
    var cns;
    var xmacs;
    var args;
    var itps;
    var ln;
    var i;
    var k;
    var fn;
    var ccn;
    var xmac;
    var fnb;
    var prp;
    var ns;
    var qv;
    var splitop;
    var env;
    var cdx;
    var rs;
    var a0;
    var crxa;
    var fntp;
    var rng;
    var s0;
    var crx;
    var opisqn;
    var opiss;
    var isp;
    var qop;
    var gb;
    var e1;
    var e2;
    k = __obkind(x);
    if (analyzeVerbose) {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, consoleStackDepth());
        ____times(uwriteBuffer, " Analyzing ");
        ____times(uwriteBuffer, x);
        ____times(uwriteBuffer, " of obkind ");
        ____times(uwriteBuffer, k);
        __tprint(uwriteBuffer);
        terpri();
    }
    if (!x) return nulXob; else if (k === int_kind) return __meta(__ob_to_integer(x));
    if (k === double_kind) return __meta(__toDouble(x));
    if (k === string_kind) return __analyzeVerboseReturn(__analyze(x));
    if (__isList(x)) {
        crx = __car(x);
        if (____um_eq(crx, "_colon_")) {
            e1 = __cadr(x);
            e2 = __caddr(x);
            if (!__isId(e1) || !__isId(e2)) {
                beforeError();
                __reset(uwriteBuffer);
                ____times(uwriteBuffer, "Bad form for qualified name: ");
                ____times(uwriteBuffer, x);
                __tprint(uwriteBuffer);
                terpri();
                afterError();
            }
            ns = __namespace(e1);
            if (!ns) {
                beforeError();
                __reset(uwriteBuffer);
                ____times(uwriteBuffer, "No such namespace: ");
                ____times(uwriteBuffer, ns);
                __tprint(uwriteBuffer);
                terpri();
                afterError();
            }
            qv = ____selectUri(ns, e2);
            if (qv) {
                if (____hasType(qv, Sort)) return ____meta(qv, Sort);
                if (____hasType(qv, Property)) return ____meta(qv, Property);
                return ____meta(qv, ob);
            }
            gb = ____selectBinding(ns, e2);
            if (!gb) {
                beforeError();
                __reset(uwriteBuffer);
                ____times(uwriteBuffer, e1);
                ____times(uwriteBuffer, ":");
                ____times(uwriteBuffer, e2);
                ____times(uwriteBuffer, " undefined");
                __tprint(uwriteBuffer);
                terpri();
                afterError();
            }
            return gb;
        }
        isp = __isList(crx);
        op = crx;
        opiss = !isp;
        if (opiss && ____um_eq(op, "_quote_")) {
            cdx = __cadr(x);
            if (__obkind(cdx) === seq_kind) rs = __analyzeStringBufConst(cdx); else rs = cdx;
            return __analyzeVerboseReturn(rs);
        }
        cns = __lkupConstructors(op);
        if (cns) {
            ln = __seqLength(cns);
            for (i = 0; i < ln; i++) {
                ccn = cns[i];
                rs = ____applynOb(ccn, x);
                if (rs) return __analyzeVerboseReturn(rs);
            }
        }
        args = __analyzeList(__cdr(x));
        ln = __seqLength(args);
        __seqReset(inputTypesBuf);
        for (i = 0; i < ln; i++) ____seqobAdd(inputTypesBuf, __type(args[i]));
        if (opiss) fnb = ____lookupBinding(cPath, op); else fnb = null;
        if (fnb) {
            fntp = __type(fnb);
            if (____um_eq(____obsel(fntp, Sort_constructor), "Function") && ____matchInputs(fntp, inputTypesBuf) >= 0) return __analyzeVerboseReturn(____metaApplyn(fnb, ____metaCoerce(args, __inputTypes(fntp))));
        }
        if (opiss) {
            fn = ______findVariant(homePath(), op, inputTypesBuf);
            if (analyzeVerbose) {
                if (fn) {
                    __reset(uwriteBuffer);
                    ____times(uwriteBuffer, "Found fn");
                    __tprint(uwriteBuffer);
                    terpri();
                } else {
                    __reset(uwriteBuffer);
                    ____times(uwriteBuffer, "Did not find fn");
                    __tprint(uwriteBuffer);
                    terpri();
                }
            }
        } else {
            if (__isQname(crx)) {
                ns = __namespace(__cadr(crx));
                fn = ______findVariant(ns, __caddr(crx), inputTypesBuf);
            } else {
                itps = __seqCopy(inputTypesBuf);
                crxa = __analyze(crx);
                fntp = __type(crxa);
                if (!____um_eq(____obsel(fntp, Sort_constructor), "Function")) {
                    beforeError();
                    __reset(uwriteBuffer);
                    ____times(uwriteBuffer, "Non functional expression in applicatation: ");
                    ____times(uwriteBuffer, x);
                    __tprint(uwriteBuffer);
                    terpri();
                    afterError();
                }
                if (____matchInputs(fntp, itps) >= 0) return __analyzeVerboseReturn(____metaApplynNonPrim(crxa, ____metaCoerce(args, __inputTypes(fntp))));
                {
                    beforeError();
                    __reset(uwriteBuffer);
                    ____times(uwriteBuffer, "Type mismatch in application of ");
                    ____times(uwriteBuffer, crx);
                    __tprint(uwriteBuffer);
                    terpri();
                    afterError();
                }
            }
        }
        if (fn) {
            fntp = ____obsel(fn, Function_type);
            return __analyzeVerboseReturn(____metaApplyn(fn, ____metaCoerce(args, __inputTypes(fntp))));
        }
        if (opiss) xmacs = __lkupMacros(op); else xmacs = null;
        if (xmacs) {
            ln = __seqLength(xmacs);
            for (i = 0; i < ln; i++) {
                xmac = xmacs[i];
                rs = ______applynOb(xmac, op, args);
                if (rs) return __analyzeVerboseReturn(rs);
            }
        }
        return __analyzeVerboseReturn(null);
    } else {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "internal2");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
}

function __analyzen(x) {
    var x;
    return ____analyzen(x, fabl_true);
}

function __analyze(x) {
    var x;
    var rs;
    var msg;
    rs = __analyzen(x);
    if (!rs) {
        if (__isList(x)) msg = __car(x); else msg = x;
        {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "Failure to analyze application:");
            ____times(uwriteBuffer, msg);
            ____times(uwriteBuffer, " in ");
            ____times(uwriteBuffer, x);
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
    }
    return rs;
}

function ____copyInto(dst, src) {
    var dst;
    var src;
    var ln;
    var i;
    __seqReset(dst);
    ln = __seqLength(src);
    for (i = 0; i < ln; i++) ____seqobAdd(dst, src[i]);
}

function __analyzeToplevel(x) {
    var x;
    ____copyInto(cPath, homePath());
    return __analyze(x);
}