var parse_verbose;

fabl_false;

parse_verbose = fabl_false;

var eof_parse;

parse_verbose = fabl_false;

var parsing_rdf;

fabl_false;

parsing_rdf = fabl_false;

function atline() {
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "At ");
        ____times(uwriteBuffer, scan_linenumber);
        ____times(uwriteBuffer, " ");
        __tprint(uwriteBuffer);
    }
}

function __parse2error(s) {
    var s;
    {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "At ");
        ____times(uwriteBuffer, scan_linenumber);
        ____times(uwriteBuffer, " ");
        __tprint(uwriteBuffer);
    }
    {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, s);
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
}

function ____mkApplication(op, a0) {
    var op;
    var a0;
    return ____cons(op, ____cons(a0, "rdf:nil"));
}

function ______mkApplication(op, a0, a1) {
    var op;
    var a0;
    var a1;
    return ____cons(op, ____cons(a0, ____cons(a1, "rdf:nil")));
}

function ____mkApplication(op, a) {
    var op;
    var a;
    return ____cons(op, __toList(a));
}

function ____mkArrayRef(op, a) {
    var op;
    var a;
    return ____cons("array_ref", ____cons(op, __toList(a)));
}

function __detokenify(x) {
    var x;
    var dt;
    var tk;
    if (__isList(x)) return ____cons(__detokenify(__car(x)), __detokenify(__cdr(x)));
    if (____hasType(x, Token)) {
        tk = x;
        dt = ___datum(tk);
        if (___isString(tk)) return ____list2("_quote_", dt); else return ___datum(x);
    }
    return x;
}

function ____consolidateStep(s, bp) {
    var s;
    var bp;
    var ln;
    var rbp;
    var lastop;
    var ne;
    ln = __seqLength(s);
    if (ln > 1) {
        lastop = s[ln - 2];
        rbp = __right_bp(lastop);
        if (rbp >= bp) {
            if (___isPrefix(lastop)) {
                ne = ____mkApplication(lastop, s[ln - 1]);
                ____pop(s, 2);
                ____seqobAdd(s, ne);
                return fabl_true;
            } else {
                ne = ______mkApplication(lastop, s[ln - 3], s[ln - 1]);
                ____pop(s, 3);
                ____seqobAdd(s, ne);
                return fabl_true;
            }
        }
    }
    return fabl_false;
}

function ____consolidate(s, bp) {
    var s;
    var bp;
    while (____consolidateStep(s, bp)) fabl_true;
}

var term_token;

{
    while (____consolidateStep(s, bp)) fabl_true;
}

function __mkSequence(a) {
    var a;
    return ____cons("sequence", __toList(a));
}

function parseUnit() {
    var tk;
    var a;
    tk = scanToken();
    if (___isAtom(tk)) return tk;
    if (____same(tk, t_lparen)) return __parseExpression(t_rparen);
    if (____same(tk, t_lbracket)) {
        a = __parseCommafied(t_rbracket);
        return __mkSequence(a);
    }
    atline();
    {
        beforeError();
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "Did not expect ");
        ____times(uwriteBuffer, tk);
        __tprint(uwriteBuffer);
        terpri();
        afterError();
    }
}

function __parseCommafied(trm) {
    var trm;
    var tk;
    var rs;
    var cp;
    tk = scanToken();
    if (____same(tk, trm)) return null;
    rs = __mk_emptysequence("<unprintable>");
    unscanToken();
    cp = ____parseExpression(trm, t_comma);
    ____seqobAdd(rs, cp);
    while (!____same(last_token, trm)) {
        cp = ____parseExpression(trm, t_comma);
        ____seqobAdd(rs, cp);
    }
    return rs;
}

var parsedId;

null;

function __parseAppOrId(allowAtom) {
    var allowAtom;
    var tk;
    var tk2;
    var tk3;
    var sq;
    tk = scanToken();
    if (!___isId(tk)) {
        parsedId = tk;
        if (allowAtom) return tk;
        __parse2error("expected id or application here");
    }
    tk2 = scanToken();
    if (____same(tk2, t_lparen)) {
        sq = __parseCommafied(t_rparen);
        return ____mkApplication(tk, sq);
    } else if (____same(tk2, t_colon)) {
        tk3 = scanToken();
        if (!___isId(tk3)) __parse2error("expected id after :");
        return ______list3(t_colon, tk, tk3);
    } else {
        unscanToken();
        return tk;
    }
}

