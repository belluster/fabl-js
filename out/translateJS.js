var jsg;

var jsLastLocalVars;

var translateJS;

var outputTypesToJS;

var closeStatementAfterNextXob;

var skipNextXob;

{
    jsg = "";
    jsLastLocalVars = "";
}

function __storeJS(fln) {
    var fln;
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Storing JS to file ");
        ____times(uwriteBuffer, fln);
        __tprint(uwriteBuffer);
        terpri();
    }
    ____writeToFile(fln, jsg);
}

function __translateId(x) {
    var x;
    var js;
    var xs;
    xs = "";
    ____times(xs, x);
    if (xs === "id" || xs === "void" || xs === "int" || xs === "string" || xs === "double" || xs === "boolean" || xs === "false" || xs === "true" || xs === "byte" || xs === "date") {
        js = "fabl_";
        ____times(js, xs);
    } else {
        js = xs;
    }
    return js;
}

function __translateBinding(binding) {
    var binding;
    var js;
    var k;
    var vk;
    var isdtp;
    var p;
    var btp;
    var vtp0;
    var ptp;
    var vtp;
    var tp0;
    var rg;
    var v;
    js = "";
    k = __bindingKey(binding);
    if (__obkind(k) === string_kind) ____times(js, k); else {
        tp0 = __type0(k);
        if (tp0 === Regarding) {
            rg = ____obsel(k, Regarding_value);
            if (__obkind(rg) === string_kind) ____times(js, __translateId(rg)); else {
                ____times(js, "<unprintable>");
                ____times(js, __obkind(rg));
            }
        } else if (tp0 === FunctionalProperty) {
            p = k;
            v = __bindingValue(binding);
            btp = ____obsel(binding, Binding_type);
            if (!btp || btp === ob) {
                ptp = __range(p);
                if (ptp) vtp = ptp;
            } else vtp = btp;
            if (!vtp) vtp = ob;
            vtp0 = __type0(v);
            if (!(vtp0 === ob)) {
                if (vtp === ob) vtp = vtp0; else vtp = __mostSpecific([ vtp0, vtp ]);
            }
            vk = __obkind(v);
            if (vk === double_kind) vtp = fabl_double;
            isdtp = __isString(v) || __isId(v) || vk === int_kind || vk === double_kind;
            ____addChar(js, ascii_squote);
            ____times(js, v);
            ____addChar(js, ascii_squote);
        } else {
            ____addChar(js, ascii_squote);
            ____times(js, "<unknown binding type>");
            ____times(js, __obkind(k));
            ____times(js, tp0);
            ____addChar(js, ascii_squote);
        }
    }
    return js;
}

function __translateThirdBinding(x) {
    var x;
    var js;
    var bn;
    var i;
    var ln;
    bn = __bindings(x);
    ln = __seqLength(bn);
    js = "";
    if (ln >= 3) {
        ____times(js, __translateBinding(bn[2]));
    } else {
        ____times(js, "only ");
        ____times(js, ln);
        ____times(js, " bindings");
        for (i = 0; i < ln; i++) {
            ____times(js, __translateBinding(bn[i]));
        }
    }
    return js;
}

function __translateConstant(xconstant) {
    var xconstant;
    var js;
    var bn;
    var b;
    var ck;
    var i;
    var ln;
    var dk;
    js = "";
    ck = __obkind(xconstant);
    if (!xconstant) {
        ____times(js, "null");
    } else if (ck === hashtable_kind) {
        ____times(js, __translateThirdBinding(xconstant));
    } else if (ck === binding_kind) {
        ____times(js, __translateBinding(xconstant));
    } else if (ck === double_kind) {
        ____times(js, xconstant);
    } else if (ck === int_kind) {
        ____times(js, xconstant);
    } else if (ck === string_kind) {
        ____addChar(js, ascii_squote);
        ____times(js, xconstant);
        ____addChar(js, ascii_squote);
    } else if (ck === seq_kind) {
        dk = __seqDataKind(xconstant);
        if (dk === seqDataOb_kind) {
            ____times(js, "seqDataOb_kind");
        } else if (dk === seqDataByte_kind) {
            ____addChar(js, ascii_squote);
            ____times(js, xconstant);
            ____addChar(js, ascii_squote);
        } else if (dk === seqDataShort_kind) {
            ____times(js, "seqDataShort_kind");
        } else if (dk === seqDataInt_kind) {
            ____times(js, "seqDataInt_kind");
        } else if (dk === seqDataDouble_kind) {
            ____times(js, "seqDataDouble_kind");
        } else {
            ____times(js, "<unknown seq kind>");
        }
    } else {
        ____times(js, "<Unhandled constant kind>: ");
        ____times(js, ck);
    }
    return js;
}

