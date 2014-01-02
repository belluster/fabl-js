var uriTable;

var uriDels = [ ";", "/", "?", ":", "@", "&", "=", "+", "$", ",", "#", "." ];

function setupUriTable() {
    var ln;
    var i;
    var s;
    ln = __seqLength(uriDels);
    uriTable = __mk_emptysequence("<unprintable>");
    ____seqobExpand(uriTable, 256);
    for (i = 0; i < ln; i++) {
        s = uriDels[i];
        uriTable[____select(s, 0)] = s;
    }
}

setupUriTable();

var splitBuf = "";

function ____splitToIds(bf, dl) {
    var bf;
    var dl;
    var rs;
    var ln;
    var i;
    var c;
    rs = __mk_emptysequence("<unprintable>");
    ln = __length(bf);
    __reset(splitBuf);
    for (i = 0; i < ln; i++) {
        c = bf[i];
        if (c === dl) {
            ____seqobAdd(rs, __toString(splitBuf));
            __reset(splitBuf);
        } else ____addChar(splitBuf, c);
    }
    if (__length(splitBuf) > 0) ____seqobAdd(rs, __toString(splitBuf));
    return rs;
}

var ascii_sharp = 35;

function __parseUri1(bf) {
    var bf;
    var rs;
    var ln;
    var i;
    var c;
    var nfnd;
    rs = __mk_emptysequence("<unprintable>");
    ln = __length(bf);
    __reset(splitBuf);
    nfnd = fabl_true;
    while (i < ln && nfnd) {
        c = bf[i];
        if (c === ascii_colon || c === ascii_slash) {
            ____seqobAdd(rs, __toString(splitBuf));
            nfnd = fabl_false;
            if (c === ascii_colon) {
                if (__length(splitBuf) === 0) {
                    beforeError();
                    __reset(uwriteBuffer);
                    ____times(uwriteBuffer, "nul scheme in uri: ");
                    ____times(uwriteBuffer, bf);
                    __tprint(uwriteBuffer);
                    terpri();
                    afterError();
                }
                ____seqobAdd(rs, ":");
                if (i + 3 > ln && bf[i + 1] === ascii_slash && bf[i + 2] === ascii_slash) i = i + 2;
            }
            __reset(splitBuf);
        } else ____addChar(splitBuf, c);
        i = i + 1;
    }
    nfnd = fabl_true;
    while (i < ln) {
        c = bf[i];
        if (c === ascii_sharp || c === ascii_slash) {
            ____seqobAdd(rs, __toString(splitBuf));
            __reset(splitBuf);
            if (c === ascii_sharp) ____seqobAdd(rs, "#");
        } else ____addChar(splitBuf, c);
        i = i + 1;
    }
    if (__length(splitBuf) > 0) ____seqobAdd(rs, __toString(splitBuf));
    return rs;
}

function __removeNullStringsEx1(s) {
    var s;
    var ln;
    var i;
    var rs;
    var cs;
    rs = __mk_emptysequence("<unprintable>");
    ln = __seqLength(s);
    if (ln === 0) return s;
    ____seqobAdd(rs, s[0]);
    for (i = 1; i < ln; i++) {
        cs = s[i];
        if (__length(cs) > 0 || i === 4 && s[0] === "file" && s[1] === ":" && s[2] === "" && s[3] === "") ____seqobAdd(rs, cs);
    }
    return rs;
}

function __parseUri(bf) {
    var bf;
    return __removeNullStringsEx1(__parseUri1(bf));
}

function __untyped(x) {
    var x;
    var tp;
    var tpk;
    var lnt;
    var tpsq;
    tp = __iType(x);
    tpk = __obkind(tp);
    if (tpk === values_kind) {
        tpsq = tp;
        lnt = __seqLength(tpsq);
        if (lnt === 0) return fabl_true;
        if (lnt === 1) return ____um_eq(tpsq[0], Resource);
        return fabl_false;
    }
    return !tp || ____um_eq(tp, Resource);
}

function ____installType(x, srt) {
    var x;
    var srt;
    ______iInstall(ob, srt, fabl_false);
}

