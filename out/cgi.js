var safeChars;

function __urldecode(ix) {
    var ix;
    var idx;
    var ln;
    var hxv;
    var lb;
    var x;
    var hx;
    var rs;
    x = __________replaceChar(ix, ascii_plus, ascii_space, 0, __length(ix));
    idx = ____indexOf(x, ascii_percent);
    if (idx < 0) return x;
    ln = __length(x);
    rs = ______slice(x, 0, idx);
    hx = "  ";
    while (0 <= idx && idx + 3 <= ln) {
        __reset(hx);
        ____addChar(hx, x[idx + 1]);
        ____addChar(hx, x[idx + 2]);
        hxv = __hex(hx);
        ____addChar(rs, hxv);
        lb = idx + 3;
        idx = ______indexOf(x, ascii_percent, lb);
        if (idx < 0) ____times(rs, ______slice(x, lb, ln)); else ____times(rs, ______slice(x, lb, idx));
    }
    return rs;
}

function __safeChar1(c) {
    var c;
    if (48 <= c && c <= 57) return fabl_true;
    if (65 <= c && c <= 90) return fabl_true;
    if (97 <= c && c <= 122) return fabl_true;
    if (c === ascii_minus || c === ascii_underbar || c === ascii_dot || c === ascii_bang || c === ascii_twiddle || c === ascii_star || c === ascii_squote || c === ascii_lparen || c === ascii_rparen) return fabl_true;
    return fabl_false;
}

function initSafeChars() {
    var i;
    safeChars = __iNew("<unprintable>");
    ____seqintExpand(safeChars, 123);
    for (i = 0; i < 122; i++) safeChars[i] = __safeChar1(i);
}

initSafeChars();

function __urlencodeIsSafeChar(i) {
    var i;
    if (i > 122) return fabl_false;
    return safeChars[i];
}

function ____appendTwoCharHex(rs, x) {
    var rs;
    var x;
    var c;
    var fc;
    var sc;
    c = ____lshift(____land(x, 240), -4);
    if (c < 10) fc = 48 + c; else fc = 87 + c;
    c = ____land(x, 15);
    if (c < 10) sc = 48 + c; else sc = 87 + c;
    ____addChar(rs, fc);
    ____addChar(rs, sc);
}

function __urlencode(x) {
    var x;
    var rs;
    var i;
    var ln;
    var c;
    ln = __length(x);
    rs = "";
    for (i = 0; i < ln; i++) {
        c = x[i];
        if (c === ascii_space) ____addChar(rs, ascii_plus); else if (__urlencodeIsSafeChar(c)) ____addChar(rs, c); else {
            ____addChar(rs, ascii_percent);
            ____appendTwoCharHex(rs, c);
        }
    }
    return rs;
}

function __javascriptEscape(x) {
    var x;
    var rs;
    var i;
    var ln;
    var c;
    ln = __length(x);
    rs = "";
    for (i = 0; i < ln; i++) {
        c = x[i];
        if (c === ascii_plus) ____addChar(rs, ascii_plus); else if (__urlencodeIsSafeChar(c)) ____addChar(rs, c); else {
            ____addChar(rs, ascii_percent);
            ____appendTwoCharHex(rs, c);
        }
    }
    return rs;
}

function __getenv(ev) {
    var ev;
    var rs;
    rs = "";
    if (____getenv(rs, ev) < 0) return null;
    return rs;
}

var crlf = "";

____addChar(crlf, 13);

____addChar(crlf, 10);

var crcrlf = "";

____addChar(crcrlf, 13);

____addChar(crcrlf, 13);

____addChar(crcrlf, 10);

var cgiMode;

fabl_false;

var headerEmitted;

fabl_false;

function ____httpHeader(tp, ln) {
    var tp;
    var ln;
    if (!headerEmitted) {
        {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "HTTP 200");
            ____times(uwriteBuffer, crlf);
            __tprint(uwriteBuffer);
        }
        {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "Server: fabl/2.0");
            ____times(uwriteBuffer, crlf);
            __tprint(uwriteBuffer);
        }
        if (ln > 0) {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "Content-Length: ");
            ____times(uwriteBuffer, ln);
            __tprint(uwriteBuffer);
        }
        {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "Content-Type: ");
            ____times(uwriteBuffer, tp);
            ____times(uwriteBuffer, crlf);
            ____times(uwriteBuffer, crlf);
            __tprint(uwriteBuffer);
        }
        headerEmitted = fabl_true;
    }
}