function __translateDeclarations(x) {
    var x;
    var js;
    var bt;
    var pid;
    var ptp;
    var ln;
    var i;
    var bb;
    var p0;
    js = "";
    bb = __bindings(x);
    if (bb) {
        ln = __seqLength(bb);
        for (i = 0; i < ln; i++) {
            p0 = bb[i];
            bt = ____obsel(p0, Binding_type);
            if (p0 && bt) {
                pid = __regardingValue(__bindingKey(p0));
                ptp = ____obsel(p0, Binding_type);
                if (outputTypesToJS) {
                    ____times(js, "/* ");
                    ____times(js, ptp);
                    ____times(js, "*/ ");
                }
                ____times(js, pid);
                if (i < ln - 1) ____times(js, ",");
            }
        }
    }
    return js;
}

function __translateLocalVariablesDeclaration(x) {
    var x;
    var js;
    var dcl;
    js = "";
    dcl = __translateDeclarations(x);
    if (__length(dcl) > 0) {
        ____times(js, "var ");
        ____times(js, dcl);
        ____times(js, ";");
    }
    return js;
}

function __decorateFunctionName(xfunction) {
    var xfunction;
    var nm;
    var pnm;
    var dnm;
    var tp;
    var itps;
    var ln;
    var i;
    nm = ____obsel(xfunction, Function_name);
    tp = ____obsel(xfunction, Function_type);
    itps = __inputTypes(tp);
    ln = __seqLength(itps);
    dnm = "";
    for (i = 0; i < ln; i++) {
        pnm = "";
        ____times(pnm, itps[i]);
        pnm = __________replaceChar(pnm, ascii_colon, ascii_underbar, 0, __length(pnm));
        pnm = __________replaceChar(pnm, ascii_lparen, ascii_underbar, 0, __length(pnm));
        pnm = __________replaceChar(pnm, ascii_rparen, ascii_underbar, 0, __length(pnm));
        ____times(dnm, pnm);
        ____times(dnm, "__");
    }
    ____times(dnm, nm);
    return dnm;
}

function __translateFunction(xfunction) {
    var xfunction;
    var js;
    var nm;
    var pid;
    var tp;
    var rtp;
    var ptp;
    var bb;
    var p0;
    tp = ____obsel(xfunction, Function_type);
    js = "";
    ____times(js, "function ");
    if (outputTypesToJS) {
        rtp = __resultType(tp);
        ____times(js, "/*");
        ____times(js, rtp);
        ____times(js, "*/ ");
    }
    ____times(js, __decorateFunctionName(xfunction));
    ____times(js, "(");
    ____times(js, __translateDeclarations(c_params));
    ____times(js, ")");
    return js;
}

function __translateReturn(xreturn) {
    var xreturn;
    var js;
    var vl;
    js = "return";
    vl = ____obsel(xreturn, Xreturn_value);
    if (vl) {
        ____times(js, " ");
        ____times(js, __translateXob(vl));
    }
    return js;
}

function __translateAssign(xassign) {
    var xassign;
    var js;
    var source;
    var dest;
    dest = ____obsel(xassign, Xassign_dest);
    source = ____obsel(xassign, Xassign_source);
    js = "";
    ____times(js, __translateXob(dest));
    ____times(js, "=");
    ____times(js, __translateXob(source));
    return js;
}

function __translateBlock(xblock) {
    var xblock;
    var js;
    var ls;
    var st;
    var i;
    var ln;
    var lv;
    js = "";
    ____times(js, "{");
    ____times(js, jsLastLocalVars);
    jsLastLocalVars = "";
    ls = ____obsel(xblock, Xblock_locals);
    if (ls) {
        ____times(js, __translateXob(ls));
    }
    st = ____obsel(xblock, Xblock_statements);
    ln = __seqLength(st);
    if (st && ln > 0) {
        for (i = 0; i < ln; i++) {
            if (!__isNulXob(st[i])) {
                closeStatementAfterNextXob = fabl_true;
                ____times(js, __translateXob(st[i]));
            }
        }
    }
    ____times(js, "}");
    return js;
}

