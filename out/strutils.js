function ____arrayRef(s, n) {
    var s;
    var n;
    return ____select(s, n);
}

function ____arrayRef(s, n) {
    var s;
    var n;
    return ____select(s, n);
}

var ascii_space = 32;

var ascii_plus = 43;

var ascii_minus = 45;

var ascii_star = 42;

var ascii_rparen = 41;

var ascii_lparen = 40;

var ascii_rbracket = 93;

var ascii_lbracket = 91;

var ascii_dot = 46;

var ascii_rcurly = 125;

var ascii_lcurly = 123;

var ascii_equal = 61;

var ascii_twiddle = 126;

var ascii_lessp = 60;

var ascii_greaterp = 62;

var ascii_comma = 44;

var ascii_minus = 45;

var ascii_slash = 47;

var ascii_vbar = 124;

var ascii_lf = 10;

var ascii_ampersand = 38;

var ascii_percent = 37;

var ascii_semicolon = 59;

var ascii_squote = 39;

var ascii_dquote = 34;

var ascii_colon = 58;

var ascii_underbar = 95;

var ascii_backslash = 92;

var ascii_bang = 33;

var ascii_e = 101;

var ascii_E = 69;

var ascii_n = 110;

var ascii_r = 114;

var ascii_t = 116;

var ascii_u = 117;

var ascii_x = 120;

var ascii_T = 84;

function ____equal(a, b) {
    var a;
    var b;
    return a === b;
}

function ____find(s, c) {
    var s;
    var c;
    var ln;
    var i;
    ln = __length(s);
    for (i = 0; i < ln; i++) {
        if (____select(s, i) === c) return i;
    }
    return -1;
}

function ______find(s, c, sp) {
    var s;
    var c;
    var sp;
    var ln;
    var i;
    ln = __length(s);
    for (i = sp; i < ln; i++) {
        if (____select(s, i) === c) return i;
    }
    return -1;
}

function ____findFromEnd(s, c) {
    var s;
    var c;
    var ci;
    var ln;
    var i;
    ln = __length(s);
    ci = c;
    for (i = ln - 1; i >= 0; i--) {
        if (____select(s, i) === ci) return i;
    }
    return -1;
}

function ______findFromEnd(s, c, startat) {
    var s;
    var c;
    var startat;
    var i;
    var ci;
    ci = c;
    for (i = startat; i >= 0; i--) {
        if (____select(s, i) === ci) return i;
    }
    return -1;
}

var temp_stringbuf = "";

function ______substr(s, ilb, iln) {
    var s;
    var ilb;
    var iln;
    var lb;
    var ub;
    var ln;
    var rs;
    if (ilb < 0) lb = 0; else lb = ilb;
    ln = __length(s);
    ub = lb + iln;
    if (ub > ln) ub = ln;
    rs = ub - lb;
    ________select(rs, s, lb, ub - 1);
    return rs;
}

function ____substr(s, ilb) {
    var s;
    var ilb;
    return ______substr(s, ilb, __length(s));
}

function ______slice(s, ilb, iub) {
    var s;
    var ilb;
    var iub;
    var lb;
    var ub;
    var ln;
    var rln;
    var rs;
    if (ilb < 0) lb = 0; else lb = ilb;
    ln = __length(s);
    if (iub > ln) ub = ln; else ub = iub;
    if (ub <= lb) return "";
    rln = ub - lb;
    rs = rln;
    ________select(rs, s, lb, ub - 1);
    return rs;
}

function ________slice(rs, s, ilb, iub) {
    var rs;
    var s;
    var ilb;
    var iub;
    var lb;
    var ub;
    var ln;
    var rln;
    if (ilb < 0) lb = 0; else lb = ilb;
    ln = __length(s);
    if (iub > ln) ub = ln; else ub = iub;
    if (ub <= lb) {
        ____times(rs, s);
        return;
    }
    rln = ub - lb;
    ________select(rs, s, lb, ub - 1);
}

function ______substring(s, ilb, iub) {
    var s;
    var ilb;
    var iub;
    var lb;
    var ub;
    if (ilb > iub) {
        lb = iub;
        ub = ilb;
    } else {
        lb = ilb;
        ub = iub;
    }
    return ______slice(s, lb, ub);
}

function ______select(s, lb, ub) {
    var s;
    var lb;
    var ub;
    var rs;
    rs = 1 + ub - lb;
    ________select(rs, s, lb, ub);
    return rs;
}