function parseAppOrId() {
    return __parseAppOrId(fabl_false);
}

function parseAtomAppOrId() {
    return __parseAppOrId(fabl_true);
}

function ________parseExpressionStep(s, trm1, trm2, trm3) {
    var s;
    var trm1;
    var trm2;
    var trm3;
    var tk;
    var tk2;
    var pfx;
    var rval;
    var islp;
    var smd;
    var a;
    var op;
    var ap;
    var ln;
    tk = scanToken();
    if (___isTerminator(tk)) {
        if (____same(tk, trm1) || ____same(tk, trm2) || ____same(tk, trm3)) {
            ____consolidate(s, -1);
            return tk;
        } else {
            atline();
            {
                beforeError();
                __reset(uwriteBuffer);
                ____times(uwriteBuffer, "Expected ");
                ____times(uwriteBuffer, trm1);
                ____times(uwriteBuffer, " or ");
                ____times(uwriteBuffer, trm2);
                ____times(uwriteBuffer, " not ");
                ____times(uwriteBuffer, tk);
                __tprint(uwriteBuffer);
                terpri();
                afterError();
            }
        }
    }
    if (____same(tk, t_lparen)) {
        ____consolidate(s, __left_bp(t_lparen));
        a = __parseCommafied(t_rparen);
        ln = __seqLength(s);
        op = s[ln - 1];
        ap = ____mkApplication(op, a);
        s[ln - 1] = ap;
        return null;
    }
    if (____same(tk, t_lbracket)) {
        ____consolidate(s, __left_bp(t_lbracket));
        a = __parseCommafied(t_rbracket);
        ln = __seqLength(s);
        op = s[ln - 1];
        ap = ____mkArrayRef(op, a);
        s[ln - 1] = ap;
        return null;
    }
    if (!(___isInfix(tk) || ___isPostfix(tk))) __parse2error("Infix or postfix operator expected here");
    ____consolidate(s, __left_bp(tk));
    if (___isPostfix(tk)) {
        ln = __seqLength(s);
        s[ln - 1] = ____list2(tk, s[ln - 1]);
        return null;
    }
    tk2 = scanToken();
    if (parse_verbose) {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "parseExpressionStep: tk2 = ");
        ____times(uwriteBuffer, tk2);
        __tprint(uwriteBuffer);
        terpri();
    }
    smd = ____same(tk2, t_difference);
    pfx = null;
    if (smd || ___isPrefix(tk2)) {
        if (smd) pfx = ____instantiate(t_minus, ___position(tk2)); else pfx = tk2;
        tk2 = scanToken();
    }
    islp = ____same(tk2, t_lparen);
    if (islp || ___isAtom(tk2)) {
        if (islp) {
            unscanToken();
            rval = parseUnit();
        } else rval = tk2;
        ____seqobAdd(s, tk);
        if (pfx) ____seqobAdd(s, pfx);
        ____seqobAdd(s, rval);
    } else if (____same(tk2, t_lbracket)) {
        unscanToken();
        rval = parseUnit();
        ____seqobAdd(s, tk);
        if (pfx) ____seqobAdd(s, pfx);
        ____seqobAdd(s, rval);
    } else {
        atline();
        {
            beforeError();
            __reset(uwriteBuffer);
            ____times(uwriteBuffer, "Did not expect ");
            ____times(uwriteBuffer, tk2);
            __tprint(uwriteBuffer);
            terpri();
            afterError();
        }
    }
    return null;
}

function ________parseExpression(s, trm1, trm2, trm3) {
    var s;
    var trm1;
    var trm2;
    var trm3;
    var ct;
    var tk;
    if (__seqLength(s) === 0) {
        tk = scanToken();
        if (____same(tk, trm1) || ____same(tk, trm2) || ____same(tk, trm3)) return null;
        if (____same(tk, t_difference)) ____seqobAdd(s, ____instantiate(t_minus, ___position(tk))); else if (___isPrefix(tk)) ____seqobAdd(s, tk); else unscanToken();
        ____seqobAdd(s, parseUnit());
    }
    ct = ________parseExpressionStep(s, trm1, trm2, trm3);
    while (!ct) ct = ________parseExpressionStep(s, trm1, trm2, trm3);
    if (parse_verbose) {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "parseExpression = ");
        ____times(uwriteBuffer, __detokenify(s[0]));
        __tprint(uwriteBuffer);
        terpri();
    }
    return s[0];
}