function __funcname(xapply) {
    var xapply;
    var fns;
    var fnn;
    var fn;
    fns = "";
    if (xapply) {
        fn = ____obsel(xapply, Xapply_functionOf);
        if (fn && !__isBinding(fn)) {
            fnn = ____obsel(fn, Function_name);
            ____times(fns, fnn);
        }
    }
    return fns;
}

function ______translateUnaryOp(xapply, op, postfix) {
    var xapply;
    var op;
    var postfix;
    var js;
    var dst;
    var dt;
    var ln;
    var i;
    js = "";
    dst = ____obsel(xapply, Xapply_dest);
    if (dst) {
        ____times(js, __translateXob(dst));
        ____times(js, " = ");
    }
    dt = ____obsel(xapply, Xapply_arguments);
    ln = __seqLength(dt);
    if (dt && ln === 1) {
        if (!postfix) ____times(js, op);
        ____times(js, __translateXob(dt[0]));
        if (postfix) ____times(js, op);
    }
    return js;
}

function ____translateUnaryOp(xapply, op) {
    var xapply;
    var op;
    return ______translateUnaryOp(xapply, op, fabl_false);
}

function ______translateBinaryOp(xapply, op, enclosed) {
    var xapply;
    var op;
    var enclosed;
    var js;
    var dst;
    var dt;
    var ln;
    var i;
    js = "";
    dst = ____obsel(xapply, Xapply_dest);
    if (dst) {
        ____times(js, __translateXob(dst));
        ____times(js, " = ");
    }
    dt = ____obsel(xapply, Xapply_arguments);
    ln = __seqLength(dt);
    if (dt && ln === 2) {
        if (enclosed) ____times(js, "(");
        ____times(js, __translateXob(dt[0]));
        ____times(js, op);
        ____times(js, __translateXob(dt[1]));
        if (enclosed) ____times(js, ")");
    }
    return js;
}

function ____translateBinaryOp(xapply, op) {
    var xapply;
    var op;
    return ______translateBinaryOp(xapply, op, fabl_true);
}

function __translateMkStringBuf(xapply) {
    var xapply;
    var js;
    var dst;
    var dt;
    var ln;
    var i;
    js = "";
    dt = ____obsel(xapply, Xapply_arguments);
    ln = __seqLength(dt);
    if (dt && ln === 1) {
        ____times(js, __translateXob(dt[0]));
    }
    return js;
}

function __translateApply(xapply) {
    var xapply;
    var js;
    var fnn;
    var fn;
    var dst;
    var dt;
    var ln;
    var i;
    js = "";
    fn = ____obsel(xapply, Xapply_functionOf);
    fnn = __funcname(xapply);
    if (fnn && __length(fnn) > 0) {
        if (fnn === "equal") return ____translateBinaryOp(xapply, "===");
        if (fnn === "not") return ____translateUnaryOp(xapply, "!");
        if (fnn === "and") return ____translateBinaryOp(xapply, "&&");
        if (fnn === "or") return ____translateBinaryOp(xapply, "||");
        if (fnn === "greaterp") return ____translateBinaryOp(xapply, ">");
        if (fnn === "geq") return ____translateBinaryOp(xapply, ">=");
        if (fnn === "lessp") return ____translateBinaryOp(xapply, "<");
        if (fnn === "leq") return ____translateBinaryOp(xapply, "<=");
        if (fnn === "mod") return ____translateBinaryOp(xapply, "%");
        if (fnn === "plus") return ____translateBinaryOp(xapply, "+");
        if (fnn === "difference") return ____translateBinaryOp(xapply, "-");
        if (fnn === "plus_plus") return ______translateUnaryOp(xapply, "++", fabl_true);
        if (fnn === "minus_minus") return ______translateUnaryOp(xapply, "--", fabl_true);
        if (fnn === "unary_minus") return ____translateUnaryOp(xapply, "-");
        if (fnn === "nnul") return ____translateUnaryOp(xapply, "");
        if (fnn === "nul") return ____translateUnaryOp(xapply, "!");
        if (fnn === "mkStringBuf") return __translateMkStringBuf(xapply);
        if (fnn === "copyStringConst") return "";
        dst = ____obsel(xapply, Xapply_dest);
        if (dst) {
            ____times(js, __translateXob(dst));
            ____times(js, " = ");
        }
        ____times(js, __decorateFunctionName(fn));
        ____times(js, "(");
        dt = ____obsel(xapply, Xapply_arguments);
        ln = __seqLength(dt);
        if (dt && ln > 0) {
            for (i = 0; i < ln - 1; i++) {
                ____times(js, __translateXob(dt[i]));
                ____times(js, ",");
            }
            ____times(js, __translateXob(dt[ln - 1]));
        }
        ____times(js, ")");
    }
    return js;
}

