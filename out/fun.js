function __funsig_numobs(x) {
    var x;
    return ____land(x, 15);
}

function __funsig_numints(x) {
    var x;
    return ____lshift(____land(x, 240), -4);
}

function __funsig_numdoubles(x) {
    var x;
    return ____lshift(____land(x, 3840), -8);
}

function __________setsig(fn, rts, numobs, numints, numdoubles) {
    var fn;
    var rts;
    var numobs;
    var numints;
    var numdoubles;
    var b;
    b = ____intsel(fn, Function_booles);
    ______intset(fn, Function_booles, ____setLowHalf(b, ____lor(numobs, ____lor(____lshift(numints, 4), ____lshift(numdoubles, 8)))));
}

function __getsig(fn) {
    var fn;
    return __low_half(____intsel(fn, Function_booles));
}

function __inputTypes(srt) {
    var srt;
    var cns;
    cns = ____get(srt, Sort_constructor);
    if (!(cns === "Function")) return null;
    return ____obsel(srt, Sort_params);
}

function __resultType(srt) {
    var srt;
    var cns;
    cns = ____get(srt, Sort_constructor);
    if (!cns) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Expected Function type");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    if (!(cns === "Function")) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Expected Function type: encountered ");
        ____times(uwriteBuffer, cns);
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    return ____obsel(srt, Sort_param);
}

function ________mkFunction(df, nm, tp, impl) {
    var df;
    var nm;
    var tp;
    var impl;
    var ci;
    var rtp;
    var sti;
    var ln;
    var i;
    var numo;
    var numi;
    var numr;
    var rs;
    var isrts;
    isrts = __inputTypes(tp);
    rtp = __resultType(tp);
    if (!isrts) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Sort of function is non-functional: ");
        ____times(uwriteBuffer, nm);
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    ln = __seqLength(isrts);
    numi = 0;
    numo = 0;
    numr = 0;
    for (i = 0; i < ln; i++) {
        ci = isrts[i];
        sti = __storage(ci);
        if (sti === storage_ob) numo++; else if (sti === storage_int) numi++; else numr++;
    }
    rs = ______mkFunctionOb(nm, df, tp);
    ______obset(rs, Function_implementation, impl);
    __________setsig(rs, __storage(rtp), numo, numi, numr);
    return rs;
}

function __________mkFunction(df, nm, resulttype, isrts, impl) {
    var df;
    var nm;
    var resulttype;
    var isrts;
    var impl;
    var tp;
    tp = ____mkFunctionType(resulttype, isrts);
    return ________mkFunction(df, nm, tp, impl);
}

function ________mkFunction(df, nm, resulttype, isrts) {
    var df;
    var nm;
    var resulttype;
    var isrts;
    return __________mkFunction(df, nm, resulttype, isrts, null);
}

function ______mkFunction(df, nm, srt) {
    var df;
    var nm;
    var srt;
    return ________mkFunction(df, nm, srt, null);
}

var variantsP = ____selectUri(fabl, "functionVariants");

function ____variants(cn, nm) {
    var cn;
    var nm;
    var vrs;
    vrs = ____get(cn, variantsP);
    if (!vrs) return null;
    return ____get(vrs, __regarding(nm));
}

function __allocateVariantsObject(cn) {
    var cn;
    var vrs;
    vrs = ____get(cn, variantsP);
    if (!vrs) {
        vrs = mkResource();
        ________set(cn, variantsP, vrs, ob);
    }
    return vrs;
}

function ______sameInputTypes(x, y, st) {
    var x;
    var y;
    var st;
    var ix;
    var iy;
    var lnx;
    var lny;
    var i;
    ix = __inputTypes(x);
    iy = __inputTypes(y);
    if (____um_eq(ix, iy)) return fabl_true;
    if (!ix || !iy) return fabl_false;
    lnx = __seqLength(ix);
    lny = __seqLength(iy);
    if (!(lnx === lny)) return fabl_false;
    for (i = st; i < lnx; i++) {
        if (!____um_eq(ix[i], iy[i])) return fabl_false;
    }
    return fabl_true;
}

function ________internFunction(cn, nm, fns, pcd) {
    var cn;
    var nm;
    var fns;
    var pcd;
    var fn;
    var fni;
    var vrs;
    var vrsq;
    var rnm;
    fn = ________mkFunction(cn, nm, fns, pcd);
    fni = __identifyFunction(fn);
    if (fni) {
        ______obset(fni, Function_implementation, pcd);
        return fni;
    }
    fni = __internFunction(fn);
    vrs = __allocateVariantsObject(cn);
    rnm = __regarding(nm);
    vrsq = ____get(vrs, rnm);
    if (!vrsq) {
        vrsq = [ fni ];
        ________set(vrs, rnm, vrsq, ob);
    } else ____seqobAdd(vrsq, fni);
    return fni;
}