var equivalents = __iNew("rdfs:Resource");

function ____addEquivalent(x, rep) {
    var x;
    var rep;
    ______set(equivalents, __regarding(x), rep);
}

var internToEquivalents = fabl_true;

function __getEquivalent(x) {
    var x;
    var rs;
    if (!internToEquivalents) return x;
    rs = ____get(equivalents, __regarding(x));
    if (!rs) return x;
    return rs;
}

function stdEquivalents() {
    var rdfProperty;
    rdfProperty = ____evalQname("rdf", "Property");
    ____addEquivalent(____evalQname("owl", "Class"), ____evalQname("rdfs", "Class"));
    ____addEquivalent(____evalQname("owl", "DatatypeProperty"), rdfProperty);
    ____addEquivalent(____evalQname("owl", "ObjectProperty"), rdfProperty);
    ____addEquivalent(____evalQname("owl", "Thing"), ____evalQname("rdfs", "Resource"));
    ____addEquivalent(__resource(), ____evalQname("xsd", "string"));
}

function ________uriToResource(rt, bf, alloc, srt) {
    var rt;
    var bf;
    var alloc;
    var srt;
    var prs;
    var cprs;
    var ln;
    var i;
    var cv;
    var nv;
    prs = __parseUri(bf);
    ln = __seqLength(prs);
    cv = rt;
    for (i = 0; i < ln; i++) {
        cprs = prs[i];
        nv = ____selectUri(cv, cprs);
        if (!nv) {
            if (!alloc) return null;
            if (i === ln - 1) nv = __iNew(srt); else nv = mkObject();
            ______bindUri(cv, cprs, nv);
        }
        cv = nv;
    }
    cv = __getEquivalent(cv);
    if (!____hasType(cv, srt)) {
        if (__untyped(cv)) ____setType(cv, srt); else ____installType(cv, srt);
    }
    return cv;
}

function ______uriToResource(rt, bf, alloc) {
    var rt;
    var bf;
    var alloc;
    return ________uriToResource(rt, bf, alloc, ob);
}

function ____uriToResource(bf, alloc) {
    var bf;
    var alloc;
    return ______uriToResource(root, bf, alloc);
}

function __uriToResource(bf) {
    var bf;
    return ____uriToResource(bf, fabl_true);
}

function __resource(bf) {
    var bf;
    return ____uriToResource(bf, fabl_true);
}

function __reversip(sq) {
    var sq;
    var ln;
    var hln;
    var ln1;
    var i;
    var hi;
    var v;
    ln = __seqLength(sq);
    hln = ____quotient(ln, 2);
    ln1 = ln - 1;
    for (i = 0; i < hln; i++) {
        hi = ln1 - i;
        v = sq[i];
        sq[i] = sq[hi];
        sq[hi] = v;
    }
}

function __uriPath(x) {
    var x;
    var rs;
    var cx;
    var pr;
    rs = __mk_emptysequence("<unprintable>");
    cx = x;
    while (fabl_true) {
        if (____um_eq(cx, root)) {
            __reversip(rs);
            return rs;
        }
        pr = __parent(cx);
        if (!pr) return null;
        ____seqobAdd(rs, __name(cx));
        cx = pr;
    }
}

function __uriPathToUri(pth) {
    var pth;
    var rs;
    var ln;
    var i;
    var cp;
    var hasfrag;
    hasfrag = fabl_false;
    rs = "";
    ln = __seqLength(pth);
    if (__seqLength(pth) < 3 || !(pth[1] === ":")) return;
    ____times(rs, pth[0]);
    ____times(rs, "://");
    for (i = 2; i < ln; i++) {
        cp = pth[i];
        if (cp === "#") {
            ____seqSetLength(rs, __length(rs) - 1);
            ____times(rs, "#");
            if (i < ln - 1) hasfrag = fabl_true;
        } else {
            ____times(rs, cp);
            if (i < ln - 1) ____times(rs, "/");
        }
    }
    return rs;
}

function __uri(x) {
    var x;
    var pth;
    pth = __uriPath(x);
    if (!pth) return null;
    return __uriPathToUri(pth);
}