function __htmlHeader(ln) {
    var ln;
    __silent(fabl_false);
    __emitHtmlHeader(ln);
}

function htmlHeader() {
    __htmlHeader(-1);
}

function plainTextHeader() {
    if (setHttpHeaderEmitted()) {
        __silent(fabl_false);
        {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "Server: fabl/2.0");
            ____times(uwriteBuffer, crlf);
            __tprint(uwriteBuffer);
        }
        {
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "Content-Type: text/plain");
            ____times(uwriteBuffer, crlf);
            ____times(uwriteBuffer, crlf);
            __tprint(uwriteBuffer);
        }
    }
}

var writeServedPageTo;

null;

function __serveHtml(bf) {
    var bf;
    if (writeServedPageTo) ____fwrite(writeServedPageTo, bf);
    htmlHeader();
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, bf);
        __tprint(uwriteBuffer);
    }
    quit();
}

function preError() {
    if (cgiMode) htmlHeader();
}

function __parseHttpVars(s) {
    var s;
    var rs;
    var spl;
    var ln;
    var i;
    var idx;
    var vr;
    var vl;
    var cv;
    var urlencoded;
    rs = __iNew("rdfs:Resource");
    if (____find(s, crlf) < 0) {
        urlencoded = fabl_true;
        spl = ____split(s, [ 0 ]);
    } else {
        spl = ____split(s, crlf);
        urlencoded = fabl_false;
    }
    ln = __seqLength(spl);
    for (i = 0; i < ln; i++) {
        cv = spl[i];
        idx = ____indexOf(cv, ascii_equal);
        if (idx > 0) {
            vr = ______slice(cv, 0, idx);
            vl = ______slice(cv, idx + 1, __length(cv));
            if (urlencoded) vl = __urldecode(vl);
            ______set(rs, __regarding(__toId(vr)), vl);
        }
    }
    return rs;
}

function __parseApplication(s) {
    var s;
    var idx;
    var eidx;
    var ln;
    var rs;
    var args;
    var argst;
    idx = ____indexOf(s, ascii_lparen);
    if (idx < 0) return null;
    eidx = ____lastIndexOf(s, ascii_rparen);
    if (eidx < 0) return null;
    rs = [ ______slice(s, 0, idx) ];
    ln = __length(s);
    argst = ______slice(s, idx + 1, eidx);
    args = ____split(argst, ascii_comma);
    ____seqobAppend(rs, args);
    return rs;
}

var httpContentLengthString = "";

var httpContentLength;

0;

var httpContentType = "";

var httpContent = "";

var httpRequestMethod = "";

var httpQueryString = "";

var httpGet;

"";

var httpPost;

"";

var httpVars;

"";

function __setCgiVars(parse) {
    var parse;
    if (__length(httpRequestMethod) === 0) {
        httpGet = null;
        httpPost = null;
        ____getenv(httpRequestMethod, "REQUEST_METHOD");
        if (httpRequestMethod === "GET") {
            ____getenv(httpQueryString, "QUERY_STRING");
            httpContent = httpQueryString;
            if (parse) {
                httpGet = __parseHttpVars(httpQueryString);
                httpVars = httpGet;
            }
            return;
        }
        if (httpRequestMethod === "POST") {
            ____getenv(httpContentLengthString, "CONTENT_LENGTH");
            httpContentLength = __toInt(httpContentLengthString);
            __reset(httpContent);
            ____readFromStdin(httpContent, httpContentLength);
            if (parse) {
                httpPost = __parseHttpVars(httpContent);
                httpVars = httpPost;
            }
            return;
        }
    }
}

function setCgiVars() {
    __setCgiVars(fabl_true);
}

function parseCgi() {
    __setCgiVars(fabl_true);
}

function __extractUploadPart0(x) {
    var x;
    var bndi;
    var ebnd;
    var bnd;
    bndi = ____indexOf(x, crlf);
    if (bndi < 0) return null;
    bnd = ______slice(x, 0, bndi);
    ebnd = ______indexOf(x, bnd, bndi);
    if (ebnd < 0) return null;
    return ______slice(x, bndi + 1, ebnd);
}

var crlfcrlf = "{crlf}{crlf}";

function __extractUploadContent(x) {
    var x;
    var bndi;
    var prt0;
    prt0 = __extractUploadPart0(x);
    if (!prt0) return prt0;
    bndi = ____indexOf(prt0, crlfcrlf);
    if (bndi < 0) return null;
    return ______slice(prt0, bndi + 4, __length(x));
}