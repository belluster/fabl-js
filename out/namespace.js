function ____namespace(nm, uri) {
    var nm;
    var uri;
    var nms;
    var nmv;
    var inv;
    nmv = __uriToResource(uri);
    ________bindConstant(home, nm, nmv, ob);
    inv = ____globalValue(home, "inverseNamespaces");
    if (!inv) {
        inv = mkResource();
        ________bindGlobal(home, "inverseNamespaces", inv, ob);
    }
    ________set(inv, __regarding(nmv), nm, ob);
}

function __namespacePrefix(x) {
    var x;
    var inv;
    inv = ____globalValue(home, "inverseNamespaces");
    if (!inv) return null;
    return ____get(inv, __regarding(x));
}

function ____namespace(nm, uri) {
    var nm;
    var uri;
    ____namespace(__toId(nm), uri);
}

function __aboutNamespace(nm) {
    var nm;
    var ns;
    var dfb;
    var ln;
    var i;
    ns = __namespace(nm);
    if (!ns) {
        {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "Namespace {nm} is undefined");
            __tprint(uwriteBuffer);
            terpri();
        }
        return;
    }
    dfb = ____mget(ns, isDefinedByP);
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Namespace {nm} : {uri(ns)}");
        __tprint(uwriteBuffer);
        terpri();
    }
    if (!dfb) {
        terpri();
        return;
    }
    ln = __seqLength(dfb);
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "  isDefinedBy: ");
        __tprint(uwriteBuffer);
    }
    for (i = 0; i < ln; i++) {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, __uri(dfb[i]));
        ____times(uwriteBuffer, " ");
        __tprint(uwriteBuffer);
    }
    terpri();
}

function ____qualifiedName(rs, x) {
    var rs;
    var x;
    var pr;
    var pfx;
    pr = __parent(x);
    if (!pr) return fabl_false;
    pfx = __namespacePrefix(pr);
    if (!pfx) return fabl_false;
    ____times(rs, pfx);
    ____times(rs, ":");
    ____times(rs, __name(x));
    return fabl_true;
}

var qualifiedNameBuf = "";

function __qualifiedName(x) {
    var x;
    __reset(qualifiedNameBuf);
    if (____qualifiedName(qualifiedNameBuf, x)) return __copy(qualifiedNameBuf);
    return null;
}

var rdfns = "http://www.w3.org/1999/02/22-rdf-syntax-ns#";

var rdfsns = "http://www.w3.org/2000/01/rdf-schema#";

var xsdns = "http://www.w3.org/2000/10/XMLSchema#";

var owlns = "http://www.w3.org/2002/07/owl#";

var fablns = "http://nurl.org/0/fabl/";

var fimpns = "http://nurl.org/0/fimp/";

rangeProperty = __uriToResource(rdfsns + "range");

function __range(p) {
    var p;
    var r;
    r = ____get(p, rangeProperty);
    if (__obkind(r) === values_kind) return __mostSpecific(r);
    return r;
}

function __namespace(pr) {
    var pr;
    var b;
    var vl;
    var vlk;
    if (pr === "home") return home;
    b = ____selectBinding(homePath(), pr);
    if (!b) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "No such namespace: ");
        ____times(uwriteBuffer, pr);
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    if (!__isConstant(b)) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Not a namespace: ");
        ____times(uwriteBuffer, pr);
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    vl = __bindingValue(b);
    vlk = __obkind(vl);
    if (!(vlk === hashtable_kind || vlk === smallob_kind)) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Not a namespace: ");
        ____times(uwriteBuffer, pr);
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    return vl;
}

function __namespace(pr) {
    var pr;
    return __namespace(__toId(pr));
}

function ____evalQname(pr, lc) {
    var pr;
    var lc;
    var ns;
    var rs;
    ns = __namespace(pr);
    rs = ____selectUri(ns, lc);
    if (!rs) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, lc);
        ____times(uwriteBuffer, " not found in namespace ");
        ____times(uwriteBuffer, ns);
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    return __getEquivalent(rs);
}

function __evalQname(x) {
    var x;
    var e1;
    var e2;
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
    return ____evalQname(e1, e2);
}

function ____evalQnameN(pr, lc) {
    var pr;
    var lc;
    var ns;
    var rs;
    var cb;
    var k;
    ns = __namespace(pr);
    rs = ____selectUri(ns, lc);
    if (!rs) return null;
    return __getEquivalent(rs);
}

function __evalQnameN(x) {
    var x;
    var e1;
    var e2;
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
    return ____evalQnameN(e1, e2);
}

function __toProperty(pr) {
    var pr;
    var cb;
    cb = ____selectBinding(homePath(), pr);
    if (!cb) return null;
    if (!__isConstant(cb)) return null;
    if (!____um_eq(____obsel(cb, Binding_type), Property)) return null;
    return __bindingValue(cb);
}

function __isQname(x) {
    var x;
    var lc;
    var pr;
    if (!__isList(x)) return fabl_false;
    if (____um_eq(__car(x), "_colon_")) {
        pr = __cadr(x);
        lc = __caddr(x);
        return __isId(pr) && __isId(lc);
    }
    return fabl_false;
}

function __toProperty(x) {
    var x;
    return __evalQname(x);
}

function __parseQname(s) {
    var s;
    var clp;
    clp = ____find(s, ascii_colon);
    if (clp < 0) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, s);
        ____times(uwriteBuffer, " does not have the right form (prefix:localpart) for a qualified name");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    if (____find(s, ascii_slash) > 0) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, s);
        ____times(uwriteBuffer, " does not have the right form (prefix:localpart) for a qualified name");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    return ____cons("_colon_", ____cons(__toString(______substring(s, 0, clp)), ____cons(__toString(______substring(s, clp + 1, __length(s))), null)));
}