function ______substringS(s, ilb, iub) {
    var s;
    var ilb;
    var iub;
    var lb;
    var ub;
    if (ilb > iub) {
        lb = iub;
        ub = ilb;
    } else {
        lb = ilb;
        ub = iub;
    }
    __reset(temp_stringbuf);
    ________select(temp_stringbuf, s, lb, ub - 1);
    return __toString(temp_stringbuf);
}

function ____afterLast(s, c) {
    var s;
    var c;
    var fs;
    fs = ____findFromEnd(s, c);
    if (fs < 0) return s; else return ______substring(s, fs + 1, __length(s));
}

function ____afterLastS(s, c) {
    var s;
    var c;
    var fs;
    fs = ____findFromEnd(s, c);
    if (fs < 0) return __toString(s); else return ______substringS(s, fs + 1, __length(s));
}

function __afterLastDotS(s) {
    var s;
    return ____afterLastS(s, ascii_dot);
}

function ______find(cnx, cny, sp) {
    var cnx;
    var cny;
    var sp;
    var lnx;
    var lny;
    var mp;
    var mi;
    var dn;
    var fnd;
    lny = __length(cny);
    if (lny === 1) return ______find(cnx, cny[0], sp);
    lnx = __length(cnx);
    mp = sp;
    mi = -1;
    fnd = fabl_false;
    dn = fabl_false;
    while (!dn) {
        if (mi === lny - 1) {
            fnd = fabl_true;
            dn = fabl_true;
        } else if (mp + mi === lnx - 1) {
            fnd = fabl_false;
            dn = fabl_true;
        } else {
            mi = mi + 1;
            if (!(____select(cnx, mp + mi) === ____select(cny, mi))) {
                mp = mp + 1;
                mi = -1;
            }
        }
    }
    if (fnd) return mp; else return -1;
}

function ____find(cnx, cny) {
    var cnx;
    var cny;
    return ______find(cnx, cny, 0);
}

function ________findFromEnd(cnx, cny, sp, nosp) {
    var cnx;
    var cny;
    var sp;
    var nosp;
    var lnx;
    var lny;
    var lnxmlny;
    var mp;
    var mi;
    var dn;
    var fnd;
    lny = __length(cny);
    if (lny === 1) return ______findFromEnd(cnx, cny[0], sp);
    lnx = __length(cnx);
    lnxmlny = lnx - lny;
    if (nosp) mp = lnxmlny; else if (lnxmlny < sp) mp = lnxmlny; else mp = sp;
    mi = -1;
    fnd = fabl_false;
    dn = fabl_false;
    while (!dn) {
        if (mi === lny - 1) {
            fnd = fabl_true;
            dn = fabl_true;
        } else if (mp < 0) {
            fnd = fabl_false;
            dn = fabl_true;
        } else {
            mi = mi + 1;
            if (!(____select(cnx, mp + mi) === ____select(cny, mi))) {
                mp = mp - 1;
                mi = -1;
            }
        }
    }
    if (fnd) return mp; else return -1;
}

function ______findFromEnd(cnx, cny, sp) {
    var cnx;
    var cny;
    var sp;
    return ________findFromEnd(cnx, cny, sp, fabl_false);
}

function ____findFromEnd(cnx, cny) {
    var cnx;
    var cny;
    return ________findFromEnd(cnx, cny, 0, fabl_true);
}

function ____indexOf(cnx, cny) {
    var cnx;
    var cny;
    return ______find(cnx, cny, 0);
}

function ____indexOf(cnx, cny) {
    var cnx;
    var cny;
    return ______find(cnx, cny, 0);
}

function ______indexOf(cnx, cny, n) {
    var cnx;
    var cny;
    var n;
    return ______find(cnx, cny, n);
}

function ______indexOf(cnx, cny, n) {
    var cnx;
    var cny;
    var n;
    return ______find(cnx, cny, n);
}

function ______lastIndexOf(cnx, cny, sp) {
    var cnx;
    var cny;
    var sp;
    return ________findFromEnd(cnx, cny, sp, fabl_false);
}

function ____lastIndexOf(cnx, cny) {
    var cnx;
    var cny;
    return ________findFromEnd(cnx, cny, 0, fabl_true);
}

function ____lastIndexOf(cnx, cny) {
    var cnx;
    var cny;
    return ____findFromEnd(cnx, cny);
}

function ____startsWith(cnx, cny) {
    var cnx;
    var cny;
    var lnx;
    var lny;
    var i;
    var oksf;
    lnx = __length(cnx);
    lny = __length(cny);
    if (lny > lnx) return fabl_false;
    oksf = fabl_true;
    for (i = 0; i < lny; i++) {
        if (!(____select(cnx, i) === ____select(cny, i))) return fabl_false;
    }
    return fabl_true;
}

