function __subClassDepth(c) {
    var c;
    var sbs;
    var cd;
    var ln;
    var i;
    var mxd;
    var csb;
    if (c === Resource) return -1;
    sbs = c["rdfs:subClassOf"];
    if (__seqLength(sbs) === 0) return 0;
    ln = __seqLength(sbs);
    mxd = 0;
    for (i = 0; i < ln; i++) {
        csb = sbs[i];
        if (!(__type0(csb) === Restriction)) {
            cd = __subClassDepth(sbs[i]);
            if (cd > mxd) mxd = cd;
        }
    }
    return mxd + 1;
}

var classSpecificityBuf = __mk_emptysequence("<unprintable>");

function __mostSpecific(cls) {
    var cls;
    var ln;
    var i;
    var c;
    var cd;
    var mxd;
    var cc;
    var mxdc;
    ln = __seqLength(cls);
    if (ln === 0) return ob;
    if (ln === 1) return cls[0];
    mxdc = cls[0];
    mxd = __subClassDepth(mxdc);
    for (i = 1; i < ln; i++) {
        cc = cls[i];
        cd = __subClassDepth(cc);
        if (cd > mxd) {
            mxd = cd;
            mxdc = cc;
        }
    }
    return mxdc;
}

function __partitionRestrictions(rst) {
    var rst;
    var rs;
    var ln;
    var i;
    var crs;
    var prp;
    var rprp;
    var cv;
    rs = mkResource();
    ln = __seqLength(rst);
    for (i = 0; i < ln; i++) {
        crs = rst[i];
        prp = ____obsel(crs, owlOnProperty);
        rprp = __regarding(prp);
        cv = ____fget(rs, rprp);
        if (!cv) {
            cv = [ crs ];
            ______assert(rs, rprp, cv);
        } else ____seqobAdd(cv, crs);
    }
    return rs;
}

function ____consolidateRestrictions(p, rst) {
    var p;
    var rst;
    var alvf;
    var ln;
    var crd;
    var mxc;
    var cmxc;
    var i;
    var ccrd;
    var crdr;
    var hsvr;
    var mxr;
    var alv;
    var ms;
    var cr;
    var hsv;
    alvf = __mk_emptysequence("<unprintable>");
    ln = __seqLength(rst);
    crd = -1;
    mxc = -1;
    ln = __seqLength(rst);
    for (i = 0; i < ln; i++) {
        cr = rst[i];
        alv = ____obsel(cr, owlAllValuesFrom);
        if (!hsv) {
            hsv = ____obsel(cr, "owl:hasValue");
            hsvr = cr;
        }
        ccrd = ____intsel(cr, owlCardinality);
        cmxc = ____intsel(cr, "owl:maxCardinality");
        if (ccrd === 1) {
            crd = 1;
            crdr = cr;
        }
        if (cmxc === 1) {
            mxc = 1;
            mxr = cr;
        }
        if (alv) ____seqobAdd(alvf, alv);
    }
    __seqReset(rst);
    if (hsv) ____seqobAdd(rst, hsvr);
    if (alvf) {
        ms = __mostSpecific(alvf);
        ____seqobAdd(rst, ____mkAllValuesFromRestriction(p, ms));
    }
    if (crd === 1) ____seqobAdd(rst, crdr); else if (mxc === 1) ____seqobAdd(rst, mxr);
}

function ____collectRestrictions(rs, cl) {
    var rs;
    var cl;
    var sbc;
    var ln;
    var i;
    var csb;
    sbc = ____mget(cl, "rdfs:subClassOf");
    if (sbc) {
        ln = __seqLength(sbc);
        for (i = 0; i < ln; i++) {
            csb = sbc[i];
            if (__type0(csb) === Restriction) ____seqobAdd(rs, csb); else ____collectRestrictions(rs, csb);
        }
    }
}

function __initialize(s) {
    var s;
    var sbc;
    var ln;
    var i;
    var rst;
    var r;
    var rtable;
    var bnd;
    var ky;
    var p;
    var cb;
    sbc = ____mget(s, "rdfs:subClassOf");
    if (!sbc) return;
    ln = __seqLength(sbc);
    rst = __mk_emptysequence("<unprintable>");
    ____collectRestrictions(rst, s);
    rtable = __partitionRestrictions(rst);
    bnd = __bindings(rtable);
    ln = __seqLength(bnd);
    for (i = 0; i < ln; i++) {
        cb = bnd[i];
        ky = ____obsel(cb, Binding_key);
        p = ____obsel(ky, Regarding_value);
        r = ____obsel(cb, Binding_value);
        ____consolidateRestrictions(p, r);
    }
    ______set(s, fablRestrictions, rtable);
}