function ______parseExpression(trm1, trm2, trm3) {
    var trm1;
    var trm2;
    var trm3;
    return ________parseExpression(__mk_emptysequence("<unprintable>"), trm1, trm2, trm3);
}

function ____parseExpression(trm1, trm2) {
    var trm1;
    var trm2;
    return ______parseExpression(trm1, trm2, null);
}

function __parseExpression(trm1) {
    var trm1;
    return ______parseExpression(trm1, null, null);
}

function ____parseSimpleStatement(trm0, trm1) {
    var trm0;
    var trm1;
    var rs;
    var rhs;
    rs = ______parseExpression(t_assign, trm0, trm1);
    if (____same(last_token, t_assign)) {
        rhs = ____parseExpression(trm0, trm1);
        rs = ______mkApplication(t_assign, rs, rhs);
    }
    return rs;
}

function __parseSimpleStatement(trm0) {
    var trm0;
    return ____parseSimpleStatement(trm0, null);
}

function __isBlockParse(x) {
    var x;
    return __isList(x) && ____um_eq(__car(x), "block");
}

function parseBlock() {
    var rs;
    var ap;
    rs = __mk_emptysequence("<unprintable>");
    ____seqobAdd(rs, parseStatement());
    while (!____same(term_token, t_rcurly)) ____seqobAdd(rs, parseStatement());
    scanToken();
    term_token = t_semi;
    ap = ____list2("block", __toList(rs));
    if (parse_verbose) {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "parseBlock = ");
        ____times(uwriteBuffer, __detokenify(ap));
        __tprint(uwriteBuffer);
        terpri();
    }
    return ap;
}

function parseIf() {
    var tk;
    var etk;
    var cnd;
    var tr;
    var fls;
    tk = scanToken();
    if (!____same(tk, t_lparen)) __parse2error("Expected (condition) after if");
    unscanToken();
    cnd = parseUnit();
    tr = parseStatement();
    if (____same(term_token, t_semi)) {
        etk = scanToken();
        if (____same(etk, t_else)) {
            fls = parseStatement();
            return ________list4("if_else", cnd, tr, fls);
        }
        unscanToken();
    }
    return ______list3("if", cnd, tr);
}

function parseFor() {
    var tk;
    var finit;
    var fcnd;
    var fiter;
    var fact;
    tk = scanToken();
    if (!____same(tk, t_lparen)) __parse2error("Expected (init;condition;iter) after for");
    finit = __parseSimpleStatement(t_semi);
    fcnd = __parseExpression(t_semi);
    fiter = __parseSimpleStatement(t_rparen);
    fact = parseStatement();
    return __________list5("for", finit, fcnd, fiter, fact);
}

function parseWhile() {
    var tk;
    var wcnd;
    var wact;
    tk = scanToken();
    if (!____same(tk, t_lparen)) __parse2error("Expected (condition) after while");
    wcnd = __parseExpression(t_rparen);
    wact = parseStatement();
    return ______list3("while", wcnd, wact);
}

function parseReturn() {
    var vl;
    vl = ____parseExpression(t_semi, t_rcurly);
    if (____same(last_token, t_rcurly)) {
        unscanToken();
        term_token = t_rcurly;
    }
    if (!vl) return __list1("freturn"); else return ____list2("freturn", vl);
}

function parseId() {
    var tk;
    var tk2;
    var tk3;
    tk = scanToken();
    if (!___isId(tk)) __parse2error("expected id here");
    tk2 = scanToken();
    if (____same(tk2, t_colon)) {
        tk3 = scanToken();
        if (!___isId(tk3)) __parse2error("expected id after :");
        return ______list3(t_colon, tk, tk3);
    }
    unscanToken();
    return tk;
}