function __translateFor(xfor) {
    var xfor;
    var js;
    var init;
    var test;
    var incr;
    var body;
    init = ____obsel(xfor, Xfor_init);
    test = ____obsel(xfor, Xfor_test);
    incr = ____obsel(xfor, Xfor_incr);
    body = ____obsel(xfor, Xfor_body);
    js = "for(";
    ____times(js, __translateXob(init));
    ____times(js, ";");
    ____times(js, __translateXob(test));
    ____times(js, ";");
    ____times(js, __translateXob(incr));
    ____times(js, ") ");
    closeStatementAfterNextXob = fabl_true;
    ____times(js, __translateXob(body));
    return js;
}

function __translateWhile(xwhile) {
    var xwhile;
    var js;
    var test;
    var body;
    test = ____obsel(xwhile, Xwhile_test);
    body = ____obsel(xwhile, Xwhile_body);
    js = "while(";
    ____times(js, __translateXob(test));
    ____times(js, ") ");
    closeStatementAfterNextXob = fabl_true;
    ____times(js, __translateXob(body));
    return js;
}

function __translateIf(xif) {
    var xif;
    var js;
    var iff;
    js = "";
    ____times(js, "if(");
    ____times(js, __translateXob(____obsel(xif, Xif_condition)));
    ____times(js, ") ");
    closeStatementAfterNextXob = fabl_true;
    ____times(js, __translateXob(____obsel(xif, Xif_ifTrue)));
    iff = ____obsel(xif, Xif_ifFalse);
    if (iff) {
        ____times(js, " else ");
        closeStatementAfterNextXob = fabl_true;
        ____times(js, __translateXob(iff));
    }
    return js;
}

function __translateSequence(xsequence) {
    var xsequence;
    var js;
    var args;
    var i;
    var ln;
    args = ____obsel(xsequence, Xsequence_arguments);
    js = "";
    ln = __seqLength(args);
    ____times(js, "[");
    for (i = 0; i < ln; i++) {
        ____times(js, __translateXob(args[i]));
        if (i < ln - 1) ____times(js, ",");
    }
    ____times(js, "]");
    return js;
}

function __translateSelectIndex(xselectindex) {
    var xselectindex;
    var js;
    var args;
    var i;
    var ln;
    var src;
    var sl;
    src = ____obsel(xselectindex, XselectIndex_source);
    sl = ____obsel(xselectindex, XselectIndex_selector);
    js = __translateXob(src);
    ____times(js, "[");
    ____times(js, __translateXob(sl));
    ____times(js, "]");
    return js;
}

function __translateSelectProperty(xselectproperty) {
    var xselectproperty;
    var js;
    var src;
    var prp;
    src = ____obsel(xselectproperty, XselectProperty_source);
    prp = ____obsel(xselectproperty, XselectProperty_selector);
    js = __translateXob(src);
    ____times(js, "[");
    ____addChar(js, ascii_squote);
    ____times(js, prp);
    ____addChar(js, ascii_squote);
    ____times(js, "]");
    return js;
}

function __translateCast(xcast) {
    var xcast;
    var js;
    var cv;
    cv = ____obsel(xcast, Xcast_castee);
    js = __translateXob(cv);
    return js;
}