function ____endsIn(cnx, cny) {
    var cnx;
    var cny;
    var lnx;
    var lny;
    var i;
    var sp;
    var oksf;
    lnx = __length(cnx);
    lny = __length(cny);
    if (lny > lnx) return fabl_false;
    oksf = fabl_true;
    sp = lnx - lny;
    for (i = sp; i < lnx; i++) {
        if (!(____select(cnx, i) === ____select(cny, i - sp))) return fabl_false;
    }
    return fabl_true;
}

function ____plus(a, b) {
    var a;
    var b;
    var rs;
    rs = a;
    ____times(rs, b);
    return __toString(rs);
}

function ____split(s, delim) {
    var s;
    var delim;
    var ln;
    var i;
    var c;
    var cbf;
    var rs;
    rs = __mk_emptysequence("<unprintable>");
    ln = __length(s);
    cbf = "";
    for (i = 0; i < ln; i++) {
        c = s[i];
        if (c === delim) {
            ____seqobAdd(rs, cbf);
            cbf = "";
        } else ____addChar(cbf, c);
    }
    ____seqobAdd(rs, cbf);
    return rs;
}

function ______matchesAt(buf, p, s) {
    var buf;
    var p;
    var s;
    var cc;
    var i;
    var ln;
    i = 0;
    ln = __length(s);
    if (p + ln > __length(buf)) return fabl_false;
    while (i < ln) {
        cc = buf[p + i];
        if (cc === s[i]) i++; else return fabl_false;
    }
    return fabl_true;
}

function ____split(s, dl) {
    var s;
    var dl;
    var ln;
    var lnd;
    var dl0;
    var i;
    var c;
    var cbf;
    var rs;
    rs = __mk_emptysequence("<unprintable>");
    lnd = __length(dl);
    if (lnd === 0) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "attempt to split on an empty delimiter");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    dl0 = dl[0];
    if (lnd === 1) return ____split(s, dl0);
    ln = __length(s);
    cbf = "";
    while (i < ln) {
        c = s[i];
        if (c === dl0 && ______matchesAt(s, i, dl)) {
            ____seqobAdd(rs, cbf);
            i = i + lnd;
            cbf = "";
        } else {
            ____addChar(cbf, c);
            i = i + 1;
        }
    }
    if (__length(cbf) > 0) ____seqobAdd(rs, cbf);
    return rs;
}

function ____implode(glue, pieces) {
    var glue;
    var pieces;
    var ln;
    var i;
    var lnm1;
    var rs;
    ln = __seqLength(pieces);
    lnm1 = ln - 1;
    rs = "";
    for (i = 0; i < ln; i++) {
        ____times(rs, pieces[i]);
        if (i < lnm1) ____times(rs, glue);
    }
    return rs;
}

function ____________replaceChar(rs, s, fc, tc, lb, ub) {
    var rs;
    var s;
    var fc;
    var tc;
    var lb;
    var ub;
    var ln;
    var i;
    var cc;
    ln = __length(s);
    if (lb < 0 || lb > ub || ub > ln) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Bad inputs to replaceChar");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    ________select(rs, s, 0, lb - 1);
    for (i = lb; i < ub; i++) {
        cc = s[i];
        if (cc === fc) ____addChar(rs, tc); else ____addChar(rs, cc);
    }
    ________select(rs, s, ub, ln - 1);
}

function __________replaceChar(s, fc, tc, lb, ub) {
    var s;
    var fc;
    var tc;
    var lb;
    var ub;
    var rs;
    rs = __length(s);
    ____________replaceChar(rs, s, fc, tc, lb, ub);
    return rs;
}

function ____________replaceChar(rs, s, fc, ts, lb, ub) {
    var rs;
    var s;
    var fc;
    var ts;
    var lb;
    var ub;
    var ln;
    var i;
    var cc;
    ln = __length(s);
    if (lb < 0 || lb > ub || ub > ln) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Bad inputs to replaceChar");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    ________select(rs, s, 0, lb - 1);
    for (i = lb; i < ub; i++) {
        cc = s[i];
        if (cc === fc) ____times(rs, ts); else ____addChar(rs, cc);
    }
    ________select(rs, s, ub, ln - 1);
}

function __________replaceChar(s, fc, ts, lb, ub) {
    var s;
    var fc;
    var ts;
    var lb;
    var ub;
    var rs;
    if (__length(ts) < 2) rs = __length(s); else rs = "";
    ____________replaceChar(rs, s, fc, ts, lb, ub);
    return rs;
}

