var obToInt_fun = ______getVariant(home, "ob_to_integer", [ ob ]);

var obToDouble_fun = ______getVariant(home, "toDouble", [ ob ]);

var doubleToOb_fun = ______getVariant(home, "toOb", [ fabl_double ]);

var funReturnType;

______getVariant(home, "toOb", [ fabl_double ]);

var blockReturnType;

______getVariant(home, "toOb", [ fabl_double ]);

var not_fun;

______getVariant(home, "toOb", [ fabl_double ]);

function __meta(n) {
    var n;
    return __integer_to_ob(n);
}

function __meta(n) {
    var n;
    return __toOb(n);
}

function ____meta(x, s) {
    var x;
    var s;
    var rs;
    if (s === fabl_int || s === fabl_double || s === fabl_id) return x;
    rs = __mkXob(s);
    ______obset(rs, Xob1_value, x);
    ________bitset(rs, Xob1_booles, Xob1_isConstant, 1);
    return rs;
}

var nulXob = ____meta(null, ob);

function __meta(n) {
    var n;
    if (!n) return nulXob; else return n;
}

function __meta(s) {
    var s;
    return ____meta(s, Sort);
}

var typesXapply = [ Xob, Xapply ];

function ________metaApplyn(dst, rt, fn, args) {
    var dst;
    var rt;
    var fn;
    var args;
    var rs;
    var xb;
    var a;
    var ln;
    var i;
    rs = __iNew(Xapply);
    xb = rs;
    ______obset(rs, Xapply_dest, dst);
    ______obset(rs, Xapply_functionOf, fn);
    ______obset(rs, Xapply_arguments, args);
    ______obset(rs, Xob1_type, rt);
    ln = __seqLength(args);
    for (i = 0; i < ln; i++) {
        a = args[i];
        if (__Xobish(a)) ____setParent(a, xb);
    }
    return xb;
}

function ______metaApplyn(dst, fn, args) {
    var dst;
    var fn;
    var args;
    var rt;
    var rs;
    var xb;
    var a;
    var ln;
    var i;
    rt = __resultType(__type(fn));
    return ________metaApplyn(dst, rt, fn, args);
}

