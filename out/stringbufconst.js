function ____unescapedLcurly(bf, sf) {
    var bf;
    var sf;
    var cnd;
    var pc;
    cnd = ______find(bf, ascii_lcurly, sf);
    if (cnd === sf) return sf;
    while (cnd >= 0) {
        pc = bf[cnd - 1];
        if (!(pc === 1)) return cnd;
        cnd = ______find(bf, ascii_lcurly, cnd + 1);
    }
    return cnd;
}

var removeEscapesBuf = "";

function ____removeEscapes(bf, esc) {
    var bf;
    var esc;
    var rs;
    var cnd;
    var cc;
    rs = removeEscapesBuf;
    __reset(rs);
    cnd = ______find(bf, esc, 0);
    if (cnd < 0) return;
    cc = 0;
    while (cnd >= 0) {
        ________select(rs, bf, cc, cnd - 1);
        cc = cnd + 1;
        if (bf[cc] === esc) {
            ____addChar(rs, esc);
            cc = cc + 1;
        }
        cnd = ______find(bf, esc, cc);
    }
    ________select(rs, bf, cc, __length(bf) - 1);
    __reset(bf);
    ____times(bf, rs);
}

function ____removeEscapes(bfs, esc) {
    var bfs;
    var esc;
    var i;
    var ln;
    ln = __seqLength(bfs);
    for (i = 0; i < ln; i++) ____removeEscapes(bfs[i], esc);
}

function __bracketExtract(bf) {
    var bf;
    var rs;
    var ln;
    var cc;
    var opb;
    var clb;
    var i;
    rs = __mk_emptysequence("<unprintable>");
    ln = __length(bf);
    cc = 0;
    while (cc < ln) {
        opb = ____unescapedLcurly(bf, cc);
        if (opb < 0) {
            ____seqobAdd(rs, ______select(bf, cc, ln - 1));
            ____removeEscapes(rs, 1);
            return rs;
        }
        ____seqobAdd(rs, ______select(bf, cc, opb - 1));
        clb = ______find(bf, ascii_rcurly, opb);
        if (clb < 0) {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "Missing closing bracket } in string constant");
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
        ____seqobAdd(rs, ______select(bf, opb + 1, clb - 1));
        cc = clb + 1;
    }
    ____removeEscapes(rs, 1);
    return rs;
}

function __semify(bf) {
    var bf;
    var ln;
    ln = __length(bf);
    if (bf[ln - 1] === ascii_semicolon) return;
    ____times(bf, ";");
}

var stringBuf_append_fun = ______getVariant(home, "times", [ fabl_string, fabl_string ]);

function emptyString() {
    return;
}

function __stringBufConstXob(bfs) {
    var bfs;
    var e;
    var cpr;
    var i;
    var ln;
    var sq;
    var cbf;
    var vr;
    var px;
    var rsx;
    var cx;
    var brt;
    e = mkObject();
    rsx = ______bindLocal(e, "stringConstantResult", fabl_string);
    ln = __seqLength(bfs);
    sq = __mk_emptysequence("<unprintable>");
    ____seqobAdd(sq, ____metaAssignn(rsx, ____metaApplyn(__homeFimpFun("mkStringBuf_function"), __meta(""))));
    ____seqobAdd(sq, ______metaApplyn(__homeFimpFun("stringStringTimes_fun"), rsx, ____meta(bfs[0], fabl_string)));
    i = 1;
    while (i < ln) {
        cbf = bfs[i];
        __semify(cbf);
        cpr = __parse(cbf);
        cx = __analyze(cpr);
        vr = ______getVariant(homePath(), "times", [ fabl_string, __type(cx) ]);
        if (!vr) px = ________metaApplyn(__homeFimpFun("gAppend_fun"), rsx, cx, __meta(__type(cx))); else px = ______metaApplyn(vr, rsx, cx);
        ____seqobAdd(sq, px);
        i = i + 1;
        if (i < ln) ____seqobAdd(sq, ______metaApplyn(__homeFimpFun("stringBuf_append_fun"), rsx, ____meta(bfs[i], fabl_string)));
        i = i + 1;
    }
    brt = blockReturnType;
    blockReturnType = fabl_string;
    ____seqobAdd(sq, ____metaBlockReturn(rsx, null));
    blockReturnType = brt;
    return ______mkValueReturningXblock(fabl_string, e, sq);
}

function __analyzeStringBufConst(bf) {
    var bf;
    if (____find(bf, ascii_lcurly) < 0 && ____find(bf, 1) < 0) return ____metaApplyn(__homeFimpFun("copyStringConst_fun"), ____meta(bf, fabl_string));
    return __stringBufConstXob(__bracketExtract(bf));
}