function __toUri(s) {
    var s;
    var prs;
    var pr;
    var lc;
    var nm;
    var u;
    var ln;
    var lstc;
    prs = __parseQname(s);
    pr = __cadr(prs);
    lc = __caddr(prs);
    nm = __namespace(pr);
    u = __uri(nm);
    ln = __length(u);
    lstc = u[ln - 1];
    if (lstc === ascii_sharp) {
        ____times(u, lc);
        return u;
    } else {
        ____times(u, "/");
        ____times(u, lc);
        return u;
    }
}

function __newResource(s) {
    var s;
    var q;
    var ns;
    var rs;
    var pr;
    var lc;
    q = __parseQname(s);
    pr = __cadr(q);
    ns = __namespace(pr);
    lc = __caddr(q);
    if (__length(lc) === 0) return ns;
    rs = ____selectUri(ns, lc);
    if (rs) return __getEquivalent(rs);
    rs = mkResource();
    ______bindUri(ns, lc, rs);
    return rs;
}

function ____allocate(s, tp) {
    var s;
    var tp;
    var q;
    var ns;
    var rs;
    var pr;
    var lc;
    var cv;
    q = __parseQname(s);
    pr = __cadr(q);
    ns = __namespace(pr);
    lc = __caddr(q);
    if (__length(lc) === 0) return ns;
    cv = ____selectUri(ns, lc);
    if (!cv) {
        rs = __iNew(tp);
        ______bindUri(ns, lc, rs);
        return rs;
    } else {
        cv = __getEquivalent(cv);
        if (!____hasType(cv, tp)) {
            if (__untyped(cv)) {
                if (tp === FunctionalProperty) ____setType(cv, [ Property, FunctionalProperty ]); else ____setType(cv, tp);
            } else {
                beforeError();
                __reset(uwriteBuffer);
                ____times(uwriteBuffer, "Attempt to allocate a resource where one of a different type already exists: ");
                ____times(uwriteBuffer, s);
                __tprint(uwriteBuffer);
                terpri();
                afterError();
            }
        }
        return cv;
    }
}

function __allocate(s) {
    var s;
    return ____allocate(s, ob);
}

function __allocateProperty(s) {
    var s;
    return ____allocate(s, Property);
}

function ____getChild(x, s) {
    var x;
    var s;
    return ____selectUri(x, s);
}

function ____uriAllocate(s, tp) {
    var s;
    var tp;
    return ________uriToResource(root, s, fabl_true, tp);
}

function __uriAllocate(s) {
    var s;
    return ____uriAllocate(s, ob);
}

function ____isDefinedBy(u0, u1) {
    var u0;
    var u1;
    __resource(u0)["rdfs:isDefinedBy"] = __resource(u1);
}

function ____namespaceDefinedBy(ns, u0) {
    var ns;
    var u0;
    __namespace(u0)["rdfs:isDefinedBy"] = __resource(u0);
}

var stdlibPrefix = "http://fabl.net/lib/";

function stdNamespaces() {
    var rp;
    ____namespace("rdf", "http://www.w3.org/1999/02/22-rdf-syntax-ns#");
    ____namespace("rdfs", "http://www.w3.org/2000/01/rdf-schema#");
    ____namespace("xsd", "http://www.w3.org/2000/10/XMLSchema#");
    ____namespace("owl", "http://www.w3.org/2002/07/owl#");
    ____namespace("fabl", "http://nurl.org/0/fabl/");
    ____namespace("fimp", "http://nurl.org/0/fimp/");
    ____namespace("discovery", "http://fabl.net/vocabularies/discovery");
}

function fixPage0() {
    rangeProperty = ____uriAllocate("http://www.w3.org/2000/01/rdf-schema#subClassOf", Property);
    subClassOf = ____uriAllocate("http://www.w3.org/2000/01/rdf-schema#subClassOf", Property);
    FunctionalProperty = ____uriAllocate("http://www.w3.org/2002/07/owl#FunctionalProperty", Class);
    ____assertUriChildAsProperty(Xob1, "isNoop");
    ____assertUriChildAsProperty(Xob1, "isConstant");
    ____assertUriChildAsProperty(XselectProperty, "isBitField");
    ____assertUriChildAsProperty(Xreturn, "blockReturn");
    ____assertUriChildAsProperty(Xreturn, "loopBreak");
    ____assertUriChildAsProperty(Xreturn, "loopContinue");
    ____assertUriChildAsProperty(Xgo, "goIfFalse");
    ____assertUriChildAsProperty(Xblock, "isFunctionBody");
    ____assertUriChildAsProperty(Token, "isInfix");
    ____assertUriChildAsProperty(Token, "isPrefix");
    ____assertUriChildAsProperty(Token, "isPostfix");
    ____assertUriChildAsProperty(Token, "isTerminator");
    ____assertUriChildAsProperty(Token, "isOperator");
    ____assertUriChildAsProperty(Token, "isAtom");
    ____assertUriChildAsProperty(Token, "isKeyword");
    ____assertUriChildAsProperty(Token, "isNumber");
    ____assertUriChildAsProperty(Token, "isString");
    ____assertUriChildAsProperty(Token, "isId");
    rangeProperty = ____uriAllocate("http://www.w3.org/2000/01/rdf-schema#range", Property);
}