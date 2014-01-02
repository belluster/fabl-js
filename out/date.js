var daysOfWeek = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];

var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];

var dayLetters = [ "S", "M", "T", "W", "T", "F", "S" ];

var daysInMonth = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

function __isLeapYear(yr) {
    var yr;
    if (!(yr % 4 === 0)) return fabl_false; else {
        if (!(yr % 100 === 0)) return fabl_true; else if (yr % 400 === 0) return fabl_true; else return fabl_false;
    }
}

function __daysInYear(yr) {
    var yr;
    if (__isLeapYear(yr)) return 366; else return 365;
}

function ____daysInMonth(mn, leapyear) {
    var mn;
    var leapyear;
    if (mn === 1) {
        if (leapyear) return 29; else return 28;
    } else return daysInMonth[mn];
}

function ____extractYMD(rs, d) {
    var rs;
    var d;
    var dy;
    var yr;
    var nyd;
    var yl;
    var diy;
    var mn;
    var first;
    var ml;
    var dim;
    var ly;
    dy = __toInt(d);
    nyd = 0;
    if (dy >= 0) {
        yr = 2e3;
        yl = __daysInYear(yr);
        while (dy - nyd >= yl) {
            yr++;
            nyd = nyd + yl;
            yl = __daysInYear(yr);
        }
    } else {
        yr = 1999;
        yl = __daysInYear(yr);
        while (dy - nyd < 0) {
            yr--;
            nyd = nyd - yl;
            yl = __daysInYear(yr);
        }
        yr++;
    }
    diy = dy - nyd;
    mn = 0;
    ly = __isLeapYear(yr);
    first = 0;
    ml = ____daysInMonth(mn, ly);
    while (diy - first >= ml) {
        mn++;
        first = first + ml;
        ml = ____daysInMonth(mn, ly);
    }
    dim = diy - first;
    __seqReset(rs);
    ____seqintAdd(rs, yr);
    ____seqintAdd(rs, mn + 1);
    ____seqintAdd(rs, dim + 1);
}

var dateBuf = __iNew("<unprintable>");

function ____times(rs, d) {
    var rs;
    var d;
    var mn;
    var dy;
    ____extractYMD(dateBuf, d);
    ____times(rs, dateBuf[0]);
    ____times(rs, "-");
    mn = dateBuf[1];
    if (mn < 10) ____times(rs, "0");
    ____times(rs, mn);
    ____times(rs, "-");
    dy = dateBuf[2];
    if (dy < 10) ____times(rs, "0");
    ____times(rs, dy);
}

function ______mkDate(yr, mn, dy) {
    var yr;
    var mn;
    var dy;
    var dys;
    var i;
    var ly;
    dys = 0;
    if (yr >= 2e3) {
        for (i = 2e3; i < yr; i++) dys = dys + __daysInYear(i);
    } else {
        for (i = 1999; yr <= i; i--) dys = dys - __daysInYear(i);
    }
    ly = __isLeapYear(yr);
    for (i = 0; i < mn - 1; i++) dys = dys + ____daysInMonth(i, ly);
    dys = dys + (dy - 1);
    return __toDate(dys);
}

function __dayOfWeek(d) {
    var d;
    var dy;
    var md;
    dy = __toInt(d);
    md = (dy - 1) % 7;
    if (md < 0) return 7 + md;
    return md;
}

function __dayOfWeekName(d) {
    var d;
    var dy;
    dy = __dayOfWeek(d);
    return daysOfWeek[dy];
}

function ____lessp(x, y) {
    var x;
    var y;
    return __toInt(x) < __toInt(y);
}

function ____greaterp(x, y) {
    var x;
    var y;
    return __toInt(x) < __toInt(y);
}

function ____leq(x, y) {
    var x;
    var y;
    return __toInt(x) <= __toInt(y);
}

function ____geq(x, y) {
    var x;
    var y;
    return __toInt(x) >= __toInt(y);
}

function ____equal(x, y) {
    var x;
    var y;
    return __toInt(x) === __toInt(y);
}

function ____plus(d, i) {
    var d;
    var i;
    return __toDate(__toInt(d) + i);
}

function ____difference(d, i) {
    var d;
    var i;
    return __toDate(__toInt(d) - i);
}

function __parseXsdDate(s) {
    var s;
    var sp;
    var spt;
    var ys;
    var ms;
    var ds;
    var dim;
    var yy;
    var mm;
    var dd;
    spt = ____split(s, ascii_T);
    sp = ____split(spt[0], ascii_minus);
    if (!(__seqLength(sp) === 3)) return null;
    ys = sp[0];
    if (!__isInt(ys)) return null;
    yy = __toInt(ys);
    ms = sp[1];
    if (!__isInt(ms)) return null;
    mm = __toInt(ms);
    if (mm < 1 || 12 < mm) return null;
    ds = sp[2];
    if (!__isInt(ds)) return null;
    dd = __toInt(ds);
    if (dd < 1 || 31 < dd) return null;
    if (mm === 2) {
        if (dd > 29) return null;
        if (dd === 29 && !__isLeapYear(yy)) return null;
    } else {
        dim = daysInMonth[mm - 1];
        if (dd > dim) return null;
    }
    return ______mkDate(yy, mm, dd);
}

function __nextMonth(d) {
    var d;
    var m;
    var y;
    ____extractYMD(dateBuf, d);
    m = dateBuf[1];
    y = dateBuf[0];
    if (m === 12) {
        y++;
        m = 1;
    } else m++;
    return ______mkDate(y, m, 1);
}

function __firstOfMonth(d) {
    var d;
    var m;
    var y;
    ____extractYMD(dateBuf, d);
    m = dateBuf[1];
    y = dateBuf[0];
    return ______mkDate(y, m, 1);
}