function ________metaSequencen(dst, esrt, args, ck) {
    var dst;
    var esrt;
    var args;
    var ck;
    var rt;
    var rs;
    var xb;
    var a;
    var ln;
    var i;
    if (ck === "seq") rt = __SeqOf(esrt); else if (ck === "bag") rt = __BagOf(esrt); else if (ck === "alt") rt = __AltOf(esrt); else {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Unknown collection kind: ");
        ____times(uwriteBuffer, ck);
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    rs = __iNew(Xsequence);
    xb = rs;
    ______obset(rs, Xsequence_dest, dst);
    ______obset(rs, Xsequence_elementType, esrt);
    ______obset(rs, Xsequence_arguments, args);
    ______obset(rs, Xob1_type, rt);
    ln = __seqLength(args);
    for (i = 0; i < ln; i++) {
        a = args[i];
        if (__Xobish(a)) ____setParent(a, xb);
    }
    return xb;
}

function ______metaSequencen(dst, esrt, args) {
    var dst;
    var esrt;
    var args;
    return ________metaSequencen(dst, esrt, args, "seq");
}

function ____metaApplyn(fn, a0) {
    var fn;
    var a0;
    return ______metaApplyn(null, fn, [ a0 ]);
}

function ______metaApplyn(fn, a0, a1) {
    var fn;
    var a0;
    var a1;
    return ______metaApplyn(null, fn, [ a0, a1 ]);
}

function ________metaApplyn(fn, a0, a1, a2) {
    var fn;
    var a0;
    var a1;
    var a2;
    return ______metaApplyn(null, fn, [ a0, a1, a2 ]);
}

function ____metaApplyn(fn, args) {
    var fn;
    var args;
    return ______metaApplyn(null, fn, args);
}

function __isBoolean(x) {
    var x;
    return ____intsel(x, BitField_lowbit) === ____intsel(x, BitField_highbit);
}

var restrictionsP = ____selectUri(fabl, "restrictions");

function ____selectField(cl, nm) {
    var cl;
    var nm;
    var ip;
    var prp;
    prp = ____selectUri(cl, nm);
    if (!prp) return null;
    ip = ____get(cl, restrictionsP);
    if (!ip) return null;
    return ____get(ip, __regarding(prp));
}

function __isConstant(x) {
    var x;
    var k;
    k = __obkind(x);
    if (k === binding_kind) return __isConstant(x);
    if (k === smallob_kind || k === compact_kind || k === hashtable_kind) return ______bitsel(x, Xob1_booles, Xob1_isConstant);
    return fabl_true;
}

function __constantValue(x) {
    var x;
    var k;
    k = __obkind(x);
    if (k === binding_kind) return __bindingValue(x); else if (k === smallob_kind || k === compact_kind || k === hashtable_kind) return ____obsel(x, Xob1_value);
    return x;
}

function ____metaCast1(x, s) {
    var x;
    var s;
    var rs;
    var xb;
    if (__type(x) === s) return x;
    rs = __iNew(Xcast);
    xb = rs;
    ______obset(rs, Xcast_castee, x);
    ______obset(rs, Xob1_type, s);
    if (__Xobish(x)) ____setParent(x, xb);
    return xb;
}

function __lowbit(x) {
    var x;
    return __byte2(____intsel(x, XselectProperty_booles));
}

function __highbit(x) {
    var x;
    return __byte3(____intsel(x, XselectProperty_booles));
}

function ____set_lowbit(x, b) {
    var x;
    var b;
    ______intset(x, XselectProperty_booles, ____setByte2(____intsel(x, XselectProperty_booles), b));
}

function ____set_highbit(x, b) {
    var x;
    var b;
    ______intset(x, XselectProperty_booles, ____setByte3(____intsel(x, XselectProperty_booles), b));
}

function ________metaSelectProperty(src, nm, rstp, functional) {
    var src;
    var nm;
    var rstp;
    var functional;
    var rs;
    var xb;
    rs = __iNew(XselectProperty);
    xb = rs;
    ______obset(rs, Xob1_type, rstp);
    ______obset(rs, XselectProperty_selector, nm);
    ______obset(rs, XselectProperty_source, src);
    ________bitset(rs, XselectProperty_booles, XselectProperty_isFunctional, functional);
    return xb;
}

function ______metaSelectProperty(src, nm, rstp) {
    var src;
    var nm;
    var rstp;
    return ________metaSelectProperty(src, nm, rstp, fabl_true);
}

function ____metaSelectBitField(src, btf) {
    var src;
    var btf;
    var rs;
    var xb;
    var rst;
    var tp;
    var rstp;
    rs = __iNew("fabl:XselectProperty");
    xb = rs;
    ______obset(rs, XselectProperty_source, src);
    if (__isBoolean(btf)) rstp = fabl_boolean; else rstp = fabl_int;
    ________bitset(rs, XselectProperty_booles, XselectProperty_isBitField, 1);
    ____set_lowbit(rs, ____intsel(btf, BitField_lowbit));
    ____set_highbit(rs, ____intsel(btf, BitField_highbit));
    ______obset(rs, XselectProperty_selector, ____obsel(btf, BitField_ofProperty));
    ______obset(rs, Xob1_type, rstp);
    return xb;
}

function ____metaSelectIndexn(src, sl) {
    var src;
    var sl;
    var ssrt;
    var rt;
    var rs;
    var xb;
    var cn;
    ssrt = __type(src);
    if (ssrt === Seq || ssrt === Bag || ssrt === Alt) rt = ob; else if (ssrt === fabl_string || ssrt === hexBinary) rt = fabl_int; else {
        cn = ____obsel(ssrt, Sort_constructor);
        if (!(cn === "SeqOf") && !(cn === "BagOf")) return null;
        rt = ____obsel(ssrt, Sort_param);
    }
    rs = __iNew(XselectIndex);
    xb = rs;
    ______obset(rs, XselectIndex_source, src);
    ______obset(rs, XselectIndex_selector, sl);
    ______obset(rs, Xob1_type, rt);
    if (__Xobish(sl)) ____setParent(sl, xb);
    return xb;
}

function ______metaSelectIndex(src, sl, rstp) {
    var src;
    var sl;
    var rstp;
    var rs;
    var xb;
    rs = __iNew(XselectIndex);
    xb = rs;
    ______obset(rs, XselectIndex_source, src);
    ______obset(rs, XselectIndex_selector, sl);
    ______obset(rs, Xob1_type, rstp);
    if (__Xobish(sl)) ____setParent(sl, xb);
    return xb;
}

var mkStringBuf_function = ______getVariant(home, "mkStringBuf", [ fabl_id ]);

var coerceToSuperClasses = fabl_true;

var coerceToOb = fabl_true;

var coerceToLiteral = fabl_true;

var literalToString_fun = ______getVariant(home, "toString", [ Literal ]);

function ____metaCoerce(x, dst) {
    var x;
    var dst;
    var srt;
    var st;
    srt = __type(x);
    if (srt === dst) return x;
    if (srt === fabl_int && dst === fabl_double) return ____metaApplyn(float_fun, x);
    if (srt === fabl_id && dst === fabl_string) return ____metaApplyn(__homeFimpFun("mkStringBuf_function"), x);
    if (coerceToOb && dst === ob) {
        st = __storage(srt);
        if (st === storage_ob) return x;
        if (st === storage_int) return ____metaApplyn(__homeFimpFun("intToOb_fun"), x);
        if (st === storage_double) return ____metaApplyn(__homeFimpFun("doubleToOb_fun"), x);
    }
    if (coerceToLiteral && dst === Literal) {
        if (srt === fabl_int || srt === fabl_double || srt === fabl_boolean || srt === fabl_string) return ____metaCast1(____metaCast(x, ob), Literal);
    }
    if (coerceToSuperClasses && !(dst === ob) && ____isSubClassOf(srt, dst)) return x;
    return null;
}

function ________metaAssignn(dst, src, addvalue, chk) {
    var dst;
    var src;
    var addvalue;
    var chk;
    var rs;
    var xb;
    var crc;
    var ds;
    ds = __type(dst);
    if (chk) {
        crc = ____metaCoerce(src, ds);
        if (!crc) return null;
    } else crc = src;
    rs = __iNew(Xassign);
    xb = rs;
    ______obset(rs, Xob1_type, fabl_void);
    ______obset(rs, Xassign_dest, dst);
    ______obset(rs, Xassign_source, crc);
    if (__Xobish(src)) ____setParent(src, xb);
    if (__Xobish(crc)) ____setParent(crc, xb);
    ________bitset(rs, Xassign_booles, Xassign_addValue, __toInt(addvalue));
    return xb;
}

function ______metaAssignn(dst, src, addValue) {
    var dst;
    var src;
    var addValue;
    var rs;
    rs = ________metaAssignn(dst, src, addValue, fabl_false);
    return rs;
}

function ____metaAssignn(dst, src) {
    var dst;
    var src;
    var rs;
    rs = ________metaAssignn(dst, src, fabl_false, fabl_false);
    return rs;
}

function ______metaAssignnCheck(dst, src, addValue) {
    var dst;
    var src;
    var addValue;
    return ________metaAssignn(dst, src, addValue, fabl_true);
}

function ____metaAssignnCheck(dst, src) {
    var dst;
    var src;
    return ________metaAssignn(dst, src, fabl_false, fabl_true);
}

function ________metaFor(init, test, incr, body) {
    var init;
    var test;
    var incr;
    var body;
    var rs;
    var xb;
    rs = __iNew(Xfor);
    xb = rs;
    ______obset(rs, Xfor_init, init);
    ______obset(rs, Xfor_test, test);
    ______obset(rs, Xfor_incr, incr);
    ______obset(rs, Xfor_body, body);
    ______obset(rs, Xob1_type, fabl_void);
    if (__Xobish(init)) ____setParent(init, xb);
    if (__Xobish(test)) ____setParent(test, xb);
    if (__Xobish(incr)) ____setParent(incr, xb);
    if (__Xobish(body)) ____setParent(body, xb);
    return xb;
}

function ____metaWhile(test, body) {
    var test;
    var body;
    var rs;
    var xb;
    rs = __iNew(Xwhile);
    xb = rs;
    ______obset(rs, Xwhile_test, test);
    ______obset(rs, Xwhile_body, body);
    ______obset(rs, Xob1_type, fabl_void);
    if (__Xobish(test)) ____setParent(test, xb);
    if (__Xobish(body)) ____setParent(body, xb);
    return xb;
}

function __metaReturn(vl) {
    var vl;
    var rs;
    var xb;
    var vs;
    vs = __type(vl);
    rs = __iNew(Xreturn);
    xb = rs;
    ______obset(rs, Xreturn_value, vl);
    ______obset(rs, Xob1_type, fabl_void);
    if (__Xobish(vl)) ____setParent(vl, xb);
    return xb;
}

function metaReturnVoid() {
    var rs;
    var xb;
    rs = __iNew(Xreturn);
    xb = rs;
    ______obset(rs, Xob1_type, fabl_void);
    return xb;
}

function ____metaBlockReturn(vl, trg) {
    var vl;
    var trg;
    var rs;
    var xb;
    var vs;
    vs = __type(vl);
    if (!(vs === blockReturnType)) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Mismatch: returning ");
        ____times(uwriteBuffer, vs);
        ____times(uwriteBuffer, ";expected ");
        ____times(uwriteBuffer, blockReturnType);
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    rs = __iNew("fabl:Xreturn");
    xb = rs;
    ______obset(rs, Xreturn_value, vl);
    ______obset(rs, Xreturn_target, trg);
    ________bitset(rs, Xreturn_booles, Xreturn_blockReturn, 1);
    ______obset(rs, Xob1_type, fabl_void);
    ____setParent(vl, xb);
    return xb;
}

function __metaVoidBlockReturn(trg) {
    var trg;
    var rs;
    var xb;
    rs = __iNew("fabl:Xreturn");
    xb = rs;
    ______obset(rs, Xreturn_target, trg);
    ________bitset(rs, Xreturn_booles, Xreturn_blockReturn, 1);
    ______obset(rs, Xob1_type, fabl_void);
    return xb;
}

var xblockLocalsP = ____selectUri(Xblock, "locals");

var typesXblock = [ Xblock ];

function ____mkXblock(e, st) {
    var e;
    var st;
    var rs;
    var xb;
    var cx;
    var i;
    var ln;
    rs = __iNew(Xblock);
    xb = rs;
    ______obset(rs, Xblock_locals, e);
    ______obset(rs, Xblock_statements, st);
    ______obset(rs, Xob1_type, fabl_void);
    ln = __seqLength(st);
    for (i = 0; i < ln; i++) {
        cx = st[i];
        ____setParent(cx, xb);
    }
    return xb;
}

function __mkXblock(st) {
    var st;
    return ____mkXblock(null, st);
}

function ______mkValueReturningXblock(s, e, st) {
    var s;
    var e;
    var st;
    var rs;
    var xb;
    var cx;
    var i;
    var ln;
    rs = __iNew(Xblock);
    xb = rs;
    ______obset(rs, Xblock_locals, e);
    ______obset(rs, Xblock_statements, st);
    ______obset(rs, Xblock_returnType, s);
    ______obset(rs, Xob1_type, s);
    ln = __seqLength(st);
    for (i = 0; i < ln; i++) {
        cx = st[i];
        ____setParent(cx, xb);
    }
    return xb;
}

function ______mkXgo(cnd, lb, giff) {
    var cnd;
    var lb;
    var giff;
    var rs;
    var xb;
    rs = __iNew(Xgo);
    xb = rs;
    ______obset(rs, Xgo_condition, cnd);
    ______obset(rs, Xgo_toLabel, lb);
    ______obset(rs, Xob1_type, fabl_void);
    ____setParent(cnd, xb);
    ________bitset(xb, Xgo_booles, Xgo_goIfFalse, giff);
    return xb;
}

function ____mkXgo(cnd, lb) {
    var cnd;
    var lb;
    return ______mkXgo(cnd, lb, fabl_false);
}

function __mkXgo(lb) {
    var lb;
    return ____mkXgo(null, lb);
}

function ____mkXgoIfFalse(cnd, lb) {
    var cnd;
    var lb;
    return ______mkXgo(cnd, lb, fabl_true);
}

function ______mkXif(cnd, ift, iff) {
    var cnd;
    var ift;
    var iff;
    var rs;
    var xb;
    rs = __iNew(Xif);
    xb = rs;
    ______obset(rs, Xif_condition, cnd);
    ______obset(rs, Xif_ifTrue, ift);
    ______obset(rs, Xif_ifFalse, iff);
    ______obset(rs, Xob1_type, fabl_void);
    ____setParent(cnd, xb);
    ____setParent(ift, xb);
    ____setParent(iff, xb);
    return xb;
}

function ____mkXif(cnd, ift) {
    var cnd;
    var ift;
    return ______mkXif(cnd, ift, null);
}

function __unNot(x) {
    var x;
    var xap;
    var args;
    if (__Xobish(x)) {
        xap = x;
        if (____um_eq(____obsel(xap, Xapply_functionOf), not_fun)) {
            args = ____obsel(xap, Xapply_arguments);
            return args[0];
        }
    }
    return null;
}

function __metaNot(x) {
    var x;
    var un;
    un = __unNot(x);
    if (un) return un;
    if (!(__type(x) === fabl_boolean)) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "meta_not only applies to boolean valued expressions");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    return ____metaApplyn(__homeFimpFun("not_fun"), x);
}