function parseRestrictClause() {
    var tk;
    var etk;
    var dt;
    var rst;
    var ex;
    tk = scanToken();
    if (____same(tk, t_rcurly)) return null;
    dt = ___datum(tk);
    if (____um_eq(dt, "maxCardinality") || ____um_eq(dt, "cardinality") || ____um_eq(dt, "allValuesFrom") || ____um_eq(dt, "hasValue") || ____um_eq(dt, "defaultValue")) {
        ex = ____parseExpression(t_semi, t_rcurly);
        rst = ____cons(tk, ____cons(ex, "rdf:nil"));
        return rst;
    }
    __parse2error("Bad clause in restrict statement");
}

function parseRestrict() {
    var rs;
    var pr;
    var prp;
    var ctk;
    var done;
    rs = __mk_emptysequence("<unprintable>");
    prp = parseId();
    ctk = scanToken();
    if (!____same(ctk, t_lcurly)) __parse2error('Expected "{" in restrict statement');
    done = fabl_false;
    rs = __iNew("<unprintable>");
    ____seqobAdd(rs, "restrict");
    ____seqobAdd(rs, prp);
    while (!done) {
        pr = parseRestrictClause();
        if (pr) ____seqobAdd(rs, pr);
        done = ____same(last_token, t_rcurly);
    }
    return __toList(rs);
}

function __parseVars(ispl) {
    var ispl;
    var rs;
    var srt;
    var vr;
    var rhs;
    var tk;
    var cldn;
    rs = __mk_emptysequence("<unprintable>");
    if (ispl) {
        tk = scanToken();
        if (____same(tk, t_rparen)) return rs;
        unscanToken();
    }
    srt = parseAppOrId();
    cldn = fabl_false;
    if (!ispl) {
        tk = scanToken();
        if (____same(tk, t_assign)) {
            rhs = ____parseExpression(t_comma, t_semi);
            ____seqobAdd(rs, ______list3(tk, srt, rhs));
            tk = last_token;
            cldn = fabl_true;
        } else unscanToken();
    }
    if (!cldn) {
        vr = parseId();
        ____seqobAdd(rs, ____cons("type", ____cons(srt, ____cons(vr, "rdf:nil"))));
        tk = scanToken();
    }
    while (____same(tk, t_comma)) {
        srt = parseAppOrId();
        cldn = fabl_false;
        if (!ispl) {
            tk = scanToken();
            if (____same(tk, t_assign)) {
                rhs = ____parseExpression(t_comma, t_semi);
                ____seqobAdd(rs, ______list3(tk, srt, rhs));
                tk = last_token;
                cldn = fabl_true;
            } else unscanToken();
        }
        if (!cldn) {
            tk = scanToken();
            if (____same(tk, t_comma) || ____same(tk, t_semi) || ____same(tk, t_rparen)) ____seqobAdd(rs, srt); else {
                if (!___isId(tk)) __parse2error("Expected id");
                vr = tk;
                ____seqobAdd(rs, ____cons("type", ____cons(srt, ____cons(vr, "rdf:nil"))));
                tk = scanToken();
            }
        }
    }
    return rs;
}

function ______collectVars(vrs, nvrs, x) {
    var vrs;
    var nvrs;
    var x;
    var cx;
    var crx;
    var cdx;
    cx = x;
    while (__isList(cx)) {
        crx = __car(cx);
        if (____um_eq(__car(crx), "var")) {
            cdx = __cdr(crx);
            while (__isList(cdx)) {
                ____seqobAdd(vrs, __car(cdx));
                cdx = __cdr(cdx);
            }
        } else ____seqobAdd(nvrs, crx);
        cx = __cdr(cx);
    }
}

function __parseFunction(rsrt) {
    var rsrt;
    var tk;
    var nm;
    var bd;
    var vrs;
    var blk;
    var lvrs;
    var nvrs;
    nm = parseId();
    tk = scanToken();
    if (!____same(tk, t_lparen)) __parse2error("( expected");
    vrs = __toList(__parseVars(fabl_true));
    if (!____same(last_token, t_rparen)) __parse2error("Expected )");
    tk = scanToken();
    if (!____same(tk, t_lcurly)) __parse2error("Expected left curly bracket");
    blk = parseBlock();
    lvrs = [ "var" ];
    nvrs = __mk_emptysequence("<unprintable>");
    ______collectVars(lvrs, nvrs, __cdr(blk));
    if (__seqLength(lvrs) > 1) bd = ____cons("block", ____list2(__toList(lvrs), __toList(nvrs))); else bd = ____cons("block", __toList(nvrs));
    return ______list3(nm, vrs, bd);
}

