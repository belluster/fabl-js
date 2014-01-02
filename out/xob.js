var int_kind = 1;

var string_kind = 3;

var nstring_kind = 3;

var wstring_kind = 4;

var double_kind = 2;

var nil_kind = 4;

var ob_kind;

0;

var dblock_kind = 5;

var hashtable_kind = 16;

var compact_kind = 17;

var binding_kind = 18;

var smallob_kind = 19;

var pm_stack_kind = 23;

var seq_kind = 24;

var values_kind = 25;

var seqDataOb_kind = 8;

var seqDataByte_kind = 9;

var seqDataShort_kind = 10;

var seqDataInt_kind = 11;

var seqDataDouble_kind = 12;

var ob = Any;

function __isObject(x) {
    var x;
    return __obkind(x) > 15;
}

var typeP = ____selectUri(rdfNS, "type");

var typesInt = [ fabl_int ];

var typesDouble = [ fabl_double ];

var typesBinding = [ Binding ];

var typesNone = __mk_emptysequence("<unprintable>");

var typesString = [ fabl_id ];

function __SeqOf(s) {
    var s;
    return ____mkParamType("SeqOf", s);
}

function __BagOf(s) {
    var s;
    return ____mkParamType("BagOf", s);
}

function __AltOf(s) {
    var s;
    return ____mkParamType("AltOf", s);
}

var Bag = "rdf:Bag";

var Alt = "rdf:Alt";

var BagOfOb = __BagOf(ob);

var AltOfOb = __AltOf(ob);

var BagOfInt = __BagOf(fabl_int);

var AltOfInt = __AltOf(fabl_int);

var BagOfDouble = __BagOf(fabl_double);

var AltOfDouble = __AltOf(fabl_double);

function __isBinding(x) {
    var x;
    return __obkind(x) === binding_kind;
}

function __type(b) {
    var b;
    var rs;
    rs = ____obsel(b, Binding_type);
    if (!rs) rs = ob;
    return rs;
}

function __value(b) {
    var b;
    return ____obsel(b, Binding_value);
}

function __Xobish(x) {
    var x;
    if (__isObject(x)) return !(__isBinding(x) || __isFunction(x));
    return fabl_false;
}

function __Xobish(x) {
    var x;
    var xo;
    xo = x;
    if (__isObject(xo)) return !(__isBinding(xo) || __isFunction(xo));
    return fabl_false;
}

function ____equal(x, y) {
    var x;
    var y;
    return ____um_eq(x, y);
}

function __mkXob(tp) {
    var tp;
    var rs;
    rs = __iNew(Xob1);
    rs["[unnamed Property]"] = tp;
    return rs;
}

function mkNoopXob() {
    var rs;
    rs = __mkXob(fabl_void);
    ________bitset(rs, Xob1_booles, Xob1_isNoop, 1);
    return rs;
}

var storage_int = 1;

var storage_ob;

0;

var storage_double = 2;

function __storage(tp) {
    var tp;
    if (tp === fabl_int || tp === fabl_boolean || tp === fabl_byte) return storage_int;
    if (tp === fabl_double) return storage_double;
    return storage_ob;
}

function __nulValue(x) {
    var x;
    var s;
    s = __storage(x);
    if (s === storage_ob) return null;
    if (s === storage_int) return __integer_to_ob(0);
    return __toDoubleOb(0);
}

function ______assertDefaultValue(bn, nm, s) {
    var bn;
    var nm;
    var s;
    return ________set(bn, nm, __nulValue(s), s);
}

function ________bindLocal(bn, nm, vl, s) {
    var bn;
    var nm;
    var vl;
    var s;
    var rs;
    if (translateJS) __________translateToJS(bn, nm, vl, s, fabl_true);
    rs = ________set(bn, __regarding(nm), vl, s);
    ____setInDblock(rs, fabl_true);
    return rs;
}

function ______bindLocal(bn, nm, s) {
    var bn;
    var nm;
    var s;
    var rs;
    if (translateJS) __________translateToJS(bn, nm, __nulValue(s), s, fabl_true);
    rs = ________set(bn, __regarding(nm), __nulValue(s), s);
    ____setInDblock(rs, fabl_true);
    return rs;
}

function ________bindGlobal(x, nm, vl, s) {
    var x;
    var nm;
    var vl;
    var s;
    var gpr;
    gpr = __regarding(nm);
    if (translateJS) __________translateToJS(x, nm, vl, s, fabl_false);
    return ________set(x, gpr, vl, s);
}

function ______hasValueAndType(b, vl, s) {
    var b;
    var vl;
    var s;
    var bvl;
    var st;
    if (!(__type(b) === s)) return fabl_false;
    bvl = __value(b);
    st = __storage(s);
    if (st === storage_ob) return ____um_eq(bvl, vl);
    if (st === storage_int) return __ob_to_integer(bvl) === __ob_to_integer(vl);
    return __toDouble(bvl) === __toDouble(vl);
}