function __toBoolean(x) {
    var x;
    var xo;
    var xs;
    var xi;
    xo = x;
    if (__isString(xo)) {
        xs = xo;
        if (xs === "true" || xs === "1") return fabl_true;
        return fabl_false;
    }
    if (__obkind(xo) === int_kind) {
        xi = __ob_to_integer(xo);
        if (xi === 0) return fabl_false;
        return fabl_true;
    }
    return fabl_false;
}

var literalToInt_fun = ______getVariant(home, "toInt", [ Literal ]);

var literalToDouble_fun = ______getVariant(home, "toDouble", [ Literal ]);

var literalToBoolean_fun = ______getVariant(home, "toBoolean", [ Literal ]);

function ____metaCast(x, s) {
    var x;
    var s;
    var xs;
    var xst;
    var sst;
    xs = __type(x);
    if (xs === s) return x;
    xst = __storage(xs);
    if (s === ob) {
        if (xst === storage_int) return ____metaCast1(____metaApplyn(__homeFimpFun("intToOb_fun"), x), s);
        if (xst === storage_double) return ____metaCast1(____metaApplyn(__homeFimpFun("doubleToOb_fun"), x), s);
        return ____metaCast1(x, s);
    }
    if (xs === Literal) {
        if (s === fabl_int) return ____metaApplyn(__homeFimpFun("literalToInt_fun"), x);
        if (s === fabl_double) return ____metaApplyn(__homeFimpFun("literalToDouble_fun"), x);
        if (s === fabl_boolean) return ____metaApplyn(__homeFimpFun("literalToBoolean_fun"), x);
        if (s === fabl_string) return ____metaApplyn(__homeFimpFun("literalToString_fun"), x);
        {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "Illegal attempted cast from ");
            ____times(uwriteBuffer, xs);
            ____times(uwriteBuffer, " to ");
            ____times(uwriteBuffer, s);
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
    }
    if (s === Literal) {
        if (xst === storage_int) return ____metaCast1(____metaApplyn(__homeFimpFun("intToOb_fun"), x), s);
        if (xst === storage_double) return ____metaCast1(____metaApplyn(__homeFimpFun("doubleToOb_fun"), x), s);
        if (xs === fabl_string || xs === ob) return ____metaCast1(x, s);
        {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "Illegal attempted cast from ");
            ____times(uwriteBuffer, xs);
            ____times(uwriteBuffer, " to ");
            ____times(uwriteBuffer, s);
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
    }
    sst = __storage(s);
    if (xs === ob) {
        if (sst === storage_int) return ____metaCast1(____metaApplyn(__homeFimpFun("obToInt_fun"), x), s);
        if (sst === storage_double) return ____metaCast1(____metaApplyn(__homeFimpFun("obToDouble_fun"), x), s);
        return ____metaCast1(x, s);
    }
    if (xs === fabl_id || s === fabl_id) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Illegal attempted cast from ");
        ____times(uwriteBuffer, xs);
        ____times(uwriteBuffer, " to ");
        ____times(uwriteBuffer, s);
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    if (sst === xst) return ____metaCast1(x, s);
    {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Illegal attempted cast from ");
        ____times(uwriteBuffer, xs);
        ____times(uwriteBuffer, " to ");
        ____times(uwriteBuffer, s);
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
}