function __fileExtension(fln) {
    var fln;
    var ld;
    ld = ____lastIndexOf(fln, ascii_dot);
    if (ld < 0) return null;
    return ______slice(fln, ld + 1, __length(fln));
}

function __copy(s) {
    var s;
    var rs;
    rs = __mkString(__length(s));
    ____times(rs, s);
    return rs;
}

function ______isInt(x, sp, ep) {
    var x;
    var sp;
    var ep;
    var p;
    var cc;
    var i;
    p = sp;
    if (x[sp] === ascii_minus) p++;
    for (i = p; i < ep; i++) {
        cc = x[i];
        if (cc < 48 || cc > 57) return fabl_false;
    }
    return fabl_true;
}

function ____trim(rs, x) {
    var rs;
    var x;
    var lb;
    var ub;
    var ln;
    var nfnd;
    lb = 0;
    ln = __length(x);
    nfnd = fabl_true;
    while (nfnd && lb < ln) {
        if (x[lb] === ascii_space) lb++; else nfnd = fabl_false;
    }
    if (lb === ln) return;
    ub = ln - 1;
    nfnd = fabl_true;
    while (nfnd && ub >= 0) {
        if (x[ub] === ascii_space) ub--; else nfnd = fabl_false;
    }
    ________slice(rs, x, lb, ub + 1);
}

function __trim(x) {
    var x;
    var rs;
    rs = "";
    ____trim(rs, x);
    return rs;
}

var trimBuf = "";

function __isInt(x) {
    var x;
    if (__length(x) === 0) return fabl_false;
    __reset(trimBuf);
    ____trim(trimBuf, x);
    return ______isInt(trimBuf, 0, __length(trimBuf));
}

function __isDouble1(x) {
    var x;
    var ln;
    var dcm;
    var ep;
    ln = __length(x);
    if (ln === 0) return fabl_false;
    dcm = ____indexOf(x, ascii_dot);
    if (dcm < 0) return ______isInt(x, 0, ln);
    if (!______isInt(x, 0, dcm)) return fabl_false;
    ep = ____indexOf(x, ascii_e);
    if (ep < 0) ep = ____indexOf(x, ascii_E);
    if (ep < 0) {
        if (ln === dcm + 1) return fabl_true;
        return ______isInt(x, dcm + 1, ln);
    }
    if (ep + 1 === ln) return fabl_false;
    return ______isInt(x, ep + 1, ln);
}

function __isDouble(x) {
    var x;
    if (__length(x) === 0) return fabl_false;
    __reset(trimBuf);
    ____trim(trimBuf, x);
    return __isDouble1(trimBuf);
}

function __isInt(x) {
    var x;
    var xo;
    var k;
    xo = x;
    k = __obkind(xo);
    if (k === int_kind) return fabl_true;
    if (__isString(xo)) return __isInt(xo);
    return fabl_false;
}

function __isDouble(x) {
    var x;
    var xo;
    var k;
    xo = x;
    k = __obkind(xo);
    if (k === int_kind || k === double_kind) return fabl_true;
    if (__isString(xo)) return __isDouble(xo);
    return fabl_false;
}

function __isBoolean(x) {
    var x;
    var xo;
    var k;
    var xi;
    xo = x;
    k = __obkind(xo);
    if (k === int_kind) {
        xi = __toInt(x);
        return xi === 0 || xi === 1;
    }
    if (__isString(xo)) return __isInt(xo);
    return fabl_false;
}

function __toUpperCase(ci) {
    var ci;
    if (ci <= 122 && ci >= 97) return ci - 32;
    return ci;
}

function __toUpperCaseD(bf) {
    var bf;
    var ln;
    var i;
    ln = __length(bf);
    for (i = 0; i < ln; i++) bf[i] = __toUpperCase(bf[i]);
    return bf;
}

function __toUpperCase(bf) {
    var bf;
    return __toUpperCaseD(__copy(bf));
}

function __toLowerCase(ci) {
    var ci;
    if (ci <= 90 && ci >= 65) return ci + 32;
    return ci;
}

function __toLowerCaseD(bf) {
    var bf;
    var ln;
    var i;
    ln = __length(bf);
    for (i = 0; i < ln; i++) bf[i] = __toLowerCase(bf[i]);
    return bf;
}

function __toLowerCase(bf) {
    var bf;
    return __toLowerCaseD(__copy(bf));
}