function ____restrictionsOn(s, p) {
    var s;
    var p;
    var rtable;
    rtable = ____get(s, fablRestrictions);
    if (!rtable) return null;
    return ____get(rtable, __regarding(p));
}

function __class1(s) {
    var s;
    var q;
    var ns;
    var pr;
    var lc;
    var cv;
    var rs;
    var sbc;
    q = __parseQname(s);
    pr = __cadr(q);
    ns = __namespace(pr);
    lc = __caddr(q);
    cv = ____selectUri(ns, lc);
    if (!cv) {
        rs = __iNew(Sort);
        classBeingDefined = rs;
        ______bindUri(ns, lc, rs);
        return rs;
    } else {
        if (!(__type0(cv) === Class)) {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "Attempt to redefine ");
            ____times(uwriteBuffer, s);
            ____times(uwriteBuffer, " as a Class");
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
        rs = cv;
        sbc = ____mget(rs, "rdfs:subClassOf");
        if (sbc) __seqReset(sbc);
        classBeingDefined = rs;
        return rs;
    }
}

function __class(s) {
    var s;
    __class1(s);
}

function ____class(s, subclasses) {
    var s;
    var subclasses;
    var ln;
    var i;
    var rs;
    rs = __class1(s);
    ln = __seqLength(subclasses);
    for (i = 0; i < ln; i++) {
        ______assert(rs, "rdfs:subClassOf", subclasses[i]);
    }
}

function ____________addPropertyRestriction(tp, prp, valueType, value, crd, maxc) {
    var tp;
    var prp;
    var valueType;
    var value;
    var crd;
    var maxc;
    var crst;
    if (value) {
        crst = ____mkHasValueRestriction(prp, value);
        ______assert(tp, "rdfs:subClassOf", crst);
    }
    if (valueType) {
        crst = ____mkAllValuesFromRestriction(prp, valueType);
        ______assert(tp, "rdfs:subClassOf", crst);
    }
    if (crd === 1) {
        crst = ____mkCardinalityRestriction(prp, 1);
        ______assert(tp, "rdfs:subClassOf", crst);
    }
    if (maxc === 1) {
        crst = ____mkMaxCardinalityRestriction(prp, 1);
        ______assert(tp, "rdfs:subClassOf", crst);
    }
}

function ______addPropertyRestriction(tp, prp, valueType) {
    var tp;
    var prp;
    var valueType;
    ____________addPropertyRestriction(tp, prp, valueType, null, 0, 1);
}

function __________addPropertyRestriction(prp, valueType, value, crd, maxc) {
    var prp;
    var valueType;
    var value;
    var crd;
    var maxc;
    if (!classBeingDefined) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "No class being defined");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    ____________addPropertyRestriction(classBeingDefined, prp, valueType, value, crd, maxc);
}

function ____addPropertyRestriction(prp, valueType) {
    var prp;
    var valueType;
    __________addPropertyRestriction(prp, valueType, null, 0, 1);
}

function ______addField(tp, nm, vtp) {
    var tp;
    var nm;
    var vtp;
    var prp;
    var cv;
    cv = ____selectUri(tp, nm);
    if (cv) {
        if (!____hasType(cv, Property)) {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "Cannot redefine ");
            ____times(uwriteBuffer, nm);
            ____times(uwriteBuffer, " as a field");
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
        prp = cv;
    } else {
        prp = __iNew(Property);
        ______bindUri(tp, nm, prp);
    }
    ____________addPropertyRestriction(tp, prp, vtp, null, 1, 0);
}

function endClass() {
    __initialize(classBeingDefined);
    classBeingDefined = null;
}

function ____propertyValueConstraints(tp, p) {
    var tp;
    var p;
    var btfs;
    var prst;
    var avf;
    var rsts;
    var rst;
    var rstsq;
    var crst;
    var vrst;
    var ct;
    var pt;
    var vt;
    var cf;
    var pf;
    var vf;
    var ln;
    var i;
    var rp;
    rp = __regarding(p);
    btfs = ____get(tp, bitFields);
    if (btfs) {
        if (____get(btfs, rp)) return ____cons(fabl_boolean, "functional");
    }
    prst = ____get(tp, fablRestrictions);
    if (prst) {
        rsts = ____get(prst, rp);
        if (rsts) {
            if (!(__obkind(rsts) === seq_kind)) {
                beforeError();
                __reset(uwriteBuffer);
                ____times(uwriteBuffer, "internal");
                __tprint(uwriteBuffer);
                terpri();
                afterError();
            }
            rstsq = rsts;
            cf = fabl_false;
            ln = __seqLength(rstsq);
            for (i = 0; i < ln; i++) {
                crst = rstsq[i];
                avf = ____obsel(crst, "owl:allValuesFrom");
                if (avf) ct = avf;
                if (____intsel(crst, "owl:cardinality") === 1 || ____intsel(crst, "owl:maxCardinality") === 1) cf = fabl_true;
            }
        }
    }
    pt = __range(p);
    if (!pt) {
        if (!ct) vt = ob; else vt = ct;
    } else {
        if (!ct) vt = pt; else vt = __mostSpecific([ pt, ct ]);
    }
    pf = fabl_false;
    if (____hasType(p, FunctionalProperty)) pf = fabl_true;
    if (pf || cf) vf = "functional"; else vf = "unconstrained";
    return ____cons(vt, vf);
}