function __fablParseExp(s) {
    var s;
    __scan_init(s);
    return __detokenify(__parseExpression(t_semi));
}

function __fablParseSt(s) {
    var s;
    __scan_init(s);
    return __detokenify(parseStatement());
}

function parseVarStatement() {
    var vrs;
    vrs = __parseVars(fabl_false);
    if (!____same(last_token, t_semi)) __parse2error("Expected semicolon");
    return ____mkApplication("var", vrs);
}

function parseConstantStatement() {
    var vrs;
    vrs = __parseVars(fabl_false);
    if (!____same(last_token, t_semi)) __parse2error("Expected semicolon");
    return ____mkApplication("constant", vrs);
}

function parseToplevel() {
    var tk;
    var prs;
    var fprs;
    tk = scanToken();
    if (____same(tk, eof_token)) return eof_parse;
    if (___isKeyword(tk) || ___isPrefix(tk) || ____same(tk, t_difference) || ____same(tk, t_lbracket)) {
        unscanToken();
        return parseStatement();
    }
    if (____same(tk, t_lcurly)) return parseBlock();
    unscanToken();
    prs = parseAtomAppOrId();
    tk = scanToken();
    if (____same(tk, t_function)) {
        fprs = __parseFunction(prs);
        return ____cons("function", ____cons(prs, fprs));
    }
    unscanToken();
    return __parseStatement([ prs ]);
}

function __parse0(s) {
    var s;
    __scan_init(s);
    return parseToplevel();
}

function parseStatement() {
    var tk;
    var rs;
    var vrs;
    tk = scanToken();
    term_token = t_semi;
    if (____same(tk, t_lcurly)) rs = parseBlock(); else if (____same(tk, t_rcurly)) {
        unscanToken();
        term_token = t_rcurly;
    } else if (____same(tk, t_semi)) rs = null; else if (____same(tk, t_var)) rs = parseVarStatement(); else if (____same(tk, t_constant)) rs = parseConstantStatement(); else if (____same(tk, t_if)) rs = parseIf(); else if (____same(tk, t_return)) rs = parseReturn(); else if (____same(tk, t_for)) rs = parseFor(); else if (____same(tk, t_while)) rs = parseWhile(); else if (classBeingDefined && ____same(tk, t_restrict)) rs = parseRestrict(); else {
        unscanToken();
        rs = ____parseSimpleStatement(t_semi, t_rcurly);
        if (____same(last_token, t_rcurly)) {
            term_token = t_rcurly;
            unscanToken();
        }
    }
    if (parse_verbose) {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "parseStatement = ");
        ____times(uwriteBuffer, __detokenify(rs));
        __tprint(uwriteBuffer);
        terpri();
    }
    return rs;
}

function __parseStatement(s) {
    var s;
    var tk;
    var rs;
    var rhs;
    var vrs;
    rs = ________parseExpression(s, t_semi, t_rcurly, t_assign);
    if (____same(last_token, t_assign)) {
        rhs = ____parseExpression(t_semi, t_rcurly);
        rs = ______mkApplication(t_assign, rs, rhs);
    }
    if (parse_verbose) {
        __reset(uwriteBuffer);
        ____times(uwriteBuffer, "parseStatement = ");
        ____times(uwriteBuffer, __detokenify(rs));
        __tprint(uwriteBuffer);
        terpri();
    }
    return rs;
}

function initParse() {
    init_scan();
    eof_parse = __list1("_eof_");
}

function __parse1(s) {
    var s;
    return __detokenify(__parse0(s));
}

function __parse(s) {
    var s;
    var rs;
    ____seqobAdd(scanStack, extractScannerState());
    scan_inbuf = "";
    rs = __detokenify(__parse0(s));
    __restoreScannerState(__pop(scanStack));
    return rs;
}