function __translateXob(x) {
    var x;
    var js;
    var lv;
    var closeStatement;
    if (skipNextXob === fabl_true) {
        skipNextXob = fabl_false;
        return "";
    }
    closeStatement = fabl_false;
    if (closeStatementAfterNextXob) {
        closeStatementAfterNextXob = fabl_false;
        closeStatement = fabl_true;
    }
    js = "";
    if (__isNulXob(x)) ____times(js, "null"); else if (__isConstant(x)) ____times(js, __translateConstant(x)); else if (__isFunction(x)) ____times(js, __translateFunction(x)); else if (__isBinding(x)) ____times(js, __translateBinding(x)); else if (____hasType(x, Xreturn)) ____times(js, __translateReturn(x)); else if (____hasType(x, Xassign)) ____times(js, __translateAssign(x)); else if (____hasType(x, Xblock)) ____times(js, __translateBlock(x)); else if (____hasType(x, Xapply)) ____times(js, __translateApply(x)); else if (____hasType(x, Xfor)) ____times(js, __translateFor(x)); else if (____hasType(x, Xwhile)) ____times(js, __translateWhile(x)); else if (____hasType(x, Xif)) ____times(js, __translateIf(x)); else if (____hasType(x, Xsequence)) ____times(js, __translateSequence(x)); else if (____hasType(x, XselectIndex)) ____times(js, __translateSelectIndex(x)); else if (____hasType(x, XselectProperty)) ____times(js, __translateSelectProperty(x)); else if (____hasType(x, Xcast)) ____times(js, __translateCast(x)); else if (____um_eq(____obsel(x, "rdf:type"), "rdfs:Resource")) {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "rdfs:Resource found => not translated to JS");
        __tprint(uwriteBuffer);
        terpri();
    } else {
        js = "<unknown Xob type>: ";
        ____times(js, ____obsel(x, "rdf:type"));
        ____times(js, ";");
    }
    if (closeStatement) {
        if (__isFunction(x) || ____hasType(x, Xblock) || ____hasType(x, Xif)) {} else {
            ____times(js, ";");
        }
    }
    return js;
}

function __translateToJS(x) {
    var x;
    var js;
    if (!jsg) {
        return "";
    }
    if (____hasType(x, Xapply) && __funcname(x) === "translateToJS") {
        return "";
    }
    closeStatementAfterNextXob = fabl_true;
    js = __translateXob(x);
    ____times(jsg, js);
    return js;
}

function __________translateToJS(x, nm, vl, s, local) {
    var x;
    var nm;
    var vl;
    var s;
    var local;
    var js;
    var sid;
    sid = __translateId(nm);
    if (____startsWith(sid, "anytemp_")) return "";
    if (s && __isFunctionType(s)) {
        skipNextXob = fabl_true;
        return "";
    }
    js = "var ";
    if (s && outputTypesToJS) {
        ____times(js, "/*");
        ____times(js, __obkind(s));
        ____times(js, "*/ ");
    }
    ____times(js, sid);
    if (vl && (!(__obkind(vl) === int_kind) || !(__ob_to_integer(vl) === 0)) && (!(__obkind(vl) === double_kind) || !(__toDouble(vl) === 0))) {
        ____times(js, "=");
        closeStatementAfterNextXob = fabl_true;
    } else {
        ____times(js, ";");
    }
    if (local) ____times(jsLastLocalVars, js); else ____times(jsg, js);
    return js;
}

function ____translateToJS(fln, storeToJS) {
    var fln;
    var storeToJS;
    var fnc;
    var fle;
    var fnn;
    var out;
    var x;
    var tp;
    var hp;
    var i;
    var n;
    var lastSlash;
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Translating ");
        ____times(uwriteBuffer, fln);
        __tprint(uwriteBuffer);
        terpri();
    }
    translateJS = fabl_true;
    __load(fln);
    translateJS = fabl_false;
    if (storeToJS) {
        lastSlash = ____findFromEnd(fln, ascii_slash);
        fle = __fileExtension(fln);
        fnn = ______substr(fln, lastSlash + 1, __length(fln) - __length(fle) - (lastSlash + 1) - 1);
        out = "../out/";
        ____times(out, fnn);
        ____times(out, ".js");
        __storeJS(out);
        resetJS();
    }
    return jsg;
}

function __translateToJS(fln) {
    var fln;
    return ____translateToJS(fln, fabl_true);
}