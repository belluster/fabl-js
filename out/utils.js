var lhwm = 65535;

var hhwm = -65536;

var byte0_mask = 255;

var byte1_mask = 65280;

var byte2_mask = 16711680;

var byte3_mask = -16777216;

function __highHalf(x) {
    var x;
    return ____lshift(x, -16);
}

function __low_half(x) {
    var x;
    return ____land(x, lhwm);
}

function ____setLowHalf(x, y) {
    var x;
    var y;
    return ____lor(____land(x, hhwm), ____land(y, lhwm));
}

function ____setHighHalf(x, y) {
    var x;
    var y;
    return ____lor(____lshift(y, 16), ____land(x, lhwm));
}

function __byte0(x) {
    var x;
    return ____land(x, byte0_mask);
}

function __byte1(x) {
    var x;
    return ____land(____lshift(x, -8), byte0_mask);
}

function __byte2(x) {
    var x;
    return ____land(____lshift(x, -16), byte0_mask);
}

function __byte3(x) {
    var x;
    return ____land(____lshift(x, -24), byte0_mask);
}

function ____setByte0(x, y) {
    var x;
    var y;
    return ____lor(____land(x, __lnot(byte0_mask)), ____land(y, byte0_mask));
}

function ____setByte0(x, y) {
    var x;
    var y;
    return ____lor(____land(x, __lnot(byte0_mask)), y);
}

function ____setByte1(x, y) {
    var x;
    var y;
    return ____lor(____land(x, __lnot(byte1_mask)), ____lshift(____land(y, byte0_mask), 8));
}

function ____setByte1(x, y) {
    var x;
    var y;
    return ____lor(____land(x, __lnot(byte1_mask)), ____lshift(y, 8));
}

function ____setByte2(x, y) {
    var x;
    var y;
    return ____lor(____land(x, __lnot(byte2_mask)), ____lshift(____land(y, byte0_mask), 16));
}

function ____setByte2(x, y) {
    var x;
    var y;
    return ____lor(____land(x, __lnot(byte2_mask)), ____lshift(y, 16));
}

function ____setByte3(x, y) {
    var x;
    var y;
    return ____lor(____land(x, __lnot(byte3_mask)), ____lshift(____land(y, byte0_mask), 24));
}

function ____setByte3(x, y) {
    var x;
    var y;
    return ____lor(____land(x, __lnot(byte3_mask)), ____lshift(y, 24));
}

function __toHex(x) {
    var x;
    var s;
    var i;
    var cx;
    var ln;
    s = "        ";
    cx = x;
    for (i = 0; i < 8; i++) {
        ln = ____land(cx, 15);
        if (ln < 10) ______set(s, 7 - i, 48 + ln); else ______set(s, 7 - i, 87 + ln);
        cx = ____lshift(cx, -4);
    }
    return s;
}

function ______to_hex(rs, x, numdigits) {
    var rs;
    var x;
    var numdigits;
    var i;
    var cx;
    var ln;
    var lnr;
    for (i = 0; i < numdigits; i++) ____times(rs, "0");
    lnr = __length(rs) - 1;
    cx = x;
    for (i = 0; i < numdigits; i++) {
        ln = ____land(cx, 15);
        if (ln < 10) ______set(rs, lnr - i, 48 + ln); else ______set(rs, lnr - i, 87 + ln);
        cx = ____lshift(cx, -4);
    }
}

function __toInt(x) {
    var x;
    if (x) return 1;
    return 0;
}

function ____equal(a, b) {
    var a;
    var b;
    return ____um_eq(a, b);
}

var regardingNamespaces = __regarding("namespaces");

function homeNamespaces() {
    var nms;
    nms = ____get(home, regardingNamespaces);
    if (!nms) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Home is missing namespaces property");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    return nms;
}

function __car(x) {
    var x;
    return ____listSelect(x, 0);
}

function __cdr(x) {
    var x;
    if (!__isList(x)) {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "cdr of non-list");
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
    return ____obsel(x, List_rest);
}

function __cadr(x) {
    var x;
    return ____listSelect(x, 1);
}

function __caddr(x) {
    var x;
    return ____listSelect(x, 2);
}

function __cadddr(x) {
    var x;
    return ____listSelect(x, 3);
}

function __garbageCollection(v) {
    var v;
    __allocStatically(!v);
}

function __list1(x) {
    var x;
    return ____cons(x, "rdf:nil");
}

function ____list2(x, y) {
    var x;
    var y;
    return ____cons(x, ____cons(y, "rdf:nil"));
}

function ______list3(x, y, z) {
    var x;
    var y;
    var z;
    return ____cons(x, ____cons(y, ____cons(z, "rdf:nil")));
}

function ________list4(x, y, z, z2) {
    var x;
    var y;
    var z;
    var z2;
    return ____cons(x, ____cons(y, ____cons(z, ____cons(z2, "rdf:nil"))));
}

function __________list5(x, y, z, z2, z3) {
    var x;
    var y;
    var z;
    var z2;
    var z3;
    return ____cons(x, ____cons(y, ____cons(z, ____cons(z2, ____cons(z3, "rdf:nil")))));
}

function __toList(a) {
    var a;
    var rs;
    var ln;
    var i;
    if (!a) return "rdf:nil";
    ln = __seqLength(a);
    rs = "rdf:nil";
    for (i = ln - 1; i >= 0; i--) rs = ____cons(a[i], rs);
    return rs;
}

function __listNul(x) {
    var x;
    return !x || ____um_eq(x, "rdf:nil");
}