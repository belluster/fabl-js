function __byte_to_hex(cn) {
    var cn;
    var rs;
    var n;
    n = cn;
    if (n < 48) return -1;
    if (n <= 57) return n - 48;
    if (n < 65) return -1;
    if (n <= 70) return 10 + n - 65;
    if (n < 97) return -1;
    if (n <= 102) return 10 + n - 97;
    return -1;
}

function __hex(x) {
    var x;
    var n;
    var i;
    var rs;
    var cv;
    var ln;
    ln = __length(x);
    n = 0;
    rs = 0;
    for (i = 0; i < ln; i++) {
        cv = __byte_to_hex(____select(x, i));
        if (cv < 0) {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "not a lower-case hex number: ");
            ____times(uwriteBuffer, x);
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
        rs = ____times(rs, 16) + cv;
    }
    return rs;
}

function __hex(x) {
    var x;
    var n;
    var i;
    var rs;
    var cv;
    var ln;
    ln = __length(x);
    n = 0;
    rs = 0;
    for (i = 0; i < ln; i++) {
        cv = __byte_to_hex(____select(x, i));
        if (cv < 0) {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "not a lower-case hex number: ");
            ____times(uwriteBuffer, x);
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
        rs = ____times(rs, 16) + cv;
    }
    return rs;
}

function __int2str(x) {
    var x;
    var sb;
    sb = 1;
    ____times(sb, x);
    return __toString(sb);
}