function ____propertyValueType(tp, p) {
    var tp;
    var p;
    var vc;
    vc = ____propertyValueConstraints(tp, p);
    return __car(vc);
}

function ____propertyBitField(tp, p) {
    var tp;
    var p;
    var rs;
    var btfs;
    btfs = ____fget(tp, bitFields);
    if (btfs) rs = ____get(btfs, __regarding(p));
    if (!rs) rs = ____fget(p, bitField);
    return rs;
}

function ______assert(x, p, y) {
    var x;
    var p;
    var y;
    ______assert(x, p, y);
}

function __nameOrQnamePrint(x) {
    var x;
    var rs;
    if (__isId(x)) return __toString(x);
    if (__isList(x)) {
        if (____um_eq(__car(x), "_colon_")) {
            rs = "";
            {
                ____times(rs, __cadr(x));
                ____times(rs, ":");
                ____times(rs, __caddr(x));
            }
            return rs;
        }
    }
    {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Expected name or qualified name: ");
        ____times(uwriteBuffer, x);
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
}

function __isOne(x) {
    var x;
    return __obkind(x) === int_kind && __ob_to_integer(x) === 1;
}

var lastRestrict;

null;

function __analyzeRestrict(x) {
    var x;
    var cx;
    var ccx;
    var cl;
    var clv;
    var prpx;
    var aclv;
    var prp;
    var avfr;
    var hasval;
    var crd;
    var mxc;
    var clk;
    cx = __cdr(x);
    ccx = __car(cx);
    prpx = __evalQnameN(__car(cx));
    if (!prpx) {
        prp = __iNew("rdf:Property");
        ______bindUri(__namespace(__cadr(ccx)), __caddr(ccx), prp);
    } else {
        if (!____hasType(prpx, Property)) {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "Expected a property: ");
            ____times(uwriteBuffer, __nameOrQnamePrint(__car(cx)));
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
        prp = prpx;
    }
    cx = __cdr(cx);
    crd = 0;
    mxc = 0;
    hasval = null;
    avfr = null;
    while (__isList(cx)) {
        cl = __car(cx);
        clk = __car(cl);
        if (clk === "maxCardinality") {
            clv = __cadr(cl);
            if (!__isOne(clv)) {
                beforeError();
                __reset(uwriteBuffer);
                ____times(uwriteBuffer, "maxCardinality must have value 1");
                __tprint(uwriteBuffer);
                terpri();
                afterError();
            }
            mxc = 1;
        } else if (clk === "cardinality") {
            clv = __cadr(cl);
            if (!__isOne(clv)) {
                beforeError();
                __reset(uwriteBuffer);
                ____times(uwriteBuffer, "cardinality must have value 1");
                __tprint(uwriteBuffer);
                terpri();
                afterError();
            }
            crd = 1;
        } else if (clk === "allValuesFrom") {
            clv = __cadr(cl);
            avfr = __analyzeTypen(clv);
            if (!avfr) {
                beforeError();
                __reset(uwriteBuffer);
                ____times(uwriteBuffer, "allValuesFrom must be a Class");
                __tprint(uwriteBuffer);
                terpri();
                afterError();
            }
        } else if (clk === "hasValue") {
            clv = __cadr(cl);
            aclv = __analyze(clv);
            hasval = __evaluate(aclv);
        } else {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "internal: unexpected clause: ");
            ____times(uwriteBuffer, clk);
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
        cx = __cdr(cx);
    }
    ____________addPropertyRestriction(classBeingDefined, prp, avfr, hasval, crd, mxc);
    return __integer_to_ob(1);
}

function ________defineBitField(cls, btp, prp, bt) {
    var cls;
    var btp;
    var prp;
    var bt;
    var btf;
    var bfs;
    btf = __iNew("fabl:BitField");
    ______obset(btf, BitField_ofProperty, prp);
    ______intset(btf, BitField_lowbit, bt);
    ______intset(btf, BitField_highbit, bt);
    bfs = ____fget(cls, bitFields);
    if (!bfs) {
        bfs = __iNew("rdfs:Resource");
        ______set(cls, bitFields, bfs);
    }
    ______set(bfs, __regarding(btp), btf);
}

function __restrict_tf(x) {
    var x;
    lastRestrict = x;
    __analyzeRestrict(x);
    return "restrict";
}