function ________bindConstant(x, nm, vl, s) {
    var x;
    var nm;
    var vl;
    var s;
    var gpr;
    var b;
    var cb;
    var ctp;
    gpr = __regarding(nm);
    cb = ____selectBinding(x, gpr);
    if (cb) {
        if (__isConstant(cb)) {
            if (______hasValueAndType(cb, vl, s)) return cb;
            {
                beforeError();
                __reset(uwriteBuffer);
                ____times(uwriteBuffer, "Cannot modify a constant: ");
                ____times(uwriteBuffer, nm);
                __tprint(uwriteBuffer);
                terpri();
                afterError();
            }
        } else {
            ctp = __type(cb);
            if (!ctp || ctp === ob) {
                if (!____um_eq(s, ctp)) ______obset(cb, Binding_type, s);
                ______set(x, gpr, vl);
                ____set_isConstant(cb, fabl_true);
            } else {
                beforeError();
                __reset(uwriteBuffer);
                ____times(uwriteBuffer, "Cannot modify type of ");
                ____times(uwriteBuffer, nm);
                __tprint(uwriteBuffer);
                terpri();
                afterError();
            }
        }
        return cb;
    }
    b = ________set(x, gpr, vl, s);
    if (b) ____set_isConstant(b, fabl_true); else {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Cannot bind as constant ");
        ____times(uwriteBuffer, nm);
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
}

function ______bindGlobal(x, nm, s) {
    var x;
    var nm;
    var s;
    return ________bindGlobal(x, nm, __nulValue(s), s);
}

function ____selectBinding(x, nm) {
    var x;
    var nm;
    var gpr;
    gpr = __regarding(nm);
    return ____selectBinding(x, gpr);
}

function ____selectGlobalBinding(x, nm) {
    var x;
    var nm;
    return ____selectBinding(x, nm);
}

function ____selectBinding(x, nm) {
    var x;
    var nm;
    var gpr;
    var ln;
    var i;
    var b;
    ln = __seqLength(x);
    gpr = __regarding(nm);
    for (i = ln - 1; i >= 0; i--) {
        b = ____selectBinding(x[i], gpr);
        if (b) return b;
    }
    return null;
}

function ____get(x, nm) {
    var x;
    var nm;
    return ____get(x, __regarding(nm));
}

function ____globalValue(cn, nm) {
    var cn;
    var nm;
    var b;
    b = ____selectBinding(cn, nm);
    if (!b) return null;
    return __bindingValue(b);
}

var regardingPath = __regarding("path");

function homePath() {
    var b;
    b = ____selectBinding(home, regardingPath);
    if (!b) return null;
    return __bindingValue(b);
}

var buildingFimp;

fabl_false;

var analyzingFunction;

fabl_false;

function homeFimp() {
    if (buildingFimp) return home; else return fimp;
}

var missingFimpFuns = __mk_emptysequence("<unprintable>");

function __homeFimpFun(nm) {
    var nm;
    var rs;
    var rnm;
    rnm = __regarding(nm);
    if (buildingFimp && analyzingFunction) {
        rs = ____get(home, rnm);
        if (!rs) {
            {
                __reset(uwriteBuffer);
                ____times(uwriteBuffer, "Warning: homeFimpFun missing function:");
                ____times(uwriteBuffer, nm);
                __tprint(uwriteBuffer);
                terpri();
            }
            ____seqobAdd(missingFimpFuns, nm);
            rs = ____get(fimp, rnm);
        }
    } else rs = ____get(fimp, rnm);
    return rs;
}

function __type(x) {
    var x;
    var k;
    k = __obkind(x);
    if (k === int_kind) return fabl_int;
    if (k === string_kind) return fabl_id;
    if (k === double_kind) return fabl_double;
    if (__isBinding(x)) return __type(x);
    if (__isFunction(x)) return ____obsel(x, Function_type);
    return ____obsel(x, Xob1_type);
}

function ____setParent(x, y) {
    var x;
    var y;
    if (__Xobish(x)) ______obset(x, Xob1_parent, y);
}

function __regarding(nm) {
    var nm;
    return __regarding(nm);
}

function __isId(x) {
    var x;
    var k;
    k = __obkind(x);
    return k === nstring_kind || k === wstring_kind;
}

function __isString(x) {
    var x;
    var k;
    var dk;
    k = __obkind(x);
    if (k === seq_kind) {
        dk = __seqDataKind(x);
        return dk === seqDataByte_kind;
    }
    return fabl_false;
}

function ____assertUriChildAsProperty(x, y) {
    var x;
    var y;
    var rs;
    rs = ____selectUri(x, y);
    ____setType(rs, Property);
    return rs;
}

function ____assertUriChildAsFunctionalProperty(x, y) {
    var x;
    var y;
    var rs;
    rs = ____selectUri(x, y);
    ____setType(rs, FunctionalProperty);
    return rs;
}