function ______internFunction(cn, nm, fns) {
    var cn;
    var nm;
    var fns;
    return ________internFunction(cn, nm, fns, null);
}

function ______internFunction(cn, nm, fns) {
    var cn;
    var nm;
    var fns;
    return ________internFunction(cn, nm, fns, null);
}

function ________internFunction(cn, nm, rtp, itps) {
    var cn;
    var nm;
    var rtp;
    var itps;
    return ______internFunction(cn, nm, ____mkFunctionType(rtp, itps));
}

function ________internCFunction(cn, nm, rtp, itps) {
    var cn;
    var nm;
    var rtp;
    var itps;
    var rs;
    var ccimp;
    var fv;
    rs = ______internFunction(cn, nm, ____mkFunctionType(rtp, itps));
    fv = ______getVariant(fimp, nm, itps);
    if (fv) {
        ccimp = ____intsel(fv, Function_cimp);
        ______intset(rs, Function_cimp, ccimp);
    }
    return rs;
}

function ____times(s, r) {
    var s;
    var r;
    var prp;
    var avf;
    var crd;
    var hsv;
    prp = ____fget(r, "owl:onProperty");
    avf = ____fget(r, "owl:allValuesFrom");
    if (avf) {
        {
            ____times(s, "[Restriction on ");
            ____times(s, prp);
            ____times(s, ": allValuesFrom ");
            ____times(s, avf);
            ____times(s, "]");
        }
        return;
    }
    crd = ____intsel(r, "owl:cardinality");
    if (crd > 0) {
        {
            ____times(s, "[Restriction on ");
            ____times(s, prp);
            ____times(s, ": cardinality ");
            ____times(s, crd);
            ____times(s, "]");
        }
        return;
    }
    crd = ____intsel(r, "owl:maxCardinality");
    if (crd > 0) {
        {
            ____times(s, "[Restriction on ");
            ____times(s, prp);
            ____times(s, ": maxCardinality ");
            ____times(s, crd);
            ____times(s, "]");
        }
        return;
    }
    hsv = ____fget(r, "owl:hasValue");
    if (hsv) {
        {
            ____times(s, "[Restriction on ");
            ____times(s, prp);
            ____times(s, ": hasValue ");
            ____times(s, hsv);
            ____times(s, "]");
        }
        return;
    }
}

var printQualifiedClassNames = fabl_true;

function xsd_string__rdfs_Class__times(s, tp) {
    var s;
    var tp;
    var nm;
    var cns;
    var cm;
    var rtp;
    var sbt;
    var itps;
    var ln;
    var i;
    if (rdfs_Resource__rdfs_Resource__um_eq(rdfs_Resource__type0(tp), Restriction)) {
        xsd_string__owl_Restriction__times(s, tp);
        return;
    }
    nm = rdfs_Resource__name(tp);
    if (!nm) {
        cns = rdfs_Resource__rdf_Property__obsel(tp, Sort_constructor);
        if (!cns) {
            xsd_string__fabl_id__times(s, "unprintable Class");
            return;
        }
        if (cns === "Function") {
            rtp = rdfs_Class__resultType(tp);
            itps = rdfs_Class__inputTypes(tp);
            xsd_string__fabl_id__times(s, "Function(");
            xsd_string__rdfs_Class__times(s, rtp);
            ln = rdfs_Resource__seqLength(itps);
            for (i = 0; i < ln; i++) {
                xsd_string__fabl_id__times(s, ",");
                xsd_string__rdfs_Class__times(s, itps[i]);
            }
            xsd_string__fabl_id__times(s, ")");
        } else {
            sbt = rdfs_Resource__rdf_Property__obsel(tp, Sort_param);
            xsd_string__fabl_id__times(s, cns);
            xsd_string__fabl_id__times(s, "(");
            xsd_string__rdfs_Class__times(s, sbt);
            xsd_string__fabl_id__times(s, ")");
        }
    } else {
        if (printQualifiedClassNames) {
            if (!xsd_string__rdfs_Resource__qualifiedName(s, tp)) xsd_string__fabl_id__times(s, nm);
        } else xsd_string__fabl_id__times(s, nm);
    }
}